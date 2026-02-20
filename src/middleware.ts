import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const authSecret = process.env.NEXTAUTH_SECRET || "dev-only-secret-change-me";

function isProtectedRoute(pathname: string) {
  return /^\/(pt|en)\/cars(\/.*)?$/.test(pathname);
}

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  if (!isProtectedRoute(request.nextUrl.pathname)) {
    return response;
  }

  const token = await getToken({
    req: request,
    secret: authSecret,
  });

  if (token) {
    return response;
  }

  const localeFromPath = request.nextUrl.pathname.split("/")[1] || routing.defaultLocale;
  const loginUrl = new URL(`/${localeFromPath}/login`, request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/", "/(pt|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
