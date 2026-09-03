"""Pure temporal biological-capacity core for the historical BERM model.

This module is intentionally a *consumer* of an externally constructed
exposure-memory value.  It does not know how a country-year exposure series
was generated, does not reconstruct a history, and does not calibrate against
an observed TFR.  That separation is important for a locked temporal
backtest: an upstream source layer supplies an externally observed (or
explicitly interpolated) exposure panel, a lag model supplies
``memory_exposure``, and this core maps that value to the BERM biological and
behavioural components.

The retained outcome structure is deliberately explicit::

    bioCap(memory_exposure, nutrition) * behav(memory_exposure)

``ambient`` and ``personal`` are current-year, caller-supplied channels.  The
core records their Lindgren-selected instantaneous value
``ambient + chi(ambient) * personal`` for provenance and diagnostics.  It
does not silently add that value to ``memory_exposure``: doing so would double
count the current year whenever the upstream lag model already includes it.

Why some legacy v16/v17 components are deliberately excluded
--------------------------------------------------------------
The acute CRY, melatonin, ovulation-VGIC, sperm-Ca2+, and male-bio-capacity
subpaths call ``v16_ambient_annual`` and/or ``v16_personal_annual`` internally.
Those functions generate country-year exposure with BERM's endogenous
technology-diffusion assumptions.  Calling them here would reintroduce the
circular exposure pathway this temporal core is meant to remove.  The legacy
epigenetic term also derives duration from ``TECH_DIFFUSION`` and is excluded
for the same reason.  Acute paths can only be added later as a separate,
externally parameterised component with its own locked contract.
"""

from __future__ import annotations

from collections.abc import Mapping
from copy import deepcopy
from dataclasses import asdict, dataclass
import math
from typing import Any

from berm.v16 import (
    emf_behavioral_factor_v3,
    v11_biological_capacity,
    v12_nutrition_modifier,
)


TEMPORAL_CORE_VERSION = "v18-pure-temporal-core-1"

# These functions deliberately remain outside this core.  Keeping the list in
# the returned provenance makes an accidental reintroduction visible in every
# downstream report rather than only in source code review.
EXCLUDED_LEGACY_ACUTE_SUBPATHS = (
    "v17_male_bio_cap (uses endogenous instantaneous annual exposure)",
    "v17_sperm_ca2_fecundity (uses endogenous personal/cumulative exposure)",
    "v17_cry_effect (uses endogenous personal annual exposure)",
    "v17_melatonin_suppression (uses endogenous personal annual exposure)",
    "v17_ovulation_vgic (uses endogenous ambient/personal annual exposure)",
    "v16_epigenetic_factor (uses endogenous TECH_DIFFUSION timing)",
)


def lindgren_chi(ambient: float) -> float:
    """Return BERM's scalar closure ``A / sqrt(1 + A²)``.

    The function name is retained for compatibility.  The closure is motivated
    by the Lindgren premise but is not derived from it and does not close L2.
    A local implementation avoids importing the legacy/numpy exposure stack.
    Ambient values must be non-negative; validation happens at the public
    boundary.
    """
    return ambient / math.sqrt(1.0 + ambient * ambient)


def selected_two_channel_exposure(ambient: float, personal: float) -> float:
    """Apply the P3 selection rule to two caller-supplied current channels.

    This helper is deliberately instantaneous.  It is not an annual history
    generator and is never substituted for ``memory_exposure``.
    """
    resolved_ambient = _nonnegative_finite("ambient", ambient)
    resolved_personal = _nonnegative_finite("personal", personal)
    return resolved_ambient + lindgren_chi(resolved_ambient) * resolved_personal


