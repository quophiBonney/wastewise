// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // only protect the exact dashboard route (and its sub-paths)
  if (pathname.startsWith("/auth/admin/dashboard")) {
    if (!token) {
      // no token? send them to signin
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // otherwise, continue
  return NextResponse.next();
}

// tell Next.js which paths this middleware applies to:
export const config = {
  matcher: ["/auth/admin/dashboard/:path*"],
};
