"""Three separately measured state quantities: readiness, repair, damage.

A single "effect size" cannot distinguish three different cells:

* one whose **receptor** has weakened, so the next exposure transduces less,
* one whose **repair capacity** has strengthened, so the same transduction
  produces less residual disturbance,
* one whose **baseline** has already moved, so the increment is measured
  from a different starting point.

All three produce the same reduced incremental response.  Separating them
makes the history effect explainable rather than merely observed, and it
converts the replication question from a publication year into a stated
cell history: passage number, differentiation, culture conditions and prior
exposures.

Quantities
----------
``receptor_readiness`` (s)  how the cell responds to the *next* exposure
                            [channel currents, CRY protein pool, store load]
``repair_capacity``    (A)  how the cell processes the load that is produced
                            [autophagic flux, repair rate, challenge tolerance]
``damage_load``        (D)  what disturbance is still present at measurement
                            [DNA damage, barrier permeability, dysfunction]

``s`` and ``A`` are relative factors in ``[0, 1]`` against a declared
reference state.  ``D`` is a non-negative registered load unit and is never a
probability.  No default kinetics are supplied: a caller must name the
coefficients and their provenance.
"""

from __future__ import annotations

from dataclasses import dataclass, field
import math
from typing import Mapping

from berm.modulome._common import (
    MODULOME_VERSION,
    STRUCTURAL_ONLY,
    check_calibration_status,
    combine_statuses,
    finite,
    nonempty,
    nonnegative,
    normalise_ids,
    read_only_measurements,
    unit_interval,
)

__all__ = [
    "AttenuationAttribution",
    "CellStateVector",
    "GlutathionePool",
    "ILLUSTRATIVE_STATE_KINETICS",
    "STATE_MEASUREMENT_VOCABULARY",
    "StateKinetics",
    "advance_cell_state",
    "attribute_reduced_response",
    "incremental_response",
    "simulate_state_trajectory",
]


#: Measurements that may define a state coordinate.  The vocabulary is the
#: mechanism the package uses to refuse a proxy: a technology name, a country
#: or a publication year is not a cell-state measurement.
STATE_MEASUREMENT_VOCABULARY: Mapping[str, str] = {
    # receptor readiness (s)
    "channel_current_density": "receptor_readiness",
    "trpc1_surface_density": "receptor_readiness",
    "cry_protein_pool": "receptor_readiness",
    "flavin_binding_occupancy": "receptor_readiness",
    "er_calcium_load": "receptor_readiness",
    "resting_membrane_potential": "receptor_readiness",
    "membrane_order": "receptor_readiness",
    # repair capacity (A)
    "autophagic_flux": "repair_capacity",
    "dna_repair_rate": "repair_capacity",
    "challenge_tolerance": "repair_capacity",
    "glutathione_ratio": "repair_capacity",
    "glutathione_gsh": "repair_capacity",
    "glutathione_gssg": "repair_capacity",
    "glutathione_equivalent_pool": "repair_capacity",
    # damage load (D)
    "dna_damage": "damage_load",
    "barrier_permeability": "damage_load",
    "functional_deficit": "damage_load",
}


GLUTATHIONE_ABSOLUTE_MEASUREMENTS = frozenset({
    "glutathione_gsh", "glutathione_gssg", "glutathione_equivalent_pool",
})


