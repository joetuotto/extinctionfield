// @reference-token-renderer components/atlas/AtlasDetail.tsx
/** Shared atlas inventory. Canonical model topology is imported, never copied by hand. */
import graph from "@/data/causal-graph.json";
import extensions from "@/data/causal-atlas-extensions.json";
import { NODES as originalNodes, EDGES as originalEdges, type CausalMapNode as OriginalNode, type BilingualText } from "./causalMapData";
import { CHAIN_EPISTEMIC_COLORS, CHAIN_EPISTEMIC_LABELS_EN, CHAIN_EPISTEMIC_LABELS_FI } from "./epistemicConstants";
import type { EpistemicLevel } from "./types";
import { MECHANISM_CARDS } from "./modulome/stateModel";
import { MODULOME_LAYERS } from "./modulome/layers";
import { MODULOME_TARGETS } from "./modulome/organDetailData";
import { atlasClaims, claimIdsForAtlasNode, claimIdsForAtlasEdge } from "./atlasEvidence";
import { INTERVENTION_NODES, INTERVENTION_EDGES, type InterventionEffect } from "./interventionAtlas";

export type { BilingualText, Locale, NodeDetail, LocalizedDetail } from "./causalMapData";
export type { EpistemicLevel } from "./types";
export type RelationType = "causal" | "modulates" | "differential" | "inference" | "bridge" | "derived" | "feedback" | "association";
export type CausalMapNode = Omit<OriginalNode, "epistemicLevel"> & {
  epistemicLevel: EpistemicLevel;
  sourcePaths: string[];
  modelIds?: string[];
  subatlases?: string[];
  searchAliases?: string[];
  provenance?: BilingualText;
  claimIds?: string[];
};
export interface CausalMapEdge { from: string; to: string; relation: RelationType; label?: string; sourcePaths: string[]; claimIds?: string[]; interventionEffects?: InterventionEffect[] }
export const EVIDENCE_COLORS = CHAIN_EPISTEMIC_COLORS;
export const EVIDENCE_LABELS = { en: CHAIN_EPISTEMIC_LABELS_EN, fi: CHAIN_EPISTEMIC_LABELS_FI };
export const RELATION_LABELS: Record<RelationType, BilingualText> = {
  causal: { en: "Conditional model link", fi: "Ehdollinen malliyhteys" },
  modulates: { en: "Modifies the response", fi: "Muuntaa vastetta" },
  differential: { en: "Relative ecological effect", fi: "Suhteellinen ekologinen vaikutus" },
  inference: { en: "Measurement / inference input", fi: "Mittaus / päättelyn syöte" },
  bridge: { en: "Conditional L2 response · calibration open", fi: "Ehdollinen L2-vaste · kalibrointi avoin" },
  derived: { en: "Derivation under stated premises", fi: "Johto ilmoitetuilla premisseillä" },
  feedback: { en: "Feedback over time", fi: "Takaisinkytkentä ajan yli" },
  association: { en: "Observation / association", fi: "Havainto / assosiaatio" },
};

export const MODEL_NODE_MAP = {
  TECHNOLOGY_TIMING_PROXY: "legacy_proxy", FIELDSTATE_VECTOR: "fieldstate_vector", FIELDSTATE_ENVELOPE: "fieldstate_envelope",
  STATIC_TRIBO_INTERFACE: "fieldstate_static", FIELDSTATE_LOW_FREQUENCY_ELECTRIC: "fieldstate_electric", BERM_L2_BRIDGE: "berm_l2_bridge",
  A_VGCC_ROS: "mech_vgcc_ros", B_RPM_CRY: "mech_cry_melatonin", MELATONIN_REDOX: "tissue_melatonin", VMEM_MTOR: "vmem_mtor",
  BIOELECTRIC_DEVELOPMENT: "developmental_memory", HPA_HPG: "hpa_hpg", RECEPTOR_STATE_MEMORY: "receptor_memory",
  CIRCADIAN_COORDINATION: "circadian_coordination", HORMONE_TARGET_RESPONSE: "hormone_target", MICROBIOME_OT: "microbiome_oxytocin",
  BARRIER_BBB: "tissue_bbb", BARRIER_BTB: "tissue_btb", BARRIER_PLACENTA: "barrier_placenta", BARRIER_RETINA: "barrier_retina",
  MALE_SPERM: "tissue_sperm", MALE_GERMLINE_RESERVE: "male_reserve", MALE_STEROIDOGENESIS: "male_steroidogenesis",
  OVARIAN_RESERVE: "ovarian_reserve", OOCYTE_REDOX: "oocyte_redox", OVULATION_CLOCK: "ovulation_clock", IMPLANTATION: "implantation",
  COUPLE_FECUNDABILITY: "demo_biocap", IF_MITOTIC_DISRUPTION: "mech_mitotic_spindle", GPCR_ADENOSINE: "mech_gpcr",
  VAGUS_ANTIINFLAMMATORY: "mech_vagal_antiinflam", ECOLOGICAL_ENCOUNTER: "eco_encounter", ECOLOGICAL_SELECTION: "eco_selection",
  ECOLOGICAL_TRAIT_STATE: "eco_traits", DEMAND_OPPORTUNITY: "demand_opportunity", TEMPO: "tempo", ART_LIVE_BIRTH_DELIVERY: "art_delivery",
  ASFR: "demo_asfr", TFR: "demo_tfr",
  LINDGREN_METRIC_DRIVE: "lindgren_metric_drive", ANDROGEN_BINDING_AVAILABILITY: "androgen_binding_availability",
  ANDROGEN_RECEPTOR_SIGNAL: "androgen_receptor_signal", INDIVIDUAL_BEHAVIORAL_RESPONSE: "individual_behavioral_response",
  REPRODUCTIVE_OPPORTUNITY: "reproductive_opportunity", CAREGIVING_ALLOCATION: "caregiving_allocation",
  BIOBEHAVIORAL_WEIGHTING: "biobehavioral_weighting", NARRATIVE_ATTRIBUTION: "narrative_attribution",
  EPISTAPEGE_OBSERVABILITY_LOSS: "epistapege_observability_loss", INSTITUTIONAL_MODEL_REUSE: "institutional_model_reuse",
} satisfies Record<keyof typeof graph.nodes, string>;

