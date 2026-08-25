import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { TherapeuticFrequencyMap } from "@/components/TherapeuticFrequencyMap";
import { CellSizeFrequencyMatrix } from "@/components/CellSizeFrequencyMatrix";
import { CitationLink } from "@/components/CitationLink";

const COPY = {
  en: {
    title: "The Therapeutic Device Paradox",
    subtitle: "FDA-approved devices proving non-thermal EMF bioactivity, the IFO-VGIC transduction mechanism, and three GSM RCTs.",
    narratives: [
      {
        id: "therapeutic-device-paradox",
        title: "The therapeutic device paradox",
        paragraphs: [
          "Regulatory agencies worldwide have approved 26 device categories whose efficacy depends on non-thermal electromagnetic biological effects — spanning the entire EM spectrum from DC to UV light. These include bone growth stimulators (DC, PMA 1986), TENS (12,000+ individual 510(k) clearances), deep brain stimulation (PMA 1997), rTMS for depression (510(k) 2008), TTFields for cancer (PMA 2011/2015/2026), PRF anti-inflammatory therapy (27 MHz), LLLT/photobiomodulation (510(k) 2007), blue light for neonatal jaundice, and UV phototherapy for psoriasis. In 2026, Kim et al. (Cell, IF ~64) demonstrated a 25th category: an EMF-inducible gene switch where 60 Hz pulsed EMF activates gene promoters in vivo via Cyb5b, a mitochondrial outer membrane protein identified through genome-wide CRISPR screening. A 26th category predates these by decades: US Patent 4,850,959 (1989) described a method for controlling insulin release from pancreatic beta cells using resonance-frequency EMF via calcium channel modulation — resonance frequency causes Ca²⁺ influx and insulin increase, non-resonance frequency causes Ca²⁺ efflux and decrease. If intentional EMF can control gene expression and insulin secretion, unintentional environmental EMF may dysregulate both without awareness. Each approval required clinical proof that electromagnetic energy produces a biological response without thermal heating. This is not controversial EMF safety research — it is mainstream medicine.",
          "The logical contradiction is direct: FDA requires proof of biological effect for device approval, while ICNIRP assumes absence of non-thermal biological effects for exposure limit setting. These two positions are logically incompatible. Non-thermal bioactivity is proven at every frequency from DC to UV light — except at RF frequencies between 300 MHz and 6 GHz. This is not a gap in biology; it is a gap in acknowledgment. The only frequency range where non-thermal effects are ‘not recognized’ is the range used by the telecommunications industry.",
          "The tDCS comparison is particularly revealing: the therapeutic field strength in the cortex (0.3–1.0 V/m) that earned FDA PMA approval in December 2025 is the same order of magnitude as measured urban ambient RF field strength (0.67–1.51 V/m). If 0.3 V/m DC is biologically active enough for FDA approval, urban ambient RF at 0.67 V/m cannot be assumed biologically inert. The Novocure TTFields patent (US 7,016,725) explicitly identifies that ‘cells in the ovaries or testicles may be sensitive to the electric fields’ at 100–300 kHz — the same frequency range produced by LED lighting drivers.",
        ],
        studies: [
          { citation: "EBI Bone Healing System (FDA PMA)", year: 1979, note: "PEMF non-thermal bone healing, 1–100 Hz" },
          { citation: "NeuroStar rTMS (FDA 510(k))", year: 2008, note: "Neuroplastic changes from pulsed magnetic fields" },
          { citation: "Optune TTFields (FDA PMA, EF-14 phase III)", year: 2015, note: "100–300 kHz disrupts cell division (non-thermal)" },
          { citation: "Flow Neuroscience tDCS (FDA PMA)", year: 2025, note: "0.3–1.0 V/m DC changes brain function" },
          { citation: "GammaCore VNS (FDA 510(k))", year: 2017, note: "Vagus nerve stimulation, systemic anti-inflammatory" },
          { citation: "Novocure patent US 7,016,725", year: 2006, note: "Identifies ovaries/testicles as sensitive to IF fields" },
          { citation: "Kim et al. (Cell)", year: 2026, note: "EMF gene switch via Cyb5b — CRISPR-identified EMF sensor, 60 Hz" },
          { citation: "US Patent 4,850,959", year: 1989, note: "Resonance-frequency EMF controls insulin release via Ca²⁺ channels in pancreatic beta cells" },
        ],
      },
      {
        id: "ifo-vgic-review",
        title: "IFO-VGIC: the transduction mechanism (Panagopoulos 2025)",
        paragraphs: [
          "Panagopoulos et al. (2025, Bioelectromagnetics) present a comprehensive review of 131 studies on RF/Wi-Fi biological effects. 95% report oxidative stress — a consensus consistent with Yakymenko et al. 2016 (93/100 studies), demonstrating robustness across independent reviews. The IFO (Irregular Forced Opening) mechanism explains how: polarized, coherent RF-EMF forces the S4 voltage sensor of voltage-gated calcium channels to oscillate at a non-physiological frequency, causing irregular channel opening, uncontrolled Ca²⁺ influx, mitochondrial ROS production, DNA damage, sperm disorders, and hormonal changes.",
          "The mechanism is confirmed by VGCC blocker experiments: nifedipine and other calcium channel blockers prevent RF-induced biological effects across multiple study designs (Pall 2013: 23 blocker studies). This is the strongest single source for BERM’s Level 4 node (VGIC activation) and the Level 4→5A edge (Ca²⁺ → ROS). The 95% consensus on oxidative stress across 131 studies supports Level 5A→6 edges (ROS → sperm cascade: SDF, motility, concentration). Quantitative: Yu 2021 reports −8.1% motility per hour of exposure; Levine 2023 reports −51% sperm concentration decline (1973–2018).",
          "Bertagna et al. (2025, Ann NY Acad Sci) extend the IFO-VGIC mechanism to intracellular calcium stores. Mouse hippocampal CA1 pyramidal neurons exposed to 50 Hz, 1 mT ELF-EMF for 60 minutes showed inward currents ↓40% and transient outward currents ↓50%. Two independent Ca²⁺ pathways were identified: (1) RyR pathway — dantrolene (ryanodine receptor blocker) fully abrogated EMF effects; (2) SERCA pathway — CPA (SERCA inhibitor) similarly blocked EMF effects. The Ca²⁺ disruption at Level 4 thus operates through multiple independent pathways: direct S4 voltage sensor forced oscillation (Panagopoulos 2025) and intracellular calcium store dysregulation via RyR and SERCA (Bertagna 2025). The multi-pathway nature explains tissue-specific sensitivity: cells with high VGIC density and large intracellular Ca²⁺ stores (neurons, gonadal cells) are more sensitive than cells with low stores (keratinocytes — cf. Meyer 2026, Haidar 2025: null results in skin cells). Note: ELF (50 Hz), not RF — translation to RF is not direct, but the Ca²⁺ pathway is shared (cf. Panagopoulos 2025: IFO operates at both ELF and RF with different intensity dependencies).",
        ],
        studies: [
          { citation: "Panagopoulos et al. (Bioelectromagnetics)", year: 2025, note: "131-study review: 95% report oxidative effects from RF/Wi-Fi. IFO-VGIC mechanism confirmed." },
          { citation: "Yakymenko et al.", year: 2016, note: "93/100 studies report oxidative stress from low-intensity RF — independent confirmation of Panagopoulos 2025" },
          { citation: "Pall (J. Cell. Mol. Med.)", year: 2013, note: "23 studies: VGCC blockers prevent RF-induced biological effects" },
          { citation: "Bertagna et al. (Ann NY Acad Sci)", year: 2025, note: "50 Hz, 1 mT: inward currents ↓40%, transient outward ↓50%. RyR + SERCA blockade abrogates EMF effects — intracellular Ca²⁺ stores participate in EMF transduction." },
        ],
      },
      {
        id: "transduction-rcts",
        title: "Three GSM RCTs: the Level 3→4 edge is active",
        paragraphs: [
          "Three independent experimental studies demonstrate that 890–902 MHz GSM signal — BERM’s modeled frequency — produces a measurable biological response at non-thermal SAR. Koivisto et al. (2000a,b, NeuroReport, n=48+48) conducted two double-blind RCTs at the University of Turku. 902 MHz GSM left-sided exposure produced cognitive facilitation (faster reaction times) in 3-Back (30 min) and Simple RT/Vigilance/Subtraction tasks (60 min). Facilitation is NOT anti-BERM: acute Ca²⁺ elevation can facilitate synaptic transmission, while chronic elevation produces ROS (Level 5A). This maps to BERM’s recovery window: 30 min exposure + 23.5h recovery → 97% repair → no net damage. Caveat: not replicated (Haarala 2003: n=32, null; Haarala 2005: n=32 children, null).",
          "Eliyahu et al. (2006, Bioelectromagnetics, n=36) used 890.2 MHz bilateral exposure for 2 hours (Nokia 5110, 2W peak). Left-sided exposure slowed left-hand RT in spatial recognition — demonstrating lateralization: EMF effect localizes to the exposed hemisphere. This provides direct empirical support for BERM’s Level 3 two-channel spatial structure: phone in pocket → testes, phone at ear → hypothalamus. Compatible with local VGCC activation (pathway A) and local BBB opening (pathway E, cf. Salford 2003 at SAR 0.016 W/kg).",
          "Luria et al. (2009, Bioelectromagnetics, n=48 right-handed males) applied 890.2 MHz for 1 hour at SAR 0.54–1.09 W/kg. Right-hand RT increased during left-sided exposure in the first 2 blocks only — the effect vanished in later blocks. This time-dependent adaptation maps to BERM’s pathway D (HPA→HPG): Selye’s GAS dynamics (alarm → resistance). The acute alarm→resistance transition observed within 1 hour is the first step of the chronic process BERM models: sustained HPA activation → cortisol↑ → HPG suppression. Male-only sample matches BERM’s bioCap target population. Caveat: effect only in first 2 blocks — adaptation or random fluctuation.",
        ],
        studies: [
          { citation: "Koivisto et al. (NeuroReport)", year: 2000, note: "Two double-blind RCTs (n=48+48): 902 MHz → cognitive facilitation. Not replicated (Haarala 2003, 2005)." },
          { citation: "Eliyahu et al. (Bioelectromagnetics)", year: 2006, note: "n=36, 890 MHz, 2h: lateralized RT effect — supports two-channel spatial structure" },
          { citation: "Luria et al. (Bioelectromagnetics)", year: 2009, note: "n=48 males, 890 MHz, 1h: time-dependent lateralized effect — GAS dynamics" },
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
        text: "Novocure’s TTFields patent (US 7,016,725) explicitly states that ‘ovarian or testicular cells may be sensitive to electric fields’ at 100–300 kHz — the same frequency range as LED switched-mode power supplies found in every modern building.",
      },
      {
        label: "Chromophore generalization",
        text: "LLLT works because visible light photons are absorbed by cytochrome c oxidase (CCO) in mitochondria. RF fields affect biology through cryptochrome radical pairs (CRY). Both are chromophores — molecules whose conformation changes when they absorb specific EM frequencies. Different chromophore, same principle, same non-thermal mechanism class.",
      },
    ],
    paradoxCalTitle: "Why biological sensitivity is expected, not surprising",
    paradoxCal1: "The human eye can detect a single photon — one quantum of electromagnetic radiation carrying ~4×10⁻¹⁹ joules, one-tenth of thermal noise energy (Vaziri et al. 2016, Nature Communications). Evolution optimized this electromagnetic sensor to the quantum limit because information is valuable for survival. If evolution pushed photon detection to the single-quantum boundary, why would it not have pushed electromagnetic field detection to comparable extremes?",
    paradoxCal2: "It did. Panagopoulos et al. 2025 (Frontiers in Public Health) demonstrate that voltage-gated ion channels respond to polarized, coherent electromagnetic fields as weak as 10⁻⁵ V/m — one hundred thousandth of a volt per meter — through the Ion Forced Oscillation mechanism. Typical environmental IF-EMF from LED drivers and power electronics ranges from 0.01 to 3 V/m, exceeding this biological threshold by a factor of 1,000 to 300,000. The ‘intensity gap’ between therapeutic devices and environmental exposure does not exist at the biological level.",
    paradoxCal3: "There is no evolved filter for IF or RF frequencies because these frequencies did not exist in the natural environment during the 3.8 billion years of biological evolution. Ion channels are ‘wideband receivers’ with no rejection of frequencies that nature never produced. Every technical signal is a potential disruption because biological sensors cannot distinguish it from a physiological signal. This is the same reason synthetic chemicals can disrupt the endocrine system — evolution did not build defenses against molecules it never encountered.",
  },
  fi: {
    title: "Terapeuttisten laitteiden paradoksi",
    subtitle: "FDA:n hyväksymät laitteet todistavat ei-termistä EMF-bioaktiivisuutta, IFO-VGIC-transduktiomekanismi ja kolme GSM-RCT:ä.",
    narratives: [
      {
        id: "therapeutic-device-paradox",
        title: "Terapeuttisten laitteiden paradoksi",
        paragraphs: [
          "Regulaattorit ympäri maailmaa ovat hyväksyneet 26 laitekategoriaa, joiden teho perustuu ei-termiseen sähkömagneettiseen biologiseen vaikutukseen — kattaen koko EM-spektrin DC:stä UV-valoon. Näihin kuuluvat luunkasvustimulaattorit (DC, PMA 1986), TENS (12 000+ yksittäistä 510(k)-hyväksyntää), syväaivostimulaatio (PMA 1997), rTMS masennukseen (510(k) 2008), TTFields syöpään (PMA 2011/2015/2026), PRF-tulehdushoito (27 MHz), LLLT/fotobiomodulaatio (510(k) 2007), sinivaloterapia vastasyntyneiden keltaisuuteen ja UV-valohoito psoriasikseen. Vuonna 2026 Kim ym. (Cell, IF ~64) osoittivat 25. kategorian: EMF-geenikytkin, jossa 60 Hz pulssi-EMF aktivoi geenipromoottoreita in vivo Cyb5b:n kautta — mitokondrion ulkokalvoproteiini, joka tunnistettiin genominlaajuisessa CRISPR-seulonnassa EMF-sensoriksi. 26. kategoria on vuosikymmeniä vanhempi: US-patentti 4 850 959 (1989) kuvasi menetelmän insuliinin erityksen kontrolloimiseksi haiman beetasoluista resonanssitaajuisella EMF:llä kalsiumkanavien kautta — resonanssitaajuus aiheuttaa Ca²⁺-influksin ja insuliinin nousun, ei-resonanssitaajuus effluksin ja laskun. Jos tarkoituksellinen EMF voi kontrolloida geeniekspressiota ja insuliinieritystä, tahaton ympäristö-EMF voi häiritä molempia tiedostamattomasti. Jokainen hyväksyntä edellytti kliinistä todistamista siitä, että sähkömagneettinen energia tuottaa biologisen vasteen ilman termistä kuumennusta. Tämä ei ole kontroversiaalista EMF-turvallisuustutkimusta — se on valtavirtalääketiedettä.",
          "Looginen ristiriita on suora: FDA vaatii biologisen vaikutuksen todentamista laitteen hyväksymiseksi, kun taas ICNIRP olettaa ei-termisten biologisten vaikutusten puuttumista altistusrajojen asettamiseksi. Nämä kaksi positiota ovat loogisesti yhteensopimattomia. Ei-terminen bioaktiivisuus on todistettu jokaisella taajuudella DC:stä UV-valoon — paitsi RF-taajuuksilla 300 MHz:n ja 6 GHz:n välillä. Tämä ei ole aukko biologiassa; se on aukko tunnustamisessa. Ainoa taajuusalue jossa ei-termisiä vaikutuksia ‘ei tunnusteta’ on telekommunikaatioteollisuuden käyttämä alue.",
          "tDCS-vertailu on erityisen paljastava: terapeuttinen kenttävoimakkuus aivokuoressa (0,3–1,0 V/m), joka sai FDA PMA -hyväksynnän joulukuussa 2025, on samaa suuruusluokkaa kuin mitattu kaupungin ambient-RF-kenttävoimakkuus (0,67–1,51 V/m). Jos 0,3 V/m DC on biologisesti riittävän aktiivinen FDA-hyväksyntään, kaupungin ambient-RF:ää 0,67 V/m ei voida olettaa biologisesti inertiksi. Novocuren TTFields-patentti (US 7 016 725) tunnistaa eksplisiittisesti, että ‘munasarjojen tai kivesten solut voivat olla herkkiä sähkökentille’ 100–300 kHz:n taajuudella — samalla taajuusalueella kuin LED-valaistuksen hakkuriteholähteet.",
        ],
        studies: [
          { citation: "EBI Bone Healing System (FDA PMA)", year: 1979, note: "PEMF:n ei-terminen luunparaneminen, 1–100 Hz" },
          { citation: "NeuroStar rTMS (FDA 510(k))", year: 2008, note: "Neuroplastiset muutokset pulssimagneettikentistä" },
          { citation: "Optune TTFields (FDA PMA, EF-14 faasi III)", year: 2015, note: "100–300 kHz häiritsee solunjakautumista (ei-terminen)" },
          { citation: "Flow Neuroscience tDCS (FDA PMA)", year: 2025, note: "0,3–1,0 V/m DC muuttaa aivojen toimintaa" },
          { citation: "GammaCore VNS (FDA 510(k))", year: 2017, note: "Vagushermostimulaatio, systeeminen anti-inflammatorinen" },
          { citation: "Novocure-patentti US 7 016 725", year: 2006, note: "Tunnistaa munasarjat/kivekset herkiksi IF-kentille" },
          { citation: "Kim ym. (Cell)", year: 2026, note: "EMF-geenikytkin Cyb5b:n kautta — CRISPR-tunnistettu EMF-sensori, 60 Hz" },
          { citation: "US-patentti 4 850 959", year: 1989, note: "Resonanssitaajuinen EMF kontrolloi insuliinieritystä Ca²⁺-kanavien kautta haiman beetasoluissa" },
        ],
      },
      {
        id: "ifo-vgic-review",
        title: "IFO-VGIC: transduktiomekanismi (Panagopoulos 2025)",
        paragraphs: [
          "Panagopoulos ym. (2025, Bioelectromagnetics) esittävät 131 tutkimuksen kattavan katsauksen RF/Wi-Fi:n biologisista vaikutuksista. 95 % raportoi oksidatiivista stressiä — konsensus, joka on yhdenmukainen Yakymenko ym. 2016 (93/100 tutkimusta) kanssa. IFO-mekanismi (Irregular Forced Opening) selittää: polarisoitu, koherentti RF-EMF pakottaa VGCC:n S4-jännitesensorin epäfysiologiseen oskillaatioon → hallitsematon kanavan avautuminen → kontrolloimaton Ca²⁺-influksi → mitokondriaalinen ROS → DNA-vauriot, siittiöhäiriöt, hormonaaliset muutokset.",
          "Mekanismia tukevat VGCC-salpaajat: nifedipiini ja muut kalsiumkanavasalpaajat estävät RF:n biologiset vaikutukset useissa koeasetelmissa (Pall 2013: 23 salpaajatukimusta). Tämä on tason 4 (VGIC-aktivaatio) ja tason 4→5A nuolen (Ca²⁺ → ROS) vahvin yksittäinen kokoava evidenssilähde. 95 %:n konsensus 131 tutkimuksessa tukee tason 5A→6 nuolia (ROS → siittiökaskadi: SDF, motiliteetti, konsentraatio). Kvantitatiivisesti: Yu 2021: −8,1 % motiliteetti per tunti altistusta; Levine 2023: −51 % siittiökonsentraation lasku (1973–2018).",
          "Bertagna ym. (2025, Ann NY Acad Sci) laajentavat IFO-VGIC-mekanismia solunsisäisiin kalsiumvarastoihin. Hiiren hippokampuksen CA1-pyramidaalineuronit altistettiin 50 Hz, 1 mT ELF-EMF:lle 60 minuutin ajan: sisäänpäinsuuntaiset virrat ↓40 % ja transientit ulospäinsuuntaiset virrat ↓50 %. Kaksi itsenäistä Ca²⁺-reittiä tunnistettiin: (1) RyR-reitti — dantroleeni (ryanodiinireseptorisalpaaja) esti EMF-vaikutukset kokonaan; (2) SERCA-reitti — CPA (SERCA-inhibiittori) esti samoin EMF-vaikutukset. Tason 4 Ca²⁺-häiriö operoi siten useamman itsenäisen reitin kautta: suora S4-jännitesensorin pakotettu oskillaatio (Panagopoulos 2025) ja solunsisäisten kalsiumvarastojen dysregulaatio RyR:n ja SERCA:n kautta (Bertagna 2025). Monireittiisyys selittää kudosspesifisen herkkyyden: solut joissa on korkea VGIC-tiheys ja suuret solunsisäiset Ca²⁺-varastot (neuronit, gonaadisolut) ovat herkempiä kuin matalan varastotiheyden solut (keratinosyytit — vrt. Meyer 2026, Haidar 2025: nollatulokset ihosoluissa). Huom: ELF (50 Hz), ei RF — mekanismin siirto RF:lle ei suoraviivainen, mutta Ca²⁺-reitti on jaettu (vrt. Panagopoulos 2025: IFO operoi sekä ELF- että RF-alueella eri voimakkuusriippuvuudella).",
        ],
        studies: [
          { citation: "Panagopoulos ym. (Bioelectromagnetics)", year: 2025, note: "131 tutkimuksen katsaus: 95 % raportoi oksidatiivisia vaikutuksia. IFO-VGIC-mekanismi." },
          { citation: "Yakymenko ym.", year: 2016, note: "93/100 tutkimusta raportoi oksidatiivista stressiä — riippumaton vahvistus" },
          { citation: "Pall (J. Cell. Mol. Med.)", year: 2013, note: "23 tutkimusta: VGCC-salpaajat estävät RF:n biologiset vaikutukset" },
          { citation: "Bertagna ym. (Ann NY Acad Sci)", year: 2025, note: "50 Hz, 1 mT: sisäänpäinvirrat ↓40 %, transientit ↓50 %. RyR- ja SERCA-salpaus estää EMF-vaikutukset — solunsisäiset Ca²⁺-varastot osallistuvat EMF-transduktioon." },
        ],
      },
      {
        id: "transduction-rcts",
        title: "Kolme GSM-RCT:tä: tason 3→4 nuoli on aktiivinen",
        paragraphs: [
          "Kolme itsenäistä kokeellista tutkimusta osoittaa, että 890–902 MHz:n GSM-signaali — BERM:n mallintama taajuus — tuottaa mitattavan biologisen vasteen ei-termisillä SAR-arvoilla. Koivisto ym. (2000a,b, NeuroReport, n=48+48) toteutti kaksi kaksoissokkokokeetta Turun yliopistossa. 902 MHz:n vasemmanpuoleinen GSM-altistus tuotti kognitiivisen fasilitaation (nopeammat reaktioajat) 3-Back-tehtävässä (30 min) ja Simple RT/Vigilance/Subtraction -tehtävissä (60 min). Fasilitaatio EI ole BERM:n vastainen: akuutti Ca²⁺-kohoaminen voi fasilitoida synaptista transmissiota, kun taas krooninen Ca²⁺ tuottaa ROS:ia (taso 5A). Ero kartoittuu BERM:n recovery window -mekanismiin: 30 min altistus + 23,5 h palautuminen → 97 % korjaus. Rajoite: ei replikoitu (Haarala 2003: n=32, nollatulos; Haarala 2005: n=32 lasta, nollatulos).",
          "Eliyahu ym. (2006, Bioelectromagnetics, n=36) käytti 890,2 MHz:n bilateraalista altistusta 2 tuntia (Nokia 5110, 2W huippu). Vasemmanpuoleinen altistus hidasti vasemman käden RT spatiaalisessa tunnistuksessa — osoittaen lateralisaation: EMF-vaikutus paikantuu altistettuun aivopuoliskoon. Suora empiirinen tuki tason 3 kaksikanavamallin spatiaaliselle rakenteelle: puhelin taskussa → kivekset, puhelin korvalla → hypotalamus. Yhteensopiva paikallisen VGCC-aktivaation (polku A) ja BBB-avautumisen (polku E, vrt. Salford 2003 SAR 0,016 W/kg) kanssa.",
          "Luria ym. (2009, Bioelectromagnetics, n=48 oikeakätistä miestä) altisti 890,2 MHz:llä 1 tunti, SAR 0,54–1,09 W/kg. Oikean käden RT kasvoi vasemmanpuoleisen altistuksen aikana vain 2 ensimmäisessä blokissa — vaikutus hävisi myöhemmissä. Aikariippuva adaptaatio kartoittuu polun D (HPA→HPG) konseptiin: Selyen GAS-dynamiikka (alarm → resistance). Yhden tunnin sisällä havaittu alarm→resistance -siirtymä on ensimmäinen askel kroonisessa prosessissa: HPA-aktivaatio → kortisoli↑ → HPG-suppressio. Pelkkiä miehiä — kohdistuu BERM:n bioCap-populaatioon. Rajoite: vaikutus vain 2 ensimmäisessä blokissa.",
        ],
        studies: [
          { citation: "Koivisto ym. (NeuroReport)", year: 2000, note: "Kaksi kaksoissokkokokeetta (n=48+48): 902 MHz → fasilitaatio. Ei replikoitu (Haarala 2003, 2005)." },
          { citation: "Eliyahu ym. (Bioelectromagnetics)", year: 2006, note: "n=36, 890 MHz, 2 h: lateralisoitunut RT-vaikutus — tukee kaksikanavamallia" },
          { citation: "Luria ym. (Bioelectromagnetics)", year: 2009, note: "n=48 miestä, 890 MHz, 1 h: aikariippuva lateralisoitunut vaikutus — GAS-dynamiikka" },
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
        text: "Novocuren TTFields-patentti (US 7 016 725) toteaa eksplisiittisesti, että ‘munasarjojen tai kivesten solut voivat olla herkkiä sähkökentille’ taajuudella 100–300 kHz — samalla taajuusalueella kuin LED-valaistuksen hakkuriteholähteet, joita on jokaisessa nykyrakennuksessa.",
      },
      {
        label: "Kromoforien yleistys",
        text: "LLLT toimii koska näkyvän valon fotonit absorboituvat mitokondrioiden sytokromi c -oksidaasiin (CCO). RF-kentät vaikuttavat biologiaan kryptokromi-radikaaliparin (CRY) kautta. Molemmat ovat kromofooreja — molekyylejä joiden konformaatio muuttuu absorboidessaan tietyn EM-taajuuden. Eri kromofori, sama periaate, sama ei-terminen mekanismiluokka.",
      },
    ],
    paradoxCalTitle: "Miksi biologinen herkkyys on odotettavissa, ei yllättävää",
    paradoxCal1: "Ihmisen silmä havaitsee yksittäisen fotonin — yhden sähkömagneettisen säteilyn kvantin, joka kantaa ~4×10⁻¹⁹ joulea, kymmenesosan termisestä kohinaenergiasta (Vaziri ym. 2016, Nature Communications). Evoluutio optimoi tämän sähkömagneettisen sensorin kvanttirajaansa asti, koska informaatio on arvokasta selviytymiselle. Jos evoluutio painoi fotonihavaitsemisen yhden kvantin rajalle, miksi se ei olisi painanut sähkömagneettisen kentän havaitsemista vastaaviin äärirajoihin?",
    paradoxCal2: "Se painoi. Panagopoulos ym. 2025 (Frontiers in Public Health) osoittavat, että jänniteohjatut ionikanavat vastaavat polarisoituihin, koherentteihin sähkömagneettisiin kenttiin jo 10⁻⁵ V/m voimakkuudella — sadastuhannesosalla voltista metrillä — ionien pakko-oskillaatiomekanismilla (IFO). Tyypillinen ympäristön IF-EMF LED-hakkureista ja tehoelektroniikasta on 0,01–3 V/m, ylittäen tämän biologisen kynnyksen 1 000–300 000 -kertaisesti. Intensiteettikuilua terapeuttisten laitteiden ja ympäristöaltistuksen välillä ei ole biologisella tasolla.",
    paradoxCal3: "IF- tai RF-taajuuksille ei ole evoluution kehittämää suodatinta, koska näitä taajuuksia ei ollut luonnollisessa ympäristössä 3,8 miljardin vuoden biologisen evoluution aikana. Ionikanavat ovat ‘laajakaistavastaanottimia’ ilman hylkimistä taajuuksille, joita luonto ei koskaan tuottanut. Jokainen tekninen signaali on mahdollinen häiriö, koska biologiset sensorit eivät voi erottaa sitä fysiologisesta signaalista. Tämä on sama syy, miksi synteettiset kemikaalit voivat häiritä endokriinistä järjestelmää — evoluutio ei rakentanut puolustuksia molekyylejä vastaan, joita se ei kohdannut.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function DevicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Zap} title={d.title} subtitle={d.subtitle} />

      <section className="mb-16 border-t editorial-rule pt-6">
        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              {narrative.id === "therapeutic-device-paradox" && <><span id="therapeutic-devices" /><span id="pathway-GPCR" /><span id="pathway-neural" /></>}
              {narrative.id === "ifo-vgic-review" && <span id="pathway-A" />}
              <h3 className="text-lg font-semibold mb-4">
                <span className="font-mono-num text-xs text-accent mr-2">0{ni + 1}</span>
                {narrative.title}
              </h3>
              {narrative.paragraphs.length > 0 && (
                <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
                  {narrative.paragraphs[0]}
                </p>
              )}
              <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
                {narrative.paragraphs.slice(1).map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                      <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                      <th className="py-2">{activeLocale === "fi" ? "Huomio" : "Note"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {narrative.studies.map((s) => (
                      <tr key={`${s.citation}-${s.year}`} className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-medium text-foreground"><CitationLink citation={s.citation} year={s.year} /></td>
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
                    <TherapeuticFrequencyMap locale={activeLocale} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 mt-8">
                    {d.paradoxCards.map((card) => (
                      <div key={card.label} className="rounded-lg border border-card-border bg-card-bg p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{card.label}</p>
                        <p className="text-sm text-foreground-muted leading-relaxed">{card.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-lg border border-accent/20 bg-card-bg p-5">
                    <h4 className="text-sm font-semibold mb-3">{d.paradoxCalTitle}</h4>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.paradoxCal1}</p>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.paradoxCal2}</p>
                    <p className="text-sm text-foreground-muted leading-relaxed">{d.paradoxCal3}</p>
                  </div>

                  <CellSizeFrequencyMatrix locale={activeLocale} />

                  <div id="flock-off" className="mt-8 rounded-lg border border-accent/20 bg-card-bg p-5">
                    <h4 className="text-sm font-semibold mb-3">
                      {activeLocale === "fi" ? "Kaupallinen laite-paradoksi: Flock Off / Symterra" : "Commercial Device Paradox: Flock Off / Symterra"}
                    </h4>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-3">
                      {activeLocale === "fi"
                        ? "Flock Off (nyk. Symterra, 10 000+ asennusta) on kaupallinen tuote joka käyttää 120 Hz ELF-pulssia häiritsemään lintujen kryptokromi-pohjaista (CRY) navigointijärjestelmää. Tuote MYYDÄÄN sillä perusteella, että EMF vaikuttaa biologisiin järjestelmiin ei-termisesti. Mekanismi on radikaaliparimenetelmä (RPM) jossa ELF-EMF häiritsee CRY-proteiinin kvanttitilaa."
                        : "Flock Off (now Symterra, 10,000+ installations) is a commercial product that uses 120 Hz ELF pulses to disrupt birds’ cryptochrome-based (CRY) navigation system. The product is SOLD on the premise that EMF affects biological systems non-thermally. The mechanism is the radical pair mechanism (RPM) where ELF-EMF disrupts the quantum state of CRY protein."}
                    </p>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-3">
                      {activeLocale === "fi"
                        ? "Paradoksi: 120 Hz = sähköverkon toinen harmoninen (2 × 60 Hz). CRY1/CRY2 ovat SAMAT proteiinit ihmisen sirkadiaanisessa kellossa. Cry4 on linnuille spesifinen magnetoreseptori, mutta 120 Hz ELF vaikuttaa MYÖS Cry1/Cry2:een jotka säätelevät nisäkkäiden vuorokausirytmiä. ICNIRP väittää, ettei ELF-EMF vaikuta biologisiin järjestelmiin — yritys myy kaupallisesti tuotetta joka toimii juuri tällä vaikutuksella."
                        : "Paradox: 120 Hz = second harmonic of power grid (2 × 60 Hz). CRY1/CRY2 are the SAME proteins in the human circadian clock. Cry4 is bird-specific magnetoreceptor, but 120 Hz ELF ALSO affects Cry1/Cry2 which regulate mammalian circadian rhythm. ICNIRP maintains that ELF-EMF does not affect biological systems — a company commercially sells a product that works by precisely this effect."}
                    </p>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {activeLocale === "fi"
                        ? "BERM-Eco -kytkentä: Flock Off todistaa suoraan, että ELF-EMF häiritsee CRY-navigaatiota. BERM-Eco:n mehiläis-Varroa-kaskadi perustuu samaan mekanismiin. Favre & Johansson 2025 (Faraday-suojaus → pesän palautuminen) on käänteinen ilmiö: EMF:n poistaminen palauttaa CRY-toiminnan."
                        : "BERM-Eco link: Flock Off directly proves that ELF-EMF disrupts CRY navigation. BERM-Eco’s bee-Varroa cascade is based on the same mechanism. Favre & Johansson 2025 (Faraday shielding → colony recovery) is the inverse phenomenon: removing EMF restores CRY function."}
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
        <p className="text-sm font-semibold mb-2">{activeLocale === "fi" ? "Katso myös" : "See also"}</p>
        <div className="flex flex-col gap-1">
          <a href={`/${activeLocale}/evidence`} className="text-accent hover:underline text-sm">← {activeLocale === "fi" ? "Evidenssirekisteri" : "Evidence register"}</a>
        </div>
      </div>
    </div>
  );
}
