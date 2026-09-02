"use client";

import { useState, useCallback } from "react";
import model from "@/public/data/berm_cultural_energy_model.json";

/* ─── model data (berm/export_cultural_energy.py → regions) ─────────── */
type RegionRow = {
  lat: number;
  electrification_year: number;
  biocap: Record<string, number>;
  tfr_2020: number;
};
const MODEL_REGIONS = model.regions.rows as Record<string, RegionRow>;
const REF_YEAR = String(model.metadata.reference_year);

function regionBiocap(...names: string[]): number {
  const vals = names.map((n) => MODEL_REGIONS[n].biocap[REF_YEAR]);
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}
function regionTfr(...names: string[]): number {
  const vals = names.map((n) => MODEL_REGIONS[n].tfr_2020);
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}
function electYear(...names: string[]): string {
  const ys = names.map((n) => MODEL_REGIONS[n].electrification_year);
  const lo = Math.min(...ys);
  const hi = Math.max(...ys);
  return lo === hi ? `${lo}` : `${lo}–${hi}`;
}

/* ─── layout ────────────────────────────────────────────────────────── */
const W = 900;
const H = 500;

/* ─── colors (theme-aware) ──────────────────────────────────────────── */
const C = {
  grid: "var(--card-border)",
  text: "var(--foreground-muted)",
  title: "var(--foreground)",
  bg: "var(--card-bg)",
  border: "var(--card-border)",
  tooltipBg: "var(--card-bg)",
  tooltipBorder: "var(--card-border)",
};

/* ─── region data ───────────────────────────────────────────────────── */
interface Region {
  id: string;
  name: string;
  biocap: number;
  tfr: number;
  electYear: string;
  /** center point for tooltip/arrow anchoring */
  cx: number;
  cy: number;
  /** simplified SVG path for the region shape */
  path: string;
}

/*
 * BioCap, TFR and electrification year come from the model export
 * (berm.civilization.biocap(year, lat, region) with chi_map.chi_total);
 * only the map geometry is hand-drawn. Southeast Asia is not a model
 * region and is therefore not shown.
 */
const REGIONS: Region[] = [
  {
    id: "sub-saharan-africa",
    name: "Sub-Saharan Africa",
    biocap: regionBiocap("Sub-Saharan Africa"),
    tfr: regionTfr("Sub-Saharan Africa"),
    electYear: electYear("Sub-Saharan Africa"),
    cx: 470,
    cy: 300,
    path: "M430,230 L440,220 L470,218 L510,225 L520,240 L525,280 L520,320 L510,350 L495,370 L475,375 L455,370 L440,350 L430,320 L425,280 Z",
  },
  {
    id: "south-asia",
    name: "South Asia",
    biocap: regionBiocap("South Asia"),
    tfr: regionTfr("South Asia"),
    electYear: electYear("South Asia"),
    cx: 638,
    cy: 260,
    path: "M610,220 L625,210 L650,215 L668,225 L670,250 L665,275 L655,290 L638,298 L620,290 L612,270 L608,245 Z",
  },
  {
    id: "mena",
    name: "Middle East",
    biocap: regionBiocap("Middle East"),
    tfr: regionTfr("Middle East"),
    electYear: electYear("Middle East"),
    cx: 530,
    cy: 210,
    path: "M420,175 L450,168 L490,165 L540,170 L580,180 L600,195 L605,210 L598,225 L570,228 L530,230 L490,228 L455,225 L430,218 L420,200 Z",
  },
  {
    id: "latin-america",
    name: "Latin America",
    biocap: regionBiocap("Latin America"),
    tfr: regionTfr("Latin America"),
    electYear: electYear("Latin America"),
    cx: 258,
    cy: 320,
    path: "M230,215 L250,210 L270,215 L285,230 L290,260 L288,300 L280,340 L270,370 L258,395 L245,405 L235,398 L228,370 L225,340 L222,300 L225,260 L228,235 Z",
  },
  {
    id: "east-asia",
    name: "East Asia",
    biocap: regionBiocap("East Asia"),
    tfr: regionTfr("East Asia"),
    electYear: electYear("East Asia"),
    cx: 735,
    cy: 200,
    path: "M700,155 L720,148 L750,150 L772,162 L778,180 L775,200 L768,218 L750,228 L728,225 L712,215 L705,195 L700,175 Z",
  },
  {
    id: "western-europe",
    name: "Western Europe",
    biocap: regionBiocap("Western Europe"),
    tfr: regionTfr("Western Europe"),
    electYear: electYear("Western Europe"),
    cx: 440,
    cy: 140,
    path: "M405,105 L420,100 L445,98 L468,102 L478,115 L480,135 L476,155 L465,168 L448,172 L430,170 L415,162 L408,145 L405,125 Z",
  },
  {
    id: "united-states",
    name: "United States",
    biocap: regionBiocap("USA"),
    tfr: regionTfr("USA"),
    electYear: electYear("USA"),
    cx: 195,
    cy: 170,
    path: "M100,140 L130,132 L175,128 L225,130 L268,135 L290,145 L292,160 L285,178 L268,192 L240,198 L200,200 L160,196 L130,188 L110,175 L100,160 Z",
  },
  {
    id: "japan-korea",
    name: "Japan / South Korea",
    biocap: regionBiocap("Japan", "South Korea"),
    tfr: regionTfr("Japan", "South Korea"),
    electYear: electYear("Japan", "South Korea"),
    cx: 790,
    cy: 175,
    path: "M778,148 L788,142 L800,143 L810,150 L813,162 L810,178 L805,192 L795,200 L785,198 L778,188 L775,172 L776,158 Z",
  },
];

