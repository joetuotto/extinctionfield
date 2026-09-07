import { describe, expect, it } from "vitest";
import { claims, evidenceRelations, getEvidenceForClaim, getAssessmentForClaim } from "@/lib/claims";
import { canonicalReferenceId, indexedReference, sourceReferenceId } from "@/lib/referenceIndex";
import { MECHANISM_CARDS } from "@/lib/modulome/stateModel";
import { FIELDSTATE_EVIDENCE, LEGACY_EVIDENCE_CATALOGUE } from "@/lib/evidence";
import bibliography from "@/public/data/references_full.json";

describe("curated component evidence", () => {
  it("curates all ten cards and all thirteen canonical references", () => {
    const references = new Set<string>();
    for (const card of MECHANISM_CARDS) {
      const claimId = `claim.modulome.${card.cardId.slice(5)}`;
      const claim = claims.find((entry) => entry.id === claimId);
      expect(claim, card.cardId).toBeDefined();
      expect(claim?.statement.fi?.text).toBeTruthy();
      const relations = getEvidenceForClaim(claimId);
      for (const id of card.referenceIds) {
        const canonical = canonicalReferenceId(id);
        references.add(canonical);
        expect(relations.some((er) => er.referenceId === canonical), `${claimId}: ${id}`).toBe(true);
      }
      expect(relations.every((er) => er.calibrationRole === "structural_only")).toBe(true);
      expect(getAssessmentForClaim(claimId)?.basis.length).toBeGreaterThan(0);
    }
    expect(MECHANISM_CARDS).toHaveLength(10);
    expect(references.size).toBe(13);
  });

  it("keeps membrane orientation evidence separate from applied vector response", () => {
    const relation = evidenceRelations.find((er) => er.referenceId === "majewska2025")!;
    expect(relation.claimId).toBe("claim.receptor.membrane-orientation");
    expect(getAssessmentForClaim("claim.vector.background-dependent-coupling")?.basis).not.toContain(relation.id);
    expect(FIELDSTATE_EVIDENCE.find((er) => er.referenceId === "majewska2025")?.causalNodes).toEqual(["B_RPM_CRY"]);
  });

  it("retains the existing Meng/Kish claim instead of duplicating it", () => {
    for (const id of ["meng2026_spin_memory", "kish2026_cry4a_allostery"]) {
      expect(evidenceRelations.filter((er) => er.referenceId === id).map((er) => er.claimId)).toEqual(["claim.receptor.chemical-memory"]);
    }
  });

  it("distinguishes Cry4a binding from the opsin binding experiment", () => {
    expect(getEvidenceForClaim("claim.receptor.cry4a-gtalpha-binding").map((er) => er.referenceId)).toEqual(["goertemaker2022_cry4a_gtalpha"]);
    expect(getEvidenceForClaim("claim.receptor.opsin-gtalpha-binding").map((er) => er.referenceId)).toEqual(["yee2023_opsin_gtalpha"]);
  });

  it("links the published correction without counting a new supporting study", () => {
    const original = bibliography.references.find((r) => r.id === "kim2026_cell_gene_switch")!;
    expect(original).toHaveProperty("corrections", ["kim2026_cell_gene_switch_correction"]);
    expect(indexedReference("kim2026_cell_gene_switch_correction")?.correctionOf).toBe(original.id);
    expect(sourceReferenceId("kim2026_cell_gene_switch_correction")).toBe(original.id);
    const correction = evidenceRelations.find((er) => er.referenceId === "kim2026_cell_gene_switch_correction")!;
    expect(correction.relation).toBe("contextualizes");
    expect(correction.limitations.join(" ")).toContain("S1J interpolation");
    expect(correction.provenance?.datasetFamilyIds).toEqual(["dataset.kim2026-gene-switch"]);
  });

  it("finishes migrated legacy records without deleting their provenance", () => {
    const activeReferences = new Set(evidenceRelations.map((er) => er.referenceId));
    for (const entry of LEGACY_EVIDENCE_CATALOGUE) {
      if (activeReferences.has(canonicalReferenceId(entry.referenceId))) {
        expect(entry.status, entry.id).not.toBe("MIGRATION_CANDIDATE");
        if (entry.status === "SUPERSEDED_BY_ACTIVE_RECORD") expect(entry.note).toContain("er.");
      }
    }
  });

  it("keeps the 2021 sperm abstract in its rat protocol and retains the null functional outcome", () => {
    const record = FIELDSTATE_EVIDENCE.find((er) => er.referenceId === "catsper_2021")!;
    expect(record.system).toContain("Wistar-Albino rats");
    expect(record.fieldClass).toContain("28 days");
    expect(record.finding).toContain("no significant difference");
    const relation = getEvidenceForClaim("claim.sperm.rf-rat-endpoints")[0];
    expect(relation.referenceId).toBe("catsper_2021");
    expect(relation.curatorNote).toContain("not a selective CatSper");
    expect(indexedReference("catsper_2021")?.externalUrl).toBe("https://doi.org/10.1093/humrep/deab130.035");
  });

  it("gives each bounded record a source-resolved claim relation", () => {
    const active = new Set(evidenceRelations.map((er) => er.referenceId));
    for (const record of FIELDSTATE_EVIDENCE) expect(active.has(canonicalReferenceId(record.referenceId)), record.id).toBe(true);
  });
});
