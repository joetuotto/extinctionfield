"use client";

import { pickCopy } from "@/lib/i18n";
import { MODULOME_FIGURES } from "@/lib/modulome/stateModel";

const COPY = {
  en: {
    title: "Same total dose, different order and delay",
    lead:
      "The transition to the fully reduced flavin needs two photons in sequence, and the intermediate decays while the light is away. Both curves below deliver exactly the same total photon dose. Only the order of the wavelengths and the delay between them differ.",
    forward: "Blue first, then green",
    reverse: "Green first, then blue",
    axisDelay: "Delay between the two episodes (s)",
    axisYield: "Fraction reaching the fully reduced state",
    dose: "Total dose held constant",
    subtypes: "Registered subtypes",
    note:
      "Because the second step acts only on what the first step produced, a light history is an ordered input, not a summed one. Parameters are registered per cryptochrome, so a robin CRY1 parameterisation is never applied to a human protein.",
  },
  fi: {
    title: "Sama kokonaisannos, eri järjestys ja viive",
    lead:
      "Siirtymä täysin pelkistyneeseen flaviiniin vaatii kaksi fotonia peräkkäin, ja välitila purkautuu valon poissa ollessa. Molemmat käyrät tuottavat täsmälleen saman kokonaisfotoniannoksen. Vain aallonpituuksien järjestys ja niiden välinen viive eroavat.",
    forward: "Ensin sininen, sitten vihreä",
    reverse: "Ensin vihreä, sitten sininen",
    axisDelay: "Viive episodien välillä (s)",
    axisYield: "Täysin pelkistyneeseen tilaan päätyvä osuus",
    dose: "Kokonaisannos pidetään vakiona",
    subtypes: "Rekisteröidyt alatyypit",
    note:
      "Koska toinen askel vaikuttaa vain siihen, minkä ensimmäinen tuotti, valohistoria on järjestetty syöte eikä summattu. Parametrit rekisteröidään kryptokromikohtaisesti, joten punarinnan CRY1:n parametrisointia ei koskaan sovelleta ihmisen proteiiniin.",
  },
};

const F = MODULOME_FIGURES.photonSequence;
const W = 700;
const ML = 52;
const MR = 14;
const TOP = 16;
const BOT = 178;
const H = 212;
const DELAYS = F.delaysSeconds;
const MAX_Y = Math.max(...F.blueThenGreen, ...F.greenThenBlue) * 1.15;

const px = (i: number) => ML + (i / (DELAYS.length - 1)) * (W - ML - MR);
const py = (v: number) => BOT - (v / MAX_Y) * (BOT - TOP);

function line(values: readonly number[]): string {
  return values.map((v, i) => `${i ? "L" : "M"}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join("");
}

export function ModulomePhotonSequence({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);

  return (
    <figure className="not-prose">
      <h4 className="text-sm font-semibold text-foreground mb-1">{d.title}</h4>
      <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.lead}</p>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[700px]" style={{ minWidth: 480 }} role="img" aria-label={d.title}>
          {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
            const value = MAX_Y * fraction;
            return (
              <g key={fraction}>
                <line x1={ML} x2={W - MR} y1={py(value)} y2={py(value)} stroke="var(--chart-grid)" />
                <text x={ML - 6} y={py(value) + 3} textAnchor="end" fontSize={9} fill="var(--foreground-muted)">
                  {value.toFixed(2)}
                </text>
              </g>
            );
          })}
          <line x1={ML} x2={W - MR} y1={BOT} y2={BOT} stroke="var(--chart-axis)" />

          <path d={line(F.blueThenGreen)} fill="none" stroke="#3B82F6" strokeWidth={2.5} />
          <path d={line(F.greenThenBlue)} fill="none" stroke="#10B981" strokeWidth={2.5} />

          {[0, 2, 4, 6, 8].map((seconds) => {
            const index = DELAYS.findIndex((value) => value >= seconds);
            if (index < 0) return null;
            return (
              <text key={seconds} x={px(index)} y={BOT + 14} textAnchor="middle" fontSize={9} fill="var(--foreground-muted)">
                {seconds}
              </text>
            );
          })}
          <text x={(ML + W - MR) / 2} y={H - 20} textAnchor="middle" fontSize={10} fill="var(--foreground-muted)">
            {d.axisDelay}
          </text>
          <text x={14} y={(TOP + BOT) / 2} fontSize={10} fill="var(--foreground-muted)" transform={`rotate(-90 14 ${(TOP + BOT) / 2})`} textAnchor="middle">
            {d.axisYield}
          </text>
          <text x={W - MR} y={H - 4} textAnchor="end" fontSize={9} fill="var(--foreground-muted)">
            {d.dose}: {F.totalDose.toFixed(1)}
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-foreground-muted">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-0.5 w-5" style={{ background: "#3B82F6" }} />
          {d.forward}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-0.5 w-5" style={{ background: "#10B981" }} />
          {d.reverse}
        </span>
        <span className="font-mono text-[0.7rem]">
          {d.subtypes}: {F.registeredSubtypes.join(", ")}
        </span>
      </div>

      <figcaption className="text-xs text-foreground-muted mt-3 leading-relaxed max-w-3xl">{d.note}</figcaption>
    </figure>
  );
}
