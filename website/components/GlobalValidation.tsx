"use client";

import { useEffect, useState } from "react";
import {
  GLOBAL_TIER_ORDER,
  parseGlobalValidation,
  type GlobalTier,
  type GlobalValidationArtifact,
} from "@/lib/globalArtifacts";

type Locale = "en" | "fi";

const copy = {
  en: {
    title: "Global validation",
    description:
      "Published tiers and validation summaries for the expanded country panel. This section reports the artefact as released; tier membership is not a prediction, effect estimate, or causal conclusion.",
    loading: "Loading published global validation…",
    error: "The global validation artefact is not available yet. No global benchmark result is shown until it is published.",
    core: "Core 51 · locked",
    extended: "Extended",
    global: "Global",
    countries: "countries",
    tierTitle: "Pre-specified coverage tiers",
    tierNote:
      "Core 51 membership is locked before validation reporting. It is a coverage and governance boundary, not a performance-selected subset.",
    tierCounts: "Tier memberships can overlap, so these counts are not mutually exclusive.",
    scenarioTitle: "Published validation scenarios",
    noScenarios:
      "The artefact contains no published scenario summaries yet. The absence of a metric is not replaced with a model claim.",
    trainTest: "Train → test",
    countriesUsed: "Countries",
    status: "Core membership",
    artifact: "Artefact",
    locked: "Locked",
    notLocked: "Not marked locked",
  },
  fi: {
    title: "Globaali validointi",
    description:
      "Laajennetun maapaneelin julkaistut tasot ja validointiyhteenvedot. Osio raportoi artefaktin sellaisena kuin se on julkaistu; tasojäsenyys ei ole ennuste, vaikutusarvio eikä kausaalinen johtopäätös.",
    loading: "Ladataan julkaistua globaalia validointia…",
    error: "Globaalia validointiartifaktia ei ole vielä saatavilla. Globaalia benchmark-tulosta ei näytetä ennen julkaisua.",
    core: "Core 51 · lukittu",
    extended: "Laajennettu",
    global: "Globaali",
    countries: "maata",
    tierTitle: "Ennalta määritellyt kattavuustasot",
    tierNote:
      "Core 51 -jäsenyys lukitaan ennen validointiraportointia. Se on kattavuus- ja hallintoraja, ei suorituskyvyn perusteella valittu osajoukko.",
    tierCounts: "Tasojäsenyydet voivat olla päällekkäisiä, joten luvut eivät ole toisensa poissulkevia.",
    scenarioTitle: "Julkaistut validointiskenaariot",
    noScenarios:
      "Artefakti ei vielä sisällä julkaistuja skenaarioyhteenvetoja. Puuttuvaa mittaria ei korvata malliväitteellä.",
    trainTest: "Opetus → testi",
    countriesUsed: "Maat",
    status: "Core-jäsenyys",
    artifact: "Artefakti",
    locked: "Lukittu",
    notLocked: "Ei merkitty lukituksi",
  },
} as const;

function tierLabel(tier: GlobalTier, locale: Locale) {
  return copy[locale][tier];
}

export function GlobalValidation({ locale }: { locale: string }) {
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = copy[language];
  const [data, setData] = useState<GlobalValidationArtifact | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/global_validation.json", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Global validation artifact request failed");
        const parsed = parseGlobalValidation(await response.json());
        if (!parsed) throw new Error("Global validation artifact schema is invalid");
        setData(parsed);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setFailed(true);
      });
    return () => controller.abort();
  }, []);

  return (
    <section className="mb-10 rounded-xl border border-card-border bg-card-bg p-4 sm:p-6">
      <div className="mb-5 max-w-3xl">
        <h3 className="text-base font-semibold">{d.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{d.description}</p>
      </div>

      {failed ? (
        <p className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-3 text-sm text-foreground-muted">{d.error}</p>
      ) : !data ? (
        <p className="py-10 text-center text-sm text-foreground-muted">{d.loading}</p>
      ) : (
        <div className="space-y-7">
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-foreground-muted">
            {data.schema && <span>{d.artifact}: <span className="font-mono-num">{data.schema}</span></span>}
            {data.version && <span>v{data.version}</span>}
            <span>{d.status}: <span className="font-medium text-foreground">{data.locked ? d.locked : d.notLocked}</span></span>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">{d.tierTitle}</h4>
            <div className="grid gap-3 sm:grid-cols-3">
              {GLOBAL_TIER_ORDER.map((tier) => (
                <div key={tier} className="rounded-lg border border-card-border bg-background p-3">
                  <p className="text-xs text-foreground-muted">{tierLabel(tier, language)}</p>
                  <p className="mt-1 font-mono-num text-xl font-semibold">{data.tiers.countriesByTier[tier].length}</p>
                  <p className="text-xs text-foreground-muted">{d.countries}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 max-w-3xl text-xs leading-relaxed text-foreground-muted">{d.tierNote}</p>
            <p className="mt-1 max-w-3xl text-xs leading-relaxed text-foreground-muted">{d.tierCounts}</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">{d.scenarioTitle}</h4>
            {data.scenarios.length === 0 ? (
              <p className="rounded-lg border border-card-border bg-background p-3 text-sm text-foreground-muted">{d.noScenarios}</p>
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {data.scenarios.map((scenario) => (
                  <article key={scenario.key} className="rounded-lg border border-card-border bg-background p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h5 className="font-medium">{scenario.name}</h5>
                      {scenario.status && <span className="text-xs text-foreground-muted">{scenario.status}</span>}
                    </div>
                    {(scenario.trainStart !== undefined || scenario.testStart !== undefined) && (
                      <p className="mt-2 text-xs text-foreground-muted">
                        {d.trainTest}: {scenario.trainStart ?? "?"}–{scenario.trainEnd ?? "?"} → {scenario.testStart ?? "?"}–{scenario.testEnd ?? "?"}
                      </p>
                    )}
                    {scenario.countryCount !== undefined && (
                      <p className="mt-1 text-xs text-foreground-muted">{d.countriesUsed}: {scenario.countryCount}</p>
                    )}
                    <dl className="mt-4 grid grid-cols-2 gap-2">
                      {scenario.metrics.map((metric) => (
                        <div key={metric.label} className="rounded-md border border-card-border bg-card-bg p-2">
                          <dt className="text-[11px] leading-tight text-foreground-muted">{metric.label}</dt>
                          <dd className="mt-1 font-mono-num text-sm font-semibold">{metric.value.toFixed(3)}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
