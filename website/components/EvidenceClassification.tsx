"use client";

import { useMemo, useState } from "react";
import { FindingCard } from "@/components/FindingCard";
import {
  CLASSIFICATION_SUMMARY,
  CLASSIFICATION_VERSION,
  FINDINGS,
  GROUP_LABELS,
  GROUP_STYLES,
  groupOf,
  type Group,
} from "@/lib/findingsClassification";

type GroupFilter = "all" | Group;
type ScopeFilter = "all" | "l_berm" | "empirical_berm" | "old_versions";

const OLD_VERSION_TARGETS = new Set([
  "berm_v6_v9_resonance",
  "berm_v6_v9_documents",
  "density_only_model",
]);

const COPY = {
  fi: {
    disclaimer:
      "Alla oleva luokittelu soveltaa BERM-päättelyprotokollaa (v1.0) aiemmin negatiivisiksi tulkittuihin havaintoihin. Uudelleenluokittelu ei tarkoita, että havainto tukisi BERM:ää — se tarkoittaa, ettei alkuperäinen testi ollut erotteleva tai kohdistui oikeaan kohteeseen. BERM:n primäärihaara (polku C / RPM / kohorttivaikutus) on edelleen empiirisesti testaamaton erottelevilla testeillä.",
    groupFilter: "Luokka",
    scopeFilter: "Kohde",
    all: "Kaikki",
    scopeL: "Koskee L-BERM:ää",
    scopeE: "Koskee empiiristä BERM:ää",
    scopeO: "Koskee vanhoja versioita",
    findings: "havaintoa",
    remains: "pysyy",
    reclassified: "uudelleenluokiteltu",
    refinement: "sisäinen tarkennus",
    none: "Ei havaintoja tällä rajauksella.",
    shown: (n: number, total: number) => `Näytetään ${n}/${total}`,
    detail: (s: typeof CLASSIFICATION_SUMMARY) =>
      `${s.affects_current_berm}/${s.total} koskee nykyistä empiiristä BERM:ää · ${s.discriminating_tests_needed} erottelevaa jatkotestiä tunnistettu`,
  },
  en: {
    disclaimer:
      "The classification below applies the BERM reasoning protocol (v1.0) to findings previously read as negative. Reclassification does not mean a finding supports BERM: it means the original test was not discriminating, or did not address the target it was taken to address. The primary branch (pathway C / RPM / cohort effect) remains empirically untested by discriminating tests.",
    groupFilter: "Class",
    scopeFilter: "Scope",
    all: "All",
    scopeL: "Affects L-BERM",
    scopeE: "Affects empirical BERM",
    scopeO: "Affects superseded versions",
    findings: "findings",
    remains: "remain",
    reclassified: "reclassified",
    refinement: "internal refinement",
    none: "No findings under this filter.",
    shown: (n: number, total: number) => `Showing ${n}/${total}`,
    detail: (s: typeof CLASSIFICATION_SUMMARY) =>
      `${s.affects_current_berm}/${s.total} affect the current empirical BERM · ${s.discriminating_tests_needed} follow-up discriminating tests identified`,
  },
} as const;

export function EvidenceClassification({ locale }: { locale: string }) {
  const fi = locale === "fi";
  const c = fi ? COPY.fi : COPY.en;
  const [group, setGroup] = useState<GroupFilter>("all");
  const [scope, setScope] = useState<ScopeFilter>("all");

  const shown = useMemo(
    () =>
      FINDINGS.filter((f) => {
        if (group !== "all" && groupOf(f) !== group) return false;
        if (scope === "l_berm") return f.affects_l_berm;
        if (scope === "empirical_berm") return f.affects_empirical_berm;
        if (scope === "old_versions") return OLD_VERSION_TARGETS.has(f.affects);
        return true;
      }),
    [group, scope],
  );

  const groupOptions: readonly { key: GroupFilter; label: string }[] = [
    { key: "all", label: c.all },
    { key: "remains_negative", label: GROUP_LABELS.remains_negative[fi ? "fi" : "en"] },
    { key: "reclassified", label: GROUP_LABELS.reclassified[fi ? "fi" : "en"] },
    { key: "internal_refinement", label: GROUP_LABELS.internal_refinement[fi ? "fi" : "en"] },
  ];
  const scopeOptions: readonly { key: ScopeFilter; label: string }[] = [
    { key: "all", label: c.all },
    { key: "l_berm", label: c.scopeL },
    { key: "empirical_berm", label: c.scopeE },
    { key: "old_versions", label: c.scopeO },
  ];

  return (
    <div className="space-y-5">
      <p className="rounded-lg border border-card-border bg-card-bg p-4 text-xs leading-relaxed text-foreground-muted">
        {c.disclaimer}
      </p>

      {/* Summary bar */}
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-y border-card-border py-3 text-sm">
        <span className="font-mono-num">
          {CLASSIFICATION_SUMMARY.total}{" "}
          <span className="text-xs text-foreground-muted">{c.findings}</span>
        </span>
        <span className="font-mono-num text-status-refuted">
          {CLASSIFICATION_SUMMARY.remains_negative}{" "}
          <span className="text-xs text-foreground-muted">{c.remains}</span>
        </span>
        <span className="font-mono-num text-status-partial">
          {CLASSIFICATION_SUMMARY.reclassified}{" "}
          <span className="text-xs text-foreground-muted">{c.reclassified}</span>
        </span>
        <span className="font-mono-num text-accent">
          {CLASSIFICATION_SUMMARY.internal_refinement}{" "}
          <span className="text-xs text-foreground-muted">{c.refinement}</span>
        </span>
        <span className="text-xs text-foreground-muted">{c.detail(CLASSIFICATION_SUMMARY)}</span>
      </div>

      {/* Filters */}
      <div className="space-y-2">
        {[
          { label: c.groupFilter, options: groupOptions, active: group, set: setGroup },
          { label: c.scopeFilter, options: scopeOptions, active: scope, set: setScope },
        ].map((row) => (
          <div key={row.label} className="flex flex-wrap items-center gap-2">
            <span className="w-14 shrink-0 text-xs uppercase tracking-wider text-foreground-muted">
              {row.label}
            </span>
            {row.options.map((option) => {
              const isActive = row.active === option.key;
              const style =
                option.key === "all" || !(option.key in GROUP_STYLES)
                  ? null
                  : GROUP_STYLES[option.key as Group];
              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => (row.set as (v: string) => void)(option.key)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    isActive
                      ? `border-accent bg-accent/10 font-medium ${style?.text ?? "text-accent"}`
                      : "border-card-border text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <p className="font-mono-num text-xs text-foreground-muted">
        {c.shown(shown.length, CLASSIFICATION_SUMMARY.total)} · CLASSIFICATION_TABLE v
        {CLASSIFICATION_VERSION}
      </p>

      {shown.length === 0 ? (
        <p className="text-sm text-foreground-muted">{c.none}</p>
      ) : (
        <div className="space-y-3">
          {shown.map((finding) => (
            <FindingCard key={finding.id} finding={finding} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
