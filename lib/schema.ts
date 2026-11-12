


import { SITE_URL } from "./seo";

// ─────────────────────────────────────────────────────────────
// toAbsoluteImageUrl — آدرس عکس امن برای JSON-LD
//
// - base64 / data: → رد می‌شود (گوگل نمی‌خواندش و HTML را سنگین می‌کند)
// - آدرس خرابِ "SITE_URL/data:image/..." هم رد می‌شود
// - http(s):// → همان
// - /uploads/x.jpg → با SITE_URL کامل می‌شود
// - هر چیز دیگر → undefined (برمی‌گردیم به لوگوی پیش‌فرض)
// ─────────────────────────────────────────────────────────────

const MAX_IMAGE_URL_LENGTH = 2048;

export function toAbsoluteImageUrl(src?: string | null): string | undefined {
  const value = (src || "").trim();

  if (!value || value.length > MAX_IMAGE_URL_LENGTH) return undefined;
  if (/data:/i.test(value)) return undefined;

  if (/^https?:\/\//i.test(value)) return value;

  if (value.startsWith("/") && !value.startsWith("//")) {
    return new URL(value, SITE_URL).toString();
  }

  return undefined;
}

// ─────────────────────────────────────────────────────────────
// Organization — تو همه‌ی صفحات یکسانه، فقط از همینجا import کن
// ─────────────────────────────────────────────────────────────

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "پاراهور",
    url: `${SITE_URL}/`,
    email: "info@parahoor.com",
    logo: `${SITE_URL}/logo/logo.webp`,
    sameAs: ["https://t.me/mahdi_eskandari_84"],
  };
}

// ─────────────────────────────────────────────────────────────
// LocalBusiness — برای هوم‌پیج (طبق چک‌لیست کارفرما)
// نکته: telephone رو خودت باید اضافه کنی، من شماره‌ای ندارم
// ─────────────────────────────────────────────────────────────

export function buildLocalBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "پاراهور",
    url: `${SITE_URL}/`,
    // telephone: "+98-XXX-XXXXXXX", // ← اضافه کن
    email: "info@parahoor.com",
    image: `${SITE_URL}/logo/logo.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "بلوار بلال، میدان توحید، ساختمان بانک کشاورزی، پلاک چهارم طبقه اول واحد اول",
      addressLocality: "کرج",
      addressRegion: "کرج",
      addressCountry: "IR",
    },
  };
}

// ─────────────────────────────────────────────────────────────
// Breadcrumb — هر صفحه آیتم‌های خودش رو می‌ده
// ─────────────────────────────────────────────────────────────

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─────────────────────────────────────────────────────────────
// FAQPage — هر صفحه سوالات خودش رو می‌ده
// ─────────────────────────────────────────────────────────────

export function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─────────────────────────────────────────────────────────────
// Article — برای صفحه‌ی تک‌پستِ وبلاگ (blogs/[slug])
// ─────────────────────────────────────────────────────────────

export function buildArticleSchema(post: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  authorName?: string;
  publishedAt?: string;
  updatedAt?: string;
}) {
  const image = toAbsoluteImageUrl(post.imageUrl) ?? `${SITE_URL}/logo/logo.webp`;

  return {
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: post.url,
    image: [image],
    author: {
      "@type": "Person",
      name: post.authorName || "تیم پاراهور",
    },
    publisher: {
      "@type": "Organization",
      name: "پاراهور",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo/logo.webp`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}
