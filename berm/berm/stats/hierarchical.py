"""Train-only global hierarchical demand models for BERM.

This module is deliberately separate from the locked ``Core-51`` route in
``berm.stats.rolling_backtest``.  It implements the global-extension model
specified for the 2000+ panel:

``TFR = external_bioCap_x_behav(exposure memory) * pooled_ridge_demand``.

The demand model has one globally shared intercept and shared covariate
coefficients.  It has *no* country intercept, country rate, or fitted
country residual.  The corresponding M0 uses the identical rows and
covariates but predicts TFR directly, without the exposure response.

Canonical global-panel schema
-----------------------------
The primary input is the JSON structure written by the global data route::

    {
      "schema_version": "...",
      "countries": {
        "FIN": {
          "years": {
            "2000": {
              "tfr": 1.73,
              "tfr_source": "World Bank",
              "tfr_measurement_type": "observed",
              "mobile_per_100": 72.1,
              "urban_pct": 61.0,
              "gdp_ppp_per_capita": 30000.0,
              "contraception_pct": 75.0,
              "education_years_female": 12.1,
              "religiosity_pct": 30.0,
              "immigrant_share": 3.1,
              "ivf_share": 0.02,
              "field_provenance": {
                "mobile_per_100": {"status": "observed"},
                "urban_pct": {"status": "observed"}
              },
              "missingness": {"ivf_share": true}
            }
          }
        }
      }
    }

``countries`` may also map ISO3 directly to year mappings, and a flat
``records`` list is accepted for ingestion/testing.  Values in mobile and
urban fields are never extrapolated or filled here.  A source-labelled
``interpolated`` value is allowed only as an already in-range source result;
``outside_range``, ``extrapolated``, and ``imputed`` exposure values are
rejected.  Optional demand covariates are instead imputed *inside the fitted
model* with medians calculated from training rows only.

The output of an after-cutoff call to :meth:`HierarchicalBERM.predict` is a
conditional hindcast, not an ex-ante forecast: it uses the observed future
exposure and covariate rows supplied by the caller, but never future TFR to
fit a parameter or select an imputation value.
"""

from __future__ import annotations

from collections import Counter
from collections.abc import Iterable, Mapping, Sequence
from dataclasses import asdict, dataclass
import json
import math
from pathlib import Path
from statistics import median
from typing import Any, Literal


GLOBAL_HIERARCHICAL_VERSION = "global-hierarchical-1"
DEFAULT_RIDGE_ALPHA = 1.0
DEFAULT_DEMAND_FLOOR = 0.05

# The model intentionally has a small, declared feature set.  Features whose
# source column is completely absent in a training split are dropped rather
# than silently assigned an arbitrary global constant.
FEATURE_NAMES: tuple[str, ...] = (
    "log_gdp_ppp_per_capita",
    "education_years_female",
    "urban_fraction",
    "contraception_fraction",
    "religiosity_fraction",
    "immigrant_share",
    "ivf_share",
)

_FEATURE_SOURCE_FIELDS: Mapping[str, tuple[str, ...]] = {
    "log_gdp_ppp_per_capita": ("gdp_ppp_per_capita", "gdp_ppp", "gdp"),
    "education_years_female": (
        "education_years_female",
        "education_years",
        "female_education_years",
    ),
    "urban_fraction": ("urban_pct", "urban_fraction", "urban"),
    "contraception_fraction": (
        "contraception_pct",
        "contraception_fraction",
        "contraception",
    ),
    "religiosity_fraction": (
        "religiosity_pct",
        "religiosity_fraction",
        "religiosity",
    ),
    "immigrant_share": ("immigrant_share", "imm_share", "immigrant_pct"),
    "ivf_share": ("ivf_share", "ivf_pct"),
}

_ROW_FIELD_ALIASES: Mapping[str, tuple[str, ...]] = {
    "tfr": ("tfr", "total_fertility_rate"),
    "tfr_source": ("tfr_source", "source_tfr"),
    "tfr_measurement_type": ("tfr_measurement_type", "tfr_type", "measurement_type"),
    "mobile_per_100": ("mobile_per_100", "mobile_subscriptions_per_100", "mobile"),
    "urban_pct": ("urban_pct", "urban_population_pct", "urban"),
    "gdp_ppp_per_capita": ("gdp_ppp_per_capita", "gdp_ppp", "gdp"),
    "contraception_pct": ("contraception_pct", "contraception", "contraception_fraction"),
    "education_years_female": (
        "education_years_female",
        "education_years",
        "female_education_years",
    ),
    "religiosity_pct": ("religiosity_pct", "religiosity", "religiosity_fraction"),
    "immigrant_share": ("immigrant_share", "imm_share", "immigrant_pct"),
    "ivf_share": ("ivf_share", "ivf_pct"),
}

_EXPOSURE_REJECTED_STATUS_TOKENS = (
    "unavailable",
    "missing",
    "outside",
    "extrapolat",
    "imputed",
    "forecast",
    "projection",
)

_OPTIONAL_REJECTED_STATUS_TOKENS = _EXPOSURE_REJECTED_STATUS_TOKENS


class GlobalPanelSchemaError(ValueError):
    """Raised when a global input cannot be interpreted as country-year data."""


class GlobalDataCoverageError(ValueError):
    """Raised when a prediction would require a missing external input."""


@dataclass(frozen=True)
class GlobalPanelRow:
    """One provenance-preserving ISO3/year observation from the global panel."""

    country_iso3: str
    year: int
    tfr: float | None
    tfr_source: str | None
    tfr_measurement_type: str | None
    mobile_per_100: float | None
    urban_pct: float | None
    gdp_ppp_per_capita: float | None
    contraception_pct: float | None
    education_years_female: float | None = None
    religiosity_pct: float | None = None
    immigrant_share: float | None = None
    ivf_share: float | None = None
    field_provenance: Mapping[str, Any] | None = None
    missingness: Mapping[str, Any] | None = None

    def __post_init__(self) -> None:
        iso3 = str(self.country_iso3).upper()
        if len(iso3) != 3 or not iso3.isalpha():
            raise GlobalPanelSchemaError("country_iso3 must be a three-letter ISO3 code")
        if isinstance(self.year, bool) or int(self.year) != self.year:
            raise GlobalPanelSchemaError("year must be an integer")
        object.__setattr__(self, "country_iso3", iso3)
        object.__setattr__(self, "year", int(self.year))
        object.__setattr__(self, "field_provenance", dict(self.field_provenance or {}))
        object.__setattr__(self, "missingness", dict(self.missingness or {}))


