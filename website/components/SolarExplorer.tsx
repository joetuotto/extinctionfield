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
  { code: "FIN", name: "Finland", geomag_lat: 64.0, field_uT: 52.5, blue_eye_frac: 0.89, lactose_tol_frac: 0.82 },
  { code: "SWE", name: "Sweden", geomag_lat: 63.0, field_uT: 51.8, blue_eye_frac: 0.78, lactose_tol_frac: 0.79 },
  { code: "NOR", name: "Norway", geomag_lat: 62.5, field_uT: 51.2, blue_eye_frac: 0.72, lactose_tol_frac: 0.85 },
  { code: "EST", name: "Estonia", geomag_lat: 58.5, field_uT: 49.5, blue_eye_frac: 0.53, lactose_tol_frac: 0.75 },
  { code: "DNK", name: "Denmark", geomag_lat: 56.0, field_uT: 48.8, blue_eye_frac: 0.64, lactose_tol_frac: 0.76 },
  { code: "GBR", name: "United Kingdom", geomag_lat: 54.0, field_uT: 48.2, blue_eye_frac: 0.48, lactose_tol_frac: 0.65 },
  { code: "DEU", name: "Germany", geomag_lat: 51.5, field_uT: 47.5, blue_eye_frac: 0.39, lactose_tol_frac: 0.62 },
  { code: "USA", name: "United States", geomag_lat: 49.0, field_uT: 47.0, blue_eye_frac: 0.27, lactose_tol_frac: 0.65 },
  { code: "FRA", name: "France", geomag_lat: 49.0, field_uT: 46.5, blue_eye_frac: 0.22, lactose_tol_frac: 0.43 },
  { code: "RUS", name: "Russia", geomag_lat: 56.0, field_uT: 50.5, blue_eye_frac: 0.30, lactose_tol_frac: 0.48 },
  { code: "ITA", name: "Italy", geomag_lat: 43.0, field_uT: 44.5, blue_eye_frac: 0.14, lactose_tol_frac: 0.25 },
  { code: "JPN", name: "Japan", geomag_lat: 25.5, field_uT: 42.0, blue_eye_frac: 0.01, lactose_tol_frac: 0.10 },
  { code: "KOR", name: "South Korea", geomag_lat: 27.0, field_uT: 42.5, blue_eye_frac: 0.01, lactose_tol_frac: 0.05 },
  { code: "CHN", name: "China", geomag_lat: 30.0, field_uT: 43.0, blue_eye_frac: 0.01, lactose_tol_frac: 0.12 },
  { code: "IND", name: "India", geomag_lat: 15.0, field_uT: 40.0, blue_eye_frac: 0.02, lactose_tol_frac: 0.35 },
  { code: "BRA", name: "Brazil", geomag_lat: -16.0, field_uT: 23.0, blue_eye_frac: 0.08, lactose_tol_frac: 0.30 },
  { code: "AUS", name: "Australia", geomag_lat: -42.0, field_uT: 55.0, blue_eye_frac: 0.35, lactose_tol_frac: 0.68 },
  { code: "NGA", name: "Nigeria", geomag_lat: 5.0, field_uT: 33.0, blue_eye_frac: 0.01, lactose_tol_frac: 0.15 },
  { code: "EGY", name: "Egypt", geomag_lat: 27.0, field_uT: 40.5, blue_eye_frac: 0.02, lactose_tol_frac: 0.22 },
  { code: "ISR", name: "Israel", geomag_lat: 28.5, field_uT: 41.0, blue_eye_frac: 0.10, lactose_tol_frac: 0.35 },
];

/* ── chi_B computation ───────────────────────────────────────── */

const GYRO_RATIO = 42.577; // MHz/T for proton

function larmorFreqMHz(field_uT: number): number {
  return GYRO_RATIO * (field_uT / 1e6) * 1e6; // f = gamma * B  (MHz)
  // field_uT is in micro-tesla, so B in T = field_uT * 1e-6
  // f in Hz = 42.577e6 * field_uT * 1e-6 = 42.577 * field_uT Hz
  // f in MHz = 42.577 * field_uT * 1e-6 MHz
}

