"use client";

import { useState, useMemo, useCallback } from "react";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";


const COPY = {
  en: {
    kicker: "PROCESS OF ELIMINATION",
    title: "Eight explanations tested. One works.",
    healthLabel: "Health burden",
    score: "Score",
  },
  fi: {
    kicker: "POISSULKUPROSESSI",
    title: "Kahdeksan selitystä testattu. Yksi toimii.",
    healthLabel: "Terveyskuorma",
    score: "Pisteet",
  },
  ja: {
    kicker: "消去法",
    title: "8つの説明を検証。1つが機能する。",
    healthLabel: "健康負荷",
    score: "スコア",
  },
  fr: {
    kicker: "PROCESSUS D'ÉLIMINATION",
    title: "Huit explications testées. Une seule fonctionne.",
    healthLabel: "Charge sanitaire",
    score: "Score",
  },
  ko: {
    kicker: "소거법",
    title: "8가지 설명을 검증. 하나만 작동한다.",
    healthLabel: "건강 부담",
    score: "점수",
  },
} as const;

const TEST_LABELS = {
  en: ["Obesity", "T2D", "Autism", "Sperm", "Depression", "Timing", "Amish", "Lab rats"],
  fi: ["Lihavuus", "T2D", "Autismi", "Siittiöt", "Masennus", "Ajoitus", "Amish", "Lab-rotat"],
  ja: ["肥満", "T2D", "自閉症", "精子", "うつ病", "タイミング", "アーミッシュ", "実験用ラット"],
  fr: ["Obésité", "DT2", "Autisme", "Sperme", "Dépression", "Chronologie", "Amish", "Rats de labo"],
  ko: ["비만", "T2D", "자폐증", "정자", "우울증", "시기", "아미시", "실험용 쥐"],
} as const;

type Point = readonly [number, number];

interface Explanation {
  id: string;
  label: Record<string, string>;
  curve: readonly Point[];
  score: readonly boolean[];
  verdict: Record<string, string>;
}

