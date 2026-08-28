"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import type { ChainNode, EpistemicLevel } from "@/lib/types";
import {
  NODES,
  EDGES,
  EPISTEMIC_COLORS,
  getLevelTitle,
} from "@/lib/causalChainData";
import { DetailPanel } from "./DetailPanel";
import { pickCopy } from "@/lib/i18n";

type DiagramLocale = "en" | "fi";

const DIAGRAM_COPY = {
  en: {
    ariaLabel: "BERM causal chain diagram",
    clickHint: "→ click for details",
    legendE: "Empirically established",
    legendMC: "Mechanism + association",
    legendM: "Mathematical consequence",
    legendC: "Candidate",
    legendL: "Premise (not validated)",
  },
  fi: {
    ariaLabel: "BERM-kausaaliketjukaavio",
    clickHint: "→ klikkaa tiedot",
    legendE: "Empiirisesti todennettu",
    legendMC: "Mekanismi + assosiaatio",
    legendM: "Matemaattinen seuraus",
    legendC: "Kandidaatti",
    legendL: "Premissi (ei validoitu)",
  },
  ja: {
    ariaLabel: "BERM因果連鎖図",
    clickHint: "→ クリックで詳細",
    legendE: "経験的に確立",
    legendMC: "メカニズム + 関連性",
    legendM: "数学的帰結",
    legendC: "候補",
    legendL: "前提(未検証)",
  },
  fr: {
    ariaLabel: "Diagramme de chaine causale BERM",
    clickHint: "→ cliquer pour details",
    legendE: "Empiriquement etabli",
    legendMC: "Mecanisme + association",
    legendM: "Consequence mathematique",
    legendC: "Candidat",
    legendL: "Premisse (non validee)",
  },
  ko: {
    ariaLabel: "BERM 인과 사슬 다이어그램",
    clickHint: "→ 클릭하여 상세 보기",
    legendE: "경험적으로 확립됨",
    legendMC: "메커니즘 + 연관성",
    legendM: "수학적 귀결",
    legendC: "후보",
    legendL: "전제 (미검증)",
  },
} as const;

const NODE_H = 72;
const NODE_RX = 12;
const LEVEL_GAP = 52;
const LEVEL_LABEL_W = 140;
const FEEDBACK_MARGIN = 60;
const NODE_GAP = 14;
const MAX_NODE_W = 240;
const MIN_NODE_W = 140;
const ABS_MAX_PER_ROW = 5;
const ROW_INNER_GAP = 10;
const BAND_PAD_Y = 14;
const BAND_PAD_X = 8;

const EPISTEMIC_LABELS: Record<string, string> = {
  E: "E",
  "M|C": "M|C",
  M: "M",
  C: "C",
  "L*": "L*",
  L: "L",
};

function wrapSvgLabel(value: string, maxChars: number, maxLines = 2): string[] {
  const words = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((word) => {
      if (word.length <= maxChars) return [word];

      const hyphen = word.indexOf("-");
      if (hyphen > 0) {
        const first = word.slice(0, hyphen + 1);
        const second = word.slice(hyphen + 1);
        if (first.length <= maxChars && second.length <= maxChars) {
          return [first, second];
        }
      }

      return [`${word.slice(0, Math.max(1, maxChars - 1))}\u2026`];
    });
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars || !current) {
      current = candidate;
      continue;
    }
    lines.push(current);
    current = word;
  }
  if (current) lines.push(current);

  if (lines.length <= maxLines) return lines;
  const visible = lines.slice(0, maxLines);
  const remainder = lines.slice(maxLines - 1).join(" ");
  visible[maxLines - 1] = `${remainder.slice(0, Math.max(1, maxChars - 1)).trimEnd()}…`;
  return visible;
}

function truncateSvgLabel(value: string, maxChars: number): string {
  return value.length <= maxChars ? value : `${value.slice(0, Math.max(1, maxChars - 1)).trimEnd()}…`;
}

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
  locale: DiagramLocale = "fi",
): { layoutNodes: LayoutNode[]; canvasH: number; bands: LevelBand[] } {
  const levels = new Map<number, ChainNode[]>();
  for (const n of nodes) {
    if (!levels.has(n.level)) levels.set(n.level, []);
    levels.get(n.level)!.push(n);
  }

  const sortedLevels = [...levels.keys()].sort((a, b) => a - b);
  const layoutNodes: LayoutNode[] = [];
  const bands: LevelBand[] = [];
  const usableW = canvasW - LEVEL_LABEL_W - FEEDBACK_MARGIN;
  const maxPerRow = Math.min(ABS_MAX_PER_ROW, Math.max(1, Math.floor((usableW + NODE_GAP) / (MIN_NODE_W + NODE_GAP))));
  let currentY = 24;

  for (const lvl of sortedLevels) {
    const nodesInLevel = levels.get(lvl)!;
    const count = nodesInLevel.length;
    const h = NODE_H;
    const numRows = Math.ceil(count / maxPerRow);
    const bandTop = currentY - BAND_PAD_Y;

    // Dominant epistemic color for the band
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
      const rowStart = row * maxPerRow;
      const rowEnd = Math.min(rowStart + maxPerRow, count);
      const rowCount = rowEnd - rowStart;
      const totalGaps = (rowCount - 1) * NODE_GAP;
      const nodeW = Math.max(MIN_NODE_W, Math.min(MAX_NODE_W, (usableW - totalGaps) / rowCount));
      const rowW = rowCount * nodeW + totalGaps;
      const startX = LEVEL_LABEL_W + FEEDBACK_MARGIN + (usableW - rowW) / 2;

      for (let i = 0; i < rowCount; i++) {
        layoutNodes.push({
          ...nodesInLevel[rowStart + i],
          x: startX + i * (nodeW + NODE_GAP),
          y: currentY,
          w: nodeW,
          h,
        });
      }
      currentY += h + (row < numRows - 1 ? ROW_INNER_GAP : 0);
    }

    const bandBottom = currentY + BAND_PAD_Y;
    bands.push({
      level: lvl,
      title: getLevelTitle(lvl, locale),
      top: bandTop,
      bottom: bandBottom,
      color: EPISTEMIC_COLORS[dominant] ?? "#6B7280",
    });
    currentY = bandBottom + LEVEL_GAP;
  }

  return { layoutNodes, canvasH: currentY + 40, bands };
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

