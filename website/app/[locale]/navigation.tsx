"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getNavRoutes, type ResolvedNavRoute } from "@/lib/navigation";

function NavDropdown({
  link,
  locale,
  pathname,
}: {
  link: ResolvedNavRoute;
  locale: string;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const groupHref = `/${locale}${link.href}`;
  const isGroupActive = pathname.startsWith(groupHref) ||
    (link.children ?? []).some((child) => {
      const childHref = `/${locale}${child.href}`;
      return pathname === childHref || pathname.startsWith(`${childHref}/`);
    });
  const Icon = link.icon;

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 text-[0.82rem] tracking-[0.005em] transition-colors ${
          isGroupActive
            ? "text-accent font-medium"
            : "text-foreground-muted hover:text-foreground"
        }`}
      >
        <Icon size={14} strokeWidth={isGroupActive ? 2.2 : 1.8} aria-hidden="true" />
        {link.label}
        <ChevronDown
          size={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul className="absolute left-0 top-full mt-2 min-w-[200px] rounded-lg border border-card-border bg-background py-1.5 shadow-lg">
          {link.children!.map((child) => {
            const childHref = `/${locale}${child.href}`;
            const isChildActive =
              child.href === link.href
                ? pathname === childHref || pathname === `${childHref}/`
                : pathname === childHref || pathname.startsWith(`${childHref}/`);
            const ChildIcon = child.icon;
            return (
              <li key={child.href}>
                <Link
                  href={childHref}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-[0.82rem] transition-colors ${
                    isChildActive
                      ? "text-accent font-medium"
                      : "text-foreground-muted hover:text-foreground hover:bg-card-bg"
                  }`}
                >
                  <ChildIcon size={14} strokeWidth={isChildActive ? 2.2 : 1.8} aria-hidden="true" />
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export function Navigation({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = getNavRoutes(locale);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-nav-bg backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex h-16 items-center justify-between px-6">
        <Link
          href={`/${locale}`}
          className="text-sm font-semibold uppercase leading-none tracking-[0.1em] text-foreground transition-colors hover:text-accent"
        >
          Extinction Field
        </Link>

        <div className="hidden xl:flex items-center gap-5">
          <ul className="flex items-center gap-6">
            {links.map((link) => {
              if (link.children) {
                return (
                  <NavDropdown
                    key={link.href}
                    link={link}
                    locale={locale}
                    pathname={pathname}
                  />
                );
              }
              const fullHref = `/${locale}${link.href}`;
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
        <div className="xl:hidden border-t border-border bg-background overflow-y-auto max-h-[calc(100dvh-4rem)]">
          <ul className="px-6 py-4 space-y-3">
            {links.map((link) => {
              if (link.children) {
                return link.children.map((child) => {
                  const childHref = `/${locale}${child.href}`;
                  const isChildActive =
                    child.href === link.href
                      ? pathname === childHref || pathname === `${childHref}/`
                      : pathname === childHref || pathname.startsWith(`${childHref}/`);
                  const ChildIcon = child.icon;
                  return (
                    <li key={child.href}>
                      <Link
                        href={childHref}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-2.5 text-sm transition-colors ${
                          child.href !== link.href ? "pl-5" : ""
                        } ${
                          isChildActive
                            ? "text-accent font-medium"
                            : "text-foreground-muted hover:text-foreground"
                        }`}
                      >
                        <ChildIcon size={16} strokeWidth={isChildActive ? 2.2 : 1.8} aria-hidden="true" />
                        {child.label}
                      </Link>
                    </li>
                  );
                });
              }
              const fullHref = `/${locale}${link.href}`;
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
        </div>
      )}
    </nav>
  );
}
