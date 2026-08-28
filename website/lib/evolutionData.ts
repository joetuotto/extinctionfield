export type EpistemicLevel = "E" | "M|C" | "C" | "L*";

export interface ChiScale {
  id: string;
  label_en: string;
  label_fi: string;
  background_en: string;
  background_fi: string;
  perturbation_en: string;
  perturbation_fi: string;
  chi_expression: string;
  at_zero_en: string;
  at_zero_fi: string;
  at_max_en: string;
  at_max_fi: string;
  verification: string;
  referenceIds?: string[];
  level: EpistemicLevel;
}

export interface HistoricalPhase {
  id: string;
  period: string;
  title_en: string;
  title_fi: string;
  description_en: string;
  description_fi: string;
}

export interface PopulationProfile {
  id: string;
  label_en: string;
  label_fi: string;
  chi_env: string;
  chi_optical: string;
  chi_molecular: string;
  dominant_pathway: string;
  observed_tfr: string;
  status_en: string;
  status_fi: string;
}

export interface NorthernTrait {
  id: string;
  trait_en: string;
  trait_fi: string;
  gene: string;
  mechanism_en: string;
  mechanism_fi: string;
  cry_link_en: string;
  cry_link_fi: string;
  level: EpistemicLevel;
}

export interface EvolutionPrediction {
  id: string;
  code: string;
  title_en: string;
  title_fi: string;
  title_ja: string;
  title_fr: string;
  title_ko: string;
  test_en: string;
  test_fi: string;
  test_ja: string;
  test_fr: string;
  test_ko: string;
  falsification_en: string;
  falsification_fi: string;
  falsification_ja: string;
  falsification_fr: string;
  falsification_ko: string;
  level: EpistemicLevel;
  timeframe: string;
}

