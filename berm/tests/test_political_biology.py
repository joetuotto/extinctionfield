"""Comprehensive tests for berm.civilization.political_biology.

Tests validate:
1. Dimension functions: monotonicity, bounds, biomarker sensitivity
2. EMF environments: ordering, modifier application, gradient
3. Ideology classification: natural baseline, pathologized states
4. Urban-rural gradient: polarization, ideology divergence
5. Temporal trajectories: ideology shifts over time
6. Literature-grounded predictions: T→hierarchy, CORT→threat, etc.
"""

from __future__ import annotations

import math

import pytest

from berm.civilization.political_biology import (
    BINDING_FOUNDATIONS,
    DIMENSION_FUNCTIONS,
    ENVIRONMENTS,
    FOUNDATION_VULNERABILITY,
    IDEOLOGY_PROFILES,
    INDIVIDUALIZING_FOUNDATIONS,
    MORAL_FOUNDATION_FUNCTIONS,
    POLICY_DOMAINS,
    RK_TRAIT_FUNCTIONS,
    RK_TRAIT_LABELS,
    RK_TRAIT_SUBSTRATES,
    EMFEnvironment,
    authority_hierarchy,
    collective_action_capacity,
    loyalty_collapse_analysis,
    loyalty_collapse_gradient,
    pathological_universalism_index,
    policy_vulnerability_profile,
    care_harm,
    classify_ideology,
    cognitive_complexity,
    empathy_scope,
    environment_biomarkers,
    environment_comparison,
    environment_profile,
    fairness_reciprocity,
    foundation_collapse_order,
    group_conformity,
    hierarchy_acceptance,
    ideology_trajectory,
    liberty_autonomy,
    loyalty_betrayal,
    moral_breadth,
    moral_distress_index,
    moral_foundations_profile,
    novelty_seeking,
    orientation_profile,
    rk_competition,
    rk_environment_gradient,
    rk_group_loyalty,
    rk_mating_strategy,
    rk_parental_investment,
    rk_sexual_timing,
    rk_strategy_index,
    rk_strategy_profile,
    sanctity_purity,
    threat_sensitivity,
    time_preference,
    urban_rural_gradient,
    reproductive_suppression_index,
    dopaminergic_capture_index,
    time_preference_biological,
    genetic_burn_rate,
    shredder_efficiency,
    iq_shredder_profile,
    iq_shredder_gradient,
    IQ_SHREDDER_LABELS,
    victimhood_identity_index,
    safety_seeking_index,
    external_locus_index,
    cognitive_fragility_index,
    anomic_distress_index,
    moral_compensation_index,
    pathopolites_profile,
    pathopolites_gradient,
    morphological_signal_index,
    dynamic_signal_index,
    cryptic_signal_index,
    obesity_amplification_index,
    signal_perception_capacity,
    pair_signal_compound,
    signal_degradation_profile,
    signal_degradation_gradient,
    SIGNAL_DEGRADATION_FUNCTIONS,
    normative_predation_index,
    institutional_capture_index,
    sterilization_contagion_index,
    behavioral_sink_index,
    behavioral_sink_profile,
    behavioral_sink_gradient,
    BEHAVIORAL_SINK_FUNCTIONS,
    COUNTRY_PROFILES,
    CountryEMFProfile,
    country_emf_index,
    country_predicted_tfr,
    country_berm_analysis,
    cross_country_comparison,
    CALHOUN_PHASE_FUNCTIONS,
    BIOLENINIST_FUNCTIONS,
    REPRODUCTIVE_SPECTRUM_FUNCTIONS,
    PARASITIC_TRANSMISSION_FUNCTIONS,
    CIVILIZATIONAL_SINK_FUNCTIONS,
    calhoun_phase_indicators,
    calhoun_phase,
    calhoun_recovery_potential,
    bioleninist_loyalty_value,
    institutional_competence_decay,
    bioleninist_ratchet_index,
    reproductive_behavior_spectrum,
    effective_fertility_index,
    prenatal_disruption_index,
    endocrine_sexual_disruption_index,
    wolbachia_sterilization_index,
    sacculina_hijacking_index,
    baculovirus_institutional_index,
    disoperator_destruction_index,
    cooperative_group_integrity,
    civilizational_sink_index,
    civilizational_sink_profile,
    civilizational_sink_gradient,
    BEHAVIORAL_IMMUNE_FUNCTIONS,
    SOCIAL_TRANSMISSION_FUNCTIONS,
    behavioral_immune_index,
    destigmatization_index,
    stigma_inversion_index,
    net_behavioral_immunity,
    transmission_resistance,
    recovery_sabotage_index,
    dependency_transmission_index,
    social_contagion_index,
    empathy_weaponization_index,
    active_infection_seeking_index,
    civilizational_transmission_composite,
    civilizational_transmission_profile,
    civilizational_transmission_gradient,
)
from berm.civilization.biomarker_trajectories import biomarker_values_at
from berm.civilization.cultural_energy import compute_biocap


# ── Helpers ──

def _high_markers() -> dict[str, float]:
    return {
        "T": 0.95, "OXT": 0.95, "DA": 0.95, "MEL": 0.95,
        "BDNF": 0.95, "CORT": 0.05, "D": 0.95, "B2": 0.90,
    }


def _low_markers() -> dict[str, float]:
    return {
        "T": 0.20, "OXT": 0.40, "DA": 0.30, "MEL": 0.25,
        "BDNF": 0.35, "CORT": 0.85, "D": 0.40, "B2": 0.50,
    }


def _2025_markers() -> dict[str, float]:
    return biomarker_values_at(2025)


# ── Dimension function bounds ──


class TestDimensionBounds:
    """All dimension functions must return values in [0, 1]."""

    MARKER_SETS = [
        _high_markers(),
        _low_markers(),
        _2025_markers(),
        {"T": 0.0, "OXT": 0.0, "DA": 0.0, "MEL": 0.0,
         "BDNF": 0.0, "CORT": 1.0, "D": 0.0, "B2": 0.0},
        {"T": 1.0, "OXT": 1.0, "DA": 1.0, "MEL": 1.0,
         "BDNF": 1.0, "CORT": 0.0, "D": 1.0, "B2": 1.0},
    ]

    @pytest.mark.parametrize("markers", MARKER_SETS)
    def test_all_dimensions_bounded(self, markers):
        profile = orientation_profile(markers)
        for dim, val in profile.items():
            assert 0.0 <= val <= 1.0, f"{dim} = {val} out of bounds"


# ── Monotonicity: each dimension responds to its primary driver ──


class TestDimensionMonotonicity:

    def test_hierarchy_increases_with_T(self):
        """Hierarchy acceptance must increase as T rises (CORT held)."""
        base = _2025_markers()
        low_t = {**base, "T": 0.20}
        high_t = {**base, "T": 0.90}
        assert hierarchy_acceptance(high_t) > hierarchy_acceptance(low_t)

    def test_hierarchy_decreases_with_CORT(self):
        """Chronic CORT suppresses hierarchy (dual-hormone hypothesis)."""
        base = _2025_markers()
        low_c = {**base, "CORT": 0.10}
        high_c = {**base, "CORT": 0.90}
        assert hierarchy_acceptance(low_c) > hierarchy_acceptance(high_c)

    def test_threat_increases_with_CORT(self):
        base = _2025_markers()
        low_c = {**base, "CORT": 0.10}
        high_c = {**base, "CORT": 0.90}
        assert threat_sensitivity(high_c) > threat_sensitivity(low_c)

    def test_threat_decreases_with_T(self):
        """T buffers threat sensitivity (confidence effect)."""
        base = _2025_markers()
        low_t = {**base, "T": 0.20}
        high_t = {**base, "T": 0.90}
        assert threat_sensitivity(low_t) > threat_sensitivity(high_t)

    def test_novelty_increases_with_DA(self):
        base = _2025_markers()
        low_da = {**base, "DA": 0.20}
        high_da = {**base, "DA": 0.90}
        assert novelty_seeking(high_da) > novelty_seeking(low_da)

    def test_novelty_decreases_with_CORT(self):
        base = _2025_markers()
        low_c = {**base, "CORT": 0.10}
        high_c = {**base, "CORT": 0.90}
        assert novelty_seeking(low_c) > novelty_seeking(high_c)

    def test_time_preference_increases_with_DA_and_BDNF(self):
        base = _2025_markers()
        low = {**base, "DA": 0.20, "BDNF": 0.20}
        high = {**base, "DA": 0.90, "BDNF": 0.90}
        assert time_preference(high) > time_preference(low)

    def test_cognitive_complexity_increases_with_BDNF_and_MEL(self):
        base = _2025_markers()
        low = {**base, "BDNF": 0.20, "MEL": 0.20}
        high = {**base, "BDNF": 0.90, "MEL": 0.90}
        assert cognitive_complexity(high) > cognitive_complexity(low)

    def test_conformity_increases_with_OXT_low_T(self):
        """High OXT + low T → strong conformity."""
        high_conform = {"T": 0.20, "OXT": 0.90, "DA": 0.50,
                        "MEL": 0.50, "BDNF": 0.50, "CORT": 0.60,
                        "D": 0.50, "B2": 0.50}
        low_conform = {"T": 0.90, "OXT": 0.50, "DA": 0.50,
                       "MEL": 0.50, "BDNF": 0.50, "CORT": 0.10,
                       "D": 0.50, "B2": 0.50}
        assert group_conformity(high_conform) > group_conformity(low_conform)

    def test_empathy_scope_broadens_with_BDNF(self):
        """BDNF widens empathy from parochial to universal."""
        base = _2025_markers()
        low_bdnf = {**base, "BDNF": 0.20}
        high_bdnf = {**base, "BDNF": 0.90}
        assert empathy_scope(high_bdnf) > empathy_scope(low_bdnf)

    def test_empathy_scope_narrows_with_CORT(self):
        """Threat contracts empathy to in-group."""
        base = _2025_markers()
        low_c = {**base, "CORT": 0.10}
        high_c = {**base, "CORT": 0.90}
        assert empathy_scope(low_c) > empathy_scope(high_c)


# ── EMF environments ──


class TestEMFEnvironments:

    def test_all_environments_exist(self):
        expected = {"urban_office", "urban_residential", "suburban",
                    "rural", "amish"}
        assert set(ENVIRONMENTS.keys()) == expected

    def test_emf_factor_ordering(self):
        """EMF factor should increase: amish < rural < suburban < urban."""
        factors = [ENVIRONMENTS[e].emf_factor for e in
                   ["amish", "rural", "suburban", "urban_residential",
                    "urban_office"]]
        assert factors == sorted(factors)

    def test_environment_biomarkers_bounded(self):
        """All modified biomarkers must stay in [0, 1]."""
        for env_name in ENVIRONMENTS:
            markers = environment_biomarkers(env_name, 2025)
            for k, v in markers.items():
                assert 0.0 <= v <= 1.0, \
                    f"{env_name}.{k} = {v} out of bounds"

    def test_amish_biocap_highest(self):
        """Amish environment should have the highest BioCap."""
        amish = environment_biomarkers("amish", 2025)
        urban = environment_biomarkers("urban_office", 2025)
        assert compute_biocap(amish) > compute_biocap(urban)

    def test_amish_biocap_near_one(self):
        """Amish BioCap should be close to 1.0 (≈ 0.90+)."""
        amish = environment_biomarkers("amish", 2025)
        bc = compute_biocap(amish)
        assert bc >= 0.85, f"Amish BioCap {bc} too low"

    def test_urban_office_biocap_lowest(self):
        """Urban office should have the lowest BioCap."""
        biocaps = {env: compute_biocap(environment_biomarkers(env, 2025))
                   for env in ENVIRONMENTS}
        assert biocaps["urban_office"] == min(biocaps.values())

    def test_modifier_preserves_ordering(self):
        """Across environments, T should decline monotonically with EMF."""
        t_values = [environment_biomarkers(e, 2025)["T"] for e in
                    ["amish", "rural", "suburban", "urban_residential",
                     "urban_office"]]
        assert t_values == sorted(t_values, reverse=True)

    def test_melatonin_urban_rural_gap(self):
        """Urban melatonin should be significantly lower than rural."""
        rural_mel = environment_biomarkers("rural", 2025)["MEL"]
        urban_mel = environment_biomarkers("urban_office", 2025)["MEL"]
        gap = rural_mel - urban_mel
        assert gap > 0.05, f"MEL gap {gap} too small"

    def test_cortisol_urban_higher(self):
        """Urban cortisol should be higher than rural."""
        rural_cort = environment_biomarkers("rural", 2025)["CORT"]
        urban_cort = environment_biomarkers("urban_office", 2025)["CORT"]
        assert urban_cort > rural_cort

    def test_unknown_environment_raises(self):
        with pytest.raises(KeyError):
            environment_biomarkers("mars_colony", 2025)


