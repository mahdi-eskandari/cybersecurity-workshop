


import type { Metadata } from "next";
import { headers } from "next/headers";
import HomePageClient, {
  type HomePageInitialData,
} from "./HomePageClient";

import {
  getPageMetadata,
  getPageSeo,
  getAdjacentPageLinks,
  SITE_URL,
} from "@/lib/seo";

import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "../../../lib/schema"

type Post = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published" | string;
  createdAt: string;
  updatedAt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  tag?: string;
  tagColor?: string;
  categoryId: string;
  author?: string;
  date?: string;
  readingTime?: string;
  excerpt?: string;
};

function getOrigin(requestHeaders: Headers) {
  const forwardedProto = requestHeaders
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim();

  const forwardedHost = requestHeaders
    .get("x-forwarded-host")
    ?.split(",")[0]
    ?.trim();

  const host =
    forwardedHost || requestHeaders.get("host");

  if (host) {
    return `${forwardedProto || "https"}://${host}`;
  }

  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  );
}

async function getInitialData(
  seo: Awaited<ReturnType<typeof getPageSeo>>
): Promise<HomePageInitialData> {
  const requestHeaders = await headers();

  const origin = getOrigin(requestHeaders);

  const cookie =
    requestHeaders.get("cookie") || "";

  const fetchJson = async (path: string) => {
    const response = await fetch(
      `${origin}${path}`,
      {
        headers: cookie
          ? { cookie }
          : undefined,
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${path}: ${response.status}`
      );
    }

    return response.json();
  };

  const [postsResult, mediaResult] =
    await Promise.allSettled([
      fetchJson("/api/posts"),
      fetchJson("/api/media"),
    ]);

  const postsPayload =
    postsResult.status === "fulfilled"
      ? postsResult.value
      : [];

  const mediaPayload =
    mediaResult.status === "fulfilled"
      ? mediaResult.value
      : [];

  const posts = Array.isArray(postsPayload)
    ? postsPayload
    : Array.isArray(postsPayload?.posts)
      ? postsPayload.posts
      : [];

  const media = Array.isArray(mediaPayload)
    ? mediaPayload
    : Array.isArray(mediaPayload?.media)
      ? mediaPayload.media
      : [];

  return {
    posts: posts as Post[],
    media,

    seo: {
      h1Title:
        seo.h1Title ||
        "هیچ مجرمی در دنیای دیجیتال بی‌ردپا نیست.",
    },
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home");
}

function HomePageJsonLd({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const canonical = `${SITE_URL}/`;

  const jsonLd = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${canonical}#website`,
        name: "پاراهور",
        url: canonical,
        description,
        inLanguage: "fa-IR",
      },

      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: "fa-IR",

        isPartOf: {
          "@type": "WebSite",
          "@id": `${canonical}#website`,
        },
      },

      buildOrganizationSchema(),

      buildBreadcrumbSchema([
        {
          name: "صفحه اصلی",
          url: canonical,
        },
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

export default async function HomePage() {
  const [seo, adjacent] = await Promise.all([
    getPageSeo("home"),
    getAdjacentPageLinks("home"),
  ]);

  const data = await getInitialData(seo);

  return (
    <>
      {adjacent.prevUrl && (
        <link
          rel="prev"
          href={adjacent.prevUrl}
        />
      )}

      {adjacent.nextUrl && (
        <link
          rel="next"
          href={adjacent.nextUrl}
        />
      )}

      <HomePageJsonLd
        title={seo.metaTitle}
        description={seo.metaDescription}
      />

      <HomePageClient
        initialData={data}
      />
    </>
  );
}




