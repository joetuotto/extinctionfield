import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evidence - Extinction Field",
  description:
    "Compiled evidence supporting and challenging the BERM model, organized by pathway.",
};

export default function EvidencePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Evidence Compilation
        </h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          Studies and data supporting and challenging the BERM model, organized
          by biological pathway. Each entry is rated on the epistemic evidence
          scale.
        </p>
      </header>

      <div className="border border-card-border bg-card-bg rounded-lg p-8">
        <p className="text-foreground-muted">
          Evidence compilation coming soon.
        </p>
        <p className="text-sm text-foreground-muted mt-4">
          The evidence page will present a searchable, filterable table of
          studies organized by pathway (oxidative stress, hormonal disruption,
          DNA fragmentation, thermal effects) with epistemic ratings.
        </p>
      </div>
    </div>
  );
}
