"""Discovery-first evidence-constrained hindcast architecture for BERM v2.

This module makes the information already present in the BERM evidence base
*active* before a perfect, direct human panel exists.  It keeps four distinct
uses of evidence separate:

1. linked studies activate a causal topology and susceptibility dimensions;
2. convergent studies constrain response direction, memory family and lag
   family;
3. direct, partial-local and matched-local measurements determine how narrow a
   quantitative posterior can become; and
4. historical ASFR/TFR data are posterior-predictive signatures only.  They
   never select an upstream biological parameter or a lag.

The result is deliberately not an EMF-to-TFR regression.  It is a compact
specification for the Bayesian model that BERM's Lindgren/FieldState premises
imply: a latent mobility-weighted local FieldState, species/organ transfer,
reversible/persistent memory, endpoint likelihoods, and finally demographic
posterior-predictive evaluation.
"""

from __future__ import annotations

from dataclasses import dataclass
import math
from typing import Iterable, Literal, Mapping

from berm.biology.causal_registry import get_causal_node, validate_causal_nodes
from berm.data.wpp import AGE_GROUPS, asfr_to_tfr
from berm.evidence_constraints import evidence_constraint_summary
from berm.evidence_registry import (
    FieldStateEvidenceRecord,
    load_fieldstate_evidence,
    load_legacy_evidence_migration,
)
from berm.validation.fieldstate_cohort_signature import (
    build_cohort_asfr_signature,
    load_processed_signature_inputs,
)


EVIDENCE_CONSTRAINED_HINDCAST_VERSION = "evidence-constrained-hindcast-v1"

UPSTREAM_FORBIDDEN_OUTCOME_TABLES = frozenset({
    "fertility_asfr_region_age_year",
    "fertility_tfr_region_year",
    "fertility_parity_progression",
    "culture_demand_age_country_year",
    "migration_generation_fertility",
    "art_outcomes_age_year",
})

_DIRECTIONS = frozenset({
    "BERM_DIRECTIONAL_PRIOR_WITH_PROTOCOL_TAILS",
    "FIELDSTATE_DEPENDENT_SPECIES_RESPONSE",
})
_LAG_FAMILIES = frozenset({
    "ACUTE_TO_SHORT_TERM",
    "CIRCADIAN_TO_CYCLE",
    "SPERMATOGENIC_TO_PERSISTENT",
    "DEVELOPMENTAL_MEMORY",
    "ECOLOGICAL_ENCOUNTER",
})
_SUSCEPTIBILITY_DIMENSIONS = frozenset({
    "LOCAL_VECTOR_GEOMETRY",
    "ORGAN_AND_SEX",
    "DEVELOPMENTAL_STAGE",
    "CIRCADIAN_PHASE",
    "SPECIES_INTERFACE_AND_MOBILITY",
})
_PRIOR_VARIANTS = frozenset({
    "MECHANISM_WEIGHTED",
    "ANIMAL_ENDPOINT_WEIGHTED",
    "HUMAN_ENDPOINT_WEIGHTED",
    "WEAKLY_INFORMATIVE",
})
_CALIBRATION_LEVELS = frozenset({
    "CONVERGENT_EVIDENCE_PRIOR",
    "PARTIAL_LOCAL_ENDPOINT_LIKELIHOOD",
    "MOBILITY_WEIGHTED_CATCHMENT_LIKELIHOOD",
    "DIRECT_MATCHED_LOCAL_LIKELIHOOD",
    "DEMOGRAPHIC_POSTERIOR_PREDICTIVE",
})


