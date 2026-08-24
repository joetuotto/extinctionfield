export interface EvidenceCard {
  id: string;
  title_en: string;
  title_fi: string;
  authors: string;
  year: number;
  journal: string;
  doi?: string;
  pmid?: string;
  level: string;
  finding_en: string;
  finding_fi: string;
  berm_relevance_en?: string;
  berm_relevance_fi?: string;
}

export interface EyeProfile {
  color: string;
  label_en: string;
  label_fi: string;
  transmission: string;
  cry_activation: string;
  cry_stability: string;
  snr: string;
  circadian: string;
  magnetoreception: string;
  sex_prevalence: string;
  adaptive_context_en: string;
  adaptive_context_fi: string;
  geographic: string;
}

export interface NutritionalModulator {
  nutrient: string;
  target: string;
  deficiency_effect_en: string;
  deficiency_effect_fi: string;
  key_source: string;
  level: string;
}

export interface Prediction {
  id: string;
  title_en: string;
  title_fi: string;
  test_en: string;
  test_fi: string;
  discriminating: boolean;
}

export const EVIDENCE_CARDS: EvidenceCard[] = [
  {
    id: "hirano2017-fad-cry",
    title_en: "FAD stabilizes cryptochrome proteins",
    title_fi: "FAD stabiloi kryptokromiproteiineja",
    authors: "Hirano A, Braas D, Fu Y-H, Ptáček LJ",
    year: 2017,
    journal: "Cell Reports",
    doi: "10.1016/j.celrep.2017.03.041",
    pmid: "28402850",
    level: "E",
    finding_en: "FAD stabilizes CRY1 and CRY2 proteins. Riboflavin kinase (Rfk) knockdown combined with B2-deficient diet decreased CRY levels in mouse liver and altered circadian gene expression, particularly genes related to glucose homeostasis.",
    finding_fi: "FAD stabiloi CRY1- ja CRY2-proteiineja. Riboflaviinikinaasin (Rfk) hiljennetty ekspressio yhdistettynä B2-puutteiseen ruokavalioon laski CRY-tasoja hiiren maksassa ja muutti kellogeenien ekspressioprofiileja, erityisesti glukoosihomeostaasiin liittyvien.",
    berm_relevance_en: "Direct evidence that vitamin B2 availability controls CRY protein levels and circadian clock function. Establishes the nutritional prerequisite for BERM pathway C.",
    berm_relevance_fi: "Suora näyttö siitä, että B2-vitamiinin saatavuus kontrolloi CRY-proteiinien tasoja ja sirkadiaanisen kellon toimintaa. Vahvistaa BERM:n polku C:n ravitsemuksellisen edellytyksen.",
  },
  {
    id: "sherrard2025-cry2-trpc1",
    title_en: "CRY2-TRPC1 magnetotransduction requires FAD and light",
    title_fi: "CRY2-TRPC1-magnetotransduktio vaatii FAD:tä ja valoa",
    authors: "Yap JLY, Tai YK, Franco-Obregón A et al.",
    year: 2025,
    journal: "Cells",
    doi: "10.3390/cells14030231",
    level: "E",
    finding_en: "Silencing riboflavin kinase (RFK) — which depletes cellular FAD — attenuated responsiveness to pulsed electromagnetic fields AND inhibited selectivity for magnetic field direction. Growth in the dark produced the same loss of magnetic sensitivity. CRY2 overexpression enhanced PEMF responses. CRY2 and TRPC1 physically interact and co-translocate to the nucleus after PEMF exposure.",
    finding_fi: "Riboflaviinikinaasin (RFK) hiljentäminen — joka vähentää solunsisäistä FAD:tä — heikensi vastetta pulssisähkömagneettisille kentille JA esti magneettikentän suunnan erottelukyvyn. Kasvu pimeässä tuotti saman magneettisen herkkyyden menetyksen. CRY2:n yliekspressio vahvisti PEMF-vasteita. CRY2 ja TRPC1 muodostavat fyysisen interaktion ja siirtyvät yhdessä tumaan PEMF-altistuksen jälkeen.",
    berm_relevance_en: "Smoking gun for the nutrition-magnetoreception link. Also reveals that BERM pathways A (VGIC/TRPC1) and C (CRY/RPM) are physically coupled through a CRY2-TRPC1 complex — they are not independent.",
    berm_relevance_fi: "Suora todiste ravitsemuksen ja magnetoreseption yhteydestä. Paljastaa myös, että BERM:n polut A (VGIC/TRPC1) ja C (CRY/RPM) ovat fyysisesti kytketyt CRY2-TRPC1-kompleksin kautta — ne eivät ole riippumattomia.",
  },
  {
    id: "higuchi2007-eye-melatonin",
    title_en: "Eye color influences melatonin suppression by light",
    title_fi: "Silmien väri vaikuttaa valon aiheuttamaan melatoniinisuppressioon",
    authors: "Higuchi S, Motohashi Y, Ishibashi K, Maeda T",
    year: 2007,
    journal: "Am J Physiol Regul Integr Comp Physiol",
    doi: "10.1152/ajpregu.00355.2006",
    pmid: "17332164",
    level: "M|C",
    finding_en: "Light-eyed Caucasians showed 89% melatonin suppression vs 73% for dark-eyed Asians under identical 1000 lux exposure for 2 hours. The difference suggests that iris pigmentation directly modulates the non-visual light pathway to the circadian clock.",
    finding_fi: "Sinisilmäisten kaukaasialaisten melatoniinin suppressio oli 89 % verrattuna tummasilmäisten aasialaisten 73 %:iin identtisessä 1000 luksin altistuksessa 2 tunnin ajan. Ero viittaa siihen, että iiriksen pigmentaatio moduloi suoraan ei-visuaalista valoreittiä sirkadiaaniseen kelloon.",
    berm_relevance_en: "Quantifies the iris-CRY-melatonin pathway. Blue eyes produce 22% stronger melatonin suppression — a direct measure of enhanced CRY pathway activation.",
    berm_relevance_fi: "Kvantifioi iiris-CRY-melatoniini-polun. Siniset silmät tuottavat 22 % voimakkaamman melatoniinin suppression — suora mittaus polku C:n vahvistuneesta aktivaatiosta.",
  },
  {
    id: "martinez-cadenas2013-gender-eye",
    title_en: "Gender is a major factor in eye colour distribution",
    title_fi: "Sukupuoli on merkittävä tekijä silmien värin jakaumassa",
    authors: "Martinez-Cadenas C et al.",
    year: 2013,
    journal: "Forensic Sci Int Genet",
    doi: "10.1016/j.fsigen.2013.03.007",
    pmid: "23601698",
    level: "M|C",
    finding_en: "Meta-analysis across Caucasian populations: males are significantly more likely to have blue eyes; females show higher frequencies of green and brown eyes. Women with the same genotype as men tend to have darker eyes due to X-chromosome mosaicism affecting melanin expression.",
    finding_fi: "Meta-analyysi kaukaasialaisissa populaatioissa: miehillä on merkitsevästi todennäköisemmin siniset silmät; naisilla on korkeampi vihreiden ja ruskeiden silmien esiintyvyys. Samoilla genotyypeillä naisilla on taipumus tummempiin silmiin kuin miehillä X-kromosomimosaiikin vuoksi.",
  },
  {
    id: "niessner2014-cry-photocycle",
    title_en: "Cryptochrome activation spectrum spans UV to green",
    title_fi: "Kryptokromin aktivaatiospektri kattaa UV:sta vihreään",
    authors: "Nießner C, Denzau S, Peichl L, Wiltschko W, Wiltschko R",
    year: 2014,
    journal: "J Exp Biol",
    doi: "10.1242/jeb.110965",
    pmid: "25472972",
    level: "E",
    finding_en: "Oxidized CRY absorbs UV/blue light (to ~500 nm); the photoreduced semiquinone additionally absorbs green light (to ~570 nm). Green light alone cannot activate CRY from the oxidized state but maintains the magnetically sensitive semiquinone form. After dark pre-exposure, green light produces no activated CRY — the semiquinone reservoir must be primed by blue light first.",
    finding_fi: "Hapettunut CRY absorboi UV/sinistä valoa (~500 nm asti); fotoredusoidutu semikinoni absorboi lisäksi vihreää valoa (~570 nm asti). Vihreä valo yksin ei voi aktivoida CRY:tä hapettuneesta tilasta, mutta ylläpitää magneettisesti herkkää semikinonimuotoa. Pimeälle esialtistuksen jälkeen vihreä valo ei tuota aktivoitua CRY:tä — semikinonivarasto pitää pohjustaa sinisellä valolla ensin.",
    berm_relevance_en: "Establishes the biophysical basis for why green eyes may optimize magnetoreceptive stability: their lipochrome filter passes the full 450-570 nm CRY operational band while reducing UV/extreme blue that causes over-reduction.",
    berm_relevance_fi: "Perustaa biofysikaalisen pohjan sille, miksi vihreät silmät voivat optimoida magnetoreseptiivistä stabiilisuutta: niiden lipokromi-suodatin päästää läpi koko 450-570 nm CRY:n operointikaistan samalla vähentäen UV:tä ja äärimmäistä sinistä joka aiheuttaa yliredusointia.",
  },
  {
    id: "white2003-iris-chronotype",
    title_en: "Iris pigmentation affects chronotype and sleep timing",
    title_fi: "Iiriksen pigmentaatio vaikuttaa kronotyyppiin ja unen ajoitukseen",
    authors: "White TM, Terman M",
    year: 2003,
    journal: "Chronobiol Int",
    level: "C",
    finding_en: "Light-eyed subjects had earlier sleep times and more 'morningness' on chronotype questionnaires, suggesting greater sensitivity to the phase-advancing effects of morning light exposure.",
    finding_fi: "Vaaleasilmäisillä koehenkilöillä oli aikaisemmat nukkumaanmenoajat ja enemmän 'aamuihmisyyttä' kronotyyppikyselyissä, mikä viittaa suurempaan herkkyyteen aamunvalon vaihetta edistävälle vaikutukselle.",
  },
  {
    id: "chae2019-sex-magnetoreception",
    title_en: "Human magnetoreception functional in men only",
    title_fi: "Ihmisen magnetoreseptio toiminnallinen vain miehillä",
    authors: "Chae K-S, Oh I-T, Lee S-H, Kim S-C",
    year: 2019,
    journal: "PLOS ONE",
    doi: "10.1371/journal.pone.0211826",
    level: "M|C",
    finding_en: "Starved men (n=20) oriented toward geomagnetic food direction (P<0.001). Effect required blue light (<500 nm). Women (n=21) showed no significant orientation in any condition. Sex difference in magnetoreception is consistent with sex difference in eye color (men: more blue = more CRY sensitivity).",
    finding_fi: "Nälkiintyneet miehet (n=20) orientoituivat kohti geomagneettista ruokasuuntaa (P<0,001). Vaikutus vaati sinistä valoa (<500 nm). Naiset (n=21) eivät osoittaneet merkitsevää orientaatiota missään olosuhteissa. Sukupuoliero magnetoreseptiossa on yhdenmukainen silmien värin sukupuolieron kanssa (miehet: enemmän sinisiä = enemmän CRY-herkkyyttä).",
  },
  {
    id: "bartoelke2025",
    title_en: "Full-length CRY1 in human blue cone outer segments",
    title_fi: "Täyspitkä CRY1 ihmisen sinisten tappisolujen ulkosegmenteissä",
    authors: "Bartölke R, Nießner C, Reinhard K, Wolfrum U, Meimann S, Bolte P, Feederle R, Mouritsen H, Dedek K, Peichl L, Winklhofer M",
    year: 2025,
    journal: "FASEB Journal",
    doi: "10.1096/fj.202402614R",
    pmid: "40277221",
    level: "E",
    finding_en: "Using C-terminal specific antibodies, full-length CRY1 protein was detected exclusively in the outer segments of short-wavelength-sensitive 'blue' cone photoreceptors in human, bonobo, and gorilla retinas. No other retinal cell types were stained. This localization far from nuclei suggests CRY1 has additional, non-circadian, probably phototransductive functions. The stacked membrane lamellae of cone outer segments provide the structural order required for oriented magnetoreception.",
    finding_fi: "C-terminaalispesifisillä vasta-aineilla havaittiin täyspitkä CRY1-proteiini yksinomaan lyhytaaltoherkissä sinisten tappisolujen ulkosegmenteissä ihmisen, bonobon ja gorillan verkkokalvoilla. Mitään muita verkkokalvon solutyyppejä ei värjätty. Tämä sijainti kaukana tumista viittaa siihen, että CRY1:llä on lisätoimintoja sirkadiaanisen kellon ulkopuolella, todennäköisesti fototransduktiivisia. Tappisolujen ulkosegmenttien pinotut kalvolamellit tarjoavat orientoituneelle magnetoreseptiolle tarvittavan rakenteellisen järjestyksen.",
    berm_relevance_en: "CRITICAL for BERM pathway C: Identifies a SECOND CRY system in the human retina. CRY1 in blue cones (sensory/phototransductive) is distinct from CRY2 in ganglion cells (circadian). This is the system most directly affected by iris pigmentation — blue eyes transmit ~100x more light specifically to blue cones where CRY1 resides. The QuantumBirds consortium (Mouritsen, Hore, Winklhofer) produced this finding. Epistemic note: E-level for protein localization, L*-level for magnetoreception interpretation.",
    berm_relevance_fi: "KRIITTINEN BERM:n polku C:lle: Tunnistaa TOISEN CRY-järjestelmän ihmisen verkkokalvolla. CRY1 sinisissä tapeissa (sensorinen/fototransduktiivinen) on erillinen CRY2:sta gangliosoluissa (sirkadiaaninen). Tämä on järjestelmä johon iiriksen pigmentaatio vaikuttaa suorimmin — siniset silmät päästävät ~100x enemmän valoa nimenomaan sinisille tapeille joissa CRY1 sijaitsee. QuantumBirds-konsortio (Mouritsen, Hore, Winklhofer) tuotti tämän löydöksen. Episteeminen huomio: E-taso proteiinilokalisaatiolle, L*-taso magnetoreseptiotulkinnalle.",
  },
  {
    id: "majewska2025",
    title_en: "CRY associates with lipid bilayers in ordered manner",
    title_fi: "CRY assosioituu lipidikaksoiskerrosten kanssa järjestäytyneesti",
    authors: "Majewska M, Hanić M, Bartölke R, Schmidt J, Bożek J, Gerhards L, Mouritsen H, Koch K-W, Solov'yov IA, Brand I",
    year: 2025,
    journal: "ACS Chemical Biology",
    doi: "10.1021/acschembio.4c00576",
    level: "E",
    finding_en: "European robin cryptochrome-4a (ErCry4a) associates with model lipid membranes reaching a uniform, partially restricted orientation. The protein binds to the membrane with either C- or N-terminus facing the surface. Membrane lamellae separated by ~15-20 nm could anchor and align CRY4a molecules, providing the orientational order and regularity required for efficient directional magnetoreception.",
    finding_fi: "Eurooppalaisen punarinnan kryptokromi-4a (ErCry4a) assosioituu mallipiidikalvoihin saavuttaen tasaisen, osittain rajoitetun orientaation. Proteiini sitoutuu kalvoon joko C- tai N-terminuksella pintaa kohti. ~15-20 nm:n etäisyydellä toisistaan olevat kalvolamellit voivat ankkuroida ja linjata CRY4a-molekyylejä, tarjoten tehokkaan suuntakohtaisen magnetoreseption vaatiman suuntajärjestyksen ja säännöllisyyden.",
    berm_relevance_en: "Establishes E-level evidence for the omega fatty acid hypothesis: membrane lipid composition directly determines CRY protein orientation, which is a prerequisite for directional magnetic sensing. If membrane composition is altered by dietary fatty acid imbalance (high omega-6, low omega-3/7), CRY orientation may become randomized, reducing magnetoreceptive resolution. This connects nutritional status to pathway C1 function through a physical-structural mechanism.",
    berm_relevance_fi: "Vahvistaa E-tason evidenssin omega-rasvahappohypoteesille: kalvon lipidikoostumus määrittää suoraan CRY-proteiinin orientaation, joka on edellytys suuntakohtaiselle magneettiaistimukselle. Jos kalvon koostumus muuttuu ruokavalion rasvahappo-epätasapainosta (korkea omega-6, matala omega-3/7), CRY:n orientaatio voi muuttua satunnaiseksi, heikentäen magnetoreseptiivistä erottelukykyä.",
  },
  {
    id: "lamia2009",
    title_en: "AMPK destabilizes CRY1 via phosphorylation",
    title_fi: "AMPK destabiloi CRY1:n fosforylaatiolla",
    authors: "Lamia KA, Sachdeva UM, DiTacchio L, Williams EC, Alvarez JG, Egan DF, Vasquez DS, Juguilon H, Panda S, Shaw RJ, Thompson CB, Evans RM",
    year: 2009,
    journal: "Science",
    doi: "10.1126/science.1172156",
    pmid: "19833968",
    level: "E",
    finding_en: "The nutrient-responsive AMPK phosphorylates CRY1 at Ser71, triggering FBXL3-mediated ubiquitin degradation. In mouse liver, AMPK activity was rhythmic and inversely correlated with CRY1 nuclear protein abundance. AMPK stimulation destabilized cryptochromes and altered circadian rhythms.",
    finding_fi: "Ravintoon reagoiva AMPK fosforyloi CRY1:n Ser71:ssä, käynnistäen FBXL3-välitteisen ubikitiinihajotuksen. Hiiren maksassa AMPK-aktiivisuus oli rytmistä ja kääntäen korreloitunutta CRY1:n tuma-proteiinin määrän kanssa. AMPK:n stimulaatio destabiloi kryptokromeja ja muutti sirkadiaanisia rytmejä.",
    berm_relevance_en: "Creates and resolves the 'fasting paradox': AMPK (activated during fasting) degrades CRY1, yet starved subjects show enhanced magnetoreception (Chae 2019). Resolution: fasting simultaneously increases FAD availability (via beta-oxidation), so newly synthesized CRY molecules are better FAD-loaded and more magnetically sensitive. The net effect is higher CRY QUALITY despite lower QUANTITY. This also explains why CHRONIC B2 deficiency (unlike acute fasting) is catastrophic: the FAD pool is depleted, so replacement CRY cannot be properly loaded. Resolution is L*-level hypothesis.",
    berm_relevance_fi: "Luo ja ratkaisee 'paastoparadoksin': AMPK (aktivoituu paastossa) hajottaa CRY1:n, mutta nälkiintyneet koehenkilöt osoittavat tehostunutta magnetoreseptiota (Chae 2019). Ratkaisu: paasto lisää samanaikaisesti FAD:n saatavuutta (beta-oksidaation kautta), joten uudet CRY-molekyylit ovat paremmin FAD-ladattuja ja magneettisesti herkempiä. Nettovaikutus on korkeampi CRY:n LAATU matalammasta MÄÄRÄSTÄ huolimatta. Tämä selittää myös miksi KROONINEN B2-puutos (toisin kuin akuutti paasto) on katastrofaalinen: FAD-pooli on ehtynyt, joten uusi CRY ei voi latautua kunnolla. Ratkaisu on L*-tason hypoteesi.",
  },
  {
    id: "b2_fertility_consolidated",
    title_en: "Riboflavin deficiency impairs fertility and pregnancy",
    title_fi: "Riboflaviinipuutos heikentää hedelmällisyyttä ja raskautta",
    authors: "Consolidated: Wacker 2000, IVF data 2022, Sci Rep 2025",
    year: 2000,
    journal: "Multiple sources",
    level: "M|C",
    finding_en: "Three independent lines of evidence: (1) Wacker et al. 2000: B2-deficient mothers had 4.7x higher preeclampsia risk (OR 4.7, CI 1.8-12.2). (2) IVF clinics: B2 supplementation improves embryo quality metrics. (3) China has >90% B2 inadequacy (CNHS 2015-2017) coinciding with world's lowest TFR. The B2-fertility link operates through FAD-dependent CRY stability, FAD-dependent mitochondrial function, and FAD-dependent folate metabolism.",
    finding_fi: "Kolme itsenäistä evidenssilinjaa: (1) Wacker ym. 2000: B2-puutteisilla äideillä oli 4,7-kertainen pre-eklampsian riski (OR 4,7, CI 1,8-12,2). (2) IVF-klinikat: B2-lisä parantaa alkionlaatumittareita. (3) Kiinassa on >90 % B2-puutos (CNHS 2015-2017) samanaikaisesti maailman alhaisimman TFR:n kanssa. B2-hedelmällisyysyhteys toimii FAD-riippuvaisen CRY-stabiilisuuden, FAD-riippuvaisen mitokondriaalisen toiminnan ja FAD-riippuvaisen folaattimetabolian kautta.",
    berm_relevance_en: "The China B2 case: China has >90% B2 inadequacy AND the world's lowest TFR. This is ecological correlation (not causal proof), but the mechanism is clear: B2 → FAD → CRY stability → pathway C function. If B2 supplementation in China improved CRY-dependent circadian markers, it would be strong evidence for the nutritional modulation hypothesis. This is prediction NUT-2.",
    berm_relevance_fi: "Kiinan B2-tapaus: Kiinassa on >90 % B2-puutos JA maailman alhaisin TFR. Tämä on ekologinen korrelaatio (ei kausaalinen todiste), mutta mekanismi on selvä: B2 → FAD → CRY-stabiilisuus → polku C:n toiminta. Jos B2-lisä Kiinassa parantaisi CRY-riippuvaisia sirkadiaanisia markkereita, se olisi vahvaa evidenssiä ravitsemuksellisen modulaation hypoteesille. Tämä on ennuste NUT-2.",
  },
];