# ── Ideology classification ──


class TestIdeologyClassification:

    def test_natural_baseline_is_pragmatic_localism(self):
        """Pre-industrial/Amish profile should classify as natural baseline."""
        profile = environment_profile("amish", 2025)
        assert profile["dominant_ideology"]["primary"] == "pragmatic_localism"

    def test_natural_baseline_lowest_pathologization(self):
        """Amish should have the lowest pathologization score."""
        comparison = environment_comparison(2025)
        assert comparison[0]["environment"] == "amish"

    def test_urban_office_highest_pathologization(self):
        """Urban office should have the highest pathologization."""
        comparison = environment_comparison(2025)
        assert comparison[-1]["environment"] == "urban_office"

    def test_pathologization_increases_with_emf(self):
        """Pathologization should correlate with EMF factor."""
        comparison = environment_comparison(2025)
        patho_order = [r["environment"] for r in comparison]
        assert patho_order.index("amish") < patho_order.index("rural")
        assert patho_order.index("rural") < patho_order.index("urban_office")

    def test_all_ideologies_have_strategies(self):
        """Every ideology profile must have a non-empty strategy."""
        for ideo in IDEOLOGY_PROFILES:
            assert len(ideo.biological_strategy) > 20

    def test_classify_returns_required_keys(self):
        profile = orientation_profile(_2025_markers())
        result = classify_ideology(profile)
        assert "primary" in result
        assert "matches" in result
        assert "pathologization" in result

    def test_extreme_low_markers_produce_populism(self):
        """Very low BDNF + DA + high CORT should produce populism."""
        extreme = {
            "T": 0.25, "OXT": 0.50, "DA": 0.25, "MEL": 0.20,
            "BDNF": 0.25, "CORT": 0.90, "D": 0.30, "B2": 0.40,
        }
        profile = orientation_profile(extreme)
        result = classify_ideology(profile)
        matched_names = [m["ideology"] for m in result["matches"]]
        assert "populism" in matched_names


# ── Literature-grounded predictions ──


class TestLiteraturePredictions:
    """Tests derived from specific published findings."""

    def test_petersen_2013_strong_men_hierarchy(self):
        """Petersen 2013: strong (high-T) men oppose redistribution.

        High T → high hierarchy_acceptance → oppose leveling.
        """
        high_t = {**_2025_markers(), "T": 0.90}
        low_t = {**_2025_markers(), "T": 0.25}
        assert hierarchy_acceptance(high_t) > 0.5
        assert hierarchy_acceptance(low_t) < 0.35

    def test_oxley_2008_threat_conservatism(self):
        """Oxley 2008: high threat response → protective/defensive policy.

        High CORT should produce high threat_sensitivity.
        """
        high_threat = {**_2025_markers(), "CORT": 0.85, "T": 0.30}
        assert threat_sensitivity(high_threat) > 0.5

    def test_settle_2010_dopamine_openness(self):
        """Settle 2010: DRD4-7R + social → liberal.

        High DA → high novelty_seeking. Model should show this.
        """
        high_da = {**_2025_markers(), "DA": 0.90, "CORT": 0.20}
        low_da = {**_2025_markers(), "DA": 0.30, "CORT": 0.20}
        assert novelty_seeking(high_da) > 0.6
        assert novelty_seeking(low_da) < 0.35

    def test_de_dreu_2011_oxt_parochialism(self):
        """De Dreu 2011: OXT promotes ethnocentrism, not universal love.

        High OXT + low BDNF → narrow empathy (parochial).
        High OXT + high BDNF → broad empathy (universal).
        """
        parochial = {**_2025_markers(), "OXT": 0.90, "BDNF": 0.20,
                     "CORT": 0.60}
        universal = {**_2025_markers(), "OXT": 0.90, "BDNF": 0.90,
                     "CORT": 0.10}
        assert empathy_scope(universal) > empathy_scope(parochial)
        gap = empathy_scope(universal) - empathy_scope(parochial)
        assert gap > 0.15, f"Parochial-universal gap {gap} too small"

    def test_welling_2025_testosterone_red_shift(self):
        """Welling 2025 RCT: exogenous T shifts Democrats conservative.

        Raising T should increase hierarchy_acceptance and decrease
        threat_sensitivity — a rightward shift on both axes.
        """
        baseline = {**_2025_markers(), "T": 0.45}
        boosted = {**_2025_markers(), "T": 0.70}
        assert hierarchy_acceptance(boosted) > hierarchy_acceptance(baseline)
        assert threat_sensitivity(boosted) < threat_sensitivity(baseline)

    def test_bratsberg_2018_cognitive_decline(self):
        """Bratsberg 2018: Flynn reversal reduces abstract reasoning.

        Lower BDNF → lower cognitive_complexity → populism threshold.
        """
        pre_reversal = {**_2025_markers(), "BDNF": 0.90, "MEL": 0.85}
        post_reversal = {**_2025_markers(), "BDNF": 0.55, "MEL": 0.45}
        assert cognitive_complexity(pre_reversal) > 0.7
        assert cognitive_complexity(post_reversal) < 0.55

    def test_dual_hormone_hypothesis(self):
        """Mehta & Josephs 2010: T predicts dominance ONLY when CORT low.

        High T + high CORT → suppressed hierarchy_acceptance.
        High T + low CORT → high hierarchy_acceptance.
        """
        high_t_low_c = {**_2025_markers(), "T": 0.85, "CORT": 0.10}
        high_t_high_c = {**_2025_markers(), "T": 0.85, "CORT": 0.85}
        diff = hierarchy_acceptance(high_t_low_c) - hierarchy_acceptance(high_t_high_c)
        assert diff > 0.15, f"Dual-hormone effect {diff} too weak"

    def test_sleep_deprivation_heuristic_simplification(self):
        """Killgore 2006: sleep deprivation degrades moral reasoning.

        Low MEL → low cognitive_complexity → simplified heuristics.
        """
        rested = {**_2025_markers(), "MEL": 0.90, "BDNF": 0.80}
        deprived = {**_2025_markers(), "MEL": 0.25, "BDNF": 0.80}
        assert cognitive_complexity(rested) > cognitive_complexity(deprived)


# ── Urban-rural gradient ──


class TestUrbanRuralGradient:

    def test_gradient_returns_all_environments(self):
        result = urban_rural_gradient(2025)
        envs = [p["environment"] for p in result["gradient"]]
        assert envs == ["rural", "suburban", "urban_residential",
                        "urban_office"]

    def test_polarization_positive(self):
        """There must be measurable polarization between environments."""
        result = urban_rural_gradient(2025)
        assert result["polarization_index"] > 0.05

    def test_ideology_divergence_2025(self):
        """Urban and rural should produce different ideologies in 2025."""
        result = urban_rural_gradient(2025)
        assert result["ideology_divergence"] is True

    def test_gradient_biocap_decreasing(self):
        """BioCap should decrease from rural to urban office."""
        result = urban_rural_gradient(2025)
        biocaps = [p["biocap"] for p in result["gradient"]]
        assert biocaps == sorted(biocaps, reverse=True)

    def test_rural_less_pathologized_than_urban(self):
        result = urban_rural_gradient(2025)
        rural_p = result["gradient"][0]["dominant_ideology"]["pathologization"]
        urban_p = result["gradient"][-1]["dominant_ideology"]["pathologization"]
        assert rural_p < urban_p


# ── Ideology trajectory ──


class TestIdeologyTrajectory:

    def test_trajectory_length(self):
        traj = ideology_trajectory("suburban", 1950, 2060, 10)
        assert len(traj) == 11  # 1950, 1960, ..., 2050

    def test_pathologization_increases_over_time(self):
        """Pathologization should generally increase from 1950 to 2050."""
        traj = ideology_trajectory("suburban", 1950, 2060, 10)
        early = traj[0]["pathologization"]
        late = traj[-1]["pathologization"]
        assert late > early

    def test_biocap_decreases_over_time(self):
        traj = ideology_trajectory("suburban", 1950, 2060, 10)
        early = traj[0]["biocap"]
        late = traj[-1]["biocap"]
        assert late < early

    def test_1950_closer_to_natural_than_2050(self):
        """1950 suburban should be less pathologized than 2050."""
        traj = ideology_trajectory("suburban", 1950, 2060, 10)
        assert traj[0]["pathologization"] < traj[-1]["pathologization"]

    def test_hierarchy_declines_over_time(self):
        """As T drops historically, hierarchy acceptance should decline."""
        traj = ideology_trajectory("suburban", 1950, 2060, 10)
        early_h = traj[0]["hierarchy_acceptance"]
        late_h = traj[-1]["hierarchy_acceptance"]
        assert late_h < early_h

    def test_threat_sensitivity_rises_over_time(self):
        """As CORT rises, threat sensitivity should increase."""
        traj = ideology_trajectory("suburban", 1950, 2060, 10)
        early_t = traj[0]["threat_sensitivity"]
        late_t = traj[-1]["threat_sensitivity"]
        assert late_t > early_t

    def test_cognitive_complexity_declines(self):
        """BDNF + MEL decline → cognitive complexity drops."""
        traj = ideology_trajectory("suburban", 1950, 2060, 10)
        early = traj[0]["cognitive_complexity"]
        late = traj[-1]["cognitive_complexity"]
        assert late < early


# ── Cross-environment consistency ──


class TestCrossEnvironment:

    def test_same_year_different_ideology(self):
        """Amish and urban office at the same year should differ."""
        amish = environment_profile("amish", 2025)
        urban = environment_profile("urban_office", 2025)
        assert amish["dominant_ideology"]["primary"] != \
            urban["dominant_ideology"]["primary"]

    def test_environment_comparison_sorted(self):
        """Comparison should be sorted by pathologization ascending."""
        comp = environment_comparison(2025)
        pathos = [r["dominant_ideology"]["pathologization"] for r in comp]
        assert pathos == sorted(pathos)

    def test_all_environments_produce_profiles(self):
        """Every environment should produce a valid profile."""
        for env in ENVIRONMENTS:
            profile = environment_profile(env, 2025)
            assert "biocap" in profile
            assert "orientation" in profile
            assert "dominant_ideology" in profile
            assert len(profile["orientation"]) == 7

    def test_environment_profiles_all_years(self):
        """Profiles should be computable across the full range."""
        for year in [1950, 1980, 2000, 2025, 2050]:
            for env in ["rural", "suburban", "urban_office"]:
                profile = environment_profile(env, year)
                assert 0.0 <= profile["biocap"] <= 1.0


# ── Zapffe recursion prediction ──


class TestZapffeRecursion:
    """The model must predict its own reception difficulty."""

    def test_cognitive_complexity_below_model_threshold_2025(self):
        """Urban 2025 cognitive complexity should be below the threshold
        needed to process multi-causal biological models (~0.70).
        This is the recursive trap: the population cannot evaluate
        the model that explains its inability to evaluate models.
        """
        urban = environment_biomarkers("urban_office", 2025)
        cc = cognitive_complexity(urban)
        assert cc < 0.70, \
            f"Urban cognitive complexity {cc} too high for recursion"

    def test_amish_can_evaluate_model(self):
        """Amish cognitive complexity should be above model threshold."""
        amish = environment_biomarkers("amish", 2025)
        cc = cognitive_complexity(amish)
        assert cc > 0.70

    def test_threat_sensitivity_blocks_evaluation(self):
        """Urban 2025 threat sensitivity should be high enough to
        trigger Zapffe isolation/anchoring before rational evaluation.
        """
        urban = environment_biomarkers("urban_office", 2025)
        ts = threat_sensitivity(urban)
        assert ts > 0.40, \
            f"Urban threat sensitivity {ts} too low for Zapffe block"

    def test_novelty_seeking_too_low_for_paradigm_challenge(self):
        """Urban 2025 novelty seeking should be below the threshold
        for challenging established paradigms (~0.50).
        """
        urban = environment_biomarkers("urban_office", 2025)
        ns = novelty_seeking(urban)
        assert ns < 0.55, \
            f"Urban novelty seeking {ns} too high — paradigm challenge too easy"


