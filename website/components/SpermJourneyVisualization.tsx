"use client";

import { useState } from "react";

interface Step {
  id: string;
  label: string;
  location: string;
  channel: string;
  severity: "high" | "critical" | "extreme";
}

const STEPS: Step[] = [
  { id: "spermatogenesis", label: "Spermatogenesis", location: "Testes", channel: "VGCC", severity: "high" },
  { id: "epididymal", label: "Epididymal maturation", location: "Epididymis", channel: "CatSper", severity: "critical" },
  { id: "dna-integrity", label: "DNA integrity", location: "Lifecycle", channel: "VGCC→ROS", severity: "critical" },
  { id: "btb", label: "BTB integrity", location: "Testes", channel: "VGCC→TJ", severity: "high" },
  { id: "capacitation", label: "Capacitation", location: "Oviduct", channel: "CatSper", severity: "extreme" },
  { id: "rheotaxis", label: "Rheotaxis", location: "Oviduct", channel: "CatSper", severity: "extreme" },
  { id: "chemotaxis", label: "Chemotaxis", location: "Near egg", channel: "CatSper", severity: "extreme" },
  { id: "acrosome", label: "Acrosome reaction", location: "Zona pellucida", channel: "CatSper+VOC", severity: "extreme" },
  { id: "oocyte-activation", label: "Oocyte activation", location: "Fertilization", channel: "PLCζ→Ca²⁺", severity: "critical" },
];

const SEV_COLOR = {
  high: { bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.5)", text: "#b45309", dot: "#f59e0b" },
  critical: { bg: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.45)", text: "#b91c1c", dot: "#ef4444" },
  extreme: { bg: "rgba(168,34,52,0.12)", border: "rgba(168,34,52,0.55)", text: "#881337", dot: "#be123c" },
};

export function SpermJourneyVisualization({ onStepClick }: { onStepClick?: (id: string) => void }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="my-8">
      <div className="flex items-center gap-4 mb-4 text-xs text-foreground-muted flex-wrap">
        <span className="font-semibold uppercase tracking-wider">Vulnerability</span>
        {(["high", "critical", "extreme"] as const).map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: SEV_COLOR[s].dot }} />
            {s}
          </span>
        ))}
      </div>

      <div className="relative">
        {/* Desktop: horizontal flow */}
        <div className="hidden lg:block overflow-x-auto pb-2">
          <div className="flex items-start gap-0 min-w-[900px]">
            {STEPS.map((step, i) => {
              const c = SEV_COLOR[step.severity];
              const isActive = active === step.id;
              return (
                <div key={step.id} className="flex items-start">
                  <button
                    type="button"
                    className="flex flex-col items-center text-center transition-transform duration-150 group"
                    style={{ width: 100, transform: isActive ? "scale(1.08)" : undefined }}
                    onMouseEnter={() => setActive(step.id)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => {
                      const el = document.getElementById(`vuln-${step.id}`);
                      if (el) {
                        el.open = true;
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                      onStepClick?.(step.id);
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-shadow"
                      style={{
                        background: c.bg,
                        borderColor: c.border,
                        color: c.text,
                        boxShadow: isActive ? `0 0 12px ${c.dot}40` : undefined,
                      }}
                    >
                      {i + 1}
                    </div>
                    <p className="mt-1.5 text-[11px] font-medium leading-tight" style={{ color: isActive ? c.text : undefined }}>
                      {step.label}
                    </p>
                    <p className="text-[9px] text-foreground-muted/60 mt-0.5">{step.location}</p>
                    <p className="text-[9px] font-mono mt-0.5" style={{ color: c.dot }}>{step.channel}</p>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="flex items-center self-center mt-1" style={{ width: 12 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" className="text-foreground-muted/30">
                        <path d="M1 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical flow */}
        <div className="lg:hidden space-y-1">
          {STEPS.map((step, i) => {
            const c = SEV_COLOR[step.severity];
            const isActive = active === step.id;
            return (
              <div key={step.id}>
                <button
                  type="button"
                  className="flex items-center gap-3 w-full text-left py-1.5 rounded-lg transition-colors px-2"
                  style={{ background: isActive ? c.bg : undefined }}
                  onMouseEnter={() => setActive(step.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => {
                    const el = document.getElementById(`vuln-${step.id}`);
                    if (el) {
                      el.open = true;
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                    onStepClick?.(step.id);
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0"
                    style={{ background: c.bg, borderColor: c.border, color: c.text }}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight">{step.label}</p>
                    <p className="text-[10px] text-foreground-muted/60">{step.location} · <span className="font-mono" style={{ color: c.dot }}>{step.channel}</span></p>
                  </div>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="ml-[18px] h-3 border-l-2 border-foreground-muted/15" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-foreground-muted/60 mt-3 text-center">
        Click any step to jump to its evidence card below. Steps 5–8 depend exclusively on CatSper — no backup channel exists.
      </p>
    </div>
  );
}
