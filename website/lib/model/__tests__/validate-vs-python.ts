import { predictTfr } from "../tfr";

// Python reference values from v16_country_tfr()
// NOTE: Python has a key-format bug for compound names (SouthKorea vs "South Korea").
// When called with "South Korea", Python's .get() misses the "SouthKorea" key and
// returns default parameters. Our TypeScript uses correct country-specific data.
// Countries affected: South Korea, DR Congo, Saudi Arabia, South Africa, Sri Lanka.

const PYTHON_REF = [
  { country: "Finland", year: 2000, predicted_tfr: 2.513275, bio_capacity: 6.458624, behavioral: 0.944384, cultural: 0.412051, ivf_share: 0.0, adj_cumulative_exposure: 5.023013, ambient: 0.778041, personal: 0.000136 },
  { country: "Finland", year: 2010, predicted_tfr: 2.025211, bio_capacity: 5.854587, behavioral: 0.896557, cultural: 0.38583, ivf_share: 0.0, adj_cumulative_exposure: 9.591246, ambient: 1.600801, personal: 0.060654 },
  { country: "Finland", year: 2020, predicted_tfr: 1.529622, bio_capacity: 4.529287, behavioral: 0.775811, cultural: 0.415721, ivf_share: 0.045, adj_cumulative_exposure: 22.337119, ambient: 2.626231, personal: 1.364378 },
  { country: "Finland", year: 2024, predicted_tfr: 1.307443, bio_capacity: 3.897959, behavioral: 0.696922, cultural: 0.45, ivf_share: 0.065, adj_cumulative_exposure: 31.815475, ambient: 4.008135, personal: 1.956828 },
  { country: "Japan", year: 2000, predicted_tfr: 2.359001, bio_capacity: 6.511934, behavioral: 0.91374, cultural: 0.396456, ivf_share: 0.0, adj_cumulative_exposure: 7.921889, ambient: 0.788396, personal: 0.000128 },
  { country: "Japan", year: 2010, predicted_tfr: 1.796485, bio_capacity: 5.64955, behavioral: 0.854211, cultural: 0.370397, ivf_share: 0.005, adj_cumulative_exposure: 13.84945, ambient: 2.547421, personal: 0.068465 },
  { country: "Japan", year: 2020, predicted_tfr: 1.347492, bio_capacity: 4.416543, behavioral: 0.738207, cultural: 0.390569, ivf_share: 0.055, adj_cumulative_exposure: 26.725619, ambient: 4.090847, personal: 1.453614 },
  { country: "Japan", year: 2024, predicted_tfr: 1.186682, bio_capacity: 3.967232, behavioral: 0.674846, cultural: 0.41, ivf_share: 0.075, adj_cumulative_exposure: 34.66559, ambient: 4.134384, personal: 1.793549 },
  { country: "Nigeria", year: 2000, predicted_tfr: 6.593708, bio_capacity: 6.351165, behavioral: 0.988853, cultural: 1.049892, ivf_share: 0.0, adj_cumulative_exposure: 0.983398, ambient: 0.114488, personal: 0.000001 },
  { country: "Nigeria", year: 2010, predicted_tfr: 5.97885, bio_capacity: 6.278074, behavioral: 0.982299, cultural: 0.9695, ivf_share: 0.0, adj_cumulative_exposure: 1.567004, ambient: 0.177795, personal: 0.000336 },
  { country: "Nigeria", year: 2020, predicted_tfr: 5.365126, bio_capacity: 6.087497, behavioral: 0.967312, cultural: 0.911118, ivf_share: 0.0, adj_cumulative_exposure: 2.91648, ambient: 0.616581, personal: 0.089109 },
  { country: "Nigeria", year: 2024, predicted_tfr: 5.177964, bio_capacity: 6.028282, behavioral: 0.959316, cultural: 0.89, ivf_share: 0.006, adj_cumulative_exposure: 3.645228, ambient: 0.670217, personal: 0.135098 },
  { country: "USA", year: 2000, predicted_tfr: 3.480597, bio_capacity: 6.040027, behavioral: 0.90459, cultural: 0.637035, ivf_share: 0.0, adj_cumulative_exposure: 8.806831, ambient: 0.80643, personal: 0.00021 },
  { country: "USA", year: 2010, predicted_tfr: 2.699025, bio_capacity: 5.234922, behavioral: 0.843844, cultural: 0.610991, ivf_share: 0.0, adj_cumulative_exposure: 14.924925, ambient: 2.451119, personal: 0.100388 },
  { country: "USA", year: 2020, predicted_tfr: 1.876831, bio_capacity: 3.96244, behavioral: 0.710448, cultural: 0.663366, ivf_share: 0.005, adj_cumulative_exposure: 30.114667, ambient: 3.877153, personal: 1.50354 },
  { country: "USA", year: 2024, predicted_tfr: 1.629448, bio_capacity: 3.522444, behavioral: 0.644322, cultural: 0.7, ivf_share: 0.025, adj_cumulative_exposure: 38.767684, ambient: 3.933473, personal: 1.869843 },
  { country: "Germany", year: 2000, predicted_tfr: 2.582978, bio_capacity: 6.168272, behavioral: 0.914227, cultural: 0.458039, ivf_share: 0.0, adj_cumulative_exposure: 7.875022, ambient: 0.741303, personal: 0.000119 },
  { country: "Germany", year: 2010, predicted_tfr: 2.058199, bio_capacity: 5.578466, behavioral: 0.864667, cultural: 0.426701, ivf_share: 0.0, adj_cumulative_exposure: 12.778262, ambient: 1.552828, personal: 0.052989 },
  { country: "Germany", year: 2020, predicted_tfr: 1.538524, bio_capacity: 4.402679, behavioral: 0.755543, cultural: 0.450954, ivf_share: 0.025, adj_cumulative_exposure: 24.674627, ambient: 2.520472, personal: 1.169023 },
  { country: "Germany", year: 2024, predicted_tfr: 1.337072, bio_capacity: 3.865386, behavioral: 0.688215, cultural: 0.48, ivf_share: 0.045, adj_cumulative_exposure: 32.928394, ambient: 3.75735, personal: 1.662472 },
  { country: "Brazil", year: 2000, predicted_tfr: 2.620421, bio_capacity: 6.520525, behavioral: 0.980457, cultural: 0.409883, ivf_share: 0.0, adj_cumulative_exposure: 1.731698, ambient: 0.172769, personal: 0.000023 },
  { country: "Brazil", year: 2010, predicted_tfr: 2.226581, bio_capacity: 6.332503, behavioral: 0.96356, cultural: 0.364909, ivf_share: 0.0, adj_cumulative_exposure: 3.257655, ambient: 0.695371, personal: 0.011648 },
  { country: "Brazil", year: 2020, predicted_tfr: 1.808623, bio_capacity: 5.583201, behavioral: 0.910065, cultural: 0.354173, ivf_share: 0.005, adj_cumulative_exposure: 8.27626, ambient: 1.541078, personal: 0.57381 },
  { country: "Brazil", year: 2024, predicted_tfr: 1.659591, bio_capacity: 5.157777, behavioral: 0.871446, cultural: 0.36, ivf_share: 0.025, adj_cumulative_exposure: 12.090779, ambient: 2.378628, personal: 0.841632 },
  { country: "India", year: 2000, predicted_tfr: 2.916318, bio_capacity: 6.421207, behavioral: 0.993619, cultural: 0.457086, ivf_share: 0.0, adj_cumulative_exposure: 0.561586, ambient: 0.085066, personal: 0.000005 },
  { country: "India", year: 2010, predicted_tfr: 2.523798, bio_capacity: 6.295457, behavioral: 0.987785, cultural: 0.40585, ivf_share: 0.0, adj_cumulative_exposure: 1.078273, ambient: 0.388453, personal: 0.002584 },
  { country: "India", year: 2020, predicted_tfr: 2.144409, bio_capacity: 5.91068, behavioral: 0.966186, cultural: 0.3755, ivf_share: 0.0, adj_cumulative_exposure: 3.01877, ambient: 1.146638, personal: 0.286971 },
  { country: "India", year: 2024, predicted_tfr: 2.005933, bio_capacity: 5.658994, behavioral: 0.948442, cultural: 0.37, ivf_share: 0.01, adj_cumulative_exposure: 4.646441, ambient: 1.838225, personal: 0.463604 },
];

