"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, GitBranch, List, Network, RotateCcw, X } from "lucide-react";
import type { ChainEdge, ChainNode } from "@/lib/types";
import {
  CANONICAL_CAUSAL_EDGES as EDGES,
  CANONICAL_CAUSAL_NODES as NODES,
  CANONICAL_NODE_SUPPLEMENTS,
  getCanonicalCalibrationLabel,
  getCanonicalLevelTitle,
  getCanonicalNodeLabel,
} from "@/lib/causalGraphView";
import { CHAIN_EPISTEMIC_COLORS, getChainEpistemicLabel } from "@/lib/epistemicConstants";
import { pickCopy } from "@/lib/i18n";
import { StudyCitation } from "./StudyCitation";
import { InlineReferenceText } from "./InlineReferenceText";
import styles from "./BermCausalDiagram.module.css";

const COPY = {
  fi: { aria: "BERM-kausaaliketjukaavio", graph: "Kaavio", edges: "Kaikki yhteydet", route: "Kalsium, redox ja hormonituotanto", reset: "Nollaa korostus", select: "Korosta solmun yhteydet", all: "Kaikki solmut", nodes: "solmua", connections: "suunnattua yhteyttä", help: "Valitse solmu nähdäksesi sen mekanismin, lähteet sekä tulo- ja lähtöyhteydet. Korostus auttaa seuraamaan yhteyksiä; kaikki solmut pysyvät näkyvissä.", integration: "Kalsium–redox-varanto, kello ja StAR tarkentavat nykyistä hormonituotannon haaraa.", studies: "Tutkimukset ja koetyypit", incoming: "Tuloyhteydet", outgoing: "Lähtöyhteydet", none: "Ei rekisteröityjä yhteyksiä tähän suuntaan.", mechanism: "Mekanismi ja mallirooli", references: "Tutkimusankkurit", close: "Sulje tiedot", detail: "Avaa solmun tiedot", calibration: "Kalibrointi", quantitative: "Muodollinen yhteys", condition: "Malliin tallennettu tarkistusehto", atlas: "Avaa laajassa kausaaliatlaksessa", context: "Tutki kokonaisuutta", fallback: "Solmujen kuvaukset ovat tässä näkymässä englanniksi.", tag: "Ca²⁺ · glutationivaranto · StAR", stages: "Tasot jäsentävät mallia; yhteydet voivat ohittaa tasoja ja yhdistää saman tason solmuja." },
  en: { aria: "BERM causal chain diagram", graph: "Diagram", edges: "All connections", route: "Calcium, redox and hormone production", reset: "Clear highlight", select: "Highlight a node’s connections", all: "All nodes", nodes: "nodes", connections: "directed connections", help: "Select a node to inspect its mechanism, sources, incoming and outgoing connections. Highlighting helps trace connections while every node stays visible.", integration: "Calcium–redox reserve, the clock and StAR refine the existing hormone production branch.", studies: "Studies and experiment types", incoming: "Incoming connections", outgoing: "Outgoing connections", none: "No registered connections in this direction.", mechanism: "Mechanism and model role", references: "Research anchors", close: "Close details", detail: "Open node details", calibration: "Calibration", quantitative: "Formal relationship", condition: "Recorded model check", atlas: "Open in the full causal atlas", context: "Explore the context", fallback: "Node descriptions are shown in English in this view.", tag: "Ca²⁺ · glutathione reserve · StAR", stages: "Levels organize the model; connections may skip levels or join nodes within a level." },
  ja: { aria: "BERM因果連鎖図", graph: "図", edges: "すべての接続", route: "カルシウム、酸化還元とホルモン産生", reset: "強調を解除", select: "ノードの接続を強調", all: "すべてのノード", nodes: "ノード", connections: "有向接続", help: "ノードを選ぶと、機構、出典、入力と出力の接続を確認できます。強調してもすべてのノードは表示されます。", integration: "カルシウム・酸化還元予備能、時計とStARが既存のホルモン産生経路を詳しく説明します。", studies: "研究と実験の種類", incoming: "入力接続", outgoing: "出力接続", none: "この方向に登録された接続はありません。", mechanism: "機構とモデル内の役割", references: "研究上の根拠", close: "詳細を閉じる", detail: "ノードの詳細を開く", calibration: "校正", quantitative: "形式的関係", condition: "記録されたモデル検証条件", atlas: "全体の因果アトラスで開く", context: "関連情報を見る", fallback: "この表示ではノードの説明は英語です。", tag: "Ca²⁺ · グルタチオン予備能 · StAR", stages: "階層はモデルを整理します。接続は階層を飛び越えたり、同じ階層内を結ぶこともあります。" },
  fr: { aria: "Diagramme causal BERM", graph: "Diagramme", edges: "Toutes les connexions", route: "Calcium, état redox et production hormonale", reset: "Effacer la sélection", select: "Surligner les connexions d’un nœud", all: "Tous les nœuds", nodes: "nœuds", connections: "connexions orientées", help: "Sélectionnez un nœud pour consulter son mécanisme, ses sources et ses connexions entrantes et sortantes. Tous les nœuds restent visibles pendant le surlignage.", integration: "La réserve calcium–redox, l’horloge et StAR précisent la branche existante de production hormonale.", studies: "Études et types d’expériences", incoming: "Connexions entrantes", outgoing: "Connexions sortantes", none: "Aucune connexion enregistrée dans ce sens.", mechanism: "Mécanisme et rôle dans le modèle", references: "Ancrages expérimentaux", close: "Fermer les détails", detail: "Ouvrir les détails du nœud", calibration: "Calibration", quantitative: "Relation formelle", condition: "Condition de vérification enregistrée", atlas: "Ouvrir dans l’atlas causal complet", context: "Explorer le contexte", fallback: "Les descriptions des nœuds sont affichées en anglais dans cette vue.", tag: "Ca²⁺ · réserve de glutathion · StAR", stages: "Les niveaux organisent le modèle ; les connexions peuvent sauter des niveaux ou relier des nœuds du même niveau." },
  ko: { aria: "BERM 인과 사슬 도표", graph: "도표", edges: "모든 연결", route: "칼슘, 산화환원과 호르몬 생산", reset: "강조 해제", select: "노드의 연결 강조", all: "모든 노드", nodes: "노드", connections: "방향 연결", help: "노드를 선택하면 기전, 출처 및 들어오고 나가는 연결을 확인할 수 있습니다. 강조 중에도 모든 노드가 표시됩니다.", integration: "칼슘·산화환원 예비력, 생체시계와 StAR가 기존 호르몬 생산 경로를 구체화합니다.", studies: "연구와 실험 유형", incoming: "들어오는 연결", outgoing: "나가는 연결", none: "이 방향으로 등록된 연결이 없습니다.", mechanism: "기전과 모델 내 역할", references: "연구 근거", close: "상세 닫기", detail: "노드 상세 열기", calibration: "보정", quantitative: "형식적 관계", condition: "기록된 모델 검증 조건", atlas: "전체 인과 지도에서 열기", context: "관련 내용 살펴보기", fallback: "이 보기에서는 노드 설명이 영어로 표시됩니다.", tag: "Ca²⁺ · 글루타티온 예비력 · StAR", stages: "단계는 모델을 정리합니다. 연결은 단계를 건너뛰거나 같은 단계의 노드를 연결할 수 있습니다." },
};