# ── Moral Foundations (Haidt) ──


NATURAL = {
    "T": 0.98, "OXT": 0.97, "DA": 0.96, "MEL": 0.97,
    "BDNF": 0.95, "CORT": 0.08, "D": 0.95, "B2": 0.90,
}
DEGRADED = {
    "T": 0.35, "OXT": 0.45, "DA": 0.50, "MEL": 0.30,
    "BDNF": 0.60, "CORT": 0.80, "D": 0.40, "B2": 0.50,
}


class TestMoralFoundationBounds:
    """All six foundations in [0, 1] for extreme inputs."""

    MARKERS = [
        NATURAL,
        DEGRADED,
        {k: 0.0 for k in NATURAL},
        {k: 1.0 for k in NATURAL},
        {"T": 0.5, "OXT": 0.5, "DA": 0.5, "MEL": 0.5,
         "BDNF": 0.5, "CORT": 0.5, "D": 0.5, "B2": 0.5},
    ]

    @pytest.mark.parametrize("markers", MARKERS)
    def test_all_foundations_bounded(self, markers):
        mf = moral_foundations_profile(markers)
        for name, val in mf.items():
            assert 0.0 <= val <= 1.0, f"{name}={val} out of bounds"


class TestMoralFoundationMonotonicity:
    """Biomarker effects on foundations follow literature predictions."""

    def test_oxt_increases_care(self):
        lo = {**NATURAL, "OXT": 0.30}
        hi = {**NATURAL, "OXT": 0.90}
        assert care_harm(hi) > care_harm(lo)

    def test_da_increases_fairness(self):
        lo = {**NATURAL, "DA": 0.30}
        hi = {**NATURAL, "DA": 0.90}
        assert fairness_reciprocity(hi) > fairness_reciprocity(lo)

    def test_t_increases_authority(self):
        lo = {**NATURAL, "T": 0.30}
        hi = {**NATURAL, "T": 0.90}
        assert authority_hierarchy(hi) > authority_hierarchy(lo)

    def test_oxt_increases_loyalty(self):
        lo = {**NATURAL, "OXT": 0.30}
        hi = {**NATURAL, "OXT": 0.90}
        assert loyalty_betrayal(hi) > loyalty_betrayal(lo)

    def test_da_increases_liberty(self):
        lo = {**NATURAL, "DA": 0.30}
        hi = {**NATURAL, "DA": 0.90}
        assert liberty_autonomy(hi) > liberty_autonomy(lo)

    def test_t_increases_sanctity(self):
        """T provides enforcement capacity for purity norms."""
        lo = {**NATURAL, "T": 0.30}
        hi = {**NATURAL, "T": 0.90}
        assert sanctity_purity(hi) > sanctity_purity(lo)

    def test_cort_reduces_care(self):
        lo = {**NATURAL, "CORT": 0.10}
        hi = {**NATURAL, "CORT": 0.80}
        assert care_harm(lo) > care_harm(hi)

    def test_cort_reduces_liberty(self):
        """Threat suppresses willingness to challenge authority."""
        lo = {**NATURAL, "CORT": 0.10}
        hi = {**NATURAL, "CORT": 0.80}
        assert liberty_autonomy(lo) > liberty_autonomy(hi)

    def test_bdnf_increases_care_scope(self):
        """BDNF broadens care from parochial to universal."""
        lo = {**NATURAL, "BDNF": 0.30}
        hi = {**NATURAL, "BDNF": 0.90}
        assert care_harm(hi) > care_harm(lo)


class TestHaidtGradient:
    """Model predictions match Haidt's empirical findings."""

    def test_amish_full_moral_palette(self):
        """Amish (natural baseline) should have all 6 foundations active."""
        m = environment_biomarkers("amish", 2025)
        mf = moral_foundations_profile(m)
        mb = moral_breadth(mf)
        assert mb["active_count"] == 6
        assert mb["binding_active"] == 3
        assert mb["individualizing_active"] == 3

    def test_rural_full_moral_palette(self):
        """Rural should also have all 6 foundations active."""
        m = environment_biomarkers("rural", 2025)
        mf = moral_foundations_profile(m)
        mb = moral_breadth(mf)
        assert mb["active_count"] == 6

    def test_urban_fewer_foundations(self):
        """Urban should have fewer active foundations than rural."""
        rural_m = environment_biomarkers("rural", 2025)
        urban_m = environment_biomarkers("urban_office", 2025)
        rural_mb = moral_breadth(moral_foundations_profile(rural_m))
        urban_mb = moral_breadth(moral_foundations_profile(urban_m))
        assert urban_mb["active_count"] < rural_mb["active_count"]

    def test_urban_individualizing_over_binding(self):
        """Urban should favor individualizing over binding foundations.

        Graham, Haidt & Nosek 2009: liberals weight Care + Fairness,
        conservatives weight all five-six.
        """
        m = environment_biomarkers("urban_residential", 2025)
        mf = moral_foundations_profile(m)
        binding_avg = sum(mf[k] for k in BINDING_FOUNDATIONS) / 3
        indiv_avg = sum(mf[k] for k in INDIVIDUALIZING_FOUNDATIONS) / 3
        assert indiv_avg > binding_avg, \
            f"Individualizing {indiv_avg:.3f} should exceed binding {binding_avg:.3f}"

    def test_amish_balanced_binding_individualizing(self):
        """Amish should have roughly balanced binding and individualizing."""
        m = environment_biomarkers("amish", 2025)
        mf = moral_foundations_profile(m)
        binding_avg = sum(mf[k] for k in BINDING_FOUNDATIONS) / 3
        indiv_avg = sum(mf[k] for k in INDIVIDUALIZING_FOUNDATIONS) / 3
        assert abs(binding_avg - indiv_avg) < 0.10, \
            f"Amish should be balanced: binding={binding_avg:.3f}, indiv={indiv_avg:.3f}"

    def test_moral_breadth_declines_with_emf(self):
        """Moral breadth should decrease from amish to urban."""
        breadths = []
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env, 2025)
            mf = moral_foundations_profile(m)
            mb = moral_breadth(mf)
            breadths.append(mb["breadth"])
        for i in range(len(breadths) - 1):
            assert breadths[i] >= breadths[i + 1], \
                f"Breadth should decline: {breadths}"

    def test_urban_binding_foundations_lost_first(self):
        """Binding foundations (Loyalty, Authority, Sanctity) should drop
        below threshold before individualizing ones.

        Haidt's key finding: the liberal profile is defined by the LOSS
        of binding foundations, not the gain of individualizing ones.
        """
        m = environment_biomarkers("urban_residential", 2025)
        mf = moral_foundations_profile(m)
        mb = moral_breadth(mf)
        assert mb["binding_active"] <= mb["individualizing_active"], \
            f"Binding {mb['binding_active']} should be <= indiv {mb['individualizing_active']}"

    def test_fairness_highest_in_urban(self):
        """Fairness should be the highest or second-highest foundation
        in urban environments.
        """
        m = environment_biomarkers("urban_office", 2025)
        mf = moral_foundations_profile(m)
        ranked = sorted(mf.items(), key=lambda x: x[1], reverse=True)
        top_two = {ranked[0][0], ranked[1][0]}
        assert "fairness" in top_two, \
            f"Fairness not in top 2: {ranked}"

    def test_sanctity_lowest_in_urban(self):
        """Sanctity should be lowest in urban environments.

        Inbar, Pizarro & Bloom 2009 (N=31,045): disgust sensitivity
        positively correlates with conservatism. Urban liberal profile
        should show minimum sanctity.
        """
        m = environment_biomarkers("urban_office", 2025)
        mf = moral_foundations_profile(m)
        ranked = sorted(mf.items(), key=lambda x: x[1])
        assert ranked[0][0] == "sanctity", \
            f"Sanctity not lowest: {ranked}"

    def test_authority_sanctity_highest_in_amish(self):
        """Authority and Sanctity should be among the highest foundations
        in the natural baseline, reflecting full hierarchy + purity capacity.
        """
        m = environment_biomarkers("amish", 2025)
        mf = moral_foundations_profile(m)
        ranked = sorted(mf.items(), key=lambda x: x[1], reverse=True)
        top_three = {ranked[0][0], ranked[1][0], ranked[2][0]}
        assert "authority" in top_three and "sanctity" in top_three


class TestMoralFoundationsLiterature:
    """Tests grounded in specific published findings."""

    def test_de_dreu_2011_oxt_loyalty_and_derogation(self):
        """De Dreu 2011 (N=280): OXT increases in-group favoritism
        AND out-group derogation. Model: high OXT should produce high
        loyalty AND reduced empathy scope to out-group.
        """
        high_oxt = {**NATURAL, "OXT": 0.95}
        low_oxt = {**NATURAL, "OXT": 0.30}
        assert loyalty_betrayal(high_oxt) > loyalty_betrayal(low_oxt)

    def test_burnham_2007_t_fairness_enforcement(self):
        """Burnham 2007 (N=26): high T → reject unfair offers.
        Model: T should increase fairness enforcement.
        """
        high_t = {**NATURAL, "T": 0.90}
        low_t = {**NATURAL, "T": 0.30}
        assert fairness_reciprocity(high_t) > fairness_reciprocity(low_t)

    def test_inbar_2009_sanctity_conservatism(self):
        """Inbar, Pizarro & Bloom 2009 (N=31,045): disgust sensitivity
        correlates with conservatism. Model: rural (conservative-leaning)
        should have higher sanctity than urban (liberal-leaning).
        """
        rural = environment_biomarkers("rural", 2025)
        urban = environment_biomarkers("urban_office", 2025)
        assert sanctity_purity(rural) > sanctity_purity(urban)

    def test_killgore_2007_sleep_deprivation_moral_judgment(self):
        """Killgore 2007 (N=26): 53h sleep deprivation → more harmful
        judgments deemed appropriate. Model: low MEL should reduce care.
        """
        rested = {**NATURAL, "MEL": 0.95}
        deprived = {**NATURAL, "MEL": 0.20}
        assert care_harm(rested) >= care_harm(deprived)

    def test_hatemi_2014_heritability_implies_biology(self):
        """Hatemi 2014 (N>12,000 twin pairs): ~40% of political ideology
        variance is heritable. Model: identical biomarker profiles should
        produce identical moral foundations.
        """
        mf1 = moral_foundations_profile(NATURAL)
        mf2 = moral_foundations_profile(NATURAL)
        for k in mf1:
            assert mf1[k] == mf2[k]

    def test_environment_profile_includes_moral_foundations(self):
        """environment_profile should include moral_foundations and moral_breadth."""
        p = environment_profile("rural", 2025)
        assert "moral_foundations" in p
        assert "moral_breadth" in p
        assert len(p["moral_foundations"]) == 6
        assert "active_count" in p["moral_breadth"]


# ── Collapse hierarchy tests ──


