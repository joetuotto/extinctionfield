import { isValidLocale, type Locale } from "./i18n";

export const SEARCH_TYPES = ["all", "page", "article", "reference"] as const;
export type SearchType = (typeof SEARCH_TYPES)[number];
export const SEARCH_PAGE_SIZE = 10;
export const SEARCH_QUERY_LIMIT = 200;

export const SEARCH_COPY = {
  en: {
    title: "Search", description: "Find pages, articles and references across Extinction Field.",
    placeholder: "Search a topic, concept, author or DOI…", label: "Search the site", clear: "Clear search",
    all: "All content", page: "Pages", article: "Articles", reference: "References", filter: "Content type",
    loading: "Searching…", results: "results", empty: "No results found.",
    emptyHelp: "Try fewer words, another spelling or a broader topic.",
    error: "Search could not be loaded. Please try again.", retry: "Try again",
    previous: "Previous", next: "Next", pagination: "Search result pages", pageLabel: "Page",
    hint: "Try a topic", language: "Search uses the selected language, including any English text shown on those pages. It does not translate search terms.",
    noScript: "Enable JavaScript to search, or browse the reference database.", referencesLink: "Browse references",
    pending: "Reference metadata awaiting verification", suggestions: ["FieldState", "Lindgren", "melatonin", "fertility"],
  },
  fi: {
    title: "Haku", description: "Etsi Extinction Fieldin sivuja, artikkeleita ja lähteitä.",
    placeholder: "Hae aihetta, käsitettä, tekijää tai DOI-tunnusta…", label: "Hae sivustolta", clear: "Tyhjennä haku",
    all: "Kaikki sisällöt", page: "Sivut", article: "Artikkelit", reference: "Lähteet", filter: "Sisältötyyppi",
    loading: "Haetaan…", results: "hakutulosta", empty: "Hakutuloksia ei löytynyt.",
    emptyHelp: "Kokeile vähemmän hakusanoja, toista kirjoitusasua tai laajempaa aihetta.",
    error: "Hakua ei voitu ladata. Yritä uudelleen.", retry: "Yritä uudelleen",
    previous: "Edellinen", next: "Seuraava", pagination: "Hakutulossivut", pageLabel: "Sivu",
    hint: "Kokeile aihetta", language: "Haku kattaa valitun kieliversion ja siinä näkyvät englanninkieliset tekstit. Hakusanoja ei käännetä automaattisesti.",
    noScript: "Ota JavaScript käyttöön hakeaksesi tai selaa lähdetietokantaa.", referencesLink: "Selaa lähteitä",
    pending: "Lähteen tiedot odottavat varmennusta", suggestions: ["FieldState", "Lindgren", "melatoniini", "hedelmällisyys"],
  },
  ja: {
    title: "検索", description: "Extinction Fieldのページ、記事、参考文献を検索します。",
    placeholder: "トピック、概念、著者、DOIを検索…", label: "サイト内検索", clear: "検索をクリア",
    all: "すべて", page: "ページ", article: "記事", reference: "参考文献", filter: "コンテンツの種類",
    loading: "検索中…", results: "件", empty: "検索結果がありません。", emptyHelp: "語数を減らすか、別の表記や広いトピックでお試しください。",
    error: "検索を読み込めませんでした。もう一度お試しください。", retry: "再試行", previous: "前へ", next: "次へ", pagination: "検索結果ページ", pageLabel: "ページ",
    hint: "トピックの例", language: "選択した言語のページと、そこに表示される英語を検索します。検索語は自動翻訳されません。",
    noScript: "検索にはJavaScriptを有効にするか、参考文献データベースをご覧ください。", referencesLink: "参考文献を見る",
    pending: "参考文献のメタデータは検証待ちです", suggestions: ["FieldState", "Lindgren", "メラトニン", "生殖"],
  },
  fr: {
    title: "Recherche", description: "Rechercher les pages, articles et références d’Extinction Field.",
    placeholder: "Sujet, concept, auteur ou DOI…", label: "Rechercher sur le site", clear: "Effacer la recherche",
    all: "Tout", page: "Pages", article: "Articles", reference: "Références", filter: "Type de contenu",
    loading: "Recherche…", results: "résultats", empty: "Aucun résultat.", emptyHelp: "Essayez moins de mots, une autre orthographe ou un sujet plus large.",
    error: "La recherche n’a pas pu être chargée. Réessayez.", retry: "Réessayer", previous: "Précédent", next: "Suivant", pagination: "Pages de résultats", pageLabel: "Page",
    hint: "Essayez un sujet", language: "La recherche couvre la langue sélectionnée et les textes anglais affichés dans ces pages. Les termes ne sont pas traduits.",
    noScript: "Activez JavaScript pour rechercher ou consultez les références.", referencesLink: "Parcourir les références",
    pending: "Métadonnées de la référence à vérifier", suggestions: ["FieldState", "Lindgren", "mélatonine", "fertilité"],
  },
  ko: {
    title: "검색", description: "Extinction Field의 페이지, 기사, 참고문헌을 검색합니다.",
    placeholder: "주제, 개념, 저자 또는 DOI 검색…", label: "사이트 검색", clear: "검색 지우기",
    all: "전체", page: "페이지", article: "기사", reference: "참고문헌", filter: "콘텐츠 유형",
    loading: "검색 중…", results: "개 결과", empty: "검색 결과가 없습니다.", emptyHelp: "검색어를 줄이거나 다른 표기 또는 더 넓은 주제로 검색해 보세요.",
    error: "검색을 불러올 수 없습니다. 다시 시도해 주세요.", retry: "다시 시도", previous: "이전", next: "다음", pagination: "검색 결과 페이지", pageLabel: "페이지",
    hint: "주제 예시", language: "선택한 언어의 페이지와 해당 페이지에 표시된 영어 텍스트를 검색합니다. 검색어는 자동 번역되지 않습니다.",
    noScript: "검색하려면 JavaScript를 활성화하거나 참고문헌을 둘러보세요.", referencesLink: "참고문헌 둘러보기",
    pending: "참고문헌 메타데이터 확인 대기 중", suggestions: ["FieldState", "Lindgren", "멜라토닌", "생식"],
  },
} as const;

