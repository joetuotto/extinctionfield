"use client";

import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Three Biological Frequency Bands",
    freqLabel: "Frequency",
    bandLabel: "Band",
    sourceLabel: "Source",
    mechanismLabel: "Mechanism",
    pathwayLabel: "BERM pathway",
    naturalLabel: "Natural",
    anthropLabel: "Anthropogenic",
    ulfBand: "ULF",
    ulfRange: "0.001 – 3 Hz",
    ulfNatural: "Pc1 micropulsations",
    ulfAnthro: "—",
    ulfMech: "Cardiac entrainment",
    ulfPathway: "—",
    elfBand: "ELF",
    elfRange: "3 – 300 Hz",
    elfNatural: "Schumann resonance (7.83 Hz)",
    elfAnthro: "Power lines (50/60 Hz)",
    elfMech: "Membrane potential modulation",
    elfPathway: "VGCC → A / D / E",
    rfBand: "RF",
    rfRange: "100 kHz – 6 GHz",
    rfNatural: "Atmospheric noise",
    rfAnthro: "Telecom, Wi-Fi, radar",
    rfMech: "CRY/RPM radical-pair spin",
    rfPathway: "B / C",
    note: "ELF modulation envelopes on RF carriers activate pathway B via spin dynamics; RF carrier energy itself acts through pathway A (electric field component).",
  },
  fi: {
    title: "Kolme biologista taajuuskaistaa",
    freqLabel: "Taajuus",
    bandLabel: "Kaista",
    sourceLabel: "Lahde",
    mechanismLabel: "Mekanismi",
    pathwayLabel: "BERM-polku",
    naturalLabel: "Luonnollinen",
    anthropLabel: "Antropogeeninen",
    ulfBand: "ULF",
    ulfRange: "0,001 – 3 Hz",
    ulfNatural: "Pc1-mikropulsaatiot",
    ulfAnthro: "—",
    ulfMech: "Sydamen synkronointi",
    ulfPathway: "—",
    elfBand: "ELF",
    elfRange: "3 – 300 Hz",
    elfNatural: "Schumann-resonanssi (7,83 Hz)",
    elfAnthro: "Sahkolinjat (50/60 Hz)",
    elfMech: "Kalvopotentiaalin modulaatio",
    elfPathway: "VGCC → A / D / E",
    rfBand: "RF",
    rfRange: "100 kHz – 6 GHz",
    rfNatural: "Ilmakehan kohina",
    rfAnthro: "Telecom, Wi-Fi, tutka",
    rfMech: "CRY/RPM radikaalipari-spin",
    rfPathway: "B / C",
    note: "RF-kantoaaltojen ELF-modulaatioverhoilukayrat aktivoivat polun B spin-dynamiikan kautta; RF-kantoaallon energia itsessaan vaikuttaa polun A kautta (sahkokentankomponentti).",
  },
  ja: {
    title: "Three Biological Frequency Bands",
    freqLabel: "Frequency",
    bandLabel: "Band",
    sourceLabel: "Source",
    mechanismLabel: "Mechanism",
    pathwayLabel: "BERM pathway",
    naturalLabel: "Natural",
    anthropLabel: "Anthropogenic",
    ulfBand: "ULF",
    ulfRange: "0.001 – 3 Hz",
    ulfNatural: "Pc1 micropulsations",
    ulfAnthro: "—",
    ulfMech: "Cardiac entrainment",
    ulfPathway: "—",
    elfBand: "ELF",
    elfRange: "3 – 300 Hz",
    elfNatural: "Schumann resonance (7.83 Hz)",
    elfAnthro: "Power lines (50/60 Hz)",
    elfMech: "Membrane potential modulation",
    elfPathway: "VGCC → A / D / E",
    rfBand: "RF",
    rfRange: "100 kHz – 6 GHz",
    rfNatural: "Atmospheric noise",
    rfAnthro: "Telecom, Wi-Fi, radar",
    rfMech: "CRY/RPM radical-pair spin",
    rfPathway: "B / C",
    note: "ELF modulation envelopes on RF carriers activate pathway B via spin dynamics; RF carrier energy itself acts through pathway A (electric field component).",
  },
  fr: {
    title: "Three Biological Frequency Bands",
    freqLabel: "Frequency",
    bandLabel: "Band",
    sourceLabel: "Source",
    mechanismLabel: "Mechanism",
    pathwayLabel: "BERM pathway",
    naturalLabel: "Natural",
    anthropLabel: "Anthropogenic",
    ulfBand: "ULF",
    ulfRange: "0.001 – 3 Hz",
    ulfNatural: "Pc1 micropulsations",
    ulfAnthro: "—",
    ulfMech: "Cardiac entrainment",
    ulfPathway: "—",
    elfBand: "ELF",
    elfRange: "3 – 300 Hz",
    elfNatural: "Schumann resonance (7.83 Hz)",
    elfAnthro: "Power lines (50/60 Hz)",
    elfMech: "Membrane potential modulation",
    elfPathway: "VGCC → A / D / E",
    rfBand: "RF",
    rfRange: "100 kHz – 6 GHz",
    rfNatural: "Atmospheric noise",
    rfAnthro: "Telecom, Wi-Fi, radar",
    rfMech: "CRY/RPM radical-pair spin",
    rfPathway: "B / C",
    note: "ELF modulation envelopes on RF carriers activate pathway B via spin dynamics; RF carrier energy itself acts through pathway A (electric field component).",
  },
  ko: {
    title: "Three Biological Frequency Bands",
    freqLabel: "Frequency",
    bandLabel: "Band",
    sourceLabel: "Source",
    mechanismLabel: "Mechanism",
    pathwayLabel: "BERM pathway",
    naturalLabel: "Natural",
    anthropLabel: "Anthropogenic",
    ulfBand: "ULF",
    ulfRange: "0.001 – 3 Hz",
    ulfNatural: "Pc1 micropulsations",
    ulfAnthro: "—",
    ulfMech: "Cardiac entrainment",
    ulfPathway: "—",
    elfBand: "ELF",
    elfRange: "3 – 300 Hz",
    elfNatural: "Schumann resonance (7.83 Hz)",
    elfAnthro: "Power lines (50/60 Hz)",
    elfMech: "Membrane potential modulation",
    elfPathway: "VGCC → A / D / E",
    rfBand: "RF",
    rfRange: "100 kHz – 6 GHz",
    rfNatural: "Atmospheric noise",
    rfAnthro: "Telecom, Wi-Fi, radar",
    rfMech: "CRY/RPM radical-pair spin",
    rfPathway: "B / C",
    note: "ELF modulation envelopes on RF carriers activate pathway B via spin dynamics; RF carrier energy itself acts through pathway A (electric field component).",
  },
};

