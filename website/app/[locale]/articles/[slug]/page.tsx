import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Clock, Calendar } from "lucide-react";
import { getArticleBySlug, ARTICLES } from "@/lib/articles";
import { pickCopy, locales } from "@/lib/i18n";
import { BermIcon } from "@/components/BermIcon";
import { BeeArticleContent } from "./BeeArticleContent";
import { SpectrumArticleContent } from "./SpectrumArticleContent";
import { ImplausibilityArticleContent } from "./ImplausibilityArticleContent";
import { DualLockArticleContent } from "./DualLockArticleContent";
import { ThirteenPhenomenaContent } from "./ThirteenPhenomenaContent";

const COPY = {
  en: {
    partOf: "This article is part of the",
    framework: "Extinction Field research framework",
    sentinel: "Sentinel Data",
    evidence: "Evidence",
    predictions: "All Predictions",
    minRead: "min read",
    more: "More from Extinction Field",
    prevLabel: "Previous",
    nextLabel: "Next",
  },
  fi: {
    partOf: "Tämä artikkeli on osa",
    framework: "Extinction Field -tutkimuskehystä",
    sentinel: "Sentinellidata",
    evidence: "Evidenssi",
    predictions: "Kaikki ennusteet",
    minRead: "min lukuaika",
    more: "Lisää Extinction Fieldistä",
    prevLabel: "Edellinen",
    nextLabel: "Seuraava",
  },
  ja: {
    partOf: "この記事は",
    framework: "Extinction Field研究フレームワーク",
    sentinel: "センチネルデータ",
    evidence: "エビデンス",
    predictions: "すべての予測",
    minRead: "分で読む",
    more: "Extinction Fieldのその他の記事",
    prevLabel: "前へ",
    nextLabel: "次へ",
  },
  fr: {
    partOf: "Cet article fait partie du",
    framework: "cadre de recherche Extinction Field",
    sentinel: "Données sentinelles",
    evidence: "Preuves",
    predictions: "Toutes les prédictions",
    minRead: "min de lecture",
    more: "Plus d'Extinction Field",
    prevLabel: "Précédent",
    nextLabel: "Suivant",
  },
  ko: {
    partOf: "이 기사는",
    framework: "Extinction Field 연구 프레임워크",
    sentinel: "센티널 데이터",
    evidence: "증거",
    predictions: "모든 예측",
    minRead: "분 읽기",
    more: "Extinction Field에서 더 보기",
    prevLabel: "이전",
    nextLabel: "다음",
  },
} as const;

const DATE_LOCALES: Record<string, string> = {
  en: "en-US", fi: "fi-FI", ja: "ja-JP", fr: "fr-FR", ko: "ko-KR",
};

export async function generateStaticParams() {
  return ARTICLES.flatMap((a) =>
    locales.map((locale) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const isFi = locale === "fi";
  return {
    title: `${isFi ? article.titleFi : article.title} – Extinction Field`,
    description: isFi ? article.subtitleFi : article.subtitle,
    openGraph: article.ogImage
      ? { images: [{ url: article.ogImage, width: 1200, height: 630 }] }
      : undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;
  const isFi = locale === "fi";

  const currentIdx = ARTICLES.findIndex((a) => a.slug === slug);
  const prevArticle = currentIdx > 0 ? ARTICLES[currentIdx - 1] : null;
  const nextArticle =
    currentIdx < ARTICLES.length - 1 ? ARTICLES[currentIdx + 1] : null;

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 sm:py-20">
      {/* Hero */}
      <header className="mb-12 sm:mb-16">
        {!article.heroImage && (
          <p className="mb-6 text-foreground-muted" aria-hidden="true">
            <BermIcon name={article.icon} size={40} />
          </p>
        )}
        <h1 className="font-serif text-3xl sm:text-[2.75rem] leading-[1.15] tracking-[-0.02em] mb-5">
          {isFi ? article.titleFi : article.title}
        </h1>
        <p className="text-lg sm:text-xl text-foreground-muted leading-relaxed mb-6">
          {isFi ? article.subtitleFi : article.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
          <span>Otto Juote</span>
          <span className="text-foreground-muted/40">·</span>
          <span>MSc LSE</span>
          <span className="text-foreground-muted/40">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} />
            {new Date(article.publishedDate).toLocaleDateString(
              DATE_LOCALES[locale] ?? "en-US",
              { year: "numeric", month: "long", day: "numeric" },
            )}
          </span>
          <span className="text-foreground-muted/40">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {article.readingTimeMinutes} {d.minRead}
          </span>
        </div>
        {article.heroImage && (
          <div className="mt-8 rounded-xl overflow-hidden border border-card-border">
            <Image
              src={article.heroImage}
              alt={isFi ? article.titleFi : article.title}
              width={1448}
              height={1086}
              className="w-full h-auto"
              priority
            />
          </div>
        )}
      </header>

      {/* Article body */}
      {slug === "bees" && <BeeArticleContent locale={locale} />}
      {slug === "spectrum" && <SpectrumArticleContent locale={locale} />}
      {slug === "implausibility" && <ImplausibilityArticleContent locale={locale} />}
      {slug === "dual-lock" && <DualLockArticleContent locale={locale} />}
      {slug === "thirteen-phenomena" && <ThirteenPhenomenaContent locale={locale} />}

      {/* End navigation */}
      <footer className="mt-16 pt-8 border-t border-card-border">
        <p className="text-sm text-foreground-muted mb-6">
          {d.partOf}{" "}
          <Link href={prefix} className="text-accent hover:underline">
            {d.framework}
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`${prefix}/sentinel`}
            className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
          >
            {d.sentinel} <ArrowRight size={14} />
          </Link>
          <Link
            href={`${prefix}/evidence`}
            className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
          >
            {d.evidence} <ArrowRight size={14} />
          </Link>
          <Link
            href={`${prefix}/predictions`}
            className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
          >
            {d.predictions} <ArrowRight size={14} />
          </Link>
        </div>

        {/* Prev / Next article */}
        {(prevArticle || nextArticle) && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {prevArticle && (
              <Link
                href={`${prefix}/articles/${prevArticle.slug}`}
                className="flex items-center gap-3 rounded-lg border border-card-border bg-card-bg p-4 transition-colors hover:border-accent/40"
              >
                <ArrowLeft size={16} className="text-foreground-muted shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-foreground-muted">
                    {d.prevLabel}
                  </p>
                  <p className="text-sm font-medium truncate">
                    {isFi ? prevArticle.titleFi : prevArticle.title}
                  </p>
                </div>
              </Link>
            )}
            {nextArticle && (
              <Link
                href={`${prefix}/articles/${nextArticle.slug}`}
                className="flex items-center justify-end gap-3 rounded-lg border border-card-border bg-card-bg p-4 transition-colors hover:border-accent/40 sm:col-start-2"
              >
                <div className="min-w-0 text-right">
                  <p className="text-xs text-foreground-muted">
                    {d.nextLabel}
                  </p>
                  <p className="text-sm font-medium truncate">
                    {isFi ? nextArticle.titleFi : nextArticle.title}
                  </p>
                </div>
                <ArrowRight size={16} className="text-foreground-muted shrink-0" />
              </Link>
            )}
          </div>
        )}
      </footer>
    </article>
  );
}
