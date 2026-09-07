"""Tests for conditional L0/L1 Lindgren tensor algebra."""

from __future__ import annotations

import inspect
import math
from dataclasses import replace

import pytest

from berm.physics import lindgren_tensor as lt


ZERO_TENSOR: lt.Tensor4 = tuple(tuple(0.0 for _ in range(4)) for _ in range(4))  # type: ignore[assignment]
ZERO_RANK3: lt.Rank3Tensor4 = tuple(ZERO_TENSOR for _ in range(4))  # type: ignore[assignment]
ZERO_RANK4: lt.Rank4Tensor4 = tuple(ZERO_RANK3 for _ in range(4))  # type: ignore[assignment]
PLACEHOLDER_INPUT_BUNDLE_DIGEST = "0" * 64
WRONG_INPUT_BUNDLE_DIGEST = "f" * 64


def _residual_tolerance(*, reference_scale: float = 1.0) -> lt.ResidualTolerance:
    return lt.ResidualTolerance(
        absolute=1e-12,
        relative=1e-12,
        reference_scale=reference_scale,
        unit="fixture-residual-unit",
        reference_scale_provenance="analytic test fixture",
    )


TEST_TOLERANCES = lt.ThreeElementResidualTolerances(
    eh_variation=_residual_tolerance(reference_scale=2.0),
    full_action_derivative=_residual_tolerance(reference_scale=3.0),
    harmonic_metric=_residual_tolerance(reference_scale=4.0),
    background_harmonic=_residual_tolerance(reference_scale=5.0),
    harmonic_decomposition=_residual_tolerance(reference_scale=6.0),
    gme_outer_scaling=_residual_tolerance(reference_scale=7.0),
    levi_civita_metric_compatibility=_residual_tolerance(reference_scale=8.0),
    weyl_nonmetricity=_residual_tolerance(reference_scale=9.0),
    weyl_connection=_residual_tolerance(reference_scale=10.0),
    torsion=_residual_tolerance(reference_scale=11.0),
    field_definition=_residual_tolerance(reference_scale=12.0),
    levi_civita_contracted_bianchi=_residual_tolerance(reference_scale=13.0),
    homogeneous_bianchi=_residual_tolerance(reference_scale=14.0),
)


def _full_el_attestation(
    *,
    verified: bool = True,
    input_bundle_digest: str = PLACEHOLDER_INPUT_BUNDLE_DIGEST,
    variation_branch: lt.VariationBranch = lt.EINSTEIN_HILBERT_BRANCH,
) -> lt.FullEulerLagrangeAttestation:
    return lt.FullEulerLagrangeAttestation(
        verified=verified,
        input_bundle_digest=input_bundle_digest,
        variation_branch=variation_branch,
        action_id="fixture-action-id-does-not-select-a-branch",
        derivation_id="analytic-fixture-v1",
        boundary_condition_id="compact-support",
        connection_treatment="LC_FOR_EH__WEYL_FOR_GME",
        wave_operator_id="WEYL_DIVERGENCE_FORM",
        provenance="berm.tests.test_lindgren_tensor",
    )


def _field_derivative_attestation(
    *,
    verified: bool = True,
    input_bundle_digest: str = PLACEHOLDER_INPUT_BUNDLE_DIGEST,
) -> lt.FieldTensorDerivativeAttestation:
    return lt.FieldTensorDerivativeAttestation(
        verified_from_same_field_tensor=verified,
        input_bundle_digest=input_bundle_digest,
        field_tensor_id="analytic-F-from-A-v1",
        derivative_scheme="analytic",
        provenance="berm.tests.test_lindgren_tensor",
    )


def _lc_bianchi_attestation(
    *,
    verified: bool = True,
    input_bundle_digest: str = PLACEHOLDER_INPUT_BUNDLE_DIGEST,
) -> lt.LeviCivitaBianchiAttestation:
    return lt.LeviCivitaBianchiAttestation(
        verified_with_levi_civita_connection=verified,
        input_bundle_digest=input_bundle_digest,
        metric_id="eta-plus-kappa-A-outer-A-v1",
        derivative_scheme="analytic",
        provenance="berm.tests.test_lindgren_tensor",
    )


def _valid_three_element_inputs(
    *,
    required_variation_branch: lt.VariationBranch = lt.EINSTEIN_HILBERT_BRANCH,
    kappa: float = 1.0,
) -> dict[str, object]:
    potential = (0.0, 0.25, 0.0, 0.0)
    partial_potential = ZERO_TENSOR
    metric = lt.lindgren_metric(potential, kappa=kappa)
    inverse = lt.lindgren_inverse_metric(potential, kappa=kappa)
    levi_civita = lt.levi_civita_connection(
        potential,
        partial_potential,
        kappa=kappa,
    )
    one_form = (0.0, 0.0, 0.0, 0.0)
    connection = lt.weyl_connection(levi_civita, metric, inverse, one_form)
    input_bundle_digest = lt.three_element_input_bundle_digest(
        potential=potential,
        einstein_tensor_contravariant=ZERO_TENSOR,
        full_action_derivative=(0.0, 0.0, 0.0, 0.0),
        required_variation_branch=required_variation_branch,
        partial_potential=partial_potential,
        covariant_laplacian_potential=(0.0, 0.0, 0.0, 0.0),
        covariant_laplacian_metric=ZERO_TENSOR,
        covariant_laplacian_background_metric=ZERO_TENSOR,
        covariant_laplacian_potential_outer=ZERO_TENSOR,
        connection=connection,
        one_form=one_form,
        field_tensor=ZERO_TENSOR,
        partial_field_tensor=ZERO_RANK3,
        levi_civita_covariant_divergence_einstein=(0.0, 0.0, 0.0, 0.0),
        kappa=kappa,
    )
    return {
        "potential": potential,
        "einstein_tensor_contravariant": ZERO_TENSOR,
        "full_action_derivative": (0.0, 0.0, 0.0, 0.0),
        "required_variation_branch": required_variation_branch,
        "full_euler_lagrange_attestation": _full_el_attestation(
            input_bundle_digest=input_bundle_digest,
            variation_branch=required_variation_branch,
        ),
        "partial_potential": partial_potential,
        "covariant_laplacian_potential": (0.0, 0.0, 0.0, 0.0),
        "covariant_laplacian_metric": ZERO_TENSOR,
        "covariant_laplacian_background_metric": ZERO_TENSOR,
        "covariant_laplacian_potential_outer": ZERO_TENSOR,
        "connection": connection,
        "one_form": one_form,
        "field_tensor": ZERO_TENSOR,
        "partial_field_tensor": ZERO_RANK3,
        "field_tensor_derivative_attestation": _field_derivative_attestation(
            input_bundle_digest=input_bundle_digest
        ),
        "levi_civita_covariant_divergence_einstein": (0.0, 0.0, 0.0, 0.0),
        "levi_civita_bianchi_attestation": _lc_bianchi_attestation(
            input_bundle_digest=input_bundle_digest
        ),
        "tolerances": TEST_TOLERANCES,
        "kappa": kappa,
    }


