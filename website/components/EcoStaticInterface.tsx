import Link from "next/link";
import { EcoCausalVisuals, EcoSpeciesCueRow, TickEvidenceBoundary } from "./EcoCausalVisuals";
import { BermIcon } from "@/components/BermIcon";

type Locale = "en" | "fi";

type EvidenceCard = {
  tag: string;
  title: string;
  text: string;
  source?: { label: string; href: string };
  tone: "direct" | "hypothesis";
};

type Prediction = {
  id: string;
  title: string;
  text: string;
};

type StaticMetric = {
  symbol: string;
  title: string;
  text: string;
  source?: { label: string; href: string };
};

type RouteCard = {
  id: string;
  title: string;
  text: string;
};

type FieldClass = {
  symbol: string;
  title: string;
  text: string;
  source?: { label: string; href: string };
};

type EvidenceStage = {
  step: string;
  title: string;
  text: string;
  source?: { label: string; href: string };
  tone: EvidenceCard["tone"];
};

type SentinelSystem = {
  id: string;
  title: string;
  text: string;
  source?: { label: string; href: string };
};

type Copy = {
  frameworkTitle: string;
  frameworkLead: string;
  fieldClasses: readonly FieldClass[];
  ladderTitle: string;
  ladderLead: string;
  ladder: readonly EvidenceStage[];
  systemsTitle: string;
  systemsLead: string;
  systems: readonly SentinelSystem[];
  interfaceTitle: string;
  interfaceLead: string;
  reconstructionTitle: string;
  reconstructionLead: string;
  staticMetrics: readonly StaticMetric[];
  couplingTitle: string;
  couplingLead: string;
  couplingRoutes: readonly RouteCard[];
  evidenceTitle: string;
  evidence: readonly EvidenceCard[];
  directTitle: string;
  direct: readonly string[];
  predictionTitle: string;
  predictionLead: string;
  selectionEquation: string;
  evolutionText: string;
  evolutionEquation: string;
  predictions: readonly Prediction[];
  protocolTitle: string;
  protocol: readonly string[];
  boundaryTitle: string;
  boundary: readonly string[];
  sourceTitle: string;
  sources: readonly { label: string; href: string; text: string }[];
  selectionLandscapeTitle: string;
  selectionLandscapeP1: string;
  selectionLandscapeP2: string;
  selectionLandscapeArticleLink: string;
  selectionLandscapeSentinelLink: string;
  selectionLandscapeNote: string;
  sentinelLink: string;
  measurementLink: string;
  modelLink: string;
  host: string;
  interface: string;
  vegetation: string;
  tick: string;
  hostText: string;
  interfaceText: string;
  vegetationText: string;
  tickText: string;
};

