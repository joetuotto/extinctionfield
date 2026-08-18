import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sentinel Species - Extinction Field",
  description:
    "Sentinel species evidence: reproductive decline in insects, amphibians, bees, birds, bats, and lab mammals eliminates all human confounders.",
};

interface SentinelRow {
  species: string;
  vgccConservation: string;
  absorptionSensitivity: string;
  documentedDecline: string;
  bermPrediction: string;
}

const CONVERGENCE_TABLE: SentinelRow[] = [
  {
    species: "Insects",
    vgccConservation: "73%",
    absorptionSensitivity: "High (size ≈ λ)",
    documentedDecline: "−75% biomass / 27 yr (Krefeld)",
    bermPrediction: "Most sensitive",
  },
  {
    species: "Amphibians",
    vgccConservation: "82%",
    absorptionSensitivity: "8.7× mammals",
    documentedDecline: "−41% population (IUCN)",
    bermPrediction: "Most sensitive vertebrate",
  },
  {
    species: "Bees",
    vgccConservation: "73%",
    absorptionSensitivity: "High + navigation",
    documentedDecline: "CCD, 30–40% annually",
    bermPrediction: "Navigation + VGCC",
  },
  {
    species: "Birds",
    vgccConservation: "87%",
    absorptionSensitivity: "Medium + magnetic compass",
    documentedDecline: "−29% North America 1970+",
    bermPrediction: "RPM/CRY disruption",
  },
  {
    species: "Bats",
    vgccConservation: "90%",
    absorptionSensitivity: "High (echolocation freq.)",
    documentedDecline: "White-nose + population↓",
    bermPrediction: "Immune + navigation",
  },
  {
    species: "Mammals (lab)",
    vgccConservation: "94%",
    absorptionSensitivity: "1× (baseline)",
    documentedDecline: "Sperm↓, fertility↓",
    bermPrediction: "Controlled experiments",
  },
  {
    species: "Humans",
    vgccConservation: "94%",
    absorptionSensitivity: "1× + tech use",
    documentedDecline: "TFR↓, sperm −51%",
    bermPrediction: "Cumulative exposure",
  },
];

interface SpeciesSection {
  id: string;
  title: string;
  biology: string;
  emfSensitivity: string;
  documentedDecline: string;
  bermPrediction: string;
  lindgrenNote: string;
  references: string[];
}