const NODE_MAP = new Map(NODES.map(node => [node.id, node]));
const STEROID_ROUTE = new Set([
  "LINDGREN_METRIC_DRIVE", "BERM_L2_BRIDGE", "A_VGCC_ROS", "RECEPTOR_STATE_MEMORY",
  "CIRCADIAN_COORDINATION", "HPA_HPG", "HORMONE_TARGET_RESPONSE", "MALE_STEROIDOGENESIS",
  "ANDROGEN_BINDING_AVAILABILITY", "ANDROGEN_RECEPTOR_SIGNAL", "MALE_SPERM", "COUPLE_FECUNDABILITY", "ASFR", "TFR",
]);
type Box = { x: number; y: number; w: number; h: number };
type Geometry = { width: number; height: number; boxes: Record<string, Box> };
const edgeName = (edge: ChainEdge, locale: string) => locale === "fi" ? edge.label : edge.label_en ?? edge.label;
const localized = (fi: string | undefined, en: string | undefined, locale: string) => (locale === "fi" ? fi : en ?? fi) ?? "";

// Route through the outer gutters, so long-range connections do not cross card text.
function connectionPath(a: Box, b: Box, index: number, width: number) {
  const sameRow = Math.abs(a.y - b.y) < 5;
  if (sameRow && Math.abs(a.x - b.x) < Math.max(a.w, b.w) + 40) {
    const right = a.x < b.x;
    return `M ${right ? a.x + a.w : a.x} ${a.y + a.h / 2} L ${right ? b.x : b.x + b.w} ${b.y + b.h / 2}`;
  }
  const left = (a.x + b.x) / 2 < width / 2;
  const lane = left ? 6 + (index % 5) * 3 : width - 6 - (index % 5) * 3;
  const ax = left ? a.x : a.x + a.w;
  const bx = left ? b.x : b.x + b.w;
  const ay = a.y + a.h / 2, by = b.y + b.h / 2;
  return `M ${ax} ${ay} C ${lane} ${ay} ${lane} ${ay} ${lane} ${ay + Math.sign(by - ay) * 12} L ${lane} ${by - Math.sign(by - ay) * 12} C ${lane} ${by} ${lane} ${by} ${bx} ${by}`;
}

