"use client";

import { useState } from "react";

const t = {
  en: {
    title: "Feedback Loop: Urbanization ↔ EMF Density",
    desc: "TFR decline drives urbanization (rural-to-urban migration accelerates as rural communities shrink). Urbanization increases EMF exposure density (more towers, more devices per area). Higher density amplifies further TFR decline — a positive feedback loop. This diagnostic models the amplification strength.",
    diagnostic: "DIAGNOSTIC — does not affect base TFR predictions",
    country: "Country",
    year: "Year",
    baseTFR: "Base TFR",
    feedbackTFR: "With feedback",
    urbanFrac: "Urban fraction",
    densityMult: "Density multiplier",
    effect: "Feedback effect",
    note: "The feedback effect is small (< 1% of TFR through 2050) because urbanization rates change slowly. The mechanism matters more for long-run projections (2050+) and for countries already near maximum urbanization. South Korea is the strongest case because it starts with the lowest TFR and highest baseline urbanization.",
    sexRatioTitle: "Sex Ratio Shift",
    sexRatioDesc: "EMF-induced ROS selectively damages Y-chromosome-bearing sperm (smaller, less DNA repair capacity). This shifts the sex ratio at birth toward female. The shift is small but measurable at population scale.",
    baseline: "Baseline (no EMF)",
    predicted: "Predicted 2024+",
    shift: "Shift per unit exposure",
    sexNote: "The predicted shift (0.512 → 0.509) corresponds to ~3 fewer boys per 1000 births. Nordic countries already show ratios of 0.5105-0.5115, consistent with partial ROS-mediated shift. This prediction is testable: countries with highest cumulative EMF exposure should show the lowest male birth fractions.",
  },
  fi: {
    title: "Palautesilmukka: Kaupungistuminen ↔ EMF-tiheys",
    desc: "TFR:n lasku ajaa kaupungistumista (maaseudulta kaupunkeihin muutto kiihtyy maaseutuyhteisöjen pienentyessä). Kaupungistuminen lisää EMF-altistuksen tiheyttä (enemmän mastoja, enemmän laitteita per alue). Korkeampi tiheys vahvistaa edelleen TFR:n laskua — positiivinen palautesilmukka. Tämä diagnostiikka mallintaa vahvistuksen voimakkuuden.",
    diagnostic: "DIAGNOSTINEN — ei vaikuta perus-TFR-ennusteisiin",
    country: "Maa",
    year: "Vuosi",
    baseTFR: "Perus-TFR",
    feedbackTFR: "Palautteella",
    urbanFrac: "Kaupunkiosuus",
    densityMult: "Tiheyskerroin",
    effect: "Palautevaikutus",
    note: "Palautevaikutus on pieni (< 1 % TFR:stä vuoteen 2050). Mekanismi vaikuttaa enemmän pitkän aikavälin ennusteissa (2050+) ja maissa, jotka ovat jo lähellä maksimaalista kaupungistumista. Etelä-Korea on vahvin tapaus koska se alkaa matalimmalla TFR:llä ja korkeimmalla kaupungistumisasteella.",
    sexRatioTitle: "Sukupuolijakauman muutos",
    sexRatioDesc: "EMF:n aiheuttama ROS vahingoittaa valikoivasti Y-kromosomia kantavia siittiöitä (pienempiä, vähemmän DNA-korjauskapasiteettia). Tämä siirtää syntymien sukupuolijakaumaa naispuolisten suuntaan. Muutos on pieni mutta mitattavissa väestötasolla.",
    baseline: "Perustaso (ei EMF:aa)",
    predicted: "Ennustettu 2024+",
    shift: "Muutos per altistusyksikko",
    sexNote: "Ennustettu muutos (0,512 → 0,509) vastaa ~3 poikaa vähemmän per 1000 syntymää. Pohjoismaat näyttävät jo suhdelukuja 0,5105–0,5115, yhdenmukainen osittaisen ROS-välitteisen muutoksen kanssa. Tämä ennuste on testattavissa: maissa joissa on korkein kumulatiivinen EMF-altistus tulisi olla matalin poikien osuus.",
  },
} as const;

