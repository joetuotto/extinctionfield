import { pickCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const COMMUNITIES = [
  { id: "amish", tfr: 6.5, tech: 0.05 },
  { id: "haredi", tfr: 6.4, tech: 0.10 },
  { id: "old_mennonite", tfr: 5.5, tech: 0.18 },
  { id: "modern_mennonite", tfr: 2.8, tech: 0.40 },
  { id: "mormon", tfr: 2.5, tech: 0.55 },
  { id: "usa", tfr: 1.62, tech: 0.80 },
  { id: "finland", tfr: 1.26, tech: 0.90 },
  { id: "korea", tfr: 0.72, tech: 1.00 },
];

const COPY = {
  en: {
    caption:
      "Same country, same healthcare, same economy. Different technology — different fertility.",
    amish: "Amish",
    haredi: "Haredi",
    old_mennonite: "Old Mennonite",
    modern_mennonite: "Mod. Mennonite",
    mormon: "Mormon",
    usa: "USA",
    finland: "Finland",
    korea: "S. Korea",
    xLabel: "Technology adoption →",
    yLabel: "TFR",
  },
  fi: {
    caption:
      "Sama maa, sama terveydenhuolto, sama talous. Eri teknologia — eri hedelmällisyys.",
    amish: "Amissit",
    haredi: "Haredi",
    old_mennonite: "Vanhat mennoniitit",
    modern_mennonite: "Mod. mennoniitit",
    mormon: "Mormonit",
    usa: "USA",
    finland: "Suomi",
    korea: "Etelä-Korea",
    xLabel: "Teknologian omaksuminen →",
    yLabel: "TFR",
  },
};

const W = 600;
const H = 360;
const PAD = { top: 20, right: 30, bottom: 50, left: 50 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

const maxTFR = 7;

function xScale(tech: number): number {
  return PAD.left + tech * plotW;
}
function yScale(tfr: number): number {
  return PAD.top + plotH - (tfr / maxTFR) * plotH;
}

export function TechnologyGradientChart({ locale }: { locale: Locale }) {
  const d = pickCopy(COPY, locale);

  const labels: Record<string, string> = {
    amish: d.amish,
    haredi: d.haredi,
    old_mennonite: d.old_mennonite,
    modern_mennonite: d.modern_mennonite,
    mormon: d.mormon,
    usa: d.usa,
    finland: d.finland,
    korea: d.korea,
  };

  const sorted = [...COMMUNITIES].sort((a, b) => a.tech - b.tech);
  const curvePath = sorted
    .map((c, i) => `${i === 0 ? "M" : "L"}${xScale(c.tech).toFixed(1)},${yScale(c.tfr).toFixed(1)}`)
    .join(" ");

  return (
    <figure className="data-figure my-12">
      <div className="overflow-x-auto p-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-[600px] mx-auto"
          role="img"
          aria-label="Technology adoption vs fertility rate"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((v) => (
            <g key={v}>
              <line
                x1={PAD.left}
                y1={yScale(v)}
                x2={PAD.left + plotW}
                y2={yScale(v)}
                stroke="currentColor"
                strokeOpacity={0.06}
              />
              <text
                x={PAD.left - 8}
                y={yScale(v) + 4}
                textAnchor="end"
                className="fill-foreground-muted"
                fontSize={11}
                fontFamily="var(--font-mono, monospace)"
              >
                {v}
              </text>
            </g>
          ))}

          <path
            d={curvePath}
            fill="none"
            stroke="var(--color-accent, #3b82f6)"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            strokeOpacity={0.4}
          />

          {COMMUNITIES.map((c) => {
            const cx = xScale(c.tech);
            const cy = yScale(c.tfr);
            const above = c.tfr > 3;
            return (
              <g key={c.id}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill="var(--color-accent, #3b82f6)"
                  fillOpacity={0.85}
                />
                <text
                  x={cx}
                  y={above ? cy - 10 : cy + 16}
                  textAnchor="middle"
                  fontSize={10}
                  className="fill-foreground"
                  fontWeight={500}
                >
                  {labels[c.id]}
                </text>
                <text
                  x={cx}
                  y={above ? cy - 22 : cy + 27}
                  textAnchor="middle"
                  fontSize={9}
                  className="fill-foreground-muted"
                  fontFamily="var(--font-mono, monospace)"
                >
                  {c.tfr.toFixed(1)}
                </text>
              </g>
            );
          })}

          <text
            x={PAD.left + plotW / 2}
            y={H - 8}
            textAnchor="middle"
            fontSize={11}
            className="fill-foreground-muted"
          >
            {d.xLabel}
          </text>
          <text
            x={12}
            y={PAD.top + plotH / 2}
            textAnchor="middle"
            fontSize={11}
            className="fill-foreground-muted"
            transform={`rotate(-90, 12, ${PAD.top + plotH / 2})`}
          >
            {d.yLabel}
          </text>

          <line
            x1={PAD.left}
            y1={yScale(2.1)}
            x2={PAD.left + plotW}
            y2={yScale(2.1)}
            stroke="var(--color-status-refuted, #ef4444)"
            strokeWidth={1}
            strokeDasharray="6 3"
            strokeOpacity={0.5}
          />
          <text
            x={PAD.left + plotW + 2}
            y={yScale(2.1) - 4}
            fontSize={9}
            fill="var(--color-status-refuted, #ef4444)"
            opacity={0.7}
          >
            2.1
          </text>
        </svg>
      </div>
      <figcaption className="data-figure__note text-center mt-2 italic">
        {d.caption}
      </figcaption>
    </figure>
  );
}
