"use client";

import { useMemo, useState } from "react";
import series from "@/lib/sentinelCascadeSeries.json";

interface Point {
  year: number;
  mean?: number;
  value?: number;
  countries?: number;
}

const MAX_LAG = 5;

interface TechLayer {
  id: string;
  nameEn: string;
  nameFi: string;
  startYear: number;
  endYear: number | null; // null = ongoing
  detail: string;
  color: string;
}

const TECH_LAYERS: TechLayer[] = [
  {
    id: "nexrad",
    nameEn: "NEXRAD weather radar",
    nameFi: "NEXRAD-säätutkajärjestelmä",
    startYear: 1988,
    endYear: 1997,
    detail: "S-band 2.7 GHz, 250 kW–1 MW peak",
    color: "#ef4444",
  },
  {
    id: "led",
    nameEn: "LED street lighting",
    nameFi: "LED-katuvalaistus",
    startYear: 2012,
    endYear: null,
    detail: "EU incandescent ban 2009–2012, street rollout 2012+",
    color: "#8b5cf6",
  },
];
const COUNTRY_NAMES_FI: Record<string, string> = {
  AUT: "Itävalta", BEL: "Belgia", CHE: "Sveitsi", CZE: "Tšekki", DEU: "Saksa",
  DNK: "Tanska", DZA: "Algeria", ESP: "Espanja", EST: "Viro", FIN: "Suomi",
  FRA: "Ranska", IRL: "Irlanti", ISR: "Israel", ITA: "Italia", LVA: "Latvia",
  MKD: "Pohjois-Makedonia", NOR: "Norja", POL: "Puola", SVK: "Slovakia",
  SVN: "Slovenia", SWE: "Ruotsi", UKR: "Ukraina", USA: "Yhdysvallat",
};
const COUNTRY_NAMES_EN: Record<string, string> = {
  AUT: "Austria", BEL: "Belgium", CHE: "Switzerland", CZE: "Czechia", DEU: "Germany",
  DNK: "Denmark", DZA: "Algeria", ESP: "Spain", EST: "Estonia", FIN: "Finland",
  FRA: "France", IRL: "Ireland", ISR: "Israel", ITA: "Italy", LVA: "Latvia",
  MKD: "North Macedonia", NOR: "Norway", POL: "Poland", SVK: "Slovakia",
  SVN: "Slovenia", SWE: "Sweden", UKR: "Ukraine", USA: "United States",
};

function val(p: Point) {
  return (p.mean ?? p.value ?? 0);
}

/** Splits a series at gaps so a missing survey year is never drawn as a trend. */
function segments(points: Point[]) {
  const out: Point[][] = [];
  let run: Point[] = [];
  for (const p of points) {
    if (run.length && p.year !== run[run.length - 1].year + 1) {
      out.push(run);
      run = [];
    }
    run.push(p);
  }
  if (run.length) out.push(run);
  return out;
}

function niceMax(values: number[]) {
  const m = Math.max(...values.map((v) => Math.abs(v)), 1e-6);
  return m * 1.25;
}

interface FigureProps {
  compact: boolean;
  fi: boolean;
  lag: number;
  bee: Point[];
  alignedTfr: { year: number; value: number; sourceYear: number }[];
}

/**
 * One rendering of the two-band figure. A compact and a wide variant are both
 * emitted and toggled by CSS, so narrow screens get larger type rather than a
 * uniformly shrunk viewBox.
 */