GlobalPanels = Mapping[str, Mapping[int, GlobalPanelRow]]


@dataclass(frozen=True)
class GlobalExternalExposure:
    """Annual global-panel exposure with explicitly zeroed pretelecom layers."""

    country_iso3: str
    year: int
    ambient: float
    personal: float
    chi: float
    total: float
    mobile_status: str
    urban_status: str
    pretelecom_layers: Mapping[str, Mapping[str, Any]]


@dataclass(frozen=True)
class FeatureTransformResult:
    """One transformed covariate vector and its train-median imputation flags."""

    values: tuple[float, ...]
    imputed_features: tuple[str, ...]
    raw_values: Mapping[str, float | None]


@dataclass(frozen=True)
class TrainOnlyFeatureTransform:
    """Feature medians and scaling fitted strictly from an outer train split."""

    feature_names: tuple[str, ...]
    medians: Mapping[str, float]
    means: Mapping[str, float]
    scales: Mapping[str, float]
    n_train_rows: int
    imputed_train_counts: Mapping[str, int]
    dropped_all_missing_features: tuple[str, ...]

    @property
    def imputed_train_shares(self) -> Mapping[str, float]:
        if self.n_train_rows == 0:
            return {name: 0.0 for name in self.feature_names}
        return {
            name: self.imputed_train_counts[name] / self.n_train_rows
            for name in self.feature_names
        }

    def transform(self, row: GlobalPanelRow) -> FeatureTransformResult:
        raw = _raw_feature_values(row)
        values: list[float] = []
        imputed: list[str] = []
        for feature in self.feature_names:
            value = raw[feature]
            if value is None:
                value = self.medians[feature]
                imputed.append(feature)
            values.append((value - self.means[feature]) / self.scales[feature])
        return FeatureTransformResult(
            values=tuple(values),
            imputed_features=tuple(imputed),
            raw_values=raw,
        )


@dataclass(frozen=True)
class RidgeFit:
    """A tiny stdlib ridge fit on already standardized features."""

    alpha: float
    intercept: float
    coefficients: tuple[float, ...]
    feature_names: tuple[str, ...]
    target_definition: str

    def predict(self, values: Sequence[float]) -> float:
        if len(values) != len(self.coefficients):
            raise ValueError("feature vector length differs from fitted ridge model")
        return self.intercept + sum(
            coefficient * value for coefficient, value in zip(self.coefficients, values)
        )

    @property
    def demand_betas(self) -> Mapping[str, float]:
        """Return coefficients in the documented standardized-feature space."""
        result: dict[str, float] = {"intercept": self.intercept}
        result.update(dict(zip(self.feature_names, self.coefficients)))
        return result


@dataclass(frozen=True)
class TrainingEligibility:
    """Exact train-row eligibility accounting, without fitted country effects."""

    train_start: int
    train_end: int
    candidate_rows: int
    eligible_rows: int
    rejected_by_reason: Mapping[str, int]
    outcome_source_counts: Mapping[str, int]
    exposure_status_counts: Mapping[str, int]


@dataclass(frozen=True)
class TrainingObservation:
    """A train-only row used to fit the two globally pooled ridges."""

    country_iso3: str
    year: int
    tfr: float
    bio_behavior: float
    row: GlobalPanelRow
    exposure: GlobalExternalExposure


@dataclass(frozen=True)
class FittedHierarchicalState:
    """All global fitted state; deliberately contains no country-rate mapping."""

    model_kind: Literal["berm", "m0"]
    train_start: int
    train_end: int
    memory_window_years: int | None
    response_definition: str
    feature_transform: TrainOnlyFeatureTransform
    ridge: RidgeFit
    training_eligibility: TrainingEligibility

    @property
    def demand_betas(self) -> Mapping[str, float]:
        return self.ridge.demand_betas


@dataclass(frozen=True)
class HierarchicalPrediction:
    """One no-country-residual post-cutoff prediction."""

    country_iso3: str
    year: int
    predicted_tfr: float
    biological_response: float | None
    covariate_component: float
    imputed_features: tuple[str, ...]
    conditional_hindcast: bool
    future_inputs_used: Mapping[str, Any]
    outcome_used_for_prediction: bool = False

    def as_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class FittedGlobalModels:
    """Matched BERM/M0 fits built from exactly the same training rows."""

    berm: "HierarchicalBERM"
    m0: "HierarchicalM0"
    training_eligibility: TrainingEligibility


def load_global_panel(source: str | Path | Mapping[str, Any]) -> dict[str, dict[int, GlobalPanelRow]]:
    """Load a documented global panel without altering source values.

    This loader accepts the canonical ``countries -> ISO3 -> years`` form,
    direct ``ISO3 -> year`` mappings, and a top-level ``records`` list.  It
    normalizes aliases but does not interpolate, extrapolate, or impute any
    values.  In particular, it preserves per-field provenance and missingness
    so the downstream exposure gate can refuse unsupported mobile/urban rows.
    """
    payload = _read_panel_payload(source)
    if isinstance(payload, Mapping) and isinstance(payload.get("records"), list):
        return _load_record_list(payload["records"])

    if not isinstance(payload, Mapping):
        raise GlobalPanelSchemaError("global panel must be a JSON object or mapping")

    container: Any = payload.get("countries", payload.get("panel", payload))
    if not isinstance(container, Mapping):
        raise GlobalPanelSchemaError("global panel countries must be a mapping")

    result: dict[str, dict[int, GlobalPanelRow]] = {}
    for raw_iso3, country_data in container.items():
        iso3 = str(raw_iso3).upper()
        if len(iso3) != 3 or not iso3.isalpha():
            # Top-level metadata (schema_version, provenance, ...) is not a
            # country.  Invalid values *inside* a country are handled below.
            continue
        years_data = _country_year_container(country_data)
        if years_data is None:
            raise GlobalPanelSchemaError(f"{iso3} has no recognizable year mapping")
        parsed = _parse_country_years(iso3, years_data)
        if parsed:
            result[iso3] = parsed

    if not result:
        raise GlobalPanelSchemaError("global panel contains no usable ISO3/year rows")
    return result


