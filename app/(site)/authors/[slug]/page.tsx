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
import { type Post, getAuthorPosts, POSTS_PER_PAGE, authors } from "../authorsData";
import { getPublishedPostsLite } from "@/lib/publicPosts";



async function getPosts(): Promise<Post[]> {
  try {
    return (await getPublishedPostsLite()) as unknown as Post[];
  } catch (error) {
    console.error("authors posts error:", error);
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
  "sara-mohammadzadeh",
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
            canonical: match.seo.canonical?.trim()
        ? base.alternates?.canonical
        : pagination.canonical,
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

    const authorSeos = await Promise.all(
    authors.map(async (a) => ({
      id: a.id,
      seo: await getPageSeo(`author-${a.id}` as PageKey),
    }))
  );
  const slugMap = Object.fromEntries(authorSeos.map((x) => [x.id, x.seo.slug]));

  const [posts, adjacent, authorsSeo] = await Promise.all([
    getPosts(),
    getAdjacentPageLinks(toPageKey(match.identity)),
    getPageSeo("authors"),
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
    seoH1={authorsSeo.h1Title}
  slugMap={slugMap}
    basePath={basePath}
  lockCanonical={Boolean(match.seo.canonical?.trim())}
/>
    </>
  );
}
