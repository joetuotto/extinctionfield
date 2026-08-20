import type { Metadata } from "next";
import { Zap, Target } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { EcoTickHero } from "@/components/EcoTickHero";
import { EcoStaticInterface } from "@/components/EcoStaticInterface";

const COPY = {
  en: {
    title: "Ecology: FieldState and selection",
    subtitle:
      "BERM–Eco distinguishes static, ELF, geomagnetic and RF FieldStates; natural field use, measured anthropogenic response, ecological sorting and evolution remain separate claims.",
  },
  fi: {
    title: "Ekologia: FieldState ja valikoituminen",
    subtitle:
      "BERM–Eco erottaa staattiset, ELF-, geomagneettiset ja RF-FieldStatet sekä luonnollisen kentänkäytön, mitatun antropogeenisen vasteen, ekologisen lajittumisen ja evoluution toisistaan.",
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
      <EcoTickHero locale={language} />
      <EcoStaticInterface locale={language} />

      <NextPageLink
        href={`/${language}/predictions`}
        label={language === "fi" ? "Seuraavaksi" : "Next"}
        title={language === "fi" ? "Ennusteet" : "Predictions"}
        icon={Target}
      />
    </div>
  );
}
