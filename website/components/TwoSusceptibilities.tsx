"use client";

import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    ariaLabel: "L1 geometric response and imported spin-susceptibility candidate",
    leftTitle: "χ_geo(x) — L1 geometric response",
    leftAxisX: "x = √κ·s (dimensionless)",
    leftAxisY: "χ_geo",
    leftKey: "x is dimensionless; raw V/m is not an input",
    leftTargets: "OPEN L0→L2: proxy / V_m / membrane → x",
    leftSource: "L1: metric-volume / geodesic-deviation chain",
    leftFormula: "χ_geo(x) = x / √(1 + x²)",
    rightTitle: "χ_B — imported L3 candidate",
    rightAxisX: "B_ext / B_geo",
    rightAxisY: "χ_B",
    rightKey1: "ISS (B≈0): anomalous",
    rightKey2: "Earth surface: calibrated",
    rightTargets: "Imported L3 candidate: CRY/RPM → pathways B, C",
    rightSource: "Imported spin dynamics; not χ_geo",
    note: "Metric-volume linearization/geodesic deviation gives the signed directional response and the χ_geo(q)=q/√(1+q²) formula at L1. Choosing q=|Ā| through a dimensionless Lorentz-to-Euclidean spatial/scalar projection is L2. Mapping a proxy, V_m or membrane coordinate to q=N(z)—and q to biology—is separately open at L0→L2. χ_B and downstream CRY/RPM biology are imported L3 candidates.",
  },
  fi: {
    ariaLabel: "L1-geometrinen vaste ja tuotu spin-herkkyysehdokas",
    leftTitle: "χ_geo(x) — L1-geometrinen vaste",
    leftAxisX: "x = √κ·s (dimensioton)",
    leftAxisY: "χ_geo",
    leftKey: "x on dimensioton; raaka V/m ei ole syöte",
    leftTargets: "AVOIN L0→L2: proxy / V_m / kalvo → x",
    leftSource: "L1: metriikkatilavuus / geodeesipoikkeamaketju",
    leftFormula: "χ_geo(x) = x / √(1 + x²)",
    rightTitle: "χ_B — tuotu L3-ehdokas",
    rightAxisX: "B_ext / B_geo",
    rightAxisY: "χ_B",
    rightKey1: "ISS (B≈0): anomaalinen",
    rightKey2: "Maanpinta: kalibroitu",
    rightTargets: "Tuotu L3-ehdokas: CRY/RPM → polut B, C",
    rightSource: "Tuotu spin-dynamiikka; ei χ_geo",
    note: "Metriikan tilavuuslinearisaatio/geodeesipoikkeama antaa etumerkillisen suunnatun vasteen ja χ_geo(q)=q/√(1+q²)-kaavan L1-tasolla. Koordinaatin q=|Ā| valinta dimensiottomalla Lorentz→Euklidisella spatiaalinen/skalaari-projektiolla on L2. Proxyn, V_m:n tai kalvokoordinaatin kartoitus q=N(z):ksi ja biologiseksi vasteeksi on erikseen avoin L0→L2-askel. χ_B ja CRY/RPM-biologia ovat tuotuja L3-ehdokkaita.",
  },
  ja: {
    ariaLabel: "L1幾何学的応答と導入されたスピン感受性候補",
    leftTitle: "χ_geo(x) — L1幾何学的応答",
    leftAxisX: "x = √κ·s（無次元）",
    leftAxisY: "χ_geo",
    leftKey: "xは無次元；生のV/mは入力しない",
    leftTargets: "未解決L0→L2：プロキシ／V_m／膜 → x",
    leftSource: "L1：計量体積／測地線偏差の連鎖",
    leftFormula: "χ_geo(x) = x / √(1 + x²)",
    rightTitle: "χ_B — 導入されたL3候補",
    rightAxisX: "B_ext / B_geo",
    rightAxisY: "χ_B",
    rightKey1: "ISS (B≈0): anomalous",
    rightKey2: "Earth surface: calibrated",
    rightTargets: "導入L3候補：CRY/RPM → 経路B、C",
    rightSource: "導入スピンダイナミクス；χ_geoではない",
    note: "計量体積の線形化／測地線偏差は、符号付き方向応答とχ_geo(q)=q/√(1+q²)式をL1で与えます。無次元Lorentz→Euclid空間・スカラー射影によるq=|Ā|の選択はL2です。プロキシ、V_m、膜座標からq=N(z)、さらに生物応答への写像は別の未解決L0→L2段階です。χ_Bと下流CRY/RPM生物学は導入L3候補です。",
  },
  fr: {
    ariaLabel: "Réponse géométrique L1 et candidat de susceptibilité de spin importé",
    leftTitle: "χ_geo(x) — réponse géométrique L1",
    leftAxisX: "x = √κ·s (sans dimension)",
    leftAxisY: "χ_geo",
    leftKey: "x est sans dimension ; aucun V/m brut en entrée",
    leftTargets: "L0→L2 OUVERT : proxy / V_m / membrane → x",
    leftSource: "L1 : volume métrique / déviation géodésique",
    leftFormula: "χ_geo(x) = x / √(1 + x²)",
    rightTitle: "χ_B — candidat L3 importé",
    rightAxisX: "B_ext / B_geo",
    rightAxisY: "χ_B",
    rightKey1: "ISS (B≈0): anomalous",
    rightKey2: "Earth surface: calibrated",
    rightTargets: "Candidat L3 importé : CRY/RPM → voies B, C",
    rightSource: "Dynamique de spin importée ; pas χ_geo",
    note: "La linéarisation du volume métrique/la déviation géodésique donne la réponse directionnelle signée et la formule χ_geo(q)=q/√(1+q²) en L1. Choisir q=|Ā| par une projection spatiale/scalarie sans dimension de Lorentz vers Euclide est L2. Relier un proxy, V_m ou une coordonnée membranaire à q=N(z), puis à une réponse biologique, reste ouvert en L0→L2. χ_B et la biologie CRY/RPM aval sont des candidats L3 importés.",
  },
  ko: {
    ariaLabel: "L1 기하학적 반응과 도입된 스핀 감수성 후보",
    leftTitle: "χ_geo(x) — L1 기하학적 반응",
    leftAxisX: "x = √κ·s (무차원)",
    leftAxisY: "χ_geo",
    leftKey: "x는 무차원이며 원시 V/m은 입력이 아님",
    leftTargets: "열린 L0→L2: 프록시 / V_m / 막 → x",
    leftSource: "L1: 계량 부피 / 측지선 편차 연쇄",
    leftFormula: "χ_geo(x) = x / √(1 + x²)",
    rightTitle: "χ_B — 도입된 L3 후보",
    rightAxisX: "B_ext / B_geo",
    rightAxisY: "χ_B",
    rightKey1: "ISS (B≈0): anomalous",
    rightKey2: "Earth surface: calibrated",
    rightTargets: "도입된 L3 후보: CRY/RPM → 경로 B, C",
    rightSource: "도입된 스핀 동역학; χ_geo가 아님",
    note: "계량 부피 선형화/측지선 편차는 부호 있는 방향 반응과 χ_geo(q)=q/√(1+q²) 공식을 L1에서 줍니다. 무차원 Lorentz→Euclid 공간·스칼라 사영으로 q=|Ā|를 선택하는 것은 L2입니다. 프록시, V_m 또는 막 좌표를 q=N(z)로, 다시 생물학적 반응으로 매핑하는 것은 별도의 열린 L0→L2 단계입니다. χ_B와 하류 CRY/RPM 생물학은 도입된 L3 후보입니다.",
  },
};

