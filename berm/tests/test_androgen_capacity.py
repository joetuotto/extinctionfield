import pytest

from berm.biology.androgen_capacity import (
    HormoneBindingState,
    ReceptorPathway,
    androgen_effective_capacity,
    receptor_occupancy,
)
from berm.biology.reproductive_state import MaleReproductiveState


def binding(*, shbg: float) -> HormoneBindingState:
    return HormoneBindingState(
        total_testosterone=20.0,
        shbg_binding_sites=shbg,
        albumin_binding_sites=600.0,
        shbg_dissociation_constant=1.0,
        albumin_dissociation_constant=1000.0,
    )


def test_binding_changes_free_testosterone_at_constant_total_testosterone() -> None:
    low_shbg = binding(shbg=10.0)
    high_shbg = binding(shbg=80.0)
    assert low_shbg.total_testosterone == high_shbg.total_testosterone
    assert high_shbg.free_testosterone < low_shbg.free_testosterone


def test_receptor_and_post_receptor_state_change_capacity_at_constant_hormone() -> None:
    hormone = binding(shbg=20.0)
    intact = ReceptorPathway("AR", abundance=1.0, dissociation_constant=2.0, post_receptor_gain=1.0)
    impaired = ReceptorPathway("AR", abundance=0.5, dissociation_constant=2.0, post_receptor_gain=0.4)
    intact_result = androgen_effective_capacity(hormone, (intact,))
    impaired_result = androgen_effective_capacity(hormone, (impaired,))
    assert impaired_result.free_testosterone == pytest.approx(intact_result.free_testosterone)
    assert impaired_result.effective_capacity < intact_result.effective_capacity


def test_ar_and_zip9_remain_separate_weighted_pathways() -> None:
    hormone = binding(shbg=20.0)
    ar = ReceptorPathway("AR", abundance=0.0, dissociation_constant=2.0)
    zip9 = ReceptorPathway("ZIP9", abundance=0.8, dissociation_constant=4.0)
    result = androgen_effective_capacity(hormone, (ar, zip9), pathway_weights=(0.8, 0.2))
    assert dict(result.pathway_signals)["AR"] == 0.0
    assert dict(result.pathway_signals)["ZIP9"] > 0.0
    assert 0.0 < result.effective_capacity < 1.0


def test_receptor_occupancy_is_bounded_and_saturating() -> None:
    assert receptor_occupancy(0.0, 1.0) == 0.0
    assert receptor_occupancy(1.0, 1.0) == pytest.approx(0.5)
    assert receptor_occupancy(1e9, 1.0) == pytest.approx(1.0)


def test_androgen_capacity_enters_male_conception_capacity_independently() -> None:
    baseline = MaleReproductiveState()
    impaired_use = MaleReproductiveState(androgen_effective_capacity=0.6)
    assert baseline.conception_capacity == pytest.approx(1.0)
    assert impaired_use.conception_capacity == pytest.approx(0.6)
