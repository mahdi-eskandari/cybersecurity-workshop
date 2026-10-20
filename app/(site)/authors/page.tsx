import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  getStaticPageMetadata,
  getPageSeo,
  getAdjacentPageLinks,
  buildPaginationLinks,
  SITE_URL,
  type PageKey,
} from "@/lib/seo";
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";
import AuthorsClient from "./AuthorsClient";
import { type Post, getAuthorPosts, POSTS_PER_PAGE, authors } from "./authorsData";
const AUTHOR_ID = "mohammadreza-yousefi";
const BASE_PATH = "/authors";

async function getPosts(): Promise<Post[]> {
  try {
    const h = await headers();
    const host = h.get("host");

    if (!host) {
      return [];
    }

    const protocol = h.get("x-forwarded-proto") ?? "http";
    const response = await fetch(`${protocol}://${host}/api/posts`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("خطا در دریافت پست‌ها");
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("فرمت اطلاعات پست‌ها صحیح نیست");
    }

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

// این پیج عمداً از getPageMetadata استفاده نمی‌کنه چون اون از
// دیتابیس/پنل ادمین می‌خونه؛ اینجا همیشه باید همون تایتل ثابتِ
// SEO_DEFAULTS.authors روی تب مرورگر بیاد، نه چیزی که تو پنل
// برای pageKey "authors" ست شده. فقط canonical (که به page/view
// وابسته‌ست) رو روش override می‌کنیم.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; page?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const showAllPosts = params.view === "all";
  const currentPage = parsePage(params.page);

  const posts = await getPosts();
  const authorPosts = getAuthorPosts(posts, AUTHOR_ID);
  const totalPages = Math.max(
    1,
    Math.ceil(authorPosts.length / POSTS_PER_PAGE)
  );

  const base = getStaticPageMetadata("authors");
  const pagination = buildPaginationLinks({
    basePath: BASE_PATH,
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

/* =========================================================
   JSON-LD — دقیقاً همون الگوی HomePageJsonLd
========================================================= */

function AuthorsJsonLd({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const canonical = `${SITE_URL}${BASE_PATH}`;

  const jsonLd = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
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
        { name: "نویسندگان", url: canonical },
      ]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}

export default async function AuthorsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; page?: string }>;
}) {
  const params = await searchParams;

    const authorSeos = await Promise.all(
    authors.map(async (a) => ({
      id: a.id,
      seo: await getPageSeo(`author-${a.id}` as PageKey),
    }))
  );
  const slugMap = Object.fromEntries(authorSeos.map((x) => [x.id, x.seo.slug]));

  const [posts, seo, adjacent] = await Promise.all([
    getPosts(),
    getPageSeo("authors"),
    getAdjacentPageLinks("authors"),
  ]);

  const showAllPosts = params.view === "all";
  const currentPage = parsePage(params.page);

  const authorPosts = getAuthorPosts(posts, AUTHOR_ID);
  const totalPages = Math.max(
    1,
    Math.ceil(authorPosts.length / POSTS_PER_PAGE)
  );

  const pagination = buildPaginationLinks({
    basePath: BASE_PATH,
    showAllPosts,
    currentPage,
    totalPages,
  });

  // وقتی تو حالت صفحه‌بندی‌شده (view=all) هستیم، prev/next باید بین
  // صفحات مقاله‌ها باشه، نه بین بخش‌های سایت (که adjacent میده).
  const prevUrl = showAllPosts ? pagination.prevUrl : adjacent.prevUrl;
  const nextUrl = showAllPosts ? pagination.nextUrl : adjacent.nextUrl;

  return (
    <>
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      <AuthorsJsonLd
        title={seo.metaTitle}
        description={seo.metaDescription}
      />

      <AuthorsClient
        posts={posts}
        authorSlug={AUTHOR_ID}
        showAllPosts={showAllPosts}
        currentPage={currentPage}
        seoH1={seo.h1Title}
        slugMap={slugMap}
        basePath={BASE_PATH}
      />
    </>
  );
}
