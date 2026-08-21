import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import BermCausalDiagram from "@/components/BermCausalDiagram";
import { ModelTableOfContents } from "@/components/ModelTableOfContents";
import { MathematicsSections } from "@/app/[locale]/mathematics/page";
import { ModulomeLayers } from "@/components/ModulomeLayers";

const t = {
  en: {
    title: "Model Documentation",
    subtitle:
      "Full documentation of the Bio-Electromagnetic Reproductive Model (BERM), including the three-level architecture, causal pathways, coupling equations, and recovery dynamics.",
    metaTitle: "Model Documentation - Extinction Field",
    metaDesc:
      "BERM model documentation: three-level architecture, causal pathways, equations, and recovery dynamics.",

    archTitle: "Three-level architecture",
    archDesc:
      "BERM separates fertility decline into three distinct causal layers. Each level has its own dynamics, timescale, and evidence basis. The total fertility rate (TFR) for a country is the product of all three levels, not the sum -- each acts as a multiplier on the others.",
    level1Label: "Level 1",
    level1Title: "Biological capacity",
    level1Desc:
      "The physiological maximum fertility given current environmental exposures. Includes sperm quality (concentration, motility, DNA fragmentation), oocyte quality, hormonal milieu, and BBB integrity. This is the level most directly affected by EMF exposure.",
    level2Label: "Level 2",
    level2Title: "EMF-behavioral coupling",
    level2Desc:
      "How personal device use interacts with ambient EMF exposure. A person in a high-ambient environment who also carries a phone experiences a non-linear coupling effect. This level captures the interaction between infrastructure-level and personal-level exposure.",
    level3Label: "Level 3",
    level3Title: "True culture",
    level3Desc:
      "Voluntary fertility choices independent of biological capacity. Education, urbanization, contraceptive access, economic opportunity, and cultural norms. This component exists in all demographic models; BERM adds the biological and EMF layers underneath it.",

    causalTitle: "Causal pathway diagram",
    causalDesc:
      "The diagram below shows the complete mechanistic chain from Lindgren geometry to TFR decline. Nine levels, 35 nodes, 50 edges. Two co-primary pathways operate in parallel: Pathway A (VGCC → Ca²⁺ → ROS) has the strongest experimental support (23–28 blocker studies), while Pathway B (RPM → CRY → circadian disruption) is the most complete theoretical bridge from Lindgren geometry to biology (87.5% of the RPM Hamiltonian is derivable from the metric ansatz). Both are independently supported at E-level evidence. Click any node to see its mechanism, Lindgren interpretation, quantitative formulation, recovery parameters, and key references. Node borders are colored by epistemic level.",

    chiTitle: "Lindgren chi coupling equation",
    chiDesc:
      "The coupling between ambient EMF infrastructure and personal device exposure is not linear. The chi function describes a saturation curve: at low ambient levels, personal exposure adds little on top; at high ambient levels, personal exposure is already dominated by the environmental field.",
    chiExplain:
      "is the normalized ambient exposure (0 = no infrastructure, 1 = saturation). The function approaches 1 asymptotically, meaning the marginal effect of personal devices diminishes as ambient exposure grows.",
    chiWherePrefix: "Where",

    twoChTitle: "Three-channel exposure model",
    twoChDesc:
      "Total effective EMF exposure decomposes into three frequency channels — ELF (f < 1 kHz, membrane modulation), IF (1 kHz – 1 MHz, intracellular/mitotic), and RF (> 1 MHz, spin chemistry) — each weighted by its biological mechanism and modulated by the chi coupling.",
    twoChExplain:
      "cumEMF = w_ELF · cumELF + w_IF · cumIF + w_RF · cumRF. In a country with near-zero cellular infrastructure, even heavy personal phone use contributes little total exposure (chi is near zero). Conversely, in a fully saturated environment, the personal component is added almost linearly across all three channels.",
    twoChLayersTitle: "12 technology layers composing the ambient field",
    twoChLayersDesc:
      "The ambient term is not monolithic. It decomposes into 12 independent technology layers, each with its own driver, deployment timeline, and frequency profile. This decomposition improves the model's discriminative power because each layer acts as an orthogonal instrument.",
    ifChannelTitle: "IF channel: LED lighting as primary source",
    ifChannelDesc:
      "The IF channel (1 kHz – 1 MHz) targets dividing cells through the same frequency–cell size relationship as FDA-approved TTFields cancer therapy. The primary environmental source of IF fields is LED lighting: every LED bulb contains a switch-mode power supply operating at 20–200 kHz with harmonics extending to megahertz. A typical home contains 15–30 such sources; a typical office contains 200–500. Additional IF sources include HVAC variable frequency drives (5–50 kHz), induction cooktops (20–75 kHz), and all switch-mode power supplies (laptop chargers, phone chargers). The mechanism operates via Ion Forced Oscillation (IFO-VGIC), with a biological threshold of 10⁻⁵ V/m (Panagopoulos 2025) — orders of magnitude below measured LED driver emissions.",

    recovTitle: "Five-layer recovery model",
    recovDesc:
      "If EMF exposure were reduced, different biological systems would recover at different rates. The α parameter for each layer represents the fraction of damage that is reversible (1.0 = fully reversible, 0.0 = permanent).",
    recovColLayer: "Layer",
    recovColAlpha: "α",
    recovColTimescale: "Recovery timescale",
    recovColNotes: "Notes",
    recovVgicLayer: "VGIC gating",
    recovVgicTime: "Hours",
    recovVgicNote:
      "Ion channel conformational changes reverse immediately upon cessation of field",
    recovRosLayer: "ROS clearance",
    recovRosTime: "Days to weeks",
    recovRosNote:
      "Antioxidant systems restore balance, but chronic oxidative stress may cause lasting mitochondrial damage",
    recovDnaLayer: "DNA repair (SDF)",
    recovDnaTime: "Months (spermatogenesis cycle)",
    recovDnaNote:
      "New sperm are generated every 74 days, but stem cell damage may persist across cycles",
    recovLeydigLayer: "Leydig cell function",
    recovLeydigTime: "Months to years",
    recovLeydigNote:
      "Testosterone-producing cells may partially recover, but chronic atrophy reduces regenerative capacity",
    recovBbbLayer: "Neuronal (BBB)",
    recovBbbTime: "Irreversible",
    recovBbbNote:
      "Neuronal damage from chronic BBB leakage is assumed permanent in the model",

    compTitle: "Compensation mechanism",
    compDesc:
      "Observed TFR is not simply the product of the three levels. Societies partially compensate for biological decline through assisted reproduction, behavioral changes, and policy interventions. The effective TFR includes a compensation exponent α = 0.43 that captures this partial offset.",
    compWhereLabel: "Where:",
    compBioCap: "biological capacity (Level 1), normalized 0-1",
    compBehav: "EMF-behavioral coupling factor (Level 2)",
    compAlpha:
      "compensation exponent, calibrated against 2000-2024 historical data",
    compRate2024: "the observed TFR in 2024 (calibration anchor)",
    compCultRatio:
      "ratio of projected cultural fertility preference to 2024 baseline",
    compBioBehav2024:
      "the biological-behavioral product at calibration time",
    compExplain:
      "When α = 0, there is no compensation and biological decline passes through directly to TFR. When α = 1, compensation is complete and biological decline has no effect on observed TFR. The calibrated value of 0.43 implies partial but incomplete compensation -- biological decline still manifests in TFR, but at roughly half the rate it would without societal adaptation.",

    mtorTitle: "mTOR convergence hypothesis",
    mtorDesc1:
      "mTOR is the downstream integrator where EMF-induced Ca²⁺ influx converges with aging, fertility, and cancer pathways. The Sempou pathway: EMF → VGIC → Ca²⁺↑ → mTOR hyperactivation → autophagy↓, senescent cell accumulation, mitochondrial quality control↓, chronic inflammation↑.",
    mtorDesc2:
      "Metformin activates AMPK, which suppresses mTOR -- the exact opposite of the EMF-induced pathway. The hypothesis: metformin's longevity benefit is not anti-aging per se but anti-EMF-accelerated-aging. In a natural EMF environment (Amish), the benefit should be minimal.",
    mtorEqExplain:
      "Where EMF is normalized exposure (0 = no infrastructure, 1 = modern city), and reduction factors include metformin (0.30), rapamycin (0.85), caloric restriction (0.20), intermittent fasting (0.10).",
    mtorThreeTitle: "Three epidemics, one mechanism",
    mtorAging: "Aging",
    mtorAgingDesc:
      "mTOR↑ → autophagy↓, senescence↑, inflammation↑, mitochondria↓ → accelerated aging",
    mtorFertility: "Fertility",
    mtorFertilityDesc:
      "mTOR↑ → spermatogonial differentiation↓, follicular burnout↑, AMH↓ → TFR↓",
    mtorCancer: "Cancer",
    mtorCancerDesc:
      "mTOR↑ → proliferation↑, tumor growth↑, metastasis↑ → cancer risk↑",
    mtorPredTitle: "Testable predictions",
    mtorPredColId: "ID",
    mtorPredColPred: "Prediction",
    mtorPredColTest: "Test",
    mtorPreds: [
      {
        id: "E1",
        pred: "Metformin longevity benefit is larger in high-EMF environments",
        test: "UK CPRD stratified by urban/rural",
      },
      {
        id: "E2",
        pred: "Amish metformin users show smaller longevity bonus than general population",
        test: "Amish diabetic cohort comparison",
      },
      {
        id: "E3",
        pred: "Blue Zone longevity advantage disappears as 4G/5G arrives",
        test: "Okinawa, Sardinia, Ikaria cohort tracking",
      },
      {
        id: "E4",
        pred: "CR experiment effect sizes increase by decade (rising lab EMF)",
        test: "Meta-analysis: effect size vs publication year",
      },
      {
        id: "E5",
        pred: "TAME trial benefit stratifies by EMF exposure",
        test: "Urban vs rural subgroup analysis",
      },
      {
        id: "E6",
        pred: "Shabbat (25h/week EMF-free) acts as intermittent mTOR fasting, supporting Haredi TFR and longevity",
        test: "Haredi vs secular Israeli cohort",
      },
    ],

    modulomeTitle: "EMF Modulome",
    modulomeDesc: "The eight-layer modulome synthesizes five independent research traditions — Becker's DC control system, Adee's electrome, Levin's bioelectric code, Lindgren's geometric framework, and the chromophore generalization (CCO/CRY) — into a unified model of EMF biological susceptibility. Each layer is independently supported by regulatory-approved therapeutic devices that exploit the same mechanism.",

    btnEvidence: "Browse evidence",
    btnPredictions: "View predictions",
    mathTitle: "Mathematical Foundation",
    mathSubtitle:
      'Complete derivation from Lindgren geometry to TFR prediction. Every equation is derivable from the previous one. Click "Full derivation" to see intermediate steps.',

    epistemic:
      "Epistemic note: The equations above are the current model specification (v17.0). Parameter values are calibrated against observed data and will be updated as new evidence becomes available. The model is explicitly designed to be falsifiable -- if its predictions fail, the model is wrong. The Therapeutic Device Paradox (24+ regulatory-approved non-thermal EMF device categories, DC to UV) establishes non-thermal bioactivity as regulatory fact, not hypothesis.",
  },
  fi: {
    title: "Mallin dokumentaatio",
    subtitle:
      "Bio-sähkömagneettisen lisääntymismallin (BERM) täydellinen dokumentaatio: kolmitasoinen arkkitehtuuri, kausaalireitit, kytkentäyhtälöt ja palautumisdynamiikka.",
    metaTitle: "Mallin dokumentaatio - Extinction Field",
    metaDesc:
      "BERM-mallin dokumentaatio: kolmitasoinen arkkitehtuuri, kausaalireitit, yhtälöt ja palautumisdynamiikka.",

    archTitle: "Kolmitasoinen arkkitehtuuri",
    archDesc:
      "BERM erottelee syntyvyyden laskun kolmeen erilliseen kausaalitasoon. Jokaisella tasolla on oma dynamiikkansa, aikaskaalansa ja näyttöpohjansa. Maan kokonaishedelmällisyysluku (TFR) on kaikkien kolmen tason tulo, ei summa -- kukin toimii kertoimena muille.",
    level1Label: "Taso 1",
    level1Title: "Biologinen kapasiteetti",
    level1Desc:
      "Fysiologinen maksimaalinen hedelmällisyys nykyisten ympäristöaltistusten vallitessa. Sisältää siittiöiden laadun (pitoisuus, liikkuvuus, DNA-fragmentaatio), munasolujen laadun, hormonaalisen ympäristön ja veri-aivoesteen (BBB) eheyden. Tämä on taso, johon EMF-altistus vaikuttaa suorimmin.",
    level2Label: "Taso 2",
    level2Title: "EMF-käyttäytymiskytkentä",
    level2Desc:
      "Miten henkilökohtaisten laitteiden käyttö vuorovaikuttaa ympäristön EMF-altistuksen kanssa. Korkean ympäristöaltistuksen alueella puhelinta kantava henkilö kokee epälineaarisen kytkentävaikutuksen. Tämä taso kuvaa infrastruktuuritason ja henkilökohtaisen altistuksen välistä vuorovaikutusta.",
    level3Label: "Taso 3",
    level3Title: "Todellinen kulttuuri",
    level3Desc:
      "Vapaaehtoiset hedelmällisyysvalinnat biologisesta kapasiteetista riippumatta. Koulutus, kaupungistuminen, ehkäisyn saatavuus, taloudelliset mahdollisuudet ja kulttuuriset normit. Tämä komponentti on kaikissa demografisissa malleissa; BERM lisää biologiset ja EMF-tasot sen alle.",

    causalTitle: "Kausaalireittikaavio",
    causalDesc:
      "Alla oleva kaavio näyttää täydellisen mekanistisen ketjun Lindgren-geometriasta TFR-laskuun. Yhdeksän tasoa, 35 solmua, 50 reunaa. Kaksi rinnakkaista pääpolkua toimii samanaikaisesti: Polku A (VGCC → Ca²⁺ → ROS) on kokeellisesti vahvin (23–28 salpaajatukimusta), kun taas Polku B (RPM → CRY → vuorokausirytmin häiriö) on teoreettisesti täydellisin silta Lindgrenin geometriasta biologiaan (87,5 % RPM-Hamiltoniaanin elementeistä on johdettavissa metriikka-ansatzista). Molemmat ovat itsenäisesti tuetut E-tason evidenssillä. Klikkaa mitä tahansa solmua nähdäksesi sen mekanismin, Lindgren-tulkinnan, kvantitatiivisen muotoilun, palautumisparametrit ja keskeiset viitteet. Solmujen reunat on väritetty episteemisen tason mukaan.",

    chiTitle: "Lindgrenin chi-kytkentäyhtälö",
    chiDesc:
      "Ympäristön EMF-infrastruktuurin ja henkilökohtaisen laitealtistuksen välinen kytkentä ei ole lineaarinen. Chi-funktio kuvaa saturaatiokäyrää: matalilla ympäristötasoilla henkilökohtainen altistus lisää vain vähän; korkeilla ympäristötasoilla henkilökohtainen altistus on jo ympäristökentän hallitsema.",
    chiExplain:
      "on normalisoitu ympäristöaltistus (0 = ei infrastruktuuria, 1 = saturaatio). Funktio lähestyy asymptoottisesti arvoa 1, mikä tarkoittaa, että henkilökohtaisten laitteiden marginaalivaikutus pienenee ympäristöaltistuksen kasvaessa.",
    chiWherePrefix: "Missä",

    twoChTitle: "Kolmikanavainen altistusmalli",
    twoChDesc:
      "Kokonaistehokas EMF-altistus jakautuu kolmeen taajuuskanavaan — ELF (f < 1 kHz, kalvomodulaatio), IF (1 kHz – 1 MHz, solunjakautuminen/mitoottinen), RF (> 1 MHz, spin-kemia) — kukin painotettuna biologisen mekanisminsa mukaan ja chi-kytkennällä moduloituna.",
    twoChExplain:
      "cumEMF = w_ELF · cumELF + w_IF · cumIF + w_RF · cumRF. Maassa, jossa matkapuhelininfrastruktuuri on lähes nolla, jopa runsas puhelinkäyttö tuottaa vähän kokonaisaltistusta (chi on lähellä nollaa). Vastaavasti täysin saturoituneessa ympäristössä henkilökohtainen komponentti lisätään lähes lineaarisesti kaikkien kolmen kanavan kautta.",
    twoChLayersTitle: "12 teknologiakerrosta ambient-kentän komponentteina",
    twoChLayersDesc:
      "Ambient-termi ei ole monoliittinen. Se hajoaa 12 itsenäiseen teknologiakerrokseen, joista jokaisella on oma ajurinsa, käyttöönottoaikataulunsa ja taajuusprofiilinsa. Tämä hajotus parantaa mallin diskriminointikykyä koska jokainen kerros toimii ortogonaalisena instrumenttina.",
    ifChannelTitle: "IF-kanava: LED-valaistus päälähteinä",
    ifChannelDesc:
      "IF-kanava (1 kHz – 1 MHz) kohdistuu jakautuviin soluihin saman taajuus–solukoko-suhteen kautta kuin FDA:n hyväksymä TTFields-syöpähoito. Ympäristön IF-kenttien pääasiallinen lähde on LED-valaistus: jokainen LED-lamppu sisältää hakkuriteholähteen, joka toimii 20–200 kHz:n taajuudella ja tuottaa harmonisia megahertsialueelle asti. Tyypillisessä kodissa on 15–30 tällaista lähdettä; tyypillisessä toimistossa 200–500. Muita IF-lähteitä ovat ilmanvaihdon taajuusmuuttajat (5–50 kHz), induktioliedet (20–75 kHz) ja kaikki hakkuriteholähteet (kannettavan laturit, puhelinlaturit). Mekanismi toimii ionien pakko-oskillaation (IFO-VGIC) kautta, biologisella kynnysarvolla 10⁻⁵ V/m (Panagopoulos 2025) — kertaluokkia mitattujen LED-ajuriemissioiden alapuolella.",

    recovTitle: "Viisikerroksinen palautumismalli",
    recovDesc:
      "Jos EMF-altistusta vähennettäisiin, eri biologiset järjestelmät palautuisivat eri nopeuksilla. Kunkin kerroksen α-parametri edustaa palautuvan vaurion osuutta (1,0 = täysin palautuva, 0,0 = pysyvä).",
    recovColLayer: "Kerros",
    recovColAlpha: "α",
    recovColTimescale: "Palautumisaikaskaala",
    recovColNotes: "Huomiot",
    recovVgicLayer: "VGIC-porttaus",
    recovVgicTime: "Tunteja",
    recovVgicNote:
      "Ionikanavien konformaatiomuutokset palautuvat välittömästi kentän lakatessa",
    recovRosLayer: "ROS-puhdistuma",
    recovRosTime: "Päiviä viikkoihin",
    recovRosNote:
      "Antioksidanttijärjestelmät palauttavat tasapainon, mutta krooninen oksidatiivinen stressi voi aiheuttaa pysyviä mitokondriovaurioita",
    recovDnaLayer: "DNA-korjaus (SDF)",
    recovDnaTime: "Kuukausia (spermatogeneesisykli)",
    recovDnaNote:
      "Uusia siittiöitä muodostuu 74 päivän välein, mutta kantasolujen vauriot voivat säilyä syklien yli",
    recovLeydigLayer: "Leydigin solujen toiminta",
    recovLeydigTime: "Kuukausista vuosiin",
    recovLeydigNote:
      "Testosteronia tuottavat solut voivat osittain palautua, mutta krooninen atrofia heikentää uudistumiskykyä",
    recovBbbLayer: "Neuronaalinen (BBB)",
    recovBbbTime: "Palautumaton",
    recovBbbNote:
      "Kroonisesta BBB-vuodosta johtuvan hermostovaurion oletetaan olevan pysyvä mallissa",

    compTitle: "Kompensaatiomekanismi",
    compDesc:
      "Havaittu TFR ei ole yksinkertaisesti kolmen tason tulo. Yhteiskunnat kompensoivat osittain biologista laskua avustetun lisääntymisen, käyttäytymismuutosten ja poliittisten interventioiden kautta. Tehokas TFR sisältää kompensaatioeksponentin α = 0,43, joka kuvaa tätä osittaista tasausta.",
    compWhereLabel: "Missä:",
    compBioCap: "biologinen kapasiteetti (taso 1), normalisoitu 0–1",
    compBehav: "EMF-käyttäytymiskytkentäkerroin (taso 2)",
    compAlpha:
      "kompensaatioeksponentti, kalibroitu vuosien 2000–2024 historiallista dataa vasten",
    compRate2024: "havaittu TFR vuonna 2024 (kalibrointiankkuri)",
    compCultRatio:
      "ennustetun kulttuurisen hedelmällisyyspreferenssin suhde vuoden 2024 perustasoon",
    compBioBehav2024:
      "biologis-käyttäytymistulon arvo kalibrointihetkellä",
    compExplain:
      "Kun α = 0, kompensaatiota ei ole ja biologinen lasku siirtyy suoraan TFR:ään. Kun α = 1, kompensaatio on täydellinen eikä biologinen lasku vaikuta havaittuun TFR:ään. Kalibroitu arvo 0,43 tarkoittaa osittaista mutta epätäydellistä kompensaatiota -- biologinen lasku näkyy edelleen TFR:ssä, mutta noin puolella nopeudella verrattuna tilanteeseen ilman yhteiskunnallista sopeutumista.",

    mtorTitle: "mTOR-konvergenssihypoteesi",
    mtorDesc1:
      "mTOR on alavirtaintegraattori, jossa EMF:n aiheuttama Ca²⁺-influksi konvergoi ikääntymis-, hedelmällisyys- ja syöpäreittien kanssa. Sempou-reitti: EMF → VGIC → Ca²⁺↑ → mTOR-hyperaktivaatio → autofagia↓, seneskenttien solujen kertyminen, mitokondriaalinen laadunvalvonta↓, krooninen tulehdus↑.",
    mtorDesc2:
      "Metformiini aktivoi AMPK:n, joka suppressoi mTOR:ia -- täsmälleen EMF:n aiheuttaman reitin vastakohta. Hypoteesi: metformiinin pitkäikäisyyshyöty ei ole ikääntymisen vastainen sinänsä, vaan EMF-kiihdytetyn ikääntymisen vastainen. Luonnollisessa EMF-ympäristössä (amissit) hyödyn tulisi olla minimaalinen.",
    mtorEqExplain:
      "Missä EMF on normalisoitu altistus (0 = ei infrastruktuuria, 1 = moderni kaupunki) ja reduktiotekijöihin kuuluvat metformiini (0,30), rapamysiini (0,85), kalorinrajoitus (0,20), ajoittainen paasto (0,10).",
    mtorThreeTitle: "Kolme epidemiaa, yksi mekanismi",
    mtorAging: "Ikääntyminen",
    mtorAgingDesc:
      "mTOR↑ → autofagia↓, seneskenssi↑, tulehdus↑, mitokondriot↓ → kiihtynyt ikääntyminen",
    mtorFertility: "Hedelmällisyys",
    mtorFertilityDesc:
      "mTOR↑ → spermatogoniaalinen erilaistuminen↓, follikulaarinen loppuunpalaminen↑, AMH↓ → TFR↓",
    mtorCancer: "Syöpä",
    mtorCancerDesc:
      "mTOR↑ → proliferaatio↑, kasvainkasvu↑, metastaasi↑ → syöpäriski↑",
    mtorPredTitle: "Testattavat ennusteet",
    mtorPredColId: "ID",
    mtorPredColPred: "Ennuste",
    mtorPredColTest: "Testi",
    mtorPreds: [
      {
        id: "E1",
        pred: "Metformiinin pitkäikäisyyshyöty on suurempi korkean EMF:n ympäristöissä",
        test: "UK CPRD stratifioituna kaupunki/maaseutu",
      },
      {
        id: "E2",
        pred: "Amissien metformiinin käyttäjät saavat pienemmän pitkäikäisyysbonuksen kuin yleinen väestö",
        test: "Amissien diabeteskohortin vertailu",
      },
      {
        id: "E3",
        pred: "Blue Zone -pitkäikäisyysetu häviää 4G/5G:n saapuessa",
        test: "Okinawa, Sardinia, Ikaria -kohorttien seuranta",
      },
      {
        id: "E4",
        pred: "CR-kokeiden efektikoot kasvavat vuosikymmenittäin (kasvava laboratorio-EMF)",
        test: "Meta-analyysi: efektikoko vs. julkaisuvuosi",
      },
      {
        id: "E5",
        pred: "TAME-tutkimuksen hyöty stratifioituu EMF-altistuksen mukaan",
        test: "Kaupunki vs. maaseutu -alaryhmäanalyysi",
      },
      {
        id: "E6",
        pred: "Sapatti (25 h/viikko EMF-vapaata) toimii ajoittaisena mTOR-paastona, tukien haredi-TFR:ää ja pitkäikäisyyttä",
        test: "Haredi vs. sekulaari israelilaiskohortti",
      },
    ],

    modulomeTitle: "EMF-modulooma",
    modulomeDesc: "Kahdeksantasoinen modulooma yhdistää viisi itsenäistä tutkimusperinnettä — Beckerin DC-ohjausjärjestelmän, Adeen elektromin, Levinin bioelektrisen koodin, Lindgrenin geometrisen viitekehyksen ja kromoforien yleistyksen (CCO/CRY) — yhtenäiseksi malliksi EMF:n biologisesta herkkyydestä. Jokaista tasoa tukevat itsenäisesti regulaattorihyväksytyt terapeuttiset laitteet, jotka hyödyntävät samaa mekanismia.",

    btnEvidence: "Selaa näyttöä",
    btnPredictions: "Näytä ennusteet",
    mathTitle: "Matemaattinen perusta",
    mathSubtitle:
      'Täydellinen johtaminen Lindgrenin geometriasta TFR-ennusteeseen. Jokainen yhtälö on johdettavissa edellisestä. Klikkaa "Täysi johtaminen" nähdäksesi välivaiheet.',

    epistemic:
      "Episteeminen huomautus: Yllä olevat yhtälöt ovat nykyinen mallispesifikaatio (v17.0). Parametriarvot on kalibroitu havaittua dataa vasten ja niitä päivitetään uuden näytön myötä. Malli on nimenomaisesti suunniteltu falsifioitavaksi -- jos sen ennusteet epäonnistuvat, malli on väärässä. Terapeuttinen laiteparadoksi (24+ regulaattorihyväksyttyä ei-termistä EMF-laitekategoriaa, DC:stä UV:iin) vahvistaa ei-termisen bioaktiivisuuden regulatiiviseksi tosiasiaksi, ei hypoteesiksi.",
  },
} as const;

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-card-border bg-card-bg rounded-lg p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

