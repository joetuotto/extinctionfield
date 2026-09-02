import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Baby, Building2, Users, Brain, TrendingDown, Target } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { TranslationNotice } from "@/components/TranslationNotice";
import { ClaimRef } from "@/components/ClaimRef";
import { InlineReferenceText } from "@/components/InlineReferenceText";

const COPY = {
  en: {
    title: "Patopolis",
    subtitle: "How the city degrades the biological substrates of civilization",
    heroLead: "The city is not just a social environment — it is an electromagnetic one. Every concrete wall reflects, every wire hums, every device pulses. This page traces what that environment does to the body, the family, the institution, and the civilization.",
    civilizationLink: "Back to Civilization",
    patokratiaLink: "Patokratia",
    patokinesisLink: "Patokinesis",
    mechanismNote: "The root mechanism — how EMF disrupts calcium channels to produce sex-specific hormonal cascades — is described in Pathopege.",
    s5title: "Compound Effects",
    s5lead:
      "Individual-level hormonal changes become civilizational when they affect both sides of every human dyad simultaneously. Pair-bonding requires a man who approaches and a woman who trusts. Reproduction requires functional sperm and functional oocytes. Child-rearing requires paternal investment and maternal bonding. When EMF disrupts both sides at once, the result is not additive — it is multiplicative.",

    s5aTitle: "Pair-bonding bifurcation",
    s5aMaleDeficit:
      "Approach motivation ↓ (T↓ → [[ref:goetz2024|Goetz 2024]])",
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
      "f(sperm): −62% concentration ([[ref:levine2023_sperm|Levine 2023]])",
      "g(oocyte): AMH declining, PCOS rising, reserve depleting earlier",
      "h(timing): Circadian disruption → ovulation timing errors",
      "j(motivation): T↓ (male) × OT↓ (female) → fewer attempts",
    ],
    s5bCompound:
      "If each factor declines 30%, total fecundability declines 76% (0.7⁴ = 0.24). Fecundability is the clinical probability of conception per menstrual cycle — distinct from the total fertility rate (TFR), which measures births per lifetime. The multiplicative structure means small declines in each factor compound into a dramatically larger aggregate decline. This explains why TFR is falling faster than any single factor would predict — and why pronatalist policies fail. Policy addresses j(motivation) with money. It cannot address f, g, or h — which are biological.",

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
      "Each generation starts from a weaker baseline than the previous one. CaMKII-mediated sensitization means each generation is also more sensitive to the same EMF dose. This produces an accelerating spiral. CaMKII (calcium/calmodulin-dependent protein kinase II) is an enzyme that, once activated by calcium influx, remains active even after calcium levels normalize — it effectively creates a molecular memory of past exposure by auto-phosphorylating and sustaining downstream signaling changes. This mechanism converts temporary Ca²⁺ overload into permanent cellular state changes, including altered gene expression via methylation.",

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
        tLevel: "−30–40% ([[ref:santi2025|Santi 2025]])",
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
        basis: "T → status motivation ([[ref:dreher2016|Dreher 2016]], n=121)",
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
        basis: "T → sexual motivation ([[ref:goetz2024|Goetz 2024]], n=139)",
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
        basis: "T → reactive aggression ([[ref:carre2017_exogenous_t_aggression|Carré 2017]], n=308)",
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
        basis: "T↓ → DA↓ → anhedonia ([[ref:soares_cunha2016_d2_motivation|Soares-Cunha 2016]])",
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
          "OT → trust ([[ref:kosfeld2005|Kosfeld 2005, Nature]]). EMF → vagal tone ↓ → OT ↓.",
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
      "The audience effect RCT (2020) showed that low testosterone increases strategic prosociality — saying what the audience expects rather than what you believe. The provocation RCT ([[ref:carre2017_exogenous_t_aggression|Carré 2017]]) showed that low testosterone reduces reactive response to injustice. Together, these predict a specific pattern: people will be conformist in physical presence but confrontational from behind screens.",
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
    spolarDigitalRct: "[[ref:carre2017_exogenous_t_aggression|Carré 2017]]: provocation response persists when cost is low",

    ssafetyTitle: "Safety-seeking: hormonal threshold, not value choice",
    ssafetyBody:
      "Risk-taking declines with testosterone (Competition RCT 2024, n=333). Anxiety increases with cortisol ([[ref:dual_hormone_meta2021|dual hormone meta, n=8,538]]). Threat sensitivity increases when both shift simultaneously. At the population level, this produces a society that experiences more situations as threatening — not because the environment is more dangerous (violent crime is at historic lows) but because the biological threshold for threat perception has lowered.",
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

    s8bTitle: "Cybernetic Feedback Loops",
    s8bLead:
      "The civilization-level effects are not one-way. Behavioral changes feed back into exposure patterns, creating self-reinforcing loops that accelerate the process.",
    s8bPositiveTitle: "Positive (amplifying) loops",
    s8bPositiveLoops: [
      "Smartphone use ↑ → melatonin ↓ → sleep quality ↓ → daytime fatigue ↑ → more smartphone use (dopaminergic compensation)",
      "Testosterone ↓ → risk-avoidance ↑ → indoor time ↑ → EMF exposure ↑ → further testosterone ↓",
      "Social anxiety ↑ → digital communication preference ↑ → screen time ↑ → oxytocin ↓ → more social anxiety",
    ],
    s8bNegativeTitle: "Negative (stabilizing) loops",
    s8bNegativeLoops: [
      "Fatigue ↑ → physical inactivity ↑ → less outdoor time → less solar UV → less vitamin D → weaker Ca²⁺ buffering → greater EMF sensitivity",
      "Sleep disruption ↑ → caffeine use ↑ → adenosine receptor adaptation → partial neuroprotection (A₁ → VGCC modulation)",
    ],
    s8bImplication:
      "The positive loops dominate. Each generation begins with a lower hormonal baseline and higher ambient EMF than the previous one. The stabilizing loops (caffeine, exercise) require conscious effort — the amplifying loops operate automatically. This asymmetry is the mechanism by which a small initial perturbation produces large civilizational effects across decades.",

    s8cTitle: "Time Preference and Fertility Decisions",
    s8cLead:
      "Temporal discounting is the reduction in subjective value of a reward as the delay to receiving it increases. Hyperbolic discounting is the specific pattern where the discount rate is not constant but steepens as the delay approaches — producing preference reversals (choosing a smaller immediate reward over a larger delayed one, even when the delayed choice was preferred in advance). This has a hormonal substrate. When that substrate changes, time preferences shift, and fertility decisions follow.",
    s8cMechanism:
      "Testosterone influences temporal discounting through two pathways: (1) directly, via androgen receptor density in the prefrontal cortex, which modulates future-oriented decision-making; and (2) indirectly, via dopamine — testosterone upregulates D2 receptor expression in the striatum, and dopamine mediates the valuation of delayed rewards. When both decline simultaneously, the present becomes heavier and the future becomes lighter.",
    s8cFertility:
      "Fertility is the ultimate future-oriented decision: high cost now, uncertain reward years later. A population-level shift toward present-orientation predicts fertility postponement — not because people decide children are undesirable, but because the hormonal threshold for committing to a high-cost, long-horizon project rises. This is distinct from economic explanations: it predicts that fertility will decline even when economic conditions improve, and that the decline will correlate with hormonal markers after controlling for income and education.",
    s8cTestable:
      "Testable: individual discount rates (measured by delay discounting tasks) should correlate with testosterone and dopamine markers, and should predict fertility timing after controlling for stated fertility intentions, income, and education.",

    sIQSTitle: "The IQ Shredder",
    sIQSSubtitle: "A biological diagnosis",
    sIQSLead:
      'In 2013, the blogger Spandrell described Singapore as an "IQ shredder" — a high-performance city-state that selectively attracts talented people, extracts maximum economic productivity from them, and then partially sterilizes them through sub-replacement fertility. Nick Land (2014) formalized the concept: first-order eugenics (concentrating the genetically gifted) produces second-order dysgenics (destroying those genes through reproductive failure). The most optimized economic environments on earth are simultaneously the most biologically destructive.',
    sIQSBiological:
      "Land and Spandrell describe the mechanism culturally: the rat race, the career treadmill, the economic incentive to postpone or forgo children. BERM provides the biological substrate they were missing. The fertility collapse in high-performance cities is not primarily an economic rational choice — it is endocrine suppression in the most electromagnetically dense environments on earth. The same infrastructure that enables economic concentration (dense office buildings, ubiquitous WiFi, constant device use) also maximizes exposure to the EMF that degrades reproductive biology.",
    sIQSNotChoice:
      "Singapore's TFR of 0.78 is not Singaporeans choosing to not have children. It is the endocrine output of an environment where testosterone has declined ~40%, oxytocin ~46%, and dopamine function is chronically impaired. The people who move to Singapore for economic opportunity are not making a trade-off they understand — they are entering an electromagnetic environment that will systematically suppress their reproductive capacity through mechanisms they cannot perceive.",
    sIQSComponents: "Five measurable biological components",
    sIQSComponentsDesc:
      "The IQ Shredder is not a single process but five interlocking biological mechanisms. Each is independently measurable from biomarker data, and together they form a self-reinforcing system that converts human genetic capital into economic output while destroying reproductive capacity.",
    sIQSRepro: "Reproductive suppression",
    sIQSReproDesc:
      "Four biological pathways must all function for population-level reproduction: male reproductive drive (testosterone provides sexual initiative and mate-seeking behavior), female bonding capacity (oxytocin enables attachment and trust formation), pair-bond stability (the multiplicative OXT×T interaction that produces monogamous commitment), and parental investment motivation (the neurological capacity to sustain a 20-year investment in offspring). In the urban office environment, all four are simultaneously degraded. The suppression index measures how much total reproductive capacity is endocrine-suppressed.",
    sIQSDA: "Dopaminergic capture",
    sIQSDADesc:
      'Low dopamine means natural rewards — relationships, parenting, community participation, quiet evenings — feel insufficient. The brain seeks stronger stimulation: screens, work, novelty, consumption. Each of these increases EMF exposure, which further suppresses dopamine, which drives more seeking. This is the biological mechanism behind the "rat race" that Land describes economically. The career treadmill is not a cultural choice — it is a dopaminergic trap. People work harder for diminishing subjective reward, not because they rationally prefer career over family, but because the neurological machinery that makes family feel rewarding has been degraded. High cortisol adds anxiety-driven productivity: working not for reward but to avoid the discomfort of not working.',
    sIQSTime: "Time preference shift",
    sIQSTimeDesc:
      "Children are a 20+ year investment with uncertain future payoff. Making this investment requires neurological capacity to value distant future rewards over immediate costs. Dopamine regulates delayed gratification ([[ref:mcclure2004_delayed_reward|McClure 2004]]); BDNF supports abstract future-modeling. When both decline, temporal discounting steepens — the present becomes heavier, the future lighter. This is not a philosophical shift toward individualism. It is a neurological devaluation of long-horizon investments. A population whose time preference has shifted biologically will postpone or forgo reproduction even when economic conditions are favorable, because the hormonal threshold for committing to a decades-long project has risen above the reward signal the brain can generate.",
    sIQSBurn: "Genetic burn rate",
    sIQSBurnDesc:
      "The TFR alone underestimates the biological cost. Even the children who are born carry epigenetic damage — CaMKII-mediated methylation changes that alter gene expression in the next generation. BDNF decline (28% across the gradient) reflects neurodevelopmental impact; melatonin decline reflects disrupted developmental timing. The shredder does not merely prevent births — it degrades the biological quality of the births that occur. This means the commonly cited sub-replacement fertility figures are optimistic: the actual genetic capital destruction exceeds what the fertility rate suggests.",
    sIQSEff: "Shredder efficiency",
    sIQSEffDesc:
      "The core metric: the geometric mean of dopaminergic capture (how effectively the environment extracts productivity) and reproductive suppression (how thoroughly it destroys reproductive capacity). Both must be present — capture without suppression is just high productivity, suppression without capture is just poverty. The IQ Shredder is specifically the environment that achieves both simultaneously. This is why Singapore and Hong Kong are the archetypes: they have the highest economic productivity per capita AND the lowest fertility rates on earth.",
    sIQSTable: "IQ Shredder gradient",
    sIQSTableDesc:
      "Every metric intensifies monotonically from the Amish baseline to the urban office environment. The shredder efficiency column — the core metric — shows a 10× increase across the gradient. An environment beyond urban_office (Singapore, Hong Kong, central Tokyo) would register even higher.",
    sIQSEnv: "Environment",
    sIQSReproCol: "Repro suppression",
    sIQSDACol: "DA capture",
    sIQSTimeCol: "Time pref shift",
    sIQSBurnCol: "Genetic burn",
    sIQSEffCol: "Shredder efficiency",
    sIQSBiocapCol: "BioCap",
    sIQSMeta: "The meta-irony",
    sIQSMetaDesc:
      "Land's proposed solution — accelerate past the biological bottleneck by converting human species into auto-intelligenic robotized capital before the process collapses — is itself a symptom of the dopaminergic trap at the meta-level. It proposes replacing a biological solution with a technological workaround, because the biological substrate for valuing biological solutions has already been destroyed. The population cannot value its own reproduction because the neurological machinery for valuing long-term biological investment has been degraded by the same environment that makes the technological alternative seem appealing. The IQ Shredder does not merely destroy genes. It destroys the capacity to recognize that genes are being destroyed.",
    sIQSPredictions: "Predictions",
    sIQSPred1:
      "Singapore's fertility decline correlates with EMF infrastructure density, not just economic development — controlling for GDP per capita, the EMF-dense city-states will show lower TFR than economically comparable but less EMF-dense nations.",
    sIQSPred2:
      "Shredder velocity is predictable from BioCap: cities with lower BioCap (higher EMF density) will reach demographic crisis earlier, regardless of pro-natalist policy spending.",
    sIQSPred3:
      "Epigenetic transmission means the shredder damages even the children who are born — second-generation city-dwellers will show lower fertility than first-generation immigrants at the same economic level, even after controlling for cultural assimilation.",
    sIQSLit: [
      "Spandrell (2013): Singapore as IQ shredder — selective immigration concentrates talent, urban environment suppresses their fertility to 0.78.",
      "Land (2014): first-order eugenics produces second-order dysgenics. The most economically optimized environments are the most biologically destructive.",
      "[[ref:mcclure2004_delayed_reward|McClure et al. (2004, Science)]]: separate neural systems for immediate vs delayed rewards. Dopaminergic midbrain mediates delayed reward valuation.",
      "[[ref:levine2023_v2|Levine et al. (2023)]]: sperm concentration declined 62% globally 1973-2018. Decline is steeper in urbanized regions.",
      "Singapore Department of Statistics (2023): TFR 0.97 (2023), down from 1.82 (1980). Pro-natalist spending exceeds $2B/year with minimal effect.",
    ],

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

    lostRecoveryTitle: "The Lost Recovery Window",
    lostRecoveryDesc: "For the first time in human history, there is no period in the day without significant EMF exposure. The power grid runs 24/7. WiFi routers are never turned off. LED lights operate until sleep. The phone sits on the bedside table through the night. Bluetooth devices maintain connections continuously.",
    lostRecoveryMechanism: "CaMKII dephosphorylation — the molecular recovery process — requires time without Ca²⁺ overload. Pre-electrification humans had 22+ hours per day without any artificial EMF. Modern urbanites have approximately zero. The COVID lockdown demonstrated this experimentally: 24 hours/day at home with WiFi + LED + multiple devices eliminated the last recovery window — and T2D acceleration jumped from 2.90% to 3.52%/yr.",
    lostRecoveryIntervention: "This is also the most actionable insight from the model: an EMF-free bedroom is the single simplest intervention. No dietary change, no medication, no lifestyle overhaul — just remove the router, use airplane mode at night, and switch to incandescent light before sleep.",

    buildingTitle: "Concrete Cities: Built-In EMF Amplification",
    buildingDesc: "Urbanization is not just a social change — it is an electromagnetic change. Reinforced concrete reflects RF internally (steel rebar acts as a partial Faraday cage in reverse), increasing indoor field strength. Wood is RF-transparent — the field passes through and dissipates. When rural populations moved to concrete cities, they simultaneously increased their ambient EMF exposure through a mechanism no one was measuring.",
    buildingEvidence: "Wood rooms produce better sleep, lower heart rate, and better cognitive performance compared to concrete rooms ([[ref:wood_health2026|BIOBUILDS 2026]]). Conventional explanation: biophilia. BERM addition: RF reflection coefficient. Both may be correct — but the EMF mechanism is testable and the biophilia mechanism is not.",

    animalsFellTitle: "The Animals Fell First",
    animalsFellDesc: "If EMF is affecting biology at fundamental Ca²⁺ and CRY levels, then species with higher sensitivity should have declined first — and they did. Frogs (moist skin, direct Ca²⁺ coupling) began declining around 1987 as GSM rolled out. Bees (CRY-dependent navigation) collapsed in 2006 as cell towers reached rural areas. Insect biomass dropped 75% over 27 years. Bird populations followed. Mammals — including humans — are the least sensitive due to dry skin and large body mass, but the effects are cumulative over long lifespans.",
    animalsFellAnalogy: "The canary-in-the-coal-mine analogy is not metaphorical — it is mechanistic. The same ion channels, the same magnetoreceptors, the same Ca²⁺ signaling. The animals did not decline for separate reasons that happen to correlate. They declined through the same mechanism at different sensitivity thresholds.",

    civilizationNote: "The civilizational perspective — biological carrying capacity, empire lifespans, solar cycles, and the activation mechanism — is explored in Patopoliteia.",
    svgMaleLower: "male",
    svgFemaleLower: "female",
    svgReduction: "reduction",
    svgStart: "start",
    svgSperm: "sperm",
    svgOocyte: "oocyte",
    svgTiming: "timing",
    svgMotivation: "motivation",
    svgFecundability: "fecundability",
    svgTestosterone: "Testosterone",
    svgOxytocin: "Oxytocin",
    scoreConsistent: "consistent",
    svgNeutral: "neutral",
    svgPhysical: "Physical",
    svgConformity: "Conformity",
    svgHighThreshold: "high threshold",
    svgDigital: "Digital",
    svgOutragePolarization: "Outrage & polarization",
    svgNearZeroCost: "near-zero cost",
    svgThresholdVsCost: "biological threshold vs. digital cost",
    civTested: "tested",
    civAwaitingTesting: "All awaiting empirical testing",
    modelDerived: "Model-derived values from BioCap integral, not directly measured.",
    modelDerivedLink: "mathematical specification",
    scoreExplain: "\"Consistent\" means the observation matches the prediction's direction. It does not mean the prediction has been formally tested. See the 14 testable predictions below — none has been empirically tested yet.",
    sPronatalistTitle: "Pronatalist Policy Failure",
    sPronatalistBody1: "No advanced economy has raised fertility to replacement level in modern history and sustained it there (AEI 2026).",
    sPronatalistBody2: "South Korea: $270 billion since 2005. TFR fell from 1.19 to 0.72 (-40% in 10 years). Singapore: S$2.5 billion/year. TFR fell from 1.82 (1980) to 0.87 (2025). Hungary: 5% of GDP on family subsidies. TFR fell to 1.39 (2024), lowest in a decade.",
    sPronatalistBody3: "Policy addresses j(motivation). It cannot address f(sperm), g(oocyte), or h(timing) — which are biological. When each factor has declined 30%, total fecundability is 0.7⁴ = 0.24. Restoring motivation to 100% yields 0.7³ = 0.34 — not 1.0. The biological components are inaccessible to monetary incentives.",
    sCcbTitle: "Calcium Channel Blocker Evidence",
    sCcbBody: "Brain-penetrant CCBs are associated with ~12% lower risk of psychiatric and neurodegenerative outcomes (Molecular Psychiatry 2022, propensity-matched cohorts up to 322,814). A Finnish nationwide cohort of 60,000+ schizophrenia patients found dihydropyridine use associated with reduced psychiatric rehospitalization (Cells 2025). CCBs showed lower incidence of psychotic, affective, and anxiety disorders than beta-blockers (risk ratios 0.69–0.99; Journal of Hypertension, June 2025 meta-analysis of RCTs). These are cardiovascular patients receiving Ca²⁺ channel blockade for blood pressure — and getting neuropsychiatric protection as a side effect. This is the inverse of the BERM prediction: if Ca²⁺ overload produces psychiatric symptoms, Ca²⁺ blockade should alleviate them. It does.",
    sMagnesiumTitle: "Magnesium: The Missing Buffer",
    sMagnesiumBody: "2.4 billion people (~31% of global population) fail to meet recommended magnesium intake ([[ref:magnesium_ca2_antagonist_2025|IJVNR 2025 systematic review]]). Magnesium functions as an endogenous calcium channel antagonist; deficiency results in elevated intracellular Ca²⁺ concentrations (PMC12616636). Magnesium has a regulatory role in testosterone biosynthesis (PMC12251677). The modern diet (processed food, depleted soil) has reduced magnesium intake at the same time that EMF exposure has increased Ca²⁺ load. These compound: less buffer + more disruptor = faster Ca²⁺ homeostasis degradation.",
    animalsFellHierarchy: "The sensitivity hierarchy follows from the mechanism:",
    animalsFellItems: [
      { species: "Amphibians", detail: "Moist skin = direct ionic coupling, thin eggs, aquatic larvae", evidence: "Global decline began ~1987 (GSM rollout)" },
      { species: "Insects", detail: "CRY-dependent navigation, small body mass, short generations", evidence: "Biomass −75% over 27 years (Krefeld)" },
      { species: "Birds", detail: "CRY compass, migratory species most affected", evidence: "−29% in North America since 1970 ([[ref:rosenberg2019|Rosenberg 2019]])" },
      { species: "Mammals", detail: "Dry skin, large mass, long lifespan — cumulative", evidence: "Human biomarker decline 1990s+" },
    ],
    animalsFellConclusion: "This is not a list of separate crises. It is one mechanism (Ca²⁺/CRY disruption) propagating through species at rates determined by biological sensitivity. The canary is not a metaphor. It is a measurement.",
  },
  fi: {
    title: "Patopolis",
    subtitle: "Miten kaupunki rappeuttaa sivilisaation biologiset perusteet",
    heroLead: "Kaupunki ei ole pelkästään sosiaalinen ympäristö — se on sähkömagneettinen ympäristö. Jokainen betoniseinä heijastaa, jokainen johto hurisee, jokainen laite sykkii. Tämä sivu jäljittää, mitä tuo ympäristö tekee keholle, perheelle, instituutioille ja sivilisaatiolle.",
    civilizationLink: "Takaisin Sivilisaatioon",
    patokratiaLink: "Patokratia",
    patokinesisLink: "Patokinesis",
    mechanismNote: "Juurimekanismi — miten EMF häiritsee kalsiumkanavia ja tuottaa sukupuolispesifiset hormonaaliset kaskaadit — kuvataan Pathopege-sivulla.",
    s5title: "Yhdistelmävaikutukset",
    s5lead:
      "Yksilötason hormonaaliset muutokset muuttuvat sivilisatorisiksi, kun ne vaikuttavat jokaisen inhimillisen dyadin molempiin osapuoliin samanaikaisesti. Paristeen muodostuminen vaatii miehen, joka lähestyy, ja naisen, joka luottaa. Lisääntyminen vaatii toimivat siittiöt ja toimivat munasolut. Lasten kasvattaminen vaatii isän panostuksen ja äidin kiintymyksen. Kun EMF häiritsee molempia puolia samanaikaisesti, tulos ei ole summautuva — se on kertautuva.",

    s5aTitle: "Parinmuodostuksen bifurkaatio",
    s5aMaleDeficit:
      "Lähestymismotivaatio ↓ (T↓ → [[ref:goetz2024|Goetz 2024]])",
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
      "Japani: 43 % 18–34-vuotiaista miehistä neitsyitä (2015)",
      "Etelä-Korea: syntyvyys 0,72 (2024)",
    ],

    s5bTitle: "Multiplikatiivinen hedelmällisyysromahdus",
    s5bFormula:
      "Hedelmällisyys = f(siittiöt) × g(munasolu) × h(ajoitus) × j(motivaatio)",
    s5bFactors: [
      "f(siittiöt): −62 % pitoisuus ([[ref:levine2023_sperm|Levine 2023]])",
      "g(munasolu): AMH laskee, PCOS kasvaa, reservi ehtyy aiemmin",
      "h(ajoitus): Vuorokausirytmihäiriö → ovulaation ajoitusvirheet",
      "j(motivaatio): T↓ (miehet) × OT↓ (naiset) → vähemmän yrityksiä",
    ],
    s5bCompound:
      "Jos jokainen tekijä laskee 30 %, kokonaishedelmällisyys laskee 76 % (0,7⁴ = 0,24). Tämä selittää, miksi kokonaishedelmällisyysluku laskee nopeammin kuin mikään yksittäinen tekijä ennustaisi — ja miksi pronatalistiset politiikat epäonnistuvat. Politiikka osoittaa j(motivaatio)-tekijään rahalla. Se ei voi osoittaa f-, g- tai h-tekijöitä — jotka ovat biologisia.",

    s5cTitle: "Lapsen kehityskaskadi",
    s5cBurdens: [
      {
        title: "Isän epigeneettinen kuorma",
        detail:
          "Isän EMF-vaurioituneen siittiön metyloomi → muuttunut geeniekspressio jälkeläisissä. Siittiöiden DNA-fragmentaatio → kehitysepävakaus.",
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
      "Jokainen sukupolvi aloittaa heikommalta lähtötasolta kuin edellinen. CaMKII-välitteinen sensitisaatio tarkoittaa, että jokainen sukupolvi on myös herkempi samalle EMF-annokselle. Tämä tuottaa kiihtyvän kierteen.",

    s5dTitle: "Institutionaalinen rapautuminen",
    s5dLead:
      "Instituutiot vaativat kahta komplementaarista panosta:",
    s5dBuilding:
      "Rakentaminen (historiallisesti T-korreloitu): innovaatio, riskinotto, kilpailuvietti, resurssien hankinta, hierarkkinen organisointi, pitkän tähtäimen suunnittelu epävarmuudessa.",
    s5dMaintaining:
      "Ylläpito (historiallisesti OT-korreloitu): luottamus, yhteistyö, empatia, konfliktin ratkaisu, hoiva, sosiaalisten normien valvonta, sisäryhmäkoheesio.",
    s5dConclusion:
      "Instituutio, jota ei rakenneta eikä ylläpidetä, ei romahda dramaattisesti — se rapautuu. Palvelut heikkenevät. Luottamus murenee. Pätevyys vähenee. Standardit laskevat. Tämä ei näy kriisinä — se näkyy hitaana laadun menetyksenä kaikessa samanaikaisesti.",

    s5eTitle: "Kiihtyvä kierre",
    generations: [
      {
        label: "Sukupolvi 1 (syntyneet ~1940–1960)",
        emf: "Matala (ennen massasähköistymistä)",
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
        tLevel: "−30–40 % ([[ref:santi2025|Santi 2025]])",
        otLevel: "Merkittävästi häiriintynyt",
        tfr: "1,2–1,7",
        institutional:
          "Rapautumisvaihe: luottamusromahdus, institutionaalinen disfunktio, yksinäisyysepidemia",
      },
      {
        label: "Sukupolvi 4 (syntyneet ~2010–2035)",
        emf: "Erittäin korkea (5G, IoT, prenataali altistus)",
        tLevel: "−40–55 % (ennakoitu + epigeneettinen kuorma)",
        otLevel: "Tuntematon — ensimmäinen sukupolvi täydellä prenataalilla altistuksella",
        tfr: "0,7–1,3 (ennakoitu)",
        institutional:
          "Kriisivaihe: instituutiot eivät voi rekrytoida tai pitää pätevää henkilöstöä, IVF muuttuu demografiseksi infrastruktuuriksi",
      },
    ],
    generationInsight:
      "Jokainen sukupolvi on herkempi samalle EMF-annokselle (CaMKII-sensitisaatio) ja aloittaa heikommalta hormonaaliselta lähtötasolta (epigeneettinen transmissio). Kierre kiihtyy ilman EMF:n kasvua — mutta EMF kasvaa (5G, IoT, LED IF -emissiot).",

    s6title: "Kaksitoista ennustetta, kaksitoista havaintoa",
    s6lead:
      "BERM ennustaa tarkkoja käyttäytymis- ja yhteiskuntamuutoksia hormonaalimallinsa pohjalta. Jokainen ennuste perustuu RCT-näyttöön hormonilinkistä; jokainen havainto viittaa väestötason dataan, joka on yhdenmukainen ennusteen kanssa.",
    predictions: [
      {
        prediction: "Miesten statushakuisuus vähenee",
        basis: "T → statusmotivaatio ([[ref:dreher2016|Dreher 2016]], n=121)",
        observed:
          "Yrittäjyysaste laskee, ‘quiet quitting’, vähentynyt uratavoitteisuus kyselyissä",
        consistent: true,
      },
      {
        prediction: "Miesten riskinotto vähenee",
        basis: "T → kilpailullinen riski (Competition 2024, n=220)",
        observed:
          "Yritysten perustaminen laskee, vähemmän fyysisiä riskiaktiviteetteja, kasvanut riskinkaihtaminen",
        consistent: true,
      },
      {
        prediction: "Miesten seksuaalinen lähestyminen vähenee",
        basis: "T → seksuaalinen motivaatio ([[ref:goetz2024|Goetz 2024]], n=139)",
        observed:
          "Seksittömyys kasvaa, parisuhteen aloittaminen vähenee, Japani 43 % neitsyitä 18–34",
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
        basis: "T → reaktiivinen aggressio ([[ref:carre2017_exogenous_t_aggression|Carré 2017]], n=308)",
        observed:
          "Väkivaltarikollisuus laskee, konfrontaatiovalmius vähenee, konfliktien välttely",
        consistent: true,
      },
      {
        prediction: "Miesten kognitiivinen tyyli siirtyy harkinnaan",
        basis: "T → vaistonvaraisuus harkinnan yli (Nave 2018, n=243)",
        observed:
          "Päätösparalyysi lisääntyy, analyysihalvaus, spontaani toiminta vähenee",
        consistent: true,
      },
      {
        prediction: "Miesten motivaatio/palkkioherkkyys vähenee",
        basis: "T↓ → DA↓ → anhedonia ([[ref:soares_cunha2016_d2_motivation|Soares-Cunha 2016]])",
        observed:
          "Masennus kasvaa, ‘failure to launch’, NEET-osuus kasvaa, pelaaminen/suoratoisto palkkiosubstituuttina",
        consistent: true,
      },
      {
        prediction: "Naisten ahdistuksen/masennuksen sukupuolikuilu levenee",
        basis:
          "Estrogeeni vahvistaa HPA-reaktiivisuutta. EMF → kortisoli↑ osuu naisiin kovemmin.",
        observed:
          "Naiset 2× ahdistus, 2× masennus. Kuilu levenee 2010 jälkeen. Teinityttöjen mielenterveyskriisi ~2012 lähtien.",
        consistent: true,
      },
      {
        prediction: "Institutionaalinen luottamus laskee maailmanlaajuisesti",
        basis:
          "OT → luottamus ([[ref:kosfeld2005|Kosfeld 2005, Nature]]). EMF → vagaalitonus ↓ → OT ↓.",
        observed:
          "Edelman 2025: luottamus kaikissa instituutioissa historiallisen matalalla. Yksinäisyysepidemia julistettu.",
        consistent: true,
      },
      {
        prediction: "PCOS-esiintyvyys kasvaa EMF-adoption myötä",
        basis:
          "PCOS = 4 elimen VGCC-yhdentyminen (haima + munasarja + aivolisake + lisämunuainen).",
        observed:
          "PCOS 5–20 % ja kasvussa. Naisten hedelmättömyyden yleisin syy. Korreloi metabolisen oireyhtymän kanssa.",
        consistent: true,
      },
      {
        prediction: "Jokainen sukupolvi herkempi kuin edellinen",
        basis:
          "CaMKII → Cav3.2-kynnys ↓ (PMC9913649). Epigeneettinen transmissio (siittiömetyloomi).",
        observed:
          "Mielenterveyskriisi alkaa aiemmin jokaisessa kohortissa. ASD/ADHD-esiintyvyys kasvaa sukupolvittain. Puberteetti alkaa aiemmin tytöillä.",
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
      "Yleisövaikutus-RCT (2020) osoitti, että matala testosteroni lisää strategista prososiaalisuutta — sen sanomista mitä yleisö odottaa, ei sitä mitä uskoo. Provokaatio-RCT ([[ref:carre2017_exogenous_t_aggression|Carré 2017]]) osoitti, että matala testosteroni vähentää reaktiivista vastetta epäoikeudenmukaisuuteen. Yhdessä nämä ennustavat spesifin kuvion: ihmiset ovat konformistisia fyysisessä läsnäolossa mutta konfrontatiivisia ruutujen takaa.",
    spolarObserved:
      "Juuri tätä havaitaan. Verkossa polarisaatio on historiallisen korkealla. Fyysinen konfrontaatio on historiallisen matalalla. Ihmiset ilmaisevat anonyymisti näkemyksiä, joita he eivät koskaan sanoisi kasvotusten.",
    spolarExplain:
      "Tämä ei ole tekopyhyyttä. Se on biologiaa. Matala testosteroni nostaa autenttisen konfrontaation kynnystä. Digitaaliset ympäristöt laskevat konfrontaation sosiaalisen kustannuksen lähelle nollaa. Biologisen kynnyksen ja ympäristökustannuksen epäsuhta tuottaa kuvion: rohkea verkossa, hiljainen kasvotusten.",
    spolarPrediction:
      "BERM-ennuste: väestöissä, joilla on korkeampi keskimääräinen T (esim. matala-EMF-yhteisöt), verkko- ja kasvokkais-käyttäytymisen välinen ero pitäisi olla pienempi.",
    spolarPhysical: "Fyysinen ympäristö",
    spolarPhysicalThreshold: "Korkea (kasvokkain sosiaalinen kustannus)",
    spolarPhysicalBehavior: "Konformismi, itsesensuri, myöntyminen",
    spolarPhysicalRct: "Audience 2020: matala T → strateginen prososiaalisuus",
    spolarDigital: "Digitaalinen ympäristö",
    spolarDigitalThreshold: "Lähellä nollaa (anonymiteetti, etäisyys)",
    spolarDigitalBehavior: "Raivo, polarisaatio, konfrontaatio",
    spolarDigitalRct: "[[ref:carre2017_exogenous_t_aggression|Carré 2017]]: provokaatiovaste säilyy, kun kustannus on matala",

    ssafetyTitle: "Turvallisuushakuisuus: hormonaalinen kynnys, ei arvovalinta",
    ssafetyBody:
      "Riskinotto vähenee testosteronin myötä (Competition RCT 2024, n=333). Ahdistus kasvaa kortisolin myötä ([[ref:dual_hormone_meta2021|kaksoishormonimeta, n=8 538]]). Uhkaherkkyys kasvaa, kun molemmat muuttuvat samanaikaisesti. Väestötasolla tämä tuottaa yhteiskunnan, joka kokee enemmän tilanteita uhkaavina — ei siksi että ympäristö olisi vaarallisempi (väkivaltarikollisuus on historiallisen matalalla) vaan koska biologinen kynnys uhkan havaitsemiselle on laskenut.",
    ssafetyParadox:
      "Tämä selittää muuten paradoksaalisen kuvion: ihmiskunnan historian turvallisimmat yhteiskunnat raportoivat korkeinta ahdistusta. Objektiivinen vaara on laskenut. Subjektiivinen uhka on noussut. Näiden välinen ero on hormonaalinen muutos.",
    ssafetyCreep:
      "Kun uhkahavainnointi kasvaa ilman todellisen uhkan kasvua, tuloksena on se mitä psykologit kutsuvat \"concept creepiksi\": haittaan liittyvien käsitteiden laajeneminen kattamaan aiemmin neutraaleja ilmiöitä. Sanat muuttuvat väkivallaksi. Erimielisyys muuttuu aggressioksi. Epämukavuus muuttuu traumaksi. Tämä ei ole moraalista edistystä eikä moraalista rappeutumista. Se on uudelleenkalibroitu uhkantunnistusjärjestelmä, joka toimii eri hormonaalisella substraatilla.",

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
      "Mikään näistä ei vaadi kenenkään muuttavan uskomuksiaan. Ne vaativat sähkömagneettisen ympäristön muuttamista ja hormoneja säätelevien biologisten järjestelmien tukemista. Jos edes 20–30 % nykyisestä motivaation, luottamuksen ja sosiaalisen koheesion kriisistä on biologista eikä ideologista, se on 20–30 %, joka voidaan osoittaa ilman poliittista konfliktia. Tämä on BERM-mallin käytännöllisesti tärkein seuraus: ei se, että sivilisaatio on tuomittu, vaan se, että osa sen rapautumisesta johtuu nimenomaisesta, tunnistettavasta ja mahdollisesti palautettavissa olevasta syystä.",

    shistoryTitle: "Historian tulkinta hormonaalisen linssin läpi",
    shistoryBody:
      "Jokainen sukupolvi kokee saman objektiivisen maailman eri hormonaalisen substraatin läpi. Mies vuonna 1960 testosteronilla 600 ng/dL, normaalilla kortisolilla ja ehjällä dopaminergisellä signaloinnilla kokee uravastoinkäymisen haasteena, joka voitetaan. Mies vuonna 2024 testosteronilla 350 ng/dL, kohonneella kortisolilla ja vähentyneellä dopaminergisellä tonuksella kokee saman vastoinkäymisen uhkana, jota vältetään. Heidän arvonsa voivat olla identtiset. Heidän biologinen kykynsä toimia noiden arvojen mukaisesti ei ole.",
    shistoryOlder:
      "Kun vanhemmat sukupolvet sanovat \"me vain tehtiin se\", he eivät kuvaile ylivertaista luonnetta. He kuvailevat eri hormonaalista ympäristöä, jossa toiminnan kynnys oli matalampi ja välttelyn kynnys korkeampi.",
    shistoryYounger:
      "Kun nuoremmat sukupolvet sanovat \"maailma on stressaavampi\", he eivät kuvaile vaarallisempaa maailmaa (se on objektiivisesti turvallisempi). He kuvailevat samaa maailmaa koettuna hormonaalisen substraatin läpi, joka havaitsee enemmän uhkaa ja tuottaa vähemmän motivaatiota kohdata sitä.",
    shistoryConclusion:
      "Kumpikaan sukupolvi ei ole väärässä. He kuvailevat samaa todellisuutta eri biologisten suodattimien läpi. Tuloksena oleva sukupolvien välinen konflikti — \"laiskaat nuoret\" vs \"todellisuudesta vieraantuneet boomerit\" — on itsessään hormonaalisen muutoksen seuraus, ei todiste kummankaan osapuolen moraalisesta epäonnistumisesta.",

    sideologyTitle: "Ideologia alavirrassa",
    sideologyBody:
      "Sama idea — \"turvallisuus on tärkeää\" — tuottaa eri poliittisia tuloksia riippuen sen väestön hormonaalisesta substraatista, joka sitä kannattaa.",
    sideologyHigh:
      "T=500 ng/dL, kortisoli=normaali: \"Turvallisuus on tärkeää\" → rakenna turvallinen infrastruktuuri, valvo lakeja, kohtaa uhkat suoraan.",
    sideologyLow:
      "T=320 ng/dL, kortisoli=koholla: \"Turvallisuus on tärkeää\" → poista kaikki riski, laajenna haitan määritelmää, vältä konfrontaatiota poistamalla konfrontaation aiheuttava ärsyke.",
    sideologyExplain:
      "Idea ei ole muuttunut. Biologinen kyky toteuttaa sitä on. Tämä ei ole vasemmisto vs oikeisto. Se ei ole etenevä vs konservatiivinen. Se on biologinen muutos toteutuskynnyksessä samoille arvoille, jotka molemmat puolet suurelta osin jakavat. Molemmat puolet haluavat turvallisuutta. Molemmat puolet haluavat oikeudenmukaisuutta. Molemmat puolet haluavat mahdollisuuksia. Erimielisyys koskee sitä miten — ja \"miten\" on moderoitu hormonaalisilla kynnyksillä.",
    sideologyTestable:
      "Tämä on testattavissa. Jos poliittiset asenteet turvallisuuteen, riskiin ja auktoriteettiin korreloivat yksilön hormoniprofiilien (T, kortisoli, OT) kanssa demografisten tekijöiden ja ilmoitetun ideologian vakioinnin jälkeen, biologisen moderoinnin hypoteesi saa tukea. Useat tutkimukset ovat löytäneet juuri tämän: testosteroni korreloi poliittisten asenteiden kanssa auktoriteettiin, kilpailuun ja tulonjakoon eri kulttuureissa.",

    s7title: "Rekursiivinen ennuste",
    s7body:
      "BERM tekee epätavallisen ennusteen: sen oma vastaanotto on todistetta sen teesistä. Jos testosteronilasku vähentää riskinottoa, kilpailuviettiä ja autenttista itseilmaisua väestötasolla, tiedeyhteisön — joka koostuu samojen hormonaalisten olosuhteiden alaisista ihmisistä — pitäisi osoittaa vähentynyt halukkuus haastaa konsensusta, tutkia kiistanalaisia suuntia ja puolustaa epäsuosittuja tuloksia. Malli ennustaa, että EMF-biovaikutustutkimus on alirahoitettua, stigmatisoitua ja institutionaalisesti torpattua — ei siksi että näyttö olisi heikkoa, vaan koska intellektuaalista riskinottoa ajava hormonaalinen substraatti vähenee. Tämä on testattavissa: EMF-biovaikutustutkimuksen rahoitusosuuden NIH/ERC-kokonaisrahoituksesta pitäisi laskea, ja alan tutkijoiden pitäisi raportoida kasvavia uraseuraamuksia positiivisten tulosten julkaisemisesta.",

    s8title: "Dopaminerginen mieli",
    s8body:
      "Barzilain dopaminergisen mielen hypoteesi ehdottaa, että dopamiiniohjatut kognitiiviset piirteet — uteliaisuus, luovuus, tutkiminen, riskinsietokyky, tulevaisuusorientaatio — olivat keskeisiä modernin ihmiskognition synnylle. BERM lisää mekanismin: jos EMF häiritsee VTA Cav1.3 → dopamiinivapautumista ja testosteronilasku edelleen vähentää DA-reseptoriekspressiota, väestötason dopamiinifunktion lasku edustaa kognitiivisen vallankumouksen osittaista kääntämistä. Tämä ei ole väite älykkyydestä (ÄO voi pysyä vakaana tai jopa nousta Flynn-efekteillä). Se on väite kognitiivisesta tyylistä: siirtymä tutkimisesta hyödyntämiseen, riskinotosta riskinkaihtamiseen, innovaatiosta optimointiin. Yhteiskunta, jonka dopamiinifunktio heikkenee, ei lopeta ajattelemista — se lopettaa intellektuaalisten riskien ottamisen.",

    s8bTitle: "Kyberneettiset takaisinkytkentäsilmukat",
    s8bLead:
      "Sivilisaatiotason vaikutukset eivät ole yksisuuntaisia. Käyttäytymismuutokset vaikuttavat altistumismalleihin luoden itseään vahvistavia silmukoita, jotka kiihdyttävät prosessia.",
    s8bPositiveTitle: "Positiiviset (vahvistavat) silmukat",
    s8bPositiveLoops: [
      "Älypuhelimen käyttö ↑ → melatoniini ↓ → unenlaatu ↓ → päiväväsymys ↑ → lisää älypuhelimen käyttöä (dopaminerginen kompensointi)",
      "Testosteroni ↓ → riskinkaihtaminen ↑ → sisätiloissa olo ↑ → EMF-altistus ↑ → edelleen testosteroni ↓",
      "Sosiaalinen ahdistus ↑ → digitaalisen viestinnän suosiminen ↑ → ruutuaika ↑ → oksitosiini ↓ → lisää sosiaalista ahdistusta",
    ],
    s8bNegativeTitle: "Negatiiviset (vakauttavat) silmukat",
    s8bNegativeLoops: [
      "Väsymys ↑ → fyysinen passiivisuus ↑ → vähemmän ulkona → vähemmän UV:tä → vähemmän D-vitamiinia → heikompi Ca²⁺-puskurointi → suurempi EMF-herkkyys",
      "Unihäiriöt ↑ → kofeiinin käyttö ↑ → adenosiinireseptorien adaptaatio → osittainen neuroprotektio (A₁ → VGCC-modulaatio)",
    ],
    s8bImplication:
      "Positiiviset silmukat dominoivat. Jokainen sukupolvi aloittaa matalammalta hormonaaliselta lähtötasolta ja korkeammassa EMF-ympäristössä kuin edellinen. Vakauttavat silmukat (kofeiini, liikunta) vaativat tietoista ponnistusta — vahvistavat silmukat toimivat automaattisesti. Tämä epäsymmetria on mekanismi, jolla pieni alkuperäinen häiriö tuottaa suuria sivilisaatiovaikutuksia vuosikymmenten kuluessa.",

    s8cTitle: "Aikapreferenssi ja hedelmällisyyspäätökset",
    s8cLead:
      "Hyperbolinen diskonttaus — taipumus vahvasti suosia välittömiä palkintoja tulevien sijaan — perustuu hormonaaliseen substraattiin. Kun tuo substraatti muuttuu, aikapreferenssit siirtyvät ja hedelmällisyyspäätökset seuraavat.",
    s8cMechanism:
      "Testosteroni vaikuttaa aikadiskonttaukseen kahdella reitillä: (1) suoraan androgeenireseptorien tiheyden kautta prefrontaalisessa kuorikerroksessa, joka säätelee tulevaisuusorientoitunutta päätöksentekoa; ja (2) epäsuorasti dopamiinin kautta — testosteroni säätelee D2-reseptoriekspressiota striatumissa, ja dopamiini välittää viivästettyjen palkintojen arvottamista. Kun molemmat laskevat samanaikaisesti, nykyhetki painaa enemmän ja tulevaisuus kevyemmin.",
    s8cFertility:
      "Hedelmällisyys on äärimmäinen tulevaisuusorientoitunut päätös: korkea kustannus nyt, epävarma palkinto vuosien päästä. Väestötason siirtymä nykyhetkiorientaatioon ennustaa hedelmällisyyden lykkäämistä — ei siksi että lapsia pidettäisiin ei-toivottavina, vaan koska hormonaalinen kynnys sitoutua korkean kustannuksen, pitkän horisontin projektiin nousee. Tämä eroaa taloudellisista selityksistä: se ennustaa hedelmällisyyden laskevan myös taloudellisten olosuhteiden parantuessa, ja laskun korreloivan hormonaalisten merkkiaineiden kanssa tulojen ja koulutuksen vakioinnin jälkeen.",
    s8cTestable:
      "Testattavissa: yksilölliset diskonttausasteet (mitattuna viivästetyn palkinnon testeillä) korreloivat testosteroni- ja dopamiinimerkkiaineiden kanssa ja ennustavat hedelmällisyyden ajoitusta ilmoitetun hedelmällisyysaikomuksen, tulojen ja koulutuksen vakioinnin jälkeen.",

    sIQSTitle: "IQ Shredder",
    sIQSSubtitle: "Biologinen diagnoosi",
    sIQSLead:
      'Vuonna 2013 bloggaaja Spandrell kuvasi Singaporea "IQ-silppuriksi" — korkean suorituskyvyn kaupunkivaltioksi, joka valikoi lahjakkaita ihmisiä, louhii heistä maksimaalisen taloudellisen tuottavuuden ja sitten osittain steriloi heidät alle uusiutumistason hedelmällisyyden kautta. Nick Land (2014) formalisoi käsitteen: ensimmäisen asteen eugeniikka (geneettisesti lahjakkaiden keskittäminen) tuottaa toisen asteen dysgeniikkaa (noiden geenien tuhoaminen lisääntymisen epäonnistumisen kautta). Maapallon taloudellisesti optimoiduimmat ympäristöt ovat samanaikaisesti biologisesti tuhoisimmat.',
    sIQSBiological:
      "Land ja Spandrell kuvaavat mekanismin kulttuurisesti: rottakilpailu, uraputki, taloudellinen kannustin lykätä tai jättää hankkimatta lapsia. BERM tarjoaa puuttuvan biologisen substraatin. Korkean suorituskyvyn kaupunkien hedelmällisyysromahdus ei ole ensisijaisesti ekonominen rationaalinen valinta — se on endokriininen suppressio maapallon sähkömagneettisesti tiheimmissä ympäristöissä. Sama infrastruktuuri, joka mahdollistaa taloudellisen keskittymisen (tiiviit toimistorakennukset, kaikkialla oleva WiFi, jatkuva laitteenkäyttö), maksimoi myös altistuksen lisääntymisbiologiaa rapauttavalle EMF:lle.",
    sIQSNotChoice:
      "Singaporen hedelmällisyysluku 0,78 ei tarkoita, että singaporelaiset valitsevat olla hankkimatta lapsia. Se on endokriininen tuotos ympäristöstä, jossa testosteroni on laskenut ~40%, oksitosiini ~46% ja dopamiinitonaalinen toiminta on kroonisesti heikentynyt. Ihmiset, jotka muuttavat Singaporeen taloudellisen mahdollisuuden perässä, eivät tee ymmärtämäänsä vaihtokauppaa — he astuvat sähkömagneettiseen ympäristöön, joka systemaattisesti suppressoi heidän lisääntymiskapasiteettiaan mekanismeilla, joita he eivät voi havaita.",
    sIQSComponents: "Viisi mitattavaa biologista komponenttia",
    sIQSComponentsDesc:
      "IQ-silppuri ei ole yksittäinen prosessi vaan viisi toisiinsa kytkeytyvää biologista mekanismia. Jokainen on itsenäisesti mitattavissa biomarkkeridatasta, ja yhdessä ne muodostavat itsevahvistuvan järjestelmän, joka muuntaa geneettistä pääomaa taloudelliseksi tuotokseksi samalla tuhoten lisääntymiskapasiteettia.",
    sIQSRepro: "Lisääntymisen suppressio",
    sIQSReproDesc:
      "Neljän biologisen polun on kaikkien toimittava väestötasoiseen lisääntymiseen: miehen lisääntymisvietti (testosteroni tuottaa seksuaalisen aloitekyvyn ja parinetsintäkäyttäytymisen), naisen sitoutumiskapasiteetti (oksitosiini mahdollistaa kiintymyksen ja luottamuksen muodostumisen), parisuhteen vakaus (multiplikatiivinen OXT×T-interaktio, joka tuottaa monogaamisen sitoutumisen) ja vanhemmaksi investoimisen motivaatio (neurologinen kapasiteetti ylläpitää 20 vuoden investointia jälkeläisiin). Kaupunkitoimistoympäristössä kaikki neljä ovat samanaikaisesti heikentyneet.",
    sIQSDA: "Dopaminerginen kaappaus",
    sIQSDADesc:
      'Matala dopamiini tarkoittaa, että luonnolliset palkinnot — ihmissuhteet, vanhemmuus, yhteisöosallistuminen, hiljaiset illat — tuntuvat riittämättömiltä. Aivot etsivät voimakkaampaa stimulaatiota: ruudut, työ, uutuudenviehätys, kuluttaminen. Jokainen näistä lisää EMF-altistusta, joka edelleen suppressoi dopamiinia, joka ajaa lisää etsimistä. Tämä on biologinen mekanismi Landin taloudellisesti kuvaaman "rottakilpailun" taustalla. Uraputki ei ole kulttuurinen valinta — se on dopaminerginen loukku. Ihmiset tekevät kovemmin töitä pienevästä subjektiivisesta palkinnosta, eivät siksi että he rationaalisesti preferoisivat uraa perheen sijaan, vaan koska neurologinen koneisto, joka tekee perheestä palkitsevan, on rapaututunut.',
    sIQSTime: "Aikapreferenssin siirtymä",
    sIQSTimeDesc:
      "Lapset ovat yli 20 vuoden investointi epävarmalla tulevaisuuden tuotolla. Tämän investoinnin tekeminen vaatii neurologista kapasiteettia arvostaa kaukaisia tulevaisuuden palkintoja välittömien kustannusten edellä. Dopamiini säätelee viivästetyn palkinnon arvotusta ([[ref:mcclure2004_delayed_reward|McClure 2004]]); BDNF tukee abstraktia tulevaisuusmallintamista. Kun molemmat laskevat, temporaalinen diskonttaus jyrkkenee — nykyhetki painaa enemmän, tulevaisuus kevyemmin. Tämä ei ole filosofinen siirtymä individualismiin. Se on neurologinen pitkän horisontin investointien devalvaatio.",
    sIQSBurn: "Geneettinen palamisnopeus",
    sIQSBurnDesc:
      "Pelkkä hedelmällisyysluku aliarvioi biologisen kustannuksen. Myös syntyvät lapset kantavat epigeneettistä vahinkoa — CaMKII-välitteisiä metylaatiomuutoksia, jotka muuttavat geeniekspressiota seuraavassa sukupolvessa. BDNF:n lasku (28% gradientin yli) heijastaa neurokehityksellistä vaikutusta; melatoniinin lasku heijastaa häiriintynyttä kehityksellistä ajoitusta. Silppuri ei pelkästään estä syntymisiä — se heikentää syntymien biologista laatua.",
    sIQSEff: "Shredderin tehokkuus",
    sIQSEffDesc:
      "Ydinmetriikka: dopaminergisen kaappauksen (miten tehokkaasti ympäristö louhii tuottavuutta) ja lisääntymissuppression (miten perusteellisesti se tuhoaa lisääntymiskapasiteettia) geometrinen keskiarvo. Molempien on oltava läsnä — kaappaus ilman suppressiota on pelkkä korkea tuottavuus, suppressio ilman kaappausta on pelkkä köyhyys. IQ-silppuri on nimenomaan ympäristö, joka saavuttaa molemmat samanaikaisesti.",
    sIQSTable: "IQ Shredder -gradientti",
    sIQSTableDesc:
      "Jokainen metriikka voimistuu monotonisesti amish-perusviivasta kaupunkitoimistoympäristöön. Shredderin tehokkuus -sarake — ydinmetriikka — osoittaa 10-kertaisen kasvun gradientin yli.",
    sIQSEnv: "Ympäristö",
    sIQSReproCol: "Lisäänt. suppressio",
    sIQSDACol: "DA-kaappaus",
    sIQSTimeCol: "Aikapref. siirtymä",
    sIQSBurnCol: "Geneettinen palo",
    sIQSEffCol: "Shredderin tehokkuus",
    sIQSBiocapCol: "BioCap",
    sIQSMeta: "Meta-ironia",
    sIQSMetaDesc:
      "Landin ehdottama ratkaisu — kiihdyttää biologisen pullonkaulan ohi muuntamalla ihmislaji auto-intelligenttiseksi robotisoituneeksi pääomaksi ennen prosessin romahtamista — on itsessään dopaminergisen loukun oire metataso. Se ehdottaa biologisen ratkaisun korvaamista teknologisella kiertotiellä, koska biologinen substraatti biologisten ratkaisujen arvostamiseen on jo tuhoutunut. Väestö ei kykene arvostamaan omaa lisääntymistään, koska neurologinen koneisto pitkäjänteisen biologisen investoinnin arvostamiseen on rapaututunut saman ympäristön toimesta, joka tekee teknologisesta vaihtoehdosta houkuttelevan. IQ-silppuri ei pelkästään tuhoa geenejä. Se tuhoaa kyvyn tunnistaa, että geenejä tuhotaan.",
    sIQSPredictions: "Ennusteet",
    sIQSPred1:
      "Singaporen hedelmällisyyden lasku korreloi EMF-infrastruktuurin tiheyden, ei pelkän taloudellisen kehityksen kanssa — BKT:tä henkeä kohti vakioiden EMF-tiiviit kaupunkivaltiot osoittavat matalamman TFR:n kuin ekonomisesti vertailukelpoiset mutta vähemmän EMF-tiiviit maat.",
    sIQSPred2:
      "Shredderin nopeus on ennustettavissa BioCap-mallista: kaupungit, joissa BioCap on matalampi (korkeampi EMF-tiheys), saavuttavat demografisen kriisin aiemmin riippumatta pronatalisen politiikan rahoituksesta.",
    sIQSPred3:
      "Epigeneettinen transmissio tarkoittaa, että silppuri vahingoittaa myös syntyviä lapsia — toisen sukupolven kaupunkilaiset osoittavat matalampaa hedelmällisyyttä kuin ensimmäisen sukupolven maahanmuuttajat samalla ekonomisella tasolla, kulttuurisen assimilaation vakioinnin jälkeenkin.",
    sIQSLit: [
      "Spandrell (2013): Singapore IQ-silppurina — valikoiva maahanmuutto keskittää lahjakkuuden, kaupunkiympäristö suppressoi hedelmällisyyden 0,78:aan.",
      "Land (2014): ensimmäisen asteen eugeniikka tuottaa toisen asteen dysgeniikkaa. Taloudellisesti optimoiduimmat ympäristöt ovat biologisesti tuhoisimmat.",
      "[[ref:mcclure2004_delayed_reward|McClure ym. (2004, Science)]]: erilliset hermojärjestelmät välittömille vs. viivästyneille palkinnoille. Dopaminerginen keskiaivo välittää viivästetyn palkinnon arvotusta.",
      "[[ref:levine2023_v2|Levine ym. (2023)]]: siittiökonsentraatio laski 62% globaalisti 1973-2018. Lasku on jyrkempi kaupungistuneilla alueilla.",
      "Singapore Department of Statistics (2023): TFR 0,97 (2023), laskien 1,82:sta (1980). Pronatalistinen rahoitus ylittää 2 miljardia dollaria vuodessa minimaalisella vaikutuksella.",
    ],

    s9title: "Testattavat ennusteet",
    s9lead:
      "Jokainen ennuste määrittelee falsifikaatiokriteerin. Malli, jota ei voida falsifioida, ei ole tiedettä.",
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
        title: "CCB-käyttäjät osoittavat lievemmän käyttäytymislaskun",
        detail:
          "Pitkäaikaisten CCB-käyttäjien pitäisi osoittaa vähemmän laskua T-riippuvaisissa käyttäytymisissä (yrittäjyys, riskinotto) verrattuna ei-CCB-verenpainelääkkeiden käyttäjiin.",
        falsification:
          "Ei käyttäytymiseroa CCB- ja ei-CCB-verenpainelääkkeiden käyttäjien välillä",
      },
      {
        id: "CIV-4",
        title: "TFR korreloi EMF-tiheyden kanssa, ei pelkästään BKT:n",
        detail:
          "BKT:n, koulutuksen ja kaupungistumisen vakioinnin jälkeen EMF-infrastruktuuritiheyden pitäisi itsenäisesti ennustaa TFR-laskua maiden välillä.",
        falsification:
          "Ei jäännöskorrelaatiota EMF-tiheyden ja TFR:n välillä sosioekonomisen vakioinnin jälkeen",
      },
      {
        id: "CIV-5",
        title: "Käyttäytymisen vaimeneminen kääntyy EMF-vähennyksellä",
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
          "Teinityttöjen mielenterveyskriisi korreloi laitteiston, ei sisällön kanssa",
        detail:
          "BERM ennustaa EMF-laitteistokomponentin (kortisoli HPA:n kautta, melatoniini käpyrauhasen kautta) vaikuttavan enemmän kuin sosiaalisen median sisällön. Tytöt, jotka käyttävät älypuhelimia yhtä paljon mutta matala-EMF-ympäristöissä pitäisi osoittaa vähemmän ahdistuksen kasvua.",
        falsification:
          "Ei eroa ahdistuksessa korkea-EMF- ja matala-EMF-älypuhelinkäyttäjien välillä",
      },
      {
        id: "CIV-8",
        title:
          "Sukupolvien välinen hormonilasku kiihtyy ilman EMF:n kasvua",
        detail:
          "CaMKII-sensitisaatio + epigeneettinen transmissio ennustavat, että jopa vakio-EMF tuottaa kiihtyvän hormonilaskun sukupolvien yli. Testattavissa vertaamalla T-laskuvauhtia sukupolvikohorttien välillä samassa iässä.",
        falsification:
          "T-laskuvauhti on vakio sukupolvien välillä vastaavissa iäissä",
      },
      {
        id: "CIV-9",
        title:
          "Oksitosiiniriippuvaiset käyttäytymiset vähenevät EMF-ympäristön myötä",
        detail:
          "Vapaaehtoistyö, yhteisöllinen osallistuminen, hyväntekeväisyys, ihmistenvälinen luottamus — kaikki OT-riippuvaisia — pitäisi korreloida negatiivisesti EMF-ympäristön kanssa maiden välillä ja ajan yli.",
        falsification:
          "Ei korrelaatiota EMF-ympäristön ja OT-riippuvaisten sosiaalisten käyttäytymisten välillä",
      },
      {
        id: "CIV-10",
        title: "IVF muuttuu demografiseksi infrastruktuuriksi 2040 mennessä",
        detail:
          "Kun biologinen hedelmällisyyskyky laskee alle ~30 % pareista saavuttaa raskauden 12 kuukaudessa ilman apua, IVF siirtyy lääketieteellisestä interventiosta väestötason infrastruktuuriksi. Ennuste: Etelä-Korea 2030 mennessä, Japani 2035, suurin osa Eurooppaa 2040.",
        falsification:
          "Avustamattoman raskauden osuus pysyy yli 70 % vuoteen 2040 korkea-EMF-maissa",
      },
      {
        id: "CIV-11",
        title: "Verkko-kasvokkais-käyttäytymiskuilu korreloi väestön T-tason kanssa",
        detail:
          "Väestöt, joilla on korkeampi keskimääräinen T, osoittavat vähemmän eroa verkko- ja kasvokkais-käyttäytymisen välillä. Matala-EMF-yhteisöt osoittavat minimaalista eroa.",
        falsification:
          "Ei korrelaatiota väestön T:n ja verkko-kasvokkais-käyttäytymiseron välillä",
      },
      {
        id: "CIV-12",
        title: "Concept creep -vauhti korreloi kortisolitrendien kanssa maittain",
        detail:
          "Maat, joissa kortisoli kasvaa nopeammin (tai T laskee nopeammin) osoittavat nopeampaa haittakäsitteiden laajenemista oikeudellisessa, akateemisessa ja mediakielessä.",
        falsification:
          "Ei korrelaatiota hormonaalisten trendien ja concept creep -vauhdin välillä",
      },
      {
        id: "CIV-13",
        title: "Sukupolvien välinen jännite on heikoin matala-EMF-yhteisöissä",
        detail:
          "Amish- ja vastaavat yhteisöt, joilla on vakaat hormonaaliset lähtötasot sukupolvien yli, osoittavat vähemmän sukupolvien välistä konfliktia kuin korkea-EMF-yhteiskunnat.",
        falsification:
          "Matala-EMF-yhteisöt osoittavat verrattavaa sukupolvijännitettä kansallisiin keskiarvoihin",
      },
      {
        id: "CIV-14",
        title: "Poliittiset asenteet riskiin ja auktoriteettiin korreloivat yksilön T:n kanssa demografisen vakioinnin jälkeen",
        detail:
          "Väestön sisällä: korkeamman T:n yksilöt suosivat konfrontaatioperustaisia ratkaisuja; matalamman T:n yksilöt välttämisperustaisia — riippumatta ilmoitetusta ideologiasta.",
        falsification:
          "Ei jäännös-T-korrelaatiota politiikkapreferenssien kanssa demografisen vakioinnin jälkeen",
      },
    ],

    lostRecoveryTitle: "Menetetty palautumisikkuna",
    lostRecoveryDesc: "Ensimmäistä kertaa ihmiskunnan historiassa ei ole ajanjaksoa päivässä ilman merkittävää EMF-altistusta. Sähköverkko toimii 24/7. WiFi-reitittimiä ei koskaan sammuteta. LED-valot toimivat uneen asti. Puhelin makaa yöpöydällä koko yön. Bluetooth-laitteet ylläpitävät yhteyksiä jatkuvasti.",
    lostRecoveryMechanism: "CaMKII-defosforylaatio — molekulaarinen palautumisprosessi — vaatii aikaa ilman Ca²⁺-ylikuormaa. Ennen sähköistystä ihmisillä oli 22+ tuntia päivässä ilman keinotekoista EMF:ää. Modernit kaupunkilaiset: noin nolla. COVID-sulut osoittivat tämän kokeellisesti: 24 tuntia/vrk kotona WiFin + LEDien + useiden laitteiden kanssa poistavat viimeisen palautumisikkunan — ja T2D-kiihdytys hyppäsi 2,90 %:sta 3,52 %/v.",
    lostRecoveryIntervention: "Tämä on myös mallin toiminnallisin oivallus: EMF-vapaa makuuhuone on yksinkertaisin interventio. Ei ruokavaliomuutosta, ei lääkitystä, ei elämäntaparemonttia — vain poista reititin, käytä lentokonetilaa yöllä ja vaihda hehkulamppuun ennen unta.",

    buildingTitle: "Betonikaupungit: sisäänrakennettu EMF-vahvistus",
    buildingDesc: "Kaupungistuminen ei ole vain sosiaalinen muutos — se on sähkömagneettinen muutos. Teräsbetoni heijastaa RF:ää sisäisesti (teräsraudoitus toimii osittaisena käänteisena Faradayn häkkinä), lisäten sisäistä kenttävoimakkuutta. Puu on RF-läpäisevä — kenttä kulkee läpi ja hajoaa. Kun maaseudun väestöt muuttivat betonikaupunkeihin, he samanaikaisesti lisäsivät ympäröivää EMF-altistustaan mekanismilla jota kukaan ei mitannut.",
    buildingEvidence: "Puuhuoneet tuottavat parempaa unta, matalamman sykkeen ja paremman kognitiivisen suorituskyvyn verrattuna betonihuoneisiin ([[ref:wood_health2026|BIOBUILDS 2026]]). Perinteinen selitys: biofiilia. BERM:n lisäys: RF-heijastuskerroin. Molemmat voivat olla oikeassa — mutta EMF-mekanismi on testattavissa ja biofiiliamekanismi ei.",

    animalsFellTitle: "Eläimet kaatuivat ensin",
    animalsFellDesc: "Jos EMF vaikuttaa biologiaan perustavanlaatuisilla Ca²⁺- ja CRY-tasoilla, herkempien lajien olisi pitänyt laskea ensin — ja niin tapahtui. Sammakot (kostea iho, suora Ca²⁺-kytkentä) alkoivat laskea noin 1987 GSM:n käyttöönoton myötä. Mehiläiset (CRY-riippuvainen navigaatio) romahtivat 2006 tukiasemien saavuttaessa maaseudun. Hyönteisbiomassa laski 75 % 27 vuodessa. Lintupopulaatiot seurasivat. Nisäkkäät — mukaan lukien ihmiset — ovat vähiten herkkiä kuivan ihon ja suuren kehon massan vuoksi, mutta vaikutukset ovat kumulatiivisia pitkien elinikien aikana.",
    animalsFellAnalogy: "Kanarialintu kaivoksessa -analogia ei ole vertauskuvallinen — se on mekanistinen. Samat ionikanavat, samat magnetoreseptorit, sama Ca²⁺-signalointi. Eläimet eivät laskeneet erillisistä syistä jotka sattuvat korreloimaan. Ne laskivat saman mekanismin kautta eri herkkyyskynnyksissä.",

    civilizationNote: "Sivilisaationäkökulma — biologinen kantokyky, imperiumien eliniät, aurinkojaksojen ja aktivaatiomekanismi — käsitellään Patopoliteia-sivulla.",
    svgMaleLower: "mies",
    svgFemaleLower: "nainen",
    svgReduction: "vähennys",
    svgStart: "alkutila",
    svgSperm: "siittiöt",
    svgOocyte: "munasolu",
    svgTiming: "ajoitus",
    svgMotivation: "motivaatio",
    svgFecundability: "hedelmällisyys",
    svgTestosterone: "Testosteroni",
    svgOxytocin: "Oksitosiini",
    scoreConsistent: "yhdenmukainen",
    svgNeutral: "neutraali",
    svgPhysical: "Fyysinen",
    svgConformity: "Konformismi",
    svgHighThreshold: "korkea kynnys",
    svgDigital: "Digitaalinen",
    svgOutragePolarization: "Raivo & polarisaatio",
    svgNearZeroCost: "lähes nolla kustannus",
    svgThresholdVsCost: "biologinen kynnys vs. digitaalinen kustannus",
    civTested: "testattu",
    civAwaitingTesting: "Kaikki odottavat empiiristä testausta",
    modelDerived: "Mallin tuottamia arvoja BioCap-integraalista, ei suoraan mitattuja.",
    modelDerivedLink: "matemaattinen spesifikaatio",
    scoreExplain: "\"Yhdenmukainen\" tarkoittaa, että havainto vastaa ennusteen suuntaa. Se ei tarkoita, että ennuste olisi muodollisesti testattu. Katso alla olevat 14 testattavaa ennustetta — yhtäkään ei ole vielä empiirisesti testattu.",
    sPronatalistTitle: "Pronatalistisen politiikan epäonnistuminen",
    sPronatalistBody1: "Yksikään kehittynyt talous ei ole nostanut syntyvyyttä uusiutumistasolle modernissa historiassa ja ylläpitänyt sitä siellä (AEI 2026).",
    sPronatalistBody2: "Etelä-Korea: 270 miljardia dollaria vuodesta 2005. Kokonaishedelmällisyysluku laski 1,19:stä 0,72:een (-40 % 10 vuodessa). Singapore: 2,5 miljardia S$/vuosi. TFR laski 1,82:sta (1980) 0,87:ään (2025). Unkari: 5 % BKT:sta perhetukiin. TFR laski 1,39:ään (2024), vuosikymmenen matalin.",
    sPronatalistBody3: "Politiikka käsittelee j(motivaatio). Se ei voi käsitellä f(siittiö), g(munasolu) tai h(ajoitus) — jotka ovat biologisia. Kun jokainen tekijä on laskenut 30 %, kokonaishedelmöityskyky on 0,7⁴ = 0,24. Motivaation palauttaminen 100 %:iin tuottaa 0,7³ = 0,34 — ei 1,0. Biologiset komponentit ovat rahallisten kannustimien ulottumattomissa.",
    sCcbTitle: "Kalsiumkanavasalpaajaevidenssi",
    sCcbBody: "Aivoihin pääsevät CCB:t ovat yhteydessä ~12 % matalampaan psykiatristen ja neurodegeneratiivisten lopputulosten riskiin (Molecular Psychiatry 2022, taipumuspistemäärällä sovitetut kohortit jopa 322 814). Suomalainen valtakunnallinen yli 60 000 skitsofreniapotilaan kohortti havaitsi dihydropyridiinin käytön yhteyden vähentyneisiin psykiatrisiin uudelleenhoitojaksoihin (Cells 2025). CCB:t osoittivat matalamman psykoottisten, affektiivisten ja ahdistushäiriöiden ilmaantuvuuden kuin beetasalpaajat (riskisuhteet 0,69–0,99; Journal of Hypertension, kesäkuu 2025, RCT-meta-analyysi). Nämä ovat sydän- ja verisuonipotilaita, jotka saavat Ca²⁺-kanavasalpausta verenpaineeseen — ja saavat neuropsykiatrista suojaa sivuvaikutuksena.",
    sMagnesiumTitle: "Magnesium: puuttuva puskuri",
    sMagnesiumBody: "2,4 miljardia ihmistä (~31 % maailman väestöstä) ei täytä suositeltua magnesiumin saantia ([[ref:magnesium_ca2_antagonist_2025|IJVNR 2025 systemaattinen katsaus]]). Magnesium toimii endogeenisenä kalsiumkanava-antagonistina; puutos johtaa kohonneisiin solunsisäisiin Ca²⁺-pitoisuuksiin (PMC12616636). Magnesiumilla on säätelevä rooli testosteronin biosynteesissä (PMC12251677). Moderni ruokavalio (prosessoitu ruoka, köyhtyneet maaperät) on vähentänyt magnesiumin saantia samaan aikaan kun EMF-altistus on lisännyt Ca²⁺-kuormaa. Nämä yhdistyvät: vähemmän puskuria + enemmän häiritsijää = nopeampi Ca²⁺-homeostaasin heikkeneminen.",
    animalsFellHierarchy: "Herkkyyshierarkia seuraa mekanismista:",
    animalsFellItems: [
      { species: "Sammakkoeläimet", detail: "Kostea iho = suora ioninen kytkentä, ohuet munat, vesitoukat", evidence: "Maailmanlaajuinen lasku alkoi ~1987 (GSM-käyttöönotto)" },
      { species: "Hyönteiset", detail: "CRY-riippuvainen navigointi, pieni ruumiinmassa, lyhyet sukupolvet", evidence: "Biomassa −75 % 27 vuodessa (Krefeld)" },
      { species: "Linnut", detail: "CRY-kompassi, muuttolinnut eniten kärsineet", evidence: "−29 % Pohjois-Amerikassa vuodesta 1970 ([[ref:rosenberg2019|Rosenberg 2019]])" },
      { species: "Nisäkkäät", detail: "Kuiva iho, suuri massa, pitkä elinikä — kumulatiivinen", evidence: "Ihmisten biomarkkereiden lasku 1990-luvulta+" },
    ],
    animalsFellConclusion: "Tämä ei ole lista erillisistä kriiseistä. Se on yksi mekanismi (Ca²⁺/CRY-häiriö), joka etenee lajien läpi nopeudella, jonka biologinen herkkyys määrää. Kaivoskanarialintu ei ole metafora. Se on mittaus.",
  },
  ja: {
    title: "パトポリス",
    subtitle: "都市が文明の生物学的基盤をいかに劣化させるか",
    heroLead: "都市は単なる社会的環境ではない——電磁的環境である。コンクリートの壁は反射し、電線はうなり、あらゆるデバイスが脈動する。このページでは、その環境が身体、家族、制度、そして文明に何をもたらすかを追跡する。",
    civilizationLink: "文明に戻る",
    patokratiaLink: "パトクラティア",
    patokinesisLink: "パトキネシス",
    mechanismNote: "根本メカニズム — EMFがカルシウムチャネルを乱して性別特異的なホルモンカスケードを生み出す仕組み — はパトペゲで説明されています。",
    s5title: "複合効果",
    s5lead:
      "個人レベルのホルモン変化は、あらゆる人間の二者関係の両側に同時に影響を及ぼすとき、文明レベルの問題となる。ペアボンディングにはアプローチする男性と信頼する女性が必要である。生殖には機能する精子と機能する卵母細胞が必要である。子育てには父親の投資と母親の絆が必要である。EMFが両側を同時に撹乱すると、結果は加算的ではなく乗算的になる。",

    s5aTitle: "ペアボンディングの二極化",
    s5aMaleDeficit:
      "アプローチ動機↓（T↓ → [[ref:goetz2024|Goetz 2024]]）",
    s5aMaleMech:
      "テストステロンの低下は性的アプローチの生物学的閾値を引き上げる。関心として解釈されるシグナルが減少→開始されるアプローチが減少。",
    s5aFemaleDeficit:
      "信頼/絆の準備性↓（OT↓ → vagal）",
    s5aFemaleMech:
      "オキシトシンの低下は信頼とペアボンド形成の生物学的能力を減少させる。コルチゾールの上昇は社会的評価に不安を加える。",
    s5aCompound:
      "男性のアプローチ × 女性の受容性。両方が40%低下すると、成功するペアリングの確率は64%低下する（0.6 × 0.6 = 0.36 = 64%の減少）。これはどちらか一方の40%単独よりも悪い。",
    s5aObserved: [
      "すべての先進国でセックスレス率が上昇",
      "マッチングアプリの利用は増加しているが交際成立は減少",
      "初婚年齢の上昇",
      "40歳までの「未婚」割合の増加",
      "Japan：18–34歳男性の43%が性経験なし（2015）",
      "South Korea：出生率0.72（2024）",
    ],

    s5bTitle: "乗算的な出生率崩壊",
    s5bFormula:
      "Fertility = f(sperm) × g(oocyte) × h(timing) × j(motivation)",
    s5bFactors: [
      "f(sperm)：濃度−62%（[[ref:levine2023_sperm|Levine 2023]]）",
      "g(oocyte)：AMH低下、PCOS増加、予備能の早期枯渇",
      "h(timing)：概日リズムの撹乱 → 排卵タイミングの誤差",
      "j(motivation)：T↓（男性）× OT↓（女性）→ 試行回数の減少",
    ],
    s5bCompound:
      "各因子が30%低下すると、総受胎率は76%低下する（0.7⁴ = 0.24）。これがTFRが単一因子の予測よりも速く低下している理由、そして少子化対策が失敗する理由を説明する。政策はj(motivation)に金銭で対処する。f、g、hには対処できない――これらは生物学的だからである。",

    s5cTitle: "子どもの発達カスケード",
    s5cBurdens: [
      {
        title: "父親のエピジェネティック負荷",
        detail:
          "父親のEMF損傷精子メチローム → 子孫の遺伝子発現変化。精子DNA断片化 → 発達の不安定性。",
      },
      {
        title: "母親のホルモン環境",
        detail:
          "妊娠中の母親のcortisol↑ → 胎児のHPAプログラミングが変化 → 子孫のストレス反応性が永続的に上昇。母親のmelatonin↓ → 胎児の概日プログラミングが撹乱。",
      },
      {
        title: "胎児への直接曝露",
        detail:
          "EMFは子宮を透過 → 胎児のVGCC活性化 → Ca²⁺依存性の神経発達が撹乱。CACNA1C (Cav1.2)：シナプス形成、皮質層形成、興奮–抑制バランス。",
      },
    ],
    s5cSpiral:
      "各世代は前世代よりも弱いベースラインから出発する。CaMKII媒介の感作は、各世代が同じEMF曝露量に対してもより感受性が高いことを意味する。これが加速するスパイラルを生む。",

    s5dTitle: "制度の衰退",
    s5dLead:
      "制度には2つの相補的なインプットが必要である：",
    s5dBuilding:
      "構築（歴史的にT相関）：イノベーション、リスクテイキング、競争意欲、資源獲得、階層的組織化、不確実性下での長期計画。",
    s5dMaintaining:
      "維持（歴史的にOT相関）：信頼、協力、共感、紛争解決、ケア、社会規範の強制、内集団の結束。",
    s5dConclusion:
      "構築も維持もされない制度は劇的に崩壊するのではなく、衰退する。サービスは劣化する。信頼は侵食される。能力は低下する。基準は下がる。これは危機としてではなく、あらゆるものの品質が同時にゆっくりと失われていくものとして現れる。",

    s5eTitle: "加速するスパイラル",
    generations: [
      {
        label: "Generation 1 (born ~1940–1960)",
        emf: "低（大規模電化以前）",
        tLevel: "ベースライン（30歳時点で約550 ng/dL）",
        otLevel: "ベースライン",
        tfr: "2.5–3.5",
        institutional:
          "構築期：戦後復興、宇宙開発、経済拡大",
      },
      {
        label: "Generation 2 (born ~1960–1985)",
        emf: "上昇中（電化＋初期モバイル）",
        tLevel: "−15–25%",
        otLevel: "低下中（都市化 → 身体的接触の減少）",
        tfr: "1.8–2.2",
        institutional:
          "ピークと停滞：制度は成熟し、イノベーションは鈍化、維持はますます困難に",
      },
      {
        label: "Generation 3 (born ~1985–2010)",
        emf: "高（スマートフォン、WiFi、4G）",
        tLevel: "−30–40% ([[ref:santi2025|Santi 2025]])",
        otLevel: "著しく撹乱",
        tfr: "1.2–1.7",
        institutional:
          "衰退期：信頼の崩壊、制度の機能不全、孤独のエピデミック",
      },
      {
        label: "Generation 4 (born ~2010–2035)",
        emf: "非常に高（5G、IoT、胎児期曝露）",
        tLevel: "−40–55%（予測＋エピジェネティック負荷）",
        otLevel: "不明――完全な胎児期曝露を受けた最初の世代",
        tfr: "0.7–1.3（予測）",
        institutional:
          "危機期：制度は人材の獲得も維持もできず、IVFが人口学的インフラとなる",
      },
    ],
    generationInsight:
      "各世代は同じEMF曝露量に対してより感受性が高く（CaMKII感作）、より弱いホルモンベースラインから出発する（エピジェネティック伝達）。スパイラルはEMFが増加しなくても加速する――しかしEMFは増加している（5G、IoT、LED IF emissions）。",

    s6title: "12の予測、12の観察",
    s6lead:
      "BERMはそのホルモンモデルから特定の行動的・社会的変化を予測する。各予測はホルモンの関連性についてRCTエビデンスに基づいている；各観察は予測と一致する集団レベルのデータを引用する。",
    predictions: [
      {
        prediction: "男性の地位追求が低下する",
        basis: "T → status motivation ([[ref:dreher2016|Dreher 2016]], n=121)",
        observed:
          "起業率の低下、「静かな退職」、調査における職業的野心の低下",
        consistent: true,
      },
      {
        prediction: "男性のリスクテイキングが低下する",
        basis: "T → competitive risk (Competition 2024, n=220)",
        observed:
          "企業設立の減少、身体的リスク活動の減少、リスク回避の増加",
        consistent: true,
      },
      {
        prediction: "男性の性的アプローチが低下する",
        basis: "T → sexual motivation ([[ref:goetz2024|Goetz 2024]], n=139)",
        observed:
          "セックスレスの増加、交際開始の減少、Japan 18–34歳の43%が性経験なし",
        consistent: true,
      },
      {
        prediction: "男性の真正性が低下する",
        basis: "T → authentic self-presentation (Audience 2020, n=166)",
        observed:
          "社会不安の増加、印象管理の増加、演出的アイデンティティ",
        consistent: true,
      },
      {
        prediction: "男性の集団忠誠心が低下する",
        basis: "T → in-group favoritism (Parochial 2015, n=100)",
        observed:
          "市民参加の減少、組合・政党の会員減少、制度からの離脱",
        consistent: true,
      },
      {
        prediction: "男性の挑発反応が低下する",
        basis: "T → reactive aggression (Carré 2017, n=308)",
        observed:
          "暴力犯罪率の低下、対立する意欲の減少、紛争回避",
        consistent: true,
      },
      {
        prediction: "男性の認知スタイルが熟慮型にシフトする",
        basis: "T → gut-feel over deliberation (Nave 2018, n=243)",
        observed:
          "決断麻痺の増加、分析麻痺、自発的行動の減少",
        consistent: true,
      },
      {
        prediction: "男性の動機づけ/報酬感受性が低下する",
        basis: "T↓ → DA↓ → anhedonia (Soares-Cunha 2016)",
        observed:
          "うつ病の増加、「巣立ちの失敗」、NEET率の増加、報酬代替としてのゲーム/ストリーミング",
        consistent: true,
      },
      {
        prediction: "女性の不安/うつ病の性差が拡大する",
        basis:
          "Estrogen amplifies HPA reactivity. EMF → cortisol↑ hits women harder.",
        observed:
          "女性は不安2倍、うつ病2倍。2010年以降格差が拡大。2012年頃からの10代女子のメンタルヘルス危機。",
        consistent: true,
      },
      {
        prediction: "制度への信頼が世界的に低下する",
        basis:
          "OT → trust (Kosfeld 2005, Nature). EMF → vagal tone ↓ → OT ↓.",
        observed:
          "Edelman 2025：すべての制度への信頼が歴史的最低値。孤独のエピデミックが宣言。ソーシャルキャピタルの減少。",
        consistent: true,
      },
      {
        prediction: "PCOSの有病率がEMF普及とともに上昇する",
        basis:
          "PCOS = 4-organ VGCC convergence (pancreas + ovary + pituitary + adrenal).",
        observed:
          "PCOS有病率5–20%で上昇中。女性不妊の最も一般的な原因。メタボリックシンドロームと相関。",
        consistent: true,
      },
      {
        prediction: "各世代は前世代より感受性が高い",
        basis:
          "CaMKII → Cav3.2 threshold ↓ (PMC9913649). Epigenetic transmission (sperm methylome).",
        observed:
          "メンタルヘルス危機の発症が各コホートで早期化。ASD/ADHD有病率が世代ごとに上昇。女子の思春期発来が早期化。",
        consistent: true,
      },
    ],

    sProjectionTitle: "ホルモンデータが社会について予測すること",
    sProjectionLead:
      "上記の12の予測は個人の行動変化を追跡する。しかし個人は孤立して存在するのではない。カップル、家族、チーム、制度、国家を形成する。集団全体のホルモン基盤がシフトすると、その集約効果はイデオロギーの変化、文化的対立、道徳的衰退のように見えるが、その相当部分は文化的変化として経験される生物学的シフトである可能性がある創発的社会現象を生む。",
    sProjectionNote:
      "この区別は重要である。社会問題がイデオロギー的であれば、解決策は考え方を変えることを要する。それが部分的に生物学的であれば、解決策には環境を変えることが含まれる。後者のほうが容易である。",

    spolarTitle: "分極化：デジタルの勇気、物理的な同調",
    spolarBody:
      "オーディエンス効果RCT（2020）は、低テストステロンが戦略的向社会性――自分が信じることではなく聴衆が期待することを言うこと――を増加させることを示した。挑発RCT（Carré 2017）は、低テストステロンが不正義に対する反応的反応を減少させることを示した。これらを合わせると、特定のパターンが予測される：人々は物理的な場では同調的だが、スクリーンの向こうからは対立的になる。",
    spolarObserved:
      "これはまさに観察されていることである。オンラインの分極化は歴史的な高水準にある。物理的な対立は歴史的な低水準にある。人々は対面では決して言わないであろう意見を匿名で表明する。コメント欄は戦場であり、会議室はエコーチェンバーである。",
    spolarExplain:
      "これは偽善ではない。生物学である。低テストステロンは真正な対立の閾値を引き上げる。デジタル環境は対立の社会的コストをほぼゼロに引き下げる。生物学的閾値と環境コストのミスマッチがこのパターンを生む：オンラインでは大胆、オフラインでは沈黙。",
    spolarPrediction:
      "BERMの予測：平均Tが高い集団（例：低EMFコミュニティ）は、オンラインとオフラインの行動の乖離が小さいはずである。",
    spolarPhysical: "物理的環境",
    spolarPhysicalThreshold: "高（対面の社会的コスト）",
    spolarPhysicalBehavior: "同調、自己検閲、同意",
    spolarPhysicalRct: "Audience 2020: low T → strategic prosociality",
    spolarDigital: "デジタル環境",
    spolarDigitalThreshold: "ほぼゼロ（匿名性、距離）",
    spolarDigitalBehavior: "憤怒、分極化、対立",
    spolarDigitalRct: "Carré 2017: provocation response persists when cost is low",

    ssafetyTitle: "安全志向：価値選択ではなくホルモン閾値",
    ssafetyBody:
      "リスクテイキングはテストステロンとともに低下する（Competition RCT 2024, n=333）。不安はコルチゾールとともに増加する（[[ref:dual_hormone_meta2021|dual hormone meta, n=8,538]]）。両方が同時にシフトすると脅威感受性が増加する。集団レベルでは、これがより多くの状況を脅威として経験する社会を生む――環境がより危険だからではなく（暴力犯罪は歴史的最低水準にある）、脅威認知の生物学的閾値が低下したからである。",
    ssafetyParadox:
      "これは一見矛盾するパターンを説明する：人類史上最も安全な社会が最も高い不安を報告している。客観的危険は低下している。主観的脅威は上昇している。両者の間の差がホルモンシフトである。",
    ssafetyCreep:
      "実際の脅威が増加することなく脅威認知が上昇すると、心理学者が「コンセプト・クリープ」と呼ぶもの――害に関連する概念が以前は中立的だった現象を包含するように拡大すること――が生じる。言葉が暴力になる。意見の相違が攻撃になる。不快感がトラウマになる。これは道徳的進歩でも道徳的衰退でもない。異なるホルモン基盤上で作動する再較正された脅威検出システムである。",

    sinstitutionTitle: "制度の衰退：なぜすべてが少しずつ悪くなるのか",
    sinstitutionBody:
      "その結果は劇的な崩壊ではない。広範で緩やかな品質低下である。医療が少し悪くなる。教育が少し悪くなる。インフラの維持が少し遅れる。カスタマーサービスが低下する。政治家候補がわずかに能力を欠く。個々には目立たない。しかし合わせると、そのパターンは文明レベルのものである。",
    sinstitutionData:
      "2025 Edelman Trust Barometerは確認する：すべての制度――政府、メディア、NGO、雇用主――への信頼がほぼすべての人口統計で低下した。これは党派的現象ではない。基盤的現象である。",

    sfixableTitle: "修正可能な部分",
    sfixableLead:
      "このページに記録された行動変化が完全にイデオロギー的なものであれば――人々がアイデアのみの理由で動機づけが低く、より不安で、より同調的で、より信頼しなくなっていれば――解決策には何十億もの人々の考え方を変えることが必要になる。歴史はこれが極めて困難であることを示唆している。しかし、これらの変化のかなりの部分が生物学的基盤を持つならば、解決策の一部はイデオロギー的ではなく環境的なものである。",
    sfixableSolutions: [
      "生活・就労空間でのEMF曝露の低減",
      "カルシウムチャネル調節（264,625人の患者が心血管適応でCCBを処方され、精神科的便益を既に示している）",
      "マグネシウム補給（天然のCa²⁺拮抗剤）",
      "メラトニン回復（概日リズム修復）",
      "睡眠衛生（melatonin → GnRH → T回復）",
      "身体的接触とコミュニティ（オキシトシン回復）",
    ],
    sfixableConclusion:
      "これらのいずれも、誰かの信念を変える必要はない。電磁環境を変え、ホルモンが調節する生物学的システムを支援することを必要とする。現在の動機づけ、信頼、社会的結束の危機のうち20–30%でも生物学的であってイデオロギー的でなければ、その20–30%は政治的対立なしに対処できる。これがBERMモデルの最も実際的に重要な含意である：文明が運命づけられているということではなく、その衰退の一部に特定可能で、潜在的に可逆的な原因があるということである。",

    shistoryTitle: "ホルモンのレンズで歴史を読む",
    shistoryBody:
      "すべての世代は同じ客観的世界を異なるホルモン基盤を通じて経験する。1960年にテストステロン600 ng/dL、正常なコルチゾール、正常なドーパミン作動性シグナル伝達を持つ男性は、キャリアの挫折を克服すべき挑戦として経験する。2024年にテストステロン350 ng/dL、コルチゾール上昇、ドーパミン作動性トーン低下を持つ男性は、同じ挫折を回避すべき脅威として経験する。彼らの価値観は同一かもしれない。その価値観に基づいて行動する生物学的能力は同じではない。",
    shistoryOlder:
      "上の世代が「俺たちはただやっていただけだ」と言うとき、彼らは優れた人格を述べているのではない。行動の閾値が低く回避の閾値が高い、異なるホルモン環境を述べているのである。",
    shistoryYounger:
      "若い世代が「世界はよりストレスフルだ」と言うとき、彼らはより危険な世界を述べているのではない（客観的にはより安全である）。より多くの脅威を検出し、それに立ち向かう動機をより少なく生成するホルモン基盤を通じて経験される同じ世界を述べているのである。",
    shistoryConclusion:
      "どちらの世代も間違ってはいない。同じ現実を異なる生物学的フィルターを通じて述べている。その結果として生じる世代間対立――「怠け者の若者」対「世間知らずのベビーブーマー」――は、それ自体がホルモンシフトの帰結であり、どちら側の道徳的失敗の証拠でもない。",

    sideologyTitle: "下流としてのイデオロギー",
    sideologyBody:
      "同じアイデア――「安全は重要だ」――は、それを保持する集団のホルモン基盤に応じて異なる政治的帰結を生む。",
    sideologyHigh:
      "T=500 ng/dL、cortisol=正常の場合：「安全は重要だ」→ 安全なインフラを構築し、法を執行し、脅威に直接対峙する。",
    sideologyLow:
      "T=320 ng/dL、cortisol=上昇の場合：「安全は重要だ」→ すべてのリスクを排除し、害の定義を拡大し、対立の原因となる刺激を除去することで対立を回避する。",
    sideologyExplain:
      "アイデアは変わっていない。それを実行する生物学的能力が変わったのである。これは左派対右派ではない。進歩派対保守派でもない。両陣営が概ね共有する同じ価値観セットに対する実行閾値の生物学的シフトである。両陣営とも安全を望む。両陣営とも公正を望む。両陣営とも機会を望む。対立はその「方法」について――そして「方法」はホルモン閾値によって調節される。",
    sideologyTestable:
      "これは検証可能である。安全性、リスク、権威に関する政治的態度が、人口統計と表明されたイデオロギーを統制した後に個人のホルモンプロファイル（T、cortisol、OT）と相関するなら、生物学的調節仮説は支持を得る。複数の研究がまさにこれを見出している：テストステロンは文化を超えて権威、競争、再分配に関する政治的態度と相関する。",

    s7title: "再帰的予測",
    s7body:
      "BERMは異例の予測を行う：モデル自体の受容がその命題のエビデンスである。テストステロンの低下が集団レベルでリスクテイキング、競争意欲、真正な自己提示を減少させるならば、同じホルモン環境に従属する人間で構成される科学コミュニティは、コンセンサスに挑戦し、論争的な研究方向を追求し、不人気な知見を擁護する意欲の低下を示すはずである。モデルはEMFの生体影響に関する研究が資金不足、汚名、制度的抑制を受けると予測する――エビデンスが弱いからではなく、知的リスクテイキングを駆動するホルモン基盤が低下しているからである。これは検証可能である：EMF生体影響研究へのNIH/ERC総資金に占める配分割合は低下しているはずであり、この分野の研究者は肯定的知見の公表に対するキャリア上の不利益が増加していると報告するはずである。",

    s8title: "ドーパミン作動性の知性",
    s8body:
      "Barzilaiのドーパミン作動性知性仮説は、ドーパミン駆動の認知特性――好奇心、創造性、探索、リスク耐性、未来志向――が現代人の認知の出現に中心的であったと提唱する。BERMはメカニズムを追加する：EMFがVTA Cav1.3 → ドーパミン放出を撹乱し、テストステロンの低下がさらにDA受容体発現を減少させるならば、集団レベルのドーパミン作動性機能の低下は認知革命の部分的逆行を表す。これは知能（IQはFlynn効果により安定または上昇する可能性がある）についての主張ではない。認知スタイルについての主張である：探索から活用へ、リスクテイキングからリスク回避へ、イノベーションから最適化へのシフト。ドーパミン作動性機能が低下する社会は思考をやめるのではなく、知的リスクをとることをやめる。",

    s8bTitle: "サイバネティック・フィードバックループ",
    s8bLead: "文明レベルの影響は一方向ではない。行動変化は曝露パターンにフィードバックし、プロセスを加速する自己強化ループを生み出す。",
    s8bPositiveTitle: "正のフィードバック（増幅）ループ",
    s8bPositiveLoops: [
      "スマートフォン使用↑ → メラトニン↓ → 睡眠の質↓ → 日中疲労↑ → さらなるスマートフォン使用（ドーパミン的補償）",
      "テストステロン↓ → リスク回避↑ → 屋内時間↑ → EMF曝露↑ → さらなるテストステロン↓",
      "社会不安↑ → デジタルコミュニケーション選好↑ → スクリーン時間↑ → オキシトシン↓ → さらなる社会不安",
    ],
    s8bNegativeTitle: "負のフィードバック（安定化）ループ",
    s8bNegativeLoops: [
      "疲労↑ → 身体的不活動↑ → 屋外時間減少 → UV減少 → ビタミンD減少 → Ca²⁺緩衝能低下 → EMF感受性増大",
      "睡眠障害↑ → カフェイン使用↑ → アデノシン受容体適応 → 部分的神経保護（A₁ → VGCC調節）",
    ],
    s8bImplication: "正のループが支配的である。各世代は前世代より低いホルモンベースラインと高い環境EMFで始まる。安定化ループ（カフェイン、運動）は意識的努力を要する――増幅ループは自動的に作動する。この非対称性が、小さな初期摂動が数十年にわたって大きな文明的影響を生むメカニズムである。",
    s8cTitle: "時間選好と出産決定",
    s8cLead: "双曲割引――将来の報酬よりも即時の報酬を強く選好する傾向――にはホルモン基盤がある。その基盤が変化すると、時間選好が移行し、出産決定が続く。",
    s8cMechanism: "テストステロンは時間割引に二つの経路で影響する：(1) 前頭前野のアンドロゲン受容体密度を通じて直接的に未来志向の意思決定を調節；(2) ドーパミンを通じて間接的に――テストステロンは線条体のD2受容体発現を上方制御し、ドーパミンが遅延報酬の評価を仲介する。両方が同時に低下すると、現在が重くなり未来が軽くなる。",
    s8cFertility: "出産は究極の未来志向的決定である：現在の高コスト、何年も先の不確実な報酬。集団レベルの現在志向へのシフトは、出産の延期を予測する――子供が望ましくないからではなく、高コスト・長期的プロジェクトへのコミットメントのホルモン閾値が上昇するからである。",
    s8cTestable: "検証可能：個人の割引率（遅延割引課題で測定）はテストステロンおよびドーパミンマーカーと相関し、申告された出産意図・収入・教育を制御した後も出産タイミングを予測するはずである。",

    sIQSTitle: "IQシュレッダー", sIQSSubtitle: "生物学的診断", sIQSLead: "", sIQSBiological: "", sIQSNotChoice: "",
    sIQSComponents: "", sIQSComponentsDesc: "", sIQSRepro: "", sIQSReproDesc: "", sIQSDA: "", sIQSDADesc: "",
    sIQSTime: "", sIQSTimeDesc: "", sIQSBurn: "", sIQSBurnDesc: "", sIQSEff: "", sIQSEffDesc: "",
    sIQSTable: "", sIQSTableDesc: "", sIQSEnv: "環境", sIQSReproCol: "生殖抑制", sIQSDACol: "DA捕獲",
    sIQSTimeCol: "時間選好", sIQSBurnCol: "遺伝的燃焼", sIQSEffCol: "シュレッダー効率", sIQSBiocapCol: "BioCap",
    sIQSMeta: "", sIQSMetaDesc: "", sIQSPredictions: "", sIQSPred1: "", sIQSPred2: "", sIQSPred3: "",
    sIQSLit: [] as string[],

    s9title: "検証可能な予測",
    s9lead:
      "各予測は反証基準を明示する。反証できないモデルは科学ではない。",
    civPredictions: [
      {
        id: "CIV-1",
        title: "ライフスタイルに関係なくT低下が続く",
        detail:
          "集団レベルのテストステロン低下は、肥満、喫煙、飲酒、睡眠を統制した後でも続く――主要な要因はライフスタイルではなく環境EMFだからである。",
        falsification:
          "大規模コホートにおいて調整後にT低下がライフスタイル因子で完全に説明される",
      },
      {
        id: "CIV-2",
        title: "低EMFコミュニティはより高いTを維持する",
        detail:
          "Amish、Mennonite、およびその他の低EMF曝露コミュニティは、マッチした都市集団よりも高い年齢調整済みテストステロンを維持するはずである。",
        falsification:
          "人口統計学的調整後に低EMFと高EMFコミュニティ間でT差なし",
      },
      {
        id: "CIV-3",
        title: "CCB使用者は行動低下が緩和される",
        detail:
          "長期CCB使用者は、非CCB降圧薬使用者と比較して、T依存性行動（起業家精神、リスクテイキング）の低下が少ないはずである。",
        falsification:
          "CCBと非CCB降圧薬使用者間で行動差なし",
      },
      {
        id: "CIV-4",
        title: "TFRはGDPだけでなくEMF密度と相関する",
        detail:
          "GDP、教育、都市化を統制した後、EMFインフラ密度は各国のTFR低下を独立に予測するはずである。",
        falsification:
          "社会経済的統制後にEMF密度とTFR間に残差相関なし",
      },
      {
        id: "CIV-5",
        title: "EMF削減で行動抑制が回復する",
        detail:
          "EMF曝露を大幅に削減した個人（例：低EMF環境への転居）は、6–12ヶ月以内にT依存性行動の測定可能な回復を示すはずである。",
        falsification:
          "対照研究における持続的EMF削減後に行動回復なし",
      },
      {
        id: "CIV-6",
        title: "ペアリング確率が乗算的に低下する",
        detail:
          "男性のアプローチ（T依存）と女性の受容性（OT依存）がそれぞれX%低下した場合、成功するペアリングは2X%ではなくX²%低下するはずである。交際市場データとホルモン測定を組み合わせて検証可能。",
        falsification:
          "ペアリング率が個人のホルモン値に対して線形に低下する",
      },
      {
        id: "CIV-7",
        title:
          "10代女子のメンタルヘルス危機はコンテンツではなくハードウェアと相関する",
        detail:
          "BERMはEMFハードウェア要素（HPAを介したcortisol、松果体を介したmelatonin）がソーシャルメディアのコンテンツよりも重要であると予測する。スマートフォンを同等に使用するが低EMF環境にいる女子は、不安の増加が少ないはずである。",
        falsification:
          "高EMFと低EMFのスマートフォン使用者間で不安に差なし",
      },
      {
        id: "CIV-8",
        title:
          "世代間ホルモン低下がEMF増加なしに加速する",
        detail:
          "CaMKII感作＋エピジェネティック伝達は、一定のEMFでも世代を超えてホルモン低下が加速することを予測する。同年齢での世代コホート間のT低下率を比較することで検証可能。",
        falsification:
          "同等年齢での世代間のT低下率が一定",
      },
      {
        id: "CIV-9",
        title:
          "オキシトシン依存性行動がEMF環境とともに低下する",
        detail:
          "ボランティア活動、コミュニティ参加、慈善寄付、対人信頼――すべてOT依存――は、各国間および経時的にEMF環境と負の相関を示すはずである。",
        falsification:
          "EMF環境とOT依存の社会的行動間に相関なし",
      },
      {
        id: "CIV-10",
        title: "2040年までにIVFが人口学的インフラとなる",
        detail:
          "生物学的受胎可能性が約30%のカップルが12ヶ月以内に自然妊娠を達成する水準を下回ると、IVFは医療介入から集団レベルのインフラへと移行する。予測：South Koreaは2030年まで、Japanは2035年まで、Europeの大部分は2040年まで。",
        falsification:
          "高EMF国で2040年まで非支援妊娠率が70%以上を維持",
      },
      {
        id: "CIV-11",
        title: "オンライン-オフラインの行動ギャップが集団Tレベルと相関する",
        detail:
          "平均Tが高い集団はオンラインと対面の行動の乖離が小さい。低EMFコミュニティはギャップが最小。",
        falsification:
          "集団Tとオンライン-オフライン行動乖離間に相関なし",
      },
      {
        id: "CIV-12",
        title: "コンセプト・クリープの速度が各国のコルチゾール傾向と相関する",
        detail:
          "コルチゾール増加（またはT低下）がより速い国は、法的・学術的・メディア言語における害に関連する概念のより速い拡大を示す。",
        falsification:
          "ホルモン傾向とコンセプト・クリープ速度間に相関なし",
      },
      {
        id: "CIV-13",
        title: "世代間緊張は低EMFコミュニティで最も弱い",
        detail:
          "世代を超えて安定したホルモンベースラインを持つAmishおよび類似コミュニティは、高EMF社会よりも世代間対立が少ないはずである。",
        falsification:
          "低EMFコミュニティが全国平均と同程度の世代間緊張を示す",
      },
      {
        id: "CIV-14",
        title: "リスクと権威に関する政治的態度が人口統計的統制後に個人のTと相関する",
        detail:
          "集団内：Tが高い個人は対立に基づく解決策を好む；低Tは回避に基づく解決策を好む――表明されたイデオロギーとは独立に。",
        falsification:
          "人口統計的統制後にTと政策選好間に残差相関なし",
      },
    ],

    lostRecoveryTitle: "失われた回復の窓",
    lostRecoveryDesc: "人類史上初めて、一日のうちに重大なEMF曝露のない時間帯が存在しない。電力網は24時間365日稼働する。WiFiルーターは決してオフにならない。LED照明は就寝まで稼働する。スマートフォンは夜通しベッドサイドテーブルに置かれる。Bluetooth機器は継続的に接続を維持する。",
    lostRecoveryMechanism: "CaMKIIの脱リン酸化――分子的な回復プロセス――にはCa²⁺過負荷のない時間が必要である。電化以前のヒトは1日22時間以上、人工EMFなしで過ごしていた。現代の都市住民はほぼゼロである。COVID ロックダウンはこれを実験的に示した：WiFi＋LED＋複数デバイスとともに1日24時間自宅にいることで最後の回復の窓が排除され、T2Dの加速は2.90%から3.52%/年に跳ね上がった。",
    lostRecoveryIntervention: "これはモデルからの最も実行可能な洞察でもある：EMFフリーの寝室が最も単純な単一の介入である。食事の変更も、薬も、ライフスタイルの全面的見直しも不要――ルーターを撤去し、夜間は機内モードを使用し、就寝前に白熱灯に切り替えるだけでよい。",

    buildingTitle: "コンクリートの都市：組み込まれたEMF増幅",
    buildingDesc: "都市化は社会的変化であるだけでなく、電磁的変化でもある。鉄筋コンクリートはRFを内部反射し（鉄筋が逆ファラデーケージとして部分的に機能する）、室内電界強度を増加させる。木材はRF透過性であり、電界は通過して散逸する。農村部の住民がコンクリートの都市に移住したとき、誰も測定していなかったメカニズムによって、同時に周囲のEMF曝露を増加させた。",
    buildingEvidence: "木造の部屋はコンクリートの部屋と比較して、より良い睡眠、より低い心拍数、より良い認知パフォーマンスを示す（[[ref:wood_health2026|BIOBUILDS 2026]]）。従来の説明：バイオフィリア。BERMの追加：RF反射係数。両方とも正しい可能性がある――しかしEMFメカニズムは検証可能であり、バイオフィリアメカニズムは検証不可能である。",

    animalsFellTitle: "動物が先に倒れた",
    animalsFellDesc: "EMFが基本的なCa²⁺およびCRYレベルで生物学に影響しているなら、より感受性の高い種が先に減少しているはずである――そして実際にそうだった。カエル（湿った皮膚、直接的Ca²⁺結合）はGSM展開に伴い1987年頃に減少を開始した。ハチ（CRY依存のナビゲーション）は携帯電話基地局が農村部に到達した2006年に崩壊した。昆虫バイオマスは27年間で75%減少した。鳥類個体数も続いた。哺乳類――ヒトを含む――は乾燥した皮膚と大きな体質量のため最も感受性が低いが、長い寿命にわたり影響は蓄積的である。",
    animalsFellAnalogy: "炭鉱のカナリアの例えは比喩的ではなく、メカニズム的である。同じイオンチャネル、同じ磁気受容器、同じCa²⁺シグナル伝達。動物たちは偶然相関する別々の理由で減少したのではない。異なる感受性閾値で同じメカニズムによって減少した。",

    civilizationNote: "文明的視点 — 生物学的収容力、帝国の寿命、太陽周期、活性化メカニズム — はパトポリテイアで探求されています。",
    svgMaleLower: "male",
    svgFemaleLower: "female",
    svgReduction: "reduction",
    svgStart: "start",
    svgSperm: "sperm",
    svgOocyte: "oocyte",
    svgTiming: "timing",
    svgMotivation: "motivation",
    svgFecundability: "fecundability",
    svgTestosterone: "Testosterone",
    svgOxytocin: "Oxytocin",
    scoreConsistent: "一致",
    svgNeutral: "neutral",
    svgPhysical: "物理的",
    svgConformity: "同調",
    svgHighThreshold: "高い閾値",
    svgDigital: "デジタル",
    svgOutragePolarization: "憤怒と分極化",
    svgNearZeroCost: "ほぼゼロのコスト",
    svgThresholdVsCost: "生物学的閾値 vs. デジタルコスト",
    civTested: "検証済み",
    civAwaitingTesting: "すべて実証的検証待ち",
    modelDerived: "", modelDerivedLink: "",
    scoreExplain: "",
    sPronatalistTitle: "", sPronatalistBody1: "", sPronatalistBody2: "", sPronatalistBody3: "",
    sCcbTitle: "", sCcbBody: "",
    sMagnesiumTitle: "", sMagnesiumBody: "",
    animalsFellHierarchy: "", animalsFellItems: [] as { species: string; detail: string; evidence: string }[], animalsFellConclusion: "",
  },
  fr: {
    title: "Patopolis",
    subtitle: "Comment la ville dégrade les substrats biologiques de la civilisation",
    heroLead: "La ville n'est pas seulement un environnement social — c'est un environnement électromagnétique. Chaque mur de béton réfléchit, chaque fil bourdonne, chaque appareil pulse. Cette page retrace ce que cet environnement fait au corps, à la famille, aux institutions et à la civilisation.",
    civilizationLink: "Retour à Civilisation",
    patokratiaLink: "Patokratia",
    patokinesisLink: "Patokinesis",
    mechanismNote: "Le mecanisme racine — comment les CEM perturbent les canaux calciques pour produire des cascades hormonales specifiques au sexe — est decrit dans Pathopege.",
    s5title: "Effets composés",
    s5lead:
      "Les changements hormonaux individuels deviennent civilisationnels lorsqu'ils affectent les deux côtés de chaque dyade humaine simultanément. La formation du couple nécessite un homme qui approche et une femme qui fait confiance. La reproduction nécessite des spermatozoïdes fonctionnels et des ovocytes fonctionnels. L'éducation des enfants nécessite l'investissement paternel et l'attachement maternel. Lorsque les EMF perturbent les deux côtés en même temps, le résultat n'est pas additif — il est multiplicatif.",

    s5aTitle: "Bifurcation de la formation du couple",
    s5aMaleDeficit:
      "Motivation d'approche ↓ (T↓ → [[ref:goetz2024|Goetz 2024]])",
    s5aMaleMech:
      "Le déclin de la testostérone élève le seuil biologique de l'approche sexuelle. Moins de signaux interprétés comme de l'intérêt → moins d'approches initiées.",
    s5aFemaleDeficit:
      "Disposition à la confiance/attachement ↓ (OT↓ → vagal)",
    s5aFemaleMech:
      "Le déclin de l'ocytocine réduit la capacité biologique de confiance et de formation du lien de couple. Un cortisol plus élevé ajoute de l'anxiété à l'évaluation sociale.",
    s5aCompound:
      "Approche masculine × réceptivité féminine. Si les deux déclinent de 40 %, la probabilité de formation réussie du couple décline de 64 % (0.6 × 0.6 = 0.36 = 64 % de réduction). C'est pire que les 40 % de chaque partenaire pris isolément.",
    s5aObserved: [
      "Taux d'absence de vie sexuelle en hausse dans toutes les nations industrialisées",
      "Utilisation des applications de rencontre en hausse mais formation de relations en baisse",
      "Âge moyen du premier mariage en augmentation",
      "Pourcentage de « jamais mariés » à 40 ans en augmentation",
      "Japan : 43 % des hommes de 18–34 ans vierges (2015)",
      "South Korea : taux de natalité 0.72 (2024)",
    ],

    s5bTitle: "Effondrement multiplicatif de la fertilité",
    s5bFormula:
      "Fertilité = f(sperme) × g(ovocyte) × h(timing) × j(motivation)",
    s5bFactors: [
      "f(sperme) : −62 % de concentration ([[ref:levine2023_sperm|Levine 2023]])",
      "g(ovocyte) : AMH en déclin, PCOS en hausse, réserve s'épuisant plus tôt",
      "h(timing) : Perturbation circadienne → erreurs de timing d'ovulation",
      "j(motivation) : T↓ (masculin) × OT↓ (féminin) → moins de tentatives",
    ],
    s5bCompound:
      "Si chaque facteur décline de 30 %, la fécondabilité totale décline de 76 % (0.7⁴ = 0.24). Cela explique pourquoi le TFR baisse plus vite que ne le prédirait un seul facteur — et pourquoi les politiques natalistes échouent. La politique s'attaque à j(motivation) avec de l'argent. Elle ne peut pas traiter f, g ou h — qui sont biologiques.",

    s5cTitle: "Cascade du développement de l'enfant",
    s5cBurdens: [
      {
        title: "Charge épigénétique paternelle",
        detail:
          "Le méthylome des spermatozoïdes endommagés par les EMF du père → expression génétique altérée chez la progéniture. Fragmentation de l'DNA spermatique → instabilité développementale.",
      },
      {
        title: "Environnement hormonal maternel",
        detail:
          "Cortisol↑ de la mère pendant la grossesse → programmation de l'axe HPA fœtal altérée → réactivité au stress de la progéniture élevée de manière permanente. Mélatonine↓ de la mère → programmation circadienne fœtale perturbée.",
      },
      {
        title: "Exposition fœtale directe",
        detail:
          "Les EMF pénètrent l'utérus → activation des VGCC fœtaux → neurodéveloppement dépendant du Ca²⁺ perturbé. CACNA1C (Cav1.2) : synaptogenèse, stratification corticale, équilibre excitation–inhibition.",
      },
    ],
    s5cSpiral:
      "Chaque génération part d'une base plus faible que la précédente. La sensibilisation médiée par CaMKII signifie que chaque génération est aussi plus sensible à la même dose d'EMF. Cela produit une spirale accélérante.",

    s5dTitle: "Déclin institutionnel",
    s5dLead:
      "Les institutions nécessitent deux apports complémentaires :",
    s5dBuilding:
      "Construction (historiquement corrélée à la T) : innovation, prise de risque, esprit de compétition, acquisition de ressources, organisation hiérarchique, planification à long terme en situation d'incertitude.",
    s5dMaintaining:
      "Maintien (historiquement corrélé à l'OT) : confiance, coopération, empathie, résolution de conflits, soins, application des normes sociales, cohésion de l'endogroupe.",
    s5dConclusion:
      "Une institution qui n'est ni construite ni entretenue ne s'effondre pas de manière dramatique — elle se dégrade. Les services se détériorent. La confiance s'érode. La compétence décline. Les standards s'abaissent. Ce n'est pas visible comme une crise — c'est visible comme une perte lente de qualité dans tout simultanément.",

    s5eTitle: "La spirale accélérante",
    generations: [
      {
        label: "Génération 1 (née ~1940–1960)",
        emf: "Faible (pré-électrification de masse)",
        tLevel: "Niveau de référence (~550 ng/dL à 30 ans)",
        otLevel: "Niveau de référence",
        tfr: "2.5–3.5",
        institutional:
          "Phase de construction : reconstruction d'après-guerre, programme spatial, expansion économique",
      },
      {
        label: "Génération 2 (née ~1960–1985)",
        emf: "En hausse (électrification + téléphonie mobile précoce)",
        tLevel: "−15–25 %",
        otLevel: "En déclin (urbanisation → moins de contact physique)",
        tfr: "1.8–2.2",
        institutional:
          "Pic et plateau : les institutions arrivent à maturité, l'innovation ralentit, le maintien devient de plus en plus difficile",
      },
      {
        label: "Génération 3 (née ~1985–2010)",
        emf: "Élevé (smartphones, WiFi, 4G)",
        tLevel: "−30–40 % ([[ref:santi2025|Santi 2025]])",
        otLevel: "Significativement perturbé",
        tfr: "1.2–1.7",
        institutional:
          "Phase de déclin : effondrement de la confiance, dysfonctionnement institutionnel, épidémie de solitude",
      },
      {
        label: "Génération 4 (née ~2010–2035)",
        emf: "Très élevé (5G, IoT, exposition prénatale)",
        tLevel: "−40–55 % (projeté + charge épigénétique)",
        otLevel: "Inconnu — première génération avec exposition prénatale complète",
        tfr: "0.7–1.3 (projeté)",
        institutional:
          "Phase de crise : les institutions ne peuvent ni recruter ni retenir, l'IVF devient une infrastructure démographique",
      },
    ],
    generationInsight:
      "Chaque génération est plus sensible à la même dose d'EMF (sensibilisation CaMKII) et part d'une base hormonale plus faible (transmission épigénétique). La spirale s'accélère sans aucune augmentation des EMF — mais les EMF augmentent (5G, IoT, émissions IF des LED).",

    s6title: "Douze prédictions, douze observations",
    s6lead:
      "BERM prédit des changements comportementaux et sociaux spécifiques à partir de son modèle hormonal. Chaque prédiction est fondée sur des preuves de RCT pour le lien hormonal ; chaque observation cite des données au niveau populationnel cohérentes avec la prédiction.",
    predictions: [
      {
        prediction: "Déclin de la recherche de statut masculine",
        basis: "T → motivation de statut ([[ref:dreher2016|Dreher 2016]], n=121)",
        observed:
          "Taux d'entrepreneuriat en baisse, « démission silencieuse », ambition de carrière réduite dans les enquêtes",
        consistent: true,
      },
      {
        prediction: "Déclin de la prise de risque masculine",
        basis: "T → risque compétitif (Competition 2024, n=220)",
        observed:
          "Création d'entreprises en baisse, réduction des activités à risque physique, aversion au risque accrue",
        consistent: true,
      },
      {
        prediction: "Déclin de l'approche sexuelle masculine",
        basis: "T → motivation sexuelle ([[ref:goetz2024|Goetz 2024]], n=139)",
        observed:
          "Absence de vie sexuelle en hausse, initiation de relations en déclin, Japan 43 % vierges à 18–34 ans",
        consistent: true,
      },
      {
        prediction: "Déclin de l'authenticité masculine",
        basis: "T → présentation authentique de soi (Audience 2020, n=166)",
        observed:
          "Anxiété sociale en hausse, gestion des impressions accrue, identité performative",
        consistent: true,
      },
      {
        prediction: "Déclin de la loyauté de groupe masculine",
        basis: "T → favoritisme endogroupe (Parochial 2015, n=100)",
        observed:
          "Participation civique en déclin, adhésion aux syndicats/partis en baisse, détachement institutionnel",
        consistent: true,
      },
      {
        prediction: "Déclin de la réponse à la provocation masculine",
        basis: "T → agression réactive (Carré 2017, n=308)",
        observed:
          "Taux de criminalité violente en baisse, volonté de confrontation réduite, évitement des conflits",
        consistent: true,
      },
      {
        prediction: "Le style cognitif masculin se déplace vers la délibération",
        basis: "T → instinct plutôt que délibération (Nave 2018, n=243)",
        observed:
          "Paralysie décisionnelle accrue, paralysie de l'analyse, réduction de l'action spontanée",
        consistent: true,
      },
      {
        prediction: "Déclin de la motivation/sensibilité à la récompense masculine",
        basis: "T↓ → DA↓ → anhédonie (Soares-Cunha 2016)",
        observed:
          "Dépression en hausse, « échec au lancement », taux de NEET en augmentation, jeux vidéo/streaming comme substituts de récompense",
        consistent: true,
      },
      {
        prediction: "L'écart entre les sexes en matière d'anxiété/dépression se creuse",
        basis:
          "L'œstrogène amplifie la réactivité de l'axe HPA. EMF → cortisol↑ touche les femmes plus durement.",
        observed:
          "Femmes 2× anxiété, 2× taux de dépression. Écart qui se creuse depuis 2010. Crise de santé mentale des adolescentes depuis ~2012.",
        consistent: true,
      },
      {
        prediction: "La confiance institutionnelle décline mondialement",
        basis:
          "OT → confiance (Kosfeld 2005, Nature). EMF → tonus vagal ↓ → OT ↓.",
        observed:
          "Edelman 2025 : confiance dans toutes les institutions à des niveaux historiquement bas. Épidémie de solitude déclarée. Capital social en déclin.",
        consistent: true,
      },
      {
        prediction: "La prévalence du PCOS augmente avec l'adoption des EMF",
        basis:
          "PCOS = convergence VGCC de 4 organes (pancréas + ovaire + hypophyse + surrénale).",
        observed:
          "Prévalence du PCOS 5–20 % et en hausse. Cause la plus fréquente d'infertilité féminine. Corrélée au syndrome métabolique.",
        consistent: true,
      },
      {
        prediction: "Chaque génération plus sensible que la précédente",
        basis:
          "CaMKII → seuil Cav3.2 ↓ (PMC9913649). Transmission épigénétique (méthylome spermatique).",
        observed:
          "Début de la crise de santé mentale plus précoce à chaque cohorte. Prévalence ASD/ADHD en hausse générationnelle. Début de la puberté plus précoce chez les filles.",
        consistent: true,
      },
    ],

    sProjectionTitle: "Ce que les données hormonales prédisent sur la société",
    sProjectionLead:
      "Les douze prédictions ci-dessus retracent les changements comportementaux individuels. Mais les individus n'existent pas isolément. Ils forment des couples, des familles, des équipes, des institutions et des nations. Lorsque le substrat hormonal d'une population entière change, les effets agrégés produisent des phénomènes sociaux émergents qui ressemblent à un changement idéologique, un conflit culturel ou un déclin moral mais qui peuvent être, dans une mesure significative, un changement biologique vécu comme un changement culturel.",
    sProjectionNote:
      "Cette distinction est importante. Si un problème social est idéologique, la solution nécessite de changer les mentalités. S'il est en partie biologique, la solution inclut le changement de l'environnement. Le second est plus facile.",

    spolarTitle: "Polarisation : courage numérique, conformité physique",
    spolarBody:
      "Le RCT de l'effet de l'audience (2020) a montré qu'un faible taux de testostérone augmente la prosocialité stratégique — dire ce que l'audience attend plutôt que ce que l'on croit. Le RCT de la provocation (Carré 2017) a montré qu'un faible taux de testostérone réduit la réponse réactive à l'injustice. Ensemble, ces résultats prédisent un schéma spécifique : les gens seront conformistes en présence physique mais confrontationnels derrière les écrans.",
    spolarObserved:
      "C'est précisément ce qui est observé. La polarisation en ligne est à des niveaux historiquement élevés. La confrontation physique est à des niveaux historiquement bas. Les gens expriment anonymement des opinions qu'ils n'oseraient jamais formuler en personne. Les sections de commentaires sont des champs de bataille ; les salles de réunion sont des chambres d'écho.",
    spolarExplain:
      "Ce n'est pas de l'hypocrisie. C'est de la biologie. Un faible taux de testostérone élève le seuil de la confrontation authentique. Les environnements numériques réduisent le coût social de la confrontation à presque zéro. Le décalage entre le seuil biologique et le coût environnemental crée le schéma : audacieux en ligne, silencieux hors ligne.",
    spolarPrediction:
      "Prédiction de BERM : les populations avec un taux moyen de T plus élevé (par ex., communautés à faible EMF) devraient montrer moins de divergence entre le comportement en ligne et hors ligne.",
    spolarPhysical: "Environnement physique",
    spolarPhysicalThreshold: "Élevé (coût social en face-à-face)",
    spolarPhysicalBehavior: "Conformité, autocensure, acquiescement",
    spolarPhysicalRct: "Audience 2020 : faible T → prosocialité stratégique",
    spolarDigital: "Environnement numérique",
    spolarDigitalThreshold: "Quasi nul (anonymat, distance)",
    spolarDigitalBehavior: "Indignation, polarisation, confrontation",
    spolarDigitalRct: "Carré 2017 : la réponse à la provocation persiste quand le coût est faible",

    ssafetyTitle: "Recherche de sécurité : seuil hormonal, non choix de valeur",
    ssafetyBody:
      "La prise de risque décline avec la testostérone (RCT Competition 2024, n=333). L'anxiété augmente avec le cortisol ([[ref:dual_hormone_meta2021|méta double hormone, n=8,538]]). La sensibilité à la menace augmente lorsque les deux changent simultanément. Au niveau populationnel, cela produit une société qui perçoit plus de situations comme menaçantes — non pas parce que l'environnement est plus dangereux (la criminalité violente est à des niveaux historiquement bas) mais parce que le seuil biologique de perception de la menace s'est abaissé.",
    ssafetyParadox:
      "Cela explique un schéma autrement paradoxal : les sociétés les plus sûres de l'histoire humaine rapportent la plus grande anxiété. Le danger objectif est en baisse. La menace subjective est en hausse. L'écart entre les deux est le changement hormonal.",
    ssafetyCreep:
      "Lorsque la perception de la menace augmente sans que la menace réelle n'augmente, le résultat est ce que les psychologues appellent la « dérive conceptuelle » : l'expansion des concepts liés au préjudice pour englober des phénomènes auparavant neutres. Les mots deviennent violence. Le désaccord devient agression. L'inconfort devient traumatisme. Ce n'est ni un progrès moral ni un déclin moral. C'est un système de détection des menaces recalibré fonctionnant sur un substrat hormonal différent.",

    sinstitutionTitle: "Déclin institutionnel : pourquoi tout se dégrade légèrement",
    sinstitutionBody:
      "Le résultat n'est pas un effondrement dramatique. C'est une perte de qualité omniprésente et au ralenti. Les soins de santé se dégradent légèrement. L'éducation se dégrade légèrement. L'entretien des infrastructures prend légèrement du retard. Le service client décline. Les candidats politiques sont légèrement moins compétents. Chacun individuellement sans remarque. Ensemble, le schéma est civilisationnel.",
    sinstitutionData:
      "Le Edelman Trust Barometer 2025 confirme : la confiance dans toutes les institutions — gouvernement, médias, ONG, employeurs — a décliné dans presque tous les segments démographiques. Ce n'est pas un phénomène partisan. C'est un phénomène de substrat.",

    sfixableTitle: "La fraction réparable",
    sfixableLead:
      "Si les changements comportementaux documentés sur cette page étaient entièrement idéologiques — si les gens étaient moins motivés, plus anxieux, plus conformistes et moins confiants uniquement à cause des idées — la solution nécessiterait de changer des milliards de mentalités. L'histoire suggère que c'est extrêmement difficile. Mais si une fraction significative de ces changements a une base biologique, alors une partie de la solution est environnementale, pas idéologique.",
    sfixableSolutions: [
      "Réduire l'exposition aux EMF dans les espaces de vie et de travail",
      "Modulation des canaux calciques (264 625 patients montrent déjà un bénéfice psychiatrique des CCB prescrits pour des conditions cardiovasculaires)",
      "Supplémentation en magnésium (antagoniste naturel du Ca²⁺)",
      "Restauration de la mélatonine (réparation circadienne)",
      "Hygiène du sommeil (mélatonine → GnRH → récupération de la T)",
      "Contact physique et communauté (restauration de l'ocytocine)",
    ],
    sfixableConclusion:
      "Aucune de ces mesures ne nécessite que quiconque change ses croyances. Elles nécessitent de modifier l'environnement électromagnétique et de soutenir les systèmes biologiques que les hormones régulent. Si même 20–30 % de la crise actuelle de motivation, de confiance et de cohésion sociale est biologique plutôt qu'idéologique, c'est 20–30 % qui peut être traité sans conflit politique. C'est l'implication la plus importante sur le plan pratique du modèle BERM : non pas que la civilisation est condamnée, mais qu'une partie de son déclin a une cause spécifique, identifiable et potentiellement réversible.",

    shistoryTitle: "Lire l'histoire à travers le prisme hormonal",
    shistoryBody:
      "Chaque génération vit le même monde objectif à travers un substrat hormonal différent. Un homme en 1960 avec une testostérone à 600 ng/dL, un cortisol normal et une signalisation dopaminergique intacte vit un revers de carrière comme un défi à surmonter. Un homme en 2024 avec une testostérone à 350 ng/dL, un cortisol élevé et un tonus dopaminergique réduit vit le même revers comme une menace à éviter. Leurs valeurs peuvent être identiques. Leur capacité biologique à agir selon ces valeurs ne l'est pas.",
    shistoryOlder:
      "Quand les générations plus âgées disent « on s'en sortait, c'est tout », elles ne décrivent pas un caractère supérieur. Elles décrivent un environnement hormonal différent dans lequel le seuil d'action était plus bas et le seuil d'évitement était plus haut.",
    shistoryYounger:
      "Quand les générations plus jeunes disent « le monde est plus stressant », elles ne décrivent pas un monde plus dangereux (il est objectivement plus sûr). Elles décrivent le même monde vécu à travers un substrat hormonal qui détecte plus de menaces et génère moins de motivation pour les affronter.",
    shistoryConclusion:
      "Aucune génération n'a tort. Elles décrivent la même réalité à travers des filtres biologiques différents. Le conflit intergénérationnel qui en résulte — « jeunes paresseux » contre « boomers déconnectés » — est lui-même une conséquence du changement hormonal, pas la preuve d'une défaillance morale d'un côté ou de l'autre.",

    sideologyTitle: "L'idéologie comme conséquence en aval",
    sideologyBody:
      "La même idée — « la sécurité est importante » — produit des résultats politiques différents selon le substrat hormonal de la population qui la porte.",
    sideologyHigh:
      "À T=500 ng/dL, cortisol=normal : « La sécurité est importante » → construire des infrastructures sûres, appliquer les lois, affronter les menaces directement.",
    sideologyLow:
      "À T=320 ng/dL, cortisol=élevé : « La sécurité est importante » → éliminer tout risque, élargir les définitions du préjudice, éviter la confrontation en supprimant le stimulus causant la confrontation.",
    sideologyExplain:
      "L'idée n'a pas changé. La capacité biologique à la mettre en œuvre, si. Ce n'est pas gauche contre droite. Ce n'est pas progressiste contre conservateur. C'est un changement biologique du seuil de mise en œuvre du même ensemble de valeurs que les deux côtés partagent largement. Les deux côtés veulent la sécurité. Les deux côtés veulent l'équité. Les deux côtés veulent les opportunités. Le désaccord porte sur le comment — et le « comment » est modulé par les seuils hormonaux.",
    sideologyTestable:
      "C'est vérifiable. Si les attitudes politiques sur la sécurité, le risque et l'autorité sont corrélées aux profils hormonaux individuels (T, cortisol, OT) après contrôle des données démographiques et de l'idéologie déclarée, l'hypothèse de modération biologique gagne en crédibilité. Plusieurs études ont trouvé exactement cela : la testostérone est corrélée aux attitudes politiques sur l'autorité, la compétition et la redistribution à travers les cultures.",

    s7title: "La prédiction récursive",
    s7body:
      "BERM fait une prédiction inhabituelle : sa propre réception est une preuve de sa thèse. Si le déclin de la testostérone réduit la prise de risque, l'esprit de compétition et la présentation authentique de soi au niveau populationnel, alors la communauté scientifique — composée d'humains soumis au même environnement hormonal — devrait manifester une volonté réduite de contester le consensus, de poursuivre des directions de recherche controversées et de défendre des résultats impopulaires. Le modèle prédit que la recherche sur les bioeffets des EMF sera sous-financée, stigmatisée et institutionnellement découragée — non pas parce que les preuves sont faibles, mais parce que le substrat hormonal qui anime la prise de risque intellectuelle est en déclin. C'est vérifiable : l'allocation de financement pour la recherche sur les bioeffets des EMF en proportion du financement total NIH/ERC devrait être en déclin, et les chercheurs du domaine devraient rapporter des pénalités de carrière croissantes pour la publication de résultats positifs.",

    s8title: "L'esprit dopaminergique",
    s8body:
      "L'hypothèse de l'esprit dopaminergique de Barzilai propose que les traits cognitifs animés par la dopamine — curiosité, créativité, exploration, tolérance au risque, orientation vers l'avenir — ont été centraux dans l'émergence de la cognition humaine moderne. BERM ajoute un mécanisme : si les EMF perturbent VTA Cav1.3 → libération de dopamine, et que le déclin de la testostérone réduit encore l'expression des récepteurs DA, alors le déclin populationnel de la fonction dopaminergique représente une inversion partielle de la révolution cognitive. Ce n'est pas une affirmation sur l'intelligence (l'IQ peut rester stable ou même augmenter par les effets Flynn). C'est une affirmation sur le style cognitif : le passage de l'exploration à l'exploitation, de la prise de risque à l'évitement du risque, de l'innovation à l'optimisation. Une société avec une fonction dopaminergique en déclin ne cesse pas de penser — elle cesse de prendre des risques intellectuels.",

    s8bTitle: "Boucles de rétroaction cybernétiques",
    s8bLead: "Les effets au niveau civilisationnel ne sont pas unidirectionnels. Les changements comportementaux se répercutent sur les schémas d'exposition, créant des boucles auto-renforçantes qui accélèrent le processus.",
    s8bPositiveTitle: "Boucles positives (amplificatrices)",
    s8bPositiveLoops: [
      "Utilisation du smartphone ↑ → mélatonine ↓ → qualité du sommeil ↓ → fatigue diurne ↑ → plus d'utilisation du smartphone (compensation dopaminergique)",
      "Testostérone ↓ → évitement du risque ↑ → temps en intérieur ↑ → exposition EMF ↑ → testostérone ↓ encore",
      "Anxiété sociale ↑ → préférence communication digitale ↑ → temps d'écran ↑ → ocytocine ↓ → plus d'anxiété sociale",
    ],
    s8bNegativeTitle: "Boucles négatives (stabilisatrices)",
    s8bNegativeLoops: [
      "Fatigue ↑ → inactivité physique ↑ → moins de temps dehors → moins d'UV → moins de vitamine D → tampon Ca²⁺ affaibli → sensibilité EMF accrue",
      "Troubles du sommeil ↑ → consommation de caféine ↑ → adaptation des récepteurs adénosine → neuroprotection partielle (A₁ → modulation VGCC)",
    ],
    s8bImplication: "Les boucles positives dominent. Chaque génération commence avec un niveau hormonal de base plus bas et un EMF ambiant plus élevé que la précédente. Les boucles stabilisatrices (caféine, exercice) exigent un effort conscient — les boucles amplificatrices fonctionnent automatiquement. Cette asymétrie est le mécanisme par lequel une petite perturbation initiale produit de grands effets civilisationnels sur des décennies.",
    s8cTitle: "Préférence temporelle et décisions de fécondité",
    s8cLead: "L'escompte hyperbolique — la tendance à préférer fortement les récompenses immédiates aux futures — a un substrat hormonal. Quand ce substrat change, les préférences temporelles se déplacent, et les décisions de fécondité suivent.",
    s8cMechanism: "La testostérone influence l'escompte temporel par deux voies : (1) directement, via la densité des récepteurs androgènes dans le cortex préfrontal ; (2) indirectement, via la dopamine — la testostérone régule l'expression des récepteurs D2 dans le striatum, et la dopamine médie l'évaluation des récompenses différées. Quand les deux déclinent simultanément, le présent pèse plus lourd et l'avenir plus léger.",
    s8cFertility: "La fécondité est la décision orientée vers l'avenir par excellence : coût élevé maintenant, récompense incertaine des années plus tard. Un déplacement populationnel vers l'orientation présent prédit le report de la fécondité — non parce que les enfants sont jugés indésirables, mais parce que le seuil hormonal pour s'engager dans un projet à coût élevé et horizon long s'élève.",
    s8cTestable: "Vérifiable : les taux d'escompte individuels (mesurés par des tâches de récompense différée) devraient corréler avec les marqueurs de testostérone et de dopamine, et prédire le calendrier de fécondité après contrôle des intentions déclarées, du revenu et de l'éducation.",

    sIQSTitle: "Le broyeur de QI", sIQSSubtitle: "Un diagnostic biologique", sIQSLead: "", sIQSBiological: "", sIQSNotChoice: "",
    sIQSComponents: "", sIQSComponentsDesc: "", sIQSRepro: "", sIQSReproDesc: "", sIQSDA: "", sIQSDADesc: "",
    sIQSTime: "", sIQSTimeDesc: "", sIQSBurn: "", sIQSBurnDesc: "", sIQSEff: "", sIQSEffDesc: "",
    sIQSTable: "", sIQSTableDesc: "", sIQSEnv: "Environnement", sIQSReproCol: "Suppression repro", sIQSDACol: "Capture DA",
    sIQSTimeCol: "Pref temporelle", sIQSBurnCol: "Taux de combustion", sIQSEffCol: "Efficacite broyeur", sIQSBiocapCol: "BioCap",
    sIQSMeta: "", sIQSMetaDesc: "", sIQSPredictions: "", sIQSPred1: "", sIQSPred2: "", sIQSPred3: "",
    sIQSLit: [] as string[],

    s9title: "Prédictions vérifiables",
    s9lead:
      "Chaque prédiction spécifie un critère de falsification. Un modèle qui ne peut être falsifié n'est pas de la science.",
    civPredictions: [
      {
        id: "CIV-1",
        title: "Le déclin de la T continue indépendamment du mode de vie",
        detail:
          "Le déclin de la testostérone au niveau populationnel continuera même après contrôle de l'obésité, du tabagisme, de l'alcool et du sommeil — parce que le facteur principal est l'EMF environnemental, pas le mode de vie.",
        falsification:
          "Le déclin de la T entièrement expliqué par des facteurs de mode de vie dans une grande cohorte après ajustement",
      },
      {
        id: "CIV-2",
        title: "Les communautés à faible EMF maintiennent une T plus élevée",
        detail:
          "Les communautés Amish, Mennonite et autres à faible exposition aux EMF devraient maintenir une testostérone ajustée selon l'âge plus élevée que les populations urbaines appariées.",
        falsification:
          "Aucune différence de T entre les communautés à faible EMF et à fort EMF après ajustement démographique",
      },
      {
        id: "CIV-3",
        title: "Les utilisateurs de CCB montrent un déclin comportemental atténué",
        detail:
          "Les utilisateurs de CCB à long terme devraient montrer moins de déclin des comportements dépendants de la T (entrepreneuriat, prise de risque) par rapport aux utilisateurs d'antihypertenseurs non-CCB.",
        falsification:
          "Aucune différence comportementale entre les utilisateurs d'antihypertenseurs CCB et non-CCB",
      },
      {
        id: "CIV-4",
        title: "Le TFR corrèle avec la densité d'EMF, pas uniquement le GDP",
        detail:
          "Après contrôle du GDP, de l'éducation et de l'urbanisation, la densité d'infrastructure EMF devrait prédire indépendamment le déclin du TFR entre les pays.",
        falsification:
          "Aucune corrélation résiduelle entre la densité d'EMF et le TFR après contrôles socioéconomiques",
      },
      {
        id: "CIV-5",
        title: "La suppression comportementale se reverse avec la réduction des EMF",
        detail:
          "Les individus qui réduisent substantiellement leur exposition aux EMF (par ex., déménagement dans un environnement à faible EMF) devraient montrer une récupération mesurable des comportements dépendants de la T dans les 6–12 mois.",
        falsification:
          "Aucune récupération comportementale après une réduction soutenue des EMF dans une étude contrôlée",
      },
      {
        id: "CIV-6",
        title: "La probabilité de formation du couple décline de manière multiplicative",
        detail:
          "Si l'approche masculine (dépendante de la T) et la réceptivité féminine (dépendante de l'OT) déclinent chacune de X %, la formation réussie du couple devrait décliner de X² %, pas de 2X %. Vérifiable avec les données du marché des rencontres combinées aux mesures hormonales.",
        falsification:
          "Le taux de formation du couple décline linéairement avec les mesures hormonales individuelles",
      },
      {
        id: "CIV-7",
        title:
          "La crise de santé mentale des adolescentes corrèle avec le matériel, pas le contenu",
        detail:
          "BERM prédit que la composante matérielle des EMF (cortisol via HPA, mélatonine via la pinéale) compte plus que le contenu des réseaux sociaux. Les filles qui utilisent autant les smartphones mais dans des environnements à faible EMF devraient montrer moins d'augmentation de l'anxiété.",
        falsification:
          "Aucune différence d'anxiété entre les utilisatrices de smartphones à fort EMF et à faible EMF",
      },
      {
        id: "CIV-8",
        title:
          "Le déclin hormonal intergénérationnel s'accélère sans augmentation des EMF",
        detail:
          "La sensibilisation CaMKII + la transmission épigénétique prédisent que même un EMF constant produit un déclin hormonal accéléré d'une génération à l'autre. Vérifiable en comparant les taux de déclin de la T entre cohortes générationnelles au même âge.",
        falsification:
          "Le taux de déclin de la T est constant entre les générations à des âges équivalents",
      },
      {
        id: "CIV-9",
        title:
          "Les comportements dépendants de l'ocytocine déclinent avec l'environnement EMF",
        detail:
          "Le bénévolat, la participation communautaire, les dons caritatifs, la confiance interpersonnelle — tous dépendants de l'OT — devraient corréler négativement avec l'environnement EMF entre les pays et au fil du temps.",
        falsification:
          "Aucune corrélation entre l'environnement EMF et les comportements sociaux dépendants de l'OT",
      },
      {
        id: "CIV-10",
        title: "L'IVF devient une infrastructure démographique d'ici 2040",
        detail:
          "Lorsque la fécondabilité biologique tombe en dessous de ~30 % des couples parvenant à une grossesse dans les 12 mois sans assistance, l'IVF passe d'une intervention médicale à une infrastructure démographique. Prévu : South Korea d'ici 2030, Japan d'ici 2035, la majeure partie de Europe d'ici 2040.",
        falsification:
          "Les taux de grossesse sans assistance restent au-dessus de 70 % jusqu'en 2040 dans les pays à fort EMF",
      },
      {
        id: "CIV-11",
        title: "L'écart de comportement en ligne/hors ligne corrèle avec le niveau de T de la population",
        detail:
          "Les populations avec un taux moyen de T plus élevé montrent moins de divergence entre le comportement en ligne et en personne. Les communautés à faible EMF montrent un écart minimal.",
        falsification:
          "Aucune corrélation entre la T de la population et la divergence de comportement en ligne/hors ligne",
      },
      {
        id: "CIV-12",
        title: "Le taux de dérive conceptuelle corrèle avec les tendances du cortisol entre les pays",
        detail:
          "Les pays avec une augmentation plus rapide du cortisol (ou un déclin plus rapide de la T) montrent une expansion plus rapide des concepts liés au préjudice dans le langage juridique, académique et médiatique.",
        falsification:
          "Aucune corrélation entre les tendances hormonales et le taux de dérive conceptuelle",
      },
      {
        id: "CIV-13",
        title: "La tension intergénérationnelle est la plus faible dans les communautés à faible EMF",
        detail:
          "Les communautés Amish et similaires avec des niveaux hormonaux stables entre les générations montrent moins de conflit intergénérationnel que les sociétés à fort EMF.",
        falsification:
          "Les communautés à faible EMF montrent une tension intergénérationnelle comparable aux moyennes nationales",
      },
      {
        id: "CIV-14",
        title: "Les attitudes politiques sur le risque et l'autorité corrèlent avec la T individuelle après contrôles démographiques",
        detail:
          "Au sein de la population : les individus avec une T plus élevée favorisent les solutions basées sur la confrontation ; une T plus basse favorise les solutions basées sur l'évitement — indépendamment de l'idéologie déclarée.",
        falsification:
          "Aucune corrélation résiduelle de la T avec les préférences politiques après contrôles démographiques",
      },
    ],

    lostRecoveryTitle: "La fenêtre de récupération perdue",
    lostRecoveryDesc: "Pour la première fois dans l'histoire humaine, il n'y a aucune période de la journée sans exposition significative aux EMF. Le réseau électrique fonctionne 24h/24. Les routeurs WiFi ne sont jamais éteints. Les lumières LED fonctionnent jusqu'au coucher. Le téléphone repose sur la table de nuit toute la nuit. Les appareils Bluetooth maintiennent des connexions en permanence.",
    lostRecoveryMechanism: "La déphosphorylation de CaMKII — le processus de récupération moléculaire — nécessite du temps sans surcharge de Ca²⁺. Les humains pré-électrification avaient 22+ heures par jour sans aucun EMF artificiel. Les urbains modernes en ont approximativement zéro. Le confinement COVID l'a démontré expérimentalement : 24 heures/jour à domicile avec WiFi + LED + appareils multiples a éliminé la dernière fenêtre de récupération — et l'accélération du T2D est passée de 2.90 % à 3.52 %/an.",
    lostRecoveryIntervention: "C'est aussi l'enseignement le plus actionnable du modèle : une chambre sans EMF est l'intervention la plus simple. Aucun changement alimentaire, aucun médicament, aucune refonte du mode de vie — il suffit de retirer le routeur, d'utiliser le mode avion la nuit et de passer à l'éclairage à incandescence avant de dormir.",

    buildingTitle: "Villes de béton : amplification intégrée des EMF",
    buildingDesc: "L'urbanisation n'est pas seulement un changement social — c'est un changement électromagnétique. Le béton armé réfléchit les RF en interne (les armatures en acier agissent comme une cage de Faraday partielle inversée), augmentant l'intensité du champ intérieur. Le bois est transparent aux RF — le champ le traverse et se dissipe. Lorsque les populations rurales ont migré vers les villes de béton, elles ont simultanément augmenté leur exposition ambiante aux EMF par un mécanisme que personne ne mesurait.",
    buildingEvidence: "Les pièces en bois produisent un meilleur sommeil, une fréquence cardiaque plus basse et de meilleures performances cognitives comparées aux pièces en béton ([[ref:wood_health2026|BIOBUILDS 2026]]). Explication conventionnelle : biophilie. Ajout de BERM : coefficient de réflexion RF. Les deux peuvent être corrects — mais le mécanisme EMF est vérifiable et le mécanisme de biophilie ne l'est pas.",

    animalsFellTitle: "Les animaux sont tombés en premier",
    animalsFellDesc: "Si les EMF affectent la biologie au niveau fondamental du Ca²⁺ et du CRY, alors les espèces avec une sensibilité plus élevée auraient dû décliner en premier — et c'est ce qui s'est passé. Les grenouilles (peau humide, couplage direct au Ca²⁺) ont commencé à décliner vers 1987 lors du déploiement du GSM. Les abeilles (navigation dépendante du CRY) se sont effondrées en 2006 lorsque les antennes-relais ont atteint les zones rurales. La biomasse d'insectes a chuté de 75 % sur 27 ans. Les populations d'oiseaux ont suivi. Les mammifères — y compris les humains — sont les moins sensibles en raison de leur peau sèche et de leur masse corporelle importante, mais les effets sont cumulatifs sur de longues durées de vie.",
    animalsFellAnalogy: "L'analogie du canari dans la mine n'est pas métaphorique — elle est mécanistique. Les mêmes canaux ioniques, les mêmes magnétorécepteurs, la même signalisation Ca²⁺. Les animaux n'ont pas décliné pour des raisons distinctes qui se trouvent être corrélées. Ils ont décliné par le même mécanisme à des seuils de sensibilité différents.",

    civilizationNote: "La perspective civilisationnelle — capacite de charge biologique, durees de vie des empires, cycles solaires et mecanisme d'activation — est exploree dans Patopoliteia.",
    svgMaleLower: "masculin",
    svgFemaleLower: "féminin",
    svgReduction: "réduction",
    svgStart: "début",
    svgSperm: "sperme",
    svgOocyte: "ovocyte",
    svgTiming: "timing",
    svgMotivation: "motivation",
    svgFecundability: "fécondabilité",
    svgTestosterone: "Testostérone",
    svgOxytocin: "Ocytocine",
    scoreConsistent: "cohérent",
    svgNeutral: "neutre",
    svgPhysical: "Physique",
    svgConformity: "Conformité",
    svgHighThreshold: "seuil élevé",
    svgDigital: "Numérique",
    svgOutragePolarization: "Indignation et polarisation",
    svgNearZeroCost: "coût quasi nul",
    svgThresholdVsCost: "seuil biologique vs coût numérique",
    civTested: "vérifié",
    civAwaitingTesting: "Tous en attente de vérification empirique",
    modelDerived: "", modelDerivedLink: "",
    scoreExplain: "",
    sPronatalistTitle: "", sPronatalistBody1: "", sPronatalistBody2: "", sPronatalistBody3: "",
    sCcbTitle: "", sCcbBody: "",
    sMagnesiumTitle: "", sMagnesiumBody: "",
    animalsFellHierarchy: "", animalsFellItems: [] as { species: string; detail: string; evidence: string }[], animalsFellConclusion: "",
  },
  ko: {
    title: "파토폴리스",
    subtitle: "도시가 문명의 생물학적 기반을 어떻게 퇴화시키는가",
    heroLead: "도시는 단순한 사회적 환경이 아니라 전자기적 환경이다. 콘크리트 벽은 반사하고, 전선은 윙윙거리며, 모든 기기는 맥동한다. 이 페이지는 그 환경이 신체, 가족, 제도, 문명에 무엇을 하는지 추적한다.",
    civilizationLink: "문명으로 돌아가기",
    patokratiaLink: "파토크라티아",
    patokinesisLink: "파토키네시스",
    mechanismNote: "근본 메커니즘 — EMF가 칼슘 채널을 교란하여 성별 특이적 호르몬 캐스케이드를 생성하는 방법 — 은 파토페게에서 설명됩니다.",
    s5title: "복합 효과",
    s5lead:
      "개인 수준의 호르몬 변화는 모든 인간 쌍의 양측에 동시에 영향을 미칠 때 문명적 변화가 됩니다. 짝결합에는 접근하는 남성과 신뢰하는 여성이 필요합니다. 생식에는 기능적인 정자와 기능적인 난모세포가 필요합니다. 육아에는 아버지의 투자와 어머니의 유대가 필요합니다. EMF가 양측을 동시에 교란하면, 결과는 가산적이지 않습니다 — 곱셈적입니다.",

    s5aTitle: "짝결합 분기",
    s5aMaleDeficit:
      "접근 동기 ↓ (T↓ → [[ref:goetz2024|Goetz 2024]])",
    s5aMaleMech:
      "테스토스테론 감소는 성적 접근의 생물학적 역치를 높입니다. 관심으로 해석되는 신호 감소 → 시도되는 접근 감소.",
    s5aFemaleDeficit:
      "신뢰/유대 준비도 ↓ (OT↓ → 미주신경)",
    s5aFemaleMech:
      "옥시토신 감소는 신뢰 및 짝결합 형성의 생물학적 능력을 감소시킵니다. 높은 코르티솔은 사회적 평가에 불안을 더합니다.",
    s5aCompound:
      "남성 접근 × 여성 수용성. 양쪽 모두 40% 감소하면, 성공적 짝맺기 확률은 64% 감소합니다 (0.6 × 0.6 = 0.36 = 64% 감소). 이것은 어느 한쪽의 40% 단독 감소보다 더 심각합니다.",
    s5aObserved: [
      "모든 산업화 국가에서 무성관계 비율 상승",
      "데이팅 앱 사용은 증가하지만 관계 형성은 감소",
      "초혼 평균 연령 증가",
      "40세까지 '미혼' 비율 증가",
      "Japan: 18–34세 남성의 43%가 동정 (2015)",
      "South Korea: 출생률 0.72 (2024)",
    ],

    s5bTitle: "곱셈적 출산율 붕괴",
    s5bFormula:
      "출산율 = f(정자) × g(난모세포) × h(타이밍) × j(동기)",
    s5bFactors: [
      "f(정자): 농도 −62% ([[ref:levine2023_sperm|Levine 2023]])",
      "g(난모세포): AMH 감소, PCOS 증가, 예비력 조기 고갈",
      "h(타이밍): 일주기 교란 → 배란 타이밍 오류",
      "j(동기): T↓ (남성) × OT↓ (여성) → 시도 횟수 감소",
    ],
    s5bCompound:
      "각 요소가 30% 감소하면, 총 임신 가능성은 76% 감소합니다 (0.7⁴ = 0.24). 이것은 TFR이 단일 요인의 예측보다 더 빠르게 하락하는 이유 — 그리고 출산장려 정책이 실패하는 이유를 설명합니다. 정책은 돈으로 j(동기)에 대응합니다. f, g, h에는 대응할 수 없습니다 — 이것들은 생물학적이기 때문입니다.",

    s5cTitle: "아동 발달 연쇄",
    s5cBurdens: [
      {
        title: "부계 후성유전적 부담",
        detail:
          "아버지의 EMF 손상 정자 메틸롬 → 자녀의 유전자 발현 변화. 정자 DNA 단편화 → 발달 불안정성.",
      },
      {
        title: "모체 호르몬 환경",
        detail:
          "임신 중 어머니의 코르티솔↑ → 태아 HPA 프로그래밍 변경 → 자녀의 스트레스 반응성 영구적 상승. 어머니의 멜라토닌↓ → 태아 일주기 프로그래밍 교란.",
      },
      {
        title: "직접 태아 노출",
        detail:
          "EMF가 자궁을 관통 → 태아 VGCC 활성화 → Ca²⁺ 의존적 신경발달 교란. CACNA1C (Cav1.2): 시냅스 형성, 피질 층화, 흥분–억제 균형.",
      },
    ],
    s5cSpiral:
      "각 세대는 이전 세대보다 더 약한 기저선에서 출발합니다. CaMKII 매개 민감화는 각 세대가 동일한 EMF 용량에도 더 민감하다는 것을 의미합니다. 이것은 가속하는 나선을 만들어냅니다.",

    s5dTitle: "제도적 쇠퇴",
    s5dLead:
      "제도에는 두 가지 상호보완적 투입이 필요합니다:",
    s5dBuilding:
      "구축 (역사적으로 T 상관): 혁신, 위험 감수, 경쟁 의지, 자원 획득, 위계적 조직화, 불확실성 하의 장기 계획.",
    s5dMaintaining:
      "유지 (역사적으로 OT 상관): 신뢰, 협력, 공감, 갈등 해결, 돌봄, 사회 규범 집행, 내집단 결속.",
    s5dConclusion:
      "구축되지도 유지되지도 않는 제도는 극적으로 붕괴하지 않습니다 — 쇠퇴합니다. 서비스 품질이 저하됩니다. 신뢰가 잠식됩니다. 역량이 감소합니다. 기준이 낮아집니다. 이것은 위기로 보이지 않습니다 — 모든 것에서 동시에 나타나는 느린 품질 저하로 보입니다.",

    s5eTitle: "가속하는 나선",
    generations: [
      {
        label: "1세대 (출생 ~1940–1960)",
        emf: "낮음 (대규모 전기화 이전)",
        tLevel: "기저선 (~550 ng/dL, 30세 기준)",
        otLevel: "기저선",
        tfr: "2.5–3.5",
        institutional:
          "구축 단계: 전후 재건, 우주 프로그램, 경제 확장",
      },
      {
        label: "2세대 (출생 ~1960–1985)",
        emf: "상승 (전기화 + 초기 모바일)",
        tLevel: "−15–25%",
        otLevel: "감소 (도시화 → 신체 접촉 감소)",
        tfr: "1.8–2.2",
        institutional:
          "정점 및 정체: 제도 성숙, 혁신 둔화, 유지 점점 어려워짐",
      },
      {
        label: "3세대 (출생 ~1985–2010)",
        emf: "높음 (스마트폰, WiFi, 4G)",
        tLevel: "−30–40% ([[ref:santi2025|Santi 2025]])",
        otLevel: "심각하게 교란됨",
        tfr: "1.2–1.7",
        institutional:
          "쇠퇴 단계: 신뢰 붕괴, 제도적 기능 장애, 외로움 전염병",
      },
      {
        label: "4세대 (출생 ~2010–2035)",
        emf: "매우 높음 (5G, IoT, 태아기 노출)",
        tLevel: "−40–55% (예측 + 후성유전적 부담)",
        otLevel: "미지 — 완전한 태아기 노출을 경험한 최초의 세대",
        tfr: "0.7–1.3 (예측)",
        institutional:
          "위기 단계: 제도가 인력을 모집하거나 유지할 수 없음, IVF가 인구학적 인프라화",
      },
    ],
    generationInsight:
      "각 세대는 동일한 EMF 용량에 더 민감하고 (CaMKII 민감화), 더 약한 호르몬 기저선에서 출발합니다 (후성유전적 전달). 나선은 EMF 증가 없이도 가속합니다 — 그러나 EMF는 증가하고 있습니다 (5G, IoT, LED IF 방출).",

    s6title: "12가지 예측, 12가지 관찰",
    s6lead:
      "BERM은 호르몬 모델로부터 구체적인 행동적, 사회적 변화를 예측합니다. 각 예측은 호르몬 연결에 대한 RCT 증거에 기반하며; 각 관찰은 예측과 일치하는 인구 수준 데이터를 인용합니다.",
    predictions: [
      {
        prediction: "남성 지위 추구 감소",
        basis: "T → 지위 동기 ([[ref:dreher2016|Dreher 2016]], n=121)",
        observed:
          "창업률 감소, '조용한 퇴직', 설문조사에서 경력 야망 감소",
        consistent: true,
      },
      {
        prediction: "남성 위험 감수 감소",
        basis: "T → 경쟁적 위험 감수 (Competition 2024, n=220)",
        observed:
          "사업 창업 감소, 신체적 위험 활동 감소, 위험 회피 증가",
        consistent: true,
      },
      {
        prediction: "남성 성적 접근 감소",
        basis: "T → 성적 동기 ([[ref:goetz2024|Goetz 2024]], n=139)",
        observed:
          "무성관계 증가, 관계 주도 감소, Japan 18–34세 43% 동정",
        consistent: true,
      },
      {
        prediction: "남성 진정성 감소",
        basis: "T → 진정한 자기 표현 (Audience 2020, n=166)",
        observed:
          "사회 불안 증가, 인상 관리 증가, 수행적 정체성",
        consistent: true,
      },
      {
        prediction: "남성 집단 충성 감소",
        basis: "T → 내집단 편향 (Parochial 2015, n=100)",
        observed:
          "시민 참여 감소, 노조/정당 회원 감소, 제도적 이탈",
        consistent: true,
      },
      {
        prediction: "남성 도발 반응 감소",
        basis: "T → 반응적 공격성 (Carré 2017, n=308)",
        observed:
          "폭력 범죄율 감소, 대결 의지 감소, 갈등 회피",
        consistent: true,
      },
      {
        prediction: "남성 인지 스타일이 숙고 쪽으로 이동",
        basis: "T → 숙고보다 직감 (Nave 2018, n=243)",
        observed:
          "결정 마비 증가, 분석 마비, 자발적 행동 감소",
        consistent: true,
      },
      {
        prediction: "남성 동기/보상 민감도 감소",
        basis: "T↓ → DA↓ → 무쾌감증 (Soares-Cunha 2016)",
        observed:
          "우울증 증가, '자립 실패', NEET 비율 증가, 보상 대체로서의 게임/스트리밍",
        consistent: true,
      },
      {
        prediction: "여성 불안/우울 성별 격차 확대",
        basis:
          "에스트로겐이 HPA 반응성을 증폭. EMF → cortisol↑이 여성에게 더 크게 영향.",
        observed:
          "여성 불안 2배, 우울 2배 비율. 2010년 이후 격차 확대. 10대 소녀 정신건강 위기 ~2012년 이후.",
        consistent: true,
      },
      {
        prediction: "기관 신뢰 전 세계적으로 감소",
        basis:
          "OT → 신뢰 (Kosfeld 2005, Nature). EMF → 미주신경 긴장도 ↓ → OT ↓.",
        observed:
          "Edelman 2025: 모든 기관에 대한 신뢰 역대 최저. 외로움 전염병 선언. 사회적 자본 감소.",
        consistent: true,
      },
      {
        prediction: "PCOS 유병률이 EMF 보급과 함께 증가",
        basis:
          "PCOS = 4기관 VGCC 수렴 (췌장 + 난소 + 뇌하수체 + 부신).",
        observed:
          "PCOS 유병률 5–20%, 증가 중. 여성 불임의 가장 흔한 원인. 대사증후군과 상관.",
        consistent: true,
      },
      {
        prediction: "각 세대가 이전보다 더 민감",
        basis:
          "CaMKII → Cav3.2 역치 ↓ (PMC9913649). 후성유전적 전달 (정자 메틸롬).",
        observed:
          "정신건강 위기 발생이 각 코호트에서 더 이른 시기. ASD/ADHD 유병률 세대별 증가. 여아 사춘기 시작 조기화.",
        consistent: true,
      },
    ],

    sProjectionTitle: "호르몬 데이터가 사회에 대해 예측하는 것",
    sProjectionLead:
      "위의 12가지 예측은 개인 행동 변화를 추적합니다. 그러나 개인은 고립되어 존재하지 않습니다. 이들은 부부, 가족, 팀, 제도, 국가를 형성합니다. 전체 인구의 호르몬 기반이 변하면, 집합적 효과는 이념적 변화, 문화적 갈등, 도덕적 쇠퇴처럼 보이지만 상당 부분 문화적 변화로 경험되는 생물학적 전환일 수 있는 창발적 사회 현상을 만들어냅니다.",
    sProjectionNote:
      "이 구분은 중요합니다. 만약 사회 문제가 이념적이라면, 해결책은 생각을 바꿀 것을 요구합니다. 만약 부분적으로 생물학적이라면, 해결책은 환경을 바꾸는 것을 포함합니다. 후자가 더 쉽습니다.",

    spolarTitle: "양극화: 디지털 용기, 물리적 순응",
    spolarBody:
      "관객 효과 RCT (2020)는 낮은 테스토스테론이 전략적 친사회성을 증가시킨다는 것을 보여주었습니다 — 당신이 믿는 것이 아니라 관객이 기대하는 것을 말하는 것. 도발 RCT (Carré 2017)는 낮은 테스토스테론이 불의에 대한 반응적 반응을 감소시킨다는 것을 보여주었습니다. 함께 이들은 특정 패턴을 예측합니다: 사람들은 물리적 현존에서는 순응적이지만 화면 뒤에서는 대결적일 것입니다.",
    spolarObserved:
      "이것이 정확히 관찰되는 현상입니다. 온라인 양극화는 역대 최고입니다. 물리적 대결은 역대 최저입니다. 사람들은 직접 대면해서는 절대 말하지 않을 견해를 익명으로 표현합니다. 댓글 섹션은 전장이고, 회의실은 반향실입니다.",
    spolarExplain:
      "이것은 위선이 아닙니다. 생물학입니다. 낮은 테스토스테론은 진정한 대결의 역치를 높입니다. 디지털 환경은 대결의 사회적 비용을 거의 0으로 낮춥니다. 생물학적 역치와 환경적 비용 사이의 불일치가 패턴을 만듭니다: 온라인에서는 대담하고, 오프라인에서는 침묵합니다.",
    spolarPrediction:
      "BERM 예측: 평균 T가 높은 인구 (예: 저EMF 공동체)는 온라인과 오프라인 행동 간 차이가 적어야 합니다.",
    spolarPhysical: "물리적 환경",
    spolarPhysicalThreshold: "높음 (대면 사회적 비용)",
    spolarPhysicalBehavior: "순응, 자기검열, 동조",
    spolarPhysicalRct: "Audience 2020: 낮은 T → 전략적 친사회성",
    spolarDigital: "디지털 환경",
    spolarDigitalThreshold: "거의 0 (익명성, 거리)",
    spolarDigitalBehavior: "분노, 양극화, 대결",
    spolarDigitalRct: "Carré 2017: 비용이 낮을 때 도발 반응 지속",

    ssafetyTitle: "안전 추구: 호르몬 역치이지 가치 선택이 아님",
    ssafetyBody:
      "위험 감수는 테스토스테론과 함께 감소합니다 (Competition RCT 2024, n=333). 불안은 코르티솔과 함께 증가합니다 ([[ref:dual_hormone_meta2021|이중 호르몬 메타, n=8,538]]). 위협 민감도는 양쪽이 동시에 변할 때 증가합니다. 인구 수준에서 이것은 더 많은 상황을 위협으로 경험하는 사회를 만들어냅니다 — 환경이 더 위험해져서가 아니라 (폭력 범죄는 역대 최저입니다) 위협 인식의 생물학적 역치가 낮아졌기 때문입니다.",
    ssafetyParadox:
      "이것은 달리 역설적인 패턴을 설명합니다: 인류 역사상 가장 안전한 사회가 가장 높은 불안을 보고합니다. 객관적 위험은 줄었습니다. 주관적 위협은 늘었습니다. 둘 사이의 간극이 호르몬 변화입니다.",
    ssafetyCreep:
      "위협 인식이 실제 위협 증가 없이 상승하면, 심리학자들이 \"개념 확장\"이라 부르는 것이 나타납니다: 이전에 중립적이던 현상을 포괄하도록 해악 관련 개념이 확장되는 것. 말이 폭력이 됩니다. 의견 불일치가 공격이 됩니다. 불편함이 트라우마가 됩니다. 이것은 도덕적 진보도 도덕적 쇠퇴도 아닙니다. 다른 호르몬 기반 위에서 작동하는 재보정된 위협 탐지 시스템입니다.",

    sinstitutionTitle: "제도적 쇠퇴: 왜 모든 것이 조금씩 나빠지는가",
    sinstitutionBody:
      "결과는 극적인 붕괴가 아닙니다. 전반적이고 느린 품질 저하입니다. 의료가 약간 나빠집니다. 교육이 약간 나빠집니다. 인프라 유지보수가 약간 뒤처집니다. 고객 서비스가 저하됩니다. 정치 후보가 약간 덜 유능합니다. 각각은 개별적으로 주목할 만하지 않습니다. 함께 모으면, 그 패턴은 문명적입니다.",
    sinstitutionData:
      "2025 Edelman Trust Barometer가 확인합니다: 모든 기관에 대한 신뢰 — 정부, 미디어, NGO, 고용주 — 가 거의 모든 인구 집단에서 감소했습니다. 이것은 당파적 현상이 아닙니다. 기반 현상입니다.",

    sfixableTitle: "수정 가능한 부분",
    sfixableLead:
      "이 페이지에 기록된 행동 변화가 전적으로 이념적이라면 — 사람들이 순전히 사상 때문에 덜 동기부여되고, 더 불안하고, 더 순응적이고, 덜 신뢰한다면 — 해결책은 수십억 명의 생각을 바꿀 것을 요구할 것입니다. 역사는 이것이 극히 어렵다고 시사합니다. 그러나 이러한 변화의 상당 부분이 생물학적 기반을 가진다면, 해결책의 일부는 이념적이 아니라 환경적입니다.",
    sfixableSolutions: [
      "생활 및 업무 공간에서 EMF 노출 감소",
      "칼슘 채널 조절 (264,625명의 환자가 심혈관 질환용 CCB 처방으로 이미 정신과적 이점을 보임)",
      "마그네슘 보충 (천연 Ca²⁺ 길항제)",
      "멜라토닌 회복 (일주기 복구)",
      "수면 위생 (멜라토닌 → GnRH → T 회복)",
      "신체 접촉과 공동체 (옥시토신 회복)",
    ],
    sfixableConclusion:
      "이것들 중 어떤 것도 누군가의 신념을 바꿀 것을 요구하지 않습니다. 전자기 환경을 바꾸고 호르몬이 조절하는 생물학적 시스템을 지원할 것을 요구합니다. 현재의 동기, 신뢰, 사회적 결속의 위기 중 20–30%만이라도 이념적이 아니라 생물학적이라면, 그것은 정치적 갈등 없이 해결할 수 있는 20–30%입니다. 이것이 BERM 모델의 가장 실천적으로 중요한 함의입니다: 문명이 운명지어졌다는 것이 아니라, 그 쇠퇴의 일부에 구체적이고, 식별 가능하며, 잠재적으로 되돌릴 수 있는 원인이 있다는 것입니다.",

    shistoryTitle: "호르몬 렌즈로 역사 읽기",
    shistoryBody:
      "모든 세대는 동일한 객관적 세계를 다른 호르몬 기반을 통해 경험합니다. 1960년에 테스토스테론 600 ng/dL, 정상 코르티솔, 온전한 도파민 신호 체계를 가진 남성은 경력 좌절을 극복해야 할 도전으로 경험합니다. 2024년에 테스토스테론 350 ng/dL, 상승한 코르티솔, 감소한 도파민 기능을 가진 남성은 같은 좌절을 회피해야 할 위협으로 경험합니다. 그들의 가치관은 동일할 수 있습니다. 그 가치관에 따라 행동할 생물학적 능력은 다릅니다.",
    shistoryOlder:
      "이전 세대가 \"우리는 그냥 해냈다\"라고 말할 때, 그들은 우월한 인격을 묘사하는 것이 아닙니다. 행동의 역치가 더 낮고 회피의 역치가 더 높았던 다른 호르몬 환경을 묘사하고 있습니다.",
    shistoryYounger:
      "젊은 세대가 \"세상이 더 스트레스 받는다\"라고 말할 때, 그들은 더 위험한 세상을 묘사하고 있는 것이 아닙니다 (세상은 객관적으로 더 안전합니다). 그들은 더 많은 위협을 감지하고 그에 맞설 동기를 덜 생성하는 호르몬 기반을 통해 경험되는 같은 세상을 묘사하고 있습니다.",
    shistoryConclusion:
      "어느 세대도 틀리지 않았습니다. 그들은 같은 현실을 다른 생물학적 필터를 통해 묘사하고 있습니다. 그로 인한 세대 간 갈등 — \"게으른 젊은이들\" 대 \"현실 감각 없는 기성세대\" — 은 그 자체로 호르몬 변화의 결과이지, 어느 쪽의 도덕적 실패의 증거가 아닙니다.",

    sideologyTitle: "하류 현상으로서의 이념",
    sideologyBody:
      "같은 생각 — \"안전이 중요하다\" — 이 그 생각을 가진 인구의 호르몬 기반에 따라 다른 정치적 결과를 만들어냅니다.",
    sideologyHigh:
      "T=500 ng/dL, cortisol=정상일 때: \"안전이 중요하다\" → 안전한 인프라를 구축하고, 법을 집행하고, 위협에 직접 대결한다.",
    sideologyLow:
      "T=320 ng/dL, cortisol=상승일 때: \"안전이 중요하다\" → 모든 위험을 제거하고, 해악의 정의를 확장하고, 대결을 유발하는 자극을 제거하여 대결을 피한다.",
    sideologyExplain:
      "생각은 변하지 않았습니다. 그것을 실행할 생물학적 능력이 변했습니다. 이것은 좌파 대 우파가 아닙니다. 진보 대 보수가 아닙니다. 양쪽이 대체로 공유하는 같은 가치관 세트에 대한 실행 역치의 생물학적 전환입니다. 양쪽 모두 안전을 원합니다. 양쪽 모두 공정을 원합니다. 양쪽 모두 기회를 원합니다. 불일치는 방법에 대한 것이며 — \"방법\"은 호르몬 역치에 의해 조절됩니다.",
    sideologyTestable:
      "이것은 검증 가능합니다. 만약 안전, 위험, 권위에 대한 정치적 태도가 인구통계와 명시적 이념을 통제한 후에도 개인 호르몬 프로파일 (T, cortisol, OT)과 상관관계가 있다면, 생물학적 조절 가설이 지지를 얻습니다. 여러 연구가 정확히 이것을 발견했습니다: 테스토스테론은 문화권 전반에서 권위, 경쟁, 재분배에 대한 정치적 태도와 상관관계가 있습니다.",

    s7title: "재귀적 예측",
    s7body:
      "BERM은 특이한 예측을 합니다: 그 자체의 수용이 논제의 증거라는 것입니다. 만약 테스토스테론 감소가 인구 수준에서 위험 감수, 경쟁 의지, 진정한 자기 표현을 줄인다면, 같은 호르몬 환경에 놓인 인간으로 구성된 과학 공동체는 합의에 도전하고, 논쟁적 연구 방향을 추구하고, 비주류 발견을 방어하려는 의지가 감소해야 합니다. 모델은 EMF 생체효과 연구가 과소 지원되고, 낙인 찍히고, 제도적으로 억제될 것이라 예측합니다 — 증거가 약하기 때문이 아니라, 지적 위험 감수를 추동하는 호르몬 기반이 쇠퇴하고 있기 때문입니다. 이것은 검증 가능합니다: 총 NIH/ERC 연구비 대비 EMF 생체효과 연구에 대한 연구비 배분이 감소해야 하며, 해당 분야의 연구자들은 긍정적 결과 발표에 대한 경력 불이익이 증가한다고 보고해야 합니다.",

    s8title: "도파민적 정신",
    s8body:
      "Barzilai의 도파민적 정신 가설은 도파민 주도 인지 특성 — 호기심, 창의성, 탐색, 위험 감수 허용, 미래 지향 — 이 현대 인간 인지의 출현에 핵심적이었다고 제안합니다. BERM은 메커니즘을 추가합니다: EMF가 VTA Cav1.3 → 도파민 방출을 교란하고, 테스토스테론 감소가 DA 수용체 발현을 추가로 줄인다면, 인구 수준의 도파민 기능 저하는 인지 혁명의 부분적 역전을 나타냅니다. 이것은 지능에 대한 주장이 아닙니다 (IQ는 Flynn 효과를 통해 안정적이거나 상승할 수 있습니다). 인지 스타일에 대한 주장입니다: 탐색에서 활용으로, 위험 감수에서 위험 회피로, 혁신에서 최적화로의 전환. 도파민 기능이 쇠퇴하는 사회는 사고를 멈추지 않습니다 — 지적 위험 감수를 멈춥니다.",

    s8bTitle: "사이버네틱 피드백 루프",
    s8bLead: "문명 수준의 효과는 단방향이 아닙니다. 행동 변화는 노출 패턴에 피드백하여 과정을 가속하는 자기 강화 루프를 생성합니다.",
    s8bPositiveTitle: "양성(증폭) 루프",
    s8bPositiveLoops: [
      "스마트폰 사용 ↑ → 멜라토닌 ↓ → 수면 질 ↓ → 주간 피로 ↑ → 더 많은 스마트폰 사용 (도파민적 보상)",
      "테스토스테론 ↓ → 위험 회피 ↑ → 실내 시간 ↑ → EMF 노출 ↑ → 테스토스테론 추가 ↓",
      "사회적 불안 ↑ → 디지털 소통 선호 ↑ → 화면 시간 ↑ → 옥시토신 ↓ → 더 많은 사회적 불안",
    ],
    s8bNegativeTitle: "음성(안정화) 루프",
    s8bNegativeLoops: [
      "피로 ↑ → 신체 비활동 ↑ → 야외 시간 감소 → UV 감소 → 비타민 D 감소 → Ca²⁺ 완충 약화 → EMF 민감도 증가",
      "수면 장애 ↑ → 카페인 소비 ↑ → 아데노신 수용체 적응 → 부분적 신경보호 (A₁ → VGCC 조절)",
    ],
    s8bImplication: "양성 루프가 지배적입니다. 각 세대는 이전 세대보다 낮은 호르몬 기준선과 높은 환경 EMF에서 시작합니다. 안정화 루프(카페인, 운동)는 의식적 노력이 필요하지만, 증폭 루프는 자동으로 작동합니다. 이 비대칭성이 작은 초기 교란이 수십 년에 걸쳐 큰 문명적 효과를 생산하는 메커니즘입니다.",
    s8cTitle: "시간 선호와 출산 결정",
    s8cLead: "쌍곡 할인 — 미래 보상보다 즉각적 보상을 강하게 선호하는 경향 — 에는 호르몬 기반이 있습니다. 그 기반이 변화하면 시간 선호가 이동하고 출산 결정이 따릅니다.",
    s8cMechanism: "테스토스테론은 두 경로로 시간 할인에 영향을 미칩니다: (1) 전전두피질의 안드로겐 수용체 밀도를 통해 직접적으로 미래지향적 의사결정을 조절; (2) 도파민을 통해 간접적으로 — 테스토스테론은 선조체의 D2 수용체 발현을 상향 조절하고, 도파민은 지연된 보상의 가치 평가를 매개합니다. 둘 다 동시에 감소하면 현재가 무거워지고 미래가 가벼워집니다.",
    s8cFertility: "출산은 궁극적인 미래지향적 결정입니다: 현재의 높은 비용, 수년 후의 불확실한 보상. 인구 수준의 현재지향 전환은 출산 연기를 예측합니다 — 아이를 원치 않기 때문이 아니라, 높은 비용·장기 프로젝트에 전념하기 위한 호르몬 임계값이 상승하기 때문입니다.",
    s8cTestable: "검증 가능: 개인 할인율(지연 할인 과제로 측정)은 테스토스테론 및 도파민 마커와 상관관계가 있어야 하며, 선언된 출산 의도·소득·교육을 통제한 후에도 출산 시기를 예측해야 합니다.",

    sIQSTitle: "IQ 슈레더", sIQSSubtitle: "생물학적 진단", sIQSLead: "", sIQSBiological: "", sIQSNotChoice: "",
    sIQSComponents: "", sIQSComponentsDesc: "", sIQSRepro: "", sIQSReproDesc: "", sIQSDA: "", sIQSDADesc: "",
    sIQSTime: "", sIQSTimeDesc: "", sIQSBurn: "", sIQSBurnDesc: "", sIQSEff: "", sIQSEffDesc: "",
    sIQSTable: "", sIQSTableDesc: "", sIQSEnv: "환경", sIQSReproCol: "생식 억제", sIQSDACol: "DA 포획",
    sIQSTimeCol: "시간 선호 이동", sIQSBurnCol: "유전적 연소", sIQSEffCol: "슈레더 효율", sIQSBiocapCol: "BioCap",
    sIQSMeta: "", sIQSMetaDesc: "", sIQSPredictions: "", sIQSPred1: "", sIQSPred2: "", sIQSPred3: "",
    sIQSLit: [] as string[],

    s9title: "검증 가능한 예측",
    s9lead:
      "각 예측은 반증 기준을 명시합니다. 반증될 수 없는 모델은 과학이 아닙니다.",
    civPredictions: [
      {
        id: "CIV-1",
        title: "생활습관과 무관하게 T 감소 지속",
        detail:
          "인구 수준 테스토스테론 감소는 비만, 흡연, 음주, 수면을 통제한 후에도 계속될 것입니다 — 주된 동인이 생활습관이 아니라 환경적 EMF이기 때문입니다.",
        falsification:
          "대규모 코호트에서 보정 후 T 감소가 생활습관 요인으로 완전히 설명됨",
      },
      {
        id: "CIV-2",
        title: "저EMF 공동체가 더 높은 T 유지",
        detail:
          "Amish, Mennonite 등 EMF 노출이 낮은 공동체는 매칭된 도시 인구보다 연령 보정 테스토스테론이 더 높아야 합니다.",
        falsification:
          "인구통계 보정 후 저EMF와 고EMF 공동체 간 T 차이 없음",
      },
      {
        id: "CIV-3",
        title: "CCB 사용자가 완화된 행동 감소를 보임",
        detail:
          "장기 CCB 사용자는 비CCB 항고혈압제 사용자에 비해 T 의존 행동 (창업, 위험 감수)의 감소가 적어야 합니다.",
        falsification:
          "CCB와 비CCB 항고혈압제 사용자 간 행동 차이 없음",
      },
      {
        id: "CIV-4",
        title: "TFR이 GDP만이 아닌 EMF 밀도와 상관",
        detail:
          "GDP, 교육, 도시화를 통제한 후, EMF 인프라 밀도가 국가 간 TFR 감소를 독립적으로 예측해야 합니다.",
        falsification:
          "사회경제적 통제 후 EMF 밀도와 TFR 간 잔차 상관 없음",
      },
      {
        id: "CIV-5",
        title: "행동 억제가 EMF 감소로 역전됨",
        detail:
          "EMF 노출을 실질적으로 줄인 개인 (예: 저EMF 환경으로 이주)은 6–12개월 내에 T 의존 행동의 측정 가능한 회복을 보여야 합니다.",
        falsification:
          "통제된 연구에서 지속적 EMF 감소 후 행동 회복 없음",
      },
      {
        id: "CIV-6",
        title: "짝맺기 확률이 곱셈적으로 감소",
        detail:
          "남성 접근 (T 의존)과 여성 수용성 (OT 의존)이 각각 X% 감소하면, 성공적 짝맺기는 2X%가 아닌 X²% 감소해야 합니다. 데이팅 시장 데이터와 호르몬 측정을 결합하여 검증 가능.",
        falsification:
          "짝맺기 비율이 개별 호르몬 수치에 대해 선형적으로 감소",
      },
      {
        id: "CIV-7",
        title:
          "10대 소녀 정신건강 위기가 콘텐츠가 아닌 하드웨어와 상관",
        detail:
          "BERM은 EMF 하드웨어 요소 (HPA를 통한 코르티솔, 송과체를 통한 멜라토닌)가 소셜 미디어 콘텐츠보다 더 중요하다고 예측합니다. 스마트폰을 동일하게 사용하되 저EMF 환경에 있는 소녀들은 불안 증가가 적어야 합니다.",
        falsification:
          "고EMF와 저EMF 스마트폰 사용자 간 불안 차이 없음",
      },
      {
        id: "CIV-8",
        title:
          "세대 간 호르몬 감소가 EMF 증가 없이 가속",
        detail:
          "CaMKII 민감화 + 후성유전적 전달은 일정한 EMF에서도 세대에 걸친 가속적 호르몬 감소를 예측합니다. 같은 연령의 세대별 코호트 간 T 감소율을 비교하여 검증 가능.",
        falsification:
          "동등한 연령에서 세대 간 T 감소율이 일정",
      },
      {
        id: "CIV-9",
        title:
          "옥시토신 의존 행동이 EMF 환경과 함께 감소",
        detail:
          "자원봉사, 지역사회 참여, 자선 기부, 대인 신뢰 — 모두 OT 의존 — 는 국가 간 및 시간 경과에 따라 EMF 환경과 부적 상관을 보여야 합니다.",
        falsification:
          "EMF 환경과 OT 의존 사회적 행동 간 상관 없음",
      },
      {
        id: "CIV-10",
        title: "IVF가 2040년까지 인구학적 인프라화",
        detail:
          "생물학적 임신 가능성이 부부의 ~30% 미만이 12개월 내 비보조 임신을 달성하는 수준 이하로 떨어지면, IVF는 의학적 개입에서 인구 수준 인프라로 전환됩니다. 예측: South Korea 2030년, Japan 2035년, Europe 대부분 2040년까지.",
        falsification:
          "고EMF 국가에서 2040년까지 비보조 임신율이 70% 이상 유지",
      },
      {
        id: "CIV-11",
        title: "온라인-오프라인 행동 격차가 인구 T 수준과 상관",
        detail:
          "평균 T가 높은 인구가 온라인과 대면 행동 간 차이가 적음. 저EMF 공동체가 최소 격차를 보임.",
        falsification:
          "인구 T와 온라인-오프라인 행동 차이 간 상관 없음",
      },
      {
        id: "CIV-12",
        title: "개념 확장 속도가 국가 간 코르티솔 추세와 상관",
        detail:
          "코르티솔이 더 빠르게 증가하는 (또는 T가 더 빠르게 감소하는) 국가가 법률, 학술, 미디어 언어에서 해악 관련 개념의 더 빠른 확장을 보임.",
        falsification:
          "호르몬 추세와 개념 확장 속도 간 상관 없음",
      },
      {
        id: "CIV-13",
        title: "세대 간 긴장이 저EMF 공동체에서 가장 약함",
        detail:
          "세대에 걸쳐 안정적 호르몬 기저선을 가진 Amish 등 유사 공동체가 고EMF 사회보다 세대 간 갈등이 적음.",
        falsification:
          "저EMF 공동체가 전국 평균에 필적하는 세대 간 긴장을 보임",
      },
      {
        id: "CIV-14",
        title: "위험과 권위에 대한 정치적 태도가 인구통계 통제 후 개인 T와 상관",
        detail:
          "인구 내: T가 높은 개인은 대결 기반 해결책을 선호; T가 낮은 개인은 회피 기반 해결책을 선호 — 명시적 이념과 무관하게.",
        falsification:
          "인구통계 통제 후 T와 정책 선호 간 잔차 상관 없음",
      },
    ],

    lostRecoveryTitle: "잃어버린 회복 기간",
    lostRecoveryDesc: "인류 역사상 처음으로, 하루 중 유의미한 EMF 노출이 없는 시간이 없습니다. 전력망은 24시간 운영됩니다. WiFi 라우터는 절대 꺼지지 않습니다. LED 조명은 취침까지 작동합니다. 전화기는 밤새 침대 옆 탁자에 놓입니다. Bluetooth 기기는 지속적으로 연결을 유지합니다.",
    lostRecoveryMechanism: "CaMKII 탈인산화 — 분자적 회복 과정 — 는 Ca²⁺ 과부하 없는 시간을 필요로 합니다. 전기화 이전 인류는 하루 22시간 이상 인공 EMF 없이 보냈습니다. 현대 도시인은 대략 0시간입니다. COVID 봉쇄가 이를 실험적으로 입증했습니다: WiFi + LED + 다수 기기와 함께 하루 24시간 자택 체류가 마지막 회복 기간을 제거했으며 — T2D 가속이 2.90%에서 3.52%/년으로 급등했습니다.",
    lostRecoveryIntervention: "이것은 또한 모델에서 가장 실행 가능한 통찰입니다: EMF 없는 침실이 가장 간단한 단일 개입입니다. 식단 변경도, 약물도, 생활방식 전면 개편도 필요 없습니다 — 라우터를 치우고, 밤에 비행기 모드를 사용하고, 취침 전 백열등으로 바꾸기만 하면 됩니다.",

    buildingTitle: "콘크리트 도시: 내장된 EMF 증폭",
    buildingDesc: "도시화는 단순한 사회적 변화가 아닙니다 — 전자기적 변화입니다. 철근 콘크리트는 RF를 내부로 반사하여 (철근이 역방향 부분 패러데이 케이지 역할), 실내 전자기장 강도를 증가시킵니다. 나무는 RF 투과성입니다 — 전자기장이 통과하여 소산됩니다. 농촌 인구가 콘크리트 도시로 이동했을 때, 아무도 측정하지 않던 메커니즘을 통해 주변 EMF 노출을 동시에 증가시켰습니다.",
    buildingEvidence: "목조 방은 콘크리트 방에 비해 더 나은 수면, 낮은 심박수, 더 나은 인지 수행능력을 보여줍니다 ([[ref:wood_health2026|BIOBUILDS 2026]]). 기존 설명: 바이오필리아. BERM 추가: RF 반사계수. 둘 다 맞을 수 있습니다 — 그러나 EMF 메커니즘은 검증 가능하고 바이오필리아 메커니즘은 그렇지 않습니다.",

    animalsFellTitle: "동물이 먼저 쓰러졌다",
    animalsFellDesc: "EMF가 기본적인 Ca²⁺ 및 CRY 수준에서 생물학에 영향을 미친다면, 민감도가 높은 종이 먼저 감소했어야 합니다 — 실제로 그랬습니다. 개구리 (습윤 피부, 직접 Ca²⁺ 결합)는 GSM이 보급되기 시작한 1987년경 감소하기 시작했습니다. 벌 (CRY 의존 항법)은 기지국이 농촌 지역에 도달한 2006년에 붕괴했습니다. 곤충 생물량이 27년간 75% 감소했습니다. 조류 개체수가 뒤따랐습니다. 포유류 — 인간 포함 — 는 건조한 피부와 큰 체질량으로 인해 민감도가 가장 낮지만, 긴 수명에 걸쳐 효과가 누적됩니다.",
    animalsFellAnalogy: "탄광 속 카나리아 비유는 은유적이 아닙니다 — 메커니즘적입니다. 같은 이온 채널, 같은 자기수용체, 같은 Ca²⁺ 신호 전달. 동물들은 우연히 상관하는 별개의 이유로 감소한 것이 아닙니다. 같은 메커니즘을 통해 서로 다른 민감도 역치에서 감소했습니다.",

    civilizationNote: "문명적 관점 — 생물학적 수용 능력, 제국의 수명, 태양 주기, 활성화 메커니즘 — 은 파토폴리테이아에서 탐구됩니다.",
    svgMaleLower: "남성",
    svgFemaleLower: "여성",
    svgReduction: "감소",
    svgStart: "시작",
    svgSperm: "정자",
    svgOocyte: "난모세포",
    svgTiming: "타이밍",
    svgMotivation: "동기",
    svgFecundability: "임신 가능성",
    svgTestosterone: "Testosterone",
    svgOxytocin: "Oxytocin",
    scoreConsistent: "일치",
    svgNeutral: "중립",
    svgPhysical: "물리적",
    svgConformity: "순응",
    svgHighThreshold: "높은 역치",
    svgDigital: "디지털",
    svgOutragePolarization: "분노와 양극화",
    svgNearZeroCost: "거의 0의 비용",
    svgThresholdVsCost: "생물학적 역치 대 디지털 비용",
    civTested: "검증됨",
    civAwaitingTesting: "모두 실증적 검증 대기 중",
    modelDerived: "", modelDerivedLink: "",
    scoreExplain: "",
    sPronatalistTitle: "", sPronatalistBody1: "", sPronatalistBody2: "", sPronatalistBody3: "",
    sCcbTitle: "", sCcbBody: "",
    sMagnesiumTitle: "", sMagnesiumBody: "",
    animalsFellHierarchy: "", animalsFellItems: [] as { species: string; detail: string; evidence: string }[], animalsFellConclusion: "",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta: Record<string, { title: string; description: string }> = {
    en: {
      title: "Patopolis — The Pathological City | BERM",
      description: "How the urban electromagnetic environment degrades the biological substrates of civilization: hormones, pair-bonding, fertility, institutions, and cultural energy.",
    },
    fi: {
      title: "Patopolis — Patologinen kaupunki | BERM",
      description: "Miten kaupunkien sähkömagneettinen ympäristö rappeuttaa sivilisaation biologiset perusteet: hormonit, parisuhteen, hedelmällisyyden, instituutiot ja kulttuurisen energian.",
    },
    ja: {
      title: "パトポリス — 病理学的都市 | BERM",
      description: "都市の電磁環境が文明の生物学的基盤をいかに劣化させるか：ホルモン、ペアボンディング、出生率、制度、文化的エネルギー。",
    },
    fr: {
      title: "Patopolis — La Ville Pathologique | BERM",
      description: "Comment l'environnement électromagnétique urbain dégrade les substrats biologiques de la civilisation : hormones, liens de couple, fertilité, institutions et énergie culturelle.",
    },
    ko: {
      title: "파토폴리스 — 병리적 도시 | BERM",
      description: "도시 전자기 환경이 문명의 생물학적 기반을 어떻게 퇴화시키는가: 호르몬, 짝결합, 출산율, 제도, 문화적 에너지.",
    },
  };
  const m = meta[locale] || meta.en;
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
    },
  };
}

