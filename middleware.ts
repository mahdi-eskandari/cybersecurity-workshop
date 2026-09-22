// import { jwtVerify, JWTPayload } from "jose";
// import { NextRequest, NextResponse } from "next/server";

// interface AuthTokenPayload extends JWTPayload {
//   userId: string;
//   email: string;
//   role: "user" | "admin";
// }

// const publicAdminApiRoutes = [
//   "/api/admin/login",
//   "/api/admin/verify",
//   "/api/admin/resend-code",
// ];

// function isPublicAdminApi(pathname: string): boolean {
//   return publicAdminApiRoutes.some(
//     (route) =>
//       pathname === route ||
//       pathname.startsWith(`${route}/`)
//   );
// }

// function isAdminPage(pathname: string): boolean {
//   return (
//     pathname === "/admin" ||
//     pathname.startsWith("/admin/")
//   );
// }

// function isAdminApi(pathname: string): boolean {
//   return (
//     pathname === "/api/admin" ||
//     pathname.startsWith("/api/admin/")
//   );
// }

// function isProtectedApi(pathname: string): boolean {
//   return (
//     pathname === "/api/crisis-reports" ||
//     pathname.startsWith("/api/crisis-reports/")
//   );
// }

// function isApiRoute(pathname: string): boolean {
//   return pathname === "/api" || pathname.startsWith("/api/");
// }

// function addSecurityHeaders(
//   response: NextResponse,
//   noIndex = false
// ) {
//   response.headers.set(
//     "X-Content-Type-Options",
//     "nosniff"
//   );

//   response.headers.set(
//     "Referrer-Policy",
//     "strict-origin-when-cross-origin"
//   );

//   response.headers.set(
//     "X-Frame-Options",
//     "SAMEORIGIN"
//   );

//   response.headers.set(
//     "Permissions-Policy",
//     "camera=(), microphone=(), geolocation=()"
//   );

//   if (noIndex) {
//     response.headers.set(
//       "X-Robots-Tag",
//       "noindex, nofollow, noarchive"
//     );
//   }

//   return response;
// }

// export async function middleware(
//   request: NextRequest
// ) {
//   const { pathname } = request.nextUrl;

//   /*
//    * ---------------------------------------------------------
//    * Public admin authentication APIs
//    * ---------------------------------------------------------
//    *
//    * این Routeها قبل از داشتن Token باید قابل دسترسی باشند.
//    *
//    * /api/admin/verify
//    * /api/admin/login
//    * /api/admin/resend-code
//    */
//   if (isPublicAdminApi(pathname)) {
//     return addSecurityHeaders(
//       NextResponse.next(),
//       true
//     );
//   }

//   const isAdmin = isAdminPage(pathname);
//   const isAdminAPI = isAdminApi(pathname);
//   const isProtectedAPI = isProtectedApi(pathname);

//   /*
//    * فقط این بخش‌ها نیاز به احراز هویت دارند.
//    */
//   if (!isAdmin && !isAdminAPI && !isProtectedAPI) {
//     return NextResponse.next();
//   }

//   const token = request.cookies.get("token")?.value;

//   /*
//    * ---------------------------------------------------------
//    * No token
//    * ---------------------------------------------------------
//    */
//   if (!token) {
//     if (isApiRoute(pathname)) {
//       return addSecurityHeaders(
//         NextResponse.json(
//           {
//             error: "Unauthorized",
//           },
//           {
//             status: 401,
//           }
//         ),
//         true
//       );
//     }

//     return NextResponse.redirect(
//       new URL("/admin-login", request.url)
//     );
//   }

//   /*
//    * ---------------------------------------------------------
//    * Verify JWT
//    * ---------------------------------------------------------
//    */
//   try {
//     const jwtSecret = process.env.JWT_SECRET;

//     if (!jwtSecret) {
//       throw new Error(
//         "JWT_SECRET is not configured"
//       );
//     }

//     const secret = new TextEncoder().encode(
//       jwtSecret
//     );

//     const { payload } =
//       await jwtVerify<AuthTokenPayload>(
//         token,
//         secret
//       );

//     /*
//      * -------------------------------------------------------
//      * Admin authorization
//      * -------------------------------------------------------
//      */
//     if (
//       (isAdmin || isAdminAPI) &&
//       payload.role !== "admin"
//     ) {
//       if (isApiRoute(pathname)) {
//         return addSecurityHeaders(
//           NextResponse.json(
//             {
//               error: "Forbidden",
//             },
//             {
//               status: 403,
//             }
//           ),
//           true
//         );
//       }

//       return NextResponse.redirect(
//         new URL("/admin-login", request.url)
//       );
//     }

