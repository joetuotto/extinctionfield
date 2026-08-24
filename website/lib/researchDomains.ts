export interface ResearchDomain {
  n: string;
  t: string;
  d: string;
}

export const RESEARCH_DOMAINS: Record<"en" | "fi", readonly ResearchDomain[]> = {
  en: [
    { n: "01", t: "Oncology", d: "TTFields (FDA-approved): 100–300 kHz fields disrupt cell division. Novocure, clinical trials." },
    { n: "02", t: "Orthopedics", d: "PEMF bone stimulators (FDA 1986): pulsed EMF accelerates bone healing. 30+ years of clinical use." },
    { n: "03", t: "Neurology", d: "TMS, tDCS, VNS, DBS: non-thermal EMF devices treat depression, epilepsy, Parkinson's. 160,000+ implanted DBS devices." },
    { n: "04", t: "Quantum biology", d: "Radical-pair/CRY mechanism (RPM): bird magnetoreception via cryptochrome. Sherrard 2018: pulsed EMF produces ROS CRY-dependently." },
    { n: "05", t: "Cell biology", d: "IFO-VGIC (Panagopoulos 2025): ion forced oscillation via voltage-gated calcium channels. Threshold 10⁻⁵ V/m." },
    { n: "06", t: "Non-ionotropic VGCC", d: "Trus et al. 2024 (Hebrew U.): VGCC activates intracellular signaling via conformational change WITHOUT ion flux." },
    { n: "07", t: "Entomology", d: "Bee-EMF data: Favre & Johansson 2025, Hallmann 2017, Thielens 2018. Bee piping, insect decline, RF absorption." },
    { n: "08", t: "Parasitology", d: "England 2023: ticks attracted to hosts electrostatically. Biological activity of static fields." },
    { n: "09", t: "Geometric physics", d: "Lindgren metric: 87.5% of RPM Hamiltonian elements derivable from geometry. Predicts background and angle dependence." },
    { n: "10", t: "Electroecology", d: "Bristol (Clarke, Robert, England, Mallinson): aerial electroreception, bee electric communication, anthropogenic fields −71% bee landings." },
  ],
  fi: [
    { n: "01", t: "Onkologia", d: "TTFields (FDA-hyväksytty): 100–300 kHz kentät häiritsevät solunjakautumista. Novocure, kliiniset kokeet." },
    { n: "02", t: "Ortopedia", d: "PEMF-luunstimulaattorit (FDA 1986): pulssimuotoinen EMF kiihdyttää luun paranemista. 30+ vuoden kliininen käyttö." },
    { n: "03", t: "Neurologia", d: "TMS, tDCS, VNS, DBS: ei-termiset EMF-laitteet hoitavat masennusta, epilepsiaa, Parkinsonia. 160 000+ implantoitua DBS-laitetta." },
    { n: "04", t: "Kvanttbiologia", d: "Radikaalipari/CRY-mekanismi (RPM): lintujen magneettiaisti perustuu kryptokromiin. Sherrard 2018: pulssi-EMF tuottaa ROS:ia CRY-riippuvaisesti." },
    { n: "05", t: "Solubiologia", d: "IFO-VGIC (Panagopoulos 2025): ionien pakotettu oskillaatio jänniteohjattujen kalsiumkanavien kautta. Kynnys 10⁻⁵ V/m." },
    { n: "06", t: "Ei-ionotrooppinen VGCC", d: "Trus ym. 2024 (Hebr. yliopisto): VGCC aktivoi solunsisäisiä signaalireittejä konformaatiomuutoksella ILMAN ionifluksia." },
    { n: "07", t: "Entomologia", d: "Mehiläis-EMF-data: Favre & Johansson 2025, Hallmann 2017, Thielens 2018. Mehiläisten piping, hyönteiskato, RF-absorptio." },
    { n: "08", t: "Parasitologia", d: "England 2023: punkit vedetään isäntiin sähköstaattisesti. Staattisten kenttien biologinen aktiivisuus." },
    { n: "09", t: "Geometrinen fysiikka", d: "Lindgren-metriikka: 87,5 % RPM-Hamiltoniaanin elementeistä johdettavissa geometriasta. Ennustaa tausta- ja kulmariippuvuuden." },
    { n: "10", t: "Sähköekologia", d: "Bristol (Clarke, Robert, England, Mallinson): ilman sähköreseptio, mehiläisten sähköinen viestintä, antropogeeniset kentät −71 % mehiläislaskeutumisia." },
  ],
} as const;
