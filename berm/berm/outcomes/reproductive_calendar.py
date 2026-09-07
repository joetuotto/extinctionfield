"""Finite calendar/parity operator with supplied age- and time-specific states.

This is a conditional state-transition model, not a fitted fertility forecast.
Conception and pregnancy support are applied once each. Gestation, loss recovery
and postpartum pauses consume calendar time; a later parity may have a different
supplied capacity. Outcomes are single births (no multiple-birth model).
"""
from __future__ import annotations

from dataclasses import dataclass
import math
from typing import Mapping, Sequence

from berm.modulome._common import finite, nonempty, normalise_ids, STRUCTURAL_ONLY, unit_interval
from berm.outcomes.reproductive_waiting import CoupleWaitingState, _count


@dataclass(frozen=True)
class CalendarPeriod:
    """One eligible cycle per interval; age-specific inputs are supplied by caller.

    Values are before the biological factors already stored in each pair.
    Pregnancy outcome is assigned at conception, with separate supplied delays
    for a supported birth and a loss. This does not model gestational hazards.
    """
    by_parity: Mapping[int, CoupleWaitingState]
    reference_pregnancy_support: float

    def __post_init__(self):
        values = dict(self.by_parity)
        for parity, state in values.items():
            _count("parity", parity)
            if not isinstance(state, CoupleWaitingState):
                raise TypeError("by_parity values must be CoupleWaitingState")
            if state.weight != 1:
                raise ValueError("this calendar follows one stratum; use unit weights and mix stratum outputs separately")
        object.__setattr__(self, "by_parity", values)
        object.__setattr__(self, "reference_pregnancy_support", unit_interval(
            "reference_pregnancy_support", self.reference_pregnancy_support))


def simulate_reproductive_calendar(*, periods: Sequence[CalendarPeriod], starting_age_years: float,
                                  starting_parity: int, maximum_parity: int, interval_months: float,
                                  gestation_intervals: int, loss_recovery_intervals: int,
                                  postpartum_intervals: int, parameter_ids: tuple[str, ...],
                                  evidence_ids: tuple[str, ...] = ()) -> dict:
    """Propagate one stratum's probability mass through explicit calendar states.

    Conception occurs at interval start. A gestation of N intervals delivers at
    the end of the Nth interval including conception. Loss recovery similarly
    includes its conception interval. Postpartum intervals start AFTER delivery.
    No tempo ratio is applied: calendar time is already represented here.
    """
    age = finite("starting_age_years", starting_age_years)
    interval = finite("interval_months", interval_months)
    if age < 0 or interval <= 0:
        raise ValueError("age must be nonnegative and interval_months positive")
    parity = _count("starting_parity", starting_parity)
    maximum = _count("maximum_parity", maximum_parity)
    gestation = _count("gestation_intervals", gestation_intervals)
    loss = _count("loss_recovery_intervals", loss_recovery_intervals)
    postpartum = _count("postpartum_intervals", postpartum_intervals)
    if parity > maximum or gestation < 1 or loss < 1:
        raise ValueError("maximum_parity must cover starting parity; gestation/loss intervals must be >=1")
    if isinstance(parameter_ids, (str, bytes)) or not parameter_ids:
        raise ValueError("parameter_ids must identify calendar assumptions")
    ids = normalise_ids(parameter_ids, "parameter_id")
    evidence = normalise_ids(evidence_ids, "evidence_id")
    schedule = tuple(periods)
    if not all(isinstance(period, CalendarPeriod) for period in schedule):
        raise TypeError("periods must contain CalendarPeriod")
    # (parity, phase, remaining intervals) -> probability of this state
    states = {(parity, "eligible", 0): 1.0}
    trace, births = [], []
    for index, period in enumerate(schedule):
        next_states = {}
        delivered = 0.0
        conceptions = 0.0
        def add(key, mass):
            if mass > 0:
                next_states[key] = next_states.get(key, 0.0) + mass
        def advance_wait(p, phase, remaining, mass):
            nonlocal delivered
            if remaining > 1:
                add((p, phase, remaining - 1), mass)
            elif phase == "pregnant":
                delivered += mass
                add((p + 1, "postpartum" if postpartum else "eligible", postpartum), mass)
            else:
                add((p, "eligible", 0), mass)
        for (p, phase, remaining), mass in states.items():
            if phase != "eligible":
                advance_wait(p, phase, remaining, mass)
                continue
            if p >= maximum:
                add((p, "eligible", 0), mass)
                continue
            if p not in period.by_parity:
                raise ValueError(f"period {index} lacks the occupied eligible parity {p}")
            pair = period.by_parity[p]
            conception = pair.cycle_conception_probability
            support = period.reference_pregnancy_support * pair.couple.live_birth_support
            conceptions += mass * conception
            add((p, "eligible", 0), mass * (1 - conception))
            advance_wait(p, "pregnant", gestation, mass * conception * support)
            advance_wait(p, "loss_recovery", loss, mass * conception * (1 - support))
        if not math.isclose(math.fsum(next_states.values()), 1, rel_tol=1e-12, abs_tol=1e-12):
            raise ArithmeticError("calendar transition failed to conserve probability")
        states = next_states
        births.append(delivered)
        trace.append({"interval": index + 1, "age_years": age + (index + 1) * interval / 12,
                      "conception_probability": conceptions, "birth_probability": delivered,
                      "eligible_probability": math.fsum(m for (p, phase, _), m in states.items() if phase == "eligible" and p < maximum),
                      "pregnant_probability": math.fsum(m for (_, phase, _), m in states.items() if phase == "pregnant")})
    by_parity = {str(p): math.fsum(m for (value, _, _), m in states.items() if value == p)
                 for p in range(parity, maximum + 1)}
    expected_births = math.fsum(births)
    if not math.isclose(expected_births, math.fsum(int(p) * value for p, value in by_parity.items()) - parity, abs_tol=1e-10):
        raise ArithmeticError("birth/parity accounting mismatch")
    return {"route": "berm-reproductive-calendar-v1", "trace": trace,
            "live_births_by_interval": births, "expected_births_within_horizon": expected_births,
            "final_parity_distribution": by_parity, "starting_age_years": age,
            "interval_months": interval, "parameter_ids": list(ids), "evidence_ids": list(evidence),
            "calibration_status": STRUCTURAL_ONLY, "l2_bridge_status": "OPEN",
            "endpoint": "single live births within the supplied calendar horizon; not completed lifetime fertility",
            "assumptions": "One eligible cycle per interval; supplied conception and reference support probabilities; support assigned at conception; no migration, mortality or multiple births. Calendar time replaces any separate tempo multiplier."}
