"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  MiniMap,
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
import { ChevronLeft, ChevronRight, Map, Route, Search, RotateCcw } from "lucide-react";
import {
  NODES,
  EDGES,
  EVIDENCE_COLORS,
  EVIDENCE_LABELS,
  LEVEL_TO_STAGE,
  STAGE_BANDS,
  ECOLOGY_BAND,
  ALL_STAGES,
  GUIDED_SCENES,
  STEPPER_PATHS,
  computeLayout,
  computeBands,
  getEdgeRelation,
  t,
  localizedDetail,
  type CausalMapNode,
  type EpistemicLevel,
  type Locale,
  type GuidedScene,
  type StepperPathKey,
  type Stage,
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
        stroke: highlighted ? "var(--atlas-edge-hl)" : dimmed ? "var(--atlas-edge-dim)" : "var(--atlas-edge)",
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
  lang: Locale,
  scene: GuidedScene | null,
  stageFilter: Set<Stage> | null,
  evidenceFilter: Set<EpistemicLevel> | null,
  searchQuery: string,
  onActivate: (nodeId: string, element: HTMLElement) => void,
) {
  const positions = computeLayout();
  const bands = computeBands();
  const sceneNodes = new Set(scene?.nodes ?? []);
  const sceneEdges = new Set(scene?.edges ?? []);
  const hasScene = scene !== null && scene.nodes.length > 0;
  const searchLower = searchQuery.toLowerCase().trim();
  const epistemicLabels = EVIDENCE_LABELS[lang] as Record<EpistemicLevel, string>;

  const visibleNodeIds = new Set<string>();

  NODES.forEach((n) => {
    const pos = positions[n.id];
    if (!pos) return;
    const stage = LEVEL_TO_STAGE[n.level];
    if (stageFilter && !stageFilter.has(stage)) return;
    if (evidenceFilter && !evidenceFilter.has(n.epistemicLevel)) return;
    if (searchLower) {
      const label = t(n.label, lang).toLowerCase();
      const sublabel = n.sublabel ? t(n.sublabel, lang).toLowerCase() : "";
      if (!label.includes(searchLower) && !sublabel.includes(searchLower)) return;
    }
    visibleNodeIds.add(n.id);
  });

  const bandNodes: Node[] = bands.map((b) => ({
    id: `band-${b.stage}`,
    type: "stageBand",
    position: { x: b.x, y: b.y },
    data: {
      label: t(b.band.label, lang),
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
    if (!visibleNodeIds.has(n.id)) return null;

    const stage = LEVEL_TO_STAGE[n.level];
    const band = stage === "ecology" ? ECOLOGY_BAND : STAGE_BANDS.find((b) => b.id === stage);
    const label = t(n.label, lang);
    const sublabel = n.sublabel ? t(n.sublabel, lang) : undefined;

    return {
      id: n.id,
      type: "atlasNode",
      position: pos,
      data: {
        label,
        sublabel,
        epistemicLevel: n.epistemicLevel,
        epistemicLabel: epistemicLabels[n.epistemicLevel],
        stageAccent: band?.accent ?? "#6B7280",
        highlighted: hasScene && sceneNodes.has(n.id),
        dimmed: hasScene && !sceneNodes.has(n.id),
        nodeId: n.id,
        onActivate,
      },
    } as Node;
  }).filter(Boolean) as Node[];

  const flowEdges: Edge[] = EDGES.map((e, i) => {
    if (!visibleNodeIds.has(e.from) || !visibleNodeIds.has(e.to)) return null;
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
      markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: highlighted ? "var(--atlas-edge-hl)" : dimmed ? "var(--atlas-marker-dim)" : "var(--atlas-marker)" },
    };
  }).filter(Boolean) as Edge[];

  return { nodes: [...bandNodes, ...datNodes], edges: flowEdges, visibleCount: visibleNodeIds.size };
}

// ── Toolbar ──

interface ToolbarProps {
  lang: Locale;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  stageFilter: Set<Stage> | null;
  onStageToggle: (stage: Stage) => void;
  evidenceFilter: Set<EpistemicLevel> | null;
  onEvidenceToggle: (level: EpistemicLevel) => void;
  onClearFilters: () => void;
  visibleCount: number;
  hasFilters: boolean;
}

