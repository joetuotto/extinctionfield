"use client";

import { pickCopy } from "@/lib/i18n";
import { MODULOME_FIGURES } from "@/lib/modulome/stateModel";

const COPY = {
  en: {
    title: "Readiness, repair and damage move apart",
    lead:
      "One exposure schedule, three quantities. The receptor state s gates what the next exposure transduces, the repair capacity A processes the load, and the damage load D is what remains at the moment of measurement. The probe response is what a challenge experiment actually reads, and it falls for more than one reason.",
    exposureOn: "Exposure",
    recovery: "Recovery",
    interval: "Interval",
    readiness: "Receptor state s",
    repair: "Repair capacity A",
    damage: "Damage load D",
    probe: "Probe response",
    tableTitle: "Four cells, two of them indistinguishable by the probe alone",
    colState: "Cell",
    colS: "s",
    colA: "A",
    colD: "D",
    colProbe: "Probe response",
    states: {
      baseline: "Baseline",
      repaired: "Repair strengthened",
      desensitised: "Receptor weakened",
      "baseline-shifted": "Baseline already moved",
    } as Record<string, string>,
    note:
      "The middle two rows return the same probe response through different routes. Absolute baseline levels, recovery curves and challenge tolerance at a matched baseline separate them; the response difference alone does not.",
    shape: "Curve shapes come from the registered kinetics",
  },
  fi: {
    title: "Vastaanotin, korjaus ja vaurio erkanevat",
    lead:
      "Yksi altistusaikataulu, kolme suuretta. Vastaanottimen tila s säätää sitä, mitä seuraava altistus transdusoi, korjauskapasiteetti A käsittelee kuorman, ja vauriokuorma D on se, mikä on jäljellä mittaushetkellä. Koevaste on se, minkä haastekoe todella lukee, ja se laskee useammasta kuin yhdestä syystä.",
    exposureOn: "Altistus",
    recovery: "Palautuminen",
    interval: "Jakso",
    readiness: "Vastaanottimen tila s",
    repair: "Korjauskapasiteetti A",
    damage: "Vauriokuorma D",
    probe: "Koevaste",
    tableTitle: "Neljä solua, joista kahta ei erota pelkällä koevasteella",
    colState: "Solu",
    colS: "s",
    colA: "A",
    colD: "D",
    colProbe: "Koevaste",
    states: {
      baseline: "Lähtötila",
      repaired: "Korjaus vahvistunut",
      desensitised: "Vastaanotin heikentynyt",
      "baseline-shifted": "Lähtötaso jo siirtynyt",
    } as Record<string, string>,
    note:
      "Keskimmäiset rivit palauttavat saman koevasteen eri reittiä. Absoluuttiset lähtötasot, palautumiskäyrät ja haastetoleranssi vakioidulla lähtötasolla erottavat ne; pelkkä vaste-ero ei erota.",
    shape: "Käyrien muoto tulee rekisteröidyistä kinetiikkaparametreista",
  },
};

const F = MODULOME_FIGURES.stateTriad;
const W = 700;
const ML = 46;
const MR = 12;
const TOP = 18;
const BOT = 196;
const H = 232;
const N = F.series.receptorReadiness.length;
const MAX_D = Math.max(...F.series.damageLoad, 1);

const px = (i: number) => ML + (i / (N - 1)) * (W - ML - MR);
const py = (v: number) => BOT - (v / 1.2) * (BOT - TOP);
const pyD = (v: number) => BOT - (v / (MAX_D * 1.15)) * (BOT - TOP);

function path(values: readonly number[], scale: (v: number) => number): string {
  return values
    .map((v, i) => `${i ? "L" : "M"}${px(i).toFixed(1)},${scale(v).toFixed(1)}`)
    .join("");
}

const SERIES = [
  { key: "readiness", values: F.series.receptorReadiness, colour: "#F59E0B", scale: py },
  { key: "repair", values: F.series.repairCapacity, colour: "#10B981", scale: py },
  { key: "damage", values: F.series.damageLoad, colour: "#EF4444", scale: pyD },
  { key: "probe", values: F.series.probeResponse, colour: "#3B82F6", scale: py, dashed: true },
] as const;

