"use client";

import { useState } from "react";
import { MODULOME_LAYERS } from "@/lib/modulome/layers";
import { pickCopy, pickSuffix } from "@/lib/i18n";

const LAYER_COLORS: Record<string, string> = {
  molecular: "#FFC107",
  ion_channel: "#FF9800",
  mitochondrial: "#F44336",
  membrane_barrier: "#E91E63",
  redox_defense: "#4CAF50",
  cell_type: "#9C27B0",
  organ: "#3F51B5",
  autonomic: "#2196F3",
  endocrine: "#03A9F4",
  circadian: "#00BCD4",
  individual: "#009688",
  population: "#795548",
};

const COPY = {
  en: {
    title: "EMF Modulome: Twelve Layers of Biological Susceptibility",
    lead: "The modulome maps electromagnetic susceptibility from molecular spin physics to population-level patterns. Each layer modulates χ — the dimensionless coupling between external EMF and biological function. Twelve layers, ten target organs, four independent routes to fertility decline.",
    layer: "Layer",
    chiModulator: "χ modulator",
    keyComponents: "Key components",
    integration: "Integration",
    clickHint: "Click a layer to see details",
    note: "Epistemic note: Each layer's evidence is marked independently. The modulome as a unified framework is a BERM-specific synthesis [C] — the individual components carry their own evidence levels.",
  },
  fi: {
    title: "EMF-modulomi: kaksitoista biologisen herkkyyden tasoa",
    lead: "Modulomi kartoittaa sähkömagneettista herkkyyttä molekulaarisesta spinfysiikasta populaatiotason malleihin. Kukin kerros moduloi χ:ä — dimensiotonta kytkentäkerrointa ulkoisen EMF:n ja biologisen toiminnan välillä. Kaksitoista kerrosta, kymmenen kohde-elintä, neljä itsenäistä reittiä fertiliteetin laskuun.",
    layer: "Kerros",
    chiModulator: "χ-modulaattori",
    keyComponents: "Avainkomponentit",
    integration: "Integraatio",
    clickHint: "Klikkaa kerrosta nähdäksesi yksityiskohdat",
    note: "Episteeminen huomautus: Jokaisen kerroksen evidenssi on merkitty itsenäisesti. Modulomi yhtenäisenä viitekehyksenä on BERM-spesifinen synteesi [C] — yksittäiset komponentit kantavat omat evidenssitasonsa.",
  },
  ja: {
    title: "EMF Modulome: 生体感受性の12層",
    lead: "Modulomeは分子スピン物理から集団レベルのパターンまで電磁感受性をマッピングします。各層はχ（外部EMFと生体機能間の無次元結合係数）を変調します。12の層、10の標的臓器、受胎能低下への4つの独立経路。",
    layer: "層",
    chiModulator: "χ変調因子",
    keyComponents: "主要構成要素",
    integration: "統合",
    clickHint: "詳細を表示するには層をクリック",
    note: "認識論的注記：各層のエビデンスは独立して評価されています。統合的枠組みとしてのModulomeはBERM固有の統合 [C] です — 個々の構成要素はそれぞれ独自のエビデンスレベルを持ちます。",
  },
  fr: {
    title: "EMF Modulome : douze couches de susceptibilité biologique",
    lead: "Le modulome cartographie la susceptibilité électromagnétique de la physique du spin moléculaire aux schémas populationnels. Chaque couche module χ — le coefficient de couplage adimensionnel entre l'EMF externe et la fonction biologique. Douze couches, dix organes cibles, quatre voies indépendantes de déclin de la fertilité.",
    layer: "Couche",
    chiModulator: "Modulateur χ",
    keyComponents: "Composants clés",
    integration: "Intégration",
    clickHint: "Cliquez sur une couche pour voir les détails",
    note: "Note épistémique : l'évidence de chaque couche est marquée indépendamment. Le modulome en tant que cadre unifié est une synthèse spécifique à BERM [C] — les composants individuels portent leurs propres niveaux d'évidence.",
  },
  ko: {
    title: "EMF Modulome: 생물학적 감수성의 12개 층",
    lead: "Modulome은 분자 스핀 물리학에서 집단 수준 패턴까지 전자기 감수성을 매핑합니다. 각 층은 χ(외부 EMF와 생물학적 기능 사이의 무차원 결합 계수)를 조절합니다. 12개의 층, 10개의 표적 장기, 수태능 감소로 향하는 4개의 독립 경로.",
    layer: "층",
    chiModulator: "χ 조절인자",
    keyComponents: "주요 구성요소",
    integration: "통합",
    clickHint: "세부 정보를 보려면 층을 클릭하세요",
    note: "인식론적 주석: 각 층의 근거는 독립적으로 표시되어 있습니다. 통합 프레임워크로서의 Modulome은 BERM 고유의 종합 [C]입니다 — 개별 구성요소는 각자의 근거 수준을 갖습니다.",
  },
};

