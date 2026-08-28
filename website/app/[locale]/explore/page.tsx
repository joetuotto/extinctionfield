import type { Metadata } from "next";
import { ExploreTabs } from "@/components/ExploreTabs";
import { PageHeader } from "@/components/PageHeader";
import { Map } from "lucide-react";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Data",
    subtitle: "TFR series, country-level charts, and sentinel indicators in one place.",
    metaDesc: "Explore BERM model data: TFR series, country-level charts, and sentinel indicators.",
  },
  fi: {
    title: "Data",
    subtitle: "TFR-sarjat, maakohtaiset kaaviot ja sentinelli-indikaattorit yhdessä paikassa.",
    metaDesc: "Tutki BERM-mallin dataa: TFR-sarjat, maakohtaiset kaaviot ja sentinelli-indikaattorit.",
  },
  ja: {
    title: "データ",
    subtitle: "TFR系列、国別チャート、センチネル指標を一か所で。",
    metaDesc: "BERMモデルデータの探索：TFR系列、国別チャート、センチネル指標。",
  },
  fr: {
    title: "Données",
    subtitle: "Séries TFR, graphiques par pays et indicateurs sentinelles en un seul endroit.",
    metaDesc: "Explorez les données du modèle BERM : séries TFR, graphiques par pays et indicateurs sentinelles.",
  },
  ko: {
    title: "데이터",
    subtitle: "TFR 시계열, 국가별 차트, 센티널 지표를 한곳에서.",
    metaDesc: "BERM 모델 데이터 탐색: TFR 시계열, 국가별 차트, 센티널 지표.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} - Extinction Field`,
    description: d.metaDesc,
  };
}

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

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
