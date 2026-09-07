/**
 * Discriminating experiments for the mechanism candidate (synthesis §18).
 *
 * Every test is an OPEN TEST: none has been run. A Bessel-structure test that
 * succeeds is compatible with phase modulation; it is not specific to the
 * metric ansatz (synthesis §17). A Lindgren-specific test needs a prediction
 * whose scale, direction or multi-wave dependence is computed from the ansatz
 * and differs from a competing model at the same biological parameters.
 */

import type { LocalizedText } from "./correction_registry";

export interface DiscriminatingTest {
  id: string;
  name: LocalizedText;
  prediction: LocalizedText;
  discriminates: LocalizedText;
  parameters: {
    independent: string[];
    dependent: string[];
    controlled: string[];
  };
  epistemicLevel: "AVOIN TESTI";
  /** true only when a positive result would separate the ansatz from ordinary driven systems */
  lindgrenSpecific: boolean;
  caveat?: LocalizedText;
  /** null results already on record for this test's endpoint class */
  nullResultReferenceIds?: string[];
}

export const DISCRIMINATING_TESTS: DiscriminatingTest[] = [
  {
    id: "freq_B0_shift",
    name: { en: "Frequency and B₀ together", fi: "Taajuus ja B₀ yhdessä" },
    prediction: {
      en: "Normalised amplitude nodes (b_null/B₀) shift with λ(f, τ) when f and B₀ are varied jointly.",
      fi: "Normalisoidut solmut (b_null/B₀) siirtyvät λ(f, τ):n mukana kun f ja B₀ vaihtelevat yhdessä.",
    },
    discriminates: { en: "Finite τ versus a fixed IPR argument", fi: "Äärellinen τ vs. kiinteä IPR-argumentti" },
    parameters: { independent: ["f", "B0"], dependent: ["b_null_normalized"], controlled: ["ion", "preparation", "exposure time"] },
    epistemicLevel: "AVOIN TESTI",
    lindgrenSpecific: false,
  },
  {
    id: "receptor_structure",
    name: { en: "Receptor conformational change", fi: "Reseptorin rakennemuutos" },
    prediction: {
      en: "An independently measured τ predicts the amplitude-window shift.",
      fi: "Itsenäisesti mitattu τ ennustaa amplitudi-ikkunan siirtymän.",
    },
    discriminates: {
      en: "Same biological coordinate versus a mere time-scale analogy",
      fi: "Sama biologinen koordinaatti vai pelkkä aikaskaala-analogia",
    },
    parameters: { independent: ["tau_measured"], dependent: ["amplitude_window_shift"], controlled: ["ion", "B0", "f"] },
    epistemicLevel: "AVOIN TESTI",
    lindgrenSpecific: false,
  },
  {
    id: "two_freq_phase",
    name: { en: "Two-frequency phase", fi: "Kahden taajuuden vaihe" },
    prediction: {
      en: "The response depends on the relative phase of two drives at equal total power and spectrum.",
      fi: "Vaste riippuu kahden ajon suhteellisesta vaiheesta samalla kokonaisteholla ja spektrillä.",
    },
    discriminates: { en: "Interference versus spectral power alone", fi: "Interferenssi vs. pelkkä spektriteho" },
    parameters: { independent: ["f1", "f2", "phase_difference"], dependent: ["response_amplitude"], controlled: ["total_power", "ion", "preparation"] },
    epistemicLevel: "AVOIN TESTI",
    lindgrenSpecific: true,
  },
  {
    id: "selective_blockade",
    name: { en: "Selective blockade", fi: "Selektiivinen salpaus" },
    prediction: {
      en: "The response disappears at a defined point in the chain when that point is blocked.",
      fi: "Vaste katoaa määrätyssä kohdassa ketjua kun kohta salvataan.",
    },
    discriminates: { en: "Channel, store or downstream transduction", fi: "Kanava, varasto vai alavirran välitys" },
    parameters: { independent: ["blocker_type", "blocker_target"], dependent: ["response_suppression"], controlled: ["f", "B0", "b", "exposure time"] },
    epistemicLevel: "AVOIN TESTI",
    lindgrenSpecific: false,
  },
  {
    id: "isotope_exchange",
    name: { en: "Isotope exchange", fi: "Isotoopinvaihto" },
    prediction: {
      en: "The frequency scale shifts by the defined mass effect: f_c ∝ 1/m at fixed charge.",
      fi: "Taajuusskaala siirtyy määritellyn massavaikutuksen mukaan: f_c ∝ 1/m kiinteällä varauksella.",
    },
    discriminates: { en: "Ion-mass interpretation versus another receptor", fi: "Ionimassatulkinta vs. muu reseptori" },
    parameters: { independent: ["isotope_mass"], dependent: ["f_c_shift"], controlled: ["chemistry", "concentration", "endpoint"] },
    epistemicLevel: "AVOIN TESTI",
    lindgrenSpecific: false,
    caveat: {
      en: "Hydrogen-isotope exchange can change kinetics through routes other than mass.",
      fi: "Vetyisotooppien vaihto voi muuttaa kinetiikkaa muutenkin kuin massan kautta.",
    },
  },
  {
    id: "dose_recovery",
    name: { en: "Dose and recovery", fi: "Annos ja palautuminen" },
    prediction: {
      en: "One common recovery law across different exposure schedules.",
      fi: "Yhteinen palautumislaki eri altistusjaksoissa.",
    },
    discriminates: { en: "Acute adaptation versus slower biological change", fi: "Akuutti mukautuminen vs. hitaampi biologinen muutos" },
    parameters: { independent: ["exposure_duration", "recovery_time"], dependent: ["response_magnitude"], controlled: ["f", "B0", "b", "preparation"] },
    epistemicLevel: "AVOIN TESTI",
    lindgrenSpecific: false,
  },
];

/** Null results the candidate must carry alongside the open tests (synthesis §16). */
export const NULL_RESULTS_IN_SCOPE = [
  {
    referenceId: "gavoci2013_ipr_k_null",
    endpoint: { en: "TEA-sensitive outward K⁺ currents, BE(2)C", fi: "TEA-herkät ulospäin K⁺-virrat, BE(2)C" },
    reading: {
      en: "Fields at K⁺ IPR conditions did not change the currents. A tissue-specific coupling offered to absorb this needs its own independent measurement; a free coefficient set to zero per exception would remove the model's predictive content.",
      fi: "K⁺:n IPR-ehtoihin asetetut kentät eivät muuttaneet virtoja. Sen selittämiseen tarjottu kudoskohtainen kytkentä tarvitsee oman itsenäisen mittarinsa; poikkeuksittain nollaksi asetettu vapaa kerroin poistaisi mallin ennustusvoiman.",
    },
  },
] as const;