export default async function PatopolisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <main id="main-content">
      <TranslationNotice copy={COPY} locale={locale} />
      <div className="max-w-5xl mx-auto px-6">

      {/* Hero */}
      <header className="mt-8 sm:mt-14 mb-14">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-red-500/80" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">BERM / Civilization</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          {d.title}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mb-6">
          {d.subtitle}
        </p>
        <div className="border-l-2 border-red-500/40 pl-4 max-w-3xl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {d.heroLead}
          </p>
        </div>
      </header>

      {/* Root mechanism → Pathopege */}
      <p className="text-sm text-muted-foreground italic mb-8">
        <Link href={`/${locale}/civilization/pathopege`} className="underline hover:text-foreground transition-colors">Pathopege</Link>: {d.mechanismNote}
      </p>
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
              <p className="text-sm font-semibold text-blue-400 mb-1">
                <InlineReferenceText text={d.s5aMaleDeficit} locale={locale} />
              </p>
              <p className="text-xs text-muted-foreground">{d.s5aMaleMech}</p>
            </div>
            <div className="rounded-lg bg-rose-500/10 p-4">
              <p className="text-sm font-semibold text-rose-400 mb-1">{d.s5aFemaleDeficit}</p>
              <p className="text-xs text-muted-foreground">{d.s5aFemaleMech}</p>
            </div>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-4 mb-4">
            <p className="text-sm font-medium"><ClaimRef claimId="claim.civilization.pairing-multiplicative-decline">{d.s5aCompound}</ClaimRef></p>
            {/* Multiplication diagram */}
            <div className="mt-3">
              <svg viewBox="0 0 420 60" className="w-full max-w-md mx-auto" role="img" aria-label="Multiplication diagram: 0.6 x 0.6 = 0.36">
                {/* Male circle */}
                <circle cx="50" cy="30" r="24" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeOpacity="0.5" strokeWidth="1.5" />
                <text x="50" y="27" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="700">0.6</text>
                <text x="50" y="42" textAnchor="middle" fill="#3b82f6" fillOpacity="0.6" fontSize="8">{d.svgMaleLower}</text>

                {/* Multiply symbol */}
                <text x="105" y="35" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="18" fontWeight="300">&times;</text>

                {/* Female circle */}
                <circle cx="160" cy="30" r="24" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeOpacity="0.5" strokeWidth="1.5" />
                <text x="160" y="27" textAnchor="middle" fill="#f43f5e" fontSize="14" fontWeight="700">0.6</text>
                <text x="160" y="42" textAnchor="middle" fill="#f43f5e" fillOpacity="0.6" fontSize="8">{d.svgFemaleLower}</text>

                {/* Equals */}
                <text x="215" y="35" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="18" fontWeight="300">=</text>

                {/* Result */}
                <text x="262" y="27" textAnchor="middle" fill="#f59e0b" fontSize="18" fontWeight="800">0.36</text>

                {/* Reduction bar */}
                <rect x="300" y="12" width="100" height="14" rx="3" fill="currentColor" fillOpacity="0.08" />
                <rect x="300" y="12" width="64" height="14" rx="3" fill="#ef4444" fillOpacity="0.5" />
                <text x="350" y="44" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="600">-64%</text>
                <text x="350" y="55" textAnchor="middle" fill="currentColor" fillOpacity="0.4" fontSize="8">{d.svgReduction}</text>
              </svg>
            </div>
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
          <p className="font-mono text-sm mb-3 text-center"><ClaimRef claimId="claim.civilization.tfr-multiplicative-decomposition">{d.s5bFormula}</ClaimRef></p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
            {d.s5bFactors.map((f, i) => (
              <li key={i}>
                <InlineReferenceText text={f} locale={locale} />
              </li>
            ))}
          </ul>

          {/* Waterfall Chart: Multiplicative fertility cascade */}
          <div className="my-4">
            <svg viewBox="0 0 500 190" className="w-full max-w-lg mx-auto" role="img" aria-label="Waterfall chart showing multiplicative fertility decline">
              {/* Axis line */}
              <line x1="45" y1="155" x2="480" y2="155" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />

              {/* Starting bar: 1.00 */}
              <rect x="55" y="15" width="60" height="140" rx="4" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeOpacity="0.3" strokeWidth="1" />
              <text x="85" y="14" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="700">1.00</text>
              <text x="85" y="172" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="8">{d.svgStart}</text>

              {/* Drop connector 1 */}
              <line x1="115" y1="57" x2="140" y2="57" stroke="#ef4444" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 2" />

              {/* f(sperm) → 0.70 */}
              <rect x="140" y="57" width="60" height="98" rx="4" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeOpacity="0.4" strokeWidth="1" />
              <text x="170" y="50" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="700">0.70</text>
              <text x="170" y="172" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="7">f({d.svgSperm})</text>
              <text x="170" y="182" textAnchor="middle" fill="#ef4444" fillOpacity="0.7" fontSize="7">-30%</text>

              {/* Drop connector 2 */}
              <line x1="200" y1="86" x2="225" y2="86" stroke="#ef4444" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 2" />

              {/* g(oocyte) → 0.49 */}
              <rect x="225" y="86" width="60" height="69" rx="4" fill="#ef4444" fillOpacity="0.38" stroke="#ef4444" strokeOpacity="0.5" strokeWidth="1" />
              <text x="255" y="80" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="700">0.49</text>
              <text x="255" y="172" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="7">g({d.svgOocyte})</text>
              <text x="255" y="182" textAnchor="middle" fill="#ef4444" fillOpacity="0.7" fontSize="7">-30%</text>

              {/* Drop connector 3 */}
              <line x1="285" y1="107" x2="310" y2="107" stroke="#ef4444" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 2" />

              {/* h(timing) → 0.34 */}
              <rect x="310" y="107" width="60" height="48" rx="4" fill="#ef4444" fillOpacity="0.52" stroke="#ef4444" strokeOpacity="0.6" strokeWidth="1" />
              <text x="340" y="101" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="700">0.34</text>
              <text x="340" y="172" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="7">h({d.svgTiming})</text>
              <text x="340" y="182" textAnchor="middle" fill="#ef4444" fillOpacity="0.7" fontSize="7">-30%</text>

              {/* Drop connector 4 */}
              <line x1="370" y1="121" x2="395" y2="121" stroke="#ef4444" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 2" />

              {/* j(motivation) → 0.24 */}
              <rect x="395" y="121" width="60" height="34" rx="4" fill="#ef4444" fillOpacity="0.7" stroke="#ef4444" strokeOpacity="0.8" strokeWidth="1" />
              <text x="425" y="115" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="700">0.24</text>
              <text x="425" y="172" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="7">j({d.svgMotivation})</text>
              <text x="425" y="182" textAnchor="middle" fill="#ef4444" fillOpacity="0.7" fontSize="7">-30%</text>

              {/* Result label */}
              <text x="460" y="142" fill="#ef4444" fontSize="10" fontWeight="700">-76%</text>

              {/* Y-axis label */}
              <text x="10" y="85" fill="currentColor" fillOpacity="0.3" fontSize="9" transform="rotate(-90,10,85)">{d.svgFecundability}</text>
            </svg>
          </div>

          <div className="rounded-lg bg-red-500/10 p-4">
            <p className="text-sm">{d.s5bCompound}</p>
          </div>
        </div>

        {/* Pronatalist Policy Failure */}
        {d.sPronatalistBody1 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">{d.sPronatalistTitle}</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed max-w-4xl">
            <p><ClaimRef claimId="claim.civilization.demand-capacity-separation">{d.sPronatalistBody1}</ClaimRef></p>
            <p>{d.sPronatalistBody2}</p>
            <p className="font-medium">{d.sPronatalistBody3}</p>
          </div>
        </div>
        )}

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

          {/* Generation Timeline: Declining trends with rising EMF */}
          <div className="my-4">
            <svg viewBox="0 0 580 214" className="chart-svg w-full max-w-2xl mx-auto" role="img" aria-label="Timeline showing generational hormone decline against rising EMF">
              {/* EMF rising background area */}
              <defs>
                <linearGradient id="emfGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6b7280" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              <polygon points="80,150 540,150 540,30 80,140" fill="url(#emfGrad)" />
              <text x="520" y="25" textAnchor="end" fill="#ef4444" fillOpacity="0.5" fontSize="9" fontWeight="600">EMF ↑</text>

              {/* X-axis */}
              <line x1="80" y1="155" x2="540" y2="155" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />

              {/* Generation markers */}
              {[
                { x: 110, label: "Gen 1", year: "~1950" },
                { x: 240, label: "Gen 2", year: "~1975" },
                { x: 370, label: "Gen 3", year: "~2000" },
                { x: 500, label: "Gen 4", year: "~2025" },
              ].map((g, i) => (
                <g key={i}>
                  <line x1={g.x} y1="150" x2={g.x} y2="158" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
                  <text x={g.x} y="170" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="9" fontWeight="600">{g.label}</text>
                  <text x={g.x} y="182" textAnchor="middle" fill="currentColor" fillOpacity="0.3" fontSize="8">{g.year}</text>
                </g>
              ))}

              {/* T declining line (blue) */}
              <polyline points="110,45 240,65 370,95 500,120" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
              <circle cx="110" cy="45" r="3" fill="#3b82f6" />
              <circle cx="240" cy="65" r="3" fill="#3b82f6" />
              <circle cx="370" cy="95" r="3" fill="#3b82f6" />
              <circle cx="500" cy="120" r="3" fill="#3b82f6" />

              {/* OT declining line (rose) */}
              <polyline points="110,55 240,72 370,105 500,132" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="6 3" />
              <circle cx="110" cy="55" r="2.5" fill="#f43f5e" />
              <circle cx="240" cy="72" r="2.5" fill="#f43f5e" />
              <circle cx="370" cy="105" r="2.5" fill="#f43f5e" />
              <circle cx="500" cy="132" r="2.5" fill="#f43f5e" />

              {/* TFR declining line (amber) */}
              <polyline points="110,60 240,82 370,110 500,140" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="2 3" />
              <circle cx="110" cy="60" r="2.5" fill="#f59e0b" />
              <circle cx="240" cy="82" r="2.5" fill="#f59e0b" />
              <circle cx="370" cy="110" r="2.5" fill="#f59e0b" />
              <circle cx="500" cy="140" r="2.5" fill="#f59e0b" />

              {/* Legend */}
              <line x1="80" y1="195" x2="96" y2="195" stroke="#3b82f6" strokeWidth="2" />
              <text x="100" y="198" fill="currentColor" fillOpacity="0.5" fontSize="8">{d.svgTestosterone}</text>
              <line x1="180" y1="195" x2="196" y2="195" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
              <text x="200" y="198" fill="currentColor" fillOpacity="0.5" fontSize="8">{d.svgOxytocin}</text>
              <line x1="275" y1="195" x2="291" y2="195" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 2" />
              <text x="295" y="198" fill="currentColor" fillOpacity="0.5" fontSize="8">TFR</text>
              <rect x="330" y="190" width="12" height="8" rx="1" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeOpacity="0.3" strokeWidth="0.5" />
              <text x="346" y="198" fill="currentColor" fillOpacity="0.5" fontSize="8">EMF</text>
            </svg>
          </div>

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
                    <td className="py-2 px-2 text-muted-foreground">
                      <InlineReferenceText text={g.tLevel} locale={locale} />
                    </td>
                    <td className="py-2 px-2 text-muted-foreground">{g.otLevel}</td>
                    <td className="py-2 px-2 font-mono">{g.tfr}</td>
                    <td className="py-2 px-2 text-muted-foreground">{g.institutional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm font-medium">{d.generationInsight}</p>
          {d.modelDerived && (
          <p className="text-xs text-muted-foreground mt-2 italic">
            {d.modelDerived}{" "}
            <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
          </p>
          )}
        </div>
      </section>
      {/* S8: Dopaminergic Mind */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">{d.s8title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {d.s8body}
        </p>
      </section>

      {/* S8b: Cybernetic Feedback Loops */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">{d.s8bTitle}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-6">
          {d.s8bLead}
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <h3 className="text-sm font-semibold text-red-400 mb-3">{d.s8bPositiveTitle}</h3>
            <ul className="space-y-2">
              {d.s8bPositiveLoops.map((loop: string, i: number) => (
                <li key={i} className="text-xs leading-relaxed text-muted-foreground pl-3 border-l-2 border-red-500/30">{loop}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-3">{d.s8bNegativeTitle}</h3>
            <ul className="space-y-2">
              {d.s8bNegativeLoops.map((loop: string, i: number) => (
                <li key={i} className="text-xs leading-relaxed text-muted-foreground pl-3 border-l-2 border-blue-500/30">{loop}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground border-l-2 border-accent/30 pl-4">
          {d.s8bImplication}
        </p>
      </section>

      {/* S8c: Time Preference */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">{d.s8cTitle}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
          {d.s8cLead}
        </p>
        <div className="space-y-4 rounded-xl border border-card-border bg-card-bg p-5 mb-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{d.s8cMechanism}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{d.s8cFertility}</p>
        </div>
        <p className="text-xs text-muted-foreground italic">{d.s8cTestable}</p>
      </section>

      {/* IQ Shredder */}
      {d.sIQSLead && (
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <TrendingDown className="w-6 h-6 text-red-500" />
          {d.sIQSTitle}
        </h2>
        <p className="text-sm text-muted-foreground italic mb-6">{d.sIQSSubtitle}</p>

        <div className="max-w-3xl space-y-4 mb-10">
          <p className="text-base leading-relaxed">{d.sIQSLead}</p>
          <p className="text-base leading-relaxed">{d.sIQSBiological}</p>
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
            <p className="text-sm leading-relaxed font-medium">{d.sIQSNotChoice}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">{d.sIQSComponents}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">{d.sIQSComponentsDesc}</p>

        <div className="space-y-6 mb-10">
          {[
            { title: d.sIQSRepro, desc: d.sIQSReproDesc, color: "red" },
            { title: d.sIQSDA, desc: d.sIQSDADesc, color: "purple" },
            { title: d.sIQSTime, desc: d.sIQSTimeDesc, color: "amber" },
            { title: d.sIQSBurn, desc: d.sIQSBurnDesc, color: "orange" },
            { title: d.sIQSEff, desc: d.sIQSEffDesc, color: "rose" },
          ].map((item, i) => (
            <div key={i} className={`rounded-lg border border-${item.color}-500/30 bg-${item.color}-500/5 p-5`}>
              <h4 className="font-semibold mb-2">{i + 1}. {item.title}</h4>
              <p className="text-sm leading-relaxed text-foreground/80"><InlineReferenceText text={item.desc} locale={locale} /></p>
            </div>
          ))}
        </div>

        {/* Gradient table */}
        <h3 className="text-lg font-semibold mb-2">{d.sIQSTable}</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-3xl">{d.sIQSTableDesc}</p>
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-foreground/20">
                <th className="text-left py-2 px-2 font-semibold">{d.sIQSEnv}</th>
                <th className="text-right py-2 px-2 font-semibold">{d.sIQSReproCol}</th>
                <th className="text-right py-2 px-2 font-semibold">{d.sIQSDACol}</th>
                <th className="text-right py-2 px-2 font-semibold">{d.sIQSTimeCol}</th>
                <th className="text-right py-2 px-2 font-semibold">{d.sIQSBurnCol}</th>
                <th className="text-right py-2 px-2 font-semibold text-red-400">{d.sIQSEffCol}</th>
                <th className="text-right py-2 px-2 font-semibold">{d.sIQSBiocapCol}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { env: "Amish", rs: "0.075", da: "0.049", tp: "0.035", gb: "0.061", se: "0.060", bc: "0.955" },
                { env: "Rural", rs: "0.424", da: "0.278", tp: "0.243", gb: "0.355", se: "0.344", bc: "0.731" },
                { env: "Suburban", rs: "0.567", da: "0.374", tp: "0.297", gb: "0.488", se: "0.461", bc: "0.614" },
                { env: "Urban res.", rs: "0.651", da: "0.443", tp: "0.336", gb: "0.569", se: "0.537", bc: "0.536" },
                { env: "Urban office", rs: "0.706", da: "0.496", tp: "0.375", gb: "0.624", se: "0.592", bc: "0.480" },
              ].map((row, i) => (
                <tr key={i} className={`border-b border-foreground/10 ${i === 4 ? "bg-red-500/5" : ""}`}>
                  <td className="py-2 px-2 font-medium">{row.env}</td>
                  <td className="py-2 px-2 text-right font-mono text-xs">{row.rs}</td>
                  <td className="py-2 px-2 text-right font-mono text-xs">{row.da}</td>
                  <td className="py-2 px-2 text-right font-mono text-xs">{row.tp}</td>
                  <td className="py-2 px-2 text-right font-mono text-xs">{row.gb}</td>
                  <td className="py-2 px-2 text-right font-mono text-xs text-red-400 font-semibold">{row.se}</td>
                  <td className="py-2 px-2 text-right font-mono text-xs">{row.bc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {d.modelDerived && (
        <p className="text-xs text-muted-foreground mt-2 italic">
          {d.modelDerived}{" "}
          <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
        </p>
        )}

        {/* Meta-irony */}
        <div className="rounded-lg border border-foreground/20 bg-foreground/5 p-5 mb-10 max-w-3xl">
          <h3 className="font-semibold mb-2">{d.sIQSMeta}</h3>
          <p className="text-sm leading-relaxed text-foreground/80">{d.sIQSMetaDesc}</p>
        </div>

        {/* Predictions */}
        <h3 className="text-lg font-semibold mb-3">{d.sIQSPredictions}</h3>
        <div className="space-y-3 mb-10 max-w-3xl">
          {[d.sIQSPred1, d.sIQSPred2, d.sIQSPred3].filter(Boolean).map((pred, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="font-mono text-red-400 shrink-0">{i + 1}.</span>
              <p className="leading-relaxed">{pred}</p>
            </div>
          ))}
        </div>

        {/* Literature */}
        {d.sIQSLit.length > 0 && (
        <div className="border-t border-foreground/10 pt-4">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Literature</p>
          <ul className="space-y-1">
            {d.sIQSLit.map((ref: string, i: number) => (
              <li key={i} className="text-xs text-muted-foreground leading-relaxed">
                <InlineReferenceText text={ref} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
        )}
      </section>
      )}

      {/* Civilization-level content → Patopoliteia */}
      <p className="text-sm text-muted-foreground italic mb-8">
        <Link href={`/${locale}/civilization/patopoliteia`} className="underline hover:text-foreground transition-colors">Patopoliteia</Link>: {d.civilizationNote}
      </p>

      {/* S6: 12 Predictions, 12 Observations */}
      <section id="twelve-predictions" className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{d.s6title}</h2>
        <p className="text-muted-foreground mb-6">{d.s6lead}</p>

        {/* Prediction Scorecard: 12/12 consistent */}
        <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/5 p-3 flex items-center gap-3 flex-wrap">
          <span className="text-lg font-bold text-green-400">12/12</span>
          <span className="text-xs text-muted-foreground">{d.scoreConsistent}</span>
          <div className="flex gap-0.5 flex-1 min-w-[200px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-1 h-5 rounded-sm bg-green-500/50 min-w-[14px]" />
            ))}
          </div>
        </div>
        {d.scoreExplain && <p className="text-sm text-muted-foreground mb-4">{d.scoreExplain}</p>}

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
                  <span className="font-medium">RCT basis:</span>{" "}
                  <InlineReferenceText text={p.basis} locale={locale} />
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
          <p className="text-sm text-muted-foreground mb-3">
            <InlineReferenceText text={d.spolarBody} locale={locale} />
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg bg-blue-500/10 p-4">
              <p className="text-sm font-semibold text-blue-400 mb-2">{d.spolarPhysical}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium">T threshold:</span> {d.spolarPhysicalThreshold}</p>
              <p className="text-xs text-muted-foreground mt-1"><span className="font-medium">Behavior:</span> {d.spolarPhysicalBehavior}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                <InlineReferenceText text={d.spolarPhysicalRct} locale={locale} />
              </p>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-4">
              <p className="text-sm font-semibold text-amber-400 mb-2">{d.spolarDigital}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium">T threshold:</span> {d.spolarDigitalThreshold}</p>
              <p className="text-xs text-muted-foreground mt-1"><span className="font-medium">Behavior:</span> {d.spolarDigitalBehavior}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                <InlineReferenceText text={d.spolarDigitalRct} locale={locale} />
              </p>
            </div>
          </div>

          {/* Polarization Diverging Chart */}
          <div className="my-4">
            <svg viewBox="0 0 500 104" className="chart-svg w-full max-w-lg mx-auto" role="img" aria-label="Diverging bar chart: physical conformity vs digital outrage">
              {/* Center axis */}
              <line x1="250" y1="10" x2="250" y2="80" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
              <text x="250" y="8" textAnchor="middle" fill="currentColor" fillOpacity="0.3" fontSize="8">{d.svgNeutral}</text>

              {/* Physical / Conformity (left, blue, low intensity) */}
              <rect x="170" y="18" width="80" height="24" rx="4" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeOpacity="0.4" strokeWidth="1" />
              <text x="160" y="34" textAnchor="end" fill="#3b82f6" fontSize="9" fontWeight="600">{d.svgPhysical}</text>
              <text x="210" y="34" textAnchor="middle" fill="#3b82f6" fillOpacity="0.8" fontSize="9">{d.svgConformity}</text>
              <text x="160" y="47" textAnchor="end" fill="currentColor" fillOpacity="0.3" fontSize="7">{d.svgHighThreshold}</text>

              {/* Digital / Outrage (right, amber, high intensity) */}
              <rect x="250" y="52" width="180" height="24" rx="4" fill="#f59e0b" fillOpacity="0.35" stroke="#f59e0b" strokeOpacity="0.5" strokeWidth="1" />
              <text x="488" y="68" textAnchor="end" fill="#f59e0b" fontSize="9" fontWeight="600">{d.svgDigital}</text>
              <text x="340" y="68" textAnchor="middle" fill="#f59e0b" fillOpacity="0.9" fontSize="9">{d.svgOutragePolarization}</text>
              <text x="488" y="82" textAnchor="end" fill="currentColor" fillOpacity="0.3" fontSize="7">{d.svgNearZeroCost}</text>

              {/* Asymmetry arrow */}
              <text x="250" y="98" textAnchor="middle" fill="currentColor" fillOpacity="0.25" fontSize="7">{d.svgThresholdVsCost}</text>
            </svg>
          </div>

          <p className="text-sm text-muted-foreground mb-2">{d.spolarObserved}</p>
          <p className="text-sm text-muted-foreground mb-3">{d.spolarExplain}</p>
          <p className="text-sm font-medium text-violet-400">{d.spolarPrediction}</p>
        </div>

        {/* Safety-seeking */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.ssafetyTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            <InlineReferenceText text={d.ssafetyBody} locale={locale} />
          </p>
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
          {/* CCB Evidence */}
          {d.sCcbBody && (
          <div className="rounded-lg border border-card-border bg-card-bg p-4 mb-4">
            <h4 className="text-sm font-semibold mb-2">{d.sCcbTitle}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <InlineReferenceText text={d.sCcbBody} locale={locale} />
            </p>
          </div>
          )}
          {/* Magnesium */}
          {d.sMagnesiumBody && (
          <div className="rounded-lg border border-card-border bg-card-bg p-4 mb-4">
            <h4 className="text-sm font-semibold mb-2">{d.sMagnesiumTitle}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <InlineReferenceText text={d.sMagnesiumBody} locale={locale} />
            </p>
          </div>
          )}
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
      {/* The Lost Recovery Window */}
      <section className="mb-16 border-t editorial-rule pt-8">
        <h2 className="text-2xl font-bold mb-4">{d.lostRecoveryTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p>{d.lostRecoveryDesc}</p>
          <p>{d.lostRecoveryMechanism}</p>
        </div>
        <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/5 p-4 max-w-4xl">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.lostRecoveryIntervention}</p>
        </div>
      </section>

      {/* Concrete Cities */}
      <section className="mb-16 border-t editorial-rule pt-8">
        <h2 className="text-2xl font-bold mb-4">{d.buildingTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p>{d.buildingDesc}</p>
          <p>
            <InlineReferenceText text={d.buildingEvidence} locale={locale} />
          </p>
        </div>
      </section>

      {/* The Animals Fell First */}
      <section className="mb-16 border-t editorial-rule pt-8">
        <h2 className="text-2xl font-bold mb-4">{d.animalsFellTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p>{d.animalsFellDesc}</p>
        </div>
        <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 max-w-4xl">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.animalsFellAnalogy}</p>
        </div>
        {d.animalsFellHierarchy && (
        <>
        <p className="text-sm text-muted-foreground mb-4 mt-4">{d.animalsFellHierarchy}</p>
        {d.animalsFellItems?.length > 0 && (
        <div className="space-y-2 mb-4">
          {d.animalsFellItems.map((item: { species: string; detail: string; evidence: string }, i: number) => (
            <div key={i} className="flex gap-3 items-start rounded-lg border border-card-border bg-card-bg p-3">
              <span className="flex-shrink-0 rounded bg-amber-500/20 text-amber-400 text-xs font-mono px-2 py-0.5 mt-0.5">{i + 1}</span>
              <div>
                <p className="text-sm font-semibold">{item.species}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
                <p className="text-xs text-muted-foreground italic mt-1">
                  <InlineReferenceText text={item.evidence} locale={locale} />
                </p>
              </div>
            </div>
          ))}
        </div>
        )}
        <p className="text-sm font-medium text-muted-foreground">{d.animalsFellConclusion}</p>
        </>
        )}
      </section>
      {/* S9: Testable Predictions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Target className="w-6 h-6 text-emerald-500" />
          {d.s9title}
        </h2>
        <p className="text-muted-foreground mb-6">{d.s9lead}</p>

        {/* CIV Prediction Tracker: 14 pending predictions */}
        <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono px-2.5 py-1 font-semibold">
              0/14 {d.civTested}
            </span>
            <span className="text-xs text-muted-foreground">{d.civAwaitingTesting}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="inline-block rounded-md bg-amber-500/15 border border-amber-500/25 text-amber-400/80 text-[10px] font-mono px-2 py-0.5"
              >
                CIV-{i + 1}
              </span>
            ))}
          </div>
        </div>

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

      {/* Navigation */}
      <nav className="mt-20 mb-16 flex flex-col sm:flex-row flex-wrap gap-4">
        <Link
          href={`/${locale}/civilization`}
          className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-muted/50 transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          {d.civilizationLink}
        </Link>
        <Link
          href={`/${locale}/civilization/patokratia`}
          className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-muted/50 transition-colors"
        >
          {d.patokratiaLink}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href={`/${locale}/civilization/patokinesis`}
          className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-muted/50 transition-colors"
        >
          {d.patokinesisLink}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      </div>
    </main>
  );
}
