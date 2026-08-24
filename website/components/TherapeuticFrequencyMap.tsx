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
  band: "dc" | "elf" | "if" | "hf" | "optical";
  color: string;
}

const DEVICES: Device[] = [
  // DC / STATIC
  {
    id: "bone_dc",
    name: "Bone growth stimulator",
    nameFi: "Luunstimulaattori",
    fdaStatus: "PMA 1986",
    freqMin: 0.01,
    freqMax: 0.1,
    freqLabel: "DC",
    mechanism: "DC current directs osteoblast migration via bioelectric code",
    mechanismFi: "DC-virta ohjaa osteoblastien migraatiota biosähköisen koodin kautta",
    nonThermal: true,
    bermPath: "T_BE",
    band: "dc",
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
    band: "dc",
    color: "#607D8B",
  },
  {
    id: "wound_dc",
    name: "Wound healing electrotherapy",
    nameFi: "Haavanhoidon sähköterapia",
    fdaStatus: "510(k)",
    freqMin: 0.01,
    freqMax: 0.1,
    freqLabel: "DC",
    mechanism: "Microcurrent accelerates epithelial cell migration",
    mechanismFi: "Mikrovirta kiihdyttää epiteelisolujen migraatiota",
    nonThermal: true,
    bermPath: "T_BE",
    band: "dc",
    color: "#607D8B",
  },
  {
    id: "ionto",
    name: "Iontophoresis",
    nameFi: "Iontoforeesi",
    fdaStatus: "510(k)",
    freqMin: 0.01,
    freqMax: 0.1,
    freqLabel: "DC",
    mechanism: "DC field drives charged drug molecules through tissue",
    mechanismFi: "DC-kenttä ajaa varautuneita lääkemolekyylejä kudoksen läpi",
    nonThermal: true,
    bermPath: "T_BE",
    band: "dc",
    color: "#607D8B",
  },
  // ELF
  {
    id: "tens",
    name: "TENS",
    nameFi: "TENS",
    fdaStatus: "510(k) ×12,000+",
    freqMin: 2,
    freqMax: 150,
    freqLabel: "2–150 Hz",
    mechanism: "Pulsed current activates gate control and endorphin release",
    mechanismFi: "Pulssivirta aktivoi porttikontrollin ja endorfiinin vapautumisen",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
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
    mechanism: "Activates adenosine A2A/A3 receptors (GPCR pathway)",
    mechanismFi: "Aktivoi adenosiini A2A/A3-reseptoreita (GPCR-reitti)",
    nonThermal: true,
    bermPath: "GPCR",
    band: "elf",
    color: "#9C27B0",
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
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "dbs",
    name: "DBS (deep brain stimulation)",
    nameFi: "DBS (syväaivostimulaatio)",
    fdaStatus: "PMA 1997",
    freqMin: 130,
    freqMax: 185,
    freqLabel: "130–185 Hz",
    mechanism: "Electrical pulses modulate basal ganglia circuits",
    mechanismFi: "Sähköpulssit moduloivat tyvitumakkeiden piirejä",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
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
    mechanism: "Vagus nerve stimulation → systemic anti-inflammatory cascade",
    mechanismFi: "Vagushermon stimulaatio → systeeminen anti-inflammatorinen kaskadi",
    nonThermal: true,
    bermPath: "E",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "scs",
    name: "SCS (spinal cord stimulation)",
    nameFi: "SCS (selkäydinstimulaatio)",
    fdaStatus: "PMA",
    freqMin: 2,
    freqMax: 1200,
    freqLabel: "2–1200 Hz",
    mechanism: "Dorsal column stimulation modulates pain signaling",
    mechanismFi: "Dorsaalikolumnan stimulaatio moduloi kipusignalointia",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
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
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "fes",
    name: "FES (functional electrical stim)",
    nameFi: "FES (toiminnallinen sähköstimulaatio)",
    fdaStatus: "510(k)",
    freqMin: 20,
    freqMax: 50,
    freqLabel: "20–50 Hz",
    mechanism: "Patterned stimulation restores motor neuron activation",
    mechanismFi: "Kuvioitu stimulaatio palauttaa motoristen neuronien aktivaation",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "sacral",
    name: "Sacral neuromodulation (InterStim)",
    nameFi: "Sakraalineuromodulaatio (InterStim)",
    fdaStatus: "PMA 1997",
    freqMin: 10,
    freqMax: 20,
    freqLabel: "10–20 Hz",
    mechanism: "Sacral nerve modulation restores bladder/bowel control",
    mechanismFi: "Sakraalihermon modulaatio palauttaa rakon/suolen hallinnan",
    nonThermal: true,
    bermPath: "E",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "cochlear",
    name: "Cochlear implant",
    nameFi: "Sisäkorvaistute",
    fdaStatus: "PMA 1984",
    freqMin: 100,
    freqMax: 8000,
    freqLabel: "100–8000 Hz",
    mechanism: "Pulsed current directly stimulates auditory nerve fibers",
    mechanismFi: "Pulssivirta stimuloi suoraan kuulohermon säikeitä",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "ems",
    name: "EMS (muscle stimulation)",
    nameFi: "EMS (lihasstimulaatio)",
    fdaStatus: "510(k)",
    freqMin: 20,
    freqMax: 120,
    freqLabel: "20–120 Hz",
    mechanism: "Electrical pulses contract skeletal muscle non-thermally",
    mechanismFi: "Sähköpulssit supistavat luurankolihasta ei-termisesti",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "ect",
    name: "ECT (electroconvulsive therapy)",
    nameFi: "ECT (sähkökonvulsioterapia)",
    fdaStatus: "Class III",
    freqMin: 70,
    freqMax: 140,
    freqLabel: "70–140 Hz",
    mechanism: "Brief pulse current induces controlled seizure for depression",
    mechanismFi: "Lyhyt pulssisivirta tuottaa kontrolloidun kohtauksen masennukseen",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  // IF
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
    band: "if",
    color: "#FF5722",
  },
  {
    id: "ifc",
    name: "Interferential current therapy",
    nameFi: "Interferentiaalivirtaterapia",
    fdaStatus: "510(k)",
    freqMin: 1_000,
    freqMax: 4_000,
    freqLabel: "1–4 kHz",
    mechanism: "Two crossed AC currents produce deep-tissue stimulation",
    mechanismFi: "Kaksi risteävää AC-virtaa tuottavat syvän kudosstimulaation",
    nonThermal: true,
    bermPath: "D",
    band: "if",
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
    band: "if",
    color: "#FF5722",
  },
  // HF (RF below telecom)
  {
    id: "prf",
    name: "PRF anti-inflammatory",
    nameFi: "PRF tulehdushoito",
    fdaStatus: "510(k)",
    freqMin: 27_120_000,
    freqMax: 27_120_000,
    freqLabel: "27.12 MHz",
    mechanism: "Pulsed RF produces non-thermal anti-inflammatory tissue response",
    mechanismFi: "Pulsattu RF tuottaa ei-termisen anti-inflammatorisen kudosvasteen",
    nonThermal: true,
    bermPath: "A",
    band: "hf",
    color: "#FF9800",
  },
  // OPTICAL (near-IR, visible, UV)
  {
    id: "lllt",
    name: "LLLT / Photobiomodulation",
    nameFi: "LLLT / Fotobiomodulaatio",
    fdaStatus: "510(k) 2007",
    freqMin: 2.73e14,
    freqMax: 4.84e14,
    freqLabel: "620–1100 nm",
    mechanism: "Photon absorption by mitochondrial cytochrome c oxidase → ATP/ROS",
    mechanismFi: "Fotonin absorptio mitokondriaalisen sytokromi c -oksidaasin toimesta → ATP/ROS",
    nonThermal: true,
    bermPath: "CCO",
    band: "optical",
    color: "#E91E63",
  },
  {
    id: "blue_light",
    name: "Blue light therapy (jaundice)",
    nameFi: "Sinivaloterapia (keltaisuus)",
    fdaStatus: "510(k)",
    freqMin: 6.12e14,
    freqMax: 7.14e14,
    freqLabel: "420–490 nm",
    mechanism: "Photoisomerization of bilirubin — no thermal component",
    mechanismFi: "Bilirubiinin fotoisomerisaatio — ei termistä komponenttia",
    nonThermal: true,
    bermPath: "photochem",
    band: "optical",
    color: "#E91E63",
  },
  {
    id: "uv_photo",
    name: "UV phototherapy (psoriasis)",
    nameFi: "UV-valohoito (psoriasis)",
    fdaStatus: "510(k)",
    freqMin: 9.37e14,
    freqMax: 1.03e15,
    freqLabel: "290–320 nm",
    mechanism: "UV-B immunomodulation via T-cell apoptosis and cytokine shift",
    mechanismFi: "UV-B-immunomodulaatio T-soluapoptoosin ja sytokiinimuutoksen kautta",
    nonThermal: true,
    bermPath: "photochem",
    band: "optical",
    color: "#E91E63",
  },
  {
    id: "pdt",
    name: "Photodynamic therapy (PDT)",
    nameFi: "Fotodynaaminen terapia (PDT)",
    fdaStatus: "PMA",
    freqMin: 4.35e14,
    freqMax: 4.76e14,
    freqLabel: "630–690 nm",
    mechanism: "Light activates photosensitizer → singlet oxygen → tumor cell death",
    mechanismFi: "Valo aktivoi fotosensitisaattorin → singlettihappi → kasvainsolujen kuolema",
    nonThermal: true,
    bermPath: "photochem",
    band: "optical",
    color: "#E91E63",
  },
];

