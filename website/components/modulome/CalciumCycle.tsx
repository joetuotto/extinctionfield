"use client";

import { pickCopy } from "@/lib/i18n";
import { MODULOME_FIGURES } from "@/lib/modulome/stateModel";

const COPY = {
  en: {
    title: "The calcium cycle, and what each intervention removes",
    lead:
      "Channels, cytosol, store and mitochondria form one circulation. The model predicts three things separately: the first calcium response, the change in the store, and the later change in membrane currents. Blocking release from the store or reuptake into it removes the third while leaving the first.",
    compartments: {
      channel: "Membrane channels",
      cytosol: "Cytosolic Ca²⁺",
      store: "ER store",
      mito: "Mitochondria",
    },
    fluxes: { release: "RyR release", uptake: "SERCA reuptake", mcu: "MCU uptake" },
    traceTitle: "Cytosolic Ca²⁺ under the same exposure",
    seconds: "seconds",
    arms: {
      intact: "Intact",
      ryrBlocked: "Release blocked",
      sercaBlocked: "Reuptake blocked",
      mcuBlocked: "Mitochondrial uptake blocked",
    } as Record<string, string>,
    summaryTitle: "The three predictions, per arm",
    colArm: "Arm",
    colFirst: "First response",
    colStore: "Store change",
    colCycling: "Store cycling",
    colLate: "Late current change",
    storeTitle: "Same channel expression, different store load",
    colLoad: "ER load",
    note:
      "A change in membrane current is therefore readable as a consequence of intracellular regulation, not only as a direct action on the channel protein. The same channel expression level gives a different response in a different cell state.",
  },
  fi: {
    title: "Kalsiumkierto ja se, minkä kukin interventio poistaa",
    lead:
      "Kanavat, solulima, varasto ja mitokondriot muodostavat yhden kierron. Malli ennustaa kolme asiaa erikseen: ensimmäisen kalsiumvasteen, varaston muutoksen ja myöhemmän kalvovirtojen muutoksen. Varastosta vapautumisen tai siihen takaisinoton esto poistaa kolmannen ja jättää ensimmäisen.",
    compartments: {
      channel: "Kalvokanavat",
      cytosol: "Soluliman Ca²⁺",
      store: "ER-varasto",
      mito: "Mitokondriot",
    },
    fluxes: { release: "RyR-vapautus", uptake: "SERCA-takaisinotto", mcu: "MCU-otto" },
    traceTitle: "Soluliman Ca²⁺ samassa altistuksessa",
    seconds: "sekuntia",
    arms: {
      intact: "Ehjä",
      ryrBlocked: "Vapautus estetty",
      sercaBlocked: "Takaisinotto estetty",
      mcuBlocked: "Mitokondrion otto estetty",
    } as Record<string, string>,
    summaryTitle: "Kolme ennustetta koehaaroittain",
    colArm: "Koehaara",
    colFirst: "Ensivaste",
    colStore: "Varaston muutos",
    colCycling: "Varastokierto",
    colLate: "Myöhäinen virtamuutos",
    storeTitle: "Sama kanavien ilmentyminen, eri varastokuorma",
    colLoad: "ER-kuorma",
    note:
      "Kalvovirran muutos on siis luettavissa solunsisäisen säätelyn seuraukseksi eikä vain suoraksi vaikutukseksi kanavaproteiiniin. Sama kanavien ilmentymistaso antaa eri vasteen eri solutilassa.",
  },
};

const F = MODULOME_FIGURES.calcium;
const ARM_ORDER = ["intact", "ryrBlocked", "sercaBlocked", "mcuBlocked"] as const;
const ARM_COLOUR: Record<string, string> = {
  intact: "#3B82F6",
  ryrBlocked: "#EF4444",
  sercaBlocked: "#F59E0B",
  mcuBlocked: "#8B5CF6",
};

const W = 700;
const ML = 46;
const MR = 12;
const TOP = 14;
const BOT = 168;
const H = 196;
const TIMES = F.timesSeconds;
const MAX_C = Math.max(
  ...ARM_ORDER.flatMap((arm) => [...F.arms[arm].cytosol]),
);
const px = (i: number) => ML + (i / (TIMES.length - 1)) * (W - ML - MR);
const py = (v: number) => BOT - (v / (MAX_C * 1.1)) * (BOT - TOP);

function tracePath(values: readonly number[]): string {
  return values
    .map((v, i) => `${i ? "L" : "M"}${px(i).toFixed(1)},${py(v).toFixed(1)}`)
    .join("");
}

function Box({
  x,
  y,
  label,
  colour,
}: {
  x: number;
  y: number;
  label: string;
  colour: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={132} height={34} rx={6} fill={colour} opacity={0.16} stroke={colour} />
      <text
        x={x + 66}
        y={y + 21}
        textAnchor="middle"
        fontSize={11}
        fontWeight={600}
        fill="var(--foreground)"
      >
        {label}
      </text>
    </g>
  );
}

