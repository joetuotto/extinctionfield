"""Structural BERM reproductive regulation and conditional event composition.

The same biological state can enter motivation, reproductive capacity and
recipient-specific care through different target circuits.  Observations of
these outputs are retained separately; this module does not infer a syndrome
score, hormone-to-desire coefficient or an extra TFR multiplier.

The numerical operation is the law of total probability for one explicitly
identified stratum and observation window.  Its caller supplies conditional
probabilities, including the no-intention branch.  It neither fits those
probabilities nor connects itself to the archived prediction routes.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Literal

from berm.interactions._common import InteractionProvenance, combine, finite, ids, text


REPRODUCTIVE_REGULATION_VERSION = "berm-reproductive-regulation-v1"

# The eight comparison axes have different causal roles, not a common scale.
REGULATION_AXES = (
    ("caregiving", "output"),
    ("proximity", "output_and_context"),
    ("stress", "biological_state_and_output"),
    ("sexual_motivation", "output"),
    ("signalling", "output_and_input"),
    ("social_feedback", "next_time_context"),
    ("endocrine_state", "biological_state"),
    ("effort_exploration", "output"),
)


def _probability(name: str, value: float) -> float:
    value = finite(name, value)
    if not 0 <= value <= 1:
        raise ValueError(f"{name} must be in [0, 1]")
    return value


@dataclass(frozen=True)
class RegulationObservation:
    """One named measurement; values on different axes are never summed."""

    axis_id: str
    measure: str
    value: float
    unit: str
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        if self.axis_id not in dict(REGULATION_AXES):
            raise ValueError("unknown reproductive regulation axis")
        object.__setattr__(self, "measure", text("measure", self.measure))
        object.__setattr__(self, "value", finite("value", self.value))
        object.__setattr__(self, "unit", text("unit", self.unit))
        object.__setattr__(self, "evidence_ids", ids("evidence_ids", self.evidence_ids))


@dataclass(frozen=True)
class CareRecipientAmount:
    """Amount of care for a named recipient class, in a declared common unit.

    Amounts need not sum to a fixed budget.  Increasing one recipient's care
    therefore does not silently imply a reduction for children or reproduction.
    """

    recipient: str
    amount: float

    def __post_init__(self) -> None:
        object.__setattr__(self, "recipient", text("recipient", self.recipient))
        amount = finite("amount", self.amount)
        if amount < 0:
            raise ValueError("care amount must be non-negative")
        object.__setattr__(self, "amount", amount)


@dataclass(frozen=True)
class CaregivingAllocation:
    """Measured or declared care amounts, not a reproductive suppression index."""

    recipients: tuple[CareRecipientAmount, ...]
    unit: str

    def __post_init__(self) -> None:
        recipients = tuple(self.recipients)
        if not recipients or not all(isinstance(r, CareRecipientAmount) for r in recipients):
            raise ValueError("care recipients must contain CareRecipientAmount records")
        ids("care recipients", tuple(r.recipient for r in recipients))
        finite("total care", sum(r.amount for r in recipients))
        object.__setattr__(self, "recipients", recipients)
        object.__setattr__(self, "unit", text("unit", self.unit))

    @property
    def total_amount(self) -> float:
        return sum(recipient.amount for recipient in self.recipients)


@dataclass(frozen=True)
class ReproductiveRegulationProfile:
    """A context-indexed observation profile with independently recorded care.

    Missing axes stay missing.  No value is imputed from identity, childlessness
    or an aggregate outcome.  Biological, social and learned conditions remain
    explicit; observations collected in different protocols need separate IDs.
    """

    context_id: str
    biological_state_id: str
    social_context_id: str
    learning_history_id: str
    species: str
    sex: str
    life_stage: str
    observation_window: str
    observations: tuple[RegulationObservation, ...]
    provenance: InteractionProvenance
    caregiving: CaregivingAllocation | None = None

    def __post_init__(self) -> None:
        for name in (
            "context_id", "biological_state_id", "social_context_id", "learning_history_id",
            "species", "sex", "life_stage", "observation_window",
        ):
            object.__setattr__(self, name, text(name, getattr(self, name)))
        observations = tuple(self.observations)
        if not all(isinstance(item, RegulationObservation) for item in observations):
            raise ValueError("observations must be RegulationObservation records")
        pairs = [(item.axis_id, item.measure) for item in observations]
        if len(pairs) != len(set(pairs)):
            raise ValueError("duplicate axis/measure within one profile")
        object.__setattr__(self, "observations", observations)
        if not isinstance(self.provenance, InteractionProvenance):
            raise ValueError("InteractionProvenance is required")
        if self.caregiving is not None and not isinstance(self.caregiving, CaregivingAllocation):
            raise ValueError("caregiving must be a CaregivingAllocation")


@dataclass(frozen=True)
class ConditionalReproductiveBranch:
    """Chain probabilities for one intention stratum and exposure window.

    ``encounter_probability`` includes resources, partner response and access
    conditional on the named intention stratum.  ``conception_given_encounter``
    remains conditional on that entire history, as does live-birth delivery.
    Multiplication is a chain rule, not independence of motivation, access and
    capacity.  Encounter means an opportunity for conception, not a desired
    pregnancy.  No-intention encounters can therefore lead to live births.

    The context ID binds species, sex, life stage, biological/social/learned
    conditions and window to the associated profile.  Probabilities refer to
    at least one event in that window, not an annual rate or number of children.
    """

    context_id: str
    intention_condition: Literal["intention", "no_intention"]
    encounter_probability: float
    conception_given_encounter: float
    live_birth_given_conception: float
    provenance: InteractionProvenance

    def __post_init__(self) -> None:
        object.__setattr__(self, "context_id", text("context_id", self.context_id))
        if self.intention_condition not in {"intention", "no_intention"}:
            raise ValueError("unknown intention condition")
        for name in (
            "encounter_probability", "conception_given_encounter", "live_birth_given_conception",
        ):
            object.__setattr__(self, name, _probability(name, getattr(self, name)))
        if not isinstance(self.provenance, InteractionProvenance):
            raise ValueError("InteractionProvenance is required")


@dataclass(frozen=True)
class ReproductiveRealization:
    """Local conditional contributions; no TFR forecast or fitted coefficient."""

    context_id: str
    planned_encounter_probability: float
    unplanned_encounter_probability: float
    planned_conception_probability: float
    unplanned_conception_probability: float
    planned_live_birth_probability: float
    unplanned_live_birth_probability: float
    provenance: InteractionProvenance

    @property
    def encounter_probability(self) -> float:
        return self.planned_encounter_probability + self.unplanned_encounter_probability

    @property
    def conception_probability(self) -> float:
        return self.planned_conception_probability + self.unplanned_conception_probability

    @property
    def live_birth_probability(self) -> float:
        return self.planned_live_birth_probability + self.unplanned_live_birth_probability


def compose_reproductive_realization(
    profile: ReproductiveRegulationProfile,
    *,
    intention_probability: float,
    planned: ConditionalReproductiveBranch,
    unplanned: ConditionalReproductiveBranch,
) -> ReproductiveRealization:
    """Compose disjoint intention strata without a hormone or care multiplier.

    Intention is itself biologically/contextually conditioned and supplied for
    this profile; it is not derived here from a hormone concentration.  Its
    interpretation and source belong to ``profile.provenance``.  Each branch
    retains its own conditional biological success, rather than assuming that
    planned and unplanned encounters share the same capacity or delivery rate.
    """
    if not isinstance(profile, ReproductiveRegulationProfile):
        raise ValueError("ReproductiveRegulationProfile is required")
    intention = _probability("intention_probability", intention_probability)
    for branch, condition in ((planned, "intention"), (unplanned, "no_intention")):
        if not isinstance(branch, ConditionalReproductiveBranch):
            raise ValueError("ConditionalReproductiveBranch is required")
        if branch.context_id != profile.context_id:
            raise ValueError("branch and profile must share the complete context/window")
        if branch.intention_condition != condition:
            raise ValueError("planned/unplanned branches must use disjoint intention conditions")
    planned_encounter = intention * planned.encounter_probability
    unplanned_encounter = (1 - intention) * unplanned.encounter_probability
    planned_conception = planned_encounter * planned.conception_given_encounter
    unplanned_conception = unplanned_encounter * unplanned.conception_given_encounter
    return ReproductiveRealization(
        profile.context_id, planned_encounter, unplanned_encounter,
        planned_conception, unplanned_conception,
        planned_conception * planned.live_birth_given_conception,
        unplanned_conception * unplanned.live_birth_given_conception,
        combine(
            "BERM conditional reproductive realization; matched context and window",
            profile.provenance, planned.provenance, unplanned.provenance,
        ),
    )


def reproductive_regulation_structure() -> dict:
    """Return fresh metadata for the model/site contract, without coefficients."""
    return {
        "id": REPRODUCTIVE_REGULATION_VERSION,
        "modelOwner": "BERM",
        "module": "berm.biology.reproductive_regulation",
        "canonicalRoute": "/behavior/reproductive-regulation",
        "role": "conditional_multiple_output_structure",
        "calibrationStatus": "STRUCTURAL_ONLY",
        "fieldStateRole": "optional_physical_measurement_input_only",
        "requiresOpenL2Bridge": True,
        "axes": [{"id": axis, "causalRole": role} for axis, role in REGULATION_AXES],
        "context": [
            "biological_state", "social_context", "learning_history",
            "species", "sex", "life_stage", "observation_window",
        ],
        "branches": {
            "motivationAndRealization": [
                "HORMONE_TARGET_RESPONSE", "INDIVIDUAL_BEHAVIORAL_RESPONSE",
                "DEMAND_OPPORTUNITY", "ASFR",
            ],
            "externalOpportunity": ["REPRODUCTIVE_OPPORTUNITY", "DEMAND_OPPORTUNITY"],
            "capacity": ["COUPLE_FECUNDABILITY", "ASFR"],
            "caregiving": ["HORMONE_TARGET_RESPONSE", "CAREGIVING_ALLOCATION"],
        },
        "componentInterfaces": [
            {
                "id": "prl-kisspeptin-lh",
                "category": "imported_empirical_biology",
                "target": "HORMONE_TARGET_RESPONSE",
                "mechanism": "PRL-sensitive reproductive-axis response and kisspeptin/LH rescue in specified protocols",
                "claimId": "claim.reproduction.selective-regulation",
            },
            {
                "id": "prl-care-target-circuit",
                "category": "imported_empirical_biology",
                "target": "CAREGIVING_ALLOCATION",
                "mechanism": "PRL-receptive MPOA–VTA–NAc care-contact circuitry; recipient and reproductive state retained",
                "claimId": "claim.reproduction.caregiving-allocation",
            },
        ],
        "jointInference": {
            "category": "berm_proposed_conditional_mechanism",
            "statement": "Shared state can alter reproductive-axis activity, motivation, capacity and care in different directions through distinct target circuits.",
            "universalDirectionAssumed": False,
            "jointHumanSyndromeValidated": False,
        },
        "realizationPolicy": {
            "operator": "sum_i P(I=i|S,X,L) P(E|I=i,S,X,L) P(C|E,I=i,S,X,L) P(B|C,E,I=i,S,X,L)",
            "intentionStrata": ["intention", "no_intention"],
            "unit": "probability_of_at_least_one_event_in_named_window",
            "independenceAssumed": False,
            "requiresMatchedContextAndWindow": True,
            "preservesUnplannedPregnancies": True,
            "opportunityIncludesExternalInputs": True,
            "careAmountIsNotFertilityMultiplier": True,
        },
        "feedback": {
            "timeIndexed": True,
            "canonicalDagCycleAdded": False,
            "operators": [
                "berm.interactions.social.advance_social_state",
                "berm.interactions.social.advance_institution_stock",
                "berm.civilization.epistapege.institutional_memory_update",
            ],
            "statement": "Care and reproductive contacts may alter later cues, partner responses and opportunities; institutions can retain their own memory. External resources remain explicit inputs.",
            "epistapegeRemainsTerminalAt": "INSTITUTIONAL_MODEL_REUSE",
        },
        "claimIds": [
            "claim.reproduction.selective-regulation",
            "claim.reproduction.caregiving-allocation",
            "claim.behavior.behaviour-to-opportunity",
            "claim.reproduction.social-feedback",
        ],
        "openCalibration": [
            "geometry_to_tissue_kernel", "human_hormone_to_motivation_mapping",
            "context_specific_target_direction_and_lag", "matched_joint_profile_distribution",
            "contact_feedback_strength", "human_endpoint_mapping",
        ],
        "predictionPolicy": {
            "newTfrCoefficient": False,
            "modifiesArchivedForecasts": False,
            "multipliesBehavioralFactorV21": False,
            "localConditionalCompositionOnly": True,
        },
    }


__all__ = [
    "REPRODUCTIVE_REGULATION_VERSION", "REGULATION_AXES", "RegulationObservation",
    "CareRecipientAmount", "CaregivingAllocation", "ReproductiveRegulationProfile",
    "ConditionalReproductiveBranch", "ReproductiveRealization",
    "compose_reproductive_realization", "reproductive_regulation_structure",
]
