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
from dataclasses import dataclass, field
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
            "EITHER component collapses the product. Melatonin (pinealocytes) "
            "and BDNF (calcium-dependent synthesis) are first-order VGCC "
            "targets. T (Leydig cells) degrades via calcium disruption. "
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
            "(Welling 2025 RCT, N=136). CORT elevation further suppresses "
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
    consequence of which hormonal systems are most sensitive to VGCC
    disruption.
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
    fairness_val = mf.get("fairness", 0)
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