// South Korea excluded from strict validation — Python has a key-format bug
// where "SouthKorea" dict keys don't match "South Korea" lookups, causing it
// to use generic default parameters. TS uses correct country-specific data.

const TOLERANCE = 0.025; // 2.5% relative — accounts for calibration cascade from corrected South Korea data
const NEAR_ZERO = 1e-4;

function relErr(ts: number, py: number): number {
  if (Math.abs(py) < NEAR_ZERO) return Math.abs(ts - py);
  return Math.abs(ts - py) / Math.abs(py);
}

let pass = 0;
let fail = 0;
const failures: string[] = [];

for (const ref of PYTHON_REF) {
  const ts = predictTfr({ country: ref.country, year: ref.year });

  const checks: [string, number, number][] = [
    ["tfrPredicted", ts.tfrPredicted, ref.predicted_tfr],
    ["bioCapacity", ts.bioCapacity, ref.bio_capacity],
    ["behavioral", ts.behavioral, ref.behavioral],
    ["cultural", ts.cultural, ref.cultural],
    ["ivfShare", ts.ivfShare, ref.ivf_share],
    ["adjCumulativeExposure", ts.adjCumulativeExposure, ref.adj_cumulative_exposure],
    ["ambient", ts.ambient, ref.ambient],
    ["personal", ts.personal, ref.personal],
  ];

  for (const [field, tsVal, pyVal] of checks) {
    const err = relErr(tsVal, pyVal);
    if (err > TOLERANCE) {
      fail++;
      failures.push(
        `  FAIL ${ref.country} ${ref.year} ${field}: TS=${tsVal.toFixed(6)} PY=${pyVal.toFixed(6)} err=${(err * 100).toFixed(1)}%`
      );
    } else {
      pass++;
    }
  }
}

console.log(`\nValidation: ${pass} passed, ${fail} failed out of ${pass + fail} checks`);
console.log(`Tolerance: ${TOLERANCE * 100}% (near-zero threshold: ${NEAR_ZERO})`);
console.log(`Countries tested: ${[...new Set(PYTHON_REF.map(r => r.country))].join(', ')}`);
console.log(`South Korea excluded — Python key-format bug causes it to use default params\n`);

if (failures.length > 0) {
  console.log("FAILURES:");
  for (const f of failures) console.log(f);
  console.log("");
  process.exit(1);
} else {
  console.log("All checks passed!");
}
