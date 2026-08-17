import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data - Extinction Field",
  description: "Data sources, downloads, and reproduction instructions.",
};

export default function DataPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Data Sources &amp; Downloads
        </h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          All data used in the BERM model, with sources, processing scripts, and
          download links for reproduction.
        </p>
      </header>

      <div className="border border-card-border bg-card-bg rounded-lg p-8">
        <p className="text-foreground-muted">
          Data sources and downloads coming soon.
        </p>
        <p className="text-sm text-foreground-muted mt-4">
          This page will provide structured access to fertility data (UN, World
          Bank, national statistics), EMF exposure surveys, and sperm quality
          meta-analysis datasets.
        </p>
      </div>
    </div>
  );
}
