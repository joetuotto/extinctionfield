import type { Metadata } from "next";
import { ExplorerDashboard } from "@/components/ExplorerDashboard";

export const metadata: Metadata = {
  title: "Explorer - Extinction Field",
  description:
    "Interactive country-level EMF exposure and fertility explorer.",
};

export default function ExplorerPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Explorer</h1>
      <p className="text-foreground-muted mb-8 max-w-3xl leading-relaxed">
        Select a country to view its EMF exposure history, biological impact
        trajectory, and fertility predictions from the BERM model. All values
        are computed from the model &mdash; nothing is hardcoded. Observed TFR
        data from World Bank.
      </p>

      <ExplorerDashboard />

      <div className="mt-12 p-4 bg-card-bg border border-card-border rounded-lg text-xs text-foreground-muted">
        <p className="font-semibold text-foreground mb-1">
          How to read these charts
        </p>
        <p>
          <strong>Exposure tab:</strong> Shows how ambient (infrastructure) and
          personal (device) EMF exposure have grown over time. The cumulative
          sum drives the biological model.
        </p>
        <p className="mt-1">
          <strong>Biology tab:</strong> Biological capacity (blue) is the
          maximum TFR the population could achieve given its EMF exposure.
          Behavioral factor (green) captures endocrine-mediated motivation
          changes. Their product (yellow dashed) is the biological potential
          before cultural factors.
        </p>
        <p className="mt-1">
          <strong>Fertility tab:</strong> Blue line = model prediction. Gray
          dots = observed World Bank data. The model is calibrated at 2024
          (predicted = observed by construction). The shaded region after 2024
          is the forecast with approximate confidence interval.
        </p>
      </div>
    </main>
  );
}
