"use client";

export function PulseProfile({ locale = "en" }: { locale?: "fi" | "en" }) {
  const fi = locale === "fi";
  const W = 560, H = 280;
  const pad = { top: 24, right: 24, bottom: 48, left: 64 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;

  const peakField = 24.5;
  const rmsField = 0.037;
  const pulseDuration = 1;
  const period = 2500;

  const yMax = 28;
  const xMax = period;

  const sx = (v: number) => pad.left + (v / xMax) * cw;
  const sy = (v: number) => pad.top + ((yMax - v) / yMax) * ch;

  const pulseStart = 1200;
  const pulseEnd = pulseStart + pulseDuration;

  const xTicks = [0, 500, 1000, 1500, 2000, 2500];
  const yTicks = [0, 5, 10, 15, 20, 25];

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
      <h3 className="text-lg font-semibold mb-1">
        {fi ? "Pulssiprofiili: huippukenttä vs RMS" : "Pulse profile: peak field vs RMS"}
      </h3>
      <p className="text-sm text-foreground-muted mb-4">
        {fi
          ? "Nike LOPAR sivukeila 1 km:ssä: yksittäinen 1 µs pulssi, 400 Hz toistotaajuus, 0,04 % duty cycle"
          : "Nike LOPAR sidelobe at 1 km: single 1 µs pulse, 400 Hz repetition rate, 0.04% duty cycle"}
      </p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[420px]"
          role="img"
          aria-label={fi ? "Pulssiprofiilikaavio" : "Pulse profile chart"}
        >
          {/* Y-axis grid */}
          {yTicks.map(t => (
            <g key={`y${t}`}>
              <line
                x1={pad.left} y1={sy(t)} x2={W - pad.right} y2={sy(t)}
                stroke="var(--card-border)" strokeWidth={1}
                strokeDasharray="4,4" opacity={0.3}
              />
              <text
                x={pad.left - 8} y={sy(t)}
                fill="var(--foreground-muted)" fontSize={10}
                textAnchor="end" dominantBaseline="middle"
                fontFamily="var(--font-mono)"
              >
                {t}
              </text>
            </g>
          ))}

          {/* X-axis ticks */}
          {xTicks.map(t => (
            <g key={`x${t}`}>
              <line
                x1={sx(t)} y1={sy(0)} x2={sx(t)} y2={sy(0) + 5}
                stroke="var(--foreground-muted)" strokeWidth={1}
              />
              <text
                x={sx(t)} y={sy(0) + 18}
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
            {fi ? "Aika (µs)" : "Time (µs)"}
          </text>
          <text
            x={14} y={pad.top + ch / 2}
            fill="var(--foreground-muted)" fontSize={11}
            textAnchor="middle"
            transform={`rotate(-90, 14, ${pad.top + ch / 2})`}
          >
            {fi ? "Kenttävoimakkuus (V/m)" : "Field strength (V/m)"}
          </text>

          {/* RMS line */}
          <line
            x1={pad.left} y1={sy(rmsField)}
            x2={W - pad.right} y2={sy(rmsField)}
            stroke="var(--status-confirmed)" strokeWidth={1.5}
            strokeDasharray="6,3" opacity={0.7}
          />
          <text
            x={W - pad.right - 4} y={sy(rmsField) - 6}
            fill="var(--status-confirmed)" fontSize={9}
            textAnchor="end" opacity={0.9}
            fontFamily="var(--font-mono)"
          >
            RMS = 0.037 V/m
          </text>

          {/* Baseline (zero line at bottom of chart) */}
          <line
            x1={pad.left} y1={sy(0)} x2={W - pad.right} y2={sy(0)}
            stroke="var(--foreground-muted)" strokeWidth={1} opacity={0.4}
          />

          {/* Pulse */}
          <path
            d={`M ${sx(0)} ${sy(0)} L ${sx(pulseStart)} ${sy(0)} L ${sx(pulseStart)} ${sy(peakField)} L ${sx(pulseEnd)} ${sy(peakField)} L ${sx(pulseEnd)} ${sy(0)} L ${sx(xMax)} ${sy(0)}`}
            fill="none"
            stroke="var(--accent)" strokeWidth={2}
          />
          <rect
            x={sx(pulseStart)} y={sy(peakField)}
            width={Math.max(sx(pulseEnd) - sx(pulseStart), 3)}
            height={sy(0) - sy(peakField)}
            fill="var(--accent)" opacity={0.12}
          />

          {/* Peak field label */}
          <text
            x={sx(pulseStart) + 8} y={sy(peakField) - 6}
            fill="var(--accent)" fontSize={11} fontWeight="600"
            fontFamily="var(--font-mono)"
          >
            24.5 V/m
          </text>

          {/* 671:1 ratio annotation */}
          <text
            x={sx(pulseStart) + 8} y={sy(peakField) + 16}
            fill="var(--accent)" fontSize={10}
            opacity={0.8}
          >
            671:1
          </text>

          {/* CRY lifetime annotation */}
          <line
            x1={sx(pulseStart) - 30} y1={sy(peakField / 2)}
            x2={sx(pulseStart) - 4} y2={sy(peakField / 2)}
            stroke="var(--status-partial)" strokeWidth={1}
            markerEnd="url(#arrowhead)"
          />
          <text
            x={sx(pulseStart) - 34} y={sy(peakField / 2) - 4}
            fill="var(--status-partial)" fontSize={9}
            textAnchor="end"
          >
            {fi ? "CRY-elinaika ~1 µs" : "CRY lifetime ~1 µs"}
          </text>

          {/* Arrow marker */}
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill="var(--status-partial)" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-foreground-muted">
        <span>
          <span className="inline-block w-3 h-0.5 bg-accent mr-1 align-middle" />
          {fi ? "Huippukenttä" : "Peak field"}
        </span>
        <span>
          <span className="inline-block w-3 h-0.5 border-t-2 border-dashed border-status-confirmed mr-1 align-middle" />
          RMS
        </span>
        <span className="font-mono-num">
          {fi ? "1 µs pulssi · 400 Hz · duty cycle 0,04 %" : "1 µs pulse · 400 Hz · duty cycle 0.04%"}
        </span>
      </div>
    </div>
  );
}
