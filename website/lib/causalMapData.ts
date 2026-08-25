export type EpistemicLevel = "E" | "M|C" | "C" | "L";
export type Locale = "en" | "fi";

export interface BilingualText {
  en: string;
  fi: string;
}

export interface LocalizedDetail {
  mechanism: string;
  fdaDevice?: string;
  prediction?: string;
}

export interface NodeDetail {
  en: LocalizedDetail;
  fi: LocalizedDetail;
  bermPathway?: string;
  keyRefs?: string[];
  link?: string;
}

export interface CausalMapNode {
  id: string;
  level: number;
  label: BilingualText;
  sublabel?: BilingualText;
  color?: string;
  epistemicLevel: EpistemicLevel;
  cascadeOrder?: number;
  detail?: NodeDetail;
}

export interface CausalMapEdge {
  from: string;
  to: string;
  label?: string;
}

export const LEVEL_LABELS: Record<Locale, Record<number, string>> = {
  en: {
    [-1]: "Electrification boundary",
    0: "Environment channels",
    1: "Modulation layers",
    2: "Biological mechanisms",
    3: "Tissue effects",
    4: "Disease cascade",
    5: "Demographic cascade",
    6: "Ecological branch",
  },
  fi: {
    [-1]: "Sähköistymiskynnys",
    0: "Ympäristökanavat",
    1: "Modulaatiotasot",
    2: "Biologiset mekanismit",
    3: "Kudosvaikutukset",
    4: "Sairauskaskadi",
    5: "Demografinen kaskadi",
    6: "Ekologinen haara",
  },
};

export { MAP_EPISTEMIC_COLORS as EPISTEMIC_COLORS, MAP_EPISTEMIC_LABELS as EPISTEMIC_LABELS } from "./epistemicConstants";

