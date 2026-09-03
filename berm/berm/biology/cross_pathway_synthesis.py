"""Compositional evidence synthesis for the BERM biological chain.

BERM does not require every transition in a multiscale route to have been
measured in one experiment before the route can constrain the model.  It uses
component evidence compositionally: independently observed transitions that
share a mediator, direction and compatible boundary conditions strengthen the
corresponding causal path.  The resulting synthesis is stronger than a loose
bibliographic juxtaposition, while remaining distinct from an end-to-end
effect-size calibration.

FieldState is not the owner or root of these syntheses.  It may provide an
optional physical observation upstream of the open BERM response kernel.
"""

from __future__ import annotations

from dataclasses import dataclass
import math
from typing import Iterable


EVIDENCE_SYNTHESIS_VERSION = "berm-cross-pathway-synthesis-v1"

COMPOSED_MECHANISTIC_CONVERGENCE = "COMPOSED_MECHANISTIC_CONVERGENCE"
DIRECT_COMPONENT_CONVERGENCE = "DIRECT_COMPONENT_CONVERGENCE"
STATE_HETEROGENEITY_CONVERGENCE = "STATE_HETEROGENEITY_CONVERGENCE"
VALID_SYNTHESIS_CLASSES = frozenset(
    {
        COMPOSED_MECHANISTIC_CONVERGENCE,
        DIRECT_COMPONENT_CONVERGENCE,
        STATE_HETEROGENEITY_CONVERGENCE,
    }
)


def _finite(name: str, value: float) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite number, not a boolean")
    try:
        resolved = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite number") from exc
    if not math.isfinite(resolved):
        raise ValueError(f"{name} must be a finite number")
    return resolved


def _unique_nonempty(values: Iterable[str], name: str) -> tuple[str, ...]:
    resolved = tuple(value.strip() for value in values if isinstance(value, str) and value.strip())
    if not resolved:
        raise ValueError(f"{name} must contain at least one identifier")
    if len(resolved) != len(set(resolved)):
        raise ValueError(f"{name} contains duplicate identifiers")
    return resolved


@dataclass(frozen=True)
class EvidenceSynthesisCluster:
    """One explicit BERM inference assembled from compatible components.

    ``path`` names the ordered causal nodes constrained by the synthesis.
    ``relation_ids`` are the website claim-registry joins that provide its
    empirical basis.  ``gain`` states what the joint pattern adds beyond the
    source-by-source findings.  ``discriminator`` is the experiment or model
    comparison that most efficiently separates the synthesis from its nearest
    alternatives.
    """

    id: str
    claim_id: str
    title: str
    path: tuple[str, ...]
    relation_ids: tuple[str, ...]
    synthesis_class: str
    gain: str
    discriminator: str

    def __post_init__(self) -> None:
        for name in ("id", "claim_id", "title", "gain", "discriminator"):
            value = getattr(self, name)
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f"{name} must be a non-empty string")
        object.__setattr__(self, "path", _unique_nonempty(self.path, "path"))
        object.__setattr__(
            self,
            "relation_ids",
            _unique_nonempty(self.relation_ids, "relation_ids"),
        )
        if self.synthesis_class not in VALID_SYNTHESIS_CLASSES:
            raise ValueError(f"unknown synthesis_class: {self.synthesis_class}")