/* Log-scale positions for the frequency axis (0 = left, 1 = right) */
const LOG_TICKS = [
  { freq: "0.001", pos: 0.0 },
  { freq: "0.01", pos: 0.083 },
  { freq: "0.1", pos: 0.167 },
  { freq: "1", pos: 0.25 },
  { freq: "10", pos: 0.333 },
  { freq: "100", pos: 0.417 },
  { freq: "1k", pos: 0.5 },
  { freq: "10k", pos: 0.583 },
  { freq: "100k", pos: 0.667 },
  { freq: "1M", pos: 0.75 },
  { freq: "10M", pos: 0.833 },
  { freq: "100M", pos: 0.917 },
  { freq: "1G", pos: 0.958 },
  { freq: "6G", pos: 1.0 },
];

const W = 520;
const H = 272;
const PAD = { top: 16, right: 16, bottom: 52, left: 16 };
const CW = W - PAD.left - PAD.right;
const BAND_H = 52;
const BAND_GAP = 16;
const BANDS_TOP = PAD.top + 8;

interface Band {
  label: string;
  range: string;
  start: number;  // 0..1 on log axis
  end: number;
  fill: string;
  fillOpacity: number;
  stroke: string;
  natural: string;
  anthro: string;
  mechanism: string;
  pathway: string;
}