const canonicalDescriptions: Record<string, [number, string, string, string]> = {
  lindgren_metric_drive: [-2, "Under g = η + κA⊗A, δg = κ(Ā⊗a + a⊗Ā + a⊗a) preserves cross terms and quadratic waveform mixing. The normalized rank-one coordinate is geometric; a biological response additionally requires BERM's conditional matter-coupling and response premises, with gauge, physical scale and tissue calibration stated separately.", "Ehdolla g = η + κA⊗A häiriö δg = κ(Ā⊗a + a⊗Ā + a⊗a) säilyttää ristitermejä ja aaltomuodon neliöllisen sekoituksen. Normalisoitu rank-one-koordinaatti on geometrinen; biologinen vaste edellyttää lisäksi BERM:n ehdollisia materia- ja vastepremissejä sekä erikseen ilmoitettua gaugea, fysikaalista mittakaavaa ja kudoskalibrointia.", "/model/tensor-derivation"],
  androgen_binding_availability: [3, "SHBG and albumin binding separate total hormone concentration from free and intratesticular androgen availability. Matched concentrations and binding constants constrain availability; they do not by themselves determine receptor or post-receptor function.", "SHBG- ja albumiinisitoutuminen erottavat kokonaispitoisuuden vapaan ja intratestikulaarisen androgeenin saatavuudesta. Yhteensovitetut pitoisuudet ja sitoutumisvakiot rajaavat saatavuutta; ne eivät yksin määritä reseptorin tai sen jälkeisen järjestelmän toimintaa.", "/evidence/testosterone"],
  androgen_receptor_signal: [3, "Available androgen, AR/ZIP9 occupancy and post-receptor state jointly constrain effective androgen-use capacity. Tissue-specific transfer, lag and functional outcomes require calibration; equal serum testosterone does not imply equal response.", "Saatavilla oleva androgeeni, AR-/ZIP9-miehitys ja reseptorin jälkeinen tila rajaavat yhdessä tehollista androgeeninkäyttökapasiteettia. Kudoskohtainen siirto, viive ja toimintatulokset tarvitsevat kalibroinnin; sama seerumin testosteroni ei merkitse samaa vastetta.", "/evidence/testosterone"],
  individual_behavioral_response: [7, "Endocrine, circadian and neural state combine with social context and learning history in a conditional distribution of desire, approach, contact and effort. A selective change in one output can coexist with preserved or increased activity in another. Realised encounters connect this branch to reproduction; reported reasons and institutional reuse remain a separate explanatory branch.", "Hormonaalinen, vuorokausirytminen ja hermostollinen tila yhdistyvät sosiaaliseen tilanteeseen ja oppimishistoriaan halun, lähestymisen, kontaktin ja vaivannäön ehdollisessa jakaumassa. Yhden ulostulon valikoiva muutos voi esiintyä toisen säilymisen tai voimistumisen rinnalla. Toteutuneet kohtaamiset liittävät haaran lisääntymiseen; kerrotut syyt ja institutionaalinen uudelleenkäyttö säilyvät erillisenä selityshaarana.", "/behavior/reproductive-regulation#three-branches"],
  reproductive_opportunity: [5, "External resources, partner availability, contraception and the other person's response constrain whether an approach becomes a reproductive encounter. Social outputs alter later opportunities through time-indexed feedback. These conditions are measured separately from motivation and physiological capacity.", "Ulkoiset resurssit, kumppanien saatavuus, ehkäisy ja toisen henkilön vaste rajaavat lähestymisen muuttumista lisääntymiselle altistavaksi kohtaamiseksi. Sosiaaliset ulostulot muuttavat myöhempiä mahdollisuuksia ajallisen palautteen kautta. Ehdot mitataan erillään motivaatiosta ja fysiologisesta kapasiteetista.", "/behavior/reproductive-regulation#three-branches"],
  caregiving_allocation: [7, "The amount and target of care are separate observables. Prolactin–kisspeptin and prolactin-sensitive parental-circuit experiments identify distinct reproductive and caregiving outputs. The synthesis connects contact with later social inputs while retaining life stage, receiving circuit and lag; it does not infer impaired fertility from a chosen care target.", "Hoivan määrä ja kohde ovat erillisiä havaintosuureita. Prolaktiini–kisspeptiini- ja prolaktiinille herkkien hoivapiirien kokeet paikantavat lisääntymisen ja hoivan erillisiä ulostuloja. Synteesi yhdistää kontaktin myöhempiin sosiaalisiin syötteisiin säilyttäen elämänvaiheen, vastaanottavan piirin ja viiveen; se ei päättele heikentynyttä hedelmällisyyttä valitusta hoivan kohteesta.", "/behavior/reproductive-regulation#caregiving"],
  biobehavioral_weighting: [7, "A population mixture aggregates state-conditioned individual response probabilities over measured state and context distributions. Its weights require data; an aggregate association cannot identify a unique individual mechanism.", "Populaatioseos yhdistää tilariippuvaiset yksilövasteiden todennäköisyydet mitattujen tila- ja tilannejakaumien yli. Painot edellyttävät aineistoa; aggregaattitason assosiaatio ei yksilöi yhtä yksilömekanismia.", "/civilization"],
  narrative_attribution: [7, "A reported reason is an observable interpretation of a partly latent behavioural state. It may carry causal information, but its place in the explanation must be tested against timing, intervention and alternative causes.", "Raportoitu syy on havaittava tulkinta osittain latentista käyttäytymistilasta. Se voi sisältää syytietoa, mutta sen asema selityksessä on testattava ajoitusta, interventioita ja vaihtoehtoisia syitä vasten.", "/civilization/epistapege"],
  epistapege_observability_loss: [7, "The Epistapege hypothesis concerns loss of an upstream biological state from an explanatory data model when downstream reports stand in for unmeasured causes. It predicts an observability problem requiring independent state measurements; disagreement is not itself evidence of the mechanism.", "Epistapege-hypoteesi koskee biologisen ylävirtatilan katoamista selittävästä datamallista, kun alavirran raportit korvaavat mittaamattomat syyt. Se ennustaa havaittavuusongelman, jonka tutkiminen edellyttää riippumattomia tilamittauksia; erimielisyys ei yksin ole mekanismin näyttöä.", "/civilization/epistapege"],
  institutional_model_reuse: [7, "Institutions can reuse explanatory models that treat downstream reports as initiating variables. The proposed persistence and feedback must be studied with external records of model adoption, measurements and outcomes.", "Instituutiot voivat käyttää uudelleen selitysmalleja, joissa alavirran raportteja pidetään alkavina muuttujina. Ehdotettua pysyvyyttä ja palautetta tutkitaan ulkoisilla mallien omaksumisen, mittausten ja tulosten aineistoilla.", "/civilization/epistapege"],
  legacy_proxy: [8, "Legacy national technology timing is a comparison input, not a measured local physical dose or a calibrated forecast.", "Kansallinen teknologian ajoitusproxy on historiallinen vertailusyöte, ei mitattu paikallinen fysikaalinen annos eikä kalibroitu ennuste.", "/about/history"],
  fieldstate_vector: [8, "FieldState records vector, orientation, phase and organ-transfer estimates with measurement uncertainty. These observations constrain a physical-state estimate; they do not cause the biological response.", "FieldState kirjaa vektorin, suunnan, vaiheen ja elinsiirron arviot mittausepävarmuuksineen. Havainnot rajaavat fysikaalisen tilan arviota; ne eivät aiheuta biologista vastetta.", "/measurement/fieldstate"],
  fieldstate_envelope: [8, "Measured spectral power, modulation envelopes, beats and timing can constrain a receiver-window overlap. An independently specified transfer operator and calibration are required.", "Mitattu spektriteho, modulaatioverhokäyrät, lyönnit ja ajoitus rajaavat vastaanottoikkunan päällekkäisyyttä. Tarvitaan erikseen määritelty siirto-operaattori ja kalibrointi.", "/measurement/fieldstate/math"],
  fieldstate_static: [8, "Measure charge, voltage, local electric field, gradients, material, humidity and grounding at the organism interface. Textile composition alone is not a dose.", "Mitataan varaus, jännite, paikallinen sähkökenttä, gradientit, materiaali, kosteus ja maadoitus eliön rajapinnassa. Tekstiilin koostumus ei yksin ole annos.", "/ecology"],
  fieldstate_electric: [8, "Record the electric-field waveform, AC/DC polarity, orientation, duration and local geometry independently of magnetic-field measurements.", "Kirjataan sähkökentän aaltomuoto, AC/DC-polariteetti, suunta, kesto ja paikallinen geometria erillään magneettikentän mittauksista.", "/measurement/fieldstate"],
  berm_l2_bridge: [-2, "[CONDITIONAL · L2] Under minimal matter–metric coupling and response theory, BERM specifies δ⟨O_i⟩ = ∫Ξ_i^{μν}δg_{μν} plus higher-order response. Its gauge, physical scale, observer, tissue kernel and endpoint calibration remain open. Downstream component evidence cannot determine these by itself.", "[EHDOLLINEN · L2] Minimaalisen materia–metriikkakytkennän ja vasteteorian ehdolla BERM määrittelee muodon δ⟨O_i⟩ = ∫Ξ_i^{μν}δg_{μν} sekä korkeamman kertaluvun vasteen. Gauge, fysikaalinen mittakaava, havaitsija, kudosydin ja päätepistekalibrointi ovat avoimia. Alavirran komponenttinäyttö ei yksin määritä niitä.", "/model"],
  vmem_mtor: [2, "Imported membrane-potential, calcium, AMPK and mTOR biology forms a conditional gate for reserve activation, growth and repair. The conditional L2 response requires an independently identified membrane kernel and calibration.", "Tuotu kalvopotentiaali-, kalsium-, AMPK- ja mTOR-biologia muodostaa ehdollisen portin reservin aktivaatiolle, kasvulle ja korjaukselle. Ehdollinen L2-vaste edellyttää erikseen tunnistettua kalvoydintä ja kalibrointia.", "/evidence/reproductive-arc"],
  developmental_memory: [3, "Developmental bioelectric and epigenetic states can retain earlier perturbations in organ reserves across life stages. Persistence and reversibility require separate measurements.", "Kehitykselliset biosähköiset ja epigeneettiset tilat voivat säilyttää aiempien häiriöiden vaikutuksia elinreserveissä elämänvaiheiden yli. Pysyvyys ja palautuvuus on mitattava erikseen.", "/evidence/epigenetic-legacy"],
  hpa_hpg: [3, "Circadian, stress-axis, microbiome and barrier states enter an explicit HPA–HPG gate controlling steroidogenic and reproductive timing support.", "Vuorokausirytmi, stressiakseli, mikrobiomi ja kudosesteet yhdistyvät HPA–HPG-portissa, joka säätelee steroidogeneesiä ja lisääntymisen ajoituksen tukea.", "/evidence/reproductive-arc"],
  receptor_memory: [2, "Receiver chemical state integrates pulses with a recovery time. Equal average input can leave different state histories when pulse spacing and recovery differ; example coefficients are structural only.", "Vastaanottimen kemiallinen tila yhdistää pulsseja palautumisaikansa mukaisesti. Sama keskimääräinen syöte voi jättää eri tilahistorian pulssivälin ja palautumisen muuttuessa; esimerkkikertoimet ovat rakenteellisia.", "/model/biological-coordination"],
  circadian_coordination: [2, "Tissue clocks interact through phase differences, not a universal scalar coherence score. Electrical timing, calcium and receiver memory enter tissue-specific phase relationships.", "Kudoskellot vuorovaikuttavat vaihe-erojen kautta, eivät yleisen skalaarisen koherenssipisteen avulla. Sähköinen ajoitus, kalsium ja vastaanotinmuisti vaikuttavat kudoskohtaisiin vaihesuhteisiin.", "/model/biological-coordination"],
  hormone_target: [3, "Effective hormone response is the time-integrated product of hormone signal and target readiness. Phase mismatch can change that integral while mean hormone concentration remains equal.", "Hormonin tehollinen vaste on hormonisignaalin ja kohdekudoksen valmiuden ajallinen tulo. Vaihe-ero voi muuttaa integraalia keskimääräisen hormonipitoisuuden pysyessä samana.", "/model/biological-coordination"],
  microbiome_oxytocin: [3, "Microbial, vagal and oxytocin intermediates provide a conditional gut–brain–HPG route. Component findings do not establish environmental EMF as its initiating cause.", "Mikrobi-, vagus- ja oksitosiinivälivaiheet muodostavat ehdollisen suolisto–aivo–HPG-reitin. Komponenttilöydökset eivät osoita ympäristö-EMF:ää sen alkusyyksi.", "/evidence/gut-brain-axis"],
  barrier_placenta: [3, "Placental barrier and inflammatory/redox state enter implantation and pregnancy support. Conception and live birth are distinct endpoints.", "Istukkaesteen sekä tulehdus- ja redox-tilan kautta kulkee reitti kiinnittymiseen ja raskauden tukeen. Hedelmöittyminen ja elävänä syntyminen ovat eri päätepisteitä.", "/evidence/reproductive-arc"],
  barrier_retina: [3, "The blood-retinal barrier is a parallel organ endpoint of calcium, redox and tight-junction regulation, without an assumed direct contribution to TFR.", "Veri-verkkokalvoeste on kalsiumin, redoxin ja tiivisliitossäätelyn rinnakkainen elinpäätepiste ilman oletettua suoraa TFR-vaikutusta.", "/modulome/eye"],
  male_reserve: [3, "Sertoli and germline reserve represents persistent capacity separately from reversible sperm function. Barrier and developmental states contribute through separately calibrated gates.", "Sertoli- ja itulinjareservi kuvaa pysyvää kapasiteettia erillään siittiöiden palautuvasta toimintatilasta. Este- ja kehitystilat vaikuttavat erikseen kalibroitavien porttien kautta.", "/evidence/reproductive-arc"],
  male_steroidogenesis: [3, "Leydig-cell steroidogenic support combines HPG, local calcium/redox, clock, cholesterol-supply, microbiome and target-readiness states before sperm output. Measured glutathione reserve and current hormone production are distinct; their directions retain stimulus, challenge and research-family context.", "Leydigin solujen steroidogeeninen tuki yhdistää HPG:n, paikallisen kalsium/redox-tilan, kellon, kolesterolihuollon, mikrobiomin ja kohdekudoksen valmiuden ennen siittiötuotantoa. Mitattu glutationivaranto ja nykyinen hormonituotanto ovat eri suureita; vaikutussuunnat säilyttävät stimulaation, haasteen ja tutkimusperheen tiedot.", "/modulome/testes"],
  ovarian_reserve: [3, "Primordial follicle reserve and activation are persistent stock variables, separate from current ovulation. AMH/AFC observations constrain this state without proving an upstream cause.", "Primordiaalifollikkelien reservi ja aktivaatio ovat pysyviä varastomuuttujia erillään tämänhetkisestä ovulaatiosta. AMH/AFC-havainnot rajaavat tilaa osoittamatta sen alkusyytä.", "/evidence/reproductive-arc"],
  oocyte_redox: [3, "Oocyte mitochondrial and redox quality depends on reserve and physiological state; calcium and ROS have functional windows, not a universal more-is-worse rule.", "Munasolun mitokondriaalinen ja redox-laatu riippuu reservistä ja fysiologisesta tilasta; kalsiumilla ja ROS:lla on toiminnalliset ikkunat, ei yleistä enemmän-on-huonompi-sääntöä.", "/evidence/reproductive-arc"],
  ovulation_clock: [3, "Ovarian reserve, oocyte quality, HPG and tissue-phase alignment jointly constrain the ovulation and steroidogenic timing gate.", "Munasarjareservi, munasolun laatu, HPG ja kudosvaiheiden yhteensopivuus rajaavat yhdessä ovulaation ja steroidogeneesin ajoitusporttia.", "/model/biological-coordination"],
  implantation: [3, "Luteal function, embryo–endometrium timing, placental support and conception-to-live-birth survival are separate conditional reproductive gates.", "Luteaalitoiminta, alkion ja kohdun limakalvon ajoitus, istukan tuki sekä hedelmöittymisestä elävänä syntymiseen selviytyminen ovat erillisiä ehdollisia lisääntymisportteja.", "/evidence/reproductive-arc"],
  demand_opportunity: [5, "Realised reproductive encounters combine state-conditioned behaviour with opportunity and the other person's response. Planned attempts and encounters without a pregnancy intention both remain possible. Success is conditioned on the actual encounter and physiological capacity; desire, action, conception and live birth are distinct measurements.", "Toteutuvat lisääntymiselle altistavat kohtaamiset yhdistävät tilariippuvaisen käyttäytymisen mahdollisuuksiin ja toisen vasteeseen. Sekä suunnitellut yritykset että kohtaamiset ilman raskausaikomusta säilyvät mahdollisina. Onnistuminen ehdollistetaan toteutuneelle kohtaamiselle ja fysiologiselle kapasiteetille; halu, toiminta, hedelmöittyminen ja elävänä syntyminen ovat eri mittauksia.", "/behavior/reproductive-regulation#three-branches"],
  tempo: [5, "The timing of attempts and births changes period ASFR/TFR separately from lifetime capacity. Cohort history and age distributions are required.", "Yritysten ja syntymien ajoitus muuttaa periodin ASFR/TFR:ää erillään elinikäisestä kapasiteetista. Tarvitaan kohorttihistoria ja ikäjakaumat.", "/model/biological-coordination"],
  art_delivery: [5, "ART access, uptake, procedure-specific success and live-birth delivery enter separately from spontaneous conception; do not add overlapping births twice.", "Hedelmöityshoitojen saatavuus, käyttö, toimenpidekohtainen onnistuminen ja elävänä syntyminen käsitellään erillään spontaanista hedelmöittymisestä; päällekkäisiä syntymiä ei lasketa kahdesti.", "/model"],
  eco_encounter: [6, "Species-specific sensing, navigation, attachment, host encounter, physiology and dispersal mediate the physical-state response. Record local field, habitat and species traits.", "Lajikohtainen aistiminen, navigaatio, kiinnittyminen, isännän kohtaaminen, fysiologia ja leviäminen välittävät fysikaalisen tilan vastetta. Kirjataan paikallinen kenttä, elinympäristö ja lajin ominaisuudet.", "/ecology"],
  eco_selection: [6, "Differences in survival, reproduction, encounter and dispersal alter relative abundance. Ecological sorting is distinct from demonstrated heritable evolutionary change.", "Erot selviytymisessä, lisääntymisessä, kohtaamisissa ja leviämisessä muuttavat suhteellista runsautta. Ekologinen lajittuminen on eri asia kuin osoitettu periytyvä evoluutiomuutos.", "/ecology"],
  eco_traits: [6, "Heritable trait distributions change across generations only under an explicit selection and inheritance operator. Genetic or common-garden evidence is needed to distinguish inheritance from plasticity.", "Periytyvät piirrejakaumat muuttuvat sukupolvissa eksplisiittisen valinta- ja periytymisoperaattorin kautta. Geneettistä tai yhteiskasvatusnäyttöä tarvitaan periytymisen erottamiseen plastisuudesta.", "/evidence/evolution"],
};

