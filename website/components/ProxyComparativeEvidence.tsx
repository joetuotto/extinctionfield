import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

type Props = { locale: string };
type EvidenceStatus = "experiment" | "noDifference" | "association" | "model" | "outside" | "unexamined";

const COPY = {
  en: {
    translationTitle: "A shared mechanism makes animal evidence informative",
    translationLead: "A sperm cell does not acquire its energy supply or DNA repair from a country’s GDP. Conserved biology lets animal experiments identify components of a human mechanism. The strongest bridge compares the same process, exposure and outcome directly.",
    pairedTitle: "Human and dog sperm in the same experiment",
    pairedText: "Sumner and colleagues tested DEHP and PCB153, alone and together, in sperm from nine men and eleven dogs. Both species showed DNA-damage responses; combinations changed the response. This is direct evidence for a shared chemical-response component. [[ref:sumner2019_human_dog_sperm|Sumner 2019]]",
    translationCards: [
      { value: "71%", text: "Among 221 human toxicity events for 150 drugs selected for known human toxicity, at least one animal species showed concordant toxicity. This measures detection of human toxicities, not the chance that any animal result transfers. [[ref:olson2000_toxicity_concordance|Olson 2000]]" },
      { value: "RR 0.86", text: "For 62 selected therapies, a meta-analysis compared proportions of positive clinical and animal studies: pooled risk ratio 0.86 (95% CI 0.80–0.92). This supports informative translation; it is not an 86% replication probability. [[ref:ineichen2024_translation|Ineichen 2024]]" },
    ],
    transport: "Carry the evidence across species through a conserved target, a comparable internal exposure and the same endpoint. Then account for species and physiological state. These links give component studies evidential value without treating every animal finding as a human outcome.",
    quantitativeTitle: "Three published sperm trends, with their actual units",
    quantitativeLead: "Declines in human, dog and horse samples extend the question beyond human decisions. Each study measures a specific endpoint and population; the numbers below preserve those differences.",
    quantitativeHeaders: ["Population", "Period", "Measured change"],
    trends: [
      { population: "Humans: unselected Western subgroup", period: "1973–2011", result: "Sperm concentration 99.0 → 47.1 million/mL (−52.4%); 110 estimates in this subgroup.", source: "[[ref:levine2017_v2|Levine 2017]]" },
      { population: "Dogs: one UK breeding programme, 232 males", period: "1988–2014", result: "Progressive motility fell at reported rates of 2.5%/year in 1988–1998 and 1.2%/year in 2002–2014; breeding selection separated the periods.", source: "[[ref:lea2016|Lea 2016]]" },
      { population: "Horses: 230 estimates from 229 articles", period: "1984–2019", result: "Model-estimated progressive motility 63.69% → 42.35% (−33.51%); slope −0.610 percentage points/year.", source: "[[ref:harris2023|Harris 2023]]" },
    ],
    quantitativeClose: "These are measured semen trends, not matched field-dose measurements. Together they motivate a shared biological explanation; they do not yet identify which shared exposure caused the historical changes.",
    experimentTitle: "A historical trend and an experiment answer different questions",
    experimentTexts: [
      "In seven dogs, a 10-week phone-exposure protocol (1962–1966 MHz, two hours/day, five days/week) produced no significant semen change relative to baseline. Phones were on the chest; 0.96 W/kg was the manufacturer’s rating, not measured testicular exposure. [[ref:dong2022_dog_phone_semen|Dong 2022]]",
      "In eight stallions’ samples, a 2.4 GHz REAC device with electrodes immersed in the medium preserved DNA and acrosome integrity during 72 hours of cold storage; progressive motility did not improve. This tested the combined device intervention. [[ref:berlinguer2017_stallion_reac|Berlinguer 2017]]",
      "These results locate protocol-dependent responses. Neither experiment measures the historical exposure of the populations in the trend table.",
    ],
    matrixTitle: "Seven biological systems, seven explanatory paths",
    matrixLead: "A person’s decision about contraception, education or family formation is not a reproductive mechanism of the other six species. Material exposures cross that boundary: the selected studies include non-optical fields, light and chemicals. BERM connects such inputs to the organism’s state within one conditional framework.",
    matrixCaption: "Coverage of the named studies and the model’s composition; cells are not scores for a winning explanation.",
    columns: ["System / outcome", "RF / low-frequency fields", "Optical light", "Chemicals", "Climate / habitat", "Food / activity", "Personal family decisions", "BERM composition"],
    status: { experiment: "Experiment: the specified intervention altered the named response", noDifference: "Tested: no significant change under this protocol", association: "Association: exposure and outcome were observed together", model: "Model: a proposed explanatory connection", outside: "Outside scope: the organism’s own human family decision", unexamined: "Not examined by the studies selected here" },
    rows: [
      { name: "Human", outcome: "Sperm, circadian response; decisions contribute to birth rates.", source: "[[ref:iuliis2009|De Iuliis 2009]]; [[ref:chang2015_ipad_melatonin|Chang 2015]]; [[ref:sumner2019_human_dog_sperm|Sumner 2019]]" },
      { name: "Dog", outcome: "Chemical DNA response; no significant semen change in the phone protocol.", source: "[[ref:sumner2019_human_dog_sperm|Sumner 2019]]; [[ref:dong2022_dog_phone_semen|Dong 2022]]" },
      { name: "Horse", outcome: "RF + contact electrodes preserved DNA and acrosomes; motility did not improve.", source: "[[ref:berlinguer2017_stallion_reac|Berlinguer 2017]]" },
      { name: "Robin", outcome: "Magnetic orientation under radio-frequency noise.", source: "[[ref:engels2014|Engels 2014]]" },
      { name: "Honeybee", outcome: "Flower landing under manipulated electric fields.", source: "[[ref:mallinson2025_electric_pollution|Mallinson 2025]]" },
      { name: "Clawed frog", outcome: "Reproductive development under atrazine exposure.", source: "[[ref:hayes2010_atrazine_frogs|Hayes 2010]]" },
      { name: "Coral", outcome: "Spawning dates associated with artificial night light.", source: "[[ref:davies2023_coral_light|Davies 2023]]" },
    ],
    matrixClose: "A blank evidence cell does not mean no effect. Experimental cells concern the named outcome, not an entire population decline. Climate, food and chemicals remain material explanations across species; BERM’s common structure does not by itself rank their empirical contributions.",
  },
  fi: {
    translationTitle: "Yhteinen mekanismi tekee eläinnäytöstä merkityksellistä",
    translationLead: "Siittiön energiahuolto tai DNA:n korjaus eivät synny maan BKT:stä. Säilynyt biologia tekee eläinkokeista näyttöä myös ihmisen mekanismin osista. Vahvin silta vertaa samaa prosessia, altistusta ja vastetta suoraan.",
    pairedTitle: "Ihmisen ja koiran siittiöt samassa kokeessa",
    pairedText: "Sumnerin ryhmä tutki DEHP:tä ja PCB153:a erikseen ja yhdessä yhdeksän miehen ja yhdentoista koiran siittiöissä. Molemmilla lajeilla havaittiin DNA-vauriovasteita; yhdistelmät muuttivat vastetta. Tämä on suoraa näyttöä yhteisestä kemikaalivasteen osasta. [[ref:sumner2019_human_dog_sperm|Sumner 2019]]",
    translationCards: [
      { value: "71 %", text: "Ihmiselle toksisiksi todettujen 150 lääkkeen 221 toksisuushavainnosta 71 % vastasi vähintään yhden eläinlajin löydöstä. Luku mittaa ihmishaittojen tunnistamista, ei minkä tahansa eläinlöydöksen siirtymistodennäköisyyttä. [[ref:olson2000_toxicity_concordance|Olson 2000]]" },
      { value: "RR 0,86", text: "Valitun 62 hoidon meta-analyysi vertasi myönteisten kliinisten ja eläintutkimusten osuuksia: yhdistetty riskisuhde 0,86 (95 %:n luottamusväli 0,80–0,92). Tulos tukee eläinnäytön informaatioarvoa; se ei ole 86 %:n toistumistodennäköisyys. [[ref:ineichen2024_translation|Ineichen 2024]]" },
    ],
    transport: "Yhdistä lajien näyttö säilyneen kohteen, vertailukelpoisen sisäisen altistuksen ja saman päätemuuttujan kautta. Huomioi sen jälkeen laji ja fysiologinen tila. Näin komponenttitutkimukset tukevat yhteistä mekanismia ilman kaikkien eläinlöydösten rinnastamista ihmisen lopputulokseen.",
    quantitativeTitle: "Kolme julkaistua siemennestetrendiä omissa yksiköissään",
    quantitativeLead: "Ihmisen, koiran ja hevosen aineistoissa havaittu heikkeneminen ulottaa kysymyksen ihmisen päätöksiä laajemmalle. Kukin tutkimus mittaa tiettyä ominaisuutta ja populaatiota; taulukko säilyttää nämä erot.",
    quantitativeHeaders: ["Populaatio", "Ajanjakso", "Mitattu muutos"],
    trends: [
      { population: "Ihminen: valikoimaton länsimainen alaryhmä", period: "1973–2011", result: "Siittiöpitoisuus 99,0 → 47,1 milj./ml (−52,4 %); tässä alaryhmässä 110 estimaattia.", source: "[[ref:levine2017_v2|Levine 2017]]" },
      { population: "Koira: yksi brittiläinen jalostusohjelma, 232 urosta", period: "1988–2014", result: "Eteenpäin suuntautuva liikkuvuus heikkeni julkaisun mukaan 2,5 %/v vuosina 1988–1998 ja 1,2 %/v vuosina 2002–2014; jalostusvalinta erotti jaksot.", source: "[[ref:lea2016|Lea 2016]]" },
      { population: "Hevonen: 230 estimaattia 229 artikkelista", period: "1984–2019", result: "Mallinnettu eteenpäin suuntautuva liikkuvuus 63,69 % → 42,35 % (−33,51 %); kulmakerroin −0,610 prosenttiyksikköä/v.", source: "[[ref:harris2023|Harris 2023]]" },
    ],
    quantitativeClose: "Nämä ovat mitattuja siemennestetrendejä. Niihin ei liity vastaavia kenttäannosmittauksia. Yhdessä ne perustelevat yhteisen biologisen selityksen tarkastelua; historiallisten muutosten yhteinen altiste ei vielä tunnistu niistä.",
    experimentTitle: "Historiatrendi ja koe vastaavat eri kysymyksiin",
    experimentTexts: [
      "Seitsemän koiran 10 viikon puhelinaltistus (1962–1966 MHz, kaksi tuntia päivässä, viitenä päivänä viikossa) ei muuttanut siemennestepäätteitä merkitsevästi lähtötilanteesta. Puhelimet olivat rinnalla; 0,96 W/kg oli valmistajan laitetieto, ei mitattu kivesannos. [[ref:dong2022_dog_phone_semen|Dong 2022]]",
      "Kahdeksan orin näytteissä 2,4 GHz:n REAC-laite nesteeseen upotettuine elektrodeineen säilytti DNA:n ja akrosomin eheyttä 72 tunnin kylmäsäilytyksessä; eteenpäin suuntautuva liikkuvuus ei parantunut. Koe koski tätä yhdistelmäinterventiota. [[ref:berlinguer2017_stallion_reac|Berlinguer 2017]]",
      "Tulokset paikantavat protokollasta riippuvia vasteita. Kumpikaan koe ei mittaa trenditaulukon populaatioiden historiallista altistusta.",
    ],
    matrixTitle: "Seitsemän biologista järjestelmää, seitsemän selitysreittiä",
    matrixLead: "Ihmisen oma ehkäisy-, koulutus- tai perhepäätös ei ole muiden kuuden lajin lisääntymismekanismi. Materiaaliset altisteet ylittävät tämän rajan: valituissa tutkimuksissa käsitellään ei-optisia kenttiä, valoa ja kemikaaleja. BERM yhdistää tällaiset syötteet eliön tilaan samassa ehdollisessa rakenteessa.",
    matrixCaption: "Nimettyjen tutkimusten kattavuus ja mallin yhdistämät reitit; soluja ei lasketa selitysten voittopisteiksi.",
    columns: ["Järjestelmä / vaste", "RF / pientaajuiset kentät", "Optinen valo", "Kemikaalit", "Ilmasto / elinympäristö", "Ravinto / liikkuminen", "Oma perhepäätös", "BERM:n yhdistäminen"],
    status: { experiment: "Koe: nimetty interventio muutti nimettyä vastetta", noDifference: "Tutkittu: ei merkitsevää muutosta tässä protokollassa", association: "Yhteys: altistus ja vaste havaittiin yhdessä", model: "Malli: ehdotettu selittävä liitos", outside: "Ei sovellu: eliön oma ihmiselle kuuluva perhepäätös", unexamined: "Ei tutkittu tähän valituissa tutkimuksissa" },
    rows: [
      { name: "Ihminen", outcome: "Siittiö, vuorokausivaste; päätökset vaikuttavat syntyvyyteen.", source: "[[ref:iuliis2009|De Iuliis 2009]]; [[ref:chang2015_ipad_melatonin|Chang 2015]]; [[ref:sumner2019_human_dog_sperm|Sumner 2019]]" },
      { name: "Koira", outcome: "Kemikaalien DNA-vaste; puhelinkokeessa ei merkitsevää siemennestemuutosta.", source: "[[ref:sumner2019_human_dog_sperm|Sumner 2019]]; [[ref:dong2022_dog_phone_semen|Dong 2022]]" },
      { name: "Hevonen", outcome: "RF + kontaktielektrodit säilyttivät DNA:ta ja akrosomia; liikkuvuus ei parantunut.", source: "[[ref:berlinguer2017_stallion_reac|Berlinguer 2017]]" },
      { name: "Punarinta", outcome: "Magneettinen suunnistus radiotaajuisessa kohinassa.", source: "[[ref:engels2014|Engels 2014]]" },
      { name: "Mehiläinen", outcome: "Kukalle laskeutuminen muokatussa sähkökentässä.", source: "[[ref:mallinson2025_electric_pollution|Mallinson 2025]]" },
      { name: "Kynsisammakko", outcome: "Lisääntymiskehitys atratsiinialtistuksessa.", source: "[[ref:hayes2010_atrazine_frogs|Hayes 2010]]" },
      { name: "Koralli", outcome: "Kutemisajankohdan yhteys keinotekoiseen yövaloon.", source: "[[ref:davies2023_coral_light|Davies 2023]]" },
    ],
    matrixClose: "Tyhjä näyttösolu ei tarkoita vaikutuksen puuttumista. Kokeen solu koskee nimettyä vastetta, ei koko populaation vähenemistä. Ilmasto, ravinto ja kemikaalit säilyvät lajien yhteisinä materiaalisina selityksinä; BERM:n yhteinen rakenne ei yksin järjestä niiden empiirisiä osuuksia.",
  },
};

