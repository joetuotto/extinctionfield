import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "fi"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const acceptLanguage = request.headers.get("accept-language") || "";
  const prefersFinnish = acceptLanguage.toLowerCase().includes("fi");
  const locale = prefersFinnish ? "fi" : defaultLocale;

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
