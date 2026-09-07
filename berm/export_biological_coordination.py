#!/usr/bin/env python3
"""Export reproducible biological-coordination examples for the website.

The numerical closures live in the BERM Python package. The site selects and
plots these precomputed scenarios without reimplementing the response laws.
All input values below are declared illustrations, not fitted exposure effects
or country forecasts. Both website mirrors are byte-for-byte reproducible.
"""

from __future__ import annotations

import json
import math
from pathlib import Path

from berm.biology.coordination import (
    COORDINATION_VERSION,
    HormoneReceptivityState,
    advance_chemical_memory,
    conditional_gate_success,
    recovery_retention,
    steady_pulse_memory,
)
from berm.biology.reproductive_state import (
    CoupleReproductiveState,
    FemaleReproductiveState,
    MaleReproductiveState,
)
from berm.outcomes.reproductive_waiting import (
    CoupleWaitingState,
    summarize_waiting_cohort,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = (
    ROOT / "website" / "data" / "biological-coordination.json",
    ROOT / "website" / "public" / "data" / "biological-coordination.json",
)


def _rounded(value: float) -> float:
    if not math.isfinite(value):
        raise ValueError("Site examples must contain finite numeric values")
    return round(value, 8) + 0.0


def hormone_timing_examples() -> dict:
    scenarios = []
    for name, lag_hours in (("aligned", 0), ("quarter-cycle", 6), ("opposed", 12)):
        state = HormoneReceptivityState(
            signal_mean=1.0,
            signal_amplitude=0.5,
            receptivity_mean=1.0,
            receptivity_amplitude=0.5,
            lag_radians=2 * math.pi * lag_hours / 24,
            signal_units="illustrative normalized signal",
        )
        series = []
        for step in range(97):
            hour = step / 4
            angle = 2 * math.pi * hour / 24
            signal = state.signal_mean + state.signal_amplitude * math.cos(angle)
            receptivity = (state.receptivity_mean + state.receptivity_amplitude
                           * math.cos(angle + state.lag_radians))
            series.append({
                "hour": hour,
                "hormone": _rounded(signal),
                "receptivity": _rounded(receptivity),
                "instantResponse": _rounded(signal * receptivity),
            })
        scenarios.append({
            "id": name,
            "phaseLagHours": lag_hours,
            "averageResponse": _rounded(state.average_response),
            "relativeResponse": _rounded(state.timing_factor),
            "series": series,
        })
    return {
        "periodHours": 24,
        "signalMean": 1.0,
        "signalAmplitude": 0.5,
        "receptivityMean": 1.0,
        "receptivityAmplitude": 0.5,
        "scenarios": scenarios,
    }


def recovery_examples() -> dict:
    # One second is a computational unit: the plot labels time/tau, not seconds.
    scenarios = []
    for name, interval in (("frequent", 0.1), ("spaced", 3.0)):
        level = 0.0
        points = [{"timeOverTau": 0.0, "level": 0.0}]
        for pulse in range(1, 61):
            event_time = pulse * interval
            # Sample the actual exponential between pulses so a connecting
            # polyline cannot imply linear recovery across a long interval.
            for sample in range(1, 13):
                elapsed = interval * sample / 12
                before = level * recovery_retention(
                    elapsed_seconds=elapsed, recovery_time_seconds=1.0,
                )
                points.append({
                    "timeOverTau": _rounded((pulse - 1) * interval + elapsed),
                    "level": _rounded(before),
                })
            level = advance_chemical_memory(
                level, increment=1.0, elapsed_seconds=interval, recovery_time_seconds=1.0,
            )
            points.append({"timeOverTau": _rounded(event_time), "level": _rounded(level)})
        scenarios.append({
            "id": name,
            "intervalOverTau": interval,
            "steadyPostPulse": _rounded(steady_pulse_memory(
                increment=1.0, interval_seconds=interval, recovery_time_seconds=1.0,
            )),
            "points": points,
        })
    return {"pulseIncrement": 1.0, "timeUnit": "recovery-time multiples", "scenarios": scenarios}


def waiting_examples() -> dict:
    neutral_pair = CoupleReproductiveState(
        male=MaleReproductiveState(), female=FemaleReproductiveState(),
        pair_id="illustrative-neutral-pair",
    )
    scenarios = []
    for name, probabilities in (("equal", (0.2,)), ("mixed", (0.1, 0.3))):
        cohort = tuple(CoupleWaitingState(
            couple=neutral_pair, reference_cycle_conception_probability=p,
            weight=1.0 / len(probabilities),
        ) for p in probabilities)
        curve = []
        for cycle in range(13):
            result = summarize_waiting_cohort(cohort, cycles=cycle)
            curve.append({
                "cycle": cycle,
                "probability": _rounded(result.conceived_probability),
                "remainingShare": _rounded(result.survivor_probability),
                "conditionalProbability": _rounded(result.next_cycle_conception_probability),
            })
        scenarios.append({
            "id": name,
            "meanProbability": _rounded(math.fsum(probabilities) / len(probabilities)),
            "probabilities": list(probabilities),
            "weights": [1.0 / len(probabilities)] * len(probabilities),
            "cumulativeByCycle": curve,
        })
    return {"maxCycles": 12, "endpoint": "first conception", "scenarios": scenarios}


def build_coordination_export() -> dict:
    gates = {name: 0.9 for name in (
        "timely-encounter", "gamete-function", "fertilization", "implantation", "pregnancy-support",
    )}
    return {
        "metadata": {
            "version": COORDINATION_VERSION,
            "calibrationStatus": "STRUCTURAL_ONLY",
            "forecastCalibration": False,
            "inputOrigin": "declared illustrative values; no empirical effect-size calibration",
            "sourceModels": [
                "berm.biology.coordination",
                "berm.biology.reproductive_state",
                "berm.outcomes.reproductive_waiting",
            ],
        },
        "hormoneTiming": hormone_timing_examples(),
        "recovery": recovery_examples(),
        "waiting": waiting_examples(),
        "gates": {
            "conditionalProbabilities": list(gates.values()),
            "jointProbability": _rounded(conditional_gate_success(gates)),
        },
    }


def serialized_export() -> str:
    return json.dumps(build_coordination_export(), ensure_ascii=False, indent=2, allow_nan=False) + "\n"


def main() -> None:
    content = serialized_export()
    for path in OUTPUTS:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
        print(f"Wrote {path}")


if __name__ == "__main__":
    main()
