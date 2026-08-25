"use client";

interface SentinelSpecies {
  name: string;
  nameEn: string;
  lag: number;
  lagRange: [number, number];
  r: number;
  p: number;
  pLabel?: string;
  nCountries: number;
  direction: number;
  directionTotal: number;
  color: string;
  icon: string;
  source: string;
}

function speciesLabel(sp: SentinelSpecies, fi: boolean): string {
  const rSign = sp.r < 0 ? "−" : "+";
  const rStr = `r = ${rSign}${Math.abs(sp.r).toFixed(3)}`;
  const area = sp.nCountries > 1
    ? `${sp.direction}/${sp.directionTotal} ${fi ? "maata" : "countries"}`
    : "UK";
  const pStr = sp.pLabel ?? `p = ${sp.p.toFixed(3)}`;
  const lagStr = `+${sp.lag}${fi ? "v" : "y"}`;
  return `${fi ? sp.name : sp.nameEn}: ${rStr}, ${area}, ${pStr}, ${lagStr}`;
}

const SENTINEL_DATA: SentinelSpecies[] = [
  {
    name: "Kirva", nameEn: "Aphid",
    lag: 2, lagRange: [1, 3],
    r: 0.660, p: 0.021,
    nCountries: 1,
    direction: 29, directionTotal: 45,
    color: "#22c55e",
    icon: "aphid",
    source: "Rothamsted 1969–2016, first diff",
  },
  {
    name: "Mehiläinen", nameEn: "Honeybee",
    lag: 2, lagRange: [1, 3],
    r: -0.272, p: 0.006,
    nCountries: 23,
    direction: 20, directionTotal: 23,
    color: "#eab308",
    icon: "bee",
    source: "COLOSS 23 countries, circular-shift",
  },
  {
    name: "Pesimälintu", nameEn: "Breeding bird",
    lag: 2.5, lagRange: [1, 4],
    r: 0.182, p: 0.006, pLabel: "q = 0.00013",
    nCountries: 27,
    direction: 21, directionTotal: 27,
    color: "#3b82f6",
    icon: "bird",
    source: "PECBMS 27 countries, detrended",
  },
  {
    name: "Koira → sperma", nameEn: "Dog → human sperm",
    lag: 3, lagRange: [2, 4],
    r: 0.505, p: 0.012,
    nCountries: 1,
    direction: 1, directionTotal: 1,
    color: "#f97316",
    icon: "dog",
    source: "Lea 2016, detrended",
  },
  {
    name: "Yöperhonen", nameEn: "Moth",
    lag: 3.5, lagRange: [3, 4],
    r: 0.298, p: 0.021,
    nCountries: 1,
    direction: 1, directionTotal: 1,
    color: "#a855f7",
    icon: "moth",
    source: "Rothamsted moths, circular-shift",
  },
  {
    name: "Rupikonna", nameEn: "Common toad",
    lag: 6, lagRange: [5, 7],
    r: 0.355, p: 0.035,
    nCountries: 1,
    direction: 1, directionTotal: 1,
    color: "#ef4444",
    icon: "toad",
    source: "Petrovan & Schmidt 2016",
  },
  {
    name: "Lepakot", nameEn: "Bats",
    lag: 14, lagRange: [12, 16],
    r: -0.310, p: 0.028,
    nCountries: 1,
    direction: 1, directionTotal: 1,
    color: "#6366f1",
    icon: "bat",
    source: "Lindecke 2026 (Science); 4.5× sensitivity; RPM compass disrupted by broadband RF 0.01–300 MHz",
  },
];