def _bundle_digest_from_gate_kwargs(values: dict[str, object]) -> str:
    digest_parameters = inspect.signature(
        lt.three_element_input_bundle_digest
    ).parameters
    return lt.three_element_input_bundle_digest(
        **{name: values[name] for name in digest_parameters if name in values}
    )  # type: ignore[arg-type]


def _with_rebound_digests(values: dict[str, object]) -> dict[str, object]:
    rebound = dict(values)
    digest = _bundle_digest_from_gate_kwargs(rebound)
    for key in (
        "full_euler_lagrange_attestation",
        "field_tensor_derivative_attestation",
        "levi_civita_bianchi_attestation",
    ):
        rebound[key] = replace(
            rebound[key],  # type: ignore[arg-type]
            input_bundle_digest=digest,
        )
    return rebound


def _matmul(left: lt.Tensor4, right: lt.Tensor4) -> lt.Tensor4:
    return tuple(
        tuple(math.fsum(left[i][k] * right[k][j] for k in range(4)) for j in range(4))
        for i in range(4)
    )  # type: ignore[return-value]


def test_inverse_determinant_and_volume_on_spacelike_example() -> None:
    potential = (0.0, 1.0, 0.0, 0.0)
    metric = lt.lindgren_metric(potential, kappa=0.5)
    inverse = lt.lindgren_inverse_metric(potential, kappa=0.5)

    assert metric[1][1] == pytest.approx(1.5)
    assert inverse[1][1] == pytest.approx(2.0 / 3.0)
    product = _matmul(inverse, metric)
    for row in range(4):
        for column in range(4):
            assert product[row][column] == pytest.approx(1.0 if row == column else 0.0)
    assert lt.lindgren_metric_determinant(potential, kappa=0.5) == pytest.approx(-1.5)
    assert lt.lindgren_volume_element(potential, kappa=0.5) == pytest.approx(
        math.sqrt(1.5)
    )
    assert lt.volume_element_from_norm_squared(1.0, kappa=0.5) == pytest.approx(
        math.sqrt(1.5)
    )
    assert lt.einstein_hilbert_action_density(
        potential,
        3.0,
        kappa=0.5,
    ) == pytest.approx(3.0 * math.sqrt(1.5))


def test_einstein_hilbert_variation_with_respect_to_potential_is_explicit() -> None:
    potential = (0.0, 2.0, 0.0, 0.0)
    einstein = (
        (1.0, 0.0, 0.0, 0.0),
        (0.0, 3.0, 0.0, 0.0),
        (0.0, 0.0, 0.0, 0.0),
        (0.0, 0.0, 0.0, 0.0),
    )
    residual = lt.einstein_hilbert_potential_variation_residual(
        potential,
        einstein,
        kappa=0.5,
    )
    assert residual == pytest.approx((0.0, -6.0 * math.sqrt(3.0), 0.0, 0.0))


def test_eh_variation_matches_metric_chain_rule_with_lorentz_indices() -> None:
    potential = (0.2, 0.3, 0.0, 0.0)
    variation = (0.4, -0.5, 0.0, 0.0)
    einstein = (
        (2.0, -0.75, 0.0, 0.0),
        (-0.75, 3.0, 0.0, 0.0),
        (0.0, 0.0, 0.0, 0.0),
        (0.0, 0.0, 0.0, 0.0),
    )
    kappa = 0.4
    residual = lt.einstein_hilbert_potential_variation_residual(
        potential,
        einstein,
        kappa=kappa,
    )
    delta_metric = lt.first_order_metric_perturbation(
        potential,
        variation,
        kappa=kappa,
    )
    volume = lt.lindgren_volume_element(potential, kappa=kappa)
    metric_variation_contraction = -volume * math.fsum(
        einstein[mu][nu] * delta_metric[mu][nu] for mu in range(4) for nu in range(4)
    )
    potential_variation_contraction = math.fsum(
        residual[lam] * variation[lam] for lam in range(4)
    )
    assert potential_variation_contraction == pytest.approx(
        metric_variation_contraction
    )


def test_einstein_hilbert_variation_requires_symmetric_einstein_tensor() -> None:
    nonsymmetric = [list(row) for row in ZERO_TENSOR]
    nonsymmetric[0][1] = 1.0
    with pytest.raises(ValueError, match="must be symmetric"):
        lt.einstein_hilbert_potential_variation_residual(
            (0.0, 1.0, 0.0, 0.0),
            nonsymmetric,
        )


def test_timelike_domain_and_singular_surface_are_explicit() -> None:
    assert lt.metric_denominator((0.5, 0.0, 0.0, 0.0)) == pytest.approx(0.75)
    assert lt.lindgren_metric_determinant((0.5, 0.0, 0.0, 0.0)) == pytest.approx(-0.75)
    with pytest.raises(ValueError, match="singular"):
        lt.lindgren_inverse_metric((1.0, 0.0, 0.0, 0.0))
    with pytest.raises(ValueError, match="Lorentzian volume"):
        lt.lindgren_volume_element((2.0, 0.0, 0.0, 0.0))


