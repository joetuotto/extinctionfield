"use client";

import { X, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { CausalMapNode, EpistemicLevel } from "@/lib/causalAtlasData";
import { EVIDENCE_COLORS, EVIDENCE_LABELS, EN_LABELS, LEVEL_TO_STAGE, STAGE_BANDS, ECOLOGY_BAND } from "@/lib/causalAtlasData";

interface Props {
  node: CausalMapNode;
  locale: string;
  onClose: () => void;
}

function stageLabel(level: number, lang: "en" | "fi"): string {
  const stage = LEVEL_TO_STAGE[level];
  if (stage === "ecology") return ECOLOGY_BAND.label[lang];
  const band = STAGE_BANDS.find((b) => b.id === stage);
  return band?.label[lang] ?? "";
}

export function AtlasDetail({ node, locale, onClose }: Props) {
  const lang = locale === "fi" ? "fi" : "en";
  const labels = EVIDENCE_LABELS[lang] as Record<EpistemicLevel, string>;
  const d = node.detail;
  const en = EN_LABELS[node.id];

  const nodeLabel = lang === "en" && en ? en.label : node.label;
  const nodeSublabel = lang === "en" && en?.sublabel ? en.sublabel : node.sublabel;

  return (
    <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-[#0e0e22] border-l border-white/10 z-50 overflow-y-auto shadow-2xl">
      <div className="sticky top-0 bg-[#0e0e22] border-b border-white/10 p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
            {stageLabel(node.level, lang)}
          </p>
          <h3 className="text-sm font-bold leading-tight text-gray-100">{nodeLabel}</h3>
          {nodeSublabel && (
            <p className="text-xs text-gray-400 mt-0.5">{nodeSublabel}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="shrink-0 p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-400"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>

      <div className="p-4 space-y-5 text-sm">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: EVIDENCE_COLORS[node.epistemicLevel] }}
          />
          <span className="text-xs font-medium text-gray-400">
            {labels[node.epistemicLevel]}
          </span>
        </div>

        {d?.mechanism && (
          <Section title={lang === "fi" ? "Mekanismi" : "Mechanism"}>
            <p className="text-[13px] text-gray-300 leading-relaxed">{d.mechanism}</p>
          </Section>
        )}

        {d?.fdaDevice && (
          <Section title="FDA Device">
            <p className="text-[13px] text-gray-300 leading-relaxed">{d.fdaDevice}</p>
          </Section>
        )}

        {d?.bermPathway && (
          <Section title="BERM Pathway">
            <p className="text-[13px] text-gray-300 font-mono text-xs">{d.bermPathway}</p>
          </Section>
        )}

        {d?.prediction && (
          <Section title={lang === "fi" ? "Ennuste" : "Prediction"}>
            <p className="text-[13px] text-gray-300 leading-relaxed">{d.prediction}</p>
          </Section>
        )}

        {d?.keyRefs && d.keyRefs.length > 0 && (
          <Section title={lang === "fi" ? "Avainviitteet" : "Key References"}>
            <ul className="space-y-0.5">
              {d.keyRefs.map((ref) => (
                <li key={ref} className="text-xs text-gray-400 font-mono">{ref}</li>
              ))}
            </ul>
          </Section>
        )}

        {d?.link && (
          <Link
            href={`/${lang}${d.link}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors mt-2"
          >
            {lang === "fi" ? "Lue lisää" : "Read more"}
            <ExternalLink size={11} />
          </Link>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
        {title}
      </h4>
      {children}
    </div>
  );
}
