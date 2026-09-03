"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import type { ChainNode, EpistemicLevel } from "@/lib/types";
import {
  getFieldStateCausalGraph,
} from "@/lib/causalChainV2Data";
import { CHAIN_EPISTEMIC_COLORS as EPISTEMIC_COLORS } from "@/lib/epistemicConstants";
import { DetailPanel } from "./DetailPanel";
import { pickCopy } from "@/lib/i18n";

const COPY: Record<string, {
  ariaLabel: string;
  clickHint: string;
  levelTitles: Record<number, string>;
  legend: [EpistemicLevel, string][];
}> = {
  en: {
    ariaLabel: "BERM v17 causal diagram",
    clickHint: "→ click for details",
    levelTitles: {
      1: "Optional measurements",
      2: "Conditional L2 operator · tissue kernel open",
      3: "Biological intermediates",
      4: "BTB and other barrier states",
      5: "Reproductive states",
      6: "Couple and demographic context",
      7: "Age-specific fertility",
      8: "Demographic endpoint",
    },
    legend: [
      ["E", "Observed endpoint"],
      ["M|C", "Mechanism + association"],
      ["M", "Mechanistic intermediate"],
      ["C", "Observed association"],
      ["L*", "Theory / measurement premise"],
    ],
  },
  fi: {
    ariaLabel: "BERM v17-kausaalikaavio",
    clickHint: "→ klikkaa tiedot",
    levelTitles: {
      1: "Valinnaiset mittaukset",
      2: "Ehdollinen L2-operaattori · kudosydin avoin",
      3: "Biologiset välitilat",
      4: "BTB ja muut estetilat",
      5: "Lisääntymistilat",
      6: "Pari- ja demografinen konteksti",
      7: "Ikäkohtainen hedelmällisyys",
      8: "Demografinen päätepiste",
    },
    legend: [
      ["E", "Havaittu päätepiste"],
      ["M|C", "Mekanismi + assosiaatio"],
      ["M", "Mekanistinen välitila"],
      ["C", "Havaittu assosiaatio"],
      ["L*", "Teoria- / mittauspremissi"],
    ],
  },
  ja: {
    ariaLabel: "BERM v17 因果図",
    clickHint: "→ クリックで詳細",
    levelTitles: {
      1: "任意の測定",
      2: "条件付きL2演算子・組織カーネル未校正",
      3: "生物学的中間体",
      4: "BTBおよび他のバリア状態",
      5: "生殖状態",
      6: "カップルおよび人口統計的文脈",
      7: "年齢別出生率",
      8: "人口統計的エンドポイント",
    },
    legend: [
      ["E", "観察されたエンドポイント"],
      ["M|C", "メカニズム + 関連性"],
      ["M", "メカニズム的中間体"],
      ["C", "観察された関連性"],
      ["L*", "理論 / 測定前提"],
    ],
  },
  fr: {
    ariaLabel: "Diagramme causal BERM v17",
    clickHint: "→ cliquer pour détails",
    levelTitles: {
      1: "Mesures facultatives",
      2: "Opérateur L2 conditionnel · noyau tissulaire ouvert",
      3: "Intermédiaires biologiques",
      4: "BTB et autres états de barrière",
      5: "États reproductifs",
      6: "Contexte du couple et démographique",
      7: "Fécondité par âge",
      8: "Point final démographique",
    },
    legend: [
      ["E", "Point final observé"],
      ["M|C", "Mécanisme + association"],
      ["M", "Intermédiaire mécanistique"],
      ["C", "Association observée"],
      ["L*", "Prémisse théorique / de mesure"],
    ],
  },
  ko: {
    ariaLabel: "BERM v17 인과 다이어그램",
    clickHint: "→ 클릭하여 상세 보기",
    levelTitles: {
      1: "선택적 측정",
      2: "조건부 L2 연산자 · 조직 커널 미보정",
      3: "생물학적 중간체",
      4: "BTB 및 기타 장벽 상태",
      5: "생식 상태",
      6: "커플 및 인구통계적 맥락",
      7: "연령별 출산율",
      8: "인구통계적 종점",
    },
    legend: [
      ["E", "관찰된 종점"],
      ["M|C", "메커니즘 + 연관성"],
      ["M", "메커니즘적 중간체"],
      ["C", "관찰된 연관성"],
      ["L*", "이론 / 측정 전제"],
    ],
  },
};