EVIDENCE_SYNTHESIS_CLUSTERS = (
    EvidenceSynthesisCluster(
        id="joint-endocrine-gate",
        claim_id="claim.synthesis.joint-endocrine-gate",
        title="Testosterone × cortisol joint endocrine gate",
        path=("HPA_HPG", "ANDROGEN_RECEPTOR_SIGNAL", "INDIVIDUAL_BEHAVIORAL_RESPONSE"),
        relation_ids=(
            "er.synthesis.joint-endocrine.mehta2010",
            "er.synthesis.joint-endocrine.narinx2022",
        ),
        synthesis_class=COMPOSED_MECHANISTIC_CONVERGENCE,
        gain=(
            "Replaces a one-hormone behavioural mapping with an interaction surface in which "
            "HPA state gates androgen-linked response capacity."
        ),
        discriminator=(
            "A preregistered testosterone × cortisol × receptor-use interaction model must "
            "outperform main-effects-only models in an independent cohort."
        ),
    ),
    EvidenceSynthesisCluster(
        id="cry-clock-hpg-serial-bridge",
        claim_id="claim.synthesis.cry-clock-hpg-chain",
        title="CRY/RPM → clock/redox → HPG serial bridge",
        path=("B_RPM_CRY", "MELATONIN_REDOX", "HPA_HPG"),
        relation_ids=(
            "er.synthesis.cry-clock.yoshii2009",
            "er.synthesis.cry-clock.sherrard2018",
            "er.synthesis.cry-clock.cao2015",
            "er.synthesis.cry-clock.liu2014",
        ),
        synthesis_class=DIRECT_COMPONENT_CONVERGENCE,
        gain=(
            "Joins magnetic CRY sensitivity, CRY-dependent redox response and clock-gated "
            "reproductive endocrinology into one directional BERM route."
        ),
        discriminator=(
            "Factorial field × light × CRY perturbation with clock, melatonin/redox and HPG "
            "readouts in the same protocol."
        ),
    ),
    EvidenceSynthesisCluster(
        id="pharmacological-target-triangulation",
        claim_id="claim.synthesis.target-intervention-triangulation",
        title="Pharmacological target triangulation",
        path=("A_VGCC_ROS", "VMEM_MTOR", "MALE_SPERM"),
        relation_ids=(
            "er.synthesis.pharmacology.pall2013",
            "er.synthesis.pharmacology.ccb1994",
            "er.synthesis.pharmacology.sirolimus2008",
        ),
        synthesis_class=COMPOSED_MECHANISTIC_CONVERGENCE,
        gain=(
            "Independent interventions at calcium-channel and mTOR-linked control points "
            "show that BERM's proposed intermediate nodes can materially alter reproductive output."
        ),
        discriminator=(
            "Matched exposure experiments with target-specific rescue and phenocopy arms must "
            "produce the mediator ordering predicted by BERM."
        ),
    ),
    EvidenceSynthesisCluster(
        id="protocol-state-heterogeneity",
        claim_id="claim.synthesis.protocol-state-heterogeneity",
        title="Protocol state explains structured heterogeneity",
        path=("BERM_L2_BRIDGE",),
        relation_ids=(
            "er.bridge.litovitz1991",
            "er.bridge.blackman1990",
            "er.bridge.blackman1991",
            "er.bridge.berman1990",
        ),
        synthesis_class=STATE_HETEROGENEITY_CONVERGENCE,
        gain=(
            "Turns apparently conflicting positive and null findings into constraints on one "
            "state-conditioned response family rather than treating protocol variables as noise."
        ),
        discriminator=(
            "A preregistered state-conditioned kernel must improve held-out prediction across "
            "laboratories over scalar intensity and study-label models."
        ),
    ),
    EvidenceSynthesisCluster(
        id="vmem-calcium-mtor-interface",
        claim_id="claim.synthesis.vmem-calcium-interface",
        title="Vmem → calcium/mTOR → cell fate and sperm capacity",
        path=("A_VGCC_ROS", "VMEM_MTOR", "MALE_SPERM"),
        relation_ids=(
            "er.synthesis.vmem.sempou2022",
            "er.synthesis.vmem.brown2016",
            "er.synthesis.vmem.zandieh2025",
        ),
        synthesis_class=COMPOSED_MECHANISTIC_CONVERGENCE,
        gain=(
            "Makes membrane potential an active state variable connecting ion-channel dynamics "
            "to calcium/mTOR fate control and a measured human fertilization endpoint."
        ),
        discriminator=(
            "Simultaneous Vmem, calcium, mTOR and reproductive-function measurements with "
            "voltage-clamp or channel-rescue intervention."
        ),
    ),
    EvidenceSynthesisCluster(
        id="conserved-cross-species-prior",
        claim_id="claim.synthesis.cross-species-transfer-prior",
        title="Conserved receptor logic as a cross-species prior",
        path=("B_RPM_CRY", "ECOLOGICAL_ENCOUNTER", "ECOLOGICAL_SELECTION"),
        relation_ids=(
            "er.synthesis.cross-species.ritz2004",
            "er.synthesis.cross-species.yoshii2009",
            "er.synthesis.cross-species.wan2021",
            "er.synthesis.cross-species.hallmann2017",
            "er.synthesis.cross-species.rosenberg2019",
        ),
        synthesis_class=COMPOSED_MECHANISTIC_CONVERGENCE,
        gain=(
            "Provides a principled prior for comparing species whose navigation, timing or "
            "reproduction depends on homologous field-sensitive machinery."
        ),
        discriminator=(
            "Cross-species models must predict stronger field-configuration effects in species "
            "and life stages with registered receptor dependence than in matched negative controls."
        ),
    ),
    EvidenceSynthesisCluster(
        id="graded-susceptibility-continuum",
        claim_id="claim.synthesis.graded-susceptibility",
        title="Graded susceptibility rather than a binary EHS class",
        path=("BERM_L2_BRIDGE", "INDIVIDUAL_BEHAVIORAL_RESPONSE"),
        relation_ids=(
            "er.synthesis.susceptibility.mccarty2011",
            "er.synthesis.susceptibility.belpomme2022",
            "er.synthesis.susceptibility.rubin2010",
        ),
        synthesis_class=STATE_HETEROGENEITY_CONVERGENCE,
        gain=(
            "Represents sensitivity as a continuous latent distribution whose tail may respond "
            "under specific transitions and states, avoiding dilution by a binary case label."
        ),
        discriminator=(
            "Repeated blinded N-of-1 crossover trials with personal trigger calibration and "
            "objective physiology must recover stable within-person response functions."
        ),
    ),
)