function NodeDetails({ node, locale, onSelect, onClose }: { node: ChainNode; locale: string; onSelect: (id: string) => void; onClose: () => void }) {
  const c = pickCopy(COPY, locale);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  useEffect(() => { dialog.current?.showModal(); }, []);
  useEffect(() => {
    if (dialog.current?.open) {
      dialog.current.scrollTop = 0;
      closeButton.current?.focus();
    }
  }, [node.id]);
  const supplement = CANONICAL_NODE_SUPPLEMENTS[node.id];
  return <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId} onClose={onClose}>
    <div className={styles.dialogHeader}>
      <div><span className={styles.hint}>{getChainEpistemicLabel(node.epistemicLevel, locale)}</span><h4 id={titleId}>{getCanonicalNodeLabel(node.id, locale)}</h4></div>
      <button ref={closeButton} type="button" className={styles.closeButton} onClick={() => dialog.current?.close()} aria-label={c.close}><X size={18} aria-hidden="true" /></button>
    </div>
    <div className={styles.dialogBody}>
      <section><h5>{c.mechanism}</h5><p><InlineReferenceText text={localized(node.mechanism, node.mechanism_en, locale)} locale={locale} /></p></section>
      <p><strong>{c.calibration}: </strong>{getCanonicalCalibrationLabel(node.id, locale)}</p>
      {node.quantitative && <section><h5>{c.quantitative}</h5><pre>{localized(node.quantitative, node.quantitative_en, locale)}</pre></section>}
      {(["incoming", "outgoing"] as const).map(direction => {
        const edges = EDGES.filter(edge => direction === "incoming" ? edge.to === node.id : edge.from === node.id);
        return <section key={direction}><h5>{c[direction]} ({edges.length})</h5>{edges.length ? <ul className={styles.relations}>{edges.map(edge => {
          const id = direction === "incoming" ? edge.from : edge.to;
          return <li key={`${edge.from}-${edge.to}`}><button type="button" className={styles.edgeButton} onClick={() => onSelect(id)}>{direction === "incoming" ? "← " : "→ "}{getCanonicalNodeLabel(id, locale)}</button><small>{edgeName(edge, locale)}</small></li>;
        })}</ul> : <p>{c.none}</p>}</section>;
      })}
      {node.keyReferences.length > 0 && <section><h5>{c.references}</h5><ul className={styles.references}>{node.keyReferences.map(ref => <li key={ref.referenceId}>
        <StudyCitation referenceId={ref.referenceId!} locale={locale} label={ref.authors} />
        <p>{ref.title}</p><p className={styles.hint}>{localized(ref.keyFinding, ref.keyFinding_en, locale)}</p>
      </li>)}</ul></section>}
      {supplement && <section><h5>{c.context}</h5><ul className={styles.references}>{supplement.links.map(link => <li key={link.href}><Link href={`/${locale}${link.href}`}>{localized(link.label.fi, link.label.en, locale)} →</Link></li>)}</ul></section>}
      {node.falsificationCondition && <details><summary>{c.condition}</summary><p>{localized(node.falsificationCondition, node.falsificationCondition_en, locale)}</p></details>}
      <Link href={`/${locale}/map?node=${node.id}`}>{c.atlas} →</Link>
    </div>
  </dialog>;
}

