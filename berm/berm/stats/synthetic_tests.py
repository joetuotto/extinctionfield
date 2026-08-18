"""BERM v18 Phase 3: Synthetic falsification and simulation tests.

Tests whether BERM can distinguish real EMF signal from confounders.
Generates synthetic worlds with known causal structures and checks
whether BERM correctly identifies (or fails to identify) EMF effects.

Key tests:
  - S0: No EMF effect → BERM should NOT find one (false positive test)
  - S3: Cumulative EMF → BERM SHOULD find it (true positive test)
  - S5: Pure confounder → BERM should NOT find one (confounder test)
  - Placebo rollout: shuffled rollout years → model fit should degrade
  - Wrong lag: shifted exposure → optimal shift reveals true lag
"""

from __future__ import annotations

import math
import random
from dataclasses import dataclass, field


@dataclass
class SyntheticCountry:
    """A country in the synthetic world."""
    name: str
    rollout_year: int
    cultural_tfr: float
    initial_tfr: float
    emf: dict[int, float] = field(default_factory=dict)
    tfr: dict[int, float] = field(default_factory=dict)
    modernization: dict[int, float] = field(default_factory=dict)


@dataclass
class SyntheticWorld:
    """A synthetic world with known causal structure."""
    scenario: str
    description: str
    countries: list[SyntheticCountry]
    has_emf_effect: bool
    effect_type: str


def _seeded_normal(rng: random.Random, mu: float = 0.0,
                   sigma: float = 1.0) -> float:
    """Normal variate from seeded RNG (no numpy dependency)."""
    return rng.gauss(mu, sigma)


def _logistic(x: float) -> float:
    if x < -500:
        return 0.0
    if x > 500:
        return 1.0
    return 1.0 / (1.0 + math.exp(-x))


def generate_synthetic_world(
    scenario: str,
    n_countries: int = 25,
    n_years: int = 35,
    seed: int = 42,
) -> SyntheticWorld:
    """Generate a synthetic world with known causal structure.

    Scenarios:
      S0: No EMF effect (pure demographic trend)
      S1: Instantaneous EMF effect (no lag)
      S2: 3-year lagged EMF effect
      S3: 20-year cumulative EMF (≈ current BERM)
      S4: Puberty critical window (simplified)
      S5: Pure modernization confounder (no EMF at all)
      S6: EMF + modernization combined
    """
    rng = random.Random(seed)
    start_year = 1990
    end_year = start_year + n_years

    descriptions = {
        "S0": "No EMF effect (demographic baseline only)",
        "S1": "Instantaneous EMF effect (no lag)",
        "S2": "3-year lagged EMF effect",
        "S3": "20-year cumulative EMF (BERM structure)",
        "S4": "Puberty critical window",
        "S5": "Pure modernization confounder (no EMF)",
        "S6": "EMF + modernization combined",
    }

    has_emf = scenario not in ("S0", "S5")

    countries: list[SyntheticCountry] = []
    for i in range(n_countries):
        rollout = start_year + rng.randint(0, 14)
        cult_tfr = 1.5 + rng.uniform(-0.5, 2.0)
        init_tfr = cult_tfr + rng.uniform(1.0, 4.0)

        sc = SyntheticCountry(
            name=f"Country_{i:02d}",
            rollout_year=rollout,
            cultural_tfr=cult_tfr,
            initial_tfr=init_tfr,
        )

        for year in range(start_year, end_year):
            t_rollout = year - rollout
            if t_rollout < 0:
                emf = 0.1 * rng.uniform(0.8, 1.2)
            else:
                emf = 3.0 * _logistic(0.3 * (t_rollout - 10))
                emf *= rng.uniform(0.9, 1.1)
            sc.emf[year] = emf

            t = year - start_year
            sc.modernization[year] = (
                0.5 + 0.02 * t + _seeded_normal(rng, 0, 0.05)
            )

        for year in range(start_year, end_year):
            t = year - start_year
            demographic = cult_tfr + (init_tfr - cult_tfr) * math.exp(-0.03 * t)
            noise = _seeded_normal(rng, 0, 0.05)

            if scenario == "S0":
                tfr = demographic + noise

            elif scenario == "S1":
                emf_effect = -0.1 * sc.emf[year]
                tfr = demographic + emf_effect + noise

            elif scenario == "S2":
                lag_year = max(start_year, year - 3)
                emf_effect = -0.1 * sc.emf.get(lag_year, 0)
                tfr = demographic + emf_effect + noise

            elif scenario == "S3":
                cum_emf = sum(
                    sc.emf.get(y, 0) for y in range(start_year, year + 1)
                )
                emf_effect = -0.005 * cum_emf
                tfr = demographic + emf_effect + noise

            elif scenario == "S4":
                recent = sum(
                    sc.emf.get(y, 0)
                    for y in range(max(start_year, year - 20), year + 1)
                )
                emf_effect = -0.01 * recent
                tfr = demographic + emf_effect + noise

            elif scenario == "S5":
                conf_effect = -0.3 * sc.modernization[year]
                tfr = demographic + conf_effect + noise

            elif scenario == "S6":
                cum_emf = sum(
                    sc.emf.get(y, 0) for y in range(start_year, year + 1)
                )
                emf_effect = -0.003 * cum_emf
                conf_effect = -0.15 * sc.modernization[year]
                tfr = demographic + emf_effect + conf_effect + noise

            else:
                tfr = demographic + noise

            sc.tfr[year] = max(0.5, tfr)

        countries.append(sc)

    return SyntheticWorld(
        scenario=scenario,
        description=descriptions.get(scenario, scenario),
        countries=countries,
        has_emf_effect=has_emf,
        effect_type=scenario,
    )


