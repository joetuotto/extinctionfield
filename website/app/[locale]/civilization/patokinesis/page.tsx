import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Waves, Skull, Radio, Activity, Mic, Bug, Building2 } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { TranslationNotice } from "@/components/TranslationNotice";

const COPY = {
  en: {
    title: "Patokinesis",
    subtitle: "How the pathology moves — from signal degradation to behavioral sink",
    heroLead:
      "Physical attractiveness is not aesthetic. It is biological. Every trait humans find attractive — waist-to-hip ratio, facial symmetry, voice pitch, skin quality, body odor — is a readout of hormonal state. When electromagnetic fields disrupt the hormones, they degrade the signals. When the signals degrade, the pairing collapses. When the pairing collapses, the pathology spreads.",
    etymologyTitle: "Etymology",
    etymology: "pathos (πάθος) suffering, disease + kinesis (κίνησις) movement, transmission — the pathology that moves from the degraded to the still-healthy.",
    crossRef:
      "This page connects Patopolis (where pair-bonding collapse is quantified) with Patokratia (where political outputs are traced to biomarkers). The missing link: physical appearance signals are the third layer between hormonal disruption and reproductive failure — and the degraded majority doesn't wait passively for biology to do its work.",
    civilizationLink: "Back to Civilization",

    // Section 1: Signal degradation
    s1title: "The Third Layer",
    s1lead:
      "The BERM pair-bonding model identified two pathways to collapse: motivational (T↓, DA↓ → no approach, no reward) and attachment (OXT↓ → no bonding). But there is a third layer: the physical signals of mate quality are ALL hormonally dependent, and they degrade proportionally with biomarker state.",

    signalCategories: [
      {
        title: "Morphological signals",
        icon: "body",
        color: "blue",
        desc: "Static body composition cues driven by sex hormones",
        substrate: "T → muscle mass, jaw/brow development. E2 → WHR, hip/breast fat distribution, cheekbone prominence. CORT → visceral fat (raises WHR).",
        examples: [
          "Waist-to-hip ratio: optimal female WHR (0.67-0.70) requires functional HPG axis. E2-dependent fat distribution. Predicts DHA reserves → offspring cognition (Lassek & Gaulin 2008).",
          "Muscle mass: men at baseline T ~500 ng/dL maintain lean mass naturally. At ~300 ng/dL (modern average), muscle requires deliberate resistance training.",
          "Facial dimorphism: T sculpts male jaw/brow during puberty. E2 sculpts female lip fullness and cheekbone prominence. Both require adequate pubertal hormones.",
        ],
        literature: "Singh 1993 (WHR cross-cultural, N>1000), Penton-Voak 2001 (facial masculinity cycling, N=39), Jasienka 2004 (WHR → E2/progesterone, N=119)",
      },
      {
        title: "Dynamic signals",
        icon: "voice",
        color: "amber",
        desc: "Real-time behavioral cues that change with hormonal state",
        substrate: "T → voice pitch (lower F0 in men). DA → facial expressiveness, humor, social engagement. CORT → defensive posture, flat affect.",
        examples: [
          "Voice: fundamental frequency shifts with T (men) and across ovulatory cycle (women). Voice samples at high fertility rated more attractive (Pipitone 2008).",
          "Expressiveness: DA-driven reward circuit → animated facial expression, humor production, social approach behavior. Low DA → flat affect.",
          "Postural confidence: T → upright, expansive posture. High CORT → contracted, defensive body language.",
        ],
        literature: "Pipitone & Gallup 2008 (voice attractiveness cycling, N=10+38), Carney 2010 (posture-hormone association)",
      },
      {
        title: "Cryptic signals",
        icon: "hidden",
        color: "emerald",
        desc: "Subliminal cues below conscious detection that drive mate preference",
        substrate: "E2 → lip color shifts during ovulation. MEL → limbal ring, melanocyte function. T/OXT → body odor MHC signaling. CORT → skin quality degradation.",
        examples: [
          "Lip color: redness peaks at ovulation, correlating with E2 surge. Disrupted HPG axis → attenuated or absent lip color shift (Burriss 2015, N=13).",
          "Body odor / MHC: MHC-dissimilar odor preferred. Hormonal contraception REVERSES MHC preference — women on pill prefer MHC-similar men → suboptimal offspring immunity (Alvergne 2009).",
          "Limbal ring: dark ring around iris correlates with youth, health, attractiveness. Fades with poor health. Melatonin-dependent (Peshek 2011).",
          "Skin quality: homogeneity and luminance predict health. CORT → puffy, uneven tone. MEL↓ → melanocyte irregularity (Jones 2004).",
        ],
        literature: "Burriss 2015 (lip color, N=13), Wedekind 1995 (MHC odor, N=49m+49f), Peshek 2011 (limbal ring), Jones 2004 (skin health)",
      },
    ],

    // Section 2: Five-way compound
    s2title: "The Five-Way Equation",
    s2lead:
      "The original pair-bonding model was two-way: male approach × female receptivity. With the signal layer, it becomes five-way and multiplicative:",
    s2formula: "Pairing = male_approach × female_receptivity × male_signal_quality × female_signal_quality × signal_perception_capacity",
    s2key: "If ANY factor approaches zero, pairing collapses regardless of the others. A man with high T but degraded signals still fails. A woman with intact signals but signal-blind partners still fails. This is why dating apps (addressing approach only) and fertility subsidies (addressing motivation only) fail — they target one factor in a five-factor equation.",

    s2factors: [
      { name: "Male approach", substrate: "T × DA × (1 - CORT)", desc: "Drive to initiate contact" },
      { name: "Female receptivity", substrate: "OXT × (1 - CORT) × T", desc: "Openness to pair-bond formation" },
      { name: "Male signal quality", substrate: "Morphological signals", desc: "Physical cues of mate value" },
      { name: "Female signal quality", substrate: "Cryptic + morphological signals", desc: "Hormonal cycling + body composition" },
      { name: "Signal perception", substrate: "DA × T × BDNF × MEL", desc: "Capacity to detect and value mate signals in person" },
    ],

    // Section 3: Obesity amplifier
    s3title: "The Aromatase Loop",
    s3lead:
      "Obesity is not just a consequence of hormonal disruption — it is a self-reinforcing amplifier that FURTHER degrades the hormonal system:",
    s3steps: [
      "EMF → VGCC → DA↓, MEL↓, CORT↑ → metabolic disruption → increased adiposity",
      "Fat tissue contains aromatase (CYP19A1) which converts T → E2",
      "More fat → more aromatase → less T → more fat → more aromatase",
      "In men: gynecomastia prevalence 32-65% (Braunstein 2007). Direct evidence of T→E2 conversion.",
      "In women: excess adiposity disrupts ovulatory cycling, raises androgens (PCOS), abolishes cryptic signals",
      "Wang 2001: obese individuals show reduced D2 receptor availability → less reward from natural stimuli → more reward-seeking eating",
    ],
    s3japan: "The Japan paradox",
    s3japanText:
      "Japan has ~4% obesity (lowest OECD) but TFR 1.15 and 70-75% 'herbivore men'. This proves obesity is a SECONDARY amplifier — the PRIMARY mechanism (direct VGCC hormone disruption) operates independently. Cultural food norms and body standards prevent the obesity loop, but cannot prevent the direct hormonal degradation. Japan shows the primary effect clean; the USA shows both layers at once.",

    // Section 4: Behavioral sink
    s4title: "The Behavioral Sink",
    s4lead:
      "Calhoun's Universe 25 (1968-1973): with unlimited food, water, and space, a mouse population peaked at 2,200 and went extinct. The cause was not resource scarcity. It was behavioral pathology.",
    s4calhounPhases: [
      { phase: "Phase A: Strivation", desc: "Normal colonization. Healthy reproduction." },
      { phase: "Phase B: Exploitation", desc: "Rapid population growth. All niches filled." },
      { phase: "Phase C: Stagnation", desc: "Behavioral sink begins. Aggression toward pups. Reproductive behavior distorts. Functional pairs besieged." },
      { phase: "Phase D: Death", desc: "Terminal decline. 'Beautiful ones' withdraw entirely. Infanticidal males destroy remaining offspring. Extinction." },
    ],
    s4key: "The critical C→D mechanism: the dysfunctional majority began ACTIVELY DESTROYING the reproductive capacity of the functional remainder. Not through resource competition — through behavioral pathology.",

    // Section 5: Human behavioral sink channels
    s5title: "Five Channels of Predation",
    s5lead: "The human behavioral sink operates through ideology rather than direct violence, but the reproductive outcome is identical:",
    s5channels: [
      {
        title: "Normative predation",
        icon: "waves",
        desc: "Social punishment of healthy phenotypes. Body positivity movement attacks healthy weight maintenance. 'Toxic masculinity' pathologizes healthy T expression. Competence displays trigger complaint. The degraded majority defines the norm and penalizes deviation from it.",
        mechanism: "Pathopolites composite × (external locus + moral compensation + safety-seeking)",
      },
      {
        title: "Institutional capture",
        icon: "building",
        desc: "Pathopolites-majority institutions create regulations that force high-EMF lifestyles on everyone. Mandatory digital services. Smart city infrastructure. Precautionary regulation. Speech codes. Content warnings. Each policy INCREASES EMF exposure for all and RESTRICTS exit options.",
        mechanism: "Pathopolites index exceeds threshold → nonlinear institutional transformation",
      },
      {
        title: "Sterilization contagion",
        icon: "skull",
        desc: "Ideologies that produce sterility in adopters, spreading through institutional channels. Anti-natalism as moral position. Puberty blockers → direct hormonal abolition. Relationship anarchy → pair-bonding prevention. Career-first delayed reproduction past biological window. Childfree as identity. Each is a Pathopolites output that, when adopted, produces sterility.",
        mechanism: "Pathopolites ideology production × institutional capture reach",
      },
      {
        title: "Educational contagion",
        icon: "bug",
        desc: "High-pathopolites educators shape children's cognitive frameworks before EMF would naturally produce the phenotype. Safety-seeking teachers create safety-seeking students. External locus institutions create external locus graduates. Cognitive fragility norms prevent the development of anti-fragility.",
        mechanism: "Institutional capture × generational transmission",
      },
      {
        title: "Developmental intervention",
        icon: "activity",
        desc: "The most direct form: intervening in children's developmental biology before their own EMF exposure would produce the pathological phenotype. GnRH agonists (puberty blockers) directly suppress T and E2 — the exact hormones BERM identifies as the substrate of all mate signaling, sexual dimorphism, and reproductive capacity. This is the pup-killing equivalent: the degraded generation destroying the next generation's reproductive potential through medical intervention.",
        mechanism: "Sterilization contagion applied to pre-reproductive individuals",
      },
    ],

    // Section 6: Gradient table
    s6title: "Signal & Sink Gradient",
    s6lead: "Model output across EMF environments (2025):",
    s6envLabels: ["Amish", "Rural", "Suburban", "Urban res.", "Urban office"],
    // Rows follow s6envLabels. signal = total signal strength (S1), pair = five-way
    // pairing compound (S2), obesity = aromatase amplification (S3), predation /
    // capture = channels 1-2 (S5), sink = Calhoun behavioral sink composite (S4).
    s6gradientData: [
      { signal: "0.943", pair: "0.930", obesity: "0.002", predation: "0.011", capture: "0.026", sink: "0.013" },
      { signal: "0.673", pair: "0.602", obesity: "0.091", predation: "0.113", capture: "0.098", sink: "0.085" },
      { signal: "0.539", pair: "0.468", obesity: "0.195", predation: "0.197", capture: "0.161", sink: "0.152" },
      { signal: "0.454", pair: "0.386", obesity: "0.288", predation: "0.264", capture: "0.232", sink: "0.217" },
      { signal: "0.397", pair: "0.331", obesity: "0.366", predation: "0.318", capture: "0.291", sink: "0.271" },
    ],
    // Model-derived marker under the S6, S10 and S11 tables
    modelDerived: "Model-derived values from the BERM environment biomarker profiles (2025), not directly measured.",
    modelDerivedLink: "mathematical specification",

    // Section 10: Behavioral Immune System
    s10title: "The Behavioral Immune System",
    s10lead:
      "Stigma is not cruelty. It is the behavioral immune system — a population-level defense against pathological behavior, evolved under the same selection pressures as the biological immune system. When it is dismantled, the population becomes defenseless against the transmission channels described above.",
    s10bisExplain:
      "The BIS operates through the sanctity/purity moral foundation (Haidt), which IS the psychological immune system. Disgust sensitivity predicts social conservatism (Inbar et al. 2009, N=31,045) not because conservatism is disgust — but because both are outputs of pathogen-detection circuitry. Fincher et al. (2008, N=98 regions) showed pathogen prevalence predicts collectivism with r=0.71 — at world-region level, r=0.93.",
    s10destigTitle: "Destigmatization as immunosuppression",
    s10destigLead:
      "The degraded phenotype's demand for destigmatization is structurally identical to HIV targeting CD4+ T cells: the pathogen attacks the immune system because the immune system prevents its spread. Destigmatization effects from natural experiments:",
    s10destigCategories: [
      {
        category: "A — Harmful stigma removed",
        example: "Divorce",
        data: "No-fault laws: divorce spiked then normalized. Female suicide fell 20% (Stevenson & Wolfers 2006). Net positive.",
        color: "emerald",
      },
      {
        category: "B — Demand revealed",
        example: "Cannabis",
        data: "Legalization reveals pre-existing demand. Usage stabilizes after initial spike. Left-handedness analogy: rose from ~3% to ~12%, then plateaued — pure revelation, zero creation.",
        color: "emerald",
      },
      {
        category: "C — Sustained increase",
        example: "LGBT identification, OnlyFans, single motherhood",
        data: "LGBT: 3.5% → 9.3% (2012–2024). Gen Z: 23.1%. No plateau. OnlyFans: 348K → 4.63M in 5 years. Single motherhood: 5% → 40% (US), 9% → 51% (UK).",
        color: "amber",
      },
      {
        category: "D — Negligible effect",
        example: "Infidelity",
        data: "Destigmatized in media. Rates essentially unchanged at 20–25%. Stigma was not the binding constraint.",
        color: "blue",
      },
      {
        category: "E — Pathological edge",
        example: "Bugchasing, feederism, Munchausen by proxy",
        data: "Destigmatization creates new behaviors that could not exist under stigma. FDIA: 6–10% victim mortality, 92.75% female perpetrators (2025 review, 314 studies).",
        color: "red",
      },
    ],
    s10inversionTitle: "Stigma inversion",
    s10inversionLead:
      "Once institutional capture exceeds the threshold, stigma does not merely disappear — it INVERTS. Association stigma now punishes those who MAINTAIN the BIS. 'Bigot', 'phobic', '-ist' are stigma labels applied to the immune system's own defenders. FIRE 2026 data: 93% of students self-censor, 36% support shouting down speakers (record high), 15% accept violence to stop speech. The inversion is empirically measurable.",
    s10gelfandTitle: "The Gelfand inverted-U",
    s10gelfandLead:
      "Gelfand's tightness-looseness dimension (2011, 33 nations, N=6,823) measured norm enforcement strength from Pakistan (12.3) to Ukraine (1.6). Harrington & Gelfand (2015) then tested the curvilinear model: both extremes produce worst outcomes. Life expectancy R²=.44, composite well-being R²=.47, suicide R²=.25 — all significant quadratic terms. Japan (8.6) and South Korea (10.0) fall on the tight extreme where the curve bends down. Japan's 1.15M hikikomori and TFR 1.20 demonstrate what happens when cultural BIS enforcement persists WITHOUT biological substrate support: the pathology goes underground rather than being expressed. Norms show remarkable inertia — the 2024 COVID study (N=30,431, 43 countries) found most norms barely shifted even under pandemic conditions. The BIS becomes autoimmune when socially enforced beyond what the substrate can sustain.",
    s10gradientTitle: "BIS gradient",
    s10gradientData: [
      { env: "Amish", bis: "0.934", destig: "0.021", inv: "0.000", net: "+0.913" },
      { env: "Rural", bis: "0.591", destig: "0.112", inv: "0.000", net: "+0.479" },
      { env: "Suburban", bis: "0.462", destig: "0.188", inv: "0.000", net: "+0.274" },
      { env: "Urban res.", bis: "0.386", destig: "0.282", inv: "0.000", net: "+0.104" },
      { env: "Urban office", bis: "0.332", destig: "0.373", inv: "0.130", net: "-0.171" },
    ],
    s10gradientKey:
      "Net behavioral immunity crosses zero between urban residential and urban office — the most institutionally captured environment. This is the point at which the population becomes defenseless and transmission accelerates without resistance.",

    // Section 11: Social Transmission Channels
    s11title: "Social Transmission Channels",
    s11lead:
      "Five empirically grounded channels through which pathological states actively spread from degraded to healthy individuals. Each channel exploits a different vulnerability and operates through a distinct mechanism — together they constitute the human behavioral sink.",
    s11channels: [
      {
        title: "Recovery sabotage",
        subtitle: "The crab bucket",
        icon: "skull",
        color: "red",
        desc: "The recovered individual is an existential threat: they prove the condition is reversible, invalidating the entire victimhood identity. In addiction communities, the person getting sober is offered drinks, their progress minimized, they are isolated. The healthy individual is a living accusation.",
        empirical: "Addiction relapse: 85% within first year. 34% relapse specifically from peer pressure. Addicted best friend → OR 2.59, addicted close relative → OR 3.49 (systematic review). Tall poppy syndrome: 86.8% of women report experiencing it at work (2024 international study).",
        formula: "victimhood_identity × external_locus × (1 − 0.5 × T)",
      },
      {
        title: "Dependency transmission",
        subtitle: "Munchausen + intergenerational helplessness",
        icon: "activity",
        color: "red",
        desc: "Making others sick or helpless to maintain control and prevent their independence. Munchausen by proxy: making a child sick for attention and status. Intergenerational helplessness: the narcissistic parent teaching learned helplessness to prevent the child's autonomy. Both serve the same function: the transmitter needs the target to remain dependent.",
        empirical: "ACE study (Felitti 1998, N=17,337): ACE 4+ → depression OR 4.6, suicide OR 12.2, alcoholism OR 7.4. Attachment concordance: 75% parent→infant (van IJzendoorn 1995, d=1.06). Learned helplessness: 75% after single session (Seligman 1967). FDIA: 6–10% victim mortality.",
        formula: "safety_seeking × external_locus × moral_cover × CORT × (1.5 − T)",
      },
      {
        title: "Social contagion",
        subtitle: "Media-amplified pathology epidemic",
        icon: "waves",
        color: "red",
        desc: "Social media creates diagnostic epidemics: TikTok tics, DID, eating disorders spreading through identification and imitation. Diagnosis becomes social capital — it provides identity, community, protection from performance demands, and immunity from criticism. The contagion requires both the channel (social media) and the substrate (cognitively fragile, identity-seeking, with no purity filter).",
        empirical: "Christakis & Fowler (2007, N=12,067): friend obesity +57%, mutual friend +171%. TikTok tics: tenfold increase, 95% female, 95% TikTok-exposed (Pringsheim 2021). DID: <100 cases pre-1980 → thousands/year. Haidt (2024): post-2012 teen suicide +167%, self-harm +188%. Obesity visual normalization: 82.5% of obese underestimate their weight (Robinson 2017).",
        formula: "dopaminergic_capture × victimhood_identity × cognitive_fragility × (1.5 − sanctity)",
      },
      {
        title: "Empathy weaponization",
        subtitle: "Pathological altruism + sacralization of sickness",
        icon: "building",
        color: "red",
        desc: "Compassion exploited as a transmission vector. Two mechanisms: (1) the degraded demonstrate suffering to extract resources, protection, and status — empathy without the disgust filter provides no immune response to exploitation. (2) Institutions redefine pathology as virtue and health as oppression — 'health is privilege', competence is 'toxic', fragility is 'authenticity'.",
        empirical: "Pathological altruism (Oakley et al. 2012, OUP, 31 papers): hyperempathy/codependency affects ~40M Americans. Concept creep (Haslam 2016): harm, trauma, prejudice definitions systematically expanded. Tomiyama COBWEBS (2014): weight stigma → cortisol → overeating, but removal of all stigma removes self-classification that motivates change.",
        formula: "disgust_deficit × moral_compensation × (external_locus + institutional_capture)",
      },
      {
        title: "Active infection seeking",
        subtitle: "Deliberate pursuit of shared pathology",
        icon: "bug",
        color: "red",
        desc: "The most extreme transmission: the uninfected actively seek infection. Biological: HIV bugchasing. Social: seeking diagnosis, 'neurodivergent pride', celebrating shared pathology as identity. The psychological function: anomic isolation is worse than shared sickness. Shared infection removes the stigma ('I am no longer alone in being broken') and creates a tight in-group.",
        empirical: "Bugchasing documented in subculture literature (Dean 2009). Gen Z self-identification with mental health diagnoses as identity markers. DID and autism self-diagnosis communities with millions of members on social media platforms.",
        formula: "anomic_distress × external_locus × victimhood_identity × (1 − T)",
      },
    ],
    s11gradientTitle: "Transmission gradient",
    s11gradientData: [
      { env: "Amish", sabotage: "0.017", dependency: "0.001", contagion: "0.002", empathy: "0.002", infection: "0.000", composite: "0.003" },
      { env: "Rural", sabotage: "0.132", dependency: "0.023", contagion: "0.056", empathy: "0.045", infection: "0.049", composite: "0.065" },
      { env: "Suburban", sabotage: "0.223", dependency: "0.070", contagion: "0.127", empathy: "0.092", infection: "0.123", composite: "0.158" },
      { env: "Urban res.", sabotage: "0.299", dependency: "0.130", contagion: "0.199", empathy: "0.134", infection: "0.197", composite: "0.266" },
      { env: "Urban off.", sabotage: "0.364", dependency: "0.190", contagion: "0.267", empathy: "0.170", infection: "0.265", composite: "0.377" },
    ],
    s11gradientKey:
      "The composite transmission index goes from 0.003 (amish — near-complete resistance) to 0.377 (urban office — simultaneous attack through all five channels with no defense). Social contagion is the largest single channel in the most degraded environment, consistent with the TikTok tics, DID, and social media diagnostic epidemic data.",

    // Section 7: Cross-country validation
    s7title: "Cross-Country Validation",
    s7lead:
      "If BERM is correct, EMF infrastructure timeline should predict the speed and pattern of these changes across countries. The data:",
    s7countries: [
      {
        name: "South Korea",
        emf: "5G first in world (2019), 97% smartphone",
        observed: "TFR 0.72 (world's lowest). 30-point gender gap in young voters. 4B movement. Conscript obesity 23→31%.",
        fit: "Strongest BERM fit",
      },
      {
        name: "Singapore",
        emf: "Highest density/km², near-total 5G",
        observed: "TFR 0.87 despite ~$55,000/child pronatalist spending. Zero fertility effect from policy.",
        fit: "Strong — proves policy irrelevance",
      },
      {
        name: "Japan",
        emf: "i-mode 1999, very high density",
        observed: "TFR 1.15. 70-75% herbivore men. But only 4% obesity. Primary effect without secondary amplifier.",
        fit: "Japan paradox confirms mechanism layers",
      },
      {
        name: "Finland",
        emf: "First mobile country (NMT 1982, GSM 1990s)",
        observed: "TFR 1.87→1.25 in 14 years (-33%). Conscript 12-min run -12%. T: -20% generational (Perheentupa). Muscle fitness 66.8→41.2%.",
        fit: "First mover → fastest European decline",
      },
      {
        name: "USA",
        emf: "Early, high density, 5G 2019",
        observed: "Obesity 15→42% (1980-2020). T -1.2%/year age-independent (Travison 2007). Urban-rural political divergence from 1990s.",
        fit: "Both mechanism layers visible simultaneously",
      },
      {
        name: "Hungary",
        emf: "Later 4G, lower density, later 5G (2023)",
        observed: "TFR rose 1.23→1.61 under Orbán's policies → now reversing to 1.41. AEI: 'tempo effects only, not cohort fertility.'",
        fit: "Authoritarian buffer: delays but does not prevent",
      },
    ],
    s7keyInsight: "Pronatalist spending has zero long-term effect when the biological substrate is degraded. Singapore: ~$7B total. Poland: 500+ zloty/month. Hungary: family tax benefits + housing. Japan: multiple programs. ALL show temporary tempo effects that reverse within 5-10 years. The model predicts this: you cannot subsidize biology.",

    // Section 8: Conservative-attractiveness
    s8title: "The Dual-Output Model",
    s8lead:
      "Testosterone produces two parallel outputs: masculine morphology (→ physical attractiveness) and competitive political orientation (→ conservatism). These are not causally connected to each other — they are co-products of the same hormonal state.",
    s8evidence: [
      "Berggren et al. 2017: right-leaning politicians rated more attractive across Finland, EU Parliament, Australia, and USA (N=2,513)",
      "Kosinski 2021: facial structure predicts political orientation with 72% accuracy across 1M+ faces",
      "Alogaily et al. 2025 RCT: exogenous testosterone shifts political attitudes conservative (N=136)",
      "Peterson & Palmer 2017: physically stronger men more supportive of inequality, redistribution-averse",
    ],
    s8prediction: "BERM predicts: the correlation should be stronger where T-variance is higher (urban-rural gradient wider), should weaken over time as mean T drops, and should be absent in low-EMF communities (Amish) where all individuals have high T.",

    // Section 9: Predictions
    s9title: "Predictions",
    predictions: [
      { id: "PK-1", text: "Countries with earlier mobile infrastructure deployment will show faster TFR decline, controlling for GDP and education" },
      { id: "PK-2", text: "Within-country urban-rural political divergence onset will correlate with mobile network deployment date, not with economic divergence" },
      { id: "PK-3", text: "Body positivity movement growth rate will track Pathopolites index at the city level, not obesity rate alone" },
      { id: "PK-4", text: "Puberty blocker prescription rates will correlate with institutional capture index, not with gender dysphoria prevalence" },
      { id: "PK-5", text: "Pronatalist policy spending per capita will show zero correlation with TFR 10 years post-implementation" },
      { id: "PK-6", text: "Conservative-attractiveness correlation will weaken decade-over-decade as population T-variance narrows" },
      { id: "PK-7", text: "Net behavioral immunity will cross zero in additional Western urban environments by 2030 as institutional capture accelerates, measurable via FIRE-type surveys" },
      { id: "PK-8", text: "Social contagion index will track TikTok/social media penetration more closely than traditional media exposure — testable via platform adoption dates cross-referenced with diagnostic epidemic onset" },
      { id: "PK-9", text: "Japan's hikikomori count will continue rising even as cultural tightness theoretically moderates — the autoimmune BIS persists independently of the original enforcement mechanism" },
      { id: "PK-10", text: "Destigmatization Category C domains (sustained increase, no plateau) will show behavior-identity gaps exceeding 50% — more people identify than exhibit the behavior" },
      { id: "PK-11", text: "Recovery sabotage will be the highest-weighted transmission channel in environments with strong victimhood identity culture, measurable via tall poppy syndrome instruments correlated with relapse data" },
      { id: "PK-12", text: "Dependency transmission will show the largest intergenerational effect size of all channels — ACE OR>10 and attachment d=1.06 dwarf peer contagion beta=0.15 — making it the primary intervention target" },
    ],

    // References
    referencesTitle: "Key Literature",
    references: [
      "Singh 1993 — WHR preference cross-cultural (N>1,000)",
      "Wedekind 1995 — MHC-dependent odor preference (N=49m+49f)",
      "Lassek & Gaulin 2008 — WHR → DHA reserves → offspring cognition",
      "Pipitone & Gallup 2008 — Voice attractiveness and ovulation",
      "Kavanagh et al. 2010 — Mating sociometer theory",
      "Burriss et al. 2015 — Lip color shifts across menstrual cycle",
      "Berggren et al. 2017 — Conservative-attractiveness (4 countries, N=2,513)",
      "Calhoun 1973 — Universe 25 behavioral sink",
      "Christakis & Fowler 2007 — Social contagion of obesity (N=12,067)",
      "Alvergne & Lummaa 2009 — Contraception reverses MHC preference",
      "Travison et al. 2007 — Population T decline 1.2%/year (age-independent)",
      "Perheentupa et al. 2013 — Finnish generational T decline (-20%)",
      "Kosinski 2021 — Facial politics classification (72% accuracy, 1M+ faces)",
      "Alogaily et al. 2025 — T RCT → conservative shift (N=136)",
      "Schaller & Park 2011 — Behavioral immune system review",
      "Fincher et al. 2008 — Pathogen prevalence → collectivism (r=0.71, N=98 regions)",
      "Murray & Schaller 2013 — Historical pathogen → authoritarianism (r=0.65, beta=0.73)",
      "Terrizzi et al. 2013 — Disgust sensitivity → conservatism meta-analysis",
      "Gelfand et al. 2011 — Tight-loose cultures (33 nations, N=6,823, Science)",
      "Harrington & Gelfand 2015 — Curvilinear tightness-wellbeing model (R²=.47 composite, PLoS ONE)",
      "Inbar et al. 2009 — Disgust → social conservatism (N=31,045)",
      "Felitti et al. 1998 — ACE study (N=17,337): ACE 4+ → depression OR 4.6, suicide OR 12.2",
      "van IJzendoorn 1995 — Attachment transmission meta-analysis: 75% concordance, d=1.06",
      "Seligman 1967 — Learned helplessness: 75% after single session",
      "Pringsheim 2021 — TikTok functional tics: 95% female, tenfold increase",
      "Haidt 2024 — Post-2012 teen mental health crisis (+167% suicide, +188% self-harm)",
      "Robinson et al. 2017 — 82.5% of obese underestimate weight (visual normalization)",
      "Oakley et al. 2012 — Pathological altruism (OUP, 31 papers, ~40M codependency)",
      "Haslam 2016 — Concept creep: systematic expansion of harm definitions",
      "Tomiyama 2014 — COBWEBS: weight stigma → cortisol → overeating cycle",
      "Foulkes & Andrews 2023 — Prevalence inflation hypothesis",
      "Sandra et al. 2025 — ADHD awareness → 28% to 58% false self-diagnosis (RCT, N=215)",
      "FIRE 2026 — 93% self-censor, 36% support shouting down speakers, 15% accept violence",
      "Stevenson & Wolfers 2006 — No-fault divorce → female suicide -20%",
    ],

    // Navigation
    patopolisLink: "Patopolis",
    patokratiaLink: "Patokratia",
    pathopolitesLink: "Pathopolites",
  },
  fi: {
    title: "Patokinesis",
    subtitle: "Miten patologia liikkuu — signaalidegradaatiosta käyttäytymisnieluun",
    heroLead:
      "Fyysinen viehättävyys ei ole esteettistä. Se on biologista. Jokainen piirre jonka ihmiset kokevat viehättäväksi — vyötärö-lantiosuhde, kasvojen symmetria, äänen korkeus, ihon laatu, tuoksu — on hormonaalisen tilan ilmentymä. Kun sähkömagneettiset kentät häiritsevät hormoneja, ne rappeuttavat signaalit. Kun signaalit rapautuvat, pariutuminen romahtaa. Kun pariutuminen romahtaa, patologia leviää.",
    etymologyTitle: "Etymologia",
    etymology: "pathos (πάθος) kärsimys, sairaus + kinesis (κίνησις) liike, välittyminen — patologia joka liikkuu rappeutuneista vielä terveisiin.",
    crossRef:
      "Tämä sivu yhdistää Patopoliksen (jossa pariutumisen romahdus kvantifioidaan) Patokratiaan (jossa poliittiset tuotokset jäljitetään biomarkkereihin). Puuttuva linkki: fyysisen ulkonäön signaalit ovat kolmas kerros hormonaalisen häiriön ja lisääntymisen epäonnistumisen välillä — ja rappeutunut enemmistö ei odota passiivisesti biologian tekevän työtään.",
    civilizationLink: "Takaisin Sivilisaatioon",

    s1title: "Kolmas kerros",
    s1lead:
      "BERM-pariutumismalli tunnisti kaksi romahdusreittiä: motivaationaalinen (T↓, DA↓ → ei lähestymistä, ei palkintoa) ja kiintymyksellinen (OXT↓ → ei sitoutumista). Mutta on kolmas kerros: fyysisen parinvalinta-arvon signaalit ovat KAIKKI hormoniriippuvaisia ja rapautuvat biomarkkeritilan mukaisesti.",

    signalCategories: [
      {
        title: "Morfologiset signaalit",
        icon: "body",
        color: "blue",
        desc: "Staattiset kehonkoostumussignaalit sukupuolihormonien ohjaamat",
        substrate: "T → lihasmassa, leuka/otsa. E2 → vyötärö-lantiosuhde, rasvadistribuutio. CORT → viskeraalinen rasva.",
        examples: [
          "Vyötärö-lantiosuhde: optimaalinen naisten WHR (0.67-0.70) vaatii toimivan HPG-akselin. E2-riippuvainen rasvadistribuutio. Ennustaa DHA-varantoja → jälkeläisten kognitiota (Lassek & Gaulin 2008).",
          "Lihasmassa: miehet T ~500 ng/dL ylläpitävät lihasmassaa luonnollisesti. ~300 ng/dL:llä (nykyinen keskiarvo) lihas vaatii tietoista harjoittelua.",
          "Kasvodimorfismi: T muovaa miehen leukaa/otsaa puberteetissa. E2 muovaa naisten huulten täyteläisyyttä ja poskipäiden prominenssia.",
        ],
        literature: "Singh 1993, Penton-Voak 2001, Jasienka 2004",
      },
      {
        title: "Dynaamiset signaalit",
        icon: "voice",
        color: "amber",
        desc: "Reaaliaikaiset käyttäytymissignaalit jotka muuttuvat hormonitilan mukaan",
        substrate: "T → äänen korkeus. DA → ilmeikkyys, huumori, sosiaalinen aktiivisuus. CORT → puolustusasento.",
        examples: [
          "Ääni: perustaajuus muuttuu T:n (miehet) ja ovulaatiosyklin (naiset) mukaan. Korkean fertiliteetin ääninäytteet arvioitiin viehättävämmiksi (Pipitone 2008).",
          "Ilmeikkyys: DA-ohjattu palkkiopiiri → elävä ilmeikkyys, huumorin tuottaminen. Matala DA → lattea vaikutelma.",
          "Ryhtikkyys: T → pystyasento. Korkea CORT → puolustava, sulkeutunut kehonkieli.",
        ],
        literature: "Pipitone & Gallup 2008, Carney 2010",
      },
      {
        title: "Kryptiset signaalit",
        icon: "hidden",
        color: "emerald",
        desc: "Tiedostamattomat vihjeet jotka ohjaavat parinvalintaa tietoisuuden alla",
        substrate: "E2 → huulten värisävyn muutos ovulaatiossa. MEL → limbaalirengas. T/OXT → MHC-tuoksusignalointi. CORT → ihon laadun heikkeneminen.",
        examples: [
          "Huulten väri: punaisuus huipussaan ovulaatiossa, korreloi E2-piikkiin. Häiriintynyt HPG-akseli → vaimennettu tai puuttuva värimuutos (Burriss 2015).",
          "Tuoksu / MHC: MHC-erilaista tuoksua suositaan. Hormonaalinen ehkäisy KÄÄNTÄÄ MHC-preferenssin — pillerillä olevat naiset suosivat MHC-samanlaisia miehiä → heikko immuniteetti jälkeläisissä (Alvergne 2009).",
          "Limbaalirengas: tumma rengas iiriksen ympärillä korreloi nuoruuteen, terveyteen, viehättävyyteen. Haalistuu heikon terveyden myötä. Melatoniiniriippuvainen (Peshek 2011).",
          "Ihon laatu: tasaisuus ja luminanssi ennustavat terveyttä. CORT → turvonnut, epätasainen ihon sävy (Jones 2004).",
        ],
        literature: "Burriss 2015, Wedekind 1995, Peshek 2011, Jones 2004",
      },
    ],

    s2title: "Viisinkertainen yhtälö",
    s2lead: "Alkuperäinen pariutumismalli oli kaksisuuntainen: miehen lähestyminen × naisen vastaanottavuus. Signaalikerroksen kanssa se muuttuu viisinkertaiseksi ja multiplikatiiviseksi:",
    s2formula: "Pariutuminen = miehen_lähestyminen × naisen_vastaanottavuus × miehen_signaalien_laatu × naisen_signaalien_laatu × signaalien_havaitsemiskyky",
    s2key: "Jos MIKÄ TAHANSA tekijä lähestyy nollaa, pariutuminen romahtaa muista riippumatta. Mies korkealla T:llä mutta rappeutuneilla signaaleilla epäonnistuu silti. Nainen ehjillä signaaleilla mutta signaalien havaitsemiskyvytön partneri epäonnistuu silti. Siksi deittiapplikaatiot (lähestyminen) ja hedelmällisyystuet (motivaatio) epäonnistuvat — ne kohdistavat yhteen tekijään viiden tekijän yhtälössä.",

    s2factors: [
      { name: "Miehen lähestyminen", substrate: "T × DA × (1 - CORT)", desc: "Aloitteellisuus kontaktin luomisessa" },
      { name: "Naisen vastaanottavuus", substrate: "OXT × (1 - CORT) × T", desc: "Avoimuus pariutumiselinkaareen" },
      { name: "Miehen signaalinlaatu", substrate: "Morfologiset signaalit", desc: "Fyysiset vihjeet parinvalinta-arvosta" },
      { name: "Naisen signaalinlaatu", substrate: "Kryptiset + morfologiset", desc: "Hormonaalinen sykli + kehonkoostumus" },
      { name: "Signaalien havaitseminen", substrate: "DA × T × BDNF × MEL", desc: "Kyky havaita ja arvostaa parinvalintasignaaleja kasvokkain" },
    ],

    s3title: "Aromataasisilmukka",
    s3lead: "Lihavuus ei ole vain hormonihäiriön seuraus — se on itseään vahvistava vahvistin joka EDELLEEN rappeuttaa hormonijärjestelmää:",
    s3steps: [
      "EMF → VGCC → DA↓, MEL↓, CORT↑ → metabolinen häiriö → rasvoittuminen",
      "Rasvakudos sisältää aromataasia (CYP19A1) joka muuntaa T → E2",
      "Enemmän rasvaa → enemmän aromataasia → vähemmän T → enemmän rasvaa",
      "Miehillä: gynekomastian esiintyvyys 32-65% (Braunstein 2007). Suora todiste T→E2-konversiosta.",
      "Naisilla: ylimääräinen rasvakudos häiritsee ovulaatiosykliä, nostaa androgeeneja (PCOS), poistaa kryptiset signaalit",
      "Wang 2001: lihavilla alentunut D2-reseptorien saatavuus → vähemmän palkintoa luonnollisista ärsykkeistä",
    ],
    s3japan: "Japani-paradoksi",
    s3japanText:
      "Japanissa lihavuus ~4% (OECD:n matalin) mutta TFR 1.15 ja 70-75% 'herbivore-miehistä'. Tämä todistaa: lihavuus on SEKUNDAARINEN vahvistin. PRIMAARINEN mekanismi (suora VGCC-hormonihäiriö) toimii itsenäisesti. Kulttuuriset ruokanormit estävät lihavuussilmukan mutta EIVÄT estä suoraa hormonaalista degradaatiota.",

    s4title: "Käyttäytymisvalu",
    s4lead:
      "Calhounin Universe 25 (1968-1973): rajattomalla ruoalla, vedellä ja tilalla hiiripopulaatio huipui 2200:ssa ja kuoli sukupuuttoon. Syy ei ollut resurssipula. Se oli käyttäytymispatologia.",
    s4calhounPhases: [
      { phase: "Vaihe A: Pioneerius", desc: "Normaali kolonisointi. Terve lisääntyminen." },
      { phase: "Vaihe B: Hyödyntäminen", desc: "Nopea populaation kasvu. Kaikki ekologiset lokerot täytetty." },
      { phase: "Vaihe C: Pysähtyminen", desc: "Käyttäytymisvalu alkaa. Aggressio pentuja kohtaan. Lisääntymiskäyttäytyminen vääristyy. Toimivat parit piiritettyinä." },
      { phase: "Vaihe D: Kuolema", desc: "Terminaalinen lasku. 'Kauniit yksilöt' vetäytyvät kokonaan. Infantisidiset urokset tuhoavat jäljellä olevat jälkeläiset. Sukupuuttoon kuoleminen." },
    ],
    s4key: "Kriittinen C→D-mekanismi: dysfunktionaalinen enemmistö alkoi AKTIIVISESTI TUHOAMAAN toimivan jäännöksen lisääntymiskykyä. Ei resurssikilpailun kautta — käyttäytymispatologian kautta.",

    s5title: "Viisi predaation kanavaa",
    s5lead: "Ihmisen käyttäytymisvalu toimii ideologian kautta suoran väkivallan sijaan, mutta lisääntymistulos on identtinen:",
    s5channels: [
      {
        title: "Normatiivinen predaatio",
        icon: "waves",
        desc: "Terveiden fenotyyppien sosiaalinen rankaiseminen. Body positivity -liike hyökkää terveellistä painonhallintaa vastaan. 'Toksinen maskuliinisuus' patologisoi terveen T-ekspression. Pätevyyden osoittaminen laukaisee valituksia. Rappeutunut enemmistö määrittelee normin ja rankaisee poikkeamasta.",
        mechanism: "Pathopolites × (ulkoinen locus + moraalinen kompensaatio + turvallisuushakuisuus)",
      },
      {
        title: "Institutionaalinen kaappaus",
        icon: "building",
        desc: "Pathopolites-enemmistöiset instituutiot luovat sääntelyä joka pakottaa korkean EMF:n elämäntavat kaikille. Pakolliset digitaalipalvelut. Älykaupunki-infrastruktuuri. Ennaltaehkäisevä sääntely. Puhekoodit. Sisältövaroitukset.",
        mechanism: "Pathopolites-indeksi ylittää kynnyksen → epälineaarinen institutionaalinen muutos",
      },
      {
        title: "Sterilisaatiokontagio",
        icon: "skull",
        desc: "Ideologiat jotka tuottavat steriliteettiä omaksujiissaan, leviävät institutionaalisten kanavien kautta. Anti-natalismi moraaliasemana. Puberteetin estolääkkeet → suora hormonaalinen abolointi. Suhde-anarkia → pariutumisen esto. Lapsivapaus identiteettinä.",
        mechanism: "Pathopolites-ideologian tuotanto × institutionaalisen kaappauksen kattavuus",
      },
      {
        title: "Kasvatuksellinen tartunta",
        icon: "bug",
        desc: "Korkean pathopolites-indeksin opettajat muokkaavat lasten kognitiivisia viitekehyksiä ennen kuin EMF luonnollisesti tuottaisi fenotyypin. Turvallisuushakuiset opettajat luovat turvallisuushakuiset oppilaat. Ulkoisen lokuksen instituutiot luovat ulkoisen lokuksen valmistuneet.",
        mechanism: "Institutionaalinen kaappaus × sukupolvien välinen transmissio",
      },
      {
        title: "Kehitysbiologinen interventio",
        icon: "activity",
        desc: "Suorin muoto: lasten kehitysbiologiaan puuttuminen ennen kuin heidän oma EMF-altistuksensa tuottaisi patologisen fenotyypin. GnRH-agonistit (puberteetin estolääkkeet) suppressoivat suoraan T:tä ja E2:ta — täsmälleen ne hormonit jotka BERM tunnistaa kaiken parinvalintasignaloinnin, seksuaalisen dimorfismin ja lisääntymiskyvyn substraatiksi. Tämä on pentujentappamisen vastine.",
        mechanism: "Sterilisaatiokontagio kohdistettuna pre-reproduktiivisiin yksilöihin",
      },
    ],

    s6title: "Signaali- ja nielugradientti",
    s6lead: "Mallitulokset EMF-ympäristöittäin (2025):",
    s6envLabels: ["Amish", "Maaseutu", "Lähiö", "Kaup. asuin.", "Kaup. toimisto"],
    s6gradientData: [
      { signal: "0.943", pair: "0.930", obesity: "0.002", predation: "0.011", capture: "0.026", sink: "0.013" },
      { signal: "0.673", pair: "0.602", obesity: "0.091", predation: "0.113", capture: "0.098", sink: "0.085" },
      { signal: "0.539", pair: "0.468", obesity: "0.195", predation: "0.197", capture: "0.161", sink: "0.152" },
      { signal: "0.454", pair: "0.386", obesity: "0.288", predation: "0.264", capture: "0.232", sink: "0.217" },
      { signal: "0.397", pair: "0.331", obesity: "0.366", predation: "0.318", capture: "0.291", sink: "0.271" },
    ],
    modelDerived: "Mallin tuottamia arvoja BERM:n ympäristökohtaisista biomarkkeriprofiileista (2025), ei suoraan mitattuja.",
    modelDerivedLink: "matemaattinen spesifikaatio",

    // Section 10: Käyttäytymisimmuunijärjestelmä
    s10title: "Käyttäytymisimmuunijärjestelmä",
    s10lead:
      "Stigma ei ole julmuutta. Se on käyttäytymisimmuunijärjestelmä — populaatiotason puolustus patologista käyttäytymistä vastaan, kehittynyt samojen valintapaineiden alla kuin biologinen immuunijärjestelmä. Kun se puretaan, populaatio jää puolustuskyvyttömäksi yllä kuvattuja transmissiokanavia vastaan.",
    s10bisExplain:
      "BIS toimii pyhyyden/puhtauden moraaliperustan (Haidt) kautta, joka ON psykologinen immuunijärjestelmä. Inhoherkkyys ennustaa sosiaalista konservatismia (Inbar et al. 2009, N=31 045) ei siksi että konservatismi on inhoa — vaan koska molemmat ovat patogeenintunnistuspiirin tuotoksia. Fincher et al. (2008, N=98 aluetta) osoittivat patogeeniprevalenssin ennustavan kollektivismia r=0.71:llä — maailmanaluetasolla r=0.93.",
    s10destigTitle: "Destigmatisaatio immunosuppressiona",
    s10destigLead:
      "Rappeutuneen fenotyypin vaatimus destigmatisaatiosta on rakenteellisesti identtinen HIV:n hyökkäyksen kanssa CD4+ T-soluja vastaan: patogeeni hyökkää immuunijärjestelmää vastaan koska immuunijärjestelmä estää sen leviämisen. Destigmatisaation vaikutukset luonnollisista kokeista:",
    s10destigCategories: [
      {
        category: "A — Haitallinen stigma poistettu",
        example: "Avioero",
        data: "Syyttömyysperusteiset lait: avioero nousi piikkinä, sitten normalisoitui. Naisten itsemurha laski 20% (Stevenson & Wolfers 2006). Nettopositiivinen.",
        color: "emerald",
      },
      {
        category: "B — Kysyntä paljastuu",
        example: "Kannabis",
        data: "Laillistaminen paljastaa olemassaolevan kysynnän. Käyttö stabiloituu alkupiikin jälkeen. Vasenkätisyysanalogia: nousi ~3%:sta ~12%:iin, sitten tasaantui — puhdas paljastuminen, nolla luontia.",
        color: "emerald",
      },
      {
        category: "C — Jatkuva kasvu",
        example: "LGBT-identifikaatio, OnlyFans, yksinhuoltajuus",
        data: "LGBT: 3.5% → 9.3% (2012–2024). Gen Z: 23.1%. Ei tasaantumista. OnlyFans: 348K → 4.63M viidessä vuodessa. Yksinhuoltajuus: 5% → 40% (US), 9% → 51% (UK).",
        color: "amber",
      },
      {
        category: "D — Vähäinen vaikutus",
        example: "Uskottomuus",
        data: "Destigmatisoitu mediassa. Luvut käytännössä muuttumattomat 20–25%. Stigma ei ollut sitova rajoite.",
        color: "blue",
      },
      {
        category: "E — Patologinen reuna",
        example: "Bugchasing, feederismi, Münchhausen by proxy",
        data: "Destigmatisaatio luo uusia käyttäytymismalleja joita ei voinut olla stigman alla. FDIA: 6–10% uhrikuolleisuus, 92.75% naistekijöitä (2025 katsaus, 314 tutkimusta).",
        color: "red",
      },
    ],
    s10inversionTitle: "Stigman inversio",
    s10inversionLead:
      "Kun institutionaalinen kaappaus ylittää kynnyksen, stigma ei vain katoa — se KÄÄNTYY. Assosiaatiostigma rankaisee nyt niitä jotka YLLÄPITÄVÄT BIS:iä. 'Bigotti', '-fobinen', '-isti' ovat stigmaleimoja joita sovelletaan immuunijärjestelmän omiin puolustajiin. FIRE 2026 -data: 93% opiskelijoista itsesensuroi, 36% tukee puhujien huutamista hiljaiseksi (ennätyskorkea), 15% hyväksyy väkivallan puheen estämiseksi. Inversio on empiirisesti mitattavissa.",
    s10gelfandTitle: "Gelfandin käänteinen U",
    s10gelfandLead:
      "Gelfandin tiukkuus-löysyys-ulottuvuus (2011, 33 maata, N=6 823) mittasi normien toimeenpanon voimakkuutta Pakistanista (12.3) Ukrainaan (1.6). Harrington & Gelfand (2015) testasivat sitten kurvilineaarisen mallin: molemmat ääripäät tuottavat huonoimmat tulokset. Elinajanodote R²=.44, kokonaishyvinvointi R²=.47, itsemurha R²=.25 — kaikki merkitsevät kvadraattiset termit. Japani (8.6) ja Etelä-Korea (10.0) sijoittuvat tiukkaan ääripäähän jossa käyrä kääntyy alaspäin. Japanin 1.15M hikikomoria ja TFR 1.20 osoittavat mitä tapahtuu kun kulttuurinen BIS-toimeenpano jatkuu ILMAN biologista substraattitukea: patologia menee maan alle sen sijaan että se ilmenisi. Normit osoittavat huomattavaa inertiaa — vuoden 2024 COVID-tutkimus (N=30 431, 43 maata) havaitsi useimpien normien tuskin muuttuneen edes pandemian aikana. BIS muuttuu autoimmuuniksi kun sitä toimeenpannaan sosiaalisesti yli substraatin kantokyvyn.",
    s10gradientTitle: "BIS-gradientti",
    s10gradientData: [
      { env: "Amish", bis: "0.934", destig: "0.021", inv: "0.000", net: "+0.913" },
      { env: "Maaseutu", bis: "0.591", destig: "0.112", inv: "0.000", net: "+0.479" },
      { env: "Lähiö", bis: "0.462", destig: "0.188", inv: "0.000", net: "+0.274" },
      { env: "Kaup. asuin.", bis: "0.386", destig: "0.282", inv: "0.000", net: "+0.104" },
      { env: "Kaup. toimisto", bis: "0.332", destig: "0.373", inv: "0.130", net: "-0.171" },
    ],
    s10gradientKey:
      "Nettokäyttäytymisimmuniteetti ylittää nollan kaupunkiasumisen ja kaupunkitoimiston välillä — institutionaalisesti kaapatuimmassa ympäristössä. Tämä on piste jossa populaatio jää puolustuskyvyttömäksi ja transmissio kiihtyy ilman vastarintaa.",

    // Section 11: Sosiaalisen transmission kanavat
    s11title: "Sosiaalisen transmission kanavat",
    s11lead:
      "Viisi empiirisesti perusteltua kanavaa joiden kautta patologiset tilat aktiivisesti leviävät rappeutuneista terveisiin yksilöihin. Jokainen kanava hyödyntää eri haavoittuvuutta ja toimii erillisen mekanismin kautta — yhdessä ne muodostavat ihmisen käyttäytymis-nielun.",
    s11channels: [
      {
        title: "Toipumisen sabotointi",
        subtitle: "Rapukaukalossa",
        icon: "skull",
        color: "red",
        desc: "Toipunut yksilö on eksistentiaalinen uhka: hän todistaa tilan olevan palautuva, mitätöiden koko uhri-identiteetin. Riippuvuusyhteisöissä raitistuvalle tarjotaan juomia, hänen edistystään vähätellään, hänet eristetään. Terve yksilö on elävä syytös.",
        empirical: "Päihderelapsi: 85% ensimmäisen vuoden aikana. 34% relapsoituu nimenomaan vertaispaineesta. Riippuvainen paras ystävä → OR 2.59, riippuvainen lähisukulainen → OR 3.49 (systemaattinen katsaus). Tall poppy -syndrooma: 86.8% naisista raportoi kokeneensa sitä töissä (2024 kansainvälinen tutkimus).",
        formula: "uhri-identiteetti × ulkoinen locus × (1 − 0.5 × T)",
      },
      {
        title: "Riippuvuuden transmissio",
        subtitle: "Münchhausen + ylisukupolvinen avuttomuus",
        icon: "activity",
        color: "red",
        desc: "Toisten sairastuttaminen tai avuttomaksi tekeminen kontrollin ylläpitämiseksi ja heidän itsenäisyytensä estämiseksi. Münchhausen by proxy: lapsen sairastuttaminen huomion ja statuksen vuoksi. Ylisukupolvinen avuttomuus: narsistinen vanhempi opettaa opitun avuttomuuden estääkseen lapsen autonomian. Molemmat palvelevat samaa funktiota: lähettäjä tarvitsee kohteen pysyvän riippuvaisena.",
        empirical: "ACE-tutkimus (Felitti 1998, N=17 337): ACE 4+ → masennus OR 4.6, itsemurha OR 12.2, alkoholismi OR 7.4. Kiintymyssuhteen vastaavuus: 75% vanhempi→lapsi (van IJzendoorn 1995, d=1.06). Opittu avuttomuus: 75% yhdellä sessiolla (Seligman 1967). FDIA: 6–10% uhrikuolleisuus.",
        formula: "turvallisuudenhaku × ulkoinen_locus × moraalinen_suoja × CORT × (1.5 − T)",
      },
      {
        title: "Sosiaalinen tartunta",
        subtitle: "Mediavahvisteinen patologiaepidemia",
        icon: "waves",
        color: "red",
        desc: "Sosiaalinen media luo diagnostisia epidemioita: TikTok-ticit, DID, syömishäiriöt leviävät identifikaation ja imitaation kautta. Diagnoosista tulee sosiaalista pääomaa — se tarjoaa identiteetin, yhteisön, suojan suoritusvaatimuksilta ja immuniteetin kritiikiltä. Tartunta vaatii sekä kanavan (sosiaalinen media) että substraatin (kognitiivisesti hauras, identiteettiä etsivä, ilman puhtaussuodatinta).",
        empirical: "Christakis & Fowler (2007, N=12 067): ystävän lihavuus +57%, molemminpuolinen ystävä +171%. TikTok-ticit: kymmenkertainen kasvu, 95% naisia, 95% TikTok-altistuneita (Pringsheim 2021). DID: <100 tapausta ennen 1980 → tuhansia/vuosi. Haidt (2024): 2012 jälkeen teinien itsemurha +167%, itsevahingoittaminen +188%. Lihavuuden visuaalinen normalisaatio: 82.5% lihavista aliarvioi painonsa (Robinson 2017).",
        formula: "dopamiinikaappaus × uhri-identiteetti × kognitiivinen_hauraus × (1.5 − pyhyys)",
      },
      {
        title: "Empatian aseellistaminen",
        subtitle: "Patologinen altruismi + sairauden sakralisaatio",
        icon: "building",
        color: "red",
        desc: "Myötätunto hyväksikäytettynä transmissiovektorina. Kaksi mekanismia: (1) rappeutuneet osoittavat kärsimystä resurssien, suojelun ja statuksen saamiseksi — empatia ilman inhosuodatinta ei tarjoa immuunivastetta hyväksikäytölle. (2) Instituutiot määrittelevät patologian hyveeksi ja terveyden sorrolla — 'terveys on etuoikeus', kompetenssi on 'toksista', hauraus on 'autenttisuutta'.",
        empirical: "Patologinen altruismi (Oakley et al. 2012, OUP, 31 artikkelia): hyperempatia/kanssariippuvuus koskettaa ~40M amerikkalaista. Käsitteen laajeneminen (Haslam 2016): haitta-, trauma-, ennakkoluulomääritelmät systemaattisesti laajentuneet. Tomiyama COBWEBS (2014): painostigma → kortisoli → ylensyöminen, mutta kaiken stigman poisto poistaa itseluokittelun joka motivoi muutosta.",
        formula: "inhopuute × moraalinen_kompensointi × (ulkoinen_locus + institutionaalinen_kaappaus)",
      },
      {
        title: "Aktiivinen infektiohakuisuus",
        subtitle: "Tietoinen jaetun patologian etsintä",
        icon: "bug",
        color: "red",
        desc: "Äärimmäisin transmissio: tartuttamaton etsii aktiivisesti tartuntaa. Biologinen: HIV-bugchasing. Sosiaalinen: diagnoosin etsiminen, 'neurodivergenssiylpeys', jaetun patologian juhlistaminen identiteettinä. Psykologinen funktio: anominen eristys on pahempaa kuin jaettu sairaus. Jaettu infektio poistaa stigman ('en ole enää yksin rikkinäisyydessäni') ja luo tiiviin sisäryhmän.",
        empirical: "Bugchasing dokumentoitu alakulttuurikirjallisuudessa (Dean 2009). Gen Z:n itseidentifikaatio mielenterveydiagnoosien kanssa identiteettimerkkeinä. DID- ja autismidiagnoosin itsediagnoostiyhteisöt miljoonia jäseniä sosiaalisen median alustoilla.",
        formula: "anominen_ahdistus × ulkoinen_locus × uhri-identiteetti × (1 − T)",
      },
    ],
    s11gradientTitle: "Transmissiogradientti",
    s11gradientData: [
      { env: "Amish", sabotage: "0.017", dependency: "0.001", contagion: "0.002", empathy: "0.002", infection: "0.000", composite: "0.003" },
      { env: "Maaseutu", sabotage: "0.132", dependency: "0.023", contagion: "0.056", empathy: "0.045", infection: "0.049", composite: "0.065" },
      { env: "Lähiö", sabotage: "0.223", dependency: "0.070", contagion: "0.127", empathy: "0.092", infection: "0.123", composite: "0.158" },
      { env: "Kaup. asuin.", sabotage: "0.299", dependency: "0.130", contagion: "0.199", empathy: "0.134", infection: "0.197", composite: "0.266" },
      { env: "Kaup. toim.", sabotage: "0.364", dependency: "0.190", contagion: "0.267", empathy: "0.170", infection: "0.265", composite: "0.377" },
    ],
    s11gradientKey:
      "Komposiittitransmissioindeksi nousee 0.003:sta (amish — lähes täydellinen resistenssi) 0.377:ään (kaupunkitoimisto — yhtäaikainen hyökkäys kaikista viidestä kanavasta ilman puolustusta). Sosiaalinen tartunta on suurin yksittäinen kanava rappeutuneimmassa ympäristössä, yhdenmukaisesti TikTok-tic-, DID- ja sosiaalisen median diagnostiikkaepidemiadatan kanssa.",

    s7title: "Maakohtainen validointi",
    s7lead: "Jos BERM on oikein, EMF-infrastruktuurin aikajanan pitäisi ennustaa näiden muutosten nopeus ja kuvio eri maissa:",
    s7countries: [
      {
        name: "Etelä-Korea",
        emf: "5G ensimmäisenä maailmassa (2019), 97% älypuhelin",
        observed: "TFR 0.72 (maailman matalin). 30 pisteen sukupuolten kuilu nuorilla äänestäjillä. 4B-liike. Varusmiesten lihavuus 23→31%.",
        fit: "Vahvin BERM-osuma",
      },
      {
        name: "Singapore",
        emf: "Korkein tiheys/km², lähes täydellinen 5G",
        observed: "TFR 0.87 huolimatta ~$55,000/lapsi pronatalismista. Nolla fertilitettivaikutusta politiikasta.",
        fit: "Vahva — todistaa politiikan irrelevanssin",
      },
      {
        name: "Japani",
        emf: "i-mode 1999, erittäin korkea tiheys",
        observed: "TFR 1.15. 70-75% herbivore-miehistä. Mutta vain 4% lihavuus. Primaarinen vaikutus ilman sekundaarista vahvistinta.",
        fit: "Japani-paradoksi vahvistaa mekanismikerrokset",
      },
      {
        name: "Suomi",
        emf: "Ensimmäinen mobiilimaa (NMT 1982, GSM 1990-l.)",
        observed: "TFR 1.87→1.25 14 vuodessa (-33%). Varusmiehet: 12-min juoksu -12%. T: -20% sukupolvien välillä (Perheentupa). Lihaskunto 66.8→41.2%.",
        fit: "Ensimmäinen liikkuja → nopein Euroopan lasku",
      },
      {
        name: "USA",
        emf: "Varhainen, korkea tiheys, 5G 2019",
        observed: "Lihavuus 15→42% (1980-2020). T -1.2%/vuosi ikäriippumaton (Travison 2007). Kaupunki-maaseutu poliittinen divergenssi 1990-luvulta.",
        fit: "Molemmat mekanismikerrokset näkyvissä samanaikaisesti",
      },
      {
        name: "Unkari",
        emf: "Myöhäisempi 4G, matalampi tiheys, 5G vasta 2023",
        observed: "TFR nousi 1.23→1.61 Orbánin politiikoilla → nyt kääntymässä 1.41:een. AEI: 'tempo-efektejä, ei kohorttifertiliteettiä.'",
        fit: "Autoritaarinen puskuri: hidastaa mutta ei estä",
      },
    ],
    s7keyInsight: "Pronatalistisella rahankäytöllä on nolla pitkäaikaisvaikutusta kun biologinen substraatti on rappeutunut. Singapore: ~$7 miljardia yhteensä. Puola: 500+ zlotya/kk. Unkari: perhetuet + asuminen. Japani: useita ohjelmia. KAIKKI osoittavat tilapäisiä tempo-efektejä jotka kääntyvät 5-10 vuodessa. Malli ennustaa tämän: biologiaa ei voi subventoida.",

    s8title: "Kaksoistuotosmalli",
    s8lead:
      "Testosteroni tuottaa kaksi rinnakkaista tuotosta: maskuliinisen morfologian (→ fyysinen viehättävyys) ja kilpailullisen poliittisen orientaation (→ konservatismi). Nämä eivät ole kausaalisesti yhteydessä toisiinsa — ne ovat saman hormonitilan rinnakkaistuotoksia.",
    s8evidence: [
      "Berggren et al. 2017: oikeistolaisten poliitikkojen arvioitiin olevan viehättävämpiä Suomessa, EU-parlamentissa, Australiassa ja USA:ssa (N=2 513)",
      "Kosinski 2021: kasvojen rakenne ennustaa poliittista orientaatiota 72% tarkkuudella yli 1M+ kasvoista",
      "Alogaily et al. 2025 RCT: eksogeeninen testosteroni siirtää poliittisia asenteita konservatiivisemmiksi (N=136)",
      "Peterson & Palmer 2017: fyysisesti vahvemmat miehet tukevat enemmän epätasa-arvoa ja vastustavat tulonsiirtoja",
    ],
    s8prediction: "BERM ennustaa: korrelaation pitäisi olla vahvempi siellä missä T-varianssi on suurempi (kaupunki-maaseutu-gradientti leveämpi), heikentyä ajan myötä kun keskimääräinen T laskee, ja olla olematon matalan EMF:n yhteisöissä (amish) joissa kaikilla on korkea T.",

    s9title: "Ennusteet",
    predictions: [
      { id: "PK-1", text: "Maat joissa mobiili-infrastruktuuri otettiin käyttöön aikaisemmin näyttävät nopeampaa TFR-laskua, kontrolloituna BKT:lla ja koulutuksella" },
      { id: "PK-2", text: "Maan sisäisen kaupunki-maaseutu poliittisen divergenssin alkamisajankohta korreloi mobiiliverkon käyttöönottoajankohdan, ei taloudellisen divergenssin kanssa" },
      { id: "PK-3", text: "Body positivity -liikkeen kasvuvauhti seuraa Pathopolites-indeksiä kaupunkitasolla, ei pelkkää lihavuusastetta" },
      { id: "PK-4", text: "Puberteetin estolääkkeiden reseptimäärät korreloivat institutionaalisen kaappausindeksin, eivät sukupuolidysforian esiintyvyyden kanssa" },
      { id: "PK-5", text: "Pronatalistinen politiikkakulutus/capita ei korreloi TFR:n kanssa 10 vuotta toteutuksen jälkeen" },
      { id: "PK-6", text: "Konservatiivin viehättävyys -korrelaatio heikkenee vuosikymmen vuosikymmeneltä kun populaation T-varianssi kapenee" },
      { id: "PK-7", text: "Nettokäyttäytymisimmuniteetti ylittää nollan lisää länsimaisten kaupunkiympäristöjen kohdalla 2030 mennessä institutionaalisen kaappauksen kiihtyessä, mitattavissa FIRE-tyyppisillä kyselyillä" },
      { id: "PK-8", text: "Sosiaalisen tartunnan indeksi seuraa TikTok/sosiaalisen median penetraatiota tarkemmin kuin perinteistä media-altistumista — testattavissa alustan käyttöönottopäivien ja diagnostisen epidemian alkamisen ristiinvertailulla" },
      { id: "PK-9", text: "Japanin hikikomori-luku jatkaa kasvuaan vaikka kulttuurinen tiukkuus teoreettisesti lieventyisi — autoimmuuni-BIS, kerran aktivoituna, jatkuu itsenäisesti alkuperäisestä toimeenpanomekanismista" },
      { id: "PK-10", text: "Destigmatisaation kategorian C domainit (jatkuva kasvu ilman tasaantumista) osoittavat käyttäytymis-identiteettikuiluja yli 50% — useampi identifioituu kuin harjoittaa käyttäytymistä" },
      { id: "PK-11", text: "Toipumisen sabotointi on painokkain transmissiokanava ympäristöissä joissa uhri-identiteettikulttuuri on vahva, mitattavissa tall poppy -syndroomakyselyillä korreloituna relapsidataan" },
      { id: "PK-12", text: "Riippuvuuden transmissio osoittaa suurimman ylisukupolvisen efektikoon kaikista kanavista — ACE OR>10 ja kiintymys d=1.06 kääpiöivät vertaistartunnan beta=0.15 — tehden siitä ensisijaisen interventiotavoitteen" },
    ],

    referencesTitle: "Keskeinen kirjallisuus",
    references: [
      "Singh 1993 — WHR-preferenssi kulttuurien välillä (N>1 000)",
      "Wedekind 1995 — MHC-riippuvainen tuoksupreferenssi (N=49m+49n)",
      "Lassek & Gaulin 2008 — WHR → DHA-varannot → jälkeläisten kognitio",
      "Pipitone & Gallup 2008 — Äänen viehättävyys ja ovulaatio",
      "Kavanagh et al. 2010 — Pariutumissosiometriteoria",
      "Burriss et al. 2015 — Huulten värimuutokset kuukautiskierron aikana",
      "Berggren et al. 2017 — Konservatiivin viehättävyys (4 maata, N=2 513)",
      "Calhoun 1973 — Universe 25 käyttäytymisvalu",
      "Christakis & Fowler 2007 — Lihavuuden sosiaalinen tartunta (N=12 067)",
      "Alvergne & Lummaa 2009 — Ehkäisy kääntää MHC-preferenssin",
      "Travison et al. 2007 — Populaation T-lasku 1.2%/vuosi (ikäriippumaton)",
      "Perheentupa et al. 2013 — Suomalaisten sukupolvien T-lasku (-20%)",
      "Kosinski 2021 — Kasvojen politiikkaluokittelu (72% tarkkuus, 1M+ kasvoa)",
      "Alogaily et al. 2025 — T RCT → konservatiivinen siirtymä (N=136)",
      "Schaller & Park 2011 — Käyttäytymisimmuunijärjestelmän katsaus",
      "Fincher et al. 2008 — Patogeeniprevalenssi → kollektivismi (r=0.71, N=98 aluetta)",
      "Murray & Schaller 2013 — Historiallinen patogeeni → autoritaarisuus (r=0.65, beta=0.73)",
      "Terrizzi et al. 2013 — Inhoherkkyys → konservatismi meta-analyysi",
      "Gelfand ym. 2011 — Tiukat-löysät kulttuurit (33 maata, N=6 823, Science)",
      "Harrington & Gelfand 2015 — Kurvilineaarinen tiukkuus-hyvinvointi-malli (R²=.47 kokonaisindeksi, PLoS ONE)",
      "Inbar et al. 2009 — Inho → sosiaalinen konservatismi (N=31 045)",
      "Felitti et al. 1998 — ACE-tutkimus (N=17 337): ACE 4+ → masennus OR 4.6, itsemurha OR 12.2",
      "van IJzendoorn 1995 — Kiintymyssuhteen transmission meta-analyysi: 75% vastaavuus, d=1.06",
      "Seligman 1967 — Opittu avuttomuus: 75% yhdellä sessiolla",
      "Pringsheim 2021 — TikTok funktionaaliset ticit: 95% naisia, kymmenkertainen kasvu",
      "Haidt 2024 — 2012 jälkeinen teinien mielenterveyskriisi (+167% itsemurha, +188% itsevahingoittaminen)",
      "Robinson et al. 2017 — 82.5% lihavista aliarvioi painonsa (visuaalinen normalisaatio)",
      "Oakley et al. 2012 — Patologinen altruismi (OUP, 31 artikkelia, ~40M kanssariippuvuus)",
      "Haslam 2016 — Käsitteen laajeneminen: haitta-määritelmien systemaattinen laajentuminen",
      "Tomiyama 2014 — COBWEBS: painostigma → kortisoli → ylensyöminen -kierre",
      "Foulkes & Andrews 2023 — Prevalenssi-inflaatiohypoteesi",
      "Sandra et al. 2025 — ADHD-tietoisuus → 28%:sta 58%:iin väärä itsediagnoosi (RCT, N=215)",
      "FIRE 2026 — 93% itsesensuroi, 36% tukee puhujien hiljentämistä, 15% hyväksyy väkivallan",
      "Stevenson & Wolfers 2006 — Syyttömyysperuste-avioero → naisten itsemurha -20%",
    ],

    patopolisLink: "Patopolis",
    patokratiaLink: "Patokratia",
    pathopolitesLink: "Pathopolites",
  },
  ja: {
    title: "パトキネシス",
    subtitle: "病理はどう伝播するか",
    heroLead: "身体的魅力は美的なものではない。生物学的なものである。",
    etymologyTitle: "語源",
    etymology: "pathos (πάθος) 苦しみ、病 + kinesis (κίνησις) 運動、伝達",
    crossRef: "このページはパトポリス（対結合崩壊）とパトクラティア（政治的出力）を結ぶ。",
    civilizationLink: "文明に戻る",
    s1title: "第三の層", s1lead: "BERMモデルは動機付けと愛着の2経路を特定したが、第3の層がある。",
    signalCategories: [], s2title: "5因子方程式", s2lead: "", s2formula: "", s2key: "", s2factors: [],
    s3title: "アロマターゼループ", s3lead: "", s3steps: [], s3japan: "", s3japanText: "",
    s4title: "行動シンク", s4lead: "", s4calhounPhases: [], s4key: "",
    s5title: "捕食の5チャネル", s5lead: "", s5channels: [],
    s6title: "信号・シンク勾配", s6lead: "", s6envLabels: [], s6gradientData: [] as never[], modelDerived: "", modelDerivedLink: "",
    s10title: "行動免疫システム", s10lead: "", s10bisExplain: "", s10destigTitle: "", s10destigLead: "", s10destigCategories: [], s10inversionTitle: "", s10inversionLead: "", s10gelfandTitle: "", s10gelfandLead: "", s10gradientTitle: "", s10gradientData: [], s10gradientKey: "",
    s11title: "社会的伝達チャネル", s11lead: "", s11channels: [], s11gradientTitle: "", s11gradientData: [], s11gradientKey: "",
    s7title: "国別検証", s7lead: "", s7countries: [], s7keyInsight: "",
    s8title: "二重出力モデル", s8lead: "", s8evidence: [], s8prediction: "",
    s9title: "予測", predictions: [],
    referencesTitle: "主要文献", references: [],
    patopolisLink: "パトポリス", patokratiaLink: "パトクラティア", pathopolitesLink: "パトポリテス",
  },
  fr: {
    title: "Patokinesis",
    subtitle: "Comment la pathologie se propage",
    heroLead: "L'attractivite physique n'est pas esthetique. Elle est biologique.",
    etymologyTitle: "Etymologie",
    etymology: "pathos (πάθος) souffrance + kinesis (κίνησις) mouvement, transmission",
    crossRef: "Cette page relie Patopolis (effondrement des liens) a Patokratia (productions politiques).",
    civilizationLink: "Retour a Civilisation",
    s1title: "La troisieme couche", s1lead: "Le modele BERM identifie deux voies de defaillance.",
    signalCategories: [], s2title: "L'equation a cinq facteurs", s2lead: "", s2formula: "", s2key: "", s2factors: [],
    s3title: "La boucle aromatase", s3lead: "", s3steps: [], s3japan: "", s3japanText: "",
    s4title: "Le puits comportemental", s4lead: "", s4calhounPhases: [], s4key: "",
    s5title: "Cinq canaux de predation", s5lead: "", s5channels: [],
    s6title: "Gradient signal et puits", s6lead: "", s6envLabels: [], s6gradientData: [] as never[], modelDerived: "", modelDerivedLink: "",
    s10title: "Systeme immunitaire comportemental", s10lead: "", s10bisExplain: "", s10destigTitle: "", s10destigLead: "", s10destigCategories: [], s10inversionTitle: "", s10inversionLead: "", s10gelfandTitle: "", s10gelfandLead: "", s10gradientTitle: "", s10gradientData: [], s10gradientKey: "",
    s11title: "Canaux de transmission sociale", s11lead: "", s11channels: [], s11gradientTitle: "", s11gradientData: [], s11gradientKey: "",
    s7title: "Validation par pays", s7lead: "", s7countries: [], s7keyInsight: "",
    s8title: "Modele de double sortie", s8lead: "", s8evidence: [], s8prediction: "",
    s9title: "Predictions", predictions: [],
    referencesTitle: "Litterature cle", references: [],
    patopolisLink: "Patopolis", patokratiaLink: "Patokratia", pathopolitesLink: "Pathopolites",
  },
  ko: {
    title: "파토키네시스",
    subtitle: "병리가 어떻게 전파되는가",
    heroLead: "신체적 매력은 미학적인 것이 아니다. 생물학적인 것이다.",
    etymologyTitle: "어원",
    etymology: "pathos (πάθος) 고통, 질병 + kinesis (κίνησις) 운동, 전달",
    crossRef: "이 페이지는 파토폴리스와 파토크라티아를 연결합니다.",
    civilizationLink: "문명으로 돌아가기",
    s1title: "세 번째 층", s1lead: "BERM 모델은 동기부여와 애착의 두 경로를 식별했지만, 세 번째 층이 있다.",
    signalCategories: [], s2title: "5요인 방정식", s2lead: "", s2formula: "", s2key: "", s2factors: [],
    s3title: "아로마타제 루프", s3lead: "", s3steps: [], s3japan: "", s3japanText: "",
    s4title: "행동 싱크", s4lead: "", s4calhounPhases: [], s4key: "",
    s5title: "포식의 5채널", s5lead: "", s5channels: [],
    s6title: "신호 및 싱크 기울기", s6lead: "", s6envLabels: [], s6gradientData: [] as never[], modelDerived: "", modelDerivedLink: "",
    s10title: "행동 면역 시스템", s10lead: "", s10bisExplain: "", s10destigTitle: "", s10destigLead: "", s10destigCategories: [], s10inversionTitle: "", s10inversionLead: "", s10gelfandTitle: "", s10gelfandLead: "", s10gradientTitle: "", s10gradientData: [], s10gradientKey: "",
    s11title: "사회적 전달 채널", s11lead: "", s11channels: [], s11gradientTitle: "", s11gradientData: [], s11gradientKey: "",
    s7title: "국가별 검증", s7lead: "", s7countries: [], s7keyInsight: "",
    s8title: "이중 출력 모델", s8lead: "", s8evidence: [], s8prediction: "",
    s9title: "예측", predictions: [],
    referencesTitle: "핵심 문헌", references: [],
    patopolisLink: "파토폴리스", patokratiaLink: "파토크라티아", pathopolitesLink: "파토폴리테스",
  },
};