function AtlasToolbar({
  lang, searchQuery, onSearchChange, stageFilter, onStageToggle,
  evidenceFilter, onEvidenceToggle, onClearFilters, visibleCount, hasFilters,
}: ToolbarProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const epistemicLabels = EVIDENCE_LABELS[lang] as Record<EpistemicLevel, string>;

  return (
    <div className="flex flex-wrap items-center gap-2 bg-[var(--atlas-surface)] backdrop-blur-sm border border-[var(--border)] rounded-lg px-3 py-2">
      {/* Search */}
      <div className="relative">
        <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--atlas-text-muted)]" />
        <input
          ref={searchRef}
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={lang === "fi" ? "Etsi solmu..." : "Search nodes..."}
          className="w-36 pl-7 pr-2 py-1.5 bg-[var(--atlas-edge-dim)] border border-[var(--border)] rounded-md text-xs text-[var(--atlas-text)] placeholder:text-[var(--atlas-text-muted)] focus:outline-none focus:ring-1 focus:ring-blue-400/50"
          aria-label={lang === "fi" ? "Etsi solmuja" : "Search nodes"}
        />
      </div>

      {/* Stage filters */}
      <div className="flex flex-wrap gap-1" role="group" aria-label={lang === "fi" ? "Vaihesuodattimet" : "Stage filters"}>
        {ALL_STAGES.map((s) => {
          const active = !stageFilter || stageFilter.has(s.id);
          return (
            <button
              key={s.id}
              onClick={() => onStageToggle(s.id)}
              aria-pressed={active}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors min-h-[28px] ${
                active
                  ? "text-[var(--atlas-text)]"
                  : "text-[var(--atlas-text-muted)] hover:text-[var(--atlas-text-dim)]"
              }`}
              style={active ? { backgroundColor: `${s.accent}25`, color: s.accent } : undefined}
            >
              {t(s.label, lang)}
            </button>
          );
        })}
      </div>

      {/* Evidence filters */}
      <div className="flex gap-1" role="group" aria-label={lang === "fi" ? "Evidenssisuodattimet" : "Evidence filters"}>
        {(Object.keys(EVIDENCE_COLORS) as EpistemicLevel[]).map((level) => {
          const active = !evidenceFilter || evidenceFilter.has(level);
          return (
            <button
              key={level}
              onClick={() => onEvidenceToggle(level)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1 px-1.5 py-1 rounded text-[10px] transition-colors min-h-[28px] ${
                active ? "text-[var(--atlas-text)]" : "text-[var(--atlas-text-muted)] opacity-50"
              }`}
              title={epistemicLabels[level]}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: EVIDENCE_COLORS[level] }} />
              {level === "M|C" ? "M" : level}
            </button>
          );
        })}
      </div>

      {/* Count + clear */}
      <span className="text-[10px] text-[var(--atlas-text-muted)] tabular-nums">{visibleCount}/{NODES.length}</span>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] text-[var(--atlas-text-dim)] hover:text-[var(--atlas-text)] hover:bg-[var(--atlas-edge)] transition-colors min-h-[28px]"
        >
          <RotateCcw size={10} />
          {lang === "fi" ? "Tyhjennä" : "Clear"}
        </button>
      )}
    </div>
  );
}

// ── Atlas inner (needs ReactFlowProvider) ──

