"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import series from "@/lib/sentinelCascadeSeries.json";
import { pickCopy, pickSuffix } from "@/lib/i18n";

interface Point {
  year: number;
  mean?: number;
  value?: number;
  countries?: number;
}

const MAX_LAG = 5;

interface TechLayer {
  id: string;
  nameEn: string;
  nameFi: string;
  nameJa: string;
  nameFr: string;
  nameKo: string;
  startYear: number;
  endYear: number | null; // null = ongoing
  detail: string;
  color: string;
}

const TECH_LAYERS: TechLayer[] = [
  {
    id: "nexrad",
    nameEn: "NEXRAD weather radar",
    nameFi: "NEXRAD-säätutkajärjestelmä",
    nameJa: "NEXRAD気象レーダー",
    nameFr: "Radar météo NEXRAD",
    nameKo: "NEXRAD 기상 레이더",
    startYear: 1988,
    endYear: 1997,
    detail: "S-band 2.7 GHz, 250 kW–1 MW peak",
    color: "#ef4444",
  },
  {
    id: "led",
    nameEn: "LED street lighting",
    nameFi: "LED-katuvalaistus",
    nameJa: "LED街路照明",
    nameFr: "Éclairage public LED",
    nameKo: "LED 가로등",
    startYear: 2012,
    endYear: null,
    detail: "EU incandescent ban 2009–2012, street rollout 2012+",
    color: "#8b5cf6",
  },
];
const COUNTRY_NAMES: Record<string, Record<string, string>> = {
  AUT: { en: "Austria", fi: "Itävalta", ja: "オーストリア", fr: "Autriche", ko: "오스트리아" },
  BEL: { en: "Belgium", fi: "Belgia", ja: "ベルギー", fr: "Belgique", ko: "벨기에" },
  CHE: { en: "Switzerland", fi: "Sveitsi", ja: "スイス", fr: "Suisse", ko: "스위스" },
  CZE: { en: "Czechia", fi: "Tšekki", ja: "チェコ", fr: "Tchéquie", ko: "체코" },
  DEU: { en: "Germany", fi: "Saksa", ja: "ドイツ", fr: "Allemagne", ko: "독일" },
  DNK: { en: "Denmark", fi: "Tanska", ja: "デンマーク", fr: "Danemark", ko: "덴마크" },
  DZA: { en: "Algeria", fi: "Algeria", ja: "アルジェリア", fr: "Algérie", ko: "알제리" },
  ESP: { en: "Spain", fi: "Espanja", ja: "スペイン", fr: "Espagne", ko: "스페인" },
  EST: { en: "Estonia", fi: "Viro", ja: "エストニア", fr: "Estonie", ko: "에스토니아" },
  FIN: { en: "Finland", fi: "Suomi", ja: "フィンランド", fr: "Finlande", ko: "핀란드" },
  FRA: { en: "France", fi: "Ranska", ja: "フランス", fr: "France", ko: "프랑스" },
  IRL: { en: "Ireland", fi: "Irlanti", ja: "アイルランド", fr: "Irlande", ko: "아일랜드" },
  ISR: { en: "Israel", fi: "Israel", ja: "イスラエル", fr: "Israël", ko: "이스라엘" },
  ITA: { en: "Italy", fi: "Italia", ja: "イタリア", fr: "Italie", ko: "이탈리아" },
  LVA: { en: "Latvia", fi: "Latvia", ja: "ラトビア", fr: "Lettonie", ko: "라트비아" },
  MKD: { en: "North Macedonia", fi: "Pohjois-Makedonia", ja: "北マケドニア", fr: "Macédoine du Nord", ko: "북마케도니아" },
  NOR: { en: "Norway", fi: "Norja", ja: "ノルウェー", fr: "Norvège", ko: "노르웨이" },
  POL: { en: "Poland", fi: "Puola", ja: "ポーランド", fr: "Pologne", ko: "폴란드" },
  SVK: { en: "Slovakia", fi: "Slovakia", ja: "スロバキア", fr: "Slovaquie", ko: "슬로바키아" },
  SVN: { en: "Slovenia", fi: "Slovenia", ja: "スロベニア", fr: "Slovénie", ko: "슬로베니아" },
  SWE: { en: "Sweden", fi: "Ruotsi", ja: "スウェーデン", fr: "Suède", ko: "스웨덴" },
  UKR: { en: "Ukraine", fi: "Ukraina", ja: "ウクライナ", fr: "Ukraine", ko: "우크라이나" },
  USA: { en: "United States", fi: "Yhdysvallat", ja: "アメリカ合衆国", fr: "États-Unis", ko: "미국" },
};

