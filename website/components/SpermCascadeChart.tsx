"use client";

import { useMemo, useState } from "react";
import { computeSpermState } from "@/lib/model/spermCascade";
import { BASELINE_CONC, BASELINE_MOT } from "@/lib/model/config";

const t = {
  en: {
    title: "Sperm biomarker cascade",
    desc: "Four-stage cascade: EMF → ROS → DNA fragmentation (SDF) → motility → concentration. Each stage feeds the next. Drag the slider to see how cumulative EMF exposure degrades sperm quality through the cascade.",
    cumEmf: "Cumulative EMF exposure",
    low: "Low (rural 2000)",
    high: "High (urban 2035)",
    ros: "ROS index",
    sdf: "SDF index",
    motility: "Motility",
    concentration: "Concentration",
    baseline: "Baseline",
    unit: "M/mL",
  },
  fi: {
    title: "Siittiöiden biomarkkerikaskadi",
    desc: "Nelivaiheinen kaskadi: EMF → ROS → DNA-fragmentaatio (SDF) → liikkuvuus → pitoisuus. Jokainen vaihe syöttää seuraavaa. Vedä liukusäädintä nähdäksesi miten kumulatiivinen EMF-altistus heikentää siittiöiden laatua kaskaadin kautta.",
    cumEmf: "Kumulatiivinen EMF-altistus",
    low: "Matala (maaseutu 2000)",
    high: "Korkea (kaupunki 2035)",
    ros: "ROS-indeksi",
    sdf: "SDF-indeksi",
    motility: "Liikkuvuus",
    concentration: "Pitoisuus",
    baseline: "Perustaso",
    unit: "M/mL",
  },
} as const;

interface Props {
  locale: string;
}

export function SpermCascadeChart({ locale }: Props) {
  const d = locale === "fi" ? t.fi : t.en;
  const [cumEmf, setCumEmf] = useState(50);

  const emfInstant = cumEmf / 30;
  const state = useMemo(() => computeSpermState(emfInstant, cumEmf), [emfInstant, cumEmf]);

  const stages = [
    { label: d.ros, value: state.ros, max: 1, color: "#EF4444", format: (v: number) => v.toFixed(3) },
    { label: d.sdf, value: state.sdf, max: 1, color: "#F59E0B", format: (v: number) => v.toFixed(3) },
    { label: d.motility, value: state.motilityIndex, max: BASELINE_MOT, color: "#3B82F6", format: (v: number) => `${(v * 100).toFixed(1)}%`, baseline: BASELINE_MOT },
    { label: d.concentration, value: state.concentration, max: BASELINE_CONC, color: "#22C55E", format: (v: number) => `${v.toFixed(1)} ${d.unit}`, baseline: BASELINE_CONC },
  ];

  return (
    <div className="border border-card-border bg-card-bg rounded-lg p-6">
      <h3 className="text-base font-semibold mb-2">{d.title}</h3>
      <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">{d.desc}</p>

      <div className="mb-6 max-w-md">
        <label className="text-xs text-foreground-muted block mb-1">
          {d.cumEmf}: <span className="font-mono-num font-semibold text-foreground">{cumEmf}</span>
        </label>
        <input
          type="range"
          min={0}
          max={200}
          value={cumEmf}
          onChange={(e) => setCumEmf(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
        <div className="flex justify-between text-[10px] text-foreground-muted">
          <span>{d.low}</span>
          <span>{d.high}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stages.map((s) => {
          const pct = s.max > 0 ? (s.value / s.max) * 100 : 0;
          const basePct = s.baseline ? (s.baseline / s.max) * 100 : null;
          return (
            <div key={s.label} className="text-center">
              <p className="text-xs text-foreground-muted mb-2">{s.label}</p>
              <div className="relative mx-auto w-16 h-24 bg-background-secondary rounded-lg overflow-hidden border border-border">
                <div
                  className="absolute bottom-0 w-full transition-all duration-300 rounded-b-lg"
                  style={{ height: `${Math.min(100, pct)}%`, backgroundColor: s.color, opacity: 0.7 }}
                />
                {basePct !== null && (
                  <div
                    className="absolute w-full border-t-2 border-dashed"
                    style={{ bottom: `${basePct}%`, borderColor: s.color, opacity: 0.4 }}
                  />
                )}
              </div>
              <p className="text-sm font-mono-num font-semibold mt-1">{s.format(s.value)}</p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-[10px] text-foreground-muted justify-center">
        <span>EMF →</span>
        <span className="text-red-500">ROS ↑</span>
        <span>→</span>
        <span className="text-yellow-500">SDF ↑</span>
        <span>→</span>
        <span className="text-blue-500">Motility ↓</span>
        <span>→</span>
        <span className="text-green-500">Concentration ↓</span>
      </div>
    </div>
  );
}
