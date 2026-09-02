import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { TranslationNotice } from "@/components/TranslationNotice";
import { ClaimRef } from "@/components/ClaimRef";
import { InlineReferenceText } from "@/components/InlineReferenceText";

const COPY = {
  en: {
    pageTitle: "Patokratia",
    pageSubtitle: "Political values are not chosen. They are computed from biomarker state. This page traces the biological substrates of political orientation, moral foundations, reproductive strategy, and collective action capacity across the EMF exposure gradient.",
    heroLead: "Greek: pathos (suffering, disease) + kratos (rule, power). Governance by pathology. When the endocrine substrates that produce political values are systematically degraded by environmental factors, the political output of a population shifts not because people change their minds, but because the biological machinery that generates their opinions changes. The distance from pre-industrial baseline quantifies the displacement.",
    backLink: "\u2190 Back to Civilization",

    sPoliticalTitle: "Political Pathology",
    sPoliticalDesc: "Political orientation is a phenotypic expression of biomarker state. The distance from pre-industrial endocrine baseline \u2014 the pathologization index \u2014 quantifies how far an ideology has been displaced by EMF-induced biomarker disruption. BioCap (biological capacity) is the weighted composite of eight biomarker levels normalized to the pre-industrial baseline, ranging from 1.0 (fully intact) to 0.0 (total degradation); it is defined in detail in Patopoliteia. The pathologization index is the root-mean-square distance between an environment\u2019s political-orientation profile and the pre-industrial (Amish) profile, both computed from those biomarker levels: 0 means no displacement, 1 maximal displacement.",
    sPoliticalEnvTitle: "EMF Environment \u2192 Political Output (2025)",
    sPoliticalColEnv: "Environment", sPoliticalColEmf: "EMF", sPoliticalColBiocap: "BioCap", sPoliticalColIdeology: "Ideology", sPoliticalColPatholog: "Pathol.",
    sPoliticalEnvs: [
      { env: "Amish", emf: "0.05\u00d7", biocap: "0.955", ideology: "Pragmatic Localism", patholog: "0.011" },
      { env: "Rural", emf: "0.40\u00d7", biocap: "0.731", ideology: "Pragmatic Localism", patholog: "0.258" },
      { env: "Suburban", emf: "1.00\u00d7", biocap: "0.614", ideology: "Green Abstraction", patholog: "0.369" },
      { env: "Urban", emf: "1.40\u00d7", biocap: "0.536", ideology: "Progressive Egalitarianism", patholog: "0.443" },
      { env: "Urban Office", emf: "1.80\u00d7", biocap: "0.480", ideology: "Progressive Egalitarianism", patholog: "0.495" },
    ],
    sPoliticalPolarization: "Polarization index 0.237. The same genome, separated by postal code, produces different political output. This is not a conflict of values \u2014 it is a gradient of endocrine disruption.",
    sPoliticalIdeologyTitle: "Ideology as Biological Strategy",
    sPoliticalIdeologies: [
      { name: "Pragmatic Localism", patholog: "0.011", desc: "Natural baseline. Strong local hierarchy, low paranoia, innovation within tradition. Not ideological \u2014 functional." },
      { name: "Green Abstraction", patholog: "0.369", desc: "BDNF-dependent abstract concern for non-immediate threats. Requires high cognitive complexity and long time preference. Fragmenting as substrate declines." },
      { name: "Progressive Egalitarianism", patholog: "0.443\u20130.495", desc: "Low-T competitive strategy: delegitimize hierarchy when unable to compete within it. Expanded threat definitions (CORT) reframed as moral sensitivity." },
      { name: "Authoritarian Conservatism", patholog: "0.460", desc: "Residual hierarchy maintenance under elevated threat. Insufficient T for organic dominance \u2014 relies on external enforcement (state, religion, punishment)." },
      { name: "Populism", patholog: "\u2014 (never primary, 2025\u20132055)", desc: "Cognitive capacity below institutional complexity threshold. Not a movement \u2014 the biological default when BDNF + DA drop below multi-causal reasoning floor." },
      { name: "Libertarianism", patholog: "0.336 (rural 2055)", desc: "Residual high-DA phenotype. Risk-tolerant, low conformity. Shrinking demographic base as population DA drops." },
    ],
    sPoliticalTrajectoryTitle: "Suburban Trajectory: 1950\u20132050",
    sPoliticalColYear: "Year",
    sPoliticalTrajectoryDesc: "Ideology shifts not because people change their minds, but because the endocrine substrate that produces their opinions changes.",
    sPoliticalTrajectory: [
      { year: "1950", ideology: "Pragmatic Localism", biocap: "0.976", patholog: "0.040" },
      { year: "1990", ideology: "Pragmatic Localism", biocap: "0.861", patholog: "0.108" },
      { year: "2010", ideology: "Green Abstraction", biocap: "0.722", patholog: "0.256" },
      { year: "2025", ideology: "Green Abstraction", biocap: "0.614", patholog: "0.369" },
      { year: "2050", ideology: "Auth. Conservatism", biocap: "0.525", patholog: "0.460" },
    ],
    sPoliticalLitTitle: "Literature",
    sPoliticalLit: [
      "[[ref:alogaily2025_testosterone_politics|Alogaily 2025 RCT]] (N=136): exogenous T shifts Democrats conservative. Direct causal evidence.",
      "Petersen 2013 (N=12k, 17 countries): T \u2192 rejection of wealth redistribution.",
      "[[ref:oxley2008_physiological_traits|Oxley 2008]] (N=46): heightened threat sensitivity \u2192 conservative attitudes.",
      "[[ref:dedreu2011_ethnocentrism|De Dreu 2011]] (N=280): OXT increases in-group favoritism AND out-group derogation simultaneously.",
      "[[ref:settle2010_drd4_ideology|Settle 2010]] (N=2,574): DRD4-7R \u2192 political liberalism via novelty-seeking.",
      "[[ref:bratsberg2018|Bratsberg 2018]] (N=730k): Flynn effect reversal \u2014 IQ declining post-1975.",
      "[[ref:mehta2010_dual_hormone|Mehta & Josephs 2010]] (meta N=8,538): dual-hormone hypothesis. Chronic CORT suppresses T-driven dominance.",
    ],
    sPoliticalConclusion: "The model predicts urban-rural polarization is a gradient of endocrine disruption, not a conflict of values. No political dialogue resolves this \u2014 it requires environmental intervention.",

    sMoralTitle: "Moral Foundations (Haidt)",
    sMoralDesc: "[[ref:haidt2012_righteous_mind|Jonathan Haidt's Moral Foundations Theory (2012)]] identified six innate psychological systems that generate moral intuitions across all cultures. Three are 'binding' foundations (Loyalty, Authority, Sanctity) — they bind individuals into cohesive groups, hierarchies, and shared sacred values. Three are 'individualizing' foundations (Care, Fairness, Liberty) — they protect individual rights and welfare regardless of group membership. [[ref:graham2009_moral_foundations|Graham, Haidt & Nosek (2009)]] showed liberals weight Care + Fairness while conservatives weight all six equally. The model maps each foundation to its biological substrate and predicts the liberal-conservative asymmetry as a direct consequence of differential biomarker degradation.",
    sMoralColEnv: "Environment", sMoralColBreadth: "Breadth", sMoralColBinding: "Binding", sMoralColIndiv: "Individualizing", sMoralColActive: "Active",
    sMoralEnvs: [
      { env: "Amish", breadth: "6/6", binding: "3/3", indiv: "3/3", active: "All six", pattern: "Full moral palette \u2014 balanced binding and individualizing" },
      { env: "Rural", breadth: "6/6", binding: "3/3", indiv: "3/3", active: "All six", pattern: "Conservative baseline \u2014 all foundations, slightly binding-dominant" },
      { env: "Suburban", breadth: "6/6", binding: "3/3", indiv: "3/3", active: "All six", pattern: "Transitional \u2014 binding weakening, individualizing relatively stronger" },
      { env: "Urban Res.", breadth: "3/6", binding: "0/3", indiv: "3/3", active: "Care, Fairness, Liberty", pattern: "Liberal profile \u2014 only individualizing foundations remain" },
      { env: "Urban Office", breadth: "1/6", binding: "0/3", indiv: "1/3", active: "Fairness only", pattern: "Maximum degradation \u2014 even Care drops below capacity threshold" },
    ],
    sMoralFoundations: [
      { name: "Care/Harm", substrate: "OXT, BDNF", lit: "[[ref:feldman2012|Feldman 2012]], Luo 2024 RCT, Crockett 2010" },
      { name: "Fairness/Cheating", substrate: "DA, T, OXT", lit: "Zhong 2010 DRD4, Burnham 2007, Eisenegger 2010" },
      { name: "Loyalty/Betrayal", substrate: "OXT (parochial)", lit: "[[ref:dedreu2010_parochial_altruism|De Dreu 2010 Science]], [[ref:dedreu2011_ethnocentrism|2011 PNAS]], Stallen 2012" },
      { name: "Authority/Subversion", substrate: "T, CORT", lit: "[[ref:mehta2010_dual_hormone|Mehta & Josephs 2010]], Kanai 2011" },
      { name: "Sanctity/Degradation", substrate: "T\u00d7OXT, BDNF\u00d7MEL", lit: "Inbar et al. 2009 (N=31k), [[ref:oxley2008_physiological_traits|Oxley 2008]]" },
      { name: "Liberty/Oppression", substrate: "DA, T, inv. CORT", lit: "[[ref:settle2010_drd4_ideology|Settle 2010]] (DRD4-7R)" },
    ],
    sMoralConclusion: "The model predicts that moral foundation narrowing is not a value choice but an endocrine consequence. The liberal pattern (Care + Fairness only) is what remains when the biological substrates of Authority (T), Sanctity (T\u00d7OXT, BDNF\u00d7MEL), and Loyalty (OXT/T ratio) collapse. Conservatives do not have 'more' morality \u2014 they have more intact biomarker substrates.",
    sMoralColFoundation: "Foundation", sMoralColSubstrate: "Substrate", sMoralColLit: "Evidence",

    sCollapseTitle: "Collapse Hierarchy",
    sCollapseDesc: "Foundations do not degrade uniformly. They collapse in a predictable order determined by the biological vulnerability of their substrates \u2014 not by cultural or ideological factors. Binding foundations are systematically more fragile because they depend on the most EMF-sensitive hormonal systems.",
    sCollapseColRank: "Rank", sCollapseColFoundation: "Foundation", sCollapseColType: "Formula", sCollapseColCollapse: "Collapses At", sCollapseColVuln: "Vulnerability",
    sCollapseOrder: [
      { rank: 1, foundation: "Sanctity", type: "Multiplicative", collapse: "Urban residential", binding: true, vuln: "cognitive(BDNF\u00d7MEL) \u00d7 enforcement(T\u00d7OXT). Degradation in EITHER component collapses the product. Four vulnerable systems multiplied \u2014 catastrophic sensitivity." },
      { rank: 2, foundation: "Authority", type: "Single-substrate", collapse: "Urban residential", binding: true, vuln: "Depends on T \u2014 the second-most degraded marker in the EMF gradient (after melatonin) ([[ref:alogaily2025_testosterone_politics|Alogaily 2025 RCT]]). CORT elevation further suppresses via dual-hormone mechanism. Double hit." },
      { rank: 3, foundation: "Loyalty", type: "Interaction", collapse: "Urban residential", binding: true, vuln: "Parochial OXT requires T co-activation for group defense. Without T, OXT produces conformity, not loyalty ([[ref:dedreu2011_ethnocentrism|De Dreu 2011]])." },
      { rank: 4, foundation: "Liberty", type: "Additive-suppressed", collapse: "Urban office", binding: false, vuln: "DA provides baseline autonomy. More resilient \u2014 dopaminergic neurons have greater redundancy than Leydig or pineal cells. But CORT(0.35) eventually overwhelms." },
      { rank: 5, foundation: "Care", type: "Additive-floor", collapse: "Urban office", binding: false, vuln: "OXT provides strong baseline. The 0.45 floor means BDNF loss narrows scope but doesn't eliminate care. Falls only at extreme degradation." },
      { rank: 6, foundation: "Fairness", type: "Triple-redundant", collapse: "Survives", binding: false, vuln: "Three independent inputs (DA 0.40, T 0.30, OXT 0.15). Any single system partially sustains it. DA is the most buffered neurotransmitter." },
    ],
    sCollapseInsight: "The binding foundations \u2014 Loyalty, Authority, Sanctity \u2014 all depend on testosterone (Leydig cells) and multiplicative interactions between EMF-sensitive systems. The individualizing foundations \u2014 Care, Fairness, Liberty \u2014 depend on dopamine (VTA neurons, greater redundancy) and additive formulas where any single input can partially sustain the output. This is why the conservative moral palette degrades first: it is biologically expensive.",
    sCollapseFormulaKey: "Formula types: Multiplicative (A \u00d7 B) \u2014 output collapses if either input degrades; catastrophic sensitivity to any single-point failure. Single-substrate \u2014 depends primarily on one hormone; vulnerable but predictable. Interaction \u2014 requires co-activation of two systems (e.g. OXT needs T for parochial loyalty, not just bonding). Additive-suppressed \u2014 sum of inputs minus a suppressor term (CORT); declines gradually. Additive-floor \u2014 sum with a biological minimum that prevents total collapse. Triple-redundant \u2014 three independent inputs where any one partially sustains the output; most resilient.",

    sRKTitle: "r/K Reproductive Strategy",
    sRKDesc: "Anonymous Conservative (The Evolutionary Psychology Behind Politics, 2014) mapped five psychological traits to the r/K selection continuum: r-strategists (liberal psychology) display competition aversion, promiscuity, low parental investment, early sexuality, and no in-group loyalty. K-strategists (conservative psychology) display the opposite. The original theory attributes this to resource abundance cycles. The BERM model identifies the mechanism: urban EMF environments produce r-selected endocrine profiles through melatonin (pathway B) and calcium-channel (pathway A) biomarker degradation. This is environmental phenotypic mimicry of r-selection \u2014 not evolution. A genetically K-selected species expresses r-type behavioral outputs because its endocrine substrates are being suppressed.",
    sRKScaleNote: "The r/K index ranges from 0.0 (fully r-selected phenotype: maximal reproductive quantity, minimal parental investment) to 1.0 (fully K-selected phenotype: maximal parental investment, selective mating, group loyalty). Each of the five sub-traits is computed from its substrate formula using the environment's biomarker values \u2014 e.g. Mating Strategy = OXT \u00d7 (0.5 + 0.5 \u00d7 T), where OXT and T are normalized to [0, 1] relative to the pre-industrial baseline. The composite r/K index is the mean of the five sub-scores.",
    sRKColEnv: "Environment", sRKColIndex: "r/K Index", sRKColClass: "Classification",
    sRKColComp: "Competition", sRKColMating: "Mating", sRKColParent: "Parenting", sRKColSexual: "Sexual Timing", sRKColLoyalty: "Group Loyalty",
    sRKEnvs: [
      { env: "Amish", index: "0.86", cls: "K-selected", comp: "0.80", mating: "0.94", parent: "0.85", sexual: "0.96", loyalty: "0.76" },
      { env: "Rural", index: "0.60", cls: "Mixed", comp: "0.54", mating: "0.60", parent: "0.61", sexual: "0.76", loyalty: "0.50" },
      { env: "Suburban", index: "0.49", cls: "Mixed", comp: "0.43", mating: "0.48", parent: "0.51", sexual: "0.61", loyalty: "0.40" },
      { env: "Urban Res.", index: "0.42", cls: "r-selected", comp: "0.36", mating: "0.41", parent: "0.45", sexual: "0.52", loyalty: "0.35" },
      { env: "Urban Office", index: "0.37", cls: "r-selected", comp: "0.31", mating: "0.36", parent: "0.41", sexual: "0.45", loyalty: "0.31" },
    ],
    sRKTraits: [
      { trait: "Competition", rPole: "Aversion", kPole: "Embrace", substrate: "T + DA (suppressed by CORT)" },
      { trait: "Mating Strategy", rPole: "Promiscuity", kPole: "Monogamy", substrate: "OXT \u00d7 (0.5 + 0.5 \u00d7 T)" },
      { trait: "Parental Investment", rPole: "Low / single-parent", kPole: "High / two-parent", substrate: "OXT + T + BDNF (suppressed by CORT)" },
      { trait: "Sexual Timing", rPole: "Early onset", kPole: "Delayed maturity", substrate: "MEL + BDNF + T" },
      { trait: "Group Loyalty", rPole: "No in-group preference", kPole: "Fierce loyalty", substrate: "OXT \u00d7 (0.5 + 0.5 \u00d7 T) (= Haidt Loyalty)" },
    ],
    sRKColTrait: "Trait", sRKColRPole: "r-pole (Liberal)", sRKColKPole: "K-pole (Conservative)", sRKColSubstrate: "BERM Substrate",
    sRKMimicry: "This is not evolution. The human species did not change its reproductive strategy. EMF-driven biomarker degradation produces the endocrine state that phenotypically mimics r-selection \u2014 competition aversion (suppressed T+DA), promiscuity (reduced OXT pair-bonding), low parental investment (depleted OXT+T+BDNF), earlier puberty (collapsed MEL shutting down HPG axis inhibition), and weakened group loyalty (the same OXT\u00d7T interaction that Haidt's Loyalty foundation depends on). The r/K gradient across environments is identical to the moral foundations gradient because they share the same substrates.",
    sRKDopamine: "The dopamine-amygdala nexus confirms the mechanism from two independent directions. DRD4-7r polymorphism correlates with liberal ideology, novelty seeking, and depression ([[ref:settle2010_drd4_ideology|Settle et al. 2010]], [[ref:ebstein1996_drd4_novelty|Ebstein et al. 1996]]). Toxoplasma gondii alters dopamine and amygdala reactivity to produce r-type behavioral shifts ([[ref:flegr2013_toxoplasma|Flegr 2013]]). EMF degrades dopaminergic signaling through the same VTA pathway \u2014 producing the same phenotypic output without the polymorphism or the parasite. Three independent causes, one shared mechanism, one predicted outcome.",
    sRKCities: "Anonymous Conservative identified cities as r-selecting environments because anonymity defeats the three R's \u2014 Reputation, Reciprocity, and Retribution \u2014 that enforce K-selected cooperative strategies. BERM adds the missing variable: cities are also the highest EMF environments. The urban-liberal correlation has a direct endocrine mechanism. Anonymity removes the social enforcement of K-strategy; EMF degrades the biological capacity for it. Double selection pressure, converging on the same phenotype.",
    sRKLit: [
      "Anonymous Conservative 2014 (The Evolutionary Psychology Behind Politics): five r/K traits mapped to liberal-conservative psychology. Resource abundance produces r-selection; scarcity produces K-selection.",
      "[[ref:settle2010_drd4_ideology|Settle et al. 2010]] (J Politics): DRD4-7r + social environment interaction predicts liberal ideology. The dopamine receptor variant is the genetic substrate; EMF-driven dopaminergic degradation is the environmental mimic.",
      "[[ref:flegr2013_toxoplasma|Flegr 2013]] (J Exp Biol): T. gondii manipulates host dopamine + amygdala reactivity \u2192 behavioral shifts matching r-type traits. An independent validation that dopaminergic disruption produces r-phenotypic mimicry.",
      "Belsky et al. 2012 (JAMA Pediatrics): differential susceptibility \u2014 DRD4-7r carriers show greatest response to environmental quality. The same allele that predicts ideology also predicts environmental sensitivity.",
      "Parent et al. 2003 (Endocr Rev): secular trend toward earlier puberty onset over 150 years \u2014 the predicted outcome of declining melatonin (HPG axis disinhibition) in increasingly electrified environments.",
    ],
    sRKConclusion: "The r/K framework explains why the political shift is not ideological drift but reproductive strategy mimicry. A population exposed to chronic EMF does not choose r-strategy. It is pushed into r-phenotypic expression because the endocrine substrates of K-strategy \u2014 monogamy, high parental investment, delayed gratification, group loyalty, competitive drive \u2014 are systematically degraded. The political is biological. The biological is electromagnetic.",

    sLCTitle: "In-Group Loyalty Collapse",
    sLCDesc: "Loyalty/Betrayal (OXT \u00d7 T) is the most fragile moral foundation because it depends on a multiplicative interaction between two of the three most EMF-sensitive biomarkers. When both inputs drop by X%, a multiplicative output drops ~2X% \u2014 while additive functions (Care, Fairness) drop only ~X%. Melatonin degrades fastest across the Amish \u2192 urban-office gradient (62%), then testosterone (Leydig cells, 59%), oxytocin (hypothalamic neurons, 46%), dopamine (41%) and BDNF (cortical, 28%). Loyalty depends on two of the three most sensitive; Care depends on oxytocin and the least sensitive (BDNF). Loyalty collapses first. The consequences cascade through collective action, policy formation, and social cohesion \u2014 creating a self-reinforcing feedback loop.",
    sLCColEnv: "Environment", sLCColLoyalty: "Loyalty", sLCColCare: "Care", sLCColBoundary: "Boundary Dissolution", sLCColCAC: "Collective Action", sLCColPU: "Pathol. Universalism", sLCColRatchet: "Ratchet",
    sLCEnvs: [
      { env: "Amish", loyalty: "0.76", care: "0.92", boundary: "0.24", cac: "0.89", pu: "0.00", ratchet: "0.03" },
      { env: "Rural", loyalty: "0.50", care: "0.56", boundary: "0.50", cac: "0.62", pu: "0.01", ratchet: "0.19" },
      { env: "Suburban", loyalty: "0.40", care: "0.44", boundary: "0.60", cac: "0.51", pu: "0.04", ratchet: "0.29" },
      { env: "Urban Res.", loyalty: "0.35", care: "0.38", boundary: "0.65", cac: "0.45", pu: "0.57", ratchet: "0.36" },
      { env: "Urban Office", loyalty: "0.31", care: "0.33", boundary: "0.69", cac: "0.40", pu: "0.25", ratchet: "0.41" },
    ],
    sLCMechTitle: "The Mechanism Chain",
    sLCMechSteps: [
      "EMF \u2192 CRY \u2192 melatonin\u2193 \u2192 LH/testosterone decline (pathway B), amplified by Ca\u00b2\u207a influx (pathway A) \u2192 testosterone decline (Leydig cells, most vulnerable) + oxytocin decline (hypothalamic neurons)",
      "OXT \u00d7 T product collapses (multiplicative = fragile) \u2192 Loyalty substrate destroyed",
      "In-group boundary dissolves \u2014 the concept of 'us' becomes cognitively available but motivationally empty",
      "Collective action capacity lost \u2014 Olson's three prerequisites (trust, enforcement, identification) all depend on loyalty substrates",
      "Care fills the moral vacuum \u2014 universal, immediate, individual, non-reciprocal. No competing foundation remains to constrain it.",
      "Policies evaluated only by Care: net-negative immigration admitted, criminals pitied, welfare disbursed \u2014 all without reciprocity, standards, or cost accounting",
      "Policy outputs further erode social cohesion ([[ref:putnam2007_e_pluribus_unum|Putnam 2007]]: diversity \u2192 reduced trust even within in-groups) \u2192 further OXT decline \u2192 loyalty degrades further",
    ],
    sLCCollectiveTitle: "Collective Action Failure",
    sLCCollectiveDesc: "[[ref:olson1965_collective_action|Mancur Olson (1965)]] showed that collective goods require three prerequisites: trust (will partners cooperate?), enforcement (will defectors be punished?), and shared identity (who is 'us'?). All three map to loyalty substrates: trust = OXT, enforcement = T, identification = OXT\u00d7T. The geometric mean captures the constraint that all three must be present \u2014 weakness in any one makes collective action impossible. Urban populations have less than half the collective action capacity of low-EMF populations. This is not a cultural difference. It is an endocrine one.",
    sLCPolicyTitle: "Policy Vulnerability",
    sLCPolicyDesc: "When binding foundations collapse, specific policy domains become systematically vulnerable. Vulnerability = (1 \u2212 constraint strength) \u00d7 whether Care still provides motivation. Each domain has a different constellation of constraining foundations \u2014 but Loyalty appears in all of them.",
    sLCColPolicy: "Policy Domain", sLCColDriver: "Driver", sLCColConstraint: "Missing Constraints", sLCColVulnAmish: "Amish", sLCColVulnUrban: "Urban",
    sLCPolicies: [
      { policy: "Immigration openness", driver: "Care (migrant suffering)", constraint: "Loyalty + Authority + Sanctity", vAmish: "0.15", vUrban: "0.68" },
      { policy: "Criminal leniency", driver: "Care (offender suffering)", constraint: "Authority + Loyalty + Sanctity", vAmish: "0.13", vUrban: "0.69" },
      { policy: "Welfare without reciprocity", driver: "Care (material need)", constraint: "Loyalty + Authority", vAmish: "0.17", vUrban: "0.67" },
      { policy: "Foreign policy naivety", driver: "Care (global suffering)", constraint: "Loyalty + Authority + Liberty", vAmish: "0.18", vUrban: "0.67" },
      { policy: "Demographic indifference", driver: "Care + Fairness (equality)", constraint: "Loyalty + Sanctity", vAmish: "0.18", vUrban: "0.68" },
    ],
    sLCImmigrationTitle: "The Immigration Case",
    sLCImmigrationDesc: "Support for net-negative immigration in loyalty-collapsed populations is not irrationality \u2014 it is the rational output of Care-only moral reasoning. Care sees individual migrant suffering: proximate, visible, emotionally salient. The foundations that would constrain Care are absent: Loyalty (in-group cost accounting: 'what does this cost us?'), Authority (standards enforcement: 'do they meet the criteria?'), Sanctity (cultural boundary maintenance: 'does this preserve what we are?'), Fairness-as-reciprocity (mutual obligation: 'what do they contribute?'). The result: admission without integration requirement, without economic viability assessment, without cultural compatibility consideration. Every step is morally justified by the remaining foundation. Every step is pathological from the full palette.",
    sLCRatchetTitle: "The Feedback Ratchet",
    sLCRatchetDesc: "The collapse is self-reinforcing. Loyalty collapse produces policies that further erode social cohesion (immigration without integration, welfare without reciprocity, crime without punishment). Reduced cohesion reduces social bonding frequency, which reduces OXT ([[ref:feldman2012|Feldman 2012]]: social interaction \u2192 OXT release). Reduced OXT further degrades loyalty substrate. Meanwhile, the weakened collective action capacity means the population cannot organize to resist the policies \u2014 the very mechanism that would allow course correction is the one that has failed. [[ref:putnam2007_e_pluribus_unum|Putnam (2007, 'E Pluribus Unum')]] documented that ethnic diversity reduces social trust, altruism, and community cooperation even within one's own ethnic group \u2014 the opposite of the contact hypothesis. The ratchet velocity increases monotonically with EMF: 0.03 (amish) \u2192 0.41 (urban office). Each turn of the ratchet makes the next turn more likely and reversal less likely.",
    sLCLit: [
      "[[ref:dedreu2010_parochial_altruism|De Dreu 2010 (Science, N=280)]]: oxytocin increases in-group favoritism. [[ref:dedreu2011_ethnocentrism|De Dreu 2011 (PNAS)]]: OXT drives ethnocentrism \u2014 in-group love and out-group derogation are the same mechanism, not opposites.",
      "[[ref:putnam2007_e_pluribus_unum|Putnam 2007 (Scandinavian Political Studies)]]: diversity reduces social trust, altruism, community cooperation, and friend networks \u2014 even within own ethnic group. 'Hunkering down' in diverse communities.",
      "[[ref:olson1965_collective_action|Olson 1965 (Logic of Collective Action)]]: collective goods require selective incentives, shared identity, or coercion. Without loyalty substrate, only coercion remains \u2014 but the state itself is captured by Care-only agents who will not apply it.",
      "Shalvi & De Dreu 2014: oxytocin promotes group-serving dishonesty \u2014 loyalty enables deception on behalf of the in-group. Without it, the group cannot even coordinate self-interested defense.",
      "[[ref:henrich2020_weirdest|Henrich 2020 (The WEIRDest People in the World)]]: Western individualism as the historical dissolution of kin-based cooperative structures \u2014 the same process BERM identifies as endocrine, now shown to have institutional consequences spanning centuries.",
      "[[ref:feldman2012|Feldman 2012]]: social interaction drives OXT release (positive feedback). Reduced social cohesion \u2192 reduced interaction \u2192 reduced OXT \u2192 reduced cohesion. The loop is biological, not merely sociological.",
    ],
    sLCConclusion: "The model predicts that pathological universalism \u2014 unlimited immigration, unconditional welfare, criminal leniency, demographic indifference \u2014 is not a value choice but an endocrine consequence. It is what remains when the moral foundations that would constrain Care (Loyalty, Authority, Sanctity) have lost their biological substrate. The population does not choose these policies because they believe in open borders. They believe in open borders because the biological machinery for believing in borders has been degraded. And each policy choice accelerates the degradation. The ratchet turns. The correction requires restoring the substrate, not winning the argument.",

    sAristotleTitle: "The Aristotelian Prediction",
    sAristotleDesc: "Aristotle's doctrine of the mean (Nicomachean Ethics II.6) holds that every virtue is a balance between excess and deficiency, and that the virtues must balance each other. Eudaimonia \u2014 human flourishing \u2014 requires the full palette of virtues in equilibrium. His hylomorphism (De Anima) insisted that soul and body are inseparable: mental states are physical states.",
    sAristotlePoints: [
      "The model's 6/6 active moral foundations at Amish baseline is the Aristotelian eudaimonia state: all moral capacities present, balanced, functional.",
      "The urban 3/6 state is a departure from the mean \u2014 not toward a single vice, but toward a structural imbalance where half the moral palette has collapsed.",
      "\"Mens sana in corpore sano\" (healthy mind in healthy body, Juvenal Sat. X, Aristotelian in spirit): the model formalizes this as BioCap \u2192 moral_breadth \u2192 psychological function. You cannot have a balanced moral psychology with degraded hormonal substrates.",
      "Aristotle would classify the urban liberal profile as a form of moral deficiency \u2014 not moral evil, but moral incapacity. The virtues of loyalty, sanctity, and hierarchy require biological substrates that are no longer available.",
    ],

    sNietzscheTitle: "Nietzsche's Diagnosis",
    sNietzscheDesc: "Friedrich Nietzsche (Genealogy of Morals, 1887) diagnosed the pathology with clinical precision, attributing it to cultural causes. The BERM model provides the etiology he lacked.",
    sNietzschePoints: [
      "Master morality (Herrenmoral): strength, nobility, creative power, pride. Requires intact T (dominance), DA (drive), OXT\u00d7T (loyalty to equals). Maps to: Authority + Sanctity + Loyalty + Liberty. The full-palette profile.",
      "Slave morality (Sklavenmoral): compassion, pity, equality, humility. Born from ressentiment \u2014 the weak redefine values they cannot achieve as vices. Maps to: Care + Fairness only. The urban profile.",
      "Ressentiment is not a psychological choice but an endocrine consequence. When T drops, hierarchy acceptance drops. The resulting phenotype cannot compete within hierarchies, so it delegitimizes them. This IS the progressive egalitarianism profile in the model.",
      "\"God is dead\" = the collapse of Sanctity. Without the biological substrate to maintain sacred categories (BDNF\u00d7MEL \u00d7 T\u00d7OXT), transcendent meaning frameworks become cognitively inaccessible. Not an intellectual conclusion \u2014 a biological inevitability.",
      "The \u00dcbermensch = the fully realized human operating at full biomarker capacity. Not a superman but the Amish baseline: all foundations active, all capacities functional.",
      "The Last Man (der letzte Mensch): \"We have invented happiness, say the last men, and blink.\" Low T (no ambition), high CORT (risk-avoidant), low DA (no novelty). Only Fairness survives \u2014 mechanical reciprocity without depth. The urban office profile.",
      "Will to Power (Wille zur Macht) = T + DA. The drive to overcome, create, dominate. As both decline, Will to Power is replaced by Will to Comfort \u2014 CORT-avoidance behavior.",
    ],

    sDistressTitle: "Mental Health Prediction",
    sDistressDesc: "The model predicts that moral foundation narrowing produces measurable psychological distress. Individuals with only individualizing foundations active experience hyperactivated harm detection without stabilizing structure, unbounded empathy without parochial limits (compassion fatigue), no group belonging (anomie), and no meaning framework (nihilism).",
    sDistressColEnv: "Environment", sDistressColIndex: "Distress", sDistressColAnomie: "Anomie", sDistressColMeaning: "Meaning Deficit", sDistressColNarrow: "Narrowing",
    sDistressEnvs: [
      { env: "Amish", distress: "0.09", anomie: "0.24", meaning: "0.08", narrowing: "0/6" },
      { env: "Rural", distress: "0.27", anomie: "0.50", meaning: "0.46", narrowing: "0/6" },
      { env: "Suburban", distress: "0.34", anomie: "0.60", meaning: "0.61", narrowing: "0/6" },
      { env: "Urban Res.", distress: "0.48", anomie: "0.65", meaning: "0.70", narrowing: "3/6" },
      { env: "Urban Office", distress: "0.58", anomie: "0.69", meaning: "0.76", narrowing: "5/6" },
    ],
    sDistressLit: [
      "Gimbrone et al. 2022 (J Adolesc Health): liberal adolescent girls show sharply increasing depression from 2012 onward. Conservative adolescents remain stable. The model predicts this: urban female populations have the most degraded binding substrates (lower T, disrupted E2/progesterone cycling, elevated CORT).",
      "Gallup 2023: 56% of white liberal women aged 18-29 report a diagnosed mental health condition, vs 28% of conservative women. The 2\u00d7 ratio maps to the model's distress gradient between urban (binding=0) and rural (binding=3) profiles.",
      "Twenge et al. 2019 (J Abnorm Psych): iGen mental health decline begins precisely when smartphone penetration exceeds 50% \u2014 the inflection point where personal-device RF exposure becomes near-continuous.",
      "[[ref:lukianoff_haidt2018_coddling|Lukianoff & Haidt 2018]]: cognitive distortions (emotional reasoning, catastrophizing, dichotomous thinking) spreading on campuses are the phenotypic expression of Care hyperactivation without Authority structure.",
    ],
    sDistressConclusion: "The model does not predict that liberal positions are pathological because they are liberal. It predicts that the biological state which produces the liberal moral profile (binding foundations collapsed) also produces psychological distress \u2014 because humans evolved to operate with the full moral palette. The urban liberal is not morally wrong. They are morally incomplete, in exactly the way a person with reduced bone density is not making a lifestyle choice but experiencing a deficiency.",

    conclusionTitle: "Synthesis",
    conclusionText: "Patokratia is not a political argument. It is a biological description. The endocrine substrates that produce political values, moral foundations, reproductive strategies, collective action capacity, and meaning frameworks are being systematically degraded along an EMF exposure gradient. The political is biological. The biological is electromagnetic. The correction requires restoring the substrate, not winning the argument.",

    navBackCiv: "Back to Civilization",
    navPathopege: "Pathopege: The Source",
    navPatopolis: "Patopolis: The Pathological City",
    navPatopoliteia: "Patopoliteia: Pathological Civilization",
    navPatokinesis: "Patokinesis: The Pathology That Moves",
    sWellingCalloutTitle: "Direct Causal Evidence: Testosterone → Political Preferences",
    sWellingCalloutBody: "The causal link from testosterone to political preferences was established by RCT in 2025. Alogaily, Zak et al. (Brain and Behavior, n=136) administered synthetic testosterone or placebo. Weakly affiliated Democrats had 19% higher basal testosterone than strongly affiliated Democrats (p=0.015). Testosterone administration reduced party affiliation by 12% (p=0.01) and increased warmth toward Republican candidates by 45% (p<0.001). This is the first direct experimental evidence that testosterone causally shifts political preferences.",
    modelDerived: "Model-derived values from BioCap integral, not directly measured.",
    modelDerivedLink: "mathematical specification",
    translationPending: "Full translation pending.",
  },
  fi: {
    pageTitle: "Patokratia",
    pageSubtitle: "Poliittiset arvot eiv\u00e4t ole valintoja. Ne lasketaan biomarkkeritilasta. T\u00e4m\u00e4 sivu j\u00e4ljitt\u00e4\u00e4 poliittisen orientaation, moraaliperustojen, lis\u00e4\u00e4ntymisstrategian ja kollektiivisen toimintakyvyn biologiset substraatit EMF-altistusgradientin yli.",
    heroLead: "Kreikasta: pathos (k\u00e4rsimys, sairaus) + kratos (valta, hallinta). Patologian hallintoa. Kun poliittisia arvoja tuottavat endokriiniset substraatit rappeutuvat systemaattisesti ymp\u00e4rist\u00f6tekij\u00f6iden vaikutuksesta, v\u00e4est\u00f6n poliittinen tuotos siirtyy \u2014 ei siksi ett\u00e4 ihmiset muuttavat mielens\u00e4, vaan siksi ett\u00e4 biologinen koneisto, joka tuottaa heid\u00e4n mielipiteens\u00e4, muuttuu. Et\u00e4isyys esiteollisesta peruslinjasta kvantifioi siirtym\u00e4n.",
    backLink: "\u2190 Takaisin Sivilisaatioon",

    sPoliticalTitle: "Poliittinen patologia",
    sPoliticalDesc: "Poliittinen orientaatio on biomarkkeritilan fenotyyppinen ilmentym\u00e4. Et\u00e4isyys esiteollisesta endokriinisest\u00e4 peruslinjasta \u2014 patologisaatioindeksi \u2014 kvantifioi, kuinka kauas ideologia on siirtynyt EMF-indusoidun biomarkkerih\u00e4iri\u00f6n seurauksena.",
    sPoliticalEnvTitle: "EMF-ymp\u00e4rist\u00f6 \u2192 Poliittinen tuotos (2025)",
    sPoliticalColEnv: "Ymp\u00e4rist\u00f6", sPoliticalColEmf: "EMF", sPoliticalColBiocap: "BioCap", sPoliticalColIdeology: "Ideologia", sPoliticalColPatholog: "Patol.",
    sPoliticalEnvs: [
      { env: "Amish", emf: "0,05\u00d7", biocap: "0,955", ideology: "Pragmaattinen lokalismi", patholog: "0,011" },
      { env: "Maaseutu", emf: "0,40\u00d7", biocap: "0,731", ideology: "Pragmaattinen lokalismi", patholog: "0,258" },
      { env: "Esikaupunki", emf: "1,00\u00d7", biocap: "0,614", ideology: "Vihre\u00e4 abstraktio", patholog: "0,369" },
      { env: "Kaupunki", emf: "1,40\u00d7", biocap: "0,536", ideology: "Progressiivinen egalitarismi", patholog: "0,443" },
      { env: "Kaupunki (toimisto)", emf: "1,80\u00d7", biocap: "0,480", ideology: "Progressiivinen egalitarismi", patholog: "0,495" },
    ],
    sPoliticalPolarization: "Polarisaatioindeksi 0,237. Sama genomi, erotettuna postinumerolla, tuottaa eri poliittisen tuotoksen. T\u00e4m\u00e4 ei ole arvojen konflikti \u2014 se on endokriinisen h\u00e4iri\u00f6n gradientti.",
    sPoliticalIdeologyTitle: "Ideologia biologisena strategiana",
    sPoliticalIdeologies: [
      { name: "Pragmaattinen lokalismi", patholog: "0,011", desc: "Luonnollinen peruslinja. Vahva paikallinen hierarkia, matala paranoia, innovaatio tradition sis\u00e4ll\u00e4. Ei ideologinen \u2014 funktionaalinen." },
      { name: "Vihre\u00e4 abstraktio", patholog: "0,369", desc: "BDNF-riippuvainen abstrakti huoli ei-v\u00e4litt\u00f6mist\u00e4 uhkista. Vaatii korkean kognitiivisen kompleksisuuden ja pitk\u00e4n aikapreferenssin. Fragmentoituu substraatin heikenty\u00e4ss\u00e4." },
      { name: "Progressiivinen egalitarismi", patholog: "0,443\u20130,495", desc: "Matalan T:n kilpailustrategia: delegitimoi hierarkia, kun ei kykene kilpailemaan sen sis\u00e4ll\u00e4. Laajennetut uhkam\u00e4\u00e4ritelm\u00e4t uudelleenkehystetty moraalisena herkkyyten\u00e4." },
      { name: "Autoritaarinen konservatismi", patholog: "0,460", desc: "J\u00e4\u00e4nn\u00f6shierarkian yll\u00e4pito kohonneen uhkavasteen alla. Riitt\u00e4m\u00e4t\u00f6n T orgaaniseen dominanssiin \u2014 turvautuu ulkoiseen pakotukseen (valtio, uskonto, rangaistus)." },
      { name: "Populismi", patholog: "\u2014 (ei koskaan prim\u00e4\u00e4ri, 2025\u20132055)", desc: "Kognitiivinen kapasiteetti alle institutionaalisen kompleksisuuden kynnyksen. Ei liike \u2014 biologinen oletus, kun BDNF + DA putoavat monisyisen p\u00e4\u00e4ttelyn lattian alle." },
      { name: "Libertarismi", patholog: "0,336 (maaseutu 2055)", desc: "J\u00e4\u00e4nn\u00f6ksellinen korkean DA:n fenotyyppi. Riskinsietokyvinen, matala konformismi. Kutistuva demografinen pohja DA:n laskiessa." },
    ],
    sPoliticalTrajectoryTitle: "Esikaupunkien trajektori: 1950\u20132050",
    sPoliticalColYear: "Vuosi",
    sPoliticalTrajectoryDesc: "Ideologia vaihtuu ei siksi, ett\u00e4 ihmiset muuttavat mielens\u00e4, vaan siksi, ett\u00e4 endokriininen substraatti joka tuottaa heid\u00e4n mielipiteens\u00e4 muuttuu.",
    sPoliticalTrajectory: [
      { year: "1950", ideology: "Pragmaattinen lokalismi", biocap: "0,976", patholog: "0,040" },
      { year: "1990", ideology: "Pragmaattinen lokalismi", biocap: "0,861", patholog: "0,108" },
      { year: "2010", ideology: "Vihre\u00e4 abstraktio", biocap: "0,722", patholog: "0,256" },
      { year: "2025", ideology: "Vihre\u00e4 abstraktio", biocap: "0,614", patholog: "0,369" },
      { year: "2050", ideology: "Aut. konservatismi", biocap: "0,525", patholog: "0,460" },
    ],
    sPoliticalLitTitle: "Kirjallisuus",
    sPoliticalLit: [
      "[[ref:alogaily2025_testosterone_politics|Alogaily 2025 RCT]] (N=136): eksogeeninen T siirt\u00e4\u00e4 demokraatteja konservatiivisemmaksi. Suora kausaalievidenssi.",
      "Petersen 2013 (N=12k, 17 maata): T \u2192 varallisuuden uudelleenjaon hylk\u00e4\u00e4minen.",
      "[[ref:oxley2008_physiological_traits|Oxley 2008]] (N=46): kohonnut uhkaherkkyys \u2192 konservatiiviset asenteet.",
      "[[ref:dedreu2011_ethnocentrism|De Dreu 2011]] (N=280): OXT lis\u00e4\u00e4 sis\u00e4ryhm\u00e4suosintaa JA ulkoryhm\u00e4n halveksuntaa samanaikaisesti.",
      "[[ref:settle2010_drd4_ideology|Settle 2010]] (N=2 574): DRD4-7R \u2192 poliittinen liberalismi uutuudenhaun kautta.",
      "[[ref:bratsberg2018|Bratsberg 2018]] (N=730k): Flynn-efektin k\u00e4\u00e4ntyminen \u2014 \u00c4O laskee vuodesta 1975.",
      "[[ref:mehta2010_dual_hormone|Mehta & Josephs 2010]] (meta N=8 538): kaksoishormonihypoteesi. Krooninen CORT tukahduttaa T-k\u00e4ytt\u00f6isen dominanssin.",
    ],
    sPoliticalConclusion: "Malli ennustaa, ett\u00e4 kaupunki\u2013maaseutu-polarisaatio on endokriinisen h\u00e4iri\u00f6n gradientti, ei arvojen konflikti. Mik\u00e4\u00e4n poliittinen dialogi ei ratkaise t\u00e4t\u00e4 \u2014 se vaatii ymp\u00e4rist\u00f6intervention.",

    sMoralTitle: "Moraaliperusteet (Haidt)",
    sMoralDesc: "[[ref:haidt2012_righteous_mind|Jonathan Haidt (2012)]] tunnisti kuusi moraaliperustaa. [[ref:graham2009_moral_foundations|Graham, Haidt & Nosek (2009)]] osoittivat, ett\u00e4 liberaalit painottavat Huolenpitoa + Reiluutta, kun taas konservatiivit painottavat kaikkia kuutta tasaisesti. Malli kuvaa kunkin perustan biologiseen substraattiin ja ennustaa liberaali\u2013konservatiivi-asymmetrian suorana seurauksena biomarkkereiden differentiaalisesta degradaatiosta.",
    sMoralColEnv: "Ymp\u00e4rist\u00f6", sMoralColBreadth: "Laajuus", sMoralColBinding: "Sitovat", sMoralColIndiv: "Yksil\u00f6lliset", sMoralColActive: "Aktiiviset",
    sMoralEnvs: [
      { env: "Amish", breadth: "6/6", binding: "3/3", indiv: "3/3", active: "Kaikki kuusi", pattern: "T\u00e4ysi moraalinen paletti \u2014 tasapainoiset sitovat ja yksil\u00f6lliset" },
      { env: "Maaseutu", breadth: "6/6", binding: "3/3", indiv: "3/3", active: "Kaikki kuusi", pattern: "Konservatiivinen perustaso \u2014 kaikki perusteet, hieman sitova-painotteinen" },
      { env: "Esikaupunki", breadth: "6/6", binding: "3/3", indiv: "3/3", active: "Kaikki kuusi", pattern: "Siirtym\u00e4vaihe \u2014 sitovat heikkenev\u00e4t, yksil\u00f6lliset suhteellisesti vahvempia" },
      { env: "Kaup. asuin.", breadth: "3/6", binding: "0/3", indiv: "3/3", active: "Huolenpito, Reiluus, Vapaus", pattern: "Liberaali profiili \u2014 vain yksil\u00f6lliset perusteet j\u00e4ljell\u00e4" },
      { env: "Kaup. toimisto", breadth: "1/6", binding: "0/3", indiv: "1/3", active: "Vain Reiluus", pattern: "Maksimaalinen degradaatio \u2014 jopa Huolenpito putoaa kapasiteettirajan alle" },
    ],
    sMoralFoundations: [
      { name: "Huolenpito/Vahinko", substrate: "OXT, BDNF", lit: "[[ref:feldman2012|Feldman 2012]], Luo 2024 RCT, Crockett 2010" },
      { name: "Reiluus/Huijaus", substrate: "DA, T, OXT", lit: "Zhong 2010 DRD4, Burnham 2007, Eisenegger 2010" },
      { name: "Lojaalisuus/Petos", substrate: "OXT (parokiaalinen)", lit: "[[ref:dedreu2010_parochial_altruism|De Dreu 2010 Science]], [[ref:dedreu2011_ethnocentrism|2011 PNAS]], Stallen 2012" },
      { name: "Auktoriteetti/Kumoaminen", substrate: "T, CORT", lit: "[[ref:mehta2010_dual_hormone|Mehta & Josephs 2010]], Kanai 2011" },
      { name: "Pyhyys/Rappeutuminen", substrate: "T\u00d7OXT, BDNF\u00d7MEL", lit: "Inbar ym. 2009 (N=31k), [[ref:oxley2008_physiological_traits|Oxley 2008]]" },
      { name: "Vapaus/Sorto", substrate: "DA, T, inv. CORT", lit: "[[ref:settle2010_drd4_ideology|Settle 2010]] (DRD4-7R)" },
    ],
    sMoralConclusion: "Malli ennustaa, ett\u00e4 moraaliperustojen kaventuminen ei ole arvovalinta vaan endokriininen seuraus. Liberaali malli (Huolenpito + Reiluus) on se, mik\u00e4 j\u00e4\u00e4 j\u00e4ljelle, kun Auktoriteetin (T), Pyhyyden (T\u00d7OXT, BDNF\u00d7MEL) ja Lojaalisuuden (OXT/T-suhde) biologiset substraatit romahtavat. Konservatiiveilla ei ole 'enemm\u00e4n' moraalia \u2014 heill\u00e4 on ehj\u00e4mm\u00e4t biomarkkerit.",
    sMoralColFoundation: "Perusta", sMoralColSubstrate: "Substraatti", sMoralColLit: "Evidenssi",

    sCollapseTitle: "Romahtamishierarkia",
    sCollapseDesc: "Perusteet eiv\u00e4t rappeudu tasaisesti. Ne romahtavat ennustettavassa j\u00e4rjestyksess\u00e4, jonka m\u00e4\u00e4r\u00e4\u00e4 kunkin perustan substraatin biologinen haavoittuvuus \u2014 ei kulttuuriset tai ideologiset tekij\u00e4t. Sitovat perusteet ovat systemaattisesti hauraampia, koska ne riippuvat EMF-herkimmist\u00e4 hormonaalisista j\u00e4rjestelmist\u00e4.",
    sCollapseColRank: "Sija", sCollapseColFoundation: "Perusta", sCollapseColType: "Kaava", sCollapseColCollapse: "Romahtaa", sCollapseColVuln: "Haavoittuvuus",
    sCollapseOrder: [
      { rank: 1, foundation: "Pyhyys", type: "Multiplikatiivinen", collapse: "Kaupunki asuin.", binding: true, vuln: "kognitiivinen(BDNF\u00d7MEL) \u00d7 toimeenpano(T\u00d7OXT). Kumman tahansa komponentin rappeutuminen romahduttaa tulon. Nelj\u00e4 haavoittuvaa j\u00e4rjestelm\u00e4\u00e4 kerrottuna \u2014 katastrofaalinen herkkyys." },
      { rank: 2, foundation: "Auktoriteetti", type: "Yksitt\u00e4inen substraatti", collapse: "Kaupunki asuin.", binding: true, vuln: "Riippuu T:st\u00e4 \u2014 gradientin toiseksi voimakkaimmin rappeutuva markkeri (melatoniinin j\u00e4lkeen) ([[ref:alogaily2025_testosterone_politics|Alogaily 2025 RCT]]). CORT-nousu vaimentaa edelleen kaksoishormonimekanismilla. Kaksoisosuma." },
      { rank: 3, foundation: "Lojaalisuus", type: "Interaktio", collapse: "Kaupunki asuin.", binding: true, vuln: "Parokiaalinen OXT vaatii T:n yhteisaktivointia ryhm\u00e4puolustukseen. Ilman T:t\u00e4 OXT tuottaa mukautuvuutta, ei lojaalisuutta ([[ref:dedreu2011_ethnocentrism|De Dreu 2011]])." },
      { rank: 4, foundation: "Vapaus", type: "Additiivinen, vaimennettu", collapse: "Kaupunki toimisto", binding: false, vuln: "DA tarjoaa perusautonomian. Resilientimpi \u2014 dopaminergiset neuronit ovat redundantimpia kuin Leydigin tai k\u00e4pyrauhasen solut. Mutta CORT(0.35) voittaa lopulta." },
      { rank: 5, foundation: "Huolenpito", type: "Additiivinen, lattia", collapse: "Kaupunki toimisto", binding: false, vuln: "OXT tarjoaa vahvan perustan. 0.45-lattia tarkoittaa, ett\u00e4 BDNF-tappio kaventaa laajuutta muttei eliminoi huolenpitoa. Romahtaa vasta \u00e4\u00e4rimm\u00e4isess\u00e4 degradaatiossa." },
      { rank: 6, foundation: "Reiluus", type: "Kolminkertainen redundanssi", collapse: "Selviytyy", binding: false, vuln: "Kolme riippumatonta sy\u00f6tett\u00e4 (DA 0.40, T 0.30, OXT 0.15). Mik\u00e4 tahansa yksitt\u00e4inen j\u00e4rjestelm\u00e4 yll\u00e4pit\u00e4\u00e4 osittain. DA on puskuroiduin v\u00e4litt\u00e4j\u00e4aine." },
    ],
    sCollapseInsight: "Sitovat perusteet \u2014 Lojaalisuus, Auktoriteetti, Pyhyys \u2014 kaikki riippuvat testosteronista (Leydigin solut) ja multiplikatiivisista interaktioista EMF-herkkien j\u00e4rjestelmien v\u00e4lill\u00e4. Yksil\u00f6lliset perusteet \u2014 Huolenpito, Reiluus, Vapaus \u2014 riippuvat dopamiinista (VTA-neuronit, suurempi redundanssi) ja additiivisista kaavoista, joissa mik\u00e4 tahansa yksitt\u00e4inen sy\u00f6te voi osittain yll\u00e4pit\u00e4\u00e4 tulosta. Siksi konservatiivinen moraalinen paletti rappeutuu ensin: se on biologisesti kallis.",
    sCollapseFormulaKey: "Kaavatyypit: Multiplikatiivinen (A \u00d7 B) \u2014 tuotos romahtaa, jos kumpi tahansa sy\u00f6te rappeutuu; katastrofaalinen herkkyys mille tahansa yksitt\u00e4isen pisteen vialle. Yksitt\u00e4inen substraatti \u2014 riippuu ensisijaisesti yhdest\u00e4 hormonista; haavoittuva mutta ennustettava. Interaktio \u2014 vaatii kahden j\u00e4rjestelm\u00e4n yhteisaktivoinnin (esim. OXT tarvitsee T:t\u00e4 parokiaaliseen lojaalisuuteen, ei pelkk\u00e4\u00e4n kiintymykseen). Additiivinen, vaimennettu \u2014 sy\u00f6tteiden summa miinus vaimennintermi (CORT); laskee v\u00e4hitellen. Additiivinen, lattia \u2014 summa, jolla on biologinen minimi, joka est\u00e4\u00e4 t\u00e4ydellisen romahduksen. Kolminkertainen redundanssi \u2014 kolme riippumatonta sy\u00f6tett\u00e4, joista mik\u00e4 tahansa yksin yll\u00e4pit\u00e4\u00e4 tuotosta osittain; kest\u00e4vin.",

    sRKTitle: "r/K-lis\u00e4\u00e4ntymisstrategia",
    sRKDesc: "Anonymous Conservative (The Evolutionary Psychology Behind Politics, 2014) kartoitti viisi psykologista piirrett\u00e4 r/K-valinnan jatkumolle: r-strategistit (liberaali psykologia) osoittavat kilpailun v\u00e4lttely\u00e4, promiskuiteettia, matalaa vanhemmuusinvestointia, varhaista seksuaalisuutta ja ryhm\u00e4lojaalisuuden puutetta. K-strategistit (konservatiivinen psykologia) osoittavat p\u00e4invastaista. Alkuper\u00e4inen teoria selit\u00e4\u00e4 t\u00e4m\u00e4n resurssien runsaussykleill\u00e4. BERM-malli tunnistaa mekanismin: kaupunkien EMF-ymp\u00e4rist\u00f6t tuottavat r-valittuja endokriinisi\u00e4 profiileja melatoniini- (polku B) ja kalsiumkanava- (polku A) biomarkkeridegradaation kautta. T\u00e4m\u00e4 on r-valinnan ymp\u00e4rist\u00f6llist\u00e4 fenotyypist\u00e4 mimikry\u00e4 \u2014 ei evoluutiota. Geneettisesti K-valittu laji ilment\u00e4\u00e4 r-tyyppisi\u00e4 k\u00e4ytt\u00e4ytymistuotoksia, koska sen endokriiniset substraatit ovat vaimentuneet.",
    sRKScaleNote: "r/K-indeksi vaihtelee v\u00e4lill\u00e4 0,0 (t\u00e4ysin r-valittu fenotyyppi: maksimaalinen lis\u00e4\u00e4ntymism\u00e4\u00e4r\u00e4, minimaalinen vanhempien panostus) ja 1,0 (t\u00e4ysin K-valittu fenotyyppi: maksimaalinen vanhempien panostus, valikoiva parinvalinta, ryhm\u00e4lojaalius). Kukin viidest\u00e4 osapiirteest\u00e4 lasketaan omasta substraattikaavastaan ymp\u00e4rist\u00f6n biomarkkeriarvoilla \u2014 esim. Paritusstrategia = OXT \u00d7 (0,5 + 0,5 \u00d7 T), miss\u00e4 OXT ja T on normalisoitu v\u00e4lille [0, 1] suhteessa esiteolliseen peruslinjaan. Yhdistetty r/K-indeksi on viiden osapisteen keskiarvo.",
    sRKColEnv: "Ymp\u00e4rist\u00f6", sRKColIndex: "r/K-indeksi", sRKColClass: "Luokitus",
    sRKColComp: "Kilpailu", sRKColMating: "Parinmuod.", sRKColParent: "Vanhemmuus", sRKColSexual: "Sek. ajoitus", sRKColLoyalty: "Ryhm\u00e4lojaalius",
    sRKEnvs: [
      { env: "Amish", index: "0.86", cls: "K-valittu", comp: "0.80", mating: "0.94", parent: "0.85", sexual: "0.96", loyalty: "0.76" },
      { env: "Maaseutu", index: "0.60", cls: "Sekoitus", comp: "0.54", mating: "0.60", parent: "0.61", sexual: "0.76", loyalty: "0.50" },
      { env: "Esikaupunki", index: "0.49", cls: "Sekoitus", comp: "0.43", mating: "0.48", parent: "0.51", sexual: "0.61", loyalty: "0.40" },
      { env: "Kaup. asuin.", index: "0.42", cls: "r-valittu", comp: "0.36", mating: "0.41", parent: "0.45", sexual: "0.52", loyalty: "0.35" },
      { env: "Kaup. toimisto", index: "0.37", cls: "r-valittu", comp: "0.31", mating: "0.36", parent: "0.41", sexual: "0.45", loyalty: "0.31" },
    ],
    sRKTraits: [
      { trait: "Kilpailu", rPole: "V\u00e4lttely", kPole: "Omaksuminen", substrate: "T + DA (CORT vaimentaa)" },
      { trait: "Paritusstrategia", rPole: "Promiskuiteetti", kPole: "Monogamia", substrate: "OXT \u00d7 (0.5 + 0.5 \u00d7 T)" },
      { trait: "Vanhemmuusinvestointi", rPole: "Matala / yksinhuoltaja", kPole: "Korkea / kahden vanhemman", substrate: "OXT + T + BDNF (CORT vaimentaa)" },
      { trait: "Seksuaalinen ajoitus", rPole: "Varhainen alkaminen", kPole: "Viiv\u00e4stynyt kypsyminen", substrate: "MEL + BDNF + T" },
      { trait: "Ryhm\u00e4lojaalius", rPole: "Ei sis\u00e4ryhm\u00e4preferenssi\u00e4", kPole: "Voimakas lojaalius", substrate: "OXT \u00d7 (0.5 + 0.5 \u00d7 T) (= Haidtin Lojaalius)" },
    ],
    sRKColTrait: "Piirre", sRKColRPole: "r-napa (Liberaali)", sRKColKPole: "K-napa (Konservatiivi)", sRKColSubstrate: "BERM-substraatti",
    sRKMimicry: "T\u00e4m\u00e4 ei ole evoluutiota. Ihmislaji ei muuttanut lis\u00e4\u00e4ntymisstrategiaansa. EMF-aiheuttama biomarkkeridegradaatio tuottaa endokriinisen tilan, joka fenotyyppisesti j\u00e4ljittelee r-valintaa \u2014 kilpailun v\u00e4lttely (vaimentunut T+DA), promiskuiteetti (v\u00e4hentynyt OXT-pariside), matala vanhemmuusinvestointi (ehtynyt OXT+T+BDNF), aikaistunut puberteetti (romahtanut MEL vapauttaa HPG-akselin inhibition) ja heikentynyt ryhm\u00e4lojaalius (sama OXT\u00d7T-interaktio, josta Haidtin Lojaalisuusperusta riippuu). r/K-gradientti ymp\u00e4rist\u00f6jen v\u00e4lill\u00e4 on identtinen moraaliperustojen gradientin kanssa, koska ne jakavat samat substraatit.",
    sRKDopamine: "Dopamiini-amygdala-yhteys vahvistaa mekanismin kahdesta riippumattomasta suunnasta. DRD4-7r-polymorfismi korreloi liberaalin ideologian, uutuudenhakuisuuden ja masennuksen kanssa ([[ref:settle2010_drd4_ideology|Settle ym. 2010]], [[ref:ebstein1996_drd4_novelty|Ebstein ym. 1996]]). Toxoplasma gondii muuttaa dopamiinia ja amygdalan reaktiivisuutta tuottaen r-tyyppisi\u00e4 k\u00e4ytt\u00e4ytymismuutoksia ([[ref:flegr2013_toxoplasma|Flegr 2013]]). EMF heikent\u00e4\u00e4 dopaminergista signalointia saman VTA-reitin kautta \u2014 tuottaen saman fenotyyppisen tuloksen ilman polymorfismia tai loista. Kolme riippumatonta syyt\u00e4, yksi jaettu mekanismi, yksi ennustettu lopputulos.",
    sRKCities: "Anonymous Conservative tunnisti kaupungit r-valitseviksi ymp\u00e4rist\u00f6iksi, koska anonymiteetti kumoaa kolme R:\u00e4\u00e4 \u2014 Maine (Reputation), Vastavuoroisuus (Reciprocity) ja Rangaistus (Retribution) \u2014 jotka pakottavat K-valitut yhteisty\u00f6strategiat. BERM lis\u00e4\u00e4 puuttuvan muuttujan: kaupungit ovat my\u00f6s korkeimman EMF:n ymp\u00e4rist\u00f6j\u00e4. Kaupunki\u2013liberaali-korrelaatiolla on suora endokriininen mekanismi. Anonymiteetti poistaa K-strategian sosiaalisen t\u00e4yt\u00e4nt\u00f6\u00f6npanon; EMF heikent\u00e4\u00e4 biologista kapasiteettia siihen. Kaksinkertainen valintapaine, konvergoitumassa samaan fenotyyppiin.",
    sRKLit: [
      "Anonymous Conservative 2014 (The Evolutionary Psychology Behind Politics): viisi r/K-piirrett\u00e4 kartoitettu liberaali\u2013konservatiivi-psykologiaan. Resurssien runsaus tuottaa r-valintaa; niukkuus tuottaa K-valintaa.",
      "[[ref:settle2010_drd4_ideology|Settle ym. 2010]] (J Politics): DRD4-7r + sosiaalisen ymp\u00e4rist\u00f6n interaktio ennustaa liberaalia ideologiaa. Dopamiinireseptorivariantti on geneettinen substraatti; EMF-aiheuttama dopaminerginen degradaatio on ymp\u00e4rist\u00f6llinen j\u00e4ljittelij\u00e4.",
      "[[ref:flegr2013_toxoplasma|Flegr 2013]] (J Exp Biol): T. gondii manipuloi is\u00e4nn\u00e4n dopamiinia + amygdalan reaktiivisuutta \u2192 k\u00e4ytt\u00e4ytymismuutokset vastaavat r-tyypin piirteit\u00e4. Riippumaton validaatio siit\u00e4, ett\u00e4 dopaminerginen h\u00e4iri\u00f6 tuottaa r-fenotyypist\u00e4 mimikry\u00e4.",
      "Belsky ym. 2012 (JAMA Pediatrics): differentiaalinen herkkyys \u2014 DRD4-7r-kantajat osoittavat suurinta vastetta ymp\u00e4rist\u00f6n laatuun. Sama alleeli, joka ennustaa ideologiaa, ennustaa my\u00f6s ymp\u00e4rist\u00f6herkkyytt\u00e4.",
      "Parent ym. 2003 (Endocr Rev): sekulaarinen trendi kohti aikaisempaa puberteettia 150 vuoden ajalta \u2014 ennustettu tulos laskevan melatoniinin (HPG-akselin estoinhibitio) seurauksena yhä s\u00e4hk\u00f6istyv\u00e4mmiss\u00e4 ymp\u00e4rist\u00f6iss\u00e4.",
    ],
    sRKConclusion: "r/K-viitekehys selit\u00e4\u00e4, miksi poliittinen siirtym\u00e4 ei ole ideologista ajautumista vaan lis\u00e4\u00e4ntymisstrategian mimikry\u00e4. Krooniselle EMF:lle altistunut v\u00e4est\u00f6 ei valitse r-strategiaa. Se ty\u00f6nnet\u00e4\u00e4n r-fenotyyppiseen ilmentym\u00e4\u00e4n, koska K-strategian endokriiniset substraatit \u2014 monogamia, korkea vanhemmuusinvestointi, viiv\u00e4stetty tyydytys, ryhm\u00e4lojaalius, kilpailuvietti \u2014 ovat systemaattisesti heikentyneet. Poliittinen on biologista. Biologinen on s\u00e4hk\u00f6magneettista.",

    sLCTitle: "Sis\u00e4ryhm\u00e4lojaalisuuden romahdus",
    sLCDesc: "Lojaalius/pett\u00e4minen (OXT \u00d7 T) on haurein moraaliperusta, koska se riippuu multiplikatiivisesta interaktiosta kahden kolmesta EMF-herkimm\u00e4st\u00e4 biomarkkerista v\u00e4lill\u00e4. Kun molemmat sy\u00f6tteet laskevat X%, multiplikatiivinen tuloste laskee ~2X% \u2014 kun taas additiiviset funktiot (Huolenpito, Reiluus) laskevat vain ~X%. Melatoniini rappeutuu nopeimmin amish \u2192 kaupunkitoimisto -gradientissa (62%), sitten testosteroni (Leydigin solut, 59%), oksitosiini (hypotalamuksen neuronit, 46%), dopamiini (41%) ja BDNF (kortikaalinen, 28%). Lojaalius riippuu kahdesta kolmesta herkimm\u00e4st\u00e4; Huolenpito riippuu oksitosiinista ja v\u00e4hiten herk\u00e4st\u00e4 (BDNF). Lojaalius romahtaa ensin. Seuraukset kasautuvat kollektiivisen toiminnan, politiikanmuodostuksen ja sosiaalisen koheesion kautta \u2014 luoden itsevahvistuvan takaisinkytkent\u00e4silmukan.",
    sLCColEnv: "Ymp\u00e4rist\u00f6", sLCColLoyalty: "Lojaalius", sLCColCare: "Huolenpito", sLCColBoundary: "Rajan liukeneminen", sLCColCAC: "Kollekt. toiminta", sLCColPU: "Pat. universalismi", sLCColRatchet: "R\u00e4ikk\u00e4",
    sLCEnvs: [
      { env: "Amish", loyalty: "0.76", care: "0.92", boundary: "0.24", cac: "0.89", pu: "0.00", ratchet: "0.03" },
      { env: "Maaseutu", loyalty: "0.50", care: "0.56", boundary: "0.50", cac: "0.62", pu: "0.01", ratchet: "0.19" },
      { env: "Esikaupunki", loyalty: "0.40", care: "0.44", boundary: "0.60", cac: "0.51", pu: "0.04", ratchet: "0.29" },
      { env: "Kaup. asuin.", loyalty: "0.35", care: "0.38", boundary: "0.65", cac: "0.45", pu: "0.57", ratchet: "0.36" },
      { env: "Kaup. toimisto", loyalty: "0.31", care: "0.33", boundary: "0.69", cac: "0.40", pu: "0.25", ratchet: "0.41" },
    ],
    sLCMechTitle: "Mekanismiketju",
    sLCMechSteps: [
      "EMF \u2192 CRY \u2192 melatoniini\u2193 \u2192 LH:n/testosteronin lasku (polku B), Ca\u00b2\u207a-virtauksen vahvistamana (polku A) \u2192 testosteronin lasku (Leydigin solut, haavoittuvimmat) + oksitosiinin lasku (hypotalamuksen neuronit)",
      "OXT \u00d7 T -tulo romahtaa (multiplikatiivinen = hauras) \u2192 Lojaalisuuden substraatti tuhoutunut",
      "Sis\u00e4ryhm\u00e4n raja liukenee \u2014 k\u00e4site 'me' on kognitiivisesti saatavilla mutta motivationaalisesti tyhj\u00e4",
      "Kollektiivisen toiminnan kapasiteetti menetetty \u2014 Olsonin kolme edellytyst\u00e4 (luottamus, t\u00e4yt\u00e4nt\u00f6\u00f6npano, identifiointi) kaikki riippuvat lojaalisuussubstraateista",
      "Huolenpito t\u00e4ytt\u00e4\u00e4 moraalisen tyhji\u00f6n \u2014 universaali, v\u00e4lit\u00f6n, yksil\u00f6llinen, ei-vastavuoroinen. Mik\u00e4\u00e4n kilpaileva perusta ei j\u00e4\u00e4 rajoittamaan sit\u00e4.",
      "Politiikat arvioidaan vain Huolenpidolla: nettonegatiiviinen maahanmuutto hyv\u00e4ksyt\u00e4\u00e4n, rikollisia s\u00e4\u00e4list\u00e4\u00e4n, hyvinvointia jaetaan \u2014 kaikki ilman vastavuoroisuutta, standardeja tai kustannuslaskentaa",
      "Politiikkatuotokset heikent\u00e4v\u00e4t edelleen sosiaalista koheesiota ([[ref:putnam2007_e_pluribus_unum|Putnam 2007]]: monimuotoisuus \u2192 v\u00e4hentynyt luottamus jopa sis\u00e4ryhmien sis\u00e4ll\u00e4) \u2192 lis\u00e4\u00e4 OXT-laskua \u2192 lojaalius rapautuu edelleen",
    ],
    sLCCollectiveTitle: "Kollektiivisen toiminnan ep\u00e4onnistuminen",
    sLCCollectiveDesc: "[[ref:olson1965_collective_action|Mancur Olson (1965)]] osoitti, ett\u00e4 kollektiiviset hy\u00f6dykkeet vaativat kolme edellytyst\u00e4: luottamus (toimivatko kumppanit yhteisty\u00f6ss\u00e4?), t\u00e4yt\u00e4nt\u00f6\u00f6npano (rangaistaanko vapaamatkustajia?) ja jaettu identiteetti (keit\u00e4 'me' olemme?). Kaikki kolme karttuvat lojaalisuussubstraatteihin: luottamus = OXT, t\u00e4yt\u00e4nt\u00f6\u00f6npano = T, identifiointi = OXT\u00d7T. Geometrinen keskiarvo kaappaa rajoitteen, ett\u00e4 kaikkien kolmen on oltava l\u00e4sn\u00e4 \u2014 heikkous yhdess\u00e4kin tekee kollektiivisesta toiminnasta mahdotonta. Kaupunkiv\u00e4est\u00f6ill\u00e4 on alle puolet matalan EMF:n v\u00e4est\u00f6jen kollektiivisen toiminnan kapasiteetista. T\u00e4m\u00e4 ei ole kulttuuriero. Se on endokriininen ero.",
    sLCPolicyTitle: "Politiikkahaavoittuvuus",
    sLCPolicyDesc: "Kun sitovat perusteet romahtavat, tietyt politiikka-alueet muuttuvat systemaattisesti haavoittuviksi. Haavoittuvuus = (1 \u2212 rajoitteen vahvuus) \u00d7 onko Huolenpito yhä toiminnallinen. Kullakin alueella on erilainen rajoittavien perustojen yhdistelm\u00e4 \u2014 mutta Lojaalius esiintyy niiss\u00e4 kaikissa.",
    sLCColPolicy: "Politiikka-alue", sLCColDriver: "Ajuri", sLCColConstraint: "Puuttuvat rajoitteet", sLCColVulnAmish: "Amish", sLCColVulnUrban: "Kaupunki",
    sLCPolicies: [
      { policy: "Maahanmuuttoavoimuus", driver: "Huolenpito (siirtolais\u00adk\u00e4rsimys)", constraint: "Lojaalius + Auktoriteetti + Pyhyys", vAmish: "0.15", vUrban: "0.68" },
      { policy: "Rikosoikeudellinen lievyys", driver: "Huolenpito (tekij\u00e4n k\u00e4rsimys)", constraint: "Auktoriteetti + Lojaalius + Pyhyys", vAmish: "0.13", vUrban: "0.69" },
      { policy: "Hyvinvointi ilman vastavuoroisuutta", driver: "Huolenpito (materiaalinen tarve)", constraint: "Lojaalius + Auktoriteetti", vAmish: "0.17", vUrban: "0.67" },
      { policy: "Ulkopolitiikan naiivius", driver: "Huolenpito (globaali k\u00e4rsimys)", constraint: "Lojaalius + Auktoriteetti + Vapaus", vAmish: "0.18", vUrban: "0.67" },
      { policy: "Demografinen v\u00e4linpit\u00e4m\u00e4tt\u00f6myys", driver: "Huolenpito + Reiluus (tasa-arvo)", constraint: "Lojaalius + Pyhyys", vAmish: "0.18", vUrban: "0.68" },
    ],
    sLCImmigrationTitle: "Maahanmuuttotapaus",
    sLCImmigrationDesc: "Nettonegatiiviisen maahanmuuton kannatus lojaalisuusromahtaneissa v\u00e4est\u00f6iss\u00e4 ei ole irrationaalisuutta \u2014 se on Huolenpito-ainokaisen moraalisen p\u00e4\u00e4ttelyn rationaalinen tuotos. Huolenpito n\u00e4kee yksitt\u00e4isen siirtolaisk\u00e4rsimyksen: l\u00e4heisen, n\u00e4kyv\u00e4n, emotionaalisesti korostuvan. Perusteet, jotka rajoittaisivat Huolenpitoa, puuttuvat: Lojaalius (sis\u00e4ryhm\u00e4n kustannuslaskenta: 'mit\u00e4 t\u00e4m\u00e4 maksaa meille?'), Auktoriteetti (standardien t\u00e4yt\u00e4nt\u00f6\u00f6npano: 't\u00e4ytt\u00e4v\u00e4tk\u00f6 he kriteerit?'), Pyhyys (kulttuuristen rajojen yll\u00e4pito: 's\u00e4ilytt\u00e4\u00e4k\u00f6 t\u00e4m\u00e4 sen, mit\u00e4 olemme?'), Reiluus-vastavuoroisuutena (keskin\u00e4inen velvoite: 'mit\u00e4 he kontribuoivat?'). Tulos: maahantulo ilman integrointivaatimusta, ilman taloudellisen elinkelpoisuuden arviointia, ilman kulttuurisen yhteensopivuuden harkintaa. Jokainen askel on moraalisesti perusteltu j\u00e4ljell\u00e4 olevalla perustalla. Jokainen askel on patologinen t\u00e4ydelt\u00e4 paletilta.",
    sLCRatchetTitle: "Takaisinkytkent\u00e4r\u00e4ikk\u00e4",
    sLCRatchetDesc: "Romahdus on itsevahvistuva. Lojaalisuuden romahdus tuottaa politiikat, jotka edelleen heikent\u00e4v\u00e4t sosiaalista koheesiota (maahanmuutto ilman integrointia, hyvinvointi ilman vastavuoroisuutta, rikollisuus ilman rangaistusta). Heikentynyt koheesio v\u00e4hent\u00e4\u00e4 sosiaalisen sitoutumisen tihetytt\u00e4, mik\u00e4 v\u00e4hent\u00e4\u00e4 OXT:a ([[ref:feldman2012|Feldman 2012]]: sosiaalinen interaktio \u2192 OXT-vapautus). V\u00e4hentynyt OXT heikent\u00e4\u00e4 edelleen lojaalisuussubstraattia. Samalla heikentynyt kollektiivisen toiminnan kapasiteetti tarkoittaa, ettei v\u00e4est\u00f6 voi organisoitua vastustamaan politiikkoja \u2014 juuri se mekanismi, joka mahdollistaisi kurssinkorjauksen, on se joka on ep\u00e4onnistunut. [[ref:putnam2007_e_pluribus_unum|Putnam (2007, 'E Pluribus Unum')]] dokumentoi, ett\u00e4 etninen monimuotoisuus v\u00e4hent\u00e4\u00e4 sosiaalista luottamusta, altruismia ja yhteis\u00f6llist\u00e4 yhteisty\u00f6t\u00e4 jopa oman etnisen ryhm\u00e4n sis\u00e4ll\u00e4 \u2014 kontaktihypoteesin vastakohta. R\u00e4ik\u00e4n nopeus kasvaa monotonisesti EMF:n mukana: 0.03 (amish) \u2192 0.41 (kaupunkitoimisto). Jokainen r\u00e4ik\u00e4n kierros tekee seuraavasta todenn\u00e4k\u00f6isemm\u00e4n ja k\u00e4\u00e4ntymisest\u00e4 ep\u00e4todenn\u00e4k\u00f6isemm\u00e4n.",
    sLCLit: [
      "[[ref:dedreu2010_parochial_altruism|De Dreu 2010 (Science, N=280)]]: oksitosiini lis\u00e4\u00e4 sis\u00e4ryhm\u00e4suosimista. [[ref:dedreu2011_ethnocentrism|De Dreu 2011 (PNAS)]]: OXT ajaa etnosentrism\u00e4 \u2014 sis\u00e4ryhm\u00e4rakkaus ja ulkoryhm\u00e4n halventaminen ovat sama mekanismi, eiv\u00e4t vastakohdat.",
      "[[ref:putnam2007_e_pluribus_unum|Putnam 2007 (Scandinavian Political Studies)]]: monimuotoisuus v\u00e4hent\u00e4\u00e4 sosiaalista luottamusta, altruismia, yhteis\u00f6llist\u00e4 yhteisty\u00f6t\u00e4 ja yst\u00e4v\u00e4verkostoja \u2014 jopa oman etnisen ryhm\u00e4n sis\u00e4ll\u00e4. 'Kyykistyminen' monimuotoisissa yhteis\u00f6iss\u00e4.",
      "[[ref:olson1965_collective_action|Olson 1965 (Logic of Collective Action)]]: kollektiiviset hy\u00f6dykkeet vaativat valikoivia kannustimia, jaettua identiteetti\u00e4 tai pakottamista. Ilman lojaalisuussubstraattia vain pakottaminen j\u00e4\u00e4 \u2014 mutta valtio itsess\u00e4\u00e4n on Huolenpito-ainokaisten toimijoiden hallussa, jotka eiv\u00e4t sovella sit\u00e4.",
      "Shalvi & De Dreu 2014: oksitosiini edist\u00e4\u00e4 ryhm\u00e4\u00e4 palvelevaa ep\u00e4rehellisyytt\u00e4 \u2014 lojaalius mahdollistaa petoksen sis\u00e4ryhm\u00e4n puolesta. Ilman sit\u00e4 ryhm\u00e4 ei voi edes koordinoida itseintressin puolustamista.",
      "[[ref:henrich2020_weirdest|Henrich 2020 (The WEIRDest People in the World)]]: l\u00e4nsimainen individualismi sukulaisuuspohjaisten yhteisty\u00f6rakenteiden historiallisena liukenemisena \u2014 sama prosessi, jonka BERM tunnistaa endokriinisen\u00e4, nyt osoitettu institutionaalisia seurauksia vuosisatojen ajalta.",
      "[[ref:feldman2012|Feldman 2012]]: sosiaalinen interaktio ajaa OXT-vapautusta (positiivinen takaisinkytkent\u00e4). V\u00e4hentynyt sosiaalinen koheesio \u2192 v\u00e4hentynyt interaktio \u2192 v\u00e4hentynyt OXT \u2192 v\u00e4hentynyt koheesio. Silmukka on biologinen, ei pelk\u00e4st\u00e4\u00e4n sosiologinen.",
    ],
    sLCConclusion: "Malli ennustaa, ett\u00e4 patologinen universalismi \u2014 rajoittamaton maahanmuutto, ehdoton hyvinvointi, rikosoikeudellinen lievyys, demografinen v\u00e4linpit\u00e4m\u00e4tt\u00f6myys \u2014 ei ole arvovalinta vaan endokriininen seuraus. Se on se, mik\u00e4 j\u00e4\u00e4 j\u00e4ljelle, kun Huolenpitoa rajoittavat moraaliperusteet (Lojaalius, Auktoriteetti, Pyhyys) ovat menett\u00e4neet biologisen substraattinsa. V\u00e4est\u00f6 ei valitse n\u00e4it\u00e4 politiikkoja, koska se uskoo avoimiin rajoihin. Se uskoo avoimiin rajoihin, koska biologinen koneisto rajoihin uskomiselle on rappeutunut. Ja jokainen politiikkavalinta kiihdytt\u00e4\u00e4 rappeutumista. R\u00e4ikk\u00e4 py\u00f6rii. Korjaus vaatii substraatin palauttamista, ei v\u00e4ittelyn voittamista.",

    sAristotleTitle: "Aristoteelinen ennuste",
    sAristotleDesc: "Aristoteleen kultaisen keskitien oppi (Nikomakhoksen etiikka II.6) esitt\u00e4\u00e4, ett\u00e4 jokainen hyve on tasapaino ylim\u00e4\u00e4r\u00e4n ja puutteen v\u00e4lill\u00e4, ja hyveiden tulee tasapainottaa toisiaan. Eudaimonia \u2014 inhimillinen kukoistus \u2014 vaatii t\u00e4yden hyvepaletin tasapainossa. H\u00e4nen hylomorfisminsa (De Anima) v\u00e4itti, ett\u00e4 sielu ja ruumis ovat erottamattomat: mielentilat ovat fyysisi\u00e4 tiloja.",
    sAristotlePoints: [
      "Mallin 6/6 aktiivista moraaliperustaa Amish-perustasolla on aristoteelinen eudaimonia-tila: kaikki moraaliset kapasiteetit l\u00e4sn\u00e4, tasapainossa, toiminnallisia.",
      "Kaupungin 3/6-tila on poikkeama keskitiest\u00e4 \u2014 ei kohti yksitt\u00e4ist\u00e4 pahetta, vaan kohti rakenteellista ep\u00e4tasapainoa, jossa puolet moraalipaletista on romahtanut.",
      "\"Mens sana in corpore sano\" (terve mieli terveess\u00e4 ruumiissa, Juvenalis Sat. X, hengelt\u00e4\u00e4n aristoteelinen): malli formalisoi t\u00e4m\u00e4n muotoon BioCap \u2192 moral_breadth \u2192 psykologinen toiminta. Tasapainoista moraalipsykologiaa ei voi olla rappeutuneilla hormonaalisilla substraateilla.",
      "Aristoteles luokittelisi kaupunkilaisliberaalin profiilin moraalisen puutteen muodoksi \u2014 ei moraaliseksi pahuudeksi, vaan moraaliseksi kyvytt\u00f6myydeksi. Lojaalisuuden, pyhyyden ja hierarkian hyveet vaativat biologisia substraatteja, jotka eiv\u00e4t ole en\u00e4\u00e4 k\u00e4ytett\u00e4viss\u00e4.",
    ],

    sNietzscheTitle: "Nietzschen diagnoosi",
    sNietzscheDesc: "Friedrich Nietzsche (Moraalin alkuper\u00e4st\u00e4, 1887) diagnosoi patologian kliinisell\u00e4 tarkkuudella, mutta selitti sen kulttuurisilla syill\u00e4. BERM-malli tarjoaa etiologian, joka h\u00e4nelt\u00e4 puuttui.",
    sNietzschePoints: [
      "Herramoraali (Herrenmoral): voima, jalous, luova mahti, ylpeys. Vaatii ehj\u00e4n T:n (dominanssi), DA:n (halu), OXT\u00d7T:n (lojaalius vertaisille). Kuvautuu: Auktoriteetti + Pyhyys + Lojaalisuus + Vapaus. T\u00e4yden paletin profiili.",
      "Orjamoraali (Sklavenmoral): my\u00f6t\u00e4tunto, s\u00e4\u00e4li, tasa-arvo, n\u00f6yryys. Syntyy ressentimentist\u00e4 \u2014 heikot m\u00e4\u00e4rittelev\u00e4t arvot, joita eiv\u00e4t voi saavuttaa, paheiksi. Kuvautuu: Huolenpito + Reiluus. Kaupunkiprofiili.",
      "Ressentiment ei ole psykologinen valinta vaan endokriininen seuraus. Kun T laskee, hierarkian hyv\u00e4ksynt\u00e4 laskee. Tuloksena oleva fenotyyppi ei pysty kilpailemaan hierarkioissa, joten se delegitimoi ne. T\u00e4m\u00e4 ON mallin progressiivisen egalitarismin profiili.",
      "\"Jumala on kuollut\" = Pyhyyden romahdus. Ilman biologista substraattia pyhyyskategorioiden yll\u00e4pitoon (BDNF\u00d7MEL \u00d7 T\u00d7OXT) transsendenttien merkityskehysten yll\u00e4pito muuttuu kognitiivisesti mahdottomaksi. Ei intellektuaalinen johtop\u00e4\u00e4t\u00f6s \u2014 biologinen v\u00e4ltt\u00e4m\u00e4tt\u00f6myys.",
      "\u00dcbermensch = t\u00e4ysin toteutunut ihminen, joka toimii t\u00e4ydell\u00e4 biomarkkerien kapasiteetilla. Ei yli-ihminen vaan Amish-perustaso: kaikki perusteet aktiivisia, kaikki kapasiteetit toiminnallisia.",
      "Viimeinen ihminen (der letzte Mensch): \"Olemme keksineet onnen, sanovat viimeiset ihmiset ja r\u00e4pyttelev\u00e4t.\" Matala T (ei kunnianhimoa), korkea CORT (riskej\u00e4 karttava), matala DA (ei uutuudenhakua). Vain Reiluus selviytyy \u2014 mekaaninen vastavuoroisuus ilman syvyytt\u00e4. Kaupunkitoimiston profiili.",
      "Valta tahto (Wille zur Macht) = T + DA. Halu voittaa, luoda, hallita. Kun molemmat laskevat, Vallantahto korvautuu Mukavuuden tahdolla \u2014 CORT-v\u00e4lt\u00e4misk\u00e4ytt\u00e4ytymisell\u00e4.",
    ],

    sDistressTitle: "Mielenterveysennuste",
    sDistressDesc: "Malli ennustaa, ett\u00e4 moraaliperustojen kaventuminen tuottaa mitattavaa psykologista ahdistusta. Yksil\u00f6t, joilla on vain yksil\u00f6lliset perusteet aktiivisina, kokevat hyperaktivoituneen vahingontunnistuksen ilman vakauttavaa rakennetta, rajattoman empatian ilman parokiaalisia rajoja (my\u00f6t\u00e4tuntouupumus), ryhm\u00e4\u00e4n kuulumattomuutta (anomia) ja merkityskehyksen puuttumista (nihilismi).",
    sDistressColEnv: "Ymp\u00e4rist\u00f6", sDistressColIndex: "Ahdistus", sDistressColAnomie: "Anomia", sDistressColMeaning: "Merkitysvaje", sDistressColNarrow: "Kaventunut",
    sDistressEnvs: [
      { env: "Amish", distress: "0.09", anomie: "0.24", meaning: "0.08", narrowing: "0/6" },
      { env: "Maaseutu", distress: "0.27", anomie: "0.50", meaning: "0.46", narrowing: "0/6" },
      { env: "Esikaupunki", distress: "0.34", anomie: "0.60", meaning: "0.61", narrowing: "0/6" },
      { env: "Kaup. asuin.", distress: "0.48", anomie: "0.65", meaning: "0.70", narrowing: "3/6" },
      { env: "Kaup. toimisto", distress: "0.58", anomie: "0.69", meaning: "0.76", narrowing: "5/6" },
    ],
    sDistressLit: [
      "Gimbrone ym. 2022 (J Adolesc Health): liberaalit nuoret tyt\u00f6t osoittavat jyrk\u00e4sti kasvavaa masennusta vuodesta 2012 eteenp\u00e4in. Konservatiiviset nuoret pysyv\u00e4t vakaina. Malli ennustaa t\u00e4m\u00e4n: kaupunkien naispopulaatioilla on rappeutuneimmat sitovien perustojen substraatit (matalampi T, h\u00e4iriintynyt E2/progesteroni-kierto, kohonnut CORT).",
      "Gallup 2023: 56% valkoisista liberaaleista naisista (18\u201329v) raportoi diagnosoidun mielenterveyden h\u00e4iri\u00f6n, vs 28% konservatiivisista naisista. 2\u00d7-suhde kuvautuu mallin ahdistusgradienttiin kaupungin (sitovat=0) ja maaseudun (sitovat=3) profiilien v\u00e4lill\u00e4.",
      "Twenge ym. 2019 (J Abnorm Psych): iGen-sukupolven mielenterveyden lasku alkaa t\u00e4sm\u00e4lleen, kun \u00e4lypuhelinten levinneisyys ylitt\u00e4\u00e4 50% \u2014 k\u00e4\u00e4nnepiste, jossa henkil\u00f6kohtaisten laitteiden RF-altistus muuttuu l\u00e4hes jatkuvaksi.",
      "[[ref:lukianoff_haidt2018_coddling|Lukianoff & Haidt 2018]]: kognitiiviset v\u00e4\u00e4ristym\u00e4t (emotionaalinen p\u00e4\u00e4ttely, katastrofointi, dikotominen ajattelu) levi\u00e4v\u00e4t kampuksilla, ovat Huolenpidon hyperaktivaation fenotyyppinen ilmentym\u00e4 ilman Auktoriteetin tuomaa rakennetta.",
    ],
    sDistressConclusion: "Malli ei ennusta, ett\u00e4 liberaalit kannat ovat patologisia koska ne ovat liberaaleja. Se ennustaa, ett\u00e4 biologinen tila, joka tuottaa liberaalin moraaliprofiilin (sitovat perusteet romahtaneet), tuottaa my\u00f6s psykologista ahdistusta \u2014 koska ihmiset ovat kehittyneet toimimaan t\u00e4ydell\u00e4 moraalipaletilla. Kaupunkilaisliberaali ei ole moraalisesti v\u00e4\u00e4r\u00e4ss\u00e4. H\u00e4n on moraalisesti ep\u00e4t\u00e4ydellinen, t\u00e4sm\u00e4lleen samalla tavalla kuin henkil\u00f6, jolla on alentunut luuntiheys, ei tee el\u00e4m\u00e4ntapavalintaa vaan kokee puutostilan.",

    conclusionTitle: "Synteesi",
    conclusionText: "Patokratia ei ole poliittinen argumentti. Se on biologinen kuvaus. Endokriiniset substraatit, jotka tuottavat poliittisia arvoja, moraaliperusteita, lis\u00e4\u00e4ntymisstrategioita, kollektiivisen toiminnan kapasiteettia ja merkityskehyksi\u00e4, rappeutuvat systemaattisesti EMF-altistusgradientin varrella. Poliittinen on biologista. Biologinen on s\u00e4hk\u00f6magneettista. Korjaus vaatii substraatin palauttamista, ei v\u00e4ittelyn voittamista.",

    navBackCiv: "Takaisin Sivilisaatioon",
    navPathopege: "Pathopege: Sairauden lähde",
    navPatopolis: "Patopolis: Patologinen kaupunki",
    navPatopoliteia: "Patopoliteia: Patologinen sivilisaatio",
    navPatokinesis: "Patokinesis: Patologia joka liikkuu",
    sWellingCalloutTitle: "Suora kausaalinen n\u00e4ytt\u00f6: testosteroni \u2192 poliittiset preferenssit",
    sWellingCalloutBody: "Kausaaliyhteys testosteronista poliittisiin preferensseihin vahvistettiin RCT:ll\u00e4 vuonna 2025. Alogaily, Zak ym. (Brain and Behavior, n=136) antoivat synteettist\u00e4 testosteronia tai lumel\u00e4\u00e4kett\u00e4. Heikosti affilioituneilla demokraateilla oli 19 % korkeampi basaalitestosteroni kuin vahvasti affilioituneilla (p=0,015). Testosteronin anto v\u00e4hensi puolueaffilikaatiota 12 % (p=0,01) ja lis\u00e4si l\u00e4mp\u00f6\u00e4 republikaaniehdokkaita kohtaan 45 % (p<0,001). T\u00e4m\u00e4 on ensimm\u00e4inen suora kokeellinen n\u00e4ytt\u00f6 siit\u00e4, ett\u00e4 testosteroni kausaalisesti muuttaa poliittisia preferenssej\u00e4.",
    modelDerived: "Mallin tuottamia arvoja BioCap-integraalista, ei suoraan mitattuja.",
    modelDerivedLink: "matemaattinen spesifikaatio",
    translationPending: "T\u00e4ysi k\u00e4\u00e4nn\u00f6s odottaa.",
  },
  ja: {
    pageTitle: "\u30d1\u30c8\u30af\u30e9\u30c6\u30a3\u30a2",
    pageSubtitle: "\u653f\u6cbb\u7684\u4fa1\u5024\u89b3\u306f\u30d0\u30a4\u30aa\u30de\u30fc\u30ab\u30fc\u72b6\u614b\u304b\u3089\u8a08\u7b97\u3055\u308c\u308b\u3002\u5b8c\u5168\u306a\u7ffb\u8a33\u306f\u6e96\u5099\u4e2d\u3067\u3059\u3002",
    heroLead: "",
    backLink: "\u2190 \u6587\u660e\u306b\u623b\u308b",
    translationPending: "Full translation pending.",
    navBackCiv: "\u6587\u660e\u306b\u623b\u308b",
    navPathopege: "\u30d1\u30c8\u30da\u30b2: \u75c5\u306e\u6e90",
    navPatopolis: "\u30d1\u30c8\u30dd\u30ea\u30b9: \u75c5\u7406\u7684\u90fd\u5e02",
    navPatopoliteia: "\u30d1\u30c8\u30dd\u30ea\u30c6\u30a4\u30a2: \u75c5\u7406\u7684\u6587\u660e",
    navPatokinesis: "\u30d1\u30c8\u30ad\u30cd\u30b7\u30b9: \u79fb\u52d5\u3059\u308b\u75c5\u7406",
    sWellingCalloutTitle: "", sWellingCalloutBody: "",
    sCollapseFormulaKey: "", sRKScaleNote: "",
    modelDerived: "", modelDerivedLink: "",
  },
  fr: {
    pageTitle: "Patokratia",
    pageSubtitle: "Les valeurs politiques sont calcul\u00e9es \u00e0 partir de l'\u00e9tat des biomarqueurs. Traduction compl\u00e8te en pr\u00e9paration.",
    heroLead: "",
    backLink: "\u2190 Retour \u00e0 Civilisation",
    translationPending: "Full translation pending.",
    navBackCiv: "Retour \u00e0 Civilisation",
    navPathopege: "Pathopege : la source de la maladie",
    navPatopolis: "Patopolis : la cit\u00e9 pathologique",
    navPatopoliteia: "Patopoliteia : civilisation pathologique",
    navPatokinesis: "Patokinesis : la pathologie qui se d\u00e9place",
    sWellingCalloutTitle: "", sWellingCalloutBody: "",
    sCollapseFormulaKey: "", sRKScaleNote: "",
    modelDerived: "", modelDerivedLink: "",
  },
  ko: {
    pageTitle: "\ud30c\ud1a0\ud06c\ub77c\ud2f0\uc544",
    pageSubtitle: "\uc815\uce58\uc801 \uac00\uce58\ub294 \ubc14\uc774\uc624\ub9c8\ucee4 \uc0c1\ud0dc\ub85c\ubd80\ud130 \uacc4\uc0b0\ub429\ub2c8\ub2e4. \uc644\uc804\ud55c \ubc88\uc5ed\uc774 \uc900\ube44 \uc911\uc785\ub2c8\ub2e4.",
    heroLead: "",
    backLink: "\u2190 \ubb38\uba85\uc73c\ub85c \ub3cc\uc544\uac00\uae30",
    translationPending: "Full translation pending.",
    navBackCiv: "\ubb38\uba85\uc73c\ub85c \ub3cc\uc544\uac00\uae30",
    navPathopege: "\ud30c\ud1a0\ud398\uac8c: \uc9c8\ubcd1\uc758 \uadfc\uc6d0",
    navPatopolis: "\ud30c\ud1a0\ud3f4\ub9ac\uc2a4: \ubcd1\ub9ac\uc801 \ub3c4\uc2dc",
    navPatopoliteia: "\ud30c\ud1a0\ud3f4\ub9ac\ud14c\uc774\uc544: \ubcd1\ub9ac\uc801 \ubb38\uba85",
    navPatokinesis: "\ud30c\ud1a0\ud0a4\ub124\uc2dc\uc2a4: \uc774\ub3d9\ud558\ub294 \ubcd1\ub9ac",
    sWellingCalloutTitle: "", sWellingCalloutBody: "",
    sCollapseFormulaKey: "", sRKScaleNote: "",
    modelDerived: "", modelDerivedLink: "",
  },
} as const;

