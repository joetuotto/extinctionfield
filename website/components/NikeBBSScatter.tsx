/**
 * Test A distance bins: BBS route trends by distance to the nearest Nike site.
 * `mean` is the bin's mean route trend in %/yr, `se` its standard error.
 */
const BINS = [
  { label: "0–5", mid: 2.5, n: 2, mean: -2.022, se: 0.762 },
  { label: "5–10", mid: 7.5, n: 12, mean: -0.939, se: 0.703 },
  { label: "10–20", mid: 15, n: 31, mean: -0.145, se: 0.677 },
  { label: "20–30", mid: 25, n: 42, mean: -1.062, se: 0.449 },
  { label: "30–50", mid: 40, n: 85, mean: -0.307, se: 0.396 },
  { label: "50–75", mid: 62.5, n: 99, mean: -0.094, se: 0.332 },
  { label: "75–100", mid: 87.5, n: 115, mean: -0.027, se: 0.371 },
  { label: "100–150", mid: 125, n: 214, mean: -0.301, se: 0.260 },
  { label: "150+", mid: 266, n: 781, mean: 0.205, se: 0.137 },
];

/**
 * Reported fit from the route-level regression over all 1,381 routes —
 * NOT a refit of the nine bin means. Refitting the bins unweighted gives
 * β = +0.0051/km, which would draw a slope the analysis never reported.
 */
const FIT = { intercept: -0.404, slope: 0.00187 };

const TOTAL_ROUTES = 1381;

/** Marker radius in viewBox units, by how many routes the bin holds. */
function radiusFor(n: number) {
  if (n >= 100) return 5;
  if (n >= 30) return 4.2;
  return 3.4;
}

/**
 * One rendering of the chart. Both variants are emitted and toggled by CSS
 * breakpoints rather than a resize listener, so the correct layout is present
 * in the first paint and needs no client JavaScript.
 */
