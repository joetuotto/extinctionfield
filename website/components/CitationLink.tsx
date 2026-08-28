import { StudyCitation } from "@/components/StudyCitation";

/**
 * Renders an inline study citation as a link to its source when one is known.
 *
 * Compatibility name for the migrated page tables. Resolution is exclusively
 * ID-based; visible translated text and year are never used as lookup keys.
 */
export function CitationLink({
  citation,
  referenceId,
  locale = "en",
  className,
}: {
  citation: string;
  year?: number | string;
  referenceId: string;
  locale?: string;
  className?: string;
}) {
  return <StudyCitation referenceId={referenceId} locale={locale} label={citation} className={className} />;
}
