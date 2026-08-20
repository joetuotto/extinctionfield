"""Evidence-first priors and constraints for the FieldState route.

The FieldState evidence registry answers whether a study has a bounded,
source-qualified placement in the causal graph.  This module makes the
positive modelling consequence explicit: a study can constrain topology,
direction, field-feature specificity, latency/memory and susceptibility even
when it cannot yet identify a single population coefficient.  These are active
model priors, not rejected evidence or an implicit zero-effect prior.

No object here produces a FieldState-to-TFR coefficient.  Numeric endpoint
parameters remain separately estimated and retain uncertainty.  The ledger
therefore supports broad, competing prior families rather than a pass/fail
calibration gate.
"""

from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
import json
from pathlib import Path
from typing import Iterable, Mapping

from berm.biology.causal_registry import CAUSAL_NODES, get_causal_node, validate_causal_nodes
from berm.evidence_registry import (
    LegacyEvidenceMigrationRecord,
    load_fieldstate_evidence,
    load_legacy_evidence_migration,
)


EVIDENCE_CONSTRAINT_VERSION = "fieldstate-evidence-constraints-v1"
EVIDENCE_CONSTRAINT_PATH = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "evidence"
    / "fieldstate_evidence_constraints_v1.json"
)
LEGACY_QUALIFICATION_VERSION = "legacy-evidence-qualification-v1"
LEGACY_QUALIFICATION_PATH = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "evidence"
    / "legacy_evidence_qualification_v1.json"
)

# These tiers state how a record informs a prior.  They deliberately are not
# certainty grades and do not turn a missing local panel into a zero prior.
PARAMETER_PRIOR_TIERS = frozenset({
    "ACTIVE_STRUCTURAL_PRIOR",
    "SEMI_QUANTITATIVE_PROTOCOL_PRIOR",
    "DIRECT_ENDPOINT_PROTOCOL_PRIOR",
    "SYNTHESIS_CONVERGENCE_PRIOR",
    "DESCRIPTIVE_SIGNATURE_PRIOR",
})
UNCERTAINTY_UPDATES = frozenset({
    "RETAINS_WIDE_MAGNITUDE_UNCERTAINTY",
    "CONSTRAINS_RESPONSE_FAMILY_AND_ORDERING",
    "SUPPORTS_PROTOCOL_BOUND_ENDPOINT_RANGE",
    "INCREASES_CONVERGENCE_ACROSS_INDEPENDENT_STREAMS",
    "CONSTRAINS_EXPECTED_OBSERVATIONAL_SIGNATURE",
})
MATCH_DIRECTNESS = frozenset({
    "COLOCATED_INDIVIDUAL",
    "MICROENVIRONMENT_RECONSTRUCTED",
    "MOBILITY_WEIGHTED_CATCHMENT",
    "CATCHMENT_RECONSTRUCTED",
    "AREA_TIME_AGGREGATED",
    "SPECIES_OR_ORGAN_TRANSFER_EXPERIMENT",
})
LEGACY_MODEL_PLACEMENTS = frozenset({
    "VERIFIED_ACTIVE_CONSTRAINT",
    "VERIFIED_CANDIDATE_CONSTRAINT",
    "QUALIFIED_CONTEXTUAL_COMPARATOR",
    "PROVENANCE_ONLY_NOT_ACTIVE_WEIGHT",
})


def _nonempty(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


def _strings(name: str, values: Iterable[str]) -> tuple[str, ...]:
    result = tuple(_nonempty(name, value) for value in values)
    if not result:
        raise ValueError(f"{name} must not be empty")
    if len(set(result)) != len(result):
        raise ValueError(f"{name} contains duplicate values")
    return result


@dataclass(frozen=True)
class ReceptorTransferSignature:
    """How a source system transfers across species, organs and field states.

    The signature is intentionally qualitative.  It is usable before a human
    coefficient exists because it says which FieldState features and receptor
    interface must be retained when a response is tested in another system.
    """

    field_features: tuple[str, ...]
    response_class: str
    transfer_mode: str
    species_sensitivity_signature: str

    def __post_init__(self) -> None:
        object.__setattr__(self, "field_features", _strings("field_feature", self.field_features))
        for name in ("response_class", "transfer_mode", "species_sensitivity_signature"):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))