export const NODES: CausalMapNode[] = [
  // ── LEVEL 0: Environment channels (4) ──
  {
    id: "ch_static", level: 0,
    label: { en: "STATIC (0 Hz)", fi: "STATIC (0 Hz)" },
    sublabel: { en: "Polyester, triboelectric", fi: "Polyesteri, tribosähkö" },
    color: "#6B7280", epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "Triboelectric charge at the interface of synthetic textiles and skin produces a persistent DC field in the gonadal region.",
        fdaDevice: "DC bone stimulators (PMA 1986)",
        prediction: "Antistatic treatment eliminates the reproductive effect",
      },
      fi: {
        mechanism: "Tribosähköinen varaus synteettisten tekstiilien ja ihon rajapinnalla tuottaa pysyvän DC-kentän gonadien alueelle.",
        fdaDevice: "DC luunstimulaattorit (PMA 1986)",
        prediction: "Antistaattinen käsittely poistaa lisääntymisvaikutuksen",
      },
      bermPathway: "STATIC_TRIBO_INTERFACE",
      keyRefs: ["shafik1992", "england_2023_ticks"],
      link: "/evidence#static-interface",
    },
  },
  {
    id: "ch_elf", level: 0,
    label: { en: "ELF (< 1 kHz)", fi: "ELF (< 1 kHz)" },
    sublabel: { en: "Power grid, motors, EV", fi: "Sähköverkko, moottorit, EV" },
    color: "#3B82F6", epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "50/60 Hz alternating current and its harmonics perturb membrane potential. The field drops across the cell membrane (H(f) low-pass filtering).",
        fdaDevice: "PEMF (PMA 1979), TMS (510k 2008), tDCS (PMA 2025), VNS (510k 2017), DBS (PMA 1997), SCS (PMA)",
        prediction: "Electricity consumption per capita correlates with autoimmune diseases",
      },
      fi: {
        mechanism: "50/60 Hz vaihtovirta ja sen harmoniset perturbovat kalvopotentiaalia. Kenttä putoaa solukalvon yli (H(f) alipäästösuodatus).",
        fdaDevice: "PEMF (PMA 1979), TMS (510k 2008), tDCS (PMA 2025), VNS (510k 2017), DBS (PMA 1997), SCS (PMA)",
        prediction: "Sähkönkulutus/cap korreloi autoimmuunisairauksien kanssa",
      },
      bermPathway: "Pathways A, D, E, F",
      keyRefs: ["pemf_adenosine_cadossi2020", "panagopoulos2025"],
      link: "/evidence#elf-channel",
    },
  },
  {
    id: "ch_if", level: 0,
    label: { en: "IF (1k–1M Hz)", fi: "IF (1k–1M Hz)" },
    sublabel: { en: "LED lighting, HVAC, induction", fi: "LED-valaistus, HVAC, induktioliedet" },
    color: "#F59E0B", epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "Switch-mode power supply 20–300 kHz fields penetrate into the cell interior (T(f) high-pass). IFO-VGIC linear response, threshold 10⁻⁵ V/m. Regulatory gap: ELF limits < 300 Hz, RF limits > 100 kHz. IF falls between. IJRB 2022: 'studies have NOT been conducted.' Exponential growth 2009–2019 (EU incandescent lamp ban). Cyb5b (Kim 2026 Cell): IF frequency produces Ca²⁺ oscillations that control gene expression.",
        fdaDevice: "TTFields (PMA 2011, 2015, 2026) — three separate approvals. 200 kHz = same range as LED drivers.",
        prediction: "EU LED ban accelerated TFR decline (T1 DID). SLEEP-1: Faraday-shielded LED produces better sleep than unshielded.",
      },
      fi: {
        mechanism: "Hakkuriteholähteiden 20–300 kHz kenttä penetroituu solun sisälle (T(f) ylipäästö). IFO-VGIC lineaarinen vaste, kynnys 10⁻⁵ V/m. Säätelyaukko: ELF-rajat < 300 Hz, RF-rajat > 100 kHz. IF jää väliin. IJRB 2022: 'studies have NOT been conducted.' Eksponentiaalinen kasvu 2009–2019 (EU hehkulamppukielto). Cyb5b (Kim 2026 Cell): IF-taajuus tuottaa Ca²⁺-oskillaatioita jotka ohjaavat geeniekspressiota.",
        fdaDevice: "TTFields (PMA 2011, 2015, 2026) — kolme erillistä hyväksyntää. 200 kHz = sama alue kuin LED-ajurit.",
        prediction: "EU LED-kielto kiihdytti TFR-laskua (T1 DID). SLEEP-1: Faraday-suojattu LED tuottaa paremman unen kuin suojaamaton.",
      },
      bermPathway: "Pathways A_mitotic, Cyb5b",
      keyRefs: ["ttfields_ef14_jama_2017", "heliyon_150khz_fertility_2022", "boyes2021_led_insects", "ijrb2022_if_review", "kim2026_cell_gene_switch", "duraccio2019_blue_light", "milham_stetzer2013_dirty_electricity"],
      link: "/evidence#lighting-transition",
    },
  },
  {
    id: "ch_rf", level: 0,
    label: { en: "RF (> 1 MHz)", fi: "RF (> 1 MHz)" },
    sublabel: { en: "Mobile, Wi-Fi, BT, IoT", fi: "Matkapuhelin, Wi-Fi, BT, IoT" },
    color: "#EF4444", epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "The RF field's magnetic component affects the spin state of cryptochrome's radical pair (RPM). Covariant Lindgren correction δH_L.",
        fdaDevice: "PRF (510k, 27 MHz). Indirect: Lindecke 2026 Science",
        prediction: "Wi-Fi density correlates with circadian disruption",
      },
      fi: {
        mechanism: "RF-kentän magneettikomponentti vaikuttaa kryptokromin radikaaliparin spin-tilaan (RPM). Kovariantti Lindgren-korjaus δH_L.",
        fdaDevice: "PRF (510k, 27 MHz). Epäsuora: Lindecke 2026 Science",
        prediction: "Wi-Fi-tiheys korreloi sirkadiaanisten häiriöiden kanssa",
      },
      bermPathway: "Pathways B, C",
      keyRefs: ["lindecke2026_science", "panagopoulos2025"],
      link: "/evidence#rf-channel",
    },
  },

  // ── LEVEL -1: Electrification boundary (1) ──
  {
    id: "electrification_boundary", level: -1,
    label: { en: "Electrification boundary", fi: "Sähköistymiskynnys" },
    sublabel: { en: "IFO-VGIC 10⁻⁵ V/m = binary threshold", fi: "IFO-VGIC 10⁻⁵ V/m = binäärinen raja" },
    color: "#F59E0B", epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "The IFO-VGIC activation threshold (10⁻⁵ V/m) is exceeded at use-distance of every household electrical device. Electricity access acts as a binary exposure boundary: electrified vs. unelectrified populations. Access-corrected r improves −0.864 → −0.885.",
        prediction: "DHS microdata: electrified household TFR < unelectrified (after controlling for income and education)",
      },
      fi: {
        mechanism: "IFO-VGIC-aktivaatiokynnys (10⁻⁵ V/m) ylittyy jokaisen kotitalouden sähkölaitteen käyttöetäisyydellä. Sähkön saatavuus toimii binäärisenä altistumisen rajana: sähköistetyt vs. sähköistämättömät väestöt. Access-korjattu r paranee −0,864 → −0,885.",
        prediction: "DHS-mikrodata: sähköistettyjen kotitalouksien TFR < sähköistämättömien (tulojen ja koulutuksen kontrolloinnin jälkeen)",
      },
      bermPathway: "All channels",
      keyRefs: ["panagopoulos2025", "delong2010_plosone"],
      link: "/evidence#electrification-boundary",
    },
  },

  // ── LEVEL 1: Modulation layers (9) ──
  {
    id: "mod_geometry", level: 1,
    label: { en: "1. Geometric foundation", fi: "1. Geometrinen perusta" },
    sublabel: { en: "Lindgren χ(Ā) ≈ 1.0", fi: "Lindgren χ(Ā) ≈ 1.0" },
    color: "#8B5CF6", epistemicLevel: "L",
    detail: {
      en: {
        mechanism: "Lindgren's metric g_μν = η_μν + A_μA_ν produces a susceptibility function χ(Ā) that is saturated (≈1.0) at the cell membrane resting potential of 7×10⁶ V/m.",
      },
      fi: {
        mechanism: "Lindgrenin metriikka g_μν = η_μν + A_μA_ν tuottaa susceptibiliteettifunktion χ(Ā) joka on saturoitunut (≈1.0) solukalvon lepopotentiaalissa 7×10⁶ V/m.",
      },
      bermPathway: "Geometric foundation",
      keyRefs: ["lindgren2025"],
      link: "/mathematics#section-1",
    },
  },
  {
    id: "mod_ion", level: 1,
    label: { en: "2. Ion channel network", fi: "2. Ionikanavaverkko" },
    sublabel: { en: "3 Byr conserved", fi: "3 mrd vuotta konservoitu" },
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "VGCC, Nav, K-ATP, CatSper — all electrically modulable. S4 voltage sensor responds via IFO mechanism at 10⁻⁵ V/m. Non-ionotropic signaling (Bhatt & Atlas 2024) lowers the threshold.",
        fdaDevice: "ALL 26 device classes utilize ion channels",
      },
      fi: {
        mechanism: "VGCC, Nav, K-ATP, CatSper — kaikki sähköisesti moduloitavia. S4-jännitesensori reagoi IFO-mekanismilla 10⁻⁵ V/m. Ei-ionotrooppinen signalointi (Trus & Atlas 2024) madaltaa kynnystä.",
        fdaDevice: "KAIKKI 26 laiteluokkaa hyödyntävät ionikanavia",
      },
      bermPathway: "All pathways",
      keyRefs: ["panagopoulos2025", "trus_atlas2024"],
      link: "/evidence#therapeutic-devices",
    },
  },
  {
    id: "mod_dc", level: 1,
    label: { en: "3. DC control system", fi: "3. DC-ohjausjärjestelmä" },
    sublabel: { en: "Becker 1985", fi: "Becker 1985" },
    color: "#8B5CF6", epistemicLevel: "M|C",
    detail: {
      en: {
        mechanism: "Perineural semiconductor network that controls tissue growth, healing, and regeneration via DC currents. Disruption → depolarization → loss of growth control.",
        fdaDevice: "DC bone stimulators, galvanic wound stimulation",
      },
      fi: {
        mechanism: "Perineuraalinen puolijohdeverkko joka ohjaa kudosten kasvua, paranemista ja regeneraatiota DC-virroilla. Häiriö → depolarisaatio → kasvunhallinnan menetys.",
        fdaDevice: "DC luunstimulaattorit, galvaaninen haavanstimulaatio",
      },
      bermPathway: "DC control",
      keyRefs: ["becker1985", "becker1990"],
      link: "/model#modulome",
    },
  },
  {
    id: "mod_bioelectric", level: 1,
    label: { en: "4. Bioelectric code", fi: "4. Bioelektrinen koodi" },
    sublabel: { en: "Levin", fi: "Levin" },
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "Vmem gradients control cell differentiation, morphogenesis, and cancer formation. Depolarization = 'cancer phenotype' (Levin).",
        fdaDevice: "PEMF (indirect — bioelectric modulation)",
      },
      fi: {
        mechanism: "Vmem-gradientit ohjaavat solujen erilaistumista, morfogeneesiä ja syövän muodostumista. Depolarisaatio = 'syöpäfenotyyppi' (Levin).",
        fdaDevice: "PEMF (epäsuora — bioelektrinen modulaatio)",
      },
      keyRefs: ["adee2023"],
      link: "/model#modulome",
    },
  },
  {
    id: "mod_pineal", level: 1,
    label: { en: "5. Circadian clock", fi: "5. Sirkadiaaninen kello" },
    sublabel: { en: "CRY, melatonin, SCN", fi: "CRY, melatoniini, SCN" },
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "Cryptochrome RPM mechanism + pineal gland melatonin synthesis. EMF disrupts both: RPM directly, melatonin via SCN.",
        fdaDevice: "TMS (FDA 2008) — cortical circadian modulation",
      },
      fi: {
        mechanism: "Kryptokromin RPM-mekanismi + pinealirauhasen melatoniinisyntesi. EMF häiritsee molempia: RPM suoraan, melatoniinia SCN:n kautta.",
        fdaDevice: "TMS (FDA 2008) — kortikaalinen sirkadiaaninen modul.",
      },
      bermPathway: "Pathways B, C",
      keyRefs: ["lindecke2026_science", "chang2015_ipad_melatonin"],
      link: "/mathematics#section-2b",
    },
  },
  {
    id: "mod_vagus", level: 1,
    label: { en: "6. Vagus axis", fi: "6. Vagus-akseli" },
    sublabel: { en: "Anti-inflammatory reflex", fi: "Anti-inflammatorinen refleksi" },
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "Vagus nerve cholinergic anti-inflammatory reflex. VNS activation → inflammation decreases. Chronic EMF disruption → reflex weakens → chronic inflammation.",
        fdaDevice: "VNS: GammaCore (510k 2017), 14+ auricular VNS devices",
      },
      fi: {
        mechanism: "Vagushermon kolinerginen anti-inflammatorinen refleksi. VNS aktivoi → tulehdus vähenee. Krooninen EMF häiritsee → refleksi heikkenee → krooninen tulehdus.",
        fdaDevice: "VNS: GammaCore (510k 2017), 14+ auriculaarista VNS-laitetta",
      },
      bermPathway: "Pathway E",
      keyRefs: ["vns_gammacore"],
      link: "/evidence#pathway-E",
    },
  },
  {
    id: "mod_division", level: 1,
    label: { en: "7. Cell division", fi: "7. Solunjakautuminen" },
    sublabel: { en: "TTFields mechanism", fi: "TTFields-mekanismi" },
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "IF field disrupts mitotic spindle assembly. Geometric field amplification at the cleavage furrow G ≈ 25×. f_opt = K/d_cell (K ≈ 3.7 Hz·m).",
        fdaDevice: "TTFields/Optune (PMA ×3: GBM, mesothelioma, pancreas)",
      },
      fi: {
        mechanism: "IF-kenttä häiritsee mitoottisen karan kokoamista. Geometrinen kenttävahvistus kaulakuroutumassa G ≈ 25×. f_opt = K/d_cell (K ≈ 3.7 Hz·m).",
        fdaDevice: "TTFields/Optune (PMA ×3: GBM, mesoteliooma, haima)",
      },
      bermPathway: "Pathway A_mitotic",
      keyRefs: ["ttfields_ef14_jama_2017", "ttfields_patent_7016725"],
      link: "/evidence#pathway-A-mitotic",
    },
  },
  {
    id: "mod_mito", level: 1,
    label: { en: "8. Mitochondrial", fi: "8. Mitokondriaalinen" },
    sublabel: { en: "CCO, photobiomodulation", fi: "CCO, fotobiomodulaatio" },
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "Cytochrome c oxidase (CCO) absorbs red/NIR light → ATP↑, ROS modulation. Non-thermal electromagnetic interaction with the chromophore.",
        fdaDevice: "LLLT/Photobiomodulation (510k 2007)",
      },
      fi: {
        mechanism: "Sytokromi c -oksidaasi (CCO) absorboi punasta/NIR-valoa → ATP↑, ROS-modulaatio. Ei-terminen sähkömagneettinen vuorovaikutus kromoforin kanssa.",
        fdaDevice: "LLLT/Fotobiomodulaatio (510k 2007)",
      },
      bermPathway: "Mitochondrial",
      keyRefs: ["lllt_fda_2007_alopecia", "hamblin2013_photomedicine"],
      link: "/evidence#therapeutic-devices",
    },
  },
  {
    id: "mod_cyb5b", level: 1,
    label: { en: "9. Cyb5b EMF sensor", fi: "9. Cyb5b EMF-sensori" },
    sublabel: { en: "Kim 2026 Cell", fi: "Kim 2026 Cell" },
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "Cytochrome b5 type B (outer mitochondrial membrane protein) identified in a genome-wide CRISPR screen as an EMF sensor. 60 Hz pulsed EMF → Cyb5b → rhythmic Ca²⁺ oscillations → gene promoter activation. Reversible in 24h.",
        fdaDevice: "EMF gene switch (Cell 2026, Kim et al.) — 25th device class",
        prediction: "Environmental ELF (50/60 Hz) uncontrollably activates the same gene promoters",
      },
      fi: {
        mechanism: "Sytokromi b5 tyyppi B (mitokondrion ulkokalvoproteiini) tunnistettu genominlaajuisessa CRISPR-seulonnassa EMF-sensoriksi. 60 Hz pulssi-EMF → Cyb5b → rytmiset Ca²⁺-oskillaatiot → geenipromoottorin aktivaatio. Reversiibeli 24h.",
        fdaDevice: "EMF-geenikytkin (Cell 2026, Kim ym.) — 25. laiteluokka",
        prediction: "Ympäristö-ELF (50/60 Hz) aktivoi hallitsemattomasti samoja geenipromoottoreita",
      },
      bermPathway: "Cyb5b transduction pathway",
      keyRefs: ["kim2026_cell_emf_gene_switch"],
      link: "/evidence#therapeutic-devices",
    },
  },

  // ── LEVEL 1 (continued): Nutritional/membrane modulators ──
  {
    id: "mod_fad_riboflavin", level: 1,
    label: { en: "FAD / riboflavin (B2)", fi: "FAD / riboflaviini (B2)" },
    sublabel: { en: "CRY chromophore", fi: "CRY:n kromofori" },
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      en: { mechanism: "FAD (flavin adenine dinucleotide) is the essential chromophore for both CRY1 and CRY2. Riboflavin (vitamin B2) deficiency reduces CRY protein stability (Hirano 2017) and abolishes magnetoreception (Yap 2025). China: >90% B2 inadequacy coincides with lowest TFR." },
      fi: { mechanism: "FAD (flaviiniadeniinidinukleotidi) on välttämätön kromofori sekä CRY1:lle että CRY2:lle. Riboflaviini (B2-vitamiini) -puutos vähentää CRY-proteiinin stabiilisuutta (Hirano 2017) ja estää magnetoreseption (Yap 2025). Kiina: >90 % B2-puutos yhdistyy maailman alhaisimpaan TFR:ään." },
      bermPathway: "Pathway C modulator", keyRefs: ["hirano2017", "yap2025"],
    },
  },
  {
    id: "mod_membrane_omega", level: 1,
    label: { en: "Membrane lipid order", fi: "Kalvon lipidijärjestys" },
    sublabel: { en: "Omega-3/7, Majewska 2025", fi: "Omega-3/7, Majewska 2025" },
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      en: { mechanism: "CRY4a associates with lipid bilayers in an ordered manner — membrane fatty acid composition (omega-3/7 balance) determines the orientational order available for radical pair magnetoreception. Cone outer segment stacked lamellae provide optimal orientation (Majewska et al. 2025, ACS Chem Biol)." },
      fi: { mechanism: "CRY4a assosioituu lipidikaksoiskerrosten kanssa järjestäytyneesti — kalvon rasvahappokoostumus (omega-3/7-tasapaino) määrittää radikaaliparin magnetoreseptiolle käytettävissä olevan suuntajärjestyksen. Tappisolujen ulkosegmenttien pinotut lamellit tarjoavat optimaalisen orientaation (Majewska ym. 2025, ACS Chem Biol)." },
      bermPathway: "Pathway C1 modulator", keyRefs: ["majewska2025"],
    },
  },
  {
    id: "mod_ampk_fasting", level: 1,
    label: { en: "AMPK fasting dynamics", fi: "AMPK-paastodynamiikka" },
    sublabel: { en: "Lamia 2009 Science", fi: "Lamia 2009 Science" },
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      en: { mechanism: "AMPK phosphorylates CRY1 at Ser71 → FBXL3 ubiquitination → degradation (Lamia et al. 2009, Science). Fasting paradox: AMPK degrades old CRY, but simultaneously increases FAD pool via β-oxidation, so newly synthesized CRY is better FAD-loaded. Net effect depends on CRY turnover rate vs. FAD availability — resolution is L*-level hypothesis." },
      fi: { mechanism: "AMPK fosforyloi CRY1:n Ser71:ssä → FBXL3-ubikitinaatio → hajotus (Lamia ym. 2009, Science). Paastoparadoksi: AMPK hajottaa vanhan CRY:n, mutta lisää samanaikaisesti FAD-poolia β-oksidaation kautta, joten uusi CRY on paremmin FAD-ladattu. Nettovaikutus riippuu CRY:n vaihtuvuusnopeudesta vs. FAD:n saatavuudesta — ratkaisu on L*-tason hypoteesi." },
      bermPathway: "Pathway C modulator", keyRefs: ["lamia2009"],
    },
  },

  // ── LEVEL 2: Biological mechanisms ──
  {
    id: "mech_vgcc_ros", level: 2,
    label: { en: "VGCC → Ca²⁺ → ROS", fi: "VGCC → Ca²⁺ → ROS" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "Voltage-gated calcium channels open → Ca²⁺ influx → mitochondrial ROS → DNA damage. EMF sensitivity hierarchy at resting potential: Cav3 (T-type, ~10% open at rest) >> Cav1.3 (low-threshold L-type, activates at −50 mV) >> Cav1.2 (canonical L-type, activates at −30 mV, significant only during action potentials). CaMKII positive feedback: Ca²⁺ influx activates CaMKII, which shifts Cav3.2 activation threshold to more negative potentials — making the channel progressively MORE sensitive to EMF (PMC9913649). This explains cumulative sensitization over chronic exposure." },
      fi: { mechanism: "Jänniteohjatut kalsiumkanavat avautuvat → Ca²⁺-influksi → mitokondriaaliset ROS → DNA-vaurio. EMF-herkkyyhierarkia lepopotentiaalissa: Cav3 (T-tyyppi, ~10 % auki levossa) >> Cav1.3 (matalan kynnyksen L-tyyppi, aktivoituu −50 mV:ssa) >> Cav1.2 (kanoninen L-tyyppi, aktivoituu −30 mV:ssa, merkitsevä vain aktiopotentiaalin aikana). CaMKII-positiivinen takaisinkytkentä: Ca²⁺-influksi aktivoi CaMKII:n, joka siirtää Cav3.2:n aktivaatiokynnystä negatiivisempaan — tehden kanavan progressiivisesti HERKEMMÄKSI EMF:lle (PMC9913649). Tämä selittää kumulatiivisen herkistymisen kroonisessa altistuksessa." },
      bermPathway: "A", link: "/evidence#pathway-A",
    },
  },
  {
    id: "mech_ttype_bifurcation", level: 2,
    label: { en: "T-type Cav3 bifurcation", fi: "T-tyypin Cav3 bifurkaatio" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "Cav3 T-type channels operate at a bifurcation point near resting potential. ~10% open at rest (window current). Schwan equation: external 1 V/m → 7.5–15 μV at membrane (37% of thermal noise). At personal levels (5 V/m): 184% of thermal noise. In Leydig cells: Ca²⁺ → StAR → testosterone. In spermatogenesis: Ca²⁺ → development timing (Ma 2026). Resolves BERM's δVm problem." },
      fi: { mechanism: "Cav3 T-tyypin kanavat toimivat bifurkaatiopisteessä lepopotentiaalin lähellä. ~10 % auki levossa (ikkunavirta). Schwanin yhtälö: ulkoinen 1 V/m → 7,5–15 μV kalvolla (37 % termisestä kohinasta). Personal-tasolla (5 V/m): 184 % kohinasta. Leydigin soluissa: Ca²⁺ → StAR → testosteroni. Spermatogeneesissä: Ca²⁺ → kehityksen ajoitus (Ma 2026). Ratkaisee BERM:n δVm-ongelman." },
      bermPathway: "A,D", keyRefs: ["nature_comms_2026_ttype", "xiang2025_clc2_ttype", "ma2026_spermatogenesis_cav"], link: "/model/fieldstate/math#s16",
    },
  },
  {
    id: "mech_gpcr", level: 2,
    label: { en: "GPCR-adenosine → cAMP", fi: "GPCR-adenosiini → cAMP" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "PEMF mechanism: adenosine A2A receptor activation → cAMP cascade → anti-inflammatory response." },
      fi: { mechanism: "PEMF-mekanismi: adenosiini-A2A-reseptorin aktivointi → cAMP-kaskadi → anti-inflammatorinen vaste." },
      bermPathway: "GPCR", link: "/evidence#pathway-GPCR",
    },
  },
  {
    id: "mech_nav_plasticity", level: 2,
    label: { en: "Nav → neuroplasticity", fi: "Nav → neuroplastisuus" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "Sodium channel modulation → cortical plasticity. The basic mechanism of rTMS and tDCS." },
      fi: { mechanism: "Natriumkanavien modulointi → kortikaalinen plastisuus. rTMS:n ja tDCS:n perusmekanismi." },
      bermPathway: "neural", link: "/evidence#pathway-neural",
    },
  },
  {
    id: "mech_cry_melatonin", level: 2,
    label: { en: "CRY/RPM → melatonin", fi: "CRY/RPM → melatoniini" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "Cryptochrome radical pair spin state is disrupted → circadian clock distorted → melatonin synthesis decreases. Human CRY/RPM magnetoreception is blue-light-dependent (Chae et al. 2019, P<0.001); vertical component reversal reversed orientation, consistent with an inclination compass." },
      fi: { mechanism: "Kryptokromin radikaaliparin spin-tila häiriintyy → sirkadiaaninen kello vääristyy → melatoniinisyntesi alenee. Ihmisen CRY/RPM-magnetoreseptio on sinivaloriippuvainen (Chae ym. 2019, P<0,001); pystykomponentin kääntö käänsi orientaation, mikä on yhdenmukainen inklinaatiokompassin kanssa." },
      bermPathway: "B,C", keyRefs: ["chae2019", "ritz2004_rf_compass", "engels2014_emf_bird", "sherrard2018", "yoshii2009"], link: "/evidence#human-cry-magnetoreception",
    },
  },
  {
    id: "mech_trpc1_calcium", level: 2,
    label: { en: "CRY2 → TRPC1 Ca²⁺", fi: "CRY2 → TRPC1 Ca²⁺" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "CRY2-dependent, light-dependent, FAD-dependent calcium entry through TRPC1 (a TRP channel, NOT a VGCC). CRY2 physically interacts with TRPC1; the complex co-translocates to the nucleus after EMF/PEMF exposure. Pharmacologically distinct from pathway A: not blocked by nifedipine/verapamil. Demonstrated in myoblasts (Yap et al. 2025, Cells)." },
      fi: { mechanism: "CRY2-riippuvainen, valoriippuvainen, FAD-riippuvainen kalsiumsisäänvirtaus TRPC1:n kautta (TRP-kanava, EI VGCC). CRY2 on fysikaalisessa vuorovaikutuksessa TRPC1:n kanssa; kompleksi siirtyy tumaan EMF/PEMF-altistuksen jälkeen. Farmakologisesti erillinen polku A:sta: nifedipiini/verapamiili ei estä. Osoitettu myoblasteissa (Yap ym. 2025, Cells)." },
      bermPathway: "C", keyRefs: ["yap2025"], link: "/evidence#cry-trpc1",
    },
  },
  {
    id: "mech_vagal_antiinflam", level: 2,
    label: { en: "Vagal anti-inflamm.", fi: "Vagaalinen anti-inflamm." },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "Vagus nerve cholinergic reflex: acetylcholine → α7nAChR → NF-κB inhibition → inflammation control." },
      fi: { mechanism: "Vagushermon kolinerginen refleksi: asetyylikoliini → α7nAChR → NF-κB-inhibitio → tulehduksen hallinta." },
      bermPathway: "E", link: "/evidence#pathway-E",
    },
  },
  {
    id: "mech_mitotic_spindle", level: 2,
    label: { en: "Mitotic spindle → aneuploidy", fi: "Mitoottinen kara → aneuploidia" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "IF field disrupts tubulin polymerization and spindle orientation → incorrect chromosome segregation." },
      fi: { mechanism: "IF-kenttä häiritsee tubuliinipolymerisaatiota ja karan orientaatiota → väärä kromosomijakauma." },
      bermPathway: "A_mitotic", link: "/evidence#pathway-A-mitotic",
    },
  },
  {
    id: "mech_ifo_linear", level: 2,
    label: { en: "IFO linear (10⁻⁵ V/m)", fi: "IFO lineaarinen (10⁻⁵ V/m)" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "Ion forced oscillation (IFO): the voltage sensor S4 segment responds linearly to external field. Threshold 10⁻⁵ V/m." },
      fi: { mechanism: "Ionien pakotettu oskillaatio (IFO): jännitesensorin S4-segmentti reagoi lineaarisesti ulkoiseen kenttään. Kynnys 10⁻⁵ V/m." },
      bermPathway: "A,A_mitotic", link: "/model#ifo",
    },
  },
  {
    id: "mech_dep_quadratic", level: 2,
    label: { en: "DEP quadratic (>100 V/m)", fi: "DEP neliöllinen (>100 V/m)" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "Dielectrophoresis: quadratic force on polarized particles in an inhomogeneous field. TTFields intensity." },
      fi: { mechanism: "Dielektroforeesi: neliöllinen voima polarisoituneille partikkeleille epähomogeenisessa kentässä. TTFields-intensiteetti." },
      bermPathway: "A_mitotic (TTFields)", link: "/evidence#ttfields",
    },
  },
  {
    id: "mech_cyb5b_ca", level: 2,
    label: { en: "Cyb5b → Ca²⁺ oscillations", fi: "Cyb5b → Ca²⁺ oskillaatiot" },
    sublabel: { en: "Kim 2026 Cell", fi: "Kim 2026 Cell" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "CRISPR-screen-identified Cyb5b functions as an EMF sensor on the outer mitochondrial membrane. Produces rhythmic Ca²⁺ oscillations that activate gene promoters. Third transduction pathway alongside IFO and RPM. 4 kHz (IF range) was used in the gene switch demonstration — links the IF channel directly to gene expression control cascade." },
      fi: { mechanism: "CRISPR-seulonnalla tunnistettu Cyb5b toimii EMF-sensorina mitokondrion ulkokalvolla. Tuottaa rytmiset Ca²⁺-oskillaatiot jotka aktivoivat geenipromoottoreita. Kolmas transduktioreitti IFO:n ja RPM:n rinnalla. 4 kHz (IF-alue) käytettiin geenikytkin-demonstraatiossa — yhdistää IF-kanavan suoraan geeniekspression kontrollikaskadiin." },
      bermPathway: "Cyb5b", keyRefs: ["kim2026_cell_emf_gene_switch", "kim2026_cell_gene_switch"], link: "/evidence#lighting-transition",
    },
  },
  {
    id: "mech_vgcc_genotype", level: 2,
    label: { en: "VGCC genotype × sensitivity", fi: "VGCC-genotyyppi × herkkyys" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "CACNA1C rs7304986 T/C carriers show measurable neurophysiological response to 5G exposure (3.6 GHz) below ICNIRP limits. T/T carriers show no effect. Double-blind design." },
      fi: { mechanism: "CACNA1C rs7304986 T/C-kantajat osoittavat mitattavan neurofysiologisen vasteen 5G-altistukselle (3.6 GHz) ICNIRP-rajojen alla. T/T-kantajilla ei vaikutusta. Kaksoissokkoasetelma." },
      bermPathway: "Individual susceptibility", keyRefs: ["sousouri2025_cacna1c_5g_sleep"], link: "/evidence#individual-susceptibility",
    },
  },
  {
    id: "mech_beta_katp", level: 2,
    label: { en: "β-cell K-ATP → insulin", fi: "β-solu K-ATP → insuliini" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "US Patent 4,850,959 (1989): resonance-frequency EMF controls pancreatic β-cell insulin secretion via Ca²⁺ channels. Resonance → Ca²⁺ influx → insulin↑. Non-resonance → Ca²⁺ efflux → insulin↓." },
      fi: { mechanism: "US Patent 4,850,959 (1989): resonanssitaajuinen EMF kontrolloi haiman β-solujen insuliinieritystä Ca²⁺-kanavien kautta. Resonanssi → Ca²⁺-influksi → insuliini↑. Ei-resonanssi → Ca²⁺-effluksi → insuliini↓." },
      bermPathway: "metabolic", keyRefs: ["patent_4850959_insulin"], link: "/evidence#metabolic",
    },
  },
  {
    id: "mech_window_effect", level: 2,
    label: { en: "Window effect", fi: "Ikkunailmiö" },
    sublabel: { en: "Adey-Blackman 1976", fi: "Adey-Blackman 1976" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "Biological effect is non-linear: Ca²⁺ efflux from brain tissue occurs at specific intensity windows (0.1–1.0 mW/cm²) but NOT at higher or lower levels. Explains why ICNIRP's linear SAR model does not detect effects and why replication studies may fail." },
      fi: { mechanism: "Biologinen vaikutus ei-lineaarinen: Ca²⁺-effluksi aivokudoksesta tapahtuu tietyissä intensiteetti-ikkunoissa (0,1–1,0 mW/cm²) mutta EI korkeammilla tai matalammilla tasoilla. Selittää miksi ICNIRP:n lineaarinen SAR-malli ei havaitse vaikutuksia ja miksi replikaatiotutkimukset voivat epäonnistua." },
      bermPathway: "Non-linear dose-response", keyRefs: ["adey1976_calcium_window"], link: "/objections#dose-response",
    },
  },
  {
    id: "mech_ionic_hierarchy", level: 2,
    label: { en: "Ionic treatment hierarchy", fi: "Ioninen hoitohierarkia" },
    sublabel: { en: "Ca²⁺ convergence", fi: "Ca²⁺-konvergenssi" },
    epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "All mood disorder treatments converge on Ca²⁺ homeostasis: SSRI (indirect, NNT 7) < TMS/tDCS (electromagnetic, NNT 5) < lithium (ionic, Li⁺→VGSC) < psychedelics (ionic reset, 5-HT2A→Cav1.2/CACNA1C, NNT 3). Efficacy follows the degree of ionic targeting.",
        prediction: "P14: EMF exposure × psychedelic response; P15: CACNA1C genotype × response; P16: lithium protects against EMF mood effects",
      },
      fi: {
        mechanism: "Kaikki mielialahäiriöiden hoidot konvergoivat Ca²⁺-homeostaasiin: SSRI (epäsuora, NNT 7) < TMS/tDCS (sähkömagneettinen, NNT 5) < litium (ioninen, Li⁺→VGSC) < psykedeelit (ioninen reset, 5-HT2A→Cav1.2/CACNA1C, NNT 3). Tehokkuus seuraa ionisen kohdistuksen astetta.",
        prediction: "P14: EMF-altistus × psykedeelien vaste; P15: CACNA1C-genotyyppi × vaste; P16: litium suojaa EMF-mielialavaikutuksilta",
      },
      bermPathway: "Ionic treatment", keyRefs: ["cipriani2018_antidepressants", "goodwin2022_psilocybin", "sousouri2025_cacna1c", "elmallakh2004_lithium_ion", "zarate2006_ketamine"], link: "/evidence#ionic-hierarchy",
    },
  },
  {
    id: "mech_skin_bioelectric", level: 2,
    label: { en: "Dermal bioelectric system", fi: "Ihon biosähköinen sensorijärjestelmä" },
    sublabel: { en: "TEP + piezo + VGCC", fi: "TEP + pietsosähkö + VGCC" },
    epistemicLevel: "E",
    detail: {
      en: {
        mechanism: "Epidermis maintains transepithelial potential (TEP, 10–60 mV) via Na⁺/K⁺-ATPase. Dermal collagen is piezoelectric (7–8 pC/N) and converts mechanical force to voltage that opens VGCC channels. PIEZO1/TRPV4/VGCC converge on Ca²⁺ response. EMF disrupts all three systems simultaneously.",
        prediction: "P17: EMF reduces TEP; P18: EMF slows wound healing",
      },
      fi: {
        mechanism: "Epidermis ylläpitää transepiteliaalista potentiaalia (TEP, 10–60 mV) Na⁺/K⁺-ATPaasin avulla. Dermiksen kollageeni on pietsosähköinen (7–8 pC/N) ja muuntaa mekaanisen voiman jännitteeksi joka avaa VGCC-kanavat. PIEZO1/TRPV4/VGCC konvergoivat Ca²⁺-vasteeseen. EMF häiritsee kaikkia kolmea järjestelmää samanaikaisesti.",
        prediction: "P17: EMF vähentää TEP:ia; P18: EMF hidastaa haavan paranemista",
      },
      bermPathway: "Dermal bioelectric", keyRefs: ["lim2024_skin_battery", "zhao2006_wound_ef", "fukada1957_piezo", "skedung2013_nanoscale_touch"], link: "/evidence#skin-battery",
    },
  },
  {
    id: "mech_led_confound", level: 2,
    label: { en: "LED IF-EMF confound", fi: "LED IF-EMF -sekoittaja" },
    sublabel: { en: "65 kHz–2 MHz driver", fi: "65 kHz–2 MHz ajuri" },
    epistemicLevel: "C",
    detail: {
      en: {
        mechanism: "All LED light sources contain a switch-mode power supply (20–300 kHz IF-EMF). Retinal Cav1.4 channels are VGCC-type and IF-EMF targets. In blue light studies, incandescent vs. LED comparison is confounded by IF-EMF. A2E photosensitization is real, but IF-EMF may amplify it synergistically. Night mode removes blue light but NOT IF-EMF. Duraccio 2019: blue light filter glasses did NOT improve sleep — suggesting IF role.",
        prediction: "P19–P22: IF-EMF mediates LED blue light damage. SLEEP-1: Faraday-shielded LED vs. unshielded.",
      },
      fi: {
        mechanism: "Kaikki LED-valonlähteet sisältävät hakkuriteholähteen (20–300 kHz IF-EMF). Verkkokalvon Cav1.4-kanavat ovat VGCC-tyyppisiä ja IF-EMF:n kohteita. Sinivalotutkimuksissa hehkulamppu vs. LED -vertailu sekoittuu IF-EMF:ään. A2E-fotosensitisaatio on todellinen, mutta IF-EMF voi vahvistaa sitä synergistisesti. Yötila poistaa sinivalon mutta EI IF-EMF:ää. Duraccio 2019: sinisen valon suodatuslasit EIVÄT parantaneet unta — viittaa IF:n rooliin.",
        prediction: "P19–P22: IF-EMF välittää LED-sinivalovauriota. SLEEP-1: Faraday-suojattu LED vs. suojaamaton.",
      },
      bermPathway: "LED confound", keyRefs: ["pmc4896623_cav14", "pmc3885580_retinal_vgcc", "pmc7830240_blue_light", "duraccio2019_blue_light", "ijrb2022_if_review"], link: "/evidence#lighting-transition",
    },
  },
  {
    id: "mech_hospital_emf", level: 2,
    label: { en: "Hospital EMF", fi: "Sairaala-EMF" },
    sublabel: { en: "PHS + modulome", fi: "PHS + modulooma" },
    epistemicLevel: "C",
    detail: {
      en: {
        mechanism: "Post-hospital syndrome (Krumholz NEJM 2013): risk for all diagnoses 30 days after discharge. Hospitals are the highest-EMF environment: 24/7 LED (IF), Wi-Fi (RF), monitors (IF+ELF), electric beds (ELF). ICU: 40 µT near devices. Elderly 95% of time in bed. BERM: simultaneous modulome activation in impaired ion channel homeostasis.",
        prediction: "P23–P25: hospital EMF correlation and intervention",
      },
      fi: {
        mechanism: "Post-hospital syndrome (Krumholz NEJM 2013): riski kaikille diagnooseille 30 pv kotiutumisen jälkeen. Sairaalat ovat korkeimman EMF:n ympäristö: 24/7 LED (IF), Wi-Fi (RF), monitorit (IF+ELF), sähkösängyt (ELF). ICU: 40 µT laitteiden lähellä. Vanhukset 95% ajasta sängyssä. BERM: simultaaninen modulooma-aktivaatio heikentyneessä ionikanavahomeostaasissa.",
        prediction: "P23–P25: sairaala-EMF korrelaatio ja interventio",
      },
      bermPathway: "Hospital EMF", keyRefs: ["krumholz2013_phs", "pubmed10447544_icu_emf"], link: "/evidence#hospital-emf",
    },
  },
  {
    id: "mech_alzheimer_calcium", level: 2,
    label: { en: "Amyloid-calcium feedback", fi: "Amyloidi-kalsium-palautesilmukka" },
    sublabel: { en: "Ca²⁺ → Aβ → pores → Ca²⁺", fi: "Ca²⁺ → Aβ → huokoset → Ca²⁺" },
    epistemicLevel: "C",
    detail: {
      en: {
        mechanism: "EMF → VGCC → Ca²⁺ ↑ → BACE1 → Aβ oligomers. In the presence of Ca²⁺, Aβ forms toxic oligomers (Bhatt PMC3065491). Oligomers form membrane Ca²⁺ pores → positive feedback loop. Presenilin convergence: PSEN1/2 mutations (genetic) and EMF-VGCC (environmental) converge on the same Ca²⁺ pathway. Arendash paradox: controlled EMF protects (918 MHz, MemorEM/TEMT) — dose/frequency/context determine outcome.",
        prediction: "P29–P32: AD correlates with EMF, CACNA1C modulates, low-EMF slows progression",
      },
      fi: {
        mechanism: "EMF → VGCC → Ca²⁺ ↑ → BACE1 → Aβ-oligomeerit. Ca²⁺:n läsnäollessa Aβ muodostaa toksisia oligomeereja (Bhatt PMC3065491). Oligomeerit muodostavat kalvon Ca²⁺-huokosia → positiivinen palautesilmukka. Preseniini-konvergenssi: PSEN1/2-mutaatiot (geneettinen) ja EMF-VGCC (ympäristöllinen) konvergoivat samaan Ca²⁺-polkuun. Arendash-paradoksi: kontrolloitu EMF suojaa (918 MHz, MemorEM/TEMT) — annos/taajuus/konteksti ratkaisevat.",
        prediction: "P29–P32: AD korreloi EMF:n kanssa, CACNA1C moduloi, matala-EMF hidastaa",
      },
      bermPathway: "Alzheimer calcium", keyRefs: ["pmc4909906_calcium_ad", "pmc3065491_bhatt_ca_oligomers", "pmc7179355_oday_calcium", "pmc8125740_calcium_abeta"], link: "/evidence#alzheimer-calcium",
    },
  },
  {
    id: "mech_adhd_calibration", level: 2,
    label: { en: "ADHD calibration error", fi: "ADHD-kalibraatiovirhe" },
    sublabel: { en: "HCN/VGCC tuning → S/N ↓", fi: "HCN/VGCC-viritys → S/N ↓" },
    epistemicLevel: "C",
    detail: {
      en: {
        mechanism: "Prenatal EMF → fetal VGCC activation → Ca²⁺ disruption in critical developmental window → ion channel (HCN, VGCC, KCNQ) calibration error in PFC pyramidal neurons → signal-to-noise ratio deficit → ADHD phenotype. CACNA1C variants associate with ADHD, ASD, bipolar disorder in GWAS. Timothy syndrome (CACNA1C GoF) → autism = genetic extreme example. Guanfacine (FDA/EMA ADHD) works DIRECTLY on ion channels: α2A → cAMP↓ → HCN closes → Vm stabilizes. Li 2020 (JAMA, 1482 pairs): objectively measured prenatal EMF → ADHD risk.",
        prediction: "P33–P35: CACNA1C × EMF → ADHD, guanfacine protects, prevalence follows EMF",
      },
      fi: {
        mechanism: "Raskausaikainen EMF → sikiön VGCC-aktivaatio → Ca²⁺-häiriö kriittisessä kehitysikkunassa → ionikanavien (HCN, VGCC, KCNQ) kalibraatiovirhe PFC:n pyramidaalineuroneissa → signaali-kohinasuhteen vaje → ADHD-fenotyyppi. CACNA1C-variantit assosioituvat ADHD:hen, ASD:hen, bipolaarihäiriöön GWAS:ssa. Timothy-syndrooma (CACNA1C GoF) → autismi = geneettinen ääriesimerkki. Guanfasiini (FDA/EMA ADHD) toimii SUORAAN ionikanaviin: α2A → cAMP↓ → HCN sulkeutuu → Vm stabiloituu. Li 2020 (JAMA, 1482 paria): objektiivisesti mitattu raskausaikainen EMF → ADHD-riski.",
        prediction: "P33–P35: CACNA1C × EMF → ADHD, guanfasiini suojaa, prevalenssi seuraa EMF:ää",
      },
      bermPathway: "ADHD calibration", keyRefs: ["li2020_jama_adhd", "pmc6101623_cacna1c_gwas", "pmc6894750_timothy", "wang2007_guanfacine_hcn"], link: "/evidence#adhd-calibration",
    },
  },
  {
    id: "mech_melatonin_fertility", level: 2,
    label: { en: "Melatonin bridge", fi: "Melatoniinisilta" },
    sublabel: { en: "Cascade 1 → cascade 6", fi: "Kaskadi 1 → kaskadi 6" },
    epistemicLevel: "C",
    detail: {
      en: {
        mechanism: "EMF → pineal gland → melatonin ↓ links the sleep cascade (1) to the fertility cascade (6): cascades are in SERIES, not parallel. Five pathways: (1) HPG axis: melatonin → hypothalamus → GnRH → LH/FSH → gonads; (2) antioxidant: follicular fluid melatonin → ROS neutralization → oocyte protection (Tamura 2012); (3) anti-inflammatory: NF-κB ↓; (4) mitochondrial: AMPK/SIRT1 ↑; (5) epigenetic: Gdf9/Bmp15 regulation. WARNING: melatonin's HPG effect is BIDIRECTIONAL — at high concentrations it can suppress GnRH.",
        prediction: "P38–P40: IVF × EMF, melatonin supplement × EMF interaction, shift work",
      },
      fi: {
        mechanism: "EMF → pinealirauhanen → melatoniini ↓ kytkee unikaskadin (1) hedelmällisyyskaskadiin (6): kaskadit ovat SARJASSA, eivät rinnakkain. Viisi polkua: (1) HPG-akseli: melatoniini → hypotalamus → GnRH → LH/FSH → gonadit; (2) antioksidantti: follikkelinesteen melatoniini → ROS-neutralointi → munasolun suoja (Tamura 2012); (3) anti-inflammatorinen: NF-κB ↓; (4) mitokondriaalinen: AMPK/SIRT1 ↑; (5) epigeneettinen: Gdf9/Bmp15-säätely. VAROITUS: melatoniinin HPG-vaikutus on KAKSISUUNTAINEN — korkeina pitoisuuksina se voi suppressoida GnRH:ta.",
        prediction: "P38–P40: IVF × EMF, melatoniinilisä × EMF -interaktio, vuorotyö",
      },
      bermPathway: "Melatonin bridge", keyRefs: ["tamura2012_follicular_melatonin", "tong2017_melatonin_ivf", "battelle1980_emf_melatonin", "reiter2007_melatonin_male"], link: "/evidence#melatonin-bridge",
    },
  },
  {
    id: "epi_kaiser_series", level: 2,
    label: { en: "Kaiser Permanente series", fi: "Kaiser Permanente -sarja" },
    sublabel: { en: "Li 2002–2020, EMDEX", fi: "Li 2002–2020, EMDEX" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "De-Kun Li's 6 cohorts (n = 801–10,931) in the Kaiser Permanente system, EMDEX-measured MF exposure (16 mG threshold). 5 endpoints across 4 BERM cascades: miscarriage (2002), sperm ↓ (2010), childhood asthma (2011), childhood obesity (2012), ADHD (2020). Li 2017: early-onset cancer (EOC) from maternal exposure. Cohort design, objective measurement, consistent results across endpoints." },
      fi: { mechanism: "De-Kun Li:n 6 kohorttia (n = 801–10 931) Kaiser Permanente -järjestelmässä, EMDEX-mitattu MF-altistus (16 mG -kynnys). 5 päätetapahtumaa 4 BERM-kaskadissa: keskenmeno (2002), sperma ↓ (2010), lapsuusastma (2011), lapsuuslihavuus (2012), ADHD (2020). Li 2017: varhain alkava syöpä (EOC) äitien altistuksesta. Kohorttiasetelma, objektiivinen mittaus, konsistentteja tuloksia eri päätepisteissä." },
      bermPathway: "IF,A_mitotic", keyRefs: ["li2002_miscarriage_mf", "li2010_sperm_mf", "li2011_asthma_mf", "li2012_obesity_mf", "li2017", "li2020_jama_adhd"], link: "/evidence#kaiser-permanente-series",
    },
  },

  // ── LEVEL 3 (continued): Pituitary EMF hub ──
  {
    id: "endo_pituitary_hub", level: 3,
    label: { en: "Pituitary EMF Hub", fi: "Aivolisäkkeen EMF-solmu" },
    sublabel: { en: "Outside BBB, Cav3 in all hormone cell types", fi: "BBB:n ulkopuolella, Cav3 kaikissa hormonisolut." },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "The pituitary gland sits outside the blood-brain barrier, making it directly exposed to circulating EMF-perturbed signals. All pituitary hormone cell types (gonadotrophs, thyrotrophs, corticotrophs, somatotrophs, lactotrophs) express T-type Cav3 channels. EMF-induced Cav3 perturbation affects FSH/LH (gonadotrophs), TSH (thyrotrophs), and ACTH (corticotrophs) simultaneously." },
      fi: { mechanism: "Aivolisäke sijaitsee veri-aivoesteen ulkopuolella, mikä altistaa sen suoraan verenkierrossa kiertäville EMF-häirityille signaaleille. Kaikki aivolisäkkeen hormonisolut (gonadotrofit, tyreotrofit, kortikotrofit, somatotrofit, laktotrofit) ilmentävät T-tyypin Cav3-kanavia. EMF:n aiheuttama Cav3-häiriö vaikuttaa FSH/LH:hen (gonadotrofit), TSH:hen (tyreotrofit) ja ACTH:hen (kortikotrofit) samanaikaisesti." },
      bermPathway: "A,D", keyRefs: ["ijms2026-hpg"],
    },
  },

  // ── LEVEL 2 (continued): Mitochondrial ROS & Autonomic HRV ──
  {
    id: "mech_mitochondrial_ros", level: 2,
    label: { en: "Mitochondrial Ca2+->ROS Converter", fi: "Mitokondriaalinen Ca2+->ROS-muunnin" },
    sublabel: { en: "Aged mitochondria amplify", fi: "Ikääntyneet mitokondriat vahvistavat" },
    epistemicLevel: "M|C",
    detail: {
      en: { mechanism: "Ca2+ enters mitochondria via the mitochondrial calcium uniporter (MCU). In healthy mitochondria, this drives ATP production. In aged or damaged mitochondria, excess Ca2+ overwhelms the electron transport chain, producing superoxide radicals. The amplification factor increases with age: mitochondria over 20 years old produce progressively more ROS per unit Ca2+ influx." },
      fi: { mechanism: "Ca2+ siirtyy mitokondrioihin mitokondriaalisen kalsiumuniporterin (MCU) kautta. Terveissä mitokondrioissa tämä ajaa ATP-tuotantoa. Ikääntyneissä tai vaurioituneissa mitokondrioissa ylimääräinen Ca2+ kuormittaa elektroninsiirtoketjun, tuottaen superoksidiradikaaleja. Vahvistuskerroin kasvaa iän myötä: yli 20 vuotta vanhat mitokondriot tuottavat progressiivisesti enemmän ROS:ia per Ca2+-yksikkö." },
      bermPathway: "A", keyRefs: ["panagopoulos2025"],
    },
  },
  {
    id: "mech_autonomic_hrv", level: 2,
    label: { en: "Autonomic HRV", fi: "Autonominen HRV" },
    sublabel: { en: "SA node Cav3 pacemaking, EMF early biomarker", fi: "SA-solmun Cav3 tahdistus, EMF:n varhainen biomarkkeri" },
    epistemicLevel: "E",
    detail: {
      en: { mechanism: "The sinoatrial (SA) node relies on T-type Cav3.1 channels for diastolic depolarization pacemaking. EMF perturbation of these channels alters heart rate variability (HRV), specifically reducing the high-frequency (HF) component that reflects vagal tone. HRV is a sensitive, non-invasive early biomarker of chronic EMF exposure — detectable before clinical symptoms emerge." },
      fi: { mechanism: "Sinussolmuke (SA) käyttää T-tyypin Cav3.1-kanavia diastoliseen depolarisaation tahdistukseen. EMF:n häiriö näihin kanaviin muuttaa sykevälivaihtelua (HRV), erityisesti vähentäen korkeataajuista (HF) komponenttia joka heijastaa vagaalista tonusta. HRV on herkkä, ei-invasiivinen varhainen biomarkkeri krooniselle EMF-altistukselle — havaittavissa ennen kliinisten oireiden ilmaantumista." },
      bermPathway: "A,D", keyRefs: ["mohamed-bp-emf"],
    },
  },

  // ── LEVEL 3: Tissue effects (10) ──
  { id: "tissue_sperm", level: 3, label: { en: "Spermatogenesis ↓", fi: "Spermatogeneesi ↓" }, epistemicLevel: "E", detail: { en: { mechanism: "ROS damage, mitotic spindle disruption, and Leydig cell dysfunction reduce sperm production." }, fi: { mechanism: "ROS-vaurio, mitoottisen karan häiriö ja Leydig-solujen toimintahäiriö vähentävät siittiötuotantoa." }, link: "/evidence#sperm" } },
  { id: "tissue_ovarian", level: 3, label: { en: "Ovulation / oocyte quality ↓", fi: "Ovulaatio/munasolun laatu ↓" }, epistemicLevel: "M|C", detail: { en: { mechanism: "Oocyte meiotic spindle is disrupted, granulosa cell apoptosis increases." }, fi: { mechanism: "Munasolun meioottinen kara häiriintyy, granuloosasolujen apoptoosi lisääntyy." }, link: "/evidence#ovarian" } },
  { id: "tissue_testosterone", level: 3, label: { en: "Testosterone ↓", fi: "Testosteroni ↓" }, epistemicLevel: "E", detail: { en: { mechanism: "Leydig cell steroidogenesis disruption: StAR protein expression decreases → testosterone synthesis declines." }, fi: { mechanism: "Leydig-solujen steroidogeneesin häiriö: StAR-proteiinin ilmentyminen alenee → testosteronisyntesi vähenee." }, link: "/evidence#testosterone" } },
  { id: "tissue_melatonin", level: 3, label: { en: "Melatonin ↓", fi: "Melatoniini ↓" }, epistemicLevel: "E", detail: { en: { mechanism: "Pineal gland melatonin synthesis decreases via CRY/RPM disruption and display device blue light." }, fi: { mechanism: "Pinealirauhasen melatoniinisyntesi alenee CRY/RPM-häiriön ja näyttölaitteiden sinisen valon kautta." }, link: "/evidence#melatonin" } },
  { id: "tissue_nk_cells", level: 3, label: { en: "NK cells ↓ (−70%)", fi: "NK-solut ↓ (−70%)" }, epistemicLevel: "E", detail: { en: { mechanism: "Natural killer cells decline. Melatonin normally stimulates NK cell activity." }, fi: { mechanism: "Luonnolliset tappajasolut vähenevät. Melatoniini normaalisti stimuloi NK-aktiivisuutta." }, link: "/evidence#nk-cells" } },
  { id: "tissue_insulin", level: 3, label: { en: "Insulin sensitivity ↓", fi: "Insuliiniherkkyys ↓" }, epistemicLevel: "E", detail: { en: { mechanism: "Melatonin deficiency disrupts pancreatic β-cell rhythm → insulin resistance." }, fi: { mechanism: "Melatoniinin puute häiritsee haiman β-solujen rytmiä → insuliiniresistenssi." }, link: "/evidence#insulin" } },
  { id: "tissue_cortisol", level: 3, label: { en: "Cortisol ↑ (chronic)", fi: "Kortisoli ↑ (krooninen)" }, epistemicLevel: "E", detail: { en: { mechanism: "HPA axis hyperactivation: circadian disruption + vagal tone decrease → chronic cortisol." }, fi: { mechanism: "HPA-akselin yliaktivaatio: sirkadiaaninen häiriö + vagaalisen tonuksen lasku → krooninen kortisoli." }, link: "/evidence#cortisol" } },
  { id: "tissue_bbb", level: 3, label: { en: "BBB permeability ↑", fi: "BBB-permeabiliteetti ↑" }, epistemicLevel: "E", detail: { en: { mechanism: "Blood-brain barrier permeability increases via eNOS activation → occludin downregulation → TJ protein degradation (Salford 2003; Ulusoy et al. 2025). The same tight junction proteins (occludin, ZO-1, claudins) are shared with the BTB. Progressive: 30 min non-damaging → 360 min structural damage." }, fi: { mechanism: "Veri-aivoesteen läpäisevyys kasvaa eNOS-aktivaation → okkludiinin alaregulaation → TJ-proteiinien degradaation kautta (Salford 2003; Ulusoy ym. 2025). Samat tight junction -proteiinit (okkludiini, ZO-1, klaudiinit) ovat yhteisiä BTB:n kanssa. Progressiivinen: 30 min ei-vaurioittava → 360 min rakenteellinen vaurio." }, bermPathway: "F", keyRefs: ["salford2003", "ulusoy2025"], link: "/evidence/bbb" } },
  { id: "tissue_btb", level: 3, label: { en: "BTB disruption ↑", fi: "BTB:n häiriö ↑" }, epistemicLevel: "E", detail: { en: { mechanism: "Blood-testis barrier disruption via Spock3-MMP2 axis at 2605 MHz (4G). Same TJ proteins as BBB. Progressive time-dependent toxicity with positive feedback: barrier damage → higher effective field → more damage. Direct spermatogenic microenvironment compromise (Yu et al. 2019)." }, fi: { mechanism: "Veri-kivesesteen häiriö Spock3-MMP2-akselin kautta 2605 MHz:llä (4G). Samat TJ-proteiinit kuin BBB:ssä. Progressiivinen aikariippuvainen toksisuus positiivisella takaisinkytkennällä: estevaurio → korkeampi efektiivinen kenttä → enemmän vauriota. Suora spermatogeneettisen mikroympäristön vaarantuminen (Yu ym. 2019)." }, bermPathway: "F", keyRefs: ["yu2019_btb"], link: "/evidence/bbb" } },
  { id: "tissue_gut", level: 3, label: { en: "Gut epithelium ↓", fi: "Suoliston epiteeli ↓" }, epistemicLevel: "M|C", detail: { en: { mechanism: "Gut epithelial cells' rapid division cycle (3-5 days) makes them vulnerable to IF field mitotic disruption." }, fi: { mechanism: "Suoliston epiteelisolujen nopea jakautumissykli (3-5 pv) tekee niistä haavoittuvia IF-kentän mitoottiselle häiriölle." }, link: "/evidence#gut" } },
  { id: "tissue_vagal_tone", level: 3, label: { en: "Vagal tone ↓", fi: "Vagaalinen tonus ↓" }, epistemicLevel: "E", detail: { en: { mechanism: "Vagus nerve anti-inflammatory reflex weakening → chronic low-grade inflammation." }, fi: { mechanism: "Vagushermon anti-inflammatorisen refleksin heikkeneminen → krooninen matala-asteinen tulehdus." }, link: "/evidence#vagal-tone" } },

  // ── LEVEL 4: Disease cascade (7) ──
  { id: "disease_sleep", level: 4, label: { en: "1. Sleep disorders", fi: "1. Unihäiriöt" }, sublabel: { en: "Latency: months", fi: "Viive: kuukausia" }, color: "#9B7FD4", cascadeOrder: 1, epistemicLevel: "E", detail: { en: { mechanism: "Melatonin deficiency + circadian disruption → sleep disorders. The first clinical symptom." }, fi: { mechanism: "Melatoniinin puute + sirkadiaaninen häiriö → unihäiriöt. Ensimmäinen kliininen oire." }, link: "/evidence#sleep" } },
  { id: "disease_depression", level: 4, label: { en: "2. Depression", fi: "2. Masennus" }, sublabel: { en: "Latency: 1–3 years", fi: "Viive: 1-3 vuotta" }, color: "#6B9FD4", cascadeOrder: 2, epistemicLevel: "E", detail: { en: { mechanism: "Chronic sleep disorder + cortisol + testosterone decline → depression." }, fi: { mechanism: "Krooninen unihäiriö + kortisoli + testosteronin lasku → masennus." }, link: "/evidence#depression" } },
  { id: "disease_adhd", level: 4, label: { en: "3. ADHD / ASD", fi: "3. ADHD/ASD" }, sublabel: { en: "Latency: 2–5 years", fi: "Viive: 2-5 vuotta" }, color: "#5AAD8B", cascadeOrder: 3, epistemicLevel: "M|C", detail: { en: { mechanism: "Prenatal EMF exposure disrupts neuronal migration and synaptogenesis." }, fi: { mechanism: "Prenataalinen EMF-altistus häiritsee hermosolujen migraatiota ja synaptogeneesiä." }, link: "/evidence#adhd" } },
  { id: "disease_metabolic", level: 4, label: { en: "4. Metabolic syndrome", fi: "4. Metabolinen oireyht." }, sublabel: { en: "Latency: 3–8 y | Klimentidis 2011", fi: "Viive: 3-8 v | Klimentidis 2011" }, color: "#D4A85A", cascadeOrder: 4, epistemicLevel: "E", detail: { en: { mechanism: "Insulin resistance + chronic cortisol → metabolic syndrome. Klimentidis et al. 2011 (Proc R Soc B): 24 populations of 8 species show parallel weight gain, including laboratory animals on controlled diets (p < 10⁻⁷)." }, fi: { mechanism: "Insuliiniresistenssi + krooninen kortisoli → metabolinen oireyhtymä. Klimentidis ym. 2011 (Proc R Soc B): 24 populaatiota 8 lajissa osoittaa rinnakkaista painonnousua, ml. laboratorio­eläimet kontrolloiduilla ruokavalioilla (p < 10⁻⁷)." }, keyRefs: ["klimentidis2011_procrsocb"], link: "/evidence#metabolic" } },
  { id: "disease_autoimmune", level: 4, label: { en: "5. Autoimmune diseases", fi: "5. Autoimmuunisairaudet" }, sublabel: { en: "Latency: 5–10 years", fi: "Viive: 5-10 vuotta" }, color: "#D47A8B", cascadeOrder: 5, epistemicLevel: "M|C", detail: { en: { mechanism: "Vagal tone decline + chronic inflammation + gut permeability → autoimmunity." }, fi: { mechanism: "Vagaalisen tonuksen lasku + krooninen tulehdus + suoliston läpäisevyys → autoimmuniteetti." }, link: "/evidence#autoimmune" } },
  { id: "disease_fertility", level: 4, label: { en: "6. Infertility", fi: "6. Hedelmättömyys" }, sublabel: { en: "Latency: 5–15 years", fi: "Viive: 5-15 vuotta" }, color: "#D4845A", cascadeOrder: 6, epistemicLevel: "E", detail: { en: { mechanism: "Cumulative: sperm quality + ovulation + testosterone + hormonal disruption → infertility." }, fi: { mechanism: "Kumulatiivinen: sperman laatu + ovulaatio + testosteroni + hormonaalinen häiriö → hedelmättömyys." }, link: "/evidence#fertility" } },
  { id: "disease_cancer", level: 4, label: { en: "7. Young-onset cancer", fi: "7. Nuorten syöpä" }, sublabel: { en: "Latency: 10–25 years", fi: "Viive: 10-25 vuotta" }, color: "#A85A5A", cascadeOrder: 7, epistemicLevel: "E", detail: { en: { mechanism: "NK cell decline + ROS damage + mitotic disruption + immunosuppression → cancer risk." }, fi: { mechanism: "NK-solujen lasku + ROS-vaurio + mitoottinen häiriö + immunosuppressio → syöpäriski." }, link: "/evidence#cancer" } },

  // ── LEVEL 5: Demographic cascade (4) ──
  { id: "demo_biocap", level: 5, label: { en: "Biological capacity ↓", fi: "Biologinen kapasiteetti ↓" }, epistemicLevel: "M|C", detail: { en: { mechanism: "Combined effect of spermatogenesis, ovulation, and hormonal disruptions lowers biological reproductive capacity." }, fi: { mechanism: "Spermatogeneesin, ovulaation ja hormonaalisten häiriöiden yhteisvaikutus alentaa biologista lisääntymiskapasiteettia." }, link: "/model#biocap" } },
  { id: "demo_behavior", level: 5, label: { en: "Reproductive motivation ↓", fi: "Lisääntymismotivaatio ↓" }, epistemicLevel: "M|C", detail: { en: { mechanism: "Testosterone and oxytocin decline + depression + sleep disorders → approach behavior and libido decrease." }, fi: { mechanism: "Testosteronin ja oksitosiinin lasku + masennus + unihäiriöt → lähestymiskäyttäytyminen ja libido laskevat." }, link: "/evidence#qbs" } },
  { id: "demo_asfr", level: 5, label: { en: "ASFR ↓ (age-specific)", fi: "ASFR ↓ (ikäkohtainen)" }, epistemicLevel: "E", detail: { en: { mechanism: "Decline in biological capacity and motivation produces age-specific fertility rate (ASFR) decline." }, fi: { mechanism: "Biologisen kapasiteetin ja motivaation lasku tuottaa ikäkohtaisen hedelmällisyysluvun (ASFR) laskun." }, link: "/model#asfr" } },
  { id: "demo_tfr", level: 5, label: { en: "TFR ↓ (total)", fi: "TFR ↓ (kokonais)" }, sublabel: { en: "5.0 → 2.2 globally", fi: "5.0 → 2.2 globaalisti" }, epistemicLevel: "E", detail: { en: { mechanism: "Sum of ASFRs across age groups = total fertility rate (TFR). Global trend: 5.0 → 2.2." }, fi: { mechanism: "ASFR-lukujen summa yli ikäryhmien = kokonaishedelmällisyysluku (TFR). Globaali trendi: 5.0 → 2.2." }, link: "/explore" } },

  // ── LEVEL 6: Ecological branch (8) ──
  { id: "eco_insect", level: 6, label: { en: "Insects ↓", fi: "Hyönteiset ↓" }, sublabel: { en: "−75% Krefeld", fi: "−75% Krefeld" }, epistemicLevel: "E", detail: { en: { mechanism: "Flying insect biomass collapse. CRY navigation disruption + increased LED attraction." }, fi: { mechanism: "Lentävän hyönteisbiomassan romahdus. CRY-navigaation häiriö + LED-attraktion kasvu." }, link: "/sentinel#insects" } },
  { id: "eco_bird", level: 6, label: { en: "Birds ↓", fi: "Linnut ↓" }, sublabel: { en: "PECBMS", fi: "PECBMS" }, epistemicLevel: "E", detail: { en: { mechanism: "CRY compass disruption + insect food decline. PECBMS: long-term declining trend." }, fi: { mechanism: "CRY-kompassin häiriö + hyönteisravinnon väheneminen. PECBMS: pitkän aikavälin laskutrendi." }, link: "/sentinel#birds" } },
  { id: "eco_bat", level: 6, label: { en: "Bats ↓", fi: "Lepakot ↓" }, sublabel: { en: "Lindecke 2026", fi: "Lindecke 2026" }, epistemicLevel: "E", detail: { en: { mechanism: "Lindecke et al. 2026 Science: bats use magnetoreception for navigation. RF disrupts it." }, fi: { mechanism: "Lindecke ym. 2026 Science: lepakot hyödyntävät magnetoreseptiota navigoinnissa. RF häiritsee." }, link: "/sentinel#bats" } },
  { id: "eco_amphibian", level: 6, label: { en: "Amphibians ↓", fi: "Sammakkoeläimet ↓" }, sublabel: { en: "Enigmatic declines", fi: "Enigmatic declines" }, epistemicLevel: "M|C", detail: { en: { mechanism: "Unexplained declines in areas without habitat destruction or disease." }, fi: { mechanism: "Selittämättömät vähenemät alueilla ilman habitaatin tuhoa tai tauteja." }, link: "/sentinel#amphibians" } },
  { id: "eco_bee", level: 6, label: { en: "Bees ↓", fi: "Mehiläiset ↓" }, sublabel: { en: "CCD, grooming↓", fi: "CCD, grooming↓" }, epistemicLevel: "E", detail: { en: { mechanism: "Colony Collapse Disorder + grooming behavior impairment → loss of Varroa resistance." }, fi: { mechanism: "Colony Collapse Disorder + grooming-käyttäytymisen heikkeneminen → Varroa-resistenssin menetys." }, link: "/articles/bees" } },
  { id: "eco_varroa", level: 6, label: { en: "Varroa ← protected", fi: "Varroa ← suojassa" }, sublabel: { en: "Sclerotin, small size", fi: "Sclerotin, pieni koko" }, epistemicLevel: "M|C", detail: { en: { mechanism: "Varroa destructor: 1.1mm, sclerotin armor, no CRY navigation → EMF has no effect." }, fi: { mechanism: "Varroa destructor: 1.1mm, sclerotiinipanssari, ei CRY-navigaatiota → EMF ei vaikuta." }, link: "/articles/bees#varroa" } },
  { id: "eco_tick", level: 6, label: { en: "Ticks ← increasing?", fi: "Punkit ← runsastuvat?" }, sublabel: { en: "Electrostatic contact↑", fi: "Sähköstaattinen kontakti↑" }, epistemicLevel: "C", detail: { en: { mechanism: "Electrostatic charge may increase tick attachment to host. Speculative." }, fi: { mechanism: "Sähköstaattinen varaus voi lisätä punkkien kiinnittymistä isäntään. Spekulatiivinen." }, link: "/evidence#ticks" } },
  { id: "eco_pollination", level: 6, label: { en: "Pollination ↓", fi: "Pölytys ↓" }, sublabel: { en: "Ecosystem service", fi: "Ekosysteemipalvelu" }, epistemicLevel: "E", detail: { en: { mechanism: "Insect pollinator decline threatens 75% of crops. Electrostatic pollination mechanism disruption." }, fi: { mechanism: "Hyönteispölyttäjien väheneminen uhkaa 75% viljelykasveista. Sähköstaattisen pölytysmekanismin häiriö." }, link: "/sentinel#pollination" } },

  // ── LEVEL 0: Evolutionary origin ──
  { id: "northern_package", level: 0, label: { en: "Northern Package (10,000 BP)", fi: "Pohjoinen paketti (10 000 BP)" }, sublabel: { en: "Blue eyes + Lactose tolerance + Cattle", fi: "Siniset silmät + Laktoosinsietokyky + Karjankasvatus" }, epistemicLevel: "M|C", detail: { en: { mechanism: "Co-selection of OCA2 (blue eyes → optical χ), LCT (lactose tolerance → molecular χ via B2/FAD), and cattle husbandry (year-round B2 supply). Creates the population with highest biological CRY sensitivity." }, fi: { mechanism: "OCA2:n (siniset silmät → optinen χ), LCT:n (laktoosinsietokyky → molekulaarinen χ B2/FAD kautta) ja karjankasvatuksen (ympärivuotinen B2-saanti) koselektio. Luo populaation jolla on korkein biologinen CRY-herkkyys." }, link: "/evidence/evolution" } },
];

