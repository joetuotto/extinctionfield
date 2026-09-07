"use client";

import { useId, useState } from "react";
import { pickCopy } from "@/lib/i18n";
import {
  betaFromAlpha,
  computeDkcLoad,
  dutyCycle,
  hillSaturation,
  seasonalCv,
  smartphoneSigmoid,
} from "@/lib/model/dkc";

const EN = {
  title: "Dual-kernel candidate explorer",
  intro:
    "Vary the candidate time scales and response shape against a synthetic annual technology-adoption curve. The chart is a sensitivity view, not an empirical country fit.",
  status: "Model status",
  statusCanonical:
    "candidate calculation / national technology timing proxy / open L2 / locked F1–F9 falsification register",
  statusNote:
    "The registered DKC FieldState calibration pipeline is implemented and produces values; the route also publishes the locked F1–F9 register. This Explorer run deliberately uses a synthetic timing proxy, not a local physical measurement or calibrated dose.",
  controls: "Scenario parameters",
  tauB: "Fast scale τB",
  tauR: "Slow scale τR",
  alpha: "Fast share α",
  beta: "Derived slow share β",
  hillN: "Hill coefficient n",
  erlangN: "Erlang shape nB",
  years: "years",
  formulaNote:
    "T4 uses the selected Erlang nB = 2–6 for the fast arm and a normalized exponential for the slow arm. β is constrained to 1 − α.",
  cohortNote:
    "T3 cohort vulnerability (shown explicitly; not applied to this period-only curve): v(a)=5 for a<0, 4 for 0≤a<1, 3 for 1≤a<6, 2 for 6≤a<18, otherwise 1. Supply a cohort birth year to the evaluator to apply it to the slow input.",
  chartTitle: "Candidate load and Hill saturation, 1990–2030",
  chartDescription:
    "Four annual curves show the weighted fast arm, weighted slow arm, their total, and the normalized Hill saturation.",
  fast: "Fast arm",
  slow: "Slow arm",
  total: "Total load",
  hill: "Hill saturation",
  year: "Year",
  normalized: "Normalized scenario value",
  snapshot: "2030 scenario snapshot",
  proxy: "Synthetic proxy",
  duty: "Duty cycle",
  seasonal: "Seasonal CV",
  exampleNote:
    "Example construction: a midpoint-2013 sigmoid with 0.5/year steepness, multiplied by the continuous 0.33–1.00 duty-cycle scenario. A longer prehistory is calculated before the displayed window to avoid an artificial start-edge effect.",
};

type Copy = typeof EN;

