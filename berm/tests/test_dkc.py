"""Unit tests for the pure Lindgren-DKC candidate mathematics."""

from __future__ import annotations

import ast
import inspect
import math

import pytest

from berm.stats import dkc


def _parameters(**overrides: object) -> dkc.DKCParameters:
    values: dict[str, object] = {
        "tau_b": 1.0,
        "tau_r": 12.0,
        "alpha": 0.4,
        "gamma": 2.0,
        "x_half": 3.0,
        "hill_n": 2.0,
    }
    values.update(overrides)
    return dkc.DKCParameters(**values)  # type: ignore[arg-type]


def test_2025_metric_expansion_retains_tensor_cross_and_quadratic_terms() -> None:
    background = (1.0, 2.0, 0.0, 0.0)
    external = (3.0, 4.0, 0.0, 0.0)

    delta_g = dkc.metric_perturbation(background, external)

    assert delta_g[0][0] == pytest.approx(15.0)
    assert delta_g[0][1] == pytest.approx(22.0)
    assert delta_g[1][0] == pytest.approx(22.0)
    assert delta_g[1][1] == pytest.approx(32.0)
    assert delta_g[2] == (0.0, 0.0, 0.0, 0.0)


def test_metric_perturbation_and_contraction_preserve_kappa() -> None:
    identity = (
        (1.0, 0.0, 0.0, 0.0),
        (0.0, 1.0, 0.0, 0.0),
        (0.0, 0.0, 1.0, 0.0),
        (0.0, 0.0, 0.0, 1.0),
    )
    background = (1.0, 2.0, 0.0, 0.0)
    external = (3.0, 4.0, 0.0, 0.0)

    scaled = dkc.metric_perturbation(background, external, kappa=0.5)

    assert scaled[0][0] == pytest.approx(7.5)
    assert scaled[0][1] == pytest.approx(11.0)
    assert dkc.contract_metric_perturbation(
        identity,
        background,
        external,
        kappa=0.5,
    ) == pytest.approx(23.5)


def test_tensor_contraction_requires_and_uses_explicit_response_tensor() -> None:
    identity = (
        (1.0, 0.0, 0.0, 0.0),
        (0.0, 1.0, 0.0, 0.0),
        (0.0, 0.0, 1.0, 0.0),
        (0.0, 0.0, 0.0, 1.0),
    )
    delta_g = dkc.metric_perturbation((1.0, 2.0, 0.0, 0.0), (3.0, 4.0, 0.0, 0.0))

    assert dkc.contract_tensor(identity, delta_g) == pytest.approx(47.0)
    assert dkc.contract_metric_perturbation(
        identity,
        (1.0, 2.0, 0.0, 0.0),
        (3.0, 4.0, 0.0, 0.0),
    ) == pytest.approx(47.0)


def test_tensor_inputs_are_validated() -> None:
    with pytest.raises(ValueError, match="four components"):
        dkc.metric_perturbation((1.0, 2.0), (1.0, 2.0))
    with pytest.raises(ValueError, match="finite"):
        dkc.metric_perturbation((1.0, 2.0, 3.0, math.inf), (0.0, 0.0, 0.0, 0.0))


def test_chi_is_l1_geodesic_selection_and_l2_identification_stays_open() -> None:
    assert dkc.lindgren_geodesic_selection(0.0) == 0.0
    assert dkc.lindgren_geodesic_selection(1.0) == pytest.approx(1.0 / math.sqrt(2.0))
    assert dkc.L2_BRIDGE_STATUS == "open"
    documentation = inspect.getdoc(dkc.lindgren_geodesic_selection)
    assert documentation == (
        "L1: χ(Ā) = Ā/√(1+Ā²). Johdettu tilavuuselementin linearisaatiosta."
    )
    module_documentation = inspect.getdoc(dkc)
    assert "directed L1 derivative" in module_documentation
    assert "L2 bridge" in module_documentation
    assert "function of ``|A_bar|``" in module_documentation
    assert "biological closure" not in module_documentation


