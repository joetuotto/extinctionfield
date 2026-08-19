import type { Metadata } from "next";
import { ExploreTabs } from "@/components/ExploreTabs";
import { PageHeader } from "@/components/PageHeader";
import { Map } from "lucide-react";

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
          "Tutki julkaistuja hedelmällisyyssarjoja, teknologian ajoitusproksia ja FieldState–ASFR-v2:n datavalmiutta.",
      }
    : {
          title: "Explore - Extinction Field",
          description:
          "Explore published fertility series, technology-timing proxy data and FieldState–ASFR-v2 data readiness.",
      };
}

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d =
    locale === "fi"
      ? {
          title: "Tutkija",
          subtitle:
            "Julkaistut TFR-sarjat, teknologian ajoitusproksi ja FieldState–ASFR-v2:n datavalmius yhdessä paikassa.",
        }
      : {
          title: "Explore",
          subtitle:
            "Published TFR series, technology-timing proxy data and FieldState–ASFR-v2 readiness in one place.",
        };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader
        icon={Map}
        title={d.title}
        subtitle={d.subtitle}
      />
      <ExploreTabs locale={locale} />
    </div>
  );
}
