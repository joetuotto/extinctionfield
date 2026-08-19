"use client";

import { useEffect, useState } from "react";

type Locale = "en" | "fi";

interface ErrorMetrics {
  rmse: number;
}

interface KernelSelection {
  family: string;
  kernel_parameters: Record<string, unknown>;
  lag_profile?: number[];
}

interface LagScore {
  family: string;
  berm: ErrorMetrics;
  m0: ErrorMetrics;
  berm_wins: number;
  m0_wins_or_ties: number;
}

interface Scenario {
  name: string;
  train_start: number;
  train_end: number;
  test_start: number;
  test_end: number;
  selected_kernel: KernelSelection;
  aggregate_berm: ErrorMetrics;
  aggregate_m0: ErrorMetrics;
  median_country_berm_rmse: number;
  median_country_m0_rmse: number;
  berm_wins: number;
  m0_wins_or_ties: number;
  conditional_hindcast: boolean;
}

interface SourceComparison {
  default_source?: string;
  interpretation?: string;
}

interface RollingBacktestData {
  version?: string;
  scenarios: Record<string, Scenario>;
  exposure_source_comparisons?: Record<string, SourceComparison>;
  lag_loocv?: Record<string, Record<string, LagScore>>;
}

interface Props {
  locale: string;
}

const t = {
  en: {
    title: "Historical temporal validation",
    desc: "Frozen train/test splits evaluate whether a model fitted before a cutoff predicts later observed TFR better than the same-country demographic baseline (M0). Lower RMSE is better.",
    loading: "Loading temporal backtest results…",
    error: "Temporal backtest results are not available. The published validation artifact could not be loaded.",
    scenario: "Train → test",
    berm: "BERM RMSE",
    m0: "M0 RMSE",
    lag: "Selected lag",
    source: "Exposure source",
    countryWins: "Country RMSE wins",
    conditional: "Conditional hindcast",
    caveat: "Where the selected source is external, later observed mobile and urban exposure values are supplied as conditional covariates; later TFR values are never used in fitting. These results are not ex-ante forecasts of future exposure or future TFR before exposure inputs are locked.",
    external: "External World Bank proxy",
    legacy: "Legacy endogenous exposure",
    externalDetail: "The external proxy met the pre-specified 105% source-comparison threshold for this split.",
    legacyDetail: "The external proxy missed the pre-specified 105% source-comparison threshold for this split; the legacy comparator is shown as the default alongside the source comparison.",
    cumulative: "Cumulative exposure",
    exponential: "Exponential decay",
    spline: "B-spline lag profile",
    cohort: "Cohort-age weighting",
    unknown: "Not reported",
    countries: "BERM {wins} · M0/tie {losses}",
    screenTitle: "Pre-specified temporal screen",
    screenRule: "Pass requires BERM to beat M0 in at least 2 of 3 outer scenarios and a median country RMSE ≤ 1.5 in the 2011–2024 test.",
    screenPass: "The current frozen run meets this screen.",
    screenNotPass: "The current frozen run does not meet this screen; the result remains published rather than being optimized away.",
    screenDetail: "BERM wins {wins}/3 outer scenarios · 2011–2024 median country RMSE {rmse}",
    lagComparison: "Nested lag comparison",
    lagComparisonDesc: "Country-held-out, training-only lag comparison; lower RMSE is better. It is a mechanism-selection diagnostic, separate from the outer historical test.",
    family: "Lag family",
    profile: "Selected lag profile",
    median: "Median country RMSE",
  },
  fi: {
    title: "Historiallinen ajallinen validointi",
    desc: "Lukitut opetus- ja testijaksot arvioivat, ennustaako ennen katkaisua sovitettu malli myöhemmän havaitun TFR:n saman maan demografista nollamallia (M0) paremmin. Pienempi RMSE on parempi.",
    loading: "Ladataan ajallisen backtestin tuloksia…",
    error: "Ajallisen backtestin tuloksia ei ole saatavilla. Julkaistua validointiaineistoa ei voitu ladata.",
    scenario: "Opetus → testi",
    berm: "BERM RMSE",
    m0: "M0 RMSE",
    lag: "Valittu viive",
    source: "Altistuslähde",
    countryWins: "Maakohtaiset RMSE-voitot",
    conditional: "Ehdollinen hindcast",
    caveat: "Kun valittu lähde on ulkoinen, myöhempien vuosien havaitut mobiili- ja kaupungistumisaltistukset annetaan ehdollisina kovariaatteina; myöhempiä TFR-arvoja ei käytetä sovituksessa. Tulokset eivät ole tulevan altistuksen tai tulevan TFR:n ex ante -ennusteita ennen kuin altistussyötteet on lukittu.",
    external: "Ulkoinen Maailmanpankki-proxy",
    legacy: "Vanha endogeeninen altistus",
    externalDetail: "Ulkoinen proxy täytti tälle jaolle ennalta määritellyn 105 %:n lähdevertailurajan.",
    legacyDetail: "Ulkoinen proxy ei täyttänyt tälle jaolle ennalta määriteltyä 105 %:n lähdevertailurajaa; vanha vertailupolku näytetään oletuksena lähdevertailun rinnalla.",
    cumulative: "Kumulatiivinen altistus",
    exponential: "Eksponentiaalinen vaimeneminen",
    spline: "B-spline-viiveprofiili",
    cohort: "Kohortti-ikäpainotus",
    unknown: "Ei raportoitu",
    countries: "BERM {wins} · M0/tasapeli {losses}",
    screenTitle: "Ennalta määritelty ajallinen seulonta",
    screenRule: "Hyväksyntä edellyttää, että BERM voittaa M0:n vähintään 2:ssa 3:sta ulommasta skenaariosta ja että mediaani maakohtainen RMSE on ≤ 1,5 testissä 2011–2024.",
    screenPass: "Nykyinen lukittu ajo täyttää tämän seulan.",
    screenNotPass: "Nykyinen lukittu ajo ei täytä tätä seulaa; tulos julkaistaan silti eikä sitä optimoida pois.",
    screenDetail: "BERM voittaa {wins}/3 ulompaa skenaariota · 2011–2024 mediaani maakohtainen RMSE {rmse}",
    lagComparison: "Sisäkkäinen viivevertailu",
    lagComparisonDesc: "Maakohtaisesti ulos jätetty, vain opetusjaksolla tehty viivevertailu; pienempi RMSE on parempi. Tämä on mekanismin valintadiagnostiikka, erillään ulommasta historiallisesta testistä.",
    family: "Viiveperhe",
    profile: "Valittu viiveprofiili",
    median: "Mediaani maakohtainen RMSE",
  },
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isScenario(value: unknown): value is Scenario {
  if (!isRecord(value) || !isRecord(value.selected_kernel)) return false;

  const berm = value.aggregate_berm;
  const m0 = value.aggregate_m0;
  return (
    typeof value.name === "string" &&
    isFiniteNumber(value.train_start) &&
    isFiniteNumber(value.train_end) &&
    isFiniteNumber(value.test_start) &&
    isFiniteNumber(value.test_end) &&
    typeof value.selected_kernel.family === "string" &&
    isRecord(value.selected_kernel.kernel_parameters) &&
    isRecord(berm) &&
    isRecord(m0) &&
    isFiniteNumber(berm.rmse) &&
    isFiniteNumber(m0.rmse) &&
    isFiniteNumber(value.median_country_berm_rmse) &&
    isFiniteNumber(value.median_country_m0_rmse) &&
    isFiniteNumber(value.berm_wins) &&
    isFiniteNumber(value.m0_wins_or_ties) &&
    typeof value.conditional_hindcast === "boolean"
  );
}

function parseData(value: unknown): RollingBacktestData | null {
  if (!isRecord(value) || !isRecord(value.scenarios)) return null;

  const scenarios = Object.fromEntries(
    Object.entries(value.scenarios).map(([key, scenario]) => {
      if (!isScenario(scenario)) return [key, null] as const;
      const profile = Array.isArray(scenario.selected_kernel.lag_profile)
        && scenario.selected_kernel.lag_profile.every(isFiniteNumber)
        ? scenario.selected_kernel.lag_profile
        : undefined;
      return [key, {
        ...scenario,
        selected_kernel: { ...scenario.selected_kernel, lag_profile: profile },
      }] as const;
    }).filter((entry) => entry[1] !== null) as Array<readonly [string, Scenario]>,
  ) as Record<string, Scenario>;
  if (Object.keys(scenarios).length === 0) return null;

  const sourceComparisons = isRecord(value.exposure_source_comparisons)
    ? Object.fromEntries(
        Object.entries(value.exposure_source_comparisons).map(([key, source]) => [
          key,
          isRecord(source)
            ? {
                default_source:
                  typeof source.default_source === "string" ? source.default_source : undefined,
                interpretation:
                  typeof source.interpretation === "string" ? source.interpretation : undefined,
              }
            : {},
        ]),
      )
    : undefined;

  const lagLoocv = isRecord(value.lag_loocv)
    ? Object.fromEntries(
        Object.entries(value.lag_loocv).map(([scenarioKey, scores]) => [
          scenarioKey,
          isRecord(scores)
            ? Object.fromEntries(
                Object.entries(scores).flatMap(([family, score]) => {
                  if (
                    !isRecord(score)
                    || !isRecord(score.berm)
                    || !isRecord(score.m0)
                    || typeof score.family !== "string"
                    || !isFiniteNumber(score.berm.rmse)
                    || !isFiniteNumber(score.m0.rmse)
                    || !isFiniteNumber(score.berm_wins)
                    || !isFiniteNumber(score.m0_wins_or_ties)
                  ) return [];
                  return [[family, {
                    family: score.family,
                    berm: { rmse: score.berm.rmse },
                    m0: { rmse: score.m0.rmse },
                    berm_wins: score.berm_wins,
                    m0_wins_or_ties: score.m0_wins_or_ties,
                  }] as const];
                }),
              ) as Record<string, LagScore>
            : {},
        ]),
      ) as Record<string, Record<string, LagScore>>
    : undefined;

  return {
    version: typeof value.version === "string" ? value.version : undefined,
    scenarios,
    exposure_source_comparisons: sourceComparisons,
    lag_loocv: lagLoocv,
  };
}

function sourceLabel(source: string | undefined, locale: Locale) {
  const d = t[locale];
  if (source === "external") return d.external;
  if (source === "endogenous_legacy") return d.legacy;
  return d.unknown;
}

function sourceDescription(source: string | undefined, locale: Locale) {
  if (source === "external") return t[locale].externalDetail;
  if (source === "endogenous_legacy") return t[locale].legacyDetail;
  return null;
}

function lagLabel(selection: KernelSelection, locale: Locale) {
  const d = t[locale];
  if (selection.family === "cum_emf") return d.cumulative;
  if (selection.family === "spline") return d.spline;
  if (selection.family === "cohort_age") return d.cohort;
  if (selection.family === "exp_decay") {
    const tau = selection.kernel_parameters.tau;
    return isFiniteNumber(tau)
      ? `${d.exponential} (τ ${tau.toFixed(1)} y)`
      : d.exponential;
  }
  return selection.family;
}

function familyLabel(family: string, locale: Locale) {
  return lagLabel({ family, kernel_parameters: {} }, locale);
}

function LagProfile({ profile, label }: { profile: number[] | undefined; label: string }) {
  if (!profile?.length) return null;
  const width = 360;
  const height = 86;
  const maximum = Math.max(...profile, 0.0001);
  const gap = 1;
  const barWidth = Math.max(1, (width - gap * (profile.length - 1)) / profile.length);
  return (
    <figure className="mt-3 overflow-x-auto">
      <figcaption className="mb-1 text-xs text-foreground-muted">{label}</figcaption>
      <svg role="img" aria-label={label} className="h-auto min-w-[360px]" viewBox={`0 0 ${width} ${height}`}>
        <title>{label}</title>
        {profile.map((weight, index) => {
          const barHeight = Math.max(1, (weight / maximum) * 56);
          return (
            <rect
              key={index}
              x={index * (barWidth + gap)}
              y={66 - barHeight}
              width={barWidth}
              height={barHeight}
              rx="1"
              fill="#3B82F6"
            />
          );
        })}
        <text x="0" y="82" className="fill-foreground-muted text-[10px]">0 y</text>
        <text x={width - 34} y="82" className="fill-foreground-muted text-[10px]">lag</text>
      </svg>
    </figure>
  );
}

function Metric({ label, value, emphasized }: { label: string; value: number; emphasized?: boolean }) {
  return (
    <div className={`rounded-lg border p-3 text-center ${emphasized ? "border-accent/40 bg-accent/5" : "border-card-border bg-card-bg"}`}>
      <p className="mb-1 text-xs text-foreground-muted">{label}</p>
      <p className="font-mono-num text-lg font-semibold">{value.toFixed(3)}</p>
    </div>
  );
}

export function RollingBacktestValidation({ locale }: Props) {
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = t[language];
  const [data, setData] = useState<RollingBacktestData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/data/rolling_backtest.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Backtest artifact request failed");
        return response.json();
      })
      .then((payload: unknown) => {
        const parsed = parseData(payload);
        if (!parsed) throw new Error("Backtest artifact schema is invalid");
        setData(parsed);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setFailed(true);
      });

    return () => controller.abort();
  }, []);

  if (failed) {
    return (
      <div className="mb-10 rounded-lg border border-red-500/30 bg-red-500/5 p-3 max-w-4xl">
        <p className="text-sm text-status-refuted">{d.error}</p>
      </div>
    );
  }

  if (!data) {
    return <p className="mb-10 text-sm text-foreground-muted">{d.loading}</p>;
  }

  const scenarios = Object.entries(data.scenarios).sort(
    ([, left], [, right]) => left.train_end - right.train_end,
  );
  const outerWins = scenarios.filter(([, scenario]) => scenario.aggregate_berm.rmse < scenario.aggregate_m0.rmse).length;
  const fourteenYearScenario = scenarios.find(([, scenario]) => scenario.test_end - scenario.test_start + 1 === 14)?.[1];
  const screenPasses = outerWins >= 2 && (fourteenYearScenario?.median_country_berm_rmse ?? Infinity) <= 1.5;
  const screenDetail = d.screenDetail
    .replace("{wins}", String(outerWins))
    .replace("{rmse}", fourteenYearScenario ? fourteenYearScenario.median_country_berm_rmse.toFixed(3) : d.unknown);

  return (
    <div className="mb-10">
      <h3 className="mb-2 text-base font-semibold">{d.title}</h3>
      <p className="mb-4 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.desc}</p>

      <div className="mb-4 max-w-4xl rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground-muted">{d.conditional}</p>
        <p className="text-xs leading-relaxed text-foreground-muted">{d.caveat}</p>
      </div>

      <div className={`mb-4 max-w-4xl rounded-lg border p-3 ${screenPasses ? "border-green-500/30 bg-green-500/5" : "border-status-partial/30 bg-status-partial/5"}`}>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground-muted">{d.screenTitle}</p>
        <p className="text-xs leading-relaxed text-foreground-muted">{d.screenRule}</p>
        <p className={`mt-2 text-sm font-medium ${screenPasses ? "text-status-confirmed" : "text-status-partial"}`}>{screenPasses ? d.screenPass : d.screenNotPass}</p>
        <p className="mt-1 font-mono-num text-xs text-foreground-muted">{screenDetail}</p>
      </div>

      <div className="space-y-4 max-w-4xl">
        {scenarios.map(([key, scenario]) => {
          const source = data.exposure_source_comparisons?.[key];
          const bermLeads = scenario.aggregate_berm.rmse < scenario.aggregate_m0.rmse;
          const countryResults = d.countries
            .replace("{wins}", String(scenario.berm_wins))
            .replace("{losses}", String(scenario.m0_wins_or_ties));
          const lagScores = Object.values(data.lag_loocv?.[key] ?? {}).sort(
            (left, right) => left.berm.rmse - right.berm.rmse,
          );

          return (
            <article key={key} className="rounded-lg border border-card-border bg-card-bg p-4">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div>
                  <p className="text-xs text-foreground-muted">{d.scenario}</p>
                  <h4 className="font-semibold">
                    {scenario.train_start}–{scenario.train_end} → {scenario.test_start}–{scenario.test_end}
                  </h4>
                </div>
                <span className="text-xs text-foreground-muted">{scenario.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Metric label={d.berm} value={scenario.aggregate_berm.rmse} emphasized={bermLeads} />
                <Metric label={d.m0} value={scenario.aggregate_m0.rmse} emphasized={!bermLeads} />
                <div className="rounded-lg border border-card-border bg-card-bg p-3">
                  <p className="mb-1 text-xs text-foreground-muted">{d.lag}</p>
                  <p className="text-sm font-medium leading-snug">{lagLabel(scenario.selected_kernel, language)}</p>
                </div>
                <div className="rounded-lg border border-card-border bg-card-bg p-3">
                  <p className="mb-1 text-xs text-foreground-muted">{d.source}</p>
                  <p className="text-sm font-medium leading-snug">{sourceLabel(source?.default_source, language)}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-foreground-muted">
                <span>
                  {d.countryWins}: <span className="font-mono-num text-foreground">{countryResults}</span>
                </span>
                {sourceDescription(source?.default_source, language) && (
                  <span className="max-w-2xl">{sourceDescription(source?.default_source, language)}</span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-foreground-muted">
                <span>{d.median}: <span className="font-mono-num text-foreground">{scenario.median_country_berm_rmse.toFixed(3)} / {scenario.median_country_m0_rmse.toFixed(3)}</span></span>
              </div>

              <LagProfile profile={scenario.selected_kernel.lag_profile} label={d.profile} />

              {lagScores.length > 0 && (
                <details className="mt-3 rounded-lg border border-card-border p-3">
                  <summary className="cursor-pointer text-sm font-medium">{d.lagComparison}</summary>
                  <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{d.lagComparisonDesc}</p>
                  <div className="mt-2 overflow-x-auto">
                    <table className="w-full min-w-[360px] text-xs">
                      <thead>
                        <tr className="border-b border-card-border text-left text-foreground-muted">
                          <th className="py-1.5 pr-3 font-medium">{d.family}</th>
                          <th className="py-1.5 pr-3 text-right font-medium">{d.berm}</th>
                          <th className="py-1.5 text-right font-medium">{d.m0}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lagScores.map((score) => (
                          <tr key={score.family} className="border-b border-card-border last:border-0">
                            <td className="py-1.5 pr-3">{familyLabel(score.family, language)}</td>
                            <td className="py-1.5 pr-3 text-right font-mono-num">{score.berm.rmse.toFixed(3)}</td>
                            <td className="py-1.5 text-right font-mono-num">{score.m0.rmse.toFixed(3)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
