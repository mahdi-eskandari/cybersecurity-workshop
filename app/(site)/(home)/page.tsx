import type { Metadata } from "next";
import HomePageClient, { type HomePageInitialData } from "./HomePageClient";
import {
  getPageMetadata,
  getPageSeo,
  getAdjacentPageLinks,
  SITE_URL,
} from "@/lib/seo";
import { buildOrganizationSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { getPublishedPostsLite } from "@/lib/publicPosts";

async function getInitialData(
  seo: Awaited<ReturnType<typeof getPageSeo>>
): Promise<HomePageInitialData> {
  let posts: any[] = [];

  try {
    const all = await getPublishedPostsLite();
    posts = [...all]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      )
      .slice(0, 3);
  } catch (error) {
    console.error("home posts error:", error);
  }

  return {
    posts,
    media: [],
    seo: {
      h1Title:
        seo.h1Title || "هیچ مجرمی در دنیای دیجیتال بی‌ردپا نیست.",
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
        isPartOf: { "@type": "WebSite", "@id": `${canonical}#website` },
      },
      buildOrganizationSchema(),
      buildBreadcrumbSchema([{ name: "صفحه اصلی", url: canonical }]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
      {adjacent.prevUrl && <link rel="prev" href={adjacent.prevUrl} />}
      {adjacent.nextUrl && <link rel="next" href={adjacent.nextUrl} />}

      <HomePageJsonLd title={seo.metaTitle} description={seo.metaDescription} />

      <HomePageClient initialData={data} />
    </>
  );
}