class TestFoundationCollapseOrder:
    """Verify that foundations collapse in the predicted order."""

    def test_returns_all_six_foundations(self):
        order = foundation_collapse_order()
        foundations = [r["foundation"] for r in order]
        assert len(foundations) == 6
        assert set(foundations) == set(MORAL_FOUNDATION_FUNCTIONS.keys())

    def test_sanctity_most_vulnerable(self):
        """Sanctity should be rank 1 (first to collapse)."""
        order = foundation_collapse_order()
        assert order[0]["foundation"] == "sanctity"
        assert order[0]["rank"] == 1

    def test_fairness_most_resilient(self):
        """Fairness should be rank 6 (last to collapse or never)."""
        order = foundation_collapse_order()
        assert order[-1]["foundation"] == "fairness"
        assert order[-1]["rank"] == 6

    def test_binding_collapse_before_individualizing(self):
        """All binding foundations should collapse before any individualizing."""
        order = foundation_collapse_order()
        binding_ranks = [r["rank"] for r in order if r["binding"]]
        indiv_ranks = [r["rank"] for r in order if not r["binding"]]
        assert max(binding_ranks) < min(indiv_ranks), (
            f"Binding max rank {max(binding_ranks)} >= "
            f"individualizing min rank {min(indiv_ranks)}"
        )

    def test_collapse_envs_are_valid(self):
        """Each collapse environment should be a real environment or None."""
        valid = set(ENVIRONMENTS.keys()) | {None}
        for r in foundation_collapse_order():
            assert r["collapse_environment"] in valid

    def test_sanctity_collapses_at_urban_residential(self):
        """Sanctity (multiplicative) should collapse by urban_residential."""
        order = foundation_collapse_order()
        sanctity = [r for r in order if r["foundation"] == "sanctity"][0]
        assert sanctity["collapse_environment"] == "urban_residential"

    def test_fairness_survives_urban_office(self):
        """Fairness (triple-redundant) should survive even urban_office."""
        order = foundation_collapse_order()
        fairness = [r for r in order if r["foundation"] == "fairness"][0]
        assert fairness["collapse_environment"] is None

    def test_scores_decrease_with_emf(self):
        """Every foundation's score should decrease or stay stable as EMF rises."""
        order = foundation_collapse_order()
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        for r in order:
            scores = [r["scores"][e] for e in envs]
            for i in range(len(scores) - 1):
                assert scores[i] >= scores[i + 1] - 0.001, (
                    f"{r['foundation']}: {envs[i]}={scores[i]} > "
                    f"{envs[i+1]}={scores[i+1]}"
                )

    def test_vulnerability_metadata_present(self):
        """Each result should include vulnerability explanation."""
        for r in foundation_collapse_order():
            assert r["vulnerability"], f"{r['foundation']} missing vulnerability"
            assert r["formula_type"] != "unknown"


class TestMoralDistressIndex:
    """Verify the psychological distress prediction."""

    def test_amish_low_distress(self):
        """Natural baseline should have near-zero distress."""
        markers = environment_biomarkers("amish")
        mf = moral_foundations_profile(markers)
        d = moral_distress_index(mf)
        assert d["distress_index"] < 0.25
        assert d["imbalance"] == 0

    def test_urban_high_distress(self):
        """Urban residential should have elevated distress."""
        markers = environment_biomarkers("urban_residential")
        mf = moral_foundations_profile(markers)
        d = moral_distress_index(mf)
        assert d["distress_index"] > 0.40

    def test_urban_office_highest_distress(self):
        """Urban office should have the highest distress."""
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        distress_vals = []
        for env in envs:
            markers = environment_biomarkers(env)
            mf = moral_foundations_profile(markers)
            d = moral_distress_index(mf)
            distress_vals.append(d["distress_index"])
        for i in range(len(distress_vals) - 1):
            assert distress_vals[i] <= distress_vals[i + 1]

    def test_distress_components_present(self):
        markers = environment_biomarkers("urban_residential")
        mf = moral_foundations_profile(markers)
        d = moral_distress_index(mf)
        assert "harm_hyperactivation" in d["components"]
        assert "anomie" in d["components"]
        assert "meaning_deficit" in d["components"]

    def test_imbalance_positive_in_urban(self):
        """Urban should have more individualizing than binding active."""
        markers = environment_biomarkers("urban_residential")
        mf = moral_foundations_profile(markers)
        d = moral_distress_index(mf)
        assert d["imbalance"] > 0
        assert d["individualizing_active"] > d["binding_active"]

    def test_distress_bounded(self):
        """Distress index should be in [0, 1]."""
        for env in ENVIRONMENTS:
            markers = environment_biomarkers(env)
            mf = moral_foundations_profile(markers)
            d = moral_distress_index(mf)
            assert 0.0 <= d["distress_index"] <= 1.0

    def test_harm_hyperactivation_when_care_exceeds_authority(self):
        """When care > authority, harm hyperactivation should be positive."""
        markers = environment_biomarkers("urban_residential")
        mf = moral_foundations_profile(markers)
        d = moral_distress_index(mf)
        if mf["care"] > mf["authority"]:
            assert d["components"]["harm_hyperactivation"] > 0


# ── r/K reproductive strategy ──


class TestRKTraitBounds:
    """All r/K trait functions must return values in [0, 1]."""

    MARKER_SETS = [
        NATURAL,
        DEGRADED,
        {k: 0.0 for k in NATURAL},
        {k: 1.0 for k in NATURAL},
        {k: 0.5 for k in NATURAL},
    ]

    @pytest.mark.parametrize("markers", MARKER_SETS)
    def test_all_traits_bounded(self, markers):
        profile = rk_strategy_profile(markers)
        for trait, val in profile["traits"].items():
            assert 0.0 <= val <= 1.0, f"{trait} = {val} out of bounds"
        assert 0.0 <= profile["index"] <= 1.0


class TestRKTraitMonotonicity:

    def test_competition_increases_with_T(self):
        lo = {**NATURAL, "T": 0.25}
        hi = {**NATURAL, "T": 0.90}
        assert rk_competition(hi) > rk_competition(lo)

    def test_competition_increases_with_DA(self):
        lo = {**NATURAL, "DA": 0.25}
        hi = {**NATURAL, "DA": 0.90}
        assert rk_competition(hi) > rk_competition(lo)

    def test_competition_decreases_with_CORT(self):
        lo = {**NATURAL, "CORT": 0.10}
        hi = {**NATURAL, "CORT": 0.80}
        assert rk_competition(lo) > rk_competition(hi)

    def test_mating_increases_with_OXT(self):
        lo = {**NATURAL, "OXT": 0.25}
        hi = {**NATURAL, "OXT": 0.90}
        assert rk_mating_strategy(hi) > rk_mating_strategy(lo)

    def test_mating_increases_with_T(self):
        lo = {**NATURAL, "T": 0.25}
        hi = {**NATURAL, "T": 0.90}
        assert rk_mating_strategy(hi) > rk_mating_strategy(lo)

    def test_parenting_increases_with_OXT(self):
        lo = {**NATURAL, "OXT": 0.25}
        hi = {**NATURAL, "OXT": 0.90}
        assert rk_parental_investment(hi) > rk_parental_investment(lo)

    def test_sexual_timing_increases_with_MEL(self):
        lo = {**NATURAL, "MEL": 0.25}
        hi = {**NATURAL, "MEL": 0.90}
        assert rk_sexual_timing(hi) > rk_sexual_timing(lo)

    def test_group_loyalty_increases_with_OXT(self):
        lo = {**NATURAL, "OXT": 0.25}
        hi = {**NATURAL, "OXT": 0.90}
        assert rk_group_loyalty(hi) > rk_group_loyalty(lo)

    def test_group_loyalty_increases_with_T(self):
        lo = {**NATURAL, "T": 0.25}
        hi = {**NATURAL, "T": 0.90}
        assert rk_group_loyalty(hi) > rk_group_loyalty(lo)


class TestRKStrategyGradient:
    """r/K strategy should shift from K to r as EMF increases."""

    def test_amish_K_selected(self):
        markers = environment_biomarkers("amish", 2025)
        profile = rk_strategy_profile(markers)
        assert profile["classification"] == "K-selected"
        assert profile["index"] >= 0.70

    def test_urban_office_r_selected(self):
        markers = environment_biomarkers("urban_office", 2025)
        profile = rk_strategy_profile(markers)
        assert profile["classification"] == "r-selected"
        assert profile["index"] < 0.45

    def test_rk_index_decreases_with_emf(self):
        """r/K index should decrease monotonically from amish to urban."""
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        indices = []
        for env in envs:
            markers = environment_biomarkers(env, 2025)
            indices.append(rk_strategy_index(markers))
        for i in range(len(indices) - 1):
            assert indices[i] >= indices[i + 1], \
                f"r/K index should decrease: {envs[i]}={indices[i]} vs {envs[i+1]}={indices[i+1]}"

    def test_environment_gradient_returns_all_five(self):
        gradient = rk_environment_gradient(2025)
        assert len(gradient) == 5
        envs = [g["environment"] for g in gradient]
        assert envs == ["amish", "rural", "suburban", "urban_residential", "urban_office"]

    def test_all_five_traits_present(self):
        markers = environment_biomarkers("suburban", 2025)
        profile = rk_strategy_profile(markers)
        assert set(profile["traits"].keys()) == {
            "competition", "mating_strategy", "parental_investment",
            "sexual_timing", "group_loyalty",
        }

    def test_substrates_documented(self):
        assert len(RK_TRAIT_SUBSTRATES) == 5
        for trait, subs in RK_TRAIT_SUBSTRATES.items():
            assert len(subs) >= 2

    def test_labels_documented(self):
        assert len(RK_TRAIT_LABELS) == 5
        for trait, labels in RK_TRAIT_LABELS.items():
            assert "r" in labels and "K" in labels

    def test_environment_profile_includes_rk(self):
        """environment_profile should include rk_strategy."""
        p = environment_profile("rural", 2025)
        assert "rk_strategy" in p
        assert "index" in p["rk_strategy"]
        assert "traits" in p["rk_strategy"]

    def test_sexual_timing_matches_melatonin_gradient(self):
        """Sexual timing should track melatonin: amish delayed, urban early."""
        amish = environment_biomarkers("amish", 2025)
        urban = environment_biomarkers("urban_office", 2025)
        assert rk_sexual_timing(amish) > rk_sexual_timing(urban)

    def test_group_loyalty_matches_loyalty_foundation(self):
        """r/K group loyalty and Haidt loyalty should correlate."""
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            markers = environment_biomarkers(env, 2025)
            rk_loyalty = rk_group_loyalty(markers)
            haidt_loyalty = loyalty_betrayal(markers)
            assert abs(rk_loyalty - haidt_loyalty) < 0.15, \
                f"{env}: r/K loyalty {rk_loyalty:.3f} vs Haidt {haidt_loyalty:.3f}"


# ──────────────────────────────────────────────────────────────────────
# Loyalty collapse analysis
# ──────────────────────────────────────────────────────────────────────


class TestCollectiveActionCapacity:
    """Olson's collective action prerequisites across EMF gradient."""

    ENVS = ["amish", "rural", "suburban", "urban_residential", "urban_office"]

    def test_bounds(self):
        for env in self.ENVS:
            m = environment_biomarkers(env, 2025)
            cap = collective_action_capacity(m)
            assert 0.0 <= cap <= 1.0, f"{env}: {cap}"

    def test_monotonic_decrease(self):
        caps = [collective_action_capacity(environment_biomarkers(e, 2025)) for e in self.ENVS]
        for i in range(len(caps) - 1):
            assert caps[i] > caps[i + 1], \
                f"{self.ENVS[i]} ({caps[i]:.3f}) should > {self.ENVS[i+1]} ({caps[i+1]:.3f})"

    def test_amish_highest(self):
        caps = {e: collective_action_capacity(environment_biomarkers(e, 2025)) for e in self.ENVS}
        assert caps["amish"] == max(caps.values())
        assert caps["amish"] > 0.80

    def test_urban_office_lowest(self):
        caps = {e: collective_action_capacity(environment_biomarkers(e, 2025)) for e in self.ENVS}
        assert caps["urban_office"] == min(caps.values())
        assert caps["urban_office"] < 0.50

    def test_urban_less_than_half_amish(self):
        amish = collective_action_capacity(environment_biomarkers("amish", 2025))
        urban = collective_action_capacity(environment_biomarkers("urban_office", 2025))
        assert urban < amish * 0.50


class TestPathologicalUniversalism:
    """PU peaks where binding collapses but individualizing remains."""

    ENVS = ["amish", "rural", "suburban", "urban_residential", "urban_office"]

    def test_bounds(self):
        for env in self.ENVS:
            m = environment_biomarkers(env, 2025)
            pu = pathological_universalism_index(m)
            assert 0.0 <= pu <= 1.0, f"{env}: {pu}"

    def test_amish_near_zero(self):
        m = environment_biomarkers("amish", 2025)
        assert pathological_universalism_index(m) < 0.05

    def test_urban_residential_peak(self):
        """PU should peak at urban_residential — the transition zone."""
        pus = {e: pathological_universalism_index(environment_biomarkers(e, 2025)) for e in self.ENVS}
        assert pus["urban_residential"] > pus["suburban"]
        assert pus["urban_residential"] > pus["urban_office"]
        assert pus["urban_residential"] == max(pus.values())

    def test_threshold_transition(self):
        """The jump from suburban to urban_residential should be large."""
        sub = pathological_universalism_index(environment_biomarkers("suburban", 2025))
        urb = pathological_universalism_index(environment_biomarkers("urban_residential", 2025))
        assert urb > sub * 5, f"suburban={sub:.3f} urban_res={urb:.3f}, should be >5× jump"

    def test_urban_office_drops(self):
        """At very high EMF even Care fails — PU drops from peak."""
        urb_res = pathological_universalism_index(environment_biomarkers("urban_residential", 2025))
        urb_off = pathological_universalism_index(environment_biomarkers("urban_office", 2025))
        assert urb_off < urb_res