export const EYE_PROFILES: EyeProfile[] = [
  {
    color: "blue",
    label_en: "Blue — Maximum Sensitivity",
    label_fi: "Sininen — Maksimaalinen herkkyys",
    transmission: "100× (reference)",
    cry_activation: "Strongest",
    cry_stability: "Lowest (over-reduction risk)",
    snr: "Moderate (high signal, high noise)",
    circadian: "Most responsive, least stable",
    magnetoreception: "Peak directional sensitivity",
    sex_prevalence: "More common in males",
    adaptive_context_en: "Optimized for navigation/hunting: instant magnetic bearing",
    adaptive_context_fi: "Optimoitu navigointiin/metsästykseen: hetkellinen magneettinen suunta",
    geographic: "Northern Europe (>55°N)",
  },
  {
    color: "green",
    label_en: "Green — Optimal Stability",
    label_fi: "Vihreä — Optimaalinen stabiilisuus",
    transmission: "~30× (lipochrome-filtered)",
    cry_activation: "Moderate (450-570 nm bandpass)",
    cry_stability: "Highest (semiquinone maintained)",
    snr: "Best (filtered noise, sustained signal)",
    circadian: "Most stable oscillation",
    magnetoreception: "Sustained directional discrimination",
    sex_prevalence: "More common in females (1.2:1)",
    adaptive_context_en: "Optimized for circadian stability: hormonal rhythms, ovulation timing",
    adaptive_context_fi: "Optimoitu sirkadiaaniseen stabiilisuuteen: hormonaaliset rytmit, ovulaation ajoitus",
    geographic: "Atlantic fringe (Ireland, Scotland, Basque, Caucasus)",
  },
  {
    color: "brown",
    label_en: "Brown — UV Protection Priority",
    label_fi: "Ruskea — UV-suojan priorisointi",
    transmission: "1× (baseline, strong melanin)",
    cry_activation: "Minimal",
    cry_stability: "N/A (insufficient activation)",
    snr: "Low signal, low noise",
    circadian: "Least light-responsive",
    magnetoreception: "Minimal",
    sex_prevalence: "More common in males globally",
    adaptive_context_en: "Optimized for UV protection: equatorial/high-sun environments",
    adaptive_context_fi: "Optimoitu UV-suojaksi: päiväntasaajan/korkean auringon ympäristöt",
    geographic: "Equatorial, subtropical, most of global population",
  },
];

