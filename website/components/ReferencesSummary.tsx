"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ReferenceData } from "@/lib/references";
import { categoryName, loadReferences } from "@/lib/references";

const COPY = {
  en: {
    title: "Reference database",
    subtitle: "452 references across 8 thematic categories",
    verified: "verified",
    browse: "Browse all references",
  },
  fi: {
    title: "Lähdetietokanta",
    subtitle: "452 viitettä 8 temaattisessa kategoriassa",
    verified: "varmennettu",
    browse: "Selaa kaikkia viitteitä",
  },
} as const;

export function ReferencesSummary({ locale }: { locale: "en" | "fi" }) {
  const d = COPY[locale];
  const [data, setData] = useState<ReferenceData | null>(null);

  useEffect(() => {
    loadReferences().then(setData).catch(() => {});
  }, []);

  if (!data) return null;

  const counts: Record<string, number> = {};
  const verifiedCounts: Record<string, number> = {};
  for (const r of data.references) {
    counts[r.category] = (counts[r.category] ?? 0) + 1;
    if (r.verified) verifiedCounts[r.category] = (verifiedCounts[r.category] ?? 0) + 1;
  }

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-6">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold">{d.title}</h3>
          <p className="text-xs text-foreground-muted mt-0.5">{d.subtitle}</p>
        </div>
        <span className="text-xs font-mono-num text-accent">
          {data.metadata.verified_count} {d.verified}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {data.categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${locale}/references`}
            className="flex items-start gap-2 rounded-lg border border-card-border p-2.5 hover:border-foreground-muted transition-colors"
          >
            <span className="text-base leading-none mt-0.5">{cat.icon}</span>
            <div className="min-w-0">
              <p className="text-xs font-medium leading-tight truncate">
                {categoryName(cat, locale)}
              </p>
              <p className="text-[10px] font-mono-num text-foreground-muted mt-0.5">
                {counts[cat.id] ?? 0}
                {verifiedCounts[cat.id] ? (
                  <span className="text-status-confirmed ml-1">
                    ({verifiedCounts[cat.id]} ✓)
                  </span>
                ) : null}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href={`/${locale}/references`}
        className="text-xs text-accent hover:underline"
      >
        {d.browse} →
      </Link>
    </div>
  );
}