/* Restricted L1 curve chi_geo(x), sampled only on dimensionless x. */
function chiGeometric(x: number): number {
  return x / Math.sqrt(1 + x * x);
}

/* Conceptual spin susceptibility: peaks near B_ext/B_geo = 1, drops at 0 and high ratios */
function chiSpin(ratio: number): number {
  /* Gaussian-like: peaks at ratio=1, sigma=0.7 */
  const s = 0.7;
  return Math.exp(-((ratio - 1) ** 2) / (2 * s * s));
}

const PW = 240; // panel width
const PH = 200; // panel height
const P = { top: 24, right: 12, bottom: 36, left: 32 };
const GW = PW - P.left - P.right;
const GH = PH - P.top - P.bottom;
const GAP = 28;
const TOTAL_W = PW * 2 + GAP;

export function TwoSusceptibilities({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);

  /* Left panel: chi_geo(x) over dimensionless x in [0, 10]. */
  const leftN = 60;
  const leftXMax = 10;
  const leftPts: string[] = [];
  for (let i = 0; i <= leftN; i++) {
    const x = (i / leftN) * leftXMax;
    const y = chiGeometric(x);
    const px = P.left + (x / leftXMax) * GW;
    const py = P.top + (1 - y) * GH;
    leftPts.push(`${px},${py}`);
  }

  /* Right panel: chi_B over ratio in [0, 3] */
  const rightN = 60;
  const rightXMax = 3;
  const rightPts: string[] = [];
  for (let i = 0; i <= rightN; i++) {
    const r = (i / rightN) * rightXMax;
    const y = chiSpin(r);
    const px = PW + GAP + P.left + (r / rightXMax) * GW;
    const py = P.top + (1 - y) * GH;
    rightPts.push(`${px},${py}`);
  }

  /* Reference marker at x=10 near the saturation plateau; it is not a membrane calibration. */
  const keyPx = P.left + GW - 4;
  const keyPy = P.top + (1 - 1.0) * GH;

  /* Key points on right: ISS at ratio ~ 0 and Earth at ratio = 1 */
  const issRatio = 0.05;
  const issPx = PW + GAP + P.left + (issRatio / rightXMax) * GW;
  const issPy = P.top + (1 - chiSpin(issRatio)) * GH;
  const earthRatio = 1.0;
  const earthPx = PW + GAP + P.left + (earthRatio / rightXMax) * GW;
  const earthPy = P.top + (1 - chiSpin(earthRatio)) * GH;

  return (
    <div className="w-full max-w-4xl">
      <div className="chart-scroll">
        <svg
        viewBox={`0 0 ${TOTAL_W} ${PH + 70}`}
        className="w-full min-w-[560px] max-w-[760px]"
        role="img"
        aria-label={d.ariaLabel}
      >
        {/* ── LEFT PANEL ── */}
        <g>
          {/* Title */}
          <text
            x={PW / 2} y={12}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            fill="var(--foreground)"
          >
            {d.leftTitle}
          </text>

          {/* Axes */}
          <line
            x1={P.left} y1={P.top} x2={P.left} y2={P.top + GH}
            stroke="var(--foreground-muted)" strokeWidth={0.75}
          />
          <line
            x1={P.left} y1={P.top + GH} x2={P.left + GW} y2={P.top + GH}
            stroke="var(--foreground-muted)" strokeWidth={0.75}
          />

          {/* Y-axis labels */}
          {[0, 0.5, 1.0].map((v) => {
            const y = P.top + (1 - v) * GH;
            return (
              <g key={`ly-${v}`}>
                <line
                  x1={P.left - 3} y1={y} x2={P.left} y2={y}
                  stroke="var(--foreground-muted)" strokeWidth={0.5}
                />
                <text
                  x={P.left - 5} y={y + 3}
                  textAnchor="end" fontSize={7.5}
                  fill="var(--foreground-muted)"
                  fontFamily="ui-monospace, monospace"
                >
                  {v}
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {[0, 2, 4, 6, 8, 10].map((v) => {
            const x = P.left + (v / leftXMax) * GW;
            return (
              <g key={`lx-${v}`}>
                <line
                  x1={x} y1={P.top + GH} x2={x} y2={P.top + GH + 3}
                  stroke="var(--foreground-muted)" strokeWidth={0.5}
                />
                <text
                  x={x} y={P.top + GH + 12}
                  textAnchor="middle" fontSize={7.5}
                  fill="var(--foreground-muted)"
                  fontFamily="ui-monospace, monospace"
                >
                  {v}
                </text>
              </g>
            );
          })}

          {/* Axis labels */}
          <text
            x={P.left + GW / 2} y={P.top + GH + 26}
            textAnchor="middle" fontSize={8.5}
            fill="var(--foreground-muted)"
          >
            {d.leftAxisX}
          </text>
          <text
            x={8} y={P.top + GH / 2}
            textAnchor="middle" fontSize={9}
            fill="var(--foreground-muted)"
            transform={`rotate(-90, 8, ${P.top + GH / 2})`}
          >
            {d.leftAxisY}
          </text>

          {/* Curve */}
          <polyline
            points={leftPts.join(" ")}
            fill="none"
            stroke="var(--foreground)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />

          {/* Chi=1 asymptote */}
          <line
            x1={P.left} y1={P.top}
            x2={P.left + GW} y2={P.top}
            stroke="var(--foreground-muted)"
            strokeWidth={0.5}
            strokeDasharray="3 3"
          />
          <text
            x={P.left + GW + 2} y={P.top + 3}
            fontSize={7} fill="var(--foreground-muted)"
          >
            1.0
          </text>

          {/* Key point marker */}
          <circle cx={keyPx} cy={keyPy + 2} r={3} fill="var(--foreground)" fillOpacity={0.3} stroke="var(--foreground)" strokeWidth={1} />

          {/* Annotations below panel */}
          <text x={P.left} y={PH + 6} fontSize={7.5} fill="var(--foreground-muted)">
            {d.leftKey}
          </text>
          <text x={P.left} y={PH + 18} fontSize={7.5} fill="var(--foreground-muted)">
            {d.leftTargets}
          </text>
          <text x={P.left} y={PH + 30} fontSize={7.5} fill="var(--foreground-muted)">
            {d.leftSource}
          </text>
          <text x={P.left} y={PH + 44} fontSize={8} fill="var(--foreground-muted)" fontFamily="ui-monospace, monospace">
            {d.leftFormula}
          </text>
        </g>

        {/* ── RIGHT PANEL ── */}
        <g>
          {/* Title */}
          <text
            x={PW + GAP + PW / 2} y={12}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            fill="var(--foreground)"
          >
            {d.rightTitle}
          </text>

          {/* Axes */}
          <line
            x1={PW + GAP + P.left} y1={P.top}
            x2={PW + GAP + P.left} y2={P.top + GH}
            stroke="var(--foreground-muted)" strokeWidth={0.75}
          />
          <line
            x1={PW + GAP + P.left} y1={P.top + GH}
            x2={PW + GAP + P.left + GW} y2={P.top + GH}
            stroke="var(--foreground-muted)" strokeWidth={0.75}
          />

          {/* Y-axis labels */}
          {[0, 0.5, 1.0].map((v) => {
            const y = P.top + (1 - v) * GH;
            return (
              <g key={`ry-${v}`}>
                <line
                  x1={PW + GAP + P.left - 3} y1={y} x2={PW + GAP + P.left} y2={y}
                  stroke="var(--foreground-muted)" strokeWidth={0.5}
                />
                <text
                  x={PW + GAP + P.left - 5} y={y + 3}
                  textAnchor="end" fontSize={7.5}
                  fill="var(--foreground-muted)"
                  fontFamily="ui-monospace, monospace"
                >
                  {v}
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {[0, 1, 2, 3].map((v) => {
            const x = PW + GAP + P.left + (v / rightXMax) * GW;
            return (
              <g key={`rx-${v}`}>
                <line
                  x1={x} y1={P.top + GH} x2={x} y2={P.top + GH + 3}
                  stroke="var(--foreground-muted)" strokeWidth={0.5}
                />
                <text
                  x={x} y={P.top + GH + 12}
                  textAnchor="middle" fontSize={7.5}
                  fill="var(--foreground-muted)"
                  fontFamily="ui-monospace, monospace"
                >
                  {v}
                </text>
              </g>
            );
          })}

          {/* Axis labels */}
          <text
            x={PW + GAP + P.left + GW / 2} y={P.top + GH + 26}
            textAnchor="middle" fontSize={8.5}
            fill="var(--foreground-muted)"
          >
            {d.rightAxisX}
          </text>
          <text
            x={PW + GAP + 8} y={P.top + GH / 2}
            textAnchor="middle" fontSize={9}
            fill="var(--foreground-muted)"
            transform={`rotate(-90, ${PW + GAP + 8}, ${P.top + GH / 2})`}
          >
            {d.rightAxisY}
          </text>

          {/* Curve */}
          <polyline
            points={rightPts.join(" ")}
            fill="none"
            stroke="var(--foreground)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />

          {/* Key point markers */}
          <circle cx={issPx} cy={issPy} r={3} fill="none" stroke="var(--foreground)" strokeWidth={1} />
          <text
            x={issPx + 6} y={issPy + 3}
            fontSize={7} fill="var(--foreground-muted)"
          >
            ISS
          </text>

          <circle cx={earthPx} cy={earthPy} r={3} fill="var(--foreground)" fillOpacity={0.3} stroke="var(--foreground)" strokeWidth={1} />
          <text
            x={earthPx + 6} y={earthPy - 4}
            fontSize={7} fill="var(--foreground-muted)"
          >
            Earth
          </text>

          {/* Annotations below panel */}
          <text x={PW + GAP + P.left} y={PH + 6} fontSize={7.5} fill="var(--foreground-muted)">
            {d.rightKey1}
          </text>
          <text x={PW + GAP + P.left} y={PH + 18} fontSize={7.5} fill="var(--foreground-muted)">
            {d.rightKey2}
          </text>
          <text x={PW + GAP + P.left} y={PH + 30} fontSize={7.5} fill="var(--foreground-muted)">
            {d.rightTargets}
          </text>
          <text x={PW + GAP + P.left} y={PH + 44} fontSize={7.5} fill="var(--foreground-muted)">
            {d.rightSource}
          </text>
        </g>
        </svg>
      </div>

      {/* Note */}
      <p className="text-xs text-foreground-muted mt-3 max-w-3xl leading-relaxed">
        {d.note}
      </p>
    </div>
  );
}