function Figure({ compact, fi, lag, bee, alignedTfr }: FigureProps) {
  const W = compact ? 360 : 560;
  const H = compact ? 340 : 330;
  const pad = compact
    // Right margin holds the last four-digit year label inside the viewBox.
    ? { top: 22, right: 26, bottom: 74, left: 30 }
    : { top: 24, right: 18, bottom: 74, left: 52 };
  const cw = W - pad.left - pad.right;
  const bandH = compact ? 92 : 88;
  const beeTop = pad.top;
  const tfrTop = pad.top + bandH + (compact ? 40 : 34);
  const bandFont = compact ? 13 : 11;
  const tickFont = compact ? 12 : 10;
  const axisFont = compact ? 12 : 11;

  const years = bee.map((b) => b.year);
  const xMin = Math.min(...years);
  const xMax = Math.max(...years);
  const sx = (y: number) =>
    xMax === xMin ? pad.left + cw / 2 : pad.left + ((y - xMin) / (xMax - xMin)) * cw;

  const beeMax = niceMax(bee.map(val));
  const tfrMax = niceMax(alignedTfr.map((p) => p.value));
  const syBee = (v: number) => beeTop + bandH / 2 - (v / beeMax) * (bandH / 2);
  const syTfr = (v: number) => tfrTop + bandH / 2 - (v / tfrMax) * (bandH / 2);

  // A long single-country series would otherwise collide its year labels.
  const tickStep = Math.ceil(bee.length / (compact ? 4 : 8));

  const line = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  return (
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={
          fi
            ? `Mehiläishäviön ja TFR:n vuosimuutokset ${lag} vuoden viiveellä`
            : `Annual changes in bee loss and TFR at a ${lag} year lag`
        }
      >
        {/* Technology deployment layers */}
        {TECH_LAYERS.map((layer) => {
          const x1Raw = sx(layer.startYear);
          const x2Raw = layer.endYear ? sx(layer.endYear) : W - pad.right;
          const x1 = Math.max(x1Raw, pad.left);
          const x2 = Math.min(x2Raw, W - pad.right);
          // Skip entirely off-chart layers but show an annotation arrow at the edge
          if (x2 <= pad.left) {
            return (
              <g key={layer.id}>
                <title>{`${fi ? layer.nameFi : layer.nameEn}: ${layer.detail}`}</title>
                <text
                  x={pad.left + 2}
                  y={beeTop - 2}
                  fill={layer.color}
                  fontSize={compact ? 7 : 6.5}
                  opacity={0.55}
                >
                  {`← ${fi ? layer.nameFi : layer.nameEn} (${layer.startYear}–${layer.endYear ?? ""})`}
                </text>
              </g>
            );
          }
          if (x1 >= W - pad.right) return null;
          const bandWidth = x2 - x1;
          return (
            <g key={layer.id}>
              <title>{`${fi ? layer.nameFi : layer.nameEn}: ${layer.detail}`}</title>
              <rect
                x={x1}
                y={beeTop}
                width={bandWidth}
                height={tfrTop + bandH - beeTop}
                fill={layer.color}
                opacity={0.06}
              />
              {/* Left edge marker line */}
              {x1Raw >= pad.left && (
                <line
                  x1={x1}
                  y1={beeTop}
                  x2={x1}
                  y2={tfrTop + bandH}
                  stroke={layer.color}
                  strokeWidth={1}
                  strokeDasharray="3,3"
                  opacity={0.35}
                />
              )}
              <text
                x={Math.max(x1 + 3, pad.left + 2)}
                y={tfrTop + bandH + 42}
                fill={layer.color}
                fontSize={compact ? 7 : 7}
                opacity={0.6}
                dominantBaseline="hanging"
              >
                {fi ? layer.nameFi : layer.nameEn}
              </text>
            </g>
          );
        })}

        {[
          {
            top: beeTop,
            sy: syBee,
            colour: "var(--status-partial)",
            title: fi ? "Δ mehiläishäviö (pp)" : "Δ bee winter loss (pp)",
            points: bee.map((b) => ({ year: b.year, value: val(b), countries: b.countries })),
            fmt: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)} pp`,
          },
          {
            top: tfrTop,
            sy: syTfr,
            colour: "var(--accent)",
            title: fi ? `Δ TFR (vuosi + ${lag} v)` : `Δ TFR (year + ${lag} yr)`,
            points: alignedTfr.map((p) => ({ year: p.year, value: p.value, sourceYear: p.sourceYear })),
            fmt: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(3)}`,
          },
        ].map((band) => (
          <g key={band.title}>
            <text
              x={pad.left}
              y={band.top - 7}
              fill={band.colour}
              fontSize={bandFont}
              fontWeight={600}
            >
              {band.title}
            </text>
            <line
              x1={pad.left}
              y1={band.sy(0)}
              x2={W - pad.right}
              y2={band.sy(0)}
              stroke="var(--foreground-muted)"
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.4}
            />
            {segments(band.points as Point[]).map((seg, i) => (
              <path
                key={i}
                d={line(seg.map((p) => ({ x: sx(p.year), y: band.sy(val(p)) })))}
                fill="none"
                stroke={band.colour}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {(band.points as (Point & { sourceYear?: number })[]).map((p) => (
              <g key={p.year}>
                <title>
                  {p.sourceYear !== undefined
                    ? `${p.sourceYear}: ${band.fmt(val(p))}`
                    : `${p.year}: ${band.fmt(val(p))}${p.countries ? ` (${p.countries} ${fi ? "maata" : "countries"})` : ""}`}
                </title>
                <circle
                  cx={sx(p.year)}
                  cy={band.sy(val(p))}
                  r={4}
                  fill={band.colour}
                />
              </g>
            ))}
          </g>
        ))}

        {/* shared year axis */}
        <line
          x1={pad.left}
          y1={tfrTop + bandH + 12}
          x2={W - pad.right}
          y2={tfrTop + bandH + 12}
          stroke="var(--card-border)"
          strokeWidth={1}
        />
        {bee
          .filter((_, i) => i % tickStep === 0 || i === bee.length - 1)
          .map((b) => (
            <text
              key={b.year}
              x={sx(b.year)}
              y={tfrTop + bandH + 27}
              fill="var(--foreground-muted)"
              fontSize={tickFont}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
            >
              {b.year}
            </text>
          ))}
        <text
          x={pad.left + cw / 2}
          y={H - 6}
          fill="var(--foreground-muted)"
          fontSize={axisFont}
          textAnchor="middle"
        >
          {fi ? "Mehiläisvuosi (talvikauden loppu)" : "Bee year (end of winter season)"}
        </text>
      </svg>
  );
}

