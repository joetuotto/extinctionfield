import { ReproductiveRegulationIntegration } from "@/components/ReproductiveRegulationIntegration";
import { CombinedExposurePanel } from "@/components/CombinedExposurePanel";
import { RedoxReserveMasking } from "@/components/RedoxReserveMasking";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ScanEye } from "lucide-react";
import { ClaimRef } from "@/components/ClaimRef";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { MathBlock } from "@/components/MathBlock";
import { PageHeader } from "@/components/PageHeader";
import { ExplanatoryLevelsDiagram, ProxyMaskingCurveExplorer } from "@/components/ProxyCausalVisuals";
import { ProxyDemographicEvidence } from "@/components/ProxyDemographicEvidence";
import { ProxyInfrastructureEvidence } from "@/components/ProxyInfrastructureEvidence";
import { ProxyMeasuredExposureEvidence } from "@/components/ProxyMeasuredExposureEvidence";
import { ProxyMaskingLevels } from "@/components/ProxyMaskingLevels";
import { ProxyMechanismEvidence } from "@/components/ProxyMechanismEvidence";
import { ProxyHumanSensoryEvidence, ProxyInterpreterEvidence, ProxySyndromeEvidence } from "@/components/ProxyBehaviourEvidence";
import { ProxyTranslationEvidence, ProxyQuantitativeEvidence, ProxyCoverageMatrix } from "@/components/ProxyComparativeEvidence";
import { ProxyBarrierEvidence } from "@/components/ProxyBarrierEvidence";
import { ProxyPremises, ProxyDeductions } from "@/components/ProxyPremises";
import { ProxyExplanationsExplorer } from "@/components/ProxyExplanationsExplorer";
import {
  ActivityProxyChart,
  InteractionExplorer,
  ReceiverStateExplorer,
} from "@/components/ProxyMaskingExplorers";
import { TranslationNotice } from "@/components/TranslationNotice";
import { locales, pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Proxy masking: how an underlying effect becomes hidden",
    subtitle: "Why a correlated measure or a real contributing cause does not explain the whole causal chain — and what follows from BERM’s premises.",
    back: "Model overview",
    kicker: "BERM · Understanding the explanation",
    intro: "An animal gains weight. It eats more, so increased food intake explains the weight gain. But why did its appetite change? Food intake can be both a real cause of weight gain and an intermediate step in a longer biological process. An explanation can be correct while leaving the beginning of the chain unresolved.",
    definition: "A proxy is an indirect measure: something we can observe in place of a harder-to-measure process. Here, masking means that an earlier effect becomes hard to recognise behind a correlated measure, an intermediate biological change or the way the outcome is recorded.",
    proposal: "BERM places the electromagnetic field upstream of receiving biology, regulation and behaviour. In this model, diet, stress and lifestyle describe later stages or conditions of the same chain. They explain parts of an outcome while leaving the origin of the biological change unidentified. BERM connects these parts to an explicit physical starting point.",
    proposalLabel: "The central conclusion",
    centralQuestion: "A real contributing cause does not, by itself, explain the origin or the full extent of the effect.",
    reading: "On this page",
    readingHint: "Follow the explanation from a familiar example to biological mechanisms, comparisons and the model’s synthesis.",
    sections: [
      "The mechanism behind the proxy",
      "An explanation within a longer chain",
      "A correlation does not identify the causal path",
      "The same cue, a different receiver",
      "When exposures act together",
      "When compensation preserves function",
      "What other species reveal",
      "What a group label contains",
      "From biological state to a reported reason",
      "Fragmentation of a behavioural profile",
      "Demographic explanations in the same chain",
      "Why the shared causal structure explains more",
      "How BERM joins the evidence",
    ],
    contextLabel: "Why this matters",
    sourceLabel: "Original studies",
    modelLabel: "BERM’s interpretation",
    measuredLabel: "Observed component",
    detailLabel: "Read the underlying evidence",
    first: {
      lead: "Before interpreting a correlation, ask what role each variable plays. The same word — such as lifestyle — can refer to an environmental input, a behavioural consequence or a broad label that combines many processes.",
      context: "Industrialisation changed several parts of the material environment together. Historical trends therefore have to be separated into local exposures, receiving states and measured outcomes. A national technology indicator is an indirect measure of that environment; it is not an organism’s local field dose.",
      graphLead: "The proxy follows the outcome, but the curve does not identify the causal path. Reveal BERM’s field branch below and compare a shared environmental change with an effect transmitted through a biological intermediate.",
    },
    proxies: {
      lead: "Prosperity, urban living, screen use, diet and family planning do not answer the same causal question. BERM locates each variable in the chain: a shared environmental change, a biological intermediate, an interaction or a recording process. Treating all of them as self-contained explanations hides these differences.",
      definition: "A correlated proxy shares variation with an exposure. A mediator carries part of a causal effect. A modifier changes the response to an exposure. Keeping these roles distinct makes the claim of masking concrete.",
      sourcesTitle: "A familiar label can conceal different physical exposures",
      sources: "A screen-use measure can combine optical light, RF exposure, posture and content. Personal RF exposure correlated more closely with local measurements and combined models than self-ratings or transmitter distance. In children and adolescents, modelled tissue dose depended on device use and network technology. Screen time alone therefore does not specify RF dose: the field contribution needs its own exposure description. [[ref:frei2010_exposure_proxies|Frei 2010]]; [[ref:birks2021_modeled_rf_dose|Birks 2021]].",
      context: "BERM names the connection: shared infrastructure, a receiving process, a biological intermediate or a measurement rule. A regression coefficient summarises an association. The causal structure explains how that association is produced and which part remains unidentified by the proxy.",
    },
    parsimony: {
      lead: "Within BERM’s premises, the field-and-receiver account explains more than a single proxy because it connects the origin of the change to its later consequences across biological levels. Parsimony comes from reusing the same specified processes: each observed endpoint does not require an independent starting explanation.",
      points: [
        { title: "Across species", text: "The electromagnetic environment is part of the material conditions of humans, laboratory animals, birds and insects. Human family-planning institutions alone do not cover that whole scope. Species comparisons motivate looking for shared material routes; chemical exposure, light, temperature and habitat can also cross species boundaries. [[ref:klimentidis2010|Klimentidis 2010]]; [[ref:engels2014|Engels 2014]]." },
        { title: "Across biological levels", text: "BERM links a molecular or sensory response to hormonal regulation and behaviour through receiving state. Appetite and food intake then become consecutive parts of an explanation. Sensory and pharmacological interventions constrain particular links in this structure. [[ref:marlin2015_oxytocin_auditory|Marlin 2015]]; [[ref:hinkle1987_cadmium_uptake|Hinkle 1987]]." },
        { title: "Across different conditions", text: "Light history, reproductive phase and receptor state provide named reasons for differences in a response. Reusing these specified conditions is more informative than adding a separate unexplained exception for each observation. [[ref:hammad2020_dark_cryptochrome|Hammad 2020]]; [[ref:reyesguerrero2010_olfactory_estrogen|Reyes-Guerrero 2010]]." },
        { title: "Across measurement levels", text: "A community label, a report of exercise and a daily step count can describe different parts of the same material setting. BERM asks which process each measure captures, and then connects exposure, response and recorded outcome. [[ref:katz2012_amish_activity|Katz 2012]]; [[ref:stein2016_amish_immunity|Stein 2016]]." },
      ],
      comparisonTitle: "What makes the explanation better?",
      aggregationTitle: "From individual responses to population outcomes",
      aggregation: "In BERM’s chain, a biological shift changes the distribution of responses across individuals. Birth counts accumulate through partnership, attempts at conception, conception probabilities and pregnancy outcomes within age groups and time intervals. Ecological outcomes likewise combine individual foraging, survival and reproduction. These are the explicit steps between receiving state and population measure.",
      comparison: "The advantage is the coverage of the causal structure: BERM explains why proximate causes change, how they interact and how their effects accumulate across levels. A model ending at income, food intake or a diagnostic label leaves these connections outside its explanation. This is a conclusion about the explanatory structure under the stated premises; the empirical strength of each link is assessed from its own evidence.",
      economy: "The shared structure retains the distinct doses and receiving mechanisms of optical, ELF, IF and RF exposures. Explanatory economy comes from reusing those defined mechanisms and aggregation rules across observations.",
    },
    receiver: {
      lead: "Organisms constantly use environmental cues: a scent, a call, the timing of light or a flower’s electrical properties. A cue has an effect when a receiving system detects it and gives it biological significance. That receiving system changes with physiology and experience.",
      claim: "The same sensory cue can produce different responses when the receiver’s hormonal or neural state changes.",
      ipmTitle: "A chemical signal can regulate reproduction",
      ipm: "In naked mole-rats, a queen-associated odour compound, isopropyl myristate (IPM), maintained reproductive suppression after the queen was removed. This identifies an external chemical signal capable of maintaining a reproductive state in a mammalian community. The experiment did not manipulate electromagnetic exposure. [[ref:khallaf2026_queen_odour|Khallaf 2026]].",
      oxytocinTitle: "A hormone can change the meaning of a call",
      oxytocin: "In mice, oxytocin altered the processing of pup calls in the auditory cortex and facilitated maternal responses. Related circuit experiments located part of the social learning of care. These are direct interventions in sensory processing and behaviour. [[ref:marlin2015_oxytocin_auditory|Marlin 2015]]; [[ref:carcea2021_maternal_learning|Carcea 2021]].",
      context: "A change in behaviour need not begin with a conscious decision. The incoming cue, its interpretation and the learned response are separate parts of the chain. Its direction depends on the cue: weakening a suppressive signal could release reproduction, while weakening a cue that supports care could have a different consequence.",
      lightTitle: "Light both signals and prepares the receiver",
      lightIntro: "Light is electromagnetic radiation. Separating optical, extremely low-frequency (ELF), intermediate-frequency (IF) and radiofrequency (RF) exposure makes their absorption and reception measurable. Their biological interactions still belong in the same account.",
      lightRoles: [
        { title: "An immediate signal", text: "A light-absorbing molecule initiates a response to the current illumination." },
        { title: "A prepared state", text: "Illumination changes photochemical or redox state, which can shape a subsequent field response." },
        { title: "A biological history", text: "Earlier light exposure changes circadian phase, hormonal signalling and protein expression." },
      ],
      lightStudies: "In Arabidopsis, magnetic enhancement of a cryptochrome response occurred when the field was applied during dark intervals following blue light. In mouse muscle cells, dark culture weakened a response to a pulsed magnetic field, as did CRY2 or riboflavin-kinase knockdown. These studies identify light history and molecular state within their own exposure protocols. [[ref:hammad2020_dark_cryptochrome|Hammad 2020]]; [[ref:iversen2025|Iversen 2025]].",
      fieldBridge: "An ELF study found different changes in oestrogen-receptor expression across reproductive-cycle phases in the rat olfactory bulb. A separate cell experiment measured altered MT1-associated hormonal signalling. In BERM, these measurements constrain the link between field input and receiving state; the sensory interventions above constrain the next link from that state to behaviour. [[ref:reyesguerrero2010_olfactory_estrogen|Reyes-Guerrero 2010]]; [[ref:girgert2010_mt1_signaling|Girgert 2010]].",
    },
    mixtures: {
      lead: "An exposure can be measured accurately while an important part of its action remains hidden. The amount outside a cell, the amount entering it and the cell’s response to that amount are different quantities.",
      claim: "Chemical exposure, transport into the cell and receiving state can jointly shape an outcome; a single exposure measure may leave a co-condition unrecorded.",
      internalDose: "In a cadmium experiment, calcium-channel agonists and antagonists changed cellular uptake and toxicity. This pharmacological result shows why the same external concentration need not mean the same internal dose. The experiment itself contained no field exposure. A separate mouse study directly combined a 50 Hz magnetic field with lead and measured antioxidant and membrane responses. These interventions locate different parts of the chain: transport, internal dose and the response to combined exposure. [[ref:hinkle1987_cadmium_uptake|Hinkle 1987]]; [[ref:liu2002_elf_lead|Liu 2002]].",
      context: "If the field condition is shared by nearly everyone in a study while chemical exposure varies, a measured chemical effect can include a field-dependent contribution. The chemical remains a real cause. What can be missed is the condition that changes its effect. The sign and size of that interaction depend on the particular chemical, tissue and protocol.",
      flowerTitle: "A chemical effect can travel through an electrical cue",
      flower: "Fertiliser treatment changed floral electrical cues and reduced bumblebee foraging. Chemical exposure and electrical signalling were parts of the same studied process. This is a concrete example of how identifying the chemical does not finish the explanation of how the behavioural effect occurs. It does not establish an external RF cause for that process. [[ref:hunting2022_floral_electric_cues|Hunting 2022]].",
      link: "Chemical exposure and receiving state",
    },
    compensation: {
      lead: "An organism often has more than one way to perform a task. A bird can use celestial cues as well as magnetic information. A stable final result may therefore coexist with changes in how that result is achieved.",
      claim: "The observed endpoint depends on the available pathways and their compensation, as well as on the state of the pathway being examined.",
      study: "Garden warblers retained seasonally appropriate orientation under an oscillating magnetic field when stellar cues were visible. The result is consistent with the use of an alternative cue. The experiment did not simultaneously demonstrate receptor-level magnetic disruption in those same birds. [[ref:bojarinova2024_stellar_cues|Bojarinova 2024]].",
      steps: [
        { title: "One channel", text: "The response depends on a particular sensory pathway." },
        { title: "Several channels", text: "Alternative cues can contribute to the same task." },
        { title: "The recorded outcome", text: "Direction or performance alone does not identify the contribution of each channel." },
      ],
      context: "BERM therefore separates the receiving process from the observation process. A receptor response, a hormone measure and a whole-organism outcome answer different questions. Compensation is a specific mechanism to describe in the relevant system, rather than a label to attach automatically to every unchanged result.",
    },
    species: {
      lead: "Other species help separate biological mechanisms from explanations that require specifically human institutions or conscious choices. The most informative comparison names the organism, the function and the exposure actually studied. Here, a sentinel is a species whose particular function can help reveal an environmental effect.",
      claim: "Cross-species observations can extend the causal question beyond human choices to biological regulation and shared material environments.",
      klimentidis: "Klimentidis and colleagues assembled data on more than 20,000 animals from eight species. Weight trends were positive in all 12 populations when sexes were combined. Laboratory diets were broadly stable in composition, but intake and activity were not universally held constant. The result opens the question of why energy intake or use changes; the study did not measure EMF exposure. [[ref:klimentidis2010|Klimentidis 2010]].",
      tableTitle: "Sentinels selected for a function",
      tableHeaders: ["Organism / system", "What was measured", "What it contributes"],
      rows: [
        { name: "European robin", measured: "Magnetic-compass orientation during changes in RF noise.", role: "A direct functional field response; orientation is the endpoint.", source: "[[ref:engels2014|Engels 2014]]" },
        { name: "Bumblebee / flower", measured: "Floral electrical changes and foraging after chemical treatment.", role: "A chemical → electrical-cue → behaviour connection.", source: "[[ref:hunting2022_floral_electric_cues|Hunting 2022]]" },
        { name: "Honeybee", measured: "Flower landings under manipulated local electric fields.", role: "A direct intervention in an ecologically relevant behaviour.", source: "[[ref:mallinson2025_electric_pollution|Mallinson 2025]]" },
        { name: "Garden warbler", measured: "Orientation with stellar cues available during RF exposure.", role: "Alternative cues and the interpretation of preserved function.", source: "[[ref:bojarinova2024_stellar_cues|Bojarinova 2024]]" },
        { name: "Broadcast-spawning corals", measured: "Spawning dates associated with artificial light at night.", role: "An optical timing association; fertilisation loss was not measured in this global dataset.", source: "[[ref:davies2023_coral_light|Davies 2023]]" },
        { name: "Naked mole-rat", measured: "Reproductive suppression during a queen-associated odour intervention.", role: "A reference system for sensory reproductive regulation; EMF sensitivity was not tested.", source: "[[ref:khallaf2026_queen_odour|Khallaf 2026]]" },
      ],
      context: "These systems contribute different links. A chemical-signal experiment, an optical timing study and an RF-compass experiment are not interchangeable exposure tests. BERM’s synthesis connects their measured functions while keeping each receiving mechanism and exposure band explicit.",
      link: "Follow the ecological evidence",
      klimentidisLink: "Explore the Klimentidis comparison",
    },
    community: {
      lead: "A community name can bundle lighting, work, movement, microbes, technology use and reproductive practices into a single variable. The group difference is a starting point for identifying those material pathways.",
      claim: "A lifestyle or community label can predict an outcome while concealing differences between the exposures and biological processes included in that label.",
      chartLead: "In an Ohio comparison, Amish adults reported less exercise undertaken for health, while step counts indicated greater overall movement. The male comparison below shows why the purpose of an activity and its total physical amount are different measures. [[ref:katz2012_amish_activity|Katz 2012]].",
      dustTitle: "From a community label to a transferable exposure",
      dust: "An Amish–Hutterite study went further: household dust, immune measures and a mouse asthma model were examined together. The protective effect of Amish dust in mice depended on named innate-immune signalling. Part of the group contrast thus gained a material, experimentally investigated pathway. This was a dust and immunity study, not a measured EMF contrast. [[ref:stein2016_amish_immunity|Stein 2016]].",
      context: "The same principle applies to BERM’s field branch: replace the group name with specified exposures and receiving states. Activity, microbial environment and light can be real biological inputs. Their relationship to the field — parallel, interacting or intermediate — must be stated separately.",
      link: "Read the Amish comparisons",
    },
    reasons: {
      lead: "People describe decisions through what they experience: energy, interest, stress, closeness, opportunity and practical constraints. Those descriptions can be sincere and consequential even when the person cannot observe every process shaping the experience.",
      claim: "A reported reason can describe a meaningful downstream state while leaving its biological and environmental history unresolved.",
      text: "BERM places perceived meaning and motivation within a continuous biological and social chain. A change in responsiveness can alter what a cue feels like; experience influences behaviour; repeated behaviour changes social contact and the cues encountered next. Human motives, learning and material constraints remain explicit parts of that chain.",
      distinction: "Caregiving, sexual motivation, desire for children, ovulation and pregnancy are distinct outcomes. The sensory studies support particular transitions; combining them into an EMF-to-human-reproductive-behaviour pathway remains BERM’s conditional synthesis. The model does not need to assume that every participant gives the same reason or responds in the same direction.",
      context: "When analysis adjusts for sleep, stress or behaviour, it should first identify whether the variable is an earlier cause, an intermediate step or a shared consequence. Holding an intermediate step fixed asks about the remaining direct pathway; it does not estimate the entire earlier effect transmitted through that step.",
      link: "Behaviour and experienced reasons",
      epistapegeLink: "How explanations become institutionalised",
    },
    synthesis: {
      lead: "The contribution of proxy masking is to keep the full chain in view. BERM supplies an explicit physical starting point and a conditional receiving operator. Studies from different fields supply biological components and observed outcomes.",
      levels: [
        { title: "Lindgren-derived geometry", text: "The 2025 formulation specifies a tensor change when a background and an external contribution are combined. It retains their cross terms before any biological response is assigned." },
        { title: "Imported empirical biology", text: "Sensory, pharmacological and ecological experiments constrain particular receivers, internal doses, timing relations and functional outcomes in their own systems." },
        { title: "BERM’s conditional mechanism", text: "A state-dependent receiving operator connects the geometric input to named biological changes. The model then composes those changes through behaviour, interactions and recorded outcomes." },
        { title: "Open calibration", text: "The physical scale, gauge prescription, tissue response, sign, delay and human outcome calibration have to be specified. A component study does not by itself determine the complete historical contribution." },
      ],
      mathTitle: "Open the mathematical connection",
      mathIntro: "With the BERM scale κ, Lindgren’s 2025 ansatz and the split A = A₀ + a give the following exact tensor expansion. This is the geometric step. [[ref:lindgren2025|Lindgren 2025]].",
      bridge: "The biological step additionally assumes a named matter–metric coupling and a causal response operator. Its receiving state includes light history L, chemical state M, pharmacological intervention D and other physiological or learning history H.",
      mathEnd: "The operator’s kernel, scale and tissue-specific parameters remain explicit model assumptions. Optical and RF oscillations need not retain a direct time-averaged cross term for light to alter a later response through the receiving state. FieldState may supply observations or estimates of the physical input; the explanatory operator belongs to BERM.",
      mathLink: "Read the full tensor derivation",
      final: "The unifying idea is that a measured chemical, a behaviour or a lifestyle category can explain a result while leaving an earlier condition unnamed. Following the signal, the receiver and the observed endpoint separately makes those conditions visible in the model.",
      visualKeyTitle: "How to read the figures",
      visualKey: "The causal diagram and response curves explain specified mechanisms using illustrative values. They are not measured exposure histories or fitted human dose–response curves. The Amish activity figure uses published group measurements, with different units shown in separate panels. Original studies are linked beside the relevant claim.",
      branchesTitle: "Four connected evidence branches",
      branches: [
        { title: "Mechanistic chain", text: "Transport, internal dose and the interaction between fields and chemicals.", href: "/evidence/heavy-metal-synergy" },
        { title: "Cross-species comparisons", text: "Shared biology and the functions that reveal environmental changes.", href: "/evidence/ecology" },
        { title: "Community comparisons", text: "From a community label to measured material pathways.", href: "/evidence/amish-control" },
        { title: "Pharmacological interventions", text: "What blocking, enhancing or restoring a process reveals about the causal chain.", href: "/evidence/pharmacology" },
      ],
    },
  },
  fi: {
    title: "Proxy masking: vaikutuksen peittyminen",
    subtitle: "Miksi korreloiva mittari tai todellinen osasyy ei selitä koko vaikutusketjua — ja mitä tästä seuraa BERM:n premisseillä.",
    back: "Mallin yleiskatsaus",
    kicker: "BERM · Selityksen rakenne",
    intro: "Eläimen paino nousee. Se syö enemmän, joten lisääntynyt syöminen selittää painon nousua. Mutta miksi ruokahalu muuttui? Syöminen voi olla sekä painon nousun todellinen syy että pidemmän biologisen prosessin välivaihe. Selitys voi olla oikea, vaikka ketjun alku jäisi avoimeksi.",
    definition: "Proxy tarkoittaa välillistä mittaria: havaittavaa asiaa, jonka avulla kuvataan vaikeammin mitattavaa ilmiötä. Peittymisellä tarkoitetaan tässä sitä, että aikaisempaa vaikutusta on vaikea tunnistaa korreloivan mittarin, biologisen välivaiheen tai tuloksen kirjaamistavan takaa.",
    proposal: "BERM sijoittaa sähkömagneettisen kentän vastaanottavan biologian, säätelyn ja käyttäytymisen edelle. Tässä mallissa ruokavalio, stressi ja elämäntapa kuvaavat saman ketjun myöhempiä vaiheita tai ehtoja. Ne selittävät osia lopputuloksesta ja jättävät biologisen muutoksen alkuperän tunnistamatta. BERM yhdistää nämä osat eksplisiittiseen fysikaaliseen lähtökohtaan.",
    proposalLabel: "Keskeinen johtopäätös",
    centralQuestion: "Todellinen osasyy ei yksin selitä vaikutuksen alkuperää eikä sen koko suuruutta.",
    reading: "Tällä sivulla",
    readingHint: "Lukupolku etenee tutusta esimerkistä biologisiin mekanismeihin, vertailuaineistoihin ja mallin synteesiin.",
    sections: [
      "Mekanismi, jonka proksi peittää",
      "Selitys pidemmän ketjun sisällä",
      "Korrelaatio ei nimeä vaikutusreittiä",
      "Sama vihje, erilainen vastaanottaja",
      "Kun altisteet vaikuttavat yhdessä",
      "Kun kompensaatio säilyttää toiminnan",
      "Mitä muut lajit paljastavat?",
      "Mitä ryhmänimi sisältää?",
      "Biologisesta tilasta koettuun syyhyn",
      "Käyttäytymisprofiilin fragmentaatio",
      "Väestötieteen selitykset samassa ketjussa",
      "Miksi yhteinen syyrakenne selittää enemmän",
      "Miten BERM yhdistää näytön?",
    ],
    contextLabel: "Miksi tämä on olennaista?",
    sourceLabel: "Alkuperäistutkimukset",
    modelLabel: "BERM:n tulkinta",
    measuredLabel: "Mitattu osatekijä",
    detailLabel: "Tutustu taustalla olevaan näyttöön",
    first: {
      lead: "Yhteyden tulkinta alkaa kunkin muuttujan tehtävästä. Sama sana, kuten elämäntapa, voi tarkoittaa ympäristöstä tulevaa syötettä, käyttäytymisen seurausta tai laajaa luokkaa, joka kokoaa useita prosesseja yhteen.",
      context: "Teollistumisen aikana materiaalisen ympäristön monet osat ovat muuttuneet yhdessä. Historialliset kehityskulut on siksi avattava paikallisiksi altistuksiksi, vastaanottajatiloiksi ja mitatuiksi seurauksiksi. Kansallinen teknologiaindikaattori kuvaa ympäristöä välillisesti; se ei ole organismin paikallinen kenttäannos.",
      graphLead: "Proksi seuraa lopputulosta, mutta käyrä ei nimeä vaikutusreittiä. Näytä alta BERM:n kenttähaara ja vertaa yhteistä ympäristömuutosta biologisen välivaiheen kautta kulkevaan vaikutukseen.",
    },
    proxies: {
      lead: "Vauraus, kaupunkielämä, ruutujen käyttö, ruokavalio ja perhesuunnittelu eivät vastaa samaan kausaaliseen kysymykseen. BERM sijoittaa kunkin muuttujan ketjuun: yhteiseen ympäristömuutokseen, biologiseen välivaiheeseen, yhteisvaikutukseen tai kirjaamisprosessiin. Niiden käsittely itsenäisinä kokonaisselityksinä peittää nämä erot.",
      definition: "Korreloiva proksi jakaa vaihtelua altistuksen kanssa. Välittäjä kuljettaa osan syyvaikutuksesta. Vasteen muokkaaja muuttaa sitä, miten altistus vaikuttaa. Näiden roolien erottaminen tekee peittymisestä täsmällisen väitteen.",
      sourcesTitle: "Sama tuttu nimike voi sisältää eri altistuksia",
      sources: "Ruutuaikaan voi sisältyä optista valoa, RF-altistusta, asentokuormitusta ja mediasisältöä. Henkilökohtaista RF-altistusta kuvasivat paremmin paikallismittaukset ja yhdistetyt mallit kuin oma arvio tai etäisyys kiinteään lähettimeen. Lasten ja nuorten mallinnettu kudosannos puolestaan riippui laitteen käyttötavasta ja verkkotekniikasta. Ruutuaika ei siis yksin määritä RF-annosta: kenttähaara tarvitsee oman altistuskuvauksensa. [[ref:frei2010_exposure_proxies|Frei 2010]]; [[ref:birks2021_modeled_rf_dose|Birks 2021]].",
      context: "BERM nimeää yhteyden: yhteisen infrastruktuurin, vastaanottoprosessin, biologisen välivaiheen tai mittaussäännön. Regressiokerroin tiivistää yhteyden. Kausaalinen rakenne selittää, miten yhteys muodostuu ja minkä osan proksi jättää tunnistamatta.",
    },
    parsimony: {
      lead: "BERM:n premisseillä kentän ja vastaanottajan yhteinen tarkastelu selittää yksittäistä proksia enemmän, koska se yhdistää muutoksen alkuperän sen myöhempiin seurauksiin biologisten tasojen läpi. Parsimonia syntyy samojen määriteltyjen prosessien uudelleenkäytöstä: jokainen havaittu lopputulos ei tarvitse erillistä alkuselitystä.",
      points: [
        { title: "Lajirajojen yli", text: "Sähkömagneettinen ympäristö kuuluu ihmisten, koe-eläinten, lintujen ja hyönteisten materiaalisiin olosuhteisiin. Pelkät ihmisten perhesuunnittelun instituutiot eivät kata tätä kokonaisuutta. Lajivertailut perustelevat yhteisten materiaalisten reittien etsimistä; myös kemikaalit, valo, lämpötila ja elinympäristö voivat vaikuttaa eri lajeihin. [[ref:klimentidis2010|Klimentidis 2010]]; [[ref:engels2014|Engels 2014]]." },
        { title: "Biologisten tasojen läpi", text: "BERM yhdistää vastaanottotilan kautta molekyyli- tai aistivasteen hormonaaliseen säätelyyn ja käyttäytymiseen. Ruokahalu ja syöty määrä sijoittuvat silloin selityksen peräkkäisiksi osiksi. Sensoriset ja farmakologiset interventiot rajaavat tämän rakenteen yksittäisiä liitoksia. [[ref:marlin2015_oxytocin_auditory|Marlin 2015]]; [[ref:hinkle1987_cadmium_uptake|Hinkle 1987]]." },
        { title: "Erilaisten olosuhteiden välillä", text: "Valohistoria, lisääntymiskierron vaihe ja reseptoritila antavat nimettyjä syitä vasteiden eroille. Samojen määriteltyjen ehtojen käyttö kokoaa havaintoja yhteen ja vähentää tarvetta erillisille selittämättömille poikkeuksille. [[ref:hammad2020_dark_cryptochrome|Hammad 2020]]; [[ref:reyesguerrero2010_olfactory_estrogen|Reyes-Guerrero 2010]]." },
        { title: "Mittarista biologiseen prosessiin", text: "Yhteisönimi, ilmoitettu terveysliikunta ja päivittäiset askeleet voivat kuvata saman materiaalisen ympäristön eri puolia. BERM kysyy, minkä prosessin kukin mittari tavoittaa, ja yhdistää sen jälkeen altistuksen, vasteen ja kirjatun lopputuloksen. [[ref:katz2012_amish_activity|Katz 2012]]; [[ref:stein2016_amish_immunity|Stein 2016]]." },
      ],
      comparisonTitle: "Missä mielessä selitys on parempi?",
      aggregationTitle: "Yksilövasteesta väestön seuraukseen",
      aggregation: "BERM:n ketjussa biologinen muutos siirtää yksilövasteiden jakaumaa. Syntymien määrä kertyy parisuhteiden, raskausyritysten, hedelmöittymistodennäköisyyksien ja raskauksien lopputulosten kautta ikäryhmissä ja eri ajanjaksoina. Ekologiset seuraukset kokoavat vastaavasti yksilöiden ravinnonhakua, selviytymistä ja lisääntymistä. Nämä ovat vastaanottotilan ja väestömittarin väliset eksplisiittiset vaiheet.",
      comparison: "Etu on syyrakenteen kattavuus: BERM selittää, miksi lähisyyt muuttuvat, miten ne vaikuttavat yhdessä ja miten niiden seuraukset kertyvät eri tasoilla. Tulotasoon, syötyyn määrään tai diagnoosinimeen päättyvä malli jättää nämä yhteydet selityksensä ulkopuolelle. Tämä on ilmoitetuista premisseistä seuraava rakenteellinen johtopäätös; kunkin liitoksen empiirinen vahvuus arvioidaan sen omasta näytöstä.",
      economy: "Yhteinen rakenne säilyttää optisen säteilyn sekä ELF-, IF- ja RF-altistusten erilliset annokset ja vastaanottomekanismit. Selityksen taloudellisuus syntyy näiden määriteltyjen mekanismien ja kokoamissääntöjen käytöstä useiden havaintojen yhteydessä.",
    },
    receiver: {
      lead: "Eliöt käyttävät jatkuvasti ympäristön vihjeitä: hajua, ääntä, valon ajoitusta tai kukan sähköisiä ominaisuuksia. Vihje vaikuttaa, kun vastaanottava järjestelmä havaitsee sen ja antaa sille biologisen merkityksen. Vastaanottava järjestelmä muuttuu fysiologian ja kokemusten mukana.",
      claim: "Sama aistivihje voi tuottaa erilaisen vasteen, kun vastaanottajan hormonaalinen tai hermostollinen tila muuttuu.",
      ipmTitle: "Kemiallinen signaali voi säädellä lisääntymistä",
      ipm: "Paljastuisamyyrällä kuningattaren hajuun liittyvä isopropyylimyristaatti eli IPM ylläpiti lisääntymisen estymistä kuningattaren poistamisen jälkeen. Koe tunnistaa ulkoisen kemiallisen signaalin, joka pystyy ylläpitämään nisäkäsyhteisön lisääntymistilaa. Sähkömagneettista altistusta ei tässä kokeessa muutettu. [[ref:khallaf2026_queen_odour|Khallaf 2026]].",
      oxytocinTitle: "Hormoni voi muuttaa äänen merkitystä",
      oxytocin: "Hiirellä oksitosiini muutti poikaskutsujen käsittelyä kuuloaivokuoressa ja helpotti hoivavasteen syntymistä. Saman tutkimuslinjan hermopiirikokeet paikansivat osan hoivan sosiaalisesta oppimisesta. Nämä ovat suoria aistikäsittelyn ja käyttäytymisen interventioita. [[ref:marlin2015_oxytocin_auditory|Marlin 2015]]; [[ref:carcea2021_maternal_learning|Carcea 2021]].",
      context: "Käyttäytymisen muutos voi alkaa ennen tietoista päätöstä. Saapuva vihje, sen tulkinta ja opittu vaste ovat ketjun eri osia. Vaikutuksen suunta riippuu vihjeestä: lisääntymistä estävän signaalin heikkeneminen voisi vapauttaa lisääntymistä, kun taas hoivaa tukevan vihjeen heikkenemisellä voisi olla toinen seuraus.",
      lightTitle: "Valo sekä viestii että valmistaa vastaanottajaa",
      lightIntro: "Valo on sähkömagneettista säteilyä. Optisen säteilyn, erittäin matalien taajuuksien (ELF), välitaajuuksien (IF) ja radiotaajuuksien (RF) erottelu auttaa mittaamaan niiden absorptiota ja vastaanottoa. Niiden biologiset kytkennät kuuluvat silti samaan selitykseen.",
      lightRoles: [
        { title: "Välitön signaali", text: "Valoa absorboiva molekyyli käynnistää vasteen senhetkiseen valaistukseen." },
        { title: "Valmistunut vastaanottotila", text: "Valo muuttaa fotokemiallista tai redox-tilaa, joka voi vaikuttaa myöhempään kenttävasteeseen." },
        { title: "Biologinen historia", text: "Aikaisempi valoaltistus muuttaa vuorokausivaihetta, hormonisignalointia ja proteiinien ilmentymistä." },
      ],
      lightStudies: "Lituruoholla (Arabidopsis) kryptokromivaste voimistui, kun magneettikenttä annettiin sinivaloa seuranneiden pimeäjaksojen aikana. Hiiren lihassoluissa pimeässä kasvatus heikensi vastetta pulssimagneettikenttään, samoin CRY2:n tai riboflaviinikinaasin vaimentaminen. Tutkimukset tunnistavat valohistorian ja molekyylitilan merkitystä omissa altistusprotokollissaan. [[ref:hammad2020_dark_cryptochrome|Hammad 2020]]; [[ref:iversen2025|Iversen 2025]].",
      fieldBridge: "ELF-kokeessa rotan hajukäämin estrogeenireseptorin ilmentymä muuttui eri tavoin lisääntymiskierron eri vaiheissa. Erillinen solukoe mittasi MT1-reseptoriin liittyvän hormonisignaloinnin muutosta. BERM:ssä nämä mittaukset rajaavat kenttäsyötteen ja vastaanottotilan liitosta; edellä kuvatut sensoriset interventiot rajaavat seuraavaa liitosta vastaanottotilasta käyttäytymiseen. [[ref:reyesguerrero2010_olfactory_estrogen|Reyes-Guerrero 2010]]; [[ref:girgert2010_mt1_signaling|Girgert 2010]].",
    },
    mixtures: {
      lead: "Altistus voidaan mitata tarkasti, vaikka osa sen vaikutustavasta jäisi piiloon. Solun ulkopuolinen määrä, soluun pääsevä määrä ja solun vaste tähän määrään ovat eri suureita.",
      claim: "Kemiallinen altistus, soluun kulkeutuminen ja vastaanottajan tila voivat yhdessä muovata lopputulosta. Yksi altistusmittari voi jättää yhteisehdon kirjaamatta.",
      internalDose: "Kadmiumkokeessa kalsiumkanavien aktivoijat ja salpaajat muuttivat soluunottoa ja toksisuutta. Farmakologinen tulos osoittaa, miksi sama ulkoinen pitoisuus ei takaa samaa sisäistä annosta. Koe oli kentätön. Erillisessä hiiritutkimuksessa yhdistettiin suoraan 50 Hz:n magneettikenttä ja lyijy sekä mitattiin antioksidantti- ja kalvovasteita. Interventiot paikantavat ketjun eri osia: kuljetusta, sisäistä annosta ja yhteisaltistuksen vastetta. [[ref:hinkle1987_cadmium_uptake|Hinkle 1987]]; [[ref:liu2002_elf_lead|Liu 2002]].",
      context: "Jos kenttäolosuhde on tutkimuksessa lähes kaikille yhteinen mutta kemiallinen altistus vaihtelee, kemikaalille mitattu vaikutus voi sisältää kentästä riippuvan osuuden. Kemikaali on edelleen todellinen syy. Piiloon voi jäädä sen vaikutusta muuttava ehto. Yhteisvaikutuksen suunta ja suuruus riippuvat kyseisestä kemikaalista, kudoksesta ja protokollasta.",
      flowerTitle: "Kemiallinen vaikutus voi kulkea sähköisen vihjeen kautta",
      flower: "Lannoitekäsittely muutti kukkien sähköisiä vihjeitä ja vähensi kimalaisten ravinnonhakua. Kemiallinen altistus ja sähköinen viestintä kuuluivat samaan tutkittuun prosessiin. Kemikaalin tunnistaminen ei siis vielä päättänyt selitystä siitä, miten käyttäytymisvaikutus syntyi. Tulos ei tunnista tämän prosessin ulkoista RF-syytä. [[ref:hunting2022_floral_electric_cues|Hunting 2022]].",
      link: "Kemiallinen altistus ja vastaanottajan tila",
    },
    compensation: {
      lead: "Eliöllä on usein useampi tapa suoriutua samasta tehtävästä. Lintu voi käyttää magneettisen tiedon lisäksi taivaankappaleiden vihjeitä. Lopputulos voi siksi säilyä, vaikka tapa, jolla se saavutetaan, muuttuisi.",
      claim: "Havaittu lopputulos riippuu käytettävissä olevista reiteistä ja niiden kompensaatiosta sekä tarkasteltavan reitin tilasta.",
      study: "Lehtokertut säilyttivät vuodenajan mukaisen suuntautumisensa värähtelevässä magneettikentässä, kun tähtivihjeet olivat näkyvissä. Tulos sopii vaihtoehtoisen vihjeen käyttöön. Kokeessa ei samanaikaisesti osoitettu näiden samojen lintujen magneettireseptorin häiriötä. [[ref:bojarinova2024_stellar_cues|Bojarinova 2024]].",
      steps: [
        { title: "Yksi kanava", text: "Vaste riippuu tietystä aistiradasta." },
        { title: "Useita kanavia", text: "Vaihtoehtoiset vihjeet voivat osallistua samaan tehtävään." },
        { title: "Kirjattu lopputulos", text: "Pelkkä suunta tai suoriutuminen ei kerro kunkin kanavan osuutta." },
      ],
      context: "BERM erottaa siksi vastaanottoprosessin havaintoprosessista. Reseptorivaste, hormonimittaus ja koko organismin toiminta vastaavat eri kysymyksiin. Kompensaatio kuvataan kyseisessä järjestelmässä nimettynä mekanismina, joten sitä ei liitetä automaattisesti jokaiseen muuttumattomaan tulokseen.",
    },
    species: {
      lead: "Muut lajit auttavat erottamaan biologisia mekanismeja selityksistä, jotka vaativat juuri ihmisten instituutioita tai tietoisia valintoja. Hyödyllisin vertailu nimeää organismin, toiminnon ja todella tutkitun altistuksen. Sentinellillä tarkoitetaan tässä lajia, jonka tiettyä toimintoa voidaan käyttää ympäristön vaikutuksen havainnointiin.",
      claim: "Lajien väliset havainnot voivat laajentaa syykysymyksen ihmisten valinnoista biologiseen säätelyyn ja yhteisiin materiaalisiin ympäristöihin.",
      klimentidis: "Klimentidis kollegoineen kokosi yli 20 000 eläimen tiedot kahdeksasta lajista. Painon trendi oli positiivinen kaikissa 12 populaatiossa, kun sukupuolet yhdistettiin. Laboratorioravinnon koostumus oli pitkälti vakaa, mutta syötyä määrää ja liikkumista ei kaikkialla pidetty vakiona. Havainto avaa kysymyksen siitä, miksi energiansaanti tai -käyttö muuttuu; EMF-altistusta tutkimuksessa ei mitattu. [[ref:klimentidis2010|Klimentidis 2010]].",
      tableTitle: "Sentinellit valitaan toiminnon perusteella",
      tableHeaders: ["Organismi / järjestelmä", "Mitä mitattiin?", "Mitä se tuo kokonaisuuteen?"],
      rows: [
        { name: "Punarinta", measured: "Magneettikompassin suuntautuminen RF-kohinan muuttuessa.", role: "Suora toiminnallinen kenttävaste; päätemuuttuja on suuntautuminen.", source: "[[ref:engels2014|Engels 2014]]" },
        { name: "Kimalainen / kukka", measured: "Kukan sähköiset muutokset ja ravinnonhaku kemiallisen käsittelyn jälkeen.", role: "Kemikaali → sähköinen vihje → käyttäytyminen -yhteys.", source: "[[ref:hunting2022_floral_electric_cues|Hunting 2022]]" },
        { name: "Tarhamehiläinen", measured: "Kukalle laskeutumiset paikallista sähkökenttää muutettaessa.", role: "Suora ekologisesti merkityksellisen käyttäytymisen interventio.", source: "[[ref:mallinson2025_electric_pollution|Mallinson 2025]]" },
        { name: "Lehtokerttu", measured: "Suuntautuminen tähtivihjeiden ollessa saatavilla RF-altistuksessa.", role: "Vaihtoehtoiset vihjeet ja säilyneen toiminnan tulkinta.", source: "[[ref:bojarinova2024_stellar_cues|Bojarinova 2024]]" },
        { name: "Yhteiskutevat korallit", measured: "Kutuajankohtien yhteys optiseen yövaloon.", role: "Optisen ajoituksen yhteys; hedelmöittymisen laskua ei mitattu tässä globaalissa aineistossa.", source: "[[ref:davies2023_coral_light|Davies 2023]]" },
        { name: "Paljastuisamyyrä", measured: "Lisääntymissuppressio kuningattaren hajusignaalin interventiossa.", role: "Sensorisen lisääntymissäätelyn vertailujärjestelmä; EMF-herkkyyttä ei tutkittu.", source: "[[ref:khallaf2026_queen_odour|Khallaf 2026]]" },
      ],
      context: "Nämä järjestelmät tuovat eri osia ketjuun. Kemiallinen signaalikoe, optinen ajoitustutkimus ja RF-kompassikoe ovat eri altistustutkimuksia. BERM:n synteesi yhdistää niiden mitattuja toimintoja säilyttäen kunkin vastaanottomekanismin ja taajuusalueen näkyvissä.",
      link: "Tutustu ekologiseen näyttöön",
      klimentidisLink: "Avaa Klimentidis-vertailu",
    },
    community: {
      lead: "Yhteisönimi voi koota valaistuksen, työn, liikkumisen, mikrobit, teknologian käytön ja lisääntymiskäytännöt yhdeksi muuttujaksi. Ryhmien välinen ero on lähtökohta näiden materiaalisten reittien tunnistamiseen.",
      claim: "Elämäntapa- tai yhteisöluokka voi ennustaa lopputulosta samalla, kun sen sisältämien altistusten ja biologisten prosessien erot jäävät piiloon.",
      chartLead: "Ohion vertailussa Amish-aikuiset ilmoittivat vähemmän terveyden vuoksi harrastettua liikuntaa, vaikka askelmittaus osoitti enemmän kokonaisliikettä. Alla oleva miesryhmien vertailu havainnollistaa, miksi toiminnan tarkoitus ja fyysinen kokonaismäärä ovat eri mittareita. [[ref:katz2012_amish_activity|Katz 2012]].",
      dustTitle: "Yhteisönimestä siirrettävään altisteeseen",
      dust: "Amish–hutteriitti-tutkimus eteni pidemmälle: kodin pölyä, immuunilukemia ja hiiren astmamallia tutkittiin yhdessä. Amish-pölyn suojaava vaikutus hiirissä riippui nimetystä synnynnäisen immuniteetin signaloinnista. Osa ryhmävertailusta sai siten materiaalisen, kokeellisesti tutkitun vaikutusreitin. Koe käsitteli pölyä ja immuniteettia; se ei ollut mitattu EMF-vertailu. [[ref:stein2016_amish_immunity|Stein 2016]].",
      context: "Sama periaate koskee BERM:n kenttähaaraa: ryhmänimen tilalle tarvitaan määritellyt altistukset ja vastaanottajatilat. Aktiivisuus, mikrobiympäristö ja valo voivat olla todellisia biologisia syötteitä. Niiden suhde kenttään — rinnakkainen vaikutus, yhteisvaikutus tai välittyminen — nimetään erikseen.",
      link: "Lue Amish-vertailuista",
    },
    reasons: {
      lead: "Ihminen kuvaa päätöksiään kokemuksensa kautta: jaksamisena, kiinnostuksena, stressinä, läheisyytenä, mahdollisuuksina ja käytännön rajoitteina. Kuvaukset voivat olla vilpittömiä ja vaikuttaa toimintaan, vaikka ihminen ei havaitsisi kaikkia kokemusta muovaavia prosesseja.",
      claim: "Ilmoitettu syy voi kuvata merkityksellistä myöhempää tilaa ja jättää silti sen biologisen ja ympäristöllisen historian avoimeksi.",
      text: "BERM sijoittaa koetun merkityksen ja motivaation jatkuvaan biologiseen ja sosiaaliseen ketjuun. Vastaanottavuuden muutos voi muuttaa sitä, miltä vihje tuntuu; kokemus vaikuttaa käyttäytymiseen; toistuva käyttäytyminen muuttaa sosiaalisia kontakteja ja myöhemmin kohdattavia vihjeitä. Motiivit, oppiminen ja materiaaliset rajoitteet säilyvät ketjun nimettyinä osina.",
      distinction: "Hoiva, seksuaalinen motivaatio, halu saada lapsia, ovulaatio ja raskaus ovat eri päätemuuttujia. Sensoriset tutkimukset tukevat tiettyjä siirtymiä; niiden yhdistäminen EMF:stä ihmisen lisääntymiskäyttäytymiseen kulkevaksi ketjuksi on BERM:n ehdollinen synteesi. Malli ei edellytä, että jokainen antaa saman perustelun tai reagoi samaan suuntaan.",
      context: "Kun analyysissä vakioidaan uni, stressi tai käyttäytyminen, muuttujan tehtävä on ensin tunnistettava: onko se aikaisempi syy, välivaihe vai usean syyn yhteinen seuraus? Välivaiheen pitäminen vakiona tarkastelee jäljelle jäävää suoraa reittiä; se ei mittaa koko aikaisempaa vaikutusta, joka kulkee tämän vaiheen kautta.",
      link: "Käyttäytyminen ja koetut syyt",
      epistapegeLink: "Miten selitykset vakiintuvat instituutioihin?",
    },
    synthesis: {
      lead: "Proxy masking pitää koko vaikutusketjun näkyvissä. BERM antaa sille eksplisiittisen fysikaalisen lähtökohdan ja ehdollisen vastaanotto-operaattorin. Eri alojen tutkimukset tuovat biologisia osatekijöitä ja havaittuja seurauksia.",
      levels: [
        { title: "Lindgrenistä johdettu geometria", text: "Vuoden 2025 muotoilu määrittää tensorisen muutoksen, kun tausta ja ulkoinen osuus yhdistetään. Niiden ristiosat säilyvät ennen biologisen vasteen määrittämistä." },
        { title: "Tuotu empiirinen biologia", text: "Aisti-, farmakologia- ja ekologiakokeet rajaavat vastaanottajia, sisäisiä annoksia, ajoitusta ja toiminnallisia seurauksia omissa järjestelmissään." },
        { title: "BERM:n ehdollinen mekanismi", text: "Tilasta riippuva vastaanotto-operaattori yhdistää geometrisen syötteen nimettyihin biologisiin muutoksiin. Malli kokoaa niiden jatkon käyttäytymisen, vuorovaikutusten ja kirjattujen seurausten kautta." },
        { title: "Avoin kalibrointi", text: "Fysikaalinen asteikko, gauge-resepti, kudosvaste, etumerkki, viive ja ihmispäätemuuttujien kalibrointi tarvitsevat määrityksen. Osatutkimus ei yksin ratkaise koko historiallista selitysosuutta." },
      ],
      mathTitle: "Avaa matemaattinen yhteys",
      mathIntro: "BERM:n asteikolla κ Lindgrenin vuoden 2025 lähtökohta ja jako A = A₀ + a antavat seuraavan tarkan tensorilaajennuksen. Tämä on geometrinen vaihe. [[ref:lindgren2025|Lindgren 2025]].",
      bridge: "Biologinen vaihe edellyttää lisäksi nimettyä aine–metriikka-kytkentää ja kausaalista vasteoperaattoria. Vastaanottotilaan sisältyvät valohistoria L, kemiallinen tila M, farmakologinen interventio D sekä muu fysiologinen ja oppimishistoria H.",
      mathEnd: "Operaattorin ydin, asteikko ja kudoskohtaiset parametrit säilyvät mallin eksplisiittisinä oletuksina. Optisen ja RF-värähtelyn suoran ristiosan ei tarvitse säilyä aikakeskiarvossa, jotta valo voisi muuttaa myöhempää vastetta vastaanottotilan kautta. FieldState voi toimittaa fysikaalisen syötteen havaintoja tai estimaatteja; selittävä operaattori kuuluu BERM:lle.",
      mathLink: "Lue koko tensorijohto",
      final: "Kokoava ajatus on, että mitattu kemikaali, käyttäytyminen tai elämäntapaluokka voi selittää tulosta samalla, kun aikaisempi ehto jää nimeämättä. Kun signaalia, vastaanottajaa ja havaittua lopputulosta seurataan erikseen, nämä ehdot tulevat näkyviksi mallin rakenteessa.",
      visualKeyTitle: "Näin luet havainnollistuksia",
      visualKey: "Kausaalikaavio ja vastekäyrät selittävät nimettyjä mekanismeja havainnollistavilla arvoilla. Ne eivät ole mitattuja altistushistorioita tai sovitettuja ihmisen annos–vastekäyriä. Amish-aktiivisuuskuva käyttää julkaistuja ryhmämittauksia, joiden eri yksiköt esitetään erillisissä paneeleissa. Alkuperäistutkimukset on linkitetty niitä koskevan väitteen yhteyteen.",
      branchesTitle: "Neljä toisiinsa liittyvää evidenssihaaraa",
      branches: [
        { title: "Mekanistinen ketju", text: "Kuljetus, sisäinen annos sekä kentän ja kemikaalin yhteisvaikutus.", href: "/evidence/heavy-metal-synergy" },
        { title: "Lajienväliset vertailut", text: "Yhteinen biologia ja ympäristömuutoksia paljastavat toiminnot.", href: "/evidence/ecology" },
        { title: "Yhteisövertailut", text: "Yhteisönimestä mitattuihin materiaalisiin reitteihin.", href: "/evidence/amish-control" },
        { title: "Farmakologiset interventiot", text: "Mitä prosessin estäminen, voimistaminen tai palauttaminen kertoo vaikutusketjusta.", href: "/evidence/pharmacology" },
      ],
    },
  },
  ja: {},
  fr: {},
  ko: {},
} as const;