class TestPolicyVulnerability:
    """Per-domain policy vulnerability from binding collapse."""

    ENVS = ["amish", "rural", "suburban", "urban_residential", "urban_office"]

    def test_all_domains_present(self):
        m = environment_biomarkers("suburban", 2025)
        pvp = policy_vulnerability_profile(m)
        for domain in POLICY_DOMAINS:
            assert domain in pvp
            assert "vulnerability" in pvp[domain]
            assert "driver" in pvp[domain]
            assert "constraint" in pvp[domain]

    def test_bounds(self):
        for env in self.ENVS:
            m = environment_biomarkers(env, 2025)
            pvp = policy_vulnerability_profile(m)
            for domain, data in pvp.items():
                assert 0.0 <= data["vulnerability"] <= 1.0, f"{env}/{domain}: {data['vulnerability']}"

    def test_immigration_monotonic_increase(self):
        vulns = [
            policy_vulnerability_profile(environment_biomarkers(e, 2025))["immigration"]["vulnerability"]
            for e in self.ENVS
        ]
        for i in range(len(vulns) - 1):
            assert vulns[i] < vulns[i + 1], \
                f"{self.ENVS[i]} ({vulns[i]:.3f}) should < {self.ENVS[i+1]} ({vulns[i+1]:.3f})"

    def test_all_domains_monotonic(self):
        for domain in POLICY_DOMAINS:
            vulns = [
                policy_vulnerability_profile(environment_biomarkers(e, 2025))[domain]["vulnerability"]
                for e in self.ENVS
            ]
            for i in range(len(vulns) - 1):
                assert vulns[i] < vulns[i + 1], \
                    f"{domain}: {self.ENVS[i]} ({vulns[i]:.3f}) should < {self.ENVS[i+1]} ({vulns[i+1]:.3f})"

    def test_amish_low_vulnerability(self):
        pvp = policy_vulnerability_profile(environment_biomarkers("amish", 2025))
        for domain, data in pvp.items():
            assert data["vulnerability"] < 0.25, f"amish/{domain}: {data['vulnerability']}"

    def test_urban_office_high_vulnerability(self):
        pvp = policy_vulnerability_profile(environment_biomarkers("urban_office", 2025))
        for domain, data in pvp.items():
            assert data["vulnerability"] > 0.50, f"urban_office/{domain}: {data['vulnerability']}"


class TestLoyaltyCollapseAnalysis:
    """Comprehensive loyalty collapse analysis integration."""

    ENVS = ["amish", "rural", "suburban", "urban_residential", "urban_office"]

    def test_all_keys_present(self):
        m = environment_biomarkers("suburban", 2025)
        a = loyalty_collapse_analysis(m)
        expected_keys = {
            "loyalty", "care", "boundary_dissolution", "care_dominance",
            "collective_action_capacity", "pathological_universalism",
            "ratchet_velocity", "binding_active", "individualizing_active",
            "policy_vulnerability",
        }
        assert expected_keys == set(a.keys())

    def test_boundary_dissolution_monotonic(self):
        vals = [
            loyalty_collapse_analysis(environment_biomarkers(e, 2025))["boundary_dissolution"]
            for e in self.ENVS
        ]
        for i in range(len(vals) - 1):
            assert vals[i] < vals[i + 1]

    def test_ratchet_velocity_monotonic(self):
        vals = [
            loyalty_collapse_analysis(environment_biomarkers(e, 2025))["ratchet_velocity"]
            for e in self.ENVS
        ]
        for i in range(len(vals) - 1):
            assert vals[i] < vals[i + 1]

    def test_binding_threshold_transition(self):
        """Suburban has all binding active; urban_residential has none."""
        sub = loyalty_collapse_analysis(environment_biomarkers("suburban", 2025))
        urb = loyalty_collapse_analysis(environment_biomarkers("urban_residential", 2025))
        assert sub["binding_active"] == 3
        assert urb["binding_active"] == 0

    def test_care_dominance_increases(self):
        """Care's share of total moral weight increases with EMF."""
        vals = [
            loyalty_collapse_analysis(environment_biomarkers(e, 2025))["care_dominance"]
            for e in self.ENVS
        ]
        assert vals[-1] > vals[0]


class TestLoyaltyCollapseGradient:
    """Full gradient across environments."""

    def test_returns_all_environments(self):
        gradient = loyalty_collapse_gradient()
        envs = [g["environment"] for g in gradient]
        assert envs == ["amish", "rural", "suburban", "urban_residential", "urban_office"]

    def test_gradient_contains_analysis_keys(self):
        gradient = loyalty_collapse_gradient()
        for g in gradient:
            assert "loyalty" in g
            assert "collective_action_capacity" in g
            assert "pathological_universalism" in g
            assert "policy_vulnerability" in g
            assert "environment" in g

    def test_immigration_vulnerability_gradient(self):
        gradient = loyalty_collapse_gradient()
        vulns = [g["policy_vulnerability"]["immigration"]["vulnerability"] for g in gradient]
        assert vulns[0] < 0.20
        assert vulns[-1] > 0.60
        for i in range(len(vulns) - 1):
            assert vulns[i] < vulns[i + 1]

    def test_ratchet_gradient(self):
        gradient = loyalty_collapse_gradient()
        ratchets = [g["ratchet_velocity"] for g in gradient]
        assert ratchets[-1] > ratchets[0] * 10


# ── IQ Shredder tests ──


class TestReproductiveSuppression:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env)
            val = reproductive_suppression_index(m)
            assert 0.0 <= val <= 1.0

    def test_amish_low(self):
        m = environment_biomarkers("amish")
        assert reproductive_suppression_index(m) < 0.15

    def test_urban_high(self):
        m = environment_biomarkers("urban_office")
        assert reproductive_suppression_index(m) > 0.60

    def test_monotonic_increase(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        vals = [reproductive_suppression_index(environment_biomarkers(e)) for e in envs]
        for i in range(len(vals) - 1):
            assert vals[i] < vals[i + 1], f"{envs[i]} >= {envs[i+1]}"

    def test_urban_more_than_5x_amish(self):
        amish = reproductive_suppression_index(environment_biomarkers("amish"))
        urban = reproductive_suppression_index(environment_biomarkers("urban_office"))
        assert urban > amish * 5


class TestDopaminergicCapture:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env)
            val = dopaminergic_capture_index(m)
            assert 0.0 <= val <= 1.0

    def test_amish_low(self):
        m = environment_biomarkers("amish")
        assert dopaminergic_capture_index(m) < 0.10

    def test_urban_high(self):
        m = environment_biomarkers("urban_office")
        assert dopaminergic_capture_index(m) > 0.40

    def test_monotonic_increase(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        vals = [dopaminergic_capture_index(environment_biomarkers(e)) for e in envs]
        for i in range(len(vals) - 1):
            assert vals[i] < vals[i + 1], f"{envs[i]} >= {envs[i+1]}"


class TestTimePrefBiological:
    def test_inverse_of_capacity(self):
        m = environment_biomarkers("suburban")
        tp_cap = time_preference(m)
        tp_bio = time_preference_biological(m)
        assert abs(tp_cap + tp_bio - 1.0) < 1e-4

    def test_urban_higher_discounting(self):
        amish = time_preference_biological(environment_biomarkers("amish"))
        urban = time_preference_biological(environment_biomarkers("urban_office"))
        assert urban > amish * 5


class TestGeneticBurnRate:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env)
            val = genetic_burn_rate(m)
            assert 0.0 <= val <= 1.0

    def test_amish_low(self):
        m = environment_biomarkers("amish")
        assert genetic_burn_rate(m) < 0.10

    def test_urban_high(self):
        m = environment_biomarkers("urban_office")
        assert genetic_burn_rate(m) > 0.55

    def test_exceeds_pure_suppression(self):
        m = environment_biomarkers("urban_office")
        burn = genetic_burn_rate(m)
        suppression = reproductive_suppression_index(m)
        assert burn < suppression, "Burn rate should be weighted average, not exceed suppression"


class TestShredderEfficiency:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env)
            val = shredder_efficiency(m)
            assert 0.0 <= val <= 1.0

    def test_amish_near_zero(self):
        m = environment_biomarkers("amish")
        assert shredder_efficiency(m) < 0.10

    def test_urban_high(self):
        m = environment_biomarkers("urban_office")
        assert shredder_efficiency(m) > 0.50

    def test_monotonic_increase(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        vals = [shredder_efficiency(environment_biomarkers(e)) for e in envs]
        for i in range(len(vals) - 1):
            assert vals[i] < vals[i + 1], f"{envs[i]} >= {envs[i+1]}"

    def test_geometric_mean_property(self):
        m = environment_biomarkers("urban_office")
        eff = shredder_efficiency(m)
        cap = dopaminergic_capture_index(m)
        sup = reproductive_suppression_index(m)
        assert abs(eff - (cap * sup) ** 0.5) < 1e-4


class TestIQShredderProfile:
    def test_all_keys(self):
        m = environment_biomarkers("suburban")
        profile = iq_shredder_profile(m)
        expected = {"reproductive_suppression", "dopaminergic_capture",
                    "time_preference_shift", "genetic_burn_rate",
                    "shredder_efficiency", "biocap", "rk_index"}
        assert set(profile.keys()) == expected

    def test_biocap_inverse_of_shredder(self):
        gradient = iq_shredder_gradient()
        biocaps = [g["biocap"] for g in gradient]
        shredders = [g["shredder_efficiency"] for g in gradient]
        for i in range(len(biocaps) - 1):
            assert biocaps[i] > biocaps[i + 1]
            assert shredders[i] < shredders[i + 1]


class TestIQShredderGradient:
    def test_all_environments(self):
        gradient = iq_shredder_gradient()
        assert len(gradient) == 5
        envs = [g["environment"] for g in gradient]
        assert envs == ["amish", "rural", "suburban", "urban_residential", "urban_office"]

    def test_shredder_10x_range(self):
        gradient = iq_shredder_gradient()
        assert gradient[-1]["shredder_efficiency"] > gradient[0]["shredder_efficiency"] * 5

    def test_labels_dict_complete(self):
        expected = {"reproductive_suppression", "dopaminergic_capture",
                    "time_preference_shift", "genetic_burn_rate", "shredder_efficiency"}
        assert set(IQ_SHREDDER_LABELS.keys()) == expected
        for key, labels in IQ_SHREDDER_LABELS.items():
            assert "label" in labels
            assert "label_fi" in labels
            assert "mechanism" in labels


# ── Pathopolitēs tests ──


class TestVictimhoodIdentity:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env)
            val = victimhood_identity_index(m)
            assert 0.0 <= val <= 1.0

    def test_amish_low(self):
        m = environment_biomarkers("amish")
        assert victimhood_identity_index(m) < 0.25

    def test_urban_high(self):
        m = environment_biomarkers("urban_office")
        assert victimhood_identity_index(m) > 0.60

    def test_monotonic(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        vals = [victimhood_identity_index(environment_biomarkers(e)) for e in envs]
        for i in range(len(vals) - 1):
            assert vals[i] < vals[i + 1]


class TestSafetySeeking:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env)
            val = safety_seeking_index(m)
            assert 0.0 <= val <= 1.0

    def test_amish_low(self):
        m = environment_biomarkers("amish")
        assert safety_seeking_index(m) < 0.10

    def test_urban_high(self):
        m = environment_biomarkers("urban_office")
        assert safety_seeking_index(m) > 0.45

    def test_monotonic(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        vals = [safety_seeking_index(environment_biomarkers(e)) for e in envs]
        for i in range(len(vals) - 1):
            assert vals[i] < vals[i + 1]


class TestExternalLocus:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env)
            val = external_locus_index(m)
            assert 0.0 <= val <= 1.0

    def test_monotonic(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        vals = [external_locus_index(environment_biomarkers(e)) for e in envs]
        for i in range(len(vals) - 1):
            assert vals[i] < vals[i + 1]


class TestCognitiveFragility:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env)
            val = cognitive_fragility_index(m)
            assert 0.0 <= val <= 1.0

    def test_amish_low(self):
        m = environment_biomarkers("amish")
        assert cognitive_fragility_index(m) < 0.10

    def test_urban_high(self):
        m = environment_biomarkers("urban_office")
        assert cognitive_fragility_index(m) > 0.40


