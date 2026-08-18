/**
 * CausalChain -- SVG causal diagram of the BERM mechanism.
 *
 * Server component (pure SVG, no interactivity needed).
 * Uses viewBox for responsiveness. Colors keyed to epistemic level.
 */

// Epistemic-level colors
const LEVEL_COLORS = {
  E: "#22C55E",    // green  -- established
  "M|C": "#3B82F6", // blue   -- mechanistic + correlational
  M: "#8B5CF6",    // purple -- mechanistic only
  C: "#F59E0B",    // amber  -- correlational only
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

const NODES: NodeDef[] = [
  // Entry
  { id: "emf",     label: "EMF Exposure",        x: 40,  y: 180, level: "E",   w: 140 },

  // Pathway A
  { id: "vgic",    label: "VGIC Activation",      x: 260, y: 60,  level: "M|C", w: 140 },
  { id: "ros",     label: "ROS ↑",           x: 460, y: 60,  level: "M|C", w: 100 },
  { id: "sdf",     label: "SDF ↑",           x: 620, y: 30,  level: "M|C", w: 100 },
  { id: "motil",   label: "Motility ↓",      x: 620, y: 90,  level: "E",   w: 120 },
  { id: "conc",    label: "Concentration ↓",  x: 620, y: 150, level: "E",   w: 140 },

  // Pathway B
  { id: "cry",     label: "CRY Disruption",       x: 260, y: 180, level: "M|C", w: 140 },
  { id: "ovul",    label: "Ovulation timing ↓", x: 460, y: 180, level: "M", w: 160 },

  // Pathway C
  { id: "bbb",     label: "BBB Permeability ↑", x: 260, y: 270, level: "M", w: 170 },
  { id: "chem",    label: "Chemical load ↑",    x: 500, y: 270, level: "M", w: 140 },

  // Pathway D
  { id: "hpa",     label: "HPA → HPG",          x: 260, y: 350, level: "C", w: 130 },
  { id: "testo",   label: "Testosterone ↓",     x: 460, y: 350, level: "C", w: 140 },

  // Convergence
  { id: "fecund",  label: "Fecundability ↓",    x: 740, y: 270, level: "M|C", w: 150 },
  { id: "tfr",     label: "TFR ↓",              x: 900, y: 270, level: "E",   w: 100 },
];

// ── Edge definitions ──

interface EdgeDef {
  from: string;
  to: string;
}

const EDGES: EdgeDef[] = [
  // From EMF
  { from: "emf",  to: "vgic" },
  { from: "emf",  to: "cry" },
  { from: "emf",  to: "bbb" },
  { from: "emf",  to: "hpa" },
  // Pathway A
  { from: "vgic", to: "ros" },
  { from: "ros",  to: "sdf" },
  { from: "ros",  to: "motil" },
  { from: "ros",  to: "conc" },
  // Pathway B
  { from: "cry",  to: "ovul" },
  // Pathway C
  { from: "bbb",  to: "chem" },
  // Pathway D
  { from: "hpa",  to: "testo" },
  // Converge to fecundability
  { from: "motil",  to: "fecund" },
  { from: "conc",   to: "fecund" },
  { from: "ovul",   to: "fecund" },
  { from: "chem",   to: "fecund" },
  { from: "testo",  to: "fecund" },
  // Fecundability to TFR
  { from: "fecund", to: "tfr" },
];

// ── Helpers ──

const NODE_H = 36;
const RX = 6;

function getNode(id: string): NodeDef {
  const n = NODES.find((n) => n.id === id);
  if (!n) throw new Error(`Node not found: ${id}`);
  return n;
}

function cy(n: NodeDef) {
  return n.y + NODE_H / 2;
}

export default function CausalChain() {
  return (
    <svg
      viewBox="0 0 1040 420"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="BERM causal chain diagram showing pathways from EMF exposure to fertility decline"
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
        const a = getNode(from);
        const b = getNode(to);
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
      {NODES.map((n) => {
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
      {(
        [
          ["E", "Established"],
          ["M|C", "Mech.+Corr."],
          ["M", "Mechanistic"],
          ["C", "Correlational"],
        ] as [Level, string][]
      ).map(([lvl, lbl], i) => (
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
