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
  readonly pmcid?: string | null;
  readonly aliases?: readonly string[];
  readonly link_status?: "verified" | "registered" | "pending" | "missing";
  readonly link_source?: string | null;
  readonly link_checked_at?: string | null;
}

/**
 * Resolve a reference to an external source URL.
 *
 * Order of preference: DOI, PubMed Central id, PubMed id, official URL.
 * Returns null until the identifier has been matched to the bibliography.
 * Callers must keep registered, pending and missing records non-clickable so a
 * valid identifier for the wrong paper is never presented as the source.
 */
export function referenceUrl(
  r: {
    readonly doi?: string | null;
    readonly url?: string | null;
    readonly pmid?: string | number | null;
    readonly pmcid?: string | null;
    readonly link_status?: string | null;
  },
): string | null {
  if (r.link_status !== "verified") return null;

  const doi = (r.doi ?? "").trim();
  if (doi.startsWith("10.")) return `https://doi.org/${doi}`;

  const pmcid = (r.pmcid ?? "").trim() || (/^PMC\d+$/i.test(doi) ? doi : "");
  if (pmcid) return `https://pmc.ncbi.nlm.nih.gov/articles/${pmcid.toUpperCase()}/`;

  const pmid = String(r.pmid ?? "").trim() || (/^\d{7,9}$/.test(doi) ? doi : "");
  if (pmid) return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;

  const url = (r.url ?? "").trim();
  if (url.startsWith("https://")) return url;
  if (doi.startsWith("https://")) return doi;

  return null;
}

export interface ReferenceData {
  readonly metadata: {
    readonly version: string;
    readonly source: string;
    readonly total_references: number;
    readonly verified_count: number;
    readonly linked_count?: number;
    readonly unlinked_count?: number;
    readonly alias_count?: number;
    readonly generated: string;
  };
  readonly categories: readonly ReferenceCategory[];
  readonly references: readonly Reference[];
}

let _cache: ReferenceData | null = null;

export async function loadReferences(): Promise<ReferenceData> {
  if (_cache) return _cache;
  const res = await fetch("/data/references_full.json");
  if (!res.ok) throw new Error(`references fetch failed: ${res.status}`);
  const data = await res.json();
  if (!data?.references) throw new Error("invalid references data");
  _cache = data;
  return _cache!;
}

const LEVEL_LABELS: Record<string, Record<string, string>> = {
  en: { A: "Meta-analysis", B: "RCT / cohort", C: "Case-control", M: "Mechanistic", R: "Review", O: "Observational", D: "Descriptive", T: "Theoretical" },
  fi: { A: "Meta-analyysi", B: "RCT / kohortti", C: "Tapaus-verrokki", M: "Mekanistinen", R: "Katsaus", O: "Havainnointitutkimus", D: "Kuvaileva", T: "Teoreettinen" },
  ja: { A: "メタ分析", B: "RCT／コホート", C: "症例対照", M: "メカニズム", R: "レビュー", O: "観察研究", D: "記述的", T: "理論的" },
  fr: { A: "Méta-analyse", B: "ECR / cohorte", C: "Cas-témoin", M: "Mécanistique", R: "Revue", O: "Observationnel", D: "Descriptif", T: "Théorique" },
  ko: { A: "메타분석", B: "RCT / 코호트", C: "환자-대조군", M: "기전 연구", R: "리뷰", O: "관찰 연구", D: "기술적", T: "이론적" },
};

export function levelLabel(level: string | null, locale: string): string {
  if (!level) return "";
  return (LEVEL_LABELS[locale] ?? LEVEL_LABELS.en)[level] ?? level;
}

export function categoryName(cat: ReferenceCategory, locale: string): string {
  return locale === "fi" ? cat.name_fi : cat.name_en;
}
