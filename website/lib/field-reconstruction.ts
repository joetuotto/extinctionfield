import rawReconstruction from "@/data/field-reconstruction.json";
import { technologyHistory, type LocalizedHistoryText, type TechnologyHistorySource } from "./technology-history";

export type ReconstructionCountryId = "FIN" | "USA" | "GBR" | "DEU" | "JPN";
export type ReconstructionStage = "documented" | "expansion" | "mixed" | "retired";
export type ReconstructionSourceRef = `history:${string}` | `reconstruction:${string}`;
export interface ReconstructionFamily {
  id: string;
  label: LocalizedHistoryText;
  technologyIds: string[];
  channel: "ELF" | "RF" | "IF" | "mixed";
  morphology: { carrier: LocalizedHistoryText; waveform: LocalizedHistoryText; intermittence: LocalizedHistoryText; geography: LocalizedHistoryText };
}
export interface ReconstructionAnchor {
  id: string;
  countryIds: ReconstructionCountryId[];
  familyIds: string[];
  startYear: number;
  endYear?: number;
  kind: "launch" | "deployment" | "measurement" | "shutdown" | "standard";
  title: LocalizedHistoryText;
  scope: LocalizedHistoryText;
  sourceRefs: ReconstructionSourceRef[];
  canonicalEventId?: string;
  values?: { value: number; unit: string; denominator: LocalizedHistoryText; label: LocalizedHistoryText }[];
}
export interface ReconstructionPhase {
  /** Inclusive calendar years. No subannual field continuity is implied. */
  startYear: number;
  endYear: number;
  stage: ReconstructionStage;
  basis: "documented" | "reconstruction";
  scopeKind: "operation" | "market-policy" | "reported-adoption";
  anchorIds: string[];
  sourceRefs: ReconstructionSourceRef[];
  note: LocalizedHistoryText;
  startBounds?: [number, number];
  endBounds?: [number, number];
}
export interface ReconstructionScenarioWindow {
  kind: "onset" | "retirement";
  earliestYear: number;
  latestYear: number;
  anchorIds: string[];
  /** Timing of the documented event, not an amplitude or an adoption ramp. */
  note: LocalizedHistoryText;
}
export interface ReconstructionTrack {
  countryId: ReconstructionCountryId;
  familyId: string;
  phases: ReconstructionPhase[];
  gap: LocalizedHistoryText;
  scenarioWindows: ReconstructionScenarioWindow[];
}
export interface FieldReconstructionRegistry {
  schemaVersion: 1;
  updatedAt: string;
  coverage: { fromYear: number; toYear: number; defaultFromYear: number; defaultToYear: number };
  countries: { id: ReconstructionCountryId; name: LocalizedHistoryText; scope: LocalizedHistoryText }[];
  families: ReconstructionFamily[];
  sources: TechnologyHistorySource[];
  anchors: ReconstructionAnchor[];
  tracks: ReconstructionTrack[];
  boundary: { geometry: LocalizedHistoryText; conditionalResponse: LocalizedHistoryText; empiricalInput: LocalizedHistoryText; calibrationGap: LocalizedHistoryText; phaseMeaning: LocalizedHistoryText };
}

export const fieldReconstruction = rawReconstruction as unknown as FieldReconstructionRegistry;
export const reconstructionStageLabels: Record<ReconstructionStage | "unknown", LocalizedHistoryText> = {
  documented: { en: "Documented milestone", fi: "Dokumentoitu vaihe" },
  expansion: { en: "Deployment interval", fi: "Käyttöönottojakso" },
  mixed: { en: "Continued / overlapping regime", fi: "Jatkuva / rinnakkainen käyttö" },
  retired: { en: "Scoped service retired", fi: "Rajattu palvelu suljettu" },
  unknown: { en: "History not resolved", fi: "Historia avoin" },
};

export function getReconstructionTracks(countryId: string): ReconstructionTrack[] {
  return fieldReconstruction.tracks.filter((track) => track.countryId === countryId);
}

/**
 * Whole-year scenario support, not measured annual exposure. A phase can include
 * operation during only part of a shutdown year. Preserve gaps and exclude policy
 * context; restarting an illustrative ramp in each interval is a separate model choice.
 */
