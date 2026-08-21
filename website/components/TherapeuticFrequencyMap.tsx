"use client";

import { useState } from "react";

interface Device {
  id: string;
  name: string;
  nameFi: string;
  fdaStatus: string;
  freqMin: number;
  freqMax: number;
  freqLabel: string;
  mechanism: string;
  mechanismFi: string;
  nonThermal: boolean;
  bermPath: string;
  color: string;
}

const DEVICES: Device[] = [
  {
    id: "bone_dc",
    name: "Bone growth stimulator (DC)",
    nameFi: "Luunstimulaattori (DC)",
    fdaStatus: "PMA 1986",
    freqMin: 0.01,
    freqMax: 0.1,
    freqLabel: "DC",
    mechanism: "DC current directs osteoblast migration",
    mechanismFi: "DC-virta ohjaa osteoblastien migraatiota",
    nonThermal: true,
    bermPath: "T_BE",
    color: "#607D8B",
  },
  {
    id: "tdcs",
    name: "tDCS (Flow Neuroscience)",
    nameFi: "tDCS (Flow Neuroscience)",
    fdaStatus: "PMA 2025",
    freqMin: 0.01,
    freqMax: 0.1,
    freqLabel: "DC",
    mechanism: "0.3–1.0 V/m modulates cortical excitability",
    mechanismFi: "0,3–1,0 V/m moduloi kortikaalista eksitabiliteettia",
    nonThermal: true,
    bermPath: "D",
    color: "#9C27B0",
  },
  {
    id: "ces",
    name: "CES (Alpha-Stim)",
    nameFi: "CES (Alpha-Stim)",
    fdaStatus: "510(k)",
    freqMin: 0.5,
    freqMax: 1,
    freqLabel: "0.5 Hz",
    mechanism: "Microcurrent pulses modulate brainstem neurotransmitters",
    mechanismFi: "Mikrovirtapulssit moduloivat aivorungon välittäjäaineita",
    nonThermal: true,
    bermPath: "D",
    color: "#9C27B0",
  },
  {
    id: "pemf",
    name: "PEMF bone healing",
    nameFi: "PEMF-luuparaneminen",
    fdaStatus: "PMA 1979",
    freqMin: 1,
    freqMax: 100,
    freqLabel: "1–100 Hz",
    mechanism: "Activates adenosine A2A/A3 receptors (GPCR)",
    mechanismFi: "Aktivoi adenosiini A2A/A3-reseptoreita (GPCR)",
    nonThermal: true,
    bermPath: "GPCR",
    color: "#4CAF50",
  },
  {
    id: "rtms",
    name: "rTMS (NeuroStar)",
    nameFi: "rTMS (NeuroStar)",
    fdaStatus: "510(k) 2008",
    freqMin: 1,
    freqMax: 50,
    freqLabel: "1–50 Hz",
    mechanism: "Pulsed magnetic field induces lasting neuroplastic changes",
    mechanismFi: "Pulssimuotoinen magneettikenttä tuottaa neuroplastisia muutoksia",
    nonThermal: true,
    bermPath: "D",
    color: "#9C27B0",
  },
  {
    id: "vns",
    name: "VNS (GammaCore)",
    nameFi: "VNS (GammaCore)",
    fdaStatus: "510(k) 2017",
    freqMin: 1,
    freqMax: 30,
    freqLabel: "1–30 Hz",
    mechanism: "Vagus nerve stimulation → systemic anti-inflammatory",
    mechanismFi: "Vagushermon stimulaatio → systeeminen anti-inflammatorinen",
    nonThermal: true,
    bermPath: "E",
    color: "#4CAF50",
  },
  {
    id: "ttfields",
    name: "TTFields (Optune)",
    nameFi: "TTFields (Optune)",
    fdaStatus: "PMA 2011/2015/2026",
    freqMin: 100_000,
    freqMax: 500_000,
    freqLabel: "100–500 kHz",
    mechanism: "Disrupts mitotic spindle formation (non-thermal)",
    mechanismFi: "Häiritsee mitoottisen karan muodostumista (ei-terminen)",
    nonThermal: true,
    bermPath: "A_mitotic",
    color: "#FF5722",
  },
  {
    id: "prf",
    name: "PRF anti-inflammatory",
    nameFi: "PRF tulehdushoito",
    fdaStatus: "510(k)",
    freqMin: 27_120_000,
    freqMax: 27_120_000,
    freqLabel: "27.12 MHz",
    mechanism: "Pulsed RF produces non-thermal tissue response",
    mechanismFi: "Pulsattu RF tuottaa ei-termisen kudosvasteen",
    nonThermal: true,
    bermPath: "A",
    color: "#FF5722",
  },
  {
    id: "rf_ablation",
    name: "RF ablation (AM-modulated)",
    nameFi: "RF-ablaatio (AM-moduloitu)",
    fdaStatus: "Approved",
    freqMin: 300_000,
    freqMax: 5_000_000,
    freqLabel: "300 kHz–5 MHz",
    mechanism: "Amplitude-modulated RF: non-thermal anticancer effect",
    mechanismFi: "Amplitudimoduloitu RF: ei-terminen syöpävastainen vaikutus",
    nonThermal: true,
    bermPath: "A",
    color: "#FF9800",
  },
];

