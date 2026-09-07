# DKC: identification, saturation and density tests

**Date:** 2026-09-04
**Source instruction:** CODELLE "Dual-Kernel Insight -kehyksen integrointi" (3.9.2026), parts 1, 2 and 8
**Code:** `berm/berm/diagnostics/dual_kernel.py`, `berm/tests/test_dual_kernel.py`
**Status:** T15, T16 and T19 were executed as historical diagnostics. They are
L3 proxy-fit results: they do not identify M4 and do not establish a calibrated
FieldState. The registered route's `fieldStateCalibrated=true` metadata and
version-locked F1–F9 forecast set are separate publication assertions, not
results established by this diagnostic.

All numerical results below are reproducible from the repository, but their
input statuses must remain separate:

| layer | repository input | status and permitted interpretation |
|---|---|---|
| predictor | `v16_ambient_annual + chi(ambient) * v16_personal_annual` | Generated technology-timing proxy. It is not a physical field, personal exposure measurement, FieldState or dose. |
| aggregate TFR through 2023 | WPP estimates preferred, World Bank reported TFR used as fallback in `all_countries_panel.json` | Outcome source data. WPP estimates can themselves be model-based and must not be described as direct measurements. |
| aggregate TFR in 2024 | World Bank reported fallback for all 54 countries in the current diagnostic subset | Source-reported outcome used in the fit. This is distinct from WPP's 2024 medium projection. |
| age-specific 2024 rates | legacy hand-entered `berm.data.asfr.WPP_ASFR` | The year is inside WPP's projection horizon: it is a projection/derived input, not an observation. The canonical processed WPP source has replaced this legacy table for new analyses. |
| fitted \(\tau\), slopes and BIC values | outputs of `berm.berm.diagnostics.dual_kernel` | Model estimates and fit diagnostics, not measured biological parameters. Except for the explicitly labelled country-wise LOOCV column, these tables are in-sample descriptions, not prospective validation. |

In the predictor expression, `ambient` and `personal` are dimensionless legacy
proxy coordinates. `chi` exposes the geometric coefficient
\(\chi_{\mathrm{geo}}(x)=x/\sqrt{1+x^2}\), whose formula and algebraic
properties remain L1. The general Lorentz derivative is directed and signed.
Choosing an observer, positive spatial projection, Euclidean magnitude,
collinearity and dimensionless map so that \(x\propto|\bar A|\) and hence
\(\chi_{\mathrm{geo}}(|\bar A|)\) is a separate L2 bridge. Identifying a
concrete proxy, V/m field or membrane variable with that coordinate remains
open L0→L2. Empirical biological and kernel inputs are L3 component by
component; later L2/L3 components do not downgrade the abstract formula's L1
status.

---

## 1. T15 — dual-kernel time constants

**Framework claim.** `F(t) = α·(E ∗ k_B)(t) + β·(E ∗ k_R)(t)` with
τ_B ≈ 1–2 y and τ_R ≈ 10–15 y, α ≫ β in young age groups and β rising with
cumulative proxy history.

**Design.** Kernels are normalised discrete exponentials, so weights sum to 1
and mean lag equals τ. That normalisation keeps α and β on a common scale
across τ. Country fixed effects throughout.

### 1a. Aggregate TFR fit, 1990–2024, 54 countries

This fit uses the aggregate panel's numerical TFR values without a temporal
holdout. For the current 54-country subset, the 2024 endpoint is the World Bank
reported fallback rather than the WPP medium projection. The LOOCV column is a
leave-one-country-out check; it does not turn 2024 into a preregistered future
test.

| model | best τ | slope | RMSE | BIC | LOOCV RMSE |
|---|---|---|---|---|---|
| single kernel | 0.5 y | α = 0.167 | 0.4779 | −2368.4 | 0.4809 |
| dual kernel, unconstrained | τ_B = 4, τ_R = 6 | α = +4.70, β = −5.12 | 0.4678 | −2433.8 | 0.4726 |
| dual kernel, α ≥ 0 and β ≥ 0 | any pair tested | β → 0 | 0.4779 | −2353.3 | — |

The unconstrained dual kernel wins by 65 BIC units, but only with α and β of
opposite sign. That is the two kernels acting as a difference operator — a
numerical derivative of the proxy — not a fast and a slow arm. Under the
framework's own sign constraint the slow weight goes to zero at every τ pair
and the dual model collapses back to the single one.

