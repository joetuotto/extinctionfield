/**
 * CausalChain -- SVG causal diagram of the BERM mechanism.
 *
 * Server component (pure SVG, no interactivity needed).
 * Uses viewBox for responsiveness. Colors keyed to epistemic level.
 */

import { CHAIN_EPISTEMIC_COLORS } from "@/lib/epistemicConstants";
import type { EpistemicLevel } from "@/lib/types";

type Level = EpistemicLevel;

// ── Node definitions ──

interface NodeDef {
  id: string;
  label: string;
  x: number;
  y: number;
  level: Level;
  w?: number;
}

// Node widths are sized for the 14px label type: 26px left inset for the
// epistemic dot, ~7px per character, 10px trailing padding.
const NODES: Record<"en" | "fi", NodeDef[]> = {
  en: [
    { id: "field", label: "FieldState", x: 20, y: 110, level: "L*", w: 120 },
    { id: "transfer", label: "Local transfer", x: 170, y: 110, level: "L*", w: 140 },
    { id: "intermediate", label: "CRY · melatonin · Ca²⁺/ROS · Vmem", x: 340, y: 110, level: "M", w: 270 },
    { id: "organ", label: "Organ states · BTB", x: 640, y: 110, level: "M", w: 165 },
    { id: "male", label: "BTB + sperm state", x: 835, y: 20, level: "M", w: 160 },
    { id: "female", label: "Ovary + oocyte state", x: 835, y: 200, level: "M", w: 180 },
    { id: "couple", label: "Couple capacity", x: 1045, y: 110, level: "M", w: 145 },
    { id: "context", label: "Demand · tempo · ART", x: 1030, y: 220, level: "E", w: 180 },
    { id: "asfr", label: "ASFR", x: 1240, y: 110, level: "E", w: 80 },
    { id: "tfr", label: "TFR", x: 1350, y: 110, level: "E", w: 80 },
  ],
  fi: [
    { id: "field", label: "FieldState", x: 20, y: 110, level: "L*", w: 120 },
    { id: "transfer", label: "Paikallinen siirto", x: 170, y: 110, level: "L*", w: 165 },
    { id: "intermediate", label: "CRY · melatoniini · Ca²⁺/ROS · Vmem", x: 365, y: 110, level: "M", w: 285 },
    { id: "organ", label: "Elinkohtaiset tilat · BTB", x: 680, y: 110, level: "M", w: 215 },
    { id: "male", label: "BTB + siittiötila", x: 925, y: 20, level: "M", w: 160 },
    { id: "female", label: "Munasarja + oosyyttitila", x: 925, y: 200, level: "M", w: 205 },
    { id: "couple", label: "Parikapasiteetti", x: 1160, y: 110, level: "M", w: 150 },
    { id: "context", label: "Kysyntä · tempo · ART", x: 1145, y: 220, level: "E", w: 185 },
    { id: "asfr", label: "ASFR", x: 1360, y: 110, level: "E", w: 80 },
    { id: "tfr", label: "TFR", x: 1470, y: 110, level: "E", w: 80 },
  ],
};

const VIEWBOX_W: Record<"en" | "fi", number> = { en: 1460, fi: 1580 };

// ── Edge definitions ──

interface EdgeDef {
  from: string;
  to: string;
}

const EDGES: EdgeDef[] = [
  { from: "field", to: "transfer" },
  { from: "transfer", to: "intermediate" },
  { from: "intermediate", to: "organ" },
  { from: "organ", to: "male" },
  { from: "organ", to: "female" },
  { from: "male", to: "couple" },
  { from: "female", to: "couple" },
  { from: "couple", to: "asfr" },
  { from: "context", to: "asfr" },
  { from: "asfr", to: "tfr" },
];

// ── Helpers ──

const NODE_H = 40;
const RX = 6;

function getNode(nodes: NodeDef[], id: string): NodeDef {
  const n = nodes.find((node) => node.id === id);
  if (!n) throw new Error(`Node not found: ${id}`);
  return n;
}

function cy(n: NodeDef) {
  return n.y + NODE_H / 2;
}

export default function CausalChain({ locale = "en" }: { locale?: "en" | "fi" }) {
  const nodes = NODES[locale];
  const legend = locale === "fi"
    ? [["L*", "Teoria / kenttäallekirjoitus"], ["M", "Mekanistinen välitila"], ["E", "Havaittu päätepiste"]] as [Level, string][]
    : [["L*", "Theory / field signature"], ["M", "Mechanistic intermediate"], ["E", "Observed endpoint"]] as [Level, string][];

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_W[locale]} 330`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={locale === "fi" ? "BERM v17-kausaalireitti" : "BERM v17 causal route"}
      style={{
        width: "100%",
        // Below this the parent's overflow-x-auto scrolls, rather than
        // shrinking the label type past legibility.
        minWidth: 1150,
        height: "auto",
      }}
    >
      {/* Arrowhead marker */}
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 7"
          refX="10"
          refY="3.5"
          markerWidth="8"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 3.5 L 0 7 z" fill="var(--foreground-muted)" />
        </marker>
      </defs>

      {/* Edges */}
      {EDGES.map(({ from, to }) => {
        const a = getNode(nodes, from);
        const b = getNode(nodes, to);
        const x1 = a.x + (a.w ?? 120);
        const y1 = cy(a);
        const x2 = b.x;
        const y2 = cy(b);
        return (
          <line
            key={`${from}-${to}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--foreground-muted)"
            strokeWidth={1.5}
            markerEnd="url(#arrow)"
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((n) => {
        const w = n.w ?? 120;
        const color = CHAIN_EPISTEMIC_COLORS[n.level];
        return (
          <g key={n.id}>
            {/* Background rect */}
            <rect
              x={n.x}
              y={n.y}
              width={w}
              height={NODE_H}
              rx={RX}
              ry={RX}
              fill="var(--card-bg)"
              stroke={color}
              strokeWidth={1.5}
            />
            {/* Epistemic dot */}
            <circle cx={n.x + 12} cy={n.y + NODE_H / 2} r={4} fill={color} />
            {/* Label */}
            <text
              x={n.x + 26}
              y={n.y + NODE_H / 2 + 1}
              fill="var(--foreground)"
              fontSize={14}
              fontFamily="var(--font-interface)"
              dominantBaseline="middle"
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      {legend.map(([lvl, lbl], i) => (
        <g key={lvl} transform={`translate(${40 + i * 215}, 300)`}>
          <circle cx={0} cy={0} r={4} fill={CHAIN_EPISTEMIC_COLORS[lvl]} />
          <text
            x={12}
            y={1}
            fill="var(--foreground-muted)"
            fontSize={13}
            fontFamily="var(--font-interface)"
            dominantBaseline="middle"
          >
            {lbl}
          </text>
        </g>
      ))}
    </svg>
  );
}