export default function BermCausalDiagram({ locale = "fi" }: { locale?: string }) {
  const c = pickCopy(COPY, locale);
  const uid = useId().replaceAll(":", "");
  const [view, setView] = useState<"graph" | "edges">("graph");
  const [focus, setFocus] = useState("");
  const [route, setRoute] = useState(false);
  const [hover, setHover] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>());
  const [geometry, setGeometry] = useState<Geometry>({ width: 0, height: 0, boxes: {} });
  const groups = useMemo(() => [...new Set(NODES.map(n => n.level))].sort((a, b) => a - b).map(level => ({
    level, nodes: NODES.filter(n => n.level === level).sort((a, b) => a.id === "LINDGREN_METRIC_DRIVE" ? -1 : b.id === "LINDGREN_METRIC_DRIVE" ? 1 : 0),
  })), []);
  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;
    let frame = 0;
    const measure = () => {
      const base = graph.getBoundingClientRect();
      const boxes: Record<string, Box> = {};
      for (const [id, el] of nodeRefs.current) {
        const r = el.getBoundingClientRect();
        boxes[id] = { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height };
      }
      const next = { width: base.width, height: base.height, boxes };
      setGeometry(prev => JSON.stringify(prev) === JSON.stringify(next) ? prev : next);
    };
    const observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); });
    observer.observe(graph);
    nodeRefs.current.forEach(el => observer.observe(el));
    frame = requestAnimationFrame(measure);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [locale, view]);
  const active = hover || focus;
  const highlightedEdges = EDGES.map(edge => active ? edge.from === active || edge.to === active : route && STEROID_ROUTE.has(edge.from) && STEROID_ROUTE.has(edge.to));
  const highlightedNodes = new Set<string>();
  if (active) highlightedNodes.add(active);
  EDGES.forEach((edge, i) => { if (highlightedEdges[i]) { highlightedNodes.add(edge.from); highlightedNodes.add(edge.to); } });
  const openNode = (id: string) => { setFocus(id); setRoute(false); setSelected(id); };
  const selectedNode = selected ? NODE_MAP.get(selected) : undefined;
  return <section className={styles.root} aria-label={c.aria} lang={locale}>
    <div className={styles.controls}>
      <div className={styles.toolbar}>
        <div className={styles.viewSwitch}>
          <button type="button" className={styles.control} aria-pressed={view === "graph"} onClick={() => setView("graph")}><Network size={16} aria-hidden="true" />{c.graph}</button>
          <button type="button" className={styles.control} aria-pressed={view === "edges"} onClick={() => setView("edges")}><List size={16} aria-hidden="true" />{c.edges}</button>
        </div>
        <div className={styles.summary}><strong>{NODES.length} <span>{c.nodes}</span></strong><span>{EDGES.length} {c.connections}</span></div>
      </div>
      <p className={styles.hint}>{c.help} {c.stages}</p>
      {!["fi", "en"].includes(locale) && <p role="note" className={styles.hint}>{c.fallback}</p>}
      <div className={styles.focusControls}>
        <label className={styles.selectLabel}>{c.select}<select className={styles.select} value={focus} onChange={e => { setFocus(e.target.value); setRoute(false); }}><option value="">{c.all}</option>{NODES.map(n => <option key={n.id} value={n.id}>{getCanonicalNodeLabel(n.id, locale)}</option>)}</select></label>
        <div className={styles.routeControls}>
          <button type="button" className={styles.routeButton} aria-pressed={route} onClick={() => { setRoute(!route); setFocus(""); setHover(""); }}><GitBranch size={16} aria-hidden="true" />{c.route}</button>
          {(focus || route) && <button type="button" className={styles.resetButton} onClick={() => { setFocus(""); setRoute(false); setHover(""); }}><RotateCcw size={14} aria-hidden="true" />{c.reset}</button>}
        </div>
      </div>
      <div className={styles.integration}><span>{c.integration}</span><Link href={`/${locale}/biology/calcium-redox-steroidogenesis`}>{c.studies}<ArrowUpRight size={14} aria-hidden="true" /></Link></div>
    </div>
    <div className={styles.legend}>{[...new Set(NODES.map(n => n.epistemicLevel))].map(level => <span key={level} style={{ "--node-color": CHAIN_EPISTEMIC_COLORS[level] } as CSSProperties}><b>{level}</b>{getChainEpistemicLabel(level, locale)}</span>)}</div>
    {view === "graph" ? <div ref={graphRef} className={styles.graph} data-testid="causal-graph">
      <svg className={styles.wires} aria-hidden="true" viewBox={`0 0 ${geometry.width || 1} ${geometry.height || 1}`} preserveAspectRatio="none">
        <defs><marker id={`${uid}-arrow`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="context-stroke" /></marker></defs>
        {EDGES.map((edge, i) => {
          const a = geometry.boxes[edge.from], b = geometry.boxes[edge.to];
          if (!a || !b) return null;
          const highlighted = highlightedEdges[i];
          return <path key={`${edge.from}-${edge.to}`} data-edge={`${edge.from}->${edge.to}`} d={connectionPath(a, b, i, geometry.width)} fill="none" stroke={highlighted ? "var(--accent)" : "var(--foreground-muted)"} strokeWidth={highlighted ? 1.6 : .8} opacity={highlighted ? .78 : active || route ? .04 : .14} strokeDasharray={edge.priority === "primary" && edge.epistemicLevel === "L*" ? "5 4" : undefined} markerEnd={`url(#${uid}-arrow)`} />;
        })}
      </svg>
      {groups.map(group => <section className={styles.band} key={group.level} aria-label={getCanonicalLevelTitle(group.level, locale)}>
        <div className={styles.bandHeader}><span className={styles.number}>{String(group.level).padStart(2, "0")}</span><h4>{getCanonicalLevelTitle(group.level, locale)}</h4><span className={styles.count}>{group.nodes.length} {c.nodes}</span></div>
        <div className={styles.grid}>{group.nodes.map(node => {
          const incoming = EDGES.filter(e => e.to === node.id).length, outgoing = EDGES.filter(e => e.from === node.id).length;
          return <button type="button" className={styles.node} key={node.id} data-testid="causal-node" data-node-id={node.id} data-highlighted={highlightedNodes.has(node.id)} data-focused={active === node.id} style={{ "--node-color": CHAIN_EPISTEMIC_COLORS[node.epistemicLevel] } as CSSProperties} ref={el => { if (el) nodeRefs.current.set(node.id, el); else nodeRefs.current.delete(node.id); }} aria-label={getCanonicalNodeLabel(node.id, locale)} aria-haspopup="dialog" onClick={() => openNode(node.id)} onMouseEnter={() => setHover(node.id)} onMouseLeave={() => setHover("")} onFocus={() => setHover(node.id)} onBlur={() => setHover("")}>
            <span className={styles.nodeTop}><span className={styles.badge} title={getChainEpistemicLabel(node.epistemicLevel, locale)}>{node.epistemicLevel}</span><span className={styles.degrees} aria-label={`${c.incoming}: ${incoming}; ${c.outgoing}: ${outgoing}`}>↙ {incoming} · ↗ {outgoing}</span></span>
            <span className={styles.nodeTitle}>{getCanonicalNodeLabel(node.id, locale)}</span>
            {node.id === "MALE_STEROIDOGENESIS" && <span className={styles.nodeTag}>{c.tag}</span>}
            <span className={styles.nodeStatus}>{getCanonicalCalibrationLabel(node.id, locale)}</span>
          </button>;
        })}</div>
      </section>)}
    </div> : <ol className={styles.edgeList}>{EDGES.map((edge, i) => <li className={styles.edgeRow} key={`${edge.from}-${edge.to}`} data-testid="causal-edge-row" data-highlighted={highlightedEdges[i]}>
      <button type="button" className={styles.edgeButton} onClick={() => openNode(edge.from)}>{getCanonicalNodeLabel(edge.from, locale)}</button><span className={styles.edgeArrow} aria-hidden="true">→</span><button type="button" className={styles.edgeButton} onClick={() => openNode(edge.to)}>{getCanonicalNodeLabel(edge.to, locale)}</button><span className={styles.edgeKind}>{edgeName(edge, locale)}</span>
    </li>)}</ol>}
    {selectedNode && <NodeDetails node={selectedNode} locale={locale} onSelect={openNode} onClose={() => setSelected(null)} />}
  </section>;
}
