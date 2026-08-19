import type { Metadata } from "next";
import { ExplorerDashboard } from "@/components/ExplorerDashboard";
import { TemporalBacktestExplorer } from "@/components/TemporalBacktestExplorer";

const t = {
  en: {
    title: "Country data explorer",
    subtitle:
      "Published TFR series are shown for descriptive country comparison. The earlier scalar EMF and fertility scenario has been retained only as a clearly labelled LEGACY_TIMING_PROXY archive; it is not a FieldState measurement, dose model, or FieldState–ASFR-v2 forecast.",
    method: "How to read this page",
    a: "A published TFR series is a period demographic measure. It cannot by itself identify a biological mechanism.",
    b: "Mobile subscriptions are used elsewhere on the site only as a technology-adoption timing proxy, not as RF exposure or a causal variable.",
    c: "A v2 country estimate requires measured FieldState inputs, organ/couple endpoints, and ASFR calibration. Those inputs are not yet available as a national panel.",
  },
  fi: {
    title: "Maadata-tutkija",
    subtitle:
      "Julkaistua TFR-sarjaa näytetään kuvailevaa maavertailua varten. Aiempi skalaarinen EMF- ja hedelmällisyysskenaario on säilytetty vain selvästi merkitynä LEGACY_TIMING_PROXY-arkistona; se ei ole FieldState-mittaus, annosmalli eikä FieldState–ASFR-v2-ennuste.",
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
        title: "Maadata-tutkija - Extinction Field",
        description: "Julkaistu TFR-sarja ja arkistoitu teknologia-ajoitusproxy.",
      }
    : {
        title: "Country data explorer - Extinction Field",
        description: "Published TFR series and an archived technology-timing proxy.",
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

      <TemporalBacktestExplorer locale={language} />

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