@dataclass(frozen=True)
class EvidenceSourceProfile:
    """Positive prior profile attached to one active evidence source."""

    evidence_id: str
    convergence_groups: tuple[str, ...]
    life_stages: tuple[str, ...]
    organs: tuple[str, ...]
    latency_memory_family: str
    parameter_prior_tier: str
    uncertainty_update: str
    heterogeneity_signatures: tuple[str, ...]
    model_constraints: tuple[str, ...]
    receptor_transfer: ReceptorTransferSignature
    node_direction_overrides: Mapping[str, str]

    def __post_init__(self) -> None:
        object.__setattr__(self, "evidence_id", _nonempty("evidence_id", self.evidence_id))
        for name in ("convergence_groups", "life_stages", "organs", "heterogeneity_signatures", "model_constraints"):
            object.__setattr__(self, name, _strings(name[:-1] if name.endswith("s") else name, getattr(self, name)))
        object.__setattr__(self, "latency_memory_family", _nonempty("latency_memory_family", self.latency_memory_family))
        if self.parameter_prior_tier not in PARAMETER_PRIOR_TIERS:
            raise ValueError(f"unknown parameter_prior_tier {self.parameter_prior_tier!r}")
        if self.uncertainty_update not in UNCERTAINTY_UPDATES:
            raise ValueError(f"unknown uncertainty_update {self.uncertainty_update!r}")
        if not isinstance(self.receptor_transfer, ReceptorTransferSignature):
            raise TypeError("receptor_transfer must be ReceptorTransferSignature")
        overrides = {
            get_causal_node(node).id: _nonempty("expected_direction", direction)
            for node, direction in dict(self.node_direction_overrides).items()
        }
        object.__setattr__(self, "node_direction_overrides", overrides)


