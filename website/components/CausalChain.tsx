/**
 * CausalChain -- SVG causal diagram of the BERM mechanism.
 *
 * Server component (pure SVG, no interactivity needed).
 * Uses viewBox for responsiveness. Colors keyed to epistemic level.
 */

// Epistemic-level colors
const LEVEL_COLORS = {
  E: "#22C55E",     // observed endpoint / replicated element
  "M|C": "#3B82F6", // mechanism + association
  M: "#8B5CF6",     // mechanistic intermediate
  C: "#F59E0B",     // observational association
  "L*": "#9CA3AF", // theoretical / measurement hypothesis
} as const;

type Level = keyof typeof LEVEL_COLORS;

// ── Node definitions ──

interface NodeDef {
  id: string;
  label: string;
  x: number;
  y: number;
  level: Level;
  w?: number;
}

const NODES: Record<"en" | "fi", NodeDef[]> = {
  en: [
    { id: "field", label: "FieldState", x: 20, y: 180, level: "L*", w: 115 },
    { id: "transfer", label: "Local transfer", x: 155, y: 180, level: "L*", w: 130 },
    { id: "intermediate", label: "CRY · melatonin · Ca²⁺/ROS · Vmem", x: 305, y: 180, level: "M", w: 185 },
    { id: "organ", label: "Organ states · BTB", x: 510, y: 180, level: "M", w: 140 },
    { id: "male", label: "BTB + sperm state", x: 670, y: 80, level: "M", w: 145 },
    { id: "female", label: "Ovary + oocyte state", x: 670, y: 270, level: "M", w: 155 },
    { id: "couple", label: "Couple capacity", x: 840, y: 180, level: "M", w: 125 },
    { id: "context", label: "Demand · tempo · ART", x: 825, y: 290, level: "E", w: 145 },
    { id: "asfr", label: "ASFR", x: 985, y: 180, level: "E", w: 75 },
    { id: "tfr", label: "TFR", x: 1080, y: 180, level: "E", w: 75 },
  ],
  fi: [
    { id: "field", label: "FieldState", x: 20, y: 180, level: "L*", w: 115 },
    { id: "transfer", label: "Paikallinen siirto", x: 155, y: 180, level: "L*", w: 130 },
    { id: "intermediate", label: "CRY · melatoniini · Ca²⁺/ROS · Vmem", x: 305, y: 180, level: "M", w: 195 },
    { id: "organ", label: "Elinkohtaiset tilat · BTB", x: 520, y: 180, level: "M", w: 160 },
    { id: "male", label: "BTB + siittiötila", x: 700, y: 80, level: "M", w: 145 },
    { id: "female", label: "Munasarja + oosyyttitila", x: 680, y: 270, level: "M", w: 170 },
    { id: "couple", label: "Parikapasiteetti", x: 855, y: 180, level: "M", w: 125 },
    { id: "context", label: "Kysyntä · tempo · ART", x: 835, y: 290, level: "E", w: 155 },
    { id: "asfr", label: "ASFR", x: 1000, y: 180, level: "E", w: 75 },
    { id: "tfr", label: "TFR", x: 1095, y: 180, level: "E", w: 75 },
  ],
};

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

const NODE_H = 36;
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
      viewBox="0 0 1200 420"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={locale === "fi" ? "BERM FieldState–ASFR-v2-kausaalireitti" : "BERM FieldState–ASFR-v2 causal route"}
      style={{ width: "100%", height: "auto" }}
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
        const color = LEVEL_COLORS[n.level];
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
              x={n.x + 24}
              y={n.y + NODE_H / 2 + 1}
              fill="var(--foreground)"
              fontSize={11}
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              dominantBaseline="middle"
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      {legend.map(([lvl, lbl], i) => (
        <g key={lvl} transform={`translate(${40 + i * 160}, 400)`}>
          <circle cx={0} cy={0} r={4} fill={LEVEL_COLORS[lvl]} />
          <text
            x={10}
            y={1}
            fill="var(--foreground-muted)"
            fontSize={10}
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            dominantBaseline="middle"
          >
            {lbl}
          </text>
        </g>
      ))}
    </svg>
  );
}