function AtlasInner({ locale }: { locale: string }) {
  const lang: Locale = locale === "fi" ? "fi" : "en";
  const [mode, setMode] = useState<"explore" | "guided">("explore");
  const [sceneIdx, setSceneIdx] = useState(0);
  const [selectedNode, setSelectedNode] = useState<CausalMapNode | null>(() => {
    if (typeof window === "undefined") return null;
    const nodeId = new URLSearchParams(window.location.search).get("node");
    return nodeId ? NODES.find((n) => n.id === nodeId) ?? null : null;
  });
  const [originElement, setOriginElement] = useState<HTMLElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<Set<Stage> | null>(null);
  const [evidenceFilter, setEvidenceFilter] = useState<Set<EpistemicLevel> | null>(null);
  const { fitView } = useReactFlow();

  const scene = mode === "guided" ? GUIDED_SCENES[sceneIdx] : null;
  const hasFilters = !!stageFilter || !!evidenceFilter || !!searchQuery;

  const openNode = useCallback((nodeId: string, element: HTMLElement) => {
    const source = NODES.find((n) => n.id === nodeId);
    if (source) {
      setSelectedNode(source);
      setOriginElement(element);
      const url = new URL(window.location.href);
      url.searchParams.set("node", nodeId);
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

  const closeDetails = useCallback(() => {
    setSelectedNode(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("node");
    window.history.replaceState(null, "", url.toString());
  }, []);

  const { nodes: initNodes, edges: initEdges, visibleCount } = useMemo(
    () => buildElements(lang, scene, stageFilter, evidenceFilter, searchQuery, openNode),
    [lang, scene, stageFilter, evidenceFilter, searchQuery, openNode],
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  useEffect(() => {
    const { nodes: n, edges: e } = buildElements(lang, scene, stageFilter, evidenceFilter, searchQuery, openNode);
    setNodes(n);
    setEdges(e);
  }, [lang, scene, stageFilter, evidenceFilter, searchQuery, openNode, setNodes, setEdges]);

  const humanNodeIds = useMemo(() => new Set(NODES.filter((n) => n.level >= 0 && n.level <= 5).map((n) => n.id)), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mode === "guided" && scene && scene.nodes.length > 0) {
        fitView({ nodes: scene.nodes.map((id) => ({ id })), padding: 0.35, duration: 600 });
      } else if (mode === "guided") {
        fitView({ padding: 0.15, duration: 600 });
      } else {
        fitView({ nodes: Array.from(humanNodeIds).map((id) => ({ id })), padding: 0.12, duration: 600, maxZoom: 1.0 });
      }
    }, 80);
    return () => clearTimeout(timer);
  }, [mode, scene, sceneIdx, fitView, humanNodeIds, stageFilter, evidenceFilter, searchQuery]);

  // Deep linking: fit view on mount + popstate listener
  useEffect(() => {
    const nodeId = new URLSearchParams(window.location.search).get("node");
    if (nodeId && NODES.some((n) => n.id === nodeId)) {
      setTimeout(() => {
        fitView({ nodes: [{ id: nodeId }], padding: 0.5, duration: 600 });
      }, 200);
    }

    const onPopState = () => {
      const p = new URLSearchParams(window.location.search);
      const nid = p.get("node");
      if (nid) {
        const s = NODES.find((n) => n.id === nid);
        if (s) setSelectedNode(s);
      } else {
        setSelectedNode(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [fitView]);

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

  const handleStageToggle = useCallback((stage: Stage) => {
    setStageFilter((prev) => {
      if (!prev) {
        const newSet = new Set(ALL_STAGES.map((s) => s.id));
        newSet.delete(stage);
        return newSet;
      }
      const next = new Set(prev);
      if (next.has(stage)) next.delete(stage); else next.add(stage);
      if (next.size === ALL_STAGES.length) return null;
      if (next.size === 0) return null;
      return next;
    });
  }, []);

  const handleEvidenceToggle = useCallback((level: EpistemicLevel) => {
    setEvidenceFilter((prev) => {
      const allLevels = Object.keys(EVIDENCE_COLORS) as EpistemicLevel[];
      if (!prev) {
        const newSet = new Set(allLevels);
        newSet.delete(level);
        return newSet;
      }
      const next = new Set(prev);
      if (next.has(level)) next.delete(level); else next.add(level);
      if (next.size === allLevels.length) return null;
      if (next.size === 0) return null;
      return next;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setStageFilter(null);
    setEvidenceFilter(null);
    setSearchQuery("");
  }, []);

  const COPY = {
    en: {
      explore: "Explore",
      guided: "Guided",
      instruction: "Scroll to zoom · Drag to pan · Click a node for details",
      exitGuided: "Exit tour",
    },
    fi: {
      explore: "Tutki",
      guided: "Opastettu",
      instruction: "Vieritä zoomataksesi · Raahaa panoroidaksesi · Klikkaa solmua yksityiskohtiin",
      exitGuided: "Poistu kierrokselta",
    },
  };
  const copy = COPY[lang];

  return (
    <div className="relative w-full h-[82vh] min-h-[600px] rounded-xl overflow-hidden bg-[var(--atlas-bg)] border border-[var(--border)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(event, node) => {
          if (node.type === "atlasNode") {
            const el = (event.target as HTMLElement).closest("[role=button]") as HTMLElement;
            openNode(node.id, el ?? (event.target as HTMLElement));
          }
        }}
        onPaneClick={() => { if (selectedNode) closeDetails(); }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.2}
        maxZoom={2.5}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
        edgesFocusable={false}
        elementsSelectable={false}
        edgesReconnectable={false}
        deleteKeyCode={null}
        selectionKeyCode={null}
        zoomOnScroll
        panOnDrag
        zoomOnPinch
        proOptions={{ hideAttribution: true }}
        aria-label={lang === "fi" ? "BERM-kausaaliatlas" : "BERM Causal Atlas"}
      >
        <Background gap={30} size={1} color="var(--atlas-dot)" />
        <Controls
          showInteractive={false}
          className="!bg-[var(--atlas-surface)] !border-[var(--border)] !shadow-lg [&>button]:!bg-[var(--atlas-surface)] [&>button]:!border-[var(--border)] [&>button]:!fill-[var(--atlas-text-dim)] [&>button:hover]:!bg-[var(--atlas-edge)] [&>button]:!w-[44px] [&>button]:!h-[44px]"
        />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === "stageBand") return "transparent";
            const d = n.data as Record<string, unknown>;
            return EVIDENCE_COLORS[d.epistemicLevel as EpistemicLevel] ?? "#6B7280";
          }}
          maskColor="var(--atlas-minimap-mask)"
          className="!bg-[var(--atlas-surface)] !border-[var(--border)]"
        />

        {/* Mode toggle + instruction */}
        <Panel position="top-right" className="!m-3">
          <div className="flex flex-col gap-2 items-end">
            <div className="flex gap-1 bg-[var(--atlas-surface)] backdrop-blur-sm border border-[var(--border)] rounded-lg p-1">
              <button
                onClick={() => { setMode("explore"); setSelectedNode(null); closeDetails(); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors min-h-[36px] ${mode === "explore" ? "bg-[var(--atlas-edge)] text-[var(--atlas-text)]" : "text-[var(--atlas-text-dim)] hover:text-[var(--atlas-text)]"}`}
              >
                <Map size={14} />
                {copy.explore}
              </button>
              <button
                onClick={() => { setMode("guided"); setSceneIdx(0); closeDetails(); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors min-h-[36px] ${mode === "guided" ? "bg-blue-500/20 text-blue-300" : "text-[var(--atlas-text-dim)] hover:text-[var(--atlas-text)]"}`}
              >
                <Route size={14} />
                {copy.guided}
              </button>
            </div>
            <p className="text-[11px] text-[var(--atlas-text-dim)] bg-[var(--atlas-surface)] backdrop-blur-sm rounded px-2 py-1">
              {copy.instruction}
            </p>
          </div>
        </Panel>

        {/* Toolbar with search + filters */}
        {mode === "explore" && (
          <Panel position="top-left" className="!m-3">
            <AtlasToolbar
              lang={lang}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              stageFilter={stageFilter}
              onStageToggle={handleStageToggle}
              evidenceFilter={evidenceFilter}
              onEvidenceToggle={handleEvidenceToggle}
              onClearFilters={handleClearFilters}
              visibleCount={visibleCount}
              hasFilters={hasFilters}
            />
          </Panel>
        )}

        {/* Legend (in guided mode) */}
        {mode === "guided" && (
          <Panel position="top-left" className="!m-3">
            <div className="bg-[var(--atlas-surface)] backdrop-blur-sm border border-[var(--border)] rounded-lg px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--atlas-text-dim)] mb-1.5">
                {lang === "fi" ? "Evidenssitaso" : "Evidence Level"}
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {(Object.keys(EVIDENCE_COLORS) as EpistemicLevel[]).map((key) => (
                  <span key={key} className="inline-flex items-center gap-1.5 text-[11px] text-[var(--atlas-text-dim)]">
                    <span
                      className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[8px] font-bold text-white"
                      style={{ backgroundColor: EVIDENCE_COLORS[key] }}
                    >
                      {key === "M|C" ? "M" : key}
                    </span>
                    {(EVIDENCE_LABELS[lang] as Record<EpistemicLevel, string>)[key]}
                  </span>
                ))}
              </div>
            </div>
          </Panel>
        )}

      </ReactFlow>

      {/* Guided mode scene navigator */}
      {mode === "guided" && scene && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
          role="region"
          aria-label={lang === "fi" ? "Opastettu kierros" : "Guided tour"}
        >
          <div className="bg-[var(--atlas-surface)] backdrop-blur-sm border border-[var(--border)] rounded-xl px-5 py-4 max-w-lg text-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-[var(--atlas-text-muted)] tabular-nums">
                {lang === "fi" ? `Kohtaus ${sceneIdx + 1} / ${GUIDED_SCENES.length}` : `Scene ${sceneIdx + 1} of ${GUIDED_SCENES.length}`}
              </span>
              <button
                onClick={() => { setMode("explore"); closeDetails(); }}
                className="text-[10px] text-[var(--atlas-text-dim)] hover:text-[var(--atlas-text)] transition-colors px-2 py-1 rounded hover:bg-[var(--atlas-edge)] min-h-[28px]"
              >
                {copy.exitGuided}
              </button>
            </div>
            <h3 className="text-sm font-bold text-[var(--atlas-text)] mb-1.5">{t(scene.title, lang)}</h3>
            <p className="text-xs text-[var(--atlas-text-dim)] leading-relaxed mb-3">{t(scene.description, lang)}</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevScene}
                disabled={sceneIdx === 0}
                className="p-2.5 rounded-md hover:bg-[var(--atlas-edge)] transition-colors disabled:opacity-30 text-[var(--atlas-text-dim)] min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={lang === "fi" ? "Edellinen kohtaus" : "Previous scene"}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2" role="tablist" aria-label={lang === "fi" ? "Kohtaukset" : "Scenes"}>
                {GUIDED_SCENES.map((s, i) => (
                  <button
                    key={i}
                    role="tab"
                    onClick={() => setSceneIdx(i)}
                    aria-selected={i === sceneIdx}
                    aria-current={i === sceneIdx ? "step" : undefined}
                    aria-label={`${t(s.title, lang)} (${i + 1}/${GUIDED_SCENES.length})`}
                    className={`w-3 h-3 rounded-full transition-colors ${i === sceneIdx ? "bg-blue-400 ring-2 ring-blue-400/30" : "bg-gray-600 hover:bg-gray-500"}`}
                  />
                ))}
              </div>
              <button
                onClick={nextScene}
                disabled={sceneIdx === GUIDED_SCENES.length - 1}
                className="p-2.5 rounded-md hover:bg-[var(--atlas-edge)] transition-colors disabled:opacity-30 text-[var(--atlas-text-dim)] min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={lang === "fi" ? "Seuraava kohtaus" : "Next scene"}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedNode && (
        <AtlasDetail
          node={selectedNode}
          locale={locale}
          onClose={closeDetails}
          originRef={originElement}
        />
      )}
    </div>
  );
}

// ── Mobile causal stepper ──

function MobileStepper({ locale }: { locale: string }) {
  const lang: Locale = locale === "fi" ? "fi" : "en";
  const [pathKey, setPathKey] = useState<StepperPathKey>("main");
  const [step, setStep] = useState(0);
  const path = STEPPER_PATHS[pathKey];
  const ids = path.ids;
  const currentId = ids[step];
  const node = NODES.find((n) => n.id === currentId);
  const liveRef = useRef<HTMLDivElement>(null);

  if (!node) return null;

  const label = t(node.label, lang);
  const sublabel = node.sublabel ? t(node.sublabel, lang) : undefined;
  const d = localizedDetail(node.detail, lang);
  const stage = LEVEL_TO_STAGE[node.level];
  const band = stage === "ecology" ? ECOLOGY_BAND : STAGE_BANDS.find((b) => b.id === stage);
  const epColor = EVIDENCE_COLORS[node.epistemicLevel];
  const epLabels = EVIDENCE_LABELS[lang] as Record<EpistemicLevel, string>;

  return (
    <div className="bg-[var(--atlas-bg)] rounded-xl border border-[var(--border)] overflow-hidden">
      {/* Path selector */}
      <div
        role="tablist"
        aria-label={lang === "fi" ? "Kausaalipolut" : "Causal pathways"}
        className="flex border-b border-[var(--border)]"
      >
        {(Object.keys(STEPPER_PATHS) as StepperPathKey[]).map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={k === pathKey}
            onClick={() => { setPathKey(k); setStep(0); }}
            className={`flex-1 px-3 py-3 text-xs font-medium transition-colors min-h-[44px] ${
              k === pathKey ? "text-blue-300 border-b-2 border-blue-400 bg-blue-500/10" : "text-[var(--atlas-text-muted)] hover:text-[var(--atlas-text-dim)]"
            }`}
          >
            {t(STEPPER_PATHS[k].label, lang)}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-1 px-4 py-3" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={ids.length}>
        {ids.map((_, i) => (
          <div key={i} className="flex-1 flex items-center">
            <div className={`h-1 w-full rounded-full transition-colors ${i <= step ? "bg-blue-400" : "bg-[var(--atlas-edge)]"}`} />
          </div>
        ))}
      </div>

      {/* Live region for step changes */}
      <div ref={liveRef} aria-live="polite" className="sr-only">
        {lang === "fi" ? `Vaihe ${step + 1}/${ids.length}: ${label}` : `Step ${step + 1}/${ids.length}: ${label}`}
      </div>

      {/* Card */}
      <div className="px-4 pb-4" role="tabpanel">
        <div className="bg-[var(--atlas-surface)] border border-[var(--border)] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[var(--border)]"
              style={{ color: band?.accent, borderColor: `${band?.accent}40` }}
            >
              {band ? t(band.label, lang) : ""}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-[var(--atlas-text-muted)]">
              <span
                className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[8px] font-bold text-white"
                style={{ backgroundColor: epColor }}
              >
                {node.epistemicLevel === "M|C" ? "M" : node.epistemicLevel}
              </span>
              {epLabels[node.epistemicLevel]}
            </span>
          </div>

          <h3 className="text-base font-bold text-[var(--atlas-text)] mb-1">{label}</h3>
          {sublabel && <p className="text-xs text-[var(--atlas-text-dim)] mb-3">{sublabel}</p>}

          {d?.mechanism && (
            <p className="text-[13px] text-[var(--atlas-text-dim)] leading-relaxed mb-3">{d.mechanism}</p>
          )}

          {d?.fdaDevice && (
            <p className="text-xs text-[var(--atlas-text-dim)]">
              <span className="font-semibold text-[var(--atlas-text-dim)]">{lang === "fi" ? "FDA-laite:" : "FDA Device:"}</span> {d.fdaDevice}
            </p>
          )}

          {node.detail?.link && (
            <a href={`/${lang}${node.detail.link}`} className="inline-block text-xs text-blue-400 hover:text-blue-300 mt-2 min-h-[44px] flex items-center">
              {lang === "fi" ? "Lue lisää →" : "Read more →"}
            </a>
          )}
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-[var(--atlas-text-dim)] hover:text-[var(--atlas-text)] hover:bg-[var(--atlas-edge-dim)] transition-colors disabled:opacity-30 min-h-[44px]"
          >
            <ChevronLeft size={14} />
            {lang === "fi" ? "Edellinen" : "Previous"}
          </button>
          <span className="text-xs text-[var(--atlas-text-muted)] font-mono tabular-nums">{step + 1} / {ids.length}</span>
          <button
            onClick={() => setStep((s) => Math.min(ids.length - 1, s + 1))}
            disabled={step === ids.length - 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-[var(--atlas-text-dim)] hover:text-[var(--atlas-text)] hover:bg-[var(--atlas-edge-dim)] transition-colors disabled:opacity-30 min-h-[44px]"
          >
            {lang === "fi" ? "Seuraava" : "Next"}
            <ChevronRight size={14} />
          </button>
        </div>
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
