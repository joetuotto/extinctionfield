"""Leakage-free historical validation for the external-data BERM pathway.

This is intentionally separate from :mod:`berm.v16` and
:mod:`berm.stats.model_comparison`.  Those modules retain the historical
model's useful diagnostics, but they anchor parameters in 2024 and generate
annual exposure from internal technology curves.  This module instead:

* loads one uniform World Bank TFR panel;
* obtains annual exposure from ``external_exposure`` only;
* fits all demand/baseline terms at or before an explicit ``train_end``; and
* evaluates later years without changing the fitted model.

The resulting score is a *conditional hindcast*: observed post-cutoff mobile
and urban series are allowed as exogenous covariates, while post-cutoff TFR is
not.  It is not an ex-ante forecast of future exposure.  That distinction is
carried in every result payload.
"""

from __future__ import annotations

import csv
import hashlib
import json
import math
from dataclasses import asdict, dataclass, is_dataclass
from pathlib import Path
from statistics import median
from typing import Any, Iterable, Literal, Mapping, Sequence

from berm.stats.external_exposure import exposure_from_data
from berm.stats.temporal_core import TemporalCoreResult, response_from_external_exposure
from berm.stats.wce import (
    CohortAgeKernel,
    CumulativeKernel,
    ExponentialKernel,
    LagKernel,
    SplineKernel,
    calibrate_wce_scale,
    lag_profile,
    memory_from_series,
)


DEFAULT_START_YEAR = 1960
DEFAULT_END_YEAR = 2024
DEFAULT_TREND_WINDOW = 10
DEFAULT_DAMPING = 0.90
DEFAULT_INNER_VALIDATION_YEARS = 5

_DATA_DIR = Path(__file__).resolve().parents[2] / "data" / "processed"

# The grid is fixed before any backtest.  It deliberately includes very short
# and essentially cumulative (long) biological memories as specified.
DEFAULT_TAU_GRID: tuple[float, ...] = tuple(
    [0.5 * value for value in range(1, 10)]
    + [float(value) for value in range(5, 20)]
    + [float(value) for value in range(20, 55, 5)]
)


class DataCoverageError(ValueError):
    """Raised when a requested panel cannot be built without extrapolation."""


@dataclass(frozen=True)
class ExposureRecord:
    """One externally derived country-year exposure plus provenance flags."""

    year: int
    total: float
    ambient: float
    personal: float
    mobile_status: str
    urban_status: str
    broadband_status: str
    source_metadata: Mapping[str, Any]

    @property
    def imputed(self) -> bool:
        return self.mobile_status == "interpolated" or self.urban_status == "interpolated"


@dataclass(frozen=True)
class CountryPanel:
    """Uniform observed-TFR and external-exposure input for one country."""

    country: str
    iso3: str
    tfr: Mapping[int, float]
    exposure: Mapping[int, ExposureRecord]
    start_year: int
    end_year: int
    exposure_source: str = "world_bank_proxy"

    @property
    def interpolation_fraction(self) -> float:
        if not self.exposure:
            return 0.0
        return sum(record.imputed for record in self.exposure.values()) / len(self.exposure)

    @property
    def broadband_available_fraction(self) -> float:
        if not self.exposure:
            return 0.0
        return sum(
            record.broadband_status in {"observed", "interpolated"}
            for record in self.exposure.values()
        ) / len(self.exposure)

    def exposure_totals(self) -> dict[int, float]:
        return {year: record.total for year, record in self.exposure.items()}


@dataclass(frozen=True)
class PanelLoadResult:
    """All usable country panels plus transparent exclusions."""

    panels: Mapping[str, CountryPanel]
    exclusions: Mapping[str, str]
    start_year: int
    end_year: int
    source_checksums: Mapping[str, str]


@dataclass(frozen=True)
class DampedTrendFit:
    """Pre-specified local-linear, damped M0 baseline fitted only in train."""

    train_end: int
    last_observed: float
    slope: float
    window_start: int
    damping: float

    def predict(self, year: int) -> float:
        if year < self.train_end:
            raise ValueError("DampedTrendFit only predicts at or after train_end")
        steps = year - self.train_end
        if steps == 0:
            return self.last_observed
        if self.damping == 1.0:
            change = self.slope * steps
        else:
            change = self.slope * (1.0 - self.damping ** steps) / (1.0 - self.damping)
        # TFR cannot be negative; 10 is an intentionally generous physical
        # guardrail rather than a fitted ceiling.
        return max(0.05, min(10.0, self.last_observed + change))


@dataclass(frozen=True)
class FittedCountryModel:
    """Train-only country demand component around the shared BERM response."""

    baseline: DampedTrendFit
    reference_bio_behavior: float
    demand_at_train_end: float


@dataclass(frozen=True)
class FittedTemporalModel:
    """A frozen external-exposure BERM model for one outer train cutoff."""

    train_start: int
    train_end: int
    kernel_name: str
    kernel_parameters: Mapping[str, Any]
    exposure_scale: float
    country_models: Mapping[str, FittedCountryModel]
    outcome_definition: str
    conditional_hindcast: bool
    source_checksums: Mapping[str, str]
    input_policy: Mapping[str, Any]


@dataclass(frozen=True)
class Prediction:
    """One post-cutoff BERM prediction with its explicit decomposition."""

    country: str
    year: int
    predicted_tfr: float
    m0_tfr: float
    demand: float
    memory_exposure: float
    bio_capacity: float
    behavioral_factor: float
    bio_behavior: float
    ambient: float
    personal: float
    interpolation_used: bool


@dataclass(frozen=True)
class ErrorMetrics:
    """Common scorecard for BERM and M0 on exactly the same rows."""

    rmse: float
    mae: float
    bias: float
    max_abs_error: float
    n: int


@dataclass(frozen=True)
class CountryBacktest:
    """Per-country fixed-cutoff evaluation for one scenario."""

    country: str
    iso3: str
    train_end: int
    test_start: int
    test_end: int
    berm: ErrorMetrics
    m0: ErrorMetrics
    berm_wins: bool
    interpolation_fraction: float
    broadband_available_fraction: float
    rows: tuple[Mapping[str, Any], ...]


