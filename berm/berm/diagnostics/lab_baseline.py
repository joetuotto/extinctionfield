"""Laboratory baseline bias diagnostic.

This module is DIAGNOSTIC ONLY — it does not affect TFR predictions.  It
evaluates a conditional BERM scenario in which rising ambient laboratory
backgrounds could compress exposed-versus-control contrasts.  It does not
establish that laboratory controls are biologically exposed or explain the
replication crisis.

The reduced geometric coefficient ``χ_geo(Ā)``, exposed here as ``χ(Ā)``,
has L1 status only under the explicit dimensionless, collinear, spacelike
scalar reduction.  A raw electric-field measurement in V/m is not Ā.  Every
V/m-facing calculation in this module therefore requires the caller to
declare a positive normalization scale in V/m and records both that scale and
the resulting dimensionless coordinate.  Choosing that scale, identifying
the coordinate with a concrete field or membrane proxy, and mapping it to an
observable response remain open L0→L2 steps.  Any biological
interpretation is L3 and componentwise.
"""

import math
from typing import NamedTuple


def _nonnegative_finite(name: str, value: float) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite non-negative number")
    try:
        resolved = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite non-negative number") from exc
    if not math.isfinite(resolved) or resolved < 0.0:
        raise ValueError(f"{name} must be a finite non-negative number")
    return resolved


def _positive_finite(name: str, value: float) -> float:
    resolved = _nonnegative_finite(name, value)
    if resolved == 0.0:
        raise ValueError(f"{name} must be a finite positive number")
    return resolved


def chi(a_bar: float) -> float:
    """L1: χ(Ā) = Ā/√(1+Ā²). Johdettu tilavuuselementin linearisaatiosta."""
    coordinate = _nonnegative_finite("a_bar", a_bar)
    return coordinate / math.hypot(1.0, coordinate)


def normalize_field_strength(
    field_v_m: float,
    *,
    normalization_scale_v_m: float,
) -> float:
    """Return the declared dimensionless coordinate ``Ā = E / E_ref``.

    This is an explicit unit conversion only.  It does not calibrate
    ``E_ref`` or identify the result with a membrane or biological response.
    """
    field = _nonnegative_finite("field_v_m", field_v_m)
    scale = _positive_finite("normalization_scale_v_m", normalization_scale_v_m)
    return field / scale


# Estimated laboratory ambient EMF (V/m RMS broadband) by decade midpoint.
# Sources: Mild (1980) survey of Swedish labs, Martínez-Búrdalo (2009)
# hospital/lab survey, Sagar (2018) indoor urban measurements,
# WHO technical reports on occupational exposure.
_LAB_EMF_KNOTS: list[tuple[int, float]] = [
    (1950, 0.08),
    (1960, 0.15),
    (1970, 0.40),
    (1980, 0.90),
    (1990, 2.50),
    (2000, 5.00),
    (2005, 8.00),
    (2010, 10.0),
    (2015, 12.0),
    (2020, 15.0),
    (2025, 18.0),
]


def lab_emf_by_year(year: int) -> float:
    """Estimated broadband EMF background in a typical research lab (V/m).

    Uses piecewise-linear interpolation between decade knots.
    Before 1950 returns the 1950 value; after 2025 returns the 2025 value.
    """
    if year <= _LAB_EMF_KNOTS[0][0]:
        return _LAB_EMF_KNOTS[0][1]
    if year >= _LAB_EMF_KNOTS[-1][0]:
        return _LAB_EMF_KNOTS[-1][1]
    for i in range(len(_LAB_EMF_KNOTS) - 1):
        y0, v0 = _LAB_EMF_KNOTS[i]
        y1, v1 = _LAB_EMF_KNOTS[i + 1]
        if y0 <= year <= y1:
            frac = (year - y0) / (y1 - y0)
            return v0 + frac * (v1 - v0)
    return _LAB_EMF_KNOTS[-1][1]


def lab_emf_by_decade(decade: int) -> float:
    """Convenience: lab EMF at the midpoint of a decade (e.g. 1980 → 1985)."""
    return lab_emf_by_year(decade + 5)


def control_chi(
    lab_emf: float,
    *,
    normalization_scale_v_m: float,
) -> float:
    """Evaluate χ for a lab field using a caller-declared V/m scale.

    The returned number is the L1 reduced ``χ_geo`` coefficient for the
    resulting dimensionless coordinate, not a measured biological
    sensitivity.
    """
    coordinate = normalize_field_strength(
        lab_emf,
        normalization_scale_v_m=normalization_scale_v_m,
    )
    return chi(coordinate)


