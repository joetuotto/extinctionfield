/**
 * CausalChain -- SVG causal diagram of the BERM mechanism.
 *
 * Server component (pure SVG, no interactivity needed).
 * Uses viewBox for responsiveness. Colors keyed to epistemic level.
 */

import { CHAIN_EPISTEMIC_COLORS } from "@/lib/epistemicConstants";
import type { EpistemicLevel } from "@/lib/types";
import { pickCopy } from "@/lib/i18n";

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
const NODES: Record<string, NodeDef[]> = {
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
  ja: [
    { id: "field", label: "FieldState", x: 20, y: 110, level: "L*", w: 120 },
    { id: "transfer", label: "局所移行", x: 170, y: 110, level: "L*", w: 120 },
    { id: "intermediate", label: "CRY · メラトニン · Ca²⁺/ROS · Vmem", x: 320, y: 110, level: "M", w: 285 },
    { id: "organ", label: "臓器状態 · BTB", x: 635, y: 110, level: "M", w: 155 },
    { id: "male", label: "BTB + 精子状態", x: 820, y: 20, level: "M", w: 155 },
    { id: "female", label: "卵巣 + 卵母細胞状態", x: 820, y: 200, level: "M", w: 190 },
    { id: "couple", label: "カップル能力", x: 1040, y: 110, level: "M", w: 140 },
    { id: "context", label: "需要 · テンポ · ART", x: 1025, y: 220, level: "E", w: 180 },
    { id: "asfr", label: "ASFR", x: 1235, y: 110, level: "E", w: 80 },
    { id: "tfr", label: "TFR", x: 1345, y: 110, level: "E", w: 80 },
  ],
  fr: [
    { id: "field", label: "FieldState", x: 20, y: 110, level: "L*", w: 120 },
    { id: "transfer", label: "Transfert local", x: 170, y: 110, level: "L*", w: 140 },
    { id: "intermediate", label: "CRY · mélatonine · Ca²⁺/ROS · Vmem", x: 340, y: 110, level: "M", w: 285 },
    { id: "organ", label: "États d'organes · BTB", x: 655, y: 110, level: "M", w: 185 },
    { id: "male", label: "BTB + état spermatique", x: 870, y: 20, level: "M", w: 185 },
    { id: "female", label: "Ovaire + état ovocytaire", x: 870, y: 200, level: "M", w: 200 },
    { id: "couple", label: "Capacité du couple", x: 1100, y: 110, level: "M", w: 165 },
    { id: "context", label: "Demande · tempo · ART", x: 1085, y: 220, level: "E", w: 190 },
    { id: "asfr", label: "ASFR", x: 1305, y: 110, level: "E", w: 80 },
    { id: "tfr", label: "TFR", x: 1415, y: 110, level: "E", w: 80 },
  ],
  ko: [
    { id: "field", label: "FieldState", x: 20, y: 110, level: "L*", w: 120 },
    { id: "transfer", label: "국소 전달", x: 170, y: 110, level: "L*", w: 125 },
    { id: "intermediate", label: "CRY · 멜라토닌 · Ca²⁺/ROS · Vmem", x: 325, y: 110, level: "M", w: 280 },
    { id: "organ", label: "장기 상태 · BTB", x: 635, y: 110, level: "M", w: 160 },
    { id: "male", label: "BTB + 정자 상태", x: 825, y: 20, level: "M", w: 155 },
    { id: "female", label: "난소 + 난모세포 상태", x: 825, y: 200, level: "M", w: 185 },
    { id: "couple", label: "커플 능력", x: 1040, y: 110, level: "M", w: 130 },
    { id: "context", label: "수요 · 템포 · ART", x: 1025, y: 220, level: "E", w: 170 },
    { id: "asfr", label: "ASFR", x: 1225, y: 110, level: "E", w: 80 },
    { id: "tfr", label: "TFR", x: 1335, y: 110, level: "E", w: 80 },
  ],
};

const VIEWBOX_W: Record<string, number> = { en: 1460, fi: 1580, ja: 1460, fr: 1530, ko: 1450 };

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

const CAUSAL_COPY: Record<string, {
  ariaLabel: string;
  legend: [Level, string][];
}> = {
  en: {
    ariaLabel: "BERM v17 causal route",
    legend: [["L*", "Theory / field signature"], ["M", "Mechanistic intermediate"], ["E", "Observed endpoint"]],
  },
  fi: {
    ariaLabel: "BERM v17-kausaalireitti",
    legend: [["L*", "Teoria / kenttäallekirjoitus"], ["M", "Mekanistinen välitila"], ["E", "Havaittu päätepiste"]],
  },
  ja: {
    ariaLabel: "BERM v17 因果経路",
    legend: [["L*", "理論 / 場のシグネチャ"], ["M", "メカニズム的中間体"], ["E", "観察されたエンドポイント"]],
  },
  fr: {
    ariaLabel: "Route causale BERM v17",
    legend: [["L*", "Théorie / signature de champ"], ["M", "Intermédiaire mécanistique"], ["E", "Point final observé"]],
  },
  ko: {
    ariaLabel: "BERM v17 인과 경로",
    legend: [["L*", "이론 / 장 서명"], ["M", "메커니즘적 중간체"], ["E", "관찰된 종점"]],
  },
};

export default function CausalChain({ locale = "en" }: { locale?: string }) {
  const nodes = pickCopy(NODES, locale);
  const d = pickCopy(CAUSAL_COPY, locale);
  const legend = d.legend;

  return (
    <svg
      viewBox={`0 0 ${pickCopy(VIEWBOX_W, locale)} 330`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={d.ariaLabel}
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
