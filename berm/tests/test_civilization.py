"""Tests for berm.civilization package."""

from __future__ import annotations

import math

import numpy as np
import pytest


# -- solar_reconstruction --


class TestSolarReconstruction:
    def test_solar_activity_range(self):
        """Solar activity should always be in [0, 1]."""
        from berm.civilization.solar_reconstruction import solar_activity

        for year in range(800, 2050, 10):
            s = solar_activity(year)
            assert 0.0 <= s <= 1.0, f"solar_activity({year}) = {s}"

    def test_grand_minimum_suppression(self):
        """Activity during grand minima should be lower than normal."""
        from berm.civilization.solar_reconstruction import solar_activity

        maunder_center = (1645 + 1715) / 2
        normal_year = 1760  # well outside any minimum
        assert solar_activity(maunder_center) < solar_activity(normal_year)

    def test_is_grand_minimum(self):
        from berm.civilization.solar_reconstruction import is_grand_minimum

        assert is_grand_minimum(1680)  # Maunder
        assert is_grand_minimum(1500)  # Spoerer
        assert not is_grand_minimum(1900)  # no minimum

    def test_grand_minima_count(self):
        from berm.civilization.solar_reconstruction import GRAND_MINIMA

        assert len(GRAND_MINIMA) == 6

    def test_solar_activity_series(self):
        from berm.civilization.solar_reconstruction import solar_activity_series

        years, activity = solar_activity_series(1600, 1800, step=10.0)
        assert len(years) == len(activity)
        assert years[0] == 1600
        assert all(0.0 <= a <= 1.0 for a in activity)


# -- chi_map --


class TestChiMap:
    def test_chi_latitude_poles_highest(self):
        """Equatorial chi should be higher than polar chi."""
        from berm.civilization.chi_map import chi_latitude

        assert chi_latitude(60.0) > chi_latitude(0.0)
        assert chi_latitude(-60.0) > chi_latitude(0.0)
        assert chi_latitude(60.0) == chi_latitude(-60.0)

    def test_chi_latitude_range(self):
        from berm.civilization.chi_map import chi_latitude

        for lat in range(-90, 91, 10):
            c = chi_latitude(lat)
            assert 0.0 <= c <= 1.0, f"chi_latitude({lat}) = {c}"

    def test_chi_electrification_zero_before_onset(self):
        from berm.civilization.chi_map import chi_electrification

        assert chi_electrification(1800, "USA") == 0.0
        assert chi_electrification(1850, "Japan") == 0.0

    def test_chi_electrification_positive_after_onset(self):
        from berm.civilization.chi_map import chi_electrification

        assert chi_electrification(2000, "USA") > 0.0
        assert chi_electrification(2000, "Japan") > 0.0

    def test_chi_electrification_unknown_region(self):
        from berm.civilization.chi_map import chi_electrification

        with pytest.raises(KeyError):
            chi_electrification(2000, "Atlantis")

    def test_chi_total_additive(self):
        from berm.civilization.chi_map import (
            chi_electrification,
            chi_latitude,
            chi_total,
        )

        lat, year, region = 38.0, 2000, "USA"
        expected = chi_latitude(lat) + chi_electrification(year, region)
        assert chi_total(lat, year, region) == pytest.approx(expected)


# -- biocap --


class TestBioCap:
    def test_biocap_at_start(self):
        """BioCap at t_start should equal biocap0."""
        from berm.civilization.biocap import biocap

        assert biocap(1000.0, 45.0) == 1.0
        assert biocap(1000.0, 45.0, biocap0=0.8) == 0.8

    def test_biocap_before_start(self):
        from berm.civilization.biocap import biocap

        assert biocap(500.0, 45.0) == 1.0

    def test_biocap_bounded(self):
        """BioCap should stay in [0, biocap0]."""
        from berm.civilization.biocap import biocap

        for year in [1200, 1500, 1800, 2000]:
            bc = biocap(year, 45.0)
            assert 0.0 <= bc <= 1.0, f"biocap({year}, 45) = {bc}"

    def test_urbanization_proxy_monotonic(self):
        from berm.civilization.biocap import urbanization_proxy

        prev = urbanization_proxy(1800)
        for year in range(1850, 2050, 50):
            curr = urbanization_proxy(year)
            assert curr >= prev, f"urbanization not monotonic at {year}"
            prev = curr

    def test_sigma_zero_before_1880(self):
        from berm.civilization.biocap import sigma

        assert sigma(1800) == 0.0
        assert sigma(1000) == 0.0

    def test_sigma_high_by_2020(self):
        from berm.civilization.biocap import sigma

        assert sigma(2020) > 0.7

    def test_electrification_proxy_zero_before_1880(self):
        from berm.civilization.biocap import electrification_proxy

        assert electrification_proxy(1800) == 0.0

    def test_biocap_series_shape(self):
        from berm.civilization.biocap import biocap_series

        years, values = biocap_series(45.0, start=1000, end=2000, step=100)
        assert len(years) == len(values)
        assert len(years) == 10


# -- migration_gradient --


