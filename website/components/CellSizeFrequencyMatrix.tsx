"use client";

import { useState } from "react";

interface DataPoint {
  id: string;
  name: string;
  nameFi: string;
  freqKHz: number;
  sizeUm: number;
  confirmed: boolean;
  note: string;
  noteFi: string;
}

const DATA: DataPoint[] = [
  { id: "melanoma", name: "Melanoma", nameFi: "Melanooma", freqKHz: 100, sizeUm: 35, confirmed: true, note: "TTFields optimal 100 kHz", noteFi: "TTFields-optimi 100 kHz" },
  { id: "breast", name: "Breast cancer", nameFi: "Rintasyöpä", freqKHz: 120, sizeUm: 30, confirmed: true, note: "TTFields optimal 120 kHz", noteFi: "TTFields-optimi 120 kHz" },
  { id: "pancreatic", name: "Pancreatic cancer", nameFi: "Haimasyöpä", freqKHz: 150, sizeUm: 25, confirmed: true, note: "TTFields optimal 150 kHz (PANOVA-3)", noteFi: "TTFields-optimi 150 kHz (PANOVA-3)" },
  { id: "gbm", name: "GBM (brain)", nameFi: "GBM (aivot)", freqKHz: 200, sizeUm: 20, confirmed: true, note: "TTFields optimal 200 kHz (EF-14)", noteFi: "TTFields-optimi 200 kHz (EF-14)" },
  { id: "ovarian", name: "Ovarian cancer", nameFi: "Munasarjasyöpä", freqKHz: 200, sizeUm: 20, confirmed: true, note: "TTFields 200 kHz", noteFi: "TTFields 200 kHz" },
  { id: "oocyte", name: "Oocyte (meiosis)", nameFi: "Munasolu (meioosi)", freqKHz: 50, sizeUm: 120, confirmed: false, note: "Largest human cell — low IF vulnerability window", noteFi: "Ihmisen suurin solu — matala IF-haavoittuvuusikkuna" },
  { id: "spermatocyte", name: "Spermatocyte", nameFi: "Spermatosyytti", freqKHz: 120, sizeUm: 15, confirmed: false, note: "Meiotic division — sensitive to spindle disruption", noteFi: "Meioottinen jakautuminen — herkkä karan häiriöille" },
  { id: "spermatogonia", name: "Spermatogonial stem cell", nameFi: "Spermatogoniaalinen kantasolu", freqKHz: 150, sizeUm: 12, confirmed: false, note: "Continuously dividing — highest vulnerability", noteFi: "Jatkuvasti jakautuva — korkein haavoittuvuus" },
  { id: "gut", name: "Gut epithelium", nameFi: "Suoliston epiteeli", freqKHz: 200, sizeUm: 10, confirmed: false, note: "3–5 day turnover — TTFields literature flags this tissue", noteFi: "3–5 päivän uusiutuminen — TTFields-kirjallisuus tunnistaa riskin" },
  { id: "insect", name: "Insect cells", nameFi: "Hyönteissolut", freqKHz: 350, sizeUm: 5, confirmed: false, note: "Dual resonance: cellular (kHz) + body (GHz)", noteFi: "Kaksoisresonanssi: solu (kHz) + keho (GHz)" },
];

const ENV_BANDS = [
  { label: "LED drivers", labelFi: "LED-hakkurit", minKHz: 20, maxKHz: 200, color: "rgba(255,152,0,0.12)" },
  { label: "HVAC VFD", labelFi: "HVAC VFD", minKHz: 5, maxKHz: 50, color: "rgba(76,175,80,0.10)" },
  { label: "Inverters", labelFi: "Invertterit", minKHz: 10, maxKHz: 100, color: "rgba(33,150,243,0.08)" },
];

