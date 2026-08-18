"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = {
  en: [
    { href: "/about", label: "Overview" },
    { href: "/about/objections", label: "Objections" },
    { href: "/about/replication", label: "Replication" },
    { href: "/about/history", label: "History" },
  ],
  fi: [
    { href: "/about", label: "Yleiskatsaus" },
    { href: "/about/objections", label: "Vastaväitteet" },
    { href: "/about/replication", label: "Replikaatio" },
    { href: "/about/history", label: "Historia" },
  ],
} as const;

export function AboutTabs({ locale }: { locale: string }) {
  const pathname = usePathname();
  const tabs = locale === "fi" ? TABS.fi : TABS.en;

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
