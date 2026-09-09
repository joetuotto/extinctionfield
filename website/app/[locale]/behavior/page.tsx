import { TestosteroneCalibrationSummary } from "@/components/TestosteroneCalibrationUpdate";
import { ReproductiveRegulationIntegration } from "@/components/ReproductiveRegulationIntegration";
import { CombinedExposurePanel } from "@/components/CombinedExposurePanel";
import { SteroidogenesisIntegrationPanel } from "@/components/SteroidogenesisIntegrationPanel";
import type { Metadata } from "next";
import Image from "next/image";
import { Brain } from "lucide-react";
import { ClaimRef } from "@/components/ClaimRef";
import { ExplanationHub, ExplanationSection, ExplanationText, ResearchConnection } from "@/components/ExplanationHub";
import { MathBlock } from "@/components/MathBlock";
import { pickCopy } from "@/lib/i18n";
import { EncounterWindowsIllustration } from "@/components/EncounterWindowsIllustration";
import styles from "./desire-hero.module.css";
import socialStyles from "./social-hero.module.css";

const COPY = {
  en: {
    title: "From biology to desire and action",
    subtitle: "How biological state becomes experienced value, motivation, decisions, reasons and interaction.",
    lead: "BERM treats the formation of motivation as part of the biological chain. Hormonal and neural state help determine what attracts attention, feels rewarding and seems worth the effort. Deliberation operates on those experienced values. The model therefore explains both what people are able to do and what they want, choose and give reasons for doing.",
    incoming: "The receiving, endocrine and neural state described in Biology: hormone responsiveness, timing, energy, redox and electrical function. Their EMF-related change enters through the physical receiving bridge.",
    outgoing: "A distribution of initiatives, responses, choices and repeated actions. Interaction turns these individual outputs into relationships, population outcomes and the renewal of institutions.",
    contents: [{ id: "valuation", title: "State and experienced value" }, { id: "desire", title: "Desire, attachment and care" }, { id: "learning", title: "Time and learning" }, { id: "reasons", title: "Decisions and reasons" }, { id: "social", title: "Social action" }, { id: "joint-action", title: "From individuals to joint action" }],
    valuationClaim: "Changing biological state can change the weighting of reward and effort, and willingness to act, without a corresponding loss of ability.",
    valuation: "An action has a possible benefit, a likelihood of success, an effort cost and consequences for oneself and others. The external situation supplies some of these quantities; biological state contributes to their experienced weight. A person can still perform a task while becoming less willing to choose it. Conversely, a particular immediate reward can become more compelling while sustained effort becomes less attractive.",
    valuationStudies: "Westbrook combined dopamine synthesis imaging and drug interventions in cognitive-effort choices; effects depended on baseline synthesis capacity. Jurgelis manipulated sleep in 24 participants and found greater aversion to cognitive effort while the short physical-effort comparison did not change in the same way. Draper’s randomized inflammatory challenge reduced acceptance of high-effort options without a corresponding significant change in reward sensitivity. [[ref:westbrook2020_dopamine_effort|Westbrook 2020]]; [[ref:jurgelis2022_sleep_effort|Jurgelis 2022]]; [[ref:draper2018_inflammation_effort|Draper 2018]].",
    valuationImplication: "BERM explains changes in experienced priorities through measurable biological states. The same amount of time, money or effort can acquire a different weight. Stated lack of resources can therefore combine a real constraint with altered valuation. The parsimonious target is the joint pattern across choices, using shared state variables and task-specific consequences.",
    desireClaim: "Biological regulation of the reproductive axis participates in sexual motivation and neural processing of sexual stimuli.",
    desire: "Motivation to approach, readiness to respond, sexual arousal, attachment, wanting a child and caring for another organism are related outputs with different functions. Reproduction requires both opportunity and functional transitions. BERM accordingly includes the biological formation of initiative and responsiveness alongside the capacity to conceive and maintain a pregnancy.",
    desireStudies: "Finkelstein’s gonadal-suppression and hormone-replacement experiments separated testosterone and estradiol contributions to male sexual function. In Mills’s crossover trial, 32 men with low sexual desire completed both kisspeptin and placebo conditions; sexual-stimulus brain responses and penile tumescence changed without a significant measured testosterone change. The maximum tumescence increase was a physiological measure, not a percentage increase in desire. [[ref:finkelstein2013_gonadal_steroids|Finkelstein 2013]]; [[ref:mills2023_kisspeptin|Mills 2023]].",
    desireImplication: "The reproductive pathway has two coupled branches: whether an attempt occurs, and whether it succeeds. A biological shift can reach both. Desire for a child and a concrete attempt need their own observations and transition rules; the model can then explain how motivation, partner response, age and physiological capacity combine over time.",
    learningClaim: "Biological state changes feedback-learning weights and choice consistency, so a transient state can influence later action through learning.",
    learning: "The organism’s state affects the choice made today and the history from which tomorrow’s choices are learned. A reward, failure or social encounter can update expectations with a different weight under different states. Learned routines and changed opportunities can then carry an effect beyond the initial physiological episode.",
    learningStudies: "Lim compared a week of restricted sleep with a rested condition and found altered positive-feedback learning and more stochastic choices despite similar overall accuracy. Westbrook’s later dopamine study connects biological intervention to learning and effort-related choice within the broader RADBOUD-DA research program. Its 2020 and 2025 publications provide connected outcomes, not automatically independent replications. [[ref:lim2026_sleep_learning|Lim 2026]]; [[ref:westbrook2025_dopamine_learning|Westbrook 2025]].",
    learningImplication: "BERM carries state into the learning operator. The later persistence of a behavioral pattern can reside in learned values, a missed encounter or a changed relationship. An acute hormone change does not have to remain physically unchanged for years to have a lasting consequence.",
    learningEquation: "L is the accumulated learning state, feedback is the experienced outcome and S is the biological state during updating. The equation specifies a model connection; its parameters are estimated for the actual task and data.",
    reasonsClaim: "An expressed reason is an observation of the decision process and can also be produced for an unnoticed change of choice outcome; it does not by itself identify motivation’s causal origin.",
    reasons: "A person reasons from what appears desirable, feasible, threatening or costly. If biology changes those weights, a coherent explanation can change with them. The experienced reason is itself part of the event to explain. BERM therefore follows state into valuation, deliberation, action and the account a person gives of that action.",
    reasonsStudies: "Johansson covertly changed the outcome of a face choice; participants sometimes justified the substituted outcome without detecting the mismatch. Eisenegger randomized testosterone administration and measured participants’ later beliefs about the administered substance. Drug assignment and reported belief showed different associations with offers; only drug assignment was randomized. [[ref:johansson2005_choice_blindness|Johansson 2005]]; [[ref:eisenegger2010_testosterone_fairness|Eisenegger 2010]].",
    reasonsImplication: "An articulate explanation is not automatically an independent upstream cause. It can express a biologically shifted motivation and can subsequently become a remembered commitment or guide for action. Deliberation and learning remain functions of the biological system. This structure does not require every reason to be post hoc or every external constraint to be imagined.",
    socialClaim: "Neuromodulation and a nutritional intervention change the weights of measured social choices, including harm avoidance and rejection of unfair offers.",
    social: "Cooperation, withdrawal, fairness and care require organisms to value outcomes for themselves and others. A social endpoint therefore continues the biological explanation. The next question is which decision weight changed, in which setting, and how the resulting action changes another person’s environment.",
    socialStudies: "Crockett’s two randomized drug experiments changed how money was weighed against pain to oneself or another person: serotonergic and dopaminergic interventions produced different patterns. Strang’s randomized crossover breakfast study changed costly rejection of unfair offers. Tyrosine was a measured candidate mediator, not separately randomized. Ben Simon’s sleep study connected sleep loss to willingness to help; its donation analysis used a separate aggregate dataset. [[ref:crockett2015_harm_aversion|Crockett 2015]]; [[ref:strang2017_nutrition_decisions|Strang 2017]]; [[ref:bensimon2022_sleep_helping|Ben Simon 2022]].",
    socialImplication: "Biological state contributes to social preferences through concrete choices. To reach institutions, BERM composes those choices across people, networks and repeated time steps. The intermediate quantities are participation, effort, trust-bearing actions, sanctioning and withdrawal, each attached to a measured or explicitly modeled outcome.",
    jointClaim: "A biological intervention directed at one interaction partner can change the other partner’s behavior and physiological responses during their interaction.",
    joint: "Joint action needs initiative, a responding partner and temporal overlap. A change in either person alters the pair’s probability of success. Across a population, small changes can accumulate through repeated encounters and thresholds: who meets, who responds, which cooperation succeeds and which relationships continue.",
    jointStudies: "Weisman administered oxytocin to fathers and measured father–infant interaction; changes appeared in infant behavior and physiological responses as well as in fathers. In a separate school-network experiment, Paluck showed that the placement of participating students in the network mattered for changes in community conflict reports. The first study locates an acute interpersonal transition; the second locates propagation through a social network. [[ref:weisman2012_oxytocin_dyad|Weisman 2012]]; [[ref:paluck2016_network_conflict|Paluck 2016]].",
    jointImplication: "A biologically changed action becomes part of another organism’s input. Repeated across a network, this creates changes in the distribution of opportunities and actions. Institutions persist through those actions and their stored consequences; their rules and technologies feed back into later biological and material environments.",
    synthesisTitle: "One state, several connected consequences",
    synthesisClaim: "BERM derives physiological and behavioral outputs from a shared time-dependent biological state; the field-to-state coupling is the separately specified upstream step of the chain.",
    equationMeaning: "This proposed BERM composition separates success probability p, experienced benefit B, effort E, harm H and external cost C. Their weights depend on biological state S; L denotes learning history. Choice probabilities depend on the resulting values V. Shared states constrain several outputs together; the expressions become quantitative only when their variables and coefficients are tied to a particular dataset.",
    reproduction: "For an intentional reproductive attempt, birth probability composes initiation, conception conditional on the attempt, and live birth conditional on conception. The chain uses conditional probabilities rather than an independence assumption. Total births also include pregnancies that begin without an intentional attempt. Pair distributions and the life-course calendar carry both branches into population outcomes.",
    links: [
      { href: "/behavior/reproductive-regulation", title: "Reproductive regulation", description: "Motivation, physiological capacity and caregiving, joined through measured biological and social transitions." },
      { href: "/modulome/brain", title: "Brain mechanisms", description: "The receptor, electrical and chemical systems behind the behavioral continuation." },
      { href: "/model/biological-coordination", title: "State and coordination", description: "Hormone responsiveness, tissue timing and the history of the receiving system." },
      { href: "/evidence/reproductive-arc", title: "Reproductive transitions", description: "From functional gates to couples, waiting times and realised births." },
      { href: "/evidence/convergence", title: "How the studies connect", description: "Seven research connections from reception to valuation and collective outcomes." },
      { href: "/civilization/pathopolites", title: "The biological individual", description: "Read the existing individual-level civilization essay alongside this mechanism." },
      { href: "/ecology", title: "Behavior across organisms", description: "The parallel route through mating, pollination and ecological interaction." },
    ],
    next: { href: "/civilization", title: "From actions to civilization", description: "Follow individual distributions through pairs, networks, populations, institutions and historical feedback." },
  },
  fi: {
    title: "Biologiasta haluun ja toimintaan",
    subtitle: "Miten biologinen tila muuttuu koetuksi arvoksi, motivaatioksi, päätöksiksi, perusteluiksi ja vuorovaikutukseksi.",
    lead: "BERM sijoittaa motivaation muodostumisen biologiseen ketjuun. Hormonaalinen ja neuraalinen tila osallistuvat siihen, mikä kiinnittää huomion, palkitsee ja tuntuu vaivan arvoiselta. Harkinta toimii näiden koettujen arvojen pohjalta. Malli selittää siten sekä sitä, mihin ihminen kykenee, että sitä, mitä hän haluaa, valitsee ja perustelee tekevänsä.",
    incoming: "Biologia-osan vastaanottava, hormonaalinen ja neuraalinen tila: hormonien vaikuttavuus, ajoitus, energia sekä redox- ja sähköinen toiminta. Niiden EMF-peräinen muutos tulee ketjuun fysikaalisen vastaanottokytkennän kautta.",
    outgoing: "Aloitteiden, vastausten, valintojen ja toistuvien tekojen jakauma. Vuorovaikutus muuttaa yksilöiden ulostulot suhteiksi, väestötuloksiksi ja instituutioiden uusintamiseksi.",
    contents: [{ id: "valuation", title: "Tila ja koettu arvo" }, { id: "desire", title: "Halu, kiintymys ja hoiva" }, { id: "learning", title: "Aika ja oppiminen" }, { id: "reasons", title: "Päätös ja perustelu" }, { id: "social", title: "Sosiaalinen toiminta" }, { id: "joint-action", title: "Yksilöstä yhteiseen toimintaan" }],
    valuationClaim: "Biologiseen tilaan puuttuminen voi muuttaa palkkion ja vaivan painottamista sekä halukkuutta toimia ilman vastaavaa kyvykkyyden heikkenemistä.",
    valuation: "Toiminnolla on mahdollinen hyöty, onnistumisen todennäköisyys, vaivan kustannus ja seurauksia itselle sekä muille. Ulkoinen tilanne antaa osan näistä suureista; biologinen tila osallistuu niiden koettuun painoon. Ihminen voi edelleen suoriutua tehtävästä mutta valita sen aiempaa harvemmin. Tietty välitön palkkio voi puolestaan houkutella enemmän samalla, kun pitkäjänteinen vaivannäkö houkuttelee vähemmän.",
    valuationStudies: "Westbrook yhdisti dopamiinisynteesin kuvantamisen ja lääkeinterventiot kognitiivisen työn valintoihin; vaikutukset riippuivat lähtötason synteesikapasiteetista. Jurgelis manipuloi 24 osallistujan unta ja havaitsi kognitiivisen vaivan välttämisen kasvua lyhyen fyysisen työn vertailun muuttumatta samalla tavalla. Draperin satunnaistettu tulehdushaaste vähensi vaativiin vaihtoehtoihin suostumista ilman vastaavaa merkitsevää palkkioherkkyyden muutosta. [[ref:westbrook2020_dopamine_effort|Westbrook 2020]]; [[ref:jurgelis2022_sleep_effort|Jurgelis 2022]]; [[ref:draper2018_inflammation_effort|Draper 2018]].",
    valuationImplication: "BERM selittää koettujen tärkeysjärjestysten muutoksia mitattavilla biologisilla tiloilla. Sama ajan, rahan tai vaivan määrä voi saada erilaisen painon. Kerrottu resurssien riittämättömyys voi siksi yhdistää todellisen rajoitteen ja muuttuneen arvottamisen. Parsimoninen selityskohde on valintojen yhteinen vaikutuskuvio, jonka muodostavat jaetut tilamuuttujat ja tehtäväkohtaiset seuraukset.",
    desireClaim: "Lisääntymisakselin biologinen säätely osallistuu seksuaaliseen motivaatioon ja seksuaalisten ärsykkeiden neuraaliseen käsittelyyn.",
    desire: "Motivaatio lähestyä, valmius vastata, seksuaalinen virittyminen, kiintymys, lapsitoive ja toisen eliön hoiva ovat toisiinsa liittyviä ulostuloja, joilla on eri tehtävät. Lisääntyminen tarvitsee sekä mahdollisuuden että toiminnalliset siirtymät. BERM sisällyttää siksi aloitteisuuden ja vastaanottavuuden biologisen muodostumisen hedelmöittymis- ja raskaudenylläpitokyvyn rinnalle.",
    desireStudies: "Finkelsteinin sukuhormonituotannon vaimennus- ja korvauskokeet erottivat testosteronin ja estradiolin osuuksia miehen seksuaalisessa toiminnassa. Millsin vaihtovuorokokeessa 32 heikosta seksuaalisesta halusta kärsivää miestä suoritti sekä kisspeptiini- että lumejakson; seksuaalisten ärsykkeiden aivovasteet ja peniksen tumessenssi muuttuivat ilman merkitsevää mitattua testosteronimuutosta. Tumessenssin suurin kasvu oli fysiologinen mittari, ei halun prosentuaalinen kasvu. [[ref:finkelstein2013_gonadal_steroids|Finkelstein 2013]]; [[ref:mills2023_kisspeptin|Mills 2023]].",
    desireImplication: "Lisääntymisreitti haarautuu kahteen kytkeytyvään osaan: tapahtuuko yritys ja onnistuuko se. Biologinen muutos voi ulottua molempiin. Lapsitoive ja konkreettinen yritys tarvitsevat omat havaintonsa ja siirtymäsääntönsä; niiden avulla malli selittää motivaation, kumppanin vastauksen, iän ja fysiologisen kyvyn yhdistymisen ajassa.",
    learningClaim: "Biologinen tila muuttaa palauteoppimisen painoja ja valintojen johdonmukaisuutta, jolloin hetkellinen tila voi vaikuttaa myöhempään toimintaan oppimisen kautta.",
    learning: "Eliön tila vaikuttaa tämän päivän valintaan ja historiaan, jonka perusteella huomisen valinnat opitaan. Palkkio, epäonnistuminen tai sosiaalinen kohtaaminen voi päivittää odotuksia eri painolla eri tiloissa. Opitut toimintatavat ja muuttuneet mahdollisuudet voivat tämän jälkeen kantaa vaikutusta alkuperäistä fysiologista jaksoa pidemmälle.",
    learningStudies: "Lim vertasi viikon univajetta levänneeseen tilanteeseen ja havaitsi muuttunutta myönteisestä palautteesta oppimista sekä satunnaisempia valintoja kokonaistarkkuuden pysyessä samankaltaisena. Westbrookin myöhempi dopamiinitutkimus liittää biologisen intervention oppimiseen ja vaivan valintoihin laajemmassa RADBOUD-DA-tutkimusohjelmassa. Sen vuosien 2020 ja 2025 julkaisut tuottavat yhdistyviä ulostuloja, eivät automaattisesti riippumattomia toistoja. [[ref:lim2026_sleep_learning|Lim 2026]]; [[ref:westbrook2025_dopamine_learning|Westbrook 2025]].",
    learningImplication: "BERM vie tilan oppimisoperaattoriin. Käyttäytymiskuvion myöhempi jatkuvuus voi olla opituissa arvoissa, väliin jääneessä kohtaamisessa tai muuttuneessa suhteessa. Akuutin hormonimuutoksen ei tarvitse säilyä sellaisenaan vuosia, jotta sen seuraus kestäisi pitkään.",
    learningEquation: "L on kertynyt oppimistila, palaute koettu tulos ja S biologinen tila päivityksen aikana. Yhtälö määrittelee mallin yhteyden; sen parametrit arvioidaan kyseistä tehtävää ja aineistoa varten.",
    reasonsClaim: "Ilmaistu perustelu on havainto päätösprosessista ja voi syntyä myös huomaamatta muutetulle valinnan lopputulokselle; se ei yksin tunnista motivaation kausaalista alkuperää.",
    reasons: "Ihminen päättelee siitä, mikä näyttää toivottavalta, mahdolliselta, uhkaavalta tai kalliilta. Jos biologia muuttaa näitä painoja, johdonmukainen perustelu voi muuttua niiden mukana. Koettu syy kuuluu itse selitettävään tapahtumaan. BERM seuraa siksi tilaa arvottamiseen, harkintaan, tekoon ja ihmisen teostaan antamaan kuvaukseen.",
    reasonsStudies: "Johansson vaihtoi huomaamatta kasvokuvavalinnan lopputulosta; osallistujat perustelivat toisinaan vaihdettua lopputulosta havaitsematta ristiriitaa. Eisenegger satunnaisti testosteronin annon ja mittasi myöhemmin osallistujien uskomuksen saadusta aineesta. Annettu aine ja kerrottu uskomus liittyivät erilaisiin tarjouksiin; vain aine oli satunnaistettu. [[ref:johansson2005_choice_blindness|Johansson 2005]]; [[ref:eisenegger2010_testosterone_fairness|Eisenegger 2010]].",
    reasonsImplication: "Sanallisesti vakuuttava selitys ei automaattisesti ole itsenäinen alkusyy. Se voi ilmaista biologisesti muuttunutta motivaatiota ja myöhemmin muodostua muistetuksi sitoumukseksi tai toimintaohjeeksi. Harkinta ja oppiminen pysyvät biologisen järjestelmän toimintoina. Rakenne ei edellytä kaikkien perustelujen jälkikäteisyyttä tai ulkoisten rajoitteiden kuvitteellisuutta.",
    socialClaim: "Neuromodulaatio ja ravitsemusinterventio muuttavat mitattujen sosiaalisten valintojen painoja, kuten haitan välttämistä ja epäreilun tarjouksen hylkäämistä.",
    social: "Yhteistyö, vetäytyminen, oikeudenmukaisuus ja hoiva edellyttävät eliöiltä omien ja toisten tulosten arvottamista. Sosiaalinen päätepiste jatkaa siksi biologista selitystä. Seuraavaksi määritellään, mikä päätöspaino muuttui, missä tilanteessa ja miten syntyvä teko muuttaa toisen ihmisen ympäristöä.",
    socialStudies: "Crockettin kaksi satunnaistettua lääkekoetta muuttivat rahan painottamista suhteessa itselle tai toiselle koituvaan kipuun: serotoninerginen ja dopaminerginen interventio tuottivat erilaiset kuviot. Strangin satunnaistettu aamiaisten vaihtovuorokoe muutti epäreilujen tarjousten kustannuksellista hylkäämistä. Tyrosiini oli mitattu välittäjäehdokas, ei erikseen satunnaistettu. Ben Simonin unikoe yhdisti univajeen auttamishaluun; lahjoitusanalyysi käytti erillistä aggregaattiaineistoa. [[ref:crockett2015_harm_aversion|Crockett 2015]]; [[ref:strang2017_nutrition_decisions|Strang 2017]]; [[ref:bensimon2022_sleep_helping|Ben Simon 2022]].",
    socialImplication: "Biologinen tila osallistuu sosiaalisiin mieltymyksiin konkreettisten valintojen kautta. Instituutioihin päästäkseen BERM yhdistää valinnat ihmisten, verkostojen ja toistuvien aika-askelten yli. Välisuureita ovat osallistuminen, vaivannäkö, luottamusta rakentavat teot, rankaiseminen ja vetäytyminen, joista kukin liitetään mitattuun tai eksplisiittisesti mallinnettuun tulokseen.",
    jointClaim: "Yhteen vuorovaikutuskumppaniin kohdistuva biologinen interventio voi muuttaa myös toisen osapuolen käyttäytymistä ja fysiologisia vasteita vuorovaikutuksen aikana.",
    joint: "Yhteinen toiminta tarvitsee aloitteen, vastaavan kumppanin ja ajallisen päällekkäisyyden. Kumman tahansa muutos vaikuttaa parin onnistumisen todennäköisyyteen. Populaatiossa pienet muutokset voivat kasautua toistuvissa kohtaamisissa ja kynnyksissä: ketkä tapaavat, kuka vastaa, mikä yhteistyö onnistuu ja mitkä suhteet jatkuvat.",
    jointStudies: "Weisman antoi oksitosiinia isille ja mittasi isän ja vauvan vuorovaikutusta; muutoksia ilmeni isien lisäksi vauvojen käyttäytymisessä ja fysiologisissa vasteissa. Erillisessä kouluverkostokokeessa Paluck osoitti osallistuvien oppilaiden verkostosijainnin merkityksen yhteisön konfliktiraporttien muutokselle. Ensimmäinen koe paikantaa akuutin henkilöiden välisen siirtymän, toinen sosiaalisen verkoston välityksen. [[ref:weisman2012_oxytocin_dyad|Weisman 2012]]; [[ref:paluck2016_network_conflict|Paluck 2016]].",
    jointImplication: "Biologisesti muuttunut teko tulee osaksi toisen eliön syötettä. Verkostossa toistuminen muuttaa mahdollisuuksien ja tekojen jakaumaa. Instituutiot jatkuvat näiden tekojen ja niiden varastoituvien seurausten kautta; niiden säännöt ja teknologiat vaikuttavat takaisin myöhempiin biologisiin ja materiaalisiin oloihin.",
    synthesisTitle: "Yksi tila, useita yhdistyviä seurauksia",
    synthesisClaim: "BERM johtaa yhteisestä ajallisesta biologisesta tilasta fysiologisia ja käyttäytymisen ulostuloja; kentästä tilaan johtava kytkentä on ketjun erikseen määriteltävä alkuvaihe.",
    equationMeaning: "Ehdotettu BERM-yhdistelmä erottaa onnistumistodennäköisyyden p, koetun hyödyn B, vaivan E, haitan H ja ulkoisen kustannuksen C. Niiden painot riippuvat biologisesta tilasta S; L kuvaa oppimishistoriaa. Valinnan todennäköisyydet riippuvat syntyvistä arvoista V. Yhteiset tilat rajaavat useita ulostuloja yhdessä; esitys muuttuu määrälliseksi, kun muuttujat ja kertoimet sidotaan nimettyyn aineistoon.",
    reproduction: "Tarkoituksellisen lisääntymisyrityksen tapauksessa syntymän todennäköisyys yhdistää aloittamisen, hedelmöittymisen yrityksen ehdolla ja elävän syntymän hedelmöittymisen ehdolla. Ketju käyttää ehdollisia todennäköisyyksiä eikä oleta riippumattomuutta. Kaikki syntymät sisältävät lisäksi ilman tarkoituksellista yritystä alkaneet raskaudet. Parijakaumat ja elämänkulun kalenteri vievät molemmat haarat väestötuloksiin.",
    links: [
      { href: "/behavior/reproductive-regulation", title: "Lisääntymisen säätely", description: "Motivaatio, fysiologinen kapasiteetti ja hoiva mitattujen biologisten ja sosiaalisten siirtymien kautta." },
      { href: "/modulome/brain", title: "Aivojen mekanismit", description: "Käyttäytymiseen jatkuvan ketjun vastaanottimet sekä sähköiset ja kemialliset järjestelmät." },
      { href: "/model/biological-coordination", title: "Tila ja koordinaatio", description: "Hormonien vaikuttavuus, kudosten ajoitus ja vastaanottavan järjestelmän historia." },
      { href: "/evidence/reproductive-arc", title: "Lisääntymisen siirtymät", description: "Toiminnallisista porteista pareihin, odotusaikoihin ja toteutuneisiin syntymiin." },
      { href: "/evidence/convergence", title: "Tutkimusten yhteydet", description: "Seitsemän tutkimusyhteyttä vastaanotosta arvottamiseen ja yhteisiin tuloksiin." },
      { href: "/civilization/pathopolites", title: "Biologinen yksilö", description: "Nykyinen yksilötason sivilisaatioessee tämän mekanismin rinnalla." },
      { href: "/ecology", title: "Eliöiden käyttäytyminen", description: "Rinnakkainen reitti parittelun, pölytyksen ja ekologisten vuorovaikutusten kautta." },
    ],
    next: { href: "/civilization", title: "Teoista sivilisaatioon", description: "Seuraa yksilöjakaumia pareihin, verkostoihin, väestöön, instituutioihin ja historialliseen palautteeseen." },
  },
  ja: {}, fr: {}, ko: {},
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as typeof COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function BehaviorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as typeof COPY.en;
  const p = (text: string) => <ExplanationText locale={locale}>{text}</ExplanationText>;
  return <ExplanationHub locale={locale} copy={COPY} {...d} icon={Brain} stage="behavior">
    <ExplanationSection {...d.contents[0]}><p className="text-lg font-medium leading-8"><ClaimRef claimId="claim.behavior.state-dependent-valuation">{d.valuationClaim}</ClaimRef></p>{p(d.valuation)}<ResearchConnection locale={locale} studies={d.valuationStudies} implication={d.valuationImplication} /></ExplanationSection>
    <section id={d.contents[1].id} className="scroll-mt-28 space-y-5 border-t editorial-rule pt-7">
      <header className={styles.hero} aria-labelledby="desire-title">
        <Image src="/images/desire-attachment-care-hero-v2.png" alt="" fill sizes="(min-width: 1280px) 856px, (min-width: 1024px) calc(100vw - 296px), 100vw" loading="eager" className={styles.artwork} />
        <div className={styles.veil} aria-hidden="true" />
        <div className={styles.copy}>
          <h2 id="desire-title" className={styles.title}>{d.contents[1].title}</h2>
          <p className={styles.deck}><ClaimRef claimId="claim.behavior.sexual-motivation">{d.desireClaim}</ClaimRef></p>
          <div className={styles.lead}>{p(d.desire)}</div>
        </div>
      </header>
      <ResearchConnection locale={locale} studies={d.desireStudies} implication={d.desireImplication} />
      <TestosteroneCalibrationSummary locale={locale} />
    </section>
    <ReproductiveRegulationIntegration locale={locale} context="behavior" />
    <SteroidogenesisIntegrationPanel locale={locale} focus="behavior" />
    <ExplanationSection {...d.contents[2]}><p className="text-lg font-medium leading-8"><ClaimRef claimId="claim.behavior.state-dependent-learning">{d.learningClaim}</ClaimRef></p>{p(d.learning)}<ResearchConnection locale={locale} studies={d.learningStudies} implication={d.learningImplication} /><MathBlock tex={String.raw`L_{t+1}=\mathcal U(L_t,\mathrm{feedback};S_t)`} />{p(d.learningEquation)}</ExplanationSection>
    <ExplanationSection {...d.contents[3]}><p className="text-lg font-medium leading-8"><ClaimRef claimId="claim.behavior.reported-reasons">{d.reasonsClaim}</ClaimRef></p>{p(d.reasons)}<ResearchConnection locale={locale} studies={d.reasonsStudies} implication={d.reasonsImplication} /></ExplanationSection>
    <section id={d.contents[4].id} className="scroll-mt-28 space-y-5 border-t editorial-rule pt-7">
      <header className={styles.hero} aria-labelledby="social-title">
        <Image src="/images/social-behavior-hero-fi-v2.png" alt="" fill sizes="(min-width: 1280px) 856px, (min-width: 1024px) calc(100vw - 296px), 100vw" className={`${styles.artwork} ${socialStyles.artwork}`} />
        <div className={styles.veil} aria-hidden="true" />
        <div className={`${styles.copy} ${socialStyles.copy}`}>
          <h2 id="social-title" className={styles.title}>{d.contents[4].title}</h2>
          <p className={styles.deck}><ClaimRef claimId="claim.behavior.social-valuation">{d.socialClaim}</ClaimRef></p>
          <div className={styles.lead}>{p(d.social)}</div>
        </div>
      </header>
      <ResearchConnection locale={locale} studies={d.socialStudies} implication={d.socialImplication} />
    </section>
    <ExplanationSection {...d.contents[5]}><p className="text-lg font-medium leading-8"><ClaimRef claimId="claim.behavior.dyadic-propagation">{d.jointClaim}</ClaimRef></p>{p(d.joint)}<ResearchConnection locale={locale} studies={d.jointStudies} implication={d.jointImplication} />
      <EncounterWindowsIllustration locale={locale} variant="joint-action" />
      <div className="space-y-5 border-t editorial-rule pt-7"><h3 className="text-xl font-semibold">{d.synthesisTitle}</h3><p className="text-lg leading-8"><ClaimRef claimId="claim.behavior.biological-state-to-action">{d.synthesisClaim}</ClaimRef></p>
        <MathBlock tex={String.raw`V_j=p_j(S,L)B_j(S,L)-w_{E,j}(S)E_j-w_{H,j}(S)H_j-C_j`} />
        <MathBlock tex={String.raw`P(a=j)=\operatorname{softmax}_j\!\left(\beta(S)V_j\right)`} />{p(d.equationMeaning)}{p(d.reproduction)}
      </div>
    </ExplanationSection>
  <CombinedExposurePanel locale={locale} focus="pharmacology" />
      </ExplanationHub>;
}
