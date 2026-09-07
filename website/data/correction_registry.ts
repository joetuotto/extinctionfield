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
