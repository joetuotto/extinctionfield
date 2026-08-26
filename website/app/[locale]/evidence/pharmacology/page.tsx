import type { Metadata } from "next";
import Link from "next/link";
import { Pill } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const COPY = {
  en: {
    title: "Pharmacological Evidence",
    subtitle: "If VGCC activation is the primary transduction mechanism, drugs that block or modulate the same channels should attenuate EMF-associated biological effects. Eleven drug classes provide convergent pharmacological evidence.",
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
          "Pall 2013 (J. Cell. Mol. Med.): systematic review of 23 studies — VGCC blockers prevent or attenuate EMF-induced biological effects across cell types, exposure frequencies, and endpoints. The most replicated pharmacological finding in EMF bioeffects research.",
          "CCBs are the most prescribed antihypertensive class globally with >264,000 published studies. They are among the best-characterized drugs in clinical medicine. The Ca²⁺ channel they target is the same channel BERM identifies as the EMF transduction node.",
          "Amlodipine (the most prescribed CCB) has a 36-hour half-life — providing near-continuous VGCC blockade. If ambient EMF causes chronic low-grade VGCC activation, amlodipine users should show attenuated EMF bioeffects compared to users of non-CCB antihypertensives.",
          "Nifedipine (VK44/VK48): first-line tocolytic for preterm labor (Cochrane 2014) AND used for pre-eclampsia hypertension management. The same Ca²⁺ channel blocker treats two distinct obstetric conditions — both involving uterine/placental Cav1.2 over-activation. If Ca²⁺ blockade prevents preterm labor and treats pre-eclampsia, Ca²⁺ overload is the pathogenic mechanism.",
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
          "Forlenza JAMA 2023 (VK43): verapamil preserves β-cell function in children with new-onset T1D — C-peptide +30% vs placebo at 52 weeks in double-blind RCT (N=88, ages 7-17). Confirms VK12: if Ca²⁺ channel blockade saves β-cells, then Ca²⁺ overload destroys them.",
          "Ovalle Nat Med 2018: verapamil increases C-peptide at 3 and 12 months in adults with recent-onset T1D via TXNIP reduction and β-cell protection.",
        ],
        interpretation: "Verapamil's use-dependent kinetics predict it should be the most effective CCB against EMF effects. The JAMA 2023 T1D RCT provides the strongest pharmacological validation: a Ca²⁺ channel blocker protects the exact cell type (β-cells) that BERM predicts EMF destroys via Ca²⁺ overload (VK12). Combined with Nat Med 2018 adult data and Diabetes Care 2025 observational evidence, verapamil's β-cell protection is a triple-confirmed BERM prediction.",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Lithium",
        drugSub: "Mood stabilizer, GSK-3β inhibitor, neuroprotective",
        mechanism: "Lithium inhibits GSK-3β, which phosphorylates CRY proteins and targets them for degradation. GSK-3β inhibition → CRY accumulates → stronger circadian clock → enhanced melatonin signaling. Lithium also stabilizes circadian period length and increases melatonin secretion — directly opposing BERM pathway C (CRY/RPM → melatonin suppression).",
        evidence: [
          "Lithium lengthens circadian period in every organism tested from cyanobacteria to humans (McCarthy 2019, Translational Psychiatry). This is mediated by GSK-3β inhibition of CRY degradation.",
          "Lithium increases melatonin secretion in bipolar patients (Hallam 2005, J. Psychopharmacology). This is the opposite direction to EMF-induced melatonin suppression (Tbahriti 2026 PRISMA: 88% of high-quality animal studies report EMF-induced melatonin suppression).",
          "Lithium is neuroprotective via multiple BERM-relevant mechanisms: GSK-3β inhibition reduces tau phosphorylation (Alzheimer's pathway), BDNF upregulation supports neuroplasticity, and anti-inflammatory effects reduce neuroinflammation. All three are downstream of BERM's Ca²⁺ disruption cascade.",
          "Drinking water lithium epidemiology (VK54): regions with naturally elevated lithium in water show lower suicide rates (Kapusta 2011, Br J Psychiatry), lower dementia incidence (Kessing 2017, JAMA Psychiatry), and lower depression prevalence. The dose is 10–100× below therapeutic — suggesting CRY-pathway modulation at trace concentrations. BERM interpretation: trace lithium provides tonic CRY stabilization, partially protecting pathway C at a population level.",
        ],
        interpretation: "Lithium provides pathway C pharmacological counter-evidence. If CRY-mediated melatonin suppression contributes to EMF bioeffects, lithium's CRY stabilization and melatonin enhancement should partially protect against pathway C effects. The drinking water data (VK54) extends this from therapeutic to trace-dose protection — regions with higher water lithium may have partial, population-level EMF resilience via pathway C. Testable: lithium-treated bipolar patients should show less circadian disruption in high-EMF environments compared to bipolar patients on non-lithium mood stabilizers (e.g. valproate).",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Semaglutide / GLP-1 receptor agonists",
        drugSub: "Ozempic, Wegovy, Mounjaro (tirzepatide)",
        mechanism: "GLP-1R signaling activates L-type VGCCs in pancreatic β-cells to trigger insulin release (Bhatt 2012). If EMF chronically disrupts the L-type VGCC → Ca²⁺ → ERK pathway, GLP-1 agonists may partially correct this disruption by pharmacologically amplifying the same pathway downstream of the channel.",
        evidence: [
          "Semaglutide's unprecedented efficacy in metabolic syndrome (15–20% weight loss, cardiovascular risk reduction, NASH improvement, kidney protection) maps onto multiple BERM-predicted metabolic disruption endpoints. The breadth of benefit is consistent with correcting an upstream disruption rather than a downstream symptom.",
          "The Klimentidis paradox (2011, Proc. R. Soc. B): 24 populations of 8 species have all gained weight since the 1970s (p = 1.2×10⁻⁷). Diet/exercise cannot explain weight gain in laboratory animals on controlled diets. An environmental factor affecting calcium-dependent metabolic pathways is consistent with BERM.",
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
        drugSub: "Pathway C endpoint supplementation",
        mechanism: "Melatonin supplementation directly replaces the hormone that BERM pathway C (CRY/RPM → melatonin suppression) predicts is reduced by EMF exposure. This is endpoint supplementation, not mechanism blockade — it does not prevent EMF-induced CRY disruption but compensates for its downstream hormonal consequence.",
        evidence: [
          "Tbahriti et al. 2026 (Sleep Biol Rhythms, PRISMA systematic review of 55 studies): 88% of high-quality animal studies report EMF-induced melatonin suppression of 20–50% from baseline. Exogenous melatonin would replace this deficit.",
          "Melatonin is a potent antioxidant that scavenges ROS — directly counteracting the oxidative stress cascade (BERM Level 5A) independently of its hormonal function. This dual action (antioxidant + hormonal replacement) makes it effective against both pathway A downstream (ROS) and pathway C downstream (melatonin deficit).",
          "Reiter et al. 2007, 2014: multiple reviews demonstrating melatonin's protective effects against RF-induced oxidative damage in animal models. Dose-dependent protection consistent with BERM's recovery window model.",
        ],
        interpretation: "Melatonin is the most accessible pharmacological test of BERM pathway C. If nighttime melatonin supplementation (1–3 mg, timed to natural secretion) attenuates EMF-associated sleep disruption and improves sperm parameters in high-EMF environments, it supports the melatonin bridge hypothesis. Caveat: melatonin does not address pathways A (VGCC) or B (ELF), so protection should be partial.",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "Coenzyme Q10 (CoQ10 / ubiquinone)",
        drugSub: "Mitochondrial electron carrier, endogenous antioxidant",
        mechanism: "CoQ10 operates at the mitochondrial inner membrane where it shuttles electrons in the electron transport chain (complex I→III). It is also a lipid-soluble antioxidant that neutralizes ROS in membranes. BERM's Level 5A (Ca²⁺ → mitochondrial ROS) predicts that antioxidant capacity determines net daily damage: net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair)). CoQ10 supplementation reduces τ_repair by increasing antioxidant capacity.",
        evidence: [
          "Bektas et al. 2026 (Bioelectromagnetics): 3.5 GHz RF (5G frequency) induced testicular and oxidative damage in rats. CoQ10 supplementation ameliorated the damage. This is the first direct demonstration that antioxidant supplementation protects against 5G-frequency reproductive damage.",
          "CoQ10 supplementation improves sperm parameters in subfertile men (Safarinejad 2012, meta-analysis: improved motility and concentration). If part of modern sperm decline is EMF-mediated oxidative damage, CoQ10's benefit is mechanistically consistent.",
          "CoQ10 levels decline with age — tracking the same timeline as testosterone decline and rising oxidative stress. Age-related CoQ10 depletion would amplify EMF-induced oxidative damage by reducing repair capacity.",
        ],
        interpretation: "CoQ10 is the pharmacological analogue of BERM's recovery window: instead of reducing exposure time, it enhances repair rate. The Bektas 2026 result is the strongest single-study evidence for pharmacological EMF protection. CoQ10 addresses pathway A downstream (ROS) but not the upstream transduction (VGCC activation) or pathways B/C.",
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
    ],
    convergenceTitle: "Pharmacological convergence argument",
    convergenceLead: "The strongest evidence for any biological mechanism is pharmacological: if blocking the proposed transduction channel abolishes the effect, the mechanism is confirmed. Eleven drug classes converge on BERM's predicted pathways:",
    convergencePoints: [
      "Pathway A (VGCC): CCBs (23 blocker studies), verapamil (frequency-dependent blockade), gabapentinoids (α2δ modulation), nimodipine (CNS-selective blockade), riluzole (Ca²⁺-dependent glutamate release inhibition)",
      "Pathway C (CRY/melatonin): Lithium (CRY stabilization via GSK-3β, trace-dose drinking water data), exogenous melatonin (endpoint replacement)",
      "Ca²⁺ hormesis/reset: Psilocybin (5-HT2A → controlled Ca²⁺ burst → plasticity reset), caffeine (adenosine A₁ antagonism → biphasic Ca²⁺ modulation)",
      "ROS cascade: CoQ10 (antioxidant rescue, Bektas 2026 5G data), melatonin (dual antioxidant + hormonal)",
      "Metabolic branch: Semaglutide/GLP-1 agonists (Ca²⁺-ERK pathway amplification) — speculative but testable",
    ],
    convergenceConclusion: "No other environmental exposure hypothesis predicts that these specific drug classes should be relevant to the same biological endpoints. The pharmacological convergence — CCBs, lithium, melatonin, CoQ10, gabapentinoids, psilocybin, caffeine, and riluzole acting on distinct but connected Ca²⁺ targets — constitutes the model's clinically strongest argument.",
    predictionLink: "See: Pharmacological predictions (PHARM-1 through PHARM-5)",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Farmakologinen evidenssi",
    subtitle: "Jos VGCC-aktivaatio on primaarinen transduutiomekanismi, lääkkeet jotka blokkaavat tai moduloivat samoja kanavia pitäisi vaimentaa EMF:ään liittyviä biologisia vaikutuksia. Yksitoista lääkeryhmää tarjoaa konvergoivan farmakologisen evidenssin.",
    backLink: "← Takaisin evidenssiin",
    cardsTitle: "Lääke-evidenssikortit",
    cardsLead: "Jokainen kortti esittää lääkeryhmän, sen vaikutusmekanismin BERM:n kannalta relevantille reitille, avainevidenssin ja mallitulkinnan. Evidenssitasot noudattavat BERM-luokittelua: E = kokeellinen, C = kliininen/epidemiologinen, M = mekanistinen, L = looginen päätelmä, L* = spekulatiivinen.",
    cards: [
      {
        id: "CCB",
        drug: "Kalsiumkanavan salpaajat (CCB:t)",
        drugSub: "Nifedipiini, amlodipiini, verapamiili, diltiatseemi",
        mechanism: "L-tyypin VGCC-salppaus → estää EMF:n aiheuttaman Ca²⁺-influksin primaarisessa transduuktiopisteessä (reitti A). CCB:t ovat suorin farmakologinen testi BERM:n keskeiselle mekanismille.",
        evidence: [
          "Pall 2013 (J. Cell. Mol. Med.): systemaattinen katsaus 23 tutkimuksesta — VGCC-salpaajat estävät tai vaimentavat EMF:n aiheuttamia biologisia vaikutuksia eri solutyypeissä, altistustaajuuksilla ja päätepisteissä. Eniten toistettu farmakologinen havainto EMF-bioeffektitutkimuksessa.",
          "CCB:t ovat maailmanlaajuisesti eniten määrätty verenpainelääkeryhmä yli 264 000 julkaistulla tutkimuksella. Ca²⁺-kanava johon ne kohdistuvat on sama kanava jonka BERM tunnistaa EMF:n transduutiopisteeksi.",
          "Amlodipiinilla (eniten määrätty CCB) on 36 tunnin puoliintumisaika — tarjoten lähes jatkuvan VGCC-salppauksen. Jos ympäröivä EMF aiheuttaa kroonista matala-asteista VGCC-aktivaatiota, amlodipiinin käyttäjillä pitäisi näkyä vaimennettuja EMF-bioeffektejä verrattuna muiden verenpainelääkkeiden käyttäjiin.",
        ],
        interpretation: "CCB:t ovat BERM-mallin positiivinen farmakologinen kontrolli. Jos EMF toimii VGCC:n kautta, CCB-käyttäjät muodostavat populaatiotason 'osittaisen Faradayn häkin' — farmakologisesti suojattuja transduutiopisteessä.",
        level: "E",
        critical: true,
      },
      {
        id: "VERAPAMIL",
        drug: "Verapamiili (fenyylialkylamiini-CCB)",
        drugSub: "Ei-dihydropyridini, taajuusriippuvainen salppaus",
        mechanism: "Verapamiililla on ainutlaatuinen ominaisuus: taajuusriippuvainen (käyttöriippuvainen) kanavasalppaus — se salppaa VGCC:itä tehokkaammin kun kanavat avautuvat usein. Jos EMF aiheuttaa korkeataajuista VGCC-avautumista (IFO-mekanismi), verapamiilin pitäisi olla suhteettoman tehokas EMF-indusoidun Ca²⁺-influksin estämisessä.",
        evidence: [
          "Verapamiilin käyttöriippuvainen salppaus on vakiintunut sydänfarmakologiassa (luokka IV antiarytminen). Sama ominaisuus tekee siitä teoreettisesti optimaalisen IFO-indusoidun nopean kanavasyklin estämiseen.",
          "Lundberg 1996 (Bioelectromagnetics): verapamiili esti EMF:n aiheuttaman kalsiumeffluksin luusoluissa — suora evidenssi siitä, että EMF-kalsiumreitti on farmakologisesti estettävissä.",
          "Verapamiilia käytetään myös lisääntymislääketieteessä siittiöiden valmisteluprotokollissa, joissa se voi parantaa motiliteettia moduloimalla kalsiumdynamiikkaa.",
        ],
        interpretation: "Verapamiilin käyttöriippuvainen kinetiikka ennustaa sen olevan tehokkain CCB EMF-vaikutuksia vastaan. Vertailututkimus verapamiili vs. amlodipiini vs. ei-CCB verenpainelääke siittiöiden laatupäätepisteillä olisi korkean erottelukyvyn testi.",
        level: "E|M",
      },
      {
        id: "LITHIUM",
        drug: "Litium",
        drugSub: "Mielialantasaaja, GSK-3β-inhibiittori, neuroprotektiivinen",
        mechanism: "Litium inhiboi GSK-3β:tä, joka fosforyloi CRY-proteiineja ja kohdistaa ne hajoamiseen. GSK-3β-inhibitio → CRY akkumuloituu → vahvempi sirkadiaaninen kello → parantunut melatoniinisignalointi. Litium vastustaa suoraan BERM:n reittiä C (CRY/RPM → melatoniinisuppressio).",
        evidence: [
          "Litium pidentää sirkadiaanista periodia kaikissa testatuissa organismeissa syanobakteereista ihmisiin (McCarthy 2019, Translational Psychiatry). Tämä välittyy GSK-3β:n CRY-degradaation inhibition kautta.",
          "Litium lisää melatoniinineritystä bipolaaripotilailla (Hallam 2005, J. Psychopharmacology). Tämä on vastakkainen suunta kuin EMF:n aiheuttama melatoniinisuppressio.",
          "Litium on neuroprotektiivinen useiden BERM-relevanttien mekanismien kautta: GSK-3β-inhibitio vähentää tau-fosforylaatiota, BDNF-upregulation tukee neuroplastisuutta ja anti-inflammatoriset vaikutukset vähentävät neuroinflammatiota.",
          "Juomaveden litium-epidemiologia (VK54): alueet joilla on luonnollisesti kohonnut litium vedessä, näyttävät matalampia itsemurhalukuja (Kapusta 2011, Br J Psychiatry), vähemmän dementiaa (Kessing 2017, JAMA Psychiatry) ja vähemmän masennusta. Annos on 10–100× alle terapeuttisen — viitaten CRY-reitin modulaatioon hivenpitoisuuksilla. BERM-tulkinta: hivenlitium tarjoaa toonisen CRY-stabiloinnin, osittain suojaten reittiä C väestötasolla.",
        ],
        interpretation: "Litium tarjoaa reitin C farmakologisen vasta-evidenssin. Jos CRY-välitteinen melatoniinisuppressio osallistuu EMF-bioeffekteihin, litiumin CRY-stabiloinnin pitäisi osittain suojata reitin C vaikutuksilta. Juomavesidata (VK54) laajentaa tämän terapeuttisesta hivenpitoisuussuojaukseen — alueet joilla on korkeampi vesilitium voivat saada osittaista, väestötason EMF-resilienttiyttä reitin C kautta.",
        level: "M|C",
      },
      {
        id: "SEMAGLUTIDE",
        drug: "Semaglutidi / GLP-1-reseptoriagonistit",
        drugSub: "Ozempic, Wegovy, Mounjaro (tirtsepatidi)",
        mechanism: "GLP-1R-signalointi aktivoi L-tyypin VGCC:itä haiman β-soluissa insuliinin vapautumiseksi (Bhatt 2012). Jos EMF kroonisesti häiritsee L-tyypin VGCC → Ca²⁺ → ERK -reittiä, GLP-1-agonistit voivat osittain korjata tämän häiriön vahvistamalla samaa reittiä farmakologisesti kanavan alapuolelta.",
        evidence: [
          "Semaglutidin ennennäkemätön tehokkuus metabolisessa oireyhtymässä (15–20 % painonlasku, CV-riskin vähentyminen, NASH-parannus) kartoittuu useille BERM:n ennustamille metabolisen häiriön päätepisteille.",
          "Klimentidis-paradoksi (2011, Proc. R. Soc. B): 24 populaatiota 8 lajista on kaikki lihoneet 1970-luvulta (p = 1,2×10⁻⁷). Ruokavalio/liikunta ei selitä painonnousua kontrolloiduilla ruokavalioilla olevilla koe-eläimillä.",
          "GLP-1:tä ilmennetään aivoissa (NTS, hypotalamus) missä se moduloi ruokahalua, palkitsemista ja pahoinvointia kalsiumriippuvaisen signaloinnin kautta.",
        ],
        interpretation: "SPEKULATIIVINEN: jos EMF häiritsee L-tyypin VGCC → Ca²⁺ → ERK -reittiä, semaglutidin tehokkuus voi osittain selittyä farmakologisella kompensoinnilla ympäristöperäiselle kalsiumhäiriölle. Testattava ennuste: semaglutidin tehokkuuden pitäisi korreloida ympäröivän EMF-tason kanssa (METAB-3).",
        level: "L*",
      },
      {
        id: "GABAPENTINOID",
        drug: "Gabapentinoidit",
        drugSub: "Gabapentiini, pregabaliini (Lyrica)",
        mechanism: "Gabapentinoidit sitoutuvat jänniteriippuvaisten kalsiumkanavien α2δ-alayksikköön, vähentäen Ca²⁺-influksia presynaptisissa terminaaleissa. Tämä EI ole sama alayksikkö kuin CCB:iden kohteena oleva α1-huokosyksikkö.",
        evidence: [
          "Gabapentiinia ja pregabaliinia määrätään neuropaattiseen kipuun, epilepsiaan ja ahdistukseen — tiloihin jotka liittyvät neuronaaliseen kalsiumhypereksitabiliteettiin.",
          "Pregabaliinilla on tunnettu haittavaikutus: alentunut libido ja seksuaalinen toimintahäiriö (Calabrò 2015). Tämä on yhdenmukainen: gabapentinoidit suppressoivat KAIKKEA kalsiumriippuvaista signalointia, mukaan lukien normaalit reproduktiiviset hormonireitit.",
          "α2δ-alayksikköä ilmennetään runsaasti dorsaalisissa takajuuriganglioissa ja selkäytimessä. Sitä ilmennetään myös hypotalamuksessa, missä se voisi moduloida GnRH-pulsatiliteettia (BERM-taso 7).",
        ],
        interpretation: "Gabapentinoidit tarjoavat farmakologisen dissektion BERM:n kalsiummallista: ne moduloivat eri kalsiumkanavan alayksikköä kuin CCB:t, ennustaen osittain päällekkäisiä mutta erotettavia vaikutuksia.",
        level: "M",
      },
      {
        id: "NIMODIPINE-ETH",
        drug: "Nimodipiini (L-tyypin CCB, CNS-selektiivinen)",
        drugSub: "Dihydropyridiini BBB-penetraatiolla",
        mechanism: "Nimodipiini läpäisee veri-aivoesteen — toisin kuin useimmat muut dihydropyridiini-CCB:t — ja salppaa preferoiden L-tyypin VGCC:itä aivoverisuonistossa ja neuroneissa.",
        evidence: [
          "Nimodipiini on FDA-hyväksytty aivoverisuonispasmien ehkäisyyn subaraknoidaalivuodon jälkeen. Sen neuroprotektiivinen mekanismi (kalsiumvälitteinen) limittyy BERM:n ennustamien CNS-vaikutusten kanssa.",
          "Jatkuva kliininen kiinnostus nimodipiiniin Alzheimerin taudin ja vaskulaarisen dementian hoidossa viittaa siihen, että kalsiumkanavasäätelyn häiriö osallistuu neurodegeneraatioon.",
          "Nimodipiinin BBB-penetraatio tekee siitä ainoan CCB:n joka voisi teoreettisesti vaimentaa EMF-vaikutuksia sekä perifeerisissä (reproduktiiviset) että sentraalisissa (kognitiiviset, sirkadiaaniset) päätepisteissä samanaikaisesti.",
        ],
        interpretation: "Nimodipiini on informatiivisin yksittäinen CCB BERM:n laajennetulle mallille: sen CNS-selektiivisyys mahdollistaa sen hypoteesin testaamisen, että VGCC-aktivaatio osallistuu EMF-assosioituihin kognitiivisiin ja neurodegeneratiivisiin vaikutuksiin riippumatta perifeerisistä päätepisteistä.",
        level: "M|L",
      },
      {
        id: "MELATONIN",
        drug: "Eksogeeninen melatoniini",
        drugSub: "Reitin C päätepisteen täydennys",
        mechanism: "Melatoniinilisä korvaa suoraan hormonin, jonka BERM:n reitti C (CRY/RPM → melatoniinisuppressio) ennustaa vähenevän EMF-altistuksesta. Tämä on päätepisteen supplementointi, ei mekanismin salppaus.",
        evidence: [
          "Tbahriti ym. 2026 (Sleep Biol Rhythms, PRISMA-katsaus 55 tutkimuksesta): 88 % korkealaatuisista eläintutkimuksista raportoi EMF:n aiheuttaman melatoniinisuppression 20–50 % lähtötasosta.",
          "Melatoniini on voimakas antioksidantti joka neutraloi ROS:ia — vastatoimena oksidatiivisen stressin kaskadille (BERM-taso 5A) riippumatta sen hormonaalisesta funktiosta.",
          "Reiter ym. 2007, 2014: melatoniinin suojaavat vaikutukset RF-indusoidulta oksidatiiviselta vauriolta eläinmalleissa.",
        ],
        interpretation: "Melatoniini on helpoiten saatavilla oleva farmakologinen testi BERM:n reitille C. Jos yöllinen melatoniinilisä (1–3 mg) vaimentaa EMF-assosioitua unihäiriötä ja parantaa siittiöparametreja korkean EMF:n ympäristöissä, se tukee melatoniinisilta-hypoteesia.",
        level: "E|M",
      },
      {
        id: "COENZYME-Q10",
        drug: "Koentsyymi Q10 (CoQ10 / ubikinooni)",
        drugSub: "Mitokondriaalinen elektroninkuljettaja, endogeeninen antioksidantti",
        mechanism: "CoQ10 toimii mitokondrian sisäkalvolla elektroninsiirtoketjussa (kompleksi I→III). Se on myös rasvaliukoinen antioksidantti. BERM:n taso 5A (Ca²⁺ → mitokondriaalinen ROS) ennustaa, että antioksidanttikapasiteetti määrää nettopäivävaurion.",
        evidence: [
          "Bektas ym. 2026 (Bioelectromagnetics): 3,5 GHz RF (5G-taajuus) aiheutti kivesten ja oksidatiivista vauriota rotilla. CoQ10-supplementaatio lievitti vauriota. Ensimmäinen suora osoitus siitä, että antioksidanttilisä suojaa 5G-taajuuden reproduktiiviselta vauriolta.",
          "CoQ10-supplementaatio parantaa siittiöparametreja subfertileillä miehillä (Safarinejad 2012: parantunut motiliteetti ja konsentraatio).",
          "CoQ10-tasot laskevat iän myötä — seuraten samaa aikajanaa kuin testosteronin lasku ja nouseva oksidatiivinen stressi.",
        ],
        interpretation: "CoQ10 on BERM:n palautumisikkunan farmakologinen analogi: sen sijaan että vähennettäisiin altistusaikaa, se tehostaa korjausnopeutta. Bektas 2026 -tulos on vahvin yksittäisen tutkimuksen evidenssi farmakologisesta EMF-suojauksesta.",
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
        mechanism: "Kofeiini estää adenosiini A₁ -reseptorit, jotka normaalisti inhiboivat VGCC-välitteistä Ca²⁺-vapautusta. Paradoksaalisesti kofeiini myös moduloi suoraan ryanodiinireseptoreja (RyR), herkistäen solunsisäisiä Ca²⁺-varastoja. Kokonaisvaikutus on kaksivaiheinen: kohtuulliset annokset lisäävät vireystilaa modifioimalla Ca²⁺-dynamiikkaa; korkeat annokset voivat tehostaa Ca²⁺-ylikuormitusta. Kofeiini on siis luonnollinen Ca²⁺-modulaattori — viides BERM:n endogeenisessä/ravintoperäisessä modulointipaneelissa (D-vitamiinin, melatoniinin, magnesiumin ja litiumin rinnalla).",
        evidence: [
          "Kofeiinin neuroprotektiiviset vaikutukset Parkinsonia ja Alzheimeria vastaan (meta-analyysit: OR 0,7–0,8) ovat yhdenmukaisia Ca²⁺-modulaation kanssa kohtuullisilla annoksilla vastustaen kroonista Ca²⁺-ylikuormitusta ympäristölähteistä.",
          "Annos-vaste on epälineaarinen (hormeesi): 2–4 kuppia/päivä suojaava, korkeammat annokset neutraaleja tai haitallisia. Tämä vastaa BERM:n χ-parametrin hormeesikäyrää — kohtuullinen Ca²⁺-modulaatio on hyödyllistä, ylimäärä tehostaa vauriota.",
          "Kofeiini läpäisee BBB:n vapaasti ja sen puoliintumisaika on 3–5 tuntia, tarjoten ajoittaista eikä jatkuvaa Ca²⁺-modulaatiota — vastakohta EMF:n jatkuvalle 24/7 VGCC-aktivaatiolle.",
        ],
        interpretation: "Kofeiinin maailmanlaajuinen prevalenssi voi edustaa tiedostamatonta farmakologista itselääkintää kroonista Ca²⁺-häiriötä vastaan. 2–4 kupin suojaava ikkuna on linjassa hormeesin kanssa: tarpeeksi moduloidakseen mutta ei ylikuormittaakseen Ca²⁺-signalointia. BERM-ennuste: kofeiinin neuroprotektiivinen hyöty pitäisi olla suurempi korkean EMF:n populaatioissa.",
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
        interpretation: "Rilutsoli on BERM:n ALS-mekanismin farmakologinen validointi: ainoa lääke joka hidastaa ALS:n etenemistä toimii estämällä Ca²⁺-riippuvaista glutamaatin vapautumista — juuri se reitti jonka BERM ennustaa EMF:n aktivoivan. Ammatillinen EMF-ALS epidemiologinen data (OR 1,3–1,7) plus rilutsolin Ca²⁺-kohdistuva mekanismi muodostavat farmakologisen konvergenssin sairaustasolla.",
        level: "E|C",
      },
    ],
    convergenceTitle: "Farmakologinen konvergenssiarumentti",
    convergenceLead: "Vahvin evidenssi mille tahansa biologiselle mekanismille on farmakologinen: jos ehdotetun transduuktiokanavan salppaus kumoaa vaikutuksen, mekanismi on vahvistettu. Yksitoista lääkeryhmää konvergoivat BERM:n ennustamille reiteille:",
    convergencePoints: [
      "Reitti A (VGCC): CCB:t (23 salppajatutkimusta), verapamiili (taajuusriippuvainen salppaus), gabapentinoidit (α2δ-modulaatio), nimodipiini (CNS-selektiivinen salppaus), rilutsoli (Ca²⁺-riippuvaisen glutamaatin vapautumisen esto)",
      "Reitti C (CRY/melatoniini): Litium (CRY-stabilointi GSK-3β:n kautta, hivenpitoisuus juomavedessä), eksogeeninen melatoniini (päätepisteen korvaus)",
      "Ca²⁺-hormeesi/resetointi: Psilosybiini (5-HT2A → kontrolloitu Ca²⁺-pursuke → plastisuusresetti), kofeiini (adenosiini A₁ -antagonismi → kaksivaiheinen Ca²⁺-modulaatio)",
      "ROS-kaskadi: CoQ10 (antioksidanttipelastus, Bektas 2026 5G-data), melatoniini (kaksois-antioksidantti + hormonaalinen)",
      "Metabolinen haara: Semaglutidi/GLP-1-agonistit (Ca²⁺-ERK-reitin vahvistus) — spekulatiivinen mutta testattava",
    ],
    convergenceConclusion: "Mikään muu ympäristöaltistushypoteesi ei ennusta, että juuri nämä lääkeryhmät olisivat relevantteja samoille biologisille päätepisteille. Farmakologinen konvergenssi — CCB:t, litium, melatoniini, CoQ10, gabapentinoidit, psilosybiini, kofeiini ja rilutsoli vaikuttaen erillisiin mutta yhteydessä oleviin Ca²⁺-kohteisiin — muodostaa mallin kliinisesti vahvimman argumentin.",
    predictionLink: "Ks. Farmakologiset ennusteet (PHARM-1–PHARM-5)",
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
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function PharmacologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
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
                    {locale === "fi" ? "Mekanismi" : "Mechanism"}
                  </p>
                  <p className="text-sm leading-relaxed">{card.mechanism}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {locale === "fi" ? "Evidenssi" : "Evidence"}
                  </p>
                  <ul className="space-y-2">
                    {card.evidence.map((e, i) => (
                      <li key={i} className="text-sm leading-relaxed text-foreground-muted pl-3 border-l-2 border-card-border">
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {locale === "fi" ? "Mallitulkinta" : "Model interpretation"}
                  </p>
                  <p className="text-sm leading-relaxed italic text-foreground-muted">{card.interpretation}</p>
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
            <li key={i} className="text-sm leading-relaxed pl-4 border-l-2 border-accent/30">{point}</li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed font-medium max-w-3xl">{d.convergenceConclusion}</p>
        <p className="mt-4">
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">
            {d.predictionLink} →
          </Link>
        </p>
      </section>
    </div>
  );
}
