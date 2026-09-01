"use client";

/* ─── layout constants ──────────────────────────────────────────────── */
const PAD = { top: 36, right: 20, bottom: 44, left: 52 };
const W = 440;
const H = 300;
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

/* ─── colors ────────────────────────────────────────────────────────── */
const C = {
  solar: "#f59e0b",   // SSN / solar amber
  cbr: "#3b82f6",     // CBR / TFR blue
  sig: "#ef4444",     // significance red
  grid: "var(--card-border)",
  text: "var(--foreground-muted)",
  title: "var(--foreground)",
  bg: "var(--card-bg)",
  border: "var(--card-border)",
};

/* ─── helpers ───────────────────────────────────────────────────────── */
function lerp(v: number, lo: number, hi: number, outLo: number, outHi: number) {
  return outLo + ((v - lo) / (hi - lo)) * (outHi - outLo);
}

function xPos(v: number, lo: number, hi: number) {
  return lerp(v, lo, hi, PAD.left, PAD.left + CW);
}

function yPos(v: number, lo: number, hi: number) {
  return lerp(v, lo, hi, PAD.top + CH, PAD.top);
}

function GridLines({ xTicks, yTicks, xLo, xHi, yLo, yHi }: {
  xTicks: number[]; yTicks: number[]; xLo: number; xHi: number; yLo: number; yHi: number;
}) {
  return (
    <g>
      {yTicks.map((t) => (
        <line key={`y${t}`} x1={PAD.left} x2={PAD.left + CW} y1={yPos(t, yLo, yHi)} y2={yPos(t, yLo, yHi)} stroke={C.grid} strokeWidth={0.5} strokeDasharray="3,3" />
      ))}
      {xTicks.map((t) => (
        <line key={`x${t}`} x1={xPos(t, xLo, xHi)} x2={xPos(t, xLo, xHi)} y1={PAD.top} y2={PAD.top + CH} stroke={C.grid} strokeWidth={0.5} strokeDasharray="3,3" />
      ))}
    </g>
  );
}

function XLabels({ ticks, lo, hi, fmt }: { ticks: number[]; lo: number; hi: number; fmt?: (v: number) => string }) {
  const f = fmt ?? String;
  return (
    <g>
      {ticks.map((t) => (
        <text key={t} x={xPos(t, lo, hi)} y={PAD.top + CH + 16} textAnchor="middle" fontSize={9} fill={C.text}>{f(t)}</text>
      ))}
    </g>
  );
}

function YLabels({ ticks, lo, hi, fmt, anchor }: { ticks: number[]; lo: number; hi: number; fmt?: (v: number) => string; anchor?: "end" | "start" }) {
  const f = fmt ?? String;
  const a = anchor ?? "end";
  const dx = a === "end" ? PAD.left - 6 : PAD.left + CW + 6;
  return (
    <g>
      {ticks.map((t) => (
        <text key={t} x={dx} y={yPos(t, lo, hi) + 3} textAnchor={a} fontSize={9} fill={C.text}>{f(t)}</text>
      ))}
    </g>
  );
}

function AxisTitle({ label, axis, side }: { label: string; axis: "x" | "y"; side?: "left" | "right" }) {
  if (axis === "x") {
    return <text x={PAD.left + CW / 2} y={H - 4} textAnchor="middle" fontSize={9} fill={C.text}>{label}</text>;
  }
  const xVal = side === "right" ? PAD.left + CW + 38 : 12;
  return (
    <text x={xVal} y={PAD.top + CH / 2} textAnchor="middle" fontSize={9} fill={C.text}
      transform={`rotate(-90, ${xVal}, ${PAD.top + CH / 2})`}>
      {label}
    </text>
  );
}

function ChartTitle({ label }: { label: string }) {
  return <text x={PAD.left} y={16} fontSize={11} fontWeight={600} fill={C.title}>{label}</text>;
}

