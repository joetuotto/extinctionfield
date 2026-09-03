"""DIAGNOSTIC_ONLY: Political orientation as a function of biomarker state.

Maps biomarker values to political orientation dimensions and computes
ideological profiles for different EMF exposure environments. Political
positions are treated as biological strategies — phenotypic expressions
of hormonal states, not products of rational deliberation.

Key literature grounding:
    Testosterone → hierarchy/redistribution: Apicella 2011 (N=98),
        Petersen 2013 (N=~12k, 17 countries), Carré 2011 meta.
    Cortisol → threat sensitivity: Oxley 2008 (N=46), Kanai 2011
        (N=90 fMRI), Hibbing 2014 review.
    Dopamine → novelty/openness: Settle 2010 (N=2574, DRD4-7R),
        DeYoung 2011 (N=116 fMRI, nucleus accumbens volume).
    Oxytocin → in-group/out-group: De Dreu 2011 (N=280, five
        experiments: OXT increases in-group favoritism AND out-group
        derogation simultaneously).
    BDNF/Flynn reversal → cognitive complexity: Bratsberg 2018
        (N=730k), Dworak 2023 (N=394k).
    Sleep/melatonin → decision quality: Killgore 2010 review,
        Walker 2017 synthesis.

EMF gradient:
    Urban ambient RF: 0.5–6 V/m (Sagar 2018, Bhatt 2016)
    Rural ambient RF: 0.02–0.1 V/m (factor 10–100× lower)
    Personal device proximity: dominant source in both environments
"""

from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Any

from berm.civilization.biomarker_trajectories import biomarker_values_at
from berm.civilization.cultural_energy import compute_biocap


# ── Political orientation dimensions ──
#
# Not left-right but biologically grounded axes. Each dimension is a
# continuous [0, 1] score derived from biomarker state.


def hierarchy_acceptance(m: dict[str, float]) -> float:
    """T-driven. High T → enforce/accept hierarchy. Low T → reject it.

    Modulated by CORT: chronic cortisol (as opposed to acute) suppresses
    dominance behavior even at moderate T levels (Mehta & Josephs 2010,
    dual-hormone hypothesis, N=92 + N=78 + meta N=8538).
    """
    t = m["T"]
    cort = m["CORT"]
    raw = t * (1.0 - 0.4 * cort)
    return max(0.0, min(1.0, raw))


def threat_sensitivity(m: dict[str, float]) -> float:
    """CORT-driven. High chronic CORT → expanded threat definitions.

    Oxley 2008: higher skin conductance (threat response) predicted
    support for protective/defensive policies across 46 subjects.
    Kanai 2011: larger amygdala volume correlated with conservative
    orientation (N=90), but this reflects ACUTE threat processing.
    Chronic CORT produces a different phenotype: generalized anxiety,
    expanded harm definitions, safety-seeking — not fight but freeze.
    """
    cort = m["CORT"]
    t = m["T"]
    raw = cort * (1.0 - 0.3 * t)
    return max(0.0, min(1.0, raw))


def novelty_seeking(m: dict[str, float]) -> float:
    """DA-driven. High DA → exploration, intellectual risk-taking.

    Settle 2010: DRD4-7R allele + social network size predicted
    liberal self-identification (N=2574). DeYoung 2011: Openness
    correlated with nucleus accumbens volume (dopaminergic).
    CORT suppresses exploration (Bardi 2012 cortisol-novelty study).
    """
    da = m["DA"]
    cort = m["CORT"]
    raw = da * (1.0 - 0.3 * cort)
    return max(0.0, min(1.0, raw))


def time_preference(m: dict[str, float]) -> float:
    """DA + BDNF. Long-horizon planning capacity.

    DA regulates delayed gratification (McClure 2004 fMRI, N=14).
    BDNF supports abstract future-modeling (cognitive flexibility).
    Low DA + low BDNF → present-oriented, short-term maximization.
    """
    return max(0.0, min(1.0, 0.55 * m["DA"] + 0.45 * m["BDNF"]))


def cognitive_complexity(m: dict[str, float]) -> float:
    """BDNF + MEL. Capacity for multi-causal reasoning.

    BDNF: Bratsberg 2018 Flynn reversal (-5 to -7 IQ/gen).
    MEL: sleep quality determines overnight cognitive consolidation.
    Below ~0.5, population cannot process multi-step causal models
    and defaults to single-cause explanations (populism threshold).
    """
    return max(0.0, min(1.0, 0.55 * m["BDNF"] + 0.45 * m["MEL"]))


def group_conformity(m: dict[str, float]) -> float:
    """OXT/T ratio, amplified by CORT.

    De Dreu 2011: OXT simultaneously increases in-group favoritism
    and out-group derogation (N=280, 5 experiments). High OXT + low T
    produces strong conformity: OXT provides social bonding drive,
    absent T there's no capacity to deviate from group consensus.
    CORT amplifies this: threat state strengthens in-group adhesion.
    """
    t = max(m["T"], 0.05)
    raw = m["OXT"] / (t + 0.5) * (1.0 + 0.3 * m["CORT"])
    return max(0.0, min(1.0, raw))


def empathy_scope(m: dict[str, float]) -> float:
    """OXT broadened by BDNF, narrowed by CORT.

    High OXT + high BDNF = abstract empathy (concern for distant
    others, universal ethics). High OXT + low BDNF = parochial
    empathy (strong for in-group, absent for out-group).
    CORT contracts empathy scope to immediate threat-relevant group.
    """
    raw = m["OXT"] * (0.4 + 0.6 * m["BDNF"]) * (1.0 - 0.35 * m["CORT"])
    return max(0.0, min(1.0, raw))


# ── Dimension names and their functions ──

DIMENSION_FUNCTIONS: dict[str, Any] = {
    "hierarchy_acceptance": hierarchy_acceptance,
    "threat_sensitivity": threat_sensitivity,
    "novelty_seeking": novelty_seeking,
    "time_preference": time_preference,
    "cognitive_complexity": cognitive_complexity,
    "group_conformity": group_conformity,
    "empathy_scope": empathy_scope,
}


def orientation_profile(markers: dict[str, float]) -> dict[str, float]:
    """Compute all political orientation dimensions from biomarker state.

    Parameters
    ----------
    markers : dict
        Biomarker values (T, OXT, DA, MEL, BDNF, CORT, D, B2).

    Returns
    -------
    dict
        Mapping from dimension name to score in [0, 1].
    """
    return {name: fn(markers) for name, fn in DIMENSION_FUNCTIONS.items()}


# ── Haidt moral foundations ──
#
# Jonathan Haidt's Moral Foundations Theory (2012) identifies six
# foundations. Each maps to a biological substrate in the BERM
# biomarker set. Graham, Haidt & Nosek 2009 showed that liberals
# weight Care + Fairness heavily while conservatives weight all six
# more equally. The model predicts this asymmetry as a direct
# consequence of differential biomarker degradation across EMF
# environments.


def care_harm(m: dict[str, float]) -> float:
    """Care/Harm: sensitivity to suffering, protective nurturance.

    OXT: empathic capacity (Feldman 2012 maternal OXT, Luo 2024 RCT
    OXT → guilt for intentional harm). BDNF broadens from parochial
    to universal concern. CORT narrows to self-preservation.
    Crockett 2010: serotonin (downstream) enhances harm aversion.
    """
    raw = m["OXT"] * (0.45 + 0.55 * m["BDNF"]) * (1.0 - 0.3 * m["CORT"])
    return max(0.0, min(1.0, raw))


def fairness_reciprocity(m: dict[str, float]) -> float:
    """Fairness/Cheating: proportional reciprocity, norm enforcement.

    DA: reward circuit detects inequity (Zhong 2010 DRD4 → fairness
    in ultimatum game; Tabibnia & Lieberman 2007 ventral striatum).
    T: enforcement — willingness to punish norm violators (Burnham
    2007 N=26 high T → reject unfair offers; Eisenegger 2010 N=60
    T → fairer offers, promoting social norms not aggression).
    OXT: trust/reciprocity baseline (Zak 2005).
    CORT dampens confrontation willingness.
    """
    raw = (0.40 * m["DA"] + 0.30 * m["T"] + 0.15 * m["OXT"]) * (
        1.0 - 0.2 * m["CORT"]
    )
    return max(0.0, min(1.0, raw))


def loyalty_betrayal(m: dict[str, float]) -> float:
    """Loyalty/Betrayal: in-group allegiance, coalition fidelity.

    OXT drives parochial altruism (De Dreu 2010 Science: OXT →
    in-group favoritism; De Dreu 2011 PNAS: OXT → ethnocentrism;
    Stallen 2012: OXT → conformity to in-group only; Shalvi &
    De Dreu 2014: OXT → group-serving dishonesty).
    T: enables active group defense vs passive compliance.
    CORT: threat amplifies in-group cohesion.
    """
    raw = m["OXT"] * (0.50 + 0.50 * m["T"]) * (1.0 + 0.1 * m["CORT"])
    return max(0.0, min(1.0, raw * 0.80))


def authority_hierarchy(m: dict[str, float]) -> float:
    """Authority/Subversion: hierarchy respect, tradition, dominance.

    Identical to hierarchy_acceptance. T-driven, CORT-modulated via
    dual-hormone hypothesis (Mehta & Josephs 2010, meta N=8538).
    Kanai 2011: right amygdala volume → conservative orientation.
    """
    return hierarchy_acceptance(m)


def sanctity_purity(m: dict[str, float]) -> float:
    """Sanctity/Degradation: disgust sensitivity, contamination avoidance.

    Inbar, Pizarro & Bloom 2009 (N=31,045): disgust → conservatism.
    Oxley 2008 (N=46): physiological threat reactivity → conservative.
    Smith 2011: disgust neurophysiology → political orientation.

    Multiplicative: requires BOTH cognitive capacity to maintain complex
    purity categories (BDNF + MEL) AND social enforcement motivation
    (T + OXT). If either collapses, sanctity collapses — category
    maintenance without enforcement is aesthetics, enforcement without
    categories is authoritarianism.
    """
    cognitive = 0.55 * m["BDNF"] + 0.45 * m["MEL"]
    enforcement = 0.55 * m["T"] + 0.45 * m["OXT"]
    raw = cognitive * enforcement
    return max(0.0, min(1.0, raw))


def liberty_autonomy(m: dict[str, float]) -> float:
    """Liberty/Oppression: resistance to domination, autonomy-seeking.

    Settle 2010 (N=2574): DRD4-7R → liberal ideology via novelty.
    DA: autonomy drive, exploration, resistance to constraint.
    T: dominance resistance — capacity to resist being dominated.
    CORT (inverse): threat strongly suppresses challenge to authority.
    """
    raw = (0.50 * m["DA"] + 0.35 * m["T"]) * (1.0 - 0.35 * m["CORT"])
    return max(0.0, min(1.0, raw))


MORAL_FOUNDATION_FUNCTIONS: dict[str, Any] = {
    "care": care_harm,
    "fairness": fairness_reciprocity,
    "loyalty": loyalty_betrayal,
    "authority": authority_hierarchy,
    "sanctity": sanctity_purity,
    "liberty": liberty_autonomy,
}

BINDING_FOUNDATIONS = ("loyalty", "authority", "sanctity")
INDIVIDUALIZING_FOUNDATIONS = ("care", "fairness", "liberty")


def moral_foundations_profile(markers: dict[str, float]) -> dict[str, float]:
    """Compute Haidt's six moral foundations from biomarker state.

    Returns a dict mapping foundation name to score in [0, 1].
    """
    return {name: round(fn(markers), 4) for name, fn in MORAL_FOUNDATION_FUNCTIONS.items()}


def moral_breadth(
    mf: dict[str, float],
    threshold: float = 0.35,
) -> dict[str, Any]:
    """How many moral foundations are active (above threshold).

    Graham, Haidt & Nosek 2009: liberals weight Care + Fairness,
    conservatives weight all five-six more equally.  The breadth
    metric captures this asymmetry.

    Default threshold 0.35 calibrated to produce the Haidt gradient:
    amish/rural 6/6, suburban 5-6/6, urban 2-3/6.

    Binding foundations: Loyalty, Authority, Sanctity (group-preserving).
    Individualizing: Care, Fairness, Liberty (individual-protecting).
    """
    active = {k: v for k, v in mf.items() if v >= threshold}

    return {
        "active_count": len(active),
        "total": len(mf),
        "breadth": round(len(active) / len(mf), 3),
        "active_foundations": sorted(active.keys()),
        "binding_active": sum(
            1 for k in BINDING_FOUNDATIONS if mf.get(k, 0) >= threshold
        ),
        "individualizing_active": sum(
            1 for k in INDIVIDUALIZING_FOUNDATIONS if mf.get(k, 0) >= threshold
        ),
    }


# ── EMF exposure environments ──
#
# Each environment defines a multiplier on the biomarker trajectory.
# Urban exposure accelerates decline; rural buffers it. The multipliers
# represent the *relative* EMF burden compared to the population-average
# trajectory in biomarker_trajectories.py.


@dataclass(frozen=True)
class EMFEnvironment:
    """EMF exposure environment with biomarker modifiers."""
    name: str
    label: str
    emf_factor: float
    t_modifier: float
    oxt_modifier: float
    da_modifier: float
    mel_modifier: float
    bdnf_modifier: float
    cort_modifier: float
    d_modifier: float
    b2_modifier: float

    def apply(self, markers: dict[str, float]) -> dict[str, float]:
        """Apply environment modifiers to a biomarker set.

        Positive markers: result = 1 - (1 - base) * modifier
            modifier > 1 → more degradation than average
            modifier < 1 → less degradation (buffered)
            modifier = 1 → population average

        CORT (inverse): result = base * modifier
            modifier > 1 → more cortisol elevation
            modifier < 1 → less elevation
        """
        modifiers = {
            "T": self.t_modifier,
            "OXT": self.oxt_modifier,
            "DA": self.da_modifier,
            "MEL": self.mel_modifier,
            "BDNF": self.bdnf_modifier,
            "CORT": self.cort_modifier,
            "D": self.d_modifier,
            "B2": self.b2_modifier,
        }

        result: dict[str, float] = {}
        for k, v in markers.items():
            mod = modifiers.get(k, 1.0)
            if k == "CORT":
                result[k] = min(1.0, v * mod)
            else:
                deficit = 1.0 - v
                result[k] = max(0.0, 1.0 - deficit * mod)
        return result


# Environments calibrated against literature:
#
# Urban office worker: highest EMF (ambient + personal devices + WiFi
#   + building wiring). Sagar 2018: urban RF 0.5–6 V/m.
#   Worst melatonin (LED lighting all day + screens), worst D (indoors),
#   highest cortisol (commute, noise, density).
#
# Urban residential: high ambient but less personal device proximity
#   than office. Still poor D (reduced sunlight access).
#
# Suburban: moderate ambient, moderate personal. Better D and sleep.
#
# Rural: minimal ambient EMF (0.02–0.1 V/m, Bhatt 2016). Better
#   melatonin (darker nights), better D (outdoor work), lower cortisol
#   (lower density, less noise). Personal device use still present.
#
# Amish/unelectrified: near-zero anthropogenic EMF. Serves as the
#   biological control group (BioCap ≈ 0.98).

ENVIRONMENTS: dict[str, EMFEnvironment] = {
    "urban_office": EMFEnvironment(
        name="urban_office",
        label="Urban office worker",
        emf_factor=1.8,
        t_modifier=1.35,
        oxt_modifier=1.25,
        da_modifier=1.30,
        mel_modifier=1.50,
        bdnf_modifier=1.20,
        cort_modifier=1.40,
        d_modifier=1.50,
        b2_modifier=1.10,
    ),
    "urban_residential": EMFEnvironment(
        name="urban_residential",
        label="Urban residential",
        emf_factor=1.4,
        t_modifier=1.20,
        oxt_modifier=1.15,
        da_modifier=1.15,
        mel_modifier=1.30,
        bdnf_modifier=1.10,
        cort_modifier=1.25,
        d_modifier=1.30,
        b2_modifier=1.05,
    ),
    "suburban": EMFEnvironment(
        name="suburban",
        label="Suburban",
        emf_factor=1.0,
        t_modifier=1.00,
        oxt_modifier=1.00,
        da_modifier=1.00,
        mel_modifier=1.00,
        bdnf_modifier=1.00,
        cort_modifier=1.00,
        d_modifier=1.00,
        b2_modifier=1.00,
    ),
    "rural": EMFEnvironment(
        name="rural",
        label="Rural",
        emf_factor=0.4,
        t_modifier=0.70,
        oxt_modifier=0.75,
        da_modifier=0.80,
        mel_modifier=0.55,
        bdnf_modifier=0.85,
        cort_modifier=0.65,
        d_modifier=0.50,
        b2_modifier=0.85,
    ),
    "amish": EMFEnvironment(
        name="amish",
        label="Amish / unelectrified",
        emf_factor=0.05,
        t_modifier=0.10,
        oxt_modifier=0.10,
        da_modifier=0.10,
        mel_modifier=0.08,
        bdnf_modifier=0.15,
        cort_modifier=0.15,
        d_modifier=0.10,
        b2_modifier=0.50,
    ),
}


def environment_biomarkers(
    env_name: str,
    year: float = 2025,
) -> dict[str, float]:
    """Get biomarker values for a specific environment at a given year.

    Parameters
    ----------
    env_name : str
        Key in ENVIRONMENTS.
    year : float
        Calendar year.

    Returns
    -------
    dict
        Modified biomarker values for the environment.

    Raises
    ------
    KeyError
        If env_name is not recognized.
    """
    if env_name not in ENVIRONMENTS:
        raise KeyError(f"Unknown environment: {env_name}")
    base = biomarker_values_at(year)
    return ENVIRONMENTS[env_name].apply(base)


def environment_profile(
    env_name: str,
    year: float = 2025,
) -> dict[str, Any]:
    """Full political orientation profile for an environment.

    Returns biomarkers, orientation dimensions, and BioCap.

    Parameters
    ----------
    env_name : str
        Key in ENVIRONMENTS.
    year : float
        Calendar year.

    Returns
    -------
    dict
        Contains 'environment', 'year', 'biomarkers', 'biocap',
        'orientation', and 'dominant_ideology'.
    """
    markers = environment_biomarkers(env_name, year)
    profile = orientation_profile(markers)
    bc = compute_biocap(markers)
    mf = moral_foundations_profile(markers)

    return {
        "environment": env_name,
        "year": year,
        "biomarkers": markers,
        "biocap": round(bc, 4),
        "orientation": {k: round(v, 4) for k, v in profile.items()},
        "moral_foundations": mf,
        "moral_breadth": moral_breadth(mf),
        "rk_strategy": rk_strategy_profile(markers),
        "dominant_ideology": classify_ideology(profile, bc),
    }


# ── Ideology classification ──
#
# Each ideology is defined by its dimension signature — not by what it
# claims to be about, but by the biological profile that produces it.
# "Pathologization" is the Euclidean distance from the natural baseline
# profile (Amish / pre-industrial).


@dataclass(frozen=True)
class IdeologyProfile:
    """An ideology defined as a dimension signature."""
    name: str
    label: str
    conditions: dict[str, tuple[str, float]]
    biological_strategy: str


