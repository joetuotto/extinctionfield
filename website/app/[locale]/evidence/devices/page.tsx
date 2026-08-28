import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BermIcon } from "@/components/BermIcon";
import { TherapeuticFrequencyMap } from "@/components/TherapeuticFrequencyMap";
import { CellSizeFrequencyMatrix } from "@/components/CellSizeFrequencyMatrix";
import { CitationLink } from "@/components/CitationLink";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "The Therapeutic Device Paradox",
    subtitle: "FDA-approved devices proving non-thermal EMF bioactivity, the IFO-VGIC transduction mechanism, and three GSM RCTs.",
    narratives: [
      {
        id: "therapeutic-device-paradox",
        title: "The therapeutic device paradox",
        paragraphs: [
          "Regulatory agencies worldwide have approved 26 device categories whose efficacy depends on non-thermal electromagnetic biological effects — spanning the entire EM spectrum from DC to UV light. These include bone growth stimulators (DC, PMA 1986), TENS (12,000+ individual 510(k) clearances), deep brain stimulation (PMA 1997), rTMS for depression (510(k) 2008), TTFields for cancer (PMA 2011/2015/2026), PRF anti-inflammatory therapy (27 MHz), LLLT/photobiomodulation (510(k) 2007), blue light for neonatal jaundice, and UV phototherapy for psoriasis. In 2026, [[ref:kim2026_cell_gene_switch|Kim et al. (Cell, IF ~64)]] demonstrated a 25th category: an EMF-inducible gene switch where 60 Hz pulsed EMF activates gene promoters in vivo via Cyb5b, a mitochondrial outer membrane protein identified through genome-wide CRISPR screening. A 26th category predates these by decades: [[ref:patent_4850959_insulin|US Patent 4,850,959 (1989)]] described a method for controlling insulin release from pancreatic beta cells using resonance-frequency EMF via calcium channel modulation — resonance frequency causes Ca²⁺ influx and insulin increase, non-resonance frequency causes Ca²⁺ efflux and decrease. If intentional EMF can control gene expression and insulin secretion, unintentional environmental EMF may dysregulate both without awareness. Each approval required clinical proof that electromagnetic energy produces a biological response without thermal heating. This is not controversial EMF safety research — it is mainstream medicine.",
          "The logical contradiction is direct: FDA requires proof of biological effect for device approval, while ICNIRP assumes absence of non-thermal biological effects for exposure limit setting. These two positions are logically incompatible. Non-thermal bioactivity is proven at every frequency from DC to UV light — except at RF frequencies between 300 MHz and 6 GHz. This is not a gap in biology; it is a gap in acknowledgment. The only frequency range where non-thermal effects are ‘not recognized’ is the range used by the telecommunications industry.",
          "The tDCS comparison is particularly revealing: the therapeutic field strength in the cortex (0.3–1.0 V/m) that earned FDA PMA approval in December 2025 is the same order of magnitude as measured urban ambient RF field strength (0.67–1.51 V/m). If 0.3 V/m DC is biologically active enough for FDA approval, urban ambient RF at 0.67 V/m cannot be assumed biologically inert. The Novocure TTFields patent ([[ref:ttfields_patent_7016725|US 7,016,725]]) explicitly identifies that ‘cells in the ovaries or testicles may be sensitive to the electric fields’ at 100–300 kHz — the same frequency range produced by LED lighting drivers.",
        ],
        studies: [
          { citation: "EBI Bone Healing System (FDA PMA)", year: 1979, referenceId: "pemf_bone_fda_review_2020", note: "PEMF non-thermal bone healing, 1–100 Hz" },
          { citation: "NeuroStar rTMS (FDA 510(k))", year: 2008, referenceId: "tms_fda_depression_2008", note: "Neuroplastic changes from pulsed magnetic fields" },
          { citation: "Optune TTFields (FDA PMA, EF-14 phase III)", year: 2015, referenceId: "ttfields_novocure_fda", note: "100–300 kHz disrupts cell division (non-thermal)" },
          { citation: "Flow Neuroscience tDCS (FDA PMA)", year: 2025, referenceId: "tdcs_fda_depression_2025", note: "0.3–1.0 V/m DC changes brain function" },
          { citation: "GammaCore VNS (FDA 510(k))", year: 2017, referenceId: "vns_gammacore_fda", note: "Vagus nerve stimulation, systemic anti-inflammatory" },
          { citation: "Novocure patent US 7,016,725", year: 2006, referenceId: "ttfields_patent_7016725", note: "Identifies ovaries/testicles as sensitive to IF fields" },
          { citation: "Kim et al. (Cell)", year: 2026, referenceId: "kim2026_cell_gene_switch", note: "EMF gene switch via Cyb5b — CRISPR-identified EMF sensor, 60 Hz" },
          { citation: "US Patent 4,850,959", year: 1989, referenceId: "patent_4850959_insulin", note: "Resonance-frequency EMF controls insulin release via Ca²⁺ channels in pancreatic beta cells" },
        ],
      },
      {
        id: "ifo-vgic-review",
        title: "IFO-VGIC: the transduction mechanism ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]])",
        paragraphs: [
          "[[ref:panagopoulos2025_ifo|Panagopoulos et al. (2025, Bioelectromagnetics)]] present a comprehensive review of 131 studies on RF/Wi-Fi biological effects. 95% report oxidative stress — a consensus consistent with [[ref:yakymenko2016|Yakymenko et al. 2016]] (93/100 studies), demonstrating robustness across independent reviews. The IFO (Irregular Forced Opening) mechanism explains how: polarized, coherent RF-EMF forces the S4 voltage sensor of voltage-gated calcium channels to oscillate at a non-physiological frequency, causing irregular channel opening, uncontrolled Ca²⁺ influx, mitochondrial ROS production, DNA damage, sperm disorders, and hormonal changes.",
          "The mechanism is confirmed by VGCC blocker experiments: nifedipine and other calcium channel blockers prevent RF-induced biological effects across multiple study designs ([[ref:pall2013_v2|Pall 2013]]: 23 blocker studies). This is the strongest single source for BERM’s Level 4 node (VGIC activation) and the Level 4→5A edge (Ca²⁺ → ROS). The 95% consensus on oxidative stress across 131 studies supports Level 5A→6 edges (ROS → sperm cascade: SDF, motility, concentration). Quantitative: Yu 2021 reports −8.1% motility per hour of exposure; [[ref:levine2023_sperm|Levine 2023]] reports −51% sperm concentration decline (1973–2018).",
          "[[ref:bertagna2025|Bertagna et al. (2025, Ann NY Acad Sci)]] extend the IFO-VGIC mechanism to intracellular calcium stores. Mouse hippocampal CA1 pyramidal neurons exposed to 50 Hz, 1 mT ELF-EMF for 60 minutes showed inward currents ↓40% and transient outward currents ↓50%. Two independent Ca²⁺ pathways were identified: (1) RyR pathway — dantrolene (ryanodine receptor blocker) fully abrogated EMF effects; (2) SERCA pathway — CPA (SERCA inhibitor) similarly blocked EMF effects. The Ca²⁺ disruption at Level 4 thus operates through multiple independent pathways: direct S4 voltage sensor forced oscillation ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]) and intracellular calcium store dysregulation via RyR and SERCA ([[ref:bertagna2025|Bertagna 2025]]). The multi-pathway nature explains tissue-specific sensitivity: cells with high VGIC density and large intracellular Ca²⁺ stores (neurons, gonadal cells) are more sensitive than cells with low stores (keratinocytes — cf. [[ref:meyer2026|Meyer 2026]], [[ref:haidar2025_5g_skin_null|Haidar 2025]]: null results in skin cells). Note: ELF (50 Hz), not RF — translation to RF is not direct, but the Ca²⁺ pathway is shared (cf. [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]: IFO operates at both ELF and RF with different intensity dependencies).",
        ],
        studies: [
          { citation: "Panagopoulos et al. (Bioelectromagnetics)", year: 2025, referenceId: "panagopoulos2025_ifo", note: "131-study review: 95% report oxidative effects from RF/Wi-Fi. IFO-VGIC mechanism confirmed." },
          { citation: "Yakymenko et al.", year: 2016, referenceId: "yakymenko2016", note: "93/100 studies report oxidative stress from low-intensity RF — independent confirmation of Panagopoulos 2025" },
          { citation: "Pall (J. Cell. Mol. Med.)", year: 2013, referenceId: "pall2013_v2", note: "23 studies: VGCC blockers prevent RF-induced biological effects" },
          { citation: "Bertagna et al. (Ann NY Acad Sci)", year: 2025, referenceId: "bertagna2025", note: "50 Hz, 1 mT: inward currents ↓40%, transient outward ↓50%. RyR + SERCA blockade abrogates EMF effects — intracellular Ca²⁺ stores participate in EMF transduction." },
        ],
      },
      {
        id: "transduction-rcts",
        title: "Three GSM RCTs: the Level 3→4 edge is active",
        paragraphs: [
          "Three independent experimental studies demonstrate that 890–902 MHz GSM signal — BERM’s modeled frequency — produces a measurable biological response at non-thermal SAR. [[ref:koivisto2000|Koivisto et al. (2000a,b, NeuroReport, n=48+48)]] conducted two double-blind RCTs at the University of Turku. 902 MHz GSM left-sided exposure produced cognitive facilitation (faster reaction times) in 3-Back (30 min) and Simple RT/Vigilance/Subtraction tasks (60 min). Facilitation is NOT anti-BERM: acute Ca²⁺ elevation can facilitate synaptic transmission, while chronic elevation produces ROS (Level 5A). This maps to BERM’s recovery window: 30 min exposure + 23.5h recovery → 97% repair → no net damage. Caveat: not replicated (Haarala 2003: n=32, null; Haarala 2005: n=32 children, null).",
          "[[ref:eliyahu2006|Eliyahu et al. (2006, Bioelectromagnetics, n=36)]] used 890.2 MHz bilateral exposure for 2 hours (Nokia 5110, 2W peak). Left-sided exposure slowed left-hand RT in spatial recognition — demonstrating lateralization: EMF effect localizes to the exposed hemisphere. This provides direct empirical support for BERM’s Level 3 two-channel spatial structure: phone in pocket → testes, phone at ear → hypothalamus. Compatible with local VGCC activation (pathway A) and local BBB opening (pathway E, cf. [[ref:salford2003|Salford 2003]] at SAR 0.016 W/kg).",
          "[[ref:luria2009|Luria et al. (2009, Bioelectromagnetics, n=48 right-handed males)]] applied 890.2 MHz for 1 hour at SAR 0.54–1.09 W/kg. Right-hand RT increased during left-sided exposure in the first 2 blocks only — the effect vanished in later blocks. This time-dependent adaptation maps to BERM’s pathway D (HPA→HPG): Selye’s GAS dynamics (alarm → resistance). The acute alarm→resistance transition observed within 1 hour is the first step of the chronic process BERM models: sustained HPA activation → cortisol↑ → HPG suppression. Male-only sample matches BERM’s bioCap target population. Caveat: effect only in first 2 blocks — adaptation or random fluctuation.",
        ],
        studies: [
          { citation: "Koivisto et al. (NeuroReport)", year: 2000, referenceId: "koivisto2000", note: "Two double-blind RCTs (n=48+48): 902 MHz → cognitive facilitation. Not replicated (Haarala 2003, 2005)." },
          { citation: "Eliyahu et al. (Bioelectromagnetics)", year: 2006, referenceId: "eliyahu2006", note: "n=36, 890 MHz, 2h: lateralized RT effect — supports two-channel spatial structure" },
          { citation: "Luria et al. (Bioelectromagnetics)", year: 2009, referenceId: "luria2009", note: "n=48 males, 890 MHz, 1h: time-dependent lateralized effect — GAS dynamics" },
        ],
      },
    ],
    paradoxCards: [
      {
        label: "tDCS ≈ urban ambient",
        text: "The therapeutic field strength in FDA-approved tDCS (0.3–1.0 V/m) is the same order of magnitude as measured urban ambient RF (0.67–1.51 V/m). If 0.3 V/m is biologically active enough for FDA approval, urban ambient cannot be assumed inert.",
      },
      {
        label: "TTFields patent risk",
        text: "Novocure’s TTFields patent ([[ref:ttfields_patent_7016725|US 7,016,725]]) explicitly states that ‘ovarian or testicular cells may be sensitive to electric fields’ at 100–300 kHz — the same frequency range as LED switched-mode power supplies found in every modern building.",
      },
      {
        label: "Chromophore generalization",
        text: "LLLT works because visible light photons are absorbed by cytochrome c oxidase (CCO) in mitochondria. RF fields affect biology through cryptochrome radical pairs (CRY). Both are chromophores — molecules whose conformation changes when they absorb specific EM frequencies. Different chromophore, same principle, same non-thermal mechanism class.",
      },
    ],
    paradoxCalTitle: "Why biological sensitivity is expected, not surprising",
    paradoxCal1: "The human eye can detect a single photon — one quantum of electromagnetic radiation carrying ~4×10⁻¹⁹ joules, one-tenth of thermal noise energy ([[ref:vaziri2016|Vaziri et al. 2016, Nature Communications]]). Evolution optimized this electromagnetic sensor to the quantum limit because information is valuable for survival. If evolution pushed photon detection to the single-quantum boundary, why would it not have pushed electromagnetic field detection to comparable extremes?",
    paradoxCal2: "It did. Panagopoulos et al. 2025 (Frontiers in Public Health) demonstrate that voltage-gated ion channels respond to polarized, coherent electromagnetic fields as weak as 10⁻⁵ V/m — one hundred thousandth of a volt per meter — through the Ion Forced Oscillation mechanism. Typical environmental IF-EMF from LED drivers and power electronics ranges from 0.01 to 3 V/m, exceeding this biological threshold by a factor of 1,000 to 300,000. The ‘intensity gap’ between therapeutic devices and environmental exposure does not exist at the biological level.",
    paradoxCal3: "There is no evolved filter for IF or RF frequencies because these frequencies did not exist in the natural environment during the 3.8 billion years of biological evolution. Ion channels are ‘wideband receivers’ with no rejection of frequencies that nature never produced. Every technical signal is a potential disruption because biological sensors cannot distinguish it from a physiological signal. This is the same reason synthetic chemicals can disrupt the endocrine system — evolution did not build defenses against molecules it never encountered.",
    thCitation: "Citation",
    thYear: "Year",
    thNote: "Note",
    flockOffTitle: "Commercial Device Paradox: Flock Off / Symterra",
    flockOffP1: "Flock Off (now Symterra, 10,000+ installations) is a commercial product that uses 120 Hz ELF pulses to disrupt birds’ cryptochrome-based (CRY) navigation system. The product is SOLD on the premise that EMF affects biological systems non-thermally. The mechanism is the radical pair mechanism (RPM) where ELF-EMF disrupts the quantum state of CRY protein.",
    flockOffP2: "Paradox: 120 Hz = second harmonic of power grid (2 × 60 Hz). CRY1/CRY2 are the SAME proteins in the human circadian clock. Cry4 is bird-specific magnetoreceptor, but 120 Hz ELF ALSO affects Cry1/Cry2 which regulate mammalian circadian rhythm. ICNIRP maintains that ELF-EMF does not affect biological systems — a company commercially sells a product that works by precisely this effect.",
    flockOffP3: "BERM-Eco link: Flock Off directly proves that ELF-EMF disrupts CRY navigation. BERM-Eco’s bee-Varroa cascade is based on the same mechanism. [[ref:favre_johansson_2025|Favre & Johansson 2025]] (Faraday shielding → colony recovery) is the inverse phenomenon: removing EMF restores CRY function.",
    seeAlso: "See also",
    evidenceRegister: "Evidence register",
  },
  fi: {
    title: "Terapeuttisten laitteiden paradoksi",
    subtitle: "FDA:n hyväksymät laitteet todistavat ei-termistä EMF-bioaktiivisuutta, IFO-VGIC-transduktiomekanismi ja kolme GSM-RCT:ä.",
    narratives: [
      {
        id: "therapeutic-device-paradox",
        title: "Terapeuttisten laitteiden paradoksi",
        paragraphs: [
          "Regulaattorit ympäri maailmaa ovat hyväksyneet 26 laitekategoriaa, joiden teho perustuu ei-termiseen sähkömagneettiseen biologiseen vaikutukseen — kattaen koko EM-spektrin DC:stä UV-valoon. Näihin kuuluvat luunkasvustimulaattorit (DC, PMA 1986), TENS (12 000+ yksittäistä 510(k)-hyväksyntää), syväaivostimulaatio (PMA 1997), rTMS masennukseen (510(k) 2008), TTFields syöpään (PMA 2011/2015/2026), PRF-tulehdushoito (27 MHz), LLLT/fotobiomodulaatio (510(k) 2007), sinivaloterapia vastasyntyneiden keltaisuuteen ja UV-valohoito psoriasikseen. Vuonna 2026 [[ref:kim2026_cell_gene_switch|Kim ym. (Cell, IF ~64)]] osoittivat 25. kategorian: EMF-geenikytkin, jossa 60 Hz pulssi-EMF aktivoi geenipromoottoreita in vivo Cyb5b:n kautta — mitokondrion ulkokalvoproteiini, joka tunnistettiin genominlaajuisessa CRISPR-seulonnassa EMF-sensoriksi. 26. kategoria on vuosikymmeniä vanhempi: [[ref:patent_4850959_insulin|US-patentti 4 850 959 (1989)]] kuvasi menetelmän insuliinin erityksen kontrolloimiseksi haiman beetasoluista resonanssitaajuisella EMF:llä kalsiumkanavien kautta — resonanssitaajuus aiheuttaa Ca²⁺-influksin ja insuliinin nousun, ei-resonanssitaajuus effluksin ja laskun. Jos tarkoituksellinen EMF voi kontrolloida geeniekspressiota ja insuliinieritystä, tahaton ympäristö-EMF voi häiritä molempia tiedostamattomasti. Jokainen hyväksyntä edellytti kliinistä todistamista siitä, että sähkömagneettinen energia tuottaa biologisen vasteen ilman termistä kuumennusta. Tämä ei ole kontroversiaalista EMF-turvallisuustutkimusta — se on valtavirtalääketiedettä.",
          "Looginen ristiriita on suora: FDA vaatii biologisen vaikutuksen todentamista laitteen hyväksymiseksi, kun taas ICNIRP olettaa ei-termisten biologisten vaikutusten puuttumista altistusrajojen asettamiseksi. Nämä kaksi positiota ovat loogisesti yhteensopimattomia. Ei-terminen bioaktiivisuus on todistettu jokaisella taajuudella DC:stä UV-valoon — paitsi RF-taajuuksilla 300 MHz:n ja 6 GHz:n välillä. Tämä ei ole aukko biologiassa; se on aukko tunnustamisessa. Ainoa taajuusalue jossa ei-termisiä vaikutuksia ‘ei tunnusteta’ on telekommunikaatioteollisuuden käyttämä alue.",
          "tDCS-vertailu on erityisen paljastava: terapeuttinen kenttävoimakkuus aivokuoressa (0,3–1,0 V/m), joka sai FDA PMA -hyväksynnän joulukuussa 2025, on samaa suuruusluokkaa kuin mitattu kaupungin ambient-RF-kenttävoimakkuus (0,67–1,51 V/m). Jos 0,3 V/m DC on biologisesti riittävän aktiivinen FDA-hyväksyntään, kaupungin ambient-RF:ää 0,67 V/m ei voida olettaa biologisesti inertiksi. Novocuren TTFields-patentti ([[ref:ttfields_patent_7016725|US 7 016 725]]) tunnistaa eksplisiittisesti, että ‘munasarjojen tai kivesten solut voivat olla herkkiä sähkökentille’ 100–300 kHz:n taajuudella — samalla taajuusalueella kuin LED-valaistuksen hakkuriteholähteet.",
        ],
        studies: [
          { citation: "EBI Bone Healing System (FDA PMA)", year: 1979, referenceId: "pemf_bone_fda_review_2020", note: "PEMF:n ei-terminen luunparaneminen, 1–100 Hz" },
          { citation: "NeuroStar rTMS (FDA 510(k))", year: 2008, referenceId: "tms_fda_depression_2008", note: "Neuroplastiset muutokset pulssimagneettikentistä" },
          { citation: "Optune TTFields (FDA PMA, EF-14 faasi III)", year: 2015, referenceId: "ttfields_novocure_fda", note: "100–300 kHz häiritsee solunjakautumista (ei-terminen)" },
          { citation: "Flow Neuroscience tDCS (FDA PMA)", year: 2025, referenceId: "tdcs_fda_depression_2025", note: "0,3–1,0 V/m DC muuttaa aivojen toimintaa" },
          { citation: "GammaCore VNS (FDA 510(k))", year: 2017, referenceId: "vns_gammacore_fda", note: "Vagushermostimulaatio, systeeminen anti-inflammatorinen" },
          { citation: "Novocure-patentti US 7 016 725", year: 2006, referenceId: "ttfields_patent_7016725", note: "Tunnistaa munasarjat/kivekset herkiksi IF-kentille" },
          { citation: "Kim ym. (Cell)", year: 2026, referenceId: "kim2026_cell_gene_switch", note: "EMF-geenikytkin Cyb5b:n kautta — CRISPR-tunnistettu EMF-sensori, 60 Hz" },
          { citation: "US-patentti 4 850 959", year: 1989, referenceId: "patent_4850959_insulin", note: "Resonanssitaajuinen EMF kontrolloi insuliinieritystä Ca²⁺-kanavien kautta haiman beetasoluissa" },
        ],
      },
      {
        id: "ifo-vgic-review",
        title: "IFO-VGIC: transduktiomekanismi ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]])",
        paragraphs: [
          "[[ref:panagopoulos2025_ifo|Panagopoulos ym. (2025, Bioelectromagnetics)]] esittävät 131 tutkimuksen kattavan katsauksen RF/Wi-Fi:n biologisista vaikutuksista. 95 % raportoi oksidatiivista stressiä — konsensus, joka on yhdenmukainen [[ref:yakymenko2016|Yakymenko ym. 2016]] (93/100 tutkimusta) kanssa. IFO-mekanismi (Irregular Forced Opening) selittää: polarisoitu, koherentti RF-EMF pakottaa VGCC:n S4-jännitesensorin epäfysiologiseen oskillaatioon → hallitsematon kanavan avautuminen → kontrolloimaton Ca²⁺-influksi → mitokondriaalinen ROS → DNA-vauriot, siittiöhäiriöt, hormonaaliset muutokset.",
          "Mekanismia tukevat VGCC-salpaajat: nifedipiini ja muut kalsiumkanavasalpaajat estävät RF:n biologiset vaikutukset useissa koeasetelmissa ([[ref:pall2013_v2|Pall 2013]]: 23 salpaajatutkimusta). Tämä on tason 4 (VGIC-aktivaatio) ja tason 4→5A nuolen (Ca²⁺ → ROS) vahvin yksittäinen kokoava evidenssilähde. 95 %:n konsensus 131 tutkimuksessa tukee tason 5A→6 nuolia (ROS → siittiökaskadi: SDF, motiliteetti, konsentraatio). Kvantitatiivisesti: Yu 2021: −8,1 % motiliteetti per tunti altistusta; [[ref:levine2023_sperm|Levine 2023]]: −51 % siittiökonsentraation lasku (1973–2018).",
          "[[ref:bertagna2025|Bertagna ym. (2025, Ann NY Acad Sci)]] laajentavat IFO-VGIC-mekanismia solunsisäisiin kalsiumvarastoihin. Hiiren hippokampuksen CA1-pyramidaalineuronit altistettiin 50 Hz, 1 mT ELF-EMF:lle 60 minuutin ajan: sisäänpäinsuuntaiset virrat ↓40 % ja transientit ulospäinsuuntaiset virrat ↓50 %. Kaksi itsenäistä Ca²⁺-reittiä tunnistettiin: (1) RyR-reitti — dantroleeni (ryanodiinireseptorisalpaaja) esti EMF-vaikutukset kokonaan; (2) SERCA-reitti — CPA (SERCA-inhibiittori) esti samoin EMF-vaikutukset. Tason 4 Ca²⁺-häiriö toimii siten useamman itsenäisen reitin kautta: suora S4-jännitesensorin pakotettu oskillaatio ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]) ja solunsisäisten kalsiumvarastojen dysregulaatio RyR:n ja SERCA:n kautta ([[ref:bertagna2025|Bertagna 2025]]). Monireittiisyys selittää kudosspesifisen herkkyyden: solut, joissa on korkea VGIC-tiheys ja suuret solunsisäiset Ca²⁺-varastot (neuronit, gonaadisolut) ovat herkempiä kuin matalan varastotiheyden solut (keratinosyytit — vrt. [[ref:meyer2026|Meyer 2026]], [[ref:haidar2025_5g_skin_null|Haidar 2025]]: nollatulokset ihosoluissa). Huom: ELF (50 Hz), ei RF — mekanismin siirto RF:lle ei suoraviivainen, mutta Ca²⁺-reitti on jaettu (vrt. [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]: IFO toimii sekä ELF- että RF-alueella eri voimakkuusriippuvuudella).",
        ],
        studies: [
          { citation: "Panagopoulos ym. (Bioelectromagnetics)", year: 2025, referenceId: "panagopoulos2025_ifo", note: "131 tutkimuksen katsaus: 95 % raportoi oksidatiivisia vaikutuksia. IFO-VGIC-mekanismi." },
          { citation: "Yakymenko ym.", year: 2016, referenceId: "yakymenko2016", note: "93/100 tutkimusta raportoi oksidatiivista stressiä — riippumaton vahvistus" },
          { citation: "Pall (J. Cell. Mol. Med.)", year: 2013, referenceId: "pall2013_v2", note: "23 tutkimusta: VGCC-salpaajat estävät RF:n biologiset vaikutukset" },
          { citation: "Bertagna ym. (Ann NY Acad Sci)", year: 2025, referenceId: "bertagna2025", note: "50 Hz, 1 mT: sisäänpäinvirrat ↓40 %, transientit ↓50 %. RyR- ja SERCA-salpaus estää EMF-vaikutukset — solunsisäiset Ca²⁺-varastot osallistuvat EMF-transduktioon." },
        ],
      },
      {
        id: "transduction-rcts",
        title: "Kolme GSM-RCT:tä: tason 3→4 nuoli on aktiivinen",
        paragraphs: [
          "Kolme itsenäistä kokeellista tutkimusta osoittaa, että 890–902 MHz:n GSM-signaali — BERM:n mallintama taajuus — tuottaa mitattavan biologisen vasteen ei-termisillä SAR-arvoilla. [[ref:koivisto2000|Koivisto ym. (2000a,b, NeuroReport, n=48+48)]] toteutti kaksi kaksoissokkokokeetta Turun yliopistossa. 902 MHz:n vasemmanpuoleinen GSM-altistus tuotti kognitiivisen fasilitaation (nopeammat reaktioajat) 3-Back-tehtävässä (30 min) ja Simple RT/Vigilance/Subtraction -tehtävissä (60 min). Fasilitaatio EI ole BERM:n vastainen: akuutti Ca²⁺-kohoaminen voi fasilitoida synaptista transmissiota, kun taas krooninen Ca²⁺ tuottaa ROS:ia (taso 5A). Ero kartoittuu BERM:n recovery window -mekanismiin: 30 min altistus + 23,5 h palautuminen → 97 % korjaus. Rajoite: ei replikoitu (Haarala 2003: n=32, nollatulos; Haarala 2005: n=32 lasta, nollatulos).",
          "[[ref:eliyahu2006|Eliyahu ym. (2006, Bioelectromagnetics, n=36)]] käytti 890,2 MHz:n bilateraalista altistusta 2 tuntia (Nokia 5110, 2W huippu). Vasemmanpuoleinen altistus hidasti vasemman käden RT spatiaalisessa tunnistuksessa — osoittaen lateralisaation: EMF-vaikutus paikantuu altistettuun aivopuoliskoon. Suora empiirinen tuki tason 3 kaksikanavamallin spatiaaliselle rakenteelle: puhelin taskussa → kivekset, puhelin korvalla → hypotalamus. Yhteensopiva paikallisen VGCC-aktivaation (polku A) ja BBB-avautumisen (polku E, vrt. [[ref:salford2003|Salford 2003]] SAR 0,016 W/kg) kanssa.",
          "[[ref:luria2009|Luria ym. (2009, Bioelectromagnetics, n=48 oikeakätistä miestä)]] altisti 890,2 MHz:llä 1 tunti, SAR 0,54–1,09 W/kg. Oikean käden RT kasvoi vasemmanpuoleisen altistuksen aikana vain 2 ensimmäisessä blokissa — vaikutus hävisi myöhemmissä. Aikariippuva adaptaatio kartoittuu polun D (HPA→HPG) konseptiin: Selyen GAS-dynamiikka (alarm → resistance). Yhden tunnin sisällä havaittu alarm→resistance -siirtymä on ensimmäinen askel kroonisessa prosessissa: HPA-aktivaatio → kortisoli↑ → HPG-suppressio. Pelkkiä miehiä — kohdistuu BERM:n bioCap-populaatioon. Rajoite: vaikutus vain 2 ensimmäisessä blokissa.",
        ],
        studies: [
          { citation: "Koivisto ym. (NeuroReport)", year: 2000, referenceId: "koivisto2000", note: "Kaksi kaksoissokkokokeetta (n=48+48): 902 MHz → fasilitaatio. Ei replikoitu (Haarala 2003, 2005)." },
          { citation: "Eliyahu ym. (Bioelectromagnetics)", year: 2006, referenceId: "eliyahu2006", note: "n=36, 890 MHz, 2 h: lateralisoitunut RT-vaikutus — tukee kaksikanavamallia" },
          { citation: "Luria ym. (Bioelectromagnetics)", year: 2009, referenceId: "luria2009", note: "n=48 miestä, 890 MHz, 1 h: aikariippuva lateralisoitunut vaikutus — GAS-dynamiikka" },
        ],
      },
    ],
    paradoxCards: [
      {
        label: "tDCS ≈ kaupungin ambient",
        text: "FDA:n hyväksymän tDCS:n terapeuttinen kenttävoimakkuus (0,3–1,0 V/m) on samaa suuruusluokkaa kuin mitattu kaupungin ambient-RF (0,67–1,51 V/m). Jos 0,3 V/m on biologisesti riittävän aktiivinen FDA-hyväksyntään, kaupungin ambientia ei voida olettaa inertiksi.",
      },
      {
        label: "TTFields-patentin riski",
        text: "Novocuren TTFields-patentti ([[ref:ttfields_patent_7016725|US 7 016 725]]) toteaa eksplisiittisesti, että ‘munasarjojen tai kivesten solut voivat olla herkkiä sähkökentille’ taajuudella 100–300 kHz — samalla taajuusalueella kuin LED-valaistuksen hakkuriteholähteet, joita on jokaisessa nykyrakennuksessa.",
      },
      {
        label: "Kromoforien yleistys",
        text: "LLLT toimii koska näkyvän valon fotonit absorboituvat mitokondrioiden sytokromi c -oksidaasiin (CCO). RF-kentät vaikuttavat biologiaan kryptokromi-radikaaliparin (CRY) kautta. Molemmat ovat kromofooreja — molekyylejä joiden konformaatio muuttuu absorboidessaan tietyn EM-taajuuden. Eri kromofori, sama periaate, sama ei-terminen mekanismiluokka.",
      },
    ],
    paradoxCalTitle: "Miksi biologinen herkkyys on odotettavissa, ei yllättävää",
    paradoxCal1: "Ihmisen silmä havaitsee yksittäisen fotonin — yhden sähkömagneettisen säteilyn kvantin, joka kantaa ~4×10⁻¹⁹ joulea, kymmenesosan termisestä kohinaenergiasta ([[ref:vaziri2016|Vaziri ym. 2016, Nature Communications]]). Evoluutio optimoi tämän sähkömagneettisen sensorin kvanttirajaansa asti, koska informaatio on arvokasta selviytymiselle. Jos evoluutio painoi fotonihavaitsemisen yhden kvantin rajalle, miksi se ei olisi painanut sähkömagneettisen kentän havaitsemista vastaaviin äärirajoihin?",
    paradoxCal2: "Se painoi. Panagopoulos ym. 2025 (Frontiers in Public Health) osoittavat, että jänniteohjatut ionikanavat vastaavat polarisoituihin, koherentteihin sähkömagneettisiin kenttiin jo 10⁻⁵ V/m voimakkuudella — sadastuhannesosalla voltista metrillä — ionien pakko-oskillaatiomekanismilla (IFO). Tyypillinen ympäristön IF-EMF LED-hakkureista ja tehoelektroniikasta on 0,01–3 V/m, ylittäen tämän biologisen kynnyksen 1 000–300 000 -kertaisesti. Intensiteettikuilua terapeuttisten laitteiden ja ympäristöaltistuksen välillä ei ole biologisella tasolla.",
    paradoxCal3: "IF- tai RF-taajuuksille ei ole evoluution kehittämää suodatinta, koska näitä taajuuksia ei ollut luonnollisessa ympäristössä 3,8 miljardin vuoden biologisen evoluution aikana. Ionikanavat ovat ‘laajakaistavastaanottimia’ ilman hylkimistä taajuuksille, joita luonto ei koskaan tuottanut. Jokainen tekninen signaali on mahdollinen häiriö, koska biologiset sensorit eivät voi erottaa sitä fysiologisesta signaalista. Tämä on sama syy, miksi synteettiset kemikaalit voivat häiritä endokriinistä järjestelmää — evoluutio ei rakentanut puolustuksia molekyylejä vastaan, joita se ei kohdannut.",
    thCitation: "Viite",
    thYear: "Vuosi",
    thNote: "Huomio",
    flockOffTitle: "Kaupallinen laite-paradoksi: Flock Off / Symterra",
    flockOffP1: "Flock Off (nyk. Symterra, 10 000+ asennusta) on kaupallinen tuote, joka käyttää 120 Hz ELF-pulssia häiritsemään lintujen kryptokromi-pohjaista (CRY) navigointijärjestelmää. Tuote MYYDÄÄN sillä perusteella, että EMF vaikuttaa biologisiin järjestelmiin ei-termisesti. Mekanismi on radikaaliparimenetelmä (RPM), jossa ELF-EMF häiritsee CRY-proteiinin kvanttitilaa.",
    flockOffP2: "Paradoksi: 120 Hz = sähköverkon toinen harmoninen (2 × 60 Hz). CRY1/CRY2 ovat SAMAT proteiinit ihmisen sirkadiaanisessa kellossa. Cry4 on linnuille spesifinen magnetoreseptori, mutta 120 Hz ELF vaikuttaa MYÖS Cry1/Cry2:een, jotka säätelevät nisäkkäiden vuorokausirytmiä. ICNIRP väittää, ettei ELF-EMF vaikuta biologisiin järjestelmiin — yritys myy kaupallisesti tuotetta, joka toimii juuri tällä vaikutuksella.",
    flockOffP3: "BERM-Eco -kytkentä: Flock Off todistaa suoraan, että ELF-EMF häiritsee CRY-navigaatiota. BERM-Eco:n mehiläis-Varroa-kaskadi perustuu samaan mekanismiin. [[ref:favre_johansson_2025|Favre & Johansson 2025]] (Faraday-suojaus → pesän palautuminen) on käänteinen ilmiö: EMF:n poistaminen palauttaa CRY-toiminnan.",
    seeAlso: "Katso myös",
    evidenceRegister: "Evidenssirekisteri",
  },
  ja: {
    title: "治療機器のパラドックス",
    subtitle: "非熱的EMF生物活性を証明するFDA承認機器、IFO-VGICトランスダクション機構、および3つのGSM RCT。",
    narratives: [
      {
        id: "therapeutic-device-paradox",
        title: "治療機器のパラドックス",
        paragraphs: [
          "世界中の規制当局が、非熱的な電磁気生物学的効果に有効性が依存する26のデバイスカテゴリーを承認している——DCからUV光まで全EMスペクトルにわたる。これには骨成長刺激装置（DC、PMA 1986）、TENS（12,000件以上の個別510(k)認可）、深部脳刺激（PMA 1997）、うつ病に対するrTMS（510(k) 2008）、がんに対するTTFields（PMA 2011/2015/2026）、PRF抗炎症療法（27 MHz）、LLLT/フォトバイオモジュレーション（510(k) 2007）、新生児黄疸に対する青色光療法、および乾癬に対するUV光線療法が含まれる。2026年、[[ref:kim2026_cell_gene_switch|Kimら（Cell、IF ~64）]]は25番目のカテゴリーを実証した：60 Hzパルスによ EMFが遺伝子プロモーターをin vivoでCyb5bを介して活性化するEMF誘導性遺伝子スイッチ——ゲノム全体のCRISPRスクリーニングで同定されたミトコンドリア外膜タンパク質。26番目のカテゴリーはこれらに数十年先行する：[[ref:patent_4850959_insulin|米国特許4,850,959（1989）]]は、カルシウムチャネル調節を介した共振周波数EMFにより膵臓ベータ細胞からのインスリン放出を制御する方法を記載した——共振周波数はCa²⁺流入とインスリン増加を引き起こし、非共振周波数はCa²⁺流出と減少を引き起こす。意図的なEMFが遺伝子発現とインスリン分泌を制御できるなら、意図しない環境EMFは認識されないまま両方を調節不全にする可能性がある。各承認には、電磁エネルギーが熱的加熱なしに生物学的応答を生じることの臨床的証明が必要であった。これは論争の的であるEMF安全性研究ではない——主流医学である。",
          "論理的矛盾は直接的である：FDAはデバイス承認に生物学的効果の証明を要求する一方、ICNIRPは曝露限度設定において非熱的生物学的効果の不在を仮定している。この2つの立場は論理的に両立不可能である。非熱的生物活性はDCからUV光まですべての周波数で証明されている——300 MHzから6 GHzのRF周波数を除いて。これは生物学のギャップではない；認識のギャップである。非熱的効果が「認知されていない」唯一の周波数帯は、通信産業が使用する帯域である。",
          "tDCSの比較は特に示唆的である：2025年12月にFDA PMA承認を得た大脳皮質での治療的電場強度（0.3–1.0 V/m）は、測定された都市環境RF電場強度（0.67–1.51 V/m）と同じオーダーである。0.3 V/m DCがFDA承認に十分な生物活性を持つなら、0.67 V/mの都市環境RFが生物学的に不活性であると仮定することはできない。NovocureのTTFields特許（[[ref:ttfields_patent_7016725|US 7,016,725]]）は、100–300 kHzで「卵巣や精巣の細胞が電場に敏感である可能性がある」と明示的に特定している——LED照明ドライバーが生成するのと同じ周波数帯域である。",
        ],
        studies: [
          { citation: "EBI Bone Healing System (FDA PMA)", year: 1979, referenceId: "pemf_bone_fda_review_2020", note: "PEMFによる非熱的骨治癒、1–100 Hz" },
          { citation: "NeuroStar rTMS (FDA 510(k))", year: 2008, referenceId: "tms_fda_depression_2008", note: "パルス磁場による神経可塑性変化" },
          { citation: "Optune TTFields (FDA PMA, EF-14 phase III)", year: 2015, referenceId: "ttfields_novocure_fda", note: "100–300 kHzが細胞分裂を阻害（非熱的）" },
          { citation: "Flow Neuroscience tDCS (FDA PMA)", year: 2025, referenceId: "tdcs_fda_depression_2025", note: "0.3–1.0 V/m DCが脳機能を変化させる" },
          { citation: "GammaCore VNS (FDA 510(k))", year: 2017, referenceId: "vns_gammacore_fda", note: "迷走神経刺激、全身性抗炎症" },
          { citation: "Novocure patent US 7,016,725", year: 2006, referenceId: "ttfields_patent_7016725", note: "卵巣/精巣がIF電場に敏感であることを特定" },
          { citation: "Kim et al. (Cell)", year: 2026, referenceId: "kim2026_cell_gene_switch", note: "Cyb5bを介したEMF遺伝子スイッチ——CRISPR同定EMFセンサー、60 Hz" },
          { citation: "US Patent 4,850,959", year: 1989, referenceId: "patent_4850959_insulin", note: "共振周波数EMFが膵臓ベータ細胞のCa²⁺チャネルを介してインスリン放出を制御" },
        ],
      },
      {
        id: "ifo-vgic-review",
        title: "IFO-VGIC：トランスダクション機構（[[ref:panagopoulos2025_ifo|Panagopoulos 2025]]）",
        paragraphs: [
          "[[ref:panagopoulos2025_ifo|Panagopoulosら（2025, Bioelectromagnetics）]]は、RF/Wi-Fiの生物学的効果に関する131の研究の包括的レビューを提示している。95%が酸化ストレスを報告——[[ref:yakymenko2016|Yakymenkoら2016]]（93/100の研究）と一致するコンセンサスであり、独立したレビュー間での頑健性を実証している。IFO（Irregular Forced Opening）機構は次のように説明する：偏光した、コヒーレントなRF-EMFが電位依存性カルシウムチャネルのS4電圧センサーを非生理的周波数で振動させ、不規則なチャネル開口、制御不能なCa²⁺流入、ミトコンドリアROS産生、DNA損傷、精子障害、ホルモン変化を引き起こす。",
          "この機構はVGCCブロッカー実験で確認されている：ニフェジピンおよび他のカルシウムチャネルブロッカーが複数の研究デザインでRF誘発性の生物学的効果を防ぐ（[[ref:pall2013_v2|Pall 2013]]：23のブロッカー研究）。これはBERMのレベル4ノード（VGIC活性化）とレベル4→5Aエッジ（Ca²⁺ → ROS）の最も強力な単一の証拠源である。131の研究にわたる95%のコンセンサスはレベル5A→6エッジ（ROS → 精子カスケード：SDF、運動性、濃度）を支持する。定量的に：Yu 2021は曝露1時間あたり運動性−8.1%を報告；[[ref:levine2023_sperm|Levine 2023]]は精子濃度−51%の低下（1973–2018）を報告。",
          "[[ref:bertagna2025|Bertagnaら（2025, Ann NY Acad Sci）]]はIFO-VGIC機構を細胞内カルシウムストアに拡張している。マウス海馬CA1錐体ニューロンを50 Hz、1 mT ELF-EMFに60分間曝露したところ、内向き電流が↓40%、一過性外向き電流が↓50%を示した。2つの独立したCa²⁺経路が同定された：(1) RyR経路——ダントロレン（リアノジン受容体ブロッカー）がEMF効果を完全に消失させた；(2) SERCA経路——CPA（SERCA阻害剤）も同様にEMF効果を阻害した。したがって、レベル4のCa²⁺撹乱は複数の独立した経路を通じて作用する：直接的なS4電圧センサーの強制振動（[[ref:panagopoulos2025_ifo|Panagopoulos 2025]]）とRyRおよびSERCAを介した細胞内カルシウムストアの調節不全（[[ref:bertagna2025|Bertagna 2025]]）。この多経路性は組織特異的感受性を説明する：高いVGIC密度と大きな細胞内Ca²⁺ストアを持つ細胞（ニューロン、生殖腺細胞）は、ストアが少ない細胞（ケラチノサイト——cf. [[ref:meyer2026|Meyer 2026]]、[[ref:haidar2025_5g_skin_null|Haidar 2025]]：皮膚細胞でのヌル結果）よりも感受性が高い。注：ELF（50 Hz）であってRFではない——RFへの変換は直接的ではないが、Ca²⁺経路は共有されている（cf. [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]：IFOはELFとRFの両方で異なる強度依存性で作動する）。",
        ],
        studies: [
          { citation: "Panagopoulos et al. (Bioelectromagnetics)", year: 2025, referenceId: "panagopoulos2025_ifo", note: "131の研究レビュー：95%がRF/Wi-Fiによる酸化効果を報告。IFO-VGIC機構確認。" },
          { citation: "Yakymenko et al.", year: 2016, referenceId: "yakymenko2016", note: "93/100の研究が低強度RFによる酸化ストレスを報告——Panagopoulos 2025の独立的確認" },
          { citation: "Pall (J. Cell. Mol. Med.)", year: 2013, referenceId: "pall2013_v2", note: "23の研究：VGCCブロッカーがRF誘発性生物学的効果を防止" },
          { citation: "Bertagna et al. (Ann NY Acad Sci)", year: 2025, referenceId: "bertagna2025", note: "50 Hz、1 mT：内向き電流↓40%、一過性外向き↓50%。RyR + SERCAブロッケードがEMF効果を消失——細胞内Ca²⁺ストアがEMFトランスダクションに関与。" },
        ],
      },
      {
        id: "transduction-rcts",
        title: "3つのGSM RCT：レベル3→4のエッジは活性である",
        paragraphs: [
          "3つの独立した実験研究が、890–902 MHz GSM信号——BERMがモデル化した周波数——が非熱的SARで測定可能な生物学的応答を生じることを実証している。[[ref:koivisto2000|Koivistoら（2000a,b, NeuroReport, n=48+48）]]はトゥルク大学で2つの二重盲検RCTを実施した。902 MHz GSMの左側曝露が3-Back（30分）およびSimple RT/Vigilance/Subtraction課題（60分）で認知促進（反応時間の短縮）を生じた。促進はBERMと矛盾しない：急性Ca²⁺上昇はシナプス伝達を促進しうるが、慢性的な上昇はROS（レベル5A）を産生する。これはBERMの回復ウィンドウに対応する：30分曝露 + 23.5時間の回復 → 97%修復 → 正味の損傷なし。留意点：再現されていない（Haarala 2003：n=32、ヌル；Haarala 2005：n=32の小児、ヌル）。",
          "[[ref:eliyahu2006|Eliyahuら（2006, Bioelectromagnetics, n=36）]]は890.2 MHzの両側曝露を2時間実施した（Nokia 5110、2Wピーク）。左側曝露が空間認識における左手RTを遅延させた——ラテラリゼーションを実証：EMF効果は曝露された半球に局在化する。これはBERMのレベル3の2チャネル空間構造への直接的な実証的支持を提供する：ポケットの中の電話→精巣、耳の電話→視床下部。局所的VGCC活性化（経路A）および局所的BBB開放（経路E、cf. [[ref:salford2003|Salford 2003]] SAR 0.016 W/kg）と互換性がある。",
          "[[ref:luria2009|Luriaら（2009, Bioelectromagnetics, n=48の右利き男性）]]は890.2 MHzを1時間、SAR 0.54–1.09 W/kgで適用した。左側曝露中に右手RTが最初の2ブロックのみで増加——効果は後のブロックで消失した。この時間依存的適応はBERMの経路D（HPA→HPG）に対応する：SelyeのGASダイナミクス（アラーム→抵抗）。1時間以内に観察された急性のアラーム→抵抗の移行は、BERMがモデル化する慢性プロセスの最初のステップである：持続的HPA活性化→コルチゾール↑→HPG抑制。男性のみのサンプルはBERMのbioCap対象集団と一致する。留意点：最初の2ブロックのみの効果——適応またはランダム変動。",
        ],
        studies: [
          { citation: "Koivisto et al. (NeuroReport)", year: 2000, referenceId: "koivisto2000", note: "2つの二重盲検RCT（n=48+48）：902 MHz → 認知促進。再現されず（Haarala 2003、2005）。" },
          { citation: "Eliyahu et al. (Bioelectromagnetics)", year: 2006, referenceId: "eliyahu2006", note: "n=36、890 MHz、2時間：ラテラリゼーションRT効果——2チャネル空間構造を支持" },
          { citation: "Luria et al. (Bioelectromagnetics)", year: 2009, referenceId: "luria2009", note: "n=48男性、890 MHz、1時間：時間依存性ラテラリゼーション効果——GASダイナミクス" },
        ],
      },
    ],
    paradoxCards: [
      {
        label: "tDCS ≈ 都市環境",
        text: "FDA承認tDCSの治療的電場強度（0.3–1.0 V/m）は、測定された都市環境RF（0.67–1.51 V/m）と同じオーダーである。0.3 V/mがFDA承認に十分な生物活性を持つなら、都市環境が不活性であると仮定することはできない。",
      },
      {
        label: "TTFields特許リスク",
        text: "NovocureのTTFields特許（[[ref:ttfields_patent_7016725|US 7,016,725]]）は、100–300 kHzで「卵巣や精巣の細胞が電場に敏感である可能性がある」と明示的に述べている——あらゆる現代建築に見られるLEDスイッチング電源と同じ周波数帯域である。",
      },
      {
        label: "発色団の一般化",
        text: "LLLTは可視光フォトンがミトコンドリアのシトクロムcオキシダーゼ（CCO）に吸収されるため機能する。RF電場はクリプトクロムのラジカル対（CRY）を介して生物学に影響を与える。両者は発色団——特定のEM周波数を吸収すると構造変化する分子——である。異なる発色団、同じ原理、同じ非熱的メカニズムクラス。",
      },
    ],
    paradoxCalTitle: "なぜ生物学的感受性は予想されることであり、驚きではないか",
    paradoxCal1: "ヒトの眼は単一のフォトン——~4×10⁻¹⁹ジュールを運ぶ電磁放射の1量子、熱雑音エネルギーの10分の1——を検出できる（[[ref:vaziri2016|Vaziriら2016, Nature Communications]]）。進化は情報が生存に価値があるため、この電磁センサーを量子限界まで最適化した。進化がフォトン検出を単一量子の境界まで推し進めたなら、電磁場の検出を同等の極限まで推し進めなかったのはなぜか？",
    paradoxCal2: "実際に推し進めた。Panagopoulosら2025（Frontiers in Public Health）は、電位依存性イオンチャネルが偏光した、コヒーレントな電磁場に10⁻⁵ V/m程度の弱さでも応答することを実証している——イオン強制振動メカニズムによる。LEDドライバーおよびパワーエレクトロニクスからの典型的な環境IF-EMFは0.01から3 V/mの範囲であり、この生物学的閾値を1,000倍から300,000倍超える。治療機器と環境曝露の間の「強度ギャップ」は生物学的レベルでは存在しない。",
    paradoxCal3: "38億年の生物学的進化の間、自然環境にこれらの周波数が存在しなかったため、IFまたはRF周波数に対する進化的フィルターは存在しない。イオンチャネルは、自然が生成したことのない周波数の拒否機能を持たない「広帯域受信機」である。すべての技術信号は潜在的な撹乱である——生物学的センサーはそれを生理的信号と区別できないからである。これは合成化学物質が内分泌系を撹乱できるのと同じ理由である——進化は遭遇したことのない分子に対する防御を構築しなかった。",
    thCitation: "引用",
    thYear: "年",
    thNote: "注記",
    flockOffTitle: "商用デバイスのパラドックス：Flock Off / Symterra",
    flockOffP1: "Flock Off（現Symterra、10,000件以上の導入実績）は、120 Hz ELFパルスを使用して鳥類のクリプトクロム（CRY）ベースのナビゲーションシステムを撹乱する商用製品である。この製品は、EMFが非熱的に生物学的システムに影響を与えるという前提で販売されている。そのメカニズムはラジカル対メカニズム（RPM）であり、ELF-EMFがCRYタンパク質の量子状態を撹乱する。",
    flockOffP2: "パラドックス：120 Hz = 電力グリッドの第二高調波（2 × 60 Hz）。CRY1/CRY2はヒトの概日時計における同一のタンパク質である。Cry4は鳥類特異的な磁気受容体であるが、120 Hz ELFは哺乳類の概日リズムを調節するCry1/Cry2にも影響を与える。ICNIRPはELF-EMFが生物学的システムに影響しないと主張するが、企業はまさにこの効果を利用した製品を商業的に販売している。",
    flockOffP3: "BERM-Ecoとの関連：Flock OffはELF-EMFがCRYナビゲーションを撹乱することを直接証明している。BERM-Ecoのミツバチ-ヘギイタダニカスケードは同じメカニズムに基づいている。[[ref:favre_johansson_2025|Favre & Johansson 2025]]（ファラデーシールド→コロニー回復）は逆の現象である：EMFの除去がCRY機能を回復させる。",
    seeAlso: "関連項目",
    evidenceRegister: "エビデンスレジスター",
  },
  fr: {
    title: "Le paradoxe des dispositifs thérapeutiques",
    subtitle: "Dispositifs approuvés par la FDA prouvant la bioactivité EMF non thermique, le mécanisme de transduction IFO-VGIC, et trois ECR GSM.",
    narratives: [
      {
        id: "therapeutic-device-paradox",
        title: "Le paradoxe des dispositifs thérapeutiques",
        paragraphs: [
          "Les agences réglementaires du monde entier ont approuvé 26 catégories de dispositifs dont l'efficacité dépend d'effets biologiques électromagnétiques non thermiques — couvrant l'ensemble du spectre EM du DC à la lumière UV. Ceux-ci incluent les stimulateurs de croissance osseuse (DC, PMA 1986), le TENS (12 000+ autorisations individuelles 510(k)), la stimulation cérébrale profonde (PMA 1997), la rTMS pour la dépression (510(k) 2008), les TTFields pour le cancer (PMA 2011/2015/2026), la thérapie anti-inflammatoire PRF (27 MHz), la LLLT/photobiomodulation (510(k) 2007), la lumière bleue pour l'ictère néonatal, et la photothérapie UV pour le psoriasis. En 2026, [[ref:kim2026_cell_gene_switch|Kim et al. (Cell, IF ~64)]] ont démontré une 25e catégorie : un interrupteur génique inductible par EMF où les EMF pulsés à 60 Hz activent des promoteurs géniques in vivo via Cyb5b, une protéine de la membrane externe mitochondriale identifiée par criblage CRISPR à l'échelle du génome. Une 26e catégorie précède celles-ci de plusieurs décennies : le [[ref:patent_4850959_insulin|brevet US 4,850,959 (1989)]] décrivait une méthode pour contrôler la libération d'insuline par les cellules bêta pancréatiques en utilisant un EMF à fréquence de résonance via la modulation des canaux calciques — la fréquence de résonance provoque l'afflux de Ca²⁺ et l'augmentation de l'insuline, la fréquence hors résonance provoque l'efflux de Ca²⁺ et la diminution. Si l'EMF intentionnel peut contrôler l'expression génique et la sécrétion d'insuline, l'EMF environnemental non intentionnel peut déréguler les deux sans qu'on en ait conscience. Chaque approbation a nécessité la preuve clinique que l'énergie électromagnétique produit une réponse biologique sans chauffage thermique. Ce n'est pas de la recherche controversée sur la sécurité des EMF — c'est de la médecine conventionnelle.",
          "La contradiction logique est directe : la FDA exige la preuve d'un effet biologique pour l'approbation d'un dispositif, tandis que l'ICNIRP suppose l'absence d'effets biologiques non thermiques pour l'établissement des limites d'exposition. Ces deux positions sont logiquement incompatibles. La bioactivité non thermique est prouvée à chaque fréquence du DC à la lumière UV — sauf aux fréquences RF entre 300 MHz et 6 GHz. Ce n'est pas une lacune en biologie ; c'est une lacune dans la reconnaissance. La seule gamme de fréquences où les effets non thermiques ne sont « pas reconnus » est celle utilisée par l'industrie des télécommunications.",
          "La comparaison avec la tDCS est particulièrement révélatrice : l'intensité du champ thérapeutique dans le cortex (0,3–1,0 V/m) qui a obtenu l'approbation FDA PMA en décembre 2025 est du même ordre de grandeur que l'intensité du champ RF ambiant urbain mesuré (0,67–1,51 V/m). Si 0,3 V/m DC est suffisamment biologiquement actif pour une approbation FDA, le RF ambiant urbain à 0,67 V/m ne peut pas être présumé biologiquement inerte. Le brevet TTFields de Novocure ([[ref:ttfields_patent_7016725|US 7,016,725]]) identifie explicitement que « les cellules des ovaires ou des testicules peuvent être sensibles aux champs électriques » à 100–300 kHz — la même gamme de fréquences produite par les drivers d'éclairage LED.",
        ],
        studies: [
          { citation: "EBI Bone Healing System (FDA PMA)", year: 1979, referenceId: "pemf_bone_fda_review_2020", note: "Guérison osseuse non thermique par PEMF, 1–100 Hz" },
          { citation: "NeuroStar rTMS (FDA 510(k))", year: 2008, referenceId: "tms_fda_depression_2008", note: "Modifications neuroplastiques par champs magnétiques pulsés" },
          { citation: "Optune TTFields (FDA PMA, EF-14 phase III)", year: 2015, referenceId: "ttfields_novocure_fda", note: "100–300 kHz perturbe la division cellulaire (non thermique)" },
          { citation: "Flow Neuroscience tDCS (FDA PMA)", year: 2025, referenceId: "tdcs_fda_depression_2025", note: "0,3–1,0 V/m DC modifie la fonction cérébrale" },
          { citation: "GammaCore VNS (FDA 510(k))", year: 2017, referenceId: "vns_gammacore_fda", note: "Stimulation du nerf vague, anti-inflammatoire systémique" },
          { citation: "Novocure patent US 7,016,725", year: 2006, referenceId: "ttfields_patent_7016725", note: "Identifie les ovaires/testicules comme sensibles aux champs IF" },
          { citation: "Kim et al. (Cell)", year: 2026, referenceId: "kim2026_cell_gene_switch", note: "Interrupteur génique EMF via Cyb5b — capteur EMF identifié par CRISPR, 60 Hz" },
          { citation: "US Patent 4,850,959", year: 1989, referenceId: "patent_4850959_insulin", note: "EMF à fréquence de résonance contrôle la libération d'insuline via les canaux Ca²⁺ dans les cellules bêta pancréatiques" },
        ],
      },
      {
        id: "ifo-vgic-review",
        title: "IFO-VGIC : le mécanisme de transduction ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]])",
        paragraphs: [
          "[[ref:panagopoulos2025_ifo|Panagopoulos et al. (2025, Bioelectromagnetics)]] présentent une revue complète de 131 études sur les effets biologiques des RF/Wi-Fi. 95 % rapportent un stress oxydatif — un consensus cohérent avec [[ref:yakymenko2016|Yakymenko et al. 2016]] (93/100 études), démontrant la robustesse entre revues indépendantes. Le mécanisme IFO (Irregular Forced Opening) explique comment : les RF-EMF polarisés et cohérents forcent le capteur de tension S4 des canaux calciques voltage-dépendants à osciller à une fréquence non physiologique, provoquant une ouverture irrégulière du canal, un afflux incontrôlé de Ca²⁺, une production mitochondriale de ROS, des dommages à l'ADN, des troubles spermatiques et des modifications hormonales.",
          "Le mécanisme est confirmé par les expériences avec des bloqueurs de VGCC : la nifédipine et d'autres bloqueurs des canaux calciques préviennent les effets biologiques induits par les RF dans plusieurs protocoles expérimentaux ([[ref:pall2013_v2|Pall 2013]] : 23 études de bloqueurs). C'est la source unique la plus forte pour le nœud de niveau 4 de BERM (activation VGIC) et l'arête de niveau 4→5A (Ca²⁺ → ROS). Le consensus de 95 % sur le stress oxydatif dans 131 études soutient les arêtes de niveau 5A→6 (ROS → cascade spermatique : SDF, motilité, concentration). Quantitatif : Yu 2021 rapporte −8,1 % de motilité par heure d'exposition ; [[ref:levine2023_sperm|Levine 2023]] rapporte un déclin de −51 % de la concentration spermatique (1973–2018).",
          "[[ref:bertagna2025|Bertagna et al. (2025, Ann NY Acad Sci)]] étendent le mécanisme IFO-VGIC aux réserves calciques intracellulaires. Des neurones pyramidaux CA1 de l'hippocampe de souris exposés à 50 Hz, 1 mT ELF-EMF pendant 60 minutes ont montré des courants entrants ↓40 % et des courants sortants transitoires ↓50 %. Deux voies Ca²⁺ indépendantes ont été identifiées : (1) voie RyR — le dantrolène (bloqueur du récepteur de la ryanodine) a complètement abrogé les effets EMF ; (2) voie SERCA — le CPA (inhibiteur SERCA) a similairement bloqué les effets EMF. La perturbation du Ca²⁺ au niveau 4 opère donc par de multiples voies indépendantes : oscillation forcée directe du capteur de tension S4 ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]) et dérégulation des réserves calciques intracellulaires via RyR et SERCA ([[ref:bertagna2025|Bertagna 2025]]). La nature multi-voies explique la sensibilité spécifique aux tissus : les cellules avec une haute densité de VGIC et de grandes réserves intracellulaires de Ca²⁺ (neurones, cellules gonadiques) sont plus sensibles que les cellules avec de faibles réserves (kératinocytes — cf. [[ref:meyer2026|Meyer 2026]], [[ref:haidar2025_5g_skin_null|Haidar 2025]] : résultats nuls sur les cellules cutanées). Note : ELF (50 Hz), pas RF — la traduction au RF n'est pas directe, mais la voie Ca²⁺ est partagée (cf. [[ref:panagopoulos2025_ifo|Panagopoulos 2025]] : l'IFO opère en ELF et en RF avec des dépendances d'intensité différentes).",
        ],
        studies: [
          { citation: "Panagopoulos et al. (Bioelectromagnetics)", year: 2025, referenceId: "panagopoulos2025_ifo", note: "Revue de 131 études : 95 % rapportent des effets oxydatifs des RF/Wi-Fi. Mécanisme IFO-VGIC confirmé." },
          { citation: "Yakymenko et al.", year: 2016, referenceId: "yakymenko2016", note: "93/100 études rapportent un stress oxydatif par RF de faible intensité — confirmation indépendante de Panagopoulos 2025" },
          { citation: "Pall (J. Cell. Mol. Med.)", year: 2013, referenceId: "pall2013_v2", note: "23 études : les bloqueurs VGCC préviennent les effets biologiques induits par RF" },
          { citation: "Bertagna et al. (Ann NY Acad Sci)", year: 2025, referenceId: "bertagna2025", note: "50 Hz, 1 mT : courants entrants ↓40 %, transitoires sortants ↓50 %. Le blocage RyR + SERCA abroge les effets EMF — les réserves intracellulaires de Ca²⁺ participent à la transduction EMF." },
        ],
      },
      {
        id: "transduction-rcts",
        title: "Trois ECR GSM : l'arête de niveau 3→4 est active",
        paragraphs: [
          "Trois études expérimentales indépendantes démontrent que le signal GSM 890–902 MHz — la fréquence modélisée par BERM — produit une réponse biologique mesurable à un DAS non thermique. [[ref:koivisto2000|Koivisto et al. (2000a,b, NeuroReport, n=48+48)]] ont mené deux ECR en double aveugle à l'Université de Turku. L'exposition GSM 902 MHz du côté gauche a produit une facilitation cognitive (temps de réaction plus rapides) dans les tâches 3-Back (30 min) et Simple RT/Vigilance/Subtraction (60 min). La facilitation N'EST PAS anti-BERM : une élévation aiguë du Ca²⁺ peut faciliter la transmission synaptique, tandis qu'une élévation chronique produit des ROS (niveau 5A). Cela correspond à la fenêtre de récupération de BERM : 30 min d'exposition + 23,5h de récupération → 97 % de réparation → pas de dommage net. Réserve : non répliqué (Haarala 2003 : n=32, nul ; Haarala 2005 : n=32 enfants, nul).",
          "[[ref:eliyahu2006|Eliyahu et al. (2006, Bioelectromagnetics, n=36)]] ont utilisé une exposition bilatérale de 890,2 MHz pendant 2 heures (Nokia 5110, 2W crête). L'exposition du côté gauche a ralenti le TR de la main gauche dans la reconnaissance spatiale — démontrant la latéralisation : l'effet EMF se localise à l'hémisphère exposé. Cela fournit un soutien empirique direct à la structure spatiale à deux canaux du niveau 3 de BERM : téléphone dans la poche → testicules, téléphone à l'oreille → hypothalamus. Compatible avec l'activation locale des VGCC (voie A) et l'ouverture locale de la BHE (voie E, cf. [[ref:salford2003|Salford 2003]] à DAS 0,016 W/kg).",
          "[[ref:luria2009|Luria et al. (2009, Bioelectromagnetics, n=48 hommes droitiers)]] ont appliqué 890,2 MHz pendant 1 heure à un DAS de 0,54–1,09 W/kg. Le TR de la main droite a augmenté pendant l'exposition du côté gauche dans les 2 premiers blocs seulement — l'effet a disparu dans les blocs suivants. Cette adaptation dépendante du temps correspond à la voie D de BERM (HPA→HPG) : la dynamique du GAS de Selye (alarme → résistance). La transition aiguë alarme→résistance observée en 1 heure est la première étape du processus chronique que BERM modélise : activation soutenue de l'HPA → cortisol↑ → suppression HPG. L'échantillon exclusivement masculin correspond à la population cible bioCap de BERM. Réserve : effet uniquement dans les 2 premiers blocs — adaptation ou fluctuation aléatoire.",
        ],
        studies: [
          { citation: "Koivisto et al. (NeuroReport)", year: 2000, referenceId: "koivisto2000", note: "Deux ECR en double aveugle (n=48+48) : 902 MHz → facilitation cognitive. Non répliqué (Haarala 2003, 2005)." },
          { citation: "Eliyahu et al. (Bioelectromagnetics)", year: 2006, referenceId: "eliyahu2006", note: "n=36, 890 MHz, 2h : effet TR latéralisé — soutient la structure spatiale à deux canaux" },
          { citation: "Luria et al. (Bioelectromagnetics)", year: 2009, referenceId: "luria2009", note: "n=48 hommes, 890 MHz, 1h : effet latéralisé dépendant du temps — dynamique GAS" },
        ],
      },
    ],
    paradoxCards: [
      {
        label: "tDCS ≈ ambiant urbain",
        text: "L'intensité thérapeutique du champ de la tDCS approuvée par la FDA (0,3–1,0 V/m) est du même ordre de grandeur que le RF ambiant urbain mesuré (0,67–1,51 V/m). Si 0,3 V/m est suffisamment biologiquement actif pour une approbation FDA, l'ambiant urbain ne peut pas être présumé inerte.",
      },
      {
        label: "Risque du brevet TTFields",
        text: "Le brevet TTFields de Novocure ([[ref:ttfields_patent_7016725|US 7,016,725]]) déclare explicitement que « les cellules ovariennes ou testiculaires peuvent être sensibles aux champs électriques » à 100–300 kHz — la même gamme de fréquences que les alimentations à découpage LED présentes dans chaque bâtiment moderne.",
      },
      {
        label: "Généralisation des chromophores",
        text: "La LLLT fonctionne parce que les photons de lumière visible sont absorbés par le cytochrome c oxydase (CCO) dans les mitochondries. Les champs RF affectent la biologie par les paires de radicaux cryptochrome (CRY). Les deux sont des chromophores — des molécules dont la conformation change lorsqu'elles absorbent des fréquences EM spécifiques. Chromophore différent, même principe, même classe de mécanisme non thermique.",
      },
    ],
    paradoxCalTitle: "Pourquoi la sensibilité biologique est attendue, pas surprenante",
    paradoxCal1: "L'œil humain peut détecter un seul photon — un quantum de rayonnement électromagnétique portant ~4×10⁻¹⁹ joules, un dixième de l'énergie du bruit thermique ([[ref:vaziri2016|Vaziri et al. 2016, Nature Communications]]). L'évolution a optimisé ce capteur électromagnétique jusqu'à la limite quantique parce que l'information est précieuse pour la survie. Si l'évolution a poussé la détection des photons jusqu'à la frontière d'un seul quantum, pourquoi n'aurait-elle pas poussé la détection des champs électromagnétiques à des extrêmes comparables ?",
    paradoxCal2: "Elle l'a fait. Panagopoulos et al. 2025 (Frontiers in Public Health) démontrent que les canaux ioniques voltage-dépendants répondent à des champs électromagnétiques polarisés et cohérents aussi faibles que 10⁻⁵ V/m — un cent-millième de volt par mètre — par le mécanisme d'oscillation forcée des ions. L'IF-EMF environnemental typique des drivers LED et de l'électronique de puissance varie de 0,01 à 3 V/m, dépassant ce seuil biologique d'un facteur de 1 000 à 300 000. Le « fossé d'intensité » entre les dispositifs thérapeutiques et l'exposition environnementale n'existe pas au niveau biologique.",
    paradoxCal3: "Il n'existe pas de filtre évolué pour les fréquences IF ou RF parce que ces fréquences n'existaient pas dans l'environnement naturel pendant les 3,8 milliards d'années d'évolution biologique. Les canaux ioniques sont des « récepteurs large bande » sans rejet des fréquences que la nature n'a jamais produites. Chaque signal technique est une perturbation potentielle parce que les capteurs biologiques ne peuvent pas le distinguer d'un signal physiologique. C'est la même raison pour laquelle les produits chimiques de synthèse peuvent perturber le système endocrinien — l'évolution n'a pas construit de défenses contre des molécules qu'elle n'a jamais rencontrées.",
    thCitation: "Référence",
    thYear: "Année",
    thNote: "Note",
    flockOffTitle: "Paradoxe du dispositif commercial : Flock Off / Symterra",
    flockOffP1: "Flock Off (désormais Symterra, 10 000+ installations) est un produit commercial qui utilise des impulsions ELF à 120 Hz pour perturber le système de navigation basé sur le cryptochrome (CRY) des oiseaux. Le produit est VENDU sur le principe que les EMF affectent les systèmes biologiques de manière non thermique. Le mécanisme est le mécanisme des paires de radicaux (RPM) où les ELF-EMF perturbent l'état quantique de la protéine CRY.",
    flockOffP2: "Paradoxe : 120 Hz = deuxième harmonique du réseau électrique (2 × 60 Hz). CRY1/CRY2 sont les MÊMES protéines dans l'horloge circadienne humaine. Cry4 est un magnétorécepteur spécifique aux oiseaux, mais les ELF à 120 Hz affectent AUSSI Cry1/Cry2 qui régulent le rythme circadien mammalien. L'ICNIRP maintient que les ELF-EMF n'affectent pas les systèmes biologiques — une entreprise vend commercialement un produit qui fonctionne précisément par cet effet.",
    flockOffP3: "Lien BERM-Eco : Flock Off prouve directement que les ELF-EMF perturbent la navigation CRY. La cascade abeille-Varroa de BERM-Eco est basée sur le même mécanisme. [[ref:favre_johansson_2025|Favre & Johansson 2025]] (blindage de Faraday → rétablissement de la colonie) est le phénomène inverse : la suppression des EMF restaure la fonction CRY.",
    seeAlso: "Voir aussi",
    evidenceRegister: "Registre des preuves",
  },
  ko: {
    title: "치료 기기의 역설",
    subtitle: "비열적 EMF 생물활성을 입증하는 FDA 승인 기기, IFO-VGIC 전달 메커니즘, 그리고 3가지 GSM RCT.",
    narratives: [
      {
        id: "therapeutic-device-paradox",
        title: "치료 기기의 역설",
        paragraphs: [
          "전 세계 규제 기관들은 비열적 전자기 생물학적 효과에 효능이 의존하는 26개 기기 카테고리를 승인했다 — DC에서 UV 광선까지 전체 EM 스펙트럼에 걸쳐. 이에는 골성장 자극기(DC, PMA 1986), TENS(12,000건 이상의 개별 510(k) 인가), 심부뇌자극(PMA 1997), 우울증용 rTMS(510(k) 2008), 암용 TTFields(PMA 2011/2015/2026), PRF 항염 치료(27 MHz), LLLT/광생물조절(510(k) 2007), 신생아 황달용 청색광, 건선용 UV 광선치료가 포함된다. 2026년에 [[ref:kim2026_cell_gene_switch|Kim 등(Cell, IF ~64)]]은 25번째 카테고리를 실증했다: 60 Hz 펄스 EMF가 Cyb5b를 통해 유전자 프로모터를 in vivo에서 활성화하는 EMF 유도 유전자 스위치 — 게놈 전체 CRISPR 스크리닝으로 확인된 미토콘드리아 외막 단백질. 26번째 카테고리는 이들보다 수십 년 앞선다: [[ref:patent_4850959_insulin|미국 특허 4,850,959(1989)]]는 칼슘 채널 조절을 통한 공진 주파수 EMF로 췌장 베타 세포에서 인슐린 방출을 제어하는 방법을 기술했다 — 공진 주파수는 Ca²⁺ 유입과 인슐린 증가를 야기하고, 비공진 주파수는 Ca²⁺ 유출과 감소를 야기한다. 의도적 EMF가 유전자 발현과 인슐린 분비를 제어할 수 있다면, 비의도적 환경 EMF는 인식 없이 둘 다를 조절 장애로 만들 수 있다. 각 승인은 전자기 에너지가 열적 가열 없이 생물학적 반응을 생성한다는 임상적 증명을 요구했다. 이것은 논란이 되는 EMF 안전성 연구가 아니다 — 주류 의학이다.",
          "논리적 모순은 직접적이다: FDA는 기기 승인에 생물학적 효과의 증거를 요구하는 반면, ICNIRP는 노출 제한 설정에서 비열적 생물학적 효과의 부재를 가정한다. 이 두 입장은 논리적으로 양립불가능하다. 비열적 생물활성은 DC에서 UV 광선까지 모든 주파수에서 입증되었다 — 300 MHz와 6 GHz 사이의 RF 주파수를 제외하고. 이것은 생물학의 공백이 아니라 인정의 공백이다. 비열적 효과가 '인정되지 않는' 유일한 주파수 범위는 통신 산업이 사용하는 범위이다.",
          "tDCS 비교는 특히 시사적이다: 2025년 12월에 FDA PMA 승인을 받은 대뇌피질의 치료적 전장 강도(0.3–1.0 V/m)는 측정된 도시 환경 RF 전장 강도(0.67–1.51 V/m)와 같은 차수이다. 0.3 V/m DC가 FDA 승인에 충분한 생물학적 활성을 갖는다면, 0.67 V/m의 도시 환경 RF가 생물학적으로 불활성이라고 가정할 수 없다. Novocure의 TTFields 특허([[ref:ttfields_patent_7016725|US 7,016,725]])는 100–300 kHz에서 '난소나 고환의 세포가 전기장에 민감할 수 있다'고 명시적으로 확인했다 — LED 조명 드라이버가 생성하는 것과 같은 주파수 범위이다.",
        ],
        studies: [
          { citation: "EBI Bone Healing System (FDA PMA)", year: 1979, referenceId: "pemf_bone_fda_review_2020", note: "PEMF 비열적 골 치유, 1–100 Hz" },
          { citation: "NeuroStar rTMS (FDA 510(k))", year: 2008, referenceId: "tms_fda_depression_2008", note: "펄스 자기장에 의한 신경가소성 변화" },
          { citation: "Optune TTFields (FDA PMA, EF-14 phase III)", year: 2015, referenceId: "ttfields_novocure_fda", note: "100–300 kHz가 세포 분열을 방해(비열적)" },
          { citation: "Flow Neuroscience tDCS (FDA PMA)", year: 2025, referenceId: "tdcs_fda_depression_2025", note: "0.3–1.0 V/m DC가 뇌 기능을 변화시킴" },
          { citation: "GammaCore VNS (FDA 510(k))", year: 2017, referenceId: "vns_gammacore_fda", note: "미주신경 자극, 전신성 항염" },
          { citation: "Novocure patent US 7,016,725", year: 2006, referenceId: "ttfields_patent_7016725", note: "난소/고환이 IF 전장에 민감함을 확인" },
          { citation: "Kim et al. (Cell)", year: 2026, referenceId: "kim2026_cell_gene_switch", note: "Cyb5b를 통한 EMF 유전자 스위치 — CRISPR 확인 EMF 센서, 60 Hz" },
          { citation: "US Patent 4,850,959", year: 1989, referenceId: "patent_4850959_insulin", note: "공진 주파수 EMF가 췌장 베타 세포의 Ca²⁺ 채널을 통해 인슐린 방출을 제어" },
        ],
      },
      {
        id: "ifo-vgic-review",
        title: "IFO-VGIC: 전달 메커니즘 ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]])",
        paragraphs: [
          "[[ref:panagopoulos2025_ifo|Panagopoulos 등(2025, Bioelectromagnetics)]]은 RF/Wi-Fi 생물학적 효과에 관한 131개 연구의 포괄적 리뷰를 제시한다. 95%가 산화 스트레스를 보고 — [[ref:yakymenko2016|Yakymenko 등 2016]](93/100 연구)과 일치하는 합의로, 독립적 리뷰 간 견고성을 실증한다. IFO(Irregular Forced Opening) 메커니즘은 다음을 설명한다: 편광된, 코히어런트 RF-EMF가 전압 의존성 칼슘 채널의 S4 전압 센서를 비생리적 주파수로 진동하게 하여, 불규칙한 채널 개방, 통제 불능의 Ca²⁺ 유입, 미토콘드리아 ROS 생성, DNA 손상, 정자 장애, 호르몬 변화를 야기한다.",
          "이 메커니즘은 VGCC 차단제 실험으로 확인된다: 니페디핀과 다른 칼슘 채널 차단제가 여러 연구 설계에서 RF 유발 생물학적 효과를 방지한다([[ref:pall2013_v2|Pall 2013]]: 23개 차단제 연구). 이것은 BERM의 레벨 4 노드(VGIC 활성화)와 레벨 4→5A 엣지(Ca²⁺ → ROS)에 대한 가장 강력한 단일 출처이다. 131개 연구에 걸친 95% 합의는 레벨 5A→6 엣지(ROS → 정자 캐스케이드: SDF, 운동성, 농도)를 지지한다. 정량적으로: Yu 2021은 노출 시간당 운동성 −8.1%를 보고; [[ref:levine2023_sperm|Levine 2023]]은 정자 농도 −51% 감소(1973–2018)를 보고.",
          "[[ref:bertagna2025|Bertagna 등(2025, Ann NY Acad Sci)]]은 IFO-VGIC 메커니즘을 세포 내 칼슘 저장소로 확장한다. 50 Hz, 1 mT ELF-EMF에 60분간 노출된 마우스 해마 CA1 추체 뉴런은 내향 전류 ↓40%와 일과성 외향 전류 ↓50%를 보였다. 두 가지 독립적 Ca²⁺ 경로가 확인되었다: (1) RyR 경로 — 단트롤렌(리아노딘 수용체 차단제)이 EMF 효과를 완전히 소멸시켰다; (2) SERCA 경로 — CPA(SERCA 억제제)가 마찬가지로 EMF 효과를 차단했다. 따라서 레벨 4의 Ca²⁺ 교란은 여러 독립 경로를 통해 작동한다: 직접적 S4 전압 센서 강제 진동([[ref:panagopoulos2025_ifo|Panagopoulos 2025]])과 RyR 및 SERCA를 통한 세포 내 칼슘 저장소 조절 장애([[ref:bertagna2025|Bertagna 2025]]). 다경로 특성은 조직 특이적 감수성을 설명한다: 높은 VGIC 밀도와 큰 세포 내 Ca²⁺ 저장소를 가진 세포(뉴런, 생식선 세포)가 저장소가 적은 세포(각질세포 — cf. [[ref:meyer2026|Meyer 2026]], [[ref:haidar2025_5g_skin_null|Haidar 2025]]: 피부 세포에서 무 결과)보다 더 민감하다. 주: ELF(50 Hz)이지 RF가 아님 — RF로의 변환은 직접적이지 않으나 Ca²⁺ 경로는 공유됨(cf. [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]: IFO는 ELF와 RF 모두에서 다른 강도 의존성으로 작동).",
        ],
        studies: [
          { citation: "Panagopoulos et al. (Bioelectromagnetics)", year: 2025, referenceId: "panagopoulos2025_ifo", note: "131개 연구 리뷰: 95%가 RF/Wi-Fi에 의한 산화 효과를 보고. IFO-VGIC 메커니즘 확인." },
          { citation: "Yakymenko et al.", year: 2016, referenceId: "yakymenko2016", note: "93/100 연구가 저강도 RF에 의한 산화 스트레스를 보고 — Panagopoulos 2025의 독립적 확인" },
          { citation: "Pall (J. Cell. Mol. Med.)", year: 2013, referenceId: "pall2013_v2", note: "23개 연구: VGCC 차단제가 RF 유발 생물학적 효과를 방지" },
          { citation: "Bertagna et al. (Ann NY Acad Sci)", year: 2025, referenceId: "bertagna2025", note: "50 Hz, 1 mT: 내향 전류 ↓40%, 일과성 외향 ↓50%. RyR + SERCA 차단이 EMF 효과를 소멸 — 세포 내 Ca²⁺ 저장소가 EMF 전달에 참여." },
        ],
      },
      {
        id: "transduction-rcts",
        title: "3가지 GSM RCT: 레벨 3→4 엣지는 활성이다",
        paragraphs: [
          "3가지 독립적 실험 연구가 890–902 MHz GSM 신호 — BERM이 모델링한 주파수 — 가 비열적 SAR에서 측정 가능한 생물학적 반응을 생성함을 실증한다. [[ref:koivisto2000|Koivisto 등(2000a,b, NeuroReport, n=48+48)]]은 투르쿠 대학교에서 2개의 이중맹검 RCT를 수행했다. 902 MHz GSM 좌측 노출이 3-Back(30분)과 Simple RT/Vigilance/Subtraction 과제(60분)에서 인지 촉진(더 빠른 반응 시간)을 생성했다. 촉진은 BERM과 모순되지 않는다: 급성 Ca²⁺ 상승은 시냅스 전달을 촉진할 수 있으며, 만성적 상승은 ROS(레벨 5A)를 생성한다. 이는 BERM의 회복 창에 대응한다: 30분 노출 + 23.5시간 회복 → 97% 수리 → 순 손상 없음. 유의사항: 재현되지 않음(Haarala 2003: n=32, 무; Haarala 2005: n=32 아동, 무).",
          "[[ref:eliyahu2006|Eliyahu 등(2006, Bioelectromagnetics, n=36)]]은 890.2 MHz 양측 노출을 2시간 실시했다(Nokia 5110, 2W 피크). 좌측 노출이 공간 인식에서 좌수 RT를 지연시켰다 — 측면화를 실증: EMF 효과가 노출된 반구에 국소화된다. 이는 BERM의 레벨 3 이중 채널 공간 구조에 대한 직접적 실증적 지지를 제공한다: 주머니의 전화 → 고환, 귀의 전화 → 시상하부. 국소적 VGCC 활성화(경로 A) 및 국소적 BBB 개방(경로 E, cf. [[ref:salford2003|Salford 2003]] SAR 0.016 W/kg)과 호환된다.",
          "[[ref:luria2009|Luria 등(2009, Bioelectromagnetics, n=48 오른손잡이 남성)]]은 890.2 MHz를 1시간, SAR 0.54–1.09 W/kg로 적용했다. 좌측 노출 중 우수 RT가 처음 2블록에서만 증가했다 — 효과는 이후 블록에서 사라졌다. 이 시간 의존적 적응은 BERM의 경로 D(HPA→HPG)에 대응한다: Selye의 GAS 역학(경보 → 저항). 1시간 내에 관찰된 급성 경보→저항 전환은 BERM이 모델링하는 만성 과정의 첫 번째 단계이다: 지속적 HPA 활성화 → 코르티솔↑ → HPG 억제. 남성 전용 표본은 BERM의 bioCap 대상 집단과 일치한다. 유의사항: 처음 2블록에서만의 효과 — 적응 또는 무작위 변동.",
        ],
        studies: [
          { citation: "Koivisto et al. (NeuroReport)", year: 2000, referenceId: "koivisto2000", note: "2개의 이중맹검 RCT(n=48+48): 902 MHz → 인지 촉진. 재현되지 않음(Haarala 2003, 2005)." },
          { citation: "Eliyahu et al. (Bioelectromagnetics)", year: 2006, referenceId: "eliyahu2006", note: "n=36, 890 MHz, 2시간: 측면화 RT 효과 — 이중 채널 공간 구조를 지지" },
          { citation: "Luria et al. (Bioelectromagnetics)", year: 2009, referenceId: "luria2009", note: "n=48 남성, 890 MHz, 1시간: 시간 의존적 측면화 효과 — GAS 역학" },
        ],
      },
    ],
    paradoxCards: [
      {
        label: "tDCS ≈ 도시 환경",
        text: "FDA 승인 tDCS의 치료적 전장 강도(0.3–1.0 V/m)는 측정된 도시 환경 RF(0.67–1.51 V/m)와 같은 차수이다. 0.3 V/m이 FDA 승인에 충분한 생물학적 활성을 갖는다면, 도시 환경이 불활성이라고 가정할 수 없다.",
      },
      {
        label: "TTFields 특허 리스크",
        text: "Novocure의 TTFields 특허([[ref:ttfields_patent_7016725|US 7,016,725]])는 100–300 kHz에서 '난소 또는 고환 세포가 전기장에 민감할 수 있다'고 명시적으로 기술한다 — 모든 현대 건물에서 볼 수 있는 LED 스위칭 전원 공급 장치와 같은 주파수 범위이다.",
      },
      {
        label: "발색단 일반화",
        text: "LLLT는 가시광 포톤이 미토콘드리아의 시토크롬 c 산화효소(CCO)에 흡수되기 때문에 작동한다. RF 전장은 크립토크롬 라디칼 쌍(CRY)을 통해 생물학에 영향을 미친다. 둘 다 발색단 — 특정 EM 주파수를 흡수할 때 구조가 변하는 분자 — 이다. 다른 발색단, 같은 원리, 같은 비열적 메커니즘 클래스.",
      },
    ],
    paradoxCalTitle: "생물학적 감수성이 예상되는 것이지 놀라운 것이 아닌 이유",
    paradoxCal1: "인간의 눈은 단일 포톤 — ~4×10⁻¹⁹ 줄을 운반하는 전자기 복사의 1 양자, 열 잡음 에너지의 10분의 1 — 을 감지할 수 있다([[ref:vaziri2016|Vaziri 등 2016, Nature Communications]]). 진화는 정보가 생존에 가치가 있기 때문에 이 전자기 센서를 양자 한계까지 최적화했다. 진화가 포톤 감지를 단일 양자 경계까지 밀어붙였다면, 전자기장 감지를 비슷한 극한까지 밀어붙이지 않았을 이유가 있겠는가?",
    paradoxCal2: "실제로 밀어붙였다. Panagopoulos 등 2025(Frontiers in Public Health)는 전압 의존성 이온 채널이 편광된, 코히어런트 전자기장에 10⁻⁵ V/m 정도의 약한 수준에서도 반응함을 실증한다 — 이온 강제 진동 메커니즘을 통해. LED 드라이버와 전력 전자기기의 전형적 환경 IF-EMF는 0.01에서 3 V/m 범위이며, 이 생물학적 역치를 1,000배에서 300,000배 초과한다. 치료 기기와 환경 노출 사이의 '강도 격차'는 생물학적 수준에서 존재하지 않는다.",
    paradoxCal3: "38억 년의 생물학적 진화 동안 자연환경에 이러한 주파수가 존재하지 않았기 때문에, IF 또는 RF 주파수에 대한 진화된 필터는 존재하지 않는다. 이온 채널은 자연이 결코 생성하지 않은 주파수의 거부 기능이 없는 '광대역 수신기'이다. 모든 기술 신호는 잠재적 교란이다 — 생물학적 센서가 그것을 생리적 신호와 구별할 수 없기 때문이다. 이것은 합성 화학물질이 내분비계를 교란할 수 있는 것과 같은 이유이다 — 진화는 만난 적 없는 분자에 대한 방어를 구축하지 않았다.",
    thCitation: "인용",
    thYear: "연도",
    thNote: "비고",
    flockOffTitle: "상용 기기의 역설: Flock Off / Symterra",
    flockOffP1: "Flock Off(현 Symterra, 10,000건 이상 설치)는 120 Hz ELF 펄스를 사용하여 조류의 크립토크롬(CRY) 기반 항법 시스템을 교란하는 상용 제품이다. 이 제품은 EMF가 비열적으로 생물학적 시스템에 영향을 미친다는 전제하에 판매되고 있다. 그 메커니즘은 라디칼 쌍 메커니즘(RPM)으로, ELF-EMF가 CRY 단백질의 양자 상태를 교란한다.",
    flockOffP2: "역설: 120 Hz = 전력망의 제2고조파(2 × 60 Hz). CRY1/CRY2는 인간의 일주기 시계에 있는 동일한 단백질이다. Cry4는 조류 특이적 자기 수용체이지만, 120 Hz ELF는 포유류의 일주기 리듬을 조절하는 Cry1/Cry2에도 영향을 미친다. ICNIRP는 ELF-EMF가 생물학적 시스템에 영향을 미치지 않는다고 주장하지만, 한 기업이 바로 이 효과를 이용한 제품을 상업적으로 판매하고 있다.",
    flockOffP3: "BERM-Eco 연결: Flock Off는 ELF-EMF가 CRY 항법을 교란함을 직접적으로 증명한다. BERM-Eco의 꿀벌-꿀벌응애 캐스케이드는 같은 메커니즘에 기반한다. [[ref:favre_johansson_2025|Favre & Johansson 2025]](패러데이 차폐 → 군체 회복)는 역 현상이다: EMF 제거가 CRY 기능을 회복시킨다.",
    seeAlso: "참고 항목",
    evidenceRegister: "근거 등록부",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function DevicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Zap} title={d.title} subtitle={d.subtitle} lensIcon={<BermIcon name="physics" size={28} className="text-accent" />} />

      <section className="mb-16 border-t editorial-rule pt-6">
        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              {narrative.id === "therapeutic-device-paradox" && <><span id="therapeutic-devices" /><span id="pathway-GPCR" /><span id="pathway-neural" /></>}
              {narrative.id === "ifo-vgic-review" && <span id="pathway-A" />}
              <h3 className="text-lg font-semibold mb-4">
                <span className="font-mono-num text-xs text-accent mr-2">0{ni + 1}</span>
                <InlineReferenceText text={narrative.title} locale={locale} />
              </h3>
              {narrative.paragraphs.length > 0 && (
                <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
                  <InlineReferenceText text={narrative.paragraphs[0]} locale={locale} />
                </p>
              )}
              <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
                {narrative.paragraphs.slice(1).map((p, pi) => (
                  <p key={pi}><InlineReferenceText text={p} locale={locale} /></p>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{d.thCitation}</th>
                      <th className="py-2 pr-3 w-16">{d.thYear}</th>
                      <th className="py-2">{d.thNote}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {narrative.studies.map((s) => (
                      <tr key={`${s.citation}-${s.year}`} className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-medium text-foreground"><CitationLink referenceId={s.referenceId} locale={locale} citation={s.citation} year={s.year} /></td>
                        <td className="py-2 pr-3 font-mono-num text-foreground-muted">{s.year}</td>
                        <td className="py-2 text-foreground-muted">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {narrative.id === "therapeutic-device-paradox" && (
                <>
                  <div className="mt-8">
                    <TherapeuticFrequencyMap locale={locale} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 mt-8">
                    {d.paradoxCards.map((card) => (
                      <div key={card.label} className="rounded-lg border border-card-border bg-card-bg p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{card.label}</p>
                        <p className="text-sm text-foreground-muted leading-relaxed"><InlineReferenceText text={card.text} locale={locale} /></p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-lg border border-accent/20 bg-card-bg p-5">
                    <h4 className="text-sm font-semibold mb-3">{d.paradoxCalTitle}</h4>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={d.paradoxCal1} locale={locale} /></p>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={d.paradoxCal2} locale={locale} /></p>
                    <p className="text-sm text-foreground-muted leading-relaxed"><InlineReferenceText text={d.paradoxCal3} locale={locale} /></p>
                  </div>

                  <CellSizeFrequencyMatrix locale={locale} />

                  <div id="flock-off" className="mt-8 rounded-lg border border-accent/20 bg-card-bg p-5">
                    <h4 className="text-sm font-semibold mb-3">
                      {d.flockOffTitle}
                    </h4>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-3">
                      <InlineReferenceText text={d.flockOffP1} locale={locale} />
                    </p>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-3">
                      <InlineReferenceText text={d.flockOffP2} locale={locale} />
                    </p>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      <InlineReferenceText text={d.flockOffP3} locale={locale} />
                    </p>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* See also navigation */}
      <div className="mt-14 rounded-lg border border-card-border bg-card-bg p-5">
        <p className="text-sm font-semibold mb-2">{d.seeAlso}</p>
        <div className="flex flex-col gap-1">
          <a href={`/${locale}/evidence`} className="text-accent hover:underline text-sm">← {d.evidenceRegister}</a>
        </div>
      </div>
    </div>
  );
}