const canonicalExistingDescriptions: Record<string, BilingualText> = {
  mech_vgcc_ros: { en: "Imported Vmem/VGCC–Ca²⁺–mitochondrial/redox biology. Receptor state and baseline calcium matter; ROS has a functional window. RyR release and SERCA reuptake are coupled parts of an ER–cytosol–mitochondrial cycle, not independent exposure pathways. The L2 operator form is conditional; gauge, scale and observable-specific calibration remain open.", fi: "Tuotu Vmem/VGCC–Ca²⁺–mitokondrio/redox-biologia. Vastaanotintila ja lähtökalsium vaikuttavat; ROS:lla on toiminnallinen ikkuna. RyR-vapautuminen ja SERCA-takaisinotto ovat ER–sytosoli–mitokondriokierron kytkeytyneitä osia, eivät riippumattomia altistusreittejä. L2-operaattorimuoto on ehdollinen; gauge, mittakaava ja havaintokohtainen kalibrointi ovat avoimia." },
  mech_cry_melatonin: { en: "Imported radical-pair, cryptochrome, clock and redox mechanisms must be specified by cryptochrome subtype, species, flavin state and light history. Photochemical response does not by itself establish magnetic modulation. A universal coefficient for all eukaryotes is not assumed; the L2 operator is conditional, with gauge, scale and tissue calibration open.", fi: "Tuodut radikaalipari-, kryptokromi-, kello- ja redox-mekanismit määritellään kryptokromialatyypin, lajin, flaviinitilan ja valohistorian mukaan. Fotokemiallinen vaste ei yksin osoita magneettista modulaatiota. Kaikille eukaryooteille yhteistä kerrointa ei oleteta; L2-operaattori on ehdollinen; gauge, mittakaava ja kudoskalibrointi ovat avoimia." },
  tissue_melatonin: { en: "Melatonin/redox and circadian state is an intermediate shared by hormone timing, sperm function, oocyte quality, ovulation and implantation. Its direction and magnitude depend on baseline and protocol; the whole environmental pathway remains conditional.", fi: "Melatoniini/redox ja vuorokausitila on hormonien ajoituksen, siittiötoiminnan, munasolulaadun, ovulaation ja kiinnittymisen yhteinen välivaihe. Suunta ja suuruus riippuvat lähtötilasta ja protokollasta; koko ympäristöreitti pysyy ehdollisena." },
  demo_biocap: { en: "Couple fecundability combines male sperm capacity, female ovulatory capacity and conception/live-birth support through explicit conditional gates and partner distributions. It is distinct from demand, opportunity, birth timing and cultural productive capacity. Multiplication requires stated conditional dependence; shared bottlenecks are not counted twice.", fi: "Parin lisääntymiskyky yhdistää miehen siittiökapasiteetin, naisen ovulaatiokapasiteetin sekä hedelmöittymis- ja syntymätuen eksplisiittisten ehdollisten porttien ja parijakaumien avulla. Se on eri asia kuin kysyntä, mahdollisuudet, syntymien ajoitus ja kulttuurinen tuotantokapasiteetti. Kertominen edellyttää ilmoitettuja ehdollisia riippuvuuksia; yhteisiä pullonkauloja ei lasketa kahdesti." },
  demo_asfr: { en: "Age-specific fertility combines couple capacity with demand/opportunity, tempo and ART/live-birth delivery. The heterogeneous waiting-time operator is an alternative aggregation, not an extra multiplier. Observed age-specific rates anchor calibration; no field-calibrated forecast is implied.", fi: "Ikäkohtainen hedelmällisyys yhdistää parikapasiteetin kysyntään ja mahdollisuuksiin, tempoon sekä hoitojen ja elävänä syntymisen osuuteen. Heterogeeninen odotusaikaoperaattori on vaihtoehtoinen aggregointi, ei lisäkerroin. Havaitut ikäkohtaiset luvut ankkuroivat kalibroinnin; tästä ei seuraa kenttäkalibroitua ennustetta." },
  demo_tfr: { en: "For five-year age bands and ASFR expressed per 1,000 women: TFR = 5 × Σ ASFR / 1,000. This demographic aggregation does not identify an upstream cause. Period fertility, cohort completed fertility and population size are distinct quantities.", fi: "Viisivuotisikäryhmille ja ASFR-luvuille tuhatta naista kohti: TFR = 5 × Σ ASFR / 1 000. Tämä demografinen aggregointi ei yksilöi alkusyytä. Periodihedelmällisyys, kohortin lopullinen lapsiluku ja väestömäärä ovat eri suureita." },
};

