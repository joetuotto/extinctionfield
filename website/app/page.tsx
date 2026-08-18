import Link from "next/link";
import CausalChain from "@/components/CausalChain";

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
          anthropogenic electromagnetic fields -- from cell towers, Wi-Fi, and
          smartphones -- are a significant factor in the global fertility
          decline. The model produces quantitative, falsifiable predictions
          that will either come true or not. It is a testable hypothesis, not
          a certainty claim.
        </p>
        <p className="text-foreground-muted leading-relaxed">
          Each prediction is locked with a confidence interval before the
          observation period begins. If observed values fall outside the
          predicted interval, the model is refuted on that prediction -- not
          the prediction adjusted. All source code, data, and methodology are
          open for anyone to reproduce, challenge, or extend.
        </p>
      </section>

      {/* Causal chain diagram */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-4">
          Causal pathway overview
        </h2>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
          EMF exposure propagates through five biological pathways to converge
          on fecundability and fertility rate. Node borders indicate the
          epistemic level of the supporting evidence.
        </p>
        <div className="border border-card-border bg-card-bg rounded-lg p-4 md:p-6 overflow-x-auto">
          <CausalChain />
        </div>
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
          href="/model"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-sm font-medium rounded-lg transition-colors"
        >
          Model documentation
        </Link>
        <Link
          href="/evidence"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-sm font-medium rounded-lg transition-colors"
        >
          Browse evidence
        </Link>
      </section>

      {/* Epistemic note */}
      <section className="border-t border-border pt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          Epistemic note: BERM is a scientific model, not a certainty claim.
          86% of placebo series fit the current data better (K8). The backcast
          claim has been refuted in replication (K10). Cross-section
          R&sup2; = 0.9999 is calibration, not validation. If the data
          contradicts the model, the model is wrong -- that is the point of
          falsifiability.
        </p>
      </section>
    </div>
  );
}
