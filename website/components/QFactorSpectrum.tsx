"use client";

import { useState, useCallback } from "react";

const PATHWAYS = [
  {
    id: "brainstem",
    q: "Q → ∞",
    qNum: 100,
    gamma: "γ < 0",
    color: "#dc2626",
    en: {
      label: "Brainstem",
      condition: "SIDS / SUDEP",
      mechanism: "GABA excitatory (NKCC1 > KCC2) — no damping. Any resonant input amplifies without limit → fatal CSD to brainstem.",
      drug: "Bumetanide (NKCC1 block → restores inhibitory GABA)",
      outcome: "Fatal cardiorespiratory arrest",
    },
    fi: {
      label: "Aivorunko",
      condition: "SIDS / SUDEP",
      mechanism: "GABA eksitatorinen (NKCC1 > KCC2) — ei vaimennusta. Mikä tahansa resonanssisyöte vahvistuu ilman rajaa → fataali CSD aivorunkoon.",
      drug: "Bumetanidi (NKCC1-salpaus → palauttaa inhibitorisen GABAn)",
      outcome: "Fataali sydänhengityspysähdys",
    },
  },
  {
    id: "thalamocortical",
    q: "Q ~ 20–50",
    qNum: 35,
    gamma: "γ low",
    color: "#ea580c",
    en: {
      label: "Thalamocortical",
      condition: "Absence epilepsy",
      mechanism: "Thalamic Cav3.2 (T-type) sleep spindle circuits generate 3 Hz spike-wave oscillation when damping is insufficient.",
      drug: "Ethosuximide (T-type Ca²⁺ channel block)",
      outcome: "Brief loss of consciousness, 3 Hz spike-wave",
    },
    fi: {
      label: "Talamo-kortikaalinen",
      condition: "Poissaoloepilepsia",
      mechanism: "Talamuksen Cav3.2 (T-tyypin) unikäämipiirit tuottavat 3 Hz piikki-aalto-oskillaation kun vaimennus on riittämätön.",
      drug: "Etosuksimidi (T-tyypin Ca²⁺-kanavasalpaus)",
      outcome: "Lyhyt tajunnanmenetys, 3 Hz piikki-aalto",
    },
  },
  {
    id: "auditory",
    q: "Q ~ 15–30",
    qNum: 22,
    gamma: "γ low–moderate",
    color: "#f59e0b",
    en: {
      label: "Auditory pathway",
      condition: "Tinnitus",
      mechanism: "Cochlear hair cell Ca²⁺ overload → excitotoxic damage → central auditory cortex reorganization → phantom perception. α2δ-1 upregulation increases synaptic gain.",
      drug: "Gabapentin (α2δ-1 block → reduces aberrant synaptogenesis)",
      outcome: "Persistent phantom sound perception",
    },
    fi: {
      label: "Kuuloreitti",
      condition: "Tinnitus",
      mechanism: "Simpukan karvasolun Ca²⁺-ylikuormitus → eksitotoksinen vaurio → keskuskuulokorteksin uudelleenjärjestäytyminen → haamuhavainto. α2δ-1-ylössäätely kasvattaa synaptista vahvistusta.",
      drug: "Gabapentiini (α2δ-1-salpaus → vähentää poikkeavaa synaptogeneesiä)",
      outcome: "Jatkuva haamuäänihavainto",
    },
  },
  {
    id: "spinal",
    q: "Q ~ 10–20",
    qNum: 15,
    gamma: "γ moderate",
    color: "#eab308",
    en: {
      label: "Spinal cord",
      condition: "Chronic pain",
      mechanism: "ELF upregulates α2δ-1 (CACNA2D1) in dorsal horn → excess excitatory synapses → central sensitization. Pain persists after tissue healing.",
      drug: "Pregabalin / Gabapentin (α2δ-1 block)",
      outcome: "Chronic neuropathic pain, allodynia",
    },
    fi: {
      label: "Selkäydin",
      condition: "Krooninen kipu",
      mechanism: "ELF säätelee α2δ-1:tä (CACNA2D1) ylöspäin dorsaalisarvessa → ylimääräiset eksittatoriset synapsit → sentraalinen sensitisaatio. Kipu jatkuu kudoksen parantuessa.",
      drug: "Pregabaliini / Gabapentiini (α2δ-1-salpaus)",
      outcome: "Krooninen neuropaattinen kipu, allodynia",
    },
  },
  {
    id: "cortex",
    q: "Q ~ 8–15",
    qNum: 12,
    gamma: "γ moderate",
    color: "#84cc16",
    en: {
      label: "Cortex",
      condition: "ASD / ADHD",
      mechanism: "CACNA1C variants alter cortical E/I balance. ASD: excitation-dominant (social withdrawal). ADHD: prefrontal hypofunction (dopamine/Ca²⁺ interaction).",
      drug: "Bumetanide (ASD trials: NKCC1 → GABA switch); Methylphenidate (ADHD: DA → Ca²⁺ modulation)",
      outcome: "Neurodevelopmental spectrum",
    },
    fi: {
      label: "Korteksi",
      condition: "ASD / ADHD",
      mechanism: "CACNA1C-variantit muuttavat kortikaalista E/I-tasapainoa. ASD: eksitaatiodominantti (sosiaalinen vetäytyminen). ADHD: prefrontaalinen hypoaktiviteetti (dopamiini/Ca²⁺-vuorovaikutus).",
      drug: "Bumetanidi (ASD-tutkimukset: NKCC1 → GABA-kytkin); Metyylifenidaatti (ADHD: DA → Ca²⁺-modulaatio)",
      outcome: "Neurokehityksellinen spektri",
    },
  },
  {
    id: "meningeal",
    q: "Q ~ 5–15",
    qNum: 10,
    gamma: "γ moderate",
    color: "#22c55e",
    en: {
      label: "Meningeal / trigeminal",
      condition: "Migraine",
      mechanism: "CSD propagates across cortex at 3–5 mm/min → activates meningeal trigeminal afferents → CGRP release → vasodilation + headache. CACNA1A GoF (FHM1) lowers threshold.",
      drug: "Valproate, Topiramate (Q↓); CGRP antibodies (downstream block)",
      outcome: "Aura + trigeminal headache",
    },
    fi: {
      label: "Meningeaalinen / trigeminaalinen",
      condition: "Migreeni",
      mechanism: "CSD leviää aivokuorella 3–5 mm/min → aktivoi meningeaaliset trigeminaaliafferentit → CGRP-vapautuminen → vasodilataatio + päänsärky. CACNA1A GoF (FHM1) alentaa kynnystä.",
      drug: "Valproaatti, Topiramaatti (Q↓); CGRP-vasta-aineet (alavirtasalpaus)",
      outcome: "Aura + trigeminaalinen päänsärky",
    },
  },
  {
    id: "hypothalamic",
    q: "Q ~ 10–20",
    qNum: 15,
    gamma: "γ circadian",
    color: "#3b82f6",
    en: {
      label: "Hypothalamus / SCN",
      condition: "Cluster headache",
      mechanism: "SCN Ca²⁺ oscillation phase-locked to circadian cycle. Cav1.2 window current → trigeminal-autonomic activation. Attacks at 00–03 h with seasonal periodicity.",
      drug: "Verapamil (L-type block, first-line); Melatonin; Psilocybin (tryptamine reset)",
      outcome: "Unilateral trigeminal-autonomic attacks",
    },
    fi: {
      label: "Hypotalamus / SCN",
      condition: "Klusteripäänsärky",
      mechanism: "SCN:n Ca²⁺-oskillaatio vaihelukittu vuorokausirytmiin. Cav1.2-ikkunavirta → trigeminaalis-autonominen aktivaatio. Kohtaukset klo 00–03, kausittainen periodisuus.",
      drug: "Verapamiili (L-tyypin salpaus, ensisijaislääke); Melatoniini; Psilosybiini (tryptamiiniresetti)",
      outcome: "Yksipuoliset trigeminaalis-autonomiset kohtaukset",
    },
  },
] as const;

