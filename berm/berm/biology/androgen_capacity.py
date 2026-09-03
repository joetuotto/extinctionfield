"""Hormone availability and tissue-use capacity for BERM reproductive states.

Total testosterone is a production/concentration measurement, not tissue
androgen action.  This module makes the missing transformations explicit:

``total T -> binding equilibrium (SHBG + albumin) -> free T -> receptor
occupancy (AR and optional ZIP9) -> post-receptor gain -> androgen capacity``.

The equations are standard mass-action and receptor-occupancy forms.  They do
not assert that EMF changes SHBG, AR, ZIP9 or a downstream gain.  Any such
upstream mapping must be separately registered and calibrated in BERM.
"""

from __future__ import annotations

from dataclasses import dataclass
import math


ANDROGEN_CAPACITY_VERSION = "androgen-capacity-v1"


def _finite(name: str, value: float) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite number, not a boolean")
    resolved = float(value)
    if not math.isfinite(resolved):
        raise ValueError(f"{name} must be finite")
    return resolved


def _nonnegative(name: str, value: float) -> float:
    resolved = _finite(name, value)
    if resolved < 0.0:
        raise ValueError(f"{name} must be non-negative")
    return resolved


def _positive(name: str, value: float) -> float:
    resolved = _finite(name, value)
    if resolved <= 0.0:
        raise ValueError(f"{name} must be positive")
    return resolved


def _unit_interval(name: str, value: float) -> float:
    resolved = _finite(name, value)
    if not 0.0 <= resolved <= 1.0:
        raise ValueError(f"{name} must be in [0, 1]")
    return resolved


@dataclass(frozen=True)
class HormoneBindingState:
    """One-ligand, two-binding-pool equilibrium in consistent concentration units."""

    total_testosterone: float
    shbg_binding_sites: float
    albumin_binding_sites: float
    shbg_dissociation_constant: float
    albumin_dissociation_constant: float

    def __post_init__(self) -> None:
        for name in ("total_testosterone", "shbg_binding_sites", "albumin_binding_sites"):
            object.__setattr__(self, name, _nonnegative(name, getattr(self, name)))
        for name in ("shbg_dissociation_constant", "albumin_dissociation_constant"):
            object.__setattr__(self, name, _positive(name, getattr(self, name)))

    @property
    def free_testosterone(self) -> float:
        return free_hormone_from_mass_action(
            total=self.total_testosterone,
            binding_sites=(self.shbg_binding_sites, self.albumin_binding_sites),
            dissociation_constants=(
                self.shbg_dissociation_constant,
                self.albumin_dissociation_constant,
            ),
        )


@dataclass(frozen=True)
class ReceptorPathway:
    """Normalized receptor abundance and downstream transmission for one pathway."""

    name: str
    abundance: float
    dissociation_constant: float
    post_receptor_gain: float = 1.0

    def __post_init__(self) -> None:
        if not isinstance(self.name, str) or not self.name.strip():
            raise ValueError("name must be a non-empty string")
        object.__setattr__(self, "name", self.name.strip())
        object.__setattr__(self, "abundance", _unit_interval("abundance", self.abundance))
        object.__setattr__(
            self,
            "dissociation_constant",
            _positive("dissociation_constant", self.dissociation_constant),
        )
        object.__setattr__(
            self,
            "post_receptor_gain",
            _unit_interval("post_receptor_gain", self.post_receptor_gain),
        )

    def signal(self, free_testosterone: float) -> float:
        return receptor_signal(free_testosterone, self)


@dataclass(frozen=True)
class AndrogenCapacityResult:
    total_testosterone: float
    free_testosterone: float
    free_fraction: float
    pathway_signals: tuple[tuple[str, float], ...]
    effective_capacity: float


def free_hormone_from_mass_action(
    *,
    total: float,
    binding_sites: tuple[float, ...],
    dissociation_constants: tuple[float, ...],
    tolerance: float = 1e-12,
    max_iterations: int = 256,
) -> float:
    """Solve ``Ttot = Tf + sum(B_i Tf/(Kd_i+Tf))`` by bounded bisection."""

    total_value = _nonnegative("total", total)
    if len(binding_sites) != len(dissociation_constants) or not binding_sites:
        raise ValueError("binding_sites and dissociation_constants must be non-empty and aligned")
    sites = tuple(_nonnegative("binding_site", value) for value in binding_sites)
    constants = tuple(_positive("dissociation_constant", value) for value in dissociation_constants)
    tolerance_value = _positive("tolerance", tolerance)
    if not isinstance(max_iterations, int) or max_iterations < 1:
        raise ValueError("max_iterations must be a positive integer")
    if total_value == 0.0:
        return 0.0

    def residual(free: float) -> float:
        bound = sum(site * free / (constant + free) for site, constant in zip(sites, constants))
        return free + bound - total_value

    lower, upper = 0.0, total_value
    for _ in range(max_iterations):
        midpoint = 0.5 * (lower + upper)
        value = residual(midpoint)
        if abs(value) <= tolerance_value * max(1.0, total_value):
            return midpoint
        if value > 0.0:
            upper = midpoint
        else:
            lower = midpoint
    return 0.5 * (lower + upper)


def receptor_occupancy(free_hormone: float, dissociation_constant: float) -> float:
    free = _nonnegative("free_hormone", free_hormone)
    constant = _positive("dissociation_constant", dissociation_constant)
    return free / (constant + free)


def receptor_signal(free_testosterone: float, pathway: ReceptorPathway) -> float:
    if not isinstance(pathway, ReceptorPathway):
        raise TypeError("pathway must be a ReceptorPathway")
    return (
        pathway.abundance
        * receptor_occupancy(free_testosterone, pathway.dissociation_constant)
        * pathway.post_receptor_gain
    )


def androgen_effective_capacity(
    binding: HormoneBindingState,
    pathways: tuple[ReceptorPathway, ...],
    *,
    pathway_weights: tuple[float, ...] | None = None,
) -> AndrogenCapacityResult:
    """Return a weighted tissue capacity while retaining every intermediate."""

    if not isinstance(binding, HormoneBindingState):
        raise TypeError("binding must be a HormoneBindingState")
    if not pathways:
        raise ValueError("pathways must contain at least one receptor pathway")
    if not all(isinstance(pathway, ReceptorPathway) for pathway in pathways):
        raise TypeError("pathways must contain only ReceptorPathway values")
    weights = pathway_weights or tuple(1.0 for _ in pathways)
    if len(weights) != len(pathways):
        raise ValueError("pathway_weights must align with pathways")
    resolved_weights = tuple(_nonnegative("pathway_weight", weight) for weight in weights)
    weight_sum = sum(resolved_weights)
    if weight_sum == 0.0:
        raise ValueError("at least one pathway weight must be positive")

    free = binding.free_testosterone
    signals = tuple((pathway.name, pathway.signal(free)) for pathway in pathways)
    capacity = sum(
        weight * signal for weight, (_, signal) in zip(resolved_weights, signals)
    ) / weight_sum
    free_fraction = free / binding.total_testosterone if binding.total_testosterone else 0.0
    return AndrogenCapacityResult(
        total_testosterone=binding.total_testosterone,
        free_testosterone=free,
        free_fraction=free_fraction,
        pathway_signals=signals,
        effective_capacity=capacity,
    )


__all__ = [
    "ANDROGEN_CAPACITY_VERSION",
    "AndrogenCapacityResult",
    "HormoneBindingState",
    "ReceptorPathway",
    "androgen_effective_capacity",
    "free_hormone_from_mass_action",
    "receptor_occupancy",
    "receptor_signal",
]
