import { ClaimRef } from "@/components/ClaimRef";
import Link from "next/link";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    humanTitle: "Human sensory cues meet a changing receiver",
    humanIntro: "A cue is not its effect. Human experiments separate the incoming stimulus, the receiver’s state and the resulting response. BERM connects these stages instead of treating social contact or a reported preference as a complete explanation.",
    humanCards: [
      { title: "Infant odour and biological significance", text: "Unfamiliar newborn odour elicited reward-related brain responses in 15 first-time mothers and 15 nulliparous women; responses differed with maternal status. This is human sensory processing, rather than a measured desire to have children. [[ref:lundstrom2013_newborn_odor|Lundström 2013]]." },
      { title: "Touch and hormonal state change interaction", text: "In a placebo-controlled crossover experiment involving 35 fathers, oxytocin administration changed father–infant interaction and parallel infant responses. In another experiment, partner handholding reduced threat-related brain activation in 16 women. Social input and biological response are connected experimentally. [[ref:weisman2012_oxytocin_dyad|Weisman 2012]]; [[ref:coan2006_handholding|Coan 2006]]." },
      { title: "The same hormonal input, a different response", text: "Evening eReader light altered melatonin and circadian timing. Separately, eight women received the same kisspeptin dose in different menstrual phases: the LH response was strongest before ovulation. Light history and reproductive state therefore enter at distinct, measurable points. [[ref:chang2015_ipad_melatonin|Chang]]; [[ref:dhillo2007_kisspeptin_cycle|Dhillo 2007]]." },
    ],
    humanBridge: "BERM composition: field-dependent receiving state changes the weight of odour, touch and social signals. The model connects light–melatonin timing with kisspeptin–GnRH regulation and its measured LH output. The human field-to-reception link is an explicit conditional bridge; its magnitude is not supplied by these sensory experiments.",
    feedbackTitle: "A feedback path through everyday contact",
    feedbackSteps: ["Contact with infants", "Sensory input and learning", "Later interaction and contact"],
    feedbackText: "BERM carries this loop into reproductive motivation: changes in contact alter the cue stream and learning history, which influence subsequent interaction. The demographic extension is model composition. Infant odour is not assigned to an established human pheromone receptor.",
    interpreterTitle: "The interpreter: a reason does not identify its origin",
    interpreterLead: "Gazzaniga’s interpreter account describes how explanations are assembled from available information. His split-brain example involves a patient explaining a shovel choice without verbal access to the snow scene that prompted it. [[ref:gazzaniga2000|Gazzaniga 2000, review]].",
    interpreterExperiments: "Johansson’s participants sometimes justified a secretly substituted face choice. Desmurget’s direct cortical stimulation dissociated movement intention, movement and awareness in seven surgical patients. These interventions locate limits of introspective access; they do not make every reported reason a post-hoc account. [[ref:johansson2005_choice_blindness|Johansson 2005]]; [[ref:desmurget2009_movement_intention|Desmurget 2009]].",
    pewLabel: "A reported major reason",
    pewText: "In Pew’s 2024 survey, 57% of US adults aged 18–49 who had no children and considered future parenthood unlikely said simply not wanting children was a major reason. This selected group contained 770 respondents. The percentage describes their answers, not all childless adults. [[ref:pew2024_childless_reasons|Pew 2024]].",
    interpreterConclusion: "BERM connects physical and biological state to valuation, experienced motivation and the reason subsequently reported. The report describes one stage of that chain; it does not identify the upstream state. The Pew percentage is not a biological diagnosis.",
    behaviorLink: "Biological state, valuation and reported reasons",
    syndromeTitle: "Syndrome fragmentation: eight comparison axes",
    syndromeIntro: "A shared receiving state can express itself through several functions. If each outcome is analysed under a different social label, the joint pattern disappears. BERM uses the following cross-species mapping to keep those functions together.",
    mappingStatus: "BERM model mapping · component-specific evidence",
    animal: "Animal function",
    human: "Human measure",
    proxy: "Conventional explanatory label",
    shared: "What BERM integrates",
    axes: [
      { animal: "Allocation of caregiving", human: "Caregiving time; infant and pet contact", proxy: "Pet parenting; family lifestyle", shared: "Cue salience, attachment and available effort. Pet care alone does not demonstrate displaced reproduction." },
      { animal: "Dispersal and social proximity", human: "Contact frequency; isolation; household moves", proxy: "Atomisation; urbanisation", shared: "Social reward, perceived threat and the opportunities for contact." },
      { animal: "Stress response", human: "Cortisol dynamics; threat responses; anxiety measures", proxy: "Work pressure; insecurity", shared: "Stress physiology and the receiving state in which the same challenge is encountered." },
      { animal: "Courtship and sexual motivation", human: "Desire scales; sexual activity; partnership formation", proxy: "Sex recession; screen time", shared: "Hormonal response, reward valuation and partner opportunities as distinct contributors." },
      { animal: "Production and reception of signals", human: "Responses to odour, voice and touch", proxy: "Dating culture; communication habits", shared: "Signal availability and receiver sensitivity without inferring pathology from gender expression." },
      { animal: "Social regulation of reproduction", human: "Norms, sanctions and support for parenthood", proxy: "Pronatalist or antinatalist views", shared: "How social feedback alters costs, contact and later choices. A belief is not a clinical marker." },
      { animal: "Hormonal reorganisation", human: "Hormone dynamics and reproductive function", proxy: "Age; lifestyle", shared: "Hormone levels, receptor responsiveness and timing. Paternal adaptation and reproductive impairment are different outcomes." },
      { animal: "Risk, exploration and effort", human: "Risk choices; effort tasks; everyday mobility", proxy: "Passivity; driving-licence trends", shared: "Energy, stress and reward weighting alongside money, policy and practical constraints." },
    ],
    syndromeEvidence: "Human component anchors include oxytocin-dependent interaction, sleep-related social withdrawal, kisspeptin-sensitive sexual responses, fatherhood-associated hormonal change and dopamine-dependent effort choices. [[ref:weisman2012_oxytocin_dyad|Weisman 2012]]; [[ref:bensimon2018_sleep_social|Ben Simon 2018]]; [[ref:mills2023_kisspeptin|Mills 2023]]; [[ref:gettler2011_fatherhood_testosterone|Gettler 2011]]; [[ref:westbrook2020_dopamine_effort|Westbrook 2020]].",
    syndromeConclusion: "The eight rows are comparison axes, not a measured eight-part diagnosis or proof that population trends share one cause. BERM’s explanatory gain is to connect defined state variables with several outcomes while preserving each mechanism, context and individual difference.",
  },
  fi: {
    humanTitle: "Ihmiselläkin aistivihje kohtaa muuttuvan vastaanottajan",
    humanIntro: "Vihje ja sen vaikutus ovat eri asioita. Ihmiskokeet erottavat saapuvan ärsykkeen, vastaanottajan tilan ja syntyvän vasteen. BERM yhdistää nämä vaiheet sen sijaan, että sosiaalinen kontakti tai kerrottu mieltymys kattaisi koko selityksen.",
    humanCards: [
      { title: "Vauvanhaju ja biologinen merkitys", text: "Vieraan vastasyntyneen haju synnytti palkkioihin liittyviä aivovasteita 15 ensisynnyttäjällä ja 15 synnyttämättömällä naisella; vasteet erosivat äitiystilan mukaan. Kyse on ihmisen aistinkäsittelystä, ei mitatusta halusta saada lapsia. [[ref:lundstrom2013_newborn_odor|Lundström 2013]]." },
      { title: "Kosketus ja hormonitila muuttavat vuorovaikutusta", text: "Lumekontrolloidussa vaihtovuorokokeessa oksitosiinin anto 35 isälle muutti isän ja vauvan vuorovaikutusta sekä vauvan rinnakkaisia vasteita. Toisessa kokeessa kumppanin kädestä pitäminen vähensi uhkaan liittyvää aivoaktivaatiota 16 naisella. Sosiaalinen syöte ja biologinen vaste kytkeytyvät siis kokeellisesti. [[ref:weisman2012_oxytocin_dyad|Weisman 2012]]; [[ref:coan2006_handholding|Coan 2006]]." },
      { title: "Sama hormonisyöte, erilainen vaste", text: "Lukulaitteen iltavalo muutti melatoniinia ja vuorokausiajoitusta. Erillisessä kokeessa kahdeksan naista sai saman kisspeptiiniannoksen kuukautiskierron eri vaiheissa: LH-vaste oli voimakkain ennen ovulaatiota. Valohistoria ja lisääntymistila tulevat ketjuun eri, mitattavista kohdista. [[ref:chang2015_ipad_melatonin|Chang]]; [[ref:dhillo2007_kisspeptin_cycle|Dhillo 2007]]." },
    ],
    humanBridge: "BERM:n kokoaminen: kentästä riippuva vastaanottotila muuttaa hajun, kosketuksen ja sosiaalisten signaalien painoa. Malli yhdistää valo–melatoniiniajoituksen kisspeptiini–GnRH-säätelyyn ja sen mitattuun LH-ulostuloon. Ihmisen kenttä–vastaanottoyhteys on nimetty ehdollinen liitos; nämä aistikokeet eivät anna sen vaikutuskokoa.",
    feedbackTitle: "Palautereitti arjen kontaktien kautta",
    feedbackSteps: ["Kontakti vauvoihin", "Aistisyöte ja oppiminen", "Myöhempi vuorovaikutus ja kontakti"],
    feedbackText: "BERM jatkaa tämän silmukan lisääntymismotivaatioon: kontaktien muutos muuttaa vihjevirtaa ja oppimishistoriaa, jotka vaikuttavat seuraavaan vuorovaikutukseen. Väestötason jatko on mallin kokoamista. Vauvanhajua ei kohdisteta vahvistettuun ihmisen feromonireseptoriin.",
    interpreterTitle: "Tulkkimekanismi: kerrottu syy ei yksilöi alkuperäänsä",
    interpreterLead: "Gazzanigan tulkkiselitys kuvaa perustelujen kokoamista saatavilla olevasta tiedosta. Hänen halkaistujen aivojen potilasesimerkissään lapion valinnalle annettiin selitys ilman puhuvan aivopuoliskon pääsyä valinnan synnyttäneeseen lumimaisemaan. [[ref:gazzaniga2000|Gazzaniga 2000, katsaus]].",
    interpreterExperiments: "Johanssonin osallistujat perustelivat toisinaan huomaamatta vaihdettua kasvokuvavalintaa. Desmurget’n suora aivokuoristimulaatio erotti liikeaikomuksen, liikkeen ja tietoisuuden seitsemällä leikkauspotilaalla. Interventiot paikantavat itsehavainnoinnin rajoja; ne eivät tee kaikista kerrotuista syistä jälkikäteisiä selityksiä. [[ref:johansson2005_choice_blindness|Johansson 2005]]; [[ref:desmurget2009_movement_intention|Desmurget 2009]].",
    pewLabel: "Ilmoitettu merkittävä syy",
    pewText: "Pew’n vuoden 2024 kyselyssä 57 % lapsettomista 18–49-vuotiaista yhdysvaltalaisista, jotka pitivät tulevaa vanhemmuuttaan epätodennäköisenä, nimesi merkittäväksi syyksi sen, ettei vain halua lapsia. Rajatussa ryhmässä oli 770 vastaajaa. Osuus kuvaa heidän vastauksiaan, ei kaikkia lapsettomia. [[ref:pew2024_childless_reasons|Pew 2024]].",
    interpreterConclusion: "BERM yhdistää fysikaalisen ja biologisen tilan arvottamiseen, koettuun motivaatioon sekä sen jälkeen kerrottuun syyhyn. Raportti kuvaa ketjun yhtä vaihetta; se ei yksilöi aiempaa tilaa. Pew’n prosenttiosuus ei ole biologinen diagnoosi.",
    behaviorLink: "Biologinen tila, arvottaminen ja kerrotut syyt",
    syndromeTitle: "Syndrooman fragmentaatio: kahdeksan vertailuakselia",
    syndromeIntro: "Yhteinen vastaanottotila voi ilmetä useassa toiminnossa. Jos kukin seuraus analysoidaan eri sosiaalisen nimikkeen alla, yhteinen kuvio katoaa. BERM käyttää seuraavaa lajienvälistä karttaa näiden toimintojen pitämiseksi samassa tarkastelussa.",
    mappingStatus: "BERM:n mallikartta · näyttö osamekanismeista",
    animal: "Eläimen toiminto",
    human: "Ihmisen mittari",
    proxy: "Tavanomainen selitysnimike",
    shared: "Mitä BERM yhdistää",
    axes: [
      { animal: "Hoivapanoksen kohdistuminen", human: "Hoiva-aika; vauva- ja lemmikkikontakti", proxy: "Lemmikkivanhemmuus; perheen elämäntapa", shared: "Vihjeiden merkitys, kiintymys ja käytettävissä oleva vaiva. Lemmikkihoiva ei yksin osoita lisääntymisen korvautumista." },
      { animal: "Dispersaali ja sosiaalinen läheisyys", human: "Kontaktitiheys; eristyneisyys; muuttaminen", proxy: "Atomisaatio; kaupungistuminen", shared: "Sosiaalinen palkkioarvo, koettu uhka ja kontaktien mahdollisuudet." },
      { animal: "Stressivaste", human: "Kortisolidynamiikka; uhkavaste; ahdistusmittarit", proxy: "Työpaine; epävarmuus", shared: "Stressifysiologia ja vastaanottotila, jossa sama haaste kohdataan." },
      { animal: "Seurustelu ja seksuaalinen motivaatio", human: "Halumittarit; seksuaalinen aktiivisuus; parisuhteen muodostus", proxy: "Sex recession; ruutuaika", shared: "Hormonivaste, palkkioarvo ja kumppanimahdollisuudet erillisinä osatekijöinä." },
      { animal: "Signaalien tuotto ja vastaanotto", human: "Vasteet hajulle, äänelle ja kosketukselle", proxy: "Deittikulttuuri; vuorovaikutustavat", shared: "Signaalin saatavuus ja vastaanottajan herkkyys ilman sairauden päättelyä sukupuolen ilmaisusta." },
      { animal: "Lisääntymisen sosiaalinen säätely", human: "Normit, sanktiot ja vanhemmuuden tuki", proxy: "Pronatalistiset tai antinatalistiset näkemykset", shared: "Sosiaalisen palautteen vaikutus kustannuksiin, kontaktiin ja myöhempiin valintoihin. Näkemys ei ole kliininen merkki." },
      { animal: "Hormonaalinen uudelleenjärjestyminen", human: "Hormonidynamiikka ja lisääntymistoiminta", proxy: "Ikä; elintavat", shared: "Hormonitasot, reseptorivaste ja ajoitus. Isyyteen sopeutuminen ja lisääntymistoiminnan häiriö ovat eri seurauksia." },
      { animal: "Riski, tutkiminen ja vaivannäkö", human: "Riskivalinnat; vaivatehtävät; arkiliikkuvuus", proxy: "Passiivisuus; ajokorttitrendit", shared: "Energia, stressi ja palkkioiden painotus rahan, sääntöjen sekä käytännön rajoitteiden rinnalla." },
    ],
    syndromeEvidence: "Ihmisen osamekanismien ankkureita ovat oksitosiiniin liittyvä vuorovaikutus, univajeeseen liittyvä sosiaalinen vetäytyminen, kisspeptiiniherkät seksuaaliset vasteet, isyyteen liittyvä hormonimuutos ja dopamiinista riippuvat vaivavalinnat. [[ref:weisman2012_oxytocin_dyad|Weisman 2012]]; [[ref:bensimon2018_sleep_social|Ben Simon 2018]]; [[ref:mills2023_kisspeptin|Mills 2023]]; [[ref:gettler2011_fatherhood_testosterone|Gettler 2011]]; [[ref:westbrook2020_dopamine_effort|Westbrook 2020]].",
    syndromeConclusion: "Kahdeksan riviä ovat vertailuakseleita, eivät mitattu kahdeksanosainen diagnoosi tai osoitus väestötrendien yhteisestä syystä. BERM:n selityslisä syntyy määriteltyjen tilamuuttujien yhdistämisestä useisiin seurauksiin säilyttäen kunkin mekanismin, tilanteen ja yksilöeron.",
  },
};