export const CHI_SCALES: ChiScale[] = [
  {
    id: "molecular",
    label_en: "Molecular",
    label_fi: "Molekulaarinen",
    background_en: "FAD chromophore in CRY",
    background_fi: "FAD-kromofori CRY:ssä",
    perturbation_en: "Magnetic field",
    perturbation_fi: "Magneettikenttä",
    chi_expression: "χ([FAD])",
    at_zero_en: "No FAD → no radical pairs → no sensitivity",
    at_zero_fi: "Ei FAD:tä → ei radikaaliparia → ei herkkyyttä",
    at_max_en: "FAD-replete → full magnetic sensitivity",
    at_max_fi: "FAD kyllästetty → täysi magneettinen herkkyys",
    verification: "Hirano 2017, Yap 2025",
    referenceIds: ["hirano2017", "yap2025"],
    level: "E",
  },
  {
    id: "optical",
    label_en: "Optical",
    label_fi: "Optinen",
    background_en: "Blue light at CRY1 (iris transmission)",
    background_fi: "Sininen valo CRY1:ssä (iiriksen transmissio)",
    perturbation_en: "RF field",
    perturbation_fi: "RF-kenttä",
    chi_expression: "χ(I_blue)",
    at_zero_en: "Dark / brown iris → CRY1 inactive → no coupling",
    at_zero_fi: "Tumma / ruskea iiris → CRY1 inaktiivinen → ei kytkentää",
    at_max_en: "Blue iris + blue light → CRY1 maximally active",
    at_max_fi: "Sininen iiris + sininen valo → CRY1 maksimaalisesti aktiivinen",
    verification: "Higuchi 2007, Bartölke 2025",
    referenceIds: ["higuchi2007", "bartolke2025"],
    level: "M|C",
  },
  {
    id: "cellular",
    label_en: "Cellular membrane",
    label_fi: "Solukalvo",
    background_en: "Membrane potential V_mem ≈ −70 mV",
    background_fi: "Kalvopotentiaali V_mem ≈ −70 mV",
    perturbation_en: "External EMF",
    perturbation_fi: "Ulkoinen EMF",
    chi_expression: "χ(V_mem)",
    at_zero_en: "Dead cell (V_mem = 0) → no VGCC response",
    at_zero_fi: "Kuollut solu (V_mem = 0) → ei VGCC-vastetta",
    at_max_en: "Living cell → χ ≈ 1.0 → maximum sensitivity",
    at_max_fi: "Elävä solu → χ ≈ 1.0 → maksimaalinen herkkyys",
    verification: "Pall 2013 (23 VGCC blocker studies)",
    referenceIds: ["pall2013_v2"],
    level: "E",
  },
  {
    id: "environmental",
    label_en: "Environmental",
    label_fi: "Ympäristö",
    background_en: "Ambient EMF (electrification, base stations)",
    background_fi: "Ympäristön EMF (sähköistys, tukiasemat)",
    perturbation_en: "Personal devices (phone, earbuds)",
    perturbation_fi: "Henkilökohtaiset laitteet (puhelin, nappikuulokkeet)",
    chi_expression: "χ(Ā_ambient)",
    at_zero_en: "Unelectrified area → personal devices don't couple",
    at_zero_fi: "Sähköistämätön alue → henkilökohtaiset laitteet eivät kytkeydy",
    at_max_en: "Dense urban → personal devices fully coupled",
    at_max_fi: "Tiheä kaupunki → henkilökohtaiset laitteet täysin kytkeytyneitä",
    verification: "BERM 54-country dataset, electrification boundary",
    level: "M|C",
  },
  {
    id: "population",
    label_en: "Population (COVID test)",
    label_fi: "Populaatio (COVID-testi)",
    background_en: "Workplace ambient EMF",
    background_fi: "Työpaikan ympäristön EMF",
    perturbation_en: "Screen time",
    perturbation_fi: "Ruutuaika",
    chi_expression: "χ(Ā_office vs Ā_home)",
    at_zero_en: "WFH (low ambient) → screen time less coupled → baby bump",
    at_zero_fi: "Etätyö (matala ympäristö) → ruutuaika vähemmän kytkeytynyt → vauvapiikki",
    at_max_en: "Office (high ambient) → screen time fully coupled → TFR decline",
    at_max_fi: "Toimisto (korkea ympäristö) → ruutuaika täysin kytkeytynyt → TFR-lasku",
    verification: "PNAS 2023: +5.1% TFR for WFH women",
    level: "C",
  },
];

export const NORTHERN_TRAITS: NorthernTrait[] = [
  {
    id: "blue_eyes",
    trait_en: "Blue eyes (OCA2)",
    trait_fi: "Siniset silmät (OCA2)",
    gene: "OCA2/HERC2",
    mechanism_en: "Reduced melanin → 100× iris transmission → maximizes CRY1 blue-light activation in retinal blue cones",
    mechanism_fi: "Vähentynyt melaniini → 100× iiriksen transmissio → maksimoi CRY1:n sinisenvalon aktivaation verkkokalvon sinisissä tapeissa",
    cry_link_en: "Direct: iris transmission → CRY1 photon flux (optical χ scale)",
    cry_link_fi: "Suora: iiriksen transmissio → CRY1-fotonivuo (optinen χ-skaala)",
    level: "M|C",
  },
  {
    id: "lactose_tolerance",
    trait_en: "Lactose tolerance (LCT)",
    trait_fi: "Laktoosinsietokyky (LCT)",
    gene: "LCT −13910C>T",
    mechanism_en: "Adult milk digestion → year-round dairy → stable riboflavin (B2) supply → FAD for CRY chromophore",
    mechanism_fi: "Aikuisiän maidonsulatuskyky → ympärivuotinen maitotuote → vakaa riboflaviini (B2) -saanti → FAD CRY:n kromoforiksi",
    cry_link_en: "Nutritional: riboflavin → FAD → CRY stability and function (molecular χ scale)",
    cry_link_fi: "Ravitsemuksellinen: riboflaviini → FAD → CRY:n stabiilius ja toiminta (molekulaarinen χ-skaala)",
    level: "E",
  },
  {
    id: "cattle_husbandry",
    trait_en: "Cattle husbandry (cultural-genetic coevolution)",
    trait_fi: "Karjankasvatus (kulttuuris-geneettinen koevoluutio)",
    gene: "Cultural + LCT selection",
    mechanism_en: "Pastoralism selected for LCT; dairy provided B2 through winter when solar synthesis and foraging failed",
    mechanism_fi: "Paimentolaisuus valitsi LCT:tä; maitotuotteet tarjosivat B2:ta talvella kun auringon synteesi ja keräily eivät riittäneet",
    cry_link_en: "Environmental: winter B2 buffer sustaining CRY function in dark season",
    cry_link_fi: "Ympäristöllinen: talven B2-puskuri ylläpitäen CRY:n toimintaa pimeänä vuodenaikana",
    level: "M|C",
  },
];

