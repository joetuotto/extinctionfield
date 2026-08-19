import { Download, FileJson2, FileSpreadsheet } from "lucide-react";

type Locale = "en" | "fi";

const copy = {
  en: {
    title: "Global validation artefacts",
    description:
      "Download the published country-year table, coverage summary, and validation summary. These files expose inputs, tier membership, and reported metrics; they do not represent a set of future TFR predictions.",
    core: "Core 51 membership is locked in the tier artefact before validation reporting.",
    summary: "Panel coverage summary (JSON)",
    summaryDetail: "Publication metadata, coverage, source-panel identity, and field availability.",
    csvPanel: "Country-year panel (CSV)",
    csvPanelDetail: "Flattened no-imputation table for spreadsheet and statistical workflows.",
    validation: "Global validation summary (JSON)",
    validationDetail: "Tier membership, released scenarios, and aggregate metrics only.",
    download: "Download",
  },
  fi: {
    title: "Globaalin validoinnin artefaktit",
    description:
      "Lataa julkaistu maa–vuosi-taulukko, kattavuusyhteenveto ja validointiyhteenveto. Tiedostot avaavat syötteet, tasojäsenyyden ja raportoidut mittarit; ne eivät ole tulevien TFR-ennusteiden joukko.",
    core: "Core 51 -jäsenyys lukitaan tasoartefaktissa ennen validointiraportointia.",
    summary: "Paneelin kattavuusyhteenveto (JSON)",
    summaryDetail: "Julkaisumetadatat, kattavuus, lähdepaneelin tunniste ja kenttien saatavuus.",
    csvPanel: "Maa–vuosi-paneeli (CSV)",
    csvPanelDetail: "Litteä, ilman imputointia julkaistu taulukko laskentataulukko- ja tilastotyöhön.",
    validation: "Globaalin validoinnin yhteenveto (JSON)",
    validationDetail: "Vain tasojäsenyys, julkaistut skenaariot ja koontimittarit.",
    download: "Lataa",
  },
} as const;

export function GlobalDataDownloads({ locale }: { locale: string }) {
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = copy[language];
  const files = [
    {
      href: "/data/global_panel_summary.json",
      title: d.summary,
      detail: d.summaryDetail,
      icon: FileJson2,
    },
    {
      href: "/data/global_panel.csv",
      title: d.csvPanel,
      detail: d.csvPanelDetail,
      icon: FileSpreadsheet,
    },
    {
      href: "/data/global_validation.json",
      title: d.validation,
      detail: d.validationDetail,
      icon: FileJson2,
    },
  ];

  return (
    <section className="mb-14">
      <h2 className="text-xl font-semibold mb-2">{d.title}</h2>
      <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.description}</p>
      <p className="mt-3 max-w-3xl rounded-lg border border-accent/25 bg-accent/5 p-3 text-xs leading-relaxed text-foreground-muted">
        {d.core}
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {files.map(({ href, title, detail, icon: Icon }) => (
          <a
            key={href}
            href={href}
            download
            className="group rounded-lg border border-card-border bg-card-bg p-4 transition-colors hover:border-accent/50 hover:bg-accent/5"
          >
            <div className="flex items-start justify-between gap-3">
              <Icon size={18} className="mt-0.5 text-accent" aria-hidden="true" />
              <Download size={16} className="text-foreground-muted transition-colors group-hover:text-accent" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-sm font-semibold">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-foreground-muted">{detail}</p>
            <span className="mt-4 inline-block text-xs font-medium text-accent">{d.download} →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
