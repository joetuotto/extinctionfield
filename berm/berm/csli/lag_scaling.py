"""Lag scaling law for cross-species sentinel timing.

The lag between an environmental insult and observable reproductive
decline depends on biological parameters: generation time and
spermatogenic cycle length. Shorter cycles → faster response.

This module is DIAGNOSTIC ONLY.
"""

from __future__ import annotations

from berm.csli.species_data import SPECIES_BIOLOGY_V2, SpeciesBiology


def expected_lag_days(species: SpeciesBiology) -> float | None:
    """Convert expected_lag_years to days, or None if not applicable."""
    if species.expected_lag_years is None:
        return None
    return species.expected_lag_years * 365.25


def lag_ratio(sentinel: str, target: str = "human_sperm") -> float | None:
    """Ratio of expected lags: sentinel / target.

    A ratio < 1 means the sentinel responds faster than the target.
    Returns None if either species has no expected lag.
    """
    s = SPECIES_BIOLOGY_V2.get(sentinel)
    t = SPECIES_BIOLOGY_V2.get(target)
    if s is None or t is None:
        return None
    if s.expected_lag_years is None or t.expected_lag_years is None:
        return None
    if t.expected_lag_years == 0:
        return None
    return s.expected_lag_years / t.expected_lag_years


def spermatogenic_cycle_ratio(species_a: str, species_b: str) -> float | None:
    """Ratio of spermatogenic cycle lengths between two species."""
    a = SPECIES_BIOLOGY_V2.get(species_a)
    b = SPECIES_BIOLOGY_V2.get(species_b)
    if a is None or b is None:
        return None
    if a.spermatogenic_cycle_days is None or b.spermatogenic_cycle_days is None:
        return None
    if b.spermatogenic_cycle_days == 0:
        return None
    return a.spermatogenic_cycle_days / b.spermatogenic_cycle_days


def print_lag_scaling() -> None:
    """Print lag scaling comparison table."""
    print("LAG SCALING LAW")
    print("=" * 70)
    print(
        f"{'Species':20s} {'Gen.time(d)':>12s} {'Sperm.cycle(d)':>15s} "
        f"{'Lag(yr)':>10s} {'Role':>20s}"
    )
    print("-" * 70)

    for key, sp in SPECIES_BIOLOGY_V2.items():
        gen = f"{sp.generation_time_days:.0f}"
        cyc = f"{sp.spermatogenic_cycle_days:.0f}" if sp.spermatogenic_cycle_days else "N/A"
        lag = f"{sp.expected_lag_years:.1f}" if sp.expected_lag_years else "N/A"
        print(f"  {sp.name[:18]:18s} {gen:>12s} {cyc:>15s} {lag:>10s} {sp.role:>20s}")

    print()
    dog_human = lag_ratio("dog", "human_sperm")
    if dog_human is not None:
        print(f"Dog/Human sperm lag ratio: {dog_human:.2f}")
        print(f"  → Dog expected to respond {1/dog_human:.1f}x slower than human sperm")

    dog_cycle = spermatogenic_cycle_ratio("dog", "human_sperm")
    if dog_cycle is not None:
        print(f"Dog/Human spermatogenic cycle ratio: {dog_cycle:.2f}")
