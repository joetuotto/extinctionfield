"""Tests for BERM v19 three-channel model and therapeutic device paradox.

Tests cover:
1. Three-channel exposure model (ELF, IF, RF)
2. COVID paradox resolution
3. Therapeutic device registry
4. Cell size x frequency matrix
5. Alpha parameter calibration
6. Vagus nerve earbud analysis
7. Causal registry new nodes
8. Testing protocol
9. Non-regression: existing v17 tests must still pass
"""

import math
import pytest


class TestThreeChannelExposure:
    """Three-channel frequency-based exposure model."""

    def test_three_channel_returns_all_channels(self):
        from berm.exposure.three_channel import three_channel_exposure
        result = three_channel_exposure("Finland", 2020, "normal")
        assert "ELF" in result
        assert "IF" in result
        assert "RF" in result
        for ch in ("ELF", "IF", "RF"):
            assert "value" in result[ch]
            assert isinstance(result[ch]["value"], float)

    def test_elf_stable_post_electrification(self):
        from berm.exposure.three_channel import _elf_exposure
        elf_1980 = _elf_exposure("Finland", 1980)
        elf_2010 = _elf_exposure("Finland", 2010)
        assert abs(elf_2010 - elf_1980) < 0.15

    def test_if_grows_with_led_adoption(self):
        from berm.exposure.three_channel import _if_exposure
        if_2005 = _if_exposure("Finland", 2005, "office")
        if_2020 = _if_exposure("Finland", 2020, "office")
        assert if_2020 > if_2005 * 2

    def test_if_office_much_higher_than_home(self):
        from berm.exposure.three_channel import _if_exposure
        if_office = _if_exposure("Finland", 2020, "office")
        if_home = _if_exposure("Finland", 2020, "home_only")
        assert if_office > if_home * 3

    def test_rf_grows_with_mobile(self):
        from berm.exposure.three_channel import _rf_exposure
        rf_1990 = _rf_exposure("Finland", 1990)
        rf_2020 = _rf_exposure("Finland", 2020)
        assert rf_2020 > rf_1990 * 5

    def test_covid_lockdown_if_drops(self):
        from berm.exposure.three_channel import three_channel_exposure
        normal = three_channel_exposure("Finland", 2019, "normal")
        lockdown = three_channel_exposure("Finland", 2020, "covid_lockdown")
        assert lockdown["IF"]["value"] < normal["IF"]["value"] * 0.5

    def test_covid_lockdown_rf_rises(self):
        from berm.exposure.three_channel import three_channel_exposure
        normal = three_channel_exposure("Finland", 2019, "normal")
        lockdown = three_channel_exposure("Finland", 2020, "covid_lockdown")
        assert lockdown["RF"]["value"] > normal["RF"]["value"]

    def test_post_covid_hybrid(self):
        from berm.exposure.three_channel import three_channel_exposure
        normal = three_channel_exposure("Finland", 2019, "normal")
        post = three_channel_exposure("Finland", 2023, "post_covid")
        assert post["IF"]["value"] < normal["IF"]["value"]
        assert post["IF"]["value"] > 0

    def test_weighted_exposure_spermatogenesis(self):
        from berm.exposure.three_channel import weighted_exposure
        sperm = weighted_exposure("Finland", 2020, "spermatogenesis")
        assert sperm > 0

    def test_weighted_exposure_unknown_target_raises(self):
        from berm.exposure.three_channel import weighted_exposure
        with pytest.raises(ValueError, match="unknown target"):
            weighted_exposure("Finland", 2020, "nonexistent")

    def test_channel_weights_sum_to_one(self):
        from berm.exposure.three_channel import CHANNEL_WEIGHTS
        for target, weights in CHANNEL_WEIGHTS.items():
            total = sum(weights.values())
            assert abs(total - 1.0) < 1e-10, f"{target} weights sum to {total}"

    def test_model_version_tag(self):
        from berm.exposure.three_channel import three_channel_exposure
        result = three_channel_exposure("Finland", 2020)
        assert result["model_version"] == "v19-diagnostic"

    def test_invalid_if_scenario_raises(self):
        from berm.exposure.three_channel import _if_exposure
        with pytest.raises(ValueError, match="unknown IF scenario"):
            _if_exposure("Finland", 2020, "nonexistent")