const calibrationCopy: Record<string, BilingualText> = {
  proxy_only: { en: "Historical proxy comparison, not a measured local dose.", fi: "Historiallinen proxyvertailu, ei mitattu paikallinen annos." },
  requires_matched_measurement: { en: "Requires matched local measurements.", fi: "Edellyttää yhteensovitettuja paikallismittauksia." },
  requires_psd_measurement: { en: "Requires a measured power spectrum.", fi: "Edellyttää mitattua tehospektriä." },
  requires_endpoint_calibration: { en: "Requires calibration against the named biological endpoint.", fi: "Edellyttää kalibrointia nimettyä biologista päätepistettä vasten." },
  structural_only: { en: "The model specifies a structure; its response coefficients are not calibrated.", fi: "Malli määrittelee rakenteen; vastekertoimia ei ole kalibroitu." },
  requires_partner_distribution: { en: "Requires joint partner distributions and reproductive outcomes.", fi: "Edellyttää parien yhteisjakaumia ja lisääntymistuloksia." },
  requires_matched_ecological_measurement: { en: "Requires matched species-specific ecological measurements.", fi: "Edellyttää yhteensovitettuja lajikohtaisia ekologisia mittauksia." },
  requires_multigeneration_ecological_panel: { en: "Requires ecological follow-up across generations.", fi: "Edellyttää ekologista seurantaa sukupolvien yli." },
  requires_multigeneration_genetic_or_common_garden_panel: { en: "Requires genetic or common-garden evidence across generations.", fi: "Edellyttää geneettistä tai yhteiskasvatusnäyttöä sukupolvien yli." },
  requires_external_measurement: { en: "Requires independent measurements of the named social or institutional variable, separately from biological couple capacity.", fi: "Edellyttää nimetyn sosiaalisen tai institutionaalisen muuttujan erillisiä mittauksia biologisesta parikapasiteetista erillään." },
  observed_wpp_anchor: { en: "Observed demographic anchor; does not establish the upstream cause.", fi: "Havaittu demografinen ankkuri; ei osoita alkusyytä." },
};
const sourceRegistry = "berm/berm/biology/causal_registry.py";
const baseNodes: CausalMapNode[] = originalNodes.map(n => ({ ...n,
  level: n.id === "solar_geomag" ? 0 : n.level,
  epistemicLevel: n.epistemicLevel === "C" ? "L*" : n.epistemicLevel,
  sourcePaths: ["website/lib/causalMapData.ts"],
  provenance: { en: "Existing website synthesis; evidence applies to individual components, not the whole BERM route.", fi: "Sivuston olemassa oleva synteesi; näyttö koskee yksittäisiä komponentteja, ei koko BERM-reittiä." },
}));
for (const [modelId, atlasId] of Object.entries(MODEL_NODE_MAP)) {
  const source = graph.nodes[modelId as keyof typeof graph.nodes];
  const existing = baseNodes.find(n => n.id === atlasId);
  if (existing) {
    existing.modelIds = [modelId]; existing.sourcePaths.push(sourceRegistry);
    const updated = canonicalExistingDescriptions[atlasId];
    if (updated && existing.detail) {
      existing.label = source.label;
      existing.sublabel = undefined;
      existing.detail = { ...existing.detail, en: { mechanism: updated.en }, fi: { mechanism: updated.fi } };
    }
    continue;
  }
  const [level, en, fi, link] = canonicalDescriptions[atlasId];
  baseNodes.push({ id: atlasId, level, label: source.label, epistemicLevel: level === 8 ? "C" : "L*", modelIds: [modelId], sourcePaths: [sourceRegistry],
    detail: { en: { mechanism: en }, fi: { mechanism: fi }, link },
    provenance: calibrationCopy[source.calibration_status],
  });
}

