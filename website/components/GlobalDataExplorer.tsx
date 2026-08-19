"use client";

import { useEffect, useMemo, useState } from "react";
import {
  membershipsFromPanel,
  parseGlobalPanelCsv,
  type GlobalCountryPanel,
  type GlobalCountryYear,
  type GlobalPanel,
  type GlobalTier,
  type GlobalTierMemberships,
} from "@/lib/globalArtifacts";
import { GlobalTierMap } from "./GlobalTierMap";

type Locale = "en" | "fi";
type TierFilter = "all" | GlobalTier;

const copy = {
  en: {
    title: "Global country-year explorer",
    description:
      "Browse the published country-year panel by country and pre-specified coverage tier. It contains published reported-or-estimated demographic series and technology-timing proxies, not measured FieldState or a prediction display.",
    loading: "Loading the published global panel…",
    error: "The global country-year panel is not available yet. No values are shown until a published artefact can be loaded.",
    tier: "Coverage tier",
    country: "Country",
    year: "Year",
    all: "All published countries",
    core: "Core 51",
    extended: "Extended",
    global: "Global",
    unassigned: "No published tier",
    tfr: "Published TFR series",
    mobile: "Mobile subscriptions",
    urban: "Urban population",
    gdp: "GDP PPP per capita",
    noValue: "Not reported",
    provenance: "Field provenance",
    tfrProvenance: "TFR provenance",
    tfrSource: "Source",
    tfrStatus: "Series status",
    tfrMeasurementType: "Measurement type",
    missingness: "Missingness note",
    trends: "Published country-year trends",
    tfrTrend: "Published TFR series by year",
    mobileTrend: "Mobile subscriptions per 100 people by year",
    noTrend: "No published values are available for this series.",
    panelNote:
      "A tier represents inclusion and data coverage, not model quality, an inferred effect, or a future fertility prediction.",
    noCountries: "No published countries match this tier.",
  },
  fi: {
    title: "Globaalin maa–vuosi-aineiston tutkija",
    description:
      "Selaa julkaistua maa–vuosi-paneelia maan ja ennalta määritellyn kattavuustason mukaan. Paneeli sisältää julkaistuja raportoituja tai estimoituja demografisia sarjoja ja teknologian ajoitusprokseja, ei mitattua FieldStatea eikä ennustenäkymää.",
    loading: "Ladataan julkaistua globaalia paneelia…",
    error: "Globaalia maa–vuosi-paneelia ei ole vielä saatavilla. Arvoja ei näytetä ennen julkaistun artefaktin lataamista.",
    tier: "Kattavuustaso",
    country: "Maa",
    year: "Vuosi",
    all: "Kaikki julkaistut maat",
    core: "Core 51",
    extended: "Laajennettu",
    global: "Globaali",
    unassigned: "Ei julkaistua tasoa",
    tfr: "Julkaistu TFR-sarja",
    mobile: "Mobiililiittymät",
    urban: "Kaupunkiväestö",
    gdp: "BKT (PPP) per asukas",
    noValue: "Ei raportoitu",
    provenance: "Kentän alkuperä",
    tfrProvenance: "TFR-sarjan provenienssi",
    tfrSource: "Lähde",
    tfrStatus: "Sarjan tila",
    tfrMeasurementType: "Mittauksen tyyppi",
    missingness: "Puuttuvuushuomio",
    trends: "Julkaistut maa–vuosi-trendit",
    tfrTrend: "Julkaistu TFR-sarja vuosittain",
    mobileTrend: "Mobiililiittymät per 100 asukasta vuosittain",
    noTrend: "Tälle sarjalle ei ole julkaistu arvoja.",
    panelNote:
      "Taso tarkoittaa sisällyttämistä ja datakattavuutta, ei mallin laatua, pääteltyä vaikutusta eikä tulevaa hedelmällisyysennustetta.",
    noCountries: "Tähän tasoon ei sisälly julkaistuja maita.",
  },
} as const;

function tierLabel(tier: GlobalTier | undefined, locale: Locale) {
  if (!tier) return copy[locale].unassigned;
  return copy[locale][tier];
}

function membershipLabel(iso3: string, memberships: GlobalTierMemberships | null, locale: Locale) {
  const values = memberships?.membershipsByIso[iso3] ?? [];
  return values.length > 0 ? values.map((tier) => tierLabel(tier, locale)).join(" · ") : copy[locale].unassigned;
}

function formatValue(value: number | undefined, digits = 2) {
  return value === undefined ? null : value.toLocaleString(undefined, { maximumFractionDigits: digits });
}

