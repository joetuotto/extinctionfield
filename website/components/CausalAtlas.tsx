"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ReactFlow, ReactFlowProvider, Background, Controls, MiniMap, useReactFlow, MarkerType, type Node, type Edge, type NodeTypes } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { List, Map, Search, Route, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { NODES, EDGES, ALL_STAGES, SUBATLASES, STEPPER_PATHS, LEVEL_TO_STAGE, EVIDENCE_COLORS, EVIDENCE_LABELS, RELATION_LABELS, computeLayout, computeBands, nodesForAtlas, nodesForIntervention, filterAtlasNodes, t, type AtlasId, type CausalMapNode, type Locale, type Stage, type EpistemicLevel } from "@/lib/causalAtlasData";
import AtlasNode from "./atlas/AtlasNode";
import { AtlasDetail } from "./atlas/AtlasDetail";
import { atlasClaimCoverage } from "@/lib/atlasEvidence";
import Link from "next/link";
import { INTERVENTIONS, getIntervention, interventionHref, interventionText } from "@/lib/interventions";

const COPY = {
  en: { subatlas: "Choose a subatlas", search: "Search channels", placeholder: "Name, mechanism or model ID…", stage: "Stage", evidence: "Evidence type", all: "All", graph: "Map", list: "List", guided: "Guided route", clear: "Clear filters", empty: "No channels match these filters.", searchAll: "Search the complete atlas", visible: "channels shown", edges: "connections", instruction: "Select a channel for its mechanism, sources and connections. Scroll to zoom; drag to pan.", route: "Choose a route", previous: "Previous step", next: "Next step", scope: "Shared nodes connect the subatlases. Each node has one description across all views.", language: "Channel descriptions are available in English and Finnish.", relations: "Connection types", navigate: "Open channel", overview: "Explore", step: "Step" },
  fi: { subatlas: "Valitse aliatlas", search: "Etsi vaikutuskanavia", placeholder: "Nimi, mekanismi tai mallitunnus…", stage: "Vaihe", evidence: "Näytön tyyppi", all: "Kaikki", graph: "Kartta", list: "Luettelo", guided: "Opastettu reitti", clear: "Tyhjennä suodattimet", empty: "Näillä rajauksilla ei löytynyt kanavia.", searchAll: "Hae koko atlaksesta", visible: "kanavaa näkyvissä", edges: "yhteyttä", instruction: "Valitse kanava nähdäksesi mekanismin, lähteet ja yhteydet. Vieritä zoomataksesi ja raahaa siirtääksesi karttaa.", route: "Valitse reitti", previous: "Edellinen vaihe", next: "Seuraava vaihe", scope: "Yhteiset solmut yhdistävät aliatlakset. Jokaisella solmulla on sama kuvaus kaikissa näkymissä.", language: "Kanavakuvaukset ovat saatavilla suomeksi ja englanniksi.", relations: "Yhteyksien tyypit", navigate: "Avaa kanava", overview: "Tutki", step: "Vaihe" },
  ja: { subatlas: "サブアトラスを選択", search: "経路を検索", graph: "地図", list: "一覧", guided: "ガイド経路", clear: "フィルターを解除", empty: "一致する経路がありません。", all: "すべて", stage: "段階", evidence: "証拠の種類", language: "経路の説明は英語とフィンランド語で表示されます。", overview: "探索" },
  fr: { subatlas: "Choisir un sous-atlas", search: "Rechercher des voies", graph: "Carte", list: "Liste", guided: "Parcours guidé", clear: "Effacer les filtres", empty: "Aucune voie ne correspond aux filtres.", all: "Tous", stage: "Étape", evidence: "Type de preuve", language: "Les descriptions des voies sont disponibles en anglais et en finnois.", overview: "Explorer" },
  ko: { subatlas: "하위 아틀라스 선택", search: "경로 검색", graph: "지도", list: "목록", guided: "가이드 경로", clear: "필터 초기화", empty: "일치하는 경로가 없습니다.", all: "모두", stage: "단계", evidence: "증거 유형", language: "경로 설명은 영어와 핀란드어로 제공됩니다.", overview: "탐색" },
};
function copyFor(locale: string) { return { ...COPY.en, ...(COPY[locale as keyof typeof COPY] ?? {}) }; }
const controlClass = "min-h-11 rounded-lg border border-[var(--border)] bg-[var(--atlas-surface)] px-3 py-2 text-sm text-[var(--atlas-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400";