export const EDGES: CausalMapEdge[] = [
  // Electrification boundary → channels
  { from: "electrification_boundary", to: "ch_elf", label: "access gate" },
  { from: "electrification_boundary", to: "ch_if", label: "access gate" },
  { from: "electrification_boundary", to: "ch_rf", label: "access gate" },

  // Channels → modulation layers
  { from: "ch_static", to: "mod_ion" },
  { from: "ch_static", to: "mod_dc" },
  { from: "ch_elf", to: "mod_ion" },
  { from: "ch_elf", to: "mod_vagus" },
  { from: "ch_elf", to: "mod_dc" },
  { from: "ch_elf", to: "mod_bioelectric" },
  { from: "ch_if", to: "mod_division" },
  { from: "ch_if", to: "mod_ion" },
  { from: "ch_if", to: "mod_mito" },
  { from: "ch_if", to: "mod_cyb5b", label: "IF → Cyb5b (Kim 2026: 4 kHz)" },
  { from: "ch_rf", to: "mod_pineal" },
  { from: "ch_rf", to: "mod_mito" },
  { from: "ch_rf", to: "mod_ion" },

  // Modulation layers → mechanisms
  { from: "mod_geometry", to: "mod_ion" },
  { from: "mod_ion", to: "mech_vgcc_ros" },
  { from: "mod_ion", to: "mech_ifo_linear" },
  { from: "mod_ion", to: "mech_gpcr" },
  { from: "mod_dc", to: "mech_nav_plasticity" },
  { from: "mod_bioelectric", to: "mech_vgcc_ros" },
  { from: "mod_vagus", to: "mech_vagal_antiinflam" },
  { from: "mod_pineal", to: "mech_cry_melatonin" },
  { from: "mod_division", to: "mech_mitotic_spindle" },
  { from: "mod_division", to: "mech_dep_quadratic" },
  { from: "mod_mito", to: "mech_vgcc_ros" },
  { from: "mod_cyb5b", to: "mech_cyb5b_ca" },
  { from: "ch_elf", to: "mod_cyb5b" },
  { from: "mod_ion", to: "mech_vgcc_genotype" },
  { from: "ch_rf", to: "mech_vgcc_genotype" },

  // T-type bifurcation: Schwan → Cav3 → testosterone/sperm
  { from: "ch_elf", to: "mech_ttype_bifurcation", label: "Schwan: E_ext → δVm (ELF)" },
  { from: "mech_ttype_bifurcation", to: "tissue_testosterone", label: "Ca²⁺ → StAR → testosterone (Xiang 2025)" },
  { from: "mech_ttype_bifurcation", to: "tissue_sperm", label: "Ca²⁺ → spermatocyte dev (Ma 2026)" },

  // Mechanisms → tissue effects
  { from: "mech_vgcc_ros", to: "tissue_sperm" },
  { from: "mech_vgcc_ros", to: "tissue_ovarian" },
  { from: "mech_vgcc_ros", to: "tissue_testosterone" },
  { from: "mech_vgcc_ros", to: "tissue_nk_cells" },
  { from: "mech_gpcr", to: "tissue_vagal_tone" },
  { from: "mech_nav_plasticity", to: "tissue_bbb" },
  { from: "mech_cry_melatonin", to: "tissue_melatonin" },
  { from: "mech_cry_melatonin", to: "tissue_cortisol" },
  { from: "mech_vagal_antiinflam", to: "tissue_vagal_tone" },
  { from: "mech_vagal_antiinflam", to: "tissue_gut" },
  { from: "mech_mitotic_spindle", to: "tissue_sperm" },
  { from: "mech_mitotic_spindle", to: "tissue_ovarian" },
  { from: "mech_mitotic_spindle", to: "tissue_gut" },
  { from: "mech_ifo_linear", to: "tissue_sperm" },
  { from: "mech_ifo_linear", to: "tissue_insulin" },
  { from: "mech_dep_quadratic", to: "tissue_sperm" },
  { from: "mech_cyb5b_ca", to: "tissue_sperm" },
  { from: "mech_cyb5b_ca", to: "tissue_ovarian" },
  { from: "mech_vgcc_genotype", to: "tissue_melatonin" },
  { from: "mod_ion", to: "mech_beta_katp" },
  { from: "mech_beta_katp", to: "tissue_insulin" },
  { from: "ch_rf", to: "mech_window_effect" },
  { from: "mech_window_effect", to: "mech_vgcc_ros" },

  // Ionic hierarchy → depression (treatment convergence)
  { from: "mech_vgcc_ros", to: "mech_ionic_hierarchy" },
  { from: "mech_ionic_hierarchy", to: "disease_depression" },
  // Skin bioelectric → VGCC convergence, neuromodulation
  { from: "mech_vgcc_ros", to: "mech_skin_bioelectric" },
  { from: "mech_skin_bioelectric", to: "tissue_sperm" },
  // Kaiser Permanente series (IF → multi-endpoint)
  { from: "ch_if", to: "epi_kaiser_series", label: "EMDEX-measured" },
  { from: "epi_kaiser_series", to: "tissue_sperm" },
  { from: "epi_kaiser_series", to: "disease_fertility" },
  { from: "epi_kaiser_series", to: "disease_metabolic" },
  { from: "epi_kaiser_series", to: "disease_adhd" },
  { from: "epi_kaiser_series", to: "disease_cancer" },
  // LED confound → melatonin, retinal
  { from: "mech_vgcc_ros", to: "mech_led_confound" },
  { from: "mech_led_confound", to: "tissue_melatonin" },
  // Hospital EMF → simultaneous cascade
  { from: "mech_led_confound", to: "mech_hospital_emf" },
  { from: "mech_hospital_emf", to: "disease_sleep" },
  // Alzheimer calcium feedback loop
  { from: "mech_vgcc_ros", to: "mech_alzheimer_calcium" },
  { from: "mech_alzheimer_calcium", to: "tissue_bbb" },
  // ADHD calibration error
  { from: "mech_vgcc_ros", to: "mech_adhd_calibration" },
  { from: "mech_adhd_calibration", to: "disease_adhd" },
  // Melatonin bridge: cascade 1 → cascade 6 (serial, not parallel)
  { from: "mech_cry_melatonin", to: "mech_melatonin_fertility" },
  { from: "mech_melatonin_fertility", to: "tissue_ovarian" },
  { from: "mech_melatonin_fertility", to: "tissue_testosterone" },
  { from: "mech_melatonin_fertility", to: "tissue_sperm" },
  // BTB: blood-testis barrier disruption (pathway F extension)
  { from: "mech_vgcc_ros", to: "tissue_btb", label: "RF → MMP2 → BTB" },
  { from: "tissue_btb", to: "tissue_sperm", label: "Microenvironment compromised" },
  // CRY2-TRPC1: second downstream branch of pathway C (NOT a coupling to pathway A)
  { from: "mech_cry_melatonin", to: "mech_trpc1_calcium", label: "CRY2 → TRPC1 modulation (Yap 2025)" },
  { from: "mech_trpc1_calcium", to: "tissue_ovarian", label: "Ca²⁺ via TRPC1 → nuclear translocation" },
  { from: "mech_trpc1_calcium", to: "tissue_sperm", label: "Ca²⁺ via TRPC1" },
  // FAD/B2 → CRY chromophore dependency (Hirano 2017, Yap 2025)
  { from: "mod_fad_riboflavin", to: "mech_cry_melatonin", label: "FAD chromophore (Hirano 2017)" },
  // Membrane lipid order → CRY orientation (Majewska 2025)
  { from: "mod_membrane_omega", to: "mech_cry_melatonin", label: "CRY orientation order (Majewska 2025)" },
  // AMPK fasting → CRY degradation (Lamia 2009)
  { from: "mod_ampk_fasting", to: "mech_cry_melatonin", label: "CRY1 phosphorylation → degradation (Lamia 2009)" },
  // AMPK fasting → FAD pool increase via β-oxidation
  { from: "mod_ampk_fasting", to: "mod_fad_riboflavin", label: "β-oxidation → FAD pool ↑" },

  // Tissue effects → diseases
  { from: "tissue_melatonin", to: "disease_sleep" },
  { from: "tissue_cortisol", to: "disease_sleep" },
  { from: "tissue_cortisol", to: "disease_depression" },
  { from: "tissue_testosterone", to: "disease_depression" },
  { from: "tissue_bbb", to: "disease_adhd" },
  { from: "tissue_insulin", to: "disease_metabolic" },
  { from: "tissue_cortisol", to: "disease_metabolic" },
  { from: "tissue_vagal_tone", to: "disease_autoimmune" },
  { from: "tissue_gut", to: "disease_autoimmune" },
  { from: "tissue_sperm", to: "disease_fertility" },
  { from: "tissue_ovarian", to: "disease_fertility" },
  { from: "tissue_testosterone", to: "disease_fertility" },
  { from: "tissue_nk_cells", to: "disease_cancer" },
  { from: "tissue_melatonin", to: "disease_cancer" },

  // Diseases → demographic
  { from: "disease_fertility", to: "demo_biocap" },
  { from: "disease_depression", to: "demo_behavior" },
  { from: "disease_metabolic", to: "demo_biocap" },
  { from: "demo_biocap", to: "demo_asfr" },
  { from: "demo_behavior", to: "demo_asfr" },
  { from: "demo_asfr", to: "demo_tfr" },

  // Ecological branch
  { from: "ch_rf", to: "eco_insect" },
  { from: "ch_rf", to: "eco_bird" },
  { from: "ch_rf", to: "eco_bat" },
  { from: "ch_rf", to: "eco_amphibian" },
  { from: "ch_if", to: "eco_insect" },
  { from: "ch_if", to: "eco_bee" },
  { from: "ch_elf", to: "eco_bee" },
  { from: "eco_bee", to: "eco_varroa", label: "differential" },
  { from: "eco_bee", to: "eco_pollination" },
  { from: "eco_insect", to: "eco_pollination" },

  // Northern Package → CRY/FAD system
  { from: "northern_package", to: "mech_cry_melatonin", label: "OCA2 → optical χ (iris transmission)" },
  { from: "northern_package", to: "mod_fad_riboflavin", label: "LCT → B2 supply (dairy)" },

  // Modulome integration: Autonomic HRV
  { from: "ch_elf", to: "mech_autonomic_hrv", label: "50 Hz → SA Cav3" },
  { from: "mech_autonomic_hrv", to: "disease_depression", label: "HRV↓ → vagal tone↓ → HPA" },
  // Modulome integration: Mitochondrial ROS amplifier
  { from: "mech_vgcc_ros", to: "mech_mitochondrial_ros", label: "Ca²⁺ → MCU → mito" },
  { from: "mech_mitochondrial_ros", to: "tissue_sperm", label: "ROS amplification" },
  // Modulome integration: Pituitary hub
  { from: "mech_ttype_bifurcation", to: "endo_pituitary_hub", label: "Cav3 → hormone secretion" },
  { from: "endo_pituitary_hub", to: "tissue_testosterone", label: "FSH/LH → Leydig" },
];