@dataclass(frozen=True)
class GlutathionePool:
    """Free GSH and GSSG measured in the same compartment and absolute unit.

    ``equivalent_pool = gsh + 2*gssg`` counts free glutathione equivalents.
    Oxidation of two GSH molecules to one GSSG conserves that pool.  A ratio
    alone cannot supply this record, a synthesis flux, or a damage estimate.
    Protein-bound glutathione is outside this free-pool measurement.
    """

    gsh: float
    gssg: float
    units: str
    compartment: str
    source_ids: tuple[str, ...]
    basis: str = "measured"

    def __post_init__(self) -> None:
        for name in ("gsh", "gssg"):
            object.__setattr__(self, name, nonnegative(name, getattr(self, name)))
        allowed_units = {
            "mol/L", "mmol/L", "umol/L", "µmol/L", "nmol/L",
            "nmol/mg protein", "nmol/10^6 viable cells", "pmol/viable cell",
        }
        if self.units not in allowed_units:
            raise ValueError("glutathione units must name an absolute concentration or normalized amount")
        object.__setattr__(self, "compartment", nonempty("compartment", self.compartment))
        ids = normalise_ids(self.source_ids, "source_id")
        if not ids:
            raise ValueError("source_ids must identify the pool measurement or illustration")
        object.__setattr__(self, "source_ids", ids)
        if self.basis not in {"measured", "illustrative"}:
            raise ValueError("basis must be measured or illustrative")
        finite("glutathione equivalent pool", self.equivalent_pool)

    @property
    def equivalent_pool(self) -> float:
        return finite("glutathione equivalent pool", self.gsh + 2 * self.gssg)

    @property
    def ratio(self) -> float | None:
        """GSH/GSSG; None when the denominator is zero, rather than infinity."""
        if self.gssg == 0:
            return None
        return finite("glutathione ratio", self.gsh / self.gssg)

    def as_measurements(self) -> dict[str, float]:
        result = {
            "glutathione_gsh": self.gsh,
            "glutathione_gssg": self.gssg,
            "glutathione_equivalent_pool": self.equivalent_pool,
        }
        if self.ratio is not None:
            result["glutathione_ratio"] = self.ratio
        return result

    def as_dict(self) -> dict:
        return {"gsh": self.gsh, "gssg": self.gssg, "equivalentPool": self.equivalent_pool,
                "ratio": self.ratio, "units": self.units, "compartment": self.compartment,
                "sourceIds": list(self.source_ids), "basis": self.basis,
                "poolScope": "free glutathione equivalents; excludes protein-bound glutathione"}


@dataclass(frozen=True)
class CellStateVector:
    """One measured cell state at one time point, with its measurements kept."""

    state_id: str
    receptor_readiness: float = 1.0
    repair_capacity: float = 1.0
    damage_load: float = 0.0
    measurements: Mapping[str, float] = field(default_factory=dict)
    passage_number: int | None = None
    differentiation_state: str | None = None
    prior_exposure_ids: tuple[str, ...] = ()
    calibration_status: str = STRUCTURAL_ONLY
    parameter_ids: tuple[str, ...] = ()
    evidence_ids: tuple[str, ...] = ()
    glutathione_pool: GlutathionePool | None = None

    def __post_init__(self) -> None:
        object.__setattr__(self, "state_id", nonempty("state_id", self.state_id))
        object.__setattr__(
            self,
            "receptor_readiness",
            unit_interval("receptor_readiness", self.receptor_readiness),
        )
        object.__setattr__(
            self, "repair_capacity", unit_interval("repair_capacity", self.repair_capacity)
        )
        object.__setattr__(
            self, "damage_load", nonnegative("damage_load", self.damage_load)
        )
        measurements = dict(read_only_measurements("measurements", self.measurements))
        if self.glutathione_pool is not None:
            if not isinstance(self.glutathione_pool, GlutathionePool):
                raise TypeError("glutathione_pool must be a GlutathionePool")
            derived = self.glutathione_pool.as_measurements()
            for key, value in derived.items():
                if key in measurements and not math.isclose(measurements[key], value, rel_tol=1e-9, abs_tol=0):
                    raise ValueError(f"{key} conflicts with the declared glutathione pool")
            if self.glutathione_pool.ratio is None and "glutathione_ratio" in measurements:
                raise ValueError("glutathione_ratio is undefined when GSSG is zero")
            measurements.update(derived)
        elif GLUTATHIONE_ABSOLUTE_MEASUREMENTS.intersection(measurements):
            raise ValueError("absolute glutathione measurements require a pool with units, compartment and sources")
        frozen = read_only_measurements("measurements", measurements)
        for key, _ in frozen:
            if key not in STATE_MEASUREMENT_VOCABULARY:
                known = ", ".join(sorted(STATE_MEASUREMENT_VOCABULARY))
                raise ValueError(
                    f"{key!r} is not a registered cell-state measurement; "
                    f"registered measurements are: {known}"
                )
        object.__setattr__(self, "measurements", dict(frozen))
        if self.passage_number is not None:
            if isinstance(self.passage_number, bool) or int(self.passage_number) < 0:
                raise ValueError("passage_number must be a non-negative integer or None")
            object.__setattr__(self, "passage_number", int(self.passage_number))
        if self.differentiation_state is not None:
            object.__setattr__(
                self,
                "differentiation_state",
                nonempty("differentiation_state", self.differentiation_state),
            )
        object.__setattr__(
            self, "prior_exposure_ids", normalise_ids(self.prior_exposure_ids, "prior_exposure_id")
        )
        check_calibration_status(self.calibration_status)
        object.__setattr__(
            self, "parameter_ids", normalise_ids(self.parameter_ids, "parameter_id")
        )
        object.__setattr__(
            self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_id")
        )

    @property
    def history_is_declared(self) -> bool:
        """True when the record states the history a replication would need.

        Passage number, differentiation state and prior exposures are what a
        second laboratory has to match.  A publication year is not part of
        this record because it is not a property of the cell.
        """
        return (
            self.passage_number is not None
            and self.differentiation_state is not None
        )

    def measurements_for(self, coordinate: str) -> dict[str, float]:
        """Return only the measurements that define one state coordinate."""
        if coordinate not in {"receptor_readiness", "repair_capacity", "damage_load"}:
            raise ValueError(
                "coordinate must be receptor_readiness, repair_capacity or damage_load"
            )
        return {
            key: value
            for key, value in self.measurements.items()
            if STATE_MEASUREMENT_VOCABULARY[key] == coordinate
        }