def test_directional_derivative_keeps_lorentzian_direction_explicit() -> None:
    background = (0.0, 1.0, 0.0, 0.0)
    parallel = (0.0, 1.0, 0.0, 0.0)
    orthogonal = (0.0, 0.0, 1.0, 0.0)
    assert lt.volume_directional_derivative(background, parallel) == pytest.approx(
        1 / math.sqrt(2)
    )
    assert lt.volume_directional_derivative(background, orthogonal) == pytest.approx(
        0.0
    )
    assert lt.scalar_spacelike_volume_sensitivity(1.0) == pytest.approx(
        1 / math.sqrt(2)
    )
    assert lt.geodesic_deviation_selection_rule(1.0) == pytest.approx(1 / math.sqrt(2))
    assert inspect.getdoc(lt.geodesic_deviation_selection_rule) == (
        "L1: χ(Ā) = Ā/√(1+Ā²). Johdettu tilavuuselementin linearisaatiosta."
    )


@pytest.mark.parametrize("theta", (0.0, math.pi / 3.0, math.pi / 2.0, math.pi))
def test_f_t3_spatial_directional_response_is_proportional_to_cos_theta(
    theta: float,
) -> None:
    background_amplitude = 2.0
    bridge_coupling = 2.75
    delta_v_mem = 0.018
    background = (0.0, background_amplitude, 0.0, 0.0)
    unit_direction = (0.0, math.cos(theta), math.sin(theta), 0.0)
    parallel_geometric_response = lt.volume_directional_derivative(
        background,
        (0.0, 1.0, 0.0, 0.0),
    )
    geometric_response = lt.volume_directional_derivative(background, unit_direction)
    parallel_ion_response = bridge_coupling * delta_v_mem * parallel_geometric_response
    ion_response = bridge_coupling * delta_v_mem * geometric_response
    assert ion_response == pytest.approx(
        parallel_ion_response * math.cos(theta),
        abs=1e-14,
    )


def test_dimensionless_chi_is_separate_from_kappa_scaled_volume_derivative() -> None:
    scalar_coordinate = 1.0
    kappa = 4.0
    dimensionless_coordinate = math.sqrt(kappa) * scalar_coordinate
    assert lt.scalar_spacelike_volume_sensitivity(
        scalar_coordinate,
        kappa=kappa,
    ) == pytest.approx(4.0 / math.sqrt(5.0))
    assert lt.geodesic_deviation_selection_rule(
        dimensionless_coordinate
    ) == pytest.approx(2.0 / math.sqrt(5.0))


def test_lorentzian_derivative_precedes_spatial_scalar_reduction() -> None:
    background = (0.25, 0.5, 0.0, 0.0)
    direction = (2.0, -1.0, 0.0, 0.0)
    kappa = 0.4
    expected = (
        kappa
        * lt.minkowski_dot(background, direction)
        / math.sqrt(1.0 + kappa * lt.minkowski_dot(background, background))
    )
    assert lt.volume_directional_derivative(
        background,
        direction,
        kappa=kappa,
    ) == pytest.approx(expected)
    assert lt.volume_directional_derivative(
        background,
        tuple(-value for value in direction),
        kappa=kappa,
    ) == pytest.approx(-expected)


def test_lorentzian_directional_derivative_matches_centered_finite_difference() -> None:
    background = (0.3, 0.6, -0.2, 0.1)
    direction = (-0.4, 0.2, 0.5, -0.3)
    kappa = 0.7
    step = 1e-6
    plus = tuple(background[index] + step * direction[index] for index in range(4))
    minus = tuple(background[index] - step * direction[index] for index in range(4))
    finite_difference = (
        lt.lindgren_volume_element(plus, kappa=kappa)
        - lt.lindgren_volume_element(minus, kappa=kappa)
    ) / (2.0 * step)
    assert lt.volume_directional_derivative(
        background,
        direction,
        kappa=kappa,
    ) == pytest.approx(finite_difference, rel=1e-9, abs=1e-10)


def test_exact_perturbation_retains_first_and_second_order_terms() -> None:
    background = (1.0, 2.0, 0.0, 0.0)
    external = (3.0, 4.0, 0.0, 0.0)
    first_order = lt.first_order_metric_perturbation(background, external)
    exact = lt.metric_perturbation(background, external)

    assert first_order[0][0] == pytest.approx(6.0)
    assert exact[0][0] == pytest.approx(15.0)
    assert exact[0][1] == pytest.approx(22.0)
    assert exact[1][0] == pytest.approx(22.0)
    assert exact[1][1] == pytest.approx(32.0)


def test_static_levi_civita_gamma_i00_matches_direct_derivative() -> None:
    potential = (0.5, 0.0, 0.0, 0.0)
    # partial_potential[mu][nu] = partial_mu A_nu; only partial_1 A_0 = 2.
    partial = (
        (0.0, 0.0, 0.0, 0.0),
        (2.0, 0.0, 0.0, 0.0),
        (0.0, 0.0, 0.0, 0.0),
        (0.0, 0.0, 0.0, 0.0),
    )
    connection = lt.levi_civita_connection(potential, partial)
    decomposed = lt.lindgren_connection_field_decomposition(potential, partial)
    assert connection[1][0][0] == pytest.approx(-1.0)
    for upper in range(4):
        for mu in range(4):
            for nu in range(4):
                assert decomposed[upper][mu][nu] == pytest.approx(
                    connection[upper][mu][nu]
                )
    acceleration = lt.geodesic_acceleration(connection, (1.0, 0.0, 0.0, 0.0))
    assert acceleration[1] == pytest.approx(1.0)

    proper_time_u0 = 1.0 / math.sqrt(-lt.lindgren_metric(potential)[0][0])
    proper_time_acceleration = lt.geodesic_acceleration(
        connection,
        (proper_time_u0, 0.0, 0.0, 0.0),
    )
    assert proper_time_acceleration[1] == pytest.approx(proper_time_u0**2)


