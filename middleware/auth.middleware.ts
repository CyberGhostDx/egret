import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authClient } from "@/lib/auth-client";

export default async function authMiddleware(req: NextRequest) {
  try {
    const { data: session } = await authClient.getSession({
      fetchOptions: {
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      },
    });

    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
