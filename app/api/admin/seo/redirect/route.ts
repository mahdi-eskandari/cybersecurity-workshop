
// app/api/admin/seo/redirect/route.ts
import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import SeoRedirect from "../../../../model/SeoRedirect";
import PageSeo from "../../../../model/PageSeo";

export const runtime = "nodejs";

function cleanPath(value: string): string {
  return value
    .replace(/^\/+|\/+$/g, "")
    .trim();
}

function withLeadingSlash(value: string): string {
  const clean = cleanPath(value);

  if (!clean) {
    return "/";
  }

  return `/${clean}`;
}

const isExternal = (v: string) => /^https?:\/\//i.test(v);

function getStatusCode(value: unknown): 301 | 302 | 307 | 308 {
  return value === 302 || value === 307 || value === 308 ? value : 301;
}

/** مقصد قانون‌های exact: مسیر داخلی نرمال‌شده یا آدرس کامل http(s) */
function resolveExactTarget(toPath: string): string {
  const raw = toPath.trim();
  return isExternal(raw) ? raw : withLeadingSlash(raw);
}

/**
 * مقصد قانون‌های Regex: $1، $2، ... با گروه‌های تطبیق پر می‌شوند.
 * برای مقصد داخلی، اسلش‌های ابتدایی تکی می‌شوند تا مقدار گروه
 * (مثلاً "/evil.com") نتواند به //evil.com و open redirect تبدیل شود.
 */
function resolveRegexTarget(template: string, match: RegExpExecArray): string {
  const filled = template
    .trim()
    .replace(/\$(\d+)/g, (_, n) => match[Number(n)] ?? "");

  if (isExternal(filled)) return filled;

  return `/${filled.replace(/^[\/\\]+/, "")}`;
}

const notFound = () =>
  NextResponse.json({
    success: true,
    redirect: null,
    page: null,
  });