const SECTION_IDS = ["hidden-mechanism", "causal-chain", "proxy-explanations", "receiver-state", "joint-exposures", "compensation", "sentinel-species", "community-proxies", "experienced-reasons", "syndrome-fragmentation", "demographic-explanations", "explanatory-parsimony", "berm-synthesis"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as typeof COPY.en;
  const path = `/${locale}/model/proxy-masking`;
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(locales.map((language) => [language, `/${language}/model/proxy-masking`])),
    },
    openGraph: { title: d.title, description: d.subtitle, url: path, type: "article" },
  };
}

export default async function ProxyMaskingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as typeof COPY.en;
  const paragraph = (text: string) => <p className="max-w-[72ch] text-base leading-[1.85] text-foreground-muted"><InlineReferenceText text={text} locale={locale} /></p>;
  const link = (href: string, label: string) => <Link href={`/${locale}${href}`} className="inline-flex max-w-full items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{label}<ArrowUpRight className="size-4 shrink-0" aria-hidden="true" /></Link>;
  const context = (text: string) => <aside className="border-l-2 border-accent/50 py-1 pl-5"><p className="mb-2 text-sm font-semibold text-foreground">{d.contextLabel}</p>{paragraph(text)}</aside>;
  const section = (index: number, children: ReactNode) => <section id={SECTION_IDS[index]} aria-labelledby={`${SECTION_IDS[index]}-heading`} className="space-y-6 border-t border-card-border pt-9 sm:pt-12"><div className="flex items-baseline gap-3"><span className="font-mono text-xs text-accent" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h2 id={`${SECTION_IDS[index]}-heading`} className="editorial-section-heading">{d.sections[index]}</h2></div>{children}</section>;
  const contents = <ol className="space-y-3">{SECTION_IDS.map((id, index) => <li key={id}><a href={`#${id}`} className="group flex gap-3 rounded-sm text-sm leading-relaxed text-foreground-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><span className="pt-0.5 font-mono text-[10px] text-accent/80" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{d.sections[index]}</span></a></li>)}</ol>;

  return (
    <article>
      <TranslationNotice copy={COPY} locale={locale} />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <Link href={`/${locale}/model`} className="mb-8 inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-accent"><span aria-hidden="true">←</span>{d.back}</Link>
        <p className="editorial-kicker mb-4">{d.kicker}</p>
        <PageHeader icon={ScanEye} title={d.title} subtitle={d.subtitle} />
        <div className="mb-12 max-w-3xl space-y-5">
          <p className="text-lg leading-[1.85] sm:text-xl">{d.intro}</p>
          {paragraph(d.definition)}
          {paragraph(d.proposal)}
          <ProxyMaskingLevels locale={locale} />
          <div className="border-l-2 border-accent py-2 pl-5">
            <p className="editorial-kicker mb-2">{d.proposalLabel}</p>
            <p className="font-serif text-xl leading-relaxed sm:text-2xl">{d.centralQuestion}</p>
          </div>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-12">
          <aside className="min-w-0 lg:sticky lg:top-[calc(var(--site-header-height,4rem)+1.5rem)]">
            <nav aria-label={d.reading} className="hidden lg:block">
              <p className="editorial-kicker mb-5">{d.reading}</p>
              {contents}
            </nav>
            <details className="rounded-lg border border-card-border px-5 py-4 lg:hidden" open>
              <summary className="cursor-pointer text-sm font-semibold">{d.reading}</summary>
              <nav aria-label={d.reading} className="mt-4">{contents}</nav>
            </details>
          </aside>

          <div className="min-w-0 space-y-12 sm:space-y-16">
            {section(0, <>
              <ProxyPremises locale={locale} />
              <ProxyMechanismEvidence locale={locale} />
            </>)}

            {section(1, <>
              {paragraph(d.first.lead)}
              {paragraph(d.first.graphLead)}
              <ProxyMaskingCurveExplorer locale={locale} />
              <ProxyDeductions locale={locale} />
              {context(d.first.context)}
            </>)}

            {section(2, <>
              {paragraph(d.proxies.lead)}
              {paragraph(d.proxies.definition)}
              <ProxyExplanationsExplorer locale={locale} />
              <CombinedExposurePanel locale={locale} focus="proxy" />
              <ProxyMeasuredExposureEvidence locale={locale} />
              <ProxyInfrastructureEvidence locale={locale} />
              <RedoxReserveMasking locale={locale} />
              <div className="space-y-3"><h3 className="text-lg font-semibold">{d.proxies.sourcesTitle}</h3>{paragraph(d.proxies.sources)}</div>
              {context(d.proxies.context)}
              <a href="#demographic-explanations" className="inline-block text-sm text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{locale === "fi" ? "Miten tämä koskee väestötieteen 23 selitystä?" : "How does this apply to 23 demographic explanations?"}</a>
            </>)}

            {section(3, <>
              {paragraph(d.receiver.lead)}
              <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.proxy.sensory-receiver-state">{d.receiver.claim}</ClaimRef></p>
              <ReceiverStateExplorer locale={locale} />
              <ProxyHumanSensoryEvidence locale={locale} />
              <div className="space-y-3"><h3 className="text-lg font-semibold">{d.receiver.ipmTitle}</h3>{paragraph(d.receiver.ipm)}</div>
              <div className="space-y-3"><h3 className="text-lg font-semibold">{d.receiver.oxytocinTitle}</h3>{paragraph(d.receiver.oxytocin)}</div>
              {context(d.receiver.context)}
              <div className="space-y-5 border-t border-card-border pt-7">
                <h3 className="font-serif text-2xl">{d.receiver.lightTitle}</h3>
                {paragraph(d.receiver.lightIntro)}
                <ol className="space-y-4">{d.receiver.lightRoles.map((role, index) => <li key={role.title} className="flex gap-4"><span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full border border-accent/30 text-xs text-accent">{index + 1}</span><div><h4 className="mb-1 text-sm font-semibold">{role.title}</h4><p className="text-sm leading-relaxed text-foreground-muted">{role.text}</p></div></li>)}</ol>
                {paragraph(d.receiver.lightStudies)}
                {paragraph(d.receiver.fieldBridge)}
              </div>
            </>)}

            {section(4, <>
              {paragraph(d.mixtures.lead)}
              <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.proxy.chemical-field-conditions">{d.mixtures.claim}</ClaimRef></p>
              {paragraph(d.mixtures.internalDose)}
              <InteractionExplorer locale={locale} />
              {context(d.mixtures.context)}
              <ProxyBarrierEvidence locale={locale} />
              <div className="space-y-3"><h3 className="text-lg font-semibold">{d.mixtures.flowerTitle}</h3>{paragraph(d.mixtures.flower)}</div>
              {link("/evidence/heavy-metal-synergy", d.mixtures.link)}
            </>)}

            {section(5, <>
              {paragraph(d.compensation.lead)}
              <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.proxy.compensated-endpoint">{d.compensation.claim}</ClaimRef></p>
              {paragraph(d.compensation.study)}
              <ol className="grid gap-3 sm:grid-cols-3">{d.compensation.steps.map((step, index) => <li key={step.title} className="relative border-t-2 border-accent/40 bg-figure-bg px-4 py-5"><p className="mb-2 font-mono text-xs text-accent" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p><h3 className="mb-2 text-sm font-semibold">{step.title}</h3><p className="text-sm leading-relaxed text-foreground-muted">{step.text}</p></li>)}</ol>
              {context(d.compensation.context)}
            </>)}

            {section(6, <>
              {paragraph(d.species.lead)}
              <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.proxy.comparative-mediator-question">{d.species.claim}</ClaimRef></p>
              {paragraph(d.species.klimentidis)}
              {link("/evidence/klimentidis-explained", d.species.klimentidisLink)}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{d.species.tableTitle}</h3>
                <div className="hidden grid-cols-[1fr_1.4fr_1.6fr] gap-4 border-b border-card-border pb-3 text-xs font-semibold text-foreground-muted sm:grid" aria-hidden="true">{d.species.tableHeaders.map((heading) => <span key={heading}>{heading}</span>)}</div>
                <ul className="divide-y divide-card-border">{d.species.rows.map((row) => <li key={row.name} className="grid gap-3 py-5 sm:grid-cols-[1fr_1.4fr_1.6fr] sm:gap-4"><div><h4 className="text-sm font-semibold">{row.name}</h4><div className="mt-2 text-xs"><InlineReferenceText text={row.source} locale={locale} /></div></div><p className="text-sm leading-relaxed text-foreground-muted"><span className="mr-1 font-medium text-foreground sm:sr-only">{d.species.tableHeaders[1]} </span>{row.measured}</p><p className="text-sm leading-relaxed text-foreground-muted"><span className="mr-1 font-medium text-foreground sm:sr-only">{d.species.tableHeaders[2]} </span>{row.role}</p></li>)}</ul>
              </div>
              <ProxyTranslationEvidence locale={locale} />
              <ProxyQuantitativeEvidence locale={locale} />
              {context(d.species.context)}
              {link("/evidence/ecology", d.species.link)}
            </>)}

            {section(7, <>
              {paragraph(d.community.lead)}
              <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.proxy.environmental-group-interpretation">{d.community.claim}</ClaimRef></p>
              {paragraph(d.community.chartLead)}
              <ActivityProxyChart locale={locale} />
              <div className="space-y-3"><h3 className="text-lg font-semibold">{d.community.dustTitle}</h3>{paragraph(d.community.dust)}</div>
              {context(d.community.context)}
              {link("/evidence/amish-control", d.community.link)}
            </>)}

            {section(8, <>
              {paragraph(d.reasons.lead)}
              <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.behavior.reported-reasons">{d.reasons.claim}</ClaimRef></p>
              {paragraph(d.reasons.text)}
              <ProxyInterpreterEvidence locale={locale} />
              {paragraph(d.reasons.distinction)}
              {context(d.reasons.context)}
              <div className="flex flex-wrap gap-x-6 gap-y-4">{link("/behavior", d.reasons.link)}{link("/civilization/epistapege", d.reasons.epistapegeLink)}</div>
            </>)}

            <ReproductiveRegulationIntegration locale={locale} context="proxy" />
            {section(9, <ProxySyndromeEvidence locale={locale} />)}

            {section(10, <ProxyDemographicEvidence locale={locale} />)}

            {section(11, <>
              {paragraph(d.parsimony.lead)}
              <ExplanatoryLevelsDiagram locale={locale} />
              <ProxyCoverageMatrix locale={locale} />
              <div className="divide-y divide-card-border">{d.parsimony.points.map((point) => <div key={point.title} className="space-y-3 py-5"><h3 className="text-lg font-semibold">{point.title}</h3>{paragraph(point.text)}</div>)}</div>
              <div className="space-y-3"><h3 className="text-lg font-semibold">{d.parsimony.aggregationTitle}</h3>{paragraph(d.parsimony.aggregation)}</div>
              <div className="space-y-3 border-l-2 border-accent pl-5"><h3 className="text-lg font-semibold">{d.parsimony.comparisonTitle}</h3>{paragraph(d.parsimony.comparison)}</div>
              {paragraph(d.parsimony.economy)}
            </>)}

            {section(12, <>
              {paragraph(d.synthesis.lead)}
              <dl className="grid gap-x-7 gap-y-6 sm:grid-cols-2">{d.synthesis.levels.map((level, index) => <div key={level.title} className="border-t-2 border-card-border pt-4"><dt className="mb-2 text-sm font-semibold"><span className="mr-2 font-mono text-xs text-accent" aria-hidden="true">{index + 1}.</span>{level.title}</dt><dd className="text-sm leading-relaxed text-foreground-muted">{level.text}</dd></div>)}</dl>
              <details className="group min-w-0 rounded-lg border border-card-border bg-figure-bg p-5 sm:p-6">
                <summary className="cursor-pointer text-sm font-semibold marker:text-accent">{d.synthesis.mathTitle}</summary>
                <div className="mt-6 min-w-0 space-y-5">
                  {paragraph(d.synthesis.mathIntro)}
                  <MathBlock tex={String.raw`g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,\qquad A=A_0+a`} />
                  <MathBlock tex={String.raw`\Delta g_{\mu\nu}=\kappa\left(A_{0\mu}a_\nu+a_\mu A_{0\nu}+a_\mu a_\nu\right)`} />
                  {paragraph(d.synthesis.bridge)}
                  <MathBlock tex={String.raw`\delta S_m=\tfrac12\int\sqrt{-g}\,T^{\mu\nu}\delta g_{\mu\nu}\,d^4x`} />
                  <MathBlock tex={String.raw`r_i(t)=\int_{-\infty}^{t}\Xi^{\mu\nu}_{i,R}\!\left(t,t';\mathcal S_i(t')\right)\Delta g_{\mu\nu}(t')\,dt'`} />
                  <MathBlock tex={String.raw`\mathcal S_i(t')=\mathcal S_i\!\left[L_{\le t'},M_{\le t'},D_{\le t'},H_{\le t'}\right]`} />
                  {paragraph(d.synthesis.mathEnd)}
                  {link("/model/tensor-derivation", d.synthesis.mathLink)}
                </div>
              </details>
              <p className="border-l-2 border-accent pl-5 font-serif text-xl leading-relaxed">{d.synthesis.final}</p>
              <div className="space-y-3"><h3 className="text-sm font-semibold">{d.synthesis.visualKeyTitle}</h3>{paragraph(d.synthesis.visualKey)}</div>
              <nav aria-label={d.synthesis.branchesTitle} className="border-t border-card-border pt-7">
                <h3 className="mb-5 text-lg font-semibold">{d.synthesis.branchesTitle}</h3>
                <div className="grid gap-4 sm:grid-cols-2">{d.synthesis.branches.map((branch) => <Link key={branch.href} href={`/${locale}${branch.href}`} className="group rounded-lg border border-card-border p-5 transition-colors hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><div className="mb-2 flex items-center justify-between gap-3"><h4 className="text-base font-semibold group-hover:text-accent">{branch.title}</h4><ArrowUpRight className="size-4 shrink-0 text-accent" aria-hidden="true" /></div><p className="text-sm leading-relaxed text-foreground-muted">{branch.text}</p></Link>)}</div>
              </nav>
              <a href="#hidden-mechanism" className="inline-flex items-center gap-2 text-sm text-accent hover:underline"><ArrowDown className="size-4 rotate-180" aria-hidden="true" />{d.sections[0]}</a>
            </>)}
          </div>
        </div>
      </div>
    </article>
  );
}
