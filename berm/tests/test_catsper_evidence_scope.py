"""A conference sperm endpoint must not become a channel-specific birth effect."""
from berm.biology.fertilization_cascade import CATSPER_2021_SCOPE, cascade_fertilization_prob
from berm.model import predict_country_year


def test_abstract_scope_preserves_species_protocol_and_incomplete_channel_analysis():
    scope = CATSPER_2021_SCOPE
    assert scope["doi"] == "10.1093/humrep/deab130.035"
    assert scope["publication_type"] == "ESHRE_CONFERENCE_ABSTRACT"
    assert scope["animal_count"] == 50
    assert scope["species"] == "Wistar-Albino rat"
    assert scope["exposure_setting"] == "in vivo"
    assert (scope["frequency_mhz"], scope["hours_per_day"], scope["duration_days"]) == (2100, 1, 28)
    assert scope["intervention_mg_per_kg"] == 1
    assert scope["catsper_gene_analysis_status"] == "ONGOING_AT_ABSTRACT_PUBLICATION"
    assert scope["catsper_specific_intervention"] is False
    assert scope["human_in_vitro_experiment"] is False


def test_diagnostic_exposes_endpoint_boundary_instead_of_calibrated_fertility_claim():
    result = cascade_fertilization_prob(0.5)
    scope = result["evidence_scope"]
    assert scope["significant_endpoints"]["sperm_motility"] == "p < 0.05"
    assert scope["non_significant_endpoints"] == {"mating": "p > 0.05", "live_birth": "p > 0.05"}
    assert scope["fertility_decrement_established"] is False
    assert scope["supports_specific_emf_to_catsper_identification"] is False
    assert result["calibration_status"] == "STRUCTURAL_ONLY"
    assert result["l2_bridge_status"] == "OPEN"
    scope["animal_count"] = 0
    assert cascade_fertilization_prob(0.5)["evidence_scope"]["animal_count"] == 50


def test_evidence_correction_preserves_locked_numerical_comparisons():
    assert cascade_fertilization_prob(0)["adjusted_fert_prob"] == 0.25
    assert predict_country_year("Finland", 2030)["predicted_tfr"] == 1.3209357069197134
