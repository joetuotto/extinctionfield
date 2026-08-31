import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

interface Phenomenon {
  num: number;
  title: string;
  observation: string[];
  conventionalLabel: string;
  conventional: string[];
  bermLabel: string;
  berm: string[];
  epistemic: string;
  sources: string;
}

interface Copy {
  intro: string[];
  conventionalLabel: string;
  bermLabel: string;
  epistemicLabel: string;
  sourcesLabel: string;
  phenomena: Phenomenon[];
  tableTitle: string;
  tableHeaders: [string, string, string, string, string];
  tableRows: [string, string, string, string, string][];
  tableSummary: string[];
  refsTitle: string;
  refs: string[];
}

const PHENOMENA_EN: Phenomenon[] = [
  {
    num: 1,
    title: "The Klimentidis Paradox: 8 Species Are Getting Fatter",
    observation: [
      "Klimentidis et al. 2011 (Proc. R. Soc. B): 24 populations of 8 species — primates, rodents, dogs, cats — whose weight trajectories were examined over decades. EVERY population's weight trend was positive (p = 1.2 × 10⁻⁷).",
      "Replication status: The study has NOT been replicated (179 citations, 0 replications, LessWrong 2023). The weight gain in NTP control rats is PARTIALLY explained by changes in control diet composition over time. Weight gain in livestock and pets is partially explained by changes in feeding. BUT: data from research colony primates (macaques, chimpanzees, marmosets) under controlled conditions and wild rat data remain unexplained.",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "No comprehensive explanation. Proposed candidates (obesogens, microbiome changes) fail to explain weight gain in research primates or wild rats.",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "EMF → VGCC → Ca²⁺ → disruption of pancreatic β-cell insulin secretion (VK46) + melatonin↓ → circadian metabolic disruption. The same environmental change (rising EMF background in research facilities and urban environments) affects all species simultaneously.",
    ],
    epistemic: "L* (primates + wild rats M|C, overall requires replication)",
    sources: "Klimentidis et al. 2011 Proc R Soc B 278:1626–1632; LessWrong replication analysis 2023; Brown et al. 2016 Obes Res Clin Pract 10:243–255",
  },
  {
    num: 2,
    title: "Negative Flynn Effect: IQ Is Declining in Developed Countries",
    observation: [
      "Bratsberg & Rogeberg 2018 (PNAS, N=730,000): IQ rose in cohorts born 1962–1975 and FELL in cohorts born 1975–1991 in Norway. The same decline has been reported in Denmark, Finland, France, the Netherlands, Britain, and Australia. The decline is 5–7 points per generation since the mid-1990s.",
      "USA data (Dworak et al. 2023, Intelligence, N=394,378): three cognitive domains declined 2006–2018 (verbal reasoning, matrix reasoning, letter-number sequences), but 3D spatial rotation ROSE. This dissociation is informative: the declining domains involve prefrontal cortex abstract reasoning, while the rising domain involves parieto-occipital spatial processing.",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "Bratsberg & Rogeberg demonstrated with SIBLING COMPARISON (within-family) that the decline is environmental, NOT genetic. Which environmental change? \"Debated — shifts in schooling, media use, or attention have all been proposed\" (Cogn-IQ 2026). No consensus.",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "EMF → BDNF↓ (VK23: Cav1.2 → CREB → BDNF transcription↓) + melatonin↓ → sleep↓ → cognitive consolidation↓. BDNF is the key molecule of neuroplasticity, and its decline affects the prefrontal cortex (abstract reasoning) more than parieto-occipital regions (spatial).",
      "This explains the Dworak 2023 dissociation: abstract reasoning↓ but spatial↑ (video games compensate for spatial). The conventional \"screen time\" explanation would predict ALL cognitive functions declining — no dissociation should exist.",
      "Timing: The decline begins in the 1990s = 2G networks, PCs, fluorescent lighting become widespread. Sibling comparison rules out genetics → ENVIRONMENTAL CHANGE → BERM identifies it.",
    ],
    epistemic: "M|C (strong epidemiological + mechanistic logic)",
    sources: "Bratsberg & Rogeberg 2018 PNAS 115:6674–6678; Dworak et al. 2023 Intelligence 101:101793; Flynn & Shayer 2018",
  },
  {
    num: 3,
    title: "\"Deaths of Despair\": Mortality from Despair",
    observation: [
      "Case & Deaton 2015/2020: mortality from overdoses, alcoholic liver disease, and suicide has risen 56–387% by age cohort over the last 20 years in the USA. Particularly middle-aged men without college education. Life expectancy FELL — for the first time during peacetime in an industrialized country.",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "Socioeconomic: deindustrialization, wage stagnation, opioid overprescription. Case & Deaton describe it as \"cumulative disadvantage.\" BUT: (a) in Europe, the same socioeconomic factors exist WITHOUT a comparable mortality rise, (b) why SPECIFICALLY middle-aged men, (c) a PNAS 2024 reevaluation shows that \"despair\" per se does not explain racial heterogeneity.",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "Cumulative biological cascade: T↓ 1.2%/yr: in middle-aged men, T is already naturally lower → EMF cascade pushes BELOW critical threshold → DA↓ → anhedonia → compensation with substances (opioids, alcohol) → cortisol↑ → chronic stress → pain sensitivity↑ (VK30: α2δ-1↑) → melatonin↓ → sleep↓ → depression → suicidal behavior → OXT↓ → social isolation → \"despair\".",
      "Why men: T decline affects men more because absolute T levels are higher → greater absolute decline. Why USA > Europe: US EMF infrastructure is OLDER (electrification from 1890) and MORE INTENSIVE (larger houses, more devices, longer phone usage).",
    ],
    epistemic: "M|C",
    sources: "Case & Deaton 2015 PNAS 112:15078–15083; Case & Deaton 2020 Deaths of Despair (Princeton UP); PNAS 2024 reevaluation",
  },
  {
    num: 4,
    title: "The Female Happiness Paradox",
    observation: [
      "Stevenson & Wolfers 2009 (AEJ:EP): women's subjective happiness has declined both absolutely and relative to men since the 1970s despite significant improvements in women's objective status. Blanchflower & Bryson 2024 (J Pop Econ): the paradox is \"extremely robust\" especially for negative affect: women report MORE depression, stress, and anxiety than men ALWAYS and EVERYWHERE. Science Advances 2026: two paradoxes identified — women's happiness is higher but their negative affect is ALSO higher.",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "Unclear. Proposals: role overload, raised expectations, measurement artifacts. None explains the TEMPORAL trend (1970→) or UNIVERSALITY (same in all countries).",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "Women's hormonal system is more sensitive to EMF at several points: estrogen modulates VGCC expression (estrogen → Cav1.2↑); the menstrual cycle requires precise Ca²⁺ oscillation; the OXT system is MORE CENTRAL to women's social wellbeing; women are more sensitive to circadian disruption (seasonal depression 2–3× more common in women).",
    ],
    epistemic: "M|C",
    sources: "Stevenson & Wolfers 2009 AEJ:EP 1:190–225; Blanchflower & Bryson 2024 J Pop Econ 37:16; Science Advances 2026",
  },
  {
    num: 5,
    title: "The Autoimmune Epidemic",
    observation: [
      "Global age-standardized prevalence nearly DOUBLED from 1990 to 2021 (GBD 2021). Celiac disease: 5-fold increase over 30 years in the USA (doubles every 15 years). MS: +30% globally 2013–2022. IBD: +46% 2006–2021. T1D nearly doubled over 40 years. Particularly CHILDHOOD T1D and IBD are rising fastest.",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "\"Hygiene hypothesis\" explains part of it. BUT: hygiene levels have not changed significantly from 1990–2021, and in children the growth is FASTEST — the hygiene hypothesis does not explain the acceleration.",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "EMF → VGCC → Ca²⁺ → NADPH oxidase → ROS → NF-κB → proinflammatory cytokines. ADDITIONALLY: melatonin↓ → immunomodulation↓ + vitamin D↓ → T-reg function↓. Three independent EMF pathways converge on the same outcome. Children's particular vulnerability: prenatal developmental windows (VK5a).",
    ],
    epistemic: "M|C",
    sources: "GBD 2021; NHC 2025; NCBI Bookshelf NBK605881 (2022)",
  },
  {
    num: 6,
    title: "The Myopia Pandemic",
    observation: [
      "Myopia prevalence rose from 10–20% to over 90% in East Asian cities in 50 years. Globally: 24.3% (1990) → 35.8% (2023), projected 39%+ (2050) — 5 billion people. Genetic change is too slow to explain the pace. COVID-19 WORSENED myopia in children (JAMA Ophthalmol 2021).",
      "NEI 2025 (Chiang): \"Despite major research investments, the interplay between genetic and environmental influences remains unclear.\" Lisa Ostrin (Houston): red light therapy has \"shown excellent efficacy in controlling myopia progression.\" Identified risk factor: \"use of LED lamps for homework\" (BMC Ophthalmol 2020).",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "Near work + reduced time outdoors. BUT: (a) near work has been done for centuries — why the acceleration from 1990→, (b) red light therapy WORKS — why, (c) LED lamp use identified as a risk factor but the mechanism is unclear.",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "Retinal dopamine regulates axial growth. DA↓ → axial elongation↑ → myopia. EMF → DA↓ (VK53, pathway D). LED lighting: blue-light dominant → melatonin↓ → dopaminergic circadian regulation disrupted. Red light WORKS because it (a) stimulates mitochondria, (b) does NOT suppress melatonin → dopaminergic recovery. LED being identified as a risk factor is DIRECT support: the LED frequency spectrum (blue peak + IF emissions) disrupts the melatonin→DA pathway.",
    ],
    epistemic: "M|C",
    sources: "Holden et al. 2016 Ophthalmology 123:1036–1042; NEI 2025 Chiang; Wang et al. 2021 JAMA Ophthalmol 139:293–300",
  },
  {
    num: 7,
    title: "Systematic Failure of Pronatalist Policy",
    observation: [
      "EVERY developed country that has attempted to raise fertility through financial incentives has FAILED. South Korea: $200B+, TFR 1.08→0.72 (fell DURING the intervention period). Hungary: modest rise 1.23→~1.5. Singapore, Japan: no effect.",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "Incomplete. If fertility is a rational choice, sufficient financial incentives should reverse it. South Korea's $200B amounts to approximately $50,000 per family. Why isn't that enough?",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "Quadruple lock theory: T↓ × OXT↓ × DA↓ × cortisol↑ = a biological barrier that financial incentives cannot overcome. Money corrects a CONSCIOUS decision but does not correct T levels, libido, or sperm quality. The Amish (TFR 6.5) receive no pronatalist support → BIOLOGY determines outcomes, not economics.",
    ],
    epistemic: "E (empirical: every intervention is a documented failure)",
    sources: "OECD Family Database; Greksa 2002 Ann Hum Biol",
  },
  {
    num: 8,
    title: "\"Failure to Launch\"",
    observation: [
      "A growing share of young men (18–30) are not working, not in education, not in a relationship. USA: labor force participation fell 86%→81% 2000–2023. Japan: hikikomori (~1.5M). The share of sexless young men in the USA rose 28%→38% 2008–2018 (GSS).",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "Video games, pornography, economic insecurity. BUT: the hikikomori phenomenon began BEFORE social media (1990s). And: why specifically men?",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "T↓ 25% in young people (Lokeshwar 2021) → motivation↓, competitiveness↓. DA↓ → the reward system requires stronger stimuli → video games/porn = EASIER dopamine source than social competition. OXT↓ → social desire↓. Cortisol↑ → aversion to new situations. Video games and porn are CONSEQUENCES (DA↓ → compensation), not causes.",
    ],
    epistemic: "M|C",
    sources: "GSS 2018; Lokeshwar 2021 Eur Urol Focus 7:886–893",
  },
  {
    num: 9,
    title: "The Insomnia Epidemic",
    observation: [
      "Insomnia and declining sleep quality are a global trend. Short sleep (<6h) prevalence is rising especially among young people. The phenomenon also occurs in people who do NOT use screen devices in the evening.",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "Screen time, stress, caffeine. BUT: insomnia has also risen in groups where screen time is controlled.",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "Two independent melatonin suppression pathways: Pathway 1 (blue light → melanopsin → SCN → melatonin↓) is well known. Pathway 2 (EMF → CRY/VGCC → SCN oscillation → melatonin↓) operates IN THE DARK (calves in darkness, Sci.Rep. 2015). Wi-Fi and electrical grid are active throughout the night.",
      "AND: pineal gland calcification (PGC) is CUMULATIVE and IRREVERSIBLE → melatonin production capacity DECLINES with age faster than natural aging explains. \"Orange glasses are not enough\" because the EMF pathway bypasses them.",
    ],
    epistemic: "M|C",
    sources: "Walker 2017 Why We Sleep; Sci.Rep. 2015 (calves in darkness)",
  },
  {
    num: 10,
    title: "Precocious Puberty",
    observation: [
      "Age at menarche declined from approximately 17 years (1800s) to 12–13 years (2000s). The decline CONTINUES even though nutritional status is already high.",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "Nutrition explains the 1800–1960 decline. EDCs (endocrine disrupting chemicals) explain part. BUT: why does the decline CONTINUE from 1960–2020 when nutrition is already adequate?",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "Melatonin is a CAUSAL regulator of puberty: melatonin inhibits the GnRH pulse generator. Melatonin↓ → GnRH inhibition removed → puberty advances. CAUSAL evidence: pinealectomy/pineal tumor → melatonin=0 → precocious puberty (PMC10601200, clinical). EMF → melatonin↓ (two pathways) + PGC accumulates → continued advancement.",
    ],
    epistemic: "E (causal link clinically verified)",
    sources: "PMC10601200; Castellano et al. 2011 Mol Cell Endocrinol",
  },
  {
    num: 11,
    title: "Political Polarization and Institutional Decay",
    observation: [
      "Polarization has increased in all Western democracies since the 2000s. Trust in institutions is declining. The phenomenon crosses party lines and national borders.",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "Social media, income inequality. BUT: polarization began BEFORE social media (Heltzel & Laurin 2020: USA from 1994→). And: why simultaneously in all countries?",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "OXT↓ → social trust↓. Cortisol↑ → threat motivation > cooperation motivation. Amygdala↑ / hippocampus↓ (VK55): threat-sensitive processing dominates. T↓ → defensiveness. BDNF↓ → black-and-white thinking↑. Social media is a CHANNEL, not a CAUSE. The biological susceptibility to polarization increases with the EMF cascade.",
    ],
    epistemic: "M|C (analogous but mechanistically logical)",
    sources: "Heltzel & Laurin 2020 Curr Opin Behav Sci 34:112–117",
  },
  {
    num: 12,
    title: "Decline of Religiosity and the \"Meaning Crisis\"",
    observation: [
      "\"Nones\" (religiously unaffiliated) in the USA: 30% (2024) vs. 5% (1972). Therapy demand at record levels. \"Meaning crisis\" (Vervaeke). Religiosity correlates with TFR everywhere.",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "Secularization (education, science). BUT: the Amish are less educated AND religious AND fertile. EMF exposure differentiates better than education.",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "Religious experience is neurobiological: 5-HT → transcendence, DA → ritual reward, OXT → belonging. EMF → all three↓ → the neurobiological capacity for spiritual experience weakens. The \"meaning crisis\" is a biological phenomenon, not a philosophical one.",
    ],
    epistemic: "L* (analogous, speculative)",
    sources: "Vervaeke 2019; GSS trend data",
  },
  {
    num: 13,
    title: "The Loneliness Epidemic",
    observation: [
      "The US Surgeon General declared loneliness an epidemic in 2023. 58% of US adults report loneliness (Cigna 2020). 15% of men report ZERO close friends (American Survey Center 2021) — a fivefold increase since 1990. Mortality risk: +26% (Holt-Lunstad 2015 meta, N=300,000+), equivalent to smoking 15 cigarettes per day. The trend began BEFORE social media and COVID only accelerated an already-ongoing process.",
    ],
    conventionalLabel: "Conventional explanation",
    conventional: [
      "Urbanization, social media, lifestyle changes. BUT: (a) the phenomenon began before social media (1990→), (b) the conventional literature ITSELF identifies the biological mechanism but does NOT ask why it has changed at the population level.",
      "The conventional literature's OWN biological model — Frontiers Psychiatry 2023: \"Social connection may dampen HPA activation and impart anti-stress effects through the release of oxytocin. Oxytocin has a well-established role in suppressing HPA activity by inhibiting the release of corticotropin-releasing hormone from hypothalamic neurons.\" IJMS 2026: social isolation → conserved transcriptional response → proinflammatory genes↑ + antiviral gene expression↓.",
    ],
    bermLabel: "BERM explanation",
    berm: [
      "The conventional literature identifies the chain: OXT↓ → HPA↑ → cortisol↑ → inflammation → metabolic syndrome. The conventional literature does NOT ask: WHY has OXT declined at the POPULATION level? BERM answers: EMF → VGCC → Ca²⁺ → OXT secretion disruption (VK29) → population-level OXT↓ → loneliness↑ → cortisol↑ → disease.",
      "This makes the loneliness epidemic BERM's strongest civilization-level argument because the mechanism is IDENTIFIED BY CONVENTIONAL SCIENCE ITSELF — only the upstream cause (EMF) is missing from their model.",
      "AND: a positive feedback loop: OXT↓ → loneliness → LESS social contact → LESS OXT release → MORE loneliness → MORE cortisol↑ → MORE inflammation → etc. EMF initiates the cycle but the cycle SUSTAINS ITSELF.",
    ],
    epistemic: "M|C (biological mechanism identified by conventional literature, BERM adds the upstream cause)",
    sources: "US Surgeon General 2023; Holt-Lunstad 2015 meta; Frontiers Psychiatry 2023; IJMS 2026 27:84; Cigna 2020; American Survey Center 2021",
  },
];