export interface SearchResult {
  url: string;
  excerpt: string;
  meta: { title: string; kind?: string; status?: string };
  sub_results?: { title: string; url: string; excerpt: string }[];
}

interface Pagefind {
  options: (options: { excerptLength: number }) => Promise<void>;
  search: (query: string, options: { filters: Record<string, string | { any: string[] }> }) => Promise<{
    results: { id: string; data: () => Promise<SearchResult> }[];
  }>;
}

export async function findSearchResults(engine: Pagefind, query: string, type: SearchType) {
  if (type !== "all") return engine.search(query, { filters: { kind: type } });
  // The reader is finding site content. Keep the much larger bibliography from
  // crowding out explanatory pages, while preserving relevance within each group.
  const [content, references] = await Promise.all([
    engine.search(query, { filters: { kind: { any: ["page", "article"] } } }),
    engine.search(query, { filters: { kind: "reference" } }),
  ]);
  return { results: [...content.results, ...references.results] };
}

const engines = new Map<Locale, Promise<Pagefind>>();

export function loadSearch(locale: Locale): Promise<Pagefind> {
  if (!isValidLocale(locale)) return Promise.reject(new Error("Invalid search language"));
  const cached = engines.get(locale);
  if (cached) return cached;
  // Generated after next build; load only the selected language when searching.
  const url = `/pagefind/${locale}/pagefind.js`;
  const engine = (import(/* webpackIgnore: true */ url) as Promise<Pagefind>)
    .then(async (pagefind) => {
      await pagefind.options({ excerptLength: 28 });
      return pagefind;
    }).catch((error: unknown) => {
      engines.delete(locale);
      throw error;
    });
  engines.set(locale, engine);
  return engine;
}

export function searchType(value: string | null): SearchType {
  return SEARCH_TYPES.includes(value as SearchType) ? value as SearchType : "all";
}

export function searchHref(locale: Locale, query: string, type: SearchType = "all", page = 1): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query.slice(0, SEARCH_QUERY_LIMIT));
  if (type !== "all") params.set("type", type);
  if (page > 1) params.set("page", String(page));
  return `/${locale}/search${params.size ? `?${params}` : ""}`;
}

/** Only use links within the selected locale, never external result URLs. */
export function safeSearchUrl(url: string, locale: Locale): boolean {
  return url === `/${locale}` || (url.startsWith(`/${locale}/`) && !/[\\\s]/.test(url));
}