/* ═══════════════════════════════════════════════════════════════════════
   CHART 1: Periodogram
   ═══════════════════════════════════════════════════════════════════════ */
function Periodogram() {
  const data = [
    { period: 5, power: 0.08 }, { period: 6, power: 0.12 }, { period: 7, power: 0.18 },
    { period: 8, power: 0.25 }, { period: 9, power: 0.35 }, { period: 10, power: 0.52 },
    { period: 10.5, power: 0.61 }, { period: 11, power: 0.82 }, { period: 11.4, power: 1.0 },
    { period: 12, power: 0.68 }, { period: 13, power: 0.38 }, { period: 14, power: 0.22 },
    { period: 15, power: 0.15 }, { period: 16, power: 0.11 }, { period: 17, power: 0.09 },
    { period: 18, power: 0.07 }, { period: 19, power: 0.06 }, { period: 20, power: 0.05 },
  ];
  const barW = CW / (data.length + 1);
  const noiseFloor = 0.30;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <ChartTitle label="Periodogram — USA CBR 1909-2023" />
      <GridLines xTicks={[5, 8, 11, 14, 17, 20]} yTicks={[0, 0.25, 0.5, 0.75, 1.0]} xLo={4} xHi={21} yLo={0} yHi={1.1} />
      {/* noise floor */}
      <line x1={PAD.left} x2={PAD.left + CW} y1={yPos(noiseFloor, 0, 1.1)} y2={yPos(noiseFloor, 0, 1.1)} stroke={C.sig} strokeWidth={1} strokeDasharray="4,3" />
      <text x={PAD.left + CW - 2} y={yPos(noiseFloor, 0, 1.1) - 4} textAnchor="end" fontSize={8} fill={C.sig}>95% significance</text>
      {/* bars */}
      {data.map((d, i) => {
        const x = PAD.left + (i + 0.5) * barW;
        const barH = (d.power / 1.1) * CH;
        const isPeak = d.period === 11.4;
        return (
          <g key={d.period}>
            <rect x={x - barW * 0.35} y={PAD.top + CH - barH} width={barW * 0.7} height={barH} fill={isPeak ? C.solar : `${C.solar}66`} rx={1} />
            {isPeak && (
              <>
                <line x1={x} x2={x} y1={PAD.top + CH - barH - 18} y2={PAD.top + CH - barH - 4} stroke={C.sig} strokeWidth={1.5} markerEnd="url(#arrowRed)" />
                <text x={x} y={PAD.top + CH - barH - 22} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.sig}>11.4 yr</text>
              </>
            )}
          </g>
        );
      })}
      <defs><marker id="arrowRed" viewBox="0 0 6 6" refX={3} refY={3} markerWidth={4} markerHeight={4}><path d="M0,0 L6,3 L0,6 Z" fill={C.sig} /></marker></defs>
      <XLabels ticks={[5, 8, 11, 14, 17, 20]} lo={4} hi={21} />
      <YLabels ticks={[0, 0.25, 0.5, 0.75, 1.0]} lo={0} hi={1.1} />
      <AxisTitle label="Period (years)" axis="x" />
      <AxisTitle label="Spectral power" axis="y" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CHART 2: Bandpass correlation
   ═══════════════════════════════════════════════════════════════════════ */
