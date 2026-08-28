"use client";

import { useState } from "react";
import { pickCopy } from "@/lib/i18n";

interface TreatmentNode {
  id: string;
  name: Record<string, string>;
  level: number;
  levelLabel: Record<string, string>;
  mechanism: Record<string, string>;
  ionTarget: string;
  onset: Record<string, string>;
  color: string;
}

const TREATMENTS: TreatmentNode[] = [
  {
    id: "ssri",
    name: { en: "SSRI", fi: "SSRI", ja: "SSRI", fr: "SSRI", ko: "SSRI" },
    level: 1,
    levelLabel: { en: "Chemical", fi: "Kemiallinen", ja: "化学的", fr: "Chimique", ko: "화학적" },
    mechanism: {
      en: "5-HT reuptake → indirect ion modulation",
      fi: "5-HT-takaisinotto → epäsuora ionisäätely",
      ja: "5-HT再取り込み → 間接的イオン調節",
      fr: "Recapture de la 5-HT → modulation ionique indirecte",
      ko: "5-HT 재흡수 → 간접적 이온 조절",
    },
    ionTarget: "Na⁺/Ca²⁺ (indirect)",
    onset: { en: "2–4 weeks", fi: "2–4 viikkoa", ja: "2〜4週間", fr: "2 à 4 semaines", ko: "2~4주" },
    color: "#78909C",
  },
  {
    id: "tms",
    name: { en: "TMS / tDCS", fi: "TMS / tDCS", ja: "TMS / tDCS", fr: "TMS / tDCS", ko: "TMS / tDCS" },
    level: 2,
    levelLabel: { en: "Electromagnetic", fi: "Sähkömagneettinen", ja: "電磁的", fr: "Électromagnétique", ko: "전자기적" },
    mechanism: {
      en: "Pulsed EM → induced current → ion channel activation",
      fi: "Pulssi-EM → indusoitu virta → ionikanava-aktivaatio",
      ja: "パルスEM → 誘導電流 → イオンチャネル活性化",
      fr: "EM pulsé → courant induit → activation des canaux ioniques",
      ko: "펄스 EM → 유도 전류 → 이온 채널 활성화",
    },
    ionTarget: "Na⁺/Ca²⁺ (direct)",
    onset: { en: "2–4 weeks (cumulative)", fi: "2–4 viikkoa (kumulatiivinen)", ja: "2〜4週間（累積的）", fr: "2 à 4 semaines (cumulatif)", ko: "2~4주 (누적)" },
    color: "#7E57C2",
  },
  {
    id: "lithium",
    name: { en: "Lithium (Li⁺)", fi: "Litium (Li⁺)", ja: "リチウム (Li⁺)", fr: "Lithium (Li⁺)", ko: "리튬 (Li⁺)" },
    level: 3,
    levelLabel: { en: "Ionic (chronic)", fi: "Ioninen (krooninen)", ja: "イオン的（慢性）", fr: "Ionique (chronique)", ko: "이온적 (만성)" },
    mechanism: {
      en: "Li⁺ permeates VGSC → replaces Na⁺ → Ca²⁺ normalization",
      fi: "Li⁺ läpäisee VGSC:n → korvaa Na⁺:n → Ca²⁺-normalisointi",
      ja: "Li⁺がVGSCを透過 → Na⁺を置換 → Ca²⁺正常化",
      fr: "Li⁺ perméabilise les VGSC → remplace Na⁺ → normalisation de Ca²⁺",
      ko: "Li⁺가 VGSC 투과 → Na⁺ 대체 → Ca²⁺ 정상화",
    },
    ionTarget: "Na⁺ (direct replacement)",
    onset: { en: "1–2 weeks", fi: "1–2 viikkoa", ja: "1〜2週間", fr: "1 à 2 semaines", ko: "1~2주" },
    color: "#26A69A",
  },
  {
    id: "psilocybin",
    name: { en: "Psilocybin / Ketamine", fi: "Psilosybiini / Ketamiini", ja: "シロシビン / ケタミン", fr: "Psilocybine / Kétamine", ko: "실로시빈 / 케타민" },
    level: 4,
    levelLabel: { en: "Ionic reset", fi: "Ioninen reset", ja: "イオンリセット", fr: "Réinitialisation ionique", ko: "이온 리셋" },
    mechanism: {
      en: "5-HT2A → Gq → IP3 → Ca²⁺ surge → Cav1.2 (CACNA1C)",
      fi: "5-HT2A → Gq → IP3 → Ca²⁺-aalto → Cav1.2 (CACNA1C)",
      ja: "5-HT2A → Gq → IP3 → Ca²⁺サージ → Cav1.2 (CACNA1C)",
      fr: "5-HT2A → Gq → IP3 → afflux de Ca²⁺ → Cav1.2 (CACNA1C)",
      ko: "5-HT2A → Gq → IP3 → Ca²⁺ 급등 → Cav1.2 (CACNA1C)",
    },
    ionTarget: "Ca²⁺ (massive, acute)",
    onset: { en: "Hours (single dose)", fi: "Tunteja (yksi annos)", ja: "数時間（単回投与）", fr: "Heures (dose unique)", ko: "수 시간 (단회 투여)" },
    color: "#EF5350",
  },
  {
    id: "ect",
    name: { en: "ECT", fi: "ECT (sähkösokkihoito)", ja: "ECT（電気けいれん療法）", fr: "ECT (sismothérapie)", ko: "ECT (전기경련요법)" },
    level: 5,
    levelLabel: { en: "Total ionic reset", fi: "Totaalinen ioninen nollaus", ja: "完全イオンリセット", fr: "Réinitialisation ionique totale", ko: "완전 이온 리셋" },
    mechanism: {
      en: "Forced seizure → cortical spreading depolarization (CSD) → complete ionic gradient reset",
      fi: "Pakotettu kohtaus → leviävä depolarisaatioaalto (CSD) → täydellinen ionigradienttien nollaus",
      ja: "強制発作 → 皮質拡延性脱分極 (CSD) → 完全イオン勾配リセット",
      fr: "Crise forcée → dépolarisation corticale envahissante (CSD) → réinitialisation complète des gradients ioniques",
      ko: "강제 발작 → 피질 확산성 탈분극 (CSD) → 완전 이온 경사 리셋",
    },
    ionTarget: "ALL (Na⁺, K⁺, Ca²⁺, Cl⁻)",
    onset: { en: "Hours (first session)", fi: "Tunteja (ensimmäinen sessio)", ja: "数時間（初回セッション）", fr: "Heures (première séance)", ko: "수 시간 (첫 세션)" },
    color: "#D32F2F",
  },
];

