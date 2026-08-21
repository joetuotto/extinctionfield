"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  Position,
  MarkerType,
  getSmoothStepPath,
  BaseEdge,
  type Node,
  type Edge,
  type NodeTypes,
  type EdgeTypes,
  type EdgeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ChevronLeft, ChevronRight, Map, Route } from "lucide-react";
import {
  NODES,
  EDGES,
  EN_LABELS,
  EVIDENCE_COLORS,
  EVIDENCE_LABELS,
  LEVEL_TO_STAGE,
  STAGE_BANDS,
  ECOLOGY_BAND,
  GUIDED_SCENES,
  STEPPER_PATHS,
  NODE_DIMENSIONS,
  computeLayout,
  computeBands,
  getEdgeRelation,
  type CausalMapNode,
  type EpistemicLevel,
  type GuidedScene,
  type StepperPathKey,
} from "@/lib/causalAtlasData";
import AtlasNode from "./atlas/AtlasNode";
import { AtlasDetail } from "./atlas/AtlasDetail";

// ── Custom edge ──

function AtlasEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, style, markerEnd, id } = props;
  const [path] = getSmoothStepPath({
    sourceX, sourceY, targetX, targetY,
    sourcePosition: sourcePosition ?? Position.Right,
    targetPosition: targetPosition ?? Position.Left,
    borderRadius: 10,
  });

  const highlighted = (data as Record<string, unknown>)?.highlighted as boolean;
  const relation = (data as Record<string, unknown>)?.relation as string;
  const dimmed = (data as Record<string, unknown>)?.dimmed as boolean;

  const dasharray = relation === "modulates" ? "6 3" : relation === "differential" ? "4 4" : undefined;

  return (
    <BaseEdge
      id={id}
      path={path}
      markerEnd={markerEnd}
      style={{
        ...style,
        stroke: highlighted ? "#60A5FA" : dimmed ? "#ffffff06" : "#ffffff18",
        strokeWidth: highlighted ? 2 : 1,
        strokeDasharray: dasharray,
        transition: "stroke 0.3s, stroke-width 0.3s, opacity 0.3s",
      }}
    />
  );
}

// ── Stage band node ──

function StageBandNode({ data }: { data: Record<string, unknown> }) {
  return (
    <div
      className="rounded-lg pointer-events-none select-none"
      style={{
        width: data.width as number,
        height: data.height as number,
        backgroundColor: data.color as string,
        borderLeft: `1px solid ${data.borderColor as string}`,
        borderRight: `1px solid ${data.borderColor as string}`,
      }}
    >
      <div className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
        style={{ color: `${data.accent as string}80` }}
      >
        {data.label as string}
      </div>
    </div>
  );
}

const nodeTypes: NodeTypes = {
  atlasNode: AtlasNode,
  stageBand: StageBandNode as unknown as NodeTypes[string],
};

const edgeTypes: EdgeTypes = {
  atlas: AtlasEdge,
};

// ── Build React Flow elements ──

function buildElements(
  lang: "en" | "fi",
  scene: GuidedScene | null,
) {
  const positions = computeLayout();
  const bands = computeBands();
  const sceneNodes = new Set(scene?.nodes ?? []);
  const sceneEdges = new Set(scene?.edges ?? []);
  const hasScene = scene !== null && scene.nodes.length > 0;

  const bandNodes: Node[] = bands.map((b) => ({
    id: `band-${b.stage}`,
    type: "stageBand",
    position: { x: b.x, y: b.y },
    data: {
      label: b.band.label[lang],
      width: b.width,
      height: b.height,
      color: b.band.color,
      borderColor: `${b.band.accent}20`,
      accent: b.band.accent,
    },
    draggable: false,
    selectable: false,
    focusable: false,
    style: { zIndex: -10 },
  }));

  const datNodes: Node[] = NODES.map((n) => {
    const pos = positions[n.id];
    if (!pos) return null;
    const stage = LEVEL_TO_STAGE[n.level];
    const band = stage === "ecology" ? ECOLOGY_BAND : STAGE_BANDS.find((b) => b.id === stage);
    const en = EN_LABELS[n.id];
    const label = lang === "en" && en ? en.label : n.label;
    const sublabel = lang === "en" && en?.sublabel ? en.sublabel : n.sublabel;

    return {
      id: n.id,
      type: "atlasNode",
      position: pos,
      data: {
        label,
        sublabel,
        epistemicLevel: n.epistemicLevel,
        stageAccent: band?.accent ?? "#6B7280",
        highlighted: hasScene && sceneNodes.has(n.id),
        dimmed: hasScene && !sceneNodes.has(n.id),
      },
    } as Node;
  }).filter(Boolean) as Node[];

  const flowEdges: Edge[] = EDGES.map((e, i) => {
    const edgeKey = `${e.from}->${e.to}`;
    const relation = getEdgeRelation(e.from, e.to);
    const highlighted = hasScene && sceneEdges.has(edgeKey);
    const dimmed = hasScene && !sceneEdges.has(edgeKey);
    return {
      id: `e-${i}`,
      source: e.from,
      target: e.to,
      type: "atlas",
      data: { relation, highlighted, dimmed },
      markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: highlighted ? "#60A5FA" : dimmed ? "#ffffff08" : "#ffffff25" },
    };
  });

  return { nodes: [...bandNodes, ...datNodes], edges: flowEdges };
}