const COPY = {
  en: {
    title: "Cell Size × Frequency Vulnerability Matrix",
    lead: "TTFields clinical data reveals a quantitative relationship between cell size and optimal disruption frequency: larger cells respond to lower frequencies. GBM cells (20 µm) at 200 kHz, pancreatic (25 µm) at 150 kHz, breast (30 µm) at 120 kHz, melanoma (35 µm) at 100 kHz. This is the same resonance principle BERM uses for insects (Thielens 2018: insect body size ≈ λ/2 at Wi-Fi frequencies) but at the intracellular level.",
    lead2: "Extrapolating to BERM’s target tissues: spermatogonial stem cells (~12 µm, continuously dividing) fall in the 100–200 kHz vulnerability window — precisely the frequency range of LED switch-mode power supplies (20–200 kHz). Gut epithelial cells (~10 µm, 3–5 day turnover) fall at 150–300 kHz. Oocytes (~120 µm, largest human cells) at 30–80 kHz. Each tissue has a frequency-specific vulnerability that maps to specific environmental EMF sources.",
    lead3: "The biological mechanism at environmental IF levels is not dielectrophoresis (DEP), which requires the high intensities used in TTFields therapy (100–300 V/m). At environmental levels (0.01–3 V/m), the mechanism is Ion Forced Oscillation (IFO-VGIC): polarized IF fields force irregular gating of voltage-gated ion channels, with a demonstrated threshold of 10⁻⁵ V/m (Panagopoulos 2025). The frequency–cell size relationship from TTFields data indicates WHICH cells are most vulnerable, while IFO provides the INTENSITY threshold at which disruption begins.",
    confirmed: "TTFields data (confirmed)",
    predicted: "BERM extrapolation (predicted)",
    envSources: "Environmental EMF sources at same frequencies",
    clickHint: "Click a point for details",
    freq: "Frequency",
    size: "Cell diameter",
  },
  fi: {
    title: "Solukoko × taajuus -haavoittuvuusmatriisi",
    lead: "TTFields-kliininen data paljastaa kvantitatiivisen suhteen solukoon ja optimaalisen häiriötaajuuden välillä: suuremmat solut reagoivat matalampiin taajuuksiin. GBM-solut (20 µm) 200 kHz, haimasyöpä (25 µm) 150 kHz, rintasyöpä (30 µm) 120 kHz, melanooma (35 µm) 100 kHz. Tämä on sama resonanssiperiaate jonka BERM käyttää hyönteisille (Thielens 2018) mutta solun sisäisellä tasolla.",
    lead2: "Ekstrapoloituna BERM:n kohdekudoksiin: spermatogoniaaliset kantasolut (~12 µm, jatkuvasti jakautuvia) osuvat 100–200 kHz haavoittuvuusikkunaan — juuri LED-hakkuriteholähteiden taajuusalue (20–200 kHz). Suoliston epiteelisolut (~10 µm, 3–5 päivän uusiutuminen) osuvat 150–300 kHz:iin. Munasolut (~120 µm, ihmisen suurimmat solut) 30–80 kHz:iin. Jokaisella kudoksella on taajuusspesifinen haavoittuvuus, joka kartoittuu tiettyihin ympäristön EMF-lähteisiin.",
    lead3: "Biologinen mekanismi ympäristön IF-tasoilla ei ole dielektroforeesi (DEP), joka vaatii TTFields-terapian korkeat intensiteetit (100–300 V/m). Ympäristötasoilla (0,01–3 V/m) mekanismi on ionien pakko-oskillaatio (IFO-VGIC): polarisoituneet IF-kentät pakottavat jänniteohjattujen ionikanavien epäsäännöllisen porttauksen, osoitetulla kynnyksellä 10⁻⁵ V/m (Panagopoulos 2025). Taajuus–solukoko-suhde TTFields-datasta osoittaa MITKÄ solut ovat haavoittuvimpia, kun taas IFO tarjoaa INTENSITEETTIKYNNYKSEN jolla häiriö alkaa.",
    confirmed: "TTFields-data (vahvistettu)",
    predicted: "BERM-ekstrapolaatio (ennuste)",
    envSources: "Ympäristön EMF-lähteet samoilla taajuuksilla",
    clickHint: "Klikkaa pistettä nähdäksesi tiedot",
    freq: "Taajuus",
    size: "Solun halkaisija",
  },
} as const;

