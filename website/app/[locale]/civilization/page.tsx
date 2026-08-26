import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Landmark, ArrowRight, AlertTriangle, Baby, Building2, Users, Brain, Heart, Shield, TrendingDown, Zap, Target } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const COPY = {
  en: {
    title: "Civilization",
    subtitle:
      "What happens to a society when the hormonal substrate of both sexes changes simultaneously?",
    heroLead:
      "Testosterone, estrogen, dopamine, cortisol, oxytocin, and melatonin are not just medical terms. They are the biological infrastructure of motivation, trust, bonding, sleep, reproduction, and cognition. When electromagnetic fields disrupt the calcium channels that regulate these hormones, the effects propagate from molecules to cells to organs to individuals to families to institutions.",
    heroTrail:
      "This page traces that propagation — from seven randomized controlled trials to population-level behavioral data to the dynamics of civilizational change.",
    levelNote:
      "This is the model’s third level: Level 1 is mechanism (Model), Level 2 is evidence (Evidence), Level 3 is consequences (this page).",

    s2title: "Two Parallel Disruptions",
    s2lead:
      "EMF → VGCC → Ca²⁺ is the same mechanism in both sexes. But because the endocrine systems differ, the downstream consequences are sex-specific — and complementary.",
    maleTitle: "Male disruption profile",
    malePrimary: "Testosterone ↓ (Cav3.2 → StAR)",
    maleSecondary: "Dopamine ↓ (VTA Cav1.3)",
    maleTertiary: "Cortisol ↑ (HPA activation)",
    maleReproductive:
      "Sperm: −62% concentration (Levine 2023), DNA fragmentation ↑, motility ↓. Testosterone below spermatogenic threshold projected by ~2070.",
    femaleTitle: "Female disruption profile",
    femalePrimary: "Estrogen/progesterone cycle disruption",
    femaleSecondary: "Cortisol ↑↑ (amplified by estrogen cycling)",
    femaleTertiary: "Oxytocin ↓ (vagal pathway)",
    femaleReproductive:
      "Ovarian reserve declining earlier (AMH↓). PCOS prevalence increasing (5–20%). Endometriosis affecting 10–15% of reproductive-age women. Oocyte quality declining (ROS, mitochondrial dysfunction).",

    maleConsequences: [
      {
        hormone: "Testosterone",
        mechanism: "Leydig cell Cav3.2 → StAR protein ↓",
        behavioral:
          "Status-seeking ↓, risk-taking ↓, sexual approach ↓, authenticity ↓, group loyalty ↓, provocation response ↓",
        evidence:
          "7 RCTs (Dreher 2016, Nave 2018, Goetz 2024, Audience 2020, Carré 2017, Parochial 2015, Competition 2024)",
        magnitude:
          "~40% decline since 1970s (Santi 2025, n=1,064,891)",
      },
      {
        hormone: "Dopamine",
        mechanism:
          "VTA Cav1.3 → DA release ↓ + T↓ → DA receptor expression ↓",
        behavioral:
          "Motivation ↓, reward sensitivity ↓, innovation ↓, exploration ↓, anhedonia ↑",
        evidence:
          "NAc D2 optogenetics (Soares-Cunha 2016, 2018), T→DA receptor expression",
        magnitude:
          "Not directly measured at population level — inferred from behavioral correlates",
      },
      {
        hormone: "Cortisol",
        mechanism: "HPA axis hyperactivation → chronic cortisol elevation",
        behavioral:
          "Anxiety ↑, social avoidance ↑, testosterone effect suppression (dual hormone hypothesis)",
        evidence: "Mehta & Josephs 2010, meta n=8,538",
        magnitude:
          "Cortisol trends less studied than T — inferred from stress marker increases",
      },
    ],
    femaleConsequences: [
      {
        hormone: "Estrogen / Progesterone",
        mechanism:
          "Ovarian VGCC → folliculogenesis disrupted. Granulosa cell Ca²⁺ → steroidogenesis altered.",
        behavioral:
          "Libido fluctuation ↑, emotional dysregulation ↑, fertility window narrowing",
        evidence:
          "Yüksel 2016: EMF → progesterone↓, estrogen↓ in rats. Türedi 2016: 900 MHz → ovarian follicle reservoir depleted. PCOS: 5–20% prevalence, rising.",
        magnitude:
          "AMH declining in younger women (earlier ovarian aging). PCOS prevalence increasing globally.",
      },
      {
        hormone: "Cortisol (amplified)",
        mechanism:
          "Estrogen cycling amplifies HPA reactivity. Puberty, menstruation, pregnancy, perimenopause = vulnerability windows.",
        behavioral:
          "Anxiety 2× male prevalence. Depression 2× male prevalence. Both increasing faster in women.",
        evidence:
          "Multiple systematic reviews: women 2× anxiety, 2× depression. Sex hormone fluctuation → HPA sensitization (Li & Graham 2017, Lancet Psychiatry). Neuroinflammation sex differences (PMC12843241, 2025).",
        magnitude:
          "Female depression prevalence increasing faster than male since 2010 in most countries.",
      },
      {
        hormone: "Oxytocin",
        mechanism:
          "EMF → vagal tone ↓ → oxytocin release ↓. Oxytocin regulates: trust, bonding, empathy, maternal behavior, pair-bond formation.",
        behavioral:
          "Trust ↓, social bonding ↓, maternal-infant attachment ↓, pair-bond formation ↓, empathy ↓",
        evidence:
          "Oxytocin→bonding: Bosch & Neumann 2012, Numan & Young 2016. OT→trust: Kosfeld 2005 (Nature). Edelman Trust Barometer 2025: institutional trust at historic lows.",
        magnitude:
          "Population-level OT not routinely measured. Inferred from trust metrics, loneliness epidemic (Murthy 2023), bonding difficulties.",
      },
    ],

    s3title: "The Triple Lock",
    s3subtitle: "Male behavioral suppression",
    s3lead:
      "Seven randomized controlled trials demonstrate that testosterone causally modulates behaviors essential to social structure. When testosterone declines population-wide, these behaviors are suppressed simultaneously — creating a triple lock on male social initiative.",
    s3note:
      "This section documents the male behavioral profile. The female profile is different — see below. Together they produce compound effects that neither produces alone.",
    rcts: [
      {
        authors: "Dreher 2016",
        n: 121,
        design: "T gel vs placebo, fMRI",
        finding: "Testosterone increased status-seeking behavior and altered striatal reward signaling",
        behavioral: "Status motivation",
      },
      {
        authors: "Nave 2018",
        n: 243,
        design: "T gel vs placebo, CRT",
        finding: "Testosterone reduced cognitive reflection — increased gut-feel responses over deliberation",
        behavioral: "Cognitive style",
      },
      {
        authors: "Goetz 2024",
        n: 139,
        design: "T gel vs placebo, confederate interaction",
        finding: "Testosterone increased sexual motivation toward potential mates in social settings",
        behavioral: "Sexual approach",
      },
      {
        authors: "Audience 2020",
        n: 166,
        design: "T gel vs placebo, behavioral tasks",
        finding: "Testosterone increased authentic self-presentation; reduced impression management",
        behavioral: "Authenticity",
      },
      {
        authors: "Carré 2017",
        n: 308,
        design: "T gel vs placebo, aggression paradigm",
        finding: "Testosterone increased reactive aggression to provocation, moderated by cortisol",
        behavioral: "Provocation response",
      },
      {
        authors: "Parochial 2015",
        n: 100,
        design: "T gel vs placebo, economic game",
        finding: "Testosterone increased in-group favoritism and out-group discrimination",
        behavioral: "Group loyalty",
      },
      {
        authors: "Competition 2024",
        n: 220,
        design: "T gel vs placebo, competition tasks",
        finding: "Testosterone increased willingness to compete and risk-take under uncertainty",
        behavioral: "Competitive drive",
      },
    ],
    tripleLockExplain:
      "When testosterone declines ~40% population-wide (Santi 2025, n=1,064,891), all seven behaviors are suppressed simultaneously. Adding cortisol elevation (which further suppresses T effects via the dual hormone hypothesis) and dopamine decline (which reduces reward sensitivity) creates a triple lock: the biological infrastructure of male social initiative is suppressed at three independent nodes.",

    s4title: "The Female Parallel",
    s4lead:
      "While men experience behavioral suppression through the Triple Lock (T↓ × cortisol↑ × dopamine↓), women experience a parallel but distinct disruption: emotional dysregulation through cortisol amplification, bonding disruption through oxytocin decline, and reproductive impairment through ovarian Ca²⁺ disruption.",
    s4note:
      "Women are not “less affected” than men by EMF. They are differently affected — and the female-specific effects strike at the mechanisms that hold social structures together.",
    s4aTitle: "Cortisol amplification",
    s4aBody:
      "Women experience anxiety at twice the rate of men and depression at twice the rate. This is not purely social. Estrogen cycling amplifies HPA axis reactivity: during each menstrual cycle, pregnancy, and perimenopause, the cortisol response is biologically heightened. EMF-induced HPA hyperactivation (BERM Route D) therefore hits women harder than men — not because the EMF dose is different but because the biological amplifier (estrogen–HPA coupling) is female-specific.",
    s4aPrediction:
      "As EMF increases, the female anxiety/depression gender gap should widen — and it has.",
    s4bTitle: "Oxytocin and social cohesion",
    s4bBody:
      "Oxytocin regulates trust, empathy, maternal bonding, pair-bond formation, and social cooperation. It is released through vagal nerve stimulation, physical touch, eye contact, and breastfeeding. BERM Route D disrupts vagal tone → oxytocin release ↓. At the individual level, this reduces bonding capacity. At the population level, it erodes the infrastructure of trust that institutions require.",
    s4bData:
      "Edelman Trust Barometer 2025: trust in government, media, NGOs, and employers has reached historic lows across nearly every demographic. Former US Surgeon General Vivek Murthy declared loneliness a “public health crisis” in 2023.",
    s4bCaveat:
      "BERM does not claim EMF is the sole cause. It proposes that oxytocin decline provides a biological substrate that makes societies more susceptible to trust erosion from social, economic, and technological causes.",
    s4cTitle: "Ovarian reserve",
    s4cBody:
      "Prenatal exposure to 900 MHz EMF depleted ovarian follicle reservoir in rat pups — decreased primordial and tertiary follicles, increased atretic follicles, severe follicle degeneration (Türedi 2016, PMID 27007703). Prolonged mobile phone and WiFi exposure reduced plasma progesterone and estrogen in female rats (Yüksel 2016). PCOS — the most common cause of female infertility — involves VGCC-mediated disruption in four organs simultaneously (pancreas, ovary, pituitary, adrenal). Prevalence is rising globally.",
    s4cNote:
      "Women’s fertility window is biologically fixed and non-renewable. Unlike sperm (which regenerate in 74 days), oocytes are established before birth and deplete irreversibly. EMF-induced ovarian damage is therefore cumulative and permanent in a way that male damage is not.",

    s5title: "Compound Effects",
    s5lead:
      "Individual-level hormonal changes become civilizational when they affect both sides of every human dyad simultaneously. Pair-bonding requires a man who approaches and a woman who trusts. Reproduction requires functional sperm and functional oocytes. Child-rearing requires paternal investment and maternal bonding. When EMF disrupts both sides at once, the result is not additive — it is multiplicative.",

    s5aTitle: "Pair-bonding bifurcation",
    s5aMaleDeficit:
      "Approach motivation ↓ (T↓ → Goetz 2024)",
    s5aMaleMech:
      "Testosterone decline raises the biological threshold for sexual approach. Fewer signals interpreted as interest → fewer approaches initiated.",
    s5aFemaleDeficit:
      "Trust/bonding readiness ↓ (OT↓ → vagal)",
    s5aFemaleMech:
      "Oxytocin decline reduces the biological capacity for trust and pair-bond formation. Higher cortisol adds anxiety to social evaluation.",
    s5aCompound:
      "Male approach × female receptivity. If both decline 40%, the probability of successful pairing declines 64% (0.6 × 0.6 = 0.36 = 64% reduction). This is worse than either partner’s 40% alone.",
    s5aObserved: [
      "Sexlessness rates rising in all industrialized nations",
      "Dating app usage rising but relationship formation falling",
      "Average age of first marriage increasing",
      "Percentage ‘never married’ by age 40 increasing",
      "Japan: 43% of 18–34 men virginal (2015)",
      "South Korea: birth rate 0.72 (2024)",
    ],

    s5bTitle: "Multiplicative fertility collapse",
    s5bFormula:
      "Fertility = f(sperm) × g(oocyte) × h(timing) × j(motivation)",
    s5bFactors: [
      "f(sperm): −62% concentration (Levine 2023)",
      "g(oocyte): AMH declining, PCOS rising, reserve depleting earlier",
      "h(timing): Circadian disruption → ovulation timing errors",
      "j(motivation): T↓ (male) × OT↓ (female) → fewer attempts",
    ],
    s5bCompound:
      "If each factor declines 30%, total fecundability declines 76% (0.7⁴ = 0.24). This explains why TFR is falling faster than any single factor would predict — and why pronatalist policies fail. Policy addresses j(motivation) with money. It cannot address f, g, or h — which are biological.",

    s5cTitle: "Child development cascade",
    s5cBurdens: [
      {
        title: "Paternal epigenetic load",
        detail:
          "Father’s EMF-damaged sperm methylome → altered gene expression in offspring. Sperm DNA fragmentation → developmental instability.",
      },
      {
        title: "Maternal hormonal environment",
        detail:
          "Mother’s cortisol↑ during pregnancy → fetal HPA programming altered → offspring stress reactivity permanently elevated. Mother’s melatonin↓ → fetal circadian programming disrupted.",
      },
      {
        title: "Direct fetal exposure",
        detail:
          "EMF penetrates uterus → fetal VGCC activation → Ca²⁺-dependent neurodevelopment disrupted. CACNA1C (Cav1.2): synaptogenesis, cortical layering, excitation–inhibition balance.",
      },
    ],
    s5cSpiral:
      "Each generation starts from a weaker baseline than the previous one. CaMKII-mediated sensitization means each generation is also more sensitive to the same EMF dose. This produces an accelerating spiral.",

    s5dTitle: "Institutional decay",
    s5dLead:
      "Institutions require two complementary inputs:",
    s5dBuilding:
      "Building (historically T-correlated): innovation, risk-taking, competitive drive, resource acquisition, hierarchical organization, long-term planning under uncertainty.",
    s5dMaintaining:
      "Maintaining (historically OT-correlated): trust, cooperation, empathy, conflict resolution, caregiving, social norm enforcement, in-group cohesion.",
    s5dConclusion:
      "An institution that is neither built nor maintained does not collapse dramatically — it decays. Services degrade. Trust erodes. Competence declines. Standards lower. This is not visible as a crisis — it is visible as a slow loss of quality in everything simultaneously.",

    s5eTitle: "The accelerating spiral",
    generations: [
      {
        label: "Generation 1 (born ~1940–1960)",
        emf: "Low (pre-mass electrification)",
        tLevel: "Baseline (~550 ng/dL at age 30)",
        otLevel: "Baseline",
        tfr: "2.5–3.5",
        institutional:
          "Building phase: post-war reconstruction, space program, economic expansion",
      },
      {
        label: "Generation 2 (born ~1960–1985)",
        emf: "Rising (electrification + early mobile)",
        tLevel: "−15–25%",
        otLevel: "Declining (urbanization → less physical contact)",
        tfr: "1.8–2.2",
        institutional:
          "Peak and plateau: institutions mature, innovation slows, maintenance increasingly difficult",
      },
      {
        label: "Generation 3 (born ~1985–2010)",
        emf: "High (smartphones, WiFi, 4G)",
        tLevel: "−30–40% (Santi 2025)",
        otLevel: "Significantly disrupted",
        tfr: "1.2–1.7",
        institutional:
          "Decay phase: trust collapse, institutional dysfunction, loneliness epidemic",
      },
      {
        label: "Generation 4 (born ~2010–2035)",
        emf: "Very high (5G, IoT, prenatal exposure)",
        tLevel: "−40–55% (projected + epigenetic load)",
        otLevel: "Unknown — first generation with full prenatal exposure",
        tfr: "0.7–1.3 (projected)",
        institutional:
          "Crisis phase: institutions cannot recruit or retain, IVF becomes demographic infrastructure",
      },
    ],
    generationInsight:
      "Each generation is more sensitive to the same EMF dose (CaMKII sensitization) and starts from a weaker hormonal baseline (epigenetic transmission). The spiral accelerates without any increase in EMF — but EMF is increasing (5G, IoT, LED IF emissions).",

    s6title: "Twelve Predictions, Twelve Observations",
    s6lead:
      "BERM predicts specific behavioral and social changes from its hormonal model. Each prediction is grounded in RCT evidence for the hormonal link; each observation cites population-level data consistent with the prediction.",
    predictions: [
      {
        prediction: "Male status-seeking declines",
        basis: "T → status motivation (Dreher 2016, n=121)",
        observed:
          "Declining entrepreneurship rates, 'quiet quitting', reduced career ambition in surveys",
        consistent: true,
      },
      {
        prediction: "Male risk-taking declines",
        basis: "T → competitive risk (Competition 2024, n=220)",
        observed:
          "Declining business formation, reduced physical risk activities, increased risk-aversion",
        consistent: true,
      },
      {
        prediction: "Male sexual approach declines",
        basis: "T → sexual motivation (Goetz 2024, n=139)",
        observed:
          "Rising sexlessness, declining relationship initiation, Japan 43% virginal at 18–34",
        consistent: true,
      },
      {
        prediction: "Male authenticity declines",
        basis: "T → authentic self-presentation (Audience 2020, n=166)",
        observed:
          "Rising social anxiety, increased impression management, performative identity",
        consistent: true,
      },
      {
        prediction: "Male group loyalty declines",
        basis: "T → in-group favoritism (Parochial 2015, n=100)",
        observed:
          "Declining civic participation, falling union/party membership, institutional detachment",
        consistent: true,
      },
      {
        prediction: "Male provocation response declines",
        basis: "T → reactive aggression (Carré 2017, n=308)",
        observed:
          "Declining violent crime rates, reduced confrontation willingness, conflict avoidance",
        consistent: true,
      },
      {
        prediction: "Male cognitive style shifts toward deliberation",
        basis: "T → gut-feel over deliberation (Nave 2018, n=243)",
        observed:
          "Increased decision paralysis, analysis paralysis, reduced spontaneous action",
        consistent: true,
      },
      {
        prediction: "Male motivation/reward sensitivity declines",
        basis: "T↓ → DA↓ → anhedonia (Soares-Cunha 2016)",
        observed:
          "Rising depression, 'failure to launch', NEET rates increasing, gaming/streaming as reward substitution",
        consistent: true,
      },
      {
        prediction: "Female anxiety/depression gender gap widens",
        basis:
          "Estrogen amplifies HPA reactivity. EMF → cortisol↑ hits women harder.",
        observed:
          "Women 2× anxiety, 2× depression rate. Gap widening since 2010. Teen girl mental health crisis since ~2012.",
        consistent: true,
      },
      {
        prediction: "Institutional trust declines globally",
        basis:
          "OT → trust (Kosfeld 2005, Nature). EMF → vagal tone ↓ → OT ↓.",
        observed:
          "Edelman 2025: trust in all institutions at historic lows. Loneliness epidemic declared. Social capital declining.",
        consistent: true,
      },
      {
        prediction: "PCOS prevalence rises with EMF adoption",
        basis:
          "PCOS = 4-organ VGCC convergence (pancreas + ovary + pituitary + adrenal).",
        observed:
          "PCOS prevalence 5–20% and rising. Most common cause of female infertility. Correlates with metabolic syndrome.",
        consistent: true,
      },
      {
        prediction: "Each generation more sensitive than previous",
        basis:
          "CaMKII → Cav3.2 threshold ↓ (PMC9913649). Epigenetic transmission (sperm methylome).",
        observed:
          "Mental health crisis onset earlier in each cohort. ASD/ADHD prevalence rising generationally. Puberty onset earlier in girls.",
        consistent: true,
      },
    ],

    sProjectionTitle: "What the Hormone Data Predicts About Society",
    sProjectionLead:
      "The twelve predictions above trace individual behavioral changes. But individuals do not exist in isolation. They form couples, families, teams, institutions, and nations. When the hormonal substrate of an entire population shifts, the aggregate effects produce emergent social phenomena that look like ideological change, cultural conflict, or moral decline but may be, in significant part, biological shift experienced as cultural change.",
    sProjectionNote:
      "This distinction matters. If a social problem is ideological, the solution requires changing minds. If it is partly biological, the solution includes changing the environment. The second is easier.",

    spolarTitle: "Polarization: digital courage, physical conformity",
    spolarBody:
      "The audience effect RCT (2020) showed that low testosterone increases strategic prosociality — saying what the audience expects rather than what you believe. The provocation RCT (Carré 2017) showed that low testosterone reduces reactive response to injustice. Together, these predict a specific pattern: people will be conformist in physical presence but confrontational from behind screens.",
    spolarObserved:
      "This is precisely what is observed. Online polarization is at historic highs. Physical confrontation is at historic lows. People express views anonymously that they would never state in person. Comment sections are battlefields; meeting rooms are echo chambers.",
    spolarExplain:
      "This is not hypocrisy. It is biology. Low testosterone raises the threshold for authentic confrontation. Digital environments lower the social cost of confrontation to near zero. The mismatch between biological threshold and environmental cost creates the pattern: bold online, silent offline.",
    spolarPrediction:
      "BERM prediction: populations with higher average T (e.g., lower-EMF communities) should show less divergence between online and offline behavior.",
    spolarPhysical: "Physical environment",
    spolarPhysicalThreshold: "High (face-to-face social cost)",
    spolarPhysicalBehavior: "Conformity, self-censorship, agreement",
    spolarPhysicalRct: "Audience 2020: low T → strategic prosociality",
    spolarDigital: "Digital environment",
    spolarDigitalThreshold: "Near zero (anonymity, distance)",
    spolarDigitalBehavior: "Outrage, polarization, confrontation",
    spolarDigitalRct: "Carré 2017: provocation response persists when cost is low",

    ssafetyTitle: "Safety-seeking: hormonal threshold, not value choice",
    ssafetyBody:
      "Risk-taking declines with testosterone (Competition RCT 2024, n=333). Anxiety increases with cortisol (dual hormone meta, n=8,538). Threat sensitivity increases when both shift simultaneously. At the population level, this produces a society that experiences more situations as threatening — not because the environment is more dangerous (violent crime is at historic lows) but because the biological threshold for threat perception has lowered.",
    ssafetyParadox:
      "This explains an otherwise paradoxical pattern: the safest societies in human history report the highest anxiety. Objective danger is down. Subjective threat is up. The gap between the two is the hormonal shift.",
    ssafetyCreep:
      "When threat perception rises without actual threat increasing, the result is what psychologists call \"concept creep\": the expansion of harm-related concepts to encompass previously neutral phenomena. Words become violence. Disagreement becomes aggression. Discomfort becomes trauma. This is not moral progress or moral decline. It is a recalibrated threat detection system operating on a different hormonal substrate.",

    sinstitutionTitle: "Institutional decay: why everything gets slightly worse",
    sinstitutionBody:
      "The result is not dramatic collapse. It is pervasive, slow-motion quality loss. Healthcare gets slightly worse. Education gets slightly worse. Infrastructure maintenance falls slightly behind. Customer service declines. Political candidates are slightly less competent. Each individually unremarkable. Together, the pattern is civilizational.",
    sinstitutionData:
      "The 2025 Edelman Trust Barometer confirms: trust in all institutions — government, media, NGOs, employers — has declined across nearly every demographic. This is not a partisan phenomenon. It is a substrate phenomenon.",

    sfixableTitle: "The Fixable Fraction",
    sfixableLead:
      "If the behavioral changes documented on this page were entirely ideological — if people were less motivated, more anxious, more conformist, and less trusting purely because of ideas — the solution would require changing billions of minds. History suggests this is extremely difficult. But if a significant fraction of these changes has a biological basis, then part of the solution is environmental, not ideological.",
    sfixableSolutions: [
      "Reducing EMF exposure in living and working spaces",
      "Calcium channel modulation (264,625 patients already show psychiatric benefit from CCBs prescribed for cardiovascular conditions)",
      "Magnesium supplementation (natural Ca²⁺ antagonist)",
      "Melatonin restoration (circadian repair)",
      "Sleep hygiene (melatonin → GnRH → T recovery)",
      "Physical contact and community (oxytocin restoration)",
    ],
    sfixableConclusion:
      "None of these require anyone to change their beliefs. They require changing the electromagnetic environment and supporting the biological systems that hormones regulate. If even 20–30% of the current crisis in motivation, trust, and social cohesion is biological rather than ideological, that is 20–30% that can be addressed without political conflict. This is the most practically important implication of the BERM model: not that civilization is doomed, but that part of its decline has a specific, identifiable, and potentially reversible cause.",

    shistoryTitle: "Reading history through the hormonal lens",
    shistoryBody:
      "Every generation experiences the same objective world through a different hormonal substrate. A man in 1960 with testosterone at 600 ng/dL, normal cortisol, and intact dopaminergic signaling experiences a career setback as a challenge to overcome. A man in 2024 with testosterone at 350 ng/dL, elevated cortisol, and reduced dopaminergic tone experiences the same setback as a threat to avoid. Their values may be identical. Their biological capacity to act on those values is not.",
    shistoryOlder:
      "When older generations say \"we just got on with it,\" they are not describing superior character. They are describing a different hormonal environment in which the threshold for action was lower and the threshold for avoidance was higher.",
    shistoryYounger:
      "When younger generations say \"the world is more stressful,\" they are not describing a more dangerous world (it is objectively safer). They are describing the same world experienced through a hormonal substrate that detects more threat and generates less motivation to confront it.",
    shistoryConclusion:
      "Neither generation is wrong. They are describing the same reality through different biological filters. The intergenerational conflict that results — \"lazy kids\" vs \"out-of-touch boomers\" — is itself a consequence of the hormonal shift, not evidence of moral failure on either side.",

    sideologyTitle: "Ideology as downstream",
    sideologyBody:
      "The same idea — \"safety is important\" — produces different political outcomes depending on the hormonal substrate of the population that holds it.",
    sideologyHigh:
      "At T=500 ng/dL, cortisol=normal: \"Safety is important\" → build safe infrastructure, enforce laws, confront threats directly.",
    sideologyLow:
      "At T=320 ng/dL, cortisol=elevated: \"Safety is important\" → eliminate all risk, expand definitions of harm, avoid confrontation by removing the confrontation-causing stimulus.",
    sideologyExplain:
      "The idea has not changed. The biological capacity to implement it has. This is not left vs right. It is not progressive vs conservative. It is a biological shift in the implementation threshold for the same set of values that both sides largely share. Both sides want safety. Both sides want fairness. Both sides want opportunity. The disagreement is about how — and \"how\" is moderated by hormonal thresholds.",
    sideologyTestable:
      "This is testable. If political attitudes on safety, risk, and authority correlate with individual hormone profiles (T, cortisol, OT) after controlling for demographics and stated ideology, the biological moderation hypothesis gains support. Multiple studies have found exactly this: testosterone correlates with political attitudes on authority, competition, and redistribution across cultures.",

    s7title: "The Recursive Prediction",
    s7body:
      "BERM makes an unusual prediction: its own reception is evidence for its thesis. If testosterone decline reduces risk-taking, competitive drive, and authentic self-presentation at the population level, then the scientific community — composed of humans subject to the same hormonal environment — should exhibit reduced willingness to challenge consensus, pursue controversial research directions, and defend unpopular findings. The model predicts that research into EMF bioeffects will be underfunded, stigmatized, and institutionally discouraged — not because the evidence is weak, but because the hormonal substrate that drives intellectual risk-taking is declining. This is testable: funding allocation for EMF bioeffects research as a proportion of total NIH/ERC funding should be declining, and researchers in the field should report increasing career penalties for publishing positive findings.",

    s8title: "The Dopaminergic Mind",
    s8body:
      "Barzilai’s dopaminergic mind hypothesis proposes that dopamine-driven cognitive traits — curiosity, creativity, exploration, risk-tolerance, future orientation — were central to the emergence of modern human cognition. BERM adds a mechanism: if EMF disrupts VTA Cav1.3 → dopamine release, and testosterone decline further reduces DA receptor expression, then the population-level decline in dopaminergic function represents a partial reversal of the cognitive revolution. This is not a claim about intelligence (IQ may remain stable or even rise through Flynn effects). It is a claim about cognitive style: the shift from exploration to exploitation, from risk-taking to risk-avoidance, from innovation to optimization. A society with declining dopaminergic function does not stop thinking — it stops taking intellectual risks.",

    s9title: "Testable Predictions",
    s9lead:
      "Each prediction specifies a falsification criterion. A model that cannot be falsified is not science.",
    civPredictions: [
      {
        id: "CIV-1",
        title: "T decline continues regardless of lifestyle",
        detail:
          "Population-level testosterone decline will continue even after controlling for obesity, smoking, alcohol, and sleep — because the primary driver is environmental EMF, not lifestyle.",
        falsification:
          "T decline fully explained by lifestyle factors in a large cohort after adjustment",
      },
      {
        id: "CIV-2",
        title: "Low-EMF communities maintain higher T",
        detail:
          "Amish, Mennonite, and other communities with low EMF exposure should maintain higher age-adjusted testosterone than matched urban populations.",
        falsification:
          "No T difference between low-EMF and high-EMF communities after demographic adjustment",
      },
      {
        id: "CIV-3",
        title: "CCB users show attenuated behavioral decline",
        detail:
          "Long-term CCB users should show less decline in T-dependent behaviors (entrepreneurship, risk-taking) compared to users of non-CCB antihypertensives.",
        falsification:
          "No behavioral difference between CCB and non-CCB antihypertensive users",
      },
      {
        id: "CIV-4",
        title: "TFR correlates with EMF density, not GDP alone",
        detail:
          "After controlling for GDP, education, and urbanization, EMF infrastructure density should independently predict TFR decline across countries.",
        falsification:
          "No residual correlation between EMF density and TFR after socioeconomic controls",
      },
      {
        id: "CIV-5",
        title: "Behavioral suppression reverses with EMF reduction",
        detail:
          "Individuals who substantially reduce EMF exposure (e.g., move to low-EMF environments) should show measurable recovery in T-dependent behaviors within 6–12 months.",
        falsification:
          "No behavioral recovery after sustained EMF reduction in a controlled study",
      },
      {
        id: "CIV-6",
        title: "Pairing probability declines multiplicatively",
        detail:
          "If male approach (T-dependent) and female receptivity (OT-dependent) each decline X%, successful pairing should decline X²%, not 2X%. Testable with dating market data combined with hormonal measurements.",
        falsification:
          "Pairing rate declines linearly with individual hormone measures",
      },
      {
        id: "CIV-7",
        title:
          "Teen girl mental health crisis correlates with hardware, not content",
        detail:
          "BERM predicts the EMF-hardware component (cortisol via HPA, melatonin via pineal) matters more than social media content. Girls who use smartphones equally but in low-EMF environments should show less anxiety increase.",
        falsification:
          "No difference in anxiety between high-EMF and low-EMF smartphone users",
      },
      {
        id: "CIV-8",
        title:
          "Intergenerational hormonal decline accelerates without EMF increase",
        detail:
          "CaMKII sensitization + epigenetic transmission predict that even constant EMF produces accelerating hormone decline across generations. Testable by comparing T decline rates across generational cohorts at the same age.",
        falsification:
          "T decline rate is constant across generations at equivalent ages",
      },
      {
        id: "CIV-9",
        title:
          "Oxytocin-dependent behaviors decline with EMF environment",
        detail:
          "Volunteering, community participation, charitable giving, interpersonal trust — all OT-dependent — should correlate negatively with EMF environment across countries and over time.",
        falsification:
          "No correlation between EMF environment and OT-dependent social behaviors",
      },
      {
        id: "CIV-10",
        title: "IVF becomes demographic infrastructure by 2040",
        detail:
          "When biological fecundability drops below ~30% of couples achieving pregnancy within 12 months unassisted, IVF transitions from medical intervention to population-level infrastructure. Predicted: South Korea by 2030, Japan by 2035, most of Europe by 2040.",
        falsification:
          "Unassisted pregnancy rates remain above 70% through 2040 in high-EMF countries",
      },
      {
        id: "CIV-11",
        title: "Online-offline behavior gap correlates with population T level",
        detail:
          "Populations with higher average T show less divergence between online and in-person behavior. Low-EMF communities show minimal gap.",
        falsification:
          "No correlation between population T and online-offline behavior divergence",
      },
      {
        id: "CIV-12",
        title: "Concept creep rate correlates with cortisol trends across countries",
        detail:
          "Countries with faster cortisol increases (or faster T decline) show faster expansion of harm-related concepts in legal, academic, and media language.",
        falsification:
          "No correlation between hormonal trends and concept creep rate",
      },
      {
        id: "CIV-13",
        title: "Intergenerational tension is weakest in low-EMF communities",
        detail:
          "Amish and similar communities with stable hormonal baselines across generations show less intergenerational conflict than high-EMF societies.",
        falsification:
          "Low-EMF communities show comparable intergenerational tension to national averages",
      },
      {
        id: "CIV-14",
        title: "Political attitudes on risk and authority correlate with individual T after demographic controls",
        detail:
          "Within-population: individuals with higher T favor confrontation-based solutions; lower T favors avoidance-based solutions — independent of stated ideology.",
        falsification:
          "No residual T correlation with policy preferences after demographic controls",
      },
    ],

    s10title: "Epistemic Boundaries",
    s10claims: [
      "Seven RCTs establish causal links between testosterone and specific behaviors in men.",
      "Parallel hormonal disruptions in women are documented but with fewer causal (RCT) studies.",
      "The compound effect (both sexes simultaneously) is logically derived from individual-level evidence, not directly measured at population level.",
      "The generational acceleration is predicted by CaMKII mechanics and epigenetic transmission, not yet confirmed longitudinally.",
    ],
    s10notClaims: [
      "That hormones determine individual choices or political beliefs.",
      "That behavioral trends are entirely biological — culture, economics, and policy matter.",
      "That any individual's behavior can be predicted from their hormone levels.",
      "That reversing EMF exposure would reverse all observed social trends.",
    ],
    s10recursive:
      "If the model is wrong, the predictions will fail visibly. That is the design.",
    s10summary:
      "Hormones set thresholds, not outcomes. This page traces where the thresholds are moving, what that predicts at population level, and why part of what looks like ideological change may be biological shift experienced as cultural change.",
    s10fixable:
      "If that fraction is even 20–30%, it is the fraction that is fixable without political conflict.",
    modelLink: "Read the mechanism",
    evidenceLink: "Study the evidence",
    predictionsLink: "See all predictions",
  },
  fi: {
    title: "Sivilisaatio",
    subtitle:
      "Mitä tapahtuu yhteiskunnalle, kun molempien sukupuolten hormonaalinen perusta muuttuu samanaikaisesti?",
    heroLead:
      "Testosteroni, estrogeeni, dopamiini, kortisoli, oksitosiini ja melatoniini eivät ole pelkkiä lääketieteellisiä termejä. Ne ovat motivaation, luottamuksen, kiintymyksen, unen, lisääntymisen ja kognition biologinen infrastruktuuri. Kun sähkömagneettisest kentät häiritsevät näitä hormoneja sääteleviä kalsiumkanavia, vaikutukset eteenvät molekyyleistä soluihin, elimiin, yksilöihin, perheisiin ja instituutioihin.",
    heroTrail:
      "Tämä sivu jäljittää tuon etenemisen — seitsemästä satunnaistetusta kontrolloidusta tutkimuksesta väestötason käyttäytymisdataan ja sivilisaation muutoksen dynamiikkaan.",
    levelNote:
      "Tämä on mallin kolmas taso: Taso 1 on mekanismi (Malli), Taso 2 on evidenssi (Näyttö), Taso 3 on seuraukset (tämä sivu).",

    s2title: "Kaksi rinnakkaista häiriötä",
    s2lead:
      "EMF → VGCC → Ca²⁺ on sama mekanismi molemmilla sukupuolilla. Mutta koska hormonijärjestelmät eroavat, seuraukset ovat sukupuolispesifejä — ja komplementaarisia.",
    maleTitle: "Miesten häiriöprofiili",
    malePrimary: "Testosteroni ↓ (Cav3.2 → StAR)",
    maleSecondary: "Dopamiini ↓ (VTA Cav1.3)",
    maleTertiary: "Kortisoli ↑ (HPA-aktivaatio)",
    maleReproductive:
      "Siittiiöt: −62 % pitoisuus (Levine 2023), DNA-fragmentaatio ↑, liikkuvuus ↓. Testosteroni spermatogeneesikynnyksen alapuolella arviolta ~2070.",
    femaleTitle: "Naisten häiriöprofiili",
    femalePrimary: "Estrogeeni/progesteronisyklin häiriö",
    femaleSecondary: "Kortisoli ↑↑ (vahvistettu estrogeenisyklillä)",
    femaleTertiary: "Oksitosiini ↓ (vagaalinen reitti)",
    femaleReproductive:
      "Munasarjareservi pienenee aiemmin (AMH↓). PCOS-esiintyvyys kasvaa (5–20 %). Endometrioosi 10–15 % lisääntymisikäisistä naisista. Munasolujen laatu heikkenee (ROS, mitokondriodisfunktio).",

    maleConsequences: [
      {
        hormone: "Testosteroni",
        mechanism: "Leydig-solun Cav3.2 → StAR-proteiini ↓",
        behavioral:
          "Statushakuisuus ↓, riskinotto ↓, seksuaalinen lähestyminen ↓, autenttisuus ↓, ryhmäuskollisuus ↓, provokaatiovaste ↓",
        evidence:
          "7 RCT:tä (Dreher 2016, Nave 2018, Goetz 2024, Audience 2020, Carré 2017, Parochial 2015, Competition 2024)",
        magnitude:
          "~40 % lasku 1970-luvulta (Santi 2025, n=1 064 891)",
      },
      {
        hormone: "Dopamiini",
        mechanism:
          "VTA Cav1.3 → DA-vapautuminen ↓ + T↓ → DA-reseptoriekspressio ↓",
        behavioral:
          "Motivaatio ↓, palkkioherkkyys ↓, innovaatio ↓, tutkiminen ↓, anhedonia ↑",
        evidence:
          "NAc D2 -optogenetiikka (Soares-Cunha 2016, 2018), T→DA-reseptoriekspressio",
        magnitude:
          "Ei suoraan mitattu väestötasolla — päätelty käyttäytymiskorrelaateista",
      },
      {
        hormone: "Kortisoli",
        mechanism: "HPA-akselin hyperaktivaatio → krooninen kortisolielevatio",
        behavioral:
          "Ahdistus ↑, sosiaalinen välttely ↑, testosteronivaikutuksen suppressio (kaksoishormonihypoteesi)",
        evidence: "Mehta & Josephs 2010, meta n=8 538",
        magnitude:
          "Kortisolitrendit vähemmän tutkittuja kuin T — päätelty stressimarkkereiden kasvusta",
      },
    ],
    femaleConsequences: [
      {
        hormone: "Estrogeeni / Progesteroni",
        mechanism:
          "Munasarjan VGCC → follikulogeneesi häiriintyy. Granuloosisolun Ca²⁺ → steroidogeneesi muuttuu.",
        behavioral:
          "Libidovaihtelu ↑, emotionaalinen dysäätely ↑, hedelmallisyysikkuna kapenee",
        evidence:
          "Yüksel 2016: EMF → progesteroni↓, estrogeeni↓ rotilla. Türedi 2016: 900 MHz → munasarjan follikkkelireservi ehtynyt. PCOS: 5–20 % esiintyvyys, kasvussa.",
        magnitude:
          "AMH laskee nuoremmilla naisilla. PCOS-esiintyvyys kasvaa maailmanlaajuisesti.",
      },
      {
        hormone: "Kortisoli (vahvistettu)",
        mechanism:
          "Estrogeenisykli vahvistaa HPA-reaktiivisuutta. Puberteetti, menstruaatio, raskaus, perimenopaussi = haavoittuvuusikkunoita.",
        behavioral:
          "Ahdistus 2× miesten esiintyvyys. Masennus 2× miesten esiintyvyys. Molemmat kasvavat naisilla nopeammin.",
        evidence:
          "Lukuisia systemaattisia katsauksia: naiset 2× ahdistus, 2× masennus. Sukuhormonivaihtelu → HPA-sensitisaatio (Li & Graham 2017, Lancet Psychiatry). Neuroinflammaaatio sukupuolierot (PMC12843241, 2025).",
        magnitude:
          "Naisten masennusprevalenssi kasvaa nopeammin kuin miesten vuodesta 2010 useimmissa maissa.",
      },
      {
        hormone: "Oksitosiini",
        mechanism:
          "EMF → vagaalitonus ↓ → oksitosiinivapautuminen ↓. Oksitosiini säätelee: luottamusta, kiintymystä, empatiaa, äidillistä käyttäytymistä, pariside-muodostusta.",
        behavioral:
          "Luottamus ↓, sosiaalinen kiintymys ↓, äiti-lapsi-kiintymys ↓, parisuhteen muodostuminen ↓, empatia ↓",
        evidence:
          "Oksitosiini→kiintymys: Bosch & Neumann 2012, Numan & Young 2016. OT→luottamus: Kosfeld 2005 (Nature). Edelman Trust Barometer 2025: institutionaalinen luottamus historiallisen matalalla.",
        magnitude:
          "Väestötason OT ei rutiinimittauksissa. Päätelty luottamusmittareista, yksinäisyysepidemiasta (Murthy 2023), kiintymysongelmista.",
      },
    ],

    s3title: "Kolmoislukko",
    s3subtitle: "Miesten käyttäytymissuppressio",
    s3lead:
      "Seitsemän satunnaistettua kontrolloitua tutkimusta osoittaa, että testosteroni säätelee kausaalisesti käyttäytymisiä, jotka ovat välttämättömiä sosiaalisille rakenteille. Kun testosteroni laskee väestötasolla, nämä käyttäytymiset suppressoituvat samanaikaisesti — luoden kolmoislukon miesten sosiaaliselle aloitteellisuudelle.",
    s3note:
      "Tämä osio dokumentoi miesten käyttäytymisprofiilin. Naisten profiili on erilainen — katso alla. Yhdessä ne tuottavat yhdistelmävaikutuksia, joita kumpikaan ei tuota yksin.",
    rcts: [
      {
        authors: "Dreher 2016",
        n: 121,
        design: "T-geeli vs lumevalmiste, fMRI",
        finding: "Testosteroni lisäsi statushakuista käyttäytymistä ja muutti striataalista palkkiosignalointia",
        behavioral: "Statusmotivaatio",
      },
      {
        authors: "Nave 2018",
        n: 243,
        design: "T-geeli vs lumevalmiste, CRT",
        finding: "Testosteroni vähensi kognitiivista reflektiota — lisäsi vaistonvaraisia vastauksia harkinnan yli",
        behavioral: "Kognitiivinen tyyli",
      },
      {
        authors: "Goetz 2024",
        n: 139,
        design: "T-geeli vs lumevalmiste, konfederaatti-interaktio",
        finding: "Testosteroni lisäsi seksuaalista motivaatiota potentiaalisia kumppaneita kohtaan",
        behavioral: "Seksuaalinen lähestyminen",
      },
      {
        authors: "Audience 2020",
        n: 166,
        design: "T-geeli vs lumevalmiste, käyttäytymistehtävät",
        finding: "Testosteroni lisäsi autenttista itseilmaisua; vähensi vaikutelmanhallintaa",
        behavioral: "Autenttisuus",
      },
      {
        authors: "Carré 2017",
        n: 308,
        design: "T-geeli vs lumevalmiste, aggressioparadigma",
        finding: "Testosteroni lisäsi reaktiivista aggressiota provokaatioon, moderoituna kortisolilla",
        behavioral: "Provokaatiovaste",
      },
      {
        authors: "Parochial 2015",
        n: 100,
        design: "T-geeli vs lumevalmiste, taloudellinen peli",
        finding: "Testosteroni lisäsi sisäryhmän suosimista ja ulkoryhmän syrjintää",
        behavioral: "Ryhmäuskollisuus",
      },
      {
        authors: "Competition 2024",
        n: 220,
        design: "T-geeli vs lumevalmiste, kilpailutehtävät",
        finding: "Testosteroni lisäsi halukkuutta kilpailla ja ottaa riskejä epävarmuudessa",
        behavioral: "Kilpailuvietti",
      },
    ],
    tripleLockExplain:
      "Kun testosteroni laskee ~40 % väestötasolla (Santi 2025, n=1 064 891), kaikki seitsemän käyttäytymistä suppressoituvat samanaikaisesti. Kun siihen lisätään kortisolielevatio (joka edelleen suppressoi T-vaikutuksia kaksoishormonihypoteesin kautta) ja dopamiinilasku (joka vähentää palkkioherkkyttä), syntyy kolmoislukko: miesten sosiaalisen aloitteellisuuden biologinen infrastruktuuri on suppressoitu kolmessa riippumattomassa solmussa.",

    s4title: "Naisten rinnakkaishäiriö",
    s4lead:
      "Siinl missä miehet kokevat käyttäytymissuppression kolmoislukon kautta (T↓ × kortisoli↑ × dopamiini↓), naiset kokevat rinnakkaisen mutta erillisen häiriön: emotionaalisen dysäätelyn kortisoliamplifikaation kautta, kiintymyshäiriön oksitosiiinlaskun kautta ja lisääntymishäiriön munasarjojen Ca²⁺-häiriön kautta.",
    s4note:
      "Naiset eivät ole “vähemmän alttiita” EMF:lle kuin miehet. He ovat eri tavalla alttiita — ja naisspesifiset vaikutukset osuvat mekanismeihin, jotka pitävät sosiaalisia rakenteita koossa.",
    s4aTitle: "Kortisoliamplifikaatio",
    s4aBody:
      "Naiset kokevat ahdistusta kaksi kertaa miesten tahtiin ja masennusta kaksi kertaa miesten tahtiin. Tämä ei ole puhtaasti sosiaalista. Estrogeenisykli vahvistaa HPA-akselin reaktiivisuutta: jokaisen kuukautiskierron, raskauden ja perimenopaussin aikana kortisolivaste on biologisesti korostunut. EMF:n aiheuttama HPA-hyperaktivaatio (BERM-reitti D) osuu siksi naisiin kovemmin kuin miehiin — ei siksi että EMF-annos olisi eri, vaan koska biologinen vahvistin (estrogeeni–HPA-kytkentä) on naisspesifinen.",
    s4aPrediction:
      "EMF:n kasvaessa naisten ahdistuksen/masennuksen sukupuolikuilun pitäisi leventä — ja niin on tapahtunut.",
    s4bTitle: "Oksitosiini ja sosiaalinen koheesio",
    s4bBody:
      "Oksitosiini säätelee luottamusta, empatiaa, äidillistä kiintymystä, paristeen muodostumista ja sosiaalista yhteistyötä. Sitä vapautuu vagushermon stimulaatiosta, fyysisestä kosketuksesta, katsekontaktista ja imetyksestä. BERM-reitti D häiritsee vagaalitonusta → oksitsisinivapautuminen ↓. Yksilötasolla tämä vähentää kiintymyskapasiteettia. Väestötasolla se rapautttaa luottamuksen infrastruktuuria, jota instituutiot vaativat.",
    s4bData:
      "Edelman Trust Barometer 2025: luottamus hallitukseen, mediaan, kansalaisjärjestöihin ja työnantajiin on saavuttanut historiallisen pohjan lähes kaikissa demografioissa. Yhdysvaltain entinen pääkirurgi Vivek Murthy julisti yksinäisyyden ”kansanterveyskirisiksi” vuonna 2023.",
    s4bCaveat:
      "BERM ei väitä EMF:n olevan ainoa syy. Se ehdottaa, että oksitosiinalasku tarjoaa biologisen substraatin, joka tekee yhteiskunnista alttiimpia luottamuksen rapautumiselle sosiaalisista, taloudellisista ja teknologisista syistä.",
    s4cTitle: "Munasarjareservi",
    s4cBody:
      "Prenataali 900 MHz EMF -altistus ehdytti munasarjan follikkelireserviä rottapoikasissa — vähentäen primordiaalisia ja tertiiäärisiä follikkeleita, lisäten atreettisia follikkeleita, vakavaa degeneraatiota (Türedi 2016, PMID 27007703). Pitkäaikainen matkapuhelin- ja WiFi-altistus vähensi plasman progesteronia ja estrogeenia naarasrotilla (Yüksel 2016). PCOS — naisten hedälmättömyyden yleisin syy — sisältää VGCC-välitteisen häiriön neljässä elimessä samanaikaisesti (haima, munasarja, aivolisake, lisämunuainen). Esiintyvyys kasvaa maailmanlaajuisesti.",
    s4cNote:
      "Naisten hedelmallisyysikkuna on biologisesti kiinteä ja uusiutumaton. Toisin kuin siittiiöt (jotka uusiutuvat 74 päivässä), munasolut muodostuvat ennen syntymää ja ehtyvat peruuttamattomasti. EMF:n aiheuttama munasarjavaurio on siksi kumulatiivista ja pysyvää tavalla, joka ei koske miesten vaurioita.",

    s5title: "Yhdistelmävaikutukset",
    s5lead:
      "Yksilötason hormonaaaliset muutokset muuttuvat sivilisatorisiksi, kun ne vaikuttavat jokaisen inhimillisen dyadin molempiin osapuoliin samanaikaisesti. Paristeen muodostuminen vaatii miehen joka lähestyy ja naisen joka luottaa. Lisääntyminen vaatii toimivat siittiiöt ja toimivat munasolut. Lasten kasvattaminen vaatii isän panostuksen ja äidin kiintymyksen. Kun EMF häiritsee molempia puolia samanaikaisesti, tulos ei ole summautuva — se on kertautuva.",

    s5aTitle: "Parinmuodostuksen bifurkaatio",
    s5aMaleDeficit:
      "Lähestymismotivaatio ↓ (T↓ → Goetz 2024)",
    s5aMaleMech:
      "Testosteronilasku nostaa seksuaalisen lähestymisen biologista kynnystä. Vähemmän signaaleja tulkitaan kiinnostukseksi → vähemmän lähestymisiä aloitetaan.",
    s5aFemaleDeficit:
      "Luottamus-/kiintymysvalmius ↓ (OT↓ → vagaalinen)",
    s5aFemaleMech:
      "Oksitosiinilasku vähentää biologista kykyä luottamukseen ja paristeen muodostumiseen. Korkeampi kortisoli lisää ahdistusta sosiaaliseen arviointiin.",
    s5aCompound:
      "Miehen lähestyminen × naisen vastaanottavaisuus. Jos molemmat laskevat 40 %, onnistuneen parinmuodostuksen todennäköisyys laskee 64 % (0,6 × 0,6 = 0,36 = 64 % vähennys). Tämä on pahempi kuin kummankaan osapuolen 40 % yksin.",
    s5aObserved: [
      "Seksittömyys kasvaa kaikissa teollisuusmaissa",
      "Deittisovellusten käyttö kasvaa mutta suhteiden muodostuminen vähenee",
      "Ensimmäisen avioliiton keskiikä nousee",
      "Naimattomien osuus 40-vuotiaista kasvaa",
      "Japani: 43 % 18–34-vuotiaista miehistii neitsyitä (2015)",
      "Etelä-Korea: syntyyvyys 0,72 (2024)",
    ],

    s5bTitle: "Multiplikatiivinen hedelmallisyysromahdus",
    s5bFormula:
      "Hedelmallisyys = f(siittiiöt) × g(munasolu) × h(ajoitus) × j(motivaatio)",
    s5bFactors: [
      "f(siittiiöt): −62 % pitoisuus (Levine 2023)",
      "g(munasolu): AMH laskee, PCOS kasvaa, reservi ehtyy aiemmin",
      "h(ajoitus): Vuorokausirytmihäiriö → ovulaation ajoitusvirheet",
      "j(motivaatio): T↓ (miehet) × OT↓ (naiset) → vähemmän yrityksiä",
    ],
    s5bCompound:
      "Jos jokainen tekijä laskee 30 %, kokonaishedelmallisyys laskee 76 % (0,7⁴ = 0,24). Tämä selittää miksi kokonaishedelmallisyysluku laskee nopeammin kuin mikään yksittäinen tekijä ennustaisi — ja miksi pronataltisetpolitiikat epäonnistuvat. Politiikka osoittaa j(motivaatio)-tekijään rahalla. Se ei voi osoittaa f-, g- tai h-tekijöitä — jotka ovat biologisia.",

    s5cTitle: "Lapsen kehityskaskadi",
    s5cBurdens: [
      {
        title: "Isän epigeneettinen kuorma",
        detail:
          "Isän EMF-vaurioituneen siittiiön metyloomi → muuttunut geeniekspressio jälkeläisissä. Siittiiöiden DNA-fragmentaatio → kehitysepävakaus.",
      },
      {
        title: "Äidin hormonaalinen ympäristö",
        detail:
          "Äidin kortisoli↑ raskauden aikana → sikiön HPA-ohjelmointi muuttuu → jälkeläisen stressireaktiivisuus pysyvästi koholla. Äidin melatoniini↓ → sikiön vuorokausirytmin ohjelmointi häiriintyy.",
      },
      {
        title: "Suora sikiöaltistus",
        detail:
          "EMF läpäisee kohdun → sikiön VGCC-aktivaatio → Ca²⁺-riippuvainen neurokehitys häiriintyy. CACNA1C (Cav1.2): synaptogeneesi, kortikaalinen kerrostuminen, eksitaatio–inhibitiotasapaino.",
      },
    ],
    s5cSpiral:
      "Jokainen sukupolvi aloittaa heikemmaltä lähtötasolta kuin edellinen. CaMKII-välitteinen sensitisaatio tarkoittaa, että jokainen sukupolvi on myös herkempi samalle EMF-annokselle. Tämä tuottaa kiihtyyvän kierteen.",

    s5dTitle: "Institutionaalinen rapautuminen",
    s5dLead:
      "Instituutiot vaativat kahta komplementaarista panosta:",
    s5dBuilding:
      "Rakentaminen (historiallisesti T-korreloitu): innovaatio, riskinotto, kilpailuvietti, resurssien hankinta, hierarkkinen organisointi, pitkän tähtäimen suunnittelu epävarmuudessa.",
    s5dMaintaining:
      "Ylläpito (historiallisesti OT-korreloitu): luottamus, yhteistyö, empatia, konfliktin ratkaisu, hoiva, sosiaalisten normien valvonta, sisäryhmäkoheesio.",
    s5dConclusion:
      "Instituutio, jota ei rakenneta eikä ylläpidetä, ei romahda dramaattisesti — se rapautuu. Palvelut heikkenevät. Luottamus erodoituu. Pätevyys vähenee. Standardit laskevat. Tämä ei näy kriisnä — se näkyy hitaana laadun menetyksnä kaikessa samanaikaisesti.",

    s5eTitle: "Kiihtyyvä kierre",
    generations: [
      {
        label: "Sukupolvi 1 (syntyneet ~1940–1960)",
        emf: "Matala (ennen massasähköistymiistä)",
        tLevel: "Lähtötaso (~550 ng/dL 30-vuotiaana)",
        otLevel: "Lähtötaso",
        tfr: "2,5–3,5",
        institutional:
          "Rakentamisvaihe: sodanjälkeinen jälleenrakennus, avaruusohjelma, talouden laajeneminen",
      },
      {
        label: "Sukupolvi 2 (syntyneet ~1960–1985)",
        emf: "Kasvava (sähköistys + varhainen mobiili)",
        tLevel: "−15–25 %",
        otLevel: "Laskeva (urbanisoituminen → vähemmän fyysistä kontaktia)",
        tfr: "1,8–2,2",
        institutional:
          "Huippu ja tasanko: instituutiot kypsyvät, innovaatio hidastuu, ylläpito vaikeutuu",
      },
      {
        label: "Sukupolvi 3 (syntyneet ~1985–2010)",
        emf: "Korkea (älypuhelimet, WiFi, 4G)",
        tLevel: "−30–40 % (Santi 2025)",
        otLevel: "Merkittävästi häiriintynyt",
        tfr: "1,2–1,7",
        institutional:
          "Rapautumisvaihe: luottamusromahdus, institutionaalinen disfunktio, yksinäisyysepidemia",
      },
      {
        label: "Sukupolvi 4 (syntyneet ~2010–2035)",
        emf: "Erittäin korkea (5G, IoT, prenataali altistus)",
        tLevel: "−40–55 % (projisoitu + epigeneettinen kuorma)",
        otLevel: "Tuntematon — ensimmäinen sukupolvi täydellä prenataalilla altistuksella",
        tfr: "0,7–1,3 (projisoitu)",
        institutional:
          "Kriisivaihe: instituutiot eivät voi rekrytoida tai pitää pätevää henkilöstöä, IVF muuttuu demografiseksi infrastruktuuriksi",
      },
    ],
    generationInsight:
      "Jokainen sukupolvi on herkempi samalle EMF-annokselle (CaMKII-sensitisaatio) ja aloittaa heikemmaltä hormonaaliselta lähtötasolta (epigeneettinen transmissio). Kierre kiihtyy ilman EMF:n kasvua — mutta EMF kasvaa (5G, IoT, LED IF -emissiot).",

    s6title: "Kaksitoista ennustetta, kaksitoista havaintoa",
    s6lead:
      "BERM ennustaa spesifejä käyttäytymis- ja yhteiskuntamuutoksia hormonaalimallnsa pohjalta. Jokainen ennuste perustuu RCT-evidenssiin hormonilinkistä; jokainen havainto viittaa väestötason dataan, joka on yhdenmukainen ennusteen kanssa.",
    predictions: [
      {
        prediction: "Miesten statushakuisuus vähenee",
        basis: "T → statusmotivaatio (Dreher 2016, n=121)",
        observed:
          "Yrittajyysaste laskee, ‘quiet quitting’, vähentynyt uratavoitteisuus kyselyissä",
        consistent: true,
      },
      {
        prediction: "Miesten riskinotto vähenee",
        basis: "T → kilpailullinen riski (Competition 2024, n=220)",
        observed:
          "Yritysperustanta laskee, vähemmän fyysisiä riskiaktiviteetteja, kasvanut riskinkaihtaminen",
        consistent: true,
      },
      {
        prediction: "Miesten seksuaalinen lähestyminen vähenee",
        basis: "T → seksuaalinen motivaatio (Goetz 2024, n=139)",
        observed:
          "Seksittmyys kasvaa, parisuhteen aloittaminen vähenee, Japani 43 % neitsyitä 18–34",
        consistent: true,
      },
      {
        prediction: "Miesten autenttisuus vähenee",
        basis: "T → autenttinen itseilmaisu (Audience 2020, n=166)",
        observed:
          "Sosiaalinen ahdistus kasvaa, vaikutelmanhallinta lisääntyy, performatiivinen identiteetti",
        consistent: true,
      },
      {
        prediction: "Miesten ryhmäuskollisuus vähenee",
        basis: "T → sisäryhmäsuosiminen (Parochial 2015, n=100)",
        observed:
          "Kansalaisosallistuminen vähenee, liitto-/puoluejäsenyys laskee, institutionaalinen irtaantuminen",
        consistent: true,
      },
      {
        prediction: "Miesten provokaatiovaste vähenee",
        basis: "T → reaktiivinen aggressio (Carré 2017, n=308)",
        observed:
          "Väkivaltalrikollisuus laskee, konfrontaatiovalmius vähenee, konfliktien välttely",
        consistent: true,
      },
      {
        prediction: "Miesten kognitiivinen tyyli siirtyy harkinnaan",
        basis: "T → vaistonvaraisuus harkinnan yli (Nave 2018, n=243)",
        observed:
          "Päätösparalyysi lisääntyy, analyysihalpaus, spontaani toiminta vähenee",
        consistent: true,
      },
      {
        prediction: "Miesten motivaatio/palkkioherkkyys vähenee",
        basis: "T↓ → DA↓ → anhedonia (Soares-Cunha 2016)",
        observed:
          "Masennus kasvaa, ‘failure to launch’, NEET-osuus kasvaa, pelaaminen/suoratoisto palkkiosubstituuttina",
        consistent: true,
      },
      {
        prediction: "Naisten ahdistuksen/masennuksen sukupuolikuilu levenee",
        basis:
          "Estrogeeni vahvistaa HPA-reaktiivisuutta. EMF → kortisoli↑ osuu naisiin kovemmin.",
        observed:
          "Naiset 2× ahdistus, 2× masennus. Kuilu levenee 2010 jälkeen. Teiniyttojen mielenterveysriisi ~2012 lähtien.",
        consistent: true,
      },
      {
        prediction: "Institutionaalinen luottamus laskee maailmanlaajuisesti",
        basis:
          "OT → luottamus (Kosfeld 2005, Nature). EMF → vagaalitonus ↓ → OT ↓.",
        observed:
          "Edelman 2025: luottamus kaikissa instituutioissa historiallisen matalalla. Yksinäisyysepidemia julistettu.",
        consistent: true,
      },
      {
        prediction: "PCOS-esiintyvyys kasvaa EMF-adoption myötä",
        basis:
          "PCOS = 4 elimen VGCC-konvergenssi (haima + munasarja + aivolisake + lisaamunuainen).",
        observed:
          "PCOS 5–20 % ja kasvussa. Naisten hedelmattömyyden yleisin syy. Korreloi metabolisen syndrooman kanssa.",
        consistent: true,
      },
      {
        prediction: "Jokainen sukupolvi herkempi kuin edellinen",
        basis:
          "CaMKII → Cav3.2-kynnys ↓ (PMC9913649). Epigeneettinen transmissio (siittiiömetyloomi).",
        observed:
          "Mielenterveyskrriisi alkaa aiemmin jokaisessa kohortissa. ASD/ADHD-prevalenssi kasvaa sukupolvittain. Puberteetti alkaa aiemmin tytöillä.",
        consistent: true,
      },
    ],

    sProjectionTitle: "Mitä hormonidata ennustaa yhteiskunnasta",
    sProjectionLead:
      "Yllä olevat kaksitoista ennustetta jäljittävät yksilötason käyttäytymismuutoksia. Mutta yksilöt eivät elä eristyksissä. He muodostavat pareja, perheitä, tiimejä, instituutioita ja kansakuntia. Kun kokonaisen väestön hormonaalinen substraatti muuttuu, aggregoidut vaikutukset tuottavat emergenttejä sosiaalisia ilmiöitä, jotka näyttävät ideologiselta muutokselta, kulttuuriselta konfliktilta tai moraaliselta rapautumiselta — mutta saattavat merkittäviltä osin olla biologista muutosta koettuna kulttuurisena muutoksena.",
    sProjectionNote:
      "Tämä erottelu on tärkeä. Jos sosiaalinen ongelma on ideologinen, ratkaisu vaatii mielten muuttamista. Jos se on osittain biologinen, ratkaisuun sisältyy ympäristön muuttaminen. Jälkimmäinen on helpompaa.",

    spolarTitle: "Polarisaatio: digitaalinen rohkeus, fyysinen konformismi",
    spolarBody:
      "Yleisövaikutus-RCT (2020) osoitti, että matala testosteroni lisää strategista prososiaalisuutta — sen sanomista mitä yleisö odottaa, ei sitä mitä uskoo. Provokaatio-RCT (Carré 2017) osoitti, että matala testosteroni vähentää reaktiivista vastetta epäoikeudenmukaisuuteen. Yhdessä nämä ennustavat spesifin kuvion: ihmiset ovat konformistisia fyysisessä läsnäolossa mutta konfrontatiivisia ruutujen takaa.",
    spolarObserved:
      "Juuri tätä havaitaan. Verkossa polarisaatio on historiallisen korkealla. Fyysinen konfrontaatio on historiallisen matalalla. Ihmiset ilmaisevat anonyymisti näkemyksiä, joita he eivät koskaan sanoisi kasvotusten.",
    spolarExplain:
      "Tämä ei ole tekopyhyyttä. Se on biologiaa. Matala testosteroni nostaa autenttisen konfrontaation kynnystä. Digitaaliset ympäristöt laskevat konfrontaation sosiaalisen kustannuksen lähelle nollaa. Biologisen kynnyksen ja ympäristökustannuksen epäsuhta tuottaa kuvion: rohkea verkossa, hiljainen kasvotusten.",
    spolarPrediction:
      "BERM-ennuste: väestöissä joilla on korkeampi keskimääräinen T (esim. matala-EMF-yhteisöt), verkko- ja kasvokkais-käyttäytymisen välinen ero pitäisi olla pienempi.",
    spolarPhysical: "Fyysinen ympäristö",
    spolarPhysicalThreshold: "Korkea (kasvokkais sosiaalinen kustannus)",
    spolarPhysicalBehavior: "Konformismi, itsesensuri, myöntyminen",
    spolarPhysicalRct: "Audience 2020: matala T → strateginen prososiaalisuus",
    spolarDigital: "Digitaalinen ympäristö",
    spolarDigitalThreshold: "Lähellä nollaa (anonymiteetti, etäisyys)",
    spolarDigitalBehavior: "Raivo, polarisaatio, konfrontaatio",
    spolarDigitalRct: "Carré 2017: provokaatiovaste säilyy kun kustannus on matala",

    ssafetyTitle: "Turvallisuushakuisuus: hormonaalinen kynnys, ei arvovalinta",
    ssafetyBody:
      "Riskinotto vähenee testosteronin myötä (Competition RCT 2024, n=333). Ahdistus kasvaa kortisolin myötä (kaksoishormonimeta, n=8 538). Uhkaherkkyys kasvaa kun molemmat muuttuvat samanaikaisesti. Väestötasolla tämä tuottaa yhteiskunnan, joka kokee enemmän tilanteita uhkaavina — ei siksi että ympäristö olisi vaarallisempi (väkivaltarikollisuus on historiallisen matalalla) vaan koska biologinen kynnys uhkan havaitsemiselle on laskenut.",
    ssafetyParadox:
      "Tämä selittää muuten paradoksaalisen kuvion: ihmiskunnan historian turvallisimmat yhteiskunnat raportoivat korkeinta ahdistusta. Objektiivinen vaara on laskenut. Subjektiivinen uhka on noussut. Näiden välinen ero on hormonaalinen muutos.",
    ssafetyCreep:
      "Kun uhkahavainnointi kasvaa ilman todellisen uhkan kasvua, tuloksena on se mitä psykologit kutsuvat \"concept creepiksi\": haittaan liittyvien käsitteiden laajeneminen kattamaan aiemmin neutraaleja ilmiöitä. Sanat muuttuvat väkivallaksi. Erimielisyys muuttuu aggressioksi. Epämukavuus muuttuu traumaksi. Tämä ei ole moraalista edistystä eikä moraalista rappeutumista. Se on uudelleenkalibtoitu uhkantunnistusjärjestelmä joka toimii eri hormonaalisella substraatilla.",

    sinstitutionTitle: "Institutionaalinen rapautuminen: miksi kaikki heikkenee hieman",
    sinstitutionBody:
      "Tulos ei ole dramaattinen romahdus. Se on laaja-alainen, hidaskäyntinen laadun menetys. Terveydenhuolto heikkenee hieman. Koulutus heikkenee hieman. Infrastruktuurin ylläpito jää hieman jälkeen. Asiakaspalvelu heikkenee. Poliittiset ehdokkaat ovat hieman vähemmän päteviä. Jokainen yksinään huomaamaton. Yhdessä kuvio on sivilisatorinen.",
    sinstitutionData:
      "Vuoden 2025 Edelman Trust Barometer vahvistaa: luottamus kaikkiin instituutioihin — hallitukseen, mediaan, kansalaisjärjestöihin, työnantajiin — on laskenut lähes kaikissa demografioissa. Tämä ei ole puoluepoliittinen ilmiö. Se on substraatti-ilmiö.",

    sfixableTitle: "Korjattavissa oleva osuus",
    sfixableLead:
      "Jos tällä sivulla dokumentoidut käyttäytymismuutokset olisivat kokonaan ideologisia — jos ihmiset olisivat vähemmän motivoituneita, ahdistuneempia, konformistisempia ja vähemmän luottavaisia puhtaasti ideoiden takia — ratkaisu vaatisi miljardien mielten muuttamista. Historia viittaa siihen, että tämä on äärimmäisen vaikeaa. Mutta jos merkittävä osa näistä muutoksista on biologista, osa ratkaisusta on ympäristöllistä, ei ideologista.",
    sfixableSolutions: [
      "EMF-altistuksen vähentäminen elin- ja työtiloissa",
      "Kalsiumkanavamodulaatio (264 625 potilasta jo osoittaa psykiatrista hyötyä sydän- ja verisuonitauteihin määrätyistä CCB-lääkkeistä)",
      "Magnesiumlisä (luonnollinen Ca²⁺-antagonisti)",
      "Melatoniinin palautus (vuorokausirytmin korjaus)",
      "Unihygienia (melatoniini → GnRH → T-palautuminen)",
      "Fyysinen kontakti ja yhteisö (oksitosiinin palautus)",
    ],
    sfixableConclusion:
      "Mikään näistä ei vaadi kenenkään muuttavan uskomuksiaan. Ne vaativat sähkömagneettisen ympäristön muuttamista ja hormoneja säätelevien biologisten järjestelmien tukemista. Jos edes 20–30 % nykyisestä motivaation, luottamuksen ja sosiaalisen koheesion kriisistä on biologista eikä ideologista, se on 20–30 % joka voidaan osoittaa ilman poliittista konfliktia. Tämä on BERM-mallin käytännöllisesti tärkein implikaatio: ei se, että sivilisaatio on tuomittu, vaan se, että osa sen rapautumisesta johtuu spesifistä, tunnistettavasta ja mahdollisesti palautettavissa olevasta syystä.",

    shistoryTitle: "Historianluenta hormonaalisen linssin läpi",
    shistoryBody:
      "Jokainen sukupolvi kokee saman objektiivisen maailman eri hormonaalisen substraatin läpi. Mies vuonna 1960 testosteronilla 600 ng/dL, normaalilla kortisolilla ja ehjällä dopaminergisellä signaloinnilla kokee uravastoinkäymisen haasteena joka voitetaan. Mies vuonna 2024 testosteronilla 350 ng/dL, kohonneella kortisolilla ja vähentyneellä dopaminergisellä tonuksella kokee saman vastoinkäymisen uhkana jota vältetään. Heidän arvonsa voivat olla identtiset. Heidän biologinen kykynsä toimia noiden arvojen mukaisesti ei ole.",
    shistoryOlder:
      "Kun vanhemmat sukupolvet sanovat \"me vain tehtiin se\", he eivät kuvaile ylivertaista luonnetta. He kuvailevat eri hormonaalista ympäristöä, jossa toiminnan kynnys oli matalampi ja välttelyn kynnys korkeampi.",
    shistoryYounger:
      "Kun nuoremmat sukupolvet sanovat \"maailma on stressaavampi\", he eivät kuvaile vaarallisempaa maailmaa (se on objektiivisesti turvallisempi). He kuvailevat samaa maailmaa koettuna hormonaalisen substraatin läpi, joka havaitsee enemmän uhkaa ja tuottaa vähemmän motivaatiota kohdata sitä.",
    shistoryConclusion:
      "Kumpikaan sukupolvi ei ole väärässä. He kuvailevat samaa todellisuutta eri biologisten suodattimien läpi. Tuloksena oleva sukupolvien välinen konflikti — \"laiskaat nuoret\" vs \"todellisuudesta vieraantuneet boomerit\" — on itsessään hormonaalisen muutoksen seuraus, ei todiste kummankaan osapuolen moraalisesta epäonnistumisesta.",

    sideologyTitle: "Ideologia alavirrassa",
    sideologyBody:
      "Sama idea — \"turvallisuus on tärkeää\" — tuottaa eri poliittisia tuloksia riippuen sen väestön hormonaalisesta substraatista joka sitä kannattaa.",
    sideologyHigh:
      "T=500 ng/dL, kortisoli=normaali: \"Turvallisuus on tärkeää\" → rakenna turvallinen infrastruktuuri, valvo lakeja, kohtaa uhkat suoraan.",
    sideologyLow:
      "T=320 ng/dL, kortisoli=koholla: \"Turvallisuus on tärkeää\" → eliminoi kaikki riski, laajenna haitan määritelmää, vältä konfrontaatiota poistamalla konfrontaation aiheuttava ärsyke.",
    sideologyExplain:
      "Idea ei ole muuttunut. Biologinen kyky toteuttaa sitä on. Tämä ei ole vasemmisto vs oikeisto. Se ei ole progressiivinen vs konservatiivinen. Se on biologinen muutos toteutuskynnksessä samoille arvoille, jotka molemmat puolet suurelta osin jakavat. Molemmat puolet haluavat turvallisuutta. Molemmat puolet haluavat oikeudenmukaisuutta. Molemmat puolet haluavat mahdollisuuksia. Erimielisyys koskee sitä miten — ja \"miten\" on moderoitu hormonaalisilla kynnyksillä.",
    sideologyTestable:
      "Tämä on testattavissa. Jos poliittiset asenteet turvallisuuteen, riskiin ja auktoriteettiin korreloivat yksilön hormoniprofiilien (T, kortisoli, OT) kanssa demografisten tekijöiden ja ilmoitetun ideologian vakioinnin jälkeen, biologisen moderoinnin hypoteesi saa tukea. Useat tutkimukset ovat löytäneet juuri tämän: testosteroni korreloi poliittisten asenteiden kanssa auktoriteettiin, kilpailuun ja tulonjakoon eri kulttuureissa.",

    s7title: "Rekursiivinen ennuste",
    s7body:
      "BERM tekee epätavallisen ennusteen: sen oma vastaanotto on todistetta sen teesistä. Jos testosteronilelasku vähentää riskinottoa, kilpailuviettiä ja autenttista itseilmaisua väestötasolla, tiedeyhteisn — joka koostuu samojen hormonaalisten olosuhteiden alaisista ihmisistä — pitäisi osoittaa vähentynyt halukkuus haastaa konsensusta, tutkia kiistanalaisia suuntia ja puolustaa epäsuosittuja tuloksia. Malli ennustaa, että EMF-biovaikutustutkimus on alirahoitettua, stigmatisoitua ja institutionaalisesti torpattua — ei siksi että evidenssi olisi heikkoa, vaan koska intellektuaalista riskinottoa ajava hormonaalinen substraatti vähenee. Tämä on testattavissa: EMF-biovaikutustutkimuksen rahoitusosuuden NIH/ERC-kokonaisrahoituksesta pitäisi laskea, ja alan tutkijoiden pitäisi raportoida kasvavia uraseuraamuksia positiivisten tulosten julkaisemisesta.",

    s8title: "Dopaminerginen mieli",
    s8body:
      "Barzilain dopaminergisen mielen hypoteesi ehdottaa, että dopamiiniohjatut kognitiiviset piirteet — uteliaisuus, luovuus, tutkiminen, riskinsietokyky, tulevaisuusorientaatio — olivat keskeisiä modernin ihmiskognition synnylle. BERM lisää mekanismin: jos EMF häiritsee VTA Cav1.3 → dopamiinivapautumista ja testosteronilasku edelleen vähentää DA-reseptoriekspressiota, väestötason dopamiinifunktion lasku edustaa kognitiivisen vallankumouksen osittaista kääntämistä. Tämä ei ole väite älykkyydestä (ÄO voi pysyä vakaana tai jopa nousta Flynn-efekteillä). Se on väite kognitiivisesta tyylistä: siirtymä tutkimisesta hyödyntämiseen, riskinotosta riskinkaihtamiseen, innovaatiosta optimointiin. Yhteiskunta, jonka dopamiinifunktio heikkenee, ei lopeta ajattelemista — se lopettaa intellektuaalisten riskien ottamisen.",

    s9title: "Testattavat ennusteet",
    s9lead:
      "Jokainen ennuste määrittelee falsifikaatiokriteerin. Malli jota ei voida falsifioida ei ole tiedettä.",
    civPredictions: [
      {
        id: "CIV-1",
        title: "T-lasku jatkuu elämäntavoista riippumatta",
        detail:
          "Väestötason testosteronilasku jatkuu myös lihavuuden, tupakoinnin, alkoholin ja unen vakioinnin jälkeen — koska primääri ajuri on ympäristön EMF, ei elämäntapa.",
        falsification:
          "T-lasku selittyy täysin elämäntapatekijöillä suuressa kohortissa vakioinnin jälkeen",
      },
      {
        id: "CIV-2",
        title: "Matala-EMF-yhteisöt ylläpitävät korkeampaa T:tä",
        detail:
          "Amish-, menoniitti- ja muiden matala-EMF-yhteisöjen pitäisi ylläpitää korkeampaa ikävakioitua testosteronia kuin verrattujen kaupunkiväestöjen.",
        falsification:
          "Ei T-eroa matala-EMF- ja korkea-EMF-yhteisöjen välillä demografisen vakioinnin jälkeen",
      },
      {
        id: "CIV-3",
        title: "CCB-käyttäjät osoittavat väistyneemmän käyttäytymislaskun",
        detail:
          "Pitkäaikaisten CCB-käyttäjien pitäisi osoittaa vähemmän laskua T-riippuvaisissa käyttäytymisissä (yrittäjyys, riskinotto) verrattuna ei-CCB-verenpainelääkkeiden käyttäjiin.",
        falsification:
          "Ei käyttäytymiseroa CCB- ja ei-CCB-verenpainelääkkeiden käyttäjien välillä",
      },
      {
        id: "CIV-4",
        title: "TFR korreloi EMF-tiheyden kanssa, ei pelkästään BKT:n",
        detail:
          "BKT:n, koulutuksen ja kaupungistumisen vakionnin jälkeen EMF-infrastruktuuritiheyden pitäisi itsenäisesti ennustaa TFR-laskua maiden välillä.",
        falsification:
          "Ei residuaalikorrelaatiota EMF-tiheyden ja TFR:n välillä sosioekonomisen vakionnin jälkeen",
      },
      {
        id: "CIV-5",
        title: "Käyttäytymissuppressio kääntyy EMF-vähennyksellä",
        detail:
          "Henkilöiden, jotka vähentävät merkittävästi EMF-altistusta (esim. muutto matala-EMF-ympäristöön), pitäisi osoittaa mitattavaa palautumista T-riippuvaisissa käyttäytymisissä 6–12 kuukauden sisällä.",
        falsification:
          "Ei käyttäytymispalautumista kestävän EMF-vähennyksen jälkeen kontrolloidussa tutkimuksessa",
      },
      {
        id: "CIV-6",
        title: "Parinmuodostustodennäköisyys laskee multiplikatiivisesti",
        detail:
          "Jos miehen lähestyminen (T-riippuvainen) ja naisen vastaanottavaisuus (OT-riippuvainen) kukin laskevat X %, onnistuneen parinmuodostuksen pitäisi laskea X² %, ei 2X %. Testattavissa deittimarkkinadatalla yhdistettynä hormonimittauksiin.",
        falsification:
          "Parinmuodostusaste laskee lineaarisesti yksilöllisten hormonimittausten mukaan",
      },
      {
        id: "CIV-7",
        title:
          "Teiniyttojen mielenterveyskriisi korreloi laitteiston, ei sisällön kanssa",
        detail:
          "BERM ennustaa EMF-laitteistokomponentin (kortisoli HPA:n kautta, melatoniini käpyräisen kautta) vaikuttavan enemmän kuin sosiaalisen median sisällön. Tytöt jotka käyttävät älypuhelimia yhtä paljon mutta matala-EMF-ympäristöissä pitäisi osoittaa vähemmän ahdistuksen kasvua.",
        falsification:
          "Ei eroa ahdistuksessa korkea-EMF- ja matala-EMF-älypuhelinkäyttäjien välillä",
      },
      {
        id: "CIV-8",
        title:
          "Sukupolvien välinen hormonilasku kiihtyy ilman EMF:n kasvua",
        detail:
          "CaMKII-sensitisaatio + epigeneettinen transmissio ennustavat, että jopa vakio-EMF tuottaa kiihtyvvän hormoniilaskun sukupolvien yli. Testattavissa vertaamalla T-laskuvauhia sukupolvikohorttiien välillä samassa iässä.",
        falsification:
          "T-laskuvauhti on vakio sukupolvien välillä vastaavissa iäissä",
      },
      {
        id: "CIV-9",
        title:
          "Oksitosiiniriippuvaiset käyttäytymiset vähenevät EMF-ympäristön myötä",
        detail:
          "Vapaaehtoistyö, yhteisöllinen osallistuminen, hyväntekeväisyys, ihmistenvillinen luottamus — kaikki OT-riippuvaisia — pitäisi korreloida negatiivisesti EMF-ympäristön kanssa maiden välillä ja ajan yli.",
        falsification:
          "Ei korrelaatiota EMF-ympäristön ja OT-riippuvaisten sosiaalisten käyttäytymisten välillä",
      },
      {
        id: "CIV-10",
        title: "IVF muuttuu demografiseksi infrastruktuuriksi 2040 mennessä",
        detail:
          "Kun biologinen hedelmallisyyskyky laskee alle ~30 % pareista saavuttaa raskauden 12 kuukaudessa ilman apua, IVF siirtyy lääketieteellisestä interventiosta väestötason infrastruktuuriksi. Ennuste: Etelä-Korea 2030 mennessä, Japani 2035, suurin osa Eurooppaa 2040.",
        falsification:
          "Avustamattoman raskauden osuus pysyy yli 70 % vuoteen 2040 korkea-EMF-maissa",
      },
      {
        id: "CIV-11",
        title: "Verkko-kasvokkais-käyttäytymiskuilu korreloi väestön T-tason kanssa",
        detail:
          "Väestöt joilla on korkeampi keskimääräinen T osoittavat vähemmän eroa verkko- ja kasvokkais-käyttäytymisen välillä. Matala-EMF-yhteisöt osoittavat minimaalista eroa.",
        falsification:
          "Ei korrelaatiota väestön T:n ja verkko-kasvokkais-käyttäytymiseron välillä",
      },
      {
        id: "CIV-12",
        title: "Concept creep -vauhti korreloi kortisolitrendien kanssa maittain",
        detail:
          "Maat joissa kortisoli kasvaa nopeammin (tai T laskee nopeammin) osoittavat nopeampaa haittakäsitteiden laajenemista oikeudellisessa, akateemisessa ja mediakielessä.",
        falsification:
          "Ei korrelaatiota hormonaalisten trendien ja concept creep -vauhdin välillä",
      },
      {
        id: "CIV-13",
        title: "Sukupolvien välinen jännite on heikoin matala-EMF-yhteisöissä",
        detail:
          "Amish- ja vastaavat yhteisöt joilla on vakaat hormonaaliset lähtötasot sukupolvien yli osoittavat vähemmän sukupolvien välistä konfliktia kuin korkea-EMF-yhteiskunnat.",
        falsification:
          "Matala-EMF-yhteisöt osoittavat verrattavaa sukupolvijännitettä kansallisiin keskiarvoihin",
      },
      {
        id: "CIV-14",
        title: "Poliittiset asenteet riskiin ja auktoriteettiin korreloivat yksilön T:n kanssa demografisen vakioinnin jälkeen",
        detail:
          "Väestön sisällä: korkeamman T:n yksilöt suosivat konfrontaatioperustaisia ratkaisuja; matalamman T:n yksilöt välttämisperustaisia — riippumatta ilmoitetusta ideologiasta.",
        falsification:
          "Ei residuaali-T-korrelaatiota politiikkapreferenssien kanssa demografisen vakioinnin jälkeen",
      },
    ],

    s10title: "Episteemiset rajat",
    s10claims: [
      "Seitsemän RCT:tä osoittaa kausaalilinkit testosteronin ja spesifien käyttäytymisten välillä miehillä.",
      "Rinnakkaiset hormonaalishäiriöt naisilla on dokumentoitu mutta vähemmillä kausaalisilla (RCT) tutkimuksilla.",
      "Yhdistelmävaikutus (molemmat sukupuolet samanaikaisesti) on loogisesti johdettu yksilötason evidenssistä, ei suoraan mitattu väestötasolla.",
      "Sukupolvien välinen kiihtyminen on ennustettu CaMKII-mekaniikalla ja epigeneettisellä transmissiolla, ei vielä vahvistettu longitudinaalisesti.",
    ],
    s10notClaims: [
      "Että hormonit määräävät yksilöiden valintoja tai poliittisia uskomuksia.",
      "Että käyttäytymistrendit ovat täysin biologisia — kulttuuri, talous ja politiikka vaikuttavat.",
      "Että yksittäisen ihmisen käyttäytymistä voi ennustaa hormonitasoista.",
      "Että EMF-altistuksen kääntäminen kumoaisi kaikki havaitut sosiaaliset trendit.",
    ],
    s10recursive:
      "Jos malli on väärässä, ennusteet epäonnistuvat näkyvästi. Se on tarkoituksellista.",
    s10summary:
      "Hormonit asettavat kynnyksiä, eivät tuloksia. Tämä sivu jäljittää mihin kynnykset ovat siirtymässä, mitä se ennustaa väestötasolla, ja miksi osa siitä mikä näyttää ideologiselta muutokselta saattaa olla biologista muutosta koettuna kulttuurisena muutoksena.",
    s10fixable:
      "Jos se osuus on edes 20–30 %, se on osuus joka on korjattavissa ilman poliittista konfliktia.",
    modelLink: "Lue mekanismi",
    evidenceLink: "Tutki evidenssiä",
    predictionsLink: "Katso kaikki ennusteet",
  },
};

