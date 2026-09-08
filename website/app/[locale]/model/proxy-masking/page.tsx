import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ScanEye } from "lucide-react";
import { ClaimRef } from "@/components/ClaimRef";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { MathBlock } from "@/components/MathBlock";
import { PageHeader } from "@/components/PageHeader";
import {
  ActivityProxyChart,
  InteractionExplorer,
  MaskingChainDiagram,
  ReceiverStateExplorer,
} from "@/components/ProxyMaskingExplorers";
import { TranslationNotice } from "@/components/TranslationNotice";
import { locales, pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Proxy masking: how an underlying effect becomes hidden",
    subtitle: "Why a useful explanation can describe the middle of a causal chain — and how BERM connects the chain back to physical conditions and biological responsiveness.",
    back: "Model overview",
    kicker: "BERM · Understanding the explanation",
    intro: "An animal gains weight. It eats more, so increased food intake explains the weight gain. But why did its appetite change? Food intake can be both a real cause of weight gain and an intermediate step in a longer biological process. An explanation can be correct while leaving the beginning of the chain unresolved.",
    definition: "A proxy is an indirect measure: something we can observe in place of a harder-to-measure process. Here, masking means that an earlier effect becomes hard to recognise behind a correlated measure, an intermediate biological change or the way the outcome is recorded.",
    proposal: "BERM proposes that changes in the electromagnetic environment can enter such chains through the state of biological receivers. Light, chemical exposure, hormonal state and previous experience can shape the response. The visible result may then be described as diet, behaviour, lifestyle or a difference between communities.",
    proposalLabel: "The model’s central question",
    centralQuestion: "Does the observed explanation identify the beginning of the process, or one of its later stages?",
    reading: "On this page",
    readingHint: "Follow the explanation from a familiar example to biological mechanisms, comparisons and the model’s synthesis.",
    sections: [
      "An explanation within a longer chain",
      "The same cue, a different receiver",
      "When exposures act together",
      "When compensation preserves function",
      "What other species reveal",
      "What a group label contains",
      "From biological state to a reported reason",
      "How BERM joins the evidence",
    ],
    contextLabel: "Why this matters",
    sourceLabel: "Original studies",
    modelLabel: "BERM’s interpretation",
    measuredLabel: "Observed component",
    detailLabel: "Read the underlying evidence",
    first: {
      lead: "Before interpreting a correlation, ask what role each variable plays. The same word — such as lifestyle — can refer to an environmental input, a behavioural consequence or a broad label that combines many processes.",
      roles: [
        { title: "A correlated measure", text: "Technology use, urbanisation or income may track a changing environment. A strong association alone does not establish which part of that environment produces the response." },
        { title: "An intermediate step", text: "A change in sleep, appetite or activity can transmit an earlier effect. Statistically holding that intermediate step fixed can remove part of the very pathway being examined." },
        { title: "A condition of the response", text: "Light history, a chemical exposure or the state of a tissue may determine whether another input has a visible effect. Averaging across those conditions can conceal different responses." },
      ],
      context: "Industrialisation changed several parts of the material environment together. Historical trends therefore have to be separated into local exposures, receiving states and measured outcomes. A national technology indicator is an indirect measure of that environment; it is not an organism’s local field dose.",
      graphLead: "The diagram lets you open the explanation backwards. The extended chain is BERM’s proposed causal structure; its biological transitions are examined in the sections below.",
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
      fieldBridge: "For the sensory branch, an ELF study found that oestrogen-receptor expression in the rat olfactory bulb changed differently across reproductive-cycle phases. A separate cell experiment measured altered MT1-associated hormonal signalling. BERM uses these as candidate links between field exposure and responsiveness; neither study directly measured an EMF-induced loss of oxytocin-dependent caregiving. [[ref:reyesguerrero2010_olfactory_estrogen|Reyes-Guerrero 2010]]; [[ref:girgert2010_mt1_signaling|Girgert 2010]].",
    },
    mixtures: {
      lead: "An exposure can be measured accurately while an important part of its action remains hidden. The amount outside a cell, the amount entering it and the cell’s response to that amount are different quantities.",
      claim: "Chemical exposure, transport into the cell and receiving state can jointly shape an outcome; a single exposure measure may leave a co-condition unrecorded.",
      internalDose: "In a cadmium experiment, calcium-channel agonists and antagonists changed cellular uptake and toxicity. This pharmacological result shows why the same external concentration need not mean the same internal dose. The experiment itself contained no field exposure. A separate mouse study directly combined a 50 Hz magnetic field with lead and measured antioxidant and membrane responses. These supply different parts of the proposed chain. [[ref:hinkle1987_cadmium_uptake|Hinkle 1987]]; [[ref:liu2002_elf_lead|Liu 2002]].",
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
        { title: "Heavy metals", text: "Internal dose and chemical conditions of a response.", href: "/evidence/heavy-metal-synergy" },
        { title: "Klimentidis", text: "Animal weight trends and the cause of an intermediate behaviour.", href: "/evidence/klimentidis-explained" },
        { title: "Ecology", text: "Environmental cues, sensory function and consequences between species.", href: "/evidence/ecology" },
        { title: "Amish comparisons", text: "From a community label to measured material pathways.", href: "/evidence/amish-control" },
      ],
    },
  },
  fi: {
    title: "Proxy masking: vaikutuksen peittyminen",
    subtitle: "Miksi toimiva selitys voi kuvata vaikutusketjun keskivaihetta — ja miten BERM yhdistää ketjun fysikaalisiin olosuhteisiin ja biologiseen vastaanottavuuteen.",
    back: "Mallin yleiskatsaus",
    kicker: "BERM · Selityksen rakenne",
    intro: "Eläimen paino nousee. Se syö enemmän, joten lisääntynyt syöminen selittää painon nousua. Mutta miksi ruokahalu muuttui? Syöminen voi olla sekä painon nousun todellinen syy että pidemmän biologisen prosessin välivaihe. Selitys voi olla oikea, vaikka ketjun alku jäisi avoimeksi.",
    definition: "Proxy tarkoittaa välillistä mittaria: havaittavaa asiaa, jonka avulla kuvataan vaikeammin mitattavaa ilmiötä. Peittymisellä tarkoitetaan tässä sitä, että aikaisempaa vaikutusta on vaikea tunnistaa korreloivan mittarin, biologisen välivaiheen tai tuloksen kirjaamistavan takaa.",
    proposal: "BERM ehdottaa, että sähkömagneettisen ympäristön muutokset voivat liittyä tällaisiin ketjuihin biologisten vastaanottajien tilan kautta. Valo, kemiallinen altistus, hormonitila ja aikaisemmat kokemukset voivat muuttaa vastetta. Näkyvä seuraus saatetaan silloin kuvata ruokavaliona, käyttäytymisenä, elämäntapana tai yhteisöjen välisenä erona.",
    proposalLabel: "Mallin keskeinen kysymys",
    centralQuestion: "Tunnistaako havaittu selitys prosessin alun vai yhden sen myöhemmistä vaiheista?",
    reading: "Tällä sivulla",
    readingHint: "Lukupolku etenee tutusta esimerkistä biologisiin mekanismeihin, vertailuaineistoihin ja mallin synteesiin.",
    sections: [
      "Selitys pidemmän ketjun sisällä",
      "Sama vihje, erilainen vastaanottaja",
      "Kun altisteet vaikuttavat yhdessä",
      "Kun kompensaatio säilyttää toiminnan",
      "Mitä muut lajit paljastavat?",
      "Mitä ryhmänimi sisältää?",
      "Biologisesta tilasta koettuun syyhyn",
      "Miten BERM yhdistää näytön?",
    ],
    contextLabel: "Miksi tämä on olennaista?",
    sourceLabel: "Alkuperäistutkimukset",
    modelLabel: "BERM:n tulkinta",
    measuredLabel: "Mitattu osatekijä",
    detailLabel: "Tutustu taustalla olevaan näyttöön",
    first: {
      lead: "Ennen yhteyden tulkitsemista on hyvä kysyä, mikä tehtävä kullakin muuttujalla on. Sama sana, kuten elämäntapa, voi tarkoittaa ympäristöstä tulevaa syötettä, käyttäytymisen seurausta tai laajaa luokkaa, joka kokoaa useita prosesseja yhteen.",
      roles: [
        { title: "Korreloiva mittari", text: "Teknologian käyttö, kaupungistuminen tai tulot voivat seurata ympäristön muuttumista. Vahva yhteys ei yksin kerro, mikä osa ympäristöstä tuottaa vasteen." },
        { title: "Vaikutuksen välivaihe", text: "Unen, ruokahalun tai aktiivisuuden muutos voi välittää aikaisempaa vaikutusta. Jos välivaihe pidetään analyysissä vakiona, osa tarkasteltavasta vaikutusketjusta voi samalla poistua." },
        { title: "Vasteen ehto", text: "Valohistoria, kemiallinen altistus tai kudoksen tila voi määrätä, näkyykö toisen syötteen vaikutus. Erilaisten tilanteiden keskiarvo voi peittää toisistaan poikkeavia vasteita." },
      ],
      context: "Teollistumisen aikana materiaalisen ympäristön monet osat ovat muuttuneet yhdessä. Historialliset kehityskulut on siksi avattava paikallisiksi altistuksiksi, vastaanottajatiloiksi ja mitatuiksi seurauksiksi. Kansallinen teknologiaindikaattori kuvaa ympäristöä välillisesti; se ei ole organismin paikallinen kenttäannos.",
      graphLead: "Alla voit avata selitystä taaksepäin. Laajennettu ketju kuvaa BERM:n ehdottamaa kausaalirakennetta. Sen biologisia siirtymiä käsitellään seuraavissa osissa.",
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
      fieldBridge: "Sensorista haaraa täydentävässä ELF-kokeessa rotan hajukäämin estrogeenireseptorin ilmentymä muuttui eri tavoin lisääntymiskierron eri vaiheissa. Erillinen solukoe mittasi MT1-reseptoriin liittyvän hormonisignaloinnin muutosta. BERM käyttää näitä ehdokkaina kentän ja vastaanottavuuden väliseen liitokseen; kumpikaan ei suoraan mitannut EMF:n aiheuttamaa oksitosiinivälitteisen hoivan heikkenemistä. [[ref:reyesguerrero2010_olfactory_estrogen|Reyes-Guerrero 2010]]; [[ref:girgert2010_mt1_signaling|Girgert 2010]].",
    },
    mixtures: {
      lead: "Altistus voidaan mitata tarkasti, vaikka osa sen vaikutustavasta jäisi piiloon. Solun ulkopuolinen määrä, soluun pääsevä määrä ja solun vaste tähän määrään ovat eri suureita.",
      claim: "Kemiallinen altistus, soluun kulkeutuminen ja vastaanottajan tila voivat yhdessä muovata lopputulosta. Yksi altistusmittari voi jättää yhteisehdon kirjaamatta.",
      internalDose: "Kadmiumkokeessa kalsiumkanavien aktivoijat ja salpaajat muuttivat soluunottoa ja toksisuutta. Farmakologinen tulos osoittaa, miksi sama ulkoinen pitoisuus ei takaa samaa sisäistä annosta. Koe oli kentätön. Erillisessä hiiritutkimuksessa yhdistettiin suoraan 50 Hz:n magneettikenttä ja lyijy sekä mitattiin antioksidantti- ja kalvovasteita. Tutkimukset tuovat eri osat ehdotettuun ketjuun. [[ref:hinkle1987_cadmium_uptake|Hinkle 1987]]; [[ref:liu2002_elf_lead|Liu 2002]].",
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
        { title: "Raskasmetallit", text: "Sisäinen annos ja vasteen kemialliset ehdot.", href: "/evidence/heavy-metal-synergy" },
        { title: "Klimentidis", text: "Eläinten painokehitys ja käyttäytymisen aikaisempi syy.", href: "/evidence/klimentidis-explained" },
        { title: "Ekologia", text: "Ympäristön vihjeet, aistitoiminnot ja lajien väliset seuraukset.", href: "/evidence/ecology" },
        { title: "Amish-vertailut", text: "Yhteisönimestä mitattuihin materiaalisiin reitteihin.", href: "/evidence/amish-control" },
      ],
    },
  },
  ja: {},
  fr: {},
  ko: {},
} as const;

