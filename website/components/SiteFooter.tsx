"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";

const COPY: Record<string, {
  label: string;
  summary: (n: number) => string;
  license: string;
  specLink: string;
  author: string;
}> = {
  en: {
    label: "BERM v17 · Bio-Electromagnetic Reproductive Model",
    summary: (n: number) => `Three-channel framework (ELF · IF · RF). ${n} peer-reviewed references.`,
    license: "Code: MIT · Docs: CC BY-4.0",
    specLink: "Model specification",
    author: "Otto Juote · MSc Biomedicine (LSE) · Independent research",
  },
  fi: {
    label: "BERM v17 · Bio-sähkömagneettinen lisääntymismalli",
    summary: (n: number) => `Kolmikanavakehys (ELF · IF · RF). ${n} vertaisarvioitua viitettä.`,
    license: "Koodi: MIT · Dokumentaatio: CC BY-4.0",
    specLink: "Mallin määrittely",
    author: "Otto Juote · MSc Biomedicine (LSE) · Itsenäinen tutkimus",
  },
  ja: {
    label: "BERM v17 · 生体電磁気生殖モデル",
    summary: (n: number) => `3チャネルフレームワーク（ELF · IF · RF）。${n}件の査読済み文献。`,
    license: "コード: MIT · ドキュメント: CC BY-4.0",
    specLink: "モデル仕様",
    author: "Otto Juote · MSc Biomedicine (LSE) · 独立研究",
  },
  fr: {
    label: "BERM v17 · Modèle bio-électromagnétique de la reproduction",
    summary: (n: number) => `Cadre à trois canaux (ELF · IF · RF). ${n} références évaluées par des pairs.`,
    license: "Code : MIT · Docs : CC BY-4.0",
    specLink: "Spécification du modèle",
    author: "Otto Juote · MSc Biomedicine (LSE) · Recherche indépendante",
  },
  ko: {
    label: "BERM v17 · 생체전자기 생식 모델",
    summary: (n: number) => `3채널 프레임워크 (ELF · IF · RF). ${n}개의 동료심사 참고문헌.`,
    license: "코드: MIT · 문서: CC BY-4.0",
    specLink: "모델 사양",
    author: "Otto Juote · MSc Biomedicine (LSE) · 독립 연구",
  },
};

export function SiteFooter({ locale, referenceCount }: { locale: string; referenceCount: number }) {
  const language = (["fi", "ja", "fr", "ko"].includes(locale) ? locale : "en") as Locale;
  const c = COPY[language];

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-start gap-6">
        <div className="flex-1 min-w-0">
          <p className="editorial-kicker text-foreground-muted/70 mb-2">
            {c.label}
          </p>
          <p className="text-[0.8125rem] text-foreground-muted leading-relaxed">
            {c.summary(referenceCount)}
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2 sm:shrink-0">
          <Link
            href={`/${language}/model`}
            className="text-[0.8125rem] font-medium text-accent hover:text-accent-hover"
          >
            {c.specLink} →
          </Link>
          <p className="text-xs text-foreground-muted/60">{c.license}</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-6 pt-4 border-t border-border/40">
        <p className="text-xs text-foreground-muted/40 tracking-wide">{c.author}</p>
      </div>
    </footer>
  );
}