/* ─── migration flows ───────────────────────────────────────────────── */
interface Flow {
  from: string;
  to: string;
  label: string;
}

const FLOWS: Flow[] = [
  { from: "sub-saharan-africa", to: "western-europe", label: "Africa → Europe" },
  { from: "mena", to: "western-europe", label: "MENA → Europe" },
  { from: "latin-america", to: "united-states", label: "LatAm → US" },
  { from: "south-asia", to: "mena", label: "S.Asia → MENA" },
];

const REGION_LABEL_OFFSETS: Record<string, { x: number; y: number }> = {
  "east-asia": { x: -12, y: 4 },
  "japan-korea": { x: 13, y: -7 },
};

/* ─── helpers ───────────────────────────────────────────────────────── */

/** BioCap 0..1 -> color along green-to-red gradient */
function biocapColor(v: number): string {
  // green (#22c55e) at 1.0 -> yellow (#eab308) at 0.5 -> red (#ef4444) at 0.0
  const t = Math.max(0, Math.min(1, v));
  let r: number, g: number, b: number;
  if (t >= 0.5) {
    const s = (t - 0.5) * 2; // 0..1 within upper half
    r = Math.round(234 * (1 - s) + 34 * s);
    g = Math.round(179 * (1 - s) + 197 * s);
    b = Math.round(8 * (1 - s) + 94 * s);
  } else {
    const s = t * 2; // 0..1 within lower half
    r = Math.round(239 * (1 - s) + 234 * s);
    g = Math.round(68 * (1 - s) + 179 * s);
    b = Math.round(68 * (1 - s) + 8 * s);
  }
  return `rgb(${r},${g},${b})`;
}

/** Create a curved path from one point to another */
function curvedArrow(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  // control point perpendicular to midpoint
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const offset = dist * 0.25;
  // perpendicular direction
  const nx = -dy / dist;
  const ny = dx / dist;
  const cx = mx + nx * offset;
  const cy = my + ny * offset;
  return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
}

/* ─── Component ─────────────────────────────────────────────────────── */

interface Props {
  title?: string;
}

