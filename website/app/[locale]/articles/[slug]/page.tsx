import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Clock, Calendar } from "lucide-react";
import { getArticleBySlug, ARTICLES } from "@/lib/articles";
import type { Locale } from "@/lib/i18n";
import { BeeArticleContent } from "./BeeArticleContent";
import { SpectrumArticleContent } from "./SpectrumArticleContent";
import { ImplausibilityArticleContent } from "./ImplausibilityArticleContent";

const COPY = {
  en: {
    partOf: "This article is part of the",
    framework: "Extinction Field research framework",
    sentinel: "Sentinel Data",
    evidence: "Evidence",
    predictions: "All Predictions",
    minRead: "min read",
    more: "More from Extinction Field",
  },
  fi: {
    partOf: "Tämä artikkeli on osa",
    framework: "Extinction Field -tutkimuskehystä",
    sentinel: "Sentinellidata",
    evidence: "Evidenssi",
    predictions: "Kaikki ennusteet",
    minRead: "min lukuaika",
    more: "Lisää Extinction Fieldistä",
  },
} as const;

export async function generateStaticParams() {
  return ARTICLES.flatMap((a) => [
    { locale: "en", slug: a.slug },
    { locale: "fi", slug: a.slug },
  ]);
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

  const activeLocale: Locale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${activeLocale}`;
  const isFi = activeLocale === "fi";

  const currentIdx = ARTICLES.findIndex((a) => a.slug === slug);
  const prevArticle = currentIdx > 0 ? ARTICLES[currentIdx - 1] : null;
  const nextArticle =
    currentIdx < ARTICLES.length - 1 ? ARTICLES[currentIdx + 1] : null;

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 sm:py-20">
      {/* Hero */}
      <header className="mb-12 sm:mb-16">
        <p className="text-4xl mb-6" aria-hidden="true">
          {article.icon}
        </p>
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
              isFi ? "fi-FI" : "en-US",
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
              width={1200}
              height={630}
              className="w-full h-auto"
              priority
            />
          </div>
        )}
      </header>

      {/* Article body */}
      {slug === "bees" && <BeeArticleContent locale={activeLocale} />}
      {slug === "spectrum" && <SpectrumArticleContent locale={activeLocale} />}
      {slug === "implausibility" && <ImplausibilityArticleContent locale={activeLocale} />}

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
                    {isFi ? "Edellinen" : "Previous"}
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
                    {isFi ? "Seuraava" : "Next"}
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
