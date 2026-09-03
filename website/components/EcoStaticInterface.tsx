import Link from "next/link";
import { EcoCausalVisuals, EcoSpeciesCueRow, TickEvidenceBoundary } from "./EcoCausalVisuals";
import { BermIcon } from "@/components/BermIcon";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

type ReferenceSource = {
  label: string;
  referenceId?: string;
};

type EvidenceCard = {
  tag: string;
  title: string;
  text: string;
  source?: ReferenceSource;
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
  source?: ReferenceSource;
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
  source?: ReferenceSource;
};

type EvidenceStage = {
  step: string;
  title: string;
  text: string;
  source?: ReferenceSource;
  tone: EvidenceCard["tone"];
};

type SentinelSystem = {
  id: string;
  title: string;
  text: string;
  source?: ReferenceSource;
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
  sources: readonly (ReferenceSource & { text: string })[];
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
    frameworkTitle: "BERM–Eco: measured fields, ecological sorting and selection",
    frameworkLead:
      "The ecology branch tests the same physical premise as the human model: organisms do not encounter one generic “EMF dose”. They encounter a measured field configuration, and each species has its own sensory, morphological and life-stage transfer function. This makes relative ecological outcomes testable without treating every species as uniformly sensitive or resistant.",
    fieldClasses: [
      {
        symbol: "E_DC · Q · ∇|E|²",
        title: "Static / triboelectric interface",
        text: "Charge, reference potential, local electric-field gradient, geometry, grounding and humidity govern local transport and attachment. This is the class established in the tick–host work; it is not a proxy for RF or geomagnetism.",
        source: { label: "England & Robert 2022", referenceId: "england2022_electric_ecology" },
      },
      {
        symbol: "E_AC(f) · B(f) · dE/dt",
        title: "ELF electric and magnetic fields",
        text: "Time-varying electric and magnetic components must be measured separately, including waveform, polarity, geometry and induced local transfer. A static attachment result cannot be copied into an ELF response claim.",
        source: { label: "Mallinson, Woodburn & O’Reilly 2025", referenceId: "mallinson2025_electric_pollution" },
      },
      {
        symbol: "B₀ · inclination · light",
        title: "Geomagnetic orientation",
        text: "Background-vector direction and inclination can be information-bearing; reception can also be light-, clock- and developmental-stage-dependent. This branch is distinct from electric-field transport.",
        source: { label: "Wan et al. 2021", referenceId: "wan2021_cryptochrome_monarch" },
      },
      {
        symbol: "S(f, polarization, time)",
        title: "RF spectrum and temporal structure",
        text: "Carrier frequency alone is insufficient: spectrum, polarization, modulation, background and exposure geometry can matter. In some avian compass experiments, disruption is frequency-window-specific rather than a generic RF effect.",
        source: { label: "Leberecht et al. 2023", referenceId: "leberecht2023_rf_compass_upper_bound" },
      },
    ],
    ladderTitle: "Four claims, one causal sequence",
    ladderLead:
      "BERM–Eco gains explanatory power by keeping what has been established distinct from what is next to test. The sequence below is not a downgrade of the hypothesis; it defines the evidence needed to move from mechanism to selection.",
    ladder: [
      {
        step: "01 · NATURAL FUNCTION",
        title: "A field can be a biological signal or force",
        text: "Electric and magnetic fields can guide floral foraging, orientation, dispersal and host encounter in different organisms. This motivates BERM to test vector, geometry and time as physical inputs; FieldState is only the optional measurement branch for recording them.",
        source: { label: "England & Robert 2022", referenceId: "england2022_electric_ecology" },
        tone: "direct",
      },
      {
        step: "02 · MEASURED RESPONSE",
        title: "BERM tests whether a measured field change alters an endpoint",
        text: "A matched sham-controlled experiment can establish a component-specific behavioural or physiological response. It does not by itself establish a population trend or a universal species effect.",
        source: { label: "Mallinson, Woodburn & O’Reilly 2025", referenceId: "mallinson2025_electric_pollution" },
        tone: "direct",
      },
      {
        step: "03 · ECOLOGICAL SORTING",
        title: "Different response functions can reorganise encounters",
        text: "If the same measured physical field condition changes a pollinator, host, parasite, predator or competitor differently, visit, attachment, navigation or dispersal rates can shift relative fitness and community structure. This is a testable BERM consequence; FieldState can record the condition.",
        tone: "hypothesis",
      },
      {
        step: "04 · EVOLUTION",
        title: "Selection requires inherited variation across generations",
        text: "Ecological sorting becomes evolution only if the fitness difference associated with the measured physical field condition acts repeatedly on a heritable trait and changes its distribution. Abundance alone is not an evolutionary result.",
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
        source: { label: "Clarke et al. 2013", referenceId: "clarke2013_bee_electroreception" },
      },
      {
        id: "HOST–PARASITE",
        title: "Ticks, mites and host encounter",
        text: "Ixodes attraction, flower-mite transport and parasite attachment make encounter rate a measurable intermediate. A tick’s electrostatic competence is not evidence of RF/ELF immunity; robustness must be shown field-class by field-class.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
      },
      {
        id: "NAVIGATION",
        title: "Migration and orientation",
        text: "Cryptochrome-dependent and avian compass systems show why background vector, light and narrow frequency windows deserve explicit measurement. The endpoint can be route choice or return, not necessarily mortality.",
        source: { label: "Engels et al. 2014", referenceId: "engels2014" },
      },
      {
        id: "DISPERSAL",
        title: "Dispersal and colonisation",
        text: "Electric-field-elicited spider ballooning demonstrates a physical route from local field geometry to dispersal. Repeated changes in dispersal can reshape colonisation, gene flow and metapopulation structure.",
        source: { label: "Morley & Robert 2018", referenceId: "morley2018_spider_ballooning" },
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
        source: { label: "Shafik, Ibrahim & El-Sayed 1992", referenceId: "shafik1992" },
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
        source: { label: "Dincmen, Hauser & Gursoy 2016", referenceId: "dincmen2016" },
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
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
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
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
        tone: "direct",
      },
      {
        tag: "DIRECT PHYSICAL CONTEXT",
        title: "Host–vegetation geometry matters",
        text: "The same work modelled charged hosts near vegetation and tested a host-like electrostatic configuration. It supports a local host–vegetation gradient as a physical interface worth measuring; it is not a population ecology estimate.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
        tone: "direct",
      },
      {
        tag: "DIRECT RF PHYSIOLOGY",
        title: "The same tick has a separate RF-physiology response",
        text: "In a controlled 900 MHz experiment, Ixodes ricinus synganglia showed sex-, intensity- and time-dependent neuropeptide/receptor transcript changes. This places tick RF physiology in its own component-specific branch; it does not replace the static-contact mechanism.",
        source: { label: "Šofranková et al. 2023", referenceId: "sofrankova2023" },
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
      "The ecological result is relative: a species can become more common because its fitness under the measured physical field condition declines less than that of a competitor, host, prey or predator. These are BERM-derived research predictions.",
    selectionEquation:
      "Δ log(Nᵢ/Nⱼ) = log Wᵢ(FieldState, EcoContext) − log Wⱼ(FieldState, EcoContext)",
    evolutionText:
      "Ecological sorting becomes evolutionary change only when interface, sensory or recovery traits vary heritably and the fitness difference associated with the measured physical field condition persists across generations. BERM therefore registers a separate time-indexed trait-distribution state rather than treating a single abundance contrast as evolution.",
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
    selectionLandscapeNote: "Species positions are BERM-Eco estimates [H] based on candidate mechanisms, not quantitative fitness measurements. The scatter illustrates a BERM hypothesis about a changed physical field environment; FieldState would only record that environment.",
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
        referenceId: "england_2023_ticks",
        text: "Controlled I. ricinus electrostatic-attraction experiments and host–vegetation field modelling.",
      },
      {
        label: "England et al. (2022), Biological Reviews",
        referenceId: "england2022_electric_ecology",
        text: "Review of electric ecology and electroreception; broad context, not a tick-population effect estimate.",
      },
      {
        label: "Šofranková et al. (2023), Pathogens",
        referenceId: "sofrankova2023",
        text: "Controlled 900 MHz exposure and neuropeptide/receptor transcript response in I. ricinus synganglia: a separate RF physiology branch.",
      },
      {
        label: "Shafik, Ibrahim & El-Sayed (1992), Andrologia",
        referenceId: "shafik1992",
        text: "Human textile–skin measurements showing a material-dependent historical interface reading; it supplies a relative signal, not an organ-field conversion.",
      },
      {
        label: "Dincmen, Hauser & Gursoy (2016), AATCC Journal of Research",
        referenceId: "dincmen2016",
        text: "Controlled PET antistatic-treatment and charge-decay measurements, including a large change in charge-retention time.",
      },
      {
        label: "Colin et al. (1992), Journal of Insect Physiology",
        referenceId: "colin1992_varroa_electrostatic",
        text: "Charge-sensitive behaviour in Varroa jacobsoni as named in the original study — now generally understood as V. destructor in this Apis mellifera pest context; an ectoparasite-contact anchor, not a colony-collapse estimate.",
      },
      {
        label: "Mallinson, Woodburn & O’Reilly (2025), iScience",
        referenceId: "mallinson2025_electric_pollution",
        text: "A component- and polarity-specific anthropogenic electric-field effect on honeybee floral landing in a paired field experiment.",
      },
      {
        label: "García-Robledo, Dierick & Manser (2025), PNAS",
        referenceId: "garcia_robledo2025",
        text: "Flower-mite electroreception and electrostatic host transport: an ecological life-cycle mechanism in another mite guild.",
      },
    ],
    sentinelLink: "Sentinel-study data readiness",
    measurementLink: "FieldState measurement protocol",
    modelLink: "Open the FieldState measurement specification",
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
    frameworkTitle: "BERM–Eco: mitatut kentät, ekologinen lajittuminen ja valinta",
    frameworkLead:
      "Ekologiahaara testaa samaa fysiikan premissiä kuin ihmismalli: eliö ei kohtaa yhtä yleistä “EMF-annosta”. Se kohtaa mitatun kenttäkonfiguraation, johon jokaisella lajilla on oma aisti-, morfologia- ja elinvaihekohtainen siirtofunktionsa. Tämä tekee suhteelliset ekologiset seuraukset testattaviksi ilman oletusta, että kaikki lajit ovat tasaisesti herkkiä tai resistenttejä.",
    fieldClasses: [
      {
        symbol: "E_DC · Q · ∇|E|²",
        title: "Staattinen / triboelektrinen rajapinta",
        text: "Varaus, referenssipotentiaali, paikallinen sähkökenttägradientti, geometria, maadoitus ja kosteus määrittävät paikallista kuljetusta ja kiinnittymistä. Tämä on punkki–isäntätyössä osoitettu kenttäluokka; se ei ole RF:n tai geomagnetismin proxy.",
        source: { label: "England & Robert 2022", referenceId: "england2022_electric_ecology" },
      },
      {
        symbol: "E_AC(f) · B(f) · dE/dt",
        title: "ELF-sähkö- ja magneettikentät",
        text: "Ajassa vaihtelevat sähkö- ja magneettikomponentit on mitattava erikseen, mukaan lukien aaltomuoto, napaisuus, geometria ja aiheutettu paikallinen siirto. Staattisen kiinnittymisen tulosta ei voi siirtää ELF-vasteväitteeksi.",
        source: { label: "Mallinson, Woodburn & O’Reilly 2025", referenceId: "mallinson2025_electric_pollution" },
      },
      {
        symbol: "B₀ · inklinaatio · valo",
        title: "Geomagneettinen orientaatio",
        text: "Taustavektorin suunta ja inklinaatio voivat olla informaatiota, ja vastaanotto voi riippua valosta, kellotilasta ja kehitysvaiheesta. Tämä haara on eri asia kuin sähkökentän kuljetus.",
        source: { label: "Wan ym. 2021", referenceId: "wan2021_cryptochrome_monarch" },
      },
      {
        symbol: "S(f, polarisaatio, aika)",
        title: "RF-spektri ja ajallinen rakenne",
        text: "Kantoaaltotaajuus ei yksin riitä: spektri, polarisaatio, modulaatio, tausta ja altistusgeometria voivat olla merkityksellisiä. Joissakin lintukompassikokeissa häiriö on taajuusikkunakohtaista eikä yleinen RF-vaikutus.",
        source: { label: "Leberecht ym. 2023", referenceId: "leberecht2023_rf_compass_upper_bound" },
      },
    ],
    ladderTitle: "Neljä väitettä, yksi kausaalinen ketju",
    ladderLead:
      "BERM–Eco vahvistuu, kun jo osoitettu erotetaan seuraavaksi testattavasta. Alla oleva ketju ei heikennä hypoteesia, vaan määrittää näytön, jolla mekanismista siirrytään valintaan.",
    ladder: [
      {
        step: "01 · LUONNOLLINEN FUNKTIO",
        title: "Kenttä voi olla biologinen signaali tai voima",
        text: "Sähkö- ja magneettikentät voivat ohjata eri eliöiden kukkahakua, orientaatiota, dispersaalia ja isäntäkohtaamista. Tämä motivoi BERM:iä testaamaan vektoria, geometriaa ja aikaa fysikaalisina syötteinä; FieldState on vain niitä kirjaava valinnainen mittaushaara.",
        source: { label: "England & Robert 2022", referenceId: "england2022_electric_ecology" },
        tone: "direct",
      },
      {
        step: "02 · MITATTU VASTE",
        title: "Mitattu kenttämuutos voi muuttaa määriteltyä päätepistettä",
        text: "Vastaava sham-kontrolloitu koe voi osoittaa komponenttikohtaisen käyttäytymis- tai fysiologiavasteen. Se ei sellaisenaan osoita populaatiotrendiä tai yleispätevää lajivaikutusta.",
        source: { label: "Mallinson, Woodburn & O’Reilly 2025", referenceId: "mallinson2025_electric_pollution" },
        tone: "direct",
      },
      {
        step: "03 · EKOLOGINEN LAJITTUMINEN",
        title: "Eri vastefunktiot voivat järjestää kohtaamiset uudelleen",
        text: "Jos sama mitattu fysikaalinen kenttätila muuttaa pölyttäjän, isännän, loisen, pedon tai kilpailijan vastetta eri tavoin, käynti-, kiinnittymis-, navigointi- tai dispersaalinopeudet voivat muuttaa suhteellista kelpoisuutta ja yhteisörakennetta. Tämä on BERM:stä johdettu testattava seuraus; FieldState voi kirjata kenttätilan.",
        tone: "hypothesis",
      },
      {
        step: "04 · EVOLUUTIO",
        title: "Valinta edellyttää periytyvää vaihtelua sukupolvien yli",
        text: "Ekologinen lajittuminen muuttuu evoluutioksi vasta, jos mitattuun fysikaaliseen kenttätilaan liittyvä kelpoisuusero kohdistuu toistuvasti periytyvään piirteeseen ja muuttaa sen jakaumaa. Pelkkä runsaus ei ole evoluutiotulos.",
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
        source: { label: "Clarke ym. 2013", referenceId: "clarke2013_bee_electroreception" },
      },
      {
        id: "ISÄNTÄ–LOINEN",
        title: "Punkit, kukkapunkit ja isäntäkohtaaminen",
        text: "Ixodes-veto, kukkapunkin kuljetus ja loisen kiinnittyminen tekevät kohtaamisnopeudesta mitattavan välitilan. Punkin sähköstaattinen toimivuus ei ole näyttö RF-/ELF-immuniteetista; robustius on osoitettava kenttäluokka kerrallaan.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
      },
      {
        id: "NAVIGOINTI",
        title: "Muuttoliike ja orientaatio",
        text: "Kryptokromi- ja lintukompassijärjestelmät osoittavat, miksi taustavektori, valo ja kapeat taajuusikkunat tarvitsevat nimenomaisen mittauksen. Päätepiste voi olla reittivalinta tai paluu, ei välttämättä kuolleisuus.",
        source: { label: "Engels ym. 2014", referenceId: "engels2014" },
      },
      {
        id: "DISPERSAALI",
        title: "Leviäminen ja kolonisaatio",
        text: "Sähkökentän laukaisema hämähäkkien ballooning osoittaa fysikaalisen reitin paikallisesta kenttägeometriasta dispersaaliin. Toistuva muutos dispersaalissa voi muovata kolonisaatiota, geenivirtaa ja metapopulaatiorakennetta.",
        source: { label: "Morley & Robert 2018", referenceId: "morley2018_spider_ballooning" },
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
        source: { label: "Shafik, Ibrahim & El-Sayed 1992", referenceId: "shafik1992" },
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
        source: { label: "Dincmen, Hauser & Gursoy 2016", referenceId: "dincmen2016" },
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
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
      },
      {
        symbol: "E_DC · E(f)",
        title: "Kuljetus ja aistiminen ovat erillisiä siirtofunktioita",
        text: "Punkkikoe osoittaa napaisuudesta riippumattoman induktiokuljetuksen. Varroalla varauksen merkki muutti käyttäytymistä; kukkapunkeilla moduloitu vihje yhdistyi staattiseen kuljetukseen; mehiläisen laskeutuminen erosi 50 Hz AC- ja positiivisessa DC-kentässä. BERM rekisteröi nämä komponenttikohtaisina siirtoina, ei yhtenä yleisenä ‘sähköherkkyytenä’. ",
      },
      {
        symbol: "ε′ · ε″ · σ(f) · τ",
        title: "Morfologia on mitattava siirtofunktio, ei suojakilpi-leima",
        text: "Vahamainen kutikula voi muuttaa varauksen vuotoa ja säilymistä, kun taas dielektrinen polarisoituvuus määrää aiheutettua vetoa; niiden suunnat eivät välttämättä ole samat. Erottavat laji- ja elinvaihemittaukset ovat permittiivisyys ja häviö, johtavuus, Q-purkautuminen, kutikulan paksuus/muoto, massa, tarsaaliadheesio sekä karva-/tarsimekaniikka.",
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
        text: "Malli pitää iho-/karva-/rajapinta-aistimisen ja autonomisen kontekstin nimenomaisena reittinä HPA_HPG:hen. Alavirtaan miessteroidogeneesi, ovulaation kello ja implantaatio säilyvät erillisinä eivätkä romahda yhdeksi endokriiniseksi kertoimeksi.",
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
        text: "Ixodes ricinus -nymfeillä tehdyissä kontrolloiduissa kokeissa havaittiin passiivista vetoa sähköstaattisesti varattuihin isäntämateriaaleihin lyhyen ilmarakon yli. Raportoitu riippumattomuus kentän napaisuudesta sopii punkissa aiheutuvaan polarisaatioon, ei vaadittuun pysyvään punkkivaraukseen.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
        tone: "direct",
      },
      {
        tag: "SUORA FYSIKAALINEN KONTEKSTI",
        title: "Isäntä–kasvillisuus-geometria merkitsee",
        text: "Samassa työssä mallinnettiin varattua isäntää kasvillisuuden lähellä ja testattiin isäntää muistuttavaa sähköstaattista asetelmaa. Se tukee paikallista isäntä–kasvillisuusgradienttia mitattavana fysikaalisena rajapintana; se ei ole populaatioekologinen arvio.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
        tone: "direct",
      },
      {
        tag: "SUORA RF-FYSIOLOGIA",
        title: "Samalla punkilla on erillinen RF-fysiologiavaste",
        text: "Kontrolloidussa 900 MHz:n kokeessa Ixodes ricinus -punkin synganglioissa havaittiin sukupuoli-, intensiteetti- ja aikakohtaisia neuropeptidi-/reseptoritranskriptien muutoksia. Tämä sijoittaa punkin RF-fysiologian omaan komponenttikohtaiseen haaraansa; se ei korvaa staattista kontaktimekanismia.",
        source: { label: "Šofranková ym. 2023", referenceId: "sofrankova2023" },
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
      "Ekologinen tulos on suhteellinen: laji voi yleistyä, koska sen kelpoisuus mitatussa fysikaalisessa kenttätilassa heikkenee vähemmän kuin kilpailijan, isännän, saaliin tai pedon. Nämä ovat BERM:stä johdettuja tutkimusennusteita.",
    selectionEquation:
      "Δ log(Nᵢ/Nⱼ) = log Wᵢ(FieldState, EcoContext) − log Wⱼ(FieldState, EcoContext)",
    evolutionText:
      "Ekologinen valikoituminen muuttuu evolutiiviseksi muutokseksi vasta, kun rajapinta-, aisti- tai palautumisominaisuuksissa on periytyvää vaihtelua ja mitattuun fysikaaliseen kenttätilaan liittyvä kelpoisuusero säilyy sukupolvien yli. BERM rekisteröi siksi erillisen ajassa indeksoidun piirrejakautumatilan eikä käsittele yksittäistä runsauseroa evoluutiona.",
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
    selectionLandscapeNote: "Lajien sijainnit ovat BERM-Eco-arvioita [H] ehdokasmekanismien perusteella, eivät kvantitatiivisia kelpoisuusmittauksia. Hajontakuvaaja havainnollistaa BERM-hypoteesia muuttuneesta fysikaalisesta kenttäympäristöstä; FieldState vain mittaisi ympäristön.",
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
        referenceId: "england_2023_ticks",
        text: "Kontrolloidut I. ricinus -kokeet sähköstaattisesta vedosta ja isäntä–kasvillisuus-kentän mallinnuksesta.",
      },
      {
        label: "England ym. (2022), Biological Reviews",
        referenceId: "england2022_electric_ecology",
        text: "Sähköekologian ja sähköreseption katsaus; laaja konteksti, ei punkkipopulaation vaikutusarvio.",
      },
      {
        label: "Šofranková ym. (2023), Pathogens",
        referenceId: "sofrankova2023",
        text: "Kontrolloitu 900 MHz:n altistus ja neuropeptidi-/reseptoritranskriptivaste I. ricinus -synganglioissa: erillinen RF-fysiologiahaara.",
      },
      {
        label: "Shafik, Ibrahim & El-Sayed (1992), Andrologia",
        referenceId: "shafik1992",
        text: "Ihmisen tekstiili–iho-mittaus, jossa historiallinen rajapintalukema riippui materiaalista; se on suhteellinen signaali, ei elinkentän muunnos.",
      },
      {
        label: "Dincmen, Hauser & Gursoy (2016), AATCC Journal of Research",
        referenceId: "dincmen2016",
        text: "Kontrolloitu PET:n antistaattisen käsittelyn ja varauksen purkautumisen mittaus, jossa varauksen säilymisaika muuttui voimakkaasti.",
      },
      {
        label: "Colin ym. (1992), Journal of Insect Physiology",
        referenceId: "colin1992_varroa_electrostatic",
        text: "Varroa jacobsoni -nimellä julkaistu varausherkän käyttäytymisen tutkimus — Apis mellifera -tuholaiskontekstissa nykyisin yleensä V. destructor; ektoparasiitin kontaktisolmu, ei pesäromahdusarvio.",
      },
      {
        label: "Mallinson, Woodburn & O’Reilly (2025), iScience",
        referenceId: "mallinson2025_electric_pollution",
        text: "Komponentti- ja polariteettitarkka ihmisen synnyttämän sähkökentän vaikutus mehiläisen kukalle laskeutumiseen pareittaisessa kenttäkokeessa.",
      },
      {
        label: "García-Robledo, Dierick & Manser (2025), PNAS",
        referenceId: "garcia_robledo2025",
        text: "Kukkapunkkien sähköreseptio ja sähköstaattinen isäntäkuljetus: ekologisen elinkierron mekanismi toisessa punkkiryhmässä.",
      },
    ],
    sentinelLink: "Indikaattoritutkimuksen datavalmius",
    measurementLink: "FieldState-mittausprotokolla",
    modelLink: "Avaa FieldState-mittausmäärittely",
    host: "Isännän pinta",
    interface: "Staattinen ilmarakorajapinta",
    vegetation: "Kasvillisuus / maa",
    tick: "Punkki",
    hostText: "kontakti ja hankaus voivat synnyttää staattista varausta",
    interfaceText: "paikallinen geometria, etäisyys ja kosteus muovaavat mitattua kenttää",
    vegetationText: "materiaali ja maadoitus ovat fysikaalisia reunaehtoja",
    tickText: "passiivinen induktio ja kiinnittyminen ovat empiirisiä päätepisteitä",
  },
  ja: {
    frameworkTitle: "BERM-Eco: 測定された場、生態学的選別、選択",
    frameworkLead:
      "生態学部門はヒトモデルと同じ物理的前提を検証します: 生物は単一の一般的な「EMF線量」に遭遇するのではなく、測定された電磁場構成に遭遇し、各種は独自の感覚的・形態学的・発達段階固有の伝達関数を持っています。これにより、すべての種を均一に感受性または耐性があると扱うことなく、相対的な生態学的結果を検証可能にします。",
    fieldClasses: [
      {
        symbol: "E_DC · Q · ∇|E|²",
        title: "静電 / 摩擦帯電界面",
        text: "電荷、基準電位、局所電場勾配、幾何学、接地、湿度が局所輸送と付着を支配する。これはダニ-宿主研究で確立されたフィールドクラスであり、RFや地磁気のプロキシではない。",
        source: { label: "England & Robert 2022", referenceId: "england2022_electric_ecology" },
      },
      {
        symbol: "E_AC(f) · B(f) · dE/dt",
        title: "ELF電場および磁場",
        text: "時間変動する電気・磁気成分は波形・極性・幾何学・誘導局所伝達を含めて別々に測定する必要がある。静電付着の結果をELF応答の主張にコピーすることはできない。",
        source: { label: "Mallinson, Woodburn & O'Reilly 2025", referenceId: "mallinson2025_electric_pollution" },
      },
      {
        symbol: "B₀ · 傾斜角 · 光",
        title: "地磁気方位決定",
        text: "背景ベクトルの方向と傾斜角は情報を持つことがあり、受容は光・時計状態・発達段階にも依存しうる。この分岐は電場輸送とは異なる。",
        source: { label: "Wan et al. 2021", referenceId: "wan2021_cryptochrome_monarch" },
      },
      {
        symbol: "S(f, 偏波, 時間)",
        title: "RFスペクトルと時間構造",
        text: "搬送波周波数だけでは不十分: スペクトル、偏波、変調、背景、曝露幾何学が重要になりうる。一部の鳥類コンパス実験では、妨害は一般的なRF効果ではなく周波数窓特異的である。",
        source: { label: "Leberecht et al. 2023", referenceId: "leberecht2023_rf_compass_upper_bound" },
      },
    ],
    ladderTitle: "4つの主張、1つの因果連鎖",
    ladderLead:
      "BERM-Ecoは、確立されたものと次に検証すべきものを区別することで説明力を得る。以下の連鎖は仮説の格下げではなく、メカニズムから選択へ進むのに必要な証拠を定義する。",
    ladder: [
      {
        step: "01 · 自然機能",
        title: "電磁場は生物学的シグナルまたは力でありうる",
        text: "電場・磁場は異なる生物の花探索・方位決定・分散・宿主遭遇を誘導できる。これはBERMがベクトル・幾何学・時間を物理入力として検証する根拠となり、FieldStateはそれらを記録する任意の測定分岐に限られる。",
        source: { label: "England & Robert 2022", referenceId: "england2022_electric_ecology" },
        tone: "direct",
      },
      {
        step: "02 · 測定された応答",
        title: "BERMは測定された場の変化がエンドポイントを変えるか検証する",
        text: "対応するシャム対照実験は、成分特異的な行動的・生理学的応答を確立できる。それ自体では個体群トレンドや普遍的な種効果を確立しない。",
        source: { label: "Mallinson, Woodburn & O'Reilly 2025", referenceId: "mallinson2025_electric_pollution" },
        tone: "direct",
      },
      {
        step: "03 · 生態学的選別",
        title: "異なる応答関数が遭遇を再構成しうる",
        text: "同一の測定された物理的場条件が花粉媒介者・宿主・寄生者・捕食者・競争者を異なる形で変化させる場合、訪問・付着・ナビゲーション・分散率が相対適応度と群集構造を変える可能性がある。これはBERMから導出される検証可能な帰結であり、FieldStateは条件を記録できる。",
        tone: "hypothesis",
      },
      {
        step: "04 · 進化",
        title: "選択には世代を超えた遺伝的変異が必要",
        text: "生態学的選別は、測定された物理的場条件に関連する適応度差が遺伝的形質に反復作用し、その分布を変える場合にのみ進化となる。単なる個体数だけでは進化的結果ではない。",
        tone: "hypothesis",
      },
    ],
    systemsTitle: "高情報BERM-Ecoセンチネルシステム",
    systemsLead:
      "これらのシステムは、測定されたフィールド特性を近位の生物学的エンドポイントと結びつけるため価値がある。互換可能な線量モデルではなく、直接的なヒトTFR係数を提供しない。",
    systems: [
      {
        id: "POLLINATORS",
        title: "花粉媒介ネットワーク",
        text: "マルハナバチとミツバチは花の電気的手がかりを利用できる。人為的電場を用いた野外実験により、花への着地と訪問ネットワークが種特異的応答関数の直接的テスト場となる。",
        source: { label: "Clarke et al. 2013", referenceId: "clarke2013_bee_electroreception" },
      },
      {
        id: "HOST-PARASITE",
        title: "ダニ・花ダニ・宿主遭遇",
        text: "Ixodesの誘引、花ダニの輸送、寄生者の付着により遭遇率は測定可能な中間物となる。ダニの静電能力はRF/ELF免疫の証拠ではない; 堅牢性はフィールドクラスごとに示される必要がある。",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
      },
      {
        id: "NAVIGATION",
        title: "渡りと方位決定",
        text: "クリプトクロム依存系と鳥類コンパスシステムは、背景ベクトル・光・狭周波数窓が明示的測定に値する理由を示す。エンドポイントは必ずしも死亡率ではなく、経路選択や帰還でありうる。",
        source: { label: "Engels et al. 2014", referenceId: "engels2014" },
      },
      {
        id: "DISPERSAL",
        title: "分散と定着",
        text: "電場誘発のクモのバルーニングは局所電場幾何学から分散への物理的経路を実証する。分散の反復的変化は定着・遺伝子流動・メタ個体群構造を再構成しうる。",
        source: { label: "Morley & Robert 2018", referenceId: "morley2018_spider_ballooning" },
      },
    ],
    interfaceTitle: "静電摩擦帯電界面",
    interfaceLead:
      "これはBERM固有のFieldState分岐である: 宿主・空気間隙・植生・繊維・ダニが局所的静電界面を形成しうる。測定された局所伝達を通じてのみ生殖・生態状態と結びつく; 材料名や国別プロキシから結果への近道ではない。",
    reconstructionTitle: "歴史的読み取りから測定可能なFieldStateへ",
    reconstructionLead:
      "現行モデルは歴史的繊維所見を保持しつつ物理学を更新する。関連する対象は単独の「ポリエステル」ではなく、材料・身体・環境によって形成される時変参照界面状態{Q, V, E(r,t), ∇E², dE/dt, τ}である。DC界面輸送と低周波波形・極性手がかりも分離する。",
    staticMetrics: [
      {
        symbol: "V/cm²",
        title: "歴史的に報告されたV/cm²、組織電場単位ではない",
        text: "ShafikのV/cm²は物理的に不定な歴史的メーター読み値である。その設定でのポリエステル > ブレンド > 綿の順序を保持するが、プローブ面積・離隔距離・校正・接地/体基準なしには電荷・V/m・生殖腺内電場に変換できない。",
        source: { label: "Shafik, Ibrahim & El-Sayed 1992", referenceId: "shafik1992" },
      },
      {
        symbol: "Q · E · dE/dt",
        title: "測定チェーン",
        text: "再構成はFaraday cupで正味電荷を、名付けられた基準に対する電位を、局所ベクトルE(r,t)マップとその運動・静止・接触分離時の時間変化を測定する。基準電極・接地経路インピーダンス・基準への静電容量・プローブ方向/帯域/入力インピーダンスも記録する。幾何学と接地は入力であり、後付けではない。",
      },
      {
        symbol: "τ",
        title: "電荷保持は経験的時間関数",
        text: "単純な当てはめではQ(t)=Q₀e⁻ᵗ⁄ᵗᵃᵘだが、実際の繊維界面は速い減衰成分と遅い減衰成分を持ちうる。ある繊維テストでは未処理PETの電荷減衰半減期は2,000秒以上だったが、帯電防止処理により半減期は秒の端数から数秒に短縮された。",
        source: { label: "Dincmen, Hauser & Gursoy 2016", referenceId: "dincmen2016" },
      },
      {
        symbol: "RH · 運動 · 接地",
        title: "運動・湿度・ブレンド・接地が状態を決定する",
        text: "運動は帯電イベントを増加させ、静止は保持と漏洩を露呈する。相対湿度・皮膚水分・繊維率/仕上げ・空気間隙・圧力・靴底-床インピーダンス・帯電防止処理がQ・E・dE/dtを変える。チェック済み固定具ではτRC≈Rleak·Ceffが有用な比較指標; 測定された界面減衰は経験的である。これらはFieldState調節因子であり、一般的共変量ではない。",
      },
      {
        symbol: "∇E²",
        title: "同じ幾何学が繊維分岐とダニ分岐を結ぶ",
        text: "小さな分極可能なダニの静電誘引力は、遠方の電圧の符号ではなく、局所勾配∇(E²)に比例する。England et al.は自身の宿主-植生幾何学で300 kV/mを超えるホットスポットをモデル化した; 繊維界面の比較可能な量は測定された局所マップであり、推定変換ではない。",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
      },
      {
        symbol: "E_DC · E(f)",
        title: "輸送と感知は別の伝達関数",
        text: "ダニ実験は極性に依存しない誘導輸送を実証する。Varroaでは電荷の符号が行動を変えた; 花ダニは変調手がかりと静電輸送を組み合わせた; ミツバチの着地は50 Hz ACと正DCで異なった。BERMはこれらを単一の一般的「電気感受性」ではなく成分特異的伝達として記録する。",
      },
      {
        symbol: "ε′ · ε″ · σ(f) · τ",
        title: "形態は測定可能な伝達関数であり、遮蔽ラベルではない",
        text: "ワックス質のクチクラは電荷漏洩と保持を変える可能性がある一方、誘電分極性は誘導誘引を支配する; 両者は同方向に動くとは限らない。識別する種/段階測定は誘電率と損失・導電率・Q減衰・クチクラ厚/形状・質量・付節接着・毛/付節力学である。",
      },
    ],
    couplingTitle: "界面が既存のBERM生物学と結びつく場所",
    couplingLead:
      "STATIC_TRIBO_INTERFACEは物理ソースノードである。生殖係数を追加しない。その候補伝達経路はモデルの既存臓器特異的状態を再利用し、それぞれ独自の局所測定とエンドポイントマッピングが必要である。",
    couplingRoutes: [
      {
        id: "01",
        title: "局所生体電気伝達 → Vmem / Ca²⁺-redox",
        text: "測定された界面電場・幾何学・過渡パターンは膜電位およびCa²⁺/ミトコンドリアredox伝達の固有入力である。これはVMEM_MTORおよびA_VGCC_ROSへの経路であり、臓器全体の均一DC電場の仮定ではない。",
      },
      {
        id: "02",
        title: "表面感覚伝達 → HPA-HPG → ステロイド産生",
        text: "モデルは皮膚/毛/界面感知と自律神経コンテキストをHPA_HPGへの明示的経路として保持する。下流では男性ステロイド産生・排卵時計・着床が単一の内分泌乗数に崩壊するのではなく、区別されたまま残る。",
      },
      {
        id: "03",
        title: "Redox / Vmem記憶 → BTBおよび卵巣予備能",
        text: "静電分岐は、血液精巣関門・生殖系列予備能・卵巣予備能に到達するのは、既に登録されたA_VGCC_ROS・VMEM_MTOR・発達記憶状態を通じてのみ可能である。共有の繊維観察をグローバルバリア係数や女性容量主張に変換しない。",
      },
    ],
    evidenceTitle: "直接確立されたものと仮説のまま残るもの",
    evidence: [
      {
        tag: "直接物理的証拠",
        title: "静電場は短い空気間隙を越えてダニを引き寄せることができる",
        text: "Ixodes ricinus若虫を用いた制御実験で、静電帯電した宿主材料への短距離誘引が示された。報告された極性非依存性はダニの固定電荷ではなく誘導分極と一致する。",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
        tone: "direct",
      },
      {
        tag: "直接物理的文脈",
        title: "宿主-植生幾何学が重要",
        text: "同研究は植生近くの帯電宿主をモデル化し、宿主様の静電構成をテストした。局所的な宿主-植生勾配を測定すべき物理的界面として支持するが、個体群生態学的推定値ではない。",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
        tone: "direct",
      },
      {
        tag: "直接RF生理学",
        title: "同じダニに独立したRF生理学応答がある",
        text: "制御された900 MHz実験でIxodes ricinus合神経節に性別・強度・時間依存的な神経ペプチド/受容体転写変化が見られた。ダニRF生理学を独自の成分特異的分岐に配置する; 静電接触メカニズムを置き換えない。",
        source: { label: "Šofranková et al. 2023", referenceId: "sofrankova2023" },
        tone: "direct",
      },
      {
        tag: "モデル導出仮説",
        title: "界面感受性の差異は選択可能かもしれない",
        text: "種・発達段階・宿主-植生設定が同一の校正された静電場で付着確率が異なり、その差が実現された摂食や繁殖を変える場合、差異的選択は検証可能となる。この進化的連鎖はこの界面についてはまだ実証されていない。",
        tone: "hypothesis",
      },
    ],
    directTitle: "静電接触証拠が確立するもの",
    direct: [
      "正式なダニ実験はI. ricinus若虫で行われた。その実験システムにおける静電誘引メカニズムを確立するものであり、すべてのダニや外部寄生虫の普遍的閾値ではない。",
      "摩擦帯電は接触と摩擦が静電荷を生成しうるため関連する。研究はウサギの毛/脚と帯電アクリルを実験材料として使用した; すべての宿主・被毛・生息環境・気象条件に対して1つの固定電荷プロファイルを確立するものではない。",
      "電気生態学は生物-環境相互作用の有用な物理的文脈を提供するが、生態学的個体数・宿主接触・疾病リスクは多因子的結果である。",
    ],
    predictionTitle: "検証可能な生態学・進化仮説",
    predictionLead:
      "生態学的結果は相対的である: ある種は測定された物理的場条件下での適応度低下が競争者・宿主・被食者・捕食者より小さいため増加しうる。これらはBERMから導出された研究予測である。",
    selectionEquation:
      "Δ log(Nᵢ/Nⱼ) = log Wᵢ(FieldState, EcoContext) − log Wⱼ(FieldState, EcoContext)",
    evolutionText:
      "生態学的選別は、界面・感覚・回復形質が遺伝可能に変異し、測定された物理的場条件に関連する適応度差が世代を超えて持続する場合にのみ進化的変化となる。BERMは単一の個体数対比を進化として扱わず、時間インデックス付き形質分布状態を登録する。",
    evolutionEquation:
      "P₍g+1₎(θ) ∝ W(θ | FieldState, EcoContext) · P₍g₎(θ)",
    predictions: [
      {
        id: "ECO-S1",
        title: "種・発達段階特異的付着曲線",
        text: "同一の校正された静電勾配系列で、種と発達段階ごとに誘引・付着曲線を別々に推定する。共通曲線は仮定しない。",
      },
      {
        id: "ECO-S2",
        title: "界面依存性",
        text: "物理メカニズムが関連する場合、誘引は測定された静電構成が予測する方向に宿主表面電荷・植生/接地幾何学・空気間隙・湿度と共に変化するはずである。",
      },
      {
        id: "ECO-S3",
        title: "選択には適応度リンクが必要",
        text: "選択の主張には付着対比以上が必要: その対比が世代を超えた摂食成功・生存・繁殖を予測し、遺伝型または遺伝可能表現型が独立に測定される必要がある。",
      },
    ],
    selectionLandscapeTitle: "新たな進化的選択圧としてのEMF",
    selectionLandscapeP1: "変化した電磁環境は新たな自然選択の軸を生み出す。電磁感知に適応度が依存する種(花粉媒介・ナビゲーション・概日リズム調節)は不利になる。化学的・機械的戦略に依存する種は相対的に有利になる。この差異的感受性は緩やかな進化圧ではなく、1世紀未満で出現し、適応進化には速すぎた。",
    selectionLandscapeP2: "ミツバチ-Varroaシステムが最も明確な事例研究である: EMFは同時に宿主を弱体化させ寄生者に影響しないため、全ての他のストレス因子を増幅する「二重カスケード」を生む。",
    selectionLandscapeArticleLink: "事例研究: ミツバチが反撃できない理由",
    selectionLandscapeSentinelLink: "センチネルページの完全分析",
    selectionLandscapeNote: "種の位置は候補メカニズムに基づくBERM-Eco推定[H]で、定量的適応度測定ではない。散布図は物理的場環境の変化についてのBERM仮説を示し、FieldStateはその環境を記録するだけである。",
    protocolTitle: "最小識別研究デザイン",
    protocol: [
      "各試行で表面電位または局所静電場、幾何学、分離距離、材料、接地状態、温度、相対湿度を測定する。",
      "可能な場合は付着スコアリングを無作為化・盲検化する; 非帯電/シャム構成と臭気・CO₂・熱・振動・直接接触のコントロールを含める。",
      "1つの若虫データセットから外挿するのではなく、複数の分類群と発達段階をサンプリングする。",
      "進化的結果のために、フィールド/付着表現型を宿主利用・生存・繁殖データおよび事前指定された遺伝率/遺伝型分析と対にする。",
    ],
    boundaryTitle: "フィールドクラス規則",
    boundary: [
      "静電誘引と時変RF/ELF曝露は異なるFieldState成分である。BERMはある電場クラスから別のクラスへ応答をコピーするのではなく、伝達関数を分離する。",
      "ダニの静電能力は直接検証可能な接触メカニズムである。RF/ELF応答は別の種特異的伝達問題であり、対応する曝露・エンドポイント測定からの回答が必要である。",
    ],
    sourceTitle: "一次資料と文脈",
    sources: [
      {
        label: "England, Lihou & Robert (2023), Current Biology",
        referenceId: "england_2023_ticks",
        text: "制御されたI. ricinus静電誘引実験と宿主-植生電場モデリング。",
      },
      {
        label: "England et al. (2022), Biological Reviews",
        referenceId: "england2022_electric_ecology",
        text: "電気生態学と電気受容のレビュー; 広い文脈であり、ダニ個体群効果推定ではない。",
      },
      {
        label: "Šofranková et al. (2023), Pathogens",
        referenceId: "sofrankova2023",
        text: "制御された900 MHz曝露とI. ricinus合神経節の神経ペプチド/受容体転写応答: 独立したRF生理学分岐。",
      },
      {
        label: "Shafik, Ibrahim & El-Sayed (1992), Andrologia",
        referenceId: "shafik1992",
        text: "ヒト繊維-皮膚測定、材料依存的な歴史的界面読み取り; 相対シグナルであり臓器電場変換ではない。",
      },
      {
        label: "Dincmen, Hauser & Gursoy (2016), AATCC Journal of Research",
        referenceId: "dincmen2016",
        text: "制御されたPET帯電防止処理・電荷減衰測定、電荷保持時間の大きな変化を含む。",
      },
      {
        label: "Colin et al. (1992), Journal of Insect Physiology",
        referenceId: "colin1992_varroa_electrostatic",
        text: "原著でVarroa jacobsoniとして記載された電荷感受性行動 — 現在のApis mellifera害虫文脈ではV. destructorとして理解; 外部寄生虫接触アンカーであり、コロニー崩壊推定ではない。",
      },
      {
        label: "Mallinson, Woodburn & O'Reilly (2025), iScience",
        referenceId: "mallinson2025_electric_pollution",
        text: "ペア野外実験における成分・極性特異的な人為的電場のミツバチ花着地への影響。",
      },
      {
        label: "Garcia-Robledo, Dierick & Manser (2025), PNAS",
        referenceId: "garcia_robledo2025",
        text: "花ダニの電気受容と静電宿主輸送: 別のダニ群における生態学的生活史メカニズム。",
      },
    ],
    sentinelLink: "センチネル研究のデータ準備状況",
    measurementLink: "FieldState測定プロトコル",
    modelLink: "FieldState測定仕様を開く",
    host: "宿主表面",
    interface: "静電空気間隙界面",
    vegetation: "植生 / 接地",
    tick: "ダニ",
    hostText: "接触と摩擦が静電荷に寄与しうる",
    interfaceText: "局所幾何学・分離・湿度が測定電場を形成する",
    vegetationText: "材料と接地は物理的境界条件である",
    tickText: "受動的誘導と付着は経験的エンドポイントである",
  },
  fr: {
    frameworkTitle: "BERM-Eco : champs mesures, tri ecologique et selection",
    frameworkLead:
      "La branche ecologique teste la meme premisse physique que le modele humain : les organismes ne rencontrent pas une dose generique d'EMF. Ils rencontrent une configuration de champ mesuree, et chaque espece possede sa propre fonction de transfert sensorielle, morphologique et de stade de vie. Cela rend les resultats ecologiques relatifs testables sans traiter chaque espece comme uniformement sensible ou resistante.",
    fieldClasses: [
      {
        symbol: "E_DC · Q · ∇|E|²",
        title: "Interface statique / triboelectrique",
        text: "La charge, le potentiel de reference, le gradient de champ electrique local, la geometrie, la mise a la terre et l'humidite regissent le transport local et la fixation. Il s'agit de la classe de champ etablie dans les travaux tique-hote ; ce n'est pas un proxy pour les RF ou le geomagnetisme.",
        source: { label: "England & Robert 2022", referenceId: "england2022_electric_ecology" },
      },
      {
        symbol: "E_AC(f) · B(f) · dE/dt",
        title: "Champs electriques et magnetiques ELF",
        text: "Les composantes electriques et magnetiques variant dans le temps doivent etre mesurees separement, y compris la forme d'onde, la polarite, la geometrie et le transfert local induit. Un resultat de fixation statique ne peut pas etre copie dans une affirmation de reponse ELF.",
        source: { label: "Mallinson, Woodburn & O'Reilly 2025", referenceId: "mallinson2025_electric_pollution" },
      },
      {
        symbol: "B₀ · inclinaison · lumiere",
        title: "Orientation geomagnetique",
        text: "La direction et l'inclinaison du vecteur de fond peuvent etre porteuses d'information ; la reception peut aussi dependre de la lumiere, de l'horloge et du stade de developpement. Cette branche est distincte du transport par champ electrique.",
        source: { label: "Wan et al. 2021", referenceId: "wan2021_cryptochrome_monarch" },
      },
      {
        symbol: "S(f, polarisation, temps)",
        title: "Spectre RF et structure temporelle",
        text: "La frequence porteuse seule est insuffisante : le spectre, la polarisation, la modulation, le fond et la geometrie d'exposition peuvent importer. Dans certaines experiences de boussole aviaire, la perturbation est specifique a une fenetre de frequence plutot qu'un effet RF generique.",
        source: { label: "Leberecht et al. 2023", referenceId: "leberecht2023_rf_compass_upper_bound" },
      },
    ],
    ladderTitle: "Quatre affirmations, une sequence causale",
    ladderLead:
      "BERM-Eco gagne en puissance explicative en separant ce qui a ete etabli de ce qui est a tester ensuite. La sequence ci-dessous n'est pas une devalorisation de l'hypothese ; elle definit les preuves necessaires pour passer du mecanisme a la selection.",
    ladder: [
      {
        step: "01 · FONCTION NATURELLE",
        title: "Un champ peut etre un signal ou une force biologique",
        text: "Les champs electriques et magnetiques peuvent guider la recherche florale, l'orientation, la dispersion et la rencontre avec l'hote chez differents organismes. Cela motive BERM a tester le vecteur, la geometrie et le temps comme entrees physiques ; FieldState n'est que la branche de mesure optionnelle qui les enregistre.",
        source: { label: "England & Robert 2022", referenceId: "england2022_electric_ecology" },
        tone: "direct",
      },
      {
        step: "02 · REPONSE MESUREE",
        title: "Une modification mesuree du champ peut alterer un point final defini",
        text: "Une experience sham-controlee appariee peut etablir une reponse comportementale ou physiologique specifique au composant. Elle n'etablit pas en soi une tendance de population ou un effet d'espece universel.",
        source: { label: "Mallinson, Woodburn & O'Reilly 2025", referenceId: "mallinson2025_electric_pollution" },
        tone: "direct",
      },
      {
        step: "03 · TRI ECOLOGIQUE",
        title: "Differentes fonctions de reponse peuvent reorganiser les rencontres",
        text: "Si la meme condition physique de champ mesuree modifie differemment un pollinisateur, un hote, un parasite, un predateur ou un competiteur, les taux de visite, fixation, navigation ou dispersion peuvent modifier la fitness relative et la structure communautaire. C'est une consequence testable derivee de BERM ; FieldState peut enregistrer la condition.",
        tone: "hypothesis",
      },
      {
        step: "04 · EVOLUTION",
        title: "La selection requiert une variation heritee a travers les generations",
        text: "Le tri ecologique ne devient evolution que si la difference de fitness associee a la condition physique de champ mesuree agit de maniere repetee sur un trait heritable et modifie sa distribution. L'abondance seule n'est pas un resultat evolutif.",
        tone: "hypothesis",
      },
    ],
    systemsTitle: "Systemes sentinelles BERM-Eco a haute information",
    systemsLead:
      "Ces systemes sont precieux car chacun relie une caracteristique de champ mesuree a un point final biologique proximal. Ils ne sont pas des modeles de dose interchangeables et ne fournissent pas de coefficient TFR humain direct.",
    systems: [
      {
        id: "POLLINISATEURS",
        title: "Reseaux de pollinisateurs",
        text: "Les bourdons et les abeilles peuvent utiliser les indices electriques floraux. Les experiences de terrain avec des champs electriques anthropiques font de l'atterrissage floral et des reseaux de visites un banc d'essai direct pour les fonctions de reponse specifiques a l'espece.",
        source: { label: "Clarke et al. 2013", referenceId: "clarke2013_bee_electroreception" },
      },
      {
        id: "HOTE-PARASITE",
        title: "Tiques, acariens et rencontre avec l'hote",
        text: "L'attraction d'Ixodes, le transport des acariens de fleurs et la fixation des parasites font du taux de rencontre un intermediaire mesurable. La competence electrostatique d'une tique ne constitue pas une preuve d'immunite RF/ELF ; la robustesse doit etre demontree classe de champ par classe de champ.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
      },
      {
        id: "NAVIGATION",
        title: "Migration et orientation",
        text: "Les systemes dependants du cryptochrome et la boussole aviaire montrent pourquoi le vecteur de fond, la lumiere et les fenetres de frequence etroites meritent une mesure explicite. Le point final peut etre le choix de route ou le retour, pas necessairement la mortalite.",
        source: { label: "Engels et al. 2014", referenceId: "engels2014" },
      },
      {
        id: "DISPERSION",
        title: "Dispersion et colonisation",
        text: "Le ballooning des araignees induit par le champ electrique demontre une voie physique de la geometrie de champ locale a la dispersion. Des changements repetes de dispersion peuvent remodeler la colonisation, le flux genique et la structure de metapopulation.",
        source: { label: "Morley & Robert 2018", referenceId: "morley2018_spider_ballooning" },
      },
    ],
    interfaceTitle: "L'interface triboelectrique statique",
    interfaceLead:
      "Il s'agit d'une branche FieldState native de BERM : l'hote, l'entrefer, la vegetation, le textile et la tique peuvent former une interface electrostatique locale. Elle ne rejoint les etats reproductifs ou ecologiques que par un transfert local mesure ; ce n'est pas un raccourci d'un nom de materiau ou d'un proxy de pays vers un resultat.",
    reconstructionTitle: "D'une lecture historique a un FieldState mesurable",
    reconstructionLead:
      "Le modele actif conserve les resultats textiles historiques, mais ameliore leur physique. L'objet pertinent n'est pas le 'polyester' seul : c'est un etat d'interface reference, variant dans le temps {Q, V, E(r,t), ∇E², dE/dt, τ} faconne par le materiau, le corps et l'environnement. Il maintient aussi le transport d'interface DC separe des indices de forme d'onde et de polarite a basse frequence.",
    staticMetrics: [
      {
        symbol: "V/cm²",
        title: "V/cm² historiquement rapporte, pas une unite de champ tissulaire",
        text: "Le V/cm² de Shafik est une lecture historique physiquement sous-determinee. Il preserve l'ordre polyester > melange > coton observe dans ce dispositif, mais ne peut pas etre converti en charge, V/m ou champ intragonadique sans l'aire de sonde, l'ecartement, le calibrage et la reference terre/corps.",
        source: { label: "Shafik, Ibrahim & El-Sayed 1992", referenceId: "shafik1992" },
      },
      {
        symbol: "Q · E · dE/dt",
        title: "La chaine de mesure",
        text: "Une reconstruction mesure la charge nette avec une cage de Faraday, le potentiel par rapport a une reference nommee, une carte vectorielle locale E(r,t), et son changement temporel pendant le mouvement, le repos et la separation de contact. Elle enregistre aussi l'identite de l'electrode de reference, l'impedance du chemin de terre, la capacite par rapport a la reference, et l'orientation/bande passante/impedance d'entree de la sonde. La geometrie et la mise a la terre sont des entrees, pas des reflexions apres coup.",
      },
      {
        symbol: "τ",
        title: "La retention de charge est une fonction temporelle empirique",
        text: "Dans un ajustement simple Q(t)=Q₀e⁻ᵗ⁄ᵗᵃᵘ, mais les interfaces textiles reelles peuvent avoir des composantes de decroissance rapide et lente. Dans un test textile rapporte, le PET non traite avait une demi-vie de decroissance de charge superieure a 2 000 s, tandis que les traitements antistatiques reduisaient la demi-vie a des fractions de seconde a quelques secondes.",
        source: { label: "Dincmen, Hauser & Gursoy 2016", referenceId: "dincmen2016" },
      },
      {
        symbol: "RH · mouvement · terre",
        title: "Le mouvement, l'humidite, le melange et la mise a la terre definissent l'etat",
        text: "Le mouvement augmente les evenements de generation de charge ; le repos expose la retention et les fuites. L'humidite relative, l'humidite cutanee, la fraction/finition de fibre, l'entrefer, la pression, l'impedance chaussure-sol et le traitement antistatique modifient Q, E et dE/dt. Dans un montage controle, τRC≈Rleak·Ceff est un comparateur utile ; la decroissance d'interface mesuree reste empirique. Ce sont des modulateurs de FieldState, pas des covariables generiques.",
      },
      {
        symbol: "∇E²",
        title: "La meme geometrie relie les branches textile et tique",
        text: "Pour une petite tique polarisable, la force d'attraction electrostatique varie avec le gradient local ∇(E²), pas simplement le signe d'une tension distante. England et al. ont modelise des points chauds hote-vegetation depassant 300 kV/m dans leur geometrie declaree ; la quantite comparable pour une interface textile est une carte locale mesuree, pas une conversion estimee.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
      },
      {
        symbol: "E_DC · E(f)",
        title: "Le transport et la detection sont des fonctions de transfert separees",
        text: "L'experience sur les tiques demontre un transport induit independant de la polarite. Varroa a montre un comportement dependant du signe de la charge ; les acariens de fleurs ont combine un indice module avec le transport statique ; l'atterrissage des abeilles differait sous AC 50 Hz et DC positif. BERM enregistre ces transferts comme specifiques au composant, pas comme une seule 'sensibilite electrique' generique.",
      },
      {
        symbol: "ε′ · ε″ · σ(f) · τ",
        title: "La morphologie est une fonction de transfert mesurable, pas une etiquette de bouclier",
        text: "Une cuticule cireuse peut modifier la fuite et la retention de charge, tandis que la polarisabilite dielectrique gouverne l'attraction induite ; les deux ne se deplacent pas necessairement dans la meme direction. Les mesures discriminantes espece/stade sont la permittivite et la perte, la conductivite, la decroissance de Q, l'epaisseur/forme de cuticule, la masse, l'adhesion tarsale et la mecanique poils/tarses.",
      },
    ],
    couplingTitle: "Ou l'interface rejoint la biologie BERM existante",
    couplingLead:
      "STATIC_TRIBO_INTERFACE est un noeud source physique. Il n'ajoute pas de coefficient de fertilite. Ses routes de transfert candidates reutilisent les etats specifiques aux organes existants du modele, chacun necessitant encore sa propre mesure locale et sa cartographie de point final.",
    couplingRoutes: [
      {
        id: "01",
        title: "Transfert bioelectrique local → Vmem / Ca²⁺-redox",
        text: "Le champ d'interface mesure, la geometrie et le motif transitoire sont les entrees natives pour un transfert local de potentiel de membrane et Ca²⁺/redox mitochondrial. C'est la voie vers VMEM_MTOR et A_VGCC_ROS — pas un champ DC uniforme suppose a travers tout l'organe.",
      },
      {
        id: "02",
        title: "Transfert sensoriel de surface → HPA-HPG → steroidogenese",
        text: "Le modele maintient la detection peau/poil/interface et le contexte autonome comme voie explicite vers HPA_HPG. En aval, la steroidogenese masculine, l'horloge ovulatoire et l'implantation restent distinctes plutot que de s'effondrer en un seul multiplicateur endocrinien.",
      },
      {
        id: "03",
        title: "Memoire redox / Vmem → BTB et reserve ovarienne",
        text: "La branche statique ne peut atteindre la barriere hemato-testiculaire, la reserve germinale ou la reserve ovarienne qu'a travers les etats A_VGCC_ROS, VMEM_MTOR et de memoire developpementale deja enregistres. Elle ne transforme pas l'observation textile partagee en un coefficient de barriere global ou une affirmation de capacite feminine.",
      },
    ],
    evidenceTitle: "Ce qui est directement etabli, et ce qui reste une hypothese",
    evidence: [
      {
        tag: "PREUVE PHYSIQUE DIRECTE",
        title: "Les champs statiques peuvent attirer des tiques a travers un court entrefer",
        text: "Des experiences controlees avec des nymphes d'Ixodes ricinus ont montre une attraction passive vers des materiaux hotes charges electrostatiquement a travers de courts entrefers. L'independance a la polarite rapportee est coherente avec une polarisation induite dans la tique plutot qu'une charge fixe requise.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
        tone: "direct",
      },
      {
        tag: "CONTEXTE PHYSIQUE DIRECT",
        title: "La geometrie hote-vegetation compte",
        text: "Le meme travail a modelise des hotes charges pres de la vegetation et teste une configuration electrostatique semblable a un hote. Il soutient un gradient local hote-vegetation comme interface physique a mesurer ; ce n'est pas une estimation d'ecologie des populations.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
        tone: "direct",
      },
      {
        tag: "PHYSIOLOGIE RF DIRECTE",
        title: "La meme tique a une reponse de physiologie RF separee",
        text: "Dans une experience controlee a 900 MHz, les synganglia d'Ixodes ricinus ont montre des changements de transcrits neuropeptide/recepteur dependants du sexe, de l'intensite et du temps. Cela place la physiologie RF de la tique dans sa propre branche specifique au composant ; cela ne remplace pas le mecanisme de contact statique.",
        source: { label: "Šofranková et al. 2023", referenceId: "sofrankova2023" },
        tone: "direct",
      },
      {
        tag: "HYPOTHESE DERIVEE DU MODELE",
        title: "La sensibilite differentielle de l'interface peut etre selectionnable",
        text: "Si les especes, stades de vie ou configurations hote-vegetation different en probabilite de fixation sous le meme champ statique calibre, et que cette difference modifie l'alimentation ou la reproduction realisee, la selection differentielle devient testable. Cette chaine evolutive n'a pas encore ete demontree pour cette interface.",
        tone: "hypothesis",
      },
    ],
    directTitle: "Ce que les preuves de contact statique etablissent",
    direct: [
      "Les experiences formelles sur les tiques ont ete realisees avec des nymphes d'I. ricinus. Elles etablissent un mecanisme d'attraction electrostatique statique dans ce systeme experimental, pas un seuil universel pour toutes les tiques ou ectoparasites.",
      "La charge triboelectrique est pertinente car le contact et la friction entre materiaux peuvent generer une charge statique. L'etude a utilise de la fourrure/pattes de lapin et de l'acrylique charge comme materiaux experimentaux ; elle n'etablit pas un profil de charge fixe pour chaque hote, pelage, habitat ou condition meteorologique.",
      "L'ecologie electrique fournit un contexte physique utile pour les interactions organisme-environnement, mais l'abondance ecologique, le contact avec l'hote et le risque de maladie restent des resultats multi-causaux.",
    ],
    predictionTitle: "Hypotheses d'ecologie et d'evolution testables",
    predictionLead:
      "Le resultat ecologique est relatif : une espece peut devenir plus commune parce que sa fitness sous la condition physique de champ mesuree decline moins que celle d'un competiteur, hote, proie ou predateur. Ce sont des predictions de recherche derivees de BERM.",
    selectionEquation:
      "Δ log(Nᵢ/Nⱼ) = log Wᵢ(FieldState, EcoContext) − log Wⱼ(FieldState, EcoContext)",
    evolutionText:
      "Le tri ecologique ne devient un changement evolutif que lorsque les traits d'interface, sensoriels ou de recuperation varient de maniere heritable et que la difference de fitness associee a la condition physique de champ mesuree persiste a travers les generations. BERM enregistre donc un etat de distribution de traits indexe dans le temps separe plutot que de traiter un seul contraste d'abondance comme de l'evolution.",
    evolutionEquation:
      "P₍g+1₎(θ) ∝ W(θ | FieldState, EcoContext) · P₍g₎(θ)",
    predictions: [
      {
        id: "ECO-S1",
        title: "Courbes de fixation specifiques a l'espece et au stade",
        text: "Sous la meme serie de gradients statiques calibres, estimer les courbes d'attraction et de fixation separement pour les especes et stades de vie. Une courbe commune n'est pas supposee.",
      },
      {
        id: "ECO-S2",
        title: "Dependance de l'interface",
        text: "Si le mecanisme physique est pertinent, l'attraction devrait changer avec la charge de surface de l'hote, la geometrie vegetation/mise a la terre, l'entrefer et l'humidite dans les directions predites par la configuration electrostatique mesuree.",
      },
      {
        id: "ECO-S3",
        title: "La selection requiert un lien de fitness",
        text: "Une affirmation de selection requiert plus qu'un contraste de fixation : le contraste doit predire le succes alimentaire, la survie ou la reproduction a travers les generations, avec le genotype ou le phenotype heritable mesure independamment.",
      },
    ],
    selectionLandscapeTitle: "L'EMF comme nouvelle pression de selection evolutive",
    selectionLandscapeP1: "L'environnement electromagnetique modifie cree un nouvel axe de selection naturelle. Les especes dont la fitness depend de la detection electromagnetique (pollinisation, navigation, regulation circadienne) sont desavantagees. Les especes dont la fitness depend de strategies chimiques ou mecaniques sont relativement avantagees. Cette susceptibilite differentielle n'est pas une pression evolutive graduelle — elle est apparue en moins d'un siecle, bien trop vite pour l'evolution adaptative.",
    selectionLandscapeP2: "Le systeme abeille-Varroa est l'etude de cas la plus claire : l'EMF affaiblit simultanement l'hote et n'affecte pas le parasite, creant une « double cascade » qui amplifie tous les autres facteurs de stress.",
    selectionLandscapeArticleLink: "Etude de cas : Pourquoi les abeilles ne peuvent pas riposter",
    selectionLandscapeSentinelLink: "Analyse complete sur la page sentinelle",
    selectionLandscapeNote: "Les positions des especes sont des estimations BERM-Eco [H] basees sur des mecanismes connus, pas des mesures quantitatives de fitness. Le graphique illustre une hypothese BERM concernant un environnement physique de champ modifie ; FieldState ne ferait qu'enregistrer cet environnement.",
    protocolTitle: "Protocole d'etude discriminant minimal",
    protocol: [
      "Mesurer le potentiel de surface ou le champ statique local, la geometrie, la distance de separation, le materiau, l'etat de mise a la terre, la temperature et l'humidite relative pour chaque essai.",
      "Randomiser et aveugler la notation de fixation lorsque possible ; inclure des configurations non chargees/sham et des controles pour l'odeur, le CO₂, la chaleur, les vibrations et le contact direct.",
      "Echantillonner plusieurs taxons et stades de vie au lieu d'extrapoler a partir d'un seul jeu de donnees nymphal.",
      "Pour un resultat evolutif, apparier les phenotypes de champ/fixation avec des donnees d'utilisation de l'hote, de survie ou de reproduction et une analyse d'heritabilite ou de genotype pre-specifiee.",
    ],
    boundaryTitle: "Regle de classe de champ",
    boundary: [
      "L'attraction electrostatique statique et l'exposition RF/ELF variant dans le temps sont des composantes FieldState differentes. BERM maintient leurs fonctions de transfert separees au lieu de copier une reponse d'une classe de champ a une autre.",
      "La competence electrostatique de la tique est un mecanisme de contact directement testable. La reponse RF/ELF est une question de transfert separee, specifique a l'espece, dont la reponse doit provenir d'une mesure d'exposition et de point final appariee.",
    ],
    sourceTitle: "Sources primaires et contexte",
    sources: [
      {
        label: "England, Lihou & Robert (2023), Current Biology",
        referenceId: "england_2023_ticks",
        text: "Experiences controlees d'attraction electrostatique d'I. ricinus et modelisation du champ hote-vegetation.",
      },
      {
        label: "England et al. (2022), Biological Reviews",
        referenceId: "england2022_electric_ecology",
        text: "Revue d'ecologie electrique et d'electroreception ; contexte large, pas une estimation d'effet sur la population de tiques.",
      },
      {
        label: "Šofranková et al. (2023), Pathogens",
        referenceId: "sofrankova2023",
        text: "Exposition controlee a 900 MHz et reponse des transcrits neuropeptide/recepteur dans les synganglia d'I. ricinus : une branche de physiologie RF separee.",
      },
      {
        label: "Shafik, Ibrahim & El-Sayed (1992), Andrologia",
        referenceId: "shafik1992",
        text: "Mesures textile-peau humaines montrant une lecture d'interface historique dependante du materiau ; un signal relatif, pas une conversion de champ d'organe.",
      },
      {
        label: "Dincmen, Hauser & Gursoy (2016), AATCC Journal of Research",
        referenceId: "dincmen2016",
        text: "Mesures controlees de traitement antistatique PET et de decroissance de charge, incluant un grand changement du temps de retention de charge.",
      },
      {
        label: "Colin et al. (1992), Journal of Insect Physiology",
        referenceId: "colin1992_varroa_electrostatic",
        text: "Comportement sensible a la charge chez Varroa jacobsoni tel que nomme dans l'etude originale — maintenant generalement compris comme V. destructor dans ce contexte de ravageur d'Apis mellifera ; un ancrage de contact d'ectoparasite, pas une estimation d'effondrement de colonie.",
      },
      {
        label: "Mallinson, Woodburn & O'Reilly (2025), iScience",
        referenceId: "mallinson2025_electric_pollution",
        text: "Effet specifique au composant et a la polarite d'un champ electrique anthropique sur l'atterrissage floral des abeilles dans une experience de terrain appariee.",
      },
      {
        label: "Garcia-Robledo, Dierick & Manser (2025), PNAS",
        referenceId: "garcia_robledo2025",
        text: "Electroreception des acariens de fleurs et transport electrostatique de l'hote : un mecanisme de cycle de vie ecologique dans un autre groupe d'acariens.",
      },
    ],
    sentinelLink: "Disponibilite des donnees d'etude sentinelle",
    measurementLink: "Protocole de mesure FieldState",
    modelLink: "Ouvrir la specification de mesure FieldState",
    host: "Surface de l'hote",
    interface: "Interface d'entrefer statique",
    vegetation: "Vegetation / terre",
    tick: "Tique",
    hostText: "le contact et la friction peuvent contribuer a la charge statique",
    interfaceText: "la geometrie locale, la separation et l'humidite faconnent le champ mesure",
    vegetationText: "le materiau et la mise a la terre sont des conditions aux limites physiques",
    tickText: "l'induction passive et la fixation sont des points finaux empiriques",
  },
  ko: {
    frameworkTitle: "BERM-Eco: 측정된 장, 생태학적 선별 및 선택",
    frameworkLead:
      "생태학 분과는 인간 모델과 동일한 물리적 전제를 검증합니다: 생물은 하나의 일반적인 'EMF 선량'을 만나는 것이 아닙니다. 측정된 전자기장 구성을 만나며, 각 종은 고유한 감각적, 형태학적, 발달 단계별 전달 함수를 가집니다. 이는 모든 종을 균일하게 민감하거나 저항성이 있다고 취급하지 않고 상대적 생태학적 결과를 검증 가능하게 합니다.",
    fieldClasses: [
      {
        symbol: "E_DC · Q · ∇|E|²",
        title: "정전 / 마찰대전 계면",
        text: "전하, 기준 전위, 국소 전기장 기울기, 기하학, 접지, 습도가 국소 수송과 부착을 지배한다. 이것은 진드기-숙주 연구에서 확립된 필드 클래스이며, RF나 지자기의 프록시가 아니다.",
        source: { label: "England & Robert 2022", referenceId: "england2022_electric_ecology" },
      },
      {
        symbol: "E_AC(f) · B(f) · dE/dt",
        title: "ELF 전기장 및 자기장",
        text: "시변 전기 및 자기 성분은 파형, 극성, 기하학, 유도 국소 전달을 포함하여 별도로 측정해야 한다. 정전 부착 결과를 ELF 반응 주장으로 복사할 수 없다.",
        source: { label: "Mallinson, Woodburn & O'Reilly 2025", referenceId: "mallinson2025_electric_pollution" },
      },
      {
        symbol: "B₀ · 경사 · 광",
        title: "지자기 방위 결정",
        text: "배경 벡터 방향과 경사는 정보를 담을 수 있으며, 수용은 빛, 시계 상태, 발달 단계에도 의존할 수 있다. 이 분기는 전기장 수송과 구별된다.",
        source: { label: "Wan et al. 2021", referenceId: "wan2021_cryptochrome_monarch" },
      },
      {
        symbol: "S(f, 편파, 시간)",
        title: "RF 스펙트럼 및 시간 구조",
        text: "반송파 주파수만으로는 불충분하다: 스펙트럼, 편파, 변조, 배경, 노출 기하학이 중요할 수 있다. 일부 조류 나침반 실험에서 교란은 일반적 RF 효과가 아닌 주파수 창 특이적이었다.",
        source: { label: "Leberecht et al. 2023", referenceId: "leberecht2023_rf_compass_upper_bound" },
      },
    ],
    ladderTitle: "네 가지 주장, 하나의 인과 연쇄",
    ladderLead:
      "BERM-Eco는 확립된 것과 다음에 검증할 것을 구분하여 설명력을 얻는다. 아래 연쇄는 가설의 격하가 아니라, 메커니즘에서 선택으로 이동하는 데 필요한 증거를 정의한다.",
    ladder: [
      {
        step: "01 · 자연 기능",
        title: "전자기장은 생물학적 신호 또는 힘이 될 수 있다",
        text: "전기장과 자기장은 여러 생물의 탐색, 방위, 분산과 숙주 조우에 관여할 수 있다. 이는 BERM이 벡터·기하·시간을 물리 입력으로 검사할 동기를 주며 FieldState는 이를 기록하는 선택적 측정 분기일 뿐이다.",
        source: { label: "England & Robert 2022", referenceId: "england2022_electric_ecology" },
        tone: "direct",
      },
      {
        step: "02 · 측정된 반응",
        title: "측정된 장 변화는 정의된 종점을 변경할 수 있다",
        text: "대응하는 가짜 대조 실험은 성분 특이적 행동 또는 생리적 반응을 확립할 수 있다. 그 자체로 개체군 추세나 보편적 종 효과를 확립하지 않는다.",
        source: { label: "Mallinson, Woodburn & O'Reilly 2025", referenceId: "mallinson2025_electric_pollution" },
        tone: "direct",
      },
      {
        step: "03 · 생태학적 선별",
        title: "서로 다른 반응 함수가 조우를 재구성할 수 있다",
        text: "동일하게 측정된 물리적 장 조건이 수분매개자, 숙주, 기생자, 포식자, 경쟁자를 다르게 변화시키면 방문, 부착, 탐색, 분산율이 상대적 적합도와 군집 구조를 변경할 수 있다. 이것은 BERM에서 도출된 검증 가능한 귀결이며 FieldState는 그 조건을 기록할 수 있다.",
        tone: "hypothesis",
      },
      {
        step: "04 · 진화",
        title: "선택에는 세대를 넘는 유전적 변이가 필요하다",
        text: "생태학적 선별은 측정된 물리적 장 조건과 연관된 적합도 차이가 유전 가능한 형질에 반복 작용하여 분포를 변경할 때만 진화가 된다. 단순한 개체수만으로는 진화적 결과가 아니다.",
        tone: "hypothesis",
      },
    ],
    systemsTitle: "고정보 BERM-Eco 감시 시스템",
    systemsLead:
      "이 시스템들은 측정된 전자기장 특성을 근위 생물학적 종점과 연결하기 때문에 가치가 있다. 상호 교환 가능한 선량 모델이 아니며 직접적인 인간 TFR 계수를 제공하지 않는다.",
    systems: [
      {
        id: "POLLINATORS",
        title: "수분매개 네트워크",
        text: "뒤영벌과 꿀벌은 꽃의 전기적 단서를 이용할 수 있다. 인위적 전기장을 이용한 현장 실험은 꽃 착지와 방문 네트워크를 종 특이적 반응 함수의 직접적 시험대로 만든다.",
        source: { label: "Clarke et al. 2013", referenceId: "clarke2013_bee_electroreception" },
      },
      {
        id: "HOST-PARASITE",
        title: "진드기, 꽃응애, 숙주 조우",
        text: "Ixodes 유인, 꽃응애 수송, 기생자 부착으로 조우율이 측정 가능한 중간물이 된다. 진드기의 정전 능력은 RF/ELF 면역의 증거가 아니다; 견고성은 필드 클래스별로 보여야 한다.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
      },
      {
        id: "NAVIGATION",
        title: "이동과 방위 결정",
        text: "크립토크롬 의존 시스템과 조류 나침반 시스템은 배경 벡터, 빛, 좁은 주파수 창이 명시적 측정에 값하는 이유를 보여준다. 종점은 반드시 사망률이 아니라 경로 선택이나 귀환일 수 있다.",
        source: { label: "Engels et al. 2014", referenceId: "engels2014" },
      },
      {
        id: "DISPERSAL",
        title: "분산과 정착",
        text: "전기장 유발 거미 발루닝은 국소 전기장 기하학에서 분산으로의 물리적 경로를 보여준다. 분산의 반복적 변화는 정착, 유전자 흐름, 메타개체군 구조를 재구성할 수 있다.",
        source: { label: "Morley & Robert 2018", referenceId: "morley2018_spider_ballooning" },
      },
    ],
    interfaceTitle: "정전 마찰대전 계면",
    interfaceLead:
      "이것은 BERM 고유의 FieldState 분기이다: 숙주, 공기 간극, 식생, 섬유, 진드기가 국소 정전 계면을 형성할 수 있다. 측정된 국소 전달을 통해서만 생식 또는 생태 상태와 연결되며, 재료명이나 국가 프록시에서 결과로의 지름길이 아니다.",
    reconstructionTitle: "역사적 판독에서 측정 가능한 FieldState로",
    reconstructionLead:
      "현행 모델은 역사적 섬유 소견을 유지하면서 물리학을 업그레이드한다. 관련 대상은 단독의 '폴리에스터'가 아니라, 재료, 신체, 환경에 의해 형성되는 시변 참조 계면 상태 {Q, V, E(r,t), ∇E², dE/dt, τ}이다. DC 계면 수송과 저주파 파형 및 극성 단서도 분리한다.",
    staticMetrics: [
      {
        symbol: "V/cm²",
        title: "역사적으로 보고된 V/cm², 조직 전기장 단위 아님",
        text: "Shafik의 V/cm²는 물리적으로 불완전한 역사적 계기 판독값이다. 해당 설정에서 관찰된 폴리에스터 > 혼방 > 면 순서를 보존하지만, 프로브 면적, 이격 거리, 교정, 접지/체 기준 없이는 전하, V/m, 생식선 내부 전기장으로 변환할 수 없다.",
        source: { label: "Shafik, Ibrahim & El-Sayed 1992", referenceId: "shafik1992" },
      },
      {
        symbol: "Q · E · dE/dt",
        title: "측정 체인",
        text: "재구성은 Faraday cup으로 순 전하를, 명명된 기준에 대한 전위를, 국소 벡터 E(r,t) 맵과 운동, 정지, 접촉 분리 시의 시간적 변화를 측정한다. 기준 전극, 접지 경로 임피던스, 기준에 대한 정전 용량, 프로브 방향/대역폭/입력 임피던스도 기록한다. 기하학과 접지는 입력이지 사후 설명이 아니다.",
      },
      {
        symbol: "τ",
        title: "전하 보유는 경험적 시간 함수",
        text: "단순 적합에서는 Q(t)=Q₀e⁻ᵗ⁄ᵗᵃᵘ이지만, 실제 섬유 계면은 빠른 감쇠와 느린 감쇠 성분을 가질 수 있다. 한 섬유 테스트에서 미처리 PET의 전하 감쇠 반감기는 2,000초 이상이었지만, 대전방지 처리가 반감기를 초의 분수에서 수 초로 단축했다.",
        source: { label: "Dincmen, Hauser & Gursoy 2016", referenceId: "dincmen2016" },
      },
      {
        symbol: "RH · 운동 · 접지",
        title: "운동, 습도, 혼방, 접지가 상태를 결정한다",
        text: "운동은 전하 생성 이벤트를 증가시키고, 정지는 보유와 누설을 노출한다. 상대 습도, 피부 수분, 섬유 비율/마감, 공기 간극, 압력, 신발-바닥 임피던스, 대전방지 처리가 Q, E, dE/dt를 변경한다. 점검된 고정 장치에서 τRC≈Rleak·Ceff는 유용한 비교 지표이며, 측정된 계면 감쇠는 경험적이다. 이들은 FieldState 조절 인자이지 일반적 공변량이 아니다.",
      },
      {
        symbol: "∇E²",
        title: "동일한 기하학이 섬유 분기와 진드기 분기를 연결한다",
        text: "작은 분극 가능한 진드기의 정전 유인력은 먼 전압의 부호가 아니라 국소 기울기 ∇(E²)에 비례한다. England et al.은 자신의 숙주-식생 기하학에서 300 kV/m을 초과하는 핫스팟을 모델링했다; 섬유 계면의 비교 가능한 양은 측정된 국소 맵이지 추정 변환이 아니다.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
      },
      {
        symbol: "E_DC · E(f)",
        title: "수송과 감지는 별개의 전달 함수",
        text: "진드기 실험은 극성에 독립적인 유도 수송을 실증한다. Varroa에서는 전하 부호가 행동을 변경했고, 꽃응애는 변조 단서와 정전 수송을 결합했으며, 꿀벌 착지는 50 Hz AC와 양의 DC에서 달랐다. BERM은 이들을 단일의 일반적 '전기 감수성'이 아닌 성분 특이적 전달로 기록한다.",
      },
      {
        symbol: "ε′ · ε″ · σ(f) · τ",
        title: "형태는 측정 가능한 전달 함수이지 차폐 라벨이 아니다",
        text: "왁스질 큐티클은 전하 누설과 보유를 변경할 수 있으며, 유전 분극성은 유도 유인을 지배한다; 둘은 반드시 같은 방향으로 움직이지 않는다. 종/단계를 구별하는 측정은 유전율과 손실, 전도도, Q 감쇠, 큐티클 두께/형상, 질량, 부절 접착, 털/부절 역학이다.",
      },
    ],
    couplingTitle: "계면이 기존 BERM 생물학과 만나는 곳",
    couplingLead:
      "STATIC_TRIBO_INTERFACE는 물리적 소스 노드이다. 생식력 계수를 추가하지 않는다. 후보 전달 경로는 모델의 기존 장기 특이적 상태를 재사용하며, 각각 자체 국소 측정과 종점 매핑이 필요하다.",
    couplingRoutes: [
      {
        id: "01",
        title: "국소 생체전기 전달 → Vmem / Ca²⁺-redox",
        text: "측정된 계면 전기장, 기하학, 과도 패턴은 막전위 및 Ca²⁺/미토콘드리아 redox 전달의 고유 입력이다. 이것은 VMEM_MTOR 및 A_VGCC_ROS로의 경로이지, 장기 전체에 균일한 DC 전기장을 가정하는 것이 아니다.",
      },
      {
        id: "02",
        title: "표면 감각 전달 → HPA-HPG → 스테로이드 생성",
        text: "모델은 피부/모발/계면 감지와 자율신경 맥락을 HPA_HPG로의 명시적 경로로 유지한다. 하류에서 남성 스테로이드 생성, 배란 시계, 착상은 단일 내분비 승수로 붕괴되지 않고 구별된 채 남는다.",
      },
      {
        id: "03",
        title: "Redox / Vmem 기억 → BTB 및 난소 예비력",
        text: "정전 분기는 혈액-정소 장벽, 생식세포 예비력, 난소 예비력에 이미 등록된 A_VGCC_ROS, VMEM_MTOR, 발달 기억 상태를 통해서만 도달할 수 있다. 공유된 섬유 관찰을 글로벌 장벽 계수나 여성 용량 주장으로 변환하지 않는다.",
      },
    ],
    evidenceTitle: "직접 확립된 것과 가설로 남는 것",
    evidence: [
      {
        tag: "직접 물리적 증거",
        title: "정전장은 짧은 공기 간극을 넘어 진드기를 끌어당길 수 있다",
        text: "Ixodes ricinus 약충을 이용한 대조 실험에서 정전 대전된 숙주 재료로의 수동적 유인이 짧은 공기 간극을 넘어 나타났다. 보고된 극성 비의존성은 진드기의 고정 전하가 아닌 유도 분극과 일치한다.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
        tone: "direct",
      },
      {
        tag: "직접 물리적 맥락",
        title: "숙주-식생 기하학이 중요하다",
        text: "같은 연구가 식생 근처의 대전 숙주를 모델링하고 숙주 유사 정전 구성을 시험했다. 국소 숙주-식생 기울기를 측정할 가치가 있는 물리적 계면으로 지지하지만, 개체군 생태학적 추정치는 아니다.",
        source: { label: "England, Lihou & Robert 2023", referenceId: "england_2023_ticks" },
        tone: "direct",
      },
      {
        tag: "직접 RF 생리학",
        title: "같은 진드기에 별도의 RF 생리학 반응이 있다",
        text: "대조된 900 MHz 실험에서 Ixodes ricinus 합신경절에 성별, 강도, 시간 의존적 신경펩타이드/수용체 전사 변화가 나타났다. 진드기 RF 생리학을 고유 성분 특이적 분기에 배치하며, 정전 접촉 메커니즘을 대체하지 않는다.",
        source: { label: "Šofranková et al. 2023", referenceId: "sofrankova2023" },
        tone: "direct",
      },
      {
        tag: "모델 도출 가설",
        title: "계면 감수성 차이가 선택 가능할 수 있다",
        text: "종, 발달 단계, 숙주-식생 설정이 동일한 교정 정전장에서 부착 확률이 다르고, 그 차이가 실현된 섭식이나 번식을 변경하면, 차등 선택이 검증 가능해진다. 이 진화적 연쇄는 이 계면에 대해 아직 실증되지 않았다.",
        tone: "hypothesis",
      },
    ],
    directTitle: "정전 접촉 증거가 확립하는 것",
    direct: [
      "공식 진드기 실험은 I. ricinus 약충으로 수행되었다. 해당 실험 시스템에서의 정전 유인 메커니즘을 확립하며, 모든 진드기나 외부기생충의 보편적 임계값이 아니다.",
      "마찰대전은 접촉과 마찰이 정전하를 생성할 수 있어 관련이 있다. 연구는 토끼 털/발과 대전 아크릴을 실험 재료로 사용했으며, 모든 숙주, 피모, 서식지, 기상 조건에 대한 하나의 고정 전하 프로필을 확립하지 않는다.",
      "전기생태학은 생물-환경 상호작용에 유용한 물리적 맥락을 제공하지만, 생태학적 개체수, 숙주 접촉, 질병 위험은 다인과적 결과이다.",
    ],
    predictionTitle: "검증 가능한 생태학 및 진화 가설",
    predictionLead:
      "생태학적 결과는 상대적이다: 한 종은 측정된 물리적 장 조건에서의 적합도 감소가 경쟁자, 숙주, 피식자, 포식자보다 작기 때문에 더 흔해질 수 있다. 이들은 BERM에서 도출된 연구 예측이다.",
    selectionEquation:
      "Δ log(Nᵢ/Nⱼ) = log Wᵢ(FieldState, EcoContext) − log Wⱼ(FieldState, EcoContext)",
    evolutionText:
      "생태학적 선별은 계면, 감각, 회복 형질이 유전 가능하게 변이하고 측정된 물리적 장 조건과 연관된 적합도 차이가 세대를 넘어 지속될 때만 진화적 변화가 된다. BERM은 단일 개체수 대비를 진화로 취급하지 않고 시간 인덱스된 형질 분포 상태를 등록한다.",
    evolutionEquation:
      "P₍g+1₎(θ) ∝ W(θ | FieldState, EcoContext) · P₍g₎(θ)",
    predictions: [
      {
        id: "ECO-S1",
        title: "종 및 발달 단계 특이적 부착 곡선",
        text: "동일한 교정 정전 기울기 시리즈에서 종과 발달 단계별로 유인 및 부착 곡선을 별도로 추정한다. 공통 곡선은 가정하지 않는다.",
      },
      {
        id: "ECO-S2",
        title: "계면 의존성",
        text: "물리적 메커니즘이 관련 있다면, 유인은 측정된 정전 구성이 예측하는 방향으로 숙주 표면 전하, 식생/접지 기하학, 공기 간극, 습도에 따라 변해야 한다.",
      },
      {
        id: "ECO-S3",
        title: "선택에는 적합도 연결이 필요하다",
        text: "선택 주장에는 부착 대비 이상이 필요하다: 그 대비가 세대에 걸친 섭식 성공, 생존, 번식을 예측해야 하며, 유전형 또는 유전 가능한 표현형이 독립적으로 측정되어야 한다.",
      },
    ],
    selectionLandscapeTitle: "새로운 진화적 선택압으로서의 EMF",
    selectionLandscapeP1: "변경된 전자기 환경은 새로운 자연선택 축을 만든다. 전자기 감지에 적합도가 의존하는 종(수분, 탐색, 일주기 조절)은 불리하다. 화학적 또는 기계적 전략에 의존하는 종은 상대적으로 유리하다. 이 차등적 감수성은 점진적 진화 압력이 아니다 -- 1세기 미만에 나타났으며 적응 진화에는 너무 빠르다.",
    selectionLandscapeP2: "꿀벌-Varroa 시스템이 가장 명확한 사례 연구이다: EMF가 동시에 숙주를 약화시키고 기생자에 영향을 주지 않아 모든 다른 스트레스 요인을 증폭하는 '이중 캐스케이드'를 만든다.",
    selectionLandscapeArticleLink: "사례 연구: 꿀벌이 반격할 수 없는 이유",
    selectionLandscapeSentinelLink: "감시 페이지의 전체 분석",
    selectionLandscapeNote: "종의 위치는 알려진 메커니즘에 기반한 BERM-Eco 추정 [H]이며 정량적 적합도 측정이 아니다. 산점도는 변경된 물리적 장 환경에 관한 BERM 가설을 예시하며 FieldState는 그 환경을 기록할 뿐이다.",
    protocolTitle: "최소 식별 연구 설계",
    protocol: [
      "각 시행에서 표면 전위 또는 국소 정전장, 기하학, 분리 거리, 재료, 접지 상태, 온도, 상대 습도를 측정한다.",
      "가능한 경우 부착 채점을 무작위화하고 맹검한다; 비대전/가짜 구성과 냄새, CO₂, 열, 진동, 직접 접촉 대조를 포함한다.",
      "하나의 약충 데이터셋에서 외삽하는 대신 여러 분류군과 발달 단계를 표본 추출한다.",
      "진화적 결과를 위해 전기장/부착 표현형을 숙주 이용, 생존, 번식 데이터 및 사전 지정된 유전율/유전형 분석과 쌍을 이룬다.",
    ],
    boundaryTitle: "필드 클래스 규칙",
    boundary: [
      "정전 유인과 시변 RF/ELF 노출은 서로 다른 FieldState 성분이다. BERM은 한 필드 클래스에서 다른 클래스로 반응을 복사하는 대신 전달 함수를 분리한다.",
      "진드기의 정전 능력은 직접 검증 가능한 접촉 메커니즘이다. RF/ELF 반응은 별도의 종 특이적 전달 문제이며, 대응하는 노출 및 종점 측정에서 답이 와야 한다.",
    ],
    sourceTitle: "일차 출처 및 맥락",
    sources: [
      {
        label: "England, Lihou & Robert (2023), Current Biology",
        referenceId: "england_2023_ticks",
        text: "대조된 I. ricinus 정전 유인 실험 및 숙주-식생 전기장 모델링.",
      },
      {
        label: "England et al. (2022), Biological Reviews",
        referenceId: "england2022_electric_ecology",
        text: "전기생태학 및 전기수용 리뷰; 넓은 맥락이며 진드기 개체군 효과 추정이 아님.",
      },
      {
        label: "Šofranková et al. (2023), Pathogens",
        referenceId: "sofrankova2023",
        text: "대조된 900 MHz 노출과 I. ricinus 합신경절의 신경펩타이드/수용체 전사 반응: 별도의 RF 생리학 분기.",
      },
      {
        label: "Shafik, Ibrahim & El-Sayed (1992), Andrologia",
        referenceId: "shafik1992",
        text: "재료 의존적 역사적 계면 판독을 보여주는 인간 섬유-피부 측정; 상대 신호이지 장기 전기장 변환이 아님.",
      },
      {
        label: "Dincmen, Hauser & Gursoy (2016), AATCC Journal of Research",
        referenceId: "dincmen2016",
        text: "대조된 PET 대전방지 처리 및 전하 감쇠 측정, 전하 보유 시간의 큰 변화 포함.",
      },
      {
        label: "Colin et al. (1992), Journal of Insect Physiology",
        referenceId: "colin1992_varroa_electrostatic",
        text: "원 연구에서 Varroa jacobsoni로 명명된 전하 민감 행동 -- Apis mellifera 해충 맥락에서 현재 일반적으로 V. destructor로 이해; 외부기생충 접촉 앵커이지 군체 붕괴 추정이 아님.",
      },
      {
        label: "Mallinson, Woodburn & O'Reilly (2025), iScience",
        referenceId: "mallinson2025_electric_pollution",
        text: "쌍 현장 실험에서 성분 및 극성 특이적 인위적 전기장의 꿀벌 꽃 착지에 대한 효과.",
      },
      {
        label: "Garcia-Robledo, Dierick & Manser (2025), PNAS",
        referenceId: "garcia_robledo2025",
        text: "꽃응애 전기수용과 정전 숙주 수송: 다른 응애 길드의 생태학적 생활사 메커니즘.",
      },
    ],
    sentinelLink: "감시 연구 데이터 준비 상태",
    measurementLink: "FieldState 측정 프로토콜",
    modelLink: "FieldState 측정 사양 열기",
    host: "숙주 표면",
    interface: "정전 공기 간극 계면",
    vegetation: "식생 / 접지",
    tick: "진드기",
    hostText: "접촉과 마찰이 정전하에 기여할 수 있다",
    interfaceText: "국소 기하학, 분리, 습도가 측정 전기장을 형성한다",
    vegetationText: "재료와 접지는 물리적 경계 조건이다",
    tickText: "수동적 유도와 부착은 경험적 종점이다",
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

function ReferenceSourceCitation({
  source,
  locale,
  className,
}: {
  source: ReferenceSource;
  locale: string;
  className: string;
}) {
  if (!source.referenceId) {
    return <span className={className}>{source.label}</span>;
  }

  return (
    <StudyCitation
      referenceId={source.referenceId}
      locale={locale}
      label={source.label}
      className={className}
    />
  );
}

const SECTION_LABELS: Record<string, Record<string, string>> = {
  en: {
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
    fitnessChange: "Fitness change",
    emSensitivity: "EM sensitivity",
    human: "Human",
    moth: "Moth",
    bat: "Bat",
    honeybee: "Honeybee",
    bird: "Bird",
  },
  fi: {
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
    fitnessChange: "Kelpoisuusmuutos",
    emSensitivity: "EM-herkkyys",
    human: "Ihminen",
    moth: "Yöperhonen",
    bat: "Lepakko",
    honeybee: "Mehiläinen",
    bird: "Muuttolintu",
  },
  ja: {
    framework: "モデルフレームワーク",
    claims: "証拠連鎖",
    interface: "界面",
    systems: "センチネルシステム",
    measurement: "測定チェーン",
    coupling: "生物学的結合",
    evidence: "証拠状態",
    interpretation: "解釈",
    predictions: "導出予測",
    research: "研究デザイン",
    sources: "出典と来歴",
    protocol: "最小プロトコル",
    observed: "観測済み",
    testable: "導出 / 検証可能",
    fitnessChange: "適応度変化",
    emSensitivity: "EM感受性",
    human: "ヒト",
    moth: "ガ",
    bat: "コウモリ",
    honeybee: "ミツバチ",
    bird: "渡り鳥",
  },
  fr: {
    framework: "CADRE DU MODELE",
    claims: "SEQUENCE DE PREUVES",
    interface: "INTERFACE",
    systems: "SYSTEMES SENTINELLES",
    measurement: "CHAINE DE MESURE",
    coupling: "COUPLAGE BIOLOGIQUE",
    evidence: "STATUT DES PREUVES",
    interpretation: "INTERPRETATION",
    predictions: "PREDICTIONS DERIVEES",
    research: "CONCEPTION DE RECHERCHE",
    sources: "SOURCES ET PROVENANCE",
    protocol: "PROTOCOLE MINIMAL",
    observed: "OBSERVE",
    testable: "DERIVE / TESTABLE",
    fitnessChange: "Changement de fitness",
    emSensitivity: "Sensibilite EM",
    human: "Humain",
    moth: "Papillon de nuit",
    bat: "Chauve-souris",
    honeybee: "Abeille",
    bird: "Oiseau migrateur",
  },
  ko: {
    framework: "모델 프레임워크",
    claims: "증거 연쇄",
    interface: "계면",
    systems: "감시 시스템",
    measurement: "측정 체인",
    coupling: "생물학적 결합",
    evidence: "증거 상태",
    interpretation: "해석",
    predictions: "도출 예측",
    research: "연구 설계",
    sources: "출처 및 출처 이력",
    protocol: "최소 프로토콜",
    observed: "관측됨",
    testable: "도출 / 검증 가능",
    fitnessChange: "적합도 변화",
    emSensitivity: "EM 감수성",
    human: "인간",
    moth: "나방",
    bat: "박쥐",
    honeybee: "꿀벌",
    bird: "철새",
  },
};

export function EcoStaticInterface({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const label = pickCopy(SECTION_LABELS, locale);

  return (
    <div className="space-y-16">
      <section>
        <SectionHeader label={label.framework} title={d.frameworkTitle} lead={d.frameworkLead} />
        <EcoCausalVisuals locale={locale} />
        <div className="mt-7 grid gap-x-6 gap-y-7 md:grid-cols-2 xl:grid-cols-4">
          {d.fieldClasses.map((fieldClass) => (
            <article key={fieldClass.title} className="min-w-0 border-t border-card-border pt-4">
              <p className="font-mono-num text-xs font-semibold text-accent">{fieldClass.symbol}</p>
              <h3 className="mt-2 font-serif text-[1.05rem] font-semibold leading-snug tracking-[-0.012em]">{fieldClass.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{fieldClass.text}</p>
              {fieldClass.source && (
                <div className="mt-4">
                  <ReferenceSourceCitation source={fieldClass.source} locale={locale} className="text-xs font-medium text-accent hover:underline" />
                </div>
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
                <div className="mt-4">
                  <ReferenceSourceCitation source={stage.source} locale={locale} className="text-xs font-medium text-accent hover:underline" />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-card-border pt-10">
        <SectionHeader label={label.interface} title={d.interfaceTitle} lead={d.interfaceLead} />
        <TickEvidenceBoundary locale={locale} />
        <EcoSpeciesCueRow locale={locale} />
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
                <div className="mt-4">
                  <ReferenceSourceCitation source={system.source} locale={locale} className="text-xs font-medium text-accent hover:underline" />
                </div>
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
                <div className="mt-4">
                  <ReferenceSourceCitation source={metric.source} locale={locale} className="text-xs font-medium text-accent hover:underline" />
                </div>
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
                <div className="mt-4">
                  <ReferenceSourceCitation source={card.source} locale={locale} className="text-xs font-medium text-accent hover:underline" />
                </div>
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
                {label.fitnessChange} →
              </span>
            </div>
            {/* X axis label */}
            <div className="absolute bottom-0 left-8 right-0 text-center">
              <span className="text-[0.6875rem] text-foreground-muted">
                {label.emSensitivity} →
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
                <p className="text-[0.625rem] text-foreground-muted mt-0.5">{label.human}</p>
              </div>
              {/* Moth — high sensitivity */}
              <div className="absolute left-[68%] top-[62%] text-center">
                <BermIcon name="moth" size={20} className="text-status-refuted mx-auto" />
                <p className="text-[0.625rem] text-status-refuted mt-0.5">{label.moth}</p>
              </div>
              {/* Bat — high sensitivity */}
              <div className="absolute left-[72%] top-[72%] text-center">
                <BermIcon name="bat" size={20} className="text-status-refuted mx-auto" />
                <p className="text-[0.625rem] text-status-refuted mt-0.5">{label.bat}</p>
              </div>
              {/* Honeybee — very high sensitivity */}
              <div className="absolute left-[85%] top-[78%] text-center">
                <BermIcon name="honeybee" size={20} className="text-status-refuted mx-auto" />
                <p className="text-[0.625rem] text-status-refuted mt-0.5">{label.honeybee}</p>
              </div>
              {/* Migratory bird — very high sensitivity */}
              <div className="absolute left-[88%] top-[85%] text-center">
                <BermIcon name="bird" size={20} className="text-status-refuted mx-auto" />
                <p className="text-[0.625rem] text-status-refuted mt-0.5">{label.bird}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-foreground-muted/60 leading-relaxed italic">
          {d.selectionLandscapeNote}
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href={`/${locale}/sentinel`} className="text-accent hover:underline">
            {d.selectionLandscapeSentinelLink} →
          </Link>
          <Link href={`/${locale}/articles/bees`} className="text-accent hover:underline">
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
            <article key={source.label} className="border-t border-card-border pt-3">
              <ReferenceSourceCitation source={source} locale={locale} className="font-serif text-[1.02rem] font-semibold leading-snug text-accent hover:underline" />
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{source.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <Link href={`/${locale}/sentinel`} className="text-accent hover:underline">{d.sentinelLink} →</Link>
          <Link href={`/${locale}/about/measurement`} className="text-accent hover:underline">{d.measurementLink} →</Link>
          <Link href={`/${locale}/model`} className="text-accent hover:underline">{d.modelLink} →</Link>
        </div>
      </section>
    </div>
  );
}
