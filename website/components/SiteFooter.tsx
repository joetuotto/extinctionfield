"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeModelVersion } from "@/lib/modelVersions";

const COPY = {
  en: {
    label: "FieldState–ASFR v2 · current research specification",
    summary: "A measurement-aware research specification. Mobile subscriptions are a timing proxy, not measured FieldState. Evidence records are bounded to causal nodes. TFR is derived from ASFR with biological and demographic terms kept separate.",
    noForecast: "No calibrated country-level TFR forecasts are published.",
    license: "Code: MIT · Docs: CC BY-4.0",
    specLink: "FieldState measurement spec",
  },
  fi: {
    label: "FieldState–ASFR v2 · nykyinen tutkimusmäärittely",
    summary: "Mittaustietoinen tutkimusmäärittely. Mobiililiittymät ovat ajoitusproksi, eivät mitattu FieldState. Evidenssitietueet on rajattu kausaalisolmuihin. TFR johdetaan ASFR:stä biologiset ja demografiset termit erillään.",
    noForecast: "Kalibroituja maakohtaisia TFR-ennusteita ei julkaista.",
    license: "Koodi: MIT · Docs: CC BY-4.0",
    specLink: "FieldState-mittausmäärittely",
  },
} as const;

export function SiteFooter({ locale }: { locale: string }) {
  const pathname = usePathname();
  const language = locale === "fi" ? "fi" : "en";
  const version = activeModelVersion(locale, pathname);
  const c = COPY[language];

  if (version === "berm-v18") return null;

  return (
    <footer className="border-t border-border py-6 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground-muted/70 mb-1.5">
            {c.label}
          </p>
          <p className="text-[0.8125rem] text-foreground-muted leading-relaxed">
            {c.summary} {c.noForecast}
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
