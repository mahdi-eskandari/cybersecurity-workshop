import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPageClient, { type BlogPageInitialData } from "../../BlogPageClient";

import { buildOrganizationSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { getPublishedPostsLite, getCategoriesList } from "@/lib/publicPosts";
import {
  getPageSeo,
  SITE_URL,
  getSocialDefaults,
  applyGlobalRobots,
  brandTitle,
} from "@/lib/seo";
import { getCategorySeo } from "@/lib/categorySeo";

export const dynamic = "force-dynamic";

const PER_PAGE = 6;

type CategoryItem = { id: string; label: string };

const FALLBACK_CATEGORIES: CategoryItem[] = [
  { id: "forensic-reports", label: "گزارش‌های جرم‌شناسی" },
  { id: "legal-news", label: "اخبار حقوقی" },
  { id: "solved-cases", label: "پرونده‌های حل‌شده" },
  { id: "security-alerts", label: "هشدارهای امنیتی" },
  { id: "security-education", label: "آموزش امنیت و تهدیدات سایبری" },
];

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

async function loadData(rawCategory: string) {
  try {
    const [catList, publishedPosts] = await Promise.all([
      getCategoriesList().catch(() => [] as CategoryItem[]),
      getPublishedPostsLite(),
    ]);

    const categories = catList.length ? catList : FALLBACK_CATEGORIES;

    let id = rawCategory;
    try {
      id = decodeURIComponent(rawCategory);
    } catch {}

    const current = categories.find((c) => c.id === id);
    if (!current) return null;

    const categoryPosts = publishedPosts.filter((p) => p.categoryId === id);
    if (categoryPosts.length === 0) return null;

    const totalPages = Math.max(1, Math.ceil(categoryPosts.length / PER_PAGE));

    return { current, categories, publishedPosts, mediaItems: [], totalPages };
  } catch (error) {
    console.error("category page error:", error);
    return null;
  }
}

function safePage(param: string | undefined, totalPages: number) {
  const n = Math.floor(Number(param || "1"));
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(n, totalPages));
}

function categoryUrl(id: string, page = 1) {
  const base = `${SITE_URL}/blogs/category/${encodeURIComponent(id)}`;
  return page > 1 ? `${base}?page=${page}` : base;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { category } = await params;
  const { page } = await searchParams;
  const data = await loadData(category);

  if (!data) return { title: "صفحه پیدا نشد", robots: { index: false, follow: false } };

  const currentPage = safePage(page, data.totalPages);
  const label = data.current.label;
  const url = categoryUrl(data.current.id, currentPage);

  // سئوی ذخیره‌شده از پنل ادمین (اگر خالی باشد، متن خودکار قبلی)
  const seo = await getCategorySeo(data.current.id);

  const title: Metadata["title"] = seo.metaTitle
    ? brandTitle(seo.metaTitle)
    : { absolute: `${label} | وبلاگ پاراهور` };

  const ogTitle = seo.metaTitle || `${label} | وبلاگ پاراهور`;

  const description =
    seo.metaDescription || `مقالات و گزارش‌های دسته «${label}» در وبلاگ پاراهور.`;

  const social = await getSocialDefaults();

  const imageUrl = seo.ogImage
    ? /^https?:\/\//i.test(seo.ogImage)
      ? seo.ogImage
      : `${SITE_URL}${seo.ogImage.startsWith("/") ? "" : "/"}${seo.ogImage}`
    : social.image;

  const imageAlt = seo.ogImageAlt || social.imageAlt || label;

  const robots = await applyGlobalRobots(seo.index, seo.follow);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots,
    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: social.siteName,
      title: ogTitle,
      description,
      url,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      site: social.twitterSite,
      title: ogTitle,
      description,
      images: [imageUrl],
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { page } = await searchParams;
  const data = await loadData(category);

  if (!data) notFound();

  const pageSeo = await getPageSeo("blogs");

  const { current, categories, publishedPosts, mediaItems, totalPages } = data;
  const currentPage = safePage(page, totalPages);

  const prevUrl = currentPage > 1 ? categoryUrl(current.id, currentPage - 1) : null;
  const nextUrl = currentPage < totalPages ? categoryUrl(current.id, currentPage + 1) : null;

  const initialData: BlogPageInitialData = {
    blogs: publishedPosts,
    mediaItems,
    categories,
    seo: { h1Title: pageSeo.h1Title },
    initialPage: currentPage,
    initialCategory: current.id,
    isBare: false,
  };

  const pageUrl = categoryUrl(current.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${current.label} | وبلاگ پاراهور`,
        description: `مقالات و گزارش‌های دسته «${current.label}» در وبلاگ پاراهور.`,
        inLanguage: "fa-IR",
        isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
      },
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: "صفحه اصلی", url: `${SITE_URL}/` },
        { name: "وبلاگ", url: `${SITE_URL}/blogs` },
        { name: current.label, url: pageUrl },
      ]),
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}
      <BlogPageClient initialData={initialData} />
    </div>
  );
}