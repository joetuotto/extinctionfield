"use client";

import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "CaMKII: The Convergence Molecule",
    subtitle:
      "One molecule explains why obesity, diabetes, infertility, and sleep disorders all increase simultaneously",
    center: "CaMKII",
    centerSub: "Ca²⁺/calmodulin-dependent\nprotein kinase II",
    upstream: "EMF → VGCC → Ca²⁺",
    targets: [
      {
        label: "Cav3.2\nthreshold ↓",
        effect: "EMF sensitivity\nINCREASES",
        color: "#EF4444",
      },
      {
        label: "UCP1\ntranscription ↓",
        effect: "BAT thermo-\ngenesis ↓",
        color: "#F97316",
      },
      {
        label: "StAR\nexpression ↓",
        effect: "Testosterone ↓",
        color: "#EAB308",
      },
      {
        label: "β-cell\nCa²⁺ dynamics ↓",
        effect: "Insulin\nresistance",
        color: "#22C55E",
      },
      {
        label: "L-cell\nGLP-1 ↓",
        effect: "Incretin\ndisruption",
        color: "#3B82F6",
      },
    ],
    outcome: "METABOLIC SYNDROME\n+ PROGRESSIVE SENSITIZATION",
    caveat:
      "Epistemic note: CaMKII convergence is IDENTIFIED from independent literature but not yet experimentally tested as an integrated EMF mechanism. Each pathway is verified separately; the integrated test (EMF → CaMKII → all five targets simultaneously) is a prediction, not established fact. Evidence level: M.",
    targetRows: [
      {
        pathway: "EMF sensitivity",
        role: "Shifts Cav3.2 activation threshold to more negative potentials",
        referenceId: "camkii-cav32-threshold-2023",
        source: "PMC9913649 (2023)",
      },
      {
        pathway: "BAT thermogenesis",
        role: "UCP1 transcription via CREB phosphorylation",
        source: "BAT physiology reviews",
      },
      {
        pathway: "Testosterone",
        role: "StAR expression in Leydig cells",
        referenceId: "xiang2025_clc2_ttype",
        source: "Endocrine literature",
      },
      {
        pathway: "Insulin secretion",
        role: "VDCC phosphorylation in β-cells",
        referenceId: "cavg4_camkii_mafa",
        source: "PMC3556522 (Bhatt 2012)",
      },
      {
        pathway: "GLP-1 secretion",
        role: "α2δ-1 modulation in intestinal L-cells",
        referenceId: "alpha2d1_glp1_2024",
        source: "AJP-GI 2024 (Harada)",
      },
    ],
    colPathway: "Pathway",
    colRole: "CaMKII role",
    colSource: "Source",
  },
  fi: {
    title: "CaMKII: konvergenssimolekyyli",
    subtitle:
      "Yksi molekyyli selittää miksi lihavuus, diabetes, hedelmättömyys ja unihäiriöt lisääntyvät samanaikaisesti",
    center: "CaMKII",
    centerSub: "Ca²⁺/kalmoduliini-riippuvainen\nproteiinikinaasi II",
    upstream: "EMF → VGCC → Ca²⁺",
    targets: [
      {
        label: "Cav3.2\nkynnys ↓",
        effect: "EMF-herkkyys\nKASVAA",
        color: "#EF4444",
      },
      {
        label: "UCP1\ntranskriptio ↓",
        effect: "BAT-termo-\ngeneesi ↓",
        color: "#F97316",
      },
      {
        label: "StAR\nekspressio ↓",
        effect: "Testosteroni ↓",
        color: "#EAB308",
      },
      {
        label: "β-solun\nCa²⁺-dynamiikka ↓",
        effect: "Insuliini-\nresistenssi",
        color: "#22C55E",
      },
      {
        label: "L-solun\nGLP-1 ↓",
        effect: "Inkretiini-\nhäiriö",
        color: "#3B82F6",
      },
    ],
    outcome: "METABOLINEN SYNDROOMA\n+ PROGRESSIIVINEN HERKISTYMINEN",
    caveat:
      "Episteeminen huomio: CaMKII-konvergenssi on TUNNISTETTU itsenäisestä kirjallisuudesta mutta ei vielä kokeellisesti testattu integroituna EMF-mekanismina. Jokainen reitti on verifioitu erikseen; integroitu koe (EMF → CaMKII → kaikki viisi kohdetta samanaikaisesti) on ennuste, ei vahvistettu fakta. Evidenssitaso: M.",
    targetRows: [
      {
        pathway: "EMF-herkkyys",
        role: "Siirtää Cav3.2-aktivaatiokynnystä negatiivisemmaksi",
        referenceId: "camkii-cav32-threshold-2023",
        source: "PMC9913649 (2023)",
      },
      {
        pathway: "BAT-termogeneesi",
        role: "UCP1-transkriptio CREB-fosforylaation kautta",
        source: "BAT-fysiologiakatsaukset",
      },
      {
        pathway: "Testosteroni",
        role: "StAR-ekspressio Leydigin soluissa",
        referenceId: "xiang2025_clc2_ttype",
        source: "Endokrinologinen kirjallisuus",
      },
      {
        pathway: "Insuliinieritys",
        role: "VDCC-fosforylaatio β-soluissa",
        referenceId: "cavg4_camkii_mafa",
        source: "PMC3556522 (Bhatt 2012)",
      },
      {
        pathway: "GLP-1-eritys",
        role: "α2δ-1-modulaatio suoliston L-soluissa",
        referenceId: "alpha2d1_glp1_2024",
        source: "AJP-GI 2024 (Harada)",
      },
    ],
    colPathway: "Reitti",
    colRole: "CaMKII:n rooli",
    colSource: "Lähde",
  },
  ja: {
    title: "CaMKII：収束分子",
    subtitle:
      "1つの分子が、肥満、糖尿病、不妊、睡眠障害がすべて同時に増加する理由を説明する",
    center: "CaMKII",
    centerSub: "Ca²⁺/カルモジュリン依存性\nプロテインキナーゼ II",
    upstream: "EMF → VGCC → Ca²⁺",
    targets: [
      {
        label: "Cav3.2\n閾値 ↓",
        effect: "EMF感受性\n増加",
        color: "#EF4444",
      },
      {
        label: "UCP1\n転写 ↓",
        effect: "BAT熱産生 ↓",
        color: "#F97316",
      },
      {
        label: "StAR\n発現 ↓",
        effect: "テストステロン ↓",
        color: "#EAB308",
      },
      {
        label: "β細胞\nCa²⁺動態 ↓",
        effect: "インスリン\n抵抗性",
        color: "#22C55E",
      },
      {
        label: "L細胞\nGLP-1 ↓",
        effect: "インクレチン\n障害",
        color: "#3B82F6",
      },
    ],
    outcome: "メタボリックシンドローム\n+ 進行性の感作",
    caveat:
      "認識論的注記：CaMKIIの収束は独立した文献から特定されているが、統合されたEMFメカニズムとしてはまだ実験的に検証されていない。各経路は個別に検証済みであり、統合試験（EMF → CaMKII → 5つすべての標的を同時に）は予測であって、確立された事実ではない。エビデンスレベル：M。",
    targetRows: [
      {
        pathway: "EMF感受性",
        role: "Cav3.2の活性化閾値をより負の電位へ移動させる",
        referenceId: "camkii-cav32-threshold-2023",
        source: "PMC9913649 (2023)",
      },
      {
        pathway: "BAT熱産生",
        role: "CREBリン酸化を介したUCP1転写",
        source: "BAT生理学レビュー",
      },
      {
        pathway: "テストステロン",
        role: "ライディッヒ細胞におけるStAR発現",
        referenceId: "xiang2025_clc2_ttype",
        source: "内分泌学文献",
      },
      {
        pathway: "インスリン分泌",
        role: "β細胞におけるVDCCリン酸化",
        referenceId: "cavg4_camkii_mafa",
        source: "PMC3556522 (Bhatt 2012)",
      },
      {
        pathway: "GLP-1分泌",
        role: "腸管L細胞におけるα2δ-1調節",
        referenceId: "alpha2d1_glp1_2024",
        source: "AJP-GI 2024 (Harada)",
      },
    ],
    colPathway: "経路",
    colRole: "CaMKIIの役割",
    colSource: "出典",
  },
  fr: {
    title: "CaMKII : la molécule de convergence",
    subtitle:
      "Une seule molécule explique pourquoi l'obésité, le diabète, l'infertilité et les troubles du sommeil augmentent tous simultanément",
    center: "CaMKII",
    centerSub: "Protéine kinase II\ndépendante de Ca²⁺/calmoduline",
    upstream: "EMF → VGCC → Ca²⁺",
    targets: [
      {
        label: "Cav3.2\nseuil ↓",
        effect: "Sensibilité EMF\nAUGMENTE",
        color: "#EF4444",
      },
      {
        label: "UCP1\ntranscription ↓",
        effect: "Thermo-\ngenèse BAT ↓",
        color: "#F97316",
      },
      {
        label: "StAR\nexpression ↓",
        effect: "Testostérone ↓",
        color: "#EAB308",
      },
      {
        label: "Cellule β\ndynamique Ca²⁺ ↓",
        effect: "Résistance à\nl'insuline",
        color: "#22C55E",
      },
      {
        label: "Cellule L\nGLP-1 ↓",
        effect: "Perturbation\nincrétine",
        color: "#3B82F6",
      },
    ],
    outcome: "SYNDROME MÉTABOLIQUE\n+ SENSIBILISATION PROGRESSIVE",
    caveat:
      "Note épistémique : la convergence CaMKII est IDENTIFIÉE à partir de publications indépendantes, mais n'a pas encore été testée expérimentalement comme mécanisme EMF intégré. Chaque voie est vérifiée séparément ; le test intégré (EMF → CaMKII → les cinq cibles simultanément) est une prédiction, et non un fait établi. Niveau de preuve : M.",
    targetRows: [
      {
        pathway: "Sensibilité EMF",
        role: "Déplace le seuil d'activation de Cav3.2 vers des potentiels plus négatifs",
        referenceId: "camkii-cav32-threshold-2023",
        source: "PMC9913649 (2023)",
      },
      {
        pathway: "Thermogenèse BAT",
        role: "Transcription d'UCP1 via la phosphorylation de CREB",
        source: "Revues de physiologie BAT",
      },
      {
        pathway: "Testostérone",
        role: "Expression de StAR dans les cellules de Leydig",
        referenceId: "xiang2025_clc2_ttype",
        source: "Littérature endocrinologique",
      },
      {
        pathway: "Sécrétion d'insuline",
        role: "Phosphorylation des VDCC dans les cellules β",
        referenceId: "cavg4_camkii_mafa",
        source: "PMC3556522 (Bhatt 2012)",
      },
      {
        pathway: "Sécrétion GLP-1",
        role: "Modulation d'α2δ-1 dans les cellules L intestinales",
        referenceId: "alpha2d1_glp1_2024",
        source: "AJP-GI 2024 (Harada)",
      },
    ],
    colPathway: "Voie",
    colRole: "Rôle de CaMKII",
    colSource: "Source",
  },
  ko: {
    title: "CaMKII: 수렴 분자",
    subtitle:
      "하나의 분자가 비만, 당뇨병, 불임, 수면 장애가 모두 동시에 증가하는 이유를 설명한다",
    center: "CaMKII",
    centerSub: "Ca²⁺/칼모듈린 의존성\n단백질 키나아제 II",
    upstream: "EMF → VGCC → Ca²⁺",
    targets: [
      {
        label: "Cav3.2\n역치 ↓",
        effect: "EMF 민감도\n증가",
        color: "#EF4444",
      },
      {
        label: "UCP1\n전사 ↓",
        effect: "BAT 열발생 ↓",
        color: "#F97316",
      },
      {
        label: "StAR\n발현 ↓",
        effect: "테스토스테론 ↓",
        color: "#EAB308",
      },
      {
        label: "β세포\nCa²⁺ 역학 ↓",
        effect: "인슐린\n저항성",
        color: "#22C55E",
      },
      {
        label: "L세포\nGLP-1 ↓",
        effect: "인크레틴\n장애",
        color: "#3B82F6",
      },
    ],
    outcome: "대사증후군\n+ 점진적 감작",
    caveat:
      "인식론적 참고: CaMKII 수렴은 독립된 문헌에서 확인되었지만 통합 EMF 메커니즘으로는 아직 실험적으로 검증되지 않았다. 각 경로는 별도로 검증되었으며, 통합 시험(EMF → CaMKII → 다섯 표적 모두에 동시에 작용)은 예측이지 확립된 사실이 아니다. 증거 수준: M.",
    targetRows: [
      {
        pathway: "EMF 민감도",
        role: "Cav3.2 활성화 역치를 더 음의 전위로 이동시킨다",
        referenceId: "camkii-cav32-threshold-2023",
        source: "PMC9913649 (2023)",
      },
      {
        pathway: "BAT 열발생",
        role: "CREB 인산화를 통한 UCP1 전사",
        source: "BAT 생리학 리뷰",
      },
      {
        pathway: "테스토스테론",
        role: "라이디히 세포의 StAR 발현",
        referenceId: "xiang2025_clc2_ttype",
        source: "내분비학 문헌",
      },
      {
        pathway: "인슐린 분비",
        role: "β세포의 VDCC 인산화",
        referenceId: "cavg4_camkii_mafa",
        source: "PMC3556522 (Bhatt 2012)",
      },
      {
        pathway: "GLP-1 분비",
        role: "장 L세포의 α2δ-1 조절",
        referenceId: "alpha2d1_glp1_2024",
        source: "AJP-GI 2024 (Harada)",
      },
    ],
    colPathway: "경로",
    colRole: "CaMKII 역할",
    colSource: "출처",
  },
};

