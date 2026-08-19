"""Fail-closed tests for CSLI's measured exposure-gradient requirement."""

from __future__ import annotations

import berm.csli as csli
from berm.csli.falsification import exposure_gradient_test, print_exposure_gradient
from berm.csli.species_data import DOG_ENDPOINTS, LIVESTOCK_DATA


def test_exposure_gradient_is_blocked_without_dosimetry_or_matched_panel():
    result = exposure_gradient_test()

    assert result["status"] == "BLOCKED"
    assert result["analysis"] == "measured_exposure_gradient"
    assert result["not_estimable"] is True
    assert {reason["code"] for reason in result["reasons"]} >= {
        "RF_DOSIMETRY_ABSENT",
        "COMPARABLE_RESPONSE_PANEL_ABSENT",
        "CONFOUNDER_COVERAGE_INCOMPLETE",
        "QUALITATIVE_RANKS_RETIRED",
    }


def test_exposure_gradient_api_cannot_return_hand_ranked_empirical_claims():
    result = exposure_gradient_test()

    forbidden = {
        "gradient",
        "monotonic",
        "contrast_correct",
        "assessment",
        "rf_level",
        "rank",
        "direction",
    }
    assert forbidden.isdisjoint(result)
    assert not hasattr(csli, "EXPOSURE_GRADIENT")


def test_exposure_gradient_printer_reports_not_estimable(capsys):
    print_exposure_gradient()
    output = capsys.readouterr().out

    assert "NOT ESTIMABLE" in output
    assert "Monotonic with exposure" not in output
    assert "Low-high contrast correct" not in output


def test_livestock_context_never_claims_low_rf_or_empirical_direction():
    for context in LIVESTOCK_DATA.values():
        assert context.rf_exposure_status == "NOT_MEASURED"
        assert context.eligible_for_csli is False
        assert not hasattr(context, "emf_exposure")
        assert not hasattr(context, "trend_concentration")
        assert not hasattr(context, "trend_motility")


def test_dog_endpoint_context_never_restates_a_directional_parallel():
    for endpoint in DOG_ENDPOINTS.values():
        assert endpoint.eligible_for_csli is False
        assert not hasattr(endpoint, "lea_2016_trend")
        assert not hasattr(endpoint, "human_parallel")
