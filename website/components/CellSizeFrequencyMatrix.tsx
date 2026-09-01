"use client";

import { useState } from "react";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

interface DataPoint {
  id: string;
  name: Record<string, string>;
  freqKHz: number;
  sizeUm: number;
  confirmed: boolean;
  note: Record<string, string>;
}

const DATA: DataPoint[] = [
  { id: "melanoma", name: { en: "Melanoma", fi: "Melanooma", ja: "悪性黒色腫", fr: "Mélanome", ko: "흑색종" }, freqKHz: 100, sizeUm: 35, confirmed: true, note: { en: "TTFields optimal 100 kHz", fi: "TTFields-optimi 100 kHz", ja: "TTFields最適値 100 kHz", fr: "TTFields optimal 100 kHz", ko: "TTFields 최적값 100 kHz" } },
  { id: "breast", name: { en: "Breast cancer", fi: "Rintasyöpä", ja: "乳がん", fr: "Cancer du sein", ko: "유방암" }, freqKHz: 120, sizeUm: 30, confirmed: true, note: { en: "TTFields optimal 120 kHz", fi: "TTFields-optimi 120 kHz", ja: "TTFields最適値 120 kHz", fr: "TTFields optimal 120 kHz", ko: "TTFields 최적값 120 kHz" } },
  { id: "pancreatic", name: { en: "Pancreatic cancer", fi: "Haimasyöpä", ja: "膵臓がん", fr: "Cancer du pancréas", ko: "췌장암" }, freqKHz: 150, sizeUm: 25, confirmed: true, note: { en: "TTFields optimal 150 kHz (PANOVA-3)", fi: "TTFields-optimi 150 kHz (PANOVA-3)", ja: "TTFields最適値 150 kHz（PANOVA-3）", fr: "TTFields optimal 150 kHz (PANOVA-3)", ko: "TTFields 최적값 150 kHz (PANOVA-3)" } },
  { id: "gbm", name: { en: "GBM (brain)", fi: "GBM (aivot)", ja: "GBM（脳）", fr: "GBM (cerveau)", ko: "GBM(뇌)" }, freqKHz: 200, sizeUm: 20, confirmed: true, note: { en: "TTFields optimal 200 kHz (EF-14)", fi: "TTFields-optimi 200 kHz (EF-14)", ja: "TTFields最適値 200 kHz（EF-14）", fr: "TTFields optimal 200 kHz (EF-14)", ko: "TTFields 최적값 200 kHz (EF-14)" } },
  { id: "ovarian", name: { en: "Ovarian cancer", fi: "Munasarjasyöpä", ja: "卵巣がん", fr: "Cancer de l'ovaire", ko: "난소암" }, freqKHz: 200, sizeUm: 20, confirmed: true, note: { en: "TTFields 200 kHz", fi: "TTFields 200 kHz", ja: "TTFields 200 kHz", fr: "TTFields 200 kHz", ko: "TTFields 200 kHz" } },
  { id: "oocyte", name: { en: "Oocyte (meiosis)", fi: "Munasolu (meioosi)", ja: "卵母細胞（減数分裂）", fr: "Ovocyte (méiose)", ko: "난모세포(감수분열)" }, freqKHz: 50, sizeUm: 120, confirmed: false, note: { en: "Largest human cell — low IF vulnerability window", fi: "Ihmisen suurin solu — matala IF-haavoittuvuusikkuna", ja: "ヒト最大の細胞 — 低IF脆弱性ウィンドウ", fr: "Plus grande cellule humaine — fenêtre de vulnérabilité IF basse", ko: "인체 최대 세포 — 낮은 IF 취약성 범위" } },
  { id: "spermatocyte", name: { en: "Spermatocyte", fi: "Spermatosyytti", ja: "精母細胞", fr: "Spermatocyte", ko: "정모세포" }, freqKHz: 120, sizeUm: 15, confirmed: false, note: { en: "Meiotic division — sensitive to spindle disruption", fi: "Meioottinen jakautuminen — herkkä karan häiriöille", ja: "減数分裂 — 紡錘体障害に敏感", fr: "Division méiotique — sensible à la perturbation du fuseau", ko: "감수분열 — 방추체 장애에 민감" } },
  { id: "spermatogonia", name: { en: "Spermatogonial stem cell", fi: "Spermatogoniaalinen kantasolu", ja: "精原幹細胞", fr: "Cellule souche spermatogoniale", ko: "정원줄기세포" }, freqKHz: 150, sizeUm: 12, confirmed: false, note: { en: "Continuously dividing — highest vulnerability", fi: "Jatkuvasti jakautuva — korkein haavoittuvuus", ja: "継続的に分裂 — 最高の脆弱性", fr: "Division continue — vulnérabilité maximale", ko: "지속적 분열 — 가장 높은 취약성" } },
  { id: "gut", name: { en: "Gut epithelium", fi: "Suoliston epiteeli", ja: "腸上皮", fr: "Épithélium intestinal", ko: "장 상피" }, freqKHz: 200, sizeUm: 10, confirmed: false, note: { en: "3–5 day turnover — TTFields literature flags this tissue", fi: "3–5 päivän uusiutuminen — TTFields-kirjallisuus tunnistaa riskin", ja: "3〜5日で代謝回転 — TTFields文献がこの組織を指摘", fr: "Renouvellement de 3 à 5 jours — la littérature TTFields signale ce tissu", ko: "3~5일 교체 — TTFields 문헌이 이 조직을 지적" } },
  { id: "insect", name: { en: "Insect cells", fi: "Hyönteissolut", ja: "昆虫細胞", fr: "Cellules d'insectes", ko: "곤충 세포" }, freqKHz: 350, sizeUm: 5, confirmed: false, note: { en: "Dual resonance: cellular (kHz) + body (GHz)", fi: "Kaksoisresonanssi: solu (kHz) + keho (GHz)", ja: "二重共鳴：細胞（kHz）+ 体（GHz）", fr: "Double résonance : cellulaire (kHz) + corporelle (GHz)", ko: "이중 공명: 세포(kHz) + 체(GHz)" } },
];