def test_frequency_weight_and_fertility_sar_multipliers() -> None:
    frequency = dkc.FrequencyWeightInput(
        frequency_mhz=900.0,
        sar_normalized=0.45,
        coupling=0.8,
        modulation=1.0,
    )
    assert frequency.w_l == pytest.approx(0.36)
    assert dkc.w_l(frequency) == pytest.approx(0.36)
    assert dkc.w_l(frequency, fertility_endpoint=True) == pytest.approx(0.36 * 3.5)
    assert dkc.FERTILITY_SAR_MULTIPLIERS == {
        900.0: 3.5,
        1800.0: 2.5,
        2400.0: 2.0,
        3500.0: 1.5,
    }


def test_frequency_weight_inputs_and_supported_fertility_bands_are_validated() -> None:
    with pytest.raises(ValueError, match="between 0 and 1"):
        dkc.FrequencyWeightInput(900.0, 1.1, 0.8, 1.0)
    with pytest.raises(ValueError, match="no fertility SAR multiplier"):
        dkc.fertility_sar_multiplier(700.0)


def test_t1_sigmoid_and_duty_cycle_have_exact_midpoint_and_bounds() -> None:
    assert dkc.smartphone_sigmoid(2011, 2011) == pytest.approx(0.5)
    assert dkc.duty_cycle(2011, 2011) == pytest.approx(0.665)
    assert dkc.duty_cycle(-1e6, 2011) == pytest.approx(0.33)
    assert dkc.duty_cycle(1e6, 2011) == pytest.approx(1.0)
    assert 0.33 <= dkc.duty_cycle(2017, 2011) <= 1.0


@pytest.mark.parametrize(
    ("age", "expected"),
    [
        (-0.001, 5.0),
        (0.0, 4.0),
        (0.999, 4.0),
        (1.0, 3.0),
        (5.999, 3.0),
        (6.0, 2.0),
        (17.999, 2.0),
        (18.0, 1.0),
    ],
)
def test_t3_exact_age_boundaries(age: float, expected: float) -> None:
    assert dkc.age_vulnerability(age) == expected


def test_exponential_kernel_is_normalized_on_available_history() -> None:
    weights = dkc.normalized_exponential_kernel(4, tau=2.0)
    assert len(weights) == 4
    assert sum(weights) == pytest.approx(1.0)
    assert all(weight >= 0.0 for weight in weights)
    assert weights[1] / weights[0] == pytest.approx(math.exp(-0.5))
    assert dkc.normalized_exponential_kernel(1, tau=20.0) == (1.0,)


def test_erlang_kernel_is_bin_integrated_and_normalized_when_truncated() -> None:
    weights = dkc.normalized_erlang_kernel(5, tau=0.5, shape=3)
    assert len(weights) == 5
    assert sum(weights) == pytest.approx(1.0)
    assert all(weight >= 0.0 for weight in weights)
    assert weights[1] > weights[0] > weights[-1]
    assert dkc.normalized_erlang_kernel(1, tau=0.5, shape=3) == (1.0,)


def test_constant_adult_history_is_invariant_to_kernel_and_truncation() -> None:
    exposure = {2000: 2.0, 2001: 2.0, 2002: 2.0}
    result = dkc.evaluate_dkc(
        exposure,
        year=2002,
        birth_year=1970,
        parameters=_parameters(erlang_shape=3),
    )
    short = dkc.evaluate_dkc(
        {2002: 2.0},
        year=2002,
        birth_year=1970,
        parameters=_parameters(erlang_shape=3),
    )

    assert result.fast_convolution == pytest.approx(2.0)
    assert result.vulnerability_weighted_slow_convolution == pytest.approx(2.0)
    assert result.biological_load == pytest.approx(2.0)
    assert short.biological_load == pytest.approx(2.0)
    assert sum(result.fast_weights) == pytest.approx(1.0)
    assert sum(result.slow_weights) == pytest.approx(1.0)