function val(p: Point) {
  return (p.mean ?? p.value ?? 0);
}

/** Splits a series at gaps so a missing survey year is never drawn as a trend. */
function segments(points: Point[]) {
  const out: Point[][] = [];
  let run: Point[] = [];
  for (const p of points) {
    if (run.length && p.year !== run[run.length - 1].year + 1) {
      out.push(run);
      run = [];
    }
    run.push(p);
  }
  if (run.length) out.push(run);
  return out;
}

function niceMax(values: number[]) {
  const m = Math.max(...values.map((v) => Math.abs(v)), 1e-6);
  return m * 1.25;
}

interface FigureProps {
  compact: boolean;
  locale: string;
  lag: number;
  bee: Point[];
  alignedTfr: { year: number; value: number; sourceYear: number }[];
}

const FIGURE_COPY = {
  en: {
    beeAriaLabel: (lag: number) => `Annual changes in bee loss and TFR at a ${lag} year lag`,
    beeBand: "Δ bee winter loss (pp)",
    tfrBand: (lag: number) => `Δ TFR (year + ${lag} yr)`,
    countries: "countries",
    beeAxisLabel: "Bee year (end of winter season)",
  },
  fi: {
    beeAriaLabel: (lag: number) => `Mehiläishäviön ja TFR:n vuosimuutokset ${lag} vuoden viiveellä`,
    beeBand: "Δ mehiläishäviö (pp)",
    tfrBand: (lag: number) => `Δ TFR (vuosi + ${lag} v)`,
    countries: "maata",
    beeAxisLabel: "Mehiläisvuosi (talvikauden loppu)",
  },
  ja: {
    beeAriaLabel: (lag: number) => `ミツバチ損失とTFRの年次変化（${lag}年のラグ）`,
    beeBand: "Δ ミツバチ越冬損失 (pp)",
    tfrBand: (lag: number) => `Δ TFR（年 + ${lag}年）`,
    countries: "か国",
    beeAxisLabel: "ミツバチ年（越冬期終了）",
  },
  fr: {
    beeAriaLabel: (lag: number) => `Variations annuelles des pertes d'abeilles et du TFR avec un décalage de ${lag} ans`,
    beeBand: "Δ pertes hivernales d'abeilles (pp)",
    tfrBand: (lag: number) => `Δ TFR (année + ${lag} ans)`,
    countries: "pays",
    beeAxisLabel: "Année apicole (fin de saison hivernale)",
  },
  ko: {
    beeAriaLabel: (lag: number) => `꿀벌 손실과 TFR의 연간 변화 (${lag}년 지연)`,
    beeBand: "Δ 꿀벌 월동 손실 (pp)",
    tfrBand: (lag: number) => `Δ TFR (연도 + ${lag}년)`,
    countries: "개국",
    beeAxisLabel: "꿀벌 연도 (월동기 종료)",
  },
};

/**
 * One rendering of the two-band figure. A compact and a wide variant are both
 * emitted and toggled by CSS, so narrow screens get larger type rather than a
 * uniformly shrunk viewBox.
 */
