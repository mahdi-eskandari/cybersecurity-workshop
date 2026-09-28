

import { headers } from "next/headers";
import type { Metadata } from "next";
import BlogPageClient, { type BlogPageInitialData } from "./BlogPageClient";
import {
  buildBlogsPaginationLinks,
  buildBlogsCategoryLinks,
  getAdjacentPageLinks,
  getPageMetadata,
} from "@/lib/seo";

const PER_PAGE = 6;

// همون idهای BLOG_CATEGORIES تو BlogPageClient.tsx (اونجا "use client"ه
// و نمی‌شه ازش تابع/آرایه رو مستقیم سمت سرور import کرد) — هر وقت اونجا
// دسته‌بندی اضافه/کم شد، همینجا هم دستی sync کن.
const VALID_CATEGORY_IDS = [
  "all",
  "forensic-reports",
  "legal-news",
  "solved-cases",
  "security-alerts",
  "security-education",
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

function getSafeCategory(categoryParam: string | undefined) {
  if (!categoryParam) return "all";
  return VALID_CATEGORY_IDS.includes(categoryParam) ? categoryParam : "all";
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
  // رو نشون می‌ده (چون پایین‌تر هم دقیقاً همین دوتا default حساب می‌شن)،
  // پس نباید canonical جدا از /blogs بگیره.
  const category = getSafeCategory(categoryParam);
  const isFirstPageParam = !pageParam || Number(pageParam) <= 1;
  const isBareEquivalent = category === "all" && isFirstPageParam;

  if (isBareEquivalent) return baseMetadata;

  try {
    const publishedPosts = await getPublishedPosts(baseUrl);
    const scopedPosts = filterByCategory(publishedPosts, category);
    const totalPages = Math.max(1, Math.ceil(scopedPosts.length / PER_PAGE));
    const currentPage = getSafePage(pageParam, totalPages);

    // "all" یعنی «بدون فیلتر دسته»، پس دقیقاً مثل نبودن categoryParam
    // حساب می‌شه؛ وگرنه /blogs?category=all یه کانونیکال جدا از /blogs
    // می‌گرفت و می‌شد محتوای تکراری. فقط دسته‌های واقعی صفحه‌بندی
    // مخصوص خودشون رو می‌گیرن.
    const { canonical } = categoryParam && categoryParam !== "all"
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<BlogsSearchParams>;
}) {
  const { page: pageParam, category: categoryParam } = await searchParams;
  const baseUrl = await getBaseUrl();

  const hasQuery = pageParam !== undefined || categoryParam !== undefined;
  const category = getSafeCategory(categoryParam);

  const emptyData: BlogPageInitialData = {
    blogs: [],
    mediaItems: [],
    seo: { h1Title: "بلاگ پاراهور" },
    initialPage: 1,
    initialCategory: category,
    isBare: !hasQuery,
  };

  if (!baseUrl) {
    return (
      <div className="min-h-screen">
        <BlogPageClient initialData={emptyData} />
      </div>
    );
  }

  try {
    const [postsResult, mediaResult] = await Promise.allSettled([
      fetchServerJson(`${baseUrl}/api/posts`),
      fetchServerJson(`${baseUrl}/api/media`),
    ]);

    if (postsResult.status === "rejected") {
      throw postsResult.reason;
    }

    const { response: postsResponse, data: postsData } = postsResult.value;

    if (!postsResponse.ok) {
      throw new Error(postsData?.message || "خطا در دریافت پست‌ها");
    }

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
    // جداگانه‌ست (آیا صفحه‌ی بعدی/قبلیِ همین لیست وجود داره یا نه) و
    // نباید با ناوبریِ سطح‌سایت (خدمات/درباره‌ما) قاطی بشه -- دقیقاً
    // همون قانونی که توی /services داریم.
    const { prevUrl, nextUrl } = categoryParam && categoryParam !== "all"
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
      seo: { h1Title: "بلاگ پاراهور" },
      initialPage,
      initialCategory: category,
      isBare: !hasQuery,
    };

    return (
      <div className="min-h-screen">
        {prevUrl && <link rel="prev" href={prevUrl} />}
        {nextUrl && <link rel="next" href={nextUrl} />}
        <BlogPageClient initialData={initialData} />
      </div>
    );
  } catch (error) {
    console.error("GET blogs list error:", error);

    return (
      <div className="min-h-screen">
        <BlogPageClient initialData={emptyData} />
      </div>
    );
  }
}

