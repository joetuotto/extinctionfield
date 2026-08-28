import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "fi", "ja", "fr", "ko"];
const defaultLocale = "en";

const REDIRECTS: Record<string, string> = {
  "/explorer": "/explore",
  "/data": "/explore",
  "/mathematics": "/model",
  "/objections": "/about/objections",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    for (const locale of locales) {
      const prefix = `/${locale}`;
      if (pathname.startsWith(prefix)) {
        const rest = pathname.slice(prefix.length);
        const target = REDIRECTS[rest];
        if (target) {
          request.nextUrl.pathname = `${prefix}${target}`;
          return NextResponse.redirect(request.nextUrl, 308);
        }
      }
    }
    return;
  }

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() || "";
  const locale =
    acceptLanguage.includes("fi") ? "fi" :
    acceptLanguage.includes("ja") ? "ja" :
    acceptLanguage.includes("fr") ? "fr" :
    acceptLanguage.includes("ko") ? "ko" :
    defaultLocale;

  const target = REDIRECTS[pathname];
  request.nextUrl.pathname = `/${locale}${target ?? pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
