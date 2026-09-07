"""Tests for the dual-kernel (DKC) diagnostics module.

These lock the arithmetic and the identification verdict that the model page
and the evidence page quote. If a fitted number here changes, the site copy
is stale and must move with it.
"""

from __future__ import annotations

import math

import pytest

from berm.diagnostics import covid_lockdown, dual_kernel as dk


# === kernel normalisation ===


def test_kernel_weights_sum_to_one() -> None:
    for tau in (0.5, 1.0, 1.5, 12.0):
        total = sum(dk.kernel_weight(lag, tau) for lag in range(0, 400))
        assert total == pytest.approx(1.0, abs=1e-9)


def test_kernel_mean_lag_equals_tau() -> None:
    """Mean lag of the normalised discrete exponential is r/(1-r) ~ tau - 0.5."""
    for tau in (1.0, 4.0, 12.0):
        mean_lag = sum(lag * dk.kernel_weight(lag, tau) for lag in range(0, 800))
        r = math.exp(-1.0 / tau)
        assert mean_lag == pytest.approx(r / (1.0 - r), rel=1e-6)


def test_kernel_weight_rejects_non_positive_tau() -> None:
    with pytest.raises(ValueError):
        dk.kernel_weight(0, 0.0)


def test_dual_kernel_response_splits_and_sums() -> None:
    response = dk.dual_kernel_response("SouthKorea", 2024, alpha=0.7, beta=0.3)
    assert response.total == pytest.approx(response.behavioral + response.biological)
    assert 0.0 < response.biological_share < 1.0


def test_dual_kernel_normalization_and_time_order_are_protected() -> None:
    implicit = dk.dual_kernel_response("SouthKorea", 2024, alpha=0.7)
    explicit = dk.dual_kernel_response(
        "SouthKorea",
        2024,
        alpha=0.7,
        beta=0.3,
    )
    assert implicit == explicit
    with pytest.raises(ValueError, match="1-alpha"):
        dk.dual_kernel_response("SouthKorea", 2024, alpha=0.7, beta=0.4)
    with pytest.raises(ValueError, match="greater"):
        dk.dual_kernel_response("SouthKorea", 2024, tau_b=12.0, tau_r=1.0)


# === recovery window ===


def test_recovery_repair_matches_covid_lockdown_module() -> None:
    """Both modules must report the same repair arithmetic."""
    assert dk.REPAIR_HALF_LIFE_HOURS == covid_lockdown._REPAIR_HALF_LIFE
    for free_hours in (2.0, 6.0, 8.0, 23.5):
        expected = covid_lockdown._repair_fraction(free_hours)
        got = 1.0 - math.exp(-free_hours / (dk.REPAIR_HALF_LIFE_HOURS / math.log(2)))
        assert got == pytest.approx(expected, abs=1e-12)


def test_published_repair_fractions() -> None:
    """The figures quoted on the model page, to the precision shown there."""
    tau = dk.REPAIR_HALF_LIFE_HOURS / math.log(2)

    def repaired(hours: float) -> float:
        return 1.0 - math.exp(-hours / tau)

    assert round(repaired(23.5) * 100) == 93  # not 97: same tau that gives 21%
    assert round(repaired(8.0) * 100) == 60
    assert round(repaired(2.0) * 100) == 21


def test_recovery_ratio_falls_with_diffusion() -> None:
    ratios = [dk.recovery_ratio("SouthKorea", y) for y in (1995, 2007, 2015, 2024)]
    assert ratios == sorted(ratios, reverse=True)
    assert ratios[0] == pytest.approx(1.0, abs=1e-3)
    assert ratios[-1] < 0.15


def test_phase_transition_years_quoted_on_the_model_page() -> None:
    def crossing(country: str) -> int | None:
        for year in range(1990, 2031):
            if (
                dk.recovery_state(country, year).recovery_ratio
                < dk.RECOVERY_RATIO_CRITICAL
            ):
                return year
        return None

    assert crossing("SouthKorea") == 2018
    assert crossing("USA") == 2020
    assert crossing("Finland") == 2022
    assert crossing("Japan") == 2023
    assert crossing("India") is None
    assert crossing("Nigeria") is None


def test_recovery_state_accumulating_flag_tracks_the_threshold() -> None:
    early = dk.recovery_state("SouthKorea", 2005)
    late = dk.recovery_state("SouthKorea", 2024)
    assert not early.accumulating
    assert late.accumulating
    assert late.net_daily_damage > early.net_daily_damage


# === spectral complexity ===


def test_spectral_complexity_is_shannon_form_and_monotone() -> None:
    values = [dk.spectral_complexity("SouthKorea", y) for y in (1995, 2005, 2015, 2025)]
    assert values == sorted(values)
    assert values[0] == pytest.approx(math.log2(1 + 2.0), abs=0.05)  # broadcast + 2G
    assert values[-1] == pytest.approx(3.99, abs=0.02)


def test_spectral_complexity_unknown_country_falls_back_to_broadcast() -> None:
    assert dk.spectral_complexity("Atlantis", 2024) == pytest.approx(1.0)


# === density x technology ===


def test_density_tech_orders_the_dense_high_technology_states_first() -> None:
    ranked = sorted(
        ("Singapore", "SouthKorea", "Japan", "USA", "Finland", "Australia"),
        key=lambda c: -dk.density_tech_interaction(c, 2024),
    )
    assert ranked[0] == "Singapore"
    assert ranked[1] == "SouthKorea"
    assert ranked[-1] == "Australia"


def test_density_tech_refuses_the_silent_population_density_fallback() -> None:
    """get_country_params returns 50/km2 for unknown countries; that would put
    Hong Kong two orders of magnitude low, so the function must refuse."""
    with pytest.raises(KeyError):
        dk.density_tech_interaction("HongKong", 2024)


# === identification ===


@pytest.mark.slow
def test_dual_kernel_is_not_separable_on_the_fertility_panel() -> None:
    """The verdict the model page reports: the slow kernel is not identified."""
    results = dk.dual_kernel_identifiability()
    assert len(results) == 3
    for (tau_b, tau_r), record in results.items():
        assert record["kernel_correlation"] > 0.98, (tau_b, tau_r)
        assert record["constrained_slow_weight"] == 0.0
        assert record["separable"] is False
        # the unconstrained fit only gains by opposing the two signs
        assert record["unconstrained_alpha"] > 0 > record["unconstrained_beta"]


@pytest.mark.slow
def test_age_resolved_fast_kernel_and_declining_slope() -> None:
    """Fast kernel at ages 15-29; suppression falls with age and flips after 35."""
    fits = dk.fit_age_resolved_kernels()
    for age in ("15-19", "20-24", "25-29"):
        assert fits[age]["tau"] == pytest.approx(1.0)
        assert max(fits[age]["tau_within_2_bic"]) <= 2.0

    slopes = [
        fits[a]["slope"] for a in ("15-19", "20-24", "25-29", "30-34", "35-39", "40-44")
    ]
    assert slopes == sorted(slopes, reverse=True)
    assert slopes[0] > 0.25
    assert slopes[4] < 0  # 35-39 sign flip
    for age, expected in dk.AGE_KERNEL_SLOPES.items():
        assert fits[age]["slope"] == pytest.approx(expected, abs=5e-4)
