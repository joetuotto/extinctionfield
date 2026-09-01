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
    DIMENSION_FUNCTIONS,
    ENVIRONMENTS,
    IDEOLOGY_PROFILES,
    EMFEnvironment,
    classify_ideology,
    cognitive_complexity,
    empathy_scope,
    environment_biomarkers,
    environment_comparison,
    environment_profile,
    group_conformity,
    hierarchy_acceptance,
    ideology_trajectory,
    novelty_seeking,
    orientation_profile,
    threat_sensitivity,
    time_preference,
    urban_rural_gradient,
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
