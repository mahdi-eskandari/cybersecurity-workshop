

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import SingleServiceClient from "./SingleServiceClient";
import { SITE_URL } from "@/lib/seo";
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";

export const dynamic = "force-dynamic";

async function fetchService(baseUrl: string, slug: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      `${baseUrl}/api/services/${encodeURIComponent(slug)}`,
      {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      }
    );

    if (response.status === 404) {
      return { service: null, error: "", notFound: true };
    }

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result = await response.json();
    const foundService =
      result?.data?.slug ? result.data :
      result?.service?.slug ? result.service :
      result?.slug ? result : null;

    if (!foundService) {
      return { service: null, error: "خدمت موردنظر پیدا نشد.", notFound: true };
    }

    return { service: foundService, error: "", notFound: false };
  } catch (error) {
    console.error("GET /api/services/[slug]:", error);
    return {
      service: null,
      error: "دریافت اطلاعات خدمت با خطا مواجه شد.",
      notFound: false,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function ServiceJsonLd({ service }: { service: any }) {
  const name = service.title || service.name || "";
  const url = `${SITE_URL}/services/${service.slug}`;
  const description =
    service.metaDescription ||
    service.shortDescription ||
    service.description ||
    "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name,
        description,
        url,
        inLanguage: "fa-IR",
        areaServed: { "@type": "Country", name: "ایران" },
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: "صفحه اصلی", url: `${SITE_URL}/` },
        { name: "خدمات", url: `${SITE_URL}/services` },
        { name, url },
      ]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string | string[] }>;
}) {
  const resolvedParams = await params;
  const slugValue = resolvedParams?.slug;
  const slug = Array.isArray(slugValue) ? slugValue[0] : slugValue;

  if (!slug) {
    notFound();
  }

  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ||
    requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") || "http";

  if (!host) {
    return (
      <SingleServiceClient
        initialService={null}
        initialServiceError="دریافت اطلاعات خدمت با خطا مواجه شد."
      />
    );
  }

  const { service, error, notFound: isNotFound } = await fetchService(
    `${protocol}://${host}`,
    String(slug)
  );

  if (isNotFound) {
    notFound();
  }

  return (
  <>
    {service && <ServiceJsonLd service={service} />}
    <SingleServiceClient
      initialService={service}
      initialServiceError={error}
    />
  </>
);
}