def test_christoffel_s_f_decomposition_locks_indices_sign_and_kappa() -> None:
    potential = (0.2, 0.4, -0.1, 0.0)
    partial = (
        (0.1, -0.3, 0.2, 0.0),
        (0.7, 0.4, -0.6, 0.0),
        (-0.2, 0.5, 0.3, 0.0),
        (0.0, 0.0, 0.0, 0.0),
    )
    kappa = 0.35
    direct = lt.levi_civita_connection(potential, partial, kappa=kappa)
    decomposed = lt.lindgren_connection_field_decomposition(
        potential,
        partial,
        kappa=kappa,
    )
    for upper in range(4):
        for mu in range(4):
            for nu in range(4):
                assert decomposed[upper][mu][nu] == pytest.approx(direct[upper][mu][nu])

    inverse = lt.lindgren_inverse_metric(potential, kappa=kappa)
    field = lt.electromagnetic_field_tensor(partial)
    raised_potential = tuple(
        math.fsum(inverse[upper][sigma] * potential[sigma] for sigma in range(4))
        for upper in range(4)
    )
    raised_field = tuple(
        tuple(
            math.fsum(inverse[upper][sigma] * field[sigma][mu] for sigma in range(4))
            for mu in range(4)
        )
        for upper in range(4)
    )
    for upper in range(4):
        for mu in range(4):
            for nu in range(4):
                symmetric = partial[mu][nu] + partial[nu][mu]
                expected = (
                    0.5
                    * kappa
                    * (
                        raised_potential[upper] * symmetric
                        - potential[nu] * raised_field[upper][mu]
                        - potential[mu] * raised_field[upper][nu]
                    )
                )
                assert direct[upper][mu][nu] == pytest.approx(expected)


def test_weyl_connection_is_not_silently_identified_with_levi_civita() -> None:
    zero_lc: lt.Connection4 = ZERO_RANK3
    metric = lt.MINKOWSKI_METRIC
    connection = lt.weyl_connection(
        zero_lc,
        metric,
        metric,
        (1.0, 0.0, 0.0, 0.0),
    )
    assert connection[0][0][0] == pytest.approx(-1.0)
    assert connection[1][0][1] == pytest.approx(-1.0)
    assert connection[1][0][0] == pytest.approx(0.0)


def test_weyl_connection_and_torsion_residuals_use_same_nontrivial_metric() -> None:
    potential = (0.1, 0.2, 0.0, 0.0)
    partial = (
        (0.0, 0.3, 0.0, 0.0),
        (-0.4, 0.1, 0.0, 0.0),
        (0.0, 0.0, 0.0, 0.0),
        (0.0, 0.0, 0.0, 0.0),
    )
    one_form = (0.2, -0.1, 0.0, 0.0)
    kappa = 0.6
    metric = lt.lindgren_metric(potential, kappa=kappa)
    inverse = lt.lindgren_inverse_metric(potential, kappa=kappa)
    levi_civita = lt.levi_civita_connection(potential, partial, kappa=kappa)
    connection = lt.weyl_connection(levi_civita, metric, inverse, one_form)
    connection_residual = lt.weyl_connection_residual(
        potential,
        partial,
        connection,
        one_form,
        kappa=kappa,
    )
    torsion = lt.torsion_residual(connection)
    partial_metric = lt.partial_lindgren_metric(
        potential,
        partial,
        kappa=kappa,
    )
    lc_metric_compatibility = lt.levi_civita_metric_compatibility_residual(
        partial_metric,
        levi_civita,
        metric,
    )
    nonmetricity = lt.weyl_nonmetricity_residual(
        partial_metric,
        connection,
        metric,
        one_form,
    )
    assert (
        max(
            abs(value)
            for block in connection_residual
            for row in block
            for value in row
        )
        < 1e-13
    )
    assert (
        max(abs(value) for block in torsion for row in block for value in row) < 1e-13
    )
    assert (
        max(
            abs(value)
            for block in lc_metric_compatibility
            for row in block
            for value in row
        )
        < 1e-13
    )
    assert (
        max(abs(value) for block in nonmetricity for row in block for value in row)
        < 1e-13
    )

    wrong_lc = lt.levi_civita_metric_compatibility_residual(
        partial_metric,
        ZERO_RANK3,
        metric,
    )
    assert (
        max(abs(value) for block in wrong_lc for row in block for value in row) > 1e-3
    )


def test_semimetricity_alone_does_not_accept_a_torsionful_connection() -> None:
    torsionful = [[list(row) for row in block] for block in ZERO_RANK3]
    torsionful[1][0][2] = 1.0
    torsionful[2][0][1] = -1.0
    nonmetricity = lt.weyl_nonmetricity_residual(
        ZERO_RANK3,
        torsionful,
        lt.MINKOWSKI_METRIC,
        (0.0, 0.0, 0.0, 0.0),
    )
    torsion = lt.torsion_residual(torsionful)
    assert (
        max(abs(value) for block in nonmetricity for row in block for value in row)
        == 0.0
    )
    assert torsion[1][0][2] == pytest.approx(1.0)


def test_variational_action_and_potential_gme_are_explicit() -> None:
    assert lt.metric_variation_action_density(
        (0.0, 0.0, 0.0, 0.0),
        ZERO_RANK3,
    ) == pytest.approx(0.0)
    gradient = [list(row) for row in ZERO_TENSOR]
    gradient[0][0] = 2.0
    gradient[1][1] = 1.0
    gme = lt.potential_outer_gme_residual(
        (1.0, 2.0, 0.0, 0.0),
        gradient,
        (-2.0, 0.0, 0.0, 0.0),
        lt.MINKOWSKI_METRIC,
    )
    assert gme[0][0] == pytest.approx(-12.0)
    assert gme[0][1] == pytest.approx(-4.0)
    assert gme[1][0] == pytest.approx(-4.0)
    assert gme[1][1] == pytest.approx(2.0)


def test_potential_outer_residual_retains_explicit_kappa_scaling() -> None:
    potential = (0.0, 1.0, 0.0, 0.0)
    laplacian = (0.0, 1.0, 0.0, 0.0)
    for kappa, expected in ((-0.5, -1.0), (0.0, 0.0), (0.5, 1.0), (2.0, 4.0)):
        residual = lt.potential_outer_gme_residual(
            potential,
            ZERO_TENSOR,
            laplacian,
            lt.lindgren_inverse_metric(potential, kappa=kappa),
            kappa=kappa,
        )
        assert residual[1][1] == pytest.approx(expected)


