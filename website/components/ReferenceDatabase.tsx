"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Reference, ReferenceCategory, ReferenceData } from "@/lib/references";
import { categoryName, levelLabel, loadReferences, referenceUrl } from "@/lib/references";
import { pickCopy } from "@/lib/i18n";
import { BermIcon } from "@/components/BermIcon";
import type { BermIconName } from "@/components/BermIcon";

const CATEGORY_ICONS: Record<string, BermIconName> = {
  physics_theory: "physics",
  transduction_rpm_calcium: "signal",
  cellular_ros_dna: "cellular",
  reproduction_hormones: "reproduction",
  neurobiology_circadian: "neurobiology",
  ecology_sentinels: "honeybee",
  rf_safety_regulation: "rf-safety",
  history_institutional: "history",
};

const PAGE_SIZE = 20;

const COPY = {
  en: {
    search: "Search by author, title, journal, DOI or keyword…",
    allCategories: "All categories",
    allLevels: "All evidence levels",
    allTypes: "All study types",
    verifiedOnly: "Source-verified records only",
    showing: (shown: number, total: number) => `${shown} of ${total} references`,
    noResults: "No references match the current filters.",
    clear: "Clear filters",
    prev: "Previous",
    next: "Next",
    page: (p: number, total: number) => `Page ${p} of ${total}`,
    verified: "Source verified",
    unverified: "Source not verified",
    pathway: "Pathway",
    section: "PDF section",
    doi: "DOI / source",
    loading: "Loading references…",
    error: "Failed to load references.",
    details: "Source details",
    stats: {
      total: "Total references",
      verified: "Source-verified records",
      categories: "Thematic categories",
      withDoi: "With a verified source link",
    },
  },
  fi: {
    search: "Hae tekijällä, otsikolla, lehdellä, DOI:lla tai avainsanalla…",
    allCategories: "Kaikki kategoriat",
    allLevels: "Kaikki näyttötasot",
    allTypes: "Kaikki tutkimustyypit",
    verifiedOnly: "Vain lähdevarmennetut tietueet",
    showing: (shown: number, total: number) => `${shown} / ${total} viitettä`,
    noResults: "Hakua vastaavia viitteitä ei löydy.",
    clear: "Tyhjennä suodattimet",
    prev: "Edellinen",
    next: "Seuraava",
    page: (p: number, total: number) => `Sivu ${p} / ${total}`,
    verified: "Lähde varmennettu",
    unverified: "Lähdettä ei varmennettu",
    pathway: "Reitti",
    section: "PDF-osio",
    doi: "DOI / lähde",
    loading: "Ladataan viitteitä…",
    error: "Viitteiden lataaminen epäonnistui.",
    details: "Lähdetiedot",
    stats: {
      total: "Viitteitä yhteensä",
      verified: "Lähdevarmennettuja tietueita",
      categories: "Temaattista kategoriaa",
      withDoi: "Varmennetulla lähdelinkillä",
    },
  },
  ja: {
    search: "著者、タイトル、雑誌、DOIまたはキーワードで検索...",
    allCategories: "全カテゴリー",
    allLevels: "全エビデンスレベル",
    allTypes: "全研究タイプ",
    verifiedOnly: "出典確認済みのみ",
    showing: (shown: number, total: number) => `${total}件中${shown}件`,
    noResults: "現在のフィルターに一致する参考文献がありません。",
    clear: "フィルターをクリア",
    prev: "前へ",
    next: "次へ",
    page: (p: number, total: number) => `${total}ページ中${p}ページ`,
    verified: "出典確認済み",
    unverified: "出典未確認",
    pathway: "経路",
    section: "PDFセクション",
    doi: "DOI / 出典",
    loading: "参考文献を読み込み中...",
    error: "参考文献の読み込みに失敗しました。",
    details: "出典情報",
    stats: {
      total: "参考文献総数",
      verified: "出典確認済みレコード",
      categories: "テーマカテゴリー",
      withDoi: "検証済み出典リンク付き",
    },
  },
  fr: {
    search: "Rechercher par auteur, titre, revue, DOI ou mot-cle...",
    allCategories: "Toutes les categories",
    allLevels: "Tous les niveaux de preuve",
    allTypes: "Tous les types d'etude",
    verifiedOnly: "Sources vérifiées uniquement",
    showing: (shown: number, total: number) => `${shown} sur ${total} references`,
    noResults: "Aucune reference ne correspond aux filtres actuels.",
    clear: "Effacer les filtres",
    prev: "Precedent",
    next: "Suivant",
    page: (p: number, total: number) => `Page ${p} sur ${total}`,
    verified: "Source vérifiée",
    unverified: "Source non vérifiée",
    pathway: "Voie",
    section: "Section PDF",
    doi: "DOI / source",
    loading: "Chargement des references...",
    error: "Echec du chargement des references.",
    details: "Détails de la source",
    stats: {
      total: "Total des references",
      verified: "Notices à source vérifiée",
      categories: "Categories thematiques",
      withDoi: "Avec un lien source verifie",
    },
  },
  ko: {
    search: "저자, 제목, 학술지, DOI 또는 키워드로 검색...",
    allCategories: "전체 카테고리",
    allLevels: "전체 증거 수준",
    allTypes: "전체 연구 유형",
    verifiedOnly: "출처 확인 레코드만",
    showing: (shown: number, total: number) => `${total}건 중 ${shown}건`,
    noResults: "현재 필터와 일치하는 참고문헌이 없습니다.",
    clear: "필터 지우기",
    prev: "이전",
    next: "다음",
    page: (p: number, total: number) => `${total}페이지 중 ${p}페이지`,
    verified: "출처 확인됨",
    unverified: "출처 미확인",
    pathway: "경로",
    section: "PDF 섹션",
    doi: "DOI / 출처",
    loading: "참고문헌 로딩 중...",
    error: "참고문헌 로딩에 실패했습니다.",
    details: "출처 정보",
    stats: {
      total: "참고문헌 총수",
      verified: "출처 확인 레코드",
      categories: "주제 카테고리",
      withDoi: "검증된 출처 링크 포함",
    },
  },
} as const;

