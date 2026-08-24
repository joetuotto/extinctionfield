export interface FertilityRoute {
  id: string;
  color: string;
  nameEn: string;
  nameFi: string;
  mechanismEn: string;
  mechanismFi: string;
  blockedByEn: string;
  blockedByFi: string;
  organLinks: string[];
  isNew: boolean;
}

export const FERTILITY_ROUTES: FertilityRoute[] = [
  {
    id: "gonadal",
    color: "#EF4444",
    nameEn: "Gonadal (Routes A + D)",
    nameFi: "Gonadaalinen (reitit A + D)",
    mechanismEn: "EMF → Cav3/Cav1 in testes/ovaries → Ca²⁺ → sperm damage + testosterone decline",
    mechanismFi: "EMF → Cav3/Cav1 kiveksissä/munasarjoissa → Ca²⁺ → siittiövaurio + testosteronin lasku",
    blockedByEn: "T-type blocker (ethosuximide), L-type blocker (nifedipine)",
    blockedByFi: "T-tyypin salpaaja (etosuksimidi), L-tyypin salpaaja (nifedipiini)",
    organLinks: ["testes"],
    isNew: false,
  },
  {
    id: "circadian",
    color: "#3B82F6",
    nameEn: "Circadian (Route C)",
    nameFi: "Sirkadiaaninen (reitti C)",
    mechanismEn: "EMF → CRY in retina → circadian disruption → melatonin ↓ → HPG ↓",
    mechanismFi: "EMF → CRY retinassa → sirkadiaaninen häiriö → melatoniini ↓ → HPG ↓",
    blockedByEn: "Blue-light filter, melatonin supplementation, darkness",
    blockedByFi: "Sinivalosuodatin, melatoniinilisä, pimeys",
    organLinks: ["eye"],
    isNew: false,
  },
  {
    id: "pituitary",
    color: "#8B5CF6",
    nameEn: "Pituitary (NEW)",
    nameFi: "Hypofyysireitti (UUSI)",
    mechanismEn: "EMF → Cav3 in gonadotroph → FSH/LH pulse disruption (OUTSIDE BBB)",
    mechanismFi: "EMF → Cav3 gonadotroopissa → FSH/LH-pulssin häiriö (BBB:n ULKOPUOLELLA)",
    blockedByEn: "T-type blocker (systemic)",
    blockedByFi: "T-tyypin salpaaja (systeeminen)",
    organLinks: ["pituitary"],
    isNew: true,
  },
  {
    id: "autonomic",
    color: "#10B981",
    nameEn: "Autonomic (NEW)",
    nameFi: "Autonominen (UUSI)",
    mechanismEn: "EMF → SA node Cav3 → HRV ↓ → sympathetic dominance → HPA → cortisol → HPG ↓",
    mechanismFi: "EMF → SA-solmun Cav3 → HRV ↓ → sympaattinen dominanssi → HPA → kortisoli → HPG ↓",
    blockedByEn: "Vagal stimulation, HRV biofeedback",
    blockedByFi: "Vagaalistimulaatio, HRV-biopalaute",
    organLinks: ["heart"],
    isNew: true,
  },
];
