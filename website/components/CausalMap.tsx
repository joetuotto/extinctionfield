"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeTypes,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import {
  NODES,
  EDGES,
  LEVEL_LABELS,
  EPISTEMIC_COLORS,
  EPISTEMIC_LABELS,
  type CausalMapNode as CausalNodeType,
} from "@/lib/causalMapData";
import CausalMapNode from "./CausalMapNode";
import { CausalMapDetail } from "./CausalMapDetail";
import { ChevronDown } from "lucide-react";

const NODE_WIDTH = 160;
const NODE_HEIGHT = 60;

function buildLayout() {
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: "TB",
    nodesep: 30,
    ranksep: 80,
    marginx: 40,
    marginy: 40,
  });
  g.setDefaultEdgeLabel(() => ({}));

  NODES.forEach((n) => {
    g.setNode(n.id, { width: NODE_WIDTH, height: NODE_HEIGHT, level: n.level });
  });

  EDGES.forEach((e) => {
    g.setEdge(e.from, e.to);
  });

  // Assign ranks by level
  NODES.forEach((n) => {
    const node = g.node(n.id);
    if (node) {
      (node as dagre.Node & { rank?: number }).rank = n.level;
    }
  });

  dagre.layout(g);

  const nodes: Node[] = NODES.map((n) => {
    const pos = g.node(n.id);
    return {
      id: n.id,
      type: "causalNode",
      position: { x: pos.x - NODE_WIDTH / 2, y: pos.y - NODE_HEIGHT / 2 },
      data: {
        label: n.label,
        sublabel: n.sublabel,
        color: n.color,
        epistemicLevel: n.epistemicLevel,
        level: n.level,
      },
    };
  });

  const edges: Edge[] = EDGES.map((e, i) => ({
    id: `e-${i}`,
    source: e.from,
    target: e.to,
    label: e.label,
    style: { stroke: "#6B728080", strokeWidth: 1.5 },
    labelStyle: { fontSize: 9, fill: "#9CA3AF" },
    animated: false,
  }));

  return { nodes, edges };
}

const nodeTypes: NodeTypes = { causalNode: CausalMapNode };

// ── Mobile accordion ──
function MobileAccordion({ locale }: { locale: string }) {
  const lang = locale === "fi" ? "fi" : "en";
  const levelLabels = LEVEL_LABELS[lang];
  const epistemicLabels = EPISTEMIC_LABELS[lang];
  const [openLevel, setOpenLevel] = useState<number | null>(null);
  const [selectedNode, setSelectedNode] = useState<CausalNodeType | null>(null);

  const levels = useMemo(() => {
    const map = new Map<number, CausalNodeType[]>();
    NODES.forEach((n) => {
      if (!map.has(n.level)) map.set(n.level, []);
      map.get(n.level)!.push(n);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, []);

  return (
    <div className="space-y-2 px-4 py-6">
      <div className="flex flex-wrap gap-3 mb-4">
        {(Object.keys(EPISTEMIC_COLORS) as Array<keyof typeof EPISTEMIC_COLORS>).map((key) => (
          <span key={key} className="inline-flex items-center gap-1.5 text-xs text-foreground-muted">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: EPISTEMIC_COLORS[key] }} />
            {epistemicLabels[key]}
          </span>
        ))}
      </div>

      {levels.map(([level, nodes]) => (
        <div key={level} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenLevel(openLevel === level ? null : level)}
            className="w-full flex items-center justify-between px-4 py-3 bg-card-bg hover:bg-foreground/5 transition-colors"
          >
            <span className="text-sm font-semibold">
              {levelLabels[level]}
              <span className="ml-2 text-xs text-foreground-muted font-normal">({nodes.length})</span>
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${openLevel === level ? "rotate-180" : ""}`}
            />
          </button>
          {openLevel === level && (
            <div className="border-t border-border divide-y divide-border/50">
              {nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                  className="w-full text-left px-4 py-3 hover:bg-foreground/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: node.color || EPISTEMIC_COLORS[node.epistemicLevel] }}
                    />
                    <span className="text-sm font-medium">{node.label}</span>
                  </div>
                  {node.sublabel && (
                    <p className="text-xs text-foreground-muted mt-0.5 ml-[18px]">{node.sublabel}</p>
                  )}
                  {selectedNode?.id === node.id && node.detail && (
                    <div className="mt-3 ml-[18px] space-y-2 text-xs text-foreground-muted">
                      <p>{node.detail.mechanism}</p>
                      {node.detail.fdaDevice && (
                        <p><span className="font-semibold">FDA:</span> {node.detail.fdaDevice}</p>
                      )}
                      {node.detail.prediction && (
                        <p><span className="font-semibold">{lang === "fi" ? "Ennuste:" : "Prediction:"}</span> {node.detail.prediction}</p>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main component ──
export function CausalMap({ locale }: { locale: string }) {
  const lang = locale === "fi" ? "fi" : "en";
  const epistemicLabels = EPISTEMIC_LABELS[lang];
  const [isMobile, setIsMobile] = useState(false);
  const [selectedNode, setSelectedNode] = useState<CausalNodeType | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => buildLayout(), []);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const source = NODES.find((n) => n.id === node.id);
    if (source) setSelectedNode(source);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  if (isMobile) {
    return <MobileAccordion locale={locale} />;
  }

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] border border-border rounded-xl overflow-hidden bg-[var(--card-bg,#1a1a2e)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} color="#ffffff08" />
        <Controls showInteractive={false} className="!bg-card-bg !border-border !shadow-lg [&>button]:!bg-card-bg [&>button]:!border-border [&>button]:!fill-foreground-muted [&>button:hover]:!bg-foreground/10" />
        <MiniMap
          nodeColor={(n) => {
            const d = n.data as { color?: string; epistemicLevel?: string };
            return d.color || EPISTEMIC_COLORS[(d.epistemicLevel as keyof typeof EPISTEMIC_COLORS) || "E"] || "#6B7280";
          }}
          maskColor="rgba(0,0,0,0.6)"
          className="!bg-card-bg !border-border"
        />
        <Panel position="top-left" className="!m-3">
          <div className="flex flex-wrap gap-3 bg-card-bg/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
            {(Object.keys(EPISTEMIC_COLORS) as Array<keyof typeof EPISTEMIC_COLORS>).map((key) => (
              <span key={key} className="inline-flex items-center gap-1.5 text-xs text-foreground-muted">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: EPISTEMIC_COLORS[key] }} />
                {epistemicLabels[key]}
              </span>
            ))}
          </div>
        </Panel>
      </ReactFlow>

      {selectedNode && (
        <CausalMapDetail
          node={selectedNode}
          locale={locale}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}
