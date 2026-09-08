"""A response window that depends on the measured cell state.

The present locked window is a fixed centre and width.  The natural
continuation, once the receptor is described as a state, is

    R_j^2 = INTEGRAL W(f; s_j, B0) * S_{d,j}(f) df

where ``S_{d,j}`` is the spectrum of a *defined biological driver* and
``s_j`` is the cell state measured before the experiment.  The same window
law then applies to every technology: a technology name is not a biological
tuning coefficient, and this module refuses to accept one.  Two guards make
that operational:

* ``StateDependentWindow.state_coefficients`` keys must come from the
  cell-state measurement vocabulary in :mod:`berm.modulome.state`;
* ``BiologicalDriver.driver_id`` must name a biological driver, and the
  spectrum carries its measured or modelled provenance.

The existing locked window remains available unchanged as its own comparison
candidate.  The state-dependent window is a new version that has to be tested
separately, and its parameters must come from independent measurements: the
present calculation is a declared form, not a validated ordering prediction
for experiments.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Mapping, Sequence

from berm.physics.field_state import ResonanceWindow, SpectralBin, spectral_overlap

from berm.modulome._common import (
    MODULOME_VERSION,
    STRUCTURAL_ONLY,
    check_calibration_status,
    finite,
    nonempty,
    nonnegative,
    normalise_ids,
)
from berm.modulome.state import STATE_MEASUREMENT_VOCABULARY, CellStateVector

__all__ = [
    "BiologicalDriver",
    "LOCKED_COMPARISON_WINDOW",
    "StateDependentWindow",
    "WindowComparison",
    "compare_windows",
    "state_dependent_response_power",
]


#: The previously locked window kept as its own comparison candidate.  The
#: centre is the synthesis reference frequency already used by the receptor
#: module (``berm.physics.ipr_mechanism``); nothing about it changes here.
LOCKED_COMPARISON_WINDOW = ResonanceWindow(25.2, 2.0, "LOCKED_25_2_HZ_COMPARISON")


@dataclass(frozen=True)
class BiologicalDriver:
    """A named biological driver spectrum, not a device or a technology."""

    driver_id: str
    bins: tuple[SpectralBin, ...]
    provenance: str
    calibration_status: str = STRUCTURAL_ONLY
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        object.__setattr__(self, "driver_id", nonempty("driver_id", self.driver_id))
        bins = tuple(self.bins)
        if not bins:
            raise ValueError("bins must contain at least one SpectralBin")
        if not all(isinstance(item, SpectralBin) for item in bins):
            raise ValueError("bins must contain SpectralBin values")
        object.__setattr__(self, "bins", bins)
        object.__setattr__(self, "provenance", nonempty("provenance", self.provenance))
        check_calibration_status(self.calibration_status)
        object.__setattr__(self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_id"))

    @property
    def total_power(self) -> float:
        return sum(item.power_density * item.bandwidth_hz for item in self.bins)


@dataclass(frozen=True)
class StateDependentWindow:
    """W(f; s, B0): centre and width shift with the measured state. [KANDIDAATTI]

        centre(s, B0) = centre0 * (1 + SUM_i c_i * (m_i - m_ref_i)) + k_B0 * B0
        sigma(s)      = sigma0 * (1 + SUM_i w_i * (m_i - m_ref_i))

    ``m_i`` are cell-state measurements.  Every coefficient must be supplied
    with a parameter id: the module holds no defaults, because the parameters
    have to be determined from independent measurements before this window can
    order any experiment.
    """

    window_id: str
    centre_hz: float
    sigma_hz: float
    parameter_ids: tuple[str, ...]
    state_coefficients: Mapping[str, float] = field(default_factory=dict)
    width_coefficients: Mapping[str, float] = field(default_factory=dict)
    reference_measurements: Mapping[str, float] = field(default_factory=dict)
    b0_coefficient_hz_per_tesla: float = 0.0
    calibration_status: str = STRUCTURAL_ONLY
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        object.__setattr__(self, "window_id", nonempty("window_id", self.window_id))
        for name in ("centre_hz", "sigma_hz"):
            value = nonnegative(name, getattr(self, name))
            if value <= 0.0:
                raise ValueError(f"{name} must be > 0")
            object.__setattr__(self, name, value)
        if not self.parameter_ids:
            raise ValueError("parameter_ids must identify the window parameterisation")
        object.__setattr__(
            self, "parameter_ids", normalise_ids(self.parameter_ids, "parameter_id")
        )
        for name in ("state_coefficients", "width_coefficients", "reference_measurements"):
            supplied = getattr(self, name)
            if not isinstance(supplied, Mapping):
                raise ValueError(f"{name} must be a mapping")
            resolved: dict[str, float] = {}
            for key, value in supplied.items():
                measurement = nonempty(f"{name} key", key)
                if measurement not in STATE_MEASUREMENT_VOCABULARY:
                    known = ", ".join(sorted(STATE_MEASUREMENT_VOCABULARY))
                    raise ValueError(
                        f"{measurement!r} is not a cell-state measurement; a window "
                        "coefficient may only depend on measured state, never on a "
                        f"technology, device or country label. Registered: {known}"
                    )
                resolved[measurement] = finite(f"{name}[{measurement}]", value)
            object.__setattr__(self, name, resolved)
        object.__setattr__(
            self,
            "b0_coefficient_hz_per_tesla",
            finite("b0_coefficient_hz_per_tesla", self.b0_coefficient_hz_per_tesla),
        )
        check_calibration_status(self.calibration_status)
        object.__setattr__(self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_id"))

    def _deviation(self, measurements: Mapping[str, float], key: str) -> float:
        return finite(key, measurements.get(key, 0.0)) - float(
            self.reference_measurements.get(key, 0.0)
        )

    def resolve(self, state: CellStateVector, *, b0_tesla: float = 0.0) -> ResonanceWindow:
        """Return the concrete Gaussian window for one measured state."""
        if not isinstance(state, CellStateVector):
            raise TypeError("state must be a CellStateVector")
        field_tesla = nonnegative("b0_tesla", b0_tesla)
        centre_shift = sum(
            coefficient * self._deviation(state.measurements, key)
            for key, coefficient in self.state_coefficients.items()
        )
        width_shift = sum(
            coefficient * self._deviation(state.measurements, key)
            for key, coefficient in self.width_coefficients.items()
        )
        centre = self.centre_hz * (1.0 + centre_shift) + (
            self.b0_coefficient_hz_per_tesla * field_tesla
        )
        sigma = self.sigma_hz * (1.0 + width_shift)
        if centre <= 0.0:
            raise ValueError(
                f"resolved centre frequency must be > 0 (got {centre:.6g} Hz); "
                "the coefficients are outside their declared validity range"
            )
        if sigma <= 0.0:
            raise ValueError(
                f"resolved window width must be > 0 (got {sigma:.6g} Hz); "
                "the coefficients are outside their declared validity range"
            )
        return ResonanceWindow(centre, sigma, f"{self.window_id}@{state.state_id}")


def state_dependent_response_power(
    window: StateDependentWindow,
    state: CellStateVector,
    driver: BiologicalDriver,
    *,
    b0_tesla: float = 0.0,
) -> float:
    """R^2 = INTEGRAL W(f; s, B0) S_d(f) df for one state and one driver."""
    if not isinstance(driver, BiologicalDriver):
        raise TypeError("driver must be a BiologicalDriver")
    resolved = window.resolve(state, b0_tesla=b0_tesla)
    return spectral_overlap(driver.bins, resolved)


@dataclass(frozen=True)
class WindowComparison:
    """The locked window and the state-dependent candidate, side by side."""

    driver_id: str
    state_id: str
    locked_window_id: str
    locked_response_power: float
    candidate_window_id: str
    candidate_centre_hz: float
    candidate_sigma_hz: float
    candidate_response_power: float
    calibration_status: str
    modulome_version: str = MODULOME_VERSION

    @property
    def ratio(self) -> float:
        """Candidate over locked; 0 when the locked window sees no power."""
        if self.locked_response_power == 0.0:
            return 0.0
        return self.candidate_response_power / self.locked_response_power


def compare_windows(
    window: StateDependentWindow,
    states: Sequence[CellStateVector],
    driver: BiologicalDriver,
    *,
    b0_tesla: float = 0.0,
    locked: ResonanceWindow = LOCKED_COMPARISON_WINDOW,
) -> tuple[WindowComparison, ...]:
    """Evaluate both windows over a set of measured states.

    The locked window does not depend on the state, so its response power is
    the same in every row.  Any difference between rows is produced entirely
    by the measured state entering the candidate window.
    """
    locked_power = spectral_overlap(driver.bins, locked)
    comparisons = []
    for state in states:
        resolved = window.resolve(state, b0_tesla=b0_tesla)
        comparisons.append(
            WindowComparison(
                driver_id=driver.driver_id,
                state_id=state.state_id,
                locked_window_id=locked.window_id,
                locked_response_power=locked_power,
                candidate_window_id=resolved.window_id,
                candidate_centre_hz=resolved.center_hz,
                candidate_sigma_hz=resolved.sigma_hz,
                candidate_response_power=spectral_overlap(driver.bins, resolved),
                calibration_status=window.calibration_status,
            )
        )
    return tuple(comparisons)