class TestCovidParadoxResolution:
    """COVID lockdown paradox resolved by three-channel model."""

    def test_resolution_returns_required_fields(self):
        from berm.exposure.three_channel import covid_paradox_resolution
        result = covid_paradox_resolution("Finland")
        assert result["paradox_resolved"] is True
        assert "IF_change_pct" in result
        assert "RF_change_pct" in result

    def test_if_drops_during_lockdown(self):
        from berm.exposure.three_channel import covid_paradox_resolution
        result = covid_paradox_resolution("Finland")
        assert result["IF_change_pct"] < -30

    def test_rf_rises_during_lockdown(self):
        from berm.exposure.three_channel import covid_paradox_resolution
        result = covid_paradox_resolution("Finland")
        assert result["RF_change_pct"] > 20

    def test_sperm_exposure_drops(self):
        from berm.exposure.three_channel import covid_paradox_resolution
        result = covid_paradox_resolution("Finland")
        assert result["sperm_exposure_change_pct"] < 0

    def test_zhang_2025_consistent(self):
        from berm.exposure.three_channel import covid_paradox_resolution
        result = covid_paradox_resolution("Finland")
        assert result["zhang_2025_consistent"] is True

    def test_two_vs_three_channel_comparison(self):
        from berm.exposure.three_channel import compare_two_vs_three_channel
        result = compare_two_vs_three_channel("Finland", 2020)
        assert "two_channel" in result
        assert "three_channel" in result
        assert result["two_channel"]["combined"] > 0
        assert result["three_channel"]["RF"] > 0


class TestTherapeuticDeviceParadox:
    """FDA-validated therapeutic EMF devices."""

    def test_device_count(self):
        from berm.evidence.therapeutic_device_paradox import THERAPEUTIC_EMF_DEVICES
        assert len(THERAPEUTIC_EMF_DEVICES) >= 8

    def test_all_devices_have_required_fields(self):
        from berm.evidence.therapeutic_device_paradox import THERAPEUTIC_EMF_DEVICES
        for key, device in THERAPEUTIC_EMF_DEVICES.items():
            assert device.key == key
            assert device.name
            assert device.fda_status
            assert device.mechanism
            assert device.biological_target
            assert device.berm_pathway

    def test_ttfields_is_non_thermal(self):
        from berm.evidence.therapeutic_device_paradox import THERAPEUTIC_EMF_DEVICES
        ttf = THERAPEUTIC_EMF_DEVICES["TTFields_GBM"]
        assert ttf.non_thermal is True
        assert ttf.frequency_hz == (100_000.0, 500_000.0)

    def test_fda_frequency_map_sorted(self):
        from berm.evidence.therapeutic_device_paradox import fda_frequency_map
        fmap = fda_frequency_map()
        freqs = [d["freq_low_hz"] for d in fmap]
        assert freqs == sorted(freqs)

    def test_icnirp_contradiction_structure(self):
        from berm.evidence.therapeutic_device_paradox import icnirp_vs_fda_contradiction
        result = icnirp_vs_fda_contradiction()
        assert result["device_count"] >= 7
        assert result["frequency_bands_covered"] == 9
        assert "tdcs_vs_ambient" in result

    def test_tdcs_vs_ambient_field_comparison(self):
        from berm.evidence.therapeutic_device_paradox import icnirp_vs_fda_contradiction
        result = icnirp_vs_fda_contradiction()
        tdcs = result["tdcs_vs_ambient"]
        assert tdcs["therapeutic_field_Vm"] == "0.3-1.0"
        assert tdcs["urban_ambient_field_Vm"] == "0.67-1.51"

    def test_ttfields_cell_size_data(self):
        from berm.evidence.therapeutic_device_paradox import TTFIELDS_FREQUENCY_CELL_SIZE
        gbm = TTFIELDS_FREQUENCY_CELL_SIZE["GBM"]
        assert gbm["freq_kHz"] == 200
        assert gbm["cell_diameter_um"] == 20


