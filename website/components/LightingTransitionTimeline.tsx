"use client";

import { pickCopy } from "@/lib/i18n";

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
  ja: {
    title: "照明移行タイムライン",
    subtitle: "EU白熱電球禁止の段階、世界のLED普及率、および予測される出生率への影響期間",
    euBan: "EU白熱電球禁止",
    ledMarket: "世界LED市場シェア",
    predictedWindow: "予測TFR影響期間 (5〜10年のラグ)",
    phases: [
      { year: 2009, label: ">100W 禁止" },
      { year: 2010, label: ">75W 禁止" },
      { year: 2011, label: ">60W 禁止" },
      { year: 2012, label: "全白熱電球禁止" },
      { year: 2018, label: "ハロゲン禁止" },
      { year: 2023, label: "米国禁止施行" },
    ],
    ledData: "世界照明におけるLEDシェア",
    ifNote: "各LED電球にはスイッチング電源が内蔵されており、20〜200 kHzの電磁場を放射します — FDA承認のTTFieldsがん治療と同じ周波数帯域です",
  },
  fr: {
    title: "Chronologie de la transition lumineuse",
    subtitle: "Phases d'interdiction des ampoules à incandescence dans l'UE, part de marché mondiale des LED et fenêtre d'impact prédite sur la fécondité",
    euBan: "Interdiction UE des ampoules à incandescence",
    ledMarket: "Part de marché mondiale des LED",
    predictedWindow: "Fenêtre d'impact TFR prédite (décalage de 5 à 10 ans)",
    phases: [
      { year: 2009, label: ">100 W interdites" },
      { year: 2010, label: ">75 W interdites" },
      { year: 2011, label: ">60 W interdites" },
      { year: 2012, label: "Toutes incandescentes interdites" },
      { year: 2018, label: "Halogènes interdites" },
      { year: 2023, label: "Interdiction USA en vigueur" },
    ],
    ledData: "Part LED de l'éclairage mondial",
    ifNote: "Chaque ampoule LED contient une alimentation à découpage émettant des champs de 20 à 200 kHz — la même gamme de fréquences que la thérapie anticancéreuse TTFields approuvée par la FDA",
  },
  ko: {
    title: "조명 전환 타임라인",
    subtitle: "EU 백열전구 금지 단계, 글로벌 LED 시장 점유율, 예측되는 출산율 영향 기간",
    euBan: "EU 백열전구 금지",
    ledMarket: "글로벌 LED 시장 점유율",
    predictedWindow: "예측 TFR 영향 기간 (5~10년 지연)",
    phases: [
      { year: 2009, label: ">100W 금지" },
      { year: 2010, label: ">75W 금지" },
      { year: 2011, label: ">60W 금지" },
      { year: 2012, label: "모든 백열전구 금지" },
      { year: 2018, label: "할로겐 금지" },
      { year: 2023, label: "미국 금지 시행" },
    ],
    ledData: "글로벌 조명 중 LED 점유율",
    ifNote: "각 LED 전구에는 20~200 kHz 전자기장을 방출하는 스위칭 전원 공급 장치가 내장되어 있습니다 — FDA 승인 TTFields 암 치료와 동일한 주파수 대역입니다",
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
  const d = pickCopy(COPY, locale);
  const startYear = 2005;
  const endYear = 2025;
  const range = endYear - startYear;
  const chartLeft = 54;
  const chartRight = 846;
  const chartWidth = chartRight - chartLeft;
  const axisY = 240;

  const yearToX = (year: number) =>
    chartLeft + ((year - startYear) / range) * chartWidth;
  const shareToY = (pct: number) => 232 - (pct / 100) * 122;
  const markerLanes = [38, 58, 78, 98];
  const yearTicks = [2005, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024];

  return (
    <section className="mb-10">
      <div className="chart-surface">
        <div className="chart-surface__header">
          <div className="min-w-0 max-w-2xl">
            <h3 className="mb-1 text-base font-semibold">{d.title}</h3>
            <p className="text-xs leading-relaxed text-foreground-muted">{d.subtitle}</p>
          </div>

          <ul className="chart-legend" aria-label={d.title}>
            <li className="chart-key">
              <span
                className="chart-key__swatch"
                style={{ backgroundColor: "var(--color-accent)", color: "var(--color-accent)" }}
              />
              {d.euBan}
            </li>
            <li className="chart-key">
              <span
                className="chart-key__swatch"
                style={{
                  backgroundColor: "var(--color-status-partial)",
                  color: "var(--color-status-partial)",
                }}
              />
              {d.ledData}
            </li>
            <li className="chart-key">
              <span
                className="chart-key__swatch"
                style={{
                  backgroundColor: "var(--color-status-refuted)",
                  color: "var(--color-status-refuted)",
                }}
              />
              {d.predictedWindow}
            </li>
          </ul>
        </div>

        <div className="chart-scroll">
          <svg
            viewBox="0 0 900 280"
            className="chart-svg min-w-[780px] w-full"
            role="img"
            aria-label={d.title}
          >
            <defs>
              <linearGradient id="lightingLedArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-status-partial)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-status-partial)" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="lightingImpactWindow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-status-refuted)" stopOpacity="0.05" />
                <stop offset="50%" stopColor="var(--color-status-refuted)" stopOpacity="0.14" />
                <stop offset="100%" stopColor="var(--color-status-refuted)" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* The impact copy lives in the HTML legend, keeping every translation readable. */}
            <rect
              x={yearToX(2015)}
              y="22"
              width={yearToX(2022) - yearToX(2015)}
              height={axisY - 22}
              rx="8"
              fill="url(#lightingImpactWindow)"
              stroke="var(--color-status-refuted)"
              strokeWidth="1"
              strokeOpacity="0.28"
              strokeDasharray="5 4"
            />

            {[0, 25, 50, 75, 100].map((pct) => (
              <g key={`share-grid-${pct}`}>
                <line
                  x1={chartLeft}
                  y1={shareToY(pct)}
                  x2={chartRight}
                  y2={shareToY(pct)}
                  className="chart-grid-line"
                  strokeDasharray={pct === 0 ? undefined : "3 5"}
                />
                <text
                  x={chartRight + 9}
                  y={shareToY(pct) + 3}
                  fill="var(--color-foreground-muted)"
                  fontSize="9"
                  opacity="0.72"
                >
                  {pct}%
                </text>
              </g>
            ))}

            {/* LED market share area */}
            <path
              d={
                `M ${yearToX(LED_SHARE[0].year)} ${axisY - 8}` +
                LED_SHARE.map((point) =>
                  ` L ${yearToX(point.year)} ${shareToY(point.pct)}`,
                ).join("") +
                ` L ${yearToX(LED_SHARE[LED_SHARE.length - 1].year)} ${axisY - 8} Z`
              }
              fill="url(#lightingLedArea)"
              stroke="var(--color-status-partial)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {LED_SHARE.filter((point) => point.pct > 0).map((point) => (
              <g key={`led-${point.year}`}>
                <circle
                  cx={yearToX(point.year)}
                  cy={shareToY(point.pct)}
                  r="3.5"
                  fill="var(--color-figure-bg)"
                  stroke="var(--color-status-partial)"
                  strokeWidth="2"
                />
                {point.pct % 30 === 0 || point.pct >= 87 ? (
                  <text
                    x={yearToX(point.year)}
                    y={shareToY(point.pct) - 9}
                    textAnchor="middle"
                    fill="var(--color-status-partial)"
                    fontSize="9"
                    fontWeight="700"
                  >
                    {point.pct}%
                  </text>
                ) : null}
              </g>
            ))}

            {/* Numbered marker lanes replace collision-prone inline event labels. */}
            {d.phases.map((phase, index) => {
              const x = yearToX(phase.year);
              const markerY = markerLanes[index % markerLanes.length];

              return (
                <g key={phase.year}>
                  <line
                    x1={x}
                    y1={markerY + 10}
                    x2={x}
                    y2={axisY}
                    stroke="var(--color-accent)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    strokeOpacity="0.42"
                  />
                  <circle
                    cx={x}
                    cy={markerY}
                    r="10"
                    fill="var(--color-figure-bg)"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={markerY + 3}
                    textAnchor="middle"
                    fill="var(--color-accent)"
                    fontSize="9"
                    fontWeight="700"
                  >
                    {index + 1}
                  </text>
                </g>
              );
            })}

            <line
              x1={chartLeft}
              y1={axisY}
              x2={chartRight}
              y2={axisY}
              className="chart-axis-line"
              strokeWidth="1.25"
            />
            {yearTicks.map((year) => (
              <g key={year}>
                <line
                  x1={yearToX(year)}
                  y1={axisY}
                  x2={yearToX(year)}
                  y2={axisY + 6}
                  className="chart-axis-line"
                />
                <text
                  x={yearToX(year)}
                  y={axisY + 21}
                  textAnchor="middle"
                  fill="var(--color-foreground-muted)"
                  fontSize="10"
                >
                  {year}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <ol className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label={d.euBan}>
          {d.phases.map((phase, index) => (
            <li
              key={`phase-card-${phase.year}`}
              className="flex min-w-0 items-start gap-2.5 rounded-lg border border-card-border/70 bg-card-bg/60 px-3 py-2.5"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-bold text-accent ring-1 ring-accent/25">
                {index + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[10px] font-semibold text-accent">{phase.year}</span>
                <span className="block break-words text-xs leading-snug text-foreground">{phase.label}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-3 max-w-2xl text-xs italic leading-relaxed text-foreground-muted">{d.ifNote}</p>
    </section>
  );
}