def test_zero_and_negative_kappa_follow_explicit_metric_domains() -> None:
    potential = (0.0, 1.0, 0.0, 0.0)

    assert lt.lindgren_metric(potential, kappa=0.0) == lt.MINKOWSKI_METRIC
    assert lt.lindgren_inverse_metric(potential, kappa=0.0) == lt.MINKOWSKI_METRIC
    assert lt.lindgren_metric_determinant(potential, kappa=0.0) == -1.0
    assert lt.lindgren_volume_element(potential, kappa=0.0) == 1.0
    assert lt.scalar_spacelike_volume_sensitivity(potential[1], kappa=0.0) == 0.0

    negative_metric = lt.lindgren_metric(potential, kappa=-0.25)
    negative_inverse = lt.lindgren_inverse_metric(potential, kappa=-0.25)
    product = _matmul(negative_inverse, negative_metric)
    for row in range(4):
        for column in range(4):
            assert product[row][column] == pytest.approx(1.0 if row == column else 0.0)
    assert lt.lindgren_volume_element(potential, kappa=-0.25) == pytest.approx(
        math.sqrt(0.75)
    )

    # The inverse only needs D != 0, while real volume and its sensitivity use
    # the stricter Lorentzian branch D > 0.
    assert lt.metric_denominator(potential, kappa=-2.0) == pytest.approx(-1.0)
    assert lt.lindgren_inverse_metric(potential, kappa=-2.0)[1][1] == pytest.approx(
        -1.0
    )
    with pytest.raises(ValueError, match="Lorentzian volume"):
        lt.lindgren_volume_element(potential, kappa=-2.0)
    with pytest.raises(ValueError, match="spacelike volume response"):
        lt.scalar_spacelike_volume_sensitivity(1.0, kappa=-2.0)
    with pytest.raises(ValueError, match="singular"):
        lt.lindgren_inverse_metric(potential, kappa=-1.0)


def test_sqrt_kappa_coordinate_is_the_only_positive_kappa_reduction() -> None:
    assert lt.dimensionless_spacelike_coordinate(0.5, kappa=4.0) == 1.0
    for kappa in (0.0, -1.0):
        with pytest.raises(ValueError, match="kappa must be positive"):
            lt.dimensionless_spacelike_coordinate(0.5, kappa=kappa)


@pytest.mark.parametrize("kappa", [0.0, -1.0])
def test_three_element_gate_accepts_finite_kappa_on_positive_volume_branch(
    kappa: float,
) -> None:
    result = lt.evaluate_three_element_derivation(
        **_valid_three_element_inputs(kappa=kappa)
    )
    assert result.all_three_satisfied is True


def test_spacelike_h_norm_uses_full_tensor_contraction_and_l2_status() -> None:
    assert lt.spacelike_first_order_h_norm(
        0.5,
        0.4,
        kappa=4.0,
    ) == pytest.approx(0.8)
    assert lt.spacelike_h_norm_reduction_residual(
        0.5,
        0.4,
        kappa=4.0,
    ) == pytest.approx(0.0)
    assert lt.spacelike_h_norm_reduction_residual(
        0.5,
        0.4,
        kappa=-1.0,
    ) == pytest.approx(0.0)


def test_proper_time_normalization_and_affine_scaling_are_explicit() -> None:
    metric = lt.lindgren_metric((0.5, 0.0, 0.0, 0.0))
    tangent = (2.0, 0.0, 0.0, 0.0)
    assert lt.affine_tangent_norm_squared(metric, tangent) == pytest.approx(-3.0)
    velocity = lt.proper_time_normalized_tangent(metric, tangent)
    assert velocity[0] > 0.0
    assert lt.proper_time_normalization_residual(metric, velocity) == pytest.approx(0.0)
    reversed_velocity = lt.proper_time_normalized_tangent(
        metric,
        tuple(-value for value in tangent),
    )
    assert reversed_velocity[0] < 0.0
    for invalid in ((0.0, 1.0, 0.0, 0.0), (1.0, 1.0, 0.0, 0.0)):
        with pytest.raises(ValueError, match="timelike tangent"):
            lt.proper_time_normalized_tangent(lt.MINKOWSKI_METRIC, invalid)


def test_jacobi_operator_locks_index_order_sign_and_affine_scaling() -> None:
    curvature = [
        [[[0.0 for _ in range(4)] for _ in range(4)] for _ in range(4)]
        for _ in range(4)
    ]
    curvature[1][0][1][0] = 2.0
    separation = (0.0, 3.0, 0.0, 0.0)
    assert lt.jacobi_geodesic_deviation_operator(
        curvature,
        (1.0, 0.0, 0.0, 0.0),
        separation,
    ) == pytest.approx((0.0, -6.0, 0.0, 0.0))
    assert lt.jacobi_geodesic_deviation_operator(
        curvature,
        (2.0, 0.0, 0.0, 0.0),
        separation,
    ) == pytest.approx((0.0, -24.0, 0.0, 0.0))
    with pytest.raises(ValueError, match="four upper-index blocks"):
        lt.jacobi_geodesic_deviation_operator(
            ZERO_RANK4[:3],
            (1.0, 0.0, 0.0, 0.0),
            separation,
        )


def test_variational_field_residual_and_three_way_gate_are_explicit() -> None:
    assert lt.variational_field_equation_residual((0.0, 0.0, 0.0, 0.0)) == (
        0.0,
        0.0,
        0.0,
        0.0,
    )
    assert lt.maxwell_derivation_check(True, True, True) is True
    assert lt.maxwell_derivation_check(True, True, False) is False
    assert lt.maxwell_derivation_check(True, False, True) is False
    assert lt.maxwell_derivation_check(False, True, True) is False
    with pytest.raises(ValueError, match="booleans"):
        lt.maxwell_derivation_check(True, True, 1)  # type: ignore[arg-type]


def test_weyl_semimetricity_uses_the_full_weyl_connection() -> None:
    potential = (0.0, 0.0, 0.0, 0.0)
    metric = lt.lindgren_metric(potential)
    inverse = lt.lindgren_inverse_metric(potential)
    one_form = (0.2, 0.0, 0.0, 0.0)
    connection = lt.weyl_connection(
        ZERO_RANK3,
        metric,
        inverse,
        one_form,
    )
    residual = lt.weyl_nonmetricity_residual(
        ZERO_RANK3,
        connection,
        metric,
        one_form,
    )
    assert (
        max(abs(value) for block in residual for row in block for value in row) < 1e-14
    )


