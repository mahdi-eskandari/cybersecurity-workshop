





import type { Metadata } from "next";

import PrivacyPageClient from "./PrivacyPageClient";

import {
  getPageMetadata,
  getPageSeo,
  getAdjacentPageLinks,
  SITE_URL,
} from "@/lib/seo";

import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";

const PRIVACY_PATH = "/privacy";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("privacy");
}

function PrivacyPageJsonLd({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const canonical = `${SITE_URL}${PRIVACY_PATH}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
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
        {
          name: "صفحه اصلی",
          url: `${SITE_URL}/`,
        },
        {
          name: "حریم خصوصی",
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

export default async function PrivacyPage() {
  const seo = await getPageSeo("privacy");

  const { prevUrl, nextUrl } =
    await getAdjacentPageLinks("privacy");

  return (
    <>
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      <PrivacyPageJsonLd
        title={seo.metaTitle}
        description={seo.metaDescription}
      />

      <PrivacyPageClient
        h1Title={seo.h1Title}
      />
    </>
  );
}