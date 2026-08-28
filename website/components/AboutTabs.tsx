"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pickCopy } from "@/lib/i18n";

const TABS: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: "/about", label: "Overview" },
    { href: "/about/objections", label: "Objections" },
    { href: "/about/replication", label: "Replication" },
    { href: "/about/history", label: "History" },
    { href: "/about/measurement", label: "Measurement" },
  ],
  fi: [
    { href: "/about", label: "Yleiskatsaus" },
    { href: "/about/objections", label: "Vastaväitteet" },
    { href: "/about/replication", label: "Replikaatio" },
    { href: "/about/history", label: "Historia" },
    { href: "/about/measurement", label: "Mittaus" },
  ],
  ja: [
    { href: "/about", label: "概要" },
    { href: "/about/objections", label: "反論" },
    { href: "/about/replication", label: "再現性" },
    { href: "/about/history", label: "歴史" },
    { href: "/about/measurement", label: "測定" },
  ],
  fr: [
    { href: "/about", label: "Vue d'ensemble" },
    { href: "/about/objections", label: "Objections" },
    { href: "/about/replication", label: "Réplication" },
    { href: "/about/history", label: "Histoire" },
    { href: "/about/measurement", label: "Mesure" },
  ],
  ko: [
    { href: "/about", label: "개요" },
    { href: "/about/objections", label: "반론" },
    { href: "/about/replication", label: "재현" },
    { href: "/about/history", label: "역사" },
    { href: "/about/measurement", label: "측정" },
  ],
};

export function AboutTabs({ locale }: { locale: string }) {
  const pathname = usePathname();
  const tabs = pickCopy(TABS, locale);

  return (
    <nav className="flex gap-1 border-b border-border mb-8 overflow-x-auto">
      {tabs.map((tab) => {
        const fullHref = `/${locale}${tab.href}`;
        const isActive =
          tab.href === "/about"
            ? pathname === fullHref || pathname === `${fullHref}/`
            : pathname.startsWith(fullHref);
        return (
          <Link
            key={tab.href}
            href={fullHref}
            className={`px-4 py-2 text-sm whitespace-nowrap border-b-2 transition-colors ${
              isActive
                ? "border-accent text-accent font-medium"
                : "border-transparent text-foreground-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