const COPY = {
  en: {
    title: "Ionic Treatment Hierarchy",
    subtitle: "All mood treatments converge on Ca²⁺ homeostasis — their efficacy tracks with ionic directness",
    levelLabel: "Ionic directness",
    mechanism: "Mechanism",
    target: "Ion target",
    onset: "Onset",
    convergence: "Ca²⁺ convergence",
    convergenceNote: "Every treatment ultimately modulates calcium signaling. The more directly it targets ion channels, the faster and more effective it tends to be.",
  },
  fi: {
    title: "Ioninen hoitohierarkia",
    subtitle: "Kaikki mielialahoitot konvergoivat Ca²⁺-homeostaasiin — tehokkuus seuraa ionista kohdistusta",
    levelLabel: "Ioninen kohdistus",
    mechanism: "Mekanismi",
    target: "Ionikohde",
    onset: "Vaikutus alkaa",
    convergence: "Ca²⁺-konvergenssi",
    convergenceNote: "Jokainen hoito moduloi lopulta kalsiumsignalointia. Mitä suoremmin se kohdistuu ionikanaviin, sitä nopeampi ja tehokkaampi se yleensä on.",
  },
  ja: {
    title: "イオン治療階層",
    subtitle: "すべての気分治療はCa²⁺ホメオスタシスに収束します — 有効性はイオンの直接性に従います",
    levelLabel: "イオンの直接性",
    mechanism: "メカニズム",
    target: "イオン標的",
    onset: "効果発現",
    convergence: "Ca²⁺収束",
    convergenceNote: "すべての治療は最終的にカルシウムシグナル伝達を調節します。イオンチャネルをより直接的に標的とするほど、より速く、より効果的になる傾向があります。",
  },
  fr: {
    title: "Hiérarchie des traitements ioniques",
    subtitle: "Tous les traitements de l'humeur convergent vers l'homéostasie du Ca²⁺ — leur efficacité suit la directivité ionique",
    levelLabel: "Directivité ionique",
    mechanism: "Mécanisme",
    target: "Cible ionique",
    onset: "Délai d'action",
    convergence: "Convergence Ca²⁺",
    convergenceNote: "Chaque traitement module ultimement la signalisation calcique. Plus il cible directement les canaux ioniques, plus il tend à être rapide et efficace.",
  },
  ko: {
    title: "이온 치료 계층",
    subtitle: "모든 기분 치료는 Ca²⁺ 항상성으로 수렴합니다 — 효능은 이온 직접성에 따릅니다",
    levelLabel: "이온 직접성",
    mechanism: "메커니즘",
    target: "이온 표적",
    onset: "효과 발현",
    convergence: "Ca²⁺ 수렴",
    convergenceNote: "모든 치료는 궁극적으로 칼슘 신호 전달을 조절합니다. 이온 채널을 더 직접적으로 표적으로 할수록 더 빠르고 효과적인 경향이 있습니다.",
  },
} as const;