export const NUTRITIONAL_MODULATORS: NutritionalModulator[] = [
  {
    nutrient: "Riboflavin (B2)",
    target: "FAD → CRY stability + magnetic sensitivity",
    deficiency_effect_en: "CRY protein degrades (ubiquitin-mediated). Magnetic field directional selectivity lost. Circadian gene expression altered.",
    deficiency_effect_fi: "CRY-proteiini hajoaa (ubikitiinivälitteisesti). Magneettikentän suuntaerottelu menetetään. Kellogeenien ekspressio muuttuu.",
    key_source: "Hirano 2017 + Sherrard lab 2025",
    level: "E",
  },
  {
    nutrient: "Lutein / Zeaxanthin",
    target: "Retinal ROS protection → CRY-hosting ganglion cell integrity",
    deficiency_effect_en: "Retinal ganglion cells (where CRY resides) become vulnerable to oxidative damage from pathway A (VGCC → Ca²⁺ → ROS). Pathway A degrades pathway C's substrate.",
    deficiency_effect_fi: "Verkkokalvon gangliosolut (joissa CRY sijaitsee) tulevat haavoittuvaisiksi polku A:n oksidatiiviselle vauriolle (VGCC → Ca²⁺ → ROS). Polku A tuhoaa polku C:n substraattia.",
    key_source: "Lutein/zeaxanthin retinal protection literature + BERM pathway cross-talk logic",
    level: "M",
  },
  {
    nutrient: "Omega-3/7 fatty acids",
    target: "Membrane composition → CRY orientation on lipid bilayer",
    deficiency_effect_en: "Altered membrane fluidity disrupts CRY4a supramolecular assembly with G-protein on lipid bilayer (Güzelsoy-Flügge 2026). Randomized CRY orientation reduces directional magnetic resolution.",
    deficiency_effect_fi: "Muuttunut kalvon fluiditeetti häiritsee Cry4a:n supramolekulaarista assemblaasiota G-proteiinin kanssa lipidikaksoiskerroksella (Güzelsoy-Flügge 2026). Satunnaistunut CRY-orientaatio heikentää magneettista suuntaresoluutiota.",
    key_source: "Güzelsoy-Flügge 2026 (Cry4a membrane context) + membrane biology",
    level: "L*",
  },
  {
    nutrient: "Blue light (environmental, not dietary)",
    target: "CRY photoreduction → radical pair formation",
    deficiency_effect_en: "No CRY activation, no radical pairs, no magnetic sensitivity. Dark = magnetically blind.",
    deficiency_effect_fi: "Ei CRY-aktivaatiota, ei radikaalipareja, ei magneettista herkkyyttä. Pimeä = magneettisesti sokea.",
    key_source: "Sherrard lab 2025 (dark = loss of sensitivity) + all RPM literature",
    level: "E",
  },
];

