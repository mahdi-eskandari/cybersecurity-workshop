

// import type { Metadata } from "next";
// import connectDB from "./mongodb";
// import PageSeo from "../app/model/PageSeo";

// export const SITE_URL =
// //   process.env.NEXT_PUBLIC_SITE_URL || "https://parahoor.com";
//   process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";


// const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.jpg`;

// export const SEO_DEFAULTS = {
//   home: {
//     pageName: "صفحه اصلی",
//     h1Title: "پاراهور | تحقیقات سایبری و فارنزیک دیجیتال",
//     slug: "",
//     metaTitle: "پاراهور | تحقیقات سایبری و فارنزیک دیجیتال",
//     metaDescription:
//       "پاراهور در زمینه تحقیقات سایبری، فارنزیک دیجیتال و خدمات تخصصی امنیت اطلاعات فعالیت می‌کند.",
//     index: true,
//     follow: true,
//   },

//   services: {
//     pageName: "خدمات",
//     h1Title: "خدمات تحقیقات سایبری و فارنزیک",
//     slug: "services",
//     metaTitle: "خدمات تحقیقات سایبری و فارنزیک",
//     metaDescription:
//       "خدمات تخصصی پاراهور در حوزه تحقیقات سایبری، فارنزیک دیجیتال، تحلیل شواهد دیجیتال و بررسی جرایم سایبری.",
//     index: true,
//     follow: true,
//   },

//   blogs: {
//     pageName: "وبلاگ",
//     h1Title: "بلاگ پاراهور",
//     slug: "blogs",
//     metaTitle: "وبلاگ | پاراهور",
//     metaDescription:
//       "مطالب تخصصی پاراهور درباره تحقیقات سایبری، فارنزیک دیجیتال، امنیت اطلاعات، جرایم سایبری و تحلیل شواهد دیجیتال.",
//     index: true,
//     follow: true,
//   },

//   about: {
//     pageName: "درباره ما",
//     h1Title: "درباره پاراهور",
//     slug: "about",
//     metaTitle: "درباره ما",
//     metaDescription:
//       "آشنایی با پاراهور، آژانس تخصصی تحقیقات سایبری، فارنزیک دیجیتال، تحلیل شواهد دیجیتال و بررسی جرایم سایبری.",
//     index: true,
//     follow: true,
//   },

//   contact: {
//     pageName: "تماس با ما",
//     h1Title: "تماس با پاراهور",
//     slug: "contact",
//     metaTitle: "تماس با ما",
//     metaDescription:
//       "راه‌های ارتباط با پاراهور برای دریافت مشاوره و خدمات تخصصی در حوزه تحقیقات سایبری، فارنزیک دیجیتال و امنیت اطلاعات.",
//     index: true,
//     follow: true,
//   },

//   privacy: {
//     pageName: "حریم خصوصی",
//     h1Title: "حریم خصوصی پاراهور",
//     slug: "privacy",
//     metaTitle: "حریم خصوصی",
//     metaDescription:
//       "سیاست حفظ حریم خصوصی پاراهور و نحوه جمع‌آوری، استفاده، نگهداری و حفاظت از اطلاعات کاربران.",
//     index: true,
//     follow: true,
//   },

//   authors: {
//     pageName: "نویسندگان",
//     h1Title: "پژوهشگران و کارشناسان",
//     slug: "authors",
//     metaTitle: "پژوهشگران و نویسندگان",
//     metaDescription:
//       "آشنایی با پژوهشگران و کارشناسان پاراهور در حوزه تحقیقات سایبری، فارنزیک دیجیتال و جرائم رایانه‌ای.",
//     index: true,
//     follow: true,
//   },

//   "author-mohammadreza-yousefi": {
//     pageName: "محمدرضا یوسفی",
//     h1Title: "محمدرضا یوسفی",
//     slug: "mohammadreza-yousefi",
//     metaTitle: "محمدرضا یوسفی",
//     metaDescription:
//       "پروفایل محمدرضا یوسفی، پژوهشگر ارشد جرائم رایانه‌ای و متخصص تحقیقات سایبری در پاراهور.",
//     index: true,
//     follow: true,
//   },

//   "author-alireza-tabatabaei-hashemi": {
//     pageName: "علیرضا طباطبایی هاشمی",
//     h1Title: "علیرضا طباطبایی هاشمی",
//     slug: "alireza-tabatabaei-hashemi",
//     metaTitle: "علیرضا طباطبایی هاشمی",
//     metaDescription:
//       "پروفایل علیرضا طباطبایی هاشمی، متخصص تحقیقات دیجیتال و جرائم سایبری در پاراهور.",
//     index: true,
//     follow: true,
//   },
// } as const;

// export type PageKey = keyof typeof SEO_DEFAULTS;

// export async function getPageSeo(pageKey: PageKey) {
//   await connectDB();