IDEOLOGY_PROFILES: list[IdeologyProfile] = [
    IdeologyProfile(
        name="pragmatic_localism",
        label="Pragmatic localism (natural baseline)",
        conditions={
            "hierarchy_acceptance": (">=", 0.55),
            "threat_sensitivity": ("<=", 0.35),
            "novelty_seeking": (">=", 0.55),
            "cognitive_complexity": (">=", 0.70),
            "time_preference": (">=", 0.60),
        },
        biological_strategy=(
            "High-capacity default. Strong local hierarchy, low paranoia, "
            "high innovation within tradition. Not ideological — functional."
        ),
    ),
    IdeologyProfile(
        name="progressive_egalitarianism",
        label="Progressive egalitarianism",
        conditions={
            "hierarchy_acceptance": ("<=", 0.35),
            "threat_sensitivity": (">=", 0.45),
            "group_conformity": (">=", 0.50),
        },
        biological_strategy=(
            "Low-T competitive strategy: delegitimize hierarchy when "
            "unable to compete within it. Expanded threat definitions "
            "(CORT) reframed as moral sensitivity."
        ),
    ),
    IdeologyProfile(
        name="authoritarian_conservatism",
        label="Authoritarian conservatism",
        conditions={
            "hierarchy_acceptance": (">=", 0.40),
            "threat_sensitivity": (">=", 0.50),
            "empathy_scope": ("<=", 0.40),
            "cognitive_complexity": ("<=", 0.60),
        },
        biological_strategy=(
            "Residual hierarchy maintenance with elevated threat response. "
            "Insufficient T for organic dominance → relies on external "
            "enforcement (state, religion, punishment)."
        ),
    ),
    IdeologyProfile(
        name="libertarianism",
        label="Libertarianism",
        conditions={
            "hierarchy_acceptance": (">=", 0.45),
            "novelty_seeking": (">=", 0.50),
            "group_conformity": ("<=", 0.40),
            "threat_sensitivity": ("<=", 0.40),
        },
        biological_strategy=(
            "Residual high-DA phenotype in declining population. "
            "Risk-tolerant, low conformity. Shrinking demographic base "
            "as population DA drops."
        ),
    ),
    IdeologyProfile(
        name="populism",
        label="Populism (left or right)",
        conditions={
            "cognitive_complexity": ("<=", 0.50),
            "threat_sensitivity": (">=", 0.45),
            "time_preference": ("<=", 0.50),
        },
        biological_strategy=(
            "Cognitive capacity below institutional complexity threshold. "
            "Not a movement but a biological default state — what emerges "
            "when BDNF + DA drop below multi-causal reasoning floor."
        ),
    ),
    IdeologyProfile(
        name="green_abstraction",
        label="Green / ecological long-termism",
        conditions={
            "cognitive_complexity": (">=", 0.60),
            "time_preference": (">=", 0.55),
            "empathy_scope": (">=", 0.50),
            "novelty_seeking": (">=", 0.40),
        },
        biological_strategy=(
            "BDNF-dependent abstract concern for non-immediate threats. "
            "Cognitive luxury good: requires high abstract reasoning + "
            "long time preference. Fragmenting as substraate declines."
        ),
    ),
]


def _check_condition(value: float, op: str, threshold: float) -> bool:
    if op == ">=":
        return value >= threshold
    if op == "<=":
        return value <= threshold
    if op == ">":
        return value > threshold
    if op == "<":
        return value < threshold
    return False


def classify_ideology(
    profile: dict[str, float],
    biocap: float | None = None,
) -> dict[str, Any]:
    """Classify a political orientation profile into ideology matches.

    Parameters
    ----------
    profile : dict
        Orientation dimension scores.
    biocap : float, optional
        BioCap value for context.

    Returns
    -------
    dict
        'primary': best-matching ideology name,
        'matches': list of all matching ideologies with fit scores,
        'pathologization': distance from natural baseline.
    """
    matches: list[dict[str, Any]] = []

    for ideology in IDEOLOGY_PROFILES:
        met = 0
        total = len(ideology.conditions)
        for dim, (op, threshold) in ideology.conditions.items():
            if dim in profile and _check_condition(profile[dim], op, threshold):
                met += 1

        fit = met / total if total > 0 else 0.0
        if fit >= 0.6:
            matches.append({
                "ideology": ideology.name,
                "label": ideology.label,
                "fit": round(fit, 3),
                "strategy": ideology.biological_strategy,
            })

    matches.sort(key=lambda x: x["fit"], reverse=True)

    primary = matches[0]["ideology"] if matches else "unclassified"

    natural = _natural_profile()
    pathologization = _profile_distance(profile, natural)

    return {
        "primary": primary,
        "matches": matches,
        "pathologization": round(pathologization, 4),
    }


def _natural_profile() -> dict[str, float]:
    """Orientation profile for the natural (Amish) baseline."""
    natural_markers = {
        "T": 0.98, "OXT": 0.97, "DA": 0.96, "MEL": 0.97,
        "BDNF": 0.95, "CORT": 0.08, "D": 0.95, "B2": 0.90,
    }
    return orientation_profile(natural_markers)


def _profile_distance(a: dict[str, float], b: dict[str, float]) -> float:
    """Euclidean distance between two orientation profiles."""
    common = set(a.keys()) & set(b.keys())
    if not common:
        return 0.0
    return math.sqrt(sum((a[k] - b[k]) ** 2 for k in common) / len(common))


# ── Comparative analysis ──


def environment_comparison(
    year: float = 2025,
) -> list[dict[str, Any]]:
    """Compare all environments at a given year.

    Returns a list of environment profiles sorted by pathologization
    (distance from natural baseline), lowest first.
    """
    results = [environment_profile(env, year) for env in ENVIRONMENTS]
    results.sort(key=lambda r: r["dominant_ideology"]["pathologization"])
    return results


def ideology_trajectory(
    env_name: str,
    start_year: int = 1950,
    end_year: int = 2060,
    step: int = 10,
) -> list[dict[str, Any]]:
    """Track ideology shifts in an environment over time.

    Parameters
    ----------
    env_name : str
        Environment key.
    start_year, end_year : int
        Year range.
    step : int
        Year interval.

    Returns
    -------
    list[dict]
        One entry per year with 'year', 'biocap', 'primary_ideology',
        'pathologization', and all orientation dimensions.
    """
    results: list[dict[str, Any]] = []
    year = start_year
    while year < end_year:
        markers = environment_biomarkers(env_name, year)
        profile = orientation_profile(markers)
        bc = compute_biocap(markers)
        ideo = classify_ideology(profile, bc)

        entry: dict[str, Any] = {
            "year": year,
            "biocap": round(bc, 4),
            "primary_ideology": ideo["primary"],
            "pathologization": ideo["pathologization"],
        }
        entry.update({k: round(v, 4) for k, v in profile.items()})
        results.append(entry)
        year += step

    return results


def urban_rural_gradient(year: float = 2025) -> dict[str, Any]:
    """Compute the urban-rural political gradient for a given year.

    Shows how the same population diverges politically purely as a
    function of EMF environment, with identical genetic background.

    Returns
    -------
    dict
        'year', 'gradient': list of environment profiles,
        'polarization_index': max pathologization difference,
        'ideology_divergence': whether urban and rural produce
        different primary ideologies.
    """
    envs = ["rural", "suburban", "urban_residential", "urban_office"]
    profiles = [environment_profile(e, year) for e in envs]

    patho_values = [p["dominant_ideology"]["pathologization"] for p in profiles]
    polarization = max(patho_values) - min(patho_values)

    ideologies = [p["dominant_ideology"]["primary"] for p in profiles]
    divergence = len(set(ideologies)) > 1

    return {
        "year": year,
        "gradient": profiles,
        "polarization_index": round(polarization, 4),
        "ideology_divergence": divergence,
    }


# ── Foundation collapse hierarchy ──
#
# Foundations collapse in a predictable order as EMF increases.
# The order is determined by the biological vulnerability of each
# foundation's substrate — not by cultural or ideological factors.
# Binding foundations (Loyalty, Authority, Sanctity) are more
# biologically fragile than individualizing foundations (Care,
# Fairness, Liberty). This asymmetry explains Haidt's empirical
# finding that conservatives weight all six foundations while
# liberals weight only two-three.

FOUNDATION_VULNERABILITY: dict[str, dict[str, Any]] = {
    "sanctity": {
        "rank": 1,
        "formula_type": "multiplicative",
        "formula": "cognitive(BDNF+MEL) × enforcement(T+OXT)",
        "primary_substrates": ["MEL", "BDNF", "T", "OXT"],
        "vulnerability": (
            "Most fragile. Multiplicative formula means degradation in "
            "EITHER component collapses the product. Melatonin is the first "
            "casualty of the primary pathway (CRY radical pair -> melatonin, "
            "pathway B); BDNF (calcium-dependent synthesis) and T (Leydig "
            "cells) degrade via the secondary calcium-channel pathway (A). "
            "Four vulnerable systems multiplied — catastrophic sensitivity."
        ),
    },
    "authority": {
        "rank": 2,
        "formula_type": "single-substrate",
        "formula": "T × (1 - 0.4×CORT)",
        "primary_substrates": ["T", "CORT"],
        "vulnerability": (
            "Depends primarily on T — the most EMF-sensitive major hormone "
            "(Alogaily et al. 2025 RCT, N=136). CORT elevation further suppresses "
            "T-driven hierarchy via the dual-hormone mechanism (Mehta & "
            "Josephs 2010). Double hit: T falls AND CORT rises."
        ),
    },
    "loyalty": {
        "rank": 3,
        "formula_type": "interaction",
        "formula": "OXT × (0.50 + 0.50×T) × scaling",
        "primary_substrates": ["OXT", "T"],
        "vulnerability": (
            "Parochial OXT requires T co-activation for group defense. "
            "As T drops, OXT-driven bonding shifts from loyal to compliant. "
            "De Dreu 2011: in-group favoritism requires OXT AND competitive "
            "capacity (T). Without T, OXT produces conformity, not loyalty."
        ),
    },
    "liberty": {
        "rank": 4,
        "formula_type": "additive-suppressed",
        "formula": "(0.50×DA + 0.35×T) × (1 - 0.35×CORT)",
        "primary_substrates": ["DA", "T", "CORT"],
        "vulnerability": (
            "DA provides baseline autonomy drive. More resilient because "
            "dopaminergic neurons (VTA, substantia nigra) have greater "
            "redundancy than Leydig or pineal cells. But CORT suppression "
            "coefficient is high (0.35) — threat state eliminates risk-taking."
        ),
    },
    "care": {
        "rank": 5,
        "formula_type": "additive-floor",
        "formula": "OXT × (0.45 + 0.55×BDNF) × (1 - 0.3×CORT)",
        "primary_substrates": ["OXT", "BDNF"],
        "vulnerability": (
            "OXT provides strong baseline even degraded. The 0.45 floor "
            "in the formula means BDNF loss narrows scope (from universal "
            "to parochial) but does not eliminate care. Falls only at "
            "extreme degradation where OXT itself collapses."
        ),
    },
    "fairness": {
        "rank": 6,
        "formula_type": "triple-redundant",
        "formula": "(0.40×DA + 0.30×T + 0.15×OXT) × (1 - 0.2×CORT)",
        "primary_substrates": ["DA", "T", "OXT"],
        "vulnerability": (
            "Most resilient. Three independent inputs (DA, T, OXT) provide "
            "redundancy — any single system can partially sustain fairness. "
            "Low CORT coefficient (0.2) means stress suppression is minimal. "
            "DA (most buffered neurotransmitter) carries largest weight (0.40)."
        ),
    },
}


def foundation_collapse_order(
    year: float = 2025,
    threshold: float = 0.35,
) -> list[dict[str, Any]]:
    """Order in which moral foundations collapse as EMF increases.

    Computes foundation scores at each EMF environment and identifies
    the collapse point — the first environment where the score drops
    below threshold. Foundations are ranked from most to least
    vulnerable.

    The collapse order reveals that binding foundations (group-preserving)
    are systematically more biologically fragile than individualizing
    foundations (individual-protecting). This is not cultural — it is a
    consequence of which hormonal systems are most sensitive to EMF
    disruption (primary: CRY -> melatonin -> HPG, pathway B; secondary:
    VGCC/Ca2+, pathway A).
    """
    env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]

    all_scores: dict[str, dict[str, float]] = {}
    for env in env_order:
        markers = environment_biomarkers(env, year)
        all_scores[env] = moral_foundations_profile(markers)

    results: list[dict[str, Any]] = []
    for foundation in MORAL_FOUNDATION_FUNCTIONS:
        scores = {env: all_scores[env][foundation] for env in env_order}

        collapse_env = None
        for env in env_order:
            if scores[env] < threshold:
                collapse_env = env
                break

        vuln = FOUNDATION_VULNERABILITY.get(foundation, {})

        results.append({
            "foundation": foundation,
            "rank": vuln.get("rank", 99),
            "collapse_environment": collapse_env,
            "scores": {env: round(s, 4) for env, s in scores.items()},
            "formula_type": vuln.get("formula_type", "unknown"),
            "vulnerability": vuln.get("vulnerability", ""),
            "binding": foundation in BINDING_FOUNDATIONS,
        })

    results.sort(key=lambda x: x["rank"])
    return results


# ── r/K reproductive strategy ──
#
# Anonymous Conservative (2014) mapped r/K selection theory to political
# ideology: liberal = r-selected psychology, conservative = K-selected.
# Five paired traits define the continuum.
#
# BERM contribution: the author attributes r/K shifts to resource
# availability cycles. BERM identifies the MECHANISM — the urban EMF
# environment produces r-selected endocrine profiles through melatonin
# (pathway B, primary) and calcium-channel (pathway A) biomarker degradation. This is not evolution. It is environmental
# phenotypic mimicry: r-type behavioral outputs in a genetically
# K-selected species, produced by electromagnetic disruption of the
# hormonal systems that underpin K-strategy traits.
#
# The dopamine/amygdala nexus (Ch 17): DRD4-7r polymorphism is associated
# with liberal ideology, depression, promiscuity, and r-type behavior.
# EMF-driven DA dysregulation produces the same phenotype without the
# polymorphism. T. gondii alters dopamine signaling and produces r-type
# traits; EMF does the same through a different pathway.
#
# Cities (Ch 28): the author notes cities are r-selecting environments
# due to anonymity + resource abundance. BERM adds: cities are also the
# HIGHEST EMF environments. The urban-liberal correlation has a direct
# endocrine mechanism, not just a social-structural one.
#
# Key literature:
#   Anonymous Conservative 2014 (r/K political psychology)
#   Pianka 1970 (original r/K selection theory)
#   Wilson 1975 (Sociobiology: K-strategy and parental investment)
#   Rushton 1985 (differential K theory in humans)
#   Settle 2010 (DRD4-7r → liberal ideology, N=2574)
#   Alogaily et al. 2025 (T RCT → conservative shift, N=136)


RK_TRAIT_FUNCTIONS: dict[str, Any] = {}


def rk_competition(m: dict[str, float]) -> float:
    """Competition orientation. 0 = r (aversion), 1 = K (embrace).

    T: competitive drive, dominance motivation, risk tolerance.
    DA: incentive salience — reward from engaging in competition.
    CORT: chronic stress suppresses willingness to compete.

    K-selected organisms are programmed to compete aggressively.
    r-selected organisms avoid direct competition, seeking advantage
    through quantity over quality (Anonymous Conservative Ch 3).
    Alogaily et al. 2025 RCT: exogenous T shifts ideology conservative.
    """
    raw = (0.50 * m["T"] + 0.35 * m["DA"]) * (1.0 - 0.30 * m["CORT"])
    return max(0.0, min(1.0, raw))


def rk_mating_strategy(m: dict[str, float]) -> float:
    """Mating strategy. 0 = r (promiscuous), 1 = K (monogamous).

    OXT: pair-bonding, attachment (Feldman 2012, Walum 2012 AVPR1A).
    T: mate-guarding, investment in single partnership over multiple.
    The OXT×T interaction produces monogamous pair-bonding; when either
    drops, the phenotype shifts toward serial mating.

    K-organisms monopolize fit mates through monogamy. r-organisms
    mate as widely as possible to maximize offspring count.
    DRD4-7r associated with sexual promiscuity (Garcia 2010).
    """
    raw = m["OXT"] * (0.50 + 0.50 * m["T"])
    return max(0.0, min(1.0, raw))


def rk_parental_investment(m: dict[str, float]) -> float:
    """Parental investment. 0 = r (low/single), 1 = K (high/two-parent).

    OXT: nurturing drive, parent-offspring bonding (Feldman 2007).
    T: protective provisioning — in K species, both parents invest.
    BDNF: cognitive capacity for long-term investment planning.

    K-organisms invest heavily in few offspring to maximize
    competitive fitness. r-organisms produce many offspring with
    minimal per-child investment.
    """
    raw = 0.40 * m["OXT"] + 0.30 * m["T"] + 0.20 * m["BDNF"]
    return max(0.0, min(1.0, raw * (1.0 - 0.15 * m["CORT"])))


def rk_sexual_timing(m: dict[str, float]) -> float:
    """Sexual development timing. 0 = r (early onset), 1 = K (delayed).

    MEL: melatonin controls puberty onset via hypothalamic-pituitary-
    gonadal (HPG) axis. EMF-driven melatonin suppression directly
    accelerates pubertal onset (Waldhauser 1991, Commentz 1997).

    K-organisms delay sexual maturity to maximize mate value
    and competitive fitness before entering the mating market.
    r-organisms reproduce as early as possible. The secular trend
    toward earlier puberty maps directly onto melatonin decline.
    """
    raw = 0.60 * m["MEL"] + 0.25 * m["BDNF"] + 0.15 * m["T"]
    return max(0.0, min(1.0, raw))


def rk_group_loyalty(m: dict[str, float]) -> float:
    """In-group loyalty. 0 = r (none), 1 = K (fierce).

    OXT: in-group bonding (De Dreu 2011 ethnocentrism).
    T: out-group vigilance, group defense capacity.
    The OXT×T interaction is identical to the Loyalty moral foundation.

    K-organisms exhibit fierce in-group loyalty and out-group hostility.
    r-organisms show no in-group preference — the concept of in-group
    vs out-group is foreign to the r-psychology (Anonymous Conservative
    Ch 3, 5). Cities undermine the 3 R's (reputation, reciprocity,
    retribution) that maintain group cohesion (Ch 28).
    """
    raw = m["OXT"] * (0.50 + 0.50 * m["T"]) * (1.0 + 0.1 * m["CORT"])
    return max(0.0, min(1.0, raw * 0.80))


RK_TRAIT_FUNCTIONS = {
    "competition": rk_competition,
    "mating_strategy": rk_mating_strategy,
    "parental_investment": rk_parental_investment,
    "sexual_timing": rk_sexual_timing,
    "group_loyalty": rk_group_loyalty,
}

RK_TRAIT_LABELS: dict[str, dict[str, str]] = {
    "competition": {"r": "Aversion", "K": "Embrace"},
    "mating_strategy": {"r": "Promiscuity", "K": "Monogamy"},
    "parental_investment": {"r": "Low / single-parent", "K": "High / two-parent"},
    "sexual_timing": {"r": "Early onset", "K": "Delayed maturity"},
    "group_loyalty": {"r": "No in-group preference", "K": "Fierce in-group loyalty"},
}

