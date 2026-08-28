"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  membershipsFromPanel,
  parseGlobalPanelCsv,
  type GlobalCountryPanel,
  type GlobalCountryYear,
  type GlobalPanel,
  type GlobalTier,
  type GlobalTierMemberships,
} from "@/lib/globalArtifacts";
import { pickCopy } from "@/lib/i18n";
import { GlobalTierMap } from "./GlobalTierMap";

type TierFilter = "all" | GlobalTier;

const copy = {
  en: {
    title: "Global country-year explorer",
    description:
      "Browse the published country-year panel by country and pre-specified coverage tier. It contains published reported-or-estimated demographic series and technology-timing proxies, not measured FieldState or a prediction display.",
    loading: "Loading the published global panel…",
    error: "The global country-year panel is not available yet. No values are shown until a published artefact can be loaded.",
    tier: "Coverage tier",
    country: "Country",
    year: "Year",
    all: "All published countries",
    core: "Core 51",
    extended: "Extended",
    global: "Global",
    unassigned: "No published tier",
    tfr: "Published TFR series",
    mobile: "Mobile subscriptions",
    urban: "Urban population",
    gdp: "GDP PPP per capita",
    noValue: "Not reported",
    provenance: "Field provenance",
    tfrProvenance: "TFR provenance",
    tfrSource: "Source",
    tfrStatus: "Series status",
    tfrMeasurementType: "Measurement type",
    missingness: "Missingness note",
    trends: "Published country-year trends",
    tfrTrend: "Published TFR series by year",
    mobileTrend: "Mobile subscriptions per 100 people by year",
    noTrend: "No published values are available for this series.",
    panelNote:
      "A tier represents inclusion and data coverage, not model quality, an inferred effect, or a future fertility prediction.",
    noCountries: "No published countries match this tier.",
  },
  ja: {
    title: "グローバル国別年次エクスプローラー",
    description:
      "公開された国別年次パネルを国と事前指定されたカバレッジ層で閲覧する。報告または推定された人口統計シリーズと技術タイミングプロキシを含み、測定されたFieldStateや予測表示ではない。",
    loading: "公開グローバルパネルを読み込み中…",
    error: "グローバル国別年次パネルはまだ利用できません。公開アーティファクトが読み込まれるまで値は表示されません。",
    tier: "カバレッジ層",
    country: "国",
    year: "年",
    all: "すべての公開国",
    core: "コア51",
    extended: "拡張",
    global: "グローバル",
    unassigned: "公開層なし",
    tfr: "公開TFRシリーズ",
    mobile: "モバイル加入",
    urban: "都市人口",
    gdp: "GDP PPP一人当たり",
    noValue: "未報告",
    provenance: "フィールド来歴",
    tfrProvenance: "TFR来歴",
    tfrSource: "出典",
    tfrStatus: "シリーズ状態",
    tfrMeasurementType: "測定タイプ",
    missingness: "欠測注記",
    trends: "公開国別年次トレンド",
    tfrTrend: "年別公開TFRシリーズ",
    mobileTrend: "年別100人当たりモバイル加入",
    noTrend: "このシリーズには公開値がありません。",
    panelNote:
      "層は包含とデータカバレッジを表し、モデル品質、推定効果、将来の出生率予測ではない。",
    noCountries: "この層に該当する公開国はありません。",
  },
  fr: {
    title: "Explorateur global pays-année",
    description:
      "Parcourez le panel pays-année publié par pays et niveau de couverture pré-spécifié. Il contient des séries démographiques publiées rapportées ou estimées et des proxys temporels technologiques, pas de FieldState mesuré ni d'affichage prédictif.",
    loading: "Chargement du panel global publié…",
    error: "Le panel pays-année global n'est pas encore disponible. Aucune valeur n'est affichée tant qu'un artefact publié ne peut être chargé.",
    tier: "Niveau de couverture",
    country: "Pays",
    year: "Année",
    all: "Tous les pays publiés",
    core: "Core 51",
    extended: "Étendu",
    global: "Global",
    unassigned: "Aucun niveau publié",
    tfr: "Série TFR publiée",
    mobile: "Abonnements mobiles",
    urban: "Population urbaine",
    gdp: "PIB PPA par habitant",
    noValue: "Non rapporté",
    provenance: "Provenance du champ",
    tfrProvenance: "Provenance TFR",
    tfrSource: "Source",
    tfrStatus: "Statut de la série",
    tfrMeasurementType: "Type de mesure",
    missingness: "Note de données manquantes",
    trends: "Tendances pays-année publiées",
    tfrTrend: "Série TFR publiée par année",
    mobileTrend: "Abonnements mobiles pour 100 personnes par année",
    noTrend: "Aucune valeur publiée n'est disponible pour cette série.",
    panelNote:
      "Un niveau représente l'inclusion et la couverture des données, pas la qualité du modèle, un effet inféré ou une prédiction future de fécondité.",
    noCountries: "Aucun pays publié ne correspond à ce niveau.",
  },
  ko: {
    title: "글로벌 국가-연도 탐색기",
    description:
      "공개된 국가-연도 패널을 국가 및 사전 지정된 커버리지 층별로 탐색합니다. 보고 또는 추정된 인구통계 시리즈와 기술 타이밍 프록시를 포함하며, 측정된 FieldState나 예측 표시가 아닙니다.",
    loading: "공개 글로벌 패널 로딩 중…",
    error: "글로벌 국가-연도 패널은 아직 사용할 수 없습니다. 공개 아티팩트가 로드될 때까지 값이 표시되지 않습니다.",
    tier: "커버리지 층",
    country: "국가",
    year: "연도",
    all: "모든 공개 국가",
    core: "코어 51",
    extended: "확장",
    global: "글로벌",
    unassigned: "공개 층 없음",
    tfr: "공개 TFR 시리즈",
    mobile: "모바일 가입",
    urban: "도시 인구",
    gdp: "GDP PPP 1인당",
    noValue: "미보고",
    provenance: "필드 출처",
    tfrProvenance: "TFR 출처",
    tfrSource: "출처",
    tfrStatus: "시리즈 상태",
    tfrMeasurementType: "측정 유형",
    missingness: "결측 주석",
    trends: "공개 국가-연도 추세",
    tfrTrend: "연도별 공개 TFR 시리즈",
    mobileTrend: "연도별 100명당 모바일 가입",
    noTrend: "이 시리즈에 대한 공개 값이 없습니다.",
    panelNote:
      "층은 포함 및 데이터 커버리지를 나타내며, 모델 품질, 추정 효과 또는 미래 출산율 예측이 아닙니다.",
    noCountries: "이 층에 해당하는 공개 국가가 없습니다.",
  },
  fi: {
    title: "Globaalin maa–vuosi-aineiston tutkija",
    description:
      "Selaa julkaistua maa–vuosi-paneelia maan ja ennalta määritellyn kattavuustason mukaan. Paneeli sisältää julkaistuja raportoituja tai estimoituja demografisia sarjoja ja teknologian ajoitusprokseja, ei mitattua FieldStatea eikä ennustenäkymää.",
    loading: "Ladataan julkaistua globaalia paneelia…",
    error: "Globaalia maa–vuosi-paneelia ei ole vielä saatavilla. Arvoja ei näytetä ennen julkaistun artefaktin lataamista.",
    tier: "Kattavuustaso",
    country: "Maa",
    year: "Vuosi",
    all: "Kaikki julkaistut maat",
    core: "Core 51",
    extended: "Laajennettu",
    global: "Globaali",
    unassigned: "Ei julkaistua tasoa",
    tfr: "Julkaistu TFR-sarja",
    mobile: "Mobiililiittymät",
    urban: "Kaupunkiväestö",
    gdp: "BKT (PPP) per asukas",
    noValue: "Ei raportoitu",
    provenance: "Kentän alkuperä",
    tfrProvenance: "TFR-sarjan provenienssi",
    tfrSource: "Lähde",
    tfrStatus: "Sarjan tila",
    tfrMeasurementType: "Mittauksen tyyppi",
    missingness: "Puuttuvuushuomio",
    trends: "Julkaistut maa–vuosi-trendit",
    tfrTrend: "Julkaistu TFR-sarja vuosittain",
    mobileTrend: "Mobiililiittymät per 100 asukasta vuosittain",
    noTrend: "Tälle sarjalle ei ole julkaistu arvoja.",
    panelNote:
      "Taso tarkoittaa sisällyttämistä ja datakattavuutta, ei mallin laatua, pääteltyä vaikutusta eikä tulevaa hedelmällisyysennustetta.",
    noCountries: "Tähän tasoon ei sisälly julkaistuja maita.",
  },
} as const;

