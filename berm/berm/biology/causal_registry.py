"""Canonical causal-node registry for the BERM model.

The historical A--F letters are retained only through the namespace-qualified
compatibility adapter.  Several layers of the repository assigned different
meanings to the same letter (notably ``C`` and ``F``), so a bare letter is not
a stable semantic identifier.  New biology and evidence are therefore
attached to stable semantic node IDs, not to a display letter.

This registry is structural: it identifies the causal graph and data contracts.
It does not assert a universal effect size or activate a TFR coefficient.

``calibration_status`` is deliberately a *coefficient-resolution* label, not
an evidence-admission label.  A node marked ``structural_only`` can therefore
still have active physics, mechanism, animal, human-endpoint, sentinel or
ecological evidence constraining its topology, sign, lag family, susceptibility
or FieldState signature.  ``requires_*`` identifies what would narrow a
node-specific numerical endpoint mapping; it must never be read as “no
evidence” or “zero effect”.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable


@dataclass(frozen=True)
class CausalNode:
    """One stable node in the BERM causal graph.

    ``calibration_status`` says only how directly a numerical mapping for this
    node has been resolved.  It is intentionally separate from the evidence
    registry and its active topology/direction/lag/transfer constraints.
    """

    id: str
    label: str
    layer: str
    legacy_aliases: tuple[str, ...]
    parents: tuple[str, ...]
    children: tuple[str, ...]
    prediction_role: str
    calibration_status: str


# Node IDs intentionally encode meaning rather than UI order.  Measurement
# observations and the legacy timing proxy enter only through BERM's
# conditional response operator.  They are not causal roots of the model;
# Lindgren's 2025 ansatz is the separate theory premise.
# Feedback (e.g. redox/Ca) is represented within a biological state model
# rather than by ambiguous letter aliases.
CAUSAL_NODES: tuple[CausalNode, ...] = (
    CausalNode(
        "TECHNOLOGY_TIMING_PROXY",
        "National technology-timing proxy (legacy v17 comparison)",
        "physics",
        (
            "FIELDSTATE_SELECTED_PROXY",
            "legacy chi",
            "ambient + chi(ambient) * personal",
        ),
        (),
        ("BERM_L2_BRIDGE",),
        "diagnostic_input",
        "proxy_only",
    ),
    CausalNode(
        "FIELDSTATE_VECTOR",
        "FieldState vector/phase observation and organ-transfer estimate",
        "physics",
        ("Lindgren vector state",),
        (),
        ("BERM_L2_BRIDGE",),
        "diagnostic_input",
        "requires_matched_measurement",
    ),
    CausalNode(
        "FIELDSTATE_ENVELOPE",
        "Measured envelope/beat spectral overlap",
        "physics",
        ("GME", "R42"),
        (),
        ("BERM_L2_BRIDGE",),
        "diagnostic_input",
        "requires_psd_measurement",
    ),
    CausalNode(
        "STATIC_TRIBO_INTERFACE",
        "Static triboelectric material–skin / organism-interface state",
        "physics",
        ("static textile interface", "triboelectric interface", "0 Hz interface state"),
        (),
        ("BERM_L2_BRIDGE",),
        "diagnostic_input",
        "requires_matched_measurement",
    ),
    CausalNode(
        "FIELDSTATE_LOW_FREQUENCY_ELECTRIC",
        "Measured low-frequency electric-field waveform and polarity state",
        "physics",
        ("ELF electric field", "AC/DC electric field", "electric-field waveform"),
        (),
        ("BERM_L2_BRIDGE",),
        "diagnostic_input",
        "requires_matched_measurement",
    ),
    CausalNode(
        "LINDGREN_METRIC_DRIVE",
        "Lindgren 2025 metric perturbation and quadratic mixing drive",
        "physics",
        (
            "g = eta + kappa A tensor A",
            "delta g",
            "chi_geo",
            "quadratic envelope mixing",
        ),
        (),
        ("BERM_L2_BRIDGE",),
        "theory_input",
        "structural_only",
    ),
    CausalNode(
        "BERM_L2_BRIDGE",
        "Conditional metric-to-observable response operator",
        "physics",
        (
            "geometry-to-biology operator",
            "L2 response operator",
            "conditional response kernel",
        ),
        (
            "LINDGREN_METRIC_DRIVE",
            "TECHNOLOGY_TIMING_PROXY",
            "FIELDSTATE_VECTOR",
            "FIELDSTATE_ENVELOPE",
            "STATIC_TRIBO_INTERFACE",
            "FIELDSTATE_LOW_FREQUENCY_ELECTRIC",
        ),
        (
            "A_VGCC_ROS",
            "B_RPM_CRY",
            "VMEM_MTOR",
            "HPA_HPG",
            "MICROBIOME_OT",
            "IF_MITOTIC_DISRUPTION",
            "GPCR_ADENOSINE",
            "VAGUS_ANTIINFLAMMATORY",
            "ANDROGEN_RECEPTOR_SIGNAL",
            "ECOLOGICAL_ENCOUNTER",
        ),
        "bridge_proposition",
        "requires_endpoint_calibration",
    ),
    CausalNode(
        "A_VGCC_ROS",
        "Vmem/VGCC → Ca2+ → mitochondrial ROS",
        "mechanism",
        ("VGIC", "Ca2+/ROS"),
        ("BERM_L2_BRIDGE",),
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
        ("BERM_L2_BRIDGE",),
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
        (
            "A_VGCC_ROS",
            "BERM_L2_BRIDGE",
        ),
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
            "BERM_L2_BRIDGE",
            "GPCR_ADENOSINE",
            "VAGUS_ANTIINFLAMMATORY",
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
        ("BERM_L2_BRIDGE", "GPCR_ADENOSINE", "VAGUS_ANTIINFLAMMATORY"),
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
        ("A_VGCC_ROS", "ANDROGEN_RECEPTOR_SIGNAL"),
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
            "ANDROGEN_RECEPTOR_SIGNAL",
            "IF_MITOTIC_DISRUPTION",
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
        ("BARRIER_BTB", "VMEM_MTOR", "BIOELECTRIC_DEVELOPMENT", "IF_MITOTIC_DISRUPTION"),
        ("MALE_SPERM",),
        "capacity_component",
        "requires_endpoint_calibration",
    ),
    CausalNode(
        "MALE_STEROIDOGENESIS",
        "Leydig/HPG androgen production support",
        "reproductive",
        ("Leydig",),
        ("HPA_HPG", "MELATONIN_REDOX", "MICROBIOME_OT"),
        ("MALE_SPERM", "ANDROGEN_BINDING_AVAILABILITY"),
        "capacity_component",
        "requires_endpoint_calibration",
    ),
    CausalNode(
        "ANDROGEN_BINDING_AVAILABILITY",
        "SHBG/albumin binding and free or intratesticular androgen availability",
        "reproductive",
        ("free testosterone", "SHBG", "albumin", "androgen availability"),
        ("MALE_STEROIDOGENESIS",),
        ("ANDROGEN_RECEPTOR_SIGNAL",),
        "capacity_component",
        "requires_matched_measurement",
    ),
    CausalNode(
        "ANDROGEN_RECEPTOR_SIGNAL",
        "AR/ZIP9 occupancy and post-receptor androgen-use capacity",
        "reproductive",
        (
            "androgen effective capacity",
            "AEC",
            "androgen receptor",
            "ZIP9",
            "post-receptor signalling",
        ),
        ("ANDROGEN_BINDING_AVAILABILITY", "BERM_L2_BRIDGE"),
        ("MALE_SPERM", "BARRIER_BTB"),
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
        ("A_VGCC_ROS", "B_RPM_CRY", "MELATONIN_REDOX", "OVARIAN_RESERVE", "IF_MITOTIC_DISRUPTION"),
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
    # ─── v19 nodes: three-channel model extensions ─────────────
    CausalNode(
        "IF_MITOTIC_DISRUPTION",
        "Intermediate-frequency field disruption of cell division",
        "mechanism",
        ("TTFields mechanism", "mitotic spindle disruption", "IF channel"),
        ("BERM_L2_BRIDGE",),
        ("MALE_SPERM", "MALE_GERMLINE_RESERVE", "OOCYTE_REDOX"),
        "organ_state_input",
        "structural_only",
    ),
    CausalNode(
        "GPCR_ADENOSINE",
        "PEMF-validated adenosine A2A/A3 receptor modulation",
        "mechanism",
        ("adenosine receptor", "GPCR modulation", "PEMF mechanism"),
        ("BERM_L2_BRIDGE",),
        ("HPA_HPG", "MICROBIOME_OT"),
        "organ_state_input",
        "structural_only",
    ),
    CausalNode(
        "VAGUS_ANTIINFLAMMATORY",
        "Vagus nerve cholinergic anti-inflammatory pathway state",
        "mechanism",
        ("vagus nerve", "cholinergic anti-inflammatory", "VNS mechanism"),
        ("BERM_L2_BRIDGE",),
        ("HPA_HPG", "MICROBIOME_OT"),
        "organ_state_input",
        "structural_only",
    ),
    CausalNode(
        "ECOLOGICAL_ENCOUNTER",
        "Species-specific field encounter, sensing, physiology and dispersal state",
        "ecology",
        ("electroecology", "host–vegetation encounter", "electrostatic attachment", "field physiology"),
        ("BERM_L2_BRIDGE",),
        ("ECOLOGICAL_SELECTION",),
        "cross_species_mechanism",
        "requires_matched_ecological_measurement",
    ),
    CausalNode(
        "ECOLOGICAL_SELECTION",
        "Species-specific relative fitness and ecological-sorting state",
        "ecology",
        ("natural selection", "FieldState selection", "relative abundance"),
        ("ECOLOGICAL_ENCOUNTER",),
        ("ECOLOGICAL_TRAIT_STATE",),
        "cross_species_outcome",
        "requires_multigeneration_ecological_panel",
    ),
    CausalNode(
        "ECOLOGICAL_TRAIT_STATE",
        "Time-indexed heritable trait distribution under FieldState-dependent selection",
        "ecology",
        ("evolutionary trait distribution", "heritable FieldState response"),
        ("ECOLOGICAL_SELECTION",),
        (),
        "cross_species_outcome",
        "requires_multigeneration_genetic_or_common_garden_panel",
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
