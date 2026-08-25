export interface PopulationHealth {
  tfr: string | null;
  cvd: string;
  dementia: string;
  obesity: string;
  t2d: string;
  cancer: string;
  depression: string;
}

export interface LowEMFPopulation {
  id: string;
  nameEn: string;
  nameFi: string;
  location: string;
  lat: number;
  lon: number;
  emfLevel: "none" | "minimal" | "ambient";
  emfLabelEn: string;
  emfLabelFi: string;
  descriptionEn: string;
  descriptionFi: string;
  keyFindingEn: string;
  keyFindingFi: string;
  testosteroneProfile?: {
    baselineEn: string;
    baselineFi: string;
    ageDeclineEn: string;
    ageDeclineFi: string;
    reactivityEn: string;
    reactivityFi: string;
    implicationEn: string;
    implicationFi: string;
    source: string;
  };
  health: PopulationHealth;
  referenceIds: string[];
}

export interface ModernComparison {
  id: string;
  nameEn: string;
  nameFi: string;
  emfLabelEn: string;
  emfLabelFi: string;
  health: PopulationHealth;
}

export const LOW_EMF_POPULATIONS: LowEMFPopulation[] = [
  {
    id: "tsimane",
    nameEn: "Tsimane",
    nameFi: "Tsimane",
    location: "Bolivia",
    lat: -14.8,
    lon: -65.5,
    emfLevel: "none",
    emfLabelEn: "Zero",
    emfLabelFi: "Nolla",
    descriptionEn: "Indigenous forager-horticulturalists in the Bolivian Amazon. No electricity, no phones, no modern technology.",
    descriptionFi: "Alkuperäiskansaan kuuluvia metsästäjä-puutarhaviljelijöitä Bolivian Amazoniassa. Ei sähköä, ei puhelimia, ei modernia teknologiaa.",
    keyFindingEn: "Lowest coronary artery disease ever recorded (Lancet 2017). Dementia 1.2% vs USA 8-11%. Brain atrophy 70% slower than Western populations. Testosterone does not decline with age (Trumble 2012) despite 33% lower baseline — no cumulative EMF damage.",
    keyFindingFi: "Matalin koskaan mitattu sepelvaltimotauti (Lancet 2017). Dementia 1,2 % vs USA 8–11 %. Aivoatrofia 70 % hitaampi kuin länsimaissa. Testosteroni ei laske iän myötä (Trumble 2012), vaikka lähtötaso on 33 % matalampi — ei kumulatiivista EMF-vauriota.",
    testosteroneProfile: {
      baselineEn: "33% lower than age-matched US men (salivary testosterone)",
      baselineFi: "33 % matalampi kuin ikävakioidut yhdysvaltalaiset miehet (sylkitestosteroni)",
      ageDeclineEn: "None observed — testosterone does NOT decline with age",
      ageDeclineFi: "Ei havaittua — testosteroni EI laske iän myötä",
      reactivityEn: "Normal: 30% increase during competition/hunting",
      reactivityFi: "Normaali: 30 %:n nousu kilpailun/metsästyksen aikana",
      implicationEn: "Age-related testosterone decline is not biological inevitability but environment-dependent. Low baseline reflects immune trade-off (high pathogen load), not dysfunction.",
      implicationFi: "Ikään liittyvä testosteronilasku ei ole biologinen väistämättömyys vaan ympäristöriippuvainen ilmiö. Matala lähtötaso heijastaa immuunijärjestelmän kompromissia (korkea patogeenipaine), ei toimintahäiriötä.",
      source: "Trumble et al. 2012, Proc R Soc B",
    },
    health: {
      tfr: "~9",
      cvd: "Lowest ever recorded",
      dementia: "1.2%",
      obesity: "<5%",
      t2d: "~0%",
      cancer: "?",
      depression: "?",
    },
    referenceIds: ["lancet-2017-tsimane-heart", "alz-dem-2022-tsimane-dementia", "j-gerontol-2021-tsimane-brain"],
  },
  {
    id: "hadza",
    nameEn: "Hadza",
    nameFi: "Hadza",
    location: "Tanzania",
    lat: -3.8,
    lon: 35.0,
    emfLevel: "none",
    emfLabelEn: "Zero",
    emfLabelFi: "Nolla",
    descriptionEn: "One of the last true hunter-gatherer populations. Lifestyle largely unchanged for ~10,000 years. ~17,000 steps/day (vs USA ~4,000).",
    descriptionFi: "Yksi viimeisistä aidoista metsästäjä-keräilijäpopulaatioista. Elämäntapa pysynyt pääosin muuttumattomana ~10 000 vuotta. ~17 000 askelta/vrk (vs USA ~4 000).",
    keyFindingEn: "Near-absence of obesity, T2D, and cardiovascular disease despite diverse diet.",
    keyFindingFi: "Lähes olematon obesiteetti, T2D ja sydänsairaus monipuolisesta ruokavaliosta huolimatta.",
    health: {
      tfr: "6–7",
      cvd: "Very low",
      dementia: "?",
      obesity: "<5%",
      t2d: "0–2%",
      cancer: "?",
      depression: "?",
    },
    referenceIds: ["obesity-rev-2018-hunter-gatherer"],
  },
  {
    id: "kitava",
    nameEn: "Kitava",
    nameFi: "Kitava",
    location: "Papua New Guinea",
    lat: -8.5,
    lon: 151.1,
    emfLevel: "none",
    emfLabelEn: "Zero",
    emfLabelFi: "Nolla",
    descriptionEn: "Melanesian islanders studied by Lindeberg in the 1990s. 70% energy from carbohydrates (tubers, fruit).",
    descriptionFi: "Melanesialaisia saarelaisia, joita Lindeberg tutki 1990-luvulla. 70 % energiasta hiilihydraateista (juurekset, hedelmät).",
    keyFindingEn: "Apparent absence of CVD, T2D, and metabolic syndrome despite high-carbohydrate diet.",
    keyFindingFi: "CVD:n, T2D:n ja metabolisen oireyhtymän näennäinen poissaolo korkeahiilihydraattisesta ruokavaliosta huolimatta.",
    health: {
      tfr: "High",
      cvd: "Absent",
      dementia: "?",
      obesity: "~0%",
      t2d: "Absent",
      cancer: "?",
      depression: "?",
    },
    referenceIds: ["kitava-lindeberg-1993"],
  },
  {
    id: "ache",
    nameEn: "Aché",
    nameFi: "Aché",
    location: "Paraguay",
    lat: -24.0,
    lon: -56.0,
    emfLevel: "none",
    emfLabelEn: "Zero",
    emfLabelFi: "Nolla",
    descriptionEn: "Indigenous hunter-gatherers of eastern Paraguay. Studied extensively for life history and reproductive ecology.",
    descriptionFi: "Itä-Paraguayn alkuperäisiä metsästäjä-keräilijöitä. Tutkittu laajasti elämänhistorian ja lisääntymisekologian osalta.",
    keyFindingEn: "TFR approximately 8. Low obesity prevalence.",
    keyFindingFi: "TFR noin 8. Matala obesiteettiprevalenssi.",
    health: {
      tfr: "~8",
      cvd: "?",
      dementia: "?",
      obesity: "Low",
      t2d: "?",
      cancer: "?",
      depression: "?",
    },
    referenceIds: [],
  },
  {
    id: "san",
    nameEn: "San / Bushmen",
    nameFi: "San / Bushmannit",
    location: "Southern Africa",
    lat: -22.0,
    lon: 21.0,
    emfLevel: "none",
    emfLabelEn: "Zero",
    emfLabelFi: "Nolla",
    descriptionEn: "Indigenous peoples of the Kalahari. Among the oldest continuous populations on Earth.",
    descriptionFi: "Kalaharin alkuperäiskansoja. Maailman vanhimpia yhtäjaksoisesti asuneita populaatioita.",
    keyFindingEn: "Low CVD, low obesity, low T2D. TFR 4-5.",
    keyFindingFi: "Matala CVD, matala obesiteetti, matala T2D. TFR 4–5.",
    health: {
      tfr: "4–5",
      cvd: "Low",
      dementia: "?",
      obesity: "Low",
      t2d: "Low",
      cancer: "?",
      depression: "?",
    },
    referenceIds: [],
  },
  {
    id: "shuar",
    nameEn: "Shuar",
    nameFi: "Shuar",
    location: "Ecuador",
    lat: -2.5,
    lon: -77.5,
    emfLevel: "minimal",
    emfLabelEn: "~Zero",
    emfLabelFi: "~Nolla",
    descriptionEn: "Indigenous people of the Ecuadorian Amazon. Transitioning between traditional and market-integrated lifestyles.",
    descriptionFi: "Ecuadorin Amazonian alkuperäiskansaa. Siirtymässä perinteisestä markkinaintegroituun elämäntapaan.",
    keyFindingEn: "TFR approximately 5. Low obesity and inflammatory markers.",
    keyFindingFi: "TFR noin 5. Matala obesiteetti ja tulehdusmarkkerit.",
    health: {
      tfr: "~5",
      cvd: "?",
      dementia: "?",
      obesity: "Low",
      t2d: "?",
      cancer: "?",
      depression: "?",
    },
    referenceIds: [],
  },
  {
    id: "moseten",
    nameEn: "Mosetén",
    nameFi: "Mosetén",
    location: "Bolivia",
    lat: -15.4,
    lon: -67.5,
    emfLevel: "minimal",
    emfLabelEn: "Low",
    emfLabelFi: "Matala",
    descriptionEn: "Share Tsimane ancestral history and subsistence base but with more technology, medicine, and infrastructure. Key natural experiment for dose-response.",
    descriptionFi: "Jakavat Tsimanen esi-isällisen historian ja elinkeinon mutta enemmän teknologiaa, lääketiedettä ja infrastruktuuria. Avainluonnollinen koe annos-vasteelle.",
    keyFindingEn: "Health metrics fall BETWEEN Tsimane and Western on every measured variable — the dose-response gradient. Testosterone shows intermediate age-decline pattern, consistent with partial EMF exposure.",
    keyFindingFi: "Terveysmittarit ovat Tsimanen ja länsimaisen VÄLISSÄ jokaisessa mitatussa muuttujassa — annos-vastegradientti. Testosteroni osoittaa väliasteen ikälaskumallin, yhdenmukainen osittaisen EMF-altistuksen kanssa.",
    testosteroneProfile: {
      baselineEn: "Intermediate between Tsimane and US — consistent with partial market integration",
      baselineFi: "Tsimanen ja USA:n välissä — yhdenmukainen osittaisen markkinaintegraation kanssa",
      ageDeclineEn: "Modest age-related decline — between Tsimane (none) and US (~1.5%/yr)",
      ageDeclineFi: "Maltillinen ikään liittyvä lasku — Tsimanen (ei) ja USA:n (~1,5 %/v) välissä",
      reactivityEn: "Attenuated compared to Tsimane but higher than US",
      reactivityFi: "Vaimentunut Tsimaneen verrattuna mutta korkeampi kuin USA",
      implicationEn: "Dose-response gradient: EMF exposure level predicts testosterone trajectory. Same ancestry, same subsistence base, different technology → different T-aging pattern.",
      implicationFi: "Annos-vastegradientti: EMF-altistustaso ennustaa testosteronitrajektoriaa. Sama esi-isällinen tausta, sama elinkeinopohja, eri teknologia → eri T-ikääntymismalli.",
      source: "Trumble et al. 2012 (comparative); Gurven et al. 2009",
    },
    health: {
      tfr: "?",
      cvd: "Low",
      dementia: "Intermediate",
      obesity: "<5%",
      t2d: "?",
      cancer: "?",
      depression: "?",
    },
    referenceIds: ["alz-dem-2022-tsimane-dementia", "pnas-2025-tsimane-moseten-brain"],
  },
  {
    id: "amish",
    nameEn: "Old Order Amish",
    nameFi: "Vanhan järjestyksen amissit",
    location: "USA (Ohio, Pennsylvania)",
    lat: 40.5,
    lon: -81.1,
    emfLevel: "ambient",
    emfLabelEn: "Ambient only",
    emfLabelFi: "Vain ympäristö",
    descriptionEn: "No phones, no smartphones, limited electricity. Surrounded by modern infrastructure but refuse personal technology. TFR has declined slightly (6.9 → 6.1, 1924–2014).",
    descriptionFi: "Ei puhelimia, ei älypuhelimia, rajoitettu sähkö. Modernin infrastruktuurin ympäröimiä mutta kieltäytyvät henkilökohtaisesta teknologiasta. TFR laskenut lievästi (6,9 → 6,1, 1924–2014).",
    keyFindingEn: "TFR 6.1 (vs US 1.66). Cancer ~60% of US rates. Depression <1%. Allergic sensitization 7.2% (vs 44%).",
    keyFindingFi: "TFR 6,1 (vs USA 1,66). Syöpä ~60 % USA:n tasosta. Masennus <1 %. Allerginen herkistyminen 7,2 % (vs 44 %).",
    health: {
      tfr: "6.1",
      cvd: "Low",
      dementia: "?",
      obesity: "Low",
      t2d: "Low",
      cancer: "~60% of US",
      depression: "<1%",
    },
    referenceIds: ["amish-fertility-demogr-res-2025", "amish-cancer-westman-2010", "amish-depression-cross-2007"],
  },
  {
    id: "mennonite",
    nameEn: "Traditional Mennonite",
    nameFi: "Perinteiset mennoniitit",
    location: "USA / Canada",
    lat: 43.0,
    lon: -80.5,
    emfLevel: "minimal",
    emfLabelEn: "Low",
    emfLabelFi: "Matala",
    descriptionEn: "Similar to Amish but with somewhat more technology adoption. Limited electricity and phone use.",
    descriptionFi: "Samanlaisia kuin amissit mutta hieman enemmän teknologian omaksumista. Rajoitettu sähkö- ja puhelinkäyttö.",
    keyFindingEn: "TFR 4-5. Low chronic disease rates across measured categories.",
    keyFindingFi: "TFR 4–5. Matala kroonisten sairauksien esiintyvyys mitatuissa kategorioissa.",
    health: {
      tfr: "4–5",
      cvd: "Low",
      dementia: "?",
      obesity: "Low",
      t2d: "Low",
      cancer: "?",
      depression: "?",
    },
    referenceIds: [],
  },
];

