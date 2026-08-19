import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EcoStaticInterface } from "@/components/EcoStaticInterface";

const COPY = {
  en: {
    title: "Ecology: static interface",
    subtitle:
      "A bounded ecological research branch on triboelectric host–vegetation–tick interfaces, with direct static-field evidence distinguished from ecology and evolution hypotheses.",
  },
  fi: {
    title: "Ekologia: staattinen rajapinta",
    subtitle:
      "Rajattu ekologinen tutkimushaara triboelektrisistä isäntä–kasvillisuus–punkki-rajapinnoista; suora staattisen kentän näyttö erotetaan ekologia- ja evoluutiohypoteeseista.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EcologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const language = locale === "fi" ? "fi" : "en";
  const d = COPY[language];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Zap} title={d.title} subtitle={d.subtitle} />
      <EcoStaticInterface locale={language} />
    </div>
  );
}