const SVG_W = 700;
const LAYER_H = 30;
const GAP = 3;
const PAD_L = 50;
const PAD_R = 14;
const PAD_T = 10;
const BAR_W = SVG_W - PAD_L - PAD_R;

const layers = [...MODULOME_LAYERS].reverse();

export function ModulomeLayers({ locale }: { locale: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const d = pickCopy(COPY, locale);

  const totalH = PAD_T + layers.length * (LAYER_H + GAP) + 20;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
      <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">
        {d.lead}
      </p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${SVG_W} ${totalH}`}
          className="w-full max-w-[700px]"
          style={{ minWidth: 480 }}
          role="img"
          aria-label={d.title}
        >
          {layers.map((layer, i) => {
            const y = PAD_T + i * (LAYER_H + GAP);
            const isExpanded = expanded === layer.id;
            const color = LAYER_COLORS[layer.id] ?? "#607D8B";
            const name = pickSuffix(layer, "name", locale);
            const chiMod = pickSuffix(layer, "chiModulator", locale);

            return (
              <g
                key={layer.id}
                onClick={() => setExpanded(isExpanded ? null : layer.id)}
                className="cursor-pointer"
              >
                <rect
                  x={PAD_L}
                  y={y}
                  width={BAR_W}
                  height={LAYER_H}
                  rx={5}
                  fill={color}
                  opacity={isExpanded ? 0.95 : 0.7}
                  stroke={isExpanded ? "currentColor" : color}
                  strokeWidth={isExpanded ? 2 : 1}
                />
                <text
                  x={PAD_L - 8}
                  y={y + LAYER_H / 2 + 5}
                  textAnchor="end"
                  fontSize={12}
                  fontWeight={700}
                  fill="currentColor"
                  opacity={0.5}
                >
                  {layer.number}
                </text>
                <text
                  x={PAD_L + 12}
                  y={y + LAYER_H / 2 + 1}
                  fontSize={11}
                  fontWeight={600}
                  fill="#fff"
                  dominantBaseline="middle"
                >
                  {name}
                </text>
                <text
                  x={PAD_L + BAR_W - 12}
                  y={y + LAYER_H / 2 + 1}
                  textAnchor="end"
                  fontSize={8}
                  fill="#fff"
                  opacity={0.75}
                  dominantBaseline="middle"
                >
                  {chiMod.length > 45 ? chiMod.slice(0, 42) + "…" : chiMod}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {expanded ? (
        (() => {
          const layer = MODULOME_LAYERS.find((l) => l.id === expanded);
          if (!layer) return null;
          const color = LAYER_COLORS[layer.id] ?? "#607D8B";
          return (
            <div
              className="mt-3 rounded-xl border-2 p-5 max-w-[700px] transition-all"
              style={{ borderColor: color }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white text-sm font-bold"
                  style={{ background: color }}
                >
                  {layer.number}
                </span>
                <span className="text-sm font-semibold">
                  {d.layer} {layer.number}: {pickSuffix(layer, "name", locale)}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 text-xs mb-3">
                <div className="rounded-lg border border-card-border bg-card-bg p-3">
                  <span className="font-semibold text-foreground">{d.chiModulator}</span>
                  <p className="text-foreground-muted mt-0.5">
                    {pickSuffix(layer, "chiModulator", locale)}
                  </p>
                </div>
                <div className="rounded-lg border border-card-border bg-card-bg p-3">
                  <span className="font-semibold text-foreground">{d.keyComponents}</span>
                  <p className="text-foreground-muted mt-0.5">
                    {pickSuffix(layer, "keyComponents", locale)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-background-secondary p-3">
                <span className="text-xs font-semibold text-foreground">{d.integration}</span>
                <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                  {pickSuffix(layer, "integration", locale)}
                </p>
              </div>
            </div>
          );
        })()
      ) : (
        <p className="text-xs text-foreground-muted mt-2 max-w-[700px]">{d.clickHint}</p>
      )}

      <p className="text-xs text-foreground-muted italic mt-4 max-w-[700px] leading-relaxed">
        {d.note}
      </p>
    </div>
  );
}
