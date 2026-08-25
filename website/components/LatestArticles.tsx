import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestArticles } from "@/lib/articles";
import { BermIcon } from "@/components/BermIcon";
import type { Locale } from "@/lib/i18n";

export function LatestArticles({ locale }: { locale: Locale }) {
  const articles = getLatestArticles(4);
  if (articles.length === 0) return null;

  const [hero, ...rest] = articles;
  const prefix = `/${locale}`;
  const isFi = locale === "fi";

  return (
    <section className="pb-20">
      {/* Hero article card */}
      <Link
        href={`${prefix}/articles/${hero.slug}`}
        className="group block rounded-xl border border-card-border bg-card-bg p-6 sm:p-8 transition-colors hover:border-accent/40"
      >
        <div className="flex items-start gap-4">
          <span className="shrink-0 mt-1 text-foreground-muted" aria-hidden="true">
            <BermIcon name={hero.icon} size={32} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-snug tracking-[-0.01em] mb-2 group-hover:text-accent transition-colors">
              {isFi ? hero.titleFi : hero.title}
            </h3>
            <p className="text-sm sm:text-[0.9375rem] text-foreground-muted leading-relaxed mb-4">
              {isFi ? hero.subtitleFi : hero.subtitle}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground-muted">
                {hero.readingTimeMinutes} min {isFi ? "lukuaika" : "read"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {isFi ? "Lue" : "Read"} <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Older articles as small cards */}
      {rest.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 3).map((a) => (
            <Link
              key={a.slug}
              href={`${prefix}/articles/${a.slug}`}
              className="group rounded-xl border border-card-border bg-card-bg p-4 transition-colors hover:border-accent/40"
            >
              <p className="mb-2 text-foreground-muted" aria-hidden="true">
                <BermIcon name={a.icon} size={22} />
              </p>
              <h4 className="font-serif text-sm font-semibold leading-snug mb-2 group-hover:text-accent transition-colors">
                {isFi ? a.titleFi : a.title}
              </h4>
              <span className="text-xs text-foreground-muted">
                {a.readingTimeMinutes} min {isFi ? "lukuaika" : "read"} ·{" "}
                <span className="text-accent">{isFi ? "Lue" : "Read"} →</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
