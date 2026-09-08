"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { SEARCH_COPY } from "@/lib/search";
import { pickCopy } from "@/lib/i18n";

export function SearchLink({ locale }: { locale: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const copy = pickCopy(SEARCH_COPY, locale);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey || event.key.toLowerCase() !== "k") return;
      if (event.target instanceof HTMLElement && event.target.closest("input, textarea, select, [contenteditable='true']")) return;
      event.preventDefault();
      const input = document.getElementById("site-search-input");
      if (input) input.focus();
      else linkRef.current?.click();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Link ref={linkRef} href={`/${locale}/search`} aria-label={copy.label} title={`${copy.label} (Ctrl/⌘ K)`}
      className="inline-flex min-h-10 min-w-10 items-center justify-center gap-1.5 rounded-md px-2 text-sm text-foreground-muted hover:bg-card-bg hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
      <Search size={18} aria-hidden="true" />
      <span className="hidden sm:inline xl:hidden 2xl:inline">{copy.title}</span>
    </Link>
  );
}
