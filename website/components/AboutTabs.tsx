"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAboutRoutes, isNavPageCurrent } from "@/lib/navigation";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: { label: "About this project" },
  fi: { label: "Tietoa projektista" },
  ja: { label: "プロジェクトについて" },
  fr: { label: "À propos du projet" },
  ko: { label: "프로젝트 소개" },
};

export function AboutTabs({ locale }: { locale: string }) {
  const pathname = usePathname();
  const tabs = getAboutRoutes(locale);
  return (
    <nav aria-label={pickCopy(COPY, locale).label} className="flex gap-1 border-b border-border mb-8 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = isNavPageCurrent(pathname, tab.href);
        return (
          <Link
            key={tab.href}
            href={`/${locale}${tab.href}`}
            aria-current={isActive ? "page" : undefined}
            className={`px-4 py-2 text-sm whitespace-nowrap border-b-2 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${
              isActive ? "border-accent text-accent font-medium" : "border-transparent text-foreground-muted hover:text-foreground"
            }`}
          >{tab.label}</Link>
        );
      })}
    </nav>
  );
}
