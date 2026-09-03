"use client";

import { useState, useMemo } from "react";
import { pickCopy } from "@/lib/i18n";

/* ── Country geomagnetic data ────────────────────────────────── */

interface CountryGeomag {
  code: string;
  name: string;
  geomag_lat: number;
  field_uT: number;
  blue_eye_frac: number;
  lactose_tol_frac: number;
}

const COUNTRY_GEOMAG: CountryGeomag[] = [
  { code: "FIN", name: "Finland", geomag_lat: 64.5, field_uT: 52.0, blue_eye_frac: 0.89, lactose_tol_frac: 0.82 },
  { code: "ISL", name: "Iceland", geomag_lat: 70.0, field_uT: 53.0, blue_eye_frac: 0.75, lactose_tol_frac: 0.80 },
  { code: "NOR", name: "Norway", geomag_lat: 65.5, field_uT: 52.5, blue_eye_frac: 0.80, lactose_tol_frac: 0.90 },
  { code: "SWE", name: "Sweden", geomag_lat: 62.0, field_uT: 51.0, blue_eye_frac: 0.78, lactose_tol_frac: 0.85 },
  { code: "EST", name: "Estonia", geomag_lat: 60.5, field_uT: 51.0, blue_eye_frac: 0.70, lactose_tol_frac: 0.75 },
  { code: "DNK", name: "Denmark", geomag_lat: 58.0, field_uT: 50.5, blue_eye_frac: 0.65, lactose_tol_frac: 0.88 },
  { code: "GBR", name: "United Kingdom", geomag_lat: 55.0, field_uT: 49.5, blue_eye_frac: 0.48, lactose_tol_frac: 0.82 },
  { code: "DEU", name: "Germany", geomag_lat: 51.0, field_uT: 48.5, blue_eye_frac: 0.40, lactose_tol_frac: 0.78 },
  { code: "USA", name: "United States", geomag_lat: 50.0, field_uT: 48.0, blue_eye_frac: 0.27, lactose_tol_frac: 0.70 },
  { code: "FRA", name: "France", geomag_lat: 48.5, field_uT: 47.0, blue_eye_frac: 0.22, lactose_tol_frac: 0.65 },
  { code: "ITA", name: "Italy", geomag_lat: 42.5, field_uT: 46.0, blue_eye_frac: 0.12, lactose_tol_frac: 0.45 },
  { code: "ESP", name: "Spain", geomag_lat: 43.0, field_uT: 44.5, blue_eye_frac: 0.10, lactose_tol_frac: 0.40 },
  { code: "GRC", name: "Greece", geomag_lat: 37.5, field_uT: 45.0, blue_eye_frac: 0.08, lactose_tol_frac: 0.30 },
  { code: "IRN", name: "Iran", geomag_lat: 28.0, field_uT: 44.0, blue_eye_frac: 0.05, lactose_tol_frac: 0.20 },
  { code: "CHN", name: "China", geomag_lat: 30.0, field_uT: 47.0, blue_eye_frac: 0.01, lactose_tol_frac: 0.10 },
  { code: "JPN", name: "Japan", geomag_lat: 27.0, field_uT: 46.0, blue_eye_frac: 0.01, lactose_tol_frac: 0.05 },
  { code: "KOR", name: "South Korea", geomag_lat: 28.0, field_uT: 46.5, blue_eye_frac: 0.01, lactose_tol_frac: 0.10 },
  { code: "IND", name: "India", geomag_lat: 12.0, field_uT: 38.0, blue_eye_frac: 0.01, lactose_tol_frac: 0.35 },
  { code: "NGA", name: "Nigeria", geomag_lat: 3.5, field_uT: 32.0, blue_eye_frac: 0.01, lactose_tol_frac: 0.25 },
  { code: "BRA", name: "Brazil", geomag_lat: -15.0, field_uT: 24.0, blue_eye_frac: 0.08, lactose_tol_frac: 0.45 },
];

/* ── chi_B computation (matches v17_chi_B) ─────────────────── */

const GAMMA_E = 28.025e9; // Hz/T, electron gyromagnetic ratio

function larmorFreqMHz(field_uT: number): number {
  const B_tesla = field_uT * 1e-6;
  return (GAMMA_E * B_tesla) / 1e6;
}

