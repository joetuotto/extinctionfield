"""Laboratory baseline bias diagnostic.

This module is DIAGNOSTIC ONLY — it does not affect TFR predictions.
It quantifies how ambient EMF in laboratories contaminates control
groups, biasing observed effect sizes toward null and predicting
the biological replication crisis as a structural consequence of BERM.

The core insight: if χ(Ā) governs biological sensitivity to EMF,
and laboratory EMF backgrounds have risen from ~0.1 V/m (1950s)
to ~15 V/m (2020s), then control groups in biological experiments
are not unexposed — they are chronically exposed at χ ≈ 1.0.
This compresses observed effect sizes because the control is already
"halfway through" the effect.
"""

import math
from typing import NamedTuple


def chi(a: float) -> float:
    """Lindgren selection rule: Ā / √(1 + Ā²)."""
    return a / math.sqrt(1 + a ** 2)


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


def control_chi(lab_emf: float) -> float:
    """χ(Ā_lab) — the control group's effective sensitivity level.

    When this approaches 1.0, the control is already near biological
    saturation and any additional EMF treatment produces a diminished
    observed effect.
    """
    return chi(lab_emf)


class BiasResult(NamedTuple):
    """Result of bias_toward_null calculation."""
    lab_emf: float
    chi_control: float
    observable_fraction: float
    bias_pct: float


def bias_toward_null(lab_emf: float, treatment_emf: float = 50.0) -> BiasResult:
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
    """
    chi_ctrl = chi(lab_emf)
    chi_treat = chi(treatment_emf)
    true_effect = chi_treat - chi(0.0)
    observed_effect = max(0.0, chi_treat - chi_ctrl)
    if true_effect > 0:
        observable = observed_effect / true_effect
    else:
        observable = 1.0
    return BiasResult(
        lab_emf=lab_emf,
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
    original_chi: float
    replication_chi: float
    effect_ratio: float
    expected_replication_rate: float


def replication_prediction(
    original_year: int,
    replication_year: int,
    treatment_emf: float = 50.0,
) -> ReplicationResult:
    """Predict how much a biological experiment's effect size shrinks on replication.

    If the same protocol is repeated years later in a lab with higher
    ambient EMF, the control group's χ rises, compressing the observable
    effect size.

    Parameters
    ----------
    original_year : Year the original study was conducted.
    replication_year : Year the replication is attempted.
    treatment_emf : EMF level of the experimental treatment (V/m).

    Returns
    -------
    ReplicationResult with the ratio of replication effect to original effect
    and estimated replication probability (sigmoid of effect ratio).
    """
    emf_orig = lab_emf_by_year(original_year)
    emf_rep = lab_emf_by_year(replication_year)
    chi_orig = chi(emf_orig)
    chi_rep = chi(emf_rep)
    chi_treat = chi(treatment_emf)

    obs_orig = max(1e-12, chi_treat - chi_orig)
    obs_rep = max(0.0, chi_treat - chi_rep)
    ratio = obs_rep / obs_orig

    rep_rate = 1.0 / (1.0 + math.exp(-10 * (ratio - 0.5)))

    return ReplicationResult(
        original_year=original_year,
        replication_year=replication_year,
        original_lab_emf=emf_orig,
        replication_lab_emf=emf_rep,
        original_chi=chi_orig,
        replication_chi=chi_rep,
        effect_ratio=ratio,
        expected_replication_rate=rep_rate,
    )


def decade_summary() -> list[dict]:
    """Summary table of lab EMF, χ, and bias for each decade since 1950."""
    rows = []
    for decade in range(1950, 2030, 10):
        emf = lab_emf_by_decade(decade)
        chi_val = chi(emf)
        bias = bias_toward_null(emf)
        rows.append({
            "decade": f"{decade}s",
            "lab_emf_vm": round(emf, 2),
            "chi_control": round(chi_val, 4),
            "bias_pct": round(bias.bias_pct, 1),
            "observable_fraction": round(bias.observable_fraction, 3),
        })
    return rows


def faraday_prediction() -> dict:
    """Quantitative prediction for the Faraday cage discriminative test.

    If a biological assay is run in parallel inside a Faraday-shielded
    incubator (< 0.01 V/m) and a standard lab incubator (~15 V/m in 2024),
    BERM predicts a specific effect-size ratio.
    """
    shielded_emf = 0.01
    standard_emf = lab_emf_by_year(2024)
    treatment_emf = 50.0

    chi_shielded = chi(shielded_emf)
    chi_standard = chi(standard_emf)
    chi_treat = chi(treatment_emf)

    effect_shielded = chi_treat - chi_shielded
    effect_standard = chi_treat - chi_standard

    return {
        "shielded_emf_vm": shielded_emf,
        "standard_emf_vm": standard_emf,
        "chi_shielded": round(chi_shielded, 6),
        "chi_standard": round(chi_standard, 4),
        "effect_shielded": round(effect_shielded, 4),
        "effect_standard": round(effect_standard, 4),
        "effect_ratio": round(effect_shielded / effect_standard, 2) if effect_standard > 0 else float("inf"),
        "prediction": (
            f"Faraday-shielded assay should show ~{effect_shielded / effect_standard:.0f}× "
            f"larger effect size than standard lab for EMF-sensitive endpoints"
        ),
    }
