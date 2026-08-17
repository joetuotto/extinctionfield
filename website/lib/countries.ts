export interface CountryData {
  code: string;
  name: string;
  region: string;
  tfr2024: number;
  mobilePerHundred2024: number;
  exposureHistory: {
    year: number;
    ambient: number;
    personal: number;
    combined: number;
  }[];
  biomarkers: {
    year: number;
    ros: number;
    sdf: number;
    motility: number;
    concentration: number;
  }[];
  tfrHistory: {
    year: number;
    observed: number;
    predicted: number;
    ciLow: number;
    ciHigh: number;
  }[];
}

/* ─── helper: linearly interpolate between waypoints ─── */
function lerp(
  waypoints: [number, number][],
  years: number[]
): number[] {
  return years.map((y) => {
    const before = waypoints.filter((w) => w[0] <= y);
    const after = waypoints.filter((w) => w[0] >= y);
    if (before.length === 0) return after[0][1];
    if (after.length === 0) return before[before.length - 1][1];
    const [y0, v0] = before[before.length - 1];
    const [y1, v1] = after[0];
    if (y0 === y1) return v0;
    return v0 + ((v1 - v0) * (y - y0)) / (y1 - y0);
  });
}

const YEARS = Array.from({ length: 31 }, (_, i) => 2000 + i); // 2000-2030

function buildCountry(opts: {
  code: string;
  name: string;
  region: string;
  tfr2024: number;
  mobilePerHundred2024: number;
  ambientWaypoints: [number, number][];
  personalWaypoints: [number, number][];
  rosWaypoints: [number, number][];
  sdfWaypoints: [number, number][];
  motilityWaypoints: [number, number][];
  concentrationWaypoints: [number, number][];
  tfrObservedWaypoints: [number, number][];
  tfrPredictedWaypoints: [number, number][];
  ciWidth: number; // half-width of 95% CI relative to predicted
}): CountryData {
  const ambient = lerp(opts.ambientWaypoints, YEARS);
  const personal = lerp(opts.personalWaypoints, YEARS);
  const ros = lerp(opts.rosWaypoints, YEARS);
  const sdf = lerp(opts.sdfWaypoints, YEARS);
  const motility = lerp(opts.motilityWaypoints, YEARS);
  const concentration = lerp(opts.concentrationWaypoints, YEARS);
  const tfrObs = lerp(opts.tfrObservedWaypoints, YEARS);
  const tfrPred = lerp(opts.tfrPredictedWaypoints, YEARS);

  const round2 = (n: number) => Math.round(n * 100) / 100;

  return {
    code: opts.code,
    name: opts.name,
    region: opts.region,
    tfr2024: opts.tfr2024,
    mobilePerHundred2024: opts.mobilePerHundred2024,
    exposureHistory: YEARS.map((y, i) => ({
      year: y,
      ambient: round2(ambient[i]),
      personal: round2(personal[i]),
      combined: round2(ambient[i] + personal[i]),
    })),
    biomarkers: YEARS.map((y, i) => ({
      year: y,
      ros: round2(ros[i]),
      sdf: round2(sdf[i]),
      motility: round2(motility[i]),
      concentration: round2(concentration[i]),
    })),
    tfrHistory: YEARS.map((y, i) => ({
      year: y,
      observed: y <= 2024 ? round2(tfrObs[i]) : 0,
      predicted: round2(tfrPred[i]),
      ciLow: round2(tfrPred[i] - opts.ciWidth),
      ciHigh: round2(tfrPred[i] + opts.ciWidth),
    })),
  };
}

/* ════════════════════════════════════════════════════════
   Country data — plausible trajectories consistent with
   BERM model logic and real-world TFR / mobile data
   ════════════════════════════════════════════════════════ */

