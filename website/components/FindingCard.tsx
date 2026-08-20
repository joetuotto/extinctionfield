import {
  affectsLabel,
  classificationLabel,
  groupOf,
  GROUP_LABELS,
  GROUP_STYLES,
  type Finding,
} from "@/lib/findingsClassification";

/**
 * One negative finding, showing what it was called, what the review calls it,
 * and — the point of the exercise — what it actually bears on.
 */
export function FindingCard({ finding, locale }: { finding: Finding; locale: string }) {
  const fi = locale === "fi";
  const group = groupOf(finding);
  const style = GROUP_STYLES[group];
  const changed = finding.original_classification !== finding.revised_classification;

  return (
    <article className={`rounded-xl border ${style.border} ${style.bg} p-4 sm:p-5`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-sm font-semibold">
          <span className="font-mono-num text-accent">{finding.id}</span>{" "}
          <span className="text-foreground">{finding.name}</span>
        </h3>
        <span className={`text-xs font-medium ${style.text}`}>
          {changed
            ? `↻ ${GROUP_LABELS[group][fi ? "fi" : "en"]}`
            : `= ${GROUP_LABELS[group][fi ? "fi" : "en"]}`}
        </span>
      </div>

      <dl className="mt-3 grid grid-cols-1 gap-1 text-xs sm:grid-cols-[10rem_1fr]">
        <dt className="text-foreground-muted">{fi ? "Alkuperäinen" : "Original"}</dt>
        <dd className={changed ? "text-foreground-muted line-through" : "text-foreground"}>
          {classificationLabel(finding.original_classification, locale)}
        </dd>
        <dt className="text-foreground-muted">{fi ? "Uudelleenarviointi" : "Review"}</dt>
        <dd className={`font-medium ${style.text}`}>
          {classificationLabel(finding.revised_classification, locale)}
        </dd>
      </dl>

      <p className="mt-3 text-xs leading-relaxed text-foreground-muted">{finding.reason}</p>

      {finding.discriminating_test && (
        <p className="mt-3 text-xs leading-relaxed">
          <span className="text-foreground-muted">
            {fi ? "Erotteleva testi: " : "Discriminating test: "}
          </span>
          <span className="text-foreground">{finding.discriminating_test}</span>
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-card-border/60 pt-2 text-xs text-foreground-muted">
        <span>
          {fi ? "Koskee: " : "Affects: "}
          <span className="text-foreground">{affectsLabel(finding.affects, locale)}</span>
        </span>
        <span>
          L-BERM:{" "}
          <span className={finding.affects_l_berm ? "text-status-refuted" : "text-foreground"}>
            {finding.affects_l_berm ? (fi ? "kyllä" : "yes") : fi ? "ei" : "no"}
          </span>
        </span>
        <span>
          {fi ? "Empiirinen BERM: " : "Empirical BERM: "}
          <span
            className={finding.affects_empirical_berm ? "text-status-refuted" : "text-foreground"}
          >
            {finding.affects_empirical_berm ? (fi ? "kyllä" : "yes") : fi ? "ei" : "no"}
          </span>
        </span>
      </div>
    </article>
  );
}
