"""Test biological pathway models."""

import numpy as np
from berm.biology.sperm_cascade import (
    ros_index, sdf_index, motility_index, concentration,
    compute_sperm_state, BASELINE_CONC, BASELINE_MOT,
)

def test_ros_zero():
    assert ros_index(0.0) == 0.0

def test_ros_positive():
    assert 0.0 < ros_index(10.0) < 1.0

def test_sdf_empty_history():
    assert sdf_index(np.array([])) == 0.0

def test_motility_baseline():
    assert motility_index(0.0, 0.0) == BASELINE_MOT

def test_concentration_baseline():
    assert concentration(0.0) == BASELINE_CONC

def test_sperm_state_complete():
    state = compute_sperm_state(emf_instant=5.0, cum_emf=20.0)
    assert state.ros_index > 0
    assert state.concentration < BASELINE_CONC
    assert state.motility_index <= BASELINE_MOT
    assert state.total_count > 0
