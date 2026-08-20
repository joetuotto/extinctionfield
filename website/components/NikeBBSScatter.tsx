"use client";

const BINS = [
  { label: "0–5",     mid: 2.5,   n: 2,   mean: -2.022, se: 0.762 },
  { label: "5–10",    mid: 7.5,   n: 12,  mean: -0.939, se: 0.703 },
  { label: "10–20",   mid: 15,    n: 31,  mean: -0.145, se: 0.677 },
  { label: "20–30",   mid: 25,    n: 42,  mean: -1.062, se: 0.449 },
  { label: "30–50",   mid: 40,    n: 85,  mean: -0.307, se: 0.396 },
  { label: "50–75",   mid: 62.5,  n: 99,  mean: -0.094, se: 0.332 },
  { label: "75–100",  mid: 87.5,  n: 115, mean: -0.027, se: 0.371 },
  { label: "100–150", mid: 125,   n: 214, mean: -0.301, se: 0.260 },
  { label: "150+",    mid: 266,   n: 781, mean: +0.205, se: 0.137 },
];

function linReg(pts: { x: number; y: number }[]) {
  const n = pts.length;
  const sx = pts.reduce((a, p) => a + p.x, 0);
  const sy = pts.reduce((a, p) => a + p.y, 0);
  const sxy = pts.reduce((a, p) => a + p.x * p.y, 0);
  const sx2 = pts.reduce((a, p) => a + p.x * p.x, 0);
  const slope = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
  const intercept = (sy - slope * sx) / n;
  return { slope, intercept };
}