@dataclass(frozen=True)
class StateKinetics:
    """Named one-interval update coefficients for (s, A, D). [KANDIDAATTI]

    The response the cell produces is gated by its own readiness:

        D' = D + damage_gain * u * s - repair_rate * A * D
        A' = A + repair_induction * u * (1 - A) - repair_decay * (A - A_base)
        s' = s - readiness_loss * u * s + readiness_recovery * (s_base - s)

    ``u`` is the registered exposure increment for the interval.  The forms
    are deliberately visible and minimal; none of the coefficients has a
    project default, because none has been estimated from a matched
    state-and-exposure dataset.
    """

    parameter_ids: tuple[str, ...]
    damage_gain: float
    repair_rate: float
    repair_induction: float
    repair_decay: float
    readiness_loss: float
    readiness_recovery: float
    repair_baseline: float = 1.0
    readiness_baseline: float = 1.0
    calibration_status: str = STRUCTURAL_ONLY
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        if not self.parameter_ids:
            raise ValueError("parameter_ids must identify the kinetics")
        object.__setattr__(
            self, "parameter_ids", normalise_ids(self.parameter_ids, "parameter_id")
        )
        for name in (
            "damage_gain",
            "repair_rate",
            "repair_induction",
            "repair_decay",
            "readiness_loss",
            "readiness_recovery",
        ):
            object.__setattr__(self, name, nonnegative(name, getattr(self, name)))
        for name in ("repair_baseline", "readiness_baseline"):
            object.__setattr__(self, name, unit_interval(name, getattr(self, name)))
        check_calibration_status(self.calibration_status)
        object.__setattr__(
            self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_id")
        )


#: A shape-only parameter set used by figures and tests.  It is registered as
#: STRUCTURAL_ONLY and carries an explicit illustrative parameter id, so it can
#: never be mistaken for an estimate from a matched dataset.
ILLUSTRATIVE_STATE_KINETICS = StateKinetics(
    parameter_ids=("modulome.state.illustrative-shape-v1",),
    damage_gain=0.60,
    repair_rate=0.35,
    repair_induction=0.30,
    repair_decay=0.12,
    readiness_loss=0.12,
    readiness_recovery=0.08,
    repair_baseline=0.55,
    readiness_baseline=1.0,
)


def advance_cell_state(
    previous: CellStateVector,
    *,
    exposure_increment: float,
    kinetics: StateKinetics,
    state_id: str | None = None,
    measurements: Mapping[str, float] | None = None,
    exposure_id: str | None = None,
    glutathione_pool: GlutathionePool | None = None,
) -> CellStateVector:
    """Advance (s, A, D) by one registered interval."""
    if not isinstance(previous, CellStateVector):
        raise TypeError("previous must be a CellStateVector")
    if not isinstance(kinetics, StateKinetics):
        raise TypeError("kinetics must be a StateKinetics")
    u = nonnegative("exposure_increment", exposure_increment)

    s = previous.receptor_readiness
    a = previous.repair_capacity
    d = previous.damage_load

    produced = kinetics.damage_gain * u * s
    cleared = kinetics.repair_rate * a * d
    next_damage = max(0.0, d + produced - cleared)
    next_repair = min(
        1.0,
        max(
            0.0,
            a
            + kinetics.repair_induction * u * (1.0 - a)
            - kinetics.repair_decay * (a - kinetics.repair_baseline),
        ),
    )
    next_readiness = min(
        1.0,
        max(
            0.0,
            s
            - kinetics.readiness_loss * u * s
            + kinetics.readiness_recovery * (kinetics.readiness_baseline - s),
        ),
    )
    next_measurements = previous.measurements if measurements is None else measurements
    if glutathione_pool is not None and measurements is None:
        next_measurements = {key: value for key, value in previous.measurements.items()
                             if key not in GLUTATHIONE_ABSOLUTE_MEASUREMENTS and key != "glutathione_ratio"}
    return CellStateVector(
        state_id=state_id or previous.state_id,
        receptor_readiness=next_readiness,
        repair_capacity=next_repair,
        damage_load=next_damage,
        measurements=next_measurements,
        glutathione_pool=previous.glutathione_pool if glutathione_pool is None else glutathione_pool,
        passage_number=previous.passage_number,
        differentiation_state=previous.differentiation_state,
        prior_exposure_ids=(
            previous.prior_exposure_ids
            if exposure_id is None
            else (*previous.prior_exposure_ids, exposure_id)
        ),
        calibration_status=combine_statuses(
            previous.calibration_status, kinetics.calibration_status
        ),
        parameter_ids=normalise_ids(
            dict.fromkeys((*previous.parameter_ids, *kinetics.parameter_ids)), "parameter_id"
        ),
        evidence_ids=normalise_ids(
            dict.fromkeys((*previous.evidence_ids, *kinetics.evidence_ids)), "evidence_id"
        ),
    )