export const HISTORICAL_PHASES: HistoricalPhase[] = [
  {
    id: "phase1",
    period: "10,000–6,000 BP",
    title_en: "Biological Optimization",
    title_fi: "Biologinen optimointi",
    description_en: "Northern Europeans evolve the highest biological χ values through co-selection of blue eyes (optical χ), lactose tolerance (molecular χ via B2/FAD), and cattle husbandry (year-round B2 supply). χ_env ≈ 0 (no electrification). TFR follows natural biological maximum (~6–7).",
    description_fi: "Pohjoiseuroppalaiset kehittävät korkeimmat biologiset χ-arvot sinisilmäisyyden (optinen χ), laktoosinsietokyvyn (molekulaarinen χ B2/FAD kautta) ja karjankasvatuksen (ympärivuotinen B2-saanti) koselektiolla. χ_env ≈ 0 (ei sähköistystä). TFR seuraa luonnollista biologista maksimia (~6–7).",
  },
  {
    id: "phase2",
    period: "1880–1960",
    title_en: "Electrification: χ_env Awakens",
    title_fi: "Sähköistys: χ_env herää",
    description_en: "Northern Europe electrifies first. The population with the HIGHEST biological χ values is FIRST to experience rising χ_env. The coupling function amplifies: high biological sensitivity × rising environmental EMF → first region below replacement TFR.",
    description_fi: "Pohjois-Eurooppa sähköistyy ensimmäisenä. Populaatio jolla on KORKEIMMAT biologiset χ-arvot kokee ENSIMMÄISENÄ nousevan χ_env:n. Kytkentäfunktio vahvistaa: korkea biologinen herkkyys × nouseva ympäristön EMF → ensimmäinen alue alle uusiutumistason TFR:n.",
  },
  {
    id: "phase3",
    period: "1990–2020",
    title_en: "Mobile Revolution: Differentiated Decline",
    title_fi: "Mobiilirevoluutio: eriytynyt lasku",
    description_en: "EMF globalizes via mobile phones. Population-specific χ profiles produce different decline patterns: East Asia (A-pathway dominant, high screen time), Northern Europe (A+C balanced), Africa (minimal coupling due to low χ_optical and χ_molecular).",
    description_fi: "EMF globalisoituu matkapuhelimien kautta. Populaatiokohtaiset χ-profiilit tuottavat erilaisia laskukaavoja: Itä-Aasia (A-polku hallitseva, korkea ruutuaika), Pohjois-Eurooppa (A+C tasapainoinen), Afrikka (minimaalinen kytkentä matalan χ_optisen ja χ_molekulaarisen vuoksi).",
  },
  {
    id: "phase4",
    period: "2020+",
    title_en: "The Convergence",
    title_fi: "Konvergenssi",
    description_en: "Africa electrifies rapidly. BERM predicts TFR decline follows but SLOWER than Northern Europe at equivalent χ_env, because biological χ values (optical and molecular) are lower. Sub-Saharan Africa's brown-eyed, lactose-intolerant population has less CRY coupling to amplify the environmental signal.",
    description_fi: "Afrikka sähköistyy nopeasti. BERM ennustaa TFR-laskun seuraavan mutta HITAAMMIN kuin Pohjois-Euroopassa vastaavalla χ_env:llä, koska biologiset χ-arvot (optinen ja molekulaarinen) ovat matalammat. Saharan eteläpuolisen Afrikan ruskesilmäinen, laktoosi-intolerantti populaatio kytkeytyy CRY:n kautta heikommin ympäristösignaaliin.",
  },
];