export const COUNTRIES: CountryData[] = [
  /* ── Finland ── */
  buildCountry({
    code: "FI",
    name: "Finland",
    region: "Northern Europe",
    tfr2024: 1.26,
    mobilePerHundred2024: 156,
    ambientWaypoints: [
      [2000, 0.08],
      [2005, 0.14],
      [2010, 0.22],
      [2015, 0.35],
      [2020, 0.52],
      [2024, 0.61],
      [2030, 0.74],
    ],
    personalWaypoints: [
      [2000, 0.12],
      [2005, 0.28],
      [2010, 0.48],
      [2015, 0.72],
      [2020, 0.95],
      [2024, 1.08],
      [2030, 1.22],
    ],
    rosWaypoints: [
      [2000, 1.0],
      [2005, 1.15],
      [2010, 1.35],
      [2015, 1.58],
      [2020, 1.82],
      [2024, 1.98],
      [2030, 2.18],
    ],
    sdfWaypoints: [
      [2000, 8],
      [2005, 10],
      [2010, 13],
      [2015, 17],
      [2020, 22],
      [2024, 26],
      [2030, 31],
    ],
    motilityWaypoints: [
      [2000, 62],
      [2005, 59],
      [2010, 55],
      [2015, 50],
      [2020, 45],
      [2024, 42],
      [2030, 38],
    ],
    concentrationWaypoints: [
      [2000, 98],
      [2005, 92],
      [2010, 85],
      [2015, 77],
      [2020, 70],
      [2024, 65],
      [2030, 58],
    ],
    tfrObservedWaypoints: [
      [2000, 1.73],
      [2005, 1.80],
      [2010, 1.87],
      [2015, 1.65],
      [2018, 1.41],
      [2020, 1.37],
      [2022, 1.32],
      [2024, 1.26],
    ],
    tfrPredictedWaypoints: [
      [2000, 1.75],
      [2005, 1.78],
      [2010, 1.84],
      [2015, 1.62],
      [2018, 1.43],
      [2020, 1.38],
      [2022, 1.33],
      [2024, 1.27],
      [2026, 1.23],
      [2028, 1.20],
      [2030, 1.17],
    ],
    ciWidth: 0.11,
  }),

  /* ── South Korea ── */
  buildCountry({
    code: "KR",
    name: "South Korea",
    region: "East Asia",
    tfr2024: 0.72,
    mobilePerHundred2024: 142,
    ambientWaypoints: [
      [2000, 0.10],
      [2005, 0.20],
      [2010, 0.38],
      [2015, 0.55],
      [2020, 0.72],
      [2024, 0.82],
      [2030, 0.95],
    ],
    personalWaypoints: [
      [2000, 0.18],
      [2005, 0.42],
      [2010, 0.75],
      [2015, 1.05],
      [2020, 1.32],
      [2024, 1.45],
      [2030, 1.60],
    ],
    rosWaypoints: [
      [2000, 1.05],
      [2005, 1.30],
      [2010, 1.62],
      [2015, 1.95],
      [2020, 2.30],
      [2024, 2.52],
      [2030, 2.80],
    ],
    sdfWaypoints: [
      [2000, 9],
      [2005, 13],
      [2010, 18],
      [2015, 24],
      [2020, 30],
      [2024, 34],
      [2030, 40],
    ],
    motilityWaypoints: [
      [2000, 60],
      [2005, 55],
      [2010, 48],
      [2015, 42],
      [2020, 36],
      [2024, 32],
      [2030, 27],
    ],
    concentrationWaypoints: [
      [2000, 95],
      [2005, 86],
      [2010, 75],
      [2015, 65],
      [2020, 56],
      [2024, 50],
      [2030, 42],
    ],
    tfrObservedWaypoints: [
      [2000, 1.47],
      [2005, 1.08],
      [2010, 1.23],
      [2015, 1.24],
      [2018, 0.98],
      [2020, 0.84],
      [2022, 0.78],
      [2024, 0.72],
    ],
    tfrPredictedWaypoints: [
      [2000, 1.50],
      [2005, 1.12],
      [2010, 1.20],
      [2015, 1.18],
      [2018, 0.96],
      [2020, 0.85],
      [2022, 0.78],
      [2024, 0.73],
      [2026, 0.66],
      [2028, 0.60],
      [2030, 0.55],
    ],
    ciWidth: 0.13,
  }),

  /* ── United States ── */
  buildCountry({
    code: "US",
    name: "United States",
    region: "North America",
    tfr2024: 1.62,
    mobilePerHundred2024: 120,
    ambientWaypoints: [
      [2000, 0.06],
      [2005, 0.12],
      [2010, 0.20],
      [2015, 0.30],
      [2020, 0.42],
      [2024, 0.50],
      [2030, 0.62],
    ],
    personalWaypoints: [
      [2000, 0.10],
      [2005, 0.25],
      [2010, 0.45],
      [2015, 0.68],
      [2020, 0.88],
      [2024, 1.00],
      [2030, 1.15],
    ],
    rosWaypoints: [
      [2000, 1.0],
      [2005, 1.12],
      [2010, 1.28],
      [2015, 1.48],
      [2020, 1.68],
      [2024, 1.82],
      [2030, 2.02],
    ],
    sdfWaypoints: [
      [2000, 7],
      [2005, 9],
      [2010, 12],
      [2015, 15],
      [2020, 19],
      [2024, 22],
      [2030, 27],
    ],
    motilityWaypoints: [
      [2000, 64],
      [2005, 61],
      [2010, 57],
      [2015, 53],
      [2020, 48],
      [2024, 45],
      [2030, 41],
    ],
    concentrationWaypoints: [
      [2000, 100],
      [2005, 95],
      [2010, 88],
      [2015, 80],
      [2020, 73],
      [2024, 68],
      [2030, 61],
    ],
    tfrObservedWaypoints: [
      [2000, 2.06],
      [2005, 2.05],
      [2010, 1.93],
      [2015, 1.84],
      [2018, 1.73],
      [2020, 1.64],
      [2022, 1.67],
      [2024, 1.62],
    ],
    tfrPredictedWaypoints: [
      [2000, 2.08],
      [2005, 2.04],
      [2010, 1.95],
      [2015, 1.82],
      [2018, 1.72],
      [2020, 1.65],
      [2022, 1.64],
      [2024, 1.60],
      [2026, 1.55],
      [2028, 1.50],
      [2030, 1.45],
    ],
    ciWidth: 0.14,
  }),

  /* ── Japan ── */
  buildCountry({
    code: "JP",
    name: "Japan",
    region: "East Asia",
    tfr2024: 1.20,
    mobilePerHundred2024: 153,
    ambientWaypoints: [
      [2000, 0.09],
      [2005, 0.18],
      [2010, 0.30],
      [2015, 0.45],
      [2020, 0.58],
      [2024, 0.66],
      [2030, 0.78],
    ],
    personalWaypoints: [
      [2000, 0.14],
      [2005, 0.32],
      [2010, 0.55],
      [2015, 0.82],
      [2020, 1.05],
      [2024, 1.18],
      [2030, 1.35],
    ],
    rosWaypoints: [
      [2000, 1.02],
      [2005, 1.20],
      [2010, 1.42],
      [2015, 1.68],
      [2020, 1.92],
      [2024, 2.08],
      [2030, 2.30],
    ],
    sdfWaypoints: [
      [2000, 8],
      [2005, 11],
      [2010, 15],
      [2015, 19],
      [2020, 24],
      [2024, 28],
      [2030, 33],
    ],
    motilityWaypoints: [
      [2000, 61],
      [2005, 57],
      [2010, 52],
      [2015, 47],
      [2020, 42],
      [2024, 38],
      [2030, 34],
    ],
    concentrationWaypoints: [
      [2000, 96],
      [2005, 89],
      [2010, 80],
      [2015, 72],
      [2020, 64],
      [2024, 58],
      [2030, 50],
    ],
    tfrObservedWaypoints: [
      [2000, 1.36],
      [2005, 1.26],
      [2010, 1.39],
      [2015, 1.45],
      [2018, 1.42],
      [2020, 1.33],
      [2022, 1.26],
      [2024, 1.20],
    ],
    tfrPredictedWaypoints: [
      [2000, 1.38],
      [2005, 1.30],
      [2010, 1.37],
      [2015, 1.42],
      [2018, 1.38],
      [2020, 1.32],
      [2022, 1.26],
      [2024, 1.20],
      [2026, 1.15],
      [2028, 1.10],
      [2030, 1.05],
    ],
    ciWidth: 0.135,
  }),

  /* ── India ── */
  buildCountry({
    code: "IN",
    name: "India",
    region: "South Asia",
    tfr2024: 2.0,
    mobilePerHundred2024: 82,
    ambientWaypoints: [
      [2000, 0.02],
      [2005, 0.04],
      [2010, 0.10],
      [2015, 0.18],
      [2020, 0.28],
      [2024, 0.36],
      [2030, 0.48],
    ],
    personalWaypoints: [
      [2000, 0.01],
      [2005, 0.05],
      [2010, 0.15],
      [2015, 0.35],
      [2020, 0.58],
      [2024, 0.72],
      [2030, 0.92],
    ],
    rosWaypoints: [
      [2000, 0.95],
      [2005, 0.98],
      [2010, 1.08],
      [2015, 1.22],
      [2020, 1.42],
      [2024, 1.58],
      [2030, 1.80],
    ],
    sdfWaypoints: [
      [2000, 6],
      [2005, 7],
      [2010, 9],
      [2015, 12],
      [2020, 16],
      [2024, 19],
      [2030, 24],
    ],
    motilityWaypoints: [
      [2000, 68],
      [2005, 66],
      [2010, 63],
      [2015, 58],
      [2020, 53],
      [2024, 49],
      [2030, 44],
    ],
    concentrationWaypoints: [
      [2000, 105],
      [2005, 102],
      [2010, 97],
      [2015, 90],
      [2020, 82],
      [2024, 76],
      [2030, 68],
    ],
    tfrObservedWaypoints: [
      [2000, 3.15],
      [2005, 2.83],
      [2010, 2.50],
      [2015, 2.30],
      [2018, 2.15],
      [2020, 2.05],
      [2022, 2.03],
      [2024, 2.0],
    ],
    tfrPredictedWaypoints: [
      [2000, 3.18],
      [2005, 2.85],
      [2010, 2.52],
      [2015, 2.28],
      [2018, 2.12],
      [2020, 2.04],
      [2022, 2.00],
      [2024, 1.97],
      [2026, 1.90],
      [2028, 1.82],
      [2030, 1.72],
    ],
    ciWidth: 0.18,
  }),

  /* ── Niger ── */
  buildCountry({
    code: "NE",
    name: "Niger",
    region: "West Africa",
    tfr2024: 6.7,
    mobilePerHundred2024: 58,
    ambientWaypoints: [
      [2000, 0.005],
      [2005, 0.01],
      [2010, 0.02],
      [2015, 0.04],
      [2020, 0.07],
      [2024, 0.10],
      [2030, 0.16],
    ],
    personalWaypoints: [
      [2000, 0.001],
      [2005, 0.005],
      [2010, 0.02],
      [2015, 0.06],
      [2020, 0.12],
      [2024, 0.18],
      [2030, 0.30],
    ],
    rosWaypoints: [
      [2000, 0.90],
      [2005, 0.91],
      [2010, 0.93],
      [2015, 0.96],
      [2020, 1.02],
      [2024, 1.08],
      [2030, 1.18],
    ],
    sdfWaypoints: [
      [2000, 5],
      [2005, 5],
      [2010, 6],
      [2015, 6],
      [2020, 7],
      [2024, 8],
      [2030, 10],
    ],
    motilityWaypoints: [
      [2000, 72],
      [2005, 71],
      [2010, 70],
      [2015, 69],
      [2020, 67],
      [2024, 66],
      [2030, 63],
    ],
    concentrationWaypoints: [
      [2000, 112],
      [2005, 111],
      [2010, 110],
      [2015, 108],
      [2020, 105],
      [2024, 103],
      [2030, 99],
    ],
    tfrObservedWaypoints: [
      [2000, 7.70],
      [2005, 7.55],
      [2010, 7.40],
      [2015, 7.20],
      [2018, 7.05],
      [2020, 6.95],
      [2022, 6.80],
      [2024, 6.70],
    ],
    tfrPredictedWaypoints: [
      [2000, 7.72],
      [2005, 7.58],
      [2010, 7.42],
      [2015, 7.18],
      [2018, 7.02],
      [2020, 6.92],
      [2022, 6.82],
      [2024, 6.72],
      [2026, 6.60],
      [2028, 6.45],
      [2030, 6.28],
    ],
    ciWidth: 0.32,
  }),

  /* ── Brazil ── */
  buildCountry({
    code: "BR",
    name: "Brazil",
    region: "South America",
    tfr2024: 1.55,
    mobilePerHundred2024: 108,
    ambientWaypoints: [
      [2000, 0.04],
      [2005, 0.08],
      [2010, 0.16],
      [2015, 0.26],
      [2020, 0.38],
      [2024, 0.46],
      [2030, 0.58],
    ],
    personalWaypoints: [
      [2000, 0.05],
      [2005, 0.14],
      [2010, 0.30],
      [2015, 0.52],
      [2020, 0.72],
      [2024, 0.85],
      [2030, 1.02],
    ],
    rosWaypoints: [
      [2000, 0.96],
      [2005, 1.05],
      [2010, 1.18],
      [2015, 1.35],
      [2020, 1.55],
      [2024, 1.68],
      [2030, 1.88],
    ],
    sdfWaypoints: [
      [2000, 6],
      [2005, 8],
      [2010, 10],
      [2015, 13],
      [2020, 17],
      [2024, 20],
      [2030, 25],
    ],
    motilityWaypoints: [
      [2000, 66],
      [2005, 63],
      [2010, 59],
      [2015, 55],
      [2020, 50],
      [2024, 47],
      [2030, 42],
    ],
    concentrationWaypoints: [
      [2000, 102],
      [2005, 97],
      [2010, 90],
      [2015, 82],
      [2020, 75],
      [2024, 70],
      [2030, 63],
    ],
    tfrObservedWaypoints: [
      [2000, 2.36],
      [2005, 2.08],
      [2010, 1.82],
      [2015, 1.72],
      [2018, 1.68],
      [2020, 1.65],
      [2022, 1.60],
      [2024, 1.55],
    ],
    tfrPredictedWaypoints: [
      [2000, 2.38],
      [2005, 2.10],
      [2010, 1.85],
      [2015, 1.70],
      [2018, 1.65],
      [2020, 1.62],
      [2022, 1.58],
      [2024, 1.56],
      [2026, 1.55],
      [2028, 1.55],
      [2030, 1.55],
    ],
    ciWidth: 0.14,
  }),

  /* ── Iran ── */
  buildCountry({
    code: "IR",
    name: "Iran",
    region: "Western Asia",
    tfr2024: 1.66,
    mobilePerHundred2024: 145,
    ambientWaypoints: [
      [2000, 0.03],
      [2005, 0.07],
      [2010, 0.15],
      [2015, 0.28],
      [2020, 0.42],
      [2024, 0.52],
      [2030, 0.66],
    ],
    personalWaypoints: [
      [2000, 0.04],
      [2005, 0.12],
      [2010, 0.30],
      [2015, 0.58],
      [2020, 0.85],
      [2024, 1.02],
      [2030, 1.25],
    ],
    rosWaypoints: [
      [2000, 0.94],
      [2005, 1.02],
      [2010, 1.18],
      [2015, 1.40],
      [2020, 1.65],
      [2024, 1.82],
      [2030, 2.08],
    ],
    sdfWaypoints: [
      [2000, 6],
      [2005, 7],
      [2010, 10],
      [2015, 14],
      [2020, 19],
      [2024, 23],
      [2030, 29],
    ],
    motilityWaypoints: [
      [2000, 67],
      [2005, 64],
      [2010, 59],
      [2015, 53],
      [2020, 47],
      [2024, 43],
      [2030, 37],
    ],
    concentrationWaypoints: [
      [2000, 104],
      [2005, 99],
      [2010, 91],
      [2015, 82],
      [2020, 73],
      [2024, 67],
      [2030, 58],
    ],
    tfrObservedWaypoints: [
      [2000, 2.00],
      [2005, 1.85],
      [2010, 1.88],
      [2015, 2.12],
      [2018, 2.08],
      [2020, 1.85],
      [2022, 1.76],
      [2024, 1.66],
    ],
    tfrPredictedWaypoints: [
      [2000, 2.02],
      [2005, 1.88],
      [2010, 1.90],
      [2015, 2.08],
      [2018, 2.02],
      [2020, 1.82],
      [2022, 1.74],
      [2024, 1.68],
      [2026, 1.58],
      [2028, 1.48],
      [2030, 1.38],
    ],
    ciWidth: 0.16,
  }),
];
