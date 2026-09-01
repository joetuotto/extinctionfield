"use client";

import { useState, useCallback, useMemo } from "react";

/* ─── layout constants ──────────────────────────────────────────────── */
const PAD = { top: 56, right: 30, bottom: 52, left: 30 };
const W = 960;
const H = 580;
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const YEAR_MIN = -3500;
const YEAR_MAX = 2100;

/* ─── colors (CSS-var theming) ──────────────────────────────────────── */
const C = {
  grid: "var(--card-border)",
  text: "var(--foreground-muted)",
  title: "var(--foreground)",
  bg: "var(--card-bg)",
  border: "var(--card-border)",
  minimaFill: "rgba(59,130,246,0.12)",
  electrification: "var(--status-refuted)",
  renaissanceDot: "#f59e0b",
};

/* ─── helpers ───────────────────────────────────────────────────────── */
function yearToX(year: number): number {
  return PAD.left + ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * CW;
}

function biocapColor(biocap: number): string {
  // green (high) → amber (mid) → red (low)
  if (biocap >= 0.75) {
    const t = (biocap - 0.75) / 0.25;
    const r = Math.round(245 - t * 229);
    const g = Math.round(158 + t * 73);
    const b = Math.round(11 + t * 67);
    return `rgb(${r},${g},${b})`;
  }
  const t = biocap / 0.75;
  const r = Math.round(239);
  const g = Math.round(68 + t * 90);
  const b = Math.round(68 - t * 57);
  return `rgb(${r},${g},${b})`;
}

/* ─── data ──────────────────────────────────────────────────────────── */
interface Empire {
  id: string;
  name: string;
  start: number;
  end: number;
  biocap: number;
  desc: string;
}

const EMPIRES: Empire[] = [
  { id: "mesopotamia", name: "Mesopotamia", start: -3500, end: -539, biocap: 0.90, desc: "Fertile Crescent city-states; high baseline biological capacity from irrigated agriculture." },
  { id: "egypt", name: "Egypt", start: -3100, end: -30, biocap: 0.85, desc: "Nile-based civilization; stable agricultural BioCap sustained over millennia." },
  { id: "greece", name: "Classical Greece", start: -800, end: -146, biocap: 0.80, desc: "Mediterranean poleis; moderate BioCap constrained by rocky terrain." },
  { id: "rome", name: "Rome", start: -509, end: 476, biocap: 0.70, desc: "Republic to Empire; BioCap declined with urbanization and lead exposure." },
  { id: "byzantine", name: "Byzantine", start: 330, end: 1453, biocap: 0.72, desc: "Eastern Roman continuation; maintained moderate BioCap through agricultural reforms." },
  { id: "arab", name: "Arab / Islamic", start: 632, end: 1258, biocap: 0.75, desc: "Caliphate era; agricultural revolution sustained BioCap across arid regions." },
  { id: "mongol", name: "Mongol", start: 1206, end: 1368, biocap: 0.85, desc: "Steppe empire; high BioCap from nomadic lifestyle and low EMF exposure." },
  { id: "ottoman", name: "Ottoman", start: 1299, end: 1922, biocap: 0.68, desc: "Multi-continental empire; gradual BioCap erosion through urbanization." },
  { id: "spanish", name: "Spanish", start: 1492, end: 1898, biocap: 0.65, desc: "Colonial empire; BioCap decline began with early industrialization." },
  { id: "british", name: "British", start: 1588, end: 1997, biocap: 0.55, desc: "Industrial pioneer; significant BioCap decline from electromagnetic saturation post-1880." },
  { id: "american", name: "American", start: 1776, end: 2026, biocap: 0.40, desc: "Most electrified civilization in history; steepest BioCap decline trajectory." },
];

interface SolarMinimum {
  name: string;
  start: number;
  end: number;
}

const SOLAR_MINIMA: SolarMinimum[] = [
  { name: "Oort", start: 1010, end: 1050 },
  { name: "Wolf", start: 1280, end: 1350 },
  { name: "Spörer", start: 1460, end: 1550 },
  { name: "Maunder", start: 1645, end: 1715 },
  { name: "Dalton", start: 1790, end: 1830 },
  { name: "Modern", start: 2020, end: 2053 },
];

interface RenaissanceMarker {
  year: number;
  label: string;
}

const RENAISSANCE_MARKERS: RenaissanceMarker[] = [
  { year: 1500, label: "Italian Renaissance" },
  { year: 1680, label: "Scientific Revolution" },
  { year: 1688, label: "Glorious Revolution" },
  { year: 1810, label: "Romanticism" },
  { year: 1815, label: "Waterloo" },
];

