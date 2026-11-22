


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
import connectDB from "@/lib/mongodb";
import PostModel from "../../model/blog";
import MediaModel from "../../model/media";

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

// function getOrigin(requestHeaders: Headers) {
//   const forwardedProto = requestHeaders
//     .get("x-forwarded-proto")
//     ?.split(",")[0]
//     ?.trim();

//   const forwardedHost = requestHeaders
//     .get("x-forwarded-host")
//     ?.split(",")[0]
//     ?.trim();

//   const host =
//     forwardedHost || requestHeaders.get("host");

//   if (host) {
//     return `${forwardedProto || "https"}://${host}`;
//   }

//   return (
//     process.env.NEXT_PUBLIC_SITE_URL ||
//     "http://localhost:3000"
//   );
// }

// async function getInitialData(
//   seo: Awaited<ReturnType<typeof getPageSeo>>
// ): Promise<HomePageInitialData> {
//   const requestHeaders = await headers();

//   const origin = getOrigin(requestHeaders);

//   const cookie =
//     requestHeaders.get("cookie") || "";

//   const fetchJson = async (path: string) => {
//     const response = await fetch(
//       `${origin}${path}`,
//       {
//         headers: cookie
//           ? { cookie }
//           : undefined,
//         cache: "no-store",
//       }
//     );

//     if (!response.ok) {
//       throw new Error(
//         `Failed to fetch ${path}: ${response.status}`
//       );
//     }

//     return response.json();
//   };

//   const [postsResult, mediaResult] =
//     await Promise.allSettled([
//       fetchJson("/api/posts"),
//       fetchJson("/api/media"),
//     ]);

//   const postsPayload =
//     postsResult.status === "fulfilled"
//       ? postsResult.value
//       : [];

//   const mediaPayload =
//     mediaResult.status === "fulfilled"
//       ? mediaResult.value
//       : [];

//   const posts = Array.isArray(postsPayload)
//     ? postsPayload
//     : Array.isArray(postsPayload?.posts)
//       ? postsPayload.posts
//       : [];

//   const media = Array.isArray(mediaPayload)
//     ? mediaPayload
//     : Array.isArray(mediaPayload?.media)
//       ? mediaPayload.media
//       : [];

//   return {
//     posts: posts as Post[],
//     media,

//     seo: {
//       h1Title:
//         seo.h1Title ||
//         "هیچ مجرمی در دنیای دیجیتال بی‌ردپا نیست.",
//     },
//   };
// }


function stripHtml(html = "") {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function makeExcerpt(content = "", max = 170) {
  const text = stripHtml(content);
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

async function getInitialData(
  seo: Awaited<ReturnType<typeof getPageSeo>>
): Promise<HomePageInitialData> {
  const h1Title =
    seo.h1Title || "هیچ مجرمی در دنیای دیجیتال بی‌ردپا نیست.";

  try {
    await connectDB();

    // فقط ۳ پست جدیدِ منتشرشده، مستقیم از دیتابیس
    const latest = await PostModel.find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(3)
      .select(
        "title slug content categoryId featuredImage featuredImageAlt readingTime createdAt"
      )
      .lean();

    const posts: Post[] = latest.map((p: any) => ({
      _id: String(p._id),
      title: p.title,
      slug: p.slug,
      status: "published",
      categoryId: p.categoryId,
      featuredImage: p.featuredImage ?? undefined,
      featuredImageAlt: p.featuredImageAlt ?? undefined,
      readingTime: String(p.readingTime ?? 0),
      createdAt: new Date(p.createdAt).toISOString(),
      content: "", // متن کامل به کلاینت نمی‌ره
      excerpt: makeExcerpt(p.content), // کلاینت از همین استفاده می‌کنه
    }));

    // فقط تصویر همین ۳ پست، نه همه‌ی رسانه‌ها
    const ids = posts
      .map((p) => String(p.featuredImage || "").replace("/api/media/", ""))
      .filter((v) => /^[a-f\d]{24}$/i.test(v));

    const mediaDocs = ids.length
      ? await MediaModel.find({ _id: { $in: ids } })
          .select("url alt")
          .lean()
      : [];

    const media = mediaDocs.map((m: any) => ({
      id: String(m._id),
      url: m.url,
      alt: m.alt ?? "",
    }));

    return { posts, media, seo: { h1Title } };
  } catch (error) {
    console.error("HomePage data error:", error);
    return { posts: [], media: [], seo: { h1Title } };
  }
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




