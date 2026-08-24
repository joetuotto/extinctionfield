"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import type { ChainNode, EpistemicLevel } from "@/lib/types";
import {
  getFieldStateCausalGraph,
} from "@/lib/causalChainV2Data";
import {
  EPISTEMIC_COLORS,
} from "@/lib/causalChainData";
import { DetailPanel } from "./DetailPanel";

type Locale = "en" | "fi";

const COPY: Record<Locale, {
  ariaLabel: string;
  clickHint: string;
  levelTitles: Record<number, string>;
  legend: [EpistemicLevel, string][];
}> = {
  en: {
    ariaLabel: "BERM v17 causal diagram",
    clickHint: "→ click for details",
    levelTitles: {
      1: "Field state",
      2: "Biological intermediates",
      3: "BTB and other barrier states",
      4: "Reproductive states",
      5: "Couple and demographic context",
      6: "Age-specific fertility",
      7: "Demographic endpoint",
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
      1: "Kenttätila",
      2: "Biologiset välitilat",
      3: "BTB ja muut estetilat",
      4: "Lisääntymistilat",
      5: "Pari- ja demografinen konteksti",
      6: "Ikäkohtainen hedelmällisyys",
      7: "Demografinen päätepiste",
    },
    legend: [
      ["E", "Havaittu päätepiste"],
      ["M|C", "Mekanismi + assosiaatio"],
      ["M", "Mekanistinen välitila"],
      ["C", "Havaittu assosiaatio"],
      ["L*", "Teoria- / mittauspremissi"],
    ],
  },
};

const NODE_H = 72;
const NODE_RX = 12;
const LEVEL_GAP = 52;
const LEVEL_LABEL_W = 100;
const FEEDBACK_MARGIN = 44;
const NODE_GAP = 14;
const MAX_NODE_W = 240;
const MAX_PER_ROW = 4;
const ROW_INNER_GAP = 10;
const BAND_PAD_Y = 14;
const BAND_PAD_X = 8;
const RIGHT_PAD = 16;

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
    const x = FEEDBACK_MARGIN / 2 + 10;
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

export default function CausalChainDiagram({ locale = "en" }: { locale?: Locale }) {
  const d = COPY[locale];
  const { nodes, edges } = useMemo(() => getFieldStateCausalGraph(locale), [locale]);
  const [selectedNode, setSelectedNode] = useState<ChainNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(900);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w && w > 0) setContainerW(Math.max(600, Math.min(1600, w)));
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
      <div ref={containerRef} className="w-full">
        <svg
          viewBox={`0 0 ${viewW} ${canvasH}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={d.ariaLabel}
          style={{ width: "100%", height: "auto" }}
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
          {bands.map((band) => (
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
                y={band.top + (band.bottom - band.top) / 2 - 8}
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
                x={22}
                y={band.top + (band.bottom - band.top) / 2 + 12}
                fill="var(--foreground-muted)"
                fontSize="11"
                fontWeight="600"
                dominantBaseline="middle"
                fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              >
                {band.title}
              </text>
            </g>
          ))}

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
                    fontSize={10}
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
                style={{ cursor: "pointer" }}
                onClick={() => handleNodeClick(n)}
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
                  fontSize={9}
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
                    fontSize={n.label.length > 18 ? 12 : 13}
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
                      fontSize={10}
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
                      fontSize={9}
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

          {/* Legend */}
          {(() => {
            const items = d.legend;
            const legendY = canvasH - 24;
            const legendX = LEVEL_LABEL_W + FEEDBACK_MARGIN;
            const spacing = (viewW - legendX - 20) / items.length;
            return items.map(([lvl, lbl], i) => {
              const c = EPISTEMIC_COLORS[lvl];
              return (
                <g key={lvl} transform={`translate(${legendX + i * spacing}, ${legendY})`}>
                  <rect x={0} y={-7} width={14} height={14} rx={3} fill={`${c}25`} stroke={c} strokeWidth={1} />
                  <text x={8} y={0} fill={c} fontSize={8} fontWeight="700" textAnchor="middle" dominantBaseline="middle" fontFamily="ui-monospace, monospace">
                    {lvl}
                  </text>
                  <text x={20} y={1} fill="var(--foreground-muted)" fontSize={9} fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" dominantBaseline="middle" textLength={Math.min(lbl.length * 5, spacing - 26)} lengthAdjust="spacingAndGlyphs">
                    {lbl}
                  </text>
                </g>
              );
            });
          })()}
        </svg>
      </div>

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
