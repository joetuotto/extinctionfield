"use client";

import { useEffect, useState } from "react";

type LocaleText = string | Record<string, unknown>;

interface ReadinessTest {
  id: string;
  status: string;
  title?: LocaleText;
  reason?: LocaleText;
  requirements?: LocaleText | LocaleText[];
  blocker_codes?: string[];
}

interface SentinelReadinessData {
  schema_version?: string;
  generated_at?: string;
  status?: string;
  tests: ReadinessTest[];
  no_imputation?: boolean;
  canonical_artifact?: {
    path?: string;
    sha256?: string;
    row_count?: number;
  };
}

const COPY = {
  en: {
    title: "CSLI readiness",
    lead:
      "The public CSLI record tracks the data required for a registered cross-species test. Its six preregistered requirements are currently awaiting matched place–time field and endpoint data.",
    status: "Data readiness",
    blocked: "Awaiting matched data",
    tests: "Prerequisite tests",
    requirements: "Required before testing",
    blockers: "Blockers",
    noImputation: "No missing values are imputed for this readiness assessment.",
    source: "Readiness manifest",
    loading: "Loading sentinel readiness…",
    error: "The readiness manifest could not be loaded. Please try again shortly.",
    unavailable: "Unavailable",
  },
  fi: {
    title: "CSLI-aineiston valmiustila",
    lead:
      "Julkinen CSLI-tietue seuraa rekisteröityyn lajienväliseen testiin tarvittavaa dataa. Sen kuusi esirekisteröityä vaatimusta odottaa tällä hetkellä kohdistettua paikka–aika-kenttä- ja päätepistedataa.",
    status: "Datavalmius",
    blocked: "Odottaa kohdistettua aineistoa",
    tests: "Edellytystestit",
    requirements: "Vaaditaan ennen testiä",
    blockers: "Esteet",
    noImputation: "Tässä valmiusarviossa puuttuvia arvoja ei imputoida.",
    source: "Valmiusmanifesti",
    loading: "Ladataan sentinelliaineiston valmiustilaa…",
    error: "Valmiusmanifestia ei voitu ladata. Yritä hetken kuluttua uudelleen.",
    unavailable: "Ei saatavilla",
  },
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function textForLocale(value: LocaleText | undefined, locale: string, fallback: string): string {
  if (typeof value === "string") return value;
  if (!isRecord(value)) return fallback;

  const localized = value[locale] ?? value.en ?? value.fi;
  return typeof localized === "string" ? localized : fallback;
}

function stringList(value: LocaleText | LocaleText[] | undefined, locale: string): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => textForLocale(item, locale, ""))
      .filter(Boolean);
  }

  const text = textForLocale(value, locale, "");
  return text ? [text] : [];
}

function parseReadiness(value: unknown): SentinelReadinessData | null {
  if (!isRecord(value) || !Array.isArray(value.tests)) return null;

  const tests = value.tests.flatMap((item): ReadinessTest[] => {
    if (!isRecord(item) || typeof item.id !== "string") return [];

    const blockerCodes = Array.isArray(item.blocker_codes)
      ? item.blocker_codes.filter((code): code is string => typeof code === "string")
      : undefined;

    return [{
      id: item.id,
      status: typeof item.status === "string" ? item.status : "BLOCKED",
      title: typeof item.title === "string" || isRecord(item.title) ? item.title : undefined,
      reason: typeof item.reason === "string" || isRecord(item.reason) ? item.reason : undefined,
      requirements: typeof item.requirements === "string" || isRecord(item.requirements)
        || Array.isArray(item.requirements)
        ? item.requirements as LocaleText | LocaleText[]
        : undefined,
      blocker_codes: blockerCodes,
    }];
  });

  const requiredTests = ["F1", "F2", "F3", "F4", "F5", "F6"];
  if (!requiredTests.every((id) => tests.some(
    (test) => test.id === id && test.status.toUpperCase() === "BLOCKED",
  ))) {
    return null;
  }

  return {
    schema_version: typeof value.schema_version === "string" ? value.schema_version : undefined,
    generated_at: typeof value.generated_at === "string" ? value.generated_at : undefined,
    status: typeof value.status === "string" ? value.status : "BLOCKED",
    tests,
    no_imputation: value.no_imputation === true,
    canonical_artifact: isRecord(value.canonical_artifact)
      ? {
          path: typeof value.canonical_artifact.path === "string" ? value.canonical_artifact.path : undefined,
          sha256: typeof value.canonical_artifact.sha256 === "string" ? value.canonical_artifact.sha256 : undefined,
          row_count: typeof value.canonical_artifact.row_count === "number" ? value.canonical_artifact.row_count : undefined,
        }
      : undefined,
  };
}

function blockedLabel(status: string, locale: string) {
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return status.toUpperCase() === "BLOCKED" ? d.blocked : status;
}

export function SentinelReadiness({ locale }: { locale: string }) {
  const [data, setData] = useState<SentinelReadinessData | null>(null);
  const [failed, setFailed] = useState(false);
  const d = locale === "fi" ? COPY.fi : COPY.en;

  useEffect(() => {
    let cancelled = false;

    fetch("/data/sentinel_readiness.json")
      .then((response) => {
        if (!response.ok) throw new Error(`Readiness manifest: ${response.status}`);
        return response.json();
      })
      .then((payload: unknown) => {
        const parsed = parseReadiness(payload);
        if (!parsed) throw new Error("Invalid sentinel readiness schema");
        if (!cancelled) setData(parsed);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return <p className="text-sm text-status-partial">{d.error}</p>;
  }

  if (!data) {
    return <p className="text-sm text-foreground-muted">{d.loading}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
        <p className="text-sm leading-relaxed text-foreground-muted max-w-3xl">{d.lead}</p>
      </div>

      <div className="border border-status-partial/35 bg-status-partial/5 rounded-lg p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-status-partial mb-1">
          {d.status}
        </p>
        <p className="text-base font-medium text-foreground">
          {blockedLabel(data.status ?? "BLOCKED", locale)}
        </p>
        {data.no_imputation && (
          <p className="mt-2 text-xs text-foreground-muted">{d.noImputation}</p>
        )}
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">{d.tests}</h4>
        <div className="space-y-3">
          {data.tests.map((test) => {
            const requirements = stringList(test.requirements, locale);
            const reason = textForLocale(test.reason, locale, d.unavailable);
            const title = textForLocale(test.title, locale, test.id);

            return (
              <article key={test.id} className="border border-card-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="font-mono-num text-foreground-muted shrink-0">{test.id}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h5 className="text-sm font-medium">{title}</h5>
                      <span className="text-xs font-medium text-status-partial">
                        {blockedLabel(test.status, locale)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{reason}</p>
                    {requirements.length > 0 && (
                      <div className="mt-3 text-xs text-foreground-muted">
                        <p className="font-medium text-foreground-muted">{d.requirements}</p>
                        <ul className="mt-1 space-y-1">
                          {requirements.map((requirement, index) => (
                            <li key={`${test.id}-${index}`}>— {requirement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {test.blocker_codes && test.blocker_codes.length > 0 && (
                      <p className="mt-3 text-[11px] text-foreground-muted/70 font-mono-num">
                        {d.blockers}: {test.blocker_codes.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <a
        href="/data/sentinel_readiness.json"
        className="inline-block text-xs text-accent hover:underline"
      >
        {d.source} (JSON) &rarr;
      </a>
    </div>
  );
}
