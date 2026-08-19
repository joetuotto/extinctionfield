import type { Metadata } from "next";
import { History } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const COPY = {
  en: {
    title: "Research history and revision record",
    subtitle: "How BERM moved from a scalar population narrative toward a measurement-aware FieldState–ASFR research specification.",
    entries: [
      ["Early formulation", "The project initially combined technology proxies, cumulative scalar exposure and national TFR. That structure could generate country curves, but it did not separately identify physical field state, organ response or demographic mechanisms."],
      ["Evidence audit", "Source checking showed that studies differ sharply by field class, system, frequency, intensity, temperature control and endpoint. Blood–testis barrier, ovarian and circadian findings motivated organ-specific branches; unreliable barrier rows and mistaken citations were removed rather than carried forward."],
      ["Lindgren-derived measurement hypotheses", "Background dependence, vector orientation, local geometry, spectral content and timing became explicit experimental variables. They are retained as testable upstream premises, not as a direct estimate of human reproductive risk or TFR."],
      ["FieldState–ASFR v2", "The active route now keeps FieldState, organ-local transfer, reversible/persistent organ state, couple capacity, ASFR and TFR distinct. It treats mobile subscriptions as a descriptive technology-timing proxy only."],
      ["What remains open", "A matched panel of measured FieldState, organ/couple endpoints and ASFR has not yet been assembled. Earlier v16/v17 country forecasts, backcasts and derived capacity curves remain labelled historical scenario artefacts rather than active v2 results."],
    ],
    note: "This revision record is deliberately substantive: a model becomes more useful when unsupported conversions and stale claims are removed, not when they are relabelled as evidence.",
  },
  fi: {
    title: "Tutkimushistoria ja korjausmerkinnät",
    subtitle: "Miten BERM siirtyi skalaari-väestönarratiivista mittaustietoiseen FieldState–ASFR-tutkimusmäärittelyyn.",
    entries: [
      ["Varhainen muotoilu", "Projekti yhdisti aluksi teknologiaproksit, kumulatiivisen skalaari-altistuksen ja kansallisen TFR:n. Rakenne pystyi tuottamaan maakohtaisia käyriä, mutta se ei erottanut fysikaalista kenttätilaa, elinvastetta eikä demografisia mekanismeja."],
      ["Evidenssiaudit", "Lähteiden tarkistus osoitti, että tutkimukset eroavat voimakkaasti kenttäluokan, järjestelmän, taajuuden, intensiteetin, lämpökontrollin ja päätepisteen mukaan. Veri–kiveseste-, munasarja- ja vuorokausilöydökset motivoivat elinkohtaisia haaroja; epäluotettavat esterivit ja virheviitteet poistettiin niiden säilyttämisen sijaan."],
      ["Lindgrenistä johdetut mittaushypoteesit", "Taustariippuvuus, vektorin orientaatio, paikallinen geometria, spektrisisältö ja ajoitus nostettiin eksplisiittisiksi kokeellisiksi muuttujiksi. Ne säilyvät testattavina upstream-premisseinä, eivät suoraan ihmisen lisääntymisriskin tai TFR:n estimaattina."],
      ["FieldState–ASFR v2", "Aktiivinen reitti pitää FieldStaten, elinkohtaisen siirron, palautuvan/persistentin elintilan, parikapasiteetin, ASFR:n ja TFR:n erillisinä. Mobiililiittymiä käsitellään vain kuvailevana teknologian ajoitusproxyna."],
      ["Mikä on vielä avoinna", "Kohdistettua mitatun FieldStaten, elin-/paripäätepisteiden ja ASFR:n paneelia ei vielä ole. Aiemmat v16/v17-maennusteet, hindcastit ja johdetut kapasiteettikäyrät säilyvät historiallisina skenaarioartefakteina, eivät aktiivisina v2-tuloksina."],
    ],
    note: "Korjausmerkintä on tarkoituksella sisällöllinen: malli muuttuu hyödyllisemmäksi, kun perusteettomat muunnokset ja vanhentuneet väitteet poistetaan, ei kun ne nimetään uudelleen evidenssiksi.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function HistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <PageHeader icon={History} title={d.title} subtitle={d.subtitle} />
      <ol className="space-y-5 max-w-3xl">
        {d.entries.map(([title, text], index) => (
          <li key={title} className="flex gap-4">
            <span className="shrink-0 mt-0.5 font-mono-num text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
            <article className="border border-card-border bg-card-bg rounded-xl p-5">
              <h2 className="font-semibold mb-2">{title}</h2>
              <p className="text-sm text-foreground-muted leading-relaxed">{text}</p>
            </article>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-3xl rounded-xl border border-status-partial/30 bg-status-partial/5 p-5 text-sm text-foreground-muted leading-relaxed">{d.note}</p>
    </div>
  );
}