function dualPeakFactor(geomag_lat: number): number {
  const abs_lat = Math.abs(geomag_lat);
  if (abs_lat < 30) return 0.2;
  if (abs_lat < 55) return 0.5;
  if (abs_lat < 65) return 0.8;
  return 1.0;
}

function computeChiB(field_uT: number, geomag_lat: number): number {
  const dpf = dualPeakFactor(geomag_lat);
  return Math.min(1.0, Math.max(0.0, (field_uT / 65.0) * (0.3 + 0.7 * dpf)));
}

/* ── Northern Package components ─────────────────────────────── */

function computeChiOptical(blue_eye_frac: number): number {
  return blue_eye_frac;
}

function computeChiMolecular(lactose_tol_frac: number): number {
  // Lactose tolerance -> B2 -> FAD coupling
  return lactose_tol_frac;
}

function computeChiGeomagnetic(geomag_lat: number, field_uT: number): number {
  // Normalize: higher absolute geomagnetic latitude + stronger field = stronger coupling
  const latNorm = Math.abs(geomag_lat) / 90;
  const fieldNorm = field_uT / 65; // 65 uT is approximate max
  return (latNorm + fieldNorm) / 2;
}

/* ── Localized copy ──────────────────────────────────────────── */

const COPY = {
  en: {
    title: "Solar Cycle Explorer",
    subtitle: "Geomagnetic coupling, Larmor resonance, and the Northern Package hypothesis across populations.",
    selectCountry: "Select country",
    geomagLat: "Geomagnetic latitude",
    fieldStrength: "Total field strength",
    blueEye: "Blue eye fraction",
    lactoseTol: "Lactose tolerance",
    chiB: "Computed chi_B",
    larmorFreq: "Larmor frequency",
    northernPackage: "Northern Package",
    chiOptical: "chi_optical (blue eye)",
    chiMolecular: "chi_molecular (lactose)",
    chiGeomagnetic: "chi_geomagnetic (field)",
    product: "Product (NP score)",
    barChartTitle: "Northern Package component breakdown",
    note: "chi_B = (B / 65 μT) × (0.3 + 0.7 × dual_peak_factor), where B is the local geomagnetic field strength and the dual-peak factor encodes latitude-dependent solar-cycle sensitivity (v17 formula). The Larmor frequency uses the electron gyromagnetic ratio (28.025 GHz/T). The Northern Package score is the product of three independent coupling channels.",
  },
  fi: {
    title: "Aurinkosykli",
    subtitle: "Geomagneettinen kytkenta, Larmor-resonanssi ja pohjoinen paketti -hypoteesi populaatioissa.",
    selectCountry: "Valitse maa",
    geomagLat: "Geomagneettinen leveysaste",
    fieldStrength: "Kokonaiskenttavoimakkuus",
    blueEye: "Sinisten silmien osuus",
    lactoseTol: "Laktoosinsietokyky",
    chiB: "Laskettu chi_B",
    larmorFreq: "Larmor-taajuus",
    northernPackage: "Pohjoinen paketti",
    chiOptical: "chi_optinen (sinisilma)",
    chiMolecular: "chi_molekulaarinen (laktoosi)",
    chiGeomagnetic: "chi_geomagneettinen (kentta)",
    product: "Tulo (NP-pistemäärä)",
    barChartTitle: "Pohjoisen paketin osatekijat",
    note: "chi_B = (B / 65 μT) × (0.3 + 0.7 × dual_peak_factor), jossa B on paikallinen geomagneettisen kentän voimakkuus ja kaksoishuipputekijä koodaa leveysasteesta riippuvan aurinkosykliherkkyden (v17-kaava). Larmor-taajuus käyttää elektronin gyromagneettista suhdetta (28,025 GHz/T). Pohjoisen paketin pistemäärä on kolmen itsenäisen kytkentäkanavan tulo.",
  },
  ja: {
    title: "太陽周期エクスプローラー",
    subtitle: "地磁気結合、ラーモア共鳴、および集団間の北方パッケージ仮説。",
    selectCountry: "国を選択",
    geomagLat: "地磁気緯度",
    fieldStrength: "全磁場強度",
    blueEye: "青い目の割合",
    lactoseTol: "乳糖耐性",
    chiB: "計算chi_B",
    larmorFreq: "ラーモア周波数",
    northernPackage: "北方パッケージ",
    chiOptical: "chi_光学 (青い目)",
    chiMolecular: "chi_分子 (乳糖)",
    chiGeomagnetic: "chi_地磁気 (磁場)",
    product: "積 (NPスコア)",
    barChartTitle: "北方パッケージ構成要素の内訳",
    note: "chi_B = (B / 65 μT) × (0.3 + 0.7 × dual_peak_factor)、Bは地域の地磁気場強度、二重ピーク因子は緯度依存の太陽周期感受性を符号化(v17式)。ラーモア周波数は電子のジャイロ磁気比(28.025 GHz/T)を使用。北方パッケージスコアは3つの独立した結合チャネルの積。",
  },
  fr: {
    title: "Explorateur du cycle solaire",
    subtitle: "Couplage geomagnetique, resonance de Larmor et hypothese du paquet nordique a travers les populations.",
    selectCountry: "Selectionner un pays",
    geomagLat: "Latitude geomagnetique",
    fieldStrength: "Intensite du champ total",
    blueEye: "Fraction yeux bleus",
    lactoseTol: "Tolerance au lactose",
    chiB: "chi_B calcule",
    larmorFreq: "Frequence de Larmor",
    northernPackage: "Paquet nordique",
    chiOptical: "chi_optique (yeux bleus)",
    chiMolecular: "chi_moleculaire (lactose)",
    chiGeomagnetic: "chi_geomagnetique (champ)",
    product: "Produit (score NP)",
    barChartTitle: "Decomposition des composantes du paquet nordique",
    note: "chi_B = (B / 65 μT) × (0.3 + 0.7 × dual_peak_factor), ou B est l'intensite du champ geomagnetique local et le facteur de double pic code la sensibilite au cycle solaire dependante de la latitude (formule v17). La frequence de Larmor utilise le rapport gyromagnetique de l'electron (28,025 GHz/T). Le score du paquet nordique est le produit de trois canaux de couplage independants.",
  },
  ko: {
    title: "태양 주기 탐색기",
    subtitle: "지자기 결합, 라모어 공명, 그리고 집단 간 북방 패키지 가설.",
    selectCountry: "국가 선택",
    geomagLat: "지자기 위도",
    fieldStrength: "전체 자기장 강도",
    blueEye: "파란 눈 비율",
    lactoseTol: "유당 내성",
    chiB: "계산된 chi_B",
    larmorFreq: "라모어 주파수",
    northernPackage: "북방 패키지",
    chiOptical: "chi_광학 (파란 눈)",
    chiMolecular: "chi_분자 (유당)",
    chiGeomagnetic: "chi_지자기 (자기장)",
    product: "곱 (NP 점수)",
    barChartTitle: "북방 패키지 구성 요소 분석",
    note: "chi_B = (B / 65 μT) × (0.3 + 0.7 × dual_peak_factor), 여기서 B는 지역 지자기장 강도이고 이중 피크 인자는 위도 의존적 태양 주기 감수성을 인코딩합니다 (v17 공식). 라모어 주파수는 전자 자이로자기 비율(28.025 GHz/T)을 사용합니다. 북방 패키지 점수는 세 가지 독립적 결합 채널의 곱.",
  },
} as const;

