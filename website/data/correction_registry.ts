/**
 * Correction registry for the mechanism chain (synthesis §19).
 *
 * Fixes the epistemic status of every claim in the chain
 *   Lindgren metric → δg_μν → bound-ion Hamiltonian → phase modulation
 *   → Jacobi–Anger → Bessel sidebands → amplitude windows
 *   → relaxation candidate → calmodulin connection.
 *
 * It extends, and does not replace, the tensor-derivation contracts
 * MAXWELL_DERIVATION_CONTRACT (Pattern A) and CHI_EPISTEMIC_STATUS (Pattern B)
 * in lib/model/lindgren.ts.
 */

export type CorrectionStatus =
  | "algebraic_consequence"
  | "conditional_derivation"
  | "candidate_assumption"
  | "numerical_compatibility"
  | "observation"
  | "open_question";

export type MechanismEpistemicLevel =
  | "L1"
  | "KANDIDAATTI"
  | "NUMEERINEN YHTEENSOPIVUUS"
  | "HAVAINTO"
  | "AVOIN";

export interface LocalizedText {
  en: string;
  fi: string;
}

export interface CorrectionEntry {
  id: string;
  claim: LocalizedText;
  status: CorrectionStatus;
  description: LocalizedText;
  epistemicLevel: MechanismEpistemicLevel;
  conditions?: LocalizedText[];
  source?: string;
  referenceIds?: string[];
  note?: LocalizedText;
}

export const CORRECTION_STATUS_LABELS: Record<CorrectionStatus, LocalizedText> = {
  algebraic_consequence: { en: "Algebraic consequence", fi: "Algebrallinen seuraus" },
  conditional_derivation: { en: "Conditional derivation", fi: "Ehdollinen johto" },
  candidate_assumption: { en: "Candidate assumption", fi: "Kandidaatin oletus" },
  numerical_compatibility: { en: "Numerical compatibility", fi: "Numeerinen yhteensopivuus" },
  observation: { en: "Observation", fi: "Havainto" },
  open_question: { en: "Open question", fi: "Avoin kysymys" },
};

export const MECHANISM_LEVEL_LABELS: Record<MechanismEpistemicLevel, LocalizedText> = {
  L1: { en: "L1 — follows from the declared ansatz", fi: "L1 — seuraa annetusta ansatzista" },
  KANDIDAATTI: { en: "Candidate — added assumption, not derived", fi: "Kandidaatti — lisäoletus, ei johdettu" },
  "NUMEERINEN YHTEENSOPIVUUS": { en: "Numerical compatibility — not a measurement", fi: "Numeerinen yhteensopivuus — ei mittaus" },
  HAVAINTO: { en: "Observation — measured under stated conditions", fi: "Havainto — mitattu ilmoitetuissa oloissa" },
  AVOIN: { en: "Open", fi: "Avoin" },
};

