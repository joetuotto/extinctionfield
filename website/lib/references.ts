export interface ReferenceCategory {
  readonly id: string;
  readonly number: number;
  readonly name_en: string;
  readonly name_fi: string;
  readonly description_en: string;
  readonly description_fi: string;
  readonly icon: string;
  readonly color: string;
}

export interface Reference {
  readonly id: string;
  readonly authors: string;
  readonly year: number;
  readonly title: string;
  readonly journal: string | null;
  readonly doi: string | null;
  readonly category: string;
  readonly pathway: readonly string[];
  readonly level: string | null;
  readonly type: string | null;
  readonly finding: string | null;
  readonly tags: readonly string[];
  readonly pdf_section: string | null;
  readonly pdf_number: number | null;
  readonly verified: boolean;
  /** Canonical source URL for entries that have no DOI (books, reports, records). */
  readonly url?: string | null;
  readonly pmid?: string | number | null;
}

/**
 * Resolve a reference to an external source URL.
 *
 * Order of preference: explicit url, DOI, PubMed Central id, PubMed id.
 * Returns null when the entry carries no resolvable identifier — callers must
 * render the citation as plain text rather than emit a link that 404s.
 */
export function referenceUrl(
  r: {
    readonly doi?: string | null;
    readonly url?: string | null;
    readonly pmid?: string | number | null;
  },
): string | null {
  const url = (r.url ?? "").trim();
  if (url) return url;

  const doi = (r.doi ?? "").trim();
  if (doi.startsWith("10.")) return `https://doi.org/${doi}`;
  if (doi.startsWith("http")) return doi;
  if (/^PMC\d+$/i.test(doi)) {
    return `https://pmc.ncbi.nlm.nih.gov/articles/${doi.toUpperCase()}/`;
  }

  const pmid = String(r.pmid ?? "").trim() || (/^\d{7,9}$/.test(doi) ? doi : "");
  if (pmid) return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;

  return null;
}

export interface ReferenceData {
  readonly metadata: {
    readonly version: string;
    readonly source: string;
    readonly total_references: number;
    readonly verified_count: number;
    readonly generated: string;
  };
  readonly categories: readonly ReferenceCategory[];
  readonly references: readonly Reference[];
}

let _cache: ReferenceData | null = null;

export async function loadReferences(): Promise<ReferenceData> {
  if (_cache) return _cache;
  const res = await fetch("/data/references_full.json");
  _cache = await res.json();
  return _cache!;
}

const LEVEL_LABELS = {
  en: { A: "Meta-analysis", B: "RCT / cohort", C: "Case-control", M: "Mechanistic", R: "Review", O: "Observational", D: "Descriptive", T: "Theoretical" },
  fi: { A: "Meta-analyysi", B: "RCT / kohortti", C: "Tapaus-verrokki", M: "Mekanistinen", R: "Katsaus", O: "Havainnointitutkimus", D: "Kuvaileva", T: "Teoreettinen" },
} as const;

export function levelLabel(level: string | null, locale: "en" | "fi"): string {
  if (!level) return "";
  return (LEVEL_LABELS[locale] as Record<string, string>)[level] ?? level;
}

export function categoryName(cat: ReferenceCategory, locale: "en" | "fi"): string {
  return locale === "fi" ? cat.name_fi : cat.name_en;
}