RK_TRAIT_SUBSTRATES: dict[str, list[str]] = {
    "competition": ["T", "DA", "CORT"],
    "mating_strategy": ["OXT", "T"],
    "parental_investment": ["OXT", "T", "BDNF"],
    "sexual_timing": ["MEL", "BDNF", "T"],
    "group_loyalty": ["OXT", "T"],
}


def rk_strategy_index(markers: dict[str, float]) -> float:
    """Composite r/K strategy index. 0 = pure r, 1 = pure K.

    Equal-weighted average of all five trait dimensions.
    """
    scores = [fn(markers) for fn in RK_TRAIT_FUNCTIONS.values()]
    return round(sum(scores) / len(scores), 4)


def rk_strategy_profile(markers: dict[str, float]) -> dict[str, Any]:
    """Full r/K strategy profile from biomarker state.

    Returns individual trait scores, composite index, and classification.
    """
    traits = {name: round(fn(markers), 4) for name, fn in RK_TRAIT_FUNCTIONS.items()}
    index = round(sum(traits.values()) / len(traits), 4)

    if index >= 0.70:
        classification = "K-selected"
    elif index >= 0.45:
        classification = "mixed"
    else:
        classification = "r-selected"

    return {
        "traits": traits,
        "index": index,
        "classification": classification,
        "substrates": RK_TRAIT_SUBSTRATES,
        "labels": RK_TRAIT_LABELS,
    }


def rk_environment_gradient(
    year: float = 2025,
) -> list[dict[str, Any]]:
    """r/K strategy across EMF environments.

    Shows how the same genetically K-selected species expresses
    increasingly r-selected phenotypes as EMF increases.
    """
    env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
    results: list[dict[str, Any]] = []

    for env_name in env_order:
        markers = environment_biomarkers(env_name, year)
        profile = rk_strategy_profile(markers)
        results.append({
            "environment": env_name,
            "rk_index": profile["index"],
            "classification": profile["classification"],
            "traits": profile["traits"],
        })

    return results


def moral_distress_index(
    mf: dict[str, float],
    threshold: float = 0.35,
) -> dict[str, Any]:
    """Psychological distress predicted by moral foundation narrowing.

    When binding foundations (Loyalty, Authority, Sanctity) collapse
    while individualizing foundations (Care, Fairness) remain, the
    resulting phenotype is:
    - Hyperactivated harm detection without stabilizing structure
    - Unbounded empathy scope without parochial limits (compassion fatigue)
    - No group belonging (anomie)
    - No meaning framework (nihilism)
    - No hierarchy acceptance (constant status anxiety)

    This maps onto the clinical picture observed in liberal populations,
    especially women (Gimbrone 2022, Gallup 2023): depression, anxiety,
    low meaning-in-life, identity fragmentation.

    Literature:
        Gimbrone 2022 (JAAH): liberal adolescent girls show sharply
            increasing depression from 2012, conservatives stable.
        Twenge 2019 (J Abnorm Psych): iGen mental health decline.
        Gallup 2023: 56% of white liberal women 18-29 report diagnosed
            mental health condition vs 28% conservative women.
        Lukianoff & Haidt 2018: cognitive distortions (emotional reasoning,
            catastrophizing) spreading on campuses.
    """
    mb = moral_breadth(mf, threshold)
    binding_active = mb["binding_active"]
    indiv_active = mb["individualizing_active"]

    care_val = mf.get("care", 0)
    authority_val = mf.get("authority", 0)
    loyalty_val = mf.get("loyalty", 0)
    sanctity_val = mf.get("sanctity", 0)

    imbalance = indiv_active - binding_active
    narrowing = (mb["total"] - mb["active_count"]) / mb["total"]

    harm_hyperactivation = max(0.0, care_val - authority_val)
    anomie = max(0.0, 1.0 - loyalty_val)
    meaning_deficit = max(0.0, 1.0 - sanctity_val)

    distress = (
        0.25 * harm_hyperactivation
        + 0.30 * anomie
        + 0.25 * meaning_deficit
        + 0.20 * narrowing
    )

    return {
        "distress_index": round(min(1.0, distress), 4),
        "binding_active": binding_active,
        "individualizing_active": indiv_active,
        "imbalance": imbalance,
        "narrowing": round(narrowing, 4),
        "components": {
            "harm_hyperactivation": round(harm_hyperactivation, 4),
            "anomie": round(anomie, 4),
            "meaning_deficit": round(meaning_deficit, 4),
        },
    }


# ── In-group loyalty collapse ──
#
# Loyalty/Betrayal (OXT × T) is the most fragile moral foundation because:
#
# 1. MULTIPLICATIVE FORMULA. loyalty = OXT × (0.5 + 0.5T) × scaling.
#    When both inputs drop by X%, output drops ~2X% (vs ~X% for additive
#    formulas like Care). This is not a design choice — it reflects the
#    biology: in-group allegiance requires BOTH empathic bonding (OXT)
#    AND active defense motivation (T) simultaneously.
#
# 2. SUBSTRATE SENSITIVITY ORDERING. Melatonin degrades fastest under
#    EMF (pineal/CRY, pathway B), then testosterone (Leydig cells: minimal
#    redundancy, steep dose-response), then OXT (hypothalamic neurons),
#    then DA, and BDNF slowest (cortical neurons, greater redundancy).
#    Since Loyalty depends on two of the three MOST sensitive substrates
#    (OXT × T) while Care depends on OXT and the LEAST sensitive (BDNF),
#    Loyalty collapses first.
#
#    Measured across the BERM gradient (environment_biomarkers, 2025):
#      MEL:  0.966 (amish) → 0.366 (urban_office) = 62% decline
#      T:    0.955 → 0.393 = 59% decline
#      OXT:  0.962 → 0.520 = 46% decline
#      DA:   0.967 → 0.572 = 41% decline
#      BDNF: 0.961 → 0.690 = 28% decline
#
# 3. CONSEQUENCES OF COLLAPSE.
#    a. Boundary dissolution — in-group/out-group distinction has no
#       biological substrate. The concept of "us" becomes cognitively
#       available but motivationally empty.
#    b. Collective action failure — Olson (1965): collective action
#       requires trust (OXT), punishment willingness (T), and shared
#       identity (OXT×T). All three depend on loyalty substrates.
#    c. Pathological universalism — when binding foundations collapse
#       but individualizing remain, Care fills the moral vacuum.
#       Care without Loyalty is: universal (no boundary), immediate
#       (no temporal discounting), individual (no group-level cost
#       accounting), and non-reciprocal (no mutual obligation).
#    d. Policy vulnerability — specific policy domains become
#       systematically pathological because the moral foundations
#       that would constrain them are absent.
#    e. Feedback ratchet — loyalty collapse produces policies that
#       further erode social cohesion, which further degrades OXT
#       through reduced bonding, which further collapses loyalty.
#       Putnam 2007 ("E Pluribus Unum"): ethnic diversity reduces
#       social trust even within in-groups. The collapse catalyzes
#       the conditions that deepen it.
#
# 4. THE IMMIGRATION CASE (flagship prediction).
#    Support for net-negative immigration in collapsed-loyalty populations
#    is not irrationality — it is the rational output of Care-only moral
#    reasoning. Care sees individual migrant suffering (proximate, visible,
#    emotionally salient). The foundations that would check Care are absent:
#    Loyalty (in-group cost accounting), Authority (standards enforcement),
#    Sanctity (cultural boundary maintenance), Fairness-as-reciprocity
#    (mutual obligation). The result: admission without integration
#    requirement, without economic viability assessment, without cultural
#    compatibility consideration. The policy is pathological from a whole-
#    palette perspective but perfectly rational from the remaining palette.
#
# Literature:
#     De Dreu 2010 (Science, N=280): OXT increases in-group favoritism.
#     De Dreu 2011 (PNAS): OXT drives ethnocentrism — in-group love
#         and out-group derogation are the same mechanism.
#     Putnam 2007 (Scandinavian Pol Studies): diversity → reduced trust,
#         reduced social capital, "hunkering down" — even within own group.
#     Olson 1965 (Logic of Collective Action): collective goods require
#         selective incentives, group identity, or coercion.
#     Shalvi & De Dreu 2014: OXT promotes group-serving dishonesty —
#         loyalty enables deception on behalf of the in-group.
#     Stallen 2012: OXT increases conformity to in-group norms only.
#     Henrich 2020 (WEIRDest People): Western individualism as
#         dissolution of kin-based cooperative structures.


POLICY_DOMAINS: dict[str, dict[str, Any]] = {
    "immigration": {
        "label": "Immigration openness",
        "label_fi": "Maahanmuuttoavoimuus",
        "driver": "care",
        "constraint_weights": {"loyalty": 0.45, "authority": 0.35, "sanctity": 0.20},
        "mechanism": "Care responds to visible migrant suffering. Loyalty (in-group cost accounting), Authority (standards enforcement), and Sanctity (cultural boundary maintenance) are absent.",
        "mechanism_fi": "Huolenpito reagoi näkyvään siirtolaiskärsimykseen. Lojaalius (sisäryhmän kustannuslaskenta), Auktoriteetti (standardien täytäntöönpano) ja Pyhyys (kulttuuristen rajojen ylläpito) puuttuvat.",
    },
    "criminal_leniency": {
        "label": "Criminal leniency",
        "label_fi": "Rikosoikeudellinen lievyys",
        "driver": "care",
        "constraint_weights": {"authority": 0.40, "loyalty": 0.35, "sanctity": 0.25},
        "mechanism": "Care responds to offender suffering under punishment. Authority (rule enforcement), Loyalty (community protection), and Sanctity (moral boundaries) are absent.",
        "mechanism_fi": "Huolenpito reagoi rikoksentekijän kärsimykseen rangaistuksen alla. Auktoriteetti (sääntöjen täytäntöönpano), Lojaalius (yhteisön suojelu) ja Pyhyys (moraaliset rajat) puuttuvat.",
    },
    "welfare_nonreciprocity": {
        "label": "Welfare without reciprocity",
        "label_fi": "Hyvinvointi ilman vastavuoroisuutta",
        "driver": "care",
        "constraint_weights": {"loyalty": 0.55, "authority": 0.45},
        "mechanism": "Care responds to material need. Loyalty (mutual obligation) and Authority (behavioral standards) would demand contribution in return.",
        "mechanism_fi": "Huolenpito reagoi materiaaliseen tarpeeseen. Lojaalius (keskinäinen velvoite) ja Auktoriteetti (käyttäytymisstandardit) vaatisivat vastasuoritusta.",
    },
    "foreign_policy_naivety": {
        "label": "Foreign policy naivety",
        "label_fi": "Ulkopolitiikan naiivius",
        "driver": "care",
        "constraint_weights": {"loyalty": 0.50, "authority": 0.30, "liberty": 0.20},
        "mechanism": "Care responds to global suffering. Loyalty (national interest), Authority (power dynamics comprehension), and Liberty (sovereignty protection) are absent.",
        "mechanism_fi": "Huolenpito reagoi globaaliin kärsimykseen. Lojaalius (kansallinen intressi), Auktoriteetti (valtadynamiikan ymmärtäminen) ja Vapaus (suvereniteetin suojelu) puuttuvat.",
    },
    "demographic_indifference": {
        "label": "Demographic indifference",
        "label_fi": "Demografinen välinpitämättömyys",
        "driver": "care",
        "constraint_weights": {"loyalty": 0.60, "sanctity": 0.40},
        "mechanism": "Without Loyalty, group composition is morally irrelevant. Without Sanctity, cultural continuity has no sacred dimension. Only individual-level wellbeing registers.",
        "mechanism_fi": "Ilman Lojaalisuutta ryhmän koostumus on moraalisesti merkityksetön. Ilman Pyhyyttä kulttuurisella jatkuvuudella ei ole pyhää ulottuvuutta. Vain yksilötason hyvinvointi rekisteröityy.",
    },
}


def collective_action_capacity(markers: dict[str, float]) -> float:
    """Geometric mean of the three Olson prerequisites for collective action.

    Olson (1965): collective goods require trust, enforcement capacity,
    and shared identity. All three must be present — weakness in any one
    makes collective action impossible regardless of the others. The
    geometric mean captures this: if any input approaches zero, the
    product approaches zero.

    Inputs:
        trust = OXT (oxytocin → social bonding, reciprocity baseline)
        enforcement = T (testosterone → punishment of free-riders)
        identification = loyalty_betrayal(markers) (OXT×T → group identity)
    """
    trust = markers["OXT"]
    enforcement = markers["T"]
    identification = loyalty_betrayal(markers)
    return round((trust * enforcement * identification) ** (1.0 / 3.0), 4)


def pathological_universalism_index(
    markers: dict[str, float],
    threshold: float = 0.35,
) -> float:
    """Measures Care-driven moral reasoning without binding constraints.

    Pathological universalism is the state where individualizing foundations
    (Care, Fairness, Liberty) remain functional while binding foundations
    (Loyalty, Authority, Sanctity) have collapsed below threshold. Care
    fills the moral vacuum, producing policy preferences that are rational
    from the remaining palette but pathological from the full palette.

    The index peaks in the suburban-to-urban transition zone where binding
    has collapsed but individualizing remains. At very high EMF (deep
    urban), even Care degrades, and universalism gives way to nihilism.
    """
    mf = moral_foundations_profile(markers)
    mb = moral_breadth(mf, threshold)

    binding_mean = (mf["loyalty"] + mf["authority"] + mf["sanctity"]) / 3.0
    indiv_mean = (mf["care"] + mf["fairness"] + mf["liberty"]) / 3.0

    imbalance_continuous = max(0.0, indiv_mean - binding_mean) / max(0.01, indiv_mean)

    threshold_gap = max(0, mb["individualizing_active"] - mb["binding_active"]) / 3.0

    pu = 0.5 * imbalance_continuous + 0.5 * threshold_gap
    return round(max(0.0, min(1.0, pu)), 4)


def policy_vulnerability_profile(
    markers: dict[str, float],
    threshold: float = 0.35,
) -> dict[str, Any]:
    """Per-domain policy vulnerability from loyalty/binding collapse.

    For each policy domain, computes vulnerability as:
      (1 - weighted_constraint) × min(1, care_driver / threshold)

    The first term measures how degraded the constraining foundations are.
    The second term measures whether Care still provides moral motivation
    (if Care itself has collapsed, the population shifts from pathological
    universalism to apathy/nihilism — a different failure mode).
    """
    mf = moral_foundations_profile(markers)
    results: dict[str, Any] = {}

    for domain, spec in POLICY_DOMAINS.items():
        driver_score = mf[spec["driver"]]
        constraint = sum(
            w * mf[f] for f, w in spec["constraint_weights"].items()
        )
        care_factor = min(1.0, driver_score / threshold)
        vuln = (1.0 - constraint) * care_factor
        results[domain] = {
            "vulnerability": round(max(0.0, min(1.0, vuln)), 4),
            "driver": round(driver_score, 4),
            "constraint": round(constraint, 4),
            "label": spec["label"],
        }

    return results


def loyalty_collapse_analysis(
    markers: dict[str, float],
    threshold: float = 0.35,
) -> dict[str, Any]:
    """Comprehensive analysis of in-group loyalty collapse and its consequences.

    Returns substrate fragility metrics, collective action capacity,
    pathological universalism index, per-domain policy vulnerability,
    and feedback ratchet velocity.
    """
    mf = moral_foundations_profile(markers)
    mb = moral_breadth(mf, threshold)

    loyalty_score = mf["loyalty"]
    care_score = mf["care"]
    authority_score = mf["authority"]
    sanctity_score = mf["sanctity"]

    boundary_dissolution = round(max(0.0, 1.0 - loyalty_score), 4)

    care_dominance = round(
        care_score / max(0.01, care_score + loyalty_score + authority_score + sanctity_score),
        4,
    )

    cap = collective_action_capacity(markers)
    pu = pathological_universalism_index(markers, threshold)
    pvp = policy_vulnerability_profile(markers, threshold)

    ratchet = round(
        (1.0 - loyalty_score) * (1.0 - cap),
        4,
    )

    return {
        "loyalty": round(loyalty_score, 4),
        "care": round(care_score, 4),
        "boundary_dissolution": boundary_dissolution,
        "care_dominance": care_dominance,
        "collective_action_capacity": cap,
        "pathological_universalism": pu,
        "ratchet_velocity": ratchet,
        "binding_active": mb["binding_active"],
        "individualizing_active": mb["individualizing_active"],
        "policy_vulnerability": pvp,
    }


def loyalty_collapse_gradient(
    year: float = 2025,
) -> list[dict[str, Any]]:
    """Loyalty collapse analysis across EMF environments.

    Shows the full degradation gradient from K-selected Amish
    (intact loyalty, high collective action) to r-selected urban
    (dissolved boundaries, pathological universalism, policy
    vulnerability, self-reinforcing feedback ratchet).
    """
    env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
    results: list[dict[str, Any]] = []

    for env_name in env_order:
        markers = environment_biomarkers(env_name, year)
        analysis = loyalty_collapse_analysis(markers)
        analysis["environment"] = env_name
        results.append(analysis)

    return results


# ── IQ Shredder: biological substrate ──
#
# Nick Land (2014) / Spandrell (2013): high-performance cities attract
# talent via selective immigration, extract maximum economic productivity,
# and suppress fertility to sub-replacement. "First-order eugenics
# produces second-order dysgenics."
#
# BERM provides the biological mechanism: the same EMF-dense environment
# that enables economic concentration also suppresses the endocrine
# substrates of reproduction. Singapore's TFR 0.78 is not a rational
# economic choice — it is endocrine suppression in the most
# electromagnetically dense environment on earth.
#
# The shredder has five measurable biological components:
#
# 1. Reproductive suppression — T↓ (male drive), OXT↓ (pair-bonding),
#    CORT↑ (fertility window), DA↓ (reward from parenting)
#
# 2. Dopaminergic capture — low DA → need more stimulation → work
#    harder → more screen/urban time → more EMF → lower DA.
#    The hedonic treadmill is biological, not cultural.
#
# 3. Time preference shift — DA↓ + BDNF↓ → future discount steepens →
#    20-year investments (children) neurologically devalued.
#
# 4. Genetic burn rate — sub-replacement fertility × epigenetic damage
#    to offspring who are born. The TFR alone underestimates the loss.
#
# 5. Shredder efficiency — the core irony: environments that maximize
#    economic extraction also maximize biological destruction.
#    BioCap and productivity move in opposite directions.