export const CORRECTION_REGISTRY: CorrectionEntry[] = [
  {
    id: "metric_cross_terms_2omega",
    claim: { en: "Metric cross terms and the 2ω component", fi: "Metriikan ristitermit ja 2ω" },
    status: "algebraic_consequence",
    description: {
      en: "Algebraic consequence of the declared ansatz: with A = Ā + a cos ωt, the product AμAν carries a cross term at ω and a squared term at 2ω.",
      fi: "Algebrallinen seuraus annetusta ansatzista: kun A = Ā + a cos ωt, tulo AμAν sisältää ristitermin taajuudella ω ja neliötermin taajuudella 2ω.",
    },
    epistemicLevel: "L1",
    source: "synthesis §10",
  },
  {
    id: "bessel_sidebands",
    claim: { en: "Bessel sidebands", fi: "Bessel-sivukaistat" },
    status: "conditional_derivation",
    description: {
      en: "Conditional derivation from a sinusoidally modulated energy gap: the phase integral gives exp[iz sin ωt] = Σ J_k(z) e^{ikωt} (Jacobi–Anger). The same structure arises in any driven two-level system and is not specific to the metric ansatz.",
      fi: "Ehdollinen johto sinimuotoisesti moduloidusta energiavälistä: vaiheintegraali antaa exp[iz sin ωt] = Σ J_k(z) e^{ikωt} (Jacobi–Anger). Sama rakenne syntyy missä tahansa ajetussa kaksitilajärjestelmässä eikä ole spesifinen metriikan ansatzille.",
    },
    epistemicLevel: "L1",
    conditions: [
      { en: "the bound states exist", fi: "tilojen olemassaolo" },
      { en: "the states mix", fi: "sekoitus" },
      { en: "phase memory is long enough", fi: "riittävä vaihemuisti" },
      { en: "a measurable readout mechanism exists", fi: "mitattava lukumekanismi" },
    ],
    referenceIds: ["ashhab2007_driven_two_level"],
  },
  {
    id: "bound_mode_qm_separation",
    claim: { en: "Bound-mode q/m separation", fi: "Sidottujen moodien q/m-erotus" },
    status: "conditional_derivation",
    description: {
      en: "Result in the isotropic harmonic binding model: the reference frequency f_c = |q|B₀/(2πm) separates bound modes by charge-to-mass ratio.",
      fi: "Tulos isotrooppisen harmonisen sidonnan mallissa: vertailutaajuus f_c = |q|B₀/(2πm) erottaa sidotut moodit varaus/massa-suhteen mukaan.",
    },
    epistemicLevel: "L1",
    conditions: [{ en: "isotropic binding", fi: "isotrooppinen sidonta" }],
    referenceIds: ["engstrom2004_ion_resonances"],
  },
  {
    id: "c_equals_gamma",
    claim: { en: "c = γ", fi: "c = γ" },
    status: "candidate_assumption",
    description: {
      en: "Additional assumption of the candidate, not a constant fixed by Lindgren's ansatz.",
      fi: "Kandidaatin lisäoletus, ei Lindgrenistä määrätty vakio.",
    },
    epistemicLevel: "KANDIDAATTI",
    note: {
      en: "Chosen so that the high-frequency limit of λ equals 2; not a universal constant.",
      fi: "Valittu jotta korkean taajuuden raja on 2; ei universaali vakio.",
    },
  },
  {
    id: "calmodulin_17_6_ms",
    claim: { en: "The 17.6 ms calmodulin connection", fi: "17,6 ms kalmoduliiniyhteys" },
    status: "numerical_compatibility",
    description: {
      en: "Value obtained by demanding the IPR argument coefficient s = 2 in reverse; it is not an independent measurement.",
      fi: "IPR-kertoimen yhteensopivuusehdosta käänteisesti laskettu arvo; ei itsenäinen mittaustulos.",
    },
    epistemicLevel: "NUMEERINEN YHTEENSOPIVUUS",
    note: {
      en: "Not an independent measurement; ~1 % from the measured 20 ms. Motivates the receptor-structure test, nothing more.",
      fi: "Ei itsenäinen mittaustulos; ~1 % ero mitattuun 20 ms:iin. Motivoi reseptorin rakennetestiä, ei enempää.",
    },
  },
  {
    id: "calmodulin_20_ms",
    claim: { en: "Calmodulin 20 ms", fi: "Kalmoduliinin 20 ms" },
    status: "observation",
    description: {
      en: "Measured time constant of the N-terminal conformational change under a chemical Ca²⁺ step in a microfluidic mixer.",
      fi: "Rakennemuutoksen mitattu aikavakio N-terminaalisessa osassa kemiallisessa Ca²⁺-askeleessa mikrofluidisekoittimessa.",
    },
    epistemicLevel: "HAVAINTO",
    source: "Park et al. 2008",
    referenceIds: ["park2008_calmodulin_kinetics"],
    note: {
      en: "N-terminal domain, chemical conditions; not a magnetic-field response and does not identify calmodulin as an EMF receptor.",
      fi: "N-terminaalinen osa, kemialliset olosuhteet; ei magneettikenttävaste eikä osoita kalmoduliinia EMF-reseptoriksi.",
    },
  },
  {
    id: "one_percent_argument_match",
    claim: { en: "~1 % match of the argument coefficients", fi: "~1 % osuma argumenttikertoimiin" },
    status: "numerical_compatibility",
    description: {
      en: "Comparison of s = λ·f_c/f = 2.020 against the IPR coefficient 2; not the accuracy of a raw-data model.",
      fi: "Vertailu s = λ·f_c/f = 2,020 vastaan IPR-kerroin 2; ei raakadatamallin tarkkuus.",
    },
    epistemicLevel: "NUMEERINEN YHTEENSOPIVUUS",
  },
  {
    id: "blackman_r2_085",
    claim: { en: "R² = 0.85", fi: "R² = 0,85" },
    status: "observation",
    description: {
      en: "Fit statistic of Blackman's published extended model to the calcium-efflux data.",
      fi: "Blackmanin julkaistun laajennetun mallin sovitusluku kalsiumefluksidataan.",
    },
    epistemicLevel: "HAVAINTO",
    source: "Blackman et al.",
    referenceIds: ["blackman1985"],
  },
  {
    id: "gap_165_hz",
    claim: { en: "The 165 Hz gap", fi: "165 Hz:n aukko" },
    status: "open_question",
    description: {
      en: "Two non-significant results; not a confirmed Bessel null.",
      fi: "Kaksi ei-merkitsevää koetulosta; ei varmistettu Bessel-nolla.",
    },
    epistemicLevel: "AVOIN",
  },
  {
    id: "tfr_attribution",
    claim: { en: "TFR attribution share", fi: "TFR-vaikutusosuus" },
    status: "open_question",
    description: {
      en: "The mechanism work does not yet determine a population attribution. Layer 3 and 4 transfer coefficients have not been estimated; no TFR figure is produced from the receptor layer.",
      fi: "Mekanismityö ei vielä määritä väestöllistä vaikutusosuutta. Kerrosten 3 ja 4 siirtokertoimia ei ole arvioitu; reseptorikerroksesta ei tuoteta TFR-lukua.",
    },
    epistemicLevel: "AVOIN",
    note: { en: "Layer 3–4 transfer coefficients not estimated.", fi: "Kerros 3–4 siirtokertoimia ei arvioitu." },
  },
];

