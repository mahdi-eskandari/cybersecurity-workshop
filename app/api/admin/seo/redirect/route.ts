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

    const requestedPath = cleanPath(rawPath);

    await connectDB();

    // --------------------------------------------------
    // 1. Redirect دقیق
    // --------------------------------------------------

    const exactRedirect =
      await SeoRedirect.findOne({
        $or: [
          {
            fromPath: requestedPath,
          },
          {
            fromPath: withLeadingSlash(
              requestedPath
            ),
          },
        ],
      })
        .lean()
        .exec();

    if (exactRedirect) {
      return NextResponse.json({
        success: true,
        redirect: {
          toPath: withLeadingSlash(
            String(exactRedirect.toPath || "")
          ),
          statusCode:
            exactRedirect.statusCode === 302
              ? 302
              : 301,
        },
        page: null,
      });
    }

    // --------------------------------------------------
    // 2. Redirect مربوط به parent path
    //
    // مثال:
    //
    // services -> services-test
    //
    // /services/my-service
    // ->
    // /services-test/my-service
    // --------------------------------------------------

    const redirects =
      await SeoRedirect.find({})
        .sort({
          fromPath: -1,
        })
        .lean()
        .exec();

    for (const item of redirects) {
      const fromPath = cleanPath(
        String(item.fromPath || "")
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

        const targetBase =
          cleanPath(
            String(item.toPath || "")
          );

        const targetPath =
          `${targetBase}${remainingPath}`;

        return NextResponse.json({
          success: true,
          redirect: {
            toPath: withLeadingSlash(
              targetPath
            ),
            statusCode:
              item.statusCode === 302
                ? 302
                : 301,
          },
          page: null,
        });
      }
    }

    // --------------------------------------------------
    // 3. صفحه‌ای که slug فعلی خودش را دارد
    //
    // مثال:
    //
    // PageSeo:
    // pageKey = services
    // slug = services-test
    //
    // /services-test
    // ->
    // page = services
    // --------------------------------------------------

    const exactPage =
      await PageSeo.findOne({
        slug: requestedPath,
      })
        .select("pageKey slug")
        .lean()
        .exec();

    if (exactPage) {
      return NextResponse.json({
        success: true,
        redirect: null,
        page: {
          pageKey: exactPage.pageKey,
          slug: exactPage.slug,
        },
      });
    }

    // --------------------------------------------------
    // 4. صفحات دارای زیرمسیر
    //
    // /services-test/my-service
    // ->
    // services
    //
    // /blogs-test/my-post
    // ->
    // blogs
    // --------------------------------------------------

    const dynamicPages =
      await PageSeo.find({
        pageKey: {
          $in: [
            "blogs",
            "services",
          ],
        },
      })
        .select("pageKey slug")
        .lean()
        .exec();

    for (const page of dynamicPages) {
      const pageSlug = cleanPath(
        String(page.slug || "")
      );

      if (!pageSlug) {
        continue;
      }

      if (
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

    // --------------------------------------------------
    // 5. چیزی پیدا نشد
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      redirect: null,
      page: null,
    });
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