@dataclass(frozen=True)
class TemporalCoreResult:
    """One pure temporal BERM evaluation plus full calculation provenance.

    ``bio_cap_x_behav`` is an uncalibrated biological intensity, not a final
    country TFR.  A later, separately locked outcome layer may combine it with
    pre-specified demand/culture and ASFR components; this core deliberately
    contains neither a country-year cultural fit nor a global calibration.
    """

    country: str
    year: int
    memory_exposure: float
    ambient: float
    personal: float
    chi: float
    selected_personal_exposure: float
    instantaneous_selected_exposure: float
    base_biological_capacity: float
    nutrition_modifier: float
    bio_capacity: float
    behavioral_factor: float
    bio_behavior: float
    input_provenance: Mapping[str, Any]
    model_provenance: Mapping[str, Any]
    excluded_legacy_acute_subpaths: tuple[str, ...]

    @property
    def biological_capacity(self) -> float:
        """Readable alias for ``bio_capacity``."""
        return self.bio_capacity

    @property
    def behav(self) -> float:
        """Readable alias for ``behavioral_factor``."""
        return self.behavioral_factor

    @property
    def bio_cap_x_behav(self) -> float:
        """Backward-readable spelling of the explicit bioCap × behav product."""
        return self.bio_behavior

    def as_dict(self) -> dict[str, Any]:
        """Return a detached, serialization-friendly representation.

        The caller's provenance mapping is copied at construction and copied
        again here, so mutating either side cannot retroactively change a
        calculation record.
        """
        result = asdict(self)
        result["input_provenance"] = deepcopy(dict(self.input_provenance))
        result["model_provenance"] = deepcopy(dict(self.model_provenance))
        return result


def evaluate_temporal_core(
    country: str,
    year: int,
    *,
    memory_exposure: float,
    ambient: float,
    personal: float,
    input_provenance: Mapping[str, Any] | None = None,
    memory_definition: str = "externally supplied lag-weighted exposure",
) -> TemporalCoreResult:
    """Evaluate BERM's non-calibrating temporal biological core.

    Parameters
    ----------
    country, year:
        Context labels.  ``country`` is used only by the static v12 nutrition
        lookup; ``year`` is retained for auditability and is not used to
        generate exposure or to fit a rate.
    memory_exposure:
        Externally constructed exposure-memory scalar, on the scale expected
        by ``v11_biological_capacity`` and ``emf_behavioral_factor_v3``.  It
        should normally be constructed upstream from external annual channels
        using a documented cumEMF/WCE/R+P/cohort-lag specification.
    ambient, personal:
        Current-year external two-channel values.  They are retained as an
        instantaneous diagnostic under the χ(Ā) rule but do not change the
        memory-derived outcome by themselves.
    input_provenance:
        Optional source/transform record supplied by the caller.  It is
        copied into the result together with mandatory contract annotations.
    memory_definition:
        Human-readable description of the upstream lag/memory construction.

    Notes
    -----
    No call is made to ``ambient_annual``, ``personal_annual``, any v16 annual
    exposure function, ``TECH_DIFFUSION``, or ``calibrate_v16``.  This is a
    pure mapping once its inputs are supplied.
    """
    resolved_country = _country_label(country)
    resolved_year = _year_label(year)
    resolved_memory = _nonnegative_finite("memory_exposure", memory_exposure)
    resolved_ambient = _nonnegative_finite("ambient", ambient)
    resolved_personal = _nonnegative_finite("personal", personal)
    resolved_definition = _nonempty_text("memory_definition", memory_definition)

    selection_weight = lindgren_chi(resolved_ambient)
    selected_personal = selection_weight * resolved_personal
    instantaneous = resolved_ambient + selected_personal

    # These are the only retained v11/v12/v16 primitives.  Each consumes an
    # already supplied scalar or a static country nutrition lookup and has no
    # country-year exposure generator or global fitted-state dependency.
    base_bio_cap = v11_biological_capacity(resolved_memory)
    nutrition = v12_nutrition_modifier(resolved_country)
    bio_cap = base_bio_cap * nutrition
    behavioral = emf_behavioral_factor_v3(resolved_memory)
    bio_behavior = bio_cap * behavioral

    caller_provenance = _copy_provenance(input_provenance)
    provenance = {
        "temporal_core_version": TEMPORAL_CORE_VERSION,
        "outcome_structure": "bioCap(memory_exposure, nutrition) * behav(memory_exposure)",
        "memory_definition": resolved_definition,
        "selection_rule": "ambient + chi(ambient) * personal",
        "selection_rule_role": (
            "current-year diagnostic only; not added to memory_exposure to avoid double counting"
        ),
        "exposure_generation": "caller supplied; this core does not generate or interpolate annual exposure",
        "calibration": "none; no observed TFR, cultural rate, or global calibration is read",
        "retained_functions": (
            "v11_biological_capacity",
            "v12_nutrition_modifier",
            "emf_behavioral_factor_v3",
        ),
        "excluded_legacy_acute_subpaths": EXCLUDED_LEGACY_ACUTE_SUBPATHS,
    }

    return TemporalCoreResult(
        country=resolved_country,
        year=resolved_year,
        memory_exposure=resolved_memory,
        ambient=resolved_ambient,
        personal=resolved_personal,
        chi=selection_weight,
        selected_personal_exposure=selected_personal,
        instantaneous_selected_exposure=instantaneous,
        base_biological_capacity=base_bio_cap,
        nutrition_modifier=nutrition,
        bio_capacity=bio_cap,
        behavioral_factor=behavioral,
        bio_behavior=bio_behavior,
        input_provenance=caller_provenance,
        model_provenance=provenance,
        excluded_legacy_acute_subpaths=EXCLUDED_LEGACY_ACUTE_SUBPATHS,
    )


