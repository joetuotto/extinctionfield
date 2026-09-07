"""Direction as its own functional dimension: alive, motile, misdirected.

A screen of ion-transport genes located directed migration in a direct-current
field to KCNJ15/Kir4.2 acting together with polyamines; silencing KCNJ15
removed field-directed orientation while basic motility was retained, and
changing polyamine level or binding changed the response
[HAVAINTO: Nakajima et al. 2015, 200 mV/mm direct field].  Interfering with
PI3Kgamma or PTEN likewise changed electrically guided movement in wound
healing [HAVAINTO: Zhao et al. 2006].

The endpoint this gives the modulome is not survival and not motility:

    the cell can stay alive and motile while processing directional
    information incorrectly.

A damage measure does not reach this endpoint, which is why it is modelled
separately.  ``directedness`` and ``migration_speed`` are independent outputs,
and ``directional_error`` is the reported endpoint.

The capability shown by these experiments concerns local electric fields at
the stated magnitude.  Which of BERM's own exposures reach a magnitude that
perturbs the same machinery is a separate calculation or measurement; this
module carries the field magnitude explicitly so that question stays visible.
"""

from __future__ import annotations

from dataclasses import dataclass
import math

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
    "DirectionalResponse",
    "NAKAJIMA_2015_SCREEN_FIELD_MV_PER_MM",
    "PolarityMachinery",
    "PolarityState",
    "galvanotaxis_response",
]

#: The direct-current field magnitude used in the galvanotaxis screen.
NAKAJIMA_2015_SCREEN_FIELD_MV_PER_MM = 200.0


@dataclass(frozen=True)
class PolarityMachinery:
    """The components that convert a field into a direction."""

    machinery_id: str
    kcnj15_activity: float = 1.0
    polyamine_availability: float = 1.0
    pi3k_gamma_activity: float = 1.0
    pten_activity: float = 1.0
    half_response_mv_per_mm: float = 100.0
    calibration_status: str = STRUCTURAL_ONLY
    parameter_ids: tuple[str, ...] = ()
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        object.__setattr__(self, "machinery_id", nonempty("machinery_id", self.machinery_id))
        for name in (
            "kcnj15_activity",
            "polyamine_availability",
            "pi3k_gamma_activity",
            "pten_activity",
        ):
            object.__setattr__(self, name, unit_interval(name, getattr(self, name)))
        half = nonnegative("half_response_mv_per_mm", self.half_response_mv_per_mm)
        if half <= 0.0:
            raise ValueError("half_response_mv_per_mm must be > 0")
        object.__setattr__(self, "half_response_mv_per_mm", half)
        check_calibration_status(self.calibration_status)
        object.__setattr__(self, "parameter_ids", normalise_ids(self.parameter_ids, "parameter_id"))
        object.__setattr__(self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_id"))

    @property
    def sensing_competence(self) -> float:
        """Channel and polyamines act together; either one gates the response."""
        return self.kcnj15_activity * self.polyamine_availability

    @property
    def polarity_competence(self) -> float:
        """PIP3 asymmetry needs both the producing and the removing arm."""
        return math.sqrt(self.pi3k_gamma_activity * self.pten_activity)

    def silenced(self, component: str) -> "PolarityMachinery":
        """Return the intervention arm for one named component."""
        field = {
            "kcnj15": "kcnj15_activity",
            "polyamines": "polyamine_availability",
            "pi3k_gamma": "pi3k_gamma_activity",
            "pten": "pten_activity",
        }.get(nonempty("component", component))
        if field is None:
            raise ValueError("component must be kcnj15, polyamines, pi3k_gamma or pten")
        values = {
            "machinery_id": f"{self.machinery_id}.{component}-silenced",
            "kcnj15_activity": self.kcnj15_activity,
            "polyamine_availability": self.polyamine_availability,
            "pi3k_gamma_activity": self.pi3k_gamma_activity,
            "pten_activity": self.pten_activity,
            "half_response_mv_per_mm": self.half_response_mv_per_mm,
            "calibration_status": self.calibration_status,
            "parameter_ids": self.parameter_ids,
            "evidence_ids": self.evidence_ids,
        }
        values[field] = 0.0
        return PolarityMachinery(**values)


@dataclass(frozen=True)
class PolarityState:
    """Measured polarity of one cell before the field is applied."""

    state_id: str
    pip3_anterior_fraction: float = 0.5
    intrinsic_motility: float = 1.0

    def __post_init__(self) -> None:
        object.__setattr__(self, "state_id", nonempty("state_id", self.state_id))
        object.__setattr__(
            self,
            "pip3_anterior_fraction",
            unit_interval("pip3_anterior_fraction", self.pip3_anterior_fraction),
        )
        object.__setattr__(
            self, "intrinsic_motility", unit_interval("intrinsic_motility", self.intrinsic_motility)
        )

    @property
    def polarity_asymmetry(self) -> float:
        """0 for an unpolarised cell, 1 for a fully anterior PIP3 distribution."""
        return abs(2.0 * self.pip3_anterior_fraction - 1.0)


@dataclass(frozen=True)
class DirectionalResponse:
    """Speed and direction reported separately, plus the directional endpoint."""

    machinery_id: str
    state_id: str
    field_mv_per_mm: float
    directedness: float
    migration_speed: float
    directional_error: float
    viable_but_misdirected: bool
    calibration_status: str
    modulome_version: str = MODULOME_VERSION


def galvanotaxis_response(
    machinery: PolarityMachinery,
    state: PolarityState,
    *,
    field_mv_per_mm: float,
    misdirection_threshold: float = 0.5,
) -> DirectionalResponse:
    """Directed response to a local direct-current field. [KANDIDAATTI]

    Directedness saturates with field magnitude and is gated by the sensing
    and polarity machinery.  Migration speed depends only on intrinsic
    motility, so an intervention can remove direction while leaving movement,
    which is exactly the reported dissociation.
    """
    if not isinstance(machinery, PolarityMachinery):
        raise TypeError("machinery must be a PolarityMachinery")
    if not isinstance(state, PolarityState):
        raise TypeError("state must be a PolarityState")
    field = nonnegative("field_mv_per_mm", field_mv_per_mm)
    threshold = unit_interval("misdirection_threshold", misdirection_threshold)

    saturation = field / (field + machinery.half_response_mv_per_mm)
    directedness = (
        saturation * machinery.sensing_competence * machinery.polarity_competence
    )
    speed = state.intrinsic_motility
    error = 1.0 - directedness

    return DirectionalResponse(
        machinery_id=machinery.machinery_id,
        state_id=state.state_id,
        field_mv_per_mm=field,
        directedness=directedness,
        migration_speed=speed,
        directional_error=error,
        viable_but_misdirected=speed > 0.0 and error >= threshold,
        calibration_status=check_calibration_status(machinery.calibration_status),
    )
