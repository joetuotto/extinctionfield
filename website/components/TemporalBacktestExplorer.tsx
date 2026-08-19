"use client";

import { useEffect, useState } from "react";

type Locale = "en" | "fi";

interface ErrorMetrics {
  rmse: number;
}

interface BacktestRow {
  year: number;
  observed_tfr: number;
  berm_predicted_tfr: number;
  m0_predicted_tfr: number;
}

interface CountryResult {
  country: string;
  iso3: string;
  berm: ErrorMetrics;
  m0: ErrorMetrics;
  rows: BacktestRow[];
}

interface Scenario {
  name: string;
  train_start: number;
  train_end: number;
  test_start: number;
  test_end: number;
  country_results: Record<string, CountryResult>;
}

interface BacktestData {
  scenarios: Record<string, Scenario>;
}

interface Props {
  locale: string;
}

const t = {
  en: {
    title: "Historical backtest explorer",
    description:
      "Inspect the frozen train/test result for one country. The lines show observed TFR and predictions made after the selected training cutoff.",
    loading: "Loading historical backtest data…",
    error:
      "Historical backtest data could not be loaded. No result is shown until the published artifact is available.",
    scenario: "Train → test split",
    country: "Country",
    observed: "Observed TFR",
    berm: "BERM prediction",
    m0: "M0 baseline",
    bermRmse: "BERM RMSE",
    m0Rmse: "M0 RMSE",
    outcome: "Lower RMSE is better",
    chart: "Observed, BERM, and M0 TFR over the selected test period",
    table: "Year-by-year values",
    year: "Year",
    noCountry: "No valid country-level rows are available for this split.",
    conditional:
      "Conditional hindcast: later observed mobile and urban exposure values are supplied as external covariates. Later TFR values are not used in fitting; this is not a prospectively locked forecast of future exposure.",
  },
  fi: {
    title: "Historiallisen backtestin tutkija",
    description:
      "Tarkastele yhden maan lukittua opetus–testi-tulosta. Viivat näyttävät havaitun TFR:n ja valitun opetuskatkaisun jälkeen tehdyt ennusteet.",
    loading: "Ladataan historiallisen backtestin aineistoa…",
    error:
      "Historiallisen backtestin aineistoa ei voitu ladata. Tulosta ei näytetä ennen kuin julkaistu aineisto on saatavilla.",
    scenario: "Opetus → testi -jako",
    country: "Maa",
    observed: "Havaittu TFR",
    berm: "BERM-ennuste",
    m0: "M0-perusura",
    bermRmse: "BERM RMSE",
    m0Rmse: "M0 RMSE",
    outcome: "Pienempi RMSE on parempi",
    chart: "Havaittu, BERM ja M0 valitulla testijaksolla",
    table: "Arvot vuosittain",
    year: "Vuosi",
    noCountry: "Tälle jaolle ei ole käytettävissä kelvollisia maakohtaisia rivejä.",
    conditional:
      "Ehdollinen hindcast: myöhempien vuosien havaitut mobiili- ja kaupungistumisaltistukset annetaan ulkoisina kovariaatteina. Myöhempiä TFR-arvoja ei käytetä sovituksessa; tämä ei ole tulevan altistuksen prospektiivisesti lukittu ennuste.",
  },
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function parseMetrics(value: unknown): ErrorMetrics | null {
  return isRecord(value) && isFiniteNumber(value.rmse) ? { rmse: value.rmse } : null;
}

function parseRows(value: unknown): BacktestRow[] | null {
  if (!Array.isArray(value)) return null;

  const rows = value.flatMap((row) => {
    if (
      !isRecord(row) ||
      !isFiniteNumber(row.year) ||
      !isFiniteNumber(row.observed_tfr) ||
      !isFiniteNumber(row.berm_predicted_tfr) ||
      !isFiniteNumber(row.m0_predicted_tfr)
    ) {
      return [];
    }
    return [{
      year: row.year,
      observed_tfr: row.observed_tfr,
      berm_predicted_tfr: row.berm_predicted_tfr,
      m0_predicted_tfr: row.m0_predicted_tfr,
    }];
  });

  return rows.length > 0 ? rows.sort((left, right) => left.year - right.year) : null;
}

function parseCountryResult(value: unknown): CountryResult | null {
  if (!isRecord(value) || typeof value.country !== "string" || typeof value.iso3 !== "string") {
    return null;
  }
  const berm = parseMetrics(value.berm);
  const m0 = parseMetrics(value.m0);
  const rows = parseRows(value.rows);
  if (!berm || !m0 || !rows) return null;
  return { country: value.country, iso3: value.iso3, berm, m0, rows };
}

function parseScenario(value: unknown): Scenario | null {
  if (
    !isRecord(value) ||
    typeof value.name !== "string" ||
    !isFiniteNumber(value.train_start) ||
    !isFiniteNumber(value.train_end) ||
    !isFiniteNumber(value.test_start) ||
    !isFiniteNumber(value.test_end) ||
    !isRecord(value.country_results)
  ) {
    return null;
  }

  const countryResults = Object.fromEntries(
    Object.entries(value.country_results)
      .map(([key, result]) => [key, parseCountryResult(result)] as const)
      .filter((entry): entry is readonly [string, CountryResult] => entry[1] !== null),
  );
  return {
    name: value.name,
    train_start: value.train_start,
    train_end: value.train_end,
    test_start: value.test_start,
    test_end: value.test_end,
    country_results: countryResults,
  };
}

function parseBacktestData(value: unknown): BacktestData | null {
  if (!isRecord(value) || !isRecord(value.scenarios)) return null;
  const scenarios = Object.fromEntries(
    Object.entries(value.scenarios)
      .map(([key, scenario]) => [key, parseScenario(scenario)] as const)
      .filter((entry): entry is readonly [string, Scenario] => entry[1] !== null),
  );
  return Object.keys(scenarios).length > 0 ? { scenarios } : null;
}

function displayCountry(country: string) {
  return country.replace(/([a-z])([A-Z])/g, "$1 $2");
}

function LineLegend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span aria-hidden="true" className="h-0.5 w-5 rounded" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function TemporalLineChart({ rows, label }: { rows: BacktestRow[]; label: string }) {
  const width = 720;
  const height = 260;
  const margin = { top: 18, right: 18, bottom: 34, left: 42 };
  const allValues = rows.flatMap((row) => [row.observed_tfr, row.berm_predicted_tfr, row.m0_predicted_tfr]);
  const valueMin = Math.min(...allValues);
  const valueMax = Math.max(...allValues);
  const padding = Math.max(0.1, (valueMax - valueMin) * 0.12);
  const minY = Math.max(0, valueMin - padding);
  const maxY = valueMax + padding;
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const x = (index: number) =>
    margin.left + (rows.length < 2 ? plotWidth / 2 : (index / (rows.length - 1)) * plotWidth);
  const y = (value: number) => margin.top + ((maxY - value) / (maxY - minY || 1)) * plotHeight;
  const pathFor = (accessor: (row: BacktestRow) => number) =>
    rows.map((row, index) => `${index === 0 ? "M" : "L"}${x(index)} ${y(accessor(row))}`).join(" ");
  const ticks = Array.from({ length: 4 }, (_, index) => minY + ((maxY - minY) * index) / 3);
  const xLabels = rows.length <= 6
    ? rows.map((row, index) => ({ index, year: row.year }))
    : [
        { index: 0, year: rows[0].year },
        { index: Math.round((rows.length - 1) / 2), year: rows[Math.round((rows.length - 1) / 2)].year },
        { index: rows.length - 1, year: rows[rows.length - 1].year },
      ];

  return (
    <svg
      role="img"
      aria-label={label}
      className="h-auto w-full overflow-visible"
      viewBox={`0 0 ${width} ${height}`}
    >
      <title>{label}</title>
      <desc>Line chart with observed total fertility rate, BERM prediction, and M0 baseline.</desc>
      {ticks.map((tick) => (
        <g key={tick}>
          <line
            x1={margin.left}
            x2={width - margin.right}
            y1={y(tick)}
            y2={y(tick)}
            stroke="currentColor"
            className="text-card-border"
            strokeDasharray="2 3"
          />
          <text
            x={margin.left - 8}
            y={y(tick) + 4}
            textAnchor="end"
            className="fill-foreground-muted text-[11px]"
          >
            {tick.toFixed(1)}
          </text>
        </g>
      ))}
      {xLabels.map(({ index, year }) => (
        <text
          key={`${index}-${year}`}
          x={x(index)}
          y={height - 8}
          textAnchor="middle"
          className="fill-foreground-muted text-[11px]"
        >
          {year}
        </text>
      ))}
      <path d={pathFor((row) => row.m0_predicted_tfr)} fill="none" stroke="#9CA3AF" strokeWidth="2" />
      <path d={pathFor((row) => row.berm_predicted_tfr)} fill="none" stroke="#3B82F6" strokeWidth="2.5" />
      <path d={pathFor((row) => row.observed_tfr)} fill="none" stroke="#F59E0B" strokeWidth="2.5" />
      {rows.map((row, index) => (
        <circle key={row.year} cx={x(index)} cy={y(row.observed_tfr)} r="2.5" fill="#F59E0B" />
      ))}
    </svg>
  );
}

export function TemporalBacktestExplorer({ locale }: Props) {
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = t[language];
  const [data, setData] = useState<BacktestData | null>(null);
  const [failed, setFailed] = useState(false);
  const [scenarioKey, setScenarioKey] = useState("");
  const [countryKey, setCountryKey] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch("/data/rolling_backtest.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Backtest artifact request failed");
        return response.json();
      })
      .then((payload: unknown) => {
        const parsed = parseBacktestData(payload);
        if (!parsed) throw new Error("Backtest artifact schema is invalid");
        const firstScenarioKey = Object.entries(parsed.scenarios).sort(
          ([, left], [, right]) => left.train_end - right.train_end,
        )[0]?.[0];
        if (!firstScenarioKey) throw new Error("No scenarios in backtest artifact");
        const firstCountryKey = Object.keys(parsed.scenarios[firstScenarioKey].country_results).sort()[0] ?? "";
        setData(parsed);
        setScenarioKey(firstScenarioKey);
        setCountryKey(firstCountryKey);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFailed(true);
      });

    return () => controller.abort();
  }, []);

  if (failed) {
    return (
      <section className="mt-12 rounded-xl border border-status-refuted/30 bg-status-refuted/5 p-4">
        <h2 className="text-lg font-semibold">{d.title}</h2>
        <p className="mt-2 text-sm text-status-refuted">{d.error}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="mt-12 rounded-xl border border-card-border bg-card-bg p-4">
        <h2 className="text-lg font-semibold">{d.title}</h2>
        <p className="mt-2 text-sm text-foreground-muted">{d.loading}</p>
      </section>
    );
  }

  const scenarioEntries = Object.entries(data.scenarios).sort(
    ([, left], [, right]) => left.train_end - right.train_end,
  );
  const scenario = data.scenarios[scenarioKey] ?? scenarioEntries[0]?.[1];
  if (!scenario) return null;
  const countryEntries = Object.entries(scenario.country_results).sort(([left], [right]) => left.localeCompare(right));
  const countryResult = scenario.country_results[countryKey] ?? countryEntries[0]?.[1];

  return (
    <section className="mt-12 rounded-xl border border-card-border bg-card-bg p-4 sm:p-6">
      <div className="mb-5 max-w-3xl">
        <h2 className="text-xl font-semibold tracking-tight">{d.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.description}</p>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">
          <span className="mb-1.5 block text-foreground-muted">{d.scenario}</span>
          <select
            value={scenarioKey}
            onChange={(event) => {
              const nextKey = event.target.value;
              const nextScenario = data.scenarios[nextKey];
              setScenarioKey(nextKey);
              setCountryKey(Object.keys(nextScenario.country_results).sort()[0] ?? "");
            }}
            className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground"
          >
            {scenarioEntries.map(([key, item]) => (
              <option key={key} value={key}>
                {item.train_start}–{item.train_end} → {item.test_start}–{item.test_end}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          <span className="mb-1.5 block text-foreground-muted">{d.country}</span>
          <select
            value={countryKey}
            onChange={(event) => setCountryKey(event.target.value)}
            className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground"
            disabled={countryEntries.length === 0}
          >
            {countryEntries.map(([key, item]) => (
              <option key={key} value={key}>
                {displayCountry(item.country)} ({item.iso3})
              </option>
            ))}
          </select>
        </label>
      </div>

      {!countryResult ? (
        <p className="text-sm text-foreground-muted">{d.noCountry}</p>
      ) : (
        <>
          <div className="mb-4 grid grid-cols-2 gap-3 sm:max-w-md">
            <div className="rounded-lg border border-card-border bg-background p-3 text-center">
              <p className="text-xs text-foreground-muted">{d.bermRmse}</p>
              <p className="mt-1 font-mono-num text-lg font-semibold">{countryResult.berm.rmse.toFixed(3)}</p>
            </div>
            <div className="rounded-lg border border-card-border bg-background p-3 text-center">
              <p className="text-xs text-foreground-muted">{d.m0Rmse}</p>
              <p className="mt-1 font-mono-num text-lg font-semibold">{countryResult.m0.rmse.toFixed(3)}</p>
            </div>
          </div>
          <p className="mb-2 text-xs text-foreground-muted">{d.outcome}</p>
          <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground-muted">
            <LineLegend color="#F59E0B" label={d.observed} />
            <LineLegend color="#3B82F6" label={d.berm} />
            <LineLegend color="#9CA3AF" label={d.m0} />
          </div>
          <div className="rounded-lg border border-card-border bg-background p-2 sm:p-3">
            <TemporalLineChart rows={countryResult.rows} label={d.chart} />
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[460px] text-sm">
              <caption className="mb-2 text-left text-sm font-medium">{d.table}</caption>
              <thead className="border-b border-card-border text-left text-xs text-foreground-muted">
                <tr>
                  <th scope="col" className="px-2 py-2 font-medium">{d.year}</th>
                  <th scope="col" className="px-2 py-2 text-right font-medium">{d.observed}</th>
                  <th scope="col" className="px-2 py-2 text-right font-medium">{d.berm}</th>
                  <th scope="col" className="px-2 py-2 text-right font-medium">{d.m0}</th>
                </tr>
              </thead>
              <tbody className="font-mono-num">
                {countryResult.rows.map((row) => (
                  <tr key={row.year} className="border-b border-card-border/70 last:border-0">
                    <td className="px-2 py-1.5">{row.year}</td>
                    <td className="px-2 py-1.5 text-right">{row.observed_tfr.toFixed(3)}</td>
                    <td className="px-2 py-1.5 text-right">{row.berm_predicted_tfr.toFixed(3)}</td>
                    <td className="px-2 py-1.5 text-right">{row.m0_predicted_tfr.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <p className="mt-5 rounded-lg border border-status-partial/30 bg-status-partial/5 p-3 text-xs leading-relaxed text-foreground-muted">
        {d.conditional}
      </p>
    </section>
  );
}
