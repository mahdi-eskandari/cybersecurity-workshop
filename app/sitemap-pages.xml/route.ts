import { NextResponse } from "next/server";
import {
  getPageSeo,
  SITE_URL,
  type PageKey,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

const PAGE_KEYS: PageKey[] = [
  "home",
  "services",
  "blogs",
  "about",
  "contact",
  "privacy",
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const pages = await Promise.all(
    PAGE_KEYS.map((pageKey) => getPageSeo(pageKey))
  );

  const urls = pages
    .filter((page) => page.index)
    .map((page) => {
      const pathname =
        page.slug && page.slug.trim() !== ""
          ? `/${page.slug}`
          : "/";

      const url = new URL(pathname, SITE_URL).toString();

      return `
  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}