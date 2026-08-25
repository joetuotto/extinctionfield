import type { ChainNode } from "@/lib/types";
import { EPISTEMIC_COLORS } from "@/lib/causalChainData";
import { EpistemicBadge } from "./EpistemicBadge";

export function DetailPanel({
  node,
  onClose,
  locale = "fi",
}: {
  node: ChainNode;
  onClose: () => void;
  locale?: "en" | "fi";
}) {
  const d = locale === "fi"
    ? {
        close: "Sulje",
        mechanism: "Mekanismi",
        lindgren: "Lindgrenin tulkinta",
        quantitative: "Kvantitatiivinen",
        recovery: "Palautuvuus",
        timescale: "Aikaskaala",
        references: "Keskeiset viitteet",
        falsification: "Kumousehto",
        component: "Mallikomponentti",
      }
    : {
        close: "Close",
        mechanism: "Mechanism",
        lindgren: "Lindgren interpretation",
        quantitative: "Quantitative form",
        recovery: "Recovery",
        timescale: "Timescale",
        references: "Key references",
        falsification: "Falsification condition",
        component: "Model component",
      };

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-stretch lg:justify-end" onClick={onClose}>
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={locale === "en" && node.title_en ? node.title_en : node.title}
        className="relative w-full max-h-[85vh] lg:max-h-none lg:max-w-md bg-card-bg border-t lg:border-t-0 lg:border-l border-card-border overflow-y-auto animate-slide-in rounded-t-2xl lg:rounded-t-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile/tablet drag handle indicator */}
        <div className="flex justify-center pt-3 pb-1 lg:hidden">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>
        <div className="p-6 pt-3 lg:pt-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <EpistemicBadge level={node.epistemicLevel} size="lg" />
              <h2 className="text-lg font-semibold text-foreground">
                {locale === "en" && node.title_en ? node.title_en : node.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-secondary transition-colors shrink-0"
              aria-label={d.close}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="4" x2="14" y2="14" />
                <line x1="14" y1="4" x2="4" y2="14" />
              </svg>
            </button>
          </div>

          {/* Mechanism */}
          <section>
            <h3 className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
              {d.mechanism}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {locale === "en" && node.mechanism_en ? node.mechanism_en : node.mechanism}
            </p>
          </section>

          {/* Lindgren interpretation */}
          {(node.lindgrenInterpretation || node.lindgrenInterpretation_en) && (
            <section
              className="rounded-lg p-4"
              style={{ backgroundColor: `${EPISTEMIC_COLORS.M}12` }}
            >
              <h3 className="text-xs uppercase tracking-wider mb-2" style={{ color: EPISTEMIC_COLORS.M }}>
                {d.lindgren}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {locale === "en" && node.lindgrenInterpretation_en ? node.lindgrenInterpretation_en : node.lindgrenInterpretation}
              </p>
            </section>
          )}

          {/* Quantitative */}
          {(node.quantitative || node.quantitative_en) && (
            <section>
              <h3 className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                {d.quantitative}
              </h3>
              <pre className="text-xs font-mono text-foreground-muted bg-background-secondary rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
                {locale === "en" && node.quantitative_en ? node.quantitative_en : node.quantitative}
              </pre>
            </section>
          )}

          {/* Recovery */}
          {node.recoveryAlpha !== undefined && (
            <section>
              <h3 className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                {d.recovery}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-foreground font-mono">
                    α = {node.recoveryAlpha.toFixed(2)}
                  </span>
                  <div className="flex-1 h-2 bg-background-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${node.recoveryAlpha * 100}%`,
                        backgroundColor:
                          node.recoveryAlpha === 0
                            ? "#EF4444"
                            : node.recoveryAlpha < 0.5
                              ? "#F59E0B"
                              : "#10B981",
                      }}
                    />
                  </div>
                  <span className="text-xs text-foreground-muted">
                    {Math.round(node.recoveryAlpha * 100)}%
                  </span>
                </div>
                {(node.recoveryTimescale || node.recoveryTimescale_en) && (
                  <p className="text-xs text-foreground-muted">
                    {d.timescale}: {locale === "en" && node.recoveryTimescale_en ? node.recoveryTimescale_en : node.recoveryTimescale}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Key references */}
          {node.keyReferences.length > 0 && (
            <section>
              <h3 className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                {d.references}
              </h3>
              <ul className="space-y-3">
                {node.keyReferences.map((ref, i) => (
                  <li key={i} className="text-sm">
                    <p className="text-foreground font-medium">{ref.authors}</p>
                    <p className="text-xs text-foreground-muted italic">{ref.title}</p>
                    <p className="text-xs text-foreground-muted opacity-70">{ref.journal}</p>
                    <p className="text-xs text-foreground-muted mt-1">
                      → {locale === "en" && ref.keyFinding_en ? ref.keyFinding_en : ref.keyFinding}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Falsification */}
          {node.falsificationCondition && (
            <section
              className="rounded-lg p-4"
              style={{ backgroundColor: "#EF444412" }}
            >
              <h3
                className="text-xs uppercase tracking-wider mb-2"
                style={{ color: "#EF4444" }}
              >
                {d.falsification}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {locale === "en" && node.falsificationCondition_en ? node.falsificationCondition_en : node.falsificationCondition}
              </p>
            </section>
          )}

          {/* BERM component */}
          {node.bermComponent && (
            <section>
              <h3 className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                {d.component}
              </h3>
              <code className="text-xs font-mono text-foreground-muted bg-background-secondary rounded px-2 py-1">
                {node.bermComponent}
              </code>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
