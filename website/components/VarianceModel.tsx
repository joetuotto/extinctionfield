"use client";

import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Variance Model: Population Distribution",
    subtitle: "EMF increases trait variance without directional shift",
    baseline: "Baseline",
    emfExposed: "EMF-exposed",
    meanUnchanged: "Mean unchanged",
    increasedTail: "Increased tail density",
    femaleTypical: "More female-typical",
    traitValue: "Trait value",
    maleTypical: "More male-typical",
    popFreq: "Population frequency",
    note: "The model predicts that EMF exposure widens the population distribution of sexually dimorphic traits without shifting the mean",
  },
  fi: {
    title: "Varianssimalli: populaatiojakauma",
    subtitle: "EMF lisää piirteen varianssia ilman suuntamuutosta",
    baseline: "Perusjakauma",
    emfExposed: "EMF-altistettu",
    meanUnchanged: "Keskiarvo muuttumaton",
    increasedTail: "Kasvanut häntätiheys",
    femaleTypical: "Naistyypillisempi",
    traitValue: "Piirteen arvo",
    maleTypical: "Miestyypillisempi",
    popFreq: "Populaatiofrekvenssi",
    note: "Malli ennustaa, että EMF-altistus leventää sukupuolispesifisten piirteiden populaatiojakaumaa siirtämättä keskiarvoa",
  },
  ja: {
    title: "分散モデル：集団分布",
    subtitle: "EMFは方向性シフトなしに形質の分散を増加させる",
    baseline: "ベースライン",
    emfExposed: "EMF曝露",
    meanUnchanged: "平均値不変",
    increasedTail: "尾部密度の増加",
    femaleTypical: "より女性典型的",
    traitValue: "形質値",
    maleTypical: "より男性典型的",
    popFreq: "集団頻度",
    note: "本モデルは、EMF曝露が平均値をシフトさせることなく、性的二型形質の集団分布を拡大させると予測する",
  },
  fr: {
    title: "Modèle de variance : distribution de la population",
    subtitle: "L'EMF augmente la variance des traits sans déplacement directionnel",
    baseline: "Référence",
    emfExposed: "Exposé aux EMF",
    meanUnchanged: "Moyenne inchangée",
    increasedTail: "Densité de queue accrue",
    femaleTypical: "Plus typiquement féminin",
    traitValue: "Valeur du trait",
    maleTypical: "Plus typiquement masculin",
    popFreq: "Fréquence de population",
    note: "Le modèle prédit que l'exposition aux EMF élargit la distribution de la population des traits sexuellement dimorphiques sans déplacer la moyenne",
  },
  ko: {
    title: "분산 모델: 집단 분포",
    subtitle: "EMF는 방향 이동 없이 형질 분산을 증가시킨다",
    baseline: "기준선",
    emfExposed: "EMF 노출",
    meanUnchanged: "평균 불변",
    increasedTail: "꼬리 밀도 증가",
    femaleTypical: "더 여성 전형적",
    traitValue: "형질 값",
    maleTypical: "더 남성 전형적",
    popFreq: "집단 빈도",
    note: "본 모델은 EMF 노출이 평균을 이동시키지 않으면서 성적 이형 형질의 집단 분포를 확대한다고 예측한다",
  },
};

const W = 700;
const H = 350;
const PLOT = { left: 75, right: 650, top: 55, bottom: 260 };
const X_MIN = -4.5;
const X_MAX = 4.5;
const X_RANGE = X_MAX - X_MIN;
const Y_MAX = 0.45;
const SIGMA_BASE = 1;
const SIGMA_EMF = 1.6;
const TAIL_BOUND = 2;
const SAMPLES = 120;

function pdf(x: number, s: number): number {
  return (1 / (s * Math.sqrt(2 * Math.PI))) * Math.exp(-(x * x) / (2 * s * s));
}

function sx(x: number): number {
  return PLOT.left + ((x - X_MIN) / X_RANGE) * (PLOT.right - PLOT.left);
}

function sy(y: number): number {
  return PLOT.bottom - (y / Y_MAX) * (PLOT.bottom - PLOT.top);
}

function curvePath(sigma: number): string {
  const parts: string[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const x = X_MIN + (i / SAMPLES) * X_RANGE;
    const cmd = i === 0 ? "M" : "L";
    parts.push(`${cmd}${sx(x).toFixed(1)},${sy(pdf(x, sigma)).toFixed(1)}`);
  }
  return parts.join(" ");
}

function areaPath(sigma: number, x0: number, x1: number): string {
  const n = Math.max(40, Math.round(SAMPLES * ((x1 - x0) / X_RANGE)));
  const parts: string[] = [`M${sx(x0).toFixed(1)},${PLOT.bottom}`];
  for (let i = 0; i <= n; i++) {
    const x = x0 + (i / n) * (x1 - x0);
    parts.push(`L${sx(x).toFixed(1)},${sy(pdf(x, sigma)).toFixed(1)}`);
  }
  parts.push(`L${sx(x1).toFixed(1)},${PLOT.bottom}Z`);
  return parts.join(" ");
}