export function QFactorSpectrum({ locale }: { locale: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const lang = locale === "fi" ? "fi" : "en";

  const handleSelect = useCallback((id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  const t = {
    en: {
      title: "Q-Factor Spectrum",
      subtitle: "Seven neural pathways, one damped oscillator equation",
      equation: "Q = ω₀ / (2γ)",
      eqDesc: "where γ is the net GABAergic damping coefficient",
      selectPrompt: "Select a pathway to explore",
      mechanism: "Mechanism",
      treatment: "Ca²⁺-targeted treatment",
      outcome: "Clinical outcome",
      damping: "Damping",
      qFactor: "Q-factor",
      fatal: "Fatal",
      severe: "Severe",
      moderate: "Moderate",
      normal: "Normal",
      highQ: "High Q (underdamped)",
      lowQ: "Low Q (overdamped)",
    },
    fi: {
      title: "Q-tekijäspektri",
      subtitle: "Seitsemän hermorataa, yksi vaimennetun oskillaattorin yhtälö",
      equation: "Q = ω₀ / (2γ)",
      eqDesc: "missä γ on netto-GABAerginen vaimennuskerroin",
      selectPrompt: "Valitse hermorata tutkittavaksi",
      mechanism: "Mekanismi",
      treatment: "Ca²⁺-kohdistettu hoito",
      outcome: "Kliininen lopputulema",
      damping: "Vaimennus",
      qFactor: "Q-tekijä",
      fatal: "Fataali",
      severe: "Vakava",
      moderate: "Kohtalainen",
      normal: "Normaali",
      highQ: "Korkea Q (alivaimennettu)",
      lowQ: "Matala Q (ylivaimennettu)",
    },
  }[lang];

  const selectedPathway = PATHWAYS.find((p) => p.id === selected);
  const selectedCopy = selectedPathway?.[lang];

  return (
    <div className="rounded-2xl border border-card-border bg-card-bg overflow-hidden">
      <div className="p-6 sm:p-8" style={{ background: "#0f172a" }}>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{t.title}</h3>
        <p className="text-sm text-white/60 mb-2">{t.subtitle}</p>
        <p className="font-mono text-sm text-blue-300 mb-1">{t.equation}</p>
        <p className="text-xs text-white/40">{t.eqDesc}</p>

        <svg viewBox="0 0 800 220" className="w-full mt-6" role="img" aria-label={t.title}>
          <defs>
            <linearGradient id="qGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.3" />
              <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#22c55e" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <rect x="60" y="80" width="700" height="40" rx="20" fill="url(#qGrad)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

          <text x="60" y="70" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">{t.highQ}</text>
          <text x="760" y="70" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace" textAnchor="end">{t.lowQ}</text>

          <text x="80" y="140" fill="#dc2626" fontSize="9" opacity="0.6">{t.fatal}</text>
          <text x="280" y="140" fill="#f59e0b" fontSize="9" opacity="0.6">{t.severe}</text>
          <text x="500" y="140" fill="#22c55e" fontSize="9" opacity="0.6">{t.moderate}</text>
          <text x="700" y="140" fill="#3b82f6" fontSize="9" opacity="0.6">{t.normal}</text>

          {PATHWAYS.map((p, i) => {
            const x = 80 + (i / (PATHWAYS.length - 1)) * 660;
            const isSelected = selected === p.id;
            const copy = p[lang];
            return (
              <g
                key={p.id}
                onClick={() => handleSelect(p.id)}
                style={{ cursor: "pointer" }}
                role="button"
                aria-pressed={isSelected}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSelect(p.id); } }}
              >
                <circle
                  cx={x}
                  cy="100"
                  r={isSelected ? 18 : 14}
                  fill={isSelected ? p.color : `${p.color}33`}
                  stroke={p.color}
                  strokeWidth={isSelected ? 3 : 1.5}
                  style={{ transition: "all 0.2s" }}
                />
                <text
                  x={x}
                  y="103"
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                  style={{ pointerEvents: "none" }}
                >
                  {p.q.replace("Q ", "").replace("Q→", "").replace("~ ", "")}
                </text>
                <text
                  x={x}
                  y="165"
                  textAnchor="middle"
                  fill={isSelected ? p.color : "rgba(255,255,255,0.5)"}
                  fontSize="10"
                  fontWeight={isSelected ? "bold" : "normal"}
                  style={{ transition: "all 0.2s" }}
                >
                  {copy.label}
                </text>
                <text
                  x={x}
                  y="180"
                  textAnchor="middle"
                  fill={isSelected ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"}
                  fontSize="9"
                  style={{ transition: "all 0.2s" }}
                >
                  {copy.condition}
                </text>

                {isSelected && (
                  <>
                    <line x1={x} y1="55" x2={x} y2="82" stroke={p.color} strokeWidth="1.5" strokeDasharray="3,3" />
                    <circle cx={x} cy="52" r="4" fill={p.color} />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {!selectedPathway && (
          <p className="text-center text-sm text-white/40 mt-4">{t.selectPrompt}</p>
        )}
      </div>

      {selectedPathway && selectedCopy && (
        <div className="p-6 sm:p-8 border-t border-card-border space-y-4" style={{ borderColor: `${selectedPathway.color}30` }}>
          <div className="flex items-center gap-3 mb-2">
            <span
              className="inline-block w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: selectedPathway.color }}
            />
            <h4 className="font-semibold text-sm">
              {selectedCopy.label}: {selectedCopy.condition}
            </h4>
            <span className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${selectedPathway.color}15`, color: selectedPathway.color }}>
              {selectedPathway.q} · {selectedPathway.gamma}
            </span>
          </div>

          <div>
            <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">{t.mechanism}</p>
            <p className="text-sm leading-relaxed">{selectedCopy.mechanism}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">{t.treatment}</p>
            <p className="text-sm leading-relaxed text-accent">{selectedCopy.drug}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">{t.outcome}</p>
            <p className="text-sm leading-relaxed font-medium" style={{ color: selectedPathway.color }}>{selectedCopy.outcome}</p>
          </div>
        </div>
      )}
    </div>
  );
}