function Figure({ compact, locale, lag, bee, alignedTfr }: FigureProps) {
  const fc = pickCopy(FIGURE_COPY, locale);
  const W = compact ? 360 : 560;
  const H = compact ? 340 : 330;
  const pad = compact
    // Right margin holds the last four-digit year label inside the viewBox.
    ? { top: 22, right: 26, bottom: 74, left: 30 }
    : { top: 24, right: 18, bottom: 74, left: 52 };
  const cw = W - pad.left - pad.right;
  const bandH = compact ? 92 : 88;
  const beeTop = pad.top;
  const tfrTop = pad.top + bandH + (compact ? 40 : 34);
  const bandFont = compact ? 13 : 11;
  const tickFont = compact ? 12 : 10;
  const axisFont = compact ? 12 : 11;

  const years = bee.map((b) => b.year);
  const xMin = Math.min(...years);
  const xMax = Math.max(...years);
  const sx = (y: number) =>
    xMax === xMin ? pad.left + cw / 2 : pad.left + ((y - xMin) / (xMax - xMin)) * cw;

  const beeMax = niceMax(bee.map(val));
  const tfrMax = niceMax(alignedTfr.map((p) => p.value));
  const syBee = (v: number) => beeTop + bandH / 2 - (v / beeMax) * (bandH / 2);
  const syTfr = (v: number) => tfrTop + bandH / 2 - (v / tfrMax) * (bandH / 2);

  // A long single-country series would otherwise collide its year labels.
  const tickStep = Math.ceil(bee.length / (compact ? 4 : 8));

  const line = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  return (
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="chart-svg w-full"
        role="img"
        aria-label={fc.beeAriaLabel(lag)}
      >
        {/* Technology deployment layers */}
        {TECH_LAYERS.map((layer) => {
          const x1Raw = sx(layer.startYear);
          const x2Raw = layer.endYear ? sx(layer.endYear) : W - pad.right;
          const x1 = Math.max(x1Raw, pad.left);
          const x2 = Math.min(x2Raw, W - pad.right);
          // Skip entirely off-chart layers but show an annotation arrow at the edge
          if (x2 <= pad.left) {
            return (
              <g key={layer.id}>
                <title>{`${pickSuffix(layer, "name", locale)}: ${layer.detail}`}</title>
                <path
                  d={`M ${pad.left + 2} ${beeTop + 6} L ${pad.left + 10} ${beeTop + 2} L ${pad.left + 10} ${beeTop + 10} Z`}
                  fill={layer.color}
                  opacity={0.75}
                />
              </g>
            );
          }
          if (x1 >= W - pad.right) return null;
          const bandWidth = x2 - x1;
          return (
            <g key={layer.id}>
              <title>{`${pickSuffix(layer, "name", locale)}: ${layer.detail}`}</title>
              <rect
                x={x1}
                y={beeTop}
                width={bandWidth}
                height={tfrTop + bandH - beeTop}
                fill={layer.color}
                opacity={0.06}
              />
              {/* Left edge marker line */}
              {x1Raw >= pad.left && (
                <line
                  x1={x1}
                  y1={beeTop}
                  x2={x1}
                  y2={tfrTop + bandH}
                  stroke={layer.color}
                  strokeWidth={1}
                  strokeDasharray="3,3"
                  opacity={0.35}
                />
              )}
            </g>
          );
        })}

        {[
          {
            top: beeTop,
            sy: syBee,
            colour: "var(--status-partial)",
            title: fc.beeBand,
            points: bee.map((b) => ({ year: b.year, value: val(b), countries: b.countries })),
            fmt: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)} pp`,
          },
          {
            top: tfrTop,
            sy: syTfr,
            colour: "var(--accent)",
            title: fc.tfrBand(lag),
            points: alignedTfr.map((p) => ({ year: p.year, value: p.value, sourceYear: p.sourceYear })),
            fmt: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(3)}`,
          },
        ].map((band) => (
          <g key={band.title}>
            <text
              x={pad.left}
              y={band.top - 7}
              fill={band.colour}
              fontSize={bandFont}
              fontWeight={600}
            >
              {band.title}
            </text>
            <line
              x1={pad.left}
              y1={band.sy(0)}
              x2={W - pad.right}
              y2={band.sy(0)}
              stroke="var(--foreground-muted)"
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.4}
            />
            {segments(band.points as Point[]).map((seg, i) => (
              <path
                key={i}
                d={line(seg.map((p) => ({ x: sx(p.year), y: band.sy(val(p)) })))}
                fill="none"
                stroke={band.colour}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {(band.points as (Point & { sourceYear?: number })[]).map((p) => (
              <g key={p.year}>
                <title>
                  {p.sourceYear !== undefined
                    ? `${p.sourceYear}: ${band.fmt(val(p))}`
                    : `${p.year}: ${band.fmt(val(p))}${p.countries ? ` (${p.countries} ${fc.countries})` : ""}`}
                </title>
                <circle
                  cx={sx(p.year)}
                  cy={band.sy(val(p))}
                  r={4}
                  fill={band.colour}
                />
              </g>
            ))}
          </g>
        ))}

        {/* shared year axis */}
        <line
          x1={pad.left}
          y1={tfrTop + bandH + 12}
          x2={W - pad.right}
          y2={tfrTop + bandH + 12}
          stroke="var(--card-border)"
          strokeWidth={1}
        />
        {bee
          .filter((_, i) => i % tickStep === 0 || i === bee.length - 1)
          .map((b) => (
            <text
              key={b.year}
              x={sx(b.year)}
              y={tfrTop + bandH + 27}
              fill="var(--foreground-muted)"
              fontSize={tickFont}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
            >
              {b.year}
            </text>
          ))}
        <text
          x={pad.left + cw / 2}
          y={H - 6}
          fill="var(--foreground-muted)"
          fontSize={axisFont}
          textAnchor="middle"
        >
          {fc.beeAxisLabel}
        </text>
      </svg>
  );
}