type CopyEN = (typeof COPY)["en"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta: Record<string, { title: string; description: string }> = {
    en: {
      title: "Signal Degradation & Behavioral Sink | BERM",
      description: "How hormonal disruption degrades mate signaling, and how the degraded majority predates on the healthy remainder — the Calhoun mechanism in human civilization.",
    },
    fi: {
      title: "Signaalidegradaatio ja käyttäytymisvalu | BERM",
      description: "Miten hormonihäiriö rappeuttaa parinvalintasignaalit ja miten rappeutunut enemmistö predatoi tervettä jäännöstä — Calhounin mekanismi ihmissivilisaatiossa.",
    },
    ja: { title: "信号劣化と行動シンク | BERM", description: "ホルモン障害が配偶者シグナルをどう劣化させるか。" },
    fr: { title: "Degradation du signal et puits comportemental | BERM", description: "Comment la perturbation hormonale degrade les signaux de selection de partenaire." },
    ko: { title: "신호 열화와 행동 싱크 | BERM", description: "호르몬 교란이 배우자 신호를 어떻게 열화시키는가." },
  };
  const m = meta[locale] ?? meta.en;
  return { title: m.title, description: m.description };
}

const SIGNAL_ICONS: Record<string, typeof Eye> = {
  body: Eye,
  voice: Mic,
  hidden: EyeOff,
};