IQ_SHREDDER_LABELS: dict[str, dict[str, str]] = {
    "reproductive_suppression": {
        "label": "Reproductive suppression",
        "label_fi": "Lisääntymisen suppressio",
        "mechanism": "Male drive (T), pair-bonding (OXT), fertility window (CORT), parental reward (DA+BDNF) — all degraded",
        "mechanism_fi": "Miehen aloitekyky (T), parisitoutuminen (OXT), fertiliteettiikkuna (CORT), vanhemmuuden palkitsevuus (DA+BDNF) — kaikki heikentyneet",
    },
    "dopaminergic_capture": {
        "label": "Dopaminergic capture",
        "label_fi": "Dopaminerginen kaappaus",
        "mechanism": "Low DA → need more stimulation → work harder for less reward → hedonic treadmill",
        "mechanism_fi": "Matala DA → enemmän stimulaatiota tarvitaan → kovempi työ pienemmästä palkinnosta → hedonistinen juoksumatto",
    },
    "time_preference_shift": {
        "label": "Time preference shift",
        "label_fi": "Aikapreferenssin siirtymä",
        "mechanism": "DA↓ + BDNF↓ → steeper temporal discounting → 20-year investments (children) neurologically devalued",
        "mechanism_fi": "DA↓ + BDNF↓ → jyrkempi aikapreferenssi → 20 vuoden investoinnit (lapset) neurologisesti devalvoitu",
    },
    "genetic_burn_rate": {
        "label": "Genetic burn rate",
        "label_fi": "Geneettinen palamisnopeus",
        "mechanism": "Sub-replacement fertility × epigenetic damage to offspring. TFR alone underestimates the loss.",
        "mechanism_fi": "Alle uusiutumistasoinen hedelmällisyys × epigeneettinen vahinko jälkeläisiin. TFR yksinään aliarvioi menetyksen.",
    },
    "shredder_efficiency": {
        "label": "Shredder efficiency",
        "label_fi": "Shredderin tehokkuus",
        "mechanism": "Ratio of economic extraction to biological cost. Maximized where BioCap is minimized.",
        "mechanism_fi": "Ekonomisen louhinnan suhde biologiseen kustannukseen. Maksimoitu siellä missä BioCap on minimoitu.",
    },
}


def reproductive_suppression_index(markers: dict[str, float]) -> float:
    """How much reproductive capacity is endocrine-suppressed.

    Four pathways must all function for population-level reproduction:
    - Male reproductive drive: T provides initiative, CORT suppresses
    - Female bonding capacity: OXT for attachment, CORT disrupts
    - Pair-bond stability: OXT×T multiplicative interaction
    - Parental investment motivation: OXT + T + BDNF, CORT-suppressed

    Returns 0 (no suppression, full capacity) to 1 (total suppression).
    """
    t = markers.get("T", 0.5)
    oxt = markers.get("OXT", 0.5)
    bdnf = markers.get("BDNF", 0.5)
    cort = markers.get("CORT", 0.5)

    male_drive = t * max(0.0, 1.0 - 0.5 * cort)
    female_bond = oxt * max(0.0, 1.0 - 0.4 * cort)
    pair_bond = oxt * t
    parental = (oxt + t + bdnf) / 3.0 * max(0.0, 1.0 - 0.3 * cort)

    capacity = (male_drive * female_bond * pair_bond * parental) ** 0.25
    return round(1.0 - capacity, 4)


def dopaminergic_capture_index(markers: dict[str, float]) -> float:
    """How trapped in the hedonic treadmill.

    Low DA → natural rewards (relationships, parenting, community)
    feel insufficient → seek artificial stimulation (screens, work,
    substances) → more EMF exposure → lower DA. The loop is biological.

    High CORT adds anxiety-driven productivity: working not for reward
    but to avoid the discomfort of not working.

    Returns 0 (free) to 1 (maximally captured).
    """
    da = markers.get("DA", 0.5)
    bdnf = markers.get("BDNF", 0.5)
    cort = markers.get("CORT", 0.5)

    da_deficit = 1.0 - da
    bdnf_deficit = 1.0 - bdnf
    cort_drive = cort

    return round(
        max(0.0, min(1.0, 0.45 * da_deficit + 0.25 * bdnf_deficit + 0.30 * cort_drive)),
        4,
    )


def time_preference_biological(markers: dict[str, float]) -> float:
    """Biological temporal discounting — how devalued are long-term investments.

    DA regulates delayed gratification (McClure 2004). BDNF supports
    abstract future-modeling. Low DA + low BDNF → present-oriented,
    short-term maximization. Children are a 20+ year investment that
    requires neurological capacity to value distant future payoffs.

    Returns 0 (low discounting, values future) to 1 (steep discounting,
    present-only). This is the INVERSE of time_preference() in the
    orientation module, which measures planning CAPACITY.
    """
    tp = time_preference(markers)
    return round(1.0 - tp, 4)


def genetic_burn_rate(markers: dict[str, float]) -> float:
    """Rate of genetic capital destruction.

    Combines reproductive suppression (fewer offspring) with the
    epigenetic damage component (offspring who are born carry
    CaMKII-mediated methylation changes). The TFR alone underestimates
    the biological cost because even born children have degraded
    substrate.

    BDNF decline (28%) reflects neurodevelopmental damage.
    MEL decline reflects disrupted developmental timing.

    Returns 0 (no burn) to 1 (maximum destruction rate).
    """
    suppression = reproductive_suppression_index(markers)
    mel = markers.get("MEL", 0.5)
    bdnf = markers.get("BDNF", 0.5)

    epigenetic_damage = 1.0 - (0.5 * bdnf + 0.5 * mel)
    return round(
        max(0.0, min(1.0, 0.65 * suppression + 0.35 * epigenetic_damage)),
        4,
    )


def shredder_efficiency(markers: dict[str, float]) -> float:
    """The core IQ Shredder metric: economic extraction vs biological cost.

    High shredder efficiency means the environment is effective at
    converting human capital into economic output while destroying
    reproductive capacity. This is maximized in the densest urban
    environments.

    Dopaminergic capture (productivity extraction) × reproductive
    suppression (biological cost). Geometric mean ensures both
    must be present — capture without suppression is just productivity,
    suppression without capture is just poverty.

    Returns 0 (not a shredder) to 1 (maximum shredder).
    """
    capture = dopaminergic_capture_index(markers)
    suppression = reproductive_suppression_index(markers)

    return round((capture * suppression) ** 0.5, 4)


def iq_shredder_profile(markers: dict[str, float]) -> dict[str, Any]:
    """Comprehensive IQ Shredder analysis for a biomarker state."""
    bc = compute_biocap(markers)
    rk = rk_strategy_index(markers)

    return {
        "reproductive_suppression": reproductive_suppression_index(markers),
        "dopaminergic_capture": dopaminergic_capture_index(markers),
        "time_preference_shift": time_preference_biological(markers),
        "genetic_burn_rate": genetic_burn_rate(markers),
        "shredder_efficiency": shredder_efficiency(markers),
        "biocap": round(bc, 4),
        "rk_index": round(rk, 4),
    }


def iq_shredder_gradient(year: float = 2025) -> list[dict[str, Any]]:
    """IQ Shredder analysis across all EMF environments.

    Shows the shredder effect intensifying from amish (not a shredder)
    through rural/suburban to urban_office (maximum shredder).
    Singapore-class environments would register beyond urban_office.
    """
    env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
    results: list[dict[str, Any]] = []

    for env_name in env_order:
        markers = environment_biomarkers(env_name, year)
        profile = iq_shredder_profile(markers)
        profile["environment"] = env_name
        profile["emf_factor"] = ENVIRONMENTS[env_name].emf_factor
        results.append(profile)

    return results


# ── Pathopolitēs: the pathological citizen ──
#
# Greek: pathos (suffering/disease) + politēs (citizen).
# The individual whose identity and citizenship are constructed
# around trauma, vulnerability, and pathology.
#
# The pathopolitēs is not a personality type or a political choice.
# It is an endocrine phenotype: what a human becomes when the
# hormonal infrastructure of resilience, competence, meaning, and
# self-determination degrades below critical thresholds.
#
# When T↓ removes the substrate for competence-based identity,
# CORT↑ installs threat-sensitivity as the default orientation,
# DA↓ eliminates internal motivation, BDNF↓ reduces cognitive
# resilience, and OXT↓×T↓ dissolves group belonging — the
# resulting individual has no choice but to construct identity
# from what remains: victimhood, vulnerability, safety-seeking,
# and moral claims derived from suffering rather than achievement.
#
# This is the missing link between patopolis (the pathological city)
# and patokratia (pathological governance): the city produces the
# citizen, the citizen produces the politics.
#
# Six measurable dimensions:
#
# 1. Victimhood identity — inability to build identity through
#    competence (T↓) → identity built around vulnerability
#
# 2. Safety-seeking — threat as default orientation (CORT↑ × T↓)
#    → safetyism (Lukianoff & Haidt 2018)
#
# 3. External locus — internal motivation generator broken (DA↓)
#    → dependence on external validation and structure
#
# 4. Cognitive fragility — can't metabolize challenge (BDNF↓)
#    → micro-aggressions, trigger warnings, safe spaces
#
# 5. Anomic distress — no group belonging (OXT↓ × T↓ → loyalty↓)
#    → identity shopping, tribe-hopping, parasocial attachment
#
# 6. Moral compensation — moral grandstanding substitutes for
#    actual moral capacity (Care without binding foundations)


def victimhood_identity_index(markers: dict[str, float]) -> float:
    """Inability to build identity through competence or achievement.

    T provides the substrate for status-seeking, risk-taking, and
    competitive identity formation. DA provides the reward signal
    for achievement. BDNF provides the cognitive framework for
    building a competence narrative. CORT suppresses all three.

    When these degrade, the individual cannot construct identity
    from "what I can do" and defaults to "what has been done to me."
    This is not a choice — it is the only identity-construction
    pathway that remains functional when the achievement pathway
    is suppressed.

    Returns 0 (competence-based identity) to 1 (victimhood-based).
    """
    t = markers.get("T", 0.5)
    da = markers.get("DA", 0.5)
    bdnf = markers.get("BDNF", 0.5)
    cort = markers.get("CORT", 0.5)

    competence_capacity = (
        0.40 * t + 0.30 * da + 0.20 * bdnf
    ) * max(0.0, 1.0 - 0.4 * cort)
    return round(1.0 - max(0.0, min(1.0, competence_capacity)), 4)


def safety_seeking_index(markers: dict[str, float]) -> float:
    """Threat as default orientation — safetyism.

    High CORT installs chronic threat detection. Low T removes
    the capacity to confront threats. The result: expanded threat
    definitions (micro-aggressions), avoidance as primary coping
    strategy, demand for external protection.

    Lukianoff & Haidt (2018): three "great untruths" — fragility
    ("what doesn't kill you makes you weaker"), emotional reasoning
    ("always trust your feelings"), us-vs-them ("life is a battle
    between good and evil people"). All three are CORT-high, T-low
    phenotypic expressions.

    Returns 0 (resilient, confronts threats) to 1 (maximally
    safety-seeking).
    """
    cort = markers.get("CORT", 0.5)
    t = markers.get("T", 0.5)
    bdnf = markers.get("BDNF", 0.5)

    threat_activation = cort * max(0.0, 1.0 - 0.5 * t)
    resilience_deficit = 1.0 - (0.5 * t + 0.5 * bdnf)
    return round(
        max(0.0, min(1.0, 0.55 * threat_activation + 0.45 * resilience_deficit)),
        4,
    )


def external_locus_index(markers: dict[str, float]) -> float:
    """Dependence on external validation and structure.

    DA provides internal motivation — the capacity to generate
    drive from within. T provides self-determination and autonomy.
    When both degrade, the individual requires external sources
    of motivation, validation, meaning, and direction.

    This maps onto: dependence on social media validation, inability
    to self-regulate without institutional scaffolding, demand for
    external authority to solve problems that previous generations
    solved individually.

    Returns 0 (internal locus, self-directed) to 1 (external locus,
    other-directed).
    """
    da = markers.get("DA", 0.5)
    t = markers.get("T", 0.5)
    cort = markers.get("CORT", 0.5)

    internal_drive = (0.50 * da + 0.35 * t) * max(0.0, 1.0 - 0.3 * cort)
    return round(1.0 - max(0.0, min(1.0, internal_drive)), 4)


def cognitive_fragility_index(markers: dict[str, float]) -> float:
    """Inability to metabolize challenge, novelty, or disagreement.

    BDNF supports cognitive flexibility — the capacity to integrate
    new information, tolerate ambiguity, and update models. T supports
    confrontation with difficult truths. MEL supports the sleep-
    dependent consolidation that converts challenge into growth.

    When these degrade, challenge is experienced as damage rather
    than stimulus. This is the biological substrate of trigger
    warnings, safe spaces, and the conflation of discomfort with harm.

    Returns 0 (antifragile) to 1 (maximally fragile).
    """
    bdnf = markers.get("BDNF", 0.5)
    t = markers.get("T", 0.5)
    mel = markers.get("MEL", 0.5)

    antifragility = 0.45 * bdnf + 0.30 * t + 0.25 * mel
    return round(1.0 - max(0.0, min(1.0, antifragility)), 4)


def anomic_distress_index(markers: dict[str, float]) -> float:
    """Absence of group belonging — identity untethered.

    OXT×T interaction produces group loyalty. When it collapses,
    the individual has no stable tribe, no inherited identity,
    no belonging framework. The result: serial identity adoption
    (identity shopping), parasocial relationships substituting
    for real community, performative group membership without
    genuine allegiance.

    Durkheim's anomie quantified: the biological substrate of
    social disconnection that precedes the psychological experience.

    Returns 0 (embedded in community) to 1 (anomic).
    """
    oxt = markers.get("OXT", 0.5)
    t = markers.get("T", 0.5)
    cort = markers.get("CORT", 0.5)

    loyalty_capacity = oxt * t
    belonging = loyalty_capacity * max(0.0, 1.0 - 0.3 * cort)
    return round(1.0 - max(0.0, min(1.0, belonging)), 4)


def moral_compensation_index(markers: dict[str, float]) -> float:
    """Moral grandstanding as substitute for moral capacity.

    When binding foundations (Loyalty, Authority, Sanctity) collapse
    but Care remains, the individual has moral energy without moral
    structure. This energy must go somewhere: it becomes performative
    morality — public displays of caring that substitute for the
    capacity to actually maintain social structures.

    High Care + low Loyalty + low Authority = moral compensation.
    The individual signals virtue because they cannot practice it
    in the structural sense (maintaining commitments, enforcing
    standards, preserving institutions).

    Returns 0 (structured morality) to 1 (fully compensatory).
    """
    mf = moral_foundations_profile(markers)
    care = mf.get("care", 0)
    loyalty = mf.get("loyalty", 0)
    authority = mf.get("authority", 0)
    sanctity = mf.get("sanctity", 0)

    binding_mean = (loyalty + authority + sanctity) / 3.0
    imbalance = max(0.0, care - binding_mean)
    structure_deficit = 1.0 - binding_mean
    return round(
        max(0.0, min(1.0, 0.50 * imbalance + 0.50 * structure_deficit)),
        4,
    )


def pathopolites_profile(markers: dict[str, float]) -> dict[str, Any]:
    """Comprehensive Pathopolitēs profile for a biomarker state.

    The six dimensions of the pathological citizen, plus the
    composite pathopolites index (geometric mean of all six —
    all dimensions must be elevated for the full phenotype).
    """
    vi = victimhood_identity_index(markers)
    ss = safety_seeking_index(markers)
    el = external_locus_index(markers)
    cf = cognitive_fragility_index(markers)
    ad = anomic_distress_index(markers)
    mc = moral_compensation_index(markers)

    composite = (vi * ss * el * cf * ad * mc) ** (1.0 / 6.0)

    mf = moral_foundations_profile(markers)
    mdi = moral_distress_index(mf)

    return {
        "victimhood_identity": vi,
        "safety_seeking": ss,
        "external_locus": el,
        "cognitive_fragility": cf,
        "anomic_distress": ad,
        "moral_compensation": mc,
        "pathopolites_index": round(composite, 4),
        "moral_distress": mdi["distress_index"],
    }


def pathopolites_gradient(year: float = 2025) -> list[dict[str, Any]]:
    """Pathopolitēs analysis across all EMF environments.

    Maps the emergence of the pathological citizen from amish
    (virtually absent) through suburban (emerging) to urban_office
    (fully expressed phenotype).
    """
    env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
    results: list[dict[str, Any]] = []

    for env_name in env_order:
        markers = environment_biomarkers(env_name, year)
        profile = pathopolites_profile(markers)
        profile["environment"] = env_name
        results.append(profile)

    return results


# ── Signal degradation — the third layer of pair-bonding collapse ──
#
# The BERM pair-bonding model captured motivational (T↓, DA↓) and
# attachment (OXT↓) collapse. The signal degradation layer adds the
# missing third mechanism: physical attractiveness signals are ALL
# hormonally dependent, and degrade proportionally with biomarker state.
#
# Three signal categories:
#
# 1. Morphological signals — static body composition cues driven by
#    sex hormones: waist-to-hip ratio (Lassek & Gaulin 2008), muscle
#    mass (T → androgenic muscle), facial dimorphism (Penton-Voak 2001),
#    breast/hip fat distribution (E-dependent).
#
# 2. Dynamic signals — behavioral/physiological cues that change in
#    real-time: voice pitch (Pipitone 2008: fundamental frequency
#    shifts across ovulatory cycle), facial expressiveness (DA →
#    reward-driven social engagement), postural confidence (T → erect
#    posture, CORT → slumped/defensive).
#
# 3. Cryptic signals — subtle cues below conscious awareness that
#    drive mate preference: lip color shifts during ovulation (Burriss
#    2015), body odor / MHC signaling (Wedekind 1995 sweaty T-shirt),
#    limbal ring contrast (Peshek 2011), skin luminance and
#    homogeneity (Jones 2004), pupil dilation during attraction.
#
# The pairing equation is multiplicative, not additive:
#
#   Pairing = male_approach × female_receptivity × male_signal ×
#             female_signal × signal_perception_capacity
#
# If ANY factor approaches zero, pairing collapses regardless of the
# others. This explains why interventions targeting single factors
# (dating apps, fertility subsidies) fail — the compound probability
# is already near zero.
#
# Key literature:
#   Singh 1993 (WHR universal preference, cross-cultural N>1000)
#   Jasienka 2004 (WHR → estradiol/progesterone, N=119)
#   Lassek & Gaulin 2008 (WHR → DHA reserves → offspring cognition)
#   Penton-Voak 2001 (facial masculinity preference cycles, N=39)
#   Pipitone & Gallup 2008 (voice attractiveness cycles, N=10+N=38)
#   Burriss 2015 (lip color redness across cycle, N=13)
#   Wedekind 1995 (MHC-dependent odor preference, N=49m+49f)
#   Peshek 2011 (limbal ring → health/age/attractiveness, N=4 studies)
#   Kavanagh 2010 (mating sociometer: mate value tracks feedback)
#   Berggren 2017 (conservative-attractiveness, N=2513, 4 countries)
#   Kosinski 2021 (facial politics classification, 72% accuracy)
#   Alogaily 2025 (T RCT → conservative shift, N=136)


