"use client";

import { pickCopy } from "@/lib/i18n";
import { MODULOME_FIGURES } from "@/lib/modulome/stateModel";

const COPY = {
  en: {
    title: "Alive, motile, misdirected",
    lead:
      "Direction and speed are separate outputs. Silencing the sensing channel removes orientation in the field while leaving migration speed untouched, and the polarity arm changes direction without killing the cell. A damage measure never reaches this endpoint.",
    directedness: "Directedness in the field",
    speed: "Migration speed",
    atField: "at",
    arms: {
      intact: "Intact",
      kcnj15Silenced: "KCNJ15 silenced",
      polyamineDepleted: "Polyamines depleted",
      pi3kGammaLoss: "PI3Kγ lost",
      ptenLoss: "PTEN lost",
    } as Record<string, string>,
    note:
      "The magnitudes here are the local direct-current fields used in the source experiments. Which of BERM's own exposures reach a field that perturbs the same machinery is a separate calculation, and the model keeps the field magnitude explicit so that question stays visible.",
  },
  fi: {
    title: "Elossa, liikkuva, väärään suuntaan",
    lead:
      "Suunta ja nopeus ovat erillisiä ulostuloja. Aistivan kanavan vaimentaminen poistaa suuntautumisen kentässä koskematta liikenopeuteen, ja polariteettihaara muuttaa suuntaa tappamatta solua. Vauriomittari ei koskaan yllä tähän päätepisteeseen.",
    directedness: "Suuntautuneisuus kentässä",
    speed: "Liikenopeus",
    atField: "kentässä",
    arms: {
      intact: "Ehjä",
      kcnj15Silenced: "KCNJ15 vaimennettu",
      polyamineDepleted: "Polyamiinit poistettu",
      pi3kGammaLoss: "PI3Kγ poistettu",
      ptenLoss: "PTEN poistettu",
    } as Record<string, string>,
    note:
      "Tässä esitetyt suuruudet ovat lähdekokeissa käytettyjä paikallisia tasakenttiä. Se, missä BERM:n omissa altistuksissa saavutetaan kenttä, joka häiritsee samaa koneistoa, on erillinen laskenta, ja malli pitää kenttävoimakkuuden näkyvissä juuri siksi.",
  },
};

const F = MODULOME_FIGURES.polarity;
const ARM_ORDER = ["intact", "kcnj15Silenced", "polyamineDepleted", "pi3kGammaLoss", "ptenLoss"] as const;
const SCREEN_INDEX = F.fieldsMvPerMm.indexOf(F.screenFieldMvPerMm);
const W = 700;
const ML = 150;
const MR = 60;
const TOP = 22;
const ROW = 34;
const H = TOP + ARM_ORDER.length * ROW + 22;
const BAR_W = W - ML - MR;

export function ModulomePolarityResponse({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const index = SCREEN_INDEX >= 0 ? SCREEN_INDEX : F.fieldsMvPerMm.length - 1;

  return (
    <figure className="not-prose">
      <h4 className="text-sm font-semibold text-foreground mb-1">{d.title}</h4>
      <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.lead}</p>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[700px]" style={{ minWidth: 480 }} role="img" aria-label={d.title}>
          <text x={ML} y={12} fontSize={10} fill="var(--foreground-muted)">
            {d.atField} {F.screenFieldMvPerMm} mV/mm
          </text>
          {ARM_ORDER.map((arm, row) => {
            const y = TOP + row * ROW;
            const directedness = F.arms[arm].directedness[index];
            const speed = F.arms[arm].migrationSpeed[index];
            return (
              <g key={arm}>
                <text x={ML - 10} y={y + 13} textAnchor="end" fontSize={11} fill="var(--foreground)">
                  {d.arms[arm]}
                </text>
                <rect x={ML} y={y} width={Math.max(1, directedness * BAR_W)} height={10} rx={2} fill="#3B82F6" />
                <rect x={ML} y={y + 13} width={Math.max(1, speed * BAR_W)} height={10} rx={2} fill="#94A3B8" />
                <text x={ML + Math.max(1, directedness * BAR_W) + 6} y={y + 9} fontSize={9} fill="var(--foreground-muted)">
                  {directedness.toFixed(2)}
                </text>
                <text x={ML + Math.max(1, speed * BAR_W) + 6} y={y + 22} fontSize={9} fill="var(--foreground-muted)">
                  {speed.toFixed(2)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-foreground-muted">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-2.5 w-4 rounded-sm" style={{ background: "#3B82F6" }} />
          {d.directedness}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-2.5 w-4 rounded-sm" style={{ background: "#94A3B8" }} />
          {d.speed}
        </span>
      </div>

      <figcaption className="text-xs text-foreground-muted mt-3 leading-relaxed max-w-3xl">{d.note}</figcaption>
    </figure>
  );
}