def test_impulse_response_and_alpha_edges_use_only_derived_beta() -> None:
    impulse = {2000: 0.0, 2001: 0.0, 2002: 1.0}
    fast_only_params = _parameters(alpha=1.0)
    slow_only_params = _parameters(alpha=0.0)
    fast_only = dkc.evaluate_dkc(impulse, 2002, 1970, fast_only_params)
    slow_only = dkc.evaluate_dkc(impulse, 2002, 1970, slow_only_params)

    assert fast_only_params.beta == 0.0
    assert slow_only_params.beta == 1.0
    assert fast_only.slow_contribution == 0.0
    assert fast_only.biological_load == pytest.approx(fast_only.fast_weights[0])
    assert slow_only.fast_contribution == 0.0
    assert slow_only.biological_load == pytest.approx(slow_only.slow_weights[0])
    assert "beta" not in inspect.signature(dkc.DKCParameters).parameters
    assert "beta" not in inspect.signature(dkc.evaluate_dkc).parameters


def test_slow_arm_alone_applies_cohort_vulnerability() -> None:
    result = dkc.evaluate_dkc(
        {2002: 1.0},
        year=2002,
        birth_year=2002,
        parameters=_parameters(alpha=0.0),
    )
    assert result.fast_convolution == pytest.approx(1.0)
    assert result.vulnerability_weighted_slow_convolution == pytest.approx(4.0)
    assert result.biological_load == pytest.approx(4.0)


def test_duty_history_multiplies_both_dkc_arms() -> None:
    result = dkc.evaluate_dkc(
        {2000: 2.0},
        year=2000,
        birth_year=1970,
        parameters=_parameters(),
        duty_by_year={2000: 0.5},
    )
    assert result.fast_convolution == pytest.approx(1.0)
    assert result.vulnerability_weighted_slow_convolution == pytest.approx(1.0)
    assert result.biological_load == pytest.approx(1.0)


def test_dkc_rejects_missing_or_negative_history() -> None:
    with pytest.raises(ValueError, match="missing year 2001"):
        dkc.evaluate_dkc({2000: 1.0, 2002: 1.0}, 2002, 1970, _parameters())
    with pytest.raises(ValueError, match="non-negative"):
        dkc.evaluate_dkc({2000: -1.0}, 2000, 1970, _parameters())
    with pytest.raises(ValueError, match="duty history is missing"):
        dkc.evaluate_dkc(
            {2000: 1.0, 2001: 1.0},
            2001,
            1970,
            _parameters(),
            duty_by_year={2001: 1.0},
        )


def test_hill_response_zero_half_and_asymptote() -> None:
    assert dkc.hill_response(0.0, gamma=2.0, x_half=3.0, hill_n=3.0) == 0.0
    assert dkc.hill_response(3.0, gamma=2.0, x_half=3.0, hill_n=3.0) == pytest.approx(
        -1.0
    )
    assert dkc.hill_response(1e12, gamma=2.0, x_half=3.0, hill_n=3.0) == pytest.approx(
        -2.0
    )
    assert dkc.hill_response(4.0, 2.0, 3.0, 3.0) < dkc.hill_response(2.0, 2.0, 3.0, 3.0)


@pytest.mark.parametrize(
    "overrides",
    [
        {"tau_b": 0.0},
        {"tau_b": 5.0, "tau_r": 5.0},
        {"tau_b": 13.0, "tau_r": 12.0},
        {"tau_r": math.inf},
        {"alpha": -0.01},
        {"alpha": 1.01},
        {"gamma": -1.0},
        {"x_half": 0.0},
        {"hill_n": 0.99},
        {"hill_n": 5.01},
        {"erlang_shape": 1},
        {"erlang_shape": 7},
    ],
)
def test_dkc_parameter_validation(overrides: dict[str, object]) -> None:
    with pytest.raises(ValueError):
        _parameters(**overrides)


