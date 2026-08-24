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
      "The diagram below shows the complete mechanistic chain from Lindgren geometry to TFR decline. Eight levels, 63 nodes, 107 edges. Two co-primary pathways operate in parallel: Pathway A (VGCC → Ca²⁺ → ROS) has the strongest experimental support (23–28 blocker studies), while Pathway B (RPM → CRY → circadian disruption) is the most complete theoretical bridge from Lindgren geometry to biology (87.5% of the RPM Hamiltonian is derivable from the metric ansatz). The CRY/RPM pathway has supporting evidence across species: disruption of magnetic compass in birds (Ritz 2004, Engels 2014), CRY-dependent magnetoreception in Drosophila (Yoshii 2009), CRY-dependent ROS modulation in human cells (Sherrard 2018), and — critically — functional blue-light-dependent magnetoreception in humans (Chae et al. 2019, PLOS ONE), indicating that the biological substrate is present in the species BERM models. Both pathways are independently supported at E-level evidence. Click any node to see its mechanism, Lindgren interpretation, quantitative formulation, recovery parameters, and key references. Node borders are colored by epistemic level.",
    pathwayHierarchyNote:
      "Pathway weights reflect empirical calibration to community data (Amish–Korea gradient). They do not reflect theoretical hierarchy: Pathway B (CRY/RPM) is the PRIMARY pathway because 87.5% of the RPM Hamiltonian is derivable from Lindgren geometry, establishing the mechanism’s EXISTENCE as a geometric consequence. Pathway A has stronger experimental support (23–28 blocker studies) but requires ad hoc amplifiers (e.g. δV_m ≈ 10⁻²¹ V from geometry alone). Theoretical derivability establishes a mechanism’s EXISTENCE; empirical weight reflects its estimated MAGNITUDE. These measure different things.",
    rpmFrequencyNote:
      "CRY/RPM does not respond to the RF carrier frequency (900 MHz – 3.5 GHz). Its resonance ceiling is ~22.5 MHz (Talbi, Zadeh-Haghighi & Simon 2025, Front. Quantum Sci. Technol. 4:1544473). The biologically active components for Pathway B are the geomagnetic background (B_DC) and ELF modulation envelopes of telecom signals (GSM 217 Hz, WiFi 10 Hz beacon). Effects of the RF carrier itself are mediated by Pathway A through the electric field component. The two pathways have complementary frequency domains.",

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
      "cumEMF = w_ELF · cumELF + w_IF · cumIF + w_RF · cumRF, where the current diagnostic weights are w_ELF = 0.05, w_IF = 0.60, w_RF = 0.35. These are DIAGNOSTIC weights requiring empirical calibration, not fitted parameters -- the three-channel decomposition is structurally derived from membrane biophysics, but the relative weights are uncertain. In a country with near-zero cellular infrastructure, even heavy personal phone use contributes little total exposure (chi is near zero). Conversely, in a fully saturated environment, the personal component is added almost linearly across all three channels.",
    twoChLayersTitle: "12 technology layers composing the ambient field",
    twoChLayersDesc:
      "The ambient term is not monolithic. It decomposes into 12 independent technology layers, each with its own driver, deployment timeline, and frequency profile. This decomposition improves the model's discriminative power because each layer acts as an orthogonal instrument.",
    ifoVgicNote: "The IFO-VGIC mechanism is supported by a comprehensive review of 131 studies (Panagopoulos et al. 2025, Bioelectromagnetics): 95% report oxidative effects from RF/Wi-Fi exposure. This consensus, consistent with Yakymenko et al. 2016 (93/100), establishes the Ca²⁺ influx → ROS pathway as the most robustly documented non-thermal mechanism.",
    multiPathwayCa2Note: "The Ca²⁺ disruption at Level 4 operates through multiple independent pathways: (1) direct S4 voltage sensor forced oscillation (Panagopoulos et al. 2025, IFO-VGIC); (2) intracellular calcium store dysregulation via ryanodine receptors (RyR) and SERCA pumps (Bertagna et al. 2025, Ann NY Acad Sci). Both pharmacological blockade experiments (VGCC blockers for pathway 1; dantrolene for RyR, CPA for SERCA in pathway 2) abrogate EMF effects, confirming mechanism. The multi-pathway nature explains tissue-specific sensitivity: cells with high VGIC density AND large intracellular Ca²⁺ stores (neurons, gonadal cells) are more sensitive than cells with low stores (keratinocytes — cf. Meyer 2026, Haidar 2025: null results in skin cells). Note: Bertagna 2025 is ELF (50 Hz), not RF — translation to RF is not direct, but the Ca²⁺ pathway is shared.",
    fiveGReproNote: "The first 5G-frequency-specific testicular data (Bektas et al. 2026, Bioelectromagnetics): 3.5 GHz RF induced testicular and oxidative damage in rats. CoQ10 supplementation ameliorated the damage, demonstrating mechanism reversibility — consistent with BERM's recovery window model where antioxidant capacity determines net daily damage. This extends the oxidative stress evidence base (Yakymenko 2016: 93/100; Panagopoulos 2025: 95%) to the 5G frequency range.",
    pathwayCQuantNote: "The melatonin suppression pathway is quantitatively supported by a PRISMA systematic review of 55 studies (Tbahriti et al. 2026, Sleep Biol Rhythms): 88% of high-quality animal studies report EMF-induced melatonin suppression of 20-50% from baseline. This suppression is biologically significant for GnRH pulsatility but smaller than light-induced suppression (>90%), consistent with BERM's v17_night_fraction() modeling EMF as one component of the nocturnal triple hit (melanopsin + CRY + melatonin), not the sole driver. Methodological note: only 27% of reviewed studies met high standards.",
    cryIndividualVariationNote: "Individual variation: CRY sensitivity is modulated by iris pigmentation (blue > green > brown; Higuchi 2007), nutritional FAD status (Hirano 2017), and sex (males > females in acute magnetoreception; Chae 2019). These modulators may explain part of the inter-individual and inter-population variance in pathway C effectiveness. The CRY2-TRPC1 physical complex (Yap/Sherrard 2025) further reveals that pathways A and C are not independent — they share a protein interaction partner. See the detailed analysis at /evidence/eyes.",
    recoveryWindowNote: "The distinction between acute and chronic exposure is empirically supported: Koivisto et al. (2000) observed cognitive facilitation after 30–60 min exposure (compatible with acute Ca²⁺-mediated synaptic enhancement), while Panagopoulos et al. (2025) report 95% oxidative stress in studies with chronic or repeated exposure. The recovery window model resolves this apparent contradiction: 30 min + 23.5h recovery → 97% repair (no net damage); 22h exposure + 2h recovery → 21% repair (cumulative damage).",
    lateralizationNote: "The two-channel model's spatial structure is empirically supported by lateralization studies: Eliyahu et al. (2006) and Luria et al. (2009) demonstrated that 890 MHz exposure affects specifically the hemisphere nearest the phone. This confirms that personal-EMF effects are local, not systemic — EMF attenuates with the square of distance — supporting BERM's premise that phone-in-pocket targets testes, phone-at-ear targets hypothalamus.",
    ifChannelTitle: "IF channel: LED lighting as primary source",
    ifChannelDesc:
      "The IF channel (1 kHz – 1 MHz) targets dividing cells through the same frequency–cell size relationship as FDA-approved TTFields cancer therapy. The primary environmental source of IF fields is LED lighting: every LED bulb contains a switch-mode power supply operating at 20–200 kHz with harmonics extending to megahertz. A typical home contains 15–30 such sources; a typical office contains 200–500. Additional IF sources include HVAC variable frequency drives (5–50 kHz), induction cooktops (20–75 kHz), and all switch-mode power supplies (laptop chargers, phone chargers). The mechanism operates via Ion Forced Oscillation (IFO-VGIC), with a biological threshold of 10⁻⁵ V/m (Panagopoulos 2025) — orders of magnitude below measured LED driver emissions.",
    tcbmTitle: "Three-Channel Biological Model (TCBM)",
    tcbmIntro:
      "BERM v19.1 identifies three independent electromagnetic channels, each with distinct frequency ranges, exposure sources, biological mechanisms, and temporal histories:",
    tcbmElfTitle: "Channel 1: ELF (0–300 Hz)",
    tcbmElfDesc:
      "Source: power grid, household wiring, appliances, transformers. Mechanism: IFO-VGIC forced ion oscillation (Panagopoulos 2025). History: present since electrification (1880s), stable since ~1970. Proxy: residential electricity consumption (kWh per capita). Always on, 24/7, entire home.",
    tcbmIfTitle: "Channel 2: IF (300 Hz – 10 MHz)",
    tcbmIfDesc:
      "Source: LED drivers (20–300 kHz), SMPS, VFDs, induction cooktops. Mechanism: Cyb5b → Ca²⁺ oscillations (Kim 2026 Cell), IFO at higher frequencies. History: near-zero before 2009, exponential growth 2009–2019 (EU LED transition). Proxy: LED market share × residential electricity. Pulsed, high dV/dt, regulatory gap (IJRB 2022).",
    tcbmRfTitle: "Channel 3: RF (100 kHz – 300 GHz)",
    tcbmRfDesc:
      "Source: mobile phones, Wi-Fi, Bluetooth, base stations, IoT. Mechanism: RPM/CRY spin chemistry (Ritz 2004), thermal deposition at high SAR. History: 2G (1991), 3G (2001), 4G (2009), 5G (2019), Wi-Fi (1999). Proxy: broadband subscriptions per 100, mobile subscriptions. Modulated (data encoding), personal + ambient.",
    tcbmIfMitotic:
      "The IF channel's biological mechanism differs from ELF and RF. While ELF primarily activates ion channels (IFO-VGCC) and RF primarily disrupts radical pair chemistry (RPM/CRY), IF acts through a THIRD pathway: disruption of polar macromolecular structures during cell division (mitotic spindle, tubulin dimers). TTFields research demonstrates that IF fields (100–500 kHz) exert directional forces on polar intracellular elements. This mechanism is frequency-dependent: cancer cells are most affected at 150–200 kHz, while normal cells at ~50 kHz (Nature 2020). LED driver emissions (20–100 kHz) span the normal-cell sensitivity range.",
    tcbmCrossSectional:
      "In the cross-sectional formula (54 countries, LOOCV RMSE 0.522), residential electricity serves as primary proxy because it captures ELF (always present with electricity) and correlates with IF (LED penetration tracks electrification). Broadband captures RF. ELF carries ~60% of the cross-sectional signal, RF carries ~40%. IF cannot be separated from ELF in cross-sectional data because LED penetration correlates with electrification. The temporal test (T1: LED-DID) is needed to isolate IF's independent contribution.",
    tcbmWolframPlanned:
      "Planned: formal Wolfram Language verification of the three-channel coupling structure, including symbolic derivation of the IFO-VGIC threshold from first principles and numerical validation against the 54-country cross-sectional dataset.",

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
    modulomeDesc: "The nine-layer modulome synthesizes six independent research traditions — Becker's DC control system, Adee's electrome, Levin's bioelectric code, Lindgren's geometric framework, the chromophore generalization (CCO/CRY), and the Cyb5b EMF receptor (Kim 2026, Cell) — into a unified model of EMF biological susceptibility. Each layer is independently supported by regulatory-approved therapeutic devices that exploit the same mechanism.",

    btnEvidence: "Browse evidence",
    btnPredictions: "View predictions",
    mathTitle: "Mathematical Foundation",
    mathSubtitle:
      'Complete derivation from Lindgren geometry to TFR prediction. Every equation is derivable from the previous one. Click "Full derivation" to see intermediate steps.',

    epistemic:
      "Epistemic note: The equations above are the current model specification (BERM v17). Parameter values are calibrated against observed data and will be updated as new evidence becomes available. The model is explicitly designed to be falsifiable -- if its predictions fail, the model is wrong. The Therapeutic Device Paradox (24+ regulatory-approved non-thermal EMF device categories, DC to UV) establishes non-thermal bioactivity as regulatory fact, not hypothesis.",
    lbermRef:
      "Formal Jacobian product structure (chapter 17), proof-obligation register and safety systems are described in the base document (LBERM_final.docx).",
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
      "Alla oleva kaavio näyttää täydellisen mekanistisen ketjun Lindgren-geometriasta TFR-laskuun. Kahdeksan tasoa, 63 solmua, 107 reunaa. Kaksi rinnakkaista pääpolkua toimii samanaikaisesti: Polku A (VGCC → Ca²⁺ → ROS) on kokeellisesti vahvin (23–28 salpaajatukimusta), kun taas Polku B (RPM → CRY → vuorokausirytmin häiriö) on teoreettisesti täydellisin silta Lindgrenin geometriasta biologiaan (87,5 % RPM-Hamiltoniaanin elementeistä on johdettavissa metriikka-ansatzista). CRY/RPM-polulla on tukea useasta lajista: magneettikompassin häiriintyminen linnuissa (Ritz 2004, Engels 2014), CRY-riippuvainen magnetoreseptio Drosophilassa (Yoshii 2009), CRY-riippuvainen ROS-modulaatio ihmisen soluissa (Sherrard 2018) ja — kriittisesti — toiminnallinen sinivalosta riippuva magnetoreseptio ihmisessä (Chae ym. 2019, PLOS ONE), mikä osoittaa biologisen substraatin olemassaolon lajissa jota BERM mallintaa. Molemmat ovat itsenäisesti tuetut E-tason evidenssillä. Klikkaa mitä tahansa solmua nähdäksesi sen mekanismin, Lindgren-tulkinnan, kvantitatiivisen muotoilun, palautumisparametrit ja keskeiset viitteet. Solmujen reunat on väritetty episteemisen tason mukaan.",
    pathwayHierarchyNote:
      "Polkujen painot perustuvat empiiriseen kalibrointiin yhteisödatalla (amissit–Korea-gradientti). Ne eivät heijasta teoreettista hierarkiaa: Polku B (CRY/RPM) on PRIMARY-polku koska 87,5 % RPM-Hamiltoniaanista on johdettavissa Lindgren-geometriasta — mekanismin OLEMASSAOLO seuraa geometrisena seurauksena. Polulla A on vahvempi kokeellinen tuki (23–28 salpaajatukimusta) mutta se vaatii ad hoc -vahvistajia (δV_m ≈ 10⁻²¹ V pelkästä geometriasta). Teoreettinen derivoitavuus osoittaa mekanismin OLEMASSAOLON; empiirinen paino arvioi sen SUURUUTTA. Nämä mittaavat eri asioita.",
    rpmFrequencyNote:
      "CRY/RPM ei vastaa RF-kantoaaltotaajuuteen (900 MHz – 3,5 GHz). Sen resonanssimaksimi on ~22,5 MHz (Talbi, Zadeh-Haghighi & Simon 2025, Front. Quantum Sci. Technol. 4:1544473). Polun B biologisesti aktiiviset komponentit ovat geomagneettinen tausta (B_DC) ja telecom-signaalien ELF-modulaatioverhoilukäyrät (GSM 217 Hz, WiFi 10 Hz beacon). RF-kantoaallon vaikutukset välittyvät polku A:n kautta sähkökentän komponenttina. Kahdella polulla on toisiaan täydentävät taajuusalueet.",

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
      "cumEMF = w_ELF · cumELF + w_IF · cumIF + w_RF · cumRF, missä nykyiset diagnostiset painot ovat w_ELF = 0,05, w_IF = 0,60, w_RF = 0,35. Nämä ovat DIAGNOSTISIA painoja, jotka vaativat empiirisen kalibraation, eivät sovitettuja parametreja -- kolmikanavadekompositio on rakenteellisesti johdettu kalvobiofysiikasta, mutta suhteelliset painot ovat epävarmoja. Maassa, jossa matkapuhelininfrastruktuuri on lähes nolla, jopa runsas puhelinkäyttö tuottaa vähän kokonaisaltistusta (chi on lähellä nollaa). Vastaavasti täysin saturoituneessa ympäristössä henkilökohtainen komponentti lisätään lähes lineaarisesti kaikkien kolmen kanavan kautta.",
    twoChLayersTitle: "12 teknologiakerrosta ambient-kentän komponentteina",
    twoChLayersDesc:
      "Ambient-termi ei ole monoliittinen. Se hajoaa 12 itsenäiseen teknologiakerrokseen, joista jokaisella on oma ajurinsa, käyttöönottoaikataulunsa ja taajuusprofiilinsa. Tämä hajotus parantaa mallin diskriminointikykyä koska jokainen kerros toimii ortogonaalisena instrumenttina.",
    ifoVgicNote: "IFO-VGIC-mekanismia tukee 131 tutkimuksen kattava katsaus (Panagopoulos ym. 2025, Bioelectromagnetics): 95 % raportoi oksidatiivisia vaikutuksia RF/Wi-Fi-altistuksessa. Tämä konsensus, joka on yhdenmukainen Yakymenko ym. 2016 (93/100) kanssa, tukee Ca²⁺-influksi → ROS -reitin parhaiten dokumentoiduksi ei-termiseksi mekanismiksi.",
    multiPathwayCa2Note: "Tason 4 Ca²⁺-häiriö operoi useamman itsenäisen reitin kautta: (1) suora S4-jännitesensorin pakotettu oskillaatio (Panagopoulos ym. 2025, IFO-VGIC); (2) solunsisäisten kalsiumvarastojen dysregulaatio ryanodiinireseptoreiden (RyR) ja SERCA-pumppujen kautta (Bertagna ym. 2025, Ann NY Acad Sci). Molemmat farmakologiset salpauskokeet (VGCC-salpaajat reitille 1; dantroleeni RyR:lle, CPA SERCA:lle reitille 2) estävät EMF-vaikutukset — tukee mekanismia. Monireittiisyys selittää kudosspesifisen herkkyyden: solut joissa on korkea VGIC-tiheys JA suuret solunsisäiset Ca²⁺-varastot (neuronit, gonaadisolut) ovat herkempiä kuin matalan varastotiheyden solut (keratinosyytit — vrt. Meyer 2026, Haidar 2025: nollatulokset ihosoluissa). Huom: Bertagna 2025 on ELF (50 Hz), ei RF — mekanismin siirto RF:lle ei suoraviivainen, mutta Ca²⁺-reitti on jaettu.",
    fiveGReproNote: "Ensimmäinen 5G-taajuusspesifinen testisdata (Bektas ym. 2026, Bioelectromagnetics): 3,5 GHz RF aiheutti testis- ja oksidatiivista vauriota rotilla. CoQ10-lisäravinto lievitti vauriota — osoittaa mekanismin reversiibeliuden. Yhdenmukainen BERM:n recovery window -mallin kanssa, jossa antioksidanttikapasiteetti määrittää nettovaurion. Laajentaa oksidatiivisen stressin evidenssipohjan (Yakymenko 2016: 93/100; Panagopoulos 2025: 95 %) 5G-taajuusalueelle.",
    pathwayCQuantNote: "Melatoniinisuppressiopolkua tukee kvantitatiivisesti 55 tutkimuksen PRISMA-katsaus (Tbahriti ym. 2026, Sleep Biol Rhythms): 88 % korkealaatuisista eläintutkimuksista raportoi EMF-indusoitua melatoniinisuppressiota (20–50 % basaalitasosta). Suppressio on biologisesti merkittävä GnRH-pulsaatiolle mutta pienempi kuin valon aiheuttama (>90 %) — yhdenmukainen BERM:n v17_night_fraction() -mallinnuksen kanssa, jossa EMF on yksi komponentti yöllisessä kolminkertaisessa osumassa (melanopsiini + CRY + melatoniini), ei ainoa ajuri. Metodologinen huomio: vain 27 % tutkimuksista täytti korkeat standardit.",
    cryIndividualVariationNote: "Yksilöllinen vaihtelu: CRY-herkkyyttä moduloivat iiriksen pigmentaatio (sininen > vihreä > ruskea; Higuchi 2007), ravitsemuksellinen FAD-tila (Hirano 2017) ja sukupuoli (miehet > naiset akuutissa magnetoreseptiossa; Chae 2019). Nämä modulaattorit voivat selittää osan polku C:n tehokkuuden yksilöiden ja populaatioiden välisestä vaihtelusta. CRY2-TRPC1-fyysinen kompleksi (Yap/Sherrard 2025) paljastaa lisäksi, etteivät polut A ja C ole riippumattomia — ne jakavat proteiini-interaktiokumppanin. Katso yksityiskohtainen analyysi /evidence/eyes.",
    recoveryWindowNote: "Akuutin ja kroonisen altistuksen ero on empiirisesti tuettu: Koivisto ym. (2000) havaitsi kognitiivisen fasilitaation 30–60 min altistuksen jälkeen (yhteensopiva akuutin Ca²⁺-välitteisen synaptisen vahvistuksen kanssa), kun taas Panagopoulos ym. (2025) raportoi 95 %:n oksidatiivista stressiä kroonisissa/toistuvissa altistuksissa. Recovery window -malli ratkaisee tämän: 30 min + 23,5 h palautuminen → 97 % korjaus; 22 h altistus + 2 h palautuminen → 21 % korjaus.",
    lateralizationNote: "Kaksikanavamallin spatiaalista rakennetta tukevat lateralisaatiotutkimukset: Eliyahu ym. (2006) ja Luria ym. (2009) osoittivat, että 890 MHz:n altistus vaikuttaa nimenomaan puhelinta lähimpänä olevaan aivopuoliskoon. Tämä osoittaa, ettei personal-EMF-vaikutus ole systeeminen vaan paikallinen — EMF vaimenee etäisyyden neliössä — ja tukee BERM:n premissiä: puhelin taskussa → kivekset, puhelin korvalla → hypotalamus.",
    ifChannelTitle: "IF-kanava: LED-valaistus päälähteinä",
    ifChannelDesc:
      "IF-kanava (1 kHz – 1 MHz) kohdistuu jakautuviin soluihin saman taajuus–solukoko-suhteen kautta kuin FDA:n hyväksymä TTFields-syöpähoito. Ympäristön IF-kenttien pääasiallinen lähde on LED-valaistus: jokainen LED-lamppu sisältää hakkuriteholähteen, joka toimii 20–200 kHz:n taajuudella ja tuottaa harmonisia megahertsialueelle asti. Tyypillisessä kodissa on 15–30 tällaista lähdettä; tyypillisessä toimistossa 200–500. Muita IF-lähteitä ovat ilmanvaihdon taajuusmuuttajat (5–50 kHz), induktioliedet (20–75 kHz) ja kaikki hakkuriteholähteet (kannettavan laturit, puhelinlaturit). Mekanismi toimii ionien pakko-oskillaation (IFO-VGIC) kautta, biologisella kynnysarvolla 10⁻⁵ V/m (Panagopoulos 2025) — kertaluokkia mitattujen LED-ajuriemissioiden alapuolella.",
    tcbmTitle: "Kolmikanavainen biologinen malli (TCBM)",
    tcbmIntro:
      "BERM v19.1 tunnistaa kolme riippumatonta sähkömagneettista kanavaa, joilla kullakin on omat taajuusalueensa, altistuslähteet, biologiset mekanismit ja ajalliset historiat:",
    tcbmElfTitle: "Kanava 1: ELF (0–300 Hz)",
    tcbmElfDesc:
      "Lähde: sähköverkko, kodin johdotus, kodinkoneet, muuntajat. Mekanismi: IFO-VGIC pakko-oskillaatio (Panagopoulos 2025). Historia: läsnä sähköistymisestä (1880-luku), vakaa n. 1970 jälkeen. Proksi: asumisen sähkönkulutus (kWh per capita). Aina päällä, 24/7, koko koti.",
    tcbmIfTitle: "Kanava 2: IF (300 Hz – 10 MHz)",
    tcbmIfDesc:
      "Lähde: LED-ajurit (20–300 kHz), SMPS, VFD, induktioliedet. Mekanismi: Cyb5b → Ca²⁺-oskillaatiot (Kim 2026 Cell), IFO korkeammilla taajuuksilla. Historia: lähes nolla ennen 2009, eksponentiaalinen kasvu 2009–2019 (EU LED-siirtymä). Proksi: LED-markkinaosuus × asumisen sähkönkulutus. Pulssitettu, korkea dV/dt, säätelyaukko (IJRB 2022).",
    tcbmRfTitle: "Kanava 3: RF (100 kHz – 300 GHz)",
    tcbmRfDesc:
      "Lähde: matkapuhelimet, Wi-Fi, Bluetooth, tukiasemat, IoT. Mekanismi: RPM/CRY spin-kemia (Ritz 2004), terminen absorptio korkealla SAR:lla. Historia: 2G (1991), 3G (2001), 4G (2009), 5G (2019), Wi-Fi (1999). Proksi: laajakaistaliittymät per 100, matkapuhelinliittymät. Moduloitu (datakoodaus), personal + ambient.",
    tcbmIfMitotic:
      "IF-kanavan biologinen mekanismi eroaa ELF:stä ja RF:stä. Kun ELF ensisijaisesti aktivoi ionikanavia (IFO-VGCC) ja RF ensisijaisesti häiritsee radikaaliparin spin-kemiaa (RPM/CRY), IF toimii KOLMANNEN reitin kautta: polaaristen makromolekulaaristen rakenteiden häirintä solunjakautumisen aikana (mitoottinen kara, tubuliinidimeerit). TTFields-tutkimus osoittaa, että IF-kentät (100–500 kHz) kohdistuvat polaarisiin solunsisäisiin elementteihin. Mekanismi on taajuusriippuvainen: syöpäsolut kärsivät eniten 150–200 kHz:llä, normaalit solut ~50 kHz:llä (Nature 2020). LED-hakkuriemissiot (20–100 kHz) kattavat normaalien solujen herkkyystaajuuden.",
    tcbmCrossSectional:
      "Poikkileikkauskaavassa (54 maata, LOOCV RMSE 0.522) asumisen sähkönkulutus on pääproksi, koska se kattaa ELF:n (aina läsnä sähkön kanssa) ja korreloi IF:n kanssa (LED-penetraatio seuraa sähköistymistä). Laajakaista kattaa RF:n. ELF kantaa ~60 % poikkileikkaussignaalista, RF ~40 %. IF:ää ei voi erottaa ELF:stä poikkileikkauksessa, koska LED-penetraatio korreloi sähköistymisen kanssa. Temporaalinen testi (T1: LED-DID) tarvitaan IF:n itsenäisen kontribuution erottamiseksi.",
    tcbmWolframPlanned:
      "Suunniteltu: Wolfram Language -formalisointi kolmikanavaisen kytkentärakenteen muodolliseksi verifioinniksi, mukaan lukien IFO-VGIC-kynnyksen symbolinen derivointi ja numeerinen validointi 54 maan poikkileikkausaineistolla.",

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
    modulomeDesc: "Yhdeksäntasoinen modulooma yhdistää kuusi itsenäistä tutkimusperinnettä — Beckerin DC-ohjausjärjestelmän, Adeen elektromin, Levinin bioelektrisen koodin, Lindgrenin geometrisen viitekehyksen, kromoforien yleistyksen (CCO/CRY) ja Cyb5b-EMF-reseptorin (Kim 2026, Cell) — yhtenäiseksi malliksi EMF:n biologisesta herkkyydestä. Jokaista tasoa tukevat itsenäisesti regulaattorihyväksytyt terapeuttiset laitteet, jotka hyödyntävät samaa mekanismia.",

    btnEvidence: "Selaa näyttöä",
    btnPredictions: "Näytä ennusteet",
    mathTitle: "Matemaattinen perusta",
    mathSubtitle:
      'Täydellinen johtaminen Lindgrenin geometriasta TFR-ennusteeseen. Jokainen yhtälö on johdettavissa edellisestä. Klikkaa "Täysi johtaminen" nähdäksesi välivaiheet.',

    epistemic:
      "Episteeminen huomautus: Yllä olevat yhtälöt ovat nykyinen mallispesifikaatio (BERM v17). Parametriarvot on kalibroitu havaittua dataa vasten ja niitä päivitetään uuden näytön myötä. Malli on nimenomaisesti suunniteltu falsifioitavaksi -- jos sen ennusteet epäonnistuvat, malli on väärässä. Terapeuttinen laiteparadoksi (24+ regulaattorihyväksyttyä ei-termistä EMF-laitekategoriaa, DC:stä UV:iin) vahvistaa ei-termisen bioaktiivisuuden regulatiiviseksi tosiasiaksi, ei hypoteesiksi.",
    lbermRef:
      "Formaali jakobiaanitulorakenne (luku 17), todistusvelvollisuusrekisteri ja turvajärjestelmät on kuvattu perusdokumentissa (LBERM_final.docx).",
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
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.pathwayHierarchyNote}
            </p>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.rpmFrequencyNote}
            </p>
            <div className="overflow-x-auto">
              <BermCausalDiagram />
            </div>
            <span id="ifo" />
            <p className="mt-4 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.ifoVgicNote}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.multiPathwayCa2Note}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.fiveGReproNote}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.pathwayCQuantNote}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.cryIndividualVariationNote}
            </p>
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
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed mb-4">
              {d.twoChExplain}
            </p>
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed mb-6">
              {d.lateralizationNote}
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

            {/* TCBM detail */}
            <div className="mt-8 max-w-3xl">
              <h3 className="text-base font-semibold mb-2">{d.tcbmTitle}</h3>
              <p className="text-sm text-foreground-muted mb-4 leading-relaxed">{d.tcbmIntro}</p>
              <div className="space-y-3">
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-blue-500 mb-1">{d.tcbmElfTitle}</h4>
                  <p className="text-sm text-foreground-muted leading-relaxed">{d.tcbmElfDesc}</p>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-500 mb-1">{d.tcbmIfTitle}</h4>
                  <p className="text-sm text-foreground-muted leading-relaxed">{d.tcbmIfDesc}</p>
                </div>
                <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-1">{d.tcbmRfTitle}</h4>
                  <p className="text-sm text-foreground-muted leading-relaxed">{d.tcbmRfDesc}</p>
                </div>
              </div>
              <p className="text-sm text-foreground-muted mt-4 leading-relaxed">{d.tcbmIfMitotic}</p>
              <p className="text-sm text-foreground-muted mt-4 leading-relaxed">{d.tcbmCrossSectional}</p>
              <p className="text-xs text-foreground-muted mt-3 italic leading-relaxed">{d.tcbmWolframPlanned}</p>
            </div>
          </section>

          {/* EMF Modulome */}
          <section id="modulome" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.modulomeTitle}</h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.modulomeDesc}
            </p>
            <ModulomeLayers locale={locale} />
            <p className="mt-4 text-sm">
              <Link href={`${prefix}/evidence`} className="text-accent hover:underline">
                &rarr; {locale_key === "fi"
                  ? "Katso miten tämä ilmenee sairauksina"
                  : "See how this manifests as diseases"}
              </Link>
            </p>
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
            <p className="mt-4 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.recoveryWindowNote}
            </p>
          </section>

          {/* Compensation mechanism */}
          <span id="asfr" />
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
          <section className="mt-8 space-y-2">
            <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
              {d.epistemic}
            </p>
            <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
              {d.lbermRef}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
