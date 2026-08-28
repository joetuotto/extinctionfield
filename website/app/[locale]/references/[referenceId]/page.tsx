import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, BookOpen, ExternalLink, Link2, MapPin } from "lucide-react";
import { canonicalReference, bibliography, referenceUsages } from "@/lib/referenceRegistry.server";
import type { Reference } from "@/lib/references";
import { referenceUrl } from "@/lib/references";
import { locales, pickCopy } from "@/lib/i18n";

const BASE_URL = "https://extinctionfield.com";

const COPY = {
  en: {
    back: "Reference database",
    source: "Open original source",
    unavailable: "A verified external source link is not yet available.",
    bibliography: "Bibliography",
    status: "Source-link status",
    verified: "Metadata matched",
    registered: "Registered identifier",
    pending: "Verification pending",
    missing: "Missing",
    mentioned: "Mentioned on these pages",
    notMentioned: "No structured usage location has been indexed yet.",
    incomplete: "This record is incomplete and is excluded from search-engine indexing until its metadata is verified.",
  },
  fi: {
    back: "Lähdetietokanta",
    source: "Avaa alkuperäinen lähde",
    unavailable: "Varmennettua ulkoista lähdelinkkiä ei ole vielä saatavilla.",
    bibliography: "Bibliografiset tiedot",
    status: "Lähdelinkin tila",
    verified: "Metatiedot varmennettu",
    registered: "Rekisteröity tunniste",
    pending: "Varmennus kesken",
    missing: "Puuttuu",
    mentioned: "Mainittu näillä sivuilla",
    notMentioned: "Rakenteista käyttöpaikkaa ei ole vielä indeksoitu.",
    incomplete: "Tietue on puutteellinen eikä sitä indeksoida hakukoneisiin ennen metatietojen varmentamista.",
  },
  ja: { back: "参考文献データベース", source: "原典を開く", unavailable: "検証済みの外部リンクはまだありません。", bibliography: "書誌情報", status: "リンクの状態", verified: "メタデータ検証済み", registered: "登録済み識別子", pending: "検証中", missing: "未登録", mentioned: "使用されているページ", notMentioned: "構造化された使用箇所はまだありません。", incomplete: "メタデータ検証前の不完全なレコードのため、検索エンジンには登録されません。" },
  fr: { back: "Base de références", source: "Ouvrir la source originale", unavailable: "Aucun lien externe vérifié n'est encore disponible.", bibliography: "Bibliographie", status: "État du lien", verified: "Métadonnées vérifiées", registered: "Identifiant enregistré", pending: "Vérification en cours", missing: "Manquant", mentioned: "Mentionnée sur ces pages", notMentioned: "Aucun emplacement structuré n'est encore indexé.", incomplete: "Cette notice incomplète est exclue de l'indexation jusqu'à vérification des métadonnées." },
  ko: { back: "참고문헌 데이터베이스", source: "원문 열기", unavailable: "검증된 외부 출처 링크가 아직 없습니다.", bibliography: "서지 정보", status: "출처 링크 상태", verified: "메타데이터 확인됨", registered: "등록된 식별자", pending: "검증 대기 중", missing: "누락", mentioned: "언급된 페이지", notMentioned: "구조화된 사용 위치가 아직 없습니다.", incomplete: "메타데이터가 확인될 때까지 이 불완전한 레코드는 검색 엔진에서 제외됩니다." },
} as const;

function routeLabel(route: string): string {
  if (route === "/") return "Home";
  return route
    .split("/")
    .filter(Boolean)
    .map((part) => part.replace(/[-_]/g, " ").replace(/^./, (letter) => letter.toUpperCase()))
    .join(" · ");
}

function schemaType(reference: Reference): string {
  if (reference.journal && reference.doi) return "ScholarlyArticle";
  switch (reference.type) {
    case "dataset": return "Dataset";
    case "book":
    case "book-chapter": return "Chapter";
    case "patent": return "Patent";
    case "report":
    case "standard":
    case "regulatory": return "Report";
    case "collection": return "Collection";
    case "commentary": return "Article";
    case "internal-analysis": return "CreativeWork";
    default: return "ScholarlyArticle";
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; referenceId: string }>;
}): Promise<Metadata> {
  const { locale, referenceId } = await params;
  const resolved = canonicalReference(referenceId);
  if (!resolved) return { title: "Reference not found – Extinction Field" };
  const { reference, canonicalId } = resolved;
  const complete = Boolean(reference.authors && reference.title && reference.year > 0 && referenceUrl(reference));
  const canonical = `${BASE_URL}/${locale}/references/${canonicalId}`;
  return {
    title: `${reference.title || canonicalId} – Extinction Field`,
    description: bibliography(reference),
    alternates: {
      canonical,
      languages: Object.fromEntries(locales.map((language) => [language, `${BASE_URL}/${language}/references/${canonicalId}`])),
    },
    robots: { index: complete, follow: true },
  };
}

