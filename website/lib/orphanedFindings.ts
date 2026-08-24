export interface OrphanedFinding {
  year: string;
  researcher: string;
  findingEn: string;
  findingFi: string;
  criticismEn: string;
  criticismFi: string;
  mechanismEn: string;
  mechanismFi: string;
}

export const ORPHANED_FINDINGS: readonly OrphanedFinding[] = [
  {
    year: "1976",
    researcher: "Adey-Blackman",
    findingEn: "Ca²⁺ window effect",
    findingFi: "Ca²⁺ ikkunailmiö",
    criticismEn: "\"Non-linear = artifact\"",
    criticismFi: "\"Ei-lineaarinen = artefakti\"",
    mechanismEn: "Resonance oscillation (Kim 2026)",
    mechanismFi: "Resonanssi-oskillaatio (Kim 2026)",
  },
  {
    year: "1995",
    researcher: "Lai-Singh",
    findingEn: "DNA strand breaks",
    findingFi: "DNA-katkokset",
    criticismEn: "\"Photon too weak\"",
    criticismFi: "\"Liian heikko fotoni\"",
    mechanismEn: "ROS via VGCC/IFO (Panagopoulos 2025)",
    mechanismFi: "ROS via VGCC/IFO (Panagopoulos 2025)",
  },
  {
    year: "2013",
    researcher: "Pall",
    findingEn: "VGCC: 23 studies",
    findingFi: "VGCC: 23 tutkimusta",
    criticismEn: "\"Too simple\"",
    criticismFi: "\"Liian yksinkertainen\"",
    mechanismEn: "3 pathways: IFO + RPM + Cyb5b",
    mechanismFi: "3 reittiä: IFO + RPM + Cyb5b",
  },
  {
    year: "2025",
    researcher: "Sousouri",
    findingEn: "CACNA1C × 5G",
    findingFi: "CACNA1C × 5G",
    criticismEn: "\"Sample too small\"",
    criticismFi: "\"Liian pieni otos\"",
    mechanismEn: "Genetic VGCC density variation",
    mechanismFi: "Geneettinen VGCC-tiheysvaihtelu",
  },
  {
    year: "2026",
    researcher: "Kim",
    findingEn: "Gene switch activation",
    findingFi: "Geenikytkimen aktivaatio",
    criticismEn: "\"Incredibly implausible\"",
    criticismFi: "\"Incredibly implausible\"",
    mechanismEn: "Lindgren's χ(Ā) saturation",
    mechanismFi: "Lindgrenin χ(Ā) saturaatio",
  },
] as const;

export const ORPHANED_COMMENTARY = {
  en: {
    title: "Orphaned Findings: Data Without a Mechanism",
    p1: "In each case, the empirical observation was strong — often published in top-tier journals (Cell, NeuroImage, Bioelectromagnetics). The criticism targeted not the data but the mechanism: how could such weak fields produce biological effects? This 'implausibility argument' is not a scientific rebuttal — it is an argument from ignorance that confuses 'we don't know the mechanism' with 'there is no mechanism.'",
    p2: "Lindgren's susceptibility function χ(Ā) resolves all five cases simultaneously. The membrane electric field (~10⁷ V/m) creates a susceptibility that is already near saturation. Ion channel voltage sensors, conserved for 3 billion years (Zakon 2012), operate at quantum-limit sensitivity — like the eye's photoreceptor. An external field of 10⁻⁵ V/m is to the ion channel what a single photon is to the retina: individually tiny, but detectable because the sensor evolved to detect exactly this.",
    note: "Epistemic level: [L] (Lindgren's interpretation) combined with [E]-level empirical findings.",
  },
  fi: {
    title: "Hylätyt havainnot: data ilman mekanismia",
    p1: "Jokaisessa tapauksessa empiirinen havainto oli vahva — usein julkaistu huipputason lehdissä (Cell, NeuroImage, Bioelectromagnetics). Kritiikki ei kohdistunut dataan vaan MEKANISMIIN: miten niin heikot kentät voivat tuottaa biologisia vaikutuksia? Tämä \"epäuskottavuusargumentti\" ei ole tieteellinen kumoaminen — se on argumentti tietämättömyydestä, joka sekoittaa \"emme tunne mekanismia\" ja \"mekanismia ei ole.\"",
    p2: "Lindgrenin susceptibiliteettifunktio χ(Ā) ratkaisee kaikki viisi tapausta samanaikaisesti. Solukalvon sähkökenttä (~10⁷ V/m) luo susceptibiliteetin joka on jo lähellä saturaatiota. Ionikanavan jännitesensorit, jotka ovat säilyneet 3 miljardia vuotta (Zakon 2012), toimivat kvanttirajan herkkyydellä — kuten silmän fotoreseptori. Ulkoinen kenttä 10⁻⁵ V/m on ionikanavalle sama kuin yksittäinen fotoni verkkokalvolle: yksittäin pieni, mutta havaittavissa koska sensori kehittyi havaitsemaan juuri tämän.",
    note: "Episteeminen taso: [L] (Lindgrenin tulkinta) yhdistettynä [E]-tason empiirisiin havaintoihin.",
  },
} as const;
