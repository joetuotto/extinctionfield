"""Tests for the chronic disease cascade diagnostic module."""

from berm.diagnostics.disease_cascade import (
    disease_cascade_diagnostic,
    estimate_channel_exposure,
    DISEASE_PARAMS,
)


def test_cascade_order_is_consistent():
    """Cascade order is preserved for all countries and years."""
    for country in ["Finland", "SouthKorea", "USA", "Nigeria"]:
        for year in [2000, 2010, 2020, 2024]:
            results = disease_cascade_diagnostic(country, year)
            orders = [r.cascade_order for r in results]
            assert orders == sorted(orders), (
                f"Cascade order broken: {country} {year}"
            )


def test_if_channel_dominates_fertility():
    """Fertility's primary channel is IF."""
    results = disease_cascade_diagnostic("Finland", 2024)
    fertility = next(r for r in results if r.disease_id == "fertility")
    assert fertility.channel_primary == "if_field"


def test_covid_if_drop():
    """COVID lockdown reduces IF channel."""
    pre = estimate_channel_exposure("Finland", 2019)
    during = estimate_channel_exposure("Finland", 2020)
    assert during.if_field < pre.if_field * 0.5, (
        "COVID IF drop insufficient"
    )


def test_covid_rf_rise():
    """COVID lockdown increases RF channel."""
    pre = estimate_channel_exposure("Finland", 2019)
    during = estimate_channel_exposure("Finland", 2020)
    assert during.rf > pre.rf, "COVID RF rise missing"


def test_all_diseases_have_fda_validation():
    """Every disease has an FDA-validating device."""
    for disease_id, params in DISEASE_PARAMS.items():
        assert params["fda_device"], f"{disease_id}: FDA validation missing"


def test_seven_diseases():
    """There are exactly 7 diseases in the cascade."""
    results = disease_cascade_diagnostic("Finland", 2024)
    assert len(results) == 7


def test_total_exposure_increases_over_time():
    """Total exposure in 2024 > 2000 > 1980."""
    e1980 = estimate_channel_exposure("Finland", 1980)
    e2000 = estimate_channel_exposure("Finland", 2000)
    e2024 = estimate_channel_exposure("Finland", 2024)
    assert e2024.total > e2000.total > e1980.total