const W = 700;
const H = 400;
const PAD = { top: 40, right: 30, bottom: 70, left: 60 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

const FREQ_MIN = 3;
const FREQ_MAX = 600;
const SIZE_MIN = 0;
const SIZE_MAX = 140;

function freqToX(kHz: number): number {
  const logMin = Math.log10(FREQ_MIN);
  const logMax = Math.log10(FREQ_MAX);
  return PAD.left + ((Math.log10(kHz) - logMin) / (logMax - logMin)) * plotW;
}

function sizeToY(um: number): number {
  return PAD.top + plotH - ((um - SIZE_MIN) / (SIZE_MAX - SIZE_MIN)) * plotH;
}

function formatFreq(kHz: number): string {
  if (kHz >= 1000) return `${(kHz / 1000).toFixed(kHz >= 10000 ? 0 : 1)} MHz`;
  return `${kHz} kHz`;
}

export function CellSizeFrequencyMatrix({ locale }: { locale: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const d = locale === "fi" ? COPY.fi : COPY.en;
  const sel = DATA.find((p) => p.id === selected);

  const freqTicks = [5, 10, 20, 50, 100, 200, 500];
  const sizeTicks = [0, 20, 40, 60, 80, 100, 120, 140];

  return (
    <div className="mt-8">
      <h4 className="text-base font-semibold mb-3">{d.title}</h4>
      <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.lead}</p>
      <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.lead2}</p>
      <p className="text-sm text-foreground-muted leading-relaxed mb-5">{d.lead3}</p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-[700px]"
          style={{ minWidth: 500 }}
          role="img"
          aria-label={d.title}
        >
          {/* Environmental bands */}
          {ENV_BANDS.map((b) => {
            const x1 = Math.max(PAD.left, freqToX(b.minKHz));
            const x2 = Math.min(PAD.left + plotW, freqToX(b.maxKHz));
            return (
              <g key={b.label}>
                <rect x={x1} y={PAD.top} width={x2 - x1} height={plotH} fill={b.color} />
                <text
                  x={(x1 + x2) / 2}
                  y={PAD.top + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fill="currentColor"
                  opacity={0.45}
                >
                  {locale === "fi" ? b.labelFi : b.label}
                </text>
              </g>
            );
          })}

          {/* Grid lines */}
          {freqTicks.map((f) => (
            <line key={f} x1={freqToX(f)} y1={PAD.top} x2={freqToX(f)} y2={PAD.top + plotH} stroke="currentColor" opacity={0.08} />
          ))}
          {sizeTicks.map((s) => (
            <line key={s} x1={PAD.left} y1={sizeToY(s)} x2={PAD.left + plotW} y2={sizeToY(s)} stroke="currentColor" opacity={0.08} />
          ))}

          {/* Axes */}
          <line x1={PAD.left} y1={PAD.top + plotH} x2={PAD.left + plotW} y2={PAD.top + plotH} stroke="currentColor" opacity={0.3} />
          <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + plotH} stroke="currentColor" opacity={0.3} />

          {/* X-axis labels */}
          {freqTicks.map((f) => (
            <text key={f} x={freqToX(f)} y={PAD.top + plotH + 16} textAnchor="middle" fontSize={10} fill="currentColor" opacity={0.6}>
              {formatFreq(f)}
            </text>
          ))}
          <text x={PAD.left + plotW / 2} y={H - 8} textAnchor="middle" fontSize={11} fill="currentColor" opacity={0.5}>
            {d.freq} (kHz, log)
          </text>

          {/* Y-axis labels */}
          {sizeTicks.map((s) => (
            <text key={s} x={PAD.left - 8} y={sizeToY(s) + 4} textAnchor="end" fontSize={10} fill="currentColor" opacity={0.6}>
              {s}
            </text>
          ))}
          <text
            x={14}
            y={PAD.top + plotH / 2}
            textAnchor="middle"
            fontSize={11}
            fill="currentColor"
            opacity={0.5}
            transform={`rotate(-90, 14, ${PAD.top + plotH / 2})`}
          >
            {d.size} (µm)
          </text>

          {/* Trend line through TTFields data */}
          <line
            x1={freqToX(80)}
            y1={sizeToY(40)}
            x2={freqToX(250)}
            y2={sizeToY(15)}
            stroke="#2196F3"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            opacity={0.35}
          />

          {/* Data points */}
          {DATA.map((pt) => {
            const cx = freqToX(pt.freqKHz);
            const cy = sizeToY(pt.sizeUm);
            const isSelected = pt.id === selected;
            const r = isSelected ? 8 : 6;
            return (
              <g
                key={pt.id}
                onClick={() => setSelected(isSelected ? null : pt.id)}
                className="cursor-pointer"
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={r + 4}
                  fill="transparent"
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={pt.confirmed ? "#2196F3" : "#FFC107"}
                  stroke={isSelected ? "currentColor" : pt.confirmed ? "#1565C0" : "#F57F17"}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  opacity={isSelected ? 1 : 0.85}
                />
                <text
                  x={cx}
                  y={cy - r - 4}
                  textAnchor="middle"
                  fontSize={8}
                  fill="currentColor"
                  opacity={0.7}
                >
                  {locale === "fi" ? pt.nameFi : pt.name}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <circle cx={PAD.left + 10} cy={H - 42} r={5} fill="#2196F3" stroke="#1565C0" strokeWidth={1} />
          <text x={PAD.left + 20} y={H - 38} fontSize={9} fill="currentColor" opacity={0.6}>
            {d.confirmed}
          </text>
          <circle cx={PAD.left + 10} cy={H - 28} r={5} fill="#FFC107" stroke="#F57F17" strokeWidth={1} />
          <text x={PAD.left + 20} y={H - 24} fontSize={9} fill="currentColor" opacity={0.6}>
            {d.predicted}
          </text>
        </svg>
      </div>

      {/* Detail panel */}
      {sel ? (
        <div className="mt-3 rounded-lg border border-card-border bg-card-bg p-4 max-w-[700px]">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: sel.confirmed ? "#2196F3" : "#FFC107" }}
            />
            <span className="text-sm font-semibold">{locale === "fi" ? sel.nameFi : sel.name}</span>
            <span className="text-xs text-foreground-muted ml-auto">
              {formatFreq(sel.freqKHz)} · {sel.sizeUm} µm
            </span>
          </div>
          <p className="text-xs text-foreground-muted">{locale === "fi" ? sel.noteFi : sel.note}</p>
        </div>
      ) : (
        <p className="text-xs text-foreground-muted mt-2 max-w-[700px]">{d.clickHint}</p>
      )}
    </div>
  );
}
