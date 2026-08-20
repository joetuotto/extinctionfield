import type { Metadata } from "next";
import { BookOpen, Info } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { ReferenceDatabase } from "@/components/ReferenceDatabase";

const COPY = {
  en: {
    title: "Reference database",
    subtitle:
      "462 references organized into 9 thematic categories spanning field theory, signal transduction, cellular effects, reproduction, neurobiology, ecology, RF regulation, institutional analysis, and therapeutic device mechanisms. 58 source-verified records include curated findings and pathway annotations.",
  },
  fi: {
    title: "Lähdetietokanta",
    subtitle:
      "462 viitettä jaettuna 9 temaattiseen kategoriaan: kenttäteoria, signaalitransduktio, solutason vaikutukset, lisääntyminen, neurobiologia, ekologia, RF-sääntely, institutionaalinen analyysi ja terapeuttiset laitemekanismit. 58 lähdevarmennettua tietuetta sisältää kuratoidut löydökset ja reittiannotoinnit.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function ReferencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={BookOpen} title={d.title} subtitle={d.subtitle} />
      <ReferenceDatabase locale={locale} />

      <NextPageLink
        href={`/${locale === "fi" ? "fi" : "en"}/about`}
        label={locale === "fi" ? "Seuraavaksi" : "Next"}
        title={locale === "fi" ? "Tietoa" : "About"}
        icon={Info}
      />
    </div>
  );
}
