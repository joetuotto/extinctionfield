import { copyCoverage, TRANSLATION_PENDING, type Locale } from "@/lib/i18n";

/**
 * One-line notice for locales whose COPY block is only partially translated.
 * `pickCopy` already fills the gaps with English; this tells the reader why
 * part of the page is in English. Renders nothing for English or when the
 * locale covers at least `threshold` of the English keys.
 */
export function TranslationNotice({
  copy,
  locale,
  threshold = 0.9,
}: {
  copy: Record<string, unknown>;
  locale: string;
  threshold?: number;
}) {
  if (locale === "en") return null;
  if (copyCoverage(copy, locale) >= threshold) return null;
  const text = TRANSLATION_PENDING[locale as Locale] ?? TRANSLATION_PENDING.en;
  return (
    <div className="max-w-5xl mx-auto px-6 pt-6">
      <p className="text-xs text-foreground-muted border-l-2 border-yellow-500/50 pl-3 max-w-3xl">
        {text}
      </p>
    </div>
  );
}
