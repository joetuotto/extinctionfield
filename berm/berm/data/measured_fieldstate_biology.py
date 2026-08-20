"""Locked measured FieldState--biology panels for the BERM v2 route.

This is the operational boundary between a measured local physical state and
an observed biological endpoint.  It exists to prevent an attractive but
invalid shortcut: joining a national technology proxy, a nearby probe, or a
demographic series to biology and calling the result calibration.

The contract follows the FieldState premises directly:

    documented local FieldState
        -> named organ / receptor transfer
        -> observed biological endpoint through a declared spatial-temporal route
           (exact site, mobility-weighted catchment, or local-area estimate)
        -> pre-outcome endpoint-calibration lock

The classes below deliberately do *not* fit a response coefficient.  They
make a future fit auditable only after the physical and biological records are
both immutable, measured, and joined through an explicit, uncertainty-bearing
spatial-temporal route.  Exact-site pairing is the highest-directness route,
not a universal eligibility condition.  ASFR, TFR, demand, tempo, parity,
migration and ART are not legal objects in this module.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
import datetime as dt
import hashlib
import json
import math
from typing import Iterable, Literal, Mapping

from berm.data.field_state import FieldStateObservation, validate_fieldstate_panel
from berm.physics.field_state import assess_field_state_completeness


MEASURED_FIELDSTATE_BIOLOGY_PANEL_VERSION = "measured-fieldstate-biology-panel-v1"

BiologyRole = Literal["SENTINEL", "HUMAN"]
MatchLevel = Literal[
    "EXACT_SITE",
    "MOBILITY_WEIGHTED_CATCHMENT",
    "LOCAL_AREA_ESTIMATE",
]
MatchRecordRole = Literal["FIELDSTATE", "BIOLOGICAL"]
EndpointLayer = Literal[
    "GAMETE",
    "BARRIER",
    "OVARIAN",
    "ENDOCRINE",
    "PREGNANCY",
    "SENTINEL_REPRODUCTIVE",
    "SENTINEL_ECOLOGICAL",
]
# A missing matched panel is a limit on *quantitative coefficient estimation*,
# not a verdict on the active mechanistic evidence graph.  Keep that
# distinction in the public result instead of collapsing both questions into a
# misleading "blocked" label.
QuantitativeCalibrationStatus = Literal[
    "PENDING_MATCHED_CALIBRATION",
    "READY_FOR_ENDPOINT_CALIBRATION",
]
StructuralEvidenceStatus = Literal["ACTIVE"]

_BIOLOGY_ROLES = frozenset({"SENTINEL", "HUMAN"})
_MATCH_LEVELS = frozenset({
    "EXACT_SITE",
    "MOBILITY_WEIGHTED_CATCHMENT",
    "LOCAL_AREA_ESTIMATE",
})
_MATCH_RECORD_ROLES = frozenset({"FIELDSTATE", "BIOLOGICAL"})
_ENDPOINT_LAYERS = frozenset({
    "GAMETE",
    "BARRIER",
    "OVARIAN",
    "ENDOCRINE",
    "PREGNANCY",
    "SENTINEL_REPRODUCTIVE",
    "SENTINEL_ECOLOGICAL",
})
_FIELDSTATE_FEATURE_IDS = frozenset({
    "selected_vector_magnitude",
    "tissue_axis_projection",
    "geometric_cross_term",
    "coherent_cross_term",
    "envelope_overlap",
    "night_selected_projection",
    "background_personal_cosine",
})


def _nonempty(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


def _ids(values: Iterable[str], name: str, *, require_one: bool = True) -> tuple[str, ...]:
    if isinstance(values, str):
        raise ValueError(f"{name} must be an iterable of identifiers, not one string")
    result = tuple(_nonempty(name, value) for value in values)
    if require_one and not result:
        raise ValueError(f"{name} must not be empty")
    if len(set(result)) != len(result):
        raise ValueError(f"{name} contains duplicate identifiers")
    return result


def _finite(name: str, value: float) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be a finite number, not a boolean")
    try:
        result = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite number") from exc
    if not math.isfinite(result):
        raise ValueError(f"{name} must be a finite number")
    return result


def _digest(name: str, value: str) -> str:
    candidate = _nonempty(name, value)
    if len(candidate) != 64 or any(character not in "0123456789abcdef" for character in candidate):
        raise ValueError(f"{name} must be a lowercase SHA-256 digest")
    return candidate


def _canonical_digest(value: object) -> str:
    payload = json.dumps(
        value,
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
        default=str,
    ).encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


def _instant(name: str, value: str) -> dt.datetime:
    text = _nonempty(name, value)
    # Python before 3.11 does not accept Z in fromisoformat().  Preserve the
    # instant while ensuring all matched windows carry an explicit offset.
    compatible = f"{text[:-1]}+00:00" if text.endswith("Z") else text
    try:
        parsed = dt.datetime.fromisoformat(compatible)
    except ValueError as exc:
        raise ValueError(f"{name} must be an ISO-8601 timestamp with an offset") from exc
    if parsed.tzinfo is None or parsed.utcoffset() is None:
        raise ValueError(f"{name} must include an explicit timezone offset")
    return parsed


@dataclass(frozen=True)
class PanelViolation:
    """One transparent reason why a measured panel cannot be calibrated."""

    code: str
    message: str
    subject: str


@dataclass(frozen=True)
class FieldStateMeasurementBinding:
    """Typed physical metadata for one FieldState observation.

    ``FieldStateObservation`` remains a reusable local-physics record.  This
    sidecar binds it, only for a locked biological study, to its immutable
    physical site, time window and source artifact.  A separate
    :class:`SpatialMatchGeometry` may then carry that physical observation to
    an endpoint by an exact-site, mobility-weighted catchment or local-area
    route.  The separation prevents a generic field calculation from silently
    acquiring a biology join through arbitrary provenance text.
    """

    binding_id: str
    fieldstate_observation_id: str
    geography_id: str
    site_id: str
    target_node: str
    biological_sex: str
    life_stage: str
    window_start: str
    window_end: str
    time_window_rule_id: str
    measurement_geometry_id: str
    physical_artifact_sha256: str
    source_manifest_sha256: str
    coverage_fraction: float

    def __post_init__(self) -> None:
        for name in (
            "binding_id",
            "fieldstate_observation_id",
            "geography_id",
            "site_id",
            "target_node",
            "biological_sex",
            "life_stage",
            "time_window_rule_id",
            "measurement_geometry_id",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        start = _instant("window_start", self.window_start)
        end = _instant("window_end", self.window_end)
        if not start < end:
            raise ValueError("FieldState binding window_start must precede window_end")
        object.__setattr__(self, "window_start", start.isoformat())
        object.__setattr__(self, "window_end", end.isoformat())
        object.__setattr__(self, "physical_artifact_sha256", _digest(
            "physical_artifact_sha256", self.physical_artifact_sha256
        ))
        object.__setattr__(self, "source_manifest_sha256", _digest(
            "source_manifest_sha256", self.source_manifest_sha256
        ))
        coverage = _finite("coverage_fraction", self.coverage_fraction)
        if not 0.0 < coverage <= 1.0:
            raise ValueError("coverage_fraction must be in (0, 1]")
        object.__setattr__(self, "coverage_fraction", coverage)

    @property
    def start(self) -> dt.datetime:
        return _instant("window_start", self.window_start)

    @property
    def end(self) -> dt.datetime:
        return _instant("window_end", self.window_end)


@dataclass(frozen=True)
class SpatialMatchGeometry:
    """A declared spatial-temporal route from one record to another.

    ``EXACT_SITE`` is the highest-directness route: source and target name the
    same study site.  It is not the only admissible route.  A mobile organism
    or a local-area endpoint can instead use a predeclared, immutable
    mobility-weighted catchment or local-area estimator.  Those routes retain
    their spatial and temporal uncertainty rather than pretending that a
    nearby fixed probe is an exact organism-level measurement.

    The class deliberately imposes no universal distance or uncertainty
    threshold.  The physical support, weighting method and uncertainty are
    reported so a later numerical fit can propagate them transparently.
    """

    geometry_id: str
    match_level: MatchLevel
    source_record_role: MatchRecordRole
    source_record_id: str
    target_record_role: MatchRecordRole
    target_record_id: str
    source_geography_id: str
    source_site_id: str
    target_geography_id: str
    target_site_id: str
    crosswalk_id: str
    crosswalk_sha256: str
    distance_metric_id: str
    distance_estimate_m: float
    distance_uncertainty_lower_m: float
    distance_uncertainty_upper_m: float
    temporal_alignment_rule_id: str
    temporal_uncertainty_days: float
    spatial_uncertainty_method_id: str
    mobility_kernel_id: str | None = None
    mobility_kernel_sha256: str | None = None
    local_area_estimator_id: str | None = None
    local_area_estimator_sha256: str | None = None
    weight_sum: float | None = None
    effective_sample_size: float | None = None

    def __post_init__(self) -> None:
        for name in (
            "geometry_id",
            "source_record_id",
            "target_record_id",
            "source_geography_id",
            "source_site_id",
            "target_geography_id",
            "target_site_id",
            "crosswalk_id",
            "distance_metric_id",
            "temporal_alignment_rule_id",
            "spatial_uncertainty_method_id",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        if self.match_level not in _MATCH_LEVELS:
            raise ValueError(f"unknown match_level: {self.match_level!r}")
        for name in ("source_record_role", "target_record_role"):
            if getattr(self, name) not in _MATCH_RECORD_ROLES:
                raise ValueError(f"unknown {name}: {getattr(self, name)!r}")
        object.__setattr__(self, "crosswalk_sha256", _digest(
            "crosswalk_sha256", self.crosswalk_sha256
        ))
        distance = _finite("distance_estimate_m", self.distance_estimate_m)
        lower = _finite("distance_uncertainty_lower_m", self.distance_uncertainty_lower_m)
        upper = _finite("distance_uncertainty_upper_m", self.distance_uncertainty_upper_m)
        if distance < 0.0 or lower < 0.0 or upper < 0.0 or lower > upper:
            raise ValueError("distance estimate and uncertainty must be non-negative and ordered")
        if not lower <= distance <= upper:
            raise ValueError("distance_estimate_m must lie within its uncertainty bounds")
        object.__setattr__(self, "distance_estimate_m", distance)
        object.__setattr__(self, "distance_uncertainty_lower_m", lower)
        object.__setattr__(self, "distance_uncertainty_upper_m", upper)
        temporal_uncertainty = _finite("temporal_uncertainty_days", self.temporal_uncertainty_days)
        if temporal_uncertainty < 0.0:
            raise ValueError("temporal_uncertainty_days must be non-negative")
        object.__setattr__(self, "temporal_uncertainty_days", temporal_uncertainty)

        def digest_pair(identifier_name: str, digest_name: str) -> None:
            identifier = getattr(self, identifier_name)
            digest = getattr(self, digest_name)
            if (identifier is None) != (digest is None):
                raise ValueError(f"{identifier_name} and {digest_name} must be supplied together")
            if identifier is not None:
                object.__setattr__(self, identifier_name, _nonempty(identifier_name, identifier))
                object.__setattr__(self, digest_name, _digest(digest_name, digest))

        digest_pair("mobility_kernel_id", "mobility_kernel_sha256")
        digest_pair("local_area_estimator_id", "local_area_estimator_sha256")

        if self.match_level == "EXACT_SITE":
            if (
                self.source_geography_id != self.target_geography_id
                or self.source_site_id != self.target_site_id
            ):
                raise ValueError("EXACT_SITE geometry requires identical source and target geography/site IDs")
            if self.mobility_kernel_id is not None or self.local_area_estimator_id is not None:
                raise ValueError("EXACT_SITE geometry cannot claim a mobility kernel or local-area estimator")
        elif self.match_level == "MOBILITY_WEIGHTED_CATCHMENT":
            if self.mobility_kernel_id is None:
                raise ValueError("MOBILITY_WEIGHTED_CATCHMENT requires a mobility kernel and digest")
            if self.local_area_estimator_id is not None:
                raise ValueError("MOBILITY_WEIGHTED_CATCHMENT cannot also use a local-area estimator")
            self._validate_weights()
        else:  # LOCAL_AREA_ESTIMATE
            if self.local_area_estimator_id is None:
                raise ValueError("LOCAL_AREA_ESTIMATE requires a local-area estimator and digest")
            if self.mobility_kernel_id is not None:
                raise ValueError("LOCAL_AREA_ESTIMATE cannot also use a mobility kernel")

    def _validate_weights(self) -> None:
        if self.weight_sum is None or self.effective_sample_size is None:
            raise ValueError("MOBILITY_WEIGHTED_CATCHMENT requires weight_sum and effective_sample_size")
        weight_sum = _finite("weight_sum", self.weight_sum)
        effective_sample_size = _finite("effective_sample_size", self.effective_sample_size)
        if weight_sum <= 0.0 or effective_sample_size <= 0.0:
            raise ValueError("mobility weights and effective sample size must be positive")
        object.__setattr__(self, "weight_sum", weight_sum)
        object.__setattr__(self, "effective_sample_size", effective_sample_size)


@dataclass(frozen=True)
class EndpointExposureRule:
    """Predeclared exposure-to-endpoint timing rule for one biological assay."""

    rule_id: str
    biology_role: BiologyRole
    endpoint_id: str
    target_node: str
    minimum_lag_days: float
    maximum_lag_days: float
    accumulation_rule_id: str
    biological_basis_asset_ids: tuple[str, ...]

    def __post_init__(self) -> None:
        for name in ("rule_id", "endpoint_id", "target_node", "accumulation_rule_id"):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        if self.biology_role not in _BIOLOGY_ROLES:
            raise ValueError(f"unknown biology_role: {self.biology_role!r}")
        minimum = _finite("minimum_lag_days", self.minimum_lag_days)
        maximum = _finite("maximum_lag_days", self.maximum_lag_days)
        if not 0.0 <= minimum <= maximum:
            raise ValueError("endpoint lag window must be non-negative and ordered")
        object.__setattr__(self, "minimum_lag_days", minimum)
        object.__setattr__(self, "maximum_lag_days", maximum)
        object.__setattr__(self, "biological_basis_asset_ids", _ids(
            self.biological_basis_asset_ids, "biological_basis_asset_id"
        ))


@dataclass(frozen=True)
class SentinelHumanLeadLagLink:
    """Pre-outcome sentinel-leading link between observed endpoint series.

    ``match_geometry_ids`` makes cross-site sentinel-to-human links explicit.
    The empty tuple preserves the former same-geography route for existing
    direct panels; a cross-geography or mobility-weighted link must name its
    spatial geometry and retained uncertainty.
    """

    link_id: str
    sentinel_endpoint_id: str
    human_endpoint_id: str
    target_node: str
    minimum_lead_days: float
    maximum_lead_days: float
    biological_basis_asset_ids: tuple[str, ...]
    match_geometry_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        for name in ("link_id", "sentinel_endpoint_id", "human_endpoint_id", "target_node"):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        minimum = _finite("minimum_lead_days", self.minimum_lead_days)
        maximum = _finite("maximum_lead_days", self.maximum_lead_days)
        if not 0.0 < minimum <= maximum:
            raise ValueError("sentinel lead window must be positive and ordered")
        object.__setattr__(self, "minimum_lead_days", minimum)
        object.__setattr__(self, "maximum_lead_days", maximum)
        object.__setattr__(self, "biological_basis_asset_ids", _ids(
            self.biological_basis_asset_ids, "biological_basis_asset_id"
        ))
        object.__setattr__(self, "match_geometry_ids", _ids(
            self.match_geometry_ids, "match_geometry_id", require_one=False
        ))


@dataclass(frozen=True)
class BiologicalEndpointObservation:
    """One observed, site- and time-indexed biological measurement.

    ``site_id`` may be a privacy-preserving study identifier.  Its crosswalk
    to a FieldState probe or a pre-specified local geometry is immutable and
    named in :class:`FieldStateBiologyPair`; no public coordinates are needed
    in this object.
    """

    observation_id: str
    endpoint_join_id: str
    biology_role: BiologyRole
    organism_id: str
    target_node: str
    endpoint_id: str
    endpoint_layer: EndpointLayer
    biological_sex: str
    life_stage: str
    geography_id: str
    site_id: str
    window_start: str
    window_end: str
    value: float
    unit: str
    assay_id: str
    endpoint_statistic: str
    source_ids: tuple[str, ...]
    manifest_sha256: str
    sample_size: int
    covariate_asset_ids: tuple[str, ...]
    uncertainty_lower: float | None = None
    uncertainty_upper: float | None = None
    measurement_type: str = "OBSERVED"
    provenance: Mapping[str, str] = field(default_factory=dict)

    def __post_init__(self) -> None:
        for name in (
            "observation_id",
            "endpoint_join_id",
            "organism_id",
            "target_node",
            "endpoint_id",
            "biological_sex",
            "life_stage",
            "geography_id",
            "site_id",
            "unit",
            "assay_id",
            "endpoint_statistic",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        if self.biology_role not in _BIOLOGY_ROLES:
            raise ValueError(f"unknown biology_role: {self.biology_role!r}")
        if self.endpoint_layer not in _ENDPOINT_LAYERS:
            raise ValueError(f"unknown endpoint_layer: {self.endpoint_layer!r}")
        if self.measurement_type != "OBSERVED":
            raise ValueError("a FieldState--biology panel accepts observed biological endpoints only")
        start = _instant("window_start", self.window_start)
        end = _instant("window_end", self.window_end)
        if not start < end:
            raise ValueError("biological window_start must precede window_end")
        object.__setattr__(self, "window_start", start.isoformat())
        object.__setattr__(self, "window_end", end.isoformat())
        object.__setattr__(self, "value", _finite("value", self.value))
        if (self.uncertainty_lower is None) != (self.uncertainty_upper is None):
            raise ValueError("uncertainty_lower and uncertainty_upper must be supplied together")
        if self.uncertainty_lower is not None and self.uncertainty_upper is not None:
            lower = _finite("uncertainty_lower", self.uncertainty_lower)
            upper = _finite("uncertainty_upper", self.uncertainty_upper)
            if lower > upper or not lower <= self.value <= upper:
                raise ValueError("endpoint value must lie within ordered uncertainty bounds")
            object.__setattr__(self, "uncertainty_lower", lower)
            object.__setattr__(self, "uncertainty_upper", upper)
        if isinstance(self.sample_size, bool) or not isinstance(self.sample_size, int) or self.sample_size <= 0:
            raise ValueError("sample_size must be a positive integer")
        object.__setattr__(self, "source_ids", _ids(self.source_ids, "source_id"))
        object.__setattr__(self, "manifest_sha256", _digest("manifest_sha256", self.manifest_sha256))
        object.__setattr__(self, "covariate_asset_ids", _ids(
            self.covariate_asset_ids, "covariate_asset_id"
        ))
        if not isinstance(self.provenance, Mapping):
            raise ValueError("provenance must be a mapping")

    @property
    def start(self) -> dt.datetime:
        return _instant("window_start", self.window_start)

    @property
    def end(self) -> dt.datetime:
        return _instant("window_end", self.window_end)


@dataclass(frozen=True)
class FieldStateBiologyPair:
    """A pre-specified FieldState-to-endpoint link.

    ``match_geometry_id`` may name an exact-site, mobility-weighted catchment
    or local-area route.  When omitted, the legacy direct route remains
    exact-site only.  Non-exact routes must be declared in
    :class:`SpatialMatchGeometry`; a nearby probe is never silently treated as
    a biological co-location.
    """

    pair_id: str
    endpoint_join_id: str
    fieldstate_observation_id: str
    biological_observation_id: str
    geography_id: str
    site_id: str
    endpoint_exposure_rule_id: str
    site_crosswalk_id: str
    site_crosswalk_sha256: str
    confounder_asset_ids: tuple[str, ...]
    match_geometry_id: str | None = None

    def __post_init__(self) -> None:
        for name in (
            "pair_id",
            "endpoint_join_id",
            "fieldstate_observation_id",
            "biological_observation_id",
            "geography_id",
            "site_id",
            "endpoint_exposure_rule_id",
            "site_crosswalk_id",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        object.__setattr__(self, "site_crosswalk_sha256", _digest(
            "site_crosswalk_sha256", self.site_crosswalk_sha256
        ))
        object.__setattr__(self, "confounder_asset_ids", _ids(
            self.confounder_asset_ids, "confounder_asset_id"
        ))
        if self.match_geometry_id is not None:
            object.__setattr__(self, "match_geometry_id", _nonempty(
                "match_geometry_id", self.match_geometry_id
            ))


@dataclass(frozen=True)
class LockedMeasuredFieldStateBiologyPanel:
    """Immutable local FieldState--biology panel before numerical fitting.

    The panel retains match geometry as a first-class, hash-bound input.  An
    exact-site record is the most direct local route, while mobility-weighted
    catchment and local-area records remain usable quantitative routes when
    their transport/estimation method and uncertainty are declared.
    """

    panel_id: str
    protocol_id: str
    manifest_sha256: str
    frozen_at: str
    fieldstate_observations: tuple[FieldStateObservation, ...]
    fieldstate_measurement_bindings: tuple[FieldStateMeasurementBinding, ...]
    biological_observations: tuple[BiologicalEndpointObservation, ...]
    endpoint_exposure_rules: tuple[EndpointExposureRule, ...]
    sentinel_human_lead_lag_links: tuple[SentinelHumanLeadLagLink, ...]
    pairs: tuple[FieldStateBiologyPair, ...]
    match_geometries: tuple[SpatialMatchGeometry, ...] = ()

    @classmethod
    def calculate_manifest_sha256(
        cls,
        *,
        panel_id: str,
        protocol_id: str,
        frozen_at: str,
        fieldstate_observations: Iterable[FieldStateObservation],
        fieldstate_measurement_bindings: Iterable[FieldStateMeasurementBinding],
        biological_observations: Iterable[BiologicalEndpointObservation],
        endpoint_exposure_rules: Iterable[EndpointExposureRule],
        sentinel_human_lead_lag_links: Iterable[SentinelHumanLeadLagLink],
        pairs: Iterable[FieldStateBiologyPair],
        match_geometries: Iterable[SpatialMatchGeometry] = (),
    ) -> str:
        """Return the canonical digest to be supplied as ``manifest_sha256``.

        The digest makes a lock sensitive to a changed field source, binding,
        endpoint observation, timing rule, crosswalk or pair.  It is not a
        replacement for preserving the source artifacts named by those rows.
        """
        payload = {
            "version": MEASURED_FIELDSTATE_BIOLOGY_PANEL_VERSION,
            "panel_id": _nonempty("panel_id", panel_id),
            "protocol_id": _nonempty("protocol_id", protocol_id),
            "frozen_at": _instant("frozen_at", frozen_at).isoformat(),
            "fieldstate_observations": sorted(
                (asdict(row) for row in fieldstate_observations),
                key=lambda row: str(row["observation_id"]),
            ),
            "fieldstate_measurement_bindings": sorted(
                (asdict(row) for row in fieldstate_measurement_bindings),
                key=lambda row: str(row["binding_id"]),
            ),
            "biological_observations": sorted(
                (asdict(row) for row in biological_observations),
                key=lambda row: str(row["observation_id"]),
            ),
            "endpoint_exposure_rules": sorted(
                (asdict(row) for row in endpoint_exposure_rules),
                key=lambda row: str(row["rule_id"]),
            ),
            "sentinel_human_lead_lag_links": sorted(
                (asdict(row) for row in sentinel_human_lead_lag_links),
                key=lambda row: str(row["link_id"]),
            ),
            "match_geometries": sorted(
                (asdict(row) for row in match_geometries),
                key=lambda row: str(row["geometry_id"]),
            ),
            "pairs": sorted(
                (asdict(row) for row in pairs),
                key=lambda row: str(row["pair_id"]),
            ),
        }
        return _canonical_digest(payload)

    @property
    def computed_manifest_sha256(self) -> str:
        """Compute the content digest independently of the supplied label."""
        return self.calculate_manifest_sha256(
            panel_id=self.panel_id,
            protocol_id=self.protocol_id,
            frozen_at=self.frozen_at,
            fieldstate_observations=self.fieldstate_observations,
            fieldstate_measurement_bindings=self.fieldstate_measurement_bindings,
            biological_observations=self.biological_observations,
            endpoint_exposure_rules=self.endpoint_exposure_rules,
            sentinel_human_lead_lag_links=self.sentinel_human_lead_lag_links,
            pairs=self.pairs,
            match_geometries=self.match_geometries,
        )

    def __post_init__(self) -> None:
        object.__setattr__(self, "panel_id", _nonempty("panel_id", self.panel_id))
        object.__setattr__(self, "protocol_id", _nonempty("protocol_id", self.protocol_id))
        object.__setattr__(self, "manifest_sha256", _digest("manifest_sha256", self.manifest_sha256))
        object.__setattr__(self, "frozen_at", _instant("frozen_at", self.frozen_at).isoformat())
        fieldstates = validate_fieldstate_panel(self.fieldstate_observations)
        bindings = tuple(self.fieldstate_measurement_bindings)
        biology = tuple(self.biological_observations)
        rules = tuple(self.endpoint_exposure_rules)
        lead_lag_links = tuple(self.sentinel_human_lead_lag_links)
        pairs = tuple(self.pairs)
        geometries = tuple(self.match_geometries)
        if not bindings or not all(isinstance(row, FieldStateMeasurementBinding) for row in bindings):
            raise ValueError("fieldstate_measurement_bindings must contain FieldStateMeasurementBinding values")
        if not biology or not all(isinstance(row, BiologicalEndpointObservation) for row in biology):
            raise ValueError("biological_observations must contain at least one BiologicalEndpointObservation")
        if not rules or not all(isinstance(row, EndpointExposureRule) for row in rules):
            raise ValueError("endpoint_exposure_rules must contain EndpointExposureRule values")
        if not lead_lag_links or not all(isinstance(row, SentinelHumanLeadLagLink) for row in lead_lag_links):
            raise ValueError("sentinel_human_lead_lag_links must contain SentinelHumanLeadLagLink values")
        if not pairs or not all(isinstance(pair, FieldStateBiologyPair) for pair in pairs):
            raise ValueError("pairs must contain at least one FieldStateBiologyPair")
        if not all(isinstance(row, SpatialMatchGeometry) for row in geometries):
            raise ValueError("match_geometries must contain SpatialMatchGeometry values")
        for name, values in (
            ("FieldState observation", tuple(row.observation_id for row in fieldstates)),
            ("FieldState binding", tuple(row.binding_id for row in bindings)),
            ("FieldState binding observation", tuple(row.fieldstate_observation_id for row in bindings)),
            ("biological observation", tuple(row.observation_id for row in biology)),
            ("endpoint exposure rule", tuple(row.rule_id for row in rules)),
            ("sentinel-human lead-lag link", tuple(row.link_id for row in lead_lag_links)),
            ("spatial match geometry", tuple(row.geometry_id for row in geometries)),
            ("pair", tuple(pair.pair_id for pair in pairs)),
        ):
            if len(set(values)) != len(values):
                raise ValueError(f"duplicate {name} ID in panel")
        object.__setattr__(self, "fieldstate_observations", fieldstates)
        object.__setattr__(self, "fieldstate_measurement_bindings", bindings)
        object.__setattr__(self, "biological_observations", biology)
        object.__setattr__(self, "endpoint_exposure_rules", rules)
        object.__setattr__(self, "sentinel_human_lead_lag_links", lead_lag_links)
        object.__setattr__(self, "pairs", pairs)
        object.__setattr__(self, "match_geometries", geometries)
        if self.manifest_sha256 != self.computed_manifest_sha256:
            raise ValueError("manifest_sha256 does not match canonical locked panel content")


@dataclass(frozen=True)
class EndpointCalibrationLock:
    """Pre-outcome declaration for one organ/endpoint response fit.

    The lock names only FieldState features and observed biological records.
    It cannot contain an ASFR/TFR coefficient because such a coefficient is
    outside the panel's data model entirely.
    """

    lock_id: str
    panel_id: str
    panel_manifest_sha256: str
    target_node: str
    biology_role: BiologyRole
    endpoint_id: str
    feature_ids: tuple[str, ...]
    parameter_ids: tuple[str, ...]
    scale_anchor_parameter_id: str
    training_pair_ids: tuple[str, ...]
    temporal_holdout_pair_ids: tuple[str, ...]
    geographic_holdout_site_ids: tuple[str, ...]
    response_model_id: str
    response_model_spec_sha256: str
    locked_at: str

    def __post_init__(self) -> None:
        for name in (
            "lock_id",
            "panel_id",
            "target_node",
            "endpoint_id",
            "scale_anchor_parameter_id",
            "response_model_id",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))
        object.__setattr__(self, "panel_manifest_sha256", _digest(
            "panel_manifest_sha256", self.panel_manifest_sha256
        ))
        object.__setattr__(self, "response_model_spec_sha256", _digest(
            "response_model_spec_sha256", self.response_model_spec_sha256
        ))
        if self.biology_role not in _BIOLOGY_ROLES:
            raise ValueError(f"unknown biology_role: {self.biology_role!r}")
        features = _ids(self.feature_ids, "feature_id")
        unknown = set(features) - _FIELDSTATE_FEATURE_IDS
        if unknown:
            raise ValueError(f"unknown FieldState feature IDs: {sorted(unknown)!r}")
        object.__setattr__(self, "feature_ids", features)
        parameters = _ids(self.parameter_ids, "parameter_id")
        if self.scale_anchor_parameter_id not in parameters:
            raise ValueError("scale_anchor_parameter_id must be one of parameter_ids")
        object.__setattr__(self, "parameter_ids", parameters)
        object.__setattr__(self, "training_pair_ids", _ids(self.training_pair_ids, "training_pair_id"))
        object.__setattr__(self, "temporal_holdout_pair_ids", _ids(
            self.temporal_holdout_pair_ids, "temporal_holdout_pair_id"
        ))
        object.__setattr__(self, "geographic_holdout_site_ids", _ids(
            self.geographic_holdout_site_ids, "geographic_holdout_site_id"
        ))
        object.__setattr__(self, "locked_at", _instant("locked_at", self.locked_at).isoformat())
        if set(self.training_pair_ids) & set(self.temporal_holdout_pair_ids):
            raise ValueError("training and temporal holdout pairs must not overlap")


@dataclass(frozen=True)
class MeasuredPanelReadiness:
    """Quantitative-calibration readiness, separate from model support.

    ``structural_evidence_status`` records that BERM's registered
    mechanistic and endpoint evidence remains an active constraint on graph
    topology, response direction, timing and susceptibility.  The separate
    ``quantitative_calibration_status`` answers the much narrower question of
    whether a new local FieldState-to-endpoint coefficient may be fitted.
    """

    version: str
    structural_evidence_status: StructuralEvidenceStatus
    quantitative_calibration_status: QuantitativeCalibrationStatus
    violations: tuple[PanelViolation, ...]
    ready_pair_ids: tuple[str, ...]

    @property
    def status(self) -> QuantitativeCalibrationStatus:
        """Compatibility shorthand for the *quantitative* status only."""
        return self.quantitative_calibration_status


def validate_locked_measured_panel(
    panel: LockedMeasuredFieldStateBiologyPanel,
) -> MeasuredPanelReadiness:
    """Validate the physical and biological pairing without fitting a model."""
    if not isinstance(panel, LockedMeasuredFieldStateBiologyPanel):
        raise TypeError("panel must be a LockedMeasuredFieldStateBiologyPanel")
    violations: list[PanelViolation] = []
    fieldstates = {row.observation_id: row for row in panel.fieldstate_observations}
    bindings = {
        row.fieldstate_observation_id: row for row in panel.fieldstate_measurement_bindings
    }
    biology = {row.observation_id: row for row in panel.biological_observations}
    rules = {row.rule_id: row for row in panel.endpoint_exposure_rules}
    geometries = {row.geometry_id: row for row in panel.match_geometries}
    used_fieldstates: set[str] = set()
    used_biology: set[str] = set()
    ready_pairs: list[str] = []

    for binding in panel.fieldstate_measurement_bindings:
        if binding.fieldstate_observation_id not in fieldstates:
            violations.append(PanelViolation(
                "UNKNOWN_FIELDSTATE_BINDING_OBSERVATION",
                "A FieldState measurement binding names an observation absent from the panel.",
                binding.binding_id,
            ))

    for pair in panel.pairs:
        fieldstate = fieldstates.get(pair.fieldstate_observation_id)
        endpoint = biology.get(pair.biological_observation_id)
        binding = bindings.get(pair.fieldstate_observation_id)
        exposure_rule = rules.get(pair.endpoint_exposure_rule_id)
        geometry = (
            geometries.get(pair.match_geometry_id)
            if pair.match_geometry_id is not None
            else None
        )
        pair_violations_before = len(violations)
        if fieldstate is None:
            violations.append(PanelViolation(
                "UNKNOWN_FIELDSTATE_OBSERVATION",
                "The pair references a FieldState observation absent from the locked panel.",
                pair.pair_id,
            ))
        if endpoint is None:
            violations.append(PanelViolation(
                "UNKNOWN_BIOLOGICAL_OBSERVATION",
                "The pair references a biological observation absent from the locked panel.",
                pair.pair_id,
            ))
        if binding is None:
            violations.append(PanelViolation(
                "MISSING_FIELDSTATE_MEASUREMENT_BINDING",
                "Every pair needs one typed FieldState measurement binding keyed to its observation.",
                pair.pair_id,
            ))
        if exposure_rule is None:
            violations.append(PanelViolation(
                "UNKNOWN_ENDPOINT_EXPOSURE_RULE",
                "Every pair must name a predeclared endpoint-specific exposure/lag rule.",
                pair.pair_id,
            ))
        if pair.match_geometry_id is not None and geometry is None:
            violations.append(PanelViolation(
                "UNKNOWN_SPATIAL_MATCH_GEOMETRY",
                "The pair names a spatial match geometry absent from the locked panel.",
                pair.pair_id,
            ))
        if fieldstate is None or endpoint is None or binding is None or exposure_rule is None:
            continue
        if pair.match_geometry_id is not None and geometry is None:
            continue
        used_fieldstates.add(fieldstate.observation_id)
        used_biology.add(endpoint.observation_id)
        completeness = assess_field_state_completeness(fieldstate.state, fieldstate.transfer)
        if not completeness.measurement_ready:
            violations.append(PanelViolation(
                "FIELDSTATE_NOT_MEASUREMENT_READY",
                "Every paired FieldState must include the documented local components required by v1.",
                pair.pair_id,
            ))
        if fieldstate.endpoint_join_id != pair.endpoint_join_id or endpoint.endpoint_join_id != pair.endpoint_join_id:
            violations.append(PanelViolation(
                "ENDPOINT_JOIN_NOT_PREDECLARED",
                "FieldState, biology and pair must share one pre-specified endpoint_join_id.",
                pair.pair_id,
            ))
        if fieldstate.state.country != binding.geography_id:
            violations.append(PanelViolation(
                "FIELDSTATE_BINDING_GEOGRAPHY_MISMATCH",
                "The FieldState observation must agree with its own physical measurement binding geography.",
                pair.pair_id,
            ))
        if endpoint.geography_id != pair.geography_id or endpoint.site_id != pair.site_id:
            violations.append(PanelViolation(
                "PAIR_TARGET_GEOMETRY_MISMATCH",
                "The pair geography and site must identify its biological endpoint target.",
                pair.pair_id,
            ))
        if geometry is None:
            # Compatibility route for panels written before spatial transfer
            # geometry became first-class: it remains direct exact-site only.
            if (
                endpoint.geography_id != binding.geography_id
                or binding.site_id != pair.site_id
                or endpoint.site_id != pair.site_id
            ):
                violations.append(PanelViolation(
                    "EXACT_SITE_MISMATCH",
                    "A pair without declared spatial transfer geometry must be an exact-site match.",
                    pair.pair_id,
                ))
        else:
            if (
                geometry.source_record_role != "FIELDSTATE"
                or geometry.source_record_id != fieldstate.observation_id
                or geometry.target_record_role != "BIOLOGICAL"
                or geometry.target_record_id != endpoint.observation_id
            ):
                violations.append(PanelViolation(
                    "SPATIAL_MATCH_RECORD_MISMATCH",
                    "The declared geometry must bind this FieldState record to this biological endpoint record.",
                    pair.pair_id,
                ))
            if (
                geometry.source_geography_id != binding.geography_id
                or geometry.source_site_id != binding.site_id
            ):
                violations.append(PanelViolation(
                    "SPATIAL_MATCH_SOURCE_MISMATCH",
                    "The spatial geometry source must equal the physical FieldState binding location.",
                    pair.pair_id,
                ))
            if (
                geometry.target_geography_id != endpoint.geography_id
                or geometry.target_site_id != endpoint.site_id
            ):
                violations.append(PanelViolation(
                    "SPATIAL_MATCH_TARGET_MISMATCH",
                    "The spatial geometry target must equal the biological endpoint location.",
                    pair.pair_id,
                ))
            if (
                pair.site_crosswalk_id != geometry.crosswalk_id
                or pair.site_crosswalk_sha256 != geometry.crosswalk_sha256
            ):
                violations.append(PanelViolation(
                    "SPATIAL_MATCH_CROSSWALK_MISMATCH",
                    "The pair and its spatial geometry must bind the same immutable crosswalk.",
                    pair.pair_id,
                ))
            if (
                geometry.match_level == "EXACT_SITE"
                and (binding.site_id != endpoint.site_id or binding.geography_id != endpoint.geography_id)
            ):
                violations.append(PanelViolation(
                    "EXACT_SITE_MISMATCH",
                    "EXACT_SITE is the highest-directness route and requires source and endpoint co-location.",
                    pair.pair_id,
                ))
        if fieldstate.receptor.organ != binding.target_node or endpoint.target_node != binding.target_node:
            violations.append(PanelViolation(
                "ORGAN_TARGET_MISMATCH",
                "FieldState receptor organ, binding and biological target node must agree for a direct endpoint calibration.",
                pair.pair_id,
            ))
        if (
            fieldstate.state.biological_sex != binding.biological_sex
            or endpoint.biological_sex != binding.biological_sex
            or fieldstate.state.life_stage != binding.life_stage
            or endpoint.life_stage != binding.life_stage
        ):
            violations.append(PanelViolation(
                "BIOLOGICAL_CONTEXT_MISMATCH",
                "FieldState, binding and endpoint must share declared biological sex and life stage.",
                pair.pair_id,
            ))
        if (
            exposure_rule.biology_role != endpoint.biology_role
            or exposure_rule.endpoint_id != endpoint.endpoint_id
            or exposure_rule.target_node != endpoint.target_node
        ):
            violations.append(PanelViolation(
                "ENDPOINT_EXPOSURE_RULE_MISMATCH",
                "The endpoint-specific lag rule must match the paired biological role, endpoint and target node.",
                pair.pair_id,
            ))
        lag_days = (endpoint.start - binding.end).total_seconds() / 86_400.0
        if not exposure_rule.minimum_lag_days <= lag_days <= exposure_rule.maximum_lag_days:
            violations.append(PanelViolation(
                "ENDPOINT_LAG_OUTSIDE_LOCKED_RULE",
                "The endpoint start must fall within its predeclared FieldState-to-biology lag window.",
                pair.pair_id,
            ))
        if binding.end > _instant("frozen_at", panel.frozen_at):
            violations.append(PanelViolation(
                "FIELDSTATE_AFTER_PANEL_FREEZE",
                "A locked panel cannot contain a FieldState window ending after its declared freeze instant.",
                pair.pair_id,
            ))
        if endpoint.end > _instant("frozen_at", panel.frozen_at):
            violations.append(PanelViolation(
                "BIOLOGY_AFTER_PANEL_FREEZE",
                "A locked panel cannot contain a biological window ending after its declared freeze instant.",
                pair.pair_id,
            ))
        if len(violations) == pair_violations_before:
            ready_pairs.append(pair.pair_id)

    for row in panel.fieldstate_observations:
        if row.observation_id not in used_fieldstates:
            violations.append(PanelViolation(
                "UNPAIRED_FIELDSTATE_OBSERVATION",
                "A locked calibration panel cannot contain an unpaired FieldState record.",
                row.observation_id,
            ))
    for row in panel.biological_observations:
        if row.observation_id not in used_biology:
            violations.append(PanelViolation(
                "UNPAIRED_BIOLOGICAL_OBSERVATION",
                "A locked calibration panel cannot contain an unpaired biological endpoint.",
                row.observation_id,
            ))
    present_roles = {row.biology_role for row in panel.biological_observations}
    if present_roles != _BIOLOGY_ROLES:
        violations.append(PanelViolation(
            "SENTINEL_HUMAN_CHAIN_INCOMPLETE",
            "A sentinel-leading panel requires at least one observed SENTINEL and HUMAN endpoint.",
            panel.panel_id,
        ))
    for link in panel.sentinel_human_lead_lag_links:
        unknown_link_geometries = set(link.match_geometry_ids) - set(geometries)
        if unknown_link_geometries:
            violations.append(PanelViolation(
                "UNKNOWN_SENTINEL_HUMAN_MATCH_GEOMETRY",
                "A sentinel-to-human lead link names spatial geometry absent from the locked panel.",
                link.link_id,
            ))
        sentinel_pairs = [
            (pair, biology[pair.biological_observation_id])
            for pair in panel.pairs
            if pair.biological_observation_id in biology
            and biology[pair.biological_observation_id].biology_role == "SENTINEL"
            and biology[pair.biological_observation_id].endpoint_id == link.sentinel_endpoint_id
            and biology[pair.biological_observation_id].target_node == link.target_node
        ]
        human_pairs = [
            (pair, biology[pair.biological_observation_id])
            for pair in panel.pairs
            if pair.biological_observation_id in biology
            and biology[pair.biological_observation_id].biology_role == "HUMAN"
            and biology[pair.biological_observation_id].endpoint_id == link.human_endpoint_id
            and biology[pair.biological_observation_id].target_node == link.target_node
        ]
        if not sentinel_pairs or not human_pairs:
            violations.append(PanelViolation(
                "SENTINEL_HUMAN_LINK_ENDPOINT_ABSENT",
                "Every declared sentinel-leading link needs both observed endpoint series in the panel.",
                link.link_id,
            ))
            continue
        for human_pair, human_endpoint in human_pairs:
            matched = any(
                (
                    (
                        not link.match_geometry_ids
                        and sentinel_pair.geography_id == human_pair.geography_id
                    )
                    or any(
                        geometry.source_record_role == "BIOLOGICAL"
                        and geometry.source_record_id == sentinel_endpoint.observation_id
                        and geometry.target_record_role == "BIOLOGICAL"
                        and geometry.target_record_id == human_endpoint.observation_id
                        and geometry.source_geography_id == sentinel_endpoint.geography_id
                        and geometry.source_site_id == sentinel_endpoint.site_id
                        and geometry.target_geography_id == human_endpoint.geography_id
                        and geometry.target_site_id == human_endpoint.site_id
                        for geometry_id in link.match_geometry_ids
                        if (geometry := geometries.get(geometry_id)) is not None
                    )
                )
                and link.minimum_lead_days
                <= (human_endpoint.start - sentinel_endpoint.end).total_seconds() / 86_400.0
                <= link.maximum_lead_days
                for sentinel_pair, sentinel_endpoint in sentinel_pairs
            )
            if not matched:
                violations.append(PanelViolation(
                    "SENTINEL_HUMAN_LEAD_LAG_NOT_OBSERVED",
                    "A human endpoint lacks a declared spatially linked sentinel observation in the locked positive lead window.",
                    human_pair.pair_id,
                ))
    return MeasuredPanelReadiness(
        version=MEASURED_FIELDSTATE_BIOLOGY_PANEL_VERSION,
        structural_evidence_status="ACTIVE",
        quantitative_calibration_status=(
            "READY_FOR_ENDPOINT_CALIBRATION"
            if not violations
            else "PENDING_MATCHED_CALIBRATION"
        ),
        violations=tuple(violations),
        ready_pair_ids=tuple(ready_pairs),
    )


def validate_endpoint_calibration_lock(
    panel: LockedMeasuredFieldStateBiologyPanel,
    lock: EndpointCalibrationLock,
) -> tuple[PanelViolation, ...]:
    """Validate a pre-outcome endpoint-calibration split.

    This validator deliberately returns only eligibility violations.  Fitting
    an effect slope, its uncertainty, and an organ R/P increment remains a
    study-specific numerical step that may run only after this lock passes.
    """
    if not isinstance(panel, LockedMeasuredFieldStateBiologyPanel):
        raise TypeError("panel must be a LockedMeasuredFieldStateBiologyPanel")
    if not isinstance(lock, EndpointCalibrationLock):
        raise TypeError("lock must be an EndpointCalibrationLock")
    violations = list(validate_locked_measured_panel(panel).violations)
    if lock.panel_id != panel.panel_id:
        violations.append(PanelViolation(
            "LOCK_PANEL_MISMATCH", "The endpoint lock names a different panel.", lock.lock_id,
        ))
        return tuple(violations)
    if lock.panel_manifest_sha256 != panel.manifest_sha256 or panel.manifest_sha256 != panel.computed_manifest_sha256:
        violations.append(PanelViolation(
            "LOCK_PANEL_MANIFEST_MISMATCH",
            "The endpoint lock must bind the exact verified canonical panel manifest.",
            lock.lock_id,
        ))
    if _instant("frozen_at", panel.frozen_at) > _instant("locked_at", lock.locked_at):
        violations.append(PanelViolation(
            "PANEL_FROZEN_AFTER_PARAMETER_LOCK",
            "The full panel must be frozen before its endpoint-calibration lock.",
            lock.lock_id,
        ))
    pairs = {pair.pair_id: pair for pair in panel.pairs}
    biology = {row.observation_id: row for row in panel.biological_observations}
    bindings = {
        row.fieldstate_observation_id: row for row in panel.fieldstate_measurement_bindings
    }
    known_pair_ids = set(pairs)
    for pair_id in (*lock.training_pair_ids, *lock.temporal_holdout_pair_ids):
        if pair_id not in known_pair_ids:
            violations.append(PanelViolation(
                "UNKNOWN_LOCK_PAIR", "The endpoint lock names a pair absent from the panel.", pair_id,
            ))
    training_sites = {pairs[pair_id].site_id for pair_id in lock.training_pair_ids if pair_id in pairs}
    if training_sites & set(lock.geographic_holdout_site_ids):
        violations.append(PanelViolation(
            "GEOGRAPHIC_HOLDOUT_LEAKS_TRAINING",
            "A geographic holdout site cannot appear in endpoint-calibration training pairs.",
            lock.lock_id,
        ))
    known_sites = {pair.site_id for pair in panel.pairs}
    unknown_holdout_sites = set(lock.geographic_holdout_site_ids) - known_sites
    if unknown_holdout_sites:
        violations.append(PanelViolation(
            "UNKNOWN_GEOGRAPHIC_HOLDOUT_SITE",
            "Every geographic holdout must identify an observed panel site.",
            lock.lock_id,
        ))
    holdout_pairs_at_site = [
        pair for pair in panel.pairs if pair.site_id in set(lock.geographic_holdout_site_ids)
    ]
    if not holdout_pairs_at_site:
        violations.append(PanelViolation(
            "GEOGRAPHIC_HOLDOUT_NOT_POPULATED",
            "A geographic holdout must contain observed held-out pairs, not only a site label.",
            lock.lock_id,
        ))
    training_endpoints: list[BiologicalEndpointObservation] = []
    temporal_holdout_bindings: list[FieldStateMeasurementBinding] = []
    for pair_id in (*lock.training_pair_ids, *lock.temporal_holdout_pair_ids):
        pair = pairs.get(pair_id)
        if pair is None:
            continue
        endpoint = biology.get(pair.biological_observation_id)
        binding = bindings.get(pair.fieldstate_observation_id)
        if endpoint is None or binding is None:
            # The panel validator has already emitted the exact missing-row
            # violation.  Avoid an internal KeyError masking that result.
            continue
        if endpoint.biology_role != lock.biology_role or endpoint.endpoint_id != lock.endpoint_id:
            violations.append(PanelViolation(
                "LOCK_TARGET_ENDPOINT_MISMATCH",
                "Endpoint calibration must target the declared observed biological endpoint and role.",
                pair_id,
            ))
        if endpoint.target_node != lock.target_node:
            violations.append(PanelViolation(
                "LOCK_TARGET_NODE_MISMATCH",
                "The lock target node must equal the paired biological target node.",
                pair_id,
            ))
        if binding.end > _instant("locked_at", lock.locked_at) or endpoint.end > _instant("locked_at", lock.locked_at):
            violations.append(PanelViolation(
                "PAIR_AFTER_PARAMETER_LOCK",
                "A FieldState or biological endpoint window ends after the declared parameter lock instant.",
                pair_id,
            ))
        if pair_id in lock.training_pair_ids:
            training_endpoints.append(endpoint)
        if pair_id in lock.temporal_holdout_pair_ids:
            temporal_holdout_bindings.append(binding)
    if training_endpoints and temporal_holdout_bindings:
        latest_training = max(endpoint.end for endpoint in training_endpoints)
        earliest_holdout = min(binding.start for binding in temporal_holdout_bindings)
        if earliest_holdout <= latest_training:
            violations.append(PanelViolation(
                "TEMPORAL_HOLDOUT_NOT_FUTURE",
                "The temporal FieldState holdout must begin strictly after every target-endpoint training window.",
                lock.lock_id,
            ))
    return tuple(violations)


def current_measured_fieldstate_biology_readiness() -> MeasuredPanelReadiness:
    """Report what is pending for a new coefficient, without downgrading evidence.

    The returned violations describe the next missing *measurement-linkage*
    assets.  They do not erase the registered experimental, mechanistic,
    animal, human-endpoint or cross-species evidence that constrains the
    BERM causal graph before a local coefficient is estimated.
    """
    return MeasuredPanelReadiness(
        version=MEASURED_FIELDSTATE_BIOLOGY_PANEL_VERSION,
        structural_evidence_status="ACTIVE",
        quantitative_calibration_status="PENDING_MATCHED_CALIBRATION",
        ready_pair_ids=(),
        violations=(
            PanelViolation(
                "ANFR_AMBIENT_ONLY",
                "The held ANFR records are measured fixed-probe ambient RF, not complete organ-local FieldState observations.",
                "ANFR_AUTONOMOUS_RF_PROBES",
            ),
            PanelViolation(
                "NO_LOCKED_SPATIOTEMPORAL_BIOLOGY_PANEL",
                "No held biological endpoint panel is yet linked to ANFR through an exact-site, mobility-weighted catchment or local-area spatial-temporal contract.",
                "measured_rf_site_time",
            ),
            PanelViolation(
                "NO_SENTINEL_HUMAN_CHAIN",
                "No held panel yet contains both observed sentinel and human biological endpoints under one FieldState protocol.",
                "sentinel_human_biology",
            ),
        ),
    )


__all__ = [
    "BiologicalEndpointObservation",
    "EndpointCalibrationLock",
    "EndpointExposureRule",
    "FieldStateBiologyPair",
    "FieldStateMeasurementBinding",
    "LockedMeasuredFieldStateBiologyPanel",
    "MatchLevel",
    "MEASURED_FIELDSTATE_BIOLOGY_PANEL_VERSION",
    "MeasuredPanelReadiness",
    "PanelViolation",
    "SentinelHumanLeadLagLink",
    "SpatialMatchGeometry",
    "current_measured_fieldstate_biology_readiness",
    "validate_endpoint_calibration_lock",
    "validate_locked_measured_panel",
]