def annual_external_exposure(row: GlobalPanelRow) -> GlobalExternalExposure:
    """Construct the declared global external exposure from mobile and urban.

    The global tier must work for ISO3 codes outside the legacy BERM mapping.
    It therefore never calls country parameter, military, or broadcast
    functions.  The unobserved pretelecom components are fixed at zero and
    explicitly labeled ``SCENARIO_PARAMETER/default_zero`` rather than being
    misrepresented as measurements.
    """
    mobile, mobile_status = _exposure_numeric(row, "mobile_per_100")
    urban, urban_status = _exposure_numeric(row, "urban_pct")
    if mobile is None or urban is None:
        missing = []
        if mobile is None:
            missing.append("mobile_per_100")
        if urban is None:
            missing.append("urban_pct")
        raise GlobalDataCoverageError(
            f"{row.country_iso3} {row.year} lacks non-extrapolated external "
            f"exposure input(s): {', '.join(missing)}"
        )

    ambient = 0.5 * urban / 100.0
    personal = 3.0 * mobile / (mobile + 50.0)
    chi_value = ambient / math.sqrt(1.0 + ambient * ambient)
    total = ambient + chi_value * personal
    pretelecom = {
        "military_ambient": {
            "value": 0.0,
            "classification": "SCENARIO_PARAMETER/default_zero",
            "reason": "No globally observed compatible military layer is supplied.",
        },
        "broadcast_ambient": {
            "value": 0.0,
            "classification": "SCENARIO_PARAMETER/default_zero",
            "reason": "No globally observed compatible broadcast layer is supplied.",
        },
    }
    return GlobalExternalExposure(
        country_iso3=row.country_iso3,
        year=row.year,
        ambient=ambient,
        personal=personal,
        chi=chi_value,
        total=total,
        mobile_status=mobile_status,
        urban_status=urban_status,
        pretelecom_layers=pretelecom,
    )


def pure_external_bio_behavior(memory_exposure: float) -> float:
    """Return the country-parameter-free BERM ``bioCap × behav`` response.

    This exactly retains the pure scalar forms used by the temporal BERM
    route, but deliberately omits ``v12_nutrition_modifier``: that legacy
    helper reads a static, partial country lookup and would create a hidden
    country-parameter path for most of the global ISO3 universe.
    """
    if not math.isfinite(memory_exposure) or memory_exposure < 0:
        raise ValueError("memory_exposure must be a finite non-negative number")
    bio_capacity = (
        6.5
        if memory_exposure <= 5.0
        else 6.5 * math.exp(-0.010 * (memory_exposure - 5.0))
    )
    oxytocin = math.exp(-0.010 * memory_exposure)
    testosterone = math.exp(-0.013 * memory_exposure)
    dopamine = math.exp(-0.016 * memory_exposure)
    cortisol = math.exp(-0.008 * memory_exposure)
    vasopressin = math.exp(-0.006 * memory_exposure)
    effective_testosterone = testosterone * (0.5 + 0.5 * cortisol)
    behavioral = (
        oxytocin * effective_testosterone * dopamine * cortisol * vasopressin
    ) ** (1.0 / 5.0)
    return bio_capacity * max(0.1, behavioral)


def cumulative_external_memory(
    country_panel: Mapping[int, GlobalPanelRow],
    *,
    year: int,
    start_year: int,
    memory_window_years: int | None = None,
) -> tuple[float, GlobalExternalExposure]:
    """Return a strictly observed/existing external cumulative exposure memory.

    A missing mobile/urban input anywhere in the required memory window makes
    the row ineligible.  No technology diffusion curve, carry-forward, or
    extrapolation is used.  ``memory_window_years`` can restrict the memory
    to a fixed recent window; ``None`` retains cumulative exposure from the
    declared train start.
    """
    if year < start_year:
        raise GlobalDataCoverageError("prediction year precedes the declared exposure history")
    if memory_window_years is not None:
        if isinstance(memory_window_years, bool) or memory_window_years < 1:
            raise ValueError("memory_window_years must be a positive integer or None")
        history_start = max(start_year, year - int(memory_window_years) + 1)
    else:
        history_start = start_year

    values: list[float] = []
    current: GlobalExternalExposure | None = None
    for current_year in range(history_start, year + 1):
        try:
            source_row = country_panel[current_year]
        except KeyError as exc:
            raise GlobalDataCoverageError(
                f"missing source row for exposure history at {current_year}"
            ) from exc
        exposure = annual_external_exposure(source_row)
        values.append(exposure.total)
        if current_year == year:
            current = exposure
    assert current is not None
    return sum(values), current