export function IonicHierarchyDiagram({ locale }: { locale: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const d = pickCopy(COPY, locale);

  const svgW = 860;
  const svgH = 400;
  const barX = 120;
  const barW = 480;
  const rowH = 56;
  const startY = 50;
  const totalLevels = TREATMENTS.length;

  return (
    <div className="my-8">
      <h4 className="text-sm font-semibold mb-1">{d.title}</h4>
      <p className="text-xs text-foreground-muted mb-4">{d.subtitle}</p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", minWidth: 500 }}
          role="img"
          aria-label={d.title}
        >
          {/* Arrow indicating increasing directness */}
          <defs>
            <marker id="ionic-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="var(--foreground-muted, #999)" />
            </marker>
            <linearGradient id="ionic-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF5350" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#78909C" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Background gradient */}
          <rect x={barX} y={startY - 10} width={barW} height={rowH * totalLevels + 20} rx="8" fill="url(#ionic-grad)" />

          {/* Directness arrow on left */}
          <line
            x1="30" y1={startY + rowH * totalLevels - 10}
            x2="30" y2={startY}
            stroke="var(--foreground-muted, #999)"
            strokeWidth="1.5"
            markerEnd="url(#ionic-arrow)"
          />
          <text x="30" y={startY + rowH * totalLevels / 2 + 5} textAnchor="middle" fontSize="11" fill="var(--foreground-muted, #999)" transform={`rotate(-90, 30, ${startY + rowH * totalLevels / 2 + 5})`}>
            {d.levelLabel}
          </text>

          {/* Treatment rows — bottom to top (level 1 at bottom, 5 at top) */}
          {TREATMENTS.slice().reverse().map((t, ri) => {
            const idx = totalLevels - 1 - ri;
            const y = startY + idx * rowH;
            const widthFrac = (t.level / totalLevels) * barW * 0.85;
            const isSelected = selected === t.id;

            return (
              <g key={t.id} tabIndex={0} role="button" style={{ cursor: "pointer" }} onClick={() => setSelected(isSelected ? null : t.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(isSelected ? null : t.id); } }}>
                {/* Bar */}
                <rect
                  x={barX + (barW - widthFrac) / 2}
                  y={y + 5}
                  width={widthFrac}
                  height={rowH - 14}
                  rx="6"
                  fill={t.color}
                  opacity={isSelected ? 0.95 : 0.7}
                  stroke={isSelected ? "var(--foreground, #fff)" : "none"}
                  strokeWidth={isSelected ? 2 : 0}
                />
                {/* Level number */}
                <text
                  x={barX + barW / 2}
                  y={y + rowH / 2 + 1}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="#fff"
                  style={{ cursor: "pointer", pointerEvents: "none" }}
                >
                  {pickCopy(t.name, locale)}
                </text>
                {/* Level label right */}
                <text
                  x={barX + barW + 10}
                  y={y + rowH / 2 + 1}
                  fontSize="11"
                  fill="var(--foreground-muted, #999)"
                  dominantBaseline="middle"
                >
                  L{t.level}: {pickCopy(t.levelLabel, locale)}
                </text>
              </g>
            );
          })}

          {/* Convergence label at bottom */}
          <text x={barX + barW / 2} y={startY + rowH * totalLevels + 25} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent, #e88d4e)">
            {d.convergence}: Ca²⁺
          </text>
        </svg>
      </div>

      {/* Detail panel */}
      {selected && (() => {
        const t = TREATMENTS.find((tr) => tr.id === selected);
        if (!t) return null;
        return (
          <div className="mt-4 rounded-lg border border-card-border bg-card-bg p-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: t.color }} />
              <span className="font-semibold text-sm">{pickCopy(t.name, locale)}</span>
              <span className="text-xs text-foreground-muted">— {pickCopy(t.levelLabel, locale)}</span>
            </div>
            <div className="grid gap-2 text-sm text-foreground-muted">
              <p><span className="font-semibold text-foreground">{d.mechanism}:</span> {pickCopy(t.mechanism, locale)}</p>
              <p><span className="font-semibold text-foreground">{d.target}:</span> {t.ionTarget}</p>
              <p><span className="font-semibold text-foreground">{d.onset}:</span> {pickCopy(t.onset, locale)}</p>
            </div>
          </div>
        );
      })()}

      <p className="text-xs text-foreground-muted italic mt-3 max-w-4xl">
        {d.convergenceNote}
      </p>
    </div>
  );
}
