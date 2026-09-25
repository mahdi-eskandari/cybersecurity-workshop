import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  getStaticPageMetadata,
  getPageSeo,
  getAdjacentPageLinks,
  SITE_URL,
} from "@/lib/seo";
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";
import AuthorsClient, { type Post } from "./AuthorsClient";

// این پیج عمداً از getPageMetadata استفاده نمی‌کنه چون اون از
// دیتابیس/پنل ادمین می‌خونه؛ اینجا همیشه باید همون تایتل ثابتِ
// SEO_DEFAULTS.authors روی تب مرورگر بیاد، نه چیزی که تو پنل
// برای pageKey "authors" ست شده.
export async function generateMetadata(): Promise<Metadata> {
  return getStaticPageMetadata("authors");
}

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
  const canonical = `${SITE_URL}/authors`;

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

  const [posts, seo, adjacent] = await Promise.all([
    getPosts(),
    getPageSeo("authors"),
    getAdjacentPageLinks("authors"),
  ]);

  const showAllPosts = params.view === "all";
  const currentPage = parsePage(params.page);

  return (
    <>
      {adjacent.prevUrl && <link rel="prev" href={adjacent.prevUrl} />}
      {adjacent.nextUrl && <link rel="next" href={adjacent.nextUrl} />}

      <AuthorsJsonLd
        title={seo.metaTitle}
        description={seo.metaDescription}
      />

      <AuthorsClient
        posts={posts}
        authorSlug="mohammadreza-yousefi"
        showAllPosts={showAllPosts}
        currentPage={currentPage}
        seoH1={seo.h1Title}
        basePath="/authors"
      />
    </>
  );
}