class TestCellSizeFrequencyMatrix:
    """Cell size x frequency resonance model."""

    def test_all_berm_target_cells_present(self):
        from berm.biology.cell_size_frequency_matrix import BERM_TARGET_CELLS
        expected = {
            "spermatogonia", "spermatocyte_meiosis", "oocyte",
            "gut_epithelium", "bone_marrow_stem", "insect_cells",
        }
        assert set(BERM_TARGET_CELLS.keys()) == expected

    def test_spermatogonia_highest_vulnerability(self):
        from berm.biology.cell_size_frequency_matrix import vulnerability_score
        assert vulnerability_score("spermatogonia") >= 0.90

    def test_oocyte_moderate_vulnerability(self):
        from berm.biology.cell_size_frequency_matrix import vulnerability_score
        assert 0.2 <= vulnerability_score("oocyte") <= 0.6

    def test_frequency_overlap_spermatogonia(self):
        from berm.biology.cell_size_frequency_matrix import frequency_overlap_with_environment
        result = frequency_overlap_with_environment("spermatogonia")
        assert result["has_overlap"] is True
        assert "LED_driver" in result["overlapping_sources"]

    def test_frequency_overlap_unknown_cell(self):
        from berm.biology.cell_size_frequency_matrix import frequency_overlap_with_environment
        result = frequency_overlap_with_environment("nonexistent")
        assert result["overlap"] is False

    def test_extrapolation_summary(self):
        from berm.biology.cell_size_frequency_matrix import ttfields_extrapolation_summary
        result = ttfields_extrapolation_summary()
        assert "intensity_caveat" in result
        assert "spermatogonia" in result["summary"]

    def test_ttfields_cancer_data(self):
        from berm.biology.cell_size_frequency_matrix import TTFIELDS_CANCER_DATA
        assert TTFIELDS_CANCER_DATA["GBM"]["freq_kHz"] == 200


class TestAlphaCalibration:
    """Alpha parameter from therapeutic devices."""

    def test_all_alpha_entries_present(self):
        from berm.biology.alpha_therapeutic_calibration import ALPHA_FROM_THERAPEUTIC_DEVICES
        expected = {
            "neural_plasticity", "bone_remodeling",
            "bat_disorientation", "cell_division_disruption",
        }
        assert set(ALPHA_FROM_THERAPEUTIC_DEVICES.keys()) == expected

    def test_alpha_values_in_range(self):
        from berm.biology.alpha_therapeutic_calibration import ALPHA_FROM_THERAPEUTIC_DEVICES
        for key, entry in ALPHA_FROM_THERAPEUTIC_DEVICES.items():
            assert 0.0 <= entry.implied_alpha <= 1.0, f"{key}: {entry.implied_alpha}"

    def test_alpha_range_for_known_pathway(self):
        from berm.biology.alpha_therapeutic_calibration import alpha_range_for_pathway
        low, high = alpha_range_for_pathway("HPA_HPG")
        assert 0.0 <= low < high <= 1.0

    def test_alpha_range_for_unknown_pathway(self):
        from berm.biology.alpha_therapeutic_calibration import alpha_range_for_pathway
        low, high = alpha_range_for_pathway("NONEXISTENT")
        assert low == 0.0
        assert high == 1.0

    def test_v17_alpha_comparison(self):
        from berm.biology.alpha_therapeutic_calibration import compare_with_v17_alpha
        result = compare_with_v17_alpha()
        assert result["v17_effective_alpha"] == 0.43
        assert "consistency" in result

    def test_therapeutic_alpha_summary(self):
        from berm.biology.alpha_therapeutic_calibration import therapeutic_alpha_summary
        result = therapeutic_alpha_summary()
        assert "neural_plasticity" in result
        assert result["neural_plasticity"]["alpha"] == 0.30