class BiasResult(NamedTuple):
    """Result of bias_toward_null calculation."""

    lab_emf: float
    treatment_emf: float
    normalization_scale_v_m: float
    normalized_lab_coordinate: float
    normalized_treatment_coordinate: float
    chi_control: float
    observable_fraction: float
    bias_pct: float


def bias_toward_null(
    lab_emf: float,
    treatment_emf: float = 50.0,
    *,
    normalization_scale_v_m: float,
) -> BiasResult:
    """How much the observed effect size underestimates the true effect.

    If the true biological response follows χ(Ā), and the control group
    sits at χ(Ā_lab) instead of χ(0) = 0, then:

      true_effect   = χ(treatment) - χ(0) = χ(treatment)
      observed_effect = χ(treatment) - χ(lab)

    The observable fraction is observed/true; the bias percentage is
    how much of the true effect is hidden.

    Parameters
    ----------
    lab_emf : Ambient EMF in the laboratory (V/m).
    treatment_emf : EMF level of the experimental treatment (V/m).
    normalization_scale_v_m : Positive ``E_ref`` in the same V/m units.
    """
    scale = _positive_finite("normalization_scale_v_m", normalization_scale_v_m)
    resolved_lab_emf = _nonnegative_finite("lab_emf", lab_emf)
    resolved_treatment_emf = _nonnegative_finite("treatment_emf", treatment_emf)
    normalized_lab = normalize_field_strength(
        resolved_lab_emf,
        normalization_scale_v_m=scale,
    )
    normalized_treatment = normalize_field_strength(
        resolved_treatment_emf,
        normalization_scale_v_m=scale,
    )
    chi_ctrl = chi(normalized_lab)
    chi_treat = chi(normalized_treatment)
    true_effect = chi_treat - chi(0.0)
    observed_effect = max(0.0, chi_treat - chi_ctrl)
    if true_effect > 0:
        observable = observed_effect / true_effect
    else:
        observable = 1.0
    return BiasResult(
        lab_emf=resolved_lab_emf,
        treatment_emf=resolved_treatment_emf,
        normalization_scale_v_m=scale,
        normalized_lab_coordinate=normalized_lab,
        normalized_treatment_coordinate=normalized_treatment,
        chi_control=chi_ctrl,
        observable_fraction=observable,
        bias_pct=(1.0 - observable) * 100,
    )


class ReplicationResult(NamedTuple):
    """Result of replication_prediction calculation."""

    original_year: int
    replication_year: int
    original_lab_emf: float
    replication_lab_emf: float
    treatment_emf: float
    normalization_scale_v_m: float
    normalized_original_coordinate: float
    normalized_replication_coordinate: float
    normalized_treatment_coordinate: float
    original_chi: float
    replication_chi: float
    effect_ratio: float
    expected_replication_rate: float


def replication_prediction(
    original_year: int,
    replication_year: int,
    treatment_emf: float = 50.0,
    *,
    normalization_scale_v_m: float,
) -> ReplicationResult:
    """Predict how much a biological experiment's effect size shrinks on replication.

    Under the archived v17 background-dependent closure, repeating the same
    protocol years later in a lab with higher ambient EMF raises the closure's
    legacy χ proxy and compresses the observable effect size.  This is a BERM
    model prediction, not a biological susceptibility derived from χ_geo.

    Parameters
    ----------
    original_year : Year the original study was conducted.
    replication_year : Year the replication is attempted.
    treatment_emf : EMF level of the experimental treatment (V/m).
    normalization_scale_v_m : Positive ``E_ref`` in the same V/m units.

    Returns
    -------
    ReplicationResult with the ratio of replication effect to original effect
    and estimated replication probability (sigmoid of effect ratio).
    """
    scale = _positive_finite("normalization_scale_v_m", normalization_scale_v_m)
    resolved_treatment_emf = _nonnegative_finite("treatment_emf", treatment_emf)
    emf_orig = lab_emf_by_year(original_year)
    emf_rep = lab_emf_by_year(replication_year)
    normalized_orig = normalize_field_strength(
        emf_orig,
        normalization_scale_v_m=scale,
    )
    normalized_rep = normalize_field_strength(
        emf_rep,
        normalization_scale_v_m=scale,
    )
    normalized_treatment = normalize_field_strength(
        resolved_treatment_emf,
        normalization_scale_v_m=scale,
    )
    chi_orig = chi(normalized_orig)
    chi_rep = chi(normalized_rep)
    chi_treat = chi(normalized_treatment)

    obs_orig = max(1e-12, chi_treat - chi_orig)
    obs_rep = max(0.0, chi_treat - chi_rep)
    ratio = obs_rep / obs_orig

    rep_rate = 1.0 / (1.0 + math.exp(-10 * (ratio - 0.5)))

    return ReplicationResult(
        original_year=original_year,
        replication_year=replication_year,
        original_lab_emf=emf_orig,
        replication_lab_emf=emf_rep,
        treatment_emf=resolved_treatment_emf,
        normalization_scale_v_m=scale,
        normalized_original_coordinate=normalized_orig,
        normalized_replication_coordinate=normalized_rep,
        normalized_treatment_coordinate=normalized_treatment,
        original_chi=chi_orig,
        replication_chi=chi_rep,
        effect_ratio=ratio,
        expected_replication_rate=rep_rate,
    )