@dataclass(frozen=True)
class EvidenceConstraint:
    """One source-to-node, non-numeric constraint available to the model."""

    evidence_id: str
    citation: str
    source_system: str
    source_directness: str
    field_class: str
    causal_node: str
    expected_direction: str
    convergence_groups: tuple[str, ...]
    life_stages: tuple[str, ...]
    organs: tuple[str, ...]
    latency_memory_family: str
    parameter_prior_tier: str
    uncertainty_update: str
    heterogeneity_signatures: tuple[str, ...]
    model_constraints: tuple[str, ...]
    receptor_transfer: ReceptorTransferSignature
    supported_graph_edges: tuple[tuple[str, str], ...]

    def __post_init__(self) -> None:
        for name in (
            "evidence_id", "citation", "source_system", "source_directness", "field_class",
            "expected_direction", "latency_memory_family", "parameter_prior_tier", "uncertainty_update",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        object.__setattr__(self, "causal_node", get_causal_node(self.causal_node).id)
        for name in ("convergence_groups", "life_stages", "organs", "heterogeneity_signatures", "model_constraints"):
            object.__setattr__(self, name, _strings(name[:-1] if name.endswith("s") else name, getattr(self, name)))
        if self.parameter_prior_tier not in PARAMETER_PRIOR_TIERS:
            raise ValueError(f"unknown parameter_prior_tier {self.parameter_prior_tier!r}")
        if self.uncertainty_update not in UNCERTAINTY_UPDATES:
            raise ValueError(f"unknown uncertainty_update {self.uncertainty_update!r}")
        if not isinstance(self.receptor_transfer, ReceptorTransferSignature):
            raise TypeError("receptor_transfer must be ReceptorTransferSignature")
        edges = tuple((get_causal_node(parent).id, get_causal_node(child).id) for parent, child in self.supported_graph_edges)
        object.__setattr__(self, "supported_graph_edges", edges)


@dataclass(frozen=True)
class LegacySourceQualification:
    """Source-level verification and positive placement for a legacy record.

    The migration archive remains intact.  This supplementary ledger records
    verified DOI/PMID corrections and allows a directly or indirectly relevant
    source to operate as a broad constraint before it is copied into a new
    canonical bibliography.  Provenance-only records (for example retracted
    work) remain visible but are never given a numerical or structural weight.
    """

    legacy_id: str
    model_placement: str
    verification_status: str
    verified_identifiers: Mapping[str, str]
    source_note: str
    evidence_id: str | None = None
    source_system: str | None = None
    field_class: str | None = None
    source_directness: str | None = None
    profile: EvidenceSourceProfile | None = None

    def __post_init__(self) -> None:
        for name in ("legacy_id", "model_placement", "verification_status", "source_note"):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        if self.model_placement not in LEGACY_MODEL_PLACEMENTS:
            raise ValueError(f"unknown model_placement {self.model_placement!r}")
        identifiers = {
            _nonempty("identifier_type", key): _nonempty("identifier", value)
            for key, value in dict(self.verified_identifiers).items()
        }
        if not identifiers:
            raise ValueError("verified_identifiers must not be empty")
        object.__setattr__(self, "verified_identifiers", identifiers)
        if self.model_placement == "PROVENANCE_ONLY_NOT_ACTIVE_WEIGHT":
            if self.profile is not None:
                raise ValueError("provenance-only qualification must not carry a constraint profile")
            return
        for name in ("evidence_id", "source_system", "field_class", "source_directness"):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        if not isinstance(self.profile, EvidenceSourceProfile):
            raise TypeError("active/candidate legacy qualification requires EvidenceSourceProfile")
        if self.profile.evidence_id != self.evidence_id:
            raise ValueError("legacy profile evidence_id must match qualification evidence_id")


@dataclass(frozen=True)
class FieldStateMatchContext:
    """Observed, reconstructed or mobility-weighted FieldState linkage context.

    A literal shared site identifier is not universally required: organisms
    move, people occupy multiple microenvironments and a suitable catchment can
    be reconstructed.  The context records the transfer uncertainty rather
    than silently discarding the observation.
    """

    match_directness: str
    spatial_or_mobility_method: str
    spatial_uncertainty: str
    temporal_alignment: str
    transfer_model_id: str | None = None

    def __post_init__(self) -> None:
        if self.match_directness not in MATCH_DIRECTNESS:
            raise ValueError(f"unknown match_directness {self.match_directness!r}")
        for name in ("spatial_or_mobility_method", "spatial_uncertainty", "temporal_alignment"):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        if self.transfer_model_id is not None:
            object.__setattr__(self, "transfer_model_id", _nonempty("transfer_model_id", self.transfer_model_id))

    @property
    def requires_literal_same_site(self) -> bool:
        """Never collapse a valid movement/catchment reconstruction into failure."""
        return False


# The direction library follows BERM's graph semantics.  A source profile can
# replace a generic expression where its protocol demonstrates a sharper sign
# or component-specific response.  These are broad directional priors, never
# a claim of one uniform response across all species, organs or field classes.
_NODE_DIRECTION_DEFAULTS: Mapping[str, str] = {
    "FIELDSTATE_SELECTED_PROXY": "TIMING_PROXY_CAN_SUPPORT_COHORT_PATTERN_ONLY",
    "FIELDSTATE_VECTOR": "VECTOR_GEOMETRY_OR_BACKGROUND_CAN_MODULATE_RESPONSE",
    "FIELDSTATE_ENVELOPE": "SPECTRAL_ENVELOPE_AND_CELL_STATE_CAN_MODULATE_RESPONSE",
    "STATIC_TRIBO_INTERFACE": "CHARGE_GEOMETRY_AND_RELAXATION_CAN_MODULATE_INTERFACE_STATE",
    "FIELDSTATE_LOW_FREQUENCY_ELECTRIC": "WAVEFORM_POLARITY_AND_LOCAL_E_FIELD_CAN_MODULATE_RESPONSE",
    "A_VGCC_ROS": "FIELD_CONDITIONS_CAN_MODULATE_CA_REDOX_PRESSURE",
    "B_RPM_CRY": "FIELD_CONDITIONS_CAN_MODULATE_RECEPTOR_CLOCK_REDOX_STATE",
    "MELATONIN_REDOX": "CIRCADIAN_REDOX_MEDIATION_CAN_BE_PERTURBED",
    "VMEM_MTOR": "MEMBRANE_BIOELECTRIC_STATE_CAN_BE_PERTURBED",
    "BIOELECTRIC_DEVELOPMENT": "DEVELOPMENTAL_PERTURBATION_CAN_LEAVE_PERSISTENT_STATE",
    "HPA_HPG": "CIRCADIAN_OR_STRESS_MEDIATION_CAN_MODULATE_HPG_GATE",
    "MICROBIOME_OT": "MEDIATOR_STATE_CAN_MODULATE_REPRODUCTIVE_SUPPORT",
    "BARRIER_BBB": "BARRIER_INTEGRITY_CAN_DECREASE_OR_PERMEABILITY_CAN_INCREASE",
    "BARRIER_BTB": "BARRIER_INTEGRITY_CAN_DECREASE_OR_PERMEABILITY_CAN_INCREASE",
    "BARRIER_PLACENTA": "BARRIER_INTEGRITY_CAN_DECREASE_OR_PERMEABILITY_CAN_INCREASE",
    "BARRIER_RETINA": "BARRIER_INTEGRITY_CAN_DECREASE_OR_PERMEABILITY_CAN_INCREASE",
    "MALE_SPERM": "SPERM_FUNCTION_OR_OUTPUT_CAN_DECREMENT_IN_SUSCEPTIBLE_PROTOCOLS",
    "MALE_GERMLINE_RESERVE": "GERMLINE_RESERVE_CAN_DECREMENT_OR_RECOVER_ON_A_LONGER_LAG",
    "MALE_STEROIDOGENESIS": "STEROIDOGENIC_SUPPORT_CAN_DECREMENT_OR_BE_MODULATED",
    "OVARIAN_RESERVE": "OVARIAN_RESERVE_CAN_DECREMENT_DURING_SUSCEPTIBLE_DEVELOPMENTAL_WINDOWS",
    "OOCYTE_REDOX": "OOCYTE_REDOX_RESILIENCE_OR_QUALITY_CAN_DECREMENT",
    "OVULATION_CLOCK": "OVULATORY_TIMING_OR_STEROIDOGENIC_GATING_CAN_BE_PERTURBED",
    "IMPLANTATION": "IMPLANTATION_SUPPORT_CAN_BE_PERTURBED",
    "COUPLE_FECUNDABILITY": "BIOLOGICAL_CAPACITY_CAN_CHANGE_BEFORE_DEMOGRAPHIC_OUTCOME",
    "ECOLOGICAL_ENCOUNTER": "SPECIES_COMPONENT_AND_GEOMETRY_SPECIFIC_ENCOUNTER_CAN_CHANGE",
    "ECOLOGICAL_SELECTION": "RELATIVE_FITNESS_CAN_CHANGE_IF_RESPONSE_AFFECTS_LIFE_HISTORY",
    "ECOLOGICAL_TRAIT_STATE": "HERITABLE_RESPONSE_DISTRIBUTION_CAN_SHIFT_OVER_GENERATIONS",
    "DEMAND_OPPORTUNITY": "EXTERNAL_NONBIOLOGICAL_INPUT_REMAINS_SEPARATE",
    "TEMPO": "EXTERNAL_NONBIOLOGICAL_INPUT_REMAINS_SEPARATE",
    "ART_LIVE_BIRTH_DELIVERY": "EXTERNAL_NONBIOLOGICAL_INPUT_REMAINS_SEPARATE",
    "ASFR": "AGE_COHORT_SIGNATURE_CAN_BE_TESTED_SEPARATELY_FROM_TFR",
    "TFR": "DERIVED_OUTCOME_PATTERN_CAN_BE_TESTED_WITHOUT_A_DIRECT_FIELD_COEFFICIENT",
}


def _profile_from_dict(raw: Mapping[str, object]) -> EvidenceSourceProfile:
    transfer = raw["receptor_transfer"]
    if not isinstance(transfer, Mapping):
        raise ValueError("receptor_transfer must be a mapping")
    return EvidenceSourceProfile(
        evidence_id=str(raw["evidence_id"]),
        convergence_groups=tuple(raw["convergence_groups"]),
        life_stages=tuple(raw["life_stages"]),
        organs=tuple(raw["organs"]),
        latency_memory_family=str(raw["latency_memory_family"]),
        parameter_prior_tier=str(raw["parameter_prior_tier"]),
        uncertainty_update=str(raw["uncertainty_update"]),
        heterogeneity_signatures=tuple(raw["heterogeneity_signatures"]),
        model_constraints=tuple(raw["model_constraints"]),
        receptor_transfer=ReceptorTransferSignature(
            field_features=tuple(transfer["field_features"]),
            response_class=str(transfer["response_class"]),
            transfer_mode=str(transfer["transfer_mode"]),
            species_sensitivity_signature=str(transfer["species_sensitivity_signature"]),
        ),
        node_direction_overrides=dict(raw.get("node_direction_overrides", {})),
    )


def _legacy_qualification_from_dict(raw: Mapping[str, object]) -> LegacySourceQualification:
    placement = str(raw["model_placement"])
    profile_raw = raw.get("profile")
    profile = _profile_from_dict(profile_raw) if isinstance(profile_raw, Mapping) else None
    return LegacySourceQualification(
        legacy_id=str(raw["legacy_id"]),
        model_placement=placement,
        verification_status=str(raw["verification_status"]),
        verified_identifiers=dict(raw["verified_identifiers"]),
        source_note=str(raw["source_note"]),
        evidence_id=(str(raw["evidence_id"]) if raw.get("evidence_id") is not None else None),
        source_system=(str(raw["source_system"]) if raw.get("source_system") is not None else None),
        field_class=(str(raw["field_class"]) if raw.get("field_class") is not None else None),
        source_directness=(
            str(raw["source_directness"]) if raw.get("source_directness") is not None else None
        ),
        profile=profile,
    )


@lru_cache(maxsize=1)
def load_legacy_source_qualifications() -> tuple[LegacySourceQualification, ...]:
    """Load verified identifiers and non-binary model placements for legacy sources."""
    raw = json.loads(LEGACY_QUALIFICATION_PATH.read_text(encoding="utf-8"))
    if raw.get("ledger_version") != LEGACY_QUALIFICATION_VERSION:
        raise ValueError(
            f"expected ledger_version {LEGACY_QUALIFICATION_VERSION!r}, "
            f"got {raw.get('ledger_version')!r}"
        )
    qualifications = tuple(
        _legacy_qualification_from_dict(item) for item in raw.get("records", ())
    )
    ids = tuple(item.legacy_id for item in qualifications)
    if not qualifications:
        raise ValueError("legacy qualification ledger is empty")
    if len(set(ids)) != len(ids):
        raise ValueError("legacy qualification ledger contains duplicate legacy IDs")
    legacy = {record.legacy_id: record for record in load_legacy_evidence_migration()}
    invalid = set(ids) - set(legacy)
    if invalid:
        raise ValueError(f"qualifications refer to unknown legacy IDs: {sorted(invalid)}")
    for item in qualifications:
        source = legacy[item.legacy_id]
        if item.profile is not None:
            invalid_nodes = set(item.profile.node_direction_overrides) - set(source.canonical_nodes)
            if invalid_nodes:
                raise ValueError(
                    f"{item.legacy_id} maps nodes absent from its migration record: {sorted(invalid_nodes)}"
                )
            uncovered = set(source.canonical_nodes) - set(_NODE_DIRECTION_DEFAULTS) - set(
                item.profile.node_direction_overrides
            )
            if uncovered:
                raise ValueError(
                    f"{item.legacy_id} has no direction mapping for {sorted(uncovered)}"
                )
    return qualifications


@lru_cache(maxsize=1)
def load_evidence_source_profiles() -> tuple[EvidenceSourceProfile, ...]:
    """Load a complete, positive constraint profile for every active source."""
    raw = json.loads(EVIDENCE_CONSTRAINT_PATH.read_text(encoding="utf-8"))
    if raw.get("registry_version") != EVIDENCE_CONSTRAINT_VERSION:
        raise ValueError(
            f"expected registry_version {EVIDENCE_CONSTRAINT_VERSION!r}, "
            f"got {raw.get('registry_version')!r}"
        )
    profiles = tuple(_profile_from_dict(item) for item in raw.get("profiles", ()))
    if not profiles:
        raise ValueError("evidence constraint registry is empty")
    ids = tuple(profile.evidence_id for profile in profiles)
    if len(set(ids)) != len(ids):
        raise ValueError("evidence constraint registry contains duplicate evidence IDs")
    sources = {source.id: source for source in load_fieldstate_evidence()}
    if set(ids) != set(sources):
        missing = sorted(set(sources) - set(ids))
        extra = sorted(set(ids) - set(sources))
        raise ValueError(f"constraint profiles must cover active evidence exactly; missing={missing}, extra={extra}")
    for profile in profiles:
        source = sources[profile.evidence_id]
        invalid = set(profile.node_direction_overrides) - set(source.causal_nodes)
        if invalid:
            raise ValueError(
                f"{profile.evidence_id} overrides nodes not mapped by source: {sorted(invalid)}"
            )
        missing_directions = set(source.causal_nodes) - set(_NODE_DIRECTION_DEFAULTS) - set(profile.node_direction_overrides)
        if missing_directions:
            raise ValueError(
                f"{profile.evidence_id} has no expected direction for {sorted(missing_directions)}"
            )
    return profiles


def _supported_graph_edges(nodes: Iterable[str]) -> tuple[tuple[str, str], ...]:
    selected = set(validate_causal_nodes(nodes))
    return tuple(
        (node.id, child)
        for node in CAUSAL_NODES
        if node.id in selected
        for child in node.children
        if child in selected
    )


def _constraints_from_profile(
    *,
    evidence_id: str,
    citation: str,
    source_system: str,
    source_directness: str,
    field_class: str,
    causal_nodes: Iterable[str],
    profile: EvidenceSourceProfile,
) -> tuple[EvidenceConstraint, ...]:
    """Expand a source profile without assigning a hidden numerical effect."""
    nodes = validate_causal_nodes(causal_nodes)
    edges = _supported_graph_edges(nodes)
    constraints: list[EvidenceConstraint] = []
    for node in nodes:
        constraints.append(
            EvidenceConstraint(
                evidence_id=evidence_id,
                citation=citation,
                source_system=source_system,
                source_directness=source_directness,
                field_class=field_class,
                causal_node=node,
                expected_direction=profile.node_direction_overrides.get(
                    node, _NODE_DIRECTION_DEFAULTS[node]
                ),
                convergence_groups=profile.convergence_groups,
                life_stages=profile.life_stages,
                organs=profile.organs,
                latency_memory_family=profile.latency_memory_family,
                parameter_prior_tier=profile.parameter_prior_tier,
                uncertainty_update=profile.uncertainty_update,
                heterogeneity_signatures=profile.heterogeneity_signatures,
                model_constraints=profile.model_constraints,
                receptor_transfer=profile.receptor_transfer,
                supported_graph_edges=edges,
            )
        )
    return tuple(constraints)


@lru_cache(maxsize=1)
def load_active_evidence_constraints() -> tuple[EvidenceConstraint, ...]:
    """Expand source-qualified canonical records into active constraints."""
    sources = {source.id: source for source in load_fieldstate_evidence()}
    constraints: list[EvidenceConstraint] = []
    for profile in load_evidence_source_profiles():
        source = sources[profile.evidence_id]
        constraints.extend(
            _constraints_from_profile(
                evidence_id=source.id,
                citation=source.citation,
                source_system=source.system,
                source_directness=source.directness,
                field_class=source.field_class,
                causal_nodes=source.causal_nodes,
                profile=profile,
            )
        )
    return tuple(constraints)


@lru_cache(maxsize=1)
def load_verified_legacy_constraints() -> tuple[EvidenceConstraint, ...]:
    """Use verified legacy sources as broad active/candidate priors.

    This is deliberately inclusive of directly and indirectly BERM-relevant
    sources.  Their source-specific field/protocol bounds are retained, while
    retracted or contested sources remain provenance-only in the qualification
    ledger rather than being silently forgotten or numerically weighted.
    """
    legacy = {record.legacy_id: record for record in load_legacy_evidence_migration()}
    constraints: list[EvidenceConstraint] = []
    for item in load_legacy_source_qualifications():
        if item.model_placement not in {
            "VERIFIED_ACTIVE_CONSTRAINT",
            "VERIFIED_CANDIDATE_CONSTRAINT",
        }:
            continue
        record = legacy[item.legacy_id]
        assert item.profile is not None
        constraints.extend(
            _constraints_from_profile(
                evidence_id=item.evidence_id or item.legacy_id,
                citation=(
                    f"{record.citation.get('authors', '')}. "
                    f"{record.citation.get('title', '')}. "
                    f"{record.citation.get('journal', '')}. "
                    f"{record.citation.get('year', '')}."
                ),
                source_system=item.source_system or "legacy source system",
                source_directness=item.source_directness or "LEGACY_SOURCE_QUALIFIED",
                field_class=item.field_class or "legacy field class",
                causal_nodes=record.canonical_nodes,
                profile=item.profile,
            )
        )
    return tuple(constraints)


@lru_cache(maxsize=1)
def load_evidence_constraints() -> tuple[EvidenceConstraint, ...]:
    """Return canonical plus source-qualified legacy non-numeric priors."""
    return (*load_active_evidence_constraints(), *load_verified_legacy_constraints())


def constraints_for_node(node_id: str) -> tuple[EvidenceConstraint, ...]:
    """Return the active non-numeric priors supporting one semantic node."""
    canonical = get_causal_node(node_id).id
    return tuple(item for item in load_evidence_constraints() if item.causal_node == canonical)


def constraints_for_match(
    match: FieldStateMatchContext,
    *,
    node_ids: Iterable[str] | None = None,
) -> tuple[EvidenceConstraint, ...]:
    """Expose constraints for direct, reconstructed or mobility-weighted links.

    The match describes uncertainty in FieldState transfer; it does not erase
    the evidence constraint.  A study-specific inference can carry this
    context into its likelihood or sensitivity analysis.
    """
    if not isinstance(match, FieldStateMatchContext):
        raise TypeError("match must be FieldStateMatchContext")
    selected = load_evidence_constraints()
    if node_ids is None:
        return selected
    requested = set(validate_causal_nodes(node_ids))
    return tuple(item for item in selected if item.causal_node in requested)


@dataclass(frozen=True)
class LegacyEvidencePlacement:
    """Positive placement of every retained legacy record, never a discard bin."""

    legacy_id: str
    canonical_nodes: tuple[str, ...]
    evidence_role: str
    model_domain: str
    placement: str
    parameter_prior_tier: str
    next_use: str


def _legacy_placement(
    record: LegacyEvidenceMigrationRecord,
    qualification: LegacySourceQualification | None = None,
) -> LegacyEvidencePlacement:
    if qualification is not None:
        prior = (
            qualification.profile.parameter_prior_tier
            if qualification.profile is not None
            else "DESCRIPTIVE_SIGNATURE_PRIOR"
        )
        return LegacyEvidencePlacement(
            legacy_id=record.legacy_id,
            canonical_nodes=record.canonical_nodes,
            evidence_role=record.evidence_role,
            model_domain=record.model_domain,
            placement=qualification.model_placement,
            parameter_prior_tier=prior,
            next_use=qualification.source_note,
        )
    if record.status == "SUPERSEDED_BY_ACTIVE_RECORD":
        placement = "ACTIVE_ALIAS_OF_SOURCE_QUALIFIED_CONSTRAINT"
        prior = "ACTIVE_STRUCTURAL_PRIOR"
        next_use = "Use the linked active source profile and retain this record as provenance."
    elif record.status == "MIGRATION_CANDIDATE":
        placement = "SOURCE_QUALIFICATION_CANDIDATE_PRIOR"
        prior = (
            "ACTIVE_STRUCTURAL_PRIOR"
            if record.calibration_role == "STRUCTURAL_ONLY"
            else "DESCRIPTIVE_SIGNATURE_PRIOR"
        )
        next_use = (
            "Verify the primary protocol, then retain its node, direction, field-class and "
            "life-stage constraints in the active ledger; do not default its effect to zero."
        )
    elif record.canonical_nodes:
        placement = "CONTEXTUAL_OR_COMPARATOR_PRIOR"
        prior = "DESCRIPTIVE_SIGNATURE_PRIOR"
        next_use = "Use as an explicit comparator, covariate or endpoint-pattern constraint."
    else:
        placement = "DISCOVERY_ARCHIVE_PRIOR"
        prior = "DESCRIPTIVE_SIGNATURE_PRIOR"
        next_use = "Retain for hypothesis discovery and source qualification; no forced node mapping."
    return LegacyEvidencePlacement(
        legacy_id=record.legacy_id,
        canonical_nodes=record.canonical_nodes,
        evidence_role=record.evidence_role,
        model_domain=record.model_domain,
        placement=placement,
        parameter_prior_tier=prior,
        next_use=next_use,
    )


def legacy_evidence_placements() -> tuple[LegacyEvidencePlacement, ...]:
    """Place all preserved legacy sources in a usable evidence-first ledger."""
    qualifications = {item.legacy_id: item for item in load_legacy_source_qualifications()}
    return tuple(
        _legacy_placement(record, qualifications.get(record.legacy_id))
        for record in load_legacy_evidence_migration()
    )


def evidence_constraint_summary() -> dict[str, object]:
    """Summarise convergence without synthesising a hidden numerical effect."""
    constraints = load_evidence_constraints()
    profiles = load_evidence_source_profiles()
    canonical_constraints = load_active_evidence_constraints()
    qualified_legacy_constraints = load_verified_legacy_constraints()
    qualifications = load_legacy_source_qualifications()
    by_node: dict[str, int] = {}
    by_tier: dict[str, int] = {}
    by_latency: dict[str, int] = {}
    by_feature: dict[str, int] = {}
    by_transfer: dict[str, int] = {}
    by_edge: dict[str, int] = {}
    for item in constraints:
        by_node[item.causal_node] = by_node.get(item.causal_node, 0) + 1
        by_tier[item.parameter_prior_tier] = by_tier.get(item.parameter_prior_tier, 0) + 1
        by_latency[item.latency_memory_family] = by_latency.get(item.latency_memory_family, 0) + 1
        for feature in item.receptor_transfer.field_features:
            by_feature[feature] = by_feature.get(feature, 0) + 1
        mode = item.receptor_transfer.transfer_mode
        by_transfer[mode] = by_transfer.get(mode, 0) + 1
        for parent, child in item.supported_graph_edges:
            edge = f"{parent} -> {child}"
            by_edge[edge] = by_edge.get(edge, 0) + 1
    placements = legacy_evidence_placements()
    by_placement: dict[str, int] = {}
    for placement in placements:
        by_placement[placement.placement] = by_placement.get(placement.placement, 0) + 1
    return {
        "registry_version": EVIDENCE_CONSTRAINT_VERSION,
        "canonical_active_source_count": len(profiles),
        "canonical_active_constraint_count": len(canonical_constraints),
        "verified_legacy_source_count": sum(
            item.model_placement
            in {"VERIFIED_ACTIVE_CONSTRAINT", "VERIFIED_CANDIDATE_CONSTRAINT"}
            for item in qualifications
        ),
        "verified_legacy_constraint_count": len(qualified_legacy_constraints),
        "active_source_count": len(profiles) + sum(
            item.model_placement
            in {"VERIFIED_ACTIVE_CONSTRAINT", "VERIFIED_CANDIDATE_CONSTRAINT"}
            for item in qualifications
        ),
        "active_constraint_count": len(constraints),
        "by_causal_node": dict(sorted(by_node.items())),
        "by_parameter_prior_tier": dict(sorted(by_tier.items())),
        "by_latency_memory_family": dict(sorted(by_latency.items())),
        "by_field_feature": dict(sorted(by_feature.items())),
        "by_cross_species_transfer_mode": dict(sorted(by_transfer.items())),
        "supported_graph_edges": dict(sorted(by_edge.items())),
        "legacy_record_count": len(placements),
        "legacy_placement_count": dict(sorted(by_placement.items())),
        "prior_family_sensitivity": (
            "Evaluate broad mechanism-weighted, animal/endpoint-weighted, human-endpoint-weighted "
            "and weakly-informative prior families. Physical topology and explicitly measured "
            "field-feature constraints remain hard; magnitude, cross-species transfer and population "
            "effect parameters remain broad and sensitivity-analysed."
        ),
        "interpretation": (
            "Active structural, animal, ecological and mechanism evidence is retained as an explicit "
            "non-numeric model constraint. Convergence narrows viable topology, sign, lag and "
            "heterogeneity families; it does not silently create a universal FieldState-to-TFR coefficient."
        ),
    }


__all__ = [
    "EVIDENCE_CONSTRAINT_PATH",
    "EVIDENCE_CONSTRAINT_VERSION",
    "LEGACY_MODEL_PLACEMENTS",
    "LEGACY_QUALIFICATION_PATH",
    "LEGACY_QUALIFICATION_VERSION",
    "EvidenceConstraint",
    "EvidenceSourceProfile",
    "FieldStateMatchContext",
    "LegacyEvidencePlacement",
    "LegacySourceQualification",
    "MATCH_DIRECTNESS",
    "PARAMETER_PRIOR_TIERS",
    "ReceptorTransferSignature",
    "constraints_for_match",
    "constraints_for_node",
    "evidence_constraint_summary",
    "legacy_evidence_placements",
    "load_active_evidence_constraints",
    "load_evidence_constraints",
    "load_evidence_source_profiles",
    "load_legacy_source_qualifications",
    "load_verified_legacy_constraints",
]
