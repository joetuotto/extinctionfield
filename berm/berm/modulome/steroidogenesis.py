"""Measured calcium/redox reserve and local steroidogenic output structure.

The Lindgren 2025 tensor perturbation remains upstream of the conditional
BERM response operator.  This module retains the biological quantities that
component experiments constrain: compartment, hormone stimulation, free
glutathione reserve and output per viable cell.  It supplies no kinetics,
geometry-to-tissue coefficients or hormone-to-fertility conversion.

Basal and stimulated outputs are separate endpoints.  Chen's preserved
LH-stimulated progesterone after reserve depletion without oxidant challenge
is not relabelled a basal result; Midzak's opposing basal/stimulated responses
are not collapsed into one direction.  A measured reserve loss is kept apart
from observation/attribution and cannot be inferred from a null output alone.
"""

from __future__ import annotations

from dataclasses import dataclass

from berm.modulome._common import STRUCTURAL_ONLY, finite, nonempty, nonnegative, normalise_ids
from berm.modulome.state import CellStateVector, GlutathionePool, STATE_MEASUREMENT_VOCABULARY


STEROIDOGENESIS_VERSION = "steroidogenesis-structure-v1"
STIMULATION_MODES = frozenset({"basal", "LH_stimulated", "hCG_stimulated", "cAMP_stimulated", "other_stimulated"})
EVIDENCE_KINDS = frozenset({"field_experiment", "component_experiment", "illustrative"})


@dataclass(frozen=True)
class SteroidogenicContext:
    """Matched system and hormonal/challenge protocol for one output assay.

    Unknown stimulus dose is None, never zero. ``protocol_id`` identifies the
    stated timing and stimulation procedure; no dose-response law is fitted.
    ``oxidant_challenge_id=None`` explicitly means no added oxidant challenge.
    """

    system: str
    stimulation_mode: str
    protocol_id: str
    oxidant_challenge_id: str | None
    agonist_dose: float | None = None
    agonist_units: str | None = None

    def __post_init__(self) -> None:
        for name in ("system", "protocol_id"):
            object.__setattr__(self, name, nonempty(name, getattr(self, name)))
        if self.stimulation_mode not in STIMULATION_MODES:
            raise ValueError("stimulation_mode must name basal or a registered stimulated condition")
        if self.oxidant_challenge_id is not None:
            object.__setattr__(self, "oxidant_challenge_id", nonempty("oxidant_challenge_id", self.oxidant_challenge_id))
        if (self.agonist_dose is None) != (self.agonist_units is None):
            raise ValueError("agonist dose and units must be supplied together or both left open")
        if self.agonist_dose is not None:
            if self.stimulation_mode == "basal":
                raise ValueError("a basal context cannot declare an agonist dose")
            object.__setattr__(self, "agonist_dose", nonnegative("agonist_dose", self.agonist_dose))
            object.__setattr__(self, "agonist_units", nonempty("agonist_units", self.agonist_units))

    def as_dict(self) -> dict:
        return {"system": self.system, "stimulationMode": self.stimulation_mode,
                "protocolId": self.protocol_id, "oxidantChallengeId": self.oxidant_challenge_id,
                "agonistDose": self.agonist_dose, "agonistUnits": self.agonist_units}