class TestAnomicDistress:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env)
            val = anomic_distress_index(m)
            assert 0.0 <= val <= 1.0

    def test_highest_dimension(self):
        m = environment_biomarkers("urban_office")
        profile = pathopolites_profile(m)
        assert profile["anomic_distress"] == max(
            profile["victimhood_identity"],
            profile["safety_seeking"],
            profile["external_locus"],
            profile["cognitive_fragility"],
            profile["anomic_distress"],
            profile["moral_compensation"],
        )


class TestMoralCompensation:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env)
            val = moral_compensation_index(m)
            assert 0.0 <= val <= 1.0

    def test_monotonic(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        vals = [moral_compensation_index(environment_biomarkers(e)) for e in envs]
        for i in range(len(vals) - 1):
            assert vals[i] < vals[i + 1]


class TestPathopolitesProfile:
    def test_all_keys(self):
        m = environment_biomarkers("suburban")
        profile = pathopolites_profile(m)
        expected = {"victimhood_identity", "safety_seeking", "external_locus",
                    "cognitive_fragility", "anomic_distress", "moral_compensation",
                    "pathopolites_index", "moral_distress"}
        assert set(profile.keys()) == expected

    def test_composite_between_min_max(self):
        m = environment_biomarkers("urban_office")
        profile = pathopolites_profile(m)
        dims = [profile["victimhood_identity"], profile["safety_seeking"],
                profile["external_locus"], profile["cognitive_fragility"],
                profile["anomic_distress"], profile["moral_compensation"]]
        assert min(dims) <= profile["pathopolites_index"] <= max(dims)


class TestPathopolitesGradient:
    def test_all_environments(self):
        gradient = pathopolites_gradient()
        assert len(gradient) == 5

    def test_composite_monotonic(self):
        gradient = pathopolites_gradient()
        indices = [g["pathopolites_index"] for g in gradient]
        for i in range(len(indices) - 1):
            assert indices[i] < indices[i + 1]

    def test_urban_more_than_5x_amish(self):
        gradient = pathopolites_gradient()
        assert gradient[-1]["pathopolites_index"] > gradient[0]["pathopolites_index"] * 5


# ── Signal degradation tests ──


class TestMorphologicalSignal:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env)
            assert 0.0 <= morphological_signal_index(m) <= 1.0

    def test_amish_higher_than_urban(self):
        amish = morphological_signal_index(environment_biomarkers("amish"))
        urban = morphological_signal_index(environment_biomarkers("urban_office"))
        assert amish > urban

    def test_monotonically_decreasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        scores = [morphological_signal_index(environment_biomarkers(e)) for e in envs]
        for i in range(len(scores) - 1):
            assert scores[i] >= scores[i + 1]


class TestDynamicSignal:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env)
            assert 0.0 <= dynamic_signal_index(m) <= 1.0

    def test_amish_higher_than_urban(self):
        amish = dynamic_signal_index(environment_biomarkers("amish"))
        urban = dynamic_signal_index(environment_biomarkers("urban_office"))
        assert amish > urban

    def test_monotonically_decreasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        scores = [dynamic_signal_index(environment_biomarkers(e)) for e in envs]
        for i in range(len(scores) - 1):
            assert scores[i] >= scores[i + 1]


class TestCrypticSignal:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env)
            assert 0.0 <= cryptic_signal_index(m) <= 1.0

    def test_amish_higher_than_urban(self):
        amish = cryptic_signal_index(environment_biomarkers("amish"))
        urban = cryptic_signal_index(environment_biomarkers("urban_office"))
        assert amish > urban

    def test_monotonically_decreasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        scores = [cryptic_signal_index(environment_biomarkers(e)) for e in envs]
        for i in range(len(scores) - 1):
            assert scores[i] >= scores[i + 1]


class TestObesityAmplification:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env)
            assert 0.0 <= obesity_amplification_index(m) <= 1.0

    def test_amish_low(self):
        amish = obesity_amplification_index(environment_biomarkers("amish"))
        assert amish < 0.15

    def test_urban_higher(self):
        amish = obesity_amplification_index(environment_biomarkers("amish"))
        urban = obesity_amplification_index(environment_biomarkers("urban_office"))
        assert urban > amish

    def test_monotonically_increasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        scores = [obesity_amplification_index(environment_biomarkers(e)) for e in envs]
        for i in range(len(scores) - 1):
            assert scores[i] <= scores[i + 1]


class TestSignalPerception:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env)
            assert 0.0 <= signal_perception_capacity(m) <= 1.0

    def test_amish_higher(self):
        amish = signal_perception_capacity(environment_biomarkers("amish"))
        urban = signal_perception_capacity(environment_biomarkers("urban_office"))
        assert amish > urban


class TestPairSignalCompound:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env)
            assert 0.0 <= pair_signal_compound(m) <= 1.0

    def test_amish_high(self):
        amish = pair_signal_compound(environment_biomarkers("amish"))
        assert amish > 0.5

    def test_urban_low(self):
        urban = pair_signal_compound(environment_biomarkers("urban_office"))
        assert urban < 0.5

    def test_monotonically_decreasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        scores = [pair_signal_compound(environment_biomarkers(e)) for e in envs]
        for i in range(len(scores) - 1):
            assert scores[i] >= scores[i + 1]

    def test_multiplicative_collapse(self):
        m = {"T": 0.01, "OXT": 0.8, "DA": 0.8, "MEL": 0.8, "BDNF": 0.8, "CORT": 0.2}
        assert pair_signal_compound(m) < 0.3


class TestSignalDegradationProfile:
    def test_all_keys(self):
        m = environment_biomarkers("suburban")
        profile = signal_degradation_profile(m)
        expected_keys = {
            "morphological_signal", "dynamic_signal", "cryptic_signal",
            "total_signal_strength", "signal_degradation",
            "obesity_amplification", "signal_perception", "pair_signal_compound",
        }
        assert set(profile.keys()) == expected_keys

    def test_degradation_complement(self):
        m = environment_biomarkers("suburban")
        profile = signal_degradation_profile(m)
        assert abs(
            profile["total_signal_strength"] + profile["signal_degradation"] - 1.0
        ) < 0.001


class TestSignalDegradationGradient:
    def test_all_environments(self):
        gradient = signal_degradation_gradient()
        assert len(gradient) == 5

    def test_signal_decreases(self):
        gradient = signal_degradation_gradient()
        signals = [g["total_signal_strength"] for g in gradient]
        for i in range(len(signals) - 1):
            assert signals[i] >= signals[i + 1]

    def test_degradation_increases(self):
        gradient = signal_degradation_gradient()
        degradation = [g["signal_degradation"] for g in gradient]
        for i in range(len(degradation) - 1):
            assert degradation[i] <= degradation[i + 1]


class TestSignalDegradationFunctions:
    def test_all_registered(self):
        assert len(SIGNAL_DEGRADATION_FUNCTIONS) == 6
        for name, fn in SIGNAL_DEGRADATION_FUNCTIONS.items():
            m = environment_biomarkers("suburban")
            assert 0.0 <= fn(m) <= 1.0


# ── Behavioral sink tests ──


class TestNormativePredation:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env)
            assert 0.0 <= normative_predation_index(m) <= 1.0

    def test_amish_low(self):
        amish = normative_predation_index(environment_biomarkers("amish"))
        assert amish < 0.05

    def test_urban_higher(self):
        amish = normative_predation_index(environment_biomarkers("amish"))
        urban = normative_predation_index(environment_biomarkers("urban_office"))
        assert urban > amish

    def test_monotonically_increasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        scores = [normative_predation_index(environment_biomarkers(e)) for e in envs]
        for i in range(len(scores) - 1):
            assert scores[i] <= scores[i + 1]


class TestInstitutionalCapture:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env)
            assert 0.0 <= institutional_capture_index(m) <= 1.0

    def test_amish_minimal(self):
        amish = institutional_capture_index(environment_biomarkers("amish"))
        assert amish < 0.10

    def test_urban_substantial(self):
        urban = institutional_capture_index(environment_biomarkers("urban_office"))
        assert urban > 0.10

    def test_nonlinear_threshold(self):
        amish = institutional_capture_index(environment_biomarkers("amish"))
        rural = institutional_capture_index(environment_biomarkers("rural"))
        urban = institutional_capture_index(environment_biomarkers("urban_office"))
        rural_amish_gap = rural - amish
        urban_rural_gap = urban - rural
        assert urban_rural_gap > rural_amish_gap


class TestSterilizationContagion:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env)
            assert 0.0 <= sterilization_contagion_index(m) <= 1.0

    def test_amish_near_zero(self):
        amish = sterilization_contagion_index(environment_biomarkers("amish"))
        assert amish < 0.03

    def test_urban_higher(self):
        amish = sterilization_contagion_index(environment_biomarkers("amish"))
        urban = sterilization_contagion_index(environment_biomarkers("urban_office"))
        assert urban > amish * 5

    def test_monotonically_increasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        scores = [sterilization_contagion_index(environment_biomarkers(e)) for e in envs]
        for i in range(len(scores) - 1):
            assert scores[i] <= scores[i + 1]


class TestBehavioralSink:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env)
            assert 0.0 <= behavioral_sink_index(m) <= 1.0

    def test_amish_low(self):
        amish = behavioral_sink_index(environment_biomarkers("amish"))
        assert amish < 0.10

    def test_urban_higher(self):
        amish = behavioral_sink_index(environment_biomarkers("amish"))
        urban = behavioral_sink_index(environment_biomarkers("urban_office"))
        assert urban > amish


class TestBehavioralSinkProfile:
    def test_all_keys(self):
        m = environment_biomarkers("suburban")
        profile = behavioral_sink_profile(m)
        expected = {"normative_predation", "institutional_capture",
                    "sterilization_contagion", "behavioral_sink"}
        assert set(profile.keys()) == expected


class TestBehavioralSinkGradient:
    def test_all_environments(self):
        gradient = behavioral_sink_gradient()
        assert len(gradient) == 5

    def test_sink_increases(self):
        gradient = behavioral_sink_gradient()
        sinks = [g["behavioral_sink"] for g in gradient]
        for i in range(len(sinks) - 1):
            assert sinks[i] <= sinks[i + 1]


class TestBehavioralSinkFunctions:
    def test_all_registered(self):
        assert len(BEHAVIORAL_SINK_FUNCTIONS) == 4
        for name, fn in BEHAVIORAL_SINK_FUNCTIONS.items():
            m = environment_biomarkers("suburban")
            assert 0.0 <= fn(m) <= 1.0


# ── Cross-country prediction tests ──


class TestCountryProfiles:
    def test_all_countries_have_profiles(self):
        expected = {"south_korea", "japan", "singapore", "finland", "usa",
                    "uk", "france", "sweden", "hungary", "poland"}
        assert set(COUNTRY_PROFILES.keys()) == expected

    def test_all_profiles_valid(self):
        for key, profile in COUNTRY_PROFILES.items():
            assert isinstance(profile, CountryEMFProfile)
            assert 0.0 <= profile.smartphone_penetration <= 1.0
            assert 0.0 <= profile.urbanization_rate <= 1.0
            assert 0.0 <= profile.population_density_factor <= 1.0
            assert 0.0 <= profile.cultural_buffer <= 1.0
            assert profile.tfr_2010 > 0
            assert profile.tfr_latest > 0


class TestCountryEMFIndex:
    def test_bounds(self):
        for key, profile in COUNTRY_PROFILES.items():
            idx = country_emf_index(profile)
            assert 0.0 <= idx <= 1.0

    def test_singapore_high(self):
        idx = country_emf_index(COUNTRY_PROFILES["singapore"])
        assert idx > 0.7

    def test_cultural_buffer_reduces(self):
        japan = COUNTRY_PROFILES["japan"]
        unbuffered = CountryEMFProfile(
            name="Japan_unbuffered",
            mobile_infrastructure_year=japan.mobile_infrastructure_year,
            five_g_year=japan.five_g_year,
            smartphone_penetration=japan.smartphone_penetration,
            urbanization_rate=japan.urbanization_rate,
            population_density_factor=japan.population_density_factor,
            obesity_rate=japan.obesity_rate,
            tfr_2010=japan.tfr_2010,
            tfr_latest=japan.tfr_latest,
            cultural_buffer=0.0,
        )
        assert country_emf_index(japan) < country_emf_index(unbuffered)