class HierarchicalBERM:
    """A pooled ridge demand model multiplied by a pure external BERM response."""

    def __init__(
        self,
        *,
        alpha: float = DEFAULT_RIDGE_ALPHA,
        memory_window_years: int | None = None,
        demand_floor: float = DEFAULT_DEMAND_FLOOR,
    ) -> None:
        _validate_ridge_alpha(alpha)
        _validate_demand_floor(demand_floor)
        self.alpha = float(alpha)
        self.memory_window_years = memory_window_years
        self.demand_floor = float(demand_floor)
        self.state: FittedHierarchicalState | None = None

    @property
    def demand_betas(self) -> Mapping[str, float] | None:
        return None if self.state is None else self.state.demand_betas

    def fit(
        self,
        panels: GlobalPanels | Mapping[str, Any],
        *,
        train_start: int,
        train_end: int,
    ) -> "HierarchicalBERM":
        """Fit global demand coefficients using only rows through ``train_end``."""
        normalized = _normalize_panels(panels)
        observations, eligibility = build_training_observations(
            normalized,
            train_start=train_start,
            train_end=train_end,
            memory_window_years=self.memory_window_years,
        )
        transform = fit_train_only_feature_transform(observations)
        target = [item.tfr / item.bio_behavior for item in observations]
        ridge = _fit_ridge(
            [transform.transform(item.row).values for item in observations],
            target,
            alpha=self.alpha,
            feature_names=transform.feature_names,
            target_definition="observed_tfr / pure_external_bioCap_x_behav",
        )
        self.state = FittedHierarchicalState(
            model_kind="berm",
            train_start=train_start,
            train_end=train_end,
            memory_window_years=self.memory_window_years,
            response_definition=(
                "pure external v11-like bioCap(memory) * endocrine behav(memory); "
                "fixed neutral nutrition multiplier, no country lookup"
            ),
            feature_transform=transform,
            ridge=ridge,
            training_eligibility=eligibility,
        )
        return self

    def fit_demand_model(
        self,
        train_countries: Iterable[str] | None,
        train_data: GlobalPanels | Mapping[str, Any],
        *,
        data_up_to: int,
        train_start: int | None = None,
    ) -> Mapping[str, float]:
        """Compatibility-oriented explicit demand-fitting entrypoint.

        ``data_up_to`` is the train cutoff.  When no explicit ``train_start``
        is supplied, the earliest available year among the selected countries
        is used and recorded in the fitted state; production backtests should
        pass a fixed train start explicitly.
        """
        panels = _select_countries(_normalize_panels(train_data), train_countries)
        resolved_start = _infer_train_start(panels) if train_start is None else train_start
        self.fit(panels, train_start=resolved_start, train_end=data_up_to)
        assert self.demand_betas is not None
        return self.demand_betas

    def predict_from_panel(
        self,
        country_iso3: str,
        country_panel: Mapping[int, GlobalPanelRow],
        year: int,
    ) -> HierarchicalPrediction:
        """Predict one post-cutoff row without reading its observed TFR."""
        state = self._require_state()
        if year <= state.train_end:
            raise ValueError("hierarchical predictions are restricted to years strictly after train_end")
        iso3 = _iso3(country_iso3)
        try:
            row = country_panel[year]
        except KeyError as exc:
            raise GlobalDataCoverageError(f"missing prediction row for {iso3} {year}") from exc
        memory, exposure = cumulative_external_memory(
            country_panel,
            year=year,
            start_year=state.train_start,
            memory_window_years=state.memory_window_years,
        )
        transformed = state.feature_transform.transform(row)
        demand = max(self.demand_floor, state.ridge.predict(transformed.values))
        response = pure_external_bio_behavior(memory)
        return HierarchicalPrediction(
            country_iso3=iso3,
            year=year,
            predicted_tfr=max(self.demand_floor, response * demand),
            biological_response=response,
            covariate_component=demand,
            imputed_features=transformed.imputed_features,
            conditional_hindcast=True,
            future_inputs_used={
                "exposure": {
                    "mobile_status": exposure.mobile_status,
                    "urban_status": exposure.urban_status,
                    "pretelecom_layers": exposure.pretelecom_layers,
                    "formula": "ambient + chi(ambient) * personal",
                },
                "covariates": {
                    "imputed_with_train_median": list(transformed.imputed_features),
                    "scaling_fit_through": state.train_end,
                },
            },
        )

    def predict(
        self,
        country: str,
        year: int,
        data: GlobalPanels | Mapping[str, Any],
    ) -> HierarchicalPrediction:
        """Resolve ``country`` from a panel mapping and make one prediction."""
        panels = _normalize_panels(data)
        iso3 = _iso3(country)
        try:
            panel = panels[iso3]
        except KeyError as exc:
            raise GlobalDataCoverageError(f"country {iso3} is absent from the global panel") from exc
        return self.predict_from_panel(iso3, panel, year)

    def _require_state(self) -> FittedHierarchicalState:
        if self.state is None:
            raise RuntimeError("fit the hierarchical model before prediction")
        return self.state


class HierarchicalM0:
    """Matched pooled covariate ridge with no EMF/exposure response at prediction."""

    def __init__(
        self,
        *,
        alpha: float = DEFAULT_RIDGE_ALPHA,
        demand_floor: float = DEFAULT_DEMAND_FLOOR,
    ) -> None:
        _validate_ridge_alpha(alpha)
        _validate_demand_floor(demand_floor)
        self.alpha = float(alpha)
        self.demand_floor = float(demand_floor)
        self.state: FittedHierarchicalState | None = None

    def fit(
        self,
        panels: GlobalPanels | Mapping[str, Any],
        *,
        train_start: int,
        train_end: int,
        memory_window_years: int | None = None,
    ) -> "HierarchicalM0":
        """Fit M0 on BERM-eligible training rows for a matched comparison."""
        normalized = _normalize_panels(panels)
        observations, eligibility = build_training_observations(
            normalized,
            train_start=train_start,
            train_end=train_end,
            memory_window_years=memory_window_years,
        )
        transform = fit_train_only_feature_transform(observations)
        self._fit_from_observations(
            observations,
            eligibility=eligibility,
            transform=transform,
            train_start=train_start,
            train_end=train_end,
            memory_window_years=memory_window_years,
        )
        return self

    def _fit_from_observations(
        self,
        observations: Sequence[TrainingObservation],
        *,
        eligibility: TrainingEligibility,
        transform: TrainOnlyFeatureTransform,
        train_start: int,
        train_end: int,
        memory_window_years: int | None,
    ) -> None:
        ridge = _fit_ridge(
            [transform.transform(item.row).values for item in observations],
            [item.tfr for item in observations],
            alpha=self.alpha,
            feature_names=transform.feature_names,
            target_definition="observed_tfr (same BERM-eligible rows and covariates; no EMF)",
        )
        self.state = FittedHierarchicalState(
            model_kind="m0",
            train_start=train_start,
            train_end=train_end,
            memory_window_years=memory_window_years,
            response_definition="none; matched covariate-only M0",
            feature_transform=transform,
            ridge=ridge,
            training_eligibility=eligibility,
        )

    def predict_from_panel(
        self,
        country_iso3: str,
        country_panel: Mapping[int, GlobalPanelRow],
        year: int,
    ) -> HierarchicalPrediction:
        """Predict M0 from future covariates only; no exposure value is read."""
        state = self._require_state()
        if year <= state.train_end:
            raise ValueError("hierarchical predictions are restricted to years strictly after train_end")
        iso3 = _iso3(country_iso3)
        try:
            row = country_panel[year]
        except KeyError as exc:
            raise GlobalDataCoverageError(f"missing prediction row for {iso3} {year}") from exc
        transformed = state.feature_transform.transform(row)
        prediction = max(self.demand_floor, state.ridge.predict(transformed.values))
        return HierarchicalPrediction(
            country_iso3=iso3,
            year=year,
            predicted_tfr=prediction,
            biological_response=None,
            covariate_component=prediction,
            imputed_features=transformed.imputed_features,
            conditional_hindcast=True,
            future_inputs_used={
                "exposure": "not read by M0",
                "covariates": {
                    "imputed_with_train_median": list(transformed.imputed_features),
                    "scaling_fit_through": state.train_end,
                },
            },
        )

    def predict(
        self,
        country: str,
        year: int,
        data: GlobalPanels | Mapping[str, Any],
    ) -> HierarchicalPrediction:
        panels = _normalize_panels(data)
        iso3 = _iso3(country)
        try:
            panel = panels[iso3]
        except KeyError as exc:
            raise GlobalDataCoverageError(f"country {iso3} is absent from the global panel") from exc
        return self.predict_from_panel(iso3, panel, year)

    def _require_state(self) -> FittedHierarchicalState:
        if self.state is None:
            raise RuntimeError("fit the hierarchical M0 before prediction")
        return self.state