interface Band {
  id: string;
  label: string;
  labelFi: string;
  logMin: number;
  logMax: number;
  color: string;
  count: number;
}

const BANDS: Band[] = [
  { id: "dc", label: "DC", labelFi: "DC", logMin: -2, logMax: -0.5, color: "#607D8B", count: DEVICES.filter((d) => d.band === "dc").length },
  { id: "elf", label: "ELF", labelFi: "ELF", logMin: -0.5, logMax: 3.2, color: "#9C27B0", count: DEVICES.filter((d) => d.band === "elf").length },
  { id: "if", label: "IF", labelFi: "IF", logMin: 3, logMax: 6.7, color: "#FF5722", count: DEVICES.filter((d) => d.band === "if").length },
  { id: "hf", label: "HF", labelFi: "HF", logMin: 7, logMax: 7.8, color: "#FF9800", count: DEVICES.filter((d) => d.band === "hf").length },
  { id: "optical", label: "Optical", labelFi: "Optinen", logMin: 14.3, logMax: 15.1, color: "#E91E63", count: DEVICES.filter((d) => d.band === "optical").length },
];

const GAP = { logMin: 8.5, logMax: 11, label: "Telecom RF", labelFi: "Telecom-RF" };

const ENV_BANDS = [
  { label: "Cellular", labelFi: "Matkapuhelinverkot", min: 700_000_000, max: 3_500_000_000, color: "#F4433625" },
  { label: "Wi-Fi", labelFi: "Wi-Fi", min: 2_400_000_000, max: 6_000_000_000, color: "#2196F325" },
];

