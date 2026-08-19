"use client";

import { useEffect, useState } from "react";

type Locale = "en" | "fi";

interface ErrorMetrics {
  rmse: number;
}

interface ScenarioScore {
  train_start: number;
  train_end: number;
  test_start: number;
  test_end: number;
  aggregate_berm: ErrorMetrics;
  aggregate_m0: ErrorMetrics;
}

interface FuturePredictionStatus {
  status: string;
  eligible_prospective_years: number[];
  already_observed_years: number[];
  rule: string;
  required_before_numeric_lock: string;
}

interface TemporalValidationData {
  scenarios: Record<string, ScenarioScore>;
  future_prediction_status: FuturePredictionStatus | null;
}

interface Props {
  locale: string;
}

const t = {
  en: {
    title: "Temporal validation and next prediction lock",
    description:
      "The historical results below are conditional hindcasts, not new prospective forecasts: later observed exposure covariates are supplied, while later TFR is held out from fitting.",
    loading: "Loading temporal validation status…",
    error:
      "The temporal validation artifact is not available. No numerical 2025–2030 prediction is claimed here.",
    split: "Train → test",
    berm: "BERM RMSE",
    m0: "M0 RMSE",
    lower: "Lower is better",
    status: "Next numerical lock",
    prospective: "Eligible prospective years",
    observed: "Already observed years",
    rule: "Rule",
    required: "Required before a numerical lock",
    noProspective:
      "No prospective numerical outcome is displayed until an external exposure scenario is versioned and locked.",
  },
  fi: {
    title: "Ajallinen validointi ja seuraava ennustelukitus",
    description:
      "Alla olevat historialliset tulokset ovat ehdollisia hindcasteja, eivät uusia prospektiivisia ennusteita: myöhempien vuosien havaitut altistuskovariaatit annetaan mallille, mutta myöhempi TFR pidetään poissa sovituksesta.",
    loading: "Ladataan ajallisen validoinnin tilaa…",
    error:
      "Ajallisen validoinnin aineistoa ei ole saatavilla. Tässä ei esitetä numeerista 2025–2030-ennustetta.",
    split: "Opetus → testi",
    berm: "BERM RMSE",
    m0: "M0 RMSE",
    lower: "Pienempi on parempi",
    status: "Seuraava numeerinen lukitus",
    prospective: "Kelvolliset prospektiiviset vuodet",
    observed: "Jo havaitut vuodet",
    rule: "Sääntö",
    required: "Vaaditaan ennen numeerista lukitusta",
    noProspective:
      "Prospektiivista numeerista tulosta ei näytetä ennen kuin ulkoinen altistusskenaario on versioitu ja lukittu.",
  },
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function parseScenario(value: unknown): ScenarioScore | null {
  if (!isRecord(value) || !isRecord(value.aggregate_berm) || !isRecord(value.aggregate_m0)) return null;
  if (
    !isFiniteNumber(value.train_start) ||
    !isFiniteNumber(value.train_end) ||
    !isFiniteNumber(value.test_start) ||
    !isFiniteNumber(value.test_end) ||
    !isFiniteNumber(value.aggregate_berm.rmse) ||
    !isFiniteNumber(value.aggregate_m0.rmse)
  ) {
    return null;
  }
  return {
    train_start: value.train_start,
    train_end: value.train_end,
    test_start: value.test_start,
    test_end: value.test_end,
    aggregate_berm: { rmse: value.aggregate_berm.rmse },
    aggregate_m0: { rmse: value.aggregate_m0.rmse },
  };
}

function parseYears(value: unknown): number[] | null {
  if (!Array.isArray(value) || value.some((year) => !isFiniteNumber(year))) return null;
  return value;
}

function parseFutureStatus(value: unknown): FuturePredictionStatus | null {
  if (!isRecord(value)) return null;
  const eligible = parseYears(value.eligible_prospective_years);
  const observed = parseYears(value.already_observed_years);
  if (
    typeof value.status !== "string" ||
    !eligible ||
    !observed ||
    typeof value.rule !== "string" ||
    typeof value.required_before_numeric_lock !== "string"
  ) {
    return null;
  }
  return {
    status: value.status,
    eligible_prospective_years: eligible,
    already_observed_years: observed,
    rule: value.rule,
    required_before_numeric_lock: value.required_before_numeric_lock,
  };
}

function parseTemporalValidationData(value: unknown): TemporalValidationData | null {
  if (!isRecord(value) || !isRecord(value.scenarios)) return null;
  const scenarios = Object.fromEntries(
    Object.entries(value.scenarios)
      .map(([key, scenario]) => [key, parseScenario(scenario)] as const)
      .filter((entry): entry is readonly [string, ScenarioScore] => entry[1] !== null),
  );
  if (Object.keys(scenarios).length === 0) return null;
  return {
    scenarios,
    future_prediction_status: parseFutureStatus(value.future_prediction_status),
  };
}

function formatYears(years: number[]) {
  if (years.length === 0) return "—";
  if (years.length === 1) return String(years[0]);
  const consecutive = years.every((year, index) => index === 0 || year === years[index - 1] + 1);
  return consecutive ? `${years[0]}–${years[years.length - 1]}` : years.join(", ");
}

function displayStatus(status: string) {
  return status.replaceAll("_", " ");
}

function RmseBars({ scenarios, label }: { scenarios: ScenarioScore[]; label: string }) {
  const width = 680;
  const rowHeight = 58;
  const height = 34 + scenarios.length * rowHeight;
  const maxValue = Math.max(...scenarios.flatMap((scenario) => [scenario.aggregate_berm.rmse, scenario.aggregate_m0.rmse]), 0.01);
  const left = 170;
  const availableWidth = width - left - 42;
  const barWidth = (value: number) => Math.max(1, (value / maxValue) * availableWidth);

  return (
    <figure className="data-figure mt-4 overflow-x-auto">
      <figcaption className="data-figure__caption">
        <span className="data-figure__title">{label}</span>
      </figcaption>
      <svg
        role="img"
        aria-label={label}
        className="h-auto min-w-[620px] w-full"
        viewBox={`0 0 ${width} ${height}`}
      >
        <title>{label}</title>
        {scenarios.map((scenario, index) => {
          const top = 22 + index * rowHeight;
          const split = `${scenario.train_start}–${scenario.train_end} → ${scenario.test_start}–${scenario.test_end}`;
          return (
            <g key={split}>
              <text x="0" y={top + 12} className="fill-foreground-muted text-[12px]">{split}</text>
              <rect x={left} y={top} width={barWidth(scenario.aggregate_berm.rmse)} height="12" rx="3" fill="#3B82F6" />
              <rect x={left} y={top + 18} width={barWidth(scenario.aggregate_m0.rmse)} height="12" rx="3" fill="#9CA3AF" />
              <text x={left + barWidth(scenario.aggregate_berm.rmse) + 6} y={top + 10} className="fill-foreground text-[11px]">{scenario.aggregate_berm.rmse.toFixed(3)}</text>
              <text x={left + barWidth(scenario.aggregate_m0.rmse) + 6} y={top + 28} className="fill-foreground text-[11px]">{scenario.aggregate_m0.rmse.toFixed(3)}</text>
            </g>
          );
        })}
      </svg>
      <div className="data-figure__legend mt-2 flex gap-4">
        <span className="flex items-center gap-1.5"><span aria-hidden="true" className="h-2 w-2 rounded-sm bg-accent" />BERM</span>
        <span className="flex items-center gap-1.5"><span aria-hidden="true" className="h-2 w-2 rounded-sm bg-gray-400" />M0</span>
      </div>
    </figure>
  );
}

export function TemporalPredictionStatus({ locale }: Props) {
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = t[language];
  const [data, setData] = useState<TemporalValidationData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/data/rolling_backtest.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Backtest artifact request failed");
        return response.json();
      })
      .then((payload: unknown) => {
        const parsed = parseTemporalValidationData(payload);
        if (!parsed) throw new Error("Backtest artifact schema is invalid");
        setData(parsed);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFailed(true);
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="mb-10 rounded-xl border border-card-border bg-card-bg p-4 sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight">{d.title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.description}</p>

      {failed ? (
        <p className="mt-4 text-sm text-status-refuted">{d.error}</p>
      ) : !data ? (
        <p className="mt-4 text-sm text-foreground-muted">{d.loading}</p>
      ) : (
        <>
          <RmseBars
            scenarios={Object.values(data.scenarios).sort((left, right) => left.train_end - right.train_end)}
            label={`${d.berm} / ${d.m0} — ${d.lower}`}
          />

          <div className="mt-5 rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold">{d.status}</h3>
              {data.future_prediction_status && (
                <span className="rounded-full border border-status-partial/30 px-2 py-0.5 text-xs font-medium text-status-partial">
                  {displayStatus(data.future_prediction_status.status)}
                </span>
              )}
            </div>
            {data.future_prediction_status ? (
              <dl className="mt-3 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-foreground-muted">{d.prospective}</dt>
                  <dd className="mt-0.5 font-mono-num">{formatYears(data.future_prediction_status.eligible_prospective_years)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-foreground-muted">{d.observed}</dt>
                  <dd className="mt-0.5 font-mono-num">{formatYears(data.future_prediction_status.already_observed_years)}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-foreground-muted">{d.rule}</dt>
                  <dd className="mt-0.5 leading-relaxed text-foreground-muted">{data.future_prediction_status.rule}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-foreground-muted">{d.required}</dt>
                  <dd className="mt-0.5 leading-relaxed text-foreground-muted">{data.future_prediction_status.required_before_numeric_lock}</dd>
                </div>
              </dl>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.noProspective}</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
