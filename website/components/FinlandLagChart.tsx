"use client";

const COPY = {
  en: {
    tIndex: "T-index",
    tfr: "TFR",
    lag: "~35 yr lag",
    threshold: "Threshold (40% loss)",
    crossed: "Threshold crossed",
  },
  fi: {
    tIndex: "T-indeksi",
    tfr: "TFR",
    lag: "~35 v viive",
    threshold: "Kynnys (40 % menetys)",
    crossed: "Kynnys ylitetty",
  },
};

const TFR_HIST: [number, number][] = [
  [1970, 1.83], [1975, 1.69], [1980, 1.63], [1985, 1.65],
  [1990, 1.78], [1995, 1.81], [2000, 1.73], [2005, 1.80],
  [2010, 1.87], [2015, 1.65], [2018, 1.41], [2020, 1.37],
  [2022, 1.32], [2024, 1.26],
];
const TFR_PROJ: [number, number][] = [[2030, 1.10], [2035, 0.95]];

const ML = 52, MR = 48, MT = 28, MB = 38;
const CW = 700 - ML - MR, CH = 350 - MT - MB;
const BOT = 350 - MB;

const px = (yr: number) => ML + ((yr - 1970) / 65) * CW;
const pyT = (v: number) => MT + ((100 - v) / 60) * CH;
const pyF = (v: number) => MT + ((2.0 - v) / 1.2) * CH;
const tVal = (yr: number) => 100 * 0.988 ** (yr - 1970);

function svgLine(data: [number, number][], yFn: (v: number) => number): string {
  return data
    .map(([yr, v], i) => `${i ? "L" : "M"}${px(yr).toFixed(1)},${yFn(v).toFixed(1)}`)
    .join("");
}

export function FinlandLagChart({ locale }: { locale: string }) {
  const L = locale === "fi" ? COPY.fi : COPY.en;

  const years = Array.from({ length: 55 }, (_, i) => 1970 + i);
  const tSolid = years
    .map((yr, i) => `${i ? "L" : "M"}${px(yr).toFixed(1)},${pyT(tVal(yr)).toFixed(1)}`)
    .join("");
  const tDash = [2024, 2028, 2032, 2035]
    .map((yr, i) => `${i ? "L" : "M"}${px(yr).toFixed(1)},${pyT(tVal(yr)).toFixed(1)}`)
    .join("");
  const fSolid = svgLine(TFR_HIST, pyF);
  const fDash = svgLine([[2024, 1.26], ...TFR_PROJ], pyF);

  const thY = pyT(60);
  const cX = px(2018);
  const lS = { x: px(1975), y: pyT(tVal(1975)) };
  const lE = { x: px(2010), y: pyF(1.87) };
  const lM = { x: (lS.x + lE.x) / 2, y: Math.max(lS.y, lE.y) + 110 };

  return (
    <div className="overflow-x-auto">
      <svg viewBox="0 0 700 350" className="w-full max-w-[700px]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="lag-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0.5 L7,3 L0,5.5" fill="none" stroke="var(--foreground-muted)" strokeWidth="1.5" />
          </marker>
        </defs>

        {[40, 60, 80, 100].map((v) => (
          <line key={v} x1={ML} y1={pyT(v)} x2={700 - MR} y2={pyT(v)}
            stroke="var(--foreground)" opacity={0.06} />
        ))}

        <line x1={ML} y1={MT} x2={ML} y2={BOT} stroke="var(--foreground)" opacity={0.15} />
        <line x1={ML} y1={BOT} x2={700 - MR} y2={BOT} stroke="var(--foreground)" opacity={0.15} />
        <line x1={700 - MR} y1={MT} x2={700 - MR} y2={BOT} stroke="var(--foreground)" opacity={0.15} />

        {[1970, 1980, 1990, 2000, 2010, 2020, 2030].map((yr) => (
          <text key={yr} x={px(yr)} y={BOT + 16} textAnchor="middle"
            fill="var(--foreground-muted)" fontSize={10} fontFamily="system-ui">{yr}</text>
        ))}

        {[40, 60, 80, 100].map((v) => (
          <text key={v} x={ML - 6} y={pyT(v) + 3.5} textAnchor="end"
            fill="#3B82F6" fontSize={9} fontFamily="system-ui">{v}</text>
        ))}

        {[1.0, 1.5, 2.0].map((v) => (
          <text key={v} x={700 - MR + 6} y={pyF(v) + 3.5} textAnchor="start"
            fill="#F59E0B" fontSize={9} fontFamily="system-ui">{v.toFixed(1)}</text>
        ))}

        <line x1={ML} y1={thY} x2={700 - MR} y2={thY}
          stroke="#EF4444" strokeWidth={1} strokeDasharray="6 4" opacity={0.5} />
        <text x={ML + 4} y={thY - 5} fill="#EF4444" fontSize={8} opacity={0.7}
          fontFamily="system-ui">{L.threshold}</text>

        <path d={tSolid} fill="none" stroke="#3B82F6" strokeWidth={2} />
        <path d={tDash} fill="none" stroke="#3B82F6" strokeWidth={1.8}
          strokeDasharray="6 4" opacity={0.5} />

        <path d={fSolid} fill="none" stroke="#F59E0B" strokeWidth={2} />
        <path d={fDash} fill="none" stroke="#F59E0B" strokeWidth={1.8}
          strokeDasharray="6 4" opacity={0.5} />

        {TFR_HIST.map(([yr, v]) => (
          <circle key={yr} cx={px(yr)} cy={pyF(v)} r={2.5} fill="#F59E0B" />
        ))}

        <line x1={cX} y1={thY} x2={cX} y2={BOT}
          stroke="#EF4444" strokeWidth={1} strokeDasharray="3 3" opacity={0.4} />
        <text x={cX + 12} y={(thY + BOT) / 2} fill="#EF4444" fontSize={8.5} opacity={0.7}
          textAnchor="middle" fontFamily="system-ui"
          transform={`rotate(-90 ${cX + 12} ${(thY + BOT) / 2})`}>{L.crossed}</text>

        <path d={`M${lS.x},${lS.y} Q${lM.x},${lM.y} ${lE.x},${lE.y}`}
          fill="none" stroke="var(--foreground-muted)" strokeWidth={1.5}
          strokeDasharray="5 3" markerEnd="url(#lag-arr)" />
        <circle cx={lS.x} cy={lS.y} r={3} fill="#3B82F6" />
        <circle cx={lE.x} cy={lE.y} r={3} fill="#F59E0B" />
        <text x={lM.x} y={lM.y + 15} textAnchor="middle"
          fill="var(--foreground)" fontSize={12} fontWeight={700} fontFamily="system-ui">
          {L.lag}
        </text>

        <g transform={`translate(${ML + 8},${MT + 6})`}>
          <line x1={0} y1={0} x2={18} y2={0} stroke="#3B82F6" strokeWidth={2} />
          <text x={22} y={3.5} fill="var(--foreground)" fontSize={10}
            fontFamily="system-ui">{L.tIndex}</text>
          <line x1={80} y1={0} x2={98} y2={0} stroke="#F59E0B" strokeWidth={2} />
          <text x={102} y={3.5} fill="var(--foreground)" fontSize={10}
            fontFamily="system-ui">{L.tfr}</text>
        </g>
      </svg>
    </div>
  );
}
