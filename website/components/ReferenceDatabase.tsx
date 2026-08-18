"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReferenceEntry } from "@/lib/types";
import { EPISTEMIC_LEVELS } from "@/lib/evidence";

const STUDY_TYPE_LABELS: Record<string, string> = {
  review: "Review",
  meta: "Meta-analysis",
  umbrella: "Umbrella review",
  experimental: "Experimental",
  mechanistic: "Mechanistic",
  animal: "Animal",
  human_obs: "Human observational",
  cohort: "Cohort",
  rct: "RCT",
  clinical: "Clinical",
  observational: "Observational",
  case: "Case report",
  theory: "Theory",
  theoretical: "Theoretical",
  book: "Book",
};

const PATHWAY_LABELS: Record<string, string> = {
  A: "VGCC/Ca²⁺/ROS",
  B: "RPM/CRY",
  C: "Melatonin/Circadian",
  D: "HPA/HPG",
  E: "Microbiome",
  F: "Vmem/mTOR",
  T: "Sperm/Fertility",
  PV: "Pharmacological",
  RW: "Recovery window",
  EHS: "Individual susceptibility",
  S: "Sentinel species",
  H: "Historical",
  theory: "Theory",
};

interface Props {
  locale: string;
  translations: {
    searchPlaceholder: string;
    pathwayFilter: string;
    levelFilter: string;
    typeFilter: string;
    allPathways: string;
    allLevels: string;
    allTypes: string;
    nLabel: string;
    resultsCount: string;
    noResults: string;
    clearFilters: string;
    pathwayLabel: string;
    tagsLabel: string;
  };
}

export function ReferenceDatabase({ locale, translations: t }: Props) {
  const [data, setData] = useState<ReferenceEntry[]>([]);
  const [search, setSearch] = useState("");
  const [pathwayFilter, setPathwayFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/references.json")
      .then((r) => r.json())
      .then((d) => setData(d as ReferenceEntry[]));
  }, []);

  const pathways = useMemo(() => {
    const set = new Set<string>();
    data.forEach((r) => r.pathway.forEach((p) => set.add(p)));
    return Array.from(set).sort();
  }, [data]);

  const levels = useMemo(() => {
    const set = new Set<string>();
    data.forEach((r) => set.add(r.level));
    return Array.from(set).sort();
  }, [data]);

  const types = useMemo(() => {
    const set = new Set<string>();
    data.forEach((r) => set.add(r.type));
    return Array.from(set).sort();
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter((r) => {
      if (pathwayFilter && !r.pathway.includes(pathwayFilter)) return false;
      if (levelFilter && r.level !== levelFilter) return false;
      if (typeFilter && r.type !== typeFilter) return false;
      if (q) {
        return (
          r.title.toLowerCase().includes(q) ||
          r.authors.toLowerCase().includes(q) ||
          r.finding.toLowerCase().includes(q) ||
          r.tags.some((tag) => tag.includes(q)) ||
          r.journal.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [data, search, pathwayFilter, levelFilter, typeFilter]);

  const hasFilters = search || pathwayFilter || levelFilter || typeFilter;

  const levelColor = (level: string) => {
    const ep = EPISTEMIC_LEVELS[level as keyof typeof EPISTEMIC_LEVELS];
    return ep?.color ?? "#737373";
  };

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full px-4 py-2.5 bg-card-bg border border-card-border rounded-lg text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={pathwayFilter}
          onChange={(e) => setPathwayFilter(e.target.value)}
          className="px-3 py-1.5 bg-card-bg border border-card-border rounded-lg text-xs text-foreground-muted focus:outline-none focus:border-accent"
        >
          <option value="">{t.allPathways}</option>
          {pathways.map((p) => (
            <option key={p} value={p}>
              {PATHWAY_LABELS[p] ?? p}
            </option>
          ))}
        </select>

        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="px-3 py-1.5 bg-card-bg border border-card-border rounded-lg text-xs text-foreground-muted focus:outline-none focus:border-accent"
        >
          <option value="">{t.allLevels}</option>
          {levels.map((l) => (
            <option key={l} value={l}>
              {EPISTEMIC_LEVELS[l as keyof typeof EPISTEMIC_LEVELS]?.label ?? l}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-1.5 bg-card-bg border border-card-border rounded-lg text-xs text-foreground-muted focus:outline-none focus:border-accent"
        >
          <option value="">{t.allTypes}</option>
          {types.map((ty) => (
            <option key={ty} value={ty}>
              {STUDY_TYPE_LABELS[ty] ?? ty}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={() => {
              setSearch("");
              setPathwayFilter("");
              setLevelFilter("");
              setTypeFilter("");
            }}
            className="px-3 py-1.5 text-xs text-status-refuted hover:text-foreground transition-colors"
          >
            {t.clearFilters}
          </button>
        )}

        <span className="ml-auto text-xs text-foreground-muted self-center">
          {t.resultsCount.replace("{count}", String(filtered.length)).replace("{total}", String(data.length))}
        </span>
      </div>

      {/* Results */}
      {filtered.length === 0 && data.length > 0 && (
        <p className="text-sm text-foreground-muted py-8 text-center">
          {t.noResults}
        </p>
      )}

      <div className="space-y-2">
        {filtered.map((ref) => {
          const isOpen = expandedId === ref.id;
          return (
            <div
              key={ref.id}
              className="border border-card-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isOpen ? null : ref.id)}
                className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-card-bg/50 transition-colors"
              >
                <span
                  className="flex-shrink-0 mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium"
                  style={{
                    backgroundColor: `${levelColor(ref.level)}18`,
                    color: levelColor(ref.level),
                    border: `1px solid ${levelColor(ref.level)}40`,
                  }}
                >
                  {ref.level}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {ref.authors} ({ref.year})
                  </p>
                  <p className="text-xs text-foreground-muted truncate">
                    {ref.title}
                  </p>
                </div>
                <span className="flex-shrink-0 text-foreground-muted text-xs mt-1">
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-card-border/50 pt-3 space-y-3">
                  <p className="text-xs text-foreground-muted italic">
                    {ref.journal}
                    {ref.n != null && (
                      <span>
                        {" "}
                        &middot; {t.nLabel} {ref.n.toLocaleString(locale)}
                      </span>
                    )}
                    {" "}&middot; {STUDY_TYPE_LABELS[ref.type] ?? ref.type}
                  </p>

                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {ref.finding}
                  </p>

                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] font-semibold text-foreground-muted uppercase tracking-wide">
                      {t.pathwayLabel}:
                    </span>
                    {ref.pathway.map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setPathwayFilter(p);
                          setExpandedId(null);
                        }}
                        className="px-2 py-0.5 text-[10px] rounded-full bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                      >
                        {PATHWAY_LABELS[p] ?? p}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] font-semibold text-foreground-muted uppercase tracking-wide">
                      {t.tagsLabel}:
                    </span>
                    {ref.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] rounded-full bg-foreground/5 text-foreground-muted border border-foreground/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
