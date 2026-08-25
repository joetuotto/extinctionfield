export interface CountryThresholdData {
  id: string;
  nameEn: string;
  nameFi: string;
  tDeclinePct: number;
  tSource: string;
  tSourceEstimated: boolean;
  cumulativeLoss2024: number;
  thresholdYear: number;
  phase: 1 | 2 | 3;
  tfr2024: number;
  tfrProjection2030: [number, number];
  tfrProjection2035: [number, number];
  color: string;
  tfrHistory: { year: number; tfr: number }[];
}

export const THRESHOLD_COUNTRIES: CountryThresholdData[] = [
  {
    id: "finland",
    nameEn: "Finland",
    nameFi: "Suomi",
    tDeclinePct: 1.2,
    tSource: "Perheentupa 2013",
    tSourceEstimated: false,
    cumulativeLoss2024: 41.2,
    thresholdYear: 2018,
    phase: 2,
    tfr2024: 1.26,
    tfrProjection2030: [1.05, 1.20],
    tfrProjection2035: [0.90, 1.10],
    color: "#3B82F6",
    tfrHistory: [
      { year: 1970, tfr: 1.83 },
      { year: 1975, tfr: 1.69 },
      { year: 1980, tfr: 1.63 },
      { year: 1985, tfr: 1.65 },
      { year: 1990, tfr: 1.78 },
      { year: 1995, tfr: 1.81 },
      { year: 2000, tfr: 1.73 },
      { year: 2005, tfr: 1.80 },
      { year: 2010, tfr: 1.87 },
      { year: 2015, tfr: 1.65 },
      { year: 2018, tfr: 1.41 },
      { year: 2020, tfr: 1.37 },
      { year: 2022, tfr: 1.32 },
      { year: 2024, tfr: 1.26 },
    ],
  },
  {
    id: "usa",
    nameEn: "United States",
    nameFi: "Yhdysvallat",
    tDeclinePct: 1.0,
    tSource: "Travison 2007 (MMAS)",
    tSourceEstimated: false,
    cumulativeLoss2024: 35.7,
    thresholdYear: 2030,
    phase: 1,
    tfr2024: 1.62,
    tfrProjection2030: [1.30, 1.45],
    tfrProjection2035: [1.10, 1.30],
    color: "#EF4444",
    tfrHistory: [
      { year: 1970, tfr: 2.48 },
      { year: 1975, tfr: 1.77 },
      { year: 1980, tfr: 1.84 },
      { year: 1985, tfr: 1.84 },
      { year: 1990, tfr: 2.08 },
      { year: 1995, tfr: 2.02 },
      { year: 2000, tfr: 2.06 },
      { year: 2005, tfr: 2.05 },
      { year: 2010, tfr: 1.93 },
      { year: 2015, tfr: 1.84 },
      { year: 2020, tfr: 1.64 },
      { year: 2024, tfr: 1.62 },
    ],
  },
  {
    id: "denmark",
    nameEn: "Denmark",
    nameFi: "Tanska",
    tDeclinePct: 0.85,
    tSource: "Andersson 2007",
    tSourceEstimated: false,
    cumulativeLoss2024: 31.3,
    thresholdYear: 2035,
    phase: 1,
    tfr2024: 1.55,
    tfrProjection2030: [1.40, 1.55],
    tfrProjection2035: [1.20, 1.40],
    color: "#F59E0B",
    tfrHistory: [
      { year: 1970, tfr: 1.95 },
      { year: 1980, tfr: 1.55 },
      { year: 1985, tfr: 1.45 },
      { year: 1990, tfr: 1.67 },
      { year: 1995, tfr: 1.80 },
      { year: 2000, tfr: 1.77 },
      { year: 2005, tfr: 1.80 },
      { year: 2010, tfr: 1.87 },
      { year: 2015, tfr: 1.71 },
      { year: 2020, tfr: 1.68 },
      { year: 2024, tfr: 1.55 },
    ],
  },
  {
    id: "israel",
    nameEn: "Israel",
    nameFi: "Israel",
    tDeclinePct: 1.0,
    tSource: "Chodick 2020 (102k)",
    tSourceEstimated: false,
    cumulativeLoss2024: 35.7,
    thresholdYear: 2035,
    phase: 1,
    tfr2024: 2.90,
    tfrProjection2030: [2.70, 2.90],
    tfrProjection2035: [2.40, 2.70],
    color: "#10B981",
    tfrHistory: [
      { year: 1970, tfr: 3.97 },
      { year: 1980, tfr: 3.14 },
      { year: 1990, tfr: 3.02 },
      { year: 2000, tfr: 2.95 },
      { year: 2010, tfr: 3.03 },
      { year: 2015, tfr: 3.09 },
      { year: 2020, tfr: 3.01 },
      { year: 2024, tfr: 2.90 },
    ],
  },
  {
    id: "south-korea",
    nameEn: "South Korea",
    nameFi: "Etelä-Korea",
    tDeclinePct: 1.5,
    tSource: "Estimated (highest EMF density)",
    tSourceEstimated: true,
    cumulativeLoss2024: 48.6,
    thresholdYear: 2015,
    phase: 3,
    tfr2024: 0.72,
    tfrProjection2030: [0.55, 0.70],
    tfrProjection2035: [0.50, 0.65],
    color: "#8B5CF6",
    tfrHistory: [
      { year: 1970, tfr: 4.53 },
      { year: 1980, tfr: 2.82 },
      { year: 1990, tfr: 1.57 },
      { year: 2000, tfr: 1.48 },
      { year: 2005, tfr: 1.08 },
      { year: 2010, tfr: 1.23 },
      { year: 2015, tfr: 1.24 },
      { year: 2018, tfr: 0.98 },
      { year: 2020, tfr: 0.84 },
      { year: 2022, tfr: 0.78 },
      { year: 2024, tfr: 0.72 },
    ],
  },
  {
    id: "japan",
    nameEn: "Japan",
    nameFi: "Japani",
    tDeclinePct: 1.2,
    tSource: "Estimated (Finland analogy)",
    tSourceEstimated: true,
    cumulativeLoss2024: 41.2,
    thresholdYear: 2018,
    phase: 2,
    tfr2024: 1.20,
    tfrProjection2030: [1.00, 1.15],
    tfrProjection2035: [0.85, 1.05],
    color: "#EC4899",
    tfrHistory: [
      { year: 1970, tfr: 2.13 },
      { year: 1980, tfr: 1.75 },
      { year: 1990, tfr: 1.54 },
      { year: 2000, tfr: 1.36 },
      { year: 2005, tfr: 1.26 },
      { year: 2010, tfr: 1.39 },
      { year: 2015, tfr: 1.45 },
      { year: 2020, tfr: 1.33 },
      { year: 2024, tfr: 1.20 },
    ],
  },
];

export const PHASE_LABELS = {
  en: {
    1: { title: "Silent Erosion", desc: "T declining but biologically sufficient" },
    2: { title: "Threshold Crossed", desc: "Subfertility rising, TFR accelerating down" },
    3: { title: "Biological Limit", desc: "TFR < 1.0, biology dominates" },
  },
  fi: {
    1: { title: "Hiljainen eroosio", desc: "T laskee mutta biologisesti riittävä" },
    2: { title: "Kynnys ylitetty", desc: "Subfertiliteetti kasvaa, TFR kiihtyy" },
    3: { title: "Biologinen rajoite", desc: "TFR < 1,0, biologia dominoi" },
  },
} as const;

export function computeTIndex(year: number, t0Year: number, rPct: number): number {
  const elapsed = year - t0Year;
  if (elapsed <= 0) return 100;
  return 100 * Math.pow(1 - rPct / 100, elapsed);
}

export function computeThresholdLine(): number {
  return 60;
}
