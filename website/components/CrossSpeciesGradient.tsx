"use client";

const SPECIES_DATA = [
  { name: "Wild insects", emf: 0.05, decline: 12 },
  { name: "Amphibians", emf: 0.15, decline: 15 },
  { name: "Wild birds", emf: 0.25, decline: 30 },
  { name: "Horses", emf: 0.40, decline: 20 },
  { name: "Dairy cattle", emf: 0.50, decline: 35 },
  { name: "Pet dogs/cats", emf: 0.70, decline: 25 },
  { name: "Humans", emf: 1.00, decline: 50 },
];

const SLOPE = 0.3321;
const INTERCEPT = 0.1224;

export function CrossSpeciesGradient() {
  const W = 600;
  const H = 340;
  const PAD = { top: 20, right: 30, bottom: 50, left: 60 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const xScale = (v: number) => PAD.left + v * plotW;
  const yScale = (v: number) => PAD.top + plotH - (v / 60) * plotH;

  const lineX0 = 0;
  const lineX1 = 1.0;
  const lineY0 = (INTERCEPT + SLOPE * lineX0) * 100;
  const lineY1 = (INTERCEPT + SLOPE * lineX1) * 100;

  return (
    <div className="chart-scroll">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="chart-svg w-full min-w-[560px] max-w-[600px] mx-auto"
        role="img"
        aria-label="Cross-species EMF gradient scatter plot"
      >
        {/* Grid lines */}
        {[0, 10, 20, 30, 40, 50, 60].map((v) => (
          <line
            key={v}
            x1={PAD.left}
            y1={yScale(v)}
            x2={W - PAD.right}
            y2={yScale(v)}
            stroke="currentColor"
            strokeOpacity={0.08}
          />
        ))}

        {/* Regression line */}
        <line
          x1={xScale(lineX0)}
          y1={yScale(lineY0)}
          x2={xScale(lineX1)}
          y2={yScale(lineY1)}
          stroke="var(--color-accent, #3b82f6)"
          strokeWidth={2}
          strokeDasharray="6 4"
          strokeOpacity={0.6}
        />

        {/* Data points */}
        {SPECIES_DATA.map((d) => (
          <g key={d.name}>
            <circle
              cx={xScale(d.emf)}
              cy={yScale(d.decline)}
              r={6}
              fill="var(--color-accent, #3b82f6)"
              fillOpacity={0.8}
              stroke="var(--color-accent, #3b82f6)"
              strokeWidth={1.5}
              strokeOpacity={0.3}
            />
            <text
              x={xScale(d.emf)}
              y={yScale(d.decline) - 10}
              textAnchor="middle"
              className="text-[10px] fill-foreground-muted"
            >
              {d.name}
            </text>
          </g>
        ))}

        {/* Axes */}
        <line
          x1={PAD.left}
          y1={PAD.top + plotH}
          x2={W - PAD.right}
          y2={PAD.top + plotH}
          stroke="currentColor"
          strokeOpacity={0.3}
        />
        <line
          x1={PAD.left}
          y1={PAD.top}
          x2={PAD.left}
          y2={PAD.top + plotH}
          stroke="currentColor"
          strokeOpacity={0.3}
        />

        {/* X axis labels */}
        {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
          <text
            key={v}
            x={xScale(v)}
            y={PAD.top + plotH + 18}
            textAnchor="middle"
            className="text-[11px] fill-foreground-muted"
          >
            {v.toFixed(2)}
          </text>
        ))}
        <text
          x={PAD.left + plotW / 2}
          y={H - 5}
          textAnchor="middle"
          className="text-[12px] fill-foreground-muted"
        >
          Estimated EMF burden
        </text>

        {/* Y axis labels */}
        {[0, 10, 20, 30, 40, 50].map((v) => (
          <text
            key={v}
            x={PAD.left - 8}
            y={yScale(v) + 4}
            textAnchor="end"
            className="text-[11px] fill-foreground-muted"
          >
            {v}%
          </text>
        ))}
        <text
          x={15}
          y={PAD.top + plotH / 2}
          textAnchor="middle"
          className="text-[12px] fill-foreground-muted"
          transform={`rotate(-90, 15, ${PAD.top + plotH / 2})`}
        >
          Reproductive decline
        </text>

        {/* Fit annotation */}
        <text
          x={W - PAD.right - 5}
          y={PAD.top + 15}
          textAnchor="end"
          className="text-[11px] fill-foreground-muted"
        >
          r = 0.84, p = 0.017
        </text>
      </svg>
    </div>
  );
}
