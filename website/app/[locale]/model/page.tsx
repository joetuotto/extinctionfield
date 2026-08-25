import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import BermCausalDiagram from "@/components/BermCausalDiagram";
import { ModelTableOfContents } from "@/components/ModelTableOfContents";
import { MathematicsSections } from "@/app/[locale]/mathematics/page";
import { ModulomeLayers } from "@/components/ModulomeLayers";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { CHI_SCALES } from "@/lib/evolutionData";
import { CHAIN_EPISTEMIC_COLORS } from "@/lib/epistemicConstants";
import type { EpistemicLevel } from "@/lib/types";
import { VGCCGeneFamilyDiagram } from "@/components/VGCCGeneFamilyDiagram";
import { ThresholdChart } from "@/components/ThresholdChart";
import { SixFactorSummary } from "@/components/SixFactorSummary";

const t = {
  en: {
    title: "Model Documentation",
    subtitle:
      "Full documentation of the Bio-Electromagnetic Reproductive Model (BERM), including the three-level architecture, causal pathways, coupling equations, and recovery dynamics.",
    metaTitle: "Model Documentation - Extinction Field",
    metaDesc:
      "BERM model documentation: three-level architecture, causal pathways, equations, and recovery dynamics.",

    archTitle: "Three-level architecture",
    archDesc:
      "BERM separates fertility decline into three distinct causal layers. Each level has its own dynamics, timescale, and evidence basis. The total fertility rate (TFR) for a country is the product of all three levels, not the sum -- each acts as a multiplier on the others.",
    level1Label: "Level 1",
    level1Title: "Biological capacity",
    level1Desc:
      "The physiological maximum fertility given current environmental exposures. Includes sperm quality (concentration, motility, DNA fragmentation), oocyte quality, hormonal milieu, and BBB integrity. This is the level most directly affected by EMF exposure.",
    level2Label: "Level 2",
    level2Title: "EMF-behavioral coupling",
    level2Desc:
      "How personal device use interacts with ambient EMF exposure. A person in a high-ambient environment who also carries a phone experiences a non-linear coupling effect. This level captures the interaction between infrastructure-level and personal-level exposure.",
    level3Label: "Level 3",
    level3Title: "True culture",
    level3Desc:
      "Voluntary fertility choices independent of biological capacity. Education, urbanization, contraceptive access, economic opportunity, and cultural norms. This component exists in all demographic models; BERM adds the biological and EMF layers underneath it.",

    causalTitle: "Causal pathway diagram",
    causalDesc:
      "The diagram below shows the complete mechanistic chain from Lindgren geometry to TFR decline. Eight levels, 63 nodes, 107 edges. Two co-primary pathways operate in parallel: Pathway A (VGCC → Ca²⁺ → ROS) has the strongest experimental support (23–28 blocker studies), while Pathway B (RPM → CRY → circadian disruption) is the most complete theoretical bridge from Lindgren geometry to biology (87.5% of the RPM Hamiltonian is derivable from the metric ansatz). The CRY/RPM pathway has supporting evidence across species: disruption of magnetic compass in birds (Ritz 2004, Engels 2014), CRY-dependent magnetoreception in Drosophila (Yoshii 2009), CRY-dependent ROS modulation in human cells (Sherrard 2018), and — critically — functional blue-light-dependent magnetoreception in humans (Chae et al. 2019, PLOS ONE), indicating that the biological substrate is present in the species BERM models. Both pathways are independently supported at E-level evidence. Click any node to see its mechanism, Lindgren interpretation, quantitative formulation, recovery parameters, and key references. Node borders are colored by epistemic level.",
    pathwayHierarchyNote:
      "Pathway weights reflect empirical calibration to community data (Amish–Korea gradient). They do not reflect theoretical hierarchy: Pathway B (CRY/RPM) is the PRIMARY pathway because 87.5% of the RPM Hamiltonian is derivable from Lindgren geometry, establishing the mechanism’s EXISTENCE as a geometric consequence. Pathway A has stronger experimental support (23–28 blocker studies). The former δVm objection (δV_m ≈ 10⁻²¹ V from geometry alone) is now resolved by the T-type calcium channel bifurcation mechanism: the Schwan equation amplifies external fields to 7.5–15 μV at the membrane (37% of thermal noise at 1 V/m ambient; 184% at 5 V/m personal), and T-type (Cav3) channels operate at a bifurcation point where ~10% are open at rest (window current), making them responsive to these perturbations. Pathway D (HPA → testosterone) is now also derived via the same T-type mechanism: Schwan δVm → Cav3 → Ca²⁺ → StAR → testosterone (Xiang 2025).",
    rpmFrequencyNote:
      "CRY/RPM does not respond to the RF carrier frequency (900 MHz – 3.5 GHz). Its resonance ceiling is ~22.5 MHz (Talbi, Zadeh-Haghighi & Simon 2025, Front. Quantum Sci. Technol. 4:1544473). The biologically active components for Pathway B are the geomagnetic background (B_DC) and ELF modulation envelopes of telecom signals (GSM 217 Hz, WiFi 10 Hz beacon). Effects of the RF carrier itself are mediated by Pathway A through the electric field component. The two pathways have complementary frequency domains.",
    vgccHierarchyTitle: "VGCC sensitivity hierarchy at resting potential",
    vgccHierarchyNote:
      "Not all voltage-gated calcium channels are equally EMF-sensitive. At resting membrane potential (~−70 mV), EMF sensitivity follows the hierarchy: Cav3 (T-type) >> Cav1.3 >> Cav1.2. T-type channels (Cav3.1, Cav3.2, Cav3.3) operate at a bifurcation point where ~10% are open at rest (window current), making them continuously sensitive to small voltage perturbations. Cav1.3 is a 'low-threshold L-type' that activates at ~−50 mV — 25 mV more negative than Cav1.2 (J Neurosci 2001). This makes Cav1.3 the primary channel in tissues requiring sustained low-voltage calcium entry: SA node pacemaking and inner hair cell synaptic transmission. Cav1.2, the canonical L-type, activates at ~−30 mV and is significant ONLY during action potentials — at rest it contributes negligibly. This hierarchy explains tissue-specific EMF vulnerability: organs dominated by Cav3 (testes, pituitary, adrenal, hippocampus) are most affected; Cav1.3-dependent tissues (inner ear, SA node) are intermediate; Cav1.2-dominated tissues (skeletal muscle, cardiac ventricle) are affected only during electrical activity.",
    camkiiTitle: "CaMKII positive feedback: cumulative sensitization",
    camkiiNote:
      "A critical finding for BERM's cumulative exposure model: CaMKII (calcium/calmodulin-dependent protein kinase II) phosphorylation shifts the Cav3.2 activation threshold to MORE NEGATIVE potentials (PMC9913649). This creates a positive feedback loop: EMF → Cav3.2 Ca²⁺ influx → CaMKII activation → Cav3.2 threshold shifts left → channel becomes MORE sensitive to EMF → more Ca²⁺ influx. This molecular mechanism explains why EMF effects are cumulative over time: each exposure episode makes the system more sensitive to subsequent exposures. The CaMKII feedback also explains why short-term studies may underestimate long-term effects — the sensitization develops over weeks to months of chronic exposure. Pharmacological prediction: CaMKII inhibitors (KN-93) should block the progressive sensitization without affecting acute EMF responses.",

    chiSub: "Saturation curve for ambient × personal exposure interaction",
    chiTitle: "Lindgren chi coupling equation",
    chiDesc:
      "The coupling between ambient EMF infrastructure and personal device exposure is not linear. The chi function describes a saturation curve: at low ambient levels, personal exposure adds little on top; at high ambient levels, personal exposure is already dominated by the environmental field.",
    chiExplain:
      "is the normalized ambient exposure (0 = no infrastructure, 1 = saturation). The function approaches 1 asymptotically, meaning the marginal effect of personal devices diminishes as ambient exposure grows.",
    chiWherePrefix: "Where",

    chiFiveTitle: "χ at five scales",
    chiFiveSub: "The selection rule operating from molecule to population",
    chiFiveDesc: "The χ function is not limited to ambient-personal coupling. It appears at every biological scale where a background variable must be present for a perturbation to have effect. The table below shows five instantiations of the same mathematical principle.",
    chiFiveColScale: "Scale",
    chiFiveColBg: "Background (B)",
    chiFiveColPerturb: "Perturbation",
    chiFiveColExpr: "χ expression",
    chiFiveColVerify: "Verification",
    chiFiveColLevel: "Level",
    chiFiveLink: "See full analysis →",

    chiEvidenceTitle: "χ across evidence families",
    chiEvidenceSub: "How the selection rule manifests in six independent biological domains",
    chiEvidenceDesc: "The χ function is not an abstract construct — it predicts specific, testable modulations in six evidence families. Each family has its own χ modulator that determines when and how strongly EMF affects that system.",
    chiEvidenceFamilies: [
      { family: "Diabetes (β-cells)", chi: "χ(glucose): K_ATP → V_mem → VGCC priming", mechanism: "High glucose closes K_ATP channels → membrane depolarizes → VGCCs primed → χ HIGH. Low glucose → K_ATP open → χ LOW.", prediction: "EMF × high-GI diet produces synergistic diabetes risk. Fasting protects β-cells.", verification: "Sakurai 2008: ELF reduced insulin secretion 30%", level: "M|C" },
      { family: "Sperm quality (BTB)", chi: "χ(BTB integrity): barrier attenuates effective field", mechanism: "Intact BTB shields spermatogenic cells → low χ. EMF opens BTB → shielding lost → χ rises → positive feedback.", prediction: "Sperm quality decline accelerates over time (super-linear).", verification: "Yu 2019: 4G RF directly disrupts BTB, time-dependent", level: "E" },
      { family: "Barriers (BBB + BTB)", chi: "χ(barrier permeability): continuous modulator", mechanism: "Barriers are continuous χ modulators. Partially damaged barrier = partial χ increase. Produces multiplicative amplification.", prediction: "Super-linear dose-response with cumulative exposure.", verification: "Ulusoy 2025: progressive BBB degradation 30–360 min", level: "E" },
      { family: "Sentinel species", chi: "χ(metabolic rate): M^(−0.25) scaling", mechanism: "Small animals: higher mass-specific metabolic rate → higher baseline ROS → higher χ → larger EMF response.", prediction: "Insects and small birds affected first; larger mammals later.", verification: "Temporal order matches body mass scaling", level: "M|C" },
      { family: "Cardiac (CRY2-TRPC1)", chi: "χ(CRY2 state): light- and FAD-dependent", mechanism: "If CRY2-TRPC1 operates in cardiomyocytes (as in myoblasts, Yap 2025), cardiac calcium entry is light/FAD-dependent.", prediction: "Nighttime phone use → higher arrhythmia risk than daytime.", verification: "Not yet tested. TRPC channels confirmed in myocytes.", level: "L*" },
      { family: "Adey-Blackman window", chi: "χ(photocycle) × χ(temperature) × χ(DC orientation)", mechanism: "The 'biological window' emerges from three superimposed χ windows. Labs controlling all three find consistent results.", prediction: "Five-parameter standard resolves 50-year replication debate.", verification: "Blackman 1985–1991: demonstrated each window independently", level: "M" },
    ],

    twoChSub: "ELF + IF + RF decomposition with 12 technology layers and TCBM",
    twoChTitle: "Three-channel exposure model",
    twoChDesc:
      "Total effective EMF exposure decomposes into three frequency channels — ELF (f < 1 kHz, membrane modulation), IF (1 kHz – 1 MHz, intracellular/mitotic), and RF (> 1 MHz, spin chemistry) — each weighted by its biological mechanism and modulated by the chi coupling.",
    twoChExplain:
      "cumEMF = w_ELF · cumELF + w_IF · cumIF + w_RF · cumRF, where the current diagnostic weights are w_ELF = 0.05, w_IF = 0.60, w_RF = 0.35. These are DIAGNOSTIC weights requiring empirical calibration, not fitted parameters -- the three-channel decomposition is structurally derived from membrane biophysics, but the relative weights are uncertain. In a country with near-zero cellular infrastructure, even heavy personal phone use contributes little total exposure (chi is near zero). Conversely, in a fully saturated environment, the personal component is added almost linearly across all three channels.",
    twoChLayersTitle: "12 technology layers composing the ambient field",
    twoChLayersDesc:
      "The ambient term is not monolithic. It decomposes into 12 independent technology layers, each with its own driver, deployment timeline, and frequency profile. This decomposition improves the model's discriminative power because each layer acts as an orthogonal instrument.",
    ifoVgicNote: "The IFO-VGIC mechanism is supported by a comprehensive review of 131 studies (Panagopoulos et al. 2025, Bioelectromagnetics): 95% report oxidative effects from RF/Wi-Fi exposure. This consensus, consistent with Yakymenko et al. 2016 (93/100), establishes the Ca²⁺ influx → ROS pathway as the most robustly documented non-thermal mechanism.",
    multiPathwayCa2Note: "The Ca²⁺ disruption at Level 4 operates through multiple independent pathways: (1) direct S4 voltage sensor forced oscillation (Panagopoulos et al. 2025, IFO-VGIC); (2) intracellular calcium store dysregulation via ryanodine receptors (RyR) and SERCA pumps (Bertagna et al. 2025, Ann NY Acad Sci). Both pharmacological blockade experiments (VGCC blockers for pathway 1; dantrolene for RyR, CPA for SERCA in pathway 2) abrogate EMF effects, confirming mechanism. The multi-pathway nature explains tissue-specific sensitivity: cells with high VGIC density AND large intracellular Ca²⁺ stores (neurons, gonadal cells) are more sensitive than cells with low stores (keratinocytes — cf. Meyer 2026, Haidar 2025: null results in skin cells). Note: Bertagna 2025 is ELF (50 Hz), not RF — translation to RF is not direct, but the Ca²⁺ pathway is shared.",
    fiveGReproNote: "The first 5G-frequency-specific testicular data (Bektas et al. 2026, Bioelectromagnetics): 3.5 GHz RF induced testicular and oxidative damage in rats. CoQ10 supplementation ameliorated the damage, demonstrating mechanism reversibility — consistent with BERM's recovery window model where antioxidant capacity determines net daily damage. This extends the oxidative stress evidence base (Yakymenko 2016: 93/100; Panagopoulos 2025: 95%) to the 5G frequency range.",
    pathwayCQuantNote: "The melatonin suppression pathway is quantitatively supported by a PRISMA systematic review of 55 studies (Tbahriti et al. 2026, Sleep Biol Rhythms): 88% of high-quality animal studies report EMF-induced melatonin suppression of 20-50% from baseline. This suppression is biologically significant for GnRH pulsatility but smaller than light-induced suppression (>90%), consistent with BERM's v17_night_fraction() modeling EMF as one component of the nocturnal triple hit (melanopsin + CRY + melatonin), not the sole driver. Methodological note: only 27% of reviewed studies met high standards.",
    pathwayCWeightNote: "Note on pathway C weight: Pathway C's 25% reflects both its circadian function (CRY2 → clock gene transcription → melatonin → HPG) and its recently discovered calcium signaling function (CRY2 → TRPC1 modulation → Ca²⁺ entry; Yap et al. 2025, Cells). TRPC1 is a TRP channel, not a voltage-gated calcium channel (VGCC). Pathways A and C are therefore pharmacologically separable: L-type VGCC blockers (nifedipine) block pathway A effects but not CRY2-TRPC1 effects.",
    cryIndividualVariationNote: "Individual variation: CRY sensitivity is modulated by iris pigmentation (blue > green > brown; Higuchi 2007), nutritional FAD status (Hirano 2017), and sex (males > females in acute magnetoreception; Chae 2019). These modulators may explain part of the inter-individual and inter-population variance in pathway C effectiveness. The CRY2-TRPC1 physical complex (Yap/Sherrard 2025) further reveals that pathway C has a second downstream branch: CRY2 modulates TRPC1 (a TRP channel, NOT a VGCC), enabling calcium signaling independently of pathway A. Pathways A and C remain pharmacologically separable — L-type VGCC blockers inhibit A but not CRY2-TRPC1. See the detailed analysis at /evidence/eyes.",
    cryDualSystemNote: "Dual CRY system: Pathway C operates through two distinct cryptochrome systems in the retina. C1 (sensory): Full-length CRY1 protein was found exclusively in the outer segments of short-wavelength-sensitive 'blue' cone photoreceptors in human, bonobo, and gorilla retinas (Bartölke et al. 2025, FASEB J). This location far from nuclei — in the phototransduction machinery — suggests a sensory function beyond circadian clock regulation. The stacked membrane lamellae of cone outer segments provide the orientational order required for directional magnetoreception (cf. Majewska et al. 2025, ACS Chem Biol: CRY associates with lipid bilayers in ordered manner). This is the system most directly affected by iris pigmentation: blue eyes transmit ~100× more light to blue cones, increasing CRY1 activation. C2 (circadian): CRY2 is expressed in retinal ganglion cells, particularly ipRGCs that project to the SCN. CRY2 forms a physical complex with TRPC1 (Yap et al. 2025), linking the circadian pathway to ion channel signaling. Both systems require FAD as their chromophore and are therefore both dependent on riboflavin (B2) status.",
    recoveryWindowNote: "The distinction between acute and chronic exposure is empirically supported: Koivisto et al. (2000) observed cognitive facilitation after 30–60 min exposure (compatible with acute Ca²⁺-mediated synaptic enhancement), while Panagopoulos et al. (2025) report 95% oxidative stress in studies with chronic or repeated exposure. The recovery window model resolves this apparent contradiction: 30 min + 23.5h recovery → 97% repair (no net damage); 22h exposure + 2h recovery → 21% repair (cumulative damage).",
    lateralizationNote: "The two-channel model's spatial structure is empirically supported by lateralization studies: Eliyahu et al. (2006) and Luria et al. (2009) demonstrated that 890 MHz exposure affects specifically the hemisphere nearest the phone. This confirms that personal-EMF effects are local, not systemic — EMF attenuates with the square of distance — supporting BERM's premise that phone-in-pocket targets testes, phone-at-ear targets hypothalamus.",
    ifChannelTitle: "IF channel: LED lighting as primary source",
    ifChannelDesc:
      "The IF channel (1 kHz – 1 MHz) targets dividing cells through the same frequency–cell size relationship as FDA-approved TTFields cancer therapy. The primary environmental source of IF fields is LED lighting: every LED bulb contains a switch-mode power supply operating at 20–200 kHz with harmonics extending to megahertz. A typical home contains 15–30 such sources; a typical office contains 200–500. Additional IF sources include HVAC variable frequency drives (5–50 kHz), induction cooktops (20–75 kHz), and all switch-mode power supplies (laptop chargers, phone chargers). The mechanism operates via Ion Forced Oscillation (IFO-VGIC), with a biological threshold of 10⁻⁵ V/m (Panagopoulos 2025) — orders of magnitude below measured LED driver emissions.",
    tcbmTitle: "Three-Channel Biological Model (TCBM)",
    tcbmIntro:
      "BERM v19.1 identifies three independent electromagnetic channels, each with distinct frequency ranges, exposure sources, biological mechanisms, and temporal histories:",
    tcbmElfTitle: "Channel 1: ELF (0–300 Hz)",
    tcbmElfDesc:
      "Source: power grid, household wiring, appliances, transformers. Mechanism: IFO-VGIC forced ion oscillation (Panagopoulos 2025). History: present since electrification (1880s), stable since ~1970. Proxy: residential electricity consumption (kWh per capita). Always on, 24/7, entire home.",
    tcbmIfTitle: "Channel 2: IF (300 Hz – 10 MHz)",
    tcbmIfDesc:
      "Source: LED drivers (20–300 kHz), SMPS, VFDs, induction cooktops. Mechanism: Cyb5b → Ca²⁺ oscillations (Kim 2026 Cell), IFO at higher frequencies. History: near-zero before 2009, exponential growth 2009–2019 (EU LED transition). Proxy: LED market share × residential electricity. Pulsed, high dV/dt, regulatory gap (IJRB 2022).",
    tcbmRfTitle: "Channel 3: RF (100 kHz – 300 GHz)",
    tcbmRfDesc:
      "Source: mobile phones, Wi-Fi, Bluetooth, base stations, IoT. Mechanism: RPM/CRY spin chemistry (Ritz 2004), thermal deposition at high SAR. History: 2G (1991), 3G (2001), 4G (2009), 5G (2019), Wi-Fi (1999). Proxy: broadband subscriptions per 100, mobile subscriptions. Modulated (data encoding), personal + ambient.",
    tcbmIfMitotic:
      "The IF channel's biological mechanism differs from ELF and RF. While ELF primarily activates ion channels (IFO-VGCC) and RF primarily disrupts radical pair chemistry (RPM/CRY), IF acts through a THIRD pathway: disruption of polar macromolecular structures during cell division (mitotic spindle, tubulin dimers). TTFields research demonstrates that IF fields (100–500 kHz) exert directional forces on polar intracellular elements. This mechanism is frequency-dependent: cancer cells are most affected at 150–200 kHz, while normal cells at ~50 kHz (Nature 2020). LED driver emissions (20–100 kHz) span the normal-cell sensitivity range.",
    tcbmWeightNote:
      "Note on weights: The TCBM weights (w_ELF 0.05, w_IF 0.60, w_RF 0.35) are DIAGNOSTIC — theoretical estimates based on mechanism plausibility, not fitted to data. The cross-sectional weights below (ELF ~60%, RF ~40%) are EMPIRICAL — calibrated from 54-country regression. These are not contradictory: the cross-sectional regression cannot separate IF from ELF because LED penetration correlates with electrification, so ELF's empirical 60% likely contains a large hidden IF component. The T1 temporal test (LED-DID) is designed to resolve this.",
    tcbmCrossSectional:
      "In the cross-sectional formula (54 countries, LOOCV RMSE 0.522), residential electricity serves as primary proxy because it captures ELF (always present with electricity) and correlates with IF (LED penetration tracks electrification). Broadband captures RF. ELF carries ~60% of the cross-sectional signal, RF carries ~40%. IF cannot be separated from ELF in cross-sectional data because LED penetration correlates with electrification. The temporal test (T1: LED-DID) is needed to isolate IF's independent contribution.",
    tcbmWolframPlanned:
      "Planned: formal Wolfram Language verification of the three-channel coupling structure, including symbolic derivation of the IFO-VGIC threshold from first principles and numerical validation against the 54-country cross-sectional dataset.",

    recovSub: "Melatonin → cortisol → testosterone → sperm → fertility recovery cascade with timescales",
    recovTitle: "Five-layer recovery model",
    recovDesc:
      "If EMF exposure were reduced, different biological systems would recover at different rates. The α parameter for each layer represents the fraction of damage that is reversible (1.0 = fully reversible, 0.0 = permanent).",
    recovColLayer: "Layer",
    recovColAlpha: "α",
    recovColTimescale: "Recovery timescale",
    recovColNotes: "Notes",
    recovVgicLayer: "VGIC gating",
    recovVgicTime: "Hours",
    recovVgicNote:
      "Ion channel conformational changes reverse immediately upon cessation of field",
    recovRosLayer: "ROS clearance",
    recovRosTime: "Days to weeks",
    recovRosNote:
      "Antioxidant systems restore balance, but chronic oxidative stress may cause lasting mitochondrial damage",
    recovDnaLayer: "DNA repair (SDF)",
    recovDnaTime: "Months (spermatogenesis cycle)",
    recovDnaNote:
      "New sperm are generated every 74 days, but stem cell damage may persist across cycles",
    recovLeydigLayer: "Leydig cell function",
    recovLeydigTime: "Months to years",
    recovLeydigNote:
      "Testosterone-producing cells may partially recover, but chronic atrophy reduces regenerative capacity",
    recovBbbLayer: "Biological barriers (BBB + BTB)",
    recovBbbTime: "BBB: irreversible; BTB: partially reversible",
    recovBbbNote:
      "Neuronal damage from chronic BBB leakage is assumed permanent. BTB disruption (Yu et al. 2019: Spock3-MMP2 axis at 4G) compromises the spermatogenic microenvironment directly. Both barriers use the same tight junction proteins (occludin, ZO-1). Positive feedback: barrier damage → higher effective field → more damage.",

    compSub: "How TFR formula separates biological capacity from cultural demand",
    compTitle: "Compensation mechanism",
    compDesc:
      "Observed TFR is not simply the product of the three levels. Societies partially compensate for biological decline through assisted reproduction, behavioral changes, and policy interventions. The effective TFR includes a compensation exponent α = 0.43 that captures this partial offset.",
    compWhereLabel: "Where:",
    compBioCap: "biological capacity (Level 1), normalized 0-1",
    compBehav: "EMF-behavioral coupling factor (Level 2)",
    compAlpha:
      "compensation exponent, calibrated against 2000-2024 historical data",
    compRate2024: "the observed TFR in 2024 (calibration anchor)",
    compCultRatio:
      "ratio of projected cultural fertility preference to 2024 baseline",
    compBioBehav2024:
      "the biological-behavioral product at calibration time",
    compExplain:
      "When α = 0, there is no compensation and biological decline passes through directly to TFR. When α = 1, compensation is complete and biological decline has no effect on observed TFR. The calibrated value of 0.43 implies partial but incomplete compensation -- biological decline still manifests in TFR, but at roughly half the rate it would without societal adaptation.",

    mtorSub: "EMF, caloric restriction, and rapamycin converge on the same aging pathway",
    mtorTitle: "mTOR convergence hypothesis",
    mtorDesc1:
      "mTOR is the downstream integrator where EMF-induced Ca²⁺ influx converges with aging, fertility, and cancer pathways. The Sempou pathway: EMF → VGIC → Ca²⁺↑ → mTOR hyperactivation → autophagy↓, senescent cell accumulation, mitochondrial quality control↓, chronic inflammation↑.",
    mtorDesc2:
      "Metformin activates AMPK, which suppresses mTOR -- the exact opposite of the EMF-induced pathway. The hypothesis: metformin's longevity benefit is not anti-aging per se but anti-EMF-accelerated-aging. In a natural EMF environment (Amish), the benefit should be minimal.",
    mtorEqExplain:
      "Where EMF is normalized exposure (0 = no infrastructure, 1 = modern city), and reduction factors include metformin (0.30), rapamycin (0.85), caloric restriction (0.20), intermittent fasting (0.10).",
    mtorThreeTitle: "Three epidemics, one mechanism",
    mtorAging: "Aging",
    mtorAgingDesc:
      "mTOR↑ → autophagy↓, senescence↑, inflammation↑, mitochondria↓ → accelerated aging",
    mtorFertility: "Fertility",
    mtorFertilityDesc:
      "mTOR↑ → spermatogonial differentiation↓, follicular burnout↑, AMH↓ → TFR↓",
    mtorCancer: "Cancer",
    mtorCancerDesc:
      "mTOR↑ → proliferation↑, tumor growth↑, metastasis↑ → cancer risk↑",
    mtorPredTitle: "Testable predictions",
    mtorPredColId: "ID",
    mtorPredColPred: "Prediction",
    mtorPredColTest: "Test",
    mtorPreds: [
      {
        id: "E1",
        pred: "Metformin longevity benefit is larger in high-EMF environments",
        test: "UK CPRD stratified by urban/rural",
      },
      {
        id: "E2",
        pred: "Amish metformin users show smaller longevity bonus than general population",
        test: "Amish diabetic cohort comparison",
      },
      {
        id: "E3",
        pred: "Blue Zone longevity advantage disappears as 4G/5G arrives",
        test: "Okinawa, Sardinia, Ikaria cohort tracking",
      },
      {
        id: "E4",
        pred: "CR experiment effect sizes increase by decade (rising lab EMF)",
        test: "Meta-analysis: effect size vs publication year",
      },
      {
        id: "E5",
        pred: "TAME trial benefit stratifies by EMF exposure",
        test: "Urban vs rural subgroup analysis",
      },
      {
        id: "E6",
        pred: "Shabbat (25h/week EMF-free) acts as intermittent mTOR fasting, supporting Haredi TFR and longevity",
        test: "Haredi vs secular Israeli cohort",
      },
    ],

    fourRoutesTitle: "Five independent EMF -> TFR routes",
    fourRoutesSub: "Gonadal, circadian, pituitary, autonomic, and neurodevelopmental — each sufficient alone",
    fourRoutesDesc: "BERM identifies five independent biological routes through which EMF exposure can reduce fertility. Each route operates through a distinct mechanism and target tissue. Crucially, each route is independently sufficient to reduce TFR — they operate in parallel, not in series. This means that blocking one route (e.g., antioxidant supplementation for the gonadal route) does not eliminate the effect, because four other routes remain active.",
    fourRoutesGonadal: "Route 1: Gonadal (established)",
    fourRoutesGonadalDesc: "EMF -> VGCC/Cav3 -> Ca2+ -> ROS -> sperm DNA damage + Leydig cell StAR suppression -> testosterone decline + spermatogenesis disruption. Target tissue: testes. Evidence level: E (23-28 blocker studies). Primary channel: RF + ELF.",
    fourRoutesCircadian: "Route 2: Circadian (established)",
    fourRoutesCircadianDesc: "EMF -> CRY/RPM -> circadian clock disruption -> melatonin suppression -> HPG axis disruption + oxidative stress in follicular fluid. Target tissue: pineal gland, SCN. Evidence level: E. Primary channel: RF (magnetic component).",
    fourRoutesPituitary: "Route 3: Pituitary (new)",
    fourRoutesPituitaryDesc: "EMF -> Cav3 T-type channels in gonadotrophs -> FSH/LH secretion disruption -> downstream gonadal dysfunction. The pituitary sits outside the BBB and is directly exposed. All hormone cell types express Cav3. This route can reduce fertility independently of gonadal damage. Target tissue: pituitary gland. Evidence level: E. Primary channel: ELF + RF.",
    fourRoutesAutonomic: "Route 4: Autonomic (new)",
    fourRoutesAutonomicDesc: "EMF -> SA node Cav3.1 -> HRV reduction -> vagal tone decline -> HPA axis hyperactivation -> chronic cortisol -> HPG cross-inhibition. HRV is a sensitive early biomarker. Target tissue: SA node, vagus nerve. Evidence level: E. Primary channel: ELF (50 Hz).",
    fourRoutesNeurodevelopmental: "Route 5: Neurodevelopmental (derived)",
    fourRoutesNeurodevelopmentalDesc: "EMF → VGCC/Ca²⁺ during critical developmental windows → disrupted brain sexual differentiation, PFC maturation, identity formation. Same mechanism as chemical EDCs (BPA, phthalates). Additive with chemical EDC effects. Blocked by: prenatal EMF reduction, B2/glutathione support. Target tissue: fetal/infant brain. Evidence level: L* (derived prediction — awaiting DIFF-1 AGD test). Primary channel: RF + ELF.",
    cascadeNeurodevExt: "Extended analysis: CACNA1C as the shared genetic vulnerability across ASD, ADHD, bipolar, depression, and schizophrenia. Seven developmental channels link EMF to brain sexual differentiation through the same Ca²⁺ pathways. See Brain modulome for full analysis.",
    fourRoutesImplication: "Clinical implication: interventions targeting only one route (e.g., antioxidants for Route 1) will show partial but incomplete protection. Full protection requires either EMF reduction (addressing all routes simultaneously) or a multi-target intervention strategy.",

    modulationTitle: "Why Modulation Matters More Than SAR",
    modulationDesc: "A large study (Fertility and Sterility 2023) found mobile phone use associated with lower sperm concentration — but the association was STRONGER in 2005-2007 than in 2012-2018. BERM explains this via the Schwan equation: the biologically active component is not the RF carrier but its ELF MODULATION ENVELOPE. GSM (2G): hard TDMA pulse at 217 Hz, ~100% modulation depth → strong ELF component → large T-type bifurcation effect. LTE (4G): OFDM, ~30-50% modulation depth, lower transmit power → weaker ELF component → smaller effect. This predicts the time trend WITHOUT invoking 'less radiation is safer.' The AMOUNT of radiation may be similar, but the MODULATION STRUCTURE changed.",
    modulationWarning: "Note: This time trend is a CORRELATION. Other factors changed concurrently (phone position, usage patterns, other exposures). The Schwan explanation is parsimonious but not the only possibility.",

    modulomeSub: "Nine-layer synthesis from Becker to Cyb5b — unified susceptibility model",
    modulomeTitle: "EMF Modulome",
    modulomeDesc: "The nine-layer modulome synthesizes six independent research traditions — Becker's DC control system, Adee's electrome, Levin's bioelectric code, Lindgren's geometric framework, the chromophore generalization (CCO/CRY), and the Cyb5b EMF receptor (Kim 2026, Cell) — into a unified model of EMF biological susceptibility. Each layer is independently supported by regulatory-approved therapeutic devices that exploit the same mechanism.",

    btnEvidence: "Browse evidence",
    btnPredictions: "View predictions",
    mathSub: "Complete derivation from Lindgren geometry to TFR prediction",
    mathTitle: "Mathematical Foundation",
    mathSubtitle:
      'Complete derivation from Lindgren geometry to TFR prediction. Every equation is derivable from the previous one. Click "Full derivation" to see intermediate steps.',

    thresholdTitle: "Testosterone → TFR Threshold Model",
    thresholdSub: "Quantitative link from biological capacity decline to demographic collapse",
    thresholdLead: "The strongest predictive component of the BERM model. Testosterone decline (~1%/year, age-independent, documented across five countries) creates a three-phase trajectory: silent erosion → threshold crossing → biological limit. The model is calibrated against Finnish and Korean data and generates specific, testable country-level predictions.",
    thresholdPhase1Title: "Phase 1: Silent Erosion",
    thresholdPhase1Desc: "Testosterone declining but biologically sufficient. TFR stable or declining slowly from cultural factors. Biological capacity exceeds cultural demand.",
    thresholdPhase2Title: "Phase 2: Threshold Crossed",
    thresholdPhase2Desc: "Cumulative T loss exceeds ~40%. Rising male subfertility (T < 300 ng/dL). TFR accelerates downward as biological capacity becomes the binding constraint. Pronatalist programs begin failing.",
    thresholdPhase3Title: "Phase 3: Biological Limit",
    thresholdPhase3Desc: "TFR drops below 1.0. Biological incapacity dominates. Even motivated couples require assisted reproduction. IVF demand grows exponentially.",
    thresholdMathTitle: "Mathematical formulation",
    thresholdMathT: "T(t) = T₀ × (1 − r)^(t − t₀)",
    thresholdMathTFR: "TFR(t) = min( TFR_cultural(t), TFR_bio(t) )",
    thresholdMathExplain: "When TFR_bio < TFR_cultural, biological capacity is the binding constraint. The sigmoid transition at ~40% cumulative T loss produces the observed pattern: decades of stability followed by rapid collapse.",
    thresholdTableTitle: "Country parameters",
    thresholdTableCountry: "Country",
    thresholdTableRate: "r (%/yr)",
    thresholdTableSource: "Source",
    thresholdTableCumul: "Cumul. 2024",
    thresholdTableThreshold: "Threshold yr",
    thresholdTablePhase: "Phase",
    thresholdFinlandTitle: "Retrospective validation: Finland",
    thresholdFinlandText: "Finland is the model's Rosetta Stone. Perheentupa (2013) documents a 37% cohort-dependent T decline (n=3,271, 1972–2002). TFR remained stable at 1.63–1.87 for 40 years (1970–2010), then collapsed to 1.26 by 2024. The ~35-year delay from T decline onset to TFR collapse is consistent with cumulative biological erosion reaching the threshold. If the model had existed in 2005, it could have predicted Finland's collapse 10–15 years early.",
    thresholdProjectionsTitle: "Country TFR projections",
    thresholdProjections2030: "2030",
    thresholdProjections2035: "2035",
    thresholdChartTitle: "Interactive threshold model",
    thresholdCaveat: "T decline rates are age-independent secular trends from peer-reviewed longitudinal studies. Korean and Japanese rates are estimates. The 40% threshold is calibrated, not derived. Projections assume continuation of current rates.",

    whyPronatTitle: "Why $200 billion couldn't raise South Korea's fertility",
    whyPronatText: "BERM's three-level architecture separates fertility into biological capacity (Level 1), EMF-behavioral coupling (Level 2), and cultural choice (Level 3). Pronatalist policies — cash bonuses, parental leave, childcare subsidies — target Level 3 (motivation). But when Level 1 (biological capacity) becomes the binding constraint, no amount of Level 3 incentive can compensate. South Korea's cumulative testosterone loss exceeds 48%. A growing fraction of couples who want children cannot conceive naturally. The $200 billion addressed the wrong level of the model.",
    whyPronatPrediction: "T-TFR-4: Korea's TFR will not sustainably exceed 1.0 through 2035, regardless of policy spending.",
    whyPronatFalsification: "Falsification: Korea TFR above 1.0 sustained for 3+ years.",

    bioFloorTitle: "The biological floor",
    bioFloorText: "Spermatogenesis requires intratesticular testosterone 50–100× serum concentration. When serum testosterone drops below ~200 ng/dL, spermatogenesis is severely impaired. At current decline rates (1%/year from ~500 ng/dL baseline):",
    bioFloorTimeline: [
      { year: "2024", value: "~320 ng/dL", note: "population mean, young men" },
      { year: "2035", value: "~285 ng/dL", note: "" },
      { year: "2050", value: "~240 ng/dL", note: "" },
      { year: "2070", value: "~190 ng/dL", note: "below spermatogenic threshold" },
    ],
    bioFloorConsequence: "Below this floor, even IVF cannot use the man's own sperm. Donor sperm, testicular sperm extraction, or future technologies (in vitro spermatogenesis) become necessary. This is not speculation — it is arithmetic applied to measured decline rates.",

    sixFactorTitle: "Why testosterone is the integration variable",
    sixFactorLead: "Testosterone is the single most informative biomarker in the BERM framework because six independent biophysical properties make it exceptionally sensitive to the EMF → VGCC → Ca²⁺ mechanism.",

    diseaseCascadesTitle: "Extended Disease Cascades",
    diseaseCascadesLead: "Ten additional disease cascades derived from the VGCC gene family analysis. Each cascade links a specific VGCC subtype to a disease mechanism with its own evidence level.",
    diseaseCascades: [
      { num: 9, title: "Myopia", mechanism: "EMF → VGCC in dopaminergic amacrine cells → DA release disrupted → scleral elongation brake weakened + CRY → melatonin → circadian ocular growth dysregulated. THREE converging channels.", level: "M", trend: "22.9% (2000) → 34% (2020) → 50% (2050)" },
      { num: 10, title: "Autoimmune Diseases", mechanism: "EMF → chronic Ca²⁺ perturbation in T-cells → Ca²⁺-calcineurin-NFAT pathway dysregulated → autoreactive T-cell activation. Calcineurin inhibitors (cyclosporine, tacrolimus) are standard treatment — pharmacological confirmation.", level: "M|C", trend: "5% US prevalence, +19.1%/year globally" },
      { num: 11, title: "Hearing Loss & Tinnitus", mechanism: "EMF → Cav1.3 in inner hair cell synapses → chronic Ca²⁺ overload → excitotoxicity → synapse damage. Bluetooth/earphone EMF directly adjacent to cochlea.", level: "M|C", trend: "17.7% young adults report tinnitus; 1B+ at risk" },
      { num: 12, title: "Migraine", mechanism: "CACNA1A (P/Q-type) GoF → CSD. CACNA1I (Cav3.3) variants → hemiplegic migraine (OR 2.30). Female:male 2.5-4.3:1 consistent with sex-differential VGCC.", level: "E", trend: "Prevalence increasing; onset age 12-17" },
      { num: 13, title: "Sleep Architecture Disruption", mechanism: "Cav3.3 in nRt → spindle pacemaking. Cav3.1 in TC neurons → delta waves. T-type window current → slow oscillation. EMF → spindle/delta disruption → sleep quality ↓.", level: "M|C", trend: "Insomnia rising; sleep duration declining globally" },
      { num: 14, title: "PCOS", mechanism: "4-organ convergence: pancreas β-cell (Cav1+3 → insulin ↓) → hyperinsulinemia → theca androgen ↑ + granulosa aromatase → E2 ↓ + pituitary Cav3 → LH/FSH ↑. All four EMF-sensitive.", level: "M", trend: "5-20% reproductive-age women; rising through 2035" },
      { num: 15, title: "Chronic Pain", mechanism: "Cav3.2 is PRIMARY pain channel in DRG nociceptors. Upregulated in inflammatory/neuropathic pain. Female DRG neurons show more prominent Cav3.2 currents → sex difference.", level: "M|C", trend: "Chronic pain epidemic; hundreds of millions affected" },
      { num: 16, title: "Cardiac Arrhythmia (QT)", mechanism: "CACNA1C GoF → Cav1.2 window current ↑ → QT ↑. Timothy syndrome: extreme QT + autism from SAME mutation.", level: "E", trend: "Timothy: most die before age 3 without treatment" },
      { num: 17, title: "Neurodevelopment & Sexual Differentiation", mechanism: "7 causal channels × 3 developmental windows. Prenatal: Leydig Cav3 → T↓, aromatase, pituitary. Pubertal: PFC, melatonin, OT/AVP, insular cortex.", level: "L*", trend: "Gender clinic referrals: Sweden +19,700%; ASD-GD 6-26%" },
      { num: 18, title: "TheraBionic: Proof of Mechanism", mechanism: "FDA-approved (2019) device for HCC. 27.12 MHz, AM at tumor-specific frequencies. SAR 100-1000× below phone. Mechanism: EMF → Cav3.2 → Ca²⁺ → HCC differentiation. CONFIRMS non-thermal EMF → VGCC.", level: "E", trend: "34% survival increase in advanced HCC" },
    ],
    vgccDiagramTitle: "VGCC Gene Family",
    vgccDiagramSubtitle: "Six genes, six disease clusters, one mechanism",
    emfBarTitle: "EMF sensitivity hierarchy at resting potential",
    emfBarSubtitle: "Relative activation probability at ~−70 mV membrane potential",

    epistemic:
      "Epistemic note: The equations above are the current model specification (BERM v17). Parameter values are calibrated against observed data and will be updated as new evidence becomes available. The model is explicitly designed to be falsifiable -- if its predictions fail, the model is wrong. The Therapeutic Device Paradox (24+ regulatory-approved non-thermal EMF device categories, DC to UV) establishes non-thermal bioactivity as regulatory fact, not hypothesis.",
    lbermRef:
      "Formal Jacobian product structure (chapter 17), proof-obligation register and safety systems are described in the base document (LBERM_final.docx).",
  },
  fi: {
    title: "Mallin dokumentaatio",
    subtitle:
      "Bio-sähkömagneettisen lisääntymismallin (BERM) täydellinen dokumentaatio: kolmitasoinen arkkitehtuuri, kausaalireitit, kytkentäyhtälöt ja palautumisdynamiikka.",
    metaTitle: "Mallin dokumentaatio - Extinction Field",
    metaDesc:
      "BERM-mallin dokumentaatio: kolmitasoinen arkkitehtuuri, kausaalireitit, yhtälöt ja palautumisdynamiikka.",

    archTitle: "Kolmitasoinen arkkitehtuuri",
    archDesc:
      "BERM erottelee syntyvyyden laskun kolmeen erilliseen kausaalitasoon. Jokaisella tasolla on oma dynamiikkansa, aikaskaalansa ja näyttöpohjansa. Maan kokonaishedelmällisyysluku (TFR) on kaikkien kolmen tason tulo, ei summa -- kukin toimii kertoimena muille.",
    level1Label: "Taso 1",
    level1Title: "Biologinen kapasiteetti",
    level1Desc:
      "Fysiologinen maksimaalinen hedelmällisyys nykyisten ympäristöaltistusten vallitessa. Sisältää siittiöiden laadun (pitoisuus, liikkuvuus, DNA-fragmentaatio), munasolujen laadun, hormonaalisen ympäristön ja veri-aivoesteen (BBB) eheyden. Tämä on taso, johon EMF-altistus vaikuttaa suorimmin.",
    level2Label: "Taso 2",
    level2Title: "EMF-käyttäytymiskytkentä",
    level2Desc:
      "Miten henkilökohtaisten laitteiden käyttö vuorovaikuttaa ympäristön EMF-altistuksen kanssa. Korkean ympäristöaltistuksen alueella puhelinta kantava henkilö kokee epälineaarisen kytkentävaikutuksen. Tämä taso kuvaa infrastruktuuritason ja henkilökohtaisen altistuksen välistä vuorovaikutusta.",
    level3Label: "Taso 3",
    level3Title: "Todellinen kulttuuri",
    level3Desc:
      "Vapaaehtoiset hedelmällisyysvalinnat biologisesta kapasiteetista riippumatta. Koulutus, kaupungistuminen, ehkäisyn saatavuus, taloudelliset mahdollisuudet ja kulttuuriset normit. Tämä komponentti on kaikissa demografisissa malleissa; BERM lisää biologiset ja EMF-tasot sen alle.",

    causalTitle: "Kausaalireittikaavio",
    causalDesc:
      "Alla oleva kaavio näyttää täydellisen mekanistisen ketjun Lindgren-geometriasta TFR-laskuun. Kahdeksan tasoa, 63 solmua, 107 reunaa. Kaksi rinnakkaista pääpolkua toimii samanaikaisesti: Polku A (VGCC → Ca²⁺ → ROS) on kokeellisesti vahvin (23–28 salpaajatukimusta), kun taas Polku B (RPM → CRY → vuorokausirytmin häiriö) on teoreettisesti täydellisin silta Lindgrenin geometriasta biologiaan (87,5 % RPM-Hamiltoniaanin elementeistä on johdettavissa metriikka-ansatzista). CRY/RPM-polulla on tukea useasta lajista: magneettikompassin häiriintyminen linnuissa (Ritz 2004, Engels 2014), CRY-riippuvainen magnetoreseptio Drosophilassa (Yoshii 2009), CRY-riippuvainen ROS-modulaatio ihmisen soluissa (Sherrard 2018) ja — kriittisesti — toiminnallinen sinivalosta riippuva magnetoreseptio ihmisessä (Chae ym. 2019, PLOS ONE), mikä osoittaa biologisen substraatin olemassaolon lajissa jota BERM mallintaa. Molemmat ovat itsenäisesti tuetut E-tason evidenssillä. Klikkaa mitä tahansa solmua nähdäksesi sen mekanismin, Lindgren-tulkinnan, kvantitatiivisen muotoilun, palautumisparametrit ja keskeiset viitteet. Solmujen reunat on väritetty episteemisen tason mukaan.",
    pathwayHierarchyNote:
      "Polkujen painot perustuvat empiiriseen kalibrointiin yhteisödatalla (amissit–Korea-gradientti). Ne eivät heijasta teoreettista hierarkiaa: Polku B (CRY/RPM) on PRIMARY-polku koska 87,5 % RPM-Hamiltoniaanista on johdettavissa Lindgren-geometriasta — mekanismin OLEMASSAOLO seuraa geometrisena seurauksena. Polulla A on vahvempi kokeellinen tuki (23–28 salpaajatukimusta). Aiempi δVm-vastalause (δV_m ≈ 10⁻²¹ V pelkästä geometriasta) on nyt ratkaistu T-tyypin kalsiumkanavan bifurkaatiomekanismilla: Schwanin yhtälö vahvistaa ulkoiset kentät 7,5–15 μV:iin kalvolla (37 % lämpökohinasta 1 V/m ympäristössä; 184 % 5 V/m henkilökohtaisessa), ja T-tyypin (Cav3) kanavat toimivat bifurkaatiopisteessä, jossa ~10 % on avoinna levossa (ikkunavirta), mikä tekee niistä herkkiä näille häiriöille. Polku D (HPA → testosteroni) on nyt myös johdettu saman T-tyypin mekanismin kautta: Schwanin δVm → Cav3 → Ca²⁺ → StAR → testosteroni (Xiang 2025).",
    rpmFrequencyNote:
      "CRY/RPM ei vastaa RF-kantoaaltotaajuuteen (900 MHz – 3,5 GHz). Sen resonanssimaksimi on ~22,5 MHz (Talbi, Zadeh-Haghighi & Simon 2025, Front. Quantum Sci. Technol. 4:1544473). Polun B biologisesti aktiiviset komponentit ovat geomagneettinen tausta (B_DC) ja telecom-signaalien ELF-modulaatioverhoilukäyrät (GSM 217 Hz, WiFi 10 Hz beacon). RF-kantoaallon vaikutukset välittyvät polku A:n kautta sähkökentän komponenttina. Kahdella polulla on toisiaan täydentävät taajuusalueet.",
    vgccHierarchyTitle: "VGCC-herkkyyhierarkia lepopotentiaalissa",
    vgccHierarchyNote:
      "Kaikki jänniteohjatut kalsiumkanavat eivät ole yhtä EMF-herkkiä. Lepopotentiaalissa (~−70 mV) EMF-herkkyys noudattaa hierarkiaa: Cav3 (T-tyyppi) >> Cav1.3 >> Cav1.2. T-tyypin kanavat (Cav3.1, Cav3.2, Cav3.3) toimivat bifurkaatiopisteessä, jossa ~10 % on avoinna levossa (ikkunavirta), mikä tekee niistä jatkuvasti herkkiä pienille jännitemuutoksille. Cav1.3 on 'matalan kynnyksen L-tyyppi', joka aktivoituu ~−50 mV:ssa — 25 mV negatiivisemmin kuin Cav1.2 (J Neurosci 2001). Tämä tekee Cav1.3:sta pääkanavan kudoksissa, jotka vaativat jatkuvaa matalan jännitteen kalsiumvirtaa: SA-solmun tahdistus ja sisäkorvan karvasolun synaptinen transduktio. Cav1.2, kanoninen L-tyyppi, aktivoituu ~−30 mV:ssa ja on merkittävä VAIN aktiopotentiaalin aikana — levossa sen kontribuutio on mitätön. Tämä hierarkia selittää kudosspesifisen EMF-haavoittuvuuden: Cav3-valtaiset elimet (kivekset, aivolisäke, lisämunuainen, hippokampus) ovat herkimpiä; Cav1.3-riippuvaiset kudokset (sisäkorva, SA-solmu) ovat välitasoa; Cav1.2-valtaiset kudokset (luurankolihas, kammiosydän) vaikuttuvat vain sähköisen aktiivisuuden aikana.",
    camkiiTitle: "CaMKII-positiivinen takaisinkytkentä: kumulatiivinen herkistyminen",
    camkiiNote:
      "Kriittinen löydös BERM:n kumulatiivisen altistusmallin kannalta: CaMKII:n (kalsium/kalmoduliini-riippuvainen proteiinikinaasi II) fosforylaatio siirtää Cav3.2:n aktivaatiokynnystä NEGATIIVISEMPAAN suuntaan (PMC9913649). Tämä luo positiivisen takaisinkytkentäsilmukan: EMF → Cav3.2 Ca²⁺ -sisäänvirtaus → CaMKII:n aktivaatio → Cav3.2:n kynnys siirtyy vasemmalle → kanava tulee HERKEMMÄKSI EMF:lle → lisää Ca²⁺ -sisäänvirtausta. Tämä molekulaarinen mekanismi selittää, miksi EMF-vaikutukset ovat kumulatiivisia ajan myötä: jokainen altistusjakso tekee järjestelmästä herkemmän seuraaville altistuksille. CaMKII-takaisinkytkentä selittää myös, miksi lyhytaikaiset tutkimukset voivat aliarvioida pitkäaikaisvaikutuksia — herkistyminen kehittyy viikkojen tai kuukausien kuluessa. Farmakologinen ennuste: CaMKII-inhibiittorit (KN-93) estävät progressiivisen herkistymisen vaikuttamatta akuutteihin EMF-vasteisiin.",

    chiSub: "Saturaatiokäyrä ambient × henkilökohtaisen altistuksen vuorovaikutukselle",
    chiTitle: "Lindgrenin chi-kytkentäyhtälö",
    chiDesc:
      "Ympäristön EMF-infrastruktuurin ja henkilökohtaisen laitealtistuksen välinen kytkentä ei ole lineaarinen. Chi-funktio kuvaa saturaatiokäyrää: matalilla ympäristötasoilla henkilökohtainen altistus lisää vain vähän; korkeilla ympäristötasoilla henkilökohtainen altistus on jo ympäristökentän hallitsema.",
    chiExplain:
      "on normalisoitu ympäristöaltistus (0 = ei infrastruktuuria, 1 = saturaatio). Funktio lähestyy asymptoottisesti arvoa 1, mikä tarkoittaa, että henkilökohtaisten laitteiden marginaalivaikutus pienenee ympäristöaltistuksen kasvaessa.",
    chiWherePrefix: "Missä",

    chiFiveTitle: "χ viidellä skaalalla",
    chiFiveSub: "Valintasääntö molekyylistä populaatioon",
    chiFiveDesc: "χ-funktio ei rajoitu ympäristö-henkilökohtaiseen kytkentään. Se esiintyy jokaisella biologisella skaalalla, jossa taustamuuttujan on oltava nollasta poikkeava, jotta häiriö voi vaikuttaa. Alla oleva taulukko näyttää viisi saman matemaattisen periaatteen ilmentymää.",
    chiFiveColScale: "Skaala",
    chiFiveColBg: "Tausta (B)",
    chiFiveColPerturb: "Häiriö",
    chiFiveColExpr: "χ-lauseke",
    chiFiveColVerify: "Verifiointi",
    chiFiveColLevel: "Taso",
    chiFiveLink: "Katso koko analyysi →",

    chiEvidenceTitle: "χ evidenssiperheissä",
    chiEvidenceSub: "Miten valintasääntö ilmenee kuudessa itsenäisessä biologisessa domeenissa",
    chiEvidenceDesc: "χ-funktio ei ole abstrakti rakenne — se ennustaa spesifisiä, testattavia modulaatioita kuudessa evidenssiperheessä. Jokaisella perheellä on oma χ-modulaattorinsa, joka määrää milloin ja kuinka voimakkaasti EMF vaikuttaa kyseiseen järjestelmään.",
    chiEvidenceFamilies: [
      { family: "Diabetes (β-solut)", chi: "χ(glukoosi): K_ATP → V_mem → VGCC-esiviriytys", mechanism: "Korkea glukoosi sulkee K_ATP-kanavat → kalvo depolarisoituu → VGCC:t virittyvät → χ KORKEA. Matala glukoosi → K_ATP auki → χ MATALA.", prediction: "EMF × korkea-GI-ruokavalio tuottaa synergistisen diabetesriskin. Paasto suojaa β-soluja.", verification: "Sakurai 2008: ELF vähensi insuliinineritystä 30 %", level: "M|C" },
      { family: "Siittiölaatu (BTB)", chi: "χ(BTB:n eheys): este vaimentaa efektiivistä kenttää", mechanism: "Ehjä BTB suojaa spermatogeneettisiä soluja → matala χ. EMF avaa BTB:n → suoja menetetään → χ nousee → positiivinen takaisinkytkentä.", prediction: "Siittiölaadun lasku kiihtyy ajan myötä (superlineaarinen).", verification: "Yu 2019: 4G-RF häiritsee BTB:tä suoraan, aikariippuvainen", level: "E" },
      { family: "Esteet (BBB + BTB)", chi: "χ(esteen läpäisevyys): jatkuva modulaattori", mechanism: "Esteet ovat jatkuvia χ-modulaattoreita. Osittain vaurioitunut este = osittainen χ:n kasvu. Tuottaa multiplikatiivisen vahvistuksen.", prediction: "Superlineaarinen annos-vaste kumulatiivisella altistuksella.", verification: "Ulusoy 2025: progressiivinen BBB-degradaatio 30–360 min", level: "E" },
      { family: "Sentinellilajit", chi: "χ(aineenvaihduntanopeus): M^(−0.25) skaalaus", mechanism: "Pienet eläimet: korkeampi massaspesifinen metabolianopeus → korkeampi perus-ROS → korkeampi χ → suurempi EMF-vaste.", prediction: "Hyönteiset ja pienet linnut kärsivät ensin; suuret nisäkkäät myöhemmin.", verification: "Ajallinen järjestys vastaa kehon massan skaalausta", level: "M|C" },
      { family: "Sydän (CRY2-TRPC1)", chi: "χ(CRY2:n tila): valo- ja FAD-riippuvainen", mechanism: "Jos CRY2-TRPC1 toimii kardiomyosyyteissä (kuten myoblasteissa, Yap 2025), sydämen kalsiumsisäänvirtaus on valo/FAD-riippuvainen.", prediction: "Yöllinen puhelimen käyttö → korkeampi arytmiariski kuin päivällä.", verification: "Ei vielä testattu. TRPC-kanavat vahvistettu myosyyteissä.", level: "L*" },
      { family: "Adeyn–Blackmanin ikkuna", chi: "χ(fotosykli) × χ(lämpötila) × χ(DC-orientaatio)", mechanism: "'Biologinen ikkuna' syntyy kolmesta päällekkäisestä χ-ikkunasta. Kaikki kolme kontrolloivat laboratoriot saavat johdonmukaisia tuloksia.", prediction: "Viiden parametrin standardi ratkaisee 50 vuoden replikaatiodebatin.", verification: "Blackman 1985–1991: osoitti jokaisen ikkunan erikseen", level: "M" },
    ],

    twoChSub: "ELF + IF + RF -hajottelu 12 teknologiakerroksella ja TCBM",
    twoChTitle: "Kolmikanavainen altistusmalli",
    twoChDesc:
      "Kokonaistehokas EMF-altistus jakautuu kolmeen taajuuskanavaan — ELF (f < 1 kHz, kalvomodulaatio), IF (1 kHz – 1 MHz, solunjakautuminen/mitoottinen), RF (> 1 MHz, spin-kemia) — kukin painotettuna biologisen mekanisminsa mukaan ja chi-kytkennällä moduloituna.",
    twoChExplain:
      "cumEMF = w_ELF · cumELF + w_IF · cumIF + w_RF · cumRF, missä nykyiset diagnostiset painot ovat w_ELF = 0,05, w_IF = 0,60, w_RF = 0,35. Nämä ovat DIAGNOSTISIA painoja, jotka vaativat empiirisen kalibraation, eivät sovitettuja parametreja -- kolmikanavadekompositio on rakenteellisesti johdettu kalvobiofysiikasta, mutta suhteelliset painot ovat epävarmoja. Maassa, jossa matkapuhelininfrastruktuuri on lähes nolla, jopa runsas puhelinkäyttö tuottaa vähän kokonaisaltistusta (chi on lähellä nollaa). Vastaavasti täysin saturoituneessa ympäristössä henkilökohtainen komponentti lisätään lähes lineaarisesti kaikkien kolmen kanavan kautta.",
    twoChLayersTitle: "12 teknologiakerrosta ambient-kentän komponentteina",
    twoChLayersDesc:
      "Ambient-termi ei ole monoliittinen. Se hajoaa 12 itsenäiseen teknologiakerrokseen, joista jokaisella on oma ajurinsa, käyttöönottoaikataulunsa ja taajuusprofiilinsa. Tämä hajotus parantaa mallin diskriminointikykyä koska jokainen kerros toimii ortogonaalisena instrumenttina.",
    ifoVgicNote: "IFO-VGIC-mekanismia tukee 131 tutkimuksen kattava katsaus (Panagopoulos ym. 2025, Bioelectromagnetics): 95 % raportoi oksidatiivisia vaikutuksia RF/Wi-Fi-altistuksessa. Tämä konsensus, joka on yhdenmukainen Yakymenko ym. 2016 (93/100) kanssa, tukee Ca²⁺-influksi → ROS -reitin parhaiten dokumentoiduksi ei-termiseksi mekanismiksi.",
    multiPathwayCa2Note: "Tason 4 Ca²⁺-häiriö operoi useamman itsenäisen reitin kautta: (1) suora S4-jännitesensorin pakotettu oskillaatio (Panagopoulos ym. 2025, IFO-VGIC); (2) solunsisäisten kalsiumvarastojen dysregulaatio ryanodiinireseptoreiden (RyR) ja SERCA-pumppujen kautta (Bertagna ym. 2025, Ann NY Acad Sci). Molemmat farmakologiset salpauskokeet (VGCC-salpaajat reitille 1; dantroleeni RyR:lle, CPA SERCA:lle reitille 2) estävät EMF-vaikutukset — tukee mekanismia. Monireittiisyys selittää kudosspesifisen herkkyyden: solut joissa on korkea VGIC-tiheys JA suuret solunsisäiset Ca²⁺-varastot (neuronit, gonaadisolut) ovat herkempiä kuin matalan varastotiheyden solut (keratinosyytit — vrt. Meyer 2026, Haidar 2025: nollatulokset ihosoluissa). Huom: Bertagna 2025 on ELF (50 Hz), ei RF — mekanismin siirto RF:lle ei suoraviivainen, mutta Ca²⁺-reitti on jaettu.",
    fiveGReproNote: "Ensimmäinen 5G-taajuusspesifinen testisdata (Bektas ym. 2026, Bioelectromagnetics): 3,5 GHz RF aiheutti testis- ja oksidatiivista vauriota rotilla. CoQ10-lisäravinto lievitti vauriota — osoittaa mekanismin reversiibeliuden. Yhdenmukainen BERM:n recovery window -mallin kanssa, jossa antioksidanttikapasiteetti määrittää nettovaurion. Laajentaa oksidatiivisen stressin evidenssipohjan (Yakymenko 2016: 93/100; Panagopoulos 2025: 95 %) 5G-taajuusalueelle.",
    pathwayCQuantNote: "Melatoniinisuppressiopolkua tukee kvantitatiivisesti 55 tutkimuksen PRISMA-katsaus (Tbahriti ym. 2026, Sleep Biol Rhythms): 88 % korkealaatuisista eläintutkimuksista raportoi EMF-indusoitua melatoniinisuppressiota (20–50 % basaalitasosta). Suppressio on biologisesti merkittävä GnRH-pulsaatiolle mutta pienempi kuin valon aiheuttama (>90 %) — yhdenmukainen BERM:n v17_night_fraction() -mallinnuksen kanssa, jossa EMF on yksi komponentti yöllisessä kolminkertaisessa osumassa (melanopsiini + CRY + melatoniini), ei ainoa ajuri. Metodologinen huomio: vain 27 % tutkimuksista täytti korkeat standardit.",
    pathwayCWeightNote: "Huomautus polku C:n painosta: Polku C:n 25 % heijastaa sekä sen sirkadiaanista funktiota (CRY2 → kellogeenitranskriptio → melatoniini → HPG) että äskettäin löydettyä kalsiumsignalointifunktiota (CRY2 → TRPC1-modulaatio → Ca²⁺-sisäänvirtaus; Yap ym. 2025, Cells). TRPC1 on TRP-kanava, ei jänniteriippuvainen kalsiumkanava (VGCC). Polut A ja C ovat siten farmakologisesti erotettavissa: L-tyypin VGCC-salpaajat (nifedipiini) estävät polku A:n vaikutuksia mutta eivät CRY2-TRPC1-vaikutuksia.",
    cryIndividualVariationNote: "Yksilöllinen vaihtelu: CRY-herkkyyttä moduloivat iiriksen pigmentaatio (sininen > vihreä > ruskea; Higuchi 2007), ravitsemuksellinen FAD-tila (Hirano 2017) ja sukupuoli (miehet > naiset akuutissa magnetoreseptiossa; Chae 2019). Nämä modulaattorit voivat selittää osan polku C:n tehokkuuden yksilöiden ja populaatioiden välisestä vaihtelusta. CRY2-TRPC1-fyysinen kompleksi (Yap/Sherrard 2025) paljastaa lisäksi, että polku C:llä on toinen alaspäin suuntautuva haara: CRY2 moduloi TRPC1:tä (TRP-kanava, EI VGCC), mahdollistaen kalsiumsignaloinnin polku A:sta riippumatta. Polut A ja C ovat farmakologisesti erotettavissa — L-tyypin VGCC-salpaajat estävät A:n mutta eivät CRY2-TRPC1:tä. Katso yksityiskohtainen analyysi /evidence/eyes.",
    cryDualSystemNote: "CRY:n kaksoissysteemi: Polku C toimii verkkokalvon kahden erillisen kryptokromisysteemin kautta. C1 (sensorinen): Täyspitkä CRY1-proteiini löydettiin yksinomaan lyhyen aallonpituuden herkkien sinisten tappisolujen ulkosegmenteistä ihmisen, bonobon ja gorillan verkkokalvoissa (Bartölke ym. 2025, FASEB J). Tämä sijainti kaukana tumista — fototransduktiokoneistossa — viittaa sensoriseen toimintaan sirkadiaanisen kellon säätelyn ohella. Tappisolujen ulkosegmenttien pinotut kalvolamellat tarjoavat magnetoreseptiolle tarvittavan suuntajärjestyksen (vrt. Majewska ym. 2025, ACS Chem Biol: CRY assosioituu lipidikaksoiskerrosten kanssa järjestäytyneesti). Tämä on systeemi, johon iiriksen pigmentaatio vaikuttaa eniten: siniset silmät päästävät ~100× enemmän valoa sinisiin tappisoluihin, mikä lisää CRY1-aktivaatiota. C2 (sirkadiaaninen): CRY2 ekspressoituu verkkokalvon gangliosoluissa, erityisesti SCN:iin projisoivissa ipRGC-soluissa. CRY2 muodostaa fysikaalisen kompleksin TRPC1:n kanssa (Yap ym. 2025), yhdistäen sirkadiaanisen polun ionikanavaviestintään. Molemmat systeemit vaativat FAD:n kromoforinaan ja ovat siten molemmat riippuvaisia riboflaviini (B2) -tilasta.",
    recoveryWindowNote: "Akuutin ja kroonisen altistuksen ero on empiirisesti tuettu: Koivisto ym. (2000) havaitsi kognitiivisen fasilitaation 30–60 min altistuksen jälkeen (yhteensopiva akuutin Ca²⁺-välitteisen synaptisen vahvistuksen kanssa), kun taas Panagopoulos ym. (2025) raportoi 95 %:n oksidatiivista stressiä kroonisissa/toistuvissa altistuksissa. Recovery window -malli ratkaisee tämän: 30 min + 23,5 h palautuminen → 97 % korjaus; 22 h altistus + 2 h palautuminen → 21 % korjaus.",
    lateralizationNote: "Kaksikanavamallin spatiaalista rakennetta tukevat lateralisaatiotutkimukset: Eliyahu ym. (2006) ja Luria ym. (2009) osoittivat, että 890 MHz:n altistus vaikuttaa nimenomaan puhelinta lähimpänä olevaan aivopuoliskoon. Tämä osoittaa, ettei personal-EMF-vaikutus ole systeeminen vaan paikallinen — EMF vaimenee etäisyyden neliössä — ja tukee BERM:n premissiä: puhelin taskussa → kivekset, puhelin korvalla → hypotalamus.",
    ifChannelTitle: "IF-kanava: LED-valaistus päälähteinä",
    ifChannelDesc:
      "IF-kanava (1 kHz – 1 MHz) kohdistuu jakautuviin soluihin saman taajuus–solukoko-suhteen kautta kuin FDA:n hyväksymä TTFields-syöpähoito. Ympäristön IF-kenttien pääasiallinen lähde on LED-valaistus: jokainen LED-lamppu sisältää hakkuriteholähteen, joka toimii 20–200 kHz:n taajuudella ja tuottaa harmonisia megahertsialueelle asti. Tyypillisessä kodissa on 15–30 tällaista lähdettä; tyypillisessä toimistossa 200–500. Muita IF-lähteitä ovat ilmanvaihdon taajuusmuuttajat (5–50 kHz), induktioliedet (20–75 kHz) ja kaikki hakkuriteholähteet (kannettavan laturit, puhelinlaturit). Mekanismi toimii ionien pakko-oskillaation (IFO-VGIC) kautta, biologisella kynnysarvolla 10⁻⁵ V/m (Panagopoulos 2025) — kertaluokkia mitattujen LED-ajuriemissioiden alapuolella.",
    tcbmTitle: "Kolmikanavainen biologinen malli (TCBM)",
    tcbmIntro:
      "BERM v19.1 tunnistaa kolme riippumatonta sähkömagneettista kanavaa, joilla kullakin on omat taajuusalueensa, altistuslähteet, biologiset mekanismit ja ajalliset historiat:",
    tcbmElfTitle: "Kanava 1: ELF (0–300 Hz)",
    tcbmElfDesc:
      "Lähde: sähköverkko, kodin johdotus, kodinkoneet, muuntajat. Mekanismi: IFO-VGIC pakko-oskillaatio (Panagopoulos 2025). Historia: läsnä sähköistymisestä (1880-luku), vakaa n. 1970 jälkeen. Proksi: asumisen sähkönkulutus (kWh per capita). Aina päällä, 24/7, koko koti.",
    tcbmIfTitle: "Kanava 2: IF (300 Hz – 10 MHz)",
    tcbmIfDesc:
      "Lähde: LED-ajurit (20–300 kHz), SMPS, VFD, induktioliedet. Mekanismi: Cyb5b → Ca²⁺-oskillaatiot (Kim 2026 Cell), IFO korkeammilla taajuuksilla. Historia: lähes nolla ennen 2009, eksponentiaalinen kasvu 2009–2019 (EU LED-siirtymä). Proksi: LED-markkinaosuus × asumisen sähkönkulutus. Pulssitettu, korkea dV/dt, säätelyaukko (IJRB 2022).",
    tcbmRfTitle: "Kanava 3: RF (100 kHz – 300 GHz)",
    tcbmRfDesc:
      "Lähde: matkapuhelimet, Wi-Fi, Bluetooth, tukiasemat, IoT. Mekanismi: RPM/CRY spin-kemia (Ritz 2004), terminen absorptio korkealla SAR:lla. Historia: 2G (1991), 3G (2001), 4G (2009), 5G (2019), Wi-Fi (1999). Proksi: laajakaistaliittymät per 100, matkapuhelinliittymät. Moduloitu (datakoodaus), personal + ambient.",
    tcbmIfMitotic:
      "IF-kanavan biologinen mekanismi eroaa ELF:stä ja RF:stä. Kun ELF ensisijaisesti aktivoi ionikanavia (IFO-VGCC) ja RF ensisijaisesti häiritsee radikaaliparin spin-kemiaa (RPM/CRY), IF toimii KOLMANNEN reitin kautta: polaaristen makromolekulaaristen rakenteiden häirintä solunjakautumisen aikana (mitoottinen kara, tubuliinidimeerit). TTFields-tutkimus osoittaa, että IF-kentät (100–500 kHz) kohdistuvat polaarisiin solunsisäisiin elementteihin. Mekanismi on taajuusriippuvainen: syöpäsolut kärsivät eniten 150–200 kHz:llä, normaalit solut ~50 kHz:llä (Nature 2020). LED-hakkuriemissiot (20–100 kHz) kattavat normaalien solujen herkkyystaajuuden.",
    tcbmWeightNote:
      "Huomautus painoista: TCBM-painot (w_ELF 0,05, w_IF 0,60, w_RF 0,35) ovat DIAGNOSTISIA — teoreettisia arvioita mekanismin uskottavuuden perusteella, eivät dataan sovitettuja. Alla olevat poikkileikkauspainot (ELF ~60 %, RF ~40 %) ovat EMPIIRISIÄ — kalibroitu 54 maan regressiosta. Nämä eivät ole ristiriidassa: poikkileikkausregressio ei voi erottaa IF:ää ELF:stä, koska LED-penetraatio korreloi sähköistymisen kanssa, joten ELF:n empiirinen 60 % sisältää todennäköisesti suuren piilotetun IF-komponentin. T1-temporaalitesti (LED-DID) on suunniteltu ratkaisemaan tämä.",
    tcbmCrossSectional:
      "Poikkileikkauskaavassa (54 maata, LOOCV RMSE 0.522) asumisen sähkönkulutus on pääproksi, koska se kattaa ELF:n (aina läsnä sähkön kanssa) ja korreloi IF:n kanssa (LED-penetraatio seuraa sähköistymistä). Laajakaista kattaa RF:n. ELF kantaa ~60 % poikkileikkaussignaalista, RF ~40 %. IF:ää ei voi erottaa ELF:stä poikkileikkauksessa, koska LED-penetraatio korreloi sähköistymisen kanssa. Temporaalinen testi (T1: LED-DID) tarvitaan IF:n itsenäisen kontribuution erottamiseksi.",
    tcbmWolframPlanned:
      "Suunniteltu: Wolfram Language -formalisointi kolmikanavaisen kytkentärakenteen muodolliseksi verifioinniksi, mukaan lukien IFO-VGIC-kynnyksen symbolinen derivointi ja numeerinen validointi 54 maan poikkileikkausaineistolla.",

    recovSub: "Melatoniini → kortisoli → testosteroni → siittiöt → hedelmällisyys -palautumiskaskadi ja aikaskaalat",
    recovTitle: "Viisikerroksinen palautumismalli",
    recovDesc:
      "Jos EMF-altistusta vähennettäisiin, eri biologiset järjestelmät palautuisivat eri nopeuksilla. Kunkin kerroksen α-parametri edustaa palautuvan vaurion osuutta (1,0 = täysin palautuva, 0,0 = pysyvä).",
    recovColLayer: "Kerros",
    recovColAlpha: "α",
    recovColTimescale: "Palautumisaikaskaala",
    recovColNotes: "Huomiot",
    recovVgicLayer: "VGIC-porttaus",
    recovVgicTime: "Tunteja",
    recovVgicNote:
      "Ionikanavien konformaatiomuutokset palautuvat välittömästi kentän lakatessa",
    recovRosLayer: "ROS-puhdistuma",
    recovRosTime: "Päiviä viikkoihin",
    recovRosNote:
      "Antioksidanttijärjestelmät palauttavat tasapainon, mutta krooninen oksidatiivinen stressi voi aiheuttaa pysyviä mitokondriovaurioita",
    recovDnaLayer: "DNA-korjaus (SDF)",
    recovDnaTime: "Kuukausia (spermatogeneesisykli)",
    recovDnaNote:
      "Uusia siittiöitä muodostuu 74 päivän välein, mutta kantasolujen vauriot voivat säilyä syklien yli",
    recovLeydigLayer: "Leydigin solujen toiminta",
    recovLeydigTime: "Kuukausista vuosiin",
    recovLeydigNote:
      "Testosteronia tuottavat solut voivat osittain palautua, mutta krooninen atrofia heikentää uudistumiskykyä",
    recovBbbLayer: "Biologiset esteet (BBB + BTB)",
    recovBbbTime: "BBB: palautumaton; BTB: osittain palautuva",
    recovBbbNote:
      "Kroonisesta BBB-vuodosta johtuvan hermostovaurion oletetaan olevan pysyvä. BTB:n häiriö (Yu ym. 2019: Spock3-MMP2-akseli 4G:llä) vaarantaa spermatogeneettisen mikroympäristön suoraan. Molemmat esteet käyttävät samoja tight junction -proteiineja (okkludiini, ZO-1). Positiivinen takaisinkytkentä: estevaurio → korkeampi efektiivinen kenttä → enemmän vauriota.",

    compSub: "Miten TFR-kaava erottaa biologisen kapasiteetin kulttuurisesta kysynnästä",
    compTitle: "Kompensaatiomekanismi",
    compDesc:
      "Havaittu TFR ei ole yksinkertaisesti kolmen tason tulo. Yhteiskunnat kompensoivat osittain biologista laskua avustetun lisääntymisen, käyttäytymismuutosten ja poliittisten interventioiden kautta. Tehokas TFR sisältää kompensaatioeksponentin α = 0,43, joka kuvaa tätä osittaista tasausta.",
    compWhereLabel: "Missä:",
    compBioCap: "biologinen kapasiteetti (taso 1), normalisoitu 0–1",
    compBehav: "EMF-käyttäytymiskytkentäkerroin (taso 2)",
    compAlpha:
      "kompensaatioeksponentti, kalibroitu vuosien 2000–2024 historiallista dataa vasten",
    compRate2024: "havaittu TFR vuonna 2024 (kalibrointiankkuri)",
    compCultRatio:
      "ennustetun kulttuurisen hedelmällisyyspreferenssin suhde vuoden 2024 perustasoon",
    compBioBehav2024:
      "biologis-käyttäytymistulon arvo kalibrointihetkellä",
    compExplain:
      "Kun α = 0, kompensaatiota ei ole ja biologinen lasku siirtyy suoraan TFR:ään. Kun α = 1, kompensaatio on täydellinen eikä biologinen lasku vaikuta havaittuun TFR:ään. Kalibroitu arvo 0,43 tarkoittaa osittaista mutta epätäydellistä kompensaatiota -- biologinen lasku näkyy edelleen TFR:ssä, mutta noin puolella nopeudella verrattuna tilanteeseen ilman yhteiskunnallista sopeutumista.",

    mtorSub: "EMF, kalorirajoitus ja rapamysiini konvergoivat samaan ikääntymispolkuun",
    mtorTitle: "mTOR-konvergenssihypoteesi",
    mtorDesc1:
      "mTOR on alavirtaintegraattori, jossa EMF:n aiheuttama Ca²⁺-influksi konvergoi ikääntymis-, hedelmällisyys- ja syöpäreittien kanssa. Sempou-reitti: EMF → VGIC → Ca²⁺↑ → mTOR-hyperaktivaatio → autofagia↓, seneskenttien solujen kertyminen, mitokondriaalinen laadunvalvonta↓, krooninen tulehdus↑.",
    mtorDesc2:
      "Metformiini aktivoi AMPK:n, joka suppressoi mTOR:ia -- täsmälleen EMF:n aiheuttaman reitin vastakohta. Hypoteesi: metformiinin pitkäikäisyyshyöty ei ole ikääntymisen vastainen sinänsä, vaan EMF-kiihdytetyn ikääntymisen vastainen. Luonnollisessa EMF-ympäristössä (amissit) hyödyn tulisi olla minimaalinen.",
    mtorEqExplain:
      "Missä EMF on normalisoitu altistus (0 = ei infrastruktuuria, 1 = moderni kaupunki) ja reduktiotekijöihin kuuluvat metformiini (0,30), rapamysiini (0,85), kalorinrajoitus (0,20), ajoittainen paasto (0,10).",
    mtorThreeTitle: "Kolme epidemiaa, yksi mekanismi",
    mtorAging: "Ikääntyminen",
    mtorAgingDesc:
      "mTOR↑ → autofagia↓, seneskenssi↑, tulehdus↑, mitokondriot↓ → kiihtynyt ikääntyminen",
    mtorFertility: "Hedelmällisyys",
    mtorFertilityDesc:
      "mTOR↑ → spermatogoniaalinen erilaistuminen↓, follikulaarinen loppuunpalaminen↑, AMH↓ → TFR↓",
    mtorCancer: "Syöpä",
    mtorCancerDesc:
      "mTOR↑ → proliferaatio↑, kasvainkasvu↑, metastaasi↑ → syöpäriski↑",
    mtorPredTitle: "Testattavat ennusteet",
    mtorPredColId: "ID",
    mtorPredColPred: "Ennuste",
    mtorPredColTest: "Testi",
    mtorPreds: [
      {
        id: "E1",
        pred: "Metformiinin pitkäikäisyyshyöty on suurempi korkean EMF:n ympäristöissä",
        test: "UK CPRD stratifioituna kaupunki/maaseutu",
      },
      {
        id: "E2",
        pred: "Amissien metformiinin käyttäjät saavat pienemmän pitkäikäisyysbonuksen kuin yleinen väestö",
        test: "Amissien diabeteskohortin vertailu",
      },
      {
        id: "E3",
        pred: "Blue Zone -pitkäikäisyysetu häviää 4G/5G:n saapuessa",
        test: "Okinawa, Sardinia, Ikaria -kohorttien seuranta",
      },
      {
        id: "E4",
        pred: "CR-kokeiden efektikoot kasvavat vuosikymmenittäin (kasvava laboratorio-EMF)",
        test: "Meta-analyysi: efektikoko vs. julkaisuvuosi",
      },
      {
        id: "E5",
        pred: "TAME-tutkimuksen hyöty stratifioituu EMF-altistuksen mukaan",
        test: "Kaupunki vs. maaseutu -alaryhmäanalyysi",
      },
      {
        id: "E6",
        pred: "Sapatti (25 h/viikko EMF-vapaata) toimii ajoittaisena mTOR-paastona, tukien haredi-TFR:ää ja pitkäikäisyyttä",
        test: "Haredi vs. sekulaari israelilaiskohortti",
      },
    ],

    fourRoutesTitle: "Viisi itsenäistä EMF -> TFR -reittiä",
    fourRoutesSub: "Gonadi-, sirkadiaaninen, aivolisäke-, autonominen ja neurokehityksellinen — jokainen riittää yksinään",
    fourRoutesDesc: "BERM tunnistaa viisi itsenäistä biologista reittiä, joiden kautta EMF-altistus voi vähentää hedelmällisyyttä. Jokainen reitti toimii erillisen mekanismin ja kohdekudoksen kautta. Kriittisesti jokainen reitti on itsenäisesti riittävä vähentämään TFR:ää — ne toimivat rinnakkain, eivät sarjassa. Tämä tarkoittaa, että yhden reitin estäminen (esim. antioksidanttilisä gonadireitille) ei poista vaikutusta, koska neljä muuta reittiä pysyvät aktiivisina.",
    fourRoutesGonadal: "Reitti 1: Gonadaalinen (vakiintunut)",
    fourRoutesGonadalDesc: "EMF -> VGCC/Cav3 -> Ca2+ -> ROS -> sperman DNA-vaurio + Leydig-solujen StAR-suppressio -> testosteronin lasku + spermatogeneesin häiriö. Kohdekudos: kivekset. Evidenssitaso: E (23-28 salpaajatukimusta). Ensisijainen kanava: RF + ELF.",
    fourRoutesCircadian: "Reitti 2: Sirkadiaaninen (vakiintunut)",
    fourRoutesCircadianDesc: "EMF -> CRY/RPM -> vuorokausirytmin häiriö -> melatoniinisuppressio -> HPG-akselin häiriö + oksidatiivinen stressi follikkeli­nesteessä. Kohdekudos: pinealirauhanen, SCN. Evidenssitaso: E. Ensisijainen kanava: RF (magneettikomponentti).",
    fourRoutesPituitary: "Reitti 3: Aivolisäke (uusi)",
    fourRoutesPituitaryDesc: "EMF -> Cav3 T-tyypin kanavat gonadotrofeissa -> FSH/LH-erityksen häiriö -> alavirran gonadaalinen toimintahäiriö. Aivolisäke sijaitsee BBB:n ulkopuolella ja on suoraan altistunut. Kaikki hormonisolut ilmentävät Cav3:a. Tämä reitti voi vähentää hedelmällisyyttä gonadaalivauriosta riippumatta. Kohdekudos: aivolisäke. Evidenssitaso: E. Ensisijainen kanava: ELF + RF.",
    fourRoutesAutonomic: "Reitti 4: Autonominen (uusi)",
    fourRoutesAutonomicDesc: "EMF -> SA-solmukkeen Cav3.1 -> HRV:n lasku -> vagaalisen tonuksen lasku -> HPA-akselin yliaktivaatio -> krooninen kortisoli -> HPG-ristiinhibitio. HRV on herkkä varhainen biomarkkeri. Kohdekudos: SA-solmuke, vagushermo. Evidenssitaso: E. Ensisijainen kanava: ELF (50 Hz).",
    fourRoutesNeurodevelopmental: "Reitti 5: Neurokehityksellinen (johdettu)",
    fourRoutesNeurodevelopmentalDesc: "EMF → VGCC/Ca²⁺ kriittisten kehitysikkunoiden aikana → häiriintynyt aivojen seksuaalinen differentiaatio, PFC:n kypsyminen, identiteetin muodostus. Sama mekanismi kuin kemialliset EDC:t (BPA, ftalaatit). Additiivinen kemiallisten EDC-vaikutusten kanssa. Estetään: prenataalin EMF-altistuksen vähentäminen, B2/glutationituki. Kohdekudos: sikiön/vauvan aivot. Evidenssitaso: L* (johdettu ennuste — odottaa DIFF-1 AGD -testiä). Ensisijainen kanava: RF + ELF.",
    cascadeNeurodevExt: "Laajennettu analyysi: CACNA1C jaettuna geneettisenä haavoittuvuutena ASD:n, ADHD:n, kaksisuuntaisen mielialahäiriön, masennuksen ja skitsofrenian välillä. Seitsemän kehityskanavaa yhdistää EMF:n aivojen seksuaaliseen differentiointiin samojen Ca²⁺-reittien kautta. Katso aivojen moduloomi täyteen analyysiin.",
    fourRoutesImplication: "Kliininen implikaatio: interventiot jotka kohdistuvat vain yhteen reittiin (esim. antioksidantit reitille 1) osoittavat osittaista mutta epätäydellistä suojaa. Täysi suoja vaatii joko EMF-vähennyksen (käsittelee kaikkia reittejä samanaikaisesti) tai monikohdistusintervention strategian.",

    modulationTitle: "Miksi modulaatio merkitsee enemmän kuin SAR",
    modulationDesc: "Laaja tutkimus (Fertility and Sterility 2023) havaitsi matkapuhelimen käytön yhteyden matalampaan siittiöpitoisuuteen — mutta yhteys oli VAHVEMPI vuosina 2005–2007 kuin 2012–2018. BERM selittää tämän Schwanin yhtälön kautta: biologisesti aktiivinen komponentti ei ole RF-kantoaalto vaan sen ELF-MODULAATIOVERHOKÄYRÄ. GSM (2G): kova TDMA-pulssi 217 Hz, ~100 % modulaatiosyvyys → vahva ELF-komponentti → suuri T-tyypin bifurkaatiovaikutus. LTE (4G): OFDM, ~30–50 % modulaatiosyvyys, matalampi lähetysteho → heikompi ELF-komponentti → pienempi vaikutus. Tämä ennustaa aikatrendin ILMAN 'vähemmän säteilyä on turvallisempaa' -selitystä. Säteilyn MÄÄRÄ voi olla samankaltainen, mutta MODULAATIORAKENNE muuttui.",
    modulationWarning: "Huomautus: tämä aikatrendi on KORRELAATIO. Muut tekijät muuttuivat samanaikaisesti (puhelimen sijainti, käyttötottumukset, muut altistukset). Schwanin selitys on parsimonisin mutta ei ainoa mahdollisuus.",

    modulomeSub: "Yhdeksänkerroksinen synteesi Beckeristä Cyb5b:hen — yhtenäinen alttiusmalli",
    modulomeTitle: "EMF-modulooma",
    modulomeDesc: "Yhdeksäntasoinen modulooma yhdistää kuusi itsenäistä tutkimusperinnettä — Beckerin DC-ohjausjärjestelmän, Adeen elektromin, Levinin bioelektrisen koodin, Lindgrenin geometrisen viitekehyksen, kromoforien yleistyksen (CCO/CRY) ja Cyb5b-EMF-reseptorin (Kim 2026, Cell) — yhtenäiseksi malliksi EMF:n biologisesta herkkyydestä. Jokaista tasoa tukevat itsenäisesti regulaattorihyväksytyt terapeuttiset laitteet, jotka hyödyntävät samaa mekanismia.",

    btnEvidence: "Selaa näyttöä",
    btnPredictions: "Näytä ennusteet",
    mathSub: "Täydellinen derivointi Lindgrenin geometriasta TFR-ennusteeseen",
    mathTitle: "Matemaattinen perusta",
    mathSubtitle:
      'Täydellinen johtaminen Lindgrenin geometriasta TFR-ennusteeseen. Jokainen yhtälö on johdettavissa edellisestä. Klikkaa "Täysi johtaminen" nähdäksesi välivaiheet.',

    thresholdTitle: "Testosteroni → TFR -kynnösmalli",
    thresholdSub: "Kvantitatiivinen yhteys biologisen kapasiteetin laskusta demografiseen romahdukseen",
    thresholdLead: "BERM-mallin vahvin ennustekomponentti. Testosteronin lasku (~1 %/vuosi, ikäriippumaton, dokumentoitu viidessä maassa) luo kolmivaiheisen trajektorin: hiljainen eroosio → kynnyksen ylitys → biologinen rajoite. Malli on kalibroitu Suomen ja Korean datalla ja tuottaa maakohtaisia, testattavia ennusteita.",
    thresholdPhase1Title: "Vaihe 1: Hiljainen eroosio",
    thresholdPhase1Desc: "Testosteroni laskee mutta on biologisesti riittävä. TFR vakaa tai laskee hitaasti kulttuuristen tekijöiden vaikutuksesta. Biologinen kapasiteetti ylittää kulttuurisen kysynnän.",
    thresholdPhase2Title: "Vaihe 2: Kynnys ylitetty",
    thresholdPhase2Desc: "Kumulatiivinen T-menetys ylittää ~40 %. Kasvava miesten subfertiliteetti (T < 300 ng/dL). TFR kiihtyy alaspäin biologisen kapasiteetin tullessa rajoittavaksi tekijäksi. Pronatalistiset ohjelmat alkavat epäonnistua.",
    thresholdPhase3Title: "Vaihe 3: Biologinen rajoite",
    thresholdPhase3Desc: "TFR laskee alle 1,0. Biologinen kyvyttömyys dominoi. Jopa motivoituneet pariskunnat tarvitsevat avustettua lisääntymistä. IVF-kysyntä kasvaa eksponentiaalisesti.",
    thresholdMathTitle: "Matemaattinen muotoilu",
    thresholdMathT: "T(t) = T₀ × (1 − r)^(t − t₀)",
    thresholdMathTFR: "TFR(t) = min( TFR_kult(t), TFR_bio(t) )",
    thresholdMathExplain: "Kun TFR_bio < TFR_kult, biologinen kapasiteetti on rajoittava tekijä. Sigmoidisiirtymä ~40 %:n kumulatiivisen T-menetyksen kohdalla tuottaa havaitun kuvion: vuosikymmeniä vakautta ja sitten nopea romahdus.",
    thresholdTableTitle: "Maakohtaiset parametrit",
    thresholdTableCountry: "Maa",
    thresholdTableRate: "r (%/v)",
    thresholdTableSource: "Lähde",
    thresholdTableCumul: "Kumul. 2024",
    thresholdTableThreshold: "Kynnösvuosi",
    thresholdTablePhase: "Vaihe",
    thresholdFinlandTitle: "Retrospektiivinen validointi: Suomi",
    thresholdFinlandText: "Suomi on mallin Rosetta-kivi. Perheentupa (2013) dokumentoi 37 %:n kohorttikohtaisen T-laskun (n=3 271, 1972–2002). TFR pysyi vakaana 1,63–1,87 neljäkymmentä vuotta (1970–2010) ja romahti sitten 1,26:een vuoteen 2024 mennessä. ~35 vuoden viive T-laskun alusta TFR-romahdukseen on yhdenmukainen kumulatiivisen biologisen eroosion saavuttaessa kynnöksen. Jos malli olisi ollut olemassa vuonna 2005, se olisi voinut ennustaa Suomen romahduksen 10–15 vuotta etukäteen.",
    thresholdProjectionsTitle: "Maakohtaiset TFR-ennusteet",
    thresholdProjections2030: "2030",
    thresholdProjections2035: "2035",
    thresholdChartTitle: "Interaktiivinen kynnösmalli",
    thresholdCaveat: "T-laskuvauhdit ovat ikäriippumattomia sekulaaritrendejä vertaisarvioiduista pitkittäistutkimuksista. Korean ja Japanin vauhdit ovat arvioita. 40 %:n kynnös on kalibroitu, ei derivoitu. Ennusteet olettavat nykyisten vauhtien jatkumisen.",

    whyPronatTitle: "Miksi 200 miljardia dollaria ei nostanut Etelä-Korean syntyvyyttä",
    whyPronatText: "BERM:n kolmitasoarkkitehtuuri jakaa syntyvyyden biologiseen kapasiteettiin (taso 1), EMF-käyttäytymiskytkentään (taso 2) ja kulttuuriseen valintaan (taso 3). Pronatalismipolitiikat — käteisbonukset, vanhempainvapaat, päivähoitotuet — kohdistuvat tasoon 3 (motivaatio). Mutta kun taso 1 (biologinen kapasiteetti) muodostuu sitovaksi rajoitteeksi, mikään tason 3 kannustin ei voi kompensoida. Etelä-Korean kumulatiivinen testosteronihävikki ylittää 48 %. Kasvava osuus lasta haluavista pareista ei pysty hedelmöittymään luonnollisesti. 200 miljardia kohdistui mallin väärään tasoon.",
    whyPronatPrediction: "T-TFR-4: Korean TFR ei ylitä kestävästi 1,0:aa vuoteen 2035 mennessä, riippumatta politiikkapanostuksesta.",
    whyPronatFalsification: "Falsifiointi: Korean TFR yli 1,0 kestävästi 3+ vuotta.",

    bioFloorTitle: "Biologinen lattia",
    bioFloorText: "Spermatogeneesi vaatii intratesticulaarisen testosteronin 50–100× seerumipitoisuuden. Kun seerumitestosteroni laskee alle ~200 ng/dL, spermatogeneesi on vakavasti heikentynyt. Nykyisillä laskuvauhdilla (1 %/vuosi ~500 ng/dL lähtötasosta):",
    bioFloorTimeline: [
      { year: "2024", value: "~320 ng/dL", note: "populaatiokeskiarvo, nuoret miehet" },
      { year: "2035", value: "~285 ng/dL", note: "" },
      { year: "2050", value: "~240 ng/dL", note: "" },
      { year: "2070", value: "~190 ng/dL", note: "spermatogeneesikynnyksen alapuolella" },
    ],
    bioFloorConsequence: "Tämän lattian alapuolella edes IVF ei voi käyttää miehen omia siittiöitä. Luovuttajasiittiöt, testikulaarinen siittiöuutto tai tulevaisuuden teknologiat (in vitro -spermatogeneesi) tulevat välttämättömiksi. Tämä ei ole spekulaatiota — se on aritmetiikkaa sovellettuna mitattuihin laskuvauhteihin.",

    sixFactorTitle: "Miksi testosteroni on integraatiomuuttuja",
    sixFactorLead: "Testosteroni on BERM-viitekehyksen informatiivisin yksittäinen biomarkkeri, koska kuusi itsenäistä biofysikaalista ominaisuutta tekevät siitä poikkeuksellisen herkän EMF → VGCC → Ca²⁺ -mekanismille.",

    diseaseCascadesTitle: "Laajennetut sairauskaskadit",
    diseaseCascadesLead: "Kymmenen lisäsairauskaskadia VGCC-geeniperheen analyysistä. Kukin kaskadi yhdistää tietyn VGCC-alatyypin sairausmekanismiin omalla evidenssitasollaan.",
    diseaseCascades: [
      { num: 9, title: "Myopia (likinäköisyys)", mechanism: "EMF → VGCC dopamiiniergisissä amakriinisoluissa → DA-vapautuminen häiriintyy → skleraalinen pidentymisjarru heikkenee + CRY → melatoniini → sirkadiaaninen silmän kasvu dysreguloituu. KOLME konvergoivaa kanavaa.", level: "M", trend: "22,9 % (2000) → 34 % (2020) → 50 % (2050)" },
      { num: 10, title: "Autoimmuunisairaudet", mechanism: "EMF → krooninen Ca²⁺-perturbaatio T-soluissa → Ca²⁺-kalsineruiini-NFAT-reitti dysreguloituu → autoreaktiivisten T-solujen aktivaatio. Kalsineruiini-inhibiittorit (siklosporiini, takrolimuusi) ovat vakiohoito — farmakologinen vahvistus.", level: "M|C", trend: "5 % USA:n prevalenssi, +19,1 %/vuosi globaalisti" },
      { num: 11, title: "Kuulonmenetys ja tinnitus", mechanism: "EMF → Cav1.3 sisäkarvasolujen synapsissa → krooninen Ca²⁺-ylikuorma → eksitotoksisuus → synapsivaurio. Bluetooth/kuuloke-EMF suoraan simpukan vieressä.", level: "M|C", trend: "17,7 % nuorista aikuisista raportoi tinnitusta; 1 mrd+ riskissä" },
      { num: 12, title: "Migreeni", mechanism: "CACNA1A (P/Q-tyyppi) GoF → CSD. CACNA1I (Cav3.3) variantit → hemipleginen migreeni (OR 2,30). Nainen:mies 2,5-4,3:1 yhdenmukainen sukupuolieriyisen VGCC:n kanssa.", level: "E", trend: "Prevalenssi kasvaa; alkuikä 12-17" },
      { num: 13, title: "Uniarkkitehtuurin häiriö", mechanism: "Cav3.3 nRt:ssä → unisukkuloiden tahdistus. Cav3.1 TC-neuroneissa → delta-aallot. T-tyypin ikkunavirta → hidas oskillaatio. EMF → sukkula/delta-häiriö → unenlaatu ↓.", level: "M|C", trend: "Unettomuus kasvussa; unenkesto laskussa globaalisti" },
      { num: 14, title: "PCOS", mechanism: "4 elimen konvergenssi: haiman β-solu (Cav1+3 → insuliini ↓) → hyperinsulinemia → teeka-androgeeni ↑ + granulosa-aromataasi → E2 ↓ + aivolisäkkeen Cav3 → LH/FSH ↑. Kaikki neljä EMF-herkkiä.", level: "M", trend: "5-20 % lisääntymisikäisistä naisista; kasvussa 2035 asti" },
      { num: 15, title: "Krooninen kipu", mechanism: "Cav3.2 on PRIMAARINEN kipukanava DRG-nosiseptoreissa. Ylireguloitu tulehdus-/neuropaattisessa kivussa. Naisten DRG-neuronit osoittavat prominentimmat Cav3.2-virrat → sukupuoliero.", level: "M|C", trend: "Kroonisen kivun epidemia; sadat miljoonat kärsivät" },
      { num: 16, title: "Sydämen rytmihäiriö (QT)", mechanism: "CACNA1C GoF → Cav1.2 ikkunavirta ↑ → QT ↑. Timothyn oireyhtymä: äärimmäinen QT + autismi SAMASTA mutaatiosta.", level: "E", trend: "Timothy: useimmat kuolevat ennen 3v ilman hoitoa" },
      { num: 17, title: "Neurokehitys ja sukupuolen erilaistuminen", mechanism: "7 kausaalikanavaa × 3 kehitysikkunaa. Prenataalinen: Leydig Cav3 → T↓, aromataasi, aivolisäke. Pubertaalinen: PFC, melatoniini, OT/AVP, insulaarinen korteksi.", level: "L*", trend: "Sukupuoliklinikkälähetteet: Ruotsi +19 700 %; ASD-GD 6-26 %" },
      { num: 18, title: "TheraBionic: mekanismin todistus", mechanism: "FDA-hyväksytty (2019) laite HCC:lle. 27,12 MHz, AM tumorispesifisillä taajuuksilla. SAR 100-1000× alle puhelimen. Mekanismi: EMF → Cav3.2 → Ca²⁺ → HCC-differentaatio. VAHVISTAA ei-termisen EMF → VGCC.", level: "E", trend: "34 % selviytymislisäys pitkälle edenneessä HCC:ssä" },
    ],
    vgccDiagramTitle: "VGCC-geeniperhe",
    vgccDiagramSubtitle: "Kuusi geeniä, kuusi sairausklusteria, yksi mekanismi",
    emfBarTitle: "EMF-herkkyyhierarkia lepopotentiaalissa",
    emfBarSubtitle: "Suhteellinen aktivaatiotodennäköisyys ~−70 mV kalvopotentiaalissa",

    epistemic:
      "Episteeminen huomautus: Yllä olevat yhtälöt ovat nykyinen mallispesifikaatio (BERM v17). Parametriarvot on kalibroitu havaittua dataa vasten ja niitä päivitetään uuden näytön myötä. Malli on nimenomaisesti suunniteltu falsifioitavaksi -- jos sen ennusteet epäonnistuvat, malli on väärässä. Terapeuttinen laiteparadoksi (24+ regulaattorihyväksyttyä ei-termistä EMF-laitekategoriaa, DC:stä UV:iin) vahvistaa ei-termisen bioaktiivisuuden regulatiiviseksi tosiasiaksi, ei hypoteesiksi.",
    lbermRef:
      "Formaali jakobiaanitulorakenne (luku 17), todistusvelvollisuusrekisteri ja turvajärjestelmät on kuvattu perusdokumentissa (LBERM_final.docx).",
  },
} as const;

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const locale_key = (locale as Locale) in t ? (locale as Locale) : "en";
  const d = t[locale_key];
  return {
    title: d.metaTitle,
    description: d.metaDesc,
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const locale_key = (locale as Locale) in t ? (locale as Locale) : "en";
  const d = t[locale_key];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          {d.subtitle}
        </p>
      </header>

      <div className="flex gap-10">
        {/* Sticky sidebar */}
        <ModelTableOfContents locale={locale} />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Three-level architecture */}
          <section id="architecture" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.archTitle}</h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.archDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.level1Label}
                </p>
                <h3 className="text-base font-semibold mb-2">{d.level1Title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.level1Desc}
                </p>
              </SectionCard>

              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.level2Label}
                </p>
                <h3 className="text-base font-semibold mb-2">{d.level2Title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.level2Desc}
                </p>
              </SectionCard>

              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.level3Label}
                </p>
                <h3 className="text-base font-semibold mb-2">{d.level3Title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.level3Desc}
                </p>
              </SectionCard>
            </div>
          </section>

          {/* Interactive causal chain diagram */}
          <section id="causal-diagram" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.causalTitle}</h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.causalDesc}
            </p>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.pathwayHierarchyNote}
            </p>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.rpmFrequencyNote}
            </p>
            <div className="mt-4 mb-4 border-l-4 border-blue-500/40 rounded-r-lg bg-card p-5">
              <h4 className="text-sm font-semibold mb-2">{d.vgccHierarchyTitle}</h4>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {d.vgccHierarchyNote}
              </p>
            </div>
            <div className="mb-6 border-l-4 border-amber-500/40 rounded-r-lg bg-card p-5">
              <h4 className="text-sm font-semibold mb-2">{d.camkiiTitle}</h4>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {d.camkiiNote}
              </p>
            </div>
            <div className="overflow-x-auto">
              <BermCausalDiagram locale={locale_key} />
            </div>
            <span id="ifo" />
            <p className="mt-4 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.ifoVgicNote}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.multiPathwayCa2Note}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.fiveGReproNote}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.pathwayCQuantNote}
            </p>
            <p className="mt-3 text-xs text-foreground-muted max-w-3xl leading-relaxed italic border-l-2 border-amber-500/30 pl-3">
              {d.pathwayCWeightNote}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.cryIndividualVariationNote}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.cryDualSystemNote}
            </p>
          </section>

          {/* Five independent EMF → TFR routes */}
          <section id="four-routes" className="mb-14">
            <h2 className="text-xl font-semibold mb-2">{d.fourRoutesTitle}</h2>
            <p className="text-xs text-foreground-muted italic mb-4">{d.fourRoutesSub}</p>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.fourRoutesDesc}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mb-6">
              <article className="rounded-xl border border-card-border bg-card-bg p-5">
                <h3 className="font-semibold text-sm mb-2">{d.fourRoutesGonadal}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.fourRoutesGonadalDesc}</p>
              </article>
              <article className="rounded-xl border border-card-border bg-card-bg p-5">
                <h3 className="font-semibold text-sm mb-2">{d.fourRoutesCircadian}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.fourRoutesCircadianDesc}</p>
              </article>
              <article className="rounded-xl border-2 border-accent/40 bg-accent/5 p-5">
                <h3 className="font-semibold text-sm mb-2">{d.fourRoutesPituitary}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.fourRoutesPituitaryDesc}</p>
              </article>
              <article className="rounded-xl border-2 border-accent/40 bg-accent/5 p-5">
                <h3 className="font-semibold text-sm mb-2">{d.fourRoutesAutonomic}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.fourRoutesAutonomicDesc}</p>
              </article>
              <article className="rounded-xl border-2 border-red-500/40 bg-red-500/5 p-5 sm:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-sm">{d.fourRoutesNeurodevelopmental}</h3>
                  <span className="rounded-full px-1.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: "#ef444420", color: "#ef4444" }}>L*</span>
                </div>
                <p className="text-xs text-foreground-muted leading-relaxed mb-3">{d.fourRoutesNeurodevelopmentalDesc}</p>
                <p className="text-xs text-foreground-muted leading-relaxed italic border-l-2 border-red-500/30 pl-3 mb-2">
                  {d.cascadeNeurodevExt}
                </p>
                <Link href={`${prefix}/modulome/brain`} className="text-xs text-accent hover:underline">
                  &rarr; {locale_key === "fi" ? "Aivojen moduloomi" : "Brain modulome"}
                </Link>
              </article>
            </div>
            <p className="text-xs text-foreground-muted max-w-3xl leading-relaxed italic border-l-2 border-amber-500/30 pl-3">
              {d.fourRoutesImplication}
            </p>
          </section>

          {/* Why modulation matters more than SAR */}
          <section id="modulation" className="mb-14">
            <h2 className="text-xl font-semibold mb-2">{d.modulationTitle}</h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.modulationDesc}
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-5 max-w-3xl">
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                {locale_key === "fi" ? "Varoitus" : "Warning"}
              </p>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {d.modulationWarning}
              </p>
            </div>
          </section>

          {/* Lindgren chi coupling */}
          <CollapsibleSection id="chi-coupling" title={d.chiTitle} subtitle={d.chiSub}>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.chiDesc}
            </p>
            <Eq>
              &chi;(&#256;) = &#256; / &radic;(1 + &#256;&sup2;)
            </Eq>
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.chiWherePrefix}{" "}
              <code className="font-mono-num text-foreground">&Amacr;</code>{" "}
              {d.chiExplain}
            </p>
          </CollapsibleSection>

          {/* χ at Five Scales */}
          <CollapsibleSection id="chi-five-scales" title={d.chiFiveTitle} subtitle={d.chiFiveSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.chiFiveDesc}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-foreground-muted">
                    <th className="py-2 pr-3 font-medium">{d.chiFiveColScale}</th>
                    <th className="py-2 pr-3 font-medium">{d.chiFiveColBg}</th>
                    <th className="py-2 pr-3 font-medium">{d.chiFiveColPerturb}</th>
                    <th className="py-2 pr-3 font-medium">{d.chiFiveColExpr}</th>
                    <th className="py-2 pr-3 font-medium">{d.chiFiveColVerify}</th>
                    <th className="py-2 font-medium">{d.chiFiveColLevel}</th>
                  </tr>
                </thead>
                <tbody>
                  {CHI_SCALES.map((s) => {
                    const color = CHAIN_EPISTEMIC_COLORS[s.level as EpistemicLevel] ?? "#6B7280";
                    return (
                      <tr key={s.id} className="border-b border-border/40">
                        <td className="py-2 pr-3 font-medium text-foreground">{locale_key === "fi" ? s.label_fi : s.label_en}</td>
                        <td className="py-2 pr-3 text-foreground-muted text-xs">{locale_key === "fi" ? s.background_fi : s.background_en}</td>
                        <td className="py-2 pr-3 text-foreground-muted text-xs">{locale_key === "fi" ? s.perturbation_fi : s.perturbation_en}</td>
                        <td className="py-2 pr-3 font-mono text-xs text-foreground">{s.chi_expression}</td>
                        <td className="py-2 pr-3 text-foreground-muted text-xs">{s.verification}</td>
                        <td className="py-2">
                          <span className="rounded-full px-1.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${color}20`, color }}>
                            {s.level}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm">
              <Link href={`${prefix}/evidence/evolution`} className="text-accent hover:underline">
                {d.chiFiveLink}
              </Link>
            </p>
          </CollapsibleSection>

          {/* χ across evidence families */}
          <CollapsibleSection id="chi-evidence-families" title={d.chiEvidenceTitle} subtitle={d.chiEvidenceSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.chiEvidenceDesc}
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {d.chiEvidenceFamilies.map((fam: { family: string; chi: string; mechanism: string; prediction: string; verification: string; level: string }, i: number) => {
                const color = fam.level === "E" ? "#22c55e" : fam.level.startsWith("L") ? "#ef4444" : "#f59e0b";
                return (
                  <div key={i} className="rounded-lg border border-border p-4" style={{ borderLeftWidth: 4, borderLeftColor: color }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-foreground">{fam.family}</h4>
                      <span className="rounded-full px-1.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${color}20`, color }}>{fam.level}</span>
                    </div>
                    <p className="text-xs font-mono text-accent mb-2">{fam.chi}</p>
                    <p className="text-xs text-foreground-muted mb-2">{fam.mechanism}</p>
                    <p className="text-xs text-foreground mb-1"><strong>{locale_key === "fi" ? "Ennuste" : "Prediction"}:</strong> {fam.prediction}</p>
                    <p className="text-xs text-foreground-muted italic">{fam.verification}</p>
                  </div>
                );
              })}
            </div>
          </CollapsibleSection>

          {/* Three-channel model */}
          <CollapsibleSection id="two-channel-model" title={d.twoChTitle} subtitle={d.twoChSub} defaultOpen>

            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.twoChDesc}
            </p>
            <Eq>
              cumEMF = w_ELF &middot; cumELF + w_IF &middot; cumIF + w_RF &middot; cumRF
            </Eq>
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed mb-4">
              {d.twoChExplain}
            </p>
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed mb-6">
              {d.lateralizationNote}
            </p>

            <h3 className="text-base font-semibold mb-2">{d.twoChLayersTitle}</h3>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.twoChLayersDesc}
            </p>
            <Eq>
              ambient = &Sigma;<sub>k=1..12</sub> layer<sub>k</sub>(country, year)
            </Eq>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
              {([
                ["#4a6741", locale_key === "fi" ? "Sotilastutka" : "Military radar", "1950s"],
                ["#2196F3", locale_key === "fi" ? "Säätutka" : "Weather radar", "1988+"],
                ["#FF5722", locale_key === "fi" ? "Matkapuhelinverkot" : "Mobile networks", "1991+"],
                ["#E91E63", "Wi-Fi", "1999+"],
                ["#8BC34A", locale_key === "fi" ? "Tuuliturbiinit" : "Wind turbines", "2000+"],
                ["#9C27B0", locale_key === "fi" ? "Näyttösiirtymä" : "Display transition", "2005+"],
                ["#00BCD4", locale_key === "fi" ? "Älymittarit" : "Smart meters", "2005+"],
                ["#FFC107", locale_key === "fi" ? "Sisä-LED" : "Indoor LED", "2009+"],
                ["#FFEB3B", locale_key === "fi" ? "Aurinkoinvertterit" : "Solar inverters", "2010+"],
                ["#FF9800", locale_key === "fi" ? "LED-katuvalaistus" : "Street LED", "2012+"],
                ["#795548", "IoT", "2014+"],
                ["#607D8B", "ADAS", "2015+"],
              ] as const).map(([color, name, year]) => (
                <div key={name} className="flex items-center gap-2 rounded-lg border border-card-border px-3 py-2">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs font-medium truncate">{name}</span>
                  <span className="text-[10px] font-mono-num text-foreground-muted ml-auto">{year}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-status-partial/30 bg-status-partial/5 p-5 max-w-3xl">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-status-partial mb-2">{d.ifChannelTitle}</h4>
              <p className="text-sm text-foreground-muted leading-relaxed">{d.ifChannelDesc}</p>
            </div>

            {/* TCBM detail */}
            <div className="mt-8 max-w-3xl">
              <h3 className="text-base font-semibold mb-2">{d.tcbmTitle}</h3>
              <p className="text-sm text-foreground-muted mb-4 leading-relaxed">{d.tcbmIntro}</p>
              <div className="space-y-3">
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-blue-500 mb-1">{d.tcbmElfTitle}</h4>
                  <p className="text-sm text-foreground-muted leading-relaxed">{d.tcbmElfDesc}</p>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-500 mb-1">{d.tcbmIfTitle}</h4>
                  <p className="text-sm text-foreground-muted leading-relaxed">{d.tcbmIfDesc}</p>
                </div>
                <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-1">{d.tcbmRfTitle}</h4>
                  <p className="text-sm text-foreground-muted leading-relaxed">{d.tcbmRfDesc}</p>
                </div>
              </div>
              <p className="text-sm text-foreground-muted mt-4 leading-relaxed">{d.tcbmIfMitotic}</p>
              <p className="text-xs text-foreground-muted mt-3 italic leading-relaxed border-l-2 border-amber-500/30 pl-3">{d.tcbmWeightNote}</p>
              <p className="text-sm text-foreground-muted mt-4 leading-relaxed">{d.tcbmCrossSectional}</p>
              <p className="text-xs text-foreground-muted mt-3 italic leading-relaxed">{d.tcbmWolframPlanned}</p>
            </div>
          </CollapsibleSection>

          {/* EMF Modulome */}
          <CollapsibleSection id="modulome" title={d.modulomeTitle} subtitle={d.modulomeSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.modulomeDesc}
            </p>
            <ModulomeLayers locale={locale} />
            <p className="mt-4 text-sm">
              <Link href={`${prefix}/evidence`} className="text-accent hover:underline">
                &rarr; {locale_key === "fi"
                  ? "Katso miten tämä ilmenee sairauksina"
                  : "See how this manifests as diseases"}
              </Link>
            </p>
          </CollapsibleSection>

          {/* Testosterone → TFR Threshold Model */}
          <section id="testosterone-threshold" className="mb-14">
            <h2 className="text-xl font-semibold mb-1">{d.thresholdTitle}</h2>
            <p className="text-xs text-foreground-muted italic mb-4">{d.thresholdSub}</p>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.thresholdLead}
            </p>

            <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mb-8">
              <article className="rounded-xl border-2 border-green-500/30 bg-green-500/5 p-5">
                <h3 className="font-semibold text-sm text-green-600 dark:text-green-400 mb-2">{d.thresholdPhase1Title}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.thresholdPhase1Desc}</p>
              </article>
              <article className="rounded-xl border-2 border-amber-500/30 bg-amber-500/5 p-5">
                <h3 className="font-semibold text-sm text-amber-600 dark:text-amber-400 mb-2">{d.thresholdPhase2Title}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.thresholdPhase2Desc}</p>
              </article>
              <article className="rounded-xl border-2 border-red-500/30 bg-red-500/5 p-5">
                <h3 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-2">{d.thresholdPhase3Title}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.thresholdPhase3Desc}</p>
              </article>
            </div>

            <div className="rounded-xl border border-card-border bg-card-bg p-5 max-w-4xl mb-8">
              <h3 className="font-semibold text-sm mb-3">{d.thresholdMathTitle}</h3>
              <div className="space-y-2 font-mono-num text-sm text-accent mb-3">
                <p>{d.thresholdMathT}</p>
                <p>{d.thresholdMathTFR}</p>
              </div>
              <p className="text-xs text-foreground-muted leading-relaxed">{d.thresholdMathExplain}</p>
            </div>

            <div className="overflow-x-auto mb-8 max-w-4xl">
              <h3 className="font-semibold text-sm mb-3">{d.thresholdTableTitle}</h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-card-border text-foreground-muted">
                    <th className="text-left py-2 pr-3 font-medium">{d.thresholdTableCountry}</th>
                    <th className="text-right py-2 px-3 font-medium">{d.thresholdTableRate}</th>
                    <th className="text-left py-2 px-3 font-medium">{d.thresholdTableSource}</th>
                    <th className="text-right py-2 px-3 font-medium">{d.thresholdTableCumul}</th>
                    <th className="text-right py-2 px-3 font-medium">{d.thresholdTableThreshold}</th>
                    <th className="text-center py-2 pl-3 font-medium">{d.thresholdTablePhase}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { country: "USA", rate: "1.0", source: "Travison 2007", cumul: "−35.7 %", thresh: "~2030", phase: 1 },
                    { country: locale_key === "fi" ? "Tanska" : "Denmark", rate: "0.85", source: "Andersson 2007", cumul: "−31.3 %", thresh: "~2035", phase: 1 },
                    { country: locale_key === "fi" ? "Suomi" : "Finland", rate: "1.2", source: "Perheentupa 2013", cumul: "−41.2 %", thresh: "~2018 ✓", phase: 2 },
                    { country: "Israel", rate: "1.0", source: "Chodick 2020", cumul: "−35.7 %", thresh: "~2035", phase: 1 },
                    { country: locale_key === "fi" ? "Etelä-Korea" : "South Korea", rate: "1.5*", source: locale_key === "fi" ? "Arvio" : "Estimated", cumul: "−48.6 %", thresh: "~2015 ✓", phase: 3 },
                    { country: locale_key === "fi" ? "Japani" : "Japan", rate: "1.2*", source: locale_key === "fi" ? "Arvio" : "Estimated", cumul: "−41.2 %", thresh: "~2018 ✓", phase: 2 },
                  ].map((r) => {
                    const phaseColor = r.phase === 1 ? "#22c55e" : r.phase === 2 ? "#f59e0b" : "#ef4444";
                    return (
                      <tr key={r.country} className="border-b border-card-border/50">
                        <td className="py-2 pr-3 font-medium text-foreground">{r.country}</td>
                        <td className="py-2 px-3 text-right font-mono-num">{r.rate}</td>
                        <td className="py-2 px-3 text-foreground-muted">{r.source}</td>
                        <td className="py-2 px-3 text-right font-mono-num text-accent">{r.cumul}</td>
                        <td className="py-2 px-3 text-right font-mono-num">{r.thresh}</td>
                        <td className="py-2 pl-3 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold" style={{ backgroundColor: `${phaseColor}20`, color: phaseColor }}>{r.phase}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5 max-w-4xl mb-8">
              <h3 className="font-semibold text-sm text-blue-600 dark:text-blue-400 mb-2">{d.thresholdFinlandTitle}</h3>
              <p className="text-xs text-foreground-muted leading-relaxed">{d.thresholdFinlandText}</p>
            </div>

            <div className="max-w-4xl mb-6">
              <h3 className="font-semibold text-sm mb-3">{d.thresholdChartTitle}</h3>
              <ThresholdChart locale={locale_key} />
            </div>

            <p className="text-xs text-foreground-muted max-w-3xl leading-relaxed italic border-l-2 border-amber-500/30 pl-3">
              {d.thresholdCaveat}
            </p>

            {/* Why pronatalism fails */}
            <div className="mt-10 max-w-3xl">
              <h3 className="text-base font-semibold mb-3">{d.whyPronatTitle}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                {d.whyPronatText}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                  <p className="text-xs font-semibold text-blue-400 mb-1">{locale_key === "fi" ? "Ennuste" : "Prediction"}</p>
                  <p className="text-xs text-foreground-muted leading-relaxed">{d.whyPronatPrediction}</p>
                </div>
                <div className="flex-1 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                  <p className="text-xs font-semibold text-red-400 mb-1">{locale_key === "fi" ? "Falsifiointi" : "Falsification"}</p>
                  <p className="text-xs text-foreground-muted leading-relaxed">{d.whyPronatFalsification}</p>
                </div>
              </div>
            </div>

            {/* Biological floor */}
            <div className="mt-10 max-w-3xl">
              <h3 className="text-base font-semibold mb-3">{d.bioFloorTitle}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                {d.bioFloorText}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {d.bioFloorTimeline.map((row: { year: string; value: string; note: string }) => (
                  <div
                    key={row.year}
                    className="rounded-lg border border-card-border bg-card-bg p-3 text-center"
                  >
                    <p className="text-xs text-foreground-muted">{row.year}</p>
                    <p className="text-lg font-bold font-mono-num">{row.value}</p>
                    {row.note && (
                      <p className="text-[10px] text-foreground-muted/70 mt-1">{row.note}</p>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground-muted leading-relaxed italic border-l-2 border-red-500/30 pl-3">
                {d.bioFloorConsequence}
              </p>
            </div>

            {/* Six-factor summary */}
            <div className="mt-10 max-w-4xl">
              <h3 className="text-base font-semibold mb-2">{d.sixFactorTitle}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-2 max-w-3xl">
                {d.sixFactorLead}
              </p>
              <SixFactorSummary locale={locale_key} />
            </div>
          </section>

          {/* Extended Disease Cascades 9-18 */}
          <section id="disease-cascades" className="mb-14">
            <h2 className="text-xl font-semibold mb-2">{d.diseaseCascadesTitle}</h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.diseaseCascadesLead}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {d.diseaseCascades.map((c: { num: number; title: string; mechanism: string; level: string; trend: string }) => {
                const color = CHAIN_EPISTEMIC_COLORS[c.level as EpistemicLevel] ?? "#6B7280";
                return (
                  <article
                    key={c.num}
                    className="rounded-xl border border-card-border bg-card-bg p-5"
                    style={{ borderTopWidth: 3, borderTopColor: color }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
                          style={{ backgroundColor: `${color}20`, color }}
                        >
                          {c.num}
                        </span>
                        <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
                      </div>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-xs font-semibold shrink-0"
                        style={{ backgroundColor: `${color}20`, color }}
                      >
                        {c.level}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-muted leading-relaxed mb-3">
                      {c.mechanism}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
                      <span className="font-mono-num text-foreground" style={{ color }}>
                        &uarr;
                      </span>
                      <span className="font-mono-num">{c.trend}</span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* VGCC Gene Family Diagram */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-1">{d.vgccDiagramTitle}</h3>
              <p className="text-xs text-foreground-muted mb-4">{d.vgccDiagramSubtitle}</p>
              <VGCCGeneFamilyDiagram locale={locale} />

              {/* EMF sensitivity hierarchy bar chart */}
              <div className="mt-8 p-4 rounded-lg border border-border bg-card">
                <h4 className="text-sm font-semibold mb-1">{d.emfBarTitle}</h4>
                <p className="text-xs text-foreground-muted mb-4">{d.emfBarSubtitle}</p>
                <div className="space-y-2">
                  {[
                    { label: "Cav3.2", gene: "CACNA1H", pct: 100, color: "#F59E0B", note: "T-type, −46 mV" },
                    { label: "Cav3.3", gene: "CACNA1I", pct: 88, color: "#EC4899", note: "T-type, −44 mV" },
                    { label: "Cav3.1", gene: "CACNA1G", pct: 78, color: "#10B981", note: "T-type, −42 mV" },
                    { label: "Cav1.3", gene: "CACNA1D", pct: 35, color: "#8B5CF6", note: "L-type, −50 mV" },
                    { label: "Cav1.2", gene: "CACNA1C", pct: 8, color: "#EF4444", note: "L-type, −30 mV" },
                    { label: "Cav2.1", gene: "CACNA1A", pct: 3, color: "#3B82F6", note: "P/Q-type, −20 mV" },
                  ].map((ch) => (
                    <div key={ch.label} className="flex items-center gap-2 text-xs">
                      <span className="w-12 font-mono font-semibold shrink-0" style={{ color: ch.color }}>{ch.label}</span>
                      <div className="flex-1 h-5 bg-card-border/30 rounded overflow-hidden">
                        <div
                          className="h-full rounded"
                          style={{ width: `${ch.pct}%`, backgroundColor: ch.color, opacity: 0.7 }}
                        />
                      </div>
                      <span className="w-28 text-foreground-muted shrink-0 text-right">{ch.note}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-foreground-muted mt-3 italic">
                  {locale === "fi"
                    ? "T-tyypin (Cav3) kanavat >> Cav1.3 (matalan kynnyksen L-tyyppi) >> Cav1.2 (vain aktiopotentiaalin aikana). CaMKII-takaisinkytkentä siirtää Cav3.2-kynnystä negatiivisemmaksi ajan myötä."
                    : "T-type (Cav3) channels >> Cav1.3 (low-threshold L-type) >> Cav1.2 (action-potential only). CaMKII feedback shifts Cav3.2 threshold more negative over time."}
                </p>
              </div>
            </div>
          </section>

          {/* Five-layer recovery model */}
          <CollapsibleSection id="recovery" title={d.recovTitle} subtitle={d.recovSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.recovDesc}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-foreground-muted">
                    <th className="py-2 pr-4 font-medium">{d.recovColLayer}</th>
                    <th className="py-2 pr-4 font-medium">{d.recovColAlpha}</th>
                    <th className="py-2 pr-4 font-medium">
                      {d.recovColTimescale}
                    </th>
                    <th className="py-2 font-medium">{d.recovColNotes}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-card-border">
                    <td className="py-3 pr-4 font-medium">{d.recovVgicLayer}</td>
                    <td className="py-3 pr-4 font-mono-num">1.0</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovVgicTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovVgicNote}
                    </td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="py-3 pr-4 font-medium">{d.recovRosLayer}</td>
                    <td className="py-3 pr-4 font-mono-num">0.8</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovRosTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovRosNote}
                    </td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="py-3 pr-4 font-medium">{d.recovDnaLayer}</td>
                    <td className="py-3 pr-4 font-mono-num">0.1</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovDnaTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovDnaNote}
                    </td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="py-3 pr-4 font-medium">
                      {d.recovLeydigLayer}
                    </td>
                    <td className="py-3 pr-4 font-mono-num">0.3</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovLeydigTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovLeydigNote}
                    </td>
                  </tr>
                  <tr className="border-b border-card-border last:border-0">
                    <td className="py-3 pr-4 font-medium">{d.recovBbbLayer}</td>
                    <td className="py-3 pr-4 font-mono-num">0.0</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovBbbTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovBbbNote}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.recoveryWindowNote}
            </p>
          </CollapsibleSection>

          {/* Compensation mechanism */}
          <span id="asfr" />
          <CollapsibleSection id="compensation" title={d.compTitle} subtitle={d.compSub}>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.compDesc}
            </p>
            <Eq>
              TFR<sub>eff</sub> = (bioCap &times; behav)<sup>(1&minus;&alpha;)</sup>{" "}
              &times; rate<sub>2024</sub> &times; cultRatio &times;{" "}
              bioBehav<sub>2024</sub><sup>&alpha;</sup>
            </Eq>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.compWhereLabel}
            </p>
            <ul className="text-sm text-foreground-muted space-y-2 max-w-3xl ml-4 mb-4">
              <li>
                <strong className="text-foreground">bioCap</strong> --{" "}
                {d.compBioCap}
              </li>
              <li>
                <strong className="text-foreground">behav</strong> --{" "}
                {d.compBehav}
              </li>
              <li>
                <strong className="text-foreground">&alpha; = 0.43</strong> --{" "}
                {d.compAlpha}
              </li>
              <li>
                <strong className="text-foreground">
                  rate<sub>2024</sub>
                </strong>{" "}
                -- {d.compRate2024}
              </li>
              <li>
                <strong className="text-foreground">cultRatio</strong> --{" "}
                {d.compCultRatio}
              </li>
              <li>
                <strong className="text-foreground">
                  bioBehav<sub>2024</sub>
                </strong>{" "}
                -- {d.compBioBehav2024}
              </li>
            </ul>
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.compExplain}
            </p>
          </CollapsibleSection>

          {/* mTOR convergence */}
          <CollapsibleSection id="mtor" title={d.mtorTitle} subtitle={d.mtorSub}>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.mtorDesc1}
            </p>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.mtorDesc2}
            </p>
            <Eq>
              mTOR<sub>eff</sub> = (1.0 + 0.25 &times; EMF) &times; &prod;(1 &minus;
              reduction<sub>i</sub>)
            </Eq>
            <Eq>
              aging rate = mTOR<sub>eff</sub><sup>0.7</sup>
            </Eq>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.mtorEqExplain}
            </p>

            <h3 className="text-base font-semibold mb-3">{d.mtorThreeTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.mtorAging}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.mtorAgingDesc}
                </p>
              </SectionCard>
              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.mtorFertility}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.mtorFertilityDesc}
                </p>
              </SectionCard>
              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.mtorCancer}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.mtorCancerDesc}
                </p>
              </SectionCard>
            </div>

            <h3 className="text-base font-semibold mb-3">{d.mtorPredTitle}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-foreground-muted">
                    <th className="py-2 pr-4 font-medium">{d.mtorPredColId}</th>
                    <th className="py-2 pr-4 font-medium">{d.mtorPredColPred}</th>
                    <th className="py-2 font-medium">{d.mtorPredColTest}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.mtorPreds.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`border-b border-card-border${
                        i === d.mtorPreds.length - 1 ? " last:border-0" : ""
                      }`}
                    >
                      <td className="py-3 pr-4 font-mono-num">{row.id}</td>
                      <td className="py-3 pr-4 text-foreground-muted">
                        {row.pred}
                      </td>
                      <td className="py-3 text-foreground-muted">{row.test}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CollapsibleSection>

          {/* Mathematical Foundation */}
          <CollapsibleSection id="mathematics" title={d.mathTitle} subtitle={d.mathSub}>
            <p className="text-sm text-foreground-muted mb-10 max-w-3xl leading-relaxed">
              {d.mathSubtitle}
            </p>
            <MathematicsSections locale={locale} />
          </CollapsibleSection>

          {/* Links */}
          <section className="border-t border-border pt-8 mt-8 flex flex-wrap gap-4">
            <Link
              href={`${prefix}/evidence`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
            >
              {d.btnEvidence}
            </Link>
            <Link
              href={`${prefix}/predictions`}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-sm font-medium rounded-lg transition-colors"
            >
              {d.btnPredictions}
            </Link>
          </section>

          {/* Epistemic note */}
          <section className="mt-8 space-y-2">
            <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
              {d.epistemic}
            </p>
            <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
              {d.lbermRef}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
