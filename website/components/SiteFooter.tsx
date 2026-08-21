"use client";

import Link from "next/link";

const COPY = {
  en: {
    label: "BERM v19 · Bio-Electromagnetic Reproductive Model",
    summary: "Three-channel framework (ELF · IF · RF). 486 peer-reviewed references.",
    license: "Code: MIT · Docs: CC BY-4.0",
    specLink: "Model specification",
    author: "Otto Juote · MSc Biomedicine (LSE) · Independent research",
  },
  fi: {
    label: "BERM v19 · Bio-sähkömagneettinen lisääntymismalli",
    summary: "Kolmikanavakehys (ELF · IF · RF). 486 vertaisarvioitua viitettä.",
    license: "Koodi: MIT · Docs: CC BY-4.0",
    specLink: "Mallin määrittely",
    author: "Otto Juote · MSc Biomedicine (LSE) · Itsenäinen tutkimus",
  },
} as const;

export function SiteFooter({ locale }: { locale: string }) {
  const language = locale === "fi" ? "fi" : "en";
  const c = COPY[language];

  return (
    <footer className="border-t border-border py-6 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground-muted/70 mb-1.5">
            {c.label}
          </p>
          <p className="text-[0.8125rem] text-foreground-muted leading-relaxed">
            {c.summary}
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-1.5 sm:shrink-0">
          <Link
            href={`/${language}/model`}
            className="text-xs font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {c.specLink} →
          </Link>
          <p className="text-xs text-foreground-muted/60">{c.license}</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-4 pt-3 border-t border-border/50">
        <p className="text-xs text-foreground-muted/50">{c.author}</p>
      </div>
    </footer>
  );
}
