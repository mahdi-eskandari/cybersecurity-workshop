import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

const FALLBACK_IDS = [
  "forensic-reports",
  "legal-news",
  "solved-cases",
  "security-alerts",
  "security-education",
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function getJson(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;

  const [catData, postsData] = await Promise.all([
    getJson(`${origin}/api/categories`),
    getJson(`${origin}/api/posts`),
  ]);

  const ids: string[] =
    Array.isArray(catData) && catData.length
      ? catData.map((c: any) => String(c.id)).filter(Boolean)
      : FALLBACK_IDS;

  const posts: any[] = (Array.isArray(postsData) ? postsData : []).filter(
    (p) => p?.status === "published"
  );

  const urls = ids
    .map((id) => {
      const inCat = posts.filter((p) => p.categoryId === id);
      if (inCat.length === 0) return "";

      const last = inCat
        .map((p) => new Date(p.updatedAt || p.createdAt || 0).getTime())
        .filter((t) => t > 0)
        .sort((a, b) => b - a)[0];

      const loc = `${SITE_URL}/blogs/category/${encodeURIComponent(id)}`;

      return `
  <url>
    <loc>${escapeXml(loc)}</loc>${
        last ? `\n    <lastmod>${new Date(last).toISOString()}</lastmod>` : ""
      }
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}