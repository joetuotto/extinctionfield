import type { Metadata } from "next";
import { Navigation } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { ClaimRef } from "@/components/ClaimRef";
import { SpermJourneyVisualization } from "@/components/SpermJourneyVisualization";
import { pickCopy } from "@/lib/i18n";

interface VulnPoint {
  id: string;
  label: string;
  duration: string;
  mechanism: string;
  evidence: string;
  pharmacological: string;
  recovery: string;
}

interface Gate {
  label: string;
  process: string;
  emfDisruption: string;
}

interface CanaryPoint {
  label: string;
  detail: string;
}

const COPY = {
  en: {
    title: "Reproductive Navigation",
    subtitle: "Sperm are BERM's most specific biological argument. Nine calcium-dependent steps from production to fertilization — every one EMF-vulnerable, with no backup channel.",
    backLink: "← Back to Evidence",
    cautionText: "The CatSper–EMF connection is established for individual mechanisms (capacitation, chemotaxis). The chain from phone-in-pocket to population fertility decline is BERM's synthesis (M-level), not established consensus. Animal model results may not translate directly to humans.",

    s1Title: "Nine EMF-vulnerable steps",
    s1Lead: "A human sperm's journey from production to fertilization spans ~95 days and 10 cm. Every critical step depends on calcium signaling — and every one is EMF-vulnerable.",
    s1Points: [
      {
        id: "spermatogenesis",
        label: "Spermatogenesis",
        duration: "Testes, 74 days",
        mechanism: "EMF → VGCC (Leydig cells) → Ca²⁺↑ → StAR↓ → P450scc↓ → T↓. Hypothalamic level: EMF → GnRH↓ → LH↓ → T↓.",
        evidence: "WHO meta-analysis: 29 animal studies, T↓ SMD 0.87 (95% CI 0.43–1.30). Santi 2025 meta >1M men: T↓ AND LH↓ simultaneously = hypothalamic suppression. Systematic review ([[ref:frontiers2024_testes|Frontiers 2024]]): mobile radiation affects Leydig cells, seminiferous tubules and spermatozoa.",
        pharmacological: "Nifedipine + ethosuximide → StAR↓ significantly ([[ref:ebiya2017_star|Ebiya 2017]]). Amlodipine 30d → concentration −23%, FSH↓, T↓ ([[ref:almeida2000_ccb|Almeida 2000]]). Chemical VGCC blockade produces THE SAME effect.",
        recovery: "Partial (months). 60% recovery within 30 days of drug cessation. Full spermatogenesis cycle 74d → ~3 months for complete recovery.",
      },
      {
        id: "epididymal",
        label: "Epididymal maturation & premature activation",
        duration: "Epididymis, 12–21 days",
        mechanism: "In the epididymis, sperm are IMMOBILE (low pH → CatSper INACTIVE). EMF → premature CatSper activation → Ca²⁺↑ → hyperactivation BEFORE ejaculation → finite energy stores (ATP, glycogen) DEPLETED → sperm becomes immotile in the female tract.",
        evidence: "ESHRE 2021 ([[ref:catsper_2021|Ayas & Kocaman]]): 2100 MHz → motility (A+B) 47.62→34.19 (p<0.05) + intracellular Ca²⁺ 2.46→1.85 (p<0.05). Nature Comms 2025 ([[ref:catsper-temp-2025|temperature gating]]): CatSper is temperature-gated (Q₁₀=5.1, threshold 33.5°C) → premature activation physiologically possible.",
        pharmacological: "Ca²⁺ ionophore A23187 → capacitation WITHOUT CatSper ([[ref:scirep2016_ionophore|Sci.Rep. 2016]]). BUT: Ca²⁺ decrease after ionophore REQUIRED for hyperactivation → Ca²⁺ DYNAMICS are critical, not just level.",
        recovery: "Ion level: fast (hours-days). BUT: if energy stores depleted → NO recovery for that batch. Mature epididymal sperm do NOT regenerate → damage PERMANENT for that cohort. Next batch (~2–3 weeks) recovers IF exposure ceases.",
      },
      {
        id: "dna-integrity",
        label: "DNA integrity",
        duration: "Entire lifecycle",
        mechanism: "EMF → VGCC → Ca²⁺↑ → NADPH oxidase → ROS↑ → lipid peroxidation (PUFA-rich membrane) → 8-OH-dG↑ → DNA fragmentation (TUNEL+) → chromosomal aberrations.",
        evidence: "De Iuliis 2009 ([[ref:iuliis2009|PLOS ONE]]): RF-EMR → mitochondrial ROS↑ → motility↓, vitality↓, DNA fragmentation↑ (p<0.001). 8-OH-dG correlated with SAR (dose-response). Meta-analysis ([[ref:meta2021_mobile|ScienceDirect 2021]]): RF-EMW → motility↓, vitality↓, DNA fragmentation↑, mitochondrial apoptosis.",
        pharmacological: "NAC (N-acetylcysteine) + vitamin C → partial protection. Antioxidants work as DOWNSTREAM defense BUT do not prevent Ca²⁺ influx → do NOT protect navigation.",
        recovery: "Individual sperm DNA damage: NO RECOVERY (no DNA repair machinery). Population level: new sperm in 74d → recovers. BUT: stem cell epigenetic damage → PERMANENT quality decline. DNA-fragmented sperm CAN fertilize (especially via ICSI) → offspring health risk↑.",
      },
      {
        id: "btb",
        label: "Blood-testis barrier weakening",
        duration: "Testes, continuous",
        mechanism: "EMF → VGCC → Ca²⁺ → ROS → tight junction proteins↓ (occludin, ZO-1, claudin — SAME proteins as BBB). Barrier opens → immune cells enter → spermatogonial degeneration → auto-immune orchitis risk↑.",
        evidence: "Systematic review ([[ref:frontiers2024_testes|Frontiers 2024]]): EMR + heat → blood-testis barrier weakening. Same tight junction proteins (occludin, ZO-1) as the blood-brain barrier.",
        pharmacological: "Calcium channel blockers protect BBB → PREDICTION: they also protect BTB.",
        recovery: "Barrier can regenerate if exposure ceases, but chronic exposure may lead to persistent permeability.",
      },
      {
        id: "capacitation",
        label: "Capacitation",
        duration: "Oviduct, hours",
        mechanism: "CatSper → Ca²⁺ influx → bicarbonate → sAC → cAMP → PKA → cholesterol removal → membrane fluidity↑ → tyrosine phosphorylation → sperm ready to fertilize. Capacitation is TIME-PROGRAMMED — too fast or too slow = failure.",
        evidence: "CatSper1 KO: BSA-induced Ca²⁺ rise ABSENT → capacitation FAILS ([[ref:pmc2775032_bsa|Xia & Bhatt 2009]]). Bicarbonate sensitizes CatSper; mechanism conserved mouse↔human ([[ref:pmc8505895_bicarb|Hwang et al. 2021]]). Ca²⁺ ionophore RESCUES CatSper KO ([[ref:scirep2016_ionophore|Sci.Rep. 2016]]).",
        pharmacological: "A23187 → RESCUES capacitation in CatSper KO, sAC KO, Slo3 KO (3/3 upstream signaling defects reversed by Ca²⁺ pulse). BUT: PMCA4 KO (Ca²⁺ efflux pump) → NOT rescuable → Ca²⁺ REMOVAL is as critical as Ca²⁺ ENTRY.",
        recovery: "Not applicable — capacitation is a one-way process per sperm cohort.",
      },
      {
        id: "rheotaxis",
        label: "Rheotaxis",
        duration: "Oviduct, long distance",
        mechanism: "Prolactin-triggered oviductal fluid secretion → flow. Sperm roll (CatSper-dependent) + wall interaction → spiral progression against flow. WITHOUT CatSper: no rolling → no orientation → lost.",
        evidence: "Rheotaxis is mammals' PRIMARY sperm guidance mechanism ([[ref:currbiol2013_rheo|Miki & Clapham 2013]]). Rolling motion requires CatSper for Ca²⁺ influx.",
        pharmacological: "NNC55-0396 (CatSper blocker) → motility↓ + acrosome reaction↓ ([[ref:pmc6104424_nnc|Rennhack et al. 2018]]).",
        recovery: "Not applicable — if CatSper function is disrupted pre-ejaculation, rheotactic guidance fails for that cohort.",
      },
      {
        id: "chemotaxis",
        label: "Thermotaxis & chemotaxis",
        duration: "Near the egg",
        mechanism: "Thermotaxis: CatSper temperature-sensitive (Q₁₀=5.1, threshold 33.5°C) → sperm navigate toward warmer ampulla. Chemotaxis: cumulus cells secrete PICOMOLAR progesterone → CatSper detects → Ca²⁺ influx → asymmetric flagellar beat → sperm turns toward higher concentration.",
        evidence: "CatSper is temperature-gated ([[ref:catsper-temp-2025|Nature Comms 2025]]). Progesterone IS the dominant chemoattractant; removal ELIMINATES chemotaxis entirely ([[ref:hru2026_sperm_oocyte|Hum.Reprod.Update 2026]]). CATSPER2⁻/⁻ men: progesterone-induced hyperactivation ABOLISHED → fertilization fails in vivo AND in vitro ([[ref:catsper_human|JCI 2024]]).",
        pharmacological: "NNC55-0396 → motility↓ + acrosome reaction↓. Zn²⁺ → Hv1 inhibition → pH↓ → CatSper↓. CatSper blockade = SAME effect as EMF disruption ([[ref:pmc6104424_nnc|Rennhack et al. 2018]]).",
        recovery: "Not applicable — final guidance steps are one-time events per sperm.",
      },
      {
        id: "acrosome",
        label: "Acrosome reaction",
        duration: "At zona pellucida",
        mechanism: "ZP3/ZP4 → sperm receptors → voltage-dependent Ca²⁺ influx (VOC + SOC) → acrosome opens → proteolytic enzymes released → ZP penetration possible. Too early = enzymes released wrong place. Too late = sperm cannot respond to ZP signal.",
        evidence: "Zona pellucida induces voltage-dependent Ca²⁺ influx and acrosome reaction ([[ref:bmc2006_zp|Patrat 2006]]). Ceramide-1-phosphate → Ca²⁺ via VOC/SOC → acrosome reaction; requires external Ca²⁺ ([[ref:pmc10102357_ceram|Rehfeld et al. 2023]]). NNC55-0396: CatSper blockade → progesterone-induced AR ABOLISHED ([[ref:pmc6104424_nnc|Rennhack et al. 2018]]).",
        pharmacological: "CatSper inhibition abolishes progesterone-triggered acrosome reaction. Both premature and absent AR prevent fertilization.",
        recovery: "Not applicable — acrosome reaction is irreversible per sperm.",
      },
      {
        id: "oocyte-activation",
        label: "Oocyte activation",
        duration: "At fertilization",
        mechanism: "Sperm PLCζ → IP3 → ER Ca²⁺ release → Ca²⁺ oscillations. The oscillation PATTERN (frequency, amplitude, duration) IS INFORMATION → correct pattern → meiosis II, pronucleus, first division. Wrong pattern → activation failure.",
        evidence: "Oocyte activation requires cytoplasmic calcium rise; without it, sperm head does NOT decondense ([[ref:bmc2006_zp|Patrat 2006]]). IVF/ICSI studies: chemical activation replaces PLCζ signal but produces different oscillation patterns → differences in embryo quality.",
        pharmacological: "Chemical activation (calcium ionophore) can substitute but does not replicate physiological Ca²⁺ oscillation patterns.",
        recovery: "Not applicable — fertilization is a one-time event. EMF-damaged sperm may deliver altered PLCζ → abnormal oscillations → early miscarriage↑.",
      },
    ] as VulnPoint[],

    s2Title: "CatSper: the master key",
    s2Lead: "CatSper is the sperm-specific calcium channel. No other ion channel can substitute — knockout = sterile.",
    s2Points: [
      "Sperm-specific: expressed ONLY in sperm flagellum, nowhere else in the body",
      "Triple modulation: voltage + pH + temperature — three EMF-sensitive parameters in ONE channel",
      "No redundancy: CatSper KO = complete male sterility, no backup channel exists ([[ref:physiology2022_20yr|Physiology 2022]])",
      "Human proof: CATSPER2⁻/⁻ men cannot hyperactivate, cannot fertilize ([[ref:catsper_human|JCI 2024]])",
      "Direct EMF evidence: 2100 MHz → Ca²⁺↓ + motility↓ in human sperm ([[ref:catsper_2021|ESHRE 2021]])",
    ],

    s3Title: "Premature activation: death before the journey",
    s3Lead: "BERM's most elegant mechanism: EMF does not destroy sperm — it CONFUSES them.",
    s3Desc: "In the epididymis, sperm are held in a dormant state (low pH keeps CatSper inactive). Phone-in-pocket EMF can prematurely activate CatSper, triggering hyperactivation before ejaculation. The sperm burns through its finite energy stores (ATP, glycogen) while still in storage. After ejaculation, it arrives in the female tract looking morphologically normal but unable to navigate — an exhausted swimmer that cannot reach the egg.",
    s3Quote: "Sperm that look normal but cannot navigate",
    s3Evidence: "ESHRE 2021 showed 2100 MHz reduces both motility AND intracellular Ca²⁺ — consistent with energy depletion from premature activation. The researchers noted: 'If this occurs when sperm are in the non-progressively motile phase in the epididymis, it may lead to depletion of finite energy stores.'",

    s4Title: "The egg's quality control: five gates in series",
    s4Lead: "The oocyte runs the most extreme selection process in biology: 200 million sperm → 1 fertilization = 99.99999% rejection. Five sequential calcium-dependent gates enforce this selection.",
    s4Gates: [
      { label: "Gate 1: Capacitation", process: "CatSper → cAMP → PKA", emfDisruption: "Incomplete capacitation → rejection" },
      { label: "Gate 2: Hyperactivation", process: "CatSper → asymmetric flagellar beat", emfDisruption: "Weak or PREMATURE hyperactivation → rejection" },
      { label: "Gate 3: Acrosome reaction", process: "VOC + SOC → enzyme release", emfDisruption: "Mistimed AR (too early or too late) → rejection" },
      { label: "Gate 4: Oocyte activation", process: "PLCζ → IP3 → Ca²⁺ oscillations", emfDisruption: "Abnormal oscillation pattern → activation failure" },
      { label: "Gate 5: Polyspermy block", process: "Cortical granules → ZP modification", emfDisruption: "Weak block → polyspermy → embryo death" },
    ] as Gate[],
    s4Formula: "P(fertilization) = P₁ × P₂ × P₃ × P₄ × P₅",
    s4Example: "If each gate drops 10%: 0.9⁵ = 0.59 → 41% reduction in fertilization probability",

    s5Title: "The pharmacological proof",
    s5Lead: "Six compounds confirm the CatSper–calcium mechanism by producing the SAME effects as EMF disruption through chemical channel blockade:",
    s5Drugs: [
      { name: "NNC55-0396", action: "CatSper blocker → motility↓, acrosome reaction abolished", ref: "[[ref:pmc6104424_nnc|Rennhack et al. 2018]]" },
      { name: "A23187 (Ca²⁺ ionophore)", action: "RESCUES CatSper KO capacitation → proves Ca²⁺ is sufficient", ref: "[[ref:scirep2016_ionophore|Sci.Rep. 2016]]" },
      { name: "Nifedipine", action: "L-type VGCC blocker → StAR↓ → T↓ → spermatogenesis↓", ref: "[[ref:ebiya2017_star|Ebiya 2017]]" },
      { name: "Amlodipine", action: "CCB → sperm concentration −23%, FSH↓, T↓ (reversible)", ref: "[[ref:almeida2000_ccb|Almeida 2000]]" },
      { name: "Zn²⁺", action: "Hv1 proton channel inhibitor → pH↓ → CatSper↓", ref: "[[ref:pmc6104424_nnc|Rennhack et al. 2018]]" },
      { name: "RU1968", action: "CatSper-specific inhibitor → current reduction", ref: "" },
    ],

    s6Title: "Why sperm are the canary",
    s6Lead: "Sperm respond FIRST and STRONGEST to EMF exposure because of six unique vulnerabilities:",
    s6Points: [
      { label: "Minimal antioxidant capacity", detail: "Sperm have very little cytoplasm — almost no room for protective enzymes" },
      { label: "Highest PUFA content", detail: "The most polyunsaturated fatty acid-rich membrane of any cell type — maximally ROS-vulnerable" },
      { label: "Longest exposure window", detail: "Spermatogenesis 74 days + epididymal maturation 21 days = ~3 months of continuous vulnerability" },
      { label: "No redundancy", detail: "CatSper is the ONLY calcium channel for navigation — no backup exists" },
      { label: "Extreme selection pressure", detail: "~200 million → 1 = 99.99999% rejection rate. Even a small performance drop eliminates millions more" },
      { label: "Premature activation mechanism", detail: "Unlike most cells, sperm can be activated at the WRONG TIME — subtle, hard to detect, devastating in effect" },
    ] as CanaryPoint[],
    s6Conclusion: "Levine's finding of −51.6% global sperm count decline is BERM's most visible consequence — the canary has been singing for decades.",

    predictionText: "Prediction REPRO-NAV-1: In vitro sperm exposed to phone-equivalent RF (2100 MHz, SAR ~2 W/kg) for the duration of epididymal transit (~14 days) will show premature CatSper activation, energy store depletion, and failed rheotaxis compared to sham-exposed controls — even when conventional semen parameters (count, morphology) remain within normal range.",
    predictionLink: "See predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Lisääntymiskykyyn liittyvä navigointi",
    subtitle: "Siittiöt ovat BERM:n tarkin biologinen argumentti. Yhdeksän kalsiumriippuvaista vaihetta tuotannosta hedelmöitykseen — jokainen EMF-haavoittuva, ilman varakanavaa.",
    backLink: "← Takaisin näyttöön",
    cautionText: "CatSper–EMF-yhteys on vahvistettu yksittäisille mekanismeille (kapasitaatio, kemotaksis). Ketju puhelin-taskussa → väestötason hedelmällisyyden lasku on BERMin synteesi (M-taso), ei vakiintunut konsensus. Eläinmallien tulokset eivät välttämättä siirry suoraan ihmisiin.",

    s1Title: "Yhdeksän EMF-herkkää pistettä",
    s1Lead: "Ihmisen siittiön matka tuotannosta hedelmöitykseen kestää ~95 päivää ja 10 cm. Jokainen kriittinen vaihe riippuu kalsiumsignaloinnista — ja jokainen on EMF-haavoittuva.",
    s1Points: [
      {
        id: "spermatogenesis",
        label: "Spermatogeneesi",
        duration: "Kivekset, 74 päivää",
        mechanism: "EMF → VGCC (Leydig-solut) → Ca²⁺↑ → StAR↓ → P450scc↓ → T↓. Hypotalaaminen taso: EMF → GnRH↓ → LH↓ → T↓.",
        evidence: "WHO-meta-analyysi: 29 eläintutkimusta, T↓ SMD 0,87 (95 % CI 0,43–1,30). Santi 2025 meta >1M: T↓ JA LH↓ samanaikaisesti = hypotalaaminen suppressio. Systemaattinen katsaus ([[ref:frontiers2024_testes|Frontiers 2024]]): matkapuhelinsäteily vaikuttaa Leydig-soluihin ja siittiöihin.",
        pharmacological: "Nifedipiini + etosuksimidi → StAR↓ merkitsevästi ([[ref:ebiya2017_star|Ebiya 2017]]). Amlodipiini 30 pv → konsentraatio −23 %, FSH↓, T↓ ([[ref:almeida2000_ccb|Almeida 2000]]).",
        recovery: "Osittainen (kuukausia). 60 % palautuminen 30 pv:n kuluessa. Täysi spermatogeneesin sykli 74 pv → ~3 kk täydelliseen palautumiseen.",
      },
      {
        id: "epididymal",
        label: "Lisäkiveskypsyminen ja ennenaikainen aktivaatio",
        duration: "Lisäkives, 12–21 päivää",
        mechanism: "Lisäkiveksessä siittiöt ovat IMMOBIILEJA (matala pH → CatSper INAKTIIVINEN). EMF → ennenaikainen CatSper-aktivaatio → Ca²⁺↑ → hyperaktivaatio ENNEN ejakulaatiota → rajallisten energiavarastojen ehtyminen → siittiöstä tulee immotiili naisen elimistössä.",
        evidence: "ESHRE 2021 ([[ref:catsper_2021|Ayas & Kocaman]]): 2100 MHz → motiliteetti (A+B) 47,62→34,19 (p<0,05) + solunsisäinen Ca²⁺ 2,46→1,85 (p<0,05). Nature Comms 2025 ([[ref:catsper-temp-2025|lämpötilaherkkä]]): CatSper on lämpötilaherkkä (Q₁₀=5,1, kynnys 33,5 °C).",
        pharmacological: "Ca²⁺-ionofoori A23187 → kapasitaatio ILMAN CatSper:a ([[ref:scirep2016_ionophore|Sci.Rep. 2016]]). MUTTA: Ca²⁺:n lasku ionoforin jälkeen VAADITAAN hyperaktivaatioon.",
        recovery: "Ionitaso: nopea (tunteja-päiviä). MUTTA: jos energiavarastot ehtyivät → EI palautumista tälle erälle. Seuraava erä (~2–3 viikkoa) palautuu JOS altistus lakkaa.",
      },
      {
        id: "dna-integrity",
        label: "DNA-eheys",
        duration: "Koko elinkaari",
        mechanism: "EMF → VGCC → Ca²⁺↑ → NADPH-oksidaasi → ROS↑ → lipidiperoksidaatio (PUFA-rikas membraani) → 8-OH-dG↑ → DNA-fragmentaatio (TUNEL+).",
        evidence: "De Iuliis 2009 ([[ref:iuliis2009|PLOS ONE]]): RF-EMR → mitokondriaalinen ROS↑ → motiliteetti↓, vitaaliteetti↓, DNA-fragmentaatio↑ (p<0,001). Meta-analyysi ([[ref:meta2021_mobile|ScienceDirect 2021]]): motiliteetti↓, DNA-fragmentaatio↑.",
        pharmacological: "NAC + C-vitamiini → osittainen suoja. Antioksidantit toimivat mutta EIVÄT estä Ca²⁺-sisäänvirtausta → EIVÄT suojaa navigointia.",
        recovery: "Yksittäisen siittiön DNA-vaurio: EI PALAUDU. Populaatiotasolla: uudet siittiöt 74 pv → palautuu. Kantasolujen epigeneettinen vaurio voi olla PYSYVÄ.",
      },
      {
        id: "btb",
        label: "Veri-kivesesteen heikkeneminen",
        duration: "Kivekset, jatkuva",
        mechanism: "EMF → VGCC → Ca²⁺ → ROS → tight junction -proteiinit↓ (okludiini, ZO-1, claudin — SAMAT proteiinit kuin veri-aivoestessä).",
        evidence: "Systemaattinen katsaus ([[ref:frontiers2024_testes|Frontiers 2024]]): EMR + lämpö → veri-kiveseste heikkenee. Samat tight junction -proteiinit kuin BBB:ssä.",
        pharmacological: "Kalsiumkanavien salpaajat suojaavat BBB:tä → ENNUSTE: suojaavat myös BTB:tä.",
        recovery: "Este voi uusiutua jos altistus lakkaa, mutta krooninen altistus voi johtaa pysyvään läpäisevyyteen.",
      },
      {
        id: "capacitation",
        label: "Kapasitaatio",
        duration: "Munajohdin, tunteja",
        mechanism: "CatSper → Ca²⁺ → bikarbonaatti → sAC → cAMP → PKA → kolesterolin poistuminen → membraanin fluiditeetti↑ → tyrosiinifosforylaatio.",
        evidence: "CatSper1 KO: BSA-indusoima Ca²⁺-nousu PUUTTUU → kapasitaatio EPÄONNISTUU ([[ref:pmc2775032_bsa|Xia & Bhatt 2009]]). Bikarbonaatti sensitisoi CatSper:n ([[ref:pmc8505895_bicarb|Hwang et al. 2021]]). Ionofoori PELASTAA CatSper KO:n ([[ref:scirep2016_ionophore|Sci.Rep. 2016]]).",
        pharmacological: "A23187 → PELASTAA kapasitaation CatSper KO:ssa, sAC KO:ssa, Slo3 KO:ssa. PMCA4 KO → EI pelastettavissa → Ca²⁺:n POISTUMINEN yhtä kriittistä.",
        recovery: "Ei sovellettavissa — kapasitaatio on peruuttamaton prosessi.",
      },
      {
        id: "rheotaxis",
        label: "Reotaksis",
        duration: "Munajohdin, pitkä matka",
        mechanism: "Munajohdinnesteen virtaus → siittiöt pyörivät (CatSper-riippuvainen) → spiraalimainen eteneminen virtaa vastaan. ILMAN CatSper:a: ei pyörimistä → eksyminen.",
        evidence: "Reotaksis on nisäkkäiden siittiöiden PÄÄASIALLINEN ohjausmekanismi ([[ref:currbiol2013_rheo|Miki & Clapham 2013]]). Pyörimisliike vaatii CatSper:a.",
        pharmacological: "NNC55-0396 → motiliteetti↓ + akrosomireaktio↓ ([[ref:pmc6104424_nnc|Rennhack et al. 2018]]).",
        recovery: "Ei sovellettavissa — jos CatSper häiriintyy ennen ejakulaatiota, reotaktinen ohjaus epäonnistuu.",
      },
      {
        id: "chemotaxis",
        label: "Termotaksis ja kemotaksis",
        duration: "Munan lähellä",
        mechanism: "Termotaksis: CatSper lämpötilaherkkä (Q₁₀=5,1). Kemotaksis: kumulussolut erittävät progesteronia → CatSper havaitsee → epäsymmetrinen flagellumlyönti → kääntyy kohti korkeampaa pitoisuutta.",
        evidence: "CatSper on lämpötilaherkkä ([[ref:catsper-temp-2025|Nature Comms 2025]]). Progesterooni ON dominoiva kemoattraktantti ([[ref:hru2026_sperm_oocyte|Hum.Reprod.Update 2026]]). CATSPER2⁻/⁻: progesterooni-indusoima hyperaktivaatio KUMOTTU ([[ref:catsper_human|JCI 2024]]).",
        pharmacological: "NNC55-0396 → motiliteetti↓ + AR↓. Zn²⁺ → Hv1-inhibitio → pH↓ → CatSper↓ ([[ref:pmc6104424_nnc|Rennhack et al. 2018]]).",
        recovery: "Ei sovellettavissa — viimeiset ohjausvaiheet ovat kertaluonteisia.",
      },
      {
        id: "acrosome",
        label: "Akrosomireaktio",
        duration: "Zona pellucidalla",
        mechanism: "ZP3/ZP4 → jänniteriippuvainen Ca²⁺-sisäänvirtaus (VOC + SOC) → akrosomi avautuu → entsyymit vapautuvat → ZP:n läpäisy mahdollinen. Liian aikainen TAI liian myöhäinen = epäonnistuminen.",
        evidence: "ZP aiheuttaa jänniteriippuvaisen Ca²⁺-sisäänvirtauksen ja akrosoemireaktion ([[ref:bmc2006_zp|Patrat 2006]]). Keramidi-1-fosfaatti → Ca²⁺ VOC/SOC:n kautta ([[ref:pmc10102357_ceram|Rehfeld et al. 2023]]). NNC55-0396 → progesterooni-indusoima AR KUMOTTU ([[ref:pmc6104424_nnc|Rennhack et al. 2018]]).",
        pharmacological: "CatSper-esto kumoaa progesterooni-laukaistun akrosoemireaktion.",
        recovery: "Ei sovellettavissa — akrosomireaktio on peruuttamaton.",
      },
      {
        id: "oocyte-activation",
        label: "Munasolun aktivaatio",
        duration: "Hedelmöityksessä",
        mechanism: "Siittiön PLCζ → IP3 → ER Ca²⁺ -vapautuminen → Ca²⁺-vaihtelut. Oskillaatiokuvio (taajuus, amplitudi, kesto) ON INFORMAATIOTA → oikea kuvio → meioosi II; väärä kuvio → epäonnistuminen.",
        evidence: "Munasolun aktivaatio vaatii Ca²⁺-nousua sytoplasmassa ([[ref:bmc2006_zp|Patrat 2006]]). IVF/ICSI: kemiallinen aktivaatio korvaa PLCζ-signaalin mutta tuottaa eri oskillaatiokuvion.",
        pharmacological: "Kemiallinen aktivaatio (kalsiumionofoori) voi korvata mutta ei toista fysiologista Ca²⁺-oskillaatiokuviota.",
        recovery: "Ei sovellettavissa — hedelmöitys on kertaluonteinen. EMF-vaurioitunut siittiö voi toimittaa muuntuneen PLCζ:n → poikkeava oskillaatio → varhainen keskenmeno↑.",
      },
    ] as VulnPoint[],

    s2Title: "CatSper: avainkanava",
    s2Lead: "CatSper on siittiötarkka kalsiumkanava. Mikään muu ionikanava ei voi korvata sitä — knockout = steriili.",
    s2Points: [
      "Siittiötarkka: ilmentyy VAIN siittiön flagellumissa, ei missään muualla kehossa",
      "Kolmoismodulaatio: jännite + pH + lämpötila — kolme EMF-herkkää parametria YHDESSÄ kanavassa",
      "Ei redundanssia: CatSper KO = täydellinen miehen steriiliys, varakanavaa ei ole ([[ref:physiology2022_20yr|Physiology 2022]])",
      "Ihmistodiste: CATSPER2⁻/⁻ miehet eivät voi hyperaktivoitua eivätkä hedelmöittää ([[ref:catsper_human|JCI 2024]])",
      "Suora EMF-todiste: 2100 MHz → Ca²⁺↓ + motiliteetti↓ ihmissiittiöissä ([[ref:catsper_2021|ESHRE 2021]])",
    ],

    s3Title: "Ennenaikainen aktivaatio: kuolema ennen matkaa",
    s3Lead: "BERMin elegantein mekanismi: EMF ei tuhoa siittiöitä — se HÄMMENTÄÄ ne.",
    s3Desc: "Lisäkiveksessä siittiöt ovat lepotilassa (matala pH pitää CatSper:n inaktiivisena). Puhelin taskussa -EMF voi ennenaikaisesti aktivoida CatSper:n, laukaisten hyperaktivaation ennen ejakulaatiota. Siittiö kuluttaa rajalliset energiavarastonsa vielä varastoinnissa. Ejakulaation jälkeen se saapuu naisen elimistöön morfologisesti normaalina mutta kykenemättömänä navigoimaan.",
    s3Quote: "Siittiöt jotka näyttävät normaaleilta mutta eivät kykene navigoimaan",
    s3Evidence: "ESHRE 2021 osoitti, että 2100 MHz vähentää sekä motiliteettia ETTÄ solunsisäistä Ca²⁺:ta — yhteensopivaa energian ehtymisen kanssa ennenaikaisesta aktivaatiosta.",

    s4Title: "Munasolun laadunvalvonta: viisi porttia sarjassa",
    s4Lead: "Munasolu ajaa biologian äärimmäisintä valintaprosessia: 200 miljoonaa siittiötä → 1 hedelmöitys = 99,99999 % hylkäys. Viisi peräkkäistä kalsiumriippuvaista porttia toteuttavat valinnan.",
    s4Gates: [
      { label: "Portti 1: Kapasitaatio", process: "CatSper → cAMP → PKA", emfDisruption: "Epätäydellinen kapasitaatio → hylkäys" },
      { label: "Portti 2: Hyperaktivaatio", process: "CatSper → epäsymmetrinen flagellumlyönti", emfDisruption: "Heikko tai ENNENAIKAINEN hyperaktivaatio → hylkäys" },
      { label: "Portti 3: Akrosomireaktio", process: "VOC + SOC → entsyymien vapautuminen", emfDisruption: "Väärä ajoitus (liian aikainen/myöhäinen) → hylkäys" },
      { label: "Portti 4: Munasolun aktivaatio", process: "PLCζ → IP3 → Ca²⁺-vaihtelut", emfDisruption: "Poikkeava oskillaatiokuvio → aktivaation epäonnistuminen" },
      { label: "Portti 5: Polyspermiablokki", process: "Kortikaaligranulat → ZP-modifikaatio", emfDisruption: "Heikko blokki → polyspermia → alkion kuolema" },
    ] as Gate[],
    s4Formula: "P(hedelmöitys) = P₁ × P₂ × P₃ × P₄ × P₅",
    s4Example: "Jos jokainen portti laskee 10 %: 0,9⁵ = 0,59 → 41 % lasku hedelmöitystodennäköisyydessä",

    s5Title: "Farmakologinen todiste",
    s5Lead: "Kuusi yhdistettä vahvistaa CatSper–kalsium-mekanismin tuottamalla SAMAT vaikutukset kuin EMF-häiriö kemiallisella kanavan estolla:",
    s5Drugs: [
      { name: "NNC55-0396", action: "CatSper-salpaaja → motiliteetti↓, akrosomireaktio kumottu", ref: "[[ref:pmc6104424_nnc|Rennhack et al. 2018]]" },
      { name: "A23187 (Ca²⁺-ionofoori)", action: "PELASTAA CatSper KO:n kapasitaation → todistaa Ca²⁺:n riittävyyden", ref: "[[ref:scirep2016_ionophore|Sci.Rep. 2016]]" },
      { name: "Nifedipiini", action: "L-tyypin VGCC-salpaaja → StAR↓ → T↓ → spermatogeneesi↓", ref: "[[ref:ebiya2017_star|Ebiya 2017]]" },
      { name: "Amlodipiini", action: "CCB → siittiökonsentraatio −23 %, FSH↓, T↓ (palautuva)", ref: "[[ref:almeida2000_ccb|Almeida 2000]]" },
      { name: "Zn²⁺", action: "Hv1-protonikanavan inhibiittori → pH↓ → CatSper↓", ref: "[[ref:pmc6104424_nnc|Rennhack et al. 2018]]" },
      { name: "RU1968", action: "CatSper-tarkka inhibiittori → virran vähennys", ref: "" },
    ],

    s6Title: "Miksi siittiö on kaivoskanarilintu",
    s6Lead: "Siittiöt reagoivat ENSIMMÄISINÄ ja VOIMAKKAIMMIN EMF-altistukseen kuuden ainutlaatuisen haavoittuvuuden vuoksi:",
    s6Points: [
      { label: "Minimaalinen antioksidanttikapasiteetti", detail: "Siittiöissä on hyvin vähän sytoplasmaa — tuskin tilaa suojaentsyymeille" },
      { label: "Korkein PUFA-pitoisuus", detail: "Moniväkevöitynein rasvahappomembraani kaikista solutyypeistä — maksimaalisesti ROS-haavoittuva" },
      { label: "Pisin altistusikkuna", detail: "Spermatogeneesi 74 pv + lisäkiveskypsyminen 21 pv = ~3 kk jatkuvaa haavoittuvuutta" },
      { label: "Ei redundanssia", detail: "CatSper on AINOA kalsiumkanava navigointiin — varakanavaa ei ole" },
      { label: "Äärimmäinen valintapaine", detail: "~200 miljoonaa → 1 = 99,99999 % hylkäysaste. Pienikin suorituskyvyn lasku poistaa miljoonia lisää" },
      { label: "Ennenaikainen aktivaatio -mekanismi", detail: "Toisin kuin useimmat solut, siittiöt voidaan aktivoida VÄÄRÄÄN AIKAAN — hienovarainen, vaikeasti havaittava, vaikutukseltaan tuhoisa" },
    ] as CanaryPoint[],
    s6Conclusion: "Levinen −51,6 % globaali siittiömäärän lasku on BERM:n NÄKYVIN seuraus — kaivoskanarilintu on laulanut vuosikymmeniä.",

    predictionText: "Ennuste REPRO-NAV-1: In vitro -siittiöt, joita altistetaan puhelinvastaavalle RF:lle (2100 MHz, SAR ~2 W/kg) lisäkivestransitointia vastaavan ajan (~14 päivää), osoittavat ennenaikaisen CatSper-aktivaation, energiavarastojen ehtymisen ja epäonnistuneen reotaksiksen verrattuna kontrolleihin — vaikka tavanomaiset siemennesteanalyysit (lukumäärä, morfologia) pysyvät normaalirajoissa.",
    predictionLink: "Katso ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "生殖ナビゲーション",
    subtitle: "精子はBERMの最も特異的な生物学的論拠。産生から受精まで9つのカルシウム依存段階 — すべてEMF脆弱で、バックアップチャネルなし。",
    backLink: "← エビデンスに戻る",
    cautionText: "CatSper–EMF接続は個別メカニズム（受精能獲得、走化性）で確立済み。携帯電話ポケット→人口生殖力低下の連鎖はBERMの統合（Mレベル）であり、確立コンセンサスではありません。",
    s1Title: "9つのEMF脆弱ポイント", s1Lead: "ヒト精子の産生から受精までの旅は約95日間、10cm。すべての重要な段階がカルシウムシグナリングに依存し、すべてEMF脆弱です。",
    s1Points: [] as VulnPoint[],
    s2Title: "CatSper：マスターキー", s2Lead: "CatSperは精子特異的カルシウムチャネル。代替不可 — ノックアウト＝不妊。", s2Points: [] as string[],
    s3Title: "早期活性化：旅の前の死", s3Lead: "BERMの最もエレガントなメカニズム：EMFは精子を破壊しない — 混乱させる。",
    s3Desc: "", s3Quote: "", s3Evidence: "",
    s4Title: "卵子の品質管理：直列5ゲート", s4Lead: "卵子は生物学で最も厳格な選別を実行：2億精子→1受精＝99.99999%拒否。",
    s4Gates: [] as Gate[], s4Formula: "", s4Example: "",
    s5Title: "薬理学的証明", s5Lead: "6つの化合物がCatSper–カルシウム機構を確認。", s5Drugs: [] as { name: string; action: string; ref: string }[],
    s6Title: "なぜ精子がカナリアなのか", s6Lead: "精子は6つのユニークな脆弱性のためEMF曝露に最初に最も強く反応。",
    s6Points: [] as CanaryPoint[], s6Conclusion: "",
    predictionText: "", predictionLink: "予測を見る →", predictionHref: "/predictions",
  },
  fr: {
    title: "Navigation reproductive",
    subtitle: "Les spermatozoïdes sont l'argument biologique le plus spécifique de BERM. Neuf étapes calcium-dépendantes de la production à la fécondation — toutes vulnérables aux EMF, sans canal de secours.",
    backLink: "← Retour aux Preuves",
    cautionText: "La connexion CatSper–EMF est établie pour les mécanismes individuels. La chaîne téléphone-en-poche → déclin de la fertilité est la synthèse de BERM (niveau M), pas un consensus établi.",
    s1Title: "Neuf points vulnérables aux EMF", s1Lead: "Le voyage d'un spermatozoïde humain de la production à la fécondation s'étend sur ~95 jours et 10 cm. Chaque étape critique dépend de la signalisation calcique.",
    s1Points: [] as VulnPoint[],
    s2Title: "CatSper : la clé maîtresse", s2Lead: "CatSper est le canal calcique spécifique aux spermatozoïdes. Aucun autre canal ne peut le remplacer — knockout = stérile.", s2Points: [] as string[],
    s3Title: "Activation prématurée : mort avant le voyage", s3Lead: "Le mécanisme le plus élégant de BERM : l'EMF ne détruit pas les spermatozoïdes — il les CONFOND.",
    s3Desc: "", s3Quote: "", s3Evidence: "",
    s4Title: "Le contrôle qualité de l'ovocyte : cinq portes en série", s4Lead: "L'ovocyte exécute le processus de sélection le plus extrême en biologie : 200 millions → 1 = 99,99999 % de rejet.",
    s4Gates: [] as Gate[], s4Formula: "", s4Example: "",
    s5Title: "La preuve pharmacologique", s5Lead: "Six composés confirment le mécanisme CatSper–calcium.", s5Drugs: [] as { name: string; action: string; ref: string }[],
    s6Title: "Pourquoi les spermatozoïdes sont le canari", s6Lead: "Les spermatozoïdes répondent EN PREMIER et LE PLUS FORTEMENT à l'exposition EMF.",
    s6Points: [] as CanaryPoint[], s6Conclusion: "",
    predictionText: "", predictionLink: "Voir les prédictions →", predictionHref: "/predictions",
  },
  ko: {
    title: "생식 내비게이션",
    subtitle: "정자는 BERM의 가장 구체적인 생물학적 논거. 생산에서 수정까지 9개의 칼슘 의존 단계 — 모두 EMF 취약, 백업 채널 없음.",
    backLink: "← 증거로 돌아가기",
    cautionText: "CatSper–EMF 연결은 개별 메커니즘에서 확립됨. 주머니 속 전화→인구 출산력 감소의 연쇄는 BERM의 종합(M 수준)이며 확립된 합의가 아닙니다.",
    s1Title: "9개의 EMF 취약 지점", s1Lead: "인간 정자의 생산에서 수정까지의 여정은 약 95일, 10cm. 모든 핵심 단계가 칼슘 신호에 의존하며 모두 EMF에 취약합니다.",
    s1Points: [] as VulnPoint[],
    s2Title: "CatSper: 마스터 키", s2Lead: "CatSper는 정자 특이적 칼슘 채널. 대체 불가 — 녹아웃 = 불임.", s2Points: [] as string[],
    s3Title: "조기 활성화: 여정 전의 죽음", s3Lead: "BERM의 가장 우아한 메커니즘: EMF는 정자를 파괴하지 않고 혼란시킵니다.",
    s3Desc: "", s3Quote: "", s3Evidence: "",
    s4Title: "난자의 품질 관리: 직렬 5개 게이트", s4Lead: "난자는 생물학에서 가장 극단적인 선별 과정을 실행: 2억 → 1 = 99.99999% 거부.",
    s4Gates: [] as Gate[], s4Formula: "", s4Example: "",
    s5Title: "약리학적 증명", s5Lead: "6가지 화합물이 CatSper–칼슘 메커니즘을 확인.", s5Drugs: [] as { name: string; action: string; ref: string }[],
    s6Title: "왜 정자가 카나리아인가", s6Lead: "정자는 6가지 고유한 취약성으로 인해 EMF 노출에 가장 먼저 가장 강하게 반응.",
    s6Points: [] as CanaryPoint[], s6Conclusion: "",
    predictionText: "", predictionLink: "예측 보기 →", predictionHref: "/predictions",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function ReproductiveNavigationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  const cite = (text: string) => (
    <InlineReferenceText text={text} locale={locale} />
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <a href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</a>
      </p>

      <PageHeader icon={Navigation} title={d.title} subtitle={d.subtitle} />

      <div className="mt-8">
        <CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox>
      </div>

      {/* Section 1: Nine vulnerable steps */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s1Title}</h2>
        <p className="text-foreground-muted mb-8"><ClaimRef claimId="claim.sperm.multi-parameter-decline">{d.s1Lead}</ClaimRef></p>

        <SpermJourneyVisualization />

        {d.s1Points.length > 0 && (
          <div className="space-y-6">
            {d.s1Points.map((pt, i) => (
              <details key={pt.id} id={`vuln-${pt.id}`} className="group rounded-xl border border-border/60 overflow-hidden">
                <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-background-secondary/50 transition-colors">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent text-sm font-bold shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold">{pt.label}</span>
                    <span className="ml-2 text-xs text-foreground-muted">{pt.duration}</span>
                  </div>
                  <svg className="w-4 h-4 text-foreground-muted transition-transform group-open:rotate-180 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-5 pb-5 space-y-4 border-t border-border/40">
                  <div className="pt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted/60 mb-1">Mechanism</h4>
                    <p className="text-sm text-foreground-muted">{pt.mechanism}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted/60 mb-1">Evidence</h4>
                    <p className="text-sm text-foreground-muted">{cite(pt.evidence)}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted/60 mb-1">Pharmacological confirmation</h4>
                    <p className="text-sm text-foreground-muted">{cite(pt.pharmacological)}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted/60 mb-1">Recovery</h4>
                    <p className="text-sm text-foreground-muted">{pt.recovery}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}
      </section>

      {/* Section 2: CatSper */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s2Title}</h2>
        <p className="text-foreground-muted mb-6">{d.s2Lead}</p>
        {d.s2Points.length > 0 && (
          <div className="space-y-3">
            {d.s2Points.map((pt) => (
              <div key={pt} className="flex gap-3 rounded-lg border border-border/50 p-4">
                <span className="text-accent mt-0.5 shrink-0">●</span>
                <p className="text-sm text-foreground-muted">{cite(pt)}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Premature activation */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s3Title}</h2>
        <p className="text-lg font-medium text-accent mb-4">{d.s3Lead}</p>
        {d.s3Desc && <p className="text-foreground-muted mb-4">{d.s3Desc}</p>}
        {d.s3Quote && (
          <div className="my-6 border-l-4 border-accent/40 pl-4 py-2">
            <p className="text-lg italic font-medium">{d.s3Quote}</p>
          </div>
        )}
        {d.s3Evidence && <p className="text-sm text-foreground-muted">{d.s3Evidence}</p>}
      </section>

      {/* Section 4: Five gates */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s4Title}</h2>
        <p className="text-foreground-muted mb-6">{d.s4Lead}</p>
        {d.s4Gates.length > 0 && (
          <div className="space-y-3">
            {d.s4Gates.map((g, i) => (
              <div key={g.label} className="rounded-lg border border-border/50 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${i < 3 ? "bg-emerald-500/10 text-emerald-600" : i < 4 ? "bg-amber-500/10 text-amber-600" : "bg-red-500/10 text-red-600"}`}>{i + 1}</span>
                  <h3 className="font-medium">{g.label}</h3>
                </div>
                <div className="ml-10 grid sm:grid-cols-2 gap-2 text-sm">
                  <div><span className="text-foreground-muted/60 text-xs uppercase">Process: </span><span className="text-foreground-muted font-mono text-xs">{g.process}</span></div>
                  <div><span className="text-foreground-muted/60 text-xs uppercase">EMF disruption: </span><span className="text-foreground-muted">{g.emfDisruption}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
        {d.s4Formula && (
          <div className="mt-6 px-4 py-3 bg-background-secondary rounded-lg overflow-x-auto text-center">
            <code className="text-sm font-mono-num">{d.s4Formula}</code>
          </div>
        )}
        {d.s4Example && (
          <div className="mt-4 rounded-lg bg-accent/5 border border-accent/20 p-4 text-center">
            <p className="text-sm font-medium">{d.s4Example}</p>
          </div>
        )}
      </section>

      {/* Section 5: Pharmacological proof */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s5Title}</h2>
        <p className="text-foreground-muted mb-6">{d.s5Lead}</p>
        {d.s5Drugs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left py-2 px-3 font-semibold">Compound</th>
                  <th className="text-left py-2 px-3 font-semibold">Action</th>
                  <th className="text-left py-2 px-3 font-semibold">Source</th>
                </tr>
              </thead>
              <tbody>
                {d.s5Drugs.map((drug) => (
                  <tr key={drug.name} className="border-b border-border/30">
                    <td className="py-2 px-3 font-mono text-xs font-medium whitespace-nowrap">{drug.name}</td>
                    <td className="py-2 px-3 text-foreground-muted">{drug.action}</td>
                    <td className="py-2 px-3">{drug.ref ? cite(drug.ref) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Section 6: Why sperm are the canary */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s6Title}</h2>
        <p className="text-foreground-muted mb-6">{d.s6Lead}</p>
        {d.s6Points.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-3">
            {d.s6Points.map((pt) => (
              <div key={pt.label} className="rounded-lg border border-border/50 p-4">
                <h3 className="font-medium text-sm mb-1">{pt.label}</h3>
                <p className="text-xs text-foreground-muted">{pt.detail}</p>
              </div>
            ))}
          </div>
        )}
        {d.s6Conclusion && (
          <div className="mt-6 rounded-lg bg-accent/5 border border-accent/20 p-4">
            <p className="text-sm font-medium text-center">{d.s6Conclusion}</p>
          </div>
        )}
      </section>

      {/* Prediction */}
      {d.predictionText && (
        <div className="mt-10">
          <DerivedPrediction locale={locale}>
            <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
            <a href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</a>
          </DerivedPrediction>
        </div>
      )}
    </div>
  );
}