export function ModulomeCalciumCycle({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const exposureSeconds = F.exposureSteps * F.dtSeconds;

  return (
    <figure className="not-prose">
      <h4 className="text-sm font-semibold text-foreground mb-1">{d.title}</h4>
      <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.lead}</p>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 700 148" className="w-full max-w-[700px]" style={{ minWidth: 480 }} role="img" aria-label={d.title}>
          <Box x={14} y={56} label={d.compartments.channel} colour="#F59E0B" />
          <Box x={196} y={56} label={d.compartments.cytosol} colour="#3B82F6" />
          <Box x={378} y={14} label={d.compartments.store} colour="#EF4444" />
          <Box x={378} y={98} label={d.compartments.mito} colour="#8B5CF6" />

          <line x1={146} x2={196} y1={73} y2={73} stroke="var(--chart-axis)" strokeWidth={1.5} markerEnd="url(#arrow-modulome-ca)" />
          <path d="M328,66 L378,36" stroke="var(--chart-axis)" strokeWidth={1.5} fill="none" markerEnd="url(#arrow-modulome-ca)" />
          <path d="M378,46 L328,76" stroke="var(--chart-axis)" strokeWidth={1.5} fill="none" markerEnd="url(#arrow-modulome-ca)" />
          <path d="M328,80 L378,112" stroke="var(--chart-axis)" strokeWidth={1.5} fill="none" markerEnd="url(#arrow-modulome-ca)" />
          <text x={352} y={34} textAnchor="middle" fontSize={9} fill="var(--foreground-muted)">
            {d.fluxes.uptake}
          </text>
          <text x={352} y={90} textAnchor="middle" fontSize={9} fill="var(--foreground-muted)">
            {d.fluxes.release}
          </text>
          <text x={352} y={128} textAnchor="middle" fontSize={9} fill="var(--foreground-muted)">
            {d.fluxes.mcu}
          </text>
          <defs>
            <marker id="arrow-modulome-ca" markerWidth={7} markerHeight={7} refX={6} refY={3} orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="var(--chart-axis)" />
            </marker>
          </defs>
        </svg>
      </div>

      <p className="text-sm font-semibold text-foreground mt-6 mb-2">{d.traceTitle}</p>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[700px]" style={{ minWidth: 480 }} role="img" aria-label={d.traceTitle}>
          <rect x={px(0)} y={TOP} width={px(F.exposureSteps) - px(0)} height={BOT - TOP} fill="var(--accent)" opacity={0.07} />
          {[0, 0.5, 1.0, 1.5].filter((value) => value <= MAX_C * 1.1).map((value) => (
            <g key={value}>
              <line x1={ML} x2={W - MR} y1={py(value)} y2={py(value)} stroke="var(--chart-grid)" />
              <text x={ML - 6} y={py(value) + 3} textAnchor="end" fontSize={9} fill="var(--foreground-muted)">
                {value.toFixed(1)}
              </text>
            </g>
          ))}
          <line x1={ML} x2={W - MR} y1={BOT} y2={BOT} stroke="var(--chart-axis)" />
          {ARM_ORDER.map((arm) => (
            <path key={arm} d={tracePath(F.arms[arm].cytosol)} fill="none" stroke={ARM_COLOUR[arm]} strokeWidth={2} />
          ))}
          <text x={ML} y={H - 6} fontSize={9} fill="var(--foreground-muted)">
            0 {d.seconds}
          </text>
          <text x={px(F.exposureSteps)} y={H - 6} textAnchor="middle" fontSize={9} fill="var(--foreground-muted)">
            {exposureSeconds.toFixed(0)}
          </text>
          <text x={W - MR} y={H - 6} textAnchor="end" fontSize={9} fill="var(--foreground-muted)">
            {TIMES[TIMES.length - 1].toFixed(0)}
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-foreground-muted">
        {ARM_ORDER.map((arm) => (
          <span key={arm} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="inline-block h-0.5 w-5" style={{ background: ARM_COLOUR[arm] }} />
            {d.arms[arm]}
          </span>
        ))}
      </div>

      <p className="text-sm font-semibold text-foreground mt-6 mb-2">{d.summaryTitle}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="text-left text-foreground-muted">
              <th className="py-1.5 pr-3 font-semibold">{d.colArm}</th>
              <th className="py-1.5 pr-3 font-semibold">{d.colFirst}</th>
              <th className="py-1.5 pr-3 font-semibold">{d.colStore}</th>
              <th className="py-1.5 pr-3 font-semibold">{d.colCycling}</th>
              <th className="py-1.5 font-semibold">{d.colLate}</th>
            </tr>
          </thead>
          <tbody>
            {ARM_ORDER.map((arm) => {
              const s = F.arms[arm].summary;
              return (
                <tr key={arm} className="border-t border-card-border">
                  <td className="py-1.5 pr-3 text-foreground">
                    <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full mr-2" style={{ background: ARM_COLOUR[arm] }} />
                    {d.arms[arm]}
                  </td>
                  <td className="py-1.5 pr-3 font-mono-num text-foreground-muted">{s.firstCalciumResponse.toFixed(3)}</td>
                  <td className="py-1.5 pr-3 font-mono-num text-foreground-muted">{s.storeChange.toFixed(3)}</td>
                  <td className="py-1.5 pr-3 font-mono-num text-foreground-muted">{s.cumulativeStoreCycling.toFixed(3)}</td>
                  <td className="py-1.5 font-mono-num text-foreground">{s.lateMembraneCurrentChange.toFixed(3)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-sm font-semibold text-foreground mt-6 mb-2">{d.storeTitle}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="text-left text-foreground-muted">
              <th className="py-1.5 pr-3 font-semibold">{d.colLoad}</th>
              <th className="py-1.5 pr-3 font-semibold">{d.colFirst}</th>
              <th className="py-1.5 font-semibold">{d.colLate}</th>
            </tr>
          </thead>
          <tbody>
            {F.sameChannelDifferentStore.map((row) => (
              <tr key={row.label} className="border-t border-card-border">
                <td className="py-1.5 pr-3 font-mono-num text-foreground">{row.erLoad.toFixed(1)}</td>
                <td className="py-1.5 pr-3 font-mono-num text-foreground-muted">{row.firstCalciumResponse.toFixed(3)}</td>
                <td className="py-1.5 font-mono-num text-foreground-muted">{row.lateMembraneCurrentChange.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figcaption className="text-xs text-foreground-muted mt-3 leading-relaxed max-w-3xl">{d.note}</figcaption>
    </figure>
  );
}
