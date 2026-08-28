import { Fragment } from "react";
import { StudyCitation } from "@/components/StudyCitation";
import { referenceIdForExternalIdentifier } from "@/lib/referenceIndex";

const INLINE_REFERENCE_PATTERN = /\[\[ref:([a-z0-9][a-z0-9._-]*)\|([^\]]+)\]\]|\b(?:PMC\d{5,9}|(?:PMID|PubMed)\s*:?\s*\d{6,9})\b/gi;

export function InlineReferenceText({
  text,
  locale,
}: {
  text: string;
  locale: string;
}) {
  const matches = Array.from(text.matchAll(INLINE_REFERENCE_PATTERN));

  if (matches.length === 0) {
    return text;
  }

  const parts = [];
  let cursor = 0;

  matches.forEach((match, index) => {
    const start = match.index;
    const [token, explicitReferenceId, explicitLabel] = match;
    const referenceId = explicitReferenceId ?? referenceIdForExternalIdentifier(token);
    const label = explicitLabel ?? token;

    if (start > cursor) {
      parts.push(
        <Fragment key={`text-${index}`}>{text.slice(cursor, start)}</Fragment>,
      );
    }

    parts.push(referenceId ? (
      <StudyCitation
        key={`${referenceId}-${index}`}
        referenceId={referenceId}
        locale={locale}
        label={label}
      />
    ) : (
      <Fragment key={`unresolved-${index}`}>{token}</Fragment>
    ));
    cursor = start + token.length;
  });

  if (cursor < text.length) {
    parts.push(<Fragment key="text-end">{text.slice(cursor)}</Fragment>);
  }

  return parts;
}
