/**
 * Bounded empirical scopes for a one-gain BERM endpoint calibration.
 * The 2025 geometry Δg=κ(A⊗b+b⊗A+b⊗b) still needs an open conditional
 * tissue kernel. These downstream observations constrain a declared T closure;
 * they do not identify geometry, physical source amplitudes, lag or recovery.
 * No raw observations or assay corrections are created by this registry.
 */
import { indexedReference } from "./referenceIndex";

export interface BiomarkerCalibrationText { fi: string; en: string }
export interface BiomarkerCalibrationPeriod { startYear: number; endYear: number }
export interface BiomarkerCalibrationSource {
  id: string;
  title: string;
  url: string;
  referenceId?: string;
  verification: BiomarkerCalibrationText;
}
export interface BermBiomarkerCalibrationProtocol {
  id: string;
  seriesId: string;
  countryId: "FIN" | "USA";
  biomarker: "testosterone_total";
  statistic: "median" | "arithmetic_mean" | "adjusted_mean";
  status: "eligible" | "insufficient-compatible-periods";
  eligiblePeriods: BiomarkerCalibrationPeriod[];
  excludedPeriods: (BiomarkerCalibrationPeriod & { reason: BiomarkerCalibrationText })[];
  anchorPeriod: BiomarkerCalibrationPeriod | null;
  /** Latest compatible period endpoint; does not add future observations. */
  defaultThroughYear: number;
  fitParameterIds: ["betaT"];
  uncertaintyUse: "display-only";
  scope: BiomarkerCalibrationText;
  limitations: BiomarkerCalibrationText[];
  sources: BiomarkerCalibrationSource[];
  independentHoldout: false;
}

const text = (fi: string, en: string): BiomarkerCalibrationText => ({ fi, en });
const period = (startYear: number, endYear = startYear): BiomarkerCalibrationPeriod => ({ startYear, endYear });
function sourceUrl(referenceId: string): string {
  const reference=indexedReference(referenceId);
  if(reference?.linkStatus!=="verified"||!reference.externalUrl)throw new Error(`Missing verified biomarker reference: ${referenceId}`);
  return reference.externalUrl;
}
const common = {
  biomarker: "testosterone_total" as const,
  fitParameterIds: ["betaT"] as ["betaT"],
  uncertaintyUse: "display-only" as const,
  independentHoldout: false as const,
};
const commonLimits = [
  text("Sovitetaan vain βT valittuun, lukittuun BERM-kanavaan. Lähdeasteikko, viive, muisti, palautuminen ja muu biologinen tila pysyvät ilmoitettuina oletuksina.", "Fit only βT for the selected, frozen BERM channel. Source scale, delay, memory, recovery and other biological state remain declared assumptions."),
  text("Kaksi vertailukelpoista pistettä antaa yhden lähtötasosta riippuvan kontrastin; sama aineisto ei ole riippumaton testijoukko.", "Two compatible points supply one baseline-dependent contrast; the same data are not an independent test set."),
  text("Julkaistut välit ja keskivirheet näytetään havaintojen yhteydessä. Niistä ei rakenneta kalibroinnin luottamusväliä ilman yhteismitallisuus- ja virhemallia.", "Published intervals and standard errors remain observation annotations. They do not generate a calibration confidence interval without a comparability and error model."),
];
const finSource: BiomarkerCalibrationSource = {
  id: "perheentupa2013", title: "Perheentupa et al. 2013, Table 1 and methods",
  referenceId: "perheentupa2013", url: sourceUrl("perheentupa2013"),
  verification: text("Alkuperäisen artikkelin PDF-teksti ja taulukko luettu. 60–69-vuotiaiden kohortit varmistuvat abstraktista; kalenterivuodet johdetaan tutkimusvuoden, iän ja syntymäkohortin leikkauksesta.", "Original article PDF text and table read. The abstract confirms the age-60–69 cohorts; calendar years follow from the survey-year, age and birth-cohort intersection."),
};

