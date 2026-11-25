import { notFound } from "next/navigation";
import { cache } from "react";
import SingleServiceClient from "./SingleServiceClient";
import { SITE_URL } from "@/lib/seo";
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";
import connectDB from "@/lib/mongodb";
import Service from "@/app/model/Service";

export const dynamic = "force-dynamic";

const getService = cache(async (rawSlug: string) => {
  let s = rawSlug;
  try {
    s = decodeURIComponent(rawSlug);
  } catch {}
  s = s.trim().toLowerCase();
  if (!s) return null;

  await connectDB();
  const doc = await Service.findOne({ slug: s, status: "active" }).lean();
  // ObjectId و Date باید به آبجکت ساده تبدیل بشن تا به کلاینت‌کامپوننت برسن
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
});

function ServiceJsonLd({ service }: { service: any }) {
  const name = service.title || service.name || "";
  const url = `${SITE_URL}/services/${service.slug}`;
  const description =
    service.metaDescription ||
    service.shortDesc ||
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

  if (!slug) notFound();

  let service: any = null;
  let failed = false;

  try {
    service = await getService(String(slug));
  } catch (error) {
    console.error("GET service page error:", error);
    failed = true;
  }

  if (failed) {
    return (
      <SingleServiceClient
        initialService={null}
        initialServiceError="دریافت اطلاعات خدمت با خطا مواجه شد."
      />
    );
  }

  if (!service) notFound();

  return (
    <>
      <ServiceJsonLd service={service} />
      <SingleServiceClient initialService={service} initialServiceError="" />
    </>
  );
}