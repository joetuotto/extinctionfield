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
          title: "Data - Extinction Field",
          description:
          "Tutki BERM-mallin dataa: TFR-sarjat, maakohtaiset kaaviot ja sentinelli-indikaattorit.",
      }
    : {
          title: "Data - Extinction Field",
          description:
          "Explore BERM model data: TFR series, country-level charts, and sentinel indicators.",
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
          title: "Data",
          subtitle:
            "TFR-sarjat, maakohtaiset kaaviot ja sentinelli-indikaattorit yhdessä paikassa.",
        }
      : {
          title: "Data",
          subtitle:
            "TFR series, country-level charts, and sentinel indicators in one place.",
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
