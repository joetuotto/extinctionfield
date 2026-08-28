"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { ModulomeLayer } from "@/lib/modulome/layers";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: { new: "NEW", chiModulator: "Chi-modulator", keyComponents: "Key components", integration: "Integration" },
  fi: { new: "UUSI", chiModulator: "Chi-modulaattori", keyComponents: "Avainkomponentit", integration: "Integraatio" },
  ja: { new: "NEW", chiModulator: "Chiモジュレーター", keyComponents: "主要コンポーネント", integration: "統合" },
  fr: { new: "NOUVEAU", chiModulator: "Chi-modulateur", keyComponents: "Composants clés", integration: "Intégration" },
  ko: { new: "NEW", chiModulator: "Chi 조절인자", keyComponents: "주요 구성요소", integration: "통합" },
} as const;

export function LayerStack({
  layers,
  locale,
}: {
  layers: ModulomeLayer[];
  locale: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const c = pickCopy(COPY, locale);

  return (
    <div className="space-y-2">
      {layers.map((layer) => {
        const isOpen = expanded === layer.id;
        const name = locale === "fi" ? layer.nameFi : layer.nameEn;
        const chi =
          locale === "fi" ? layer.chiModulatorFi : layer.chiModulatorEn;
        const integration =
          locale === "fi" ? layer.integrationFi : layer.integrationEn;
        const components =
          locale === "fi" ? layer.keyComponentsFi : layer.keyComponentsEn;

        return (
          <div
            key={layer.id}
            className={`rounded-lg bg-card border transition-colors ${
              layer.newInSession
                ? "border-l-4 border-l-accent border-t-card-border border-r-card-border border-b-card-border"
                : "border-card-border"
            }`}
          >
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : layer.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left group"
            >
              <ChevronRight
                size={16}
                className={`shrink-0 text-foreground-muted transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
              <span className="font-mono-num text-xs text-accent w-6 shrink-0 text-right">
                {String(layer.number).padStart(2, "0")}
              </span>
              <span className="font-semibold text-sm text-foreground flex-1 min-w-0 truncate">
                {name}
              </span>
              <span className="hidden sm:block text-xs text-foreground-muted truncate max-w-[40%]">
                {chi}
              </span>
              {layer.newInSession && (
                <span className="shrink-0 text-[0.6rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                  {c.new}
                </span>
              )}
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pl-[3.25rem] space-y-3">
                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {c.chiModulator}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {chi}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {c.keyComponents}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed font-mono">
                    {components}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {c.integration}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {integration}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
