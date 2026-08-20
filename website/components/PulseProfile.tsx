const PEAK = 24.5;      // V/m, sidelobe peak at 1 km during the pulse
const RMS = 0.037;      // V/m, time-averaged over one rotation
const RATIO = 671;      // PEAK / RMS
const PERIOD_US = 2500; // one 400 Hz interval
const PULSE_AT_US = 1150;

/**
 * Peak and RMS differ by 671:1, so a single linear axis renders the RMS line
 * on top of zero and hides the whole point of the figure. The axis is broken
 * instead: a low band carries 0–0.05 V/m, a high band carries 20–26 V/m.
 */
const LOW = { min: 0, max: 0.05 };
const HIGH = { min: 20, max: 26 };

/**
 * One rendering of the chart. Both variants are emitted and toggled by CSS
 * breakpoints rather than a resize listener, so the correct layout is present
 * in the first paint and needs no client JavaScript.
 */
function Chart({ compact, fi }: { compact: boolean; fi: boolean }) {
  const W = compact ? 360 : 560;
  const H = 300;
  const pad = compact
    ? { top: 18, right: 12, bottom: 46, left: 46 }
    : { top: 22, right: 24, bottom: 50, left: 62 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;

  // Band geometry: high band on top, a visual break, then the low band.
  const gap = 16;
  const highH = (ch - gap) * 0.6;
  const lowH = (ch - gap) * 0.4;
  const highTop = pad.top;
  const highBottom = highTop + highH;
  const lowTop = highBottom + gap;
  const lowBottom = lowTop + lowH;

  const sx = (us: number) => pad.left + (us / PERIOD_US) * cw;
  const syHigh = (v: number) =>
    highTop + ((HIGH.max - v) / (HIGH.max - HIGH.min)) * highH;
  const syLow = (v: number) =>
    lowTop + ((LOW.max - v) / (LOW.max - LOW.min)) * lowH;

  const xTicks = compact ? [0, 1250, 2500] : [0, 500, 1000, 1500, 2000, 2500];
  const highTicks = compact ? [20, 24] : [20, 22, 24, 26];
  const lowTicks = compact ? [0, 0.04] : [0, 0.02, 0.04];
  const axisFont = compact ? 11 : 10;
  const labelFont = compact ? 12 : 11;

  const pulseX = sx(PULSE_AT_US);
  // 1 µs of a 2500 µs period is far below one pixel: drawn at a legible
  // minimum width and labelled as not to scale.
  const pulseW = 2.5;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={
        fi
          ? "Pulssiprofiili katkaistulla y-akselilla: huippu 24,5 V/m, RMS 0,037 V/m"
          : "Pulse profile on a broken y axis: peak 24.5 V/m, RMS 0.037 V/m"
      }
    >
      {/* y tick labels, both bands */}
      {highTicks.map((t) => (
        <text
          key={`h${t}`}
          x={pad.left - 7}
          y={syHigh(t)}
          fill="var(--foreground-muted)"
          fontSize={axisFont}
          textAnchor="end"
          dominantBaseline="middle"
          fontFamily="var(--font-mono)"
        >
          {t}
        </text>
      ))}
      {lowTicks.map((t) => (
        <text
          key={`l${t}`}
          x={pad.left - 7}
          y={syLow(t)}
          fill="var(--foreground-muted)"
          fontSize={axisFont}
          textAnchor="end"
          dominantBaseline="middle"
          fontFamily="var(--font-mono)"
        >
          {t === 0 ? "0" : t.toFixed(2)}
        </text>
      ))}

      {/* axis line with the break drawn as a zigzag */}
      <line
        x1={pad.left}
        y1={highTop}
        x2={pad.left}
        y2={highBottom}
        stroke="var(--card-border)"
        strokeWidth={1}
      />
      <line
        x1={pad.left}
        y1={lowTop}
        x2={pad.left}
        y2={lowBottom}
        stroke="var(--card-border)"
        strokeWidth={1}
      />
      <path
        d={`M ${pad.left - 5} ${highBottom + 3} L ${pad.left + 5} ${highBottom + 7} L ${pad.left - 5} ${lowTop - 7} L ${pad.left + 5} ${lowTop - 3}`}
        fill="none"
        stroke="var(--foreground-muted)"
        strokeWidth={1}
        opacity={0.7}
      />

      {/* baseline */}
      <line
        x1={pad.left}
        y1={lowBottom}
        x2={W - pad.right}
        y2={lowBottom}
        stroke="var(--card-border)"
        strokeWidth={1}
      />
      {xTicks.map((t) => (
        <g key={`x${t}`}>
          <line
            x1={sx(t)}
            y1={lowBottom}
            x2={sx(t)}
            y2={lowBottom + 4}
            stroke="var(--foreground-muted)"
            strokeWidth={1}
            opacity={0.6}
          />
          <text
            x={sx(t)}
            y={lowBottom + 16}
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
        {fi ? "Aika (µs), yksi 400 Hz jakso" : "Time (µs), one 400 Hz interval"}
      </text>
      <text
        x={13}
        y={pad.top + ch / 2}
        fill="var(--foreground-muted)"
        fontSize={labelFont}
        textAnchor="middle"
        transform={`rotate(-90, 13, ${pad.top + ch / 2})`}
      >
        {fi ? "Kenttä (V/m)" : "Field (V/m)"}
      </text>

      {/* time-averaged RMS, visible because the low band is magnified */}
      <line
        x1={pad.left}
        y1={syLow(RMS)}
        x2={W - pad.right}
        y2={syLow(RMS)}
        stroke="var(--accent)"
        strokeWidth={1.5}
        strokeDasharray="9,5"
      />
      <text
        x={W - pad.right}
        y={syLow(RMS) - 6}
        fill="var(--accent)"
        fontSize={10}
        textAnchor="end"
        fontFamily="var(--font-mono)"
      >
        RMS 0.037
      </text>

      {/* the pulse: rises out of the low band, through the break, to the peak */}
      <line
        x1={pad.left}
        y1={syLow(0)}
        x2={pulseX}
        y2={syLow(0)}
        stroke="var(--status-partial)"
        strokeWidth={2}
      />
      <line
        x1={pulseX + pulseW}
        y1={syLow(0)}
        x2={W - pad.right}
        y2={syLow(0)}
        stroke="var(--status-partial)"
        strokeWidth={2}
      />
      <rect
        x={pulseX}
        y={syHigh(PEAK)}
        width={pulseW}
        height={lowBottom - syHigh(PEAK)}
        fill="var(--status-partial)"
        rx={1}
      />
      <text
        x={pulseX + 8}
        y={syHigh(PEAK) + 4}
        fill="var(--status-partial)"
        fontSize={12}
        fontWeight={600}
        fontFamily="var(--font-mono)"
      >
        {compact ? "24.5" : "24.5 V/m"}
      </text>
      <text
        x={pulseX + 8}
        y={syHigh(PEAK) + 19}
        fill="var(--foreground-muted)"
        fontSize={10}
      >
        {fi ? "1 µs (ei mittakaavassa)" : "1 µs (not to scale)"}
      </text>

      {/* CRY radical-pair lifetime: bracketed onto the pulse itself */}
      <path
        d={`M ${pulseX - 9} ${lowBottom - 20} L ${pulseX - 9} ${lowBottom - 14} L ${pulseX + 11} ${lowBottom - 14} L ${pulseX + 11} ${lowBottom - 20}`}
        fill="none"
        stroke="var(--status-confirmed)"
        strokeWidth={1}
      />
      <text
        x={pulseX + 1}
        y={lowBottom - 4}
        fill="var(--status-confirmed)"
        fontSize={10}
        textAnchor="middle"
        // Knocks the pulse line out from behind the label.
        stroke="var(--card-bg)"
        strokeWidth={3}
        paintOrder="stroke"
      >
        CRY ≈ 1 µs
      </text>
    </svg>
  );
}

export function PulseProfile({ locale = "en" }: { locale?: "fi" | "en" }) {
  const fi = locale === "fi";

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
      <h3 className="text-lg font-semibold mb-1">
        {fi ? "Pulssiprofiili: huippukenttä vs RMS" : "Pulse profile: peak field vs RMS"}
      </h3>
      <p className="text-sm text-foreground-muted mb-4">
        {fi
          ? "Nike LOPAR -sivukeila 1 km:ssä: yksi 1 µs pulssi 2 500 µs jaksossa (400 Hz), 2° keila"
          : "Nike LOPAR sidelobe at 1 km: one 1 µs pulse per 2,500 µs interval (400 Hz), 2° beam"}
      </p>

      <div className="sm:hidden">
        <Chart compact fi={fi} />
      </div>
      <div className="hidden sm:block">
        <Chart compact={false} fi={fi} />
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-foreground-muted">
        <span>
          <span className="mr-1.5 inline-block h-2.5 w-1 align-middle bg-status-partial" />
          {fi ? "Huippukenttä" : "Peak field"}
        </span>
        <span>
          <span className="mr-1.5 inline-block h-0 w-3 align-middle border-t-2 border-dashed border-accent" />
          {fi ? "Aikakeskiarvo (RMS)" : "Time average (RMS)"}
        </span>
        <span className="font-mono-num">{RATIO}:1</span>
        <span className="font-mono-num">duty cycle 2.2·10⁻⁶</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
        {fi
          ? "Y-akseli on katkaistu: alakaista 0–0,05 V/m, yläkaista 20–26 V/m. Samalla lineaarisella akselilla RMS-viiva peittyisi nollaviivaan. Duty cycle sisältää 2° keilan pyyhkäisyn (400 Hz × 1 µs × 2°/360°); ilman pyyhkäisyä suhde olisi 50:1."
          : "The y axis is broken: the low band spans 0–0.05 V/m, the high band 20–26 V/m. On one linear axis the RMS line would sit on top of zero. The duty cycle includes the 2° beam sweep (400 Hz × 1 µs × 2°/360°); without the sweep the ratio would be 50:1."}
      </p>
    </div>
  );
}