export async function GET(request: NextRequest) {
  try {
    const rawPath =
      request.nextUrl.searchParams.get("path");

    if (!rawPath) {
      return NextResponse.json(
        {
          success: false,
          redirect: null,
          page: null,
        },
        {
          status: 400,
        }
      );
    }

    let requestedPath = cleanPath(rawPath);

    try {
      requestedPath = decodeURIComponent(requestedPath);
    } catch {}


        if (requestedPath.length > 300) return notFound();

    await connectDB();

    // ==================================================
    // 1. اول PageSeo فعلی را پیدا کن
    //
    // خیلی مهم:
    // PageSeo فعلی باید بر redirect قدیمی اولویت داشته باشد.
    // ==================================================

    const exactPage =
      await PageSeo.findOne({
        slug: requestedPath,
      })
        .select("pageKey slug")
        .lean()
        .exec();

    const authorSlug = requestedPath.startsWith("authors/")
      ? requestedPath.slice("authors/".length)
      : "";

    const exactAuthorPage = authorSlug
      ? await PageSeo.findOne({
          pageKey: { $regex: /^author-/ },
          slug: authorSlug,
        })
          .select("pageKey slug")
          .lean()
          .exec()
      : null;

    const currentPage = exactPage || exactAuthorPage;

    if (currentPage) {
      return NextResponse.json({
        success: true,
        redirect: null,
        page: {
          pageKey: currentPage.pageKey,
          slug: currentPage.slug,
        },
      });
    }

    // ==================================================
    // 2. بررسی زیرمسیرهای blogs / services / authors
    //
    // مثال:
    //
    // /blogs/my-post
    // /services/my-service
    //
    // اگر slug فعلی باشند، نباید redirect قدیمی
    // روی آنها اعمال شود (مگر قانون دقیقِ فعال داشته باشند).
    // ==================================================

    const dynamicPages =
      await PageSeo.find({
        pageKey: {
          $in: [
            "blogs",
            "services",
            "authors",
          ],
        },
      })
        .select("pageKey slug")
        .lean()
        .exec();

    const manualExact = await SeoRedirect.exists({
      matchType: { $ne: "regex" },
      isActive: { $ne: false },
      fromPath: {
        $in: [requestedPath, withLeadingSlash(requestedPath)],
      },
    });

    for (const page of dynamicPages) {
      const pageSlug =
        cleanPath(
          String(page.slug || "")
        );

      if (!pageSlug) {
        continue;
      }

      if (
        !manualExact &&
        requestedPath.startsWith(
          `${pageSlug}/`
        )
      ) {
        return NextResponse.json({
          success: true,
          redirect: null,
          page: {
            pageKey: page.pageKey,
            slug: page.slug,
          },
        });
      }
    }

    // ==================================================
    // 3. Redirect دقیق (فقط قانون‌های فعال، بدون Regex)
    // ==================================================

    const exactRedirect =
      await SeoRedirect.findOne({
        matchType: { $ne: "regex" },
        isActive: { $ne: false },
        $or: [
          {
            fromPath: requestedPath,
          },
          {
            fromPath:
              withLeadingSlash(
                requestedPath
              ),
          },
        ],
      })
        .lean()
        .exec();

    if (exactRedirect) {
      if (exactRedirect.statusCode === 410) {
        return NextResponse.json({
          success: true,
          redirect: { toPath: "", statusCode: 410 },
          page: null,
        });
      }

      const targetPath = resolveExactTarget(
        String(exactRedirect.toPath || "")
      );

      // جلوگیری از self redirect
      if (
        !isExternal(targetPath) &&
        cleanPath(targetPath) === requestedPath
      ) {
        return notFound();
      }

      return NextResponse.json({
        success: true,
        redirect: {
          toPath: targetPath,
          statusCode: getStatusCode(exactRedirect.statusCode),
        },
        page: null,
      });
    }

    // ==================================================
    // قانون‌های فعال (یک‌بار خوانده می‌شوند)
    // ==================================================

    const activeRules = await SeoRedirect.find({
      isActive: { $ne: false },
    })
      .sort({
        fromPath: -1,
      })
      .lean()
      .exec();

    // ==================================================
    // 4. Redirect با عبارت منظم (Regex)
    //
    // الگو روی مسیر با اسلش ابتدایی تست می‌شود:
    // ^/old-(.*)$  →  /new-$1
    // ==================================================

    const pathWithSlash = `/${requestedPath}`;

    for (const rule of activeRules) {
      if (rule.matchType !== "regex") continue;

      let match: RegExpExecArray | null = null;

      try {
        match = new RegExp(String(rule.fromPath || "")).exec(pathWithSlash);
      } catch {
        continue; // الگوی خراب نباید کل سایت را از کار بیندازد
      }

      if (!match) continue;

      if (rule.statusCode === 410) {
        return NextResponse.json({
          success: true,
          redirect: { toPath: "", statusCode: 410 },
          page: null,
        });
      }

      const target = resolveRegexTarget(String(rule.toPath || ""), match);

      // جلوگیری از self redirect
      if (!isExternal(target) && cleanPath(target) === requestedPath) {
        continue;
      }

      return NextResponse.json({
        success: true,
        redirect: {
          toPath: target,
          statusCode: getStatusCode(rule.statusCode),
        },
        page: null,
      });
    }

    // ==================================================
    // 5. Redirect مربوط به parent path
    //
    // مثال:
    //
    // /services-old/my-service
    // ->
    // /services/my-service
    // ==================================================

    for (const item of activeRules) {
      if (item.matchType === "regex") continue;
      if (item.statusCode === 410) continue;

      const fromPath =
        cleanPath(
          String(
            item.fromPath || ""
          )
        );

      if (!fromPath) {
        continue;
      }

      if (
        requestedPath.startsWith(
          `${fromPath}/`
        )
      ) {
        const remainingPath =
          requestedPath.slice(
            fromPath.length
          );

        const rawTarget = String(item.toPath || "").trim();

        // مقصد خارجی + باقی‌مانده‌ی مسیر
        if (isExternal(rawTarget)) {
          return NextResponse.json({
            success: true,
            redirect: {
              toPath: `${rawTarget.replace(/\/+$/, "")}${remainingPath}`,
              statusCode: getStatusCode(item.statusCode),
            },
            page: null,
          });
        }

        const targetBase = cleanPath(rawTarget);

        const targetPath =
          `${targetBase}${remainingPath}`;

        const normalizedTarget =
          cleanPath(targetPath);

        // جلوگیری از self redirect
        if (
          normalizedTarget ===
          requestedPath
        ) {
          continue;
        }

        return NextResponse.json({
          success: true,
          redirect: {
            toPath:
              withLeadingSlash(
                targetPath
              ),
            statusCode: getStatusCode(item.statusCode),
          },
          page: null,
        });
      }
    }

    // ==================================================
    // 6. چیزی پیدا نشد
    // ==================================================

    return notFound();
  } catch (error) {
    console.error(
      "GET /api/admin/seo/redirect error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        redirect: null,
        page: null,
      },
      {
        status: 500,
      }
    );
  }
}