**Why.** Kernel collinearity. Every country's predictor history is a smooth
technology-timing proxy, and two exponential memories on a monotone ramp are
almost the same regressor:

| τ pair | Pearson r between regressors |
|---|---|
| τ_B = 1.5, τ_R = 12 | 0.9916 |
| τ_B = 1.0, τ_R = 20 | 0.9838 |
| τ_B = 4.0, τ_R = 6 | 0.9996 |

This is structural, not a sample-size problem. More country-years of a
monotone ramp do not help.

### 1b. Age-resolved legacy ASFR fit, 54 countries × 5 waves

One kernel per age group, log response, country fixed effects. The five waves
in `berm.data.asfr.WPP_ASFR` are 1990, 2000, 2010, 2020 and 2024. The 2024 wave
is a projection, so this is a mixed-status legacy fit rather than an
observed-only fit or out-of-sample validation. An observed-only rerun must use
the canonical provenance-bearing WPP table, stop at 2023 and keep later
projections outside fitting and validation.

| age | best τ | suppression slope | τ within 2 BIC |
|---|---|---|---|
| 15–19 | 1.0 y | +0.2576 | 0.5–2 y |
| 20–24 | 1.0 y | +0.2335 | 1–1.5 y |
| 25–29 | 1.0 y | +0.1457 | 1–2 y |
| 30–34 | 1.5 y | +0.0430 | unidentified |
| 35–39 | — | −0.1072 | unidentified |
| 40–44 | — | −0.1982 | unidentified |
| 45–49 | 0.5 y | +0.1580 | 0.5–2 y (n = 154) |

**Verdict.** This mixed-status fit selects \(\tau\approx1\) y for several
younger age groups, and its fitted suppression slope falls across much of the
reproductive span. It is numerically aligned with the cited US 2007–2024
descriptive profile (−71%, −43%, −23%, −1%, +9%; Hudson & Moscoso Boedo
2026), but the legacy table's 2024 row remains a derived WPP projection. The
age profile is therefore mixed-status rather than observation-only. The result
estimates an association with a technology-timing proxy; it does not measure
or causally identify a biological fast arm. The slow arm is not estimable from
aggregate or age-specific fertility as the repository holds them.

### 1c. What would identify the slow kernel

1. A non-monotone proxy shock. The COVID ambient-proxy dip is the only one on
   record; collinearity breaks as soon as the ramp reverses.
2. Cohort rather than period data — one calendar year mapping to several
   long-run technology-timing proxy histories.
3. A cumulative biomarker (sperm concentration, testosterone) whose own time
   constant is estimable where a period rate's is not.
4. Communities with a truncated technology-timing history at the same
   calendar time (Amish, Haredi), which could help separate long-run history
   from the current proxy level if measured under a prospective protocol.

---

## 2. T16 — saturation anomaly

**Design.** Saturation is dated per country as the first year the model's
smartphone-penetration proxy reaches 95% of its own 2024 ceiling. Fifteen
countries saturated at least five years before 2024. The response compares
the aggregate panel's source-reported TFR at saturation with its 2024 value.
In this 54-country subset those 2024 outcomes are World Bank reported
fallbacks, not WPP 2024 projections. This is a descriptive endpoint comparison
against a technology proxy, not an exposure-dose test.

| country | saturation | TFR then | source-reported TFR 2024 | change |
|---|---|---|---|---|
| South Korea | 2018 | 0.951 | 0.748 | −21.4% |
| Sweden | 2019 | 1.709 | 1.430 | −16.3% |
| Canada | 2019 | 1.476 | 1.250 | −15.3% |
| Denmark | 2019 | 1.698 | 1.470 | −13.4% |
| Japan | 2019 | 1.323 | 1.150 | −13.1% |
| Germany | 2019 | 1.541 | 1.360 | −11.7% |
| Australia | 2019 | 1.666 | 1.481 | −11.1% |
| Finland | 2019 | 1.351 | 1.250 | −7.5% |
| Saudi Arabia | 2019 | 2.490 | 2.308 | −7.3% |
| United Arab Emirates | 2018 | 1.288 | 1.213 | −5.8% |
| Norway | 2019 | 1.533 | 1.450 | −5.4% |
| Israel | 2019 | 3.034 | 2.870 | −5.4% |
| USA | 2018 | 1.715 | 1.627 | −5.1% |
| United Kingdom | 2019 | 1.632 | 1.551 | −5.0% |
| Singapore | 2018 | 0.948 | 0.970 | +2.4% |

