"use client";

import { useState, useMemo, useCallback } from "react";
import type { ChainNode } from "@/lib/types";
import {
  NODES,
  EDGES,
  EPISTEMIC_COLORS,
  LEVEL_TITLES,
} from "@/lib/causalChainData";
import { DetailPanel } from "./DetailPanel";

const NODE_H = 52;
const NODE_H_EXPANDED = 88;
const NODE_H_COLLAPSED = 34;
const NODE_RX = 10;
const LEVEL_GAP = 28;
const LEVEL_GAP_COLLAPSED = 14;
const LEVEL_LABEL_W = 36;
const FEEDBACK_MARGIN = 50;
const NODE_GAP = 12;
const MAX_NODE_W = 170;
const MIN_NODE_W = 130;

interface LayoutNode extends ChainNode {
  x: number;
  y: number;
  w: number;
  h: number;
  isExpanded: boolean;
  isCollapsed: boolean;
}

function computeLayout(
  nodes: ChainNode[],
  canvasW: number,
  expandedLevel: number | null
): { layoutNodes: LayoutNode[]; canvasH: number } {
  const levels = new Map<number, ChainNode[]>();
  for (const n of nodes) {
    if (!levels.has(n.level)) levels.set(n.level, []);
    levels.get(n.level)!.push(n);
  }

  const sortedLevels = [...levels.keys()].sort((a, b) => a - b);
  const layoutNodes: LayoutNode[] = [];
  const usableW = canvasW - LEVEL_LABEL_W - FEEDBACK_MARGIN;
  let currentY = 20;

  for (const lvl of sortedLevels) {
    const nodesInLevel = levels.get(lvl)!;
    const count = nodesInLevel.length;
    const totalGaps = (count - 1) * NODE_GAP;
    const nodeW = Math.max(
      MIN_NODE_W,
      Math.min(MAX_NODE_W, (usableW - totalGaps) / count)
    );
    const rowW = count * nodeW + totalGaps;
    const startX = LEVEL_LABEL_W + FEEDBACK_MARGIN + (usableW - rowW) / 2;

    const isExpanded = expandedLevel === lvl;
    const isCollapsed = expandedLevel !== null && expandedLevel !== lvl;
    const h = isExpanded ? NODE_H_EXPANDED : isCollapsed ? NODE_H_COLLAPSED : NODE_H;
    const gap = isCollapsed ? LEVEL_GAP_COLLAPSED : LEVEL_GAP;

    for (let i = 0; i < count; i++) {
      layoutNodes.push({
        ...nodesInLevel[i],
        x: startX + i * (nodeW + NODE_GAP),
        y: currentY,
        w: nodeW,
        h,
        isExpanded,
        isCollapsed,
      });
    }
    currentY += h + gap;
  }

  return { layoutNodes, canvasH: currentY + 10 };
}

