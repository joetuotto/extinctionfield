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
    title: "Global panel provenance and v2 validation boundary",
    lead: "The published country panel is available for data governance and descriptive coverage only. Its records are not a measured FieldState panel or FieldState–ASFR-v2 validation result.",
    loading: "Loading panel metadata…",
    unavailable: "Panel metadata is unavailable; no validation claim is substituted for it.",
    artifact: "Publication format",
    schema: "Schema",
    tiers: "Coverage tiers in the published panel",
    countries: "countries",
    note: "Tier membership describes data coverage only. It does not indicate model performance, FieldState availability, effect size or a causal conclusion.",
    missing: "What is still missing for v2",
    missingText: "A national panel of measured FieldState inputs, traceable organ/couple endpoints and age-specific fertility outcomes collected on a compatible time axis.",
  },
  fi: {
    title: "Globaalin paneelin provenienssi ja v2-validointiraja",
    lead: "Julkaistu maapaneeli on saatavilla datahallintaa ja kuvailevaa kattavuutta varten. Sen tietueet eivät ole mitattu FieldState-paneeli eivätkä FieldState–ASFR-v2:n validaatiotulos.",
    loading: "Ladataan paneelin metatietoja…",
    unavailable: "Paneelin metatietoa ei ole saatavilla; sen tilalle ei esitetä validointiväitettä.",
    artifact: "Julkaisumuoto",
    schema: "Skeema",
    tiers: "Julkaistun paneelin kattavuustasot",
    countries: "maata",
    note: "Tasojäsenyys kuvaa vain datan kattavuutta. Se ei ilmaise mallisuorituskykyä, FieldState-saatavuutta, vaikutuskokoa eikä kausaalista johtopäätöstä.",
    missing: "Mitä v2:sta vielä puuttuu",
    missingText: "Kansallinen paneeli mitatuista FieldState-syötteistä, jäljitettävistä elin-/paritason päätepisteistä ja ikäryhmäkohtaisista hedelmällisyystuloksista yhteensopivalla aika-akselilla.",
  },
} as const;

function tierLabel(tier: GlobalTier, locale: Locale) {
  const labels = locale === "fi"
    ? { core: "Ydin", extended: "Laajennettu", global: "Globaali" }
    : { core: "Core", extended: "Extended", global: "Global" };
  return labels[tier];
}

/**
 * Shows only public-panel provenance. The former v17 conditional-hindcast
 * payload is intentionally not fetched or rendered by a v2-facing surface.
 */
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