const SPECIES: SpeciesSection[] = [
  {
    id: "insects",
    title: "Insects: The 75% Collapse",
    biology:
      "Insects are the foundation of terrestrial biodiversity: they pollinate 87% of flowers, form the base of the food chain, and recycle organic matter. Their VGCCs are 73% identical to humans.",
    emfSensitivity:
      "Insect body size (mm–cm) is in the same order of magnitude as GSM/Wi-Fi wavelength (12 cm @ 2.4 GHz). This means the insect functions as a resonance antenna — it absorbs RF energy more efficiently than a larger animal. Thielens 2018: 3–6 dB absorption increase from 2G to 5G frequencies.",
    documentedDecline:
      "The Krefeld long-term study (Hallmann et al. 2017, PLOS ONE): flying insect biomass declined 75% in 27 years (1989–2016) across 63 protected areas in Germany. The decline occurred even in protected areas not exposed to pesticides or land-use changes. Sánchez-Bayo & Wyckhuys 2019: 40% of insect species are declining, 33% are threatened. The rate is 2.5% per year — faster than mammals or birds.",
    bermPrediction:
      "BERM predicts insects are the MOST SENSITIVE group because: (1) as resonance antennas they absorb RF efficiently, (2) VGCCs regulate flight muscle function and navigation, (3) they are small → SAR is relatively higher, (4) they are poikilothermic → no thermoregulation to buffer.",
    lindgrenNote:
      "In Lindgren's framework, insect size is critical: when an animal's physical size is λ/2 (half the wavelength), it functions as a half-wave dipole antenna absorbing at resonance. 2.4 GHz: λ = 12.5 cm, λ/2 = 6.25 cm. A large butterfly or beetle is this size. 5G (3.5 GHz): λ/2 = 4.3 cm → smaller insects in resonance. As EMF frequency increases (2G→5G), resonance shifts to SMALLER insects → a wider range of species is exposed.",
    references: [
      "Hallmann et al. 2017. PLOS ONE. −75% biomass in 27 years.",
      "Sánchez-Bayo & Wyckhuys 2019. Biol. Conserv. 40% of species declining.",
      "Thielens et al. 2018. Sci. Rep. 3–6 dB absorption increase at 5G frequencies.",
      "Balmori 2015. Rev. Environ. Health. EMF and insect decline.",
    ],
  },
  {
    id: "amphibians",
    title: "Amphibians: 8.7× More Sensitive",
    biology:
      "Amphibians (frogs, salamanders) are Earth's most threatened vertebrate group: 41% of species are threatened (IUCN). Their skin is permeable — it functions as a respiratory organ and is therefore especially susceptible to environmental electric fields.",
    emfSensitivity:
      "Amphibian skin electrical permeability is 8.7× higher than mammals (Becker). RF absorption is maximal in the 0.3–3 GHz range — exactly mobile phone and Wi-Fi frequencies. Becker's salamander lost regeneration capacity at >1 V/m in an external field. This is 100× below current safety limits.",
    documentedDecline:
      "IUCN 2023: 41% of amphibian species are threatened. The decline is faster than in any other vertebrate group. 'Enigmatic decline' — populations disappear even from pristine areas with no obvious cause (no habitat loss, no disease, no predation). Balmori 2006: frog populations have declined dramatically near base stations.",
    bermPrediction:
      "BERM predicts amphibians are the MOST SENSITIVE vertebrate group because: (1) 8.7× absorption sensitivity, (2) VGCCs regulate fertilization (egg Ca²⁺ wave), (3) they develop externally (no uterine protection), (4) Becker's regeneration data directly demonstrates DC control system disruption. 'Enigmatic decline' is the phenomenon BERM predicts: populations disappear without a local cause because EMF is global.",
    lindgrenNote:
      "Salamander regeneration requires a precise metric configuration (NEJ → negative DC → nanoampere threshold → dedifferentiation). Becker's 1 V/m threshold means, in Lindgren's terms: external perturbation exceeds the bifurcation threshold → the metric state no longer reaches the stationary solution enabling regeneration. 1 V/m is 100× below safety limits but sufficient to disrupt a nanoampere-sensitive geometric process.",
    references: [
      "IUCN 2023. Global Amphibian Assessment. 41% threatened.",
      "Becker 1985. Body Electric. Regeneration lost at >1 V/m.",
      "Balmori 2006. Electromagn. Biol. Med. Frogs and base stations.",
      "Stuart et al. 2004. Science. Coined 'enigmatic decline'.",
    ],
  },
  {
    id: "bees",
    title: "Bees: Colony Collapse and the VGCC Connection",
    biology:
      "Bees are a critical pollinator: 75% of crops depend on them. Colony Collapse Disorder (CCD) appeared in 2006 and has continued at 30–40% annual losses. Bee navigation relies on magnetite crystals and possibly CRY proteins.",
    emfSensitivity:
      "Bee VGCCs regulate vibration signaling (waggle dance) which communicates food source locations. Navigation partially depends on the geomagnetic field. Favre 2011: mobile phone signal triggered 'piping' (swarming readiness) in a bee colony. Sharma & Kumar 2010: phone RF reduced bee return rate by 50%.",
    documentedDecline:
      "USA: annual loss 30–40% (2006–2024). Europe: similar trend. CCD's 'hallmark': workers don't return to the hive but the queen and brood are fine — suggesting a navigation disruption. Pesticides (neonicotinoids) explain part of it but CCD continues even in areas where neonicotinoids are banned.",
    bermPrediction:
      "BERM predicts CCD is partially EMF-mediated: (1) navigation disruption (magnetite + CRY → RPM disruption), (2) VGCC disruption in vibration signaling → communication weakens, (3) immunosuppression (HPA equivalent in insects) → disease resistance drops. CCD's timing (2006) coincides with widespread 3G deployment.",
    lindgrenNote:
      "Bee navigation is a biological χ(Ā) implementation: magnetite crystals measure the geomagnetic background Ā and CRY produces a chemical signal guiding flight direction. RF field disrupts both: magnetite measurement becomes noisy and CRY radical pair spin dynamics are disturbed. The bee is 'blinder' to the geomagnetic field → can't find home.",
    references: [
      "Favre 2011. Apidologie. Mobile signal triggered piping.",
      "Sharma & Kumar 2010. Current Sci. RF reduced return rate by 50%.",
      "Shepherd et al. 2018. PLOS ONE. CCD and environmental factors.",
      "Vanbergen & Insect Pollinators Initiative 2013. Ecol. Lett.",
    ],
  },
  {
    id: "birds",
    title: "Birds: The Magnetic Compass Disrupted",
    biology:
      "Bird magnetic compass relies on the cryptochrome (CRY) radical pair mechanism (RPM) in the retina. This is the best-documented biological magnetoreceptor. Bird populations have declined 29% in North America since 1970 (Rosenberg et al. 2019: 3 billion fewer birds).",
    emfSensitivity:
      "Ritz et al. 2004 (Nature): RF field at the Larmor frequency disrupts the European robin's magnetic compass. This is direct experimental confirmation of the RPM mechanism. Engels et al. 2014: urban electromagnetic noise disrupts robin orientation. The effect disappears when EMF is filtered from the 0.1–10 MHz range.",
    documentedDecline:
      "Rosenberg et al. 2019 (Science): 2.9 billion fewer birds in North America 1970–2018 (−29%). The decline affects common species, not just threatened ones. Largest decline in passerines (−53%) which are small and thus more sensitive to EMF.",
    bermPrediction:
      "BERM predicts birds are especially sensitive via the RPM/CRY channel: navigation is disrupted → migration routes fail → mortality increases. Reproductive effects: CRY regulates circadian rhythm → egg-laying behavior is disrupted. Delgado's chicken embryo experiment (0.001 gauss, 100 Hz): severe central nervous system defects → embryonic stage especially sensitive.",
    lindgrenNote:
      "CRY's RPM mechanism is a quantum mechanical process where spin pair singlet/triplet fractions depend on the external magnetic field. In Lindgren's framework this is spin susceptibility χ_B = ∂Φ_S/∂B which is a different function from geometric χ(Ā). χ_B is non-monotonic: sensitivity is greatest at the geomagnetic level and decreases in stronger fields. RF field at Larmor frequency 'scrambles' spin states → χ_B → 0 → magnetic compass loses directional information.",
    references: [
      "Ritz et al. 2004. Nature. RF disrupts magnetic compass at Larmor frequency.",
      "Engels et al. 2014. Nature. Urban EM noise disrupts navigation.",
      "Rosenberg et al. 2019. Science. −29% bird population 1970–2018.",
      "Delgado (Becker). 0.001 gauss pulse field → embryonic defects.",
    ],
  },
  {
    id: "bats",
    title: "Bats: Echolocation Meets EMF",
    biology:
      "Bats use echolocation (ultrasound sonar, 20–200 kHz) and magnetic compass for navigation. VGCC conservation 90%. White-nose syndrome has devastated populations in North America since 2006+.",
    emfSensitivity:
      "Bat echolocation relies on sensitive auditory receptors that are VGCC-dependent. EMF disruption of high-frequency hearing would impair hunting efficiency. Magnetoreception in bats has been experimentally confirmed (Wang et al. 2007).",
    documentedDecline:
      "North America: white-nose syndrome + population decline since 2006+. Europe: several species declining. Bat immunosuppression (root cause of WNS) is compatible with EMF-mediated HPA activation.",
    bermPrediction:
      "BERM predicts bats are sensitive through three pathways: VGCC (echolocation regulation), RPM/CRY (navigation), and HPA (immunosuppression predisposing to WNS). WNS timing (2006) is the same as CCD — both coincide with widespread 3G deployment.",
    lindgrenNote:
      "Bat echolocation is a high-frequency VGCC-dependent process. The cochlear hair cells rely on CaV1.3 channels for mechanoelectrical transduction. EMF-induced VGCC perturbation at the cochlear level would degrade the signal-to-noise ratio of echolocation — reducing effective hunting range before any overt hearing loss is detectable.",
    references: [
      "Wang et al. 2007. J. Exp. Biol. Bat magnetoreception.",
      "Frick et al. 2010. Science. WNS and population decline.",
    ],
  },
  {
    id: "lab-mammals",
    title: "Laboratory Mammals: Controlled Evidence",
    biology:
      "Laboratory rats and mice are the primary species for controlled EMF research. Thousands of studies: sperm quality, fertility, offspring anomalies, hormone levels.",
    emfSensitivity:
      "VGCC conservation 94% (nearly identical to humans). Laboratory rat spermatogenesis cycle is 52 days (human 74 days) → effects appear faster.",
    documentedDecline:
      "Guy's experiment (Cross Currents): 25 months, 2.45 GHz, 0.5 mW/cm² (20× below safety limit) → 3.6× cancer risk in stress response organs. Czerski 1979: sperm chromosomal damage across the entire safety limit range. Soviet studies 1976: 50–500 μW → birth problems, stillbirths from 1.1% to 7%. Panagopoulos (Drosophila): RF reduced fertility dose-dependently.",
    bermPrediction:
      "Laboratory data confirms each BERM pathway in animals: VGCC→ROS→SDF (pathway A), HPA→cortisol (pathway D, Guy), BBB permeability (pathway E, Salford). Laboratory data limitation: the lab's own EMF background (BERM's laboratory baseline shift) may underestimate the effect because the control group is also exposed.",
    lindgrenNote:
      "Laboratory EMF background (~10 V/m) produces χ(Ā_lab) ≈ 1.0 (saturated). This means ALL laboratory cells are maximally sensitive. 'Historical baseline shift' — the rise in spontaneous cancer, infertility, and metabolic syndrome in laboratory rodents from 1940–2024 — correlates with laboratory electrification levels. The control group IS NOT a healthy baseline but is chronically EMF-exposed.",
    references: [
      "Guy 1984 / Becker Cross Currents. 2.45 GHz, 25 mo, 3.6× cancer.",
      "Czerski 1979. Sperm chromosomal damage across safety limit range.",
      "Salford et al. 2003. BBB permeability at SAR 0.012 W/kg.",
      "Panagopoulos et al. 2004. Drosophila fertility.",
    ],
  },
];

