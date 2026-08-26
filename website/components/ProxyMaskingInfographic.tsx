"use client";

import { useState, useMemo, useCallback } from "react";
import type { Locale } from "@/lib/i18n";

const COPY = {
  en: {
    kicker: "PROCESS OF ELIMINATION",
    title: "Eight explanations tested. One works.",
    healthLabel: "Health burden",
    score: "Score",
  },
  fi: {
    kicker: "ELIMINAATIOPROSESSI",
    title: "Kahdeksan selitystä testattu. Yksi toimii.",
    healthLabel: "Terveyskuorma",
    score: "Pisteet",
  },
} as const;

const TEST_LABELS = {
  en: ["Obesity", "T2D", "Autism", "Sperm", "Depression", "Timing", "Amish", "Lab rats"],
  fi: ["Lihavuus", "T2D", "Autismi", "Siittiöt", "Masennus", "Ajoitus", "Amish", "Lab-rotat"],
} as const;

type Point = readonly [number, number];

interface Explanation {
  id: string;
  label: { en: string; fi: string };
  curve: readonly Point[];
  score: readonly boolean[];
  verdict: { en: string; fi: string };
}

const EXPLANATIONS: readonly Explanation[] = [
  {
    id: "chemicals",
    label: { en: "Chemicals", fi: "Kemikaalit" },
    curve: [[1920,0],[1940,5],[1950,15],[1960,40],[1970,65],[1975,75],[1980,60],[1990,40],[2000,30],[2010,22],[2020,18],[2025,15]],
    score: [false,false,false,true,false,false,false,false],
    verdict: {
      en: "Chemical pollutants peaked around 1975 and have declined steadily since regulation. Health epidemics continued accelerating. Wrong direction.",
      fi: "Kemikaalipäästöt huipussaan n. 1975, sen jälkeen laskeneet säätelyn myötä. Terveysepidemiat jatkoivat kiihtymistään. Väärä suunta.",
    },
  },
  {
    id: "calories",
    label: { en: "Calories", fi: "Kalorit" },
    curve: [[1920,10],[1940,15],[1960,25],[1980,50],[1990,70],[2000,85],[2005,82],[2010,78],[2015,75],[2020,72],[2025,70]],
    score: [false,false,false,false,false,false,false,false],
    verdict: {
      en: "Caloric intake plateaued around 2000 and has since declined, while obesity continued rising. The curves diverge. Timing mismatch.",
      fi: "Kalorien saanti tasaantui n. 2000 ja on sen jälkeen laskenut, mutta lihavuus jatkoi nousua. Käyrät eroavat. Ajoitusvirhe.",
    },
  },
  {
    id: "contraception",
    label: { en: "Contraception", fi: "Ehkäisy" },
    curve: [[1920,0],[1950,2],[1960,10],[1965,30],[1970,55],[1975,70],[1980,80],[1990,85],[2000,87],[2010,88],[2020,89],[2025,89]],
    score: [false,false,false,false,false,false,false,false],
    verdict: {
      en: "Contraception explains part of fertility decline but cannot explain obesity, diabetes, autism, sperm damage, or depression. Wrong scope.",
      fi: "Ehkäisy selittää osan hedelmällisyyden laskusta mutta ei lihavuutta, diabetesta, autismia, siittiövaurioita tai masennusta. Väärä laajuus.",
    },
  },
  {
    id: "inactivity",
    label: { en: "Inactivity", fi: "Inaktiivisuus" },
    curve: [[1920,15],[1940,18],[1960,25],[1980,35],[1990,38],[2000,40],[2010,42],[2020,44],[2025,45]],
    score: [false,false,false,false,false,false,true,false],
    verdict: {
      en: "Physical inactivity has remained relatively stable since the 1990s. Cannot explain the sharp acceleration in health epidemics after 2000. Flat trend.",
      fi: "Fyysinen inaktiivisuus pysynyt suhteellisen vakaana 1990-luvulta. Ei selitä terveysepidemioiden jyrkkää kiihtymistä 2000 jälkeen. Tasainen trendi.",
    },
  },
  {
    id: "climate",
    label: { en: "Climate", fi: "Ilmasto" },
    curve: [[1920,5],[1940,8],[1960,12],[1980,18],[2000,30],[2010,40],[2020,55],[2025,60]],
    score: [false,false,false,false,false,false,false,false],
    verdict: {
      en: "Climate change follows a gradual, linear trajectory. Health epidemics show sharp inflection points (1978, 2000, 2012) that a linear trend cannot produce.",
      fi: "Ilmastonmuutos seuraa asteittaista lineaarista kehitystä. Terveysepidemioissa on jyrkkiä taitekohtia (1978, 2000, 2012) joita lineaarinen trendi ei selitä.",
    },
  },
  {
    id: "socialmedia",
    label: { en: "Social media", fi: "Some" },
    curve: [[1920,0],[1990,0],[2000,0],[2003,2],[2005,10],[2007,25],[2010,50],[2013,65],[2016,75],[2020,82],[2025,88]],
    score: [false,false,false,false,true,false,true,false],
    verdict: {
      en: "Social media emerged after 2003. Obesity, diabetes, autism, and sperm decline were already accelerating long before. Explains only teen depression, and even that partially. Too late.",
      fi: "Sosiaalinen media syntyi 2003 jälkeen. Lihavuus, diabetes, autismi ja siittiölasku kiihtyivät jo kauan ennen sitä. Selittää vain nuorten masennuksen, sekin osittain. Liian myöhäinen.",
    },
  },
  {
    id: "diagnostics",
    label: { en: "Diagnostics", fi: "Diagnostiikka" },
    curve: [[1920,5],[1940,10],[1960,20],[1980,35],[1990,45],[2000,55],[2010,65],[2020,75],[2025,80]],
    score: [false,false,true,false,false,false,false,false],
    verdict: {
      en: "Better diagnostics explain ~20–25% of the autism increase (Nevison 2014). They cannot explain 75–80% of the real rise, nor any of the other four epidemics which use objective measurements (BMI, blood glucose, sperm count).",
      fi: "Parantunut diagnostiikka selittää ~20–25 % autismin kasvusta (Nevison 2014). Se ei selitä 75–80 % todellisesta kasvusta eikä yhtäkään neljästä muusta epidemiasta, jotka käyttävät objektiivisia mittauksia (BMI, verensokeri, siittiöluku).",
    },
  },
  {
    id: "gdp",
    label: { en: "GDP", fi: "BKT" },
    curve: [[1920,5],[1940,10],[1960,25],[1980,45],[1990,55],[2000,65],[2010,72],[2020,78],[2025,82]],
    score: [false,false,false,false,false,false,false,false],
    verdict: {
      en: "GDP growth is collinear with EMF adoption — both rise together. But the Amish are prosperous yet healthy (TFR 6.1), and lab rats on controlled diets also got obese (Klimentidis). Prosperity alone cannot be isolated.",
      fi: "BKT:n kasvu on kollineaarinen EMF-adoption kanssa. Mutta amishit ovat vauraita mutta terveitä (TFR 6.1), ja laboratoriorotat kontrolloidulla ruokavaliolla myös lihoivat (Klimentidis). Vaurautta ei voi eristää.",
    },
  },
  {
    id: "emf",
    label: { en: "EMF", fi: "EMF" },
    curve: [[1920,2],[1930,5],[1940,8],[1950,10],[1960,15],[1970,20],[1978,25],[1985,28],[1991,35],[1995,42],[2000,50],[2005,60],[2007,65],[2010,72],[2012,78],[2015,85],[2020,92],[2025,100]],
    score: [true,true,true,true,true,true,true,true],
    verdict: {
      en: "EMF exposure is the only variable that tracks all five epidemics, matches every inflection point, explains the Amish exception, and accounts for lab animal obesity. 88% of chronic animal studies find effects. 8 out of 8.",
      fi: "EMF-altistus on ainoa muuttuja, joka seuraa kaikkia viittä epidemiaa, vastaa jokaista taitepistettä, selittää amish-poikkeuksen ja laboratoriorottien lihomisen. 88 % kroonisista eläinkokeista löytää vaikutuksia. 8/8.",
    },
  },
] as const;

