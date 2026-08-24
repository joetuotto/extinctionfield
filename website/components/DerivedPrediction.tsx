"use client";

interface DerivedPredictionProps {
  locale: string;
  children: React.ReactNode;
}

export function DerivedPrediction({ locale, children }: DerivedPredictionProps) {
  return (
    <div className="border-l-4 border-amber-500/60 rounded-r-lg bg-amber-500/5 p-5 my-6">
      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">
        {locale === "fi" ? "Johdettu ennuste · L*-taso" : "Derived prediction · L* level"}
      </p>
      <p className="text-xs text-foreground-muted/70 italic mb-4">
        {locale === "fi"
          ? "Tämä osio kuvaa BERM-kehyksestä johdettuja ennusteita joita ei ole vielä suoraan testattu. Ne esitetään testattavina hypoteeseina, eivät vahvistettuina löydöksinä."
          : "This section describes predictions derived from the BERM framework that have not yet been directly tested. They are presented as testable hypotheses, not established findings."}
      </p>
      {children}
    </div>
  );
}
