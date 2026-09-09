import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, HeartHandshake, Route, Sprout } from "lucide-react";
import { ClaimRef } from "@/components/ClaimRef";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { ModelReadingPath } from "@/components/ModelReadingPath";
import { StudyCitation } from "@/components/StudyCitation";
import { TranslationNotice } from "@/components/TranslationNotice";
import { ReproductiveRegulationAxes } from "@/components/ReproductiveRegulationAxes";
import { ReproductiveRegulationEvidence } from "@/components/ReproductiveRegulationEvidence";
import { REPRODUCTIVE_REGULATION, regulationFamily, regulationText as tx } from "@/lib/reproductiveRegulation";
import { pickCopy } from "@/lib/i18n";
import styles from "./hero.module.css";

const COPY = {
  en: {
    title: "Reproductive regulation: motivation, capacity and care",
    subtitle: "How a shared biological state can produce coordinated—and selectively different—behavioural outcomes.",
    lead: "Reproduction is regulated before a pregnancy begins. Biological state shapes what attracts attention, whether an approach occurs, how another individual responds and which physiological transitions can succeed. The same system also regulates care. BERM connects these three branches to explain both shared changes and the outputs that remain intact.",
    back: "Biological state and behaviour", contents: "On this page",
    nav: ["Three branches", "Selective regulation", "Caregiving", "Time course", "Evidence matrix", "Shared measurements", "Eight axes", "Feedback", "Existing data"],
    structureTitle: "Three branches from a shared receiving state",
    structureIntro: "The physical input enters BERM through its conditional receiving response, then the existing calcium, redox, clock, metabolic and hormone-receptor states. The experiments here identify downstream biological and social transitions. They give the model a concrete structure for reproductive regulation; the geometric input and its tissue-specific calibration remain the separate upstream link.",
    state: "Receiving state + hormonal timing + learned history + present context",
    branches: [
      { title: "Motivation and realisation", text: "Desire and cue response → approach → another individual’s response → a realised encounter or attempt.", measure: "Measure desire, action and opportunity separately.", refs: ["peragine2017_rfrp_suppression", "mills2023_kisspeptin"] },
      { title: "Physiological capacity", text: "GnRH/LH responsiveness → gonadal function and reserve → the biological success of an encounter.", measure: "Measure current hormone levels, stimulated response and functional success separately.", refs: ["abbott1988_social_lh", "hoskova2022_hyperprolactin_kisspeptin"] },
      { title: "Caregiving and feedback", text: "Sensitivity to caregiving cues → directed care → changed contact and learning → later responses.", measure: "Measure the amount and target of care alongside reproductive activity.", refs: ["clarkson2026_prolactin_parental", "weisman2012_oxytocin_dyad"] },
    ],
    output: "Realised encounters and conditional biological success → reproductive timing and births",
    careReturn: "Care → later contact, learning and receiving state",
    outputText: "Realisation includes pregnancy-exposing encounters as well as intentional attempts, so unplanned pregnancies remain in the pathway. External resources, timing and constraints contribute to opportunity. Care and subsequent social contact form their own feedback branch, rather than a compulsory step before every birth.",
    selectiveTitle: "A reproductive brake can be selective",
    selectiveClaim: "A biological intervention can reduce reproductive-axis activation and sexually directed behaviour while several other functions remain available.",
    selective: "In naked mole-rats, RFRP-3 administration after colony removal prevented a progesterone rise and reduced opposite-sex genital investigation. Other social investigation, movement and several additional responses remained intact. The experiment locates a selective output pattern: a general loss of activity is unnecessary to explain the reproductive change. [[ref:peragine2017_rfrp_suppression|Peragine 2017]].",
    selectiveSecond: "Marmoset removal and return experiments place social context upstream of LH and ovulation. Together with the hormone-challenge literature, they identify reproductive-axis responsiveness more precisely than a universal high-cortisol state. For BERM, selectivity adds explanatory power: a shared receiving state can change particular target circuits while preserving other functions. [[ref:abbott1988_social_lh|Abbott 1988]].",
    careTitle: "One hormonal signal, different target circuits",
    careClaim: "Reproductive-axis activation and caregiving can diverge because the same hormonal system acts through distinct receiving pathways.",
    careBranches: [
      { title: "Prolactin → kisspeptin → reproductive-axis response", text: "In mice, prolactin exposure reduced kisspeptin expression and reproductive-axis activity; kisspeptin restored ovarian cycling. In women with hyperprolactinaemia, repeated kisspeptin administration increased LH pulses without a significant overall reduction in prolactin. The human endpoint was a pulse response.", refs: ["sonigo2012_prolactin_kisspeptin", "hoskova2022_hyperprolactin_kisspeptin"] },
      { title: "Prolactin-sensitive MPOA–VTA → offspring contact", text: "A separate mouse study located a prolactin-sensitive circuit supporting offspring contact and a related dopamine response. Activating the pathway increased contact even in females that had not given birth. Circuit-specific intervention identifies a caregiving route.", refs: ["clarkson2026_prolactin_parental"] },
    ],
    careSynthesis: "BERM synthesis: the shared hormone connects these experiments at a named biological variable. Different receptors, circuits and reproductive phases explain why care can be maintained or strengthened while reproductive-axis activation falls. Kohl’s projection-specific work and Ammari’s pregnancy-related circuit plasticity further separate components and timescales of care. [[ref:kohl2018_parental_circuits|Kohl 2018]]; [[ref:ammari2023_pregnancy_parental|Ammari 2023]].",
    careOutcome: "The amount of care and its target are different outcomes. Own-child care, care for another child and care for an animal require their own contact histories and measures. A caregiving relationship becomes informative about reproductive regulation when it is joined to the same person’s physiological and behavioural sequence.",
    timeTitle: "The order of change helps locate the gate",
    timeIntro: "Social behaviour, hormone pulses, gonadal reserve and a birth occupy different clocks. Follow each measured variable through time instead of assigning one recovery time to the whole profile.",
    timeRows: [
      { title: "Behaviour can change before slow tissue remodelling", text: "Social opportunity in cichlids produced rapid behavioural and local gene-expression responses; related work measured gonadotropin changes within 30 minutes. These are different measurements in the same research programme, with their own experimental samples.", refs: ["burmeister2005_social_genomic", "maruska2011_pituitary_plasticity"] },
      { title: "Behaviour can also outlast measured hormone differences", text: "A visual social cue maintained subordinate behaviour across seven days while measured physiological differences were transient or absent by the final time point. The visible behaviour therefore did not identify the entire current physiological state.", refs: ["chen2011_visual_social"] },
      { title: "Reserve can remain available during social suppression", text: "Suppressed male cichlids retained spermatogenesis and could fertilise within hours of a social opportunity. A suppressed reproductive role and complete loss of biological capacity are distinct states.", refs: ["kustan2011_reproductive_reserve"] },
      { title: "Realised reproductive transitions are followed across longer intervals", text: "Cebu analyses connect fatherhood, testosterone and sexual activity within one cohort. Friendship and workplace studies add the timing of later reproductive transitions. Their longer follow-up supplies a different measurement scale from an acute hormone challenge.", refs: ["gettler2013_fatherhood_sex", "balbo2014_fertility_friends", "pink2014_fertility_coworkers"] },
    ],
    sharedTitle: "Follow the same person and the same biological variable",
    sharedIntro: "The strongest next connection often exists inside published data. Cebu’s fatherhood and sexual-activity analyses join hormones and behaviour within a shared cohort. NSSHB distinguishes solitary and partnered sexual outputs; PSID follows sexual activity alongside relationships and life-course conditions. These analyses begin to recover a joint profile from outcomes otherwise studied separately.",
    intentionsTitle: "Five observations with different roles",
    intentions: [{ title: "Desire", text: "What feels wanted or attractive now." }, { title: "Expectation", text: "What the person considers likely under current conditions." }, { title: "Intention", text: "What action is planned, and on what timescale." }, { title: "Attempt or encounter", text: "What actually occurs between people, including exposure without an intention to conceive." }, { title: "Pregnancy or birth", text: "A later event with its own biological conditions and timing." }],
    sharedRefs: ["gettler2011_fatherhood_testosterone", "gettler2013_fatherhood_sex", "herbenick2021_sexual_repertoire", "lei_south2021_sexual_activity"],
    measureSteps: [
      { title: "Within one experiment", text: "Which biological variables and behaviours changed after the defined intervention? Which measured outputs were preserved?" },
      { title: "Within one cohort", text: "How do physiology, desire, contact and reproductive transitions align in the same people and observation windows?" },
      { title: "Across studies", text: "Which named intermediate joins the studies, and which transition is supplied by BERM’s synthesis?" },
    ],
    opportunityClaim: "Biological state can change both an individual’s approach and the responses of others; BERM carries these contributions into opportunity and realised encounters while retaining external constraints.",
    feedbackTitle: "Three feedbacks connect the individual to population change",
    feedbackClaim: "A change in behaviour becomes part of another individual’s sensory and social input. Repeated contact, reproduction and institutions can carry the change across different timescales.",
    feedbacks: [
      { title: "Contact feedback", text: "The person’s state changes their actions and how others respond. This changes the next set of available contacts, cues and learning experiences. Sleep-loss and father–infant interventions locate direct interpersonal transitions.", refs: ["bensimon2018_sleep_social", "weisman2012_oxytocin_dyad"] },
      { title: "Reproduction and caregiving feedback", text: "Births change access to infants and care. Contact changes later responsiveness and activity. Prolactin’s different targets show why stronger caregiving need not mean greater activation toward a new pregnancy.", refs: ["clarkson2026_prolactin_parental", "gettler2013_fatherhood_sex"] },
      { title: "Practice and institutional feedback", text: "Repeated actions and reported reasons change shared practices, schedules, services and options encountered by later cohorts. Fertility-network observations locate timed social transmission; the broader institutional continuation is BERM synthesis.", refs: ["balbo2014_fertility_friends", "pink2014_fertility_coworkers"] },
    ],
    feedbackConclusion: "A loop that strengthens the initial change is reinforcing feedback. Its persistence depends on the signs, strength and delays of the links. BERM already distinguishes physiological recovery, learning, social networks and institutional memory, so a population trajectory can persist after one acute biological measure has recovered.",
    synthesisTitle: "The integrated conclusions and their sources",
    synthesisLabel: "BERM synthesis across studies", synthesisScope: "Scope of the connection",
    dataTitle: "Existing data that can join the measurements", dataIntro: "The resources below retain their population, time window, access conditions and measured variables. Published analyses and available data support the structural integration without assigning unobserved hormone or field values to individuals.",
    dataAccess: "Access", dataScope: "Measurement scope", collectionYears: "Collection years", publicationYear: "Publication year", individual: "Individual observations", aggregate: "Aggregate observations", longitudinal: "Longitudinal design", crossSectional: "Other observation design", dataLink: "Open the documented resource", download: "Download the evidence catalogue",
    nextTitle: "Continue through the model", nextLabels: ["Biological coordination", "Calcium, redox and hormone production", "The eight proxy axes", "From actions to civilization"],
  },
  fi: {
    title: "Lisääntymisen säätely: motivaatio, kapasiteetti ja hoiva",
    subtitle: "Miten yhteinen biologinen tila tuottaa koordinoituja mutta myös valikoivasti eriytyviä käyttäytymisulostuloja.",
    lead: "Lisääntymistä säädellään ennen raskauden alkua. Biologinen tila muuttaa sitä, mikä vetää huomiota, tapahtuuko lähestyminen, miten toinen vastaa ja mitkä fysiologiset siirtymät onnistuvat. Sama järjestelmä säätelee myös hoivaa. BERM yhdistää nämä kolme haaraa selittääkseen sekä yhteiset muutokset että säilyvät toiminnot.",
    back: "Biologinen tila ja käyttäytyminen", contents: "Tällä sivulla",
    nav: ["Kolme haaraa", "Valikoiva säätely", "Hoiva", "Aikajärjestys", "Näyttömatriisi", "Yhteiset mittaukset", "Kahdeksan akselia", "Palaute", "Olemassa olevat aineistot"],
    structureTitle: "Kolme haaraa yhteisestä vastaanottavasta tilasta",
    structureIntro: "Fysikaalinen syöte tulee BERM:n ehdollisen vastaanottovasteen kautta nykyisiin kalsium-, redox-, kello-, aineenvaihdunta- ja hormonireseptoritiloihin. Tämän sivun kokeet paikantavat niitä seuraavia biologisia ja sosiaalisia siirtymiä. Ne antavat mallille lisääntymissäätelyn konkreettisen rakenteen; geometrinen syöte ja sen kudoskohtainen kalibrointi ovat ketjun erillinen alkuvaihe.",
    state: "Vastaanottava tila + hormonien ajoitus + opittu historia + nykyinen tilanne",
    branches: [
      { title: "Motivaatio ja toteutuminen", text: "Halu ja vihjevaste → lähestyminen → toisen vaste → toteutunut kohtaaminen tai yritys.", measure: "Mittaa halu, teko ja mahdollisuus erikseen.", refs: ["peragine2017_rfrp_suppression", "mills2023_kisspeptin"] },
      { title: "Fysiologinen kapasiteetti", text: "GnRH/LH-vaste → sukurauhasten toiminta ja reservi → kohtaamisen biologinen onnistuminen.", measure: "Mittaa hormonitaso, stimuloitu vaste ja toiminnallinen onnistuminen erikseen.", refs: ["abbott1988_social_lh", "hoskova2022_hyperprolactin_kisspeptin"] },
      { title: "Hoiva ja palaute", text: "Herkkyys hoivavihjeille → kohdennettu hoiva → muuttunut kontakti ja oppiminen → myöhemmät vasteet.", measure: "Mittaa hoivan määrä ja kohde lisääntymistoiminnan rinnalla.", refs: ["clarkson2026_prolactin_parental", "weisman2012_oxytocin_dyad"] },
    ],
    output: "Toteutuneet kohtaamiset ja ehdollinen biologinen onnistuminen → lisääntymisen ajoitus ja syntymät",
    careReturn: "Hoiva → myöhempi kontakti, oppiminen ja vastaanottava tila",
    outputText: "Toteutuminen sisältää lisääntymiselle altistavat kohtaamiset ja tarkoitukselliset yritykset, joten myös suunnittelemattomat raskaudet säilyvät ketjussa. Ulkoiset resurssit, ajoitus ja rajoitteet osallistuvat mahdollisuuksiin. Hoiva ja myöhempi sosiaalinen kontakti muodostavat oman palautehaaransa; ne eivät ole jokaisen syntymän pakollinen edeltävä vaihe.",
    selectiveTitle: "Lisääntymisjarru voi olla valikoiva",
    selectiveClaim: "Biologinen interventio voi vähentää lisääntymisakselin aktivaatiota ja seksuaalisesti kohdennettua käyttäytymistä useiden muiden toimintojen säilyessä.",
    selective: "Paljaskoirarotilla RFRP-3:n anto koloniasta poistamisen jälkeen esti progesteronin nousun ja vähensi vastakkaisen sukupuolen genitaalialueen tutkimista. Muu sosiaalinen tutkiminen, liikkuminen ja useat muut vasteet säilyivät. Koe paikantaa valikoivan ulostuloprofiilin: lisääntymismuutos ei tarvitse selityksekseen yleistä aktiivisuuden katoamista. [[ref:peragine2017_rfrp_suppression|Peragine 2017]].",
    selectiveSecond: "Marmosettien irrotus- ja palautuskokeet sijoittavat sosiaalisen tilanteen LH:n ja ovulaation edelle. Hormonialtistuskirjallisuuden kanssa ne paikantavat lisääntymisakselin vasteen yleistä korkean kortisolin tilaa tarkemmin. BERM:lle valikoivuus lisää selitysvoimaa: yhteinen vastaanottava tila voi muuttaa tiettyjä kohdepiirejä muiden toimintojen säilyessä. [[ref:abbott1988_social_lh|Abbott 1988]].",
    careTitle: "Yksi hormonisignaali, eri kohdepiirit",
    careClaim: "Lisääntymisakselin aktivoituminen ja hoiva voivat eriytyä, koska sama hormonaalinen järjestelmä vaikuttaa erillisten vastaanottavien reittien kautta.",
    careBranches: [
      { title: "Prolaktiini → kisspeptiini → lisääntymisakselin vaste", text: "Hiirillä prolaktiinialtistus vähensi kisspeptiinin ilmentymistä ja lisääntymisakselin toimintaa; kisspeptiini palautti munasarjasyklin. Hyperprolaktinemiasta kärsivillä naisilla toistuva kisspeptiinin anto lisäsi LH-pulsseja ilman prolaktiinin merkitsevää vähenemistä koko aineistossa. Ihmiskokeen päätepiste oli pulssivaste.", refs: ["sonigo2012_prolactin_kisspeptin", "hoskova2022_hyperprolactin_kisspeptin"] },
      { title: "Prolaktiinille herkkä MPOA–VTA → poikaskontakti", text: "Erillinen hiirikoe paikansi prolaktiinille herkän, poikaskontaktia tukevan piirin ja siihen liittyvän dopamiinivasteen. Reitin aktivointi lisäsi kontaktia myös synnyttämättömillä naarailla. Piirikohtainen interventio paikantaa hoivareitin.", refs: ["clarkson2026_prolactin_parental"] },
    ],
    careSynthesis: "BERM-synteesi: yhteinen hormoni yhdistää kokeet nimetyn biologisen muuttujan kohdalta. Eri reseptorit, piirit ja lisääntymisvaiheet selittävät, miksi hoiva voi säilyä tai vahvistua lisääntymisakselin aktivaation laskiessa. Kohlin projektiokohtainen tutkimus ja Ammarin raskaudenaikainen piirimuovautuminen erottavat edelleen hoivan osia ja aikaskaaloja. [[ref:kohl2018_parental_circuits|Kohl 2018]]; [[ref:ammari2023_pregnancy_parental|Ammari 2023]].",
    careOutcome: "Hoivan määrä ja sen kohde ovat eri ulostuloja. Oman lapsen, toisen lapsen ja eläimen hoiva tarvitsevat omat kontaktihistoriansa ja mittarinsa. Hoivasuhde kertoo lisääntymissäätelystä enemmän, kun se liitetään saman ihmisen fysiologiseen ja käyttäytymisen tapahtumaketjuun.",
    timeTitle: "Muutosten järjestys auttaa paikantamaan portin",
    timeIntro: "Sosiaalinen käyttäytyminen, hormonipulssit, sukurauhasten reservi ja syntymä kulkevat eri kelloissa. Seuraa kutakin mitattua muuttujaa ajassa sen sijaan, että koko profiilille annettaisiin yksi palautumisaika.",
    timeRows: [
      { title: "Käyttäytyminen voi muuttua ennen hidasta kudosmuovautumista", text: "Kirjoahvenen sosiaalinen mahdollisuus tuotti nopeita käyttäytymis- ja paikallisia geenivasteita; saman tutkimusohjelman työ mittasi gonadotropiinimuutoksia 30 minuutissa. Mittaukset ja niiden koe-eläinaineistot ovat erillisiä saman tutkimusohjelman osia.", refs: ["burmeister2005_social_genomic", "maruska2011_pituitary_plasticity"] },
      { title: "Käyttäytyminen voi myös jatkua hormonieroa pidempään", text: "Visuaalinen sosiaalinen vihje säilytti alisteisen käyttäytymisen seitsemän päivää, vaikka mitatut fysiologiset erot olivat ohimeneviä tai puuttuivat viimeisessä aikapisteessä. Näkyvä käyttäytyminen ei siis yksilöinyt koko nykyistä fysiologista tilaa.", refs: ["chen2011_visual_social"] },
      { title: "Reservi voi säilyä sosiaalisen suppression aikana", text: "Alistetuilla kirjoahvenkoirailla spermatogeneesi säilyi, ja ne pystyivät hedelmöittämään tuntien kuluessa sosiaalisen mahdollisuuden avautumisesta. Lisääntymisroolin suppressio ja biologisen kapasiteetin täydellinen katoaminen ovat eri tiloja.", refs: ["kustan2011_reproductive_reserve"] },
      { title: "Toteutuvia lisääntymissiirtymiä seurataan pidemmillä jaksoilla", text: "Cebu-analyysit yhdistävät isyyden, testosteronin ja seksuaalisen toiminnan samassa kohortissa. Ystävyys- ja työpaikkatutkimukset lisäävät myöhempien lisääntymissiirtymien ajoituksen. Niiden pitkä seuranta on eri mittaustaso kuin akuutti hormonihaaste.", refs: ["gettler2013_fatherhood_sex", "balbo2014_fertility_friends", "pink2014_fertility_coworkers"] },
    ],
    sharedTitle: "Seuraa samaa ihmistä ja samaa biologista muuttujaa",
    sharedIntro: "Vahvin seuraava yhteys löytyy usein julkaistun aineiston sisältä. Cebun isyys- ja seksuaalitoiminta-analyysit liittävät hormonit ja käyttäytymisen yhteiseen kohorttiin. NSSHB erottaa yksin ja kumppanin kanssa toteutuvat seksuaaliset ulostulot; PSID seuraa seksuaalista toimintaa suhteiden ja elämänkulun olosuhteiden rinnalla. Nämä analyysit palauttavat yhteistä profiilia muutoin erillään tutkituista ulostuloista.",
    intentionsTitle: "Viisi havaintoa, joilla on eri tehtävät",
    intentions: [{ title: "Toive", text: "Mikä tuntuu nyt halutulta tai houkuttelevalta." }, { title: "Odotus", text: "Mitä ihminen pitää nykyisissä oloissa todennäköisenä." }, { title: "Aikomus", text: "Mitä toimintaa suunnitellaan ja millä aikataululla." }, { title: "Yritys tai kohtaaminen", text: "Mitä ihmisten välillä todella tapahtuu, myös ilman raskauden aikomusta." }, { title: "Raskaus tai syntymä", text: "Myöhempi tapahtuma, jolla on omat biologiset ehtonsa ja ajoituksensa." }],
    sharedRefs: ["gettler2011_fatherhood_testosterone", "gettler2013_fatherhood_sex", "herbenick2021_sexual_repertoire", "lei_south2021_sexual_activity"],
    measureSteps: [
      { title: "Samassa kokeessa", text: "Mitkä biologiset muuttujat ja käyttäytymiset muuttuivat nimetyn intervention jälkeen? Mitkä mitatut ulostulot säilyivät?" },
      { title: "Samassa kohortissa", text: "Miten fysiologia, halu, kontakti ja lisääntymissiirtymät liittyvät samoihin ihmisiin ja havaintoikkunoihin?" },
      { title: "Tutkimusten välillä", text: "Mikä nimetty välivaihe yhdistää tutkimukset, ja mikä siirtymä tulee BERM:n synteesistä?" },
    ],
    opportunityClaim: "Biologinen tila voi muuttaa sekä yksilön lähestymistä että muiden vastauksia; BERM kuljettaa nämä osuudet mahdollisuuksiin ja toteutuneisiin kohtaamisiin säilyttäen ulkoiset rajoitteet.",
    feedbackTitle: "Kolme palautetta yhdistää yksilön väestömuutokseen",
    feedbackClaim: "Käyttäytymisen muutos tulee osaksi toisen yksilön aisti- ja sosiaalista syötettä. Toistuva kontakti, lisääntyminen ja instituutiot voivat kuljettaa muutosta eri aikaskaaloilla.",
    feedbacks: [
      { title: "Kontaktipalaute", text: "Yksilön tila muuttaa hänen tekojaan ja muiden vastauksia. Se muuttaa seuraavia kontakteja, vihjeitä ja oppimiskokemuksia. Univaje- ja isä–vauva-interventiot paikantavat suoria henkilöiden välisiä siirtymiä.", refs: ["bensimon2018_sleep_social", "weisman2012_oxytocin_dyad"] },
      { title: "Lisääntymisen ja hoivan palaute", text: "Syntymät muuttavat vauva- ja hoivakontaktien saatavuutta. Kontakti muuttaa myöhempää vastaanottavuutta ja toimintaa. Prolaktiinin eri kohdereitit näyttävät, miksi vahvempi hoiva ei yleisesti tarkoita uuden raskauden aktivaation kasvua.", refs: ["clarkson2026_prolactin_parental", "gettler2013_fatherhood_sex"] },
      { title: "Käytäntöjen ja instituutioiden palaute", text: "Toistuvat teot ja kerrotut syyt muuttavat yhteisiä käytäntöjä, aikatauluja, palveluita ja myöhempien kohorttien vaihtoehtoja. Syntyvyysverkostojen havainnot paikantavat ajallista sosiaalista välitystä; laajempi institutionaalinen jatko on BERM-synteesi.", refs: ["balbo2014_fertility_friends", "pink2014_fertility_coworkers"] },
    ],
    feedbackConclusion: "Alkumuutosta voimistava silmukka on vahvistavaa palautetta. Sen jatkuvuus riippuu linkkien suunnista, voimakkuudesta ja viiveistä. BERM erottaa jo fysiologisen palautumisen, oppimisen, sosiaaliset verkostot ja institutionaalisen muistin, joten väestökehitys voi jatkua yhden akuutin biologisen mittarin palauduttua.",
    synthesisTitle: "Yhdistetyt päätelmät ja niiden lähteet",
    synthesisLabel: "BERM:n tutkimusten välinen synteesi", synthesisScope: "Yhteyden soveltamisala",
    dataTitle: "Olemassa olevat aineistot mittausten yhdistämiseen", dataIntro: "Aineistoissa säilyvät niiden väestö, havaintoikkuna, käyttöehdot ja mitatut muuttujat. Julkaistut analyysit ja saatavilla oleva data tukevat rakenteellista integraatiota ilman mittaamattomien hormoni- tai kenttäarvojen lisäämistä yksilöille.",
    dataAccess: "Saatavuus", dataScope: "Mittausten soveltamisala", collectionYears: "Keruuvuodet", publicationYear: "Julkaisuvuosi", individual: "Yksilöhavainnot", aggregate: "Aggregaattihavainnot", longitudinal: "Pitkittäisasetelma", crossSectional: "Muu havaintoasetelma", dataLink: "Avaa dokumentoitu aineisto", download: "Lataa näyttöluettelo",
    nextTitle: "Jatka mallissa", nextLabels: ["Biologinen koordinaatio", "Kalsium, redox ja hormonituotanto", "Kahdeksan proxy-akselia", "Teoista sivilisaatioon"],
  }, ja: {}, fr: {}, ko: {},
} as const;
const ANCHORS = ["three-branches", "selective-regulation", "caregiving", "time-course", "evidence-matrix", "shared-measures", "eight-axes", "feedback", "existing-data"];
const BRANCH_ICONS = [Route, Sprout, HeartHandshake];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = pickCopy(COPY, locale) as typeof COPY.en;
  return { title: `${c.title} – Extinction Field`, description: c.subtitle };
}