def morphological_signal_index(markers: dict[str, float]) -> float:
    """Static body composition signals of mate quality.

    WHR: estrogen-dependent fat distribution. Optimal female WHR
    (0.67-0.70) requires functional HPG axis producing adequate E2
    with low cortisol (which promotes visceral fat, raising WHR).
    Singh 1993: cross-culturally preferred. Lassek & Gaulin 2008:
    WHR predicts DHA reserves → offspring cognitive development.

    Muscle mass: T-dependent. Men at baseline T of ~500ng/dL
    maintain lean mass naturally; at ~300ng/dL (modern average),
    muscle requires deliberate resistance training to maintain.

    Facial dimorphism: T sculpts male jaw/brow, E2 sculpts female
    cheekbones/lip fullness. Both require pubertal hormone exposure
    and ongoing maintenance.

    Returns 0 (fully degraded) to 1 (full signal strength).
    """
    t = markers.get("T", 0.5)
    cort = markers.get("CORT", 0.5)
    mel = markers.get("MEL", 0.5)

    sex_hormone_signal = t * (1.0 - 0.35 * cort)
    whr_signal = max(0.0, 1.0 - 0.6 * cort) * (0.6 + 0.4 * t)
    sleep_recovery = 0.7 + 0.3 * mel
    raw = (0.40 * sex_hormone_signal + 0.35 * whr_signal + 0.25 * sleep_recovery)
    return round(max(0.0, min(1.0, raw)), 4)


def dynamic_signal_index(markers: dict[str, float]) -> float:
    """Real-time behavioral signals of mate quality.

    Voice: fundamental frequency varies with T (men) and across
    ovulatory cycle (women). Pipitone 2008: voice samples recorded
    at high fertility rated more attractive. Low T → higher male
    F0, lower vocal attractiveness.

    Expressiveness: DA-driven reward circuit → social engagement,
    smiling, animated facial expression, humor production.
    Low DA → flat affect, reduced social signaling.

    Postural confidence: T → upright, expansive posture (Carney
    2010 power poses, though the self-report effects are debated,
    the postural association with T is established). High CORT →
    defensive, contracted posture.

    Returns 0 (minimal signaling) to 1 (full dynamic signal).
    """
    t = markers.get("T", 0.5)
    da = markers.get("DA", 0.5)
    cort = markers.get("CORT", 0.5)
    bdnf = markers.get("BDNF", 0.5)

    voice_signal = t * (1.0 - 0.25 * cort)
    expressiveness = da * (0.6 + 0.4 * bdnf)
    postural = t * max(0.0, 1.0 - 0.4 * cort)
    raw = 0.35 * voice_signal + 0.35 * expressiveness + 0.30 * postural
    return round(max(0.0, min(1.0, raw)), 4)


def cryptic_signal_index(markers: dict[str, float]) -> float:
    """Subliminal signals below conscious detection threshold.

    Lip color: Burriss 2015 measured lip redness across menstrual
    cycle — peak redness at ovulation correlates with E2 surge.
    Disrupted HPG axis → attenuated or absent lip color shift.

    Body odor / MHC: Wedekind 1995 sweaty T-shirt experiment.
    MHC-dissimilar odor preferred. Alvergne 2009: hormonal
    contraception REVERSES MHC preference (women on pill prefer
    MHC-similar men → suboptimal immune complement in offspring).
    EMF-disrupted endocrine system plausibly produces analogous
    signal distortion.

    Limbal ring: Peshek 2011 — dark ring around iris correlates
    with youth, health, and perceived attractiveness. Fades with
    age and poor health. Melatonin-dependent melanocyte function.

    Skin quality: Jones 2004 — homogeneity, luminance, and color
    predict health and attractiveness. CORT → cortisol face (puffy,
    uneven tone). MEL → melanocyte irregularity.

    Returns 0 (signal abolished) to 1 (full cryptic signaling).
    """
    t = markers.get("T", 0.5)
    mel = markers.get("MEL", 0.5)
    cort = markers.get("CORT", 0.5)
    oxt = markers.get("OXT", 0.5)

    hormonal_cycling = t * max(0.0, 1.0 - 0.3 * cort)
    melanocyte_function = mel * (0.7 + 0.3 * t)
    odor_signaling = (0.5 * t + 0.5 * oxt) * max(0.0, 1.0 - 0.2 * cort)
    skin_quality = max(0.0, 1.0 - 0.5 * cort) * (0.6 + 0.4 * mel)
    raw = (
        0.25 * hormonal_cycling
        + 0.25 * melanocyte_function
        + 0.25 * odor_signaling
        + 0.25 * skin_quality
    )
    return round(max(0.0, min(1.0, raw)), 4)


def obesity_amplification_index(markers: dict[str, float]) -> float:
    """Obesity-aromatase positive feedback loop.

    Fat tissue contains aromatase (CYP19A1) which converts T → E2.
    More fat → more aromatase → less T → more fat → more aromatase.
    Cohen 1999: aromatase activity proportional to adipose mass.

    This is the secondary amplifier. Primary EMF damage lowers T
    and DA directly. The metabolic consequence (increased adiposity
    from DA↓ → reward-seeking eating, CORT↑ → visceral fat,
    MEL↓ → circadian disruption → metabolic syndrome) then
    FURTHER suppresses T via aromatase conversion.

    Men: gynecomastia prevalence 32-65% (Braunstein 2007) — direct
    evidence of T→E2 conversion in male adipose tissue.

    Women: excess adiposity disrupts ovulatory cycling, raises
    androgens (PCOS), and abolishes the subtle hormonal fluctuations
    that drive cryptic mate signals.

    Wang 2001: obese individuals show reduced D2 receptor availability
    (dopamine). Meo 2013: EMF exposure → metabolic markers.

    Returns 0 (no amplification) to 1 (maximal aromatase loop).
    """
    t = markers.get("T", 0.5)
    da = markers.get("DA", 0.5)
    cort = markers.get("CORT", 0.5)
    mel = markers.get("MEL", 0.5)

    adiposity_drivers = (
        0.30 * (1.0 - da)
        + 0.30 * cort
        + 0.25 * (1.0 - mel)
        + 0.15 * (1.0 - t)
    )
    aromatase_conversion = adiposity_drivers * (1.0 - t)
    return round(max(0.0, min(1.0, aromatase_conversion)), 4)


def signal_perception_capacity(markers: dict[str, float]) -> float:
    """Capacity to perceive and respond to mate signals.

    Even if signals are sent, they must be received. Perception
    requires:
    - DA: reward salience — noticing and valuing attractive signals
    - T: sexual motivation — caring about mate quality
    - BDNF: cognitive processing of complex social information
    - MEL: circadian regulation of social timing (evening/night
      social interaction is when most mate assessment occurs)

    Digital displacement (Rodgers 2020): screen time replaces
    face-to-face interaction → fewer opportunities for cryptic
    signal assessment (odor, subtle color, voice in person).

    Li 2018 evolutionary mismatch: the detection systems evolved
    for close-range, in-person assessment are bypassed by digital
    mediation.

    Returns 0 (signal-blind) to 1 (full perception).
    """
    da = markers.get("DA", 0.5)
    t = markers.get("T", 0.5)
    bdnf = markers.get("BDNF", 0.5)
    mel = markers.get("MEL", 0.5)

    reward_salience = da * (0.6 + 0.4 * t)
    cognitive_processing = bdnf * (0.7 + 0.3 * mel)
    raw = 0.45 * reward_salience + 0.35 * cognitive_processing + 0.20 * t
    return round(max(0.0, min(1.0, raw)), 4)


def pair_signal_compound(markers: dict[str, float]) -> float:
    """Five-way multiplicative pairing probability.

    Pairing = male_approach × female_receptivity × male_signal ×
              female_signal × signal_perception

    This replaces the 2-way model (drive × bonding). The critical
    insight: multiplication means ANY factor near zero collapses
    the entire probability. A man with high T but degraded signals
    still fails. A woman with intact signals but no perception of
    male signals still fails.

    For environment-level analysis, we use the sex-averaged
    biomarker state and compute each factor from the same markers.
    The real population has variance — some individuals will be
    above/below average on each factor. The compound probability
    represents the POPULATION-LEVEL pairing rate, not individual.

    Returns 0 (pairing impossible) to 1 (full pairing capacity).
    """
    t = markers.get("T", 0.5)
    oxt = markers.get("OXT", 0.5)
    da = markers.get("DA", 0.5)
    cort = markers.get("CORT", 0.5)

    male_approach = t * da * max(0.0, 1.0 - 0.4 * cort)
    female_receptivity = oxt * max(0.0, 1.0 - 0.3 * cort) * (0.5 + 0.5 * t)
    male_signal = morphological_signal_index(markers)
    female_signal = (
        0.50 * cryptic_signal_index(markers)
        + 0.50 * morphological_signal_index(markers)
    )
    perception = signal_perception_capacity(markers)

    compound = (
        male_approach * female_receptivity * male_signal
        * female_signal * perception
    ) ** 0.2
    return round(max(0.0, min(1.0, compound)), 4)


SIGNAL_DEGRADATION_FUNCTIONS: dict[str, Any] = {
    "morphological_signal": morphological_signal_index,
    "dynamic_signal": dynamic_signal_index,
    "cryptic_signal": cryptic_signal_index,
    "obesity_amplification": obesity_amplification_index,
    "signal_perception": signal_perception_capacity,
    "pair_signal_compound": pair_signal_compound,
}


def signal_degradation_profile(markers: dict[str, float]) -> dict[str, Any]:
    """Full signal degradation analysis for a biomarker state.

    Returns all three signal categories, the obesity amplifier,
    perception capacity, the compound pairing probability, and
    a composite degradation index.
    """
    morph = morphological_signal_index(markers)
    dyn = dynamic_signal_index(markers)
    crypt = cryptic_signal_index(markers)
    obesity = obesity_amplification_index(markers)
    percep = signal_perception_capacity(markers)
    compound = pair_signal_compound(markers)

    total_signal = (morph * dyn * crypt) ** (1.0 / 3.0)
    degradation = 1.0 - total_signal

    return {
        "morphological_signal": morph,
        "dynamic_signal": dyn,
        "cryptic_signal": crypt,
        "total_signal_strength": round(total_signal, 4),
        "signal_degradation": round(degradation, 4),
        "obesity_amplification": obesity,
        "signal_perception": percep,
        "pair_signal_compound": compound,
    }


def signal_degradation_gradient(year: float = 2025) -> list[dict[str, Any]]:
    """Signal degradation across all EMF environments."""
    env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
    results: list[dict[str, Any]] = []

    for env_name in env_order:
        markers = environment_biomarkers(env_name, year)
        profile = signal_degradation_profile(markers)
        profile["environment"] = env_name
        results.append(profile)

    return results


# ── Behavioral sink — predatory normalization ──
#
# Calhoun's Universe 25 (1968-1973) demonstrated that population
# collapse is not caused by resource scarcity but by behavioral
# pathology. With unlimited food, water, and space, the mouse
# population peaked at 2200 and went extinct.
#
# The critical phase C→D mechanism: dysfunctional individuals
# began ACTIVELY DESTROYING the reproductive capacity of the
# remaining functional individuals. Males attacked pups of
# still-reproducing pairs. "Beautiful ones" withdrew entirely.
# The functional minority was besieged from within.
#
# The BERM equivalent operates through five channels:
#
# 1. Normative predation — the degraded majority socially punishes
#    the healthy minority for maintaining healthy phenotypes.
#    Body positivity movement attacks healthy weight maintenance.
#    "Toxic masculinity" discourse pathologizes healthy T expression.
#    Competence displays trigger "microaggression" complaints.
#
# 2. Institutional capture — Pathopolites-majority institutions
#    create regulations that force high-EMF lifestyles on everyone.
#    Mandatory digital services. Smart city infrastructure.
#    Remote work normalization (screen time → EMF exposure).
#
# 3. Educational contagion — high-pathopolites educators shape
#    children's cognitive frameworks. Safety-seeking teachers
#    create safety-seeking students. External locus institutions
#    create external locus graduates.
#
# 4. Policy imposition — the degraded phenotype's policy preferences
#    (safety regulations, harm-avoidance frameworks, expanded
#    definitions of violence) restrict the behavioral options
#    available to the healthy minority.
#
# 5. Social contagion — Christakis & Fowler 2007 (Framingham
#    Heart Study): obesity spreads through social networks.
#    A person's chance of becoming obese increases 57% if a friend
#    becomes obese. The mechanism is normative, not caloric.
#
# Key literature:
#   Calhoun 1973 (Universe 25, behavioral sink)
#   Christakis & Fowler 2007 (social contagion of obesity, N=12,067)
#   Campbell & Manning 2018 (victimhood culture as social strategy)
#   Lukianoff & Haidt 2018 (institutional safetyism)


def normative_predation_index(markers: dict[str, float]) -> float:
    """Pressure to impose pathological norms on healthy individuals.

    The degraded phenotype does not merely exist passively — it
    actively seeks to normalize its own state and penalize
    deviation from it. This is not conspiracy but evolutionary
    psychology: organisms that cannot compete on quality compete
    by degrading the competition (handicapping strategy).

    High Pathopolites composite + high external locus (needs
    others to conform to feel validated) + high moral compensation
    (moral framework available to justify the predation) =
    normative predation capacity.

    Returns 0 (no predatory pressure) to 1 (maximal normalization).
    """
    pp = pathopolites_profile(markers)
    pathopolites_idx = pp["pathopolites_index"]
    ext_locus = pp["external_locus"]
    moral_comp = pp["moral_compensation"]
    safety = pp["safety_seeking"]

    predation_drive = pathopolites_idx * (0.4 * ext_locus + 0.3 * moral_comp + 0.3 * safety)
    return round(max(0.0, min(1.0, predation_drive)), 4)


def institutional_capture_index(markers: dict[str, float]) -> float:
    """Degree to which institutions enforce pathological norms.

    When the Pathopolites phenotype becomes the institutional
    majority, its policy preferences become mandatory:
    - Safety-seeking → precautionary regulation
    - External locus → institutional dependency requirements
    - Cognitive fragility → speech codes, content warnings
    - Moral compensation → DEI mandates, ESG frameworks

    Each of these INCREASES the EMF environment for everyone
    (more screen-mediated work, more digital compliance, more
    time in institutional settings) and RESTRICTS exit options
    (homeschooling barriers, rural infrastructure neglect,
    occupational licensing requirements for traditional trades).

    Returns 0 (institutions serve healthy function) to
    1 (institutions enforce pathological norms).
    """
    pp = pathopolites_profile(markers)
    idx = pp["pathopolites_index"]

    threshold = 0.35
    if idx < threshold:
        return round(0.1 * (idx / threshold), 4)

    capture = 0.1 + 0.9 * ((idx - threshold) / (1.0 - threshold)) ** 1.5
    return round(max(0.0, min(1.0, capture)), 4)


def behavioral_sink_index(markers: dict[str, float]) -> float:
    """Calhoun behavioral sink composite.

    The compound rate at which the degraded population actively
    destroys the reproductive capacity of the healthy remainder.

    Three components:
    - Normative predation: social pressure to conform to
      pathological norms
    - Institutional capture: regulatory enforcement of
      pathological environment
    - Signal destruction: the physical attractiveness signals
      of the healthy minority are socially devalued
      ("beauty standards are oppressive")

    Returns 0 (no behavioral sink) to 1 (terminal phase D).
    """
    norm_pred = normative_predation_index(markers)
    inst_capture = institutional_capture_index(markers)

    sig = signal_degradation_profile(markers)
    signal_strength = sig["total_signal_strength"]
    signal_attack = max(0.0, 1.0 - signal_strength) * norm_pred

    raw = 0.35 * norm_pred + 0.35 * inst_capture + 0.30 * signal_attack
    return round(max(0.0, min(1.0, raw)), 4)


def sterilization_contagion_index(markers: dict[str, float]) -> float:
    """Rate at which the degraded phenotype produces sterility-inducing ideology.

    The Pathopolites phenotype does not merely fail to reproduce —
    it generates ideological frameworks that, when adopted by others,
    produce sterility in the adopters. These are memetic parasites
    that destroy the host's reproductive fitness:

    - Anti-natalism as moral position (high moral_compensation +
      high external_locus → "not having children is ethical")
    - Gender ideology targeting children (high safety_seeking +
      institutional_capture → puberty blockers, GnRH agonists
      that directly suppress T/E2, the substrate of all mate
      signaling and reproductive capacity)
    - Relationship anarchy (high anomic_distress → inability to
      maintain pair bonds reframed as liberation from "oppressive
      norms")
    - Body dysmorphia normalization (degraded morphological signals
      reframed as "diversity" rather than pathology)
    - Career-first delayed reproduction past biological window
      (high external_locus → institutional achievement substitutes
      for biological achievement)

    Calhoun parallel: the male mice that killed pups were not
    competing for resources (unlimited food). They were behavioral
    outputs of a degraded phenotype that actively destroyed
    reproductive success of the functional remainder. The human
    equivalent operates through ideology rather than direct
    violence, but the reproductive outcome is identical.

    Critical mechanism: puberty blockers administered to children
    represent the most direct form of sterilization contagion —
    the degraded adult generation intervening in the DEVELOPMENTAL
    BIOLOGY of the next generation before their own EMF exposure
    would naturally produce the pathological phenotype.

    Returns 0 (no sterilizing ideology output) to 1 (maximal).
    """
    pp = pathopolites_profile(markers)
    idx = pp["pathopolites_index"]
    moral_comp = pp["moral_compensation"]
    anomic = pp["anomic_distress"]
    ext_locus = pp["external_locus"]

    ideology_production = idx * (
        0.30 * moral_comp
        + 0.25 * anomic
        + 0.25 * ext_locus
        + 0.20 * pp["cognitive_fragility"]
    )

    inst = institutional_capture_index(markers)
    contagion_reach = ideology_production * (0.5 + 0.5 * inst)
    return round(max(0.0, min(1.0, contagion_reach)), 4)


BEHAVIORAL_SINK_FUNCTIONS: dict[str, Any] = {
    "normative_predation": normative_predation_index,
    "institutional_capture": institutional_capture_index,
    "sterilization_contagion": sterilization_contagion_index,
    "behavioral_sink": behavioral_sink_index,
}


def behavioral_sink_profile(markers: dict[str, float]) -> dict[str, Any]:
    """Full Calhoun behavioral sink analysis."""
    return {
        "normative_predation": normative_predation_index(markers),
        "institutional_capture": institutional_capture_index(markers),
        "sterilization_contagion": sterilization_contagion_index(markers),
        "behavioral_sink": behavioral_sink_index(markers),
    }


def behavioral_sink_gradient(year: float = 2025) -> list[dict[str, Any]]:
    """Behavioral sink analysis across all EMF environments."""
    env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
    results: list[dict[str, Any]] = []

    for env_name in env_order:
        markers = environment_biomarkers(env_name, year)
        profile = behavioral_sink_profile(markers)
        profile["environment"] = env_name
        results.append(profile)

    return results