export function getReconstructionOperatingWindows(countryId: string, familyId: string): { startYear: number; endYear: number }[] {
  const track = fieldReconstruction.tracks.find((row) => row.countryId === countryId && row.familyId === familyId);
  const phases = (track?.phases ?? []).filter((phase) => phase.stage !== "retired" && phase.scopeKind !== "market-policy");
  const windows: { startYear: number; endYear: number }[] = [];
  for (const phase of phases) {
    const previous = windows.at(-1);
    if (previous && phase.startYear <= previous.endYear + 1) previous.endYear = Math.max(previous.endYear, phase.endYear);
    else windows.push({ startYear: phase.startYear, endYear: phase.endYear });
  }
  return windows;
}

export function getReconstructionSources(refs: readonly string[]): TechnologyHistorySource[] {
  return [...new Set(refs)].flatMap((ref) => {
    const [namespace, ...parts] = ref.split(":");
    const id = parts.join(":");
    const source = namespace === "history" ? technologyHistory.sources.find((row) => row.id === id)
      : namespace === "reconstruction" ? fieldReconstruction.sources.find((row) => row.id === id) : undefined;
    return source ? [{ ...source, id: ref }] : [];
  });
}

export function getReconstructionAnchors(ids: readonly string[]): ReconstructionAnchor[] {
  const selected = new Set(ids);
  return fieldReconstruction.anchors.filter((anchor) => selected.has(anchor.id));
}

export interface ReconstructionCell {
  countryId: string;
  familyId: string;
  year: number;
  stage: ReconstructionStage | "unknown";
  phase: ReconstructionPhase | null;
  anchors: ReconstructionAnchor[];
  sourceRefs: ReconstructionSourceRef[];
  note: LocalizedHistoryText;
}

export function getReconstructionCell(countryId: string, familyId: string, year: number): ReconstructionCell {
  if (!Number.isInteger(year)) throw new RangeError("A reconstruction cell requires an integer calendar year");
  const track = fieldReconstruction.tracks.find((row) => row.countryId === countryId && row.familyId === familyId);
  const phase = track?.phases.find((row) => row.startYear <= year && year <= row.endYear) ?? null;
  return { countryId, familyId, year, stage: phase?.stage ?? "unknown", phase,
    anchors: phase ? getReconstructionAnchors(phase.anchorIds) : [], sourceRefs: phase?.sourceRefs ?? [],
    note: phase?.note ?? track?.gap ?? { en: "No reconstructed history for this selection.", fi: "Valinnalle ei ole rekonstruoitua historiaa." } };
}

/** Ordinal source-history rows. This function never computes intensity, dose or biology. */
export function buildReconstructionTimeline({ countryId, fromYear, toYear, familyIds }: {
  countryId: string; fromYear: number; toYear: number; familyIds?: readonly string[];
}): { family: ReconstructionFamily; track: ReconstructionTrack; cells: ReconstructionCell[] }[] {
  if (!Number.isInteger(fromYear) || !Number.isInteger(toYear) || fromYear > toYear || toYear - fromYear > 500) {
    throw new RangeError("Use ordered integer calendar years spanning at most 501 years");
  }
  const selected = familyIds ? new Set(familyIds) : null;
  return getReconstructionTracks(countryId).filter((track) => !selected || selected.has(track.familyId)).map((track) => ({
    family: fieldReconstruction.families.find((family) => family.id === track.familyId)!, track,
    cells: Array.from({ length: toYear - fromYear + 1 }, (_, offset) => getReconstructionCell(countryId, track.familyId, fromYear + offset)),
  }));
}

