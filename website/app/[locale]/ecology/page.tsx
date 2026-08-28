import type { Metadata } from "next";
import { Zap, Target } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { EcoTickHero } from "@/components/EcoTickHero";
import { EcoStaticInterface } from "@/components/EcoStaticInterface";

const COPY = {
  en: {
    title: "Ecology: FieldState and selection",
    subtitle:
      "BERM–Eco distinguishes static, ELF, geomagnetic and RF FieldStates; natural field use, measured anthropogenic response, ecological sorting and evolution remain separate claims.",
    nextLabel: "Next",
    nextTitle: "Predictions",
  },
  fi: {
    title: "Ekologia: FieldState ja valikoituminen",
    subtitle:
      "BERM–Eco erottaa staattiset, ELF-, geomagneettiset ja RF-FieldStatet sekä luonnollisen kentänkäytön, mitatun antropogeenisen vasteen, ekologisen lajittumisen ja evoluution toisistaan.",
    nextLabel: "Seuraavaksi",
    nextTitle: "Ennusteet",
  },
  ja: {
    title: "生態学：FieldStateと選択",
    subtitle:
      "BERM–Ecoは静的、ELF、地磁気、RF FieldStateを区別します。自然の場の利用、測定された人為的応答、生態学的選別、進化は別個の主張として維持されます。",
    nextLabel: "次へ",
    nextTitle: "予測",
  },
  fr: {
    title: "Écologie : FieldState et sélection",
    subtitle:
      "BERM–Eco distingue les FieldStates statique, ELF, géomagnétique et RF ; l'utilisation naturelle du champ, la réponse anthropogénique mesurée, le tri écologique et l'évolution restent des affirmations distinctes.",
    nextLabel: "Suivant",
    nextTitle: "Prédictions",
  },
  ko: {
    title: "생태학: FieldState와 선택",
    subtitle:
      "BERM–Eco는 정적, ELF, 지자기, RF FieldState를 구분합니다. 자연적 장 이용, 측정된 인위적 반응, 생태학적 분류, 진화는 별개의 주장으로 유지됩니다.",
    nextLabel: "다음",
    nextTitle: "예측",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EcologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Zap} title={d.title} subtitle={d.subtitle} />
      <EcoTickHero locale={locale} />
      <EcoStaticInterface locale={locale} />

      <NextPageLink
        href={`/${locale}/predictions`}
        label={d.nextLabel}
        title={d.nextTitle}
        icon={Target}
      />
    </div>
  );
}
