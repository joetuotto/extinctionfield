"use client";

import { pickCopy } from "@/lib/i18n";
import { MODULOME_FIGURES } from "@/lib/modulome/stateModel";

const COPY = {
  en: {
    title: "A response window that moves with the measured state",
    lead:
      "The locked window has a fixed centre and width, so it returns the same response power whatever the cell is doing. The candidate window takes its centre and width from measured state coordinates, so the same driver spectrum produces a different response in a loaded and a depleted cell. Both are evaluated against the same biological driver.",
    axisF: "Frequency (Hz)",
    axisW: "Window weight",
    locked: "Locked comparison window",
    driver: "Biological driver spectrum",
    states: {
      "loaded-store": "Loaded store",
      reference: "Reference state",
      "depleted-store": "Depleted store",
    } as Record<string, string>,
    tableTitle: "Response power against the same driver",
    colWindow: "Window",
    colCentre: "Centre (Hz)",
    colSigma: "Width σ (Hz)",
    colPower: "R²",
    colRatio: "vs locked",
    note:
      "The same window law applies to every technology: the coefficients may only be keyed on measured cell-state quantities, and the model refuses a coefficient named after a device, a network or a country. The locked window stays available unchanged as its own comparison candidate; the state-dependent version is a new one whose parameters have to come from independent measurements before it can order any experiment.",
  },
  fi: {
    title: "Vasteikkuna, joka liikkuu mitatun tilan mukana",
    lead:
      "Lukitulla ikkunalla on kiinteä keskitaajuus ja leveys, joten se palauttaa saman vastetehon riippumatta siitä, missä tilassa solu on. Ehdokasikkuna ottaa keskitaajuutensa ja leveytensä mitatuista tilakoordinaateista, joten sama ajurispektri tuottaa eri vasteen kuormitetussa ja tyhjentyneessä solussa. Molemmat arvioidaan samaa biologista ajuria vastaan.",
    axisF: "Taajuus (Hz)",
    axisW: "Ikkunan paino",
    locked: "Lukittu vertailuikkuna",
    driver: "Biologisen ajurin spektri",
    states: {
      "loaded-store": "Kuormitettu varasto",
      reference: "Vertailutila",
      "depleted-store": "Tyhjentynyt varasto",
    } as Record<string, string>,
    tableTitle: "Vasteteho samaa ajuria vastaan",
    colWindow: "Ikkuna",
    colCentre: "Keskitaajuus (Hz)",
    colSigma: "Leveys σ (Hz)",
    colPower: "R²",
    colRatio: "vs lukittu",
    note:
      "Sama ikkunalaki koskee kaikkia teknologioita: kertoimet saavat riippua vain mitatuista solutilan suureista, ja malli kieltäytyy kertoimesta, joka on nimetty laitteen, verkon tai maan mukaan. Lukittu ikkuna säilyy muuttumattomana omana vertailuehdokkaanaan; tilariippuvainen versio on uusi, ja sen parametrien on tultava riippumattomista mittauksista ennen kuin se voi asettaa kokeita järjestykseen.",
  },
};

const F = MODULOME_FIGURES.window;
const W = 700;
const ML = 44;
const MR = 14;
const TOP = 16;
const BOT = 182;
const H = 214;
const FREQS = F.frequenciesHz;
const F_MIN = FREQS[0];
const F_MAX = FREQS[FREQS.length - 1];
const MAX_DRIVER = Math.max(...F.driver.bins.map((bin) => bin.powerDensity));

const px = (f: number) => ML + ((f - F_MIN) / (F_MAX - F_MIN)) * (W - ML - MR);
const py = (v: number) => BOT - v * (BOT - TOP);

const CANDIDATE_COLOUR: Record<string, string> = {
  "loaded-store": "#EF4444",
  reference: "#3B82F6",
  "depleted-store": "#10B981",
};

function weightPath(weights: readonly number[]): string {
  return weights
    .map((v, i) => `${i ? "L" : "M"}${px(FREQS[i]).toFixed(1)},${py(v).toFixed(1)}`)
    .join("");
}