//     /*
//      * -------------------------------------------------------
//      * Valid token
//      * -------------------------------------------------------
//      */
//     return addSecurityHeaders(
//       NextResponse.next(),
//       isAdmin || isAdminAPI
//     );
//   } catch {
//     /*
//      * -------------------------------------------------------
//      * Invalid / expired token
//      * -------------------------------------------------------
//      */

//     if (isApiRoute(pathname)) {
//       const response = NextResponse.json(
//         {
//           error: "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );

//       response.cookies.delete("token");

//       return addSecurityHeaders(
//         response,
//         true
//       );
//     }

//     const loginUrl = new URL(
//       "/admin-login",
//       request.url
//     );

//     loginUrl.searchParams.set(
//       "error",
//       "session_expired"
//     );

//     const response =
//       NextResponse.redirect(loginUrl);

//     response.cookies.delete("token");

//     return response;
//   }
// }

// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/api/admin/:path*",
//     "/api/crisis-reports/:path*",
//   ],
// };






import { jwtVerify, JWTPayload } from "jose";
import {
  NextRequest,
  NextResponse,
} from "next/server";

interface AuthTokenPayload extends JWTPayload {
  userId: string;
  email: string;
  role: "user" | "admin";
}

const publicAdminApiRoutes = [
  "/api/admin/login",
  "/api/admin/verify",
  "/api/admin/resend-code",

  // SEO resolver فقط اطلاعات عمومی SEO می‌خواند
  "/api/admin/seo/redirect",

  // اسلاگ فعلی صفحات، برای prev/next سمت کلاینت
  "/api/admin/seo/pages",
];

function isPublicAdminApi(pathname: string): boolean {
  return publicAdminApiRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );
}

function isAdminPage(pathname: string): boolean {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/")
  );
}

function isAdminApi(pathname: string): boolean {
  return (
    pathname === "/api/admin" ||
    pathname.startsWith("/api/admin/")
  );
}

function isProtectedApi(pathname: string): boolean {
  return (
    pathname === "/api/crisis-reports" ||
    pathname.startsWith(
      "/api/crisis-reports/"
    )
  );
}

function isApiRoute(pathname: string): boolean {
  return (
    pathname === "/api" ||
    pathname.startsWith("/api/")
  );
}

function addSecurityHeaders(
  response: NextResponse,
  noIndex = false
) {
  response.headers.set(
    "X-Content-Type-Options",
    "nosniff"
  );

  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );

  response.headers.set(
    "X-Frame-Options",
    "SAMEORIGIN"
  );

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  if (noIndex) {
    response.headers.set(
      "X-Robots-Tag",
      "noindex, nofollow, noarchive"
    );
  }

  return response;
}

function cleanPath(value: string): string {
  return value
    .replace(/^\/+|\/+$/g, "")
    .trim();
}

function getSeoBasePath(
  pageKey: string
): string | null {
  switch (pageKey) {
    case "home":
      return "/";

    case "services":
      return "/services";

    case "blogs":
      return "/blogs";

    case "about":
      return "/about";

    case "contact":
      return "/contact";

    case "privacy":
      return "/privacy";

    default:
      return null;
  }
}

function isStaticOrInternalPath(
  pathname: string
): boolean {
  return (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/api/")
  );
}

