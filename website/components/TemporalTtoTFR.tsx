"use client";

const USA_DATA = [
  { year: 2007, tfr: 2.12, tYear: 1999, tLevel: 519 },
  { year: 2008, tfr: 2.07, tYear: 2000, tLevel: 513 },
  { year: 2009, tfr: 2.01, tYear: 2001, tLevel: 507 },
  { year: 2010, tfr: 1.93, tYear: 2002, tLevel: 501 },
  { year: 2011, tfr: 1.89, tYear: 2003, tLevel: 495 },
  { year: 2012, tfr: 1.88, tYear: 2004, tLevel: 489 },
  { year: 2013, tfr: 1.86, tYear: 2005, tLevel: 483 },
  { year: 2014, tfr: 1.86, tYear: 2006, tLevel: 478 },
  { year: 2015, tfr: 1.84, tYear: 2007, tLevel: 472 },
  { year: 2016, tfr: 1.82, tYear: 2008, tLevel: 466 },
  { year: 2017, tfr: 1.77, tYear: 2009, tLevel: 461 },
  { year: 2018, tfr: 1.73, tYear: 2010, tLevel: 455 },
  { year: 2019, tfr: 1.71, tYear: 2011, tLevel: 450 },
  { year: 2020, tfr: 1.64, tYear: 2012, tLevel: 444 },
  { year: 2021, tfr: 1.66, tYear: 2013, tLevel: 439 },
  { year: 2022, tfr: 1.67, tYear: 2014, tLevel: 434 },
  { year: 2023, tfr: 1.62, tYear: 2015, tLevel: 429 },
  { year: 2024, tfr: 1.62, tYear: 2016, tLevel: 423 },
];

export function TemporalTtoTFR({ locale }: { locale?: string }) {
  const W = 640;
  const H = 360;
  const PAD = { top: 30, right: 60, bottom: 50, left: 55 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const yearMin = 2007;
  const yearMax = 2024;
  const tfrMin = 1.5;
  const tfrMax = 2.2;
  const tMin = 400;
  const tMax = 540;

  const xScale = (y: number) => PAD.left + ((y - yearMin) / (yearMax - yearMin)) * plotW;
  const yLeftScale = (v: number) => PAD.top + plotH - ((v - tfrMin) / (tfrMax - tfrMin)) * plotH;
  const yRightScale = (v: number) => PAD.top + plotH - ((v - tMin) / (tMax - tMin)) * plotH;

  const tfrPath = USA_DATA.map(
    (d, i) => `${i === 0 ? "M" : "L"} ${xScale(d.year)} ${yLeftScale(d.tfr)}`
  ).join(" ");

  const tPath = USA_DATA.map(
    (d, i) => `${i === 0 ? "M" : "L"} ${xScale(d.year)} ${yRightScale(d.tLevel)}`
  ).join(" ");

  const isFi = locale === "fi";

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[640px] mx-auto"
        role="img"
        aria-label="USA TFR and lagged testosterone temporal comparison"
      >
        {/* Grid */}
        {[2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024].map((y) => (
          <line
            key={y}
            x1={xScale(y)}
            y1={PAD.top}
            x2={xScale(y)}
            y2={PAD.top + plotH}
            stroke="currentColor"
            strokeOpacity={0.06}
          />
        ))}
        {[1.6, 1.7, 1.8, 1.9, 2.0, 2.1].map((v) => (
          <line
            key={v}
            x1={PAD.left}
            y1={yLeftScale(v)}
            x2={W - PAD.right}
            y2={yLeftScale(v)}
            stroke="currentColor"
            strokeOpacity={0.06}
          />
        ))}

        {/* TFR line (blue) */}
        <path d={tfrPath} fill="none" stroke="#3b82f6" strokeWidth={2.5} />
        {USA_DATA.map((d) => (
          <circle
            key={`tfr-${d.year}`}
            cx={xScale(d.year)}
            cy={yLeftScale(d.tfr)}
            r={3}
            fill="#3b82f6"
          />
        ))}

        {/* T line (red/orange, dashed) */}
        <path d={tPath} fill="none" stroke="#ef4444" strokeWidth={2} strokeDasharray="6 3" />
        {USA_DATA.map((d) => (
          <circle
            key={`t-${d.year}`}
            cx={xScale(d.year)}
            cy={yRightScale(d.tLevel)}
            r={3}
            fill="#ef4444"
          />
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

        {/* X labels */}
        {[2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024].map((y) => (
          <text
            key={y}
            x={xScale(y)}
            y={PAD.top + plotH + 18}
            textAnchor="middle"
            className="text-[11px] fill-foreground-muted"
          >
            {y}
          </text>
        ))}
        <text
          x={PAD.left + plotW / 2}
          y={H - 5}
          textAnchor="middle"
          className="text-[12px] fill-foreground-muted"
        >
          {isFi ? "Vuosi" : "Year"}
        </text>

        {/* Left Y axis (TFR) */}
        <line
          x1={PAD.left}
          y1={PAD.top}
          x2={PAD.left}
          y2={PAD.top + plotH}
          stroke="#3b82f6"
          strokeOpacity={0.4}
        />
        {[1.6, 1.7, 1.8, 1.9, 2.0, 2.1].map((v) => (
          <text
            key={v}
            x={PAD.left - 8}
            y={yLeftScale(v) + 4}
            textAnchor="end"
            className="text-[11px]"
            fill="#3b82f6"
          >
            {v.toFixed(1)}
          </text>
        ))}
        <text
          x={12}
          y={PAD.top + plotH / 2}
          textAnchor="middle"
          fill="#3b82f6"
          className="text-[12px]"
          transform={`rotate(-90, 12, ${PAD.top + plotH / 2})`}
        >
          TFR
        </text>

        {/* Right Y axis (T ng/dL) */}
        <line
          x1={W - PAD.right}
          y1={PAD.top}
          x2={W - PAD.right}
          y2={PAD.top + plotH}
          stroke="#ef4444"
          strokeOpacity={0.4}
        />
        {[420, 440, 460, 480, 500, 520].map((v) => (
          <text
            key={v}
            x={W - PAD.right + 8}
            y={yRightScale(v) + 4}
            textAnchor="start"
            className="text-[11px]"
            fill="#ef4444"
          >
            {v}
          </text>
        ))}
        <text
          x={W - 10}
          y={PAD.top + plotH / 2}
          textAnchor="middle"
          fill="#ef4444"
          className="text-[12px]"
          transform={`rotate(90, ${W - 10}, ${PAD.top + plotH / 2})`}
        >
          T (ng/dL, {isFi ? "viive 8v" : "lag 8yr"})
        </text>

        {/* Legend */}
        <line x1={PAD.left + 10} y1={PAD.top + 8} x2={PAD.left + 30} y2={PAD.top + 8} stroke="#3b82f6" strokeWidth={2.5} />
        <text x={PAD.left + 35} y={PAD.top + 12} className="text-[11px] fill-foreground-muted">
          TFR ({isFi ? "havaittu" : "observed"})
        </text>
        <line x1={PAD.left + 10} y1={PAD.top + 24} x2={PAD.left + 30} y2={PAD.top + 24} stroke="#ef4444" strokeWidth={2} strokeDasharray="6 3" />
        <text x={PAD.left + 35} y={PAD.top + 28} className="text-[11px] fill-foreground-muted">
          T (ng/dL, {isFi ? "viive −8v" : "lagged −8yr"})
        </text>
      </svg>
    </div>
  );
}