const W = 700;
const H = 420;
const CX = W / 2;
const CY = 140;
const R_CENTER = 42;
const TARGET_Y = 280;
const EFFECT_Y = 370;

function multiline(
  text: string,
  x: number,
  y: number,
  opts: { fontSize?: number; fill?: string; anchor?: string; weight?: number } = {},
) {
  const lines = text.split("\n");
  const fs = opts.fontSize ?? 10;
  const lh = fs * 1.3;
  const startY = y - ((lines.length - 1) * lh) / 2;
  return (
    <text
      x={x}
      y={startY}
      textAnchor={(opts.anchor as "middle" | "start" | "end") ?? "middle"}
      fill={opts.fill ?? "var(--foreground)"}
      fontSize={fs}
      fontWeight={opts.weight ?? 400}
    >
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : lh}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function CaMKIIConvergenceDiagram({ locale }: { locale: string }) {
  const t = pickCopy(COPY, locale);
  const N = t.targets.length;
  const spacing = (W - 100) / (N - 1);
  const startX = 50;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[500px]"
        role="img"
        aria-label={t.title}
      >
        {/* Upstream arrow */}
        {multiline(t.upstream, CX, 28, {
          fontSize: 11,
          fill: "var(--foreground-muted)",
          weight: 600,
        })}
        <line
          x1={CX}
          y1={42}
          x2={CX}
          y2={CY - R_CENTER - 6}
          stroke="var(--foreground-muted)"
          strokeWidth={1.5}
          markerEnd="url(#arrowMuted)"
        />

        {/* Central CaMKII circle */}
        <circle
          cx={CX}
          cy={CY}
          r={R_CENTER}
          fill="var(--card-bg)"
          stroke="#8B5CF6"
          strokeWidth={2.5}
        />
        {multiline(t.center, CX, CY - 6, {
          fontSize: 13,
          fill: "#8B5CF6",
          weight: 700,
        })}
        <text
          x={CX}
          y={CY + 14}
          textAnchor="middle"
          fill="var(--foreground-muted)"
          fontSize={6.5}
        >
          {t.centerSub.split("\n").map((line, i) => (
            <tspan key={i} x={CX} dy={i === 0 ? 0 : 9}>
              {line}
            </tspan>
          ))}
        </text>

        {/* Fan-out lines from center to targets */}
        {t.targets.map((tgt, i) => {
          const tx = startX + i * spacing;
          return (
            <g key={i}>
              <line
                x1={CX}
                y1={CY + R_CENTER}
                x2={tx}
                y2={TARGET_Y - 20}
                stroke={tgt.color}
                strokeWidth={1.5}
                markerEnd={`url(#arrow${i})`}
              />
              {/* Target box */}
              <rect
                x={tx - 48}
                y={TARGET_Y - 20}
                width={96}
                height={36}
                rx={6}
                fill="var(--card-bg)"
                stroke={tgt.color}
                strokeWidth={1.5}
              />
              {multiline(tgt.label, tx, TARGET_Y - 1, {
                fontSize: 9,
                fill: "var(--foreground)",
                weight: 500,
              })}
              {/* Effect label below */}
              <line
                x1={tx}
                y1={TARGET_Y + 16}
                x2={tx}
                y2={EFFECT_Y - 16}
                stroke={tgt.color}
                strokeWidth={1}
                strokeDasharray="3 2"
              />
              {multiline(tgt.effect, tx, EFFECT_Y - 2, {
                fontSize: 8,
                fill: tgt.color,
                weight: 600,
              })}
            </g>
          );
        })}

        {/* Arrow markers */}
        <defs>
          <marker
            id="arrowMuted"
            viewBox="0 0 10 10"
            refX={8}
            refY={5}
            markerWidth={6}
            markerHeight={6}
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--foreground-muted)" />
          </marker>
          {t.targets.map((tgt, i) => (
            <marker
              key={i}
              id={`arrow${i}`}
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={6}
              markerHeight={6}
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={tgt.color} />
            </marker>
          ))}
        </defs>
      </svg>
    </div>
  );
}