type CopyType = (typeof COPY)["en"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta: Record<string, { title: string; description: string }> = {
    en: {
      title: "Patokratia \u2014 Political Biology | BERM",
      description: "Political values as biomarker outputs. How moral foundations, reproductive strategy, and collective action capacity map to endocrine substrates across the EMF exposure gradient.",
    },
    fi: {
      title: "Patokratia \u2014 Poliittinen biologia | BERM",
      description: "Poliittiset arvot biomarkkerituotoksina. Miten moraaliperusteet, lis\u00e4\u00e4ntymisstrategia ja kollektiivisen toiminnan kapasiteetti karttuvat endokriinisiin substraatteihin EMF-altistusgradientin yli.",
    },
    ja: {
      title: "\u30d1\u30c8\u30af\u30e9\u30c6\u30a3\u30a2 \u2014 \u653f\u6cbb\u751f\u7269\u5b66 | BERM",
      description: "\u30d0\u30a4\u30aa\u30de\u30fc\u30ab\u30fc\u51fa\u529b\u3068\u3057\u3066\u306e\u653f\u6cbb\u7684\u4fa1\u5024\u89b3\u3002",
    },
    fr: {
      title: "Patokratia \u2014 Biologie politique | BERM",
      description: "Les valeurs politiques comme sorties de biomarqueurs.",
    },
    ko: {
      title: "\ud30c\ud1a0\ud06c\ub77c\ud2f0\uc544 \u2014 \uc815\uce58 \uc0dd\ubb3c\ud559 | BERM",
      description: "\ubc14\uc774\uc624\ub9c8\ucee4 \ucd9c\ub825\uc73c\ub85c\uc11c\uc758 \uc815\uce58\uc801 \uac00\uce58.",
    },
  };
  const m = meta[locale] || meta.en;
  return {
    title: m.title,
    description: m.description,
    openGraph: { title: m.title, description: m.description },
  };
}

