import Link from "next/link";
import { FieldStateStatus } from "./FieldStateStatus";
import { GlobalDataDownloads } from "./GlobalDataDownloads";

/** Compact v2-safe data summary for the Explore tab; the full inventory is /data. */
export function DataSourcesContent({ locale }: { locale: string }) {
  const fi = locale === "fi";
  const d = fi
    ? {
        title: "Data ja mittaustila",
        lead: "Aktiivinen reitti erottaa demografisen tuloksen, teknologian ajoitusproksin ja mitatun FieldStaten. Saatavilla oleva maa–vuosi-aineisto ei vielä muodosta elinkohtaista altistus- tai vaikutuspaneelia.",
        cards: [
          ["ASFR ja TFR", "UN WPP 2024 tarjoaa ikäryhmäkohtaisen hedelmällisyyden. TFR johdetaan ASFR:stä; se ei yksin tunnista biologista mekanismia."],
          ["Teknologian ajoitus", "Maailmanpankin/ITU:n mobiililiittymät tukevat kuvailevaa käyttöönotto- ja kohorttiajoitusta. Ne eivät ole RF-annos tai FieldState."],
          ["Fyysinen FieldState", "Tarvitaan kalibroidut paikalliset vektori-, spektri/PSD-, geometria-, B₀-, ajoitus- ja provenienssimittaukset sekä elinsiirtomalli."],
          ["Biologinen yhdistäminen", "Elinkohtaiset mies-, nais- ja este-päätepisteet sekä paritila on mitattava samalla aika–paikka-akselilla ennen ASFR-mallinnusta."],
        ],
        link: "Avaa täydellinen dataluettelo",
      }
    : {
        title: "Data and measurement status",
        lead: "The active route separates demographic outcome, technology-timing proxy and measured FieldState. Available country-year data do not yet form an organ-specific exposure or effect panel.",
        cards: [
          ["ASFR and TFR", "UN WPP 2024 provides age-specific fertility. TFR is derived from ASFR and cannot on its own identify a biological mechanism."],
          ["Technology timing", "World Bank/ITU mobile subscriptions support descriptive adoption and cohort timing. They are not RF dose or FieldState."],
          ["Physical FieldState", "Calibrated local vector, spectrum/PSD, geometry, B₀, timing and provenance measurements plus an organ-transfer model are required."],
          ["Biological join", "Organ-specific male, female and barrier endpoints plus couple state must be measured on the same time-place axis before ASFR modelling."],
        ],
        link: "Open the full data inventory",
      };
  const language = fi ? "fi" : "en";
  return (
    <div>
      <section className="mb-10 max-w-4xl">
        <h2 className="text-xl font-semibold mb-2">{d.title}</h2>
        <p className="text-sm leading-relaxed text-foreground-muted">{d.lead}</p>
      </section>
      <section className="mb-10"><FieldStateStatus locale={language} /></section>
      <section className="grid gap-4 md:grid-cols-2 mb-8">
        {d.cards.map(([title, text]) => <article key={title} className="rounded-xl border border-card-border bg-card-bg p-5"><h3 className="font-semibold mb-2">{title}</h3><p className="text-sm text-foreground-muted leading-relaxed">{text}</p></article>)}
      </section>
      <Link href={`/${language}/data`} className="inline-block text-sm font-medium text-accent hover:underline mb-10">{d.link} →</Link>
      <GlobalDataDownloads locale={locale} />
    </div>
  );
}