// ── Atlas inner (needs ReactFlowProvider) ──

function AtlasInner({ locale }: { locale: string }) {
  const lang = (locale === "fi" ? "fi" : "en") as "en" | "fi";
  const [mode, setMode] = useState<"explore" | "guided">("explore");
  const [sceneIdx, setSceneIdx] = useState(0);
  const [selectedNode, setSelectedNode] = useState<CausalMapNode | null>(null);
  const { fitView } = useReactFlow();

  const scene = mode === "guided" ? GUIDED_SCENES[sceneIdx] : null;
  const { nodes: initNodes, edges: initEdges } = useMemo(() => buildElements(lang, scene), [lang, scene]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  useEffect(() => {
    const { nodes: n, edges: e } = buildElements(lang, scene);
    setNodes(n);
    setEdges(e);
  }, [lang, scene, setNodes, setEdges]);

  const humanNodeIds = useMemo(() => new Set(NODES.filter((n) => n.level >= 0 && n.level <= 5).map((n) => n.id)), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mode === "guided" && scene && scene.nodes.length > 0) {
        fitView({ nodes: scene.nodes.map((id) => ({ id })), padding: 0.35, duration: 600 });
      } else if (mode === "guided") {
        fitView({ padding: 0.15, duration: 600 });
      } else {
        fitView({ nodes: Array.from(humanNodeIds).map((id) => ({ id })), padding: 0.12, duration: 600 });
      }
    }, 80);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, sceneIdx, fitView, humanNodeIds]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const source = NODES.find((n) => n.id === node.id);
    if (source) setSelectedNode(source);
  }, []);

  const prevScene = () => setSceneIdx((i) => Math.max(0, i - 1));
  const nextScene = () => setSceneIdx((i) => Math.min(GUIDED_SCENES.length - 1, i + 1));

  useEffect(() => {
    if (mode !== "guided") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextScene();
      else if (e.key === "ArrowLeft") prevScene();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode]);

  const epistemicLabels = EVIDENCE_LABELS[lang] as Record<EpistemicLevel, string>;

  return (
    <div className="relative w-full h-[82vh] min-h-[600px] rounded-xl overflow-hidden bg-[#0a0a1a] border border-white/10">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={() => setSelectedNode(null)}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.15}
        maxZoom={2.5}
        nodesDraggable={false}
        nodesConnectable={false}
        panOnScroll
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={30} size={1} color="#ffffff05" />
        <Controls
          showInteractive={false}
          className="!bg-[#12122a] !border-white/10 !shadow-lg [&>button]:!bg-[#12122a] [&>button]:!border-white/10 [&>button]:!fill-gray-400 [&>button:hover]:!bg-white/10"
        />

        {/* Mode toggle */}
        <Panel position="top-right" className="!m-3">
          <div className="flex gap-1 bg-[#12122a]/95 backdrop-blur-sm border border-white/10 rounded-lg p-1">
            <button
              onClick={() => { setMode("explore"); setSelectedNode(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === "explore" ? "bg-white/10 text-white" : "text-gray-400 hover:text-gray-200"}`}
            >
              <Map size={12} />
              {lang === "fi" ? "Tutki" : "Explore"}
            </button>
            <button
              onClick={() => { setMode("guided"); setSceneIdx(0); setSelectedNode(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === "guided" ? "bg-blue-500/20 text-blue-300" : "text-gray-400 hover:text-gray-200"}`}
            >
              <Route size={12} />
              {lang === "fi" ? "Opastettu" : "Guided"}
            </button>
          </div>
        </Panel>

        {/* Legend */}
        <Panel position="top-left" className="!m-3">
          <div className="bg-[#12122a]/95 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2.5">
            <p className="text-[9px] uppercase tracking-wider text-gray-500 mb-1.5">
              {lang === "fi" ? "Evidenssitaso" : "Evidence Level"}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {(Object.keys(EVIDENCE_COLORS) as EpistemicLevel[]).map((key) => (
                <span key={key} className="inline-flex items-center gap-1.5 text-[10px] text-gray-400">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: EVIDENCE_COLORS[key] }} />
                  {epistemicLabels[key]}
                </span>
              ))}
            </div>
          </div>
        </Panel>

      </ReactFlow>

      {/* Guided mode scene navigator — fixed to viewport bottom */}
      {mode === "guided" && scene && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
          <div className="bg-[#12122a]/95 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 max-w-lg text-center">
            <h3 className="text-sm font-bold text-gray-100 mb-1.5">{scene.title[lang]}</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">{scene.description[lang]}</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevScene}
                disabled={sceneIdx === 0}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors disabled:opacity-30 text-gray-300"
                aria-label="Previous scene"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-1.5">
                {GUIDED_SCENES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSceneIdx(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === sceneIdx ? "bg-blue-400" : "bg-gray-600 hover:bg-gray-500"}`}
                    aria-label={`Scene ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextScene}
                disabled={sceneIdx === GUIDED_SCENES.length - 1}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors disabled:opacity-30 text-gray-300"
                aria-label="Next scene"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedNode && (
        <AtlasDetail node={selectedNode} locale={locale} onClose={() => setSelectedNode(null)} />
      )}
    </div>
  );
}

