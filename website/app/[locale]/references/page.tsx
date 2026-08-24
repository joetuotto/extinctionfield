import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { BookOpen, Info } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { ReferenceDatabase } from "@/components/ReferenceDatabase";

// Counts are derived from the reference database at build time so they cannot go stale.
function referenceStats() {
  const file = path.join(process.cwd(), "public", "data", "references_full.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as {
    categories: unknown[];
    references: { verified?: boolean }[];
  };
  return {
    total: data.references.length,
    verified: data.references.filter((r) => r.verified).length,
    categories: data.categories.length,
  };
}

const COPY = {
  en: {
    title: "Reference database",
    subtitle: (s: ReturnType<typeof referenceStats>) =>
      `${s.total} references organized into ${s.categories} thematic categories spanning field theory, signal transduction, cellular effects, reproduction, neurobiology, ecology, RF regulation, and institutional analysis. ${s.verified} source-verified records include curated findings and pathway annotations.`,
  },
  fi: {
    title: "Lähdetietokanta",
    subtitle: (s: ReturnType<typeof referenceStats>) =>
      `${s.total} viitettä jaettuna ${s.categories} temaattiseen kategoriaan: kenttäteoria, signaalitransduktio, solutason vaikutukset, lisääntyminen, neurobiologia, ekologia, RF-sääntely ja institutionaalinen analyysi. ${s.verified} lähdevarmennettua tietuetta sisältää kuratoidut löydökset ja reittiannotoinnit.`,
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
    description: d.subtitle(referenceStats()),
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
      <PageHeader icon={BookOpen} title={d.title} subtitle={d.subtitle(referenceStats())} />
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
