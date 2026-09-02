import type { Metadata } from "next";
import Link from "next/link";
import { Pill } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DrugDiseaseCrossMap } from "@/components/DrugDiseaseCrossMap";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Pharmacological Evidence",
    subtitle: "If VGCC activation is the primary transduction mechanism, drugs that block or modulate the same channels should attenuate EMF-associated biological effects. Fourteen drug classes provide convergent pharmacological evidence.",
    backLink: "← Back to Evidence",
    cardsTitle: "Drug evidence cards",
    cardsLead: "Each card presents a drug class, its mechanism of action on the BERM-relevant pathway, the key evidence, and the model interpretation. Evidence levels follow the BERM classification: E = experimental, C = clinical/epidemiological, M = mechanistic, L = logical inference, L* = speculative.",
    cards: [
      {
        id: "CCB",
        drug: "Calcium channel blockers (CCBs)",
        drugSub: "Nifedipine, amlodipine, verapamil, diltiazem",
        mechanism: "L-type VGCC blockade → prevents EMF-induced Ca²⁺ influx at the primary transduction node (pathway A). CCBs are the most direct pharmacological test of BERM's central mechanism.",
        evidence: [
          "[[ref:pall2013_v2|Pall 2013 (J. Cell. Mol. Med.)]]: systematic review of 23 studies — VGCC blockers prevent or attenuate EMF-induced biological effects across cell types, exposure frequencies, and endpoints. The most replicated pharmacological finding in EMF bioeffects research.",
          "CCBs are the most prescribed antihypertensive class globally with >264,000 published studies. They are among the best-characterized drugs in clinical medicine. The Ca²⁺ channel they target is the same channel BERM identifies as the EMF transduction node.",
          "Amlodipine (the most prescribed CCB) has a 36-hour half-life — providing near-continuous VGCC blockade. If ambient EMF causes chronic low-grade VGCC activation, amlodipine users should show attenuated EMF bioeffects compared to users of non-CCB antihypertensives.",
          "Nifedipine (VK44/VK48): first-line tocolytic for preterm labor ([[ref:nifed_tocolytic|Cochrane 2014]]) AND used for pre-eclampsia hypertension management. The same Ca²⁺ channel blocker treats two distinct obstetric conditions — both involving uterine/placental Cav1.2 over-activation. If Ca²⁺ blockade prevents preterm labor and treats pre-eclampsia, Ca²⁺ overload is the pathogenic mechanism.",
        ],
        interpretation: "CCBs are the BERM model's positive pharmacological control. Nifedipine's dual obstetric use (tocolysis + pre-eclampsia) extends the validation to reproductive tissue: same drug, same channel, two pregnancy complications. Combined with verapamil's β-cell protection and 23 EMF-blocker studies, CCBs provide pharmacological evidence at every level from cellular to clinical.",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Verapamil (phenylalkylamine CCB)",
        drugSub: "Non-dihydropyridine, frequency-dependent blockade",
        mechanism: "Verapamil has a unique pharmacological property: frequency-dependent (use-dependent) channel blockade — it blocks VGCCs more effectively when channels open frequently. If EMF causes high-frequency VGCC opening (IFO mechanism), verapamil should be disproportionately effective at blocking EMF-induced Ca²⁺ influx compared to dihydropyridines like amlodipine.",
        evidence: [
          "Verapamil's use-dependent blockade is well-established in cardiac pharmacology (class IV antiarrhythmic). The same property makes it theoretically optimal for blocking IFO-induced rapid channel cycling.",
          "Lundberg 1996 (Bioelectromagnetics): verapamil blocked EMF-induced calcium efflux in bone cells — direct evidence that the EMF-calcium pathway is pharmacologically blockable in reproductive-adjacent tissue.",
          "Verapamil is also used in reproductive medicine for sperm preparation protocols, where it can improve motility by modulating calcium dynamics — mechanistic overlap with BERM's predicted EMF pathway.",
          "[[ref:verap_t1d_jama|Forlenza JAMA 2023]] (VK43): verapamil preserves β-cell function in children with new-onset T1D — C-peptide +30% vs placebo at 52 weeks in double-blind RCT (N=88, ages 7-17). Confirms VK12: if Ca²⁺ channel blockade saves β-cells, then Ca²⁺ overload destroys them.",
          "[[ref:verap_t1d_natmed|Ovalle Nat Med 2018]]: verapamil increases C-peptide at 3 and 12 months in adults with recent-onset T1D via TXNIP reduction and β-cell protection.",
        ],
        interpretation: "Verapamil's use-dependent kinetics predict it should be the most effective CCB against EMF effects. The [[ref:verap_t1d_jama|JAMA 2023 T1D RCT]] provides the strongest pharmacological validation: a Ca²⁺ channel blocker protects the exact cell type (β-cells) that BERM predicts EMF destroys via Ca²⁺ overload (VK12). Combined with [[ref:verap_t1d_natmed|Nat Med 2018 adult data]] and [[ref:verap_t2d_dc|Diabetes Care 2025 observational evidence]], verapamil's β-cell protection is a triple-confirmed BERM prediction.",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Lithium",
        drugSub: "Mood stabilizer, GSK-3β inhibitor, neuroprotective",
        mechanism: "Lithium inhibits GSK-3β, which phosphorylates CRY proteins and targets them for degradation. GSK-3β inhibition → CRY accumulates → stronger circadian clock → enhanced melatonin signaling. Lithium also stabilizes circadian period length and increases melatonin secretion — directly opposing BERM pathway B (RPM/CRY → melatonin suppression).",
        evidence: [
          "Lithium lengthens circadian period in every organism tested from cyanobacteria to humans (McCarthy 2019, Translational Psychiatry). This is mediated by GSK-3β inhibition of CRY degradation.",
          "Lithium increases melatonin secretion in bipolar patients (Hallam 2005, J. Psychopharmacology). This is the opposite direction to EMF-induced melatonin suppression ([[ref:tbahriti2026|Tbahriti 2026 PRISMA]]: 88% of high-quality animal studies report EMF-induced melatonin suppression).",
          "Lithium is neuroprotective via multiple BERM-relevant mechanisms: GSK-3β inhibition reduces tau phosphorylation (Alzheimer's pathway), BDNF upregulation supports neuroplasticity, and anti-inflammatory effects reduce neuroinflammation. All three are downstream of BERM's Ca²⁺ disruption cascade.",
          "Drinking water lithium epidemiology (VK54): regions with naturally elevated lithium in water show lower suicide rates (Kapusta 2011, Br J Psychiatry), lower dementia incidence (Kessing 2017, JAMA Psychiatry), and lower depression prevalence. The dose is 10–100× below therapeutic — suggesting CRY-pathway modulation at trace concentrations. BERM interpretation: trace lithium provides tonic CRY stabilization, partially protecting pathway B at a population level.",
        ],
        interpretation: "Lithium provides pathway B pharmacological counter-evidence. If CRY-mediated melatonin suppression contributes to EMF bioeffects, lithium's CRY stabilization and melatonin enhancement should partially protect against pathway B effects. The drinking water data (VK54) extends this from therapeutic to trace-dose protection — regions with higher water lithium may have partial, population-level EMF resilience via pathway B. Testable: lithium-treated bipolar patients should show less circadian disruption in high-EMF environments compared to bipolar patients on non-lithium mood stabilizers (e.g. valproate).",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Semaglutide / GLP-1 receptor agonists",
        drugSub: "Ozempic, Wegovy, Mounjaro (tirzepatide)",
        mechanism: "GLP-1R signaling activates L-type VGCCs in pancreatic β-cells to trigger insulin release ([[ref:bhatt2012_glp1|Bhatt 2012]]). If EMF chronically disrupts the L-type VGCC → Ca²⁺ → ERK pathway, GLP-1 agonists may partially correct this disruption by pharmacologically amplifying the same pathway downstream of the channel.",
        evidence: [
          "Semaglutide's unprecedented efficacy in metabolic syndrome (15–20% weight loss, cardiovascular risk reduction, NASH improvement, kidney protection) maps onto multiple BERM-predicted metabolic disruption endpoints. The breadth of benefit is consistent with correcting an upstream disruption rather than a downstream symptom.",
          "[[ref:klimentidis2010|The Klimentidis paradox (2011, Proc. R. Soc. B)]]: 24 populations of 8 species have all gained weight since the 1970s (p = 1.2×10⁻⁷). Diet/exercise cannot explain weight gain in laboratory animals on controlled diets. An environmental factor affecting calcium-dependent metabolic pathways is consistent with BERM.",
          "GLP-1 is expressed in the brain (NTS, hypothalamus) where it modulates appetite, reward, and nausea through calcium-dependent signaling. Semaglutide's central effects could partially compensate for EMF-disrupted hypothalamic calcium dynamics.",
        ],
        interpretation: "SPECULATIVE: if EMF disrupts the L-type VGCC → Ca²⁺ → ERK pathway, semaglutide's efficacy may be partly explained by pharmacological compensation for environmental calcium disruption. Testable prediction: semaglutide efficacy should correlate with ambient EMF level (METAB-3). This prediction is currently locked as evidence level L*.",
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
        interpretation: "Nimodipine is the most informative single CCB for BERM's expanded model: its CNS selectivity allows testing the hypothesis that VGCC activation contributes to EMF-associated cognitive and neurodegenerative effects independently of peripheral endpoints. If nimodipine attenuates EMF-induced cognitive effects (cf. Koivisto 2000) while amlodipine does not, it confirms BBB penetration as the critical pharmacological variable.",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "Exogenous melatonin",
        drugSub: "Pathway B endpoint supplementation",
        mechanism: "Melatonin supplementation directly replaces the hormone that BERM pathway B (RPM/CRY → melatonin suppression) predicts is reduced by EMF exposure. This is endpoint supplementation, not mechanism blockade — it does not prevent EMF-induced CRY disruption but compensates for its downstream hormonal consequence.",
        evidence: [
          "[[ref:tbahriti2026|Tbahriti et al. 2026]] (Sleep Biol Rhythms, PRISMA systematic review of 55 studies): 88% of high-quality animal studies report EMF-induced melatonin suppression of 20–50% from baseline. Exogenous melatonin would replace this deficit.",
          "Melatonin is a potent antioxidant that scavenges ROS — directly counteracting the oxidative stress cascade (BERM Level 5A) independently of its hormonal function. This dual action (antioxidant + hormonal replacement) makes it effective against both pathway A downstream (ROS) and pathway B downstream (melatonin deficit).",
          "Reiter et al. 2007, 2014: multiple reviews demonstrating melatonin's protective effects against RF-induced oxidative damage in animal models. Dose-dependent protection consistent with BERM's recovery window model.",
        ],
        interpretation: "Melatonin is the most accessible pharmacological test of BERM pathway B. If nighttime melatonin supplementation (1–3 mg, timed to natural secretion) attenuates EMF-associated sleep disruption and improves sperm parameters in high-EMF environments, it supports the melatonin bridge hypothesis. Caveat: melatonin does not address pathways C (BBB) or D (HPA), so protection should be partial.",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "Coenzyme Q10 (CoQ10 / ubiquinone)",
        drugSub: "Mitochondrial electron carrier, endogenous antioxidant",
        mechanism: "CoQ10 operates at the mitochondrial inner membrane where it shuttles electrons in the electron transport chain (complex I→III). It is also a lipid-soluble antioxidant that neutralizes ROS in membranes. BERM's Level 5A (Ca²⁺ → mitochondrial ROS) predicts that antioxidant capacity determines net daily damage: net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair)). CoQ10 supplementation reduces τ_repair by increasing antioxidant capacity.",
        evidence: [
          "[[ref:bektas2026|Bektas et al. 2026]] (Bioelectromagnetics): 3.5 GHz RF (5G frequency) induced testicular and oxidative damage in rats. CoQ10 supplementation ameliorated the damage. This is the first direct demonstration that antioxidant supplementation protects against 5G-frequency reproductive damage.",
          "CoQ10 supplementation improves sperm parameters in subfertile men (Safarinejad 2012, meta-analysis: improved motility and concentration). If part of modern sperm decline is EMF-mediated oxidative damage, CoQ10's benefit is mechanistically consistent.",
          "CoQ10 levels decline with age — tracking the same timeline as testosterone decline and rising oxidative stress. Age-related CoQ10 depletion would amplify EMF-induced oxidative damage by reducing repair capacity.",
        ],
        interpretation: "CoQ10 is the pharmacological analogue of BERM's recovery window: instead of reducing exposure time, it enhances repair rate. The [[ref:bektas2026|Bektas 2026 result]] is the strongest single-study evidence for pharmacological EMF protection. CoQ10 addresses pathway A downstream (ROS) but not the upstream transduction (VGCC activation) or pathways B/C.",
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
        interpretation: "Psilocybin is the pharmacological inverse of chronic EMF Ca²⁺ disruption: where EMF produces continuous low-grade VGCC activation → CaMKII → downstream degradation, psilocybin produces a single controlled intracellular Ca²⁺ burst → plasticity reset. The cluster headache efficacy is particularly informative — BERM predicts headache from chronic Ca²⁺ excess; psilocybin cures it via acute Ca²⁺ pulse (hormesis). Testable: psilocybin's efficacy should be enhanced in high-EMF individuals (more disruption to reset).",
        level: "E|C",
      },
      {
        id: "CAFFEINE",
        drug: "Caffeine (adenosine A₁ antagonist)",
        drugSub: "World's most consumed psychoactive substance",
        mechanism: "Caffeine blocks adenosine A₁ receptors, which normally inhibit VGCC-mediated Ca²⁺ release. Paradoxically, caffeine also directly modulates ryanodine receptors (RyR), sensitizing intracellular Ca²⁺ stores. The net effect is biphasic: moderate doses increase alertness by modifying Ca²⁺ dynamics; high doses can potentiate Ca²⁺ overload. Caffeine is thus a natural Ca²⁺ modulator — the fifth in BERM's endogenous/dietary modulatory panel (alongside vitamin D, melatonin, magnesium, and lithium).",
        evidence: [
          "Caffeine's neuroprotective effects against Parkinson's and Alzheimer's disease (meta-analyses: OR 0.7–0.8) are consistent with Ca²⁺ modulation at moderate doses opposing chronic Ca²⁺ overload from environmental sources.",
          "The dose-response curve is non-linear (hormesis): 2–4 cups/day protective, higher doses neutral or harmful. This matches BERM's χ-parameter hormesis curve — moderate Ca²⁺ modulation is beneficial, excess potentiates damage.",
          "Caffeine crosses the BBB freely and has a 3–5 hour half-life, providing intermittent rather than continuous Ca²⁺ modulation — contrasting with EMF's continuous 24/7 VGCC activation.",
        ],
        interpretation: "Caffeine's global prevalence may represent unconscious pharmacological self-medication against chronic Ca²⁺ disruption. The 2–4 cup protective window aligns with hormesis: enough to modulate but not overwhelm Ca²⁺ signaling. BERM prediction: caffeine's neuroprotective benefit should be larger in high-EMF populations (more disruption to counteract).",
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
          "Occupational EMF exposure increases ALS risk (meta-analyses: OR 1.3–1.7, Huss 2009, Zhou 2012). Riluzole's efficacy via the Ca²⁺/glutamate pathway provides the mechanistic bridge between epidemiological association and biological mechanism.",
        ],
        interpretation: "Riluzole is the pharmacological validation of BERM's ALS mechanism: the only drug that slows ALS progression works by blocking Ca²⁺-dependent glutamate release — the exact pathway BERM predicts EMF activates. The occupational EMF-ALS epidemiological data (OR 1.3–1.7) plus riluzole's Ca²⁺-targeting mechanism constitutes pharmacological convergence at the disease level.",
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
        interpretation: "Isradipine tests BERM's prediction at the single-channel-subtype level: if Cav1.3 activation contributes to PD, a Cav1.3-selective blocker should protect dopaminergic neurons. The epidemiological signal (CCB users have lower PD risk) combined with the mechanistic rationale (Cav1.3 pacemaking vulnerability) constitutes pharmacological validation even though STEADY-PD III was clinically negative — dose and timing may explain the discrepancy.",
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
        interpretation: "Ethosuximide provides the cleanest single-channel pharmacological validation in the Q-factor model: one drug, one channel subtype, one seizure type. The CACNA1H genetic variants confirm the channel identity. The T-type → StAR → testosterone connection extends the validation to BERM's reproductive predictions — if T-type Ca²⁺ channels control both seizure threshold AND testosterone production, then a single environmental perturbation (EMF) affecting these channels predicts both neurological and reproductive consequences.",
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
    convergenceTitle: "Pharmacological convergence argument",
    convergenceLead: "The strongest evidence for any biological mechanism is pharmacological: if blocking the proposed transduction channel abolishes the effect, the mechanism is confirmed. Fourteen drug classes converge on BERM's predicted pathways:",
    convergencePoints: [
      "Pathway A (VGCC): CCBs (23 blocker studies), verapamil (frequency-dependent blockade), gabapentinoids (α2δ modulation), nimodipine (CNS-selective blockade), riluzole (Ca²⁺-dependent glutamate release inhibition)",
      "Pathway B (CRY/melatonin): Lithium (CRY stabilization via GSK-3β, trace-dose drinking water data), exogenous melatonin (endpoint replacement)",
      "Ca²⁺ hormesis/reset: Psilocybin (5-HT2A → controlled Ca²⁺ burst → plasticity reset), caffeine (adenosine A₁ antagonism → biphasic Ca²⁺ modulation)",
      "ROS cascade: CoQ10 (antioxidant rescue, [[ref:bektas2026|Bektas 2026 5G data]]), melatonin (dual antioxidant + hormonal)",
      "Metabolic branch: Semaglutide/GLP-1 agonists (Ca²⁺-ERK pathway amplification) — speculative but testable",
    ],
    convergenceConclusion: "No other environmental exposure hypothesis predicts that these specific drug classes should be relevant to the same biological endpoints. The pharmacological convergence — CCBs, lithium, melatonin, CoQ10, gabapentinoids, psilocybin, caffeine, and riluzole acting on distinct but connected Ca²⁺ targets — constitutes the model's clinically strongest argument.",
    predictionLink: "See: Pharmacological predictions (PHARM-1 through PHARM-5)",
    predictionHref: "/predictions",
    mechanismLabel: "Mechanism",
    evidenceLabel: "Evidence",
    interpretationLabel: "Model interpretation",
  },
  fi: {
    title: "Farmakologinen näyttö",
    subtitle: "Jos VGCC-aktivaatio on primaarinen transduutiomekanismi, lääkkeet jotka blokkaavat tai säätelevät samoja kanavia pitäisi vaimentaa EMF:ään liittyviä biologisia vaikutuksia. Neljätoista lääkeryhmää tarjoaa yhtyvän farmakologisen näytön.",
    backLink: "← Takaisin näyttöön",
    cardsTitle: "Lääke-näyttökortit",
    cardsLead: "Jokainen kortti esittää lääkeryhmän, sen vaikutusmekanismin BERM:n kannalta relevantille reitille, avainnäytön ja mallitulkinnan. Näyttötasot noudattavat BERM-luokittelua: E = kokeellinen, C = kliininen/epidemiologinen, M = mekanistinen, L = looginen päätelmä, L* = spekulatiivinen.",
    cards: [
      {
        id: "CCB",
        drug: "Kalsiumkanavan salpaajat (CCB:t)",
        drugSub: "Nifedipiini, amlodipiini, verapamiili, diltiatseemi",
        mechanism: "L-tyypin VGCC-salpaus → estää EMF:n aiheuttaman Ca²⁺-sisäänvirtauksen primaarisessa transduuktiopisteessä (reitti A). CCB:t ovat suorin farmakologinen testi BERM:n keskeiselle mekanismille.",
        evidence: [
          "[[ref:pall2013_v2|Pall 2013 (J. Cell. Mol. Med.)]]: systemaattinen katsaus 23 tutkimuksesta — VGCC-salpaajat estävät tai vaimentavat EMF:n aiheuttamia biologisia vaikutuksia eri solutyypeissä, altistustaajuuksilla ja päätepisteissä. Eniten toistettu farmakologinen havainto EMF-bioeffektitutkimuksessa.",
          "CCB:t ovat maailmanlaajuisesti eniten määrätty verenpainelääkeryhmä yli 264 000 julkaistulla tutkimuksella. Ca²⁺-kanava johon ne kohdistuvat on sama kanava jonka BERM tunnistaa EMF:n transduutiopisteeksi.",
          "Amlodipiinilla (eniten määrätty CCB) on 36 tunnin puoliintumisaika — tarjoten lähes jatkuvan VGCC-salpauksen. Jos ympäröivä EMF aiheuttaa kroonista matala-asteista VGCC-aktivaatiota, amlodipiinin käyttäjillä pitäisi näkyä vaimennettuja EMF-bioeffektejä verrattuna muiden verenpainelääkkeiden käyttäjiin.",
        ],
        interpretation: "CCB:t ovat BERM-mallin positiivinen farmakologinen kontrolli. Jos EMF toimii VGCC:n kautta, CCB-käyttäjät muodostavat populaatiotason 'osittaisen Faradayn häkin' — farmakologisesti suojattuja transduutiopisteessä.",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Verapamiili (fenyylialkylamiini-CCB)",
        drugSub: "Ei-dihydropyridini, taajuusriippuvainen salpaus",
        mechanism: "Verapamiililla on ainutlaatuinen ominaisuus: taajuusriippuvainen (käyttöriippuvainen) kanavasalpaus — se salpaa VGCC:itä tehokkaammin kun kanavat avautuvat usein. Jos EMF aiheuttaa korkeataajuista VGCC-avautumista (IFO-mekanismi), verapamiilin pitäisi olla suhteettoman tehokas EMF-indusoidun Ca²⁺-sisäänvirtauksen estämisessä.",
        evidence: [
          "Verapamiilin käyttöriippuvainen salpaus on vakiintunut sydänfarmakologiassa (luokka IV antiarytminen). Sama ominaisuus tekee siitä teoreettisesti optimaalisen IFO-indusoidun nopean kanavasyklin estämiseen.",
          "Lundberg 1996 (Bioelectromagnetics): verapamiili esti EMF:n aiheuttaman kalsiumeffluksin luusoluissa — suora näyttö siitä, että EMF-kalsiumreitti on farmakologisesti estettävissä.",
          "Verapamiilia käytetään myös lisääntymislääketieteessä siittiöiden valmisteluprotokollissa, joissa se voi parantaa motiliteettia moduloimalla kalsiumdynamiikkaa.",
        ],
        interpretation: "Verapamiilin käyttöriippuvainen kinetiikka ennustaa sen olevan tehokkain CCB EMF-vaikutuksia vastaan. Vertailututkimus verapamiili vs. amlodipiini vs. ei-CCB verenpainelääke siittiöiden laatupäätepisteillä olisi korkean erottelukyvyn testi.",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Litium",
        drugSub: "Mielialantasaaja, GSK-3β-inhibiittori, neuroprotektiivinen",
        mechanism: "Litium inhiboi GSK-3β:tä, joka fosforyloi CRY-proteiineja ja kohdistaa ne hajoamiseen. GSK-3β-inhibitio → CRY akkumuloituu → vahvempi sirkadiaaninen kello → parantunut melatoniinisignalointi. Litium vastustaa suoraan BERM:n reittiä B (CRY/RPM → melatoniinivaimennus).",
        evidence: [
          "Litium pidentää sirkadiaanista periodia kaikissa testatuissa organismeissa syanobakteereista ihmisiin (McCarthy 2019, Translational Psychiatry). Tämä välittyy GSK-3β:n CRY-degradaation inhibition kautta.",
          "Litium lisää melatoniinineritystä bipolaaripotilailla (Hallam 2005, J. Psychopharmacology). Tämä on vastakkainen suunta kuin EMF:n aiheuttama melatoniinivaimennus.",
          "Litium on neuroprotektiivinen useiden BERM-relevanttien mekanismien kautta: GSK-3β-inhibitio vähentää tau-fosforylaatiota, BDNF-upregulation tukee neuroplastisuutta ja anti-inflammatoriset vaikutukset vähentävät neuroinflammatiota.",
          "Juomaveden litium-epidemiologia (VK54): alueet joilla on luonnollisesti kohonnut litium vedessä, näyttävät matalampia itsemurhalukuja (Kapusta 2011, Br J Psychiatry), vähemmän dementiaa (Kessing 2017, JAMA Psychiatry) ja vähemmän masennusta. Annos on 10–100× alle terapeuttisen — viitaten CRY-reitin modulaatioon hivenpitoisuuksilla. BERM-tulkinta: hivenlitium tarjoaa toonisen CRY-stabiloinnin, osittain suojaten reittiä B väestötasolla.",
        ],
        interpretation: "Litium tarjoaa reitin B farmakologisen vasta-näytön. Jos CRY-välitteinen melatoniinivaimennus osallistuu EMF-bioeffekteihin, litiumin CRY-stabiloinnin pitäisi osittain suojata reitin B vaikutuksilta. Juomavesidata (VK54) laajentaa tämän terapeuttisesta hivenpitoisuussuojaukseen — alueet joilla on korkeampi vesilitium voivat saada osittaista, väestötason EMF-resilienttiyttä reitin B kautta.",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Semaglutidi / GLP-1-reseptoriagonistit",
        drugSub: "Ozempic, Wegovy, Mounjaro (tirtsepatidi)",
        mechanism: "GLP-1R-signalointi aktivoi L-tyypin VGCC:itä haiman β-soluissa insuliinin vapautumiseksi ([[ref:bhatt2012_glp1|Bhatt 2012]]). Jos EMF kroonisesti häiritsee L-tyypin VGCC → Ca²⁺ → ERK -reittiä, GLP-1-agonistit voivat osittain korjata tämän häiriön vahvistamalla samaa reittiä farmakologisesti kanavan alapuolelta.",
        evidence: [
          "Semaglutidin ennennäkemätön tehokkuus metabolisessa oireyhtymässä (15–20 % painonlasku, CV-riskin vähentyminen, NASH-parannus) kartoittuu useille BERM:n ennustamille metabolisen häiriön päätepisteille.",
          "[[ref:klimentidis2010|Klimentidis-paradoksi (2011, Proc. R. Soc. B)]]: 24 populaatiota 8 lajista on kaikki lihoneet 1970-luvulta (p = 1,2×10⁻⁷). Ruokavalio/liikunta ei selitä painonnousua kontrolloiduilla ruokavalioilla olevilla koe-eläimillä.",
          "GLP-1:tä ilmennetään aivoissa (NTS, hypotalamus) missä se säätelee ruokahalua, palkitsemista ja pahoinvointia kalsiumriippuvaisen signaloinnin kautta.",
        ],
        interpretation: "SPEKULATIIVINEN: jos EMF häiritsee L-tyypin VGCC → Ca²⁺ → ERK -reittiä, semaglutidin tehokkuus voi osittain selittyä farmakologisella kompensoinnilla ympäristöperäiselle kalsiumhäiriölle. Testattava ennuste: semaglutidin tehokkuuden pitäisi korreloida ympäröivän EMF-tason kanssa (METAB-3).",
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
        interpretation: "Nimodipiini on informatiivisin yksittäinen CCB BERM:n laajennetulle mallille: sen CNS-selektiivisyys mahdollistaa sen hypoteesin testaamisen, että VGCC-aktivaatio osallistuu EMF-yhdistettyihin kognitiivisiin ja neurodegeneratiivisiin vaikutuksiin riippumatta perifeerisistä päätepisteistä.",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "Eksogeeninen melatoniini",
        drugSub: "Reitin B päätepisteen täydennys",
        mechanism: "Melatoniinilisä korvaa suoraan hormonin, jonka BERM:n reitti B (CRY/RPM → melatoniinivaimennus) ennustaa vähenevän EMF-altistuksesta. Tämä on päätepisteen supplementointi, ei mekanismin salpaus.",
        evidence: [
          "[[ref:tbahriti2026|Tbahriti ym. 2026]] (Sleep Biol Rhythms, PRISMA-katsaus 55 tutkimuksesta): 88 % korkealaatuisista eläintutkimuksista raportoi EMF:n aiheuttaman melatoniinin vaimentumista 20–50 % lähtötasosta.",
          "Melatoniini on voimakas antioksidantti joka neutraloi ROS:ia — vastatoimena oksidatiivisen stressin kaskadille (BERM-taso 5A) riippumatta sen hormonaalisesta funktiosta.",
          "Reiter ym. 2007, 2014: melatoniinin suojaavat vaikutukset RF-indusoidulta oksidatiiviselta vauriolta eläinmalleissa.",
        ],
        interpretation: "Melatoniini on helpoiten saatavilla oleva farmakologinen testi BERM:n reitille B. Jos yöllinen melatoniinilisä (1–3 mg) vaimentaa EMF-assosioitua unihäiriötä ja parantaa siittiöparametreja korkean EMF:n ympäristöissä, se tukee melatoniinisilta-hypoteesia.",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "Koentsyymi Q10 (CoQ10 / ubikinooni)",
        drugSub: "Mitokondriaalinen elektroninkuljettaja, endogeeninen antioksidantti",
        mechanism: "CoQ10 toimii mitokondrian sisäkalvolla elektroninsiirtoketjussa (kompleksi I→III). Se on myös rasvaliukoinen antioksidantti. BERM:n taso 5A (Ca²⁺ → mitokondriaalinen ROS) ennustaa, että antioksidanttikapasiteetti määrää nettopäivävaurion.",
        evidence: [
          "[[ref:bektas2026|Bektas ym. 2026]] (Bioelectromagnetics): 3,5 GHz RF (5G-taajuus) aiheutti kivesten ja oksidatiivista vauriota rotilla. CoQ10-supplementaatio lievitti vauriota. Ensimmäinen suora osoitus siitä, että antioksidanttilisä suojaa 5G-taajuuden lisääntymiskykyyn liittyvältä vauriolta.",
          "CoQ10-supplementaatio parantaa siittiöparametreja subfertileillä miehillä (Safarinejad 2012: parantunut motiliteetti ja konsentraatio).",
          "CoQ10-tasot laskevat iän myötä — seuraten samaa aikajanaa kuin testosteronin lasku ja nouseva oksidatiivinen stressi.",
        ],
        interpretation: "CoQ10 on BERM:n palautumisikkunan farmakologinen analogi: sen sijaan että vähennettäisiin altistusaikaa, se tehostaa korjausnopeutta. [[ref:bektas2026|Bektas 2026 -tulos]] on vahvin yksittäisen tutkimuksen näyttö farmakologisesta EMF-suojauksesta.",
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
        interpretation: "Psilosybiini on kroonisen EMF Ca²⁺ -häiriön farmakologinen inversio: siinä missä EMF tuottaa jatkuvaa matala-asteista VGCC-aktivaatiota → CaMKII → alavirtadegradaatiota, psilosybiini tuottaa yksittäisen kontrolloidun solunsisäisen Ca²⁺-pursukeen → plastisuusresetin. Klusteripäänsäryn tehokkuus on erityisen informatiivista — BERM ennustaa päänsärkyä kroonisesta Ca²⁺-ylimäärästä; psilosybiini parantaa sen akuutilla Ca²⁺-pulssilla (hormeesi).",
        level: "E|C",
      },
      {
        id: "CAFFEINE",
        drug: "Kofeiini (adenosiini A₁ -antagonisti)",
        drugSub: "Maailman käytetyin psykoaktiivinen aine",
        mechanism: "Kofeiini estää adenosiini A₁ -reseptorit, jotka normaalisti inhiboivat VGCC-välitteistä Ca²⁺-vapautusta. Paradoksaalisesti kofeiini myös säätelee suoraan ryanodiinireseptoreja (RyR), herkistäen solunsisäisiä Ca²⁺-varastoja. Kokonaisvaikutus on kaksivaiheinen: kohtuulliset annokset lisäävät vireystilaa modifioimalla Ca²⁺-dynamiikkaa; korkeat annokset voivat tehostaa Ca²⁺-ylikuormitusta. Kofeiini on siis luonnollinen Ca²⁺-modulaattori — viides BERM:n endogeenisessä/ravintoperäisessä modulointipaneelissa (D-vitamiinin, melatoniinin, magnesiumin ja litiumin rinnalla).",
        evidence: [
          "Kofeiinin neuroprotektiiviset vaikutukset Parkinsonia ja Alzheimeria vastaan (meta-analyysit: OR 0,7–0,8) ovat yhdenmukaisia Ca²⁺-modulaation kanssa kohtuullisilla annoksilla vastustaen kroonista Ca²⁺-ylikuormitusta ympäristölähteistä.",
          "Annos-vaste on epälineaarinen (hormeesi): 2–4 kuppia/päivä suojaava, korkeammat annokset neutraaleja tai haitallisia. Tämä vastaa BERM:n χ-parametrin hormeesikäyrää — kohtuullinen Ca²⁺-modulaatio on hyödyllistä, ylimäärä tehostaa vauriota.",
          "Kofeiini läpäisee BBB:n vapaasti ja sen puoliintumisaika on 3–5 tuntia, tarjoten ajoittaista eikä jatkuvaa Ca²⁺-modulaatiota — vastakohta EMF:n jatkuvalle 24/7 VGCC-aktivaatiolle.",
        ],
        interpretation: "Kofeiinin maailmanlaajuinen esiintyvyys voi edustaa tiedostamatonta farmakologista itselääkintää kroonista Ca²⁺-häiriötä vastaan. 2–4 kupin suojaava ikkuna on linjassa hormeesin kanssa: tarpeeksi säädelläkseen mutta ei ylikuormittaakseen Ca²⁺-signalointia. BERM-ennuste: kofeiinin neuroprotektiivinen hyöty pitäisi olla suurempi korkean EMF:n populaatioissa.",
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
          "Ammatillinen EMF-altistus kasvattaa ALS-riskiä (meta-analyysit: OR 1,3–1,7, Huss 2009, Zhou 2012). Rilutsolin tehokkuus Ca²⁺/glutamaattireitin kautta tarjoaa mekanistisen sillan epidemiologisen assosiaation ja biologisen mekanismin välille.",
        ],
        interpretation: "Rilutsoli on BERM:n ALS-mekanismin farmakologinen validointi: ainoa lääke joka hidastaa ALS:n etenemistä toimii estämällä Ca²⁺-riippuvaista glutamaatin vapautumista — juuri se reitti jonka BERM ennustaa EMF:n aktivoivan. Ammatillinen EMF-ALS epidemiologinen data (OR 1,3–1,7) plus rilutsolin Ca²⁺-kohdistuva mekanismi muodostavat farmakologisen yhdentymisen sairaustasolla.",
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
        interpretation: "Isradipiini testaa BERM:n ennustetta yksittäisen kanava-alatyypin tasolla: jos Cav1.3-aktivaatio osallistuu PD:hen, Cav1.3-selektiivisen salpaajan pitäisi suojata dopamiinineuroneita. Epidemiologinen signaali (CCB-käyttäjillä matalampi PD-riski) yhdistettynä mekanistiseen perusteluun muodostaa farmakologisen todentamisen.",
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
        interpretation: "Etosuksimidi tarjoaa puhtaimman yksittäisen kanavan farmakologisen todentamisen Q-tekijämallissa: yksi lääke, yksi kanava-alatyyppi, yksi kohtaustyyppi. T-tyypin → StAR → testosteroni -yhteys laajentaa todentamisen BERM:n lisääntymiskykyyn liittyviin ennusteisiin.",
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
    convergenceTitle: "Farmakologinen yhdentymisargumentti",
    convergenceLead: "Vahvin näyttö mille tahansa biologiselle mekanismille on farmakologinen: jos ehdotetun transduuktiokanavan salpaus kumoaa vaikutuksen, mekanismi on vahvistettu. Neljätoista lääkeryhmää yhtyvät BERM:n ennustamille reiteille:",
    convergencePoints: [
      "Reitti A (VGCC): CCB:t (23 salpaajatutkimusta), verapamiili (taajuusriippuvainen salpaus), gabapentinoidit (α2δ-modulaatio), nimodipiini (CNS-selektiivinen salpaus), rilutsoli (Ca²⁺-riippuvaisen glutamaatin vapautumisen esto)",
      "Reitti B (CRY/melatoniini): Litium (CRY-stabilointi GSK-3β:n kautta, hivenpitoisuus juomavedessä), eksogeeninen melatoniini (päätepisteen korvaus)",
      "Ca²⁺-hormeesi/resetointi: Psilosybiini (5-HT2A → kontrolloitu Ca²⁺-pursuke → plastisuusresetti), kofeiini (adenosiini A₁ -antagonismi → kaksivaiheinen Ca²⁺-modulaatio)",
      "ROS-kaskadi: CoQ10 (antioksidanttipelastus, [[ref:bektas2026|Bektas 2026 5G-data]]), melatoniini (kaksois-antioksidantti + hormonaalinen)",
      "Metabolinen haara: Semaglutidi/GLP-1-agonistit (Ca²⁺-ERK-reitin vahvistus) — spekulatiivinen mutta testattava",
    ],
    convergenceConclusion: "Mikään muu ympäristöaltistushypoteesi ei ennusta, että juuri nämä lääkeryhmät olisivat relevantteja samoille biologisille päätepisteille. Farmakologinen yhdentyminen — CCB:t, litium, melatoniini, CoQ10, gabapentinoidit, psilosybiini, kofeiini ja rilutsoli vaikuttaen erillisiin mutta yhteydessä oleviin Ca²⁺-kohteisiin — muodostaa mallin kliinisesti vahvimman argumentin.",
    predictionLink: "Ks. Farmakologiset ennusteet (PHARM-1–PHARM-5)",
    predictionHref: "/predictions",
    mechanismLabel: "Mekanismi",
    evidenceLabel: "Näyttö",
    interpretationLabel: "Mallitulkinta",
  },
  ja: {
    title: "薬理学的エビデンス",
    subtitle: "VGCC活性化が主要なトランスダクション機構であるなら、同じチャネルを遮断または調節する薬剤はEMF関連の生物学的効果を減衰させるはずである。14の薬剤クラスが収束的な薬理学的エビデンスを提供する。",
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
        mechanism: "L型VGCC遮断 → 主要トランスダクションノード（経路A）でのEMF誘発Ca²⁺流入を防止。CCBはBERMの中心的メカニズムの最も直接的な薬理学的テストである。",
        evidence: [
          "[[ref:pall2013_v2|Pall 2013（J. Cell. Mol. Med.）]]：23研究のシステマティックレビュー — VGCC遮断薬はさまざまな細胞型、曝露周波数、エンドポイントにわたってEMF誘発生物学的効果を防止または減衰。EMF生体効果研究で最も再現された薬理学的所見。",
          "CCBは世界で最も処方される降圧薬クラスであり264,000以上の発表研究がある。対象とするCa²⁺チャネルはBERMがEMFトランスダクションノードとして特定するチャネルと同一である。",
          "Amlodipine（最も処方されるCCB）は36時間の半減期を持ち、ほぼ連続的なVGCC遮断を提供する。環境EMFが慢性的な低度VGCC活性化を引き起こすなら、amlodipine使用者は非CCB降圧薬使用者と比較して減衰したEMF生体効果を示すはずである。",
          "Nifedipine（VK44/VK48）：早産の第一選択子宮弛緩薬（[[ref:nifed_tocolytic|Cochrane 2014]]）かつ子癇前症の血圧管理にも使用。同一のCa²⁺チャネル遮断薬が2つの異なる産科疾患を治療 — いずれも子宮/胎盤Cav1.2過剰活性化に関与。Ca²⁺遮断が早産を防ぎ子癇前症を治療するなら、Ca²⁺過負荷が病因メカニズムである。",
        ],
        interpretation: "CCBはBERMモデルの陽性薬理学的対照である。Nifedipineの産科二重使用（子宮弛緩 + 子癇前症）は検証を生殖組織に拡張する：同一薬剤、同一チャネル、2つの妊娠合併症。Verapamilのβ細胞保護と23のEMF遮断研究と合わせて、CCBは細胞から臨床まであらゆるレベルで薬理学的エビデンスを提供する。",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Verapamil（フェニルアルキルアミンCCB）",
        drugSub: "非ジヒドロピリジン、頻度依存性遮断",
        mechanism: "Verapamilは特有の薬理学的性質を持つ：頻度依存性（使用依存性）チャネル遮断 — チャネルが頻繁に開くほど効果的に遮断する。EMFが高頻度VGCC開口（IFOメカニズム）を引き起こすなら、verapamilはジヒドロピリジン系のamlodipineと比較して不均衡に効果的にEMF誘発Ca²⁺流入を遮断するはずである。",
        evidence: [
          "Verapamilの使用依存性遮断は心臓薬理学（クラスIV抗不整脈薬）で確立されている。同じ性質がIFO誘発急速チャネルサイクリングの遮断に理論的に最適である。",
          "Lundberg 1996（Bioelectromagnetics）：verapamilが骨細胞でEMF誘発カルシウム流出を遮断 — EMF-カルシウム経路が生殖関連組織で薬理学的に遮断可能であることの直接的証拠。",
          "Verapamilは精子調製プロトコルでカルシウム動態を調節して運動性を改善するためにも生殖医療で使用される。",
          "[[ref:verap_t1d_jama|Forlenza JAMA 2023]]（VK43）：verapamilは新規発症T1D小児でβ細胞機能を維持 — 二重盲検RCT（N=88、7-17歳）で52週目にC-peptide +30% vs プラセボ。VK12を確認：Ca²⁺チャネル遮断がβ細胞を保護するなら、Ca²⁺過負荷がそれを破壊する。",
          "[[ref:verap_t1d_natmed|Ovalle Nat Med 2018]]：verapamilが最近発症T1D成人で3ヶ月および12ヶ月時にTXNIP低下とβ細胞保護を介してC-peptideを増加。",
        ],
        interpretation: "Verapamilの使用依存性動態はEMF効果に対して最も効果的なCCBであることを予測する。[[ref:verap_t1d_jama|JAMA 2023 T1D RCT]]は最も強力な薬理学的検証を提供：Ca²⁺チャネル遮断薬がBERMがEMFによるCa²⁺過負荷で破壊されると予測するまさにその細胞型（β細胞）を保護する。",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Lithium",
        drugSub: "気分安定薬、GSK-3β阻害薬、神経保護",
        mechanism: "LithiumはGSK-3βを阻害する。GSK-3βはCRYタンパク質をリン酸化し分解標的とする。GSK-3β阻害 → CRY蓄積 → より強い概日時計 → 増強されたmelatoninシグナリング。LithiumはBERM経路B（RPM/CRY → melatonin抑制）に直接対抗する。",
        evidence: [
          "Lithiumはシアノバクテリアからヒトまでテストされたすべての生物で概日周期を延長する（McCarthy 2019、Translational Psychiatry）。GSK-3βのCRY分解阻害を介する。",
          "Lithiumは双極性障害患者でmelatonin分泌を増加させる（Hallam 2005、J. Psychopharmacology）。EMF誘発melatonin抑制と逆方向。",
          "Lithiumは複数のBERM関連メカニズムを介して神経保護的：GSK-3β阻害がtauリン酸化を低減、BDNF上方制御が神経可塑性を支持、抗炎症効果が神経炎症を低減。",
          "飲料水lithium疫学（VK54）：水中lithiumが自然に高い地域は低い自殺率（Kapusta 2011、Br J Psychiatry）、低い認知症発症率（Kessing 2017、JAMA Psychiatry）、低い抑うつ有病率を示す。用量は治療量の10〜100分の1 — 微量濃度でのCRY経路調節を示唆。BERM解釈：微量lithiumは持続的CRY安定化を提供し、集団レベルで経路Bを部分的に保護する。",
        ],
        interpretation: "Lithiumは経路Bの薬理学的反証を提供する。CRY介在melatonin抑制がEMF生体効果に寄与するなら、LithiumのCRY安定化は経路B効果を部分的に保護するはずである。飲料水データ（VK54）は治療量から微量保護に拡張する。テスト可能：lithium治療を受けた双極性患者は高EMF環境で非lithium気分安定薬（例：valproate）使用患者と比較して概日障害が少ないはずである。",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Semaglutide / GLP-1受容体アゴニスト",
        drugSub: "Ozempic、Wegovy、Mounjaro（tirzepatide）",
        mechanism: "GLP-1Rシグナリングは膵β細胞のL型VGCCを活性化してインスリン放出を促す（[[ref:bhatt2012_glp1|Bhatt 2012]]）。EMFがL型VGCC → Ca²⁺ → ERK経路を慢性的に妨害するなら、GLP-1アゴニストはチャネル下流で同じ経路を薬理学的に増幅してこの妨害を部分的に修正する可能性がある。",
        evidence: [
          "Semaglutideのメタボリックシンドロームにおける前例のない有効性（15–20%減量、心血管リスク低減、NASH改善、腎保護）はBERM予測の複数の代謝障害エンドポイントにマッピングされる。利益の広さは下流症状ではなく上流障害の修正と一致する。",
          "[[ref:klimentidis2010|Klimentidisパラドックス（2011、Proc. R. Soc. B）]]：8種24集団すべてが1970年代以降体重が増加（p = 1.2×10⁻⁷）。食事/運動は管理された食事の実験動物の体重増加を説明できない。カルシウム依存性代謝経路に影響する環境因子はBERMと一致。",
          "GLP-1は脳（NTS、視床下部）で発現し、カルシウム依存性シグナリングを介して食欲、報酬、悪心を調節する。",
        ],
        interpretation: "推測的：EMFがL型VGCC → Ca²⁺ → ERK経路を妨害するなら、semaglutideの有効性は環境カルシウム障害に対する薬理学的補償で部分的に説明される可能性がある。テスト可能予測：semaglutideの有効性は環境EMFレベルと相関するはず（METAB-3）。この予測は現在エビデンスレベルL*としてロックされている。",
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
        interpretation: "NimodipineはBERM拡張モデルにとって最も情報量の多い単一CCBである：CNS選択性によりVGCC活性化がEMF関連認知・神経変性効果に末梢エンドポイントとは独立して寄与するという仮説をテストできる。",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "外因性melatonin",
        drugSub: "経路Bエンドポイント補充",
        mechanism: "Melatonin補充はBERM経路B（RPM/CRY → melatonin抑制）がEMF曝露により減少すると予測するホルモンを直接補充する。これはエンドポイント補充であり、メカニズム遮断ではない — EMF誘発CRY障害を防止しないが、その下流のホルモン的結果を補償する。",
        evidence: [
          "[[ref:tbahriti2026|Tbahritiら 2026]]（Sleep Biol Rhythms、55研究のPRISMAシステマティックレビュー）：高品質動物研究の88%がEMF誘発melatonin抑制20–50%を報告。外因性melatoninはこの欠損を補充する。",
          "Melatoninは強力な抗酸化物質でROSを捕捉する — そのホルモン機能とは独立して酸化ストレスカスケード（BERMレベル5A）に直接対抗する。この二重作用（抗酸化 + ホルモン補充）は経路A下流（ROS）と経路B下流（melatonin欠損）の両方に効果的。",
          "Reiterら 2007、2014：動物モデルでのRF誘発酸化損傷に対するmelatoninの保護効果を示す複数のレビュー。用量依存的保護はBERMの回復ウィンドウモデルと一致。",
        ],
        interpretation: "MelatoninはBERM経路Bの最もアクセスしやすい薬理学的テストである。夜間melatonin補充（1–3 mg）が高EMF環境でEMF関連睡眠障害を減衰し精子パラメータを改善するなら、melatoninブリッジ仮説を支持する。注意：melatoninは経路C（BBB）やD（HPA）に対処しないため、保護は部分的であるべきである。",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "コエンザイムQ10（CoQ10 / ubiquinone）",
        drugSub: "ミトコンドリア電子伝達体、内因性抗酸化物質",
        mechanism: "CoQ10はミトコンドリア内膜で電子伝達系（複合体I→III）の電子を運搬する。また脂溶性抗酸化物質として膜中のROSを中和する。BERMのレベル5A（Ca²⁺ → ミトコンドリアROS）は、抗酸化能力が正味日次損傷を決定すると予測する。CoQ10補充は抗酸化能力を増加させて修復時間を短縮する。",
        evidence: [
          "[[ref:bektas2026|Bektasら 2026]]（Bioelectromagnetics）：3.5 GHz RF（5G周波数）がラットで精巣および酸化的損傷を誘発。CoQ10補充が損傷を軽減。抗酸化補充が5G周波数の生殖損傷を保護する初の直接的実証。",
          "CoQ10補充は不妊男性の精子パラメータを改善する（Safarinejad 2012、メタ分析：運動性と濃度改善）。現代の精子減少の一部がEMF介在酸化損傷であるなら、CoQ10の利益はメカニズム的に一致する。",
          "CoQ10レベルは加齢とともに低下 — テストステロン低下と増加する酸化ストレスと同じ時間軸を追跡。加齢によるCoQ10枯渇は修復能力低下によりEMF誘発酸化損傷を増幅する。",
        ],
        interpretation: "CoQ10はBERMの回復ウィンドウの薬理学的アナログである：曝露時間を減らすのではなく修復速度を高める。[[ref:bektas2026|Bektas 2026の結果]]は薬理学的EMF保護の最も強い単一研究エビデンスである。CoQ10は経路A下流（ROS）に対処するが上流トランスダクション（VGCC活性化）や経路B/Cには対処しない。",
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
        interpretation: "Psilocybinは慢性EMF Ca²⁺妨害の薬理学的逆転である：EMFが連続的低度VGCC活性化 → CaMKII → 下流劣化を生じるのに対し、psilocybinは単一の制御された細胞内Ca²⁺バースト → 可塑性リセットを生じる。群発性頭痛の有効性は特に情報量が多い — BERMは慢性Ca²⁺過剰から頭痛を予測し、psilocybinは急性Ca²⁺パルス（ホルメシス）でそれを治癒する。",
        level: "E|C",
      },
      {
        id: "CAFFEINE",
        drug: "Caffeine（adenosine A₁アンタゴニスト）",
        drugSub: "世界で最も消費される精神活性物質",
        mechanism: "CaffeineはVGCC介在Ca²⁺放出を通常阻害するadenosine A₁受容体を遮断する。逆説的にcaffeineはryanodine受容体（RyR）も直接調節し細胞内Ca²⁺ストアを感作する。正味効果は二相性：中程度の用量はCa²⁺動態修正で覚醒を増加、高用量はCa²⁺過負荷を増強する可能性がある。",
        evidence: [
          "CaffeineのParkinson病およびAlzheimer病に対する神経保護効果（メタ分析：OR 0.7–0.8）は、環境源からの慢性Ca²⁺過負荷に対抗する中程度用量でのCa²⁺調節と一致する。",
          "用量反応曲線は非線形（ホルメシス）：2–4杯/日が保護的、高用量は中性または有害。これはBERMのχパラメータホルメシス曲線と一致する。",
          "Caffeineは自由にBBBを通過し半減期3–5時間で、EMFの連続24/7 VGCC活性化と対照的に間欠的Ca²⁺調節を提供する。",
        ],
        interpretation: "Caffeineの世界的普及は慢性Ca²⁺妨害に対する無意識の薬理学的自己治療を表す可能性がある。2–4杯の保護的ウィンドウはホルメシスと一致する。BERM予測：caffeineの神経保護的利益は高EMF集団でより大きいはず。",
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
          "職業EMF曝露はALSリスクを増加させる（メタ分析：OR 1.3–1.7、Huss 2009、Zhou 2012）。RiluzoleのCa²⁺/glutamate経路での有効性は疫学的関連と生物学的メカニズムの間のメカニズム的橋梁を提供する。",
        ],
        interpretation: "RiluzoleはBERMのALSメカニズムの薬理学的検証である：ALSの進行を遅らせる唯一の薬剤はCa²⁺依存性glutamate放出の遮断により作用する — BERMがEMFにより活性化されると予測するまさにその経路。職業EMF-ALS疫学データ（OR 1.3–1.7）とriluzoleのCa²⁺標的メカニズムは疾患レベルでの薬理学的収束を構成する。",
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
        interpretation: "IsradipineはBERMの予測を単一チャネルサブタイプレベルでテストする：Cav1.3活性化がPDに寄与するなら、Cav1.3選択的遮断薬はドパミンニューロンを保護するはずである。疫学的シグナル（CCB使用者の低PD リスク）とメカニズム的根拠（Cav1.3ペースメーキング脆弱性）は薬理学的検証を構成する。",
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
        interpretation: "EthosuximideはQ因子モデルにおいて最もクリーンな単一チャネル薬理学的検証を提供する：1つの薬剤、1つのチャネルサブタイプ、1つのけいれんタイプ。CACNA1H遺伝変異がチャネル同一性を確認する。T型 → StAR → テストステロンの関連はBERMの生殖予測に検証を拡張する。",
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
    convergenceTitle: "薬理学的収束論",
    convergenceLead: "いかなる生物学的メカニズムの最も強い証拠は薬理学的である：提唱されたトランスダクションチャネルの遮断が効果を消失させるなら、メカニズムは確認される。14の薬剤クラスがBERMの予測経路に収束する：",
    convergencePoints: [
      "経路A（VGCC）：CCB（23遮断研究）、verapamil（頻度依存性遮断）、gabapentinoid系（α2δ調節）、nimodipine（CNS選択的遮断）、riluzole（Ca²⁺依存性glutamate放出阻害）",
      "経路B（CRY/melatonin）：Lithium（GSK-3βによるCRY安定化、微量飲料水データ）、外因性melatonin（エンドポイント補充）",
      "Ca²⁺ホルメシス/リセット：Psilocybin（5-HT2A → 制御Ca²⁺バースト → 可塑性リセット）、caffeine（adenosine A₁拮抗 → 二相性Ca²⁺調節）",
      "ROSカスケード：CoQ10（抗酸化レスキュー、[[ref:bektas2026|Bektas 2026 5Gデータ]]）、melatonin（二重抗酸化 + ホルモン）",
      "代謝分岐：Semaglutide/GLP-1アゴニスト（Ca²⁺-ERK経路増幅） — 推測的だがテスト可能",
    ],
    convergenceConclusion: "他のいかなる環境曝露仮説も、これらの特定の薬剤クラスが同じ生物学的エンドポイントに関連するべきであると予測しない。薬理学的収束 — CCB、lithium、melatonin、CoQ10、gabapentinoid系、psilocybin、caffeine、riluzoleが異なるが接続されたCa²⁺標的に作用する — はモデルの臨床的に最も強い論拠を構成する。",
    predictionLink: "参照：薬理学的予測（PHARM-1からPHARM-5）",
    predictionHref: "/predictions",
  },
  fr: {
    title: "Preuves pharmacologiques",
    subtitle: "Si l'activation des VGCC est le mécanisme principal de transduction, les médicaments qui bloquent ou modulent les mêmes canaux devraient atténuer les effets biologiques associés aux EMF. Quatorze classes de médicaments fournissent des preuves pharmacologiques convergentes.",
    backLink: "← Retour aux preuves",
    cardsTitle: "Fiches de preuves médicamenteuses",
    cardsLead: "Chaque fiche présente une classe de médicaments, son mécanisme d'action sur la voie BERM pertinente, les preuves clés et l'interprétation du modèle. Les niveaux de preuve suivent la classification BERM : E = expérimental, C = clinique/épidémiologique, M = mécanistique, L = inférence logique, L* = spéculatif.",
    mechanismLabel: "Mécanisme",
    evidenceLabel: "Preuve",
    interpretationLabel: "Interprétation du modèle",
    cards: [
      {
        id: "CCB",
        drug: "Inhibiteurs calciques (CCB)",
        drugSub: "Nifédipine, amlodipine, vérapamil, diltiazem",
        mechanism: "Blocage L-type VGCC → empêche l'influx Ca²⁺ induit par EMF au noeud de transduction primaire (voie A). Les CCB sont le test pharmacologique le plus direct du mécanisme central de BERM.",
        evidence: [
          "[[ref:pall2013_v2|Pall 2013 (J. Cell. Mol. Med.)]] : revue systématique de 23 études — les bloqueurs VGCC préviennent ou atténuent les effets biologiques induits par EMF à travers les types cellulaires, fréquences d'exposition et critères d'évaluation. La découverte pharmacologique la plus reproduite en recherche sur les bioeffets EMF.",
          "Les CCB sont la classe d'antihypertenseurs la plus prescrite au monde avec plus de 264 000 études publiées. Le canal Ca²⁺ qu'ils ciblent est le même que celui que BERM identifie comme noeud de transduction EMF.",
          "L'amlodipine (le CCB le plus prescrit) a une demi-vie de 36 heures — fournissant un blocage VGCC quasi continu. Si les EMF ambiants causent une activation VGCC chronique de faible intensité, les utilisateurs d'amlodipine devraient montrer des bioeffets EMF atténués.",
          "La nifédipine (VK44/VK48) : tocolytique de première intention pour le travail prématuré ([[ref:nifed_tocolytic|Cochrane 2014]]) ET utilisée pour la gestion de l'hypertension de pré-éclampsie. Le même bloqueur de canal Ca²⁺ traite deux conditions obstétricales distinctes — les deux impliquant une suractivation utérine/placentaire de Cav1.2.",
        ],
        interpretation: "Les CCB sont le contrôle pharmacologique positif du modèle BERM. L'utilisation obstétricale double de la nifédipine (tocolyse + pré-éclampsie) étend la validation aux tissus reproductifs : même médicament, même canal, deux complications de grossesse. Combinés avec la protection des cellules β par le vérapamil et 23 études de blocage EMF, les CCB fournissent des preuves pharmacologiques à tous les niveaux du cellulaire au clinique.",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Vérapamil (CCB phénylalkylamine)",
        drugSub: "Non-dihydropyridine, blocage fréquence-dépendant",
        mechanism: "Le vérapamil possède une propriété pharmacologique unique : blocage fréquence-dépendant (usage-dépendant) — il bloque les VGCC plus efficacement lorsque les canaux s'ouvrent fréquemment. Si les EMF causent une ouverture VGCC à haute fréquence (mécanisme IFO), le vérapamil devrait être disproportionnellement efficace.",
        evidence: [
          "Le blocage usage-dépendant du vérapamil est bien établi en pharmacologie cardiaque (antiarythmique de classe IV). La même propriété le rend théoriquement optimal pour bloquer le cyclage rapide des canaux induit par IFO.",
          "Lundberg 1996 (Bioelectromagnetics) : le vérapamil a bloqué l'efflux calcique induit par EMF dans les cellules osseuses — preuve directe que la voie EMF-calcium est pharmacologiquement blocable.",
          "Le vérapamil est aussi utilisé en médecine reproductive pour les protocoles de préparation des spermatozoïdes, améliorant la motilité via la modulation de la dynamique calcique.",
          "[[ref:verap_t1d_jama|Forlenza JAMA 2023]] (VK43) : le vérapamil préserve la fonction des cellules β chez les enfants atteints de DT1 nouvellement diagnostiqué — C-peptide +30 % vs placebo à 52 semaines dans un RCT en double aveugle (N=88, 7-17 ans).",
          "[[ref:verap_t1d_natmed|Ovalle Nat Med 2018]] : le vérapamil augmente le C-peptide à 3 et 12 mois chez les adultes avec DT1 récent via la réduction de TXNIP et la protection des cellules β.",
        ],
        interpretation: "La cinétique usage-dépendante du vérapamil prédit qu'il devrait être le CCB le plus efficace contre les effets EMF. Le [[ref:verap_t1d_jama|RCT JAMA 2023 sur le DT1]] fournit la validation pharmacologique la plus forte : un bloqueur de canal Ca²⁺ protège exactement le type cellulaire (cellules β) que BERM prédit être détruit par surcharge Ca²⁺ via EMF.",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Lithium",
        drugSub: "Stabilisateur d'humeur, inhibiteur GSK-3β, neuroprotecteur",
        mechanism: "Le lithium inhibe GSK-3β, qui phosphoryle les protéines CRY et les cible pour dégradation. Inhibition GSK-3β → accumulation CRY → horloge circadienne plus forte → signalisation mélatonine améliorée. Le lithium s'oppose directement à la voie B de BERM (RPM/CRY → suppression de la mélatonine).",
        evidence: [
          "Le lithium allonge la période circadienne dans tous les organismes testés, des cyanobactéries aux humains (McCarthy 2019, Translational Psychiatry). Médié par l'inhibition de la dégradation CRY par GSK-3β.",
          "Le lithium augmente la sécrétion de mélatonine chez les patients bipolaires (Hallam 2005, J. Psychopharmacology). Direction opposée à la suppression de mélatonine induite par EMF.",
          "Le lithium est neuroprotecteur via plusieurs mécanismes pertinents pour BERM : inhibition GSK-3β réduit la phosphorylation tau, la régulation positive BDNF soutient la neuroplasticité, et les effets anti-inflammatoires réduisent la neuroinflammation.",
          "Épidémiologie du lithium dans l'eau potable (VK54) : les régions avec du lithium naturellement élevé montrent des taux de suicide plus bas (Kapusta 2011, Br J Psychiatry), moins de démence (Kessing 2017, JAMA Psychiatry) et moins de dépression. La dose est 10–100× inférieure à la dose thérapeutique — suggérant une modulation de la voie CRY à des concentrations traces.",
        ],
        interpretation: "Le lithium fournit une contre-preuve pharmacologique de la voie B. Si la suppression de la mélatonine médiée par CRY contribue aux bioeffets EMF, la stabilisation CRY par le lithium devrait partiellement protéger. Les données sur l'eau potable (VK54) étendent cela de la protection thérapeutique à la protection à dose trace. Testable : les patients bipolaires sous lithium devraient montrer moins de perturbation circadienne en environnement EMF élevé.",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Sémaglutide / agonistes du récepteur GLP-1",
        drugSub: "Ozempic, Wegovy, Mounjaro (tirzépatide)",
        mechanism: "La signalisation GLP-1R active les VGCC L-type dans les cellules β pancréatiques pour déclencher la libération d'insuline ([[ref:bhatt2012_glp1|Bhatt 2012]]). Si les EMF perturbent chroniquement la voie L-type VGCC → Ca²⁺ → ERK, les agonistes GLP-1 pourraient partiellement corriger cette perturbation en amplifiant pharmacologiquement la même voie en aval du canal.",
        evidence: [
          "L'efficacité sans précédent du sémaglutide dans le syndrome métabolique (perte de poids 15–20 %, réduction du risque CV, amélioration NASH) correspond à de multiples critères de perturbation métabolique prédits par BERM.",
          "[[ref:klimentidis2010|Le paradoxe de Klimentidis (2011, Proc. R. Soc. B)]] : 24 populations de 8 espèces ont toutes pris du poids depuis les années 1970 (p = 1,2×10⁻⁷). Le régime/exercice ne peut expliquer la prise de poids d'animaux de laboratoire sous régime contrôlé.",
          "Le GLP-1 est exprimé dans le cerveau (NTS, hypothalamus) où il module l'appétit, la récompense et la nausée via la signalisation calcium-dépendante.",
        ],
        interpretation: "SPÉCULATIF : si les EMF perturbent la voie L-type VGCC → Ca²⁺ → ERK, l'efficacité du sémaglutide pourrait s'expliquer partiellement par une compensation pharmacologique de la perturbation calcique environnementale. Prédiction testable : l'efficacité devrait corréler avec le niveau EMF ambiant (METAB-3).",
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
        interpretation: "La nimodipine est le CCB le plus informatif pour le modèle élargi de BERM : sa sélectivité CNS permet de tester l'hypothèse que l'activation VGCC contribue aux effets cognitifs et neurodégénératifs associés aux EMF indépendamment des critères périphériques.",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "Mélatonine exogène",
        drugSub: "Supplémentation du point terminal de la voie B",
        mechanism: "La supplémentation en mélatonine remplace directement l'hormone que la voie B de BERM (RPM/CRY → suppression de la mélatonine) prédit être réduite par l'exposition EMF. C'est une supplémentation du point terminal, pas un blocage du mécanisme.",
        evidence: [
          "[[ref:tbahriti2026|Tbahriti et al. 2026]] (Sleep Biol Rhythms, revue systématique PRISMA de 55 études) : 88 % des études animales de haute qualité rapportent une suppression de la mélatonine de 20–50 %. La mélatonine exogène remplacerait ce déficit.",
          "La mélatonine est un puissant antioxydant qui piège les ROS — contrecarrant directement la cascade de stress oxydatif (niveau 5A de BERM) indépendamment de sa fonction hormonale. Cette double action (antioxydant + remplacement hormonal) la rend efficace contre la voie A en aval (ROS) et la voie B en aval (déficit de mélatonine).",
          "Reiter et al. 2007, 2014 : multiples revues démontrant les effets protecteurs de la mélatonine contre les dommages oxydatifs induits par RF dans les modèles animaux.",
        ],
        interpretation: "La mélatonine est le test pharmacologique le plus accessible de la voie B de BERM. Si la supplémentation nocturne en mélatonine (1–3 mg) atténue les perturbations du sommeil associées aux EMF et améliore les paramètres spermatiques en environnement EMF élevé, elle soutient l'hypothèse du pont mélatonine. Mise en garde : la mélatonine ne traite pas les voies C (BBB) ou D (HPA), donc la protection devrait être partielle.",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "Coenzyme Q10 (CoQ10 / ubiquinone)",
        drugSub: "Transporteur d'électrons mitochondrial, antioxydant endogène",
        mechanism: "Le CoQ10 opère à la membrane interne mitochondriale où il navette des électrons dans la chaîne de transport d'électrons (complexe I→III). C'est aussi un antioxydant liposoluble. Le niveau 5A de BERM (Ca²⁺ → ROS mitochondrial) prédit que la capacité antioxydante détermine les dommages quotidiens nets.",
        evidence: [
          "[[ref:bektas2026|Bektas et al. 2026]] (Bioelectromagnetics) : le RF 3,5 GHz (fréquence 5G) a induit des dommages testiculaires et oxydatifs chez le rat. La supplémentation en CoQ10 a amélioré les dommages. Première démonstration directe qu'une supplémentation antioxydante protège contre les dommages reproductifs à fréquence 5G.",
          "La supplémentation en CoQ10 améliore les paramètres spermatiques chez les hommes subfertiles (Safarinejad 2012, méta-analyse : amélioration de la motilité et concentration).",
          "Les niveaux de CoQ10 diminuent avec l'âge — suivant la même chronologie que le déclin de testostérone et le stress oxydatif croissant.",
        ],
        interpretation: "Le CoQ10 est l'analogue pharmacologique de la fenêtre de récupération de BERM : au lieu de réduire le temps d'exposition, il améliore la vitesse de réparation. Le [[ref:bektas2026|résultat Bektas 2026]] est la preuve la plus forte d'une seule étude pour la protection pharmacologique EMF.",
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
        interpretation: "La psilocybine est l'inverse pharmacologique de la perturbation Ca²⁺ EMF chronique : là où les EMF produisent une activation VGCC continue de faible intensité → dégradation en aval, la psilocybine produit un seul burst intracellulaire contrôlé → réinitialisation de la plasticité. L'efficacité dans l'algie vasculaire est particulièrement informative — BERM prédit la céphalée par excès chronique de Ca²⁺ ; la psilocybine la guérit par un pulse aigu de Ca²⁺ (hormèse).",
        level: "E|C",
      },
      {
        id: "CAFFEINE",
        drug: "Caféine (antagoniste adénosine A₁)",
        drugSub: "Substance psychoactive la plus consommée au monde",
        mechanism: "La caféine bloque les récepteurs adénosine A₁, qui inhibent normalement la libération de Ca²⁺ médiée par VGCC. Paradoxalement, la caféine module aussi directement les récepteurs ryanodine (RyR), sensibilisant les réserves intracellulaires de Ca²⁺. L'effet net est biphasique : doses modérées augmentent la vigilance ; doses élevées peuvent potentialiser la surcharge Ca²⁺.",
        evidence: [
          "Les effets neuroprotecteurs de la caféine contre Parkinson et Alzheimer (méta-analyses : OR 0,7–0,8) sont cohérents avec la modulation Ca²⁺ à doses modérées s'opposant à la surcharge chronique.",
          "La courbe dose-réponse est non-linéaire (hormèse) : 2–4 tasses/jour protectrices, doses plus élevées neutres ou nocives. Ceci correspond à la courbe d'hormèse du paramètre χ de BERM.",
          "La caféine traverse librement la BHE avec une demi-vie de 3–5 heures, fournissant une modulation Ca²⁺ intermittente — contrastant avec l'activation VGCC continue 24/7 des EMF.",
        ],
        interpretation: "La prévalence mondiale de la caféine peut représenter une automédication pharmacologique inconsciente contre la perturbation chronique du Ca²⁺. La fenêtre protectrice de 2–4 tasses est alignée avec l'hormèse. Prédiction BERM : le bénéfice neuroprotecteur de la caféine devrait être plus grand dans les populations à EMF élevé.",
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
          "L'exposition EMF professionnelle augmente le risque de SLA (méta-analyses : OR 1,3–1,7, Huss 2009, Zhou 2012). L'efficacité du riluzole via la voie Ca²⁺/glutamate fournit le pont mécanistique entre l'association épidémiologique et le mécanisme biologique.",
        ],
        interpretation: "Le riluzole est la validation pharmacologique du mécanisme SLA de BERM : le seul médicament qui ralentit la progression de la SLA agit en bloquant la libération de glutamate Ca²⁺-dépendante — exactement la voie que BERM prédit être activée par EMF.",
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
        interpretation: "L'isradipine teste la prédiction de BERM au niveau d'un seul sous-type de canal : si l'activation Cav1.3 contribue à la MP, un bloqueur sélectif Cav1.3 devrait protéger les neurones dopaminergiques. Le signal épidémiologique combiné au rationnel mécanistique constitue une validation pharmacologique.",
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
        interpretation: "L'éthosuximide fournit la validation pharmacologique la plus propre d'un seul canal dans le modèle du facteur Q : un médicament, un sous-type de canal, un type de convulsion. Les variants génétiques CACNA1H confirment l'identité du canal. La connexion T-type → StAR → testostérone étend la validation aux prédictions reproductives de BERM.",
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
    convergenceTitle: "Argument de convergence pharmacologique",
    convergenceLead: "La preuve la plus forte pour tout mécanisme biologique est pharmacologique : si le blocage du canal de transduction proposé abolit l'effet, le mécanisme est confirmé. Quatorze classes de médicaments convergent sur les voies prédites par BERM :",
    convergencePoints: [
      "Voie A (VGCC) : CCB (23 études de blocage), vérapamil (blocage fréquence-dépendant), gabapentinoïdes (modulation α2δ), nimodipine (blocage CNS-sélectif), riluzole (inhibition de la libération de glutamate Ca²⁺-dépendante)",
      "Voie B (CRY/mélatonine) : Lithium (stabilisation CRY via GSK-3β, données eau potable à dose trace), mélatonine exogène (remplacement du point terminal)",
      "Hormèse/réinitialisation Ca²⁺ : Psilocybine (5-HT2A → burst Ca²⁺ contrôlé → réinitialisation plasticité), caféine (antagonisme adénosine A₁ → modulation Ca²⁺ biphasique)",
      "Cascade ROS : CoQ10 (sauvetage antioxydant, [[ref:bektas2026|données 5G Bektas 2026]]), mélatonine (double antioxydant + hormonal)",
      "Branche métabolique : Sémaglutide/agonistes GLP-1 (amplification voie Ca²⁺-ERK) — spéculatif mais testable",
    ],
    convergenceConclusion: "Aucune autre hypothèse d'exposition environnementale ne prédit que ces classes spécifiques de médicaments devraient être pertinentes pour les mêmes critères biologiques. La convergence pharmacologique — CCB, lithium, mélatonine, CoQ10, gabapentinoïdes, psilocybine, caféine et riluzole agissant sur des cibles Ca²⁺ distinctes mais connectées — constitue l'argument cliniquement le plus fort du modèle.",
    predictionLink: "Voir : Prédictions pharmacologiques (PHARM-1 à PHARM-5)",
    predictionHref: "/predictions",
  },
  ko: {
    title: "약리학적 증거",
    subtitle: "VGCC 활성화가 주요 전달 메커니즘이라면, 동일한 채널을 차단하거나 조절하는 약물은 EMF 관련 생물학적 효과를 감쇠시켜야 한다. 14개 약물 클래스가 수렴적 약리학적 증거를 제공한다.",
    backLink: "← 증거로 돌아가기",
    cardsTitle: "약물 증거 카드",
    cardsLead: "각 카드는 약물 클래스, BERM 관련 경로에 대한 작용 메커니즘, 주요 증거, 모델 해석을 제시한다. 증거 수준은 BERM 분류를 따른다: E = 실험적, C = 임상/역학적, M = 메커니즘적, L = 논리적 추론, L* = 추측적.",
    mechanismLabel: "기전",
    evidenceLabel: "증거",
    interpretationLabel: "모델 해석",
    cards: [
      {
        id: "CCB",
        drug: "칼슘채널차단제(CCB)",
        drugSub: "Nifedipine, amlodipine, verapamil, diltiazem",
        mechanism: "L형 VGCC 차단 → 주요 전달 노드(경로 A)에서 EMF 유도 Ca²⁺ 유입 방지. CCB는 BERM의 중심 메커니즘에 대한 가장 직접적인 약리학적 테스트이다.",
        evidence: [
          "[[ref:pall2013_v2|Pall 2013(J. Cell. Mol. Med.)]]: 23개 연구의 체계적 리뷰 — VGCC 차단제가 다양한 세포 유형, 노출 주파수, 평가변수에 걸쳐 EMF 유도 생물학적 효과를 방지 또는 감쇠. EMF 생체효과 연구에서 가장 많이 재현된 약리학적 발견.",
          "CCB는 264,000건 이상의 발표 연구가 있는 세계에서 가장 많이 처방되는 항고혈압약 클래스이다. 표적 Ca²⁺ 채널은 BERM이 EMF 전달 노드로 식별하는 채널과 동일하다.",
          "Amlodipine(가장 많이 처방되는 CCB)은 36시간 반감기로 거의 연속적인 VGCC 차단을 제공한다. 주변 EMF가 만성 저강도 VGCC 활성화를 유발한다면, amlodipine 사용자는 비CCB 항고혈압약 사용자와 비교하여 감쇠된 EMF 생체효과를 보여야 한다.",
          "Nifedipine(VK44/VK48): 조기진통의 1차 자궁이완제([[ref:nifed_tocolytic|Cochrane 2014]]) 및 자간전증 혈압 관리에도 사용. 동일 Ca²⁺ 채널 차단제가 2개의 서로 다른 산과 질환을 치료 — 둘 다 자궁/태반 Cav1.2 과활성화 관련.",
        ],
        interpretation: "CCB는 BERM 모델의 양성 약리학적 대조군이다. Nifedipine의 이중 산과적 사용(자궁이완 + 자간전증)은 검증을 생식 조직으로 확장한다: 동일 약물, 동일 채널, 2개의 임신 합병증. Verapamil의 β세포 보호와 23개 EMF 차단 연구를 합하면 CCB는 세포에서 임상까지 모든 수준에서 약리학적 증거를 제공한다.",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Verapamil(phenylalkylamine CCB)",
        drugSub: "비디히드로피리딘, 빈도 의존적 차단",
        mechanism: "Verapamil은 고유한 약리학적 특성을 갖는다: 빈도 의존적(사용 의존적) 채널 차단 — 채널이 자주 열릴수록 더 효과적으로 차단한다. EMF가 고빈도 VGCC 개방(IFO 메커니즘)을 유발한다면, verapamil은 amlodipine 같은 디히드로피리딘계보다 EMF 유도 Ca²⁺ 유입 차단에 불균형적으로 효과적이어야 한다.",
        evidence: [
          "Verapamil의 사용 의존적 차단은 심장 약리학(IV군 항부정맥제)에서 확립되어 있다. 동일 특성이 IFO 유도 빠른 채널 순환 차단에 이론적으로 최적이다.",
          "Lundberg 1996(Bioelectromagnetics): verapamil이 골세포에서 EMF 유도 칼슘 유출을 차단 — EMF-칼슘 경로가 생식 관련 조직에서 약리학적으로 차단 가능하다는 직접 증거.",
          "Verapamil은 칼슘 역학을 조절하여 운동성을 개선하는 정자 준비 프로토콜에서 생식의학에서도 사용된다.",
          "[[ref:verap_t1d_jama|Forlenza JAMA 2023]](VK43): verapamil이 신규 발병 T1D 소아에서 β세포 기능 보존 — 이중맹검 RCT(N=88, 7-17세)에서 52주 시점 C-peptide +30% vs 위약.",
          "[[ref:verap_t1d_natmed|Ovalle Nat Med 2018]]: verapamil이 최근 발병 T1D 성인에서 TXNIP 감소와 β세포 보호를 통해 3개월 및 12개월에 C-peptide 증가.",
        ],
        interpretation: "Verapamil의 사용 의존적 동력학은 EMF 효과에 대해 가장 효과적인 CCB임을 예측한다. [[ref:verap_t1d_jama|JAMA 2023 T1D RCT]]는 가장 강력한 약리학적 검증을 제공한다: Ca²⁺ 채널 차단제가 BERM이 EMF에 의한 Ca²⁺ 과부하로 파괴된다고 예측하는 바로 그 세포 유형(β세포)을 보호한다.",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Lithium",
        drugSub: "기분안정제, GSK-3β 억제제, 신경보호",
        mechanism: "Lithium은 CRY 단백질을 인산화하여 분해 표적으로 삼는 GSK-3β를 억제한다. GSK-3β 억제 → CRY 축적 → 더 강한 일주기 시계 → 향상된 melatonin 신호. Lithium은 BERM 경로 B(RPM/CRY → melatonin 억제)에 직접 대항한다.",
        evidence: [
          "Lithium은 시아노박테리아에서 인간까지 테스트된 모든 유기체에서 일주기 주기를 연장한다(McCarthy 2019, Translational Psychiatry). GSK-3β의 CRY 분해 억제를 통해 매개.",
          "Lithium은 양극성 환자에서 melatonin 분비를 증가시킨다(Hallam 2005, J. Psychopharmacology). EMF 유도 melatonin 억제와 반대 방향.",
          "Lithium은 여러 BERM 관련 메커니즘을 통해 신경보호적: GSK-3β 억제가 tau 인산화 감소, BDNF 상향조절이 신경가소성 지원, 항염증 효과가 신경염증 감소.",
          "음용수 lithium 역학(VK54): 수중 lithium이 자연적으로 높은 지역은 낮은 자살률(Kapusta 2011, Br J Psychiatry), 낮은 치매 발병률(Kessing 2017, JAMA Psychiatry), 낮은 우울증 유병률을 보인다. 용량은 치료량의 10-100분의 1 — 미량 농도에서의 CRY 경로 조절 시사.",
        ],
        interpretation: "Lithium은 경로 B의 약리학적 반증을 제공한다. CRY 매개 melatonin 억제가 EMF 생체효과에 기여한다면, lithium의 CRY 안정화는 경로 B 효과를 부분적으로 보호해야 한다. 음용수 데이터(VK54)는 치료적에서 미량 보호로 확장한다. 테스트 가능: lithium 치료 양극성 환자는 고EMF 환경에서 비lithium 기분안정제 사용 환자보다 일주기 교란이 적어야 한다.",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Semaglutide / GLP-1 수용체 작용제",
        drugSub: "Ozempic, Wegovy, Mounjaro(tirzepatide)",
        mechanism: "GLP-1R 신호는 췌장 β세포의 L형 VGCC를 활성화하여 인슐린 방출을 촉발한다([[ref:bhatt2012_glp1|Bhatt 2012]]). EMF가 L형 VGCC → Ca²⁺ → ERK 경로를 만성적으로 교란한다면, GLP-1 작용제는 채널 하류에서 동일 경로를 약리학적으로 증폭하여 이 교란을 부분적으로 교정할 수 있다.",
        evidence: [
          "Semaglutide의 대사증후군에서의 전례 없는 효능(15-20% 체중 감소, 심혈관 위험 감소, NASH 개선)은 BERM이 예측하는 다수의 대사 교란 평가변수에 매핑된다.",
          "[[ref:klimentidis2010|Klimentidis 패러독스(2011, Proc. R. Soc. B)]]: 8종 24개 집단이 모두 1970년대 이후 체중 증가(p = 1.2x10⁻⁷). 식이/운동은 통제된 식이의 실험동물 체중 증가를 설명하지 못한다.",
          "GLP-1은 뇌(NTS, 시상하부)에서 발현되어 칼슘 의존적 신호를 통해 식욕, 보상, 구역을 조절한다.",
        ],
        interpretation: "추측적: EMF가 L형 VGCC → Ca²⁺ → ERK 경로를 교란한다면, semaglutide의 효능은 환경 칼슘 교란에 대한 약리학적 보상으로 부분적으로 설명될 수 있다. 테스트 가능 예측: semaglutide 효능은 주변 EMF 수준과 상관해야 한다(METAB-3).",
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
        interpretation: "Nimodipine은 BERM 확장 모델에서 가장 정보량이 많은 단일 CCB이다: CNS 선택성으로 VGCC 활성화가 말초 평가변수와 독립적으로 EMF 관련 인지 및 신경퇴행 효과에 기여하는지 테스트할 수 있다.",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "외인성 melatonin",
        drugSub: "경로 B 종점 보충",
        mechanism: "Melatonin 보충은 BERM 경로 B(RPM/CRY → melatonin 억제)가 EMF 노출에 의해 감소한다고 예측하는 호르몬을 직접 보충한다. 이는 종점 보충이지 메커니즘 차단이 아니다.",
        evidence: [
          "[[ref:tbahriti2026|Tbahriti 등 2026]](Sleep Biol Rhythms, 55개 연구의 PRISMA 체계적 리뷰): 고품질 동물 연구의 88%가 EMF 유도 melatonin 억제 20-50% 보고. 외인성 melatonin이 이 결손을 보충한다.",
          "Melatonin은 ROS를 포착하는 강력한 항산화제 — 호르몬 기능과 독립적으로 산화 스트레스 연쇄반응(BERM 레벨 5A)에 직접 대항한다.",
          "Reiter 등 2007, 2014: 동물 모델에서 RF 유도 산화 손상에 대한 melatonin의 보호 효과를 보여주는 다수의 리뷰.",
        ],
        interpretation: "Melatonin은 BERM 경로 B의 가장 접근성 높은 약리학적 테스트이다. 야간 melatonin 보충(1-3 mg)이 고EMF 환경에서 EMF 관련 수면 장애를 감쇠하고 정자 매개변수를 개선한다면 melatonin 다리 가설을 지지한다. 주의: melatonin은 경로 C(BBB)나 D(HPA)를 다루지 않으므로 보호는 부분적이어야 한다.",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "코엔자임 Q10(CoQ10 / ubiquinone)",
        drugSub: "미토콘드리아 전자 운반체, 내인성 항산화제",
        mechanism: "CoQ10은 미토콘드리아 내막에서 전자전달계(복합체 I→III)의 전자를 운반한다. 또한 지용성 항산화제이다. BERM 레벨 5A(Ca²⁺ → 미토콘드리아 ROS)는 항산화 용량이 순 일일 손상을 결정한다고 예측한다.",
        evidence: [
          "[[ref:bektas2026|Bektas 등 2026]](Bioelectromagnetics): 3.5 GHz RF(5G 주파수)가 쥐에서 고환 및 산화적 손상 유도. CoQ10 보충이 손상 경감. 항산화제 보충이 5G 주파수 생식 손상을 보호하는 최초의 직접 입증.",
          "CoQ10 보충은 불임 남성의 정자 매개변수를 개선한다(Safarinejad 2012, 메타분석: 운동성과 농도 개선).",
          "CoQ10 수준은 노화와 함께 감소 — testosterone 감소와 증가하는 산화 스트레스와 동일한 시간 축을 추적한다.",
        ],
        interpretation: "CoQ10은 BERM의 회복 창의 약리학적 유사체이다: 노출 시간을 줄이는 대신 수리 속도를 향상시킨다. [[ref:bektas2026|Bektas 2026 결과]]는 약리학적 EMF 보호의 가장 강력한 단일 연구 증거이다.",
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
        interpretation: "Psilocybin은 만성 EMF Ca²⁺ 교란의 약리학적 역전이다: EMF가 연속적 저강도 VGCC 활성화 → 하류 열화를 생성하는 반면, psilocybin은 단일 제어된 세포 내 Ca²⁺ 분출 → 가소성 리셋을 생성한다.",
        level: "E|C",
      },
      {
        id: "CAFFEINE",
        drug: "Caffeine(adenosine A₁ 길항제)",
        drugSub: "세계에서 가장 많이 소비되는 향정신성 물질",
        mechanism: "Caffeine은 VGCC 매개 Ca²⁺ 방출을 정상적으로 억제하는 adenosine A₁ 수용체를 차단한다. 역설적으로 caffeine은 ryanodine 수용체(RyR)도 직접 조절하여 세포 내 Ca²⁺ 저장소를 감작시킨다. 순 효과는 이상성: 중간 용량은 Ca²⁺ 역학 수정으로 각성 증가; 고용량은 Ca²⁺ 과부하를 강화할 수 있다.",
        evidence: [
          "Caffeine의 Parkinson병 및 Alzheimer병에 대한 신경보호 효과(메타분석: OR 0.7-0.8)는 환경 원천의 만성 Ca²⁺ 과부하에 대항하는 중간 용량 Ca²⁺ 조절과 일치한다.",
          "용량-반응 곡선은 비선형(호르메시스): 2-4잔/일 보호적, 더 높은 용량은 중립 또는 유해. 이는 BERM의 χ 매개변수 호르메시스 곡선과 일치한다.",
          "Caffeine은 BBB를 자유롭게 통과하며 반감기 3-5시간으로, EMF의 연속 24/7 VGCC 활성화와 대조적으로 간헐적 Ca²⁺ 조절을 제공한다.",
        ],
        interpretation: "Caffeine의 세계적 보급은 만성 Ca²⁺ 교란에 대한 무의식적 약리학적 자가치료를 나타낼 수 있다. 2-4잔 보호 창은 호르메시스와 일치한다. BERM 예측: caffeine의 신경보호 이점은 고EMF 집단에서 더 커야 한다.",
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
          "직업 EMF 노출은 ALS 위험을 증가시킨다(메타분석: OR 1.3-1.7, Huss 2009, Zhou 2012). Riluzole의 Ca²⁺/glutamate 경로에서의 효능은 역학적 연관과 생물학적 메커니즘 사이의 메커니즘적 다리를 제공한다.",
        ],
        interpretation: "Riluzole은 BERM ALS 메커니즘의 약리학적 검증이다: ALS 진행을 늦추는 유일한 약물이 Ca²⁺ 의존적 glutamate 방출 차단으로 작용한다 — BERM이 EMF에 의해 활성화된다고 예측하는 바로 그 경로.",
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
        interpretation: "Isradipine은 BERM의 예측을 단일 채널 아형 수준에서 테스트한다: Cav1.3 활성화가 PD에 기여한다면, Cav1.3 선택적 차단제가 도파민 뉴런을 보호해야 한다. 역학적 신호와 메커니즘적 근거의 결합은 약리학적 검증을 구성한다.",
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
        interpretation: "Ethosuximide는 Q 인자 모델에서 가장 깨끗한 단일 채널 약리학적 검증을 제공한다: 1개 약물, 1개 채널 아형, 1개 경련 유형. CACNA1H 유전 변이가 채널 동일성을 확인. T형 → StAR → testosterone 연결은 BERM의 생식 예측으로 검증을 확장한다.",
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
    convergenceTitle: "약리학적 수렴 논증",
    convergenceLead: "모든 생물학적 메커니즘의 가장 강력한 증거는 약리학적이다: 제안된 전달 채널의 차단이 효과를 소멸시킨다면 메커니즘이 확인된다. 14개 약물 클래스가 BERM의 예측 경로에 수렴한다:",
    convergencePoints: [
      "경로 A(VGCC): CCB(23개 차단 연구), verapamil(빈도 의존적 차단), gabapentinoid계(α2δ 조절), nimodipine(CNS 선택적 차단), riluzole(Ca²⁺ 의존적 glutamate 방출 억제)",
      "경로 B(CRY/melatonin): Lithium(GSK-3β를 통한 CRY 안정화, 미량 음용수 데이터), 외인성 melatonin(종점 보충)",
      "Ca²⁺ 호르메시스/리셋: Psilocybin(5-HT2A → 제어된 Ca²⁺ 분출 → 가소성 리셋), caffeine(adenosine A₁ 길항 → 이상성 Ca²⁺ 조절)",
      "ROS 연쇄반응: CoQ10(항산화 구조, [[ref:bektas2026|Bektas 2026 5G 데이터]]), melatonin(이중 항산화 + 호르몬)",
      "대사 분기: Semaglutide/GLP-1 작용제(Ca²⁺-ERK 경로 증폭) — 추측적이나 테스트 가능",
    ],
    convergenceConclusion: "다른 어떤 환경 노출 가설도 이 특정 약물 클래스들이 동일한 생물학적 평가변수에 관련되어야 한다고 예측하지 않는다. 약리학적 수렴 — CCB, lithium, melatonin, CoQ10, gabapentinoid계, psilocybin, caffeine, riluzole이 서로 다르지만 연결된 Ca²⁺ 표적에 작용 — 은 모델의 임상적으로 가장 강력한 논거를 구성한다.",
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
