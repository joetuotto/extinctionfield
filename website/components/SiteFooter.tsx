"use client";

import Link from "next/link";

const COPY = {
  en: {
    label: "BERM v19 · Bio-Electromagnetic Reproductive Model",
    summary: "A falsifiable research model. FieldState is what we measure. The three-channel model is how we predict. The modulome is where it acts. Mobile subscriptions are a timing proxy, not measured FieldState.",
    license: "Code: MIT · Docs: CC BY-4.0",
    specLink: "FieldState measurement spec",
  },
  fi: {
    label: "BERM v19 · Bio-sähkömagneettinen lisääntymismalli",
    summary: "Falsifioitavissa oleva tutkimusmalli. FieldState on se mitä mitataan. Kolmikanavamalli on se miten ennustetaan. Modulooma on se mihin vaikutus kohdistuu. Mobiililiittymät ovat ajoitusproksi, eivät mitattu FieldState.",
    license: "Koodi: MIT · Docs: CC BY-4.0",
    specLink: "FieldState-mittausmäärittely",
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
            href={`/${language}/model/fieldstate`}
            className="text-xs font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {c.specLink} →
          </Link>
          <p className="text-xs text-foreground-muted/60">{c.license}</p>
        </div>
      </div>
    </footer>
  );
}