# ── Cross-country BERM predictions ──
#
# EMF infrastructure density + timeline should predict:
# 1. TFR decline speed and trajectory
# 2. Obesity epidemic onset and severity
# 3. Political polarization pattern (urban-rural gradient)
# 4. Value shift speed (survival → self-expression)
# 5. Fitness decline in conscript populations
# 6. Conservative-attractiveness correlation strength
#
# Country-level EMF exposure index based on:
# - Mobile infrastructure timeline (NMT 1982 = earliest)
# - 5G deployment status and density
# - Smartphone penetration rate
# - Population density (affects ambient field)
# - Urbanization rate
#
# Key observation: pronatalist policy spending has ZERO long-term
# effect when the biological substrate is degraded. Singapore
# (~$55k/child), Hungary (family tax benefits + housing), Poland
# (500+ zloty/month), Japan (multiple programs) — all show
# temporary tempo effects that reverse within 5-10 years.
#
# The Japan paradox: low obesity (4%) but low TFR (1.15) and
# massive herbivore phenomenon (70-75% young men). This proves
# obesity is a SECONDARY amplifier. The PRIMARY mechanism
# (direct melatonin-HPG disruption, pathway B, amplified by VGCC/Ca2+)
# operates independently.
# Japan shows the primary effect without the secondary amplifier.
# USA/UK show both layers simultaneously.


@dataclass
class CountryEMFProfile:
    """EMF exposure profile for a country."""
    name: str
    mobile_infrastructure_year: int
    five_g_year: int | None
    smartphone_penetration: float
    urbanization_rate: float
    population_density_factor: float
    obesity_rate: float
    tfr_2010: float
    tfr_latest: float
    tfr_latest_year: int = 2024
    cultural_buffer: float = 0.0


COUNTRY_PROFILES: dict[str, CountryEMFProfile] = {
    "south_korea": CountryEMFProfile(
        name="South Korea",
        mobile_infrastructure_year=1996,
        five_g_year=2019,
        smartphone_penetration=0.97,
        urbanization_rate=0.81,
        population_density_factor=0.85,
        obesity_rate=0.052,
        tfr_2010=1.23,
        tfr_latest=0.75,
        cultural_buffer=0.05,
    ),
    "japan": CountryEMFProfile(
        name="Japan",
        mobile_infrastructure_year=1999,
        five_g_year=2020,
        smartphone_penetration=0.96,
        urbanization_rate=0.92,
        population_density_factor=0.70,
        obesity_rate=0.046,
        tfr_2010=1.39,
        tfr_latest=1.15,
        cultural_buffer=0.25,
    ),
    "singapore": CountryEMFProfile(
        name="Singapore",
        mobile_infrastructure_year=1997,
        five_g_year=2020,
        smartphone_penetration=0.95,
        urbanization_rate=1.0,
        population_density_factor=0.95,
        obesity_rate=0.16,
        tfr_2010=1.15,
        tfr_latest=0.87,
        cultural_buffer=0.10,
    ),
    "finland": CountryEMFProfile(
        name="Finland",
        mobile_infrastructure_year=1982,
        five_g_year=2020,
        smartphone_penetration=0.97,
        urbanization_rate=0.85,
        population_density_factor=0.15,
        obesity_rate=0.20,
        tfr_2010=1.87,
        tfr_latest=1.25,
        cultural_buffer=0.05,
    ),
    "usa": CountryEMFProfile(
        name="United States",
        mobile_infrastructure_year=1983,
        five_g_year=2019,
        smartphone_penetration=0.82,
        urbanization_rate=0.83,
        population_density_factor=0.30,
        obesity_rate=0.424,
        tfr_2010=1.93,
        tfr_latest=1.62,
        cultural_buffer=0.10,
    ),
    "uk": CountryEMFProfile(
        name="United Kingdom",
        mobile_infrastructure_year=1985,
        five_g_year=2019,
        smartphone_penetration=0.82,
        urbanization_rate=0.84,
        population_density_factor=0.55,
        obesity_rate=0.30,
        tfr_2010=1.92,
        tfr_latest=1.44,
        cultural_buffer=0.05,
    ),
    "france": CountryEMFProfile(
        name="France",
        mobile_infrastructure_year=1992,
        five_g_year=2020,
        smartphone_penetration=0.84,
        urbanization_rate=0.81,
        population_density_factor=0.25,
        obesity_rate=0.24,
        tfr_2010=2.03,
        tfr_latest=1.61,
        cultural_buffer=0.15,
    ),
    "sweden": CountryEMFProfile(
        name="Sweden",
        mobile_infrastructure_year=1981,
        five_g_year=2020,
        smartphone_penetration=0.79,
        urbanization_rate=0.88,
        population_density_factor=0.10,
        obesity_rate=0.25,
        tfr_2010=1.98,
        tfr_latest=1.45,
        cultural_buffer=0.05,
    ),
    "hungary": CountryEMFProfile(
        name="Hungary",
        mobile_infrastructure_year=1999,
        five_g_year=2023,
        smartphone_penetration=0.80,
        urbanization_rate=0.72,
        population_density_factor=0.25,
        obesity_rate=0.364,
        tfr_2010=1.25,
        tfr_latest=1.41,
        tfr_latest_year=2024,
        cultural_buffer=0.20,
    ),
    "poland": CountryEMFProfile(
        name="Poland",
        mobile_infrastructure_year=1996,
        five_g_year=2022,
        smartphone_penetration=0.89,
        urbanization_rate=0.60,
        population_density_factor=0.25,
        obesity_rate=0.314,
        tfr_2010=1.38,
        tfr_latest=1.14,
        cultural_buffer=0.15,
    ),
}


def country_emf_index(profile: CountryEMFProfile, year: float = 2025) -> float:
    """Composite EMF exposure index for a country.

    Combines infrastructure timeline (earlier = more cumulative
    exposure), 5G deployment, smartphone penetration, urbanization,
    and population density into a single 0-1 index.

    Cultural buffer reduces effective exposure — represents
    institutional or cultural resistance to EMF-intensifying
    behaviors (Japan's food culture limiting obesity, Hungary's
    authoritarian policy restricting digital dependency, etc.).
    Buffer delays but does not prevent degradation.

    Returns 0 (minimal exposure) to 1 (maximal exposure).
    """
    infra_years = max(0, year - profile.mobile_infrastructure_year)
    infra_score = min(1.0, infra_years / 45.0)

    five_g_score = 0.0
    if profile.five_g_year is not None:
        five_g_years = max(0, year - profile.five_g_year)
        five_g_score = min(1.0, five_g_years / 10.0)

    raw = (
        0.25 * infra_score
        + 0.20 * five_g_score
        + 0.20 * profile.smartphone_penetration
        + 0.20 * profile.urbanization_rate
        + 0.15 * profile.population_density_factor
    )
    buffered = raw * (1.0 - 0.3 * profile.cultural_buffer)
    return round(max(0.0, min(1.0, buffered)), 4)


def country_predicted_tfr(profile: CountryEMFProfile, year: float = 2025) -> float:
    """BERM-predicted TFR for a country based on EMF exposure.

    The prediction model: EMF index maps to an environment on the
    amish-urban_office spectrum, which determines biomarker state,
    which determines pair_signal_compound, which predicts
    population-level pairing rate, which maps to TFR.

    Historical TFR (2010) is used as baseline to calibrate the
    country-specific starting point (genetic, cultural, economic
    factors that set the pre-EMF-saturation fertility level).
    """
    emf_idx = country_emf_index(profile, year)

    # Markers are derived from the suburban baseline scaled by emf_idx; the
    # earlier env_map interpolation to an EMF multiplier was superseded and
    # its result was never used.
    markers = environment_biomarkers("suburban", year)
    markers["T"] = max(0.1, markers["T"] * (1.0 - 0.3 * emf_idx))
    markers["DA"] = max(0.1, markers["DA"] * (1.0 - 0.2 * emf_idx))
    markers["OXT"] = max(0.1, markers["OXT"] * (1.0 - 0.25 * emf_idx))
    markers["CORT"] = min(0.95, markers["CORT"] * (1.0 + 0.2 * emf_idx))

    pair_compound = pair_signal_compound(markers)
    baseline_tfr = profile.tfr_2010

    degradation = 1.0 - pair_compound
    cultural_inertia = max(0.0, 0.5 - 0.3 * emf_idx + 0.4 * profile.cultural_buffer)
    effective_decline = degradation * (1.0 - cultural_inertia)
    predicted = baseline_tfr * (1.0 - effective_decline)
    return round(max(0.4, predicted), 2)


def country_berm_analysis(country_key: str, year: float = 2025) -> dict[str, Any]:
    """Full BERM analysis for a country."""
    if country_key not in COUNTRY_PROFILES:
        raise ValueError(f"Unknown country: {country_key}. Available: {list(COUNTRY_PROFILES.keys())}")

    profile = COUNTRY_PROFILES[country_key]
    emf_idx = country_emf_index(profile, year)
    predicted_tfr = country_predicted_tfr(profile, year)
    actual_tfr = profile.tfr_latest

    tfr_decline_rate = (
        (profile.tfr_2010 - profile.tfr_latest)
        / max(1, profile.tfr_latest_year - 2010)
    )

    return {
        "country": profile.name,
        "emf_index": emf_idx,
        "predicted_tfr": predicted_tfr,
        "actual_tfr": actual_tfr,
        "tfr_2010": profile.tfr_2010,
        "tfr_decline_annual": round(tfr_decline_rate, 3),
        "obesity_rate": profile.obesity_rate,
        "smartphone_penetration": profile.smartphone_penetration,
        "urbanization_rate": profile.urbanization_rate,
        "cultural_buffer": profile.cultural_buffer,
        "mobile_since": profile.mobile_infrastructure_year,
        "five_g_since": profile.five_g_year,
        "prediction_error": round(abs(predicted_tfr - actual_tfr), 2),
    }


def cross_country_comparison(year: float = 2025) -> list[dict[str, Any]]:
    """BERM analysis across all profiled countries.

    Returns countries sorted by EMF index (highest exposure first).
    """
    results = []
    for key in COUNTRY_PROFILES:
        results.append(country_berm_analysis(key, year))
    results.sort(key=lambda x: x["emf_index"], reverse=True)
    return results


# ── Calhoun Phase Dynamics ──
#
# Universe 25 phase progression mapped to civilizational indicators.
# Phase A: colonization. Phase B: exponential growth, 14 groups of ~12.
# Phase C: growth collapses, Beautiful Ones emerge, societal death.
# Phase D: no surviving pups, population physically alive but socially dead.
# "First Death" (spirit) precedes "Second Death" (body).


def calhoun_phase_indicators(markers: dict[str, float]) -> dict[str, float]:
    """Quantitative indicators for Calhoun's A-D phase progression."""
    t = markers.get("T", 0.5)
    da = markers.get("DA", 0.5)
    oxt = markers.get("OXT", 0.5)
    cort = markers.get("CORT", 0.3)

    position_saturation = max(0.0, min(1.0,
        0.3 + 0.7 * (1.0 - t) * (1.0 + cort)))

    maternal_collapse = max(0.0, min(1.0,
        1.0 - oxt * (1.0 - 0.5 * cort) * (0.5 + 0.5 * t)))

    complexity_loss = max(0.0, min(1.0,
        1.0 - da * t * (1.0 - 0.4 * cort)))

    drive_compound = t * da
    beautiful_ones = max(0.0, min(1.0,
        0.01 + 0.60 * max(0.0, 0.55 - drive_compound) ** 1.2))

    societal_death = (
        0.20 * position_saturation
        + 0.25 * maternal_collapse
        + 0.25 * complexity_loss
        + 0.30 * beautiful_ones
    )

    return {
        "position_saturation": round(position_saturation, 4),
        "maternal_collapse": round(maternal_collapse, 4),
        "complexity_loss": round(complexity_loss, 4),
        "beautiful_ones_fraction": round(beautiful_ones, 4),
        "societal_death": round(max(0.0, min(1.0, societal_death)), 4),
    }


def calhoun_phase(markers: dict[str, float]) -> str:
    """Determine civilization's Calhoun phase (B/C/D).

    B: societal_death < 0.15 (functional growth)
    C: 0.15-0.50 (dysfunction emerging, Beautiful Ones appearing)
    D: > 0.50 (irreversible decline, "First Death" in progress)
    """
    sd = calhoun_phase_indicators(markers)["societal_death"]
    if sd < 0.15:
        return "B"
    elif sd < 0.50:
        return "C"
    return "D"


def calhoun_recovery_potential(markers: dict[str, float]) -> float:
    """Recovery potential based on Calhoun's empirical results.

    Universe 25 (no intervention): NO recovery even in optimal conditions.
    Universe 33 (periodic culling): recovery in small groups WORKED.
    Universe 34B (enforced cooperation): PREVENTION worked.
    Kessler (Rockefeller): mice recovered when removed from sink.

    Key: whether normal social behaviors developed before exposure.
    Beautiful Ones never developed them → permanent.
    """
    indicators = calhoun_phase_indicators(markers)
    sd = indicators["societal_death"]
    bo = indicators["beautiful_ones_fraction"]

    base_recovery = max(0.0, 1.0 - sd * 1.3)
    bo_penalty = bo * 0.5
    return round(max(0.0, min(1.0, base_recovery - bo_penalty)), 4)


CALHOUN_PHASE_FUNCTIONS: dict[str, Any] = {
    "phase_indicators": calhoun_phase_indicators,
    "phase": calhoun_phase,
    "recovery_potential": calhoun_recovery_potential,
}


# ── Bioleninist Selection Dynamics ──
#
# Spandrell: power structures optimize for loyalty over competence
# by recruiting from groups whose status depends entirely on the
# regime. The lower the natural status → the stronger the loyalty
# bond → the more valuable as a recruit.
#
# BERM connection: hormonal degradation produces individuals who
# cannot compete in natural hierarchy → structurally dependent on
# institutional status → maximally loyal → selected by the system.


def bioleninist_loyalty_value(markers: dict[str, float]) -> float:
    """Loyalty value: inversely proportional to natural competitive status.

    Low T + Low DA + Low BDNF = maximal regime dependency = maximal loyalty.
    """
    t = markers.get("T", 0.5)
    da = markers.get("DA", 0.5)
    bdnf = markers.get("BDNF", 0.5)

    natural_status = t * 0.45 + da * 0.30 + bdnf * 0.25
    return round(max(0.0, min(1.0, 1.0 - natural_status)), 4)


def institutional_competence_decay(markers: dict[str, float]) -> float:
    """Cumulative competence loss from bioleninist selection rounds.

    Each round: loyalty-selected → lower competence floor →
    select even more dependent subordinates → further decay.
    Spandrell: produces "literal kakistocracy."
    """
    loyalty = bioleninist_loyalty_value(markers)
    capture = institutional_capture_index(markers)

    base_decay = loyalty * capture
    threshold = 0.3
    if base_decay > threshold:
        acceleration = 1.0 + 2.0 * ((base_decay - threshold) / (1.0 - threshold))
    else:
        acceleration = 1.0

    return round(max(0.0, min(1.0, base_decay * acceleration)), 4)


def bioleninist_ratchet_index(markers: dict[str, float]) -> float:
    """Combined strength of the three Bioleninist ratchets.

    1. Leftward ratchet: status redistribution mobilizes more
       effectively than status defense.
    2. Gramscian institutional ratchet: captured education →
       all future personnel share ideological formation.
    3. Competence-loyalty ratchet: each selection round lowers
       the competence floor.

    Key Spandrell insight: no Stalin to stop the ratchet.
    Classical Leninism stabilized once power was total.
    Bioleninism has no stabilization mechanism.
    """
    loyalty = bioleninist_loyalty_value(markers)
    comp_decay = institutional_competence_decay(markers)
    capture = institutional_capture_index(markers)

    if loyalty > 0 and capture > 0 and comp_decay > 0:
        ratchet = (loyalty * capture * comp_decay) ** (1.0 / 3.0)
    else:
        ratchet = 0.0

    reinforcement = 1.0 + 0.5 * (
        loyalty * capture + capture * comp_decay + comp_decay * loyalty)
    ratchet *= reinforcement

    return round(max(0.0, min(1.0, ratchet)), 4)


BIOLENINIST_FUNCTIONS: dict[str, Any] = {
    "loyalty_value": bioleninist_loyalty_value,
    "competence_decay": institutional_competence_decay,
    "ratchet": bioleninist_ratchet_index,
}


# ── Reproductive Behavior Spectrum ──
#
# Calhoun's precise taxonomy mapped to hormonal profiles:
#
# 1. Normal reproductive — courtship → selective mating → pair bond.
#    T normal, DA normal, OXT normal, CORT low.
#
# 2. Reduced libido — motivated but reduced frequency/success.
#    T moderately reduced, DA moderately reduced.
#
# 3. Pansexual/undifferentiated — sexual motivation present but
#    selectivity collapsed. Mounts anything. OXT disrupted, CORT high.
#    Calhoun: "pansexuality as creativity — avoiding sanctions."
#    NOT orientation but discrimination-circuit failure.
#
# 4. Non-reproductive preferential — consistent non-reproductive
#    sexual orientation. Calhoun's "imcasts": all-male groups with
#    exclusively homosexual behavior, daytime feeding, loss of
#    construction ability.
#
#    Endocrine disruption evidence:
#    - Atrazine: 10% of male frogs fully feminized, 75% chemically
#      castrated at drinking water concentrations (Hayes 2010, PNAS)
#    - Phthalates: shortened AGD, cryptorchidism (Swan 2008)
#    - Vinclozolin: transgenerational mate preference changes
#      persisting 3+ generations (Crews 2007, PNAS)
#    - Fraternal birth order: +33% per older brother via maternal
#      anti-NLGN4Y antibodies (Blanchard 2018)
#    - BPA: altered sexual differentiation in rodents (Rubin 2011)
#
#    Gallup: US LGBT 3.5% (2012) → 8.6% (2024).
#    Gen Z: 22.3% vs Boomers 4.4%.
#    Destigmatization alone cannot explain a 5x generational
#    difference — it predicts convergence toward a stable rate,
#    not monotonic increase across cohorts. Animal endocrine
#    disruption data shows actual behavioral shifts.
#
# 5. Asexual/withdrawn — Beautiful Ones. No sexual motivation.
#    T severely depleted, DA severely depleted.
#    "Motion without meaning." Low adrenaline (Axelrod).
#
# Population effect: every category except normal reduces
# effective fertility. The combined shift drives TFR collapse
# independently of contraception, economics, or culture.


def reproductive_behavior_spectrum(markers: dict[str, float]) -> dict[str, float]:
    """Population distribution across Calhoun's sexual behavior categories.

    Returns estimated fraction of reproductive-age population in each
    category. These are population-level distributions driven by the
    hormonal environment, not individual predictions.
    """
    t = markers.get("T", 0.5)
    da = markers.get("DA", 0.5)
    oxt = markers.get("OXT", 0.5)
    cort = markers.get("CORT", 0.3)

    prenatal_disruption = max(0.0, 1.0 - t)

    drive_compound = t * da
    asexual = max(0.0, min(0.50,
        0.01 + 0.60 * max(0.0, 0.55 - drive_compound) ** 1.2))

    non_reproductive = min(0.20,
        0.025
        + 0.10 * prenatal_disruption ** 1.3
        + 0.02 * cort)

    oxt_cort_product = max(0.0, (1.0 - oxt) * cort)
    pansexual = min(0.08, oxt_cort_product ** 1.3 * 0.6)

    hormonal_adequacy = t * 0.55 + da * 0.45
    reduced_raw = max(0.0, 0.80 - hormonal_adequacy) ** 1.5 * 2.0
    reduced_libido = max(0.01, min(0.30, reduced_raw))

    non_normal = asexual + non_reproductive + pansexual + reduced_libido
    normal = max(0.05, 1.0 - non_normal)

    total = normal + reduced_libido + pansexual + non_reproductive + asexual
    if total > 0:
        normal /= total
        reduced_libido /= total
        pansexual /= total
        non_reproductive /= total
        asexual /= total

    return {
        "normal_reproductive": round(normal, 4),
        "reduced_libido": round(reduced_libido, 4),
        "pansexual_undifferentiated": round(pansexual, 4),
        "non_reproductive_preferential": round(non_reproductive, 4),
        "asexual_withdrawn": round(asexual, 4),
    }


