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

export const LEVEL_LABELS: Record<"en" | "fi", Record<number, string>> = {
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

  // ── LEVEL -1: Electrification boundary (1) ──
  {
    id: "electrification_boundary", level: -1, label: "Sähköistymiskynnys",
    sublabel: "IFO-VGIC 10⁻⁵ V/m = binäärinen raja",
    color: "#F59E0B", epistemicLevel: "E",
    detail: {
      mechanism: "IFO-VGIC-aktivaatiokynnys (10⁻⁵ V/m) ylittyy jokaisen kotitalouden sähkölaitteen käyttöetäisyydellä. Sähkön saatavuus toimii binäärisenä altistumisen rajana: sähköistetyt vs. sähköistämättömät väestöt. Access-korjattu r paranee −0,864 → −0,885.",
      bermPathway: "Kaikki kanavat",
      keyRefs: ["panagopoulos2025", "delong2010_plosone"],
      prediction: "DHS-mikrodata: sähköistettyjen kotitalouksien TFR < sähköistämättömien (tulojen ja koulutuksen kontrolloinnin jälkeen)",
      link: "/evidence#electrification-boundary",
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
      fdaDevice: "KAIKKI 26 laiteluokkaa hyödyntävät ionikanavia",
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

  {
    id: "mod_cyb5b", level: 1, label: "9. Cyb5b EMF-sensori",
    sublabel: "Kim 2026 Cell",
    color: "#8B5CF6", epistemicLevel: "E",
    detail: {
      mechanism: "Sytokromi b5 tyyppi B (mitokondrion ulkokalvoproteiini) tunnistettu genominlaajuisessa CRISPR-seulonnassa EMF-sensoriksi. 60 Hz pulssi-EMF → Cyb5b → rytmiset Ca²⁺-oskillaatiot → geenipromoottorin aktivaatio. Reversiibeli 24h.",
      fdaDevice: "EMF-geenikytkin (Cell 2026, Kim ym.) — 25. laiteluokka",
      bermPathway: "Cyb5b-transduktioreitti",
      keyRefs: ["kim2026_cell_emf_gene_switch"],
      prediction: "Ympäristö-ELF (50/60 Hz) aktivoi hallitsemattomasti samoja geenipromoottoreita",
      link: "/evidence#therapeutic-devices",
    },
  },

  // ── LEVEL 2: Biological mechanisms (12) ──
  { id: "mech_vgcc_ros", level: 2, label: "VGCC → Ca²⁺ → ROS", epistemicLevel: "E", detail: { mechanism: "Jänniteohjatut kalsiumkanavat avautuvat → Ca²⁺-influksi → mitokondriaaliset ROS → DNA-vaurio.", bermPathway: "A", link: "/evidence#pathway-A" } },
  { id: "mech_gpcr", level: 2, label: "GPCR-adenosiini → cAMP", epistemicLevel: "E", detail: { mechanism: "PEMF-mekanismi: adenosiini-A2A-reseptorin aktivointi → cAMP-kaskadi → anti-inflammatorinen vaste.", bermPathway: "GPCR", link: "/evidence#pathway-GPCR" } },
  { id: "mech_nav_plasticity", level: 2, label: "Nav → neuroplastisuus", epistemicLevel: "E", detail: { mechanism: "Natriumkanavien modulointi → kortikaalinen plastisuus. rTMS:n ja tDCS:n perusmekanismi.", bermPathway: "neural", link: "/evidence#pathway-neural" } },
  { id: "mech_cry_melatonin", level: 2, label: "CRY/RPM → melatoniini", epistemicLevel: "E", detail: { mechanism: "Kryptokromin radikaaliparin spin-tila häiriintyy → sirkadiaaninen kello vääristyy → melatoniinisyntesi alenee. Ihmisen CRY/RPM-magnetoreseptio vahvistettu sinivaloriippuvaiseksi (Chae ym. 2019, P<0,001), inklinaatiokompassi vahvistettu.", bermPathway: "B,C", keyRefs: ["chae2019", "ritz2004_rf_compass", "engels2014_emf_bird", "sherrard2018", "yoshii2009"], link: "/evidence#human-cry-magnetoreception" } },
  { id: "mech_vagal_antiinflam", level: 2, label: "Vagaalinen anti-inflamm.", epistemicLevel: "E", detail: { mechanism: "Vagushermon kolinerginen refleksi: asetyylikoliini → α7nAChR → NF-κB-inhibitio → tulehduksen hallinta.", bermPathway: "E", link: "/evidence#pathway-E" } },
  { id: "mech_mitotic_spindle", level: 2, label: "Mitoottinen kara → aneuploidia", epistemicLevel: "E", detail: { mechanism: "IF-kenttä häiritsee tubuliinipolymerisaatiota ja karan orientaatiota → väärä kromosomijakauma.", bermPathway: "A_mitotic", link: "/evidence#pathway-A-mitotic" } },
  { id: "mech_ifo_linear", level: 2, label: "IFO lineaarinen (10⁻⁵ V/m)", epistemicLevel: "E", detail: { mechanism: "Ionien pakotettu oskillaatio (IFO): jännitesensorin S4-segmentti reagoi lineaarisesti ulkoiseen kenttään. Kynnys 10⁻⁵ V/m.", bermPathway: "A,A_mitotic", link: "/model#ifo" } },
  { id: "mech_dep_quadratic", level: 2, label: "DEP neliöllinen (>100 V/m)", epistemicLevel: "E", detail: { mechanism: "Dielektroforeesi: neliöllinen voima polarisoituneille partikkeleille epähomogeenisessa kentässä. TTFields-intensiteetti.", bermPathway: "A_mitotic (TTFields)", link: "/evidence#ttfields" } },
  { id: "mech_cyb5b_ca", level: 2, label: "Cyb5b → Ca²⁺ oskillaatiot", epistemicLevel: "E", detail: { mechanism: "CRISPR-seulonnalla tunnistettu Cyb5b toimii EMF-sensorina mitokondrion ulkokalvolla. Tuottaa rytmiset Ca²⁺-oskillaatiot jotka aktivoivat geenipromoottoreita. Kolmas transduktioreitti IFO:n ja RPM:n rinnalla.", bermPathway: "Cyb5b", keyRefs: ["kim2026_cell_emf_gene_switch"], link: "/evidence#therapeutic-devices" } },
  { id: "mech_vgcc_genotype", level: 2, label: "VGCC-genotyyppi × herkkyys", epistemicLevel: "E", detail: { mechanism: "CACNA1C rs7304986 T/C-kantajat osoittavat mitattavan neurofysiologisen vasteen 5G-altistukselle (3.6 GHz) ICNIRP-rajojen alla. T/T-kantajilla ei vaikutusta. Kaksoissokkoasetelma.", bermPathway: "Individual susceptibility", keyRefs: ["sousouri2025_cacna1c_5g_sleep"], link: "/evidence#individual-susceptibility" } },
  { id: "mech_beta_katp", level: 2, label: "β-solu K-ATP → insuliini", epistemicLevel: "E", detail: { mechanism: "US Patent 4,850,959 (1989): resonanssitaajuinen EMF kontrolloi haiman β-solujen insuliinieritystä Ca²⁺-kanavien kautta. Resonanssi → Ca²⁺-influksi → insuliini↑. Ei-resonanssi → Ca²⁺-effluksi → insuliini↓.", bermPathway: "metabolic", keyRefs: ["patent_4850959_insulin"], link: "/evidence#metabolic" } },
  { id: "mech_window_effect", level: 2, label: "Ikkunailmiö", sublabel: "Adey-Blackman 1976", epistemicLevel: "E", detail: { mechanism: "Biologinen vaikutus ei-lineaarinen: Ca²⁺-effluksi aivokudoksesta tapahtuu tietyissä intensiteetti-ikkunoissa (0,1–1,0 mW/cm²) mutta EI korkeammilla tai matalammilla tasoilla. Selittää miksi ICNIRP:n lineaarinen SAR-malli ei havaitse vaikutuksia ja miksi replikaatiotutkimukset voivat epäonnistua.", bermPathway: "Non-linear dose-response", keyRefs: ["adey1976_calcium_window"], link: "/objections#dose-response" } },
  { id: "mech_ionic_hierarchy", level: 2, label: "Ioninen hoitohierarkia", sublabel: "Ca²⁺-konvergenssi", epistemicLevel: "E", detail: { mechanism: "Kaikki mielialahäiriöiden hoidot konvergoivat Ca²⁺-homeostaasiin: SSRI (epäsuora, NNT 7) < TMS/tDCS (sähkömagneettinen, NNT 5) < litium (ioninen, Li⁺→VGSC) < psykedeelit (ioninen reset, 5-HT2A→Cav1.2/CACNA1C, NNT 3). Tehokkuus seuraa ionisen kohdistuksen astetta.", bermPathway: "Ionic treatment", keyRefs: ["cipriani2018_antidepressants", "goodwin2022_psilocybin", "sousouri2025_cacna1c", "elmallakh2004_lithium_ion", "zarate2006_ketamine"], prediction: "P14: EMF-altistus × psykedeelien vaste; P15: CACNA1C-genotyyppi × vaste; P16: litium suojaa EMF-mielialavaikutuksilta", link: "/evidence#ionic-hierarchy" } },
  { id: "mech_skin_bioelectric", level: 2, label: "Ihon biosähköinen sensorijärjestelmä", sublabel: "TEP + pietsosähkö + VGCC", epistemicLevel: "E", detail: { mechanism: "Epidermis ylläpitää transepiteliaalista potentiaalia (TEP, 10–60 mV) Na⁺/K⁺-ATPaasin avulla. Dermiksen kollageeni on pietsosähköinen (7–8 pC/N) ja muuntaa mekaanisen voiman jännitteeksi joka avaa VGCC-kanavat. PIEZO1/TRPV4/VGCC konvergoivat Ca²⁺-vasteeseen. EMF häiritsee kaikkia kolmea järjestelmää samanaikaisesti.", bermPathway: "Dermal bioelectric", keyRefs: ["lim2024_skin_battery", "zhao2006_wound_ef", "fukada1957_piezo", "skedung2013_nanoscale_touch"], prediction: "P17: EMF vähentää TEP:ia; P18: EMF hidastaa haavan paranemista", link: "/evidence#skin-battery" } },
  { id: "mech_led_confound", level: 2, label: "LED IF-EMF -sekoittaja", sublabel: "65 kHz–2 MHz ajuri", epistemicLevel: "C", detail: { mechanism: "Kaikki LED-valonlähteet sisältävät hakkuriteholähteen (65 kHz – 2 MHz IF-EMF). Verkkokalvon Cav1.4-kanavat ovat VGCC-tyyppisiä ja IF-EMF:n kohteita. Sinivalotutkimuksissa hehkulamppu vs. LED -vertailu sekoittuu IF-EMF:ään. A2E-fotosensitisaatio on todellinen, mutta IF-EMF voi vahvistaa sitä synergistisesti. Yötila poistaa sinivalon mutta EI IF-EMF:ää.", bermPathway: "LED confound", keyRefs: ["pmc4896623_cav14", "pmc3885580_retinal_vgcc", "pmc7830240_blue_light"], prediction: "P19–P22: IF-EMF välittää LED-sinivalovauriota", link: "/evidence#led-confound" } },
  { id: "mech_hospital_emf", level: 2, label: "Sairaala-EMF", sublabel: "PHS + modulooma", epistemicLevel: "C", detail: { mechanism: "Post-hospital syndrome (Krumholz NEJM 2013): riski kaikille diagnooseille 30 pv kotiutumisen jälkeen. Sairaalat ovat korkeimman EMF:n ympäristö: 24/7 LED (IF), Wi-Fi (RF), monitorit (IF+ELF), sähkösängyt (ELF). ICU: 40 µT laitteiden lähellä. Vanhukset 95% ajasta sängyssä. BERM: simultaaninen modulooma-aktivaatio heikentyneessä ionikanavahomeostaasissa.", bermPathway: "Hospital EMF", keyRefs: ["krumholz2013_phs", "pubmed10447544_icu_emf"], prediction: "P23–P25: sairaala-EMF korrelaatio ja interventio", link: "/evidence#hospital-emf" } },
  { id: "mech_alzheimer_calcium", level: 2, label: "Amyloidi-kalsium-palautesilmukka", sublabel: "Ca²⁺ → Aβ → huokoset → Ca²⁺", epistemicLevel: "C", detail: { mechanism: "EMF → VGCC → Ca²⁺ ↑ → BACE1 → Aβ-oligomeerit. Ca²⁺:n läsnäollessa Aβ muodostaa toksisia oligomeereja (Bhatt PMC3065491). Oligomeerit muodostavat kalvon Ca²⁺-huokosia → positiivinen palautesilmukka. Preseniini-konvergenssi: PSEN1/2-mutaatiot (geneettinen) ja EMF-VGCC (ympäristöllinen) konvergoivat samaan Ca²⁺-polkuun. Arendash-paradoksi: kontrolloitu EMF suojaa (918 MHz, MemorEM/TEMT) — annos/taajuus/konteksti ratkaisevat.", bermPathway: "Alzheimer calcium", keyRefs: ["pmc4909906_calcium_ad", "pmc3065491_bhatt_ca_oligomers", "pmc7179355_oday_calcium", "pmc8125740_calcium_abeta"], prediction: "P29–P32: AD korreloi EMF:n kanssa, CACNA1C moduloi, matala-EMF hidastaa", link: "/evidence#alzheimer-calcium" } },
  { id: "mech_adhd_calibration", level: 2, label: "ADHD-kalibraatiovirhe", sublabel: "HCN/VGCC-viritys → S/N ↓", epistemicLevel: "C", detail: { mechanism: "Raskausaikainen EMF → sikiön VGCC-aktivaatio → Ca²⁺-häiriö kriittisessä kehitysikkunassa → ionikanavien (HCN, VGCC, KCNQ) kalibraatiovirhe PFC:n pyramidaalineuroneissa → signaali-kohinasuhteen vaje → ADHD-fenotyyppi. CACNA1C-variantit assosioituvat ADHD:hen, ASD:hen, bipolaarihäiriöön GWAS:ssa. Timothy-syndrooma (CACNA1C GoF) → autismi = geneettinen ääriesimerkki. Guanfasiini (FDA/EMA ADHD) toimii SUORAAN ionikanaviin: α2A → cAMP↓ → HCN sulkeutuu → Vm stabiloituu. Li 2020 (JAMA, 1482 paria): objektiivisesti mitattu raskausaikainen EMF → ADHD-riski.", bermPathway: "ADHD calibration", keyRefs: ["li2020_jama_adhd", "pmc6101623_cacna1c_gwas", "pmc6894750_timothy", "wang2007_guanfacine_hcn"], prediction: "P33–P35: CACNA1C × EMF → ADHD, guanfasiini suojaa, prevalenssi seuraa EMF:ää", link: "/evidence#adhd-calibration" } },
  { id: "mech_melatonin_fertility", level: 2, label: "Melatoniinisilta", sublabel: "Kaskadi 1 → kaskadi 6", epistemicLevel: "C", detail: { mechanism: "EMF → pinealirauhanen → melatoniini ↓ kytkee unikaskadin (1) hedelmällisyyskaskadiin (6): kaskadit ovat SARJASSA, eivät rinnakkain. Viisi polkua: (1) HPG-akseli: melatoniini → hypotalamus → GnRH → LH/FSH → gonadit; (2) antioksidantti: follikkelinesteen melatoniini → ROS-neutralointi → munasolun suoja (Tamura 2012); (3) anti-inflammatorinen: NF-κB ↓; (4) mitokondriaalinen: AMPK/SIRT1 ↑; (5) epigeneettinen: Gdf9/Bmp15-säätely. VAROITUS: melatoniinin HPG-vaikutus on KAKSISUUNTAINEN — korkeina pitoisuuksina se voi suppressoida GnRH:ta.", bermPathway: "Melatonin bridge", keyRefs: ["tamura2012_follicular_melatonin", "tong2017_melatonin_ivf", "battelle1980_emf_melatonin", "reiter2007_melatonin_male"], prediction: "P38–P40: IVF × EMF, melatoniinilisä × EMF -interaktio, vuorotyö", link: "/evidence#melatonin-bridge" } },

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
  { id: "disease_metabolic", level: 4, label: "4. Metabolinen oireyht.", sublabel: "Viive: 3-8 v | Klimentidis 2011", color: "#D4A85A", cascadeOrder: 4, epistemicLevel: "E", detail: { mechanism: "Insuliiniresistenssi + krooninen kortisoli → metabolinen oireyhtymä. Klimentidis ym. 2011 (Proc R Soc B): 24 populaatiota 8 lajissa osoittaa rinnakkaista painonnousua, ml. laboratorio­eläimet kontrolloiduilla ruokavalioilla (p < 10⁻⁷).", keyRefs: ["klimentidis2011_procrsocb"], link: "/evidence#metabolic" } },
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
