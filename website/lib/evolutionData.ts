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
  test_en: string;
  test_fi: string;
  falsification_en: string;
  falsification_fi: string;
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
    test_en: "In populations with high lactose tolerance AND blue/green eye prevalence, CRY-associated biomarkers (urinary 6-sulphatoxymelatonin, FAD/FMN ratio) should correlate more strongly with fertility outcomes than in populations lacking these traits.",
    test_fi: "Populaatioissa joissa on korkea laktoosinsietokyky JA sinisten/vihreiden silmien esiintyvyys, CRY-liitteiset biomarkkerit (virtsan 6-sulfatoksimelatoniini, FAD/FMN-suhde) korreloivat voimakkaammin hedelmällisyystulosten kanssa kuin populaatioissa ilman näitä piirteitä.",
    falsification_en: "If blue-eyed, lactose-tolerant populations show NO stronger biomarker-fertility correlation than brown-eyed, lactose-intolerant populations, the Northern Package hypothesis is falsified.",
    falsification_fi: "Jos sinisilmäisissä, laktoosinsietokyvyn omaavissa populaatioissa EI ole voimakkaampaa biomarkkeri-hedelmällisyyskorrelaatiota kuin ruskeasilmäisissä, laktoosi-intoleranteissa populaatioissa, Pohjoinen paketti -hypoteesi on falsifioitu.",
    level: "L*",
    timeframe: "3–5 years",
  },
  {
    id: "hist2",
    code: "HIST-2",
    title_en: "Amish–Mennonite fertility gradient",
    title_fi: "Amissi–mennoniittigradientti hedelmällisyydessä",
    test_en: "The TFR difference between Old Order Amish (~6.5) and Conservative Mennonites (~3.5–4.5) should correlate with measured EMF exposure differences, not with genetic, dietary, or cultural confounds alone.",
    test_fi: "TFR-ero vanhan järjestyksen amissien (~6,5) ja konservatiivisten mennoniittien (~3,5–4,5) välillä tulisi korreloida mitattujen EMF-altistuserojen kanssa, ei pelkästään geneettisten, ravitsemuksellisten tai kulttuuristen sekoittavien tekijöiden kanssa.",
    falsification_en: "If measured EMF exposure does not differ significantly between these groups, or if TFR differences are fully explained by other factors, the environmental χ coupling hypothesis is weakened.",
    falsification_fi: "Jos mitattu EMF-altistus ei eroa merkitsevästi näiden ryhmien välillä, tai TFR-erot selittyvät täysin muilla tekijöillä, ympäristön χ-kytkentähypoteesi heikentyy.",
    level: "C",
    timeframe: "2–3 years",
  },
  {
    id: "hist3",
    code: "HIST-3",
    title_en: "COVID work-from-home baby bump mechanism",
    title_fi: "COVID-etätyön vauvapiikki-mekanismi",
    test_en: "The PNAS 2023 finding (+5.1% TFR for WFH women) should replicate specifically in populations with high χ_optical AND high pre-COVID χ_env. Populations with low optical χ (e.g., East Asia) should show smaller WFH baby bumps.",
    test_fi: "PNAS 2023 -löydös (+5,1 % TFR etätyöntekijänaisille) tulisi replikoitua erityisesti populaatioissa joilla on korkea χ_optinen JA korkea χ_env ennen COVIDia. Matalan optisen χ:n populaatioissa (esim. Itä-Aasia) vauvapiikkien tulisi olla pienempiä.",
    falsification_en: "If WFH baby bump is equal across populations regardless of χ profile, the coupling mechanism is not χ-dependent.",
    falsification_fi: "Jos etätyön vauvapiikki on yhtä suuri kaikissa populaatioissa riippumatta χ-profiilista, kytkentämekanismi ei ole χ-riippuvainen.",
    level: "C",
    timeframe: "1–3 years",
  },
  {
    id: "hist4",
    code: "HIST-4",
    title_en: "African TFR decline lag prediction",
    title_fi: "Afrikan TFR-laskun viive-ennuste",
    test_en: "As Sub-Saharan Africa electrifies, TFR decline should follow but at a SLOWER rate per unit χ_env increase compared to Northern Europe's historical trajectory. The predicted lag factor is 0.3–0.5× (based on the ratio of biological χ values).",
    test_fi: "Saharan eteläpuolisen Afrikan sähköistyessä TFR-laskun tulisi seurata mutta HITAAMMIN χ_env-yksikköä kohden verrattuna Pohjois-Euroopan historialliseen kehityskulkuun. Ennustettu viivekerroin on 0,3–0,5× (biologisten χ-arvojen suhteella).",
    falsification_en: "If Africa's TFR decline rate matches or exceeds Northern Europe's at equivalent electrification levels, the biological χ modulation hypothesis is falsified.",
    falsification_fi: "Jos Afrikan TFR-laskuvauhti vastaa tai ylittää Pohjois-Euroopan vastaavaa samoilla sähköistystasoilla, biologisen χ-modulaation hypoteesi on falsifioitu.",
    level: "L*",
    timeframe: "10–20 years",
  },
  {
    id: "hist5",
    code: "HIST-5",
    title_en: "Lactose intolerance as EMF resistance factor",
    title_fi: "Laktoosi-intoleranssi EMF-resistenssitekijänä",
    test_en: "Within the same EMF environment, lactose-intolerant individuals should show lower CRY-mediated biomarker responses (melatonin suppression, circadian disruption) than lactose-tolerant individuals with similar diets supplemented with B2.",
    test_fi: "Samassa EMF-ympäristössä laktoosi-intoleranttien yksilöiden tulisi osoittaa matalampia CRY-välitteisiä biomarkkerivastteita (melatoniinin suppressio, sirkadiaaninen häiriö) kuin laktoosinsietokykyisten yksilöiden vastaavilla B2-täydennetyillä ruokavalioilla.",
    falsification_en: "If lactose tolerance status has no effect on CRY-mediated biomarkers when B2 intake is controlled, the nutritional χ pathway is independent of lactase persistence.",
    falsification_fi: "Jos laktoosinsietokykystatuksella ei ole vaikutusta CRY-välitteisiin biomarkkereihin kun B2-saanti on kontrolloitu, ravitsemuksellinen χ-polku on riippumaton laktaasipersistenssistä.",
    level: "L*",
    timeframe: "2–4 years",
  },
];