function ReferenceStats({ data, locale }: { data: ReferenceData; locale: string }) {
  const d = pickCopy(COPY, locale).stats;
  const withDoi = data.metadata.linked_count ?? data.references.filter((r) => referenceUrl(r)).length;
  const stats = [
    { value: data.metadata.total_references, label: d.total },
    { value: data.metadata.verified_count, label: d.verified },
    { value: data.categories.length, label: d.categories },
    { value: withDoi, label: d.withDoi },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="border border-card-border bg-card-bg rounded-lg p-4 text-center">
          <p className="text-2xl font-bold font-mono-num">{s.value}</p>
          <p className="text-xs text-foreground-muted mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function CategoryTabs({
  categories,
  active,
  counts,
  locale,
  onSelect,
}: {
  categories: readonly ReferenceCategory[];
  active: string;
  counts: Record<string, number>;
  locale: string;
  onSelect: (id: string) => void;
}) {
  const d = pickCopy(COPY, locale);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
      <button
        type="button"
        onClick={() => onSelect("")}
        className={`px-3 py-2.5 rounded-lg text-sm text-left transition-colors border ${
          active === ""
            ? "border-accent bg-accent/10 text-accent font-semibold"
            : "border-card-border bg-card-bg text-foreground-muted hover:border-foreground-muted"
        }`}
      >
        <BermIcon name="history" size={14} className="mr-1.5 inline-block align-[-0.1em]" />
        {d.allCategories}
        <span className="font-mono-num text-xs ml-1 opacity-60">({counts["all"] ?? 0})</span>
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelect(cat.id)}
          className={`px-3 py-2.5 rounded-lg text-sm text-left transition-colors border ${
            active === cat.id
              ? "font-semibold"
              : "border-card-border bg-card-bg text-foreground-muted hover:border-foreground-muted"
          }`}
          style={
            active === cat.id
              ? { borderColor: cat.color, backgroundColor: `${cat.color}15`, color: cat.color }
              : undefined
          }
        >
          {(() => { const iconName = CATEGORY_ICONS[cat.id]; return iconName ? <BermIcon name={iconName} size={14} className="mr-1.5 inline-block align-[-0.1em]" /> : <span className="mr-1.5">{cat.icon}</span>; })()}
          {categoryName(cat, locale)}
          <span className="font-mono-num text-xs ml-1 opacity-60">({counts[cat.id] ?? 0})</span>
        </button>
      ))}
    </div>
  );
}