def response_from_external_exposure(
    memory_exposure: float,
    ambient: float,
    personal: float,
    country: str,
    year: int,
    *,
    input_provenance: Mapping[str, Any] | None = None,
    memory_definition: str = "externally supplied lag-weighted exposure",
) -> TemporalCoreResult:
    """Return the pure BERM response to caller-supplied external exposure.

    This positional ordering is intentionally suitable for temporal/backtest
    callers that first construct a memory state and then retain the current
    two-channel observation alongside it.  The returned dataclass exposes
    ``bio_capacity``, ``behavioral_factor``, and ``bio_behavior`` explicitly.
    It is a thin public contract over :func:`evaluate_temporal_core`; neither
    function calls legacy annual exposure generators or global calibration.
    """
    return evaluate_temporal_core(
        country,
        year,
        memory_exposure=memory_exposure,
        ambient=ambient,
        personal=personal,
        input_provenance=input_provenance,
        memory_definition=memory_definition,
    )


def _nonnegative_finite(name: str, value: float) -> float:
    """Validate a physical/memory magnitude without silently repairing it."""
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite non-negative number, not a boolean")
    try:
        resolved = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite non-negative number") from exc
    if not math.isfinite(resolved) or resolved < 0.0:
        raise ValueError(f"{name} must be a finite non-negative number")
    return resolved


def _country_label(country: str) -> str:
    if not isinstance(country, str) or not country.strip():
        raise ValueError("country must be a non-empty string")
    return country.strip()


def _year_label(year: int) -> int:
    if isinstance(year, bool):
        raise ValueError("year must be an integer, not a boolean")
    try:
        resolved = int(year)
    except (TypeError, ValueError) as exc:
        raise ValueError("year must be an integer") from exc
    if resolved != year:
        raise ValueError("year must be an integer")
    return resolved


def _nonempty_text(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


def _copy_provenance(provenance: Mapping[str, Any] | None) -> dict[str, Any]:
    """Copy a caller provenance mapping and attach input-contract facts."""
    if provenance is None:
        copied: dict[str, Any] = {}
    elif isinstance(provenance, Mapping):
        copied = deepcopy(dict(provenance))
    else:
        raise ValueError("input_provenance must be a mapping or None")

    # Reserve a non-overridable contract namespace.  Caller-source details
    # remain intact at the top level, while these facts make the data boundary
    # visible even when callers provide no metadata at all.
    copied["temporal_core_input_contract"] = {
        "memory_exposure": "externally supplied; no history reconstructed in this core",
        "ambient": "externally supplied current-year channel",
        "personal": "externally supplied current-year channel",
        "interpolation": "must be performed upstream and recorded by the caller",
    }
    return copied


__all__ = [
    "EXCLUDED_LEGACY_ACUTE_SUBPATHS",
    "TEMPORAL_CORE_VERSION",
    "TemporalCoreResult",
    "evaluate_temporal_core",
    "lindgren_chi",
    "response_from_external_exposure",
    "selected_two_channel_exposure",
]
