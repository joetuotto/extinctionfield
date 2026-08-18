"""BERM v18 Phase 5: Rollout event study.

Uses 4G launch year variation across countries as a quasi-experiment.
Event time τ = calendar_year - T_4G(country).

BERM predicts: β_τ < 0 for τ > 0 (TFR drops AFTER 4G rollout)
               β_τ ≈ 0 for τ < 0 (no effect BEFORE rollout)

If pre-trend (β_{-5}...β_{-1} ≠ 0), the rollout isn't a clean shock.
"""

from __future__ import annotations

from dataclasses import dataclass

from berm.data.countries import TECH_DIFFUSION
from berm.data.loader import load_historical_tfr


ROLLOUT_4G: dict[str, int] = {
    c: td.year_4g for c, td in TECH_DIFFUSION.items()
}


def _get_tfr_series(country: str) -> dict[int, float]:
    """Get historical TFR time series for a country."""
    hist = load_historical_tfr(country)
    if hist:
        return {year: tfr for year, tfr in hist}
    return {}


@dataclass
class EventCoefficient:
    """One event-time coefficient."""
    tau: int
    n_obs: int
    mean_tfr_change: float
    se: float | None = None


@dataclass
class EventStudyResult:
    """Full event study result."""
    rollout_type: str
    coefficients: list[EventCoefficient]
    pre_trend_magnitude: float
    post_effect_magnitude: float
    pre_trend_ok: bool
    n_countries_used: int
    countries_used: list[str]
    interpretation: str


def event_study(
    rollout_type: str = "4G",
    event_window: range | None = None,
) -> EventStudyResult:
    """Staggered-rollout event study for TFR.

    For each country with available TFR history and a known rollout year,
    compute TFR change relative to the rollout year:
      ΔY(c, τ) = TFR(c, T_rollout + τ) - TFR(c, T_rollout)

    Then average across countries for each event time τ.
    """
    if event_window is None:
        event_window = range(-5, 11)

    rollout_years = ROLLOUT_4G

    countries_with_data: list[str] = []
    country_series: dict[str, dict[int, float]] = {}

    for country in rollout_years:
        series = _get_tfr_series(country)
        if len(series) >= 5:
            countries_with_data.append(country)
            country_series[country] = series

    coefficients: list[EventCoefficient] = []

    for tau in event_window:
        changes: list[float] = []
        for country in countries_with_data:
            t_rollout = rollout_years[country]
            series = country_series[country]

            tfr_at_rollout = series.get(t_rollout)
            tfr_at_event = series.get(t_rollout + tau)

            if tfr_at_rollout is not None and tfr_at_event is not None:
                change = tfr_at_event - tfr_at_rollout
                changes.append(change)

        if changes:
            mean_change = sum(changes) / len(changes)
            coefficients.append(EventCoefficient(
                tau=tau,
                n_obs=len(changes),
                mean_tfr_change=round(mean_change, 4),
            ))
        else:
            coefficients.append(EventCoefficient(
                tau=tau, n_obs=0, mean_tfr_change=0.0,
            ))

    pre_coeffs = [c for c in coefficients if -5 <= c.tau < 0 and c.n_obs > 0]
    post_coeffs = [c for c in coefficients if 0 < c.tau <= 5 and c.n_obs > 0]

    pre_magnitude = (
        sum(abs(c.mean_tfr_change) for c in pre_coeffs) / len(pre_coeffs)
        if pre_coeffs else 0.0
    )
    post_magnitude = (
        sum(c.mean_tfr_change for c in post_coeffs) / len(post_coeffs)
        if post_coeffs else 0.0
    )

    pre_trend_ok = pre_magnitude < abs(post_magnitude) * 0.5 if post_magnitude != 0 else True

    if not countries_with_data:
        interpretation = "No countries with sufficient historical TFR data."
    elif pre_trend_ok and post_magnitude < 0:
        interpretation = (
            f"Post-rollout TFR decline ({post_magnitude:+.3f}/yr avg) "
            f"with clean pre-trend (|pre|={pre_magnitude:.3f}). "
            "Consistent with a rollout effect."
        )
    elif not pre_trend_ok:
        interpretation = (
            f"Pre-trend magnitude ({pre_magnitude:.3f}) is ≥50% of "
            f"post-effect ({abs(post_magnitude):.3f}). "
            "TFR was already declining before rollout — confounded."
        )
    elif post_magnitude >= 0:
        interpretation = (
            f"No post-rollout TFR decline detected "
            f"(mean change = {post_magnitude:+.3f}). "
            "Rollout does not produce a measurable immediate effect."
        )
    else:
        interpretation = "Inconclusive."

    return EventStudyResult(
        rollout_type=rollout_type,
        coefficients=coefficients,
        pre_trend_magnitude=round(pre_magnitude, 4),
        post_effect_magnitude=round(post_magnitude, 4),
        pre_trend_ok=pre_trend_ok,
        n_countries_used=len(countries_with_data),
        countries_used=countries_with_data,
        interpretation=interpretation,
    )


def print_event_study(result: EventStudyResult) -> None:
    """Print formatted event study results."""
    print(f"EVENT STUDY: {result.rollout_type} rollout → TFR")
    print("=" * 55)
    print(f"  Countries used: {result.n_countries_used}")
    if result.countries_used:
        print(f"  ({', '.join(result.countries_used[:10])}"
              f"{'...' if len(result.countries_used) > 10 else ''})")
    print()

    for c in result.coefficients:
        if c.n_obs == 0:
            print(f"  τ={c.tau:+3d}  (no data)")
            continue
        pre = "PRE " if c.tau < 0 else ("POST" if c.tau > 0 else "AT  ")
        bar_len = int(abs(c.mean_tfr_change) * 50)
        bar_char = "-" if c.mean_tfr_change < 0 else "+"
        bar = bar_char * min(bar_len, 30)
        print(f"  τ={c.tau:+3d} ({pre}) Δ={c.mean_tfr_change:+.4f}  "
              f"n={c.n_obs:2d}  {bar}")

    print()
    print(f"  Pre-trend (|β|): {result.pre_trend_magnitude:.4f}")
    print(f"  Post-effect (β): {result.post_effect_magnitude:+.4f}")
    print(f"  Pre-trend OK:    {'Yes' if result.pre_trend_ok else 'NO'}")
    print()
    print(f"  {result.interpretation}")