# ─── Synthetic model fitting ───────────────────────────────────────

def _fit_null_to_synthetic(world: SyntheticWorld) -> float:
    """Fit null model (no EMF) to synthetic world, return RMSE."""
    last_year = max(max(c.tfr.keys()) for c in world.countries)
    errors = []

    for c in world.countries:
        cult_tfr = c.cultural_tfr
        init_tfr = c.initial_tfr
        t = last_year - 1990
        predicted = cult_tfr + (init_tfr - cult_tfr) * math.exp(-0.03 * t)
        observed = c.tfr.get(last_year, predicted)
        errors.append((predicted - observed) ** 2)

    return math.sqrt(sum(errors) / len(errors))


def _fit_berm_to_synthetic(world: SyntheticWorld) -> float:
    """Fit cumulative EMF model to synthetic world, return RMSE."""
    last_year = max(max(c.tfr.keys()) for c in world.countries)
    errors = []

    for c in world.countries:
        cult_tfr = c.cultural_tfr
        init_tfr = c.initial_tfr
        t = last_year - 1990
        demographic = cult_tfr + (init_tfr - cult_tfr) * math.exp(-0.03 * t)

        cum_emf = sum(c.emf.get(y, 0) for y in range(1990, last_year + 1))
        emf_effect = -0.005 * cum_emf
        predicted = demographic + emf_effect
        observed = c.tfr.get(last_year, predicted)
        errors.append((predicted - observed) ** 2)

    return math.sqrt(sum(errors) / len(errors))


# ─── Falsification battery ─────────────────────────────────────────

@dataclass
class FalsificationResult:
    """Result of one scenario in the falsification battery."""
    scenario: str
    description: str
    has_real_effect: bool
    berm_rmse: float
    null_rmse: float
    berm_wins: bool
    correct: bool