/**
 * Wording register (source document §7).
 *
 * The source document states of this table: "Ne eivät ole sivustolle tehtyjä
 * muutoksia" — these are not changes made to the site. A check on 2026-09-07
 * found none of the left-column claims on the site. The register is kept as
 * documentation of the standard this research chain holds itself to: the
 * superseded wording on the left is what the evidence does NOT support, and
 * the right-hand wording is what it does.
 *
 * Several entries narrow the model rather than strengthening it. That is the
 * point: the register exists because earlier formulations were too broad.
 */
export interface WordingEntry {
  id: string;
  /** The over-broad formulation the evidence does not support. */
  superseded: LocalizedText;
  /** The formulation now justified. */
  justified: LocalizedText;
  /** Finding numbers in the source document. */
  findings: string;
}

export const WORDING_REGISTER: WordingEntry[] = [
  {
    id: "study_count",
    superseded: { en: "530 studies confirm a reproductive effect.", fi: "530 tutkimusta vahvistaa lisääntymisvaikutusta." },
    justified: {
      en: "A re-analysed genotoxicity map of 530 publications locates technology and design differences.",
      fi: "Uudelleenanalysoitu 530 julkaisun genotoksisuuskartta paikantaa teknologia- ja asetelmaeroja.",
    },
    findings: "01–03",
  },
  {
    id: "umts_weak",
    superseded: { en: "UMTS is biologically weak.", fi: "UMTS on biologisesti heikko." },
    justified: {
      en: "UMTS publications reported fewer DNA effects; differences in the real signal and in the endpoint have to be separated.",
      fi: "UMTS-julkaisuissa raportoitiin vähemmän DNA-vaikutuksia; todellisen signaalin ja päätepisteen erot on eroteltava.",
    },
    findings: "02–04",
  },
  {
    id: "chronic_animals",
    superseded: { en: "Present-day animals do not respond because of prior exposure.", fi: "Nykyeläimet eivät reagoi aiemman altistuksen vuoksi." },
    justified: {
      en: "No general temporal attenuation was found; the effect of measured history needs a baseline-plus-additional-response test.",
      fi: "Yleistä ajallista vaimenemista ei löytynyt; mitatun historian vaikutus tarvitsee lähtötaso–lisävaste-testin.",
    },
    findings: "05, 13, 50",
  },
  {
    id: "background_amplifies",
    superseded: { en: "The background makes the RF effect larger through cross products.", fi: "Tausta tekee RF-vaikutuksesta ristitulojen kautta suuremman." },
    justified: {
      en: "The cross products follow from the premise; their time average and the receptor's projection decide which driver survives.",
      fi: "Ristitulot seuraavat premissistä; niiden aikakeskiarvo ja vastaanottimen projektio määräävät säilyvän ajurin.",
    },
    findings: "08–11",
  },
  {
    id: "chi_saturation",
    superseded: { en: "χ saturation removes the additional effect.", fi: "χ:n kyllästyminen poistaa lisävaikutuksen." },
    justified: {
      en: "The limit of the additional effect depends on whether the biology reads F, χ or another quantity.",
      fi: "Lisävaikutuksen raja riippuu siitä, lukeeko biologia F:ää, χ:tä vai muuta suuretta.",
    },
    findings: "12",
  },
  {
    id: "ipr_coefficient",
    superseded: { en: "Lindgren leads directly to the IPR coefficient two.", fi: "Lindgren johtaa suoraan IPR:n kertoimen kaksi." },
    justified: {
      en: "Phase modulation yields the Bessel structure; the coupling and the AC/DC sensitivity ratio need a separate derivation.",
      fi: "Vaihemodulaatio johtaa Bessel-rakenteen; kytkentä ja AC/DC-herkkyyssuhde tarvitsevat erillisen johdon.",
    },
    findings: "15–18",
  },
  {
    id: "calmodulin_17_6",
    superseded: { en: "17.6 ms is a confirmation measured from biophysics.", fi: "17,6 ms on biofysiikasta mitattu vahvistus." },
    justified: {
      en: "17.6 ms is a reverse-calculated compatibility; Park's roughly 20 ms is a chemical relaxation measured in a different experiment.",
      fi: "17,6 ms on käänteislaskettu yhteensopivuus; Parkin noin 20 ms on eri kokeessa mitattu kemiallinen relaksaatio.",
    },
    findings: "19",
  },
  {
    id: "resonance_25_4",
    superseded: { en: "25.4 Hz is the calcium resonance of cells.", fi: "25,4 Hz on solujen kalsiumresonanssi." },
    justified: {
      en: "The peak is reported in a particular membrane-vesicle and static-field setup; transfer to radiofrequency-exposed cells is a test hypothesis.",
      fi: "Huippu on raportoitu tietyssä kalvovesikkeli- ja tasakenttäasetelmassa; RF-solusiirto on testihypoteesi.",
    },
    findings: "20, 25",
  },
  {
    id: "eight_percent",
    superseded: { en: "8% modulation is enough for UMTS.", fi: "8 %:n modulaatio riittää UMTS:lle." },
    justified: {
      en: "7.997% concerns the power fundamental on the same carrier; the equivalent field AM is about 4.002%. Changing the carrier changes the condition.",
      fi: "7,997 % koskee tehon perustaajuutta samalla kantajalla; vastaava kenttä-AM on noin 4,002 %. Kantajan vaihto muuttaa ehdon.",
    },
    findings: "26–27",
  },
  {
    id: "spectrum_recovery",
    superseded: { en: "The biological driver can be recovered from the RF spectrum.", fi: "RF-spektristä voi palauttaa biologisen ajurin." },
    justified: {
      en: "The RF power spectrum does not by itself identify the slow intensity spectrum; phase or time-trace information is needed.",
      fi: "RF-tehospektri ei yksin yksilöi hidasta intensiteettispektriä; vaihe- tai aikajälkitieto tarvitaan.",
    },
    findings: "28",
  },
  {
    id: "nr_window",
    superseded: { en: "NR does not hit the response window.", fi: "NR ei osu vasteikkunaan." },
    justified: {
      en: "An exactly repeating 10 ms signal through a stable path produces no 25 Hz line. Other NR traffic is a different case.",
      fi: "Täsmälleen toistuva 10 ms:n signaali vakaan siirtotien läpi ei tuota 25 Hz:n viivaa. Muu NR-liikenne on eri tapaus.",
    },
    findings: "29",
  },
  {
    id: "umts_predicted",
    superseded: { en: "The strong UMTS responses have now been predicted.", fi: "UMTS:n voimakkaat vasteet on nyt ennustettu." },
    justified: {
      en: "The ordering switch for ideal signals has been calculated; ordering tests on real experiments number zero.",
      fi: "Ideaalisten signaalien järjestyksen vaihtuminen on laskettu; todellisten kokeiden järjestystestejä on tehty nolla.",
    },
    findings: "26, 31–33",
  },
  {
    id: "twenty_hour_memory",
    superseded: { en: "The 20-hour memory is chronic damage.", fi: "20 tunnin muisti on kroonista vauriota." },
    justified: {
      en: "In one UMTS setup a radiofrequency pre-treatment changed a later chemical response protectively across an interval of about 20 hours.",
      fi: "Yhdessä UMTS-asetelmassa RF-esikäsittely muutti myöhempää kemiallista vastetta suojaavasti noin 20 tunnin välin yli.",
    },
    findings: "35",
  },
  {
    id: "general_sensor",
    superseded: { en: "ATG or CRY has been shown to be a general EMF sensor.", fi: "ATG tai CRY on osoitettu yleiseksi EMF-sensoriksi." },
    justified: {
      en: "The interventions locate necessary parts of the mechanism in defined cell models and exposure classes.",
      fi: "Interventiot paikantavat välttämättömiä mekanismin osia määritellyissä solumalleissa ja altistusluokissa.",
    },
    findings: "36–40, 49",
  },
  {
    id: "hsp70_mediates",
    superseded: { en: "HSP70 mediates the bystander effect.", fi: "HSP70 välittää sivullisvaikutuksen." },
    justified: {
      en: "Protection transferred by culture medium has been reported; HSP70 is a candidate mediator.",
      fi: "Kasvatusnesteen siirtämä suoja on raportoitu; HSP70 on välittäjäehdokas.",
    },
    findings: "38",
  },
  {
    id: "field_free_sham",
    superseded: { en: "A field-free sham is always best.", fi: "Kentätön sham on aina paras." },
    justified: {
      en: "The artificial exposure is removed while documenting the geomagnetic background; a hypomagnetic condition can itself change cell function.",
      fi: "Keinotekoinen altiste poistetaan geomagneettista taustaa dokumentoiden; hypomagneettisuus voi itse muuttaa solutoimintaa.",
    },
    findings: "41",
  },
  {
    id: "normal_semen",
    superseded: {
      en: "Normal semen parameters rule out a biological problem.",
      fi: "Normaalit siemennesteparametrit sulkevat pois biologisen ongelman.",
    },
    justified: {
      en: "Hyperactivation, CatSper function and fertilisation endpoints can differ from the baseline parameters.",
      fi: "Hyperaktivaatio, CatSper-toiminta ja hedelmöityspäätepisteet voivat erota perustason parametreista.",
    },
    findings: "44–46",
  },
  {
    id: "sentinels_locate",
    superseded: { en: "Sentinels and drug responses locate the EMF cause.", fi: "Sentinellit ja lääkevasteet paikantavat EMF-syyn." },
    justified: {
      en: "They bound cultural explanations and cellular routes; EMF's share requires an exposure-specific contrast.",
      fi: "Ne rajaavat kulttuurisia selityksiä ja solureittejä; EMF:n osuus vaatii altistekohtaisen kontrastin.",
    },
    findings: "48, 51–52",
  },
];
