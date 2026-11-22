import { headers } from "next/headers";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPageClient, { type BlogPageInitialData } from "../../BlogPageClient";
import { SITE_URL, getPageSeo } from "@/lib/seo";
import { buildOrganizationSchema, buildBreadcrumbSchema } from "@/lib/schema";

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

async function getJson(url: string): Promise<any> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function loadData(rawCategory: string) {
  const h = await headers();
  const host = h.get("host");
  if (!host) return null;
  const baseUrl = `${h.get("x-forwarded-proto") || "http"}://${host}`;

  const [catData, postsData, mediaData] = await Promise.all([
    getJson(`${baseUrl}/api/categories`),
    getJson(`${baseUrl}/api/posts`),
    getJson(`${baseUrl}/api/media`),
  ]);

  const categories: CategoryItem[] =
    Array.isArray(catData) && catData.length
      ? catData
          .map((c: any) => ({ id: String(c.id), label: String(c.label) }))
          .filter((c) => c.id && c.label)
      : FALLBACK_CATEGORIES;

  let id = rawCategory;
  try {
    id = decodeURIComponent(rawCategory);
  } catch {}

  const current = categories.find((c) => c.id === id);
  if (!current) return null;

  const rawPosts: any[] = Array.isArray(postsData)
    ? postsData
    : Array.isArray(postsData?.posts)
    ? postsData.posts
    : [];

  const publishedPosts = rawPosts.filter((p) => p?.status === "published");
  const categoryPosts = publishedPosts.filter((p) => p.categoryId === id);

  const mediaItems = Array.isArray(mediaData)
    ? mediaData
    : Array.isArray(mediaData?.media)
    ? mediaData.media
    : Array.isArray(mediaData?.items)
    ? mediaData.items
    : [];

  const totalPages = Math.max(1, Math.ceil(categoryPosts.length / PER_PAGE));

  return { current, categories, publishedPosts, mediaItems, totalPages };
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

  return {
    title: { absolute: `${label} | وبلاگ پاراهور` },
    description: `مقالات و گزارش‌های دسته «${label}» در وبلاگ پاراهور.`,
    alternates: { canonical: categoryUrl(data.current.id, currentPage) },
    robots: { index: true, follow: true },
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