function tierLabel(tier: GlobalTier | undefined, locale: string) {
  const d = pickCopy(copy, locale);
  if (!tier) return d.unassigned;
  return d[tier];
}

function membershipLabel(iso3: string, memberships: GlobalTierMemberships | null, locale: string) {
  const d = pickCopy(copy, locale);
  const values = memberships?.membershipsByIso[iso3] ?? [];
  return values.length > 0 ? values.map((tier) => tierLabel(tier, locale)).join(" · ") : d.unassigned;
}

function formatValue(value: number | undefined, digits = 2) {
  return value === undefined ? null : value.toLocaleString(undefined, { maximumFractionDigits: digits });
}

function TrendChart({
  rows,
  accessor,
  label,
  color,
  fallback,
}: {
  rows: GlobalCountryYear[];
  accessor: (row: GlobalCountryYear) => number | undefined;
  label: string;
  color: string;
  fallback: string;
}) {
  const gradientId = `trend-area-${useId().replace(/:/g, "")}`;
  const points = rows.flatMap((row) => {
    const value = accessor(row);
    return value === undefined ? [] : [{ year: row.year, value }];
  });
  if (points.length === 0) {
    return <p className="rounded-lg border border-card-border bg-background p-4 text-sm text-foreground-muted">{fallback}</p>;
  }

  const width = 500;
  const height = 184;
  const margin = { top: 16, right: 18, bottom: 30, left: 44 };
  const minYear = points[0].year;
  const maxYear = points[points.length - 1].year;
  const minValue = Math.min(...points.map((point) => point.value));
  const maxValue = Math.max(...points.map((point) => point.value));
  const valuePadding = Math.max(0.1, (maxValue - minValue) * 0.14);
  const low = Math.max(0, minValue - valuePadding);
  const high = maxValue + valuePadding;
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const x = (year: number) => margin.left + ((year - minYear) / Math.max(1, maxYear - minYear)) * plotWidth;
  const y = (value: number) => margin.top + ((high - value) / Math.max(1e-9, high - low)) * plotHeight;
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${x(point.year)} ${y(point.value)}`).join(" ");
  const ticks = Array.from({ length: 4 }, (_, index) => low + ((high - low) * index) / 3);
  const area = `${line} L${x(points[points.length - 1].year)} ${y(low)} L${x(points[0].year)} ${y(low)} Z`;
  const markerPoints = points.filter((_, index) => index === 0 || index === points.length - 1 || index % 5 === 0);
  const latest = points[points.length - 1];
  const latestLabelY = Math.max(margin.top + 11, Math.min(height - margin.bottom - 7, y(latest.value) - 8));

  return (
    <figure className="data-figure">
      <figcaption className="data-figure__caption">
        <span className="data-figure__title">{label}</span>
      </figcaption>
      <svg role="img" aria-label={label} className="chart-svg h-auto w-full" viewBox={`0 0 ${width} ${height}`}>
        <title>{label}</title>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.24" />
            <stop offset="100%" stopColor={color} stopOpacity="0.015" />
          </linearGradient>
        </defs>
        <rect
          x={margin.left}
          y={margin.top}
          width={plotWidth}
          height={plotHeight}
          rx="8"
          fill="var(--background)"
          opacity="0.32"
        />
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={y(tick)}
              y2={y(tick)}
              className="chart-grid-line"
              strokeDasharray="3 5"
            />
            <text x={margin.left - 7} y={y(tick) + 4} textAnchor="end" className="fill-foreground-muted text-[10px]">
              {tick.toFixed(1)}
            </text>
          </g>
        ))}
        <path d={area} fill={`url(#${gradientId})`} />
        <path
          d={line}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.75"
          vectorEffect="non-scaling-stroke"
        />
        {markerPoints.map((point) => (
          <circle
            key={point.year}
            cx={x(point.year)}
            cy={y(point.value)}
            r={point.year === latest.year ? 3.75 : 1.8}
            fill={point.year === latest.year ? "var(--figure-bg)" : color}
            stroke={color}
            strokeWidth={point.year === latest.year ? 2.25 : 0}
            vectorEffect="non-scaling-stroke"
          >
            <title>{point.year}: {point.value.toFixed(2)}</title>
          </circle>
        ))}
        <text
          x={width - margin.right - 5}
          y={latestLabelY}
          fill={color}
          fontSize="10"
          fontWeight="700"
          textAnchor="end"
          stroke="var(--figure-bg)"
          strokeWidth="3"
          paintOrder="stroke"
        >
          {latest.value.toFixed(1)}
        </text>
        <text x={margin.left} y={height - 7} className="fill-foreground-muted text-[10px]">{minYear}</text>
        <text x={width - margin.right} y={height - 7} textAnchor="end" className="fill-foreground-muted text-[10px]">{maxYear}</text>
      </svg>
    </figure>
  );
}

