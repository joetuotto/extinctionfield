"use client";

import { useMemo, useState } from "react";
import { FindingCard } from "@/components/FindingCard";
import { pickCopy } from "@/lib/i18n";
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
      "Alla oleva luokittelu soveltaa BERM-päättelyprotokollaa (v1.0) aiemmin negatiivisiksi tulkittuihin havaintoihin. Uudelleenluokittelu ei tarkoita, että havainto tukisi BERM:ää — se tarkoittaa, ettei alkuperäinen testi ollut erotteleva tai kohdistui oikeaan kohteeseen. BERM:n primäärihaara (polku B / RPM / kohorttivaikutus) on edelleen empiirisesti testaamaton erottelevilla testeillä.",
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
      "The classification below applies the BERM reasoning protocol (v1.0) to findings previously read as negative. Reclassification does not mean a finding supports BERM: it means the original test was not discriminating, or did not address the target it was taken to address. The primary branch (pathway B / RPM / cohort effect) remains empirically untested by discriminating tests.",
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
  ja: {
    disclaimer:
      "以下の分類は、以前否定的と解釈された所見にBERM推論プロトコル（v1.0）を適用したものです。再分類は所見がBERMを支持することを意味しません。元のテストが弁別的でなかったか、対象とされた標的に対処していなかったことを意味します。主要分岐（パスウェイB / RPM / コホート効果）は弁別的テストによる経験的検証が未了です。",
    groupFilter: "分類",
    scopeFilter: "範囲",
    all: "すべて",
    scopeL: "L-BERMに影響",
    scopeE: "経験的BERMに影響",
    scopeO: "旧バージョンに影響",
    findings: "件の所見",
    remains: "件は維持",
    reclassified: "件は再分類",
    refinement: "内部改良",
    none: "このフィルタに該当する所見はありません。",
    shown: (n: number, total: number) => `${n}/${total}件を表示`,
    detail: (s: typeof CLASSIFICATION_SUMMARY) =>
      `${s.affects_current_berm}/${s.total}件が現在の経験的BERMに影響 · ${s.discriminating_tests_needed}件の弁別的フォローアップテストを特定`,
  },
  fr: {
    disclaimer:
      "La classification ci-dessous applique le protocole de raisonnement BERM (v1.0) aux résultats précédemment interprétés comme négatifs. La reclassification ne signifie pas qu'un résultat soutient le BERM : elle signifie que le test original n'était pas discriminant, ou ne portait pas sur la cible visée. La branche principale (voie B / RPM / effet de cohorte) reste empiriquement non testée par des tests discriminants.",
    groupFilter: "Classe",
    scopeFilter: "Portée",
    all: "Tous",
    scopeL: "Concerne L-BERM",
    scopeE: "Concerne le BERM empirique",
    scopeO: "Concerne les versions obsolètes",
    findings: "résultats",
    remains: "maintenus",
    reclassified: "reclassifiés",
    refinement: "affinement interne",
    none: "Aucun résultat avec ce filtre.",
    shown: (n: number, total: number) => `Affichage ${n}/${total}`,
    detail: (s: typeof CLASSIFICATION_SUMMARY) =>
      `${s.affects_current_berm}/${s.total} concernent le BERM empirique actuel · ${s.discriminating_tests_needed} tests discriminants de suivi identifiés`,
  },
  ko: {
    disclaimer:
      "아래 분류는 이전에 부정적으로 해석된 소견에 BERM 추론 프로토콜(v1.0)을 적용한 것입니다. 재분류가 소견이 BERM을 지지함을 의미하지는 않습니다. 원래 테스트가 변별적이지 않았거나 의도된 대상을 다루지 않았음을 의미합니다. 주요 분기(경로 B / RPM / 코호트 효과)는 변별적 테스트로 경험적 검증이 아직 이루어지지 않은 상태입니다.",
    groupFilter: "분류",
    scopeFilter: "범위",
    all: "전체",
    scopeL: "L-BERM에 영향",
    scopeE: "경험적 BERM에 영향",
    scopeO: "구 버전에 영향",
    findings: "건의 소견",
    remains: "건 유지",
    reclassified: "건 재분류",
    refinement: "내부 개선",
    none: "이 필터에 해당하는 소견이 없습니다.",
    shown: (n: number, total: number) => `${n}/${total}건 표시`,
    detail: (s: typeof CLASSIFICATION_SUMMARY) =>
      `${s.affects_current_berm}/${s.total}건이 현재 경험적 BERM에 영향 · ${s.discriminating_tests_needed}건의 변별적 후속 테스트 식별`,
  },
} as const;

export function EvidenceClassification({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale);
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
    { key: "remains_negative", label: (GROUP_LABELS.remains_negative as Record<string, string>)[locale] ?? GROUP_LABELS.remains_negative.en },
    { key: "reclassified", label: (GROUP_LABELS.reclassified as Record<string, string>)[locale] ?? GROUP_LABELS.reclassified.en },
    { key: "internal_refinement", label: (GROUP_LABELS.internal_refinement as Record<string, string>)[locale] ?? GROUP_LABELS.internal_refinement.en },
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
