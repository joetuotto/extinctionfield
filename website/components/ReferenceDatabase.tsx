"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Reference, ReferenceCategory, ReferenceData } from "@/lib/references";
import { categoryName, levelLabel, loadReferences, referenceUrl } from "@/lib/references";
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
    verifiedOnly: "Verified only",
    showing: (shown: number, total: number) => `${shown} of ${total} references`,
    noResults: "No references match the current filters.",
    clear: "Clear filters",
    prev: "Previous",
    next: "Next",
    page: (p: number, total: number) => `Page ${p} of ${total}`,
    verified: "Verified",
    unverified: "Unverified",
    pathway: "Pathway",
    section: "PDF section",
    doi: "DOI / source",
    loading: "Loading references…",
    error: "Failed to load references.",
    stats: {
      total: "Total references",
      verified: "Source-verified",
      categories: "Thematic categories",
      withDoi: "With DOI link",
    },
  },
  fi: {
    search: "Hae tekijällä, otsikolla, lehdellä, DOI:lla tai avainsanalla…",
    allCategories: "Kaikki kategoriat",
    allLevels: "Kaikki evidenssitasot",
    allTypes: "Kaikki tutkimustyypit",
    verifiedOnly: "Vain varmennetut",
    showing: (shown: number, total: number) => `${shown} / ${total} viitettä`,
    noResults: "Hakua vastaavia viitteitä ei löydy.",
    clear: "Tyhjennä suodattimet",
    prev: "Edellinen",
    next: "Seuraava",
    page: (p: number, total: number) => `Sivu ${p} / ${total}`,
    verified: "Varmennettu",
    unverified: "Varmentamaton",
    pathway: "Reitti",
    section: "PDF-osio",
    doi: "DOI / lähde",
    loading: "Ladataan viitteitä…",
    error: "Viitteiden lataaminen epäonnistui.",
    stats: {
      total: "Viitteitä yhteensä",
      verified: "Lähdevarmennettu",
      categories: "Temaattista kategoriaa",
      withDoi: "DOI-linkillä",
    },
  },
} as const;

function ReferenceStats({ data, locale }: { data: ReferenceData; locale: "en" | "fi" }) {
  const d = COPY[locale].stats;
  const withDoi = data.references.filter((r) => referenceUrl(r)).length;
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
  locale: "en" | "fi";
  onSelect: (id: string) => void;
}) {
  const d = COPY[locale];
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
  locale: "en" | "fi";
  expanded: boolean;
  onToggle: () => void;
}) {
  const d = COPY[locale];
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
            <p className="text-sm leading-relaxed text-foreground-muted">{r.finding}</p>
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
        </div>
      )}
    </article>
  );
}

export function ReferenceDatabase({ locale }: { locale: string }) {
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];

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

  useEffect(() => {
    if (typeof window === "undefined" || !data) return;
    const hash = window.location.hash.slice(1);
    if (hash) {
      const ref = data.references.find((r) => r.id === hash);
      if (ref) {
        setCategory(ref.category);
        setExpanded(new Set([hash]));
        requestAnimationFrame(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
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
    return data.references.filter((r) => {
      if (category && r.category !== category) return false;
      if (levelFilter && r.level !== levelFilter) return false;
      if (typeFilter && r.type !== typeFilter) return false;
      if (verifiedOnly && !r.verified) return false;
      if (!term) return true;
      return [r.authors, r.title, r.journal, r.doi, r.finding, ...(r.pathway ?? []), ...(r.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [data, search, category, levelFilter, typeFilter, verifiedOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => {
    setPage(0);
  }, [search, category, levelFilter, typeFilter, verifiedOnly]);

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
              {levelLabel(l, activeLocale)}
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
