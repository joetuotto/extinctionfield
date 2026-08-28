import indexData from "./referenceIndex.json";

export type ReferenceLinkStatus = "verified" | "registered" | "pending" | "missing";

export interface IndexedReference {
  readonly id: string;
  readonly authors: string;
  readonly year: number;
  readonly title: string;
  readonly journal: string | null;
  readonly type: string | null;
  readonly linkStatus: ReferenceLinkStatus;
  readonly externalUrl: string | null;
}

interface CompactReferenceIndex {
  readonly references: Record<string, IndexedReference>;
  readonly aliases: Record<string, string>;
  readonly identifiers: Record<string, string>;
}

const INDEX = indexData as CompactReferenceIndex;

export function canonicalReferenceId(referenceId: string): string {
  return INDEX.aliases[referenceId] ?? referenceId;
}

export function indexedReference(referenceId: string): IndexedReference | null {
  return INDEX.references[canonicalReferenceId(referenceId)] ?? null;
}

export function referenceIdForExternalIdentifier(identifier: string): string | null {
  const normalized = identifier.trim();
  const pmcid = normalized.match(/\b(PMC\d{5,9})\b/i);
  if (pmcid) return INDEX.identifiers[`pmcid:${pmcid[1].toUpperCase()}`] ?? null;

  const pmid = normalized.match(/\b(?:PMID|PubMed)\s*:?\s*(\d{6,9})\b/i);
  if (pmid) return INDEX.identifiers[`pmid:${pmid[1]}`] ?? null;

  return null;
}

export function citationAuthor(authors: string): string {
  const cleaned = authors.trim();
  if (!cleaned) return "Unknown source";
  const beforeCollective = cleaned.split(/\s+(?:et al\.?|ym\.?)\b/i)[0];
  const first = beforeCollective.split(/[,&;]/)[0].trim();
  return first.split(/\s+/)[0] || cleaned;
}

export function citationLabel(reference: IndexedReference, locale: string): string {
  const author = citationAuthor(reference.authors);
  const year = reference.year > 0 ? String(reference.year) : "n.d.";
  const collective = {
    fi: "ym.",
    ja: "ほか",
    ko: "외",
    fr: "et al.",
    en: "et al.",
  }[locale] ?? "et al.";
  return `${author} ${collective} (${year})`;
}