const FI: Copy = {
  title: "Kaksoisytimen ehdokasskenaario",
  intro:
    "Muuta ehdokkaina olevia aikavakioita ja vastemuotoa synteettistä vuosittaista teknologian käyttöönottokäyrää vasten. Kuvaaja on herkkyysnäkymä, ei empiirinen maasovite.",
  status: "Mallin tila",
  statusCanonical:
    "ehdokaslaskenta / kansallinen teknologian ajoitusproksi / avoin L2 / lukittu F1–F9-falsifikaatiorekisteri",
  statusNote:
    "Rekisteröity DKC:n FieldState-kalibrointiputki on toteutettu ja tuottaa arvoja; reitti julkaisee myös lukitun F1–F9-rekisterin. Tämä Explorer-ajo käyttää tarkoituksella synteettistä ajoitusproksia, ei paikallista fysikaalista mittausta tai kalibroitua annosta.",
  controls: "Skenaarioparametrit",
  tauB: "Nopea asteikko τB",
  tauR: "Hidas asteikko τR",
  alpha: "Nopean haaran osuus α",
  beta: "Johdettu hidas osuus β",
  hillN: "Hill-kerroin n",
  erlangN: "Erlangin muoto nB",
  years: "vuotta",
  formulaNote:
    "T4 käyttää nopeassa haarassa valittua Erlang-muotoa nB = 2–6 ja hitaassa haarassa normalisoitua eksponenttia. β on aina 1 − α.",
  cohortNote:
    "T3-kohorttihaavoittuvuus (näytetään eksplisiittisesti, ei sovelleta tähän periodikäyrään): v(a)=5 kun a<0, 4 kun 0≤a<1, 3 kun 1≤a<6, 2 kun 6≤a<18, muutoin 1. Se otetaan käyttöön antamalla laskimelle kohortin syntymävuosi.",
  chartTitle: "Ehdokaskuorma ja Hill-saturaatio 1990–2030",
  chartDescription:
    "Neljä vuosittaista käyrää näyttävät painotetun nopean haaran, painotetun hitaan haaran, niiden summan ja normalisoidun Hill-saturaation.",
  fast: "Nopea haara",
  slow: "Hidas haara",
  total: "Kokonaiskuorma",
  hill: "Hill-saturaatio",
  year: "Vuosi",
  normalized: "Normalisoitu skenaarioarvo",
  snapshot: "Vuoden 2030 skenaariotilanne",
  proxy: "Synteettinen proksi",
  duty: "Duty cycle",
  seasonal: "Kausittainen CV",
  exampleNote:
    "Esimerkkirakenne: vuoden 2013 keskikohdan sigmoidi jyrkkyydellä 0,5/vuosi kerrottuna jatkuvalla duty cycle -skenaariolla 0,33–1,00. Näyttöikkunaa edeltävä pidempi historia lasketaan keinotekoisen aloitusreunavaikutuksen välttämiseksi.",
};

const COPY: Record<string, Partial<Copy>> = {
  en: EN,
  fi: FI,
  ja: {},
  fr: {},
  ko: {},
};

const CALCULATION_START = 1950;
const DISPLAY_START = 1990;
const DISPLAY_END = 2030;
const ADOPTION_MIDPOINT = 2013;
const ADOPTION_STEEPNESS = 0.5;
const HILL_HALF = 0.5;
const BASE_SEASONAL_CV = 0.175;

const SVG = {
  width: 760,
  height: 390,
  left: 62,
  right: 24,
  top: 24,
  bottom: 52,
};

const plotWidth = SVG.width - SVG.left - SVG.right;
const plotHeight = SVG.height - SVG.top - SVG.bottom;

function xPosition(year: number): number {
  return (
    SVG.left +
    ((year - DISPLAY_START) / (DISPLAY_END - DISPLAY_START)) * plotWidth
  );
}

function yPosition(value: number): number {
  return SVG.top + plotHeight - Math.max(0, Math.min(1, value)) * plotHeight;
}

