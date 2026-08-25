"use client";

import { BermIcon } from "@/components/BermIcon";
import type { BermIconName } from "@/components/BermIcon";

const TOP_SPECIES: { icon: BermIconName; nameEn: string; nameFi: string; lag: number; stat: string; r: number }[] = [
  { icon: "honeybee", nameEn: "Honeybee", nameFi: "Mehiläinen", lag: 2, stat: "20/23", r: 0.27 },
  { icon: "bird", nameEn: "Bird", nameFi: "Lintu", lag: 2.5, stat: "21/27", r: 0.18 },
  { icon: "toad", nameEn: "Toad", nameFi: "Rupikonna", lag: 6, stat: "UK", r: 0.36 },
];

export function SentinelCascadeCompact({ locale = "en" }: { locale?: "fi" | "en" }) {
  const fi = locale === "fi";
  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5">
      <p className="text-sm font-semibold mb-3">
        {fi
          ? "Sentinellikaskadi: lajien laskut edeltävät ihmistä"
          : "Sentinel cascade: species declines precede humans"}
      </p>

      <div className="space-y-2">
        {TOP_SPECIES.map((sp) => (
          <div key={sp.nameEn} className="flex items-center gap-3">
            <BermIcon name={sp.icon} size={16} className="text-accent/60 shrink-0" />
            <span className="text-sm text-foreground-muted w-24 shrink-0">
              {fi ? sp.nameFi : sp.nameEn}
            </span>
            <div className="flex-1 h-2 bg-background-secondary rounded-full relative">
              <div
                className="h-2 bg-accent/50 rounded-full"
                style={{ width: `${(sp.lag / 7) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono-num text-foreground-muted w-10 text-right shrink-0">
              +{sp.lag}{fi ? "v" : "y"}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-3 pt-2 border-t border-card-border">
          <BermIcon name="human" size={16} className="text-status-confirmed shrink-0" />
          <span className="text-sm text-status-confirmed font-medium w-24 shrink-0">
            {fi ? "Ihminen" : "Human"}
          </span>
          <div className="flex-1 h-2 bg-background-secondary rounded-full relative">
            <div className="h-2 bg-status-confirmed/50 rounded-full w-full" />
          </div>
          <span className="text-xs font-mono-num text-status-confirmed w-10 text-right shrink-0">
            TFR↓
          </span>
        </div>
      </div>

      <p className="text-xs text-foreground-muted mt-3">
        {fi
          ? "23 maata: mehiläiskuolleisuus ennustaa TFR-laskua 2v viiveellä (p = 0,006)"
          : "23 countries: bee mortality predicts TFR decline with 2yr lag (p = 0.006)"}
      </p>
    </div>
  );
}
