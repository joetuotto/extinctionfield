import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { BookOpen, Info } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { ReferenceDatabase } from "@/components/ReferenceDatabase";
import { pickCopy } from "@/lib/i18n";

// Counts are derived from the reference database at build time so they cannot go stale.
function referenceStats() {
  const file = path.join(process.cwd(), "public", "data", "references_full.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as {
    categories: unknown[];
    references: { verified?: boolean }[];
  };
  return {
    total: data.references.length,
    verified: data.references.filter((r) => r.verified).length,
    categories: data.categories.length,
  };
}

const COPY = {
  en: {
    title: "Reference database",
    subtitle: (s: ReturnType<typeof referenceStats>) =>
      `${s.total} references organized into ${s.categories} thematic categories spanning field theory, signal transduction, cellular effects, reproduction, neurobiology, ecology, RF regulation, and institutional analysis. ${s.verified} source-verified records include curated findings and pathway annotations.`,
    nextLabel: "Next",
    nextTitle: "About",
  },
  fi: {
    title: "Lähdetietokanta",
    subtitle: (s: ReturnType<typeof referenceStats>) =>
      `${s.total} viitettä jaettuna ${s.categories} temaattiseen kategoriaan: kenttäteoria, signaalitransduktio, solutason vaikutukset, lisääntyminen, neurobiologia, ekologia, RF-sääntely ja institutionaalinen analyysi. ${s.verified} lähdevarmennettua tietuetta sisältää valikoidut löydökset ja reittimerkinnät.`,
    nextLabel: "Seuraavaksi",
    nextTitle: "Tietoa",
  },
  ja: {
    title: "参考文献データベース",
    subtitle: (s: ReturnType<typeof referenceStats>) =>
      `${s.total}件の参考文献を${s.categories}のテーマ別カテゴリーに整理：場の理論、シグナル伝達、細胞効果、生殖、神経生物学、生態学、RF規制、制度分析。${s.verified}件の出典確認済みレコードには、精選された知見とパスウェイ注釈が含まれています。`,
    nextLabel: "次へ",
    nextTitle: "概要",
  },
  fr: {
    title: "Base de données de références",
    subtitle: (s: ReturnType<typeof referenceStats>) =>
      `${s.total} références organisées en ${s.categories} catégories thématiques couvrant la théorie des champs, la transduction du signal, les effets cellulaires, la reproduction, la neurobiologie, l'écologie, la réglementation RF et l'analyse institutionnelle. ${s.verified} notices dont la source est vérifiée comprennent des résultats sélectionnés et des annotations de voies.`,
    nextLabel: "Suivant",
    nextTitle: "À propos",
  },
  ko: {
    title: "참고문헌 데이터베이스",
    subtitle: (s: ReturnType<typeof referenceStats>) =>
      `${s.total}개의 참고문헌을 ${s.categories}개의 주제별 카테고리로 구성: 장 이론, 신호 전달, 세포 효과, 생식, 신경생물학, 생태학, RF 규제, 제도 분석. ${s.verified}개의 출처 확인 레코드에는 선별된 연구 결과와 경로 주석이 포함되어 있습니다.`,
    nextLabel: "다음",
    nextTitle: "소개",
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
    title: `${d.title} – Extinction Field`,
    description: d.subtitle(referenceStats()),
  };
}

export default async function ReferencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={BookOpen} title={d.title} subtitle={d.subtitle(referenceStats())} />
      <ReferenceDatabase locale={locale} />

      <NextPageLink
        href={`/${locale}/about`}
        label={d.nextLabel}
        title={d.nextTitle}
        icon={Info}
      />
    </div>
  );
}