export function ThreeBiologicalBands({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);

  const bands: Band[] = [
    {
      label: d.ulfBand,
      range: d.ulfRange,
      start: 0.0,
      end: 0.271,
      fill: "var(--foreground)",
      fillOpacity: 0.08,
      stroke: "var(--foreground-muted)",
      natural: d.ulfNatural,
      anthro: d.ulfAnthro,
      mechanism: d.ulfMech,
      pathway: d.ulfPathway,
    },
    {
      label: d.elfBand,
      range: d.elfRange,
      start: 0.271,
      end: 0.438,
      fill: "var(--foreground)",
      fillOpacity: 0.14,
      stroke: "var(--card-border)",
      natural: d.elfNatural,
      anthro: d.elfAnthro,
      mechanism: d.elfMech,
      pathway: d.elfPathway,
    },
    {
      label: d.rfBand,
      range: d.rfRange,
      start: 0.667,
      end: 1.0,
      fill: "var(--foreground)",
      fillOpacity: 0.22,
      stroke: "var(--foreground)",
      natural: d.rfNatural,
      anthro: d.rfAnthro,
      mechanism: d.rfMech,
      pathway: d.rfPathway,
    },
  ];

  const xOf = (frac: number) => PAD.left + frac * CW;
  const axisY = BANDS_TOP + 3 * BAND_H + 3 * BAND_GAP + 4;

  return (
    <div className="w-full max-w-4xl">
      <div className="chart-scroll pb-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[560px] max-w-[760px]"
          role="img"
          aria-label={d.title}
        >
          {/* Frequency axis */}
          <line
            x1={PAD.left}
            y1={axisY}
            x2={W - PAD.right}
            y2={axisY}
            stroke="var(--foreground-muted)"
            strokeWidth={1}
          />
          {LOG_TICKS.map((t) => {
            const x = xOf(t.pos);
            return (
              <g key={t.freq}>
                <line
                  x1={x} y1={axisY} x2={x} y2={axisY + 5}
                  stroke="var(--foreground-muted)" strokeWidth={0.75}
                />
                <text
                  x={x} y={axisY + 16}
                  textAnchor="middle"
                  fontSize={8}
                  fill="var(--foreground-muted)"
                  fontFamily="ui-monospace, monospace"
                >
                  {t.freq}
                </text>
              </g>
            );
          })}
          <text
            x={W / 2} y={axisY + 34}
            textAnchor="middle"
            fontSize={10}
            fill="var(--foreground-muted)"
          >
            {d.freqLabel} (Hz)
          </text>

          {/* Bands */}
          {bands.map((b, i) => {
            const y = BANDS_TOP + i * (BAND_H + BAND_GAP);
            const x1 = xOf(b.start);
            const x2 = xOf(b.end);
            const bw = x2 - x1;
            const midX = x1 + bw / 2;

            return (
              <g key={b.label}>
                <rect
                  x={x1} y={y}
                  width={bw} height={BAND_H}
                  rx={4}
                  fill={b.fill}
                  fillOpacity={b.fillOpacity}
                  stroke={b.stroke}
                  strokeWidth={1}
                  strokeOpacity={0.5}
                />
                <text
                  x={midX} y={y + 22}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={600}
                  fill="var(--foreground)"
                >
                  {b.label}
                </text>
                <text
                  x={midX} y={y + 37}
                  textAnchor="middle"
                  fontSize={8}
                  fill="var(--foreground-muted)"
                  fontFamily="ui-monospace, monospace"
                >
                  {b.range}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {bands.map((b) => (
          <section key={`details-${b.label}`} className="rounded-lg border border-card-border bg-card-bg p-4">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h4 className="text-sm font-semibold text-foreground">{b.label}</h4>
              <span className="font-mono text-[11px] text-foreground-muted">{b.range}</span>
            </div>
            <dl className="space-y-3 text-xs leading-relaxed">
              <div>
                <dt className="mb-1 font-semibold text-foreground">{d.sourceLabel}</dt>
                <dd className="text-foreground-muted">
                  <span className="font-medium text-foreground">{d.naturalLabel}:</span> {b.natural}<br />
                  <span className="font-medium text-foreground">{d.anthropLabel}:</span> {b.anthro}
                </dd>
              </div>
              <div>
                <dt className="mb-1 font-semibold text-foreground">{d.mechanismLabel}</dt>
                <dd className="text-foreground-muted">{b.mechanism}</dd>
              </div>
              <div>
                <dt className="mb-1 font-semibold text-foreground">{d.pathwayLabel}</dt>
                <dd className="font-mono text-foreground-muted">{b.pathway}</dd>
              </div>
            </dl>
          </section>
        ))}
      </div>

      {/* Note */}
      <p className="text-xs text-foreground-muted mt-4 max-w-4xl leading-relaxed">
        {d.note}
      </p>
    </div>
  );
}