def fit_paired_global_models(
    panels: GlobalPanels | Mapping[str, Any],
    *,
    train_start: int,
    train_end: int,
    alpha: float = DEFAULT_RIDGE_ALPHA,
    memory_window_years: int | None = None,
) -> FittedGlobalModels:
    """Fit BERM and M0 with one shared train-only row/transform contract."""
    _validate_ridge_alpha(alpha)
    normalized = _normalize_panels(panels)
    observations, eligibility = build_training_observations(
        normalized,
        train_start=train_start,
        train_end=train_end,
        memory_window_years=memory_window_years,
    )
    transform = fit_train_only_feature_transform(observations)

    berm = HierarchicalBERM(alpha=alpha, memory_window_years=memory_window_years)
    berm_ridge = _fit_ridge(
        [transform.transform(item.row).values for item in observations],
        [item.tfr / item.bio_behavior for item in observations],
        alpha=alpha,
        feature_names=transform.feature_names,
        target_definition="observed_tfr / pure_external_bioCap_x_behav",
    )
    berm.state = FittedHierarchicalState(
        model_kind="berm",
        train_start=train_start,
        train_end=train_end,
        memory_window_years=memory_window_years,
        response_definition=(
            "pure external v11-like bioCap(memory) * endocrine behav(memory); "
            "fixed neutral nutrition multiplier, no country lookup"
        ),
        feature_transform=transform,
        ridge=berm_ridge,
        training_eligibility=eligibility,
    )

    m0 = HierarchicalM0(alpha=alpha)
    m0._fit_from_observations(
        observations,
        eligibility=eligibility,
        transform=transform,
        train_start=train_start,
        train_end=train_end,
        memory_window_years=memory_window_years,
    )
    return FittedGlobalModels(berm=berm, m0=m0, training_eligibility=eligibility)


def build_training_observations(
    panels: GlobalPanels | Mapping[str, Any],
    *,
    train_start: int,
    train_end: int,
    memory_window_years: int | None = None,
) -> tuple[list[TrainingObservation], TrainingEligibility]:
    """Build rows eligible under the exact train-only BERM/M0 contract."""
    if train_end < train_start:
        raise ValueError("train_end must be at or after train_start")
    normalized = _normalize_panels(panels)
    candidates = 0
    rejected: Counter[str] = Counter()
    outcome_sources: Counter[str] = Counter()
    exposure_statuses: Counter[str] = Counter()
    observations: list[TrainingObservation] = []

    for iso3 in sorted(normalized):
        country_panel = normalized[iso3]
        for year in range(train_start, train_end + 1):
            candidates += 1
            row = country_panel.get(year)
            if row is None:
                rejected["missing_country_year_row"] += 1
                continue
            if not observed_outcome_eligible(row):
                rejected[_outcome_rejection_reason(row)] += 1
                continue
            try:
                memory, exposure = cumulative_external_memory(
                    country_panel,
                    year=year,
                    start_year=train_start,
                    memory_window_years=memory_window_years,
                )
            except GlobalDataCoverageError as exc:
                rejected[_coverage_reason(exc)] += 1
                continue
            response = pure_external_bio_behavior(memory)
            if response <= 0.0 or not math.isfinite(response):
                rejected["invalid_biological_response"] += 1
                continue
            assert row.tfr is not None
            observations.append(
                TrainingObservation(
                    country_iso3=iso3,
                    year=year,
                    tfr=row.tfr,
                    bio_behavior=response,
                    row=row,
                    exposure=exposure,
                )
            )
            outcome_sources[_source_label(row.tfr_source)] += 1
            exposure_statuses[f"mobile:{exposure.mobile_status}"] += 1
            exposure_statuses[f"urban:{exposure.urban_status}"] += 1

    if not observations:
        raise GlobalDataCoverageError("no train rows satisfy outcome and external-exposure coverage")
    return observations, TrainingEligibility(
        train_start=train_start,
        train_end=train_end,
        candidate_rows=candidates,
        eligible_rows=len(observations),
        rejected_by_reason=dict(sorted(rejected.items())),
        outcome_source_counts=dict(sorted(outcome_sources.items())),
        exposure_status_counts=dict(sorted(exposure_statuses.items())),
    )


