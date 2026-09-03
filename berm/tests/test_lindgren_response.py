import numpy as np
import pytest

from berm.physics.lindgren_response import (
    contract_linear_response,
    geometric_chi,
    geometric_chi_squared,
    low_pass_am_metric_components,
    metric_perturbation,
    two_tone_beat_metric_amplitude,
)


def test_metric_perturbation_is_exact_rank_one_expansion() -> None:
    background = np.array([1.0, -2.0, 0.5])
    external = np.array([0.2, 0.4, -0.1])
    kappa = 0.75
    direct = kappa * (
        np.outer(background + external, background + external)
        - np.outer(background, background)
    )
    derived = metric_perturbation(background, external, coupling_scale=kappa)
    assert np.allclose(derived, direct)
    assert np.allclose(derived, derived.T)


def test_geometric_chi_squared_is_rank_one_inverse_coefficient() -> None:
    for rho in (0.0, 0.1, 1.0, 10.0):
        assert geometric_chi_squared(rho) == pytest.approx(rho**2 / (1.0 + rho**2))
        assert geometric_chi(rho) ** 2 == pytest.approx(geometric_chi_squared(rho))


def test_response_becomes_scalar_only_after_explicit_contraction() -> None:
    perturbation = metric_perturbation([1.0, 0.0], [0.0, 0.5])
    kernel = np.array([[2.0, 1.0], [1.0, -1.0]])
    assert contract_linear_response(kernel, perturbation) == pytest.approx(
        np.sum(kernel * perturbation)
    )


def test_am_low_pass_coefficients_follow_exact_quadratic_identity() -> None:
    terms = low_pass_am_metric_components(2.0, 0.5, coupling_scale=3.0)
    assert terms.dc == pytest.approx(6.75)
    assert terms.envelope == pytest.approx(6.0)
    assert terms.second_harmonic == pytest.approx(0.75)


def test_two_tone_quadratic_term_generates_difference_frequency() -> None:
    assert two_tone_beat_metric_amplitude(2.0, 3.0, coupling_scale=0.5) == pytest.approx(3.0)


def test_invalid_geometry_inputs_fail_loudly() -> None:
    with pytest.raises(ValueError):
        metric_perturbation([1.0], [1.0, 2.0])
    with pytest.raises(ValueError):
        geometric_chi(-0.1)
    with pytest.raises(ValueError):
        low_pass_am_metric_components(1.0, 1.2)
