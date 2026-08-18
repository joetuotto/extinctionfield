"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const otherLocale = locale === "fi" ? "en" : "fi";
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <Link
      href={otherPath}
      className="text-xs font-medium text-foreground-muted hover:text-foreground transition-colors uppercase tracking-wide"
      title={otherLocale === "fi" ? "Suomeksi" : "In English"}
    >
      {otherLocale === "fi" ? "FI" : "EN"}
    </Link>
  );
}
