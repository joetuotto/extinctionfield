"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { CausalMapNode, EpistemicLevel, Locale } from "@/lib/causalAtlasData";
import { EVIDENCE_COLORS, EVIDENCE_LABELS, LEVEL_TO_STAGE, STAGE_BANDS, ECOLOGY_BAND, t, localizedDetail } from "@/lib/causalAtlasData";

interface Props {
  node: CausalMapNode;
  locale: string;
  onClose: () => void;
  originRef?: HTMLElement | null;
}

const SECTION_LABELS: Record<string, Record<string, string>> = {
  mechanism: { en: "Mechanism", fi: "Mekanismi" },
  fdaDevice: { en: "FDA Device", fi: "FDA-laite" },
  bermPathway: { en: "BERM Pathway", fi: "BERM-polku" },
  prediction: { en: "Prediction", fi: "Ennuste" },
  keyRefs: { en: "Key References", fi: "Avainviitteet" },
  readMore: { en: "Read more", fi: "Lue lisää" },
};

function stageLabel(level: number, lang: Locale): string {
  const stage = LEVEL_TO_STAGE[level];
  if (stage === "ecology") return t(ECOLOGY_BAND.label, lang);
  const band = STAGE_BANDS.find((b) => b.id === stage);
  return band ? t(band.label, lang) : "";
}

export function AtlasDetail({ node, locale, onClose, originRef }: Props) {
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
      className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-[var(--atlas-surface)] border-l border-[var(--border)] z-50 overflow-y-auto shadow-2xl"
    >
      <div className="sticky top-0 bg-[var(--atlas-surface)] border-b border-[var(--border)] p-4 flex items-start justify-between gap-3">
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
          aria-label="Close details"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-4 space-y-5 text-sm">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold text-white"
            style={{ backgroundColor: EVIDENCE_COLORS[node.epistemicLevel] }}
          >
            {node.epistemicLevel === "M|C" ? "M" : node.epistemicLevel}
          </span>
          <span className="text-xs font-medium text-[var(--atlas-text-dim)]">
            {labels[node.epistemicLevel]}
          </span>
        </div>

        {d?.mechanism && (
          <Section title={SECTION_LABELS.mechanism[lang]}>
            <p className="text-[13px] text-[var(--atlas-text-dim)] leading-relaxed">{d.mechanism}</p>
          </Section>
        )}

        {d?.fdaDevice && (
          <Section title={SECTION_LABELS.fdaDevice[lang]}>
            <p className="text-[13px] text-[var(--atlas-text-dim)] leading-relaxed">{d.fdaDevice}</p>
          </Section>
        )}

        {node.detail?.bermPathway && (
          <Section title={SECTION_LABELS.bermPathway[lang]}>
            <p className="text-xs text-[var(--atlas-text-dim)] font-mono">{node.detail.bermPathway}</p>
          </Section>
        )}

        {d?.prediction && (
          <Section title={SECTION_LABELS.prediction[lang]}>
            <p className="text-[13px] text-[var(--atlas-text-dim)] leading-relaxed">{d.prediction}</p>
          </Section>
        )}

        {node.detail?.keyRefs && node.detail.keyRefs.length > 0 && (
          <Section title={SECTION_LABELS.keyRefs[lang]}>
            <ul className="space-y-0.5">
              {node.detail.keyRefs.map((ref) => (
                <li key={ref} className="text-xs text-[var(--atlas-text-dim)] font-mono">{ref}</li>
              ))}
            </ul>
          </Section>
        )}

        {node.detail?.link && (
          <Link
            href={`/${lang}${node.detail.link}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors mt-2 min-h-[44px]"
          >
            {SECTION_LABELS.readMore[lang]}
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
