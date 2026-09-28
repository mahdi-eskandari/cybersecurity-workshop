


import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import {
  getPageMetadata,
  getPageSeo,
  getAdjacentPageLinks,
  SITE_URL,
} from "@/lib/seo";
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "../../../lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("about");
}

function AboutPageJsonLd({
  title,
  description,
  canonical,
}: {
  title: string;
  description: string;
  canonical: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${canonical}#aboutpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: "fa-IR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: "پاراهور",
        },
      },
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: "صفحه اصلی", url: `${SITE_URL}/` },
        { name: "درباره ما", url: canonical },
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

export default async function AboutPage() {
  const seo = await getPageSeo("about");
  const { prevUrl, nextUrl } = await getAdjacentPageLinks("about");

  const canonical = new URL(
    seo.slug && seo.slug.trim() !== "" ? `/${seo.slug}` : "/",
    SITE_URL
  ).toString();

  return (
    <>
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      <AboutPageJsonLd
        title={seo.metaTitle}
        description={seo.metaDescription}
        canonical={canonical}
      />

      <AboutPageClient h1Title={seo.h1Title} />
    </>
  );
}
