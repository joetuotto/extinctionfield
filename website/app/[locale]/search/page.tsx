import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SiteSearch } from "@/components/SiteSearch";
import { SEARCH_COPY } from "@/lib/search";
import { isValidLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return { title: `${SEARCH_COPY[locale].title} – Extinction Field`, robots: { index: false, follow: true } };
}

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const copy = SEARCH_COPY[locale];
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14" data-pagefind-ignore="all">
      <h1 className="font-serif text-3xl font-semibold sm:text-4xl">{copy.title}</h1>
      <p className="mt-3 mb-7 text-base text-foreground-muted">{copy.description}</p>
      <Suspense fallback={<p role="status">{copy.loading}</p>}>
        <SiteSearch locale={locale} />
      </Suspense>
      <noscript><p className="mt-6">{copy.noScript} <a href={`/${locale}/references`} className="text-accent underline">{copy.referencesLink}</a></p></noscript>
    </div>
  );
}