const COPY = {
  en: {
    title: "The Spectrum of Proof",
    subtitle: "Non-thermal biological effects are regulatory-approved across the entire EM spectrum — except at telecom RF frequencies",
    gapTitle: "THE GAP",
    gapSub: "0 therapeutic\ncategories",
    gapNote: "The only frequency range where non-thermal bioactivity is 'not recognized' is the range used by the telecommunications industry",
    categories: "categories",
    clickHint: "Click a band or row for details",
    freq: "Frequency",
    device: "Device",
    fda: "FDA status",
    mechanism: "Mechanism",
    path: "BERM pathway",
    bandDc: "DC / Static",
    bandElf: "ELF (< 1 kHz)",
    bandIf: "IF (1 kHz – 30 MHz)",
    bandHf: "HF (27 MHz)",
    bandOptical: "Optical (IR – UV)",
    totalCategories: "device categories",
    totalApprovals: "individual FDA approvals in TENS alone",
    totalMarket: "global neuromodulation market",
    totalImplanted: "DBS devices implanted worldwide",
  },
  fi: {
    title: "Todistuksen spektri",
    subtitle: "Ei-termiset biologiset vaikutukset ovat regulaattorihyväksyttyjä koko EM-spektrillä — paitsi telecom-RF-taajuuksilla",
    gapTitle: "AUKKO",
    gapSub: "0 terapeuttista\nkategoriaa",
    gapNote: "Ainoa taajuusalue jossa ei-termistä bioaktiivisuutta 'ei tunnusteta' on telekommunikaatioteollisuuden käyttämä alue",
    categories: "kategoriaa",
    clickHint: "Klikkaa kaistaa tai riviä nähdäksesi tiedot",
    freq: "Taajuus",
    device: "Laite",
    fda: "FDA-status",
    mechanism: "Mekanismi",
    path: "BERM-polku",
    bandDc: "DC / Staattinen",
    bandElf: "ELF (< 1 kHz)",
    bandIf: "IF (1 kHz – 30 MHz)",
    bandHf: "HF (27 MHz)",
    bandOptical: "Optinen (IR – UV)",
    totalCategories: "laitekategoriaa",
    totalApprovals: "yksittäistä FDA-hyväksyntää pelkässä TENS-kategoriassa",
    totalMarket: "globaalit neuromodulaatiomarkkinat",
    totalImplanted: "DBS-laitetta implantoitu maailmanlaajuisesti",
  },
} as const;

