"""Pure Lindgren-DKC candidate mathematics.

This module contains no country lookup, TFR data access, calibration, or annual
exposure generator.  Every exposure series and its provenance belong to the
caller.  That boundary lets a later validation layer compare measured inputs
and national technology proxies without silently treating one as the other.

Epistemic boundary
------------------
The 2025 Lindgren premise used here is ``g = eta + kappa A tensor A``.  Expanding
``A = A_bio + a_ext`` gives the tensor-valued metric perturbation implemented
by :func:`metric_perturbation`.  The unreduced Lorentzian volume response is
the directed L1 derivative ``kappa(A dot u)/sqrt(1+kappa A^2)``.  The explicit
Lorentz-to-spatial, dimensionless, collinear scalar reduction is the L2 bridge:
the directed derivative becomes a function of ``|A_bar|`` and yields the
``chi(|A_bar|)`` form. :func:`lindgren_geodesic_selection` exposes the resulting
parameter-free coefficient, whose formula always retains L1 status. Applying
it to a particular measured or biological coordinate remains an open L2
identification whose units and response operator must be supplied.

Frequency, kernel, vulnerability and endpoint inputs below may be empirical
L3 components.  Their presence does not turn the L1-derived parts of a
composite into L3: provenance is retained component by component.

The calculation remains a candidate route.  Its registered DKC route carries
the required ``fieldStateCalibrated=true`` flag and its F1--F9 forecast register
is version-locked for falsification.  That route-level flag neither converts a
national technology-timing proxy into measured FieldState nor makes the M4
parameter family identifiable with current data.  These statuses also do not
prevent this pure evaluator from running caller-supplied uncalibrated inputs
for sensitivity analysis.
"""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from dataclasses import dataclass
import math
from numbers import Real
from typing import Literal, TypeAlias

from berm.physics import lindgren_tensor as _lindgren_tensor


DKC_ROUTE_ID = "berm-lindgren-dkc-candidate-v1"
MODEL_STATUS = "candidate"
LINDGREN_FORMULATION = "2025-weyl-gme"
L2_BRIDGE_STATUS = "open"
FIELD_STATE_CALIBRATED = True
PUBLISHES_LOCKED_FORECASTS = True
CAN_RUN_UNCALIBRATED = True
CALCULATION_ENABLED = True
CANDIDATE_OUTPUTS_ENABLED = True

DUTY_CYCLE_MIN = 0.33
DUTY_CYCLE_MAX = 1.0
DEFAULT_SMARTPHONE_STEEPNESS = 0.5
SPEED_OF_LIGHT_M_S = 299_792_458.0
EPSILON_SYNERGY_MIN = 0.10
EPSILON_SYNERGY_MAX = 0.30
EPSILON_EPI_MIN = 0.05
EPSILON_EPI_MAX = 0.20

FERTILITY_SAR_MULTIPLIERS: Mapping[float, float] = {
    900.0: 3.5,
    1800.0: 2.5,
    2400.0: 2.0,
    3500.0: 1.5,
}

Vector4: TypeAlias = tuple[float, float, float, float]
Tensor4: TypeAlias = tuple[Vector4, Vector4, Vector4, Vector4]


def _finite(name: str, value: Real) -> float:
    if isinstance(value, bool) or not isinstance(value, Real):
        raise ValueError(f"{name} must be a real number")
    resolved = float(value)
    if not math.isfinite(resolved):
        raise ValueError(f"{name} must be finite")
    return resolved


def _nonnegative(name: str, value: Real) -> float:
    resolved = _finite(name, value)
    if resolved < 0.0:
        raise ValueError(f"{name} must be non-negative")
    return resolved


def _positive(name: str, value: Real) -> float:
    resolved = _finite(name, value)
    if resolved <= 0.0:
        raise ValueError(f"{name} must be positive")
    return resolved


def _unit_interval(name: str, value: Real) -> float:
    resolved = _finite(name, value)
    if not 0.0 <= resolved <= 1.0:
        raise ValueError(f"{name} must be between 0 and 1")
    return resolved


def _bounded(name: str, value: Real, lower: float, upper: float) -> float:
    resolved = _finite(name, value)
    if not lower <= resolved <= upper:
        raise ValueError(f"{name} must be between {lower} and {upper}")
    return resolved


def _integer(name: str, value: int, *, minimum: int | None = None) -> int:
    if isinstance(value, bool) or not isinstance(value, int):
        raise ValueError(f"{name} must be an integer")
    if minimum is not None and value < minimum:
        raise ValueError(f"{name} must be at least {minimum}")
    return value


