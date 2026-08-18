"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const NAV_LINKS = {
  en: [
    { href: "", label: "Home" },
    { href: "/predictions", label: "Predictions" },
    { href: "/explorer", label: "Explorer" },
    { href: "/model", label: "Model" },
    { href: "/mathematics", label: "Mathematics" },
    { href: "/sentinel", label: "Sentinel" },
    { href: "/evidence", label: "Evidence" },
    { href: "/data", label: "Data" },
    { href: "/about", label: "About" },
  ],
  fi: [
    { href: "", label: "Etusivu" },
    { href: "/predictions", label: "Ennusteet" },
    { href: "/explorer", label: "Tutkija" },
    { href: "/model", label: "Malli" },
    { href: "/mathematics", label: "Matematiikka" },
    { href: "/sentinel", label: "Lajit" },
    { href: "/evidence", label: "Näyttö" },
    { href: "/data", label: "Data" },
    { href: "/about", label: "Tietoa" },
  ],
} as const;

export function Navigation({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = locale === "fi" ? NAV_LINKS.fi : NAV_LINKS.en;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-nav-bg backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        <Link
          href={`/${locale}`}
          className="text-sm font-semibold tracking-wide uppercase text-foreground hover:text-accent transition-colors"
        >
          Extinction Field
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {links.map((link) => {
              const fullHref = `/${locale}${link.href}`;
              const isActive =
                link.href === ""
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(fullHref);
              return (
                <li key={link.href}>
                  <Link
                    href={fullHref}
                    className={`text-sm transition-colors ${
                      isActive
                        ? "text-accent font-medium"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2 ml-2 border-l border-border pl-4">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
          <button
            className="p-2 text-foreground-muted hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="5" x2="17" y2="5" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="15" x2="17" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="px-6 py-4 space-y-3">
            {links.map((link) => {
              const fullHref = `/${locale}${link.href}`;
              const isActive =
                link.href === ""
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(fullHref);
              return (
                <li key={link.href}>
                  <Link
                    href={fullHref}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-sm transition-colors ${
                      isActive
                        ? "text-accent font-medium"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