export default async function ReferenceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; referenceId: string }>;
}) {
  const { locale, referenceId } = await params;
  const resolved = canonicalReference(referenceId);
  if (!resolved) notFound();
  if (resolved.isAlias) permanentRedirect(`/${locale}/references/${resolved.canonicalId}`);

  const { reference } = resolved;
  const d = pickCopy(COPY, locale);
  const external = referenceUrl(reference);
  const usages = referenceUsages(reference.id);
  const complete = Boolean(reference.authors && reference.title && reference.year > 0 && external);
  const status = reference.link_status ?? "missing";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType(reference),
    name: reference.title || reference.id,
    author: reference.authors || undefined,
    datePublished: reference.year > 0 ? String(reference.year) : undefined,
    isPartOf: reference.journal ? { "@type": "Periodical", name: reference.journal } : undefined,
    sameAs: external || undefined,
    identifier: external
      ? [reference.doi && `https://doi.org/${reference.doi}`, reference.pmid && `PMID:${reference.pmid}`, reference.pmcid].filter(Boolean)
      : undefined,
    url: `${BASE_URL}/${locale}/references/${reference.id}`,
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Link href={`/${locale}/references`} className="mb-8 inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-accent">
        <ArrowLeft className="size-4" aria-hidden="true" /> {d.back}
      </Link>

      <header className="border-b border-card-border pb-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-card-border bg-card-bg px-2.5 py-1 text-foreground-muted">{reference.type || "reference"}</span>
          <span className="rounded-full border border-card-border bg-card-bg px-2.5 py-1 text-foreground-muted">{d[status]}</span>
        </div>
        <h1 className="text-balance font-serif text-3xl font-bold leading-tight sm:text-4xl">{reference.title || reference.id}</h1>
        <p className="mt-4 text-base leading-relaxed text-foreground-muted">{bibliography(reference)}</p>
        {external ? (
          <a href={external} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
            {d.source} <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        ) : (
          <p className="mt-6 rounded-lg border border-card-border bg-card-bg p-4 text-sm text-foreground-muted">{d.unavailable}</p>
        )}
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-card-border bg-card-bg p-5">
          <h2 className="flex items-center gap-2 font-semibold"><BookOpen className="size-4 text-accent" aria-hidden="true" /> {d.bibliography}</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="text-xs uppercase tracking-wide text-foreground-muted">ID</dt><dd className="mt-1 break-all font-mono text-xs">{reference.id}</dd></div>
            {reference.doi && <div><dt className="text-xs uppercase tracking-wide text-foreground-muted">DOI</dt><dd className="mt-1 break-all font-mono text-xs"><a href={`https://doi.org/${reference.doi}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{reference.doi}</a></dd></div>}
            {reference.pmcid && <div><dt className="text-xs uppercase tracking-wide text-foreground-muted">PMCID</dt><dd className="mt-1 font-mono text-xs"><a href={`https://pmc.ncbi.nlm.nih.gov/articles/${reference.pmcid}/`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{reference.pmcid}</a></dd></div>}
            {reference.pmid && <div><dt className="text-xs uppercase tracking-wide text-foreground-muted">PMID</dt><dd className="mt-1 font-mono text-xs"><a href={`https://pubmed.ncbi.nlm.nih.gov/${reference.pmid}/`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{reference.pmid}</a></dd></div>}
            <div><dt className="text-xs uppercase tracking-wide text-foreground-muted">{d.status}</dt><dd className="mt-1">{d[status]}</dd></div>
          </dl>
          {!complete && <p className="mt-4 border-t border-card-border pt-4 text-xs leading-relaxed text-foreground-muted">{d.incomplete}</p>}
        </section>

        <section className="rounded-xl border border-card-border bg-card-bg p-5">
          <h2 className="flex items-center gap-2 font-semibold"><MapPin className="size-4 text-accent" aria-hidden="true" /> {d.mentioned}</h2>
          {usages.length ? (
            <ul className="mt-4 space-y-2">
              {usages.map((usage) => (
                <li key={usage.path}>
                  <Link href={`/${locale}${usage.path === "/" ? "" : usage.path}`} className="inline-flex items-start gap-2 text-sm text-accent hover:underline">
                    <Link2 className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" /> {routeLabel(usage.path)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p className="mt-4 text-sm text-foreground-muted">{d.notMentioned}</p>}
        </section>
      </div>

    </div>
  );
}
