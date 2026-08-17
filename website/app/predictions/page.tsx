import { LOCKED_PREDICTIONS } from "@/lib/predictions";
import type { LockedPrediction } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prediction Registry - Extinction Field",
  description:
    "Locked, falsifiable predictions from the BERM model. Each prediction is timestamped and cannot be modified.",
};

function StatusBadge({ status }: { status: LockedPrediction["status"] }) {
  const styles: Record<LockedPrediction["status"], string> = {
    pending: "bg-status-pending/20 text-status-pending",
    confirmed: "bg-status-confirmed/20 text-status-confirmed",
    refuted: "bg-status-refuted/20 text-status-refuted",
    partial: "bg-status-partial/20 text-status-partial",
  };

  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${styles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function CIBar({
  ciLow,
  ciHigh,
  central,
  min,
  max,
}: {
  ciLow: number;
  ciHigh: number;
  central: number;
  min: number;
  max: number;
}) {
  const range = max - min;
  if (range <= 0) return null;

  const leftPct = ((ciLow - min) / range) * 100;
  const widthPct = ((ciHigh - ciLow) / range) * 100;
  const centerPct = ((central - min) / range) * 100;

  return (
    <div className="relative w-full h-3 bg-ci-bar-bg rounded-full mt-3">
      {/* CI range bar */}
      <div
        className="absolute top-0 h-full bg-ci-bar-fill/40 rounded-full"
        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
      />
      {/* Central estimate marker */}
      <div
        className="absolute top-0 h-full w-0.5 bg-ci-bar-center rounded-full"
        style={{ left: `${centerPct}%` }}
      />
      {/* Labels */}
      <div className="flex justify-between mt-1.5 text-[10px] text-foreground-muted font-mono-num">
        <span>{min.toFixed(min < 10 ? 2 : 0)}</span>
        <span>{max.toFixed(max < 10 ? 2 : 0)}</span>
      </div>
    </div>
  );
}

function PredictionCard({ prediction }: { prediction: LockedPrediction }) {
  // Calculate reasonable min/max for the CI bar
  const range = prediction.ciHigh - prediction.ciLow;
  const barMin = Math.max(0, prediction.ciLow - range * 0.5);
  const barMax = prediction.ciHigh + range * 0.5;

  return (
    <div className="border border-card-border bg-card-bg rounded-lg p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold">
            {prediction.countryLabel}
          </h3>
          <p className="text-sm text-foreground-muted">{prediction.metricLabel}</p>
        </div>
        <StatusBadge status={prediction.status} />
      </div>

      {/* Central value */}
      <div className="mb-2">
        <span className="text-3xl font-bold font-mono-num">
          {prediction.central.toFixed(2)}
        </span>
        <span className="text-sm text-foreground-muted ml-2">
          {prediction.unit}
        </span>
      </div>

      {/* CI */}
      <p className="text-sm text-foreground-muted font-mono-num">
        95% CI [{prediction.ciLow.toFixed(2)}, {prediction.ciHigh.toFixed(2)}]
      </p>

      {/* CI Bar */}
      <CIBar
        ciLow={prediction.ciLow}
        ciHigh={prediction.ciHigh}
        central={prediction.central}
        min={barMin}
        max={barMax}
      />

      {/* Meta */}
      <div className="mt-auto pt-4 border-t border-border text-xs text-foreground-muted space-y-1">
        <div className="flex justify-between">
          <span>Target year</span>
          <span className="font-mono-num">{prediction.year}</span>
        </div>
        <div className="flex justify-between">
          <span>Locked</span>
          <span className="font-mono-num">{prediction.lockedDate}</span>
        </div>
        <div className="flex justify-between">
          <span>Model</span>
          <span className="font-mono-num">{prediction.modelVersion}</span>
        </div>
      </div>

      {/* Immutability statement */}
      <p className="mt-3 text-[10px] text-foreground-muted italic">
        This prediction cannot be changed.
      </p>
    </div>
  );
}

export default function PredictionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Prediction Registry
        </h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          Each prediction below is locked: timestamped, versioned, and
          immutable. When observed data becomes available, predictions are scored
          as confirmed (observed value within CI), refuted (outside CI), or
          partial.
        </p>
      </header>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-8 text-xs text-foreground-muted">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-pending" />
          Pending
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-confirmed" />
          Confirmed
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-refuted" />
          Refuted
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-partial" />
          Partial
        </div>
      </div>

      {/* Prediction cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LOCKED_PREDICTIONS.map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
      </div>

      {/* Methodology note */}
      <section className="mt-12 border-t border-border pt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          Methodology: Confidence intervals are derived from the BERM model
          v17.0 using Monte Carlo simulation over parameter uncertainty.
          Predictions are locked before the observation period begins. The
          locking mechanism is documented in the model specification. Predictions
          are evaluated against official statistical sources (UN, World Bank,
          national statistics offices).
        </p>
      </section>
    </div>
  );
}