def effective_fertility_index(markers: dict[str, float]) -> float:
    """Effective fertility as fraction of biological maximum.

    Fertility weights per category:
    - normal_reproductive: 1.0
    - reduced_libido: 0.5
    - pansexual: 0.15 (some reproductive encounters despite selectivity collapse)
    - non_reproductive: 0.02 (rare compulsory/social reproduction)
    - asexual: 0.0

    This is the sexual-behavior component of TFR. It multiplies
    with signal quality, pair-bonding, and environmental factors.
    """
    spectrum = reproductive_behavior_spectrum(markers)

    fertility = (
        spectrum["normal_reproductive"] * 1.00
        + spectrum["reduced_libido"] * 0.50
        + spectrum["pansexual_undifferentiated"] * 0.15
        + spectrum["non_reproductive_preferential"] * 0.02
        + spectrum["asexual_withdrawn"] * 0.00
    )
    return round(max(0.0, min(1.0, fertility)), 4)


def prenatal_disruption_index(markers: dict[str, float]) -> float:
    """Estimated prenatal endocrine disruption for population born
    into this hormonal environment.

    Uses population T as proxy: T decline reflects cumulative
    endocrine disruptor burden (BPA, phthalates, atrazine, PFAS).
    Lower population T implies more prenatal exposure in the
    generation born into this environment.
    """
    t = markers.get("T", 0.5)
    cort = markers.get("CORT", 0.3)

    t_disruption = 1.0 - t
    cort_disruption = cort * 0.3
    disruption = t_disruption * 0.7 + cort_disruption
    return round(max(0.0, min(1.0, disruption)), 4)


def endocrine_sexual_disruption_index(markers: dict[str, float]) -> float:
    """Combined endocrine disruption effect on sexual development.

    Integrates prenatal disruption, postnatal T decline,
    OXT pair-bonding failure, and DA reward dysfunction.
    """
    prenatal = prenatal_disruption_index(markers)
    t = markers.get("T", 0.5)
    da = markers.get("DA", 0.5)
    oxt = markers.get("OXT", 0.5)

    disruption = (
        0.35 * prenatal
        + 0.25 * (1.0 - t)
        + 0.20 * (1.0 - oxt)
        + 0.20 * (1.0 - da)
    )
    return round(max(0.0, min(1.0, disruption)), 4)


REPRODUCTIVE_SPECTRUM_FUNCTIONS: dict[str, Any] = {
    "behavior_spectrum": reproductive_behavior_spectrum,
    "effective_fertility": effective_fertility_index,
    "prenatal_disruption": prenatal_disruption_index,
    "endocrine_sexual_disruption": endocrine_sexual_disruption_index,
}


# ── Parasitic Transmission Dynamics ──
#
# Biological template: parasite-induced behavioral manipulation.
# The pathological phenotype actively modifies its environment
# to produce more pathology.
#
# Four models from nature:
# 1. Wolbachia (cytoplasmic incompatibility): infected sterilize
#    uninfected. 40-60% infection rate sufficient for population effect.
# 2. Sacculina (host feminization + reproductive hijacking):
#    parasite feminizes male host, redirects reproductive energy.
# 3. Baculovirus (liquefaction from above): infected climb highest
#    point, dissolve, rain pathogen onto those below.
# 4. STAW disoperator (Calhoun Universe 34B): one defector
#    destroyed an entire cooperative group. Half died.


def wolbachia_sterilization_index(markers: dict[str, float]) -> float:
    """Wolbachia-model: sterilization of non-adopters through incompatibility.

    The ideology doesn't need to infect everyone. It needs enough
    hosts to make non-infected reproduction nonviable:
    - Dating market incompatibility (political filtering)
    - Legal incompatibility (family law asymmetries)
    - Economic incompatibility (dual-income necessity)
    - Social incompatibility (stigmatization of traditional reproduction)
    """
    capture = institutional_capture_index(markers)
    contagion = sterilization_contagion_index(markers)

    combined = contagion * (0.4 + 0.6 * capture)
    threshold = 0.35
    if combined > threshold:
        sterilization = 0.2 + 0.8 * (
            (combined - threshold) / (1.0 - threshold)) ** 1.3
    else:
        sterilization = 0.2 * (combined / threshold)

    return round(max(0.0, min(1.0, sterilization)), 4)


def sacculina_hijacking_index(markers: dict[str, float]) -> float:
    """Sacculina-model: reproductive energy redirected to ideology spread.

    Sacculina feminizes the male crab and makes it care for parasite
    eggs as its own. Human analogue: biological reproduction
    substituted by ideological reproduction ("raising awareness"
    replaces raising children), parental instinct redirected to
    fur babies / plant parenthood / allyship / social causes.
    """
    pp = pathopolites_profile(markers)
    moral_comp = pp["moral_compensation"]
    ext_locus = pp["external_locus"]

    t = markers.get("T", 0.5)
    oxt = markers.get("OXT", 0.5)

    moral_capture = moral_comp * ext_locus
    biological_weakness = (1.0 - t) * (1.0 - oxt)

    hijacking = moral_capture * (0.3 + 0.7 * biological_weakness)
    return round(max(0.0, min(1.0, hijacking)), 4)


def baculovirus_institutional_index(markers: dict[str, float]) -> float:
    """Baculovirus-model: pathology rains down from captured institutions.

    Captured institutions = the "high point":
    Education (earliest intervention), media (broadest reach),
    law (mandatory compliance), medicine (deepest trust).
    Each rains pathological norms downward onto the general population.
    """
    capture = institutional_capture_index(markers)
    contagion = sterilization_contagion_index(markers)

    rain = capture * (0.5 + 0.5 * contagion)
    if capture > 0.3:
        compound = 1.0 + 0.8 * (capture - 0.3)
    else:
        compound = 1.0

    return round(max(0.0, min(1.0, rain * compound)), 4)


def disoperator_destruction_index(markers: dict[str, float]) -> float:
    """STAW model: single disoperator destroys cooperative group.

    From Universe 34B: one disoperation rat jumped the fence into
    a cooperation group and attacked every member who approached
    the water source. Half the group died. The experiment ended.

    Cooperative systems have no defense against a defector because
    the system assumes all participants follow the cooperation norm.
    One HR complaint, lawsuit, or social media campaign by a
    defector can restructure an entire institution.
    """
    pp = pathopolites_profile(markers)
    pp_idx = pp["pathopolites_index"]
    safety = pp["safety_seeking"]

    disoperator_fraction = pp_idx
    cooperative_vulnerability = safety

    if disoperator_fraction > 0.05:
        destruction = (
            disoperator_fraction * cooperative_vulnerability * 3.0) ** 0.8
    else:
        destruction = disoperator_fraction * cooperative_vulnerability

    return round(max(0.0, min(1.0, destruction)), 4)


def cooperative_group_integrity(markers: dict[str, float]) -> float:
    """Remaining integrity of cooperative social structures.

    Modulated by T (enforcement capacity) and OXT (bonding).
    Reduced by disoperator penetration.
    """
    destruction = disoperator_destruction_index(markers)
    t = markers.get("T", 0.5)
    oxt = markers.get("OXT", 0.5)

    base_integrity = t * 0.6 + oxt * 0.4
    integrity = base_integrity * (1.0 - destruction * 0.7)
    return round(max(0.0, min(1.0, integrity)), 4)


PARASITIC_TRANSMISSION_FUNCTIONS: dict[str, Any] = {
    "wolbachia_sterilization": wolbachia_sterilization_index,
    "sacculina_hijacking": sacculina_hijacking_index,
    "baculovirus_institutional": baculovirus_institutional_index,
    "disoperator_destruction": disoperator_destruction_index,
    "cooperative_integrity": cooperative_group_integrity,
}


# ── Integrated Civilizational Sink Model ──
#
# Complete feedback loop:
# Environmental degradation (VGCC, BPA, PFAS, EMF)
#   → Hormonal degradation (T↓, DA↓, OXT↓, CORT↑)
#   → Degraded phenotype (Beautiful Ones / herbivore / Pathopolite)
#   → Bioleninist selection (loyalty > competence)
#   → Institutional capture
#   → Parasitic transmission (Wolbachia / Sacculina / Baculovirus)
#     → More environmental degradation
#     → Reproductive behavior spectrum shift
#   → TFR collapse → Phase D → extinction


def civilizational_sink_index(markers: dict[str, float]) -> float:
    """Master index: depth of the civilizational behavioral sink.

    Combines hormonal degradation, signal degradation, reproductive
    behavior shift, behavioral sink predation, bioleninist ratchet,
    parasitic transmission, and Calhoun phase trajectory.

    Returns 0 (Phase B peak) to 1 (Phase D extinction).
    """
    t = markers.get("T", 0.5)
    da = markers.get("DA", 0.5)
    oxt = markers.get("OXT", 0.5)
    cort = markers.get("CORT", 0.3)
    hormonal_degradation = 1.0 - (t * da * oxt * (1.0 - cort)) ** 0.25

    signal_deg = 1.0 - pair_signal_compound(markers)
    reproductive_shift = 1.0 - effective_fertility_index(markers)
    sink = behavioral_sink_index(markers)
    ratchet = bioleninist_ratchet_index(markers)

    wolbachia = wolbachia_sterilization_index(markers)
    sacculina = sacculina_hijacking_index(markers)
    baculovirus = baculovirus_institutional_index(markers)
    disoperator = disoperator_destruction_index(markers)
    parasitic = (wolbachia + sacculina + baculovirus + disoperator) / 4.0

    societal_death = calhoun_phase_indicators(markers)["societal_death"]

    civ_sink = (
        0.20 * hormonal_degradation
        + 0.15 * signal_deg
        + 0.15 * reproductive_shift
        + 0.15 * sink
        + 0.10 * ratchet
        + 0.10 * parasitic
        + 0.15 * societal_death
    )
    return round(max(0.0, min(1.0, civ_sink)), 4)


def civilizational_sink_profile(markers: dict[str, float]) -> dict[str, Any]:
    """Full civilizational sink diagnostic."""
    phase_ind = calhoun_phase_indicators(markers)
    spectrum = reproductive_behavior_spectrum(markers)

    return {
        "civilizational_sink": civilizational_sink_index(markers),
        "calhoun_phase": calhoun_phase(markers),
        "calhoun_indicators": phase_ind,
        "recovery_potential": calhoun_recovery_potential(markers),
        "bioleninist_loyalty": bioleninist_loyalty_value(markers),
        "competence_decay": institutional_competence_decay(markers),
        "ratchet_strength": bioleninist_ratchet_index(markers),
        "reproductive_spectrum": spectrum,
        "effective_fertility": effective_fertility_index(markers),
        "prenatal_disruption": prenatal_disruption_index(markers),
        "sexual_disruption": endocrine_sexual_disruption_index(markers),
        "wolbachia_sterilization": wolbachia_sterilization_index(markers),
        "sacculina_hijacking": sacculina_hijacking_index(markers),
        "baculovirus_institutional": baculovirus_institutional_index(markers),
        "disoperator_destruction": disoperator_destruction_index(markers),
        "cooperative_integrity": cooperative_group_integrity(markers),
        "behavioral_immune": behavioral_immune_index(markers),
        "destigmatization": destigmatization_index(markers),
        "stigma_inversion": stigma_inversion_index(markers),
        "net_immunity": net_behavioral_immunity(markers),
        "transmission_resistance": transmission_resistance(markers),
        "transmission_composite": civilizational_transmission_composite(markers),
    }


def civilizational_sink_gradient(year: float = 2025) -> list[dict[str, Any]]:
    """Civilizational sink analysis across all EMF environments."""
    env_order = ["amish", "rural", "suburban", "urban_residential", "urban_office"]
    results: list[dict[str, Any]] = []

    for env_name in env_order:
        markers = environment_biomarkers(env_name, year)
        profile = civilizational_sink_profile(markers)
        profile["environment"] = env_name
        results.append(profile)

    return results


CIVILIZATIONAL_SINK_FUNCTIONS: dict[str, Any] = {
    "civilizational_sink": civilizational_sink_index,
    "calhoun_phase_indicators": calhoun_phase_indicators,
    "calhoun_phase": calhoun_phase,
    "calhoun_recovery_potential": calhoun_recovery_potential,
    "bioleninist_loyalty": bioleninist_loyalty_value,
    "competence_decay": institutional_competence_decay,
    "ratchet": bioleninist_ratchet_index,
    "reproductive_spectrum": reproductive_behavior_spectrum,
    "effective_fertility": effective_fertility_index,
    "prenatal_disruption": prenatal_disruption_index,
    "sexual_disruption": endocrine_sexual_disruption_index,
    "wolbachia_sterilization": wolbachia_sterilization_index,
    "sacculina_hijacking": sacculina_hijacking_index,
    "baculovirus_institutional": baculovirus_institutional_index,
    "disoperator_destruction": disoperator_destruction_index,
    "cooperative_integrity": cooperative_group_integrity,
}


# ── Behavioral Immune System (BIS) ──
#
# Stigma is not random cruelty. It is the behavioral immune system.
#
# Empirical foundation:
# - Fincher, Thornhill, Murray & Schaller (2008, Proc R Soc B,
#   N=98 regions): pathogen prevalence → collectivism r=-0.69
#   to -0.71, in-group collectivism r=0.73. At world-region
#   level r=0.93. Survives controlling for GDP and Gini.
# - Murray & Schaller (2013, PLoS ONE, N=31 countries): pathogen
#   prevalence → authoritarianism r=0.65, beta=0.73.
#   Individual authoritarianism mediates 77% of pathogen→governance.
# - Terrizzi, Shook & McDaniel (2013, 24-study meta-analysis):
#   BIS strength → social conservatism, reliable small-medium effect.
# - Curtis, Aunger & Rabie (2004, Proc R Soc B, N≈40,000):
#   disgust elicitors universally map to disease vectors.
# - Faulkner et al. (2004): disease salience → xenophobia toward
#   immunologically UNFAMILIAR out-groups specifically.
# - Navarrete & Fessler (2006): first trimester pregnancy →
#   elevated ethnocentrism (BIS compensates for immunosuppression).
#
# Game theory (Nowak & Sigmund 2005, indirect reciprocity;
# Fehr & Gächter 2002, altruistic punishment):
# 1. Stigma collapses image score to zero → all rational agents
#    defect on interaction with stigmatized individual
# 2. Costs nothing to the enforcer (unlike altruistic punishment,
#    which Fehr & Gächter showed humans pay for voluntarily)
# 3. Permanent consequence → expected value of defection deeply negative
# 4. Association stigma solves the meta-norm problem: you cannot
#    be "too merciful" without risking your own status
#
# Biological substrate: sanctity/purity moral foundation (Haidt) IS
# the psychological immune system. Inbar, Pizarro & Bloom 2009
# (N=31,045): disgust sensitivity → conservatism. Tybur et al.
# (2013): three distinct disgust domains (pathogen, sexual, moral)
# each solve different adaptive problems.
#
# The "smoke detector principle" (Nesse 2005): better to stigmatize
# a few healthy individuals (false positives) than to miss a
# pathological one that spreads (false negative = epidemic).
# Kurzban & Leary (2001): stigma = output of multiple adaptive
# cognitive systems: parasite avoidance, coalitional exploitation,
# and dyadic cooperation enforcement.
#
# Gelfand inverted-U (2011, 33 nations): both extremely tight
# (Japan: hikikomori, 1.15M social recluses, TFR 1.20) and
# extremely loose cultures produce worst well-being, highest
# depression/suicide. Moderate tightness = optimum. The BIS can
# become autoimmune when culturally enforced beyond biological
# substrate capacity.
#
# Destigmatization = immunosuppression. The degraded phenotype's
# demand for destigmatization is structurally identical to HIV
# targeting CD4+ T cells: the pathogen attacks the immune system
# itself because the immune system is what prevents its spread.
#
# Empirical destigmatization effects (natural experiments):
# - LGBT identification: 3.5% (2012) → 9.3% (2024), Gen Z 23.1%
#   vs Boomers 3.0% (Gallup). No plateau — still rising.
# - Single motherhood: 5% (1960) → 40% (2020s US), 9% → 51% (UK).
# - OnlyFans creators: 348K → 4.63M in 5 years (13x).
# - Counter-case: divorce rates spiked then normalized after
#   no-fault laws (Wolfers 2006); female suicide -20% (Stevenson
#   & Wolfers 2006) — some stigma traps people in lethal situations.
#
# The critical inversion: once institutional capture passes a
# threshold, stigma doesn't merely disappear — it INVERTS.
# Association stigma now punishes those who MAINTAIN the BIS
# ("bigot", "phobic", "-ist"). The immune system attacks its
# own defenders. Autoimmune civilizational collapse.
# FIRE 2026 data: 93% of students self-censor, 36% support
# shouting down speakers (record), 15% accept violence to stop
# speech — the inversion is empirically measurable.


def behavioral_immune_index(markers: dict[str, float]) -> float:
    """Behavioral immune system strength — population's stigma capacity.

    Empirical calibration:
    - Fincher et al. (2008, N=98): pathogen→collectivism r=-0.71,
      world-region r=0.93. BIS IS the mechanism.
    - Murray & Schaller (2013, N=31): pathogen→authoritarianism
      r=0.65, beta=0.73. Individual BIS mediates 77%.
    - Curtis et al. (2004, N≈40K): disgust universally maps to
      disease vectors. Cross-cultural validation.
    - Gelfand (2011, 33 nations): inverted-U. Japan (tight, BIS
      culturally enforced beyond biological substrate) shows
      different pathology: hikikomori 1.15M, concealment, not
      normalization. Optimal = moderate tightness.

    Model output: amish=0.934, rural=0.591, suburban=0.462,
    urban_res=0.386, urban_off=0.332.

    BIS components:
    1. Sanctity/purity foundation = pathogen detection (disgust response)
    2. T = enforcement willingness (confronting norm violators)
    3. Time preference = long-term orientation (short-term cost of
       stigma enforcement for long-term group benefit)
    4. OXT = coordination capacity (collective enforcement)

    Returns 0 (no behavioral immunity) to 1 (full BIS function).
    """
    sanctity = sanctity_purity(markers)
    t = markers.get("T", 0.5)
    oxt = markers.get("OXT", 0.5)
    tp = time_preference(markers)

    raw = (
        0.40 * sanctity
        + 0.25 * t
        + 0.20 * tp
        + 0.15 * oxt
    )
    return round(max(0.0, min(1.0, raw ** 1.2)), 4)


