import type { Metadata } from "next";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SentinelReadiness } from "@/components/SentinelReadiness";

const COPY = {
  en: {
    title: "Sentinel species: data readiness",
    subtitle: "Cross-species observations can motivate a registered test, but they cannot substitute for measured exposure, compatible endpoints and competing-cause data.",
    contextTitle: "What the current records can say",
    context: [
      ["Dogs", "A published single-site breeding-programme series reports changes in some semen endpoints over time. It lacks measured RF, household-device and regional endpoint data, so it is contextual rather than an exposure-gradient test."],
      ["Livestock", "Published artificial-insemination-centre summaries can be useful comparators, but breeding selection, station management, nutrition, housing and protocol changes must be observed. No low-RF control status is inferred without dosimetry."],
      ["Cross-species comparison", "Species differ in generation time, selection, reproductive physiology and data systems. A common temporal pattern does not identify a common field mechanism without matched place–time FieldState and endpoint data."],
    ],
    nextTitle: "What a usable sentinel study needs",
    next: ["Measured FieldState with provenance at the relevant environment and time resolution.", "Endpoint definitions and collection protocols comparable across locations or explicitly modelled.", "Pre-specified chemical, climate, husbandry, selection and disease covariates.", "A registered test that compares the field model with competing causal explanations."],
    link: "Read the FieldState measurement protocol",
  },
  fi: {
    title: "Indikaattorilajit: aineiston valmius",
    subtitle: "Lajienväliset havainnot voivat motivoida rekisteröidyn testin, mutta ne eivät korvaa mitattua altistusta, yhteensopivia päätepisteitä ja kilpailevien syiden dataa.",
    contextTitle: "Mitä nykyiset tietueet voivat sanoa",
    context: [
      ["Koirat", "Julkaistu yhden jalostusohjelman aikasarja raportoi joidenkin siemennestepäätepisteiden muutoksia. Siitä puuttuu mitattu RF, kotilaitetieto ja alueellinen päätepistedata, joten se on kontekstia eikä altistusgradienttitesti."],
      ["Tuotantoeläimet", "Julkaistut keinosiemennyskeskusten yhteenvedot voivat olla hyödyllisiä vertailuja, mutta jalostusvalinta, aseman hallinta, ravinto, asuminen ja protokollamuutokset on havaittava. Matalan RF:n kontrolliasemaa ei päätellä ilman dosimetriaa."],
      ["Lajienvälinen vertailu", "Lajit eroavat sukupolviajassa, valinnassa, lisääntymisfysiologiassa ja datajärjestelmissä. Yhteinen ajallinen kuvio ei tunnista yhteistä kenttämekanismia ilman kohdistettua paikka–aika-FieldStatea ja päätepistedataa."],
    ],
    nextTitle: "Mitä käyttökelpoinen sentinellitutkimus tarvitsee",
    next: ["Mitattu FieldState proveniensseineen relevantissa ympäristössä ja aikatasossa.", "Päätepistemääritelmät ja keruuprotokollat, jotka ovat vertailukelpoisia paikkojen välillä tai eksplisiittisesti mallinnettuja.", "Ennalta määritellyt kemikaali-, ilmasto-, kasvatus-, valinta- ja tautikovariaatit.", "Rekisteröity testi, joka vertaa kenttämallia kilpaileviin kausaalisiin selityksiin."],
    link: "Lue FieldState-mittausprotokolla",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function SentinelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Leaf} title={d.title} subtitle={d.subtitle} />
      <section className="mb-14"><SentinelReadiness locale={activeLocale} /></section>
      <section className="mb-14 max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">{d.contextTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {d.context.map(([title, text]) => <article key={title} className="rounded-xl border border-card-border bg-card-bg p-5"><h3 className="font-semibold mb-2">{title}</h3><p className="text-sm text-foreground-muted leading-relaxed">{text}</p></article>)}
        </div>
      </section>
      <section className="max-w-4xl rounded-xl border border-card-border bg-card-bg p-6">
        <h2 className="text-xl font-semibold mb-3">{d.nextTitle}</h2>
        <ol className="space-y-3 text-sm text-foreground-muted leading-relaxed">
          {d.next.map((item, index) => <li key={item} className="flex gap-3"><span className="font-mono-num text-accent">{index + 1}.</span>{item}</li>)}
        </ol>
        <Link href={`/${activeLocale}/about/measurement`} className="inline-block mt-5 text-sm text-accent hover:underline">{d.link} →</Link>
      </section>
    </div>
  );
}
