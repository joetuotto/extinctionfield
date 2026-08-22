"use client";

const SCENARIOS = [
  { id: "young_clean", emf: false, aged: false },
  { id: "young_emf", emf: true, aged: false },
  { id: "old_clean", emf: false, aged: true },
  { id: "old_hospital", emf: true, aged: true },
] as const;

const LABELS = {
  en: {
    title: "Blood-Brain Barrier: Aging × EMF Synergy",
    young_clean: "Young, no EMF",
    young_emf: "Young, EMF exposure",
    old_clean: "Elderly, no EMF",
    old_hospital: "Elderly, hospital",
    occludin: "Occludin",
    zo1: "ZO-1",
    claudin: "Claudin",
    protection: "Protection",
    gradient: "Safe → Dangerous",
    note: "Same tight junction proteins degraded by both aging and EMF → synergistic opening",
  },
  fi: {
    title: "Veri-aivoeste: ikääntyminen × EMF -synergia",
    young_clean: "Nuori, ei EMF:ää",
    young_emf: "Nuori, EMF-altistus",
    old_clean: "Vanha, ei EMF:ää",
    old_hospital: "Vanha, sairaala",
    occludin: "Okludiini",
    zo1: "ZO-1",
    claudin: "Klaudiini",
    protection: "Suojaus",
    gradient: "Turvallinen → Vaarallinen",
    note: "Samat tight junction -proteiinit heikkenevät ikääntymisessä JA EMF-altistuksessa → synergistinen avaus",
  },
} as const;

function BarrierBlock({ integrity }: { integrity: number }) {
  const filled = Math.round(integrity * 10);
  const gap = 10 - filled;
  return (
    <div className="flex h-4 w-full rounded overflow-hidden border border-card-border/60">
      {Array.from({ length: filled }).map((_, i) => (
        <div key={`f${i}`} className="flex-1 bg-accent/70" />
      ))}
      {Array.from({ length: gap }).map((_, i) => (
        <div key={`g${i}`} className="flex-1 bg-status-refuted/30" />
      ))}
    </div>
  );
}

function ProteinDot({ level }: { level: number }) {
  const opacity = 0.2 + level * 0.8;
  return (
    <span
      className="inline-block w-2.5 h-2.5 rounded-full bg-accent"
      style={{ opacity }}
    />
  );
}

export function BBBMechanismDiagram({ locale }: { locale: string }) {
  const l = locale === "fi" ? LABELS.fi : LABELS.en;

  const data = [
    { ...SCENARIOS[0], integrity: 1.0, proteins: [1, 1, 1], pct: "~100%" },
    { ...SCENARIOS[1], integrity: 0.72, proteins: [0.7, 0.75, 0.7], pct: "~72%" },
    { ...SCENARIOS[2], integrity: 0.62, proteins: [0.6, 0.65, 0.6], pct: "~62%" },
    { ...SCENARIOS[3], integrity: 0.35, proteins: [0.3, 0.35, 0.3], pct: "~35%" },
  ];

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 max-w-4xl">
      <h3 className="text-sm font-semibold mb-4">{l.title}</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {data.map((d) => (
          <div key={d.id} className="space-y-2">
            <p className="text-xs font-medium text-center">{l[d.id as keyof typeof l]}</p>
            <BarrierBlock integrity={d.integrity} />
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-foreground-muted">
                <ProteinDot level={d.proteins[0]} /> {l.occludin}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-foreground-muted">
                <ProteinDot level={d.proteins[1]} /> {l.zo1}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-foreground-muted">
                <ProteinDot level={d.proteins[2]} /> {l.claudin}
              </div>
            </div>
            <p className="text-center text-xs font-mono-num text-foreground-muted">
              {l.protection}: {d.pct}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1 bg-gradient-to-r from-accent/60 to-status-refuted/60" />
        <span className="text-[10px] text-foreground-muted shrink-0">{l.gradient}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-status-refuted/60 to-status-refuted" />
      </div>

      <p className="text-xs text-foreground-muted italic">{l.note}</p>
    </div>
  );
}
