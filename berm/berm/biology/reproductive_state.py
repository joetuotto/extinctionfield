"""Organ-, sex-, and couple-specific states for the FieldState ASFR route.

This is the biological middle layer of ``berm-v19``:

    FieldState features -> organ R/P memory -> reproductive capacity
    -> couple fecundability/live-birth support -> age-specific fertility.

The module deliberately contains *no* conversion from a national technology
proxy, an electric field, or a magnetic field into a reproductive decrement.
Those conversions must be supplied by a separately registered endpoint model.
It therefore makes the causal architecture executable without disguising an
assumption as a measured coefficient.

All capacity factors are relative factors in ``[0, 1]``.  A value of ``1`` is
the declared reference state for a component; it is not a universal claim that
every person has identical fertility.  Population heterogeneity belongs in the
input distribution, not in a hidden country-level multiplier.
"""

from __future__ import annotations

from dataclasses import dataclass, field
import math
from typing import Iterable, Mapping


REPRODUCTIVE_STATE_VERSION = "reproductive-state-v1"

# These labels distinguish coefficient resolution, not evidentiary weight.
# ``STRUCTURAL_ONLY`` keeps a calculation transparently conditional on its
# registered mapping; it can still carry active evidence IDs that constrain
# topology, direction, lag, susceptibility or a cross-species transfer
# signature.  They are intentionally strings in output so JSON clients need
# no Python enum decoder.
STRUCTURAL_ONLY = "STRUCTURAL_ONLY"
ENDPOINT_CALIBRATED = "ENDPOINT_CALIBRATED"
VALID_CALIBRATION_STATUSES = frozenset({STRUCTURAL_ONLY, ENDPOINT_CALIBRATED})


def _finite(name: str, value: float) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite number, not a boolean")
    try:
        resolved = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite number") from exc
    if not math.isfinite(resolved):
        raise ValueError(f"{name} must be a finite number")
    return resolved


def _unit_interval(name: str, value: float) -> float:
    resolved = _finite(name, value)
    if not 0.0 <= resolved <= 1.0:
        raise ValueError(f"{name} must be in [0, 1]")
    return resolved


def _nonnegative(name: str, value: float) -> float:
    resolved = _finite(name, value)
    if resolved < 0.0:
        raise ValueError(f"{name} must be non-negative")
    return resolved


