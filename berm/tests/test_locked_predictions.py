"""Verify locked predictions cannot change."""

from berm.config import LOCKED_PREDICTIONS, LockedPrediction, ALPHA_EFF

def test_predictions_are_frozen():
    for p in LOCKED_PREDICTIONS:
        assert isinstance(p, LockedPrediction)
        # Frozen dataclass — assignment raises
        try:
            p.central = 999.0  # type: ignore[misc]
            raise AssertionError("Should not be mutable")
        except AttributeError:
            pass

def test_finland_2030():
    fi = [p for p in LOCKED_PREDICTIONS if p.country == "Finland" and p.year == 2030]
    assert len(fi) == 1
    assert fi[0].central == 1.17
    assert fi[0].ci_low == 1.02
    assert fi[0].ci_high == 1.24

def test_korea_2030():
    kr = [p for p in LOCKED_PREDICTIONS if p.country == "SouthKorea" and p.year == 2030]
    assert len(kr) == 1
    assert kr[0].central == 0.55

def test_alpha_eff():
    assert abs(ALPHA_EFF - 0.43) < 0.001

def test_prediction_count():
    assert len(LOCKED_PREDICTIONS) >= 7
