import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authClient } from "@/lib/auth-client";

export default async function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoginPage =
    pathname === "/login" ||
    pathname === "/en/login" ||
    pathname === "/th/login" ||
    pathname === "/admin/login";

  const isTermsPage =
    pathname === "/terms" ||
    pathname === "/en/terms" ||
    pathname === "/th/terms";

  if (isLoginPage || isTermsPage) {
    return NextResponse.next();
  }

  try {
    const { data: session } = await authClient.getSession({
      fetchOptions: {
        headers: req.headers,
      },
    });

    if (!session?.user) {
      if (pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/admin")) {
      if ((session.user as any).role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  } catch (error) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