const COPY = {
  en: {
    heading: "Bee loss leads TFR decline",
    subtext: "Annual changes across the 23-country COLOSS panel. Move the lag and watch the series line up.",
    selectCountry: "Select country",
    wholePanel: "Whole panel (23)",
    techLayers: "Technology layers",
    ongoing: "ongoing",
    lag: "Lag",
    lagYears: "Lag in years",
    yr: "yr",
    lagProfile: "Lag profile: mean within-country correlation by lag",
    lagTitle: (lag: number, meanR: string, bermDir: number, countries: number) => `Lag ${lag} yr: mean r = ${meanR}, BERM direction ${bermDir}/${countries}`,
    countriesBerm: "countries in BERM direction",
    selectedLagNote: (lag: number, opt: number) => `The selected ${lag} yr lag is not the panel optimum (${opt} yr).`,
    footnote: "r and p come from the within-country pooled analysis (2 yr lag), which controls for level differences between countries. The curves show pooled annual means, with those differences removed, so their visual correlation is stronger than the published figure. The line breaks in years without panel coverage; each point's tooltip gives the country count. The result is correlational.",
  },
  fi: {
    heading: "Mehiläishäviö edeltää TFR-laskua",
    subtext: "Vuosimuutokset 23 maan COLOSS-paneelissa. Siirrä viivettä ja katso milloin sarjat asettuvat kohdakkain.",
    selectCountry: "Valitse maa",
    wholePanel: "Koko paneeli (23)",
    techLayers: "Teknologiakerrokset",
    ongoing: "jatkuu",
    lag: "Viive",
    lagYears: "Viive vuosina",
    yr: "v",
    lagProfile: "Viiveprofiili: maakohtaisten korrelaatioiden keskiarvo viiveittäin",
    lagTitle: (lag: number, meanR: string, bermDir: number, countries: number) => `Viive ${lag} v: keskimääräinen r = ${meanR}, BERM-suunta ${bermDir}/${countries}`,
    countriesBerm: "maata BERM-suunnassa",
    selectedLagNote: (lag: number, opt: number) => `Valittu viive ${lag} v ei ole paneelin optimi (${opt} v).`,
    footnote: "r ja p ovat maansisäisestä poolatusta analyysistä (viive 2 v), joka kontrolloi maiden väliset tasoerot. Kuvan käyrät ovat vuosikeskiarvoja, joista tasoerot ovat poissa, joten niiden visuaalinen korrelaatio on voimakkaampi kuin julkaistu luku. Käyrä katkeaa vuosina, joilta paneelikattavuutta ei ole; pisteen tooltip kertoo montako maata vuosi edustaa. Tulos on korrelatiivinen.",
  },
  ja: {
    heading: "ミツバチ損失がTFR低下に先行する",
    subtext: "23か国のCOLOSSパネルにおける年次変化。ラグを移動して系列の一致を確認してください。",
    selectCountry: "国を選択",
    wholePanel: "パネル全体（23）",
    techLayers: "技術層",
    ongoing: "継続中",
    lag: "ラグ",
    lagYears: "ラグ（年）",
    yr: "年",
    lagProfile: "ラグプロファイル：国内相関の平均（ラグ別）",
    lagTitle: (lag: number, meanR: string, bermDir: number, countries: number) => `ラグ ${lag}年: 平均 r = ${meanR}, BERM方向 ${bermDir}/${countries}`,
    countriesBerm: "か国がBERM方向",
    selectedLagNote: (lag: number, opt: number) => `選択されたラグ ${lag}年はパネル最適値（${opt}年）ではありません。`,
    footnote: "rとpは国内プール分析（2年ラグ）からのもので、国間のレベル差を制御しています。曲線はプールされた年次平均を示し、レベル差が除去されているため、視覚的相関は公表値より強く見えます。パネルカバレッジのない年は線が途切れます。各点のツールチップに国数が表示されます。結果は相関的です。",
  },
  fr: {
    heading: "Les pertes d'abeilles précèdent le déclin du TFR",
    subtext: "Variations annuelles dans le panel COLOSS de 23 pays. Déplacez le décalage et observez l'alignement des séries.",
    selectCountry: "Sélectionner un pays",
    wholePanel: "Panel entier (23)",
    techLayers: "Couches technologiques",
    ongoing: "en cours",
    lag: "Décalage",
    lagYears: "Décalage en années",
    yr: "ans",
    lagProfile: "Profil de décalage : corrélation intra-pays moyenne par décalage",
    lagTitle: (lag: number, meanR: string, bermDir: number, countries: number) => `Décalage ${lag} ans : r moyen = ${meanR}, direction BERM ${bermDir}/${countries}`,
    countriesBerm: "pays dans la direction BERM",
    selectedLagNote: (lag: number, opt: number) => `Le décalage de ${lag} ans sélectionné n'est pas l'optimum du panel (${opt} ans).`,
    footnote: "r et p proviennent de l'analyse poolée intra-pays (décalage de 2 ans), qui contrôle les différences de niveau entre pays. Les courbes montrent les moyennes annuelles poolées, sans ces différences, donc leur corrélation visuelle est plus forte que le chiffre publié. La ligne s'interrompt les années sans couverture du panel ; l'infobulle de chaque point indique le nombre de pays. Le résultat est corrélationnel.",
  },
  ko: {
    heading: "꿀벌 손실이 TFR 감소에 선행한다",
    subtext: "23개국 COLOSS 패널의 연간 변화. 지연을 이동하여 계열의 정렬을 확인하세요.",
    selectCountry: "국가 선택",
    wholePanel: "전체 패널 (23)",
    techLayers: "기술 층",
    ongoing: "진행 중",
    lag: "지연",
    lagYears: "지연 (년)",
    yr: "년",
    lagProfile: "지연 프로파일: 국가 내 상관관계 평균 (지연별)",
    lagTitle: (lag: number, meanR: string, bermDir: number, countries: number) => `지연 ${lag}년: 평균 r = ${meanR}, BERM 방향 ${bermDir}/${countries}`,
    countriesBerm: "개국이 BERM 방향",
    selectedLagNote: (lag: number, opt: number) => `선택된 ${lag}년 지연은 패널 최적값(${opt}년)이 아닙니다.`,
    footnote: "r과 p는 국가 내 풀링 분석(2년 지연)에서 나온 것으로, 국가 간 수준 차이를 통제합니다. 곡선은 풀링된 연간 평균을 보여주며 수준 차이가 제거되어 시각적 상관관계가 공표 수치보다 강하게 보입니다. 패널 적용범위가 없는 연도에는 선이 끊어집니다. 각 점의 툴팁에 국가 수가 표시됩니다. 결과는 상관적입니다.",
  },
};

