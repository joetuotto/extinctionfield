"use client";

const PAD = { top: 40, right: 24, bottom: 48, left: 56 };
const W = 600;
const H = 340;
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const C = {
  grid: "var(--card-border)",
  text: "var(--foreground-muted)",
  title: "var(--foreground)",
  bg: "var(--card-bg)",
};

const CIVS = [
  { name: "Rome", lat: 42, chi: 0.987, span: 976, peak: 1.0, final: 0.516, peakYr: -500, color: "#ef4444" },
  { name: "Arab/Islamic", lat: 25, chi: 0.980, span: 708, peak: 1.0, final: 0.460, peakYr: 550, color: "#f59e0b" },
  { name: "Medieval Europe", lat: 48, chi: 0.988, span: 850, peak: 1.0, final: 0.943, peakYr: 800, color: "#3b82f6" },
  { name: "British Empire", lat: 52, chi: 0.989, span: 367, peak: 1.0, final: 0.765, peakYr: 1580, color: "#8b5cf6" },
  { name: "United States", lat: 39, chi: 0.986, span: 250, peak: 1.0, final: 0.076, peakYr: 1776, color: "#10b981" },
  { name: "Sub-Saharan Africa", lat: 9, chi: 0.972, span: 126, peak: 1.0, final: 0.881, peakYr: 1900, color: "#ec4899" },
] as const;

function x(pct: number) {
  return PAD.left + pct * CW;
}
function y(v: number) {
  return PAD.top + (1 - v) * CH;
}

function biocapCurve(final: number, chi: number, n: number): number[] {
  const pts: number[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const decay = 1 - (1 - final) * Math.pow(t, 1 + chi * 2);
    const solar = 0.03 * Math.sin(t * Math.PI * 8) * (1 - t * 0.5);
    pts.push(Math.max(0, Math.min(1, decay + solar)));
  }
  return pts;
}

interface Props {
  chartTitle: string;
  xLabel: string;
  yLabel: string;
}