/* ── Bar chart (SVG) ─────────────────────────────────────────── */

const BAR_COLORS = {
  optical: "#3B82F6",
  molecular: "#F59E0B",
  geomagnetic: "#8B5CF6",
  product: "#10B981",
};

const BAR_LABEL_COLORS = {
  optical: "var(--chart-series-1)",
  molecular: "var(--chart-series-2)",
  geomagnetic: "var(--chart-series-4)",
  product: "var(--chart-series-3)",
};

interface BarData {
  label: string;
  value: number;
  color: string;
  labelColor: string;
}

function NorthernPackageChart({ bars, title }: { bars: BarData[]; title: string }) {
  const W = 520;
  const H = 232;
  const PAD = { top: 24, right: 20, bottom: 48, left: 40 };
  const barAreaW = W - PAD.left - PAD.right;
  const barAreaH = H - PAD.top - PAD.bottom;
  const barCount = bars.length;
  const gap = 24;
  const barW = Math.min(80, (barAreaW - gap * (barCount - 1)) / barCount);
  const totalBarsW = barCount * barW + (barCount - 1) * gap;
  const startX = PAD.left + (barAreaW - totalBarsW) / 2;

  const maxVal = Math.max(...bars.map((b) => b.value), 1);

  return (
    <figure className="data-figure">
      <figcaption className="data-figure__caption">
        <span className="data-figure__title">{title}</span>
      </figcaption>
      <div className="chart-scroll">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="chart-svg block w-full min-w-[400px]"
          role="img"
          aria-label={title}
        >
          {/* Background */}
          <rect
            x={PAD.left}
            y={PAD.top}
            width={barAreaW}
            height={barAreaH}
            rx={6}
            fill="var(--figure-caption-bg)"
            opacity={0.28}
          />

          {/* Horizontal grid lines */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
            const y = PAD.top + barAreaH - frac * barAreaH;
            return (
              <g key={frac}>
                <line
                  x1={PAD.left}
                  y1={y}
                  x2={W - PAD.right}
                  y2={y}
                  stroke="var(--card-border)"
                  strokeWidth={0.5}
                />
                <text
                  x={PAD.left - 4}
                  y={y + 3}
                  textAnchor="end"
                  fill="var(--foreground-muted)"
                  fontSize={9}
                >
                  {(frac * maxVal).toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {bars.map((bar, i) => {
            const x = startX + i * (barW + gap);
            const barH = (bar.value / maxVal) * barAreaH;
            const y = PAD.top + barAreaH - barH;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={barH}
                  fill={bar.labelColor}
                  rx={4}
                  opacity={0.85}
                >
                  <title>
                    {bar.label}: {bar.value.toFixed(4)}
                  </title>
                </rect>
                {/* Value label on top */}
                <text
                  x={x + barW / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fill={bar.color}
                  fontSize={10}
                  fontWeight={600}
                >
                  {bar.value.toFixed(3)}
                </text>
                {/* Label below */}
                <text
                  x={x + barW / 2}
                  y={PAD.top + barAreaH + 15}
                  textAnchor="middle"
                  fill="var(--foreground-muted)"
                  fontSize={9}
                >
                  {bar.label.includes("_") ? (
                    <>
                      <tspan x={x + barW / 2}>{bar.label.split("_")[0]}_</tspan>
                      <tspan x={x + barW / 2} dy={11}>{bar.label.split("_").slice(1).join("_")}</tspan>
                    </>
                  ) : bar.label}
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line
            x1={PAD.left}
            y1={PAD.top}
            x2={PAD.left}
            y2={PAD.top + barAreaH}
            stroke="var(--card-border)"
            strokeWidth={1}
          />
          <line
            x1={PAD.left}
            y1={PAD.top + barAreaH}
            x2={W - PAD.right}
            y2={PAD.top + barAreaH}
            stroke="var(--card-border)"
            strokeWidth={1}
          />
        </svg>
      </div>
    </figure>
  );
}

/* ── Main component ──────────────────────────────────────────── */

export function SolarExplorer({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const [selectedCode, setSelectedCode] = useState("FIN");

  const country = COUNTRY_GEOMAG.find((c) => c.code === selectedCode) ?? COUNTRY_GEOMAG[0];

  const computed = useMemo(() => {
    const larmor = larmorFreqMHz(country.field_uT);
    const chiB = computeChiB(country.field_uT, country.geomag_lat);
    const chiOpt = computeChiOptical(country.blue_eye_frac);
    const chiMol = computeChiMolecular(country.lactose_tol_frac);
    const chiGeo = computeChiGeomagnetic(country.geomag_lat, country.field_uT);
    const product = chiOpt * chiMol * chiGeo;
    return { larmor, chiB, chiOpt, chiMol, chiGeo, product };
  }, [country]);

  const bars: BarData[] = [
    { label: d.chiOptical.split(" (")[0], value: computed.chiOpt, color: BAR_COLORS.optical, labelColor: BAR_LABEL_COLORS.optical },
    { label: d.chiMolecular.split(" (")[0], value: computed.chiMol, color: BAR_COLORS.molecular, labelColor: BAR_LABEL_COLORS.molecular },
    { label: d.chiGeomagnetic.split(" (")[0], value: computed.chiGeo, color: BAR_COLORS.geomagnetic, labelColor: BAR_LABEL_COLORS.geomagnetic },
    { label: d.product.split(" (")[0], value: computed.product, color: BAR_COLORS.product, labelColor: BAR_LABEL_COLORS.product },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          {d.title}
        </h3>
        <p className="text-sm mt-1" style={{ color: "var(--foreground-muted)" }}>
          {d.subtitle}
        </p>
      </div>

      {/* Country selector */}
      <div className="max-w-sm">
        <label className="text-sm font-medium">
          <span
            className="mb-1.5 block"
            style={{ color: "var(--foreground-muted)" }}
          >
            {d.selectCountry}
          </span>
          <select
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground"
          >
            {COUNTRY_GEOMAG.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Country info cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <div className="rounded-lg border border-card-border bg-card-bg p-3">
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            {d.geomagLat}
          </p>
          <p className="mt-1 font-mono text-base font-semibold" style={{ color: "var(--foreground)" }}>
            {country.geomag_lat.toFixed(1)}&deg;
          </p>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-3">
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            {d.fieldStrength}
          </p>
          <p className="mt-1 font-mono text-base font-semibold" style={{ color: "var(--foreground)" }}>
            {country.field_uT.toFixed(1)} &micro;T
          </p>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-3">
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            {d.blueEye}
          </p>
          <p className="mt-1 font-mono text-base font-semibold" style={{ color: "var(--foreground)" }}>
            {(country.blue_eye_frac * 100).toFixed(0)}%
          </p>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-3">
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            {d.lactoseTol}
          </p>
          <p className="mt-1 font-mono text-base font-semibold" style={{ color: "var(--foreground)" }}>
            {(country.lactose_tol_frac * 100).toFixed(0)}%
          </p>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-3">
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            {d.larmorFreq}
          </p>
          <p className="mt-1 font-mono text-base font-semibold" style={{ color: "var(--foreground)" }}>
            {(computed.larmor * 1e3).toFixed(1)} Hz
          </p>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-3">
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            {d.chiB}
          </p>
          <p className="mt-1 font-mono text-base font-semibold" style={{ color: "var(--foreground)" }}>
            {computed.chiB.toFixed(6)}
          </p>
        </div>
      </div>

      {/* Northern Package section */}
      <section
        className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6"
      >
        <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--foreground)" }}>
          {d.northernPackage}
        </h3>

        {/* Component summary */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mt-4 mb-6">
          <div className="rounded-lg border border-card-border bg-background p-3">
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              {d.chiOptical}
            </p>
            <p className="mt-1 font-mono text-sm font-semibold" style={{ color: BAR_LABEL_COLORS.optical }}>
              {computed.chiOpt.toFixed(3)}
            </p>
          </div>
          <div className="rounded-lg border border-card-border bg-background p-3">
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              {d.chiMolecular}
            </p>
            <p className="mt-1 font-mono text-sm font-semibold" style={{ color: BAR_LABEL_COLORS.molecular }}>
              {computed.chiMol.toFixed(3)}
            </p>
          </div>
          <div className="rounded-lg border border-card-border bg-background p-3">
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              {d.chiGeomagnetic}
            </p>
            <p className="mt-1 font-mono text-sm font-semibold" style={{ color: BAR_LABEL_COLORS.geomagnetic }}>
              {computed.chiGeo.toFixed(3)}
            </p>
          </div>
          <div className="rounded-lg border border-card-border bg-background p-3">
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              {d.product}
            </p>
            <p className="mt-1 font-mono text-sm font-semibold" style={{ color: BAR_LABEL_COLORS.product }}>
              {computed.product.toFixed(4)}
            </p>
          </div>
        </div>

        {/* Bar chart */}
        <NorthernPackageChart bars={bars} title={d.barChartTitle} />
      </section>

      {/* Note */}
      <p
        className="text-xs leading-relaxed"
        style={{ color: "var(--foreground-muted)" }}
      >
        {d.note}
      </p>
    </div>
  );
}