export const POPULATION_PROFILES: PopulationProfile[] = [
  {
    id: "amish",
    label_en: "Old Order Amish",
    label_fi: "Vanhan järjestyksen amissit",
    chi_env: "~0.1",
    chi_optical: "0.8–0.9",
    chi_molecular: "0.9",
    dominant_pathway: "C (but uncoupled)",
    observed_tfr: "~6.5",
    status_en: "Control: high biological χ, near-zero environmental χ → TFR at natural maximum",
    status_fi: "Kontrolli: korkea biologinen χ, lähes nolla ympäristön χ → TFR luonnollisessa maksimissa",
  },
  {
    id: "mennonite",
    label_en: "Conservative Mennonites",
    label_fi: "Konservatiiviset mennoniitit",
    chi_env: "~0.3–0.5",
    chi_optical: "0.7–0.8",
    chi_molecular: "0.8",
    dominant_pathway: "A+C (partial coupling)",
    observed_tfr: "~3.5–4.5",
    status_en: "Intermediate: similar biology to Amish but moderate EMF exposure → moderate TFR reduction",
    status_fi: "Välitaso: samanlainen biologia kuin amisseilla mutta kohtalainen EMF-altistus → kohtalainen TFR-lasku",
  },
  {
    id: "scandinavia",
    label_en: "Scandinavia",
    label_fi: "Skandinavia",
    chi_env: "0.8–0.9",
    chi_optical: "0.7–0.9",
    chi_molecular: "0.8–0.9",
    dominant_pathway: "A+C (fully coupled)",
    observed_tfr: "~1.5–1.7",
    status_en: "Maximum coupling: highest biological χ × highest environmental χ → deepest TFR decline",
    status_fi: "Maksimaalinen kytkentä: korkein biologinen χ × korkein ympäristön χ → syvin TFR-lasku",
  },
  {
    id: "south_korea",
    label_en: "South Korea",
    label_fi: "Etelä-Korea",
    chi_env: "0.9–1.0",
    chi_optical: "0.2–0.3",
    chi_molecular: "0.5–0.6",
    dominant_pathway: "A (VGIC dominant)",
    observed_tfr: "~0.7",
    status_en: "A-pathway extreme: low optical χ but extreme screen time and EMF density → TFR collapse via pathway A",
    status_fi: "A-polun ääriarvo: matala optinen χ mutta äärimmäinen ruutuaika ja EMF-tiheys → TFR-romahdus polun A kautta",
  },
  {
    id: "china",
    label_en: "Urban China",
    label_fi: "Kaupunki-Kiina",
    chi_env: "0.7–0.9",
    chi_optical: "0.2–0.3",
    chi_molecular: "0.4–0.5",
    dominant_pathway: "A (VGIC dominant)",
    observed_tfr: "~1.0",
    status_en: "Similar to South Korea but lower density → less extreme A-pathway decline",
    status_fi: "Samankaltainen kuin Etelä-Korea mutta matalampi tiheys → vähemmän äärimmäinen A-polun lasku",
  },
  {
    id: "sub_saharan_africa",
    label_en: "Sub-Saharan Africa",
    label_fi: "Saharan eteläpuolinen Afrikka",
    chi_env: "0.2–0.4",
    chi_optical: "0.05–0.1",
    chi_molecular: "0.3–0.4",
    dominant_pathway: "A (weak coupling)",
    observed_tfr: "~4.5",
    status_en: "Minimal coupling: low biological χ × low-moderate environmental χ → TFR still high, declining slowly",
    status_fi: "Minimaalinen kytkentä: matala biologinen χ × matala-kohtalainen ympäristön χ → TFR edelleen korkea, laskee hitaasti",
  },
];

