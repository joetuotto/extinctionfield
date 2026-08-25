"use client";

import { useState } from "react";

interface TreatmentNode {
  id: string;
  name: string;
  nameFi: string;
  level: number;
  levelLabel: string;
  levelLabelFi: string;
  mechanism: string;
  mechanismFi: string;
  ionTarget: string;
  onset: string;
  onsetFi: string;
  color: string;
}

const TREATMENTS: TreatmentNode[] = [
  {
    id: "ssri",
    name: "SSRI",
    nameFi: "SSRI",
    level: 1,
    levelLabel: "Chemical",
    levelLabelFi: "Kemiallinen",
    mechanism: "5-HT reuptake → indirect ion modulation",
    mechanismFi: "5-HT-takaisinotto → epäsuora ionisäätely",
    ionTarget: "Na⁺/Ca²⁺ (indirect)",
    onset: "2–4 weeks",
    onsetFi: "2–4 viikkoa",
    color: "#78909C",
  },
  {
    id: "tms",
    name: "TMS / tDCS",
    nameFi: "TMS / tDCS",
    level: 2,
    levelLabel: "Electromagnetic",
    levelLabelFi: "Sähkömagneettinen",
    mechanism: "Pulsed EM → induced current → ion channel activation",
    mechanismFi: "Pulssi-EM → indusoitu virta → ionikanava-aktivaatio",
    ionTarget: "Na⁺/Ca²⁺ (direct)",
    onset: "2–4 weeks (cumulative)",
    onsetFi: "2–4 viikkoa (kumulatiivinen)",
    color: "#7E57C2",
  },
  {
    id: "lithium",
    name: "Lithium (Li⁺)",
    nameFi: "Litium (Li⁺)",
    level: 3,
    levelLabel: "Ionic (chronic)",
    levelLabelFi: "Ioninen (krooninen)",
    mechanism: "Li⁺ permeates VGSC → replaces Na⁺ → Ca²⁺ normalization",
    mechanismFi: "Li⁺ läpäisee VGSC:n → korvaa Na⁺:n → Ca²⁺-normalisointi",
    ionTarget: "Na⁺ (direct replacement)",
    onset: "1–2 weeks",
    onsetFi: "1–2 viikkoa",
    color: "#26A69A",
  },
  {
    id: "psilocybin",
    name: "Psilocybin / Ketamine",
    nameFi: "Psilosybiini / Ketamiini",
    level: 4,
    levelLabel: "Ionic reset",
    levelLabelFi: "Ioninen reset",
    mechanism: "5-HT2A → Gq → IP3 → Ca²⁺ surge → Cav1.2 (CACNA1C)",
    mechanismFi: "5-HT2A → Gq → IP3 → Ca²⁺-aalto → Cav1.2 (CACNA1C)",
    ionTarget: "Ca²⁺ (massive, acute)",
    onset: "Hours (single dose)",
    onsetFi: "Tunteja (yksi annos)",
    color: "#EF5350",
  },
  {
    id: "ect",
    name: "ECT",
    nameFi: "ECT (sähkösokkihoito)",
    level: 5,
    levelLabel: "Total ionic reset",
    levelLabelFi: "Totaalinen ioninen nollaus",
    mechanism: "Forced seizure → cortical spreading depolarization (CSD) → complete ionic gradient reset",
    mechanismFi: "Pakotettu kohtaus → leviävä depolarisaatioaalto (CSD) → täydellinen ionigradienttien nollaus",
    ionTarget: "ALL (Na⁺, K⁺, Ca²⁺, Cl⁻)",
    onset: "Hours (first session)",
    onsetFi: "Tunteja (ensimmäinen sessio)",
    color: "#D32F2F",
  },
];

const COPY = {
  en: {
    title: "Ionic Treatment Hierarchy",
    subtitle: "All mood treatments converge on Ca²⁺ homeostasis — their efficacy tracks with ionic directness",
    levelLabel: "Ionic directness",
    mechanism: "Mechanism",
    target: "Ion target",
    onset: "Onset",
    convergence: "Ca²⁺ convergence",
    convergenceNote: "Every treatment ultimately modulates calcium signaling. The more directly it targets ion channels, the faster and more effective it tends to be.",
    convergenceNoteFi: "Jokainen hoito moduloi lopulta kalsiumsignalointia. Mitä suoremmin se kohdistuu ionikanaviin, sitä nopeampi ja tehokkaampi se yleensä on.",
  },
  fi: {
    title: "Ioninen hoitohierarkia",
    subtitle: "Kaikki mielialahoitot konvergoivat Ca²⁺-homeostaasiin — tehokkuus seuraa ionista kohdistusta",
    levelLabel: "Ioninen kohdistus",
    mechanism: "Mekanismi",
    target: "Ionikohde",
    onset: "Vaikutus alkaa",
    convergence: "Ca²⁺-konvergenssi",
    convergenceNote: "Jokainen hoito moduloi lopulta kalsiumsignalointia. Mitä suoremmin se kohdistuu ionikanaviin, sitä nopeampi ja tehokkaampi se yleensä on.",
    convergenceNoteFi: "Jokainen hoito moduloi lopulta kalsiumsignalointia. Mitä suoremmin se kohdistuu ionikanaviin, sitä nopeampi ja tehokkaampi se yleensä on.",
  },
} as const;

