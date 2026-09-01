"use client";

import { useEffect, useState } from "react";

/* ─── types ────────────────────────────────────────────────────────── */
interface BandpassData {
  ssn: number[][];
  tfr: Record<string, number[][]>;
  groups: { nordic: string[]; south_europe: string[] };
  geomag_lat_deg: Record<string, number>;
  country_names: Record<string, string>;
}

/* ─── layout ───────────────────────────────────────────────────────── */
const P = { top: 32, right: 16, bottom: 40, left: 48 };
const W = 460;
const H = 280;
const CW = W - P.left - P.right;
const CH = H - P.top - P.bottom;

const COL = {
  nordic: "#3b82f6",
  south: "#ef4444",
  ssn: "#f59e0b",
  grid: "var(--card-border)",
  text: "var(--foreground-muted)",
  title: "var(--foreground)",
};

/* ─── math helpers ─────────────────────────────────────────────────── */
function movingAvg(arr: number[], w: number): (number | null)[] {
  const half = Math.floor(w / 2);
  return arr.map((_, i) => {
    if (i < half || i >= arr.length - half) return null;
    let s = 0;
    for (let j = i - half; j <= i + half; j++) s += arr[j];
    return s / w;
  });
}

function detrend(vals: number[], window = 11): number[] {
  const ma = movingAvg(vals, window);
  return vals.map((v, i) => (ma[i] !== null ? v - ma[i]! : 0));
}

function pearsonR(a: number[], b: number[]): number {
  const n = Math.min(a.length, b.length);
  let sumA = 0, sumB = 0, sumAB = 0, sumA2 = 0, sumB2 = 0;
  for (let i = 0; i < n; i++) {
    sumA += a[i]; sumB += b[i]; sumAB += a[i] * b[i];
    sumA2 += a[i] * a[i]; sumB2 += b[i] * b[i];
  }
  const num = n * sumAB - sumA * sumB;
  const den = Math.sqrt((n * sumA2 - sumA * sumA) * (n * sumB2 - sumB * sumB));
  return den === 0 ? 0 : num / den;
}

function groupMean(data: BandpassData, countries: string[], startYear: number, endYear: number): number[] {
  const years: number[] = [];
  for (let y = startYear; y <= endYear; y++) years.push(y);
  return years.map(y => {
    let sum = 0, cnt = 0;
    for (const c of countries) {
      const row = data.tfr[c]?.find(r => r[0] === y);
      if (row) { sum += row[1]; cnt++; }
    }
    return cnt > 0 ? sum / cnt : 0;
  });
}

function ssnSeries(data: BandpassData, startYear: number, endYear: number): number[] {
  const out: number[] = [];
  for (let y = startYear; y <= endYear; y++) {
    const row = data.ssn.find(r => r[0] === y);
    out.push(row ? row[1] : 0);
  }
  return out;
}

/* ─── SVG helpers ──────────────────────────────────────────────────── */
function x(v: number, lo: number, hi: number) {
  return P.left + ((v - lo) / (hi - lo)) * CW;
}
function y(v: number, lo: number, hi: number) {
  return P.top + CH - ((v - lo) / (hi - lo)) * CH;
}

function GridAndAxes({ xMin, xMax, yLabel, step = 10 }: { xMin: number; xMax: number; yLabel: string; step?: number }) {
  const ticks: number[] = [];
  for (let t = xMin; t <= xMax; t += step) ticks.push(t);
  return (
    <g>
      <line x1={P.left} y1={P.top} x2={P.left} y2={P.top + CH} stroke={COL.grid} strokeWidth={1} />
      <line x1={P.left} y1={P.top + CH} x2={P.left + CW} y2={P.top + CH} stroke={COL.grid} strokeWidth={1} />
      {ticks.map(t => (
        <g key={t}>
          <line x1={x(t, xMin, xMax)} y1={P.top} x2={x(t, xMin, xMax)} y2={P.top + CH} stroke={COL.grid} strokeWidth={0.5} opacity={0.4} />
          <text x={x(t, xMin, xMax)} y={P.top + CH + 14} textAnchor="middle" fontSize={9} fill={COL.text}>{t}</text>
        </g>
      ))}
      <text x={P.left - 6} y={P.top - 8} textAnchor="end" fontSize={9} fill={COL.text}>{yLabel}</text>
    </g>
  );
}

