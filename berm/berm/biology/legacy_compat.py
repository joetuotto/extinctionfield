"""Namespace-qualified semantic bridge for legacy BERM routes.

The v16/v17 implementations are retained as locked comparison routes.  Their
numeric functions must not import, call, or be changed by this module.  This
file only records how a *named legacy artifact* is interpreted in the stable
FieldState--ASFR causal registry.

Bare pathway letters are deliberately unsupported here: ``C`` and ``F`` have
different meanings in different historical artifacts.  A caller must name the
source namespace before it can obtain a semantic interpretation.
"""

from __future__ import annotations

from dataclasses import dataclass

from berm.biology.causal_registry import validate_causal_nodes


LEGACY_NUMERICS_UNCHANGED = "LEGACY_NUMERICS_UNCHANGED"
STRUCTURAL_ONLY = "STRUCTURAL_ONLY"
LEGACY_DIAGNOSTIC = "LEGACY_DIAGNOSTIC"
DEMOGRAPHIC_CONTEXT_ONLY = "DEMOGRAPHIC_CONTEXT_ONLY"

_INTERPRETATION_STATUSES = frozenset(
    {STRUCTURAL_ONLY, LEGACY_DIAGNOSTIC, DEMOGRAPHIC_CONTEXT_ONLY}
)