def test_bianchi_is_the_homogeneous_cyclic_identity_not_the_source_equation() -> None:
    closed = [[list(row) for row in block] for block in ZERO_RANK3]
    closed[0][1][2] = 1.0
    closed[0][2][1] = -1.0
    closed[1][0][2] = 1.0
    closed[1][2][0] = -1.0
    assert lt.bianchi_cyclic_residual(closed) == ZERO_RANK3

    broken = [[list(row) for row in block] for block in closed]
    broken[2][0][1] = 0.25
    broken[2][1][0] = -0.25
    detected = lt.bianchi_cyclic_residual(broken)
    assert detected[0][1][2] == pytest.approx(0.25)


def test_bianchi_input_requires_field_tensor_antisymmetry() -> None:
    invalid = [[list(row) for row in block] for block in ZERO_RANK3]
    invalid[0][1][2] = 1.0
    with pytest.raises(ValueError, match="antisymmetric"):
        lt.bianchi_cyclic_residual(invalid)


def test_field_definition_is_checked_separately_from_df() -> None:
    partial = [list(row) for row in ZERO_TENSOR]
    partial[0][1] = 0.75
    partial[1][0] = -0.25
    field = lt.electromagnetic_field_tensor(partial)
    assert lt.electromagnetic_field_definition_residual(field, partial) == ZERO_TENSOR

    inconsistent = [list(row) for row in field]
    inconsistent[0][1] += 0.5
    residual = lt.electromagnetic_field_definition_residual(inconsistent, partial)
    assert residual[0][1] == pytest.approx(0.5)


def test_residual_tolerances_use_their_own_reference_scales() -> None:
    contract = lt.ResidualTolerance(
        absolute=0.1,
        relative=0.2,
        reference_scale=2.0,
        unit="test-unit",
        reference_scale_provenance="fixed before residual evaluation",
    )
    assert contract.threshold == pytest.approx(0.5)
    assert contract.accepts(0.5) is True
    assert contract.accepts(0.500001) is False
    with pytest.raises(ValueError, match="cannot both be zero"):
        lt.ResidualTolerance(
            absolute=0.0,
            relative=0.0,
            reference_scale=1.0,
            unit="test-unit",
            reference_scale_provenance="fixture",
        )
    with pytest.raises(ValueError, match="reference_scale must be positive"):
        lt.ResidualTolerance(
            absolute=1e-3,
            relative=0.0,
            reference_scale=0.0,
            unit="test-unit",
            reference_scale_provenance="fixture",
        )


def test_structured_attestations_require_explicit_provenance() -> None:
    with pytest.raises(ValueError, match="provenance must be a non-empty string"):
        lt.FullEulerLagrangeAttestation(
            verified=True,
            input_bundle_digest=PLACEHOLDER_INPUT_BUNDLE_DIGEST,
            variation_branch=lt.EINSTEIN_HILBERT_BRANCH,
            action_id="EH",
            derivation_id="derivation",
            boundary_condition_id="boundary",
            connection_treatment="LC",
            wave_operator_id="divergence",
            provenance="",
        )
    with pytest.raises(ValueError, match="verified_from_same_field_tensor"):
        lt.FieldTensorDerivativeAttestation(
            verified_from_same_field_tensor=1,  # type: ignore[arg-type]
            input_bundle_digest=PLACEHOLDER_INPUT_BUNDLE_DIGEST,
            field_tensor_id="F",
            derivative_scheme="analytic",
            provenance="fixture",
        )
    with pytest.raises(ValueError, match="64-character SHA-256"):
        _lc_bianchi_attestation(input_bundle_digest="not-a-digest")


def test_input_bundle_digest_is_deterministic_and_public() -> None:
    common = _valid_three_element_inputs()
    expected = common["full_euler_lagrange_attestation"].input_bundle_digest  # type: ignore[union-attr]

    assert _bundle_digest_from_gate_kwargs(common) == expected
    assert _bundle_digest_from_gate_kwargs(common) == expected
    assert "three_element_input_bundle_digest" in lt.__all__


def test_three_element_contract_passes_only_when_every_element_passes() -> None:
    common = _valid_three_element_inputs()
    result = lt.evaluate_three_element_derivation(**common)

    assert result.required_variation_branch == lt.EINSTEIN_HILBERT_BRANCH
    assert result.eh_variation_satisfied is True
    assert result.full_action_derivative_satisfied is True
    assert result.harmonic_metric_satisfied is True
    assert result.background_harmonic_satisfied is True
    assert result.harmonic_decomposition_satisfied is True
    assert result.gme_outer_scaling_satisfied is True
    assert result.einstein_hilbert_formula_satisfied is True
    assert result.metric_gradient_gme_formula_satisfied is True
    assert result.einstein_hilbert_branch_satisfied is True
    assert result.metric_gradient_gme_branch_satisfied is False
    assert result.einstein_hilbert_branch_status == "REQUIRED_BRANCH_SATISFIED"
    assert result.metric_gradient_gme_branch_status == "PARALLEL_L0_BRANCH_NOT_REQUIRED"
    assert result.variational_principle_satisfied is True
    assert result.levi_civita_metric_compatibility_satisfied is True
    assert result.weyl_nonmetricity_satisfied is True
    assert result.weyl_connection_satisfied is True
    assert result.torsion_free_satisfied is True
    assert result.weyl_condition_satisfied is True
    assert result.bianchi_identity_satisfied is True
    assert result.field_definition_satisfied is True
    assert result.field_derivative_provenance_satisfied is True
    assert result.levi_civita_contracted_bianchi_identity_satisfied is True
    assert result.homogeneous_bianchi_identity_satisfied is True
    assert result.all_three_satisfied is True
    assert result.status == "FORMAL_THREE_ELEMENT_INPUT_CONTRACT_SATISFIED"
    assert result.epistemic_status == "L1_CONDITIONAL_INPUT_CONTRACT_SATISFIED"
    assert result.formula_epistemic_status == "L1_CONDITIONAL_FORMULAS"
    assert result.chi_formula_epistemic_status == "L1_DERIVED_FORMULA"
    assert result.spatial_lorentz_to_euclidean_reduction_status == "L2_BRIDGE"
    assert result.contracted_bianchi_connection_kind == "LEVI_CIVITA"
    assert result.l2_bridge_status == "OPEN"
    assert result.physical_validation_claimed is False
    assert result.full_euler_lagrange_verified is True
    assert result.input_bundle_digest == (
        result.full_euler_lagrange_attestation.input_bundle_digest
    )
    assert result.full_euler_lagrange_input_bundle_matched is True
    assert result.full_euler_lagrange_variation_branch_matched is True
    assert result.field_tensor_derivative_input_bundle_matched is True
    assert result.levi_civita_bianchi_input_bundle_matched is True


