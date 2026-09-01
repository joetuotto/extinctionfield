import { pickCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const COPY = {
  en: {
    nodes: ["EMF", "Ca²⁺ channels", "Hormones", "Sperm", "Fertility", "Civilization"],
    subs: ["", "VGCC / CRY", "T↓  mel↓  OXT↓", "−51.6%", "TFR↓", ""],
    caption: "From physics to population: a single mechanistic chain, tested at every level.",
  },
  fi: {
    nodes: ["EMF", "Ca²⁺-kanavat", "Hormonit", "Siittiöt", "Hedelmällisyys", "Sivilisaatio"],
    subs: ["", "VGCC / CRY", "T↓  mel↓  OXT↓", "−51,6 %", "TFR↓", ""],
    caption: "Fysiikasta populaatioon: yksi mekanistinen ketju, testattu jokaisella tasolla.",
  },
};

const NODE_W = 130;
const NODE_H = 52;
const GAP = 24;
const ARROW = 16;
const N = 6;
const W = N * NODE_W + (N - 1) * GAP;
const H = 100;

export function SimpleCausalChain({ locale }: { locale: Locale }) {
  const d = pickCopy(COPY, locale);

  return (
    <figure className="data-figure my-12">
      <div className="chart-scroll p-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[900px] mx-auto"
          style={{ maxWidth: `${W}px` }}
          role="img"
          aria-label="Simplified causal chain"
        >
          <defs>
            <marker
              id="arrow-head"
              markerWidth={ARROW}
              markerHeight={ARROW}
              refX={ARROW - 2}
              refY={ARROW / 2}
              orient="auto"
            >
              <path
                d={`M0,2 L${ARROW - 2},${ARROW / 2} L0,${ARROW - 2}`}
                fill="none"
                stroke="var(--color-accent, #3b82f6)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          {d.nodes.map((label, i) => {
            const x = i * (NODE_W + GAP);
            const cy = H / 2;
            const sub = d.subs[i];

            return (
              <g key={i}>
                <rect
                  x={x}
                  y={cy - NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  fill="var(--color-card-bg, #1e293b)"
                  stroke="var(--color-card-border, #334155)"
                  strokeWidth={1}
                />
                <text
                  x={x + NODE_W / 2}
                  y={sub ? cy - 4 : cy + 4}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={600}
                  className="fill-foreground"
                >
                  {label}
                </text>
                {sub && (
                  <text
                    x={x + NODE_W / 2}
                    y={cy + 12}
                    textAnchor="middle"
                    fontSize={9}
                    className="fill-foreground-muted"
                    fontFamily="var(--font-mono, monospace)"
                  >
                    {sub}
                  </text>
                )}

                {i < N - 1 && (
                  <line
                    x1={x + NODE_W + 2}
                    y1={cy}
                    x2={x + NODE_W + GAP - 2}
                    y2={cy}
                    stroke="var(--color-accent, #3b82f6)"
                    strokeWidth={1.5}
                    markerEnd="url(#arrow-head)"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="data-figure__note text-center mt-2 italic">
        {d.caption}
      </figcaption>
    </figure>
  );
}
