import type { Metadata } from "next";
import connectDB from "./mongodb";
import PageSeo from "../app/model/PageSeo";
import { getSiteSeo } from "./siteSeo";

export const SITE_URL =
//   process.env.NEXT_PUBLIC_SITE_URL || "https://parahoor.com";
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";


const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.jpg`;

export const SEO_DEFAULTS = {
  home: {
    pageName: "صفحه اصلی",
    h1Title: "پاراهور | تحقیقات سایبری و فارنزیک دیجیتال",
    slug: "",
    metaTitle: "پاراهور | تحقیقات سایبری و فارنزیک دیجیتال",
    metaDescription:
      "پاراهور در زمینه تحقیقات سایبری، فارنزیک دیجیتال و خدمات تخصصی امنیت اطلاعات فعالیت می‌کند.",
    index: true,
    follow: true,
  },

  services: {
    pageName: "خدمات",
    h1Title: "خدمات تحقیقات سایبری و فارنزیک",
    slug: "services",
    metaTitle: "خدمات تحقیقات سایبری و فارنزیک",
    metaDescription:
      "خدمات تخصصی پاراهور در حوزه تحقیقات سایبری، فارنزیک دیجیتال، تحلیل شواهد دیجیتال و بررسی جرایم سایبری.",
    index: true,
    follow: true,
  },

  blogs: {
    pageName: "وبلاگ",
    h1Title: "بلاگ پاراهور",
    slug: "blogs",
    metaTitle: "وبلاگ | پاراهور",
    metaDescription:
      "مطالب تخصصی پاراهور درباره تحقیقات سایبری، فارنزیک دیجیتال، امنیت اطلاعات، جرایم سایبری و تحلیل شواهد دیجیتال.",
    index: true,
    follow: true,
  },

  about: {
    pageName: "درباره ما",
    h1Title: "درباره پاراهور",
    slug: "about",
    metaTitle: "درباره ما",
    metaDescription:
      "آشنایی با پاراهور، آژانس تخصصی تحقیقات سایبری، فارنزیک دیجیتال، تحلیل شواهد دیجیتال و بررسی جرایم سایبری.",
    index: true,
    follow: true,
  },

  contact: {
    pageName: "تماس با ما",
    h1Title: "تماس با پاراهور",
    slug: "contact",
    metaTitle: "تماس با ما",
    metaDescription:
      "راه‌های ارتباط با پاراهور برای دریافت مشاوره و خدمات تخصصی در حوزه تحقیقات سایبری، فارنزیک دیجیتال و امنیت اطلاعات.",
    index: true,
    follow: true,
  },

  privacy: {
    pageName: "حریم خصوصی",
    h1Title: "حریم خصوصی پاراهور",
    slug: "privacy",
    metaTitle: "حریم خصوصی",
    metaDescription:
      "سیاست حفظ حریم خصوصی پاراهور و نحوه جمع‌آوری، استفاده، نگهداری و حفاظت از اطلاعات کاربران.",
    index: true,
    follow: true,
  },

  authors: {
    pageName: "نویسندگان",
    h1Title: "پژوهشگران و کارشناسان",
    slug: "authors",
    metaTitle: "پژوهشگران و نویسندگان",
    metaDescription:
      "آشنایی با پژوهشگران و کارشناسان پاراهور در حوزه تحقیقات سایبری، فارنزیک دیجیتال و جرائم رایانه‌ای.",
    index: true,
    follow: true,
  },

  "author-mohammadreza-yousefi": {
    pageName: "محمدرضا یوسفی",
    h1Title: "محمدرضا یوسفی",
    slug: "mohammadreza-yousefi",
    metaTitle: "محمدرضا یوسفی",
    metaDescription:
      "پروفایل محمدرضا یوسفی، پژوهشگر ارشد جرائم رایانه‌ای و متخصص تحقیقات سایبری در پاراهور.",
    index: true,
    follow: true,
  },

  "author-alireza-tabatabaei-hashemi": {
    pageName: "علیرضا طباطبایی هاشمی",
    h1Title: "علیرضا طباطبایی هاشمی",
    slug: "alireza-tabatabaei-hashemi",
    metaTitle: "علیرضا طباطبایی هاشمی",
    metaDescription:
      "پروفایل علیرضا طباطبایی هاشمی، متخصص تحقیقات دیجیتال و جرائم سایبری در پاراهور.",
    index: true,
    follow: true,
  },
} as const;

export type PageKey = keyof typeof SEO_DEFAULTS;

async function getRawPageSeo(pageKey: PageKey) {
  await connectDB();

  const defaultSeo = SEO_DEFAULTS[pageKey];

  const seo = await PageSeo.findOne({ pageKey })
    .lean()
    .exec();

  if (!seo) {
    return {
      pageKey,
      ...defaultSeo,
      canonical: "",
    };
  }

  return {
    pageKey,
    pageName: seo.pageName || defaultSeo.pageName,
    h1Title: seo.h1Title || defaultSeo.h1Title,

    slug:
      typeof seo.slug === "string"
        ? seo.slug
        : defaultSeo.slug,

    metaTitle:
      seo.metaTitle || defaultSeo.metaTitle,

    metaDescription:
      seo.metaDescription || defaultSeo.metaDescription,

    index:
      typeof seo.index === "boolean"
        ? seo.index
        : defaultSeo.index,

    follow:
      typeof seo.follow === "boolean"
        ? seo.follow
        : defaultSeo.follow,

    canonical:
      typeof seo.canonical === "string"
        ? seo.canonical.trim()
        : "",
  };
}


// H1 صفحات نویسنده‌ها همیشه همون H1 اصلیِ صفحه‌ی "authors" از پنل ادمینه؛
// اسم نویسنده هرگز توی H1 نمیاد.
export async function getPageSeo(pageKey: PageKey) {
  const seo = await getRawPageSeo(pageKey);

  if (!pageKey.startsWith("author-")) return seo;

  const main = await getRawPageSeo("authors");
  return { ...seo, h1Title: main.h1Title };
}

function getSeoPath(pageKey: PageKey, slug: string) {
  if (!slug.trim()) return "/";
  return pageKey.startsWith("author-")
    ? `/authors/${slug}`
    : `/${slug}`;
}

// Canonical نهایی صفحه:
// - اگر در پنل مقدار معتبری ثبت شده باشد (مسیر داخلی یا آدرس کامل) همان
// - در غیر این صورت (یا مقدار خراب) آدرس خود صفحه
function resolveCanonicalUrl(
  pageKey: PageKey,
  slug: string,
  customCanonical?: string
) {
  const custom = (customCanonical || "").trim();

  if (custom) {
    try {
      const url = new URL(custom, SITE_URL);

      if (url.protocol === "http:" || url.protocol === "https:") {
        url.hash = "";
        return url.toString();
      }
    } catch {
      // مقدار نامعتبر → برگرد به canonical خودکار
    }
  }

  return new URL(getSeoPath(pageKey, slug), SITE_URL).toString();
}


// تنظیم سراسری همیشه بر تنظیم هر روت غلبه می‌کند.
// اگر دیتابیس خطا بدهد، مقدار خود روت دست‌نخورده می‌ماند.
async function applyGlobalRobots(index: boolean, follow: boolean) {
  try {
    const site = await getSiteSeo();
    return {
      index: site.noindexAll || site.globalNoindex ? false : index,
      follow: site.noindexAll || site.globalNofollow ? false : follow,
    };
  } catch {
    return { index, follow };
  }
}

export async function getPageMetadata(
  pageKey: PageKey
): Promise<Metadata> {
  const seo = await getPageSeo(pageKey);

  const canonicalUrl = resolveCanonicalUrl(
    pageKey,
    seo.slug || "",
    seo.canonical
  );

  const robots = await applyGlobalRobots(seo.index, seo.follow);


  return {
  title: seo.metaTitle,
  description: seo.metaDescription,
  robots,            // ← به‌جای { index: seo.index, follow: seo.follow }
  alternates: { canonical: canonicalUrl },

    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: "پاراهور",

      title: seo.metaTitle,

      description: seo.metaDescription,

      url: canonicalUrl,

      images: [
        {
          url: DEFAULT_OG_IMAGE,
          alt: seo.pageName,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: seo.metaTitle,

      description: seo.metaDescription,

      images: [DEFAULT_OG_IMAGE],
    },
  };
}

// ─────────────────────────────────────────────────────────────
// getStaticPageMetadata — مثل getPageMetadata ولی اصلاً سراغ
// دیتابیس (پنل ادمین) نمی‌ره؛ همیشه از SEO_DEFAULTS می‌خونه.
// برای صفحاتی که نباید مقدار پنل روی تب مرورگرشون اثر بذاره.
// ─────────────────────────────────────────────────────────────

export function getStaticPageMetadata(pageKey: PageKey): Metadata {
  const defaultSeo = SEO_DEFAULTS[pageKey];

  const pathname = getSeoPath(pageKey, defaultSeo.slug || "");
  const canonicalUrl = new URL(pathname, SITE_URL).toString();

  return {
    title: defaultSeo.metaTitle,

    description: defaultSeo.metaDescription,

    robots: {
      index: defaultSeo.index,
      follow: defaultSeo.follow,
    },

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: "پاراهور",

      title: defaultSeo.metaTitle,

      description: defaultSeo.metaDescription,

      url: canonicalUrl,

      images: [
        {
          url: DEFAULT_OG_IMAGE,
          alt: defaultSeo.pageName,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: defaultSeo.metaTitle,

      description: defaultSeo.metaDescription,

      images: [DEFAULT_OG_IMAGE],
    },
  };
}

// ─────────────────────────────────────────────────────────────
// buildPaginationLinks — canonical/prev/next برای صفحاتی که
// با query string صفحه‌بندی می‌شن (مثل authors/[slug]?view=all&page=N)
// نکته: وقتی showAllPosts فالسه (تب پیش‌فرض/غیرصفحه‌بندی‌شده)،
// canonical همون basePath خالیه و prev/next نداره.
// وقتی showAllPosts ترو باشه، حتی page=1 هم صراحتاً تو canonical
// میاد، چون محتوای این حالت با حالت پیش‌فرض فرق داره.
// ─────────────────────────────────────────────────────────────

export function buildPaginationLinks({
  basePath,
  showAllPosts,
  currentPage,
  totalPages,
}: {
  basePath: string;
  showAllPosts: boolean;
  currentPage: number;
  totalPages: number;
}) {
  if (!showAllPosts) {
    return {
      canonical: `${SITE_URL}${basePath}`,
      prevUrl: null as string | null,
      nextUrl: null as string | null,
    };
  }

  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const pageUrl = (page: number) =>
    `${SITE_URL}${basePath}?view=all&page=${page}`;

  return {
    canonical: pageUrl(safePage),
    prevUrl: safePage > 1 ? pageUrl(safePage - 1) : null,
    nextUrl: safePage < totalPages ? pageUrl(safePage + 1) : null,
  };
}

// ─────────────────────────────────────────────────────────────
// buildBlogsPaginationLinks — canonical/prev/next برای لیست
// وبلاگ که صفحه‌بندیش با ?page=N هست (نه ?view=all&page=N).
// صفحه‌ی ۱ همیشه بدون کوئری‌استرینگه (basePath خالص)، دقیقاً
// هم‌سو با getBlogsPageUrl توی BlogPageClient.
// ─────────────────────────────────────────────────────────────

export function buildBlogsPaginationLinks({
  basePath,
  currentPage,
  totalPages,
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
}) {
  const safeTotalPages = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(currentPage, 1), safeTotalPages);

  const pageUrl = (page: number) =>
    page <= 1
      ? `${SITE_URL}${basePath}`
      : `${SITE_URL}${basePath}?page=${page}`;

  return {
    canonical: pageUrl(safePage),
    prevUrl: safePage > 1 ? pageUrl(safePage - 1) : null,
    nextUrl: safePage < safeTotalPages ? pageUrl(safePage + 1) : null,
  };
}

// ─────────────────────────────────────────────────────────────
// buildBlogsCategoryLinks — مثل buildBlogsPaginationLinks ولی
// برای حالتی که کاربر رو یه فیلتر/تب دسته‌بندیه (یا صراحتاً روی
// category=all زده). برخلاف buildBlogsPaginationLinks، اینجا
// page=1 هم همیشه صریح تو URL میاد (چون این حالت با روت خامِ
// /blogs یه محتوای متفاوته، نه صرفاً صفحه‌ی اول همون چیز).
// ─────────────────────────────────────────────────────────────

export function buildBlogsCategoryLinks({
  basePath,
  category,
  currentPage,
  totalPages,
}: {
  basePath: string;
  category: string;
  currentPage: number;
  totalPages: number;
}) {
  const safeTotalPages = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(currentPage, 1), safeTotalPages);

  const pageUrl = (page: number) =>
    `${SITE_URL}${basePath}?category=${category}&page=${page}`;

  return {
    canonical: pageUrl(safePage),
    prevUrl: safePage > 1 ? pageUrl(safePage - 1) : null,
    nextUrl: safePage < safeTotalPages ? pageUrl(safePage + 1) : null,
  };
}


const PAGE_ORDER: PageKey[] = [
  "home",
  "services",
  "blogs",
  "about",
  "contact",
  "privacy",
  "authors",
  "author-mohammadreza-yousefi",
  "author-alireza-tabatabaei-hashemi",
];

export async function getAdjacentPageLinks(pageKey: PageKey) {
  const index = PAGE_ORDER.indexOf(pageKey);

 if (index === -1) {
   return { prevUrl: null, nextUrl: null };
 }

  const prevKey = index > 0 ? PAGE_ORDER[index - 1] : null;
  const nextKey = index < PAGE_ORDER.length - 1 ? PAGE_ORDER[index + 1] : null;

  const [prevSeo, nextSeo] = await Promise.all([
    prevKey ? getPageSeo(prevKey) : Promise.resolve(null),
    nextKey ? getPageSeo(nextKey) : Promise.resolve(null),
  ]);



  return {
 prevUrl:
    prevSeo && prevKey
      ? new URL(getSeoPath(prevKey, prevSeo.slug || ""), SITE_URL).toString()
      : null,
  nextUrl:
    nextSeo && nextKey
      ? new URL(getSeoPath(nextKey, nextSeo.slug || ""), SITE_URL).toString()
      : null,
  };
}
