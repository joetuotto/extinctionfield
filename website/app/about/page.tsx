import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Extinction Field",
  description:
    "About the BERM model: principles, licensing, and contribution guidelines.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">About</h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          What the Bio-Electromagnetic Reproductive Model is, how it works, and
          how to engage with it.
        </p>
      </header>

      <div className="max-w-3xl space-y-10">
        {/* What is BERM */}
        <section>
          <h2 className="text-xl font-semibold mb-3">What is BERM?</h2>
          <p className="text-foreground-muted leading-relaxed">
            The Bio-Electromagnetic Reproductive Model (BERM) is a quantitative
            model that attempts to explain the worldwide decline in fertility
            rates and reproductive health metrics through the lens of increasing
            electromagnetic field (EMF) exposure. It integrates data from
            reproductive biology, environmental exposure assessments, and
            demographic statistics to produce testable, time-bound predictions.
          </p>
        </section>

        {/* Principles */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Principles</h2>
          <ul className="space-y-3 text-foreground-muted leading-relaxed">
            <li className="flex gap-3">
              <span className="text-accent font-mono-num text-sm mt-0.5 shrink-0">
                01
              </span>
              <div>
                <strong className="text-foreground">Falsifiability.</strong>{" "}
                Every prediction includes explicit refutation conditions. If
                observed data falls outside the predicted confidence interval,
                the model is refuted on that prediction.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-mono-num text-sm mt-0.5 shrink-0">
                02
              </span>
              <div>
                <strong className="text-foreground">Open data.</strong> All
                input data, processing scripts, and model code are publicly
                available. Reproduction of results requires no proprietary tools
                or data.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-mono-num text-sm mt-0.5 shrink-0">
                03
              </span>
              <div>
                <strong className="text-foreground">Epistemic humility.</strong>{" "}
                The model may be wrong. The confidence intervals reflect genuine
                uncertainty, not precision theater. Where evidence is weak, the
                model says so.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-mono-num text-sm mt-0.5 shrink-0">
                04
              </span>
              <div>
                <strong className="text-foreground">
                  Locked predictions.
                </strong>{" "}
                Predictions are timestamped and immutable once published. They
                cannot be retroactively adjusted. This prevents post-hoc
                rationalization.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-mono-num text-sm mt-0.5 shrink-0">
                05
              </span>
              <div>
                <strong className="text-foreground">
                  Non-apocalyptic tone.
                </strong>{" "}
                BERM describes a quantifiable trend, not an extinction event. The
                model&apos;s name reflects the subject matter, not a certainty
                about outcomes.
              </div>
            </li>
          </ul>
        </section>

        {/* Licensing */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Licensing</h2>
          <div className="space-y-2 text-foreground-muted leading-relaxed">
            <p>
              <strong className="text-foreground">Code:</strong> MIT License.
              You can use, modify, and distribute the model code freely.
            </p>
            <p>
              <strong className="text-foreground">Documentation:</strong> CC
              BY-4.0. You can share and adapt the documentation with
              attribution.
            </p>
            <p>
              <strong className="text-foreground">Data:</strong> See individual
              data source licenses. BERM does not claim ownership of
              third-party datasets.
            </p>
          </div>
        </section>

        {/* Contributing */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Contributing</h2>
          <p className="text-foreground-muted leading-relaxed">
            The project is hosted on GitHub. Contributions are welcome:
            bug reports, data corrections, methodology critique, and code
            improvements. See the repository for contribution guidelines.
          </p>
          <p className="text-foreground-muted leading-relaxed mt-3">
            <a
              href="https://github.com/extinctionfield"
              className="text-accent hover:text-accent-hover transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/extinctionfield
            </a>{" "}
            (repository link placeholder)
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-foreground-muted leading-relaxed">
            For questions about the model, data, or methodology, open an issue
            on the GitHub repository or reach out via the contact methods listed
            there.
          </p>
        </section>
      </div>
    </div>
  );
}
