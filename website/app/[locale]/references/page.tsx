import type { Metadata } from "next";
import { ReferenceDatabase } from "@/components/ReferenceDatabase";
import { FIELDSTATE_EVIDENCE_COUNT } from "@/lib/fieldstateEvidence";

const COPY = {
  en: {
    title: "FieldState–ASFR v2 reference register",
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT} bounded records are mapped to the active causal route. They are curated for field class, directness, scope and limitations; no record is a TFR coefficient. The previous broad A–F collection is retained in the repository as a legacy bibliography, not as the active v2 evidence register.`,
  },
  fi: {
    title: "FieldState–ASFR v2 -lähderekisteri",
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT} rajattua tietuetta on kytketty aktiiviseen kausaalireittiin. Ne on kuratoitu kenttäluokan, suoruuden, tulkintarajan ja rajoitusten mukaan; mikään tietue ei ole TFR-kerroin. Aiempi laaja A–F-kokoelma säilyy repossa legacy-bibliografiana, ei aktiivisena v2-evidenssirekisterinä.`,
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function ReferencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.16em] text-accent font-semibold mb-3">FieldState–ASFR v2</p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted leading-relaxed max-w-3xl">{d.subtitle}</p>
      </header>
      <ReferenceDatabase locale={locale} />
    </div>
  );
}
