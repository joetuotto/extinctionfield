"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { AtlasId, CausalMapNode, EpistemicLevel, Locale } from "@/lib/causalAtlasData";
import { EVIDENCE_COLORS, EVIDENCE_LABELS, LEVEL_TO_STAGE, STAGE_BANDS, ECOLOGY_BAND, NODES, EDGES, RELATION_LABELS, atlasesForNode, t, localizedDetail } from "@/lib/causalAtlasData";
import { pickCopy } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { AtlasClaims } from "./AtlasClaims";

interface Props {
  node: CausalMapNode;
  locale: string;
  onClose: () => void;
  originRef?: HTMLElement | null;
  onNavigate?: (id: string) => void;
  onAtlasChange?: (id: AtlasId) => void;
}

const SECTION_LABELS: Record<string, Record<string, string>> = {
  close: { en: "Close details", fi: "Sulje tiedot", ja: "詳細を閉じる", fr: "Fermer les détails", ko: "상세 닫기" },
  incoming: { en: "Incoming connections", fi: "Tuloyhteydet", ja: "入力接続", fr: "Connexions entrantes", ko: "입력 연결" },
  outgoing: { en: "Outgoing connections", fi: "Lähtöyhteydet", ja: "出力接続", fr: "Connexions sortantes", ko: "출력 연결" },
  scope: { en: "Evidence scope", fi: "Näytön rajaus", ja: "証拠の範囲", fr: "Portée des preuves", ko: "증거 범위" },
  subatlases: { en: "Open in a subatlas", fi: "Avaa aliatlaksessa", ja: "サブアトラスで開く", fr: "Ouvrir dans un sous-atlas", ko: "하위 아틀라스에서 열기" },
  mechanism: { en: "Mechanism", fi: "Mekanismi", ja: "メカニズム", fr: "Mécanisme", ko: "메커니즘" },
  fdaDevice: { en: "Device or experimental setup", fi: "Laite tai koejärjestely", ja: "装置・実験系", fr: "Dispositif ou protocole expérimental", ko: "장치 또는 실험 구성" },
  bermPathway: { en: "BERM Pathway", fi: "BERM-polku", ja: "BERMパスウェイ", fr: "Voie BERM", ko: "BERM 경로" },
  prediction: { en: "Prediction", fi: "Ennuste", ja: "予測", fr: "Prédiction", ko: "예측" },
  keyRefs: { en: "Key References", fi: "Avainviitteet", ja: "主要参考文献", fr: "Références clés", ko: "주요 참고문헌" },
  readMore: { en: "Read more", fi: "Lue lisää", ja: "続きを読む", fr: "Lire la suite", ko: "더 읽기" },
  connectionClaims: { en: "Related component claims", fi: "Yhteyteen liittyvät komponenttiväitteet" },
};

function stageLabel(level: number, lang: Locale): string {
  const stage = LEVEL_TO_STAGE[level];
  if (stage === "ecology") return t(ECOLOGY_BAND.label, lang);
  const band = STAGE_BANDS.find((b) => b.id === stage);
  return band ? t(band.label, lang) : "";
}

