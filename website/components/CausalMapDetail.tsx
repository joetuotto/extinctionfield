"use client";

import { X } from "lucide-react";
import type { CausalMapNode as NodeType } from "@/lib/causalMapData";
import { EPISTEMIC_COLORS, EPISTEMIC_LABELS } from "@/lib/causalMapData";
import Link from "next/link";

interface Props {
  node: NodeType;
  locale: string;
  onClose: () => void;
}

export function CausalMapDetail({ node, locale, onClose }: Props) {
  const lang = locale === "fi" ? "fi" : "en";
  const labels = EPISTEMIC_LABELS[lang];
  const d = node.detail;

  return (
    <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-[var(--card-bg,#1a1a2e)] border-l border-border z-50 overflow-y-auto shadow-2xl">
      <div className="sticky top-0 bg-[var(--card-bg,#1a1a2e)] border-b border-border p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-bold leading-tight">{node.label}</h3>
          {node.sublabel && (
            <p className="text-xs text-foreground-muted mt-0.5">{node.sublabel}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded hover:bg-foreground/10 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-4 space-y-4 text-sm">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: EPISTEMIC_COLORS[node.epistemicLevel] }}
          />
          <span className="text-xs font-medium text-foreground-muted">
            {labels[node.epistemicLevel]}
          </span>
        </div>

        {d?.mechanism && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
              {lang === "fi" ? "Mekanismi" : "Mechanism"}
            </h4>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.mechanism}</p>
          </div>
        )}

        {d?.fdaDevice && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
              FDA Device
            </h4>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.fdaDevice}</p>
          </div>
        )}

        {d?.bermPathway && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
              BERM Pathway
            </h4>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.bermPathway}</p>
          </div>
        )}

        {d?.prediction && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
              {lang === "fi" ? "Ennuste" : "Prediction"}
            </h4>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.prediction}</p>
          </div>
        )}

        {d?.keyRefs && d.keyRefs.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
              {lang === "fi" ? "Avainviitteet" : "Key References"}
            </h4>
            <ul className="space-y-0.5">
              {d.keyRefs.map((ref) => (
                <li key={ref} className="text-xs text-foreground-muted font-mono">{ref}</li>
              ))}
            </ul>
          </div>
        )}

        {d?.link && (
          <Link
            href={`/${lang}${d.link}`}
            className="inline-block text-xs font-medium text-accent hover:underline mt-2"
          >
            {lang === "fi" ? "Lue lisää →" : "Read more →"}
          </Link>
        )}
      </div>
    </div>
  );
}