/** Validate provenance, interval semantics and the separation from physical/biological estimates. */
export function validateFieldReconstruction(input: unknown): string[] {
  const errors: string[] = [];
  const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
  if (!record(input)) return ["registry: expected object"];
  const rows = (v: unknown, path: string): Record<string, unknown>[] => {
    if (!Array.isArray(v)) { errors.push(`${path}: expected array`); return []; }
    v.forEach((row) => { if (!record(row)) errors.push(`${path}: expected record`); });
    return v.filter(record);
  };
  const text = (v: unknown, path: string) => {
    if (!record(v) || ![v.en, v.fi].every((s) => typeof s === "string" && s.trim())) errors.push(`${path}: en and fi required`);
  };
  const ids = (list: Record<string, unknown>[], path: string) => {
    const found = new Set<string>();
    list.forEach((row) => {
      if (typeof row.id !== "string" || !row.id) errors.push(`${path}: id required`);
      else if (found.has(row.id)) errors.push(`${path}: duplicate ${row.id}`);
      else found.add(row.id);
    });
    return found;
  };
  const refs = (v: unknown, known: Set<string>, path: string, required = true) => {
    if (!Array.isArray(v) || (required && !v.length)) { errors.push(`${path}: references required`); return; }
    v.forEach((id) => { if (typeof id !== "string" || !known.has(id)) errors.push(`${path}: unknown reference ${String(id)}`); });
    if (new Set(v).size !== v.length) errors.push(`${path}: duplicate references`);
  };
  const year = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v >= 1800 && v <= 2100;
  const date = (v: unknown): v is string => {
    if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
    const parsed = new Date(`${v}T00:00:00Z`);
    return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === v;
  };
  const interval = (a: unknown, b: unknown, path: string) => {
    if (!year(a) || !year(b) || a > b) errors.push(`${path}: ordered calendar years required`);
  };
  if (input.schemaVersion !== 1) errors.push("schemaVersion: expected 1");
  if (!date(input.updatedAt)) errors.push("updatedAt: valid ISO date required");
  const countries = rows(input.countries, "countries"), families = rows(input.families, "families"), sources = rows(input.sources, "sources"), anchors = rows(input.anchors, "anchors"), tracks = rows(input.tracks, "tracks");
  const countryIds = ids(countries, "countries"), familyIds = ids(families, "families"), sourceIds = ids(sources, "sources"), anchorIds = ids(anchors, "anchors");
  const sourceRefs = new Set([...technologyHistory.sources.map((s) => `history:${s.id}`), ...[...sourceIds].map((s) => `reconstruction:${s}`)]);
  const technologyIds = new Set(technologyHistory.technologies.map((t) => t.id));
  if (countryIds.size !== 5 || ["FIN", "USA", "GBR", "DEU", "JPN"].some((id) => !countryIds.has(id))) errors.push("countries: five required countries exactly once");
  countries.forEach((row) => { text(row.name, `countries.${row.id}.name`); text(row.scope, `countries.${row.id}.scope`); });
  if (!record(input.coverage)) errors.push("coverage: required");
  else {
    interval(input.coverage.fromYear, input.coverage.toYear, "coverage");
    interval(input.coverage.defaultFromYear, input.coverage.defaultToYear, "coverage.default");
  }
  if (!record(input.boundary)) errors.push("boundary: required");
  else for (const key of ["geometry", "conditionalResponse", "empiricalInput", "calibrationGap", "phaseMeaning"]) text(input.boundary[key], `boundary.${key}`);
  families.forEach((row) => {
    text(row.label, `families.${row.id}.label`); refs(row.technologyIds, technologyIds, `families.${row.id}.technologyIds`);
    if (!["ELF", "RF", "IF", "mixed"].includes(String(row.channel))) errors.push(`families.${row.id}: channel required`);
    if (!record(row.morphology)) errors.push(`families.${row.id}: morphology required`);
    else for (const key of ["carrier", "waveform", "intermittence", "geography"]) text(row.morphology[key], `families.${row.id}.${key}`);
  });
  sources.forEach((row) => {
    text(row.scope, `sources.${row.id}.scope`);
    try { if (new URL(String(row.url)).protocol !== "https:") throw new Error(); } catch { errors.push(`sources.${row.id}: HTTPS URL required`); }
    for (const key of ["title", "publisher", "accessed", "kind"]) if (typeof row[key] !== "string" || !row[key]) errors.push(`sources.${row.id}.${key}: required`);
    if (!date(row.accessed) || (date(input.updatedAt) && row.accessed > input.updatedAt)) errors.push(`sources.${row.id}.accessed: valid date no later than update required`);
  });
  anchors.forEach((row) => {
    const path = `anchors.${row.id}`;
    interval(row.startYear, row.endYear ?? row.startYear, path);
    refs(row.countryIds, countryIds, `${path}.countryIds`); refs(row.familyIds, familyIds, `${path}.familyIds`); refs(row.sourceRefs, sourceRefs, `${path}.sourceRefs`);
    text(row.title, `${path}.title`); text(row.scope, `${path}.scope`);
    if (!["launch", "deployment", "measurement", "shutdown", "standard"].includes(String(row.kind))) errors.push(`${path}: invalid kind`);
    if (row.canonicalEventId !== undefined) {
      const event = technologyHistory.events.find((event) => event.id === row.canonicalEventId);
      if (!event) errors.push(`${path}: unknown canonical event`);
      else if (row.startYear !== event.startYear || (row.endYear ?? row.startYear) !== (event.endYear ?? event.startYear)) errors.push(`${path}: canonical event dates changed`);
    }
    if (row.values !== undefined) rows(row.values, `${path}.values`).forEach((value) => {
      if (typeof value.value !== "number" || !Number.isFinite(value.value) || typeof value.unit !== "string" || !value.unit) errors.push(`${path}.values: finite value and explicit unit required`);
      text(value.denominator, `${path}.values.denominator`); text(value.label, `${path}.values.label`);
    });
  });
  const trackKeys = new Set<string>();
  tracks.forEach((row) => {
    const path = `tracks.${row.countryId}.${row.familyId}`, key = `${row.countryId}:${row.familyId}`;
    if (trackKeys.has(key)) errors.push(`${path}: duplicate track`); trackKeys.add(key);
    if (!countryIds.has(String(row.countryId)) || !familyIds.has(String(row.familyId))) errors.push(`${path}: unknown country/family`);
    text(row.gap, `${path}.gap`);
    let previousEnd = -Infinity;
    rows(row.phases, `${path}.phases`).forEach((phase) => {
      interval(phase.startYear, phase.endYear, `${path}.phase`);
      if (year(phase.startYear) && phase.startYear <= previousEnd) errors.push(`${path}: overlapping or unordered phases`);
      if (year(phase.endYear)) previousEnd = phase.endYear;
      if (!["documented", "expansion", "mixed", "retired"].includes(String(phase.stage))) errors.push(`${path}: invalid stage`);
      if (!["documented", "reconstruction"].includes(String(phase.basis))) errors.push(`${path}: explicit basis required`);
      if (!["operation", "market-policy", "reported-adoption"].includes(String(phase.scopeKind))) errors.push(`${path}: explicit scope kind required`);
      for (const field of ["amplitude", "intensity", "dose", "penetration", "tensor", "tfrCoefficient"]) {
        if (field in phase) errors.push(`${path}.${field}: physical or biological scenario values do not belong in historical phases`);
      }
      refs(phase.anchorIds, anchorIds, `${path}.anchorIds`); refs(phase.sourceRefs, sourceRefs, `${path}.sourceRefs`); text(phase.note, `${path}.note`);
      for (const bound of ["startBounds", "endBounds"]) if (phase[bound] !== undefined) {
        const values = phase[bound];
        if (!Array.isArray(values) || values.length !== 2) errors.push(`${path}.${bound}: two scenario bounds required`);
        else interval(values[0], values[1], `${path}.${bound}`);
      }
      if (Array.isArray(phase.anchorIds)) phase.anchorIds.forEach((id) => {
        const anchor = anchors.find((entry) => entry.id === id);
        if (anchor && (!Array.isArray(anchor.countryIds) || !anchor.countryIds.includes(row.countryId) || !Array.isArray(anchor.familyIds) || !anchor.familyIds.includes(row.familyId))) errors.push(`${path}: anchor geographic/family scope mismatch`);
        if (anchor && Array.isArray(anchor.sourceRefs) && (!Array.isArray(phase.sourceRefs) || anchor.sourceRefs.some((ref) => !(phase.sourceRefs as unknown[]).includes(ref)))) errors.push(`${path}: phase must retain its anchor sources`);
      });
    });
    rows(row.scenarioWindows, `${path}.scenarioWindows`).forEach((window) => {
      interval(window.earliestYear, window.latestYear, `${path}.window`); refs(window.anchorIds, anchorIds, `${path}.window.anchorIds`); text(window.note, `${path}.window.note`);
      if (!["onset", "retirement"].includes(String(window.kind))) errors.push(`${path}.window: invalid kind`);
      if (Array.isArray(window.anchorIds)) {
        const linked = anchors.filter((entry) => window.anchorIds && (window.anchorIds as unknown[]).includes(entry.id));
        if (linked.length && (window.earliestYear !== Math.min(...linked.map((entry) => Number(entry.startYear))) || window.latestYear !== Math.max(...linked.map((entry) => Number(entry.endYear ?? entry.startYear))))) errors.push(`${path}.window: bounds must match documented anchor years`);
        if (linked.some((entry) => entry.kind === "measurement" || entry.kind === "standard")) errors.push(`${path}.window: a policy or stock snapshot does not establish emitter onset/retirement`);
      }
    });
  });
  if (tracks.length !== countryIds.size * familyIds.size) errors.push("tracks: explicit track or gap required for every country/family");
  return errors;
}
