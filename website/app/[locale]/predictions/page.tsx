import type { Metadata } from "next";
import { Target } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { FieldStateStatus } from "@/components/FieldStateStatus";

const COPY = {
  en: {
    title: "Archived v17 scenario registry",
    subtitle: "Earlier numeric entries are retained in version-control history as a transparent record of the prior scalar v17 scenario. They are not current FieldState–ASFR-v2 forecasts, exposure estimates or validated population effects.",
    activeTitle: "Active v2 forecast status",
    active: "No country-level numeric FieldState–ASFR-v2 forecasts are published. The current route requires a measurement-ready FieldState, registered organ and couple endpoints, ASFR modelling and external temporal validation before a forecast can be locked.",
    archiveTitle: "Legacy archive boundary",
    archive: "The pre-v2 scalar scenario values remain in version-control history for auditability, but are deliberately not republished as a public country forecast table. They are not comparable with v2 outputs or active BERM projections.",
    laboratoryTitle: "Experimental branch: GME / R42",
    laboratory: "Zandieh et al. (2025) reports frequency-dependent mitochondrial/ROS observations in ELF cancer-cell experiments (0.01–5 Hz; up to 100 mT). This supports an exploratory measured-PSD protocol only. It does not establish RF network-envelope effects, eDRX causality or a reproductive/TFR parameter. Earlier numeric protocol-ordering material is retained only as a legacy archive, not as an active prediction.",
  },
  fi: {
    title: "Arkistoitu v17-skenaariorekisteri",
    subtitle: "Aiemmat numeeriset merkinnät säilyvät versionhallintahistoriassa läpinäkyvänä tietona aiemmasta skalaari-v17-skenaariosta. Ne eivät ole nykyisiä FieldState–ASFR-v2-ennusteita, altistusarvioita tai validoituja väestövaikutuksia.",
    activeTitle: "Aktiivisen v2-ennusteen tila",
    active: "FieldState–ASFR-v2 ei julkaise maakohtaisia numeerisia ennusteita. Nykyinen reitti tarvitsee mittaamisvalmiin FieldStaten, rekisteröidyt elin- ja paripäätepisteet, ASFR-mallinnuksen ja ulkoisen ajallisen validoinnin ennen ennusteen lukitsemista.",
    archiveTitle: "Legacy-arkiston raja",
    archive: "Ennen v2:ta käytetyn skalaariskenaarion arvot säilyvät versionhallintahistoriassa tarkastettavuutta varten, mutta niitä ei julkaista enää julkisena maaennustetaulukkona. Ne eivät ole verrattavissa v2-tuloksiin eivätkä aktiivisia BERM-ennusteita.",
    laboratoryTitle: "Kokeellinen haara: GME / R42",
    laboratory: "Zandieh ym. (2025) raportoi taajuusriippuvaisia mitokondrio-/ROS-havaintoja ELF-syöpäsolukokeissa (0,01–5 Hz; enintään 100 mT). Se tukee vain eksploratiivista mitattua PSD-protokollaa. Se ei osoita RF-verkon verhokäyrävaikutuksia, eDRX-kausaliteettia eikä lisääntymis-/TFR-parametria. Aiempi numeerinen protokollajärjestys säilyy vain legacy-arkistona, ei aktiivisena ennusteena.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function PredictionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Target} title={d.title} subtitle={d.subtitle} />
      <section className="mb-12 rounded-xl border border-status-partial/30 bg-status-partial/5 p-6 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.16em] text-status-partial font-semibold mb-2">FIELDSTATE–ASFR v2</p>
        <h2 className="text-xl font-semibold mb-2">{d.activeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.active}</p>
      </section>
      <section className="mb-12"><FieldStateStatus locale={activeLocale} /></section>
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2">{d.archiveTitle}</h2>
        <p className="max-w-4xl rounded-xl border border-card-border bg-card-bg p-5 text-sm leading-relaxed text-foreground-muted">{d.archive}</p>
      </section>
      <section className="rounded-xl border border-card-border bg-card-bg p-6 max-w-4xl">
        <h2 className="text-xl font-semibold mb-3">{d.laboratoryTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.laboratory}</p>
      </section>
    </div>
  );
}
