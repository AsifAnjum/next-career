import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import { author, contentManager, hr, user } from "./lib/constant";

const { auth } = NextAuth(authConfig);

export default auth(async (req: NextRequest) => {
  if (req.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL(`/dashboard/profile`, req.url));
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token || !token.user?.role) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  switch (token.user.role) {
    case user:
      if (
        !req.nextUrl.pathname.startsWith("/dashboard/profile") &&
        !req.nextUrl.pathname.startsWith("/dashboard/settings")
      ) {
        return NextResponse.rewrite(new URL("/404", req.url));
      }
      break;
    case hr:
      if (
        req.nextUrl.pathname.startsWith("/dashboard/blog") ||
        req.nextUrl.pathname.startsWith("/dashboard/user")
      ) {
        return NextResponse.rewrite(new URL("/404", req.url));
      }
      break;

    case author:
      if (
        req.nextUrl.pathname.startsWith("/dashboard/job") ||
        req.nextUrl.pathname.startsWith("/dashboard/user")
      ) {
        return NextResponse.rewrite(new URL("/404", req.url));
      }
      break;
    case contentManager:
      if (req.nextUrl.pathname.startsWith("/dashboard/user")) {
        return NextResponse.rewrite(new URL("/404", req.url));
      }
      break;
    default:
      break;
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
