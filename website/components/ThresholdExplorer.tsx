"use client";

import { useState } from "react";
import {
  THRESHOLD_COUNTRIES,
  PHASE_LABELS,
  computeTIndex,
} from "@/lib/thresholdModel";
import type { CountryThresholdData } from "@/lib/thresholdModel";

const COPY = {
  en: {
    title: "T-Index Threshold Explorer",
    subtitle: "Compare testosterone decline trajectories across countries",
    selectCountries: "Select countries",
    selectAll: "Select all",
    deselectAll: "Deselect all",
    tIndex: "T-Index",
    year: "Year",
    threshold: "40% threshold",
    country: "Country",
    tDecline: "T decline rate",
    source: "Source",
    cumulativeLoss: "Cumulative loss 2024",
    thresholdYear: "Threshold year",
    phase: "Phase",
    tfr2024: "TFR 2024",
    tTfrTitle: "T-Loss vs TFR: the correlation",
    tTfrSubtitle: "Each dot is a country-year. X-axis: cumulative testosterone loss from 1970 baseline. Y-axis: observed TFR. The 40% threshold is where TFR begins accelerating downward.",
    tTfrXLabel: "Cumulative T-loss (%)",
    tTfrYLabel: "TFR",
    caveat:
      "T decline rates are age-independent secular trends. Korean and Japanese rates are estimates (*). The 40% threshold is calibrated against Finnish and Korean data.",
  },
  fi: {
    title: "T-indeksin kynnysarvotutkija",
    subtitle: "Vertaile testosteronin laskutrendejä maittain",
    selectCountries: "Valitse maat",
    selectAll: "Valitse kaikki",
    deselectAll: "Poista kaikki",
    tIndex: "T-indeksi",
    year: "Vuosi",
    threshold: "40 %:n kynnys",
    country: "Maa",
    tDecline: "T-laskuprosentti",
    source: "Lähde",
    cumulativeLoss: "Kumulatiivinen menetys 2024",
    thresholdYear: "Kynnysvuosi",
    phase: "Vaihe",
    tfr2024: "TFR 2024",
    tTfrTitle: "T-menetys vs TFR: korrelaatio",
    tTfrSubtitle: "Jokainen piste on maa-vuosi. X-akseli: kumulatiivinen testosteronimenetys 1970 lähtötasosta. Y-akseli: havaittu TFR. 40 %:n kynnys on kohta jossa TFR alkaa kiihtyä alaspäin.",
    tTfrXLabel: "Kumulatiivinen T-menetys (%)",
    tTfrYLabel: "TFR",
    caveat:
      "T-laskuprosentit ovat ikäriippumattomia sekulaaritrendejä. Korean ja Japanin arvot ovat arvioita (*). 40 %:n kynnysarvo on kalibroitu suomalaisella ja korealaisella datalla.",
  },
};

const T0_YEAR = 1970;
const YEAR_START = 1970;
const YEAR_END = 2040;
const T_MIN = 0;
const T_MAX = 100;
const THRESHOLD_VALUE = 60;

