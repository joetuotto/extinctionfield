"use client";

const LABELS = {
  en: {
    title: "Natural Electromagnetic Environment",
    subtitle: "Five layers of the natural EM field that biology evolved within",
    sr: "Schumann Resonance",
    srRange: "7.83 Hz (ELF)",
    pc1: "Pc1 Micropulsations",
    pc1Range: "0.2–5 Hz (ULF)",
    bgeo: "Static Geomagnetic Field",
    bgeoRange: "25–65 µT",
    solar: "Solar Cycle Modulation",
    solarRange: "11-year period",
    gic: "GIC Harmonics",
    gicRange: "Storm-time ELF",
    bioHeart: "Heart rate (0.8–1.3 Hz)",
    bioAlpha: "Alpha waves (8–13 Hz)",
    freqLabel: "Frequency (Hz)",
    bioLabel: "Biological windows",
    legendTitle: "Source → Biological pathway",
    legendSr: "SR → circadian timing via CRY",
    legendPc1: "Pc1 → cardiac coherence via HRV",
    legendBgeo: "B_geo → CRY/RPM reference field",
    legendSolar: "Solar cycle → modulates all layers",
    legendGic: "GIC → anthropogenic ELF exposure",
  },
  fi: {
    title: "Luonnollinen sähkömagneettinen ympäristö",
    subtitle: "Viisi luonnollisen EM-kentän kerrosta, joiden sisällä biologia kehittyi",
    sr: "Schumannin resonanssi",
    srRange: "7,83 Hz (ELF)",
    pc1: "Pc1-mikropulsaatiot",
    pc1Range: "0,2–5 Hz (ULF)",
    bgeo: "Staattinen geomagneettinen kenttä",
    bgeoRange: "25–65 µT",
    solar: "Auringon syklin modulaatio",
    solarRange: "11 vuoden jakso",
    gic: "GIC-harmoniset",
    gicRange: "Myrskyaikainen ELF",
    bioHeart: "Sydämen syke (0,8–1,3 Hz)",
    bioAlpha: "Alfa-aallot (8–13 Hz)",
    freqLabel: "Taajuus (Hz)",
    bioLabel: "Biologiset ikkunat",
    legendTitle: "Lähde → Biologinen reitti",
    legendSr: "SR → sirkadiaaninen ajoitus CRY:n kautta",
    legendPc1: "Pc1 → sydämen koherenssi HRV:n kautta",
    legendBgeo: "B_geo → CRY/RPM-viitekenttä",
    legendSolar: "Auringon sykli → moduloi kaikkia kerroksia",
    legendGic: "GIC → antropogeeninen ELF-altistus",
  },
};