const BAND_LABELS: Record<string, { en: string; fi: string }> = {
  dc: { en: "DC / Static", fi: "DC / Staattinen" },
  elf: { en: "ELF (< 1 kHz)", fi: "ELF (< 1 kHz)" },
  if: { en: "IF (1 kHz – 30 MHz)", fi: "IF (1 kHz – 30 MHz)" },
  hf: { en: "HF (27 MHz)", fi: "HF (27 MHz)" },
  optical: { en: "Optical (IR – UV)", fi: "Optinen (IR – UV)" },
};

function logToX(logF: number, chartX: number, chartW: number): number {
  const logMin = -2;
  const logMax = 15.5;
  return chartX + ((logF - logMin) / (logMax - logMin)) * chartW;
}

function formatFreq(hz: number): string {
  if (hz < 1) return `${hz} Hz`;
  if (hz < 1000) return `${hz} Hz`;
  if (hz < 1_000_000) return `${(hz / 1000).toFixed(hz % 1000 === 0 ? 0 : 1)} kHz`;
  if (hz < 1_000_000_000) return `${(hz / 1_000_000).toFixed(hz % 1_000_000 === 0 ? 0 : 1)} MHz`;
  if (hz < 1_000_000_000_000) return `${(hz / 1_000_000_000).toFixed(1)} GHz`;
  return `${(hz / 1_000_000_000_000).toFixed(0)} THz`;
}

const TICK_FREQS: [number, string][] = [
  [0.1, "0.1 Hz"],
  [1, "1 Hz"],
  [10, "10 Hz"],
  [100, "100 Hz"],
  [1e3, "1 kHz"],
  [1e4, "10 kHz"],
  [1e5, "100 kHz"],
  [1e6, "1 MHz"],
  [1e7, "10 MHz"],
  [1e8, "100 MHz"],
  [1e9, "1 GHz"],
  [1e10, "10 GHz"],
  [1e11, "100 GHz"],
  [1e12, "1 THz"],
  [1e13, "10 THz"],
  [1e14, "100 THz"],
  [1e15, "1 PHz"],
];