export function ModulomeStateTriad({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const exposureEnd = F.exposureSchedule.filter((value) => value > 0).length;

  return (
    <figure className="not-prose">
      <h4 className="text-sm font-semibold text-foreground mb-1">{d.title}</h4>
      <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.lead}</p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-[700px]"
          style={{ minWidth: 480 }}
          role="img"
          aria-label={d.title}
        >
          <rect
            x={px(0)}
            y={TOP}
            width={px(exposureEnd) - px(0)}
            height={BOT - TOP}
            fill="var(--accent)"
            opacity={0.07}
          />
          <text x={px(0) + 6} y={TOP + 12} fontSize={10} fill="var(--foreground-muted)">
            {d.exposureOn}
          </text>
          <text x={px(exposureEnd) + 6} y={TOP + 12} fontSize={10} fill="var(--foreground-muted)">
            {d.recovery}
          </text>

          {[0, 0.25, 0.5, 0.75, 1.0].map((value) => (
            <g key={value}>
              <line
                x1={ML}
                x2={W - MR}
                y1={py(value)}
                y2={py(value)}
                stroke="var(--chart-grid)"
                strokeWidth={1}
              />
              <text
                x={ML - 6}
                y={py(value) + 3}
                textAnchor="end"
                fontSize={9}
                fill="var(--foreground-muted)"
              >
                {value.toFixed(2)}
              </text>
            </g>
          ))}
          <line x1={ML} x2={W - MR} y1={BOT} y2={BOT} stroke="var(--chart-axis)" strokeWidth={1} />

          {SERIES.map((series) => (
            <path
              key={series.key}
              d={path(series.values, series.scale)}
              fill="none"
              stroke={series.colour}
              strokeWidth={2}
              strokeDasharray={"dashed" in series && series.dashed ? "5 3" : undefined}
            />
          ))}

          <text x={ML} y={H - 6} fontSize={9} fill="var(--foreground-muted)">
            {d.interval} 0
          </text>
          <text x={W - MR} y={H - 6} textAnchor="end" fontSize={9} fill="var(--foreground-muted)">
            {d.interval} {N - 1}
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-foreground-muted">
        {SERIES.map((series) => (
          <span key={series.key} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block h-0.5 w-5"
              style={{ background: series.colour }}
            />
            {d[series.key as "readiness" | "repair" | "damage" | "probe"]}
          </span>
        ))}
      </div>

      <p className="text-sm font-semibold text-foreground mt-6 mb-2">{d.tableTitle}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="text-left text-foreground-muted">
              <th className="py-1.5 pr-3 font-semibold">{d.colState}</th>
              <th className="py-1.5 pr-3 font-semibold font-mono-num">{d.colS}</th>
              <th className="py-1.5 pr-3 font-semibold font-mono-num">{d.colA}</th>
              <th className="py-1.5 pr-3 font-semibold font-mono-num">{d.colD}</th>
              <th className="py-1.5 font-semibold">{d.colProbe}</th>
            </tr>
          </thead>
          <tbody>
            {F.sameResponseDifferentState.map((row) => (
              <tr key={row.stateId} className="border-t border-card-border align-top">
                <td className="py-1.5 pr-3 text-foreground">
                  {d.states[row.stateId] ?? row.stateId}
                </td>
                <td className="py-1.5 pr-3 font-mono-num text-foreground-muted">
                  {row.receptorReadiness.toFixed(3)}
                </td>
                <td className="py-1.5 pr-3 font-mono-num text-foreground-muted">
                  {row.repairCapacity.toFixed(3)}
                </td>
                <td className="py-1.5 pr-3 font-mono-num text-foreground-muted">
                  {row.damageLoad.toFixed(3)}
                </td>
                <td className="py-1.5 font-mono-num text-foreground">
                  {row.probeResponse.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figcaption className="text-xs text-foreground-muted mt-3 leading-relaxed max-w-3xl">
        {d.note} <span className="opacity-70">{d.shape} ({F.parameterIds.join(", ")}).</span>
      </figcaption>
    </figure>
  );
}