class TestMigrationGradient:
    def test_regions_complete(self):
        from berm.civilization.migration_gradient import REGIONS

        expected = {
            "Sub-Saharan Africa", "Middle East", "South Asia",
            "Latin America", "East Asia", "Western Europe",
            "USA", "Japan", "South Korea",
        }
        assert set(REGIONS.keys()) == expected

    def test_gradient_self_zero(self):
        """Gradient from a region to itself should be zero."""
        from berm.civilization.migration_gradient import biocap_gradient

        assert biocap_gradient("USA", "USA", 2000) == pytest.approx(0.0, abs=1e-10)

    def test_gradient_antisymmetric(self):
        """gradient(A->B) should be -gradient(B->A)."""
        from berm.civilization.migration_gradient import biocap_gradient

        g_ab = biocap_gradient("USA", "Japan", 2000)
        g_ba = biocap_gradient("Japan", "USA", 2000)
        assert g_ab == pytest.approx(-g_ba, abs=1e-10)

    def test_migration_pressure_bounded(self):
        from berm.civilization.migration_gradient import migration_pressure

        p = migration_pressure("Sub-Saharan Africa", "Western Europe", 2000)
        assert 0.0 <= p <= 1.0

    def test_gradient_matrix_shape(self):
        from berm.civilization.migration_gradient import REGIONS, gradient_matrix

        matrix = gradient_matrix(2000)
        n = len(REGIONS)
        assert len(matrix) == n
        for row in matrix.values():
            assert len(row) == n

    def test_unknown_region_raises(self):
        from berm.civilization.migration_gradient import biocap_gradient

        with pytest.raises(KeyError):
            biocap_gradient("Narnia", "USA", 2000)


# -- historical_test --


class TestHistoricalValidation:
    def test_renaissances_list(self):
        from berm.civilization.historical_test import RENAISSANCES

        assert len(RENAISSANCES) == 10
        for r in RENAISSANCES:
            assert r.peak_year > 900

    def test_empires_list(self):
        from berm.civilization.historical_test import EMPIRES

        assert len(EMPIRES) == 10
        for e in EMPIRES:
            assert e.end > e.start

    def test_renaissance_correlation_keys(self):
        from berm.civilization.historical_test import renaissance_solar_correlation

        result = renaissance_solar_correlation()
        assert "mean_distance_yr" in result
        assert "fraction_near_minimum" in result
        assert "n_renaissances" in result
        assert result["n_renaissances"] == 10

    def test_empire_solar_overlap_length(self):
        from berm.civilization.historical_test import empire_solar_overlap

        results = empire_solar_overlap()
        assert len(results) == 10
        for r in results:
            assert 0 <= r["minimum_fraction"] <= 1


# -- empire_lifespan --


class TestEmpireLifespan:
    def test_extended_empires_superset(self):
        from berm.civilization.empire_lifespan import EXTENDED_EMPIRES
        from berm.civilization.historical_test import EMPIRES

        extended_names = {e.name for e in EXTENDED_EMPIRES}
        base_names = {e.name for e in EMPIRES}
        assert base_names.issubset(extended_names)

    def test_distribution_keys(self):
        from berm.civilization.empire_lifespan import empire_lifespan_distribution

        stats = empire_lifespan_distribution()
        for key in ("mean", "median", "std", "min", "max", "n"):
            assert key in stats
        assert stats["n"] >= 10

    def test_distribution_values_sensible(self):
        from berm.civilization.empire_lifespan import empire_lifespan_distribution

        stats = empire_lifespan_distribution()
        assert stats["mean"] > 100  # empires last > 100yr on avg
        assert stats["min"] > 0
        assert stats["max"] > stats["min"]

    def test_suess_cycle_match_keys(self):
        from berm.civilization.empire_lifespan import suess_cycle_match

        result = suess_cycle_match()
        assert "suess_period" in result
        assert result["suess_period"] == pytest.approx(208.0)
        assert "rayleigh_r" in result
        assert 0.0 <= result["rayleigh_r"] <= 1.0

    def test_lifespans_sorted(self):
        from berm.civilization.empire_lifespan import empire_lifespans

        spans = empire_lifespans()
        lifetimes = [s[1] for s in spans]
        assert lifetimes == sorted(lifetimes, reverse=True)

    def test_histogram_bins(self):
        from berm.civilization.empire_lifespan import lifespan_histogram_bins

        edges, counts = lifespan_histogram_bins(bin_width=100)
        assert len(counts) == len(edges) - 1
        assert np.sum(counts) >= 10  # at least as many as EXTENDED_EMPIRES


# -- package init imports --


class TestPackageImports:
    def test_top_level_import(self):
        """All key symbols should be importable from the package."""
        from berm.civilization import (
            ALPHA,
            EMPIRES,
            EXTENDED_EMPIRES,
            GRAND_MINIMA,
            REGIONS,
            RENAISSANCES,
            biocap,
            biocap_gradient,
            chi_latitude,
            chi_total,
            empire_lifespan_distribution,
            is_grand_minimum,
            migration_pressure,
            renaissance_solar_correlation,
            solar_activity,
            suess_cycle_match,
        )