export function SentinelCascade({ locale = "en" }: { locale?: "fi" | "en" }) {
  const fi = locale === "fi";
  const maxLag = 16;
  const barHeight = 52;
  const labelWidth = 155;
  const chartWidth = 440;
  const rightMargin = 100;
  const totalW = labelWidth + chartWidth + rightMargin;
  const totalH = SENTINEL_DATA.length * barHeight + 50;

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
      <h3 className="text-lg font-semibold mb-1">
        {fi ? "Sentinellikaskadi" : "Sentinel Cascade"}
      </h3>
      <p className="text-sm text-foreground-muted mb-5">
        {fi
          ? "Kuinka monta vuotta ennen ihmisen hedelmällisyyden laskua eri lajien populaatiot heikkenevät"
          : "How many years before human fertility decline do different species populations deteriorate"}
      </p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${totalW} ${totalH}`}
          className="w-full min-w-[520px]"
          role="img"
          aria-label={fi ? "Sentinellikaskadi-kaavio" : "Sentinel cascade chart"}
        >
          {[0, 2, 4, 6, 8, 10, 12, 14].map((tick) => {
            const x = labelWidth + chartWidth - (tick / maxLag) * chartWidth;
            return (
              <g key={tick}>
                <line
                  x1={x} y1={0} x2={x} y2={SENTINEL_DATA.length * barHeight}
                  stroke="var(--card-border)" strokeWidth={1} strokeDasharray="4,4"
                />
                <text
                  x={x} y={SENTINEL_DATA.length * barHeight + 18}
                  fill="var(--foreground-muted)" fontSize={11} textAnchor="middle"
                  fontFamily="var(--font-mono)"
                >
                  {tick === 0 ? (fi ? "Nyt" : "Now") : `−${tick}${fi ? "v" : "y"}`}
                </text>
              </g>
            );
          })}

          <rect
            x={labelWidth + chartWidth} y={0}
            width={3} height={SENTINEL_DATA.length * barHeight}
            fill="#ef4444" rx={1.5}
          />
          <text
            x={labelWidth + chartWidth + 10}
            y={SENTINEL_DATA.length * barHeight / 2 - 8}
            fill="#ef4444" fontSize={12} fontWeight="bold"
          >
            {fi ? "Ihmisen" : "Human"}
          </text>
          <text
            x={labelWidth + chartWidth + 10}
            y={SENTINEL_DATA.length * barHeight / 2 + 8}
            fill="#ef4444" fontSize={12} fontWeight="bold"
          >
            TFR ↓
          </text>

          {SENTINEL_DATA.map((sp, i) => {
            const y = i * barHeight + barHeight / 2;
            const nowX = labelWidth + chartWidth;
            const barStart = nowX - (sp.lag / maxLag) * chartWidth;
            const barW = Math.max(3, Math.abs(sp.r) * 14);
            const rangeX = nowX - (sp.lagRange[1] / maxLag) * chartWidth;
            const rangeW = ((sp.lagRange[1] - sp.lagRange[0]) / maxLag) * chartWidth;
            const circleR = sp.nCountries > 1 ? Math.sqrt(sp.nCountries) * 2.8 : 5;

            const label = speciesLabel(sp, fi);
            return (
              <g key={sp.nameEn} tabIndex={0} role="listitem" aria-label={label} className="focus:outline-none focus-visible:[&>rect]:stroke-accent">
                <title>{label}</title>
                <text
                  x={6} y={y}
                  fill={sp.color} fontSize={12.5}
                  dominantBaseline="middle" fontWeight="600"
                >
                  {fi ? sp.name : sp.nameEn}
                </text>

                <rect
                  x={rangeX} y={y - 9}
                  width={rangeW} height={18}
                  fill={sp.color} opacity={0.08} rx={4}
                />

                <line
                  x1={barStart} y1={y} x2={nowX} y2={y}
                  stroke={sp.color} strokeWidth={barW}
                  strokeLinecap="round" opacity={0.75}
                />

                <polygon
                  points={`${barStart},${y - 5} ${barStart - 8},${y} ${barStart},${y + 5}`}
                  fill={sp.color} opacity={0.75}
                />

                <circle
                  cx={barStart} cy={y} r={circleR}
                  fill={sp.color} opacity={0.2}
                  stroke={sp.color} strokeWidth={1.5}
                />

                <text
                  x={barStart - circleR - 5} y={y - 5}
                  fill={sp.color} fontSize={9.5} opacity={0.9}
                  textAnchor="end"
                >
                  r={Math.abs(sp.r).toFixed(2)}
                </text>
                <text
                  x={barStart - circleR - 5} y={y + 8}
                  fill="var(--foreground-muted)" fontSize={8.5}
                  textAnchor="end"
                >
                  {sp.nCountries > 1
                    ? `${sp.direction}/${sp.directionTotal} ${fi ? "maata" : "countries"}`
                    : "UK"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 text-xs text-foreground-muted space-y-1">
        <p>
          {fi
            ? "Palkin pituus = viive (vuosia). Paksuus ∝ efektikoko. Ympyrä ∝ maiden lukumäärä."
            : "Bar length = lag (years). Thickness ∝ effect size. Circle ∝ number of countries."}
        </p>
        <p>
          {fi
            ? "Lähdevarmennettu COLOSS-paneeli. Circular-shift p-arvot. Vuosimuutos-robustit."
            : "Source-verified COLOSS panel. Circular-shift p-values. Year-change robust."}
        </p>
      </div>
    </div>
  );
}