export const PREDICTIONS: Prediction[] = [
  {
    id: "EYE-1",
    title_en: "Blue-eyed men outperform green-eyed men in geomagnetic orientation",
    title_fi: "Sinisilmäiset miehet suoriutuvat vihreäsilmäisiä paremmin geomagneettisessa orientaatiossa",
    test_en: "Replicate Chae 2019 food-orientation paradigm with eye color as grouping variable. Blue-eyed males should show stronger orientation than green-eyed males under identical blue light conditions.",
    test_fi: "Toista Chae 2019 ruokaorientaatioasetelma silmien värillä ryhmittelevänä muuttujana. Sinisilmäisten miesten orientaation tulisi olla voimakkaampaa kuin vihreäsilmäisten samoissa sinisen valon olosuhteissa.",
    discriminating: true,
  },
  {
    id: "EYE-2",
    title_en: "Green-eyed women show more stable melatonin profiles than blue-eyed women",
    title_fi: "Vihreäsilmäisillä naisilla on vakaampi melatoniiniprofiili kuin sinisilmäisillä",
    test_en: "Measure 24-hour salivary melatonin profiles in green-eyed vs blue-eyed women under identical light conditions. Green-eyed women should show lower coefficient of variation in melatonin rhythm amplitude.",
    test_fi: "Mittaa 24 tunnin sylkimelatoniiniprofiilit vihreäsilmäisillä vs. sinisilmäisillä naisilla identtisissä valo-olosuhteissa. Vihreäsilmäisillä tulisi olla pienempi variaatiokerroin melatoniinirytmin amplitudissa.",
    discriminating: true,
  },
  {
    id: "EYE-3",
    title_en: "B2 supplementation improves circadian resilience to nighttime EMF",
    title_fi: "B2-lisä parantaa sirkadiaanista resilienssiä yölliselle EMF-altistukselle",
    test_en: "RCT: B2 supplementation (25mg/day) vs placebo in subjects with poor sleep quality and high nighttime phone use. Measure melatonin onset latency and sleep efficiency. B2 group should show less circadian disruption because FAD-replete CRY is more stable.",
    test_fi: "RCT: B2-lisä (25mg/pv) vs. lumevalmiste henkilöillä joilla on huono unenlaatu ja runsas yöllinen puhelinkäyttö. Mittaa melatoniinin alkamisviive ja unen tehokkuus. B2-ryhmän sirkadiaaninen häiriö tulisi olla pienempi koska FAD-rikas CRY on stabiilimpi.",
    discriminating: true,
  },
  {
    id: "EYE-4",
    title_en: "Blue-eyed individuals show greater melatonin disruption from nighttime phone use",
    title_fi: "Sinisilmäiset osoittavat suuremman melatoniinihäiriön yöllisestä puhelinkäytöstä",
    test_en: "Cross-sectional: correlate eye color with self-reported sleep quality and measured melatonin profiles among matched subjects with similar nighttime screen exposure. Blue-eyed subjects should show larger disruption because more blue light reaches CRY from the phone screen.",
    test_fi: "Poikkileikkaustutkimus: korreloi silmien väri itseraportoituun unenlaatuun ja mitattuihin melatoniiniprofiileihin vertailukelpoisilla koehenkilöillä joilla on samankaltainen yöllinen ruutualtistus. Sinisilmäisillä tulisi olla suurempi häiriö koska enemmän sinistä valoa pääsee puhelimen näytöstä CRY:lle.",
    discriminating: false,
  },
  {
    id: "EYE-5",
    title_en: "Eye color modulates BERM pathway C effectiveness across populations",
    title_fi: "Silmien väri moduloi BERM:n polku C:n tehokkuutta populaatioiden välillä",
    test_en: "Ecological: in the 54-country BERM dataset, test whether populations with higher prevalence of blue/green eyes show stronger EMF-TFR association after controlling for GDP and education. If pathway C is modulated by eye color, northern European populations (high blue-eye prevalence) should show larger biological EMF sensitivity.",
    test_fi: "Ekologinen: BERM:n 54 maan datasetissä testaa osoittavatko populaatiot joissa on korkeampi sinisten/vihreiden silmien esiintyvyys voimakkaampaa EMF-TFR-assosiaatiota BKT:n ja koulutuksen kontrolloinnin jälkeen. Jos polku C:tä moduloi silmien väri, Pohjois-Euroopan populaatioiden (korkea sinisilmäisyyden esiintyvyys) tulisi osoittaa suurempaa biologista EMF-herkkyyttä.",
    discriminating: true,
  },
];

export const EPISTEMIC_LEVELS: Record<string, { color: string; label_en: string; label_fi: string }> = {
  E: { color: "#22c55e", label_en: "Experimental", label_fi: "Kokeellinen" },
  "M|C": { color: "#f59e0b", label_en: "Mechanistic | Correlational", label_fi: "Mekanistinen | Korrelaatio" },
  C: { color: "#f97316", label_en: "Correlational", label_fi: "Korrelaatio" },
  M: { color: "#eab308", label_en: "Mechanistic", label_fi: "Mekanistinen" },
  "L*": { color: "#a855f7", label_en: "Testable hypothesis", label_fi: "Testattava hypoteesi" },
};
