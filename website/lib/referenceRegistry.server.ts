import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { Reference, ReferenceData } from "@/lib/references";

interface ReferenceUsageItem {
  readonly path: string;
  readonly source: string;
}

interface ReferenceUsageData {
  readonly usage: Record<string, readonly ReferenceUsageItem[]>;
}

let registryCache: ReferenceData | null = null;
let usageCache: ReferenceUsageData | null = null;

export function referenceRegistry(): ReferenceData {
  if (!registryCache) {
    const file = path.join(process.cwd(), "public", "data", "references_full.json");
    registryCache = JSON.parse(fs.readFileSync(file, "utf8")) as ReferenceData;
  }
  return registryCache;
}

function referenceUsageRegistry(): ReferenceUsageData {
  if (!usageCache) {
    const file = path.join(process.cwd(), "lib", "referenceUsage.json");
    usageCache = JSON.parse(fs.readFileSync(file, "utf8")) as ReferenceUsageData;
  }
  return usageCache;
}

export function canonicalReference(referenceId: string): {
  reference: Reference;
  canonicalId: string;
  isAlias: boolean;
} | null {
  for (const reference of referenceRegistry().references) {
    if (reference.id === referenceId) return { reference, canonicalId: reference.id, isAlias: false };
    if (reference.aliases?.includes(referenceId)) return { reference, canonicalId: reference.id, isAlias: true };
  }
  return null;
}

export function referenceUsages(referenceId: string): readonly ReferenceUsageItem[] {
  const resolved = canonicalReference(referenceId);
  return resolved ? referenceUsageRegistry().usage[resolved.canonicalId] ?? [] : [];
}

export function bibliography(reference: Reference): string {
  const parts = [
    reference.authors,
    reference.year > 0 ? `(${reference.year}).` : "(n.d.).",
    reference.title ? `${reference.title}.` : "",
    reference.journal ? `${reference.journal}.` : "",
  ].filter(Boolean);
  return parts.join(" ").replace(/\s+/g, " ").trim();
}