export function NikeBBSScatter({ locale = "en" }: { locale?: "fi" | "en" }) {
  const fi = locale === "fi";
  const W = 560, H = 320;
  const pad = { top: 20, right: 30, bottom: 52, left: 60 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;

  const xMin = 0, xMax = 300;
  const yMin = -3.5, yMax = 1.5;

  const sx = (v: number) => pad.left + ((v - xMin) / (xMax - xMin)) * cw;
  const sy = (v: number) => pad.top + ((yMax - v) / (yMax - yMin)) * ch;

  const reg = linReg(BINS.map(b => ({ x: b.mid, y: b.mean })));
  const fitX0 = xMin, fitX1 = xMax;
  const fitY0 = reg.intercept + reg.slope * fitX0;
  const fitY1 = reg.intercept + reg.slope * fitX1;

  const yTicks = [-3, -2, -1, 0, 1];
  const xTicks = [0, 50, 100, 150, 200, 250, 300];

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
      <h3 className="text-lg font-semibold mb-1">
        {fi ? "Nike-BBS etäisyysgradientti" : "Nike-BBS distance gradient"}
      </h3>
      <p className="text-sm text-foreground-muted mb-4">
        {fi
          ? "Lintupopulaatiotrendi (%/v) Nike-tutkakohteiden etäisyyden funktiona (N = 1 381 BBS-reittiä)"
          : "Bird population trend (%/yr) as a function of distance from Nike radar sites (N = 1,381 BBS routes)"}
      </p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[420px]"
          role="img"
          aria-label={fi ? "Nike-BBS etäisyys-scatter-kaavio" : "Nike-BBS distance scatter chart"}
        >
          {/* Grid lines */}
          {yTicks.map(t => (
            <g key={`y${t}`}>
              <line
                x1={pad.left} y1={sy(t)} x2={W - pad.right} y2={sy(t)}
                stroke="var(--card-border)" strokeWidth={1}
                strokeDasharray={t === 0 ? "none" : "4,4"}
                opacity={t === 0 ? 0.6 : 0.4}
              />
              <text
                x={pad.left - 8} y={sy(t)}
                fill="var(--foreground-muted)" fontSize={10}
                textAnchor="end" dominantBaseline="middle"
                fontFamily="var(--font-mono)"
              >
                {t > 0 ? `+${t}` : t}
              </text>
            </g>
          ))}

          {/* X axis ticks */}
          {xTicks.map(t => (
            <g key={`x${t}`}>
              <line
                x1={sx(t)} y1={sy(yMin)} x2={sx(t)} y2={sy(yMin) + 5}
                stroke="var(--foreground-muted)" strokeWidth={1}
              />
              <text
                x={sx(t)} y={sy(yMin) + 18}
                fill="var(--foreground-muted)" fontSize={10}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
              >
                {t}
              </text>
            </g>
          ))}

          {/* Axis labels */}
          <text
            x={pad.left + cw / 2} y={H - 4}
            fill="var(--foreground-muted)" fontSize={11}
            textAnchor="middle"
          >
            {fi ? "Etäisyys Nike-kohteeseen (km)" : "Distance to Nike site (km)"}
          </text>
          <text
            x={14} y={pad.top + ch / 2}
            fill="var(--foreground-muted)" fontSize={11}
            textAnchor="middle"
            transform={`rotate(-90, 14, ${pad.top + ch / 2})`}
          >
            {fi ? "Populaatiotrendi (%/v)" : "Population trend (%/yr)"}
          </text>

          {/* Linear fit */}
          <line
            x1={sx(fitX0)} y1={sy(fitY0)}
            x2={sx(fitX1)} y2={sy(fitY1)}
            stroke="var(--accent)" strokeWidth={1.5}
            strokeDasharray="6,4" opacity={0.6}
          />

          {/* 50 km and 100 km reference lines */}
          {[50, 100].map(km => (
            <line
              key={km}
              x1={sx(km)} y1={pad.top} x2={sx(km)} y2={sy(yMin)}
              stroke="var(--status-partial)" strokeWidth={1}
              strokeDasharray="3,3" opacity={0.4}
            />
          ))}
          <text
            x={sx(50) + 3} y={pad.top + 12}
            fill="var(--status-partial)" fontSize={9} opacity={0.7}
          >
            50 km
          </text>
          <text
            x={sx(100) + 3} y={pad.top + 12}
            fill="var(--status-partial)" fontSize={9} opacity={0.7}
          >
            100 km
          </text>

          {/* Data points with error bars */}
          {BINS.map(b => {
            const cx = sx(b.mid);
            const cy = sy(b.mean);
            const top = sy(b.mean + b.se);
            const bot = sy(b.mean - b.se);
            const r = 5;
            const open = b.n < 10;
            const label = `${b.label} km: ${b.mean > 0 ? "+" : ""}${b.mean.toFixed(3)} ±${b.se.toFixed(3)} %/${fi ? "v" : "yr"}, N=${b.n}`;

            return (
              <g key={b.label} tabIndex={0} role="listitem" aria-label={label}>
                <title>{label}</title>
                {/* Error bar */}
                <line x1={cx} y1={top} x2={cx} y2={bot} stroke="var(--accent)" strokeWidth={1.5} opacity={0.5} />
                <line x1={cx - 3} y1={top} x2={cx + 3} y2={top} stroke="var(--accent)" strokeWidth={1.5} opacity={0.5} />
                <line x1={cx - 3} y1={bot} x2={cx + 3} y2={bot} stroke="var(--accent)" strokeWidth={1.5} opacity={0.5} />
                {/* Point */}
                <circle
                  cx={cx} cy={cy} r={r}
                  fill={open ? "var(--card-bg)" : "var(--accent)"}
                  stroke="var(--accent)" strokeWidth={2}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-foreground-muted">
        <span>● N ≥ 10</span>
        <span>○ N &lt; 10</span>
        <span style={{ borderBottom: "2px dashed var(--accent)", paddingBottom: 1 }}>
          {fi ? "Lineaarinen sovitus" : "Linear fit"}
        </span>
        <span className="font-mono-num">Welch p = 0.031</span>
        <span className="font-mono-num">ρ = +0.088</span>
      </div>
    </div>
  );
}
