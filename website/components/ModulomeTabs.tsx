"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = {
  en: [
    { href: "/modulome", label: "Overview" },
    { href: "/modulome/eye", label: "Eye" },
    { href: "/modulome/pituitary", label: "Pituitary" },
    { href: "/modulome/testes", label: "Testes" },
    { href: "/modulome/pancreas", label: "Pancreas" },
    { href: "/modulome/brain", label: "Brain" },
    { href: "/modulome/heart", label: "Heart" },
    { href: "/modulome/thyroid", label: "Thyroid" },
    { href: "/modulome/adrenal", label: "Adrenal" },
    { href: "/modulome/ear", label: "Inner Ear" },
    { href: "/modulome/pain", label: "Pain (DRG)" },
  ],
  fi: [
    { href: "/modulome", label: "Yleiskatsaus" },
    { href: "/modulome/eye", label: "Silmä" },
    { href: "/modulome/pituitary", label: "Aivolisäke" },
    { href: "/modulome/testes", label: "Kivekset" },
    { href: "/modulome/pancreas", label: "Haima" },
    { href: "/modulome/brain", label: "Aivot" },
    { href: "/modulome/heart", label: "Sydän" },
    { href: "/modulome/thyroid", label: "Kilpirauhanen" },
    { href: "/modulome/adrenal", label: "Lisämunuainen" },
    { href: "/modulome/ear", label: "Sisäkorva" },
    { href: "/modulome/pain", label: "Kipu (DRG)" },
  ],
} as const;

export function ModulomeTabs({ locale }: { locale: string }) {
  const pathname = usePathname();
  const tabs = locale === "fi" ? TABS.fi : TABS.en;

  return (
    <nav className="flex gap-1 border-b border-border mb-8 overflow-x-auto">
      {tabs.map((tab) => {
        const fullHref = `/${locale}${tab.href}`;
        const isActive =
          tab.href === "/modulome"
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