@dataclass(frozen=True)
class SteroidogenesisObservation:
    """A local output observation, distinct from a serum hormone concentration.

    ``output_per_viable_cell`` retains a reported cell-normalized endpoint;
    it is not inferred from GSH, calcium or a field protocol. ``output_units``
    names the amount and assay-time normalization, for example
    ``pmol/(10^6 viable cells*h)``.  A missing measurement stays None.
    ``viable_cell_count`` remains separate and is not multiplied into output.
    """

    observation_id: str
    context: SteroidogenicContext
    hormone: str
    output_per_viable_cell: float | None
    output_units: str
    compartment: str
    source_ids: tuple[str, ...]
    evidence_kind: str
    study_design: str
    cell_state: CellStateVector | None = None
    viable_cell_count: float | None = None

    def __post_init__(self) -> None:
        for name in ("observation_id", "hormone", "output_units", "compartment", "study_design"):
            object.__setattr__(self, name, nonempty(name, getattr(self, name)))
        if "viable cell" not in self.output_units:
            raise ValueError("output_units must explicitly include viable-cell normalization, not a serum concentration")
        if not isinstance(self.context, SteroidogenicContext):
            raise TypeError("context must be a SteroidogenicContext")
        if self.evidence_kind not in EVIDENCE_KINDS:
            raise ValueError("evidence_kind must distinguish field, component or illustrative observations")
        ids = normalise_ids(self.source_ids, "source_id")
        if not ids:
            raise ValueError("source_ids must identify the observation or illustration")
        object.__setattr__(self, "source_ids", ids)
        if self.output_per_viable_cell is not None:
            object.__setattr__(self, "output_per_viable_cell", nonnegative("output_per_viable_cell", self.output_per_viable_cell))
        if self.viable_cell_count is not None:
            count = nonnegative("viable_cell_count", self.viable_cell_count)
            if count == 0:
                raise ValueError("cell-normalized output requires a positive viable-cell count when supplied")
            object.__setattr__(self, "viable_cell_count", count)
        if self.cell_state is not None and not isinstance(self.cell_state, CellStateVector):
            raise TypeError("cell_state must be a CellStateVector")
        if self.pool is not None and (self.evidence_kind == "illustrative") != (self.pool.basis == "illustrative"):
            raise ValueError("illustrative and measured pool/output records must remain separate")

    @property
    def pool(self) -> GlutathionePool | None:
        return None if self.cell_state is None else self.cell_state.glutathione_pool


def compare_steroidogenic_observations(
    reference: SteroidogenesisObservation,
    target: SteroidogenesisObservation,
    *,
    comparison_id: str,
    output_margin: float,
    comparison_source_ids: tuple[str, ...],
) -> dict:
    """Describe measured reserve/output changes within one matched context.

    ``output_margin`` is a caller-declared absolute assay margin in output
    units, not a significance test, hidden-damage threshold or fitted effect.
    A reserve comparison additionally requires matched absolute units and
    compartment. Study design and sources remain visible on both arms.
    """
    if not isinstance(reference, SteroidogenesisObservation) or not isinstance(target, SteroidogenesisObservation):
        raise TypeError("reference and target must be SteroidogenesisObservation records")
    comparison_id = nonempty("comparison_id", comparison_id)
    output_margin = nonnegative("output_margin", output_margin)
    provenance = normalise_ids(comparison_source_ids, "comparison_source_id")
    if not provenance:
        raise ValueError("comparison_source_ids must identify matching and assay-margin provenance")
    if reference.context != target.context:
        raise ValueError("system, hormonal stimulation and challenge context must match; compare basal and stimulated arms separately")
    if (reference.hormone, reference.output_units, reference.compartment) != (target.hormone, target.output_units, target.compartment):
        raise ValueError("hormone, output units and compartment must match")
    if (reference.evidence_kind == "illustrative") != (target.evidence_kind == "illustrative"):
        raise ValueError("measured and illustrative observations cannot be compared as one assay")
    output_change = None
    if reference.output_per_viable_cell is not None and target.output_per_viable_cell is not None:
        output_change = finite("output change", target.output_per_viable_cell - reference.output_per_viable_cell)
    within_margin = None if output_change is None else abs(output_change) <= output_margin
    pool_change = None
    if reference.pool is not None and target.pool is not None:
        if (reference.pool.units, reference.pool.compartment, reference.pool.basis) != (target.pool.units, target.pool.compartment, target.pool.basis):
            raise ValueError("pool units, compartment and measurement basis must match")
        pool_change = finite("pool change", target.pool.equivalent_pool - reference.pool.equivalent_pool)
    if pool_change is None:
        reserve_status = "reserve_not_measured"
    elif pool_change < 0:
        reserve_status = "lower_measured_free_pool"
    else:
        reserve_status = "no_measured_free_pool_reduction"
    return {
        "comparisonId": comparison_id,
        "context": reference.context.as_dict(),
        "hormone": reference.hormone,
        "outputChangePerViableCell": output_change,
        "outputUnits": reference.output_units,
        "withinDeclaredOutputMargin": within_margin,
        "outputMargin": output_margin,
        "freePoolChange": pool_change,
        "freePoolUnits": None if reference.pool is None or target.pool is None else reference.pool.units,
        "reserveStatus": reserve_status,
        "reserveLossWithOutputWithinMargin": pool_change is not None and pool_change < 0 and within_margin is True,
        "damageInference": "not_inferred",
        "attribution": "separate_question_not_inferred_from_a_null_output",
        "interpretationKind": "descriptive_comparison",
        "reference": {"id": reference.observation_id, "evidenceKind": reference.evidence_kind,
                      "studyDesign": reference.study_design, "sourceIds": list(reference.source_ids)},
        "target": {"id": target.observation_id, "evidenceKind": target.evidence_kind,
                   "studyDesign": target.study_design, "sourceIds": list(target.source_ids)},
        "comparisonSourceIds": list(provenance),
        "glutathioneSources": list(dict.fromkeys(
            (*(reference.pool.source_ids if reference.pool else ()), *(target.pool.source_ids if target.pool else ()))
        )),
        "calibrationStatus": STRUCTURAL_ONLY,
        "fertilityTransfer": None,
    }


