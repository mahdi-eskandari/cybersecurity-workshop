// import { NextRequest, NextResponse } from "next/server";

// import connectDB from "@/lib/mongodb";
// import SeoRedirect from "../../../../model/SeoRedirect";
// import PageSeo from "../../../../model/PageSeo";

// export const runtime = "nodejs";

// function cleanPath(value: string): string {
//   return value
//     .replace(/^\/+|\/+$/g, "")
//     .trim();
// }

// function withLeadingSlash(value: string): string {
//   const clean = cleanPath(value);

//   if (!clean) {
//     return "/";
//   }

//   return `/${clean}`;
// }

// export async function GET(request: NextRequest) {
//   try {
//     const rawPath =
//       request.nextUrl.searchParams.get("path");

//     if (!rawPath) {
//       return NextResponse.json(
//         {
//           success: false,
//           redirect: null,
//           page: null,
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const requestedPath =
//       cleanPath(rawPath);

//     await connectDB();

//     // ==================================================
//     // 1. اول PageSeo فعلی را پیدا کن
//     //
//     // خیلی مهم:
//     // PageSeo فعلی باید بر redirect قدیمی اولویت داشته باشد.
//     // ==================================================

//     const exactPage =
//       await PageSeo.findOne({
//         slug: requestedPath,
//       })
//         .select("pageKey slug")
//         .lean()
//         .exec();

//     if (exactPage) {
//       return NextResponse.json({
//         success: true,
//         redirect: null,
//         page: {
//           pageKey: exactPage.pageKey,
//           slug: exactPage.slug,
//         },
//       });
//     }

//     // ==================================================
//     // 2. بررسی زیرمسیرهای blogs / services
//     //
//     // مثال:
//     //
//     // /blogs/my-post
//     // /services/my-service
//     //
//     // اگر slug فعلی باشند، نباید redirect قدیمی
//     // روی آنها اعمال شود.
//     // ==================================================

//     const dynamicPages =
//       await PageSeo.find({
//         pageKey: {
//           $in: [
//             "blogs",
//             "services",
//           ],
//         },
//       })
//         .select("pageKey slug")
//         .lean()
//         .exec();

//     for (const page of dynamicPages) {
//       const pageSlug =
//         cleanPath(
//           String(page.slug || "")
//         );

//       if (!pageSlug) {
//         continue;
//       }

//       if (
//         requestedPath.startsWith(
//           `${pageSlug}/`
//         )
//       ) {
//         return NextResponse.json({
//           success: true,
//           redirect: null,
//           page: {
//             pageKey: page.pageKey,
//             slug: page.slug,
//           },
//         });
//       }
//     }

//     // ==================================================
//     // 3. حالا Redirect دقیق را بررسی کن
//     //
//     // فقط مسیرهایی که دیگر slug فعلی نیستند
//     // به این قسمت می‌رسند.
//     // ==================================================

//     const exactRedirect =
//       await SeoRedirect.findOne({
//         $or: [
//           {
//             fromPath: requestedPath,
//           },
//           {
//             fromPath:
//               withLeadingSlash(
//                 requestedPath
//               ),
//           },
//         ],
//       })
//         .lean()
//         .exec();

//     if (exactRedirect) {
//       const targetPath =
//         withLeadingSlash(
//           String(
//             exactRedirect.toPath || ""
//           )
//         );

//       // جلوگیری از self redirect
//       if (
//         cleanPath(targetPath) ===
//         requestedPath
//       ) {
//         return NextResponse.json({
//           success: true,
//           redirect: null,
//           page: null,
//         });
//       }

//       return NextResponse.json({
//         success: true,
//         redirect: {
//           toPath: targetPath,
//           statusCode:
//             exactRedirect.statusCode === 302
//               ? 302
//               : 301,
//         },
//         page: null,
//       });
//     }

//     // ==================================================
//     // 4. Redirect مربوط به parent path
//     //
//     // مثال:
//     //
//     // /services-old/my-service
//     // ->
//     // /services/my-service
//     // ==================================================

//     const redirects =
//       await SeoRedirect.find({})
//         .sort({
//           fromPath: -1,
//         })
//         .lean()
//         .exec();

//     for (const item of redirects) {
//       const fromPath =
//         cleanPath(
//           String(
//             item.fromPath || ""
//           )
//         );

//       if (!fromPath) {
//         continue;
//       }

//       if (
//         requestedPath.startsWith(
//           `${fromPath}/`
//         )
//       ) {
//         const remainingPath =
//           requestedPath.slice(
//             fromPath.length
//           );

//         const targetBase =
//           cleanPath(
//             String(
//               item.toPath || ""
//             )
//           );

//         const targetPath =
//           `${targetBase}${remainingPath}`;

//         const normalizedTarget =
//           cleanPath(targetPath);

//         // جلوگیری از self redirect
//         if (
//           normalizedTarget ===
//           requestedPath
//         ) {
//           continue;
//         }

//         return NextResponse.json({
//           success: true,
//           redirect: {
//             toPath:
//               withLeadingSlash(
//                 targetPath
//               ),
//             statusCode:
//               item.statusCode === 302
//                 ? 302
//                 : 301,
//           },
//           page: null,
//         });
//       }
//     }

//     // ==================================================
//     // 5. چیزی پیدا نشد
//     // ==================================================

//     return NextResponse.json({
//       success: true,
//       redirect: null,
//       page: null,
//     });
//   } catch (error) {
//     console.error(
//       "GET /api/admin/seo/redirect error:",
//       error
//     );

//     return NextResponse.json(
//       {
//         success: false,
//         redirect: null,
//         page: null,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }


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

    const requestedPath =
      cleanPath(rawPath);

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
    // 2. بررسی زیرمسیرهای blogs / services
    //
    // مثال:
    //
    // /blogs/my-post
    // /services/my-service
    //
    // اگر slug فعلی باشند، نباید redirect قدیمی
    // روی آنها اعمال شود.
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

    for (const page of dynamicPages) {
      const pageSlug =
        cleanPath(
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

    // ==================================================
    // 3. حالا Redirect دقیق را بررسی کن
    //
    // فقط مسیرهایی که دیگر slug فعلی نیستند
    // به این قسمت می‌رسند.
    // ==================================================

    const exactRedirect =
      await SeoRedirect.findOne({
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
      const targetPath =
        withLeadingSlash(
          String(
            exactRedirect.toPath || ""
          )
        );

      // جلوگیری از self redirect
      if (
        cleanPath(targetPath) ===
        requestedPath
      ) {
        return NextResponse.json({
          success: true,
          redirect: null,
          page: null,
        });
      }

      return NextResponse.json({
        success: true,
        redirect: {
          toPath: targetPath,
          statusCode:
            exactRedirect.statusCode === 302
              ? 302
              : 301,
        },
        page: null,
      });
    }

    // ==================================================
    // 4. Redirect مربوط به parent path
    //
    // مثال:
    //
    // /services-old/my-service
    // ->
    // /services/my-service
    // ==================================================

    const redirects =
      await SeoRedirect.find({})
        .sort({
          fromPath: -1,
        })
        .lean()
        .exec();

    for (const item of redirects) {
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

        const targetBase =
          cleanPath(
            String(
              item.toPath || ""
            )
          );

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
            statusCode:
              item.statusCode === 302
                ? 302
                : 301,
          },
          page: null,
        });
      }
    }

    // ==================================================
    // 5. چیزی پیدا نشد
    // ==================================================

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