class TestCountryPredictedTFR:
    def test_all_positive(self):
        for key, profile in COUNTRY_PROFILES.items():
            tfr = country_predicted_tfr(profile)
            assert tfr >= 0.5

    def test_high_emf_lower_tfr(self):
        sg_tfr = country_predicted_tfr(COUNTRY_PROFILES["singapore"])
        hu_tfr = country_predicted_tfr(COUNTRY_PROFILES["hungary"])
        assert sg_tfr < hu_tfr


class TestCountryBERMAnalysis:
    def test_all_countries_analyzable(self):
        for key in COUNTRY_PROFILES:
            analysis = country_berm_analysis(key)
            assert "emf_index" in analysis
            assert "predicted_tfr" in analysis
            assert "actual_tfr" in analysis
            assert "prediction_error" in analysis

    def test_unknown_country_raises(self):
        with pytest.raises(ValueError):
            country_berm_analysis("atlantis")

    def test_prediction_error_bounded(self):
        for key in COUNTRY_PROFILES:
            analysis = country_berm_analysis(key)
            assert analysis["prediction_error"] < 1.5


class TestCrossCountryComparison:
    def test_all_countries_included(self):
        comparison = cross_country_comparison()
        assert len(comparison) == len(COUNTRY_PROFILES)

    def test_sorted_by_emf_descending(self):
        comparison = cross_country_comparison()
        emf_indices = [c["emf_index"] for c in comparison]
        for i in range(len(emf_indices) - 1):
            assert emf_indices[i] >= emf_indices[i + 1]

    def test_highest_emf_has_low_tfr(self):
        comparison = cross_country_comparison()
        highest_emf = comparison[0]
        assert highest_emf["actual_tfr"] < 1.5


# ── Calhoun Phase Dynamics ──


class TestCalhounPhaseIndicators:
    def test_all_keys_present(self):
        m = environment_biomarkers("suburban", 2025)
        ind = calhoun_phase_indicators(m)
        expected = {"position_saturation", "maternal_collapse",
                    "complexity_loss", "beautiful_ones_fraction",
                    "societal_death"}
        assert set(ind.keys()) == expected

    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            ind = calhoun_phase_indicators(m)
            for k, v in ind.items():
                assert 0.0 <= v <= 1.0, f"{env}/{k}={v}"

    def test_amish_low_societal_death(self):
        m = environment_biomarkers("amish", 2025)
        ind = calhoun_phase_indicators(m)
        assert ind["societal_death"] < 0.15

    def test_urban_high_societal_death(self):
        m = environment_biomarkers("urban_office", 2025)
        ind = calhoun_phase_indicators(m)
        assert ind["societal_death"] > 0.50

    def test_monotonically_increasing(self):
        env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        deaths = [calhoun_phase_indicators(
            environment_biomarkers(e, 2025))["societal_death"]
            for e in env_order]
        for i in range(len(deaths) - 1):
            assert deaths[i] <= deaths[i + 1]


class TestCalhounPhase:
    def test_amish_phase_b(self):
        m = environment_biomarkers("amish", 2025)
        assert calhoun_phase(m) == "B"

    def test_urban_phase_d(self):
        m = environment_biomarkers("urban_office", 2025)
        assert calhoun_phase(m) == "D"

    def test_valid_phases(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            assert calhoun_phase(m) in ("B", "C", "D")


class TestCalhounRecovery:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            r = calhoun_recovery_potential(m)
            assert 0.0 <= r <= 1.0

    def test_amish_high_recovery(self):
        m = environment_biomarkers("amish", 2025)
        assert calhoun_recovery_potential(m) > 0.70

    def test_urban_low_recovery(self):
        m = environment_biomarkers("urban_office", 2025)
        assert calhoun_recovery_potential(m) < 0.20

    def test_decreasing_with_degradation(self):
        env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        recoveries = [calhoun_recovery_potential(
            environment_biomarkers(e, 2025)) for e in env_order]
        for i in range(len(recoveries) - 1):
            assert recoveries[i] >= recoveries[i + 1]


class TestCalhounPhaseFunctions:
    def test_all_registered(self):
        assert len(CALHOUN_PHASE_FUNCTIONS) == 3


# ── Bioleninist Selection ──


class TestBioleninitLoyalty:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            assert 0.0 <= bioleninist_loyalty_value(m) <= 1.0

    def test_amish_low_loyalty(self):
        m = environment_biomarkers("amish", 2025)
        assert bioleninist_loyalty_value(m) < 0.10

    def test_urban_higher_loyalty(self):
        m_a = environment_biomarkers("amish", 2025)
        m_u = environment_biomarkers("urban_office", 2025)
        assert bioleninist_loyalty_value(m_u) > bioleninist_loyalty_value(m_a)

    def test_monotonic(self):
        env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        vals = [bioleninist_loyalty_value(
            environment_biomarkers(e, 2025)) for e in env_order]
        for i in range(len(vals) - 1):
            assert vals[i] <= vals[i + 1]


class TestCompetenceDecay:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            assert 0.0 <= institutional_competence_decay(m) <= 1.0

    def test_amish_minimal(self):
        m = environment_biomarkers("amish", 2025)
        assert institutional_competence_decay(m) < 0.01

    def test_urban_higher(self):
        m_a = environment_biomarkers("amish", 2025)
        m_u = environment_biomarkers("urban_office", 2025)
        assert institutional_competence_decay(m_u) > institutional_competence_decay(m_a)


class TestBioleninitRatchet:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            assert 0.0 <= bioleninist_ratchet_index(m) <= 1.0

    def test_amish_low(self):
        m = environment_biomarkers("amish", 2025)
        assert bioleninist_ratchet_index(m) < 0.05

    def test_urban_higher(self):
        m_a = environment_biomarkers("amish", 2025)
        m_u = environment_biomarkers("urban_office", 2025)
        assert bioleninist_ratchet_index(m_u) > bioleninist_ratchet_index(m_a)


class TestBioleninitFunctions:
    def test_all_registered(self):
        assert len(BIOLENINIST_FUNCTIONS) == 3


# ── Reproductive Behavior Spectrum ──


class TestReproductiveSpectrum:
    def test_all_keys(self):
        m = environment_biomarkers("suburban", 2025)
        s = reproductive_behavior_spectrum(m)
        expected = {"normal_reproductive", "reduced_libido",
                    "pansexual_undifferentiated",
                    "non_reproductive_preferential", "asexual_withdrawn"}
        assert set(s.keys()) == expected

    def test_sums_to_one(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            s = reproductive_behavior_spectrum(m)
            total = sum(s.values())
            assert abs(total - 1.0) < 0.01, f"{env}: sum={total}"

    def test_all_non_negative(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            s = reproductive_behavior_spectrum(m)
            for k, v in s.items():
                assert v >= 0.0, f"{env}/{k}={v}"

    def test_amish_mostly_normal(self):
        m = environment_biomarkers("amish", 2025)
        s = reproductive_behavior_spectrum(m)
        assert s["normal_reproductive"] > 0.90

    def test_urban_less_normal(self):
        m = environment_biomarkers("urban_office", 2025)
        s = reproductive_behavior_spectrum(m)
        assert s["normal_reproductive"] < 0.50

    def test_normal_decreases_with_degradation(self):
        env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        normals = [reproductive_behavior_spectrum(
            environment_biomarkers(e, 2025))["normal_reproductive"]
            for e in env_order]
        for i in range(len(normals) - 1):
            assert normals[i] >= normals[i + 1]

    def test_non_repro_baseline_near_historical(self):
        m = environment_biomarkers("amish", 2025)
        s = reproductive_behavior_spectrum(m)
        assert 0.02 <= s["non_reproductive_preferential"] <= 0.05

    def test_non_repro_urban_matches_gallup(self):
        m = environment_biomarkers("urban_residential", 2025)
        s = reproductive_behavior_spectrum(m)
        assert 0.05 <= s["non_reproductive_preferential"] <= 0.15

    def test_asexual_increases_with_degradation(self):
        env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        asexuals = [reproductive_behavior_spectrum(
            environment_biomarkers(e, 2025))["asexual_withdrawn"]
            for e in env_order]
        for i in range(len(asexuals) - 1):
            assert asexuals[i] <= asexuals[i + 1]


class TestEffectiveFertility:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            ef = effective_fertility_index(m)
            assert 0.0 <= ef <= 1.0

    def test_amish_high(self):
        m = environment_biomarkers("amish", 2025)
        assert effective_fertility_index(m) > 0.90

    def test_urban_low(self):
        m = environment_biomarkers("urban_office", 2025)
        assert effective_fertility_index(m) < 0.60

    def test_decreasing_with_degradation(self):
        env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        ferts = [effective_fertility_index(
            environment_biomarkers(e, 2025)) for e in env_order]
        for i in range(len(ferts) - 1):
            assert ferts[i] >= ferts[i + 1]


class TestPrenatalDisruption:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            assert 0.0 <= prenatal_disruption_index(m) <= 1.0

    def test_amish_low(self):
        m = environment_biomarkers("amish", 2025)
        assert prenatal_disruption_index(m) < 0.10

    def test_urban_higher(self):
        m_a = environment_biomarkers("amish", 2025)
        m_u = environment_biomarkers("urban_office", 2025)
        assert prenatal_disruption_index(m_u) > prenatal_disruption_index(m_a)


class TestEndocrineSexualDisruption:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            assert 0.0 <= endocrine_sexual_disruption_index(m) <= 1.0

    def test_amish_low(self):
        m = environment_biomarkers("amish", 2025)
        assert endocrine_sexual_disruption_index(m) < 0.10

    def test_urban_high(self):
        m = environment_biomarkers("urban_office", 2025)
        assert endocrine_sexual_disruption_index(m) > 0.40

    def test_monotonic(self):
        env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        vals = [endocrine_sexual_disruption_index(
            environment_biomarkers(e, 2025)) for e in env_order]
        for i in range(len(vals) - 1):
            assert vals[i] <= vals[i + 1]


class TestReproductiveSpectrumFunctions:
    def test_all_registered(self):
        assert len(REPRODUCTIVE_SPECTRUM_FUNCTIONS) == 4


# ── Parasitic Transmission ──


class TestWolbachiaSterilization:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            assert 0.0 <= wolbachia_sterilization_index(m) <= 1.0

    def test_amish_near_zero(self):
        m = environment_biomarkers("amish", 2025)
        assert wolbachia_sterilization_index(m) < 0.05

    def test_urban_higher(self):
        m_a = environment_biomarkers("amish", 2025)
        m_u = environment_biomarkers("urban_office", 2025)
        assert wolbachia_sterilization_index(m_u) > wolbachia_sterilization_index(m_a)


class TestSacculinaHijacking:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            assert 0.0 <= sacculina_hijacking_index(m) <= 1.0

    def test_amish_near_zero(self):
        m = environment_biomarkers("amish", 2025)
        assert sacculina_hijacking_index(m) < 0.05

    def test_urban_higher(self):
        m_a = environment_biomarkers("amish", 2025)
        m_u = environment_biomarkers("urban_office", 2025)
        assert sacculina_hijacking_index(m_u) > sacculina_hijacking_index(m_a)


class TestBaculovirusInstitutional:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            assert 0.0 <= baculovirus_institutional_index(m) <= 1.0

    def test_amish_near_zero(self):
        m = environment_biomarkers("amish", 2025)
        assert baculovirus_institutional_index(m) < 0.05

    def test_urban_higher(self):
        m_a = environment_biomarkers("amish", 2025)
        m_u = environment_biomarkers("urban_office", 2025)
        assert baculovirus_institutional_index(m_u) > baculovirus_institutional_index(m_a)


class TestDisoperatorDestruction:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            assert 0.0 <= disoperator_destruction_index(m) <= 1.0

    def test_amish_low(self):
        m = environment_biomarkers("amish", 2025)
        assert disoperator_destruction_index(m) < 0.10

    def test_urban_high(self):
        m = environment_biomarkers("urban_office", 2025)
        assert disoperator_destruction_index(m) > 0.50

    def test_monotonic(self):
        env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        vals = [disoperator_destruction_index(
            environment_biomarkers(e, 2025)) for e in env_order]
        for i in range(len(vals) - 1):
            assert vals[i] <= vals[i + 1]


class TestCooperativeIntegrity:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            assert 0.0 <= cooperative_group_integrity(m) <= 1.0

    def test_amish_high(self):
        m = environment_biomarkers("amish", 2025)
        assert cooperative_group_integrity(m) > 0.80

    def test_urban_low(self):
        m = environment_biomarkers("urban_office", 2025)
        assert cooperative_group_integrity(m) < 0.30

    def test_decreasing_with_degradation(self):
        env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        vals = [cooperative_group_integrity(
            environment_biomarkers(e, 2025)) for e in env_order]
        for i in range(len(vals) - 1):
            assert vals[i] >= vals[i + 1]


class TestParasiticTransmissionFunctions:
    def test_all_registered(self):
        assert len(PARASITIC_TRANSMISSION_FUNCTIONS) == 5


# ── Integrated Civilizational Sink ──


class TestCivilizationalSinkIndex:
    def test_bounds(self):
        for env in ENVIRONMENTS:
            m = environment_biomarkers(env, 2025)
            assert 0.0 <= civilizational_sink_index(m) <= 1.0

    def test_amish_low(self):
        m = environment_biomarkers("amish", 2025)
        assert civilizational_sink_index(m) < 0.10

    def test_urban_high(self):
        m = environment_biomarkers("urban_office", 2025)
        assert civilizational_sink_index(m) > 0.30

    def test_monotonically_increasing(self):
        env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        sinks = [civilizational_sink_index(
            environment_biomarkers(e, 2025)) for e in env_order]
        for i in range(len(sinks) - 1):
            assert sinks[i] <= sinks[i + 1]


class TestCivilizationalSinkProfile:
    def test_all_keys(self):
        m = environment_biomarkers("suburban", 2025)
        p = civilizational_sink_profile(m)
        expected_keys = {
            "civilizational_sink", "calhoun_phase", "calhoun_indicators",
            "recovery_potential", "bioleninist_loyalty", "competence_decay",
            "ratchet_strength", "reproductive_spectrum", "effective_fertility",
            "prenatal_disruption", "sexual_disruption",
            "wolbachia_sterilization", "sacculina_hijacking",
            "baculovirus_institutional", "disoperator_destruction",
            "cooperative_integrity",
            "behavioral_immune", "destigmatization", "stigma_inversion",
            "net_immunity", "transmission_resistance",
            "transmission_composite",
        }
        assert set(p.keys()) == expected_keys
        assert len(expected_keys) == 22

    def test_spectrum_is_dict(self):
        m = environment_biomarkers("suburban", 2025)
        p = civilizational_sink_profile(m)
        assert isinstance(p["reproductive_spectrum"], dict)
        assert len(p["reproductive_spectrum"]) == 5


class TestCivilizationalSinkGradient:
    def test_all_environments(self):
        gradient = civilizational_sink_gradient()
        assert len(gradient) == 5

    def test_sink_increases(self):
        gradient = civilizational_sink_gradient()
        sinks = [g["civilizational_sink"] for g in gradient]
        for i in range(len(sinks) - 1):
            assert sinks[i] <= sinks[i + 1]

    def test_amish_lowest(self):
        gradient = civilizational_sink_gradient()
        assert gradient[0]["environment"] == "amish"
        assert gradient[0]["civilizational_sink"] < 0.10


class TestCivilizationalSinkFunctions:
    def test_all_registered(self):
        assert len(CIVILIZATIONAL_SINK_FUNCTIONS) == 16


# ── Behavioral Immune System Tests ──


class TestBehavioralImmuneIndex:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env, 2025)
            v = behavioral_immune_index(m)
            assert 0.0 <= v <= 1.0

    def test_amish_high(self):
        m = environment_biomarkers("amish", 2025)
        assert behavioral_immune_index(m) > 0.80

    def test_urban_low(self):
        m = environment_biomarkers("urban_office", 2025)
        assert behavioral_immune_index(m) < 0.40

    def test_monotonic_decreasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        values = [behavioral_immune_index(environment_biomarkers(e, 2025)) for e in envs]
        for i in range(len(values) - 1):
            assert values[i] >= values[i + 1]


class TestDestigmatizationIndex:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env, 2025)
            v = destigmatization_index(m)
            assert 0.0 <= v <= 1.0

    def test_amish_near_zero(self):
        m = environment_biomarkers("amish", 2025)
        assert destigmatization_index(m) < 0.05

    def test_urban_elevated(self):
        m = environment_biomarkers("urban_office", 2025)
        assert destigmatization_index(m) > 0.25

    def test_monotonic_increasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        values = [destigmatization_index(environment_biomarkers(e, 2025)) for e in envs]
        for i in range(len(values) - 1):
            assert values[i] <= values[i + 1]


class TestStigmaInversion:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env, 2025)
            v = stigma_inversion_index(m)
            assert 0.0 <= v <= 1.0

    def test_amish_zero(self):
        m = environment_biomarkers("amish", 2025)
        assert stigma_inversion_index(m) == 0.0

    def test_healthy_environments_no_inversion(self):
        for env in ["amish", "rural", "suburban"]:
            m = environment_biomarkers(env, 2025)
            assert stigma_inversion_index(m) == 0.0

    def test_urban_office_has_inversion(self):
        m = environment_biomarkers("urban_office", 2025)
        assert stigma_inversion_index(m) > 0.0


