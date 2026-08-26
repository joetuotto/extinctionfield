"use client";

const COPY = {
  en: {
    title: "Three-Channel Model: COVID Lockdown Resolution",
    subtitle: "The three frequency channels changed in different directions during lockdown — resolving the apparent paradox",
    elf: "ELF (<300 Hz)",
    if_: "IF (300 Hz–10 MHz)",
    rf: "RF (>10 MHz)",
    elfSources: "Power lines, motors",
    ifSources: "LED drivers, HVAC VFD, UPS",
    rfSources: "Phone, Wi-Fi, Bluetooth",
    pre: "Pre-COVID (2019)",
    lockdown: "Lockdown (2020)",
    post: "Post-COVID (2022+)",
    elfChange: "−5%",
    ifChange: "−70%",
    rfChange: "+40%",
    ifPost: "Partial return",
    rfPost: "+25% permanent",
    spermLabel: "Sperm quality",
    mentalLabel: "Mental health",
    spermUp: "Improved",
    spermDown: "Declined again",
    mentalDown: "Worsened",
    mentalPartial: "Partial recovery",
    mechanism: "IF↓ → less mitotic disruption → sperm↑",
    mechanism2: "RF↑ → circadian + neuro disruption → mental health↓",
    note: "Two different frequencies, two different mechanisms, two different tissues, two different directions — no paradox.",
  },
  fi: {
    title: "Kolmikanavamalli: COVID-lockdown-paradoksin ratkaisu",
    subtitle: "Kolme taajuuskanavaa muuttui eri suuntiin lockdownin aikana — ratkaisten näennäisen paradoksin",
    elf: "ELF (<300 Hz)",
    if_: "IF (300 Hz–10 MHz)",
    rf: "RF (>10 MHz)",
    elfSources: "Voimalinjat, moottorit",
    ifSources: "LED-hakkurit, HVAC VFD, UPS",
    rfSources: "Puhelin, Wi-Fi, Bluetooth",
    pre: "Ennen COVIDia (2019)",
    lockdown: "Lockdown (2020)",
    post: "Post-COVID (2022+)",
    elfChange: "−5 %",
    ifChange: "−70 %",
    rfChange: "+40 %",
    ifPost: "Osittainen paluu",
    rfPost: "+25 % pysyvä",
    spermLabel: "Siittiölaatu",
    mentalLabel: "Mielenterveys",
    spermUp: "Parani",
    spermDown: "Laski jälleen",
    mentalDown: "Heikkeni",
    mentalPartial: "Osittainen palautuminen",
    mechanism: "IF↓ → vähemmän mitoosihäiriötä → siittiö↑",
    mechanism2: "RF↑ → sirkadiaaninen + neurohäiriö → mielenterveys↓",
    note: "Kaksi eri taajuutta, kaksi eri mekanismia, kaksi eri kudosta, kaksi eri suuntaa — ei paradoksia.",
  },
} as const;

const W = 700;
const H = 340;
const COL_W = 180;
const GAP = 25;
const BAR_W = 40;
const BAR_BASE = 250;

interface BarSpec {
  channel: "elf" | "if" | "rf";
  color: string;
  pre: number;
  lock: number;
  post: number;
}

const BARS: BarSpec[] = [
  { channel: "elf", color: "#2196F3", pre: 100, lock: 95, post: 100 },
  { channel: "if", color: "#FF9800", pre: 160, lock: 48, post: 112 },
  { channel: "rf", color: "#F44336", pre: 120, lock: 168, post: 150 },
];