function edgePath(from: LayoutNode, to: LayoutNode, wrapLeft: boolean): string {
  if (wrapLeft) {
    const fy = from.y + from.h / 2;
    const ty = to.y + to.h / 2;
    const x = LEVEL_LABEL_W + 20;
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
  return `M ${x1} ${y1} C ${x1} ${y1 + dy * 0.4} ${x2} ${y2 - dy * 0.4} ${x2} ${y2}`;
}

export default function CausalChainDiagram() {
  const [selectedNode, setSelectedNode] = useState<ChainNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
  const canvasW = 1060;
  const { layoutNodes, canvasH } = useMemo(
    () => computeLayout(NODES, canvasW, expandedLevel),
    [expandedLevel]
  );

  const nodeMap = useMemo(() => {
    const m = new Map<string, LayoutNode>();
    for (const n of layoutNodes) m.set(n.id, n);
    return m;
  }, [layoutNodes]);

  const handleNodeClick = useCallback((node: ChainNode) => {
    setSelectedNode(node);
  }, []);

  const sortedLevels = useMemo(() => {
    const s = new Set<number>();
    for (const n of layoutNodes) s.add(n.level);
    return [...s].sort((a, b) => a - b);
  }, [layoutNodes]);

  const levelYRanges = useMemo(() => {
    const ranges = new Map<number, { top: number; bottom: number }>();
    for (const n of layoutNodes) {
      const cur = ranges.get(n.level);
      if (!cur) {
        ranges.set(n.level, { top: n.y, bottom: n.y + n.h });
      } else {
        ranges.set(n.level, {
          top: Math.min(cur.top, n.y),
          bottom: Math.max(cur.bottom, n.y + n.h),
        });
      }
    }
    return ranges;
  }, [layoutNodes]);

  const handleLevelClick = useCallback((lvl: number) => {
    setExpandedLevel((prev) => (prev === lvl ? null : lvl));
  }, []);

  return (
    <>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${canvasW} ${canvasH}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="BERM causal chain diagram"
          style={{ width: "100%", height: "auto", minWidth: 640 }}
        >
          <defs>
            <marker
              id="chain-arrow"
              viewBox="0 0 10 7"
              refX="10"
              refY="3.5"
              markerWidth="7"
              markerHeight="5"
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
                markerWidth="7"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 3.5 L 0 7 z" fill={color} />
              </marker>
            ))}
          </defs>

          {/* Background */}
          <rect x="0" y="0" width={canvasW} height={canvasH} fill="var(--card-bg)" rx="8" />

          {/* Level dividers & labels */}
          {sortedLevels.map((lvl) => {
            const range = levelYRanges.get(lvl)!;
            const y = range.top - (expandedLevel !== null ? LEVEL_GAP_COLLAPSED : LEVEL_GAP) / 2 + 4;
            const isThisExpanded = expandedLevel === lvl;
            const firstNodeH = layoutNodes.find((n) => n.level === lvl)?.h ?? NODE_H;
            return (
              <g
                key={`lvl-${lvl}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleLevelClick(lvl)}
              >
                {lvl > 1 && (
                  <line
                    x1={LEVEL_LABEL_W + FEEDBACK_MARGIN - 10}
                    y1={y}
                    x2={canvasW - 10}
                    y2={y}
                    stroke="var(--card-border)"
                    strokeWidth={1}
                  />
                )}
                {/* Hit area for level click */}
                <rect
                  x={FEEDBACK_MARGIN - 4}
                  y={range.top - 4}
                  width={LEVEL_LABEL_W + 8}
                  height={firstNodeH + 8}
                  fill="transparent"
                />
                <text
                  x={FEEDBACK_MARGIN + 4}
                  y={range.top + firstNodeH / 2 + 1}
                  fill={isThisExpanded ? "var(--foreground-muted)" : "var(--border)"}
                  fontSize={11}
                  fontWeight="700"
                  dominantBaseline="middle"
                  fontFamily="ui-monospace, monospace"
                >
                  {lvl}
                </text>
                {isThisExpanded && (
                  <text
                    x={LEVEL_LABEL_W + FEEDBACK_MARGIN}
                    y={range.top - 6}
                    fill="var(--foreground-muted)"
                    fontSize={10}
                    fontWeight="600"
                    dominantBaseline="auto"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  >
                    {LEVEL_TITLES[lvl]}
                  </text>
                )}
              </g>
            );
          })}

          {/* Edges */}
          {(() => {
            const labelPositions: { x: number; y: number; idx: number }[] = [];
            return EDGES.map((edge, edgeIdx) => {
              const from = nodeMap.get(edge.from);
              const to = nodeMap.get(edge.to);
              if (!from || !to) return null;

              const wrapLeft =
                (edge.from === "feedback" && edge.to === "ambient") ||
                (from.level > to.level);
              const color = EPISTEMIC_COLORS[edge.epistemicLevel];
              const isHovered =
                hoveredNode === edge.from || hoveredNode === edge.to;
              const markerId = `chain-arrow-${edge.epistemicLevel.replace("|", "_")}`;

              let labelX = 0;
              let labelY = 0;
              if (edge.label && !wrapLeft) {
                labelX =
                  from.level === to.level
                    ? (from.x + from.w + to.x) / 2
                    : (from.x + from.w / 2 + to.x + to.w / 2) / 2;
                labelY =
                  from.level === to.level
                    ? from.y + from.h / 2 - 8
                    : (from.y + from.h + to.y) / 2;

                for (const prev of labelPositions) {
                  if (Math.abs(labelX - prev.x) < 60 && Math.abs(labelY - prev.y) < 10) {
                    labelY += 10;
                  }
                }
                labelPositions.push({ x: labelX, y: labelY, idx: edgeIdx });
              }

              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <path
                    d={edgePath(from, to, wrapLeft)}
                    fill="none"
                    stroke={isHovered ? color : "var(--foreground-muted)"}
                    strokeWidth={isHovered ? 2 : 1.5}
                    strokeDasharray={wrapLeft ? "6 4" : undefined}
                    markerEnd={
                      isHovered
                        ? `url(#${markerId})`
                        : "url(#chain-arrow)"
                    }
                  />
                  {edge.label && !wrapLeft && (
                    <text
                      x={labelX}
                      y={labelY}
                      fill={isHovered ? color : "var(--foreground-muted)"}
                      fontSize={8}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            });
          })()}

          {/* Nodes */}
          {layoutNodes.map((n) => {
            const color = EPISTEMIC_COLORS[n.epistemicLevel];
            const isHovered = hoveredNode === n.id;
            const isSelected = selectedNode?.id === n.id;
            const showSublabel = !n.isCollapsed && n.sublabel;

            return (
              <g
                key={n.id}
                style={{ cursor: "pointer" }}
                onClick={() => handleNodeClick(n)}
                onMouseEnter={() => setHoveredNode(n.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx={NODE_RX}
                  ry={NODE_RX}
                  fill={isHovered ? "var(--background-secondary)" : "var(--card-bg)"}
                  stroke={color}
                  strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.5}
                />
                {/* Epistemic dot */}
                <circle
                  cx={n.x + n.w - 12}
                  cy={n.y + 12}
                  r={4}
                  fill={color}
                />
                {/* Label */}
                <text
                  x={n.x + 10}
                  y={n.y + (showSublabel ? 18 : n.h / 2 + 1)}
                  fill="var(--foreground)"
                  fontSize={n.isCollapsed ? 9 : 11}
                  fontWeight="600"
                  dominantBaseline="middle"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {n.label}
                </text>
                {/* Sublabel */}
                {showSublabel && (
                  <text
                    x={n.x + 10}
                    y={n.y + 36}
                    fill="var(--foreground-muted)"
                    fontSize={9}
                    dominantBaseline="middle"
                    fontFamily="ui-monospace, SFMono-Regular, monospace"
                  >
                    {n.sublabel}
                  </text>
                )}
                {/* Expanded: mechanism preview */}
                {n.isExpanded && (
                  <foreignObject
                    x={n.x + 2}
                    y={n.y + (n.sublabel ? 46 : 34)}
                    width={n.w - 4}
                    height={n.h - (n.sublabel ? 50 : 38)}
                  >
                    <p
                      style={{
                        fontSize: 8,
                        lineHeight: "1.3",
                        color: "var(--foreground-muted)",
                        margin: 0,
                        padding: "0 6px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      }}
                    >
                      {n.mechanism}
                    </p>
                  </foreignObject>
                )}
              </g>
            );
          })}

          {/* Legend */}
          {(
            [
              ["E", "Empiirisesti vahvistettu"],
              ["M|C", "Välttämätön seuraus"],
              ["M", "Matemaattinen seuraus"],
              ["C", "Ehdokas"],
              ["L", "Premissi"],
            ] as const
          ).map(([lvl, lbl], i) => (
            <g
              key={lvl}
              transform={`translate(${LEVEL_LABEL_W + FEEDBACK_MARGIN + i * 165}, ${canvasH - 12})`}
            >
              <circle cx={0} cy={0} r={4} fill={EPISTEMIC_COLORS[lvl]} />
              <text
                x={10}
                y={1}
                fill="var(--foreground-muted)"
                fontSize={9}
                fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                dominantBaseline="middle"
              >
                {lbl}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {selectedNode && (
        <DetailPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </>
  );
}