export const BERM_BIOMARKER_CALIBRATION_PROTOCOLS: BermBiomarkerCalibrationProtocol[] = [
  {
    ...common, id: "finrisk-60-69-single-year-medians-v1", seriesId: "fi-finrisk-testosterone-60-69", countryId: "FIN", statistic: "median", status: "eligible",
    eligiblePeriods: [period(1977), period(2002)], excludedPeriods: [], anchorPeriod: period(1977), defaultThroughYear: 2002,
    scope: text("FINRISK 60–69-vuotiaiden erilliset ikä–syntymäkohorttisolut, 1977 ja 2002. Yhden vuoden mediaanien ehdollinen suhdesovitus; ei Suomen kaikkien miesten trendiestimaatti.", "Separate FINRISK age/birth-cohort cells at ages 60–69, 1977 and 2002. Conditional ratio fit to single-year medians, not a national trend estimate for all Finnish men."),
    limitations: [
      text("21,9 ja 13,8 nmol/l; n=130 ja 23. Sama laaja ikäluokka ei takaa samaa ikäjakaumaa. Mediaanit eivät ole BMI-vakioituja.", "21.9 and 13.8 nmol/L; n=130 and 23. The same broad age bin does not ensure the same age distribution. The medians are not BMI-adjusted."),
      text("5.–95. persentiilit kuvaavat yksilöjakaumaa, eivät mediaanin luottamusväliä. Positiivisen kertoimen soveltaminen mediaaniin olettaa ryhmän kaikille yksilöille saman suhteellisen vasteen.", "The 5th–95th percentiles describe individual variation, not uncertainty in the median. Multiplying a median assumes a common positive proportional response within the group."),
      ...commonLimits,
    ], sources: [finSource],
  },
  {
    ...common, id: "finrisk-25-29-pooled-median-boundary-v1", seriesId: "fi-finrisk-testosterone-25-29", countryId: "FIN", statistic: "median", status: "insufficient-compatible-periods",
    eligiblePeriods: [period(2002)], anchorPeriod: period(2002), defaultThroughYear: 2002,
    excludedPeriods: [{ ...period(1972, 1977), reason: text("Varhaisen mediaanin mahdolliset keräysvuodet ovat {1972,1977}. Pooled-mediaani ei ole vuosimediaanien keskiarvo; nykyinen sulku ei tunnista tätä aggregointia.", "The early median's possible collection years are {1972,1977}. A pooled median is not the mean of annual medians; the current closure does not identify this aggregation.") }],
    scope: text("FINRISK 25–29-vuotiaiden mediaanit. Vuoden 2002 havainto voi ankkuroida ehdollisen käyrän, mutta yksi yhteismitallinen piste ei tunnista βT:tä.", "FINRISK medians at ages 25–29. The 2002 observation can anchor a conditional curve, but one compatible point cannot identify βT."),
    limitations: [text("Varhaista solua ei korvata vuoden 1974,5 tai 1975 mittauksella eikä sen persentiileistä johdeta epävarmuuspainoja.", "The earlier cell is not replaced by a 1974.5 or 1975 measurement, and its percentiles are not converted to uncertainty weights."), ...commonLimits],
    sources: [finSource],
  },
  {
    ...common, id: "nhanes-15-39-compatible-2013-2016-v1", seriesId: "us-nhanes-testosterone-15-39", countryId: "USA", statistic: "arithmetic_mean", status: "eligible",
    eligiblePeriods: [period(2013, 2014), period(2015, 2016)], anchorPeriod: period(2013, 2014), defaultThroughYear: 2016,
    excludedPeriods: [
      ...[period(1999, 2000), period(2003, 2004)].map(p => ({ ...p, reason: text("Varhaiset immunomääritysjaksot eivät ole tämän protokollan 2013–16 massaspektrometria-asteikolla. Julkaistuun taulukkosarjaan ei lisätä varmentamatonta menetelmäkorjausta.", "The earlier immunoassay periods are outside this protocol's 2013–16 mass-spectrometry scale. No unverified assay correction is added to the published table series.") })),
      { ...period(2011, 2012), reason: text("CDC edellyttää 2011–12:n ja 2013–14:n välisen menetelmäsillan huomiointia. Lokeshwarin julkaistun 2011–12-keskiarvon korjaustilaa ei varmennettu; arvoa ei korjata toistamiseen tai oleteta harmonisoiduksi.", "CDC requires accounting for the 2011–12/2013–14 assay bridge. The correction status of Lokeshwar's published 2011–12 mean was not verified; it is neither corrected again nor assumed harmonized.") },
    ],
    scope: text("USA:n 15–39-vuotiaiden kuvailevat otospainotetut keskiarvot vuosilta 2013–14 ja 2015–16. Näiden kahden jakson menetelmäasteikko on sama; ikä/BMI-koostumusta ei ole vakioitu.", "Descriptive survey-weighted US means at ages 15–39 for 2013–14 and 2015–16. These periods share the assay scale; age/BMI composition is not standardized."),
    limitations: [
      text("431,76 ja 451,22 ng/dl (SE 7,19 ja 10,03; n=1241 ja 1168). Jälkimmäinen arvo on suurempi; βT:n etumerkkiä ei pakoteta laskua tuottavaksi.", "431.76 and 451.22 ng/dL (SE 7.19 and 10.03; n=1241 and 1168). The later value is higher; βT is not forced to imply a decline."),
      text("Jakson mallikeskiarvo käyttää ilmoitettua vuosipainotusta; tasaiset kalenterivuosipainot ovat erillinen oletus ilman otosvuosipainoja.", "The model period mean uses declared annual weights; equal calendar-year weights are a separate assumption when sample-year weights are unavailable."),
      ...commonLimits,
    ],
    sources: [
      { id: "lokeshwar2021", referenceId: "lokeshwar2021", title: "Lokeshwar et al. 2021, Table 1", url: sourceUrl("lokeshwar2021"), verification: text("Alkuperäisen hyväksytyn artikkelin taulukko ja menetelmät luettu; arvot säilyvät julkaistuina. Vuoden 2011–12 bridge-korjauksen käyttö ei varmistunut.", "Original accepted article table and methods read; published values are preserved. Application of the 2011–12 bridging correction was not verified.") },
      { id: "cdc-tst-h-assay-bridge", title: "CDC NHANES TST_H: 2013–14 assay bridge", url: "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2013/DataFiles/TST_H.htm", verification: text("Koko codebook tarkistettu: 139 näytteen menetelmävertailu; varhaisen menetelmän TST_H-tulokset on jo muunnettu uuteen asteikkoon.", "Full codebook checked: a 139-specimen method comparison; old-method TST_H results were already converted to the new scale.") },
      { id: "cdc-tst-i-stable-assay", title: "CDC NHANES TST_I: 2015–16 methodology", url: "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2015/DataFiles/TST_I.htm", verification: text("Codebook ilmoittaa, ettei menetelmässä, laitteessa tai laboratoriossa tapahtunut muutosta vuoden 2015–16 jaksolla.", "The codebook reports no laboratory method, equipment or site change in the 2015–16 cycle.") },
    ],
  },
  {
    ...common, id: "nhanes-nyante-adjusted-periods-v1", seriesId: "us-nhanes-testosterone-fully-adjusted", countryId: "USA", statistic: "adjusted_mean", status: "eligible",
    eligiblePeriods: [period(1988, 1991), period(1999, 2004)], excludedPeriods: [], anchorPeriod: period(1988, 1991), defaultThroughYear: 2004,
    scope: text("Nyanten vähintään 20-vuotiaiden miesten NHANES-vertailu; molemmilla jaksoilla sama määritys ja sama monimuuttujavakiointi. Vastemuutos koskee vakioitua keskiarvoa.", "Nyante's NHANES comparison of men aged 20 or older; the same assay and multivariable adjustment in both periods. Response change concerns the adjusted mean."),
    limitations: [
      text("5,37 ja 5,34 ng/ml; n=1413 ja 902. Vakiointi: ikä, etnisyys, BMI, vyötärö, tupakointi ja alkoholi. Tätä ei yhdistetä nuorten miesten vakioimattomaan sarjaan.", "5.37 and 5.34 ng/mL; n=1413 and 902. Adjustment: age, race/ethnicity, BMI, waist, smoking and alcohol. Do not pool this with the unadjusted young-male series."),
      text("Vakioitu jaksoestimaatti on malliin tuotu standardoitu tunnusluku. Tasaiset kalenterivuosipainot eivät toisinna tutkimuksen yksilöpainotettua vakiointia.", "The adjusted period estimate is an imported standardized statistic. Equal calendar-year weights do not reproduce the study's individual-level weighted adjustment."),
      ...commonLimits,
    ],
    sources: [{ id: "nyante2012", referenceId: "nyante2012_nhanes", title: "Nyante et al. 2012, Tables 1–2 and assay methods", url: sourceUrl("nyante2012_nhanes"), verification: text("Ensimmäisen aineistopoiminnan aikana koko alkuperäinen käsikirjoitus ja taulukon 2 T-rivi varmennettiin; rivin lähdehash ja poiminta ovat repossa.", "The full original manuscript and Table 2 testosterone row were verified during the initial extraction; the source hash and extracted row are held in the repository.") }],
  },
];

export function getBermBiomarkerCalibrationProtocol(seriesId: string): BermBiomarkerCalibrationProtocol | undefined {
  return BERM_BIOMARKER_CALIBRATION_PROTOCOLS.find(protocol => protocol.seriesId === seriesId);
}
