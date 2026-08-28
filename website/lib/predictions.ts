import { LockedPrediction } from "./types";

/**
 * Localised metric and country names. `metricLabel` / `countryLabel` on each
 * record stay English (they are the registry's canonical identifiers); these
 * maps supply the display strings for the Finnish locale.
 */
const METRIC_LABELS_FI: Record<string, string> = {
  TFR: "Kokonaishedelmällisyysluku",
  feedback_TFR: "TFR kaupungistumispalautteella",
  SpermConc_pctOf2020: "Siittiökonsentraatio (% vuodesta 2020)",
  sex_ratio_male_frac: "Sukupuolisuhde syntymässä (miesten osuus)",
  sentinel_cascade_TFR_acceleration: "TFR-laskun kiihtyminen (sentinellikaskadi)",
  sleep_quality_faraday: "Unenlaatu Faradayn häkissä",
};

const COUNTRY_LABELS_FI: Record<string, string> = {
  Finland: "Suomi",
  "South Korea": "Etelä-Korea",
  "United States": "Yhdysvallat",
  Japan: "Japani",
  Brazil: "Brasilia",
  Global: "Globaali",
  "United States 2030": "Yhdysvallat 2030",
};

const METRIC_LABELS_JA: Record<string, string> = {
  TFR: "合計特殊出生率",
  feedback_TFR: "都市化フィードバック付きTFR",
  SpermConc_pctOf2020: "精子濃度（2020年比%）",
  sex_ratio_male_frac: "出生時性比（男性割合）",
  sentinel_cascade_TFR_acceleration: "TFR低下加速（センチネルカスケード）",
  sleep_quality_faraday: "ファラデーケージ内睡眠品質",
};

const COUNTRY_LABELS_JA: Record<string, string> = {
  Finland: "フィンランド",
  "South Korea": "韓国",
  "United States": "アメリカ合衆国",
  Japan: "日本",
  Brazil: "ブラジル",
  Global: "グローバル",
  "United States 2030": "アメリカ合衆国 2030",
};

const METRIC_LABELS_FR: Record<string, string> = {
  TFR: "Indice synthétique de fécondité",
  feedback_TFR: "TFR avec rétroaction d'urbanisation",
  SpermConc_pctOf2020: "Concentration spermatique (% de 2020)",
  sex_ratio_male_frac: "Rapport de masculinité à la naissance",
  sentinel_cascade_TFR_acceleration: "Accélération du déclin du TFR (cascade sentinelle)",
  sleep_quality_faraday: "Qualité du sommeil en cage de Faraday",
};

const COUNTRY_LABELS_FR: Record<string, string> = {
  Finland: "Finlande",
  "South Korea": "Corée du Sud",
  "United States": "États-Unis",
  Japan: "Japon",
  Brazil: "Brésil",
  Global: "Mondial",
  "United States 2030": "États-Unis 2030",
};

const METRIC_LABELS_KO: Record<string, string> = {
  TFR: "합계출산율",
  feedback_TFR: "도시화 피드백 포함 TFR",
  SpermConc_pctOf2020: "정자 농도 (2020년 대비 %)",
  sex_ratio_male_frac: "출생 성비 (남성 비율)",
  sentinel_cascade_TFR_acceleration: "TFR 감소 가속 (센티넬 캐스케이드)",
  sleep_quality_faraday: "패러데이 케이지 내 수면 품질",
};

const COUNTRY_LABELS_KO: Record<string, string> = {
  Finland: "핀란드",
  "South Korea": "한국",
  "United States": "미국",
  Japan: "일본",
  Brazil: "브라질",
  Global: "글로벌",
  "United States 2030": "미국 2030",
};

const METRIC_LABELS: Record<string, Record<string, string>> = {
  fi: METRIC_LABELS_FI,
  ja: METRIC_LABELS_JA,
  fr: METRIC_LABELS_FR,
  ko: METRIC_LABELS_KO,
};

const COUNTRY_LABELS: Record<string, Record<string, string>> = {
  fi: COUNTRY_LABELS_FI,
  ja: COUNTRY_LABELS_JA,
  fr: COUNTRY_LABELS_FR,
  ko: COUNTRY_LABELS_KO,
};

export function metricLabel(p: LockedPrediction, locale: string): string {
  const labels = METRIC_LABELS[locale];
  if (!labels) return p.metricLabel;
  return labels[p.metric] ?? p.metricLabel;
}

export function countryLabel(p: LockedPrediction, locale: string): string {
  const labels = COUNTRY_LABELS[locale];
  if (!labels) return p.countryLabel;
  return labels[p.countryLabel] ?? p.countryLabel;
}

const COHORT_CHANGE =
  "vulnerability-weighted cohort adjustment (fetal 5×, infant 4×, child 3×, " +
  "juvenile 2.5×, adolescent 2×) replaces linear ramp; LOOCV RMSE improved 1.17 → 1.15";