def _nonempty(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


def _normalise_ids(values: Iterable[str], name: str) -> tuple[str, ...]:
    resolved = tuple(_nonempty(name, value) for value in values)
    if len(set(resolved)) != len(resolved):
        raise ValueError(f"{name} contains duplicate IDs")
    return resolved


def _product(*factors: float) -> float:
    result = 1.0
    for factor in factors:
        result *= factor
    return result


def _combine_statuses(*statuses: str) -> str:
    """Return calibrated only when every contributing state is calibrated."""
    return (
        ENDPOINT_CALIBRATED
        if statuses and all(status == ENDPOINT_CALIBRATED for status in statuses)
        else STRUCTURAL_ONLY
    )


@dataclass(frozen=True)
class OrganMemoryState:
    """A named reversible/persistent load state for one biological organ.

    ``reversible_load`` and ``persistent_load`` are intentionally left in
    *registered organ-load units*.  They are not a reproductive probability.
    The caller supplies endpoint-specific increments and retention values,
    preserving the distinction between an observed physical FieldState and a
    calibrated organ response.
    """

    organ: str
    reversible_load: float = 0.0
    persistent_load: float = 0.0
    calibration_status: str = STRUCTURAL_ONLY
    parameter_ids: tuple[str, ...] = ()
    evidence_ids: tuple[str, ...] = ()
    field_state_status: str = "NOT_EVALUATED"

    def __post_init__(self) -> None:
        object.__setattr__(self, "organ", _nonempty("organ", self.organ))
        object.__setattr__(
            self, "reversible_load", _nonnegative("reversible_load", self.reversible_load)
        )
        object.__setattr__(
            self, "persistent_load", _nonnegative("persistent_load", self.persistent_load)
        )
        if self.calibration_status not in VALID_CALIBRATION_STATUSES:
            raise ValueError(
                "calibration_status must be STRUCTURAL_ONLY or ENDPOINT_CALIBRATED"
            )
        object.__setattr__(self, "parameter_ids", _normalise_ids(self.parameter_ids, "parameter_id"))
        object.__setattr__(self, "evidence_ids", _normalise_ids(self.evidence_ids, "evidence_id"))
        object.__setattr__(
            self, "field_state_status", _nonempty("field_state_status", self.field_state_status)
        )

    @property
    def total_load(self) -> float:
        """Report components separately and their transparent unweighted sum."""
        return self.reversible_load + self.persistent_load


@dataclass(frozen=True)
class EndpointCapacityMapping:
    """Registered mapping from one organ R/P state to one capacity component.

    The response form is deliberately visible:

    ``factor = floor + (1-floor) * exp(-(beta_R * R + beta_P * P))``.

    It is suitable for a pre-specified monotone capacity endpoint (BTB
    integrity, sperm output, ovarian reserve, and so on), but contains no
    project default.  Every nonzero mapping therefore has a named parameter
    set and evidence record rather than inheriting a legacy TFR slope.  A
    ``STRUCTURAL_ONLY`` mapping is an active, explicitly conditional bridge;
    it does not erase the evidence IDs or imply an effect of zero.
    """

    component: str
    organ: str
    beta_reversible: float
    beta_persistent: float
    floor: float = 0.0
    parameter_ids: tuple[str, ...] = ()
    evidence_ids: tuple[str, ...] = ()
    calibration_status: str = STRUCTURAL_ONLY

    def __post_init__(self) -> None:
        object.__setattr__(self, "component", _nonempty("component", self.component))
        object.__setattr__(self, "organ", _nonempty("organ", self.organ))
        object.__setattr__(
            self, "beta_reversible", _nonnegative("beta_reversible", self.beta_reversible)
        )
        object.__setattr__(
            self, "beta_persistent", _nonnegative("beta_persistent", self.beta_persistent)
        )
        object.__setattr__(self, "floor", _unit_interval("floor", self.floor))
        if not self.parameter_ids:
            raise ValueError("parameter_ids must identify the endpoint mapping")
        object.__setattr__(self, "parameter_ids", _normalise_ids(self.parameter_ids, "parameter_id"))
        object.__setattr__(self, "evidence_ids", _normalise_ids(self.evidence_ids, "evidence_id"))
        if self.calibration_status not in VALID_CALIBRATION_STATUSES:
            raise ValueError(
                "calibration_status must be STRUCTURAL_ONLY or ENDPOINT_CALIBRATED"
            )


@dataclass(frozen=True)
class EndpointCapacityResult:
    """Result of an explicit organ-memory to capacity transformation."""

    component: str
    organ: str
    factor: float
    reversible_burden: float
    persistent_burden: float
    calibration_status: str
    parameter_ids: tuple[str, ...]
    evidence_ids: tuple[str, ...]


def map_memory_to_capacity(
    memory: OrganMemoryState,
    mapping: EndpointCapacityMapping,
) -> EndpointCapacityResult:
    """Apply a pre-registered response mapping to its matching organ memory."""
    if not isinstance(memory, OrganMemoryState):
        raise TypeError("memory must be an OrganMemoryState")
    if not isinstance(mapping, EndpointCapacityMapping):
        raise TypeError("mapping must be an EndpointCapacityMapping")
    if memory.organ != mapping.organ:
        raise ValueError(
            f"memory organ {memory.organ!r} does not match mapping organ {mapping.organ!r}"
        )
    reversible = mapping.beta_reversible * memory.reversible_load
    persistent = mapping.beta_persistent * memory.persistent_load
    factor = mapping.floor + (1.0 - mapping.floor) * math.exp(-(reversible + persistent))
    return EndpointCapacityResult(
        component=mapping.component,
        organ=mapping.organ,
        factor=factor,
        reversible_burden=reversible,
        persistent_burden=persistent,
        calibration_status=_combine_statuses(memory.calibration_status, mapping.calibration_status),
        parameter_ids=mapping.parameter_ids,
        evidence_ids=mapping.evidence_ids,
    )


def evolve_organ_memory(
    previous: OrganMemoryState,
    *,
    reversible_increment: float,
    persistent_increment: float,
    reversible_retention: float,
    persistent_retention: float = 1.0,
    parameter_ids: Iterable[str] = (),
    evidence_ids: Iterable[str] = (),
    calibration_status: str | None = None,
    field_state_status: str | None = None,
) -> OrganMemoryState:
    """Advance an organ-specific reversible/persistent state by one interval.

    No default biological response coefficient is supplied.  A calling study
    model must provide both increments and their registered provenance.  This
    prevents the legacy national ``cumEMF`` curve from being smuggled into a
    local-organ model under a new name.
    """
    if not isinstance(previous, OrganMemoryState):
        raise TypeError("previous must be an OrganMemoryState")
    r_retention = _unit_interval("reversible_retention", reversible_retention)
    p_retention = _unit_interval("persistent_retention", persistent_retention)
    status = calibration_status or previous.calibration_status
    if status not in VALID_CALIBRATION_STATUSES:
        raise ValueError(
            "calibration_status must be STRUCTURAL_ONLY or ENDPOINT_CALIBRATED"
        )
    return OrganMemoryState(
        organ=previous.organ,
        reversible_load=(
            r_retention * previous.reversible_load
            + _nonnegative("reversible_increment", reversible_increment)
        ),
        persistent_load=(
            p_retention * previous.persistent_load
            + _nonnegative("persistent_increment", persistent_increment)
        ),
        calibration_status=status,
        parameter_ids=_normalise_ids(
            (*previous.parameter_ids, *tuple(parameter_ids)), "parameter_id"
        ),
        evidence_ids=_normalise_ids(
            (*previous.evidence_ids, *tuple(evidence_ids)), "evidence_id"
        ),
        field_state_status=field_state_status or previous.field_state_status,
    )


_BARRIER_ORGANS = frozenset({"BBB", "BTB", "PLACENTA", "RETINA", "NERVE"})


@dataclass(frozen=True)
class BarrierState:
    """A tissue-specific barrier; BTB is intentionally not a BBB alias.

    ``tight_junction_integrity`` and ``transport_or_efflux_integrity`` are
    independent observed/estimated components because barrier leak and active
    transport do not represent the same function.  The value returned by
    :attr:`integrity` is an organ-local summary and must only be used by the
    corresponding downstream organ module.
    """

    barrier: str
    tight_junction_integrity: float = 1.0
    transport_or_efflux_integrity: float = 1.0
    memory: OrganMemoryState | None = None
    calibration_status: str = STRUCTURAL_ONLY
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        barrier = _nonempty("barrier", self.barrier).upper()
        if barrier not in _BARRIER_ORGANS:
            choices = ", ".join(sorted(_BARRIER_ORGANS))
            raise ValueError(f"barrier must be one of: {choices}")
        object.__setattr__(self, "barrier", barrier)
        object.__setattr__(
            self,
            "tight_junction_integrity",
            _unit_interval("tight_junction_integrity", self.tight_junction_integrity),
        )
        object.__setattr__(
            self,
            "transport_or_efflux_integrity",
            _unit_interval(
                "transport_or_efflux_integrity", self.transport_or_efflux_integrity
            ),
        )
        if self.memory is not None and self.memory.organ.upper() != barrier:
            raise ValueError(
                f"memory organ {self.memory.organ!r} does not match barrier {barrier!r}"
            )
        if self.calibration_status not in VALID_CALIBRATION_STATUSES:
            raise ValueError(
                "calibration_status must be STRUCTURAL_ONLY or ENDPOINT_CALIBRATED"
            )
        object.__setattr__(self, "evidence_ids", _normalise_ids(self.evidence_ids, "evidence_id"))

    @property
    def integrity(self) -> float:
        """Conservative organ-local barrier support; no cross-organ reuse."""
        return self.tight_junction_integrity * self.transport_or_efflux_integrity


@dataclass(frozen=True)
class MaleReproductiveState:
    """Male reproductive capacity with explicit BTB and reserve components."""

    germline_reserve: float = 1.0
    btb: BarrierState = field(default_factory=lambda: BarrierState("BTB"))
    steroidogenic_support: float = 1.0
    sperm_output: float = 1.0
    sperm_function: float = 1.0
    sperm_dna_integrity: float = 1.0
    calibration_status: str = STRUCTURAL_ONLY
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        object.__setattr__(self, "germline_reserve", _unit_interval("germline_reserve", self.germline_reserve))
        if not isinstance(self.btb, BarrierState) or self.btb.barrier != "BTB":
            raise ValueError("btb must be a BarrierState('BTB')")
        for name in (
            "steroidogenic_support",
            "sperm_output",
            "sperm_function",
            "sperm_dna_integrity",
        ):
            object.__setattr__(self, name, _unit_interval(name, getattr(self, name)))
        if self.calibration_status not in VALID_CALIBRATION_STATUSES:
            raise ValueError(
                "calibration_status must be STRUCTURAL_ONLY or ENDPOINT_CALIBRATED"
            )
        object.__setattr__(self, "evidence_ids", _normalise_ids(self.evidence_ids, "evidence_id"))

    @property
    def conception_capacity(self) -> float:
        """Capacity components prior to the partner-specific conception step."""
        return _product(
            self.germline_reserve,
            self.btb.integrity,
            self.steroidogenic_support,
            self.sperm_output,
            self.sperm_function,
            self.sperm_dna_integrity,
        )

    @property
    def combined_calibration_status(self) -> str:
        return _combine_statuses(self.calibration_status, self.btb.calibration_status)


@dataclass(frozen=True)
class FemaleReproductiveState:
    """Female capacity split into reserve, quality, timing and pregnancy support."""

    ovarian_reserve: float = 1.0
    oocyte_redox_quality: float = 1.0
    ovulatory_clock_gate: float = 1.0
    luteal_implantation_support: float = 1.0
    placental_barrier_support: BarrierState = field(
        default_factory=lambda: BarrierState("PLACENTA")
    )
    calibration_status: str = STRUCTURAL_ONLY
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        for name in (
            "ovarian_reserve",
            "oocyte_redox_quality",
            "ovulatory_clock_gate",
            "luteal_implantation_support",
        ):
            object.__setattr__(self, name, _unit_interval(name, getattr(self, name)))
        if (
            not isinstance(self.placental_barrier_support, BarrierState)
            or self.placental_barrier_support.barrier != "PLACENTA"
        ):
            raise ValueError("placental_barrier_support must be a BarrierState('PLACENTA')")
        if self.calibration_status not in VALID_CALIBRATION_STATUSES:
            raise ValueError(
                "calibration_status must be STRUCTURAL_ONLY or ENDPOINT_CALIBRATED"
            )
        object.__setattr__(self, "evidence_ids", _normalise_ids(self.evidence_ids, "evidence_id"))

    @property
    def conception_capacity(self) -> float:
        return _product(
            self.ovarian_reserve,
            self.oocyte_redox_quality,
            self.ovulatory_clock_gate,
        )

    @property
    def live_birth_support(self) -> float:
        return _product(
            self.luteal_implantation_support,
            self.placental_barrier_support.integrity,
        )

    @property
    def biological_capacity(self) -> float:
        return self.conception_capacity * self.live_birth_support

    @property
    def combined_calibration_status(self) -> str:
        return _combine_statuses(
            self.calibration_status, self.placental_barrier_support.calibration_status
        )


@dataclass(frozen=True)
class CoupleReproductiveState:
    """Partner-specific biological capacity for one age/cohort/time stratum.

    The couple state preserves the order of operations that TFR aggregation
    needs: first a pair's conception capacity, then the chance that conception
    receives pregnancy/live-birth support.  ``shared_household_biological_context``
    is explicit rather than inferred from a country average.  It can be used
    only when a matched household/partner study supplies it.
    """

    male: MaleReproductiveState
    female: FemaleReproductiveState
    shared_household_biological_context: float = 1.0
    pair_id: str | None = None
    field_state_status: str = "NOT_EVALUATED"
    provenance: Mapping[str, str] = field(default_factory=dict)

    def __post_init__(self) -> None:
        if not isinstance(self.male, MaleReproductiveState):
            raise TypeError("male must be a MaleReproductiveState")
        if not isinstance(self.female, FemaleReproductiveState):
            raise TypeError("female must be a FemaleReproductiveState")
        object.__setattr__(
            self,
            "shared_household_biological_context",
            _unit_interval(
                "shared_household_biological_context",
                self.shared_household_biological_context,
            ),
        )
        if self.pair_id is not None:
            object.__setattr__(self, "pair_id", _nonempty("pair_id", self.pair_id))
        object.__setattr__(
            self, "field_state_status", _nonempty("field_state_status", self.field_state_status)
        )
        if not isinstance(self.provenance, Mapping):
            raise ValueError("provenance must be a mapping")

    @property
    def conception_capacity(self) -> float:
        return _product(
            self.male.conception_capacity,
            self.female.conception_capacity,
            self.shared_household_biological_context,
        )

    @property
    def live_birth_support(self) -> float:
        return self.female.live_birth_support

    @property
    def biological_capacity(self) -> float:
        return self.conception_capacity * self.live_birth_support

    @property
    def calibration_status(self) -> str:
        return _combine_statuses(
            self.male.combined_calibration_status,
            self.female.combined_calibration_status,
        )


def mean_couple_capacity(states: Iterable[CoupleReproductiveState]) -> float:
    """Aggregate *paired* states; never multiply male/female population means."""
    values = []
    for state in states:
        if not isinstance(state, CoupleReproductiveState):
            raise TypeError("states must contain CoupleReproductiveState values")
        values.append(state.biological_capacity)
    if not values:
        raise ValueError("states must contain at least one couple")
    return sum(values) / len(values)


__all__ = [
    "ENDPOINT_CALIBRATED",
    "REPRODUCTIVE_STATE_VERSION",
    "STRUCTURAL_ONLY",
    "VALID_CALIBRATION_STATUSES",
    "BarrierState",
    "CoupleReproductiveState",
    "EndpointCapacityMapping",
    "EndpointCapacityResult",
    "FemaleReproductiveState",
    "MaleReproductiveState",
    "OrganMemoryState",
    "evolve_organ_memory",
    "map_memory_to_capacity",
    "mean_couple_capacity",
]