function ReferenceCard({
  record: r,
  locale,
  expanded,
  onToggle,
}: {
  record: Reference;
  locale: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const d = pickCopy(COPY, locale);
  const doiUrl = referenceUrl(r);

  return (
    <article id={r.id} className="border border-card-border bg-card-bg rounded-lg p-4 scroll-mt-24">
      <button type="button" onClick={onToggle} className="w-full text-left">
        <div className="flex flex-wrap gap-x-3 gap-y-1 items-baseline justify-between">
          <h3 className="font-medium text-sm">{r.authors}</h3>
          <div className="flex items-center gap-2">
            {r.verified && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-status-confirmed/15 text-status-confirmed font-semibold">
                {d.verified}
              </span>
            )}
            <span className="font-mono-num text-xs text-foreground-muted">
              {r.year === 0 ? "n.d." : r.year}
            </span>
          </div>
        </div>
        <p className="mt-1 text-sm text-foreground-muted leading-relaxed">{r.title}</p>
      </button>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-card-border space-y-2">
          {r.journal && (
            <p className="text-xs text-foreground-muted">
              <span className="italic">{r.journal}</span>
            </p>
          )}
          {r.finding && (
            <div>
              <p className="text-sm leading-relaxed text-foreground-muted">{r.finding}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-1.5 items-center">
            {r.level && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">
                {levelLabel(r.level, locale)}
              </span>
            )}
            {r.type && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-foreground-muted/10 text-foreground-muted">
                {r.type}
              </span>
            )}
            {(r.pathway ?? []).map((p) => (
              <span
                key={p}
                className="text-[10px] px-1.5 py-0.5 rounded bg-foreground-muted/10 text-foreground-muted"
              >
                {p}
              </span>
            ))}
          </div>
          {r.pdf_section && (
            <p className="text-xs text-foreground-muted">
              {d.section}: {r.pdf_section}
              {r.pdf_number != null ? ` #${r.pdf_number}` : ""}
            </p>
          )}
          {doiUrl && (
            <a
              href={doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-accent hover:underline"
            >
              {d.doi} ↗
            </a>
          )}
          <Link
            href={`/${locale}/references/${r.id}`}
            className="ml-3 inline-block text-xs text-accent hover:underline"
          >
            {d.details} →
          </Link>
        </div>
      )}
    </article>
  );
}