export function TherapeuticFrequencyMap({ locale }: { locale: string }) {
  const [selectedBand, setSelectedBand] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const d = COPY[locale === "fi" ? "fi" : "en"];
  const isFi = locale === "fi";

  const chartX = 40;
  const chartW = 740;
  const barY = 60;
  const barH = 100;
  const svgW = 820;
  const svgH = 260;

  const maxCount = Math.max(...BANDS.map((b) => b.count));

  return (
    <div className="my-8">
      <h4 className="text-sm font-semibold mb-1">{d.title}</h4>
      <p className="text-xs text-foreground-muted mb-4">{d.subtitle}</p>

      {/* Spectrum visualization */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", minWidth: 640 }}
          role="img"
          aria-label={d.title}
        >
          {/* Background track */}
          <rect x={chartX} y={barY} width={chartW} height={barH} rx={4} fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth={1} />

          {/* Proven bands */}
          {BANDS.map((band) => {
            const x1 = logToX(band.logMin, chartX, chartW);
            const x2 = logToX(band.logMax, chartX, chartW);
            const h = (band.count / maxCount) * barH * 0.85;
            const y = barY + barH - h;
            const isSelected = selectedBand === band.id;
            return (
              <g key={band.id} style={{ cursor: "pointer" }} onClick={() => { setSelectedBand(isSelected ? null : band.id); setSelectedDevice(null); }}>
                <rect x={x1} y={y} width={x2 - x1} height={h} rx={3} fill={band.color} opacity={isSelected ? 0.95 : 0.7} stroke={isSelected ? "var(--foreground)" : "none"} strokeWidth={isSelected ? 2 : 0} />
                <text x={(x1 + x2) / 2} y={y - 4} fill="var(--foreground)" fontSize={10} fontWeight="700" textAnchor="middle" fontFamily="ui-monospace, monospace">
                  {band.count}
                </text>
                <text x={(x1 + x2) / 2} y={barY - 6} fill="var(--foreground-muted)" fontSize={8} textAnchor="middle">
                  {isFi ? band.labelFi : band.label}
                </text>
              </g>
            );
          })}

          {/* THE GAP */}
          {(() => {
            const gx1 = logToX(GAP.logMin, chartX, chartW);
            const gx2 = logToX(GAP.logMax, chartX, chartW);
            return (
              <g>
                <defs>
                  <pattern id="gap-hatch" patternUnits="userSpaceOnUse" width="8" height="8">
                    <path d="M-1,1 l2,-2 M0,8 l8,-8 M7,9 l2,-2" stroke="var(--foreground-muted)" strokeWidth={0.5} opacity={0.3} />
                  </pattern>
                </defs>
                <rect x={gx1} y={barY} width={gx2 - gx1} height={barH} fill="url(#gap-hatch)" rx={0} />
                <rect x={gx1} y={barY} width={gx2 - gx1} height={barH} fill="none" stroke="var(--status-refuted)" strokeWidth={2} strokeDasharray="6 3" rx={0} />
                <text x={(gx1 + gx2) / 2} y={barY + barH / 2 - 8} fill="var(--status-refuted)" fontSize={12} fontWeight="800" textAnchor="middle" letterSpacing="0.08em">
                  {d.gapTitle}
                </text>
                <text x={(gx1 + gx2) / 2} y={barY + barH / 2 + 8} fill="var(--foreground-muted)" fontSize={9} textAnchor="middle">
                  {d.gapSub.split("\n").map((line, i) => (
                    <tspan key={i} x={(gx1 + gx2) / 2} dy={i === 0 ? 0 : 12}>{line}</tspan>
                  ))}
                </text>
                {/* Telecom bands inside gap */}
                {ENV_BANDS.map((band) => {
                  const ex1 = logToX(Math.log10(band.min), chartX, chartW);
                  const ex2 = logToX(Math.log10(band.max), chartX, chartW);
                  return (
                    <g key={band.label}>
                      <rect x={ex1} y={barY + barH - 16} width={ex2 - ex1} height={14} rx={2} fill={band.color} />
                      <text x={(ex1 + ex2) / 2} y={barY + barH - 5} fill="var(--foreground-muted)" fontSize={7} textAnchor="middle" fontFamily="ui-monospace, monospace">
                        {isFi ? band.labelFi : band.label}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })()}

          {/* Frequency axis */}
          <line x1={chartX} y1={barY + barH} x2={chartX + chartW} y2={barY + barH} stroke="var(--foreground-muted)" strokeWidth={1} />
          {TICK_FREQS.map(([freq, label]) => {
            const logF = Math.log10(freq);
            const x = logToX(logF, chartX, chartW);
            if (x < chartX || x > chartX + chartW) return null;
            const show = [0.1, 1, 100, 1e3, 1e5, 1e6, 1e8, 1e9, 1e11, 1e13, 1e15].includes(freq);
            return (
              <g key={freq}>
                <line x1={x} y1={barY + barH} x2={x} y2={barY + barH + (show ? 6 : 3)} stroke="var(--foreground-muted)" strokeWidth={0.5} />
                {show && (
                  <text x={x} y={barY + barH + 16} fill="var(--foreground-muted)" fontSize={8} textAnchor="middle" fontFamily="ui-monospace, monospace">
                    {label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Arrow connectors DC ← → Optical */}
          <text x={chartX + 4} y={svgH - 6} fill="var(--foreground-muted)" fontSize={8} fontStyle="italic">
            {d.clickHint}
          </text>
        </svg>
      </div>

      {/* Gap callout */}
      <div className="mt-3 rounded-lg border-2 border-status-refuted/30 bg-status-refuted/5 px-4 py-3">
        <p className="text-xs text-foreground-muted leading-relaxed">{d.gapNote}</p>
      </div>

      {/* Stats row */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { n: "26", label: d.totalCategories },
          { n: "12,000+", label: d.totalApprovals },
          { n: "$8–10B", label: d.totalMarket },
          { n: "160,000+", label: d.totalImplanted },
        ].map((s) => (
          <div key={s.label} className="border border-card-border bg-card-bg rounded-lg px-3 py-2 text-center">
            <div className="text-lg font-semibold font-mono-num text-accent">{s.n}</div>
            <div className="text-[10px] text-foreground-muted leading-tight mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Selected device detail */}
      {selectedDevice && (
        <div className="mt-4 border border-card-border bg-card-bg rounded-lg p-4 text-sm">
          <div className="flex items-start justify-between mb-2">
            <h5 className="font-semibold">{isFi ? selectedDevice.nameFi : selectedDevice.name}</h5>
            <button onClick={() => setSelectedDevice(null)} className="text-foreground-muted hover:text-foreground text-xs">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
            <div><span className="text-foreground-muted">{d.freq}:</span> {selectedDevice.freqLabel}</div>
            <div><span className="text-foreground-muted">{d.fda}:</span> {selectedDevice.fdaStatus}</div>
            <div className="col-span-2"><span className="text-foreground-muted">{d.mechanism}:</span> {isFi ? selectedDevice.mechanismFi : selectedDevice.mechanism}</div>
            <div><span className="text-foreground-muted">{d.path}:</span> {selectedDevice.bermPath}</div>
            <div>
              <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: selectedDevice.color }} />
              Non-thermal: ✓
            </div>
          </div>
        </div>
      )}

      {/* Grouped table */}
      <div className="mt-6 overflow-x-auto">
        {(["dc", "elf", "if", "hf", "optical"] as const).map((bandId) => {
          const bandDevices = DEVICES.filter((dev) => dev.band === bandId);
          const bl = BAND_LABELS[bandId];
          const isExpanded = selectedBand === null || selectedBand === bandId;
          const bandColor = BANDS.find((b) => b.id === bandId)?.color ?? "#888";
          return (
            <div key={bandId} className={`mb-4 ${isExpanded ? "" : "opacity-40"}`}>
              <button
                className="flex items-center gap-2 mb-1 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:opacity-80"
                onClick={() => { setSelectedBand(selectedBand === bandId ? null : bandId); setSelectedDevice(null); }}
              >
                <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: bandColor }} />
                {isFi ? bl.fi : bl.en}
                <span className="font-mono-num text-foreground-muted">({bandDevices.length})</span>
              </button>
              {isExpanded && (
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-card-border">
                      <th className="text-left py-1 pr-3 font-semibold text-foreground-muted">{d.freq}</th>
                      <th className="text-left py-1 pr-3 font-semibold text-foreground-muted">{d.device}</th>
                      <th className="text-left py-1 pr-3 font-semibold text-foreground-muted">{d.fda}</th>
                      <th className="text-left py-1 pr-3 font-semibold text-foreground-muted">{d.mechanism}</th>
                      <th className="text-left py-1 font-semibold text-foreground-muted">{d.path}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bandDevices.map((dev) => (
                      <tr
                        key={dev.id}
                        className={`border-b border-card-border/50 cursor-pointer ${selectedDevice?.id === dev.id ? "bg-accent/10" : "hover:bg-card-bg"}`}
                        onClick={() => setSelectedDevice(selectedDevice?.id === dev.id ? null : dev)}
                      >
                        <td className="py-1.5 pr-3 font-mono-num whitespace-nowrap">
                          <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: dev.color }} />
                          {dev.freqLabel}
                        </td>
                        <td className="py-1.5 pr-3">{isFi ? dev.nameFi : dev.name}</td>
                        <td className="py-1.5 pr-3 whitespace-nowrap">{dev.fdaStatus}</td>
                        <td className="py-1.5 pr-3 text-foreground-muted">{isFi ? dev.mechanismFi : dev.mechanism}</td>
                        <td className="py-1.5 font-mono-num">{dev.bermPath}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