function computeChiB(field_uT: number): number {
  const f = larmorFreqMHz(field_uT); // Larmor frequency in MHz
  const f0 = 1.4; // MHz
  const f1 = 50e-6; // 50 Hz expressed in MHz
  const sigma = 0.5; // MHz
  const sigma1 = 20e-6; // 20 Hz expressed in MHz
  const A = 1.0;
  const A2 = 0.3;

  const r1 = (f - f0) / (2 * sigma);
  const r2 = (f - f1) / (2 * sigma1);
  const term1 = A * Math.exp(-(r1 * r1));
  const term2 = A2 * Math.exp(-(r2 * r2));
  return term1 + term2;
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
    note: "chi_B uses a dual-Gaussian resonance model: chi_B = A * exp(-((f - f0)/(2*sigma))^2) + A2 * exp(-((f - f1)/(2*sigma1))^2), where f is the proton Larmor frequency from the local geomagnetic field. The Northern Package score is the product of three independent coupling channels.",
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
    note: "chi_B kayttaa kaksi-gaussista resonanssimallia: chi_B = A * exp(-((f - f0)/(2*sigma))^2) + A2 * exp(-((f - f1)/(2*sigma1))^2), jossa f on protonin Larmor-taajuus paikallisesta geomagneettisesta kentasta. Pohjoisen paketin pistemäärä on kolmen itsenäisen kytkentakanavan tulo.",
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
    note: "chi_Bは二重ガウス共鳴モデルを使用: chi_B = A * exp(-((f - f0)/(2*sigma))^2) + A2 * exp(-((f - f1)/(2*sigma1))^2)、ここでfは地元の地磁気場からのプロトンラーモア周波数。北方パッケージスコアは3つの独立した結合チャネルの積。",
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
    note: "chi_B utilise un modele de resonance a double gaussienne : chi_B = A * exp(-((f - f0)/(2*sigma))^2) + A2 * exp(-((f - f1)/(2*sigma1))^2), ou f est la frequence de Larmor du proton du champ geomagnetique local. Le score du paquet nordique est le produit de trois canaux de couplage independants.",
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
    note: "chi_B는 이중 가우시안 공명 모델을 사용: chi_B = A * exp(-((f - f0)/(2*sigma))^2) + A2 * exp(-((f - f1)/(2*sigma1))^2), 여기서 f는 지역 지자기장의 양성자 라모어 주파수. 북방 패키지 점수는 세 가지 독립적 결합 채널의 곱.",
  },
} as const;

/* ── Bar chart (SVG) ─────────────────────────────────────────── */

const BAR_COLORS = {
  optical: "#3B82F6",
  molecular: "#F59E0B",
  geomagnetic: "#8B5CF6",
  product: "#10B981",
};

interface BarData {
  label: string;
  value: number;
  color: string;
}

function NorthernPackageChart({ bars, title }: { bars: BarData[]; title: string }) {
  const W = 520;
  const H = 220;
  const PAD = { top: 24, right: 20, bottom: 36, left: 16 };
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
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full min-w-[400px]"
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
                  fill={bar.color}
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
                  y={PAD.top + barAreaH + 16}
                  textAnchor="middle"
                  fill="var(--foreground-muted)"
                  fontSize={9}
                >
                  {bar.label}
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
    const chiB = computeChiB(country.field_uT);
    const chiOpt = computeChiOptical(country.blue_eye_frac);
    const chiMol = computeChiMolecular(country.lactose_tol_frac);
    const chiGeo = computeChiGeomagnetic(country.geomag_lat, country.field_uT);
    const product = chiOpt * chiMol * chiGeo;
    return { larmor, chiB, chiOpt, chiMol, chiGeo, product };
  }, [country]);

  const bars: BarData[] = [
    { label: d.chiOptical.split(" (")[0], value: computed.chiOpt, color: BAR_COLORS.optical },
    { label: d.chiMolecular.split(" (")[0], value: computed.chiMol, color: BAR_COLORS.molecular },
    { label: d.chiGeomagnetic.split(" (")[0], value: computed.chiGeo, color: BAR_COLORS.geomagnetic },
    { label: d.product.split(" (")[0], value: computed.product, color: BAR_COLORS.product },
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
            <p className="mt-1 font-mono text-sm font-semibold" style={{ color: BAR_COLORS.optical }}>
              {computed.chiOpt.toFixed(3)}
            </p>
          </div>
          <div className="rounded-lg border border-card-border bg-background p-3">
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              {d.chiMolecular}
            </p>
            <p className="mt-1 font-mono text-sm font-semibold" style={{ color: BAR_COLORS.molecular }}>
              {computed.chiMol.toFixed(3)}
            </p>
          </div>
          <div className="rounded-lg border border-card-border bg-background p-3">
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              {d.chiGeomagnetic}
            </p>
            <p className="mt-1 font-mono text-sm font-semibold" style={{ color: BAR_COLORS.geomagnetic }}>
              {computed.chiGeo.toFixed(3)}
            </p>
          </div>
          <div className="rounded-lg border border-card-border bg-background p-3">
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              {d.product}
            </p>
            <p className="mt-1 font-mono text-sm font-semibold" style={{ color: BAR_COLORS.product }}>
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
