import type { Metadata } from "next";
import { ExplorerDashboard } from "@/components/ExplorerDashboard";
import { WorldMap } from "@/components/WorldMap";

const t = {
  en: {
    title: "Country series explorer",
    subtitle:
      "Published TFR series and technology-adoption timing can be compared across countries with their source scope kept visible.",
    method: "How to read this page",
    a: "A published TFR series is a period demographic measure. It cannot by itself identify a biological mechanism.",
    b: "Mobile subscriptions are used elsewhere on the site only as a technology-adoption timing proxy, not as RF exposure or a causal variable.",
    c: "A v2 country estimate requires measured FieldState inputs, organ/couple endpoints, and ASFR calibration. Those inputs are not yet available as a national panel.",
  },
  fi: {
    title: "Maasarjojen tutkija",
    subtitle:
      "Julkaistuja TFR-sarjoja ja teknologiakäyttöönoton ajoitusta voi vertailla maittain siten, että lähteiden tulkintarajat säilyvät näkyvissä.",
    method: "Näin sivua luetaan",
    a: "Julkaistu TFR-sarja on periodinen demografinen mittari. Se ei yksinään tunnista biologista mekanismia.",
    b: "Mobiililiittymiä käytetään muualla sivustolla vain teknologiakäyttöönoton ajoitusproxyna, ei RF-altistuksena tai kausaalisena muuttujana.",
    c: "V2-maa-arvio vaatii mitatut FieldState-syötteet, elin-/paritason päätepisteet ja ASFR-kalibroinnin. Näitä syötteitä ei vielä ole kansallisena paneelina.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "fi"
    ? {
        title: "Maasarjojen tutkija - Extinction Field",
        description: "Julkaistut TFR-sarjat, teknologiakäyttöönoton ajoitus ja lähteiden tulkintarajat.",
      }
    : {
        title: "Country series explorer - Extinction Field",
        description: "Published TFR series, technology-adoption timing and source interpretation scope.",
      };
}

export default async function ExplorerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const language = locale === "fi" ? "fi" : "en";
  const d = t[language];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{d.title}</h1>
      <p className="mb-8 max-w-4xl leading-relaxed text-foreground-muted">{d.subtitle}</p>

      <ExplorerDashboard locale={language} />

      <section className="mt-10 rounded-xl border border-card-border bg-card-bg p-4 sm:p-6">
        <WorldMap locale={language} />
      </section>

      <div className="mt-12 rounded-lg border border-card-border bg-card-bg p-4 text-sm text-foreground-muted">
        <p className="mb-2 font-semibold text-foreground">{d.method}</p>
        <ul className="space-y-2 leading-relaxed">
          <li>{d.a}</li>
          <li>{d.b}</li>
          <li>{d.c}</li>
        </ul>
      </div>
    </main>
  );
}
