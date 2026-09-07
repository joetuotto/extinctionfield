"""F_T4/F_T5 contracts for Maxwell/SAR/Schwan structures."""

from __future__ import annotations

import math

import pytest

from berm.physics.schwan import (
    schwan_low_pass,
    schwan_membrane_voltage,
    specific_absorption_rate,
)
from berm.stats.dkc import allometric_resonance_frequency


def test_f_t4_sar_and_human_body_resonance() -> None:
    assert specific_absorption_rate(0.8, 10.0, 1000.0) == pytest.approx(0.08)
    assert specific_absorption_rate(0.8, -10.0, 1000.0) == pytest.approx(0.08)
    body_resonance = allometric_resonance_frequency(1.7)
    assert body_resonance == pytest.approx(44.087e6, rel=1e-4)
    assert 44e6 * 0.8 <= body_resonance <= 44e6 * 1.2


def test_f_t5_schwan_low_pass_with_one_microsecond_tau() -> None:
    tau_m = 1e-6
    assert schwan_low_pass(0.0, tau_m) == pytest.approx(1.0)
    cutoff = 1.0 / (2.0 * math.pi * tau_m)
    assert schwan_low_pass(cutoff, tau_m) == pytest.approx(1.0 / math.sqrt(2.0))
    assert schwan_low_pass(1e9, tau_m) < 2e-4
    assert schwan_membrane_voltage(10e-6, 1.0, 0.0, tau_m) == pytest.approx(15e-6)


@pytest.mark.parametrize(
    ("call", "message"),
    [
        (lambda: specific_absorption_rate(-0.1, 1.0, 1000.0), "non-negative"),
        (lambda: specific_absorption_rate(0.1, 1.0, 0.0), "positive"),
        (lambda: schwan_low_pass(-1.0, 1e-6), "non-negative"),
        (lambda: schwan_low_pass(1.0, 0.0), "positive"),
    ],
)
def test_physical_domains_are_explicit(call, message: str) -> None:
    with pytest.raises(ValueError, match=message):
        call()