const COPY: Record<string, Copy> = {
  en: {
    frameworkTitle: "BERM–Eco: FieldState, ecological sorting and selection",
    frameworkLead:
      "The ecology branch tests the same physical premise as the human model: organisms do not encounter one generic “EMF dose”. They encounter a measured field configuration, and each species has its own sensory, morphological and life-stage transfer function. This makes relative ecological outcomes testable without treating every species as uniformly sensitive or resistant.",
    fieldClasses: [
      {
        symbol: "E_DC · Q · ∇|E|²",
        title: "Static / triboelectric interface",
        text: "Charge, reference potential, local electric-field gradient, geometry, grounding and humidity govern local transport and attachment. This is the class established in the tick–host work; it is not a proxy for RF or geomagnetism.",
        source: { label: "England & Robert 2022", href: "https://doi.org/10.1111/brv.12804" },
      },
      {
        symbol: "E_AC(f) · B(f) · dE/dt",
        title: "ELF electric and magnetic fields",
        text: "Time-varying electric and magnetic components must be measured separately, including waveform, polarity, geometry and induced local transfer. A static attachment result cannot be copied into an ELF response claim.",
        source: { label: "Mallinson, Woodburn & O’Reilly 2025", href: "https://doi.org/10.1016/j.isci.2025.112550" },
      },
      {
        symbol: "B₀ · inclination · light",
        title: "Geomagnetic orientation",
        text: "Background-vector direction and inclination can be information-bearing; reception can also be light-, clock- and developmental-stage-dependent. This branch is distinct from electric-field transport.",
        source: { label: "Wan et al. 2021", href: "https://doi.org/10.1038/s41467-021-21002-z" },
      },
      {
        symbol: "S(f, polarization, time)",
        title: "RF spectrum and temporal structure",
        text: "Carrier frequency alone is insufficient: spectrum, polarization, modulation, background and exposure geometry can matter. In some avian compass experiments, disruption is frequency-window-specific rather than a generic RF effect.",
        source: { label: "Leberecht et al. 2023", href: "https://doi.org/10.1073/pnas.2301153120" },
      },
    ],
    ladderTitle: "Four claims, one causal sequence",
    ladderLead:
      "BERM–Eco gains explanatory power by keeping what has been established distinct from what is next to test. The sequence below is not a downgrade of the hypothesis; it defines the evidence needed to move from mechanism to selection.",
    ladder: [
      {
        step: "01 · NATURAL FUNCTION",
        title: "A field can be a biological signal or force",
        text: "Electric and magnetic fields can guide floral foraging, orientation, dispersal and host encounter in different organisms. This anchors the FieldState premise: vector, geometry and time are biologically meaningful inputs.",
        source: { label: "England & Robert 2022", href: "https://doi.org/10.1111/brv.12804" },
        tone: "direct",
      },
      {
        step: "02 · MEASURED RESPONSE",
        title: "A changed FieldState can alter a defined endpoint",
        text: "A matched sham-controlled experiment can establish a component-specific behavioural or physiological response. It does not by itself establish a population trend or a universal species effect.",
        source: { label: "Mallinson, Woodburn & O’Reilly 2025", href: "https://doi.org/10.1016/j.isci.2025.112550" },
        tone: "direct",
      },
      {
        step: "03 · ECOLOGICAL SORTING",
        title: "Different response functions can reorganise encounters",
        text: "If the same calibrated FieldState changes a pollinator, host, parasite, predator or competitor differently, visit, attachment, navigation or dispersal rates can shift relative fitness and community structure. This is a testable model consequence.",
        tone: "hypothesis",
      },
      {
        step: "04 · EVOLUTION",
        title: "Selection requires inherited variation across generations",
        text: "Ecological sorting becomes evolution only if the FieldState-dependent fitness difference acts repeatedly on a heritable trait and changes its distribution. Abundance alone is not an evolutionary result.",
        tone: "hypothesis",
      },
    ],
    systemsTitle: "High-information BERM–Eco sentinel systems",
    systemsLead:
      "These systems are valuable because each joins a measured field feature to a proximate biological endpoint. They are not interchangeable dose models and do not supply a direct human TFR coefficient.",
    systems: [
      {
        id: "POLLINATORS",
        title: "Pollinator networks",
        text: "Bumblebees and honeybees can use floral electric cues. Field experiments with anthropogenic electric fields make floral landing and visit networks a direct test bed for species-specific response functions.",
        source: { label: "Clarke et al. 2013", href: "https://doi.org/10.1126/science.1230883" },
      },
      {
        id: "HOST–PARASITE",
        title: "Ticks, mites and host encounter",
        text: "Ixodes attraction, flower-mite transport and parasite attachment make encounter rate a measurable intermediate. A tick’s electrostatic competence is not evidence of RF/ELF immunity; robustness must be shown field-class by field-class.",
        source: { label: "England, Lihou & Robert 2023", href: "https://doi.org/10.1016/j.cub.2023.06.021" },
      },
      {
        id: "NAVIGATION",
        title: "Migration and orientation",
        text: "Cryptochrome-dependent and avian compass systems show why background vector, light and narrow frequency windows deserve explicit measurement. The endpoint can be route choice or return, not necessarily mortality.",
        source: { label: "Engels et al. 2014", href: "https://doi.org/10.1038/nature13290" },
      },
      {
        id: "DISPERSAL",
        title: "Dispersal and colonisation",
        text: "Electric-field-elicited spider ballooning demonstrates a physical route from local field geometry to dispersal. Repeated changes in dispersal can reshape colonisation, gene flow and metapopulation structure.",
        source: { label: "Morley & Robert 2018", href: "https://doi.org/10.1016/j.cub.2018.05.057" },
      },
    ],
    interfaceTitle: "The static triboelectric interface",
    interfaceLead:
      "This is a native BERM FieldState branch: the host, air gap, vegetation, textile and tick can form a local static-electric interface. It joins reproductive or ecological states only through a measured local transfer; it is not a shortcut from a material name or a country proxy to an outcome.",
    reconstructionTitle: "From a historical reading to a measurable FieldState",
    reconstructionLead:
      "The active model retains historical textile findings, but upgrades their physics. The relevant object is not ‘polyester’ by itself: it is a time-varying, referenced interface state {Q, V, E(r,t), ∇E², dE/dt, τ} shaped by material, body and environment. It also keeps DC interface transport separate from low-frequency waveform and polarity cues.",
    staticMetrics: [
      {
        symbol: "V/cm²",
        title: "Historically reported V/cm², not a tissue-field unit",
        text: "Shafik’s V/cm² is a physically underdetermined historical meter reading. It preserves the observed polyester > blend > cotton ordering in that setup, but cannot be converted into charge, V/m or intragonadal field without the probe area, stand-off, calibration and earth/body reference.",
        source: { label: "Shafik, Ibrahim & El-Sayed 1992", href: "https://doi.org/10.1111/j.1439-0272.1992.tb02628.x" },
      },
      {
        symbol: "Q · E · dE/dt",
        title: "The measurement chain",
        text: "A reconstruction measures net charge with a Faraday cup, potential relative to a named reference, a local vector E(r,t) map, and its temporal change during motion, rest and contact separation. It also records reference-electrode identity, ground-path impedance, capacitance to reference, and probe orientation/bandwidth/input impedance. Geometry and grounding are inputs, not afterthoughts.",
      },
      {
        symbol: "τ",
        title: "Charge retention is an empirical time function",
        text: "In a simple fit Q(t)=Q₀e⁻ᵗ⁄ᵗᵃᵘ, but real textile interfaces can have fast and slow decay components. Under one reported textile test, untreated PET had a charge-decay half-life over 2,000 s, while antistatic treatments shortened half-life to fractions of a second through seconds.",
        source: { label: "Dincmen, Hauser & Gursoy 2016", href: "https://doi.org/10.14504/ajr.3.4.4" },
      },
      {
        symbol: "RH · motion · ground",
        title: "Movement, humidity, blend and grounding set the state",
        text: "Motion raises charge-generation events; resting exposes retention and leakage. Relative humidity, skin moisture, fibre fraction/finish, air gap, pressure, footwear–floor impedance and antistatic treatment alter Q, E and dE/dt. In a checked fixture, τRC≈Rleak·Ceff is a useful comparator; the measured interface decay remains empirical. These are FieldState modulators, not generic covariates.",
      },
      {
        symbol: "∇E²",
        title: "The same geometry connects the textile and tick branches",
        text: "For a small polarizable tick, electrostatic attraction force scales with the local gradient ∇(E²), not simply the sign of a distant voltage. England et al. modelled host–vegetation hotspots exceeding 300 kV/m in their stated geometry; the comparable quantity for a textile interface is a measured local map, not a guessed conversion.",
        source: { label: "England, Lihou & Robert 2023", href: "https://doi.org/10.1016/j.cub.2023.06.021" },
      },
      {
        symbol: "E_DC · E(f)",
        title: "Transport and sensing are separate transfer functions",
        text: "The tick experiment demonstrates polarity-independent induced transport. Varroa showed charge-sign-dependent behaviour; flower mites combined a modulated cue with static transport; honeybee landings differed under 50 Hz AC and positive DC. BERM records these as component-specific transfers, not one generic ‘electric sensitivity’ trait.",
      },
      {
        symbol: "ε′ · ε″ · σ(f) · τ",
        title: "Morphology is a measurable transfer function, not a shield label",
        text: "A waxy cuticle may alter charge leakage and retention, while dielectric polarizability governs induced attraction; the two need not move in the same direction. The discriminating species/stage measurements are permittivity and loss, conductivity, Q-decay, cuticle thickness/shape, mass, tarsal adhesion and hair/tarsus mechanics.",
      },
    ],
    couplingTitle: "Where the interface joins the existing BERM biology",
    couplingLead:
      "STATIC_TRIBO_INTERFACE is a physical source node. It does not add a fertility coefficient. Its candidate transfer routes reuse the model’s existing organ-specific states, each of which still needs its own local measurement and endpoint mapping.",
    couplingRoutes: [
      {
        id: "01",
        title: "Local bioelectric transfer → Vmem / Ca²⁺–redox",
        text: "The measured interface field, geometry and transient pattern are the native inputs for a local membrane-potential and Ca²⁺/mitochondrial-redox transfer. This is the route to VMEM_MTOR and A_VGCC_ROS — not a uniform DC field assumed through the whole organ.",
      },
      {
        id: "02",
        title: "Surface sensory transfer → HPA–HPG → steroidogenesis",
        text: "The model keeps skin/hair/interface sensing and autonomic context as an explicit route into HPA_HPG. Downstream, the existing male steroidogenesis, ovulatory clock and implantation nodes remain distinct rather than collapsing into one endocrine multiplier.",
      },
      {
        id: "03",
        title: "Redox / Vmem memory → BTB and ovarian reserve",
        text: "The static branch can only reach blood–testis-barrier, germline reserve or ovarian reserve through the already registered A_VGCC_ROS, VMEM_MTOR and developmental-memory states. It does not turn the shared textile observation into a global barrier or female-capacity claim.",
      },
    ],
    evidenceTitle: "What is directly established, and what remains a hypothesis",
    evidence: [
      {
        tag: "DIRECT PHYSICAL EVIDENCE",
        title: "Static fields can pull ticks across a short air gap",
        text: "Controlled experiments with Ixodes ricinus nymphs showed passive attraction toward electrostatically charged host materials across short air gaps. The reported polarity independence is consistent with induced polarization in the tick rather than a required fixed tick charge.",
        source: { label: "England, Lihou & Robert 2023", href: "https://doi.org/10.1016/j.cub.2023.06.021" },
        tone: "direct",
      },
      {
        tag: "DIRECT PHYSICAL CONTEXT",
        title: "Host–vegetation geometry matters",
        text: "The same work modelled charged hosts near vegetation and tested a host-like electrostatic configuration. It supports a local host–vegetation gradient as a physical interface worth measuring; it is not a population ecology estimate.",
        source: { label: "England, Lihou & Robert 2023", href: "https://doi.org/10.1016/j.cub.2023.06.021" },
        tone: "direct",
      },
      {
        tag: "DIRECT RF PHYSIOLOGY",
        title: "The same tick has a separate RF-physiology response",
        text: "In a controlled 900 MHz experiment, Ixodes ricinus synganglia showed sex-, intensity- and time-dependent neuropeptide/receptor transcript changes. This places tick RF physiology in its own component-specific branch; it does not replace the static-contact mechanism.",
        source: { label: "Šofranková et al. 2023", href: "https://doi.org/10.3390/pathogens12121398" },
        tone: "direct",
      },
      {
        tag: "MODEL-DERIVED HYPOTHESIS",
        title: "Differential interface sensitivity may be selectable",
        text: "If species, life stages or host–vegetation settings differ in attachment probability under the same calibrated static field, and that difference changes realized feeding or reproduction, differential selection becomes testable. That evolutionary chain has not yet been demonstrated for this interface.",
        tone: "hypothesis",
      },
    ],
    directTitle: "What the static-contact evidence establishes",
    direct: [
      "The formal tick experiments were performed with I. ricinus nymphs. They establish a static electrostatic attraction mechanism in that experimental system, not a universal threshold for all ticks or ectoparasites.",
      "Triboelectric charging is relevant here because contact and friction among materials can generate static charge. The study used rabbit fur/feet and charged acrylic as experimental materials; it does not establish one fixed charge profile for every host, coat, habitat or weather condition.",
      "Electric ecology provides useful physical context for organism–environment interactions, but ecological abundance, host contact and disease risk remain multi-causal outcomes.",
    ],
    predictionTitle: "Testable ecology and evolution hypotheses",
    predictionLead:
      "The ecological result is relative: a species can become more common because its FieldState-dependent fitness declines less than that of a competitor, host, prey or predator. These are model-derived research predictions.",
    selectionEquation:
      "Δ log(Nᵢ/Nⱼ) = log Wᵢ(FieldState, EcoContext) − log Wⱼ(FieldState, EcoContext)",
    evolutionText:
      "Ecological sorting becomes evolutionary change only when interface, sensory or recovery traits vary heritably and the FieldState-dependent fitness difference persists across generations. The model therefore registers a separate time-indexed trait-distribution state rather than treating a single abundance contrast as evolution.",
    evolutionEquation:
      "P₍g+1₎(θ) ∝ W(θ | FieldState, EcoContext) · P₍g₎(θ)",
    predictions: [
      {
        id: "ECO–S1",
        title: "Species- and stage-specific attachment curves",
        text: "Under the same calibrated static-gradient series, estimate attraction and attachment curves separately for species and life stages. A shared curve is not assumed.",
      },
      {
        id: "ECO–S2",
        title: "Interface dependence",
        text: "If the physical mechanism is relevant, attraction should change with host-surface charge, vegetation/grounding geometry, air gap and humidity in directions predicted by the measured electrostatic configuration.",
      },
      {
        id: "ECO–S3",
        title: "Selection requires a fitness link",
        text: "A selection claim requires more than an attachment contrast: the contrast must predict feeding success, survival or reproduction across generations, with genotype or heritable phenotype measured independently.",
      },
    ],
    selectionLandscapeTitle: "EMF as a Novel Evolutionary Selection Pressure",
    selectionLandscapeP1: "The changed electromagnetic environment creates a new axis of natural selection. Species whose fitness depends on electromagnetic sensing (pollination, navigation, circadian regulation) are at a disadvantage. Species whose fitness depends on chemical or mechanical strategies are relatively advantaged. This differential susceptibility is not a gradual evolutionary pressure — it appeared in less than a century, far too fast for adaptive evolution.",
    selectionLandscapeP2: "The honeybee-Varroa system is the clearest case study: EMF simultaneously weakens the host and does not affect the parasite, creating a \"double cascade\" that amplifies all other stressors.",
    selectionLandscapeArticleLink: "Case study: Why the Bees Can't Fight Back",
    selectionLandscapeSentinelLink: "Full analysis on sentinel page",
    selectionLandscapeNote: "Species positions are BERM-Eco estimates [H] based on known mechanisms, not quantitative fitness measurements. The scatter illustrates the hypothesis that EM-dependent species are systematically disadvantaged in the changed FieldState.",
    protocolTitle: "Minimal discriminating study design",
    protocol: [
      "Measure surface potential or local static field, geometry, separation distance, material, grounding state, temperature and relative humidity for every trial.",
      "Randomise and blind attachment scoring where feasible; include uncharged/sham configurations and controls for odour, CO₂, heat, vibration and direct contact.",
      "Sample multiple taxa and life stages instead of extrapolating from one nymphal dataset.",
      "For an evolutionary result, pair field/attachment phenotypes with host-use, survival or reproduction data and a pre-specified heritability or genotype analysis.",
    ],
    boundaryTitle: "Field-class rule",
    boundary: [
      "Static electrostatic attraction and time-varying RF/ELF exposure are different FieldState components. BERM keeps their transfer functions separate instead of copying a response from one field class to another.",
      "Tick electrostatic competence is a directly testable contact mechanism. RF/ELF response is a separate, species-specific transfer question whose answer must come from a matched exposure and endpoint measurement.",
    ],
    sourceTitle: "Primary sources and context",
    sources: [
      {
        label: "England, Lihou & Robert (2023), Current Biology",
        href: "https://doi.org/10.1016/j.cub.2023.06.021",
        text: "Controlled I. ricinus electrostatic-attraction experiments and host–vegetation field modelling.",
      },
      {
        label: "England et al. (2022), Biological Reviews",
        href: "https://doi.org/10.1111/brv.12804",
        text: "Review of electric ecology and electroreception; broad context, not a tick-population effect estimate.",
      },
      {
        label: "Šofranková et al. (2023), Pathogens",
        href: "https://doi.org/10.3390/pathogens12121398",
        text: "Controlled 900 MHz exposure and neuropeptide/receptor transcript response in I. ricinus synganglia: a separate RF physiology branch.",
      },
      {
        label: "Shafik, Ibrahim & El-Sayed (1992), Andrologia",
        href: "https://doi.org/10.1111/j.1439-0272.1992.tb02628.x",
        text: "Human textile–skin measurements showing a material-dependent historical interface reading; it supplies a relative signal, not an organ-field conversion.",
      },
      {
        label: "Dincmen, Hauser & Gursoy (2016), AATCC Journal of Research",
        href: "https://doi.org/10.14504/ajr.3.4.4",
        text: "Controlled PET antistatic-treatment and charge-decay measurements, including a large change in charge-retention time.",
      },
      {
        label: "Colin et al. (1992), Journal of Insect Physiology",
        href: "https://doi.org/10.1016/0022-1910(92)90039-G",
        text: "Charge-sensitive behaviour in Varroa jacobsoni as named in the original study — now generally understood as V. destructor in this Apis mellifera pest context; an ectoparasite-contact anchor, not a colony-collapse estimate.",
      },
      {
        label: "Mallinson, Woodburn & O’Reilly (2025), iScience",
        href: "https://doi.org/10.1016/j.isci.2025.112550",
        text: "A component- and polarity-specific anthropogenic electric-field effect on honeybee floral landing in a paired field experiment.",
      },
      {
        label: "García-Robledo, Dierick & Manser (2025), PNAS",
        href: "https://doi.org/10.1073/pnas.2419214122",
        text: "Flower-mite electroreception and electrostatic host transport: an ecological life-cycle mechanism in another mite guild.",
      },
    ],
    sentinelLink: "Sentinel-study data readiness",
    measurementLink: "FieldState measurement protocol",
    modelLink: "Open the FieldState model",
    host: "Host surface",
    interface: "Static air-gap interface",
    vegetation: "Vegetation / ground",
    tick: "Tick",
    hostText: "contact and friction can contribute to static charge",
    interfaceText: "local geometry, separation and humidity shape the measured field",
    vegetationText: "material and grounding are physical boundary conditions",
    tickText: "passive induction and attachment are empirical endpoints",
  },
  fi: {
    frameworkTitle: "BERM–Eco: FieldState, ekologinen lajittuminen ja valinta",
    frameworkLead:
      "Ekologiahaara testaa samaa fysiikan premissiä kuin ihmismalli: eliö ei kohtaa yhtä yleistä “EMF-annosta”. Se kohtaa mitatun kenttäkonfiguraation, johon jokaisella lajilla on oma aisti-, morfologia- ja elinvaihekohtainen siirtofunktionsa. Tämä tekee suhteelliset ekologiset seuraukset testattaviksi ilman oletusta, että kaikki lajit ovat tasaisesti herkkiä tai resistenttejä.",
    fieldClasses: [
      {
        symbol: "E_DC · Q · ∇|E|²",
        title: "Staattinen / triboelektrinen rajapinta",
        text: "Varaus, referenssipotentiaali, paikallinen sähkökenttägradientti, geometria, maadoitus ja kosteus määrittävät paikallista kuljetusta ja kiinnittymistä. Tämä on punkki–isäntätyössä osoitettu kenttäluokka; se ei ole RF:n tai geomagnetismin proxy.",
        source: { label: "England & Robert 2022", href: "https://doi.org/10.1111/brv.12804" },
      },
      {
        symbol: "E_AC(f) · B(f) · dE/dt",
        title: "ELF-sähkö- ja magneettikentät",
        text: "Ajassa vaihtelevat sähkö- ja magneettikomponentit on mitattava erikseen, mukaan lukien aaltomuoto, napaisuus, geometria ja indusoitu paikallinen siirto. Staattisen kiinnittymisen tulosta ei voi siirtää ELF-vasteväitteeksi.",
        source: { label: "Mallinson, Woodburn & O’Reilly 2025", href: "https://doi.org/10.1016/j.isci.2025.112550" },
      },
      {
        symbol: "B₀ · inklinaatio · valo",
        title: "Geomagneettinen orientaatio",
        text: "Taustavektorin suunta ja inklinaatio voivat olla informaatiota, ja vastaanotto voi riippua valosta, kellotilasta ja kehitysvaiheesta. Tämä haara on eri asia kuin sähkökentän kuljetus.",
        source: { label: "Wan ym. 2021", href: "https://doi.org/10.1038/s41467-021-21002-z" },
      },
      {
        symbol: "S(f, polarisaatio, aika)",
        title: "RF-spektri ja ajallinen rakenne",
        text: "Kantoaaltotaajuus ei yksin riitä: spektri, polarisaatio, modulaatio, tausta ja altistusgeometria voivat olla merkityksellisiä. Joissakin lintukompassikokeissa häiriö on taajuusikkunakohtaista eikä yleinen RF-vaikutus.",
        source: { label: "Leberecht ym. 2023", href: "https://doi.org/10.1073/pnas.2301153120" },
      },
    ],
    ladderTitle: "Neljä väitettä, yksi kausaalinen ketju",
    ladderLead:
      "BERM–Eco vahvistuu, kun jo osoitettu erotetaan seuraavaksi testattavasta. Alla oleva ketju ei heikennä hypoteesia, vaan määrittää näytön, jolla mekanismista siirrytään valintaan.",
    ladder: [
      {
        step: "01 · LUONNOLLINEN FUNKTIO",
        title: "Kenttä voi olla biologinen signaali tai voima",
        text: "Sähkö- ja magneettikentät voivat ohjata eri eliöiden kukkahakua, orientaatiota, dispersaalia ja isäntäkohtaamista. Tämä ankkuroi FieldState-premissin: vektori, geometria ja aika ovat biologisesti merkityksellisiä syötteitä.",
        source: { label: "England & Robert 2022", href: "https://doi.org/10.1111/brv.12804" },
        tone: "direct",
      },
      {
        step: "02 · MITATTU VASTE",
        title: "Muuttunut FieldState voi muuttaa määriteltyä päätepistettä",
        text: "Vastaava sham-kontrolloitu koe voi osoittaa komponenttikohtaisen käyttäytymis- tai fysiologiavasteen. Se ei sellaisenaan osoita populaatiotrendiä tai yleispätevää lajivaikutusta.",
        source: { label: "Mallinson, Woodburn & O’Reilly 2025", href: "https://doi.org/10.1016/j.isci.2025.112550" },
        tone: "direct",
      },
      {
        step: "03 · EKOLOGINEN LAJITTUMINEN",
        title: "Eri vastefunktiot voivat järjestää kohtaamiset uudelleen",
        text: "Jos sama kalibroitu FieldState muuttaa pölyttäjän, isännän, loisen, pedon tai kilpailijan vastetta eri tavoin, käynti-, kiinnittymis-, navigointi- tai dispersaalinopeudet voivat muuttaa suhteellista kelpoisuutta ja yhteisörakennetta. Tämä on mallista johdettu testattava seuraus.",
        tone: "hypothesis",
      },
      {
        step: "04 · EVOLUUTIO",
        title: "Valinta edellyttää periytyvää vaihtelua sukupolvien yli",
        text: "Ekologinen lajittuminen muuttuu evoluutioksi vasta, jos FieldState-riippuvainen kelpoisuusero kohdistuu toistuvasti periytyvään piirteeseen ja muuttaa sen jakaumaa. Pelkkä runsaus ei ole evoluutiotulos.",
        tone: "hypothesis",
      },
    ],
    systemsTitle: "BERM–Eco:n informatiiviset indikaattorijärjestelmät",
    systemsLead:
      "Nämä järjestelmät ovat arvokkaita, koska kukin yhdistää mitatun kenttäpiirteen läheiseen biologiseen päätepisteeseen. Ne eivät ole keskenään vaihdettavia annosmalleja eivätkä tuota suoraa ihmis-TFR-kerrointa.",
    systems: [
      {
        id: "PÖLYTTÄJÄT",
        title: "Pölytysverkot",
        text: "Kimalaiset ja tarhamehiläiset voivat käyttää kukkien sähköisiä vihjeitä. Ihmisen synnyttämiä sähkökenttiä koskevat kenttäkokeet tekevät kukalle laskeutumisesta ja käyntiverkoista suoran testialustan lajikohtaisille vastefunktioille.",
        source: { label: "Clarke ym. 2013", href: "https://doi.org/10.1126/science.1230883" },
      },
      {
        id: "ISÄNTÄ–LOINEN",
        title: "Punkit, kukkapunkit ja isäntäkohtaaminen",
        text: "Ixodes-veto, kukkapunkin kuljetus ja loisen kiinnittyminen tekevät kohtaamisnopeudesta mitattavan välitilan. Punkin sähköstaattinen toimivuus ei ole näyttö RF-/ELF-immuniteetista; robustius on osoitettava kenttäluokka kerrallaan.",
        source: { label: "England, Lihou & Robert 2023", href: "https://doi.org/10.1016/j.cub.2023.06.021" },
      },
      {
        id: "NAVIGOINTI",
        title: "Muuttoliike ja orientaatio",
        text: "Kryptokromi- ja lintukompassijärjestelmät osoittavat, miksi taustavektori, valo ja kapeat taajuusikkunat tarvitsevat eksplisiittisen mittauksen. Päätepiste voi olla reittivalinta tai paluu, ei välttämättä kuolleisuus.",
        source: { label: "Engels ym. 2014", href: "https://doi.org/10.1038/nature13290" },
      },
      {
        id: "DISPERSAALI",
        title: "Leviäminen ja kolonisaatio",
        text: "Sähkökentän laukaisema hämähäkkien ballooning osoittaa fysikaalisen reitin paikallisesta kenttägeometriasta dispersaaliin. Toistuva muutos dispersaalissa voi muovata kolonisaatiota, geenivirtaa ja metapopulaatiorakennetta.",
        source: { label: "Morley & Robert 2018", href: "https://doi.org/10.1016/j.cub.2018.05.057" },
      },
    ],
    interfaceTitle: "Staattinen triboelektrinen rajapinta",
    interfaceLead:
      "Tämä on BERM:n oma FieldState-haara: isäntä, ilmarako, kasvillisuus, tekstiili ja punkki voivat muodostaa paikallisen staattissähköisen rajapinnan. Se liittyy lisääntymis- tai ekologisiin tiloihin vain mitatun paikallisen siirron kautta; materiaalin nimi tai maaproxy ei ole oikotie päätepisteeseen.",
    reconstructionTitle: "Historiallisesta mittarilukemasta mitattavaksi FieldStateksi",
    reconstructionLead:
      "Aktiivinen malli säilyttää historiallisen tekstiilinäytön, mutta tarkentaa sen fysiikan. Olennainen kohde ei ole ‘polyesteri’ yksin, vaan ajassa muuttuva, referoitu rajapintatila {Q, V, E(r,t), ∇E², dE/dt, τ}, jota muovaavat materiaali, keho ja ympäristö. Se pitää myös DC-rajapintakuljetuksen erillään matalataajuisista aaltomuoto- ja polariteettivihjeistä.",
    staticMetrics: [
      {
        symbol: "V/cm²",
        title: "Historiallisesti raportoitu V/cm², ei kudoskentän yksikkö",
        text: "Shafikin V/cm² on fysikaalisesti alimäärätty historiallinen mittarilukema. Se säilyttää kyseisessä asetelmassa havaitun polyesteri > seos > puuvilla -järjestyksen, mutta siitä ei voi laskea varausta, V/m-arvoa eikä intragonadaalista kenttää ilman mittapään alaa, etäisyyttä, kalibrointia ja maa-/kehoreferenssiä.",
        source: { label: "Shafik, Ibrahim & El-Sayed 1992", href: "https://doi.org/10.1111/j.1439-0272.1992.tb02628.x" },
      },
      {
        symbol: "Q · E · dE/dt",
        title: "Mittausketju",
        text: "Rekonstruktio mittaa nettovarauksen Faraday-pikarilla, potentiaalin nimettyyn referenssiin, paikallisen vektori-E(r,t)-kartan sekä kentän ajallisen muutoksen liikkeessä, levossa ja kontaktin irrotessa. Se tallentaa myös referenssielektrodin, maareitin impedanssin, kapasitanssin referenssiin sekä mittapään suunnan/kaistanleveyden/sisäänmenoimpedanssin. Geometria ja maadoitus ovat syötteitä, eivät jälkiselityksiä.",
      },
      {
        symbol: "τ",
        title: "Varauksen säilyminen on empiirinen aikafunktio",
        text: "Yksinkertaisessa sovituksessa Q(t)=Q₀e⁻ᵗ⁄ᵗᵃᵘ, mutta todellisessa tekstiilirajapinnassa voi olla nopea ja hidas purkautumiskomponentti. Eräässä tekstiilikokeessa käsittelemättömän PET:n varauksen purkautumisen puoliintumisaika oli yli 2 000 s, kun taas antistaattinen käsittely lyhensi puoliintumisajan sekunnin murto-osiin tai sekunteihin.",
        source: { label: "Dincmen, Hauser & Gursoy 2016", href: "https://doi.org/10.14504/ajr.3.4.4" },
      },
      {
        symbol: "RH · liike · maa",
        title: "Liike, kosteus, seos ja maadoitus määrittävät tilan",
        text: "Liike kasvattaa varauksen syntytapahtumia; levossa näkyvät säilyminen ja vuoto. Suhteellinen kosteus, ihon kosteus, kuituosuus/-viimeistely, ilmarako, paine, jalkine–lattia-impedanssi ja antistaattinen käsittely muuttavat Q:ta, E:tä ja dE/dt:tä. Tarkistetussa mittausasetelmassa τRC≈Rleak·Ceff on hyödyllinen vertailusuure; mitattu rajapinnan purkautuminen pysyy empiirisenä. Ne ovat FieldState-modulaattoreita, eivät yleisiä kovariaatteja.",
      },
      {
        symbol: "∇E²",
        title: "Sama geometria yhdistää tekstiili- ja punkkihaaran",
        text: "Pienelle polarisoituvalle punkille sähköstaattinen vetovoima skaalautuu paikallisen ∇(E²)-gradientin mukana, ei vain etäisen jännitteen merkin mukaan. England ym. mallinsivat omassa isäntä–kasvillisuusgeometriassaan kohtia, joissa kenttä ylitti 300 kV/m; tekstiilirajapinnan vertailukelpoinen suure on mitattu paikalliskartta, ei arvattu muunnos.",
        source: { label: "England, Lihou & Robert 2023", href: "https://doi.org/10.1016/j.cub.2023.06.021" },
      },
      {
        symbol: "E_DC · E(f)",
        title: "Kuljetus ja aistiminen ovat erillisiä siirtofunktioita",
        text: "Punkkikoe osoittaa napaisuudesta riippumattoman induktiokuljetuksen. Varroalla varauksen merkki muutti käyttäytymistä; kukkapunkeilla moduloitu vihje yhdistyi staattiseen kuljetukseen; mehiläisen laskeutuminen erosi 50 Hz AC- ja positiivisessa DC-kentässä. BERM rekisteröi nämä komponenttikohtaisina siirtoina, ei yhtenä yleisenä ‘sähköherkkyytenä’. ",
      },
      {
        symbol: "ε′ · ε″ · σ(f) · τ",
        title: "Morfologia on mitattava siirtofunktio, ei suojakilpi-leima",
        text: "Vahamainen kutikula voi muuttaa varauksen vuotoa ja säilymistä, kun taas dielektrinen polarisoituvuus määrää indusoitua vetoa; niiden suunnat eivät välttämättä ole samat. Erottavat laji- ja elinvaihemittaukset ovat permittiivisyys ja häviö, johtavuus, Q-purkautuminen, kutikulan paksuus/muoto, massa, tarsaaliadheesio sekä karva-/tarsimekaniikka.",
      },
    ],
    couplingTitle: "Missä rajapinta liittyy BERM:n olemassa olevaan biologiaan",
    couplingLead:
      "STATIC_TRIBO_INTERFACE on fysiikan lähtösolmu. Se ei lisää hedelmällisyyskerrointa. Sen kandidaattisiirtoreitit hyödyntävät mallin nykyisiä elinkohtaisia tiloja, joista jokainen tarvitsee edelleen oman paikallismittauksensa ja päätepistekartoituksensa.",
    couplingRoutes: [
      {
        id: "01",
        title: "Paikallinen bioelektrinen siirto → Vmem / Ca²⁺–redox",
        text: "Mitattu rajapintakenttä, geometria ja transienttikuvio ovat kalvopotentiaalin sekä Ca²⁺/mitokondria-redoxin paikallisen siirron natiivisyötteitä. Tämä on reitti solmuihin VMEM_MTOR ja A_VGCC_ROS — ei oletus tasaisesta DC-kentästä koko elimen läpi.",
      },
      {
        id: "02",
        title: "Pinta-aistinen siirto → HPA–HPG → steroidogeneesi",
        text: "Malli pitää iho-/karva-/rajapinta-aistimisen ja autonomisen kontekstin eksplisiittisenä reittinä HPA_HPG:hen. Alavirtaan miessteroidogeneesi, ovulaation kello ja implantaatio säilyvät erillisinä eivätkä romahda yhdeksi endokriiniseksi kertoimeksi.",
      },
      {
        id: "03",
        title: "Redox / Vmem-muisti → BTB ja munasarjavaranto",
        text: "Staattinen haara voi edetä veri–kivesesteeseen, ituradan varantoon tai munasarjavarannon suuntaan vain jo rekisteröityjen A_VGCC_ROS-, VMEM_MTOR- ja kehitysmuistisolmujen kautta. Se ei muuta yhteistä tekstiilihavaintoa globaaliksi estekertoimeksi tai naiskapasiteettiväitteeksi.",
      },
    ],
    evidenceTitle: "Mikä on suoraa näyttöä ja mikä on vielä hypoteesi",
    evidence: [
      {
        tag: "SUORA FYSIKAALINEN NÄYTTÖ",
        title: "Staattinen kenttä voi vetää punkin lyhyen ilmarakon yli",
        text: "Ixodes ricinus -nymfeillä tehdyissä kontrolloiduissa kokeissa havaittiin passiivista vetoa sähköstaattisesti varattuihin isäntämateriaaleihin lyhyen ilmarakon yli. Raportoitu riippumattomuus kentän napaisuudesta sopii punkissa indusoituvaan polarisaatioon, ei vaadittuun pysyvään punkkivaraukseen.",
        source: { label: "England, Lihou & Robert 2023", href: "https://doi.org/10.1016/j.cub.2023.06.021" },
        tone: "direct",
      },
      {
        tag: "SUORA FYSIKAALINEN KONTEKSTI",
        title: "Isäntä–kasvillisuus-geometria merkitsee",
        text: "Samassa työssä mallinnettiin varattua isäntää kasvillisuuden lähellä ja testattiin isäntää muistuttavaa sähköstaattista asetelmaa. Se tukee paikallista isäntä–kasvillisuusgradienttia mitattavana fysikaalisena rajapintana; se ei ole populaatioekologinen estimaatti.",
        source: { label: "England, Lihou & Robert 2023", href: "https://doi.org/10.1016/j.cub.2023.06.021" },
        tone: "direct",
      },
      {
        tag: "SUORA RF-FYSIOLOGIA",
        title: "Samalla punkilla on erillinen RF-fysiologiavaste",
        text: "Kontrolloidussa 900 MHz:n kokeessa Ixodes ricinus -punkin synganglioissa havaittiin sukupuoli-, intensiteetti- ja aikakohtaisia neuropeptidi-/reseptoritranskriptien muutoksia. Tämä sijoittaa punkin RF-fysiologian omaan komponenttikohtaiseen haaraansa; se ei korvaa staattista kontaktimekanismia.",
        source: { label: "Šofranková ym. 2023", href: "https://doi.org/10.3390/pathogens12121398" },
        tone: "direct",
      },
      {
        tag: "MALLISTA JOHDETTU HYPOTEESI",
        title: "Rajapintaherkkyys voi erota ja olla valinnan kohteena",
        text: "Jos lajit, elinvaiheet tai isäntä–kasvillisuusasetelmat eroavat kiinnittymistodennäköisyydessä samassa kalibroidussa staattisessa kentässä ja ero muuttaa toteutunutta ruokintaa tai lisääntymistä, differentiaalista valintaa voidaan testata. Tätä evolutiivista ketjua ei ole vielä osoitettu tälle rajapinnalle.",
        tone: "hypothesis",
      },
    ],
    directTitle: "Mitä staattisen kontaktin näyttö osoittaa",
    direct: [
      "Muodolliset punkkikokeet tehtiin I. ricinus -nymfeillä. Ne osoittavat staattisen sähköstaattisen vetomekanismin tässä koejärjestelmässä, eivät yleispätevää kynnysarvoa kaikille punkeille tai ektoparasiiteille.",
      "Triboelektrinen varautuminen on relevanttia, koska materiaalien kontakti ja hankaus voivat synnyttää staattista varausta. Tutkimuksessa käytettiin kokeellisina materiaaleina kanin turkkia/jalkoja ja varattua akryyliä; se ei osoita yhtä kiinteää varausprofiilia kaikille isännille, turkeille, elinympäristöille tai sääoloille.",
      "Sähköekologia tarjoaa hyödyllisen fysikaalisen kontekstin eliö–ympäristövuorovaikutuksille, mutta punkkien runsaus, isäntäkontakti ja tautiriski ovat monisyisiä tuloksia.",
    ],
    predictionTitle: "Testattavat ekologiset ja evolutiiviset hypoteesit",
    predictionLead:
      "Ekologinen tulos on suhteellinen: laji voi yleistyä, koska sen FieldState-riippuvainen kelpoisuus heikkenee vähemmän kuin kilpailijan, isännän, saaliin tai pedon. Nämä ovat mallista johdettuja tutkimusennusteita.",
    selectionEquation:
      "Δ log(Nᵢ/Nⱼ) = log Wᵢ(FieldState, EcoContext) − log Wⱼ(FieldState, EcoContext)",
    evolutionText:
      "Ekologinen valikoituminen muuttuu evolutiiviseksi muutokseksi vasta, kun rajapinta-, aisti- tai palautumisominaisuuksissa on periytyvää vaihtelua ja FieldState-riippuvainen kelpoisuusero säilyy sukupolvien yli. Malli rekisteröi siksi erillisen ajassa indeksoidun piirrejakautumatilan eikä käsittele yksittäistä runsauseroa evoluutiona.",
    evolutionEquation:
      "P₍g+1₎(θ) ∝ W(θ | FieldState, EcoContext) · P₍g₎(θ)",
    predictions: [
      {
        id: "EKO–S1",
        title: "Laji- ja elinvaihekohtaiset kiinnittymiskäyrät",
        text: "Estimoidaan samassa kalibroidussa staattisessa gradienttisarjassa veto- ja kiinnittymiskäyrät erikseen lajeille ja elinvaiheille. Yhteistä käyrää ei oleteta.",
      },
      {
        id: "EKO–S2",
        title: "Rajapintariippuvuus",
        text: "Jos fysikaalinen mekanismi on relevantti, veto muuttuu isäntäpinnan varauksen, kasvillisuuden/maadoituksen geometrian, ilmarakon ja kosteuden mukana mitatun sähköstaattisen asetelman ennustamaan suuntaan.",
      },
      {
        id: "EKO–S3",
        title: "Valintaväite tarvitsee fitness-yhteyden",
        text: "Valintaväite tarvitsee enemmän kuin kiinnittymiskontrastin: kontrastin on ennustettava ruokinnan onnistumista, selviytymistä tai lisääntymistä sukupolvien yli, ja genotyyppi tai periytyvä fenotyyppi on mitattava erikseen.",
      },
    ],
    selectionLandscapeTitle: "EMF uutena evolutiivisena valintapaineena",
    selectionLandscapeP1: "Muuttunut sähkömagneettinen ympäristö luo uuden luonnonvalinnan akselin. Lajit joiden kelpoisuus riippuu sähkömagneettisesta aistimisesta (pölytys, navigointi, vuorokausirytmin säätely) ovat epäedullisessa asemassa. Lajit joiden kelpoisuus riippuu kemiallisista tai mekaanisista strategioista ovat suhteellisesti edullisessa asemassa. Tämä differentiaalinen herkkyys ei ole asteittainen evolutiivinen paine — se ilmaantui alle vuosisadassa, liian nopeasti adaptiiviselle evoluutiolle.",
    selectionLandscapeP2: "Mehiläis-Varroa-järjestelmä on selkein tapaustutkimus: EMF heikentää samanaikaisesti isäntää eikä vaikuta loiseen, luoden \"kaksinkertaisen kaskadin\" joka vahvistaa kaikkia muita stressitekijöitä.",
    selectionLandscapeArticleLink: "Tapaustutkimus: Miksi mehiläiset eivät pysty puolustautumaan",
    selectionLandscapeSentinelLink: "Täysi analyysi sentinellisivulla",
    selectionLandscapeNote: "Lajien sijainnit ovat BERM-Eco-arvioita [H] perustuen tunnettuihin mekanismeihin, eivät kvantitatiivisia kelpoisuusmittauksia. Hajontakuvaaja havainnollistaa hypoteesia, jonka mukaan EM-riippuvaiset lajit ovat systemaattisesti epäedullisessa asemassa muuttuneessa FieldStatessa.",
    protocolTitle: "Minimaalinen erottava tutkimusasetelma",
    protocol: [
      "Mittaa jokaisessa kokeessa pintapotentiaali tai paikallinen staattinen kenttä, geometria, erotusetäisyys, materiaali, maadoitustila, lämpötila ja suhteellinen kosteus.",
      "Satunnaista ja sokkouta kiinnittymisen arviointi, kun se on mahdollista; käytä varaamattomia/sham-asetelmia sekä haju-, CO₂-, lämpö-, värähtely- ja suoran kosketuksen kontrolleja.",
      "Ota mukaan useita taksoneja ja elinvaiheita sen sijaan, että yleistät yhdestä nymfiaineistosta.",
      "Evolutiivista tulosta varten yhdistä kenttä-/kiinnittymisfenotyypit isäntäkäyttö-, selviytymis- tai lisääntymisdataan sekä ennalta määriteltyyn periytyvyys- tai genotyyppianalyysiin.",
    ],
    boundaryTitle: "Kenttäluokkasääntö",
    boundary: [
      "Staattinen sähköstaattinen veto ja ajassa vaihteleva RF/ELF-altistus ovat eri FieldState-komponentteja. BERM pitää niiden siirtofunktiot erillään sen sijaan, että vaste kopioitaisiin kenttäluokasta toiseen.",
      "Punkin sähköstaattinen toimivuus on suoraan testattava kontaktimekanismi. RF/ELF-vaste on erillinen, lajikohtainen siirtokysymys, johon vastaus edellyttää vastaavaa altistus- ja päätepistemittausta.",
    ],
    sourceTitle: "Ensisijaiset lähteet ja konteksti",
    sources: [
      {
        label: "England, Lihou & Robert (2023), Current Biology",
        href: "https://doi.org/10.1016/j.cub.2023.06.021",
        text: "Kontrolloidut I. ricinus -kokeet sähköstaattisesta vedosta ja isäntä–kasvillisuus-kentän mallinnuksesta.",
      },
      {
        label: "England ym. (2022), Biological Reviews",
        href: "https://doi.org/10.1111/brv.12804",
        text: "Sähköekologian ja sähköreseption katsaus; laaja konteksti, ei punkkipopulaation vaikutusarvio.",
      },
      {
        label: "Šofranková ym. (2023), Pathogens",
        href: "https://doi.org/10.3390/pathogens12121398",
        text: "Kontrolloitu 900 MHz:n altistus ja neuropeptidi-/reseptoritranskriptivaste I. ricinus -synganglioissa: erillinen RF-fysiologiahaara.",
      },
      {
        label: "Shafik, Ibrahim & El-Sayed (1992), Andrologia",
        href: "https://doi.org/10.1111/j.1439-0272.1992.tb02628.x",
        text: "Ihmisen tekstiili–iho-mittaus, jossa historiallinen rajapintalukema riippui materiaalista; se on suhteellinen signaali, ei elinkentän muunnos.",
      },
      {
        label: "Dincmen, Hauser & Gursoy (2016), AATCC Journal of Research",
        href: "https://doi.org/10.14504/ajr.3.4.4",
        text: "Kontrolloitu PET:n antistaattisen käsittelyn ja varauksen purkautumisen mittaus, jossa varauksen säilymisaika muuttui voimakkaasti.",
      },
      {
        label: "Colin ym. (1992), Journal of Insect Physiology",
        href: "https://doi.org/10.1016/0022-1910(92)90039-G",
        text: "Varroa jacobsoni -nimellä julkaistu varausherkän käyttäytymisen tutkimus — Apis mellifera -tuholaiskontekstissa nykyisin yleensä V. destructor; ektoparasiitin kontaktisolmu, ei pesäromahdusestimaatti.",
      },
      {
        label: "Mallinson, Woodburn & O’Reilly (2025), iScience",
        href: "https://doi.org/10.1016/j.isci.2025.112550",
        text: "Komponentti- ja polariteettispesifi ihmisen synnyttämän sähkökentän vaikutus mehiläisen kukalle laskeutumiseen pareittaisessa kenttäkokeessa.",
      },
      {
        label: "García-Robledo, Dierick & Manser (2025), PNAS",
        href: "https://doi.org/10.1073/pnas.2419214122",
        text: "Kukkapunkkien sähköreseptio ja sähköstaattinen isäntäkuljetus: ekologisen elinkierron mekanismi toisessa punkkiryhmässä.",
      },
    ],
    sentinelLink: "Indikaattoritutkimuksen datavalmius",
    measurementLink: "FieldState-mittausprotokolla",
    modelLink: "Avaa FieldState-malli",
    host: "Isännän pinta",
    interface: "Staattinen ilmarakorajapinta",
    vegetation: "Kasvillisuus / maa",
    tick: "Punkki",
    hostText: "kontakti ja hankaus voivat synnyttää staattista varausta",
    interfaceText: "paikallinen geometria, etäisyys ja kosteus muovaavat mitattua kenttää",
    vegetationText: "materiaali ja maadoitus ovat fysikaalisia reunaehtoja",
    tickText: "passiivinen induktio ja kiinnittyminen ovat empiirisiä päätepisteitä",
  },
};