const EXPLANATIONS: readonly Explanation[] = [
  {
    id: "chemicals",
    label: { en: "Chemicals", fi: "Kemikaalit", ja: "化学物質", fr: "Produits chimiques", ko: "화학물질" },
    curve: [[1920,0],[1940,5],[1950,15],[1960,40],[1970,65],[1975,75],[1980,60],[1990,40],[2000,30],[2010,22],[2020,18],[2025,15]],
    score: [false,false,false,true,false,false,false,false],
    verdict: {
      en: "Chemical pollutants peaked around 1975 and have declined steadily since regulation. Health epidemics continued accelerating. Wrong direction.",
      fi: "Kemikaalipäästöt huipussaan n. 1975, sen jälkeen laskeneet säätelyn myötä. Terveysepidemiat jatkoivat kiihtymistään. Väärä suunta.",
      ja: "化学汚染物質は1975年頃にピークに達し、規制以降着実に減少している。健康疫病は加速し続けた。方向が違う。",
      fr: "Les polluants chimiques ont culminé vers 1975 et diminuent depuis la réglementation. Les épidémies de santé ont continué à s'accélérer. Mauvaise direction.",
      ko: "화학 오염물질은 1975년경 정점에 달했고 규제 이후 꾸준히 감소했다. 건강 유행병은 계속 가속화되었다. 방향이 틀렸다.",
    },
  },
  {
    id: "calories",
    label: { en: "Calories", fi: "Kalorit", ja: "カロリー", fr: "Calories", ko: "칼로리" },
    curve: [[1920,10],[1940,15],[1960,25],[1980,50],[1990,70],[2000,85],[2005,82],[2010,78],[2015,75],[2020,72],[2025,70]],
    score: [false,false,false,false,false,false,false,false],
    verdict: {
      en: "Caloric intake plateaued around 2000 and has since declined, while obesity continued rising. The curves diverge. Timing mismatch.",
      fi: "Kalorien saanti tasaantui n. 2000 ja on sen jälkeen laskenut, mutta lihavuus jatkoi nousua. Käyrät eroavat. Ajoitusvirhe.",
      ja: "カロリー摂取量は2000年頃に横ばいになり、その後減少したが、肥満は上昇し続けた。曲線が乖離する。タイミングの不一致。",
      fr: "L'apport calorique a plafonné vers 2000 et diminue depuis, tandis que l'obésité continue d'augmenter. Les courbes divergent. Décalage temporel.",
      ko: "칼로리 섭취는 2000년경 정체되었고 이후 감소했지만 비만은 계속 증가했다. 곡선이 분기한다. 시기 불일치.",
    },
  },
  {
    id: "contraception",
    label: { en: "Contraception", fi: "Ehkäisy", ja: "避妊", fr: "Contraception", ko: "피임" },
    curve: [[1920,0],[1950,2],[1960,10],[1965,30],[1970,55],[1975,70],[1980,80],[1990,85],[2000,87],[2010,88],[2020,89],[2025,89]],
    score: [false,false,false,false,false,false,false,false],
    verdict: {
      en: "Contraception explains part of fertility decline but cannot explain obesity, diabetes, autism, sperm damage, or depression. Wrong scope.",
      fi: "Ehkäisy selittää osan hedelmällisyyden laskusta mutta ei lihavuutta, diabetesta, autismia, siittiövaurioita tai masennusta. Väärä laajuus.",
      ja: "避妊は出生率低下の一部を説明するが、肥満、糖尿病、自閉症、精子損傷、うつ病は説明できない。範囲が違う。",
      fr: "La contraception explique une partie du déclin de la fertilité mais ne peut expliquer l'obésité, le diabète, l'autisme, les dommages aux spermatozoïdes ou la dépression. Mauvaise portée.",
      ko: "피임은 출산율 감소의 일부를 설명하지만 비만, 당뇨병, 자폐증, 정자 손상, 우울증은 설명할 수 없다. 범위가 틀렸다.",
    },
  },
  {
    id: "inactivity",
    label: { en: "Inactivity", fi: "Inaktiivisuus", ja: "運動不足", fr: "Inactivité", ko: "운동 부족" },
    curve: [[1920,15],[1940,18],[1960,25],[1980,35],[1990,38],[2000,40],[2010,42],[2020,44],[2025,45]],
    score: [false,false,false,false,false,false,true,false],
    verdict: {
      en: "Physical inactivity has remained relatively stable since the 1990s. Cannot explain the sharp acceleration in health epidemics after 2000. Flat trend.",
      fi: "Fyysinen inaktiivisuus pysynyt suhteellisen vakaana 1990-luvulta. Ei selitä terveysepidemioiden jyrkkää kiihtymistä 2000 jälkeen. Tasainen trendi.",
      ja: "身体的不活動は1990年代から比較的安定している。2000年以降の健康疫病の急激な加速を説明できない。横ばいの傾向。",
      fr: "L'inactivité physique est restée relativement stable depuis les années 1990. Ne peut expliquer l'accélération brutale des épidémies de santé après 2000. Tendance plate.",
      ko: "신체 활동 부족은 1990년대 이후 비교적 안정적이었다. 2000년 이후 건강 유행병의 급격한 가속을 설명할 수 없다. 평탄한 추세.",
    },
  },
  {
    id: "climate",
    label: { en: "Climate", fi: "Ilmasto", ja: "気候", fr: "Climat", ko: "기후" },
    curve: [[1920,5],[1940,8],[1960,12],[1980,18],[2000,30],[2010,40],[2020,55],[2025,60]],
    score: [false,false,false,false,false,false,false,false],
    verdict: {
      en: "Climate change follows a gradual, linear trajectory. Health epidemics show sharp inflection points (1978, 2000, 2012) that a linear trend cannot produce.",
      fi: "Ilmastonmuutos seuraa asteittaista lineaarista kehitystä. Terveysepidemioissa on jyrkkiä taitekohtia (1978, 2000, 2012) joita lineaarinen trendi ei selitä.",
      ja: "気候変動は緩やかで線形の軌跡をたどる。健康疫病は線形傾向では生じ得ない急激な変曲点（1978年、2000年、2012年）を示す。",
      fr: "Le changement climatique suit une trajectoire graduelle et linéaire. Les épidémies de santé montrent des points d'inflexion marqués (1978, 2000, 2012) qu'une tendance linéaire ne peut produire.",
      ko: "기후변화는 점진적이고 선형적인 궤적을 따른다. 건강 유행병은 선형 추세로는 설명할 수 없는 급격한 변곡점(1978년, 2000년, 2012년)을 보인다.",
    },
  },
  {
    id: "socialmedia",
    label: { en: "Social media", fi: "Some", ja: "ソーシャルメディア", fr: "Réseaux sociaux", ko: "소셜 미디어" },
    curve: [[1920,0],[1990,0],[2000,0],[2003,2],[2005,10],[2007,25],[2010,50],[2013,65],[2016,75],[2020,82],[2025,88]],
    score: [false,false,false,false,true,false,true,false],
    verdict: {
      en: "Social media emerged after 2003. Obesity, diabetes, autism, and sperm decline were already accelerating long before. Explains only teen depression, and even that partially. Too late.",
      fi: "Sosiaalinen media syntyi 2003 jälkeen. Lihavuus, diabetes, autismi ja siittiölasku kiihtyivät jo kauan ennen sitä. Selittää vain nuorten masennuksen, sekin osittain. Liian myöhäinen.",
      ja: "ソーシャルメディアは2003年以降に登場。肥満、糖尿病、自閉症、精子減少はずっと以前から加速していた。説明できるのは10代のうつ病のみで、それも部分的。遅すぎる。",
      fr: "Les réseaux sociaux sont apparus après 2003. L'obésité, le diabète, l'autisme et le déclin spermatique s'accéléraient déjà bien avant. N'explique que la dépression des adolescents, et encore partiellement. Trop tardif.",
      ko: "소셜 미디어는 2003년 이후에 등장했다. 비만, 당뇨병, 자폐증, 정자 감소는 이미 훨씬 전부터 가속화되고 있었다. 청소년 우울증만 설명하고, 그것도 부분적이다. 너무 늦었다.",
    },
  },
  {
    id: "diagnostics",
    label: { en: "Diagnostics", fi: "Diagnostiikka", ja: "診断", fr: "Diagnostics", ko: "진단" },
    curve: [[1920,5],[1940,10],[1960,20],[1980,35],[1990,45],[2000,55],[2010,65],[2020,75],[2025,80]],
    score: [false,false,true,false,false,false,false,false],
    verdict: {
      en: "Better diagnostics explain ~20–25% of the autism increase ([[ref:autism_real2014|Nevison 2014]]). They cannot explain 75–80% of the real rise, nor any of the other four epidemics which use objective measurements (BMI, blood glucose, sperm count).",
      fi: "Parantunut diagnostiikka selittää ~20–25 % autismin kasvusta ([[ref:autism_real2014|Nevison 2014]]). Se ei selitä 75–80 % todellisesta kasvusta eikä yhtäkään neljästä muusta epidemiasta, jotka käyttävät objektiivisia mittauksia (BMI, verensokeri, siittiöluku).",
      ja: "診断精度の向上は自閉症増加の約20〜25%を説明する（[[ref:autism_real2014|Nevison 2014]]）。しかし実際の増加の75〜80%は説明できず、客観的測定（BMI、血糖値、精子数）を使用する他の4つの疫病のいずれも説明できない。",
      fr: "De meilleurs diagnostics expliquent ~20–25 % de l'augmentation de l'autisme ([[ref:autism_real2014|Nevison 2014]]). Ils ne peuvent expliquer 75–80 % de la hausse réelle, ni aucune des quatre autres épidémies utilisant des mesures objectives (IMC, glycémie, numération des spermatozoïdes).",
      ko: "향상된 진단은 자폐증 증가의 약 20-25%를 설명한다([[ref:autism_real2014|Nevison 2014]]). 그러나 실제 증가의 75-80%와 객관적 측정(BMI, 혈당, 정자 수)을 사용하는 나머지 4개 유행병은 설명할 수 없다.",
    },
  },
  {
    id: "gdp",
    label: { en: "GDP", fi: "BKT", ja: "GDP", fr: "PIB", ko: "GDP" },
    curve: [[1920,5],[1940,10],[1960,25],[1980,45],[1990,55],[2000,65],[2010,72],[2020,78],[2025,82]],
    score: [false,false,false,false,false,false,false,false],
    verdict: {
      en: "GDP growth is collinear with EMF adoption — both rise together. But the Amish are prosperous yet healthy (TFR 6.1), and lab rats on controlled diets also got obese ([[ref:klimentidis2010|Klimentidis]]). Prosperity alone cannot be isolated.",
      fi: "BKT:n kasvu on kollineaarinen EMF-adoption kanssa. Mutta amishit ovat vauraita mutta terveitä (TFR 6.1), ja laboratoriorotat kontrolloidulla ruokavaliolla myös lihoivat ([[ref:klimentidis2010|Klimentidis]]). Vaurautta ei voi eristää.",
      ja: "GDP成長はEMF普及と共線的である — 両方とも同時に上昇する。しかしアーミッシュは裕福だが健康（TFR 6.1）であり、管理食を与えられた実験用ラットも肥満になった（[[ref:klimentidis2010|Klimentidis]]）。繁栄だけでは分離できない。",
      fr: "La croissance du PIB est colinéaire avec l'adoption des EMF — les deux augmentent ensemble. Mais les Amish sont prospères et pourtant en bonne santé (TFR 6,1), et des rats de laboratoire soumis à une alimentation contrôlée sont également devenus obèses ([[ref:klimentidis2010|Klimentidis]]). La prospérité seule ne peut être isolée.",
      ko: "GDP 성장은 EMF 보급과 공선적이다 — 둘 다 함께 상승한다. 그러나 아미시는 번영하지만 건강하고(TFR 6.1), 통제된 식단을 먹은 실험실 쥐도 비만해졌다([[ref:klimentidis2010|Klimentidis]]). 번영만으로는 분리할 수 없다.",
    },
  },
  {
    id: "emf",
    label: { en: "EMF", fi: "EMF", ja: "EMF", fr: "EMF", ko: "EMF" },
    curve: [[1920,2],[1930,5],[1940,8],[1950,10],[1960,15],[1970,20],[1978,25],[1985,28],[1991,35],[1995,42],[2000,50],[2005,60],[2007,65],[2010,72],[2012,78],[2015,85],[2020,92],[2025,100]],
    score: [true,true,true,true,true,true,true,true],
    verdict: {
      en: "EMF exposure is the only variable that tracks all five epidemics, matches every inflection point, explains the Amish exception, and accounts for lab animal obesity. 88% of chronic animal studies find effects. 8 out of 8.",
      fi: "EMF-altistus on ainoa muuttuja, joka seuraa kaikkia viittä epidemiaa, vastaa jokaista taitepistettä, selittää amish-poikkeuksen ja laboratoriorottien lihomisen. 88 % kroonisista eläinkokeista löytää vaikutuksia. 8/8.",
      ja: "EMF曝露は5つの疫病すべてを追跡し、すべての変曲点に一致し、アーミッシュの例外を説明し、実験動物の肥満を説明する唯一の変数である。慢性動物実験の88%が効果を発見。8項目中8項目。",
      fr: "L'exposition aux EMF est la seule variable qui suit les cinq épidémies, correspond à chaque point d'inflexion, explique l'exception amish et rend compte de l'obésité des animaux de laboratoire. 88 % des études animales chroniques trouvent des effets. 8 sur 8.",
      ko: "EMF 노출은 5개 유행병 모두를 추적하고, 모든 변곡점에 일치하며, 아미시 예외를 설명하고, 실험동물 비만을 설명하는 유일한 변수이다. 만성 동물 연구의 88%가 효과를 발견했다. 8개 중 8개.",
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

export default function ProxyMaskingInfographic({ locale }: { locale: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const t = pickCopy(COPY, locale);
  const tests = pickCopy(TEST_LABELS, locale);

  const handleSelect = useCallback((i: number) => {
    setSelected((prev) => (prev === i ? null : i));
  }, []);

  const sel = selected !== null ? EXPLANATIONS[selected] : null;
  const isEmf = sel?.id === "emf";
  const totalScore = sel ? sel.score.filter(Boolean).length : 0;

  const gridLines = useMemo(() => {
    const lines: React.JSX.Element[] = [];
    for (const yr of DECADES) {
      const x = toSvg([yr, 0])[0];
      lines.push(
        <g key={yr}>
          <line x1={x} x2={x} y1={PAD.t} y2={PAD.t + plotH} stroke="var(--chart-grid)" strokeWidth={1} />
          <text x={x} y={H - 4} textAnchor="middle" fill="var(--foreground-muted)" fontSize={11}>{yr}</text>
        </g>
      );
    }
    for (const v of [0, 25, 50, 75, 100]) {
      const y = toSvg([0, v])[1];
      lines.push(
        <line key={`h${v}`} x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="var(--chart-grid)" strokeWidth={1} />
      );
    }
    return lines;
  }, []);

  return (
    <section
      className="w-full rounded-2xl border border-card-border p-4 sm:p-8"
      style={{ background: "var(--figure-bg)" }}
    >
      {/* Kicker + Title */}
      <p className="text-xs font-semibold tracking-widest mb-1" style={{ color: "var(--accent)" }}>
        {t.kicker}
      </p>
      <h2 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: "var(--foreground)" }}>
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
                border: `1.5px solid ${emf ? "var(--accent)" : "var(--card-border)"}`,
                background: active ? (emf ? "var(--accent)" : "var(--background-secondary)") : "transparent",
                color: active ? (emf ? "#fff" : "var(--foreground)") : emf ? "var(--accent)" : "var(--foreground-muted)",
              }}
            >
              {ex.label[locale] ?? ex.label.en}
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
          <text x={10} y={PAD.t + plotH / 2} textAnchor="middle" fill="var(--foreground-muted)" fontSize={10}
            transform={`rotate(-90,10,${PAD.t + plotH / 2})`}>
            %
          </text>

          {/* Health burden area (always visible) */}
          <path d={areaPath(HEALTH_BURDEN)} fill="var(--status-refuted)" opacity={0.18} className="motion-safe:transition-opacity" />
          <polyline points={polyline(HEALTH_BURDEN)} fill="none" stroke="var(--status-refuted)" strokeWidth={2.5} strokeLinejoin="round" />
          <text x={toSvg(HEALTH_BURDEN[HEALTH_BURDEN.length - 3])[0] + 4}
            y={toSvg(HEALTH_BURDEN[HEALTH_BURDEN.length - 3])[1] - 6}
            fill="var(--status-refuted)" fontSize={10} fontWeight={600}>
            {t.healthLabel}
          </text>

          {/* Selected explanation curve */}
          {sel && (
            <polyline
              points={polyline(sel.curve)}
              fill="none"
              stroke={isEmf ? "var(--accent)" : "var(--foreground-muted)"}
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
              fill={isEmf ? "var(--accent)" : "var(--foreground-muted)"}
              fontSize={10}
              fontWeight={600}
              textAnchor="end"
            >
              {sel.label[locale] ?? sel.label.en}
            </text>
          )}
        </svg>
      </div>

      {/* Verdict Box */}
      {sel && (
        <div
          className="rounded-xl p-4 sm:p-5 mb-6 motion-safe:animate-[fadeIn_0.2s_ease-out]"
          style={{
            border: `2px solid ${isEmf ? "var(--status-confirmed)" : "var(--status-refuted)"}`,
            background: isEmf
              ? "color-mix(in srgb, var(--status-confirmed) 9%, transparent)"
              : "color-mix(in srgb, var(--status-refuted) 7%, transparent)",
          }}
        >
          <div className="flex items-baseline gap-3 mb-2">
            <span
              className={`font-bold ${isEmf ? "text-2xl" : "text-xl"}`}
              style={{ color: isEmf ? "var(--status-confirmed)" : "var(--status-refuted)" }}
            >
              {totalScore}/8
            </span>
            <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              {sel.label[locale] ?? sel.label.en}
            </span>
          </div>
          <p className={`leading-relaxed ${isEmf ? "text-base" : "text-sm"}`} style={{ color: "var(--foreground-muted)" }}>
            <InlineReferenceText text={sel.verdict[locale] ?? sel.verdict.en} locale={locale} />
          </p>
        </div>
      )}

      {/* Scorecard Matrix */}
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-xs sm:text-sm border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left py-2 px-2 sticky left-0 z-10" style={{ color: "var(--foreground-muted)", background: "var(--figure-bg)" }}></th>
              {tests.map((label) => (
                <th key={label} className="py-2 px-1.5 text-center font-medium" style={{ color: "var(--foreground-muted)" }}>
                  {label}
                </th>
              ))}
              <th className="py-2 px-2 text-center font-medium" style={{ color: "var(--foreground-muted)" }}>{t.score}</th>
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
                      ? "color-mix(in srgb, var(--accent) 12%, transparent)"
                      : rowSelected
                        ? "color-mix(in srgb, var(--foreground-muted) 9%, transparent)"
                        : "transparent",
                    outline: rowSelected ? "1.5px solid var(--accent)" : "none",
                    borderRadius: 6,
                  }}
                >
                  <td
                    className="py-2 px-2 font-medium whitespace-nowrap sticky left-0 z-10"
                    style={{
                      color: rowEmf ? "var(--accent)" : "var(--foreground)",
                      background: "var(--figure-bg)",
                    }}
                  >
                    {ex.label[locale] ?? ex.label.en}
                  </td>
                  {ex.score.map((pass, ci) => (
                    <td key={ci} className="py-2 px-1.5 text-center">
                      {pass ? (
                        <span style={{ color: "var(--status-confirmed)" }} aria-label="pass">&#x2713;</span>
                      ) : (
                        <span style={{ color: "var(--card-border)" }} aria-label="fail">&mdash;</span>
                      )}
                    </td>
                  ))}
                  <td
                    className="py-2 px-2 text-center font-bold"
                    style={{ color: rowEmf ? "var(--status-confirmed)" : rowScore > 0 ? "var(--status-partial)" : "var(--foreground-muted)" }}
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
