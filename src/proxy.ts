import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getRoleFromPath,
  getUserById,
  roleHomePath,
  SESSION_COOKIE,
} from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userId = request.cookies.get(SESSION_COOKIE)?.value;
  const user = userId ? getUserById(userId) : null;

  const isLogin = pathname === "/login";
  const isAuthApi = pathname.startsWith("/api/auth/");
  const isPublicApi = pathname.startsWith("/api/health");

  if (isAuthApi || isPublicApi) {
    return NextResponse.next();
  }

  if (!user) {
    if (isLogin) return NextResponse.next();
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLogin || pathname === "/") {
    return NextResponse.redirect(new URL(roleHomePath[user.role], request.url));
  }

  const pathRole = getRoleFromPath(pathname);
  if (pathRole && pathRole !== user.role) {
    return NextResponse.redirect(new URL(roleHomePath[user.role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