const ENV_BANDS = [
  { label: { en: "LED drivers", fi: "LED-hakkurit", ja: "LEDドライバー", fr: "Drivers LED", ko: "LED 드라이버" }, minKHz: 20, maxKHz: 200, color: "rgba(255,152,0,0.12)" },
  { label: { en: "HVAC VFD", fi: "HVAC VFD", ja: "HVAC VFD", fr: "VFD CVC", ko: "HVAC VFD" }, minKHz: 5, maxKHz: 50, color: "rgba(76,175,80,0.10)" },
  { label: { en: "Inverters", fi: "Invertterit", ja: "インバーター", fr: "Onduleurs", ko: "인버터" }, minKHz: 10, maxKHz: 100, color: "rgba(33,150,243,0.08)" },
];

const COPY = {
  en: {
    title: "Cell Size × Frequency Vulnerability Matrix",
    lead: "TTFields clinical data reveals a quantitative relationship between cell size and optimal disruption frequency: larger cells respond to lower frequencies. GBM cells (20 µm) at 200 kHz, pancreatic (25 µm) at 150 kHz, breast (30 µm) at 120 kHz, melanoma (35 µm) at 100 kHz. This is the same resonance principle BERM uses for insects ([[ref:thielens2018|Thielens 2018]]: insect body size ≈ λ/2 at Wi-Fi frequencies) but at the intracellular level.",
    lead2: "Extrapolating to BERM's target tissues: spermatogonial stem cells (~12 µm, continuously dividing) fall in the 100–200 kHz vulnerability window — precisely the frequency range of LED switch-mode power supplies (20–200 kHz). Gut epithelial cells (~10 µm, 3–5 day turnover) fall at 150–300 kHz. Oocytes (~120 µm, largest human cells) at 30–80 kHz. Each tissue has a frequency-specific vulnerability that maps to specific environmental EMF sources.",
    lead3: "The biological mechanism at environmental IF levels is not dielectrophoresis (DEP), which requires the high intensities used in TTFields therapy (100–300 V/m). At environmental levels (0.01–3 V/m), the mechanism is Ion Forced Oscillation (IFO-VGIC): polarized IF fields force irregular gating of voltage-gated ion channels, with a demonstrated threshold of 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). The frequency–cell size relationship from TTFields data indicates WHICH cells are most vulnerable, while IFO provides the INTENSITY threshold at which disruption begins.",
    confirmed: "TTFields data (confirmed)",
    predicted: "BERM extrapolation (predicted)",
    envSources: "Environmental EMF sources at same frequencies",
    clickHint: "Click a point for details",
    freq: "Frequency",
    size: "Cell diameter",
  },
  fi: {
    title: "Solukoko × taajuus -haavoittuvuusmatriisi",
    lead: "TTFields-kliininen data paljastaa kvantitatiivisen suhteen solukoon ja optimaalisen häiriötaajuuden välillä: suuremmat solut reagoivat matalampiin taajuuksiin. GBM-solut (20 µm) 200 kHz, haimasyöpä (25 µm) 150 kHz, rintasyöpä (30 µm) 120 kHz, melanooma (35 µm) 100 kHz. Tämä on sama resonanssiperiaate jonka BERM käyttää hyönteisille ([[ref:thielens2018|Thielens 2018]]) mutta solun sisäisellä tasolla.",
    lead2: "Ekstrapoloituna BERM:n kohdekudoksiin: spermatogoniaaliset kantasolut (~12 µm, jatkuvasti jakautuvia) osuvat 100–200 kHz haavoittuvuusikkunaan — juuri LED-hakkuriteholähteiden taajuusalue (20–200 kHz). Suoliston epiteelisolut (~10 µm, 3–5 päivän uusiutuminen) osuvat 150–300 kHz:iin. Munasolut (~120 µm, ihmisen suurimmat solut) 30–80 kHz:iin. Jokaisella kudoksella on taajuustarkka haavoittuvuus, joka kartoittuu tiettyihin ympäristön EMF-lähteisiin.",
    lead3: "Biologinen mekanismi ympäristön IF-tasoilla ei ole dielektroforeesi (DEP), joka vaatii TTFields-terapian korkeat intensiteetit (100–300 V/m). Ympäristötasoilla (0,01–3 V/m) mekanismi on ionien pakko-oskillaatio (IFO-VGIC): polarisoituneet IF-kentät pakottavat jänniteohjattujen ionikanavien epäsäännöllisen porttauksen, osoitetulla kynnyksellä 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). Taajuus–solukoko-suhde TTFields-datasta osoittaa MITKÄ solut ovat haavoittuvimpia, kun taas IFO tarjoaa INTENSITEETTIKYNNYKSEN jolla häiriö alkaa.",
    confirmed: "TTFields-data (vahvistettu)",
    predicted: "BERM-ekstrapolaatio (ennuste)",
    envSources: "Ympäristön EMF-lähteet samoilla taajuuksilla",
    clickHint: "Klikkaa pistettä nähdäksesi tiedot",
    freq: "Taajuus",
    size: "Solun halkaisija",
  },
  ja: {
    title: "細胞サイズ × 周波数 脆弱性マトリックス",
    lead: "TTFieldsの臨床データは、細胞サイズと最適な障害周波数の間の定量的関係を明らかにしています。大きな細胞ほど低い周波数に応答します。GBM細胞（20 µm）は200 kHz、膵臓がん（25 µm）は150 kHz、乳がん（30 µm）は120 kHz、悪性黒色腫（35 µm）は100 kHz。これはBERMが昆虫に使用するのと同じ共鳴原理（[[ref:thielens2018|Thielens 2018]]：昆虫の体サイズ ≈ Wi-Fi周波数でのλ/2）を細胞内レベルに適用したものです。",
    lead2: "BERMの標的組織への外挿：精原幹細胞（約12 µm、継続的に分裂）は100〜200 kHzの脆弱性ウィンドウに該当します — まさにLEDスイッチング電源の周波数範囲（20〜200 kHz）です。腸上皮細胞（約10 µm、3〜5日で代謝回転）は150〜300 kHzに該当します。卵母細胞（約120 µm、ヒト最大の細胞）は30〜80 kHzです。各組織には特定の環境EMF源に対応する周波数固有の脆弱性があります。",
    lead3: "環境IFレベルでの生物学的メカニズムは、TTFields療法で用いる高強度（100〜300 V/m）を必要とする誘電泳動（DEP）ではありません。環境レベル（0.01〜3 V/m）でのメカニズムはイオン強制振動（IFO-VGIC）です。偏極IF電場が電位依存性イオンチャネルの不規則なゲーティングを強制し、その実証された閾値は10⁻⁵ V/mです（[[ref:panagopoulos2025_ifo|Panagopoulos 2025]]）。TTFieldsデータの周波数–細胞サイズ関係はどの細胞が最も脆弱かを示し、IFOは障害が始まる強度閾値を与えます。",
    confirmed: "TTFieldsデータ（確認済み）",
    predicted: "BERM外挿（予測）",
    envSources: "同一周波数の環境EMF源",
    clickHint: "ポイントをクリックして詳細を表示",
    freq: "周波数",
    size: "細胞直径",
  },
  fr: {
    title: "Matrice de vulnérabilité taille cellulaire × fréquence",
    lead: "Les données cliniques TTFields révèlent une relation quantitative entre la taille cellulaire et la fréquence optimale de perturbation : les cellules plus grandes répondent à des fréquences plus basses. Cellules GBM (20 µm) à 200 kHz, pancréas (25 µm) à 150 kHz, sein (30 µm) à 120 kHz, mélanome (35 µm) à 100 kHz. C'est le même principe de résonance que le BERM utilise pour les insectes ([[ref:thielens2018|Thielens 2018]] : taille corporelle des insectes ≈ λ/2 aux fréquences Wi-Fi) mais au niveau intracellulaire.",
    lead2: "Extrapolation aux tissus cibles du BERM : les cellules souches spermatogoniales (~12 µm, en division continue) se situent dans la fenêtre de vulnérabilité 100–200 kHz — précisément la gamme de fréquences des alimentations à découpage LED (20–200 kHz). Les cellules épithéliales intestinales (~10 µm, renouvellement de 3 à 5 jours) à 150–300 kHz. Les ovocytes (~120 µm, plus grandes cellules humaines) à 30–80 kHz. Chaque tissu présente une vulnérabilité spécifique à une fréquence correspondant à des sources EMF environnementales spécifiques.",
    lead3: "Le mécanisme biologique aux niveaux IF environnementaux n'est pas la diélectrophorèse (DEP), qui exige les fortes intensités utilisées en thérapie TTFields (100–300 V/m). Aux niveaux environnementaux (0,01–3 V/m), le mécanisme est l'oscillation forcée des ions (IFO-VGIC) : les champs IF polarisés forcent l'ouverture irrégulière des canaux ioniques voltage-dépendants, avec un seuil démontré de 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). La relation fréquence–taille cellulaire issue des données TTFields indique QUELLES cellules sont les plus vulnérables, tandis que l'IFO fournit le SEUIL D'INTENSITÉ auquel la perturbation commence.",
    confirmed: "Données TTFields (confirmées)",
    predicted: "Extrapolation BERM (prédiction)",
    envSources: "Sources EMF environnementales aux mêmes fréquences",
    clickHint: "Cliquez sur un point pour les détails",
    freq: "Fréquence",
    size: "Diamètre cellulaire",
  },
  ko: {
    title: "세포 크기 × 주파수 취약성 매트릭스",
    lead: "TTFields 임상 데이터는 세포 크기와 최적 장애 주파수 사이의 정량적 관계를 보여줍니다. 큰 세포일수록 낮은 주파수에 반응합니다. GBM 세포(20 µm)는 200 kHz, 췌장암(25 µm)은 150 kHz, 유방암(30 µm)은 120 kHz, 흑색종(35 µm)은 100 kHz. 이는 BERM이 곤충에 사용하는 것과 동일한 공명 원리([[ref:thielens2018|Thielens 2018]]: 곤충 체 크기 ≈ Wi-Fi 주파수에서의 λ/2)를 세포 내 수준에 적용한 것입니다.",
    lead2: "BERM 표적 조직으로의 외삽: 정원줄기세포(약 12 µm, 지속적 분열)는 100~200 kHz 취약성 범위에 해당합니다 — 정확히 LED 스위칭 전원 공급장치의 주파수 범위(20~200 kHz)입니다. 장 상피세포(약 10 µm, 3~5일 교체)는 150~300 kHz에 해당합니다. 난모세포(약 120 µm, 인체 최대 세포)는 30~80 kHz입니다. 각 조직에는 특정 환경 EMF 원에 대응하는 주파수 고유 취약성이 있습니다.",
    lead3: "환경 IF 수준의 생물학적 메커니즘은 TTFields 치료에 사용되는 높은 강도(100–300 V/m)를 필요로 하는 유전영동(DEP)이 아닙니다. 환경 수준(0.01–3 V/m)에서의 메커니즘은 이온 강제 진동(IFO-VGIC)입니다. 편극 IF 전기장은 전압 의존성 이온 채널의 불규칙한 게이팅을 강제하며, 입증된 역치는 10⁻⁵ V/m입니다([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). TTFields 데이터의 주파수–세포 크기 관계는 어떤 세포가 가장 취약한지를 나타내고, IFO는 교란이 시작되는 강도 역치를 제공합니다.",
    confirmed: "TTFields 데이터(확인됨)",
    predicted: "BERM 외삽(예측)",
    envSources: "동일 주파수의 환경 EMF 원",
    clickHint: "점을 클릭하여 상세 정보 보기",
    freq: "주파수",
    size: "세포 직경",
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

// Coincident observations keep their real data coordinates; only the clickable
// badges are separated so both records remain independently selectable.
const POINT_OFFSETS: Partial<Record<DataPoint["id"], { dx: number; dy: number }>> = {
  gbm: { dx: -11, dy: -9 },
  ovarian: { dx: 11, dy: -9 },
};

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
  const d = pickCopy(COPY, locale);
  const sel = DATA.find((p) => p.id === selected);

  const freqTicks = [5, 10, 20, 50, 100, 200, 500];
  const sizeTicks = [0, 20, 40, 60, 80, 100, 120, 140];

  return (
    <div className="mt-8">
      <h4 className="text-base font-semibold mb-3">{d.title}</h4>
      <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={d.lead} locale={locale} /></p>
      <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.lead2}</p>
      <p className="text-sm text-foreground-muted leading-relaxed mb-5"><InlineReferenceText text={d.lead3} locale={locale} /></p>

      <div className="chart-surface max-w-[760px]">
        <div className="chart-scroll">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="chart-svg w-full min-w-[640px]"
            role="img"
            aria-label={d.title}
          >
          <rect
            x={PAD.left}
            y={PAD.top}
            width={plotW}
            height={plotH}
            rx={8}
            fill="var(--card-bg)"
            opacity={0.64}
          />
          {/* Environmental bands */}
          {ENV_BANDS.map((b) => {
            const x1 = Math.max(PAD.left, freqToX(b.minKHz));
            const x2 = Math.min(PAD.left + plotW, freqToX(b.maxKHz));
            return (
              <g key={b.label.en}>
                <rect x={x1} y={PAD.top} width={x2 - x1} height={plotH} fill={b.color} />
                <text
                  x={(x1 + x2) / 2}
                  y={PAD.top + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fill="currentColor"
                  opacity={0.45}
                >
                  {pickCopy(b.label, locale)}
                </text>
              </g>
            );
          })}

          {/* Grid lines */}
          {freqTicks.map((f) => (
            <line key={f} className="chart-grid-line" x1={freqToX(f)} y1={PAD.top} x2={freqToX(f)} y2={PAD.top + plotH} />
          ))}
          {sizeTicks.map((s) => (
            <line key={s} className="chart-grid-line" x1={PAD.left} y1={sizeToY(s)} x2={PAD.left + plotW} y2={sizeToY(s)} />
          ))}

          {/* Axes */}
          <line className="chart-axis-line" x1={PAD.left} y1={PAD.top + plotH} x2={PAD.left + plotW} y2={PAD.top + plotH} />
          <line className="chart-axis-line" x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + plotH} />

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
          {DATA.map((pt, index) => {
            const dataX = freqToX(pt.freqKHz);
            const dataY = sizeToY(pt.sizeUm);
            const offset = POINT_OFFSETS[pt.id] ?? { dx: 0, dy: 0 };
            const cx = dataX + offset.dx;
            const cy = dataY + offset.dy;
            const isSelected = pt.id === selected;
            const r = isSelected ? 9 : 7.5;
            const markerLabel = `${pickCopy(pt.name, locale)} — ${formatFreq(pt.freqKHz)}, ${pt.sizeUm} µm`;
            return (
              <g
                key={pt.id}
                tabIndex={0}
                role="button"
                aria-label={markerLabel}
                aria-pressed={isSelected}
                onClick={() => setSelected(isSelected ? null : pt.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(isSelected ? null : pt.id); } }}
                className="cursor-pointer outline-none"
              >
                {(offset.dx !== 0 || offset.dy !== 0) && (
                  <>
                    <line
                      x1={dataX}
                      y1={dataY}
                      x2={cx}
                      y2={cy}
                      stroke={pt.confirmed ? "#2196F3" : "#FFC107"}
                      strokeWidth={1.25}
                      opacity={0.68}
                    />
                    <circle
                      cx={dataX}
                      cy={dataY}
                      r={2.25}
                      fill={pt.confirmed ? "#2196F3" : "#FFC107"}
                    />
                  </>
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r + 6}
                  fill="transparent"
                />
                {isSelected && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 3.5}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.25}
                    opacity={0.35}
                  />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={pt.confirmed ? "#2196F3" : "#FFC107"}
                  stroke={isSelected ? "currentColor" : "var(--figure-bg)"}
                  strokeWidth={isSelected ? 2 : 1.5}
                />
                <text
                  x={cx}
                  y={cy + 2.8}
                  textAnchor="middle"
                  fontSize={index === 9 ? 7 : 8}
                  fontWeight={800}
                  fill={pt.confirmed ? "#fff" : "#3f2c00"}
                  pointerEvents="none"
                >
                  {index + 1}
                </text>
              </g>
            );
          })}
          </svg>
        </div>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-2 border-t border-card-border/70 pt-3">
          <ul className="chart-legend" aria-label={d.title}>
            <li className="chart-key">
              <span className="chart-key__swatch bg-[#2196F3]" aria-hidden="true" />
              {d.confirmed}
            </li>
            <li className="chart-key">
              <span className="chart-key__swatch bg-[#FFC107]" aria-hidden="true" />
              {d.predicted}
            </li>
          </ul>
          <p className="text-[11px] text-foreground-muted">{d.clickHint}</p>
        </div>

        <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2" aria-label={d.clickHint}>
          {DATA.map((pt, index) => {
            const isSelected = pt.id === selected;
            return (
              <li key={pt.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelected(isSelected ? null : pt.id)}
                  className={`flex min-h-12 w-full min-w-0 items-start gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors ${
                    isSelected
                      ? "border-foreground/35 bg-foreground/5"
                      : "border-card-border/70 bg-card-bg/45 hover:border-foreground/25 hover:bg-card-bg"
                  }`}
                >
                  <span
                    className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold"
                    style={{
                      backgroundColor: pt.confirmed ? "#2196F3" : "#FFC107",
                      color: pt.confirmed ? "#fff" : "#3f2c00",
                    }}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block break-words text-xs font-semibold leading-snug">
                      {pickCopy(pt.name, locale)}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-foreground-muted">
                      {formatFreq(pt.freqKHz)} · {pt.sizeUm} µm
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Detail panel */}
        {sel && (
          <div className="mt-3 rounded-lg border border-card-border bg-card-bg/80 p-3.5">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span
              className="inline-block size-3 shrink-0 rounded-full"
              style={{ background: sel.confirmed ? "#2196F3" : "#FFC107" }}
            />
            <span className="text-sm font-semibold">{pickCopy(sel.name, locale)}</span>
            <span className="text-xs text-foreground-muted sm:ml-auto">
              {formatFreq(sel.freqKHz)} · {sel.sizeUm} µm
            </span>
          </div>
          <p className="text-xs text-foreground-muted">{pickCopy(sel.note, locale)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
