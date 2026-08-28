"use client";

import { useState } from "react";
import { pickCopy } from "@/lib/i18n";

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
  ja: {
    title: "フィードバックループ：都市化 ↔ EMF密度",
    desc: "TFR低下が都市化を促進し（農村コミュニティの縮小に伴い農村から都市への移住が加速）、都市化がEMF曝露密度を増加させます（より多くの基地局、面積あたりより多くのデバイス）。高密度がさらなるTFR低下を増幅させます — 正のフィードバックループです。この診断モデルは増幅の強さをモデル化します。",
    diagnostic: "診断用 — 基本TFR予測には影響しない",
    country: "国",
    year: "年",
    baseTFR: "基本TFR",
    feedbackTFR: "フィードバック込み",
    urbanFrac: "都市化率",
    densityMult: "密度乗数",
    effect: "フィードバック効果",
    note: "フィードバック効果は小さく（2050年までTFRの1%未満）、都市化率の変化が緩慢なためです。このメカニズムは長期予測（2050年以降）および既に最大都市化率に近い国においてより重要です。韓国は最も強い事例であり、最低のTFRと最高の基礎都市化率から出発しています。",
    sexRatioTitle: "性比の変動",
    sexRatioDesc: "EMF誘発ROSがY染色体を持つ精子を選択的に損傷します（より小さく、DNA修復能力が低い）。これにより出生時の性比が女性側にシフトします。シフトは小さいですが、集団レベルでは測定可能です。",
    baseline: "基準値（EMFなし）",
    predicted: "2024年以降の予測",
    shift: "曝露単位あたりのシフト",
    sexNote: "予測されるシフト（0.512 → 0.509）は出生1000人あたり約3人の男児減少に相当します。北欧諸国は既に0.5105–0.5115の比率を示しており、部分的なROS媒介シフトと一致しています。この予測は検証可能です：累積EMF曝露が最も高い国で男児出生比率が最も低くなるはずです。",
  },
  fr: {
    title: "Boucle de rétroaction : Urbanisation ↔ Densité EMF",
    desc: "Le déclin du TFR entraîne l'urbanisation (la migration rurale vers urbaine s'accélère à mesure que les communautés rurales se réduisent). L'urbanisation augmente la densité d'exposition aux EMF (plus de tours, plus d'appareils par zone). Une densité plus élevée amplifie davantage le déclin du TFR — une boucle de rétroaction positive. Ce diagnostic modélise l'intensité de l'amplification.",
    diagnostic: "DIAGNOSTIC — n'affecte pas les prédictions de base du TFR",
    country: "Pays",
    year: "Année",
    baseTFR: "TFR de base",
    feedbackTFR: "Avec rétroaction",
    urbanFrac: "Fraction urbaine",
    densityMult: "Multiplicateur de densité",
    effect: "Effet de rétroaction",
    note: "L'effet de rétroaction est faible (< 1 % du TFR jusqu'en 2050) car les taux d'urbanisation changent lentement. Le mécanisme compte davantage pour les projections à long terme (2050+) et pour les pays déjà proches du maximum d'urbanisation. La Corée du Sud est le cas le plus fort car elle part du TFR le plus bas et du taux d'urbanisation de base le plus élevé.",
    sexRatioTitle: "Décalage du sex-ratio",
    sexRatioDesc: "Les ROS induites par les EMF endommagent sélectivement les spermatozoïdes porteurs du chromosome Y (plus petits, moins de capacité de réparation de l'ADN). Cela déplace le sex-ratio à la naissance vers le féminin. Le décalage est faible mais mesurable à l'échelle de la population.",
    baseline: "Référence (sans EMF)",
    predicted: "Prévu 2024+",
    shift: "Décalage par unité d'exposition",
    sexNote: "Le décalage prévu (0,512 → 0,509) correspond à ~3 garçons de moins pour 1000 naissances. Les pays nordiques montrent déjà des ratios de 0,5105–0,5115, cohérents avec un décalage partiel médié par les ROS. Cette prédiction est testable : les pays avec la plus forte exposition cumulée aux EMF devraient montrer les plus faibles fractions de naissances masculines.",
  },
  ko: {
    title: "피드백 루프: 도시화 ↔ EMF 밀도",
    desc: "TFR 감소가 도시화를 촉진하고(농촌 커뮤니티가 축소됨에 따라 농촌에서 도시로의 이주가 가속), 도시화가 EMF 노출 밀도를 증가시킵니다(더 많은 기지국, 면적당 더 많은 장치). 더 높은 밀도가 추가적인 TFR 감소를 증폭시킵니다 — 양의 피드백 루프입니다. 이 진단 모델은 증폭의 강도를 모델링합니다.",
    diagnostic: "진단용 — 기본 TFR 예측에 영향 없음",
    country: "국가",
    year: "연도",
    baseTFR: "기본 TFR",
    feedbackTFR: "피드백 포함",
    urbanFrac: "도시화율",
    densityMult: "밀도 승수",
    effect: "피드백 효과",
    note: "피드백 효과는 작으며(2050년까지 TFR의 1% 미만), 도시화율의 변화가 느리기 때문입니다. 이 메커니즘은 장기 예측(2050년 이후)과 이미 최대 도시화에 근접한 국가에서 더 중요합니다. 한국이 가장 강력한 사례인데, 가장 낮은 TFR과 가장 높은 기초 도시화율에서 출발하기 때문입니다.",
    sexRatioTitle: "성비 변동",
    sexRatioDesc: "EMF 유발 ROS가 Y염색체를 탑재한 정자를 선택적으로 손상시킵니다(더 작고, DNA 복구 능력이 낮음). 이는 출생 시 성비를 여성 쪽으로 이동시킵니다. 변동은 작지만 인구 규모에서 측정 가능합니다.",
    baseline: "기준치 (EMF 없음)",
    predicted: "2024년 이후 예측",
    shift: "노출 단위당 변동",
    sexNote: "예측된 변동(0.512 → 0.509)은 출생 1000명당 약 3명의 남아 감소에 해당합니다. 북유럽 국가들은 이미 0.5105–0.5115의 비율을 보여주며, 부분적 ROS 매개 변동과 일치합니다. 이 예측은 검증 가능합니다: 누적 EMF 노출이 가장 높은 국가에서 남아 출생 비율이 가장 낮아야 합니다.",
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
  const d = pickCopy(t, locale);
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