function SectionHeader({
  label,
  title,
  lead,
}: {
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="max-w-4xl">
      <p className="editorial-kicker text-accent">{label}</p>
      <h2 className="editorial-section-heading mt-2">{title}</h2>
      {lead && <p className="editorial-deck mt-3">{lead}</p>}
    </header>
  );
}

export function EcoStaticInterface({ locale }: { locale: string }) {
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = COPY[language];
  const label = language === "fi"
    ? {
        framework: "MALLIN KEHYS",
        claims: "NÄYTTÖPOLKU",
        interface: "RAJAPINTA",
        systems: "INDIKAATTORIJÄRJESTELMÄT",
        measurement: "MITTAUSKETJU",
        coupling: "BIOLOGINEN KYTKENTÄ",
        evidence: "NÄYTÖN TILA",
        interpretation: "TULKINTA",
        predictions: "JOHDETUT ENNUSTEET",
        research: "TUTKIMUSASETELMA",
        sources: "LÄHTEET JA PROVENIENSSI",
        protocol: "MINIMAALINEN PROTOKOLLA",
        observed: "HAVAITTU",
        testable: "JOHDETTU / TESTATTAVA",
      }
    : {
        framework: "MODEL FRAMEWORK",
        claims: "EVIDENCE SEQUENCE",
        interface: "INTERFACE",
        systems: "SENTINEL SYSTEMS",
        measurement: "MEASUREMENT CHAIN",
        coupling: "BIOLOGICAL COUPLING",
        evidence: "EVIDENCE STATUS",
        interpretation: "INTERPRETATION",
        predictions: "DERIVED PREDICTIONS",
        research: "RESEARCH DESIGN",
        sources: "SOURCES AND PROVENANCE",
        protocol: "MINIMUM PROTOCOL",
        observed: "OBSERVED",
        testable: "DERIVED / TESTABLE",
      };

  return (
    <div className="space-y-16">
      <section>
        <SectionHeader label={label.framework} title={d.frameworkTitle} lead={d.frameworkLead} />
        <EcoCausalVisuals locale={language} />
        <div className="mt-7 grid gap-x-6 gap-y-7 md:grid-cols-2 xl:grid-cols-4">
          {d.fieldClasses.map((fieldClass) => (
            <article key={fieldClass.title} className="min-w-0 border-t border-card-border pt-4">
              <p className="font-mono-num text-xs font-semibold text-accent">{fieldClass.symbol}</p>
              <h3 className="mt-2 font-serif text-[1.05rem] font-semibold leading-snug tracking-[-0.012em]">{fieldClass.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{fieldClass.text}</p>
              {fieldClass.source && (
                <a href={fieldClass.source.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-medium text-accent hover:underline">
                  {fieldClass.source.label} ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-card-border pt-10">
        <SectionHeader label={label.claims} title={d.ladderTitle} lead={d.ladderLead} />
        <div className="mt-7 grid gap-x-6 gap-y-7 lg:grid-cols-4">
          {d.ladder.map((stage) => (
            <article key={stage.step} className="min-w-0 border-t border-card-border pt-4">
              <p className={`editorial-kicker ${stage.tone === "direct" ? "text-status-confirmed" : "text-status-partial"}`}>
                {stage.tone === "direct" ? label.observed : label.testable}
              </p>
              <p className="mt-2 font-mono-num text-[10px] font-semibold tracking-[0.12em] text-foreground-muted">{stage.step}</p>
              <h3 className="mt-3 font-serif text-[1.05rem] font-semibold leading-snug tracking-[-0.012em]">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{stage.text}</p>
              {stage.source && (
                <a href={stage.source.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-medium text-accent hover:underline">
                  {stage.source.label} ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-card-border pt-10">
        <SectionHeader label={label.interface} title={d.interfaceTitle} lead={d.interfaceLead} />
        <TickEvidenceBoundary locale={language} />
        <EcoSpeciesCueRow locale={language} />
      </section>

      <section className="border-t border-card-border pt-10">
        <SectionHeader label={label.systems} title={d.systemsTitle} lead={d.systemsLead} />
        <div className="mt-7 grid gap-x-8 gap-y-7 md:grid-cols-2">
          {d.systems.map((system) => (
            <article key={system.id} className="min-w-0 border-t border-card-border pt-4">
              <p className="editorial-kicker text-accent">{system.id}</p>
              <h3 className="mt-2 font-serif text-[1.12rem] font-semibold leading-snug tracking-[-0.012em]">{system.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{system.text}</p>
              {system.source && (
                <a href={system.source.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-medium text-accent hover:underline">
                  {system.source.label} ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-card-border pt-10">
        <SectionHeader label={label.measurement} title={d.reconstructionTitle} lead={d.reconstructionLead} />
        <div className="mt-7 grid gap-x-7 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {d.staticMetrics.map((metric) => (
            <article key={metric.title} className="min-w-0 border-t border-card-border pt-4">
              <p className="font-mono-num text-xs font-semibold text-accent">{metric.symbol}</p>
              <h3 className="mt-2 font-serif text-[1.05rem] font-semibold leading-snug tracking-[-0.012em]">{metric.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{metric.text}</p>
              {metric.source && (
                <a href={metric.source.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-medium text-accent hover:underline">
                  {metric.source.label} ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-card-border pt-10">
        <SectionHeader label={label.coupling} title={d.couplingTitle} lead={d.couplingLead} />
        <div className="mt-7 grid gap-x-7 gap-y-8 lg:grid-cols-3">
          {d.couplingRoutes.map((route) => (
            <article key={route.id} className="min-w-0 border-t border-accent/35 pt-4">
              <p className="font-mono-num text-xs text-accent">{route.id}</p>
              <h3 className="mt-2 font-serif text-[1.05rem] font-semibold leading-snug tracking-[-0.012em]">{route.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{route.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-card-border pt-10">
        <SectionHeader label={label.evidence} title={d.evidenceTitle} />
        <div className="mt-7 grid gap-x-7 gap-y-8 lg:grid-cols-3">
          {d.evidence.map((card) => (
            <article key={card.title} className={`min-w-0 border-t pt-4 ${card.tone === "direct" ? "border-status-confirmed/55" : "border-status-partial/55"}`}>
              <p className={`editorial-kicker ${card.tone === "direct" ? "text-status-confirmed" : "text-status-partial"}`}>{card.tag}</p>
              <h3 className="mt-3 font-serif text-[1.12rem] font-semibold leading-snug tracking-[-0.012em]">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{card.text}</p>
              {card.source && (
                <a href={card.source.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-medium text-accent hover:underline">
                  {card.source.label} ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-4xl border-t border-card-border pt-10">
        <SectionHeader label={label.interpretation} title={d.directTitle} />
        <ul className="space-y-3 text-sm leading-relaxed text-foreground-muted">
          {d.direct.map((item) => <li key={item} className="flex gap-3"><span className="text-accent">•</span><span>{item}</span></li>)}
        </ul>
      </section>

      <section className="border-t border-card-border pt-10">
        <SectionHeader label={label.predictions} title={d.predictionTitle} lead={d.predictionLead} />
        <p className="mt-5 max-w-4xl border-y border-accent/30 py-3 font-mono-num text-sm text-accent">
          {d.selectionEquation}
        </p>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.evolutionText}</p>
        <p className="mt-4 max-w-4xl border-y border-accent/30 py-3 font-mono-num text-sm text-accent">
          {d.evolutionEquation}
        </p>
        <div className="mt-7 grid gap-x-7 gap-y-8 lg:grid-cols-3">
          {d.predictions.map((prediction) => (
            <article key={prediction.id} className="min-w-0 border-t border-card-border pt-4">
              <p className="font-mono-num text-xs text-accent">{prediction.id}</p>
              <h3 className="mt-2 font-serif text-[1.05rem] font-semibold leading-snug tracking-[-0.012em]">{prediction.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{prediction.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* EMF Selection Landscape */}
      <section className="max-w-4xl border-t border-card-border pt-10">
        <SectionHeader label={label.predictions} title={d.selectionLandscapeTitle} />
        <div className="mt-6 space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p>{d.selectionLandscapeP1}</p>
          <p>{d.selectionLandscapeP2}</p>
        </div>

        {/* Selection landscape scatter */}
        <div className="mt-8 rounded-xl border border-card-border bg-card-bg p-5">
          <div className="relative h-64 sm:h-72">
            {/* Y axis label */}
            <div className="absolute left-0 top-0 bottom-8 flex items-center">
              <span className="text-[0.6875rem] text-foreground-muted -rotate-90 whitespace-nowrap origin-center">
                {language === "fi" ? "Kelpoisuusmuutos" : "Fitness change"} →
              </span>
            </div>
            {/* X axis label */}
            <div className="absolute bottom-0 left-8 right-0 text-center">
              <span className="text-[0.6875rem] text-foreground-muted">
                {language === "fi" ? "EM-herkkyys" : "EM sensitivity"} →
              </span>
            </div>
            {/* Species dots */}
            <div className="absolute inset-0 ml-8 mb-8">
              {/* Grid lines */}
              <div className="absolute inset-0 border-b border-l border-card-border" />
              <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-card-border/50" />
              {/* Varroa — low sensitivity, fitness improves */}
              <div className="absolute left-[8%] top-[15%] text-center">
                <BermIcon name="varroa" size={20} className="text-status-confirmed mx-auto" />
                <p className="text-[0.625rem] text-status-confirmed mt-0.5">Varroa</p>
              </div>
              {/* Ixodes — low sensitivity, fitness improves */}
              <div className="absolute left-[15%] top-[22%] text-center">
                <BermIcon name="tick" size={20} className="text-status-confirmed mx-auto" />
                <p className="text-[0.625rem] text-status-confirmed mt-0.5">Ixodes</p>
              </div>
              {/* Human — medium sensitivity */}
              <div className="absolute left-[48%] top-[52%] text-center">
                <BermIcon name="human" size={20} className="text-foreground-muted mx-auto" />
                <p className="text-[0.625rem] text-foreground-muted mt-0.5">{language === "fi" ? "Ihminen" : "Human"}</p>
              </div>
              {/* Moth — high sensitivity */}
              <div className="absolute left-[68%] top-[62%] text-center">
                <BermIcon name="moth" size={20} className="text-status-refuted mx-auto" />
                <p className="text-[0.625rem] text-status-refuted mt-0.5">{language === "fi" ? "Yöperhonen" : "Moth"}</p>
              </div>
              {/* Bat — high sensitivity */}
              <div className="absolute left-[72%] top-[72%] text-center">
                <BermIcon name="bat" size={20} className="text-status-refuted mx-auto" />
                <p className="text-[0.625rem] text-status-refuted mt-0.5">{language === "fi" ? "Lepakko" : "Bat"}</p>
              </div>
              {/* Honeybee — very high sensitivity */}
              <div className="absolute left-[85%] top-[78%] text-center">
                <BermIcon name="honeybee" size={20} className="text-status-refuted mx-auto" />
                <p className="text-[0.625rem] text-status-refuted mt-0.5">{language === "fi" ? "Mehiläinen" : "Honeybee"}</p>
              </div>
              {/* Migratory bird — very high sensitivity */}
              <div className="absolute left-[88%] top-[85%] text-center">
                <BermIcon name="bird" size={20} className="text-status-refuted mx-auto" />
                <p className="text-[0.625rem] text-status-refuted mt-0.5">{language === "fi" ? "Muuttolintu" : "Bird"}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-foreground-muted/60 leading-relaxed italic">
          {d.selectionLandscapeNote}
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href={`/${language}/sentinel`} className="text-accent hover:underline">
            {d.selectionLandscapeSentinelLink} →
          </Link>
          <Link href={`/${language}/articles/bees`} className="text-accent hover:underline">
            {d.selectionLandscapeArticleLink} →
          </Link>
        </div>
      </section>

      <section className="border-t border-card-border pt-10">
        <SectionHeader label={label.research} title={d.protocolTitle} />
        <div className="mt-7 grid gap-x-10 gap-y-8 lg:grid-cols-2">
          <article className="border-t border-card-border pt-4">
          <p className="editorial-kicker text-accent">{label.protocol}</p>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.protocol.map((item, index) => <li key={item} className="flex gap-3"><span className="font-mono-num text-accent">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
        </article>

          <article className="border-t border-status-partial/55 pt-4">
          <p className="editorial-kicker text-status-partial">{d.boundaryTitle}</p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.boundary.map((item) => <p key={item}>{item}</p>)}
          </div>
        </article>
        </div>
      </section>

      <section className="max-w-4xl border-t border-card-border pt-8">
        <SectionHeader label={label.sources} title={d.sourceTitle} />
        <div className="mt-6 space-y-5">
          {d.sources.map((source) => (
            <article key={source.href} className="border-t border-card-border pt-3">
              <a href={source.href} target="_blank" rel="noopener noreferrer" className="font-serif text-[1.02rem] font-semibold leading-snug text-accent hover:underline">{source.label} ↗</a>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{source.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <Link href={`/${language}/sentinel`} className="text-accent hover:underline">{d.sentinelLink} →</Link>
          <Link href={`/${language}/about/measurement`} className="text-accent hover:underline">{d.measurementLink} →</Link>
          <Link href={`/${language}/model`} className="text-accent hover:underline">{d.modelLink} →</Link>
        </div>
      </section>
    </div>
  );
}
