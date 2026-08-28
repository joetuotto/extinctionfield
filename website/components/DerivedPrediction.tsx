"use client";

import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    label: "Derived prediction · L* level",
    disclaimer: "This section describes predictions derived from the BERM framework that have not yet been directly tested. They are presented as testable hypotheses, not established findings.",
  },
  fi: {
    label: "Johdettu ennuste · L*-taso",
    disclaimer: "Tämä osio kuvaa BERM-kehyksestä johdettuja ennusteita joita ei ole vielä suoraan testattu. Ne esitetään testattavina hypoteeseina, eivät vahvistettuina löydöksinä.",
  },
  ja: {
    label: "導出予測 · L*レベル",
    disclaimer: "このセクションでは、BERMフレームワークから導出された、まだ直接テストされていない予測を記述しています。確立された知見ではなく、検証可能な仮説として提示されています。",
  },
  fr: {
    label: "Prédiction dérivée · Niveau L*",
    disclaimer: "Cette section décrit des prédictions dérivées du cadre BERM qui n'ont pas encore été directement testées. Elles sont présentées comme des hypothèses testables, et non comme des résultats établis.",
  },
  ko: {
    label: "파생 예측 · L* 수준",
    disclaimer: "이 섹션에서는 BERM 프레임워크에서 도출되었지만 아직 직접 테스트되지 않은 예측을 설명합니다. 확립된 발견이 아닌 검증 가능한 가설로 제시됩니다.",
  },
};

interface DerivedPredictionProps {
  locale?: string;
  children: React.ReactNode;
  className?: string;
}

export function DerivedPrediction({ locale = "en", children, className }: DerivedPredictionProps) {
  const d = pickCopy(COPY, locale);
  return (
    <div className={`border-l-4 border-amber-500/60 rounded-r-lg bg-amber-500/5 p-5 my-6${className ? ` ${className}` : ""}`}>
      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">
        {d.label}
      </p>
      <p className="text-xs text-foreground-muted/70 italic mb-4">
        {d.disclaimer}
      </p>
      {children}
    </div>
  );
}