@dataclass(frozen=True)
class KernelSelection:
    """One kernel family's train-only inner-validation outcome."""

    family: str
    kernel_parameters: Mapping[str, Any]
    inner_train_end: int
    validation_start: int
    validation_end: int
    rmse: float
    mae: float
    exposure_scale: float
    lag_profile: tuple[float, ...]


@dataclass(frozen=True)
class RollingScenarioResult:
    """A full outer rolling backtest and its preceding kernel selection."""

    name: str
    train_start: int
    train_end: int
    test_start: int
    test_end: int
    selected_kernel: KernelSelection
    kernel_comparison: Mapping[str, KernelSelection]
    fitted_model: FittedTemporalModel
    aggregate_berm: ErrorMetrics
    aggregate_m0: ErrorMetrics
    median_country_berm_rmse: float
    median_country_m0_rmse: float
    berm_wins: int
    m0_wins_or_ties: int
    country_results: Mapping[str, CountryBacktest]
    conditional_hindcast: bool = True


@dataclass(frozen=True)
class CountryLagLOOCV:
    """One country-held-out lag-family validation result."""

    country: str
    family: str
    kernel_parameters: Mapping[str, Any]
    berm: ErrorMetrics
    m0: ErrorMetrics
    exposure_scale: float
    inner_train_end: int
    validation_start: int
    validation_end: int


@dataclass(frozen=True)
class LagLOOCVResult:
    """Nested country-LOOCV score for one lag family."""

    family: str
    berm: ErrorMetrics
    m0: ErrorMetrics
    berm_wins: int
    m0_wins_or_ties: int
    per_country: Mapping[str, CountryLagLOOCV]


@dataclass(frozen=True)
class ExposureSourceComparison:
    """Pre-specified M1 comparison of external versus legacy exposure input."""

    external: LagLOOCVResult
    endogenous_legacy: LagLOOCVResult
    default_source: Literal["external", "endogenous_legacy"]
    external_within_105_percent: bool
    interpretation: str


@dataclass(frozen=True)
class StandardBacktestResult:
    """Versioned public result of the three pre-specified historical tests."""

    version: str
    panel: PanelLoadResult
    scenarios: Mapping[str, RollingScenarioResult]
    exposure_source_comparisons: Mapping[str, ExposureSourceComparison]
    lag_loocv: Mapping[str, Mapping[str, LagLOOCVResult]]
    future_prediction_status: Mapping[str, Any]


