import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Documentation - Extinction Field",
  description: "BERM model documentation, equations, and methodology.",
};

export default function ModelPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Model Documentation
        </h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          Full documentation of the Bio-Electromagnetic Reproductive Model
          (BERM), including equations, parameter definitions, and calibration
          methodology.
        </p>
      </header>

      <div className="border border-card-border bg-card-bg rounded-lg p-8">
        <p className="text-foreground-muted">
          Model documentation coming soon.
        </p>
        <p className="text-sm text-foreground-muted mt-4">
          The model specification will include the complete system of equations,
          parameter tables, calibration data sources, and sensitivity analyses.
        </p>
      </div>
    </div>
  );
}
