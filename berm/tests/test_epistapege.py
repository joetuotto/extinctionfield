"""Contract tests for BERM's qualitative Epistapege branch."""

from berm.civilization.epistapege import (
    CIVILIZATION_READING_SEQUENCE,
    EPISTAPEGE_CANONICAL_ROUTE,
    EPISTAPEGE_TRANSITIONS,
    validate_epistapege_contract,
)


def test_epistapege_is_a_continuous_open_composition() -> None:
    validate_epistapege_contract()
    assert EPISTAPEGE_CANONICAL_ROUTE == "/civilization/epistapege"
    assert CIVILIZATION_READING_SEQUENCE[1] == "EPISTAPEGE"
    assert len(EPISTAPEGE_TRANSITIONS) == 3
    assert all(step.evidence_class != "DIRECT_SAME_PROTOCOL" for step in EPISTAPEGE_TRANSITIONS)


def test_epistapege_ends_at_institutional_reuse_without_entering_tfr() -> None:
    assert EPISTAPEGE_TRANSITIONS[0].source == "BIOBEHAVIORAL_WEIGHTING"
    assert EPISTAPEGE_TRANSITIONS[-1].target == "INSTITUTIONAL_MODEL_REUSE"