def fit_train_only_feature_transform(
    observations: Sequence[TrainingObservation],
) -> TrainOnlyFeatureTransform:
    """Fit median imputation and feature scaling from training observations only."""
    if not observations:
        raise GlobalDataCoverageError("at least one training observation is required")
    raw_rows = [_raw_feature_values(item.row) for item in observations]
    active = tuple(
        feature
        for feature in FEATURE_NAMES
        if any(row[feature] is not None for row in raw_rows)
    )
    dropped = tuple(feature for feature in FEATURE_NAMES if feature not in active)
    if not active:
        raise GlobalDataCoverageError("all declared demand covariates are missing in training rows")

    medians: dict[str, float] = {}
    imputed_counts: dict[str, int] = {}
    for feature in active:
        available = [row[feature] for row in raw_rows if row[feature] is not None]
        assert available
        medians[feature] = float(median(available))
        imputed_counts[feature] = sum(row[feature] is None for row in raw_rows)

    means: dict[str, float] = {}
    scales: dict[str, float] = {}
    for feature in active:
        filled = [
            value if value is not None else medians[feature]
            for value in (row[feature] for row in raw_rows)
        ]
        average = sum(filled) / len(filled)
        variance = sum((value - average) ** 2 for value in filled) / len(filled)
        means[feature] = average
        # A constant covariate receives scale 1.0.  Its coefficient is then
        # driven to zero by the positive ridge penalty, without a division by
        # zero or a country-specific workaround.
        scales[feature] = math.sqrt(variance) if variance > 0.0 else 1.0

    return TrainOnlyFeatureTransform(
        feature_names=active,
        medians=medians,
        means=means,
        scales=scales,
        n_train_rows=len(observations),
        imputed_train_counts=imputed_counts,
        dropped_all_missing_features=dropped,
    )


def observed_outcome_eligible(row: GlobalPanelRow) -> bool:
    """Return whether a row is eligible as a scored historical outcome.

    WPP 2024+ is explicitly treated as projection/derived output even when a
    source file did not annotate the measurement type.  A World Bank fallback
    with an explicit non-projection type remains distinguishable and may be
    scored if present.
    """
    if row.tfr is None or not math.isfinite(row.tfr) or row.tfr <= 0.0:
        return False
    measurement = (row.tfr_measurement_type or "").casefold()
    source = (row.tfr_source or "").casefold()
    if any(token in measurement for token in ("projection", "derived", "forecast", "extrapolat")):
        return False
    if "wpp" in source and row.year >= 2024:
        return False
    return True


def _read_panel_payload(source: str | Path | Mapping[str, Any]) -> Any:
    if isinstance(source, (str, Path)):
        path = Path(source)
        try:
            with path.open(encoding="utf-8") as handle:
                return json.load(handle)
        except OSError as exc:
            raise GlobalPanelSchemaError(f"cannot read global panel {path}") from exc
        except json.JSONDecodeError as exc:
            raise GlobalPanelSchemaError(f"global panel {path} is not valid JSON") from exc
    if isinstance(source, Mapping):
        return source
    raise GlobalPanelSchemaError("source must be a JSON path or mapping")


def _load_record_list(records: Sequence[Any]) -> dict[str, dict[int, GlobalPanelRow]]:
    result: dict[str, dict[int, GlobalPanelRow]] = {}
    for raw in records:
        if not isinstance(raw, Mapping):
            raise GlobalPanelSchemaError("each global records item must be a mapping")
        iso3 = raw.get("country_iso3", raw.get("iso3"))
        year = raw.get("year")
        if iso3 is None or year is None:
            raise GlobalPanelSchemaError("flat global records require country_iso3 and year")
        parsed = _row_from_mapping(str(iso3).upper(), year, raw)
        if parsed.year in result.setdefault(parsed.country_iso3, {}):
            raise GlobalPanelSchemaError(
                f"duplicate country/year row: {parsed.country_iso3} {parsed.year}"
            )
        result[parsed.country_iso3][parsed.year] = parsed
    if not result:
        raise GlobalPanelSchemaError("global records list is empty")
    return result


def _country_year_container(country_data: Any) -> Mapping[Any, Any] | Sequence[Any] | None:
    if isinstance(country_data, Mapping):
        for key in ("years", "data", "observations"):
            candidate = country_data.get(key)
            if isinstance(candidate, (Mapping, list, tuple)):
                return candidate
        # A direct mapping of years to rows.
        return country_data
    if isinstance(country_data, (list, tuple)):
        return country_data
    return None


def _parse_country_years(
    iso3: str,
    years_data: Mapping[Any, Any] | Sequence[Any],
) -> dict[int, GlobalPanelRow]:
    parsed: dict[int, GlobalPanelRow] = {}
    if isinstance(years_data, Mapping):
        iterator = years_data.items()
    else:
        iterator = ((row.get("year") if isinstance(row, Mapping) else None, row) for row in years_data)
    for raw_year, raw_row in iterator:
        if not isinstance(raw_row, Mapping):
            continue
        year = raw_row.get("year", raw_year)
        if year is None:
            raise GlobalPanelSchemaError(f"{iso3} has a row without a year")
        row = _row_from_mapping(iso3, year, raw_row)
        if row.year in parsed:
            raise GlobalPanelSchemaError(f"duplicate country/year row: {iso3} {row.year}")
        parsed[row.year] = row
    return parsed