def test_result_records_candidate_status_and_input_provenance() -> None:
    result = dkc.evaluate_dkc(
        {2024: 1.0},
        2024,
        1990,
        _parameters(),
        input_name="external_technology_proxy",
        input_provenance=("source=fixture", "classification=proxy"),
    )
    assert result.status == "candidate"
    assert result.calculation_enabled is True
    assert result.candidate_outputs_enabled is True
    assert result.field_state_calibrated is True
    assert result.publishes_locked_forecasts is True
    assert result.can_run_uncalibrated is True
    assert result.provenance.can_run_uncalibrated is True
    assert result.provenance.l2_bridge_status == "open"
    assert result.provenance.chi_role.startswith("chi_geo formula is always L1")
    assert "reduction is L2" in result.provenance.chi_role
    assert result.geometric_selection_status == "L1_NOT_EVALUATED"
    assert result.coordinate_identification_status == (
        "L2_REDUCTION_AND_MAPPING_OPEN_UPSTREAM"
    )
    assert result.dkc_kernel_status == "L3_PHENOMENOLOGICAL"
    assert result.endpoint_mapping_status == "L3_PHENOMENOLOGICAL"
    assert result.status_composition == "componentwise_no_weakest_link_collapse"
    assert result.provenance.geometric_selection_status == "L1_NOT_EVALUATED"
    assert result.provenance.coordinate_identification_status == (
        "L2_REDUCTION_AND_MAPPING_OPEN_UPSTREAM"
    )
    assert result.provenance.dkc_kernel_status == "L3_PHENOMENOLOGICAL"
    assert result.provenance.endpoint_mapping_status == "L3_PHENOMENOLOGICAL"
    assert result.provenance.input_name == "external_technology_proxy"
    assert result.provenance.input_provenance == (
        "source=fixture",
        "classification=proxy",
    )


def test_t6_wifi_devices_linear_growth_and_saturation() -> None:
    assert dkc.wifi_devices(2010) == pytest.approx(3.0)
    assert dkc.wifi_devices(2020) == pytest.approx(18.0)
    assert dkc.wifi_devices(2025) == pytest.approx(20.0)
    assert dkc.wifi_devices(1900) == 0.0


def test_t7_power_control_and_two_channel_normalized_adapter() -> None:
    personal = dkc.power_controlled_personal(2.0, ambient_normalized=0.5, eta=1.0)
    assert personal == pytest.approx(1.0)
    total = dkc.two_channel_power_control_proxy(
        ambient=1.0,
        p_tx_max=2.0,
        ambient_normalized=0.5,
        eta=1.0,
        chi_coordinate=0.5,
    )
    assert total == pytest.approx(1.0 + 0.5 / math.sqrt(1.0 + 0.5**2))


def test_t8_network_saturation_limits() -> None:
    assert dkc.network_saturation(0.0, p_max=10.0, n_half=5.0) == 0.0
    assert dkc.network_saturation(5.0, p_max=10.0, n_half=5.0) == pytest.approx(5.0)
    assert dkc.network_saturation(1e12, p_max=10.0, n_half=5.0) == pytest.approx(10.0)


def test_t9_shannon_entropy() -> None:
    assert dkc.shannon_entropy([1.0]) == 0.0
    assert dkc.shannon_entropy([1.0, 1.0]) == pytest.approx(1.0)
    assert dkc.shannon_entropy([1.0, 1.0, 1.0, 1.0]) == pytest.approx(2.0)
    assert dkc.shannon_entropy([0.0, 0.0]) == 0.0


def test_refined_proxy_is_named_and_provenanced_as_not_measured_fieldstate() -> None:
    unity_900 = dkc.FrequencyWeightInput(900.0, 1.0, 1.0, 1.0)
    unity_1800 = dkc.FrequencyWeightInput(1800.0, 1.0, 1.0, 1.0)
    bands = (
        dkc.ProxyBandInput(unity_900, subscriptions=1.0, p_max=1.0, n_half=1.0),
        dkc.ProxyBandInput(unity_1800, subscriptions=1.0, p_max=1.0, n_half=1.0),
    )
    proxy = dkc.refined_exposure_proxy(
        bands,
        lambda_h=0.3,
        broadband_penetration=0.5,
        wifi_device_count=4.0,
        wifi_weight=0.2,
        source_provenance=("synthetic test inputs",),
    )

    assert proxy.band_contributions == pytest.approx((0.5, 0.5))
    assert proxy.spectral_entropy_bits == pytest.approx(1.0)
    assert proxy.complexity_adjusted_mobile == pytest.approx(1.3)
    assert proxy.wifi_component == pytest.approx(0.4)
    assert proxy.value == pytest.approx(1.7)
    assert proxy.name == "refined_national_exposure_proxy_not_measured_fieldstate"
    assert proxy.is_measured_field_state is False
    assert proxy.field_state_calibrated is True
    assert any("not measured FieldState" in entry for entry in proxy.provenance)