def additive_interaction_contrast(y0: float, y1: float, y2: float, y12: float) -> float:
    """Return the registered additive interaction contrast.

    Positive, zero and negative results are all valid.  BERM does not build in
    a supra-additive answer.
    """

    values = [_finite(name, value) for name, value in zip(("y0", "y1", "y2", "y12"), (y0, y1, y2, y12))]
    return values[3] - values[1] - values[2] + values[0]


def log_multiplicative_interaction_contrast(
    y0: float,
    y1: float,
    y2: float,
    y12: float,
) -> float:
    """Return the interaction contrast on a multiplicative outcome scale."""

    values = [_finite(name, value) for name, value in zip(("y0", "y1", "y2", "y12"), (y0, y1, y2, y12))]
    if any(value <= 0.0 for value in values):
        raise ValueError("multiplicative interaction outcomes must be positive")
    return math.log(values[3] / values[0]) - math.log(values[1] / values[0]) - math.log(values[2] / values[0])


def joint_endocrine_predictor(
    testosterone_state: float,
    cortisol_state: float,
    *,
    intercept: float,
    beta_testosterone: float,
    beta_cortisol: float,
    beta_interaction: float,
) -> float:
    """Evaluate an explicit T × cortisol interaction without hidden defaults."""

    t_state = _finite("testosterone_state", testosterone_state)
    c_state = _finite("cortisol_state", cortisol_state)
    return (
        _finite("intercept", intercept)
        + _finite("beta_testosterone", beta_testosterone) * t_state
        + _finite("beta_cortisol", beta_cortisol) * c_state
        + _finite("beta_interaction", beta_interaction) * t_state * c_state
    )


def graded_susceptibility_probability(
    response_drive: float,
    individual_threshold: float,
    *,
    scale: float,
) -> float:
    """Map continuous drive and threshold states to a response probability.

    The caller supplies all three values from a registered study model.  No
    genotype, diagnosis or FieldState measurement is silently converted into
    a biological threshold.
    """

    drive = _finite("response_drive", response_drive)
    threshold = _finite("individual_threshold", individual_threshold)
    resolved_scale = _finite("scale", scale)
    if resolved_scale <= 0.0:
        raise ValueError("scale must be positive")
    z = (drive - threshold) / resolved_scale
    if z >= 0.0:
        return 1.0 / (1.0 + math.exp(-z))
    exp_z = math.exp(z)
    return exp_z / (1.0 + exp_z)


def synthesis_manifest() -> dict[str, object]:
    """Return the cross-runtime description of the seven synthesis clusters."""

    return {
        "id": EVIDENCE_SYNTHESIS_VERSION,
        "role": "berm_compositional_evidence_layer",
        "rule": (
            "Independent compatible component findings strengthen a shared BERM causal path; "
            "the joint inference is registered separately from end-to-end coefficient calibration."
        ),
        "fieldStateRole": "optional_physical_measurement_input_only",
        "clusters": [
            {
                "id": cluster.id,
                "claimId": cluster.claim_id,
                "path": list(cluster.path),
                "synthesisClass": cluster.synthesis_class,
                "relationIds": list(cluster.relation_ids),
            }
            for cluster in EVIDENCE_SYNTHESIS_CLUSTERS
        ],
    }


__all__ = [
    "COMPOSED_MECHANISTIC_CONVERGENCE",
    "DIRECT_COMPONENT_CONVERGENCE",
    "EVIDENCE_SYNTHESIS_CLUSTERS",
    "EVIDENCE_SYNTHESIS_VERSION",
    "EvidenceSynthesisCluster",
    "STATE_HETEROGENEITY_CONVERGENCE",
    "additive_interaction_contrast",
    "graded_susceptibility_probability",
    "joint_endocrine_predictor",
    "log_multiplicative_interaction_contrast",
    "synthesis_manifest",
]
