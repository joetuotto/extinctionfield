import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explorer - Extinction Field",
  description:
    "Interactive country-level EMF exposure and fertility explorer. Coming in Phase 2.",
};

export default function ExplorerPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Explorer</h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          The interactive explorer will allow you to select a country and view
          its EMF exposure history, reproductive biomarker trajectories, and
          total fertility rate predictions from the BERM model.
        </p>
      </header>

      <div className="border border-card-border bg-card-bg rounded-lg p-8 text-center">
        <p className="text-lg font-semibold mb-2">Coming in Phase 2</p>
        <p className="text-sm text-foreground-muted max-w-lg mx-auto leading-relaxed">
          The explorer requires the Python model (berm package) to produce
          validated outputs. Country-level charts will be generated from the
          model, not hardcoded data. Until then, view the locked predictions.
        </p>
        <Link
          href="/predictions"
          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
        >
          View prediction registry
        </Link>
      </div>
    </div>
  );
}