const HEALTH_BURDEN: readonly Point[] = [
  [1920,1],[1930,2],[1940,3],[1950,5],[1960,8],[1970,12],[1978,18],[1985,25],
  [1991,32],[1995,38],[2000,48],[2005,58],[2007,62],[2010,70],[2012,76],[2015,82],
  [2020,90],[2025,95],
] as const;

/* ---------- SVG helpers ---------- */

const X_MIN = 1920, X_MAX = 2025, Y_MIN = 0, Y_MAX = 100;
const PAD = { l: 45, r: 15, t: 15, b: 30 };
const W = 800, H = 300;
const plotW = W - PAD.l - PAD.r;
const plotH = H - PAD.t - PAD.b;

function toSvg(pt: Point): [number, number] {
  const x = PAD.l + ((pt[0] - X_MIN) / (X_MAX - X_MIN)) * plotW;
  const y = PAD.t + plotH - ((pt[1] - Y_MIN) / (Y_MAX - Y_MIN)) * plotH;
  return [x, y];
}

function polyline(pts: readonly Point[]): string {
  return pts.map((p) => toSvg(p).join(",")).join(" ");
}

function areaPath(pts: readonly Point[]): string {
  const mapped = pts.map(toSvg);
  const baseline = PAD.t + plotH;
  let d = `M${mapped[0][0]},${baseline}`;
  for (const [x, y] of mapped) d += ` L${x},${y}`;
  d += ` L${mapped[mapped.length - 1][0]},${baseline} Z`;
  return d;
}

