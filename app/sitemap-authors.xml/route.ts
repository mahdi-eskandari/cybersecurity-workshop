import { NextResponse } from "next/server";
import { getPageSeo, SITE_URL, type PageKey } from "@/lib/seo";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function authorPath(pageKey: PageKey, slug: string) {
  return pageKey.startsWith("author-")
    ? `/authors/${slug}`
    : `/${slug}`;
}

export async function GET() {
  const pageKeys: PageKey[] = [
    "authors",
    "author-mohammadreza-yousefi",
    "author-alireza-tabatabaei-hashemi",
  ];

  const pages = await Promise.all(
    pageKeys.map((pageKey) => getPageSeo(pageKey))
  );

  const urls = pages
    .filter((page) => page.index)
    .map((page) => {
      const url = new URL(
        authorPath(page.pageKey, page.slug),
        SITE_URL
      ).toString();

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
