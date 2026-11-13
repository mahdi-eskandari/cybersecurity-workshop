import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import BlogPageClient, { type BlogPageInitialData } from "./BlogPageClient";
import {
  buildBlogsPaginationLinks,
  buildBlogsCategoryLinks,
  getPageMetadata,
  getPageSeo,
  SITE_URL,
} from "@/lib/seo";

import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";

const PER_PAGE = 6;

type CategoryItem = { id: string; label: string };

// فقط وقتی API در دسترس نبود استفاده می‌شه
const FALLBACK_CATEGORIES: CategoryItem[] = [
  { id: "forensic-reports", label: "گزارش‌های جرم‌شناسی" },
  { id: "legal-news", label: "اخبار حقوقی" },
  { id: "solved-cases", label: "پرونده‌های حل‌شده" },
  { id: "security-alerts", label: "هشدارهای امنیتی" },
  { id: "security-education", label: "آموزش امنیت و تهدیدات سایبری" },
];

type RawBlogPost = {
  _id?: string;
  id?: string;
  title?: string;
  slug?: string;
  author?: string;
  categoryId?: string;
  tags?: string[];
  status?: "draft" | "published";
  postType?: "normal" | "special";
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  content?: string;
  wordCount?: number;
  readingTime?: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
};

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  author: string;
  categoryId: string;
  tags: string[];
  status: "draft" | "published";
  postType: "normal" | "special";
  featuredImage: string | null;
  featuredImageAlt: string | null;
  content: string;
  wordCount: number;
  readingTime: number;
  metaTitle: string;
  metaDescription: string;
  createdAt?: string;
  updatedAt?: string;
};

type MediaItem = {
  id: string;
  name: string;
  alt: string;
  url: string;
};

function normalizePost(post: RawBlogPost): BlogPost | null {
  const id = post._id || post.id;
  if (!id) return null;

  return {
    _id: String(id),
    title: String(post.title || ""),
    slug: String(post.slug || ""),
    author: String(post.author || ""),
    categoryId: String(post.categoryId || ""),
    tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    status: post.status === "published" ? "published" : "draft",
    postType: post.postType === "special" ? "special" : "normal",
    featuredImage: post.featuredImage || null,
    featuredImageAlt: post.featuredImageAlt || null,
    content: String(post.content || ""),
    wordCount: Number(post.wordCount || 0),
    readingTime: Number(post.readingTime || 0),
    metaTitle: String(post.metaTitle || ""),
    metaDescription: String(post.metaDescription || ""),
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

async function fetchServerJson(
  url: string,
  timeoutMs = 10000
): Promise<{ response: Response; data: any }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });
    const data = await response.json();
    return { response, data };
  } finally {
    clearTimeout(timeout);
  }
}

async function getBaseUrl() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  if (!host) return null;
  const protocol = requestHeaders.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