function LindgrenBox({ text }: { text: string }) {
  return (
    <div className="border border-accent/30 bg-accent/5 rounded-lg p-4 mt-4">
      <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
        Lindgren interpretation
      </p>
      <p className="text-sm text-foreground-muted leading-relaxed">{text}</p>
    </div>
  );
}

export default function SentinelPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Sentinel Species: The Evidence That Can&apos;t Be Socialized Away
        </h1>
        <div className="max-w-3xl space-y-4 text-foreground-muted leading-relaxed">
          <p>
            Every conventional explanation for fertility decline — education,
            urbanization, contraception, economic pressure, social media —
            applies only to humans. If the same reproductive decline appears in
            insects, amphibians, birds, and mammals that share none of these
            social factors, the cause must be biological. The only environmental
            change that affects all species simultaneously, across all
            continents, at the same timescale as the observed declines, is the
            electromagnetic field environment.
          </p>
          <p>
            BERM predicts that any species with voltage-gated calcium channels
            (VGCC) is susceptible to EMF-mediated reproductive effects. VGCCs
            are evolutionarily conserved across all eukaryotes — the L-type VGCC
            protein sequence is &gt;70% identical across phyla (mammal 94%, bird
            87%, amphibian 82%, insect 73%). This conservation is not
            coincidental: in{" "}
            <Link
              href="/mathematics#lindgren"
              className="text-accent hover:underline"
            >
              Lindgren&apos;s framework
            </Link>
            , VGCC sensitivity to electromagnetic fields is a geometric property
            of the{" "}
            <Link
              href="/mathematics#chi"
              className="text-accent hover:underline"
            >
              membrane potential
            </Link>
            , not a species-specific adaptation. All cells with V
            <sub>mem</sub> ≈ −70 mV are maximally sensitive.
          </p>
        </div>
      </header>

      {/* Convergence table */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">Convergence Table</h2>
        <div className="overflow-x-auto">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className="text-left py-2 pr-4">Species</th>
                <th className="text-left py-2 pr-4">VGCC Conservation</th>
                <th className="text-left py-2 pr-4">Absorption Sensitivity</th>
                <th className="text-left py-2 pr-4">Documented Decline</th>
                <th className="text-left py-2 pr-4">BERM Prediction</th>
                <th className="text-center py-2">Match</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {CONVERGENCE_TABLE.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="py-2 pr-4 font-medium text-foreground">
                    {row.species}
                  </td>
                  <td className="py-2 pr-4 font-mono-num">
                    {row.vgccConservation}
                  </td>
                  <td className="py-2 pr-4">{row.absorptionSensitivity}</td>
                  <td className="py-2 pr-4">{row.documentedDecline}</td>
                  <td className="py-2 pr-4">{row.bermPrediction}</td>
                  <td className="py-2 text-center text-status-confirmed">✓</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Temporal correlation */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">
          Temporal Correlations
        </h2>
        <p className="text-foreground-muted text-sm leading-relaxed mb-4">
          These are correlations, not proof of causation. But the temporal
          coincidence across independent species strengthens the case for a
          shared environmental driver.
        </p>
        <div className="overflow-x-auto">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className="text-left py-2 pr-4">Event</th>
                <th className="text-left py-2 pr-4">Onset</th>
                <th className="text-left py-2 pr-4">EMF milestone</th>
                <th className="text-left py-2">Lag</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">Krefeld insect decline acceleration</td>
                <td className="py-2 pr-4 font-mono-num">~1995</td>
                <td className="py-2 pr-4">GSM rollout Germany (1992)</td>
                <td className="py-2 font-mono-num">~3 yr</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">Colony Collapse Disorder</td>
                <td className="py-2 pr-4 font-mono-num">2006</td>
                <td className="py-2 pr-4">3G widespread deployment (2004–06)</td>
                <td className="py-2 font-mono-num">0–2 yr</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">White-nose syndrome (bats)</td>
                <td className="py-2 pr-4 font-mono-num">2006</td>
                <td className="py-2 pr-4">3G widespread deployment (2004–06)</td>
                <td className="py-2 font-mono-num">0–2 yr</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">Amphibian &quot;enigmatic decline&quot; acceleration</td>
                <td className="py-2 pr-4 font-mono-num">~1998</td>
                <td className="py-2 pr-4">GSM global expansion (1995–2000)</td>
                <td className="py-2 font-mono-num">~3 yr</td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-2 pr-4">Human sperm decline acceleration</td>
                <td className="py-2 pr-4 font-mono-num">~2000</td>
                <td className="py-2 pr-4">Pocket phone era (2000+)</td>
                <td className="py-2 font-mono-num">0 yr</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Passerine bird decline (−53%)</td>
                <td className="py-2 pr-4 font-mono-num">1970–2018</td>
                <td className="py-2 pr-4">Progressive RF densification</td>
                <td className="py-2 font-mono-num">cumulative</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted mt-3">
          Note: temporal correlation does not establish causation. These
          coincidences are presented as hypothesis-consistent observations, not
          as evidence in themselves. The mechanistic pathway (VGCC/Ca²⁺) provides
          the causal link; timing provides plausibility.
        </p>
      </section>

      {/* Species sections */}
      <div className="space-y-14">
        {SPECIES.map((sp) => (
          <section key={sp.id} id={sp.id}>
            <h2 className="text-xl font-semibold mb-4">{sp.title}</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">
                  Biology
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {sp.biology}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">
                  EMF Sensitivity
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {sp.emfSensitivity}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">
                  Documented Decline
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {sp.documentedDecline}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">
                  BERM Prediction
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {sp.bermPrediction}
                </p>
              </div>

              <LindgrenBox text={sp.lindgrenNote} />

              <div className="mt-3">
                <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">
                  Key References
                </h3>
                <ul className="space-y-0.5">
                  {sp.references.map((ref, i) => (
                    <li
                      key={i}
                      className="text-xs text-foreground-muted leading-relaxed"
                    >
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Laboratory Baseline Bias */}
      <section className="mt-14 border border-status-partial/30 bg-status-partial/5 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-3">
          Laboratory Baseline Bias: Why All Controlled Studies Underestimate
          the Effect
        </h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3">
          Every laboratory EMF study compares an &quot;exposed&quot; group to a
          &quot;control&quot; group. But the control group is not unexposed — it
          lives in a laboratory with background EMF of approximately 10 V/m
          from lighting, equipment, and building wiring. In{" "}
          <Link
            href="/mathematics#chi"
            className="text-accent hover:underline"
          >
            Lindgren&apos;s selection rule
          </Link>
          , χ(Ā_lab) ≈ 1.0 (saturated). Both groups are at maximal VGCC
          sensitivity.
        </p>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3">
          This means the measured effect size (exposed minus control) captures
          only the <em>additional</em> EMF disruption, not the total. The true
          effect is the difference between the exposed group and a genuinely
          unexposed biological baseline — which no modern laboratory provides.
        </p>
        <div className="overflow-x-auto mt-4">
          <table className="text-xs border-collapse w-full">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className="text-left py-1.5 pr-4">Observation</th>
                <th className="text-left py-1.5 pr-4">Period</th>
                <th className="text-left py-1.5">Implication</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/50">
                <td className="py-1.5 pr-4">
                  Spontaneous tumor rate in lab rats: 2% → 30%
                </td>
                <td className="py-1.5 pr-4">1940–2024</td>
                <td className="py-1.5">
                  Correlates with lab electrification
                </td>
              </tr>
              <tr className="border-b border-card-border/50">
                <td className="py-1.5 pr-4">
                  Lab rodent metabolic syndrome incidence rising
                </td>
                <td className="py-1.5 pr-4">1980–2024</td>
                <td className="py-1.5">
                  &quot;Control&quot; animals are not healthy baselines
                </td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4">
                  Lab rodent fertility declining over decades
                </td>
                <td className="py-1.5 pr-4">1970–2024</td>
                <td className="py-1.5">
                  Parallels human sperm decline trajectory
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted mt-3">
          This is not a critique of laboratory methodology — it is a structural
          limitation. All published EMF effect sizes should be interpreted as
          lower bounds. See{" "}
          <Link
            href="/mathematics#pharmacological"
            className="text-accent hover:underline"
          >
            §10: Pharmacological Validation
          </Link>{" "}
          for how drug calibration partially corrects this bias.
        </p>
      </section>

      {/* Convergence conclusion */}
      <section className="mt-14 border-t border-card-border pt-10">
        <h2 className="text-xl font-semibold mb-4">
          Convergence: Seven Phyla, One Mechanism
        </h2>
        <p className="text-foreground-muted leading-relaxed max-w-3xl mb-4">
          Seven independent lines of evidence — insects, amphibians, bees,
          birds, bats, laboratory mammals, and humans — all show the same
          pattern: reproductive decline that correlates with electromagnetic
          field exposure and operates through the same conserved molecular
          mechanism (VGCC/Ca²⁺). No social explanation — education, economics,
          contraception, cultural change — applies to any non-human species. The
          only environmental change that is simultaneously global, recent
          (post-1990), and biologically active at observed exposure levels is the
          anthropogenic electromagnetic field.
        </p>
        <p className="text-xs text-foreground-muted">
          For the complete mathematical derivation of the VGCC mechanism and
          how it produces quantitative TFR predictions, see the{" "}
          <Link
            href="/mathematics"
            className="text-accent hover:underline"
          >
            Mathematical Foundation
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
