"use client";

const COPY = {
  en: {
    tIndex: "T-index (baseline = 100)",
    tfr: "TFR (children per woman)",
    lag: "~35 yr lag",
    threshold: "40% loss threshold",
    crossed: "Threshold crossed",
    forecast: "Forecast",
    observed: "Observed",
  },
  fi: {
    tIndex: "T-indeksi (perustaso = 100)",
    tfr: "TFR (lasta naista kohden)",
    lag: "~35 v viive",
    threshold: "40 %:n menetyskynnys",
    crossed: "Kynnys ylitetty",
    forecast: "Ennuste",
    observed: "Havaittu",
  },
};

const TFR_HIST: [number, number][] = [
  [1970, 1.83], [1975, 1.69], [1980, 1.63], [1985, 1.65],
  [1990, 1.78], [1995, 1.81], [2000, 1.73], [2005, 1.80],
  [2010, 1.87], [2015, 1.65], [2018, 1.41], [2020, 1.37],
  [2022, 1.32], [2024, 1.26],
];
const TFR_PROJ: [number, number][] = [[2030, 1.10], [2035, 0.95]];

const ML = 56, MR = 16, W = 700;
const PANEL_GAP = 24;
const P1_TOP = 32, P1_BOT = 175;
const P2_TOP = P1_BOT + PANEL_GAP, P2_BOT = 370;
const XBOT = P2_BOT + 20;
const TOTAL_H = XBOT + 10;

const P1_H = P1_BOT - P1_TOP;
const P2_H = P2_BOT - P2_TOP;

const px = (yr: number) => ML + ((yr - 1970) / 65) * (W - ML - MR);
const pyT = (v: number) => P1_TOP + ((100 - v) / 65) * P1_H;
const pyF = (v: number) => P2_TOP + ((2.0 - v) / 1.2) * P2_H;
const tVal = (yr: number) => 100 * 0.988 ** (yr - 1970);

function svgLine(data: [number, number][], yFn: (v: number) => number): string {
  return data
    .map(([yr, v], i) => `${i ? "L" : "M"}${px(yr).toFixed(1)},${yFn(v).toFixed(1)}`)
    .join("");
}

