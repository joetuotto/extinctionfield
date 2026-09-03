"use client";

import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Three-Channel Model: COVID Lockdown Resolution",
    subtitle: "The three frequency channels changed in different directions during lockdown — resolving the apparent paradox",
    elf: "ELF (<300 Hz)",
    if_: "IF (300 Hz–1 MHz)",
    rf: "RF (>1 MHz)",
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
    if_: "IF (300 Hz–1 MHz)",
    rf: "RF (>1 MHz)",
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
  ja: {
    title: "3チャネルモデル：COVID lockdown の解消",
    subtitle: "3つの周波数チャネルは lockdown 中に異なる方向に変化した — 見かけのパラドックスを解消",
    elf: "ELF (<300 Hz)",
    if_: "IF (300 Hz–1 MHz)",
    rf: "RF (>1 MHz)",
    elfSources: "送電線、モーター",
    ifSources: "LED駆動回路、HVAC VFD、UPS",
    rfSources: "携帯電話、Wi-Fi、Bluetooth",
    pre: "COVID前 (2019)",
    lockdown: "ロックダウン (2020)",
    post: "COVID後 (2022+)",
    elfChange: "−5%",
    ifChange: "−70%",
    rfChange: "+40%",
    ifPost: "部分的回復",
    rfPost: "+25% 恒久的",
    spermLabel: "精子の質",
    mentalLabel: "メンタルヘルス",
    spermUp: "改善",
    spermDown: "再び低下",
    mentalDown: "悪化",
    mentalPartial: "部分的回復",
    mechanism: "IF↓ → 有糸分裂障害の減少 → 精子↑",
    mechanism2: "RF↑ → 概日リズム＋神経撹乱 → メンタルヘルス↓",
    note: "2つの異なる周波数、2つの異なるメカニズム、2つの異なる組織、2つの異なる方向 — パラドックスなし。",
  },
  fr: {
    title: "Modèle à trois canaux : résolution du paradoxe du confinement COVID",
    subtitle: "Les trois canaux de fréquence ont évolué dans des directions différentes pendant le confinement — résolvant le paradoxe apparent",
    elf: "ELF (<300 Hz)",
    if_: "IF (300 Hz–1 MHz)",
    rf: "RF (>1 MHz)",
    elfSources: "Lignes électriques, moteurs",
    ifSources: "Drivers LED, VFD HVAC, ASI",
    rfSources: "Téléphone, Wi-Fi, Bluetooth",
    pre: "Pré-COVID (2019)",
    lockdown: "Confinement (2020)",
    post: "Post-COVID (2022+)",
    elfChange: "−5 %",
    ifChange: "−70 %",
    rfChange: "+40 %",
    ifPost: "Retour partiel",
    rfPost: "+25 % permanent",
    spermLabel: "Qualité du sperme",
    mentalLabel: "Santé mentale",
    spermUp: "Améliorée",
    spermDown: "A redécliné",
    mentalDown: "Détériorée",
    mentalPartial: "Récupération partielle",
    mechanism: "IF↓ → moins de perturbation mitotique → sperme↑",
    mechanism2: "RF↑ → perturbation circadienne + neuro → santé mentale↓",
    note: "Deux fréquences différentes, deux mécanismes différents, deux tissus différents, deux directions différentes — aucun paradoxe.",
  },
  ko: {
    title: "3채널 모델: COVID 봉쇄 해소",
    subtitle: "3개의 주파수 채널은 봉쇄 기간 동안 서로 다른 방향으로 변화했다 — 겉보기 역설을 해소",
    elf: "ELF (<300 Hz)",
    if_: "IF (300 Hz–1 MHz)",
    rf: "RF (>1 MHz)",
    elfSources: "송전선, 모터",
    ifSources: "LED 드라이버, HVAC VFD, UPS",
    rfSources: "휴대전화, Wi-Fi, Bluetooth",
    pre: "COVID 이전 (2019)",
    lockdown: "봉쇄 (2020)",
    post: "COVID 이후 (2022+)",
    elfChange: "−5%",
    ifChange: "−70%",
    rfChange: "+40%",
    ifPost: "부분적 복귀",
    rfPost: "+25% 영구적",
    spermLabel: "정자 품질",
    mentalLabel: "정신 건강",
    spermUp: "개선",
    spermDown: "재하락",
    mentalDown: "악화",
    mentalPartial: "부분적 회복",
    mechanism: "IF↓ → 유사분열 교란 감소 → 정자↑",
    mechanism2: "RF↑ → 일주기 리듬 + 신경 교란 → 정신 건강↓",
    note: "두 가지 다른 주파수, 두 가지 다른 메커니즘, 두 가지 다른 조직, 두 가지 다른 방향 — 역설 없음.",
  },
};

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
  const d = pickCopy(COPY, locale);

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

      <div className="chart-surface">
        <ul className="chart-legend mb-2" aria-label={d.title}>
          {BARS.map((bar, index) => (
            <li key={bar.channel} className="chart-key">
              <span className="chart-key__swatch" style={{ backgroundColor: bar.color, color: bar.color }} />
              {channelLabels[index]}
            </li>
          ))}
        </ul>
        <div className="chart-scroll">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="chart-svg w-full max-w-[700px]"
          style={{ minWidth: 620 }}
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
                  const labelLift = phase.key === "post" && bar.channel === "if" ? 14 : 0;

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
                      {/* Change annotation for lockdown and post */}
                      {pi > 0 && (
                        <text x={barX + BAR_W / 2} y={barY - 5 - labelLift} textAnchor="middle" fontSize={13} fontWeight={600} fill={bar.color}>
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