export function ThreeChannelDiagram({ locale }: { locale: string }) {
  const d = locale === "fi" ? COPY.fi : COPY.en;

  const phases = [
    { label: d.pre, key: "pre" as const },
    { label: d.lockdown, key: "lock" as const },
    { label: d.post, key: "post" as const },
  ];

  const channelLabels = [d.elf, d.if_, d.rf];
  const changeLabels = [
    [d.elfChange, d.elfChange],
    [d.ifChange, d.ifPost],
    [d.rfChange, d.rfPost],
  ];

  return (
    <div className="mt-8">
      <h4 className="text-base font-semibold mb-2">{d.title}</h4>
      <p className="text-xs text-foreground-muted mb-4">{d.subtitle}</p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-[700px]"
          style={{ minWidth: 500 }}
          role="img"
          aria-label={d.title}
        >
          {/* Phase columns */}
          {phases.map((phase, pi) => {
            const colX = 40 + pi * (COL_W + GAP);

            return (
              <g key={phase.key}>
                {/* Phase label */}
                <text x={colX + COL_W / 2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill="currentColor" opacity={0.8}>
                  {phase.label}
                </text>

                {/* Baseline */}
                <line x1={colX} y1={BAR_BASE} x2={colX + COL_W} y2={BAR_BASE} stroke="currentColor" opacity={0.15} />

                {/* Bars for each channel */}
                {BARS.map((bar, bi) => {
                  const barX = colX + 15 + bi * (BAR_W + 10);
                  const barH = bar[phase.key];
                  const barY = BAR_BASE - barH;

                  return (
                    <g key={bar.channel}>
                      <rect
                        x={barX}
                        y={barY}
                        width={BAR_W}
                        height={barH}
                        fill={bar.color}
                        opacity={0.75}
                        rx={3}
                      />
                      {/* Channel label at top of first column */}
                      {pi === 0 && (
                        <text x={barX + BAR_W / 2} y={BAR_BASE + 14} textAnchor="middle" fontSize={11} fill={bar.color} fontWeight={600}>
                          {channelLabels[bi]}
                        </text>
                      )}
                      {/* Change annotation for lockdown and post */}
                      {pi > 0 && (
                        <text x={barX + BAR_W / 2} y={barY - 5} textAnchor="middle" fontSize={13} fontWeight={600} fill={bar.color}>
                          {changeLabels[bi][pi - 1]}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Arrows between phases */}
          {[0, 1].map((i) => {
            const x1 = 40 + (COL_W) + i * (COL_W + GAP) + 5;
            const x2 = x1 + GAP - 10;
            const y = BAR_BASE - 80;
            return (
              <g key={`arrow-${i}`}>
                <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" opacity={0.25} strokeWidth={1.5} markerEnd="url(#arrowhead)" />
              </g>
            );
          })}
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="currentColor" opacity={0.25} />
            </marker>
          </defs>

          {/* Outcome indicators */}
          <g>
            {/* Sperm quality */}
            <rect x={40} y={BAR_BASE + 30} width={COL_W * 3 + GAP * 2} height={22} rx={4} fill="#4CAF50" opacity={0.08} />
            <text x={50} y={BAR_BASE + 44} fontSize={13} fontWeight={600} fill="#4CAF50">{d.spermLabel}:</text>
            <text x={50 + (COL_W + GAP)} y={BAR_BASE + 44} fontSize={11} fill="#4CAF50" textAnchor="middle">
              ↑ {d.spermUp}
            </text>
            <text x={50 + 2 * (COL_W + GAP)} y={BAR_BASE + 44} fontSize={11} fill="#F44336" textAnchor="middle">
              ↓ {d.spermDown}
            </text>

            {/* Mental health */}
            <rect x={40} y={BAR_BASE + 56} width={COL_W * 3 + GAP * 2} height={22} rx={4} fill="#F44336" opacity={0.08} />
            <text x={50} y={BAR_BASE + 70} fontSize={13} fontWeight={600} fill="#F44336">{d.mentalLabel}:</text>
            <text x={50 + (COL_W + GAP)} y={BAR_BASE + 70} fontSize={11} fill="#F44336" textAnchor="middle">
              ↓ {d.mentalDown}
            </text>
            <text x={50 + 2 * (COL_W + GAP)} y={BAR_BASE + 70} fontSize={11} fill="#FF9800" textAnchor="middle">
              ~ {d.mentalPartial}
            </text>
          </g>
        </svg>
      </div>

      {/* Mechanism summary */}
      <div className="grid gap-3 sm:grid-cols-2 mt-4 max-w-[700px]">
        <div className="rounded border border-card-border bg-card-bg p-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ background: "#FF9800" }} />
          <span className="text-xs font-semibold">{d.mechanism}</span>
        </div>
        <div className="rounded border border-card-border bg-card-bg p-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ background: "#F44336" }} />
          <span className="text-xs font-semibold">{d.mechanism2}</span>
        </div>
      </div>
      <p className="text-xs text-foreground-muted italic mt-3 max-w-[700px]">{d.note}</p>
    </div>
  );
}