def _nonempty(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


def _ids(values: Iterable[str], name: str) -> tuple[str, ...]:
    if isinstance(values, str):
        raise ValueError(f"{name} must be an iterable of identifiers, not one string")
    result = tuple(_nonempty(name, value) for value in values)
    if not result:
        raise ValueError(f"{name} must not be empty")
    if len(set(result)) != len(result):
        raise ValueError(f"{name} contains duplicate identifiers")
    return result


def _finite(name: str, value: float) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite number")
    try:
        resolved = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite number") from exc
    if not math.isfinite(resolved):
        raise ValueError(f"{name} must be a finite number")
    return resolved


def _canonical_path(values: Iterable[str]) -> tuple[str, ...]:
    path = validate_causal_nodes(tuple(values))
    if len(path) < 2:
        raise ValueError("causal_path must contain at least two canonical causal nodes")
    return path


def _path_is_directed(path: tuple[str, ...]) -> bool:
    return all(
        target in get_causal_node(source).children
        for source, target in zip(path, path[1:])
    )


@dataclass(frozen=True)
class EvidenceSpecificationViolation:
    """A transparent specification issue; it is never a verdict on a study."""

    code: str
    subject: str
    message: str


@dataclass(frozen=True)
class StructuralPathSupport:
    """Evidence that activates a named FieldState-to-endpoint topology."""

    support_id: str
    causal_path: tuple[str, ...]
    evidence_ids: tuple[str, ...]
    statement: str
    susceptibility_dimensions: tuple[str, ...]
    limitations: tuple[str, ...]

    def __post_init__(self) -> None:
        object.__setattr__(self, "support_id", _nonempty("support_id", self.support_id))
        object.__setattr__(self, "causal_path", _canonical_path(self.causal_path))
        object.__setattr__(self, "evidence_ids", _ids(self.evidence_ids, "evidence_id"))
        object.__setattr__(self, "statement", _nonempty("statement", self.statement))
        dimensions = _ids(self.susceptibility_dimensions, "susceptibility_dimension")
        unknown = set(dimensions) - _SUSCEPTIBILITY_DIMENSIONS
        if unknown:
            raise ValueError("unknown susceptibility dimensions: " + ", ".join(sorted(unknown)))
        object.__setattr__(self, "susceptibility_dimensions", dimensions)
        object.__setattr__(self, "limitations", _ids(self.limitations, "limitation"))


@dataclass(frozen=True)
class DirectionalLagPrior:
    """An evidence-constrained sign, memory and lag family—not a TFR slope."""

    prior_id: str
    causal_path: tuple[str, ...]
    endpoint_node: str
    evidence_ids: tuple[str, ...]
    direction: str
    lag_family: str
    parameter_family_id: str
    statement: str
    susceptibility_dimensions: tuple[str, ...]

    def __post_init__(self) -> None:
        for name in ("prior_id", "endpoint_node", "parameter_family_id", "statement"):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        object.__setattr__(self, "causal_path", _canonical_path(self.causal_path))
        object.__setattr__(self, "endpoint_node", validate_causal_nodes((self.endpoint_node,))[0])
        if self.causal_path[-1] != self.endpoint_node:
            raise ValueError("endpoint_node must be the terminal node in causal_path")
        object.__setattr__(self, "evidence_ids", _ids(self.evidence_ids, "evidence_id"))
        if self.direction not in _DIRECTIONS:
            raise ValueError(f"unknown response direction: {self.direction!r}")
        if self.lag_family not in _LAG_FAMILIES:
            raise ValueError(f"unknown lag family: {self.lag_family!r}")
        dimensions = _ids(self.susceptibility_dimensions, "susceptibility_dimension")
        unknown = set(dimensions) - _SUSCEPTIBILITY_DIMENSIONS
        if unknown:
            raise ValueError("unknown susceptibility dimensions: " + ", ".join(sorted(unknown)))
        object.__setattr__(self, "susceptibility_dimensions", dimensions)


@dataclass(frozen=True)
class BayesianPriorVariant:
    """One broad alternative prior for sensitivity analysis.

    Every variant keeps a continuous, non-zero-capable response family with
    asymmetric protocol-, organ- and species-specific tails. The alternatives
    vary the evidentiary weighting, rather than silently putting all prior
    mass at a null effect or treating one direction as universal.
    """

    variant_id: str
    evidence_weighting: str
    distribution_family: str
    scale_strategy: str
    point_mass_at_zero: bool = False

    def __post_init__(self) -> None:
        for name in ("variant_id", "distribution_family", "scale_strategy"):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        if self.evidence_weighting not in _PRIOR_VARIANTS:
            raise ValueError(f"unknown evidence_weighting: {self.evidence_weighting!r}")
        if self.point_mass_at_zero:
            raise ValueError("a discovery-first BERM prior cannot use a hidden point mass at zero")


@dataclass(frozen=True)
class QuantitativeCalibrationFamily:
    """A response family whose uncertainty narrows as stronger data arrive.

    This is a ladder, not a binary gate.  Convergent studies already specify
    the topology, sign, memory and broad scale family.  Partial-local and
    mobility-weighted observations add wider likelihoods; a direct matched
    panel provides the narrowest coefficient likelihood.
    """

    family_id: str
    target_node: str
    directional_prior_ids: tuple[str, ...]
    evidence_ids: tuple[str, ...]
    response_family: str
    physical_or_biological_constraints: tuple[str, ...]
    prior_variants: tuple[BayesianPriorVariant, ...]
    calibration_ladder: tuple[str, ...]
    forbidden_outcome_tables: tuple[str, ...]

    def __post_init__(self) -> None:
        object.__setattr__(self, "family_id", _nonempty("family_id", self.family_id))
        object.__setattr__(self, "target_node", validate_causal_nodes((self.target_node,))[0])
        object.__setattr__(self, "directional_prior_ids", _ids(
            self.directional_prior_ids, "directional_prior_id"
        ))
        object.__setattr__(self, "evidence_ids", _ids(self.evidence_ids, "evidence_id"))
        object.__setattr__(self, "response_family", _nonempty("response_family", self.response_family))
        object.__setattr__(self, "physical_or_biological_constraints", _ids(
            self.physical_or_biological_constraints, "physical_or_biological_constraint"
        ))
        variants = tuple(self.prior_variants)
        if {item.evidence_weighting for item in variants} != _PRIOR_VARIANTS:
            raise ValueError("prior_variants must contain all four declared evidence-weighting families")
        object.__setattr__(self, "prior_variants", variants)
        ladder = _ids(self.calibration_ladder, "calibration_level")
        unknown = set(ladder) - _CALIBRATION_LEVELS
        if unknown:
            raise ValueError("unknown calibration ladder levels: " + ", ".join(sorted(unknown)))
        object.__setattr__(self, "calibration_ladder", ladder)
        forbidden = _ids(self.forbidden_outcome_tables, "forbidden_outcome_table")
        if not set(UPSTREAM_FORBIDDEN_OUTCOME_TABLES).issubset(forbidden):
            raise ValueError("all demographic outcome tables must remain forbidden upstream")
        object.__setattr__(self, "forbidden_outcome_tables", forbidden)


@dataclass(frozen=True)
class MobilityWeightedFieldState:
    """A local-area/catchment FieldState distribution with explicit transport uncertainty.

    It is intentionally broader than an exact-site endpoint pair.  It enables
    forward species and organ predictions for real mobile organisms while
    preserving the uncertainty from mobility, geometry and measurement
    coverage.  It cannot itself turn into a demographic calibration input.
    """

    distribution_id: str
    geography_id: str
    population_or_species_id: str
    target_node: str
    feature_id: str
    start_year: int
    end_year: int
    mean: float
    lower: float
    upper: float
    spatial_coverage_fraction: float
    temporal_coverage_fraction: float
    mobility_model_id: str
    geometry_transfer_model_id: str
    source_ids: tuple[str, ...]
    uncertainty_components: tuple[str, ...]
    measurement_status: Literal["PARTIAL_MEASURED_FIELDSTATE", "MEASUREMENT_READY_FIELD_STATE"]

    def __post_init__(self) -> None:
        for name in (
            "distribution_id", "geography_id", "population_or_species_id", "feature_id",
            "mobility_model_id", "geometry_transfer_model_id",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        object.__setattr__(self, "target_node", validate_causal_nodes((self.target_node,))[0])
        if not 1900 <= self.start_year <= self.end_year <= 2100:
            raise ValueError("FieldState distribution years must be ordered within 1900..2100")
        lower = _finite("lower", self.lower)
        mean = _finite("mean", self.mean)
        upper = _finite("upper", self.upper)
        if not lower <= mean <= upper:
            raise ValueError("lower <= mean <= upper is required")
        object.__setattr__(self, "lower", lower)
        object.__setattr__(self, "mean", mean)
        object.__setattr__(self, "upper", upper)
        for name in ("spatial_coverage_fraction", "temporal_coverage_fraction"):
            value = _finite(name, getattr(self, name))
            if not 0.0 < value <= 1.0:
                raise ValueError(f"{name} must be in (0, 1]")
            object.__setattr__(self, name, value)
        object.__setattr__(self, "source_ids", _ids(self.source_ids, "source_id"))
        object.__setattr__(self, "uncertainty_components", _ids(
            self.uncertainty_components, "uncertainty_component"
        ))


@dataclass(frozen=True)
class CrossSpeciesTransferSignature:
    """A forward FieldState prediction shared by a sentinel and a human/organ endpoint."""

    signature_id: str
    source_species: str
    target_species: str
    source_endpoint: str
    target_endpoint: str
    target_node: str
    directional_prior_id: str
    lag_family: str
    expected_response: str
    uncertainty_components: tuple[str, ...]

    def __post_init__(self) -> None:
        for name in (
            "signature_id", "source_species", "target_species", "source_endpoint",
            "target_endpoint", "directional_prior_id", "expected_response",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        object.__setattr__(self, "target_node", validate_causal_nodes((self.target_node,))[0])
        if self.target_node in {"ASFR", "TFR"}:
            raise ValueError("cross-species transfer endpoints must remain biological or ecological")
        if self.lag_family not in _LAG_FAMILIES:
            raise ValueError(f"unknown lag family: {self.lag_family!r}")
        object.__setattr__(self, "uncertainty_components", _ids(
            self.uncertainty_components, "uncertainty_component"
        ))


@dataclass(frozen=True)
class FieldStateContrast:
    """A predeclared change in a mobility-weighted local FieldState distribution."""

    reference: MobilityWeightedFieldState
    target: MobilityWeightedFieldState

    def __post_init__(self) -> None:
        if self.reference.feature_id != self.target.feature_id:
            raise ValueError("FieldState contrast requires the same feature_id")
        if self.reference.target_node != self.target.target_node:
            raise ValueError("FieldState contrast requires the same target_node")
        if self.target.start_year < self.reference.start_year:
            raise ValueError("target FieldState window must not begin before the reference window")

    @property
    def directional_change(self) -> Literal["INCREASED", "DECREASED", "OVERLAPPING"]:
        if self.target.lower > self.reference.upper:
            return "INCREASED"
        if self.target.upper < self.reference.lower:
            return "DECREASED"
        return "OVERLAPPING"


@dataclass(frozen=True)
class CrossSpeciesDirectionalPrediction:
    """A sign/lag prediction, intentionally without a hidden endpoint coefficient."""

    signature_id: str
    source_fieldstate_change: str
    target_fieldstate_change: str
    predicted_source_endpoint_direction: str
    predicted_target_endpoint_direction: str
    uncertainty_components: tuple[str, ...]
    status: str = "FORWARD_DIRECTIONAL_PREDICTION"


def predict_cross_species_direction(
    signature: CrossSpeciesTransferSignature,
    *,
    source_contrast: FieldStateContrast,
    target_contrast: FieldStateContrast,
) -> CrossSpeciesDirectionalPrediction:
    """Issue a mobility-aware, coefficient-free forward response prediction."""
    source_change = source_contrast.directional_change
    target_change = target_contrast.directional_change
    if signature.expected_response == "NONINCREASING_ENDPOINT_WITH_INCREASING_LOAD":
        endpoint = (
            "NONINCREASING_BERM_PRIOR_WITH_SPECIES_TAILS"
            if source_change == "INCREASED"
            else "UNRESOLVED_FROM_OVERLAPPING_LOAD"
        )
        target_endpoint = (
            "NONINCREASING_BERM_PRIOR_WITH_SPECIES_TAILS"
            if target_change == "INCREASED"
            else "UNRESOLVED_FROM_OVERLAPPING_LOAD"
        )
    else:
        endpoint = "SPECIES_INTERFACE_DEPENDENT"
        target_endpoint = "SPECIES_INTERFACE_DEPENDENT"
    return CrossSpeciesDirectionalPrediction(
        signature_id=signature.signature_id,
        source_fieldstate_change=source_change,
        target_fieldstate_change=target_change,
        predicted_source_endpoint_direction=endpoint,
        predicted_target_endpoint_direction=target_endpoint,
        uncertainty_components=tuple(sorted(set(
            signature.uncertainty_components
            + source_contrast.reference.uncertainty_components
            + source_contrast.target.uncertainty_components
            + target_contrast.reference.uncertainty_components
            + target_contrast.target.uncertainty_components
        ))),
    )


@dataclass(frozen=True)
class HistoricalSignatureWindow:
    """A locked global ASFR/TFR posterior-predictive signature window."""

    window_id: str
    base_year: int
    target_year: int
    expected_asfr_direction: Literal["NEGATIVE"]
    source_ids: tuple[str, ...]
    locked_model_inputs: tuple[str, ...]
    outcome_only: bool = True

    def __post_init__(self) -> None:
        object.__setattr__(self, "window_id", _nonempty("window_id", self.window_id))
        if not 1900 <= self.base_year < self.target_year <= 2100:
            raise ValueError("historical signature years must be ordered within 1900..2100")
        object.__setattr__(self, "source_ids", _ids(self.source_ids, "source_id"))
        object.__setattr__(self, "locked_model_inputs", _ids(
            self.locked_model_inputs, "locked_model_input"
        ))
        if not self.outcome_only:
            raise ValueError("historical ASFR/TFR signatures must remain outcome-only")


@dataclass(frozen=True)
class HistoricalSignatureEvaluation:
    """Observed global pattern compared with a predeclared cohort signature."""

    window_id: str
    base_year: int
    target_year: int
    n_geographies: int
    asfr_cohort_pearson_r: float | None
    asfr_direction_matches: bool | None
    tfr_context_pearson_r: float | None
    interpretation: str
    outcome_role: str = "POSTERIOR_PREDICTIVE_ONLY"


def _pearson(x: list[float], y: list[float]) -> float | None:
    if len(x) < 2 or len(x) != len(y):
        return None
    x_mean = sum(x) / len(x)
    y_mean = sum(y) / len(y)
    denominator = math.sqrt(sum((value - x_mean) ** 2 for value in x)) * math.sqrt(
        sum((value - y_mean) ** 2 for value in y)
    )
    if denominator == 0.0:
        return None
    return sum((a - x_mean) * (b - y_mean) for a, b in zip(x, y, strict=True)) / denominator


def evaluate_historical_signatures(
    windows: Iterable[HistoricalSignatureWindow],
    *,
    data_dir: str | None = None,
) -> tuple[HistoricalSignatureEvaluation, ...]:
    """Evaluate locked cohort signatures without sending their outcomes upstream."""
    mobile, asfr = load_processed_signature_inputs(data_dir)
    output: list[HistoricalSignatureEvaluation] = []
    for window in windows:
        result = build_cohort_asfr_signature(
            mobile_proxy_by_country_year=mobile,
            asfr_by_country_year=asfr,
            base_year=window.base_year,
            target_year=window.target_year,
        )
        proxy_values: list[float] = []
        tfr_changes: list[float] = []
        for row in result.rows:
            baseline = asfr[(row.geography_id, window.base_year)]
            target = asfr[(row.geography_id, window.target_year)]
            baseline_tfr = asfr_to_tfr([baseline[group] for group in AGE_GROUPS])
            target_tfr = asfr_to_tfr([target[group] for group in AGE_GROUPS])
            proxy_values.append(row.cohort_timing_proxy_gap)
            tfr_changes.append(math.log((target_tfr + 0.01) / (baseline_tfr + 0.01)))
        asfr_r = result.pearson_r
        output.append(HistoricalSignatureEvaluation(
            window_id=window.window_id,
            base_year=window.base_year,
            target_year=window.target_year,
            n_geographies=result.n_countries,
            asfr_cohort_pearson_r=asfr_r,
            asfr_direction_matches=None if asfr_r is None else asfr_r < 0.0,
            tfr_context_pearson_r=_pearson(proxy_values, tfr_changes),
            interpretation=(
                "The ASFR cohort gradient is the BERM-derived population signature. "
                "The TFR correlation is retained as downstream context because demand, tempo "
                "and ART remain explicit ASFR inputs; neither value calibrates FieldState, "
                "organ, sentinel or lag parameters."
            ),
        ))
    return tuple(output)


@dataclass(frozen=True)
class EvidenceConstrainedHindcastSpecification:
    """Complete discovery-first declaration before a numerical hindcast is run."""

    version: str
    structural_supports: tuple[StructuralPathSupport, ...]
    directional_lag_priors: tuple[DirectionalLagPrior, ...]
    calibration_families: tuple[QuantitativeCalibrationFamily, ...]
    cross_species_signatures: tuple[CrossSpeciesTransferSignature, ...]
    historical_signature_windows: tuple[HistoricalSignatureWindow, ...]

    def __post_init__(self) -> None:
        object.__setattr__(self, "version", _nonempty("version", self.version))
        for name in (
            "structural_supports", "directional_lag_priors", "calibration_families",
            "cross_species_signatures", "historical_signature_windows",
        ):
            values = tuple(getattr(self, name))
            if not values:
                raise ValueError(f"{name} must not be empty")
            object.__setattr__(self, name, values)


def _evidence_by_id() -> dict[str, FieldStateEvidenceRecord]:
    return {record.id: record for record in load_fieldstate_evidence()}


def _validate_evidence_attachment(
    *,
    subject: str,
    causal_path: tuple[str, ...],
    evidence_ids: tuple[str, ...],
    evidence: Mapping[str, FieldStateEvidenceRecord],
) -> list[EvidenceSpecificationViolation]:
    violations: list[EvidenceSpecificationViolation] = []
    path_nodes = set(causal_path)
    for evidence_id in evidence_ids:
        record = evidence.get(evidence_id)
        if record is None:
            violations.append(EvidenceSpecificationViolation(
                "UNKNOWN_EVIDENCE_ID", subject,
                f"{evidence_id} is not present in the active FieldState evidence registry.",
            ))
        elif not path_nodes.intersection(record.causal_nodes):
            violations.append(EvidenceSpecificationViolation(
                "EVIDENCE_PATH_MISMATCH", subject,
                f"{evidence_id} does not attach to the declared causal path.",
            ))
    return violations


def validate_evidence_constrained_hindcast_spec(
    specification: EvidenceConstrainedHindcastSpecification,
) -> tuple[EvidenceSpecificationViolation, ...]:
    """Validate active evidence use, without discarding non-numeric evidence."""
    evidence = _evidence_by_id()
    violations: list[EvidenceSpecificationViolation] = []
    prior_ids = {item.prior_id for item in specification.directional_lag_priors}
    family_ids = {item.family_id for item in specification.calibration_families}

    for support in specification.structural_supports:
        if not _path_is_directed(support.causal_path):
            violations.append(EvidenceSpecificationViolation(
                "UNDIRECTED_STRUCTURAL_PATH", support.support_id,
                "Every structural support path must follow a canonical causal edge.",
            ))
        violations.extend(_validate_evidence_attachment(
            subject=support.support_id,
            causal_path=support.causal_path,
            evidence_ids=support.evidence_ids,
            evidence=evidence,
        ))

    for prior in specification.directional_lag_priors:
        if not _path_is_directed(prior.causal_path):
            violations.append(EvidenceSpecificationViolation(
                "UNDIRECTED_DIRECTIONAL_PATH", prior.prior_id,
                "Every directional/lag prior must follow a canonical causal edge.",
            ))
        if prior.endpoint_node in {"ASFR", "TFR"}:
            violations.append(EvidenceSpecificationViolation(
                "DEMOGRAPHIC_ENDPOINT_UPSTREAM_FORBIDDEN", prior.prior_id,
                "Directional biological priors must end in a biological or ecological endpoint.",
            ))
        violations.extend(_validate_evidence_attachment(
            subject=prior.prior_id,
            causal_path=prior.causal_path,
            evidence_ids=prior.evidence_ids,
            evidence=evidence,
        ))

    for family in specification.calibration_families:
        if family.target_node in {"ASFR", "TFR"}:
            violations.append(EvidenceSpecificationViolation(
                "DEMOGRAPHIC_PARAMETER_UPSTREAM_FORBIDDEN", family.family_id,
                "A quantitative family must be anchored to an organ, biological or ecological endpoint.",
            ))
        if not set(family.directional_prior_ids).issubset(prior_ids):
            violations.append(EvidenceSpecificationViolation(
                "UNKNOWN_DIRECTIONAL_PRIOR", family.family_id,
                "A calibration family references a directional/lag prior that is not registered.",
            ))
        violations.extend(_validate_evidence_attachment(
            subject=family.family_id,
            causal_path=(family.target_node, family.target_node),
            evidence_ids=family.evidence_ids,
            evidence=evidence,
        ))

    for signature in specification.cross_species_signatures:
        if signature.directional_prior_id not in prior_ids:
            violations.append(EvidenceSpecificationViolation(
                "UNKNOWN_CROSS_SPECIES_PRIOR", signature.signature_id,
                "A cross-species prediction must cite a registered directional/lag prior.",
            ))

    for window in specification.historical_signature_windows:
        if not window.outcome_only:
            violations.append(EvidenceSpecificationViolation(
                "OUTCOME_SIGNATURE_NOT_LOCKED", window.window_id,
                "Historical ASFR/TFR results must remain posterior-predictive only.",
            ))
        if not set(window.source_ids).issubset({"UN_WPP_2024_ASFR", "WB_IT_CEL_SETS_P2"}):
            violations.append(EvidenceSpecificationViolation(
                "UNDECLARED_SIGNATURE_SOURCE", window.window_id,
                "The current global signature is defined only for the WPP/WB source pair.",
            ))

    if not family_ids:
        violations.append(EvidenceSpecificationViolation(
            "NO_CALIBRATION_FAMILY", specification.version,
            "At least one evidence-constrained response family is required.",
        ))
    return tuple(violations)


def default_evidence_constrained_hindcast_specification() -> EvidenceConstrainedHindcastSpecification:
    """Return BERM's active discovery-first evidence specification.

    The studies named here constrain *which* causal routes, signs, lags and
    susceptibility dimensions are admissible.  Direct measurement then narrows
    their posterior; nothing in this declaration fits a historical TFR curve.
    """
    prior_variants = (
        BayesianPriorVariant("mechanism", "MECHANISM_WEIGHTED", "asymmetric_signed_continuous", "broad_mechanism_scale_with_protocol_tails"),
        BayesianPriorVariant("animal", "ANIMAL_ENDPOINT_WEIGHTED", "asymmetric_signed_continuous", "broad_animal_endpoint_scale_with_species_tails"),
        BayesianPriorVariant("human", "HUMAN_ENDPOINT_WEIGHTED", "asymmetric_signed_continuous", "broad_human_endpoint_scale_with_assay_tails"),
        BayesianPriorVariant("weak", "WEAKLY_INFORMATIVE", "symmetric_signed_continuous", "broad_weakly_informative_scale"),
    )
    ladder = (
        "CONVERGENT_EVIDENCE_PRIOR",
        "PARTIAL_LOCAL_ENDPOINT_LIKELIHOOD",
        "MOBILITY_WEIGHTED_CATCHMENT_LIKELIHOOD",
        "DIRECT_MATCHED_LOCAL_LIKELIHOOD",
        "DEMOGRAPHIC_POSTERIOR_PREDICTIVE",
    )
    forbidden = tuple(sorted(UPSTREAM_FORBIDDEN_OUTCOME_TABLES))
    return EvidenceConstrainedHindcastSpecification(
        version=EVIDENCE_CONSTRAINED_HINDCAST_VERSION,
        structural_supports=(
            StructuralPathSupport(
                "local_vector_to_male_endpoint",
                ("FIELDSTATE_VECTOR", "A_VGCC_ROS", "MALE_SPERM"),
                ("BLACKMAN_1985_BACKGROUND_FREQUENCY", "USSELMAN_2016_ORIENTATION_ROS", "DE_IULIIS_2009_HUMAN_SPERM", "BALDINI_2025_ART_LAB_SPERM"),
                "Local vector/geometry-sensitive FieldState is an active upstream explanation for a redox-linked male endpoint path.",
                ("LOCAL_VECTOR_GEOMETRY", "ORGAN_AND_SEX"),
                ("Endpoint magnitude remains context- and assay-dependent.",),
            ),
            StructuralPathSupport(
                "local_vector_to_btb_persistent_sperm",
                ("FIELDSTATE_VECTOR", "A_VGCC_ROS", "BARRIER_BTB", "MALE_GERMLINE_RESERVE", "MALE_SPERM"),
                ("YU_2020_LOCAL_4G_BTB", "CHAKRABORTY_2020_OXIDATIVE_BTB", "MEENA_2014_MELATONIN_RESCUE"),
                "BTB and germline reserve keep a local barrier-to-sperm route active alongside acute sperm mechanisms.",
                ("LOCAL_VECTOR_GEOMETRY", "ORGAN_AND_SEX", "DEVELOPMENTAL_STAGE"),
                ("Retention is represented as a family, not a universal duration.",),
            ),
            StructuralPathSupport(
                "fieldstate_to_female_developmental_reserve",
                ("FIELDSTATE_VECTOR", "A_VGCC_ROS", "VMEM_MTOR", "BIOELECTRIC_DEVELOPMENT", "OVARIAN_RESERVE"),
                ("ZANDIEH_2025_MITO_RESONANCE", "AHMADI_2016_OVARIAN_FOLLICLES", "CALIS_2021_PRENATAL_OVARIAN_RESERVE", "YOUSEFI_2025_NEONATAL_OOGENESIS"),
                "Female developmental reserve is an active FieldState-to-capacity route, distinct from the male sperm route.",
                ("LOCAL_VECTOR_GEOMETRY", "ORGAN_AND_SEX", "DEVELOPMENTAL_STAGE"),
                ("Developmental and adult endpoint scales remain separately parameterized.",),
            ),
            StructuralPathSupport(
                "fieldstate_to_clock_and_ovulation",
                ("FIELDSTATE_VECTOR", "B_RPM_CRY", "MELATONIN_REDOX", "HPA_HPG", "OVULATION_CLOCK"),
                ("RITZ_2004_VECTOR_ANGLE", "MAJEWSKA_2025_CRY4A_MEMBRANE", "CAO_2015_RF_CIRCADIAN_REDOX", "LIU_2014_OVARIAN_CLOCK_IMPLANTATION"),
                "Vector, clock/redox and endocrine timing form a separate cyclic female susceptibility route.",
                ("LOCAL_VECTOR_GEOMETRY", "ORGAN_AND_SEX", "CIRCADIAN_PHASE"),
                ("The route specifies timing and state dependence rather than a universal period effect.",),
            ),
            StructuralPathSupport(
                "static_interface_to_ecological_encounter",
                ("STATIC_TRIBO_INTERFACE", "ECOLOGICAL_ENCOUNTER"),
                ("ENGLAND_2023_TICK_STATIC_ATTACHMENT", "COLIN_1992_VARROA_ELECTRICAL_CHARGES", "GARCIA_ROBLEDO_2025_FLOWER_MITE_ELECTRORECEPTION", "MORLEY_2018_SPIDER_EFIELD_BALLOONING"),
                "Species-specific electrostatic interfaces are active ecological susceptibility and encounter mechanisms.",
                ("SPECIES_INTERFACE_AND_MOBILITY",),
                ("Direction and magnitude depend on species, morphology and field geometry.",),
            ),
        ),
        directional_lag_priors=(
            DirectionalLagPrior(
                "male_acute_sperm_direction", ("FIELDSTATE_VECTOR", "A_VGCC_ROS", "MALE_SPERM"), "MALE_SPERM",
                ("DE_IULIIS_2009_HUMAN_SPERM", "BALDINI_2025_ART_LAB_SPERM"),
                "BERM_DIRECTIONAL_PRIOR_WITH_PROTOCOL_TAILS", "ACUTE_TO_SHORT_TERM", "male_sperm_response",
                "Increased endpoint-defined load admits a non-increasing acute sperm-quality response, with local geometry retained.",
                ("LOCAL_VECTOR_GEOMETRY", "ORGAN_AND_SEX"),
            ),
            DirectionalLagPrior(
                "male_btb_memory_direction", ("FIELDSTATE_VECTOR", "A_VGCC_ROS", "BARRIER_BTB", "MALE_GERMLINE_RESERVE", "MALE_SPERM"), "MALE_SPERM",
                ("YU_2020_LOCAL_4G_BTB", "CHAKRABORTY_2020_OXIDATIVE_BTB", "MEENA_2014_MELATONIN_RESCUE"),
                "BERM_DIRECTIONAL_PRIOR_WITH_PROTOCOL_TAILS", "SPERMATOGENIC_TO_PERSISTENT", "male_btb_memory_response",
                "The BTB/germline route constrains the model to a spermatogenic-to-persistent memory family rather than an instantaneous-only effect.",
                ("ORGAN_AND_SEX", "DEVELOPMENTAL_STAGE", "LOCAL_VECTOR_GEOMETRY"),
            ),
            DirectionalLagPrior(
                "female_reserve_memory_direction", ("FIELDSTATE_VECTOR", "A_VGCC_ROS", "VMEM_MTOR", "BIOELECTRIC_DEVELOPMENT", "OVARIAN_RESERVE"), "OVARIAN_RESERVE",
                ("AHMADI_2016_OVARIAN_FOLLICLES", "CALIS_2021_PRENATAL_OVARIAN_RESERVE", "YOUSEFI_2025_NEONATAL_OOGENESIS"),
                "BERM_DIRECTIONAL_PRIOR_WITH_PROTOCOL_TAILS", "DEVELOPMENTAL_MEMORY", "female_reserve_response",
                "The female reserve route constrains the model to developmental-memory and non-increasing reserve-capacity response families.",
                ("ORGAN_AND_SEX", "DEVELOPMENTAL_STAGE"),
            ),
            DirectionalLagPrior(
                "female_clock_direction", ("FIELDSTATE_VECTOR", "B_RPM_CRY", "MELATONIN_REDOX", "HPA_HPG", "OVULATION_CLOCK"), "OVULATION_CLOCK",
                ("RITZ_2004_VECTOR_ANGLE", "CAO_2015_RF_CIRCADIAN_REDOX", "LIU_2014_OVARIAN_CLOCK_IMPLANTATION", "HE_2016_OOCYTE_MELATONIN"),
                "BERM_DIRECTIONAL_PRIOR_WITH_PROTOCOL_TAILS", "CIRCADIAN_TO_CYCLE", "female_clock_response",
                "Clock/redox evidence constrains cyclic timing and susceptibility before it constrains a population coefficient.",
                ("CIRCADIAN_PHASE", "ORGAN_AND_SEX", "LOCAL_VECTOR_GEOMETRY"),
            ),
            DirectionalLagPrior(
                "electroecological_species_direction", ("STATIC_TRIBO_INTERFACE", "ECOLOGICAL_ENCOUNTER"), "ECOLOGICAL_ENCOUNTER",
                ("ENGLAND_2023_TICK_STATIC_ATTACHMENT", "COLIN_1992_VARROA_ELECTRICAL_CHARGES", "MALLINSON_2025_HONEYBEE_EFIELD_FORAGING", "GARCIA_ROBLEDO_2025_FLOWER_MITE_ELECTRORECEPTION"),
                "FIELDSTATE_DEPENDENT_SPECIES_RESPONSE", "ECOLOGICAL_ENCOUNTER", "ecological_encounter_response",
                "Electroecological evidence makes a species-, morphology- and mobility-dependent encounter response an active prediction target.",
                ("SPECIES_INTERFACE_AND_MOBILITY", "LOCAL_VECTOR_GEOMETRY"),
            ),
        ),
        calibration_families=(
            QuantitativeCalibrationFamily(
                "male_sperm_response", "MALE_SPERM", ("male_acute_sperm_direction",),
                ("DE_IULIIS_2009_HUMAN_SPERM", "BALDINI_2025_ART_LAB_SPERM"),
                "organ-load to sperm-quality capacity", ("endpoint assay is explicit", "field geometry remains explicit"), prior_variants, ladder, forbidden,
            ),
            QuantitativeCalibrationFamily(
                "male_btb_memory_response", "MALE_SPERM", ("male_btb_memory_direction",),
                ("YU_2020_LOCAL_4G_BTB", "CHAKRABORTY_2020_OXIDATIVE_BTB", "MEENA_2014_MELATONIN_RESCUE"),
                "reversible/persistent BTB and germline-memory to sperm capacity", ("reversible and persistent states remain distinct", "retention in [0,1]"), prior_variants, ladder, forbidden,
            ),
            QuantitativeCalibrationFamily(
                "female_reserve_response", "OVARIAN_RESERVE", ("female_reserve_memory_direction",),
                ("AHMADI_2016_OVARIAN_FOLLICLES", "CALIS_2021_PRENATAL_OVARIAN_RESERVE", "YOUSEFI_2025_NEONATAL_OOGENESIS"),
                "developmental-memory to ovarian reserve capacity", ("developmental and adult loads remain separate", "life stage remains explicit"), prior_variants, ladder, forbidden,
            ),
            QuantitativeCalibrationFamily(
                "female_clock_response", "OVULATION_CLOCK", ("female_clock_direction",),
                ("LIU_2014_OVARIAN_CLOCK_IMPLANTATION",),
                "circadian/cycle-state to ovulatory gate capacity", ("circadian phase is explicit", "cycle timing is explicit"), prior_variants, ladder, forbidden,
            ),
            QuantitativeCalibrationFamily(
                "ecological_encounter_response", "ECOLOGICAL_ENCOUNTER", ("electroecological_species_direction",),
                ("ENGLAND_2023_TICK_STATIC_ATTACHMENT", "COLIN_1992_VARROA_ELECTRICAL_CHARGES", "MALLINSON_2025_HONEYBEE_EFIELD_FORAGING", "GARCIA_ROBLEDO_2025_FLOWER_MITE_ELECTRORECEPTION"),
                "species-specific FieldState to encounter/fitness response", ("species response is not forced to share a human sign", "mobility distribution remains explicit"), prior_variants, ladder, forbidden,
            ),
        ),
        cross_species_signatures=(
            CrossSpeciesTransferSignature(
                "dog_to_human_sperm_catchment", "dog", "human", "semen motility/DNA endpoint", "human sperm quality endpoint", "MALE_SPERM",
                "male_btb_memory_direction", "SPERMATOGENIC_TO_PERSISTENT", "NONINCREASING_ENDPOINT_WITH_INCREASING_LOAD",
                ("mobility weights", "catchment geometry", "species transfer", "endpoint assay"),
            ),
            CrossSpeciesTransferSignature(
                "tick_host_vegetation_encounter", "tick", "host-associated ecological endpoint", "attachment/encounter", "relative encounter endpoint", "ECOLOGICAL_ENCOUNTER",
                "electroecological_species_direction", "ECOLOGICAL_ENCOUNTER", "SPECIES_INTERFACE_DEPENDENT",
                ("host movement", "vegetation geometry", "triboelectric interface", "weather and season"),
            ),
        ),
        historical_signature_windows=(
            HistoricalSignatureWindow("cohort_1990_2013", 1990, 2013, "NEGATIVE", ("UN_WPP_2024_ASFR", "WB_IT_CEL_SETS_P2"), ("developmental_age_window_-1_to_17", "vulnerability_by_age", "young_15_29_vs_older_30_49")),
            HistoricalSignatureWindow("cohort_1995_2018", 1995, 2018, "NEGATIVE", ("UN_WPP_2024_ASFR", "WB_IT_CEL_SETS_P2"), ("developmental_age_window_-1_to_17", "vulnerability_by_age", "young_15_29_vs_older_30_49")),
            HistoricalSignatureWindow("cohort_2000_2023", 2000, 2023, "NEGATIVE", ("UN_WPP_2024_ASFR", "WB_IT_CEL_SETS_P2"), ("developmental_age_window_-1_to_17", "vulnerability_by_age", "young_15_29_vs_older_30_49")),
        ),
    )


def evidence_constrained_hindcast_summary(
    specification: EvidenceConstrainedHindcastSpecification | None = None,
) -> dict[str, object]:
    """Summarise what existing evidence actively contributes to BERM v2."""
    spec = default_evidence_constrained_hindcast_specification() if specification is None else specification
    evidence_ids = {
        evidence_id
        for group in spec.structural_supports
        for evidence_id in group.evidence_ids
    } | {
        evidence_id
        for group in spec.directional_lag_priors
        for evidence_id in group.evidence_ids
    }
    try:
        full_constraint_ledger: dict[str, object] = evidence_constraint_summary()
    except FileNotFoundError:
        # A source-qualification ledger may be populated independently of this
        # specification. Active evidence remains available while that optional
        # richer legacy expansion is being written.
        full_constraint_ledger = {
            "status": "ACTIVE_LEDGER_AVAILABLE_LEGACY_QUALIFICATION_IN_PROGRESS",
            "active_source_count": len(load_fieldstate_evidence()),
            "legacy_record_count": len(load_legacy_evidence_migration()),
        }
    return {
        "version": spec.version,
        "validation_violations": [item.__dict__ for item in validate_evidence_constrained_hindcast_spec(spec)],
        "active_structural_paths": len(spec.structural_supports),
        "active_directional_lag_priors": len(spec.directional_lag_priors),
        "active_calibration_families": len(spec.calibration_families),
        "active_cross_species_signatures": len(spec.cross_species_signatures),
        "historical_signature_windows": len(spec.historical_signature_windows),
        "active_evidence_record_count": len(evidence_ids),
        "full_active_constraint_ledger": full_constraint_ledger,
        "legacy_evidence_record_count": len(load_legacy_evidence_migration()),
        "calibration_ladder": (
            "convergent mechanism/animal/human/sentinel evidence -> broad constrained priors; "
            "partial local FieldState+endpoint -> wider likelihood; mobility-weighted catchment "
            "transfer -> explicit spatial uncertainty; direct matched local panel -> narrowest "
            "endpoint coefficient; ASFR/TFR -> posterior-predictive evaluation only"
        ),
    }


__all__ = [
    "EVIDENCE_CONSTRAINED_HINDCAST_VERSION",
    "UPSTREAM_FORBIDDEN_OUTCOME_TABLES",
    "BayesianPriorVariant",
    "CrossSpeciesDirectionalPrediction",
    "CrossSpeciesTransferSignature",
    "DirectionalLagPrior",
    "EvidenceConstrainedHindcastSpecification",
    "EvidenceSpecificationViolation",
    "FieldStateContrast",
    "HistoricalSignatureEvaluation",
    "HistoricalSignatureWindow",
    "MobilityWeightedFieldState",
    "QuantitativeCalibrationFamily",
    "StructuralPathSupport",
    "default_evidence_constrained_hindcast_specification",
    "evaluate_historical_signatures",
    "evidence_constrained_hindcast_summary",
    "predict_cross_species_direction",
    "validate_evidence_constrained_hindcast_spec",
]
