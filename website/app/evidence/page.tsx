import type { Metadata } from "next";
import { EPISTEMIC_LEVELS, PATHWAYS, EVIDENCE } from "@/lib/evidence";
import type { EpistemicLevel } from "@/lib/types";

export const metadata: Metadata = {
  title: "Evidence - Extinction Field",
  description:
    "Compiled evidence supporting and challenging the BERM model, organized by pathway with epistemic ratings.",
};

function EpistemicBadge({ level }: { level: EpistemicLevel }) {
  const info = EPISTEMIC_LEVELS[level];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap"
      style={{
        backgroundColor: `${info.color}18`,
        color: info.color,
        border: `1px solid ${info.color}40`,
      }}
      title={info.description}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: info.color }}
      />
      {info.label}
    </span>
  );
}

export default function EvidencePage() {
  const pathwayKeys = Object.keys(PATHWAYS);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Evidence Compilation
        </h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          Studies and data supporting and challenging the BERM model, organized
          by biological pathway. Each entry is rated on the epistemic evidence
          scale described below.
        </p>
      </header>

      {/* Epistemic level system explanation */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">
          Epistemic level system
        </h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          Not all evidence is created equal. Each study is assigned an epistemic
          level reflecting the strength and type of evidence it provides. This is
          not a judgment of study quality per se, but of what kind of inference
          the study supports. A single RCT may be excellent science and still
          rate L* if it has not been replicated.
        </p>

        {/* Legend grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(Object.entries(EPISTEMIC_LEVELS) as [EpistemicLevel, typeof EPISTEMIC_LEVELS[EpistemicLevel]][]).map(
            ([key, info]) => (
              <div
                key={key}
                className="border border-card-border bg-card-bg rounded-lg p-4 flex items-start gap-3"
              >
                <span
                  className="mt-0.5 w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: info.color }}
                />
                <div>
                  <p className="text-sm font-medium">
                    {key} &mdash; {info.label}
                  </p>
                  <p className="text-xs text-foreground-muted mt-1">
                    {info.description}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Studies by pathway */}
      {pathwayKeys.map((pKey) => {
        const pathway = PATHWAYS[pKey];
        const items = EVIDENCE.filter((e) => e.pathway === pKey);
        if (items.length === 0) return null;

        return (
          <section key={pKey} className="mb-14">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-1">
                {pKey === "PV" || pKey === "NE" || pKey === "TG" || pKey === "CA" || pKey === "NR" ? "" : `Pathway ${pKey === "T_BE" ? "T" : pKey}: `}
                {pathway.label}
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">
                {pathway.description}
              </p>
            </div>

            {/* Table for desktop, cards for mobile */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-foreground-muted">
                    <th className="py-2 pr-4 font-medium">Year</th>
                    <th className="py-2 pr-4 font-medium">Study</th>
                    <th className="py-2 pr-4 font-medium">Finding</th>
                    <th className="py-2 pr-4 font-medium">Level</th>
                    <th className="py-2 font-medium text-right">n</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-card-border last:border-0"
                    >
                      <td className="py-3 pr-4 font-mono-num whitespace-nowrap align-top">
                        {item.year}
                      </td>
                      <td className="py-3 pr-4 align-top max-w-[220px]">
                        {item.study}
                      </td>
                      <td className="py-3 pr-4 text-foreground-muted align-top">
                        {item.finding}
                      </td>
                      <td className="py-3 pr-4 align-top">
                        <EpistemicBadge level={item.level} />
                      </td>
                      <td className="py-3 text-right font-mono-num align-top text-foreground-muted">
                        {item.n ? item.n.toLocaleString() : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="border border-card-border bg-card-bg rounded-lg p-4"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono-num text-sm">
                      {item.year}
                    </span>
                    <EpistemicBadge level={item.level} />
                  </div>
                  <p className="text-sm font-medium mb-1">{item.study}</p>
                  <p className="text-sm text-foreground-muted">
                    {item.finding}
                  </p>
                  {item.n && (
                    <p className="text-xs text-foreground-muted mt-2 font-mono-num">
                      n = {item.n.toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Epistemic note */}
      <section className="border-t border-border pt-8 mt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          This compilation is maintained as part of the BERM model documentation.
          Inclusion does not imply endorsement; studies are listed to show what
          each pathway rests on and where the gaps are. If you know of a study
          that should be added or believe a rating is incorrect, contributions
          are welcome via the project repository.
        </p>
      </section>
    </div>
  );
}
