import type { Metadata } from "next";
import { ExplorerDashboard } from "@/components/ExplorerDashboard";
import { HousingEMF } from "@/components/HousingEMF";
import { TemporalBacktestExplorer } from "@/components/TemporalBacktestExplorer";
import type { Locale } from "@/lib/i18n";

const t = {
  en: {
    title: "Explorer",
    subtitle:
      "Select a country to view its EMF exposure history, biological impact trajectory, and fertility predictions from the BERM model. All values are computed from the model — nothing is hardcoded. Observed TFR data from World Bank.",
    howToRead: "How to read these charts",
    exposureTab:
      "Exposure tab: Shows how ambient (infrastructure) and personal (device) EMF exposure have grown over time. The cumulative sum drives the biological model.",
    biologyTab:
      "Biology tab: Biological capacity (blue) is the maximum TFR the population could achieve given its EMF exposure. Behavioral factor (green) captures endocrine-mediated motivation changes. Their product (yellow dashed) is the biological potential before cultural factors.",
    fertilityTab:
      "Fertility tab: Blue line = model prediction. Yellow dashed line = native TFR (excluding immigrant fertility contribution). Gray dots = observed World Bank data. The model is calibrated at 2024 (predicted = observed by construction). The shaded region after 2024 is the forecast with approximate confidence interval.",
  },
  fi: {
    title: "Tutkija",
    subtitle:
      "Valitse maa nähdäksesi sen EMF-altistushistorian, biologisen vaikutuksen kehityskulun ja hedelmällisyysennusteet BERM-mallista. Kaikki arvot lasketaan mallista — mitään ei ole kovakoodattu. Havaittu TFR-data Maailmanpankista.",
    howToRead: "Kuinka lukea näitä kaavioita",
    exposureTab:
      "Altistus-välilehti: Näyttää miten ympäristön (infrastruktuuri) ja henkilökohtainen (laitteet) EMF-altistus on kasvanut ajan myötä. Kumulatiivinen summa ohjaa biologista mallia.",
    biologyTab:
      "Biologia-välilehti: Biologinen kapasiteetti (sininen) on maksimi-TFR, jonka väestö voisi saavuttaa EMF-altistuksellaan. Käyttäytymiskerroin (vihreä) kuvaa endokriinivälitteisiä motivaatiomuutoksia. Niiden tulo (keltainen katkoviiva) on biologinen potentiaali ennen kulttuuritekijöitä.",
    fertilityTab:
      "Hedelmällisyys-välilehti: Sininen viiva = mallin ennuste. Keltainen katkoviiva = natiivi TFR (ilman maahanmuuttajien hedelmällisyyskontribuutiota). Harmaat pisteet = havaittu Maailmanpankin data. Malli on kalibroitu vuoteen 2024 (ennuste = havaittu rakenteellisesti). Varjostettu alue vuoden 2024 jälkeen on ennuste likimääräisellä luottamusvälillä.",
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
        title: "Tutkija - Extinction Field",
        description:
          "Interaktiivinen maatason EMF-altistuksen ja hedelmällisyyden tutkija.",
      }
    : {
        title: "Explorer - Extinction Field",
        description:
          "Interactive country-level EMF exposure and fertility explorer.",
      };
}

export default async function ExplorerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{d.title}</h1>
      <p className="text-foreground-muted mb-8 max-w-3xl leading-relaxed">
        {d.subtitle}
      </p>

      <ExplorerDashboard />

      <TemporalBacktestExplorer locale={locale} />

      <div className="mt-12">
        <HousingEMF locale={locale} />
      </div>

      <div className="mt-12 p-4 bg-card-bg border border-card-border rounded-lg text-xs text-foreground-muted">
        <p className="font-semibold text-foreground mb-1">{d.howToRead}</p>
        <p>
          <strong>{locale === "fi" ? "Altistus:" : "Exposure tab:"}</strong>{" "}
          {d.exposureTab.replace(/^(Exposure tab|Altistus-välilehti): /, "")}
        </p>
        <p className="mt-1">
          <strong>{locale === "fi" ? "Biologia:" : "Biology tab:"}</strong>{" "}
          {d.biologyTab.replace(/^(Biology tab|Biologia-välilehti): /, "")}
        </p>
        <p className="mt-1">
          <strong>
            {locale === "fi" ? "Hedelmällisyys:" : "Fertility tab:"}
          </strong>{" "}
          {d.fertilityTab.replace(
            /^(Fertility tab|Hedelmällisyys-välilehti): /,
            "",
          )}
        </p>
      </div>
    </main>
  );
}
