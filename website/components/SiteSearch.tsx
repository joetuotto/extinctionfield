"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Search, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { findSearchResults, loadSearch, safeSearchUrl, searchHref, searchType, SEARCH_COPY, SEARCH_PAGE_SIZE, SEARCH_QUERY_LIMIT, SEARCH_TYPES, type SearchResult, type SearchType } from "@/lib/search";

// Render only Pagefind's documented <mark> token as markup. All other content
// becomes React text, including any unexpected tags from a source record.
function Excerpt({ html }: { html: string }) {
  const text = html.replace(/&(?:amp|lt|gt|quot|#39|#x27);/g, (entity) => ({
    "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#x27;": "'",
  })[entity] ?? entity);
  return <>{text.split(/(<mark>.*?<\/mark>)/g).map((part, index) => part.startsWith("<mark>") && part.endsWith("</mark>")
    ? <mark key={index} className="rounded-sm bg-accent/15 px-0.5 text-foreground">{part.slice(6, -7)}</mark>
    : part)}</>;
}

type ResultState = { key: string; total: number; page: number; results: SearchResult[]; error?: boolean };

export function SiteSearch({ locale }: { locale: Locale }) {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").slice(0, SEARCH_QUERY_LIMIT);
  const type = searchType(params.get("type"));
  const requestedPage = Math.max(1, Math.min(10000, Math.floor(Number(params.get("page"))) || 1));
  const copy = SEARCH_COPY[locale];
  const inputRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const focusResults = useRef(false);
  const [retry, setRetry] = useState(0);
  const [state, setState] = useState<ResultState | null>(null);
  const key = JSON.stringify([locale, query.trim(), type, requestedPage, retry]);
  const active = query.trim().length > 0;
  const ready = state?.key === key;
  const loading = active && !ready;

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    if (ready && focusResults.current) {
      summaryRef.current?.focus();
      focusResults.current = false;
    }
  }, [ready]);

  useEffect(() => {
    if (!query.trim()) return;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const engine = await loadSearch(locale);
        const response = await findSearchResults(engine, query.trim(), type);
        if (cancelled) return;
        const page = Math.min(requestedPage, Math.max(1, Math.ceil(response.results.length / SEARCH_PAGE_SIZE)));
        const results = await Promise.all(response.results.slice((page - 1) * SEARCH_PAGE_SIZE, page * SEARCH_PAGE_SIZE).map((result) => result.data()));
        if (!cancelled) setState({ key, total: response.results.length, page, results: results.filter((result) => safeSearchUrl(result.url, locale)) });
      } catch {
        if (!cancelled) setState({ key, total: 0, page: 1, results: [], error: true });
      }
    }, 180);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [key, locale, query, type, requestedPage]);

  function change(nextQuery: string, nextType: SearchType = type, page = 1, push = false) {
    const href = searchHref(locale, nextQuery, nextType, page);
    // Next integrates native history with useSearchParams, including Back/Forward.
    if (push) { focusResults.current = true; window.history.pushState(null, "", href); }
    else window.history.replaceState(null, "", href);
  }

  return (
    <>
      <form role="search" onSubmit={(event) => { event.preventDefault(); change(query.trim()); }}>
        <label htmlFor="site-search-input" className="sr-only">{copy.label}</label>
        <div className="flex min-h-14 items-center gap-3 rounded-lg border border-card-border bg-card-bg px-4 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
          <Search className="shrink-0 text-foreground-muted" size={21} aria-hidden="true" />
          <input ref={inputRef} id="site-search-input" name="q" type="search" value={query} maxLength={SEARCH_QUERY_LIMIT}
            onChange={(event) => change(event.target.value)} placeholder={copy.placeholder} autoComplete="off" spellCheck={false}
            className="site-search-input min-w-0 flex-1 bg-transparent py-4 text-base text-foreground outline-none placeholder:text-foreground-muted" />
          {query && <button type="button" onClick={() => { change(""); inputRef.current?.focus(); }} aria-label={copy.clear}
            className="flex min-h-10 min-w-10 items-center justify-center rounded-md text-foreground-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"><X size={18} aria-hidden="true" /></button>}
        </div>
        <fieldset className="mt-4 flex flex-wrap gap-2">
          <legend className="sr-only">{copy.filter}</legend>
          {SEARCH_TYPES.map((value) => <label key={value} className="cursor-pointer">
            <input className="peer sr-only" type="radio" name="type" value={value} checked={type === value} onChange={() => change(query, value)} />
            <span className="inline-flex min-h-10 items-center rounded-full border border-border px-4 text-sm text-foreground-muted peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:text-foreground">{copy[value]}</span>
          </label>)}
        </fieldset>
      </form>
      <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{copy.language}</p>

      {!active && <div className="mt-10 border-t border-border pt-6">
        <p className="mb-3 text-sm text-foreground-muted">{copy.hint}</p>
        <div className="flex flex-wrap gap-2">{copy.suggestions.map((term) => <button key={term} type="button" onClick={() => { change(term); inputRef.current?.focus(); }} className="min-h-10 rounded-md border border-border px-3 text-sm hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">{term}</button>)}</div>
      </div>}

      <div ref={summaryRef} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true" className="mt-8 rounded-sm text-sm text-foreground-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
        {loading ? copy.loading : active && ready && !state.error ? `${state.total.toLocaleString(locale)} ${copy.results}${state.total > SEARCH_PAGE_SIZE ? ` · ${copy.pageLabel} ${state.page} / ${Math.ceil(state.total / SEARCH_PAGE_SIZE)}` : ""}` : ""}
      </div>

      {active && ready && state.error && <div className="mt-4 rounded-lg border border-border p-5" role="alert">
        <p>{copy.error}</p>
        <button type="button" onClick={() => setRetry((value) => value + 1)} className="mt-3 min-h-10 rounded-md border border-border px-4 text-sm hover:border-accent focus-visible:outline-2 focus-visible:outline-accent">{copy.retry}</button>
      </div>}

      {active && ready && !state.error && state.total === 0 && <div className="mt-4 border-t border-border py-6">
        <h2 className="text-lg font-semibold">{copy.empty}</h2><p className="mt-2 text-foreground-muted">{copy.emptyHelp}</p>
      </div>}

      {active && ready && !state.error && state.total > 0 && <>
        <ol className="mt-3 divide-y divide-border border-y border-border">
          {state.results.map((result) => {
            const kind = searchType(result.meta.kind ?? null);
            const subResults = (result.sub_results ?? []).filter((sub, i, all) => sub.url.includes("#") && safeSearchUrl(sub.url, locale) && all.findIndex((other) => other.url === sub.url) === i).slice(0, 2);
            return <li key={result.url} className="py-6">
              <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground-muted"><span>{copy[kind]}</span><span className="min-w-0 break-all text-xs">{result.url.replace(`/${locale}`, "") || "/"}</span></div>
              <h2 className="text-xl font-semibold leading-snug"><Link prefetch={false} href={result.url} className="rounded-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{result.meta.title}</Link></h2>
              {result.meta.status === "pending" && <p className="mt-2 text-sm text-foreground-muted">{copy.pending}</p>}
              {result.excerpt && <p className="mt-2 break-words text-base leading-relaxed text-foreground-muted"><Excerpt html={result.excerpt} /></p>}
              {subResults.length > 0 && <ul className="mt-4 space-y-3 border-l-2 border-border pl-4">{subResults.map((sub) => <li key={sub.url}>
                <Link prefetch={false} href={sub.url} className="inline-flex items-start gap-2 rounded-sm text-sm font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><ArrowDownRight size={15} className="mt-0.5 shrink-0" aria-hidden="true" />{sub.title}</Link>
                {sub.excerpt && <p className="mt-1 break-words text-sm leading-relaxed text-foreground-muted"><Excerpt html={sub.excerpt} /></p>}
              </li>)}</ul>}
            </li>;
          })}
        </ol>
        {state.total > SEARCH_PAGE_SIZE && <nav aria-label={copy.pagination} className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button type="button" disabled={state.page === 1} onClick={() => change(query, type, state.page - 1, true)} className="min-h-11 rounded-md border border-border px-4 text-sm hover:border-accent disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-accent">{copy.previous}</button>
          <span className="text-sm text-foreground-muted">{copy.pageLabel} {state.page} / {Math.ceil(state.total / SEARCH_PAGE_SIZE)}</span>
          <button type="button" disabled={state.page * SEARCH_PAGE_SIZE >= state.total} onClick={() => change(query, type, state.page + 1, true)} className="min-h-11 rounded-md border border-border px-4 text-sm hover:border-accent disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-accent">{copy.next}</button>
        </nav>}
      </>}
    </>
  );
}
