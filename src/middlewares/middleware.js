// middleware.js
import { NextResponse } from "next/server";

const ALLOWED_IPS = new Set(
  process.env.ALLOWED_IPS
    ? process.env.ALLOWED_IPS.split(",").map((ip) => ip.trim())
    : []
);

const PROTECTED = ["/auth/signup", "/auth/signin", "/auth/admin"];
if(PROTECTED){
  console.log("Protected routes are set");  

}
export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only run on our /auth/* pages
  if (!PROTECTED.includes(pathname)) {
    return NextResponse.next();
  }

  // Grab the client IP (first entry of x-forwarded-for)
  const xff = req.headers.get("x-forwarded-for") || "";
  const clientIp = xff.split(",")[0].trim();

  // Deny if not in our set
  if (!ALLOWED_IPS.has(clientIp)) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  // Otherwise proceed
  return NextResponse.next();
}

// Tell Next.js which paths this middleware applies to
export const config = {
  matcher: PROTECTED,
};
