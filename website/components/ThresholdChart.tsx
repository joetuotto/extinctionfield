"use client";

import { useState } from "react";
import { THRESHOLD_COUNTRIES, computeTIndex } from "@/lib/thresholdModel";

const COPY = {
  en: {
    tIndexLabel: "T-index (baseline = 100)",
    tfrLabel: "TFR",
    yearLabel: "Year",
    thresholdLabel: "40% loss threshold",
    projectionLabel: "Projection range",
  },
  fi: {
    tIndexLabel: "T-indeksi (perustaso = 100)",
    tfrLabel: "TFR",
    yearLabel: "Vuosi",
    thresholdLabel: "40 %:n menetyskynnys",
    projectionLabel: "Ennustealue",
  },
};

const PAD = { top: 28, right: 64, bottom: 48, left: 56 };
const W = 800;
const H = 420;
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const YEAR_MIN = 1970;
const YEAR_MAX = 2040;
const T_MIN = 0;
const T_MAX = 100;
const TFR_MIN = 0;
const TFR_MAX = 5;
const THRESHOLD = 60;

function xScale(year: number) {
  return PAD.left + ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * CW;
}

function yLeftScale(t: number) {
  return PAD.top + ((T_MAX - t) / (T_MAX - T_MIN)) * CH;
}

function yRightScale(tfr: number) {
  return PAD.top + ((TFR_MAX - tfr) / (TFR_MAX - TFR_MIN)) * CH;
}

