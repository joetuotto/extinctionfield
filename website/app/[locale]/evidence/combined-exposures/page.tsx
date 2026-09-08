import type { Metadata } from "next";
import Link from "next/link";
import { Network } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { TranslationNotice } from "@/components/TranslationNotice";
import { CombinedExposureEvidence } from "@/components/CombinedExposureEvidence";
import { COMBINED_EXPOSURE_COPY as COPY } from "@/lib/combinedExposureData";
import { pickCopy } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy({ en: COPY.en, fi: COPY.fi }, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function CombinedExposuresPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy({ en: COPY.en, fi: COPY.fi }, locale);
  return <article>
    <TranslationNotice copy={COPY} locale={locale} />
    <div className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
      <Link href={`/${locale}/evidence`} className="mb-7 inline-flex min-h-11 items-center text-sm text-accent hover:underline">← {d.back}</Link>
      <PageHeader icon={Network} title={d.title} subtitle={d.subtitle} />
      <p className="mb-9 text-lg leading-8 sm:text-xl">{d.lead}</p>
      <CombinedExposureEvidence locale={locale} />
    </div>
  </article>;
}
