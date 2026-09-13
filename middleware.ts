import { jwtVerify, JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";

interface AuthTokenPayload extends JWTPayload {
  userId: string;
  email: string;
  role: "user" | "admin";
}

const publicAdminApiRoutes = [
  "/api/admin/login",
  "/api/admin/verify",
  "/api/admin/resend-code",
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
    pathname.startsWith("/api/crisis-reports/")
  );
}

function isApiRoute(pathname: string): boolean {
  return pathname === "/api" || pathname.startsWith("/api/");
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

export async function middleware(
  request: NextRequest
) {
  const { pathname } = request.nextUrl;

  /*
   * ---------------------------------------------------------
   * Public admin authentication APIs
   * ---------------------------------------------------------
   *
   * این Routeها قبل از داشتن Token باید قابل دسترسی باشند.
   *
   * /api/admin/verify
   * /api/admin/login
   * /api/admin/resend-code
   */
  if (isPublicAdminApi(pathname)) {
    return addSecurityHeaders(
      NextResponse.next(),
      true
    );
  }

  const isAdmin = isAdminPage(pathname);
  const isAdminAPI = isAdminApi(pathname);
  const isProtectedAPI = isProtectedApi(pathname);

  /*
   * فقط این بخش‌ها نیاز به احراز هویت دارند.
   */
  if (!isAdmin && !isAdminAPI && !isProtectedAPI) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

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
      new URL("/admin-login", request.url)
    );
  }

  /*
   * ---------------------------------------------------------
   * Verify JWT
   * ---------------------------------------------------------
   */
  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error(
        "JWT_SECRET is not configured"
      );
    }

    const secret = new TextEncoder().encode(
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
        new URL("/admin-login", request.url)
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
      const response = NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );

      response.cookies.delete("token");

      return addSecurityHeaders(
        response,
        true
      );
    }

    const loginUrl = new URL(
      "/admin-login",
      request.url
    );

    loginUrl.searchParams.set(
      "error",
      "session_expired"
    );

    const response =
      NextResponse.redirect(loginUrl);

    response.cookies.delete("token");

    return response;
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/crisis-reports/:path*",
  ],
};