const MATRIX: readonly (readonly EvidenceStatus[])[] = [
  ["experiment", "experiment", "experiment", "unexamined", "unexamined", "model", "model"],
  ["noDifference", "unexamined", "experiment", "unexamined", "unexamined", "outside", "model"],
  ["experiment", "unexamined", "unexamined", "unexamined", "unexamined", "outside", "model"],
  ["experiment", "unexamined", "unexamined", "unexamined", "unexamined", "outside", "model"],
  ["experiment", "unexamined", "unexamined", "unexamined", "unexamined", "outside", "model"],
  ["unexamined", "unexamined", "experiment", "unexamined", "unexamined", "outside", "model"],
  ["unexamined", "association", "unexamined", "unexamined", "unexamined", "outside", "model"],
];

const STATUS_STYLE: Record<EvidenceStatus, string> = {
  experiment: "border-accent/35 bg-accent/10 text-accent",
  noDifference: "border-card-border text-foreground-muted",
  association: "border-blue-500/35 bg-blue-500/10 text-foreground",
  model: "border-card-border bg-figure-bg text-foreground-muted",
  outside: "border-transparent text-foreground-muted",
  unexamined: "border-transparent text-foreground-muted",
};
const STATUS_SYMBOL: Record<EvidenceStatus, string> = { experiment: "●", noDifference: "○", association: "◇", model: "M", outside: "×", unexamined: "—" };