class TestNetBehavioralImmunity:
    def test_range(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env, 2025)
            v = net_behavioral_immunity(m)
            assert -1.0 <= v <= 1.0

    def test_amish_strongly_positive(self):
        m = environment_biomarkers("amish", 2025)
        assert net_behavioral_immunity(m) > 0.70

    def test_urban_office_negative(self):
        m = environment_biomarkers("urban_office", 2025)
        assert net_behavioral_immunity(m) < 0.0

    def test_monotonic_decreasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        values = [net_behavioral_immunity(environment_biomarkers(e, 2025)) for e in envs]
        for i in range(len(values) - 1):
            assert values[i] >= values[i + 1]


class TestTransmissionResistance:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env, 2025)
            v = transmission_resistance(m)
            assert 0.0 <= v <= 1.0

    def test_amish_high(self):
        m = environment_biomarkers("amish", 2025)
        assert transmission_resistance(m) > 0.80

    def test_urban_near_zero(self):
        m = environment_biomarkers("urban_office", 2025)
        assert transmission_resistance(m) < 0.10

    def test_monotonic_decreasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        values = [transmission_resistance(environment_biomarkers(e, 2025)) for e in envs]
        for i in range(len(values) - 1):
            assert values[i] >= values[i + 1]


class TestBehavioralImmuneFunctions:
    def test_all_registered(self):
        assert len(BEHAVIORAL_IMMUNE_FUNCTIONS) == 5


# ── Social Transmission Channel Tests ──


class TestRecoverySabotage:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env, 2025)
            v = recovery_sabotage_index(m)
            assert 0.0 <= v <= 1.0

    def test_amish_low(self):
        m = environment_biomarkers("amish", 2025)
        assert recovery_sabotage_index(m) < 0.05

    def test_urban_elevated(self):
        m = environment_biomarkers("urban_office", 2025)
        assert recovery_sabotage_index(m) > 0.25

    def test_monotonic_increasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        values = [recovery_sabotage_index(environment_biomarkers(e, 2025)) for e in envs]
        for i in range(len(values) - 1):
            assert values[i] <= values[i + 1]


class TestDependencyTransmission:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env, 2025)
            v = dependency_transmission_index(m)
            assert 0.0 <= v <= 1.0

    def test_amish_near_zero(self):
        m = environment_biomarkers("amish", 2025)
        assert dependency_transmission_index(m) < 0.02

    def test_urban_elevated(self):
        m = environment_biomarkers("urban_office", 2025)
        assert dependency_transmission_index(m) > 0.10

    def test_monotonic_increasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        values = [dependency_transmission_index(environment_biomarkers(e, 2025)) for e in envs]
        for i in range(len(values) - 1):
            assert values[i] <= values[i + 1]


class TestSocialContagion:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env, 2025)
            v = social_contagion_index(m)
            assert 0.0 <= v <= 1.0

    def test_amish_near_zero(self):
        m = environment_biomarkers("amish", 2025)
        assert social_contagion_index(m) < 0.02

    def test_urban_elevated(self):
        m = environment_biomarkers("urban_office", 2025)
        assert social_contagion_index(m) > 0.15

    def test_monotonic_increasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        values = [social_contagion_index(environment_biomarkers(e, 2025)) for e in envs]
        for i in range(len(values) - 1):
            assert values[i] <= values[i + 1]


class TestEmpathyWeaponization:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env, 2025)
            v = empathy_weaponization_index(m)
            assert 0.0 <= v <= 1.0

    def test_amish_near_zero(self):
        m = environment_biomarkers("amish", 2025)
        assert empathy_weaponization_index(m) < 0.02

    def test_urban_elevated(self):
        m = environment_biomarkers("urban_office", 2025)
        assert empathy_weaponization_index(m) > 0.10

    def test_monotonic_increasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        values = [empathy_weaponization_index(environment_biomarkers(e, 2025)) for e in envs]
        for i in range(len(values) - 1):
            assert values[i] <= values[i + 1]


class TestActiveInfectionSeeking:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env, 2025)
            v = active_infection_seeking_index(m)
            assert 0.0 <= v <= 1.0

    def test_amish_near_zero(self):
        m = environment_biomarkers("amish", 2025)
        assert active_infection_seeking_index(m) < 0.02

    def test_urban_elevated(self):
        m = environment_biomarkers("urban_office", 2025)
        assert active_infection_seeking_index(m) > 0.15

    def test_monotonic_increasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        values = [active_infection_seeking_index(environment_biomarkers(e, 2025)) for e in envs]
        for i in range(len(values) - 1):
            assert values[i] <= values[i + 1]


class TestTransmissionComposite:
    def test_bounds(self):
        for env in ["amish", "rural", "suburban", "urban_residential", "urban_office"]:
            m = environment_biomarkers(env, 2025)
            v = civilizational_transmission_composite(m)
            assert 0.0 <= v <= 1.0

    def test_amish_near_zero(self):
        m = environment_biomarkers("amish", 2025)
        assert civilizational_transmission_composite(m) < 0.02

    def test_urban_elevated(self):
        m = environment_biomarkers("urban_office", 2025)
        assert civilizational_transmission_composite(m) > 0.25

    def test_monotonic_increasing(self):
        envs = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
        values = [civilizational_transmission_composite(environment_biomarkers(e, 2025)) for e in envs]
        for i in range(len(values) - 1):
            assert values[i] <= values[i + 1]


class TestTransmissionProfile:
    def test_all_keys(self):
        m = environment_biomarkers("suburban", 2025)
        p = civilizational_transmission_profile(m)
        expected_keys = {
            "behavioral_immune", "destigmatization", "stigma_inversion",
            "net_immunity", "transmission_resistance",
            "recovery_sabotage", "dependency_transmission",
            "social_contagion", "empathy_weaponization",
            "active_infection_seeking", "transmission_composite",
        }
        assert set(p.keys()) == expected_keys
        assert len(expected_keys) == 11


class TestTransmissionGradient:
    def test_all_environments(self):
        gradient = civilizational_transmission_gradient()
        assert len(gradient) == 5

    def test_composite_increases(self):
        gradient = civilizational_transmission_gradient()
        composites = [g["transmission_composite"] for g in gradient]
        for i in range(len(composites) - 1):
            assert composites[i] <= composites[i + 1]

    def test_amish_lowest(self):
        gradient = civilizational_transmission_gradient()
        assert gradient[0]["environment"] == "amish"
        assert gradient[0]["transmission_composite"] < 0.02

    def test_bis_crossover(self):
        gradient = civilizational_transmission_gradient()
        net_immunities = [g["net_immunity"] for g in gradient]
        assert net_immunities[0] > 0.5
        assert net_immunities[-1] < 0.0


class TestSocialTransmissionFunctions:
    def test_all_registered(self):
        assert len(SOCIAL_TRANSMISSION_FUNCTIONS) == 7
