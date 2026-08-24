"use client";

import { useEffect, useState } from "react";
import { GLOBAL_TIER_ORDER, type GlobalTier } from "@/lib/globalArtifacts";

type Locale = "en" | "fi";

interface PanelSummary {
  schema_version?: string;
  publication_type?: string;
  source_tiers?: {
    counts?: Partial<Record<GlobalTier, number>>;
  };
}

const copy = {
  en: {
    title: "Global panel data coverage",
    lead: "The published country panel documents the demographic and technology-timing data currently available for the BERM v17 research programme.",
    loading: "Loading panel metadata…",
    unavailable: "Panel metadata is unavailable. Please try again shortly.",
    artifact: "Publication format",
    schema: "Schema",
    tiers: "Coverage tiers in the published panel",
    countries: "countries",
    note: "Tier membership documents source coverage. FieldState availability, endpoints and effect estimates are recorded separately.",
    missing: "Next v2 data addition",
    missingText: "A national panel of measured FieldState inputs, traceable organ/couple endpoints and age-specific fertility outcomes collected on a compatible time axis.",
  },
  fi: {
    title: "Globaalin paneelin datakattavuus",
    lead: "Julkaistu maapaneeli dokumentoi BERM v17-tutkimusohjelmalle tällä hetkellä saatavilla olevan demografia- ja teknologia-ajoitusdatan.",
    loading: "Ladataan paneelin metatietoja…",
    unavailable: "Paneelin metatietoa ei ole saatavilla. Yritä hetken kuluttua uudelleen.",
    artifact: "Julkaisumuoto",
    schema: "Skeema",
    tiers: "Julkaistun paneelin kattavuustasot",
    countries: "maata",
    note: "Tasojäsenyys dokumentoi lähdekattavuutta. FieldState-saatavuus, päätepisteet ja vaikutusarviot kirjataan erikseen.",
    missing: "Seuraava v2-datalisäys",
    missingText: "Kansallinen paneeli mitatuista FieldState-syötteistä, jäljitettävistä elin-/paritason päätepisteistä ja ikäryhmäkohtaisista hedelmällisyystuloksista yhteensopivalla aika-akselilla.",
  },
} as const;

function tierLabel(tier: GlobalTier, locale: Locale) {
  const labels = locale === "fi"
    ? { core: "Ydin", extended: "Laajennettu", global: "Globaali" }
    : { core: "Core", extended: "Extended", global: "Global" };
  return labels[tier];
}

/** Shows public-panel provenance and data coverage for the v2-facing surface. */
export function GlobalValidation({ locale }: { locale: string }) {
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = copy[language];
  const [data, setData] = useState<PanelSummary | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/global_panel_summary.json", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Global panel summary request failed");
        const summary = await response.json() as PanelSummary;
        if (!summary.source_tiers?.counts) throw new Error("Global panel summary schema is invalid");
        setData(summary);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setFailed(true);
      });
    return () => controller.abort();
  }, []);

  return (
    <section className="max-w-4xl rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
      <h3 className="text-base font-semibold">{d.title}</h3>
      <p className="mt-1 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.lead}</p>

      {failed ? (
        <p className="mt-5 rounded-lg border border-status-partial/30 bg-status-partial/5 p-3 text-sm text-foreground-muted">{d.unavailable}</p>
      ) : !data ? (
        <p className="mt-5 py-6 text-center text-sm text-foreground-muted">{d.loading}</p>
      ) : (
        <>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-foreground-muted">
            {data.schema_version && <span>{d.schema}: <span className="font-mono-num">{data.schema_version}</span></span>}
            {data.publication_type && <span>{d.artifact}: <span className="font-mono-num">{data.publication_type}</span></span>}
          </div>
          <div className="mt-5">
            <h4 className="mb-3 text-sm font-semibold">{d.tiers}</h4>
            <div className="grid gap-3 sm:grid-cols-3">
              {GLOBAL_TIER_ORDER.map((tier) => (
                <div key={tier} className="rounded-lg border border-card-border bg-background p-3">
                  <p className="text-xs text-foreground-muted">{tierLabel(tier, language)}</p>
                  <p className="mt-1 font-mono-num text-xl font-semibold">{data.source_tiers?.counts?.[tier] ?? 0}</p>
                  <p className="text-xs text-foreground-muted">{d.countries}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-foreground-muted">{d.note}</p>
          </div>
        </>
      )}

      <div className="mt-5 rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">{d.missing}</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground-muted">{d.missingText}</p>
      </div>
    </section>
  );
}