const SIGNAL_COLORS: Record<string, { border: string; bg: string; text: string }> = {
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/5", text: "text-blue-500" },
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/5", text: "text-amber-500" },
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/5", text: "text-emerald-500" },
};

const CHANNEL_ICONS: Record<string, typeof Eye> = {
  waves: Waves,
  building: Building2,
  skull: Skull,
  bug: Bug,
  activity: Activity,
};

export default async function PatokinesiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as CopyEN;

  return (
    <main id="main-content">
      <TranslationNotice copy={COPY} locale={locale} />
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Hero */}
        <header className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href={`/${locale}/civilization`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {d.civilizationLink}
            </Link>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Radio className="w-8 h-8 text-teal-500" />
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              {d.title}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground italic mb-6">{d.subtitle}</p>
          <p className="text-lg leading-relaxed text-foreground/80 max-w-3xl first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">
            {d.heroLead}
          </p>
        </header>

        {/* Etymology */}
        <section className="mb-12 border-l-2 border-teal-500/30 pl-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-500 mb-2">
            {d.etymologyTitle}
          </h2>
          <p className="text-base italic text-foreground/70">{d.etymology}</p>
        </section>

        {/* Cross-reference note */}
        <div className="mb-16 bg-muted/30 rounded-lg p-5 text-sm text-foreground/70 leading-relaxed">
          {d.crossRef}
        </div>

        {/* S1: Signal Degradation */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">{d.s1title}</h2>
          <p className="text-base leading-relaxed text-foreground/80 mb-10 max-w-3xl">
            {d.s1lead}
          </p>

          <div className="space-y-8">
            {d.signalCategories.map((cat, i) => {
              const Icon = SIGNAL_ICONS[cat.icon] ?? Eye;
              const colors = SIGNAL_COLORS[cat.color] ?? SIGNAL_COLORS.blue;
              return (
                <div
                  key={i}
                  className={`rounded-xl border ${colors.border} ${colors.bg} p-6`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Icon className={`w-5 h-5 ${colors.text} mt-0.5 shrink-0`} />
                    <div>
                      <h3 className="text-lg font-semibold">{cat.title}</h3>
                      <p className="text-sm text-muted-foreground">{cat.desc}</p>
                    </div>
                  </div>
                  <p className="text-sm font-mono text-foreground/60 mb-4 bg-background/50 rounded px-3 py-2">
                    {cat.substrate}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {cat.examples.map((ex, j) => (
                      <li key={j} className="text-sm text-foreground/70 leading-relaxed pl-4 border-l-2 border-foreground/10">
                        {ex}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground">{cat.literature}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* S2: Five-way compound */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">{d.s2title}</h2>
          <p className="text-base leading-relaxed text-foreground/80 mb-6 max-w-3xl">
            {d.s2lead}
          </p>
          <div className="bg-foreground/5 rounded-lg p-4 mb-6 font-mono text-sm break-words">
            {d.s2formula}
          </div>
          <p className="text-sm leading-relaxed text-foreground/70 mb-8 max-w-3xl">
            {d.s2key}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {d.s2factors.map((f, i) => (
              <div key={i} className="rounded-lg border border-foreground/10 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-teal-500">{i + 1}</span>
                  <h4 className="text-sm font-semibold">{f.name}</h4>
                </div>
                <p className="text-xs font-mono text-foreground/50 mb-1">{f.substrate}</p>
                <p className="text-xs text-foreground/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* S3: Aromatase loop */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">{d.s3title}</h2>
          <p className="text-base leading-relaxed text-foreground/80 mb-6 max-w-3xl">
            {d.s3lead}
          </p>
          <ol className="space-y-3 mb-8">
            {d.s3steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/70">
                <span className="text-xs font-mono text-red-500 mt-0.5 shrink-0">{i + 1}</span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          {d.s3japan && (
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-5">
              <h3 className="text-base font-semibold text-amber-600 mb-2">{d.s3japan}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{d.s3japanText}</p>
            </div>
          )}
        </section>

        {/* S4: Behavioral sink */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">{d.s4title}</h2>
          <p className="text-base leading-relaxed text-foreground/80 mb-8 max-w-3xl">
            {d.s4lead}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 mb-6">
            {d.s4calhounPhases.map((p, i) => (
              <div
                key={i}
                className={`rounded-lg border p-4 ${
                  i >= 2
                    ? "border-red-500/30 bg-red-500/5"
                    : "border-foreground/10"
                }`}
              >
                <h4 className="text-sm font-semibold mb-1">{p.phase}</h4>
                <p className="text-xs text-foreground/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-5">
            <p className="text-sm text-foreground/80 leading-relaxed font-medium">
              {d.s4key}
            </p>
          </div>
        </section>

        {/* S5: Five channels */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">{d.s5title}</h2>
          <p className="text-base leading-relaxed text-foreground/80 mb-8 max-w-3xl">
            {d.s5lead}
          </p>
          <div className="space-y-6">
            {d.s5channels.map((ch, i) => {
              const Icon = CHANNEL_ICONS[ch.icon] ?? Waves;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-red-500/20 bg-red-500/3 p-6"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-xs font-mono text-red-500 mt-1">{i + 1}</span>
                    <Icon className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold">{ch.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                    {ch.desc}
                  </p>
                  <p className="text-xs font-mono text-foreground/40">
                    {ch.mechanism}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* S6: Signal & sink gradient */}
        {d.s6gradientData.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-4">{d.s6title}</h2>
            <p className="text-base leading-relaxed text-foreground/80 mb-6 max-w-3xl">
              {d.s6lead}
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="text-left py-2 pr-4 text-xs uppercase tracking-wider text-muted-foreground">Env</th>
                    <th className="text-right py-2 px-2 text-xs uppercase tracking-wider text-muted-foreground">Signal</th>
                    <th className="text-right py-2 px-2 text-xs uppercase tracking-wider text-muted-foreground">Pair</th>
                    <th className="text-right py-2 px-2 text-xs uppercase tracking-wider text-muted-foreground">Obesity</th>
                    <th className="text-right py-2 px-2 text-xs uppercase tracking-wider text-muted-foreground">Predation</th>
                    <th className="text-right py-2 px-2 text-xs uppercase tracking-wider text-muted-foreground">Capture</th>
                    <th className="text-right py-2 pl-2 text-xs uppercase tracking-wider text-red-500 font-bold">Sink</th>
                  </tr>
                </thead>
                <tbody>
                  {d.s6gradientData.map((row, i) => (
                    <tr key={i} className="border-b border-foreground/5">
                      <td className="py-2 pr-4 font-medium">{d.s6envLabels[i]}</td>
                      <td className="py-2 px-2 text-right font-mono text-teal-600">{row.signal}</td>
                      <td className="py-2 px-2 text-right font-mono text-teal-600">{row.pair}</td>
                      <td className="py-2 px-2 text-right font-mono text-amber-600">{row.obesity}</td>
                      <td className="py-2 px-2 text-right font-mono text-foreground/60">{row.predation}</td>
                      <td className="py-2 px-2 text-right font-mono text-foreground/60">{row.capture}</td>
                      <td className="py-2 pl-2 text-right font-mono font-bold text-red-600">{row.sink}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mb-6 italic max-w-3xl">
              {d.modelDerived}{" "}
              <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
            </p>
          </section>
        )}

        {/* S10: Behavioral Immune System */}
        {d.s10destigCategories.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-4">{d.s10title}</h2>
            <p className="text-base leading-relaxed text-foreground/80 mb-6 max-w-3xl">
              {d.s10lead}
            </p>
            <div className="bg-foreground/5 rounded-lg p-5 mb-8">
              <p className="text-sm text-foreground/70 leading-relaxed">
                {d.s10bisExplain}
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3">{d.s10destigTitle}</h3>
            <p className="text-sm text-foreground/70 leading-relaxed mb-6 max-w-3xl">
              {d.s10destigLead}
            </p>
            <div className="space-y-4 mb-10">
              {d.s10destigCategories.map((cat, i) => {
                const colorMap: Record<string, string> = {
                  emerald: "border-emerald-500/30 bg-emerald-500/5",
                  amber: "border-amber-500/30 bg-amber-500/5",
                  blue: "border-blue-500/30 bg-blue-500/5",
                  red: "border-red-500/30 bg-red-500/5",
                };
                return (
                  <div key={i} className={`rounded-lg border p-5 ${colorMap[cat.color] ?? "border-foreground/10"}`}>
                    <h4 className="text-sm font-semibold mb-1">{cat.category}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{cat.example}</p>
                    <p className="text-sm text-foreground/70 leading-relaxed">{cat.data}</p>
                  </div>
                );
              })}
            </div>

            <h3 className="text-xl font-semibold mb-3">{d.s10inversionTitle}</h3>
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-5 mb-10">
              <p className="text-sm text-foreground/80 leading-relaxed">
                {d.s10inversionLead}
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3">{d.s10gelfandTitle}</h3>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-5 mb-10">
              <p className="text-sm text-foreground/70 leading-relaxed">
                {d.s10gelfandLead}
              </p>
            </div>

            {d.s10gradientData.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-4">{d.s10gradientTitle}</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-foreground/10">
                        <th className="text-left py-2 pr-4 text-xs uppercase tracking-wider text-muted-foreground">Env</th>
                        <th className="text-right py-2 px-2 text-xs uppercase tracking-wider text-muted-foreground">BIS</th>
                        <th className="text-right py-2 px-2 text-xs uppercase tracking-wider text-muted-foreground">Destig</th>
                        <th className="text-right py-2 px-2 text-xs uppercase tracking-wider text-muted-foreground">Inv</th>
                        <th className="text-right py-2 pl-2 text-xs uppercase tracking-wider text-muted-foreground">Net</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.s10gradientData.map((row, i) => (
                        <tr key={i} className="border-b border-foreground/5">
                          <td className="py-2 pr-4 font-medium">{row.env}</td>
                          <td className="py-2 px-2 text-right font-mono text-teal-600">{row.bis}</td>
                          <td className="py-2 px-2 text-right font-mono text-amber-600">{row.destig}</td>
                          <td className="py-2 px-2 text-right font-mono text-red-600">{row.inv}</td>
                          <td className={`py-2 pl-2 text-right font-mono font-bold ${row.net.startsWith("-") ? "text-red-600" : "text-teal-600"}`}>{row.net}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mb-6 italic max-w-3xl">
                  {d.modelDerived}{" "}
                  <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed mb-8 max-w-3xl">
                  {d.s10gradientKey}
                </p>
              </>
            )}
          </section>
        )}

        {/* S11: Social Transmission Channels */}
        {d.s11channels.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-4">{d.s11title}</h2>
            <p className="text-base leading-relaxed text-foreground/80 mb-8 max-w-3xl">
              {d.s11lead}
            </p>
            <div className="space-y-6 mb-10">
              {d.s11channels.map((ch, i) => {
                const Icon = CHANNEL_ICONS[ch.icon] ?? Waves;
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-red-500/20 bg-red-500/3 p-6"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-xs font-mono text-red-500 mt-1">{i + 1}</span>
                      <Icon className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold">{ch.title}</h3>
                        <p className="text-xs text-muted-foreground">{ch.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                      {ch.desc}
                    </p>
                    <div className="bg-background/50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-foreground/60 leading-relaxed">
                        {ch.empirical}
                      </p>
                    </div>
                    <p className="text-xs font-mono text-foreground/40">
                      {ch.formula}
                    </p>
                  </div>
                );
              })}
            </div>

            {d.s11gradientData.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-4">{d.s11gradientTitle}</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-foreground/10">
                        <th className="text-left py-2 pr-3 text-xs uppercase tracking-wider text-muted-foreground">Env</th>
                        <th className="text-right py-2 px-1 text-xs uppercase tracking-wider text-muted-foreground">Sab</th>
                        <th className="text-right py-2 px-1 text-xs uppercase tracking-wider text-muted-foreground">Dep</th>
                        <th className="text-right py-2 px-1 text-xs uppercase tracking-wider text-muted-foreground">Cont</th>
                        <th className="text-right py-2 px-1 text-xs uppercase tracking-wider text-muted-foreground">Emp</th>
                        <th className="text-right py-2 px-1 text-xs uppercase tracking-wider text-muted-foreground">Inf</th>
                        <th className="text-right py-2 pl-1 text-xs uppercase tracking-wider text-red-500 font-bold">Σ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.s11gradientData.map((row, i) => (
                        <tr key={i} className="border-b border-foreground/5">
                          <td className="py-2 pr-3 font-medium">{row.env}</td>
                          <td className="py-2 px-1 text-right font-mono text-foreground/60">{row.sabotage}</td>
                          <td className="py-2 px-1 text-right font-mono text-foreground/60">{row.dependency}</td>
                          <td className="py-2 px-1 text-right font-mono text-foreground/60">{row.contagion}</td>
                          <td className="py-2 px-1 text-right font-mono text-foreground/60">{row.empathy}</td>
                          <td className="py-2 px-1 text-right font-mono text-foreground/60">{row.infection}</td>
                          <td className="py-2 pl-1 text-right font-mono font-bold text-red-600">{row.composite}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mb-6 italic max-w-3xl">
                  {d.modelDerived}{" "}
                  <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed mb-8 max-w-3xl">
                  {d.s11gradientKey}
                </p>
              </>
            )}
          </section>
        )}

        {/* S7: Cross-country */}
        {d.s7countries.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-4">{d.s7title}</h2>
            <p className="text-base leading-relaxed text-foreground/80 mb-8 max-w-3xl">
              {d.s7lead}
            </p>
            <div className="space-y-4 mb-8">
              {d.s7countries.map((c, i) => (
                <div key={i} className="rounded-lg border border-foreground/10 p-5">
                  <h3 className="text-base font-semibold mb-2">{c.name}</h3>
                  <div className="grid gap-2 sm:grid-cols-3 text-sm">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">EMF</span>
                      <p className="text-foreground/70">{c.emf}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">Observed</span>
                      <p className="text-foreground/70">{c.observed}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">Fit</span>
                      <p className="text-teal-600 font-medium">{c.fit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-teal-500/5 border border-teal-500/20 rounded-lg p-5">
              <p className="text-sm text-foreground/80 leading-relaxed">
                {d.s7keyInsight}
              </p>
            </div>
          </section>
        )}

        {/* S8: Conservative-attractiveness */}
        {d.s8evidence.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-4">{d.s8title}</h2>
            <p className="text-base leading-relaxed text-foreground/80 mb-6 max-w-3xl">
              {d.s8lead}
            </p>
            <ul className="space-y-3 mb-6">
              {d.s8evidence.map((e, i) => (
                <li key={i} className="text-sm text-foreground/70 leading-relaxed pl-4 border-l-2 border-teal-500/30">
                  {e}
                </li>
              ))}
            </ul>
            <div className="bg-foreground/5 rounded-lg p-4">
              <p className="text-sm text-foreground/70 leading-relaxed">{d.s8prediction}</p>
            </div>
          </section>
        )}

        {/* S9: Predictions */}
        {d.predictions.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-6">{d.s9title}</h2>
            <div className="space-y-3">
              {d.predictions.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start gap-4 rounded-lg border border-foreground/10 p-4"
                >
                  <span className="text-xs font-mono text-teal-500 shrink-0 mt-0.5">
                    {p.id}
                  </span>
                  <p className="text-sm text-foreground/70 leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {d.references.length > 0 && (
          <section className="mb-20">
            <h2 className="text-lg font-bold mb-4">{d.referencesTitle}</h2>
            <ol className="space-y-1 text-xs text-muted-foreground">
              {d.references.map((r, i) => (
                <li key={i} className="leading-relaxed">
                  {i + 1}. {r}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Navigation */}
        <nav className="flex flex-wrap gap-3 pt-8 border-t border-foreground/10">
          <Link
            href={`/${locale}/civilization/patopolis`}
            className="text-sm text-blue-500 hover:underline"
          >
            ← {d.patopolisLink}
          </Link>
          <Link
            href={`/${locale}/civilization/patokratia`}
            className="text-sm text-red-500 hover:underline"
          >
            {d.patokratiaLink} →
          </Link>
          <Link
            href={`/${locale}/civilization/pathopolites`}
            className="text-sm text-rose-500 hover:underline"
          >
            {d.pathopolitesLink} →
          </Link>
        </nav>
      </div>
    </main>
  );
}
