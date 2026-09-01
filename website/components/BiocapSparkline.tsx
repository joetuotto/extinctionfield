"use client";

const W = 480;
const H = 180;
const PAD = { left: 120, right: 40, bottom: 20, top: 8 };
const CW = W - PAD.left - PAD.right;

const POPULATIONS = [
  { name: "Sub-Saharan Africa", biocap: 0.88, tfr: 4.6, color: "#ec4899" },
  { name: "South Asia", biocap: 0.72, tfr: 2.3, color: "#f59e0b" },
  { name: "Middle East", biocap: 0.65, tfr: 2.7, color: "#f97316" },
  { name: "Latin America", biocap: 0.55, tfr: 1.9, color: "#a855f7" },
  { name: "East Asia", biocap: 0.46, tfr: 1.1, color: "#6366f1" },
  { name: "United States", biocap: 0.08, tfr: 1.6, color: "#10b981" },
  { name: "Western Europe", biocap: 0.11, tfr: 1.5, color: "#3b82f6" },
  { name: "Japan", biocap: 0.09, tfr: 1.2, color: "#ef4444" },
  { name: "South Korea", biocap: 0.05, tfr: 0.7, color: "#dc2626" },
];

const C = {
  text: "var(--foreground-muted)",
  grid: "var(--card-border)",
};

export function BiocapSparkline() {
  const sorted = [...POPULATIONS].sort((a, b) => b.biocap - a.biocap);
  const barH = 14;
  const gap = 4;
  const totalH = sorted.length * (barH + gap);

  return (
    <div className="chart-scroll">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[480px]" role="img" aria-label="BioCap and TFR by population">
      <defs>
        <marker id="arrowGrad" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={5} markerHeight={5}>
          <path d="M0,0 L6,3 L0,6 Z" fill="#ec4899" />
        </marker>
      </defs>

      {/* grid lines */}
      {[0, 0.25, 0.5, 0.75, 1.0].map((v) => {
        const bx = PAD.left + v * CW;
        return (
          <g key={v}>
            <line x1={bx} x2={bx} y1={PAD.top} y2={PAD.top + totalH} stroke={C.grid} strokeWidth={0.5} strokeDasharray="2,2" />
            <text x={bx} y={PAD.top + totalH + 12} textAnchor="middle" fontSize={7} fill={C.text}>{v.toFixed(2)}</text>
          </g>
        );
      })}

      {/* gradient arrow sits behind bars and labels */}
      <line
        x1={PAD.left + sorted[0].biocap * CW - 4}
        y1={PAD.top + barH / 2}
        x2={PAD.left + sorted[sorted.length - 1].biocap * CW + 8}
        y2={PAD.top + (sorted.length - 1) * (barH + gap) + barH / 2}
        stroke="#ec4899"
        strokeWidth={1.25}
        strokeDasharray="4,3"
        markerEnd="url(#arrowGrad)"
        opacity={0.28}
      />

      {/* bars */}
      {sorted.map((pop, i) => {
        const by = PAD.top + i * (barH + gap);
        const bw = pop.biocap * CW;
        return (
          <g key={pop.name}>
            <text x={PAD.left - 4} y={by + barH / 2 + 3} textAnchor="end" fontSize={8} fill={C.text}>{pop.name}</text>
            <rect x={PAD.left} y={by} width={bw} height={barH} fill={pop.color} opacity={0.8} rx={2} />
            <text x={PAD.left + bw + 4} y={by + barH / 2 + 3} fontSize={7} fill={pop.color} fontWeight={500}>
              TFR {pop.tfr}
            </text>
          </g>
        );
      })}

      </svg>
    </div>
  );
}
