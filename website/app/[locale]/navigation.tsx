"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useLayoutEffect, useId, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SearchLink } from "@/components/SearchLink";
import {
  getActiveNavSection,
  getHomeRoute,
  getNavRoutes,
  isNavPageCurrent,
  type ResolvedNavRoute,
} from "@/lib/navigation";
import { pickCopy } from "@/lib/i18n";

const NAV_COPY = {
  en: { mainNav: "Main navigation", openMenu: "Open menu", closeMenu: "Close menu" },
  fi: { mainNav: "Päävalikko", openMenu: "Avaa valikko", closeMenu: "Sulje valikko" },
  ja: { mainNav: "メインナビゲーション", openMenu: "メニューを開く", closeMenu: "メニューを閉じる" },
  fr: { mainNav: "Navigation principale", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu" },
  ko: { mainNav: "메인 내비게이션", openMenu: "메뉴 열기", closeMenu: "메뉴 닫기" },
} as const;

type SectionProps = {
  link: ResolvedNavRoute;
  locale: string;
  pathname: string;
  active: boolean;
};

function NavDropdown({
  link, locale, pathname, active, open, onOpenChange, alignRight,
}: SectionProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alignRight: boolean;
}) {
  const id = useId();
  const ref = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const focusRequest = useRef<"first" | "last" | null>(null);
  const Icon = link.icon;

  useEffect(() => {
    if (!open) return;
    function handleOutside(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        clearTimeout(hoverTimeout.current);
        onOpenChange(false);
      }
    }
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open && focusRequest.current) {
      const items = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
      const target = focusRequest.current === "last" ? items?.[items.length - 1] : items?.[0];
      target?.focus();
      focusRequest.current = null;
    }
  }, [open]);

  useEffect(() => () => clearTimeout(hoverTimeout.current), []);

  function close() {
    clearTimeout(hoverTimeout.current);
    onOpenChange(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLLIElement>) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      close();
      triggerRef.current?.focus();
      return;
    }
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target === triggerRef.current && ["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      const position = event.key === "ArrowUp" ? "last" : "first";
      if (!open) {
        focusRequest.current = position;
        onOpenChange(true);
      } else {
        const items = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
        (position === "last" ? items?.[items.length - 1] : items?.[0])?.focus();
      }
      return;
    }
    if (!open || !panelRef.current?.contains(event.target as Node)) return;
    const items = Array.from(panelRef.current.querySelectorAll<HTMLAnchorElement>("a[href]"));
    const index = items.indexOf(event.target as HTMLAnchorElement);
    const next = event.key === "ArrowDown" ? (index + 1) % items.length
      : event.key === "ArrowUp" ? (index - 1 + items.length) % items.length
      : event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : -1;
    if (next >= 0) {
      event.preventDefault();
      items[next]?.focus();
    }
  }

  return (
    <li
      ref={ref}
      className="static xl:relative"
      data-nav-section={link.href}
      data-active={active || undefined}
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
      onMouseEnter={() => {
        if (!window.matchMedia("(hover: hover) and (min-width: 1280px)").matches) return;
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => onOpenChange(true), 80);
      }}
      onMouseLeave={() => {
        if (!window.matchMedia("(hover: hover) and (min-width: 1280px)").matches) return;
        clearTimeout(hoverTimeout.current);
        if (!ref.current?.contains(document.activeElement)) {
          hoverTimeout.current = setTimeout(() => onOpenChange(false), 200);
        }
      }}
    >
      <button
        ref={triggerRef}
        id={`${id}-trigger`}
        type="button"
        onClick={() => {
          clearTimeout(hoverTimeout.current);
          onOpenChange(!open);
        }}
        aria-expanded={open}
        aria-controls={`${id}-links`}
        className={`inline-flex min-h-9 shrink-0 items-center gap-1 whitespace-nowrap rounded-sm text-[0.8125rem] tracking-[0.005em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent 2xl:gap-1.5 2xl:text-[0.875rem] ${
          active ? "text-accent font-medium" : "text-foreground-muted hover:text-foreground"
        }`}
      >
        <Icon size={14} className="hidden xl:block" strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
        {link.label}
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <ul
        ref={panelRef}
        id={`${id}-links`}
        aria-labelledby={`${id}-trigger`}
        hidden={!open}
        className={`absolute top-full left-3 right-3 mt-1 max-h-[calc(100dvh-var(--site-header-height,4rem)-1rem)] overflow-y-auto overscroll-contain rounded-xl border border-card-border bg-background py-2 shadow-xl shadow-black/20 xl:mt-2 xl:w-80 xl:max-w-[calc(100vw-2rem)] ${alignRight ? "xl:left-auto xl:right-0" : "xl:left-0 xl:right-auto"}`}
      >
        {link.children?.map((child) => {
          const current = isNavPageCurrent(pathname, child.href);
          const ChildIcon = child.icon;
          return (
            <li key={child.href}>
              <Link
                href={`/${locale}${child.href}`}
                onClick={close}
                aria-current={current ? "page" : undefined}
                className={`flex items-start gap-3 px-4 py-2.5 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${
                  current ? "text-accent bg-accent/5" : "text-foreground-muted hover:text-foreground hover:bg-card-bg"
                }`}
              >
                <ChildIcon size={15} strokeWidth={current ? 2.2 : 1.8} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className={`text-[0.82rem] ${current ? "font-medium" : ""}`}>{child.label}</span>
                    {child.badge && <span className="text-[0.65rem] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-semibold leading-none">{child.badge}</span>}
                  </span>
                  {child.desc && <span className="block text-[0.72rem] text-foreground-muted/70 leading-snug mt-0.5">{child.desc}</span>}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

function NavigationContent({ locale, pathname }: { locale: string; pathname: string }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const links = getNavRoutes(locale);
  const home = getHomeRoute(locale);
  const HomeIcon = home.icon;
  const activeSection = getActiveNavSection(pathname);
  const homeCurrent = isNavPageCurrent(pathname, "");
  const navCopy = pickCopy(NAV_COPY, locale);

  useLayoutEffect(() => {
    const header = navRef.current;
    if (!header) return;
    const updateHeaderHeight = () => {
      const height = Math.ceil(header.getBoundingClientRect().height);
      if (height > 0) document.documentElement.style.setProperty("--site-header-height", `${height}px`);
    };
    updateHeaderHeight();
    const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(updateHeaderHeight);
    observer?.observe(header);
    window.addEventListener("resize", updateHeaderHeight);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, []);

  useEffect(() => {
    const initialUrl = window.location.href;
    let targetId: string;
    try {
      targetId = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    if (!targetId) return;

    let cancelled = false;
    let frame: number | undefined;
    const interactions = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    const detach = () => {
      interactions.forEach((event) => document.removeEventListener(event, cancel));
      window.removeEventListener("hashchange", cancel);
      document.removeEventListener("DOMContentLoaded", scheduleCheck);
    };
    function cancel() {
      cancelled = true;
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      detach();
    }
    function scheduleCheck() {
      if (cancelled) return;
      frame = window.requestAnimationFrame(() => {
        detach();
        if (cancelled || window.location.href !== initialUrl) return;
        const target = document.getElementById(targetId);
        const header = navRef.current;
        if (!target || !header) return;
        const headerHeight = Math.ceil(header.getBoundingClientRect().height);
        const rem = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
        const top = target.getBoundingClientRect().top;
        // Correct only a native fragment jump still obscured by the measured
        // header. Resizes and a reader's later scrolling never revisit the hash.
        if (headerHeight > 0 && top >= 0 && top < headerHeight + rem) {
          target.scrollIntoView({ block: "start", behavior: "instant" });
        }
      });
    }
    interactions.forEach((event) => document.addEventListener(event, cancel, { passive: true }));
    window.addEventListener("hashchange", cancel);
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", scheduleCheck, { once: true });
    } else {
      scheduleCheck();
    }
    return cancel;
  }, []);

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1280px)");
    const closeMenus = () => setOpenSection(null);
    breakpoint.addEventListener("change", closeMenus);
    return () => breakpoint.removeEventListener("change", closeMenus);
  }, []);

  return (
    <nav
      ref={navRef}
      data-site-header=""
      aria-label={navCopy.mainNav}
      className="sticky top-0 z-50 border-b border-border bg-nav-bg backdrop-blur-md"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpenSection(null);
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 px-4 sm:px-6 xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-x-4 xl:px-4 2xl:gap-x-6 2xl:px-6">
        <Link
          href={`/${locale}`}
          aria-label={`Extinction Field — ${home.label}`}
          aria-current={homeCurrent ? "page" : undefined}
          onClick={() => setOpenSection(null)}
          className="col-start-1 row-start-1 inline-flex min-h-14 shrink-0 items-center rounded-sm text-sm font-semibold uppercase leading-none tracking-[0.1em] text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent xl:min-h-16"
        >Extinction Field</Link>
        <ul className="col-span-2 col-start-1 row-start-2 flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-border py-2 sm:gap-x-3 xl:col-span-1 xl:col-start-2 xl:row-start-1 xl:justify-center xl:border-t-0 xl:py-0 2xl:gap-x-5" data-navigation="primary">
          <li>
            <Link
              href={`/${locale}`}
              aria-current={homeCurrent ? "page" : undefined}
              onClick={() => setOpenSection(null)}
              className={`inline-flex min-h-9 items-center gap-1 whitespace-nowrap rounded-sm text-[0.8125rem] tracking-[0.005em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent 2xl:text-[0.875rem] ${homeCurrent ? "text-accent font-medium" : "text-foreground-muted hover:text-foreground"}`}
            >
              <HomeIcon size={14} className="hidden xl:block" aria-hidden="true" />
              {home.label}
            </Link>
          </li>
          {links.map((link, index) => (
            <NavDropdown
              key={link.href}
              link={link}
              locale={locale}
              pathname={pathname}
              active={activeSection === link.href}
              open={openSection === link.href}
              onOpenChange={(open) => setOpenSection((current) => open ? link.href : current === link.href ? null : current)}
              alignRight={index >= links.length - 2}
            />
          ))}
        </ul>
        <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-self-end gap-1.5 xl:col-start-3 xl:border-l xl:border-border xl:pl-3 2xl:gap-2 2xl:pl-4">
          <SearchLink locale={locale} />
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export function Navigation({ locale }: { locale: string }) {
  const pathname = usePathname();
  // Remount disclosures on route changes; hash links close through onClick.
  return <NavigationContent key={`${locale}:${pathname}`} locale={locale} pathname={pathname} />;
}
