import { ClaimRef } from "@/components/ClaimRef";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "From field exposure to reproductive regulation",
    lead: "BERM connects a physical input to calcium signalling, redox balance, hormone function and reproduction. Experiments locate several component dependencies; their composition explains how apparently separate outcomes can share an upstream condition.",
    bridgeLabel: "BERM bridge",
    componentLabel: "Measured component",
    chainLabel: "BERM’s composed mechanism",
    chain: ["Field", "Calcium", "Redox", "Hormones", "Reproduction"],
    stages: [
      { title: "Field and receiver", text: "Lindgren’s geometry supplies δg. BERM’s proposed response rᵢ = Ξᵢ[S](δg) connects it to tissue biology. This coupling remains open; geometry alone does not identify a calcium channel." },
      { title: "Calcium signalling", text: "In human liver-cancer cells, a specified RF protocol produced CaV3.2-dependent calcium entry. Ethosuximide and CACNA1H knockdown interrupted key responses. [[ref:therabionic_ttype_tdp|Jimenez 2019]]." },
      { title: "Calcium and redox", text: "In myoblasts, TRPC blockers reduced field-induced ROS; TRPC1 knockdown prevented mitochondrial responses. Antioxidants interrupted the growth response. Here the response promoted muscle development. [[ref:yap2019_trpc1_mitohormesis|Yap 2019]]." },
      { title: "Hormone production", text: "In mouse Leydig cells, RF altered redox markers and reduced testosterone. Antioxidant CeO₂ pretreatment improved both compared with RF alone, locating a modifiable hormone-production step. [[ref:qin2019_ceo2_leydig|Qin 2019]]." },
      { title: "Reproductive function", text: "Deleting androgen receptors specifically in mouse Sertoli cells arrested sperm development during meiosis. This field-free experiment connects tissue hormone reception to sperm production. [[ref:degendt2004_sertoli_ar|De Gendt 2004]]." },
    ],
    synthesisTitle: "A shared process behind several measured outcomes",
    synthesis: "BERM joins these dependencies through corresponding tissue machinery. Oxidative stress, low hormone output and impaired sperm production can then describe successive or interacting parts of a process. Measuring a downstream part can explain the outcome while leaving its field-dependent condition unidentified.",
    direct: "A direct branch bypasses hormone production: De Iuliis measured ROS, DNA damage and function in isolated human sperm. These are cellular endpoints. [[ref:iuliis2009|De Iuliis 2009]].",
    spermIntervention: "In human sperm, a 50 Hz, 5 mT square wave increased motility. Mitochondrial uncoupling blocked the response; glycolysis inhibition with suitable substrates preserved it. [[ref:iorio2011_sperm_mitochondria|Iorio 2011]].",
    associationsTitle: "Two links within human sperm",
    associations: [
      { value: "R² = 0.861", label: "Mitochondrial ROS ↔ DNA fragmentation" },
      { value: "R² = 0.727", label: "Mitochondrial ROS ↔ oxidative DNA damage (8-OHdG)" },
    ],
    associationsCaption: "Intracellular associations in the same RF dose series, not SAR–fertility prediction. [[ref:iuliis2009|Figures 4B and 5B]]; [[ref:iuliis2013_correction|the correction]] changed replicate counts, retaining these values.",
    numbersTitle: "What the reported numbers actually count",
    numbers: [
      { value: "23", label: "Channel-blocker studies reviewed", text: "Pall collected studies where blockers prevented or reduced field responses, locating channel dependence across tissues and protocols. [[ref:pall2013_v2|Pall 2013]]." },
      { value: "93 / 100", label: "Oxidative findings in a review", text: "Of 100 studies reviewed by Yakymenko, 93 reported oxidative effects. They place redox processes across several biological systems. [[ref:yakymenko2016|Yakymenko 2016]]." },
      { value: "−8.1 pp", label: "Pooled sperm motility difference", text: "95% CI −13.1 to −3.2. Adams included 10 studies and 1,492 samples overall, combining laboratory and observational designs. [[ref:adams2014|Adams 2014]]." },
      { value: "86 → 68%", label: "Human sperm motility in vitro", text: "1.8 GHz, 1 W/kg, 16 hours; three biological replicates after correction. A change of 18 percentage points. [[ref:iuliis2009|De Iuliis 2009]]; [[ref:iuliis2013_correction|2013 correction]]." },
    ],
    details: "Intervention protocols and transfer conditions",
    protocols: [
      "Jimenez: amplitude-modulated 27.12 MHz; culture SAR 30/400 mW/kg, usually 3 hours/day for seven days. Channel dependence identifies a biological requirement, not necessarily the first physical receiver.",
      "Yap: a single 10-minute, 1.5 mT pulsed exposure. Calcium/redox signalling supported growth; this does not make every calcium or ROS increase harmful.",
      "Qin: 1800 MHz, mean SAR 0.116 W/kg, 1–4 hours; CeO₂ 128 µg/ml for 24 hours beforehand. CeO₂ alone also changed responses, so this does not isolate one ROS target.",
      "De Iuliis: purified sperm at 21°C; no pharmacological RF-rescue arm. The 2013 correction changed figure replicates from four to three. Adams’ pooled vitality confidence interval included zero.",
    ],
    scope: "The connecting arrows are BERM synthesis. Experiments retain their tissues and protocols; review counts are not independent replication rates. Coupling scale, response direction, timing and human fertility effects remain open calibration questions.",
  },
  fi: {
    title: "Kentästä lisääntymisen säätelyyn",
    lead: "BERM yhdistää fysikaalisen syötteen kalsiumsignalointiin, redox-tasapainoon, hormonitoimintaan ja lisääntymiseen. Kokeet paikantavat useita osien välisiä riippuvuuksia. Niiden kokoaminen selittää, miten erillisiltä näyttävät seuraukset voivat jakaa saman taustaehdon.",
    bridgeLabel: "BERM:n liitos",
    componentLabel: "Mitattu komponentti",
    chainLabel: "BERM:n koostettu mekanismi",
    chain: ["Kenttä", "Kalsium", "Redox", "Hormonit", "Lisääntyminen"],
    stages: [
      { title: "Kenttä ja vastaanottaja", text: "Lindgrenin geometria tuottaa δg:n. BERM:n ehdotettu vaste rᵢ = Ξᵢ[S](δg) liittää sen kudosbiologiaan. Kytkentä on avoin; geometria yksin ei tunnista kalsiumkanavaa." },
      { title: "Kalsiumsignalointi", text: "Ihmisen maksasyöpäsoluissa määritetty RF-protokolla tuotti CaV3.2-riippuvaisen kalsiumin sisäänvirtauksen. Etosuksimidi ja CACNA1H-geenin vaimennus katkaisivat keskeisiä vasteita. [[ref:therabionic_ttype_tdp|Jimenez 2019]]." },
      { title: "Kalsium ja redox", text: "Lihasesisoluissa TRPC-salpaajat vähensivät kentän lisäämää ROS:ia; TRPC1-vaimennus esti mitokondriovasteita. Antioksidantit katkaisivat kasvuvasteen. Tässä vaste tuki lihaskehitystä. [[ref:yap2019_trpc1_mitohormesis|Yap 2019]]." },
      { title: "Hormonituotanto", text: "Hiiren Leydigin soluissa RF muutti redox-mittareita ja vähensi testosteronia. Antioksidanttinen CeO₂-esikäsittely paransi molempia suhteessa RF:ään yksin ja paikansi muokattavan hormonituotannon vaiheen. [[ref:qin2019_ceo2_leydig|Qin 2019]]." },
      { title: "Lisääntymistoiminta", text: "Androgeenireseptorin poistaminen vain hiiren Sertolin soluista pysäytti siittiökehityksen meioosiin. Kentätön koe yhdistää kudoksen hormonivastaanoton sukusolutuotantoon. [[ref:degendt2004_sertoli_ar|De Gendt 2004]]." },
    ],
    synthesisTitle: "Yhteinen prosessi usean mitatun seurauksen takana",
    synthesis: "BERM yhdistää riippuvuudet kudosten vastaavien toimintamekanismien kautta. Oksidatiivinen stressi, vähäinen hormonituotanto ja heikentynyt siittiötuotanto voivat silloin kuvata prosessin peräkkäisiä tai vuorovaikuttavia osia. Myöhemmän vaiheen mittaus voi selittää lopputulosta ja silti jättää sen kentästä riippuvan ehdon tunnistamatta.",
    direct: "Suora haara ohittaa hormonituotannon: De Iuliis mittasi eristetyissä ihmisen siittiöissä ROS:ia, DNA-vauriota ja toimintamuutoksia. Päätemuuttujat ovat solutasoisia. [[ref:iuliis2009|De Iuliis 2009]].",
    spermIntervention: "Ihmisen siittiöissä 50 Hz:n, 5 mT:n kanttiaalto lisäsi liikkuvuutta. Mitokondrioiden irtikytkentä esti vasteen; glykolyysin esto sopivilla energiasubstraateilla säilytti sen. [[ref:iorio2011_sperm_mitochondria|Iorio 2011]].",
    associationsTitle: "Kaksi yhteyttä ihmisen siittiön sisällä",
    associations: [
      { value: "R² = 0,861", label: "Mitokondrio-ROS ↔ DNA-fragmentaatio" },
      { value: "R² = 0,727", label: "Mitokondrio-ROS ↔ oksidatiivinen DNA-vaurio (8-OHdG)" },
    ],
    associationsCaption: "Solunsisäisiä yhteyksiä samassa RF-annossarjassa, eivät SAR:n ja syntyvyyden selitysasteita. [[ref:iuliis2009|Kuvat 4B ja 5B]]; [[ref:iuliis2013_correction|korjaus]] muutti toistomäärät, mutta säilytti nämä luvut.",
    numbersTitle: "Mitä tutkimusten luvut tarkoittavat",
    numbers: [
      { value: "23", label: "Katsaukseen koottua salpaajatutkimusta", text: "Pall kokosi tutkimuksia, joissa salpaaja esti tai vaimensi kenttävasteen. Ne paikantavat kanavariippuvuutta eri kudoksissa ja protokollissa. [[ref:pall2013_v2|Pall 2013]]." },
      { value: "93 / 100", label: "Katsauksen oksidatiiviset löydökset", text: "Yakymenkon kokoamasta sadasta tutkimuksesta 93 raportoi oksidatiivisia vaikutuksia. Ne paikantavat redox-prosesseja useissa biologisissa järjestelmissä. [[ref:yakymenko2016|Yakymenko 2016]]." },
      { value: "−8,1 %-yks.", label: "Siittiöliikkuvuuden yhdistetty ero", text: "95 %:n luottamusväli −13,1…−3,2. Adamsin kokonaisaineisto: 10 tutkimusta ja 1 492 näytettä, laboratorio- ja havainnointiasetelmia. [[ref:adams2014|Adams 2014]]." },
      { value: "86 → 68 %", label: "Ihmissiittiöiden liikkuvuus solukokeessa", text: "1,8 GHz, 1 W/kg, 16 tuntia; korjauksen mukaan kolme biologista toistoa. Ero on 18 prosenttiyksikköä. [[ref:iuliis2009|De Iuliis 2009]]; [[ref:iuliis2013_correction|korjaus 2013]]." },
    ],
    details: "Interventioiden protokollat ja yhdistämisen ehdot",
    protocols: [
      "Jimenez: amplitudimoduloitu 27,12 MHz; viljelyn SAR 30/400 mW/kg, tavallisesti 3 tuntia päivässä seitsemän päivää. Kanavariippuvuus paikantaa biologisen edellytyksen, ei välttämättä ensimmäistä fysikaalista vastaanotinta.",
      "Yap: yksi 10 minuutin pulssialtistus, 1,5 mT. Kalsium–redox-signalointi tuki kasvua; jokainen kalsiumin tai ROS:n nousu ei siten ole haitta.",
      "Qin: 1800 MHz, keskimääräinen SAR 0,116 W/kg, 1–4 tuntia; CeO₂ 128 µg/ml 24 tuntia ennen altistusta. CeO₂ yksin muutti myös vasteita, joten koe ei eristä yhtä ROS-kohdetta.",
      "De Iuliis: puhdistetut siittiöt 21 °C:ssa; ei RF-vaikutuksen lääkkeellistä estokoetta. Vuoden 2013 korjaus muutti kuvien toistomäärän neljästä kolmeen. Adamsin yhdistetyn elinkykyarvion luottamusväli sisälsi nollan.",
    ],
    scope: "Osia yhdistävät nuolet ovat BERM-synteesiä. Osakokeiden kudokset ja protokollat säilyvät; katsausmäärät eivät ole riippumattomien toistojen osuuksia. Kytkennän asteikko, vasteen suunta, ajoitus ja ihmisen hedelmällisyysvaikutus jäävät avoimiksi kalibrointikohdiksi.",
  },
};

