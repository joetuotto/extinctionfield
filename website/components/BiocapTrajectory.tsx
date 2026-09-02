"use client";

import trajectoryData from "@/public/data/berm_cultural_energy_model.json";

const PAD = { top: 40, right: 24, bottom: 56, left: 56 };
const W = 700;
const H = 380;
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const C = {
  grid: "var(--card-border)",
  text: "var(--foreground-muted)",
  title: "var(--foreground)",
  bg: "var(--card-bg)",
};

const PHASE_COLORS: Record<string, string> = {
  RATIONALISTIC: "rgba(34,197,94,0.08)",
  DEISTIC: "rgba(59,130,246,0.08)",
  MANISTIC: "rgba(234,179,8,0.08)",
  ZOISTIC: "rgba(239,68,68,0.08)",
};

const PHASE_BORDER: Record<string, string> = {
  RATIONALISTIC: "#22c55e",
  DEISTIC: "#3b82f6",
  MANISTIC: "#eab308",
  ZOISTIC: "#ef4444",
};

const BIOMARKER_COLORS: Record<string, string> = {
  T: "#ef4444",
  OXT: "#f59e0b",
  DA: "#8b5cf6",
  MEL: "#3b82f6",
  BDNF: "#10b981",
  CORT: "#ec4899",
  D: "#06b6d4",
  B2: "#84cc16",
};

/** Amish (0.05× EMF) BioCap at the reference year — computed by berm/export_cultural_energy.py. */
const AMISH_BIOCAP: number = trajectoryData.environments.amish.biocap;

interface Props {
  chartTitle: string;
  xLabel: string;
  yLabel: string;
  amishLabel?: string;
  nowLabel?: string;
  forecastLabel?: string;
}

const data = trajectoryData.trajectory;
const Y_MIN = 1900;
const Y_MAX = 2060;

function xPos(year: number) {
  return PAD.left + ((year - Y_MIN) / (Y_MAX - Y_MIN)) * CW;
}
function yPos(v: number) {
  return PAD.top + (1 - v) * CH;
}

export function BiocapTrajectory({ chartTitle, xLabel, yLabel, amishLabel, nowLabel, forecastLabel }: Props) {
  const nowIdx = data.findIndex((d) => d.year >= 2025);
  const historicalPath = data
    .slice(0, nowIdx + 1)
    .map((d, i) => `${i === 0 ? "M" : "L"}${xPos(d.year).toFixed(1)},${yPos(d.biocap).toFixed(1)}`)
    .join(" ");
  const forecastPath = data
    .slice(nowIdx)
    .map((d, i) => `${i === 0 ? "M" : "L"}${xPos(d.year).toFixed(1)},${yPos(d.biocap).toFixed(1)}`)
    .join(" ");

  const phases = data.reduce<{ phase: string; startYear: number; endYear: number }[]>((acc, d) => {
    const last = acc[acc.length - 1];
    if (last && last.phase === d.phase) {
      last.endYear = d.year;
    } else {
      acc.push({ phase: d.phase, startYear: d.year, endYear: d.year });
    }
    return acc;
  }, []);

  const decades = [];
  for (let y = 1900; y <= 2060; y += 20) decades.push(y);

  return (
    <div className="chart-scroll">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[700px]">
        <text x={W / 2} y={18} textAnchor="middle" fill={C.title} fontSize={13} fontWeight={600}>
          {chartTitle}
        </text>

        {phases.map((p) => (
          <rect
            key={p.phase + p.startYear}
            x={xPos(p.startYear)}
            y={PAD.top}
            width={xPos(p.endYear) - xPos(p.startYear)}
            height={CH}
            fill={PHASE_COLORS[p.phase] || "transparent"}
          />
        ))}

        {phases.slice(1).map((p) => (
          <line
            key={"tr-" + p.startYear}
            x1={xPos(p.startYear)}
            y1={PAD.top}
            x2={xPos(p.startYear)}
            y2={PAD.top + CH}
            stroke={PHASE_BORDER[p.phase] || C.grid}
            strokeWidth={1}
            strokeDasharray="4 3"
          />
        ))}

        {phases.map((p) => {
          const mx = (xPos(p.startYear) + xPos(p.endYear)) / 2;
          return (
            <text key={"pl-" + p.phase} x={mx} y={PAD.top + 14} textAnchor="middle" fill={PHASE_BORDER[p.phase]} fontSize={9} fontWeight={500}>
              {p.phase.charAt(0) + p.phase.slice(1).toLowerCase()}
            </text>
          );
        })}

        {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
          <g key={v}>
            <line x1={PAD.left} y1={yPos(v)} x2={W - PAD.right} y2={yPos(v)} stroke={C.grid} strokeWidth={0.5} />
            <text x={PAD.left - 8} y={yPos(v) + 3} textAnchor="end" fill={C.text} fontSize={10}>
              {v.toFixed(2)}
            </text>
          </g>
        ))}

        {decades.map((yr) => (
          <g key={yr}>
            <line x1={xPos(yr)} y1={PAD.top + CH} x2={xPos(yr)} y2={PAD.top + CH + 4} stroke={C.grid} strokeWidth={0.5} />
            <text x={xPos(yr)} y={PAD.top + CH + 16} textAnchor="middle" fill={C.text} fontSize={10}>
              {yr}
            </text>
          </g>
        ))}

        <line
          x1={PAD.left}
          y1={yPos(AMISH_BIOCAP)}
          x2={W - PAD.right}
          y2={yPos(AMISH_BIOCAP)}
          stroke="#22c55e"
          strokeWidth={1}
          strokeDasharray="6 3"
          opacity={0.7}
        />
        {amishLabel && (
          <text x={W - PAD.right - 4} y={yPos(AMISH_BIOCAP) - 5} textAnchor="end" fill="#22c55e" fontSize={9} fontWeight={500}>
            {amishLabel} {AMISH_BIOCAP.toFixed(3)}
          </text>
        )}

        <path d={historicalPath} fill="none" stroke="#3b82f6" strokeWidth={2.5} />
        <path d={forecastPath} fill="none" stroke="#3b82f6" strokeWidth={2} strokeDasharray="6 4" opacity={0.7} />

        {nowIdx >= 0 && (
          <>
            <line
              x1={xPos(2025)}
              y1={PAD.top}
              x2={xPos(2025)}
              y2={PAD.top + CH}
              stroke={C.title}
              strokeWidth={1}
              strokeDasharray="2 2"
            />
            <circle cx={xPos(2025)} cy={yPos(data[nowIdx].biocap)} r={4} fill="#3b82f6" stroke="white" strokeWidth={1.5} />
            {nowLabel && (
              <text x={xPos(2025) + 6} y={yPos(data[nowIdx].biocap) - 8} fill={C.title} fontSize={10} fontWeight={600}>
                {nowLabel} {data[nowIdx].biocap.toFixed(3)}
              </text>
            )}
          </>
        )}

        {forecastLabel && (
          <text x={xPos(2045)} y={yPos(0.45) - 8} textAnchor="middle" fill={C.text} fontSize={9} fontStyle="italic">
            {forecastLabel}
          </text>
        )}

        <text x={W / 2} y={H - 4} textAnchor="middle" fill={C.text} fontSize={10}>
          {xLabel}
        </text>
        <text
          x={14}
          y={PAD.top + CH / 2}
          textAnchor="middle"
          fill={C.text}
          fontSize={10}
          transform={`rotate(-90, 14, ${PAD.top + CH / 2})`}
        >
          {yLabel}
        </text>
      </svg>
    </div>
  );
}