// Study records and obsolete shortcuts must never become biological mediators.
const corrections: Record<string, Partial<CausalMapNode>> = {
  lindgren_metric_drive: { epistemicLevel: "L" },
  reproductive_opportunity: { epistemicLevel: "C" },
  mod_cyb5b: { epistemicLevel: "M" },
  mod_membrane_omega: { epistemicLevel: "M" },
  electrification_boundary: { epistemicLevel: "L*", detail: { en: { mechanism: "Historical electrification is a timing and source-development context. A universal biological threshold cannot be inferred from national infrastructure or a scalar proxy." }, fi: { mechanism: "Historiallinen sähköistyminen kuvaa ajoitusta ja lähteiden kehitystä. Kansallisesta infrastruktuurista tai skalaariproxysta ei voi päätellä yleistä biologista kynnystä." }, link: "/evidence/technology" } },
  ch_static: { epistemicLevel: "M|C", detail: { en: { mechanism: "Triboelectric material–organism interfaces can create local static fields and gradients. Biological interpretation requires measured charge, voltage, humidity and grounding; historical textile results do not establish a universal reproductive dose." }, fi: { mechanism: "Triboelektriset materiaali–eliörajapinnat voivat synnyttää paikallisia staattisia kenttiä ja gradientteja. Biologinen tulkinta edellyttää varauksen, jännitteen, kosteuden ja maadoituksen mittaamista; historialliset tekstiilitulokset eivät osoita yleistä lisääntymisannosta." }, link: "/ecology" } },
  eco_varroa: { label: { en: "Varroa: host–parasite response", fi: "Varroa: isäntä–loisvaste" }, sublabel: { en: "Species-specific differential", fi: "Lajikohtainen suhteellinen vaste" }, epistemicLevel: "L*", detail: { en: { mechanism: "Host–parasite outcomes combine direct mite response with bee grooming, host contact and colony state. Lack of a proposed CRY navigation pathway does not establish field resistance or zero effect in mites." }, fi: { mechanism: "Isäntä–loistulos yhdistää punkin suoran vasteen mehiläisen puhdistuskäyttäytymiseen, isäntäkontaktiin ja yhdyskuntatilaan. Ehdotetun CRY-navigaatioreitin puuttuminen ei osoita punkin kenttäresistenssiä eikä nollavaikutusta." }, link: "/ecology" } },
  mech_ifo_linear: { epistemicLevel: "L*", label: { en: "Ion forced-oscillation candidate", fi: "Ionin pakotetun värähtelyn ehdokas" }, detail: { en: { mechanism: "A declared ion-oscillation model proposes a linear response under specified forcing, damping, charge/mass and boundary assumptions. Its model-specific threshold is not a universal measured biological dose; the receiving operator and tissue transfer require calibration." }, fi: { mechanism: "Ilmoitettu ionivärähtelymalli ehdottaa lineaarista vastetta määritellyillä pakotus-, vaimennus-, varaus/massa- ja reunaehdoilla. Mallikohtainen kynnys ei ole yleinen mitattu biologinen annos; vastaanotto-operaattori ja kudossiirto tarvitsevat kalibroinnin." }, link: "/model/dual-kernel" } },
  mech_vgcc_genotype: { epistemicLevel: "M|C", detail: { en: { mechanism: "Genotype-by-exposure interactions must be tied to the measured endpoint and protocol, including the bounded EEG component findings. They motivate stratified tests, not a universal individual or population susceptibility coefficient." }, fi: { mechanism: "Genotyypin ja altistuksen yhteisvaikutukset sidotaan mitattuun päätepisteeseen ja protokollaan, mukaan lukien rajatut EEG-komponenttilöydökset. Ne motivoivat ositettuja testejä, eivät yleistä yksilö- tai populaatioherkkyyskerrointa." }, link: "/modulome" } },
  eco_traits: { label: { en: "Heritable traits across generations", fi: "Periytyvät piirteet sukupolvissa" } },
  northern_package: { epistemicLevel: "L*", detail: { en: { mechanism: "Iris pigmentation, optical transmission, lactase persistence and nutrition are distinct modifiers. Measure retinal light exposure rather than assuming a universal 100-fold multiplier. Co-selection and population-history interpretations require explicit inherited-trait and selection operators." }, fi: { mechanism: "Iiriksen pigmentaatio, optinen läpäisy, laktaasin säilyminen ja ravitsemus ovat erillisiä muuntimia. Mitataan verkkokalvon valoaltistus yleisen satakertaisen kertoimen olettamisen sijaan. Yhteisvalinnan ja populaatiohistorian tulkinnat edellyttävät eksplisiittisiä periytyvien piirteiden ja valinnan operaattoreita." }, link: "/evidence/evolution" } },
  epi_kaiser_series: { level: 8, epistemicLevel: "C", detail: { en: { mechanism: "An epidemiological series is an observation, not a biological intermediate. Personal magnetic-field records and outcome associations require frequency-resolved exposure and confounder control; they do not isolate an IF mechanism." }, fi: { mechanism: "Epidemiologinen tutkimussarja on havainto, ei biologinen välivaihe. Henkilökohtaiset magneettikenttätallenteet ja päätepisteassosiaatiot vaativat taajuuseroteltua altistusta ja sekoittavien tekijöiden kontrollia; ne eivät yksilöi IF-mekanismia." }, link: "/evidence/epidemiology" } },
};
for (const n of baseNodes) Object.assign(n, corrections[n.id]);

