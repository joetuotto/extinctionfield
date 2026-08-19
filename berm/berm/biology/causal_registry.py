"""Canonical causal-node registry for the FieldState ASFR route.

The historical A--F letters are retained only through the namespace-qualified
compatibility adapter.  Several layers of the repository assigned different
meanings to the same letter (notably ``C`` and ``F``), so a bare letter is not
a stable semantic identifier.  New biology and evidence are therefore
attached to stable semantic node IDs, not to a display letter.

This registry is structural: it identifies the causal graph and data contracts.
It does not assert an effect size or activate a TFR coefficient.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable


@dataclass(frozen=True)
class CausalNode:
    """One stable node in the Lindgren → ASFR causal graph."""

    id: str
    label: str
    layer: str
    legacy_aliases: tuple[str, ...]
    parents: tuple[str, ...]
    children: tuple[str, ...]
    prediction_role: str
    calibration_status: str


# Node IDs intentionally encode meaning rather than UI order.  The graph is
# acyclic in its causal direction; feedback (e.g. redox/Ca) is represented
# within a biological state model rather than by ambiguous letter aliases.
CAUSAL_NODES: tuple[CausalNode, ...] = (
    CausalNode(
        "FIELDSTATE_SELECTED_PROXY",
        "Lindgren-selected two-channel timing proxy",
        "physics",
        ("legacy chi", "ambient + chi(ambient) * personal"),
        (),
        (
            "FIELDSTATE_VECTOR",
            "FIELDSTATE_ENVELOPE",
            "A_VGCC_ROS",
            "MICROBIOME_OT",
        ),
        "diagnostic_input",
        "proxy_only",
    ),
    CausalNode(
        "FIELDSTATE_VECTOR",
        "Background/personal vector, phase and organ-transfer state",
        "physics",
        ("Lindgren vector state",),
        ("FIELDSTATE_SELECTED_PROXY",),
        ("B_RPM_CRY", "A_VGCC_ROS"),
        "diagnostic_input",
        "requires_matched_measurement",
    ),
    CausalNode(
        "FIELDSTATE_ENVELOPE",
        "Measured envelope/beat spectral overlap",
        "physics",
        ("GME", "R42"),
        ("FIELDSTATE_SELECTED_PROXY",),
        ("A_VGCC_ROS", "VMEM_MTOR"),
        "diagnostic_input",
        "requires_psd_measurement",
    ),
    CausalNode(
        "A_VGCC_ROS",
        "Vmem/VGCC → Ca2+ → mitochondrial ROS",
        "mechanism",
        ("VGIC", "Ca2+/ROS"),
        ("FIELDSTATE_SELECTED_PROXY", "FIELDSTATE_VECTOR", "FIELDSTATE_ENVELOPE"),
        (
            "VMEM_MTOR",
            "BARRIER_BBB",
            "BARRIER_BTB",
            "BARRIER_PLACENTA",
            "BARRIER_RETINA",
            "HPA_HPG",
            "MALE_SPERM",
            "OOCYTE_REDOX",
        ),
        "organ_state_input",
        "structural_only",
    ),
    CausalNode(
        "B_RPM_CRY",
        "Radical-pair/cryptochrome → clock/redox state",
        "mechanism",
        ("RPM", "CRY"),
        ("FIELDSTATE_VECTOR",),
        ("MELATONIN_REDOX", "HPA_HPG", "OVULATION_CLOCK", "OOCYTE_REDOX"),
        "organ_state_input",
        "structural_only",
    ),
    CausalNode(
        "MELATONIN_REDOX",
        "Melatonin/redox circadian mediator state",
        "mechanism",
        ("pineal/melatonin", "melatonin suppression"),
        ("B_RPM_CRY",),
        (
            "HPA_HPG",
            "MALE_STEROIDOGENESIS",
            "MALE_SPERM",
            "OOCYTE_REDOX",
            "OVULATION_CLOCK",
            "IMPLANTATION",
        ),
        "organ_state_input",
        "structural_only",
    ),
    CausalNode(
        "VMEM_MTOR",
        "Bioelectric membrane potential → Ca2+/AMPK/mTOR state",
        "mechanism",
        ("Vmem", "mTOR", "T_BE"),
        ("A_VGCC_ROS", "FIELDSTATE_ENVELOPE"),
        ("BIOELECTRIC_DEVELOPMENT", "OVARIAN_RESERVE", "MALE_GERMLINE_RESERVE"),
        "organ_state_input",
        "structural_only",
    ),
    CausalNode(
        "BIOELECTRIC_DEVELOPMENT",
        "Developmental bioelectric/epigenetic reproductive-memory state",
        "mechanism",
        ("epigenetic factor", "developmental exposure"),
        ("VMEM_MTOR",),
        ("OVARIAN_RESERVE", "MALE_GERMLINE_RESERVE"),
        "organ_state_input",
        "structural_only",
    ),
    CausalNode(
        "HPA_HPG",
        "Circadian/HPA → HPG and steroidogenic gate",
        "mechanism",
        ("HPA/HPG",),
        (
            "B_RPM_CRY",
            "MELATONIN_REDOX",
            "MICROBIOME_OT",
            "A_VGCC_ROS",
            "BARRIER_BBB",
        ),
        ("MALE_STEROIDOGENESIS", "OVULATION_CLOCK", "IMPLANTATION"),
        "organ_state_input",
        "structural_only",
    ),
    CausalNode(
        "MICROBIOME_OT",
        "Microbiome/L. reuteri–oxytocin mediator state",
        "mechanism",
        ("microbiome dysbiosis", "L. reuteri", "microbiome oxytocin"),
        ("FIELDSTATE_SELECTED_PROXY",),
        ("HPA_HPG", "MALE_STEROIDOGENESIS"),
        "legacy_diagnostic_input",
        "structural_only",
    ),
    CausalNode(
        "BARRIER_BBB",
        "Blood-brain barrier tight-junction and efflux state",
        "barrier",
        ("BBB", "legacy pathway F BBB"),
        ("A_VGCC_ROS",),
        ("HPA_HPG",),
        "organ_state_input",
        "structural_only",
    ),
    CausalNode(
        "BARRIER_BTB",
        "Blood-testis barrier/Sertoli tight-junction state",
        "barrier",
        ("T_BTB", "BTB"),
        ("A_VGCC_ROS",),
        ("MALE_SPERM", "MALE_GERMLINE_RESERVE"),
        "organ_state_input",
        "structural_only",
    ),
    CausalNode(
        "BARRIER_PLACENTA",
        "Blood-placenta barrier state",
        "barrier",
        ("placental barrier",),
        ("A_VGCC_ROS",),
        ("IMPLANTATION",),
        "organ_state_input",
        "structural_only",
    ),
    CausalNode(
        "BARRIER_RETINA",
        "Blood-retinal barrier state",
        "barrier",
        ("BRB",),
        ("A_VGCC_ROS",),
        (),
        "sentinel_endpoint",
        "structural_only",
    ),
    CausalNode(
        "MALE_SPERM",
        "Sperm output, DNA integrity, motility and capacitation",
        "reproductive",
        ("sperm cascade", "CatSper"),
        (
            "A_VGCC_ROS",
            "MELATONIN_REDOX",
            "BARRIER_BTB",
            "MALE_GERMLINE_RESERVE",
            "MALE_STEROIDOGENESIS",
        ),
        ("COUPLE_FECUNDABILITY",),
        "capacity_component",
        "requires_endpoint_calibration",
    ),
    CausalNode(
        "MALE_GERMLINE_RESERVE",
        "Sertoli/germline persistent reserve",
        "reproductive",
        ("male reserve",),
        ("BARRIER_BTB", "VMEM_MTOR", "BIOELECTRIC_DEVELOPMENT"),
        ("MALE_SPERM",),
        "capacity_component",
        "requires_endpoint_calibration",
    ),
    CausalNode(
        "MALE_STEROIDOGENESIS",
        "Leydig/HPG steroidogenic support",
        "reproductive",
        ("Leydig",),
        ("HPA_HPG", "MELATONIN_REDOX", "MICROBIOME_OT"),
        ("MALE_SPERM",),
        "capacity_component",
        "requires_endpoint_calibration",
    ),
    CausalNode(
        "OVARIAN_RESERVE",
        "Primordial follicle and ovarian reserve",
        "reproductive",
        ("O_RESERVE", "AMH/AFC"),
        ("VMEM_MTOR", "BIOELECTRIC_DEVELOPMENT"),
        ("OOCYTE_REDOX", "OVULATION_CLOCK"),
        "capacity_component",
        "requires_endpoint_calibration",
    ),
    CausalNode(
        "OOCYTE_REDOX",
        "Oocyte mitochondrial/redox quality",
        "reproductive",
        ("oocyte quality",),
        ("A_VGCC_ROS", "B_RPM_CRY", "MELATONIN_REDOX", "OVARIAN_RESERVE"),
        ("OVULATION_CLOCK", "IMPLANTATION"),
        "capacity_component",
        "requires_endpoint_calibration",
    ),
    CausalNode(
        "OVULATION_CLOCK",
        "Ovulation and steroidogenic timing gate",
        "reproductive",
        ("female clock",),
        (
            "B_RPM_CRY",
            "MELATONIN_REDOX",
            "HPA_HPG",
            "OVARIAN_RESERVE",
            "OOCYTE_REDOX",
        ),
        ("COUPLE_FECUNDABILITY",),
        "capacity_component",
        "requires_endpoint_calibration",
    ),
    CausalNode(
        "IMPLANTATION",
        "Luteal, implantation and conception-to-live-birth support",
        "reproductive",
        ("pregnancy support",),
        ("HPA_HPG", "MELATONIN_REDOX", "BARRIER_PLACENTA", "OOCYTE_REDOX"),
        ("COUPLE_FECUNDABILITY",),
        "capacity_component",
        "requires_endpoint_calibration",
    ),
    CausalNode(
        "COUPLE_FECUNDABILITY",
        "Male × female × conception/live-birth capacity",
        "couple",
        ("Phi_couple",),
        ("MALE_SPERM", "OVULATION_CLOCK", "IMPLANTATION"),
        ("ASFR",),
        "outcome_bridge",
        "requires_partner_distribution",
    ),
    CausalNode(
        "DEMAND_OPPORTUNITY",
        "Family-formation demand and opportunity state",
        "demography",
        ("demand/opportunity", "partnering and opportunity"),
        (),
        ("ASFR",),
        "explicit_nonbiological_input",
        "requires_external_measurement",
    ),
    CausalNode(
        "TEMPO",
        "Childbearing timing / tempo state",
        "demography",
        ("tempo", "birth timing"),
        (),
        ("ASFR",),
        "explicit_nonbiological_input",
        "requires_external_measurement",
    ),
    CausalNode(
        "ART_LIVE_BIRTH_DELIVERY",
        "ART and conception-to-live-birth delivery state",
        "demography",
        ("ART/live-birth delivery", "fertility treatment delivery"),
        (),
        ("ASFR",),
        "explicit_nonbiological_input",
        "requires_external_measurement",
    ),
    CausalNode(
        "ASFR",
        "Age-specific fertility rate",
        "demography",
        ("age-specific fertility",),
        (
            "COUPLE_FECUNDABILITY",
            "DEMAND_OPPORTUNITY",
            "TEMPO",
            "ART_LIVE_BIRTH_DELIVERY",
        ),
        ("TFR",),
        "observed_outcome",
        "observed_wpp_anchor",
    ),
    CausalNode(
        "TFR",
        "Total fertility rate = 5 × sum(ASFR) / 1000",
        "demography",
        ("total fertility",),
        ("ASFR",),
        (),
        "derived_outcome",
        "observed_wpp_anchor",
    ),
)

_BY_ID = {node.id: node for node in CAUSAL_NODES}


def _build_aliases() -> dict[str, str]:
    """Build a collision-free semantic alias index at import time."""
    aliases: dict[str, str] = {}
    for node in CAUSAL_NODES:
        for alias in (node.id, *node.legacy_aliases):
            key = alias.lower()
            previous = aliases.get(key)
            if previous is not None and previous != node.id:
                raise RuntimeError(
                    f"causal alias {alias!r} is assigned to both {previous} and {node.id}"
                )
            aliases[key] = node.id
    return aliases


_ALIASES = _build_aliases()


def get_causal_node(node_id: str) -> CausalNode:
    """Return a node by canonical ID or a documented legacy alias."""
    if not isinstance(node_id, str) or not node_id.strip():
        raise KeyError("causal node ID must be a non-empty string")
    requested = node_id.strip()
    if len(requested) == 1 and requested.upper() in {"A", "B", "C", "D", "E", "F", "T"}:
        raise KeyError(
            "bare legacy pathway letters are ambiguous; resolve them with "
            "berm.biology.legacy_compat using a namespace"
        )
    canonical = _ALIASES.get(requested.lower())
    if canonical is None:
        raise KeyError(f"unknown causal node {node_id!r}")
    return _BY_ID[canonical]


def canonical_node_id(node_id: str) -> str:
    """Resolve a legacy label to the stable semantic node ID."""
    return get_causal_node(node_id).id


def validate_causal_nodes(node_ids: Iterable[str]) -> tuple[str, ...]:
    """Resolve a sequence and fail loudly for unknown or duplicated nodes."""
    resolved = tuple(canonical_node_id(node) for node in node_ids)
    duplicates = sorted({node for node in resolved if resolved.count(node) > 1})
    if duplicates:
        raise ValueError(f"duplicate causal node IDs: {', '.join(duplicates)}")
    return resolved


__all__ = [
    "CAUSAL_NODES",
    "CausalNode",
    "canonical_node_id",
    "get_causal_node",
    "validate_causal_nodes",
]
