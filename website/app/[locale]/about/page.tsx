import type { Metadata } from "next";
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
  licensingTitle: string;
  codeLabel: string;
  codeText: string;
  docsLabel: string;
  docsText: string;
  dataLabel: string;
  dataText: string;
  contributeTitle: string;
  contributeText: string;
};

const t: Record<Locale, Copy> = {
  en: {
    title: "About BERM",
    subtitle:
      "A research programme for testing a measurement-aware field-to-reproduction hypothesis without collapsing exposure, biology and demography into one score.",
    whatTitle: "What is the active BERM specification?",
    whatText: [
      "BERM (Bio-Electromagnetic Reproductive Model) is an open research model. Its active BERM v19 specification asks whether a documented physical field state can be linked, through measured organ and couple endpoints, to age-specific fertility patterns.",
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
  },
  fi: {
    title: "Tietoa BERM:stä",
    subtitle:
      "Tutkimusohjelma, joka testaa mittaustietoista kenttä–lisääntyminen-hypoteesia tiivistämättä altistusta, biologiaa ja demografiaa yhdeksi luvuksi.",
    whatTitle: "Mikä on BERM:n aktiivinen määrittely?",
    whatText: [
      "BERM (Bio-Electromagnetic Reproductive Model) on avoin tutkimusmalli. Sen aktiivinen BERM v19-määrittely kysyy, voidaanko dokumentoitu fysikaalinen kenttätila yhdistää mitattujen elin- ja paripäätepisteiden kautta ikäkohtaisten hedelmällisyyslukujen kehitykseen.",
      "Se ei käsittele mobiililiittymiä EMF-annoksena eikä päättele yksilön biologista vaikutusta maan TFR-sarjasta. Upstream-Lindgren-muotoilu on teoriatason premissi, joka motivoi testattavia FieldState-piirteitä; se ei ole väestövaikutusarvio.",
    ],
    principlesTitle: "Toimintaperiaatteet",
    principles: [
      {
        num: "01",
        bold: "Mitatut syötteet ennen kalibrointia.",
        text: "V2:n päätepistearvio edellyttää dokumentoitua FieldStatea, elinsiirtoa, biologista tai paripäätepistettä, parametri-/evidence-ID:tä ja ennalta määriteltyä mappingia.",
      },
      {
        num: "02",
        bold: "Evidenssi kiinnitetään sitä tukevaan lenkkiin.",
        text: "Solu-, eläin-, in-vitro- tai systemaattisen katsauksen löydös voi tukea rajattua reittisegmenttiä. Sitä ei hiljaisesti ylennetä ihmisen TFR-kertoimeksi.",
      },
      {
        num: "03",
        bold: "ASFR ennen TFR:ää.",
        text: "TFR on ikäkohtaisten hedelmällisyyslukujen periodisumma. Kysyntä/mahdollisuus, tempo ja ART/live-birth-delivery säilyvät eksplisiittisinä demografisina syötteinä, eivät biologian residuaaleina.",
      },
      {
        num: "04",
        bold: "Tulokset ovat versioituja ja toistettavia.",
        text: "Aktiivinen reitti, evidenssirekisteri ja datatilan säännöt kertovat kuhunkin tulokseen liitetyt mittaus- ja tulkintaehdot.",
      },
      {
        num: "05",
        bold: "Avoin, kriittinen testaaminen.",
        text: "Projekti priorisoi ennalta määriteltyjä mittauksia, sham- ja lämpökontrolleja, riippumatonta replikaatiota, sovituksen ulkopuolelle jätettyjä jaksoja ja negatiivisten tulosten julkaisemista.",
      },
    ],
    statusTitle: "Nykytila",
    statusText:
      "V2-koodi ja kausaalirekisteri ovat olemassa, mutta kohdistettua kansallista FieldState–biomarkkeri–pari–ASFR-paneelia ei ole vielä koottu. Aktiivinen malli ei siksi anna kalibroitua maakohtaista TFR-ennustetta.",
    licensingTitle: "Lisensointi ja data",
    codeLabel: "Koodi:",
    codeText: "MIT-lisenssi. Mallikoodia voi käyttää, muokata ja jakaa lisenssin ehtojen mukaisesti.",
    docsLabel: "Dokumentaatio:",
    docsText: "CC BY-4.0, ellei lähdesivu toisin ilmoita.",
    dataLabel: "Data:",
    dataText: "Kolmannen osapuolen datasetit säilyttävät omat lisenssinsä ja provenienssinsa. Johdetut taulukot kertovat lähteensä ja tarkoitetun analyyttisen käytön.",
    contributeTitle: "Osallistu tai haastaa malli",
    contributeText:
      "Hyödyllisiä kontribuutioita ovat mittausaineistot proveniensseineen, päätepistetutkimukset, lähdekorjaukset, ennakkorekisteröidyt replikaatiot, kilpailevat kausaalimallit ja koodikatselmointi. Raportoi sekä tukeva että ei-tukeva tulos.",
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
      </div>
    </div>
  );
}