export function VarianceModel({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);

  const basePath = curvePath(SIGMA_BASE);
  const emfCurve = curvePath(SIGMA_EMF);
  const emfFill = areaPath(SIGMA_EMF, X_MIN, X_MAX);
  const tailL = areaPath(SIGMA_EMF, X_MIN, -TAIL_BOUND);
  const tailR = areaPath(SIGMA_EMF, TAIL_BOUND, X_MAX);
  const meanX = sx(0);

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
          {/* Axes */}
          <line
            x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.right} y2={PLOT.bottom}
            stroke="currentColor" opacity={0.2}
          />
          <line
            x1={PLOT.left} y1={PLOT.top} x2={PLOT.left} y2={PLOT.bottom}
            stroke="currentColor" opacity={0.2}
          />

          {/* Y-axis label */}
          <text
            x={20}
            y={(PLOT.top + PLOT.bottom) / 2}
            textAnchor="middle"
            fontSize={10}
            fill="currentColor"
            opacity={0.55}
            transform={`rotate(-90,20,${(PLOT.top + PLOT.bottom) / 2})`}
          >
            {d.popFreq}
          </text>

          {/* X-axis labels */}
          <text
            x={PLOT.left + 20} y={PLOT.bottom + 30}
            fontSize={10} fill="currentColor" opacity={0.5}
          >
            {"← "}{d.femaleTypical}
          </text>
          <text
            x={meanX} y={PLOT.bottom + 30}
            textAnchor="middle" fontSize={10} fill="currentColor" opacity={0.5}
          >
            {d.traitValue}
          </text>
          <text
            x={PLOT.right - 20} y={PLOT.bottom + 30}
            textAnchor="end" fontSize={10} fill="currentColor" opacity={0.5}
          >
            {d.maleTypical}{" →"}
          </text>

          {/* EMF full curve fill */}
          <path d={emfFill} fill="#EF4444" opacity={0.06} />

          {/* Tail shading */}
          <path d={tailL} fill="#EF4444" opacity={0.15} />
          <path d={tailR} fill="#EF4444" opacity={0.15} />

          {/* Baseline curve (dashed, gray) */}
          <path
            d={basePath} fill="none" stroke="#94A3B8"
            strokeWidth={2} strokeDasharray="6,4" opacity={0.7}
          />

          {/* EMF-exposed curve (solid, red) */}
          <path
            d={emfCurve} fill="none" stroke="#EF4444"
            strokeWidth={2.5} opacity={0.85}
          />

          {/* Mean line (vertical dashed) */}
          <line
            x1={meanX} y1={PLOT.top} x2={meanX} y2={PLOT.bottom}
            stroke="currentColor" opacity={0.12} strokeDasharray="4,3"
          />

          {/* Mean unchanged annotation */}
          <text
            x={meanX} y={PLOT.top - 14}
            textAnchor="middle" fontSize={10} fontWeight={600}
            fill="currentColor" opacity={0.65}
          >
            {d.meanUnchanged}
          </text>
          <line
            x1={meanX} y1={PLOT.top - 8} x2={meanX} y2={PLOT.top}
            stroke="currentColor" opacity={0.3} strokeWidth={1}
            markerEnd="url(#vm-arrow)"
          />

          {/* Increased tail density labels */}
          <text
            x={sx(-3)} y={sy(pdf(-2, SIGMA_EMF)) - 14}
            textAnchor="middle" fontSize={9} fill="#EF4444"
            fontWeight={500} opacity={0.8}
          >
            {d.increasedTail}
          </text>
          <line
            x1={sx(-3)} y1={sy(pdf(-2, SIGMA_EMF)) - 10}
            x2={sx(-2.6)} y2={sy(pdf(-2.6, SIGMA_EMF)) + 2}
            stroke="#EF4444" opacity={0.4} strokeWidth={1}
            markerEnd="url(#vm-tail-arrow)"
          />

          <text
            x={sx(3)} y={sy(pdf(2, SIGMA_EMF)) - 14}
            textAnchor="middle" fontSize={9} fill="#EF4444"
            fontWeight={500} opacity={0.8}
          >
            {d.increasedTail}
          </text>
          <line
            x1={sx(3)} y1={sy(pdf(2, SIGMA_EMF)) - 10}
            x2={sx(2.6)} y2={sy(pdf(2.6, SIGMA_EMF)) + 2}
            stroke="#EF4444" opacity={0.4} strokeWidth={1}
            markerEnd="url(#vm-tail-arrow)"
          />

          {/* Legend */}
          <g>
            <line
              x1={PLOT.right - 175} y1={PLOT.top + 10}
              x2={PLOT.right - 145} y2={PLOT.top + 10}
              stroke="#94A3B8" strokeWidth={2} strokeDasharray="6,4" opacity={0.7}
            />
            <text
              x={PLOT.right - 140} y={PLOT.top + 14}
              fontSize={10} fill="currentColor" opacity={0.65}
            >
              {d.baseline} ({"σ"}=1)
            </text>

            <line
              x1={PLOT.right - 175} y1={PLOT.top + 28}
              x2={PLOT.right - 145} y2={PLOT.top + 28}
              stroke="#EF4444" strokeWidth={2.5} opacity={0.85}
            />
            <text
              x={PLOT.right - 140} y={PLOT.top + 32}
              fontSize={10} fill="#EF4444" opacity={0.85}
            >
              {d.emfExposed} ({"σ"}=1.6)
            </text>
          </g>

          {/* Arrow marker definitions */}
          <defs>
            <marker
              id="vm-arrow" markerWidth="8" markerHeight="6"
              refX="4" refY="3" orient="auto"
            >
              <path d="M0,0 L8,3 L0,6Z" fill="currentColor" opacity={0.3} />
            </marker>
            <marker
              id="vm-tail-arrow" markerWidth="6" markerHeight="5"
              refX="3" refY="2.5" orient="auto"
            >
              <path d="M0,0 L6,2.5 L0,5Z" fill="#EF4444" opacity={0.4} />
            </marker>
          </defs>
        </svg>
      </div>

      <p className="text-xs text-foreground-muted italic mt-3 max-w-[700px]">{d.note}</p>
    </div>
  );
}