class TestVagusNerveEarbuds:
    """Vagus nerve earbud analysis."""

    def test_analysis_structure(self):
        from berm.biology.vagus_nerve_earbuds import vagus_earbud_analysis
        result = vagus_earbud_analysis()
        assert "anatomy" in result
        assert "parameter_comparison" in result
        assert "predicted_effects" in result
        assert "testable_prediction" in result
        assert result["status"] == "DIAGNOSTIC_ONLY"

    def test_hrv_prediction(self):
        from berm.biology.vagus_nerve_earbuds import hrv_prediction
        result = hrv_prediction()
        assert result["metric"] == "RMSSD (root mean square of successive RR differences)"
        assert "discriminative_test" in result
        assert len(result["controls"]) >= 5


class TestCausalRegistryV19Nodes:
    """New causal registry nodes for v19."""

    def test_if_mitotic_disruption_node(self):
        from berm.biology.causal_registry import get_causal_node
        node = get_causal_node("IF_MITOTIC_DISRUPTION")
        assert node.layer == "mechanism"
        assert "MALE_SPERM" in node.children

    def test_gpcr_adenosine_node(self):
        from berm.biology.causal_registry import get_causal_node
        node = get_causal_node("GPCR_ADENOSINE")
        assert node.layer == "mechanism"

    def test_vagus_antiinflammatory_node(self):
        from berm.biology.causal_registry import get_causal_node
        node = get_causal_node("VAGUS_ANTIINFLAMMATORY")
        assert node.layer == "mechanism"
        assert "MICROBIOME_OT" in node.children

    def test_legacy_aliases_resolve(self):
        from berm.biology.causal_registry import canonical_node_id
        assert canonical_node_id("TTFields mechanism") == "IF_MITOTIC_DISRUPTION"
        assert canonical_node_id("adenosine receptor") == "GPCR_ADENOSINE"
        assert canonical_node_id("vagus nerve") == "VAGUS_ANTIINFLAMMATORY"


class TestTestingProtocol:
    """v19 testing protocol structure."""

    def test_all_tests_present(self):
        from berm.evidence.testing_protocol_v19 import all_tests
        tests = all_tests()
        assert len(tests) >= 9

    def test_high_priority_tests(self):
        from berm.evidence.testing_protocol_v19 import high_priority_tests
        hp = high_priority_tests()
        assert len(hp) >= 3
        assert all(t.priority == 3 for t in hp)

    def test_test_structure(self):
        from berm.evidence.testing_protocol_v19 import THREE_CHANNEL_TESTS
        for key, test in THREE_CHANNEL_TESTS.items():
            assert test.key == key
            assert test.name
            assert test.hypothesis
            assert test.prediction
            assert test.discriminative


class TestPackageImports:
    """Verify all v19 exports are accessible from top-level package."""

    def test_import_three_channel(self):
        from berm import three_channel_exposure, covid_paradox_resolution
        assert callable(three_channel_exposure)
        assert callable(covid_paradox_resolution)

    def test_import_therapeutic_devices(self):
        from berm import THERAPEUTIC_EMF_DEVICES, fda_frequency_map
        assert len(THERAPEUTIC_EMF_DEVICES) >= 8
        assert callable(fda_frequency_map)

    def test_import_cell_matrix(self):
        from berm import BERM_TARGET_CELLS, TTFIELDS_CANCER_DATA
        assert len(BERM_TARGET_CELLS) >= 6
        assert len(TTFIELDS_CANCER_DATA) >= 7

    def test_import_alpha(self):
        from berm import ALPHA_FROM_THERAPEUTIC_DEVICES, compare_with_v17_alpha
        assert len(ALPHA_FROM_THERAPEUTIC_DEVICES) >= 4

    def test_import_vagus(self):
        from berm import vagus_earbud_analysis, hrv_prediction
        assert callable(vagus_earbud_analysis)

    def test_version_matches_current_package(self):
        import berm
        assert berm.__version__ == "0.20.0"