const FEEDBACK_DATA = [
  { year: 2024, baseTFR: 0.655, feedbackTFR: 0.655, urbanFrac: 0.820, densityMult: 1.0000, effect: 0.0000 },
  { year: 2027, baseTFR: 0.597, feedbackTFR: 0.596, urbanFrac: 0.821, densityMult: 1.0003, effect: 0.0002 },
  { year: 2030, baseTFR: 0.542, feedbackTFR: 0.541, urbanFrac: 0.822, densityMult: 1.0008, effect: 0.0004 },
  { year: 2035, baseTFR: 0.459, feedbackTFR: 0.457, urbanFrac: 0.825, densityMult: 1.0025, effect: 0.0011 },
  { year: 2040, baseTFR: 0.390, feedbackTFR: 0.388, urbanFrac: 0.829, densityMult: 1.0046, effect: 0.0018 },
  { year: 2045, baseTFR: 0.320, feedbackTFR: 0.318, urbanFrac: 0.836, densityMult: 1.0080, effect: 0.0025 },
  { year: 2050, baseTFR: 0.259, feedbackTFR: 0.256, urbanFrac: 0.844, densityMult: 1.0121, effect: 0.0031 },
];

interface Props {
  locale: string;
}

export function FeedbackLoop({ locale }: Props) {
  const d = locale === "fi" ? t.fi : t.en;
  const [showSexRatio, setShowSexRatio] = useState(false);

  return (
    <section id="feedback-loop" className="mb-14">
      <h2 className="text-xl font-semibold mb-1">{d.title}</h2>
      <p className="text-xs text-status-partial font-medium mb-3">{d.diagnostic}</p>
      <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">{d.desc}</p>

      <div className="overflow-x-auto mb-4">
        <table className="text-sm w-full max-w-3xl">
          <thead>
            <tr className="border-b border-border text-left text-foreground-muted">
              <th className="py-2 pr-4 font-medium">{d.year}</th>
              <th className="py-2 pr-4 font-medium text-right">{d.baseTFR}</th>
              <th className="py-2 pr-4 font-medium text-right">{d.feedbackTFR}</th>
              <th className="py-2 pr-4 font-medium text-right">{d.urbanFrac}</th>
              <th className="py-2 pr-4 font-medium text-right">{d.densityMult}</th>
              <th className="py-2 font-medium text-right">{d.effect}</th>
            </tr>
          </thead>
          <tbody>
            {FEEDBACK_DATA.map((r) => (
              <tr key={r.year} className="border-b border-card-border last:border-0">
                <td className="py-2.5 pr-4 font-mono-num">{r.year}</td>
                <td className="py-2.5 pr-4 text-right font-mono-num">{r.baseTFR.toFixed(3)}</td>
                <td className="py-2.5 pr-4 text-right font-mono-num">{r.feedbackTFR.toFixed(3)}</td>
                <td className="py-2.5 pr-4 text-right font-mono-num text-foreground-muted">{r.urbanFrac.toFixed(3)}</td>
                <td className="py-2.5 pr-4 text-right font-mono-num text-foreground-muted">{r.densityMult.toFixed(4)}</td>
                <td className={`py-2.5 text-right font-mono-num ${r.effect > 0.001 ? "text-status-partial" : "text-foreground-muted"}`}>
                  {r.effect > 0 ? "-" : ""}{r.effect.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-foreground-muted max-w-3xl leading-relaxed mb-8">{d.note}</p>

      {/* Sex ratio section */}
      <div className="border-t border-border pt-6">
        <button
          onClick={() => setShowSexRatio(!showSexRatio)}
          className="text-sm font-semibold text-accent hover:underline mb-4 flex items-center gap-1"
        >
          {showSexRatio ? "▾" : "▸"} {d.sexRatioTitle}
        </button>

        {showSexRatio && (
          <div className="max-w-3xl">
            <p className="text-sm text-foreground-muted mb-4 leading-relaxed">{d.sexRatioDesc}</p>

            <div className="grid grid-cols-3 gap-3 max-w-md mb-4">
              <div className="border border-card-border bg-card-bg rounded-lg p-3 text-center">
                <p className="text-xs text-foreground-muted mb-1">{d.baseline}</p>
                <p className="text-lg font-mono-num font-semibold">0.512</p>
              </div>
              <div className="border border-accent/30 bg-accent/5 rounded-lg p-3 text-center">
                <p className="text-xs text-foreground-muted mb-1">{d.predicted}</p>
                <p className="text-lg font-mono-num font-semibold text-accent">0.509</p>
              </div>
              <div className="border border-card-border bg-card-bg rounded-lg p-3 text-center">
                <p className="text-xs text-foreground-muted mb-1">{d.shift}</p>
                <p className="text-lg font-mono-num font-semibold">-0.003</p>
              </div>
            </div>

            <p className="text-xs text-foreground-muted leading-relaxed">{d.sexNote}</p>
          </div>
        )}
      </div>
    </section>
  );
}
