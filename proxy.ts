import { NextRequest } from "next/server";
import authMiddleware from "./middleware/auth.middleware";

export async function proxy(request: NextRequest) {
  return await authMiddleware(request);
}

export const config = {
  matcher: ["/((?!login|api|images|_next/static|_next/image|favicon.ico).*)"],
};