const W = 720;
const H = 380;
const PAD = { top: 24, right: 24, bottom: 48, left: 56 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

function sx(year: number): number {
  return PAD.left + ((year - YEAR_START) / (YEAR_END - YEAR_START)) * CW;
}

function sy(tIndex: number): number {
  return PAD.top + CH - ((tIndex - T_MIN) / (T_MAX - T_MIN)) * CH;
}

function buildCurvePath(country: CountryThresholdData): string {
  const points: string[] = [];
  for (let year = YEAR_START; year <= YEAR_END; year++) {
    const t = computeTIndex(year, T0_YEAR, country.tDeclinePct);
    const x = sx(year);
    const y = sy(Math.max(T_MIN, Math.min(T_MAX, t)));
    points.push(`${points.length === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

function PhaseBadge({ phase, locale }: { phase: 1 | 2 | 3; locale: string }) {
  const lang = locale === "fi" ? "fi" : "en";
  const label = PHASE_LABELS[lang][phase];
  const colors: Record<number, string> = {
    1: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    2: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    3: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[phase]}`}
      title={label.desc}
    >
      {phase} &ndash; {label.title}
    </span>
  );
}

export function ThresholdExplorer({ locale }: { locale: string }) {
  const lang = locale === "fi" ? "fi" : "en";
  const t = COPY[lang];

  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(THRESHOLD_COUNTRIES.map((c) => c.id)),
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll() {
    setSelected(new Set(THRESHOLD_COUNTRIES.map((c) => c.id)));
  }

  function deselectAll() {
    setSelected(new Set());
  }

  const selectedCountries = THRESHOLD_COUNTRIES.filter((c) => selected.has(c.id));
  const yearTicks = [1970, 1980, 1990, 2000, 2010, 2020, 2030, 2040];
  const tTicks = [0, 20, 40, 60, 80, 100];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          {t.title}
        </h3>
        <p className="text-sm mt-1" style={{ color: "var(--foreground-muted)" }}>
          {t.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          {t.selectCountries}:
        </span>
        {THRESHOLD_COUNTRIES.map((country) => (
          <label
            key={country.id}
            className="inline-flex items-center gap-1.5 text-sm cursor-pointer"
            style={{ color: "var(--foreground)" }}
          >
            <input
              type="checkbox"
              checked={selected.has(country.id)}
              onChange={() => toggle(country.id)}
              className="rounded"
            />
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: country.color }}
            />
            {lang === "fi" ? country.nameFi : country.nameEn}
          </label>
        ))}
        <button
          onClick={selected.size === THRESHOLD_COUNTRIES.length ? deselectAll : selectAll}
          className="text-xs px-2 py-1 rounded border transition-colors"
          style={{
            color: "var(--foreground-muted)",
            borderColor: "var(--card-border)",
          }}
        >
          {selected.size === THRESHOLD_COUNTRIES.length ? t.deselectAll : t.selectAll}
        </button>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[600px]"
          role="img"
          aria-label={t.title}
        >
          {tTicks.map((val) => (
            <g key={val}>
              <line
                x1={PAD.left}
                y1={sy(val)}
                x2={W - PAD.right}
                y2={sy(val)}
                stroke="var(--card-border)"
                strokeWidth={0.5}
              />
              <text
                x={PAD.left - 8}
                y={sy(val) + 4}
                textAnchor="end"
                fill="var(--foreground-muted)"
                fontSize={10}
              >
                {val}
              </text>
            </g>
          ))}

          {yearTicks.map((year) => (
            <g key={year}>
              <line
                x1={sx(year)}
                y1={PAD.top}
                x2={sx(year)}
                y2={PAD.top + CH}
                stroke="var(--card-border)"
                strokeWidth={0.5}
              />
              <text
                x={sx(year)}
                y={PAD.top + CH + 20}
                textAnchor="middle"
                fill="var(--foreground-muted)"
                fontSize={10}
              >
                {year}
              </text>
            </g>
          ))}

          <line
            x1={PAD.left}
            y1={sy(THRESHOLD_VALUE)}
            x2={W - PAD.right}
            y2={sy(THRESHOLD_VALUE)}
            stroke="#EF4444"
            strokeWidth={1.5}
            strokeDasharray="6 4"
          />
          <text
            x={W - PAD.right + 4}
            y={sy(THRESHOLD_VALUE) + 4}
            fill="#EF4444"
            fontSize={9}
            fontWeight={600}
          >
            {t.threshold}
          </text>

          {selectedCountries.map((country) => (
            <g key={country.id}>
              <path
                d={buildCurvePath(country)}
                fill="none"
                stroke={country.color}
                strokeWidth={2}
              />
              <line
                x1={sx(country.thresholdYear)}
                y1={PAD.top}
                x2={sx(country.thresholdYear)}
                y2={PAD.top + CH}
                stroke={country.color}
                strokeWidth={1}
                strokeDasharray="4 3"
                opacity={0.6}
              />
              <text
                x={sx(country.thresholdYear)}
                y={PAD.top - 6}
                textAnchor="middle"
                fill={country.color}
                fontSize={9}
                fontWeight={500}
              >
                {lang === "fi" ? country.nameFi : country.nameEn} {country.thresholdYear}
              </text>
            </g>
          ))}

          <text
            x={PAD.left - 8}
            y={PAD.top - 10}
            fill="var(--foreground-muted)"
            fontSize={10}
            fontWeight={600}
          >
            {t.tIndex}
          </text>
          <text
            x={W - PAD.right}
            y={PAD.top + CH + 36}
            textAnchor="end"
            fill="var(--foreground-muted)"
            fontSize={10}
            fontWeight={600}
          >
            {t.year}
          </text>

          <line
            x1={PAD.left}
            y1={PAD.top}
            x2={PAD.left}
            y2={PAD.top + CH}
            stroke="var(--card-border)"
            strokeWidth={1}
          />
          <line
            x1={PAD.left}
            y1={PAD.top + CH}
            x2={W - PAD.right}
            y2={PAD.top + CH}
            stroke="var(--card-border)"
            strokeWidth={1}
          />
        </svg>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr
              className="border-b text-left"
              style={{ borderColor: "var(--card-border)" }}
            >
              <th className="py-2 pr-4 font-medium" style={{ color: "var(--foreground)" }}>
                {t.country}
              </th>
              <th className="py-2 pr-4 font-medium" style={{ color: "var(--foreground)" }}>
                {t.tDecline}
              </th>
              <th className="py-2 pr-4 font-medium" style={{ color: "var(--foreground)" }}>
                {t.source}
              </th>
              <th className="py-2 pr-4 font-medium" style={{ color: "var(--foreground)" }}>
                {t.cumulativeLoss}
              </th>
              <th className="py-2 pr-4 font-medium" style={{ color: "var(--foreground)" }}>
                {t.thresholdYear}
              </th>
              <th className="py-2 pr-4 font-medium" style={{ color: "var(--foreground)" }}>
                {t.phase}
              </th>
              <th className="py-2 font-medium" style={{ color: "var(--foreground)" }}>
                {t.tfr2024}
              </th>
            </tr>
          </thead>
          <tbody>
            {THRESHOLD_COUNTRIES.map((country) => (
              <tr
                key={country.id}
                className="border-b"
                style={{ borderColor: "var(--card-border)" }}
              >
                <td className="py-2 pr-4" style={{ color: "var(--foreground)" }}>
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: country.color }}
                    />
                    {lang === "fi" ? country.nameFi : country.nameEn}
                  </span>
                </td>
                <td className="py-2 pr-4" style={{ color: "var(--foreground)" }}>
                  {country.tDeclinePct}% / yr
                </td>
                <td className="py-2 pr-4" style={{ color: "var(--foreground-muted)" }}>
                  {country.tSource}
                  {country.tSourceEstimated && (
                    <span className="text-amber-500 ml-0.5" title="Estimated">
                      *
                    </span>
                  )}
                </td>
                <td className="py-2 pr-4" style={{ color: "var(--foreground)" }}>
                  {country.cumulativeLoss2024.toFixed(1)}%
                </td>
                <td className="py-2 pr-4 font-mono text-xs" style={{ color: "var(--foreground)" }}>
                  {country.thresholdYear}
                </td>
                <td className="py-2 pr-4">
                  <PhaseBadge phase={country.phase} locale={locale} />
                </td>
                <td className="py-2 font-mono text-xs" style={{ color: "var(--foreground)" }}>
                  {country.tfr2024.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* T-Loss vs TFR scatter */}
      {(() => {
        const S_W = 720;
        const S_H = 400;
        const S_PAD = { top: 32, right: 32, bottom: 56, left: 56 };
        const S_CW = S_W - S_PAD.left - S_PAD.right;
        const S_CH = S_H - S_PAD.top - S_PAD.bottom;
        const X_MIN = 0;
        const X_MAX = 55;
        const Y_MIN = 0;
        const Y_MAX = 5;

        function scx(loss: number) {
          return S_PAD.left + (loss / X_MAX) * S_CW;
        }
        function scy(tfr: number) {
          return S_PAD.top + S_CH - ((tfr - Y_MIN) / (Y_MAX - Y_MIN)) * S_CH;
        }

        const dots: { x: number; y: number; color: string; label: string }[] = [];
        for (const country of selectedCountries) {
          for (const pt of country.tfrHistory) {
            const elapsed = pt.year - T0_YEAR;
            if (elapsed < 0) continue;
            const tLoss = 100 - computeTIndex(pt.year, T0_YEAR, country.tDeclinePct);
            dots.push({ x: tLoss, y: pt.tfr, color: country.color, label: `${lang === "fi" ? country.nameFi : country.nameEn} ${pt.year}` });
          }
        }

        const xTicks = [0, 10, 20, 30, 40, 50];
        const yTicks = [0, 1, 2, 3, 4, 5];

        return (
          <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--card-border)" }}>
            <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
              {t.tTfrTitle}
            </h3>
            <p className="text-sm mt-1 mb-4" style={{ color: "var(--foreground-muted)" }}>
              {t.tTfrSubtitle}
            </p>
            <div className="overflow-x-auto">
              <svg viewBox={`0 0 ${S_W} ${S_H}`} className="w-full min-w-[600px]" role="img" aria-label={t.tTfrTitle}>
                {yTicks.map(val => (
                  <g key={`y-${val}`}>
                    <line x1={S_PAD.left} y1={scy(val)} x2={S_W - S_PAD.right} y2={scy(val)} stroke="var(--card-border)" strokeWidth={0.5} />
                    <text x={S_PAD.left - 8} y={scy(val) + 4} textAnchor="end" fill="var(--foreground-muted)" fontSize={10}>{val}</text>
                  </g>
                ))}
                {xTicks.map(val => (
                  <g key={`x-${val}`}>
                    <line x1={scx(val)} y1={S_PAD.top} x2={scx(val)} y2={S_PAD.top + S_CH} stroke="var(--card-border)" strokeWidth={0.5} />
                    <text x={scx(val)} y={S_PAD.top + S_CH + 20} textAnchor="middle" fill="var(--foreground-muted)" fontSize={10}>{val}%</text>
                  </g>
                ))}
                <line x1={scx(40)} y1={S_PAD.top} x2={scx(40)} y2={S_PAD.top + S_CH} stroke="#EF4444" strokeWidth={1.5} strokeDasharray="6 4" />
                <text x={scx(40) + 4} y={S_PAD.top + 12} fill="#EF4444" fontSize={9} fontWeight={600}>40%</text>
                {dots.map((dot, i) => (
                  <circle key={i} cx={scx(dot.x)} cy={scy(dot.y)} r={4} fill={dot.color} opacity={0.75}>
                    <title>{dot.label}: T-loss {dot.x.toFixed(1)}%, TFR {dot.y.toFixed(2)}</title>
                  </circle>
                ))}
                <line x1={S_PAD.left} y1={S_PAD.top} x2={S_PAD.left} y2={S_PAD.top + S_CH} stroke="var(--card-border)" strokeWidth={1} />
                <line x1={S_PAD.left} y1={S_PAD.top + S_CH} x2={S_W - S_PAD.right} y2={S_PAD.top + S_CH} stroke="var(--card-border)" strokeWidth={1} />
                <text x={S_PAD.left - 8} y={S_PAD.top - 12} fill="var(--foreground-muted)" fontSize={10} fontWeight={600}>{t.tTfrYLabel}</text>
                <text x={S_W - S_PAD.right} y={S_PAD.top + S_CH + 42} textAnchor="end" fill="var(--foreground-muted)" fontSize={10} fontWeight={600}>{t.tTfrXLabel}</text>
              </svg>
            </div>
          </div>
        );
      })()}

      <p
        className="text-xs leading-relaxed mt-4"
        style={{ color: "var(--foreground-muted)" }}
      >
        {t.caveat}
      </p>
    </div>
  );
}
