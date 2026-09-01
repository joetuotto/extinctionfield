"use client";

const SIZE = 360;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 130;
const RINGS = [0.25, 0.5, 0.75, 1.0];

const C = {
  grid: "var(--card-border)",
  text: "var(--foreground-muted)",
  title: "var(--foreground)",
};

interface Biomarker {
  symbol: string;
  label: string;
  value: number;
  weight: number;
  trend: string;
}

interface Props {
  title: string;
  biomarkers: Biomarker[];
}

function polarToCart(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function statusColor(v: number): string {
  if (v >= 0.8) return "#22c55e";
  if (v >= 0.5) return "#eab308";
  return "#ef4444";
}

export function BiomarkerRadar({ title, biomarkers }: Props) {
  const n = biomarkers.length;
  const step = 360 / n;

  const polygonPoints = biomarkers
    .map((b, i) => {
      const p = polarToCart(i * step, b.value * R);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <div className="chart-scroll">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[360px] mx-auto">
        <text x={CX} y={16} textAnchor="middle" fill={C.title} fontSize={13} fontWeight={600}>
          {title}
        </text>

        {RINGS.map((r) => (
          <circle
            key={r}
            cx={CX}
            cy={CY}
            r={r * R}
            fill="none"
            stroke={C.grid}
            strokeWidth={0.5}
            strokeDasharray={r < 1 ? "3 3" : undefined}
          />
        ))}

        {biomarkers.map((b, i) => {
          const angle = i * step;
          const outer = polarToCart(angle, R + 4);
          const p = polarToCart(angle, R);
          const labelR = R + (b.symbol.length > 3 ? 24 : 20);
          const lp = polarToCart(angle, labelR);
          return (
            <g key={b.symbol}>
              <line x1={CX} y1={CY} x2={p.x} y2={p.y} stroke={C.grid} strokeWidth={0.5} />
              <text
                x={lp.x}
                y={lp.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={C.text}
                fontSize={10}
                fontWeight={500}
              >
                {b.symbol}
              </text>
            </g>
          );
        })}

        <polygon
          points={polygonPoints}
          fill="rgba(59,130,246,0.15)"
          stroke="#3b82f6"
          strokeWidth={1.5}
        />

        {biomarkers.map((b, i) => {
          const p = polarToCart(i * step, b.value * R);
          return (
            <circle key={b.symbol + "-dot"} cx={p.x} cy={p.y} r={4} fill={statusColor(b.value)} stroke="white" strokeWidth={1} />
          );
        })}

        {biomarkers.map((b, i) => {
          const p = polarToCart(i * step, b.value * R);
          const nudge = b.value > 0.7 ? -10 : 10;
          return (
            <text
              key={b.symbol + "-val"}
              x={p.x}
              y={p.y + nudge}
              textAnchor="middle"
              fill={statusColor(b.value)}
              fontSize={9}
              fontWeight={600}
            >
              {b.value.toFixed(2)}
            </text>
          );
        })}

        <g transform={`translate(${SIZE - 80}, ${SIZE - 40})`}>
          {[
            { color: "#22c55e", label: "> 0.80" },
            { color: "#eab308", label: "0.50–0.80" },
            { color: "#ef4444", label: "< 0.50" },
          ].map((item, i) => (
            <g key={item.label} transform={`translate(0, ${i * 12})`}>
              <circle cx={4} cy={0} r={3} fill={item.color} />
              <text x={12} y={3} fill={C.text} fontSize={8}>
                {item.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
