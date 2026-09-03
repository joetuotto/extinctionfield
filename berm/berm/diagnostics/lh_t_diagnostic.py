"""LH-Testosterone differential diagnostic for EMF vs EDC effects.

Based on Santi et al. 2025 (J Endocrinol Invest, n=1,064,891, 1971-2024,
DOI 10.1007/s40618-025-02671-9): simultaneous LH and T decline indicates
hypothalamic-level suppression (consistent with the EMF pathway),
whereas T decline with LH elevation indicates testicular damage
(consistent with an EDC/chemical or cumulative-oxidative pathway).

WHICH GRADIENT IS BEING MEASURED MATTERS. The same (LH, T) pair means
different things depending on the axis along which it was observed, and
BERM predicts two different signatures at the same time:

    AGE gradient (older vs younger men in one cohort)
        T down, LH UP  -> testicular. Pathway A: cumulative VGCC/ROS
        damage to Leydig cells over a lifetime. EMAS (Wu et al. 2008,
        DOI 10.1210/jc.2007-1972) reports exactly this.

    SECULAR / COHORT trend (same age, later birth cohort)
        T down, LH DOWN -> hypothalamic. Pathway D (HPA -> GnRH
        suppression) and pathways B/C (cryptochrome -> melatonin ->
        GnRH). Santi et al. 2025 reports exactly this.

    OBESITY-MEDIATED (within-cohort, BMI-driven)
        T down, LH flat or down -> central, but via leptin/aromatase
        rather than the field. This is the competing explanation the
        secular signature must be separated from, which is why a
        BMI-independent secular decline is the discriminating result.

Reading a secular claim off an age gradient, or the reverse, inverts the
diagnosis. Callers should therefore state the gradient; ``classify_lh_t_pattern``
defaults to SECULAR for backwards compatibility.

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


class Gradient(Enum):
    """Which axis the LH/T change was measured along.

    SECULAR compares birth cohorts at the same age; AGE compares older
    with younger men inside one cohort; OBESITY_MEDIATED is a
    within-cohort contrast driven by body composition.
    """
    SECULAR = "secular"
    AGE = "age"
    OBESITY_MEDIATED = "obesity_mediated"


@dataclass(frozen=True)
class LHTDiagnostic:
    """Result of the LH-T differential diagnostic."""
    lh_trend: str
    t_trend: str
    level: DisruptionLevel
    interpretation: str
    berm_consistency: str
    reference: str
    gradient: Gradient = Gradient.SECULAR


def classify_lh_t_pattern(
    lh_declining: bool,
    t_declining: bool,
    gradient: Gradient = Gradient.SECULAR,
) -> LHTDiagnostic:
    """Classify the pattern of LH and T changes along a stated gradient.

    Parameters
    ----------
    lh_declining : bool
        Whether LH falls along the gradient.
    t_declining : bool
        Whether T falls along the gradient.
    gradient : Gradient
        Which axis was measured. Defaults to SECULAR, the axis Santi
        et al. 2025 analysed. Passing AGE changes the BERM reading of
        a rising LH from "does not support the model" to "the predicted
        testicular signature of pathway A" — see the module docstring.

    Returns
    -------
    LHTDiagnostic
        Classification with interpretation.
    """
    ref = "Santi et al. 2025, J Endocrinol Invest, DOI 10.1007/s40618-025-02671-9"

    if t_declining and lh_declining:
        if gradient is Gradient.OBESITY_MEDIATED:
            consistency = (
                "Central suppression, but body composition is the "
                "sufficient explanation here: leptin and aromatase act "
                "on the same axis. Only a BMI-independent version of "
                "this pattern discriminates the field pathway."
            )
        elif gradient is Gradient.AGE:
            consistency = (
                "Central suppression along the age axis. BERM expects "
                "the testicular signature on this axis, so a falling LH "
                "here points to a cohort effect contaminating the age "
                "gradient, or to secondary hypogonadism from comorbidity."
            )
        else:
            consistency = (
                "Consistent with EMF-mediated hypothalamic disruption "
                "(GnRH suppression via the melatonin/cryptochrome "
                "pathway and via HPA activation). This is the secular "
                "signature BERM predicts, and the one Santi et al. "
                "observed. Predicted by BERM, not proven by it."
            )
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
            berm_consistency=consistency,
            reference=ref,
            gradient=gradient,
        )

    if t_declining and not lh_declining:
        if gradient is Gradient.AGE:
            consistency = (
                "This is the age-gradient signature BERM predicts: "
                "cumulative VGCC/ROS damage to Leydig cells over a "
                "lifetime (pathway A), with the pituitary compensating. "
                "It does not count against the model, because BERM "
                "assigns the central signature to the secular axis and "
                "the testicular one to the age axis."
            )
        else:
            consistency = (
                "Consistent with an EDC/chemical pathway (direct gonadal "
                "toxicity) or with cumulative oxidative damage. On the "
                "secular axis this pattern does NOT support hypothalamic "
                "EMF disruption as the primary mechanism."
            )
        return LHTDiagnostic(
            lh_trend="stable_or_rising",
            t_trend="declining",
            level=DisruptionLevel.TESTICULAR,
            interpretation=(
                "T decline with stable or rising LH indicates primary "
                "testicular damage. The pituitary is appropriately "
                "compensating via increased LH secretion."
            ),
            berm_consistency=consistency,
            reference=ref,
            gradient=gradient,
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
            gradient=gradient,
        )

    return LHTDiagnostic(
        lh_trend="stable",
        t_trend="stable",
        level=DisruptionLevel.INDETERMINATE,
        interpretation="No declining trends observed.",
        berm_consistency="No endocrine disruption signal to classify.",
        reference=ref,
        gradient=gradient,
    )


# Observed pattern from Santi et al. 2025 meta-analysis (secular axis).
OBSERVED_PATTERN = classify_lh_t_pattern(
    lh_declining=True,
    t_declining=True,
    gradient=Gradient.SECULAR,
)

# Observed pattern from EMAS (Wu et al. 2008) along the age axis.
OBSERVED_AGE_PATTERN = classify_lh_t_pattern(
    lh_declining=False,
    t_declining=True,
    gradient=Gradient.AGE,
)


def two_signature_prediction() -> dict:
    """BERM's two-signature claim, stated so it can be falsified.

    The model assigns different anatomical levels to the two axes, so a
    single dataset carrying both age and birth-cohort variation should
    show both signatures at once.
    """
    return {
        "claim": (
            "In one dataset spanning several birth cohorts and a wide "
            "age range, the age gradient carries the testicular "
            "signature (T down, LH up) while the birth-cohort gradient "
            "carries the central signature (T down, LH down), and the "
            "cohort term survives adjustment for BMI and assay method."
        ),
        "age_axis": {
            "expected": "T down, LH up",
            "level": DisruptionLevel.TESTICULAR.value,
            "pathway": "A (VGCC/ROS, cumulative Leydig damage)",
            "observed_in": "EMAS, Wu et al. 2008, DOI 10.1210/jc.2007-1972",
        },
        "secular_axis": {
            "expected": "T down, LH down",
            "level": DisruptionLevel.HYPOTHALAMIC.value,
            "pathway": "D (HPA to GnRH), B/C (cryptochrome to melatonin to GnRH)",
            "observed_in": "Santi et al. 2025, DOI 10.1007/s40618-025-02671-9",
        },
        "falsification": (
            "The claim fails if the cohort term for LH is null or "
            "positive once BMI and assay method are adjusted, or if the "
            "age and cohort gradients carry the same gonadotropin "
            "signature."
        ),
        "competing_explanation": (
            "Obesity acts centrally too, so a BMI-independent cohort "
            "term is what separates the field pathway from body "
            "composition. Assay drift (immunoassay to LC-MS) must be "
            "adjusted for the same reason: Marriott et al. 2023 "
            "(DOI 10.7326/m23-0342) finds a near-zero age slope by mass "
            "spectrometry in healthy men, so assay method is collinear "
            "with calendar time."
        ),
    }


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