export const EVOLUTION_PREDICTIONS: EvolutionPrediction[] = [
  {
    id: "hist1",
    code: "HIST-1",
    title_en: "Biomarker ratios predict fertility differentials",
    title_fi: "Biomarkkeritasot ennustavat hedelmällisyyseroja",
    title_ja: "バイオマーカー比が出生率格差を予測",
    title_fr: "Les ratios de biomarqueurs prédisent les différentiels de fertilité",
    title_ko: "바이오마커 비율이 출산율 차이를 예측",
    test_en: "In populations with high lactose tolerance AND blue/green eye prevalence, CRY-associated biomarkers (urinary 6-sulphatoxymelatonin, FAD/FMN ratio) should correlate more strongly with fertility outcomes than in populations lacking these traits.",
    test_fi: "Populaatioissa joissa on korkea laktoosinsietokyky JA sinisten/vihreiden silmien esiintyvyys, CRY-liitteiset biomarkkerit (virtsan 6-sulfatoksimelatoniini, FAD/FMN-suhde) korreloivat voimakkaammin hedelmällisyystulosten kanssa kuin populaatioissa ilman näitä piirteitä.",
    test_ja: "乳糖耐性が高くかつ青/緑色の目の有病率が高い集団では、CRY関連バイオマーカー（尿中6-スルファトキシメラトニン、FAD/FMN比）が、これらの形質を持たない集団よりも出生率転帰とより強く相関するはずである。",
    test_fr: "Dans les populations à haute tolérance au lactose ET à prévalence élevée d'yeux bleus/verts, les biomarqueurs associés à CRY (6-sulphatoxymélatonine urinaire, ratio FAD/FMN) devraient corréler plus fortement avec les résultats de fertilité que dans les populations dépourvues de ces traits.",
    test_ko: "유당 내성이 높고 파란/녹색 눈 유병률이 높은 집단에서 CRY 관련 바이오마커(소변 6-설파톡시멜라토닌, FAD/FMN 비율)는 이러한 형질이 없는 집단보다 출산 결과와 더 강하게 상관해야 한다.",
    falsification_en: "If blue-eyed, lactose-tolerant populations show NO stronger biomarker-fertility correlation than brown-eyed, lactose-intolerant populations, the Northern Package hypothesis is falsified.",
    falsification_fi: "Jos sinisilmäisissä, laktoosinsietokyvyn omaavissa populaatioissa EI ole voimakkaampaa biomarkkeri-hedelmällisyyskorrelaatiota kuin ruskeasilmäisissä, laktoosi-intoleranteissa populaatioissa, Pohjoinen paketti -hypoteesi on falsifioitu.",
    falsification_ja: "青い目で乳糖耐性のある集団が、茶色い目で乳糖不耐性の集団と比較してバイオマーカー-出生率相関が強くない場合、Northern Package仮説は反証される。",
    falsification_fr: "Si les populations aux yeux bleus et tolérantes au lactose ne montrent PAS de corrélation biomarqueur-fertilité plus forte que les populations aux yeux bruns et intolérantes au lactose, l'hypothèse du Northern Package est falsifiée.",
    falsification_ko: "파란 눈의 유당 내성 집단이 갈색 눈의 유당 불내성 집단보다 바이오마커-출산율 상관관계가 강하지 않으면 Northern Package 가설은 반증된다.",
    level: "L*",
    timeframe: "3–5 years",
  },
  {
    id: "hist2",
    code: "HIST-2",
    title_en: "Amish–Mennonite fertility gradient",
    title_fi: "Amissi–mennoniittigradientti hedelmällisyydessä",
    title_ja: "Amish-Mennonite出生率勾配",
    title_fr: "Gradient de fertilité Amish–Mennonite",
    title_ko: "Amish-Mennonite 출산율 기울기",
    test_en: "The TFR difference between Old Order Amish (~6.5) and Conservative Mennonites (~3.5–4.5) should correlate with measured EMF exposure differences, not with genetic, dietary, or cultural confounds alone.",
    test_fi: "TFR-ero vanhan järjestyksen amissien (~6,5) ja konservatiivisten mennoniittien (~3,5–4,5) välillä tulisi korreloida mitattujen EMF-altistuserojen kanssa, ei pelkästään geneettisten, ravitsemuksellisten tai kulttuuristen sekoittavien tekijöiden kanssa.",
    test_ja: "Old Order Amish（約6.5）とConservative Mennonite（約3.5〜4.5）のTFR差は、遺伝的・食事的・文化的交絡因子だけでなく、測定されたEMF曝露差と相関するはずである。",
    test_fr: "La différence de TFR entre les Amish traditionnels (~6,5) et les Mennonites conservateurs (~3,5–4,5) devrait corréler avec les différences d'exposition EMF mesurées, et non uniquement avec les facteurs confondants génétiques, alimentaires ou culturels.",
    test_ko: "Old Order Amish(약 6.5)와 Conservative Mennonite(약 3.5~4.5) 사이의 TFR 차이는 유전적, 식이적, 문화적 교란 요인만이 아닌 측정된 EMF 노출 차이와 상관해야 한다.",
    falsification_en: "If measured EMF exposure does not differ significantly between these groups, or if TFR differences are fully explained by other factors, the environmental χ coupling hypothesis is weakened.",
    falsification_fi: "Jos mitattu EMF-altistus ei eroa merkitsevästi näiden ryhmien välillä, tai TFR-erot selittyvät täysin muilla tekijöillä, ympäristön χ-kytkentähypoteesi heikentyy.",
    falsification_ja: "これらのグループ間でEMF曝露が有意に異ならない場合、またはTFR差が他の要因で完全に説明される場合、環境χ結合仮説は弱体化する。",
    falsification_fr: "Si l'exposition EMF mesurée ne diffère pas significativement entre ces groupes, ou si les différences de TFR sont entièrement expliquées par d'autres facteurs, l'hypothèse de couplage χ environnemental est affaiblie.",
    falsification_ko: "이 그룹 간 측정된 EMF 노출이 유의하게 다르지 않거나 TFR 차이가 다른 요인으로 완전히 설명되면 환경 χ 결합 가설은 약화된다.",
    level: "C",
    timeframe: "2–3 years",
  },
  {
    id: "hist3",
    code: "HIST-3",
    title_en: "COVID work-from-home baby bump mechanism",
    title_fi: "COVID-etätyön vauvapiikki-mekanismi",
    title_ja: "COVID在宅勤務ベビーブームメカニズム",
    title_fr: "Mécanisme du baby bump du télétravail COVID",
    title_ko: "COVID 재택근무 베이비붐 메커니즘",
    test_en: "The PNAS 2023 finding (+5.1% TFR for WFH women) should replicate specifically in populations with high χ_optical AND high pre-COVID χ_env. Populations with low optical χ (e.g., East Asia) should show smaller WFH baby bumps.",
    test_fi: "PNAS 2023 -löydös (+5,1 % TFR etätyöntekijänaisille) tulisi replikoitua erityisesti populaatioissa joilla on korkea χ_optinen JA korkea χ_env ennen COVIDia. Matalan optisen χ:n populaatioissa (esim. Itä-Aasia) vauvapiikkien tulisi olla pienempiä.",
    test_ja: "PNAS 2023の知見（在宅勤務女性でTFR +5.1%）は、高いχ_opticalかつ高いCOVID前χ_envの集団で特に再現されるはずである。光学的χが低い集団（例：東アジア）では在宅勤務ベビーブームはより小さいはずである。",
    test_fr: "La découverte du PNAS 2023 (+5,1 % de TFR pour les femmes en télétravail) devrait se répliquer spécifiquement dans les populations à χ_optique élevé ET χ_env pré-COVID élevé. Les populations à faible χ optique (ex. Asie de l'Est) devraient montrer des baby bumps de télétravail plus faibles.",
    test_ko: "PNAS 2023 발견(재택근무 여성의 TFR +5.1%)은 높은 χ_optical 및 높은 COVID 이전 χ_env를 가진 집단에서 특히 재현되어야 한다. 광학 χ가 낮은 집단(예: 동아시아)은 재택근무 베이비붐이 더 작아야 한다.",
    falsification_en: "If WFH baby bump is equal across populations regardless of χ profile, the coupling mechanism is not χ-dependent.",
    falsification_fi: "Jos etätyön vauvapiikki on yhtä suuri kaikissa populaatioissa riippumatta χ-profiilista, kytkentämekanismi ei ole χ-riippuvainen.",
    falsification_ja: "χプロファイルに関係なく在宅勤務ベビーブームが全集団で同等の場合、結合メカニズムはχ依存ではない。",
    falsification_fr: "Si le baby bump du télétravail est égal dans toutes les populations indépendamment du profil χ, le mécanisme de couplage n'est pas χ-dépendant.",
    falsification_ko: "χ 프로필과 관계없이 재택근무 베이비붐이 모든 집단에서 동일하면 결합 메커니즘은 χ 의존적이지 않다.",
    level: "C",
    timeframe: "1–3 years",
  },
  {
    id: "hist4",
    code: "HIST-4",
    title_en: "African TFR decline lag prediction",
    title_fi: "Afrikan TFR-laskun viive-ennuste",
    title_ja: "アフリカTFR低下ラグ予測",
    title_fr: "Prédiction du décalage de déclin du TFR africain",
    title_ko: "아프리카 TFR 감소 지연 예측",
    test_en: "As Sub-Saharan Africa electrifies, TFR decline should follow but at a SLOWER rate per unit χ_env increase compared to Northern Europe's historical trajectory. The predicted lag factor is 0.3–0.5× (based on the ratio of biological χ values).",
    test_fi: "Saharan eteläpuolisen Afrikan sähköistyessä TFR-laskun tulisi seurata mutta HITAAMMIN χ_env-yksikköä kohden verrattuna Pohjois-Euroopan historialliseen kehityskulkuun. Ennustettu viivekerroin on 0,3–0,5× (biologisten χ-arvojen suhteella).",
    test_ja: "サハラ以南アフリカの電化に伴いTFR低下は続くが、北欧の歴史的軌跡と比較してχ_env増加単位当たりのペースはより遅いはずである。予測ラグ係数は0.3〜0.5×（生物学的χ値の比に基づく）。",
    test_fr: "À mesure que l'Afrique subsaharienne s'électrifie, le déclin du TFR devrait suivre mais à un rythme PLUS LENT par unité d'augmentation de χ_env comparé à la trajectoire historique de l'Europe du Nord. Le facteur de décalage prédit est de 0,3–0,5× (basé sur le ratio des valeurs biologiques de χ).",
    test_ko: "사하라 이남 아프리카가 전화됨에 따라 TFR 감소는 뒤따르되 북유럽의 역사적 궤적에 비해 χ_env 증가 단위당 더 느린 속도여야 한다. 예측 지연 계수는 0.3~0.5×(생물학적 χ 값의 비율 기준)이다.",
    falsification_en: "If Africa's TFR decline rate matches or exceeds Northern Europe's at equivalent electrification levels, the biological χ modulation hypothesis is falsified.",
    falsification_fi: "Jos Afrikan TFR-laskuvauhti vastaa tai ylittää Pohjois-Euroopan vastaavaa samoilla sähköistystasoilla, biologisen χ-modulaation hypoteesi on falsifioitu.",
    falsification_ja: "アフリカのTFR低下率が同等の電化レベルで北欧と同等以上の場合、生物学的χ調節仮説は反証される。",
    falsification_fr: "Si le taux de déclin du TFR de l'Afrique égale ou dépasse celui de l'Europe du Nord à des niveaux d'électrification équivalents, l'hypothèse de modulation biologique χ est falsifiée.",
    falsification_ko: "아프리카의 TFR 감소율이 동등한 전화 수준에서 북유럽과 같거나 초과하면 생물학적 χ 조절 가설은 반증된다.",
    level: "L*",
    timeframe: "10–20 years",
  },
  {
    id: "hist5",
    code: "HIST-5",
    title_en: "Lactose intolerance as EMF resistance factor",
    title_fi: "Laktoosi-intoleranssi EMF-resistenssitekijänä",
    title_ja: "乳糖不耐性がEMF抵抗因子として機能",
    title_fr: "L'intolérance au lactose comme facteur de résistance aux EMF",
    title_ko: "유당 불내성이 EMF 저항 인자로 작용",
    test_en: "Within the same EMF environment, lactose-intolerant individuals should show lower CRY-mediated biomarker responses (melatonin suppression, circadian disruption) than lactose-tolerant individuals with similar diets supplemented with B2.",
    test_fi: "Samassa EMF-ympäristössä laktoosi-intoleranttien yksilöiden tulisi osoittaa matalampia CRY-välitteisiä biomarkkerivastteita (melatoniinin suppressio, sirkadiaaninen häiriö) kuin laktoosinsietokykyisten yksilöiden vastaavilla B2-täydennetyillä ruokavalioilla.",
    test_ja: "同一EMF環境内で、乳糖不耐性の個人はB2を補充した類似の食事を持つ乳糖耐性の個人よりも低いCRY媒介バイオマーカー応答（メラトニン抑制、概日リズム障害）を示すはずである。",
    test_fr: "Dans le même environnement EMF, les individus intolérants au lactose devraient montrer des réponses biomarqueurs médiées par CRY plus faibles (suppression de la mélatonine, perturbation circadienne) que les individus tolérants au lactose avec des régimes similaires supplémentés en B2.",
    test_ko: "동일한 EMF 환경에서 유당 불내성 개인은 B2가 보충된 유사한 식단을 가진 유당 내성 개인보다 낮은 CRY 매개 바이오마커 반응(멜라토닌 억제, 일주기 리듬 장애)을 보여야 한다.",
    falsification_en: "If lactose tolerance status has no effect on CRY-mediated biomarkers when B2 intake is controlled, the nutritional χ pathway is independent of lactase persistence.",
    falsification_fi: "Jos laktoosinsietokykystatuksella ei ole vaikutusta CRY-välitteisiin biomarkkereihin kun B2-saanti on kontrolloitu, ravitsemuksellinen χ-polku on riippumaton laktaasipersistenssistä.",
    falsification_ja: "B2摂取量を制御した場合に乳糖耐性ステータスがCRY媒介バイオマーカーに影響しなければ、栄養χ経路はラクターゼ持続性から独立している。",
    falsification_fr: "Si le statut de tolérance au lactose n'a aucun effet sur les biomarqueurs médiés par CRY lorsque l'apport en B2 est contrôlé, la voie χ nutritionnelle est indépendante de la persistance de la lactase.",
    falsification_ko: "B2 섭취를 통제했을 때 유당 내성 상태가 CRY 매개 바이오마커에 영향이 없으면 영양 χ 경로는 유당분해효소 지속성과 독립적이다.",
    level: "L*",
    timeframe: "2–4 years",
  },
];