export function IonicHierarchyDiagram({ locale }: { locale: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const isFi = locale === "fi";
  const d = isFi ? COPY.fi : COPY.en;

  const svgW = 860;
  const svgH = 400;
  const barX = 120;
  const barW = 480;
  const rowH = 56;
  const startY = 50;
  const totalLevels = TREATMENTS.length;

  return (
    <div className="my-8">
      <h4 className="text-sm font-semibold mb-1">{d.title}</h4>
      <p className="text-xs text-foreground-muted mb-4">{d.subtitle}</p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", minWidth: 500 }}
          role="img"
          aria-label={d.title}
        >
          {/* Arrow indicating increasing directness */}
          <defs>
            <marker id="ionic-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="var(--foreground-muted, #999)" />
            </marker>
            <linearGradient id="ionic-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF5350" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#78909C" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Background gradient */}
          <rect x={barX} y={startY - 10} width={barW} height={rowH * totalLevels + 20} rx="8" fill="url(#ionic-grad)" />

          {/* Directness arrow on left */}
          <line
            x1="30" y1={startY + rowH * totalLevels - 10}
            x2="30" y2={startY}
            stroke="var(--foreground-muted, #999)"
            strokeWidth="1.5"
            markerEnd="url(#ionic-arrow)"
          />
          <text x="30" y={startY + rowH * totalLevels / 2 + 5} textAnchor="middle" fontSize="9" fill="var(--foreground-muted, #999)" transform={`rotate(-90, 30, ${startY + rowH * totalLevels / 2 + 5})`}>
            {d.levelLabel}
          </text>

          {/* Treatment rows — bottom to top (level 1 at bottom, 5 at top) */}
          {TREATMENTS.slice().reverse().map((t, ri) => {
            const idx = totalLevels - 1 - ri;
            const y = startY + idx * rowH;
            const widthFrac = (t.level / totalLevels) * barW * 0.85;
            const isSelected = selected === t.id;

            return (
              <g key={t.id} tabIndex={0} role="button" style={{ cursor: "pointer" }} onClick={() => setSelected(isSelected ? null : t.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(isSelected ? null : t.id); } }}>
                {/* Bar */}
                <rect
                  x={barX + (barW - widthFrac) / 2}
                  y={y + 5}
                  width={widthFrac}
                  height={rowH - 14}
                  rx="6"
                  fill={t.color}
                  opacity={isSelected ? 0.95 : 0.7}
                  stroke={isSelected ? "var(--foreground, #fff)" : "none"}
                  strokeWidth={isSelected ? 2 : 0}
                />
                {/* Level number */}
                <text
                  x={barX + barW / 2}
                  y={y + rowH / 2 + 1}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="#fff"
                  style={{ cursor: "pointer", pointerEvents: "none" }}
                >
                  {isFi ? t.nameFi : t.name}
                </text>
                {/* Level label right */}
                <text
                  x={barX + barW + 10}
                  y={y + rowH / 2 + 1}
                  fontSize="10"
                  fill="var(--foreground-muted, #999)"
                  dominantBaseline="middle"
                >
                  L{t.level}: {isFi ? t.levelLabelFi : t.levelLabel}
                </text>
              </g>
            );
          })}

          {/* Convergence label at bottom */}
          <text x={barX + barW / 2} y={startY + rowH * totalLevels + 25} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent, #e88d4e)">
            {d.convergence}: Ca²⁺
          </text>
        </svg>
      </div>

      {/* Detail panel */}
      {selected && (() => {
        const t = TREATMENTS.find((tr) => tr.id === selected);
        if (!t) return null;
        return (
          <div className="mt-4 rounded-lg border border-card-border bg-card-bg p-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: t.color }} />
              <span className="font-semibold text-sm">{isFi ? t.nameFi : t.name}</span>
              <span className="text-xs text-foreground-muted">— {isFi ? t.levelLabelFi : t.levelLabel}</span>
            </div>
            <div className="grid gap-2 text-sm text-foreground-muted">
              <p><span className="font-semibold text-foreground">{d.mechanism}:</span> {isFi ? t.mechanismFi : t.mechanism}</p>
              <p><span className="font-semibold text-foreground">{d.target}:</span> {t.ionTarget}</p>
              <p><span className="font-semibold text-foreground">{d.onset}:</span> {isFi ? t.onsetFi : t.onset}</p>
            </div>
          </div>
        );
      })()}

      <p className="text-xs text-foreground-muted italic mt-3 max-w-4xl">
        {isFi ? d.convergenceNoteFi : d.convergenceNote}
      </p>
    </div>
  );
}