export const MODERN_COMPARISONS: ModernComparison[] = [
  {
    id: "usa",
    nameEn: "Modern USA",
    nameFi: "Moderni USA",
    emfLabelEn: "High",
    emfLabelFi: "Korkea",
    health: {
      tfr: "1.66",
      cvd: "High",
      dementia: "8–11%",
      obesity: "42%",
      t2d: "11.6%",
      cancer: "100% (ref)",
      depression: "~8%",
    },
  },
  {
    id: "south-korea",
    nameEn: "South Korea",
    nameFi: "Etelä-Korea",
    emfLabelEn: "Very high",
    emfLabelFi: "Erittäin korkea",
    health: {
      tfr: "0.72",
      cvd: "Moderate",
      dementia: "10+%",
      obesity: "High",
      t2d: "High",
      cancer: "High",
      depression: "High",
    },
  },
];

export const CASCADE_COMPARISON = [
  { cascadeEn: "Sleep", cascadeFi: "Uni", lowEmf: "Better", modern: "Disorders ↑", bermPredicts: "EMF→Cav3.3→spindle disruption", confirmed: true },
  { cascadeEn: "Depression", cascadeFi: "Masennus", lowEmf: "<1% (Amish)", modern: "~8%", bermPredicts: "CACNA1C oscillation", confirmed: true },
  { cascadeEn: "ADHD/Autism", cascadeFi: "ADHD/Autismi", lowEmf: "~1:10000 (Amish)", modern: "1:36", bermPredicts: "VGCC synaptogenesis", confirmed: true },
  { cascadeEn: "T2D", cascadeFi: "T2D", lowEmf: "0–2% / absent", modern: "11.6%", bermPredicts: "β-cell Cav→insulin", confirmed: true },
  { cascadeEn: "Autoimmune", cascadeFi: "Autoimmuuni", lowEmf: "7.2% allergy (Amish)", modern: "44%", bermPredicts: "Ca²⁺-NFAT", confirmed: true },
  { cascadeEn: "Fertility", cascadeFi: "Hedelmällisyys", lowEmf: "TFR 6–9", modern: "TFR 0.72–1.66", bermPredicts: "Cav3→StAR→T", confirmed: true },
  { cascadeEn: "Cancer", cascadeFi: "Syöpä", lowEmf: "~60% (Amish)", modern: "100% (ref)", bermPredicts: "VGCC/Ca²⁺/ROS", confirmed: true },
  { cascadeEn: "Alzheimer's", cascadeFi: "Alzheimer", lowEmf: "1.2% (Tsimane)", modern: "8–11%", bermPredicts: "Cav3.2→hippocampus", confirmed: true },
  { cascadeEn: "Myopia", cascadeFi: "Likitaitteisuus", lowEmf: "1–3% (Africa)", modern: "80–95% (East Asia)", bermPredicts: "DA/VGCC+CRY", confirmed: true },
  { cascadeEn: "Autoimmune (trend)", cascadeFi: "Autoimmuuni (trendi)", lowEmf: "Rare", modern: "+19.1%/yr", bermPredicts: "Ca²⁺-NFAT", confirmed: true },
  { cascadeEn: "Tinnitus", cascadeFi: "Tinnitus", lowEmf: "?", modern: "17.7% (youth)", bermPredicts: "Cav1.3→IHC", confirmed: null },
  { cascadeEn: "Migraine", cascadeFi: "Migreeni", lowEmf: "?", modern: "Common", bermPredicts: "CACNA1A/1I", confirmed: null },
  { cascadeEn: "Chronic pain", cascadeFi: "Kroon. kipu", lowEmf: "?", modern: "Epidemic", bermPredicts: "Cav3.2→DRG", confirmed: null },
  { cascadeEn: "PCOS", cascadeFi: "PCOS", lowEmf: "?", modern: "5–20%", bermPredicts: "4-organ convergence", confirmed: null },
  { cascadeEn: "Cardiac arrhythmia", cascadeFi: "Sydänarytmia", lowEmf: "Rare", modern: "Common", bermPredicts: "Cav1.2→QT", confirmed: true },
  { cascadeEn: "Neurodevelopment", cascadeFi: "Neurokehitys", lowEmf: "?", modern: "GD ↑↑", bermPredicts: "7 channels", confirmed: null },
];

export const MYOPIA_GRADIENT = [
  { regionEn: "Rural Africa", regionFi: "Maaseutu-Afrikka", prevalence: "1.4–11.4%", techLevel: 1 },
  { regionEn: "Latin America", regionFi: "Latinalainen Amerikka", prevalence: "1.4–14.4%", techLevel: 2 },
  { regionEn: "Europe (youth)", regionFi: "Eurooppa (nuoret)", prevalence: "17–36%", techLevel: 3 },
  { regionEn: "USA (youth)", regionFi: "USA (nuoret)", prevalence: "~50%", techLevel: 4 },
  { regionEn: "East Asia (youth)", regionFi: "Itä-Aasia (nuoret)", prevalence: "80–95%", techLevel: 5 },
];
