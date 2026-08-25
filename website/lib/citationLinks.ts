import refsData from "@/public/data/references_full.json";

const refs = (refsData as { references: Array<{ id: string; doi?: string; url?: string; authors?: string }> }).references;

const doiMap = new Map<string, string>();
for (const ref of refs) {
  if (ref.doi) {
    const surname = ref.authors?.split(",")[0]?.split(" ").pop()?.toLowerCase();
    if (surname) {
      const idYear = ref.id.match(/(\d{4})/)?.[1];
      if (idYear) doiMap.set(`${surname}${idYear}`, `https://doi.org/${ref.doi}`);
    }
  }
}

export function citationHref(citation: string, year: number): string | null {
  const normalized = citation.toLowerCase().replace(/[^a-z0-9]/g, "");
  const key = `${normalized}${year}`;
  return doiMap.get(key) ?? null;
}