export function MigrationGradientMap({ title = "Migration Gradient Map" }: Props) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleRegionEnter = useCallback((id: string, cx: number, cy: number) => {
    setHoveredRegion(id);
    setTooltipPos({ x: cx, y: cy });
  }, []);

  const handleRegionLeave = useCallback(() => {
    setHoveredRegion(null);
  }, []);

  const hoveredData = hoveredRegion ? REGIONS.find((r) => r.id === hoveredRegion) : null;

  /* Tooltip positioning: keep it within viewBox */
  const ttW = 180;
  const ttH = 80;
  let ttX = tooltipPos.x + 12;
  let ttY = tooltipPos.y - ttH - 8;
  if (ttX + ttW > W - 10) ttX = tooltipPos.x - ttW - 12;
  if (ttY < 10) ttY = tooltipPos.y + 12;

  return (
    <div className="chart-scroll w-full max-w-4xl mx-auto pb-1">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[760px]"
        role="img"
        aria-label={title}
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        {/* defs: arrowhead marker + gradient for legend */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 8 3, 0 6"
              fill="var(--foreground-muted)"
              opacity="0.7"
            />
          </marker>
          <linearGradient id="biocapGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {/* title */}
        <text x={W / 2} y={24} textAnchor="middle" fontSize={14} fontWeight={600} fill={C.title}>
          {title}
        </text>

        {/* ocean background hint */}
        <rect x={40} y={40} width={W - 80} height={H - 120} rx={8} fill="var(--card-border)" opacity={0.15} />

        {/* region shapes */}
        {REGIONS.map((region) => {
          const isHovered = hoveredRegion === region.id;
          const fill = biocapColor(region.biocap);
          return (
            <g key={region.id}>
              <path
                d={region.path}
                fill={fill}
                fillOpacity={isHovered ? 0.95 : 0.7}
                stroke={isHovered ? C.title : fill}
                strokeWidth={isHovered ? 2 : 1}
                style={{ cursor: "pointer", transition: "fill-opacity 0.2s, stroke-width 0.2s" }}
                onMouseEnter={() => handleRegionEnter(region.id, region.cx, region.cy)}
                onMouseLeave={handleRegionLeave}
                onFocus={() => handleRegionEnter(region.id, region.cx, region.cy)}
                onBlur={handleRegionLeave}
                tabIndex={0}
                role="img"
                aria-label={`${region.name}, BioCap ${region.biocap.toFixed(2)}, TFR ${region.tfr.toFixed(2)}`}
              />
            </g>
          );
        })}

        {/* migration flow arrows */}
        {FLOWS.map((flow) => {
          const fromR = REGIONS.find((r) => r.id === flow.from)!;
          const toR = REGIONS.find((r) => r.id === flow.to)!;
          const pathD = curvedArrow(fromR.cx, fromR.cy, toR.cx, toR.cy);
          const isActive =
            hoveredRegion === flow.from || hoveredRegion === flow.to;
          return (
            <path
              key={`${flow.from}-${flow.to}`}
              d={pathD}
              fill="none"
              stroke={C.text}
              strokeWidth={isActive ? 2.5 : 1.5}
              strokeDasharray={isActive ? "none" : "6,4"}
              opacity={isActive ? 0.9 : 0.45}
              markerEnd="url(#arrowhead)"
              style={{ transition: "opacity 0.2s, stroke-width 0.2s", pointerEvents: "none" }}
            />
          );
        })}

        {/* region labels stay above the migration paths */}
        {REGIONS.map((region) => {
          const offset = REGION_LABEL_OFFSETS[region.id] ?? { x: 0, y: 0 };
          const labelX = region.cx + offset.x;
          const labelY = region.cy + offset.y;
          return (
            <g key={`label-${region.id}`} style={{ pointerEvents: "none" }}>
              <text
                x={labelX}
                y={labelY - 8}
                textAnchor="middle"
                fontSize={8}
                fontWeight={600}
                fill={C.title}
                paintOrder="stroke"
                stroke={C.bg}
                strokeWidth={3}
                strokeLinejoin="round"
              >
                {region.name}
              </text>
              <text
                x={labelX}
                y={labelY + 4}
                textAnchor="middle"
                fontSize={8}
                fill={C.text}
                paintOrder="stroke"
                stroke={C.bg}
                strokeWidth={2.5}
                strokeLinejoin="round"
              >
                BioCap {region.biocap.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* tooltip */}
        {hoveredData && (
          <g style={{ pointerEvents: "none" }}>
            <rect
              x={ttX}
              y={ttY}
              width={ttW}
              height={ttH}
              rx={6}
              fill={C.tooltipBg}
              stroke={C.tooltipBorder}
              strokeWidth={1}
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
            />
            <text x={ttX + 10} y={ttY + 18} fontSize={10} fontWeight={600} fill={C.title}>
              {hoveredData.name}
            </text>
            <text x={ttX + 10} y={ttY + 34} fontSize={9} fill={C.text}>
              BioCap: {hoveredData.biocap.toFixed(2)}
            </text>
            <text x={ttX + 10} y={ttY + 48} fontSize={9} fill={C.text}>
              TFR: {hoveredData.tfr.toFixed(2)}
            </text>
            <text x={ttX + 10} y={ttY + 62} fontSize={9} fill={C.text}>
              Electrification: {hoveredData.electYear}
            </text>
            {/* colored indicator dot */}
            <circle
              cx={ttX + ttW - 16}
              cy={ttY + 16}
              r={6}
              fill={biocapColor(hoveredData.biocap)}
              stroke={C.border}
              strokeWidth={0.5}
            />
          </g>
        )}

        {/* legend */}
        <g>
          {/* gradient bar */}
          <rect x={340} y={H - 55} width={220} height={12} rx={3} fill="url(#biocapGrad)" />
          <text x={340} y={H - 60} fontSize={9} fontWeight={500} fill={C.title}>
            BioCap Scale
          </text>
          <text x={340} y={H - 30} fontSize={8} fill={C.text}>
            Low (0.0)
          </text>
          <text x={560} y={H - 30} textAnchor="end" fontSize={8} fill={C.text}>
            High (1.0)
          </text>
          {/* arrow legend */}
          <line x1={600} x2={640} y1={H - 49} y2={H - 49} stroke={C.text} strokeWidth={1.5} strokeDasharray="6,4" markerEnd="url(#arrowhead)" />
          <text x={648} y={H - 45} fontSize={8} fill={C.text}>
            Migration flow
          </text>
          <text x={600} y={H - 30} fontSize={7.5} fill={C.text}>
            (high BioCap → low BioCap)
          </text>
        </g>
      </svg>
    </div>
  );
}
