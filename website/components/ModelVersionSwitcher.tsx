"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  activeModelVersion,
  modelVersionHref,
  type ModelVersionId,
} from "@/lib/modelVersions";

type VersionSwitcherVariant = "compact" | "expanded";

const copy = {
  en: {
    label: "BERM model version",
    fieldState: "FieldState–ASFR v2",
    legacy: "BERM v18.0",
    fieldStateShort: "v2",
    legacyShort: "v18",
  },
  fi: {
    label: "BERM-malliversio",
    fieldState: "FieldState–ASFR v2",
    legacy: "BERM v18.0",
    fieldStateShort: "v2",
    legacyShort: "v18",
  },
} as const;

/**
 * A route-preserving switch between the active FieldState presentation and
 * the separately maintained BERM v18 presentation. It is deliberately a
 * group of ordinary links rather than a client-side state toggle: each choice
 * has a stable URL, works without JavaScript navigation state, and is visible
 * to assistive technology.
 */
export function ModelVersionSwitcher({
  locale,
  variant = "compact",
  className = "",
}: {
  locale: string;
  variant?: VersionSwitcherVariant;
  className?: string;
}) {
  const pathname = usePathname();
  const text = locale === "fi" ? copy.fi : copy.en;
  const activeVersion = activeModelVersion(locale, pathname);
  const isExpanded = variant === "expanded";
  const versions: Array<{ id: ModelVersionId; label: string; shortLabel: string }> = [
    {
      id: "fieldstate-v2",
      label: text.fieldState,
      shortLabel: text.fieldStateShort,
    },
    { id: "berm-v18", label: text.legacy, shortLabel: text.legacyShort },
  ];

  return (
    <div role="group" aria-label={text.label} className={className}>
      <div
        className={`inline-flex items-center rounded-md border border-border bg-background-secondary p-0.5 ${
          isExpanded ? "gap-1" : "gap-0.5"
        }`}
      >
        {isExpanded && (
          <span className="px-2 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            {text.label}
          </span>
        )}
        {versions.map((version) => {
          const isActive = version.id === activeVersion;
          return (
            <Link
              key={version.id}
              href={modelVersionHref(locale, pathname, version.id)}
              aria-current={isActive ? "page" : undefined}
              aria-label={version.label}
              className={`rounded px-2 py-1 text-[0.7rem] font-semibold leading-none transition-colors focus-visible:outline-offset-2 ${
                isActive
                  ? "bg-accent text-white shadow-sm"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {isExpanded ? version.label : version.shortLabel}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