export const MODULOME_CARD_MAP = Object.fromEntries(MECHANISM_CARDS.map(c => [c.cardId, `card_${c.cardId.slice(5).replaceAll("-", "_")}`]));
function cardEvidenceLevel(cardId: string): EpistemicLevel {
  const entries = atlasClaims(claimIdsForAtlasNode(MODULOME_CARD_MAP[cardId]));
  return entries.length === 1 ? entries[0].assessment?.level ?? "M" : "M";
}
const cardNodes: CausalMapNode[] = MECHANISM_CARDS.map(c => ({
  id: MODULOME_CARD_MAP[c.cardId], level: 2, label: c.title, epistemicLevel: cardEvidenceLevel(c.cardId),
  sourcePaths: ["berm/berm/modulome/cards.py"],
  provenance: { en: "Imported component mechanism; illustrative model coefficients are not calibrated; the L2 response form is conditional, while gauge, physical scale and tissue calibration remain open.", fi: "Tuotu komponenttimekanismi; havainnollistavia mallikertoimia ei ole kalibroitu; L2-vastemuoto on ehdollinen, kun taas gauge, fysikaalinen mittakaava ja kudoskalibrointi ovat avoimia." },
  detail: { en: { mechanism: `${c.exposure.en} ${c.baseline_state.en} ${c.receptor.en} ${c.proximal_response.en} ${c.propagation.en} ${c.memory.en} ${c.mechanism_bounding.en}`, prediction: c.functional_consequence.en }, fi: { mechanism: `${c.exposure.fi} ${c.baseline_state.fi} ${c.receptor.fi} ${c.proximal_response.fi} ${c.propagation.fi} ${c.memory.fi} ${c.mechanism_bounding.fi}`, prediction: c.functional_consequence.fi }, keyRefs: [...c.referenceIds], link: "/modulome" },
}));
const layerNodes: CausalMapNode[] = MODULOME_LAYERS.map(l => ({
  id: `layer_${l.id}`, level: 1, label: { en: l.nameEn, fi: l.nameFi }, epistemicLevel: "M",
  sourcePaths: ["website/lib/modulome/layers.ts"],
  detail: { en: { mechanism: `Imported response-modifying layer: ${l.keyComponentsEn}. State variables: ${l.chiModulatorEn}. This biological response modifier is not the restricted geometric χ_geo coefficient.` }, fi: { mechanism: `Tuotu vastetta muuntava taso: ${l.keyComponentsFi}. Tilamuuttujat: ${l.chiModulatorFi}. Biologinen vastemuunnin ei ole rajoitettu geometrinen χ_geo-kerroin.` }, link: "/modulome" },
}));
const targetNodes: CausalMapNode[] = MODULOME_TARGETS.map(o => ({
  id: `organ_${o.id.replaceAll("-", "_")}`, level: 3, label: { en: o.organEn, fi: o.organFi }, epistemicLevel: "L*",
  sourcePaths: ["website/lib/modulome/organDetailData.ts"],
  detail: { en: { mechanism: `${o.cellTypeEn}: ${o.functionEn}. ${o.bermBridgeEn}` }, fi: { mechanism: `${o.cellTypeFi}: ${o.functionFi}. ${o.bermBridgeFi}` }, keyRefs: o.keyRefs, link: `/modulome/${o.id.split("-")[0]}` },
}));