/* ─── sub-components ────────────────────────────────────────────────── */

function SolarMinimaBands() {
  return (
    <g>
      {SOLAR_MINIMA.map((m) => {
        const x1 = yearToX(m.start);
        const x2 = yearToX(m.end);
        return (
          <g key={m.name}>
            <rect
              x={x1}
              y={PAD.top}
              width={x2 - x1}
              height={CH}
              fill={C.minimaFill}
            />
            <text
              x={(x1 + x2) / 2}
              y={PAD.top - 6}
              textAnchor="middle"
              fontSize={7}
              fill="var(--chart-series-1)"
              fontStyle="italic"
            >
              {m.name}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function ElectrificationLine() {
  const x = yearToX(1880);
  return (
    <g>
      <line
        x1={x}
        x2={x}
        y1={PAD.top}
        y2={PAD.top + CH}
        stroke={C.electrification}
        strokeWidth={1.5}
        strokeDasharray="6,3"
      />
      <text
        x={x + 4}
        y={PAD.top + 14}
        fontSize={8}
        fontWeight={600}
        fill={C.electrification}
      >
        1880 Electrification
      </text>
    </g>
  );
}

function RenaissanceDots({
  onHover,
}: {
  onHover: (label: string | null, x: number, y: number) => void;
}) {
  const markerY = PAD.top + CH + 18;
  return (
    <g>
      {RENAISSANCE_MARKERS.map((m) => {
        const cx = yearToX(m.year);
        return (
          <g
            key={m.year}
            onMouseEnter={(e) => {
              const svg = (e.target as SVGElement).ownerSVGElement;
              if (!svg) return;
              const pt = svg.createSVGPoint();
              pt.x = e.clientX;
              pt.y = e.clientY;
              const svgPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());
              onHover(m.label, svgPt.x, svgPt.y);
            }}
            onMouseLeave={() => onHover(null, 0, 0)}
            style={{ cursor: "pointer" }}
          >
            <polygon
              points={`${cx},${markerY - 5} ${cx + 4},${markerY} ${cx},${markerY + 5} ${cx - 4},${markerY}`}
              fill={C.renaissanceDot}
              stroke="rgba(245,158,11,0.5)"
              strokeWidth={0.5}
            />
          </g>
        );
      })}
    </g>
  );
}

function XAxis() {
  const ticks: number[] = [];
  for (let yr = -3000; yr <= 2000; yr += 500) ticks.push(yr);
  return (
    <g>
      {ticks.map((yr) => {
        const x = yearToX(yr);
        return (
          <g key={yr}>
            <line x1={x} x2={x} y1={PAD.top + CH} y2={PAD.top + CH + 5} stroke={C.grid} strokeWidth={0.5} />
            <text x={x} y={PAD.top + CH + 36} textAnchor="middle" fontSize={9} fill={C.text}>
              {yr < 0 ? `${Math.abs(yr)} BC` : `${yr}`}
            </text>
          </g>
        );
      })}
      <line x1={PAD.left} x2={PAD.left + CW} y1={PAD.top + CH} y2={PAD.top + CH} stroke={C.grid} strokeWidth={0.5} />
    </g>
  );
}

function BiocapCurve({ empire, barY, barH }: { empire: Empire; barY: number; barH: number }) {
  const pts = 40;
  const span = empire.end - empire.start;
  let d = "";
  for (let i = 0; i <= pts; i++) {
    const t = i / pts;
    const yr = empire.start + t * span;
    // Decay curve with solar wobble
    const decay = empire.biocap - (1 - empire.biocap) * 0.3 * Math.pow(t, 1.5);
    const solar = 0.04 * Math.sin(t * Math.PI * 6) * (1 - t * 0.4);
    const val = Math.max(0.1, Math.min(1, decay + solar));
    const x = yearToX(yr);
    const y = barY + barH * (1 - val);
    d += i === 0 ? `M${x},${y}` : ` L${x},${y}`;
  }
  return <path d={d} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={1} />;
}

/* ─── main component ────────────────────────────────────────────────── */

export function CivilizationTimeline({ locale }: { locale: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const barH = Math.min(32, (CH - 20) / EMPIRES.length - 4);
  const barGap = (CH - EMPIRES.length * barH) / (EMPIRES.length + 1);

  const empirePositions = useMemo(() => {
    return EMPIRES.map((emp, i) => ({
      ...emp,
      y: PAD.top + barGap + i * (barH + barGap),
    }));
  }, [barH, barGap]);

  const handleEmpireClick = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleRenaissanceHover = useCallback((label: string | null, x: number, y: number) => {
    if (label) {
      setTooltip({ text: label, x, y });
    } else {
      setTooltip(null);
    }
  }, []);

  const selected = selectedId ? EMPIRES.find((e) => e.id === selectedId) : null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[700px]"
          role="img"
          aria-label="Civilization Timeline from 3500 BC to 2100 AD"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {/* title */}
          <text x={W / 2} y={24} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.title}>
            {locale === "fi" ? "Sivilisaatioiden aikajana" : locale === "ja" ? "文明のタイムライン" : locale === "fr" ? "Chronologie des civilisations" : locale === "ko" ? "문명 타임라인" : "Civilization Timeline"}
          </text>
          <text x={W / 2} y={40} textAnchor="middle" fontSize={9} fill={C.text}>
            {locale === "fi" ? "Horisontaalipalkit: valtakunnat | Siniset vyöhykkeet: auringon minimit | Punainen: sähköistyminen 1880" : locale === "ja" ? "水平バー: 帝国 | 青帯: 太陽極小期 | 赤: 1880年電化" : locale === "fr" ? "Barres: empires | Bandes bleues: minima solaires | Rouge: électrification 1880" : locale === "ko" ? "막대: 제국 | 파란 띠: 태양 극소기 | 빨간선: 1880년 전기화" : "Horizontal bars: empires | Blue bands: grand solar minima | Red dashed: 1880 electrification"}
          </text>

          {/* background solar minima bands */}
          <SolarMinimaBands />

          {/* electrification line */}
          <ElectrificationLine />

          {/* empire bars */}
          {empirePositions.map((emp) => {
            const x1 = yearToX(emp.start);
            const x2 = yearToX(emp.end);
            const isHovered = hoveredId === emp.id;
            const isSelected = selectedId === emp.id;
            const barWidth = Math.max(x2 - x1, 2);
            const opacity = hoveredId && !isHovered && !isSelected ? 0.4 : 1;

            return (
              <g
                key={emp.id}
                onClick={() => handleEmpireClick(emp.id)}
                onMouseEnter={() => setHoveredId(emp.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: "pointer", transition: "opacity 0.15s" }}
                opacity={opacity}
              >
                {/* bar background */}
                <rect
                  x={x1}
                  y={emp.y}
                  width={barWidth}
                  height={barH}
                  rx={3}
                  fill={biocapColor(emp.biocap)}
                  stroke={isSelected ? C.title : "none"}
                  strokeWidth={isSelected ? 1.5 : 0}
                  opacity={0.85}
                />

                {/* BioCap micro-curve inside bar */}
                <clipPath id={`clip-${emp.id}`}>
                  <rect x={x1} y={emp.y} width={barWidth} height={barH} rx={3} />
                </clipPath>
                <g clipPath={`url(#clip-${emp.id})`}>
                  <BiocapCurve empire={emp} barY={emp.y} barH={barH} />
                </g>

                {/* label */}
                {barWidth > 50 ? (
                  <text
                    x={x1 + 6}
                    y={emp.y + barH / 2 + 3.5}
                    fontSize={barH > 20 ? 9 : 7.5}
                    fontWeight={600}
                    fill="#fff"
                    stroke="rgba(0,0,0,0.72)"
                    strokeWidth={2.25}
                    paintOrder="stroke"
                    strokeLinejoin="round"
                    style={{ pointerEvents: "none" }}
                  >
                    {emp.name}
                  </text>
                ) : null}

                {/* hover outline */}
                {isHovered && !isSelected && (
                  <rect
                    x={x1 - 1}
                    y={emp.y - 1}
                    width={barWidth + 2}
                    height={barH + 2}
                    rx={4}
                    fill="none"
                    stroke={C.title}
                    strokeWidth={1}
                    opacity={0.5}
                  />
                )}
              </g>
            );
          })}

          {/* renaissance markers */}
          <RenaissanceDots onHover={handleRenaissanceHover} />

          {/* x-axis */}
          <XAxis />

          {/* tooltip for renaissance markers */}
          {tooltip && (
            <g>
              <rect
                x={tooltip.x - 50}
                y={tooltip.y - 24}
                width={100}
                height={18}
                rx={4}
                fill="var(--foreground)"
                opacity={0.9}
              />
              <text
                x={tooltip.x}
                y={tooltip.y - 12}
                textAnchor="middle"
                fontSize={8}
                fontWeight={500}
                fill="var(--background)"
              >
                {tooltip.text}
              </text>
            </g>
          )}

          {/* BioCap legend */}
          <g>
            <text x={PAD.left} y={H - 4} fontSize={8} fill={C.text}>
              BioCap:
            </text>
            {[1.0, 0.85, 0.7, 0.55, 0.4].map((v, i) => (
              <g key={v}>
                <rect
                  x={PAD.left + 40 + i * 36}
                  y={H - 14}
                  width={28}
                  height={8}
                  rx={2}
                  fill={biocapColor(v)}
                  opacity={0.85}
                />
                <text
                  x={PAD.left + 40 + i * 36 + 14}
                  y={H - 3}
                  textAnchor="middle"
                  fontSize={7}
                  fill={C.text}
                >
                  {v.toFixed(2)}
                </text>
              </g>
            ))}
          </g>

          {/* gold diamond legend */}
          <g>
            <polygon
              points={`${PAD.left + 240},${H - 10} ${PAD.left + 244},${H - 6} ${PAD.left + 240},${H - 2} ${PAD.left + 236},${H - 6}`}
              fill={C.renaissanceDot}
            />
            <text x={PAD.left + 250} y={H - 3} fontSize={8} fill={C.text}>
              Renaissance / revolution markers
            </text>
          </g>
        </svg>
      </div>

      {/* detail panel */}
      {selected && (
        <div className="rounded-xl border border-border bg-card p-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-sm"
                  style={{ backgroundColor: biocapColor(selected.biocap) }}
                />
                {selected.name}
              </h3>
              <p className="text-sm text-foreground-muted mt-1">
                {selected.start < 0 ? `${Math.abs(selected.start)} BC` : selected.start}
                {" – "}
                {selected.end < 0 ? `${Math.abs(selected.end)} BC` : selected.end === 2026 ? "present" : selected.end}
                {" · "}
                {selected.end - selected.start} years
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs text-foreground-muted">Est. peak BioCap</div>
              <div className="text-lg font-bold" style={{ color: biocapColor(selected.biocap) }}>
                {selected.biocap.toFixed(2)}
              </div>
            </div>
          </div>
          <p className="text-sm text-foreground-muted mt-3 leading-relaxed">{selected.desc}</p>

          {/* mini biocap curve */}
          <div className="mt-4">
            <div className="text-xs text-foreground-muted mb-1">Estimated BioCap trajectory</div>
            <svg viewBox="0 0 300 80" className="w-full max-w-sm" role="img" aria-label={`BioCap curve for ${selected.name}`}>
              <line x1={20} x2={280} y1={70} y2={70} stroke={C.grid} strokeWidth={0.5} />
              <line x1={20} x2={280} y1={10} y2={10} stroke={C.grid} strokeWidth={0.5} strokeDasharray="2,2" />
              <text x={16} y={14} textAnchor="end" fontSize={7} fill={C.text}>1.0</text>
              <text x={16} y={73} textAnchor="end" fontSize={7} fill={C.text}>0</text>
              <text x={20} y={79} fontSize={7} fill={C.text}>
                {selected.start < 0 ? `${Math.abs(selected.start)} BC` : selected.start}
              </text>
              <text x={280} y={79} textAnchor="end" fontSize={7} fill={C.text}>
                {selected.end < 0 ? `${Math.abs(selected.end)} BC` : selected.end === 2026 ? "now" : selected.end}
              </text>
              {(() => {
                const pts = 60;
                let d = "";
                for (let i = 0; i <= pts; i++) {
                  const t = i / pts;
                  const decay = selected.biocap - (1 - selected.biocap) * 0.3 * Math.pow(t, 1.5);
                  const solar = 0.04 * Math.sin(t * Math.PI * 6) * (1 - t * 0.4);
                  const val = Math.max(0.1, Math.min(1, decay + solar));
                  const x = 20 + t * 260;
                  const y = 70 - val * 60;
                  d += i === 0 ? `M${x},${y}` : ` L${x},${y}`;
                }
                return (
                  <>
                    <path d={d + ` L280,70 L20,70 Z`} fill={biocapColor(selected.biocap)} opacity={0.15} />
                    <path d={d} fill="none" stroke={biocapColor(selected.biocap)} strokeWidth={1.5} />
                  </>
                );
              })()}
            </svg>
          </div>

          <button
            className="mt-3 text-xs text-foreground-muted hover:text-foreground transition-colors"
            onClick={() => setSelectedId(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