def _row_from_mapping(iso3: str, raw_year: Any, raw_row: Mapping[str, Any]) -> GlobalPanelRow:
    try:
        year = int(raw_year)
    except (TypeError, ValueError) as exc:
        raise GlobalPanelSchemaError(f"{iso3} row has invalid year {raw_year!r}") from exc
    fields = dict(raw_row)
    nested_indicators = fields.get("indicators")
    if isinstance(nested_indicators, Mapping):
        fields = {**nested_indicators, **fields}
    provenance = fields.get("field_provenance", fields.get("provenance", {}))
    missingness = fields.get("missingness", fields.get("missing", {}))
    if not isinstance(provenance, Mapping):
        provenance = {}
    if not isinstance(missingness, Mapping):
        missingness = {}

    values: dict[str, Any] = {}
    embedded_metadata: dict[str, Mapping[str, Any]] = {}
    enriched_provenance = dict(provenance)
    for canonical, aliases in _ROW_FIELD_ALIASES.items():
        value, embedded_meta = _first_present_value(fields, aliases)
        values[canonical] = value
        if embedded_meta:
            embedded_metadata[canonical] = embedded_meta
            if canonical not in enriched_provenance:
                enriched_provenance[canonical] = embedded_meta
    # A compact field object such as ``{"tfr": {"value": 1.7,
    # "source": "WPP", "measurement_type": "observed"}}`` is accepted as
    # a lossless alternate spelling of the canonical top-level fields.
    tfr_meta = embedded_metadata.get("tfr", {})
    if values["tfr_source"] is None:
        values["tfr_source"] = tfr_meta.get("source", tfr_meta.get("source_id"))
    if values["tfr_measurement_type"] is None:
        values["tfr_measurement_type"] = tfr_meta.get("measurement_type")
    return GlobalPanelRow(
        country_iso3=iso3,
        year=year,
        tfr=_finite_or_none(values["tfr"]),
        tfr_source=_text_or_none(values["tfr_source"]),
        tfr_measurement_type=_text_or_none(values["tfr_measurement_type"]),
        mobile_per_100=_finite_or_none(values["mobile_per_100"]),
        urban_pct=_finite_or_none(values["urban_pct"]),
        gdp_ppp_per_capita=_finite_or_none(values["gdp_ppp_per_capita"]),
        contraception_pct=_finite_or_none(values["contraception_pct"]),
        education_years_female=_finite_or_none(values["education_years_female"]),
        religiosity_pct=_finite_or_none(values["religiosity_pct"]),
        immigrant_share=_finite_or_none(values["immigrant_share"]),
        ivf_share=_finite_or_none(values["ivf_share"]),
        field_provenance=enriched_provenance,
        missingness=dict(missingness),
    )


def _first_present_value(
    fields: Mapping[str, Any], aliases: Sequence[str]
) -> tuple[Any, Mapping[str, Any] | None]:
    for name in aliases:
        if name not in fields:
            continue
        value = fields[name]
        if isinstance(value, Mapping):
            metadata = {
                key: item
                for key, item in value.items()
                if key not in {"value", "data", "amount"}
            }
            return value.get("value", value.get("data", value.get("amount"))), metadata
        return value, None
    return None, None


def _finite_or_none(value: Any) -> float | None:
    if value is None or isinstance(value, bool):
        return None
    try:
        numeric = float(value)
    except (TypeError, ValueError):
        return None
    return numeric if math.isfinite(numeric) else None


def _text_or_none(value: Any) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def _normalize_panels(panels: GlobalPanels | Mapping[str, Any]) -> dict[str, dict[int, GlobalPanelRow]]:
    if not isinstance(panels, Mapping):
        raise GlobalPanelSchemaError("panels must be a mapping")
    if _is_normalized_panels(panels):
        return {
            _iso3(iso3): {int(year): row for year, row in country.items()}
            for iso3, country in panels.items()
        }
    return load_global_panel(panels)


def _is_normalized_panels(panels: Mapping[str, Any]) -> bool:
    for country in panels.values():
        if not isinstance(country, Mapping):
            return False
        for row in country.values():
            return isinstance(row, GlobalPanelRow)
    return False


def _iso3(value: str) -> str:
    result = str(value).upper()
    if len(result) != 3 or not result.isalpha():
        raise GlobalPanelSchemaError("country must be a three-letter ISO3 code in the global tier")
    return result


def _select_countries(
    panels: Mapping[str, Mapping[int, GlobalPanelRow]],
    countries: Iterable[str] | None,
) -> dict[str, dict[int, GlobalPanelRow]]:
    if countries is None:
        return {iso3: dict(rows) for iso3, rows in panels.items()}
    selected = {_iso3(value) for value in countries}
    result = {iso3: dict(rows) for iso3, rows in panels.items() if iso3 in selected}
    if not result:
        raise GlobalDataCoverageError("none of the requested train countries are present")
    return result


def _infer_train_start(panels: Mapping[str, Mapping[int, GlobalPanelRow]]) -> int:
    starts = [min(rows) for rows in panels.values() if rows]
    if not starts:
        raise GlobalDataCoverageError("cannot infer a train start from an empty panel")
    return min(starts)


def _field_value(row: GlobalPanelRow, field: str) -> float | None:
    for candidate in _FEATURE_SOURCE_FIELDS.get(field, (field,)):
        if hasattr(row, candidate):
            value = getattr(row, candidate)
            numeric = _finite_or_none(value)
            if numeric is not None:
                return numeric
    if hasattr(row, field):
        return _finite_or_none(getattr(row, field))
    return None


def _row_field_status(row: GlobalPanelRow, field: str) -> str:
    aliases = (field,) + _ROW_FIELD_ALIASES.get(field, ()) + _FEATURE_SOURCE_FIELDS.get(field, ())
    for alias in aliases:
        if alias in row.missingness:
            missing = row.missingness[alias]
            if _is_explicit_missing(missing):
                return "missing_source"
    for alias in aliases:
        metadata = row.field_provenance.get(alias)
        if isinstance(metadata, Mapping):
            for key in ("status", "availability", "missingness", "measurement_type"):
                value = metadata.get(key)
                if value is not None:
                    return str(value).casefold()
        elif isinstance(metadata, str):
            return metadata.casefold()
    return "provided_without_status"


def _is_explicit_missing(value: Any) -> bool:
    if value is True:
        return True
    if isinstance(value, str):
        normalized = value.casefold()
        return any(token in normalized for token in ("missing", "unavailable", "outside", "extrapolat"))
    if isinstance(value, Mapping):
        return bool(value.get("missing", False))
    return False


def _exposure_numeric(row: GlobalPanelRow, field: str) -> tuple[float | None, str]:
    value = _field_value(row, field)
    status = _row_field_status(row, field)
    if value is None or value < 0.0:
        return None, status
    if any(token in status for token in _EXPOSURE_REJECTED_STATUS_TOKENS):
        return None, status
    if "interpolated" in status:
        metadata = row.field_provenance.get(field)
        if isinstance(metadata, Mapping):
            lower = _finite_or_none(metadata.get("lower_year"))
            upper = _finite_or_none(metadata.get("upper_year"))
            if lower is not None and upper is not None and not (lower <= row.year <= upper):
                return None, "interpolated_outside_declared_bounds"
    return value, status


def _optional_numeric(row: GlobalPanelRow, field: str) -> float | None:
    value = _field_value(row, field)
    status = _row_field_status(row, field)
    if value is None or any(token in status for token in _OPTIONAL_REJECTED_STATUS_TOKENS):
        return None
    return value