def destigmatization_index(markers: dict[str, float]) -> float:
    """Active dismantling of the behavioral immune system.

    Empirical calibration:
    - LGBT identification: 3.5%→9.3% (2012→2024), Gen Z 23.1%.
      No plateau visible — consistent with positive feedback.
    - Single motherhood: 5%→40% (US 1960→2020s), 9%→51% (UK).
    - OnlyFans: 348K→4.63M in 5 years (13x).
    - US obesity: 13.4% (1960) → 41.9% (2020). Successive cohorts
      reach thresholds at younger ages.
    - Counter-case (Category A): divorce spiked then normalized
      (Wolfers 2006); female suicide -20%. Not all destigmatization
      is pathological — some reveals suppressed demand for exit
      from genuinely harmful situations.

    Model output: amish=0.021, rural=0.112, suburban=0.188,
    urban_res=0.282, urban_off=0.373.

    Three requirements:
    1. Motivation: pathopolites index (the degraded need to normalize)
    2. Moral framework: moral compensation (justification as "compassion")
    3. Power: institutional capture (enforcement apparatus)

    Above threshold 0.15, positive feedback: destigmatization makes
    further destigmatization easier (chilling effect on BIS defenders).

    Returns 0 (no destigmatization pressure) to 1 (BIS fully dismantled).
    """
    pp = pathopolites_profile(markers)
    pp_idx = pp["pathopolites_index"]
    moral_comp = pp["moral_compensation"]
    capture = institutional_capture_index(markers)

    motivation = pp_idx * (0.4 + 0.6 * moral_comp)
    pressure = motivation * (0.5 + 1.0 * capture)

    if pressure > 0.15:
        amplification = 1.0 + 2.0 * (pressure - 0.15)
    else:
        amplification = 1.0

    return round(max(0.0, min(1.0, pressure * amplification)), 4)


def stigma_inversion_index(markers: dict[str, float]) -> float:
    """Degree to which stigma has been inverted against BIS defenders.

    Empirical calibration:
    - FIRE 2026: 93% of students self-censor, 36% support shouting
      down speakers (record high), 15% accept violence to stop speech.
      The inversion is directly measurable in the most captured
      institutional environments (universities).
    - Ofosu et al. (2019): same-sex marriage legalization doubled
      the decline in anti-gay bias. BUT states where only federal
      (not state) legalization applied showed INCREASED anti-gay
      bias — forced norm imposition without organic BIS decline
      produces backlash, not inversion.
    - Edelman paradox: conservative/religious states consume MORE
      porn, not less. Stigma drives behavior underground; removal
      makes it visible. Inversion goes further: makes the previously
      stigmatized behavior MANDATORY to signal ("ally").

    Model output: amish/rural/suburban/urban_res=0.000,
    urban_off=0.130. Crossover between urban_res and urban_off.

    Only activates when destigmatization exceeds BIS capacity.
    Amplified by group conformity (which enforces whatever the
    current norm is — in an inverted environment, it enforces inversion).

    Returns 0 (no inversion) to 1 (fully inverted BIS).
    """
    bis = behavioral_immune_index(markers)
    destig = destigmatization_index(markers)

    excess = max(0.0, destig - bis)
    if excess <= 0:
        return 0.0

    conform = group_conformity(markers)
    inversion = excess * (1.0 + 3.0 * conform)
    return round(max(0.0, min(1.0, inversion)), 4)


def net_behavioral_immunity(markers: dict[str, float]) -> float:
    """Net behavioral immune function after destigmatization.

    Positive = functioning BIS (stigma deters pathological spread)
    Zero = no immunity (stigma fully neutralized)
    Negative = inverted BIS (stigma punishes defenders)

    Returns -1 (fully inverted) through 0 to 1 (full immunity).
    """
    bis = behavioral_immune_index(markers)
    destig = destigmatization_index(markers)
    inversion = stigma_inversion_index(markers)

    net = bis - destig - inversion
    return round(max(-1.0, min(1.0, net)), 4)


def transmission_resistance(markers: dict[str, float]) -> float:
    """Population resistance to pathological behavior transmission.

    Combines BIS with cooperative group integrity.
    When net BIS is negative (inverted), resistance = 0 and
    the population is defenseless.

    Returns 0 (no resistance, defenseless) to 1 (full resistance).
    """
    net_bis = net_behavioral_immunity(markers)
    coop = cooperative_group_integrity(markers)

    if net_bis > 0:
        resistance = net_bis * 0.6 + coop * 0.4
    else:
        resistance = coop * 0.2
    return round(max(0.0, min(1.0, resistance)), 4)


BEHAVIORAL_IMMUNE_FUNCTIONS: dict[str, Any] = {
    "behavioral_immune": behavioral_immune_index,
    "destigmatization": destigmatization_index,
    "stigma_inversion": stigma_inversion_index,
    "net_immunity": net_behavioral_immunity,
    "transmission_resistance": transmission_resistance,
}


# ── Social Transmission Channels ──
#
# Five channels through which pathological states actively spread
# from infected to healthy individuals. Each channel operates
# through a distinct mechanism and exploits a different vulnerability.
#
# Empirical foundation:
# - Christakis & Fowler (2007, NEJM, N=12,067, Framingham 32yr):
#   obesity contagion 57% from friend, 171% from mutual friend,
#   40% from sibling. Effect extends to 3 degrees of separation.
# - TikTok tics (Pringsheim 2021; Müller-Vahl 2021): functional
#   tic-like disorders went from <5% to 20-35% of referrals,
#   tenfold increase. 95% female, 95% had TikTok exposure.
# - DID (McHugh 2008): from <100 known cases pre-1980 to
#   thousands/year after media depiction (Sybil, United States
#   of Tara). Average alters rose from 3 to 16.
# - Suicide contagion (Niederkrotenthaler 2012, meta-analysis):
#   13% increase after high-profile celebrity suicide. Phillips
#   "Werther effect" (1974) showed 12% spike in month after
#   front-page suicide.
# - Haidt (2024): post-2012 teen suicide +167%, ER self-harm
#   +188%, anxiety/depression doubled. Timing correlates with
#   smartphone/social media saturation (not economic crisis).
# - ACE study (Felitti 1998, N=17,337): ACE 4+ → depression
#   OR=4.6, suicide OR=12.2, alcoholism OR=7.4. Dose-response.
# - Attachment transmission (van IJzendoorn 1995, meta-analysis):
#   ~75% parent→child concordance, d=1.06. Intergenerational
#   transmission of attachment style is one of the largest
#   effects in developmental psychology.
# - Learned helplessness (Seligman 1967): 75% of dogs helpless
#   after single inescapable shock session. Transfers cross-modal.
#   Hiroto (1974): human analogue confirmed (d>1.0).
# - Addiction relapse: 85% within first year. Addicted best
#   friend → 2.59x relapse risk; addicted close relative →
#   3.49x (systematic review). 34% relapse specifically from
#   peer pressure (not craving, not stress).
# - FDIA/Münchausen by proxy (Frontiers 2025, 314 studies):
#   92.75% female perpetrators, 6-10% victim mortality,
#   19.56% of perpetrators had medical background.
# - Pathological altruism (Oakley et al. 2012, OUP, 31 papers):
#   hyperempathy/codependency affects ~40M Americans. Healthcare
#   burnout 25-60% by specialty. Concept creep (Haslam 2016)
#   documents systematic expansion of harm/trauma definitions.
# - Obesity normalization (Robinson 2017): 82.5% of obese
#   underestimate their weight. Visual normalization: as
#   population gets heavier, "normal" recalibrates upward.
#   US obesity: 13.4% (1960) → 41.9% (2020). No plateau.
#
# 1. Recovery sabotage (crab bucket): the recovered individual
#    is an existential threat — proves condition is a choice.
#    Mechanism: social pressure, temptation, ostracism of recoverers.
#
# 2. Dependency transmission (Münchausen + intergenerational):
#    making others sick/helpless to maintain control and prevent
#    their independence. Vanhempi kieltää lapselta itsenäisyyden.
#
# 3. Social contagion (media-amplified): TikTok tics, diagnosis
#    as social capital, symptom spread through identification.
#    Mechanism: dopaminergic capture × cognitive fragility.
#
# 4. Empathy weaponization (pathological altruism + sacralization):
#    compassion exploited as transmission vector. "Terveys on
#    etuoikeus / sortoa" — health reframed as oppression.
#    Mechanism: care foundation without disgust filter.
#
# 5. Active infection seeking (bugchasing/normalization):
#    deliberate pursuit of shared pathological state to resolve
#    anomic isolation. "En ole yksin viallinen."


def recovery_sabotage_index(markers: dict[str, float]) -> float:
    """Crab bucket: active sabotage of recovery in others.

    The recovered individual is an existential threat to those still
    trapped: they prove that the condition is not an immutable external
    fate but a potentially reversible state. This invalidates the
    entire victimhood identity.

    Empirical calibration:
    - Addiction relapse: 85% within first year. 34% specifically
      from peer pressure. Addicted best friend → OR=2.59, addicted
      close relative → OR=3.49 (systematic review).
    - Hoff & Pandey (2006): caste identity salience alone (no material
      change) suppresses Dalit performance — the social pressure
      channel is powerful enough to operate through expectation alone.
    - Feather (1989, N=205): tall poppy syndrome — more pleasure at
      high achiever's fall. 86.8% of women report TPS at work (2024).

    Driven by victimhood identity (condition = identity) and external
    locus (condition = environment's fault, not choice). Suppressed by
    T (capacity to celebrate others' success instead of feeling threatened).
    """
    pp = pathopolites_profile(markers)
    victim = pp["victimhood_identity"]
    ext_locus = pp["external_locus"]
    t = markers.get("T", 0.5)

    sabotage = victim * ext_locus * (1.0 - 0.5 * t)
    return round(max(0.0, min(1.0, sabotage)), 4)


def dependency_transmission_index(markers: dict[str, float]) -> float:
    """Deliberate sickening/helplessness for control (Münchausen + intergenerational).

    Two merged mechanisms:
    1. Münchausen by proxy: making others sick for attention, status,
       and control. FDIA systematic review (2025, 314 studies):
       92.75% female perpetrators, 6-10% victim mortality, 19.56%
       with medical background. 0.5-2.0 per 100K children.
    2. Intergenerational helplessness: neurotic/narcissistic parent
       teaching child learned helplessness to prevent independence.

    Empirical calibration:
    - ACE study (Felitti 1998, N=17,337): ACE 4+ → depression
      OR=4.6, suicide OR=12.2, alcoholism OR=7.4. Dose-response
      across 7 ACE categories.
    - Attachment concordance: 75% parent→infant (van IJzendoorn
      1995, d=1.06). One of largest effects in developmental psych.
    - Learned helplessness (Seligman 1967): 75% helpless after
      single session. Hiroto (1974) human analogue d>1.0.
      Cross-modal generalization: noise→anagram transfer.
    - Helicopter parenting → depression beta=0.15, low autonomy
      r=-0.17 (Schiffrin et al. 2014).

    Driven by safety_seeking (teaches danger), external_locus
    (models dependency), moral_compensation (frames control as care).
    Amplified by CORT (chronic stress environment) and (1-T)
    (inability to model autonomy for others).
    """
    pp = pathopolites_profile(markers)
    safety = pp["safety_seeking"]
    ext_locus = pp["external_locus"]
    moral_comp = pp["moral_compensation"]
    t = markers.get("T", 0.5)
    cort = markers.get("CORT", 0.3)

    control_drive = safety * ext_locus
    moral_cover = 0.3 + 0.7 * moral_comp
    helplessness = control_drive * moral_cover * (0.3 + 0.7 * cort) * (1.5 - t)

    return round(max(0.0, min(1.0, helplessness)), 4)


def social_contagion_index(markers: dict[str, float]) -> float:
    """Media-amplified pathology spread (massapsykogeeninen sairaus).

    Empirical calibration:
    - Christakis & Fowler (2007, N=12,067, 32yr): obesity 57%
      from friend, 171% from mutual friend. 3 degrees of separation.
    - TikTok tics (2021): functional tic disorders <5% → 20-35% of
      referrals (tenfold). 95% female, 95% TikTok-exposed.
    - DID: <100 cases pre-1980 → thousands/year post-media.
      Average alters: 3 → 16.
    - Suicide contagion: 13% increase after celebrity suicide
      (meta-analysis). Phillips Werther effect (1974): 12% spike.
    - Haidt (2024): post-2012 teen suicide +167%, self-harm +188%.
    - Peer substance influence meta-analysis: beta=0.147,
      alcohol beta=0.182. Peer drinking OR=1.76.
    - Foulkes prevalence inflation: awareness campaigns both
      identify real cases AND medicalize normal distress.
    - Robinson visual normalization: 82.5% of obese underestimate
      their weight. Population-level recalibration of "normal."

    Driven by:
    - Dopaminergic capture (social media hook provides the channel)
    - Victimhood identity (diagnosis as identity = motivation)
    - Cognitive fragility (inability to maintain independent judgment)
    - (1 - sanctity) = collapsed disgust/contamination filter

    The contagion requires both the channel (media) and the substrate
    (fragile, identity-seeking, with no purity filter).
    """
    dopa = dopaminergic_capture_index(markers)
    pp = pathopolites_profile(markers)
    victim = pp["victimhood_identity"]
    cog_frag = pp["cognitive_fragility"]
    sanctity = sanctity_purity(markers)

    channel = dopa * victim
    substrate = (0.3 + 0.7 * cog_frag) * (1.5 - sanctity)

    return round(max(0.0, min(1.0, channel * substrate)), 4)


def empathy_weaponization_index(markers: dict[str, float]) -> float:
    """Parasitic exploitation of empathy + sacralization of sickness.

    Two merged mechanisms:
    1. Pathological altruism exploitation: the degraded demonstrate
       suffering to extract resources, protection, and status.
    2. Sacralization of sickness: institutions redefine pathology as
       virtue, health as oppression. "Terveys on etuoikeus."

    Empirical calibration:
    - Oakley et al. (2012, OUP, 31 papers): pathological altruism
      = altruism producing unanticipated harm. Codependency ~40M
      Americans. Healthcare burnout 25-60% by specialty.
    - Haslam (2016) concept creep: harm, trauma, prejudice, mental
      disorder definitions systematically expanded. Both vertical
      (more severe) and horizontal (broader scope).
    - Tomiyama (2014) COBWEBS: weight stigma → cortisol → overeating
      → weight gain → more stigma. But removal of ALL stigma removes
      the "obese" self-classification that motivates behavior change:
      82.5% of obese underestimate weight (Robinson 2017).

    Both exploit the gap between care/harm (remains high) and
    sanctity/purity (collapsed). Empathy without disgust filter =
    no immune response to parasitic exploitation.

    Enabled by moral_compensation (frames exploitation as compassion)
    and institutional capture (enforces sacralization through policy).
    """
    sanctity = sanctity_purity(markers)
    moral_comp = pathopolites_profile(markers)["moral_compensation"]
    capture = institutional_capture_index(markers)
    ext_locus = pathopolites_profile(markers)["external_locus"]

    disgust_deficit = 1.0 - sanctity
    exploitation = disgust_deficit * moral_comp * (0.3 + 0.7 * ext_locus)
    sacralization = capture * disgust_deficit * moral_comp

    return round(max(0.0, min(1.0, 0.6 * exploitation + 0.4 * sacralization)), 4)


def active_infection_seeking_index(markers: dict[str, float]) -> float:
    """Deliberate pursuit of shared pathological state (bugchasing).

    The most extreme transmission: the uninfected actively seek
    infection. Biological: HIV bugchasing subculture. Social:
    seeking diagnosis, "neurodivergent pride", celebrating shared
    pathology as identity and community.

    Psychological function: anomic isolation is worse than shared
    sickness. Tartunnan levittäminen toiselle poistaa leiman
    ("en ole enää yksin viallinen"), lievittää hylätyksi tulemisen
    pelkoa ja luo tiiviin sisäryhmän.

    Driven by anomic distress (isolation) and external locus
    (seeking belonging through shared condition). Requires low T
    (no capacity for independent path). Only significant when
    destigmatization has removed the cost of infection.
    """
    pp = pathopolites_profile(markers)
    anomic = pp["anomic_distress"]
    ext_locus = pp["external_locus"]
    victim = pp["victimhood_identity"]
    t = markers.get("T", 0.5)

    isolation_drive = anomic * ext_locus
    identity_gain = 0.3 + 0.7 * victim
    capacity = max(0.0, 1.0 - t)

    return round(max(0.0, min(1.0, isolation_drive * identity_gain * capacity)), 4)


def civilizational_transmission_composite(markers: dict[str, float]) -> float:
    """Aggregate social transmission intensity across all channels.

    Not a simple average — channels compound. High values in
    multiple channels means the population faces simultaneous
    attack vectors with no defense.

    Modulated by transmission_resistance: high resistance blocks
    all channels; low resistance lets them through; inverted BIS
    amplifies them.

    Returns 0 (no active transmission) to 1 (maximal pathological spread).
    """
    sabotage = recovery_sabotage_index(markers)
    dependency = dependency_transmission_index(markers)
    contagion = social_contagion_index(markers)
    empathy = empathy_weaponization_index(markers)
    infection = active_infection_seeking_index(markers)

    raw_transmission = (
        0.25 * sabotage
        + 0.20 * dependency
        + 0.20 * contagion
        + 0.20 * empathy
        + 0.15 * infection
    )

    resistance = transmission_resistance(markers)
    effective = raw_transmission * (1.5 - resistance)

    return round(max(0.0, min(1.0, effective)), 4)


def civilizational_transmission_profile(
    markers: dict[str, float],
) -> dict[str, Any]:
    """Full behavioral immune system and transmission diagnostic."""
    return {
        "behavioral_immune": behavioral_immune_index(markers),
        "destigmatization": destigmatization_index(markers),
        "stigma_inversion": stigma_inversion_index(markers),
        "net_immunity": net_behavioral_immunity(markers),
        "transmission_resistance": transmission_resistance(markers),
        "recovery_sabotage": recovery_sabotage_index(markers),
        "dependency_transmission": dependency_transmission_index(markers),
        "social_contagion": social_contagion_index(markers),
        "empathy_weaponization": empathy_weaponization_index(markers),
        "active_infection_seeking": active_infection_seeking_index(markers),
        "transmission_composite": civilizational_transmission_composite(markers),
    }


def civilizational_transmission_gradient(
    year: float = 2025,
) -> list[dict[str, Any]]:
    """Transmission analysis across all EMF environments."""
    env_order = [
        "amish", "rural", "suburban", "urban_residential", "urban_office",
    ]
    results: list[dict[str, Any]] = []
    for env_name in env_order:
        markers = environment_biomarkers(env_name, year)
        profile = civilizational_transmission_profile(markers)
        profile["environment"] = env_name
        results.append(profile)
    return results


SOCIAL_TRANSMISSION_FUNCTIONS: dict[str, Any] = {
    "recovery_sabotage": recovery_sabotage_index,
    "dependency_transmission": dependency_transmission_index,
    "social_contagion": social_contagion_index,
    "empathy_weaponization": empathy_weaponization_index,
    "active_infection_seeking": active_infection_seeking_index,
    "transmission_composite": civilizational_transmission_composite,
    "transmission_profile": civilizational_transmission_profile,
}
