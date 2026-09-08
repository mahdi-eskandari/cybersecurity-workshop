import { jwtVerify, JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";

interface AuthTokenPayload extends JWTPayload {
  userId: string;
  email: string;
  role: "user" | "admin";
}

const protectedPageRoutes = ["/", "/trips", "/profile"];
const protectedApiRoutes = ["/api/trips", "/api/profile"];

function isPathProtected(
  pathname: string,
  routes: string[]
): boolean {
  return routes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );
}

function isAdminRoute(pathname: string): boolean {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/api/admin" ||
    pathname.startsWith("/api/admin/")
  );
}

function isApiRoute(pathname: string): boolean {
  return pathname === "/api" || pathname.startsWith("/api/");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isAdmin = isAdminRoute(pathname);
  const isProtectedPage = isPathProtected(pathname, protectedPageRoutes);
  const isProtectedApi = isPathProtected(pathname, protectedApiRoutes);

  // If the route is not protected at all, let it pass
  if (!isAdmin && !isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  // All protected routes require a token
  if (!token) {
    if (isApiRoute(pathname)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const secret = new TextEncoder().encode(jwtSecret);

    const { payload } = await jwtVerify<AuthTokenPayload>(
      token,
      secret
    );

    // Admin routes require the admin role
    if (isAdmin && payload.role !== "admin") {
      if (isApiRoute(pathname)) {
        return NextResponse.json(
          { error: "Forbidden" },
          { status: 403 }
        );
      }

      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch {
    if (isApiRoute(pathname)) {
      const response = NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

      response.cookies.delete("token");

      return response;
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "session_expired");

    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("token");

    return response;
  }
}

export const config = {
  matcher: [
    "/",
    "/trips/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/api/trips/:path*",
    "/api/profile/:path*",
    "/api/admin/:path*",
  ],
};
