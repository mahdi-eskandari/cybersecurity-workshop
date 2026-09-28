


import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import {
  getPageMetadata,
  getPageSeo,
  getAdjacentPageLinks,
  SITE_URL,
} from "@/lib/seo";
import { buildOrganizationSchema, buildBreadcrumbSchema } from "../../../lib/schema";

const CONTACT_PATH = "/contact";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("contact");
}

function ContactPageJsonLd({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const canonical = `${SITE_URL}${CONTACT_PATH}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${canonical}#contactpage`,
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
        { name: "تماس با ما", url: canonical },
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

export default async function ContactPage() {
  const seo = await getPageSeo("contact");
  const { prevUrl, nextUrl } = await getAdjacentPageLinks("contact");

  return (
    <>
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      <ContactPageJsonLd
        title={seo.metaTitle}
        description={seo.metaDescription}
      />

      <ContactPageClient h1Title={seo.h1Title} />
    </>
  );
}