export default async function ReproductiveRegulationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = pickCopy(COPY, locale) as typeof COPY.en;
  const p = (text: string) => <p className="max-w-4xl text-base leading-8 text-foreground-muted"><InlineReferenceText text={text} locale={locale} /></p>;
  const refs = (ids: readonly string[]) => <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">{ids.map(id => <StudyCitation key={id} referenceId={id} locale={locale} />)}</div>;
  const branchCard = (index: number) => {
    const branch = c.branches[index];
    const Icon = BRANCH_ICONS[index];
    return <div key={branch.title} className="min-w-0 rounded-xl border border-accent/25 bg-background p-5"><Icon size={23} className="mb-4 text-accent" aria-hidden="true" /><h3 className="mb-3 text-base font-semibold leading-6">{branch.title}</h3><p className="text-sm leading-7">{branch.text}</p><p className="mt-4 text-xs leading-6 text-foreground-muted">{branch.measure}</p>{refs(branch.refs)}</div>;
  };
  return <article>
    <TranslationNotice copy={COPY} locale={locale} />
    <header className={styles.hero} aria-labelledby="reproductive-regulation-title">
      <Image
        src="/images/reproductive-regulation-hero-v1.png"
        alt=""
        fill
        sizes="(min-width: 1536px) 1488px, 100vw"
        preload
        className={styles.artwork}
      />
      <div className={styles.veil} aria-hidden="true" />
      <div className={styles.copy}>
        <Link href={`/${locale}/behavior`} className={styles.back}>← {c.back}</Link>
        <h1 id="reproductive-regulation-title" className={styles.title}>{c.title}</h1>
        <p className={styles.deck}>{c.subtitle}</p>
        <p className={styles.lead}>{c.lead}</p>
      </div>
    </header>
    <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-6 sm:pb-14">
      <div className="my-8"><ModelReadingPath locale={locale} current="behavior" /></div>
      <nav aria-label={c.contents} className="mb-12 flex flex-wrap gap-x-5 gap-y-3 border-y editorial-rule py-5">{ANCHORS.map((id, index) => <a key={id} href={`#${id}`} className="text-sm text-accent hover:underline">{c.nav[index]}</a>)}</nav>
      <div className="space-y-14 sm:space-y-20">
        <section id="three-branches" className="scroll-mt-28 space-y-5"><h2 className="editorial-section-heading">{c.structureTitle}</h2>{p(c.structureIntro)}
          <figure className="rounded-2xl border border-card-border bg-[var(--figure-bg)] p-4 sm:p-7">
            <p className="rounded-lg border border-card-border bg-background p-4 text-center text-sm font-semibold leading-7">{c.state}</p><ArrowDown size={22} className="mx-auto my-4 text-accent" aria-hidden="true" />
            <div className="grid items-start gap-5 lg:grid-cols-3">
              <div role="group" aria-label={c.output} className="min-w-0 lg:col-span-2"><div className="grid gap-4 sm:grid-cols-2">{[0, 1].map(branchCard)}</div><ArrowDown size={22} className="mx-auto my-4 text-accent" aria-hidden="true" /><p className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-center font-semibold leading-7">{c.output}</p></div>
              <div role="group" aria-label={c.careReturn} className="min-w-0">{branchCard(2)}<ArrowDown size={22} className="mx-auto my-4 text-accent" aria-hidden="true" /><p className="rounded-lg border border-card-border bg-background p-4 text-center text-sm font-semibold leading-7">{c.careReturn}</p></div>
            </div><figcaption className="mt-4 text-sm leading-7 text-foreground-muted">{c.outputText}</figcaption>
          </figure>
        </section>
        <section id="selective-regulation" className="scroll-mt-28 space-y-5 border-t editorial-rule pt-8"><h2 className="editorial-section-heading">{c.selectiveTitle}</h2><p className="max-w-4xl text-lg font-medium leading-8"><ClaimRef claimId="claim.reproduction.selective-regulation">{c.selectiveClaim}</ClaimRef></p>{p(c.selective)}{p(c.selectiveSecond)}</section>
        <section id="caregiving" className="scroll-mt-28 space-y-5 border-t editorial-rule pt-8"><h2 className="editorial-section-heading">{c.careTitle}</h2><p className="max-w-4xl text-lg font-medium leading-8"><ClaimRef claimId="claim.reproduction.caregiving-allocation">{c.careClaim}</ClaimRef></p>
          <div className="grid gap-4 md:grid-cols-2">{c.careBranches.map(branch => <div key={branch.title} className="rounded-xl border border-card-border p-5"><h3 className="mb-3 text-base font-semibold leading-7">{branch.title}</h3><p className="text-sm leading-7 text-foreground-muted">{branch.text}</p>{refs(branch.refs)}</div>)}</div>{p(c.careSynthesis)}{p(c.careOutcome)}
        </section>
        <section id="time-course" className="scroll-mt-28 space-y-5 border-t editorial-rule pt-8"><h2 className="editorial-section-heading">{c.timeTitle}</h2>{p(c.timeIntro)}<ol className="space-y-6 border-l-2 border-accent/30 pl-5 sm:pl-8">{c.timeRows.map(row => <li key={row.title}><h3 className="text-base font-semibold leading-7">{row.title}</h3><p className="mt-2 max-w-4xl text-sm leading-7 text-foreground-muted">{row.text}</p>{refs(row.refs)}</li>)}</ol></section>
        <ReproductiveRegulationEvidence locale={locale} />
        <section id="shared-measures" className="scroll-mt-28 space-y-5 border-t editorial-rule pt-8"><h2 className="editorial-section-heading">{c.sharedTitle}</h2>{p(c.sharedIntro)}{refs(c.sharedRefs)}<div className="grid gap-4 md:grid-cols-3">{c.measureSteps.map((step, index) => <div key={step.title} className="rounded-xl border border-card-border p-5"><span className="mb-3 block font-serif text-3xl text-accent">0{index + 1}</span><h3 className="mb-3 text-base font-semibold">{step.title}</h3><p className="text-sm leading-7 text-foreground-muted">{step.text}</p></div>)}</div><div className="space-y-4"><h3 className="text-lg font-semibold">{c.intentionsTitle}</h3><dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{c.intentions.map(item => <div key={item.title} className="border-t-2 border-accent/30 pt-3"><dt className="mb-2 text-sm font-semibold">{item.title}</dt><dd className="text-sm leading-6 text-foreground-muted">{item.text}</dd></div>)}</dl></div><p className="max-w-4xl border-l-2 border-accent pl-4 text-base leading-8"><ClaimRef claimId="claim.behavior.behaviour-to-opportunity">{c.opportunityClaim}</ClaimRef></p></section>
        <ReproductiveRegulationAxes locale={locale} />
        <section id="feedback" className="scroll-mt-28 space-y-5 border-t editorial-rule pt-8"><h2 className="editorial-section-heading">{c.feedbackTitle}</h2><p className="max-w-4xl text-lg leading-8"><ClaimRef claimId="claim.reproduction.social-feedback">{c.feedbackClaim}</ClaimRef></p><div className="grid gap-4 lg:grid-cols-3">{c.feedbacks.map(item => <div key={item.title} className="rounded-xl border border-card-border p-5"><h3 className="mb-3 text-base font-semibold leading-7">{item.title}</h3><p className="text-sm leading-7 text-foreground-muted">{item.text}</p>{refs(item.refs)}</div>)}</div>{p(c.feedbackConclusion)}</section>
        <section className="space-y-5 border-t editorial-rule pt-8"><h2 className="editorial-section-heading">{c.synthesisTitle}</h2><div className="grid gap-4 md:grid-cols-2">{REPRODUCTIVE_REGULATION.syntheses.map(synthesis => <div key={synthesis.id} className="rounded-xl border border-accent/25 bg-accent/5 p-5"><p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">{c.synthesisLabel}</p><h3 className="mb-3 text-base font-semibold leading-7">{tx(synthesis.title, locale)}</h3><p className="text-sm leading-7">{tx(synthesis.statement, locale)}</p><p className="mt-4 text-xs leading-6 text-foreground-muted"><strong>{c.synthesisScope}: </strong>{tx(synthesis.scope, locale)}</p>{refs(synthesis.referenceIds)}</div>)}</div></section>
        <section id="existing-data" className="scroll-mt-28 space-y-5 border-t editorial-rule pt-8"><h2 className="editorial-section-heading">{c.dataTitle}</h2>{p(c.dataIntro)}<div className="space-y-4">{REPRODUCTIVE_REGULATION.existingDatasets.map(data => <details key={data.id} className="rounded-xl border border-card-border p-5"><summary className="cursor-pointer text-base font-semibold leading-7">{tx(data.title, locale)}<span className="mt-1 block text-xs font-normal text-foreground-muted">{tx(regulationFamily(data.familyId).label, locale)}</span></summary><div className="mt-5 space-y-4"><p className="text-sm leading-7">{tx(data.description, locale)}</p><p className="text-sm leading-7 text-foreground-muted"><strong>{data.yearBasis === "collection" ? c.collectionYears : c.publicationYear}: </strong>{data.years}</p><div className="flex flex-wrap gap-2 text-xs text-foreground-muted"><span className="rounded-md border border-card-border px-2 py-1">{data.individualLevel ? c.individual : c.aggregate}</span><span className="rounded-md border border-card-border px-2 py-1">{data.longitudinal ? c.longitudinal : c.crossSectional}</span></div><p className="text-sm leading-7 text-foreground-muted"><strong>{c.dataAccess}: </strong>{tx(data.access, locale)}</p><p className="text-sm leading-7 text-foreground-muted"><strong>{c.dataScope}: </strong>{tx(data.scope, locale)}</p><div className="flex flex-wrap gap-5 text-sm">{/^https:\/\/(?:dx\.)?doi\.org\//i.test(data.url) ? <StudyCitation referenceId={data.referenceId} locale={locale} label={c.dataLink} /> : <a href={data.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{c.dataLink} ↗</a>}<StudyCitation referenceId={data.referenceId} locale={locale} /></div></div></details>)}</div><a href="/data/reproductive-regulation.json" className="inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:underline">{c.download}<ArrowRight size={15} aria-hidden="true" /></a></section>
        <nav aria-label={c.nextTitle} className="border-t editorial-rule pt-8"><h2 className="editorial-section-heading mb-5">{c.nextTitle}</h2><div className="flex flex-wrap gap-x-6 gap-y-3">{["/model/biological-coordination", "/biology/calcium-redox-steroidogenesis", "/model/proxy-masking#syndrome-fragmentation", "/civilization"].map((href, i) => <Link key={href} href={`/${locale}${href}`} className="text-sm text-accent hover:underline">{c.nextLabels[i]} →</Link>)}</div></nav>
      </div>
    </div>
  </article>;
}