interface BiomarkerLinesProps {
  chartTitle: string;
  xLabel: string;
  yLabel: string;
  markers: { symbol: string; label: string }[];
}

export function BiomarkerTrajectoryLines({ chartTitle, xLabel, yLabel, markers }: BiomarkerLinesProps) {
  const keys = markers.map((m) => m.symbol);
  const decades = [];
  for (let y = 1900; y <= 2060; y += 20) decades.push(y);

  return (
    <div className="chart-scroll">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[700px]">
        <text x={W / 2} y={18} textAnchor="middle" fill={C.title} fontSize={13} fontWeight={600}>
          {chartTitle}
        </text>

        {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
          <g key={v}>
            <line x1={PAD.left} y1={yPos(v)} x2={W - PAD.right} y2={yPos(v)} stroke={C.grid} strokeWidth={0.5} />
            <text x={PAD.left - 8} y={yPos(v) + 3} textAnchor="end" fill={C.text} fontSize={10}>
              {v.toFixed(2)}
            </text>
          </g>
        ))}

        {decades.map((yr) => (
          <g key={yr}>
            <line x1={xPos(yr)} y1={PAD.top + CH} x2={xPos(yr)} y2={PAD.top + CH + 4} stroke={C.grid} strokeWidth={0.5} />
            <text x={xPos(yr)} y={PAD.top + CH + 16} textAnchor="middle" fill={C.text} fontSize={10}>
              {yr}
            </text>
          </g>
        ))}

        {keys.map((key) => {
          const color = BIOMARKER_COLORS[key] || "#888";
          const path = data
            .map((d, i) => {
              const val = (d as unknown as Record<string, number>)[key] ?? 1;
              return `${i === 0 ? "M" : "L"}${xPos(d.year).toFixed(1)},${yPos(val).toFixed(1)}`;
            })
            .join(" ");
          const lastD = data[data.length - 1];
          const lastVal = (lastD as unknown as Record<string, number>)[key] ?? 1;
          return (
            <g key={key}>
              <path d={path} fill="none" stroke={color} strokeWidth={1.5} />
              <text x={xPos(lastD.year) + 4} y={yPos(lastVal) + 3} fill={color} fontSize={9} fontWeight={600}>
                {key}
              </text>
            </g>
          );
        })}

        <text x={W / 2} y={H - 4} textAnchor="middle" fill={C.text} fontSize={10}>
          {xLabel}
        </text>
        <text
          x={14}
          y={PAD.top + CH / 2}
          textAnchor="middle"
          fill={C.text}
          fontSize={10}
          transform={`rotate(-90, 14, ${PAD.top + CH / 2})`}
        >
          {yLabel}
        </text>
      </svg>
    </div>
  );
}