export function ThresholdChart({ locale }: { locale: string }) {
  const [selectedId, setSelectedId] = useState("finland");
  const lang = locale === "fi" ? "fi" : "en";
  const copy = COPY[lang];
  const country = THRESHOLD_COUNTRIES.find((c) => c.id === selectedId) ?? THRESHOLD_COUNTRIES[0];

  const tCurvePoints: string[] = [];
  for (let yr = YEAR_MIN; yr <= YEAR_MAX; yr++) {
    const t = computeTIndex(yr, YEAR_MIN, country.tDeclinePct);
    tCurvePoints.push(`${xScale(yr)},${yLeftScale(t)}`);
  }
  const tCurveSolid = tCurvePoints.slice(0, 2025 - YEAR_MIN + 1).join(" ");
  const tCurveDashed = tCurvePoints.slice(2025 - YEAR_MIN).join(" ");

  const tfrDataPoints = country.tfrHistory.filter(
    (p) => p.year >= YEAR_MIN && p.year <= 2025
  );

  const lastTfr = tfrDataPoints[tfrDataPoints.length - 1];
  const proj2030Mid =
    (country.tfrProjection2030[0] + country.tfrProjection2030[1]) / 2;
  const proj2035Mid =
    (country.tfrProjection2035[0] + country.tfrProjection2035[1]) / 2;

  const projLine = lastTfr
    ? [
        { year: lastTfr.year, tfr: lastTfr.tfr },
        { year: 2030, tfr: proj2030Mid },
        { year: 2035, tfr: proj2035Mid },
      ]
    : [];
  const projLinePath = projLine
    .map((p) => `${xScale(p.year)},${yRightScale(p.tfr)}`)
    .join(" ");

  const bandPath = lastTfr
    ? [
        `${xScale(lastTfr.year)},${yRightScale(lastTfr.tfr)}`,
        `${xScale(2030)},${yRightScale(country.tfrProjection2030[1])}`,
        `${xScale(2035)},${yRightScale(country.tfrProjection2035[1])}`,
        `${xScale(2035)},${yRightScale(country.tfrProjection2035[0])}`,
        `${xScale(2030)},${yRightScale(country.tfrProjection2030[0])}`,
        `${xScale(lastTfr.year)},${yRightScale(lastTfr.tfr)}`,
      ].join(" ")
    : "";

  const thresholdY = yLeftScale(THRESHOLD);
  const belowClipPath = `M${PAD.left},${thresholdY} L${PAD.left + CW},${thresholdY} L${PAD.left + CW},${PAD.top + CH} L${PAD.left},${PAD.top + CH} Z`;

  const yearTicks = [1970, 1980, 1990, 2000, 2010, 2020, 2030, 2040];
  const tTicks = [0, 20, 40, 60, 80, 100];
  const tfrTicks = [0, 1, 2, 3, 4, 5];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {THRESHOLD_COUNTRIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            style={{
              backgroundColor:
                selectedId === c.id ? c.color : "transparent",
              color: selectedId === c.id ? "#fff" : c.color,
              border: `1.5px solid ${c.color}`,
            }}
          >
            {lang === "fi" ? c.nameFi : c.nameEn}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-full min-w-[600px]"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          {yearTicks.map((yr) => (
            <line
              key={`gx-${yr}`}
              x1={xScale(yr)}
              y1={PAD.top}
              x2={xScale(yr)}
              y2={PAD.top + CH}
              stroke="var(--foreground-muted)"
              strokeWidth={0.5}
              opacity={0.3}
            />
          ))}
          {tTicks.map((t) => (
            <line
              key={`gy-${t}`}
              x1={PAD.left}
              y1={yLeftScale(t)}
              x2={PAD.left + CW}
              y2={yLeftScale(t)}
              stroke="var(--foreground-muted)"
              strokeWidth={0.5}
              opacity={0.3}
            />
          ))}

          <defs>
            <clipPath id="below-threshold">
              <path d={belowClipPath} />
            </clipPath>
          </defs>
          <rect
            x={PAD.left}
            y={thresholdY}
            width={CW}
            height={PAD.top + CH - thresholdY}
            fill="#EF4444"
            opacity={0.08}
          />

          <line
            x1={PAD.left}
            y1={thresholdY}
            x2={PAD.left + CW}
            y2={thresholdY}
            stroke="#EF4444"
            strokeWidth={1.5}
            strokeDasharray="6 4"
          />
          <text
            x={PAD.left + CW - 4}
            y={thresholdY - 5}
            textAnchor="end"
            fill="#EF4444"
            fontSize={10}
            fontWeight={500}
          >
            {copy.thresholdLabel}
          </text>

          <polyline
            points={tCurveSolid}
            fill="none"
            stroke={country.color}
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
          {tCurveDashed && (
            <polyline
              points={tCurveDashed}
              fill="none"
              stroke={country.color}
              strokeWidth={2}
              strokeDasharray="6 4"
              strokeLinejoin="round"
              opacity={0.6}
            />
          )}

          {bandPath && (
            <polygon
              points={bandPath}
              fill={country.color}
              opacity={0.12}
            />
          )}

          {tfrDataPoints.map((p) => (
            <circle
              key={`tfr-${p.year}`}
              cx={xScale(p.year)}
              cy={yRightScale(p.tfr)}
              r={3.5}
              fill={country.color}
              stroke="var(--card-bg)"
              strokeWidth={1.5}
            />
          ))}

          {projLinePath && (
            <polyline
              points={projLinePath}
              fill="none"
              stroke={country.color}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              opacity={0.5}
            />
          )}

          <line
            x1={PAD.left}
            y1={PAD.top}
            x2={PAD.left}
            y2={PAD.top + CH}
            stroke="var(--foreground-muted)"
            strokeWidth={1}
          />
          <line
            x1={PAD.left + CW}
            y1={PAD.top}
            x2={PAD.left + CW}
            y2={PAD.top + CH}
            stroke="var(--foreground-muted)"
            strokeWidth={1}
          />
          <line
            x1={PAD.left}
            y1={PAD.top + CH}
            x2={PAD.left + CW}
            y2={PAD.top + CH}
            stroke="var(--foreground-muted)"
            strokeWidth={1}
          />

          {yearTicks.map((yr) => (
            <text
              key={`xl-${yr}`}
              x={xScale(yr)}
              y={PAD.top + CH + 18}
              textAnchor="middle"
              fill="var(--foreground)"
              fontSize={10}
            >
              {yr}
            </text>
          ))}
          <text
            x={PAD.left + CW / 2}
            y={PAD.top + CH + 38}
            textAnchor="middle"
            fill="var(--foreground-muted)"
            fontSize={11}
          >
            {copy.yearLabel}
          </text>

          {tTicks.map((t) => (
            <text
              key={`yl-${t}`}
              x={PAD.left - 8}
              y={yLeftScale(t) + 4}
              textAnchor="end"
              fill="var(--foreground)"
              fontSize={10}
            >
              {t}
            </text>
          ))}
          <text
            x={14}
            y={PAD.top + CH / 2}
            textAnchor="middle"
            fill={country.color}
            fontSize={11}
            fontWeight={500}
            transform={`rotate(-90, 14, ${PAD.top + CH / 2})`}
          >
            {copy.tIndexLabel}
          </text>

          {tfrTicks.map((v) => (
            <text
              key={`yr-${v}`}
              x={PAD.left + CW + 8}
              y={yRightScale(v) + 4}
              textAnchor="start"
              fill="var(--foreground)"
              fontSize={10}
            >
              {v.toFixed(1)}
            </text>
          ))}
          <text
            x={W - 8}
            y={PAD.top + CH / 2}
            textAnchor="middle"
            fill="var(--foreground-muted)"
            fontSize={11}
            fontWeight={500}
            transform={`rotate(90, ${W - 8}, ${PAD.top + CH / 2})`}
          >
            {copy.tfrLabel}
          </text>
        </svg>
      </div>
    </div>
  );
}