export function SentinelCascadeTimeline({ locale = "en" }: { locale?: string }) {
  const d = pickCopy(COPY, locale);
  const [lag, setLag] = useState(series.published.optimalLagYears);
  const [country, setCountry] = useState("__pooled");

  const getName = (code: string) => pickCopy(COUNTRY_NAMES[code] ?? { en: code }, locale);
  const pooled = country === "__pooled";

  const { bee, tfr } = useMemo(() => {
    if (pooled) {
      return { bee: series.beeSeries as Point[], tfr: series.tfrSeries as Point[] };
    }
    const entry = (series.byCountry as Record<string, { bee: Point[]; tfr: Point[] }>)[country];
    return { bee: entry.bee, tfr: entry.tfr };
  }, [country, pooled]);

  const tfrByYear = useMemo(() => {
    const map = new Map<number, Point>();
    for (const p of tfr) map.set(p.year, p);
    return map;
  }, [tfr]);

  // The TFR series is drawn against the bee year it is compared with, so
  // moving the lag slides one curve across the other.
  const alignedTfr = useMemo(
    () =>
      bee
        .map((b) => {
          const t = tfrByYear.get(b.year + lag);
          return t ? { year: b.year, value: val(t), sourceYear: t.year } : null;
        })
        .filter((p): p is { year: number; value: number; sourceYear: number } => p !== null),
    [bee, tfrByYear, lag],
  );

  const activeLag = series.lagProfile.find((l) => l.lag === lag);
  const publishedLag = lag === series.published.optimalLagYears;

  return (
    <div className="chart-surface">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            aria-hidden="true"
            className="species-silhouette relative mt-0.5 h-14 w-14 shrink-0 overflow-hidden sm:h-16 sm:w-16"
          >
            <Image
              src="/icons/silhouettes/berm-honeybee-silhouette.png"
              alt=""
              width={1254}
              height={1254}
              sizes="(max-width: 639px) 56px, 64px"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold">
              {d.heading}
            </h3>
            <p className="mt-1 text-sm text-foreground-muted">
              {d.subtext}
            </p>
          </div>
        </div>
        <label className="text-xs text-foreground-muted">
          <span className="sr-only">{d.selectCountry}</span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded border border-card-border bg-background px-2 py-1 text-xs text-foreground"
          >
            <option value="__pooled">{d.wholePanel}</option>
            {series.panel.map((c) => (
              <option key={c} value={c}>
                {getName(c)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="sm:hidden">
        <Figure compact locale={locale} lag={lag} bee={bee} alignedTfr={alignedTfr} />
      </div>
      <div className="hidden sm:block">
        <Figure compact={false} locale={locale} lag={lag} bee={bee} alignedTfr={alignedTfr} />
      </div>

      <ul className="chart-legend mt-2" aria-label={d.techLayers}>
        {TECH_LAYERS.map((layer) => (
          <li key={layer.id} className="chart-key" title={layer.detail}>
            <span className="chart-key__swatch" style={{ backgroundColor: layer.color, color: layer.color }} />
            <span>
              {pickSuffix(layer, "name", locale)} · {layer.startYear}–{layer.endYear ?? d.ongoing}
            </span>
          </li>
        ))}
      </ul>

      {/* lag control and the lag profile it moves through */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <label className="flex items-center gap-3 text-xs text-foreground-muted">
          <span className="whitespace-nowrap">{d.lag}</span>
          <input
            type="range"
            min={0}
            max={MAX_LAG}
            step={1}
            value={lag}
            onChange={(e) => setLag(Number(e.target.value))}
            className="w-36 accent-[var(--accent)]"
            aria-label={d.lagYears}
          />
          <span className="font-mono-num whitespace-nowrap text-foreground">
            {lag} {d.yr}
          </span>
        </label>

        <svg
          viewBox="0 0 180 34"
          className="h-8 w-44"
          role="img"
          aria-label={d.lagProfile}
        >
          <line x1={0} y1={17} x2={180} y2={17} stroke="var(--card-border)" strokeWidth={1} />
          {series.lagProfile.map((entry) => {
            const x = 12 + entry.lag * 30;
            const h = Math.min(Math.abs(entry.meanR) * 34, 16);
            const negative = entry.meanR < 0;
            const selected = entry.lag === lag;
            return (
              <g key={entry.lag}>
                <title>
                  {d.lagTitle(entry.lag, entry.meanR.toFixed(2), entry.bermDirection, entry.countries)}
                </title>
                <rect
                  x={x - 7}
                  y={negative ? 17 : 17 - h}
                  width={14}
                  height={h}
                  fill={negative ? "var(--accent)" : "var(--foreground-muted)"}
                  opacity={selected ? 1 : 0.35}
                />
                <text
                  x={x}
                  y={31}
                  fill={selected ? "var(--foreground)" : "var(--foreground-muted)"}
                  fontSize={8}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                >
                  {entry.lag}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-foreground-muted">
        <span className="font-mono-num">r = {series.published.pooledR}</span>
        <span className="font-mono-num">p = {series.published.circularShiftP}</span>
        <span className="font-mono-num">
          {series.published.bermDirection}/{series.published.panelSize}{" "}
          {d.countriesBerm}
        </span>
        {!publishedLag && activeLag && (
          <span>
            {d.selectedLagNote(lag, series.published.optimalLagYears)}
          </span>
        )}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
        {d.footnote}
      </p>
    </div>
  );
}
