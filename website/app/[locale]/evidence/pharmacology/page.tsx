import { SteroidogenesisIntegrationPanel } from "@/components/SteroidogenesisIntegrationPanel";
import type { Metadata } from "next";
import Link from "next/link";
import { Pill } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EvidenceSynthesisBanner } from "@/components/EvidenceSynthesisBanner";
import { InterventionExplorer } from "@/components/InterventionExplorer";
import { DrugDiseaseCrossMap } from "@/components/DrugDiseaseCrossMap";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Pharmacological Evidence",
    subtitle: "Pharmacological interventions separate channel subtype, local calcium, stores, feedback and repair. Each field-specific claim retains its own cell system, waveform and sham comparison.",
    backLink: "← Back to Evidence",
    cardsTitle: "Drug evidence cards",
    cardsLead: "Read each card as a mechanism contrast: exposure and sham, intervention and control, first response and final function. E marks repeated findings in the stated system; M marks mechanism; C association; L a theoretical premise; L* a testable candidate. None of these labels establishes the full route.",
    cards: [
      {
        id: "CCB",
        drug: "Calcium channel blockers (CCBs)",
        drugSub: "Nifedipine, amlodipine, verapamil, diltiazem",
        mechanism: "L-type channel blockade can test whether those channels mediate a defined field response. The same intervention also changes normal calcium-dependent physiology, so each blocker condition needs its own sham control.",
        evidence: [
          "[[ref:pall2013_v2|Pall 2013]] reviewed 23 studies reporting prevention or attenuation of field-associated effects with calcium-channel blockers. This supports testing channel dependence within the reported protocols; subtype, blocker selectivity and proximal measurements remain necessary to distinguish mediation from the first field sensor.",
          "Clinical calcium-channel blockers establish that these channels are important physiological targets. Clinical use and publication counts do not identify the first field sensor, establish every channel subtype as field-sensitive or transfer a cellular protocol to ambient human exposure.",
          "Amlodipine has a long elimination half-life. A conditional comparison with other antihypertensives would need measured exposure, matched indications, dose and tissue target engagement; a prescription alone does not establish continuous blockade of every relevant channel or protection from EMF.",
          "Nifedipine inhibits uterine contractions and is used to manage hypertension in pregnancy ([[ref:nifed_tocolytic|Cochrane 2014]]). These interventions establish relevant calcium-dependent physiology. They do not establish a common EMF origin or identify the complete pathogenesis of both conditions.",
        ],
        interpretation: "Pair field/sham with blocker/control and measure proximal current, calcium-store dynamics and tissue function. A changed interaction identifies channel dependence in that setting. Clinical blood-pressure or uterine effects anchor physiological relevance; [[ref:bertagna2025|Bertagna 2025]] provides a field-specific ER/calcium intervention. Neither alone identifies the first field sensor.",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Verapamil (phenylalkylamine CCB)",
        drugSub: "Non-dihydropyridine, frequency-dependent blockade",
        mechanism: "Verapamil has use-dependent channel blockade: inhibition can increase with repeated channel opening. A conditional comparison with another blocker must measure opening patterns, concentration and subtype. Applied field frequency does not by itself establish an equally rapid channel-opening rate or make verapamil the most effective field intervention.",
        evidence: [
          "Use-dependent blockade is established in cardiac pharmacology. Its relevance to a defined field experiment depends on actual channel state and opening kinetics, which need measurement rather than identification with the applied waveform.",
          "Lundberg 1996 (Bioelectromagnetics): verapamil blocked EMF-induced calcium efflux in bone cells — direct evidence that the EMF-calcium pathway is pharmacologically blockable in reproductive-adjacent tissue.",
          "Verapamil is also used in reproductive medicine for sperm preparation protocols, where it can improve motility by modulating calcium dynamics — mechanistic overlap with BERM's predicted EMF pathway.",
          "[[ref:verap_t1d_jama|Forlenza JAMA 2023]]: verapamil preserved β-cell function in children with new-onset T1D in a randomized trial (N=88). This anchors modifiable β-cell function; the trial did not manipulate EMF exposure and therefore does not establish its contribution to T1D.",
          "[[ref:verap_t1d_natmed|Ovalle Nat Med 2018]]: verapamil increases C-peptide at 3 and 12 months in adults with recent-onset T1D via TXNIP reduction and β-cell protection.",
        ],
        interpretation: "Use-dependent blockade motivates a comparison at measured channel-opening patterns. The T1D trials support a β-cell protection branch; an EMF-specific test must additionally compare field and sham under verapamil and control. Measure secretion, repair and viability separately so protection is not confused with suppression of normal secretion.",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Lithium",
        drugSub: "Mood stabilizer, GSK-3β inhibitor, neuroprotective",
        mechanism: "Lithium affects GSK-3β and several clock-regulatory processes. A conditional BERM test separates CRY abundance, ligand occupancy, clock period, amplitude and melatonin timing. More CRY does not by itself mean a stronger clock or greater functional field response: [[ref:hirota2012_kl001|Hirota 2012]] found that the distinct CRY-stabilizing compound KL001 lengthened period while reducing reporter amplitude. This is a mechanistic comparison, not evidence that lithium and KL001 have identical effects.",
        evidence: [
          "Circadian period changes reported with lithium motivate timed measurements (McCarthy 2019, Translational Psychiatry). The result cannot be assigned universally to one GSK-3β→CRY degradation step; dose, tissue and the measured clock output matter.",
          "Reported melatonin changes in lithium-treated bipolar patients (Hallam 2005, J. Psychopharmacology) concern a clinical treatment context. They do not establish reversal of a field-induced change; a field×lithium experiment must measure phase, amplitude and baseline separately.",
          "Lithium-related GSK-3β/tau, BDNF and inflammatory pathways provide several candidate downstream endpoints. Their overlap with calcium-dependent biology does not place all effects in one EMF causal chain or identify which route mediates a given treatment outcome.",
          "Drinking-water lithium associations with suicide (Kapusta 2011) and dementia (Kessing 2017) motivate observational follow-up. Regional exposure, therapeutic dose and intracellular target engagement are different quantities. These associations neither measure CRY stabilization at trace concentrations nor establish population protection from EMF.",
        ],
        interpretation: "Clock regulation and observational lithium associations motivate a receptor-state hypothesis. Neither trace-water associations nor therapeutic mood effects demonstrate protection from EMF. Measure CRY abundance, ligand occupancy, clock period and the field×drug contrast separately; stabilizing a protein need not increase its field sensitivity.",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Semaglutide / GLP-1 receptor agonists",
        drugSub: "Ozempic, Wegovy, Mounjaro (tirzepatide)",
        mechanism: "[[ref:bhatt2012_glp1|Selway 2012]] found that GLP-1-induced ERK signalling in mouse MIN6 cells required L-type channels. Bay K8644 activated ERK without a detectable whole-cell Ca²⁺ rise; rapid BAPTA blocked this local signalling whereas slower EGTA did not. EGTA partly reduced the early GLP-1 response but spared the sustained response. This supports a channel microdomain, not a channel bypass. The study did not expose cells to an electromagnetic field.",
        evidence: [
          "Clinical metabolic benefits of GLP-1 receptor agonists establish useful physiological interventions. Their breadth does not identify EMF as the cause of the treated conditions or show which part of a field-response pathway is affected.",
          "[[ref:klimentidis2010|The Klimentidis paradox (2011, Proc. R. Soc. B)]]: 24 populations of 8 species have all gained weight since the 1970s (p = 1.2×10⁻⁷). Diet/exercise cannot explain weight gain in laboratory animals on controlled diets. An environmental factor affecting calcium-dependent metabolic pathways is consistent with BERM.",
          "GLP-1 is expressed in the brain (NTS, hypothalamus) where it modulates appetite, reward, and nausea through calcium-dependent signaling. Semaglutide's central effects could partially compensate for EMF-disrupted hypothalamic calcium dynamics.",
        ],
        interpretation: "Conditional BERM prediction: a defined field may change L-channel microdomain signalling and ERK while a whole-cell Ca²⁺ assay remains negative. Compare rapid and slow buffering, channel inhibition and sham at matched times. Whether semaglutide compensates for such a change, and in which direction, requires a separate drug–field experiment; clinical efficacy does not identify an environmental cause.",
        level: "L*",
      },
      {
        id: "GABAPENTINOID",
        drug: "Gabapentinoids",
        drugSub: "Gabapentin, pregabalin (Lyrica)",
        mechanism: "Gabapentinoids bind the α2δ subunit of voltage-gated calcium channels, reducing Ca²⁺ influx at presynaptic terminals. This is NOT the same subunit as the α1 pore-forming unit targeted by CCBs — gabapentinoids modulate channel trafficking and surface expression rather than directly blocking the pore.",
        evidence: [
          "Gabapentin and pregabalin are prescribed for neuropathic pain, epilepsy, and anxiety — conditions that involve neuronal calcium hyperexcitability. If EMF contributes to neuronal calcium dysregulation (BERM pathway A), gabapentinoid users may inadvertently be partially protected.",
          "Pregabalin carries a known side effect of reduced libido and sexual dysfunction (Calabrò 2015), which could appear to contradict BERM — but this is consistent: gabapentinoids suppress ALL calcium-dependent signaling including normal reproductive hormone pathways, not just EMF-induced excess.",
          "The α2δ subunit is heavily expressed in dorsal root ganglia and spinal cord — explaining gabapentinoids' efficacy in neuropathic pain. It is also expressed in the hypothalamus, where it could modulate GnRH pulsatility (BERM Level 7).",
        ],
        interpretation: "Gabapentinoids provide a pharmacological dissection of BERM's calcium model: they modulate a different calcium channel subunit than CCBs, predicting partially overlapping but distinguishable effects. The α2δ modulation is more relevant to neural endpoints (pain, sleep, anxiety) while α1 blockade (CCBs) is more relevant to peripheral/reproductive endpoints.",
        level: "M",
      },
      {
        id: "NIMODIPINE-ETH",
        drug: "Nimodipine (L-type CCB, CNS-selective)",
        drugSub: "Dihydropyridine with BBB penetration",
        mechanism: "Nimodipine crosses the blood-brain barrier — unlike most other dihydropyridine CCBs — and preferentially blocks L-type VGCCs in cerebral vasculature and neurons. If EMF-induced VGCC activation contributes to neurodegeneration and cognitive decline, a CNS-selective CCB should provide neuroprotection.",
        evidence: [
          "Nimodipine is FDA-approved for cerebral vasospasm prevention after subarachnoid hemorrhage. Its neuroprotective mechanism (calcium-mediated) overlaps with BERM's predicted CNS effects of chronic VGCC activation.",
          "Ongoing clinical interest in nimodipine for Alzheimer's disease and vascular dementia suggests that calcium channel dysregulation contributes to neurodegeneration — consistent with BERM's BBB/neurodegeneration cascade (evidence page: /evidence/bbb).",
          "Nimodipine's BBB penetration makes it the only CCB that could theoretically attenuate EMF effects on both peripheral (reproductive) and central (cognitive, circadian) endpoints simultaneously.",
        ],
        interpretation: "A comparison of brain-accessible and other L-channel interventions can test tissue exposure and target engagement. Differences in cognitive outcomes alone do not isolate BBB penetration, because channel activity, pharmacokinetics and baseline state also differ. A defined field/sham comparison is required.",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "Exogenous melatonin",
        drugSub: "Circadian signal with tissue-dependent receptor effects",
        mechanism: "Melatonin has receptor-mediated, circadian and redox effects whose calcium direction depends on tissue and timing. In rat cerebellar granule cells, [[ref:liu2014_mt2|Liu 2014]] found less field-associated sodium-current enhancement but greater depolarization-evoked Ca²⁺ release, without higher resting Ca²⁺. MT2 and intracellular stores contributed to this feedback.",
        evidence: [
  "[[ref:tbahriti2026|Tbahriti et al. 2026]] (Sleep Biol Rhythms, PRISMA systematic review of 55 studies): 88% of high-quality animal studies report EMF-induced melatonin suppression of 20–50% from baseline. Exogenous melatonin would replace this deficit.",
  "Melatonin is a potent antioxidant that scavenges ROS — directly counteracting the oxidative stress cascade (BERM Level 5A) independently of its hormonal function. This dual action (antioxidant + hormonal replacement) makes it effective against both pathway A downstream (ROS) and pathway B downstream (melatonin deficit).",
  "Reiter et al. 2007, 2014: multiple reviews demonstrating melatonin's protective effects against RF-induced oxidative damage in animal models. Dose-dependent protection consistent with BERM's recovery window model.",
  "[[ref:liu2014_mt2|Liu 2014]]: 50 Hz, 1 mT, 60 min; MT2 agonist/antagonist and store-release interventions distinguish resting calcium, evoked calcium and sodium current.",
  "[[ref:cajochen2005_melatonin|Cajochen 2005]]: matched-photon 460 and 550 nm evening light produced different human melatonin responses. This is a retinal light–circadian result; it did not test an EMF–MT2 interaction or establish a local CRY sensor."
],
        interpretation: "A stronger evoked calcium feedback can therefore accompany a smaller sodium-current response. BERM predicts a light–field interaction only if physiological melatonin engages this same MT2 brake in the named tissue. The micromolar cell-culture dose and human evening-light response require an explicit dose and tissue bridge; this is not a universal Ca²⁺-lowering mechanism.",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "Coenzyme Q10 (CoQ10 / ubiquinone)",
        drugSub: "Mitochondrial electron carrier, endogenous antioxidant",
        mechanism: "BERM keeps receptor readiness s, repair capacity A and damage D separate. In the current model, each declared time step gives D_next = max(0, D + g_D·u·s − r_D·A·D): production adds load and repair removes it. With no new input, repair cannot increase D. CoQ10 is a candidate modifier of redox processing; this study does not estimate g_D, r_D or a repair time constant.",
        evidence: [
          "[[ref:bektas2026|Bektas 2026]] studied 28 rats in four groups with a GSM-modulated 3.5 GHz signal, 2 h/day for 30 days. CoQ10 attenuated some hormonal, testicular and redox changes. This was not a 5G NR waveform. Early calcium responses and repair time constants were not measured, so the result does not isolate a downstream repair site or demonstrate complete reversal of established damage.",
          "CoQ10 supplementation improves sperm parameters in subfertile men (Safarinejad 2012, meta-analysis: improved motility and concentration). If part of modern sperm decline is EMF-mediated oxidative damage, CoQ10's benefit is mechanistically consistent.",
          "CoQ10 levels decline with age — tracking the same timeline as testosterone decline and rising oxidative stress. Age-related CoQ10 depletion would amplify EMF-induced oxidative damage by reducing repair capacity.",
        ],
        interpretation: "Compare field/sham with CoQ10/vehicle and measure the early current, mitochondrial/redox response and later tissue function. The observed protection constrains the total response. Upstream modulation, reduced load production and improved clearance remain alternatives until those intermediate measurements separate them.",
        level: "E",
      },
      {
        id: "PSILOCYBIN",
        drug: "Psilocybin (5-HT2A agonist)",
        drugSub: "Tryptamine psychedelic, cluster headache breakthrough",
        mechanism: "Psilocybin activates 5-HT2A receptors, which signal via Gq → PLC → IP3 → intracellular Ca²⁺ release. This controlled Ca²⁺ burst triggers downstream BDNF and neural plasticity cascades. Crucially, psilocybin resets the tryptamine signaling system that BERM pathway A/C chronically disrupts — 5-HT2A agonism opposes the serotonin lock-open feedback loop (S2).",
        evidence: [
          "Psilocybin provides dramatic relief in cluster headache — the most severe pain condition known — at doses that produce a single controlled 5-HT2A→Ca²⁺ burst (Schindler 2015, 2021). This is the BERM-predicted Ca²⁺ hormesis pattern: a single large controlled pulse resets a system that chronic low-grade disruption has driven pathological.",
          "Psilocybin increases BDNF expression (Catlow 2013, Exp Brain Res). BDNF is suppressed by chronic EMF exposure via CaMKII pathway disruption. Psilocybin's BDNF boost directly counteracts one of BERM's predicted downstream deficits.",
          "FDA breakthrough therapy designation for treatment-resistant depression (2018, 2019). Depression is downstream of multiple BERM cascades (melatonin↓, BDNF↓, serotonin↓, cortisol↑). Psilocybin's multi-target reset is consistent with correcting an upstream disruption rather than a single neurotransmitter deficit.",
        ],
        interpretation: "5-HT2A signalling and plasticity responses identify a pharmacological route to neural change. Their clinical or experimental effects do not establish chronic EMF as the preceding insult or demonstrate a calcium reset. A field×intervention experiment would have to locate that proposed interaction.",
        level: "E|C",
      },
      {
        id: "CAFFEINE",
        drug: "Caffeine (adenosine A₁ antagonist)",
        drugSub: "World's most consumed psychoactive substance",
        mechanism: "Caffeine blocks adenosine A₁ receptors, which normally inhibit VGCC-mediated Ca²⁺ release. Paradoxically, caffeine also directly modulates ryanodine receptors (RyR), sensitizing intracellular Ca²⁺ stores. The net effect is biphasic: moderate doses increase alertness by modifying Ca²⁺ dynamics; high doses can potentiate Ca²⁺ overload. Caffeine is thus a natural Ca²⁺ modulator — the fifth in BERM's endogenous/dietary modulatory panel (alongside vitamin D, melatonin, magnesium, and lithium).",
        evidence: [
          "Caffeine's neuroprotective effects against Parkinson's and Alzheimer's disease (meta-analyses: OR 0.7–0.8) are consistent with Ca²⁺ modulation at moderate doses opposing chronic Ca²⁺ overload from environmental sources.",
          "The dose-response curve is non-linear (hormesis): 2–4 cups/day protective, higher doses neutral or harmful. BERM treats this as an imported L3 biological-response hypothesis R_caffeine, not as the geometric χ_geo function or evidence for its open L0→L2 mapping.",
          "Caffeine crosses the BBB freely and has a 3–5 hour half-life, providing intermittent rather than continuous Ca²⁺ modulation — contrasting with EMF's continuous 24/7 VGCC activation.",
        ],
        interpretation: "Adenosine and intracellular-store effects motivate dose- and timing-specific response profiles. Coffee-use associations do not establish unconscious treatment of EMF injury. Compare measured channel/store state and a field×caffeine contrast before predicting protection or its direction.",
        level: "E|M",
      },
      {
        id: "RILUZOLE",
        drug: "Riluzole (glutamate release inhibitor)",
        drugSub: "Only FDA-approved ALS treatment pre-2017",
        mechanism: "Riluzole inhibits voltage-gated Na⁺ channels and Ca²⁺-dependent glutamate release from presynaptic terminals. By reducing glutamate excitotoxicity, it protects motor neurons from Ca²⁺-mediated death. This directly opposes BERM's ALS mechanism (VK45): EMF → VGCC → Ca²⁺↑ → glutamate release↑ → excitotoxicity → motor neuron death.",
        evidence: [
          "Riluzole extends ALS survival by 2–3 months (Bensimon 1994, NEJM). Its mechanism — blocking Ca²⁺-dependent glutamate release — targets the exact pathway BERM predicts EMF activates in motor neurons.",
          "Motor neurons are selectively vulnerable due to low Ca²⁺-buffering capacity (Vanselow & Bhatt 1999). This explains why ALS targets motor neurons specifically despite EMF exposure being systemic — the Ca²⁺ buffering hypothesis (VK45).",
          "Riluzole’s sodium/glutamate effects and clinical ALS benefit anchor a modifiable excitotoxicity pathway. They do not establish EMF as its initiating cause. A field-specific bridge requires measured exposure and drug–field contrasts in motor-neuron systems, retaining the occupational association as separate evidence.",
        ],
        interpretation: "Riluzole’s sodium/glutamate effects and clinical ALS benefit anchor a modifiable excitotoxicity pathway. They do not establish EMF as its initiating cause. A field-specific bridge requires measured exposure and drug–field contrasts in motor-neuron systems, retaining the occupational association as separate evidence.",
        level: "E|C",
      },
      {
        id: "ISRADIPINE",
        drug: "Isradipine (Cav1.3-selective CCB)",
        drugSub: "Dihydropyridine with Cav1.3 preference, PD neuroprotection candidate",
        mechanism: "Isradipine preferentially blocks Cav1.3 (L-type) channels — the specific subtype expressed in substantia nigra dopaminergic neurons. These neurons uniquely rely on Cav1.3 for autonomous pacemaking, making them selectively vulnerable to Ca²⁺ overload. If EMF chronically activates Cav1.3, isradipine should provide targeted neuroprotection.",
        evidence: [
          "Epidemiological data: dihydropyridine CCB users show 20–30% reduced Parkinson's risk (Becker 2008, Ritz 2010). The association is specific to brain-penetrant CCBs, not peripheral-only formulations.",
          "Chan et al. 2007 (Nature): substantia nigra dopaminergic neurons use Cav1.3 for pacemaking — unique reliance on L-type Ca²⁺ channels explains their selective vulnerability in PD.",
          "STEADY-PD III trial (2020, Lancet Neurology): isradipine did not slow clinical progression in early PD — but target engagement may have been insufficient at tolerated doses. The biological rationale remains sound.",
          "Bhatt et al. 2022 (Sci.Adv.): Cav1.3 blockade protects dopaminergic neurons in preclinical models via reduced mitochondrial oxidative stress — the same Ca²⁺→mito→ROS pathway in BERM Level 5A.",
        ],
        interpretation: "The negative STEADY-PD III result remains a negative clinical efficacy test. L-type channel physiology motivates examining channel subtype, target engagement and tissue exposure, but observational associations and a plausible mechanism do not turn that null trial into validation of BERM or establish an EMF cause.",
        level: "E|M",
      },
      {
        id: "BUMETANIDE",
        drug: "Bumetanide (NKCC1 blocker)",
        drugSub: "Loop diuretic repurposed for neonatal seizures and ASD",
        mechanism: "Bumetanide blocks the NKCC1 chloride importer (SLC12A2), which maintains high intracellular Cl⁻ in immature neurons. In the neonatal brain, NKCC1 dominance makes GABA excitatory instead of inhibitory — bumetanide reverses this by lowering intracellular Cl⁻, restoring GABA's inhibitory function. This converts the Q-factor damping coefficient γ from negative (amplifying) to positive (damping).",
        evidence: [
          "Lemonnier & Ben-Ari 2010: bumetanide improved autistic behavior in children — first evidence that the GABA polarity switch (NKCC1/KCC2 ratio) may be abnormal in ASD, consistent with a developmental Ca²⁺ timing disruption.",
          "Multiple RCTs in neonatal seizures (Pressler 2023, NEMO trial): bumetanide as adjunctive therapy for phenobarbital-resistant neonatal seizures. Directly targets the Q → ∞ condition in neonates.",
          "Ben-Ari 2014 (Neuroscientist): comprehensive review of the NKCC1→KCC2 chloride switch and its role in neurodevelopmental disorders. The switch timing is Ca²⁺-dependent — consistent with EMF disruption of developmental Ca²⁺ dynamics.",
          "Shaker et al. 2024: meta-analysis of bumetanide in ASD — modest but consistent improvement in social behavior, supporting the GABA-switch hypothesis.",
        ],
        interpretation: "Bumetanide directly tests the Q-factor model's most extreme prediction: that neonatal neurological vulnerability (SIDS, neonatal seizures, developmental conditions) arises from GABA being excitatory (γ < 0 → Q → ∞). If restoring inhibitory GABA (bumetanide → γ > 0) improves neonatal seizures and ASD symptoms, then the excitatory-GABA state is pathogenic — and anything that delays the NKCC1→KCC2 switch (including EMF-induced Ca²⁺ disruption during development) increases vulnerability.",
        level: "E",
      },
      {
        id: "ETHOSUXIMIDE",
        drug: "Ethosuximide (T-type Ca²⁺ channel blocker)",
        drugSub: "First-line for absence epilepsy, Cav3.x selective",
        mechanism: "Ethosuximide selectively blocks T-type (Cav3.1/3.2/3.3) calcium channels in thalamocortical neurons. These low-threshold channels generate the 3 Hz spike-wave oscillation characteristic of absence epilepsy. By removing the resonant circuit element, ethosuximide directly demonstrates that Ca²⁺ channel function controls seizure susceptibility.",
        evidence: [
          "Ethosuximide is the most effective drug for absence epilepsy (Glauser 2010, NEJM: superior to valproate and lamotrigine in head-to-head RCT). Its specificity for T-type Ca²⁺ channels and for absence epilepsy demonstrates a precise channel-disease relationship.",
          "Cav3.2 (CACNA1H) gain-of-function variants are found in families with childhood absence epilepsy (Chen 2003, Ann Neurol). The genetic and pharmacological evidence converge on the same channel.",
          "T-type channels also contribute to testosterone biosynthesis (StAR protein regulation). Ethosuximide's suppression of T-type → StAR → testosterone production connects seizure control to reproductive endocrine disruption — both through the same Ca²⁺ channel.",
        ],
        interpretation: "T-channel pharmacology and CACNA1H experiments support subtype-specific physiological hypotheses. Seizure control does not validate an EMF-to-testosterone route. Compare isoform knockdown and drug effects in the specified field protocol; ordinary steroidogenesis and seizure physiology remain distinct endpoints.",
        level: "E",
      },
      {
        id: "NNC55-0396",
        drug: "NNC 55-0396",
        drugSub: "T-type Ca²⁺ channel blocker",
        mechanism: "Selective CatSper/T-type VGCC antagonist. Blocks Ca²⁺ entry through CatSper and Cav3 channels, preventing capacitation-associated hyperactivation.",
        evidence: [
          "Human sperm: NNC 55-0396 blocks CatSper current and abolishes progesterone-induced Ca²⁺ transients ([[ref:pmc6104424_nnc|Rennhack et al. 2018]])",
          "Motility (progressive A+B) drops significantly within 30 min of treatment",
          "Acrosome reaction blocked — sperm cannot penetrate zona pellucida",
        ],
        interpretation: "Chemical CatSper blockade reproduces the exact phenotype BERM predicts from EMF exposure: motile sperm that cannot navigate or fertilize.",
        level: "E",
      },
      {
        id: "A23187",
        drug: "A23187",
        drugSub: "Ca²⁺ ionophore (calcimycin)",
        mechanism: "Bypasses CatSper entirely by creating Ca²⁺-permeable pores in the membrane. Forces capacitation-like Ca²⁺ influx independent of channel gating.",
        evidence: [
          "Rescues fertilization in CatSper-knockout mouse sperm via IVF ([[ref:scirep2016_ionophore|Sci.Rep. 2016]])",
          "Used clinically in assisted reproduction for cases of failed oocyte activation",
          "Ca²⁺ dynamics after ionophore still matter — sustained high Ca²⁺ without oscillation impairs hyperactivation",
        ],
        interpretation: "If bypassing the channel rescues fertilization, the channel itself is the bottleneck — consistent with CatSper being the single point of failure BERM identifies.",
        level: "E",
      },
      {
        id: "RU1968",
        drug: "RU1968",
        drugSub: "Ceramide-1-phosphate analogue",
        mechanism: "Inhibits ceramide-1-phosphate signaling, which regulates zona pellucida-induced acrosome reaction via intracellular Ca²⁺ mobilization.",
        evidence: [
          "Blocks zona-induced acrosome reaction in capacitated human sperm ([[ref:pmc10102357_ceram|Rehfeld et al. 2023]])",
          "Does not affect spontaneous acrosome reaction — specific to the receptor-mediated pathway",
          "Demonstrates that the acrosome reaction requires two Ca²⁺ signals: CatSper (extracellular) + C1P (intracellular stores)",
        ],
        interpretation: "The acrosome reaction depends on a precise two-signal Ca²⁺ cascade. EMF disruption of either signal — CatSper or intracellular stores — blocks the final fertilization step.",
        level: "M|C",
      },
      {
        id: "C1P",
        drug: "Ceramide-1-phosphate",
        drugSub: "Sphingolipid signaling mediator",
        mechanism: "Endogenous lipid second messenger that mobilizes Ca²⁺ from intracellular stores during the zona pellucida-triggered acrosome reaction. Required alongside CatSper-mediated extracellular Ca²⁺ entry.",
        evidence: [
          "C1P-induced Ca²⁺ release is essential for zona-triggered acrosome reaction ([[ref:pmc10102357_ceram|Rehfeld et al. 2023]])",
          "Exogenous C1P can partially rescue impaired acrosome reactions in subfertile samples",
          "Confirms dual-Ca²⁺ model: CatSper (external) + C1P (internal) both required",
        ],
        interpretation: "The fertilization cascade requires two independent Ca²⁺ sources operating in sequence. This dual dependency makes fertilization doubly vulnerable to any perturbation of calcium homeostasis.",
        level: "M|C",
      },
    ],
    convergenceTitle: "What pharmacological contrasts can identify",
    convergenceLead: "A blocker, agonist or rescue can locate a necessary step in a named experimental system. Channel subtype, off-target effects, baseline physiology and genetic controls determine the inference. The drug classes below connect relevant physiological processes; they are not fourteen independent confirmations of one environmental cause.",
    convergencePoints: [
      "Pathway A (VGCC): CCBs (23 blocker studies), verapamil (frequency-dependent blockade), gabapentinoids (α2δ modulation), nimodipine (CNS-selective blockade), riluzole (Ca²⁺-dependent glutamate release inhibition)",
      "Clock and hormone state: lithium-associated clock regulation and melatonin signalling; CRY amount, FAD occupancy and functional response are separate variables.",
      "Ca²⁺ hormesis/reset: Psilocybin (5-HT2A → controlled Ca²⁺ burst → plasticity reset), caffeine (adenosine A₁ antagonism → biphasic Ca²⁺ modulation)",
      "Redox processing: CoQ10 in a GSM-modulated 3.5 GHz rat protocol ([[ref:bektas2026|Bektas 2026]]), and melatonin with receptor, clock and antioxidant effects.",
      "Metabolic signalling: GLP-1-dependent L-channel microdomains and ERK; a field interaction is a separate experimental prediction.",
    ],
    convergenceConclusion: "These interventions constrain candidate biological realisations of BERM. Clinical benefit alone also fits causes unrelated to EMF. A discriminating test compares field−sham under intervention and control, then tests the preregistered waveform and state dependence against competing coupling models using shared biological parameters. L3/L4 results do not by themselves identify the conditional L2 coupling, its gauge, scale or tissue kernel.",
    predictionLink: "See: Pharmacological predictions (PHARM-1 through PHARM-5)",
    predictionHref: "/predictions",
    mechanismLabel: "Mechanism",
    evidenceLabel: "Evidence",
    interpretationLabel: "Model interpretation",
  },
  fi: {
    title: "Farmakologinen näyttö",
    subtitle: "Farmakologiset interventiot erottelevat kanava-alatyypin, paikallisen kalsiumin, varastot, palautteen ja korjauksen. Jokainen kenttäkohtainen väite säilyttää oman solujärjestelmänsä, aaltomuotonsa ja sham-vertailunsa.",
    backLink: "← Takaisin näyttöön",
    cardsTitle: "Lääke-näyttökortit",
    cardsLead: "Lue jokainen kortti mekanismikontrastina: altistus ja sham, interventio ja verrokki, ensimmäinen vaste ja lopullinen toiminto. E tarkoittaa toistettua havaintoa ilmoitetussa järjestelmässä; M mekanismia; C yhteyttä; L teoreettista premissiä; L* testattavaa ehdokasta. Mikään merkintä ei yksin osoita koko reittiä.",
    cards: [
      {
        id: "CCB",
        drug: "Kalsiumkanavan salpaajat (CCB:t)",
        drugSub: "Nifedipiini, amlodipiini, verapamiili, diltiatseemi",
        mechanism: "L-tyypin kanavan salpaus voi testata kanavan osuutta määritettyyn kenttävasteeseen. Interventio muuttaa myös normaalia kalsiumriippuvaista fysiologiaa, joten jokainen salpaajaehto tarvitsee oman sham-verrokin.",
        evidence: [
  "[[ref:pall2013_v2|Pall 2013]] tarkasteli 23 tutkimusta, joissa kalsiumkanavan salpaajat estivät tai vaimensivat kenttään liitettyjä vaikutuksia. Tulos tukee kanavariippuvuuden testaamista kyseisillä protokollilla; välittäjän ja ensimmäisen kenttäanturin erottaminen edellyttää alatyypin, salpaajan selektiivisyyden ja varhaisten vasteiden mittaamista.",
  "Kalsiumkanavan salpaajien kliininen käyttö osoittaa kanavien fysiologista merkitystä. Käyttö tai julkaisumäärä ei tunnista ensimmäistä kenttäanturia, osoita kaikkia kanava-alatyyppejä kenttäherkiksi eikä siirrä soluprotokollaa ihmisen ympäristöaltistukseen.",
  "Amlodipiinilla on pitkä eliminaation puoliintumisaika. Ehdollinen vertailu muihin verenpainelääkkeisiin tarvitsee mitatun altistuksen, vastaavat käyttöaiheet, annoksen ja kudoksen kohdevaikutuksen; lääkemääräys ei osoita kaikkien relevanttien kanavien jatkuvaa salpausta tai EMF-suojaa.",
  "Nifedipiini estää kohdun supistuksia ja sitä käytetään raskaudenaikaisen verenpaineen hoidossa ([[ref:nifed_tocolytic|Cochrane 2014]]). Interventiot osoittavat olennaista kalsiumriippuvaista fysiologiaa. Ne eivät osoita yhteistä EMF-alkuperää tai tunnista kummankin tilan koko patogeneesiä."
],
        interpretation: "Yhdistä kenttä/sham salpaaja/verrokki-asetelmaan ja mittaa varhainen virta, kalsiumvarastojen dynamiikka ja kudostoiminta. Muuttunut yhteisvaikutus paikantaa kanavariippuvuutta kyseisessä asetelmassa. Verenpaine- tai kohtuvaikutukset osoittavat fysiologista merkitystä; [[ref:bertagna2025|Bertagna 2025]] tarjoaa kenttäkohtaisen ER/kalsium-intervention. Kumpikaan ei yksin tunnista ensimmäistä kenttäanturia.",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Verapamiili (fenyylialkylamiini-CCB)",
        drugSub: "Ei-dihydropyridini, taajuusriippuvainen salpaus",
        mechanism: "Verapamiilin kanavasalpaus on käyttöriippuvaista: esto voi voimistua kanavan toistuvasti avautuessa. Ehdollinen vertailu toiseen salpaajaan tarvitsee avautumiskuvion, pitoisuuden ja alatyypin mittauksen. Kentän taajuus ei itsessään osoita yhtä nopeaa kanavan avautumista eikä tee verapamiilista tehokkainta kenttäinterventiota.",
        evidence: [
  "Käyttöriippuvainen salpaus tunnetaan sydänfarmakologiassa. Sen merkitys määritetyssä kenttäkokeessa riippuu todellisesta kanavatilasta ja avautumiskinetiikasta, jotka on mitattava eikä samaistettava käytettyyn aaltomuotoon.",
  "Lundberg 1996 (Bioelectromagnetics): verapamiili esti EMF:n aiheuttaman kalsiumeffluksin luusoluissa — suora näyttö siitä, että EMF-kalsiumreitti on farmakologisesti estettävissä.",
  "Verapamiilia käytetään myös lisääntymislääketieteessä siittiöiden valmisteluprotokollissa, joissa se voi parantaa motiliteettia moduloimalla kalsiumdynamiikkaa.",
  "[[ref:verap_t1d_jama|Forlenza JAMA 2023]]: verapamiili säilytti β-solujen toimintaa vastasairastuneiden T1D-lasten satunnaistetussa kokeessa (N=88). Tulos ankkuroi muokattavaa β-solutoimintaa; kokeessa ei muutettu EMF-altistusta, joten se ei osoita sen osuutta T1D:ssä.",
  "[[ref:verap_t1d_natmed|Ovalle Nat Med 2018]]: verapamiili tuki C-peptidivastetta vastasairastuneilla T1D-aikuisilla TXNIP-vähenemisen ja β-solusuojan yhteydessä."
],
        interpretation: "Käyttöriippuvainen salpaus motivoi vertailun mitatuilla kanavan avautumiskuvioilla. T1D-kokeet tukevat β-solun suojaushaaraa; EMF-kohtainen testi tarvitsee lisäksi kenttä- ja sham-vertailun verapamiililla ja verrokilla. Mittaa eritys, korjaus ja elinkelpoisuus erikseen, jotta suoja ei sekoitu normaalin erityksen estymiseen.",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Litium",
        drugSub: "Mielialantasaaja, GSK-3β-inhibiittori, neuroprotektiivinen",
        mechanism: "Litium vaikuttaa GSK-3β:aan ja useisiin kellon säätelyprosesseihin. Ehdollinen BERM-testi erottaa CRY-määrän, ligandin sitoutumisen, kellon jakson, amplitudin ja melatoniinin ajoituksen. Suurempi CRY-määrä ei itsessään tarkoita vahvempaa kelloa tai suurempaa toiminnallista kenttävastetta: [[ref:hirota2012_kl001|Hirota 2012]] havaitsi erillisen CRY:tä stabiloivan KL001-yhdisteen pidentävän jaksoa mutta pienentävän reportterin amplitudia. Tämä on mekanismivertailu, ei näyttö litiumin ja KL001:n samoista vaikutuksista.",
        evidence: [
          "Litiumin yhteydessä raportoidut kellon jakson muutokset motivoivat ajoitettuja mittauksia (McCarthy 2019, Translational Psychiatry). Tulosta ei voi yleisesti palauttaa yhteen GSK-3β→CRY-hajoamisvaiheeseen; annos, kudos ja mitattu kellovaste ratkaisevat.",
          "Litiumilla hoidettujen bipolaaripotilaiden raportoidut melatoniinimuutokset (Hallam 2005, J. Psychopharmacology) koskevat kliinistä hoitoasetelmaa. Ne eivät osoita kenttämuutoksen palautumista; kenttä×litium-kokeessa vaihe, amplitudi ja lähtötaso on mitattava erikseen.",
          "Litiumiin liittyvät GSK-3β/tau-, BDNF- ja tulehdusreitit tarjoavat useita ehdokkaita myöhemmiksi mittauskohteiksi. Päällekkäisyys kalsiumriippuvaisen biologian kanssa ei sijoita kaikkia vaikutuksia yhteen EMF-ketjuun eikä tunnista hoitotuloksen välittävää reittiä.",
          "Juomaveden litiumin yhteydet itsemurhiin (Kapusta 2011) ja dementiaan (Kessing 2017) motivoivat havainnoivan tutkimuksen jatkoa. Alueellinen altistus, hoitoannos ja solunsisäinen kohdevaikutus ovat eri suureita. Assosiaatiot eivät mittaa CRY:n stabiloitumista hivenpitoisuuksilla eivätkä osoita väestön EMF-suojaa.",
        ],
        interpretation: "Kellosäätely ja havaitut litiumassosiaatiot motivoivat vastaanotintilan hypoteesia. Vesipitoisuuden assosiaatiot tai mielialan hoitovaikutukset eivät osoita EMF-suojaa. Mittaa CRY-määrä, ligandin sitoutumisaste, kellon jakso ja kenttä×lääke-kontrasti erikseen; proteiinin stabilointi ei välttämättä lisää kenttäherkkyyttä.",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Semaglutidi / GLP-1-reseptoriagonistit",
        drugSub: "Ozempic, Wegovy, Mounjaro (tirtsepatidi)",
        mechanism: "[[ref:bhatt2012_glp1|Selway 2012]] havaitsi, että GLP-1:n ERK-signalointi hiiren MIN6-soluissa tarvitsi L-tyypin kanavia. Bay K8644 aktivoi ERK:n ilman havaittavaa koko solun Ca²⁺-nousua; nopea BAPTA esti paikallista signalointia, hidas EGTA ei. EGTA vähensi osittain GLP-1:n varhaista vastetta mutta säästi pitkäkestoisen vasteen. Tulos tukee kanavan mikrodomaania, ei kanavan ohitusta. Tutkimuksessa ei altistettu soluja sähkömagneettiselle kentälle.",
        evidence: [
          "GLP-1-reseptoriagonistien kliiniset aineenvaihduntahyödyt osoittavat käyttökelpoisia fysiologisia interventioita. Hyötyjen laajuus ei tunnista EMF:ää hoidettujen tilojen syyksi eikä paikanna vaikutusta kenttävasteen tiettyyn vaiheeseen.",
          "[[ref:klimentidis2010|Klimentidis-paradoksi (2011, Proc. R. Soc. B)]]: 24 populaatiota 8 lajista on kaikki lihoneet 1970-luvulta (p = 1,2×10⁻⁷). Ruokavalio/liikunta ei selitä painonnousua kontrolloiduilla ruokavalioilla olevilla koe-eläimillä.",
          "GLP-1:tä ilmennetään aivoissa (NTS, hypotalamus) missä se säätelee ruokahalua, palkitsemista ja pahoinvointia kalsiumriippuvaisen signaloinnin kautta.",
        ],
        interpretation: "Ehdollinen BERM-ennuste: määritelty kenttä voi muuttaa L-kanavan mikrodomaanin signalointia ja ERK:ta koko solun Ca²⁺-mittauksen jäädessä negatiiviseksi. Vertaa nopeaa ja hidasta puskurointia, kanavasalpausta ja sham-tilaa samoina ajankohtina. Semaglutidin mahdollinen kompensaatio ja sen suunta tarvitsevat erillisen lääke–kenttäkokeen; kliininen teho ei tunnista ympäristösyytä.",
        level: "L*",
      },
      {
        id: "GABAPENTINOID",
        drug: "Gabapentinoidit",
        drugSub: "Gabapentiini, pregabaliini (Lyrica)",
        mechanism: "Gabapentinoidit sitoutuvat jänniteriippuvaisten kalsiumkanavien α2δ-alayksikköön, vähentäen Ca²⁺-sisäänvirtausta presynaptisissa terminaaleissa. Tämä EI ole sama alayksikkö kuin CCB:iden kohteena oleva α1-huokosyksikkö.",
        evidence: [
          "Gabapentiinia ja pregabaliinia määrätään neuropaattiseen kipuun, epilepsiaan ja ahdistukseen — tiloihin jotka liittyvät neuronaaliseen kalsiumhypereksitabiliteettiin.",
          "Pregabaliinilla on tunnettu haittavaikutus: alentunut libido ja seksuaalinen toimintahäiriö (Calabrò 2015). Tämä on yhdenmukainen: gabapentinoidit tukahduttavat KAIKKEA kalsiumriippuvaista signalointia, mukaan lukien normaalit lisääntymiskykyyn liittyvät hormonireitit.",
          "α2δ-alayksikköä ilmennetään runsaasti dorsaalisissa takajuuriganglioissa ja selkäytimessä. Sitä ilmennetään myös hypotalamuksessa, missä se voisi säädellä GnRH-pulsatiliteettia (BERM-taso 7).",
        ],
        interpretation: "Gabapentinoidit tarjoavat farmakologisen dissektion BERM:n kalsiummallista: ne säätelevät eri kalsiumkanavan alayksikköä kuin CCB:t, ennustaen osittain päällekkäisiä mutta erotettavia vaikutuksia.",
        level: "M",
      },
      {
        id: "NIMODIPINE-ETH",
        drug: "Nimodipiini (L-tyypin CCB, CNS-selektiivinen)",
        drugSub: "Dihydropyridiini BBB-penetraatiolla",
        mechanism: "Nimodipiini läpäisee veri-aivoesteen — toisin kuin useimmat muut dihydropyridiini-CCB:t — ja salpaa preferoiden L-tyypin VGCC:itä aivoverisuonistossa ja neuroneissa.",
        evidence: [
          "Nimodipiini on FDA-hyväksytty aivoverisuonispasmien ehkäisyyn subaraknoidaalivuodon jälkeen. Sen neuroprotektiivinen mekanismi (kalsiumvälitteinen) limittyy BERM:n ennustamien CNS-vaikutusten kanssa.",
          "Jatkuva kliininen kiinnostus nimodipiiniin Alzheimerin taudin ja vaskulaarisen dementian hoidossa viittaa siihen, että kalsiumkanavasäätelyn häiriö osallistuu neurodegeneraatioon.",
          "Nimodipiinin BBB-penetraatio tekee siitä ainoan CCB:n joka voisi teoreettisesti vaimentaa EMF-vaikutuksia sekä perifeerisissä (lisääntymiskykyyn liittyvät) että sentraalisissa (kognitiiviset, sirkadiaaniset) päätepisteissä samanaikaisesti.",
        ],
        interpretation: "Aivoihin pääsevien ja muiden L-kanavainterventioiden vertailu voi testata kudosaltistusta ja kohdevaikutusta. Pelkkä kognitiivinen ero ei yksilöi BBB-läpäisyä, koska myös kanavatoiminta, farmakokinetiikka ja lähtötila eroavat. Tarvitaan määritelty kenttä/sham-vertailu.",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "Eksogeeninen melatoniini",
        drugSub: "Vuorokausisignaali, jonka reseptorivaikutukset riippuvat kudoksesta",
        mechanism: "Melatoniinilla on reseptori-, vuorokausi- ja redox-vaikutuksia, joiden kalsiumsuunta riippuu kudoksesta ja ajoituksesta. Rotan pikkuaivojen jyväissoluissa [[ref:liu2014_mt2|Liu 2014]] havaitsi pienemmän kenttään liittyvän natriumvirran kasvun mutta suuremman depolarisaation laukaiseman Ca²⁺-vapautuksen ilman lepo-Ca²⁺:n nousua. MT2 ja solunsisäiset varastot osallistuivat palautteeseen.",
        evidence: [
  "[[ref:tbahriti2026|Tbahriti ym. 2026]] (Sleep Biol Rhythms, PRISMA-katsaus 55 tutkimuksesta): 88 % korkealaatuisista eläintutkimuksista raportoi EMF:n aiheuttaman melatoniinin vaimentumista 20–50 % lähtötasosta.",
  "Melatoniini on voimakas antioksidantti joka neutraloi ROS:ia — vastatoimena oksidatiivisen stressin kaskadille (BERM-taso 5A) riippumatta sen hormonaalisesta funktiosta.",
  "Reiter ym. 2007, 2014: melatoniinin suojaavat vaikutukset RF-indusoidulta oksidatiiviselta vauriolta eläinmalleissa.",
  "[[ref:liu2014_mt2|Liu 2014]]: 50 Hz, 1 mT, 60 min; MT2-agonisti/-antagonisti ja varastovapautuksen interventiot erottavat lepo-Ca:n, evokoidun Ca:n ja natriumvirran.",
  "[[ref:cajochen2005_melatonin|Cajochen 2005]]: samalla fotonivuolla annetut 460 ja 550 nm:n iltavalot tuottivat erilaiset ihmisen melatoniinivasteet. Tämä on verkkokalvon valo–vuorokausitulos; koe ei testannut EMF–MT2-interaktiota eikä osoittanut paikallista CRY-sensoria."
],
        interpretation: "Voimakkaampi evokoitu kalsiumpalaute voi siten liittyä pienempään natriumvirtavasteeseen. BERM ennustaa valo–kenttäinteraktion vain, jos fysiologinen melatoniini aktivoi saman MT2-jarrun nimetyssä kudoksessa. Mikromolaarinen solukoeannos ja ihmisen iltavalovaste tarvitsevat eksplisiittisen annos- ja kudossillan; kyse ei ole yleisestä Ca²⁺:ta laskevasta mekanismista.",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "Koentsyymi Q10 (CoQ10 / ubikinooni)",
        drugSub: "Mitokondriaalinen elektroninkuljettaja, endogeeninen antioksidantti",
        mechanism: "BERM erottaa vastaanottajan valmiuden s, korjauskapasiteetin A ja vaurion D. Nykyisessä mallissa jokainen määritelty aika-askel antaa D_next = max(0, D + g_D·u·s − r_D·A·D): tuotanto lisää kuormaa ja korjaus poistaa sitä. Ilman uutta syötettä korjaus ei kasvata D:tä. CoQ10 on redox-käsittelyn muunninehdokas; koe ei estimoi g_D:tä, r_D:tä eikä korjauksen aikavakiota.",
        evidence: [
          "[[ref:bektas2026|Bektas 2026]] tutki 28 rottaa neljässä ryhmässä GSM-moduloidulla 3,5 GHz:n signaalilla, 2 h/päivä 30 päivän ajan. CoQ10 lievensi osaa hormonaalisista, kiveksen ja redox-tilan muutoksista. Kyse ei ollut 5G NR -aaltomuodosta. Varhaista kalsiumvastetta ja korjauksen aikavakiota ei mitattu, joten tulos ei yksilöi alavirran korjauskohtaa eikä osoita jo syntyneen vaurion täydellistä palautumista.",
          "CoQ10-supplementaatio parantaa siittiöparametreja subfertileillä miehillä (Safarinejad 2012: parantunut motiliteetti ja konsentraatio).",
          "CoQ10-tasot laskevat iän myötä — seuraten samaa aikajanaa kuin testosteronin lasku ja nouseva oksidatiivinen stressi.",
        ],
        interpretation: "Vertaa kenttää/shamia CoQ10:n/vehikkelin kanssa ja mittaa varhainen virta, mitokondrio-/redox-vaste ja myöhempi kudostoiminta. Havaittu suoja rajaa kokonaisvastetta. Alkupään modulaatio, pienempi kuorman tuotanto ja parempi poistuma jäävät vaihtoehdoiksi, kunnes välivaiheiden mittaukset erottavat ne.",
        level: "E",
      },
      {
        id: "PSILOCYBIN",
        drug: "Psilosybiini (5-HT2A-agonisti)",
        drugSub: "Tryptamiinipsykedeeli, klusteripäänsäryn läpimurto",
        mechanism: "Psilosybiini aktivoi 5-HT2A-reseptorit, jotka signaloivat Gq → PLC → IP3 → solunsisäinen Ca²⁺-vapautus. Tämä kontrolloitu Ca²⁺-pursuke käynnistää BDNF:n ja neuraalisen plastisuuden kaskadeja. Psilosybiini resetoi tryptamiinisignalointijärjestelmän, jonka BERM:n reitti A/C kroonisesti häiritsee — 5-HT2A-agonismi vastustaa serotoniin-lukitusavaus-takaisinkytkentäsilmukkaa (S2).",
        evidence: [
          "Psilosybiini tarjoaa dramaattisen helpotuksen klusteripäänsärkyyn — tunnetusti vaikeimpaan kiputilaan — annoksilla jotka tuottavat yksittäisen kontrolloidun 5-HT2A→Ca²⁺-pursukeen (Schindler 2015, 2021). Tämä on BERM:n ennustama Ca²⁺-hormeesikuvio: yksittäinen suuri kontrolloitu pulssi resetoi järjestelmän jonka krooninen matala-asteinen häiriö on ajanut patologiseksi.",
          "Psilosybiini lisää BDNF-ekspressiota (Catlow 2013, Exp Brain Res). BDNF on suppressoitu kroonisella EMF-altistuksella CaMKII-reitin häiriön kautta. Psilosybiinin BDNF-nosto vastustaa suoraan yhtä BERM:n ennustamista alavirtavajoksista.",
          "FDA:n läpimurtoterapia-nimitys hoitoresistentille masennukselle (2018, 2019). Masennus on useiden BERM-kaskadien alavirrassa (melatoniini↓, BDNF↓, serotoniini↓, kortisoli↑). Psilosybiinin monikohteinen resetointi on yhdenmukainen ylävirran häiriön korjaamisen kanssa.",
        ],
        interpretation: "5-HT2A-signalointi ja plastisuusvasteet paikantavat farmakologisen reitin hermoston muutokseen. Kliiniset tai kokeelliset vaikutukset eivät osoita aiemmaksi syyksi kroonista EMF:ää eivätkä todista kalsiumresettiä. Ehdotettu yhteisvaikutus on paikannettava kenttä×interventiokokeella.",
        level: "E|C",
      },
      {
        id: "CAFFEINE",
        drug: "Kofeiini (adenosiini A₁ -antagonisti)",
        drugSub: "Maailman käytetyin psykoaktiivinen aine",
        mechanism: "Kofeiini estää adenosiini A₁ -reseptorit, jotka normaalisti inhiboivat VGCC-välitteistä Ca²⁺-vapautusta. Paradoksaalisesti kofeiini myös säätelee suoraan ryanodiinireseptoreja (RyR), herkistäen solunsisäisiä Ca²⁺-varastoja. Kokonaisvaikutus on kaksivaiheinen: kohtuulliset annokset lisäävät vireystilaa modifioimalla Ca²⁺-dynamiikkaa; korkeat annokset voivat tehostaa Ca²⁺-ylikuormitusta. Kofeiini on siis luonnollinen Ca²⁺-modulaattori — viides BERM:n endogeenisessä/ravintoperäisessä modulointipaneelissa (D-vitamiinin, melatoniinin, magnesiumin ja litiumin rinnalla).",
        evidence: [
          "Kofeiinin neuroprotektiiviset vaikutukset Parkinsonia ja Alzheimeria vastaan (meta-analyysit: OR 0,7–0,8) ovat yhdenmukaisia Ca²⁺-modulaation kanssa kohtuullisilla annoksilla vastustaen kroonista Ca²⁺-ylikuormitusta ympäristölähteistä.",
          "Annos-vaste on epälineaarinen (hormeesi): 2–4 kuppia/päivä suojaava, korkeammat annokset neutraaleja tai haitallisia. BERM käsittelee tätä tuotuna L3-biologisen vasteen hypoteesina R_caffeine, ei geometrisena χ_geo-funktiona tai näyttönä sen avoimesta L0→L2-kuvauksesta.",
          "Kofeiini läpäisee BBB:n vapaasti ja sen puoliintumisaika on 3–5 tuntia, tarjoten ajoittaista eikä jatkuvaa Ca²⁺-modulaatiota — vastakohta EMF:n jatkuvalle 24/7 VGCC-aktivaatiolle.",
        ],
        interpretation: "Adenosiini- ja varastovaikutukset motivoivat annos- ja ajoituskohtaisia vasteprofiileja. Kahvinkäytön assosiaatiot eivät osoita tiedostamatonta EMF-vaurion hoitoa. Mittaa kanava-/varastotila ja kenttä×kofeiini-kontrasti ennen suojan tai sen suunnan ennustamista.",
        level: "E|M",
      },
      {
        id: "RILUZOLE",
        drug: "Rilutsoli (glutamaatin vapautumisen estäjä)",
        drugSub: "Ainoa FDA-hyväksytty ALS-lääke ennen 2017",
        mechanism: "Rilutsoli estää jänniteriippuvaisia Na⁺-kanavia ja Ca²⁺-riippuvaista glutamaatin vapautumista presynaptisista terminaaleista. Vähentämällä glutamaatin eksitotoksisuutta se suojaa motoneuroneita Ca²⁺-välitteiseltä kuolemalta. Tämä vastustaa suoraan BERM:n ALS-mekanismia (VK45): EMF → VGCC → Ca²⁺↑ → glutamaatin vapautuminen↑ → eksitotoksisuus → motoneuronin kuolema.",
        evidence: [
          "Rilutsoli pidentää ALS-eloonjäämistä 2–3 kuukautta (Bensimon 1994, NEJM). Sen mekanismi — Ca²⁺-riippuvaisen glutamaatin vapautumisen estäminen — kohdistuu juuri sille reitille jonka BERM ennustaa EMF:n aktivoivan motoneuroneissa.",
          "Motoneuronit ovat valikoivasti haavoittuvia johtuen matalasta Ca²⁺-puskurointikapasiteetista (Vanselow & Bhatt 1999). Tämä selittää miksi ALS kohdistuu nimenomaan motoneuroneihin vaikka EMF-altistus on systeeminen — Ca²⁺-puskurointihypoteesi (VK45).",
          "Rilutsolin natrium-/glutamaattivaikutus ja kliininen ALS-hyöty ankkuroivat muokattavan eksitotoksisuusreitin. Ne eivät osoita EMF:ää alkusyyksi. Kenttäkohtainen silta tarvitsee mitatun altistuksen ja lääke–kenttävertailun motoneuronijärjestelmässä; ammatillinen assosiaatio säilyy erillisenä näyttönä.",
        ],
        interpretation: "Rilutsolin natrium-/glutamaattivaikutus ja kliininen ALS-hyöty ankkuroivat muokattavan eksitotoksisuusreitin. Ne eivät osoita EMF:ää alkusyyksi. Kenttäkohtainen silta tarvitsee mitatun altistuksen ja lääke–kenttävertailun motoneuronijärjestelmässä; ammatillinen assosiaatio säilyy erillisenä näyttönä.",
        level: "E|C",
      },
      {
        id: "ISRADIPINE",
        drug: "Isradipiini (Cav1.3-selektiivinen CCB)",
        drugSub: "Dihydropyridiini Cav1.3-preferenssillä, PD-neuroprotektiokandidaatti",
        mechanism: "Isradipiini salpaa ensisijaisesti Cav1.3 (L-tyypin) kanavia — tarkkaa alatyyppiä, jota ilmennetään substantia nigran dopamiinineuroneissa. Nämä neuronit käyttävät ainutlaatuisesti Cav1.3:a autonomiseen tahdistamiseen, mikä tekee niistä valikoivasti haavoittuvia Ca²⁺-ylikuormitukselle.",
        evidence: [
          "Epidemiologinen data: dihydropyridiini-CCB-käyttäjillä on 20–30 % alentunut Parkinson-riski (Becker 2008, Ritz 2010). Yhteys on tarkka aivoja läpäiseville CCB:ille.",
          "Chan ym. 2007 (Nature): substantia nigran dopamiinineuronit käyttävät Cav1.3:a tahdistamiseen — L-tyypin Ca²⁺-kanavien ainutlaatuinen riippuvuus selittää niiden valikoivan haavoittuvuuden PD:ssä.",
          "STEADY-PD III -tutkimus (2020, Lancet Neurology): isradipiini ei hidastanut kliinistä etenemistä varhaisessa PD:ssä — mutta biologinen perustelu pysyy pätevänä.",
        ],
        interpretation: "STEADY-PD III:n negatiivinen tulos säilyy negatiivisena kliinisen tehon testinä. L-kanavafysiologia motivoi alatyypin, kohdevaikutuksen ja kudosaltistuksen tutkimista, mutta assosiaatiot ja uskottava mekanismi eivät muuta nollakoetta BERM:n validaatioksi eivätkä osoita EMF-syytä.",
        level: "E|M",
      },
      {
        id: "BUMETANIDE",
        drug: "Bumetanidi (NKCC1-salpaaja)",
        drugSub: "Loop-diureetti uudelleenkäyttöön neonataalien kohtausten ja ASD:n hoitoon",
        mechanism: "Bumetanidi salpaa NKCC1-kloridi-importterin (SLC12A2), joka ylläpitää korkeaa solunsisäistä Cl⁻:a kypsymättömissä neuroneissa. Neonataaliaivoissa NKCC1-dominanssi tekee GABAsta eksitatorisen inhibitorisen sijaan — bumetanidi kääntää tämän alentamalla solunsisäistä Cl⁻:a.",
        evidence: [
          "Lemonnier & Ben-Ari 2010: bumetanidi paransi autistista käyttäytymistä lapsilla — ensimmäinen näyttö siitä, että GABA-polariteettikytkin (NKCC1/KCC2-suhde) voi olla poikkeava ASD:ssä.",
          "Useita RCT:itä neonataaleissa kohtauksissa (Pressler 2023, NEMO-tutkimus): bumetanidi adjunktiivisena terapiana fenobarbitaaliresistentteihin neonataaleihin kohtauksiin.",
          "Shaker ym. 2024: meta-analyysi bumetanidista ASD:ssä — vaatimaton mutta johdonmukainen parannus sosiaalisessa käyttäytymisessä.",
        ],
        interpretation: "Bumetanidi testaa suoraan Q-tekijämallin äärimmäisintä ennustetta: neonataalinen neurologinen haavoittuvuus johtuu eksitatorisesta GABAsta (γ < 0 → Q → ∞). Jos inhibitorisen GABAn palauttaminen parantaa neonataaleja kohtauksia ja ASD-oireita, eksitatorinen GABA-tila on patogeeninen.",
        level: "E",
      },
      {
        id: "ETHOSUXIMIDE",
        drug: "Etosuksimidi (T-tyypin Ca²⁺-kanavasalpaaja)",
        drugSub: "Ensisijaislääke poissaoloepilepsiaan, Cav3.x-selektiivinen",
        mechanism: "Etosuksimidi salpaa valikoivasti T-tyypin (Cav3.1/3.2/3.3) kalsiumkanavia talamo-kortikaalisissa neuroneissa. Nämä matalan kynnyksen kanavat tuottavat poissaoloepilepsialle ominaisen 3 Hz piikki-aalto-oskillaation.",
        evidence: [
          "Etosuksimidi on tehokkain lääke poissaoloepilepsiaan (Glauser 2010, NEJM: parempi kuin valproaatti ja lamotrigiini suorassa RCT-vertailussa).",
          "Cav3.2 (CACNA1H) gain-of-function -variantit löytyvät lapsuuden poissaoloepilepsia-perheistä (Chen 2003, Ann Neurol). Geneettinen ja farmakologinen näyttö yhtyvät samalle kanavalle.",
          "T-tyypin kanavat osallistuvat myös testosteronibiosynteesin (StAR-proteiinin säätely). Yhteys kohtauskontrollin ja lisääntymiskykyyn liittyvän endokriinisen häiriön välillä — molemmat saman Ca²⁺-kanavan kautta.",
        ],
        interpretation: "T-kanavafarmakologia ja CACNA1H-kokeet tukevat alatyyppikohtaisia fysiologisia hypoteeseja. Kohtausten hoitovaste ei validoi EMF–testosteronireittiä. Vertaa isoformin vaimennusta ja lääkkeitä määritellyssä kenttäprotokollassa; normaali steroidogeneesi ja kohtausfysiologia säilyvät erillisinä päätepisteinä.",
        level: "E",
      },
      {
        id: "NNC55-0396",
        drug: "NNC 55-0396",
        drugSub: "T-tyypin Ca²⁺-kanavasalpaaja",
        mechanism: "Selektiivinen CatSper/T-tyypin VGCC-antagonisti. Estää Ca²⁺:n sisäänvirtauksen CatSper- ja Cav3-kanavien kautta, estäen kapasitaatioon liittyvän hyperaktivaation.",
        evidence: [
          "Ihmisen siittiöt: NNC 55-0396 salpaa CatSper-virran ja kumoaa progesteronin indusoimat Ca²⁺-transientit ([[ref:pmc6104424_nnc|Rennhack ym. 2018]])",
          "Motiliteetti (etenevä A+B) laskee merkittävästi 30 min kuluessa käsittelystä",
          "Akrosomireaktio estetty — siittiö ei pysty läpäisemään zona pellucidaa",
        ],
        interpretation: "Kemiallinen CatSper-salpaus toistaa täsmälleen fenotyypin, jonka BERM ennustaa EMF-altistuksesta: liikkuvat siittiöt, jotka eivät pysty navigoimaan tai hedelmöittämään.",
        level: "E",
      },
      {
        id: "A23187",
        drug: "A23187",
        drugSub: "Ca²⁺-ionofori (kalsimysiini)",
        mechanism: "Ohittaa CatSperin kokonaan luomalla Ca²⁺-läpäiseviä huokosia kalvoon. Pakottaa kapasitaation kaltaisen Ca²⁺-sisäänvirtauksen kanavaportitoinnista riippumatta.",
        evidence: [
          "Pelastaa hedelmöityksen CatSper-poistogeenisten hiiren siittiöissä IVF:n kautta ([[ref:scirep2016_ionophore|Sci.Rep. 2016]])",
          "Käytetään kliinisesti avusteisessa lisääntymisessä epäonnistuneen munasolun aktivaation tapauksissa",
          "Ca²⁺-dynamiikalla ionoforin jälkeen on edelleen merkitystä — jatkuva korkea Ca²⁺ ilman vaihtelua heikentää hyperaktivaatiota",
        ],
        interpretation: "Jos kanavan ohittaminen pelastaa hedelmöityksen, kanava itse on pullonkaula — yhdenmukainen sen kanssa, että CatSper on BERM:n tunnistama yksittäinen vikapiste.",
        level: "E",
      },
      {
        id: "RU1968",
        drug: "RU1968",
        drugSub: "Keramidi-1-fosfaattianalogi",
        mechanism: "Estää keramidi-1-fosfaattisignalointia, joka säätelee zona pellucida -aiheutettua akrosomireaktiota solunsisäisen Ca²⁺-mobilisaation kautta.",
        evidence: [
          "Estää zona-indusoidun akrosomireaktion kapasitoiduissa ihmisen siittiöissä ([[ref:pmc10102357_ceram|Rehfeld ym. 2023]])",
          "Ei vaikuta spontaaniin akrosomireaktioon — tarkka reseptorivälitteiselle reitille",
          "Osoittaa, että akrosomireaktio vaatii kaksi Ca²⁺-signaalia: CatSper (solunulkoinen) + C1P (solunsisäiset varastot)",
        ],
        interpretation: "Akrosomireaktio riippuu täsmällisestä kahden signaalin Ca²⁺-kaskadista. EMF:n häirintä kumman tahansa signaalin osalta — CatSper tai solunsisäiset varastot — estää viimeisen hedelmöitysvaiheen.",
        level: "M|C",
      },
      {
        id: "C1P",
        drug: "Ceramide-1-phosphate",
        drugSub: "Sfingolipidisignaloinnin välittäjä",
        mechanism: "Endogeeninen lipidi-toisiolähetti, joka mobilisoi Ca²⁺:a solunsisäisistä varastoista zona pellucida -laukaistun akrosomireaktion aikana. Vaaditaan CatSper-välitteisen solunulkoisen Ca²⁺-sisäänvirtauksen rinnalla.",
        evidence: [
          "C1P:n indusoima Ca²⁺-vapautuminen on olennaista zona-laukaistussa akrosomireaktiossa ([[ref:pmc10102357_ceram|Rehfeld ym. 2023]])",
          "Eksogeeninen C1P voi osittain pelastaa heikentyneet akrosomireaktiot subfertiliteettinäytteissä",
          "Vahvistaa kahden Ca²⁺:n mallin: CatSper (ulkoinen) + C1P (sisäinen) molemmat vaaditaan",
        ],
        interpretation: "Hedelmöityskaskadi vaatii kaksi itsenäistä Ca²⁺-lähdettä, jotka toimivat peräkkäin. Tämä kaksoisriippuvuus tekee hedelmöityksestä kaksinkertaisesti haavoittuvan kaikelle kalsiumhomeostaasin häiriölle.",
        level: "M|C",
      },
    ],
    convergenceTitle: "Mitä farmakologiset vertailut paikantavat",
    convergenceLead: "Salpaus, aktivaatio tai palautus voi paikantaa välttämättömän vaiheen nimetyssä koejärjestelmässä. Kanava-alatyyppi, sivukohteet, lähtöfysiologia ja geneettiset verrokit määräävät päätelmän. Alla olevat lääkeryhmät yhdistävät olennaisia fysiologisia prosesseja; ne eivät ole neljätoista riippumatonta vahvistusta yhdelle ympäristösyylle.",
    convergencePoints: [
      "Reitti A (VGCC): CCB:t (23 salpaajatutkimusta), verapamiili (taajuusriippuvainen salpaus), gabapentinoidit (α2δ-modulaatio), nimodipiini (CNS-selektiivinen salpaus), rilutsoli (Ca²⁺-riippuvaisen glutamaatin vapautumisen esto)",
      "Kello- ja hormonitila: litiumiin liittyvä kellosäätely ja melatoniinisignalointi; CRY-määrä, FAD:n sitoutumisaste ja toiminnallinen vaste ovat erillisiä muuttujia.",
      "Ca²⁺-hormeesi/resetointi: Psilosybiini (5-HT2A → kontrolloitu Ca²⁺-pursuke → plastisuusresetti), kofeiini (adenosiini A₁ -antagonismi → kaksivaiheinen Ca²⁺-modulaatio)",
      "Redox-käsittely: CoQ10 GSM-moduloidussa 3,5 GHz:n rottaprotokollassa ([[ref:bektas2026|Bektas 2026]]) sekä melatoniinin reseptori-, kello- ja antioksidanttivaikutukset.",
      "Aineenvaihduntasignalointi: GLP-1-riippuvaiset L-kanavan mikrodomaanit ja ERK; kenttäinteraktio on erillinen kokeellinen ennuste.",
    ],
    convergenceConclusion: "Interventiot rajaavat BERM:n biologisia toteutusehdokkaita. Kliininen hyöty sopii myös EMF:stä riippumattomiin syihin. Erotteleva koe vertaa kenttä−sham-eroa intervention ja verrokin aikana ja testaa ennalta määritellyn aaltomuoto- ja tilariippuvuuden kilpailevia kytkentämalleja vastaan samoilla biologisilla parametreilla. L3/L4-tulokset eivät yksin tunnista ehdollista L2-kytkentää, sen gaugea, mittakaavaa tai kudosydintä.",
    predictionLink: "Ks. Farmakologiset ennusteet (PHARM-1–PHARM-5)",
    predictionHref: "/predictions",
    mechanismLabel: "Mekanismi",
    evidenceLabel: "Näyttö",
    interpretationLabel: "Mallitulkinta",
  },
  ja: {
    title: "薬理学的エビデンス",
    subtitle: "薬理学的介入でチャネル亜型、局所カルシウム、貯蔵、フィードバック、修復を区別する。電磁場に関する各主張には固有の細胞系、波形、シャム比較がある。",
    backLink: "← エビデンスに戻る",
    cardsTitle: "薬剤エビデンスカード",
    cardsLead: "各カードは薬剤クラス、BERM関連経路への作用機序、主要エビデンス、モデル解釈を提示する。エビデンスレベルはBERM分類に従う：E = 実験的、C = 臨床/疫学的、M = 機構的、L = 論理的推論、L* = 推測的。",
    mechanismLabel: "機序",
    evidenceLabel: "エビデンス",
    interpretationLabel: "モデル解釈",
    cards: [
      {
        id: "CCB",
        drug: "カルシウムチャネル遮断薬（CCB）",
        drugSub: "Nifedipine、amlodipine、verapamil、diltiazem",
        mechanism: "L型チャネル遮断は、定義した場応答へのチャネルの寄与を検証できる。同じ介入は正常なカルシウム依存性生理も変えるため、各遮断条件に独自のsham対照が必要である。",
        evidence: [
          "[[ref:pall2013_v2|Pall 2013]]は、カルシウムチャネル遮断薬が場に関連する効果を防止・減弱した23研究を検討した。これは各プロトコルでのチャネル依存性試験を支持する。媒介経路と最初の場センサーを区別するには、サブタイプ、薬剤選択性、初期応答の測定が必要である。",
          "カルシウムチャネル遮断薬の臨床利用はチャネルの生理的重要性を示す。処方や論文の数は最初の場センサーを特定せず、全サブタイプの場感受性を証明せず、細胞プロトコルをヒトの環境曝露へ移行させない。",
          "Amlodipineは消失半減期が長い。他の降圧薬との条件付き比較には、実測曝露、対応する適応、用量、組織内の標的作用が必要である。処方だけでは関連する全チャネルの持続的遮断やEMF保護を示せない。",
          "Nifedipine（VK44/VK48）：早産の第一選択子宮弛緩薬（[[ref:nifed_tocolytic|Cochrane 2014]]）かつ子癇前症の血圧管理にも使用。同一のCa²⁺チャネル遮断薬が2つの異なる産科疾患を治療 — いずれも子宮/胎盤Cav1.2過剰活性化に関与。Ca²⁺遮断が早産を防ぎ子癇前症を治療するなら、Ca²⁺過負荷が病因メカニズムである。",
        ],
        interpretation: "場/shamと遮断薬/対照を組み合わせ、初期電流、カルシウム貯蔵動態、組織機能を測定する。相互作用の変化はその条件でのチャネル依存性を示す。血圧・子宮の臨床効果は生理的関連を、[[ref:bertagna2025|Bertagna 2025]]は場に特異的なER/カルシウム介入を示す。いずれも単独では最初の場センサーを特定しない。",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Verapamil（フェニルアルキルアミンCCB）",
        drugSub: "非ジヒドロピリジン、頻度依存性遮断",
        mechanism: "Verapamilは使用依存性のチャネル遮断を示し、反復開口で阻害が増す場合がある。他の遮断薬との条件付き比較では開口パターン、濃度、サブタイプを測定する。印加場の周波数だけでは同じ速さの開口を示せず、最も有効な場介入とも決められない。",
        evidence: [
          "使用依存性遮断は心臓薬理学で確立している。定義した場実験での意義は実際のチャネル状態と開口動態に依存し、印加波形と同一視せず測定する必要がある。",
          "Lundberg 1996（Bioelectromagnetics）：verapamilが骨細胞でEMF誘発カルシウム流出を遮断 — EMF-カルシウム経路が生殖関連組織で薬理学的に遮断可能であることの直接的証拠。",
          "Verapamilは精子調製プロトコルでカルシウム動態を調節して運動性を改善するためにも生殖医療で使用される。",
          "[[ref:verap_t1d_jama|Forlenza JAMA 2023]]（VK43）：verapamilは新規発症T1D小児でβ細胞機能を維持 — 二重盲検RCT（N=88、7-17歳）で52週目にC-peptide +30% vs プラセボ。VK12を確認：Ca²⁺チャネル遮断がβ細胞を保護するなら、Ca²⁺過負荷がそれを破壊する。",
          "[[ref:verap_t1d_natmed|Ovalle Nat Med 2018]]：verapamilが最近発症T1D成人で3ヶ月および12ヶ月時にTXNIP低下とβ細胞保護を介してC-peptideを増加。",
        ],
        interpretation: "使用依存性遮断は実測した開口パターンでの比較を動機づける。T1D試験はβ細胞保護経路を支持するが、EMF特異的試験にはverapamil/対照下での場/sham比較が追加で必要である。正常分泌の抑制と保護を混同しないよう、分泌、修復、生存性を分けて測定する。",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Lithium",
        drugSub: "気分安定薬、GSK-3β阻害薬、神経保護",
        mechanism: "LithiumはGSK-3βと複数の時計調節過程に作用する。条件付きBERM試験ではCRY量、リガンド占有率、周期、振幅、melatoninの時相を分ける。CRYの増加だけでは時計の強化や機能的場応答の増加を意味しない。[[ref:hirota2012_kl001|Hirota 2012]]では別のCRY安定化化合物KL001が周期を延長し、レポーター振幅を低下させた。これは機序の比較であり、lithiumとKL001の作用が同一という証拠ではない。",
        evidence: [
          "Lithiumに伴う概日周期の変化の報告は時刻を考慮した測定を動機づける（McCarthy 2019, Translational Psychiatry）。すべてを一つのGSK-3β→CRY分解段階へ帰すことはできず、用量、組織、測定する時計出力が重要である。",
          "Lithium治療中の双極性障害患者で報告されたmelatonin変化（Hallam 2005, J. Psychopharmacology）は臨床治療の文脈に属する。場誘発変化の回復を示しておらず、場×lithium試験では位相、振幅、基準値を別々に測定する。",
          "Lithiumに関連するGSK-3β/tau、BDNF、炎症経路は複数の下流評価項目の候補となる。カルシウム依存性生物学との重なりだけでは、すべての効果を一つのEMF因果鎖へ配置できず、治療結果を媒介する経路も特定できない。",
          "飲料水lithiumと自殺（Kapusta 2011）・認知症（Kessing 2017）の関連は観察研究の追跡を動機づける。地域曝露、治療用量、細胞内標的作用は異なる量である。これらの関連は微量濃度でのCRY安定化を測定せず、集団でのEMF保護も示さない。",
        ],
        interpretation: "時計調節とリチウム観察関連は受容状態仮説を動機付けるが、飲料水や気分治療の効果はEMF保護を示さない。CRY量、リガンド占有、周期、電磁場×薬物差を分ける。蛋白安定化が電磁場感受性を増すとは限らない。",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Semaglutide / GLP-1受容体アゴニスト",
        drugSub: "Ozempic、Wegovy、Mounjaro（tirzepatide）",
        mechanism: "[[ref:bhatt2012_glp1|Selway 2012]]では、マウスMIN6細胞のGLP-1によるERK応答にL型チャネルが必要だった。Bay K8644は細胞全体のCa²⁺上昇が検出されなくてもERKを活性化し、速い緩衝剤BAPTAはこの局所応答を阻害したが、遅いEGTAは阻害しなかった。EGTAは初期のGLP-1応答を部分的に減らしたが持続応答は残った。これはチャネル近傍のマイクロドメインを支持し、チャネルの迂回を示さない。電磁場曝露は行われていない。",
        evidence: [
          "GLP-1受容体作動薬の臨床的代謝効果は有用な生理学的介入を示す。その広さだけではEMFを疾患原因と特定できず、電磁場応答の作用部位も定まらない。",
          "[[ref:klimentidis2010|Klimentidisパラドックス（2011、Proc. R. Soc. B）]]：8種24集団すべてが1970年代以降体重が増加（p = 1.2×10⁻⁷）。食事/運動は管理された食事の実験動物の体重増加を説明できない。カルシウム依存性代謝経路に影響する環境因子はBERMと一致。",
          "GLP-1は脳（NTS、視床下部）で発現し、カルシウム依存性シグナリングを介して食欲、報酬、悪心を調節する。",
        ],
        interpretation: "条件付きBERM予測：定義した電磁場でL型チャネル近傍の信号とERKが変わっても、細胞全体のCa²⁺測定は陰性となり得る。同じ時点で速い・遅い緩衝、チャネル阻害、シャムを比較する。セマグルチドが補償するか、その方向は別の薬物×電磁場実験を要する。臨床効果だけでは環境原因を特定できない。",
        level: "L*",
      },
      {
        id: "GABAPENTINOID",
        drug: "Gabapentinoid系薬",
        drugSub: "Gabapentin、pregabalin（Lyrica）",
        mechanism: "Gabapentinoid系薬は電位依存性カルシウムチャネルのα2δサブユニットに結合し、シナプス前終末でのCa²⁺流入を減少させる。これはCCBが標的とするα1孔形成ユニットとは異なるサブユニットである。",
        evidence: [
          "Gabapentinとpregabalinはニューロパシー性疼痛、てんかん、不安に処方される — 神経のカルシウム過興奮性に関与する状態。EMFが神経のカルシウム調節障害（BERM経路A）に寄与するなら、gabapentinoid使用者は無意識に部分的に保護されている可能性がある。",
          "Pregabalinには性欲低下と性機能障害の既知の副作用がある（Calabro 2015）。これは一致する：gabapentinoid系薬はEMF誘発過剰だけでなく正常な生殖ホルモン経路を含むすべてのカルシウム依存性シグナリングを抑制する。",
          "α2δサブユニットは後根神経節と脊髄で豊富に発現する。また視床下部でも発現しGnRHパルス性を調節する可能性がある（BERMレベル7）。",
        ],
        interpretation: "Gabapentinoid系薬はBERMのカルシウムモデルの薬理学的解剖を提供する：CCBとは異なるカルシウムチャネルサブユニットを調節し、部分的に重複するが区別可能な効果を予測する。α2δ調節は神経エンドポイント（疼痛、睡眠、不安）により関連し、α1遮断（CCB）は末梢/生殖エンドポイントにより関連する。",
        level: "M",
      },
      {
        id: "NIMODIPINE-ETH",
        drug: "Nimodipine（L型CCB、CNS選択性）",
        drugSub: "血液脳関門透過性ジヒドロピリジン",
        mechanism: "Nimodipineは血液脳関門を通過する — 他のほとんどのジヒドロピリジンCCBと異なる — そして脳血管系とニューロンのL型VGCCを選択的に遮断する。EMF誘発VGCC活性化が神経変性と認知低下に寄与するなら、CNS選択的CCBは神経保護を提供するはずである。",
        evidence: [
          "Nimodipineはくも膜下出血後の脳血管攣縮予防にFDA承認されている。その神経保護メカニズム（カルシウム介在）はBERMの予測するCNS効果と重複する。",
          "NimodipineのAlzheimer病と血管性認知症への臨床的関心はカルシウムチャネル調節障害が神経変性に寄与することを示唆する。",
          "NimodipineのBBB透過性はEMF効果を末梢（生殖）と中枢（認知、概日）の両方のエンドポイントで同時に減衰できる唯一のCCBにする。",
        ],
        interpretation: "脳に届くL型介入と他の介入の比較は組織曝露と標的作用を調べられる。認知差だけではBBB通過を特定できず、チャネル作用・薬物動態・初期状態も異なる。定義した電磁場/シャム比較が必要。",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "外因性melatonin",
        drugSub: "組織依存の受容体作用を持つ概日信号",
        mechanism: "メラトニンは受容体、概日、酸化還元に作用し、Ca²⁺変化の方向は組織と時点に依存する。ラット小脳顆粒細胞の[[ref:liu2014_mt2|Liu 2014]]では、静止Ca²⁺を増加させず、脱分極によるCa²⁺放出を増やしながら電磁場関連のNa電流増加を抑えた。MT2と細胞内貯蔵がこのフィードバックに関与した。",
        evidence: [
  "[[ref:tbahriti2026|Tbahritiら 2026]]（Sleep Biol Rhythms、55研究のPRISMAシステマティックレビュー）：高品質動物研究の88%がEMF誘発melatonin抑制20–50%を報告。外因性melatoninはこの欠損を補充する。",
  "Melatoninは強力な抗酸化物質でROSを捕捉する — そのホルモン機能とは独立して酸化ストレスカスケード（BERMレベル5A）に直接対抗する。この二重作用（抗酸化 + ホルモン補充）は経路A下流（ROS）と経路B下流（melatonin欠損）の両方に効果的。",
  "Reiterら 2007、2014：動物モデルでのRF誘発酸化損傷に対するmelatoninの保護効果を示す複数のレビュー。用量依存的保護はBERMの回復ウィンドウモデルと一致。",
  "[[ref:liu2014_mt2|Liu 2014]]：50 Hz、1 mT、60分。MT2作動薬・拮抗薬と貯蔵放出への介入で静止Ca、誘発Ca、Na電流を分ける。",
  "[[ref:cajochen2005_melatonin|Cajochen 2005]]：同じ光子束の460/550 nm夕方光でヒトのメラトニン応答が異なった。網膜を介する光・概日結果であり、EMF×MT2相互作用や局所CRYセンサーを試験したものではない。"
],
        interpretation: "誘発Ca²⁺フィードバックの増強とNa電流応答の減少は両立する。生理的メラトニンが同じ組織のMT2ブレーキを働かせる場合に限り、BERMは光×電磁場相互作用を予測する。マイクロモル濃度の細胞実験とヒト夕方光応答の間には用量・組織の橋渡しが必要で、普遍的なCa²⁺低下機構ではない。",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "コエンザイムQ10（CoQ10 / ubiquinone）",
        drugSub: "ミトコンドリア電子伝達体、内因性抗酸化物質",
        mechanism: "BERMは受容準備状態s、修復能力A、損傷Dを分ける。現行モデルの各時間ステップはD_next = max(0, D + g_D·u·s − r_D·A·D)で、生成が負荷を加え、修復が除く。新たな入力がなければ修復はDを増やさない。CoQ10は酸化還元処理の修飾候補だが、この実験はg_D、r_D、修復時定数を推定していない。",
        evidence: [
          "[[ref:bektas2026|Bektas 2026]]は28匹のラットを4群に分け、GSM変調3.5 GHz信号を1日2時間、30日間使用した。CoQ10は一部のホルモン、精巣、酸化還元変化を軽減した。5G NR波形ではない。初期Ca応答や修復時定数は測定しておらず、下流の修復部位や既存損傷の完全回復は特定できない。",
          "CoQ10補充は不妊男性の精子パラメータを改善する（Safarinejad 2012、メタ分析：運動性と濃度改善）。現代の精子減少の一部がEMF介在酸化損傷であるなら、CoQ10の利益はメカニズム的に一致する。",
          "CoQ10レベルは加齢とともに低下 — テストステロン低下と増加する酸化ストレスと同じ時間軸を追跡。加齢によるCoQ10枯渇は修復能力低下によりEMF誘発酸化損傷を増幅する。",
        ],
        interpretation: "電磁場/シャムとCoQ10/溶媒を組み合わせ、初期電流、ミトコンドリア・酸化還元応答、後の組織機能を別々に測る。保護結果は全体応答を制約する。上流調節、負荷生成の減少、除去の改善は中間測定で区別するまで代替仮説として残る。",
        level: "E",
      },
      {
        id: "PSILOCYBIN",
        drug: "Psilocybin（5-HT2Aアゴニスト）",
        drugSub: "トリプタミン系サイケデリック、群発性頭痛の画期的治療",
        mechanism: "Psilocybinは5-HT2A受容体を活性化し、Gq → PLC → IP3 → 細胞内Ca²⁺放出を介してシグナリングする。この制御されたCa²⁺バーストがBDNFと神経可塑性カスケードを開始する。Psilocybinは、BERM経路A/Cが慢性的に妨害するトリプタミンシグナリングシステムをリセットする。",
        evidence: [
          "Psilocybinは群発性頭痛 — 既知で最も重度の疼痛状態 — に劇的な緩和を提供する（Schindler 2015、2021）。これはBERM予測のCa²⁺ホルメシスパターン：単一の大きな制御されたパルスが慢性的低度妨害により病理的になったシステムをリセットする。",
          "PsilocybinはBDNF発現を増加させる（Catlow 2013、Exp Brain Res）。BDNFは慢性EMF曝露によりCaMKII経路妨害を介して抑制される。PsilocybinのBDNFブーストはBERM予測の下流欠損の一つに直接対抗する。",
          "治療抵抗性うつ病に対するFDA画期的治療指定（2018、2019）。うつ病は複数のBERMカスケード（melatonin低下、BDNF低下、serotonin低下、cortisol上昇）の下流にある。",
        ],
        interpretation: "5-HT2Aと可塑性は神経変化への薬理経路を示す。臨床・実験効果は先行原因が慢性EMFであることやCaリセットを証明しない。提案する相互作用には電磁場×介入実験が必要。",
        level: "E|C",
      },
      {
        id: "CAFFEINE",
        drug: "Caffeine（adenosine A₁アンタゴニスト）",
        drugSub: "世界で最も消費される精神活性物質",
        mechanism: "CaffeineはVGCC介在Ca²⁺放出を通常阻害するadenosine A₁受容体を遮断する。逆説的にcaffeineはryanodine受容体（RyR）も直接調節し細胞内Ca²⁺ストアを感作する。正味効果は二相性：中程度の用量はCa²⁺動態修正で覚醒を増加、高用量はCa²⁺過負荷を増強する可能性がある。",
        evidence: [
          "CaffeineのParkinson病およびAlzheimer病に対する神経保護効果（メタ分析：OR 0.7–0.8）は、環境源からの慢性Ca²⁺過負荷に対抗する中程度用量でのCa²⁺調節と一致する。",
          "用量反応曲線は非線形（ホルメシス）である。BERMはこれを導入L3生物応答仮説R_caffeineとして扱い、幾何学的χ_geo関数や未解決L0→L2写像の証拠とはしない。",
          "Caffeineは自由にBBBを通過し半減期3–5時間で、EMFの連続24/7 VGCC活性化と対照的に間欠的Ca²⁺調節を提供する。",
        ],
        interpretation: "アデノシンと貯蔵への作用は用量・時間別プロファイルを動機付ける。コーヒー利用の関連は無意識のEMF損傷治療を示さない。保護の有無や方向を予測する前にチャネル・貯蔵状態と電磁場×カフェイン差を測る。",
        level: "E|M",
      },
      {
        id: "RILUZOLE",
        drug: "Riluzole（glutamate放出阻害薬）",
        drugSub: "2017年以前の唯一のFDA承認ALS治療薬",
        mechanism: "Riluzoleは電位依存性Na⁺チャネルとシナプス前終末からのCa²⁺依存性glutamate放出を阻害する。Glutamate興奮毒性を減少させ、Ca²⁺介在死から運動ニューロンを保護する。これはBERMのALSメカニズム（VK45）に直接対抗する：EMF → VGCC → Ca²⁺上昇 → glutamate放出上昇 → 興奮毒性 → 運動ニューロン死。",
        evidence: [
          "RiluzoleはALS生存を2–3ヶ月延長する（Bensimon 1994、NEJM）。そのメカニズム — Ca²⁺依存性glutamate放出の遮断 — はBERMがEMFにより運動ニューロンで活性化されると予測するまさにその経路を標的とする。",
          "運動ニューロンは低いCa²⁺緩衝能力のため選択的に脆弱（Vanselow & Bhatt 1999）。EMF曝露が全身的であるにもかかわらずALSが特異的に運動ニューロンを標的にする理由を説明する。",
          "リルゾールのNa/グルタミン酸作用とALS臨床効果は調節可能な興奮毒性経路を示すが、EMFを開始原因と特定しない。運動ニューロン系の測定曝露と薬物×電磁場比較が必要で、職業関連は別の証拠として保つ。",
        ],
        interpretation: "リルゾールのNa/グルタミン酸作用とALS臨床効果は調節可能な興奮毒性経路を示すが、EMFを開始原因と特定しない。運動ニューロン系の測定曝露と薬物×電磁場比較が必要で、職業関連は別の証拠として保つ。",
        level: "E|C",
      },
      {
        id: "ISRADIPINE",
        drug: "Isradipine（Cav1.3選択的CCB）",
        drugSub: "Cav1.3優先ジヒドロピリジン、PD神経保護候補",
        mechanism: "IsradipineはCav1.3（L型）チャネルを優先的に遮断する — 黒質ドパミンニューロンで発現する特定のサブタイプ。これらのニューロンは自律的ペースメーキングにCav1.3を独自に依存し、Ca²⁺過負荷に対して選択的に脆弱である。",
        evidence: [
          "疫学データ：ジヒドロピリジンCCB使用者はParkinson病リスクが20–30%低減（Becker 2008、Ritz 2010）。関連は脳透過性CCBに特異的。",
          "Chanら 2007（Nature）：黒質ドパミンニューロンはペースメーキングにCav1.3を使用 — PDにおける選択的脆弱性を説明する。",
          "STEADY-PD III試験（2020、Lancet Neurology）：isradipineは早期PDの臨床進行を遅延しなかった — しかし生物学的根拠は依然有効。",
          "Bhattら 2022（Sci.Adv.）：Cav1.3遮断は前臨床モデルでミトコンドリア酸化ストレス低減を介してドパミンニューロンを保護 — BERMレベル5Aの同一Ca²⁺→mito→ROS経路。",
        ],
        interpretation: "STEADY-PD IIIの陰性結果は臨床効果の陰性試験として保持する。L型生理は亜型・標的作用・組織曝露の測定を動機付けるが、観察関連と機構仮説はヌル試験をBERMの検証やEMF原因の証明に変えない。",
        level: "E|M",
      },
      {
        id: "BUMETANIDE",
        drug: "Bumetanide（NKCC1遮断薬）",
        drugSub: "新生児けいれんとASDに転用されたループ利尿薬",
        mechanism: "BumetanideはNKCC1塩化物輸入体（SLC12A2）を遮断する。新生児脳ではNKCC1優位がGABAを抑制性ではなく興奮性にする — bumetanideは細胞内Cl⁻を低下させてGABAの抑制機能を回復し、Q因子減衰係数γを負（増幅）から正（減衰）に変換する。",
        evidence: [
          "Lemonnier & Ben-Ari 2010：bumetanideが自閉症児の行動を改善 — GABAの極性スイッチ（NKCC1/KCC2比）がASDで異常である可能性の初のエビデンス。",
          "新生児けいれんにおける複数RCT（Pressler 2023、NEMO試験）：phenobarbital抵抗性新生児けいれんの補助療法としてのbumetanide。",
          "Ben-Ari 2014（Neuroscientist）：NKCC1→KCC2塩化物スイッチと神経発達障害における役割の包括的レビュー。スイッチのタイミングはCa²⁺依存性 — 発達期Ca²⁺動態のEMF妨害と一致。",
          "Shakerら 2024：ASDにおけるbumetanideのメタ分析 — 社会的行動の控えめだが一貫した改善。",
        ],
        interpretation: "BumetanideはQ因子モデルの最も極端な予測を直接テストする：新生児の神経学的脆弱性は興奮性GABAに起因する（γ < 0 → Q → ∞）。抑制性GABAの回復（bumetanide → γ > 0）が新生児けいれんとASD症状を改善するなら、興奮性GABA状態は病原性であり、NKCC1→KCC2スイッチを遅延させるもの（発達期のEMF誘発Ca²⁺妨害を含む）は脆弱性を増加させる。",
        level: "E",
      },
      {
        id: "ETHOSUXIMIDE",
        drug: "Ethosuximide（T型Ca²⁺チャネル遮断薬）",
        drugSub: "欠神てんかんの第一選択薬、Cav3.x選択的",
        mechanism: "Ethosuximideは視床皮質ニューロンのT型（Cav3.1/3.2/3.3）カルシウムチャネルを選択的に遮断する。これらの低閾値チャネルは欠神てんかんに特徴的な3 Hz棘徐波振動を生成する。共鳴回路要素を除去することでethosuximideはCa²⁺チャネル機能がけいれん感受性を制御することを直接実証する。",
        evidence: [
          "Ethosuximideは欠神てんかんに最も効果的な薬剤（Glauser 2010、NEJM：直接比較RCTでvalproateとlamotrigineに優越）。T型Ca²⁺チャネルと欠神てんかんへの特異性は精密なチャネル-疾患関係を実証する。",
          "Cav3.2（CACNA1H）機能獲得型変異は小児欠神てんかん家系で見つかる（Chen 2003、Ann Neurol）。遺伝学的および薬理学的エビデンスは同一チャネルに収束する。",
          "T型チャネルはテストステロン生合成（StARタンパク質調節）にも寄与する。Ethosuximideのけいれん制御と生殖内分泌障害の関連 — 同一Ca²⁺チャネルを介する。",
        ],
        interpretation: "T型薬理とCACNA1H実験は亜型別生理仮説を支持する。発作抑制はEMFからテストステロンへの経路の検証ではない。指定した電磁場で遺伝子抑制と薬物を比較し、ステロイド生成と発作生理を別の指標に保つ。",
        level: "E",
      },
      {
        id: "NNC55-0396",
        drug: "NNC 55-0396",
        drugSub: "T型Ca²⁺チャネル遮断薬",
        mechanism: "選択的CatSper/T型VGCCアンタゴニスト。CatSperおよびCav3チャネルを通じたCa²⁺流入を遮断し、受精能獲得関連の超活性化を防止する。",
        evidence: [
          "ヒト精子：NNC 55-0396はCatSper電流を遮断しプロゲステロン誘発Ca²⁺トランジェントを消失させる（[[ref:pmc6104424_nnc|Rennhack et al. 2018]]）",
          "運動性（前進運動A+B）は処理後30分以内に有意に低下",
          "先体反応が阻害 — 精子は透明帯を貫通できない",
        ],
        interpretation: "化学的CatSper遮断はBERMがEMF曝露から予測する正確な表現型を再現する：運動可能だが航行も受精もできない精子。",
        level: "E",
      },
      {
        id: "A23187",
        drug: "A23187",
        drugSub: "Ca²⁺イオノフォア（カルシマイシン）",
        mechanism: "膜にCa²⁺透過性の細孔を作ることでCatSperを完全にバイパスする。チャネルゲーティングに依存せず受精能獲得様のCa²⁺流入を強制する。",
        evidence: [
          "CatSperノックアウトマウス精子のIVFにおいて受精を救済（[[ref:scirep2016_ionophore|Sci.Rep. 2016]]）",
          "卵子活性化不全の症例で生殖補助医療に臨床使用",
          "イオノフォア後のCa²⁺動態も重要 — 振動のない持続的高Ca²⁺は超活性化を障害する",
        ],
        interpretation: "チャネルのバイパスが受精を救済するなら、チャネル自体がボトルネックである — CatSperがBERMの特定する単一障害点であることと一致する。",
        level: "E",
      },
      {
        id: "RU1968",
        drug: "RU1968",
        drugSub: "セラミド-1-リン酸アナログ",
        mechanism: "細胞内Ca²⁺動員を介した透明帯誘発先体反応を調節するセラミド-1-リン酸シグナリングを阻害する。",
        evidence: [
          "受精能獲得済みヒト精子の透明帯誘発先体反応を阻害（[[ref:pmc10102357_ceram|Rehfeld et al. 2023]]）",
          "自発的先体反応には影響しない — 受容体介在経路に特異的",
          "先体反応に2つのCa²⁺シグナルが必要であることを実証：CatSper（細胞外）+ C1P（細胞内貯蔵）",
        ],
        interpretation: "先体反応は精密な二重シグナルCa²⁺カスケードに依存する。いずれかのシグナルのEMF撹乱 — CatSperまたは細胞内貯蔵 — が最終受精ステップを阻害する。",
        level: "M|C",
      },
      {
        id: "C1P",
        drug: "Ceramide-1-phosphate",
        drugSub: "スフィンゴ脂質シグナリング媒介因子",
        mechanism: "透明帯誘発先体反応時に細胞内貯蔵からCa²⁺を動員する内因性脂質セカンドメッセンジャー。CatSper介在性細胞外Ca²⁺流入と併せて必要。",
        evidence: [
          "C1P誘導Ca²⁺放出は透明帯誘発先体反応に不可欠（[[ref:pmc10102357_ceram|Rehfeld et al. 2023]]）",
          "外因性C1Pはサブファータイルサンプルの障害された先体反応を部分的に救済できる",
          "二重Ca²⁺モデルを確認：CatSper（外部）+ C1P（内部）の両方が必要",
        ],
        interpretation: "受精カスケードは順次動作する2つの独立したCa²⁺源を必要とする。この二重依存性はカルシウム恒常性のあらゆる撹乱に対して受精を二重に脆弱にする。",
        level: "M|C",
      },
    ],
    convergenceTitle: "薬理学的比較が特定できるもの",
    convergenceLead: "阻害、活性化、回復実験は特定系の必要な段階を位置付ける。チャネル亜型、副標的、基礎生理、遺伝学的対照が推論を決める。以下の薬剤群は関連する生理過程を結ぶが、一つの環境原因の14件の独立確認ではない。",
    convergencePoints: [
      "経路A（VGCC）：CCB（23遮断研究）、verapamil（頻度依存性遮断）、gabapentinoid系（α2δ調節）、nimodipine（CNS選択的遮断）、riluzole（Ca²⁺依存性glutamate放出阻害）",
      "時計とホルモン：リチウムに関連する時計調節とメラトニン信号。CRY量、FAD占有率、機能応答を区別する。",
      "Ca²⁺ホルメシス/リセット：Psilocybin（5-HT2A → 制御Ca²⁺バースト → 可塑性リセット）、caffeine（adenosine A₁拮抗 → 二相性Ca²⁺調節）",
      "酸化還元処理：GSM変調3.5 GHzラット実験のCoQ10（[[ref:bektas2026|Bektas 2026]]）とメラトニンの受容体・時計・抗酸化作用。",
      "代謝信号：GLP-1依存のL型チャネル微小領域とERK。電磁場相互作用は別の実験予測。",
    ],
    convergenceConclusion: "介入はBERMの生物学的実装候補を制約する。臨床効果はEMFと無関係な原因にも適合する。識別実験では介入/対照における電磁場−シャム差を比較し、共通の生物学的パラメータで競合する結合モデルの事前規定した波形・状態依存性を試す。L3/L4結果だけでは条件付きL2結合、ゲージ、スケール、組織カーネルは特定できない。",
    predictionLink: "参照：薬理学的予測（PHARM-1からPHARM-5）",
    predictionHref: "/predictions",
  },
  fr: {
    title: "Preuves pharmacologiques",
    subtitle: "Les interventions pharmacologiques distinguent le sous-type de canal, le calcium local, les réserves, la rétroaction et la réparation. Chaque résultat lié au champ conserve son système cellulaire, sa forme d’onde et son témoin sham.",
    backLink: "← Retour aux preuves",
    cardsTitle: "Fiches de preuves médicamenteuses",
    cardsLead: "Chaque fiche présente une classe de médicaments, son mécanisme d'action sur la voie BERM pertinente, les preuves clés et l'interprétation du modèle. Les niveaux de preuve suivent la classification BERM : E = expérimental, C = clinique/épidémiologique, M = mécanistique, L = inférence logique, L* = candidat déductif et falsifiable.",
    mechanismLabel: "Mécanisme",
    evidenceLabel: "Preuve",
    interpretationLabel: "Interprétation du modèle",
    cards: [
      {
        id: "CCB",
        drug: "Inhibiteurs calciques (CCB)",
        drugSub: "Nifédipine, amlodipine, vérapamil, diltiazem",
        mechanism: "Le blocage des canaux L permet de tester leur contribution à une réponse au champ définie. Il modifie aussi la physiologie calcique normale : chaque condition avec bloqueur nécessite son propre témoin sham.",
        evidence: [
          "[[ref:pall2013_v2|Pall 2013]] examine 23 études rapportant une prévention ou une atténuation d’effets associés au champ par des bloqueurs calciques. Cela motive des tests de dépendance au canal dans ces protocoles. Sous-type, sélectivité du bloqueur et réponses précoces restent nécessaires pour distinguer médiation et premier capteur du champ.",
          "L’utilisation clinique des bloqueurs calciques établit l’importance physiologique des canaux. Ni les prescriptions ni le nombre de publications n’identifient le premier capteur du champ, ne démontrent une sensibilité de tous les sous-types ou ne transposent un protocole cellulaire à l’exposition humaine ambiante.",
          "L’amlodipine possède une longue demi-vie d’élimination. Une comparaison conditionnelle avec d’autres antihypertenseurs nécessite exposition mesurée, indications comparables, dose et engagement de la cible tissulaire ; une prescription seule ne démontre ni blocage continu de tous les canaux pertinents ni protection EMF.",
          "La nifédipine (VK44/VK48) : tocolytique de première intention pour le travail prématuré ([[ref:nifed_tocolytic|Cochrane 2014]]) ET utilisée pour la gestion de l'hypertension de pré-éclampsie. Le même bloqueur de canal Ca²⁺ traite deux conditions obstétricales distinctes — les deux impliquant une suractivation utérine/placentaire de Cav1.2.",
        ],
        interpretation: "Croiser champ/sham et bloqueur/témoin, puis mesurer courant précoce, dynamique des réserves calciques et fonction tissulaire. Une interaction modifiée indique une dépendance au canal dans ce contexte. Les effets cliniques vasculaires ou utérins ancrent la pertinence physiologique ; [[ref:bertagna2025|Bertagna 2025]] fournit une intervention ER/calcium spécifique au champ. Aucun ne suffit à identifier le premier capteur.",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Vérapamil (CCB phénylalkylamine)",
        drugSub: "Non-dihydropyridine, blocage fréquence-dépendant",
        mechanism: "Le vérapamil présente un blocage dépendant de l’usage : l’inhibition peut augmenter avec les ouvertures répétées du canal. Une comparaison conditionnelle avec un autre bloqueur doit mesurer ouvertures, concentration et sous-type. La fréquence du champ appliqué ne démontre pas une fréquence d’ouverture identique et ne désigne pas le vérapamil comme intervention la plus efficace.",
        evidence: [
          "Le blocage dépendant de l’usage est établi en pharmacologie cardiaque. Son intérêt pour une expérience de champ dépend de l’état réel du canal et de sa cinétique d’ouverture, à mesurer plutôt qu’à assimiler à la forme d’onde appliquée.",
          "Lundberg 1996 (Bioelectromagnetics) : le vérapamil a bloqué l'efflux calcique induit par EMF dans les cellules osseuses — preuve directe que la voie EMF-calcium est pharmacologiquement blocable.",
          "Le vérapamil est aussi utilisé en médecine reproductive pour les protocoles de préparation des spermatozoïdes, améliorant la motilité via la modulation de la dynamique calcique.",
          "[[ref:verap_t1d_jama|Forlenza JAMA 2023]] (VK43) : le vérapamil préserve la fonction des cellules β chez les enfants atteints de DT1 nouvellement diagnostiqué — C-peptide +30 % vs placebo à 52 semaines dans un RCT en double aveugle (N=88, 7-17 ans).",
          "[[ref:verap_t1d_natmed|Ovalle Nat Med 2018]] : le vérapamil augmente le C-peptide à 3 et 12 mois chez les adultes avec DT1 récent via la réduction de TXNIP et la protection des cellules β.",
        ],
        interpretation: "Le blocage dépendant de l’usage motive une comparaison aux ouvertures mesurées. Les essais DT1 soutiennent une branche de protection des cellules β ; un test EMF exige aussi champ/sham sous vérapamil/témoin. Mesurer séparément sécrétion, réparation et viabilité pour distinguer protection et suppression de la sécrétion normale.",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Lithium",
        drugSub: "Stabilisateur d'humeur, inhibiteur GSK-3β, neuroprotecteur",
        mechanism: "Le lithium agit sur GSK-3β et plusieurs processus de régulation de l’horloge. Un test BERM conditionnel distingue quantité CRY, occupation du ligand, période, amplitude et rythme de mélatonine. Plus de CRY ne signifie pas automatiquement une horloge plus forte ou une réponse fonctionnelle au champ accrue : [[ref:hirota2012_kl001|Hirota 2012]] observe que KL001, autre composé stabilisant CRY, allonge la période tout en réduisant l’amplitude du rapporteur. Cette comparaison mécanistique ne démontre pas des effets identiques du lithium et de KL001.",
        evidence: [
          "Les changements de période rapportés avec le lithium motivent des mesures temporelles (McCarthy 2019, Translational Psychiatry). Ils ne peuvent être attribués universellement à une seule étape GSK-3β→dégradation CRY : dose, tissu et sortie de l’horloge mesurée comptent.",
          "Les variations de mélatonine rapportées chez des patients bipolaires sous lithium (Hallam 2005, J. Psychopharmacology) concernent un traitement clinique. Elles ne démontrent pas l’inversion d’une variation induite par un champ ; une expérience champ×lithium doit mesurer séparément phase, amplitude et niveau initial.",
          "Les voies GSK-3β/tau, BDNF et inflammatoires associées au lithium proposent plusieurs critères en aval. Leur recoupement avec la biologie calcique ne place pas tous les effets dans une seule chaîne causale EMF et n’identifie pas la voie médiatrice d’un résultat thérapeutique.",
          "Les associations entre lithium de l’eau et suicide (Kapusta 2011) ou démence (Kessing 2017) motivent un suivi observationnel. Exposition régionale, dose thérapeutique et engagement intracellulaire sont des quantités distinctes. Ces associations ne mesurent pas une stabilisation CRY aux concentrations traces et ne démontrent pas une protection EMF de la population.",
        ],
        interpretation: "La régulation de l’horloge et les associations au lithium motivent une hypothèse d’état récepteur. Ni l’eau de boisson ni les effets thymiques ne démontrent une protection EMF. Mesurer séparément quantité CRY, occupation du ligand, période et contraste champ×médicament ; stabiliser la protéine ne garantit pas plus de sensibilité au champ.",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Sémaglutide / agonistes du récepteur GLP-1",
        drugSub: "Ozempic, Wegovy, Mounjaro (tirzépatide)",
        mechanism: "[[ref:bhatt2012_glp1|Selway 2012]] montre que la réponse ERK au GLP-1 dans les cellules MIN6 murines nécessite les canaux L. Bay K8644 active ERK sans hausse détectable du Ca²⁺ moyen ; le tampon rapide BAPTA bloque ce signal local, contrairement au tampon lent EGTA. EGTA réduit partiellement la réponse précoce au GLP-1 mais préserve la réponse prolongée. Cela soutient un microdomaine du canal, pas son contournement. Aucune exposition électromagnétique n’était appliquée.",
        evidence: [
          "Les bénéfices métaboliques cliniques des agonistes GLP-1 constituent des interventions physiologiques utiles. Leur étendue n’identifie ni les EMF comme cause des maladies traitées, ni le site d’action dans une réponse au champ.",
          "[[ref:klimentidis2010|Le paradoxe de Klimentidis (2011, Proc. R. Soc. B)]] : 24 populations de 8 espèces ont toutes pris du poids depuis les années 1970 (p = 1,2×10⁻⁷). Le régime/exercice ne peut expliquer la prise de poids d'animaux de laboratoire sous régime contrôlé.",
          "Le GLP-1 est exprimé dans le cerveau (NTS, hypothalamus) où il module l'appétit, la récompense et la nausée via la signalisation calcium-dépendante.",
        ],
        interpretation: "Prédiction BERM conditionnelle : un champ défini pourrait modifier le microdomaine L et ERK malgré un résultat négatif du Ca²⁺ moyen. Comparer tampons rapides/lents, inhibition du canal et sham aux mêmes temps. Une compensation par le sémaglutide et son sens nécessitent une expérience médicament×champ distincte ; l’efficacité clinique n’identifie pas une cause environnementale.",
        level: "L*",
      },
      {
        id: "GABAPENTINOID",
        drug: "Gabapentinoïdes",
        drugSub: "Gabapentine, prégabaline (Lyrica)",
        mechanism: "Les gabapentinoïdes se lient à la sous-unité α2δ des canaux calciques voltage-dépendants, réduisant l'influx Ca²⁺ aux terminaux présynaptiques. Ce n'est PAS la même sous-unité que l'unité α1 formant le pore ciblée par les CCB.",
        evidence: [
          "La gabapentine et la prégabaline sont prescrites pour la douleur neuropathique, l'épilepsie et l'anxiété — des conditions impliquant l'hyperexcitabilité calcique neuronale. Si les EMF contribuent à la dérégulation calcique neuronale (voie A de BERM), les utilisateurs de gabapentinoïdes pourraient être inadvertamment partiellement protégés.",
          "La prégabaline a un effet secondaire connu de baisse de libido et de dysfonction sexuelle (Calabrò 2015) — cohérent avec la suppression de TOUTE signalisation calcium-dépendante, y compris les voies hormonales reproductives normales.",
          "La sous-unité α2δ est fortement exprimée dans les ganglions spinaux et la moelle épinière. Elle est aussi exprimée dans l'hypothalamus, où elle pourrait moduler la pulsatilité GnRH (niveau 7 de BERM).",
        ],
        interpretation: "Les gabapentinoïdes fournissent une dissection pharmacologique du modèle calcique de BERM : ils modulent une sous-unité différente de celle des CCB, prédisant des effets partiellement chevauchants mais distinguables. La modulation α2δ est plus pertinente pour les critères neuraux tandis que le blocage α1 (CCB) est plus pertinent pour les critères périphériques/reproductifs.",
        level: "M",
      },
      {
        id: "NIMODIPINE-ETH",
        drug: "Nimodipine (CCB L-type, sélectif du SNC)",
        drugSub: "Dihydropyridine avec pénétration de la BHE",
        mechanism: "La nimodipine traverse la barrière hémato-encéphalique — contrairement à la plupart des autres CCB dihydropyridines — et bloque préférentiellement les VGCC L-type dans la vascularisation cérébrale et les neurones.",
        evidence: [
          "La nimodipine est approuvée par la FDA pour la prévention du vasospasme cérébral après hémorragie sous-arachnoïdienne. Son mécanisme neuroprotecteur (médié par le calcium) chevauche les effets CNS prédits par BERM.",
          "L'intérêt clinique continu pour la nimodipine dans la maladie d'Alzheimer et la démence vasculaire suggère que la dérégulation des canaux calciques contribue à la neurodégénérescence.",
          "La pénétration BHE de la nimodipine en fait le seul CCB qui pourrait théoriquement atténuer les effets EMF à la fois sur les critères périphériques (reproductifs) et centraux (cognitifs, circadiens) simultanément.",
        ],
        interpretation: "Comparer des interventions L accessibles au cerveau et d’autres peut tester l’exposition tissulaire et l’engagement de cible. Une différence cognitive seule n’isole pas la pénétration BBB : activité du canal, pharmacocinétique et état initial diffèrent aussi. Un contraste champ/sham défini est nécessaire.",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "Mélatonine exogène",
        drugSub: "Signal circadien aux effets réceptoriels dépendants du tissu",
        mechanism: "La mélatonine agit sur les récepteurs, l’horloge et le redox ; le sens du calcium dépend du tissu et du moment. Dans des neurones granulaires cérébelleux de rat, [[ref:liu2014_mt2|Liu 2014]] observe moins d’augmentation du courant sodique liée au champ mais davantage de libération de Ca²⁺ évoquée par dépolarisation, sans hausse du Ca²⁺ au repos. MT2 et les réserves intracellulaires participent à cette rétroaction.",
        evidence: [
  "[[ref:tbahriti2026|Tbahriti et al. 2026]] (Sleep Biol Rhythms, revue systématique PRISMA de 55 études) : 88 % des études animales de haute qualité rapportent une suppression de la mélatonine de 20–50 %. La mélatonine exogène remplacerait ce déficit.",
  "La mélatonine est un puissant antioxydant qui piège les ROS — contrecarrant directement la cascade de stress oxydatif (niveau 5A de BERM) indépendamment de sa fonction hormonale. Cette double action (antioxydant + remplacement hormonal) la rend efficace contre la voie A en aval (ROS) et la voie B en aval (déficit de mélatonine).",
  "Reiter et al. 2007, 2014 : multiples revues démontrant les effets protecteurs de la mélatonine contre les dommages oxydatifs induits par RF dans les modèles animaux.",
  "[[ref:liu2014_mt2|Liu 2014]] : 50 Hz, 1 mT, 60 min ; agoniste/antagoniste MT2 et interventions sur les réserves séparent Ca au repos, Ca évoqué et courant sodique.",
  "[[ref:cajochen2005_melatonin|Cajochen 2005]] : 460 et 550 nm le soir, à flux photonique égal, donnent des réponses humaines de mélatonine différentes. Ce résultat rétinien et circadien ne teste ni une interaction EMF×MT2 ni un récepteur CRY local."
],
        interpretation: "Une rétroaction calcique évoquée plus forte peut donc accompagner une réponse sodique plus faible. BERM prédit une interaction lumière×champ seulement si la mélatonine physiologique mobilise ce frein MT2 dans le tissu défini. La dose micromolaire cellulaire et la réponse humaine à la lumière du soir nécessitent un pont de dose et de tissu ; ce n’est pas un mécanisme universel de baisse du Ca²⁺.",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "Coenzyme Q10 (CoQ10 / ubiquinone)",
        drugSub: "Transporteur d'électrons mitochondrial, antioxydant endogène",
        mechanism: "BERM sépare disponibilité du récepteur s, capacité de réparation A et dommage D. Chaque pas de temps du modèle actuel donne D_next = max(0, D + g_D·u·s − r_D·A·D) : la production ajoute une charge, la réparation la retire. Sans nouvelle entrée, la réparation ne peut augmenter D. CoQ10 est un modificateur candidat du redox ; cette étude n’estime ni g_D, ni r_D, ni une constante de réparation.",
        evidence: [
          "[[ref:bektas2026|Bektas 2026]] étudie 28 rats en quatre groupes avec un signal de 3,5 GHz à modulation GSM, 2 h/jour pendant 30 jours. Le CoQ10 atténue certaines modifications hormonales, testiculaires et redox. Il ne s’agit pas d’une forme d’onde 5G NR. La réponse calcique précoce et les constantes de réparation n’ont pas été mesurées : le résultat n’isole pas un site de réparation en aval et ne démontre pas la réversion complète de lésions établies.",
          "La supplémentation en CoQ10 améliore les paramètres spermatiques chez les hommes subfertiles (Safarinejad 2012, méta-analyse : amélioration de la motilité et concentration).",
          "Les niveaux de CoQ10 diminuent avec l'âge — suivant la même chronologie que le déclin de testostérone et le stress oxydatif croissant.",
        ],
        interpretation: "Croiser champ/sham avec CoQ10/véhicule et mesurer séparément courant précoce, réponse mitochondriale/redox et fonction tissulaire tardive. La protection observée contraint la réponse totale. Modulation en amont, réduction de la production et amélioration de l’élimination restent possibles jusqu’aux mesures intermédiaires.",
        level: "E",
      },
      {
        id: "PSILOCYBIN",
        drug: "Psilocybine (agoniste 5-HT2A)",
        drugSub: "Psychédélique tryptamine, percée dans l'algie vasculaire de la face",
        mechanism: "La psilocybine active les récepteurs 5-HT2A, qui signalent via Gq → PLC → IP3 → libération intracellulaire de Ca²⁺. Ce burst contrôlé de Ca²⁺ déclenche les cascades BDNF et de plasticité neurale. La psilocybine réinitialise le système de signalisation tryptamine que les voies A/C de BERM perturbent chroniquement.",
        evidence: [
          "La psilocybine fournit un soulagement dramatique de l'algie vasculaire de la face — la condition douloureuse la plus sévère connue — à des doses produisant un seul burst contrôlé 5-HT2A→Ca²⁺ (Schindler 2015, 2021). C'est le pattern d'hormèse Ca²⁺ prédit par BERM.",
          "La psilocybine augmente l'expression du BDNF (Catlow 2013, Exp Brain Res). Le BDNF est supprimé par l'exposition EMF chronique via la perturbation de la voie CaMKII.",
          "Désignation de thérapie de percée FDA pour la dépression résistante au traitement (2018, 2019). La dépression est en aval de multiples cascades BERM.",
        ],
        interpretation: "Le signal 5-HT2A et la plasticité situent une voie pharmacologique de changement neural. Leurs effets ne démontrent ni une agression initiale EMF chronique ni une réinitialisation calcique. Une expérience champ×intervention doit identifier cette interaction proposée.",
        level: "E|C",
      },
      {
        id: "CAFFEINE",
        drug: "Caféine (antagoniste adénosine A₁)",
        drugSub: "Substance psychoactive la plus consommée au monde",
        mechanism: "La caféine bloque les récepteurs adénosine A₁, qui inhibent normalement la libération de Ca²⁺ médiée par VGCC. Paradoxalement, la caféine module aussi directement les récepteurs ryanodine (RyR), sensibilisant les réserves intracellulaires de Ca²⁺. L'effet net est biphasique : doses modérées augmentent la vigilance ; doses élevées peuvent potentialiser la surcharge Ca²⁺.",
        evidence: [
          "Les effets neuroprotecteurs de la caféine contre Parkinson et Alzheimer (méta-analyses : OR 0,7–0,8) sont cohérents avec la modulation Ca²⁺ à doses modérées s'opposant à la surcharge chronique.",
          "La courbe dose-réponse est non linéaire (hormèse). BERM la traite comme l’hypothèse L3 importée de réponse biologique R_caffeine, non comme la fonction géométrique χ_geo ni comme une preuve de son application L0→L2 ouverte.",
          "La caféine traverse librement la BHE avec une demi-vie de 3–5 heures, fournissant une modulation Ca²⁺ intermittente — contrastant avec l'activation VGCC continue 24/7 des EMF.",
        ],
        interpretation: "Les effets sur l’adénosine et les réserves motivent des profils selon dose et horaire. Les associations au café ne démontrent pas une automédication inconsciente de lésions EMF. Mesurer l’état canal/réserves et le contraste champ×caféine avant de prévoir une protection ou son sens.",
        level: "E|M",
      },
      {
        id: "RILUZOLE",
        drug: "Riluzole (inhibiteur de la libération de glutamate)",
        drugSub: "Seul traitement SLA approuvé par la FDA avant 2017",
        mechanism: "Le riluzole inhibe les canaux Na⁺ voltage-dépendants et la libération de glutamate Ca²⁺-dépendante des terminaux présynaptiques. En réduisant l'excitotoxicité du glutamate, il protège les motoneurones de la mort médiée par Ca²⁺. Ceci s'oppose directement au mécanisme SLA de BERM (VK45).",
        evidence: [
          "Le riluzole prolonge la survie SLA de 2–3 mois (Bensimon 1994, NEJM). Son mécanisme — blocage de la libération de glutamate Ca²⁺-dépendante — cible exactement la voie que BERM prédit être activée par EMF dans les motoneurones.",
          "Les motoneurones sont sélectivement vulnérables en raison de leur faible capacité de tampon Ca²⁺ (Vanselow & Bhatt 1999). Ceci explique pourquoi la SLA cible spécifiquement les motoneurones malgré une exposition EMF systémique.",
          "Les effets sodium/glutamate du riluzole et son bénéfice clinique dans la SLA ancrent une voie excitotoxique modifiable, sans identifier les EMF comme cause initiale. Il faut une exposition mesurée et un contraste médicament×champ dans les motoneurones ; l’association professionnelle reste distincte.",
        ],
        interpretation: "Les effets sodium/glutamate du riluzole et son bénéfice clinique dans la SLA ancrent une voie excitotoxique modifiable, sans identifier les EMF comme cause initiale. Il faut une exposition mesurée et un contraste médicament×champ dans les motoneurones ; l’association professionnelle reste distincte.",
        level: "E|C",
      },
      {
        id: "ISRADIPINE",
        drug: "Isradipine (CCB sélectif Cav1.3)",
        drugSub: "Dihydropyridine avec préférence Cav1.3, candidat neuroprotection PD",
        mechanism: "L'isradipine bloque préférentiellement les canaux Cav1.3 (L-type) — le sous-type spécifique exprimé dans les neurones dopaminergiques de la substance noire. Ces neurones dépendent uniquement de Cav1.3 pour le pacemaking autonome, les rendant sélectivement vulnérables à la surcharge Ca²⁺.",
        evidence: [
          "Données épidémiologiques : les utilisateurs de CCB dihydropyridines montrent un risque de Parkinson réduit de 20–30 % (Becker 2008, Ritz 2010). L'association est spécifique aux CCB pénétrant le cerveau.",
          "Chan et al. 2007 (Nature) : les neurones dopaminergiques de la substance noire utilisent Cav1.3 pour le pacemaking — la dépendance unique aux canaux Ca²⁺ L-type explique leur vulnérabilité sélective dans la MP.",
          "Essai STEADY-PD III (2020, Lancet Neurology) : l'isradipine n'a pas ralenti la progression clinique dans la MP précoce — mais le rationnel biologique reste valide.",
          "Bhatt et al. 2022 (Sci.Adv.) : le blocage Cav1.3 protège les neurones dopaminergiques dans les modèles précliniques via la réduction du stress oxydatif mitochondrial.",
        ],
        interpretation: "Le résultat négatif de STEADY-PD III reste un test clinique négatif. La physiologie L motive l’étude du sous-type, de l’engagement de cible et de l’exposition tissulaire ; les associations et un mécanisme plausible ne transforment pas cet essai nul en validation de BERM ou d’une cause EMF.",
        level: "E|M",
      },
      {
        id: "BUMETANIDE",
        drug: "Bumétanide (bloqueur NKCC1)",
        drugSub: "Diurétique de l'anse réutilisé pour les convulsions néonatales et les TSA",
        mechanism: "Le bumétanide bloque l'importeur de chlorure NKCC1 (SLC12A2). Dans le cerveau néonatal, la dominance NKCC1 rend le GABA excitateur au lieu d'inhibiteur — le bumétanide inverse cela en abaissant le Cl⁻ intracellulaire, restaurant la fonction inhibitrice du GABA.",
        evidence: [
          "Lemonnier & Ben-Ari 2010 : le bumétanide a amélioré le comportement autistique chez les enfants — première preuve que le commutateur de polarité GABA (ratio NKCC1/KCC2) pourrait être anormal dans les TSA.",
          "Multiples RCT dans les convulsions néonatales (Pressler 2023, essai NEMO) : bumétanide en thérapie adjuvante pour les convulsions néonatales résistantes au phénobarbital.",
          "Ben-Ari 2014 (Neuroscientist) : revue complète du commutateur chlorure NKCC1→KCC2 et son rôle dans les troubles neurodéveloppementaux. Le timing du commutateur est Ca²⁺-dépendant.",
          "Shaker et al. 2024 : méta-analyse du bumétanide dans les TSA — amélioration modeste mais constante du comportement social.",
        ],
        interpretation: "Le bumétanide teste directement la prédiction la plus extrême du modèle du facteur Q : que la vulnérabilité neurologique néonatale provient du GABA excitateur (γ < 0 → Q → ∞). Si la restauration du GABA inhibiteur améliore les convulsions néonatales et les symptômes TSA, alors l'état GABA excitateur est pathogène.",
        level: "E",
      },
      {
        id: "ETHOSUXIMIDE",
        drug: "Éthosuximide (bloqueur de canal Ca²⁺ T-type)",
        drugSub: "Première intention pour l'épilepsie absence, sélectif Cav3.x",
        mechanism: "L'éthosuximide bloque sélectivement les canaux calciques T-type (Cav3.1/3.2/3.3) dans les neurones thalamocorticaux. Ces canaux à seuil bas génèrent l'oscillation pointe-onde 3 Hz caractéristique de l'épilepsie absence.",
        evidence: [
          "L'éthosuximide est le médicament le plus efficace pour l'épilepsie absence (Glauser 2010, NEJM : supérieur au valproate et à la lamotrigine en RCT comparatif). Sa spécificité pour les canaux Ca²⁺ T-type et pour l'épilepsie absence démontre une relation canal-maladie précise.",
          "Des variants gain-de-fonction Cav3.2 (CACNA1H) sont trouvés dans les familles avec épilepsie absence de l'enfant (Chen 2003, Ann Neurol). Les preuves génétiques et pharmacologiques convergent sur le même canal.",
          "Les canaux T-type contribuent aussi à la biosynthèse de testostérone (régulation de la protéine StAR). La connexion entre le contrôle des convulsions et la perturbation endocrine reproductive — via le même canal Ca²⁺.",
        ],
        interpretation: "La pharmacologie T et les expériences CACNA1H soutiennent des hypothèses par sous-type. Le contrôle des crises ne valide pas une voie EMF–testostérone. Comparer inhibition génétique et médicaments dans un protocole défini ; stéroïdogenèse et crises restent des critères distincts.",
        level: "E",
      },
      {
        id: "NNC55-0396",
        drug: "NNC 55-0396",
        drugSub: "Bloqueur des canaux Ca²⁺ de type T",
        mechanism: "Antagoniste sélectif CatSper/VGCC de type T. Bloque l'entrée de Ca²⁺ par les canaux CatSper et Cav3, empêchant l'hyperactivation associée à la capacitation.",
        evidence: [
          "Spermatozoïdes humains : NNC 55-0396 bloque le courant CatSper et abolit les transitoires Ca²⁺ induits par la progestérone ([[ref:pmc6104424_nnc|Rennhack et al. 2018]])",
          "La motilité (progressive A+B) diminue significativement dans les 30 min suivant le traitement",
          "Réaction acrosomique bloquée — les spermatozoïdes ne peuvent pas pénétrer la zone pellucide",
        ],
        interpretation: "Le blocage chimique de CatSper reproduit exactement le phénotype que BERM prédit de l'exposition aux EMF : des spermatozoïdes mobiles qui ne peuvent ni naviguer ni féconder.",
        level: "E",
      },
      {
        id: "A23187",
        drug: "A23187",
        drugSub: "Ionophore Ca²⁺ (calcimycine)",
        mechanism: "Contourne entièrement CatSper en créant des pores perméables au Ca²⁺ dans la membrane. Force un influx de Ca²⁺ de type capacitation indépendant du gating du canal.",
        evidence: [
          "Sauve la fécondation des spermatozoïdes de souris knock-out CatSper par FIV ([[ref:scirep2016_ionophore|Sci.Rep. 2016]])",
          "Utilisé cliniquement en reproduction assistée pour les cas d'échec d'activation ovocytaire",
          "La dynamique du Ca²⁺ après l'ionophore reste importante — un Ca²⁺ élevé soutenu sans oscillation altère l'hyperactivation",
        ],
        interpretation: "Si le contournement du canal sauve la fécondation, le canal lui-même est le goulot d'étranglement — cohérent avec CatSper étant le point de défaillance unique identifié par BERM.",
        level: "E",
      },
      {
        id: "RU1968",
        drug: "RU1968",
        drugSub: "Analogue du céramide-1-phosphate",
        mechanism: "Inhibe la signalisation du céramide-1-phosphate, qui régule la réaction acrosomique induite par la zone pellucide via la mobilisation intracellulaire du Ca²⁺.",
        evidence: [
          "Bloque la réaction acrosomique induite par la zona dans les spermatozoïdes humains capacités ([[ref:pmc10102357_ceram|Rehfeld et al. 2023]])",
          "N'affecte pas la réaction acrosomique spontanée — spécifique à la voie médiée par le récepteur",
          "Démontre que la réaction acrosomique nécessite deux signaux Ca²⁺ : CatSper (extracellulaire) + C1P (réserves intracellulaires)",
        ],
        interpretation: "La réaction acrosomique dépend d'une cascade Ca²⁺ précise à deux signaux. La perturbation EMF de l'un ou l'autre signal — CatSper ou réserves intracellulaires — bloque l'étape finale de fécondation.",
        level: "M|C",
      },
      {
        id: "C1P",
        drug: "Ceramide-1-phosphate",
        drugSub: "Médiateur de signalisation sphingolipidique",
        mechanism: "Second messager lipidique endogène qui mobilise le Ca²⁺ des réserves intracellulaires lors de la réaction acrosomique déclenchée par la zone pellucide. Requis en parallèle de l'entrée de Ca²⁺ extracellulaire médiée par CatSper.",
        evidence: [
          "La libération de Ca²⁺ induite par C1P est essentielle pour la réaction acrosomique déclenchée par la zona ([[ref:pmc10102357_ceram|Rehfeld et al. 2023]])",
          "Le C1P exogène peut partiellement sauver les réactions acrosomiques altérées dans les échantillons subfertiles",
          "Confirme le modèle double Ca²⁺ : CatSper (externe) + C1P (interne) — les deux sont requis",
        ],
        interpretation: "La cascade de fécondation nécessite deux sources indépendantes de Ca²⁺ opérant en séquence. Cette double dépendance rend la fécondation doublement vulnérable à toute perturbation de l'homéostasie calcique.",
        level: "M|C",
      },
    ],
    convergenceTitle: "Ce que les contrastes pharmacologiques identifient",
    convergenceLead: "Blocage, activation ou restauration peuvent situer une étape nécessaire dans un système défini. Sous-type, cibles secondaires, physiologie initiale et contrôles génétiques déterminent l’inférence. Les classes ci-dessous relient des processus pertinents ; elles ne sont pas quatorze confirmations indépendantes d’une cause environnementale.",
    convergencePoints: [
      "Voie A (VGCC) : CCB (23 études de blocage), vérapamil (blocage fréquence-dépendant), gabapentinoïdes (modulation α2δ), nimodipine (blocage CNS-sélectif), riluzole (inhibition de la libération de glutamate Ca²⁺-dépendante)",
      "État hormonal et circadien : régulation liée au lithium et signal mélatoninergique ; quantité de CRY, occupation FAD et réponse fonctionnelle restent distinctes.",
      "Hormèse/réinitialisation Ca²⁺ : Psilocybine (5-HT2A → burst Ca²⁺ contrôlé → réinitialisation plasticité), caféine (antagonisme adénosine A₁ → modulation Ca²⁺ biphasique)",
      "Traitement redox : CoQ10 dans un protocole de rat à 3,5 GHz modulé GSM ([[ref:bektas2026|Bektas 2026]]) et effets réceptoriels, circadiens et antioxydants de la mélatonine.",
      "Signal métabolique : microdomaines L dépendants du GLP-1 et ERK ; l’interaction avec le champ est une prédiction expérimentale distincte.",
    ],
    convergenceConclusion: "Ces interventions contraignent les réalisations biologiques candidates de BERM. Le bénéfice clinique convient aussi à des causes sans EMF. Un test discriminant compare champ−sham sous intervention et témoin, puis confronte la dépendance préspécifiée à l’onde et à l’état aux modèles de couplage concurrents avec les mêmes paramètres biologiques. Les résultats L3/L4 n’identifient pas seuls le couplage L2 conditionnel, sa jauge, son échelle ou son noyau tissulaire.",
    predictionLink: "Voir : Prédictions pharmacologiques (PHARM-1 à PHARM-5)",
    predictionHref: "/predictions",
  },
  ko: {
    title: "약리학적 증거",
    subtitle: "약리학적 개입은 채널 아형, 국소 칼슘, 저장고, 피드백과 복구를 구별한다. 각 장 관련 주장은 해당 세포계, 파형과 sham 비교를 유지한다.",
    backLink: "← 증거로 돌아가기",
    cardsTitle: "약물 증거 카드",
    cardsLead: "각 카드는 약물 클래스, BERM 관련 경로에 대한 작용 메커니즘, 주요 증거, 모델 해석을 제시한다. 증거 수준은 BERM 분류를 따른다: E = 실험적, C = 임상/역학적, M = 메커니즘적, L = 논리적 추론, L* = 연역적이고 반증 가능한 후보.",
    mechanismLabel: "기전",
    evidenceLabel: "증거",
    interpretationLabel: "모델 해석",
    cards: [
      {
        id: "CCB",
        drug: "칼슘채널차단제(CCB)",
        drugSub: "Nifedipine, amlodipine, verapamil, diltiazem",
        mechanism: "L형 채널 차단은 정의된 장 반응에서 해당 채널의 기여를 시험할 수 있다. 같은 개입은 정상 칼슘 의존 생리도 바꾸므로 각 차단 조건에는 자체 sham 대조군이 필요하다.",
        evidence: [
          "[[ref:pall2013_v2|Pall 2013]]은 칼슘채널 차단제가 장 관련 효과를 예방하거나 줄였다고 보고한 23개 연구를 검토했다. 이는 해당 프로토콜에서 채널 의존성을 시험할 근거다. 매개 경로와 최초 장 센서를 구별하려면 아형, 약물 선택성, 초기 반응을 측정해야 한다.",
          "칼슘채널 차단제의 임상 사용은 채널의 생리적 중요성을 보여 준다. 처방이나 논문 수는 최초 장 센서를 확인하지 않고, 모든 아형의 장 민감성을 증명하지 않으며, 세포 프로토콜을 사람의 환경 노출로 옮기지 않는다.",
          "Amlodipine은 제거 반감기가 길다. 다른 항고혈압제와의 조건부 비교에는 측정된 노출, 대응 적응증, 용량, 조직 표적 작용이 필요하다. 처방만으로 모든 관련 채널의 지속 차단이나 EMF 보호가 입증되지는 않는다.",
          "Nifedipine(VK44/VK48): 조기진통의 1차 자궁이완제([[ref:nifed_tocolytic|Cochrane 2014]]) 및 자간전증 혈압 관리에도 사용. 동일 Ca²⁺ 채널 차단제가 2개의 서로 다른 산과 질환을 치료 — 둘 다 자궁/태반 Cav1.2 과활성화 관련.",
        ],
        interpretation: "장/sham과 차단제/대조군을 교차하고 초기 전류, 칼슘 저장고 동역학, 조직 기능을 측정한다. 상호작용 변화는 그 조건에서의 채널 의존성을 나타낸다. 임상 혈압·자궁 효과는 생리적 관련성을, [[ref:bertagna2025|Bertagna 2025]]는 장 특이적 ER/칼슘 개입을 제공한다. 어느 것도 단독으로 최초 장 센서를 확인하지 않는다.",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Verapamil(phenylalkylamine CCB)",
        drugSub: "비디히드로피리딘, 빈도 의존적 차단",
        mechanism: "Verapamil은 사용 의존적 채널 차단을 보이며 반복 개방에 따라 억제가 커질 수 있다. 다른 차단제와의 조건부 비교에는 개방 패턴, 농도, 아형 측정이 필요하다. 가한 장의 주파수만으로 같은 속도의 채널 개방을 알 수 없으며 가장 효과적인 장 개입으로 정할 수도 없다.",
        evidence: [
          "사용 의존 차단은 심장 약리학에서 확립되어 있다. 정의된 장 실험에서의 의미는 실제 채널 상태와 개방 동역학에 달려 있으므로 가한 파형과 동일시하지 말고 측정해야 한다.",
          "Lundberg 1996(Bioelectromagnetics): verapamil이 골세포에서 EMF 유도 칼슘 유출을 차단 — EMF-칼슘 경로가 생식 관련 조직에서 약리학적으로 차단 가능하다는 직접 증거.",
          "Verapamil은 칼슘 역학을 조절하여 운동성을 개선하는 정자 준비 프로토콜에서 생식의학에서도 사용된다.",
          "[[ref:verap_t1d_jama|Forlenza JAMA 2023]](VK43): verapamil이 신규 발병 T1D 소아에서 β세포 기능 보존 — 이중맹검 RCT(N=88, 7-17세)에서 52주 시점 C-peptide +30% vs 위약.",
          "[[ref:verap_t1d_natmed|Ovalle Nat Med 2018]]: verapamil이 최근 발병 T1D 성인에서 TXNIP 감소와 β세포 보호를 통해 3개월 및 12개월에 C-peptide 증가.",
        ],
        interpretation: "사용 의존 차단은 측정한 채널 개방 패턴에서의 비교를 뒷받침한다. T1D 시험은 β세포 보호 경로를 지지하지만 EMF 특이적 시험에는 verapamil/대조군 아래 장/sham 비교가 추가로 필요하다. 정상 분비 억제를 보호와 혼동하지 않도록 분비, 복구, 생존성을 따로 측정한다.",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Lithium",
        drugSub: "기분안정제, GSK-3β 억제제, 신경보호",
        mechanism: "Lithium은 GSK-3β와 여러 시계 조절 과정에 작용한다. 조건부 BERM 시험은 CRY 양, 리간드 점유, 주기, 진폭, melatonin 시점을 구분한다. CRY가 많다고 시계가 강해지거나 기능적 장 반응이 커지는 것은 아니다. [[ref:hirota2012_kl001|Hirota 2012]]에서 별도의 CRY 안정화 화합물 KL001은 주기를 늘리면서 리포터 진폭을 줄였다. 이는 기전 비교이며 lithium과 KL001의 효과가 같다는 증거가 아니다.",
        evidence: [
          "Lithium에서 보고된 일주기 주기 변화는 시간별 측정을 뒷받침한다(McCarthy 2019, Translational Psychiatry). 이를 보편적으로 하나의 GSK-3β→CRY 분해 단계에 돌릴 수는 없으며 용량, 조직, 측정한 시계 출력이 중요하다.",
          "Lithium으로 치료한 양극성 장애 환자의 melatonin 변화 보고(Hallam 2005, J. Psychopharmacology)는 임상 치료 맥락이다. 장에 의한 변화의 회복을 입증하지 않으며 장×lithium 실험에서 위상, 진폭, 기저값을 따로 측정해야 한다.",
          "Lithium 관련 GSK-3β/tau, BDNF 및 염증 경로는 여러 하위 평가변수 후보를 제공한다. 칼슘 의존 생물학과 겹친다는 이유만으로 모든 효과를 하나의 EMF 인과 사슬에 놓거나 치료 결과의 매개 경로를 확인할 수는 없다.",
          "음용수 lithium과 자살(Kapusta 2011), 치매(Kessing 2017)의 연관은 관찰 연구 후속 조사를 뒷받침한다. 지역 노출, 치료 용량, 세포 내 표적 작용은 다른 양이다. 이 연관은 미량 농도에서 CRY 안정화를 측정하지 않으며 인구 수준 EMF 보호도 입증하지 않는다.",
        ],
        interpretation: "시계 조절과 리튬 관찰 연관성은 수용 상태 가설을 동기화하지만 음용수나 기분 치료 효과가 EMF 보호를 입증하지 않는다. CRY 양, 리간드 점유, 주기와 장×약물 대비를 분리한다. 단백질 안정화가 장 민감도 증가를 보장하지 않는다.",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Semaglutide / GLP-1 수용체 작용제",
        drugSub: "Ozempic, Wegovy, Mounjaro(tirzepatide)",
        mechanism: "[[ref:bhatt2012_glp1|Selway 2012]]에서 생쥐 MIN6 세포의 GLP-1 ERK 반응에는 L형 채널이 필요했다. Bay K8644는 세포 전체 Ca²⁺ 상승이 검출되지 않아도 ERK를 활성화했으며, 빠른 BAPTA는 이 국소 신호를 차단했지만 느린 EGTA는 차단하지 않았다. EGTA는 초기 GLP-1 반응을 일부 줄였으나 지속 반응은 보존했다. 이는 채널 미세영역을 지지하며 채널 우회를 뜻하지 않는다. 전자기장 노출 실험은 아니었다.",
        evidence: [
          "GLP-1 수용체 작용제의 임상적 대사 이점은 유용한 생리적 개입을 보여준다. 이점의 폭은 치료 대상의 원인이 EMF임을 밝히거나 장 반응의 작용 지점을 특정하지 않는다.",
          "[[ref:klimentidis2010|Klimentidis 패러독스(2011, Proc. R. Soc. B)]]: 8종 24개 집단이 모두 1970년대 이후 체중 증가(p = 1.2x10⁻⁷). 식이/운동은 통제된 식이의 실험동물 체중 증가를 설명하지 못한다.",
          "GLP-1은 뇌(NTS, 시상하부)에서 발현되어 칼슘 의존적 신호를 통해 식욕, 보상, 구역을 조절한다.",
        ],
        interpretation: "조건부 BERM 예측: 정의된 장이 L형 채널 미세영역과 ERK를 바꾸어도 세포 전체 Ca²⁺ 측정은 음성일 수 있다. 같은 시점에서 빠른/느린 완충, 채널 억제와 sham을 비교한다. 세마글루티드의 보상 여부와 방향은 별도의 약물×장 실험이 필요하며 임상 효과만으로 환경 원인을 특정할 수 없다.",
        level: "L*",
      },
      {
        id: "GABAPENTINOID",
        drug: "Gabapentinoid계 약물",
        drugSub: "Gabapentin, pregabalin(Lyrica)",
        mechanism: "Gabapentinoid계 약물은 전압 의존성 칼슘 채널의 α2δ 소단위에 결합하여 시냅스 전 말단에서 Ca²⁺ 유입을 감소시킨다. 이는 CCB가 표적으로 하는 α1 공극 형성 단위와 동일한 소단위가 아니다.",
        evidence: [
          "Gabapentin과 pregabalin은 신경병증 통증, 간질, 불안에 처방된다 — 신경 칼슘 과흥분성과 관련된 상태. EMF가 신경 칼슘 조절 장애(BERM 경로 A)에 기여한다면, gabapentinoid 사용자는 무의식적으로 부분적으로 보호될 수 있다.",
          "Pregabalin은 성욕 감소와 성기능 장애의 알려진 부작용이 있다(Calabro 2015) — 이는 일치한다: gabapentinoid계는 EMF 유도 과잉뿐 아니라 정상 생식 호르몬 경로를 포함한 모든 칼슘 의존적 신호를 억제한다.",
          "α2δ 소단위는 후근 신경절과 척수에서 풍부하게 발현된다. 시상하부에서도 발현되어 GnRH 박동성을 조절할 수 있다(BERM 레벨 7).",
        ],
        interpretation: "Gabapentinoid계 약물은 BERM의 칼슘 모델의 약리학적 해부를 제공한다: CCB와 다른 칼슘 채널 소단위를 조절하여 부분적으로 중복되지만 구별 가능한 효과를 예측한다.",
        level: "M",
      },
      {
        id: "NIMODIPINE-ETH",
        drug: "Nimodipine(L형 CCB, CNS 선택적)",
        drugSub: "혈액뇌장벽 투과 디히드로피리딘",
        mechanism: "Nimodipine은 혈액뇌장벽을 통과한다 — 다른 대부분의 디히드로피리딘 CCB와 달리 — 뇌혈관과 뉴런의 L형 VGCC를 선택적으로 차단한다.",
        evidence: [
          "Nimodipine은 지주막하 출혈 후 뇌혈관 연축 예방에 FDA 승인되어 있다. 그 신경보호 메커니즘(칼슘 매개)은 BERM이 예측하는 CNS 효과와 중복된다.",
          "Alzheimer병과 혈관성 치매에 대한 nimodipine의 지속적 임상적 관심은 칼슘 채널 조절 장애가 신경퇴행에 기여함을 시사한다.",
          "Nimodipine의 BBB 투과성은 EMF 효과를 말초(생식)와 중추(인지, 일주기) 평가변수 모두에서 동시에 감쇠할 수 있는 유일한 CCB로 만든다.",
        ],
        interpretation: "뇌 접근 L형 개입과 다른 개입 비교는 조직 노출과 표적 작용을 시험한다. 인지 차이만으로 BBB 통과를 특정할 수 없으며 채널 활동·약동학·기저 상태도 다르다. 정의된 장/sham 비교가 필요하다.",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "외인성 melatonin",
        drugSub: "조직에 따라 수용체 효과가 다른 일주기 신호",
        mechanism: "멜라토닌의 수용체·일주기·산화환원 효과에서 칼슘 방향은 조직과 시점에 따라 다르다. 쥐 소뇌 과립세포의 [[ref:liu2014_mt2|Liu 2014]]는 안정 Ca²⁺를 높이지 않으면서 탈분극 유발 Ca²⁺ 방출을 늘리고 장 관련 Na 전류 증가를 줄였다. MT2와 세포 내 저장고가 피드백에 관여했다.",
        evidence: [
  "[[ref:tbahriti2026|Tbahriti 등 2026]](Sleep Biol Rhythms, 55개 연구의 PRISMA 체계적 리뷰): 고품질 동물 연구의 88%가 EMF 유도 melatonin 억제 20-50% 보고. 외인성 melatonin이 이 결손을 보충한다.",
  "Melatonin은 ROS를 포착하는 강력한 항산화제 — 호르몬 기능과 독립적으로 산화 스트레스 연쇄반응(BERM 레벨 5A)에 직접 대항한다.",
  "Reiter 등 2007, 2014: 동물 모델에서 RF 유도 산화 손상에 대한 melatonin의 보호 효과를 보여주는 다수의 리뷰.",
  "[[ref:liu2014_mt2|Liu 2014]]: 50 Hz, 1 mT, 60분. MT2 작용제/길항제와 저장고 방출 개입으로 안정 Ca, 유발 Ca와 Na 전류를 구별한다.",
  "[[ref:cajochen2005_melatonin|Cajochen 2005]]: 같은 광자속의 저녁 460/550 nm 빛에서 사람 멜라토닌 반응이 달랐다. 망막 빛–일주기 결과이며 EMF×MT2 상호작용이나 국소 CRY 감지기를 시험하지 않았다."
],
        interpretation: "더 강한 유발 칼슘 피드백과 더 작은 Na 전류 반응이 함께 나타날 수 있다. 생리적 멜라토닌이 해당 조직에서 같은 MT2 제동을 작동시킬 때에만 BERM은 빛×장 상호작용을 예측한다. 마이크로몰 세포 실험과 사람의 저녁 빛 반응 사이에는 용량·조직 연결이 필요하며 보편적 Ca²⁺ 감소 기전은 아니다.",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "코엔자임 Q10(CoQ10 / ubiquinone)",
        drugSub: "미토콘드리아 전자 운반체, 내인성 항산화제",
        mechanism: "BERM은 수용 준비도 s, 복구 용량 A와 손상 D를 구별한다. 현재 모델의 각 시간 단계는 D_next = max(0, D + g_D·u·s − r_D·A·D)로, 생성이 부하를 더하고 복구가 제거한다. 새 입력이 없으면 복구는 D를 늘리지 않는다. CoQ10은 산화환원 처리의 후보 조절자지만 이 연구는 g_D, r_D 또는 복구 시상수를 추정하지 않는다.",
        evidence: [
          "[[ref:bektas2026|Bektas 2026]]는 쥐 28마리를 네 군으로 나누어 GSM 변조 3.5 GHz 신호를 하루 2시간씩 30일 사용했다. CoQ10은 일부 호르몬·고환·산화환원 변화를 완화했다. 5G NR 파형은 아니었다. 초기 칼슘 반응과 복구 시상수는 측정하지 않아 하류 복구 지점을 특정하거나 이미 생긴 손상의 완전한 회복을 입증하지 않는다.",
          "CoQ10 보충은 불임 남성의 정자 매개변수를 개선한다(Safarinejad 2012, 메타분석: 운동성과 농도 개선).",
          "CoQ10 수준은 노화와 함께 감소 — testosterone 감소와 증가하는 산화 스트레스와 동일한 시간 축을 추적한다.",
        ],
        interpretation: "장/sham×CoQ10/용매를 비교하고 초기 전류, 미토콘드리아·산화환원 반응, 후기 조직 기능을 별도로 측정한다. 관찰된 보호는 전체 반응을 제약한다. 상류 조절, 부하 생성 감소, 제거 개선은 중간 측정이 구별하기 전까지 대안으로 남는다.",
        level: "E",
      },
      {
        id: "PSILOCYBIN",
        drug: "Psilocybin(5-HT2A 작용제)",
        drugSub: "트립타민계 환각제, 군발두통 돌파적 치료",
        mechanism: "Psilocybin은 Gq → PLC → IP3 → 세포 내 Ca²⁺ 방출을 통해 신호하는 5-HT2A 수용체를 활성화한다. 이 제어된 Ca²⁺ 분출이 BDNF와 신경 가소성 연쇄반응을 개시한다. Psilocybin은 BERM 경로 A/C가 만성적으로 교란하는 트립타민 신호 시스템을 리셋한다.",
        evidence: [
          "Psilocybin은 군발두통 — 알려진 가장 심각한 통증 상태 — 에 극적 완화를 제공한다(Schindler 2015, 2021). 이는 BERM이 예측하는 Ca²⁺ 호르메시스 패턴이다.",
          "Psilocybin은 BDNF 발현을 증가시킨다(Catlow 2013, Exp Brain Res). BDNF는 만성 EMF 노출에 의해 CaMKII 경로 교란을 통해 억제된다.",
          "치료 저항성 우울증에 대한 FDA 혁신적 치료 지정(2018, 2019). 우울증은 다수의 BERM 연쇄반응의 하류에 있다.",
        ],
        interpretation: "5-HT2A와 가소성은 신경 변화의 약리 경로를 제시한다. 임상·실험 효과는 선행 원인이 만성 EMF임이나 칼슘 재설정을 증명하지 않는다. 제안 상호작용은 장×개입 실험으로 식별해야 한다.",
        level: "E|C",
      },
      {
        id: "CAFFEINE",
        drug: "Caffeine(adenosine A₁ 길항제)",
        drugSub: "세계에서 가장 많이 소비되는 향정신성 물질",
        mechanism: "Caffeine은 VGCC 매개 Ca²⁺ 방출을 정상적으로 억제하는 adenosine A₁ 수용체를 차단한다. 역설적으로 caffeine은 ryanodine 수용체(RyR)도 직접 조절하여 세포 내 Ca²⁺ 저장소를 감작시킨다. 순 효과는 이상성: 중간 용량은 Ca²⁺ 역학 수정으로 각성 증가; 고용량은 Ca²⁺ 과부하를 강화할 수 있다.",
        evidence: [
          "Caffeine의 Parkinson병 및 Alzheimer병에 대한 신경보호 효과(메타분석: OR 0.7-0.8)는 환경 원천의 만성 Ca²⁺ 과부하에 대항하는 중간 용량 Ca²⁺ 조절과 일치한다.",
          "용량-반응 곡선은 비선형(호르메시스)이다. BERM은 이를 도입된 L3 생물학적 반응 가설 R_caffeine으로 다루며, 기하학적 χ_geo 함수나 열린 L0→L2 매핑의 증거로 다루지 않는다.",
          "Caffeine은 BBB를 자유롭게 통과하며 반감기 3-5시간으로, EMF의 연속 24/7 VGCC 활성화와 대조적으로 간헐적 Ca²⁺ 조절을 제공한다.",
        ],
        interpretation: "아데노신과 저장고 작용은 용량·시점별 프로파일을 동기화한다. 커피 연관성이 무의식적 EMF 손상 치료를 입증하지 않는다. 보호 여부와 방향을 예측하기 전에 채널/저장고 상태와 장×카페인 대비를 측정한다.",
        level: "E|M",
      },
      {
        id: "RILUZOLE",
        drug: "Riluzole(glutamate 방출 억제제)",
        drugSub: "2017년 이전 유일한 FDA 승인 ALS 치료제",
        mechanism: "Riluzole은 전압 의존성 Na⁺ 채널과 시냅스 전 말단에서의 Ca²⁺ 의존적 glutamate 방출을 억제한다. Glutamate 흥분독성을 감소시켜 운동뉴런을 Ca²⁺ 매개 사멸로부터 보호한다. 이는 BERM의 ALS 메커니즘(VK45)에 직접 대항한다.",
        evidence: [
          "Riluzole은 ALS 생존을 2-3개월 연장한다(Bensimon 1994, NEJM). 그 메커니즘 — Ca²⁺ 의존적 glutamate 방출 차단 — 은 BERM이 EMF에 의해 운동뉴런에서 활성화된다고 예측하는 바로 그 경로를 표적으로 한다.",
          "운동뉴런은 낮은 Ca²⁺ 완충 능력으로 인해 선택적으로 취약하다(Vanselow & Bhatt 1999). EMF 노출이 전신적임에도 ALS가 특이적으로 운동뉴런을 표적으로 하는 이유를 설명한다.",
          "릴루졸의 Na/글루탐산 작용과 ALS 임상 이점은 조절 가능한 흥분독성 경로를 지지하지만 EMF를 시작 원인으로 특정하지 않는다. 운동뉴런계의 측정 노출과 약물×장 비교가 필요하며 직업 연관성은 별도 증거다.",
        ],
        interpretation: "릴루졸의 Na/글루탐산 작용과 ALS 임상 이점은 조절 가능한 흥분독성 경로를 지지하지만 EMF를 시작 원인으로 특정하지 않는다. 운동뉴런계의 측정 노출과 약물×장 비교가 필요하며 직업 연관성은 별도 증거다.",
        level: "E|C",
      },
      {
        id: "ISRADIPINE",
        drug: "Isradipine(Cav1.3 선택적 CCB)",
        drugSub: "Cav1.3 선호 디히드로피리딘, PD 신경보호 후보",
        mechanism: "Isradipine은 Cav1.3(L형) 채널을 우선적으로 차단한다 — 흑질 도파민 뉴런에서 발현되는 특정 아형. 이 뉴런들은 자율적 박동 조율에 Cav1.3를 고유하게 의존하여 Ca²⁺ 과부하에 선택적으로 취약하다.",
        evidence: [
          "역학 데이터: 디히드로피리딘 CCB 사용자는 Parkinson병 위험이 20-30% 감소(Becker 2008, Ritz 2010). 연관은 뇌 투과성 CCB에 특이적.",
          "Chan 등 2007(Nature): 흑질 도파민 뉴런은 박동 조율에 Cav1.3를 사용 — PD에서의 선택적 취약성을 설명하는 L형 Ca²⁺ 채널 고유 의존.",
          "STEADY-PD III 시험(2020, Lancet Neurology): isradipine은 초기 PD의 임상 진행을 늦추지 못했으나 생물학적 근거는 유효.",
          "Bhatt 등 2022(Sci.Adv.): Cav1.3 차단이 미토콘드리아 산화 스트레스 감소를 통해 전임상 모델에서 도파민 뉴런을 보호.",
        ],
        interpretation: "STEADY-PD III의 음성 결과는 임상 효능의 음성 시험으로 유지한다. L형 생리는 아형·표적 작용·조직 노출 검사를 동기화하지만 관찰 연관성과 기전 가설이 무효 시험을 BERM 검증이나 EMF 원인 증명으로 바꾸지는 않는다.",
        level: "E|M",
      },
      {
        id: "BUMETANIDE",
        drug: "Bumetanide(NKCC1 차단제)",
        drugSub: "신생아 경련과 ASD에 재목적화된 루프 이뇨제",
        mechanism: "Bumetanide는 NKCC1 염소 수입체(SLC12A2)를 차단한다. 신생아 뇌에서 NKCC1 우세는 GABA를 억제성이 아닌 흥분성으로 만든다 — bumetanide는 세포 내 Cl⁻를 낮추어 GABA의 억제 기능을 회복한다.",
        evidence: [
          "Lemonnier & Ben-Ari 2010: bumetanide가 자폐 아동의 행동 개선 — GABA 극성 전환(NKCC1/KCC2 비율)이 ASD에서 비정상일 수 있다는 최초 증거.",
          "신생아 경련의 다수 RCT(Pressler 2023, NEMO 시험): phenobarbital 저항성 신생아 경련의 보조 요법으로 bumetanide.",
          "Ben-Ari 2014(Neuroscientist): NKCC1→KCC2 염소 전환과 신경발달 장애에서의 역할에 대한 포괄적 리뷰. 전환 타이밍은 Ca²⁺ 의존적.",
          "Shaker 등 2024: ASD에서 bumetanide의 메타분석 — 사회적 행동의 소폭이지만 일관된 개선.",
        ],
        interpretation: "Bumetanide는 Q 인자 모델의 가장 극단적 예측을 직접 테스트한다: 신생아 신경학적 취약성이 흥분성 GABA에서 기인(γ < 0 → Q → ∞). 억제성 GABA 회복이 신생아 경련과 ASD 증상을 개선한다면 흥분성 GABA 상태는 병원성이다.",
        level: "E",
      },
      {
        id: "ETHOSUXIMIDE",
        drug: "Ethosuximide(T형 Ca²⁺ 채널 차단제)",
        drugSub: "결신 간질의 1차 선택약, Cav3.x 선택적",
        mechanism: "Ethosuximide는 시상피질 뉴런의 T형(Cav3.1/3.2/3.3) 칼슘 채널을 선택적으로 차단한다. 이 저역치 채널은 결신 간질 특징적인 3 Hz 극파-서파 진동을 생성한다.",
        evidence: [
          "Ethosuximide는 결신 간질에 가장 효과적인 약물(Glauser 2010, NEJM: 직접 비교 RCT에서 valproate와 lamotrigine보다 우수). T형 Ca²⁺ 채널과 결신 간질에 대한 특이성은 정밀한 채널-질병 관계를 입증.",
          "Cav3.2(CACNA1H) 기능 획득 변이체가 소아 결신 간질 가계에서 발견(Chen 2003, Ann Neurol). 유전학적 및 약리학적 증거가 동일 채널에 수렴.",
          "T형 채널은 testosterone 생합성(StAR 단백질 조절)에도 기여. 경련 조절과 생식 내분비 교란의 연결 — 동일 Ca²⁺ 채널을 통해.",
        ],
        interpretation: "T형 약리와 CACNA1H 실험은 아형별 생리 가설을 지지한다. 발작 억제는 EMF–테스토스테론 경로를 검증하지 않는다. 지정한 장 프로토콜에서 유전자 억제와 약물을 비교하고 스테로이드 생성과 발작은 별도 지표로 유지한다.",
        level: "E",
      },
      {
        id: "NNC55-0396",
        drug: "NNC 55-0396",
        drugSub: "T형 Ca²⁺ 채널 차단제",
        mechanism: "선택적 CatSper/T형 VGCC 길항제. CatSper 및 Cav3 채널을 통한 Ca²⁺ 유입을 차단하여 수정능 획득 관련 과활성화를 방지한다.",
        evidence: [
          "인간 정자: NNC 55-0396은 CatSper 전류를 차단하고 프로게스테론 유도 Ca²⁺ 과도현상을 소멸시킴 ([[ref:pmc6104424_nnc|Rennhack et al. 2018]])",
          "운동성(전진운동 A+B)이 처리 후 30분 이내에 유의하게 감소",
          "첨체 반응 차단 — 정자가 투명대를 관통할 수 없음",
        ],
        interpretation: "화학적 CatSper 차단은 BERM이 EMF 노출로부터 예측하는 정확한 표현형을 재현한다: 운동 가능하지만 항행하거나 수정할 수 없는 정자.",
        level: "E",
      },
      {
        id: "A23187",
        drug: "A23187",
        drugSub: "Ca²⁺ 이오노포어 (칼시마이신)",
        mechanism: "막에 Ca²⁺ 투과성 기공을 만들어 CatSper를 완전히 우회한다. 채널 게이팅에 독립적으로 수정능 획득 유사 Ca²⁺ 유입을 강제한다.",
        evidence: [
          "CatSper 녹아웃 마우스 정자의 IVF에서 수정을 구제 ([[ref:scirep2016_ionophore|Sci.Rep. 2016]])",
          "난자 활성화 실패 사례에서 보조생식에 임상적으로 사용",
          "이오노포어 후 Ca²⁺ 동역학이 여전히 중요 — 진동 없는 지속적 고 Ca²⁺는 과활성화를 손상",
        ],
        interpretation: "채널 우회가 수정을 구제한다면 채널 자체가 병목점이다 — CatSper가 BERM이 식별한 단일 장애점이라는 것과 일치한다.",
        level: "E",
      },
      {
        id: "RU1968",
        drug: "RU1968",
        drugSub: "세라마이드-1-인산 유사체",
        mechanism: "세포 내 Ca²⁺ 동원을 통해 투명대 유도 첨체 반응을 조절하는 세라마이드-1-인산 신호전달을 억제한다.",
        evidence: [
          "수정능 획득된 인간 정자에서 투명대 유도 첨체 반응을 차단 ([[ref:pmc10102357_ceram|Rehfeld et al. 2023]])",
          "자발적 첨체 반응에는 영향 없음 — 수용체 매개 경로에 특이적",
          "첨체 반응에 두 가지 Ca²⁺ 신호가 필요함을 입증: CatSper(세포 외) + C1P(세포 내 저장소)",
        ],
        interpretation: "첨체 반응은 정밀한 이중 신호 Ca²⁺ 연쇄반응에 의존한다. 어느 한 신호의 EMF 교란 — CatSper 또는 세포 내 저장소 — 이 최종 수정 단계를 차단한다.",
        level: "M|C",
      },
      {
        id: "C1P",
        drug: "Ceramide-1-phosphate",
        drugSub: "스핑고지질 신호전달 매개체",
        mechanism: "투명대 유발 첨체 반응 시 세포 내 저장소에서 Ca²⁺를 동원하는 내인성 지질 제2 전령. CatSper 매개 세포 외 Ca²⁺ 유입과 함께 필요하다.",
        evidence: [
          "C1P 유도 Ca²⁺ 방출은 투명대 유발 첨체 반응에 필수적 ([[ref:pmc10102357_ceram|Rehfeld et al. 2023]])",
          "외인성 C1P는 저수정능 시료의 손상된 첨체 반응을 부분적으로 구제할 수 있음",
          "이중 Ca²⁺ 모델 확인: CatSper(외부) + C1P(내부) 모두 필요",
        ],
        interpretation: "수정 연쇄반응은 순차적으로 작동하는 두 개의 독립적 Ca²⁺ 원천을 필요로 한다. 이 이중 의존성은 칼슘 항상성의 모든 교란에 대해 수정을 이중으로 취약하게 만든다.",
        level: "M|C",
      },
    ],
    convergenceTitle: "약리학적 비교가 식별하는 것",
    convergenceLead: "억제·활성화·복원은 특정 실험계에서 필요한 단계를 찾는다. 채널 아형, 부차 표적, 기저 생리와 유전적 대조가 추론을 결정한다. 아래 약물군은 관련 생리 과정을 연결하지만 한 환경 원인의 독립적인 확인 14개가 아니다.",
    convergencePoints: [
      "경로 A(VGCC): CCB(23개 차단 연구), verapamil(빈도 의존적 차단), gabapentinoid계(α2δ 조절), nimodipine(CNS 선택적 차단), riluzole(Ca²⁺ 의존적 glutamate 방출 억제)",
      "시계·호르몬 상태: 리튬 관련 시계 조절과 멜라토닌 신호. CRY 양, FAD 점유와 기능 반응은 별개다.",
      "Ca²⁺ 호르메시스/리셋: Psilocybin(5-HT2A → 제어된 Ca²⁺ 분출 → 가소성 리셋), caffeine(adenosine A₁ 길항 → 이상성 Ca²⁺ 조절)",
      "산화환원 처리: GSM 변조 3.5 GHz 쥐 프로토콜의 CoQ10([[ref:bektas2026|Bektas 2026]])과 멜라토닌의 수용체·시계·항산화 작용.",
      "대사 신호: GLP-1 의존 L형 채널 미세영역과 ERK. 장 상호작용은 별도의 실험 예측이다.",
    ],
    convergenceConclusion: "개입은 BERM의 생물학적 구현 후보를 제약한다. 임상 이점은 EMF와 무관한 원인에도 부합한다. 구별 실험은 개입/대조에서 장−sham 차이를 비교하고, 같은 생물학적 매개변수로 경쟁 결합 모델의 사전 지정 파형·상태 의존성을 시험한다. L3/L4 결과만으로 조건부 L2 결합, 게이지, 척도와 조직 커널이 식별되지는 않는다.",
    predictionLink: "참조: 약리학적 예측(PHARM-1~PHARM-5)",
    predictionHref: "/predictions",
  },
} as const;

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  E: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400" },
  "E|M": { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400" },
  M: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  "M|C": { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  "M|L": { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400" },
  C: { bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400" },
  L: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
  "L*": { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function PharmacologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>

      <PageHeader icon={Pill} title={d.title} subtitle={d.subtitle} />

      <SteroidogenesisIntegrationPanel locale={locale} focus="interventions" />
      <p className="mt-4 text-sm"><Link className="text-accent hover:underline" href={`/${locale}/model/biological-coordination#conditional-scenarios`}>{locale === "fi" ? "Tutki ajoituksen, korjauksen ja toiminnallisten porttien yhteisiä skenaarioita →" : "Explore shared scenarios for timing, repair and functional gates →"}</Link></p>

      <EvidenceSynthesisBanner locale={locale} />
      <div className="mt-10"><InterventionExplorer locale={locale} /></div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.cardsTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-3xl">{d.cardsLead}</p>

        <div className="space-y-6">
          {d.cards.map((card) => {
            const lc = LEVEL_COLORS[card.level] ?? LEVEL_COLORS.M;
            return (
              <div
                key={card.id}
                className={`rounded-xl border ${"critical" in card && card.critical ? "border-green-500/40 bg-green-500/[0.03]" : "border-card-border bg-card-bg"} p-5 sm:p-6`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-sm">{card.drug}</h3>
                    <p className="text-xs text-foreground-muted mt-0.5">{card.drugSub}</p>
                  </div>
                  <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${lc.bg} ${lc.text}`}>
                    {card.level}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {d.mechanismLabel}
                  </p>
                  <p className="text-sm leading-relaxed">
                    <InlineReferenceText text={card.mechanism} locale={locale} />
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {d.evidenceLabel}
                  </p>
                  <ul className="space-y-2">
                    {card.evidence.map((e, i) => (
                      <li key={i} className="text-sm leading-relaxed text-foreground-muted pl-3 border-l-2 border-card-border">
                        <InlineReferenceText text={e} locale={locale} />
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {d.interpretationLabel}
                  </p>
                  <p className="text-sm leading-relaxed italic text-foreground-muted">
                    <InlineReferenceText text={card.interpretation} locale={locale} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-semibold mb-2">{d.convergenceTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.convergenceLead}</p>
        <ul className="space-y-2 mb-6">
          {d.convergencePoints.map((point, i) => (
            <li key={i} className="text-sm leading-relaxed pl-4 border-l-2 border-accent/30">
              <InlineReferenceText text={point} locale={locale} />
            </li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed font-medium max-w-3xl">{d.convergenceConclusion}</p>
        <p className="mt-4">
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">
            {d.predictionLink} →
          </Link>
        </p>

        <DrugDiseaseCrossMap locale={locale} />
      </section>
    </div>
  );
}