def decade_summary(
    *,
    normalization_scale_v_m: float,
    treatment_emf: float = 50.0,
) -> list[dict]:
    """Return a conditional summary under one declared normalization scale."""
    scale = _positive_finite("normalization_scale_v_m", normalization_scale_v_m)
    rows = []
    for decade in range(1950, 2030, 10):
        emf = lab_emf_by_decade(decade)
        normalized_lab = normalize_field_strength(
            emf,
            normalization_scale_v_m=scale,
        )
        chi_val = chi(normalized_lab)
        bias = bias_toward_null(
            emf,
            treatment_emf,
            normalization_scale_v_m=scale,
        )
        rows.append({
            "decade": f"{decade}s",
            "lab_emf_vm": round(emf, 2),
            "normalization_scale_v_m": scale,
            "normalized_lab_coordinate": round(normalized_lab, 6),
            "chi_control": round(chi_val, 4),
            "bias_pct": round(bias.bias_pct, 1),
            "observable_fraction": round(bias.observable_fraction, 3),
        })
    return rows


def faraday_prediction(
    *,
    normalization_scale_v_m: float,
    treatment_emf: float = 50.0,
) -> dict:
    """Conditional Faraday-cage contrast under a declared normalization.

    If a biological assay is run in parallel inside a Faraday-shielded
    incubator (< 0.01 V/m) and a standard lab incubator, this diagnostic
    reports the contrast implied by the supplied scale.  The L2 response
    identification remains open; this is not a locked biological prediction.
    """
    scale = _positive_finite("normalization_scale_v_m", normalization_scale_v_m)
    shielded_emf = 0.01
    standard_emf = lab_emf_by_year(2024)
    resolved_treatment_emf = _nonnegative_finite("treatment_emf", treatment_emf)

    normalized_shielded = normalize_field_strength(
        shielded_emf,
        normalization_scale_v_m=scale,
    )
    normalized_standard = normalize_field_strength(
        standard_emf,
        normalization_scale_v_m=scale,
    )
    normalized_treatment = normalize_field_strength(
        resolved_treatment_emf,
        normalization_scale_v_m=scale,
    )
    chi_shielded = chi(normalized_shielded)
    chi_standard = chi(normalized_standard)
    chi_treat = chi(normalized_treatment)

    effect_shielded = chi_treat - chi_shielded
    effect_standard = chi_treat - chi_standard
    effect_ratio = (
        effect_shielded / effect_standard
        if effect_standard > 0
        else float("inf")
    )

    return {
        "shielded_emf_vm": shielded_emf,
        "standard_emf_vm": standard_emf,
        "treatment_emf_vm": resolved_treatment_emf,
        "normalization_scale_v_m": scale,
        "normalized_shielded_coordinate": normalized_shielded,
        "normalized_standard_coordinate": normalized_standard,
        "normalized_treatment_coordinate": normalized_treatment,
        "chi_shielded": round(chi_shielded, 6),
        "chi_standard": round(chi_standard, 4),
        "effect_shielded": round(effect_shielded, 4),
        "effect_standard": round(effect_standard, 4),
        "effect_ratio": round(effect_ratio, 2),
        "prediction": (
            "Conditional candidate-adapter contrast under "
            f"E_ref={scale:g} V/m: shielded/standard effect ratio "
            f"~{effect_ratio:.0f}×"
        ),
    }