export function ProxyMechanismEvidence({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale);
  return (
    <section aria-labelledby="proxy-mechanism-evidence-title" className="my-8 min-w-0 space-y-6 rounded-xl border border-card-border bg-[var(--figure-bg)] p-4 sm:p-6">
      <div className="space-y-3">
        <h3 id="proxy-mechanism-evidence-title" className="font-serif text-2xl leading-snug">{c.title}</h3>
        <p className="text-base leading-relaxed text-foreground-muted"><ClaimRef claimId="claim.proxy.mechanistic-composition">{c.lead}</ClaimRef></p>
      </div>

      <ol aria-label={c.chainLabel} className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm font-semibold sm:text-base">
        {c.chain.map((step, index) => (
          <li key={step} className="flex items-center gap-3">
            <span>{step}</span>
            {index < c.chain.length - 1 && <span aria-hidden="true" className="text-accent">→</span>}
          </li>
        ))}
      </ol>

      <ol className="grid min-w-0 gap-3 sm:grid-cols-2">
        {c.stages.map((stage, index) => (
          <li key={stage.title} className={`min-w-0 space-y-3 rounded-lg border border-card-border bg-background p-4 ${index === 0 ? "sm:col-span-2" : ""}`}>
            <div className="flex items-center gap-2 text-xs text-foreground-muted">
              <span aria-hidden="true" className="font-mono text-accent">{index + 1}</span>
              <span>{index === 0 ? c.bridgeLabel : c.componentLabel}</span>
            </div>
            <h4 className="text-base font-semibold leading-snug">{stage.title}</h4>
            <p className="text-sm leading-relaxed text-foreground-muted"><InlineReferenceText text={stage.text} locale={locale} /></p>
          </li>
        ))}
      </ol>

      <div className="space-y-3 border-l-2 border-accent pl-4">
        <h4 className="text-base font-semibold">{c.synthesisTitle}</h4>
        <p className="text-base leading-relaxed">{c.synthesis}</p>
        <p className="text-base leading-relaxed text-foreground-muted"><InlineReferenceText text={c.direct} locale={locale} /></p>
        <p className="text-base leading-relaxed text-foreground-muted"><InlineReferenceText text={c.spermIntervention} locale={locale} /></p>
      </div>

      <figure className="space-y-3 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <h4 className="text-base font-semibold">{c.associationsTitle}</h4>
        <dl className="grid gap-4 sm:grid-cols-2">
          {c.associations.map((association) => (
            <div key={association.label} className="min-w-0 space-y-2">
              <dt className="text-sm leading-relaxed">{association.label}</dt>
              <dd className="font-mono text-2xl font-semibold text-accent">{association.value}</dd>
            </div>
          ))}
        </dl>
        <figcaption className="text-sm leading-relaxed text-foreground-muted"><InlineReferenceText text={c.associationsCaption} locale={locale} /></figcaption>
      </figure>

      <div className="space-y-3">
        <h4 className="text-base font-semibold">{c.numbersTitle}</h4>
        <ul className="grid gap-3 sm:grid-cols-2">
          {c.numbers.map((number) => (
            <li key={number.label} className="space-y-2 rounded-lg border border-card-border bg-background p-4">
              <p className="font-mono text-2xl font-semibold text-accent">{number.value}</p>
              <p className="text-sm font-semibold">{number.label}</p>
              <p className="text-sm leading-relaxed text-foreground-muted"><InlineReferenceText text={number.text} locale={locale} /></p>
            </li>
          ))}
        </ul>
      </div>

      <details className="rounded-lg border border-card-border bg-background">
        <summary className="cursor-pointer rounded-lg px-4 py-3 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{c.details}</summary>
        <ul className="space-y-3 border-t border-card-border p-4 text-sm leading-relaxed text-foreground-muted">
          {c.protocols.map((protocol) => <li key={protocol}>{protocol}</li>)}
        </ul>
      </details>
      <p className="text-sm leading-relaxed text-foreground-muted">{c.scope}</p>
    </section>
  );
}