export function FinlandLagChart({ locale }: { locale: string }) {
  const L = locale === "fi" ? COPY.fi : COPY.en;

  const years = Array.from({ length: 55 }, (_, i) => 1970 + i);
  const tSolid = years.slice(0, 2025 - 1970)
    .map((yr, i) => `${i ? "L" : "M"}${px(yr).toFixed(1)},${pyT(tVal(yr)).toFixed(1)}`)
    .join("");
  const tDash = [2024, 2028, 2032, 2035]
    .map((yr, i) => `${i ? "L" : "M"}${px(yr).toFixed(1)},${pyT(tVal(yr)).toFixed(1)}`)
    .join("");
  const fSolid = svgLine(TFR_HIST, pyF);
  const fDash = svgLine([[2024, 1.26], ...TFR_PROJ], pyF);

  const thY = pyT(60);
  const cX = px(2018);
  const forecastX = px(2024);

  const lagStartX = px(1975);
  const lagStartY = pyT(tVal(1975));
  const lagEndX = px(2010);
  const lagEndY = pyF(1.87);
  const lagMidX = (lagStartX + lagEndX) / 2;
  const lagMidY = P1_BOT + PANEL_GAP / 2;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${TOTAL_H}`} className="w-full max-w-[700px]" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Finland T-index vs TFR lag chart, 1970–2035">
        <defs>
          <marker id="lag-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0.5 L7,3 L0,5.5" fill="none" stroke="var(--foreground-muted)" strokeWidth="1.5" />
          </marker>
        </defs>

        {/* Forecast zone across both panels */}
        <rect x={forecastX} y={P1_TOP} width={px(2035) - forecastX} height={P1_H}
          fill="var(--foreground)" opacity={0.04} rx={4} />
        <rect x={forecastX} y={P2_TOP} width={px(2035) - forecastX} height={P2_H}
          fill="var(--foreground)" opacity={0.04} rx={4} />
        <text x={forecastX + 6} y={P1_TOP + 14} fill="var(--foreground-muted)" fontSize={10} opacity={0.6}>
          {L.forecast}
        </text>

        {/* ── Panel 1: T-index ── */}
        <text x={ML} y={P1_TOP - 10} fill="var(--accent)" fontSize={12} fontWeight={600}>
          {L.tIndex}
        </text>

        {[40, 60, 80, 100].map((v) => (
          <g key={`t-${v}`}>
            <line x1={ML} y1={pyT(v)} x2={W - MR} y2={pyT(v)}
              stroke="var(--foreground)" opacity={0.06} />
            <text x={ML - 8} y={pyT(v) + 4} textAnchor="end"
              fill="var(--foreground-muted)" fontSize={11}>{v}</text>
          </g>
        ))}

        <line x1={ML} y1={P1_TOP} x2={ML} y2={P1_BOT} stroke="var(--foreground)" opacity={0.12} />
        <line x1={ML} y1={P1_BOT} x2={W - MR} y2={P1_BOT} stroke="var(--foreground)" opacity={0.12} />

        {/* Threshold line */}
        <line x1={ML} y1={thY} x2={W - MR} y2={thY}
          stroke="var(--status-refuted)" strokeWidth={1} strokeDasharray="6 4" opacity={0.5} />
        <text x={ML + 4} y={thY - 6} fill="var(--status-refuted)" fontSize={11} opacity={0.7}>
          {L.threshold}
        </text>

        {/* T-index line */}
        <path d={tSolid} fill="none" stroke="var(--accent)" strokeWidth={2.5} />
        <path d={tDash} fill="none" stroke="var(--accent)" strokeWidth={2}
          strokeDasharray="6 4" opacity={0.5} />

        {/* Threshold crossed marker */}
        <line x1={cX} y1={thY} x2={cX} y2={P1_BOT}
          stroke="var(--status-refuted)" strokeWidth={1} strokeDasharray="3 3" opacity={0.35} />
        <text x={cX + 14} y={(thY + P1_BOT) / 2} fill="var(--status-refuted)" fontSize={11} opacity={0.7}
          textAnchor="middle"
          transform={`rotate(-90 ${cX + 14} ${(thY + P1_BOT) / 2})`}>{L.crossed}</text>

        {/* ── Panel 2: TFR ── */}
        <text x={ML} y={P2_TOP - 10} fill="var(--status-partial)" fontSize={12} fontWeight={600}>
          {L.tfr}
        </text>

        {[0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0].map((v) => (
          <g key={`f-${v}`}>
            <line x1={ML} y1={pyF(v)} x2={W - MR} y2={pyF(v)}
              stroke="var(--foreground)" opacity={0.06} />
            <text x={ML - 8} y={pyF(v) + 4} textAnchor="end"
              fill="var(--foreground-muted)" fontSize={11}>{v.toFixed(1)}</text>
          </g>
        ))}

        <line x1={ML} y1={P2_TOP} x2={ML} y2={P2_BOT} stroke="var(--foreground)" opacity={0.12} />
        <line x1={ML} y1={P2_BOT} x2={W - MR} y2={P2_BOT} stroke="var(--foreground)" opacity={0.12} />

        {/* TFR line + dots */}
        <path d={fSolid} fill="none" stroke="var(--status-partial)" strokeWidth={2.5} />
        <path d={fDash} fill="none" stroke="var(--status-partial)" strokeWidth={2}
          strokeDasharray="6 4" opacity={0.5} />
        {TFR_HIST.map(([yr, v]) => (
          <circle key={yr} cx={px(yr)} cy={pyF(v)} r={3} fill="var(--status-partial)" />
        ))}

        {/* ── Shared x-axis ── */}
        {[1970, 1980, 1990, 2000, 2010, 2020, 2030].map((yr) => (
          <text key={yr} x={px(yr)} y={XBOT} textAnchor="middle"
            fill="var(--foreground-muted)" fontSize={11}>{yr}</text>
        ))}

        {/* ── Lag arrow connecting panels ── */}
        <path d={`M${lagStartX},${lagStartY} C${lagStartX + 40},${lagMidY} ${lagEndX - 40},${lagMidY} ${lagEndX},${lagEndY}`}
          fill="none" stroke="var(--foreground-muted)" strokeWidth={1.5}
          strokeDasharray="5 3" markerEnd="url(#lag-arr)" />
        <circle cx={lagStartX} cy={lagStartY} r={4} fill="var(--accent)" />
        <circle cx={lagEndX} cy={lagEndY} r={4} fill="var(--status-partial)" />
        <text x={lagMidX} y={lagMidY + 5} textAnchor="middle"
          fill="var(--foreground)" fontSize={13} fontWeight={700}>
          {L.lag}
        </text>
      </svg>
    </div>
  );
}
