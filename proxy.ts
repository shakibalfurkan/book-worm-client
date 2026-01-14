import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const AuthRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const ROLE_REDIRECTS = {
  ADMIN: "/admin/dashboard",
  USER: "/user/my-library",
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/") {
    const role = user?.role as keyof typeof ROLE_REDIRECTS;
    const target = ROLE_REDIRECTS[role] || "/login";
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (user.role === "USER" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/user/my-library", request.url));
  }

  if (user.role === "ADMIN" && pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/user/:path*", "/admin/:path*", "/login", "/register"],
};
