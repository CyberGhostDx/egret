import { NextRequest } from "next/server";
import authMiddleware from "./middleware/auth.middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function proxy(req: NextRequest) {
  const authResponse = await authMiddleware(req);
  if (
    authResponse?.status === 307 ||
    authResponse?.status === 308 ||
    authResponse?.headers?.has("location")
  ) {
    return authResponse;
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    return authResponse;
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/",
    "/(th|en)/:path*",
    "/admin/:path*",
    "/((?!api|images|_next|_vercel|.*\\..*).*)",
  ],
};