export const LOCKED_PREDICTIONS: LockedPrediction[] = [
  {
    id: "fi-2030-tfr",
    country: "Finland",
    countryLabel: "Finland",
    year: 2030,
    metric: "TFR",
    metricLabel: "Total Fertility Rate",
    central: 1.08,
    ciLow: 1.02,
    ciHigh: 1.24,
    lockedDate: "2026-08-18",
    modelVersion: "v17.1",
    gitSha: "df6b410",
    status: "pending",
    unit: "children/woman",
    history: [
      {
        version: "v17.0",
        central: 1.17,
        ci: [1.02, 1.24],
        date: "2026-08-18",
        changeReason: "initial lock",
        gitSha: "0fa9f290",
      },
      {
        version: "v17.1",
        central: 1.08,
        ci: [1.02, 1.24],
        date: "2026-08-18",
        changeReason: COHORT_CHANGE,
        gitSha: "df6b410",
      },
    ],
  },
  {
    id: "kr-2030-tfr",
    country: "SouthKorea",
    countryLabel: "South Korea",
    year: 2030,
    metric: "TFR",
    metricLabel: "Total Fertility Rate",
    central: 0.61,
    ciLow: 0.48,
    ciHigh: 0.72,
    lockedDate: "2026-08-18",
    modelVersion: "v17.1",
    gitSha: "df6b410",
    status: "pending",
    unit: "children/woman",
    history: [
      {
        version: "v17.0",
        central: 0.60,
        ci: [0.48, 0.72],
        date: "2026-08-18",
        changeReason: "initial lock",
        gitSha: "0fa9f290",
      },
      {
        version: "v17.1",
        central: 0.61,
        ci: [0.48, 0.72],
        date: "2026-08-18",
        changeReason: COHORT_CHANGE,
        gitSha: "df6b410",
      },
    ],
  },
  {
    id: "kr-2035-tfr",
    country: "SouthKorea",
    countryLabel: "South Korea",
    year: 2035,
    metric: "TFR",
    metricLabel: "Total Fertility Rate",
    central: 0.54,
    ciLow: 0.40,
    ciHigh: 0.64,
    lockedDate: "2026-08-18",
    modelVersion: "v17.1",
    gitSha: "df6b410",
    status: "pending",
    unit: "children/woman",
    history: [
      {
        version: "v17.0",
        central: 0.52,
        ci: [0.40, 0.64],
        date: "2026-08-18",
        changeReason: "initial lock",
        gitSha: "0fa9f290",
      },
      {
        version: "v17.1",
        central: 0.54,
        ci: [0.40, 0.64],
        date: "2026-08-18",
        changeReason: COHORT_CHANGE,
        gitSha: "df6b410",
      },
    ],
  },
  {
    id: "us-2030-tfr",
    country: "USA",
    countryLabel: "United States",
    year: 2030,
    metric: "TFR",
    metricLabel: "Total Fertility Rate",
    central: 1.35,
    ciLow: 1.25,
    ciHigh: 1.65,
    lockedDate: "2026-08-18",
    modelVersion: "v17.1",
    gitSha: "df6b410",
    status: "pending",
    unit: "children/woman",
    history: [
      {
        version: "v17.0",
        central: 1.45,
        ci: [1.25, 1.65],
        date: "2026-08-18",
        changeReason: "initial lock",
        gitSha: "0fa9f290",
      },
      {
        version: "v17.1",
        central: 1.35,
        ci: [1.25, 1.65],
        date: "2026-08-18",
        changeReason: COHORT_CHANGE,
        gitSha: "df6b410",
      },
    ],
  },
  {
    id: "jp-2030-tfr",
    country: "Japan",
    countryLabel: "Japan",
    year: 2030,
    metric: "TFR",
    metricLabel: "Total Fertility Rate",
    central: 1.01,
    ciLow: 0.88,
    ciHigh: 1.20,
    lockedDate: "2026-08-18",
    modelVersion: "v17.1",
    gitSha: "df6b410",
    status: "pending",
    unit: "children/woman",
    history: [
      {
        version: "v17.0",
        central: 1.04,
        ci: [0.88, 1.20],
        date: "2026-08-18",
        changeReason: "initial lock",
        gitSha: "0fa9f290",
      },
      {
        version: "v17.1",
        central: 1.01,
        ci: [0.88, 1.20],
        date: "2026-08-18",
        changeReason: COHORT_CHANGE,
        gitSha: "df6b410",
      },
    ],
  },
  {
    id: "br-2030-tfr",
    country: "Brazil",
    countryLabel: "Brazil",
    year: 2030,
    metric: "TFR",
    metricLabel: "Total Fertility Rate",
    central: 1.44,
    ciLow: 1.40,
    ciHigh: 1.68,
    lockedDate: "2026-08-18",
    modelVersion: "v17.1",
    gitSha: "df6b410",
    status: "pending",
    unit: "children/woman",
    history: [
      {
        version: "v17.0",
        central: 1.55,
        ci: [1.40, 1.68],
        date: "2026-08-18",
        changeReason: "initial lock",
        gitSha: "0fa9f290",
      },
      {
        version: "v17.1",
        central: 1.44,
        ci: [1.40, 1.68],
        date: "2026-08-18",
        changeReason: COHORT_CHANGE,
        gitSha: "df6b410",
      },
    ],
  },
  {
    id: "global-2040-tfr",
    country: "Global",
    countryLabel: "Global",
    year: 2040,
    metric: "TFR",
    metricLabel: "Total Fertility Rate",
    central: 1.78,
    ciLow: 1.55,
    ciHigh: 2.05,
    lockedDate: "2026-08-18",
    modelVersion: "v17.0",
    gitSha: "0fa9f290",
    status: "pending",
    unit: "children/woman",
    history: [
      {
        version: "v17.0",
        central: 1.78,
        ci: [1.55, 2.05],
        date: "2026-08-18",
        changeReason: "initial lock",
        gitSha: "0fa9f290",
      },
    ],
  },
  {
    id: "global-2050-sperm",
    country: "Global",
    countryLabel: "Global",
    year: 2050,
    metric: "SpermConc_pctOf2020",
    metricLabel: "Sperm concentration (% of 2020)",
    central: 62.0,
    ciLow: 48.0,
    ciHigh: 75.0,
    lockedDate: "2026-08-18",
    modelVersion: "v17.0",
    gitSha: "0fa9f290",
    status: "pending",
    unit: "%",
    history: [
      {
        version: "v17.0",
        central: 62.0,
        ci: [48.0, 75.0],
        date: "2026-08-18",
        changeReason: "initial lock",
        gitSha: "0fa9f290",
      },
    ],
  },
  {
    id: "global-2040-sex-ratio",
    country: "Global",
    countryLabel: "Global",
    year: 2040,
    metric: "sex_ratio_male_frac",
    metricLabel: "Sex ratio at birth (fraction male)",
    central: 0.509,
    ciLow: 0.507,
    ciHigh: 0.511,
    lockedDate: "2026-08-19",
    modelVersion: "v17.1",
    gitSha: "df6b410",
    status: "pending",
    unit: "fraction",
    history: [
      {
        version: "v17.1",
        central: 0.509,
        ci: [0.507, 0.511],
        date: "2026-08-19",
        changeReason: "initial lock — ROS-mediated X>Y sperm sensitivity shifts ratio from 0.512 baseline",
        gitSha: "df6b410",
      },
    ],
  },
  {
    id: "kr-2040-feedback-tfr",
    country: "SouthKorea",
    countryLabel: "South Korea",
    year: 2040,
    metric: "feedback_TFR",
    metricLabel: "TFR with urbanization feedback",
    central: 0.39,
    ciLow: 0.30,
    ciHigh: 0.48,
    lockedDate: "2026-08-19",
    modelVersion: "v17.1",
    gitSha: "df6b410",
    status: "pending",
    unit: "children/woman",
    history: [
      {
        version: "v17.1",
        central: 0.39,
        ci: [0.30, 0.48],
        date: "2026-08-19",
        changeReason: "initial lock — feedback loop: TFR decline → urbanization → EMF density ↑ → further TFR decline",
        gitSha: "df6b410",
      },
    ],
  },
  {
    id: "csli-1-usa-tfr-acceleration",
    country: "USA",
    countryLabel: "United States",
    year: 2030,
    metric: "sentinel_cascade_TFR_acceleration",
    metricLabel: "TFR decline acceleration (sentinel cascade)",
    central: -0.08,
    ciLow: -0.12,
    ciHigh: -0.04,
    lockedDate: "2026-08-19",
    modelVersion: "CSLI-1",
    gitSha: "csli_panel",
    status: "pending",
    unit: "Δ children/woman/year",
    history: [
      {
        version: "CSLI-1",
        central: -0.08,
        ci: [-0.12, -0.04],
        date: "2026-08-19",
        changeReason:
          "initial lock — sentinel cascade: USA record bee colony losses 2024-2025 (55.6%) predict accelerated TFR decline by 2029-2030 via 5±2 year cross-species lag. Falsification: if USA TFR does NOT decline faster in 2029-2030 than 2024-2025 trend",
        gitSha: "csli_panel",
      },
    ],
  },
  {
    id: "sleep-1-faraday-vs-bluefilter",
    country: "Global",
    countryLabel: "Global",
    year: 2030,
    metric: "sleep_quality_faraday",
    metricLabel: "PSG sleep quality: Faraday vs blue-light filter",
    central: 2.0,
    ciLow: 1.5,
    ciHigh: 3.0,
    lockedDate: "2026-08-21",
    modelVersion: "SLEEP-1",
    gitSha: "walker_integration",
    status: "pending" as const,
    unit: "effect ratio (Faraday / blue-filter)",
    history: [
      {
        version: "SLEEP-1",
        central: 2.0,
        ci: [1.5, 3.0] as [number, number],
        date: "2026-08-21",
        changeReason:
          "Faraday-shielded bedroom improves PSG sleep quality (slow-wave sleep, REM fraction, sleep latency) more than blue-light filtering alone. Central: Faraday effect ≥ 2× blue-filter effect. Falsification: blue-filter ≥ Faraday, or neither affects sleep.",
        gitSha: "walker_integration",
      },
    ],
  },
];
