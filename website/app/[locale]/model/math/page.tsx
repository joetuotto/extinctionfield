import type { Metadata } from "next";
import Link from "next/link";
import { Sigma, Layers } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { MathematicsSections } from "@/app/[locale]/mathematics/page";

type Copy = {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  modelLink: string;
  fieldstateLink: string;
  baseDocTitle: string;
  baseDocText: string;
  nextLabel: string;
  nextTitle: string;
};

const COPY: Record<string, Copy> = {
  en: {
    title: "BERM mathematical specification",
    subtitle:
      "The equations behind the three-level scalar architecture: Lindgren geometry, selection rule, two-channel exposure model, biological capacity, behavioral factor, cultural compensation, Jacobian stability and locked predictions.",
    metaTitle: "BERM mathematics – Extinction Field",
    metaDescription: "The BERM v17 mathematical specification: §1–§11 from geometry to falsification conditions.",
    modelLink: "← Back to model overview",
    fieldstateLink: "FieldState measurement specification",
    baseDocTitle: "LBERM base document",
    baseDocText:
      "The formal Jacobian product structure (chapter 17), the proof-obligation register and the safety-system specification are described in the LBERM base document. They are not reproduced here; this page carries the core equations the BERM predictions depend on.",
    nextLabel: "Next",
    nextTitle: "Evidence registry",
  },
  fi: {
    title: "BERM:n matemaattinen määrittely",
    subtitle:
      "Kolmitasoisen skaalaariarkkitehtuurin yhtälöt: Lindgrenin geometria, valintasääntö, kaksikanavamalli, biologinen kapasiteetti, käyttäytymiskerroin, kulttuurikompensaatio, Jacobiaani ja lukitut ennusteet.",
    metaTitle: "BERM-matematiikka – Extinction Field",
    metaDescription: "BERM v17:n matemaattinen määrittely: §1–§11 geometriasta falsifikaatioehtoihin.",
    modelLink: "← Takaisin mallin yleiskatsaukseen",
    fieldstateLink: "FieldState-mittausmäärittely",
    baseDocTitle: "LBERM-perusdokumentti",
    baseDocText:
      "Formaali Jacobiaani-tulorakenne (luku 17), proof-obligation-rekisteri ja turvajärjestelmien määrittely kuvataan LBERM-perusdokumentissa. Niitä ei toisteta tässä; tämä sivu kantaa ne yhtälöt, joihin BERM:n ennusteet nojaavat.",
    nextLabel: "Seuraavaksi",
    nextTitle: "Evidenssirekisteri",
  },
  ja: {
    title: "BERM 数学的仕様",
    subtitle:
      "三層スカラーアーキテクチャの方程式：Lindgren幾何学、選択則、二チャネル暴露モデル、生物学的容量、行動因子、文化的補償、ヤコビアン安定性およびロック済み予測。",
    metaTitle: "BERM 数学 – Extinction Field",
    metaDescription: "BERM v17 数学的仕様：§1–§11 幾何学から反証条件まで。",
    modelLink: "← モデル概要に戻る",
    fieldstateLink: "FieldState 測定仕様",
    baseDocTitle: "LBERM 基本文書",
    baseDocText:
      "正式なヤコビアン積構造（第17章）、証明義務レジスタおよび安全システム仕様はLBERM基本文書に記載されています。ここでは再掲しません。本ページはBERMの予測が依拠する中核方程式を掲載しています。",
    nextLabel: "次へ",
    nextTitle: "エビデンスレジストリ",
  },
  fr: {
    title: "Spécification mathématique du BERM",
    subtitle:
      "Les équations de l’architecture scalaire à trois niveaux : géométrie de Lindgren, règle de sélection, modèle d’exposition à deux canaux, capacité biologique, facteur comportemental, compensation culturelle, stabilité jacobienne et prédictions verrouillées.",
    metaTitle: "Mathématiques du BERM – Extinction Field",
    metaDescription: "Spécification mathématique du BERM v17 : §1–§11, de la géométrie aux conditions de falsification.",
    modelLink: "← Retour à l’aperçu du modèle",
    fieldstateLink: "Spécification de mesure FieldState",
    baseDocTitle: "Document de base LBERM",
    baseDocText:
      "La structure formelle du produit jacobien (chapitre 17), le registre des obligations de preuve et la spécification du système de sécurité sont décrits dans le document de base LBERM. Ils ne sont pas reproduits ici ; cette page présente les équations fondamentales sur lesquelles reposent les prédictions du BERM.",
    nextLabel: "Suivant",
    nextTitle: "Registre des évidences",
  },
  ko: {
    title: "BERM 수학적 사양",
    subtitle:
      "3계층 스칼라 아키텍처의 방정식: Lindgren 기하학, 선택 규칙, 2채널 노출 모델, 생물학적 용량, 행동 요인, 문화적 보상, 야코비안 안정성 및 잠금된 예측.",
    metaTitle: "BERM 수학 – Extinction Field",
    metaDescription: "BERM v17 수학적 사양: §1–§11 기하학에서 반증 조건까지.",
    modelLink: "← 모델 개요로 돌아가기",
    fieldstateLink: "FieldState 측정 사양",
    baseDocTitle: "LBERM 기본 문서",
    baseDocText:
      "공식적인 야코비안 곱 구조(제17장), 증명 의무 레지스터 및 안전 시스템 사양은 LBERM 기본 문서에 기술되어 있습니다. 여기서는 재현하지 않으며, 본 페이지는 BERM 예측이 의존하는 핵심 방정식을 수록하고 있습니다.",
    nextLabel: "다음",
    nextTitle: "에비던스 레지스트리",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: d.metaTitle, description: d.metaDescription };
}

export default async function MathPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Sigma} title={d.title} subtitle={d.subtitle} />

      <nav className="mb-10 flex flex-wrap gap-3 text-sm">
        <Link href={`/${locale}/model`} className="text-accent hover:underline">{d.modelLink}</Link>
        <span className="text-foreground-muted">&middot;</span>
        <Link href={`/${locale}/model/fieldstate`} className="text-accent hover:underline">{d.fieldstateLink}</Link>
      </nav>

      <MathematicsSections locale={locale} />

      <aside className="mt-10 max-w-4xl rounded-lg border border-card-border bg-card-bg p-5">
        <h3 className="editorial-kicker mb-2 text-foreground-muted">{d.baseDocTitle}</h3>
        <p className="text-sm leading-relaxed text-foreground-muted">{d.baseDocText}</p>
      </aside>

      <NextPageLink
        href={`/${locale}/evidence`}
        label={d.nextLabel}
        title={d.nextTitle}
        icon={Layers}
      />
    </div>
  );
}