function StageBandNode({ data }: { data: Record<string, unknown> }) {
  return <div className="pointer-events-none rounded-xl border border-[var(--border)]" style={{ width: data.width as number, height: data.height as number, background: data.color as string }}><div className="px-3 py-3 text-xs font-semibold" style={{ color: data.accent as string }}>{data.label as string}</div></div>;
}
const nodeTypes: NodeTypes = { atlasNode: AtlasNode, stageBand: StageBandNode };
const edgeStyles = {
  causal: { stroke: "#64748B" }, modulates: { stroke: "#A78BFA", strokeDasharray: "7 4" }, differential: { stroke: "#4ADE80", strokeDasharray: "5 3" },
  inference: { stroke: "#94A3B8", strokeDasharray: "2 5" }, bridge: { stroke: "#FBBF24", strokeDasharray: "10 5" }, derived: { stroke: "#38BDF8" }, feedback: { stroke: "#FB923C", strokeDasharray: "4 3" }, association: { stroke: "#94A3B8", strokeDasharray: "2 5" },
};
function GraphView({ visible, selectedId, lang, onOpen }: { visible: CausalMapNode[]; selectedId: string | null; lang: Locale; onOpen: (id: string, element?: HTMLElement) => void }) {
  const { fitView } = useReactFlow();
  const { nodes, edges } = useMemo(() => {
    const positions = computeLayout(visible);
    const ids = new Set(visible.map(n => n.id));
    const bands: Node[] = computeBands(visible).map(b => ({ id: `band-${b.stage}`, type: "stageBand", position: { x: b.x, y: b.y }, width: b.width, height: b.height, data: { ...b.band, label: t(b.band.label, lang), width: b.width, height: b.height }, selectable: false, focusable: false, draggable: false, style: { zIndex: -10 } }));
    const nodes: Node[] = visible.map(n => ({ id: n.id, type: "atlasNode", position: positions[n.id], width: 210, height: 92, data: { label: t(n.label, lang), sublabel: n.sublabel ? t(n.sublabel, lang) : undefined, epistemicLevel: n.epistemicLevel, epistemicLabel: EVIDENCE_LABELS[lang][n.epistemicLevel], stageAccent: ALL_STAGES.find(s => s.id === LEVEL_TO_STAGE[n.level])?.accent, selected: n.id === selectedId, highlighted: n.id === selectedId, dimmed: false, nodeId: n.id, onActivate: onOpen } }));
    const edges: Edge[] = EDGES.filter(e => ids.has(e.from) && ids.has(e.to)).map(e => ({ id: `${e.from}->${e.to}`, source: e.from, target: e.to, type: "smoothstep", style: { ...edgeStyles[e.relation], strokeWidth: selectedId && (e.from === selectedId || e.to === selectedId) ? 2.5 : 1.1 }, markerEnd: { type: MarkerType.ArrowClosed, color: edgeStyles[e.relation].stroke }, ariaLabel: `${e.from} → ${e.to}: ${t(RELATION_LABELS[e.relation], lang)}` }));
    return { nodes: [...bands, ...nodes], edges };
  }, [visible, selectedId, lang, onOpen]);
  useEffect(() => {
    if (!visible.length) return;
    const timer = setTimeout(() => { void fitView({ nodes: selectedId && visible.some(n => n.id === selectedId) ? [{ id: selectedId }] : visible.map(n => ({ id: n.id })), padding: 0.18, minZoom: 0.04, maxZoom: 1, duration: 250 }); }, 80);
    return () => clearTimeout(timer);
  }, [visible, selectedId, fitView]);
  return <div className="h-[65vh] min-h-[420px]" data-testid="atlas-graph"><ReactFlow fitView fitViewOptions={{ minZoom: 0.04, maxZoom: 1, padding: 0.18 }} nodes={nodes} edges={edges} onNodeClick={(event, node) => { if (node.type === "atlasNode") onOpen(node.id, (event.target as HTMLElement).closest<HTMLElement>("[role=button]") ?? event.target as HTMLElement); }} nodeTypes={nodeTypes} minZoom={0.04} maxZoom={2.5} nodesDraggable={false} nodesConnectable={false} nodesFocusable={false} edgesFocusable={false} elementsSelectable={false} deleteKeyCode={null} proOptions={{ hideAttribution: true }}>
    <Background color="var(--atlas-dot)" gap={25} />
    <Controls showInteractive={false} fitViewOptions={{ nodes: visible.map(n => ({ id: n.id })), minZoom: 0.04, maxZoom: 1 }} className="[&>button]:!w-11 [&>button]:!h-11" />
    <MiniMap nodeColor={n => n.type === "stageBand" ? "transparent" : EVIDENCE_COLORS[n.data.epistemicLevel as EpistemicLevel]} pannable zoomable />
  </ReactFlow></div>;
}