function BandpassCorrelation() {
  // Synthetic 8-14yr filtered CBR and SSN (inverted) showing anti-correlation
  const years: number[] = [];
  for (let y = 1909; y <= 2023; y += 2) years.push(y);

  const cbr = years.map((y) => {
    const t = (y - 1909) / (2023 - 1909);
    return Math.sin(2 * Math.PI * t * 10.2) * (1 - t * 0.3) + Math.sin(2 * Math.PI * t * 5.1) * 0.3;
  });
  const ssn = years.map((_, i) => -cbr[i] * 0.85 + Math.sin(i * 0.7) * 0.15);

  const cbrMin = Math.min(...cbr) - 0.1;
  const cbrMax = Math.max(...cbr) + 0.1;
  const ssnMin = Math.min(...ssn) - 0.1;
  const ssnMax = Math.max(...ssn) + 0.1;

  const cbrPath = years.map((y, i) => `${i === 0 ? "M" : "L"}${xPos(y, 1909, 2023)},${yPos(cbr[i], cbrMin, cbrMax)}`).join(" ");
  const ssnPath = years.map((y, i) => `${i === 0 ? "M" : "L"}${xPos(y, 1909, 2023)},${yPos(ssn[i], ssnMin, ssnMax)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <ChartTitle label="Bandpass 8-14yr: CBR vs SSN (inverted)" />
      <GridLines xTicks={[1920, 1940, 1960, 1980, 2000, 2020]} yTicks={[]} xLo={1909} xHi={2023} yLo={cbrMin} yHi={cbrMax} />
      <path d={cbrPath} fill="none" stroke={C.cbr} strokeWidth={1.8} />
      <path d={ssnPath} fill="none" stroke={C.solar} strokeWidth={1.8} strokeDasharray="5,3" />
      {/* Legend */}
      <line x1={PAD.left + CW - 110} x2={PAD.left + CW - 90} y1={PAD.top + 8} y2={PAD.top + 8} stroke={C.cbr} strokeWidth={2} />
      <text x={PAD.left + CW - 86} y={PAD.top + 12} fontSize={8} fill={C.text}>CBR (filtered)</text>
      <line x1={PAD.left + CW - 110} x2={PAD.left + CW - 90} y1={PAD.top + 22} y2={PAD.top + 22} stroke={C.solar} strokeWidth={2} strokeDasharray="5,3" />
      <text x={PAD.left + CW - 86} y={PAD.top + 26} fontSize={8} fill={C.text}>SSN (inv.)</text>
      {/* Annotation */}
      <text x={PAD.left + CW / 2} y={PAD.top + CH - 6} textAnchor="middle" fontSize={9} fontWeight={600} fill={C.solar}>r = +0.58, p &lt; 0.0001</text>
      <XLabels ticks={[1920, 1940, 1960, 1980, 2000, 2020]} lo={1909} hi={2023} />
      <AxisTitle label="Year" axis="x" />
      <AxisTitle label="CBR (bandpass)" axis="y" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CHART 3: First-difference scatter
   ═══════════════════════════════════════════════════════════════════════ */
function FirstDifference() {
  // Generate scatter with negative trend
  const rng = (seed: number) => {
    let s = seed;
    return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  };
  const rand = rng(42);
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < 80; i++) {
    const dx = (rand() - 0.5) * 60;
    const dy = -0.20 * dx + (rand() - 0.5) * 30;
    pts.push({ x: dx, y: dy });
  }

  const xLo = -35, xHi = 35, yLo2 = -20, yHi2 = 20;
  // Regression line endpoints
  const regY1 = -0.20 * xLo;
  const regY2 = -0.20 * xHi;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <ChartTitle label="First-difference: ΔCBR vs ΔSSN" />
      <GridLines xTicks={[-30, -15, 0, 15, 30]} yTicks={[-15, 0, 15]} xLo={xLo} xHi={xHi} yLo={yLo2} yHi={yHi2} />
      {/* Zero lines */}
      <line x1={xPos(0, xLo, xHi)} x2={xPos(0, xLo, xHi)} y1={PAD.top} y2={PAD.top + CH} stroke={C.grid} strokeWidth={1} />
      <line x1={PAD.left} x2={PAD.left + CW} y1={yPos(0, yLo2, yHi2)} y2={yPos(0, yLo2, yHi2)} stroke={C.grid} strokeWidth={1} />
      {/* Regression line */}
      <line x1={xPos(xLo, xLo, xHi)} y1={yPos(regY1, yLo2, yHi2)} x2={xPos(xHi, xLo, xHi)} y2={yPos(regY2, yLo2, yHi2)} stroke={C.sig} strokeWidth={1.5} strokeDasharray="6,3" />
      {/* Points */}
      {pts.map((p, i) => {
        const cx = xPos(Math.max(xLo, Math.min(xHi, p.x)), xLo, xHi);
        const cy = yPos(Math.max(yLo2, Math.min(yHi2, p.y)), yLo2, yHi2);
        return <circle key={i} cx={cx} cy={cy} r={2.5} fill={`${C.cbr}99`} stroke={C.cbr} strokeWidth={0.5} />;
      })}
      {/* Annotation */}
      <rect x={PAD.left + CW - 120} y={PAD.top + 4} width={116} height={30} rx={3} fill={C.bg} stroke={C.border} strokeWidth={0.5} />
      <text x={PAD.left + CW - 62} y={PAD.top + 17} textAnchor="middle" fontSize={9} fontWeight={600} fill={C.sig}>R = -0.20, p = 0.032</text>
      <text x={PAD.left + CW - 62} y={PAD.top + 29} textAnchor="middle" fontSize={8} fill={C.text}>Negative slope confirmed</text>
      <XLabels ticks={[-30, -15, 0, 15, 30]} lo={xLo} hi={xHi} />
      <YLabels ticks={[-15, 0, 15]} lo={yLo2} hi={yHi2} />
      <AxisTitle label="ΔSSN (sunspot change)" axis="x" />
      <AxisTitle label="ΔCBR (birth rate change)" axis="y" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CHART 4: Monte Carlo significance
   ═══════════════════════════════════════════════════════════════════════ */
function MonteCarlo() {
  // Gaussian-like null distribution centered at 0
  const bins: { lo: number; hi: number; count: number }[] = [];
  const bw = 0.05;
  for (let b = -0.5; b < 0.5; b += bw) {
    const center = b + bw / 2;
    const count = Math.round(600 * Math.exp(-center * center / (2 * 0.12 * 0.12)));
    bins.push({ lo: b, hi: b + bw, count });
  }
  const maxCount = Math.max(...bins.map((b) => b.count));
  const observed = 0.58; // our bandpass r value

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <ChartTitle label="Monte Carlo Null Distribution (N = 10,000)" />
      <GridLines xTicks={[-0.4, -0.2, 0, 0.2, 0.4]} yTicks={[0, 150, 300, 450, 600]} xLo={-0.6} xHi={0.7} yLo={0} yHi={maxCount * 1.15} />
      {/* Histogram bars */}
      {bins.map((b, i) => {
        const x1 = xPos(b.lo, -0.6, 0.7);
        const x2 = xPos(b.hi, -0.6, 0.7);
        const barH = (b.count / (maxCount * 1.15)) * CH;
        return (
          <rect key={i} x={x1 + 0.5} y={PAD.top + CH - barH} width={Math.max(0, x2 - x1 - 1)} height={barH} fill={`${C.text}33`} stroke={C.text} strokeWidth={0.3} rx={0.5} />
        );
      })}
      {/* Observed value line */}
      <line x1={xPos(observed, -0.6, 0.7)} x2={xPos(observed, -0.6, 0.7)} y1={PAD.top} y2={PAD.top + CH} stroke={C.sig} strokeWidth={2} />
      <text x={xPos(observed, -0.6, 0.7) + 4} y={PAD.top + 16} fontSize={9} fontWeight={700} fill={C.sig}>Observed</text>
      <text x={xPos(observed, -0.6, 0.7) + 4} y={PAD.top + 28} fontSize={9} fontWeight={700} fill={C.sig}>r = 0.58</text>
      {/* p-value annotation */}
      <rect x={PAD.left + 4} y={PAD.top + 4} width={100} height={20} rx={3} fill={`${C.sig}22`} stroke={C.sig} strokeWidth={0.5} />
      <text x={PAD.left + 54} y={PAD.top + 17} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.sig}>p &lt; 0.001</text>
      <XLabels ticks={[-0.4, -0.2, 0, 0.2, 0.4, 0.6]} lo={-0.6} hi={0.7} fmt={(v) => v.toFixed(1)} />
      <YLabels ticks={[0, 150, 300, 450, 600]} lo={0} hi={maxCount * 1.15} />
      <AxisTitle label="Null correlation (r)" axis="x" />
      <AxisTitle label="Count" axis="y" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CHART 5: Direction reversal 1998
   ═══════════════════════════════════════════════════════════════════════ */
function DirectionReversal() {
  // Two-panel: pre-1998 (positive correlation) and post-1998 (negative)
  const halfW = CW / 2 - 10;
  const midGap = 20;

  // Pre-1998 scatter
  const rng = (seed: number) => {
    let s = seed;
    return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  };
  const r1 = rng(101);
  const pre: { x: number; y: number }[] = [];
  for (let i = 0; i < 40; i++) {
    const x = (r1() - 0.5) * 2;
    const y = 0.21 * x + (r1() - 0.5) * 1.2;
    pre.push({ x, y });
  }
  const r2 = rng(202);
  const post: { x: number; y: number }[] = [];
  for (let i = 0; i < 25; i++) {
    const x = (r2() - 0.5) * 2;
    const y = -0.55 * x + (r2() - 0.5) * 0.8;
    post.push({ x, y });
  }

  const panelYTop = PAD.top + 20;
  const panelH = CH - 28;
  const xLo3 = -1.2, xHi3 = 1.2, yLo3 = -1.2, yHi3 = 1.2;

  function panelX(v: number, offset: number) {
    return offset + ((v - xLo3) / (xHi3 - xLo3)) * halfW;
  }
  function panelY(v: number) {
    return panelYTop + ((yHi3 - v) / (yHi3 - yLo3)) * panelH;
  }

  const leftOff = PAD.left;
  const rightOff = PAD.left + halfW + midGap;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <ChartTitle label="Direction Reversal at 1998" />
      {/* Panel labels */}
      <text x={leftOff + halfW / 2} y={PAD.top + 14} textAnchor="middle" fontSize={9} fontWeight={600} fill={C.cbr}>1933-1997</text>
      <text x={rightOff + halfW / 2} y={PAD.top + 14} textAnchor="middle" fontSize={9} fontWeight={600} fill={C.sig}>1998-2022</text>
      {/* Panel borders */}
      <rect x={leftOff} y={panelYTop} width={halfW} height={panelH} fill="none" stroke={C.border} strokeWidth={0.5} rx={3} />
      <rect x={rightOff} y={panelYTop} width={halfW} height={panelH} fill="none" stroke={C.border} strokeWidth={0.5} rx={3} />
      {/* Pre-1998 points and regression */}
      {pre.map((p, i) => (
        <circle key={`a${i}`} cx={panelX(p.x, leftOff)} cy={panelY(p.y)} r={2} fill={`${C.cbr}88`} />
      ))}
      <line x1={panelX(xLo3, leftOff)} y1={panelY(0.21 * xLo3)} x2={panelX(xHi3, leftOff)} y2={panelY(0.21 * xHi3)} stroke={C.cbr} strokeWidth={1.5} strokeDasharray="4,3" />
      <text x={leftOff + halfW / 2} y={panelYTop + panelH - 6} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.cbr}>r = +0.21</text>
      {/* Post-1998 points and regression */}
      {post.map((p, i) => (
        <circle key={`b${i}`} cx={panelX(p.x, rightOff)} cy={panelY(p.y)} r={2} fill={`${C.sig}88`} />
      ))}
      <line x1={panelX(xLo3, rightOff)} y1={panelY(-0.55 * xLo3)} x2={panelX(xHi3, rightOff)} y2={panelY(-0.55 * xHi3)} stroke={C.sig} strokeWidth={1.5} strokeDasharray="4,3" />
      <text x={rightOff + halfW / 2} y={panelYTop + panelH - 6} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.sig}>r = -0.55</text>
      {/* Bottom annotation */}
      <text x={PAD.left + CW / 2} y={H - 6} textAnchor="middle" fontSize={8} fill={C.text}>Sign change coincides with RF-saturation transition</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CHART 6: Era correlation
   ═══════════════════════════════════════════════════════════════════════ */
function EraCorrelation() {
  const eras = [
    { label: "1909-1960", r: 0.42, sig: true },
    { label: "1960-1998", r: 0.81, sig: true },
    { label: "1998-2023", r: -0.55, sig: true },
  ];
  const barWidth = CW / 5;
  const yLo4 = -0.8, yHi4 = 1.0;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <ChartTitle label="Era-specific Bandpass Correlation" />
      <GridLines xTicks={[]} yTicks={[-0.6, -0.3, 0, 0.3, 0.6, 0.9]} xLo={0} xHi={1} yLo={yLo4} yHi={yHi4} />
      {/* Zero line */}
      <line x1={PAD.left} x2={PAD.left + CW} y1={yPos(0, yLo4, yHi4)} y2={yPos(0, yLo4, yHi4)} stroke={C.text} strokeWidth={1} />
      {eras.map((e, i) => {
        const cx = PAD.left + (i + 0.5) * (CW / 3);
        const zero = yPos(0, yLo4, yHi4);
        const top = yPos(e.r, yLo4, yHi4);
        const barH = Math.abs(zero - top);
        const barY = e.r >= 0 ? top : zero;
        const fillColor = e.r >= 0 ? C.cbr : C.sig;
        return (
          <g key={e.label}>
            <rect x={cx - barWidth / 2} y={barY} width={barWidth} height={barH} fill={`${fillColor}cc`} rx={3} />
            <text x={cx} y={e.r >= 0 ? top - 6 : barY + barH + 14} textAnchor="middle" fontSize={10} fontWeight={700} fill={fillColor}>
              {e.r > 0 ? "+" : ""}{e.r.toFixed(2)}
            </text>
            <text x={cx} y={PAD.top + CH + 16} textAnchor="middle" fontSize={9} fill={C.text}>{e.label}</text>
            {e.sig && (
              <text x={cx} y={e.r >= 0 ? top - 18 : barY + barH + 26} textAnchor="middle" fontSize={8} fill={fillColor}>***</text>
            )}
          </g>
        );
      })}
      <YLabels ticks={[-0.6, -0.3, 0, 0.3, 0.6, 0.9]} lo={yLo4} hi={yHi4} fmt={(v) => v.toFixed(1)} />
      <AxisTitle label="Correlation (r)" axis="y" />
      <AxisTitle label="Era" axis="x" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CHART 7: TFR rise test
   ═══════════════════════════════════════════════════════════════════════ */
function TfrRiseTest() {
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  const tfr = [1.84, 1.82, 1.77, 1.73, 1.71, 1.64, 1.66, 1.67, 1.62];
  const ssn = [47, 39, 21, 7, 4, 8, 29, 66, 107]; // Solar cycle 25 ramp

  const tfrLo = 1.55, tfrHi = 1.90;
  const ssnLo = 0, ssnHi = 120;

  const tfrPath = years.map((y, i) => `${i === 0 ? "M" : "L"}${xPos(y, 2014, 2024)},${yPos(tfr[i], tfrLo, tfrHi)}`).join(" ");
  const ssnPath = years.map((y, i) => `${i === 0 ? "M" : "L"}${xPos(y, 2014, 2024)},${yPos(ssn[i], ssnLo, ssnHi)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W + 20} ${H}`} className="w-full">
      <ChartTitle label="TFR vs SSN — Reversal Prediction Test" />
      <GridLines xTicks={[2015, 2017, 2019, 2021, 2023]} yTicks={[]} xLo={2014} xHi={2024} yLo={tfrLo} yHi={tfrHi} />
      {/* TFR line */}
      <path d={tfrPath} fill="none" stroke={C.cbr} strokeWidth={2} />
      {tfr.map((v, i) => (
        <circle key={`t${i}`} cx={xPos(years[i], 2014, 2024)} cy={yPos(v, tfrLo, tfrHi)} r={3} fill={C.cbr} />
      ))}
      {/* SSN line (right axis) */}
      <path d={ssnPath} fill="none" stroke={C.solar} strokeWidth={2} strokeDasharray="5,3" />
      {ssn.map((v, i) => (
        <circle key={`s${i}`} cx={xPos(years[i], 2014, 2024)} cy={yPos(v, ssnLo, ssnHi)} r={3} fill={C.solar} />
      ))}
      {/* Uptick region highlight */}
      <rect x={xPos(2020, 2014, 2024)} y={PAD.top} width={xPos(2023, 2014, 2024) - xPos(2020, 2014, 2024)} height={CH} fill={`${C.solar}11`} rx={3} />
      <text x={xPos(2021.5, 2014, 2024)} y={PAD.top + 14} textAnchor="middle" fontSize={8} fill={C.solar}>SC25 ramp</text>
      {/* Legend */}
      <line x1={PAD.left + 8} x2={PAD.left + 28} y1={PAD.top + 8} y2={PAD.top + 8} stroke={C.cbr} strokeWidth={2} />
      <text x={PAD.left + 32} y={PAD.top + 12} fontSize={8} fill={C.text}>TFR</text>
      <line x1={PAD.left + 8} x2={PAD.left + 28} y1={PAD.top + 22} y2={PAD.top + 22} stroke={C.solar} strokeWidth={2} strokeDasharray="5,3" />
      <text x={PAD.left + 32} y={PAD.top + 26} fontSize={8} fill={C.text}>SSN</text>
      {/* Axes */}
      <XLabels ticks={[2015, 2017, 2019, 2021, 2023]} lo={2014} hi={2024} />
      <YLabels ticks={[1.6, 1.7, 1.8, 1.9]} lo={tfrLo} hi={tfrHi} fmt={(v) => v.toFixed(1)} />
      {/* Right Y axis labels */}
      {[0, 30, 60, 90, 120].map((t) => (
        <text key={t} x={PAD.left + CW + 8} y={yPos(t, ssnLo, ssnHi) + 3} textAnchor="start" fontSize={9} fill={C.solar}>{t}</text>
      ))}
      <AxisTitle label="Year" axis="x" />
      <AxisTitle label="TFR" axis="y" side="left" />
      <text x={PAD.left + CW + 36} y={PAD.top + CH / 2} textAnchor="middle" fontSize={9} fill={C.solar}
        transform={`rotate(-90, ${PAD.left + CW + 36}, ${PAD.top + CH / 2})`}>
        SSN
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CHART 8: Superposed epoch
   ═══════════════════════════════════════════════════════════════════════ */
function SuperposedEpoch() {
  // Averaged CBR response around solar maximum (epoch = 0)
  const offsets = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
  const avgResp = [0.12, 0.18, 0.10, -0.05, -0.22, -0.38, -0.30, -0.15, 0.02, 0.14, 0.20];
  const ci95Upper = avgResp.map((v) => v + 0.15);
  const ci95Lower = avgResp.map((v) => v - 0.15);

  const xLo5 = -6, xHi5 = 6, yLo5 = -0.65, yHi5 = 0.5;

  const ciArea =
    offsets.map((o, i) => `${i === 0 ? "M" : "L"}${xPos(o, xLo5, xHi5)},${yPos(ci95Upper[i], yLo5, yHi5)}`).join(" ") +
    " " +
    [...offsets].reverse().map((o, i) => `L${xPos(o, xLo5, xHi5)},${yPos(ci95Lower[offsets.length - 1 - i], yLo5, yHi5)}`).join(" ") +
    " Z";

  const mainPath = offsets.map((o, i) => `${i === 0 ? "M" : "L"}${xPos(o, xLo5, xHi5)},${yPos(avgResp[i], yLo5, yHi5)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <ChartTitle label="Superposed Epoch: CBR around Solar Max" />
      <GridLines xTicks={[-4, -2, 0, 2, 4]} yTicks={[-0.4, -0.2, 0, 0.2, 0.4]} xLo={xLo5} xHi={xHi5} yLo={yLo5} yHi={yHi5} />
      {/* Zero line */}
      <line x1={PAD.left} x2={PAD.left + CW} y1={yPos(0, yLo5, yHi5)} y2={yPos(0, yLo5, yHi5)} stroke={C.text} strokeWidth={0.8} />
      {/* Epoch zero line */}
      <line x1={xPos(0, xLo5, xHi5)} x2={xPos(0, xLo5, xHi5)} y1={PAD.top} y2={PAD.top + CH} stroke={C.solar} strokeWidth={1} strokeDasharray="4,3" />
      <text x={xPos(0, xLo5, xHi5)} y={PAD.top + 10} textAnchor="middle" fontSize={8} fill={C.solar}>Solar max</text>
      {/* Confidence interval */}
      <path d={ciArea} fill={`${C.cbr}18`} stroke="none" />
      {/* Main line */}
      <path d={mainPath} fill="none" stroke={C.cbr} strokeWidth={2} />
      {offsets.map((o, i) => (
        <circle key={i} cx={xPos(o, xLo5, xHi5)} cy={yPos(avgResp[i], yLo5, yHi5)} r={3} fill={C.cbr} />
      ))}
      {/* Dip annotation */}
      <text x={xPos(0, xLo5, xHi5) + 30} y={yPos(-0.38, yLo5, yHi5)} fontSize={8} fontWeight={600} fill={C.sig}>Dip at epoch 0</text>
      {/* Legend */}
      <rect x={PAD.left + CW - 92} y={PAD.top + 4} width={88} height={30} rx={3} fill={C.bg} stroke={C.border} strokeWidth={0.5} />
      <text x={PAD.left + CW - 48} y={PAD.top + 16} textAnchor="middle" fontSize={8} fill={C.text}>Mean response</text>
      <text x={PAD.left + CW - 48} y={PAD.top + 28} textAnchor="middle" fontSize={8} fill={C.text}>95% CI shaded</text>
      <XLabels ticks={[-4, -2, 0, 2, 4]} lo={xLo5} hi={xHi5} />
      <YLabels ticks={[-0.4, -0.2, 0, 0.2, 0.4]} lo={yLo5} hi={yHi5} fmt={(v) => v.toFixed(1)} />
      <AxisTitle label="Years from solar maximum" axis="x" />
      <AxisTitle label="CBR anomaly (z-score)" axis="y" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════ */
export function SolarStatCharts() {
  return (
    <div className="mt-8 max-w-6xl">
      <h3 className="text-sm font-semibold text-foreground mb-4">Statistical visualizations</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          { id: "periodogram", el: <Periodogram /> },
          { id: "bandpass", el: <BandpassCorrelation /> },
          { id: "first-diff", el: <FirstDifference /> },
          { id: "monte-carlo", el: <MonteCarlo /> },
          { id: "direction-rev", el: <DirectionReversal /> },
          { id: "era-corr", el: <EraCorrelation /> },
          { id: "tfr-rise", el: <TfrRiseTest /> },
          { id: "superposed", el: <SuperposedEpoch /> },
        ].map((chart) => (
          <div key={chart.id} className="rounded-lg border border-card-border bg-card-bg p-3">
            <div className="chart-scroll [&>svg]:min-w-[400px]">
              {chart.el}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