const ENV_BANDS = [
  { label: "LED drivers", labelFi: "LED-hakkurit", min: 20_000, max: 200_000, color: "#FFC10720" },
  { label: "HVAC VFD", labelFi: "HVAC-VFD", min: 5_000, max: 50_000, color: "#FF980715" },
  { label: "Wi-Fi", labelFi: "Wi-Fi", min: 2_400_000_000, max: 6_000_000_000, color: "#2196F315" },
  { label: "Cellular", labelFi: "Matkapuhelinverkot", min: 700_000_000, max: 3_500_000_000, color: "#F4433615" },
];

const COPY = {
  en: {
    title: "FDA-approved devices on the frequency spectrum",
    subtitle: "Each point marks a frequency where FDA requires proof of non-thermal biological activity — ICNIRP recognizes none",
    clickHint: "Click a device for details",
    freq: "Frequency",
    device: "Device",
    fda: "FDA status",
    mechanism: "Mechanism",
    path: "BERM pathway",
    envSources: "Environmental EMF sources at same frequencies",
    gapLabel: "Non-thermal bioactivity proven but not recognized by ICNIRP",
  },
  fi: {
    title: "FDA-hyväksytyt laitteet taajuusspektrillä",
    subtitle: "Jokainen piste merkitsee taajuutta, jolla FDA vaatii todisteen ei-termisestä biologisesta aktiivisuudesta — ICNIRP ei tunnusta yhtäkään",
    clickHint: "Klikkaa laitetta nähdäksesi tiedot",
    freq: "Taajuus",
    device: "Laite",
    fda: "FDA-status",
    mechanism: "Mekanismi",
    path: "BERM-polku",
    envSources: "Ympäristö-EMF-lähteet samoilla taajuuksilla",
    gapLabel: "Ei-terminen bioaktiivisuus todistettu mutta ei tunnustettu ICNIRP:ssä",
  },
} as const;

function freqToX(freq: number, chartX: number, chartW: number): number {
  const logMin = -1;
  const logMax = 11;
  const logF = Math.log10(Math.max(freq, 0.1));
  return chartX + ((logF - logMin) / (logMax - logMin)) * chartW;
}

function formatFreq(hz: number): string {
  if (hz < 1) return `${hz} Hz`;
  if (hz < 1000) return `${hz} Hz`;
  if (hz < 1_000_000) return `${(hz / 1000).toFixed(hz % 1000 === 0 ? 0 : 1)} kHz`;
  if (hz < 1_000_000_000) return `${(hz / 1_000_000).toFixed(hz % 1_000_000 === 0 ? 0 : 1)} MHz`;
  return `${(hz / 1_000_000_000).toFixed(1)} GHz`;
}

const TICK_FREQS = [0.1, 1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11];