const DECADES = [1920, 1940, 1960, 1980, 2000, 2020] as const;

/* ---------- Component ---------- */

export default function ProxyMaskingInfographic({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<number | null>(null);
  const t = COPY[locale];
  const tests = TEST_LABELS[locale];

  const handleSelect = useCallback((i: number) => {
    setSelected((prev) => (prev === i ? null : i));
  }, []);

  const sel = selected !== null ? EXPLANATIONS[selected] : null;
  const isEmf = sel?.id === "emf";
  const totalScore = sel ? sel.score.filter(Boolean).length : 0;

  const gridLines = useMemo(() => {
    const lines: JSX.Element[] = [];
    for (const yr of DECADES) {
      const x = toSvg([yr, 0])[0];
      lines.push(
        <g key={yr}>
          <line x1={x} x2={x} y1={PAD.t} y2={PAD.t + plotH} stroke="#1e293b" strokeWidth={1} />
          <text x={x} y={H - 4} textAnchor="middle" fill="#64748b" fontSize={11}>{yr}</text>
        </g>
      );
    }
    for (const v of [0, 25, 50, 75, 100]) {
      const y = toSvg([0, v])[1];
      lines.push(
        <line key={`h${v}`} x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="#1e293b" strokeWidth={1} />
      );
    }
    return lines;
  }, []);

  return (
    <section className="w-full rounded-2xl p-4 sm:p-8" style={{ background: "#0f172a" }}>
      {/* Kicker + Title */}
      <p className="text-xs font-semibold tracking-widest mb-1" style={{ color: "#3b82f6" }}>
        {t.kicker}
      </p>
      <h2 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: "#f1f5f9" }}>
        {t.title}
      </h2>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 mb-5" role="group">
        {EXPLANATIONS.map((ex, i) => {
          const active = selected === i;
          const emf = ex.id === "emf";
          return (
            <button
              key={ex.id}
              onClick={() => handleSelect(i)}
              aria-pressed={active}
              className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              style={{
                border: `1.5px solid ${emf ? "#3b82f6" : "#334155"}`,
                background: active ? (emf ? "#3b82f6" : "#334155") : "transparent",
                color: active ? "#f1f5f9" : emf ? "#3b82f6" : "#94a3b8",
              }}
            >
              {ex.label[locale]}
            </button>
          );
        })}
      </div>

      {/* SVG Chart */}
      <div className="w-full overflow-x-auto mb-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={t.healthLabel}
          className="w-full h-auto min-w-[500px]"
          style={{ maxHeight: 340 }}
        >
          {gridLines}

          {/* Y-axis label */}
          <text x={10} y={PAD.t + plotH / 2} textAnchor="middle" fill="#64748b" fontSize={10}
            transform={`rotate(-90,10,${PAD.t + plotH / 2})`}>
            %
          </text>

          {/* Health burden area (always visible) */}
          <path d={areaPath(HEALTH_BURDEN)} fill="#ef4444" opacity={0.18} className="motion-safe:transition-opacity" />
          <polyline points={polyline(HEALTH_BURDEN)} fill="none" stroke="#ef4444" strokeWidth={2.5} strokeLinejoin="round" />
          <text x={toSvg(HEALTH_BURDEN[HEALTH_BURDEN.length - 3])[0] + 4}
            y={toSvg(HEALTH_BURDEN[HEALTH_BURDEN.length - 3])[1] - 6}
            fill="#ef4444" fontSize={10} fontWeight={600}>
            {t.healthLabel}
          </text>

          {/* Selected explanation curve */}
          {sel && (
            <polyline
              points={polyline(sel.curve)}
              fill="none"
              stroke={isEmf ? "#3b82f6" : "#6b7280"}
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeDasharray={isEmf ? "none" : "6 3"}
              className="motion-safe:transition-all"
            />
          )}
          {sel && (
            <text
              x={toSvg(sel.curve[sel.curve.length - 1])[0]}
              y={toSvg(sel.curve[sel.curve.length - 1])[1] - 6}
              fill={isEmf ? "#3b82f6" : "#6b7280"}
              fontSize={10}
              fontWeight={600}
              textAnchor="end"
            >
              {sel.label[locale]}
            </text>
          )}
        </svg>
      </div>

      {/* Verdict Box */}
      {sel && (
        <div
          className="rounded-xl p-4 sm:p-5 mb-6 motion-safe:animate-[fadeIn_0.2s_ease-out]"
          style={{
            border: `2px solid ${isEmf ? "#22c55e" : "#ef4444"}`,
            background: isEmf ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.06)",
          }}
        >
          <div className="flex items-baseline gap-3 mb-2">
            <span
              className={`font-bold ${isEmf ? "text-2xl" : "text-xl"}`}
              style={{ color: isEmf ? "#22c55e" : "#ef4444" }}
            >
              {totalScore}/8
            </span>
            <span className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
              {sel.label[locale]}
            </span>
          </div>
          <p className={`leading-relaxed ${isEmf ? "text-base" : "text-sm"}`} style={{ color: "#cbd5e1" }}>
            {sel.verdict[locale]}
          </p>
        </div>
      )}

      {/* Scorecard Matrix */}
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-xs sm:text-sm border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left py-2 px-2 sticky left-0 z-10" style={{ color: "#94a3b8", background: "#0f172a" }}></th>
              {tests.map((label) => (
                <th key={label} className="py-2 px-1.5 text-center font-medium" style={{ color: "#94a3b8" }}>
                  {label}
                </th>
              ))}
              <th className="py-2 px-2 text-center font-medium" style={{ color: "#94a3b8" }}>{t.score}</th>
            </tr>
          </thead>
          <tbody>
            {EXPLANATIONS.map((ex, ri) => {
              const rowEmf = ex.id === "emf";
              const rowSelected = selected === ri;
              const rowScore = ex.score.filter(Boolean).length;
              return (
                <tr
                  key={ex.id}
                  onClick={() => handleSelect(ri)}
                  className="cursor-pointer transition-colors"
                  style={{
                    background: rowEmf
                      ? "rgba(59,130,246,0.12)"
                      : rowSelected
                        ? "rgba(148,163,184,0.08)"
                        : "transparent",
                    outline: rowSelected ? "1.5px solid #3b82f6" : "none",
                    borderRadius: 6,
                  }}
                >
                  <td
                    className="py-2 px-2 font-medium whitespace-nowrap sticky left-0 z-10"
                    style={{
                      color: rowEmf ? "#3b82f6" : "#e2e8f0",
                      background: "#0f172a",
                    }}
                  >
                    {ex.label[locale]}
                  </td>
                  {ex.score.map((pass, ci) => (
                    <td key={ci} className="py-2 px-1.5 text-center">
                      {pass ? (
                        <span style={{ color: "#22c55e" }} aria-label="pass">&#x2713;</span>
                      ) : (
                        <span style={{ color: "#334155" }} aria-label="fail">&mdash;</span>
                      )}
                    </td>
                  ))}
                  <td
                    className="py-2 px-2 text-center font-bold"
                    style={{ color: rowEmf ? "#22c55e" : rowScore > 0 ? "#f59e0b" : "#475569" }}
                  >
                    {rowScore}/8
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Inline keyframe for verdict fade-in */}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  );
}