def _input_path(data_dir: str | Path | None, filename: str) -> Path:
    return (Path(data_dir) if data_dir is not None else _DATA_DIR) / filename


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(64 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _read_tfr_by_iso3(data_dir: str | Path | None) -> dict[str, dict[int, float]]:
    """Read the uniform processed World Bank outcome panel, never manual overrides."""

    path = _input_path(data_dir, "tfr_by_country_year.csv")
    if not path.is_file():
        raise FileNotFoundError(f"missing observed TFR input: {path}")
    rows: dict[str, dict[int, float]] = {}
    with path.open(newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            try:
                iso3 = str(row["country_iso3"]).upper()
                year = int(row["year"])
                value = float(row["tfr"])
            except (KeyError, TypeError, ValueError):
                continue
            if len(iso3) == 3 and math.isfinite(value) and value > 0:
                rows.setdefault(iso3, {})[year] = value
    return rows


def _country_selector_matches(
    selector: set[str] | None,
    *,
    iso3: str,
    country: str,
) -> bool:
    if selector is None:
        return True
    normalized = {value.casefold() for value in selector}
    return iso3.casefold() in normalized or country.casefold() in normalized


def load_external_panels(
    *,
    countries: Iterable[str] | None = None,
    start_year: int = DEFAULT_START_YEAR,
    end_year: int = DEFAULT_END_YEAR,
    data_dir: str | Path | None = None,
) -> PanelLoadResult:
    """Load complete external-data panels without extrapolating missing inputs.

    A country is included only when all requested years have both an observed
    TFR and an externally available mobile/urban-derived exposure.  Values
    between observations may be linearly interpolated by the source layer and
    remain flagged in the returned panel.  Leading/trailing gaps are excluded,
    never silently filled by a BERM diffusion curve.
    """

    if end_year < start_year:
        raise ValueError("end_year must be at or after start_year")
    selector = set(countries) if countries is not None else None
    outcomes = _read_tfr_by_iso3(data_dir)
    usable: dict[str, CountryPanel] = {}
    exclusions: dict[str, str] = {}
    years = tuple(range(start_year, end_year + 1))

    for iso3 in sorted(outcomes):
        first = exposure_from_data(iso3, start_year, data_dir=data_dir)
        country = first["berm_country"]
        if country is None:
            continue
        if not _country_selector_matches(selector, iso3=iso3, country=country):
            continue
        if any(year not in outcomes[iso3] for year in years):
            exclusions[country] = "missing_observed_tfr_in_requested_window"
            continue

        exposures: dict[int, ExposureRecord] = {}
        failed_reason: str | None = None
        for year in years:
            value = first if year == start_year else exposure_from_data(
                iso3, year, data_dir=data_dir
            )
            if not value["available"]:
                failed_reason = "missing_external_exposure_in_requested_window"
                break
            assert value["total"] is not None
            assert value["ambient"] is not None
            assert value["personal"] is not None
            statuses = value["input_status"]
            exposures[year] = ExposureRecord(
                year=year,
                total=float(value["total"]),
                ambient=float(value["ambient"]),
                personal=float(value["personal"]),
                mobile_status=str(statuses["mobile"]["status"]),
                urban_status=str(statuses["urban"]["status"]),
                broadband_status=str(statuses["broadband"]["status"]),
                source_metadata=dict(value["metadata"]),
            )
        if failed_reason is not None:
            exclusions[country] = failed_reason
            continue

        usable[country] = CountryPanel(
            country=country,
            iso3=iso3,
            tfr={year: outcomes[iso3][year] for year in years},
            exposure=exposures,
            start_year=start_year,
            end_year=end_year,
            exposure_source="world_bank_proxy",
        )

    processed_dir = Path(data_dir) if data_dir is not None else _DATA_DIR
    source_checksums = {
        filename: _sha256(processed_dir / filename)
        for filename in (
            "tfr_by_country_year.csv",
            "mobile_by_country_year.csv",
            "broadband_by_country_year.csv",
            "urban_by_country_year.csv",
        )
        if (processed_dir / filename).is_file()
    }
    return PanelLoadResult(
        panels=usable,
        exclusions=exclusions,
        start_year=start_year,
        end_year=end_year,
        source_checksums=source_checksums,
    )


def load_legacy_exposure_panels(
    external_panels: Mapping[str, CountryPanel],
) -> Mapping[str, CountryPanel]:
    """Construct a labeled legacy exposure comparator on identical outcome rows.

    This is intentionally a comparison helper, not the default pathway.  It
    retains the older internally generated annual exposure functions so the
    Phase-1 source comparison can answer whether replacing them with World
    Bank inputs costs or improves held-out performance.  The output is marked
    ``endogenous_legacy`` in every record and cannot be confused with a
    measured/external series.
    """

    from berm.v16 import chi as legacy_chi
    from berm.v16 import v16_ambient_annual, v16_personal_annual

    legacy_panels: dict[str, CountryPanel] = {}
    for country, panel in external_panels.items():
        records: dict[int, ExposureRecord] = {}
        for year in range(panel.start_year, panel.end_year + 1):
            ambient = float(v16_ambient_annual(country, year))
            personal = float(v16_personal_annual(country, year))
            total = ambient + float(legacy_chi(ambient)) * personal
            records[year] = ExposureRecord(
                year=year,
                total=total,
                ambient=ambient,
                personal=personal,
                mobile_status="model_generated_legacy",
                urban_status="model_generated_legacy",
                broadband_status="not_applicable",
                source_metadata={
                    "source": "legacy BERM technology-diffusion functions",
                    "classification": "model_generated_endogenous_comparator",
                },
            )
        legacy_panels[country] = CountryPanel(
            country=country,
            iso3=panel.iso3,
            tfr=panel.tfr,
            exposure=records,
            start_year=panel.start_year,
            end_year=panel.end_year,
            exposure_source="endogenous_legacy",
        )
    return legacy_panels


def _fit_damped_trend(
    observations: Mapping[int, float],
    *,
    train_start: int,
    train_end: int,
    window: int = DEFAULT_TREND_WINDOW,
    damping: float = DEFAULT_DAMPING,
) -> DampedTrendFit:
    """Fit pre-specified M0 on the final local window of training data only."""

    if not 0 < damping <= 1:
        raise ValueError("damping must lie in (0, 1]")
    window_start = max(train_start, train_end - window + 1)
    years = list(range(window_start, train_end + 1))
    if any(year not in observations for year in years):
        raise DataCoverageError("M0 training window contains missing TFR")
    if len(years) < 2:
        raise DataCoverageError("M0 requires at least two observed training years")
    x_values = [float(year - train_end) for year in years]
    y_values = [float(observations[year]) for year in years]
    mean_x = sum(x_values) / len(x_values)
    mean_y = sum(y_values) / len(y_values)
    denominator = sum((value - mean_x) ** 2 for value in x_values)
    slope = (
        0.0
        if denominator == 0
        else sum((x - mean_x) * (y - mean_y) for x, y in zip(x_values, y_values)) / denominator
    )
    return DampedTrendFit(
        train_end=train_end,
        last_observed=float(observations[train_end]),
        slope=slope,
        window_start=window_start,
        damping=damping,
    )


def _kernel_name(kernel: LagKernel) -> str:
    return kernel.name


def _kernel_parameters(kernel: LagKernel) -> dict[str, Any]:
    if isinstance(kernel, ExponentialKernel):
        return {"tau": kernel.tau, "max_lag": kernel.max_lag}
    if isinstance(kernel, SplineKernel):
        return {
            "coefficients": list(kernel.coefficients),
            "knots": list((0, 5, 10, 15, 20, 30)),
            "max_lag": kernel.max_lag,
        }
    if isinstance(kernel, CohortAgeKernel):
        return {
            "reference_age": kernel.reference_age,
            "developmental_weights": {
                "fetal": 5.0,
                "infant": 4.0,
                "child": 3.0,
                "puberty": 2.0,
                "adult": 1.0,
            },
            "max_lag": kernel.max_lag,
        }
    if isinstance(kernel, CumulativeKernel):
        return {"legacy": True, "max_lag_for_display": kernel.max_lag}
    return {"max_lag": kernel.max_lag}


def _exposure_mapping(panels: Mapping[str, CountryPanel]) -> dict[str, dict[int, float]]:
    return {country: panel.exposure_totals() for country, panel in panels.items()}


def fit_temporal_model(
    panels: Mapping[str, CountryPanel],
    *,
    train_start: int,
    train_end: int,
    kernel: LagKernel,
    source_checksums: Mapping[str, str] | None = None,
    exposure_scale: float | None = None,
) -> FittedTemporalModel:
    """Fit all country demand/baseline terms strictly through ``train_end``.

    The BERM outcome remains ``bioCap × behav × demand``.  Demand is the
    pre-specified M0 damped trend divided by each country's bio-behavioural
    response at the training cutoff, so the BERM factor only changes its
    trajectory relative to the frozen training reference.
    """

    if not panels:
        raise ValueError("at least one country panel is required")
    if train_end < train_start:
        raise ValueError("train_end must be at or after train_start")
    for panel in panels.values():
        if panel.start_year > train_start or panel.end_year < train_end:
            raise DataCoverageError(f"{panel.country} does not cover the training interval")

    resolved_scale = (
        calibrate_wce_scale(
            _exposure_mapping(panels), kernel, start_year=train_start, train_end=train_end
        )
        if exposure_scale is None
        else exposure_scale
    )
    if not math.isfinite(resolved_scale) or resolved_scale <= 0:
        raise ValueError("exposure_scale must be finite and positive")

    country_models: dict[str, FittedCountryModel] = {}
    for country, panel in panels.items():
        baseline = _fit_damped_trend(
            panel.tfr, train_start=train_start, train_end=train_end
        )
        record = panel.exposure[train_end]
        memory = memory_from_series(
            panel.exposure_totals(), train_end, kernel,
            start_year=train_start, scale=resolved_scale,
        )
        core = response_from_external_exposure(
            memory.value, record.ambient, record.personal, country, train_end,
            input_provenance={
                "exposure_source": "World Bank processed mobile/urban proxies",
                "memory_kernel": _kernel_name(kernel),
                "memory_scale": resolved_scale,
                "input_status": {
                    "mobile": record.mobile_status,
                    "urban": record.urban_status,
                    "broadband": record.broadband_status,
                },
            },
            memory_definition=(
                "legacy cumulative external exposure"
                if isinstance(kernel, CumulativeKernel)
                else "normalized external weighted cumulative exposure with train-only scale"
            ),
        )
        if core.bio_behavior <= 0:
            raise ValueError(f"non-positive bio×behav reference for {country}")
        country_models[country] = FittedCountryModel(
            baseline=baseline,
            reference_bio_behavior=core.bio_behavior,
            demand_at_train_end=baseline.last_observed / core.bio_behavior,
        )

    return FittedTemporalModel(
        train_start=train_start,
        train_end=train_end,
        kernel_name=_kernel_name(kernel),
        kernel_parameters=_kernel_parameters(kernel),
        exposure_scale=float(resolved_scale),
        country_models=country_models,
        outcome_definition="World Bank total fertility rate (births per woman)",
        conditional_hindcast=True,
        source_checksums=dict(source_checksums or {}),
        input_policy={
            "outcome": "processed World Bank TFR panel only; no manual overrides",
            "exposure": "World Bank mobile and urban series; linear interpolation inside source bounds only",
            "broadband": "tracked for provenance but excluded from Phase-1 conversion",
            "pretelecom": "existing military/broadcast scenario layers are tagged in exposure provenance",
            "test_covariates": "observed exogenous exposure is allowed in a conditional hindcast",
            "no_future_tfr": True,
        },
    )


def _kernel_from_fitted(model: FittedTemporalModel) -> LagKernel:
    if model.kernel_name == "cum_emf":
        return CumulativeKernel()
    if model.kernel_name == "exp_decay":
        return ExponentialKernel(float(model.kernel_parameters["tau"]))
    if model.kernel_name == "spline":
        coefficients = tuple(float(value) for value in model.kernel_parameters["coefficients"])
        return SplineKernel(coefficients)  # type: ignore[arg-type]
    if model.kernel_name == "cohort_age":
        return CohortAgeKernel(int(model.kernel_parameters["reference_age"]))
    raise ValueError(f"unknown fitted kernel: {model.kernel_name}")


def predict_temporal_model(
    model: FittedTemporalModel,
    panel: CountryPanel,
    year: int,
    *,
    exposure_cutoff: int | None = None,
) -> Prediction:
    """Predict one later TFR without reading a later observed TFR value."""

    if year <= model.train_end:
        raise ValueError("prediction year must be strictly after the frozen train_end")
    cutoff = panel.end_year if exposure_cutoff is None else exposure_cutoff
    if year > cutoff:
        raise DataCoverageError(
            "future external exposure is unavailable; do not generate it with an internal curve"
        )
    if year not in panel.exposure:
        raise DataCoverageError(f"missing external exposure for prediction year {year}")
    try:
        country_model = model.country_models[panel.country]
    except KeyError as exc:
        raise KeyError(f"model contains no train-only demand fit for {panel.country}") from exc

    kernel = _kernel_from_fitted(model)
    record = panel.exposure[year]
    memory = memory_from_series(
        panel.exposure_totals(), year, kernel,
        start_year=model.train_start, scale=model.exposure_scale,
    )
    core: TemporalCoreResult = response_from_external_exposure(
        memory.value, record.ambient, record.personal, panel.country, year,
        input_provenance={
            "exposure_source": "World Bank processed mobile/urban proxies",
            "memory_kernel": model.kernel_name,
            "memory_scale": model.exposure_scale,
            "input_status": {
                "mobile": record.mobile_status,
                "urban": record.urban_status,
                "broadband": record.broadband_status,
            },
        },
        memory_definition=(
            "legacy cumulative external exposure"
            if isinstance(kernel, CumulativeKernel)
            else "normalized external weighted cumulative exposure with frozen train-only scale"
        ),
    )
    m0_tfr = country_model.baseline.predict(year)
    demand = m0_tfr / country_model.reference_bio_behavior
    predicted = max(0.05, min(10.0, core.bio_behavior * demand))
    return Prediction(
        country=panel.country,
        year=year,
        predicted_tfr=predicted,
        m0_tfr=m0_tfr,
        demand=demand,
        memory_exposure=memory.value,
        bio_capacity=core.bio_capacity,
        behavioral_factor=core.behavioral_factor,
        bio_behavior=core.bio_behavior,
        ambient=record.ambient,
        personal=record.personal,
        interpolation_used=record.imputed,
    )


def _metrics(errors: Sequence[float]) -> ErrorMetrics:
    if not errors:
        return ErrorMetrics(float("nan"), float("nan"), float("nan"), float("nan"), 0)
    return ErrorMetrics(
        rmse=math.sqrt(sum(error ** 2 for error in errors) / len(errors)),
        mae=sum(abs(error) for error in errors) / len(errors),
        bias=sum(errors) / len(errors),
        max_abs_error=max(abs(error) for error in errors),
        n=len(errors),
    )


def evaluate_temporal_model(
    model: FittedTemporalModel,
    panels: Mapping[str, CountryPanel],
    *,
    test_start: int,
    test_end: int,
) -> tuple[ErrorMetrics, ErrorMetrics, dict[str, CountryBacktest]]:
    """Evaluate frozen BERM and M0 over the same post-cutoff rows."""

    if test_start <= model.train_end:
        raise ValueError("test_start must be strictly after train_end")
    if test_end < test_start:
        raise ValueError("test_end must be at or after test_start")
    all_berm_errors: list[float] = []
    all_m0_errors: list[float] = []
    results: dict[str, CountryBacktest] = {}
    for country, panel in panels.items():
        if country not in model.country_models:
            continue
        years = [
            year for year in range(test_start, test_end + 1)
            if year in panel.tfr and year in panel.exposure
        ]
        if not years:
            continue
        rows: list[Mapping[str, Any]] = []
        berm_errors: list[float] = []
        m0_errors: list[float] = []
        for year in years:
            prediction = predict_temporal_model(
                model, panel, year, exposure_cutoff=test_end
            )
            observed = panel.tfr[year]
            berm_error = prediction.predicted_tfr - observed
            m0_error = prediction.m0_tfr - observed
            berm_errors.append(berm_error)
            m0_errors.append(m0_error)
            rows.append({
                "year": year,
                "observed_tfr": observed,
                "berm_predicted_tfr": prediction.predicted_tfr,
                "m0_predicted_tfr": prediction.m0_tfr,
                "berm_error": berm_error,
                "m0_error": m0_error,
                "memory_exposure": prediction.memory_exposure,
                "bio_capacity": prediction.bio_capacity,
                "behavioral_factor": prediction.behavioral_factor,
                "bio_behavior": prediction.bio_behavior,
                "ambient": prediction.ambient,
                "personal": prediction.personal,
                "interpolation_used": prediction.interpolation_used,
            })
        berm_metric = _metrics(berm_errors)
        m0_metric = _metrics(m0_errors)
        all_berm_errors.extend(berm_errors)
        all_m0_errors.extend(m0_errors)
        results[country] = CountryBacktest(
            country=country,
            iso3=panel.iso3,
            train_end=model.train_end,
            test_start=test_start,
            test_end=test_end,
            berm=berm_metric,
            m0=m0_metric,
            berm_wins=berm_metric.rmse < m0_metric.rmse,
            interpolation_fraction=panel.interpolation_fraction,
            broadband_available_fraction=panel.broadband_available_fraction,
            rows=tuple(rows),
        )
    return _metrics(all_berm_errors), _metrics(all_m0_errors), results


def _inner_validation_bounds(
    *,
    train_start: int,
    train_end: int,
    validation_years: int,
) -> tuple[int, int]:
    """Return a strictly pre-test temporal split contained in outer training."""

    if validation_years < 1:
        raise ValueError("validation_years must be positive")
    inner_train_end = train_end - validation_years
    if inner_train_end - train_start + 1 < 10:
        raise ValueError("training interval is too short for inner temporal validation")
    return inner_train_end, inner_train_end + 1


def _score_kernel_on_inner_window(
    panels: Mapping[str, CountryPanel],
    *,
    train_start: int,
    train_end: int,
    kernel: LagKernel,
    validation_years: int,
    source_checksums: Mapping[str, str] | None = None,
) -> tuple[ErrorMetrics, ErrorMetrics, float, int, int]:
    """Score a kernel using only an inner held-out tail of outer training."""

    inner_train_end, validation_start = _inner_validation_bounds(
        train_start=train_start, train_end=train_end,
        validation_years=validation_years,
    )
    scale = calibrate_wce_scale(
        _exposure_mapping(panels), kernel,
        start_year=train_start, train_end=inner_train_end,
    )
    model = fit_temporal_model(
        panels,
        train_start=train_start,
        train_end=inner_train_end,
        kernel=kernel,
        source_checksums=source_checksums,
        exposure_scale=scale,
    )
    berm, m0, _ = evaluate_temporal_model(
        model, panels,
        test_start=validation_start, test_end=train_end,
    )
    return berm, m0, scale, inner_train_end, validation_start


def _normalise_coefficients(values: Sequence[float]) -> tuple[float, float, float, float, float]:
    if len(values) != 5:
        raise ValueError("five spline coefficients are required")
    cleaned = [max(0.0, float(value)) for value in values]
    total = sum(cleaned)
    if total <= 0:
        return (0.2, 0.2, 0.2, 0.2, 0.2)
    normalized = tuple(value / total for value in cleaned)
    return normalized  # type: ignore[return-value]


def _fit_spline_kernel(
    panels: Mapping[str, CountryPanel],
    *,
    train_start: int,
    train_end: int,
    validation_years: int,
    coordinate_rounds: int = 3,
    source_checksums: Mapping[str, str] | None = None,
) -> tuple[SplineKernel, ErrorMetrics, ErrorMetrics, float, int, int]:
    """Estimate five non-negative spline coefficients inside outer training.

    A deterministic coordinate search is intentionally used instead of an
    optional numerical package.  Every objective evaluation is an expanding
    temporal validation on training countries only; test-window TFR is never
    read by this routine.
    """

    def score(coefficients: Sequence[float]) -> tuple[ErrorMetrics, ErrorMetrics, float, int, int]:
        kernel = SplineKernel(_normalise_coefficients(coefficients))
        return _score_kernel_on_inner_window(
            panels,
            train_start=train_start,
            train_end=train_end,
            kernel=kernel,
            validation_years=validation_years,
            source_checksums=source_checksums,
        )

    current = [0.2] * 5
    best_berm, best_m0, best_scale, inner_train_end, validation_start = score(current)
    # These fixed factors are part of the estimator, not tuned after seeing
    # outer-test outcomes.  Normalization removes a meaningless overall scale.
    candidate_values = (0.02, 0.05, 0.10, 0.20, 0.35, 0.50, 0.75, 1.0)
    for _ in range(coordinate_rounds):
        improved = False
        for index in range(5):
            coordinate_best = list(current)
            coordinate_score = best_berm
            coordinate_m0 = best_m0
            coordinate_scale = best_scale
            for value in candidate_values:
                candidate = list(current)
                candidate[index] = value
                candidate = list(_normalise_coefficients(candidate))
                berm, m0, scale, _, _ = score(candidate)
                if berm.rmse < coordinate_score.rmse - 1e-12:
                    coordinate_best = candidate
                    coordinate_score = berm
                    coordinate_m0 = m0
                    coordinate_scale = scale
            if coordinate_best != current:
                current = coordinate_best
                best_berm = coordinate_score
                best_m0 = coordinate_m0
                best_scale = coordinate_scale
                improved = True
        if not improved:
            break
    kernel = SplineKernel(_normalise_coefficients(current))
    return kernel, best_berm, best_m0, best_scale, inner_train_end, validation_start


def fit_kernel_family(
    family: Literal["cum_emf", "exp_decay", "spline", "cohort_age"],
    panels: Mapping[str, CountryPanel],
    *,
    train_start: int,
    train_end: int,
    validation_years: int = DEFAULT_INNER_VALIDATION_YEARS,
    tau_grid: Sequence[float] = DEFAULT_TAU_GRID,
    source_checksums: Mapping[str, str] | None = None,
) -> tuple[LagKernel, KernelSelection]:
    """Select one lag family's parameters using training data only."""

    if family == "cum_emf":
        kernel: LagKernel = CumulativeKernel()
        berm, _, _, inner_train_end, validation_start = _score_kernel_on_inner_window(
            panels, train_start=train_start, train_end=train_end, kernel=kernel,
            validation_years=validation_years, source_checksums=source_checksums,
        )
    elif family == "cohort_age":
        kernel = CohortAgeKernel()
        berm, _, _, inner_train_end, validation_start = _score_kernel_on_inner_window(
            panels, train_start=train_start, train_end=train_end, kernel=kernel,
            validation_years=validation_years, source_checksums=source_checksums,
        )
    elif family == "exp_decay":
        if not tau_grid:
            raise ValueError("tau_grid must not be empty")
        scored: list[tuple[ExponentialKernel, ErrorMetrics, int, int]] = []
        for tau in tau_grid:
            candidate = ExponentialKernel(float(tau))
            berm, _, _, inner_train_end, validation_start = _score_kernel_on_inner_window(
                panels, train_start=train_start, train_end=train_end, kernel=candidate,
                validation_years=validation_years, source_checksums=source_checksums,
            )
            scored.append((candidate, berm, inner_train_end, validation_start))
        kernel, berm, inner_train_end, validation_start = min(
            scored, key=lambda item: (item[1].rmse, item[0].tau)
        )
    elif family == "spline":
        spline, berm, _, _, inner_train_end, validation_start = _fit_spline_kernel(
            panels,
            train_start=train_start,
            train_end=train_end,
            validation_years=validation_years,
            source_checksums=source_checksums,
        )
        kernel = spline
    else:
        raise ValueError(f"unknown kernel family: {family}")

    # Once the shape is selected, re-freeze the intensity bridge at the outer
    # training cutoff.  This still reads exposure only, never outer test TFR.
    final_scale = calibrate_wce_scale(
        _exposure_mapping(panels), kernel,
        start_year=train_start, train_end=train_end,
    )
    selection = KernelSelection(
        family=family,
        kernel_parameters=_kernel_parameters(kernel),
        inner_train_end=inner_train_end,
        validation_start=validation_start,
        validation_end=train_end,
        rmse=berm.rmse,
        mae=berm.mae,
        exposure_scale=final_scale,
        lag_profile=lag_profile(kernel),
    )
    return kernel, selection


def compare_lag_families(
    panels: Mapping[str, CountryPanel],
    *,
    train_start: int,
    train_end: int,
    validation_years: int = DEFAULT_INNER_VALIDATION_YEARS,
    tau_grid: Sequence[float] = DEFAULT_TAU_GRID,
    source_checksums: Mapping[str, str] | None = None,
) -> tuple[dict[str, LagKernel], dict[str, KernelSelection]]:
    """Compare M1 cumulative, exponential, spline, and cohort lag families."""

    kernels: dict[str, LagKernel] = {}
    selections: dict[str, KernelSelection] = {}
    for family in ("cum_emf", "exp_decay", "spline", "cohort_age"):
        kernel, selection = fit_kernel_family(
            family, panels,
            train_start=train_start,
            train_end=train_end,
            validation_years=validation_years,
            tau_grid=tau_grid,
            source_checksums=source_checksums,
        )
        kernels[family] = kernel
        selections[family] = selection
    return kernels, selections


def run_rolling_scenario(
    name: str,
    panels: Mapping[str, CountryPanel],
    *,
    train_start: int,
    train_end: int,
    test_end: int,
    validation_years: int = DEFAULT_INNER_VALIDATION_YEARS,
    tau_grid: Sequence[float] = DEFAULT_TAU_GRID,
    source_checksums: Mapping[str, str] | None = None,
) -> RollingScenarioResult:
    """Fit a train-only lag model and evaluate its later conditional hindcast."""

    if test_end <= train_end:
        raise ValueError("test_end must be later than train_end")
    kernels, comparison = compare_lag_families(
        panels,
        train_start=train_start,
        train_end=train_end,
        validation_years=validation_years,
        tau_grid=tau_grid,
        source_checksums=source_checksums,
    )
    selected_name = min(
        comparison, key=lambda family: (comparison[family].rmse, family)
    )
    selected_kernel = kernels[selected_name]
    selected = comparison[selected_name]
    fitted = fit_temporal_model(
        panels,
        train_start=train_start,
        train_end=train_end,
        kernel=selected_kernel,
        source_checksums=source_checksums,
        exposure_scale=selected.exposure_scale,
    )
    aggregate_berm, aggregate_m0, country_results = evaluate_temporal_model(
        fitted, panels, test_start=train_end + 1, test_end=test_end
    )
    country_berm = [result.berm.rmse for result in country_results.values()]
    country_m0 = [result.m0.rmse for result in country_results.values()]
    wins = sum(result.berm_wins for result in country_results.values())
    return RollingScenarioResult(
        name=name,
        train_start=train_start,
        train_end=train_end,
        test_start=train_end + 1,
        test_end=test_end,
        selected_kernel=selected,
        kernel_comparison=comparison,
        fitted_model=fitted,
        aggregate_berm=aggregate_berm,
        aggregate_m0=aggregate_m0,
        median_country_berm_rmse=float(median(country_berm)),
        median_country_m0_rmse=float(median(country_m0)),
        berm_wins=wins,
        m0_wins_or_ties=len(country_results) - wins,
        country_results=country_results,
    )


def nested_lag_loocv(
    panels: Mapping[str, CountryPanel],
    *,
    train_start: int,
    train_end: int,
    validation_years: int = DEFAULT_INNER_VALIDATION_YEARS,
    tau_grid: Sequence[float] = DEFAULT_TAU_GRID,
    families: Sequence[Literal["cum_emf", "exp_decay", "spline", "cohort_age"]] = (
        "cum_emf", "exp_decay", "spline", "cohort_age",
    ),
    source_checksums: Mapping[str, str] | None = None,
) -> Mapping[str, LagLOOCVResult]:
    """Compare lag families with country-held-out, temporally nested validation.

    For each held-out country, tau or spline coefficients are estimated on the
    *other* countries' histories only.  The held-out country's baseline and
    demand are fitted only through the inner train cutoff; its next
    ``validation_years`` TFR observations are then scored.  This is the
    requested LOOCV without the 2024-anchor or hyperparameter leakage in the
    legacy cross-sectional comparison.
    """

    if len(panels) < 2:
        raise ValueError("nested LOOCV requires at least two countries")
    inner_train_end, validation_start = _inner_validation_bounds(
        train_start=train_start, train_end=train_end,
        validation_years=validation_years,
    )
    allowed_families = {"cum_emf", "exp_decay", "spline", "cohort_age"}
    requested_families = tuple(families)
    if not requested_families or any(family not in allowed_families for family in requested_families):
        raise ValueError("families must be a non-empty subset of known lag families")
    by_family: dict[str, dict[str, CountryLagLOOCV]] = {
        family: {} for family in requested_families
    }
    country_items = sorted(panels.items())
    for held_out_country, held_out_panel in country_items:
        training_panels = {
            country: panel for country, panel in country_items
            if country != held_out_country
        }
        for family in by_family:
            kernel, selection = fit_kernel_family(
                family, training_panels,
                train_start=train_start,
                train_end=train_end,
                validation_years=validation_years,
                tau_grid=tau_grid,
                source_checksums=source_checksums,
            )
            # Scale is also frozen from the non-held-out countries and only
            # through the held-out country's inner train cutoff.
            held_out_scale = calibrate_wce_scale(
                _exposure_mapping(training_panels), kernel,
                start_year=train_start, train_end=inner_train_end,
            )
            held_out_model = fit_temporal_model(
                {held_out_country: held_out_panel},
                train_start=train_start,
                train_end=inner_train_end,
                kernel=kernel,
                source_checksums=source_checksums,
                exposure_scale=held_out_scale,
            )
            berm, m0, _ = evaluate_temporal_model(
                held_out_model,
                {held_out_country: held_out_panel},
                test_start=validation_start,
                test_end=train_end,
            )
            by_family[family][held_out_country] = CountryLagLOOCV(
                country=held_out_country,
                family=family,
                kernel_parameters=selection.kernel_parameters,
                berm=berm,
                m0=m0,
                exposure_scale=held_out_scale,
                inner_train_end=inner_train_end,
                validation_start=validation_start,
                validation_end=train_end,
            )

    results: dict[str, LagLOOCVResult] = {}
    for family, country_results in by_family.items():
        wins = 0
        for result in country_results.values():
            # Recover a pooled error vector from per-country metrics is not
            # possible, so calculate a country-balanced aggregate.  n is the
            # common fixed validation window by construction.
            wins += result.berm.rmse < result.m0.rmse
        # RMSE of per-country RMSE values would be wrong.  All current folds
        # use the same number of years, so root mean square of their RMSEs is
        # the correct pooled RMSE; MAE/bias are conservatively retained from
        # the country-balanced summary below.
        rmse = math.sqrt(
            sum(result.berm.rmse ** 2 * result.berm.n for result in country_results.values())
            / sum(result.berm.n for result in country_results.values())
        )
        m0_rmse = math.sqrt(
            sum(result.m0.rmse ** 2 * result.m0.n for result in country_results.values())
            / sum(result.m0.n for result in country_results.values())
        )
        berm_mae = sum(result.berm.mae * result.berm.n for result in country_results.values()) / sum(
            result.berm.n for result in country_results.values()
        )
        m0_mae = sum(result.m0.mae * result.m0.n for result in country_results.values()) / sum(
            result.m0.n for result in country_results.values()
        )
        berm_bias = sum(result.berm.bias * result.berm.n for result in country_results.values()) / sum(
            result.berm.n for result in country_results.values()
        )
        m0_bias = sum(result.m0.bias * result.m0.n for result in country_results.values()) / sum(
            result.m0.n for result in country_results.values()
        )
        max_berm = max(result.berm.max_abs_error for result in country_results.values())
        max_m0 = max(result.m0.max_abs_error for result in country_results.values())
        n = sum(result.berm.n for result in country_results.values())
        results[family] = LagLOOCVResult(
            family=family,
            berm=ErrorMetrics(rmse, berm_mae, berm_bias, max_berm, n),
            m0=ErrorMetrics(m0_rmse, m0_mae, m0_bias, max_m0, n),
            berm_wins=wins,
            m0_wins_or_ties=len(country_results) - wins,
            per_country=country_results,
        )
    return results


def compare_exposure_sources(
    external_panels: Mapping[str, CountryPanel],
    *,
    train_start: int,
    train_end: int,
    validation_years: int = DEFAULT_INNER_VALIDATION_YEARS,
    source_checksums: Mapping[str, str] | None = None,
) -> ExposureSourceComparison:
    """Run the required M1 LOOCV comparison for external and legacy inputs.

    The exact same countries, TFR rows, temporal split, biological core and
    cumulative kernel are used on both sides.  Only the annual exposure source
    changes.  The Phase-1 success rule treats the external source as viable
    when it is no worse than 105% of the endogenous comparator's RMSE.
    """

    legacy_panels = load_legacy_exposure_panels(external_panels)
    external = nested_lag_loocv(
        external_panels,
        train_start=train_start,
        train_end=train_end,
        validation_years=validation_years,
        families=("cum_emf",),
        source_checksums=source_checksums,
    )["cum_emf"]
    endogenous = nested_lag_loocv(
        legacy_panels,
        train_start=train_start,
        train_end=train_end,
        validation_years=validation_years,
        families=("cum_emf",),
        source_checksums=source_checksums,
    )["cum_emf"]
    within_threshold = external.berm.rmse <= endogenous.berm.rmse * 1.05
    default_source: Literal["external", "endogenous_legacy"] = (
        "external" if within_threshold else "endogenous_legacy"
    )
    interpretation = (
        "External World Bank proxy exposure meets the pre-specified 105% "
        "LOOCV threshold and is the default historical-validation input."
        if within_threshold
        else "Legacy endogenous exposure is materially lower-RMSE in this M1 "
        "comparison; retain both paths and do not describe the external path "
        "as the default without revisiting the pre-specified data contract."
    )
    return ExposureSourceComparison(
        external=external,
        endogenous_legacy=endogenous,
        default_source=default_source,
        external_within_105_percent=within_threshold,
        interpretation=interpretation,
    )


STANDARD_SCENARIOS: tuple[tuple[str, int], ...] = (
    ("train_1960_1990_test_1991_2024", 1990),
    ("train_1960_2000_test_2001_2024", 2000),
    ("train_1960_2010_test_2011_2024", 2010),
)


def future_prediction_status(
    *,
    train_end: int = DEFAULT_END_YEAR,
    requested_end: int = 2030,
) -> dict[str, Any]:
    """State the prospective lock boundary without fabricating future exposure.

    The processed outcome panel ends in 2024.  Because the new pathway refuses
    to extrapolate mobile/urban exposure with internal technology curves, a
    numeric 2025–2030 BERM prediction is blocked until a separately locked
    external-exposure scenario is supplied.  Years 2021–2024 are already
    observed and therefore belong to the hindcast, not a new prospective
    registry.
    """

    return {
        "status": "awaiting_locked_external_exposure_scenario",
        "eligible_prospective_years": list(range(train_end + 1, requested_end + 1)),
        "already_observed_years": list(range(2021, train_end + 1)),
        "rule": "No internally generated exposure extrapolation is permitted.",
        "required_before_numeric_lock": (
            "Versioned external mobile/urban exposure scenario or a separately "
            "validated ex-ante exposure forecast."
        ),
    }


def run_standard_backtests(
    *,
    data_dir: str | Path | None = None,
    minimum_countries: int = 50,
    validation_years: int = DEFAULT_INNER_VALIDATION_YEARS,
    tau_grid: Sequence[float] = DEFAULT_TAU_GRID,
    include_nested_loocv: bool = True,
) -> StandardBacktestResult:
    """Run the three pre-registered historical scenarios on all eligible data.

    The eligible cohort is derived from the availability rule, never selected
    on outcome fit.  If fewer than ``minimum_countries`` have a complete
    1960–2024 external panel, execution stops instead of shrinking the sample
    silently.  Each scenario independently compares external and legacy M1
    exposure in nested LOOCV, then uses the pre-specified winning/default
    source to choose its lag kernel from training data only.
    """

    panel = load_external_panels(
        start_year=DEFAULT_START_YEAR,
        end_year=DEFAULT_END_YEAR,
        data_dir=data_dir,
    )
    if len(panel.panels) < minimum_countries:
        raise DataCoverageError(
            f"only {len(panel.panels)} countries meet the external coverage rule; "
            f"at least {minimum_countries} are required"
        )
    scenarios: dict[str, RollingScenarioResult] = {}
    source_comparisons: dict[str, ExposureSourceComparison] = {}
    loocv_results: dict[str, Mapping[str, LagLOOCVResult]] = {}
    for name, train_end in STANDARD_SCENARIOS:
        source_comparison = compare_exposure_sources(
            panel.panels,
            train_start=DEFAULT_START_YEAR,
            train_end=train_end,
            validation_years=validation_years,
            source_checksums=panel.source_checksums,
        )
        source_comparisons[name] = source_comparison
        validation_panels = (
            panel.panels
            if source_comparison.default_source == "external"
            else load_legacy_exposure_panels(panel.panels)
        )
        scenario = run_rolling_scenario(
            name,
            validation_panels,
            train_start=DEFAULT_START_YEAR,
            train_end=train_end,
            test_end=DEFAULT_END_YEAR,
            validation_years=validation_years,
            tau_grid=tau_grid,
            source_checksums=panel.source_checksums,
        )
        scenarios[name] = scenario
        if include_nested_loocv:
            loocv_results[name] = nested_lag_loocv(
                validation_panels,
                train_start=DEFAULT_START_YEAR,
                train_end=train_end,
                validation_years=validation_years,
                tau_grid=tau_grid,
                source_checksums=panel.source_checksums,
            )
    return StandardBacktestResult(
        version="berm-external-temporal-validation-v1",
        panel=panel,
        scenarios=scenarios,
        exposure_source_comparisons=source_comparisons,
        lag_loocv=loocv_results,
        future_prediction_status=future_prediction_status(),
    )


def _json_ready(value: Any) -> Any:
    """Convert nested dataclasses/mappings into stable JSON-compatible values."""

    if is_dataclass(value):
        return _json_ready(asdict(value))
    if isinstance(value, Mapping):
        return {str(key): _json_ready(item) for key, item in value.items()}
    if isinstance(value, tuple | list):
        return [_json_ready(item) for item in value]
    if isinstance(value, Path):
        return str(value)
    if isinstance(value, float) and not math.isfinite(value):
        return None
    return value


def export_standard_backtests(
    output_path: str | Path,
    *,
    data_dir: str | Path | None = None,
    minimum_countries: int = 50,
    validation_years: int = DEFAULT_INNER_VALIDATION_YEARS,
    tau_grid: Sequence[float] = DEFAULT_TAU_GRID,
    include_nested_loocv: bool = True,
) -> dict[str, Any]:
    """Execute and write the single versioned public validation artifact."""

    result = run_standard_backtests(
        data_dir=data_dir,
        minimum_countries=minimum_countries,
        validation_years=validation_years,
        tau_grid=tau_grid,
        include_nested_loocv=include_nested_loocv,
    )
    payload = _json_ready(result)
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2, sort_keys=True)
        handle.write("\n")
    return payload


def _main(argv: Sequence[str] | None = None) -> int:
    """Small reproducible CLI for generating the website validation artifact."""

    import argparse

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", required=True, help="Path for rolling_backtest.json")
    parser.add_argument("--data-dir", help="Directory containing processed World Bank CSVs")
    parser.add_argument("--no-nested-loocv", action="store_true")
    parser.add_argument("--minimum-countries", type=int, default=50)
    args = parser.parse_args(argv)
    payload = export_standard_backtests(
        args.output,
        data_dir=args.data_dir,
        minimum_countries=args.minimum_countries,
        include_nested_loocv=not args.no_nested_loocv,
    )
    print(
        f"Wrote {args.output}: {len(payload['panel']['panels'])} eligible countries, "
        f"{len(payload['scenarios'])} scenarios"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(_main())
