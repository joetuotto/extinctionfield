"use client";

import Link from "next/link";

const COPY = {
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
} as const;

export function SiteFooter({ locale, referenceCount }: { locale: string; referenceCount: number }) {
  const language = locale === "fi" ? "fi" : "en";
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