const SECTION_IDS = ["causal-chain", "receiver-state", "joint-exposures", "compensation", "sentinel-species", "community-proxies", "experienced-reasons", "berm-synthesis"] as const;

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
              {paragraph(d.first.lead)}
              <dl className="divide-y divide-card-border border-y border-card-border">{d.first.roles.map((role, index) => <div key={role.title} className="grid gap-2 py-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-5"><dt className="text-sm font-semibold"><span className="mr-2 text-accent" aria-hidden="true">{index + 1}.</span>{role.title}</dt><dd className="text-sm leading-relaxed text-foreground-muted">{role.text}</dd></div>)}</dl>
              {paragraph(d.first.graphLead)}
              <MaskingChainDiagram locale={locale} />
              {context(d.first.context)}
            </>)}

            {section(1, <>
              {paragraph(d.receiver.lead)}
              <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.proxy.sensory-receiver-state">{d.receiver.claim}</ClaimRef></p>
              <ReceiverStateExplorer locale={locale} />
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

            {section(2, <>
              {paragraph(d.mixtures.lead)}
              <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.proxy.chemical-field-conditions">{d.mixtures.claim}</ClaimRef></p>
              {paragraph(d.mixtures.internalDose)}
              <InteractionExplorer locale={locale} />
              {context(d.mixtures.context)}
              <div className="space-y-3"><h3 className="text-lg font-semibold">{d.mixtures.flowerTitle}</h3>{paragraph(d.mixtures.flower)}</div>
              {link("/evidence/heavy-metal-synergy", d.mixtures.link)}
            </>)}

            {section(3, <>
              {paragraph(d.compensation.lead)}
              <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.proxy.compensated-endpoint">{d.compensation.claim}</ClaimRef></p>
              {paragraph(d.compensation.study)}
              <ol className="grid gap-3 sm:grid-cols-3">{d.compensation.steps.map((step, index) => <li key={step.title} className="relative border-t-2 border-accent/40 bg-figure-bg px-4 py-5"><p className="mb-2 font-mono text-xs text-accent" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p><h3 className="mb-2 text-sm font-semibold">{step.title}</h3><p className="text-sm leading-relaxed text-foreground-muted">{step.text}</p></li>)}</ol>
              {context(d.compensation.context)}
            </>)}

            {section(4, <>
              {paragraph(d.species.lead)}
              <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.proxy.comparative-mediator-question">{d.species.claim}</ClaimRef></p>
              {paragraph(d.species.klimentidis)}
              {link("/evidence/klimentidis-explained", d.species.klimentidisLink)}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{d.species.tableTitle}</h3>
                <div className="hidden grid-cols-[1fr_1.4fr_1.6fr] gap-4 border-b border-card-border pb-3 text-xs font-semibold text-foreground-muted sm:grid" aria-hidden="true">{d.species.tableHeaders.map((heading) => <span key={heading}>{heading}</span>)}</div>
                <ul className="divide-y divide-card-border">{d.species.rows.map((row) => <li key={row.name} className="grid gap-3 py-5 sm:grid-cols-[1fr_1.4fr_1.6fr] sm:gap-4"><div><h4 className="text-sm font-semibold">{row.name}</h4><div className="mt-2 text-xs"><InlineReferenceText text={row.source} locale={locale} /></div></div><p className="text-sm leading-relaxed text-foreground-muted"><span className="mr-1 font-medium text-foreground sm:sr-only">{d.species.tableHeaders[1]} </span>{row.measured}</p><p className="text-sm leading-relaxed text-foreground-muted"><span className="mr-1 font-medium text-foreground sm:sr-only">{d.species.tableHeaders[2]} </span>{row.role}</p></li>)}</ul>
              </div>
              {context(d.species.context)}
              {link("/evidence/ecology", d.species.link)}
            </>)}

            {section(5, <>
              {paragraph(d.community.lead)}
              <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.proxy.environmental-group-interpretation">{d.community.claim}</ClaimRef></p>
              {paragraph(d.community.chartLead)}
              <ActivityProxyChart locale={locale} />
              <div className="space-y-3"><h3 className="text-lg font-semibold">{d.community.dustTitle}</h3>{paragraph(d.community.dust)}</div>
              {context(d.community.context)}
              {link("/evidence/amish-control", d.community.link)}
            </>)}

            {section(6, <>
              {paragraph(d.reasons.lead)}
              <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.behavior.reported-reasons">{d.reasons.claim}</ClaimRef></p>
              {paragraph(d.reasons.text)}
              {paragraph(d.reasons.distinction)}
              {context(d.reasons.context)}
              <div className="flex flex-wrap gap-x-6 gap-y-4">{link("/behavior", d.reasons.link)}{link("/civilization/epistapege", d.reasons.epistapegeLink)}</div>
            </>)}

            {section(7, <>
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
              <a href="#causal-chain" className="inline-flex items-center gap-2 text-sm text-accent hover:underline"><ArrowDown className="size-4 rotate-180" aria-hidden="true" />{d.sections[0]}</a>
            </>)}
          </div>
        </div>
      </div>
    </article>
  );
}