function TrendChart({
  rows,
  accessor,
  label,
  color,
  fallback,
}: {
  rows: GlobalCountryYear[];
  accessor: (row: GlobalCountryYear) => number | undefined;
  label: string;
  color: string;
  fallback: string;
}) {
  const points = rows.flatMap((row) => {
    const value = accessor(row);
    return value === undefined ? [] : [{ year: row.year, value }];
  });
  if (points.length === 0) {
    return <p className="rounded-lg border border-card-border bg-background p-4 text-sm text-foreground-muted">{fallback}</p>;
  }

  const width = 500;
  const height = 170;
  const margin = { top: 12, right: 12, bottom: 26, left: 40 };
  const minYear = points[0].year;
  const maxYear = points[points.length - 1].year;
  const minValue = Math.min(...points.map((point) => point.value));
  const maxValue = Math.max(...points.map((point) => point.value));
  const valuePadding = Math.max(0.1, (maxValue - minValue) * 0.14);
  const low = Math.max(0, minValue - valuePadding);
  const high = maxValue + valuePadding;
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const x = (year: number) => margin.left + ((year - minYear) / Math.max(1, maxYear - minYear)) * plotWidth;
  const y = (value: number) => margin.top + ((high - value) / Math.max(1e-9, high - low)) * plotHeight;
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${x(point.year)} ${y(point.value)}`).join(" ");
  const ticks = Array.from({ length: 3 }, (_, index) => low + ((high - low) * index) / 2);

  return (
    <figure className="rounded-lg border border-card-border bg-background p-3">
      <figcaption className="mb-2 text-xs text-foreground-muted">{label}</figcaption>
      <svg role="img" aria-label={label} className="h-auto w-full" viewBox={`0 0 ${width} ${height}`}>
        <title>{label}</title>
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={y(tick)}
              y2={y(tick)}
              className="stroke-card-border"
              strokeDasharray="2 3"
            />
            <text x={margin.left - 7} y={y(tick) + 4} textAnchor="end" className="fill-foreground-muted text-[10px]">
              {tick.toFixed(1)}
            </text>
          </g>
        ))}
        <path d={line} fill="none" stroke={color} strokeWidth="2.5" />
        {points.map((point) => (
          <circle key={point.year} cx={x(point.year)} cy={y(point.value)} r="2" fill={color} />
        ))}
        <text x={margin.left} y={height - 7} className="fill-foreground-muted text-[10px]">{minYear}</text>
        <text x={width - margin.right} y={height - 7} textAnchor="end" className="fill-foreground-muted text-[10px]">{maxYear}</text>
      </svg>
    </figure>
  );
}

async function loadPanel(signal: AbortSignal): Promise<GlobalPanel> {
  const csvResponse = await fetch("/data/global_panel.csv", { signal });
  if (csvResponse.ok) {
    const parsed = parseGlobalPanelCsv(await csvResponse.text());
    if (parsed) return parsed;
  }

  throw new Error("Global panel artifact is unavailable or invalid");
}

export function GlobalDataExplorer({ locale }: { locale: string }) {
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = copy[language];
  const [panel, setPanel] = useState<GlobalPanel | null>(null);
  const [memberships, setMemberships] = useState<GlobalTierMemberships | null>(null);
  const [tier, setTier] = useState<TierFilter>("all");
  const [countryIso3, setCountryIso3] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    loadPanel(controller.signal)
      .then((publishedPanel) => {
        setPanel(publishedPanel);
        setMemberships(membershipsFromPanel(publishedPanel));
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setFailed(true);
      });
    return () => controller.abort();
  }, []);

  const countries = useMemo(() => {
    if (!panel) return [];
    return panel.countries.filter((country) => {
      if (tier === "all") return true;
      return memberships?.membershipsByIso[country.iso3]?.includes(tier) ?? false;
    });
  }, [panel, memberships, tier]);

  const selectedCountry: GlobalCountryPanel | undefined = countries.find((country) => country.iso3 === countryIso3)
    ?? countries[0];

  const selectedRow = selectedCountry?.years.find((row) => row.year === year)
    ?? selectedCountry?.years[selectedCountry.years.length - 1];
  const selectedTier = selectedCountry ? membershipLabel(selectedCountry.iso3, memberships, language) : d.unassigned;

  return (
    <section className="space-y-6">
      <div className="max-w-3xl">
        <h2 className="text-xl font-semibold">{d.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.description}</p>
      </div>

      {failed ? (
        <p className="rounded-xl border border-status-partial/30 bg-status-partial/5 p-4 text-sm text-foreground-muted">{d.error}</p>
      ) : !panel ? (
        <p className="py-16 text-center text-sm text-foreground-muted">{d.loading}</p>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="text-sm font-medium">
              <span className="mb-1.5 block text-foreground-muted">{d.tier}</span>
              <select
                value={tier}
                onChange={(event) => setTier(event.target.value as TierFilter)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground"
              >
                <option value="all">{d.all}</option>
                <option value="core">{d.core}</option>
                <option value="extended">{d.extended}</option>
                <option value="global">{d.global}</option>
              </select>
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              <span className="mb-1.5 block text-foreground-muted">{d.country}</span>
              <select
                value={selectedCountry?.iso3 ?? ""}
                onChange={(event) => setCountryIso3(event.target.value)}
                disabled={countries.length === 0}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground disabled:opacity-60"
              >
                {countries.map((country) => (
                  <option key={country.iso3} value={country.iso3}>{country.name} ({country.iso3})</option>
                ))}
              </select>
            </label>
          </div>

          {!selectedCountry || !selectedRow ? (
            <p className="rounded-lg border border-card-border bg-card-bg p-4 text-sm text-foreground-muted">{d.noCountries}</p>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-card-border bg-card-bg p-4">
                <div>
                  <p className="text-lg font-semibold">{selectedCountry.name}</p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {selectedCountry.iso3} · {selectedTier}
                  </p>
                </div>
                <label className="text-sm font-medium">
                  <span className="mb-1 block text-xs text-foreground-muted">{d.year}</span>
                  <select
                    value={selectedRow.year}
                    onChange={(event) => setYear(Number(event.target.value))}
                    className="rounded-lg border border-card-border bg-background px-3 py-2 text-foreground"
                  >
                    {selectedCountry.years.map((row) => <option key={row.year} value={row.year}>{row.year}</option>)}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  [d.tfr, formatValue(selectedRow.tfr, 2)],
                  [d.mobile, formatValue(selectedRow.mobilePer100, 1)],
                  [d.urban, formatValue(selectedRow.urbanPct, 1) ? `${formatValue(selectedRow.urbanPct, 1)}%` : null],
                  [d.gdp, formatValue(selectedRow.gdpPppPerCapita, 0)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-card-border bg-card-bg p-3">
                    <p className="text-xs text-foreground-muted">{label}</p>
                    <p className="mt-1 font-mono-num text-base font-semibold">{value ?? d.noValue}</p>
                  </div>
                ))}
              </div>

              {(selectedRow.fieldProvenance || selectedRow.missingness) && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedRow.fieldProvenance && (
                    <div className="rounded-lg border border-card-border bg-background p-3">
                      <p className="text-xs font-medium text-foreground-muted">{d.provenance}</p>
                      <p className="mt-1 break-words text-sm text-foreground">{selectedRow.fieldProvenance}</p>
                    </div>
                  )}
                  {selectedRow.missingness && (
                    <div className="rounded-lg border border-card-border bg-background p-3">
                      <p className="text-xs font-medium text-foreground-muted">{d.missingness}</p>
                      <p className="mt-1 break-words text-sm text-foreground">{selectedRow.missingness}</p>
                    </div>
                  )}
                </div>
              )}

              {(selectedRow.tfrSource || selectedRow.tfrSeriesStatus || selectedRow.tfrMeasurementType) && (
                <div className="rounded-lg border border-card-border bg-background p-3">
                  <p className="text-xs font-medium text-foreground-muted">{d.tfrProvenance}</p>
                  <dl className="mt-2 grid gap-2 text-sm sm:grid-cols-3">
                    {selectedRow.tfrSource && <div><dt className="text-xs text-foreground-muted">{d.tfrSource}</dt><dd className="mt-0.5 break-words text-foreground">{selectedRow.tfrSource}</dd></div>}
                    {selectedRow.tfrSeriesStatus && <div><dt className="text-xs text-foreground-muted">{d.tfrStatus}</dt><dd className="mt-0.5 break-words text-foreground">{selectedRow.tfrSeriesStatus}</dd></div>}
                    {selectedRow.tfrMeasurementType && <div><dt className="text-xs text-foreground-muted">{d.tfrMeasurementType}</dt><dd className="mt-0.5 break-words text-foreground">{selectedRow.tfrMeasurementType}</dd></div>}
                  </dl>
                </div>
              )}

              <div>
                <h3 className="mb-3 text-base font-semibold">{d.trends}</h3>
                <div className="grid gap-4 lg:grid-cols-2">
                  <TrendChart rows={selectedCountry.years} accessor={(row) => row.tfr} label={d.tfrTrend} color="#F59E0B" fallback={d.noTrend} />
                  <TrendChart rows={selectedCountry.years} accessor={(row) => row.mobilePer100} label={d.mobileTrend} color="#3B82F6" fallback={d.noTrend} />
                </div>
              </div>
            </>
          )}
          <p className="text-xs leading-relaxed text-foreground-muted">{d.panelNote}</p>
        </>
      )}

      <GlobalTierMap locale={locale} />
    </section>
  );
}