export function AtlasDetail({ node, locale, onClose, originRef, onNavigate, onAtlasChange }: Props) {
  const lang: Locale = locale === "fi" ? "fi" : "en";
  const labels = EVIDENCE_LABELS[lang] as Record<EpistemicLevel, string>;
  const d = localizedDetail(node.detail, lang);
  const closeRef = useRef<HTMLButtonElement>(null);
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, [node.id]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        originRef?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, originRef]);

  const handleClose = () => {
    onClose();
    originRef?.focus();
  };

  return (
    <aside
      ref={asideRef}
      role="complementary"
      aria-labelledby="atlas-detail-title"
      className="fixed right-3 top-20 bottom-3 w-[400px] max-w-[calc(100vw-24px)] bg-[var(--background)] border-l border-[var(--border)] z-50 overflow-y-auto shadow-2xl"
    >
      <div className="sticky top-0 bg-[var(--background)] border-b border-[var(--border)] p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-[var(--atlas-text-muted)] mb-1">
            {stageLabel(node.level, lang)}
          </p>
          <h2 id="atlas-detail-title" className="text-sm font-bold leading-tight text-[var(--atlas-text)]">
            {t(node.label, lang)}
          </h2>
          {node.sublabel && (
            <p className="text-xs text-[var(--atlas-text-dim)] mt-0.5">{t(node.sublabel, lang)}</p>
          )}
        </div>
        <button
          ref={closeRef}
          onClick={handleClose}
          className="shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-[var(--atlas-edge)] transition-colors text-[var(--atlas-text-dim)]"
          aria-label={pickCopy(SECTION_LABELS.close, locale)}
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-4 space-y-5 text-sm">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center justify-center min-w-6 px-1 h-5 rounded-full text-[9px] font-bold text-white"
            style={{ backgroundColor: EVIDENCE_COLORS[node.epistemicLevel] }}
          >
            {node.epistemicLevel}
          </span>
          <span className="text-xs font-medium text-[var(--atlas-text-dim)]">
            {labels[node.epistemicLevel]}
          </span>
        </div>

        {node.provenance && <Section title={pickCopy(SECTION_LABELS.scope, locale)}><p className="text-xs leading-relaxed text-[var(--atlas-text-dim)]">{t(node.provenance, lang)}</p></Section>}
        {d?.mechanism && (
          <Section title={pickCopy(SECTION_LABELS.mechanism, locale)}>
            <p className="text-[13px] text-[var(--atlas-text-dim)] leading-relaxed">
              <InlineReferenceText text={d.mechanism} locale={locale} />
            </p>
          </Section>
        )}

        {d?.fdaDevice && (
          <Section title={pickCopy(SECTION_LABELS.fdaDevice, locale)}>
            <p className="text-[13px] text-[var(--atlas-text-dim)] leading-relaxed">
              <InlineReferenceText text={d.fdaDevice} locale={locale} />
            </p>
          </Section>
        )}

        {node.detail?.bermPathway && (
          <Section title={pickCopy(SECTION_LABELS.bermPathway, locale)}>
            <p className="text-xs text-[var(--atlas-text-dim)] font-mono">{node.detail.bermPathway}</p>
          </Section>
        )}

        {d?.prediction && (
          <Section title={pickCopy(SECTION_LABELS.prediction, locale)}>
            <p className="text-[13px] text-[var(--atlas-text-dim)] leading-relaxed">
              <InlineReferenceText text={d.prediction} locale={locale} />
            </p>
          </Section>
        )}

        <AtlasClaims key={node.id} claimIds={node.claimIds ?? []} locale={locale} />

        {node.detail?.keyRefs && node.detail.keyRefs.length > 0 && (
          <Section title={pickCopy(SECTION_LABELS.keyRefs, locale)}>
            <ul className="space-y-0.5">
              {node.detail.keyRefs.map((ref) => (
                <li key={ref} className="text-xs text-[var(--atlas-text-dim)]">
                  <StudyCitation referenceId={ref} locale={locale} />
                </li>
              ))}
            </ul>
          </Section>
        )}

        {onAtlasChange && <Section title={pickCopy(SECTION_LABELS.subatlases, locale)}><div className="flex flex-wrap gap-2">{atlasesForNode(node.id).map(a => <button key={a.id} className="min-h-11 rounded border border-[var(--border)] px-2 text-xs text-blue-400" onClick={() => onAtlasChange(a.id)}>{t(a.title, lang)}</button>)}</div></Section>}
        {(["incoming", "outgoing"] as const).map(direction => {
          const connections = EDGES.filter(e => direction === "incoming" ? e.to === node.id : e.from === node.id);
          if (!connections.length) return null;
          return <Section key={direction} title={pickCopy(SECTION_LABELS[direction], locale)}><ul className="space-y-2">{connections.map(e => {
            const targetId = direction === "incoming" ? e.from : e.to;
            const target = NODES.find(n => n.id === targetId)!;
            return <li key={`${e.from}->${e.to}`}><button className="min-h-11 w-full rounded border border-[var(--border)] p-2 text-left text-xs hover:border-blue-400" onClick={() => onNavigate?.(targetId)}><span className="block text-blue-400">{direction === "incoming" ? "← " : "→ "}{t(target.label, lang)}</span><span className="mt-1 block text-[var(--atlas-text-dim)]">{t(RELATION_LABELS[e.relation], lang)}</span></button>{Boolean(e.claimIds?.length) && <details className="mt-1 rounded border border-[var(--border)] px-2"><summary className="min-h-11 cursor-pointer content-center text-xs text-blue-400">{pickCopy(SECTION_LABELS.connectionClaims, locale)}</summary><div className="pb-2"><AtlasClaims claimIds={e.claimIds!} locale={locale} compact /></div></details>}</li>;
          })}</ul></Section>;
        })}

        {node.detail?.link && (
          <Link
            href={`/${locale}${node.detail.link}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors mt-2 min-h-[44px]"
          >
            {pickCopy(SECTION_LABELS.readMore, locale)}
            <ExternalLink size={12} />
          </Link>
        )}
      </div>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--atlas-text-muted)] mb-1.5">
        {title}
      </h3>
      {children}
    </div>
  );
}