export function CausalAtlas({ locale }: { locale: string }) {
  const lang: Locale = locale === "fi" ? "fi" : "en";
  const copy = copyFor(locale);
  const [atlasId, setAtlasId] = useState<AtlasId>("all");
  const [profileId, setProfileId] = useState("");
  const [view, setView] = useState<"graph" | "list">("graph");
  const [mode, setMode] = useState<"explore" | "guided">("explore");
  const [pathKey, setPathKey] = useState("main");
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<Stage | "all">("all");
  const [evidence, setEvidence] = useState<EpistemicLevel | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [originElement, setOriginElement] = useState<HTMLElement | null>(null);
  const path = STEPPER_PATHS[pathKey];
  const atlas = SUBATLASES.find(a => a.id === atlasId)!;
  const selected = NODES.find(n => n.id === selectedId);

  useEffect(() => {
    const readUrl = () => {
      const p = new URLSearchParams(window.location.search);
      const id = p.get("atlas") as AtlasId;
      const chosen = SUBATLASES.some(a => a.id === id) ? id : "all";
      const node = NODES.find(n => n.id === p.get("node"));
      const requestedProfile = p.get("profile");
      const profile = requestedProfile === "all" || getIntervention(requestedProfile) ? requestedProfile! : "";
      setProfileId(node && profile && !nodesForIntervention(profile).some(n => n.id === node.id) ? "" : profile);
      setAtlasId(profile || (node && !nodesForAtlas(chosen).some(n => n.id === node.id)) ? "all" : chosen);
      setSelectedId(node?.id ?? null);
      setMode("explore"); setQuery(""); setStage("all"); setEvidence("all");
      const requestedView = p.get("view");
      setView(requestedView === "list" || (requestedView !== "graph" && window.innerWidth < 768) ? "list" : "graph");
    };
    readUrl();
    window.addEventListener("popstate", readUrl);
    return () => window.removeEventListener("popstate", readUrl);
  }, []);
  const updateUrl = useCallback((values: Record<string, string | null>) => {
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries(values)) { if (value) url.searchParams.set(key, value); else url.searchParams.delete(key); }
    window.history.replaceState(null, "", url);
  }, []);
  const clearFilters = () => { setQuery(""); setStage("all"); setEvidence("all"); };
  const changeAtlas = (id: AtlasId) => {
    setAtlasId(id); setProfileId(""); setMode("explore"); clearFilters(); setSelectedId(null);
    updateUrl({ atlas: id === "all" ? null : id, node: null, profile: null });
  };
  const openNode = useCallback((id: string, element?: HTMLElement) => {
    if (!NODES.some(n => n.id === id)) return;
    if (element) setOriginElement(element);
    setSelectedId(id);
    updateUrl({ node: id });
  }, [updateUrl]);
  const closeDetails = useCallback(() => { setSelectedId(null); updateUrl({ node: null }); }, [updateUrl]);
  const followConnection = (id: string) => {
    if (profileId && !nodesForIntervention(profileId).some(n => n.id === id)) { setProfileId(""); updateUrl({ profile: null }); }
    if (!nodesForAtlas(atlasId).some(n => n.id === id)) { setAtlasId("all"); updateUrl({ atlas: null }); }
    setMode("explore"); clearFilters(); openNode(id);
  };
  const visible = useMemo(() => mode === "guided" ? path.ids.map(id => NODES.find(n => n.id === id)!) : filterAtlasNodes(profileId ? nodesForIntervention(profileId) : nodesForAtlas(atlasId), query, stage, evidence), [atlasId, profileId, query, stage, evidence, mode, path]);
  const edgeCount = useMemo(() => { const ids = new Set(visible.map(n => n.id)); return EDGES.filter(e => ids.has(e.from) && ids.has(e.to)).length; }, [visible]);
  const hasFilters = query !== "" || stage !== "all" || evidence !== "all";
  const claimCoverage = useMemo(() => atlasClaimCoverage(visible), [visible]);
  const usedLevels = [...new Set(NODES.map(n => n.epistemicLevel))];
  const guideStep = (index: number) => { setStep(index); openNode(path.ids[index]); };

  return <div className="relative rounded-xl border border-[var(--border)] bg-[var(--atlas-bg)] text-[var(--atlas-text)]" data-testid="causal-atlas">
    <div className="space-y-4 border-b border-[var(--border)] p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(220px,320px)_1fr]">
        <label className="text-xs font-semibold">{copy.subatlas}
          <select value={atlasId} onChange={e => changeAtlas(e.target.value as AtlasId)} className={`${controlClass} mt-1 block w-full`}>
            {SUBATLASES.map(a => <option key={a.id} value={a.id}>{t(a.title, lang)} ({nodesForAtlas(a.id).length})</option>)}
          </select>
        </label>
        <div><h2 className="text-base font-semibold">{t(atlas.title, lang)}</h2><p className="mt-1 text-sm leading-relaxed text-[var(--atlas-text-dim)]">{t(atlas.description, lang)}</p></div>
      </div>
      <div className="space-y-2 rounded-lg border border-[var(--border)] p-3" data-testid="atlas-intervention-filter">
        <label className="block text-xs font-semibold">{lang === "fi" ? "Farmakologiset kokeet yli aliatlasten" : "Pharmacological experiments across subatlases"}<select className={`${controlClass} mt-1 block w-full`} value={profileId} onChange={event => { const id = event.target.value; setProfileId(id); setAtlasId("all"); setMode("explore"); clearFilters(); setSelectedId(null); updateUrl({ profile: id || null, atlas: null, node: null }); }}>
          <option value="">{lang === "fi" ? "Ei koerajausta" : "No experiment filter"}</option><option value="all">{lang === "fi" ? "Kaikki kahdeksan koeprofiilia" : "All eight experimental profiles"}</option>{INTERVENTIONS.profiles.map(profile => <option key={profile.id} value={profile.id}>{interventionText(profile.title, locale)}</option>)}
        </select></label>
        {profileId && <p className="text-xs leading-relaxed text-[var(--atlas-text-dim)]">{lang === "fi" ? "Näkymä säilyttää profiilin nimetyt kanavat ja premissiketjun yhteisestä kartasta. Yhteyden vaikutussuunta ja koerajaus näkyvät kanavan tiedoissa." : "This view retains the profile’s named channels and premise chain from the shared graph. Connection signs and experimental scope appear in channel details."}</p>}
        {getIntervention(profileId) && <Link className="inline-flex min-h-11 items-center text-xs text-blue-400 hover:underline" href={interventionHref(locale, profileId)}>{lang === "fi" ? "Avaa koeprofiili ja päätepisteet" : "Open the experiment and endpoints"} →</Link>}
      </div>
      <p className="text-xs text-[var(--atlas-text-dim)]">{copy.scope}{locale !== "en" && locale !== "fi" ? ` ${copy.language}` : ""}</p>
      <details className="rounded-lg border border-[var(--border)] px-3 text-xs text-[var(--atlas-text-dim)]" data-testid="atlas-claim-coverage">
        <summary className="min-h-11 cursor-pointer content-center">{lang === "fi" ? "Miten tämän näkymän näyttö on jäsennetty?" : "How is the evidence in this view organized?"}</summary>
        <p className="mb-2 leading-relaxed">{lang === "fi"
          ? `${claimCoverage.linkedNodes} / ${claimCoverage.totalNodes} kanavalla on väiteliitos; ${claimCoverage.evidenceLinkedNodes} kanavan väitteisiin on liitetty tutkimuksia. Näkymässä on ${claimCoverage.claims} eri väitettä ja ${claimCoverage.evidenceRelations} tutkimus–väite-suhdetta.`
          : `${claimCoverage.linkedNodes} / ${claimCoverage.totalNodes} channels have claim bindings; claims in ${claimCoverage.evidenceLinkedNodes} channels have study relations. This view contains ${claimCoverage.claims} distinct claims and ${claimCoverage.evidenceRelations} study–claim relations.`}</p>
        <p className="mb-3 leading-relaxed">{lang === "fi" ? "Luvut kuvaavat tiedon jäsentämistä. Sama tutkimus voi liittyä useaan väitteeseen, eivätkä luvut mittaa riippumattomia kokeita tai kalibroituja vaikutuksia. Avaa kanava nähdäksesi täsmällisen väitteen ja rajaukset." : "These counts describe curation. A study may relate to several claims; the counts do not measure independent experiments or calibrated effects. Open a channel to inspect the precise claim and its scope."}</p>
      </details>
      <div className="flex flex-wrap gap-2" role="group" aria-label={copy.overview}>
        <button type="button" className={controlClass} aria-pressed={view === "graph"} onClick={() => { setView("graph"); updateUrl({ view: "graph" }); }}><Map className="mr-1 inline" size={15} />{copy.graph}</button>
        <button type="button" className={controlClass} aria-pressed={view === "list"} onClick={() => { setView("list"); updateUrl({ view: "list" }); }}><List className="mr-1 inline" size={15} />{copy.list}</button>
        <button type="button" className={controlClass} aria-pressed={mode === "guided"} onClick={() => { if (mode === "guided") { setMode("explore"); } else {
          setProfileId(""); updateUrl({ profile: null });
          const key = Object.keys(STEPPER_PATHS).find(k => STEPPER_PATHS[k].atlasId === atlasId) ?? "main";
          setPathKey(key); setAtlasId(STEPPER_PATHS[key].atlasId); updateUrl({ atlas: STEPPER_PATHS[key].atlasId }); setMode("guided");
        } clearFilters(); setStep(0); closeDetails(); }}><Route className="mr-1 inline" size={15} />{copy.guided}</button>
      </div>
      {mode === "explore" ? <div className="flex flex-wrap items-end gap-3">
        <label className="min-w-0 flex-1 text-xs font-semibold">{copy.search}<div className="relative mt-1"><Search size={15} className="absolute left-3 top-3.5" /><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={copy.placeholder} className={`${controlClass} w-full min-w-[190px] pl-9`} /></div></label>
        <label className="text-xs font-semibold">{copy.stage}<select className={`${controlClass} mt-1 block max-w-full`} value={stage} onChange={e => setStage(e.target.value as Stage | "all")}><option value="all">{copy.all}</option>{ALL_STAGES.map(s => <option key={s.id} value={s.id}>{t(s.label, lang)}</option>)}</select></label>
        <label className="text-xs font-semibold">{copy.evidence}<select className={`${controlClass} mt-1 block max-w-[270px]`} value={evidence} onChange={e => setEvidence(e.target.value as EpistemicLevel | "all")}><option value="all">{copy.all}</option>{usedLevels.map(l => <option key={l} value={l}>{l}: {EVIDENCE_LABELS[lang][l]}</option>)}</select></label>
        {hasFilters && <button className={controlClass} onClick={clearFilters}><RotateCcw size={14} className="mr-1 inline" />{copy.clear}</button>}
      </div> : <div className="flex flex-wrap items-end gap-3">
        <label className="text-xs font-semibold">{copy.route}<select value={pathKey} className={`${controlClass} mt-1 block`} onChange={e => { setPathKey(e.target.value); setAtlasId(STEPPER_PATHS[e.target.value].atlasId); updateUrl({ atlas: STEPPER_PATHS[e.target.value].atlasId }); setStep(0); closeDetails(); }}>{Object.entries(STEPPER_PATHS).map(([key, p]) => <option key={key} value={key}>{t(p.label, lang)}</option>)}</select></label>
        <button className={controlClass} disabled={step === 0} onClick={() => guideStep(step - 1)} aria-label={copy.previous}><ChevronLeft size={18} /></button>
        <button className={controlClass} onClick={() => openNode(path.ids[step])}>{copy.step} {step + 1}/{path.ids.length}: {t(NODES.find(n => n.id === path.ids[step])!.label, lang)}</button>
        <button className={controlClass} disabled={step === path.ids.length - 1} onClick={() => guideStep(step + 1)} aria-label={copy.next}><ChevronRight size={18} /></button>
      </div>}
      <div role="status" aria-live="polite" className="text-xs text-[var(--atlas-text-dim)]">{visible.length} / {NODES.length} {copy.visible} · {edgeCount} {copy.edges}</div>
    </div>
    {visible.length === 0 ? <div className="space-y-3 p-8 text-center"><p>{copy.empty}</p><button className={controlClass} onClick={clearFilters}>{copy.clear}</button>{atlasId !== "all" && <button className={`${controlClass} ml-2`} onClick={() => { setAtlasId("all"); setStage("all"); setEvidence("all"); updateUrl({ atlas: null }); }}>{copy.searchAll}</button>}</div> : view === "graph" ? <ReactFlowProvider><GraphView visible={visible} selectedId={selectedId} lang={lang} onOpen={openNode} /></ReactFlowProvider> :
      <div className="max-h-[70vh] overflow-y-auto p-4" data-testid="atlas-list"><ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{visible.map(n => <li key={n.id}><button className="min-h-[98px] w-full rounded-lg border border-[var(--border)] bg-[var(--atlas-surface)] p-3 text-left hover:border-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400" onClick={e => openNode(n.id, e.currentTarget)} aria-expanded={selectedId === n.id}><span className="block text-[11px] text-[var(--atlas-text-dim)]">{t(ALL_STAGES.find(s => s.id === LEVEL_TO_STAGE[n.level])!.label, lang)} · {n.epistemicLevel}</span><span className="mt-1 block text-sm font-semibold">{t(n.label, lang)}</span><span className="mt-1 block text-xs text-[var(--atlas-text-dim)]">{EVIDENCE_LABELS[lang][n.epistemicLevel]}</span></button></li>)}</ul></div>}
    <div className="border-t border-[var(--border)] p-4"><p className="text-xs text-[var(--atlas-text-dim)]">{copy.instruction}</p><details className="mt-3 text-xs"><summary className="min-h-11 cursor-pointer py-3 font-semibold">{copy.relations}</summary><ul className="grid gap-2 sm:grid-cols-2">{Object.entries(RELATION_LABELS).map(([key, label]) => <li key={key} className="flex items-center gap-2"><svg width="32" height="12" aria-hidden="true"><line x1="0" x2="32" y1="6" y2="6" {...edgeStyles[key as keyof typeof edgeStyles]} strokeWidth="2" /></svg>{t(label, lang)}</li>)}</ul></details></div>
    {selected && <AtlasDetail node={selected} locale={locale} onClose={closeDetails} originRef={originElement} onNavigate={followConnection} onAtlasChange={id => { changeAtlas(id); openNode(selected.id); }} />}
  </div>;
}
