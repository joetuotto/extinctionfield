"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { locales, LOCALE_FLAGS, LOCALE_NAMES, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const getLocalePath = useCallback(
    (target: Locale) => pathname.replace(`/${locale}`, `/${target}`),
    [pathname, locale]
  );

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Select language"
        className="text-xs font-medium text-foreground-muted hover:text-foreground transition-colors uppercase tracking-wide px-1.5 py-1 rounded hover:bg-card-bg"
      >
        {LOCALE_FLAGS[locale as Locale] ?? locale.toUpperCase()}
      </button>
      {open && (
        <ul className="absolute right-0 top-full mt-1.5 w-36 rounded-lg border border-card-border bg-background py-1 shadow-xl shadow-black/20 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
          {locales.map((l) => {
            const isCurrent = l === locale;
            return (
              <li key={l}>
                <Link
                  href={getLocalePath(l)}
                  aria-current={isCurrent ? "true" : undefined}
                  className={`flex items-center gap-2.5 px-3 py-1.5 text-sm transition-colors ${
                    isCurrent
                      ? "text-accent bg-accent/5 font-medium"
                      : "text-foreground-muted hover:text-foreground hover:bg-card-bg"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="text-xs font-mono w-5">{LOCALE_FLAGS[l]}</span>
                  <span>{LOCALE_NAMES[l]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