export const CORE_NODES = [...baseNodes, ...cardNodes, ...layerNodes, ...targetNodes];
const oldRelation = (from: string, to: string): RelationType => {
  if (from === "epi_kaiser_series" || to === "epi_kaiser_series") return "association";
  if (from === "mod_geometry" || from.startsWith("ch_") || from === "solar_geomag") return "bridge";
  if (from === "eco_bee" && to === "eco_varroa") return "differential";
  if (from.startsWith("mod_") || from === "northern_package") return "modulates";
  return "causal";
};
export const CORE_EDGES: CausalMapEdge[] = originalEdges.map(e => ({ ...e,
  // EMDEX does not identify an intermediate-frequency channel.
  from: e.from === "ch_if" && e.to === "epi_kaiser_series" ? "fieldstate_vector" : e.from,
  relation: oldRelation(e.from, e.to), sourcePaths: ["website/lib/causalMapData.ts"],
}));
for (const e of graph.edges) CORE_EDGES.push({
  from: MODEL_NODE_MAP[e.from as keyof typeof MODEL_NODE_MAP], to: MODEL_NODE_MAP[e.to as keyof typeof MODEL_NODE_MAP],
  relation: e.kind === "inference_input" ? "inference" : e.kind === "conditional_response" ? "bridge" : e.kind === "derived_geometry" ? "derived" : "causal", sourcePaths: [sourceRegistry],
});
for (const c of MECHANISM_CARDS) for (const layer of c.layers) {
  const l = MODULOME_LAYERS.find(l => l.number === layer);
  if (l) CORE_EDGES.push({ from: `layer_${l.id}`, to: MODULOME_CARD_MAP[c.cardId], relation: "modulates", sourcePaths: ["berm/berm/modulome/cards.py"] });
}
for (const n of targetNodes) CORE_EDGES.push({ from: "mech_ttype_bifurcation", to: n.id, relation: "causal", sourcePaths: n.sourcePaths });

