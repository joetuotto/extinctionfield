"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ModelVersionSwitcher } from "@/components/ModelVersionSwitcher";
import { activeModelVersion, modelVersionHref } from "@/lib/modelVersions";
import { getNavRoutes } from "@/lib/navigation";

export function Navigation({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = getNavRoutes(locale);
  const modelVersion = activeModelVersion(locale, pathname);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-nav-bg backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex h-16 items-center justify-between px-6">
        <Link
          href={modelVersionHref(locale, `/${locale}`, modelVersion)}
          className="text-sm font-semibold uppercase leading-none tracking-[0.1em] text-foreground transition-colors hover:text-accent"
        >
          Extinction Field
        </Link>

        <div className="hidden xl:flex items-center gap-5">
          <ul className="flex items-center gap-6">
            {links.map((link) => {
              const fullHref = modelVersionHref(
                locale,
                `/${locale}${link.href}`,
                modelVersion,
              );
              const isActive =
                link.href === ""
                  ? pathname === fullHref || pathname === `${fullHref}/`
                  : pathname === fullHref || pathname.startsWith(`${fullHref}/`);
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={fullHref}
                    className={`inline-flex items-center gap-1.5 text-[0.82rem] tracking-[0.005em] transition-colors ${
                      isActive
                        ? "text-accent font-medium"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    <Icon size={14} strokeWidth={isActive ? 2.2 : 1.8} aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2 ml-2 border-l border-border pl-4">
            <ModelVersionSwitcher locale={locale} />
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
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
        <div className="xl:hidden border-t border-border bg-background">
          <ul className="px-6 py-4 space-y-3">
            {links.map((link) => {
              const fullHref = modelVersionHref(
                locale,
                `/${locale}${link.href}`,
                modelVersion,
              );
              const isActive =
                link.href === ""
                  ? pathname === fullHref || pathname === `${fullHref}/`
                  : pathname === fullHref || pathname.startsWith(`${fullHref}/`);
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={fullHref}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2.5 text-sm transition-colors ${
                      isActive
                        ? "text-accent font-medium"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border px-6 py-4">
            <ModelVersionSwitcher locale={locale} variant="expanded" />
          </div>
        </div>
      )}
    </nav>
  );
}
