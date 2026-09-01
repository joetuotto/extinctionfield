"use client";

import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    leftTitle: "χ(Ā) — Geometric susceptibility",
    leftAxisX: "Ā (background field)",
    leftAxisY: "χ",
    leftKey: "Cell membrane: Ā ≈ 7×10⁶ → χ ≈ 1.0",
    leftTargets: "Targets: VGCC → pathways A, D, E",
    leftSource: "Source: Lindgren geometry",
    leftFormula: "χ(Ā) = Ā / √(1 + Ā²)",
    rightTitle: "χ_B — Spin susceptibility",
    rightAxisX: "B_ext / B_geo",
    rightAxisY: "χ_B",
    rightKey1: "ISS (B≈0): anomalous",
    rightKey2: "Earth surface: calibrated",
    rightTargets: "Targets: CRY/RPM → pathways B, C",
    rightSource: "Source: Quantum spin dynamics",
    note: "Both functions predict that biological sensitivity depends on the presence of a background field. The geometric channel (χ) saturates at high Ā; the spin channel (χ_B) requires the geomagnetic field for radical-pair coherence.",
  },
  fi: {
    leftTitle: "χ(Ā) — Geometrinen herkkyys",
    leftAxisX: "Ā (taustakentta)",
    leftAxisY: "χ",
    leftKey: "Solukkalvo: Ā ≈ 7×10⁶ → χ ≈ 1,0",
    leftTargets: "Kohteet: VGCC → polut A, D, E",
    leftSource: "Lahde: Lindgrenin geometria",
    leftFormula: "χ(Ā) = Ā / √(1 + Ā²)",
    rightTitle: "χ_B — Spin-herkkyys",
    rightAxisX: "B_ext / B_geo",
    rightAxisY: "χ_B",
    rightKey1: "ISS (B≈0): anomaalinen",
    rightKey2: "Maanpinta: kalibroitu",
    rightTargets: "Kohteet: CRY/RPM → polut B, C",
    rightSource: "Lahde: Kvanttispin-dynamiikka",
    note: "Molemmat funktiot ennustavat, etta biologinen herkkyys riippuu taustakentan laasnaaolosta. Geometrinen kanava (χ) kyyllastyy korkeilla Ā-arvoilla; spin-kanava (χ_B) vaatii geomagneettisen kentan radikaaliparin koherenssia varten.",
  },
  ja: {
    leftTitle: "χ(Ā) — Geometric susceptibility",
    leftAxisX: "Ā (background field)",
    leftAxisY: "χ",
    leftKey: "Cell membrane: Ā ≈ 7×10⁶ → χ ≈ 1.0",
    leftTargets: "Targets: VGCC → pathways A, D, E",
    leftSource: "Source: Lindgren geometry",
    leftFormula: "χ(Ā) = Ā / √(1 + Ā²)",
    rightTitle: "χ_B — Spin susceptibility",
    rightAxisX: "B_ext / B_geo",
    rightAxisY: "χ_B",
    rightKey1: "ISS (B≈0): anomalous",
    rightKey2: "Earth surface: calibrated",
    rightTargets: "Targets: CRY/RPM → pathways B, C",
    rightSource: "Source: Quantum spin dynamics",
    note: "Both functions predict that biological sensitivity depends on the presence of a background field. The geometric channel (χ) saturates at high Ā; the spin channel (χ_B) requires the geomagnetic field for radical-pair coherence.",
  },
  fr: {
    leftTitle: "χ(Ā) — Geometric susceptibility",
    leftAxisX: "Ā (background field)",
    leftAxisY: "χ",
    leftKey: "Cell membrane: Ā ≈ 7×10⁶ → χ ≈ 1.0",
    leftTargets: "Targets: VGCC → pathways A, D, E",
    leftSource: "Source: Lindgren geometry",
    leftFormula: "χ(Ā) = Ā / √(1 + Ā²)",
    rightTitle: "χ_B — Spin susceptibility",
    rightAxisX: "B_ext / B_geo",
    rightAxisY: "χ_B",
    rightKey1: "ISS (B≈0): anomalous",
    rightKey2: "Earth surface: calibrated",
    rightTargets: "Targets: CRY/RPM → pathways B, C",
    rightSource: "Source: Quantum spin dynamics",
    note: "Both functions predict that biological sensitivity depends on the presence of a background field. The geometric channel (χ) saturates at high Ā; the spin channel (χ_B) requires the geomagnetic field for radical-pair coherence.",
  },
  ko: {
    leftTitle: "χ(Ā) — Geometric susceptibility",
    leftAxisX: "Ā (background field)",
    leftAxisY: "χ",
    leftKey: "Cell membrane: Ā ≈ 7×10⁶ → χ ≈ 1.0",
    leftTargets: "Targets: VGCC → pathways A, D, E",
    leftSource: "Source: Lindgren geometry",
    leftFormula: "χ(Ā) = Ā / √(1 + Ā²)",
    rightTitle: "χ_B — Spin susceptibility",
    rightAxisX: "B_ext / B_geo",
    rightAxisY: "χ_B",
    rightKey1: "ISS (B≈0): anomalous",
    rightKey2: "Earth surface: calibrated",
    rightTargets: "Targets: CRY/RPM → pathways B, C",
    rightSource: "Source: Quantum spin dynamics",
    note: "Both functions predict that biological sensitivity depends on the presence of a background field. The geometric channel (χ) saturates at high Ā; the spin channel (χ_B) requires the geomagnetic field for radical-pair coherence.",
  },
};

/* Curve: chi(A) = A / sqrt(1 + A^2), sampled on 0..20 */
function chiGeometric(a: number): number {
  return a / Math.sqrt(1 + a * a);
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

  /* Left panel: chi(A) over A in [0, 10] */
  const leftN = 60;
  const leftXMax = 10;
  const leftPts: string[] = [];
  for (let i = 0; i <= leftN; i++) {
    const a = (i / leftN) * leftXMax;
    const y = chiGeometric(a);
    const px = P.left + (a / leftXMax) * GW;
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

  /* Key point on left: A=7e6 -> chi ~ 1.0 (off the visible axis but we mark it at the saturation plateau) */
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
        aria-label="Two susceptibility functions"
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
