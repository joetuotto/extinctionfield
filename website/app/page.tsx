import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero */}
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Extinction Field
        </h1>
        <p className="text-lg md:text-xl text-foreground-muted max-w-2xl">
          A falsifiable model linking electromagnetic field exposure to global
          fertility decline.
        </p>
      </header>

      {/* Key numbers */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <div className="border border-card-border bg-card-bg rounded-lg p-6">
          <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
            Global TFR 2040
          </p>
          <p className="text-3xl font-bold font-mono-num">1.78</p>
          <p className="text-sm text-foreground-muted font-mono-num mt-1">
            95% CI [1.55, 2.05]
          </p>
        </div>
        <div className="border border-card-border bg-card-bg rounded-lg p-6">
          <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
            Sperm concentration 2050
          </p>
          <p className="text-3xl font-bold font-mono-num">62%</p>
          <p className="text-sm text-foreground-muted mt-1">
            of 2020 levels{" "}
            <span className="font-mono-num">[48%, 75%]</span>
          </p>
        </div>
        <div className="border border-card-border bg-card-bg rounded-lg p-6">
          <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
            Model version
          </p>
          <p className="text-3xl font-bold font-mono-num">v17.0</p>
          <p className="text-sm text-foreground-muted mt-1">
            7 locked predictions
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="max-w-3xl mb-16 space-y-5">
        <p className="text-foreground-muted leading-relaxed">
          The Bio-Electromagnetic Reproductive Model (BERM) proposes that
          non-ionizing electromagnetic fields -- from mobile phones, Wi-Fi
          infrastructure, and other sources -- contribute to declining
          reproductive outcomes worldwide. The model integrates evidence from
          reproductive biology, epidemiology, and environmental exposure data.
        </p>
        <p className="text-foreground-muted leading-relaxed">
          BERM produces quantitative, time-bound predictions for specific
          countries and metrics. Each prediction is locked with a confidence
          interval before the observation period begins. The model is designed to
          be falsifiable: if observed values fall outside the predicted
          confidence intervals, the model is refuted on that prediction.
        </p>
        <p className="text-foreground-muted leading-relaxed">
          This website serves as the public prediction registry and evidence
          repository. All predictions are timestamped and cannot be modified
          after locking. The source code, data, and methodology are open.
        </p>
      </section>

      {/* Links */}
      <section className="flex flex-wrap gap-4 mb-16">
        <Link
          href="/predictions"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
        >
          View prediction registry
        </Link>
        <Link
          href="/evidence"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-sm font-medium rounded-lg transition-colors"
        >
          Browse evidence
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-sm font-medium rounded-lg transition-colors"
        >
          About the model
        </Link>
      </section>

      {/* Epistemic note */}
      <section className="border-t border-border pt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          Epistemic note: BERM is a scientific model, not a certainty claim. The
          predictions above represent the model&apos;s best estimates given current
          evidence and methodology. The confidence intervals reflect genuine
          uncertainty. If the data contradicts the model, the model is wrong --
          that is the point of falsifiability.
        </p>
      </section>
    </div>
  );
}