def test_t10_seasonal_cv() -> None:
    assert dkc.seasonal_cv(0.15, duty=0.33) == pytest.approx(0.15 * 0.67)
    assert dkc.seasonal_cv(0.15, duty=1.0) == 0.0
    with pytest.raises(ValueError, match="between 0.33 and 1.0"):
        dkc.seasonal_cv(0.15, duty=0.2)


def test_t11_melatonin_ros_synergy() -> None:
    suppression = dkc.melatonin_suppression(night_duty=0.5, pineal_chi=0.8)
    assert suppression == pytest.approx(0.4)
    assert dkc.pathway_synergy(10.0, 0.15, suppression) == pytest.approx(10.6)
    with pytest.raises(ValueError, match="between 0.1 and 0.3"):
        dkc.pathway_synergy(10.0, 0.09, suppression)
    with pytest.raises(ValueError, match="between 0.1 and 0.3"):
        dkc.pathway_synergy(10.0, 0.31, suppression)


def test_t12_requires_an_explicit_parent_load_and_does_not_infer_genealogy() -> None:
    assert dkc.parent_adjusted_load(
        2.0, parent_load=5.0, epsilon_epi=0.1
    ) == pytest.approx(2.5)
    with pytest.raises(TypeError):
        dkc.parent_adjusted_load(2.0, epsilon_epi=0.1)  # type: ignore[call-arg]
    with pytest.raises(ValueError, match="between 0.05 and 0.2"):
        dkc.parent_adjusted_load(2.0, parent_load=5.0, epsilon_epi=0.049)
    with pytest.raises(ValueError, match="between 0.05 and 0.2"):
        dkc.parent_adjusted_load(2.0, parent_load=5.0, epsilon_epi=0.201)


def test_refined_orchestrator_executes_t1_through_t12_componentwise() -> None:
    weight = dkc.FrequencyWeightInput(
        frequency_mhz=900.0,
        sar_normalized=0.4,
        coupling=0.5,
        modulation=1.0,
    )
    band = dkc.ProxyBandInput(
        frequency_weight=weight,
        subscriptions=1.0,
        p_max=2.0,
        n_half=1.0,
        fertility_endpoint=True,
    )
    annual = tuple(
        dkc.RefinedAnnualInput(
            year=source_year,
            bands=(band,),
            broadband_penetration=0.5,
            wifi_device_count=2.0,
            personal_tx_max=0.4,
            ambient_normalized=0.5,
            chi_coordinate=0.5,
            source_provenance=(f"fixture-year={source_year}",),
        )
        for source_year in range(2020, 2023)
    )
    parameters = _parameters(erlang_shape=3, hill_n=2.0)

    result = dkc.evaluate_refined_dkc(
        annual,
        year=2022,
        birth_year=1990,
        parameters=parameters,
        smartphone_midpoint_year=2021,
        lambda_h=0.0,
        wifi_weight=0.1,
        power_control_eta=0.5,
        night_duty=0.5,
        pineal_susceptibility=0.8,
        epsilon_synergy=0.15,
        parent_final_load=2.0,
        epsilon_epi=0.1,
        seasonal_cv_baseline=0.2,
        input_provenance=("classification=technology-timing-proxy",),
    )

    expected_proxy = 0.7 + 0.1
    expected_personal = dkc.lindgren_geodesic_selection(0.5) * 0.3
    assert result.annual[0].exposure_proxy.value == pytest.approx(expected_proxy)
    assert result.annual[0].personal_effective == pytest.approx(0.3)
    assert result.annual[0].selected_personal_proxy == pytest.approx(expected_personal)
    assert result.annual[0].combined_proxy == pytest.approx(
        expected_proxy + expected_personal
    )
    assert result.base_dkc.fast_kernel == "erlang"
    assert result.synergy_load == pytest.approx(result.base_load * 1.06)
    assert result.parent_contribution == pytest.approx(0.2)
    assert result.final_load == pytest.approx(result.synergy_load + 0.2)
    assert result.endpoint_delta == pytest.approx(
        dkc.hill_response(result.final_load, 2.0, 3.0, 2.0)
    )
    assert result.seasonal_cv == pytest.approx(
        dkc.seasonal_cv(0.2, result.annual[-1].duty_cycle)
    )
    assert result.implemented_refinements == tuple(
        f"T{number}" for number in range(1, 13)
    )
    assert result.proxy_is_measured_field_state is False
    assert result.geometric_selection_status == "L1_COEFFICIENT_PRESERVED"
    assert result.coordinate_identification_status == "L2_OPEN_EXPLICIT_INPUT"
    assert result.refined_model_status == "L3_PHENOMENOLOGICAL"
    assert result.field_state_calibrated is True
    assert result.publishes_locked_forecasts is True
    assert result.can_run_uncalibrated is True


