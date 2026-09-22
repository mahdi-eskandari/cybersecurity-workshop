import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const sitemaps = [
    `${SITE_URL}/sitemap-pages.xml`,
    `${SITE_URL}/sitemap-services.xml`,
    `${SITE_URL}/sitemap-blogs.xml`,
  ];

  const entries = sitemaps
    .map(
      (url) => `
  <sitemap>
    <loc>${escapeXml(url)}</loc>
  </sitemap>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}