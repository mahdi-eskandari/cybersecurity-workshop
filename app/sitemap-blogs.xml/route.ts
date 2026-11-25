import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo";
import connectDB from "@/lib/mongodb";
import Blog from "@/app/model/blog";

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
  await connectDB();

const posts = await Blog.find({
  status: "published",
  index: { $ne: false },
})
    .select("slug updatedAt")
    .lean()
    .exec();

  const urls: string[] = [];

  // صفحه اصلی وبلاگ
  urls.push(`
  <url>
    <loc>${escapeXml(
      new URL("/blogs", SITE_URL).toString()
    )}</loc>
  </url>`);

  // Single Blog Post ها
  for (const post of posts) {
    if (!post.slug) continue;

    const url = new URL(
      `/blogs/${post.slug}`,
      SITE_URL
    ).toString();

    const lastmod = post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : null;

    urls.push(`
  <url>
    <loc>${escapeXml(url)}</loc>${
      lastmod
        ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>`
        : ""
    }
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
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