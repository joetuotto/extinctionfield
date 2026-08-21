export type EpistemicLevel = "E" | "M|C" | "C" | "L";

export interface NodeDetail {
  mechanism: string;
  fdaDevice?: string | null;
  bermPathway?: string;
  keyRefs?: string[];
  prediction?: string;
  link?: string;
}

export interface CausalMapNode {
  id: string;
  level: number;
  label: string;
  sublabel?: string;
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

export const LEVEL_LABELS = {
  en: [
    "Environment channels",
    "Modulation layers",
    "Biological mechanisms",
    "Tissue effects",
    "Disease cascade",
    "Demographic cascade",
    "Ecological branch",
  ],
  fi: [
    "Ympäristökanavat",
    "Modulaatiotasot",
    "Biologiset mekanismit",
    "Kudosvaikutukset",
    "Sairauskaskadi",
    "Demografinen kaskadi",
    "Ekologinen haara",
  ],
} as const;

export { MAP_EPISTEMIC_COLORS as EPISTEMIC_COLORS, MAP_EPISTEMIC_LABELS as EPISTEMIC_LABELS } from "./epistemicConstants";

export const NODES: CausalMapNode[] = [
  // ── LEVEL 0: Environment channels (4) ──
  {
    id: "ch_static", level: 0, label: "STATIC (0 Hz)",
    sublabel: "Polyesteri, tribosähkö",
    color: "#6B7280", epistemicLevel: "E",
    detail: {
      mechanism: "Tribosähköinen varaus synteettisten tekstiilien ja ihon rajapinnalla tuottaa pysyvän DC-kentän gonadien alueelle.",
      fdaDevice: "DC luunstimulaattorit (PMA 1986)",
      bermPathway: "STATIC_TRIBO_INTERFACE",
      keyRefs: ["shafik1992", "england_2023_ticks"],
      prediction: "Antistaattinen käsittely poistaa lisääntymisvaikutuksen",
      link: "/evidence#static-interface",
    },
  },
  {
    id: "ch_elf", level: 0, label: "ELF (< 1 kHz)",
    sublabel: "Sähköverkko, moottorit, EV",
    color: "#3B82F6", epistemicLevel: "E",
    detail: {
      mechanism: "50/60 Hz vaihtovirta ja sen harmoniset perturbovat kalvopotentiaalia. Kenttä putoaa solukalvon yli (H(f) alipäästösuodatus).",
      fdaDevice: "PEMF (PMA 1979), TMS (510k 2008), tDCS (PMA 2025), VNS (510k 2017), DBS (PMA 1997), SCS (PMA)",
      bermPathway: "Polut A, D, E, F",
      keyRefs: ["pemf_adenosine_cadossi2020", "panagopoulos2025"],
      prediction: "Sähkönkulutus/cap korreloi autoimmuunisairauksien kanssa",
      link: "/evidence#elf-channel",
    },
  },
  {
    id: "ch_if", level: 0, label: "IF (1k–1M Hz)",
    sublabel: "LED-valaistus, HVAC, induktioliedet",
    color: "#F59E0B", epistemicLevel: "E",
    detail: {
      mechanism: "Hakkuriteholähteiden 20-200 kHz kenttä penetroituu solun sisälle (T(f) ylipäästö). IFO-VGIC lineaarinen vaste, kynnys 10⁻⁵ V/m.",
      fdaDevice: "TTFields (PMA 2011, 2015, 2026) — kolme erillistä hyväksyntää",
      bermPathway: "Polku A_mitotic",
      keyRefs: ["ttfields_ef14_jama_2017", "heliyon_150khz_fertility_2022", "boyes2021_led_insects"],
      prediction: "EU LED-kielto kiihdytti TFR-laskua (T1 DID)",
      link: "/evidence#lighting-transition",
    },
  },
  {
    id: "ch_rf", level: 0, label: "RF (> 1 MHz)",
    sublabel: "Matkapuhelin, Wi-Fi, BT, IoT",
    color: "#EF4444", epistemicLevel: "E",
    detail: {
      mechanism: "RF-kentän magneettikomponentti vaikuttaa kryptokromin radikaaliparin spin-tilaan (RPM). Kovariantti Lindgren-korjaus δH_L.",
      fdaDevice: "PRF (510k, 27 MHz). Epäsuora: Lindecke 2026 Science",
      bermPathway: "Polut B, C",
      keyRefs: ["lindecke2026_science", "panagopoulos2025"],
      prediction: "Wi-Fi-tiheys korreloi sirkadiaanisten häiriöiden kanssa",
      link: "/evidence#rf-channel",
    },
  },

  // ── LEVEL 1: Modulation layers (8) ──
  {
    id: "mod_geometry", level: 1, label: "1. Geometrinen perusta",
    sublabel: "Lindgren χ(Ā) ≈ 1.0",
    color: "#8B5CF6", epistemicLevel: "L",
    detail: {
      mechanism: "Lindgrenin metriikka g_μν = η_μν + A_μA_ν tuottaa susceptibiliteettifunktion χ(Ā) joka on saturoitunut (≈1.0) solukalvon lepopotentiaalissa 7×10⁶ V/m.",
      fdaDevice: null,
      bermPathway: "Geometrinen perusta",
      keyRefs: ["lindgren2025"],
      link: "/mathematics#section-1",
    },
  },
  {
    id: "mod_ion", level: 1, label: "2. Ionikanavaverkko",
    sublabel: "3 mrd vuotta konservoitu",
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      mechanism: "VGCC, Nav, K-ATP, CatSper — kaikki sähköisesti moduloitavia. S4-jännitesensori reagoi IFO-mekanismilla 10⁻⁵ V/m. Ei-ionotrooppinen signalointi (Trus & Atlas 2024) madaltaa kynnystä.",
      fdaDevice: "KAIKKI 24+ laiteluokkaa hyödyntävät ionikanavia",
      bermPathway: "Kaikki polut",
      keyRefs: ["panagopoulos2025", "trus_atlas2024"],
      link: "/evidence#therapeutic-devices",
    },
  },
  {
    id: "mod_dc", level: 1, label: "3. DC-ohjausjärjestelmä",
    sublabel: "Becker 1985",
    color: "#8B5CF6", epistemicLevel: "M|C",
    detail: {
      mechanism: "Perineuraalinen puolijohdeverkko joka ohjaa kudosten kasvua, paranemista ja regeneraatiota DC-virroilla. Häiriö → depolarisaatio → kasvunhallinnan menetys.",
      fdaDevice: "DC luunstimulaattorit, galvaaninen haavanstimulaatio",
      bermPathway: "DC-ohjaus",
      keyRefs: ["becker1985", "becker1990"],
      link: "/model#modulome",
    },
  },
  {
    id: "mod_bioelectric", level: 1, label: "4. Bioelektrinen koodi",
    sublabel: "Levin",
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      mechanism: "Vmem-gradientit ohjaavat solujen erilaistumista, morfogeneesiä ja syövän muodostumista. Depolarisaatio = 'syöpäfenotyyppi' (Levin).",
      fdaDevice: "PEMF (epäsuora — bioelektrinen modulaatio)",
      keyRefs: ["adee2023"],
      link: "/model#modulome",
    },
  },
  {
    id: "mod_pineal", level: 1, label: "5. Sirkadiaaninen kello",
    sublabel: "CRY, melatoniini, SCN",
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      mechanism: "Kryptokromin RPM-mekanismi + pinealirauhasen melatoniinisyntesi. EMF häiritsee molempia: RPM suoraan, melatoniinia SCN:n kautta.",
      fdaDevice: "TMS (FDA 2008) — kortikaalinen sirkadiaaninen modul.",
      bermPathway: "Polut B, C",
      keyRefs: ["lindecke2026_science", "chang2015_ipad_melatonin"],
      link: "/mathematics#section-2b",
    },
  },
  {
    id: "mod_vagus", level: 1, label: "6. Vagus-akseli",
    sublabel: "Anti-inflammatorinen refleksi",
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      mechanism: "Vagushermon kolinerginen anti-inflammatorinen refleksi. VNS aktivoi → tulehdus vähenee. Krooninen EMF häiritsee → refleksi heikkenee → krooninen tulehdus.",
      fdaDevice: "VNS: GammaCore (510k 2017), 14+ auriculaarista VNS-laitetta",
      bermPathway: "Polku E",
      keyRefs: ["vns_gammacore"],
      link: "/evidence#pathway-E",
    },
  },
  {
    id: "mod_division", level: 1, label: "7. Solunjakautuminen",
    sublabel: "TTFields-mekanismi",
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      mechanism: "IF-kenttä häiritsee mitoottisen karan kokoamista. Geometrinen kenttävahvistus kaulakuroutumassa G ≈ 25×. f_opt = K/d_cell (K ≈ 3.7 Hz·m).",
      fdaDevice: "TTFields/Optune (PMA ×3: GBM, mesoteliooma, haima)",
      bermPathway: "Polku A_mitotic",
      keyRefs: ["ttfields_ef14_jama_2017", "ttfields_patent_7016725"],
      link: "/evidence#pathway-A-mitotic",
    },
  },
  {
    id: "mod_mito", level: 1, label: "8. Mitokondriaalinen",
    sublabel: "CCO, fotobiomodulaatio",
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      mechanism: "Sytokromi c -oksidaasi (CCO) absorboi punasta/NIR-valoa → ATP↑, ROS-modulaatio. Ei-terminen sähkömagneettinen vuorovaikutus kromoforin kanssa.",
      fdaDevice: "LLLT/Fotobiomodulaatio (510k 2007)",
      bermPathway: "Mitokondriaalinen",
      keyRefs: ["lllt_fda_2007_alopecia", "hamblin2013_photomedicine"],
      link: "/evidence#therapeutic-devices",
    },
  },

  // ── LEVEL 2: Biological mechanisms (8) ──
  { id: "mech_vgcc_ros", level: 2, label: "VGCC → Ca²⁺ → ROS", epistemicLevel: "E", detail: { mechanism: "Jänniteohjatut kalsiumkanavat avautuvat → Ca²⁺-influksi → mitokondriaaliset ROS → DNA-vaurio.", bermPathway: "A", link: "/evidence#pathway-A" } },
  { id: "mech_gpcr", level: 2, label: "GPCR-adenosiini → cAMP", epistemicLevel: "E", detail: { mechanism: "PEMF-mekanismi: adenosiini-A2A-reseptorin aktivointi → cAMP-kaskadi → anti-inflammatorinen vaste.", bermPathway: "GPCR", link: "/evidence#pathway-GPCR" } },
  { id: "mech_nav_plasticity", level: 2, label: "Nav → neuroplastisuus", epistemicLevel: "E", detail: { mechanism: "Natriumkanavien modulointi → kortikaalinen plastisuus. rTMS:n ja tDCS:n perusmekanismi.", bermPathway: "neural", link: "/evidence#pathway-neural" } },
  { id: "mech_cry_melatonin", level: 2, label: "CRY/RPM → melatoniini", epistemicLevel: "E", detail: { mechanism: "Kryptokromin radikaaliparin spin-tila häiriintyy → sirkadiaaninen kello vääristyy → melatoniinisyntesi alenee.", bermPathway: "B,C", link: "/mathematics#section-2b" } },
  { id: "mech_vagal_antiinflam", level: 2, label: "Vagaalinen anti-inflamm.", epistemicLevel: "E", detail: { mechanism: "Vagushermon kolinerginen refleksi: asetyylikoliini → α7nAChR → NF-κB-inhibitio → tulehduksen hallinta.", bermPathway: "E", link: "/evidence#pathway-E" } },
  { id: "mech_mitotic_spindle", level: 2, label: "Mitoottinen kara → aneuploidia", epistemicLevel: "E", detail: { mechanism: "IF-kenttä häiritsee tubuliinipolymerisaatiota ja karan orientaatiota → väärä kromosomijakauma.", bermPathway: "A_mitotic", link: "/evidence#pathway-A-mitotic" } },
  { id: "mech_ifo_linear", level: 2, label: "IFO lineaarinen (10⁻⁵ V/m)", epistemicLevel: "E", detail: { mechanism: "Ionien pakotettu oskillaatio (IFO): jännitesensorin S4-segmentti reagoi lineaarisesti ulkoiseen kenttään. Kynnys 10⁻⁵ V/m.", bermPathway: "A,A_mitotic", link: "/model#ifo" } },
  { id: "mech_dep_quadratic", level: 2, label: "DEP neliöllinen (>100 V/m)", epistemicLevel: "E", detail: { mechanism: "Dielektroforeesi: neliöllinen voima polarisoituneille partikkeleille epähomogeenisessa kentässä. TTFields-intensiteetti.", bermPathway: "A_mitotic (TTFields)", link: "/evidence#ttfields" } },

  // ── LEVEL 3: Tissue effects (10) ──
  { id: "tissue_sperm", level: 3, label: "Spermatogeneesi ↓", epistemicLevel: "E", detail: { mechanism: "ROS-vaurio, mitoottisen karan häiriö ja Leydig-solujen toimintahäiriö vähentävät siittiötuotantoa.", link: "/evidence#sperm" } },
  { id: "tissue_ovarian", level: 3, label: "Ovulaatio/munasolun laatu ↓", epistemicLevel: "M|C", detail: { mechanism: "Munasolun meioottinen kara häiriintyy, granuloosasolujen apoptoosi lisääntyy.", link: "/evidence#ovarian" } },
  { id: "tissue_testosterone", level: 3, label: "Testosteroni ↓", epistemicLevel: "E", detail: { mechanism: "Leydig-solujen steroidogeneesin häiriö: StAR-proteiinin ilmentyminen alenee → testosteronisyntesi vähenee.", link: "/evidence#testosterone" } },
  { id: "tissue_melatonin", level: 3, label: "Melatoniini ↓", epistemicLevel: "E", detail: { mechanism: "Pinealirauhasen melatoniinisyntesi alenee CRY/RPM-häiriön ja näyttölaitteiden sinisen valon kautta.", link: "/evidence#melatonin" } },
  { id: "tissue_nk_cells", level: 3, label: "NK-solut ↓ (−70%)", epistemicLevel: "E", detail: { mechanism: "Luonnolliset tappajasolut vähenevät. Melatoniini normaalisti stimuloi NK-aktiivisuutta.", link: "/evidence#nk-cells" } },
  { id: "tissue_insulin", level: 3, label: "Insuliiniherkkyys ↓", epistemicLevel: "E", detail: { mechanism: "Melatoniinin puute häiritsee haiman β-solujen rytmiä → insuliiniresistenssi.", link: "/evidence#insulin" } },
  { id: "tissue_cortisol", level: 3, label: "Kortisoli ↑ (krooninen)", epistemicLevel: "E", detail: { mechanism: "HPA-akselin yliaktivaatio: sirkadiaaninen häiriö + vagaalisen tonuksen lasku → krooninen kortisoli.", link: "/evidence#cortisol" } },
  { id: "tissue_bbb", level: 3, label: "BBB-permeabiliteetti ↑", epistemicLevel: "M|C", detail: { mechanism: "Veri-aivoesteen läpäisevyys kasvaa EMF-altistuksessa (Salford ym.).", link: "/evidence#bbb" } },
  { id: "tissue_gut", level: 3, label: "Suoliston epiteeli ↓", epistemicLevel: "M|C", detail: { mechanism: "Suoliston epiteelisolujen nopea jakautumissykli (3-5 pv) tekee niistä haavoittuvia IF-kentän mitoottiselle häiriölle.", link: "/evidence#gut" } },
  { id: "tissue_vagal_tone", level: 3, label: "Vagaalinen tonus ↓", epistemicLevel: "E", detail: { mechanism: "Vagushermon anti-inflammatorisen refleksin heikkeneminen → krooninen matala-asteinen tulehdus.", link: "/evidence#vagal-tone" } },

  // ── LEVEL 4: Disease cascade (7) ──
  { id: "disease_sleep", level: 4, label: "1. Unihäiriöt", sublabel: "Viive: kuukausia", color: "#9B7FD4", cascadeOrder: 1, epistemicLevel: "E", detail: { mechanism: "Melatoniinin puute + sirkadiaaninen häiriö → unihäiriöt. Ensimmäinen kliininen oire.", link: "/evidence#sleep" } },
  { id: "disease_depression", level: 4, label: "2. Masennus", sublabel: "Viive: 1-3 vuotta", color: "#6B9FD4", cascadeOrder: 2, epistemicLevel: "E", detail: { mechanism: "Krooninen unihäiriö + kortisoli + testosteronin lasku → masennus.", link: "/evidence#depression" } },
  { id: "disease_adhd", level: 4, label: "3. ADHD/ASD", sublabel: "Viive: 2-5 vuotta", color: "#5AAD8B", cascadeOrder: 3, epistemicLevel: "M|C", detail: { mechanism: "Prenataalinen EMF-altistus häiritsee hermosolujen migraatiota ja synaptogeneesiä.", link: "/evidence#adhd" } },
  { id: "disease_metabolic", level: 4, label: "4. Metabolinen oireyht.", sublabel: "Viive: 3-8 vuotta", color: "#D4A85A", cascadeOrder: 4, epistemicLevel: "E", detail: { mechanism: "Insuliiniresistenssi + krooninen kortisoli → metabolinen oireyhtymä.", link: "/evidence#metabolic" } },
  { id: "disease_autoimmune", level: 4, label: "5. Autoimmuunisairaudet", sublabel: "Viive: 5-10 vuotta", color: "#D47A8B", cascadeOrder: 5, epistemicLevel: "M|C", detail: { mechanism: "Vagaalisen tonuksen lasku + krooninen tulehdus + suoliston läpäisevyys → autoimmuniteetti.", link: "/evidence#autoimmune" } },
  { id: "disease_fertility", level: 4, label: "6. Hedelmättömyys", sublabel: "Viive: 5-15 vuotta", color: "#D4845A", cascadeOrder: 6, epistemicLevel: "E", detail: { mechanism: "Kumulatiivinen: sperman laatu + ovulaatio + testosteroni + hormonaalinen häiriö → hedelmättömyys.", link: "/evidence#fertility" } },
  { id: "disease_cancer", level: 4, label: "7. Nuorten syöpä", sublabel: "Viive: 10-25 vuotta", color: "#A85A5A", cascadeOrder: 7, epistemicLevel: "E", detail: { mechanism: "NK-solujen lasku + ROS-vaurio + mitoottinen häiriö + immunosuppressio → syöpäriski.", link: "/evidence#cancer" } },

  // ── LEVEL 5: Demographic cascade (4) ──
  { id: "demo_biocap", level: 5, label: "Biologinen kapasiteetti ↓", epistemicLevel: "M|C", detail: { mechanism: "Spermatogeneesin, ovulaation ja hormonaalisten häiriöiden yhteisvaikutus alentaa biologista lisääntymiskapasiteettia.", link: "/model#biocap" } },
  { id: "demo_behavior", level: 5, label: "Lisääntymismotivaatio ↓", epistemicLevel: "M|C", detail: { mechanism: "Testosteronin ja oksitosiinin lasku + masennus + unihäiriöt → lähestymiskäyttäytyminen ja libido laskevat.", link: "/evidence#qbs" } },
  { id: "demo_asfr", level: 5, label: "ASFR ↓ (ikäkohtainen)", epistemicLevel: "E", detail: { mechanism: "Biologisen kapasiteetin ja motivaation lasku tuottaa ikäkohtaisen hedelmällisyysluvun (ASFR) laskun.", link: "/model#asfr" } },
  { id: "demo_tfr", level: 5, label: "TFR ↓ (kokonais)", sublabel: "5.0 → 2.2 globaalisti", epistemicLevel: "E", detail: { mechanism: "ASFR-lukujen summa yli ikäryhmien = kokonaishedelmällisyysluku (TFR). Globaali trendi: 5.0 → 2.2.", link: "/explore" } },

  // ── LEVEL 6: Ecological branch (8) ──
  { id: "eco_insect", level: 6, label: "Hyönteiset ↓", sublabel: "−75% Krefeld", epistemicLevel: "E", detail: { mechanism: "Lentävän hyönteisbiomassan romahdus. CRY-navigaation häiriö + LED-attraktion kasvu.", link: "/sentinel#insects" } },
  { id: "eco_bird", level: 6, label: "Linnut ↓", sublabel: "PECBMS", epistemicLevel: "E", detail: { mechanism: "CRY-kompassin häiriö + hyönteisravinnon väheneminen. PECBMS: pitkän aikavälin laskutrendi.", link: "/sentinel#birds" } },
  { id: "eco_bat", level: 6, label: "Lepakot ↓", sublabel: "Lindecke 2026", epistemicLevel: "E", detail: { mechanism: "Lindecke ym. 2026 Science: lepakot hyödyntävät magnetoreseptiota navigoinnissa. RF häiritsee.", link: "/sentinel#bats" } },
  { id: "eco_amphibian", level: 6, label: "Sammakkoeläimet ↓", sublabel: "Enigmatic declines", epistemicLevel: "M|C", detail: { mechanism: "Selittämättömät vähenemät alueilla ilman habitaatin tuhoa tai tauteja.", link: "/sentinel#amphibians" } },
  { id: "eco_bee", level: 6, label: "Mehiläiset ↓", sublabel: "CCD, grooming↓", epistemicLevel: "E", detail: { mechanism: "Colony Collapse Disorder + grooming-käyttäytymisen heikkeneminen → Varroa-resistenssin menetys.", link: "/articles/bees" } },
  { id: "eco_varroa", level: 6, label: "Varroa ← suojassa", sublabel: "Sclerotin, pieni koko", epistemicLevel: "M|C", detail: { mechanism: "Varroa destructor: 1.1mm, sclerotiinipanssari, ei CRY-navigaatiota → EMF ei vaikuta.", link: "/articles/bees#varroa" } },
  { id: "eco_tick", level: 6, label: "Punkit ← runsastuvat?", sublabel: "Sähköstaattinen kontakti↑", epistemicLevel: "C", detail: { mechanism: "Sähköstaattinen varaus voi lisätä punkkien kiinnittymistä isäntään. Spekulatiivinen.", link: "/evidence#ticks" } },
  { id: "eco_pollination", level: 6, label: "Pölytys ↓", sublabel: "Ekosysteemipalvelu", epistemicLevel: "E", detail: { mechanism: "Hyönteispölyttäjien väheneminen uhkaa 75% viljelykasveista. Sähköstaattisen pölytysmekanismin häiriö.", link: "/sentinel#pollination" } },
];

export const EDGES: CausalMapEdge[] = [
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
];
