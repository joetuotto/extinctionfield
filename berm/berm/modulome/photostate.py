"""FAD as a state and a light history, not as an amount.

Two separate observations drive this module:

* the flavin redox state and the light history change the response of a
  CRY-dependent system, so "how much FAD" is not the input variable
  [HAVAINTO: Iversen et al. 2025, C2C12];
* a conformational change of human CRY1 accompanies the transition from the
  neutral radical to the fully reduced flavin, and that transition involves
  the *sequential* absorption of two photons [HAVAINTO: Jeibmann et al. 2026].

The consequence this module implements: the same total photon dose can leave
the protein in a different state when the order of wavelengths and the delay
between them change.  ``sequential_two_photon_yield`` is therefore a function
of the ordered history, not of the summed dose.

The photochemical conformational change is observed.  Its magnetic modulation
is a separate, later test and is not asserted here.

There is no universal CRY sensitivity coefficient.  ``SUBTYPE_PARAMETERS``
holds only subtypes with a named source, and an unregistered subtype raises,
so a robin CRY1 parameterisation can never silently be applied to human CRY2.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
import math
from typing import Mapping, Sequence

from berm.modulome._common import (
    MODULOME_VERSION,
    STRUCTURAL_ONLY,
    check_calibration_status,
    nonempty,
    nonnegative,
    normalise_ids,
    unit_interval,
)

__all__ = [
    "CryptochromeIdentity",
    "CryptochromeParameters",
    "FlavinRedoxState",
    "FlavinState",
    "LightHistory",
    "PhotonEvent",
    "SUBTYPE_PARAMETERS",
    "SequentialPhotoresponse",
    "light_history",
    "require_subtype_parameters",
    "sequential_two_photon_yield",
]


class FlavinRedoxState(str, Enum):
    """Redox states of the bound flavin. The state, not the amount, is input."""

    OXIDISED = "oxidised"
    NEUTRAL_RADICAL = "neutral_radical"
    FULLY_REDUCED = "fully_reduced"


@dataclass(frozen=True)
class CryptochromeIdentity:
    """Which protein, which isoform, which compartment."""

    subtype: str
    isoform: str = "full_length"
    compartment: str = "unspecified"
    species: str = "human"

    def __post_init__(self) -> None:
        for name in ("subtype", "isoform", "compartment", "species"):
            object.__setattr__(self, name, nonempty(name, getattr(self, name)))

    @property
    def key(self) -> str:
        return f"{self.species}:{self.subtype}"


@dataclass(frozen=True)
class FlavinState:
    """Bound-flavin state: occupancy and redox state, both measured."""

    redox_state: FlavinRedoxState = FlavinRedoxState.OXIDISED
    binding_occupancy: float = 1.0

    def __post_init__(self) -> None:
        if not isinstance(self.redox_state, FlavinRedoxState):
            raise ValueError("redox_state must be a FlavinRedoxState")
        object.__setattr__(
            self, "binding_occupancy", unit_interval("binding_occupancy", self.binding_occupancy)
        )


@dataclass(frozen=True)
class PhotonEvent:
    """One illumination episode in an ordered history."""

    wavelength_nm: float
    photon_flux: float
    duration_s: float
    delay_before_s: float = 0.0

    def __post_init__(self) -> None:
        for name in ("wavelength_nm", "photon_flux", "duration_s", "delay_before_s"):
            object.__setattr__(self, name, nonnegative(name, getattr(self, name)))
        if self.wavelength_nm <= 0.0:
            raise ValueError("wavelength_nm must be > 0")

    @property
    def dose(self) -> float:
        return self.photon_flux * self.duration_s


@dataclass(frozen=True)
class LightHistory:
    """An ordered sequence of illumination episodes."""

    events: tuple[PhotonEvent, ...]
    history_id: str = "light-history"

    def __post_init__(self) -> None:
        events = tuple(self.events)
        if not all(isinstance(event, PhotonEvent) for event in events):
            raise ValueError("events must contain PhotonEvent values")
        object.__setattr__(self, "events", events)
        object.__setattr__(self, "history_id", nonempty("history_id", self.history_id))

    @property
    def total_dose(self) -> float:
        """The quantity that a dose-only model would treat as the input."""
        return sum(event.dose for event in self.events)

    @property
    def ordered_signature(self) -> tuple[tuple[float, float, float], ...]:
        """Wavelength, dose and preceding delay in order — the actual input."""
        return tuple(
            (event.wavelength_nm, event.dose, event.delay_before_s) for event in self.events
        )

    def reversed_order(self) -> "LightHistory":
        """Same episodes, reversed order: identical total dose by construction."""
        return LightHistory(
            events=tuple(reversed(self.events)), history_id=f"{self.history_id}.reversed"
        )


@dataclass(frozen=True)
class CryptochromeParameters:
    """Per-subtype photochemistry. Registered per protein, never shared."""

    identity_key: str
    first_step_peak_nm: float
    first_step_width_nm: float
    second_step_peak_nm: float
    second_step_width_nm: float
    intermediate_lifetime_s: float
    first_step_quantum_yield: float
    second_step_quantum_yield: float
    parameter_ids: tuple[str, ...]
    evidence_ids: tuple[str, ...] = ()
    calibration_status: str = STRUCTURAL_ONLY

    def __post_init__(self) -> None:
        object.__setattr__(self, "identity_key", nonempty("identity_key", self.identity_key))
        for name in (
            "first_step_peak_nm",
            "first_step_width_nm",
            "second_step_peak_nm",
            "second_step_width_nm",
            "intermediate_lifetime_s",
        ):
            value = nonnegative(name, getattr(self, name))
            if value <= 0.0:
                raise ValueError(f"{name} must be > 0")
            object.__setattr__(self, name, value)
        for name in ("first_step_quantum_yield", "second_step_quantum_yield"):
            object.__setattr__(self, name, unit_interval(name, getattr(self, name)))
        if not self.parameter_ids:
            raise ValueError("parameter_ids must identify the subtype parameterisation")
        object.__setattr__(
            self, "parameter_ids", normalise_ids(self.parameter_ids, "parameter_id")
        )
        object.__setattr__(
            self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_id")
        )
        check_calibration_status(self.calibration_status)

    def absorption(self, wavelength_nm: float, *, step: int) -> float:
        """Gaussian absorption weight of one photochemical step. [KANDIDAATTI]"""
        if step not in (1, 2):
            raise ValueError("step must be 1 or 2")
        peak = self.first_step_peak_nm if step == 1 else self.second_step_peak_nm
        width = self.first_step_width_nm if step == 1 else self.second_step_width_nm
        z = (nonnegative("wavelength_nm", wavelength_nm) - peak) / width
        return math.exp(-0.5 * z * z)


#: Only subtypes with a named source appear here.  The absorption bands follow
#: the reported photocycle steps; the widths and yields are declared candidate
#: values, not fitted constants.
SUBTYPE_PARAMETERS: Mapping[str, CryptochromeParameters] = {
    "human:CRY1": CryptochromeParameters(
        identity_key="human:CRY1",
        first_step_peak_nm=450.0,
        first_step_width_nm=35.0,
        second_step_peak_nm=540.0,
        second_step_width_nm=45.0,
        intermediate_lifetime_s=2.0,
        first_step_quantum_yield=0.20,
        second_step_quantum_yield=0.15,
        parameter_ids=("modulome.photostate.human-cry1-v1",),
        evidence_ids=("jeibmann2026",),
    ),
    "human:CRY2": CryptochromeParameters(
        identity_key="human:CRY2",
        first_step_peak_nm=450.0,
        first_step_width_nm=35.0,
        second_step_peak_nm=530.0,
        second_step_width_nm=45.0,
        intermediate_lifetime_s=1.0,
        first_step_quantum_yield=0.18,
        second_step_quantum_yield=0.12,
        parameter_ids=("modulome.photostate.human-cry2-v1",),
        evidence_ids=("iversen2025",),
    ),
    "erithacus_rubecula:CRY1": CryptochromeParameters(
        identity_key="erithacus_rubecula:CRY1",
        first_step_peak_nm=450.0,
        first_step_width_nm=30.0,
        second_step_peak_nm=520.0,
        second_step_width_nm=40.0,
        intermediate_lifetime_s=1.5,
        first_step_quantum_yield=0.20,
        second_step_quantum_yield=0.10,
        parameter_ids=("modulome.photostate.robin-cry1-v1",),
        evidence_ids=("wickramaratne2025",),
    ),
}


def require_subtype_parameters(identity: CryptochromeIdentity) -> CryptochromeParameters:
    """Return the registered parameters, or refuse to substitute another protein."""
    if not isinstance(identity, CryptochromeIdentity):
        raise TypeError("identity must be a CryptochromeIdentity")
    try:
        return SUBTYPE_PARAMETERS[identity.key]
    except KeyError as exc:
        registered = ", ".join(sorted(SUBTYPE_PARAMETERS))
        raise KeyError(
            f"no registered photochemistry for {identity.key!r}; "
            f"registered subtypes are: {registered}. "
            "A single shared CRY coefficient is not available by design."
        ) from exc


@dataclass(frozen=True)
class SequentialPhotoresponse:
    """Outcome of an ordered light history on one cryptochrome."""

    identity_key: str
    history_id: str
    total_dose: float
    first_step_progress: float
    sequential_yield: float
    final_redox_state: FlavinRedoxState
    order_sensitive: bool
    parameter_ids: tuple[str, ...]
    calibration_status: str
    modulome_version: str = MODULOME_VERSION


def sequential_two_photon_yield(
    identity: CryptochromeIdentity,
    flavin: FlavinState,
    history: LightHistory,
    *,
    parameters: CryptochromeParameters | None = None,
    fully_reduced_threshold: float = 0.5,
) -> SequentialPhotoresponse:
    """Fraction reaching the fully reduced state under an ordered history.

    The second step acts only on the population that the first step has
    produced, and that population decays with ``intermediate_lifetime_s``
    during the delay before the next episode.  Reversing two episodes with
    different wavelengths therefore changes the outcome while leaving
    ``LightHistory.total_dose`` unchanged.
    """
    resolved = parameters if parameters is not None else require_subtype_parameters(identity)
    if not isinstance(flavin, FlavinState):
        raise TypeError("flavin must be a FlavinState")
    if not isinstance(history, LightHistory):
        raise TypeError("history must be a LightHistory")
    threshold = unit_interval("fully_reduced_threshold", fully_reduced_threshold)

    # Population fractions of the three states, scaled by flavin occupancy.
    oxidised = 1.0 if flavin.redox_state is FlavinRedoxState.OXIDISED else 0.0
    intermediate = 1.0 if flavin.redox_state is FlavinRedoxState.NEUTRAL_RADICAL else 0.0
    reduced = 1.0 if flavin.redox_state is FlavinRedoxState.FULLY_REDUCED else 0.0
    first_step_total = 0.0

    for event in history.events:
        if event.delay_before_s > 0.0:
            surviving = math.exp(-event.delay_before_s / resolved.intermediate_lifetime_s)
            returned = intermediate * (1.0 - surviving)
            intermediate *= surviving
            oxidised += returned

        first_rate = (
            resolved.first_step_quantum_yield
            * resolved.absorption(event.wavelength_nm, step=1)
            * event.dose
        )
        second_rate = (
            resolved.second_step_quantum_yield
            * resolved.absorption(event.wavelength_nm, step=2)
            * event.dose
        )
        promoted = oxidised * (1.0 - math.exp(-first_rate))
        advanced = intermediate * (1.0 - math.exp(-second_rate))
        oxidised -= promoted
        intermediate += promoted - advanced
        reduced += advanced
        first_step_total += promoted

    occupancy = flavin.binding_occupancy
    sequential_yield = reduced * occupancy
    order_sensitive = len({event.wavelength_nm for event in history.events}) > 1

    return SequentialPhotoresponse(
        identity_key=identity.key,
        history_id=history.history_id,
        total_dose=history.total_dose,
        first_step_progress=first_step_total * occupancy,
        sequential_yield=sequential_yield,
        final_redox_state=(
            FlavinRedoxState.FULLY_REDUCED
            if sequential_yield >= threshold
            else FlavinRedoxState.NEUTRAL_RADICAL
            if intermediate * occupancy >= threshold
            else FlavinRedoxState.OXIDISED
        ),
        order_sensitive=order_sensitive,
        parameter_ids=resolved.parameter_ids,
        calibration_status=resolved.calibration_status,
    )


def light_history(events: Sequence[PhotonEvent], history_id: str = "light-history") -> LightHistory:
    """Build an ordered history from a sequence of episodes."""
    return LightHistory(events=tuple(events), history_id=history_id)