export function TherapeuticFrequencyMap({ locale }: { locale: string }) {
  const [selected, setSelected] = useState<Device | null>(null);
  const d = COPY[locale === "fi" ? "fi" : "en"];

  const chartX = 50;
  const chartW = 700;
  const chartY = 60;
  const chartH = 200;
  const svgW = 800;
  const svgH = 380;

  const deviceYSlots = [90, 130, 170, 210];

  return (
    <div className="my-8">
      <h4 className="text-sm font-semibold mb-1">{d.title}</h4>
      <p className="text-xs text-foreground-muted mb-3">{d.subtitle}</p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", minWidth: 600 }}
          role="img"
          aria-label={d.title}
        >
          <rect x={chartX} y={chartY} width={chartW} height={chartH} rx={4} fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth={1} />

          {ENV_BANDS.map((band) => {
            const x1 = freqToX(band.min, chartX, chartW);
            const x2 = freqToX(band.max, chartX, chartW);
            if (x2 < chartX || x1 > chartX + chartW) return null;
            const cx1 = Math.max(x1, chartX);
            const cx2 = Math.min(x2, chartX + chartW);
            return (
              <g key={band.label}>
                <rect x={cx1} y={chartY} width={cx2 - cx1} height={chartH} fill={band.color} />
                <text x={(cx1 + cx2) / 2} y={chartY + chartH + 28} fill="var(--foreground-muted)" fontSize={8} textAnchor="middle" fontFamily="ui-monospace, monospace">
                  {locale === "fi" ? band.labelFi : band.label}
                </text>
              </g>
            );
          })}

          <line x1={chartX} y1={chartY + chartH} x2={chartX + chartW} y2={chartY + chartH} stroke="var(--foreground-muted)" strokeWidth={1} />

          {TICK_FREQS.map((freq) => {
            const x = freqToX(freq, chartX, chartW);
            if (x < chartX || x > chartX + chartW) return null;
            return (
              <g key={freq}>
                <line x1={x} y1={chartY + chartH} x2={x} y2={chartY + chartH + 6} stroke="var(--foreground-muted)" strokeWidth={1} />
                <text x={x} y={chartY + chartH + 16} fill="var(--foreground-muted)" fontSize={9} textAnchor="middle" fontFamily="ui-monospace, monospace">
                  {formatFreq(freq)}
                </text>
              </g>
            );
          })}

          {DEVICES.map((dev, i) => {
            const x1 = freqToX(dev.freqMin, chartX, chartW);
            const x2 = freqToX(dev.freqMax, chartX, chartW);
            const cx = (x1 + x2) / 2;
            const barW = Math.max(x2 - x1, 4);
            const y = deviceYSlots[i % deviceYSlots.length];
            const isSelected = selected?.id === dev.id;

            return (
              <g
                key={dev.id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(isSelected ? null : dev)}
              >
                <rect
                  x={cx - barW / 2}
                  y={y}
                  width={barW}
                  height={8}
                  rx={4}
                  fill={dev.color}
                  opacity={isSelected ? 1 : 0.7}
                  stroke={isSelected ? "var(--foreground)" : "none"}
                  strokeWidth={isSelected ? 2 : 0}
                />
                <circle cx={cx} cy={y + 4} r={isSelected ? 7 : 5} fill={dev.color} stroke={isSelected ? "var(--foreground)" : "white"} strokeWidth={1.5} />
                <text
                  x={cx}
                  y={y - 6}
                  fill="var(--foreground)"
                  fontSize={9}
                  fontWeight={isSelected ? "700" : "500"}
                  textAnchor="middle"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                >
                  {locale === "fi" ? dev.nameFi : dev.name}
                </text>
              </g>
            );
          })}

          <text x={chartX} y={chartY - 10} fill="var(--foreground-muted)" fontSize={9} fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
            {d.gapLabel}
          </text>
          <text x={chartX + chartW} y={svgH - 4} fill="var(--foreground-muted)" fontSize={8} textAnchor="end" fontStyle="italic">
            {d.clickHint}
          </text>

          <text x={svgW / 2} y={chartY + chartH + 42} fill="var(--foreground-muted)" fontSize={9} textAnchor="middle" fontStyle="italic">
            {d.envSources}
          </text>
        </svg>
      </div>

      {selected && (
        <div className="mt-4 border border-card-border bg-card-bg rounded-lg p-4 text-sm">
          <div className="flex items-start justify-between mb-2">
            <h5 className="font-semibold">{locale === "fi" ? selected.nameFi : selected.name}</h5>
            <button onClick={() => setSelected(null)} className="text-foreground-muted hover:text-foreground text-xs">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
            <div><span className="text-foreground-muted">{d.freq}:</span> {selected.freqLabel}</div>
            <div><span className="text-foreground-muted">{d.fda}:</span> {selected.fdaStatus}</div>
            <div className="col-span-2"><span className="text-foreground-muted">{d.mechanism}:</span> {locale === "fi" ? selected.mechanismFi : selected.mechanism}</div>
            <div><span className="text-foreground-muted">{d.path}:</span> {selected.bermPath}</div>
            <div>
              <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: selected.color }} />
              Non-thermal: ✓
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-card-border">
              <th className="text-left py-2 pr-3 font-semibold text-foreground-muted">{d.freq}</th>
              <th className="text-left py-2 pr-3 font-semibold text-foreground-muted">{d.device}</th>
              <th className="text-left py-2 pr-3 font-semibold text-foreground-muted">{d.fda}</th>
              <th className="text-left py-2 pr-3 font-semibold text-foreground-muted">{d.mechanism}</th>
              <th className="text-left py-2 font-semibold text-foreground-muted">{d.path}</th>
            </tr>
          </thead>
          <tbody>
            {DEVICES.map((dev) => (
              <tr
                key={dev.id}
                className="border-b border-card-border/50 hover:bg-card-bg cursor-pointer"
                onClick={() => setSelected(dev)}
              >
                <td className="py-1.5 pr-3 font-mono-num whitespace-nowrap">
                  <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: dev.color }} />
                  {dev.freqLabel}
                </td>
                <td className="py-1.5 pr-3">{locale === "fi" ? dev.nameFi : dev.name}</td>
                <td className="py-1.5 pr-3 whitespace-nowrap">{dev.fdaStatus}</td>
                <td className="py-1.5 pr-3 text-foreground-muted">{locale === "fi" ? dev.mechanismFi : dev.mechanism}</td>
                <td className="py-1.5 font-mono-num">{dev.bermPath}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
