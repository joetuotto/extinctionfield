"use client";

const W = 560;
const H = 100;
const PAD = { left: 40, right: 16, top: 20, bottom: 24 };
const CW = W - PAD.left - PAD.right;

const MINIMA = [
  { name: "Oort", start: 1010, end: 1050 },
  { name: "Wolf", start: 1280, end: 1350 },
  { name: "Spörer", start: 1460, end: 1550 },
  { name: "Maunder", start: 1645, end: 1715 },
  { name: "Dalton", start: 1790, end: 1830 },
  { name: "2020–53", start: 2020, end: 2053 },
];

const RENAISSANCES = [
  { name: "Italian Ren.", year: 1500, minimum: "Spörer" },
  { name: "Scientific Rev.", year: 1680, minimum: "Maunder" },
  { name: "Glorious Rev.", year: 1688, minimum: "Maunder" },
  { name: "Romanticism", year: 1810, minimum: "Dalton" },
  { name: "Waterloo", year: 1815, minimum: "Dalton" },
];

const X_LO = 1000;
const X_HI = 2100;

function tx(yr: number) {
  return PAD.left + ((yr - X_LO) / (X_HI - X_LO)) * CW;
}

const C = {
  grid: "var(--card-border)",
  text: "var(--foreground-muted)",
  title: "var(--foreground)",
  minimum: "#3b82f6",
  electrification: "#ef4444",
  renaissance: "#f59e0b",
};

export function SolarMiniTimeline() {
  const barY = PAD.top + 10;
  const barH = 24;

  return (
    <div className="chart-scroll">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[560px]" role="img" aria-label="Solar minima and renaissances timeline 1000-2100">
      {/* baseline */}
      <line x1={PAD.left} x2={PAD.left + CW} y1={barY + barH / 2} y2={barY + barH / 2} stroke={C.grid} strokeWidth={1} />

      {/* minima bands */}
      {MINIMA.map((m) => (
        <g key={m.name}>
          <rect x={tx(m.start)} y={barY} width={tx(m.end) - tx(m.start)} height={barH} fill={C.minimum} opacity={0.25} rx={2} />
          <text x={(tx(m.start) + tx(m.end)) / 2} y={barY - 3} textAnchor="middle" fontSize={7} fill={C.minimum} fontWeight={500}>{m.name}</text>
        </g>
      ))}

      {/* electrification line */}
      <line x1={tx(1880)} x2={tx(1880)} y1={barY - 8} y2={barY + barH + 4} stroke={C.electrification} strokeWidth={1.5} strokeDasharray="4,2" />
      <text x={tx(1880)} y={barY + barH + 14} textAnchor="middle" fontSize={7} fill={C.electrification} fontWeight={600}>1880</text>

      {/* renaissance markers */}
      {RENAISSANCES.map((r, i) => (
        <g key={r.name}>
          <circle cx={tx(r.year)} cy={barY + barH / 2} r={3} fill={C.renaissance} />
          <text x={tx(r.year)} y={barY + barH + 12 + (i % 2) * 9} textAnchor="middle" fontSize={6} fill={C.renaissance}>{r.name}</text>
        </g>
      ))}

      {/* x labels */}
      {[1000, 1200, 1400, 1600, 1800, 2000].map((yr) => (
        <text key={yr} x={tx(yr)} y={H - 2} textAnchor="middle" fontSize={8} fill={C.text}>{yr}</text>
      ))}
      </svg>
    </div>
  );
}