async function getCategories(baseUrl: string): Promise<CategoryItem[]> {
  try {
    const { response, data } = await fetchServerJson(
      `${baseUrl}/api/categories`
    );
    if (!response.ok || !Array.isArray(data) || data.length === 0) {
      return FALLBACK_CATEGORIES;
    }
    const list = data
      .map((c: any) => ({ id: String(c.id), label: String(c.label) }))
      .filter((c) => c.id && c.label);
    return list.length ? list : FALLBACK_CATEGORIES;
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

async function getPublishedPosts(baseUrl: string): Promise<BlogPost[]> {
  const { response, data } = await fetchServerJson(`${baseUrl}/api/posts`);
  if (!response.ok) return [];

  const rawPosts: RawBlogPost[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.posts)
    ? data.posts
    : [];

  return rawPosts
    .map(normalizePost)
    .filter((item): item is BlogPost => item !== null)
    .filter((item) => item.status === "published");
}

function getSafePage(pageParam: string | undefined, totalPages: number) {
  const requested = Number(pageParam || "1");
  if (!Number.isFinite(requested)) return 1;
  return Math.max(1, Math.min(Math.floor(requested), totalPages));
}

function getSafeCategory(
  categoryParam: string | undefined,
  validIds: string[]
) {
  if (!categoryParam) return "all";
  return validIds.includes(categoryParam) ? categoryParam : "all";
}

function filterByCategory(posts: BlogPost[], category: string) {
  if (category === "all") return posts;
  return posts.filter((post) => post.categoryId === category);
}

export const dynamic = "force-dynamic";

type BlogsSearchParams = { page?: string; category?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<BlogsSearchParams>;
}): Promise<Metadata> {
  const { page: pageParam, category: categoryParam } = await searchParams;
  const baseMetadata = await getPageMetadata("blogs");

  const baseUrl = await getBaseUrl();
  if (!baseUrl) return baseMetadata;

  // category=all (یا نبودنش) یعنی بدون فیلتر واقعی، و page=1 (یا نبودنش)
  // یعنی صفحه‌ی اول — یعنی این حالت دقیقاً همون محتوای روتِ خامِ /blogs
  // رو نشون می‌ده، پس نباید canonical جدا از /blogs بگیره.
  const isFirstPageParam = !pageParam || Number(pageParam) <= 1;

  if ((!categoryParam || categoryParam === "all") && isFirstPageParam) {
    return baseMetadata;
  }

  try {
    const [publishedPosts, categories] = await Promise.all([
      getPublishedPosts(baseUrl),
      getCategories(baseUrl),
    ]);

    const category = getSafeCategory(
      categoryParam,
      categories.map((c) => c.id)
    );

    // دسته‌ی نامعتبر که به all برمی‌گرده + صفحه‌ی اول
    if (category === "all" && isFirstPageParam) return baseMetadata;

    const scopedPosts = filterByCategory(publishedPosts, category);
    const totalPages = Math.max(1, Math.ceil(scopedPosts.length / PER_PAGE));
    const currentPage = getSafePage(pageParam, totalPages);

    // "all" یعنی «بدون فیلتر دسته»؛ فقط دسته‌های واقعی صفحه‌بندی
    // مخصوص خودشون رو می‌گیرن.
    const { canonical } =
      category !== "all"
        ? buildBlogsCategoryLinks({
            basePath: "/blogs",
            category,
            currentPage,
            totalPages,
          })
        : buildBlogsPaginationLinks({
            basePath: "/blogs",
            currentPage,
            totalPages,
          });

    return {
      ...baseMetadata,
      alternates: {
        ...(baseMetadata.alternates || {}),
        canonical,
      },
    };
  } catch (error) {
    console.error("generateMetadata /blogs error:", error);
    return baseMetadata;
  }
}

function BlogsJsonLd({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const url = `${SITE_URL}/blogs`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "fa-IR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
        },
      },
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: "صفحه اصلی", url: `${SITE_URL}/` },
        { name: "وبلاگ", url },
      ]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<BlogsSearchParams>;
}) {
  const { page: pageParam, category: categoryParam } = await searchParams;

  if (categoryParam && categoryParam !== "all") {
    const pageNum = Math.floor(Number(pageParam || "1"));
    permanentRedirect(
      `/blogs/category/${encodeURIComponent(categoryParam)}${
        pageNum > 1 ? `?page=${pageNum}` : ""
      }`
    );
  }

  const pageSeo = await getPageSeo("blogs");
  const h1Title = pageSeo.h1Title;
  const baseUrl = await getBaseUrl();

  const hasQuery = pageParam !== undefined || categoryParam !== undefined;

  // دیتای خالی برای وقتی که چیزی از سرور نیومده
  const fallbackData: BlogPageInitialData = {
    blogs: [],
    mediaItems: [],
    categories: FALLBACK_CATEGORIES,
    seo: { h1Title },
    initialPage: 1,
    initialCategory: getSafeCategory(
      categoryParam,
      FALLBACK_CATEGORIES.map((c) => c.id)
    ),
    isBare: !hasQuery,
  };

  if (!baseUrl) {
    return (
      <div className="min-h-screen">
        <BlogPageClient initialData={fallbackData} />
      </div>
    );
  }

  try {
    const [postsResult, mediaResult, categoriesResult] =
      await Promise.allSettled([
        fetchServerJson(`${baseUrl}/api/posts`),
        fetchServerJson(`${baseUrl}/api/media`),
        getCategories(baseUrl),
      ]);

    if (postsResult.status === "rejected") {
      throw postsResult.reason;
    }

    const { response: postsResponse, data: postsData } = postsResult.value;

    if (!postsResponse.ok) {
      throw new Error(postsData?.message || "خطا در دریافت پست‌ها");
    }

    const categories: CategoryItem[] =
      categoriesResult.status === "fulfilled"
        ? categoriesResult.value
        : FALLBACK_CATEGORIES;

    const category = getSafeCategory(
      categoryParam,
      categories.map((c) => c.id)
    );

    const rawPosts: RawBlogPost[] = Array.isArray(postsData)
      ? postsData
      : Array.isArray(postsData?.posts)
      ? postsData.posts
      : [];

    const publishedPosts = rawPosts
      .map(normalizePost)
      .filter((item): item is BlogPost => item !== null)
      .filter((item) => item.status === "published");

    let mediaItems: MediaItem[] = [];

    if (mediaResult.status === "fulfilled") {
      const { response: mediaResponse, data: mediaData } = mediaResult.value;
      if (mediaResponse.ok) {
        mediaItems = Array.isArray(mediaData)
          ? mediaData
          : Array.isArray(mediaData?.media)
          ? mediaData.media
          : Array.isArray(mediaData?.items)
          ? mediaData.items
          : [];
      }
    }

    const scopedPosts = filterByCategory(publishedPosts, category);
    const totalPages = Math.max(1, Math.ceil(scopedPosts.length / PER_PAGE));
    const initialPage = getSafePage(pageParam, totalPages);

    // rel=next/prev همیشه باید پجینیشنِ واقعی رو نشون بده -- مستقل از
    // اینکه URL «خام» بوده یا صریح. این با canonical فرق داره: کنونیکال
    // حق داره دو تا URL همسان رو یکی حساب کنه، ولی prev/next یه مفهوم
    // جداگانه‌ست و نباید با ناوبریِ سطح‌سایت قاطی بشه -- دقیقاً
    // همون قانونی که توی /services داریم.
    const { prevUrl, nextUrl } =
      category !== "all"
        ? buildBlogsCategoryLinks({
            basePath: "/blogs",
            category,
            currentPage: initialPage,
            totalPages,
          })
        : buildBlogsPaginationLinks({
            basePath: "/blogs",
            currentPage: initialPage,
            totalPages,
          });

    const initialData: BlogPageInitialData = {
      blogs: publishedPosts,
      mediaItems,
      categories,
      seo: { h1Title },
      initialPage,
      initialCategory: category,
      isBare: !hasQuery,
    };

    return (
      <div className="min-h-screen">
        <BlogsJsonLd
          title={pageSeo.metaTitle}
          description={pageSeo.metaDescription}
        />
        {prevUrl && <link rel="prev" href={prevUrl} />}
        {nextUrl && <link rel="next" href={nextUrl} />}
        <BlogPageClient initialData={initialData} />
      </div>
    );
  } catch (error) {
    console.error("GET blogs list error:", error);

    return (
      <div className="min-h-screen">
        <BlogPageClient initialData={fallbackData} />
      </div>
    );
  }
}