def _nonempty_text(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be non-empty text")
    return value.strip()


def _four_vector(name: str, vector: Sequence[Real]) -> Vector4:
    if isinstance(vector, (str, bytes)) or len(vector) != 4:
        raise ValueError(f"{name} must contain exactly four components")
    values = tuple(
        _finite(f"{name}[{index}]", value) for index, value in enumerate(vector)
    )
    return values  # type: ignore[return-value]


def _tensor4(name: str, tensor: Sequence[Sequence[Real]]) -> Tensor4:
    if isinstance(tensor, (str, bytes)) or len(tensor) != 4:
        raise ValueError(f"{name} must contain exactly four rows")
    rows = tuple(
        _four_vector(f"{name}[{index}]", row) for index, row in enumerate(tensor)
    )
    return rows  # type: ignore[return-value]


def metric_perturbation(
    biological_potential: Sequence[Real],
    external_potential: Sequence[Real],
    *,
    kappa: Real = 1.0,
) -> Tensor4:
    """Expand the 2025 metric premise without scalarising its cross terms.

    If ``g(A) = eta + kappa A tensor A`` and ``A = A_bio + a_ext``, subtraction of
    the biological background metric gives, component by component,

    ``delta_g[mu,nu] = kappa(A[mu] a[nu] + a[mu] A[nu] + a[mu] a[nu])``.

    The returned covariant tensor is not an observable until a caller supplies
    an explicit contravariant response/measurement tensor for contraction.
    """

    return _lindgren_tensor.metric_perturbation(
        biological_potential,
        external_potential,
        kappa=kappa,
    )


def contract_tensor(
    response_tensor: Sequence[Sequence[Real]],
    perturbation: Sequence[Sequence[Real]],
) -> float:
    """Explicitly evaluate ``R^(mu,nu) delta_g_(mu,nu)``.

    Index raising, units, and the physical meaning of ``response_tensor`` are
    caller responsibilities.  Requiring the tensor explicitly prevents the
    cross term from being silently replaced by a Euclidean scalar shorthand.
    """

    return _lindgren_tensor.contract_tensor(response_tensor, perturbation)


def contract_metric_perturbation(
    response_tensor: Sequence[Sequence[Real]],
    biological_potential: Sequence[Real],
    external_potential: Sequence[Real],
    *,
    kappa: Real = 1.0,
) -> float:
    """Expand and contract the perturbation while keeping both steps explicit."""

    return contract_tensor(
        response_tensor,
        metric_perturbation(
            biological_potential,
            external_potential,
            kappa=kappa,
        ),
    )


def lindgren_geodesic_selection(background: Real) -> float:
    """L1: χ(Ā) = Ā/√(1+Ā²). Johdettu tilavuuselementin linearisaatiosta."""

    resolved = _finite("background", background)
    return _lindgren_tensor.geodesic_deviation_selection_rule(resolved)


@dataclass(frozen=True)
class FrequencyWeightInput:
    """Caller-supplied inputs for one mixed-provenance frequency bridge weight.

    ``sar_normalized`` is an evaluation of the L1 Maxwell/SAR structure; its
    tissue dielectric/material values retain L3 provenance.  ``coupling`` and
    ``modulation`` are L3 inputs.  All three dimensionless components are
    required explicitly.  The class stores no fitted outcome and performs no
    data lookup.
    """

    frequency_mhz: float
    sar_normalized: float
    coupling: float
    modulation: float

    def __post_init__(self) -> None:
        object.__setattr__(
            self, "frequency_mhz", _positive("frequency_mhz", self.frequency_mhz)
        )
        object.__setattr__(
            self,
            "sar_normalized",
            _unit_interval("sar_normalized", self.sar_normalized),
        )
        object.__setattr__(self, "coupling", _unit_interval("coupling", self.coupling))
        object.__setattr__(
            self, "modulation", _unit_interval("modulation", self.modulation)
        )

    @property
    def w_l(self) -> float:
        """Mixed L1×L3 weight ``SAR_norm * coupling * modulation``."""

        return self.sar_normalized * self.coupling * self.modulation


def fertility_sar_multiplier(frequency_mhz: Real) -> float:
    """Return the fixed testicular/whole-body SAR multiplier at a supported band."""

    frequency = _positive("frequency_mhz", frequency_mhz)
    try:
        return FERTILITY_SAR_MULTIPLIERS[frequency]
    except KeyError as exc:
        supported = ", ".join(f"{value:g}" for value in FERTILITY_SAR_MULTIPLIERS)
        raise ValueError(
            f"no fertility SAR multiplier for {frequency:g} MHz; supported: {supported}"
        ) from exc


def w_l(
    weight_input: FrequencyWeightInput, *, fertility_endpoint: bool = False
) -> float:
    """Compute ``w_L`` with an optional fixed fertility-endpoint SAR correction."""

    if not isinstance(weight_input, FrequencyWeightInput):
        raise ValueError("weight_input must be a FrequencyWeightInput")
    if not isinstance(fertility_endpoint, bool):
        raise ValueError("fertility_endpoint must be boolean")
    multiplier = (
        fertility_sar_multiplier(weight_input.frequency_mhz)
        if fertility_endpoint
        else 1.0
    )
    return weight_input.w_l * multiplier


def smartphone_sigmoid(
    year: Real,
    midpoint_year: Real,
    steepness: Real = DEFAULT_SMARTPHONE_STEEPNESS,
) -> float:
    """T1 smartphone penetration sigmoid with a stable logistic evaluation."""

    resolved_year = _finite("year", year)
    midpoint = _finite("midpoint_year", midpoint_year)
    slope = _positive("steepness", steepness)
    z = slope * (resolved_year - midpoint)
    if z >= 0.0:
        return 1.0 / (1.0 + math.exp(-z))
    exp_z = math.exp(z)
    return exp_z / (1.0 + exp_z)


def duty_cycle(
    year: Real,
    midpoint_year: Real,
    steepness: Real = DEFAULT_SMARTPHONE_STEEPNESS,
) -> float:
    """T1 duty cycle ``0.33 + 0.67 * smartphone_sigmoid``."""

    penetration = smartphone_sigmoid(year, midpoint_year, steepness)
    value = DUTY_CYCLE_MIN + (DUTY_CYCLE_MAX - DUTY_CYCLE_MIN) * penetration
    return min(DUTY_CYCLE_MAX, max(DUTY_CYCLE_MIN, value))


def age_vulnerability(age_years: Real) -> float:
    """T3 developmental vulnerability with the exact protected boundaries."""

    age = _finite("age_years", age_years)
    if age < 0.0:
        return 5.0
    if age < 1.0:
        return 4.0
    if age < 6.0:
        return 3.0
    if age < 18.0:
        return 2.0
    return 1.0


def _history_length(available_lags: int) -> int:
    return _integer("available_lags", available_lags, minimum=1)


def _normalize_weights(raw_weights: Sequence[float]) -> tuple[float, ...]:
    if not raw_weights:
        raise ValueError("at least one kernel weight is required")
    if any(not math.isfinite(value) or value < 0.0 for value in raw_weights):
        raise ValueError("kernel weights must be finite and non-negative")
    total = math.fsum(raw_weights)
    if total <= 0.0:
        raise ValueError("kernel has no support in the available history")
    return tuple(value / total for value in raw_weights)


def normalized_exponential_kernel(available_lags: int, tau: Real) -> tuple[float, ...]:
    """Return an L3 phenomenological exponential kernel over annual history.

    Lag zero is the current year.  Annual-bin integration is proportional to
    ``exp(-lag/tau)`` and therefore gives the usual discrete exponential after
    normalization, including for a one-year truncated history.
    """

    length = _history_length(available_lags)
    resolved_tau = _positive("tau", tau)
    return _normalize_weights([math.exp(-lag / resolved_tau) for lag in range(length)])


def _integer_erlang_cdf(time: float, tau: float, shape: int) -> float:
    if time <= 0.0:
        return 0.0
    scaled = time / tau
    survival = math.exp(-scaled) * math.fsum(
        scaled**order / math.factorial(order) for order in range(shape)
    )
    return min(1.0, max(0.0, 1.0 - survival))


def normalized_erlang_kernel(
    available_lags: int,
    tau: Real,
    shape: int,
) -> tuple[float, ...]:
    """Return the L3 phenomenological T4 Erlang kernel over annual bins.

    Each raw discrete weight is the integral of the continuous Erlang density
    ``s^(shape-1) exp(-s/tau) / (tau^shape Gamma(shape))`` over
    ``[lag, lag + 1)``.  Bin integration preserves a positive current-year
    mass and makes even a one-year truncated history well-defined.
    """

    length = _history_length(available_lags)
    resolved_tau = _positive("tau", tau)
    resolved_shape = _integer("shape", shape)
    if not 2 <= resolved_shape <= 6:
        raise ValueError("shape must be an integer between 2 and 6")
    raw = [
        _integer_erlang_cdf(lag + 1.0, resolved_tau, resolved_shape)
        - _integer_erlang_cdf(float(lag), resolved_tau, resolved_shape)
        for lag in range(length)
    ]
    return _normalize_weights(raw)


# Readable aliases for callers that prefer the word "weights".
exponential_kernel_weights = normalized_exponential_kernel
erlang_kernel_weights = normalized_erlang_kernel


def hill_response(load: Real, gamma: Real, x_half: Real, hill_n: Real = 1.0) -> float:
    """L3 T2 Hill response ``-gamma * x^n / (x_half^n + x^n)``."""

    resolved_load = _nonnegative("load", load)
    resolved_gamma = _nonnegative("gamma", gamma)
    half = _positive("x_half", x_half)
    exponent = _bounded("hill_n", hill_n, 1.0, 5.0)
    if resolved_load == 0.0 or resolved_gamma == 0.0:
        return 0.0
    if resolved_load <= half:
        ratio = (resolved_load / half) ** exponent
        saturation = ratio / (1.0 + ratio)
    else:
        inverse_ratio = (half / resolved_load) ** exponent
        saturation = 1.0 / (1.0 + inverse_ratio)
    return -resolved_gamma * saturation


@dataclass(frozen=True)
class DKCParameters:
    """Validated L3 parameters for the pure DKC candidate core.

    ``tau_b``, ``tau_r``, ``alpha``, ``gamma``, ``x_half``, ``hill_n`` and the
    optional Erlang shape all retain L3 phenomenological provenance.
    """

    tau_b: float
    tau_r: float
    alpha: float
    gamma: float
    x_half: float
    hill_n: float = 1.0
    erlang_shape: int | None = None

    def __post_init__(self) -> None:
        object.__setattr__(self, "tau_b", _positive("tau_b", self.tau_b))
        object.__setattr__(self, "tau_r", _positive("tau_r", self.tau_r))
        if self.tau_r <= self.tau_b:
            raise ValueError("tau_r must be greater than tau_b")
        object.__setattr__(self, "alpha", _unit_interval("alpha", self.alpha))
        object.__setattr__(self, "gamma", _nonnegative("gamma", self.gamma))
        object.__setattr__(self, "x_half", _positive("x_half", self.x_half))
        object.__setattr__(self, "hill_n", _bounded("hill_n", self.hill_n, 1.0, 5.0))
        if self.erlang_shape is not None:
            shape = _integer("erlang_shape", self.erlang_shape)
            if not 2 <= shape <= 6:
                raise ValueError(
                    "erlang_shape must be None or an integer between 2 and 6"
                )
            object.__setattr__(self, "erlang_shape", shape)

    @property
    def beta(self) -> float:
        """Protected DKC normalization: beta is always exactly ``1 - alpha``."""

        return 1.0 - self.alpha

    @property
    def fast_kernel(self) -> Literal["exponential", "erlang"]:
        return "erlang" if self.erlang_shape is not None else "exponential"


@dataclass(frozen=True)
class DKCProvenance:
    """Immutable epistemic and input provenance for one DKC evaluation.

    ``field_state_calibrated`` records the registered DKC route status;
    ``can_run_uncalibrated`` separately records the pure evaluator capability.
    """

    input_name: str
    input_provenance: tuple[str, ...]
    route_id: str = DKC_ROUTE_ID
    status: Literal["candidate"] = MODEL_STATUS
    lindgren_formulation: str = LINDGREN_FORMULATION
    l2_bridge_status: Literal["open"] = L2_BRIDGE_STATUS
    chi_role: str = "chi_geo formula is always L1; the explicit Lorentz-to-spatial |A_bar| reduction is L2, this DKC evaluator does not evaluate it, and concrete proxy, field, membrane, and observable identification remains open L2"
    geometric_selection_status: Literal["L1_NOT_EVALUATED"] = "L1_NOT_EVALUATED"
    coordinate_identification_status: Literal[
        "L2_REDUCTION_AND_MAPPING_OPEN_UPSTREAM"
    ] = "L2_REDUCTION_AND_MAPPING_OPEN_UPSTREAM"
    dkc_kernel_status: Literal["L3_PHENOMENOLOGICAL"] = "L3_PHENOMENOLOGICAL"
    endpoint_mapping_status: Literal["L3_PHENOMENOLOGICAL"] = "L3_PHENOMENOLOGICAL"
    status_composition: Literal["componentwise_no_weakest_link_collapse"] = (
        "componentwise_no_weakest_link_collapse"
    )
    field_state_calibrated: bool = FIELD_STATE_CALIBRATED
    field_state_calibration_scope: str = (
        "calibration pipeline implemented and produces values; this does not "
        "reclassify an unmeasured technology-timing proxy or establish M4 "
        "identifiability"
    )
    refined_m4_current_data_status: Literal["NOT_IDENTIFIABLE_WITH_CURRENT_DATA"] = (
        "NOT_IDENTIFIABLE_WITH_CURRENT_DATA"
    )
    publishes_locked_forecasts: bool = PUBLISHES_LOCKED_FORECASTS
    can_run_uncalibrated: bool = CAN_RUN_UNCALIBRATED
    calculation_enabled: bool = CALCULATION_ENABLED
    candidate_outputs_enabled: bool = CANDIDATE_OUTPUTS_ENABLED


@dataclass(frozen=True)
class DKCResult:
    """Pure fast/slow DKC calculation with no country or TFR calibration."""

    year: int
    birth_year: float
    history_start_year: int
    lags: tuple[int, ...]
    fast_weights: tuple[float, ...]
    slow_weights: tuple[float, ...]
    fast_convolution: float
    vulnerability_weighted_slow_convolution: float
    fast_contribution: float
    slow_contribution: float
    biological_load: float
    endpoint_delta: float
    alpha: float
    beta: float
    fast_kernel: Literal["exponential", "erlang"]
    provenance: DKCProvenance
    status: Literal["candidate"] = MODEL_STATUS
    geometric_selection_status: Literal["L1_NOT_EVALUATED"] = "L1_NOT_EVALUATED"
    coordinate_identification_status: Literal[
        "L2_REDUCTION_AND_MAPPING_OPEN_UPSTREAM"
    ] = "L2_REDUCTION_AND_MAPPING_OPEN_UPSTREAM"
    dkc_kernel_status: Literal["L3_PHENOMENOLOGICAL"] = "L3_PHENOMENOLOGICAL"
    endpoint_mapping_status: Literal["L3_PHENOMENOLOGICAL"] = "L3_PHENOMENOLOGICAL"
    status_composition: Literal["componentwise_no_weakest_link_collapse"] = (
        "componentwise_no_weakest_link_collapse"
    )
    field_state_calibrated: bool = FIELD_STATE_CALIBRATED
    publishes_locked_forecasts: bool = PUBLISHES_LOCKED_FORECASTS
    can_run_uncalibrated: bool = CAN_RUN_UNCALIBRATED
    calculation_enabled: bool = CALCULATION_ENABLED
    candidate_outputs_enabled: bool = CANDIDATE_OUTPUTS_ENABLED


def _validated_series(
    exposure_by_year: Mapping[int, Real],
    year: int,
) -> tuple[int, tuple[float, ...]]:
    if not isinstance(exposure_by_year, Mapping) or not exposure_by_year:
        raise ValueError("exposure_by_year must be a non-empty mapping")
    resolved_year = _integer("year", year)
    eligible_years: list[int] = []
    for source_year in exposure_by_year:
        _integer("exposure year", source_year)
        if source_year <= resolved_year:
            eligible_years.append(source_year)
    if not eligible_years or resolved_year not in exposure_by_year:
        raise ValueError("exposure history must contain the evaluation year")
    start_year = min(eligible_years)
    expected_years = tuple(range(start_year, resolved_year + 1))
    missing = [
        source_year
        for source_year in expected_years
        if source_year not in exposure_by_year
    ]
    if missing:
        raise ValueError(f"exposure history is missing year {missing[0]}")
    values = tuple(
        _nonnegative(f"exposure_by_year[{source_year}]", exposure_by_year[source_year])
        for source_year in reversed(expected_years)
    )
    return start_year, values


def _validated_duty_values(
    duty_by_year: Mapping[int, Real] | None,
    *,
    year: int,
    start_year: int,
) -> tuple[float, ...]:
    if duty_by_year is None:
        return (DUTY_CYCLE_MAX,) * (year - start_year + 1)
    if not isinstance(duty_by_year, Mapping):
        raise ValueError("duty_by_year must be a mapping when supplied")
    values: list[float] = []
    for source_year in range(year, start_year - 1, -1):
        if source_year not in duty_by_year:
            raise ValueError(f"duty history is missing year {source_year}")
        values.append(
            _bounded(
                f"duty_by_year[{source_year}]",
                duty_by_year[source_year],
                DUTY_CYCLE_MIN,
                DUTY_CYCLE_MAX,
            )
        )
    return tuple(values)


def _validated_provenance(values: Sequence[str] | None) -> tuple[str, ...]:
    if values is None:
        return ("caller supplied; measurement status not asserted",)
    if isinstance(values, (str, bytes)):
        raise ValueError("input_provenance must be a sequence of text entries")
    resolved = tuple(
        _nonempty_text("input_provenance entry", value) for value in values
    )
    if not resolved:
        raise ValueError("input_provenance must contain at least one entry")
    return resolved


def evaluate_dkc(
    exposure_by_year: Mapping[int, Real],
    year: int,
    birth_year: Real,
    parameters: DKCParameters,
    *,
    duty_by_year: Mapping[int, Real] | None = None,
    input_name: str = "caller_supplied_exposure_series",
    input_provenance: Sequence[str] | None = None,
) -> DKCResult:
    """Evaluate the L3 fast/slow kernels and L3 Hill endpoint mapping.

    The available contiguous history is truncated at ``year`` and each kernel
    is renormalized on exactly that history.  T3 vulnerability multiplies only
    the slow biological arm.  Duty-cycle values, when supplied, multiply both
    arms before convolution.  No ``beta`` argument exists: it is derived from
    :class:`DKCParameters.alpha`.
    """

    if not isinstance(parameters, DKCParameters):
        raise ValueError("parameters must be DKCParameters")
    resolved_year = _integer("year", year)
    cohort_birth_year = _finite("birth_year", birth_year)
    start_year, exposures = _validated_series(exposure_by_year, resolved_year)
    duties = _validated_duty_values(
        duty_by_year,
        year=resolved_year,
        start_year=start_year,
    )
    history_length = len(exposures)
    if parameters.erlang_shape is None:
        fast_weights = normalized_exponential_kernel(history_length, parameters.tau_b)
    else:
        fast_weights = normalized_erlang_kernel(
            history_length,
            parameters.tau_b,
            parameters.erlang_shape,
        )
    slow_weights = normalized_exponential_kernel(history_length, parameters.tau_r)
    lags = tuple(range(history_length))

    adjusted_exposures = tuple(
        exposure * duty for exposure, duty in zip(exposures, duties, strict=True)
    )
    fast = math.fsum(
        weight * exposure
        for weight, exposure in zip(fast_weights, adjusted_exposures, strict=True)
    )
    slow = math.fsum(
        weight * age_vulnerability((resolved_year - lag) - cohort_birth_year) * exposure
        for lag, weight, exposure in zip(
            lags,
            slow_weights,
            adjusted_exposures,
            strict=True,
        )
    )
    fast_contribution = parameters.alpha * fast
    slow_contribution = parameters.beta * slow
    load = fast_contribution + slow_contribution
    endpoint_delta = hill_response(
        load,
        parameters.gamma,
        parameters.x_half,
        parameters.hill_n,
    )
    provenance = DKCProvenance(
        input_name=_nonempty_text("input_name", input_name),
        input_provenance=_validated_provenance(input_provenance),
    )
    return DKCResult(
        year=resolved_year,
        birth_year=cohort_birth_year,
        history_start_year=start_year,
        lags=lags,
        fast_weights=fast_weights,
        slow_weights=slow_weights,
        fast_convolution=fast,
        vulnerability_weighted_slow_convolution=slow,
        fast_contribution=fast_contribution,
        slow_contribution=slow_contribution,
        biological_load=load,
        endpoint_delta=endpoint_delta,
        alpha=parameters.alpha,
        beta=parameters.beta,
        fast_kernel=parameters.fast_kernel,
        provenance=provenance,
    )


def wifi_devices(
    year: Real,
    *,
    base_year: Real = 2010.0,
    base_devices: Real = 3.0,
    annual_growth: Real = 1.5,
    saturation: Real = 20.0,
) -> float:
    """T6 piecewise-linear Wi-Fi/IoT device proxy capped at saturation."""

    resolved_year = _finite("year", year)
    resolved_base_year = _finite("base_year", base_year)
    resolved_base = _nonnegative("base_devices", base_devices)
    growth = _nonnegative("annual_growth", annual_growth)
    cap = _positive("saturation", saturation)
    if resolved_base > cap:
        raise ValueError("base_devices must not exceed saturation")
    estimate = resolved_base + growth * (resolved_year - resolved_base_year)
    return min(cap, max(0.0, estimate))


def power_controlled_personal(
    p_tx_max: Real,
    ambient_normalized: Real,
    eta: Real,
) -> float:
    """T7 adaptive power-control proxy ``P_tx_max * (1 - eta * ambient_norm)``."""

    maximum = _nonnegative("p_tx_max", p_tx_max)
    ambient = _unit_interval("ambient_normalized", ambient_normalized)
    efficiency = _unit_interval("eta", eta)
    return maximum * (1.0 - efficiency * ambient)


def two_channel_power_control_proxy(
    ambient: Real,
    p_tx_max: Real,
    ambient_normalized: Real,
    eta: Real,
    *,
    chi_coordinate: Real,
) -> float:
    """Apply T7 power control with two explicit dimensionless coordinates.

    ``ambient`` remains the additive proxy component.  Only the separately
    supplied dimensionless ``chi_coordinate`` enters the L1-derived scalar
    selection rule. ``ambient_normalized`` is the bounded T7 power-control
    fraction.  This function neither equates the coordinates nor infers their
    open L0→L2 maps.
    """

    resolved_ambient = _nonnegative("ambient", ambient)
    power_control_fraction = _unit_interval(
        "ambient_normalized",
        ambient_normalized,
    )
    selection_coordinate = _finite("chi_coordinate", chi_coordinate)
    personal = power_controlled_personal(p_tx_max, power_control_fraction, eta)
    return (
        resolved_ambient + lindgren_geodesic_selection(selection_coordinate) * personal
    )


def network_saturation(subscriptions: Real, p_max: Real, n_half: Real) -> float:
    """T8 ambient proxy ``P_max * N / (N_half + N)``."""

    count = _nonnegative("subscriptions", subscriptions)
    maximum = _nonnegative("p_max", p_max)
    half = _positive("n_half", n_half)
    return maximum * count / (half + count)


def shannon_entropy(weighted_powers: Sequence[Real]) -> float:
    """T9 base-2 Shannon entropy of normalized non-negative band powers.

    An all-zero spectrum has no active-band complexity and is assigned entropy
    zero.  Zero-power entries otherwise make no contribution to the sum.
    """

    if isinstance(weighted_powers, (str, bytes)) or not weighted_powers:
        raise ValueError("weighted_powers must contain at least one value")
    powers = tuple(
        _nonnegative(f"weighted_powers[{index}]", value)
        for index, value in enumerate(weighted_powers)
    )
    total = math.fsum(powers)
    if total == 0.0:
        return 0.0
    return -math.fsum(
        (power / total) * math.log2(power / total) for power in powers if power > 0.0
    )


@dataclass(frozen=True)
class ProxyBandInput:
    """One technology-band input for the refined national exposure proxy."""

    frequency_weight: FrequencyWeightInput
    subscriptions: float
    p_max: float
    n_half: float
    fertility_endpoint: bool = False

    def __post_init__(self) -> None:
        if not isinstance(self.frequency_weight, FrequencyWeightInput):
            raise ValueError("frequency_weight must be a FrequencyWeightInput")
        object.__setattr__(
            self,
            "subscriptions",
            _nonnegative("subscriptions", self.subscriptions),
        )
        object.__setattr__(self, "p_max", _nonnegative("p_max", self.p_max))
        object.__setattr__(self, "n_half", _positive("n_half", self.n_half))
        if not isinstance(self.fertility_endpoint, bool):
            raise ValueError("fertility_endpoint must be boolean")


@dataclass(frozen=True)
class RefinedExposureProxy:
    """T6/T8/T9 result explicitly classified as an unmeasured proxy."""

    name: Literal["refined_national_exposure_proxy_not_measured_fieldstate"]
    value: float
    complexity_adjusted_mobile: float
    wifi_component: float
    spectral_entropy_bits: float
    complexity_multiplier: float
    band_contributions: tuple[float, ...]
    provenance: tuple[str, ...]
    is_measured_field_state: Literal[False] = False
    field_state_calibrated: Literal[True] = True


@dataclass(frozen=True)
class RefinedAnnualInput:
    """Explicit inputs for one year of the T1--T12 orchestration.

    ``ambient_normalized`` is the bounded T7 power-control fraction.
    ``chi_coordinate`` is the independently declared dimensionless coordinate
    used by the selection adapter.  Neither is inferred from the mobile/Wi-Fi
    proxy or from a raw field measurement, and the class does not equate them.
    """

    year: int
    bands: tuple[ProxyBandInput, ...]
    broadband_penetration: float
    wifi_device_count: float
    personal_tx_max: float
    ambient_normalized: float
    chi_coordinate: float
    source_provenance: tuple[str, ...]

    def __post_init__(self) -> None:
        object.__setattr__(self, "year", _integer("year", self.year))
        if not isinstance(self.bands, tuple) or not self.bands:
            raise ValueError("bands must be a non-empty tuple")
        if any(not isinstance(band, ProxyBandInput) for band in self.bands):
            raise ValueError("every band must be a ProxyBandInput")
        object.__setattr__(
            self,
            "broadband_penetration",
            _unit_interval("broadband_penetration", self.broadband_penetration),
        )
        object.__setattr__(
            self,
            "wifi_device_count",
            _nonnegative("wifi_device_count", self.wifi_device_count),
        )
        object.__setattr__(
            self,
            "personal_tx_max",
            _nonnegative("personal_tx_max", self.personal_tx_max),
        )
        object.__setattr__(
            self,
            "ambient_normalized",
            _unit_interval("ambient_normalized", self.ambient_normalized),
        )
        object.__setattr__(
            self,
            "chi_coordinate",
            _finite("chi_coordinate", self.chi_coordinate),
        )
        object.__setattr__(
            self,
            "source_provenance",
            _validated_provenance(self.source_provenance),
        )


@dataclass(frozen=True)
class RefinedAnnualComputation:
    """Auditable T1/T5--T9 calculation for one annual proxy row."""

    year: int
    exposure_proxy: RefinedExposureProxy
    duty_cycle: float
    personal_effective: float
    selected_personal_proxy: float
    combined_proxy: float
    ambient_normalized: float
    chi_coordinate: float


@dataclass(frozen=True)
class RefinedDKCResult:
    """Complete T1--T12 candidate orchestration with component provenance."""

    annual: tuple[RefinedAnnualComputation, ...]
    base_dkc: DKCResult
    base_load: float
    synergy_load: float
    parent_contribution: float
    final_load: float
    endpoint_delta: float
    seasonal_cv: float
    implemented_refinements: tuple[str, ...] = tuple(
        f"T{number}" for number in range(1, 13)
    )
    proxy_is_measured_field_state: Literal[False] = False
    geometric_selection_status: Literal["L1_COEFFICIENT_PRESERVED"] = (
        "L1_COEFFICIENT_PRESERVED"
    )
    coordinate_identification_status: Literal["L2_OPEN_EXPLICIT_INPUT"] = (
        "L2_OPEN_EXPLICIT_INPUT"
    )
    refined_model_status: Literal["L3_PHENOMENOLOGICAL"] = "L3_PHENOMENOLOGICAL"
    field_state_calibrated: bool = FIELD_STATE_CALIBRATED
    publishes_locked_forecasts: bool = PUBLISHES_LOCKED_FORECASTS
    can_run_uncalibrated: bool = CAN_RUN_UNCALIBRATED


def refined_exposure_proxy(
    bands: Sequence[ProxyBandInput],
    *,
    lambda_h: Real,
    broadband_penetration: Real,
    wifi_device_count: Real,
    wifi_weight: Real,
    source_provenance: Sequence[str] | None = None,
) -> RefinedExposureProxy:
    """Build the T6/T8/T9 national proxy without calling it FieldState.

    ``(1 + lambda_h * H)`` multiplies the sum of frequency-weighted saturated
    mobile components.  The separate Wi-Fi component is
    ``wifi_weight * broadband_penetration * wifi_device_count``.
    """

    if isinstance(bands, (str, bytes)) or not bands:
        raise ValueError("bands must contain at least one ProxyBandInput")
    resolved_lambda = _unit_interval("lambda_h", lambda_h)
    broadband = _unit_interval("broadband_penetration", broadband_penetration)
    devices = _nonnegative("wifi_device_count", wifi_device_count)
    resolved_wifi_weight = _nonnegative("wifi_weight", wifi_weight)
    contributions: list[float] = []
    for index, band in enumerate(bands):
        if not isinstance(band, ProxyBandInput):
            raise ValueError(f"bands[{index}] must be a ProxyBandInput")
        ambient = network_saturation(band.subscriptions, band.p_max, band.n_half)
        contributions.append(
            w_l(band.frequency_weight, fertility_endpoint=band.fertility_endpoint)
            * ambient
        )
    contribution_tuple = tuple(contributions)
    entropy = shannon_entropy(contribution_tuple)
    multiplier = 1.0 + resolved_lambda * entropy
    mobile = multiplier * math.fsum(contribution_tuple)
    wifi = resolved_wifi_weight * broadband * devices
    caller_provenance = _validated_provenance(source_provenance)
    provenance = (
        "classification=national technology exposure proxy; not measured FieldState",
        "formula=T6 Wi-Fi + T8 network saturation + T9 weighted spectral entropy",
        *caller_provenance,
    )
    return RefinedExposureProxy(
        name="refined_national_exposure_proxy_not_measured_fieldstate",
        value=mobile + wifi,
        complexity_adjusted_mobile=mobile,
        wifi_component=wifi,
        spectral_entropy_bits=entropy,
        complexity_multiplier=multiplier,
        band_contributions=contribution_tuple,
        provenance=provenance,
    )


def seasonal_cv(base_cv: Real, duty: Real) -> float:
    """T10 prediction ``CV_seasonal = CV_0 * (1 - duty_cycle)``."""

    baseline = _nonnegative("base_cv", base_cv)
    resolved_duty = _bounded("duty", duty, DUTY_CYCLE_MIN, DUTY_CYCLE_MAX)
    return baseline * (1.0 - resolved_duty)


def melatonin_suppression(night_duty: Real, pineal_chi: Real) -> float:
    """Return the bounded T11 product ``d_night * chi_pineal``."""

    return _unit_interval("night_duty", night_duty) * _unit_interval(
        "pineal_chi", pineal_chi
    )


def pathway_synergy(
    biological_load: Real,
    epsilon_synergy: Real,
    melatonin_suppression_fraction: Real,
) -> float:
    """T11 ``BL * (1 + epsilon_syn * melatonin_suppression)``."""

    load = _nonnegative("biological_load", biological_load)
    epsilon = _bounded(
        "epsilon_synergy",
        epsilon_synergy,
        EPSILON_SYNERGY_MIN,
        EPSILON_SYNERGY_MAX,
    )
    suppression = _unit_interval(
        "melatonin_suppression_fraction",
        melatonin_suppression_fraction,
    )
    return load * (1.0 + epsilon * suppression)


def parent_adjusted_load(
    own_load: Real,
    *,
    parent_load: Real,
    epsilon_epi: Real,
) -> float:
    """T12 one-generation load with an explicitly supplied parent load.

    No parent, conception date, lineage, or recursive genealogy is inferred.
    A caller that has a documented parent observation supplies that value
    directly; otherwise this function should not be called.
    """

    own = _nonnegative("own_load", own_load)
    parent = _nonnegative("parent_load", parent_load)
    epsilon = _bounded(
        "epsilon_epi",
        epsilon_epi,
        EPSILON_EPI_MIN,
        EPSILON_EPI_MAX,
    )
    return own + epsilon * parent


def evaluate_refined_dkc(
    annual_inputs: Sequence[RefinedAnnualInput],
    *,
    year: int,
    birth_year: Real,
    parameters: DKCParameters,
    smartphone_midpoint_year: Real,
    lambda_h: Real,
    wifi_weight: Real,
    power_control_eta: Real,
    night_duty: Real,
    pineal_susceptibility: Real,
    epsilon_synergy: Real,
    parent_final_load: Real,
    epsilon_epi: Real,
    seasonal_cv_baseline: Real,
    smartphone_steepness: Real = DEFAULT_SMARTPHONE_STEEPNESS,
    input_provenance: Sequence[str] | None = None,
) -> RefinedDKCResult:
    """Evaluate one explicit T1--T12 refined DKC candidate.

    The orchestration is deliberately pure and data-agnostic.  T1 constructs
    annual duty cycles; T2 is the Hill exponent; T3 weights the slow arm by
    cohort age; T4 requires an Erlang fast kernel; T5 is selected per frequency
    band; T6/T8/T9 construct the annual national proxy; T7 adds an explicitly
    normalized personal-transmitter proxy; T10 reports seasonal attenuation;
    and T11/T12 produce the final load before the endpoint map.

    The restricted ``chi_geo`` coefficient keeps its L1 provenance.  The
    caller-supplied ``chi_coordinate`` is the open L0→L2 input; the distinct
    ``ambient_normalized`` value belongs only to the T7 power-control model.
    The annual technology series is not a measured FieldState, and the DKC,
    synergy, inheritance and Hill components remain L3 phenomenology.
    ``parent_final_load`` is supplied explicitly; no genealogy is inferred.
    """

    if not isinstance(parameters, DKCParameters):
        raise ValueError("parameters must be DKCParameters")
    if parameters.erlang_shape is None:
        raise ValueError("refined T4 evaluation requires an Erlang fast-kernel shape")
    if isinstance(annual_inputs, (str, bytes)) or not annual_inputs:
        raise ValueError("annual_inputs must contain at least one RefinedAnnualInput")
    rows = tuple(annual_inputs)
    if any(not isinstance(row, RefinedAnnualInput) for row in rows):
        raise ValueError("every annual input must be a RefinedAnnualInput")
    rows = tuple(sorted(rows, key=lambda row: row.year))
    years = tuple(row.year for row in rows)
    if len(set(years)) != len(years):
        raise ValueError("annual_inputs must contain unique years")

    resolved_year = _integer("year", year)
    if resolved_year not in years:
        raise ValueError("annual_inputs must contain the evaluation year")
    relevant_rows = tuple(row for row in rows if row.year <= resolved_year)
    expected_years = tuple(range(relevant_rows[0].year, resolved_year + 1))
    if tuple(row.year for row in relevant_rows) != expected_years:
        raise ValueError("annual_inputs must be contiguous through the evaluation year")

    resolved_lambda_h = _unit_interval("lambda_h", lambda_h)
    resolved_wifi_weight = _nonnegative("wifi_weight", wifi_weight)
    resolved_power_eta = _unit_interval("power_control_eta", power_control_eta)
    midpoint = _finite("smartphone_midpoint_year", smartphone_midpoint_year)
    steepness = _positive("smartphone_steepness", smartphone_steepness)

    annual_results: list[RefinedAnnualComputation] = []
    for row in relevant_rows:
        proxy = refined_exposure_proxy(
            row.bands,
            lambda_h=resolved_lambda_h,
            broadband_penetration=row.broadband_penetration,
            wifi_device_count=row.wifi_device_count,
            wifi_weight=resolved_wifi_weight,
            source_provenance=row.source_provenance,
        )
        effective_personal = power_controlled_personal(
            row.personal_tx_max,
            row.ambient_normalized,
            resolved_power_eta,
        )
        selected_personal = (
            lindgren_geodesic_selection(row.chi_coordinate) * effective_personal
        )
        annual_results.append(
            RefinedAnnualComputation(
                year=row.year,
                exposure_proxy=proxy,
                duty_cycle=duty_cycle(row.year, midpoint, steepness),
                personal_effective=effective_personal,
                selected_personal_proxy=selected_personal,
                combined_proxy=proxy.value + selected_personal,
                ambient_normalized=row.ambient_normalized,
                chi_coordinate=row.chi_coordinate,
            )
        )

    annual_tuple = tuple(annual_results)
    exposure_by_year = {row.year: row.combined_proxy for row in annual_tuple}
    duty_by_year = {row.year: row.duty_cycle for row in annual_tuple}
    caller_provenance = _validated_provenance(input_provenance)
    annual_provenance = tuple(
        f"year={row.year}: {entry}"
        for row in relevant_rows
        for entry in row.source_provenance
    )
    base = evaluate_dkc(
        exposure_by_year,
        resolved_year,
        birth_year,
        parameters,
        duty_by_year=duty_by_year,
        input_name="refined_national_technology_timing_proxy_not_measured_fieldstate",
        input_provenance=(*caller_provenance, *annual_provenance),
    )
    suppression = melatonin_suppression(night_duty, pineal_susceptibility)
    synergy_load = pathway_synergy(base.biological_load, epsilon_synergy, suppression)
    final_load = parent_adjusted_load(
        synergy_load,
        parent_load=parent_final_load,
        epsilon_epi=epsilon_epi,
    )
    resolved_parent = _nonnegative("parent_final_load", parent_final_load)
    resolved_epsilon_epi = _bounded(
        "epsilon_epi",
        epsilon_epi,
        EPSILON_EPI_MIN,
        EPSILON_EPI_MAX,
    )
    endpoint_delta = hill_response(
        final_load,
        parameters.gamma,
        parameters.x_half,
        parameters.hill_n,
    )
    seasonal = seasonal_cv(
        seasonal_cv_baseline,
        annual_tuple[-1].duty_cycle,
    )
    return RefinedDKCResult(
        annual=annual_tuple,
        base_dkc=base,
        base_load=base.biological_load,
        synergy_load=synergy_load,
        parent_contribution=resolved_epsilon_epi * resolved_parent,
        final_load=final_load,
        endpoint_delta=endpoint_delta,
        seasonal_cv=seasonal,
    )


def allometric_resonance_frequency(
    body_length_m: Real,
    *,
    wave_speed_m_s: Real = SPEED_OF_LIGHT_M_S,
) -> float:
    """Return the grounded-body allometric resonance ``f_res = c / (4 L)``."""

    length = _positive("body_length_m", body_length_m)
    speed = _positive("wave_speed_m_s", wave_speed_m_s)
    return speed / (4.0 * length)


def allometric_memory_tau(
    mass_kg: Real,
    *,
    reference_mass_kg: Real = 70.0,
    reference_tau_years: Real = 12.0,
) -> float:
    """Return ``tau_R = tau_ref * (mass / mass_ref)^0.25``."""

    mass = _positive("mass_kg", mass_kg)
    reference_mass = _positive("reference_mass_kg", reference_mass_kg)
    reference_tau = _positive("reference_tau_years", reference_tau_years)
    return reference_tau * (mass / reference_mass) ** 0.25


__all__ = [
    "CAN_RUN_UNCALIBRATED",
    "CALCULATION_ENABLED",
    "CANDIDATE_OUTPUTS_ENABLED",
    "DEFAULT_SMARTPHONE_STEEPNESS",
    "DKCParameters",
    "DKCProvenance",
    "DKCResult",
    "DKC_ROUTE_ID",
    "DUTY_CYCLE_MAX",
    "DUTY_CYCLE_MIN",
    "EPSILON_EPI_MAX",
    "EPSILON_EPI_MIN",
    "EPSILON_SYNERGY_MAX",
    "EPSILON_SYNERGY_MIN",
    "FIELD_STATE_CALIBRATED",
    "FERTILITY_SAR_MULTIPLIERS",
    "FrequencyWeightInput",
    "L2_BRIDGE_STATUS",
    "LINDGREN_FORMULATION",
    "MODEL_STATUS",
    "PUBLISHES_LOCKED_FORECASTS",
    "ProxyBandInput",
    "RefinedAnnualComputation",
    "RefinedAnnualInput",
    "RefinedDKCResult",
    "RefinedExposureProxy",
    "SPEED_OF_LIGHT_M_S",
    "age_vulnerability",
    "allometric_memory_tau",
    "allometric_resonance_frequency",
    "contract_metric_perturbation",
    "contract_tensor",
    "duty_cycle",
    "erlang_kernel_weights",
    "evaluate_dkc",
    "evaluate_refined_dkc",
    "exponential_kernel_weights",
    "fertility_sar_multiplier",
    "hill_response",
    "lindgren_geodesic_selection",
    "melatonin_suppression",
    "metric_perturbation",
    "network_saturation",
    "normalized_erlang_kernel",
    "normalized_exponential_kernel",
    "parent_adjusted_load",
    "pathway_synergy",
    "power_controlled_personal",
    "refined_exposure_proxy",
    "seasonal_cv",
    "shannon_entropy",
    "smartphone_sigmoid",
    "two_channel_power_control_proxy",
    "w_l",
    "wifi_devices",
]
