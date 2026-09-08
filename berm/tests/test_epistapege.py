"""Contract tests for BERM's qualitative Epistapege branch."""

import pytest

from berm.civilization.epistapege import (
    BehaviouralStratum,
    CIVILIZATION_READING_SEQUENCE,
    EPISTAPEGE_CANONICAL_ROUTE,
    EPISTAPEGE_TRANSITIONS,
    aggregate_behaviour_probability,
    institutional_memory_update,
    validate_epistapege_contract,
)


def test_epistapege_is_a_continuous_open_composition() -> None:
    validate_epistapege_contract()
    assert EPISTAPEGE_CANONICAL_ROUTE == "/civilization/epistapege"
    assert CIVILIZATION_READING_SEQUENCE[1] == "EPISTAPEGE"
    assert len(EPISTAPEGE_TRANSITIONS) == 4
    assert all(step.evidence_class != "DIRECT_SAME_PROTOCOL" for step in EPISTAPEGE_TRANSITIONS)


def test_epistapege_ends_at_institutional_reuse_without_entering_tfr() -> None:
    assert EPISTAPEGE_TRANSITIONS[0].source == "INDIVIDUAL_BEHAVIORAL_RESPONSE"
    assert EPISTAPEGE_TRANSITIONS[-1].target == "INSTITUTIONAL_MODEL_REUSE"


def test_individual_probabilities_aggregate_forward_without_ecological_inference() -> None:
    strata = (
        BehaviouralStratum("state-low", "weak-affiliation", 0.20, 0.25),
        BehaviouralStratum("state-high", "weak-affiliation", 0.60, 0.25),
        BehaviouralStratum("state-high", "strong-affiliation", 0.30, 0.50),
    )
    assert aggregate_behaviour_probability(strata) == 0.35


def test_institutional_memory_can_outlast_the_current_aggregate() -> None:
    assert institutional_memory_update(0.80, 0.20, retention=0.75) == pytest.approx(0.65)
