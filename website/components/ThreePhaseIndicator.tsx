"use client";

import { THRESHOLD_COUNTRIES, PHASE_LABELS } from "@/lib/thresholdModel";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: { section: "THREE-PHASE MODEL" },
  fi: { section: "KOLMIVAIHEINEN MALLI" },
  ja: { section: "三相モデル" },
  fr: { section: "MODÈLE EN TROIS PHASES" },
  ko: { section: "3단계 모델" },
};

const PHASE_COLORS = {
  1: { bg: "bg-green-500", border: "border-green-500", text: "text-green-700", bgLight: "bg-green-50" },
  2: { bg: "bg-amber-500", border: "border-amber-500", text: "text-amber-700", bgLight: "bg-amber-50" },
  3: { bg: "bg-red-500", border: "border-red-500", text: "text-red-700", bgLight: "bg-red-50" },
} as const;

export function ThreePhaseIndicator({ locale }: { locale: string }) {
  const labels = PHASE_LABELS[locale] ?? PHASE_LABELS["en"];
  const copy = pickCopy(COPY, locale);

  const phases = ([1, 2, 3] as const).map((phase) => ({
    phase,
    label: labels[phase],
    colors: PHASE_COLORS[phase],
    countries: THRESHOLD_COUNTRIES.filter((c) => c.phase === phase),
  }));

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase mb-6 text-center">
        {copy.section}
      </p>

      <div className="flex flex-col sm:flex-row gap-0 sm:gap-0 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
        {phases.map(({ phase, label, colors, countries }) => (
          <div
            key={phase}
            className={`flex-1 flex flex-col ${colors.bgLight} dark:bg-neutral-800/60 border-b sm:border-b-0 sm:border-r last:border-r-0 last:border-b-0 border-neutral-200 dark:border-neutral-700`}
          >
            <div className={`h-2 ${colors.bg}`} />

            <div className="p-4 flex flex-col gap-3 flex-1">
              <div>
                <p className={`text-sm font-bold ${colors.text} dark:text-neutral-200`}>
                  {label.title}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                  {label.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {countries.map((country) => (
                  <span
                    key={country.id}
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-white/80 dark:bg-neutral-700/80 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: country.color }}
                    />
                    {country.names[locale] ?? country.names.en}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
