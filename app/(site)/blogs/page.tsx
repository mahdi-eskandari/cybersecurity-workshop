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
import { buildOrganizationSchema, buildBreadcrumbSchema } from "@/lib/schema";
import {
  getPublishedPostsLite,
  getCategoriesList,
  type PlainPost,
} from "@/lib/publicPosts";

const PER_PAGE = 6;

type CategoryItem = { id: string; label: string };

const FALLBACK_CATEGORIES: CategoryItem[] = [
  { id: "forensic-reports", label: "گزارش‌های جرم‌شناسی" },
  { id: "legal-news", label: "اخبار حقوقی" },
  { id: "solved-cases", label: "پرونده‌های حل‌شده" },
  { id: "security-alerts", label: "هشدارهای امنیتی" },
  { id: "security-education", label: "آموزش امنیت و تهدیدات سایبری" },
];

async function loadCategories(): Promise<CategoryItem[]> {
  try {
    const list = await getCategoriesList();
    return list.length ? list : FALLBACK_CATEGORIES;
  } catch {
    return FALLBACK_CATEGORIES;
  }
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

function filterByCategory(posts: PlainPost[], category: string) {
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

  const isFirstPageParam = !pageParam || Number(pageParam) <= 1;

  if ((!categoryParam || categoryParam === "all") && isFirstPageParam) {
    return baseMetadata;
  }

  try {
    const [publishedPosts, categories] = await Promise.all([
      getPublishedPostsLite(),
      loadCategories(),
    ]);

    const category = getSafeCategory(
      categoryParam,
      categories.map((c) => c.id)
    );

    if (category === "all" && isFirstPageParam) return baseMetadata;

    const scopedPosts = filterByCategory(publishedPosts, category);
    const totalPages = Math.max(1, Math.ceil(scopedPosts.length / PER_PAGE));
    const currentPage = getSafePage(pageParam, totalPages);

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
      alternates: { ...(baseMetadata.alternates || {}), canonical },
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
        isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
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
  const hasQuery = pageParam !== undefined || categoryParam !== undefined;

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

  try {
    const [publishedPosts, categories] = await Promise.all([
      getPublishedPostsLite(),
      loadCategories(),
    ]);

    const category = getSafeCategory(
      categoryParam,
      categories.map((c) => c.id)
    );

    const scopedPosts = filterByCategory(publishedPosts, category);
    const totalPages = Math.max(1, Math.ceil(scopedPosts.length / PER_PAGE));
    const initialPage = getSafePage(pageParam, totalPages);

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
      mediaItems: [],
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