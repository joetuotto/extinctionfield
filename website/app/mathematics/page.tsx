import type { Metadata } from "next";
import Link from "next/link";
import { MathBlock } from "@/components/MathBlock";
import { Derivation } from "@/components/Derivation";

export const metadata: Metadata = {
  title: "Mathematics - Extinction Field",
  description:
    "Complete mathematical derivation of the BERM model from Lindgren geometry to TFR prediction. Every step is verifiable.",
};

const SECTIONS = [
  { id: "lindgren", num: "§1", label: "Lindgren geometry" },
  { id: "chi", num: "§2", label: "Selection rule χ(Ā)" },
  { id: "two-channel", num: "§3", label: "Two-channel model" },
  { id: "biocap", num: "§4", label: "Biological capacity" },
  { id: "behavioral", num: "§5", label: "Behavioral factor" },
  { id: "cultural", num: "§6", label: "Cultural / compensation" },
  { id: "jacobian", num: "§7", label: "Jacobian" },
  { id: "locked", num: "§8", label: "Locked predictions" },
  { id: "falsification", num: "§9", label: "Falsification conditions" },
  { id: "pharmacological", num: "§10", label: "Pharmacological validation" },
];

function SectionNav() {
  return (
    <nav className="hidden lg:block sticky top-20 w-48 shrink-0 self-start">
      <ul className="space-y-1.5 text-sm border-l border-card-border pl-3">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="block text-foreground-muted hover:text-accent transition-colors leading-snug"
            >
              <span className="text-xs text-foreground-muted/60 mr-1">
                {s.num}
              </span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function DerivationLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs text-foreground-muted leading-relaxed mt-2">
      {children}
    </p>
  );
}

