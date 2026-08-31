"""LH-Testosterone differential diagnostic for EMF vs EDC effects.

Based on Santi et al. 2025 (Endocrinology): simultaneous LH and T
decline indicates hypothalamic-level suppression (consistent with EMF
pathway), whereas T decline with LH elevation indicates testicular
damage (consistent with EDC/chemical pathway).

This diagnostic does NOT prove EMF causation — it distinguishes the
anatomical level of the endocrine disruption, which constrains the
set of plausible mechanisms.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class DisruptionLevel(Enum):
    """Anatomical level of endocrine disruption."""
    HYPOTHALAMIC = "hypothalamic"
    TESTICULAR = "testicular"
    MIXED = "mixed"
    INDETERMINATE = "indeterminate"


@dataclass(frozen=True)
class LHTDiagnostic:
    """Result of the LH-T differential diagnostic."""
    lh_trend: str
    t_trend: str
    level: DisruptionLevel
    interpretation: str
    berm_consistency: str
    reference: str


def classify_lh_t_pattern(
    lh_declining: bool,
    t_declining: bool,
) -> LHTDiagnostic:
    """Classify the pattern of LH and T changes.

    Parameters
    ----------
    lh_declining : bool
        Whether population LH is declining over time.
    t_declining : bool
        Whether population T is declining over time.

    Returns
    -------
    LHTDiagnostic
        Classification with interpretation.
    """
    ref = "Santi et al. 2025, Endocrinology"

    if t_declining and lh_declining:
        return LHTDiagnostic(
            lh_trend="declining",
            t_trend="declining",
            level=DisruptionLevel.HYPOTHALAMIC,
            interpretation=(
                "Simultaneous LH and T decline indicates suppression "
                "at or above the hypothalamus. The pituitary is not "
                "compensating for low T, ruling out primary testicular "
                "failure as the sole mechanism."
            ),
            berm_consistency=(
                "Consistent with EMF-mediated hypothalamic disruption "
                "(GnRH suppression via melatonin/cryptochrome pathway). "
                "This pattern is predicted by BERM but not proven by it."
            ),
            reference=ref,
        )

    if t_declining and not lh_declining:
        return LHTDiagnostic(
            lh_trend="stable_or_rising",
            t_trend="declining",
            level=DisruptionLevel.TESTICULAR,
            interpretation=(
                "T decline with stable or rising LH indicates primary "
                "testicular damage. The pituitary is appropriately "
                "compensating via increased LH secretion."
            ),
            berm_consistency=(
                "Consistent with EDC/chemical pathway (direct gonadal "
                "toxicity). This pattern does NOT support hypothalamic "
                "EMF disruption as the primary mechanism."
            ),
            reference=ref,
        )

    if not t_declining and lh_declining:
        return LHTDiagnostic(
            lh_trend="declining",
            t_trend="stable",
            level=DisruptionLevel.MIXED,
            interpretation=(
                "LH decline without T decline suggests early hypothalamic "
                "suppression that has not yet manifested as T deficiency, "
                "or compensatory testicular sensitivity."
            ),
            berm_consistency=(
                "Potentially early-stage hypothalamic effect. "
                "Longitudinal follow-up needed."
            ),
            reference=ref,
        )

    return LHTDiagnostic(
        lh_trend="stable",
        t_trend="stable",
        level=DisruptionLevel.INDETERMINATE,
        interpretation="No declining trends observed.",
        berm_consistency="No endocrine disruption signal to classify.",
        reference=ref,
    )


# Observed pattern from Santi et al. 2025 meta-analysis.
OBSERVED_PATTERN = classify_lh_t_pattern(
    lh_declining=True,
    t_declining=True,
)


def santi_2025_summary() -> dict:
    """Summary of the Santi 2025 LH-T diagnostic applied to secular trends."""
    obs = OBSERVED_PATTERN
    return {
        "observed_lh_trend": obs.lh_trend,
        "observed_t_trend": obs.t_trend,
        "diagnosed_level": obs.level.value,
        "interpretation": obs.interpretation,
        "berm_consistency": obs.berm_consistency,
        "reference": obs.reference,
        "key_finding": (
            "The simultaneous decline of both LH and T across populations "
            "is inconsistent with EDC-mediated testicular damage (which "
            "would elevate LH compensatorily) and instead points to "
            "hypothalamic-level suppression."
        ),
        "caveat": (
            "This is a population-level ecological inference from "
            "cross-study comparisons, not a controlled experiment. "
            "Individual-level LH-T dynamics may differ."
        ),
    }