def incremental_response(
    state: CellStateVector, *, exposure_increment: float, kinetics: StateKinetics
) -> float:
    """Damage produced by one probe exposure from the present state.

    This is the quantity a challenge experiment reads out.  It is gated by
    readiness and reduced by repair, which is why it cannot on its own say
    which of the three quantities moved.
    """
    u = nonnegative("exposure_increment", exposure_increment)
    produced = kinetics.damage_gain * u * state.receptor_readiness
    cleared = kinetics.repair_rate * state.repair_capacity * produced
    return max(0.0, produced - cleared)


@dataclass(frozen=True)
class AttenuationAttribution:
    """Which of the three quantities explains a reduced incremental response."""

    reduced: bool
    response_before: float
    response_after: float
    readiness_change: float
    repair_change: float
    baseline_damage_change: float
    dominant_explanation: str
    discriminating_measurements: tuple[str, ...]
    modulome_version: str = MODULOME_VERSION


def attribute_reduced_response(
    before: CellStateVector,
    after: CellStateVector,
    *,
    probe_exposure: float,
    kinetics: StateKinetics,
) -> AttenuationAttribution:
    """Name the explanation for a changed challenge response.

    ``receptor_weakened``  readiness fell most in relative terms
    ``repair_strengthened``  repair capacity rose most
    ``baseline_shifted``   the starting damage load moved most
    ``no_attenuation``     the probe response did not fall

    The returned measurements are the ones that separate the alternatives:
    absolute baseline levels and recovery curves, not the response difference.
    """
    response_before = incremental_response(
        before, exposure_increment=probe_exposure, kinetics=kinetics
    )
    response_after = incremental_response(
        after, exposure_increment=probe_exposure, kinetics=kinetics
    )
    readiness_change = after.receptor_readiness - before.receptor_readiness
    repair_change = after.repair_capacity - before.repair_capacity
    baseline_change = after.damage_load - before.damage_load

    if response_after >= response_before:
        explanation = "no_attenuation"
    else:
        candidates = {
            "receptor_weakened": max(0.0, -readiness_change),
            "repair_strengthened": max(0.0, repair_change),
            "baseline_shifted": abs(baseline_change),
        }
        explanation = max(candidates, key=lambda key: candidates[key])
        if candidates[explanation] == 0.0:
            explanation = "unresolved"

    return AttenuationAttribution(
        reduced=response_after < response_before,
        response_before=response_before,
        response_after=response_after,
        readiness_change=readiness_change,
        repair_change=repair_change,
        baseline_damage_change=baseline_change,
        dominant_explanation=explanation,
        discriminating_measurements=(
            "absolute_baseline_levels",
            "recovery_curve_after_exposure",
            "challenge_tolerance_at_matched_baseline",
        ),
    )


def simulate_state_trajectory(
    initial: CellStateVector,
    *,
    exposure_schedule: tuple[float, ...],
    kinetics: StateKinetics,
) -> tuple[CellStateVector, ...]:
    """Apply a registered exposure schedule interval by interval."""
    states = [initial]
    for index, increment in enumerate(exposure_schedule):
        states.append(
            advance_cell_state(
                states[-1],
                exposure_increment=increment,
                kinetics=kinetics,
                exposure_id=f"{initial.state_id}.interval{index + 1}",
            )
        )
    return tuple(states)