//   const defaultSeo = SEO_DEFAULTS[pageKey];

//   const seo = await PageSeo.findOne({ pageKey })
//     .lean()
//     .exec();

//   if (!seo) {
//     return {
//       pageKey,
//       ...defaultSeo,
//     };
//   }

//   return {
//     pageKey,
//     pageName: seo.pageName || defaultSeo.pageName,
//     h1Title: seo.h1Title || defaultSeo.h1Title,

//     slug:
//       typeof seo.slug === "string"
//         ? seo.slug
//         : defaultSeo.slug,

//     metaTitle:
//       seo.metaTitle || defaultSeo.metaTitle,

//     metaDescription:
//       seo.metaDescription || defaultSeo.metaDescription,

//     index:
//       typeof seo.index === "boolean"
//         ? seo.index
//         : defaultSeo.index,

//     follow:
//       typeof seo.follow === "boolean"
//         ? seo.follow
//         : defaultSeo.follow,
//   };
// }

// function getSeoPath(pageKey: PageKey, slug: string) {
//   if (!slug.trim()) return "/";
//   return pageKey.startsWith("author-")
//     ? `/authors/${slug}`
//     : `/${slug}`;
// }

// export async function getPageMetadata(
//   pageKey: PageKey
// ): Promise<Metadata> {
//   const seo = await getPageSeo(pageKey);

//   const pathname = getSeoPath(
//     pageKey,
//     seo.slug || ""
//   );

//   const canonicalUrl = new URL(
//     pathname,
//     SITE_URL
//   ).toString();

//   return {
//     title: seo.metaTitle,

//     description: seo.metaDescription,

//     robots: {
//       index: seo.index,
//       follow: seo.follow,
//     },

//     alternates: {
//       canonical: canonicalUrl,
//     },

//     openGraph: {
//       type: "website",
//       locale: "fa_IR",
//       siteName: "پاراهور",

//       title: seo.metaTitle,

//       description: seo.metaDescription,

//       url: canonicalUrl,

//       images: [
//         {
//           url: DEFAULT_OG_IMAGE,
//           alt: seo.pageName,
//         },
//       ],
//     },

//     twitter: {
//       card: "summary_large_image",

//       title: seo.metaTitle,

//       description: seo.metaDescription,

//       images: [DEFAULT_OG_IMAGE],
//     },
//   };
// }

// const PAGE_ORDER: PageKey[] = [
//   "home",
//   "services",
//   "blogs",
//   "about",
//   "contact",
//   "privacy",
//   "authors",
//   "author-mohammadreza-yousefi",
//   "author-alireza-tabatabaei-hashemi",
// ];

// export async function getAdjacentPageLinks(pageKey: PageKey) {
//   const index = PAGE_ORDER.indexOf(pageKey);

//  if (index === -1) {
//    return { prevUrl: null, nextUrl: null };
//  }

//   const prevKey = index > 0 ? PAGE_ORDER[index - 1] : null;
//   const nextKey = index < PAGE_ORDER.length - 1 ? PAGE_ORDER[index + 1] : null;

//   const [prevSeo, nextSeo] = await Promise.all([
//     prevKey ? getPageSeo(prevKey) : Promise.resolve(null),
//     nextKey ? getPageSeo(nextKey) : Promise.resolve(null),
//   ]);



//   return {
//  prevUrl:
//     prevSeo && prevKey
//       ? new URL(getSeoPath(prevKey, prevSeo.slug || ""), SITE_URL).toString()
//       : null,
//   nextUrl:
//     nextSeo && nextKey
//       ? new URL(getSeoPath(nextKey, nextSeo.slug || ""), SITE_URL).toString()
//       : null,
//   };
// }











import type { Metadata } from "next";
import connectDB from "./mongodb";
import PageSeo from "../app/model/PageSeo";

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

export async function getPageSeo(pageKey: PageKey) {
  await connectDB();

  const defaultSeo = SEO_DEFAULTS[pageKey];

  const seo = await PageSeo.findOne({ pageKey })
    .lean()
    .exec();

  if (!seo) {
    return {
      pageKey,
      ...defaultSeo,
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
  };
}

function getSeoPath(pageKey: PageKey, slug: string) {
  if (!slug.trim()) return "/";
  return pageKey.startsWith("author-")
    ? `/authors/${slug}`
    : `/${slug}`;
}

export async function getPageMetadata(
  pageKey: PageKey
): Promise<Metadata> {
  const seo = await getPageSeo(pageKey);

  const pathname = getSeoPath(
    pageKey,
    seo.slug || ""
  );

  const canonicalUrl = new URL(
    pathname,
    SITE_URL
  ).toString();

  return {
    title: seo.metaTitle,

    description: seo.metaDescription,

    robots: {
      index: seo.index,
      follow: seo.follow,
    },

    alternates: {
      canonical: canonicalUrl,
    },

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