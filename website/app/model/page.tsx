import type { Metadata } from "next";
import Link from "next/link";
import CausalChainDiagram from "@/components/CausalChainDiagram";

export const metadata: Metadata = {
  title: "Model Documentation - Extinction Field",
  description:
    "BERM model documentation: three-level architecture, causal pathways, equations, and recovery dynamics.",
};

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-card-border bg-card-bg rounded-lg p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

function Eq({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 px-4 py-3 bg-background-secondary rounded-lg overflow-x-auto">
      <code className="text-sm font-mono-num whitespace-nowrap">
        {children}
      </code>
    </div>
  );
}

export default function ModelPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Model Documentation
        </h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          Full documentation of the Bio-Electromagnetic Reproductive Model
          (BERM), including the three-level architecture, causal pathways,
          coupling equations, and recovery dynamics.
        </p>
      </header>

      {/* ── Three-level architecture ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">
          Three-level architecture
        </h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          BERM separates fertility decline into three distinct causal layers.
          Each level has its own dynamics, timescale, and evidence basis.
          The total fertility rate (TFR) for a country is the product of all
          three levels, not the sum -- each acts as a multiplier on the others.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard>
            <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
              Level 1
            </p>
            <h3 className="text-base font-semibold mb-2">
              Biological capacity
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              The physiological maximum fertility given current environmental
              exposures. Includes sperm quality (concentration, motility, DNA
              fragmentation), oocyte quality, hormonal milieu, and BBB
              integrity. This is the level most directly affected by EMF
              exposure.
            </p>
          </SectionCard>

          <SectionCard>
            <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
              Level 2
            </p>
            <h3 className="text-base font-semibold mb-2">
              EMF-behavioral coupling
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              How personal device use interacts with ambient EMF exposure. A
              person in a high-ambient environment who also carries a phone
              experiences a non-linear coupling effect. This level captures the
              interaction between infrastructure-level and personal-level
              exposure.
            </p>
          </SectionCard>

          <SectionCard>
            <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
              Level 3
            </p>
            <h3 className="text-base font-semibold mb-2">
              True culture
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Voluntary fertility choices independent of biological capacity.
              Education, urbanization, contraceptive access, economic
              opportunity, and cultural norms. This component exists in all
              demographic models; BERM adds the biological and EMF layers
              underneath it.
            </p>
          </SectionCard>
        </div>
      </section>

      {/* ── Interactive causal chain diagram ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">
          Causal pathway diagram
        </h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          The diagram below shows the complete mechanistic chain from Lindgren
          geometry to TFR decline. Nine levels, 26 nodes, 31 edges. Click any
          node to see its mechanism, Lindgren interpretation, quantitative
          formulation, recovery parameters, and key references. Node borders
          are colored by epistemic level.
        </p>
        <div className="overflow-x-auto">
          <CausalChainDiagram />
        </div>
      </section>

      {/* ── Lindgren chi coupling ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">
          Lindgren chi coupling equation
        </h2>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
          The coupling between ambient EMF infrastructure and personal device
          exposure is not linear. The chi function describes a saturation
          curve: at low ambient levels, personal exposure adds little on top;
          at high ambient levels, personal exposure is already dominated by the
          environmental field.
        </p>
        <Eq>
          &chi;(&#256;) = &#256; / &radic;(1 + &#256;&sup2;)
        </Eq>
        <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed">
          Where <code className="font-mono-num text-foreground">&Amacr;</code>{" "}
          is the normalized ambient exposure (0 = no infrastructure, 1 =
          saturation). The function approaches 1 asymptotically, meaning the
          marginal effect of personal devices diminishes as ambient exposure
          grows.
        </p>
      </section>

      {/* ── Two-channel model ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">
          Two-channel exposure model
        </h2>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
          Total effective EMF exposure is the sum of two channels: the ambient
          field (cell towers, Wi-Fi infrastructure, power lines) and the
          personal component (phone, laptop, wearables) modulated by the chi
          coupling.
        </p>
        <Eq>
          total = ambient + &chi;(ambient) &times; personal
        </Eq>
        <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed">
          This means that in a country with near-zero cellular infrastructure,
          even heavy personal phone use contributes little total exposure (chi
          is near zero). Conversely, in a fully saturated environment, the
          personal component is added almost linearly.
        </p>
      </section>

      {/* ── Five-layer recovery model ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">
          Five-layer recovery model
        </h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          If EMF exposure were reduced, different biological systems would
          recover at different rates. The &alpha; parameter for each layer
          represents the fraction of damage that is reversible (1.0 = fully
          reversible, 0.0 = permanent).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-foreground-muted">
                <th className="py-2 pr-4 font-medium">Layer</th>
                <th className="py-2 pr-4 font-medium">&alpha;</th>
                <th className="py-2 pr-4 font-medium">Recovery timescale</th>
                <th className="py-2 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-card-border">
                <td className="py-3 pr-4 font-medium">VGIC gating</td>
                <td className="py-3 pr-4 font-mono-num">1.0</td>
                <td className="py-3 pr-4 text-foreground-muted">Hours</td>
                <td className="py-3 text-foreground-muted">
                  Ion channel conformational changes reverse immediately upon
                  cessation of field
                </td>
              </tr>
              <tr className="border-b border-card-border">
                <td className="py-3 pr-4 font-medium">ROS clearance</td>
                <td className="py-3 pr-4 font-mono-num">0.8</td>
                <td className="py-3 pr-4 text-foreground-muted">Days to weeks</td>
                <td className="py-3 text-foreground-muted">
                  Antioxidant systems restore balance, but chronic oxidative
                  stress may cause lasting mitochondrial damage
                </td>
              </tr>
              <tr className="border-b border-card-border">
                <td className="py-3 pr-4 font-medium">DNA repair (SDF)</td>
                <td className="py-3 pr-4 font-mono-num">0.1</td>
                <td className="py-3 pr-4 text-foreground-muted">
                  Months (spermatogenesis cycle)
                </td>
                <td className="py-3 text-foreground-muted">
                  New sperm are generated every 74 days, but stem cell damage
                  may persist across cycles
                </td>
              </tr>
              <tr className="border-b border-card-border">
                <td className="py-3 pr-4 font-medium">Leydig cell function</td>
                <td className="py-3 pr-4 font-mono-num">0.3</td>
                <td className="py-3 pr-4 text-foreground-muted">Months to years</td>
                <td className="py-3 text-foreground-muted">
                  Testosterone-producing cells may partially recover, but
                  chronic atrophy reduces regenerative capacity
                </td>
              </tr>
              <tr className="border-b border-card-border last:border-0">
                <td className="py-3 pr-4 font-medium">Neuronal (BBB)</td>
                <td className="py-3 pr-4 font-mono-num">0.0</td>
                <td className="py-3 pr-4 text-foreground-muted">Irreversible</td>
                <td className="py-3 text-foreground-muted">
                  Neuronal damage from chronic BBB leakage is assumed
                  permanent in the model
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Compensation mechanism ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">
          Compensation mechanism
        </h2>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
          Observed TFR is not simply the product of the three levels. Societies
          partially compensate for biological decline through assisted
          reproduction, behavioral changes, and policy interventions. The
          effective TFR includes a compensation exponent &alpha; = 0.43 that
          captures this partial offset.
        </p>
        <Eq>
          TFR<sub>eff</sub> = (bioCap &times; behav)<sup>(1&minus;&alpha;)</sup>{" "}
          &times; rate<sub>2024</sub> &times; cultRatio &times;{" "}
          bioBehav<sub>2024</sub><sup>&alpha;</sup>
        </Eq>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
          Where:
        </p>
        <ul className="text-sm text-foreground-muted space-y-2 max-w-3xl ml-4 mb-4">
          <li>
            <strong className="text-foreground">bioCap</strong> -- biological
            capacity (Level 1), normalized 0-1
          </li>
          <li>
            <strong className="text-foreground">behav</strong> -- EMF-behavioral
            coupling factor (Level 2)
          </li>
          <li>
            <strong className="text-foreground">&alpha; = 0.43</strong> --
            compensation exponent, calibrated against 2000-2024 historical data
          </li>
          <li>
            <strong className="text-foreground">
              rate<sub>2024</sub>
            </strong>{" "}
            -- the observed TFR in 2024 (calibration anchor)
          </li>
          <li>
            <strong className="text-foreground">cultRatio</strong> -- ratio of
            projected cultural fertility preference to 2024 baseline
          </li>
          <li>
            <strong className="text-foreground">
              bioBehav<sub>2024</sub>
            </strong>{" "}
            -- the biological-behavioral product at calibration time
          </li>
        </ul>
        <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed">
          When &alpha; = 0, there is no compensation and biological decline
          passes through directly to TFR. When &alpha; = 1, compensation is
          complete and biological decline has no effect on observed TFR. The
          calibrated value of 0.43 implies partial but incomplete compensation
          -- biological decline still manifests in TFR, but at roughly half
          the rate it would without societal adaptation.
        </p>
      </section>

      {/* ── mTOR convergence ── */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">
          mTOR convergence hypothesis
        </h2>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
          mTOR is the downstream integrator where EMF-induced Ca&sup2;&#8314;
          influx converges with aging, fertility, and cancer pathways. The
          Sempou pathway: EMF &rarr; VGIC &rarr; Ca&sup2;&#8314;&uarr; &rarr;
          mTOR hyperactivation &rarr; autophagy&darr;, senescent cell
          accumulation, mitochondrial quality control&darr;, chronic
          inflammation&uarr;.
        </p>
        <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
          Metformin activates AMPK, which suppresses mTOR -- the exact
          opposite of the EMF-induced pathway. The hypothesis: metformin&apos;s
          longevity benefit is not anti-aging per se but anti-EMF-accelerated-aging.
          In a natural EMF environment (Amish), the benefit should be minimal.
        </p>
        <Eq>
          mTOR<sub>eff</sub> = (1.0 + 0.25 &times; EMF) &times; &prod;(1 &minus;
          reduction<sub>i</sub>)
        </Eq>
        <Eq>
          aging rate = mTOR<sub>eff</sub><sup>0.7</sup>
        </Eq>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          Where EMF is normalized exposure (0 = no infrastructure, 1 =
          modern city), and reduction factors include metformin (0.30),
          rapamycin (0.85), caloric restriction (0.20), intermittent fasting
          (0.10).
        </p>

        <h3 className="text-base font-semibold mb-3">
          Three epidemics, one mechanism
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SectionCard>
            <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
              Aging
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              mTOR&uarr; &rarr; autophagy&darr;, senescence&uarr;,
              inflammation&uarr;, mitochondria&darr; &rarr; accelerated aging
            </p>
          </SectionCard>
          <SectionCard>
            <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
              Fertility
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              mTOR&uarr; &rarr; spermatogonial differentiation&darr;,
              follicular burnout&uarr;, AMH&darr; &rarr; TFR&darr;
            </p>
          </SectionCard>
          <SectionCard>
            <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
              Cancer
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              mTOR&uarr; &rarr; proliferation&uarr;, tumor growth&uarr;,
              metastasis&uarr; &rarr; cancer risk&uarr;
            </p>
          </SectionCard>
        </div>

        <h3 className="text-base font-semibold mb-3">
          Testable predictions
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-foreground-muted">
                <th className="py-2 pr-4 font-medium">ID</th>
                <th className="py-2 pr-4 font-medium">Prediction</th>
                <th className="py-2 font-medium">Test</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-card-border">
                <td className="py-3 pr-4 font-mono-num">E1</td>
                <td className="py-3 pr-4 text-foreground-muted">
                  Metformin longevity benefit is larger in high-EMF
                  environments
                </td>
                <td className="py-3 text-foreground-muted">
                  UK CPRD stratified by urban/rural
                </td>
              </tr>
              <tr className="border-b border-card-border">
                <td className="py-3 pr-4 font-mono-num">E2</td>
                <td className="py-3 pr-4 text-foreground-muted">
                  Amish metformin users show smaller longevity bonus than
                  general population
                </td>
                <td className="py-3 text-foreground-muted">
                  Amish diabetic cohort comparison
                </td>
              </tr>
              <tr className="border-b border-card-border">
                <td className="py-3 pr-4 font-mono-num">E3</td>
                <td className="py-3 pr-4 text-foreground-muted">
                  Blue Zone longevity advantage disappears as 4G/5G arrives
                </td>
                <td className="py-3 text-foreground-muted">
                  Okinawa, Sardinia, Ikaria cohort tracking
                </td>
              </tr>
              <tr className="border-b border-card-border">
                <td className="py-3 pr-4 font-mono-num">E4</td>
                <td className="py-3 pr-4 text-foreground-muted">
                  CR experiment effect sizes increase by decade
                  (rising lab EMF)
                </td>
                <td className="py-3 text-foreground-muted">
                  Meta-analysis: effect size vs publication year
                </td>
              </tr>
              <tr className="border-b border-card-border">
                <td className="py-3 pr-4 font-mono-num">E5</td>
                <td className="py-3 pr-4 text-foreground-muted">
                  TAME trial benefit stratifies by EMF exposure
                </td>
                <td className="py-3 text-foreground-muted">
                  Urban vs rural subgroup analysis
                </td>
              </tr>
              <tr className="border-b border-card-border last:border-0">
                <td className="py-3 pr-4 font-mono-num">E6</td>
                <td className="py-3 pr-4 text-foreground-muted">
                  Shabbat (25h/week EMF-free) acts as intermittent mTOR
                  fasting, supporting Haredi TFR and longevity
                </td>
                <td className="py-3 text-foreground-muted">
                  Haredi vs secular Israeli cohort
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Links ── */}
      <section className="border-t border-border pt-8 mt-8 flex flex-wrap gap-4">
        <Link
          href="/evidence"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
        >
          Browse evidence
        </Link>
        <Link
          href="/predictions"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-sm font-medium rounded-lg transition-colors"
        >
          View predictions
        </Link>
      </section>

      {/* Epistemic note */}
      <section className="mt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          Epistemic note: The equations above are the current model
          specification (v17.0). Parameter values are calibrated against
          observed data and will be updated as new evidence becomes available.
          The model is explicitly designed to be falsifiable -- if its
          predictions fail, the model is wrong.
        </p>
      </section>
    </div>
  );
}