export function NaturalEMVisualization({ locale }: { locale: string }) {
  const l = locale === "fi" ? LABELS.fi : LABELS.en;

  // Log scale mapping: freq in Hz -> x position (0-800 within the chart area)
  const freqToX = (freq: number) => {
    const logMin = Math.log10(0.01);
    const logMax = Math.log10(100);
    return 80 + ((Math.log10(freq) - logMin) / (logMax - logMin)) * 720;
  };

  // Layer data
  const layers = [
    { label: l.pc1, range: l.pc1Range, fMin: 0.2, fMax: 5, y: 80, color: "#6366f1" },
    { label: l.sr, range: l.srRange, fMin: 7, fMax: 14, y: 140, color: "#10b981" },
    { label: l.gic, range: l.gicRange, fMin: 0.5, fMax: 30, y: 200, color: "#f59e0b" },
  ];

  // Bio windows (dashed overlay)
  const bioWindows = [
    { label: l.bioHeart, fMin: 0.8, fMax: 1.3, color: "#ef4444" },
    { label: l.bioAlpha, fMin: 8, fMax: 13, color: "#3b82f6" },
  ];

  // Tick marks for freq axis
  const ticks = [0.01, 0.1, 1, 10, 100];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">{l.title}</h2>
        <p className="text-sm text-foreground-muted">{l.subtitle}</p>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 900 420" className="w-full max-w-4xl" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect x="80" y="40" width="720" height="280" rx="4" fill="var(--card-bg, #f8f8f8)" stroke="var(--card-border, #e5e5e5)" strokeWidth="1" />

          {/* Frequency grid lines */}
          {ticks.map((freq) => (
            <g key={freq}>
              <line x1={freqToX(freq)} y1={40} x2={freqToX(freq)} y2={320} stroke="var(--card-border, #e5e5e5)" strokeWidth="0.5" strokeDasharray="4 4" />
              <text x={freqToX(freq)} y={345} textAnchor="middle" fill="var(--foreground-muted, #888)" fontSize="11">{freq}</text>
            </g>
          ))}

          {/* Frequency axis label */}
          <text x={440} y={375} textAnchor="middle" fill="var(--foreground, #333)" fontSize="12" fontWeight="500">{l.freqLabel}</text>

          {/* Bio windows (dashed overlay boxes) */}
          {bioWindows.map((bw, i) => (
            <g key={i}>
              <rect x={freqToX(bw.fMin)} y={45} width={freqToX(bw.fMax) - freqToX(bw.fMin)} height={270} fill={bw.color} fillOpacity="0.06" stroke={bw.color} strokeWidth="1.5" strokeDasharray="6 3" rx="3" />
              <text x={freqToX(bw.fMin) + (freqToX(bw.fMax) - freqToX(bw.fMin)) / 2} y={60} textAnchor="middle" fill={bw.color} fontSize="10" fontWeight="500">{bw.label}</text>
            </g>
          ))}

          {/* EM layers as horizontal bars */}
          {layers.map((layer, i) => {
            const x1 = freqToX(layer.fMin);
            const x2 = freqToX(layer.fMax);
            const w = x2 - x1;
            return (
              <g key={i}>
                <rect x={x1} y={layer.y} width={w} height={32} rx="4" fill={layer.color} fillOpacity="0.15" stroke={layer.color} strokeWidth="1.5" />
                <text x={x1 + w / 2} y={layer.y + 15} textAnchor="middle" fill={layer.color} fontSize="11" fontWeight="600">{layer.label}</text>
                <text x={x1 + w / 2} y={layer.y + 27} textAnchor="middle" fill="var(--foreground-muted, #888)" fontSize="9">{layer.range}</text>
              </g>
            );
          })}

          {/* Static field and solar cycle as annotation boxes on the right */}
          <rect x="680" y="260" width="110" height="50" rx="6" fill="var(--card-bg, #f8f8f8)" stroke="var(--accent, #6366f1)" strokeWidth="1" strokeDasharray="4 2" />
          <text x="735" y="278" textAnchor="middle" fill="var(--foreground, #333)" fontSize="10" fontWeight="600">{l.bgeo}</text>
          <text x="735" y="292" textAnchor="middle" fill="var(--foreground-muted, #888)" fontSize="9">{l.bgeoRange}</text>

          <rect x="560" y="260" width="110" height="50" rx="6" fill="var(--card-bg, #f8f8f8)" stroke="var(--accent, #6366f1)" strokeWidth="1" strokeDasharray="4 2" />
          <text x="615" y="278" textAnchor="middle" fill="var(--foreground, #333)" fontSize="10" fontWeight="600">{l.solar}</text>
          <text x="615" y="292" textAnchor="middle" fill="var(--foreground-muted, #888)" fontSize="9">{l.solarRange}</text>

          {/* Bio windows label */}
          <text x="80" y={395} fill="var(--foreground-muted, #888)" fontSize="10" fontStyle="italic">{l.bioLabel}: ◻ {l.bioHeart} ◻ {l.bioAlpha}</text>
        </svg>
      </div>

      {/* Legend */}
      <div className="rounded-lg border border-card-border bg-card-bg p-4 max-w-2xl">
        <h3 className="text-sm font-semibold text-foreground mb-2">{l.legendTitle}</h3>
        <ul className="text-sm text-foreground-muted space-y-1">
          <li><span style={{ color: "#10b981" }}>●</span> {l.legendSr}</li>
          <li><span style={{ color: "#6366f1" }}>●</span> {l.legendPc1}</li>
          <li><span className="text-accent">●</span> {l.legendBgeo}</li>
          <li><span style={{ color: "#f59e0b" }}>●</span> {l.legendGic}</li>
          <li><span className="text-accent">●</span> {l.legendSolar}</li>
        </ul>
      </div>
    </div>
  );
}
