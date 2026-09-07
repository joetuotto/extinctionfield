"""Two coupled disturbances, their mutual gain and their recovery.

With ``x`` a barrier disturbance and ``y`` a hormonal disturbance, the simple
local model is

    dx/dt = a*u + b*y - r_x*x
    dy/dt = c*u + d*x - r_y*y

``b`` and ``d`` are the mutual gains and ``r_x``, ``r_y`` the recovery rates.
With positive recovery rates the equilibrium of this linear model is stable
exactly when

    b*d < r_x*r_y

This turns a qualitative "vicious circle" into a measurable question: does
chronic exposure move the ratio of gain to recovery toward instability?  Near
the boundary the slowest recovery time diverges, so recovery slows down before
any large functional change.  That signature can be looked for in existing
time series.

One thing this module refuses to conclude: positive feedback alone does not
establish irreversibility.  A stable linear loop with positive mutual gain
still returns to baseline.  Irreversibility needs a separately named
nonlinearity, threshold or loss of a state variable, and
``irreversibility_requirements`` states which.
"""

from __future__ import annotations

from dataclasses import dataclass
import math

from berm.modulome._common import (
    MODULOME_VERSION,
    STRUCTURAL_ONLY,
    check_calibration_status,
    finite,
    nonempty,
    nonnegative,
    normalise_ids,
)

__all__ = [
    "CoupledFeedbackLoop",
    "FeedbackStability",
    "LoopEquilibrium",
    "POSITIVE_FEEDBACK_IS_NOT_IRREVERSIBILITY",
    "chronic_shift_series",
    "irreversibility_requirements",
]


POSITIVE_FEEDBACK_IS_NOT_IRREVERSIBILITY = (
    "A stable linear loop with positive mutual gain returns to baseline after "
    "the drive is removed. Irreversibility requires a separately named "
    "nonlinearity, threshold crossing, or a state variable that cannot be "
    "restored."
)


@dataclass(frozen=True)
class FeedbackStability:
    """Stability of one loop, with the quantities that decide it."""

    loop_id: str
    mutual_gain_product: float
    recovery_product: float
    stability_margin: float
    is_stable: bool
    eigenvalue_real_parts: tuple[float, float]
    slowest_recovery_time: float | None
    modulome_version: str = MODULOME_VERSION

    @property
    def distance_to_boundary(self) -> float:
        """Positive inside the stable region, negative outside."""
        return self.stability_margin


@dataclass(frozen=True)
class LoopEquilibrium:
    """Steady state of the loop under a constant drive."""

    loop_id: str
    drive: float
    x_star: float
    y_star: float
    exists: bool


