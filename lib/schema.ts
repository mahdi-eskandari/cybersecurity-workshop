import { SITE_URL } from "./seo";

// ─────────────────────────────────────────────────────────────
// Organization — تو همه‌ی صفحات یکسانه، فقط از همینجا import کن
// ─────────────────────────────────────────────────────────────

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "پاراهور",
    url: `${SITE_URL}/`,
    email: "mailto:info@parahoor.com",
    logo: `${SITE_URL}/logo.jpg`,
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
    image: `${SITE_URL}/logo.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "بلوار اباذر، نبش خیابان شالی، پلاک ۹، طبقه چهارم، واحد ۶",
      addressLocality: "تهران",
      addressRegion: "تهران",
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
  return {
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: post.url,
    image: post.imageUrl ? [post.imageUrl] : [`${SITE_URL}/logo.jpg`],
    author: {
      "@type": "Person",
      name: post.authorName || "تیم پاراهور",
    },
    publisher: {
      "@type": "Organization",
      name: "پاراهور",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.jpg`,
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