const PHENOMENA_FI: Phenomenon[] = [
  {
    num: 1,
    title: "Klimentidisin paradoksi: 8 lajia lihoo",
    observation: [
      "Klimentidis ym. 2011 (Proc. R. Soc. B): 24 populaatiota 8 lajista — primaatit, jyrsijät, koirat, kissat — joiden painon aikakehitys tutkittiin vuosikymmenten yli. JOKAISEN populaation painotrendi oli positiivinen (p = 1,2 × 10⁻⁷).",
      "Replikaatiostatus: Tutkimusta EI ole replikoitu (179 sitaatiota, 0 replikaatiota, LessWrong 2023). NTP-kontrollirottien painonnousu selittyy OSITTAIN kontrollidieetin koostumuksen muutoksilla ajan myötä. Tuotantoeläinten ja lemmikkien lihominen selittyy osittain ruokinnan muutoksilla. MUTTA: tutkimuskolonioiden primaattien (makakot, simpanssit, marmosetit) data kontrolloiduissa olosuhteissa ja villirottien data pysyvät selittämättöminä.",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "Ei kattavaa selitystä. Ehdotetut kandidaatit (obesogeenit, mikrobiomin muutokset) eivät selitä tutkimusprimaattien tai villirottien lihomista.",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "EMF → VGCC → Ca²⁺ → haiman β-solujen insuliinierityksen häiriö (VK46) + melatoniini↓ → sirkadiaanisen metabolian häiriö. Sama ympäristömuutos (EMF-taustan kasvu tutkimuslaitoksissa ja urbaanissa ympäristössä) vaikuttaa kaikkiin lajeihin samanaikaisesti.",
    ],
    epistemic: "L* (primaatit + villirotat M|C, kokonaisuus vaatii replikaatiota)",
    sources: "Klimentidis ym. 2011 Proc R Soc B 278:1626–1632; LessWrong replikaatioanalyysi 2023; Brown ym. 2016 Obes Res Clin Pract 10:243–255",
  },
  {
    num: 2,
    title: "Negatiivinen Flynn-efekti: ÄO laskee kehittyneissä maissa",
    observation: [
      "Bratsberg & Rogeberg 2018 (PNAS, N=730 000): ÄO nousi 1962–1975 syntyneiden kohorteissa ja LASKI 1975–1991 syntyneiden kohorteissa Norjassa. Sama lasku raportoitu Tanskassa, Suomessa, Ranskassa, Hollannissa, Britanniassa ja Australiassa. Lasku on 5–7 pistettä per sukupolvi 1990-luvun puolivälistä lähtien.",
      "USA-data (Dworak ym. 2023, Intelligence, N=394 378): kolme kognitiivista aluetta laskivat 2006–2018 (verbaalinen päättely, matriisipäättely, kirjain-numerosarjat), mutta 3D-spatiaalinen rotaatio NOUSI. Tämä erottelu on informatiivinen: laskevat alueet ovat prefrontaalikorteksin abstraktia päättelyä, nouseva alue on parieto-okkipitaalista spatiaalista prosessointia.",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "Bratsberg & Rogeberg osoittivat SISARVERTAILULLA (within-family) että lasku on ympäristöstä johtuva, EI geneettinen. Mikä ympäristömuutos? Ei konsensusta.",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "EMF → BDNF↓ (VK23: Cav1.2 → CREB → BDNF-transkriptio↓) + melatoniini↓ → uni↓ → kognitiivinen konsolidaatio↓. BDNF on neuroplastisuuden avainmolekyyli, ja sen lasku vaikuttaa erityisesti prefrontaalikorteksiin (abstrakti päättely) mutta VÄHEMMÄN parieto-okkipitaalisiin alueisiin (spatiaalinen).",
      "Tämä selittää Dworak 2023:n erottelun: abstrakti päättely↓ mutta spatiaalinen↑ (videopelit kompensoivat spatiaalista). Konventionaalinen \"näyttöaika\"-selitys ennustaisi KAIKEN kognitiivisen toiminnan laskun — erottelua ei pitäisi olla.",
      "Ajoitus: Lasku alkaa 1990-luvulla = 2G-verkot, PC:t, loisteputket yleistyvät. Sisarvertailu sulkee pois genetiikan → YMPÄRISTÖMUUTOS → BERM identifioi sen.",
    ],
    epistemic: "M|C (vahva epidemiologinen + mekanistinen logiikka)",
    sources: "Bratsberg & Rogeberg 2018 PNAS 115:6674–6678; Dworak ym. 2023 Intelligence 101:101793; Flynn & Shayer 2018",
  },
  {
    num: 3,
    title: "\"Deaths of Despair\": epätoivon kuolemat",
    observation: [
      "Case & Deaton 2015/2020: kuolleisuus yliannostuksiin, alkoholimaksatautiin ja itsemurhiin on noussut 56–387 % ikäkohorteittain viimeisen 20 vuoden aikana USA:ssa. Erityisesti keski-ikäiset miehet ilman korkeakoulututkintoa. Elinajan­odote LASKI — ensimmäistä kertaa rauhan aikana teollistuneessa maassa.",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "Sosioekonominen: deindustrialisaatio, palkkojen stagnaatio, opioidien ylimäärääminen. Case & Deaton kuvaavat \"cumulative disadvantage\" -käsitteellä. MUTTA: (a) Euroopassa samat sosioekonomiset tekijät vaikuttavat ILMAN vastaavaa kuolleisuusnousua, (b) miksi NIMENOMAAN keski-ikäiset miehet, (c) PNAS 2024 reevaluointi osoittaa, ettei \"despair\" per se selitä rodullista heterogeenisyyttä.",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "Biologisen kaskadin kasautuma: T↓ 1,2 %/v: keski-ikäisillä miehillä T jo luontaisesti matalampi → EMF-kaskadi vie ALLE kriittisen kynnyksen → DA↓ → anhedonia → kompensaatio päihteillä (opioidit, alkoholi) → kort↑ → krooninen stressi → kipuherkkyys↑ (VK30: α2δ-1↑) → mel↓ → uni↓ → masennus → itsetuhoinen käyttäytyminen → OXT↓ → sosiaalinen eristäytyminen → \"despair\".",
      "Miksi miehet: T-lasku vaikuttaa miehiin enemmän koska absoluuttinen T-taso on korkeampi → suurempi absoluuttinen lasku. Miksi USA > Eurooppa: USA:n EMF-infrastruktuuri on VANHEMPI (sähköistyminen 1890→) ja INTENSIIVISEMPI.",
    ],
    epistemic: "M|C",
    sources: "Case & Deaton 2015 PNAS 112:15078–15083; Case & Deaton 2020 Deaths of Despair (Princeton UP); PNAS 2024 reevaluointi",
  },
  {
    num: 4,
    title: "Naisen onnellisuusparadoksi",
    observation: [
      "Stevenson & Wolfers 2009 (AEJ:EP): naisten subjektiivinen onnellisuus on laskenut sekä absoluuttisesti että suhteessa miehiin 1970-luvulta lähtien huolimatta naisten objektiivisen aseman merkittävästä paranemisesta. Blanchflower & Bryson 2024 (J Pop Econ): paradoksi on \"erittäin robusti\" erityisesti negatiivisen affektin osalta. Science Advances 2026: kaksi paradoksia tunnistettu — naisten onnellisuus on korkeampi mutta heidän negatiivinen affektinsa on MYÖS korkeampi.",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "Epäselvä. Ehdotetut: rooli-ylikuorma, kasvaneet odotukset, mittausvirheet. Mikään ei selitä AJALLISTA trendia (1970→) tai UNIVERSAALISUUTTA (sama kaikissa maissa).",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "Naisten hormonaalinen järjestelmä on EMF:lle herkempi useissa kohdissa: estrogeeni moduloi VGCC-ekspressiota (estrogeeni → Cav1.2↑); kiimankierto vaatii tarkkaa Ca²⁺-oskillaatiota; OXT-järjestelmä on naisilla KESKEISEMPI sosiaaliselle hyvinvoinnille; naiset ovat herkempiä sirkadiaaniselle häiriölle (kausiluonteinen masennustaipumus 2–3× yleisempää naisilla).",
    ],
    epistemic: "M|C",
    sources: "Stevenson & Wolfers 2009 AEJ:EP 1:190–225; Blanchflower & Bryson 2024 J Pop Econ 37:16; Science Advances 2026",
  },
  {
    num: 5,
    title: "Autoimmuunisairauksien epidemia",
    observation: [
      "Globaali ikävakioitu prevalenssi lähes KAKSINKERTAISTUI 1990–2021 (GBD 2021). Keliakia: 5-kertainen nousu 30 vuodessa USA:ssa. MS: +30 % globaalisti 2013–2022. IBD: +46 % 2006–2021. T1D lähes kaksinkertaistui 40 vuodessa. Erityisesti LASTEN T1D ja IBD nousevat nopeimmin.",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "\"Hygieeninen hypoteesi\" selittää osan. MUTTA: hygieniatasot eivät ole muuttuneet merkittävästi 1990→2021, ja lapsilla kasvu on NOPEINTA — hygieniahypoteesi ei selitä kiihtymistä.",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "EMF → VGCC → Ca²⁺ → NADPH-oksidaasi → ROS → NF-κB → proinflammatoriset sytokiinit. LISÄKSI: mel↓ → immunomodulaatio↓ + D-vit↓ → T-reg-toiminta↓. Kolme itsenäistä EMF-reittiä samaan lopputulokseen. Lasten erityinen haavoittuvuus: prenataaliset kehitysikkunat (VK5a).",
    ],
    epistemic: "M|C",
    sources: "GBD 2021; NHC 2025; NCBI Bookshelf NBK605881 (2022)",
  },
  {
    num: 6,
    title: "Myopiapandemia",
    observation: [
      "Myopian prevalenssi nousi 10–20 %:sta yli 90 %:iin Itä-Aasian kaupungeissa 50 vuodessa. Globaalisti: 24,3 % (1990) → 35,8 % (2023), ennuste 39 %+ (2050) eli 5 miljardia. COVID-19 PAHENSI myopiaa lapsilla (JAMA Ophthalmol 2021).",
      "NEI 2025 (Chiang): \"Despite major research investments, the interplay between genetic and environmental influences remains unclear.\" Riskitekijäksi tunnistettu: \"use of LED lamps for homework\" (BMC Ophthalmol 2020).",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "Lähityö + ulkona oloajan väheneminen. MUTTA: (a) lähityötä on tehty vuosisatoja — miksi kiihtyminen 1990→, (b) punaisen valon terapia TOIMII — miksi, (c) LED-lamppujen käyttö tunnistettu riskitekijäksi mutta mekanismi epäselvä.",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "Retinaalinen dopamiini säätelee aksiaalikasvu. DA↓ → aksiaali-elongaatio↑ → myopia. EMF → DA↓ (VK53, polku D). LED-valaistus: sinivalo-dominantti → mel↓ → DA-sirkadiaaninen säätely häiriintyy. Punainen valo TOIMII koska se (a) stimuloi mitokondrioita, (b) EI suppressoi melatoniinia → dopaminerginen palautuminen.",
    ],
    epistemic: "M|C",
    sources: "Holden ym. 2016 Ophthalmology 123:1036–1042; NEI 2025 Chiang; Wang ym. 2021 JAMA Ophthalmol 139:293–300",
  },
  {
    num: 7,
    title: "Pronatalistisen politiikan systemaattinen epäonnistuminen",
    observation: [
      "JOKAINEN kehittynyt maa joka on yrittänyt nostaa syntyvyyttä taloudellisin keinoin on EPÄONNISTUNUT. Korea: 200 mrd $+, TFR 1,08→0,72 (laski INTERVENTION aikana). Unkari: vaatimaton nousu 1,23→~1,5. Singapore, Japani: ei vaikutusta.",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "Puutteellinen. Jos hedelmällisyys on rationaalinen valinta, riittävät taloudelliset kannustimet pitäisi kääntää se. Korean 200 mrd $ vastaa ~50 000 $/perhe. Miksi se ei riitä?",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "Neloislukkoteoria: T↓ × OXT↓ × DA↓ × kort↑ = biologinen este jota taloudelliset kannustimet eivät ylitä. Raha korjaa TIETOISEN päätöksen mutta ei korjaa T-tasoa, libidoa tai siittiölaatua. Amish (TFR 6,5) eivät saa pronatalistista tukea → BIOLOGIA ratkaisee, ei talous.",
    ],
    epistemic: "E (empiirinen: jokainen interventio on dokumentoitu epäonnistuminen)",
    sources: "OECD Family Database; Greksa 2002 Ann Hum Biol",
  },
  {
    num: 8,
    title: "\"Failure to launch\" -ilmiö",
    observation: [
      "Kasvava osuus nuorista miehistä (18–30v) ei työssä, ei koulutuksessa, ei parisuhteessa. USA: työvoimaosallistuminen laski 86 %→81 % 2000–2023. Japani: hikikomori (~1,5M). Seksittömien nuorten miesten osuus USA:ssa nousi 28 %→38 % 2008–2018 (GSS).",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "Videopelit, pornografia, taloudellinen epävarmuus. MUTTA: hikikomori-ilmiö alkoi ENNEN sosiaalista mediaa (1990-luku). Ja: miksi nimenomaan miehet?",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "T↓ 25 % nuorilla (Lokeshwar 2021) → motivaatio↓, kilpailuhalu↓. DA↓ → palkitsemismekanismi vaatii vahvempia ärsykkeitä → videopelit/porno = HELPOMPI dopamiinilataus kuin sosiaalinen kilpailu. OXT↓ → sosiaalinen halu↓. Kort↑ → aversio uusiin tilanteisiin. Videopelit ja porno ovat SEURAUKSIA (DA↓ → kompensaatio), eivät syitä.",
    ],
    epistemic: "M|C",
    sources: "GSS 2018; Lokeshwar 2021 Eur Urol Focus 7:886–893",
  },
  {
    num: 9,
    title: "Unettomuusepidemia",
    observation: [
      "Unettomuus ja unenlaadun heikkeneminen ovat globaali trendi. Lyhyen unen (<6h) prevalenssi nousee erityisesti nuorilla. Ilmiö esiintyy MYÖS ihmisillä jotka eivät käytä näyttölaitteita illalla.",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "Näyttöaika, stressi, kofeiini. MUTTA: unettomuus on noussut myös ryhmissä joissa näyttöaika on kontrolloitu.",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "Kaksi itsenäistä melatoniinisuppressioreittiä: Reitti 1 (sininen valo → melanopsiini → SCN → mel↓) on tunnettu. Reitti 2 (EMF → CRY/VGCC → SCN-oskillaatio → mel↓) toimii PIMEÄSSÄ (vasikat pimeässä, Sci.Rep. 2015). Wi-Fi ja sähköverkko ovat aktiivisia läpi yön.",
      "JA: PGC (pinealiskalsifikaatio) on KUMULATIIVINEN ja IRREVERSIIBELI → melatoniinituotantokapasiteetti LASKEE iän myötä nopeammin kuin luonnollinen ikääntyminen selittää. \"Oranssit lasit eivät riitä\" koska EMF-reitti ohittaa ne.",
    ],
    epistemic: "M|C",
    sources: "Walker 2017 Why We Sleep; Sci.Rep. 2015 (vasikat pimeässä)",
  },
  {
    num: 10,
    title: "Puberteetin aikaistuminen",
    observation: [
      "Menarken ikä laskenut noin 17v (1800-luku) → 12–13v (2000-luku). Lasku JATKUU edelleen vaikka ravitsemustaso on jo korkea.",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "Ravitsemus selittää 1800–1960 laskun. EDC:t (endokriiniset häiriökemikaalit) selittävät osan. MUTTA: miksi lasku JATKUU 1960→2020 kun ravitsemus on jo korkea?",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "Melatoniini on puberteetin KAUSAALINEN säätelijä: mel inhiboi GnRH-pulsaattoria. Mel↓ → GnRH-esto poistuu → puberteetti aikaistuu. KAUSAALINEN todiste: pinealektomia/pineaalituumori → mel=0 → ennenaikainen puberteetti (PMC10601200, kliininen). EMF → mel↓ (kaksi reittiä) + PGC kumuloituu → jatkuva aikaistuminen.",
    ],
    epistemic: "E (kausaalinen linkki kliinisesti verifioitu)",
    sources: "PMC10601200; Castellano ym. 2011 Mol Cell Endocrinol",
  },
  {
    num: 11,
    title: "Poliittinen polarisoituminen ja institutionaalinen rappio",
    observation: [
      "Polarisoituminen kasvanut kaikissa läntisissä demokratioissa 2000-luvulta lähtien. Luottamus instituutioihin laskee. Ilmiö ylittää puolueet ja maat.",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "Sosiaalinen media, tuloerot. MUTTA: polarisaatio alkoi ENNEN somea (Heltzel & Laurin 2020: USA 1994→). Ja: miksi samanaikaisesti kaikissa maissa?",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "OXT↓ → sosiaalinen luottamus↓. Kort↑ → uhkamotivaatio > yhteistyömotivaatio. Amygdala↑ / hippokampus↓ (VK55): uhkaherkkä prosessointi hallitsee. T↓ → defensiivisyys. BDNF↓ → mustavalkoinen ajattelu↑. Sosiaalinen media on KANAVA, ei SYY. Biologinen alttius polarisoitumiselle kasvaa EMF-kaskadin myötä.",
    ],
    epistemic: "M|C (analoginen mutta mekanistisesti looginen)",
    sources: "Heltzel & Laurin 2020 Curr Opin Behav Sci 34:112–117",
  },
  {
    num: 12,
    title: "Uskonnollisuuden lasku ja \"merkityskriisi\"",
    observation: [
      "\"Nones\" (uskonnottomien osuus) USA:ssa 30 % (2024) vs. 5 % (1972). Terapian kysyntä ennätyskorkea. \"Meaning crisis\" (Vervaeke). Uskonnollisuus korreloi TFR:n kanssa kaikkialla.",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "Sekularisaatio (koulutus, tiede). MUTTA: Amish ovat vähemmän koulutettuja JA uskonnollisia JA hedelmällisiä. EMF-altistus erottelee paremmin kuin koulutus.",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "Uskonnollinen kokemus on neurobiologinen: 5-HT → transsendenssi, DA → rituaalinen palkitseminen, OXT → yhteenkuuluvuus. EMF → kaikki kolme↓ → hengellisen kokemuksen neurobiologinen kapasiteetti heikkenee. \"Meaning crisis\" on biologinen ilmiö, ei filosofinen.",
    ],
    epistemic: "L* (analoginen, spekulatiivinen)",
    sources: "Vervaeke 2019; GSS trendidata",
  },
  {
    num: 13,
    title: "Yksinäisyysepidemia",
    observation: [
      "US Surgeon General julisti yksíinäisyyden epidemiaksi 2023. 58 % USA:n aikuisista raportoi yksíinäisyyttä (Cigna 2020). 15 % miehistä raportoi NOLLA läheistä ystävää (American Survey Center 2021) — viisinkertainen nousu vuodesta 1990. Kuolleisuusriski: +26 % (Holt-Lunstad 2015 meta, N=300 000+), vastaa 15 savukkeen polttamista päivässä. Trendi alkoi ENNEN sosiaalista mediaa ja COVID vain kiihdytti jo käynnissä olevaa prosessia.",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    conventional: [
      "Urbanisaatio, sosiaalinen media, elämäntapamuutokset. MUTTA: (a) ilmiö alkoi ennen somea (1990→), (b) konventionaalinen kirjallisuus ITSE tunnistaa biologisen mekanismin mutta EI kysy miksi se on muuttunut populaatiotasolla.",
      "Konventionaalisen kirjallisuuden OMA biologinen malli — Frontiers Psychiatry 2023: \"Social connection may dampen HPA activation and impart anti-stress effects through the release of oxytocin.\" IJMS 2026: sosiaalinen eristys → konservoitu transkriptionaalinen vastaus → proinflammatoriset geenit↑ + antiviraalinen geeniekspressio↓.",
    ],
    bermLabel: "BERM:n selitys",
    berm: [
      "Konventionaalinen kirjallisuus tunnistaa ketjun: OXT↓ → HPA↑ → kort↑ → tulehdus → metabolinen oireyhtymä. Konventionaalinen kirjallisuus EI kysy: MIKSI OXT on laskenut POPULAATIOTASOLLA? BERM vastaa: EMF → VGCC → Ca²⁺ → OXT-eritys­häiriö (VK29) → populaatiotason OXT↓ → yksinäisyys↑ → kort↑ → sairaudet.",
      "Tämä tekee yksinäisyysepidemiasta BERM:n vahvimman sivilisaatiotason argumentin koska mekanismi on KONVENTIONAALISEN TIETEEN ITSENSÄ tunnistama — vain upstream-syy (EMF) puuttuu heidän mallistaan.",
      "JA: positiivinen takaisinkytkentäsilmukka: OXT↓ → yksinäisyys → VÄHEMMÄN sosiaalista kontaktia → VÄHEMMÄN OXT-vapautumista → LISÄÄ yksíinäisyyttä → LISÄÄ kort↑ → LISÄÄ tulehdusta → jne. EMF käynnistää kierteen mutta kierre YLLÄPITÄÄ ITSEÄÄN.",
    ],
    epistemic: "M|C (biologinen mekanismi konventionaalisen kirjallisuuden tunnistama, BERM lisää upstream-syyn)",
    sources: "US Surgeon General 2023; Holt-Lunstad 2015 meta; Frontiers Psychiatry 2023; IJMS 2026 27:84; Cigna 2020; American Survey Center 2021",
  },
];

const TABLE_ROWS_EN: [string, string, string, string, string][] = [
  ["1  Klimentidis paradox", "No comprehensive", "Ca²⁺→insulin+mel↓", "L*", "Cross-species"],
  ["2  IQ decline", "\"Environmental change\"", "BDNF↓+mel↓", "M|C", "Timing + dissociation"],
  ["3  Deaths of despair", "Socioeconomic", "T↓+DA↓+cort↑", "M|C", "Biological mechanism"],
  ["4  Female happiness paradox", "Unclear", "VGCC sensitivity+OXT↓", "M|C", "Universality"],
  ["5  Autoimmune epidemic", "Hygiene hypothesis", "Ca²⁺→NF-κB→ROS", "M|C", "Acceleration"],
  ["6  Myopia pandemic", "Near work+outdoors", "DA↓+LED→mel↓", "M|C", "LED risk factor"],
  ["7  Pronatalist failure", "No explanation", "Quadruple lock", "E", "Amish contrast"],
  ["8  Failure to launch", "Video games/porn", "T↓×OXT↓×DA↓", "M|C", "Biological substrate"],
  ["9  Insomnia epidemic", "Screen time", "EMF pathway ≠ light", "M|C", "Works in darkness"],
  ["10 Precocious puberty", "Nutrition (1800–60)", "Mel↓→GnRH↑", "E", "Pinealectomy evidence"],
  ["11 Political polarization", "Social media", "OXT↓+amygdala↑", "M|C", "Began before social media"],
  ["12 Decline of religiosity", "Secularization", "5-HT↓+OXT↓+DA↓", "L*", "Amish contrast"],
  ["13 Loneliness epidemic", "Social media", "OXT↓→HPA↑→cort↑", "M|C", "Conv. identifies mechanism"],
];

const TABLE_ROWS_FI: [string, string, string, string, string][] = [
  ["1  Klimentidisin paradoksi", "Ei kattavaa", "Ca²⁺→insuliini+mel↓", "L*", "Lajien välinen"],
  ["2  ÄO:n lasku", "\"Ympäristömuutos\"", "BDNF↓+mel↓", "M|C", "Ajoitus + erottelu"],
  ["3  Epätoivon kuolemat", "Sosioekonominen", "T↓+DA↓+kort↑", "M|C", "Biologinen mekanismi"],
  ["4  Naisen onn.paradoksi", "Epäselvä", "VGCC-herkkyys+OXT↓", "M|C", "Universaalisuus"],
  ["5  Autoimmuuni-epidemia", "Hygieniahypoteesi", "Ca²⁺→NF-κB→ROS", "M|C", "Kiihtyminen"],
  ["6  Myopiapandemia", "Lähityö+ulkona", "DA↓+LED→mel↓", "M|C", "LED riskitekijä"],
  ["7  Pronatalismin epäonn.", "Ei selitystä", "Neloislukkoteoria", "E", "Amish-kontrasti"],
  ["8  Failure to launch", "Videopelit/porno", "T↓×OXT↓×DA↓", "M|C", "Biologinen substraatti"],
  ["9  Unettomuusepidemia", "Näyttöaika", "EMF-reitti ≠ valo", "M|C", "Toimii pimeässä"],
  ["10 Puberteetin aikaistum.", "Ravitsemus (1800–60)", "Mel↓→GnRH↑", "E", "Pinealektomia-todiste"],
  ["11 Poliittinen polarisoit.", "Sosiaalinen media", "OXT↓+amygdala↑", "M|C", "Alkoi ennen somea"],
  ["12 Uskonnollisuuden lasku", "Sekularisaatio", "5-HT↓+OXT↓+DA↓", "L*", "Amish-kontrasti"],
  ["13 Yksinäisyysepidemia", "Sosiaalinen media", "OXT↓→HPA↑→kort↑", "M|C", "Konvent. tunnistaa mek."],
];

const REFS = [
  "Klimentidis et al. 2011, Proc R Soc B 278:1626–1632",
  "LessWrong replication analysis 2023",
  "Brown et al. 2016, Obes Res Clin Pract 10:243–255",
  "Bratsberg & Rogeberg 2018, PNAS 115:6674–6678",
  "Dworak et al. 2023, Intelligence 101:101793",
  "Flynn & Shayer 2018",
  "Case & Deaton 2015, PNAS 112:15078–15083",
  "Case & Deaton 2020, Deaths of Despair (Princeton UP)",
  "PNAS 2024, doi:10.1073/pnas.2307656121",
  "Stevenson & Wolfers 2009, AEJ:EP 1:190–225",
  "Blanchflower & Bryson 2024, J Pop Econ 37:16",
  "Science Advances 2026, doi:10.1126/sciadv.adt1646",
  "GBD 2021, Lancet (autoimmune)",
  "NHC 2025, nationalhealthcouncil.org",
  "NCBI Bookshelf NBK605881 (2022)",
  "Holden et al. 2016, Ophthalmology 123:1036–1042",
  "Wang et al. 2021, JAMA Ophthalmol 139:293–300",
  "NEI 2025, Chiang report",
  "BMC Ophthalmol 2020, LED risk factor",
  "OECD Family Database",
  "Greksa 2002, Ann Hum Biol (Amish TFR)",
  "GSS 2018",
  "Lokeshwar et al. 2021, Eur Urol Focus 7:886–893",
  "Walker 2017, Why We Sleep",
  "Sci.Rep. 2015 (calves in darkness)",
  "PMC10601200 (pinealectomy → puberty)",
  "Castellano et al. 2011, Mol Cell Endocrinol",
  "Heltzel & Laurin 2020, Curr Opin Behav Sci 34:112–117",
  "Vervaeke 2019",
  "US Surgeon General 2023",
  "Holt-Lunstad 2015 meta, PLOS Med N=300K+",
  "Frontiers Psychiatry 2023, OXT→HPA→loneliness",
  "IJMS 2026 27:84, loneliness neuroendocrinology",
  "Cigna 2020, loneliness survey",
  "American Survey Center 2021, male friendships",
];

const COPY: Record<string, Copy> = {
  en: {
    intro: [
      "In the modern world, a set of simultaneous trends are underway that conventional explanatory models — economics, sociology, psychology, epidemiology — treat as SEPARATE phenomena, each with its own explanation. BERM's civilization model proposes that these are different manifestations of the SAME biological cascade: EMF → VGCC/CRY → Ca²⁺ → hormones/neurotransmitters → behavior/disease.",
      "Below are 13 phenomena where the conventional explanation is either incomplete, contradictory, or unable to explain cross-species synchrony.",
    ],
    conventionalLabel: "Conventional explanation",
    bermLabel: "BERM explanation",
    epistemicLabel: "Epistemic level",
    sourcesLabel: "Sources",
    phenomena: PHENOMENA_EN,
    tableTitle: "Summary Table",
    tableHeaders: ["Phenomenon", "Conventional", "BERM", "Level", "BERM advantage"],
    tableRows: TABLE_ROWS_EN,
    tableSummary: [
      "CONVENTIONAL: 13 separate explanations for 13 separate phenomena.",
      "BERM: 1 mechanism (EMF → Ca²⁺ → hormone cascade) → 13 manifestations = PARSIMONY: BERM is simpler AND more explanatorily powerful.",
      "STRONGEST (E-level): pronatalist failure (#7), precocious puberty (#10).",
      "STRONG (M|C): IQ (#2), Deaths of Despair (#3), autoimmune (#5), myopia (#6), loneliness (#13), female happiness (#4), insomnia (#9), failure to launch (#8), polarization (#11).",
      "SPECULATIVE (L*): Klimentidis (#1, requires replication), religiosity (#12).",
    ],
    refsTitle: "References",
    refs: REFS,
  },
  fi: {
    intro: [
      "Modernissa maailmassa on käynnissä joukko samanaikaisia trendejä jotka konventionaaliset selitysmallit — taloustiede, sosiologia, psykologia, epidemiologia — käsittelevät ERILLISINÄ ilmiöinä, jokaiselle omine selityksineen. BERM:n sivilisaatiomalli esittää, että nämä ovat SAMAN biologisen kaskadin eri ilmentymiä: EMF → VGCC/CRY → Ca²⁺ → hormonit/neurotransmitterit → käyttäytyminen/sairaudet.",
      "Alla 13 ilmiötä joissa konventionaalinen selitys on joko epätäydellinen, ristiriitainen tai kykenemätön selitämään lajien välistä synkroniaa.",
    ],
    conventionalLabel: "Konventionaalinen selitys",
    bermLabel: "BERM:n selitys",
    epistemicLabel: "Episteeminen taso",
    sourcesLabel: "Lähteet",
    phenomena: PHENOMENA_FI,
    tableTitle: "Kokoava taulukko",
    tableHeaders: ["Ilmiö", "Konvent.", "BERM", "Taso", "BERM-etu"],
    tableRows: TABLE_ROWS_FI,
    tableSummary: [
      "KONVENTIONAALINEN: 13 erillistä selitystä 13 erilliselle ilmiölle.",
      "BERM: 1 mekanismi (EMF → Ca²⁺ → hormonikaskadi) → 13 ilmentymää = PARSIMONIA: BERM on yksinkertaisempi JA selitysvoimaisempi.",
      "VAHVIMMAT (E-taso): pronatalismin epäonn. (#7), puberteetti (#10).",
      "VAHVAT (M|C): ÄO (#2), epätoivon kuolemat (#3), autoimmuuni (#5), myopia (#6), yksinäisyys (#13), naisen onn. (#4), unettomuus (#9), failure to launch (#8), polarisaatio (#11).",
      "SPEKULATIIVISET (L*): Klimentidis (#1, vaatii replikaatiota), uskonnollisuus (#12).",
    ],
    refsTitle: "Viitteet",
    refs: REFS,
  },
};

function EpistemicBadge({ level }: { level: string }) {
  const isE = level.startsWith("E");
  const isL = level.startsWith("L");
  const color = isE
    ? "border-status-confirmed/30 bg-status-confirmed/5 text-status-confirmed"
    : isL
    ? "border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400"
    : "border-accent/30 bg-accent/5 text-accent";
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-mono-num font-medium ${color}`}>
      {level}
    </span>
  );
}

export function ThirteenPhenomenaContent({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);

  return (
    <div className="editorial-rail">
      {/* Introduction */}
      <section className="mb-14">
        {d.intro.map((p, i) => (
          <p key={i} className="text-[0.9375rem] leading-relaxed text-foreground-muted mb-4">
            <InlineReferenceText text={p} locale={locale} />
          </p>
        ))}
      </section>

      {/* 13 phenomena */}
      {d.phenomena.map((ph) => (
        <section
          key={ph.num}
          className="mb-16 border-t editorial-rule pt-6"
        >
          <h2 className="editorial-section-heading mb-6">
            <span className="font-mono-num text-xs text-accent mr-2">{String(ph.num).padStart(2, "0")}</span>
            {ph.title}
          </h2>

          {/* Observation */}
          <div className="mb-6">
            {ph.observation.map((p, i) => (
              <p key={i} className="text-[0.9375rem] leading-relaxed text-foreground mb-4">
                <InlineReferenceText text={p} locale={locale} />
              </p>
            ))}
          </div>

          {/* Conventional explanation */}
          <div className="mb-6 rounded-lg border border-card-border bg-card-bg p-4">
            <h3 className="text-xs uppercase tracking-wider text-foreground-muted mb-2 font-semibold">
              {ph.conventionalLabel}
            </h3>
            {ph.conventional.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground-muted mb-2 last:mb-0">
                <InlineReferenceText text={p} locale={locale} />
              </p>
            ))}
          </div>

          {/* BERM explanation */}
          <div className="mb-6 rounded-lg border border-accent/20 bg-accent/5 p-4">
            <h3 className="text-xs uppercase tracking-wider text-accent mb-2 font-semibold">
              {ph.bermLabel}
            </h3>
            {ph.berm.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground mb-2 last:mb-0">
                <InlineReferenceText text={p} locale={locale} />
              </p>
            ))}
          </div>

          {/* Epistemic level + sources */}
          <div className="flex flex-wrap items-start gap-4 text-sm">
            <div>
              <span className="text-xs text-foreground-muted uppercase tracking-wider mr-2">{d.epistemicLabel}:</span>
              <EpistemicBadge level={ph.epistemic} />
            </div>
          </div>
          <p className="mt-3 text-xs text-foreground-muted/60 leading-relaxed">
            <span className="font-semibold">{d.sourcesLabel}:</span> {ph.sources}
          </p>
        </section>
      ))}

      {/* Summary table */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.tableTitle}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr>
                {d.tableHeaders.map((h, i) => (
                  <th
                    key={i}
                    className="text-left text-xs text-foreground-muted uppercase tracking-wider pb-3 pr-3 border-b border-card-border"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.tableRows.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`py-2.5 pr-3 ${j === 0 ? "font-medium text-foreground" : "text-foreground-muted"} ${j === 3 ? "font-mono-num text-xs" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-lg border border-accent/20 bg-accent/5 p-4">
          {d.tableSummary.map((line, i) => (
            <p key={i} className={`text-sm leading-relaxed ${i === 0 ? "text-foreground-muted" : i === 1 ? "text-foreground font-medium mt-2" : "text-foreground-muted mt-2"}`}>
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* References */}
      <section className="border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">{d.refsTitle}</h2>
        <ol className="list-decimal list-inside space-y-1">
          {d.refs.map((ref, i) => (
            <li key={i} className="text-xs text-foreground-muted/70 leading-relaxed">
              {ref}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