def run_falsification_battery() -> list[FalsificationResult]:
    """Run BERM against all 7 synthetic scenarios.

    Critical outcomes:
      S0: berm_wins should be False (no false positive)
      S3: berm_wins should be True (detects cumulative EMF)
      S5: berm_wins should be False (doesn't confuse confounder with EMF)
    """
    scenarios = ["S0", "S1", "S2", "S3", "S4", "S5", "S6"]
    results: list[FalsificationResult] = []

    for scenario in scenarios:
        world = generate_synthetic_world(scenario)
        berm_rmse = _fit_berm_to_synthetic(world)
        null_rmse = _fit_null_to_synthetic(world)

        berm_wins = berm_rmse < null_rmse * 0.95

        if scenario in ("S0", "S5"):
            correct = not berm_wins
        elif scenario in ("S1", "S2", "S3", "S4", "S6"):
            correct = berm_wins
        else:
            correct = True

        results.append(FalsificationResult(
            scenario=scenario,
            description=world.description,
            has_real_effect=world.has_emf_effect,
            berm_rmse=round(berm_rmse, 4),
            null_rmse=round(null_rmse, 4),
            berm_wins=berm_wins,
            correct=correct,
        ))

    return results


# ─── Placebo rollout test ───────────────────────────────────────────

@dataclass
class PlaceboResult:
    """Result of placebo rollout permutation test."""
    original_rmse: float
    n_permutations: int
    n_better: int
    p_value: float
    interpretation: str


def placebo_rollout_test(
    n_permutations: int = 200,
    seed: int = 42,
) -> PlaceboResult:
    """Shuffle rollout years across countries, test if BERM fit degrades.

    Uses the S3 synthetic world (known cumulative EMF effect).
    Shuffling rollout years should degrade the fit if BERM is
    actually identifying rollout timing, not just a time trend.
    """
    rng = random.Random(seed)
    world = generate_synthetic_world("S3")
    original_rmse = _fit_berm_to_synthetic(world)

    n_better = 0
    for _ in range(n_permutations):
        shuffled = generate_synthetic_world("S3", seed=rng.randint(0, 100000))
        rollout_years = [c.rollout_year for c in shuffled.countries]
        rng.shuffle(rollout_years)
        for c, ry in zip(shuffled.countries, rollout_years):
            c.rollout_year = ry
            for year in sorted(c.emf.keys()):
                t_rollout = year - ry
                if t_rollout < 0:
                    c.emf[year] = 0.1 * rng.uniform(0.8, 1.2)
                else:
                    c.emf[year] = (
                        3.0 * _logistic(0.3 * (t_rollout - 10))
                        * rng.uniform(0.9, 1.1)
                    )

        shuffled_rmse = _fit_berm_to_synthetic(shuffled)
        if shuffled_rmse < original_rmse:
            n_better += 1

    p_value = n_better / n_permutations

    if p_value > 0.05:
        interpretation = (
            f"p={p_value:.3f} > 0.05: BERM does NOT distinguish "
            "real rollout from random. This is a SERIOUS problem."
        )
    else:
        interpretation = (
            f"p={p_value:.3f} ≤ 0.05: BERM distinguishes real rollout "
            "timing from random shuffles."
        )

    return PlaceboResult(
        original_rmse=round(original_rmse, 4),
        n_permutations=n_permutations,
        n_better=n_better,
        p_value=round(p_value, 4),
        interpretation=interpretation,
    )


# ─── Wrong-lag test ─────────────────────────────────────────────────

@dataclass
class WrongLagResult:
    """Result of wrong-lag shift test."""
    shifts: list[int]
    rmses: list[float]
    best_shift: int
    best_rmse: float
    zero_rmse: float
    interpretation: str


