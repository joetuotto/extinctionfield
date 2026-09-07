"use client";

import { pickCopy } from "@/lib/i18n";
import { MODULOME_FIGURES } from "@/lib/modulome/stateModel";

const COPY = {
  en: {
    title: "Gain against recovery, and the slowing that precedes the crossing",
    lead:
      "With x a barrier disturbance and y a hormonal disturbance, the loop is stable exactly while the round-trip gain stays below the product of the two recovery rates. Along a chronic-exposure axis that raises the gains and lowers the recovery rates, the two curves cross. Before they do, recovery slows sharply.",
    gain: "Mutual gain b·d",
    recovery: "Recovery product r_x·r_y",
    axisChronic: "Chronic-exposure axis",
    axisRecovery: "Slowest recovery time",
    crossing: "Stability boundary",
    stable: "Stable",
    unstable: "Unstable",
    equations: "ẋ = a·u + b·y − r_x·x    ẏ = c·u + d·x − r_y·y    stable while b·d < r_x·r_y",
    note:
      "This gives a specific new target: does chronic exposure move the ratio of gain to recovery toward the boundary? Near the boundary the slowest recovery time diverges, so a slowdown appears before any large functional change and can be looked for in existing time series.",
    irreversible: "Positive feedback alone does not settle irreversibility",
  },
  fi: {
    title: "Vahvistus vastaan palautuminen, ja hidastuminen ennen ylitystä",
    lead:
      "Kun x on estehäiriö ja y hormonaalinen häiriö, silmukka on vakaa täsmälleen niin kauan kuin kiertovahvistus pysyy alle kahden palautumisnopeuden tulon. Kroonisen altistuksen akselilla, joka nostaa vahvistuksia ja laskee palautumisnopeuksia, käyrät leikkaavat. Ennen sitä palautuminen hidastuu jyrkästi.",
    gain: "Keskinäinen vahvistus b·d",
    recovery: "Palautumisen tulo r_x·r_y",
    axisChronic: "Kroonisen altistuksen akseli",
    axisRecovery: "Hitain palautumisaika",
    crossing: "Vakausraja",
    stable: "Vakaa",
    unstable: "Epävakaa",
    equations: "ẋ = a·u + b·y − r_x·x    ẏ = c·u + d·x − r_y·y    vakaa kun b·d < r_x·r_y",
    note:
      "Tämä antaa täsmällisen uuden tutkimuskohteen: siirtääkö krooninen altistus vahvistuksen ja palautumisen suhdetta kohti rajaa? Lähellä rajaa hitain palautumisaika kasvaa rajatta, joten hidastuminen ilmenee ennen suurta toiminnallista muutosta ja sitä voi etsiä olemassa olevista aikasarjoista.",
    irreversible: "Pelkkä positiivinen palaute ei ratkaise peruuttamattomuutta",
  },
};

const F = MODULOME_FIGURES.feedback;
const W = 700;
const ML = 52;
const MR = 16;
const P1_TOP = 20;
const P1_BOT = 150;
const P2_TOP = 186;
const P2_BOT = 292;
const H = 322;
const N = F.series.length;
const MAX_PRODUCT = Math.max(...F.series.map((s) => Math.max(s.mutualGainProduct, s.recoveryProduct))) * 1.12;
const RECOVERY_VALUES = F.series.map((s) => s.slowestRecoveryTime ?? 0);
const MAX_RECOVERY = Math.max(...RECOVERY_VALUES) * 1.12;

const px = (i: number) => ML + (i / (N - 1)) * (W - ML - MR);
const py1 = (v: number) => P1_BOT - (v / MAX_PRODUCT) * (P1_BOT - P1_TOP);
const py2 = (v: number) => P2_BOT - (v / MAX_RECOVERY) * (P2_BOT - P2_TOP);

function line(values: number[], scale: (v: number) => number): string {
  return values.map((v, i) => `${i ? "L" : "M"}${px(i).toFixed(1)},${scale(v).toFixed(1)}`).join("");
}

const FIRST_UNSTABLE = F.series.findIndex((item) => !item.isStable);

