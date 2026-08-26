import type { Metadata } from "next";
import Image from "next/image";
import { Info } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";

type Principle = { num: string; bold: string; text: string };
type Copy = {
  title: string;
  subtitle: string;
  whatTitle: string;
  whatText: readonly string[];
  principlesTitle: string;
  principles: readonly Principle[];
  statusTitle: string;
  statusText: string;
  deepHistoryTitle: string;
  deepHistoryText: readonly string[];
  deepHistoryNote: string;
  licensingTitle: string;
  codeLabel: string;
  codeText: string;
  docsLabel: string;
  docsText: string;
  dataLabel: string;
  dataText: string;
  contributeTitle: string;
  contributeText: string;
  authorTitle: string;
  authorName: string;
  authorDegrees: readonly string[];
  authorIndependence: string;
};

const t: Record<Locale, Copy> = {
  en: {
    title: "About BERM",
    subtitle:
      "A research programme for testing a measurement-aware field-to-reproduction hypothesis without collapsing exposure, biology and demography into one score.",
    whatTitle: "What is the active BERM specification?",
    whatText: [
      "BERM (Bio-Electromagnetic Reproductive Model) is an open research model. Its active BERM v17 specification asks whether a documented physical field state can be linked, through measured organ and couple endpoints, to age-specific fertility patterns.",
      "It does not treat mobile subscriptions as an EMF dose, and it does not infer an individual biological effect from a country TFR series. The upstream Lindgren formulation is a theory-level premise that motivates testable field-state features; it is not a population-effect estimate.",
    ],
    principlesTitle: "Working principles",
    principles: [
      {
        num: "01",
        bold: "Measured inputs before calibration.",
        text: "A v2 endpoint estimate requires a documented FieldState, organ transfer, biological or couple endpoint, parameter/evidence IDs and a pre-specified mapping.",
      },
      {
        num: "02",
        bold: "Evidence is attached to the link it supports.",
        text: "A cellular, animal, in-vitro or systematic-review finding may support a bounded route segment. It is never silently promoted into a human TFR coefficient.",
      },
      {
        num: "03",
        bold: "ASFR before TFR.",
        text: "TFR is a period sum of age-specific fertility rates. Demand/opportunity, tempo and ART/live-birth delivery remain explicit demographic inputs rather than residual biology.",
      },
      {
        num: "04",
        bold: "Results are versioned and reproducible.",
        text: "The active route, evidence register and data-status rules state the measurement and interpretation conditions attached to each result.",
      },
      {
        num: "05",
        bold: "Open, adversarial testing.",
        text: "The project prioritises pre-specified measurements, sham and thermal controls, independent replication, held-out periods and publication of negative results.",
      },
    ],
    statusTitle: "Current status",
    statusText:
      "The v2 code and causal registry exist, but a matched national FieldState–biomarker–couple–ASFR panel has not yet been assembled. The active model therefore makes no calibrated country-level TFR forecast.",
    deepHistoryTitle: "Deep history: why Northern Europe first?",
    deepHistoryText: [
      "Between 10,000 and 6,000 years ago, a cluster of traits co-selected in Northern European populations: blue eyes (OCA2 mutation), lactose tolerance (LCT persistence), and cattle husbandry. All three optimise the same molecule — cryptochrome — through different pathways. Blue irises transmit more short-wavelength light to retinal CRY1. Dairy-derived riboflavin (B2) sustains the FAD chromophore that CRY requires for magnetic sensitivity. Cattle husbandry provided the selective pressure for both.",
      "BERM formalises this as the Northern Package: a population-level biological χ profile that amplifies coupling to electromagnetic fields. The nested χ model describes five scales — molecular, optical, cellular, environmental, population — each governed by the same selection-rule function χ. When χ_env was near zero (pre-electrification), high biological χ was invisible. As electrification rose, the most biologically coupled population was the first to show fertility decline below replacement.",
      "This framework generates falsifiable predictions: populations with high biological χ profiles (Scandinavian-origin) should show steeper TFR decline at equivalent EMF exposure than populations with low profiles (Sub-Saharan African-origin). The Amish–Mennonite gradient and the COVID work-from-home baby bump provide natural experiments.",
    ],
    deepHistoryNote: "The Northern Package hypothesis is rated L* (speculative). OCA2 + LCT co-selection is established (E-level); the cryptochrome interpretation is the novel, testable extension.",
    licensingTitle: "Licensing and data",
    codeLabel: "Code:",
    codeText: "MIT License. Use, modify and distribute the model code under the license terms.",
    docsLabel: "Documentation:",
    docsText: "CC BY-4.0 unless a source page states otherwise.",
    dataLabel: "Data:",
    dataText: "Third-party datasets retain their own licences and provenance. Derived tables label their source and intended analytical use.",
    contributeTitle: "Contribute or challenge the model",
    contributeText:
      "Useful contributions include measurement datasets with provenance, endpoint studies, source corrections, preregistered replications, competing causal models and code review. Please report both supporting and non-supporting results.",
    authorTitle: "Author",
    authorName: "Otto Juote",
    authorDegrees: [
      "MSc Biomedicine, Bioscience and Society — London School of Economics",
      "BA Political Science — University of Helsinki",
    ],
    authorIndependence: "Independent researcher. No university affiliation, no industry funding, no grant obligations.",
  },
  fi: {
    title: "Tietoa BERM:stä",
    subtitle:
      "Tutkimusohjelma, joka testaa mittaustietoista kenttä–lisääntyminen-hypoteesia tiivistämättä altistusta, biologiaa ja demografiaa yhdeksi luvuksi.",
    whatTitle: "Mikä on BERM:n aktiivinen määrittely?",
    whatText: [
      "BERM (Bio-Electromagnetic Reproductive Model) on avoin tutkimusmalli. Sen aktiivinen BERM v17-määrittely kysyy, voidaanko dokumentoitu fysikaalinen kenttätila yhdistää mitattujen elin- ja paripäätepisteiden kautta ikäkohtaisten hedelmällisyyslukujen kehitykseen.",
      "Se ei käsittele mobiililiittymiä EMF-annoksena eikä päättele yksilön biologista vaikutusta maan TFR-sarjasta. Edeltävä Lindgren-muotoilu on teoriatason premissi, joka motivoi testattavia FieldState-piirteitä; se ei ole väestövaikutusarvio.",
    ],
    principlesTitle: "Toimintaperiaatteet",
    principles: [
      {
        num: "01",
        bold: "Mitatut syötteet ennen kalibrointia.",
        text: "V2:n päätepistearvio edellyttää dokumentoitua FieldStatea, elinkohtaista siirtoa, biologista tai paripäätepistettä, parametri-/evidence-ID:tä ja ennalta määriteltyä vastaavuuskuvausta.",
      },
      {
        num: "02",
        bold: "Evidenssi kiinnitetään sitä tukevaan lenkkiin.",
        text: "Solu-, eläin-, in-vitro- tai systemaattisen katsauksen löydös voi tukea rajattua reittisegmenttiä. Sitä ei hiljaisesti ylennetä ihmisen TFR-kertoimeksi.",
      },
      {
        num: "03",
        bold: "ASFR ennen TFR:ää.",
        text: "TFR on ikäkohtaisten hedelmällisyyslukujen periodisumma. Kysyntä/mahdollisuus, tempo ja ART-syntymätoimitus säilyvät eksplisiittisinä demografisina syötteinä, eivät biologian residuaaleina.",
      },
      {
        num: "04",
        bold: "Tulokset ovat versioituja ja toistettavia.",
        text: "Aktiivinen reitti, evidenssirekisteri ja datatilan säännöt kertovat kuhunkin tulokseen liitetyt mittaus- ja tulkintaehdot.",
      },
      {
        num: "05",
        bold: "Avoin, kriittinen testaaminen.",
        text: "Projekti priorisoi ennalta määriteltyjä mittauksia, lume- ja lämpökontrolleja, riippumatonta replikaatiota, sovituksen ulkopuolelle jätettyjä jaksoja ja negatiivisten tulosten julkaisemista.",
      },
    ],
    statusTitle: "Nykytila",
    statusText:
      "V2-koodi ja kausaalirekisteri ovat olemassa, mutta kohdistettua kansallista FieldState–biomarkkeri–pari–ASFR-paneelia ei ole vielä koottu. Aktiivinen malli ei siksi anna kalibroitua maakohtaista TFR-ennustetta.",
    deepHistoryTitle: "Syvähistoria: miksi Pohjois-Eurooppa ensin?",
    deepHistoryText: [
      "Noin 10 000–6 000 vuotta sitten pohjoiseuroppalaisiin populaatioihin koselektoitui piirteiden klusteri: siniset silmät (OCA2-mutaatio), laktoosinsietokyky (LCT-persistenssi) ja karjankasvatus. Kaikki kolme optimoivat saman molekyylin — kryptokromin — eri reittien kautta. Siniset iirikset läpäisevät enemmän lyhytaaltoista valoa verkkokalvon CRY1:lle. Maitotuotteista saatava riboflaviini (B2) ylläpitää FAD-kromofooria, jota CRY tarvitsee magneettiseen herkkyyteen. Karjankasvatus tarjosi valintapaineen molemmille.",
      "BERM formalisoi tämän Pohjoisena pakettina: populaatiotason biologinen χ-profiili, joka vahvistaa kytkentää sähkömagneettisiin kenttiin. Sisäkkäinen χ-malli kuvaa viisi skaalaa — molekulaarinen, optinen, solu-, ympäristö- ja populaatiotaso — joista kutakin hallitsee sama valintasääntöfunktio χ. Kun χ_env oli lähellä nollaa (ennen sähköistämistä), korkea biologinen χ oli näkymätön. Sähköistämisen kasvaessa biologisesti kytkentäisin populaatio oli ensimmäinen, joka osoitti hedelmällisyyslaskun korvaavuustason alle.",
      "Tämä viitekehys tuottaa falsifioitavia ennusteita: populaatioiden, joilla on korkeat biologiset χ-profiilit (skandinaavisperäiset), pitäisi osoittaa jyrkempää TFR-laskua vastaavalla EMF-altistuksella kuin populaatioiden, joilla on matalat profiilit (Saharan eteläpuoleiset afrikkalaisperäiset). Amish–mennoniittigradientti ja COVID-etätyön baby bump tarjoavat luonnollisia kokeita.",
    ],
    deepHistoryNote: "Pohjoinen paketti -hypoteesi on arvioitu tasolle L* (spekulatiivinen). OCA2 + LCT -koselektio on vakiintunut (E-taso); kryptokromitulkinta on uusi, testattava laajennus.",
    licensingTitle: "Lisensointi ja data",
    codeLabel: "Koodi:",
    codeText: "MIT-lisenssi. Mallikoodia voi käyttää, muokata ja jakaa lisenssin ehtojen mukaisesti.",
    docsLabel: "Dokumentaatio:",
    docsText: "CC BY-4.0, ellei lähdesivu toisin ilmoita.",
    dataLabel: "Data:",
    dataText: "Kolmannen osapuolen datasetit säilyttävät omat lisenssinsä ja provenienssinsa. Johdetut taulukot kertovat lähteensä ja tarkoitetun analyyttisen käytön.",
    contributeTitle: "Osallistu tai haasta malli",
    contributeText:
      "Hyödyllisiä panoksia ovat mittausaineistot alkuperätietoineen, päätepistetutkimukset, lähdekorjaukset, ennakkorekisteröidyt replikaatiot, kilpailevat kausaalimallit ja koodikatselmointi. Raportoi sekä tukevat että ei-tukevat tulokset.",
    authorTitle: "Tekijä",
    authorName: "Otto Juote",
    authorDegrees: [
      "MSc Biomedicine, Bioscience and Society — London School of Economics",
      "VTK Yleinen valtio-oppi — Helsingin yliopisto",
    ],
    authorIndependence: "Itsenäinen tutkija. Ei yliopistosidonnaisuutta, ei teollisuusrahoitusta, ei apurahavelvoitteita.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = t[locale === "fi" ? "fi" : "en"];
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[locale === "fi" ? "fi" : "en"];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Info} title={d.title} subtitle={d.subtitle} />

      <div className="max-w-3xl space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-3">{d.whatTitle}</h2>
          <div className="space-y-3 text-foreground-muted leading-relaxed">
            {d.whatText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{d.principlesTitle}</h2>
          <ul className="space-y-4 text-foreground-muted leading-relaxed">
            {d.principles.map((principle) => (
              <li key={principle.num} className="flex gap-3">
                <span className="text-accent font-mono-num text-sm mt-0.5 shrink-0">{principle.num}</span>
                <div><strong className="text-foreground">{principle.bold}</strong> {principle.text}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-status-partial/35 bg-status-partial/5 p-5">
          <h2 className="text-lg font-semibold">{d.statusTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.statusText}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{d.deepHistoryTitle}</h2>
          <div className="space-y-3 text-foreground-muted leading-relaxed">
            {d.deepHistoryText.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
          </div>
          <p className="mt-4 text-xs text-foreground-muted/70 italic leading-relaxed border-l-2 border-accent/30 pl-3">{d.deepHistoryNote}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{d.licensingTitle}</h2>
          <div className="space-y-2 text-foreground-muted leading-relaxed">
            <p><strong className="text-foreground">{d.codeLabel}</strong> {d.codeText}</p>
            <p><strong className="text-foreground">{d.docsLabel}</strong> {d.docsText}</p>
            <p><strong className="text-foreground">{d.dataLabel}</strong> {d.dataText}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{d.contributeTitle}</h2>
          <p className="text-foreground-muted leading-relaxed">{d.contributeText}</p>
          <p className="mt-3 text-foreground-muted leading-relaxed">
            <a href="https://github.com/extinctionfield" className="text-accent hover:text-accent-hover transition-colors" target="_blank" rel="noopener noreferrer">github.com/extinctionfield</a>
          </p>
        </section>

        <section className="border-t border-border pt-10">
          <h2 className="text-xl font-semibold mb-4">{d.authorTitle}</h2>
          <div className="flex gap-6 items-start">
            <Image
              src="/images/otto-juote.png"
              alt="Otto Juote"
              width={96}
              height={96}
              className="rounded-full object-cover shrink-0 grayscale"
            />
            <div className="space-y-3">
              <p className="text-lg font-medium">{d.authorName}</p>
              <ul className="space-y-1 text-sm text-foreground-muted">
                {d.authorDegrees.map((deg) => <li key={deg}>{deg}</li>)}
              </ul>
              <p className="text-sm text-foreground-muted leading-relaxed">{d.authorIndependence}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