def _raw_feature_values(row: GlobalPanelRow) -> dict[str, float | None]:
    gdp = _optional_numeric(row, "log_gdp_ppp_per_capita")
    education = _optional_numeric(row, "education_years_female")
    urban = _optional_numeric(row, "urban_fraction")
    contraception = _optional_numeric(row, "contraception_fraction")
    religiosity = _optional_numeric(row, "religiosity_fraction")
    immigration = _optional_numeric(row, "immigrant_share")
    ivf = _optional_numeric(row, "ivf_share")
    return {
        "log_gdp_ppp_per_capita": None if gdp is None or gdp <= 0.0 else math.log(max(1.0, gdp)),
        "education_years_female": None if education is None or education < 0.0 else education,
        "urban_fraction": _share_or_none(urban),
        "contraception_fraction": _share_or_none(contraception),
        "religiosity_fraction": _share_or_none(religiosity),
        "immigrant_share": _share_or_none(immigration),
        "ivf_share": _share_or_none(ivf),
    }


def _share_or_none(value: float | None) -> float | None:
    if value is None or not math.isfinite(value) or value < 0.0:
        return None
    # The source schema permits either 0--1 shares or 0--100 percentages.
    # This is a deterministic unit conversion, not statistical imputation.
    return value / 100.0 if value > 1.0 else value


def _source_label(value: str | None) -> str:
    return value if value else "unspecified_source"


def _outcome_rejection_reason(row: GlobalPanelRow) -> str:
    if row.tfr is None or not math.isfinite(row.tfr) or row.tfr <= 0.0:
        return "missing_or_invalid_tfr"
    measurement = (row.tfr_measurement_type or "").casefold()
    source = (row.tfr_source or "").casefold()
    if any(token in measurement for token in ("projection", "derived", "forecast", "extrapolat")):
        return "non_observed_tfr_measurement_type"
    if "wpp" in source and row.year >= 2024:
        return "wpp_2024_plus_projection"
    return "ineligible_tfr"


def _coverage_reason(error: GlobalDataCoverageError) -> str:
    message = str(error).casefold()
    if "mobile" in message or "urban" in message:
        return "missing_or_unavailable_external_exposure"
    if "source row" in message:
        return "missing_exposure_history_row"
    return "insufficient_external_exposure_history"


def _fit_ridge(
    features: Sequence[Sequence[float]],
    target: Sequence[float],
    *,
    alpha: float,
    feature_names: tuple[str, ...],
    target_definition: str,
) -> RidgeFit:
    """Fit a standardized-feature ridge with a non-penalized global intercept."""
    _validate_ridge_alpha(alpha)
    if not features or len(features) != len(target):
        raise GlobalDataCoverageError("ridge requires equally sized non-empty feature and target rows")
    width = len(feature_names)
    if width == 0 or any(len(row) != width for row in features):
        raise GlobalDataCoverageError("ridge feature rows do not match the declared feature set")
    if any(not math.isfinite(value) for row in features for value in row):
        raise GlobalDataCoverageError("ridge features must be finite")
    if any(not math.isfinite(value) for value in target):
        raise GlobalDataCoverageError("ridge targets must be finite")

    target_mean = sum(target) / len(target)
    centered = [value - target_mean for value in target]
    normal = [[0.0 for _ in range(width)] for _ in range(width)]
    rhs = [0.0 for _ in range(width)]
    for row, value in zip(features, centered):
        for i in range(width):
            rhs[i] += row[i] * value
            for j in range(width):
                normal[i][j] += row[i] * row[j]
    for index in range(width):
        normal[index][index] += alpha
    coefficients = _solve_linear_system(normal, rhs)
    return RidgeFit(
        alpha=alpha,
        intercept=target_mean,
        coefficients=tuple(coefficients),
        feature_names=feature_names,
        target_definition=target_definition,
    )


def _solve_linear_system(matrix: Sequence[Sequence[float]], rhs: Sequence[float]) -> list[float]:
    """Solve a small positive-definite normal system by pivoted elimination."""
    size = len(rhs)
    augmented = [list(matrix[row]) + [float(rhs[row])] for row in range(size)]
    for column in range(size):
        pivot = max(range(column, size), key=lambda row: abs(augmented[row][column]))
        if abs(augmented[pivot][column]) < 1e-14:
            raise GlobalDataCoverageError("ridge normal matrix is singular")
        augmented[column], augmented[pivot] = augmented[pivot], augmented[column]
        divisor = augmented[column][column]
        augmented[column] = [value / divisor for value in augmented[column]]
        for row in range(size):
            if row == column:
                continue
            factor = augmented[row][column]
            if factor == 0.0:
                continue
            augmented[row] = [
                value - factor * pivot_value
                for value, pivot_value in zip(augmented[row], augmented[column])
            ]
    return [augmented[row][-1] for row in range(size)]


def _validate_ridge_alpha(alpha: float) -> None:
    if not math.isfinite(alpha) or alpha <= 0.0:
        raise ValueError("ridge alpha must be finite and greater than zero")


def _validate_demand_floor(value: float) -> None:
    if not math.isfinite(value) or value <= 0.0:
        raise ValueError("demand_floor must be finite and greater than zero")


__all__ = [
    "DEFAULT_DEMAND_FLOOR",
    "DEFAULT_RIDGE_ALPHA",
    "FEATURE_NAMES",
    "FittedGlobalModels",
    "FittedHierarchicalState",
    "GlobalDataCoverageError",
    "GlobalExternalExposure",
    "GlobalPanelRow",
    "GlobalPanelSchemaError",
    "GlobalPanels",
    "GLOBAL_HIERARCHICAL_VERSION",
    "HierarchicalBERM",
    "HierarchicalM0",
    "HierarchicalPrediction",
    "RidgeFit",
    "TrainOnlyFeatureTransform",
    "TrainingEligibility",
    "TrainingObservation",
    "annual_external_exposure",
    "build_training_observations",
    "cumulative_external_memory",
    "fit_paired_global_models",
    "fit_train_only_feature_transform",
    "load_global_panel",
    "observed_outcome_eligible",
    "pure_external_bio_behavior",
]
