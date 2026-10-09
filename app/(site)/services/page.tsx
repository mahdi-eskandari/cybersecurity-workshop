


import { headers } from "next/headers";
import ServicesPageClient, {
  type ServicesPageInitialData,
} from "./ServicesPageClient";
import {
  getPageMetadata,
  getPageSeo,
  SITE_URL,
} from "@/lib/seo";
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";

type RawService = {
  _id?: string;
  id?: string;
  slug?: string;
  title?: string;
  shortDesc?: string;
  icon?: string;
  tags?: unknown;
  level?: string;
  categoryLabel?: string;
  status?: string;
  body?: string;
  urgencyTitle?: string;
  urgencyDesc?: string;
  metaTitle?: string;
  metaDescription?: string;
};

type ApiResponse<T> = {
  success?: boolean;
  data?: T;
};

type Service = ServicesPageInitialData["services"][number];

const FALLBACK_H1 = "خدمات اجرایی و مشاوره‌های تخصصی پاراهور";

// باید دقیقاً با pageSize توی ServicesPageClient.tsx یکی باشه.
const SERVICES_PAGE_SIZE = 6;

const parsePage = (value?: string) => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

// همون منطقِ canonical/prev/next پجینیشن (مثل authors/blog)، ولی برای
// /services که فرمت کوئری‌اش صرفاً ?page=N هست (نه ?view=all&page=N)
// و صفحه‌ی ۱ همیشه یعنی خودِ روتِ خام /services، دقیقاً مطابق
// buildPageHref توی ServicesPageClient.tsx.
function buildServicesPaginationLinks({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const pageUrl = (page: number) =>
    page <= 1 ? `${SITE_URL}/services` : `${SITE_URL}/services?page=${page}`;

  return {
    canonical: pageUrl(safePage),
    prevUrl: safePage > 1 ? pageUrl(safePage - 1) : null,
    nextUrl: safePage < totalPages ? pageUrl(safePage + 1) : null,
  };
}

async function fetchJson<T>(url: string, cookie: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: cookie ? { cookie } : undefined,
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeServices(items: RawService[]): Service[] {
  return items.map((item) => ({
    id: String(item._id ?? item.id ?? ""),
    slug: item.slug ?? "",
    title: item.title ?? "",
    shortDesc: item.shortDesc ?? "",
    icon: item.icon ?? "",
    tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
    level:
      item.level === "specialized" ||
      item.level === "advanced" ||
      item.level === "complex"
        ? item.level
        : "intermediate",
    categoryLabel: item.categoryLabel ?? "",
    status:
      item.status === "active" || item.status === "hidden"
        ? item.status
        : "draft",
    body: item.body ?? "",
    urgencyTitle: item.urgencyTitle ?? "",
    urgencyDesc: item.urgencyDesc ?? "",
    metaTitle: item.metaTitle ?? "",
    metaDescription: item.metaDescription ?? "",
  }));
}

async function getInitialData(): Promise<Omit<ServicesPageInitialData, "initialPage">> {
    const h = await headers();
  const forwardedHost = h.get("x-forwarded-host") || h.get("host");
  const forwardedProto = h.get("x-forwarded-proto") || "https";
  const origin = forwardedHost
    ? `${forwardedProto}://${forwardedHost}`
    : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const cookie = h.get("cookie") || "";

  const servicesResult = await fetchJson<ApiResponse<RawService[]>>(
    `${origin}/api/services`,
    cookie
  );

  const rawServices =
    servicesResult?.success !== false &&
    Array.isArray(servicesResult?.data)
      ? servicesResult.data
      : [];

  const seo = await getPageSeo("services");

  return {
    services: normalizeServices(rawServices),
    seo: {
      h1Title: seo.h1Title || FALLBACK_H1,
      title: seo.metaTitle || FALLBACK_H1,
      description:
        seo.metaDescription ||
        "خدمات تخصصی پاراهور در حوزه‌های فارنزیک، تحقیقات، امنیت سایبری و مشاوره فنی.",
    },
  };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const base = await getPageMetadata("services");

  const query = await searchParams;
  const currentPage = parsePage(query.page);

  // صفحه‌ی ۱ (یعنی خودِ /services بدون کوئری) دقیقاً همون canonical
  // قبلی رو نگه می‌داره — هیچ تغییری نمی‌کنه.
  if (currentPage <= 1) {
    return base;
  }

  const initialData = await getInitialData();
  const activeCount = initialData.services.filter(
    (s) => s.status === "active"
  ).length;
  const totalPages = Math.max(1, Math.ceil(activeCount / SERVICES_PAGE_SIZE));

  const pagination = buildServicesPaginationLinks({
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

function ServicesPageJsonLd({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const canonical = `${SITE_URL}/services`;

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
          name: "خدمات",
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

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const query = await searchParams;
  const currentPage = parsePage(query.page);

  const [initialData, seo] = await Promise.all([
    getInitialData(),
    getPageSeo("services"),
  ]);

  const activeCount = initialData.services.filter(
    (s) => s.status === "active"
  ).length;
  const totalPages = Math.max(1, Math.ceil(activeCount / SERVICES_PAGE_SIZE));
  const pagination = buildServicesPaginationLinks({
    currentPage,
    totalPages,
  });

  // prev/next همیشه از پجینیشنِ واقعیه: صفحه‌ی ۱ خودش prevUrl=null
  // می‌گیره (چون صفحه‌ی قبل‌تری وجود نداره) و nextUrl رو به صفحه‌ی
  // بعدی می‌ده اگه وجود داشته باشه — نه زنجیره‌ی سراسریِ سایت.
  const prevUrl = pagination.prevUrl;
  const nextUrl = pagination.nextUrl;

  return (
    <>
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      <ServicesPageJsonLd
        title={seo.metaTitle}
        description={seo.metaDescription}
      />

      <ServicesPageClient
        initialData={{
          ...initialData,
          initialPage: pagination.canonical.endsWith("/services")
            ? 1
            : Math.min(currentPage, totalPages),
        }}
      />
          </>
  );
}