const NODE_H = 72;
const NODE_RX = 12;
const LEVEL_GAP = 52;
const MIN_CANVAS_W = 960;
const LEVEL_LABEL_W = 210;
const LEVEL_TITLE_X = 52;
const FEEDBACK_MARGIN = 44;
const NODE_GAP = 14;
const MAX_NODE_W = 240;
const MAX_PER_ROW = 4;
const ROW_INNER_GAP = 10;
const BAND_PAD_Y = 14;
const BAND_PAD_X = 8;
const RIGHT_PAD = 16;

function wrapLevelTitle(title: string, maxCharacters = 20): string[] {
  const words = title.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxCharacters || !current) {
      current = next;
      continue;
    }

    lines.push(current);
    current = word;
  }

  if (current) lines.push(current);
  return lines;
}

const EPISTEMIC_LABELS: Record<string, string> = {
  E: "E",
  "M|C": "M|C",
  M: "M",
  C: "C",
  "L*": "L*",
  L: "L",
};

interface LayoutNode extends ChainNode {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface LevelBand {
  level: number;
  title: string;
  top: number;
  bottom: number;
  color: string;
}

function computeLayout(
  nodes: ChainNode[],
  canvasW: number,
  levelTitles: Record<number, string>,
): { layoutNodes: LayoutNode[]; canvasH: number; actualW: number; bands: LevelBand[] } {
  const levels = new Map<number, ChainNode[]>();
  for (const n of nodes) {
    if (!levels.has(n.level)) levels.set(n.level, []);
    levels.get(n.level)!.push(n);
  }

  const sortedLevels = [...levels.keys()].sort((a, b) => a - b);
  const layoutNodes: LayoutNode[] = [];
  const bands: LevelBand[] = [];
  const leftEdge = LEVEL_LABEL_W + FEEDBACK_MARGIN;
  const usableW = canvasW - leftEdge - RIGHT_PAD;
  let currentY = 24;
  let maxRight = canvasW;

  for (const lvl of sortedLevels) {
    const nodesInLevel = levels.get(lvl)!;
    const count = nodesInLevel.length;
    const h = NODE_H;
    const numRows = Math.ceil(count / MAX_PER_ROW);
    const bandTop = currentY - BAND_PAD_Y;

    const colorCounts = new Map<string, number>();
    for (const n of nodesInLevel) {
      colorCounts.set(n.epistemicLevel, (colorCounts.get(n.epistemicLevel) ?? 0) + 1);
    }
    let dominant: EpistemicLevel = nodesInLevel[0].epistemicLevel;
    let maxCount = 0;
    for (const [lvlKey, cnt] of colorCounts) {
      if (cnt > maxCount) { dominant = lvlKey as EpistemicLevel; maxCount = cnt; }
    }

    for (let row = 0; row < numRows; row++) {
      const rowStart = row * MAX_PER_ROW;
      const rowEnd = Math.min(rowStart + MAX_PER_ROW, count);
      const rowCount = rowEnd - rowStart;
      const totalGaps = (rowCount - 1) * NODE_GAP;
      const nodeW = Math.min(MAX_NODE_W, (usableW - totalGaps) / rowCount);
      const rowW = rowCount * nodeW + totalGaps;
      const startX = Math.max(leftEdge, leftEdge + (usableW - rowW) / 2);

      for (let i = 0; i < rowCount; i++) {
        const nx = startX + i * (nodeW + NODE_GAP);
        layoutNodes.push({
          ...nodesInLevel[rowStart + i],
          x: nx,
          y: currentY,
          w: nodeW,
          h,
        });
        maxRight = Math.max(maxRight, nx + nodeW + RIGHT_PAD);
      }
      currentY += h + (row < numRows - 1 ? ROW_INNER_GAP : 0);
    }

    const bandBottom = currentY + BAND_PAD_Y;
    bands.push({
      level: lvl,
      title: levelTitles[lvl] ?? `Level ${lvl}`,
      top: bandTop,
      bottom: bandBottom,
      color: EPISTEMIC_COLORS[dominant] ?? "#6B7280",
    });
    currentY = bandBottom + LEVEL_GAP;
  }

  return { layoutNodes, canvasH: currentY + 40, actualW: maxRight, bands };
}

function edgePath(from: LayoutNode, to: LayoutNode, wrapLeft: boolean): string {
  if (wrapLeft) {
    const fy = from.y + from.h / 2;
    const ty = to.y + to.h / 2;
    const x = LEVEL_LABEL_W + FEEDBACK_MARGIN / 2;
    return `M ${from.x} ${fy} L ${x} ${fy} L ${x} ${ty} L ${to.x} ${ty}`;
  }

  if (from.level === to.level) {
    const x1 = from.x + from.w;
    const y1 = from.y + from.h / 2;
    const x2 = to.x;
    const y2 = to.y + to.h / 2;
    const cpx = (x1 + x2) / 2;
    return `M ${x1} ${y1} Q ${cpx} ${y1} ${x2} ${y2}`;
  }

  const x1 = from.x + from.w / 2;
  const y1 = from.y + from.h;
  const x2 = to.x + to.w / 2;
  const y2 = to.y;
  const dy = y2 - y1;
  return `M ${x1} ${y1} C ${x1} ${y1 + dy * 0.35} ${x2} ${y2 - dy * 0.35} ${x2} ${y2}`;
}

export default function CausalChainDiagram({ locale = "en" }: { locale?: string }) {
  const graphLocale: "en" | "fi" = locale === "fi" ? "fi" : "en";
  const d = pickCopy(COPY, locale);
  const { nodes, edges } = useMemo(() => getFieldStateCausalGraph(graphLocale), [graphLocale]);
  const [selectedNode, setSelectedNode] = useState<ChainNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(MIN_CANVAS_W);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w && w > 0) setContainerW(Math.max(MIN_CANVAS_W, Math.min(1600, w)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const canvasW = containerW;
  const { layoutNodes, canvasH, actualW, bands } = useMemo(
    () => computeLayout(nodes, canvasW, d.levelTitles),
    [canvasW, d.levelTitles, nodes],
  );
  const viewW = Math.max(canvasW, actualW);

  const nodeMap = useMemo(() => {
    const m = new Map<string, LayoutNode>();
    for (const n of layoutNodes) m.set(n.id, n);
    return m;
  }, [layoutNodes]);

  const connectedEdges = useMemo(() => {
    if (!hoveredNode) return new Set<number>();
    const s = new Set<number>();
    edges.forEach((e, i) => {
      if (e.from === hoveredNode || e.to === hoveredNode) s.add(i);
    });
    return s;
  }, [edges, hoveredNode]);

  const handleNodeClick = useCallback((node: ChainNode) => {
    setSelectedNode(node);
  }, []);

  return (
    <>
      <div ref={containerRef} className="chart-scroll w-full">
        <svg
          className="chart-svg"
          viewBox={`0 0 ${viewW} ${canvasH}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={d.ariaLabel}
          style={{ width: `${viewW}px`, minWidth: `${MIN_CANVAS_W}px`, height: "auto" }}
        >
          <defs>
            <marker
              id="chain-arrow"
              viewBox="0 0 10 7"
              refX="10"
              refY="3.5"
              markerWidth="8"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 3.5 L 0 7 z" fill="var(--foreground-muted)" />
            </marker>
            {Object.entries(EPISTEMIC_COLORS).map(([key, color]) => (
              <marker
                key={key}
                id={`chain-arrow-${key.replace("|", "_")}`}
                viewBox="0 0 10 7"
                refX="10"
                refY="3.5"
                markerWidth="8"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 3.5 L 0 7 z" fill={color} />
              </marker>
            ))}
          </defs>

          {/* Background */}
          <rect
            x="0"
            y="0"
            width={viewW}
            height={canvasH}
            fill="var(--card-bg)"
            rx="12"
          />

          {/* Level bands */}
          {bands.map((band) => {
            const titleLines = wrapLevelTitle(band.title);
            const titleLineHeight = 15;
            const titleStartY =
              band.top +
              (band.bottom - band.top) / 2 -
              ((titleLines.length - 1) * titleLineHeight) / 2;

            return (
              <g key={`band-${band.level}`}>
                {/* Band background */}
                <rect
                  x={LEVEL_LABEL_W + FEEDBACK_MARGIN - BAND_PAD_X}
                  y={band.top}
                  width={viewW - LEVEL_LABEL_W - FEEDBACK_MARGIN + BAND_PAD_X - 12}
                  height={band.bottom - band.top}
                  rx="8"
                  fill={`${band.color}08`}
                  stroke={`${band.color}18`}
                  strokeWidth="1"
                />
                {/* Left accent bar */}
                <rect
                  x={LEVEL_LABEL_W + FEEDBACK_MARGIN - BAND_PAD_X}
                  y={band.top}
                  width="4"
                  height={band.bottom - band.top}
                  rx="2"
                  fill={`${band.color}30`}
                />
                {/* Level number */}
                <text
                  x={22}
                  y={band.top + (band.bottom - band.top) / 2}
                  fill={`${band.color}90`}
                  fontSize="22"
                  fontWeight="800"
                  dominantBaseline="middle"
                  fontFamily="ui-monospace, monospace"
                >
                  {band.level}
                </text>
                {/* Level title */}
                <text
                  x={LEVEL_TITLE_X}
                  y={titleStartY}
                  fill="var(--foreground-muted)"
                  fontSize="12.5"
                  fontWeight="600"
                  dominantBaseline="middle"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  aria-label={band.title}
                >
                  {titleLines.map((line, lineIndex) => (
                    <tspan
                      key={`${band.level}-${lineIndex}`}
                      x={LEVEL_TITLE_X}
                      dy={lineIndex === 0 ? 0 : titleLineHeight}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}

          {/* Edges */}
          {edges.map((edge, edgeIdx) => {
            const from = nodeMap.get(edge.from);
            const to = nodeMap.get(edge.to);
            if (!from || !to) return null;

            const wrapLeft =
              (edge.from === "device_adoption" && edge.to === "ambient") ||
              from.level > to.level;
            const color = EPISTEMIC_COLORS[edge.epistemicLevel];
            const isConnected = connectedEdges.has(edgeIdx);
            const isPrimary = edge.priority === "primary";
            const markerId = `chain-arrow-${edge.epistemicLevel.replace("|", "_")}`;

            let opacity: number;
            let strokeW: number;
            let strokeColor: string;

            if (hoveredNode) {
              if (isConnected) {
                opacity = 1;
                strokeW = 2.5;
                strokeColor = color;
              } else {
                opacity = 0.08;
                strokeW = 1;
                strokeColor = "var(--foreground-muted)";
              }
            } else if (isPrimary) {
              opacity = 0.7;
              strokeW = 2;
              strokeColor = color;
            } else {
              opacity = 0.18;
              strokeW = 1;
              strokeColor = "var(--foreground-muted)";
            }

            return (
              <g key={`${edge.from}-${edge.to}`} opacity={opacity}>
                <path
                  d={edgePath(from, to, wrapLeft)}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  strokeDasharray={wrapLeft ? "8 4" : undefined}
                  markerEnd={
                    isConnected || isPrimary
                      ? `url(#${markerId})`
                      : "url(#chain-arrow)"
                  }
                />
                {edge.label && !wrapLeft && isConnected && (
                  <text
                    x={
                      from.level === to.level
                        ? (from.x + from.w + to.x) / 2
                        : (from.x + from.w / 2 + to.x + to.w / 2) / 2
                    }
                    y={
                      from.level === to.level
                        ? from.y + from.h / 2 - 10
                        : (from.y + from.h + to.y) / 2
                    }
                    fill={color}
                    fontSize={11}
                    fontWeight="500"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Node clip paths */}
          {layoutNodes.map((n) => (
            <clipPath key={`clip-${n.id}`} id={`clip-${n.id}`}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={NODE_RX} />
            </clipPath>
          ))}

          {/* Nodes */}
          {layoutNodes.map((n) => {
            const color = EPISTEMIC_COLORS[n.epistemicLevel];
            const isHovered = hoveredNode === n.id;
            const isSelected = selectedNode?.id === n.id;
            const textW = n.w - 48;

            return (
              <g
                key={n.id}
                tabIndex={0}
                role="button"
                style={{ cursor: "pointer" }}
                onClick={() => handleNodeClick(n)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleNodeClick(n); } }}
                onMouseEnter={() => setHoveredNode(n.id)}
                onMouseLeave={() => setHoveredNode(null)}
                opacity={hoveredNode && !isHovered && ![...connectedEdges].some(i => edges[i]?.from === n.id || edges[i]?.to === n.id) ? 0.4 : 1}
              >
                {/* Node background */}
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx={NODE_RX}
                  ry={NODE_RX}
                  fill={`${color}${isHovered ? "18" : "0C"}`}
                  stroke={color}
                  strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 1.5}
                />
                {/* Epistemic badge */}
                <rect
                  x={n.x + n.w - 36}
                  y={n.y + 8}
                  width={28}
                  height={18}
                  rx={4}
                  fill={`${color}25`}
                />
                <text
                  x={n.x + n.w - 22}
                  y={n.y + 17}
                  fill={color}
                  fontSize={11}
                  fontWeight="700"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="ui-monospace, monospace"
                >
                  {EPISTEMIC_LABELS[n.epistemicLevel] ?? n.epistemicLevel}
                </text>
                {/* Label — clipped to node bounds */}
                <g clipPath={`url(#clip-${n.id})`}>
                  <text
                    x={n.x + 12}
                    y={n.y + (n.sublabel ? 24 : n.h / 2 + 1)}
                    fill="var(--foreground)"
                    fontSize={13}
                    fontWeight="600"
                    dominantBaseline="middle"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    textLength={n.label.length * 7.5 > textW ? textW : undefined}
                    lengthAdjust="spacingAndGlyphs"
                  >
                    {n.label}
                  </text>
                  {/* Sublabel */}
                  {n.sublabel && (
                    <text
                      x={n.x + 12}
                      y={n.y + 44}
                      fill="var(--foreground-muted)"
                      fontSize={11}
                      dominantBaseline="middle"
                      fontFamily="ui-monospace, SFMono-Regular, monospace"
                      textLength={n.sublabel.length * 6 > textW ? textW : undefined}
                      lengthAdjust="spacingAndGlyphs"
                    >
                      {n.sublabel}
                    </text>
                  )}
                  {/* Click hint on hover */}
                  {isHovered && (
                    <text
                      x={n.x + 12}
                      y={n.y + n.h - 8}
                      fill="var(--foreground-muted)"
                      fontSize={11}
                      dominantBaseline="auto"
                      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    >
                      {d.clickHint}
                    </text>
                  )}
                </g>
              </g>
            );
          })}

        </svg>
      </div>

      <ul className="chart-legend mt-3">
        {d.legend.map(([level, label]) => {
          const color = EPISTEMIC_COLORS[level];
          return (
            <li key={level} className="chart-key">
              <span
                aria-hidden="true"
                className="inline-flex h-4 min-w-7 items-center justify-center rounded px-1 font-mono text-[10px] font-bold"
                style={{
                  backgroundColor: `${color}25`,
                  border: `1px solid ${color}`,
                  color,
                }}
              >
                {level}
              </span>
              <span>{label}</span>
            </li>
          );
        })}
      </ul>

      {selectedNode && (
        <DetailPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          locale={locale}
        />
      )}
    </>
  );
}
