




import { jwtVerify, JWTPayload } from "jose";
import {
  NextRequest,
  NextResponse,
} from "next/server";

const SEO_TTL = 20_000;
const seoCache = new Map<string, { at: number; data: any }>();

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

function isPublicAdminApi(pathname: string, method: string): boolean {
  const match = publicAdminApiRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  if (!match) return false;

  // مسیرهای SEO فقط برای «خواندن» عمومی‌اند
  if (pathname.startsWith("/api/admin/seo/")) {
    return method === "GET" || method === "HEAD";
  }
  return true;
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

    case "authors":
      return "/authors";

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
  process.env.INTERNAL_BASE_URL ?? "http://127.0.0.1:3000"
);

    resolverUrl.searchParams.set("path", pathname);

let data: any;
const cached = seoCache.get(pathname);

if (cached && Date.now() - cached.at < SEO_TTL) {
  data = cached.data;
} else {
  const response = await fetch(resolverUrl, {
    method: "GET",
    headers: { "x-seo-resolver": "1" },
    cache: "no-store",
    signal: AbortSignal.timeout(4000),
  });

  if (!response.ok) return null;

  data = await response.json();

  if (seoCache.size > 500) seoCache.clear();
  seoCache.set(pathname, { at: Date.now(), data });
}

    // --------------------------------------------------
    // Redirect
    // --------------------------------------------------

    if (data?.redirect?.statusCode === 410) {
      return new NextResponse(
        `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>410 - محتوا حذف شده است</title></head><body style="font-family:sans-serif;text-align:center;padding:80px 16px"><h1>410</h1><p>این صفحه برای همیشه حذف شده است.</p><a href="/">بازگشت به صفحه اصلی</a></body></html>`,
        {
          status: 410,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "X-Robots-Tag": "noindex, nofollow",
            "Cache-Control": "no-store, must-revalidate",
          },
        }
      );
    }


if (data?.redirect?.toPath) {
  const targetPath = String(data.redirect.toPath).trim();

  // ---- مقصد خارجی (http/https) ----
  if (/^https?:\/\//i.test(targetPath)) {
    try {
      const externalUrl = new URL(targetPath);

      // فقط http و https
      if (
        externalUrl.protocol !== "http:" &&
        externalUrl.protocol !== "https:"
      ) {
        return null;
      }

      const rawStatus = Number(data.redirect.statusCode);
      const statusCode = [301, 302, 307, 308].includes(rawStatus)
        ? rawStatus
        : 301;

      const redirectResponse = NextResponse.redirect(
        externalUrl,
        statusCode
      );

      redirectResponse.headers.set(
        "Cache-Control",
        "no-store, must-revalidate"
      );

      return redirectResponse;
    } catch {
      return null;
    }
  }

  // ---- مقصد داخلی ----
  const currentPath = cleanPath(pathname);
  const normalizedTarget = cleanPath(targetPath);

  // هیچ‌وقت به خودش redirect نکن
  if (currentPath === normalizedTarget) {
    return null;
  }

  // فقط مسیر داخلی امن
  const safeTarget = targetPath.startsWith("/")
    ? targetPath
    : `/${targetPath}`;

  // جلوگیری از //evil.com و path عجیب
  if (
    safeTarget.startsWith("//") ||
    safeTarget.includes("\\") ||
    safeTarget.includes("://")
  ) {
    return null;
  }

  const redirectUrl = new URL(safeTarget, request.url);

  // فقط همان دامنه
  if (redirectUrl.origin !== request.nextUrl.origin) {
    return null;
  }

  const rawStatus = Number(data.redirect.statusCode);
  const statusCode = [301, 302, 307, 308].includes(rawStatus)
    ? rawStatus
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

        const homeUrl = request.nextUrl.clone();
        homeUrl.pathname = "/";
        return NextResponse.rewrite(homeUrl);
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
        const customSlugUrl = request.nextUrl.clone();
        customSlugUrl.pathname = basePath;
        return NextResponse.rewrite(customSlugUrl);
      }

      // زیرمسیر blogs/services
            // زیرمسیر blogs/services/authors
      if (
        currentSlug &&
        (pageKey === "blogs" ||
          pageKey === "services" ||
          pageKey === "authors") &&
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

        const subPathUrl = request.nextUrl.clone();
        subPathUrl.pathname = internalPath;
        return NextResponse.rewrite(subPathUrl);
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




















function isAdminOnlyRequest(pathname: string, method: string): boolean {
  const is = (base: string) =>
    pathname === base || pathname.startsWith(`${base}/`);

  if (is("/api/feedback")) return method !== "POST";
  if (is("/api/comments")) return method !== "GET" && method !== "POST";
  if (is("/api/posts") || is("/api/services") || is("/api/media"))
    return method !== "GET";

  return false;
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

  if (isPublicAdminApi(pathname, request.method)) {
    return addSecurityHeaders(
      NextResponse.next(),
      true
    );
  }


  /*
 * ثبت گزارش توسط بازدیدکننده عمومی است (فقط POST)؛
 * امنیتش با کوکی otp_verified داخل خود route چک می‌شود.
 * GET / PATCH / DELETE همچنان فقط برای ادمین است.
 */
if (
  pathname === "/api/crisis-reports" &&
  request.method === "POST"
) {
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
    isProtectedApi(pathname) ||
    isAdminOnlyRequest(pathname, request.method);

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
    secret,
    { algorithms: ["HS256"], requiredClaims: ["exp"] }
  );

    /*
     * -------------------------------------------------------
     * Admin authorization
     * -------------------------------------------------------
     */

    if (
      (isAdmin || isAdminAPI || isProtectedAPI) &&
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
    "/((?!_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|webp|svg|gif|css|js|map|txt|xml|woff|woff2|ttf|json)$).*)",
  ],
};