Fourteen of fifteen declined; median −7.5%. The one exception, Singapore, was
already at 0.95 when it saturated and has held there — a floor, not a recovery.

**Verdict.** Post-saturation decline is the rule. This is consistent with a
component that keeps accumulating after adoption stops, but does not establish
one: a behavioural account with a stock adjustment (usage intensity rising
after ownership saturates, or cohorts entering after a long technology-use
history) predicts the same pattern. This is an L3 descriptive diagnostic.

---

## 3. T19 — density × technology interaction

**Framework claim.** Ambient exposure scales with transmitter density, so a
`pop_density × tech_penetration × spectral_complexity` term should be
significant and should improve fit over penetration alone.

The implemented regressor is a generated density × technology-timing proxy;
it is not a measured ambient field or dose. Cross-section, 54 countries, using
the current panel's World Bank reported 2024 TFR fallback:

| regressor | r with source-reported TFR 2024 | r with log(TFR / cultural TFR) |
|---|---|---|
| smartphone penetration | −0.8422 | −0.5786 |
| spectral complexity | −0.7366 | −0.5010 |
| log density alone | −0.1528 | — |
| density × technology × spectral | −0.6483 | −0.4785 |

**Verdict: the prediction fails.** The interaction term is weaker than
penetration alone on both the raw and the culturally adjusted response, and
population density on its own carries almost no cross-sectional signal.
Multiplying a near-orthogonal covariate into a good one degrades it. The
descriptive observation that motivated the term still holds at the extremes —
Singapore (interaction 34.2, TFR 0.97) and South Korea (24.2, 0.72) rank
highest — but Australia and Canada are low-density and low-TFR, and Israel is
high-interaction and high-TFR, so the ordering does not generalise.

The interaction is implemented in `density_tech_interaction()` and is
available as a diagnostic. It is not proposed for the prediction pipeline.

---

## 4. Corrections and data gaps found while running these tests

**Corrected.** The model page stated that 30 min exposure plus 23.5 h recovery
gives 97% repair. Under the 6-hour repair half-life that the same sentence
uses to derive its 21% figure, the correct value is 93.4%. Fixed in all five
locales and locked by `test_published_repair_fractions`.

**Data gaps.**

| gap | consequence |
|---|---|
| Hong Kong, Bhutan, Taiwan absent from `COUNTRY_PARAMS` and `TECH_DIFFUSION` | Hong Kong cannot enter the density × technology test at all, although the framework names it as one of three showcase cases. `get_country_params` would silently return a 50 /km² default, two orders of magnitude low; `density_tech_interaction` now raises instead. |
| Cuba, Myanmar, Russia in `TECH_DIFFUSION` but not `COUNTRY_PARAMS` | Silently receive the default `CountryParams(50.0, 0.70, 3000.0, 0.25)`. Myanmar and Cuba are two of the framework's diffusion-shock natural experiments. |
| `website/public/data/rolling_backtest.json` missing | `berm.data.cohorts` expects it as the published Core ISO3 artifact; the name → ISO3 mapping had to be rebuilt locally in `dual_kernel._panel_tfr`. |
| Intended and ideal family size | Not in the repository. Without it the fertility-gap test is specified but unmeasured. |

---

## 5. What this means for the framework's status

The restricted geometric \(\chi_{\mathrm{geo}}\) result retains L1 status.
The technology-proxy mappings, kernel choices and parameters, numerical fits,
and outcome comparisons in this document are L3 component by component. This
legacy fit selects a short-timescale association; it does not measure a fast
biological arm, and the two-arm M4 decomposition remains not identifiable with
the current data (`NOT_IDENTIFIABLE_WITH_CURRENT_DATA`). The saturation pattern
is an L3 descriptive diagnostic. The fertility-gap proposal is an L3 test
specification without the required measurement, and spectral stacking is an
L3 imported/candidate analogy without direct multi-band validation.

These diagnostics do not justify adding or changing a locked forecast. The
separately registered F1–F9 set remains version-locked for falsification under
the DKC route's declared publication contract; a lock is not evidence that
every empirical parameter in this diagnostic has been identified. Any future
forecast outside F1–F9 still waits for a preregistered parameter and data
contract, and part 1a above explains why this panel cannot identify it alone.
