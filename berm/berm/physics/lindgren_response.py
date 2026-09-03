"""Conditional Lindgren-to-observable response operator used by BERM.

The module keeps four epistemic layers separate:

1. ``metric_perturbation`` is algebraically derived from the 2025 ansatz
   ``g = eta + kappa A tensor A``.
2. ``geometric_chi`` is a bounded coordinate obtained from the rank-one
   inverse metric for an explicitly normalized positive-norm mode.  It is not
   a biological susceptibility.
3. ``contract_linear_response`` is the first-order matter response conditional
   on minimal matter-metric coupling and a caller-supplied retarded response
   kernel.  BERM does not provide a universal tissue kernel.
4. Low-pass envelope and beat terms are exact consequences of the quadratic
   ``a tensor a`` term for the stated waveforms.  Their biological effect still
   requires a tissue-specific response kernel and endpoint calibration.

No FieldState quantity is created here.  FieldState may estimate an input
field, but BERM owns the response model and every biological endpoint mapping.
"""

from __future__ import annotations

from dataclasses import dataclass
import math

import numpy as np
from numpy.typing import ArrayLike, NDArray


RESPONSE_OPERATOR_VERSION = "lindgren-response-v1"
CONDITIONAL_FORMAL_OPERATOR = "CONDITIONAL_FORMAL_OPERATOR"


def _finite_scalar(name: str, value: float) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite number, not a boolean")
    resolved = float(value)
    if not math.isfinite(resolved):
        raise ValueError(f"{name} must be finite")
    return resolved


def _finite_vector(name: str, value: ArrayLike) -> NDArray[np.float64]:
    resolved = np.asarray(value, dtype=float)
    if resolved.ndim != 1 or resolved.size == 0:
        raise ValueError(f"{name} must be a non-empty one-dimensional vector")
    if not np.all(np.isfinite(resolved)):
        raise ValueError(f"{name} must contain only finite values")
    return resolved


def metric_perturbation(
    background: ArrayLike,
    external: ArrayLike,
    *,
    coupling_scale: float = 1.0,
) -> NDArray[np.float64]:
    """Return the exact change in ``kappa A tensor A`` after ``A=B+a``.

    ``delta_g = kappa(B tensor a + a tensor B + a tensor a)``.
    No scalar contraction or biological interpretation is inserted.
    """

    background_vector = _finite_vector("background", background)
    external_vector = _finite_vector("external", external)
    if background_vector.shape != external_vector.shape:
        raise ValueError("background and external must have the same shape")
    kappa = _finite_scalar("coupling_scale", coupling_scale)
    return kappa * (
        np.outer(background_vector, external_vector)
        + np.outer(external_vector, background_vector)
        + np.outer(external_vector, external_vector)
    )


@dataclass(frozen=True)
class MultichannelMetricExpansion:
    """Exact named terms after ``A=A0+sum(a_i)`` in the Lindgren ansatz."""

    background_channel: tuple[NDArray[np.float64], ...]
    self_channel: tuple[NDArray[np.float64], ...]
    pairwise_channel: tuple[tuple[int, int, NDArray[np.float64]], ...]
    total: NDArray[np.float64]


def multichannel_metric_perturbation(
    background: ArrayLike,
    channels: tuple[ArrayLike, ...] | list[ArrayLike],
    *,
    coupling_scale: float = 1.0,
) -> MultichannelMetricExpansion:
    """Expand all background, self and pairwise terms without weighting them.

    For ``n`` external channels there are ``n(n-1)/2`` distinct pairwise
    terms.  This algebra permits interactions; it does not set their biological
    sign, magnitude or tissue relevance.
    """

    base = _finite_vector("background", background)
    resolved = tuple(_finite_vector(f"channels[{i}]", value) for i, value in enumerate(channels))
    if not resolved:
        raise ValueError("channels must contain at least one vector")
    if any(value.shape != base.shape for value in resolved):
        raise ValueError("background and every channel must have the same shape")
    kappa = _finite_scalar("coupling_scale", coupling_scale)
    background_terms = tuple(
        kappa * (np.outer(base, value) + np.outer(value, base)) for value in resolved
    )
    self_terms = tuple(kappa * np.outer(value, value) for value in resolved)
    pair_terms = tuple(
        (
            i,
            j,
            kappa
            * (
                np.outer(resolved[i], resolved[j])
                + np.outer(resolved[j], resolved[i])
            ),
        )
        for i in range(len(resolved))
        for j in range(i + 1, len(resolved))
    )
    total = sum((*background_terms, *self_terms), np.zeros((base.size, base.size)))
    total = total + sum((term for _, _, term in pair_terms), np.zeros_like(total))
    return MultichannelMetricExpansion(background_terms, self_terms, pair_terms, total)


@dataclass(frozen=True)
class BiologicalResponseContext:
    """Caller-supplied state arguments of an endpoint-specific L2 kernel.

    These are BERM response conditions, not FieldState coordinates.  Values
    are deliberately identifiers rather than fitted coefficients.
    """

    endpoint_id: str
    organ_transfer_id: str
    circadian_phase_id: str
    metabolic_phase_id: str
    developmental_window_id: str
    receptor_subtype_id: str
    agonist_state_id: str
    redox_state_id: str
    genotype_id: str
    exposure_history_id: str

    def __post_init__(self) -> None:
        for name, value in self.__dict__.items():
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f"{name} must be a non-empty identifier")


