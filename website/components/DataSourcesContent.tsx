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
          ["Fyysinen FieldState", "Tarvitaan kalibroidut paikalliset vektori-, spektri/PSD-, geometria-, B₀-, ajoitus- ja provenienssimittaukset sekä elinkohtainen siirtomalli."],
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
      <section className="mb-10 max-w-4xl">
        <h3 className="text-base font-semibold mb-3">{fi ? "Mittausvalmius maatasoittain" : "Measurement readiness by country tier"}</h3>
        <div className="grid gap-3">
          <div className="border border-status-confirmed/30 bg-status-confirmed/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-status-confirmed">{fi ? "Teknologian ajoitusproxy" : "Technology timing proxy"}</span>
              <span className="text-xs font-mono-num text-foreground-muted">{fi ? "163 maata" : "163 countries"}</span>
            </div>
            <p className="text-xs text-foreground-muted leading-relaxed">{fi ? "Mobiililiittymäsarjat ajoitusproxyna. Ei fysikaalinen FieldState tai RF-annos." : "Mobile subscription series as timing proxy. Not physical FieldState or RF dose."}</p>
          </div>
          <div className="border border-status-partial/30 bg-status-partial/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-status-partial">{fi ? "Osittainen FieldState" : "Partial FieldState"}</span>
              <span className="text-xs font-mono-num text-foreground-muted">{fi ? "Protokolla määritelty" : "Protocol defined"}</span>
            </div>
            <p className="text-xs text-foreground-muted leading-relaxed">{fi ? "ANFR-tyyppisiä RF-mittauksia on olemassa; elinkohtaista siirtomallia ei ole kalibroitu." : "ANFR-type spatial RF measurements exist; organ transfer model not yet calibrated."}</p>
          </div>
          <div className="border border-status-pending/30 bg-status-pending/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-status-pending">{fi ? "Mittausvalmis FieldState" : "Measurement-ready FieldState"}</span>
              <span className="text-xs font-mono-num text-foreground-muted">{fi ? "Ei yhtään maata" : "No countries yet"}</span>
            </div>
            <p className="text-xs text-foreground-muted leading-relaxed">{fi ? "Vaatii dokumentoidut kenttävektorit, elinkohtaisen siirron, biologiset päätepisteet ja paripaneelit." : "Requires documented field vectors, organ-specific transfer, biological endpoints and couple panels."}</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-foreground-muted italic">{fi ? "Mittausvalmis ei tarkoita, että biologinen vaikutus tai tuloskerroin olisi osoitettu." : "Measurement-ready does not mean a biological effect or outcome coefficient has been established."}</p>
      </section>
      <section className="grid gap-4 md:grid-cols-2 mb-8">
        {d.cards.map(([title, text]) => <article key={title} className="rounded-xl border border-card-border bg-card-bg p-5"><h3 className="font-semibold mb-2">{title}</h3><p className="text-sm text-foreground-muted leading-relaxed">{text}</p></article>)}
      </section>
      <Link href={`/${language}/data`} className="inline-block text-sm font-medium text-accent hover:underline mb-10">{d.link} →</Link>
      <GlobalDataDownloads locale={locale} />
    </div>
  );
}
