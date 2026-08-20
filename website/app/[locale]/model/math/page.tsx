import type { Metadata } from "next";
import Link from "next/link";
import { Sigma, Layers } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { MathematicsSections } from "@/app/[locale]/mathematics/page";

const COPY = {
  en: {
    title: "Mathematical specification",
    subtitle:
      "The equations that state the active data contract, the organ-state structure and the boundary between a descriptive timing proxy and a calibratable FieldState result.",
    metaTitle: "FieldState–ASFR mathematics – Extinction Field",
    metaDescription: "The measurement-aware FieldState–ASFR-v2 mathematical specification of BERM.",
    modelLink: "← Back to model overview",
    fieldstateLink: "FieldState measurement specification",
    baseDocTitle: "Not reproduced on this page",
    baseDocText:
      "The formal Jacobian product structure (chapter 17), the proof-obligation register and the safety-system specification are described in the LBERM base document. They are not reproduced here; this page carries the measurement contract and the equations the published results depend on.",
  },
  fi: {
    title: "Matemaattinen määrittely",
    subtitle:
      "Yhtälöt, jotka määrittelevät aktiivisen datakontraktin, elintilarakenteen sekä rajan kuvailevan ajoitusproxyn ja kalibroitavan FieldState-tuloksen välillä.",
    metaTitle: "FieldState–ASFR-matematiikka – Extinction Field",
    metaDescription: "BERM:n mittaustietoinen FieldState–ASFR-v2:n matemaattinen määrittely.",
    modelLink: "← Takaisin mallin yleiskatsaukseen",
    fieldstateLink: "FieldState-mittausmäärittely",
    baseDocTitle: "Ei toisteta tällä sivulla",
    baseDocText:
      "Formaali Jacobiaani-tulorakenne (luku 17), proof-obligation-rekisteri ja turvajärjestelmien määrittely kuvataan LBERM-perusdokumentissa. Niitä ei toisteta tässä; tämä sivu kantaa mittauskontraktin ja ne yhtälöt, joihin julkaistut tulokset nojaavat.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: d.metaTitle, description: d.metaDescription };
}

export default async function MathPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = COPY[language];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Sigma} title={d.title} subtitle={d.subtitle} />

      <nav className="mb-10 flex flex-wrap gap-3 text-sm">
        <Link href={`/${language}/model`} className="text-accent hover:underline">{d.modelLink}</Link>
        <span className="text-foreground-muted">·</span>
        <Link href={`/${language}/model/fieldstate`} className="text-accent hover:underline">{d.fieldstateLink}</Link>
      </nav>

      <MathematicsSections locale={language} />

      <aside className="mt-10 max-w-4xl rounded-lg border border-card-border bg-card-bg p-5">
        <h3 className="editorial-kicker mb-2 text-foreground-muted">{d.baseDocTitle}</h3>
        <p className="text-sm leading-relaxed text-foreground-muted">{d.baseDocText}</p>
      </aside>

      <NextPageLink
        href={`/${language}/evidence`}
        label={language === "fi" ? "Seuraavaksi" : "Next"}
        title={language === "fi" ? "Evidenssirekisteri" : "Evidence registry"}
        icon={Layers}
      />
    </div>
  );
}