// ── Mobile causal stepper ──

function MobileStepper({ locale }: { locale: string }) {
  const lang = (locale === "fi" ? "fi" : "en") as "en" | "fi";
  const [pathKey, setPathKey] = useState<StepperPathKey>("main");
  const [step, setStep] = useState(0);
  const path = STEPPER_PATHS[pathKey];
  const ids = path.ids;
  const currentId = ids[step];
  const node = NODES.find((n) => n.id === currentId);
  const en = EN_LABELS[currentId];

  if (!node) return null;

  const label = lang === "en" && en ? en.label : node.label;
  const sublabel = lang === "en" && en?.sublabel ? en.sublabel : node.sublabel;
  const stage = LEVEL_TO_STAGE[node.level];
  const band = stage === "ecology" ? ECOLOGY_BAND : STAGE_BANDS.find((b) => b.id === stage);
  const epColor = EVIDENCE_COLORS[node.epistemicLevel];
  const epLabels = EVIDENCE_LABELS[lang] as Record<EpistemicLevel, string>;

  return (
    <div className="bg-[#0a0a1a] rounded-xl border border-white/10 overflow-hidden">
      {/* Path selector */}
      <div className="flex border-b border-white/10 overflow-x-auto">
        {(Object.keys(STEPPER_PATHS) as StepperPathKey[]).map((k) => (
          <button
            key={k}
            onClick={() => { setPathKey(k); setStep(0); }}
            className={`flex-1 min-w-0 px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors ${k === pathKey ? "text-blue-300 border-b-2 border-blue-400 bg-blue-500/10" : "text-gray-500 hover:text-gray-300"}`}
          >
            {STEPPER_PATHS[k].label[lang]}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-1 px-4 py-3">
        {ids.map((_, i) => (
          <div key={i} className="flex-1 flex items-center">
            <div className={`h-1 w-full rounded-full transition-colors ${i <= step ? "bg-blue-400" : "bg-white/10"}`} />
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="px-4 pb-4">
        <div className="bg-[#12122a] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10"
              style={{ color: band?.accent, borderColor: `${band?.accent}40` }}
            >
              {band?.label[lang]}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-500">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: epColor }} />
              {epLabels[node.epistemicLevel]}
            </span>
          </div>

          <h3 className="text-base font-bold text-gray-100 mb-1">{label}</h3>
          {sublabel && <p className="text-xs text-gray-400 mb-3">{sublabel}</p>}

          {node.detail?.mechanism && (
            <p className="text-[13px] text-gray-300 leading-relaxed mb-3">{node.detail.mechanism}</p>
          )}

          {node.detail?.fdaDevice && (
            <p className="text-xs text-gray-400">
              <span className="font-semibold text-gray-300">FDA:</span> {node.detail.fdaDevice}
            </p>
          )}

          {node.detail?.link && (
            <a href={`/${lang}${node.detail.link}`} className="inline-block text-xs text-blue-400 hover:text-blue-300 mt-2">
              {lang === "fi" ? "Lue lisää →" : "Read more →"}
            </a>
          )}
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30"
          >
            <ChevronLeft size={14} />
            {lang === "fi" ? "Edellinen" : "Previous"}
          </button>
          <span className="text-xs text-gray-500 font-mono">{step + 1} / {ids.length}</span>
          <button
            onClick={() => setStep((s) => Math.min(ids.length - 1, s + 1))}
            disabled={step === ids.length - 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30"
          >
            {lang === "fi" ? "Seuraava" : "Next"}
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Connection arrow between steps */}
        {step < ids.length - 1 && (
          <div className="flex justify-center py-1 text-gray-600 text-lg">↓</div>
        )}
      </div>
    </div>
  );
}

// ── Main export ──

export function CausalAtlas({ locale }: { locale: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return <MobileStepper locale={locale} />;
  }

  return (
    <ReactFlowProvider>
      <AtlasInner locale={locale} />
    </ReactFlowProvider>
  );
}
