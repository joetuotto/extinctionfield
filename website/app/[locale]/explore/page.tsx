import type { Metadata } from "next";
import { ExploreTabs } from "@/components/ExploreTabs";

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
          "Tutki BERM-mallin dataa: maailmankartta, maakohtaiset kaaviot ja datalähteet.",
      }
    : {
        title: "Explore - Extinction Field",
        description:
          "Explore BERM model data: world map, country-level charts, and data sources.",
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
            "Kartta, maakohtaiset kaaviot ja datalähteet yhdessä paikassa.",
        }
      : {
          title: "Explore",
          subtitle:
            "Map, country-level charts, and data sources in one place.",
        };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{d.title}</h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          {d.subtitle}
        </p>
      </header>
      <ExploreTabs locale={locale} />
    </div>
  );
}