@dataclass(frozen=True)
class InteractionContrasts:
    """Additive and multiplicative contrasts for matched channel experiments."""

    additive: float
    multiplicative_log: float | None


def interaction_contrasts(
    baseline: float,
    first: float,
    second: float,
    combined: float,
) -> InteractionContrasts:
    """Return contrasts without assuming synergy or antagonism in advance."""

    y0 = _finite_scalar("baseline", baseline)
    y1 = _finite_scalar("first", first)
    y2 = _finite_scalar("second", second)
    y12 = _finite_scalar("combined", combined)
    additive = y12 - y1 - y2 + y0
    if min(y0, y1, y2, y12) <= 0.0:
        multiplicative = None
    else:
        multiplicative = math.log(y12) - math.log(y1) - math.log(y2) + math.log(y0)
    return InteractionContrasts(additive, multiplicative)


def geometric_chi(normalized_amplitude: float | ArrayLike) -> float | NDArray[np.float64]:
    """Bounded rank-one inverse-metric coordinate ``rho/sqrt(1+rho^2)``.

    ``rho`` must already be a dimensionless non-negative amplitude satisfying
    ``rho^2 = kappa A^2`` for a selected positive-norm mode.  The squared
    coordinate is the magnitude coefficient of the rank-one inverse-metric
    correction.  This does not determine a receptor or tissue response.
    """

    rho = np.asarray(normalized_amplitude, dtype=float)
    if not np.all(np.isfinite(rho)) or np.any(rho < 0.0):
        raise ValueError("normalized_amplitude must be finite and non-negative")
    result = rho / np.sqrt(1.0 + rho**2)
    return float(result) if result.ndim == 0 else result


def geometric_chi_squared(normalized_amplitude: float | ArrayLike) -> float | NDArray[np.float64]:
    """Return ``rho^2/(1+rho^2)``, the inverse-metric correction coefficient."""

    value = geometric_chi(normalized_amplitude)
    return value * value


def contract_linear_response(
    response_kernel: ArrayLike,
    delta_metric: ArrayLike,
) -> float:
    """Contract a caller-supplied tissue response kernel with ``delta_g``.

    This is the discrete form of the first-order term
    ``delta<O_i> = integral Xi_i^{mu nu}(x,x') delta_g_mu_nu(x') dx'``.
    A scalar result is returned only after the explicit contraction.
    """

    kernel = np.asarray(response_kernel, dtype=float)
    perturbation = np.asarray(delta_metric, dtype=float)
    if kernel.shape != perturbation.shape or kernel.ndim < 2:
        raise ValueError("response_kernel and delta_metric must have the same tensor shape")
    if not np.all(np.isfinite(kernel)) or not np.all(np.isfinite(perturbation)):
        raise ValueError("response_kernel and delta_metric must contain only finite values")
    return float(np.tensordot(kernel, perturbation, axes=kernel.ndim))


@dataclass(frozen=True)
class LowPassAMMetricComponents:
    """Low-frequency coefficients generated by one amplitude-modulated carrier."""

    dc: float
    envelope: float
    second_harmonic: float


def low_pass_am_metric_components(
    carrier_amplitude: float,
    modulation_depth: float,
    *,
    coupling_scale: float = 1.0,
) -> LowPassAMMetricComponents:
    """Return coefficients surviving ideal carrier removal from ``kappa a(t)^2``.

    For ``a(t)=a0(1+m cos(Omega t))cos(omega t)``, ideal low-pass removal of
    carrier terms gives

    ``kappa a0^2/2 [1 + 2m cos(Omega t) + m^2/2(1+cos(2Omega t))]``.
    """

    amplitude = _finite_scalar("carrier_amplitude", carrier_amplitude)
    depth = _finite_scalar("modulation_depth", modulation_depth)
    kappa = _finite_scalar("coupling_scale", coupling_scale)
    if amplitude < 0.0:
        raise ValueError("carrier_amplitude must be non-negative")
    if not 0.0 <= depth <= 1.0:
        raise ValueError("modulation_depth must be in [0, 1]")
    scale = kappa * amplitude**2
    return LowPassAMMetricComponents(
        dc=0.5 * scale * (1.0 + 0.5 * depth**2),
        envelope=scale * depth,
        second_harmonic=0.25 * scale * depth**2,
    )


def two_tone_beat_metric_amplitude(
    first_amplitude: float,
    second_amplitude: float,
    *,
    coupling_scale: float = 1.0,
) -> float:
    """Difference-frequency amplitude from the quadratic two-tone cross term."""

    first = _finite_scalar("first_amplitude", first_amplitude)
    second = _finite_scalar("second_amplitude", second_amplitude)
    kappa = _finite_scalar("coupling_scale", coupling_scale)
    if first < 0.0 or second < 0.0:
        raise ValueError("tone amplitudes must be non-negative")
    return kappa * first * second


__all__ = [
    "CONDITIONAL_FORMAL_OPERATOR",
    "RESPONSE_OPERATOR_VERSION",
    "LowPassAMMetricComponents",
    "BiologicalResponseContext",
    "InteractionContrasts",
    "MultichannelMetricExpansion",
    "contract_linear_response",
    "geometric_chi",
    "geometric_chi_squared",
    "low_pass_am_metric_components",
    "metric_perturbation",
    "multichannel_metric_perturbation",
    "interaction_contrasts",
    "two_tone_beat_metric_amplitude",
]