async function handleSeo(
  request: NextRequest
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  if (isStaticOrInternalPath(pathname)) {
    return null;
  }

  if (
    isAdminPage(pathname) ||
    isAdminApi(pathname) ||
    isProtectedApi(pathname)
  ) {
    return null;
  }

  try {
    const resolverUrl = new URL(
      "/api/admin/seo/redirect",
      request.url
    );

    resolverUrl.searchParams.set("path", pathname);

    const response = await fetch(resolverUrl, {
      method: "GET",
      headers: {
        "x-seo-resolver": "1",
      },
      cache: "no-store",
      next: {
        revalidate: 0,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // --------------------------------------------------
    // Redirect
    // --------------------------------------------------

    if (data?.redirect?.toPath) {
      const targetPath = String(
        data.redirect.toPath
      );

      const currentPath = cleanPath(pathname);
      const normalizedTarget =
        cleanPath(targetPath);

      // هیچ‌وقت به خودش redirect نکن
      if (
        currentPath === normalizedTarget
      ) {
        return null;
      }

      const redirectUrl = new URL(
        targetPath.startsWith("/")
          ? targetPath
          : `/${targetPath}`,
        request.url
      );

      const statusCode =
        data.redirect.statusCode === 302
          ? 302
          : 301;

const redirectResponse = NextResponse.redirect(
  redirectUrl,
  statusCode
);

redirectResponse.headers.set(
  "Cache-Control",
  "no-store, must-revalidate"
);

return redirectResponse;
    }

    // --------------------------------------------------
    // Current Page
    // --------------------------------------------------

    if (data?.page?.pageKey) {
      const pageKey = String(
        data.page.pageKey
      );

      const basePath =
        getSeoBasePath(pageKey);

      if (!basePath) {
        return null;
      }

      const currentPath =
        cleanPath(pathname);

      const currentSlug =
        cleanPath(
          String(data.page.slug || "")
        );

      // Home
      if (pageKey === "home") {
        if (currentPath === "") {
          return null;
        }

        return NextResponse.rewrite(
          new URL("/", request.url)
        );
      }

      // مسیر اصلی
      if (
        currentPath ===
        cleanPath(basePath)
      ) {
        return null;
      }

      // slug سفارشی
      //
      // /blogs-test
      // ->
      // /blogs
      //
      // اینجا rewrite است، نه redirect
      if (
        currentSlug &&
        currentPath === currentSlug
      ) {
        return NextResponse.rewrite(
          new URL(
            basePath,
            request.url
          )
        );
      }

      // زیرمسیر blogs/services
      if (
        currentSlug &&
        (pageKey === "blogs" ||
          pageKey === "services") &&
        currentPath.startsWith(
          `${currentSlug}/`
        )
      ) {
        const remainingPath =
          currentPath.slice(
            currentSlug.length
          );

        const internalPath =
          `${basePath}${remainingPath}`;

        return NextResponse.rewrite(
          new URL(
            internalPath,
            request.url
          )
        );
      }
    }

    return null;
  } catch (error) {
    console.error(
      "SEO middleware error:",
      error
    );

    return null;
  }
}

export async function middleware(
  request: NextRequest
) {
  const { pathname } = request.nextUrl;

  /*
   * ---------------------------------------------------------
   * Public admin authentication APIs
   * ---------------------------------------------------------
   */

  if (isPublicAdminApi(pathname)) {
    return addSecurityHeaders(
      NextResponse.next(),
      true
    );
  }

  const isAdmin =
    isAdminPage(pathname);

  const isAdminAPI =
    isAdminApi(pathname);

  const isProtectedAPI =
    isProtectedApi(pathname);

  /*
   * ---------------------------------------------------------
   * مسیرهای عمومی سایت
   * ---------------------------------------------------------
   *
   * SEO فقط برای همین مسیرها اجرا می‌شود.
   */

  if (
    !isAdmin &&
    !isAdminAPI &&
    !isProtectedAPI
  ) {
    const seoResponse =
      await handleSeo(request);

    if (seoResponse) {
      return seoResponse;
    }

    return NextResponse.next();
  }

  /*
   * فقط بخش‌های محافظت‌شده نیاز به احراز هویت دارند.
   */

  const token =
    request.cookies.get("token")?.value;

  /*
   * ---------------------------------------------------------
   * No token
   * ---------------------------------------------------------
   */

  if (!token) {
    if (isApiRoute(pathname)) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: "Unauthorized",
          },
          {
            status: 401,
          }
        ),
        true
      );
    }

    return NextResponse.redirect(
      new URL(
        "/admin-login",
        request.url
      )
    );
  }

  /*
   * ---------------------------------------------------------
   * Verify JWT
   * ---------------------------------------------------------
   */

  try {
    const jwtSecret =
      process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error(
        "JWT_SECRET is not configured"
      );
    }

    const secret =
      new TextEncoder().encode(
        jwtSecret
      );

    const { payload } =
      await jwtVerify<AuthTokenPayload>(
        token,
        secret
      );

    /*
     * -------------------------------------------------------
     * Admin authorization
     * -------------------------------------------------------
     */

    if (
      (isAdmin || isAdminAPI) &&
      payload.role !== "admin"
    ) {
      if (isApiRoute(pathname)) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: "Forbidden",
            },
            {
              status: 403,
            }
          ),
          true
        );
      }

      return NextResponse.redirect(
        new URL(
          "/admin-login",
          request.url
        )
      );
    }

    /*
     * -------------------------------------------------------
     * Valid token
     * -------------------------------------------------------
     */

    return addSecurityHeaders(
      NextResponse.next(),
      isAdmin || isAdminAPI
    );
  } catch {
    /*
     * -------------------------------------------------------
     * Invalid / expired token
     * -------------------------------------------------------
     */

    if (isApiRoute(pathname)) {
      const response =
        NextResponse.json(
          {
            error: "Unauthorized",
          },
          {
            status: 401,
          }
        );

      response.cookies.delete(
        "token"
      );

      return addSecurityHeaders(
        response,
        true
      );
    }

    const loginUrl =
      new URL(
        "/admin-login",
        request.url
      );

    loginUrl.searchParams.set(
      "error",
      "session_expired"
    );

    const response =
      NextResponse.redirect(
        loginUrl
      );

    response.cookies.delete(
      "token"
    );

    return response;
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/crisis-reports/:path*",

    // مسیرهای عمومی سایت برای SEO
    "/:path*",
  ],
};