export function ProxyTranslationEvidence({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  return <div className="min-w-0 space-y-6">
    <h3 className="font-serif text-2xl">{c.translationTitle}</h3>
    <p className="max-w-[76ch] leading-relaxed">{c.translationLead}</p>
    <aside className="space-y-2 border-l-2 border-accent bg-figure-bg p-5">
      <h4 className="font-semibold">{c.pairedTitle}</h4>
      <p className="text-sm leading-relaxed text-foreground-muted"><InlineReferenceText text={c.pairedText} locale={locale} /></p>
    </aside>
    <div className="grid gap-4 sm:grid-cols-2">
      {c.translationCards.map((card) => <div key={card.value} className="min-w-0 space-y-3 rounded-lg border border-card-border p-5">
        <p className="font-serif text-3xl text-accent">{card.value}</p>
        <p className="text-sm leading-relaxed text-foreground-muted"><InlineReferenceText text={card.text} locale={locale} /></p>
      </div>)}
    </div>
    <p className="max-w-[76ch] text-sm leading-relaxed text-foreground-muted">{c.transport}</p>
  </div>;
}

export function ProxyQuantitativeEvidence({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  return <div className="min-w-0 space-y-5">
    <h3 className="font-serif text-2xl">{c.quantitativeTitle}</h3>
    <p className="max-w-[76ch] leading-relaxed">{c.quantitativeLead}</p>
    <div role="region" aria-label={c.quantitativeTitle} tabIndex={0} className="max-w-full overflow-x-auto rounded-lg border border-card-border focus-visible:outline-2 focus-visible:outline-accent">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead className="bg-figure-bg"><tr>{c.quantitativeHeaders.map((header) => <th key={header} scope="col" className="p-4 font-semibold">{header}</th>)}</tr></thead>
        <tbody>{c.trends.map((row) => <tr key={row.population} className="border-t border-card-border align-top">
          <th scope="row" className="w-[29%] p-4 font-medium">{row.population}</th>
          <td className="whitespace-nowrap p-4 tabular-nums text-foreground-muted">{row.period}</td>
          <td className="space-y-2 p-4 leading-relaxed"><p>{row.result}</p><p><InlineReferenceText text={row.source} locale={locale} /></p></td>
        </tr>)}</tbody>
      </table>
    </div>
    <p className="max-w-[76ch] text-sm leading-relaxed text-foreground-muted">{c.quantitativeClose}</p>
    <details className="rounded-lg border border-card-border bg-figure-bg p-5">
      <summary className="cursor-pointer font-semibold marker:text-accent">{c.experimentTitle}</summary>
      <div className="mt-4 space-y-3">{c.experimentTexts.map((text) => <p key={text} className="max-w-[76ch] text-sm leading-relaxed text-foreground-muted"><InlineReferenceText text={text} locale={locale} /></p>)}</div>
    </details>
  </div>;
}

export function ProxyCoverageMatrix({ locale }: Props) {
  const c = pickCopy(COPY, locale);
  return <div className="min-w-0 space-y-5">
    <h3 className="font-serif text-2xl">{c.matrixTitle}</h3>
    <p className="max-w-[76ch] leading-relaxed">{c.matrixLead}</p>
    <div role="region" aria-label={c.matrixTitle} tabIndex={0} className="max-w-full overflow-x-auto rounded-lg border border-card-border focus-visible:outline-2 focus-visible:outline-accent">
      <table className="w-full min-w-[55rem] border-collapse text-sm">
        <caption className="p-4 text-left text-xs leading-relaxed text-foreground-muted">{c.matrixCaption}</caption>
        <thead className="bg-figure-bg"><tr>{c.columns.map((header, index) => <th key={header} scope="col" className={`p-3 text-xs font-semibold ${index === 0 ? "min-w-[15rem] text-left" : "w-[6rem] text-center"}`}>{header}</th>)}</tr></thead>
        <tbody>{c.rows.map((row, rowIndex) => <tr key={row.name} className="border-t border-card-border">
          <th scope="row" className="space-y-1 p-3 text-left align-top font-normal"><span className="block font-semibold">{row.name}</span><span className="block text-xs leading-relaxed text-foreground-muted">{row.outcome}</span><span className="block text-xs"><InlineReferenceText text={row.source} locale={locale} /></span></th>
          {MATRIX[rowIndex].map((status, columnIndex) => <td key={columnIndex} className="p-3 text-center"><span title={c.status[status]} aria-label={`${row.name}: ${c.columns[columnIndex + 1]}. ${c.status[status]}`} className={`inline-flex size-8 items-center justify-center rounded border font-mono text-sm ${STATUS_STYLE[status]}`}>{STATUS_SYMBOL[status]}</span></td>)}
        </tr>)}</tbody>
      </table>
    </div>
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-foreground-muted">{(Object.keys(STATUS_SYMBOL) as EvidenceStatus[]).map((status) => <li key={status} className="flex items-center gap-2"><span aria-hidden="true" className={`inline-flex size-6 shrink-0 items-center justify-center rounded border font-mono ${STATUS_STYLE[status]}`}>{STATUS_SYMBOL[status]}</span>{c.status[status]}</li>)}</ul>
    <p className="max-w-[76ch] text-sm leading-relaxed text-foreground-muted">{c.matrixClose}</p>
  </div>;
}