async function loadPanel(signal: AbortSignal): Promise<GlobalPanel> {
  const csvResponse = await fetch("/data/global_panel.csv", { signal });
  if (csvResponse.ok) {
    const parsed = parseGlobalPanelCsv(await csvResponse.text());
    if (parsed) return parsed;
  }

  throw new Error("Global panel artifact is unavailable or invalid");
}

export function GlobalDataExplorer({ locale }: { locale: string }) {
  const d = pickCopy(copy, locale);
  const [panel, setPanel] = useState<GlobalPanel | null>(null);
  const [memberships, setMemberships] = useState<GlobalTierMemberships | null>(null);
  const [tier, setTier] = useState<TierFilter>("all");
  const [countryIso3, setCountryIso3] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    loadPanel(controller.signal)
      .then((publishedPanel) => {
        setPanel(publishedPanel);
        setMemberships(membershipsFromPanel(publishedPanel));
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setFailed(true);
      });
    return () => controller.abort();
  }, []);

  const countries = useMemo(() => {
    if (!panel) return [];
    return panel.countries.filter((country) => {
      if (tier === "all") return true;
      return memberships?.membershipsByIso[country.iso3]?.includes(tier) ?? false;
    });
  }, [panel, memberships, tier]);

  const selectedCountry: GlobalCountryPanel | undefined = countries.find((country) => country.iso3 === countryIso3)
    ?? countries[0];

  const selectedRow = selectedCountry?.years.find((row) => row.year === year)
    ?? selectedCountry?.years[selectedCountry.years.length - 1];
  const selectedTier = selectedCountry ? membershipLabel(selectedCountry.iso3, memberships, locale) : d.unassigned;

  return (
    <section className="space-y-6">
      <div className="max-w-3xl">
        <h2 className="text-xl font-semibold">{d.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.description}</p>
      </div>

      {failed ? (
        <p className="rounded-xl border border-status-partial/30 bg-status-partial/5 p-4 text-sm text-foreground-muted">{d.error}</p>
      ) : !panel ? (
        <p className="py-16 text-center text-sm text-foreground-muted">{d.loading}</p>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="text-sm font-medium">
              <span className="mb-1.5 block text-foreground-muted">{d.tier}</span>
              <select
                value={tier}
                onChange={(event) => setTier(event.target.value as TierFilter)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground"
              >
                <option value="all">{d.all}</option>
                <option value="core">{d.core}</option>
                <option value="extended">{d.extended}</option>
                <option value="global">{d.global}</option>
              </select>
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              <span className="mb-1.5 block text-foreground-muted">{d.country}</span>
              <select
                value={selectedCountry?.iso3 ?? ""}
                onChange={(event) => setCountryIso3(event.target.value)}
                disabled={countries.length === 0}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground disabled:opacity-60"
              >
                {countries.map((country) => (
                  <option key={country.iso3} value={country.iso3}>{country.name} ({country.iso3})</option>
                ))}
              </select>
            </label>
          </div>

          {!selectedCountry || !selectedRow ? (
            <p className="rounded-lg border border-card-border bg-card-bg p-4 text-sm text-foreground-muted">{d.noCountries}</p>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-card-border bg-card-bg p-4">
                <div>
                  <p className="text-lg font-semibold">{selectedCountry.name}</p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {selectedCountry.iso3} · {selectedTier}
                  </p>
                </div>
                <label className="text-sm font-medium">
                  <span className="mb-1 block text-xs text-foreground-muted">{d.year}</span>
                  <select
                    value={selectedRow.year}
                    onChange={(event) => setYear(Number(event.target.value))}
                    className="rounded-lg border border-card-border bg-background px-3 py-2 text-foreground"
                  >
                    {selectedCountry.years.map((row) => <option key={row.year} value={row.year}>{row.year}</option>)}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  [d.tfr, formatValue(selectedRow.tfr, 2)],
                  [d.mobile, formatValue(selectedRow.mobilePer100, 1)],
                  [d.urban, formatValue(selectedRow.urbanPct, 1) ? `${formatValue(selectedRow.urbanPct, 1)}%` : null],
                  [d.gdp, formatValue(selectedRow.gdpPppPerCapita, 0)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-card-border bg-card-bg p-3">
                    <p className="text-xs text-foreground-muted">{label}</p>
                    <p className="mt-1 font-mono-num text-base font-semibold">{value ?? d.noValue}</p>
                  </div>
                ))}
              </div>

              {(selectedRow.fieldProvenance || selectedRow.missingness) && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedRow.fieldProvenance && (
                    <div className="rounded-lg border border-card-border bg-background p-3">
                      <p className="text-xs font-medium text-foreground-muted">{d.provenance}</p>
                      <p className="mt-1 break-words text-sm text-foreground">{selectedRow.fieldProvenance}</p>
                    </div>
                  )}
                  {selectedRow.missingness && (
                    <div className="rounded-lg border border-card-border bg-background p-3">
                      <p className="text-xs font-medium text-foreground-muted">{d.missingness}</p>
                      <p className="mt-1 break-words text-sm text-foreground">{selectedRow.missingness}</p>
                    </div>
                  )}
                </div>
              )}

              {(selectedRow.tfrSource || selectedRow.tfrSeriesStatus || selectedRow.tfrMeasurementType) && (
                <div className="rounded-lg border border-card-border bg-background p-3">
                  <p className="text-xs font-medium text-foreground-muted">{d.tfrProvenance}</p>
                  <dl className="mt-2 grid gap-2 text-sm sm:grid-cols-3">
                    {selectedRow.tfrSource && <div><dt className="text-xs text-foreground-muted">{d.tfrSource}</dt><dd className="mt-0.5 break-words text-foreground">{selectedRow.tfrSource}</dd></div>}
                    {selectedRow.tfrSeriesStatus && <div><dt className="text-xs text-foreground-muted">{d.tfrStatus}</dt><dd className="mt-0.5 break-words text-foreground">{selectedRow.tfrSeriesStatus}</dd></div>}
                    {selectedRow.tfrMeasurementType && <div><dt className="text-xs text-foreground-muted">{d.tfrMeasurementType}</dt><dd className="mt-0.5 break-words text-foreground">{selectedRow.tfrMeasurementType}</dd></div>}
                  </dl>
                </div>
              )}

              <div>
                <h3 className="mb-3 text-base font-semibold">{d.trends}</h3>
                <div className="grid gap-4 lg:grid-cols-2">
                  <TrendChart rows={selectedCountry.years} accessor={(row) => row.tfr} label={d.tfrTrend} color="#F59E0B" fallback={d.noTrend} />
                  <TrendChart rows={selectedCountry.years} accessor={(row) => row.mobilePer100} label={d.mobileTrend} color="#3B82F6" fallback={d.noTrend} />
                </div>
              </div>
            </>
          )}
          <p className="text-xs leading-relaxed text-foreground-muted">{d.panelNote}</p>
        </>
      )}

      <GlobalTierMap locale={locale} />
    </section>
  );
}