export function SentinelCascadeTimeline({ locale = "en" }: { locale?: "fi" | "en" }) {
  const fi = locale === "fi";
  const [lag, setLag] = useState(series.published.optimalLagYears);
  const [country, setCountry] = useState("__pooled");

  const names = fi ? COUNTRY_NAMES_FI : COUNTRY_NAMES_EN;
  const pooled = country === "__pooled";

  const { bee, tfr } = useMemo(() => {
    if (pooled) {
      return { bee: series.beeSeries as Point[], tfr: series.tfrSeries as Point[] };
    }
    const entry = (series.byCountry as Record<string, { bee: Point[]; tfr: Point[] }>)[country];
    return { bee: entry.bee, tfr: entry.tfr };
  }, [country, pooled]);

  const tfrByYear = useMemo(() => {
    const map = new Map<number, Point>();
    for (const p of tfr) map.set(p.year, p);
    return map;
  }, [tfr]);

  // The TFR series is drawn against the bee year it is compared with, so
  // moving the lag slides one curve across the other.
  const alignedTfr = useMemo(
    () =>
      bee
        .map((b) => {
          const t = tfrByYear.get(b.year + lag);
          return t ? { year: b.year, value: val(t), sourceYear: t.year } : null;
        })
        .filter((p): p is { year: number; value: number; sourceYear: number } => p !== null),
    [bee, tfrByYear, lag],
  );

  const activeLag = series.lagProfile.find((l) => l.lag === lag);
  const publishedLag = lag === series.published.optimalLagYears;

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">
            {fi ? "Mehiläishäviö edeltää TFR-laskua" : "Bee loss leads TFR decline"}
          </h3>
          <p className="mt-1 text-sm text-foreground-muted">
            {fi
              ? "Vuosimuutokset 23 maan COLOSS-paneelissa. Siirrä viivettä ja katso milloin sarjat asettuvat kohdakkain."
              : "Annual changes across the 23-country COLOSS panel. Move the lag and watch the series line up."}
          </p>
        </div>
        <label className="text-xs text-foreground-muted">
          <span className="sr-only">{fi ? "Valitse maa" : "Select country"}</span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded border border-card-border bg-background px-2 py-1 text-xs text-foreground"
          >
            <option value="__pooled">{fi ? "Koko paneeli (23)" : "Whole panel (23)"}</option>
            {series.panel.map((c) => (
              <option key={c} value={c}>
                {names[c] ?? c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="sm:hidden">
        <Figure compact fi={fi} lag={lag} bee={bee} alignedTfr={alignedTfr} />
      </div>
      <div className="hidden sm:block">
        <Figure compact={false} fi={fi} lag={lag} bee={bee} alignedTfr={alignedTfr} />
      </div>

      {/* lag control and the lag profile it moves through */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <label className="flex items-center gap-3 text-xs text-foreground-muted">
          <span className="whitespace-nowrap">{fi ? "Viive" : "Lag"}</span>
          <input
            type="range"
            min={0}
            max={MAX_LAG}
            step={1}
            value={lag}
            onChange={(e) => setLag(Number(e.target.value))}
            className="w-36 accent-[var(--accent)]"
            aria-label={fi ? "Viive vuosina" : "Lag in years"}
          />
          <span className="font-mono-num whitespace-nowrap text-foreground">
            {lag} {fi ? "v" : "yr"}
          </span>
        </label>

        <svg
          viewBox="0 0 180 34"
          className="h-8 w-44"
          role="img"
          aria-label={
            fi
              ? "Viiveprofiili: maakohtaisten korrelaatioiden keskiarvo viiveittäin"
              : "Lag profile: mean within-country correlation by lag"
          }
        >
          <line x1={0} y1={17} x2={180} y2={17} stroke="var(--card-border)" strokeWidth={1} />
          {series.lagProfile.map((entry) => {
            const x = 12 + entry.lag * 30;
            const h = Math.min(Math.abs(entry.meanR) * 34, 16);
            const negative = entry.meanR < 0;
            const selected = entry.lag === lag;
            return (
              <g key={entry.lag}>
                <title>
                  {fi
                    ? `Viive ${entry.lag} v: keskimääräinen r = ${entry.meanR.toFixed(2)}, BERM-suunta ${entry.bermDirection}/${entry.countries}`
                    : `Lag ${entry.lag} yr: mean r = ${entry.meanR.toFixed(2)}, BERM direction ${entry.bermDirection}/${entry.countries}`}
                </title>
                <rect
                  x={x - 7}
                  y={negative ? 17 : 17 - h}
                  width={14}
                  height={h}
                  fill={negative ? "var(--accent)" : "var(--foreground-muted)"}
                  opacity={selected ? 1 : 0.35}
                />
                <text
                  x={x}
                  y={31}
                  fill={selected ? "var(--foreground)" : "var(--foreground-muted)"}
                  fontSize={8}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                >
                  {entry.lag}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-foreground-muted">
        <span className="font-mono-num">r = {series.published.pooledR}</span>
        <span className="font-mono-num">p = {series.published.circularShiftP}</span>
        <span className="font-mono-num">
          {series.published.bermDirection}/{series.published.panelSize}{" "}
          {fi ? "maata BERM-suunnassa" : "countries in BERM direction"}
        </span>
        {!publishedLag && activeLag && (
          <span>
            {fi
              ? `Valittu viive ${lag} v ei ole paneelin optimi (${series.published.optimalLagYears} v).`
              : `The selected ${lag} yr lag is not the panel optimum (${series.published.optimalLagYears} yr).`}
          </span>
        )}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
        {fi
          ? "r ja p ovat maansisäisestä poolatusta analyysistä (viive 2 v), joka kontrolloi maiden väliset tasoerot. Kuvan käyrät ovat vuosikeskiarvoja, joista tasoerot ovat poissa, joten niiden visuaalinen korrelaatio on voimakkaampi kuin julkaistu luku. Käyrä katkeaa vuosina, joilta paneelikattavuutta ei ole; pisteen tooltip kertoo montako maata vuosi edustaa. Tulos on korrelatiivinen."
          : "r and p come from the within-country pooled analysis (2 yr lag), which controls for level differences between countries. The curves show pooled annual means, with those differences removed, so their visual correlation is stronger than the published figure. The line breaks in years without panel coverage; each point's tooltip gives the country count. The result is correlational."}
      </p>
    </div>
  );
}