@dataclass(frozen=True)
class CoupledFeedbackLoop:
    """A two-variable local loop with named gains and recovery rates."""

    loop_id: str
    a: float
    b: float
    c: float
    d: float
    r_x: float
    r_y: float
    x_label: str = "barrier_disturbance"
    y_label: str = "hormonal_disturbance"
    parameter_ids: tuple[str, ...] = ()
    evidence_ids: tuple[str, ...] = ()
    calibration_status: str = STRUCTURAL_ONLY

    def __post_init__(self) -> None:
        object.__setattr__(self, "loop_id", nonempty("loop_id", self.loop_id))
        for name in ("a", "b", "c", "d"):
            object.__setattr__(self, name, finite(name, getattr(self, name)))
        for name in ("r_x", "r_y"):
            value = nonnegative(name, getattr(self, name))
            if value <= 0.0:
                raise ValueError(f"{name} must be > 0: recovery must be defined")
            object.__setattr__(self, name, value)
        for name in ("x_label", "y_label"):
            object.__setattr__(self, name, nonempty(name, getattr(self, name)))
        object.__setattr__(self, "parameter_ids", normalise_ids(self.parameter_ids, "parameter_id"))
        object.__setattr__(self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_id"))
        check_calibration_status(self.calibration_status)

    @property
    def mutual_gain_product(self) -> float:
        """b*d — the round-trip gain of the loop."""
        return self.b * self.d

    @property
    def recovery_product(self) -> float:
        """r_x*r_y — the product of the two recovery rates."""
        return self.r_x * self.r_y

    def eigenvalues(self) -> tuple[complex, complex]:
        """Eigenvalues of [[-r_x, b], [d, -r_y]]. [L1]"""
        trace = -(self.r_x + self.r_y)
        determinant = self.recovery_product - self.mutual_gain_product
        discriminant = trace * trace - 4.0 * determinant
        if discriminant >= 0.0:
            root = math.sqrt(discriminant)
            return complex((trace + root) / 2.0), complex((trace - root) / 2.0)
        root = math.sqrt(-discriminant)
        return (
            complex(trace / 2.0, root / 2.0),
            complex(trace / 2.0, -root / 2.0),
        )

    def stability(self) -> FeedbackStability:
        """Report the stability condition b*d < r_x*r_y and its consequences."""
        eigenvalues = self.eigenvalues()
        real_parts = (eigenvalues[0].real, eigenvalues[1].real)
        dominant = max(real_parts)
        margin = self.recovery_product - self.mutual_gain_product
        stable = margin > 0.0
        return FeedbackStability(
            loop_id=self.loop_id,
            mutual_gain_product=self.mutual_gain_product,
            recovery_product=self.recovery_product,
            stability_margin=margin,
            is_stable=stable,
            eigenvalue_real_parts=real_parts,
            slowest_recovery_time=(-1.0 / dominant) if dominant < 0.0 else None,
        )

    def equilibrium(self, drive: float) -> LoopEquilibrium:
        """Steady state under a constant drive ``u``; undefined when unstable."""
        u = finite("drive", drive)
        determinant = self.recovery_product - self.mutual_gain_product
        if determinant == 0.0:
            return LoopEquilibrium(self.loop_id, u, math.nan, math.nan, False)
        x_star = (self.a * u * self.r_y + self.b * self.c * u) / determinant
        y_star = (self.c * u * self.r_x + self.d * self.a * u) / determinant
        return LoopEquilibrium(self.loop_id, u, x_star, y_star, determinant > 0.0)

    def with_chronic_shift(
        self,
        *,
        gain_factor: float = 1.0,
        recovery_factor: float = 1.0,
        loop_id: str | None = None,
    ) -> "CoupledFeedbackLoop":
        """Scale the mutual gains up and the recovery rates down.

        This is the operational form of the question: chronic exposure is
        hypothesised to raise ``b`` and ``d`` or lower ``r_x`` and ``r_y``.
        Both scalings are supplied by the caller, never assumed.
        """
        gain = nonnegative("gain_factor", gain_factor)
        recovery = nonnegative("recovery_factor", recovery_factor)
        if recovery <= 0.0:
            raise ValueError("recovery_factor must be > 0")
        return CoupledFeedbackLoop(
            loop_id=loop_id or f"{self.loop_id}.shifted",
            a=self.a,
            b=self.b * gain,
            c=self.c,
            d=self.d * gain,
            r_x=self.r_x * recovery,
            r_y=self.r_y * recovery,
            x_label=self.x_label,
            y_label=self.y_label,
            parameter_ids=self.parameter_ids,
            evidence_ids=self.evidence_ids,
            calibration_status=self.calibration_status,
        )


def chronic_shift_series(
    loop: CoupledFeedbackLoop,
    *,
    gain_factors: tuple[float, ...],
    recovery_factors: tuple[float, ...],
) -> tuple[FeedbackStability, ...]:
    """Stability along a declared chronic-exposure axis.

    The two factor sequences must have equal length: each index is one point
    on the exposure axis, so the caller states exactly how gain and recovery
    are hypothesised to move together.
    """
    if len(gain_factors) != len(recovery_factors):
        raise ValueError("gain_factors and recovery_factors must have equal length")
    return tuple(
        loop.with_chronic_shift(
            gain_factor=gain,
            recovery_factor=recovery,
            loop_id=f"{loop.loop_id}.step{index}",
        ).stability()
        for index, (gain, recovery) in enumerate(zip(gain_factors, recovery_factors))
    )


def irreversibility_requirements(loop: CoupledFeedbackLoop) -> tuple[str, ...]:
    """What a claim of irreversibility would need beyond this loop."""
    stability = loop.stability()
    base = (
        POSITIVE_FEEDBACK_IS_NOT_IRREVERSIBILITY,
        "a named nonlinearity that creates a second stable state",
        "a measured threshold at which the loop leaves the linear regime",
        "a state variable whose loss cannot be restored (for example a cell pool)",
    )
    if stability.is_stable:
        return ("the present parameters are inside the stable region", *base)
    return ("the present parameters are outside the stable region", *base)