type Props = { locale: string };
const PANEL = "my-6 min-w-0 space-y-5 rounded-xl border border-card-border bg-[var(--figure-bg)] p-4 sm:p-6";
const TEXT = "text-base leading-relaxed text-foreground-muted";

export function ProxyHumanSensoryEvidence({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  return <section aria-labelledby="proxy-human-sensory-title" className={PANEL}>
    <h3 id="proxy-human-sensory-title" className="font-serif text-2xl leading-snug">{c.humanTitle}</h3>
    <p className={TEXT}>{c.humanIntro}</p>
    <div className="space-y-4">
      {c.humanCards.map((card) => <div key={card.title} className="rounded-lg border border-card-border bg-background p-4">
        <h4 className="text-base font-semibold">{card.title}</h4>
        <p className={`mt-2 ${TEXT}`}><InlineReferenceText text={card.text} locale={locale} /></p>
      </div>)}
    </div>
    <p className="border-l-2 border-accent pl-4 text-base leading-relaxed">{c.humanBridge}</p>
    <div className="space-y-3">
      <h4 className="text-base font-semibold">{c.feedbackTitle}</h4>
      <ol className="grid gap-2 sm:grid-cols-3">
        {c.feedbackSteps.map((step, index) => <li key={step} className="flex min-w-0 items-center gap-2 rounded-lg border border-card-border bg-background p-3 text-sm leading-snug">
          <span>{step}</span>{index < 2 && <span aria-hidden="true" className="ml-auto shrink-0 text-accent"><span className="sm:hidden">↓</span><span className="hidden sm:inline">→</span></span>}
        </li>)}
      </ol>
      <p className={TEXT}>{c.feedbackText}</p>
    </div>
  </section>;
}

export function ProxyInterpreterEvidence({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  return <section aria-labelledby="proxy-interpreter-title" className={PANEL}>
    <h3 id="proxy-interpreter-title" className="font-serif text-2xl leading-snug">{c.interpreterTitle}</h3>
    <p className={TEXT}><InlineReferenceText text={c.interpreterLead} locale={locale} /></p>
    <p className={TEXT}><InlineReferenceText text={c.interpreterExperiments} locale={locale} /></p>
    <div className="rounded-lg border border-card-border bg-background p-4">
      <p className="text-sm font-medium text-foreground-muted">{c.pewLabel}</p>
      <p aria-hidden="true" className="my-2 font-serif text-4xl text-accent">57 %</p>
      <p className={TEXT}><InlineReferenceText text={c.pewText} locale={locale} /></p>
    </div>
    <p className="border-l-2 border-accent pl-4 text-base leading-relaxed">{c.interpreterConclusion}</p>
    <Link href={`/${locale}/behavior`} className="inline-block text-base text-accent underline decoration-dotted underline-offset-4">{c.behaviorLink} →</Link>
  </section>;
}

export function ProxySyndromeEvidence({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  return <section aria-labelledby="proxy-syndrome-title" className={PANEL}>
    <h3 id="proxy-syndrome-title" className="font-serif text-2xl leading-snug">{c.syndromeTitle}</h3>
    <p className={TEXT}><ClaimRef claimId="claim.proxy.behavioural-profile-integration">{c.syndromeIntro}</ClaimRef></p>
    <p className="text-sm font-semibold text-accent">{c.mappingStatus}</p>
    <ol className="divide-y divide-card-border rounded-lg border border-card-border bg-background">
      {c.axes.map((axis, index) => <li key={axis.animal} className="space-y-3 p-4">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="shrink-0 font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
          <h4 className="text-base font-semibold leading-snug"><span className="sr-only">{c.animal}: </span>{axis.animal}</h4>
        </div>
        <dl className="grid gap-3 text-sm leading-relaxed sm:grid-cols-2">
          <div><dt className="font-medium text-foreground">{c.human}</dt><dd className="text-foreground-muted">{axis.human}</dd></div>
          <div><dt className="font-medium text-foreground">{c.proxy}</dt><dd className="text-foreground-muted">{axis.proxy}</dd></div>
          <div className="border-l-2 border-accent/50 pl-3 sm:col-span-2"><dt className="font-medium text-foreground">{c.shared}</dt><dd className="text-foreground-muted">{axis.shared}</dd></div>
        </dl>
      </li>)}
    </ol>
    <p className={TEXT}><InlineReferenceText text={c.syndromeEvidence} locale={locale} /></p>
    <p className={TEXT}>{c.syndromeConclusion}</p>
  </section>;
}
