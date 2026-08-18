import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { ReferenceDatabase } from "@/components/ReferenceDatabase";

const t = {
  en: {
    metaTitle: "Reference Database - Extinction Field",
    metaDescription:
      "Searchable database of all studies cited in the BERM model, organized by pathway, epistemic level, and study type.",
    title: "Reference Database",
    subtitle:
      "All studies cited in the BERM model. Search by author, title, keyword, or tag. Filter by pathway, epistemic level, or study type. Click any entry to expand.",
    db: {
      searchPlaceholder: "Search by author, title, keyword, or tag...",
      pathwayFilter: "Pathway",
      levelFilter: "Epistemic level",
      typeFilter: "Study type",
      allPathways: "All pathways",
      allLevels: "All levels",
      allTypes: "All types",
      nLabel: "N =",
      resultsCount: "{count} / {total} studies",
      noResults: "No studies match the current filters.",
      clearFilters: "Clear filters",
      pathwayLabel: "Pathways",
      tagsLabel: "Tags",
    },
  },
  fi: {
    metaTitle: "Lahdetietokanta - Extinction Field",
    metaDescription:
      "Haettava tietokanta kaikista BERM-mallissa viitatuista tutkimuksista, jarjestetty reitin, episteemisen tason ja tutkimustyypin mukaan.",
    title: "Lahdetietokanta",
    subtitle:
      "Kaikki BERM-mallissa viitatut tutkimukset. Hae tekijan, otsikon, avainsanan tai tagin perusteella. Suodata reitin, episteemisen tason tai tutkimustyypin mukaan. Klikkaa laajentaaksesi.",
    db: {
      searchPlaceholder: "Hae tekijan, otsikon, avainsanan tai tagin perusteella...",
      pathwayFilter: "Reitti",
      levelFilter: "Episteeminen taso",
      typeFilter: "Tutkimustyyppi",
      allPathways: "Kaikki reitit",
      allLevels: "Kaikki tasot",
      allTypes: "Kaikki tyypit",
      nLabel: "N =",
      resultsCount: "{count} / {total} tutkimusta",
      noResults: "Yksikaan tutkimus ei vastaa nykyisia suodattimia.",
      clearFilters: "Tyhjenna suodattimet",
      pathwayLabel: "Reitit",
      tagsLabel: "Tagit",
    },
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = t[(locale as Locale) in t ? (locale as Locale) : "en"];
  return {
    title: d.metaTitle,
    description: d.metaDescription,
  };
}

export default async function ReferencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[(locale as Locale) in t ? (locale as Locale) : "en"];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted leading-relaxed max-w-2xl">
          {d.subtitle}
        </p>
      </header>

      <ReferenceDatabase locale={locale} translations={d.db} />
    </div>
  );
}