@pytest.mark.parametrize(
    ("attestation_key", "branch_attribute", "digest_match_attribute"),
    [
        (
            "full_euler_lagrange_attestation",
            "variational_principle_satisfied",
            "full_euler_lagrange_input_bundle_matched",
        ),
        (
            "field_tensor_derivative_attestation",
            "bianchi_identity_satisfied",
            "field_tensor_derivative_input_bundle_matched",
        ),
        (
            "levi_civita_bianchi_attestation",
            "bianchi_identity_satisfied",
            "levi_civita_bianchi_input_bundle_matched",
        ),
    ],
)
def test_each_attestation_rejects_a_wrong_nonempty_input_bundle_digest(
    attestation_key: str,
    branch_attribute: str,
    digest_match_attribute: str,
) -> None:
    common = _valid_three_element_inputs()
    wrong_attestation = replace(
        common[attestation_key],  # type: ignore[arg-type]
        input_bundle_digest=WRONG_INPUT_BUNDLE_DIGEST,
    )
    result = lt.evaluate_three_element_derivation(
        **{**common, attestation_key: wrong_attestation}
    )

    assert getattr(result, digest_match_attribute) is False
    assert getattr(result, branch_attribute) is False
    assert result.all_three_satisfied is False


@pytest.mark.parametrize(
    ("input_name", "replacement"),
    [
        ("potential", (0.0, 0.2, 0.0, 0.0)),
        ("full_action_derivative", (1e-15, 0.0, 0.0, 0.0)),
        (
            "covariant_laplacian_potential_outer",
            ((0.0, 0.0, 0.0, 0.0),) * 3 + ((0.0, 0.0, 0.0, 1e-15),),
        ),
        ("kappa", 0.5),
    ],
)
def test_changing_one_numerical_gate_input_invalidates_all_digests(
    input_name: str,
    replacement: object,
) -> None:
    common = _valid_three_element_inputs()
    changed = {**common, input_name: replacement}
    changed_digest = _bundle_digest_from_gate_kwargs(changed)

    assert changed_digest != _bundle_digest_from_gate_kwargs(common)
    result = lt.evaluate_three_element_derivation(**changed)
    assert result.input_bundle_digest == changed_digest
    assert result.full_euler_lagrange_input_bundle_matched is False
    assert result.field_tensor_derivative_input_bundle_matched is False
    assert result.levi_civita_bianchi_input_bundle_matched is False
    assert result.all_three_satisfied is False


def test_selected_branch_not_action_id_controls_parallel_l0_variations() -> None:
    eh_inputs = _valid_three_element_inputs()
    eh_attestation = replace(
        eh_inputs["full_euler_lagrange_attestation"],  # type: ignore[arg-type]
        action_id="METRIC_GRADIENT_PLUS_SOMETHING",
    )
    eh_result = lt.evaluate_three_element_derivation(
        **{**eh_inputs, "full_euler_lagrange_attestation": eh_attestation}
    )
    assert eh_result.einstein_hilbert_branch_satisfied is True
    assert eh_result.metric_gradient_gme_branch_satisfied is False

    gme_inputs = _valid_three_element_inputs(
        required_variation_branch=lt.METRIC_GRADIENT_GME_BRANCH
    )
    nonzero_einstein = [list(row) for row in ZERO_TENSOR]
    nonzero_einstein[1][1] = 1.0
    gme_inputs["einstein_tensor_contravariant"] = nonzero_einstein
    gme_inputs = _with_rebound_digests(gme_inputs)
    gme_result = lt.evaluate_three_element_derivation(**gme_inputs)
    assert gme_result.eh_variation_satisfied is False
    assert gme_result.einstein_hilbert_formula_satisfied is False
    assert gme_result.metric_gradient_gme_formula_satisfied is True
    assert gme_result.einstein_hilbert_branch_status == (
        "PARALLEL_L0_BRANCH_NOT_REQUIRED"
    )
    assert gme_result.metric_gradient_gme_branch_status == ("REQUIRED_BRANCH_SATISFIED")
    assert gme_result.metric_gradient_gme_branch_satisfied is True
    assert gme_result.all_three_satisfied is True


def test_variation_branch_attestation_must_match_selected_branch() -> None:
    common = _valid_three_element_inputs()
    mismatch = replace(
        common["full_euler_lagrange_attestation"],  # type: ignore[arg-type]
        variation_branch=lt.METRIC_GRADIENT_GME_BRANCH,
    )
    result = lt.evaluate_three_element_derivation(
        **{**common, "full_euler_lagrange_attestation": mismatch}
    )
    assert result.full_euler_lagrange_input_bundle_matched is True
    assert result.full_euler_lagrange_variation_branch_matched is False
    assert result.variational_principle_satisfied is False


def test_boolean_attestation_cannot_replace_numeric_full_el_residual() -> None:
    common = _valid_three_element_inputs()
    common["full_action_derivative"] = (0.0, 1e-3, 0.0, 0.0)
    common = _with_rebound_digests(common)
    result = lt.evaluate_three_element_derivation(**common)

    assert result.full_euler_lagrange_attestation.verified is True
    assert result.full_euler_lagrange_input_bundle_matched is True
    assert result.full_action_derivative_satisfied is False
    assert result.full_euler_lagrange_verified is False
    assert result.variational_principle_satisfied is False
    assert result.all_three_satisfied is False