def test_refined_orchestrator_requires_t4_erlang_and_contiguous_unique_years() -> None:
    weight = dkc.FrequencyWeightInput(900.0, 1.0, 1.0, 1.0)
    band = dkc.ProxyBandInput(weight, subscriptions=1.0, p_max=1.0, n_half=1.0)

    def annual_row(source_year: int) -> dkc.RefinedAnnualInput:
        return dkc.RefinedAnnualInput(
            year=source_year,
            bands=(band,),
            broadband_penetration=0.0,
            wifi_device_count=0.0,
            personal_tx_max=0.0,
            ambient_normalized=0.0,
            chi_coordinate=0.0,
            source_provenance=("fixture",),
        )

    kwargs = {
        "year": 2022,
        "birth_year": 1990,
        "smartphone_midpoint_year": 2021,
        "lambda_h": 0.0,
        "wifi_weight": 0.0,
        "power_control_eta": 0.0,
        "night_duty": 0.0,
        "pineal_susceptibility": 0.0,
        "epsilon_synergy": 0.1,
        "parent_final_load": 0.0,
        "epsilon_epi": 0.05,
        "seasonal_cv_baseline": 0.2,
    }
    with pytest.raises(ValueError, match="requires an Erlang"):
        dkc.evaluate_refined_dkc(
            (annual_row(2022),),
            parameters=_parameters(erlang_shape=None),
            **kwargs,
        )
    with pytest.raises(ValueError, match="contiguous"):
        dkc.evaluate_refined_dkc(
            (annual_row(2020), annual_row(2022)),
            parameters=_parameters(erlang_shape=3),
            **kwargs,
        )
    with pytest.raises(ValueError, match="unique"):
        dkc.evaluate_refined_dkc(
            (annual_row(2022), annual_row(2022)),
            parameters=_parameters(erlang_shape=3),
            **kwargs,
        )


def test_allometric_resonance_and_memory_tau() -> None:
    assert dkc.allometric_resonance_frequency(1.7) == pytest.approx(44.087e6, rel=1e-4)
    assert dkc.allometric_memory_tau(70.0) == pytest.approx(12.0)
    assert dkc.allometric_memory_tau(70.0 / 16.0) == pytest.approx(6.0)


def test_module_does_not_import_legacy_v16() -> None:
    source_tree = ast.parse(inspect.getsource(dkc))
    imported_modules: list[str] = []
    for node in ast.walk(source_tree):
        if isinstance(node, ast.Import):
            imported_modules.extend(alias.name for alias in node.names)
        elif isinstance(node, ast.ImportFrom) and node.module:
            imported_modules.append(node.module)
    assert "berm.v16" not in imported_modules