export function BiocapCivilizationChart({ chartTitle, xLabel, yLabel }: Props) {
  const N = 60;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[600px]" role="img" aria-label={chartTitle}>
      <text x={PAD.left} y={18} fontSize={12} fontWeight={600} fill={C.title}>{chartTitle}</text>

      {/* grid */}
      {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
        <line key={v} x1={PAD.left} x2={PAD.left + CW} y1={y(v)} y2={y(v)} stroke={C.grid} strokeWidth={0.5} strokeDasharray="3,3" />
      ))}
      {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
        <line key={`x${v}`} x1={x(v)} x2={x(v)} y1={PAD.top} y2={PAD.top + CH} stroke={C.grid} strokeWidth={0.5} strokeDasharray="3,3" />
      ))}

      {/* y labels */}
      {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
        <text key={v} x={PAD.left - 6} y={y(v) + 3} textAnchor="end" fontSize={9} fill={C.text}>{v.toFixed(2)}</text>
      ))}

      {/* x labels */}
      {[0, 25, 50, 75, 100].map((v) => (
        <text key={v} x={x(v / 100)} y={PAD.top + CH + 16} textAnchor="middle" fontSize={9} fill={C.text}>{v}%</text>
      ))}

      {/* axis titles */}
      <text x={PAD.left + CW / 2} y={H - 4} textAnchor="middle" fontSize={9} fill={C.text}>{xLabel}</text>
      <text x={12} y={PAD.top + CH / 2} textAnchor="middle" fontSize={9} fill={C.text}
        transform={`rotate(-90, 12, ${PAD.top + CH / 2})`}>{yLabel}</text>

      {/* civilization curves */}
      {CIVS.map((civ) => {
        const pts = biocapCurve(civ.final, civ.chi, N);
        const path = pts.map((v, i) => `${i === 0 ? "M" : "L"}${x(i / N).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
        const endX = x(1);
        const endY = y(pts[N]);
        return (
          <g key={civ.name}>
            <path d={path} fill="none" stroke={civ.color} strokeWidth={2} strokeLinecap="round" />
            <circle cx={endX} cy={endY} r={3} fill={civ.color} />
            <text x={endX + 4} y={endY + 3} fontSize={7.5} fill={civ.color} fontWeight={500}>
              {civ.final.toFixed(2)}
            </text>
          </g>
        );
      })}

      {/* legend */}
      <rect
        x={PAD.left + 3}
        y={PAD.top + 3}
        width={188}
        height={88}
        rx={6}
        fill={C.bg}
        fillOpacity={0.94}
        stroke={C.grid}
        strokeWidth={0.75}
      />
      {CIVS.map((civ, i) => {
        const lx = PAD.left + 8;
        const ly = PAD.top + 12 + i * 14;
        return (
          <g key={`leg-${civ.name}`}>
            <line x1={lx} x2={lx + 14} y1={ly} y2={ly} stroke={civ.color} strokeWidth={2} />
            <text x={lx + 18} y={ly + 3} fontSize={8} fill={C.text}>{civ.name} ({civ.span} yr, {civ.lat}°N)</text>
          </g>
        );
      })}
    </svg>
  );
}

export function BiocapTimelineChart({ chartTitle, xLabel, yLabel }: Props) {
  const xLo = -600;
  const xHi = 2100;
  const N = 80;

  function tx(yr: number) {
    return PAD.left + ((yr - xLo) / (xHi - xLo)) * CW;
  }

  const xTicks = [-500, 0, 500, 1000, 1500, 2000];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[600px]" role="img" aria-label={chartTitle}>
      <text x={PAD.left} y={18} fontSize={12} fontWeight={600} fill={C.title}>{chartTitle}</text>

      {/* grid */}
      {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
        <line key={v} x1={PAD.left} x2={PAD.left + CW} y1={y(v)} y2={y(v)} stroke={C.grid} strokeWidth={0.5} strokeDasharray="3,3" />
      ))}
      {xTicks.map((v) => (
        <line key={v} x1={tx(v)} x2={tx(v)} y1={PAD.top} y2={PAD.top + CH} stroke={C.grid} strokeWidth={0.5} strokeDasharray="3,3" />
      ))}

      {/* y labels */}
      {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
        <text key={v} x={PAD.left - 6} y={y(v) + 3} textAnchor="end" fontSize={9} fill={C.text}>{v.toFixed(2)}</text>
      ))}

      {/* x labels */}
      {xTicks.map((v) => (
        <text key={v} x={tx(v)} y={PAD.top + CH + 16} textAnchor="middle" fontSize={9} fill={C.text}>{v < 0 ? `${Math.abs(v)} BCE` : v}</text>
      ))}

      <text x={PAD.left + CW / 2} y={H - 4} textAnchor="middle" fontSize={9} fill={C.text}>{xLabel}</text>
      <text x={12} y={PAD.top + CH / 2} textAnchor="middle" fontSize={9} fill={C.text}
        transform={`rotate(-90, 12, ${PAD.top + CH / 2})`}>{yLabel}</text>

      {/* electrification line */}
      <line x1={tx(1880)} x2={tx(1880)} y1={PAD.top} y2={PAD.top + CH} stroke="#ef4444" strokeWidth={1} strokeDasharray="5,3" opacity={0.7} />
      <text x={tx(1880) + 3} y={PAD.top + 10} fontSize={7} fill="#ef4444">1880</text>

      {/* civilization curves on absolute timeline */}
      {CIVS.map((civ) => {
        const pts = biocapCurve(civ.final, civ.chi, N);
        const startYr = civ.peakYr;
        const path = pts.map((v, i) => {
          const yr = startYr + (i / N) * civ.span;
          return `${i === 0 ? "M" : "L"}${tx(yr).toFixed(1)},${y(v).toFixed(1)}`;
        }).join(" ");
        return (
          <g key={civ.name}>
            <path d={path} fill="none" stroke={civ.color} strokeWidth={1.8} strokeLinecap="round" opacity={0.85} />
            <circle cx={tx(startYr)} cy={y(1)} r={2.5} fill={civ.color} />
          </g>
        );
      })}

      {/* start labels are separated into visual lanes and drawn above the curves */}
      {CIVS.map((civ) => {
        const startX = tx(civ.peakYr);
        const offsets: Record<string, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
          "Arab/Islamic": { dx: -7, dy: 16, anchor: "end" },
          "Medieval Europe": { dx: 7, dy: -8, anchor: "start" },
          "British Empire": { dx: -8, dy: -9, anchor: "end" },
          "United States": { dx: -6, dy: 15, anchor: "end" },
          "Sub-Saharan Africa": { dx: 7, dy: 31, anchor: "end" },
        };
        const offset = offsets[civ.name] ?? { dx: 0, dy: -7, anchor: "middle" as const };
        const labelX = startX + offset.dx;
        const labelY = y(1) + offset.dy;
        return (
          <g key={`label-${civ.name}`}>
            {(offset.dx !== 0 || offset.dy !== -7) && (
              <line
                x1={startX}
                y1={y(1)}
                x2={labelX}
                y2={labelY - 3}
                stroke={civ.color}
                strokeWidth={0.7}
                strokeOpacity={0.55}
              />
            )}
            <text
              x={labelX}
              y={labelY}
              textAnchor={offset.anchor}
              fontSize={7}
              fill={civ.color}
              fontWeight={600}
              paintOrder="stroke"
              stroke={C.bg}
              strokeWidth={2.5}
              strokeLinejoin="round"
            >
              {civ.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
