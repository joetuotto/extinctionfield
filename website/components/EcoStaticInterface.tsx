import Link from "next/link";

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

type Copy = {
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

const COPY: Record<Locale, Copy> = {
  en: {
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

function toneClass(tone: EvidenceCard["tone"]) {
  return tone === "direct"
    ? "border-status-confirmed/35 bg-status-confirmed/5"
    : "border-status-partial/35 bg-status-partial/5";
}

export function EcoStaticInterface({ locale }: { locale: string }) {
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = COPY[language];

  return (
    <div className="space-y-14">
      <section>
        <h2 className="text-xl font-semibold">{d.interfaceTitle}</h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.interfaceLead}</p>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_1.2fr_1fr]">
          <article className="rounded-xl border border-card-border bg-card-bg p-4">
            <p className="text-xs font-semibold text-accent">{d.host}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.hostText}</p>
          </article>
          <article className="rounded-xl border border-accent/30 bg-accent/5 p-4">
            <p className="text-xs font-semibold text-accent">{d.interface}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.interfaceText}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-accent" aria-hidden="true">
              <span className="h-px flex-1 bg-accent/50" />
              <span>↔</span>
              <span className="h-px flex-1 bg-accent/50" />
            </div>
          </article>
          <article className="rounded-xl border border-card-border bg-card-bg p-4">
            <p className="text-xs font-semibold text-accent">{d.vegetation} · {d.tick}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.vegetationText}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.tickText}</p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">{d.reconstructionTitle}</h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.reconstructionLead}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {d.staticMetrics.map((metric) => (
            <article key={metric.title} className="rounded-xl border border-card-border bg-card-bg p-5">
              <p className="font-mono-num text-xs font-semibold text-accent">{metric.symbol}</p>
              <h3 className="mt-2 text-base font-semibold">{metric.title}</h3>
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

      <section>
        <h2 className="text-xl font-semibold">{d.couplingTitle}</h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.couplingLead}</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {d.couplingRoutes.map((route) => (
            <article key={route.id} className="rounded-xl border border-accent/25 bg-accent/[0.03] p-5">
              <p className="font-mono-num text-xs text-accent">{route.id}</p>
              <h3 className="mt-2 text-base font-semibold">{route.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{route.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">{d.evidenceTitle}</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {d.evidence.map((card) => (
            <article key={card.title} className={`rounded-xl border p-5 ${toneClass(card.tone)}`}>
              <p className="text-[11px] font-semibold tracking-wide text-foreground-muted">{card.tag}</p>
              <h3 className="mt-3 text-base font-semibold">{card.title}</h3>
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

      <section className="max-w-4xl">
        <h2 className="text-xl font-semibold mb-3">{d.directTitle}</h2>
        <ul className="space-y-3 text-sm leading-relaxed text-foreground-muted">
          {d.direct.map((item) => <li key={item} className="flex gap-3"><span className="text-accent">•</span><span>{item}</span></li>)}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">{d.predictionTitle}</h2>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.predictionLead}</p>
        <p className="mt-4 max-w-4xl rounded-lg border border-accent/25 bg-accent/[0.03] px-4 py-3 font-mono-num text-sm text-accent">
          {d.selectionEquation}
        </p>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.evolutionText}</p>
        <p className="mt-3 max-w-4xl rounded-lg border border-accent/25 bg-accent/[0.03] px-4 py-3 font-mono-num text-sm text-accent">
          {d.evolutionEquation}
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {d.predictions.map((prediction) => (
            <article key={prediction.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <p className="font-mono-num text-xs text-accent">{prediction.id}</p>
              <h3 className="mt-2 text-base font-semibold">{prediction.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{prediction.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-card-border bg-card-bg p-5">
          <h2 className="text-lg font-semibold">{d.protocolTitle}</h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.protocol.map((item, index) => <li key={item} className="flex gap-3"><span className="font-mono-num text-accent">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
        </article>

        <article className="rounded-xl border border-status-partial/35 bg-status-partial/5 p-5">
          <h2 className="text-lg font-semibold">{d.boundaryTitle}</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.boundary.map((item) => <p key={item}>{item}</p>)}
          </div>
        </article>
      </section>

      <section className="max-w-4xl border-t border-card-border pt-8">
        <h2 className="text-lg font-semibold">{d.sourceTitle}</h2>
        <div className="mt-4 space-y-3">
          {d.sources.map((source) => (
            <article key={source.href} className="rounded-lg border border-card-border bg-card-bg p-4">
              <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-accent hover:underline">{source.label} ↗</a>
              <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{source.text}</p>
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