export default function MathematicsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Mathematical Foundation
        </h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          Complete derivation of the BERM model from Lindgren geometry to TFR
          prediction. Every equation is derivable from the previous one. Click
          &quot;Full derivation&quot; to see intermediate steps.
        </p>
      </header>

      <div className="flex gap-10">
        <SectionNav />

        <div className="flex-1 min-w-0 space-y-14">
          {/* §1 Lindgren geometry */}
          <section id="lindgren">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">§1</span>
              Lindgren Geometry
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              In the framework of Lindgren, Kovacs &amp; Liukkonen (2025), the
              electromagnetic potential is part of spacetime geometry. The metric
              tensor absorbs the EM four-potential:
            </p>
            <div className="text-center my-4">
              <MathBlock tex="g_{\mu\nu} = \eta_{\mu\nu} + A_\mu A_\nu" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              This means the electromagnetic field changes the geometry in which
              all physical processes occur — including biological ion channels.
              Maxwell&apos;s equations emerge as Bianchi identities of this
              geometry.
            </p>

            <Derivation>
              <DerivationLine>
                In standard GR the metric is dynamical:
              </DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu} \quad \text{(linearized gravity)}" />
              </div>
              <DerivationLine>
                In Lindgren&apos;s framework, the EM potential replaces the
                gravitational perturbation:
              </DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="g_{\mu\nu} = \eta_{\mu\nu} + \kappa \, A_\mu A_\nu" />
              </div>
              <DerivationLine>
                where κ is a coupling constant (normalized to 1 in suitable
                units).
              </DerivationLine>
              <DerivationLine>
                Maxwell&apos;s equations follow from the Bianchi identities:
              </DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\nabla_\mu F^{\mu\nu} = 0 \quad \text{follows from} \quad \nabla_\mu G^{\mu\nu} = 0" />
              </div>
              <DerivationLine>
                Vassallo et al. (2025) validated this derivation independently.
              </DerivationLine>
            </Derivation>
          </section>

          {/* §2 Selection rule chi */}
          <section id="chi">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">§2</span>
              Selection Rule χ(Ā)
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              When the metric is linearized around a background Ā, the
              biologically relevant response to a perturbation{" "}
              <MathBlock tex="a" display={false} /> is:
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\chi(\bar{A}) = \frac{\bar{A}}{\sqrt{1 + \bar{A}^2}}" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              In zero background (Ā = 0) there is no linear response. At the
              cell membrane (Ā ≈ 7 × 10⁶ V/m) the response is maximal.
            </p>

            <Derivation>
              <DerivationLine>
                Linearize g_μν around background ḡ = η + Ā⊗Ā:
              </DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="g_{\mu\nu} = \bar{g}_{\mu\nu} + h_{\mu\nu}" />
              </div>
              <DerivationLine>where:</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="h_{\mu\nu} = \bar{A}_\mu a_\nu + a_\mu \bar{A}_\nu + a_\mu a_\nu \quad (a = \text{perturbation})" />
              </div>
              <DerivationLine>First order (linear response):</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="h^{(1)}_{\mu\nu} = \bar{A}_\mu a_\nu + a_\mu \bar{A}_\nu" />
              </div>
              <DerivationLine>
                The biologically relevant quantity is the relative magnitude of
                the metric perturbation:
              </DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\frac{|h^{(1)}|}{|\bar{g}|} = \frac{2|\bar{A}||a|}{1 + |\bar{A}|^2}" />
              </div>
              <DerivationLine>This gives the selection rule:</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\chi(\bar{A}) = \frac{|\bar{A}|}{\sqrt{1 + |\bar{A}|^2}}" />
              </div>
              <DerivationLine>Properties:</DerivationLine>
              <div className="space-y-1 mt-2 ml-4">
                <div>
                  <MathBlock
                    tex="\chi(0) = 0 \quad \text{— no linear response in empty background}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\chi(\bar{A}) \to 1 \;\text{as}\; \bar{A} \to \infty \quad \text{— saturates}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\chi'(0) = 1 \quad \text{— maximum sensitivity near zero}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\chi'(\bar{A}) = \frac{1}{(1+\bar{A}^2)^{3/2}} \quad \text{— sensitivity decreases}"
                    display={false}
                  />
                </div>
              </div>
              <DerivationLine>Cell membrane:</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="V_{\text{mem}} = -70\;\text{mV}, \quad d = 10\;\text{nm} \;\Rightarrow\; E = 7 \times 10^6\;\text{V/m}" />
              </div>
              <div className="text-center my-2">
                <MathBlock tex="\chi(7 \times 10^6) \approx 1.0 \quad \text{(saturated)}" />
              </div>
              <DerivationLine>
                Cells are MAXIMALLY sensitive to external EMF perturbation.
              </DerivationLine>
            </Derivation>
          </section>

          {/* §3 Two-channel model */}
          <section id="two-channel">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">§3</span>
              Two-Channel Model
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              Total exposure is the sum of two channels where the personal
              channel is modulated by the selection rule:
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{total}(y) = \text{ambient}(y) + \chi\!\big(\text{ambient}(y)\big) \times \text{personal}(y)" />
            </div>
            <div className="text-center my-4">
              <MathBlock tex="\text{cumEMF} = \sum_{y=y_0}^{Y} \text{total}(y)" />
            </div>

            <Derivation>
              <DerivationLine>
                Ambient = base stations + Wi-Fi + IoT (infrastructure level)
              </DerivationLine>
              <DerivationLine>
                Personal = phone + earbuds + watches (personal devices)
              </DerivationLine>
              <DerivationLine>
                Ambient is the background Ā that determines χ.
              </DerivationLine>
              <DerivationLine>
                Personal is the perturbation a whose biological response depends
                on χ(Ā).
              </DerivationLine>
              <div className="mt-3">
                <DerivationLine>
                  When Ā = 0 (Amish): total = 0 + χ(0) × personal = 0 + 0 = 0
                </DerivationLine>
                <DerivationLine>
                  → Personal devices produce no biological response.
                </DerivationLine>
              </div>
              <div className="mt-3">
                <DerivationLine>
                  When Ā → ∞ (saturated city): total ≈ ambient + 1 × personal
                </DerivationLine>
                <DerivationLine>
                  → Personal adds at full magnitude.
                </DerivationLine>
              </div>
              <div className="mt-3">
                <DerivationLine>
                  Cumulative exposure is the historical sum:
                </DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{cumEMF}(Y) = \sum_{y=\text{start}}^{Y} \Big[\text{ambient}(y) + \chi\!\big(\text{ambient}(y)\big) \times \text{personal}(y)\Big]" />
                </div>
                <DerivationLine>
                  where start is the country&apos;s EMF history start year (e.g.
                  Finland 1991).
                </DerivationLine>
              </div>
            </Derivation>
          </section>

          {/* §4 Biological capacity */}
          <section id="biocap">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">§4</span>
              Biological Capacity
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              Biological capacity declines exponentially as a function of
              cumulative exposure, with a threshold below which repair
              mechanisms compensate:
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{bioCap} = a \cdot e^{-b \cdot \max(0,\;\text{cumEMF} - \theta)}" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              where <MathBlock tex="a = 6.5" display={false} /> (pre-EMF
              baseline TFR),{" "}
              <MathBlock tex="b = 0.010" display={false} /> (decline parameter),{" "}
              <MathBlock tex="\theta = 5" display={false} /> (threshold).
            </p>

            <Derivation>
              <DerivationLine>
                Exponential decline follows from the assumption that each
                year&apos;s EMF exposure produces a proportionally equal
                biological damage:
              </DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\frac{d\,\text{bioCap}}{dt} = -b \times \text{bioCap} \times \frac{d\,\text{EMF}}{dt}" />
              </div>
              <DerivationLine>Integrating:</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\text{bioCap}(t) = \text{bioCap}(0) \times e^{-b \times \text{cumEMF}(t)}" />
              </div>
              <DerivationLine>
                Threshold θ = 5 reflects biological resistance: small exposures
                do not exceed repair mechanism capacity.
              </DerivationLine>
              <DerivationLine>
                a = 6.5 is calibrated: it is the approximate &quot;natural
                TFR&quot; without any EMF exposure (cf. Amish ≈ 6.5, Hutterites
                ≈ 9.0).
              </DerivationLine>
              <p className="text-xs text-accent mt-3">
                <Link href="/sentinel#lab-mammals" className="hover:underline">
                  → Controlled laboratory evidence for bioCap parameters
                </Link>
              </p>
            </Derivation>
          </section>

          {/* §5 Behavioral factor */}
          <section id="behavioral">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">§5</span>
              Behavioral Factor
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              The endocrine vector (testosterone, oxytocin, dopamine, cortisol)
              as a geometric mean:
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{behav} = \max\!\left(0.1,\;\left(\prod_{i=1}^{4} e^{-r_i \cdot \text{cumEMF}}\right)^{\!1/4}\right)" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              where{" "}
              <MathBlock
                tex="r_1 = 0.010"
                display={false}
              />{" "}
              (OT),{" "}
              <MathBlock
                tex="r_2 = 0.013"
                display={false}
              />{" "}
              (T),{" "}
              <MathBlock
                tex="r_3 = 0.016"
                display={false}
              />{" "}
              (DA),{" "}
              <MathBlock
                tex="r_4 = 0.008"
                display={false}
              />{" "}
              (cortisol).
            </p>

            <Derivation>
              <DerivationLine>
                Each hormone declines exponentially:
              </DerivationLine>
              <div className="space-y-1 mt-2 ml-4">
                <div>
                  <MathBlock
                    tex="\text{OT}(t) = e^{-0.010 \times \text{cumEMF}} \quad \text{— oxytocin}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\text{T}(t) = e^{-0.013 \times \text{cumEMF}} \quad \text{— testosterone}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\text{DA}(t) = e^{-0.016 \times \text{cumEMF}} \quad \text{— dopamine}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\text{cort}(t) = e^{-0.008 \times \text{cumEMF}} \quad \text{— cortisol (inverse)}"
                    display={false}
                  />
                </div>
              </div>
              <DerivationLine>
                Geometric mean: (OT × T × DA × cort)^(1/4)
              </DerivationLine>
              <DerivationLine>
                Geometric &gt; arithmetic because hormones are MULTIPLICATIVE: if
                any one is zero, the total effect is zero.
              </DerivationLine>
              <div className="mt-3">
                <DerivationLine>
                  r₂ = 0.013 is calibrated from Travison&apos;s −1%/year
                  testosterone decline:
                </DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{T}(\text{cumEMF}) = e^{-0.013 \times \text{cumEMF}}" />
                </div>
                <div className="text-center my-2">
                  <MathBlock tex="\frac{dT}{dt} \approx -0.013 \times \frac{d\text{EMF}}{dt} \times T" />
                </div>
                <DerivationLine>
                  If dEMF/dt ≈ 1/year → dT/T ≈ −1.3%/year ≈ Travison.
                </DerivationLine>
              </div>
            </Derivation>
          </section>

          {/* §6 Cultural / compensation */}
          <section id="cultural">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">§6</span>
              Cultural Factor &amp; Compensation
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              The predicted TFR combines all three layers:
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{TFR}_{\text{pred}} = \text{bioCap} \times \text{behav} \times \text{cultRate}" />
            </div>
            <div className="text-center my-4">
              <MathBlock tex="\text{cultRate} = r_{2024} \times \frac{\text{cult}(y)}{\text{cult}(2024)} \times \left(\frac{\text{bioBehav}_{2024}}{\text{bioBehav}(y)}\right)^\alpha" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              where{" "}
              <MathBlock tex="\alpha = 0.43" display={false} /> is the
              biologically derived compensation exponent.
            </p>

            <Derivation>
              <DerivationLine>
                The cultural rate is the RESIDUAL: it contains everything that
                bioCap and behav do not explain. Calibrated from 2024:
              </DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="r_{2024} = \frac{\text{observedTFR}(2024)}{\text{bioCap}(2024) \times \text{behav}(2024)}" />
              </div>
              <DerivationLine>
                Compensation term: society partially compensates biological
                decline (ART, pronatalist policy, behavioral changes):
              </DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\text{compensation} = \left(\frac{\text{bioBehav}_{2024}}{\text{bioBehav}(y)}\right)^\alpha" />
              </div>
              <DerivationLine>
                α = 0.43 derives from the biological recovery structure:
              </DerivationLine>
              <div className="overflow-x-auto mt-3">
                <table className="text-xs text-foreground-muted border-collapse w-full">
                  <thead>
                    <tr className="border-b border-card-border">
                      <th className="text-left py-1 pr-4">Layer</th>
                      <th className="text-right py-1 pr-4">α</th>
                      <th className="text-right py-1 pr-4">Weight</th>
                      <th className="text-right py-1">α × w</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-card-border/50">
                      <td className="py-1 pr-4">VGIC (immediate, reversible)</td>
                      <td className="text-right py-1 pr-4">1.0</td>
                      <td className="text-right py-1 pr-4">0.10</td>
                      <td className="text-right py-1">0.100</td>
                    </tr>
                    <tr className="border-b border-card-border/50">
                      <td className="py-1 pr-4">ROS (days–weeks)</td>
                      <td className="text-right py-1 pr-4">0.8</td>
                      <td className="text-right py-1 pr-4">0.30</td>
                      <td className="text-right py-1">0.240</td>
                    </tr>
                    <tr className="border-b border-card-border/50">
                      <td className="py-1 pr-4">DNA (partially irreversible)</td>
                      <td className="text-right py-1 pr-4">0.1</td>
                      <td className="text-right py-1 pr-4">0.25</td>
                      <td className="text-right py-1">0.025</td>
                    </tr>
                    <tr className="border-b border-card-border/50">
                      <td className="py-1 pr-4">Leydig (months–years)</td>
                      <td className="text-right py-1 pr-4">0.3</td>
                      <td className="text-right py-1 pr-4">0.20</td>
                      <td className="text-right py-1">0.060</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4">Neuron (permanent)</td>
                      <td className="text-right py-1 pr-4">0.0</td>
                      <td className="text-right py-1 pr-4">0.15</td>
                      <td className="text-right py-1">0.000</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-card-border font-medium">
                      <td className="py-1 pr-4" colSpan={3}>
                        α_eff = Σ(weight × α)
                      </td>
                      <td className="text-right py-1">0.425 ≈ 0.43</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="mt-3">
                <DerivationLine>Effective impact:</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{TFR} \propto (\text{bioCap} \times \text{behav})^{1-\alpha}" />
                </div>
                <div className="space-y-1 ml-4">
                  <DerivationLine>
                    α = 0.43 → exponent = 0.57
                  </DerivationLine>
                  <DerivationLine>
                    α = 1.0 → exponent = 0 (full compensation, no EMF effect)
                  </DerivationLine>
                  <DerivationLine>
                    α = 0.0 → exponent = 1.0 (no compensation, direct effect)
                  </DerivationLine>
                </div>
              </div>
            </Derivation>
          </section>

          {/* §7 Jacobian */}
          <section id="jacobian">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">§7</span>
              Jacobian
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              The model&apos;s total derivative with respect to EMF is the
              product of six partial derivatives. If any one factor is zero, the
              entire chain breaks:
            </p>
            <div className="text-center my-4 overflow-x-auto">
              <MathBlock tex="\frac{\partial\,\text{TFR}}{\partial E} = \frac{\partial H_{RP}}{\partial E} \cdot \frac{\partial c_R}{\partial H_{RP}} \cdot \frac{\partial X}{\partial c_R} \cdot \frac{\partial V_B}{\partial X} \cdot \frac{\partial M_{\text{repro}}}{\partial V_B} \cdot \frac{\partial\,\text{TFR}}{\partial M_{\text{repro}}}" />
            </div>

            <Derivation>
              <DerivationLine>Each factor:</DerivationLine>
              <div className="space-y-3 mt-3">
                <div>
                  <div className="text-center my-1">
                    <MathBlock
                      tex="\partial H_{RP}/\partial E"
                      display={false}
                    />
                  </div>
                  <DerivationLine>
                    EM field effect on radical pair → CRY channel, spin
                    chemistry, χ_B
                  </DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock
                      tex="\partial c_R/\partial H_{RP}"
                      display={false}
                    />
                  </div>
                  <DerivationLine>
                    Radical pair effect → ROS concentration → mitochondrial
                    response
                  </DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock
                      tex="\partial X/\partial c_R"
                      display={false}
                    />
                  </div>
                  <DerivationLine>
                    ROS concentration → cell state → SDF, lipid peroxidation,
                    protein damage
                  </DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock
                      tex="\partial V_B/\partial X"
                      display={false}
                    />
                  </div>
                  <DerivationLine>
                    Cell state → bioelectric state → V_mem change, ion channel
                    dynamics
                  </DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock
                      tex="\partial M_{\text{repro}}/\partial V_B"
                      display={false}
                    />
                  </div>
                  <DerivationLine>
                    Bioelectric state → reproduction → spermatogenesis,
                    ovulation, fertilization
                  </DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock
                      tex="\partial\,\text{TFR}/\partial M_{\text{repro}}"
                      display={false}
                    />
                  </div>
                  <DerivationLine>
                    Reproductive capacity → TFR → fecundability → TTP → ASFR →
                    TFR
                  </DerivationLine>
                </div>
              </div>
            </Derivation>
          </section>

          {/* §8 Locked predictions */}
          <section id="locked">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">§8</span>
              Locked Predictions
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              The model produces specific, locked predictions that will either
              come true or not. The lock is irrevocable: a prediction cannot be
              changed retroactively without a version number update.
            </p>
            <div className="overflow-x-auto">
              <table className="text-sm border-collapse w-full">
                <thead>
                  <tr className="border-b border-card-border text-foreground-muted">
                    <th className="text-left py-2 pr-4">Country</th>
                    <th className="text-left py-2 pr-4">Year</th>
                    <th className="text-left py-2 pr-4">Metric</th>
                    <th className="text-right py-2 pr-4">Central</th>
                    <th className="text-right py-2 pr-4">95% CI</th>
                    <th className="text-left py-2">Locked</th>
                  </tr>
                </thead>
                <tbody className="text-foreground-muted">
                  {[
                    { country: "Finland", year: 2030, metric: "TFR", central: 1.17, ci: "1.02–1.24", locked: "2026-08-18" },
                    { country: "South Korea", year: 2030, metric: "TFR", central: 0.60, ci: "0.48–0.72", locked: "2026-08-18" },
                    { country: "South Korea", year: 2035, metric: "TFR", central: 0.52, ci: "0.40–0.64", locked: "2026-08-18" },
                    { country: "Japan", year: 2030, metric: "TFR", central: 1.04, ci: "0.88–1.20", locked: "2026-08-18" },
                    { country: "USA", year: 2030, metric: "TFR", central: 1.45, ci: "1.25–1.65", locked: "2026-08-18" },
                    { country: "Brazil", year: 2030, metric: "TFR", central: 1.55, ci: "1.40–1.68", locked: "2026-08-18" },
                    { country: "Global", year: 2040, metric: "TFR", central: 1.78, ci: "1.55–2.05", locked: "2026-08-18" },
                    { country: "Global", year: 2050, metric: "Sperm %", central: 62.0, ci: "48–75", locked: "2026-08-18" },
                  ].map((p, i) => (
                    <tr
                      key={i}
                      className="border-b border-card-border/50"
                    >
                      <td className="py-2 pr-4">{p.country}</td>
                      <td className="py-2 pr-4">{p.year}</td>
                      <td className="py-2 pr-4">{p.metric}</td>
                      <td className="text-right py-2 pr-4 font-mono-num">
                        {p.central}
                      </td>
                      <td className="text-right py-2 pr-4 font-mono-num">
                        {p.ci}
                      </td>
                      <td className="py-2 text-xs">{p.locked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-foreground-muted mt-3">
              v17.0 — predictions frozen at git SHA. If future observations
              fall outside the CI, the model is falsified — not the prediction
              adjusted.
            </p>
          </section>

          {/* §9 Falsification conditions */}
          <section id="falsification">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">§9</span>
              Falsification Conditions
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              The model is explicitly falsifiable. Each condition is specific and
              testable:
            </p>
            <ul className="space-y-3">
              {[
                {
                  condition: "Lindgren's metric is mathematically incorrect",
                  detail:
                    "If the derivation g_μν = η_μν + A_μA_ν is shown to be internally inconsistent or to contradict established electrodynamics, the geometric foundation fails.",
                },
                {
                  condition:
                    "VGCC blockers do not prevent EMF's biological effects",
                  detail:
                    "If calcium channel blockers fail to attenuate EMF-induced ROS, SDF, or hormonal changes in controlled experiments, the primary mechanism is wrong.",
                },
                {
                  condition:
                    "Amish community TFR declines at the same rate as the general population",
                  detail:
                    "If the Amish (EMF ≈ 0) show TFR decline matching high-EMF populations, the EMF hypothesis is falsified. Current Amish TFR ≈ 6.5 is stable.",
                },
                {
                  condition:
                    "Sperm concentration decline stops without reduced EMF exposure",
                  detail:
                    "If the −1.2%/year sperm decline reverses or stabilizes while cumulative EMF continues to increase, the dose-response relationship is wrong.",
                },
                {
                  condition:
                    "A locked prediction fails outside its confidence interval",
                  detail:
                    "Any prediction in §8 that falls outside its 95% CI when the observation year arrives falsifies the model at that prediction's scope.",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="border border-card-border rounded-lg p-4"
                >
                  <p className="text-sm font-medium text-foreground mb-1">
                    {item.condition}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* §10 Pharmacological validation */}
          <section id="pharmacological">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">§10</span>
              Pharmacological Validation Matrix
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              Three independent pharmacological interventions provide
              quantitative calibration anchors for separate pathways. Each drug
              isolates a specific mechanism, allowing the model&apos;s pathway
              structure to be tested independently.
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="text-sm border-collapse w-full">
                <thead>
                  <tr className="border-b border-card-border text-foreground-muted">
                    <th className="text-left py-2 pr-4">Drug</th>
                    <th className="text-left py-2 pr-4">Target</th>
                    <th className="text-left py-2 pr-4">Pathway</th>
                    <th className="text-left py-2 pr-4">Observed effect</th>
                    <th className="text-left py-2">BERM calibration</th>
                  </tr>
                </thead>
                <tbody className="text-foreground-muted">
                  <tr className="border-b border-card-border/50">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      CCB (nifedipine)
                    </td>
                    <td className="py-2 pr-4">L-type VGCC</td>
                    <td className="py-2 pr-4">A (VGCC→ROS→SDF)</td>
                    <td className="py-2 pr-4">90% VGCC block → −23% sperm conc.</td>
                    <td className="py-2">EMF disruption ≈ 6%</td>
                  </tr>
                  <tr className="border-b border-card-border/50">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      Rapamycin
                    </td>
                    <td className="py-2 pr-4">mTOR (85% inhibition)</td>
                    <td className="py-2 pr-4">Sempou (mTOR→aging)</td>
                    <td className="py-2 pr-4">
                      Lifespan +10–25% (mice)
                    </td>
                    <td className="py-2">
                      mTOR_eff × 0.15
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-foreground">
                      Melatonin
                    </td>
                    <td className="py-2 pr-4">CRY/circadian</td>
                    <td className="py-2 pr-4">C (CRY→clock→ovulation)</td>
                    <td className="py-2 pr-4">
                      Restores circadian amplitude
                    </td>
                    <td className="py-2">Night EMF fraction correction</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Derivation>
              <DerivationLine>
                CCB calibration (pathway A):
              </DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\text{CCB blocks 90\% of VGCC} \;\Rightarrow\; \Delta\text{sperm} = -23\%" />
              </div>
              <div className="text-center my-2">
                <MathBlock tex="\text{EMF disruption} = \text{CCB}_{\text{effect}} \times \frac{\text{EMF}_{\text{disruption}}}{\text{CCB}_{\text{block}}} \approx 23\% \times \frac{0.25}{0.90} \approx 6\%" />
              </div>
              <DerivationLine>
                This 6% effective VGCC disruption is consistent with the
                observed −1.2%/year sperm decline over 5 years of cumulative
                exposure.
              </DerivationLine>

              <div className="mt-4">
                <DerivationLine>
                  Rapamycin calibration (Sempou pathway):
                </DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{mTOR}_{\text{eff}}^{\text{rapa}} = \text{mTOR}_{\text{baseline}} \times (1 - 0.85) = 0.15 \times \text{mTOR}" />
                </div>
                <div className="text-center my-2">
                  <MathBlock tex="\text{aging rate} = (0.15)^{0.7} \approx 0.24 \quad \text{(76\% reduction)}" />
                </div>
                <DerivationLine>
                  Observed mouse lifespan extension of 10–25% is consistent with
                  partial mTOR reduction in a realistic dosing regime (not 85%
                  sustained inhibition).
                </DerivationLine>
              </div>

              <div className="mt-4">
                <DerivationLine>
                  Melatonin calibration (pathway C):
                </DerivationLine>
                <DerivationLine>
                  Night EMF exposure disrupts CRY-mediated circadian signaling.
                  Exogenous melatonin (3–5 mg) restores circadian amplitude
                  independently of CRY, providing a pathway C bypass. If
                  melatonin supplementation eliminates EMF-associated circadian
                  disruption, pathway C is validated; if not, the CRY channel
                  requires revision.
                </DerivationLine>
              </div>

              <p className="text-xs text-accent mt-3">
                <Link href="/sentinel#lab-mammals" className="hover:underline">
                  → Controlled experimental evidence (laboratory mammals)
                </Link>
              </p>
            </Derivation>
          </section>
        </div>
      </div>
    </div>
  );
}
