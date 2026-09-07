from dataclasses import replace

import pytest

from berm.biology.reproductive_state import CoupleReproductiveState, FemaleReproductiveState, MaleReproductiveState
from berm.outcomes.reproductive_waiting import CoupleWaitingState
from berm.outcomes.reproductive_calendar import CalendarPeriod, simulate_reproductive_calendar


def pair(p=1, support=1):
    return CoupleWaitingState(CoupleReproductiveState(MaleReproductiveState(), FemaleReproductiveState(luteal_implantation_support=support)), p)


def run(periods, **overrides):
    params = dict(periods=periods, starting_age_years=30, starting_parity=0, maximum_parity=2,
                  interval_months=1, gestation_intervals=2, loss_recovery_intervals=1,
                  postpartum_intervals=1, parameter_ids=("synthetic-calendar",))
    return simulate_reproductive_calendar(**{**params, **overrides})


def test_gestation_and_postpartum_consume_time_before_second_birth():
    period = CalendarPeriod({0: pair(), 1: pair()}, 1)
    result = run([period] * 5)
    assert result["live_births_by_interval"] == [0, 1, 0, 0, 1]
    assert result["expected_births_within_horizon"] == 2
    assert result["final_parity_distribution"]["2"] == 1
    assert result["trace"][-1]["age_years"] == pytest.approx(30 + 5/12)
    assert run([period])["expected_births_within_horizon"] == 0


def test_losses_reenter_once_and_pregnancy_support_not_applied_again():
    period = CalendarPeriod({0: pair(support=0.5)}, 1)
    result = run([period] * 4, maximum_parity=1)
    assert result["live_births_by_interval"] == pytest.approx([0, 0.5, 0.25, 0.125])
    assert result["expected_births_within_horizon"] == pytest.approx(0.875)
    assert sum(result["final_parity_distribution"].values()) == pytest.approx(1)


def test_reference_support_and_pair_support_are_separate_probabilities():
    period = CalendarPeriod({0: pair(support=0.5)}, 0.5)
    result = run([period] * 2, maximum_parity=1)
    assert result["live_births_by_interval"][-1] == pytest.approx(0.25)


def test_time_varying_state_and_parity_gate_change_later_attempts():
    empty = CalendarPeriod({0: pair(0), 1: pair(0)}, 1)
    first_only = CalendarPeriod({0: pair(1), 1: pair(0)}, 1)
    result = run([empty, first_only, first_only, first_only, first_only])
    assert result["live_births_by_interval"] == [0, 0, 1, 0, 0]
    assert result["expected_births_within_horizon"] == 1


def test_long_horizon_conserves_mass_and_parity_for_heterogeneous_calendar():
    periods = [CalendarPeriod({0: pair(0.1 + 0.05 * (i % 3)), 1: pair(0.05)}, 0.8) for i in range(80)]
    result = run(periods, gestation_intervals=9, loss_recovery_intervals=2, postpartum_intervals=6)
    assert 0 < result["expected_births_within_horizon"] < 2
    assert sum(result["final_parity_distribution"].values()) == pytest.approx(1)
    assert result["calibration_status"] == "STRUCTURAL_ONLY"


@pytest.mark.parametrize("options", [dict(gestation_intervals=0), dict(loss_recovery_intervals=0),
    dict(starting_parity=3), dict(interval_months=0), dict(parameter_ids=()), dict(starting_age_years=float("nan"))])
def test_invalid_calendar_assumptions_are_rejected(options):
    with pytest.raises(ValueError):
        run([CalendarPeriod({0: pair()}, 1)], **options)


def test_missing_occupied_parity_is_not_silently_treated_as_sterility():
    with pytest.raises(ValueError, match="lacks.*parity 1"):
        run([CalendarPeriod({0: pair()}, 1)] * 6)


def test_calendar_refuses_to_silently_ignore_a_mixture_weight():
    with pytest.raises(ValueError, match="one stratum"):
        CalendarPeriod({0: replace(pair(), weight=0.5)}, 1)