export function ModulomeFeedbackStability({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const stableCount = FIRST_UNSTABLE < 0 ? N : FIRST_UNSTABLE;

  return (
    <figure className="not-prose">
      <h4 className="text-sm font-semibold text-foreground mb-1">{d.title}</h4>
      <p className="text-sm text-foreground-muted leading-relaxed mb-3 max-w-3xl">{d.lead}</p>
      <p className="font-mono text-xs text-foreground-muted mb-4">{d.equations}</p>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[700px]" style={{ minWidth: 480 }} role="img" aria-label={d.title}>
          <rect x={ML} y={P1_TOP} width={px(stableCount - 1) - ML} height={P1_BOT - P1_TOP} fill="#10B981" opacity={0.07} />
          <rect x={px(stableCount - 1)} y={P1_TOP} width={W - MR - px(stableCount - 1)} height={P1_BOT - P1_TOP} fill="#EF4444" opacity={0.07} />
          <text x={ML + 6} y={P1_TOP + 12} fontSize={10} fill="var(--foreground-muted)">
            {d.stable}
          </text>
          <text x={W - MR - 6} y={P1_TOP + 12} textAnchor="end" fontSize={10} fill="var(--foreground-muted)">
            {d.unstable}
          </text>

          <line x1={ML} x2={W - MR} y1={P1_BOT} y2={P1_BOT} stroke="var(--chart-axis)" />
          <path d={line(F.series.map((s) => s.mutualGainProduct), py1)} fill="none" stroke="#EF4444" strokeWidth={2.5} />
          <path d={line(F.series.map((s) => s.recoveryProduct), py1)} fill="none" stroke="#10B981" strokeWidth={2.5} />
          {FIRST_UNSTABLE > 0 && (
            <line x1={px(stableCount - 1)} x2={px(stableCount - 1)} y1={P1_TOP} y2={P1_BOT} stroke="var(--foreground-muted)" strokeDasharray="4 3" />
          )}
          <text x={ML - 6} y={py1(0) + 3} textAnchor="end" fontSize={9} fill="var(--foreground-muted)">
            0
          </text>
          <text x={ML - 6} y={py1(MAX_PRODUCT * 0.8) + 3} textAnchor="end" fontSize={9} fill="var(--foreground-muted)">
            {(MAX_PRODUCT * 0.8).toFixed(2)}
          </text>

          <text x={ML} y={P2_TOP - 10} fontSize={10} fill="var(--foreground-muted)">
            {d.axisRecovery}
          </text>
          <line x1={ML} x2={W - MR} y1={P2_BOT} y2={P2_BOT} stroke="var(--chart-axis)" />
          {F.series.map((item, i) => {
            const value = item.slowestRecoveryTime;
            if (value === null) return null;
            const barWidth = ((W - ML - MR) / N) * 0.6;
            return (
              <rect
                key={i}
                x={px(i) - barWidth / 2}
                y={py2(value)}
                width={barWidth}
                height={P2_BOT - py2(value)}
                fill="#3B82F6"
                opacity={0.75}
              />
            );
          })}
          <text x={ML - 6} y={py2(MAX_RECOVERY * 0.9) + 3} textAnchor="end" fontSize={9} fill="var(--foreground-muted)">
            {(MAX_RECOVERY * 0.9).toFixed(0)}
          </text>
          <text x={(ML + W - MR) / 2} y={H - 6} textAnchor="middle" fontSize={10} fill="var(--foreground-muted)">
            {d.axisChronic}
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-foreground-muted">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-0.5 w-5" style={{ background: "#EF4444" }} />
          {d.gain}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-0.5 w-5" style={{ background: "#10B981" }} />
          {d.recovery}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-2.5 w-3.5 rounded-sm" style={{ background: "#3B82F6" }} />
          {d.axisRecovery}
        </span>
      </div>

      <figcaption className="text-xs text-foreground-muted mt-3 leading-relaxed max-w-3xl">
        {d.note} <strong className="font-semibold text-foreground">{d.irreversible}.</strong>{" "}
        {F.irreversibilityNote}
      </figcaption>
    </figure>
  );
}
