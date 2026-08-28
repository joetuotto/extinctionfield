import Link from "next/link";
import { citationLabel, indexedReference } from "@/lib/referenceIndex";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: { details: "Source details", verified: "Metadata matched", registered: "Registered identifier", pending: "Verification pending", missing: "No verified source link", untitled: "Incomplete reference" },
  fi: { details: "Lähdetiedot", verified: "Metatiedot varmennettu", registered: "Rekisteröity tunniste", pending: "Varmennus kesken", missing: "Ei varmennettua lähdelinkkiä", untitled: "Puutteellinen lähde" },
  ja: { details: "出典情報", verified: "メタデータ検証済み", registered: "登録済み識別子", pending: "検証中", missing: "検証済みリンクなし", untitled: "不完全な参考文献" },
  fr: { details: "Détails de la source", verified: "Métadonnées vérifiées", registered: "Identifiant enregistré", pending: "Vérification en cours", missing: "Aucun lien vérifié", untitled: "Référence incomplète" },
  ko: { details: "출처 정보", verified: "메타데이터 확인됨", registered: "등록된 식별자", pending: "검증 대기 중", missing: "검증된 링크 없음", untitled: "불완전한 참고문헌" },
} as const;

export function StudyCitation({
  referenceId,
  locale = "en",
  label,
  className,
}: {
  referenceId: string;
  locale?: string;
  label?: string;
  className?: string;
}) {
  const reference = indexedReference(referenceId);
  const d = pickCopy(COPY, locale);

  if (!reference) {
    return (
      <span className={className} data-reference-id={referenceId} data-reference-status="unknown">
        {label ?? referenceId}
      </span>
    );
  }

  const visibleLabel = label ?? citationLabel(reference, locale);
  const statusLabel = d[reference.linkStatus];
  const citationClass = `${className ?? "font-medium text-accent decoration-dotted underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"} min-w-0 break-words`;
  const accessibleDescription = [visibleLabel, reference.title, statusLabel].filter(Boolean).join(". ");
  const tooltipText = [reference.title || d.untitled, reference.journal, reference.year || null, reference.type, statusLabel].filter(Boolean).join(" · ");

  return (
    <span
      className="group/reference relative inline-flex min-w-0 max-w-full items-baseline gap-1"
      data-reference-id={reference.id}
      data-reference-status={reference.linkStatus}
    >
      {reference.externalUrl ? (
        <a
          href={reference.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={citationClass}
          aria-label={accessibleDescription}
          title={tooltipText}
        >
          {visibleLabel}<span aria-hidden="true"> ↗</span>
        </a>
      ) : (
        <span className={`${className ?? "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"} min-w-0 break-words`} tabIndex={0} aria-label={accessibleDescription} title={tooltipText}>{visibleLabel}</span>
      )}
      <Link
        href={`/${locale}/references/${reference.id}`}
        className="inline-flex size-[1.15em] shrink-0 items-center justify-center rounded-full border border-current/35 text-[0.7em] font-semibold leading-none text-foreground-muted no-underline transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        aria-label={`${d.details}: ${reference.title || visibleLabel}`}
        title={d.details}
      >
        i
      </Link>
      <span
        role="tooltip"
        className="pointer-events-none fixed bottom-4 left-1/2 z-50 hidden w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-card-border bg-card-bg/95 p-3 text-left text-xs font-normal leading-relaxed text-foreground shadow-xl backdrop-blur-sm group-hover/reference:block group-focus-within/reference:block"
      >
        <span className="block font-semibold text-foreground">{reference.title || d.untitled}</span>
        <span className="mt-1 block text-foreground-muted">
          {[reference.journal, reference.year || null, reference.type].filter(Boolean).join(" · ")}
        </span>
        <span className="mt-2 block text-[0.68rem] font-semibold uppercase tracking-wide text-foreground-muted">{statusLabel}</span>
      </span>
    </span>
  );
}
