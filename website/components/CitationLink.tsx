import { citationHref } from "@/lib/citationLinks";

/**
 * Renders an inline study citation as a link to its source when one is known.
 *
 * Sources are resolved from the reference registries via `lib/citationLinks`.
 * Citations with no known source render as plain text — the site never emits a
 * link it cannot resolve.
 */
export function CitationLink({
  citation,
  year,
  className,
}: {
  citation: string;
  year?: number | string;
  className?: string;
}) {
  const href = citationHref(citation, year);

  if (!href) return <>{citation}</>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "hover:underline decoration-dotted underline-offset-2"}
    >
      {citation}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}