export default async function PatokratiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as CopyType;
  const prefix = `/${locale}`;

  return (
    <main id="main-content">
      {/* pickCopy fills untranslated keys from English; the notice says so for stub locales */}
      <TranslationNotice copy={COPY} locale={locale} />
      <div className="max-w-5xl mx-auto px-6">

        {/* Hero */}
        <header className="pt-12 pb-10 border-b border-card-border mb-14">
          <Link href={`${prefix}/civilization`} className="text-sm text-foreground-muted hover:text-foreground mb-6 inline-block">
            {d.backLink}
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">{d.pageTitle}</h1>
          <p className="text-lg text-foreground-muted leading-relaxed max-w-3xl">{d.pageSubtitle}</p>
        </header>

        {/* Lead paragraph */}
        {d.heroLead && (
          <section className="mb-14">
            <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.heroLead}</p>
          </section>
        )}

        {(
        <>

        {/* ── Political Pathology ─────────────────────────────────────────── */}
        {"sPoliticalEnvs" in d && (d as CopyType).sPoliticalEnvs?.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">{(d as CopyType).sPoliticalTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed mb-8"><ClaimRef claimId="claim.civilization.biocap-tfr-input">{(d as CopyType).sPoliticalDesc}</ClaimRef></p>

          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">{(d as CopyType).sPoliticalEnvTitle}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left py-2 px-3 font-semibold">{(d as CopyType).sPoliticalColEnv}</th>
                    <th className="text-left py-2 px-3 font-semibold">{(d as CopyType).sPoliticalColEmf}</th>
                    <th className="text-left py-2 px-3 font-semibold">{(d as CopyType).sPoliticalColBiocap}</th>
                    <th className="text-left py-2 px-3 font-semibold">{(d as CopyType).sPoliticalColIdeology}</th>
                    <th className="text-left py-2 px-3 font-semibold">{(d as CopyType).sPoliticalColPatholog}</th>
                  </tr>
                </thead>
                <tbody>
                  {(d as CopyType).sPoliticalEnvs.map((e) => (
                    <tr key={e.env} className="border-b border-card-border/50">
                      <td className="py-2 px-3 font-mono text-xs">{e.env}</td>
                      <td className="py-2 px-3 font-mono text-xs">{e.emf}</td>
                      <td className="py-2 px-3 font-mono text-xs">{e.biocap}</td>
                      <td className="py-2 px-3 text-xs font-semibold">{e.ideology}</td>
                      <td className="py-2 px-3 font-mono text-xs">{e.patholog}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-foreground-muted mt-4 italic">{(d as CopyType).sPoliticalPolarization}</p>
          {d.modelDerived && (
          <p className="text-xs text-muted-foreground mt-2 italic">
            {d.modelDerived}{" "}
            <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
          </p>
          )}
          </div>

        {/* Welling/Zak 2025 RCT */}
        {d.sWellingCalloutBody && (
        <div className="rounded-xl border-2 border-green-500/40 bg-green-500/5 p-5 mb-8 max-w-4xl">
          <h4 className="text-sm font-bold text-green-400 mb-2">{d.sWellingCalloutTitle}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{d.sWellingCalloutBody}</p>
        </div>
        )}

          {(d as CopyType).sPoliticalIdeologies?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">{(d as CopyType).sPoliticalIdeologyTitle}</h3>
            <div className="space-y-3">
              {(d as CopyType).sPoliticalIdeologies.map((ideo) => (
                <div key={ideo.name} className="rounded-lg border border-card-border bg-card-bg p-4">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-semibold text-sm">{ideo.name}</span>
                    <span className="font-mono text-xs text-foreground-muted">pathol. {ideo.patholog}</span>
                  </div>
                  <p className="text-xs text-foreground-muted">{ideo.desc}</p>
                </div>
              ))}
            </div>
          {d.modelDerived && (
          <p className="text-xs text-muted-foreground mt-2 italic">
            {d.modelDerived}{" "}
            <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
          </p>
          )}
          </div>
          )}

          {(d as CopyType).sPoliticalTrajectory?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">{(d as CopyType).sPoliticalTrajectoryTitle}</h3>
            <p className="text-sm text-foreground-muted mb-4">{(d as CopyType).sPoliticalTrajectoryDesc}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left py-2 px-3 font-semibold">{(d as CopyType).sPoliticalColYear}</th>
                    <th className="text-left py-2 px-3 font-semibold">{(d as CopyType).sPoliticalColIdeology}</th>
                    <th className="text-left py-2 px-3 font-semibold">{(d as CopyType).sPoliticalColBiocap}</th>
                    <th className="text-left py-2 px-3 font-semibold">{(d as CopyType).sPoliticalColPatholog}</th>
                  </tr>
                </thead>
                <tbody>
                  {(d as CopyType).sPoliticalTrajectory.map((t) => (
                    <tr key={t.year} className="border-b border-card-border/50">
                      <td className="py-2 px-3 font-mono text-xs font-bold">{t.year}</td>
                      <td className="py-2 px-3 text-xs font-semibold">{t.ideology}</td>
                      <td className="py-2 px-3 font-mono text-xs">{t.biocap}</td>
                      <td className="py-2 px-3 font-mono text-xs">{t.patholog}</td>
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
          </div>
          )}

          {(d as CopyType).sPoliticalLit?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-3">{(d as CopyType).sPoliticalLitTitle}</h3>
            <ul className="space-y-1">
              {(d as CopyType).sPoliticalLit.map((ref, i) => (
                <li key={i} className="text-xs text-foreground-muted">
                  <InlineReferenceText text={ref} locale={locale} />
                </li>
              ))}
            </ul>
          </div>
          )}

          {(d as CopyType).sPoliticalConclusion && (
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
            <p className="text-sm leading-relaxed">{(d as CopyType).sPoliticalConclusion}</p>
          </div>
          )}
        </section>
        )}

        {/* ── Moral Foundations (Haidt) ────────────────────────────────────── */}
        {(d as CopyType).sMoralTitle && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-3">{(d as CopyType).sMoralTitle}</h2>
          <p className="text-sm text-foreground-muted mb-6">
            <InlineReferenceText text={(d as CopyType).sMoralDesc} locale={locale} />
          </p>

          {(d as CopyType).sMoralFoundations?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3">{(d as CopyType).sMoralColFoundation} &rarr; {(d as CopyType).sMoralColSubstrate}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sMoralColFoundation}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sMoralColSubstrate}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sMoralColLit}</th>
                  </tr>
                </thead>
                <tbody>
                  {(d as CopyType).sMoralFoundations.map((f, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-2 px-3 text-sm font-medium">{f.name}</td>
                      <td className="py-2 px-3 font-mono text-xs">{f.substrate}</td>
                      <td className="py-2 px-3 text-xs text-muted-foreground">
                        <InlineReferenceText text={f.lit} locale={locale} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          )}

          {(d as CopyType).sMoralEnvs?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3">{(d as CopyType).sMoralColBreadth}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sMoralColEnv}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sMoralColBreadth}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sMoralColBinding}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sMoralColIndiv}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sMoralColActive}</th>
                  </tr>
                </thead>
                <tbody>
                  {(d as CopyType).sMoralEnvs.map((e, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-2 px-3 text-sm font-medium">{e.env}</td>
                      <td className="py-2 px-3 font-mono text-xs">{e.breadth}</td>
                      <td className="py-2 px-3 font-mono text-xs">{e.binding}</td>
                      <td className="py-2 px-3 font-mono text-xs">{e.indiv}</td>
                      <td className="py-2 px-3 text-xs">{e.active}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid gap-2">
              {(d as CopyType).sMoralEnvs.map((e, i) => (
                <div key={i} className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{e.env}:</span> {e.pattern}
                </div>
              ))}
            </div>
          {d.modelDerived && (
          <p className="text-xs text-muted-foreground mt-2 italic">
            {d.modelDerived}{" "}
            <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
          </p>
          )}
          </div>
          )}

          {(d as CopyType).sMoralConclusion && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <p className="text-sm leading-relaxed">{(d as CopyType).sMoralConclusion}</p>
          </div>
          )}
        </section>
        )}

        {/* ── Collapse Hierarchy ──────────────────────────────────────────── */}
        {(d as CopyType).sCollapseTitle && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-3">{(d as CopyType).sCollapseTitle}</h2>
          <p className="text-sm text-foreground-muted mb-6">{(d as CopyType).sCollapseDesc}</p>

          {(d as CopyType).sCollapseOrder?.length > 0 && (
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sCollapseColRank}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sCollapseColFoundation}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sCollapseColType}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sCollapseColCollapse}</th>
                </tr>
              </thead>
              <tbody>
                {(d as CopyType).sCollapseOrder.map((r, i) => (
                  <tr key={i} className={`border-b border-white/5 ${r.binding ? "bg-red-500/5" : "bg-blue-500/5"}`}>
                    <td className="py-2 px-3 font-mono text-sm font-bold">{r.rank}</td>
                    <td className="py-2 px-3 text-sm font-medium">{r.foundation}</td>
                    <td className="py-2 px-3 text-xs">{r.type}</td>
                    <td className="py-2 px-3 text-xs">{r.collapse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}

          <div className="grid gap-3 mb-6">
            {(d as CopyType).sCollapseOrder?.map((r, i) => (
              <div key={i} className={`text-xs p-3 rounded-lg border ${r.binding ? "border-red-500/20 bg-red-500/5" : "border-blue-500/20 bg-blue-500/5"}`}>
                <span className="font-bold">{r.rank}. {r.foundation}:</span>{" "}
                <InlineReferenceText text={r.vuln} locale={locale} />
              </div>
            ))}
          </div>

          {(d as CopyType).sCollapseFormulaKey && (
          <div className="mb-4 rounded-lg border border-muted bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">{(d as CopyType).sCollapseFormulaKey}</p>
          </div>
          )}
          {(d as CopyType).sCollapseInsight && (
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-5">
            <p className="text-sm leading-relaxed">{(d as CopyType).sCollapseInsight}</p>
          </div>
          )}
        </section>
        )}

        {/* ── r/K Reproductive Strategy ───────────────────────────────────── */}
        {(d as CopyType).sRKTitle && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-3">{(d as CopyType).sRKTitle}</h2>
          <p className="text-sm text-foreground-muted mb-4">{(d as CopyType).sRKDesc}</p>
          {(d as CopyType).sRKScaleNote && (
          <div className="mb-6 rounded-lg border border-muted bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">{(d as CopyType).sRKScaleNote}</p>
          </div>
          )}

          {(d as CopyType).sRKTraits?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3">{(d as CopyType).sRKColTrait} &rarr; {(d as CopyType).sRKColSubstrate}</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sRKColTrait}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sRKColRPole}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sRKColKPole}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sRKColSubstrate}</th>
                  </tr>
                </thead>
                <tbody>
                  {(d as CopyType).sRKTraits.map((t, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-2 px-3 text-sm font-medium">{t.trait}</td>
                      <td className="py-2 px-3 text-xs text-red-400">{t.rPole}</td>
                      <td className="py-2 px-3 text-xs text-blue-400">{t.kPole}</td>
                      <td className="py-2 px-3 text-xs font-mono">{t.substrate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          )}

          {(d as CopyType).sRKEnvs?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3">{(d as CopyType).sRKColIndex}</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sRKColEnv}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sRKColIndex}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sRKColClass}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sRKColComp}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sRKColMating}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sRKColParent}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sRKColSexual}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sRKColLoyalty}</th>
                  </tr>
                </thead>
                <tbody>
                  {(d as CopyType).sRKEnvs.map((e, i) => (
                    <tr key={i} className={`border-b border-white/5 ${e.cls.includes("K") ? "bg-blue-500/5" : e.cls.includes("r") ? "bg-red-500/5" : ""}`}>
                      <td className="py-2 px-3 text-sm font-medium">{e.env}</td>
                      <td className="py-2 px-3 font-mono text-sm font-bold">{e.index}</td>
                      <td className="py-2 px-3 text-xs">{e.cls}</td>
                      <td className="py-2 px-3 font-mono text-xs">{e.comp}</td>
                      <td className="py-2 px-3 font-mono text-xs">{e.mating}</td>
                      <td className="py-2 px-3 font-mono text-xs">{e.parent}</td>
                      <td className="py-2 px-3 font-mono text-xs">{e.sexual}</td>
                      <td className="py-2 px-3 font-mono text-xs">{e.loyalty}</td>
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
          </div>
          )}

          {(d as CopyType).sRKMimicry && (
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-5 mb-6">
            <p className="text-sm leading-relaxed">{(d as CopyType).sRKMimicry}</p>
          </div>
          )}

          {(d as CopyType).sRKDopamine && (
          <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-5 mb-6">
            <p className="text-sm leading-relaxed">
              <InlineReferenceText text={(d as CopyType).sRKDopamine} locale={locale} />
            </p>
          </div>
          )}

          {(d as CopyType).sRKCities && (
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5 mb-6">
            <p className="text-sm leading-relaxed">{(d as CopyType).sRKCities}</p>
          </div>
          )}

          {(d as CopyType).sRKLit?.length > 0 && (
          <div className="mb-6">
            <ul className="space-y-2">
              {(d as CopyType).sRKLit.map((ref, i) => (
                <li key={i} className="text-xs text-muted-foreground">
                  <InlineReferenceText text={ref} locale={locale} />
                </li>
              ))}
            </ul>
          </div>
          )}

          {(d as CopyType).sRKConclusion && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <p className="text-sm leading-relaxed">{(d as CopyType).sRKConclusion}</p>
          </div>
          )}
        </section>
        )}

        {/* ── In-Group Loyalty Collapse ───────────────────────────────────── */}
        {(d as CopyType).sLCTitle && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-3">{(d as CopyType).sLCTitle}</h2>
          <p className="text-sm text-foreground-muted mb-6">{(d as CopyType).sLCDesc}</p>

          {(d as CopyType).sLCEnvs?.length > 0 && (
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sLCColEnv}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sLCColLoyalty}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sLCColCare}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sLCColBoundary}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sLCColCAC}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sLCColPU}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sLCColRatchet}</th>
                </tr>
              </thead>
              <tbody>
                {(d as CopyType).sLCEnvs.map((e, i) => (
                  <tr key={i} className={`border-b border-white/5 ${parseFloat(e.pu) > 0.40 ? "bg-red-500/10" : parseFloat(e.pu) > 0.03 ? "bg-yellow-500/5" : ""}`}>
                    <td className="py-2 px-3 text-sm font-medium">{e.env}</td>
                    <td className="py-2 px-3 font-mono text-xs">{e.loyalty}</td>
                    <td className="py-2 px-3 font-mono text-xs">{e.care}</td>
                    <td className="py-2 px-3 font-mono text-xs">{e.boundary}</td>
                    <td className="py-2 px-3 font-mono text-xs">{e.cac}</td>
                    <td className="py-2 px-3 font-mono text-sm font-bold">{e.pu}</td>
                    <td className="py-2 px-3 font-mono text-xs">{e.ratchet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          {d.modelDerived && (
          <p className="text-xs text-muted-foreground mt-2 italic">
            {d.modelDerived}{" "}
            <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
          </p>
          )}
          </div>
          )}

          {/* Mechanism Chain */}
          {(d as CopyType).sLCMechTitle && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3">{(d as CopyType).sLCMechTitle}</h3>
            <div className="space-y-2">
              {(d as CopyType).sLCMechSteps?.map((step, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="font-mono text-xs text-red-400 flex-shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <InlineReferenceText text={step} locale={locale} />
                  </p>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Collective Action */}
          {(d as CopyType).sLCCollectiveTitle && (
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-5 mb-6">
            <h3 className="text-sm font-bold mb-2">{(d as CopyType).sLCCollectiveTitle}</h3>
            <p className="text-sm leading-relaxed">
              <InlineReferenceText text={(d as CopyType).sLCCollectiveDesc} locale={locale} />
            </p>
          </div>
          )}

          {/* Policy Vulnerability Table */}
          {(d as CopyType).sLCPolicyTitle && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-2">{(d as CopyType).sLCPolicyTitle}</h3>
            <p className="text-xs text-muted-foreground mb-4">{(d as CopyType).sLCPolicyDesc}</p>
            {(d as CopyType).sLCPolicies?.length > 0 && (
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sLCColPolicy}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sLCColDriver}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sLCColConstraint}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sLCColVulnAmish}</th>
                    <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sLCColVulnUrban}</th>
                  </tr>
                </thead>
                <tbody>
                  {(d as CopyType).sLCPolicies.map((p, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-2 px-3 text-sm font-medium">{p.policy}</td>
                      <td className="py-2 px-3 text-xs text-green-400">{p.driver}</td>
                      <td className="py-2 px-3 text-xs text-red-400">{p.constraint}</td>
                      <td className="py-2 px-3 font-mono text-xs">{p.vAmish}</td>
                      <td className="py-2 px-3 font-mono text-sm font-bold text-red-400">{p.vUrban}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          {d.modelDerived && (
          <p className="text-xs text-muted-foreground mt-2 italic">
            {d.modelDerived}{" "}
            <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
          </p>
          )}
          </div>
          )}

          {/* Immigration Case */}
          {(d as CopyType).sLCImmigrationTitle && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5 mb-6">
            <h3 className="text-sm font-bold mb-2">{(d as CopyType).sLCImmigrationTitle}</h3>
            <p className="text-sm leading-relaxed">{(d as CopyType).sLCImmigrationDesc}</p>
          </div>
          )}

          {/* Feedback Ratchet */}
          {(d as CopyType).sLCRatchetTitle && (
          <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-5 mb-6">
            <h3 className="text-sm font-bold mb-2">{(d as CopyType).sLCRatchetTitle}</h3>
            <p className="text-sm leading-relaxed">
              <InlineReferenceText text={(d as CopyType).sLCRatchetDesc} locale={locale} />
            </p>
          </div>
          )}

          {(d as CopyType).sLCLit?.length > 0 && (
          <div className="mb-6">
            <ul className="space-y-2">
              {(d as CopyType).sLCLit.map((ref, i) => (
                <li key={i} className="text-xs text-muted-foreground">
                  <InlineReferenceText text={ref} locale={locale} />
                </li>
              ))}
            </ul>
          </div>
          )}

          {(d as CopyType).sLCConclusion && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <p className="text-sm leading-relaxed">{(d as CopyType).sLCConclusion}</p>
          </div>
          )}
        </section>
        )}

        {/* ── Aristotle ──────────────────────────────────────────────────── */}
        {(d as CopyType).sAristotleTitle && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-3">{(d as CopyType).sAristotleTitle}</h2>
          <p className="text-sm text-foreground-muted mb-4">{(d as CopyType).sAristotleDesc}</p>
          <ul className="space-y-3">
            {(d as CopyType).sAristotlePoints?.map((p, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2">
                <span className="text-yellow-500 flex-shrink-0 mt-0.5">&#8226;</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
        )}

        {/* ── Nietzsche ──────────────────────────────────────────────────── */}
        {(d as CopyType).sNietzscheTitle && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-3">{(d as CopyType).sNietzscheTitle}</h2>
          <p className="text-sm text-foreground-muted mb-4">{(d as CopyType).sNietzscheDesc}</p>
          <ul className="space-y-3">
            {(d as CopyType).sNietzschePoints?.map((p, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2">
                <span className="text-purple-500 flex-shrink-0 mt-0.5">&#8226;</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
        )}

        {/* ── Mental Health Prediction ────────────────────────────────────── */}
        {(d as CopyType).sDistressTitle && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-3">{(d as CopyType).sDistressTitle}</h2>
          <p className="text-sm text-foreground-muted mb-6">{(d as CopyType).sDistressDesc}</p>

          {(d as CopyType).sDistressEnvs?.length > 0 && (
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sDistressColEnv}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sDistressColIndex}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sDistressColAnomie}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sDistressColMeaning}</th>
                  <th className="py-2 px-3 text-xs font-semibold">{(d as CopyType).sDistressColNarrow}</th>
                </tr>
              </thead>
              <tbody>
                {(d as CopyType).sDistressEnvs.map((e, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2 px-3 text-sm font-medium">{e.env}</td>
                    <td className="py-2 px-3 font-mono text-xs">{e.distress}</td>
                    <td className="py-2 px-3 font-mono text-xs">{e.anomie}</td>
                    <td className="py-2 px-3 font-mono text-xs">{e.meaning}</td>
                    <td className="py-2 px-3 font-mono text-xs">{e.narrowing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}

          {(d as CopyType).sDistressLit?.length > 0 && (
          <div className="mb-6">
            <ul className="space-y-2">
              {(d as CopyType).sDistressLit.map((ref, i) => (
                <li key={i} className="text-xs text-muted-foreground">
                  <InlineReferenceText text={ref} locale={locale} />
                </li>
              ))}
            </ul>
          </div>
          )}

          {(d as CopyType).sDistressConclusion && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <p className="text-sm leading-relaxed">{(d as CopyType).sDistressConclusion}</p>
          </div>
          )}
        </section>
        )}

        {/* ── Conclusion ─────────────────────────────────────────────────── */}
        {(d as CopyType).conclusionTitle && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">{(d as CopyType).conclusionTitle}</h2>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm leading-relaxed">{(d as CopyType).conclusionText}</p>
          </div>
        </section>
        )}

        {/* ── Navigation ─────────────────────────────────────────────────── */}
        <nav className="flex flex-col sm:flex-row flex-wrap gap-4 pb-20">
          <Link href={`${prefix}/civilization`} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
            {d.navBackCiv} <ArrowRight className="w-4 h-4" />
          </Link>
          {d.navPathopege && (
          <Link href={`${prefix}/civilization/pathopege`} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
            {d.navPathopege} <ArrowRight className="w-4 h-4" />
          </Link>
          )}
          {d.navPatopolis && (
          <Link href={`${prefix}/civilization/patopolis`} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
            {d.navPatopolis} <ArrowRight className="w-4 h-4" />
          </Link>
          )}
          {d.navPatopoliteia && (
          <Link href={`${prefix}/civilization/patopoliteia`} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
            {d.navPatopoliteia} <ArrowRight className="w-4 h-4" />
          </Link>
          )}
          {d.navPatokinesis && (
          <Link href={`${prefix}/civilization/patokinesis`} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
            {d.navPatokinesis} <ArrowRight className="w-4 h-4" />
          </Link>
          )}
        </nav>

        </>
        )}

      </div>
    </main>
  );
}