function Eq({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 px-4 py-3 bg-background-secondary rounded-lg overflow-x-auto">
      <code className="text-sm font-mono-num whitespace-nowrap">
        {children}
      </code>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const locale_key = (locale as Locale) in t ? (locale as Locale) : "en";
  const d = t[locale_key];
  return {
    title: d.metaTitle,
    description: d.metaDesc,
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const locale_key = (locale as Locale) in t ? (locale as Locale) : "en";
  const d = t[locale_key];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          {d.subtitle}
        </p>
      </header>

      <div className="flex gap-10">
        {/* Sticky sidebar */}
        <ModelTableOfContents locale={locale} />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Three-level architecture */}
          <section id="architecture" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.archTitle}</h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.archDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.level1Label}
                </p>
                <h3 className="text-base font-semibold mb-2">{d.level1Title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.level1Desc}
                </p>
              </SectionCard>

              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.level2Label}
                </p>
                <h3 className="text-base font-semibold mb-2">{d.level2Title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.level2Desc}
                </p>
              </SectionCard>

              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.level3Label}
                </p>
                <h3 className="text-base font-semibold mb-2">{d.level3Title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.level3Desc}
                </p>
              </SectionCard>
            </div>
          </section>

          {/* Interactive causal chain diagram */}
          <section id="causal-diagram" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.causalTitle}</h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.causalDesc}
            </p>
            <div className="overflow-x-auto">
              <BermCausalDiagram />
            </div>
          </section>

          {/* Lindgren chi coupling */}
          <section id="chi-coupling" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.chiTitle}</h2>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.chiDesc}
            </p>
            <Eq>
              &chi;(&#256;) = &#256; / &radic;(1 + &#256;&sup2;)
            </Eq>
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.chiWherePrefix}{" "}
              <code className="font-mono-num text-foreground">&Amacr;</code>{" "}
              {d.chiExplain}
            </p>
          </section>

          {/* Three-channel model */}
          <section id="two-channel-model" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.twoChTitle}</h2>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.twoChDesc}
            </p>
            <Eq>
              cumEMF = w_ELF &middot; cumELF + w_IF &middot; cumIF + w_RF &middot; cumRF
            </Eq>
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed mb-6">
              {d.twoChExplain}
            </p>

            <h3 className="text-base font-semibold mb-2">{d.twoChLayersTitle}</h3>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.twoChLayersDesc}
            </p>
            <Eq>
              ambient = &Sigma;<sub>k=1..12</sub> layer<sub>k</sub>(country, year)
            </Eq>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
              {([
                ["#4a6741", locale_key === "fi" ? "Sotilastutka" : "Military radar", "1950s"],
                ["#2196F3", locale_key === "fi" ? "Säätutka" : "Weather radar", "1988+"],
                ["#FF5722", locale_key === "fi" ? "Matkapuhelinverkot" : "Mobile networks", "1991+"],
                ["#E91E63", "Wi-Fi", "1999+"],
                ["#8BC34A", locale_key === "fi" ? "Tuuliturbiinit" : "Wind turbines", "2000+"],
                ["#9C27B0", locale_key === "fi" ? "Näyttösiirtymä" : "Display transition", "2005+"],
                ["#00BCD4", locale_key === "fi" ? "Älymittarit" : "Smart meters", "2005+"],
                ["#FFC107", locale_key === "fi" ? "Sisä-LED" : "Indoor LED", "2009+"],
                ["#FFEB3B", locale_key === "fi" ? "Aurinkoinvertterit" : "Solar inverters", "2010+"],
                ["#FF9800", locale_key === "fi" ? "LED-katuvalaistus" : "Street LED", "2012+"],
                ["#795548", "IoT", "2014+"],
                ["#607D8B", "ADAS", "2015+"],
              ] as const).map(([color, name, year]) => (
                <div key={name} className="flex items-center gap-2 rounded-lg border border-card-border px-3 py-2">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs font-medium truncate">{name}</span>
                  <span className="text-[10px] font-mono-num text-foreground-muted ml-auto">{year}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-status-partial/30 bg-status-partial/5 p-5 max-w-3xl">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-status-partial mb-2">{d.ifChannelTitle}</h4>
              <p className="text-sm text-foreground-muted leading-relaxed">{d.ifChannelDesc}</p>
            </div>
          </section>

          {/* EMF Modulome */}
          <section id="modulome" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.modulomeTitle}</h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.modulomeDesc}
            </p>
            <ModulomeLayers locale={locale} />
          </section>

          {/* Five-layer recovery model */}
          <section id="recovery" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.recovTitle}</h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.recovDesc}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-foreground-muted">
                    <th className="py-2 pr-4 font-medium">{d.recovColLayer}</th>
                    <th className="py-2 pr-4 font-medium">{d.recovColAlpha}</th>
                    <th className="py-2 pr-4 font-medium">
                      {d.recovColTimescale}
                    </th>
                    <th className="py-2 font-medium">{d.recovColNotes}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-card-border">
                    <td className="py-3 pr-4 font-medium">{d.recovVgicLayer}</td>
                    <td className="py-3 pr-4 font-mono-num">1.0</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovVgicTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovVgicNote}
                    </td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="py-3 pr-4 font-medium">{d.recovRosLayer}</td>
                    <td className="py-3 pr-4 font-mono-num">0.8</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovRosTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovRosNote}
                    </td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="py-3 pr-4 font-medium">{d.recovDnaLayer}</td>
                    <td className="py-3 pr-4 font-mono-num">0.1</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovDnaTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovDnaNote}
                    </td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="py-3 pr-4 font-medium">
                      {d.recovLeydigLayer}
                    </td>
                    <td className="py-3 pr-4 font-mono-num">0.3</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovLeydigTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovLeydigNote}
                    </td>
                  </tr>
                  <tr className="border-b border-card-border last:border-0">
                    <td className="py-3 pr-4 font-medium">{d.recovBbbLayer}</td>
                    <td className="py-3 pr-4 font-mono-num">0.0</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovBbbTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovBbbNote}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Compensation mechanism */}
          <section id="compensation" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.compTitle}</h2>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.compDesc}
            </p>
            <Eq>
              TFR<sub>eff</sub> = (bioCap &times; behav)<sup>(1&minus;&alpha;)</sup>{" "}
              &times; rate<sub>2024</sub> &times; cultRatio &times;{" "}
              bioBehav<sub>2024</sub><sup>&alpha;</sup>
            </Eq>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.compWhereLabel}
            </p>
            <ul className="text-sm text-foreground-muted space-y-2 max-w-3xl ml-4 mb-4">
              <li>
                <strong className="text-foreground">bioCap</strong> --{" "}
                {d.compBioCap}
              </li>
              <li>
                <strong className="text-foreground">behav</strong> --{" "}
                {d.compBehav}
              </li>
              <li>
                <strong className="text-foreground">&alpha; = 0.43</strong> --{" "}
                {d.compAlpha}
              </li>
              <li>
                <strong className="text-foreground">
                  rate<sub>2024</sub>
                </strong>{" "}
                -- {d.compRate2024}
              </li>
              <li>
                <strong className="text-foreground">cultRatio</strong> --{" "}
                {d.compCultRatio}
              </li>
              <li>
                <strong className="text-foreground">
                  bioBehav<sub>2024</sub>
                </strong>{" "}
                -- {d.compBioBehav2024}
              </li>
            </ul>
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.compExplain}
            </p>
          </section>

          {/* mTOR convergence */}
          <section id="mtor" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.mtorTitle}</h2>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.mtorDesc1}
            </p>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.mtorDesc2}
            </p>
            <Eq>
              mTOR<sub>eff</sub> = (1.0 + 0.25 &times; EMF) &times; &prod;(1 &minus;
              reduction<sub>i</sub>)
            </Eq>
            <Eq>
              aging rate = mTOR<sub>eff</sub><sup>0.7</sup>
            </Eq>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.mtorEqExplain}
            </p>

            <h3 className="text-base font-semibold mb-3">{d.mtorThreeTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.mtorAging}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.mtorAgingDesc}
                </p>
              </SectionCard>
              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.mtorFertility}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.mtorFertilityDesc}
                </p>
              </SectionCard>
              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.mtorCancer}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.mtorCancerDesc}
                </p>
              </SectionCard>
            </div>

            <h3 className="text-base font-semibold mb-3">{d.mtorPredTitle}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-foreground-muted">
                    <th className="py-2 pr-4 font-medium">{d.mtorPredColId}</th>
                    <th className="py-2 pr-4 font-medium">{d.mtorPredColPred}</th>
                    <th className="py-2 font-medium">{d.mtorPredColTest}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.mtorPreds.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`border-b border-card-border${
                        i === d.mtorPreds.length - 1 ? " last:border-0" : ""
                      }`}
                    >
                      <td className="py-3 pr-4 font-mono-num">{row.id}</td>
                      <td className="py-3 pr-4 text-foreground-muted">
                        {row.pred}
                      </td>
                      <td className="py-3 text-foreground-muted">{row.test}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Mathematical Foundation */}
          <section className="border-t border-border pt-10 mb-14">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              {d.mathTitle}
            </h2>
            <p className="text-sm text-foreground-muted mb-10 max-w-3xl leading-relaxed">
              {d.mathSubtitle}
            </p>
            <MathematicsSections locale={locale} />
          </section>

          {/* Links */}
          <section className="border-t border-border pt-8 mt-8 flex flex-wrap gap-4">
            <Link
              href={`${prefix}/evidence`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
            >
              {d.btnEvidence}
            </Link>
            <Link
              href={`${prefix}/predictions`}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-sm font-medium rounded-lg transition-colors"
            >
              {d.btnPredictions}
            </Link>
          </section>

          {/* Epistemic note */}
          <section className="mt-8">
            <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
              {d.epistemic}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