function polyline(pts: [number, number][], xMin: number, xMax: number, yMin: number, yMax: number, color: string, width = 1.5, opacity = 1) {
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${x(p[0], xMin, xMax).toFixed(1)},${y(p[1], yMin, yMax).toFixed(1)}`).join(" ");
  return <path d={d} fill="none" stroke={color} strokeWidth={width} opacity={opacity} />;
}

/* ─── Chart 1: Detrended TFR overlay ──────────────────────────────── */
function DetrendedOverlay({ data }: { data: BandpassData }) {
  const startYear = 1966;
  const endYear = 2018;
  const years: number[] = [];
  for (let yr = startYear; yr <= endYear; yr++) years.push(yr);

  const nordicRaw = groupMean(data, data.groups.nordic, startYear, endYear);
  const southRaw = groupMean(data, data.groups.south_europe, startYear, endYear);
  const ssn = ssnSeries(data, startYear, endYear);

  const nordicDet = detrend(nordicRaw, 11);
  const southDet = detrend(southRaw, 11);
  const ssnDet = detrend(ssn, 11);

  const allDet = [...nordicDet, ...southDet];
  const detMin = Math.min(...allDet) * 1.1;
  const detMax = Math.max(...allDet) * 1.1;

  const nordicPts: [number, number][] = years.map((yr, i) => [yr, nordicDet[i]]);
  const southPts: [number, number][] = years.map((yr, i) => [yr, southDet[i]]);

  const ssnNorm = ssnDet.map(v => v / (Math.max(...ssnDet.map(Math.abs)) || 1) * detMax * 0.8);
  const ssnPts: [number, number][] = years.map((yr, i) => [yr, ssnNorm[i]]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <text x={W / 2} y={14} textAnchor="middle" fontSize={11} fontWeight={600} fill={COL.title}>
        Detrended TFR: Nordic vs Southern Europe
      </text>
      <GridAndAxes xMin={startYear} xMax={endYear} yLabel="ΔTFR" />
      <line x1={P.left} y1={y(0, detMin, detMax)} x2={P.left + CW} y2={y(0, detMin, detMax)} stroke={COL.grid} strokeWidth={1} strokeDasharray="3,3" />
      {polyline(ssnPts, startYear, endYear, detMin, detMax, COL.ssn, 1, 0.3)}
      {polyline(southPts, startYear, endYear, detMin, detMax, COL.south, 1.5, 0.7)}
      {polyline(nordicPts, startYear, endYear, detMin, detMax, COL.nordic, 2)}
      <g transform={`translate(${P.left + 8}, ${P.top + 8})`}>
        <rect x={0} y={0} width={135} height={42} rx={4} fill="var(--card-bg)" fillOpacity={0.9} stroke={COL.grid} strokeWidth={0.5} />
        <line x1={6} y1={10} x2={22} y2={10} stroke={COL.nordic} strokeWidth={2} />
        <text x={26} y={13} fontSize={9} fill={COL.text}>Nordic (60–70° geomag)</text>
        <line x1={6} y1={22} x2={22} y2={22} stroke={COL.south} strokeWidth={2} />
        <text x={26} y={25} fontSize={9} fill={COL.text}>S. Europe (36–42° geomag)</text>
        <line x1={6} y1={34} x2={22} y2={34} stroke={COL.ssn} strokeWidth={1.5} opacity={0.4} />
        <text x={26} y={37} fontSize={9} fill={COL.text}>SSN (scaled)</text>
      </g>
    </svg>
  );
}

/* ─── Chart 2: Correlation vs Geomagnetic Latitude ────────────────── */
function CorrelationByLatitude({ data }: { data: BandpassData }) {
  const startYear = 1966;
  const endYear = 2018;
  const ssn = ssnSeries(data, startYear, endYear);
  const ssnDet = detrend(ssn, 11);
  const half = 5;

  const countries = Object.keys(data.tfr);
  const points: { code: string; lat: number; r: number; group: string }[] = [];

  for (const c of countries) {
    const vals: number[] = [];
    for (let yr = startYear; yr <= endYear; yr++) {
      const row = data.tfr[c]?.find(r => r[0] === yr);
      vals.push(row ? row[1] : 0);
    }
    const det = detrend(vals, 11);
    const trimA = det.slice(half, det.length - half);
    const trimB = ssnDet.slice(half, ssnDet.length - half);
    const r = Math.abs(pearsonR(trimA, trimB));
    const lat = data.geomag_lat_deg[c] || 0;
    const group = data.groups.nordic.includes(c) ? "nordic" : "south";
    points.push({ code: c, lat, r, group });
  }

  const latMin = 30;
  const latMax = 75;
  const rMin = 0;
  const rMax = 0.6;

  const sorted = [...points].sort((a, b) => a.lat - b.lat);
  const latArr = sorted.map(p => p.lat);
  const rArr = sorted.map(p => p.r);
  const trendR = pearsonR(latArr, rArr);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <text x={W / 2} y={14} textAnchor="middle" fontSize={11} fontWeight={600} fill={COL.title}>
        |r(ΔTFR, ΔSSN)| vs Geomagnetic Latitude
      </text>
      <GridAndAxes xMin={latMin} xMax={latMax} yLabel="|r|" step={10} />
      <text x={W / 2} y={H - 2} textAnchor="middle" fontSize={9} fill={COL.text}>Geomagnetic latitude (°N)</text>
      {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map(v => (
        <g key={v}>
          <line x1={P.left} y1={y(v, rMin, rMax)} x2={P.left + CW} y2={y(v, rMin, rMax)} stroke={COL.grid} strokeWidth={0.5} opacity={0.3} />
          <text x={P.left - 4} y={y(v, rMin, rMax) + 3} textAnchor="end" fontSize={8} fill={COL.text}>{v.toFixed(1)}</text>
        </g>
      ))}
      {sorted.length >= 2 && (() => {
        const x1Lat = latMin;
        const x2Lat = latMax;
        const meanLat = latArr.reduce((a, b) => a + b, 0) / latArr.length;
        const meanR = rArr.reduce((a, b) => a + b, 0) / rArr.length;
        let ssLat = 0, ssCross = 0;
        for (let i = 0; i < latArr.length; i++) {
          ssLat += (latArr[i] - meanLat) * (latArr[i] - meanLat);
          ssCross += (latArr[i] - meanLat) * (rArr[i] - meanR);
        }
        const slope = ssLat === 0 ? 0 : ssCross / ssLat;
        const intercept = meanR - slope * meanLat;
        const y1Val = slope * x1Lat + intercept;
        const y2Val = slope * x2Lat + intercept;
        return (
          <line
            x1={x(x1Lat, latMin, latMax)} y1={y(y1Val, rMin, rMax)}
            x2={x(x2Lat, latMin, latMax)} y2={y(y2Val, rMin, rMax)}
            stroke={COL.grid} strokeWidth={1} strokeDasharray="4,3" opacity={0.6}
          />
        );
      })()}
      {points.map(p => (
        <g key={p.code}>
          <circle
            cx={x(p.lat, latMin, latMax)} cy={y(p.r, rMin, rMax)} r={6}
            fill={p.group === "nordic" ? COL.nordic : COL.south}
            opacity={0.8}
          />
          <text
            x={x(p.lat, latMin, latMax)} y={y(p.r, rMin, rMax) - 9}
            textAnchor="middle" fontSize={8} fontWeight={500} fill={COL.title}
          >{p.code}</text>
        </g>
      ))}
      <text x={P.left + CW - 4} y={P.top + 16} textAnchor="end" fontSize={9} fill={COL.text}>
        trend r = {trendR.toFixed(2)}
      </text>
    </svg>
  );
}

/* ─── Chart 3: Nordic vs South raw TFR with SSN shading ───────────── */
function RawTfrComparison({ data }: { data: BandpassData }) {
  const startYear = 1975;
  const endYear = 2023;
  const years: number[] = [];
  for (let yr = startYear; yr <= endYear; yr++) years.push(yr);

  const nordic = groupMean(data, data.groups.nordic, startYear, endYear);
  const south = groupMean(data, data.groups.south_europe, startYear, endYear);
  const tfrMin = 1.0;
  const tfrMax = 2.3;

  const nordicPts: [number, number][] = years.map((yr, i) => [yr, nordic[i]]);
  const southPts: [number, number][] = years.map((yr, i) => [yr, south[i]]);

  const solarMaxYears = [1979, 1989, 2000, 2014];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <text x={W / 2} y={14} textAnchor="middle" fontSize={11} fontWeight={600} fill={COL.title}>
        TFR with solar cycle phases
      </text>
      <GridAndAxes xMin={startYear} xMax={endYear} yLabel="TFR" step={10} />
      {[1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2].map(v => (
        <g key={v}>
          <line x1={P.left} y1={y(v, tfrMin, tfrMax)} x2={P.left + CW} y2={y(v, tfrMin, tfrMax)} stroke={COL.grid} strokeWidth={0.5} opacity={0.3} />
          <text x={P.left - 4} y={y(v, tfrMin, tfrMax) + 3} textAnchor="end" fontSize={8} fill={COL.text}>{v.toFixed(1)}</text>
        </g>
      ))}
      {solarMaxYears.map(yr => (
        <rect key={yr} x={x(yr - 2, startYear, endYear)} y={P.top} width={x(yr + 2, startYear, endYear) - x(yr - 2, startYear, endYear)} height={CH} fill={COL.ssn} opacity={0.08} />
      ))}
      {polyline(southPts, startYear, endYear, tfrMin, tfrMax, COL.south, 2, 0.8)}
      {polyline(nordicPts, startYear, endYear, tfrMin, tfrMax, COL.nordic, 2)}
      <g transform={`translate(${P.left + CW - 140}, ${P.top + 8})`}>
        <rect x={0} y={0} width={136} height={42} rx={4} fill="var(--card-bg)" fillOpacity={0.9} stroke={COL.grid} strokeWidth={0.5} />
        <line x1={6} y1={10} x2={22} y2={10} stroke={COL.nordic} strokeWidth={2} />
        <text x={26} y={13} fontSize={9} fill={COL.text}>Nordic mean TFR</text>
        <line x1={6} y1={22} x2={22} y2={22} stroke={COL.south} strokeWidth={2} />
        <text x={26} y={25} fontSize={9} fill={COL.text}>S. Europe mean TFR</text>
        <rect x={6} y={30} width={16} height={6} fill={COL.ssn} opacity={0.2} />
        <text x={26} y={37} fontSize={9} fill={COL.text}>Solar maximum ±2yr</text>
      </g>
    </svg>
  );
}

/* ─── Chart 4: Per-country |r| bar chart ──────────────────────────── */
function CountryCorrelationBars({ data }: { data: BandpassData }) {
  const startYear = 1966;
  const endYear = 2018;
  const ssn = ssnSeries(data, startYear, endYear);
  const ssnDet = detrend(ssn, 11);
  const half = 5;

  const results: { code: string; name: string; r: number; lat: number; group: string }[] = [];

  for (const c of Object.keys(data.tfr)) {
    const vals: number[] = [];
    for (let yr = startYear; yr <= endYear; yr++) {
      const row = data.tfr[c]?.find(r => r[0] === yr);
      vals.push(row ? row[1] : 0);
    }
    const det = detrend(vals, 11);
    const trimA = det.slice(half, det.length - half);
    const trimB = ssnDet.slice(half, ssnDet.length - half);
    const r = Math.abs(pearsonR(trimA, trimB));
    const lat = data.geomag_lat_deg[c] || 0;
    const group = data.groups.nordic.includes(c) ? "nordic" : "south";
    results.push({ code: c, name: data.country_names[c] || c, r, lat, group });
  }

  results.sort((a, b) => b.lat - a.lat);

  const barH = 20;
  const gap = 4;
  const chartH = results.length * (barH + gap) + P.top + P.bottom;

  return (
    <svg viewBox={`0 0 ${W} ${chartH}`} className="w-full">
      <text x={W / 2} y={14} textAnchor="middle" fontSize={11} fontWeight={600} fill={COL.title}>
        |r(ΔTFR, ΔSSN)| by country (sorted by geomag. latitude)
      </text>
      {results.map((r, i) => {
        const barTop = P.top + i * (barH + gap);
        const barW = (r.r / 0.5) * (CW - 60);
        const color = r.group === "nordic" ? COL.nordic : COL.south;
        return (
          <g key={r.code}>
            <text x={P.left + 50} y={barTop + barH / 2 + 3} textAnchor="end" fontSize={9} fill={COL.text}>
              {r.code} ({r.lat.toFixed(0)}°)
            </text>
            <rect x={P.left + 56} y={barTop + 2} width={Math.max(0, barW)} height={barH - 4} rx={3} fill={color} opacity={0.7} />
            <text x={P.left + 60 + barW} y={barTop + barH / 2 + 3} fontSize={9} fontWeight={500} fill={COL.title}>
              {r.r.toFixed(3)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════ */
export function EmpiricalSolarCharts() {
  const [data, setData] = useState<BandpassData | null>(null);

  useEffect(() => {
    fetch("/data/solar_bandpass.json")
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {});
  }, []);

  if (!data) return <div className="text-sm text-foreground-muted">Loading empirical data...</div>;

  return (
    <div className="mt-8 max-w-6xl">
      <h3 className="text-sm font-semibold text-foreground mb-1">
        Empirical data: latitude-dependent solar-cycle signal in TFR
      </h3>
      <p className="text-xs text-foreground-muted mb-4">
        World Bank TFR (1960–2023) × SILSO sunspot number V2.0. Detrended with 11-year moving average.
        Nordic countries (geomagnetic latitude 57–70°N) compared with Southern Europe (36–42°N).
        BERM prediction SOLAR-2: higher geomagnetic latitude → stronger solar-cycle modulation.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border border-card-border bg-card-bg p-3">
          <div className="chart-scroll [&>svg]:min-w-[400px]">
            <RawTfrComparison data={data} />
          </div>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-3">
          <div className="chart-scroll [&>svg]:min-w-[400px]">
            <DetrendedOverlay data={data} />
          </div>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-3">
          <div className="chart-scroll [&>svg]:min-w-[400px]">
            <CorrelationByLatitude data={data} />
          </div>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-3">
          <div className="chart-scroll [&>svg]:min-w-[400px]">
            <CountryCorrelationBars data={data} />
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs text-foreground-muted">
        Source: World Bank (CC BY-4.0), SILSO (CC BY-NC 4.0). Accessed 2026-08-31.
        This is exploratory pattern visualization, not a causal claim — confounders (economic cycles, policy) not controlled.
      </p>
    </div>
  );
}
