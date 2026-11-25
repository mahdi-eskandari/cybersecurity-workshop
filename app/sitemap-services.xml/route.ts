import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo";
import connectDB from "@/lib/mongodb";
import Service from "@/app/model/Service";

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

const services = await Service.find({
  status: "active",
  index: { $ne: false },
})
    .select("slug updatedAt")
    .lean()
    .exec();

  const urls: string[] = [];

  // صفحه اصلی خدمات
  urls.push(`
  <url>
    <loc>${escapeXml(
      new URL("/services", SITE_URL).toString()
    )}</loc>
  </url>`);

  // Single Service ها
  for (const service of services) {
    if (!service.slug) continue;

    const url = new URL(
      `/services/${service.slug}`,
      SITE_URL
    ).toString();

    const lastmod = service.updatedAt
      ? new Date(service.updatedAt).toISOString()
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