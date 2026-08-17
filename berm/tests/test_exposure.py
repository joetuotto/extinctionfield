"""Test exposure calculation chain."""

import numpy as np
from berm.exposure.lindgren import chi, chi_derivative, two_channel_exposure

def test_chi_zero():
    assert chi(0.0) == 0.0

def test_chi_large():
    assert abs(chi(1000.0) - 1.0) < 0.001

def test_chi_symmetry():
    assert abs(chi(-5.0) + chi(5.0)) < 1e-10

def test_chi_derivative_peak():
    assert chi_derivative(0.0) == 1.0
    assert chi_derivative(1.0) < 1.0

def test_two_channel():
    result = two_channel_exposure(0.5, 0.3)
    expected = 0.5 + chi(0.5) * 0.3
    assert abs(result - expected) < 1e-10

def test_two_channel_zero_ambient():
    result = two_channel_exposure(0.0, 1.0)
    assert result == 0.0  # chi(0) = 0, so personal has no effect

def test_chi_array():
    a = np.array([0.0, 1.0, 10.0])
    result = chi(a)
    assert result.shape == (3,)
    assert result[0] == 0.0