def wrong_lag_test(
    shift_range: range | None = None,
    seed: int = 42,
) -> WrongLagResult:
    """Shift EMF exposure in time and measure fit quality.

    Uses S3 synthetic world. The true causal lag is 0 years
    (cumulative from the start). Shifting exposure forward (positive)
    means we're claiming the effect happens BEFORE exposure — if this
    improves the fit, there's a confounding pre-trend.
    """
    if shift_range is None:
        shift_range = range(-10, 16)

    world = generate_synthetic_world("S3", seed=seed)
    last_year = max(max(c.tfr.keys()) for c in world.countries)

    shifts: list[int] = []
    rmses: list[float] = []

    for shift in shift_range:
        errors = []
        for c in world.countries:
            cult_tfr = c.cultural_tfr
            init_tfr = c.initial_tfr
            t = last_year - 1990
            demographic = cult_tfr + (init_tfr - cult_tfr) * math.exp(-0.03 * t)

            cum_emf = sum(
                c.emf.get(y + shift, 0) for y in range(1990, last_year + 1)
            )
            emf_effect = -0.005 * cum_emf
            predicted = demographic + emf_effect
            observed = c.tfr.get(last_year, predicted)
            errors.append((predicted - observed) ** 2)

        rmse = math.sqrt(sum(errors) / len(errors))
        shifts.append(shift)
        rmses.append(round(rmse, 4))

    best_idx = rmses.index(min(rmses))
    best_shift = shifts[best_idx]
    best_rmse = rmses[best_idx]
    zero_idx = shifts.index(0) if 0 in shifts else 0
    zero_rmse = rmses[zero_idx]

    if best_shift == 0:
        interpretation = "Optimal shift is 0: current timing is correct."
    elif best_shift > 0:
        interpretation = (
            f"Optimal shift is +{best_shift}y: effect appears BEFORE exposure. "
            "This indicates a CONFOUNDING pre-trend."
        )
    else:
        interpretation = (
            f"Optimal shift is {best_shift}y: effect appears {-best_shift}y "
            "after exposure. Biologically plausible lag."
        )

    return WrongLagResult(
        shifts=shifts,
        rmses=rmses,
        best_shift=best_shift,
        best_rmse=best_rmse,
        zero_rmse=zero_rmse,
        interpretation=interpretation,
    )


# ─── Printing ───────────────────────────────────────────────────────

def print_falsification_battery(results: list[FalsificationResult]) -> None:
    """Print formatted falsification battery results."""
    print("FALSIFICATION BATTERY")
    print("=" * 70)
    print(f"{'Scenario':10s} {'Description':30s} {'BERM wins?':12s} "
          f"{'Correct?':10s} {'BERM':>8s} {'Null':>8s}")
    print("-" * 70)

    for r in results:
        wins = "Yes" if r.berm_wins else "No"
        correct = "PASS" if r.correct else "FAIL"
        print(f"  {r.scenario:8s} {r.description:30s} {wins:12s} "
              f"{correct:10s} {r.berm_rmse:8.4f} {r.null_rmse:8.4f}")

    n_pass = sum(1 for r in results if r.correct)
    print(f"\n  {n_pass}/{len(results)} tests passed")

    s0 = next((r for r in results if r.scenario == "S0"), None)
    if s0 and not s0.correct:
        print("  WARNING: S0 false positive — BERM finds effect where none exists")

    s5 = next((r for r in results if r.scenario == "S5"), None)
    if s5 and not s5.correct:
        print("  WARNING: S5 confounder confusion — BERM mistakes "
              "modernization for EMF")


def print_placebo_result(result: PlaceboResult) -> None:
    """Print formatted placebo rollout test result."""
    print("PLACEBO ROLLOUT TEST")
    print("=" * 50)
    print(f"  Original RMSE:       {result.original_rmse:.4f}")
    print(f"  Permutations:        {result.n_permutations}")
    print(f"  Better by chance:    {result.n_better}")
    print(f"  p-value:             {result.p_value:.4f}")
    print(f"  {result.interpretation}")


def print_wrong_lag_result(result: WrongLagResult) -> None:
    """Print formatted wrong-lag test result."""
    print("WRONG-LAG TEST")
    print("=" * 50)
    for shift, rmse in zip(result.shifts, result.rmses):
        marker = " ← best" if shift == result.best_shift else ""
        pre = "PRE " if shift > 0 else "POST" if shift < 0 else "NOW "
        bar_len = max(0, int((rmse - result.best_rmse) * 20))
        bar = "#" * min(bar_len, 30)
        print(f"  shift={shift:+3d} ({pre}) RMSE={rmse:.4f} {bar}{marker}")
    print(f"\n  Best shift: {result.best_shift}")
    print(f"  {result.interpretation}")