def steroidogenesis_structure() -> dict:
    """Export the implemented structure and conditional scope, without a fit."""
    return {
        "version": STEROIDOGENESIS_VERSION,
        "stage": "structure_and_conditional_directions",
        "modelOwner": "BERM",
        "calibrationStatus": STRUCTURAL_ONLY,
        "geometry": "delta_g = kappa(A0 tensor a + a tensor A0 + a tensor a)",
        "bridge": "conditional retarded tissue response; physical scale and tissue kernel remain open",
        "glutathioneMassBalance": {
            "formula": "G_T = GSH + 2*GSSG",
            "pool": "free glutathione equivalents in a named compartment",
            "oxidation": "2 GSH -> GSSG conserves G_T",
            "ratio": "GSH/GSSG does not determine the absolute pool or synthesis flux",
        },
        "measurementVocabulary": dict(STATE_MEASUREMENT_VOCABULARY),
        "pathways": [
            {"id": "calcium-transcription", "nodes": ["local calcium signal", "CaMKI", "NUR77", "StAR", "mitochondrial cholesterol transfer", "steroidogenesis"]},
            {"id": "clock-transcription", "nodes": ["RORalpha", "BMAL1", "StAR", "steroidogenesis"]},
            {"id": "cholesterol-supply", "nodes": ["autophagy/lipophagy", "cholesterol availability", "StAR/CYP11A1 substrate access", "steroidogenesis"]},
            {"id": "reserve-challenge", "nodes": ["free glutathione pool", "named oxidant challenge", "stimulated steroid output"]},
        ],
        "conditionalDirections": [
            {"id": "chen2010", "context": "MA-10; LH-stimulated progesterone",
             "withoutAddedOxidant": "preserved after glutathione depletion",
             "withAddedOxidant": "greater output impairment after glutathione depletion"},
            {"id": "midzak2007", "context": "primary rat Leydig cells; myxothiazol",
             "basal": "increased testosterone output", "LHStimulated": "decreased testosterone output"},
        ],
        "empiricalBoundaries": [
            "CaMKI and CaMKII remain distinct",
            "gene interventions, field protocols and composed syntheses remain distinct evidence types",
            "Miao TM3 reserve measurements and Chen MA-10 challenge assays are separate experimental systems",
            "basal and hormonally stimulated outputs are separate readouts",
            "pool, ratio, current ROS and damage are separate quantities",
            "normal output alone does not establish hidden injury or depleted reserve",
            "cholesterol-supply and maintenance consequences of one autophagy intervention share a causal input",
        ],
        "openParameters": {"tissueResponseKernel": None, "physicalCouplingScale": None,
                           "steroidogenicKinetics": None, "humanDoseResponse": None,
                           "hormoneToReproductiveCapacity": None},
        "outputMappingPolicy": {
            "currentImplementation": "retain measurements and matched-context comparisons",
            "targetNode": "MALE_STEROIDOGENESIS",
            "existingCapacityGate": "steroidogenic_support",
            "newCapacityMultiplier": None,
            "doubleCountingRule": "When androgen-effective capacity already includes testosterone supply, steroidogenic_support stays neutral; no duplicate production multiplier.",
            "historicalForecastsChanged": False,
        },
    }


__all__ = ["STEROIDOGENESIS_VERSION", "SteroidogenicContext", "SteroidogenesisObservation",
           "compare_steroidogenic_observations", "steroidogenesis_structure"]