export function ModulomeStateWindow({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);

  return (
    <figure className="not-prose">
      <h4 className="text-sm font-semibold text-foreground mb-1">{d.title}</h4>
      <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.lead}</p>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[700px]" style={{ minWidth: 480 }} role="img" aria-label={d.title}>
          {F.driver.bins.map((bin) => {
            const width = (bin.bandwidthHz / (F_MAX - F_MIN)) * (W - ML - MR);
            const height = (bin.powerDensity / MAX_DRIVER) * (BOT - TOP) * 0.9;
            return (
              <rect
                key={bin.frequencyHz}
                x={px(bin.frequencyHz) - width / 2}
                y={BOT - height}
                width={Math.max(2, width - 1)}
                height={height}
                fill="var(--foreground-muted)"
                opacity={0.16}
              />
            );
          })}

          {[0, 0.5, 1].map((value) => (
            <g key={value}>
              <line x1={ML} x2={W - MR} y1={py(value)} y2={py(value)} stroke="var(--chart-grid)" />
              <text x={ML - 6} y={py(value) + 3} textAnchor="end" fontSize={9} fill="var(--foreground-muted)">
                {value.toFixed(1)}
              </text>
            </g>
          ))}

          <path d={weightPath(F.lockedWindow.weights)} fill="none" stroke="var(--foreground-muted)" strokeWidth={2} strokeDasharray="6 4" />
          {F.candidates.map((candidate) => (
            <path
              key={candidate.stateId}
              d={weightPath(candidate.weights)}
              fill="none"
              stroke={CANDIDATE_COLOUR[candidate.stateId] ?? "#3B82F6"}
              strokeWidth={2}
            />
          ))}

          <line x1={ML} x2={W - MR} y1={BOT} y2={BOT} stroke="var(--chart-axis)" />
          {[10, 20, 30, 40, 50].filter((f) => f >= F_MIN && f <= F_MAX).map((f) => (
            <text key={f} x={px(f)} y={BOT + 14} textAnchor="middle" fontSize={9} fill="var(--foreground-muted)">
              {f}
            </text>
          ))}
          <text x={(ML + W - MR) / 2} y={H - 4} textAnchor="middle" fontSize={10} fill="var(--foreground-muted)">
            {d.axisF}
          </text>
          <text x={12} y={(TOP + BOT) / 2} fontSize={10} fill="var(--foreground-muted)" transform={`rotate(-90 12 ${(TOP + BOT) / 2})`} textAnchor="middle">
            {d.axisW}
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-foreground-muted">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-0.5 w-5 border-t-2 border-dashed" style={{ borderColor: "var(--foreground-muted)" }} />
          {d.locked}
        </span>
        {F.candidates.map((candidate) => (
          <span key={candidate.stateId} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="inline-block h-0.5 w-5" style={{ background: CANDIDATE_COLOUR[candidate.stateId] }} />
            {d.states[candidate.stateId] ?? candidate.stateId}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-2.5 w-3.5" style={{ background: "var(--foreground-muted)", opacity: 0.3 }} />
          {d.driver}
        </span>
      </div>

      <p className="text-sm font-semibold text-foreground mt-6 mb-2">{d.tableTitle}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="text-left text-foreground-muted">
              <th className="py-1.5 pr-3 font-semibold">{d.colWindow}</th>
              <th className="py-1.5 pr-3 font-semibold">{d.colCentre}</th>
              <th className="py-1.5 pr-3 font-semibold">{d.colSigma}</th>
              <th className="py-1.5 pr-3 font-semibold">{d.colPower}</th>
              <th className="py-1.5 font-semibold">{d.colRatio}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-card-border">
              <td className="py-1.5 pr-3 text-foreground">{d.locked}</td>
              <td className="py-1.5 pr-3 font-mono-num text-foreground-muted">{F.lockedWindow.centreHz.toFixed(2)}</td>
              <td className="py-1.5 pr-3 font-mono-num text-foreground-muted">{F.lockedWindow.sigmaHz.toFixed(2)}</td>
              <td className="py-1.5 pr-3 font-mono-num text-foreground">{F.lockedWindow.responsePower.toFixed(3)}</td>
              <td className="py-1.5 font-mono-num text-foreground-muted">1.000</td>
            </tr>
            {F.candidates.map((candidate) => (
              <tr key={candidate.stateId} className="border-t border-card-border">
                <td className="py-1.5 pr-3 text-foreground">
                  <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full mr-2" style={{ background: CANDIDATE_COLOUR[candidate.stateId] }} />
                  {d.states[candidate.stateId] ?? candidate.stateId}
                </td>
                <td className="py-1.5 pr-3 font-mono-num text-foreground-muted">{candidate.centreHz.toFixed(2)}</td>
                <td className="py-1.5 pr-3 font-mono-num text-foreground-muted">{candidate.sigmaHz.toFixed(2)}</td>
                <td className="py-1.5 pr-3 font-mono-num text-foreground">{candidate.responsePower.toFixed(3)}</td>
                <td className="py-1.5 font-mono-num text-foreground-muted">{candidate.ratioToLocked.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figcaption className="text-xs text-foreground-muted mt-3 leading-relaxed max-w-3xl">{d.note}</figcaption>
    </figure>
  );
}
