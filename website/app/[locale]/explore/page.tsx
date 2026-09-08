import type { Metadata } from "next";
import { ExploreTabs } from "@/components/ExploreTabs";
import { SteroidogenesisDataAccess } from "@/components/SteroidogenesisDataAccess";
import { PageHeader } from "@/components/PageHeader";
import { Map } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { TranslationNotice } from "@/components/TranslationNotice";

const COPY = {
  en: {
    title: "Change atlas",
    subtitle: "Five countries. A shared timeline. From technological environments to biological change.",
    metaDesc: "Explore historical field environments, fertility, hormones, health and sentinel species through source-based timelines and conditional BERM scenarios.",
  },
  fi: {
    title: "Muutosatlas",
    subtitle: "Viisi maata. Yhteinen aikajana. Teknologisesta ympäristöstä biologiseen muutokseen.",
    metaDesc: "Tutki kenttäympäristön historiaa, syntyvyyttä, hormoneja, sairauksia ja sentinellilajeja lähteistettyjen aikasarjojen ja ehdollisten BERM-skenaarioiden avulla.",
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <TranslationNotice copy={{ en: COPY.en, fi: COPY.fi }} locale={locale} />
      <PageHeader
        icon={Map}
        title={d.title}
        subtitle={d.subtitle}
      />
      <ExploreTabs locale={locale} />
      <SteroidogenesisDataAccess locale={locale} />
    </div>
  );
}
