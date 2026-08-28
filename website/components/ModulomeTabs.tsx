"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pickCopy } from "@/lib/i18n";

const TABS: Record<string, { href: string; label: string }[]> = {
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
  ja: [
    { href: "/modulome", label: "概要" },
    { href: "/modulome/eye", label: "眼" },
    { href: "/modulome/pituitary", label: "下垂体" },
    { href: "/modulome/testes", label: "精巣" },
    { href: "/modulome/pancreas", label: "膵臓" },
    { href: "/modulome/brain", label: "脳" },
    { href: "/modulome/heart", label: "心臓" },
    { href: "/modulome/thyroid", label: "甲状腺" },
    { href: "/modulome/adrenal", label: "副腎" },
    { href: "/modulome/ear", label: "内耳" },
    { href: "/modulome/pain", label: "疼痛 (DRG)" },
  ],
  fr: [
    { href: "/modulome", label: "Vue d'ensemble" },
    { href: "/modulome/eye", label: "Œil" },
    { href: "/modulome/pituitary", label: "Hypophyse" },
    { href: "/modulome/testes", label: "Testicules" },
    { href: "/modulome/pancreas", label: "Pancréas" },
    { href: "/modulome/brain", label: "Cerveau" },
    { href: "/modulome/heart", label: "Cœur" },
    { href: "/modulome/thyroid", label: "Thyroïde" },
    { href: "/modulome/adrenal", label: "Surrénale" },
    { href: "/modulome/ear", label: "Oreille interne" },
    { href: "/modulome/pain", label: "Douleur (DRG)" },
  ],
  ko: [
    { href: "/modulome", label: "개요" },
    { href: "/modulome/eye", label: "눈" },
    { href: "/modulome/pituitary", label: "뇌하수체" },
    { href: "/modulome/testes", label: "고환" },
    { href: "/modulome/pancreas", label: "췌장" },
    { href: "/modulome/brain", label: "뇌" },
    { href: "/modulome/heart", label: "심장" },
    { href: "/modulome/thyroid", label: "갑상선" },
    { href: "/modulome/adrenal", label: "부신" },
    { href: "/modulome/ear", label: "내이" },
    { href: "/modulome/pain", label: "통증 (DRG)" },
  ],
};

export function ModulomeTabs({ locale }: { locale: string }) {
  const pathname = usePathname();
  const tabs = pickCopy(TABS, locale);

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