export function ReferenceDatabase({ locale }: { locale: string }) {
  const activeLocale = locale;
  const libLocale: "en" | "fi" = locale === "fi" ? "fi" : "en";
  const d = pickCopy(COPY, activeLocale);

  const [data, setData] = useState<ReferenceData | null>(null);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadReferences().then(setData).catch(() => setError(true));
  }, []);

  const [prevData, setPrevData] = useState<ReferenceData | null>(null);
  if (data !== prevData) {
    setPrevData(data);
    if (data && typeof window !== "undefined") {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const ref = data.references.find((r) => r.id === hash);
        if (ref) {
          setCategory(ref.category);
          setExpanded(new Set([hash]));
        }
      }
    }
  }

  useEffect(() => {
    if (!data) return;
    const hash = window.location.hash.slice(1);
    if (hash && data.references.some((r) => r.id === hash)) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }, [data]);

  const categoryCounts = useMemo(() => {
    if (!data) return {};
    const counts: Record<string, number> = { all: data.references.length };
    for (const r of data.references) {
      counts[r.category] = (counts[r.category] ?? 0) + 1;
    }
    return counts;
  }, [data]);

  const levels = useMemo(() => {
    if (!data) return [];
    const set = new Set<string>();
    for (const r of data.references) {
      if (r.level) set.add(r.level);
    }
    return [...set].sort();
  }, [data]);

  const types = useMemo(() => {
    if (!data) return [];
    const set = new Set<string>();
    for (const r of data.references) {
      if (r.type) set.add(r.type);
    }
    return [...set].sort();
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const term = search.trim().toLowerCase();
    const matches = data.references.filter((r) => {
      if (category && r.category !== category) return false;
      if (levelFilter && r.level !== levelFilter) return false;
      if (typeFilter && r.type !== typeFilter) return false;
      if (verifiedOnly && !r.verified) return false;
      if (!term) return true;
      const haystack = [r.id, ...(r.aliases ?? []), r.authors, r.year, r.title, r.journal, r.doi, r.pmid, r.pmcid, r.url, r.finding, ...(r.pathway ?? []), ...(r.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return term.split(/\s+/).every((token) => haystack.includes(token));
    });

    // Keep useful bibliographic records ahead of incomplete migration stubs.
    // Stubs remain searchable and visible, but the default first page should
    // never consist of empty author/title rows.
    const completeness = (reference: Reference) =>
      (reference.title ? 8 : 0) +
      (reference.authors ? 4 : 0) +
      (reference.year > 0 ? 2 : 0) +
      (referenceUrl(reference) ? 1 : 0);

    return matches.sort((a, b) => {
      const score = completeness(b) - completeness(a);
      if (score) return score;
      const author = (a.authors || a.title || a.id).localeCompare(b.authors || b.title || b.id, libLocale);
      if (author) return author;
      return b.year - a.year;
    });
  }, [data, search, category, levelFilter, typeFilter, verifiedOnly, libLocale]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const [prevFilters, setPrevFilters] = useState({ search, category, levelFilter, typeFilter, verifiedOnly });
  if (
    search !== prevFilters.search ||
    category !== prevFilters.category ||
    levelFilter !== prevFilters.levelFilter ||
    typeFilter !== prevFilters.typeFilter ||
    verifiedOnly !== prevFilters.verifiedOnly
  ) {
    setPrevFilters({ search, category, levelFilter, typeFilter, verifiedOnly });
    setPage(0);
  }

  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const hasFilters = Boolean(search || category || levelFilter || typeFilter || verifiedOnly);

  const clearAll = () => {
    setSearch("");
    setCategory("");
    setLevelFilter("");
    setTypeFilter("");
    setVerifiedOnly(false);
  };

  if (error) return <p className="text-sm text-foreground-muted">{d.error}</p>;
  if (!data) return <p className="text-sm text-foreground-muted animate-pulse">{d.loading}</p>;

  return (
    <section>
      <ReferenceStats data={data} locale={activeLocale} />

      <CategoryTabs
        categories={data.categories}
        active={category}
        counts={categoryCounts}
        locale={activeLocale}
        onSelect={setCategory}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={d.search}
          className="min-w-0 flex-1 px-4 py-2.5 bg-card-bg border border-card-border rounded-lg text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="px-3 py-2 bg-card-bg border border-card-border rounded-lg text-xs text-foreground-muted focus:outline-none focus:border-accent"
        >
          <option value="">{d.allLevels}</option>
          {levels.map((l) => (
            <option key={l} value={l}>
              {levelLabel(l, libLocale)}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 bg-card-bg border border-card-border rounded-lg text-xs text-foreground-muted focus:outline-none focus:border-accent"
        >
          <option value="">{d.allTypes}</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-1.5 px-3 py-2 bg-card-bg border border-card-border rounded-lg text-xs text-foreground-muted cursor-pointer">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="accent-accent"
          />
          {d.verifiedOnly}
        </label>
      </div>

      <div className="flex items-center justify-between gap-3 mb-5 text-sm text-foreground-muted">
        <p>{d.showing(filtered.length, data.references.length)}</p>
        {hasFilters && (
          <button type="button" onClick={clearAll} className="text-accent hover:underline text-xs">
            {d.clear}
          </button>
        )}
      </div>

      {!filtered.length ? (
        <p className="border border-card-border rounded-lg p-6 text-sm text-foreground-muted">
          {d.noResults}
        </p>
      ) : (
        <>
          <div className="space-y-3">
            {pageItems.map((r) => (
              <ReferenceCard
                key={r.id}
                record={r}
                locale={activeLocale}
                expanded={expanded.has(r.id)}
                onToggle={() => toggleExpand(r.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 text-sm rounded-lg border border-card-border bg-card-bg text-foreground-muted hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {d.prev}
              </button>
              <span className="text-sm text-foreground-muted font-mono-num">
                {d.page(page + 1, totalPages)}
              </span>
              <button
                type="button"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 text-sm rounded-lg border border-card-border bg-card-bg text-foreground-muted hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {d.next}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
