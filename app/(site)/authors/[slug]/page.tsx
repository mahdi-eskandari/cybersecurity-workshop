import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";
import {
  getPageMetadata,
  getPageSeo,
  buildPaginationLinks,
  getAdjacentPageLinks,
  type PageKey,
} from "@/lib/seo";
import AuthorsClient from "../AuthorsClient";
import { type Post, getAuthorPosts, POSTS_PER_PAGE } from "../authorsData";

async function getPosts(): Promise<Post[]> {
  try {
    const h = await headers();
    const host = h.get("host");

    if (!host) return [];

    const protocol = h.get("x-forwarded-proto") ?? "http";
    const response = await fetch(`${protocol}://${host}/api/posts`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) throw new Error("خطا در دریافت پست‌ها");

    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("فرمت اطلاعات پست‌ها صحیح نیست");

    return data as Post[];
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return [];
  }
}

const parsePage = (value?: string) => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

// این لیست فقط identity ثابت نویسنده‌هاست (برای انتخاب بیوگرافی/تگ‌ها
// در AuthorsClient) و هیچ ربطی به روت/اسلاگ ندارد.
const AUTHOR_IDENTITIES = [
  "mohammadreza-yousefi",
  "alireza-tabatabaei-hashemi",
] as const;

type AuthorIdentity = (typeof AUTHOR_IDENTITIES)[number];

function toPageKey(identity: AuthorIdentity): PageKey {
  return `author-${identity}` as PageKey;
}

// اسلاگ واقعیِ URL رو با اسلاگی که الان توی دیتابیس/پنل ادمین
// برای هر نویسنده ذخیره شده مقایسه می‌کنیم؛ نه با یک مقدار ثابت توی کد.
// cache() باعث می‌شه توی یک ریکوئست، بین generateMetadata و خود
// کامپوننت صفحه، دوبار به دیتابیس نزنیم.
const resolveAuthorByRouteSlug = cache(async (routeSlug: string) => {
  const results = await Promise.all(
    AUTHOR_IDENTITIES.map(async (identity) => ({
      identity,
      seo: await getPageSeo(toPageKey(identity)),
    }))
  );

  return results.find(({ seo }) => seo.slug === routeSlug) ?? null;
});

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ view?: string; page?: string }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const match = await resolveAuthorByRouteSlug(slug);

  if (!match) return {};

  const showAllPosts = query.view === "all";
  const currentPage = parsePage(query.page);

  const posts = await getPosts();
  const authorPosts = getAuthorPosts(posts, match.identity);
  const totalPages = Math.max(
    1,
    Math.ceil(authorPosts.length / POSTS_PER_PAGE)
  );

  const base = await getPageMetadata(toPageKey(match.identity));
  const pagination = buildPaginationLinks({
    basePath: `/authors/${match.seo.slug}`,
    showAllPosts,
    currentPage,
    totalPages,
  });

  return {
    ...base,
    alternates: {
      ...base.alternates,
      canonical: pagination.canonical,
    },
  };
}

export default async function AuthorPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ view?: string; page?: string }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);

  const match = await resolveAuthorByRouteSlug(slug);

  if (!match) notFound();

  const [posts, adjacent] = await Promise.all([
    getPosts(),
    getAdjacentPageLinks(toPageKey(match.identity)),
  ]);

  const showAllPosts = query.view === "all";
  const currentPage = parsePage(query.page);
  const basePath = `/authors/${match.seo.slug}`;

  const authorPosts = getAuthorPosts(posts, match.identity);
  const totalPages = Math.max(
    1,
    Math.ceil(authorPosts.length / POSTS_PER_PAGE)
  );

  const pagination = buildPaginationLinks({
    basePath,
    showAllPosts,
    currentPage,
    totalPages,
  });

  // مثل صفحه‌ی /authors: وقتی تو حالت پجینیشن‌شده (view=all) هستیم،
  // prev/next باید بین صفحات مقاله‌های همین نویسنده باشه؛ وقتی نیستیم
  // (تب پیش‌فرض)، prev/next باید بین بخش‌های سایت (زنجیره‌ی سراسری) باشه.
  const prevUrl = showAllPosts ? pagination.prevUrl : adjacent.prevUrl;
  const nextUrl = showAllPosts ? pagination.nextUrl : adjacent.nextUrl;

  return (
    <>
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      <AuthorsClient
        posts={posts}
        authorSlug={match.identity}
        showAllPosts={showAllPosts}
        currentPage={currentPage}
        seoH1={match.seo.h1Title}
        basePath={basePath}
      />
    </>
  );
}