const addedNodes = extensions.nodes as CausalMapNode[];
export const NODES: CausalMapNode[] = [...CORE_NODES, ...addedNodes, ...INTERVENTION_NODES].map(n => ({ ...n, claimIds: claimIdsForAtlasNode(n.id), searchAliases: [...(n.searchAliases ?? []), ...extensions.searchAliases.filter(a => a.nodeId === n.id).map(a => a.alias)] }));
const resolveNodeId = (id: string) => MODEL_NODE_MAP[id as keyof typeof MODEL_NODE_MAP] ?? id;
const edgeMap = new Map<string, CausalMapEdge>();
for (const e of [...CORE_EDGES, ...extensions.edges as CausalMapEdge[], ...INTERVENTION_EDGES]) {
  const edge = { ...e, from: resolveNodeId(e.from), to: resolveNodeId(e.to) };
  const key = `${edge.from}->${edge.to}`;
  const previous = edgeMap.get(key);
  edgeMap.set(key, { ...edge, claimIds: claimIdsForAtlasEdge(edge.from, edge.to), sourcePaths: [...new Set([...(previous?.sourcePaths ?? []), ...edge.sourcePaths])] });
}
export const EDGES = [...edgeMap.values()];
export const getEdgeRelation = (from: string, to: string): RelationType => edgeMap.get(`${from}->${to}`)?.relation ?? "causal";
export const ATLAS_COVERAGE = {
  modelNodes: Object.keys(MODEL_NODE_MAP).length,
  modelEdges: graph.edges.length,
  mechanismCards: MECHANISM_CARDS.length,
  modulationLayers: MODULOME_LAYERS.length,
  organTargets: MODULOME_TARGETS.length,
};
