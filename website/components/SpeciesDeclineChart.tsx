import { pickCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const SPECIES = [
  {
    id: "human",
    data: [100, 95, 89, 83, 77, 70, 62, 55, 49, 44],
    highlight: true,
  },
  {
    id: "dog",
    data: [100, 96, 91, 86, 81, 76, 72, 68],
    highlight: false,
  },
  {
    id: "horse",
    data: [100, 97, 93, 90, 86, 83, 80],
    highlight: false,
  },
  {
    id: "insect",
    data: [100, 87, 73, 60, 48, 36, 25],
    highlight: false,
  },
  {
    id: "bird",
    data: [100, 96, 93, 89, 85, 82, 78, 75, 72, 70],
    highlight: false,
  },
];

const COPY = {
  en: {
    caption: "Five species, one pattern. Reproductive decline is not a human cultural phenomenon.",
    human: "Humans (sperm)",
    dog: "Dogs",
    horse: "Horses",
    insect: "Insects",
    bird: "Birds",
  },
  fi: {
    caption: "Viisi lajia, yksi kuvio. Lisääntymislasku ei ole ihmisen kulttuurinen ilmiö.",
    human: "Ihmiset (siittiöt)",
    dog: "Koirat",
    horse: "Hevoset",
    insect: "Hyönteiset",
    bird: "Linnut",
  },
};

const W = 600;
const H = 280;
const PAD = { top: 20, right: 120, bottom: 30, left: 50 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

function buildPath(data: number[]): string {
  const xStep = plotW / (data.length - 1);
  return data
    .map((v, i) => {
      const x = PAD.left + i * xStep;
      const y = PAD.top + plotH - (v / 100) * plotH;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function SpeciesDeclineChart({ locale }: { locale: Locale }) {
  const d = pickCopy(COPY, locale);

  const labels: Record<string, string> = {
    human: d.human,
    dog: d.dog,
    horse: d.horse,
    insect: d.insect,
    bird: d.bird,
  };

  const colors: Record<string, string> = {
    human: "var(--color-accent, #ef4444)",
    dog: "var(--color-foreground-muted, #94a3b8)",
    horse: "var(--color-foreground-muted, #94a3b8)",
    insect: "var(--color-foreground-muted, #94a3b8)",
    bird: "var(--color-foreground-muted, #94a3b8)",
  };

  const labelOffsets: Record<string, number> = {
    dog: 9,
    bird: -9,
  };

  return (
    <figure className="data-figure my-12">
      <div className="chart-scroll p-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[560px] max-w-[600px] mx-auto"
          role="img"
          aria-label="Species reproductive decline chart"
        >
          {[0, 25, 50, 75, 100].map((v) => {
            const y = PAD.top + plotH - (v / 100) * plotH;
            return (
              <g key={v}>
                <line
                  x1={PAD.left}
                  y1={y}
                  x2={PAD.left + plotW}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity={0.08}
                />
                <text
                  x={PAD.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-foreground-muted"
                  fontSize={11}
                  fontFamily="var(--font-mono, monospace)"
                >
                  {v}
                </text>
              </g>
            );
          })}

          {SPECIES.map((s) => {
            const lastVal = s.data[s.data.length - 1];
            const lastY = PAD.top + plotH - (lastVal / 100) * plotH;
            const labelOffset = labelOffsets[s.id] ?? 0;
            return (
              <g key={s.id}>
                <path
                  d={buildPath(s.data)}
                  fill="none"
                  stroke={colors[s.id]}
                  strokeWidth={s.highlight ? 2.5 : 1.5}
                  strokeOpacity={s.highlight ? 1 : 0.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {labelOffset !== 0 && (
                  <line
                    x1={PAD.left + plotW}
                    y1={lastY}
                    x2={PAD.left + plotW + 8}
                    y2={lastY + labelOffset}
                    stroke={colors[s.id]}
                    strokeWidth={1}
                    strokeOpacity={0.45}
                  />
                )}
                <text
                  x={PAD.left + plotW + 12}
                  y={lastY + labelOffset + 4}
                  fontSize={11}
                  fill={colors[s.id]}
                  fontWeight={s.highlight ? 600 : 400}
                  opacity={s.highlight ? 1 : 0.7}
                >
                  {labels[s.id]}
                </text>
              </g>
            );
          })}

          <text
            x={PAD.left}
            y={H - 4}
            fontSize={10}
            className="fill-foreground-muted"
            opacity={0.5}
          >
            Normalized to 100 at baseline
          </text>
        </svg>
      </div>
      <figcaption className="data-figure__note text-center mt-2 italic">
        {d.caption}
      </figcaption>
    </figure>
  );
}
