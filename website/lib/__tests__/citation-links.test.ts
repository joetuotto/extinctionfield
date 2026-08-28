import { describe, expect, it } from "vitest";
import referenceIndexData from "../referenceIndex.json";
import {
  canonicalReferenceId,
  indexedReference,
} from "../referenceIndex";
import { referenceUrl } from "../references";
import referenceData from "../../public/data/references_full.json";
import referenceUsageData from "../referenceUsage.json";

type LinkStatus = "verified" | "registered" | "pending" | "missing";

interface RegistryReference {
  readonly id: string;
  readonly verified: boolean;
  readonly doi?: string | null;
  readonly pmcid?: string | null;
  readonly pmid?: string | number | null;
  readonly url?: string | null;
  readonly aliases?: readonly string[];
  readonly link_status: LinkStatus;
}

interface RegistryData {
  readonly metadata: {
    readonly version: string;
    readonly generated: string;
    readonly total_references: number;
    readonly verified_count: number;
    readonly linked_count: number;
    readonly unlinked_count: number;
    readonly alias_count: number;
  };
  readonly references: readonly RegistryReference[];
}

interface IndexData {
  readonly metadata: {
    readonly version: string;
    readonly generated: string;
    readonly totalReferences: number;
    readonly linkedReferences: number;
  };
  readonly references: Readonly<
    Record<
      string,
      {
        readonly id: string;
        readonly linkStatus: LinkStatus;
        readonly externalUrl: string | null;
      }
    >
  >;
  readonly aliases: Readonly<Record<string, string>>;
}

const registry = referenceData as unknown as RegistryData;
const index = referenceIndexData as unknown as IndexData;
const publishableStatuses = new Set<LinkStatus>(["verified"]);

function normalizedDoi(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(?:dx\.)?doi\.org\//, "");
}

function expectUnique(
  label: string,
  entries: ReadonlyArray<readonly [value: string, owner: string]>,
): void {
  const owners = new Map<string, string>();
  for (const [value, owner] of entries) {
    const previousOwner = owners.get(value);
    expect(
      previousOwner,
      `${label} ${value} is shared by ${previousOwner ?? "an unknown record"} and ${owner}`,
    ).toBeUndefined();
    owners.set(value, owner);
  }
}

describe("referenceUrl", () => {
  const allIdentifiers = {
    doi: "10.1038/nature13290",
    pmcid: "PMC4362825",
    pmid: "10862839",
    url: "https://example.org/official-record",
    link_status: "verified" as const,
  };

  it("uses the canonical DOI -> PMCID -> PMID -> official URL order", () => {
    expect(referenceUrl(allIdentifiers)).toBe("https://doi.org/10.1038/nature13290");
    expect(referenceUrl({ ...allIdentifiers, doi: null })).toBe(
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC4362825/",
    );
    expect(referenceUrl({ ...allIdentifiers, doi: null, pmcid: null })).toBe(
      "https://pubmed.ncbi.nlm.nih.gov/10862839/",
    );
    expect(referenceUrl({ ...allIdentifiers, doi: null, pmcid: null, pmid: null })).toBe(
      "https://example.org/official-record",
    );
  });

  it("never publishes registered, pending, or missing links before metadata verification", () => {
    for (const link_status of ["registered", "pending", "missing"] as const) {
      expect(referenceUrl({ ...allIdentifiers, link_status })).toBeNull();
    }
    expect(referenceUrl({ ...allIdentifiers, link_status: undefined })).toBeNull();
  });

  it("returns null for absent, placeholder, or insecure source data", () => {
    expect(referenceUrl({ link_status: "verified" })).toBeNull();
    expect(referenceUrl({ doi: "Leszczynski2002", link_status: "registered" })).toBeNull();
    expect(referenceUrl({ url: "http://example.org/source", link_status: "verified" })).toBeNull();
  });
});