function Chart({ compact, fi }: { compact: boolean; fi: boolean }) {
  const W = compact ? 360 : 560;
  const H = compact ? 300 : 320;
  const pad = compact
    ? { top: 16, right: 18, bottom: 46, left: 42 }
    : { top: 20, right: 30, bottom: 52, left: 60 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;

  const xMin = 0, xMax = 300;
  const yMin = -3.0, yMax = 1.2;

  const sx = (v: number) => pad.left + ((v - xMin) / (xMax - xMin)) * cw;
  const sy = (v: number) => pad.top + ((yMax - v) / (yMax - yMin)) * ch;

  const yTicks = [-3, -2, -1, 0, 1];
  const xTicks = compact ? [0, 100, 200, 300] : [0, 50, 100, 150, 200, 250, 300];
  const axisFont = compact ? 12 : 10;
  const labelFont = compact ? 13 : 11;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={
        fi
          ? "Nike-BBS etäisyys-scatter-kaavio: lintutrendi yhdeksässä etäisyysluokassa"
          : "Nike-BBS distance scatter chart: bird trend across nine distance bins"
      }
    >
      {/* y tick labels only — no background grid */}
      {yTicks.map((t) => (
        <text
          key={`y${t}`}
          x={pad.left - 7}
          y={sy(t)}
          fill="var(--foreground-muted)"
          fontSize={axisFont}
          textAnchor="end"
          dominantBaseline="middle"
          fontFamily="var(--font-mono)"
        >
          {t > 0 ? `+${t}` : t}
        </text>
      ))}

      {/* zero reference */}
      <line
        x1={pad.left}
        y1={sy(0)}
        x2={W - pad.right}
        y2={sy(0)}
        stroke="var(--foreground-muted)"
        strokeWidth={1}
        strokeDasharray="4,4"
        opacity={0.45}
      />

      {/* x axis */}
      <line
        x1={pad.left}
        y1={sy(yMin)}
        x2={W - pad.right}
        y2={sy(yMin)}
        stroke="var(--card-border)"
        strokeWidth={1}
      />
      {xTicks.map((t) => (
        <g key={`x${t}`}>
          <line
            x1={sx(t)}
            y1={sy(yMin)}
            x2={sx(t)}
            y2={sy(yMin) + 4}
            stroke="var(--foreground-muted)"
            strokeWidth={1}
            opacity={0.6}
          />
          <text
            x={sx(t)}
            y={sy(yMin) + 16}
            fill="var(--foreground-muted)"
            fontSize={axisFont}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            {t}
          </text>
        </g>
      ))}

      <text
        x={pad.left + cw / 2}
        y={H - 6}
        fill="var(--foreground-muted)"
        fontSize={labelFont}
        textAnchor="middle"
      >
        {fi ? "Etäisyys Nike-kohteeseen (km)" : "Distance to Nike site (km)"}
      </text>
      <text
        x={13}
        y={pad.top + ch / 2}
        fill="var(--foreground-muted)"
        fontSize={labelFont}
        textAnchor="middle"
        transform={`rotate(-90, 13, ${pad.top + ch / 2})`}
      >
        {fi ? "Lintutrendi (%/v)" : "Bird trend (%/yr)"}
      </text>

      {/* route-level linear fit */}
      <line
        x1={sx(xMin)}
        y1={sy(FIT.intercept + FIT.slope * xMin)}
        x2={sx(xMax)}
        y2={sy(FIT.intercept + FIT.slope * xMax)}
        stroke="var(--status-confirmed)"
        strokeWidth={1.5}
        strokeDasharray="9,5"
        opacity={0.85}
      />
      {!compact && (
        <text
          x={sx(xMax) - 2}
          y={sy(FIT.intercept + FIT.slope * xMax) - 8}
          fill="var(--status-confirmed)"
          fontSize={10}
          textAnchor="end"
          fontFamily="var(--font-mono)"
        >
          β = +0.19 pp/100 km
        </text>
      )}

      {/* 50 km / 100 km context markers */}
      {[50, 100].map((km) => (
        <line
          key={km}
          x1={sx(km)}
          y1={pad.top}
          x2={sx(km)}
          y2={sy(yMin)}
          stroke="var(--status-partial)"
          strokeWidth={1}
          strokeDasharray="3,4"
          opacity={0.3}
        />
      ))}
      {!compact &&
        [50, 100].map((km) => (
          <text
            key={`lbl${km}`}
            x={sx(km) + 3}
            y={pad.top + 10}
            fill="var(--status-partial)"
            fontSize={9}
            opacity={0.75}
          >
            {km} km
          </text>
        ))}

      {/* bins: vertical ±1 SE bar, no caps, then the marker */}
      {BINS.map((b) => {
        const cx = sx(b.mid);
        const open = b.n < 10;
        const value = `${b.mean > 0 ? "+" : ""}${b.mean.toFixed(2)} ± ${b.se.toFixed(2)}`;
        const label = fi
          ? `${b.label} km: ${value} %/v, N = ${b.n}`
          : `${b.label} km: ${value} %/yr, N = ${b.n}`;
        return (
          <g key={b.label}>
            <title>{label}</title>
            <line
              x1={cx}
              y1={sy(b.mean + b.se)}
              x2={cx}
              y2={sy(b.mean - b.se)}
              stroke="var(--foreground-muted)"
              strokeWidth={1}
              opacity={0.5}
            />
            <circle
              cx={cx}
              cy={sy(b.mean)}
              r={radiusFor(b.n)}
              fill={open ? "transparent" : "var(--accent)"}
              stroke={open ? "var(--foreground-muted)" : "var(--accent)"}
              strokeWidth={open ? 1.5 : 0}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function NikeBBSScatter({ locale = "en" }: { locale?: "fi" | "en" }) {
  const fi = locale === "fi";

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
      <h3 className="text-lg font-semibold mb-1">
        {fi ? "Nike-BBS etäisyysgradientti" : "Nike-BBS distance gradient"}
      </h3>
      <p className="text-sm text-foreground-muted mb-4">
        {fi
          ? "Lintupopulaatiotrendi (%/v) etäisyyden funktiona lähimpään Nike-tutkakohteeseen (N = 1 381 BBS-reittiä)"
          : "Bird population trend (%/yr) against distance to the nearest Nike radar site (N = 1,381 BBS routes)"}
      </p>

      <div className="sm:hidden">
        <Chart compact fi={fi} />
      </div>
      <div className="hidden sm:block">
        <Chart compact={false} fi={fi} />
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-foreground-muted">
        <span>{fi ? "● merkin koko ∝ reittien määrä" : "● marker size ∝ route count"}</span>
        <span>○ N &lt; 10</span>
        <span className="font-mono-num">β = +0.00187 %/{fi ? "v" : "yr"}/km</span>
        <span className="font-mono-num">ρ = +0.088</span>
        <span className="font-mono-num">p = 0.001</span>
        <span className="font-mono-num">N = {TOTAL_ROUTES}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
        {fi
          ? "Sovitus on koko 1 381 reitin regressio, ei yhdeksän luokkakeskiarvon uudelleensovitus. Pystyviivat ovat ±1 SE. Gradientti on korrelatiivinen: kohteiden sulkeutuminen ei ennustanut lintujen elpymistä."
          : "The fit is the regression over all 1,381 routes, not a refit of the nine bin means. Vertical bars are ±1 SE. The gradient is correlational: site closure did not predict bird recovery."}
      </p>
    </div>
  );
}
