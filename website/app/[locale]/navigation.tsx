"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useId, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
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
      className="relative"
      data-nav-section={link.href}
      data-active={active || undefined}
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
      onMouseEnter={() => {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => onOpenChange(true), 80);
      }}
      onMouseLeave={() => {
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
          active ? "text-accent font-medium nav-active-link" : "text-foreground-muted hover:text-foreground"
        }`}
      >
        <Icon size={14} strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
        {link.label}
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <ul
        ref={panelRef}
        id={`${id}-links`}
        aria-labelledby={`${id}-trigger`}
        hidden={!open}
        className={`absolute top-full mt-2 max-h-[calc(100dvh-5.5rem)] w-80 max-w-[calc(100vw-2rem)] overflow-y-auto overscroll-contain rounded-xl border border-card-border bg-background py-2 shadow-xl shadow-black/20 ${alignRight ? "right-0" : "left-0"}`}
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

function MobileAccordion({ link, locale, pathname, active, onNavigate }: SectionProps & { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(active);
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const Icon = link.icon;
  return (
    <li
      data-nav-section={link.href}
      data-active={active || undefined}
      onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) {
          event.preventDefault();
          event.stopPropagation();
          setExpanded(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        id={`${id}-trigger`}
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls={`${id}-links`}
        className={`flex min-h-11 w-full items-center justify-between rounded-sm py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-accent ${active ? "text-accent font-medium" : "text-foreground-muted"}`}
      >
        <span className="inline-flex items-center gap-2.5">
          <Icon size={16} strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
          {link.label}
        </span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <ul id={`${id}-links`} aria-labelledby={`${id}-trigger`} hidden={!expanded} className="pl-7 pb-2 space-y-1">
        {link.children?.map((child) => {
          const current = isNavPageCurrent(pathname, child.href);
          const ChildIcon = child.icon;
          return (
            <li key={child.href}>
              <Link
                href={`/${locale}${child.href}`}
                onClick={onNavigate}
                aria-current={current ? "page" : undefined}
                className={`flex min-h-11 items-center gap-2 rounded-sm py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-accent ${current ? "text-accent font-medium" : "text-foreground-muted hover:text-foreground"}`}
              >
                <ChildIcon size={14} className="shrink-0" strokeWidth={current ? 2.2 : 1.8} aria-hidden="true" />
                {child.label}
                {child.badge && <span className="text-[0.65rem] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-semibold leading-none">{child.badge}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

function NavigationContent({ locale, pathname }: { locale: string; pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileFocusRequest = useRef(false);
  const mobileId = useId();
  const links = getNavRoutes(locale);
  const home = getHomeRoute(locale);
  const activeSection = getActiveNavSection(pathname);
  const navCopy = pickCopy(NAV_COPY, locale);

  useEffect(() => {
    if (menuOpen && mobileFocusRequest.current) {
      mobilePanelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      mobileFocusRequest.current = false;
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleOutside(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [menuOpen]);

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1280px)");
    const closeMenus = () => {
      setMenuOpen(false);
      setOpenSection(null);
    };
    breakpoint.addEventListener("change", closeMenus);
    return () => breakpoint.removeEventListener("change", closeMenus);
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label={navCopy.mainNav}
      className="sticky top-0 z-50 border-b border-border bg-nav-bg backdrop-blur-md"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          event.preventDefault();
          setMenuOpen(false);
          mobileTriggerRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setMenuOpen(false);
          setOpenSection(null);
        }
      }}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:gap-8 sm:px-6 xl:max-w-7xl xl:gap-4 xl:px-4 2xl:gap-8 2xl:px-6">
        <Link
          href={`/${locale}`}
          aria-label={`Extinction Field — ${home.label}`}
          aria-current={isNavPageCurrent(pathname, "") ? "page" : undefined}
          onClick={() => { setMenuOpen(false); setOpenSection(null); }}
          className="shrink-0 rounded-sm text-sm font-semibold uppercase leading-none tracking-[0.1em] text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >Extinction Field</Link>
        <div className="hidden min-w-0 items-center gap-3 xl:flex 2xl:gap-5" data-navigation="desktop">
          <ul className="flex min-w-0 items-center gap-3 2xl:gap-6">
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
          <div className="ml-1 flex shrink-0 items-center gap-1.5 border-l border-border pl-3 2xl:ml-2 2xl:gap-2 2xl:pl-4">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
          <button
            ref={mobileTriggerRef}
            type="button"
            className="p-2 rounded-sm text-foreground-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
            onClick={() => setMenuOpen(!menuOpen)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                if (menuOpen) mobilePanelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
                else { mobileFocusRequest.current = true; setMenuOpen(true); }
              }
            }}
            aria-label={menuOpen ? navCopy.closeMenu : navCopy.openMenu}
            aria-expanded={menuOpen}
            aria-controls={mobileId}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {menuOpen ? <><line x1="4" y1="4" x2="16" y2="16" /><line x1="16" y1="4" x2="4" y2="16" /></> : <><line x1="3" y1="5" x2="17" y2="5" /><line x1="3" y1="10" x2="17" y2="10" /><line x1="3" y1="15" x2="17" y2="15" /></>}
            </svg>
          </button>
        </div>
      </div>
      <div id={mobileId} ref={mobilePanelRef} hidden={!menuOpen} className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-border bg-background xl:hidden" data-navigation="mobile">
        {menuOpen && <ul className="px-6 py-4 space-y-1">
          {links.map((link) => <MobileAccordion key={link.href} link={link} locale={locale} pathname={pathname} active={activeSection === link.href} onNavigate={() => setMenuOpen(false)} />)}
        </ul>}
      </div>
    </nav>
  );
}

export function Navigation({ locale }: { locale: string }) {
  const pathname = usePathname();
  // Remount disclosures on route changes; hash links close through onClick.
  return <NavigationContent key={`${locale}:${pathname}`} locale={locale} pathname={pathname} />;
}