describe("canonical reference registry", () => {
  const references = registry.references;

  it("keeps canonical IDs and aliases globally unique", () => {
    const canonicalIds = references.map(
      (reference) => [reference.id.trim().toLowerCase(), reference.id] as const,
    );
    expect(canonicalIds.every(([id]) => id.length > 0)).toBe(true);
    expectUnique("canonical reference ID", canonicalIds);

    const canonicalIdSet = new Set(canonicalIds.map(([id]) => id));
    const aliases = references.flatMap((reference) =>
      (reference.aliases ?? []).map(
        (alias) => [alias.trim().toLowerCase(), reference.id] as const,
      ),
    );
    expectUnique("reference alias", aliases);

    for (const [alias, owner] of aliases) {
      expect(alias, `${owner} has an empty reference alias`).not.toBe("");
      expect(canonicalIdSet.has(alias), `${owner} alias ${alias} collides with a canonical ID`).toBe(false);
    }
  });

  it("keeps DOI, PMCID, and PMID identifiers unique", () => {
    const dois = references.flatMap((reference) =>
      reference.doi
        ? [[normalizedDoi(reference.doi), reference.id] as const]
        : [],
    );
    const pmcids = references.flatMap((reference) =>
      reference.pmcid
        ? [[String(reference.pmcid).trim().toUpperCase(), reference.id] as const]
        : [],
    );
    const pmids = references.flatMap((reference) =>
      reference.pmid != null && String(reference.pmid).trim()
        ? [[String(reference.pmid).trim(), reference.id] as const]
        : [],
    );

    expectUnique("DOI", dois);
    expectUnique("PMCID", pmcids);
    expectUnique("PMID", pmids);

    for (const [doi, owner] of dois) {
      expect(doi, `${owner} has a non-canonical DOI`).toMatch(/^10\.[^/]+\/.+/);
    }
    for (const [pmcid, owner] of pmcids) {
      expect(pmcid, `${owner} has a malformed PMCID`).toMatch(/^PMC\d+$/);
    }
    for (const [pmid, owner] of pmids) {
      expect(pmid, `${owner} has a malformed PMID`).toMatch(/^\d{7,9}$/);
    }
  });

  it("keeps registry and generated-index metadata synchronized with their records", () => {
    const verifiedCount = references.filter((reference) => reference.verified).length;
    const linkedCount = references.filter((reference) =>
      publishableStatuses.has(reference.link_status),
    ).length;
    const emittedLinkCount = references.filter((reference) => referenceUrl(reference)).length;
    const aliasCount = references.reduce(
      (total, reference) => total + (reference.aliases?.length ?? 0),
      0,
    );

    expect(registry.metadata.total_references).toBe(references.length);
    expect(registry.metadata.verified_count).toBe(verifiedCount);
    expect(registry.metadata.linked_count).toBe(linkedCount);
    expect(registry.metadata.unlinked_count).toBe(references.length - linkedCount);
    expect(registry.metadata.alias_count).toBe(aliasCount);

    expect(index.metadata.version).toBe(registry.metadata.version);
    expect(index.metadata.generated).toBe(registry.metadata.generated);
    expect(index.metadata.totalReferences).toBe(references.length);
    expect(index.metadata.linkedReferences).toBe(emittedLinkCount);
    expect(Object.keys(index.references)).toHaveLength(references.length);
    expect(Object.keys(index.aliases)).toHaveLength(aliasCount);
  });
});

describe("reference index", () => {
  const registryById = new Map(
    registry.references.map((reference) => [reference.id, reference] as const),
  );

  it("resolves every registered alias to exactly one canonical record", () => {
    const declaredAliases = registry.references.flatMap((reference) =>
      (reference.aliases ?? []).map((alias) => [alias, reference.id] as const),
    );
    expect(declaredAliases.length).toBeGreaterThan(0);
    expect(index.aliases).toEqual(Object.fromEntries(declaredAliases));

    for (const [alias, canonicalId] of declaredAliases) {
      expect(canonicalReferenceId(alias)).toBe(canonicalId);
      expect(indexedReference(alias)).toEqual(indexedReference(canonicalId));
      expect(indexedReference(alias)?.id).toBe(canonicalId);
    }

    const unknownId = "__unknown-reference-regression-guard__";
    expect(canonicalReferenceId(unknownId)).toBe(unknownId);
    expect(indexedReference(unknownId)).toBeNull();
  });

  it("contains only canonical registry IDs", () => {
    for (const [key, indexed] of Object.entries(index.references)) {
      expect(indexed.id).toBe(key);
      expect(registryById.has(key), `${key} exists in the index but not the registry`).toBe(true);
      expect(index.aliases[key], `${key} is both a canonical ID and an alias`).toBeUndefined();
    }
  });

  it("emits an external URL only for verified records", () => {
    for (const [id, indexed] of Object.entries(index.references)) {
      const registered = registryById.get(id);
      expect(registered, `${id} is missing from the canonical registry`).toBeDefined();
      if (!registered) continue;

      expect(indexed.linkStatus).toBe(registered.link_status);
      expect(indexed.externalUrl).toBe(referenceUrl(registered));

      if (indexed.externalUrl) {
        expect(
          publishableStatuses.has(indexed.linkStatus),
          `${id} emitted a URL with ${indexed.linkStatus} status`,
        ).toBe(true);
        expect(indexed.externalUrl).toMatch(/^https:\/\//);
      } else if (indexed.linkStatus === "pending" || indexed.linkStatus === "missing") {
        expect(indexed.externalUrl).toBeNull();
      }
    }
  });
});

describe("reference usage index", () => {
  const usage = referenceUsageData.usage as Record<
    string,
    ReadonlyArray<{ readonly path: string; readonly source: string }>
  >;

  it("traces citations through shared data and component dependencies", () => {
    expect(usage.trumble2012?.map((item) => item.path)).toContain("/evidence/populations");
    expect(usage.hirano2017?.map((item) => item.path)).toContain("/evidence/evolution");
    expect(usage.hirano2017?.map((item) => item.source)).toContain("lib/evolutionData.ts");
  });

  it("contains only canonical IDs and existing source paths", () => {
    const canonicalIds = new Set(registry.references.map((reference) => reference.id));
    for (const [referenceId, locations] of Object.entries(usage)) {
      expect(canonicalIds.has(referenceId), `${referenceId} is not canonical`).toBe(true);
      expect(locations.length, `${referenceId} has no usage locations`).toBeGreaterThan(0);
      for (const location of locations) {
        expect(location.path).toMatch(/^\//);
        expect(location.source).toMatch(/\.(?:ts|tsx|json)$/);
      }
    }
  });
});