function pathFrom<T extends { year: number }>(
  points: readonly T[],
  valueAt: (point: T) => number,
): string {
  return points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command}${xPosition(point.year).toFixed(2)},${yPosition(valueAt(point)).toFixed(2)}`;
    })
    .join(" ");
}

function ParameterSlider({
  id,
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-lg border p-3" style={{ borderColor: "var(--border)" }}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium" htmlFor={id}>
          {label}
        </label>
        <output className="font-mono text-sm tabular-nums" htmlFor={id}>
          {value.toFixed(step < 1 ? 2 : 0)}{suffix ? ` ${suffix}` : ""}
        </output>
      </div>
      <input
        id={id}
        className="w-full accent-[var(--accent)]"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
    </div>
  );
}

export function DkcExplorer({ locale }: { locale: string }) {
  const t = pickCopy(COPY, locale) as Copy;
  const id = useId();
  const [tauB, setTauB] = useState(0.5);
  const [tauR, setTauR] = useState(12);
  const [alpha, setAlpha] = useState(0.6);
  const [hillN, setHillN] = useState(2.5);
  const [nB, setNB] = useState(3);

  const proxySeries = Array.from(
    { length: DISPLAY_END - CALCULATION_START + 1 },
    (_, index) => {
      const year = CALCULATION_START + index;
      const adoption = smartphoneSigmoid(
        year,
        ADOPTION_MIDPOINT,
        ADOPTION_STEEPNESS,
      );
      const duty = dutyCycle(
        year,
        ADOPTION_MIDPOINT,
        ADOPTION_STEEPNESS,
      );
      return { year, value: adoption * duty };
    },
  );

  const loadSeries = computeDkcLoad(proxySeries, {
    tauB,
    tauR,
    alpha,
    nB,
  });
  const displaySeries = loadSeries
    .filter((point) => point.year >= DISPLAY_START)
    .map((point) => ({
      ...point,
      hill: hillSaturation(point.total, HILL_HALF, hillN),
    }));
  const current = displaySeries[displaySeries.length - 1];
  const currentDuty = dutyCycle(
    DISPLAY_END,
    ADOPTION_MIDPOINT,
    ADOPTION_STEEPNESS,
  );
  const currentSeasonalCv = seasonalCv(BASE_SEASONAL_CV, currentDuty);

  const paths = {
    fast: pathFrom(displaySeries, (point) => point.fast),
    slow: pathFrom(displaySeries, (point) => point.slow),
    total: pathFrom(displaySeries, (point) => point.total),
    hill: pathFrom(displaySeries, (point) => point.hill),
  };

  const series = [
    { key: "fast", label: t.fast, color: "var(--chart-series-1)" },
    { key: "slow", label: t.slow, color: "var(--chart-series-2)" },
    { key: "total", label: t.total, color: "var(--chart-series-3)" },
    { key: "hill", label: t.hill, color: "var(--chart-series-4)" },
  ] as const;
  const xTicks = [1990, 2000, 2010, 2020, 2030];
  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <section className="space-y-6" aria-labelledby={`${id}-title`}>
      <div>
        <h2 id={`${id}-title`} className="text-xl font-semibold">
          {t.title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm" style={{ color: "var(--foreground-muted)" }}>
          {t.intro}
        </p>
      </div>

      <div
        className="rounded-xl border p-4"
        style={{
          borderColor: "var(--chart-series-2)",
          background: "color-mix(in srgb, var(--chart-series-2) 8%, transparent)",
        }}
        role="status"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.12em]">{t.status}</p>
        <p className="mt-1 font-mono text-sm">{t.statusCanonical}</p>
        <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
          {t.statusNote}
        </p>
      </div>

      <fieldset>
        <legend className="mb-3 text-base font-semibold">{t.controls}</legend>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ParameterSlider
            id={`${id}-tau-b`}
            label={t.tauB}
            value={tauB}
            min={0.3}
            max={2}
            step={0.1}
            suffix={t.years}
            onChange={setTauB}
          />
          <ParameterSlider
            id={`${id}-tau-r`}
            label={t.tauR}
            value={tauR}
            min={5}
            max={20}
            step={1}
            suffix={t.years}
            onChange={setTauR}
          />
          <ParameterSlider
            id={`${id}-alpha`}
            label={t.alpha}
            value={alpha}
            min={0}
            max={1}
            step={0.05}
            onChange={setAlpha}
          />
          <div
            className="rounded-lg border p-3"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-sm font-medium">{t.beta}</p>
            <output className="mt-3 block font-mono text-lg tabular-nums">
              {betaFromAlpha(alpha).toFixed(2)}
            </output>
          </div>
          <ParameterSlider
            id={`${id}-hill-n`}
            label={t.hillN}
            value={hillN}
            min={1}
            max={5}
            step={0.1}
            onChange={setHillN}
          />
          <ParameterSlider
            id={`${id}-erlang-n`}
            label={t.erlangN}
            value={nB}
            min={2}
            max={6}
            step={1}
            onChange={setNB}
          />
        </div>
        <p className="mt-3 text-xs" style={{ color: "var(--foreground-muted)" }}>
          {t.formulaNote}
        </p>
        <p className="mt-2 rounded-lg border p-3 font-mono text-xs leading-relaxed" style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}>
          {t.cohortNote}
        </p>
      </fieldset>

      <figure
        className="rounded-xl border p-3 sm:p-5"
        style={{
          borderColor: "var(--border)",
          background: "var(--background-secondary)",
        }}
      >
        <figcaption className="mb-4">
          <h3 className="font-semibold">{t.chartTitle}</h3>
          <p className="mt-1 text-sm" style={{ color: "var(--foreground-muted)" }}>
            {t.chartDescription}
          </p>
        </figcaption>

        <div className="mb-3 flex flex-wrap gap-x-5 gap-y-2" aria-label="Legend">
          {series.map((item) => (
            <span key={item.key} className="inline-flex items-center gap-2 text-xs">
              <span
                aria-hidden="true"
                className="h-0.5 w-5 rounded-full"
                style={{ background: item.color }}
              />
              {item.label}
            </span>
          ))}
        </div>

        <svg
          className="h-auto w-full"
          viewBox={`0 0 ${SVG.width} ${SVG.height}`}
          role="img"
          aria-labelledby={`${id}-chart-title ${id}-chart-desc`}
        >
          <title id={`${id}-chart-title`}>{t.chartTitle}</title>
          <desc id={`${id}-chart-desc`}>{t.chartDescription}</desc>

          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={SVG.left}
                x2={SVG.width - SVG.right}
                y1={yPosition(tick)}
                y2={yPosition(tick)}
                stroke="var(--chart-grid)"
              />
              <text
                x={SVG.left - 10}
                y={yPosition(tick) + 4}
                textAnchor="end"
                fill="var(--foreground-muted)"
                fontSize="11"
              >
                {tick.toFixed(2)}
              </text>
            </g>
          ))}

          {xTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={xPosition(tick)}
                x2={xPosition(tick)}
                y1={SVG.top}
                y2={SVG.top + plotHeight}
                stroke="var(--chart-grid)"
              />
              <text
                x={xPosition(tick)}
                y={SVG.top + plotHeight + 24}
                textAnchor="middle"
                fill="var(--foreground-muted)"
                fontSize="11"
              >
                {tick}
              </text>
            </g>
          ))}

          <line
            x1={SVG.left}
            x2={SVG.left}
            y1={SVG.top}
            y2={SVG.top + plotHeight}
            stroke="var(--chart-axis)"
          />
          <line
            x1={SVG.left}
            x2={SVG.width - SVG.right}
            y1={SVG.top + plotHeight}
            y2={SVG.top + plotHeight}
            stroke="var(--chart-axis)"
          />

          {series.map((item) => (
            <path
              key={item.key}
              d={paths[item.key]}
              fill="none"
              stroke={item.color}
              strokeWidth={item.key === "total" ? 3 : 2.25}
              strokeDasharray={item.key === "hill" ? "7 5" : undefined}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <text
            x={SVG.left + plotWidth / 2}
            y={SVG.height - 10}
            textAnchor="middle"
            fill="var(--foreground-muted)"
            fontSize="12"
          >
            {t.year}
          </text>
          <text
            x={14}
            y={SVG.top + plotHeight / 2}
            textAnchor="middle"
            fill="var(--foreground-muted)"
            fontSize="12"
            transform={`rotate(-90 14 ${SVG.top + plotHeight / 2})`}
          >
            {t.normalized}
          </text>
        </svg>

        <p className="mt-3 text-xs" style={{ color: "var(--foreground-muted)" }}>
          {t.exampleNote}
        </p>
      </figure>

      <div>
        <h3 className="mb-3 font-semibold">{t.snapshot}</h3>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {[
            [t.proxy, current.value],
            [t.duty, currentDuty],
            [t.fast, current.fast],
            [t.slow, current.slow],
            [t.total, current.total],
            [t.hill, current.hill],
            [t.seasonal, currentSeasonalCv],
          ].map(([label, value]) => (
            <div
              key={String(label)}
              className="rounded-lg border p-3"
              style={{ borderColor: "var(--border)" }}
            >
              <dt className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                {label}
              </dt>
              <dd className="mt-1 font-mono text-base tabular-nums">
                {(value as number).toFixed(3)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