type Locale = "en" | "fi";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = COPY[locale as Locale] ?? COPY.en;
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function CivilizationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = COPY[locale as Locale] ?? COPY.en;

  return (
    <main id="main-content" className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <PageHeader title={d.title} subtitle={d.subtitle} icon={Landmark} />

      {/* Hero illustration */}
      <figure className="mb-12 -mx-4 sm:-mx-6 lg:-mx-12">
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src="/images/spengler-seasons.png"
            alt="Four allegorical figures representing civilizational seasons — spring, summer, autumn, winter"
            width={1500}
            height={884}
            className="w-full h-auto"
            priority
          />
          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
        </div>
        <figcaption className="mt-3 text-center text-xs text-foreground-muted/60 italic">
          The Four Seasons of Civilization
        </figcaption>
      </figure>

      {/* S1: Hero */}
      <section className="mb-16">
        <p className="text-lg leading-relaxed text-muted-foreground mb-4">
          {d.heroLead}
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground mb-4">
          {d.heroTrail}
        </p>
        <p className="text-sm italic text-muted-foreground/80">
          {d.levelNote}
        </p>
      </section>

      {/* S2: Two Parallel Disruptions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500" />
          {d.s2title}
        </h2>
        <p className="text-muted-foreground mb-8">{d.s2lead}</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Male */}
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-400">
              {d.maleTitle}
            </h3>
            <ul className="space-y-1 text-sm mb-4">
              <li><span className="font-mono text-blue-400">1.</span> {d.malePrimary}</li>
              <li><span className="font-mono text-blue-400">2.</span> {d.maleSecondary}</li>
              <li><span className="font-mono text-blue-400">3.</span> {d.maleTertiary}</li>
            </ul>
            {d.maleConsequences.map((c, i) => (
              <div key={i} className="mt-4 border-t border-blue-500/20 pt-3">
                <p className="font-semibold text-sm">{c.hormone}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Mechanism:</span> {c.mechanism}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Behavioral:</span> {c.behavioral}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Evidence:</span> {c.evidence}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Magnitude:</span> {c.magnitude}
                </p>
              </div>
            ))}
            <div className="mt-4 rounded-lg bg-blue-500/10 p-3">
              <p className="text-xs font-medium">{d.maleReproductive}</p>
            </div>
          </div>

          {/* Female */}
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-6">
            <h3 className="text-lg font-semibold mb-3 text-rose-400">
              {d.femaleTitle}
            </h3>
            <ul className="space-y-1 text-sm mb-4">
              <li><span className="font-mono text-rose-400">1.</span> {d.femalePrimary}</li>
              <li><span className="font-mono text-rose-400">2.</span> {d.femaleSecondary}</li>
              <li><span className="font-mono text-rose-400">3.</span> {d.femaleTertiary}</li>
            </ul>
            {d.femaleConsequences.map((c, i) => (
              <div key={i} className="mt-4 border-t border-rose-500/20 pt-3">
                <p className="font-semibold text-sm">{c.hormone}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Mechanism:</span> {c.mechanism}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Behavioral:</span> {c.behavioral}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Evidence:</span> {c.evidence}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Magnitude:</span> {c.magnitude}
                </p>
              </div>
            ))}
            <div className="mt-4 rounded-lg bg-rose-500/10 p-3">
              <p className="text-xs font-medium">{d.femaleReproductive}</p>
            </div>
          </div>
        </div>
      </section>

      {/* S3: Triple Lock */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-500" />
          {d.s3title}
        </h2>
        <p className="text-sm text-muted-foreground/70 mb-2">{d.s3subtitle}</p>
        <p className="text-muted-foreground mb-4">{d.s3lead}</p>
        <p className="text-sm italic text-muted-foreground/80 mb-6">
          {d.s3note}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-semibold">RCT</th>
                <th className="text-left py-2 px-3 font-semibold">n</th>
                <th className="text-left py-2 px-3 font-semibold">Design</th>
                <th className="text-left py-2 px-3 font-semibold">Finding</th>
                <th className="text-left py-2 px-3 font-semibold">Behavior</th>
              </tr>
            </thead>
            <tbody>
              {d.rcts.map((r, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 px-3 font-mono text-xs whitespace-nowrap">
                    {r.authors}
                  </td>
                  <td className="py-2 px-3 text-xs">{r.n}</td>
                  <td className="py-2 px-3 text-xs">{r.design}</td>
                  <td className="py-2 px-3 text-xs text-muted-foreground">
                    {r.finding}
                  </td>
                  <td className="py-2 px-3 text-xs font-medium">{r.behavioral}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{d.tripleLockExplain}</p>
      </section>

      {/* S4: Female Parallel */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-500" />
          {d.s4title}
        </h2>
        <p className="text-muted-foreground mb-2">{d.s4lead}</p>
        <p className="text-sm italic text-muted-foreground/80 mb-8">
          {d.s4note}
        </p>

        {/* 4A: Cortisol */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.s4aTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">{d.s4aBody}</p>
          <p className="text-sm font-medium text-amber-500">{d.s4aPrediction}</p>
        </div>

        {/* 4B: Oxytocin */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.s4bTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">{d.s4bBody}</p>
          <p className="text-sm text-muted-foreground mb-3">{d.s4bData}</p>
          <p className="text-xs italic text-muted-foreground/80">{d.s4bCaveat}</p>
        </div>

        {/* 4C: Ovarian */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.s4cTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">{d.s4cBody}</p>
          <div className="rounded-lg bg-rose-500/10 p-3 mt-3">
            <p className="text-xs font-medium">{d.s4cNote}</p>
          </div>
        </div>
      </section>

      {/* S5: Compound Effects */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          {d.s5title}
        </h2>
        <p className="text-muted-foreground mb-8">{d.s5lead}</p>

        {/* 5A: Pair-bonding */}
        <div className="mb-8 rounded-xl border border-amber-500/30 p-6">
          <h3 className="text-lg font-semibold mb-4">{d.s5aTitle}</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg bg-blue-500/10 p-4">
              <p className="text-sm font-semibold text-blue-400 mb-1">{d.s5aMaleDeficit}</p>
              <p className="text-xs text-muted-foreground">{d.s5aMaleMech}</p>
            </div>
            <div className="rounded-lg bg-rose-500/10 p-4">
              <p className="text-sm font-semibold text-rose-400 mb-1">{d.s5aFemaleDeficit}</p>
              <p className="text-xs text-muted-foreground">{d.s5aFemaleMech}</p>
            </div>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-4 mb-4">
            <p className="text-sm font-medium">{d.s5aCompound}</p>
          </div>
          <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
            {d.s5aObserved.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>

        {/* 5B: Fertility */}
        <div className="mb-8 rounded-xl border border-red-500/30 p-6">
          <h3 className="text-lg font-semibold mb-3">{d.s5bTitle}</h3>
          <p className="font-mono text-sm mb-3 text-center">{d.s5bFormula}</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
            {d.s5bFactors.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <div className="rounded-lg bg-red-500/10 p-4">
            <p className="text-sm">{d.s5bCompound}</p>
          </div>
        </div>

        {/* 5C: Child development */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Baby className="w-5 h-5" />
            {d.s5cTitle}
          </h3>
          <div className="space-y-4">
            {d.s5cBurdens.map((b, i) => (
              <div key={i} className="rounded-lg border p-4">
                <p className="font-semibold text-sm mb-1">
                  {i + 1}. {b.title}
                </p>
                <p className="text-xs text-muted-foreground">{b.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{d.s5cSpiral}</p>
        </div>

        {/* 5D: Institutional decay */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            {d.s5dTitle}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{d.s5dLead}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg bg-blue-500/10 p-4">
              <p className="text-xs">{d.s5dBuilding}</p>
            </div>
            <div className="rounded-lg bg-rose-500/10 p-4">
              <p className="text-xs">{d.s5dMaintaining}</p>
            </div>
          </div>
          <p className="text-sm font-medium">{d.s5dConclusion}</p>
        </div>

        {/* 5E: Generational spiral */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-500" />
            {d.s5eTitle}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-semibold">Generation</th>
                  <th className="text-left py-2 px-2 font-semibold">EMF</th>
                  <th className="text-left py-2 px-2 font-semibold">T</th>
                  <th className="text-left py-2 px-2 font-semibold">OT</th>
                  <th className="text-left py-2 px-2 font-semibold">TFR</th>
                  <th className="text-left py-2 px-2 font-semibold">Institutional</th>
                </tr>
              </thead>
              <tbody>
                {d.generations.map((g, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 px-2 font-medium">{g.label}</td>
                    <td className="py-2 px-2 text-muted-foreground">{g.emf}</td>
                    <td className="py-2 px-2 text-muted-foreground">{g.tLevel}</td>
                    <td className="py-2 px-2 text-muted-foreground">{g.otLevel}</td>
                    <td className="py-2 px-2 font-mono">{g.tfr}</td>
                    <td className="py-2 px-2 text-muted-foreground">{g.institutional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm font-medium">{d.generationInsight}</p>
        </div>
      </section>

      {/* S6: 12 Predictions, 12 Observations */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{d.s6title}</h2>
        <p className="text-muted-foreground mb-6">{d.s6lead}</p>
        <div className="space-y-3">
          {d.predictions.map((p, i) => (
            <div
              key={i}
              className="rounded-lg border p-4 flex flex-col sm:flex-row sm:items-start gap-3"
            >
              <span className="flex-shrink-0 rounded-full bg-green-500/20 text-green-400 text-xs font-mono px-2 py-0.5">
                {i + 1}/12
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{p.prediction}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">RCT basis:</span> {p.basis}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Observed:</span> {p.observed}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Societal Projection */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Users className="w-6 h-6 text-violet-500" />
          {d.sProjectionTitle}
        </h2>
        <p className="text-muted-foreground mb-2">{d.sProjectionLead}</p>
        <p className="text-sm italic text-muted-foreground/80 mb-8">
          {d.sProjectionNote}
        </p>

        {/* Polarization */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.spolarTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">{d.spolarBody}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg bg-blue-500/10 p-4">
              <p className="text-sm font-semibold text-blue-400 mb-2">{d.spolarPhysical}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium">T threshold:</span> {d.spolarPhysicalThreshold}</p>
              <p className="text-xs text-muted-foreground mt-1"><span className="font-medium">Behavior:</span> {d.spolarPhysicalBehavior}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{d.spolarPhysicalRct}</p>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-4">
              <p className="text-sm font-semibold text-amber-400 mb-2">{d.spolarDigital}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium">T threshold:</span> {d.spolarDigitalThreshold}</p>
              <p className="text-xs text-muted-foreground mt-1"><span className="font-medium">Behavior:</span> {d.spolarDigitalBehavior}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{d.spolarDigitalRct}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{d.spolarObserved}</p>
          <p className="text-sm text-muted-foreground mb-3">{d.spolarExplain}</p>
          <p className="text-sm font-medium text-violet-400">{d.spolarPrediction}</p>
        </div>

        {/* Safety-seeking */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.ssafetyTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">{d.ssafetyBody}</p>
          <div className="rounded-lg bg-amber-500/10 p-4 mb-3">
            <p className="text-sm font-medium">{d.ssafetyParadox}</p>
          </div>
          <p className="text-sm text-muted-foreground">{d.ssafetyCreep}</p>
        </div>

        {/* Institutional decay (expanded) */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            {d.sinstitutionTitle}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{d.sinstitutionBody}</p>
          <p className="text-sm text-muted-foreground">{d.sinstitutionData}</p>
        </div>

        {/* The Fixable Fraction */}
        <div className="mb-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
          <h3 className="text-lg font-semibold mb-3 text-green-400">{d.sfixableTitle}</h3>
          <p className="text-sm text-muted-foreground mb-4">{d.sfixableLead}</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
            {d.sfixableSolutions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <p className="text-sm font-medium">{d.sfixableConclusion}</p>
        </div>

        {/* Reading history */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.shistoryTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">{d.shistoryBody}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-3">
            <div className="rounded-lg bg-blue-500/10 p-4">
              <p className="text-xs text-muted-foreground">{d.shistoryOlder}</p>
            </div>
            <div className="rounded-lg bg-rose-500/10 p-4">
              <p className="text-xs text-muted-foreground">{d.shistoryYounger}</p>
            </div>
          </div>
          <p className="text-sm font-medium">{d.shistoryConclusion}</p>
        </div>

        {/* Ideology as downstream */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.sideologyTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">{d.sideologyBody}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg bg-green-500/10 p-4">
              <p className="text-xs font-medium">{d.sideologyHigh}</p>
            </div>
            <div className="rounded-lg bg-red-500/10 p-4">
              <p className="text-xs font-medium">{d.sideologyLow}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{d.sideologyExplain}</p>
          <p className="text-sm text-muted-foreground">{d.sideologyTestable}</p>
        </div>
      </section>

      {/* S7: Recursive Prediction */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          {d.s7title}
        </h2>
        <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {d.s7body}
          </p>
        </div>
      </section>

      {/* S8: Dopaminergic Mind */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">{d.s8title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {d.s8body}
        </p>
      </section>

      {/* S9: Testable Predictions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Target className="w-6 h-6 text-emerald-500" />
          {d.s9title}
        </h2>
        <p className="text-muted-foreground mb-6">{d.s9lead}</p>
        <div className="space-y-4">
          {d.civPredictions.map((p) => (
            <div key={p.id} className="rounded-xl border p-5">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono px-2 py-0.5">
                  {p.id}
                </span>
                <div>
                  <p className="font-semibold text-sm">{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {p.detail}
                  </p>
                  <p className="text-xs text-red-400/80 mt-2">
                    <span className="font-medium">Falsification:</span>{" "}
                    {p.falsification}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* S10: Epistemic Boundaries */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">{d.s10title}</h2>
        <div className="rounded-xl border border-green-500/30 p-5 mb-4">
          <h3 className="text-sm font-semibold mb-3 text-green-400">
            {locale === "fi" ? "Tämä sivu väittää:" : "This page claims:"}
          </h3>
          <ul className="space-y-2">
            {d.s10claims.map((c, i) => (
              <li key={i} className="text-xs text-muted-foreground flex gap-2">
                <span className="text-green-400 flex-shrink-0">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-muted-foreground text-center mb-2">
          {d.s10summary}
        </p>
        <p className="text-sm font-medium text-center">
          {d.s10fixable}
        </p>
      </section>

      {/* Navigation links */}
      <section className="flex flex-wrap gap-4 justify-center mb-12">
        <Link
          href={`/${locale}/model`}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors"
        >
          {d.modelLink} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href={`/${locale}/evidence`}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors"
        >
          {d.evidenceLink} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href={`/${locale}/predictions`}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors"
        >
          {d.predictionsLink} <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
