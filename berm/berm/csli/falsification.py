"""CSLI v2 falsification tests and exposure gradient analysis.

Six falsification criteria that must be met for the cross-species
sentinel framework to support BERM's EMF hypothesis. Each test
has explicit pass/fail conditions. Results are reported transparently
regardless of outcome.

This module is DIAGNOSTIC ONLY.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Literal

from berm.csli.species_data import (
    EXPOSURE_GRADIENT,
    LIVESTOCK_DATA,
    SPECIES_BIOLOGY_V2,
)


@dataclass(frozen=True)
class FalsificationTest:
    """One CSLI falsification criterion."""

    id: str
    description: str
    test: str
    pass_condition: str
    fail_condition: str
    data_required: str
    status: Literal["untested", "passed", "failed", "partial"]


CSLI_FALSIFICATIONS: dict[str, FalsificationTest] = {
    "F1_dog_human_lag": FalsificationTest(
        id="F1",
        description=(
            "Dog sperm change precedes human sperm change"
        ),
        test="DogSperm_{r,t} -> HumanSperm_{r,t+D1}",
        pass_condition="D1 > 0 and consistent across regions",
        fail_condition="D1 <= 0 or highly variable",
        data_required="Regional dog + human sperm time series",
        status="untested",
    ),
    "F2_dog_vs_social": FalsificationTest(
        id="F2",
        description=(
            "Dog sperm predicts human biology better than social variables"
        ),
        test="R2(DogSperm -> HumanSperm) > R2(GDP/education -> HumanSperm)",
        pass_condition="Biological sentinel outperforms social proxy",
        fail_condition="Social variables predict better",
        data_required="Matched regional dog sperm + human sperm + socioeconomic data",
        status="untested",
    ),
    "F3_bull_negative_control": FalsificationTest(
        id="F3",
        description=(
            "Bull does NOT show same decline pattern in low-exposure environment"
        ),
        test="BullSperm_{r,t} does NOT predict HumanSperm_{r,t+D}",
        pass_condition="Bull-human correlation not significant",
        fail_condition="Bull also predicts -> EMF is not the differentiating factor",
        data_required="Bull sperm time series + human sperm data",
        status="untested",
    ),
    "F4_exposure_gradient": FalsificationTest(
        id="F4",
        description=(
            "Response magnitude follows measured exposure gradient"
        ),
        test="|DDogSperm| > |DBullSperm| AND E_dog > E_bull (dosimetry)",
        pass_condition="Both exposure and response differences in correct direction",
        fail_condition="Exposure difference absent or response opposite",
        data_required="RF dosimetry for dog vs bull environments",
        status="untested",
    ),
    "F5_spatial_consistency": FalsificationTest(
        id="F5",
        description=(
            "Same lag structure replicates across countries"
        ),
        test="CV(D_r) < 0.3 across countries",
        pass_condition="Invariance strong",
        fail_condition="Lag varies randomly between countries",
        data_required="Multi-country dog sperm data (not yet available)",
        status="untested",
    ),
    "F6_chemical_discrimination": FalsificationTest(
        id="F6",
        description=(
            "EMF explains dog-human link better than chemicals"
        ),
        test="Control for PFAS/PCB/phthalates: EMF effect persists",
        pass_condition="EMF effect significant after chemical control",
        fail_condition="EMF effect disappears after chemical control",
        data_required="Matched chemical + EMF exposure data per region",
        status="untested",
    ),
}


def exposure_gradient_test() -> dict:
    """Test whether responses order by exposure level.

    BERM prediction:
      E_bull(rural) < E_bee(ambient) < E_dog(home) < E_human(personal)

    If response magnitude follows this gradient, it supports
    an exposure-response relationship.

    Returns dict with gradient data, monotonicity check, and
    qualitative assessment.
    """
    gradient = EXPOSURE_GRADIENT

    # Check: is the declining trend monotonic with exposure rank?
    # Positive trend_direction = improving, negative = declining
    directions = [(g.rank, g.trend_direction, g.species) for g in gradient]
    directions.sort(key=lambda x: x[0])

    monotonic = True
    for i in range(1, len(directions)):
        if directions[i][1] > directions[i - 1][1]:
            monotonic = False
            break

    # Bull (rank 1) improving, dog (rank 3) declining, human (rank 4) declining
    # = directionally consistent with gradient
    bull_improving = directions[0][1] > 0
    high_exposure_declining = all(d[1] < 0 for d in directions if d[0] >= 3)
    contrast_correct = bull_improving and high_exposure_declining

    return {
        "gradient": [
            {
                "species": g.species,
                "environment": g.environment,
                "rf_level": g.estimated_rf_level,
                "rank": g.rank,
                "trend": g.sperm_trend,
                "direction": g.trend_direction,
            }
            for g in gradient
        ],
        "monotonic": monotonic,
        "contrast_correct": contrast_correct,
        "assessment": (
            "Directionally consistent: low-exposure species (bull) improving "
            "while high-exposure species (dog, human) declining. "
            "However, bull improvement may reflect breeding selection pressure. "
            "RF dosimetry required to confirm exposure differential."
            if contrast_correct
            else "Gradient NOT monotonically consistent with exposure-response."
        ),
        "caveats": [
            "No measured RF dosimetry for any species environment",
            "Bull/boar improvement likely confounded by breeding selection",
            "Dog data from single population (Nottingham, Lea 2016)",
            "Bee decline has multiple strong confounders (pesticides, pathogens)",
        ],
    }


def print_falsification_status() -> None:
    """Print current status of all CSLI falsification tests."""
    print("CSLI v2 FALSIFICATION TESTS")
    print("=" * 70)

    for key, f in CSLI_FALSIFICATIONS.items():
        status_marker = {
            "untested": "[ ]",
            "passed": "[+]",
            "failed": "[-]",
            "partial": "[~]",
        }[f.status]
        print(f"  {status_marker} {f.id}: {f.description}")
        print(f"      Test: {f.test}")
        print(f"      Pass: {f.pass_condition}")
        print(f"      Fail: {f.fail_condition}")
        print(f"      Data: {f.data_required}")
        print()

    tested = sum(1 for f in CSLI_FALSIFICATIONS.values() if f.status != "untested")
    total = len(CSLI_FALSIFICATIONS)
    print(f"Status: {tested}/{total} tests executed")
    if tested == 0:
        print("All tests require regional data not yet available.")


def print_exposure_gradient() -> None:
    """Print exposure gradient analysis."""
    result = exposure_gradient_test()

    print("EXPOSURE GRADIENT TEST")
    print("=" * 70)
    print(f"{'Species':10s} {'Environment':35s} {'RF Level':12s} {'Trend':>10s}")
    print("-" * 70)

    for g in result["gradient"]:
        direction = {1: "UP", -1: "DOWN", 0: "STABLE"}[g["direction"]]
        print(f"  {g['species']:8s} {g['environment']:35s} {g['rf_level']:12s} {direction:>8s}")

    print()
    print(f"Monotonic with exposure: {'YES' if result['monotonic'] else 'NO'}")
    print(f"Low-high contrast correct: {'YES' if result['contrast_correct'] else 'NO'}")
    print()
    print(f"Assessment: {result['assessment']}")
    print()
    print("Caveats:")
    for c in result["caveats"]:
        print(f"  - {c}")