export default function BermCausalDiagram({ locale = "fi" }: { locale?: string }) {
  const l: DiagramLocale = locale === "fi" ? "fi" : "en";
  const fi = locale === "fi";
  const dc = pickCopy(DIAGRAM_COPY, locale);
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
  const { layoutNodes, canvasH, bands } = useMemo(
    () => computeLayout(NODES, canvasW, l),
    [canvasW, l],
  );

  const nodeMap = useMemo(() => {
    const m = new Map<string, LayoutNode>();
    for (const n of layoutNodes) m.set(n.id, n);
    return m;
  }, [layoutNodes]);

  const connectedEdges = useMemo(() => {
    if (!hoveredNode) return new Set<number>();
    const s = new Set<number>();
    EDGES.forEach((e, i) => {
      if (e.from === hoveredNode || e.to === hoveredNode) s.add(i);
    });
    return s;
  }, [hoveredNode]);

  const handleNodeClick = useCallback((node: ChainNode) => {
    setSelectedNode(node);
  }, []);

  const legendItems: [EpistemicLevel, string][] = [
    ["E", dc.legendE],
    ["M|C", dc.legendMC],
    ["M", dc.legendM],
    ["C", dc.legendC],
    ["L*", dc.legendL],
  ];

  return (
    <>
      <div ref={containerRef} className="chart-scroll w-full">
        <svg
          viewBox={`0 0 ${canvasW} ${canvasH}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={dc.ariaLabel}
          className="chart-svg"
          style={{ width: "100%", height: "auto", minWidth: 600 }}
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
            width={canvasW}
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
                width={canvasW - LEVEL_LABEL_W - FEEDBACK_MARGIN + BAND_PAD_X - 12}
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
          {EDGES.map((edge, edgeIdx) => {
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
                    {(!fi && edge.label_en) || edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {layoutNodes.map((n) => {
            const color = EPISTEMIC_COLORS[n.epistemicLevel];
            const isHovered = hoveredNode === n.id;
            const isSelected = selectedNode?.id === n.id;
            const label = (!fi && n.label_en) || n.label;
            const sublabel = (!fi && n.sublabel_en) || n.sublabel;
            const maxLabelChars = Math.max(11, Math.floor((n.w - 28) / 7.1));
            const labelLines = wrapSvgLabel(label, maxLabelChars, 2);
            const labelStartY = sublabel
              ? n.y + 34 - ((labelLines.length - 1) * 15) / 2
              : n.y + n.h / 2 + 4 - ((labelLines.length - 1) * 15) / 2;
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
                opacity={hoveredNode && !isHovered && ![...connectedEdges].some(i => EDGES[i]?.from === n.id || EDGES[i]?.to === n.id) ? 0.4 : 1}
              >
                <title>{sublabel ? `${label} — ${sublabel}` : label}</title>
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
                <g>
                  {/* Label */}
                  {labelLines.map((line, lineIndex) => (
                    <text
                      key={`${n.id}-label-${lineIndex}`}
                      x={n.x + 14}
                      y={labelStartY + lineIndex * 15}
                      fill="var(--foreground)"
                      fontSize={12.5}
                      fontWeight="600"
                      dominantBaseline="middle"
                    >
                      {line}
                    </text>
                  ))}
                  {/* Sublabel */}
                  {sublabel && (
                    <text
                      x={n.x + 14}
                      y={n.y + 59}
                      fill="var(--foreground-muted)"
                      fontSize={9.5}
                      dominantBaseline="middle"
                      fontFamily="ui-monospace, SFMono-Regular, monospace"
                    >
                      {truncateSvgLabel(sublabel, Math.max(13, Math.floor((n.w - 28) / 5.7)))}
                    </text>
                  )}
                  {/* Click hint on hover */}
                  {isHovered && (
                    <text
                      x={n.x + 14}
                      y={n.y + n.h - 8}
                      fill="var(--foreground-muted)"
                      fontSize={9}
                      dominantBaseline="auto"
                      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    >
                      {dc.clickHint}
                    </text>
                  )}
                </g>
              </g>
            );
          })}

        </svg>
      </div>

      <ul className="chart-legend mt-3" aria-label={fi ? "Episteeminen selite" : "Epistemic legend"}>
        {legendItems.map(([level, label]) => {
          const color = EPISTEMIC_COLORS[level];
          return (
            <li key={level} className="chart-key">
              <span
                aria-hidden="true"
                className="inline-flex h-4 min-w-4 items-center justify-center rounded px-1 font-mono-num text-[9px] font-bold"
                style={{ backgroundColor: `${color}20`, color, boxShadow: `inset 0 0 0 1px ${color}` }}
              >
                {level}
              </span>
              {label}
            </li>
          );
        })}
      </ul>

      {selectedNode && (
        <DetailPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          locale={l}
        />
      )}
    </>
  );
}
