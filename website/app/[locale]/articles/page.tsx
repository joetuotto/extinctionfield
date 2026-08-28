import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { ARTICLES } from "@/lib/articles";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Articles",
    subtitle:
      "Long-form essays exploring the science, history, and implications of the BERM framework.",
    minRead: "min read",
    readMore: "Read article",
  },
  fi: {
    title: "Artikkelit",
    subtitle:
      "Pitkämuotoiset esseet BERM-viitekehyksen tieteestä, historiasta ja vaikutuksista.",
    minRead: "min lukuaika",
    readMore: "Lue artikkeli",
  },
  ja: {
    title: "記事",
    subtitle:
      "BERMフレームワークの科学、歴史、そしてその意味を探る長編エッセイ。",
    minRead: "分で読む",
    readMore: "記事を読む",
  },
  fr: {
    title: "Articles",
    subtitle:
      "Essais approfondis explorant la science, l'histoire et les implications du cadre BERM.",
    minRead: "min de lecture",
    readMore: "Lire l'article",
  },
  ko: {
    title: "기사",
    subtitle:
      "BERM 프레임워크의 과학, 역사 및 함의를 탐구하는 장문 에세이.",
    minRead: "분 읽기",
    readMore: "기사 읽기",
  },
} as const;

const DATE_LOCALES: Record<string, string> = {
  en: "en-US", fi: "fi-FI", ja: "ja-JP", fr: "fr-FR", ko: "ko-KR",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const isFi = locale === "fi";
  const prefix = `/${locale}`;

  const sorted = [...ARTICLES].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <header className="mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl tracking-[-0.02em] mb-4">
          {d.title}
        </h1>
        <p className="text-lg text-foreground-muted leading-relaxed max-w-2xl">
          {d.subtitle}
        </p>
      </header>

      <div className="space-y-6">
        {sorted.map((article) => (
          <Link
            key={article.slug}
            href={`${prefix}/articles/${article.slug}`}
            className="group block rounded-xl border border-card-border bg-card-bg p-5 sm:p-6 transition-colors hover:border-accent/40"
          >
            <div className="flex gap-5">
              {article.thumbImage && (
                <div className="hidden sm:block shrink-0 w-28 h-28 rounded-lg overflow-hidden">
                  <Image
                    src={article.thumbImage}
                    alt=""
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h2 className="mb-2 text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
                  {isFi ? article.titleFi : article.title}
                </h2>
                <p className="text-sm text-foreground-muted leading-relaxed mb-3 line-clamp-2">
                  {isFi ? article.subtitleFi : article.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-muted/70">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(article.publishedDate).toLocaleDateString(
                      DATE_LOCALES[locale] ?? "en-US",
                      { year: "numeric", month: "short", day: "numeric" },
                    )}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {article.readingTimeMinutes} {d.minRead}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 text-accent opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium">
                    {d.readMore} <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