def _nonempty(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


@dataclass(frozen=True)
class LegacyPathwayBinding:
    """A lossless semantic annotation of one legacy route artifact.

    ``canonical_nodes`` state where the artifact belongs in the v2 graph; they
    are not a request to re-use its legacy coefficient.  Every binding carries
    an interpretation status, so downstream UI/export code cannot mistake a
    v16/v17 diagnostic term for a calibrated FieldState endpoint mapping.
    """

    namespace: str
    legacy_key: str
    canonical_nodes: tuple[str, ...]
    interpretation_status: str
    note: str
    numeric_status: str = LEGACY_NUMERICS_UNCHANGED

    def __post_init__(self) -> None:
        object.__setattr__(self, "namespace", _nonempty("namespace", self.namespace))
        object.__setattr__(self, "legacy_key", _nonempty("legacy_key", self.legacy_key))
        object.__setattr__(self, "note", _nonempty("note", self.note))
        object.__setattr__(
            self, "canonical_nodes", validate_causal_nodes(tuple(self.canonical_nodes))
        )
        if not self.canonical_nodes:
            raise ValueError("canonical_nodes must not be empty")
        if self.interpretation_status not in _INTERPRETATION_STATUSES:
            raise ValueError(
                "interpretation_status must be STRUCTURAL_ONLY, LEGACY_DIAGNOSTIC, "
                "or DEMOGRAPHIC_CONTEXT_ONLY"
            )
        if self.numeric_status != LEGACY_NUMERICS_UNCHANGED:
            raise ValueError("numeric_status must be LEGACY_NUMERICS_UNCHANGED")

    def as_dict(self) -> dict[str, str | tuple[str, ...]]:
        """Return mapping metadata without evaluating or transforming a value."""
        return {
            "namespace": self.namespace,
            "legacy_key": self.legacy_key,
            "canonical_nodes": self.canonical_nodes,
            "interpretation_status": self.interpretation_status,
            "numeric_status": self.numeric_status,
            "note": self.note,
        }


# These namespace labels identify the legacy artifact, rather than the current
# public route.  They make C/F collisions explicit and leave all original
# arithmetic in its owning v16/v17 module.
LEGACY_PATHWAY_BINDINGS: tuple[LegacyPathwayBinding, ...] = (
    # v17 A--F attribution decomposition in berm.biology.pathways
    LegacyPathwayBinding(
        "berm.biology.pathways.v17", "A", ("A_VGCC_ROS",), STRUCTURAL_ONLY,
        "Legacy VGIC/Ca2+/ROS attribution term; no legacy weight is a v2 coefficient.",
    ),
    LegacyPathwayBinding(
        "berm.biology.pathways.v17", "B", ("B_RPM_CRY",), STRUCTURAL_ONLY,
        "Legacy radical-pair/cryptochrome attribution term.",
    ),
    LegacyPathwayBinding(
        "berm.biology.pathways.v17", "C", ("BARRIER_BBB",), LEGACY_DIAGNOSTIC,
        "v17 pathway C is the BBB/HPA attribution term, not the v16 pineal label.",
    ),
    LegacyPathwayBinding(
        "berm.biology.pathways.v17", "D", ("HPA_HPG",), STRUCTURAL_ONLY,
        "Legacy HPA-to-HPG attribution term.",
    ),
    LegacyPathwayBinding(
        "berm.biology.pathways.v17", "E", ("MICROBIOME_OT",), LEGACY_DIAGNOSTIC,
        "Legacy dysbiosis/L. reuteri-oxytocin diagnostic term.",
    ),
    LegacyPathwayBinding(
        "berm.biology.pathways.v17", "F", ("BARRIER_BBB",), LEGACY_DIAGNOSTIC,
        "v17 pathway F is the BBB chemical-transport multiplier, not the v16 mTOR label.",
    ),
    # Labels embedded in v16's intervention catalogue use a different alphabet.
    LegacyPathwayBinding(
        "berm.v16.intervention_catalogue", "A", ("A_VGCC_ROS",), STRUCTURAL_ONLY,
        "v16 catalogue A denotes VGIC.",
    ),
    LegacyPathwayBinding(
        "berm.v16.intervention_catalogue", "C", ("MELATONIN_REDOX",), LEGACY_DIAGNOSTIC,
        "v16 catalogue C denotes pineal/melatonin, not v17 BBB pathway C.",
    ),
    LegacyPathwayBinding(
        "berm.v16.intervention_catalogue", "D", ("HPA_HPG",), STRUCTURAL_ONLY,
        "v16 catalogue D denotes HPA-to-HPG.",
    ),
    LegacyPathwayBinding(
        "berm.v16.intervention_catalogue", "F", ("VMEM_MTOR",), LEGACY_DIAGNOSTIC,
        "v16 catalogue F denotes mTOR/AMPK, not v17 BBB pathway F.",
    ),
    # Named diagnostics returned by v16_country_tfr.
    LegacyPathwayBinding(
        "berm.v16.country_report", "dysbiosis_modifier", ("MICROBIOME_OT",),
        LEGACY_DIAGNOSTIC,
        "Legacy country scalar; retain as a diagnostic rather than a v2 organ increment.",
    ),
    LegacyPathwayBinding(
        "berm.v16.country_report", "bbb_modifier", ("BARRIER_BBB",),
        LEGACY_DIAGNOSTIC,
        "Legacy BBB modifier; it must not be reused as a BTB or placental multiplier.",
    ),
    LegacyPathwayBinding(
        "berm.v16.country_report", "epigenetic_factor", ("BIOELECTRIC_DEVELOPMENT",),
        LEGACY_DIAGNOSTIC,
        "Legacy developmental-memory scalar awaiting organ/cohort endpoint calibration.",
    ),
    LegacyPathwayBinding(
        "berm.v16.country_report", "cry_effect", ("B_RPM_CRY",), STRUCTURAL_ONLY,
        "Legacy CRY term belongs to the clock/redox mediator state.",
    ),
    LegacyPathwayBinding(
        "berm.v16.country_report", "melatonin_suppression", ("MELATONIN_REDOX",),
        LEGACY_DIAGNOSTIC,
        "Legacy melatonin scalar is a mediator-state annotation, not an ASFR coefficient.",
    ),
    LegacyPathwayBinding(
        "berm.v16.country_report", "sperm_ca2_fecundity", ("A_VGCC_ROS", "MALE_SPERM"),
        STRUCTURAL_ONLY,
        "Legacy Ca2+ sperm term spans an upstream mechanism and male endpoint.",
    ),
    LegacyPathwayBinding(
        "berm.v16.country_report", "ovulation_vgic", ("A_VGCC_ROS", "OVULATION_CLOCK"),
        STRUCTURAL_ONLY,
        "Legacy VGIC ovulation term spans an upstream mechanism and timing gate.",
    ),
    LegacyPathwayBinding(
        "berm.v16.country_report", "male_bio_cap", ("MALE_GERMLINE_RESERVE", "MALE_STEROIDOGENESIS", "MALE_SPERM"),
        LEGACY_DIAGNOSTIC,
        "Legacy aggregate male capacity is decomposed into separate v2 components.",
    ),
    LegacyPathwayBinding(
        "berm.v16.country_report", "f_male", ("MALE_SPERM",), LEGACY_DIAGNOSTIC,
        "Legacy male aggregate; no population mean is substituted for pair-level capacity.",
    ),
    LegacyPathwayBinding(
        "berm.v16.country_report", "f_female", ("MELATONIN_REDOX", "OVULATION_CLOCK"),
        LEGACY_DIAGNOSTIC,
        "Legacy female aggregate is split into mediator and ovulation components.",
    ),
    LegacyPathwayBinding(
        "berm.v16.country_report", "f_couple", ("COUPLE_FECUNDABILITY",),
        LEGACY_DIAGNOSTIC,
        "Legacy country scalar maps to the v2 pair-level bridge only semantically.",
    ),
    LegacyPathwayBinding(
        "berm.v16.country_report", "predicted_tfr", ("TFR",),
        DEMOGRAPHIC_CONTEXT_ONLY,
        "Locked legacy output; not a FieldState--ASFR v2 prediction.",
    ),
    # Independent legacy public entry points.
    LegacyPathwayBinding(
        "berm.tfr.legacy", "two_channel_exposure", ("FIELDSTATE_SELECTED_PROXY",),
        LEGACY_DIAGNOSTIC,
        "Scalar Lindgren timing proxy; it is not a physical local FieldState.",
    ),
    LegacyPathwayBinding(
        "berm.tfr.legacy", "sperm_state", ("MALE_SPERM",), LEGACY_DIAGNOSTIC,
        "Legacy sperm cascade output; retain its numeric path unchanged.",
    ),
    LegacyPathwayBinding(
        "berm.tfr.legacy", "cry", ("B_RPM_CRY",), STRUCTURAL_ONLY,
        "Legacy CRY output is a clock/redox mediator annotation.",
    ),
    LegacyPathwayBinding(
        "berm.tfr.legacy", "bio_capacity", ("COUPLE_FECUNDABILITY",),
        LEGACY_DIAGNOSTIC,
        "Legacy aggregate bio-capacity is not a pair-distribution estimate.",
    ),
    LegacyPathwayBinding(
        "berm.tfr.legacy", "tfr_predicted", ("TFR",), DEMOGRAPHIC_CONTEXT_ONLY,
        "Locked legacy output; not a FieldState--ASFR v2 prediction.",
    ),
    LegacyPathwayBinding(
        "berm.model.v17_community", "combined_emf", ("FIELDSTATE_SELECTED_PROXY",),
        LEGACY_DIAGNOSTIC,
        "National scalar technology timing proxy, not a local physical FieldState.",
    ),
    LegacyPathwayBinding(
        "berm.model.v17_community", "bio_sigmoid_tfr", ("TFR",),
        DEMOGRAPHIC_CONTEXT_ONLY,
        "Locked community-sigmoid output retained only as a comparison route.",
    ),
    LegacyPathwayBinding(
        "berm.model.v17_community", "predicted_tfr", ("TFR",),
        DEMOGRAPHIC_CONTEXT_ONLY,
        "Locked v17 output; not a FieldState--ASFR v2 prediction.",
    ),
)


def _index_bindings() -> dict[tuple[str, str], LegacyPathwayBinding]:
    index: dict[tuple[str, str], LegacyPathwayBinding] = {}
    for binding in LEGACY_PATHWAY_BINDINGS:
        key = (binding.namespace.lower(), binding.legacy_key.lower())
        if key in index:
            raise RuntimeError(
                "duplicate legacy binding for "
                f"{binding.namespace}:{binding.legacy_key}"
            )
        index[key] = binding
    return index


_BINDINGS_BY_KEY = _index_bindings()


def resolve_legacy_binding(namespace: str, legacy_key: str) -> LegacyPathwayBinding:
    """Resolve a legacy artifact only within its declared source namespace."""
    normal_namespace = _nonempty("namespace", namespace)
    normal_key = _nonempty("legacy_key", legacy_key)
    binding = _BINDINGS_BY_KEY.get((normal_namespace.lower(), normal_key.lower()))
    if binding is None:
        raise KeyError(
            f"no semantic binding for legacy artifact {normal_namespace}:{normal_key}"
        )
    return binding


def bindings_for_namespace(namespace: str) -> tuple[LegacyPathwayBinding, ...]:
    """List declared mappings for one legacy artifact namespace."""
    normal_namespace = _nonempty("namespace", namespace)
    return tuple(
        binding
        for binding in LEGACY_PATHWAY_BINDINGS
        if binding.namespace.lower() == normal_namespace.lower()
    )


__all__ = [
    "DEMOGRAPHIC_CONTEXT_ONLY",
    "LEGACY_DIAGNOSTIC",
    "LEGACY_NUMERICS_UNCHANGED",
    "LEGACY_PATHWAY_BINDINGS",
    "STRUCTURAL_ONLY",
    "LegacyPathwayBinding",
    "bindings_for_namespace",
    "resolve_legacy_binding",
]