def test_gme_branch_allows_nonzero_outer_term_when_both_equalities_hold() -> None:
    common = _valid_three_element_inputs(
        required_variation_branch=lt.METRIC_GRADIENT_GME_BRANCH
    )
    outer = [list(row) for row in ZERO_TENSOR]
    outer[1][1] = 0.5
    background = [list(row) for row in ZERO_TENSOR]
    background[1][1] = -0.5
    common.update(
        covariant_laplacian_potential=(0.0, 1.0, 0.0, 0.0),
        covariant_laplacian_potential_outer=outer,
        covariant_laplacian_background_metric=background,
    )
    common = _with_rebound_digests(common)
    result = lt.evaluate_three_element_derivation(**common)

    assert result.potential_gme_product_rule_max_abs == pytest.approx(0.5)
    assert result.potential_outer_max_abs == pytest.approx(0.5)
    assert result.gme_outer_scaling_satisfied is True
    assert result.harmonic_decomposition_satisfied is True
    assert result.background_harmonic_satisfied is False
    assert result.metric_gradient_gme_branch_satisfied is True
    assert result.all_three_satisfied is True


def test_gme_outer_scaling_is_independent_of_harmonic_decomposition() -> None:
    common = _valid_three_element_inputs(
        required_variation_branch=lt.METRIC_GRADIENT_GME_BRANCH
    )
    wrong_outer = [list(row) for row in ZERO_TENSOR]
    wrong_outer[1][1] = 0.75
    cancelling_background = [list(row) for row in ZERO_TENSOR]
    cancelling_background[1][1] = -0.75
    common.update(
        covariant_laplacian_potential=(0.0, 1.0, 0.0, 0.0),
        covariant_laplacian_potential_outer=wrong_outer,
        covariant_laplacian_background_metric=cancelling_background,
    )
    common = _with_rebound_digests(common)
    result = lt.evaluate_three_element_derivation(**common)

    assert result.harmonic_decomposition_satisfied is True
    assert result.gme_outer_scaling_satisfied is False
    assert result.metric_gradient_gme_formula_satisfied is False
    assert result.metric_gradient_gme_branch_satisfied is False


def test_unselected_gme_failure_does_not_fail_selected_eh_branch() -> None:
    common = _valid_three_element_inputs()
    wrong_outer = [list(row) for row in ZERO_TENSOR]
    wrong_outer[0][0] = 1.0
    common["covariant_laplacian_potential_outer"] = wrong_outer
    common = _with_rebound_digests(common)
    result = lt.evaluate_three_element_derivation(**common)

    assert result.metric_gradient_gme_formula_satisfied is False
    assert result.einstein_hilbert_branch_satisfied is True
    assert result.all_three_satisfied is True


def test_three_element_gate_rejects_wrong_weyl_connection_and_torsion() -> None:
    common = _valid_three_element_inputs()
    wrong_connection = [
        [list(row) for row in block]
        for block in common["connection"]  # type: ignore[union-attr]
    ]
    wrong_connection[0][0][0] += 0.25
    wrong_inputs = _with_rebound_digests({**common, "connection": wrong_connection})
    wrong_weyl = lt.evaluate_three_element_derivation(**wrong_inputs)
    assert wrong_weyl.weyl_nonmetricity_satisfied is False
    assert wrong_weyl.weyl_connection_satisfied is False
    assert wrong_weyl.weyl_condition_satisfied is False
    assert wrong_weyl.all_three_satisfied is False

    torsionful_connection = [
        [list(row) for row in block]
        for block in common["connection"]  # type: ignore[union-attr]
    ]
    torsionful_connection[1][0][2] = 1.0
    torsionful_connection[2][0][1] = -1.0
    torsionful_inputs = _with_rebound_digests(
        {**common, "connection": torsionful_connection}
    )
    torsionful = lt.evaluate_three_element_derivation(**torsionful_inputs)
    assert torsionful.torsion_free_satisfied is False
    assert torsionful.weyl_condition_satisfied is False
    assert torsionful.all_three_satisfied is False


def test_three_element_gate_rejects_each_bianchi_failure() -> None:
    common = _valid_three_element_inputs()

    broken_df = [[list(row) for row in block] for block in ZERO_RANK3]
    broken_df[0][1][2] = 0.5
    broken_df[0][2][1] = -0.5
    broken_inputs = _with_rebound_digests({**common, "partial_field_tensor": broken_df})
    broken = lt.evaluate_three_element_derivation(**broken_inputs)
    assert broken.homogeneous_bianchi_identity_satisfied is False
    assert broken.bianchi_identity_satisfied is False

    lc_inputs = _with_rebound_digests(
        {
            **common,
            "levi_civita_covariant_divergence_einstein": (
                0.0,
                1e-3,
                0.0,
                0.0,
            ),
        }
    )
    lc_broken = lt.evaluate_three_element_derivation(**lc_inputs)
    assert lc_broken.levi_civita_contracted_bianchi_identity_satisfied is False
    assert lc_broken.bianchi_identity_satisfied is False


@pytest.mark.parametrize(
    ("attestation_key", "attribute"),
    [
        ("full_euler_lagrange_attestation", "variational_principle_satisfied"),
        ("field_tensor_derivative_attestation", "bianchi_identity_satisfied"),
        ("levi_civita_bianchi_attestation", "bianchi_identity_satisfied"),
    ],
)
def test_false_attestation_fails_its_branch(
    attestation_key: str,
    attribute: str,
) -> None:
    common = _valid_three_element_inputs()
    field_name = (
        "verified"
        if attestation_key == "full_euler_lagrange_attestation"
        else (
            "verified_from_same_field_tensor"
            if attestation_key == "field_tensor_derivative_attestation"
            else "verified_with_levi_civita_connection"
        )
    )
    common[attestation_key] = replace(
        common[attestation_key],  # type: ignore[arg-type]
        **{field_name: False},
    )
    result = lt.evaluate_three_element_derivation(**common)
    assert getattr(result, attribute) is False
    assert result.all_three_satisfied is False


def test_contraction_requires_an_explicit_candidate_response_tensor() -> None:
    identity = (
        (1.0, 0.0, 0.0, 0.0),
        (0.0, 1.0, 0.0, 0.0),
        (0.0, 0.0, 1.0, 0.0),
        (0.0, 0.0, 0.0, 1.0),
    )
    perturbation = lt.metric_perturbation((1.0, 2.0, 0.0, 0.0), (3.0, 4.0, 0.0, 0.0))
    assert lt.contract_tensor(identity, perturbation) == pytest.approx(47.0)
