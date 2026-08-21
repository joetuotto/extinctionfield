"use client";

const COPY = {
  en: {
    title: "The Lighting Transition Timeline",
    subtitle: "EU incandescent ban phases, global LED adoption, and predicted fertility impact window",
    euBan: "EU Incandescent Ban",
    ledMarket: "Global LED Market Share",
    predictedWindow: "Predicted TFR impact window (5–10 yr lag)",
    phases: [
      { year: 2009, label: ">100W banned" },
      { year: 2010, label: ">75W banned" },
      { year: 2011, label: ">60W banned" },
      { year: 2012, label: "All incandescent banned" },
      { year: 2018, label: "Halogens banned" },
      { year: 2023, label: "USA ban effective" },
    ],
    ledData: "LED share of global lighting",
    ifNote: "Each LED bulb contains a switch-mode power supply emitting 20–200 kHz fields — the same frequency range as FDA-approved TTFields cancer therapy",
  },
  fi: {
    title: "Valaistussiirtymän aikajana",
    subtitle: "EU:n hehkulamppukiellon vaiheet, globaali LED-markkinaosuus ja ennustettu hedelmällisyysvaikutusikkuna",
    euBan: "EU:n hehkulamppukielto",
    ledMarket: "Globaali LED-markkinaosuus",
    predictedWindow: "Ennustettu TFR-vaikutusikkuna (5–10 v viive)",
    phases: [
      { year: 2009, label: ">100 W kielletty" },
      { year: 2010, label: ">75 W kielletty" },
      { year: 2011, label: ">60 W kielletty" },
      { year: 2012, label: "Kaikki hehkulamput kielletty" },
      { year: 2018, label: "Halogeenit kielletty" },
      { year: 2023, label: "USA:n kielto voimaan" },
    ],
    ledData: "LED-osuus globaalista valaistuksesta",
    ifNote: "Jokainen LED-lamppu sisältää hakkuriteholähteen, joka tuottaa 20–200 kHz kenttiä — sama taajuusalue kuin FDA:n hyväksymä TTFields-syöpähoito",
  },
} as const;

const LED_SHARE = [
  { year: 2005, pct: 0 }, { year: 2008, pct: 2 }, { year: 2010, pct: 5 },
  { year: 2012, pct: 15 }, { year: 2014, pct: 30 }, { year: 2016, pct: 50 },
  { year: 2018, pct: 65 }, { year: 2020, pct: 78 }, { year: 2022, pct: 87 },
  { year: 2024, pct: 92 },
];

interface Props {
  locale: string;
}

export function LightingTransitionTimeline({ locale }: Props) {
  const d = locale === "fi" ? COPY.fi : COPY.en;
  const startYear = 2005;
  const endYear = 2025;
  const range = endYear - startYear;

  const yearToX = (y: number) => ((y - startYear) / range) * 100;

  return (
    <section className="mb-10">
      <h3 className="text-base font-semibold mb-1">{d.title}</h3>
      <p className="text-xs text-foreground-muted mb-4 max-w-2xl">{d.subtitle}</p>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <svg viewBox="0 0 800 280" className="w-full" aria-label={d.title}>
            {/* Year axis */}
            {[2005, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024].map(y => (
              <g key={y}>
                <line
                  x1={40 + yearToX(y) * 7.2}
                  y1={240}
                  x2={40 + yearToX(y) * 7.2}
                  y2={245}
                  stroke="var(--color-foreground-muted)"
                  strokeOpacity={0.4}
                />
                <text
                  x={40 + yearToX(y) * 7.2}
                  y={258}
                  textAnchor="middle"
                  fill="var(--color-foreground-muted)"
                  fontSize={10}
                >
                  {y}
                </text>
              </g>
            ))}

            {/* Axis line */}
            <line x1={40} y1={240} x2={760} y2={240} stroke="var(--color-border)" strokeWidth={1} />

            {/* EU ban markers (top row) */}
            <text x={40} y={20} fill="var(--color-accent)" fontSize={11} fontWeight={600}>{d.euBan}</text>
            {d.phases.map((p, i) => {
              const x = 40 + yearToX(p.year) * 7.2;
              return (
                <g key={p.year}>
                  <line x1={x} y1={30} x2={x} y2={240} stroke="var(--color-accent)" strokeWidth={1} strokeDasharray="4 3" strokeOpacity={0.35} />
                  <circle cx={x} cy={35} r={4} fill="var(--color-accent)" />
                  <text
                    x={x}
                    y={50 + (i % 2) * 14}
                    textAnchor="middle"
                    fill="var(--color-foreground)"
                    fontSize={9}
                    fontWeight={500}
                  >
                    {p.label}
                  </text>
                </g>
              );
            })}

            {/* LED market share area */}
            <text x={40} y={85} fill="var(--color-status-partial)" fontSize={11} fontWeight={600}>{d.ledData}</text>
            <path
              d={
                `M ${40 + yearToX(LED_SHARE[0].year) * 7.2} ${230}` +
                LED_SHARE.map(p => ` L ${40 + yearToX(p.year) * 7.2} ${230 - p.pct * 1.3}`).join("") +
                ` L ${40 + yearToX(LED_SHARE[LED_SHARE.length - 1].year) * 7.2} ${230} Z`
              }
              fill="var(--color-status-partial)"
              fillOpacity={0.12}
              stroke="var(--color-status-partial)"
              strokeWidth={2}
            />
            {LED_SHARE.filter(p => p.pct > 0).map(p => (
              <g key={`led-${p.year}`}>
                <circle
                  cx={40 + yearToX(p.year) * 7.2}
                  cy={230 - p.pct * 1.3}
                  r={3}
                  fill="var(--color-status-partial)"
                />
                {p.pct % 30 === 0 || p.pct >= 87 ? (
                  <text
                    x={40 + yearToX(p.year) * 7.2}
                    y={230 - p.pct * 1.3 - 8}
                    textAnchor="middle"
                    fill="var(--color-status-partial)"
                    fontSize={9}
                    fontWeight={600}
                  >
                    {p.pct}%
                  </text>
                ) : null}
              </g>
            ))}

            {/* Predicted impact window */}
            <rect
              x={40 + yearToX(2015) * 7.2}
              y={92}
              width={(yearToX(2022) - yearToX(2015)) * 7.2}
              height={24}
              rx={4}
              fill="var(--color-status-refuted)"
              fillOpacity={0.1}
              stroke="var(--color-status-refuted)"
              strokeWidth={1}
              strokeOpacity={0.4}
              strokeDasharray="4 2"
            />
            <text
              x={40 + yearToX(2018.5) * 7.2}
              y={108}
              textAnchor="middle"
              fill="var(--color-status-refuted)"
              fontSize={9}
              fontWeight={500}
            >
              {d.predictedWindow}
            </text>
          </svg>
        </div>
      </div>

      <p className="text-xs text-foreground-muted italic mt-3 max-w-2xl">{d.ifNote}</p>
    </section>
  );
}
