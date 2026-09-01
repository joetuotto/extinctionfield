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
    EMFEnvironment,
    authority_hierarchy,
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
    sanctity_purity,
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
