// app/robots.txt/route.ts
// جایگزین app/robots.ts — حتماً app/robots.ts را حذف کن (هر دو روی /robots.txt می‌نشینند).
import { SITE_URL } from "@/lib/seo";
import { getSiteSeo } from "@/lib/siteSeo";
import { buildRobotsTxt } from "@/lib/siteSeoShared";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSiteSeo();
  const body = buildRobotsTxt(settings, SITE_URL);

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
