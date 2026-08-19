"""Vector-, geometry-, spectrum-, and circadian-aware FieldState boundary.

This module implements the *input contract* implied by the Lindgren layer,
without changing a legacy TFR prediction or inventing an outcome coefficient.

The legacy scalar remains available separately:

    ambient + chi(ambient) * personal

For a scalar-compatible FieldState, the adapter below maps all channels to one
collinear axis and returns that number exactly.  A richer state additionally
retains the local background/personal vector cross-term, an organ transfer
map, measured envelope/beat PSD overlap, and time-of-day context.

All vectors supplied here must already be transformed to one documented,
dimensionless coupling scale.  This class intentionally does not add raw
tesla, V/m, SAR, device-use, or geomagnetic measurements.
"""

from __future__ import annotations

from dataclasses import dataclass, field
import math
from typing import Any, Mapping


FIELD_STATE_VERSION = "field-state-v1"


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


def _nonnegative(name: str, value: float) -> float:
    result = _finite(name, value)
    if result < 0.0:
        raise ValueError(f"{name} must be non-negative")
    return result


@dataclass(frozen=True)
class Vector3:
    """Signed three-axis vector in a declared common coordinate system."""

    x: float
    y: float
    z: float

    def __post_init__(self) -> None:
        object.__setattr__(self, "x", _finite("x", self.x))
        object.__setattr__(self, "y", _finite("y", self.y))
        object.__setattr__(self, "z", _finite("z", self.z))

    @classmethod
    def scalar(cls, value: float) -> "Vector3":
        """Embed one legacy non-negative scalar in a collinear x-axis."""
        return cls(_nonnegative("value", value), 0.0, 0.0)

    @property
    def norm(self) -> float:
        return math.sqrt(self.x * self.x + self.y * self.y + self.z * self.z)

    def dot(self, other: "Vector3") -> float:
        return self.x * other.x + self.y * other.y + self.z * other.z

    def scaled(self, factor: float) -> "Vector3":
        scalar = _finite("factor", factor)
        return Vector3(self.x * scalar, self.y * scalar, self.z * scalar)

    def plus(self, other: "Vector3") -> "Vector3":
        return Vector3(self.x + other.x, self.y + other.y, self.z + other.z)

    def unit(self) -> "Vector3":
        magnitude = self.norm
        if magnitude == 0.0:
            raise ValueError("cannot normalise a zero Vector3")
        return self.scaled(1.0 / magnitude)


@dataclass(frozen=True)
class TransferMatrix:
    """Organ/local geometry map ``T_o`` from source to local coordinates.

    In a full dosimetry route, frequency, polarization, posture, distance,
    tissue and building effects are estimated upstream.  The matrix preserves
    that calculation as an explicit, named input.  Identity is only the
    backwards-compatible default.
    """

    row_x: Vector3 = Vector3(1.0, 0.0, 0.0)
    row_y: Vector3 = Vector3(0.0, 1.0, 0.0)
    row_z: Vector3 = Vector3(0.0, 0.0, 1.0)
    transfer_id: str = "identity"

    def __post_init__(self) -> None:
        if not isinstance(self.transfer_id, str) or not self.transfer_id.strip():
            raise ValueError("transfer_id must be a non-empty string")
        object.__setattr__(self, "transfer_id", self.transfer_id.strip())

    def apply(self, vector: Vector3) -> Vector3:
        return Vector3(
            self.row_x.dot(vector),
            self.row_y.dot(vector),
            self.row_z.dot(vector),
        )


IDENTITY_TRANSFER = TransferMatrix()


@dataclass(frozen=True)
class SpectralBin:
    """One finite-width measured envelope or beat PSD bin."""

    frequency_hz: float
    power_density: float
    bandwidth_hz: float

    def __post_init__(self) -> None:
        object.__setattr__(
            self, "frequency_hz", _nonnegative("frequency_hz", self.frequency_hz)
        )
        object.__setattr__(
            self, "power_density", _nonnegative("power_density", self.power_density)
        )
        object.__setattr__(
            self, "bandwidth_hz", _nonnegative("bandwidth_hz", self.bandwidth_hz)
        )


@dataclass(frozen=True)
class ResonanceWindow:
    """Declared Gaussian response window for one receptor/organ state."""

    center_hz: float
    sigma_hz: float
    window_id: str

    def __post_init__(self) -> None:
        object.__setattr__(self, "center_hz", _nonnegative("center_hz", self.center_hz))
        sigma = _nonnegative("sigma_hz", self.sigma_hz)
        if sigma <= 0.0:
            raise ValueError("sigma_hz must be > 0")
        object.__setattr__(self, "sigma_hz", sigma)
        if not isinstance(self.window_id, str) or not self.window_id.strip():
            raise ValueError("window_id must be a non-empty string")
        object.__setattr__(self, "window_id", self.window_id.strip())

    def weight(self, frequency_hz: float) -> float:
        z = (_nonnegative("frequency_hz", frequency_hz) - self.center_hz) / self.sigma_hz
        return math.exp(-0.5 * z * z)


# Matches the diagnostic R42 Gaussian already used by r42_envelope.py.
R42_WINDOW = ResonanceWindow(0.030, 0.005, "R42_20_40_mHz")


@dataclass(frozen=True)
class CircadianState:
    """Measured or explicitly modelled time-of-day covariates.

    They remain observable modifiers, rather than a new hard-coded CRY or
    fertility coefficient.  A pathway can later use them under a separately
    registered parameterisation.
    """

    night_fraction: float = 0.0
    circadian_phase: float | None = None
    light_fraction: float | None = None
    state_id: str = "unspecified"

    def __post_init__(self) -> None:
        night = _finite("night_fraction", self.night_fraction)
        if not 0.0 <= night <= 1.0:
            raise ValueError("night_fraction must be in [0, 1]")
        object.__setattr__(self, "night_fraction", night)
        for name in ("circadian_phase", "light_fraction"):
            value = getattr(self, name)
            if value is None:
                continue
            value = _finite(name, value)
            if not 0.0 <= value <= 1.0:
                raise ValueError(f"{name} must be in [0, 1]")
            object.__setattr__(self, name, value)
        if not isinstance(self.state_id, str) or not self.state_id.strip():
            raise ValueError("state_id must be a non-empty string")
        object.__setattr__(self, "state_id", self.state_id.strip())


@dataclass(frozen=True)
class SourceCoupling:
    """Measured phase/coherence relation between background and personal fields.

    Unknown phase or coherence yields a zero coherent-cross estimate.  It does
    not erase the independently reported vector cross-term, and it avoids
    pretending unrelated sources are phase locked.
    """

    relative_phase_rad: float | None = None
    coherence: float | None = None
    coupling_id: str = "not_measured"

    def __post_init__(self) -> None:
        if self.relative_phase_rad is not None:
            object.__setattr__(
                self, "relative_phase_rad", _finite("relative_phase_rad", self.relative_phase_rad)
            )
        if self.coherence is not None:
            coherence = _finite("coherence", self.coherence)
            if not 0.0 <= coherence <= 1.0:
                raise ValueError("coherence must be in [0, 1]")
            object.__setattr__(self, "coherence", coherence)
        if not isinstance(self.coupling_id, str) or not self.coupling_id.strip():
            raise ValueError("coupling_id must be a non-empty string")
        object.__setattr__(self, "coupling_id", self.coupling_id.strip())

    @property
    def phase_weight(self) -> float:
        if self.relative_phase_rad is None or self.coherence is None:
            return 0.0
        return self.coherence * math.cos(self.relative_phase_rad)


@dataclass(frozen=True)
class ReceptorState:
    """Organ/receptor covariates needed to interpret a local FieldState."""

    organ: str
    tissue_axis: Vector3 = Vector3(1.0, 0.0, 0.0)
    frequency_window: ResonanceWindow | None = None
    membrane_order: float | None = None
    redox_state: float | None = None
    receptor_id: str = "unspecified"

    def __post_init__(self) -> None:
        if not isinstance(self.organ, str) or not self.organ.strip():
            raise ValueError("organ must be a non-empty string")
        object.__setattr__(self, "organ", self.organ.strip())
        object.__setattr__(self, "tissue_axis", self.tissue_axis.unit())
        for name in ("membrane_order", "redox_state"):
            value = getattr(self, name)
            if value is not None:
                resolved = _finite(name, value)
                if not 0.0 <= resolved <= 1.0:
                    raise ValueError(f"{name} must be in [0, 1]")
                object.__setattr__(self, name, resolved)
        if not isinstance(self.receptor_id, str) or not self.receptor_id.strip():
            raise ValueError("receptor_id must be a non-empty string")
        object.__setattr__(self, "receptor_id", self.receptor_id.strip())


@dataclass(frozen=True)
class FieldState:
    """A local FieldState before it is passed into a biological pathway.

    ``background`` is the normalized slowly varying selection field.
    ``ambient`` and ``personal`` are normalized source-channel vectors.
    ``geomagnetic_b0`` may be retained as a native-unit covariate but is never
    arithmetic-combined with the normalized vectors in this module.
    """

    background: Vector3
    ambient: Vector3
    personal: Vector3
    normalization_id: str
    country: str | None = None
    area: str | None = None
    setting: str | None = None
    cohort_id: str | int | None = None
    biological_sex: str | None = None
    life_stage: str | None = None
    year: int | None = None
    geomagnetic_b0: Vector3 | None = None
    geomagnetic_b0_unit: str | None = None
    ambient_envelope_psd: tuple[SpectralBin, ...] = ()
    personal_envelope_psd: tuple[SpectralBin, ...] = ()
    mixed_envelope_psd: tuple[SpectralBin, ...] = ()
    circadian: CircadianState = field(default_factory=CircadianState)
    source_coupling: SourceCoupling = field(default_factory=SourceCoupling)
    provenance: Mapping[str, Any] = field(default_factory=dict)

    def __post_init__(self) -> None:
        if not isinstance(self.normalization_id, str) or not self.normalization_id.strip():
            raise ValueError("normalization_id must be a non-empty string")
        object.__setattr__(self, "normalization_id", self.normalization_id.strip())
        for name in ("country", "area", "setting", "biological_sex", "life_stage"):
            value = getattr(self, name)
            if value is not None and (not isinstance(value, str) or not value.strip()):
                raise ValueError(f"{name} must be a non-empty string or None")
            if isinstance(value, str):
                object.__setattr__(self, name, value.strip())
        if self.cohort_id is not None and not isinstance(self.cohort_id, (str, int)):
            raise ValueError("cohort_id must be a string, integer, or None")
        if isinstance(self.cohort_id, str) and not self.cohort_id.strip():
            raise ValueError("cohort_id must be a non-empty string or None")
        if isinstance(self.cohort_id, str):
            object.__setattr__(self, "cohort_id", self.cohort_id.strip())
        if self.year is not None:
            if isinstance(self.year, bool) or int(self.year) != self.year:
                raise ValueError("year must be an integer or None")
            object.__setattr__(self, "year", int(self.year))
        if self.geomagnetic_b0 is None and self.geomagnetic_b0_unit is not None:
            raise ValueError("geomagnetic_b0_unit requires geomagnetic_b0")
        if self.geomagnetic_b0 is not None:
            if (
                not isinstance(self.geomagnetic_b0_unit, str)
                or not self.geomagnetic_b0_unit.strip()
            ):
                raise ValueError(
                    "geomagnetic_b0_unit must be a non-empty string when geomagnetic_b0 is supplied"
                )
            object.__setattr__(
                self, "geomagnetic_b0_unit", self.geomagnetic_b0_unit.strip()
            )
        for name in (
            "ambient_envelope_psd",
            "personal_envelope_psd",
            "mixed_envelope_psd",
        ):
            bins = tuple(getattr(self, name))
            if not all(isinstance(bin_, SpectralBin) for bin_ in bins):
                raise ValueError(f"{name} must contain SpectralBin values")
            object.__setattr__(self, name, bins)
        if not isinstance(self.provenance, Mapping):
            raise ValueError("provenance must be a mapping")

    @classmethod
    def from_legacy_channels(
        cls,
        ambient: float,
        personal: float,
        *,
        country: str | None = None,
        year: int | None = None,
        provenance: Mapping[str, Any] | None = None,
    ) -> "FieldState":
        """Create the exact collinear special case used by legacy BERM."""
        ambient_vector = Vector3.scalar(ambient)
        return cls(
            background=ambient_vector,
            ambient=ambient_vector,
            personal=Vector3.scalar(personal),
            normalization_id="legacy_scalar_dimensionless",
            country=country,
            year=year,
            provenance={
                "adapter": "FieldState.from_legacy_channels",
                "interpretation": (
                    "legacy ambient + chi(ambient) * personal timing proxy; "
                    "not a physical dosimetry conversion"
                ),
                **(dict(provenance) if provenance is not None else {}),
            },
        )


@dataclass(frozen=True)
class FieldStateResponse:
    """A transparent local calculation record, not a biological dose."""

    field_state_version: str
    organ: str
    transfer_id: str
    normalization_id: str
    background_magnitude: float
    chi: float
    selected_vector: Vector3
    selected_vector_magnitude: float
    tissue_axis_projection: float
    background_personal_cosine: float | None
    geometric_cross_term: float
    coherent_cross_term: float
    legacy_timing_proxy: float
    ambient_envelope_overlap: float
    personal_envelope_overlap: float
    mixed_envelope_overlap: float
    night_selected_projection: float
    window_id: str | None
    completeness: "FieldStateCompleteness"


@dataclass(frozen=True)
class FieldStateCompleteness:
    """Explicitly distinguish a timing proxy from a measurement-ready state.

    A national mobile/urban proxy can be converted through
    :meth:`FieldState.from_legacy_channels`, but that record is always marked
    ``LEGACY_TIMING_PROXY``.  It can never silently become a full local
    FieldState merely because it has been embedded in three vector components.
    """

    status: str
    measurement_ready: bool
    present_components: tuple[str, ...]
    missing_components: tuple[str, ...]


def assess_field_state_completeness(
    state: FieldState,
    transfer: TransferMatrix = IDENTITY_TRANSFER,
) -> FieldStateCompleteness:
    """Report whether the supplied record contains the v1 physical inputs.

    ``MEASUREMENT_READY_FIELD_STATE`` means all named v1 inputs are present,
    documented, and not using the legacy scalar adapter.  It does *not* mean
    that a biological effect or an outcome coefficient has been established.
    """
    if not isinstance(state, FieldState):
        raise TypeError("state must be a FieldState")
    if not isinstance(transfer, TransferMatrix):
        raise TypeError("transfer must be a TransferMatrix")

    if (
        state.normalization_id.startswith("legacy_")
        or state.provenance.get("adapter") == "FieldState.from_legacy_channels"
    ):
        return FieldStateCompleteness(
            status="LEGACY_TIMING_PROXY",
            measurement_ready=False,
            present_components=("legacy_scalar_channels",),
            missing_components=(
                "field_normalisation_calibration",
                "measured_background_vector",
                "organ_transfer",
                "measured_envelope_or_beat_psd",
                "circadian_context",
                "phase_and_coherence",
                "measurement_provenance",
            ),
        )

    has_provenance = any(
        state.provenance.get(key)
        for key in ("source_id", "dataset_id", "measurement_id", "collection_method")
    )
    has_normalisation = any(
        state.provenance.get(key)
        for key in ("normalization_reference", "normalisation_reference", "calibration_id")
    )
    observed = {
        "field_normalisation_calibration": has_normalisation,
        "measured_background_vector": state.geomagnetic_b0 is not None,
        "organ_transfer": transfer.transfer_id != "identity",
        "measured_envelope_or_beat_psd": bool(
            state.ambient_envelope_psd
            or state.personal_envelope_psd
            or state.mixed_envelope_psd
        ),
        "circadian_context": state.circadian.state_id != "unspecified",
        "phase_and_coherence": (
            state.source_coupling.relative_phase_rad is not None
            and state.source_coupling.coherence is not None
        ),
        "measurement_provenance": has_provenance,
    }
    present = tuple(name for name, value in observed.items() if value)
    missing = tuple(name for name, value in observed.items() if not value)
    return FieldStateCompleteness(
        status=(
            "MEASUREMENT_READY_FIELD_STATE"
            if not missing
            else "PARTIAL_FIELD_STATE"
        ),
        measurement_ready=not missing,
        present_components=present,
        missing_components=missing,
    )


def lindgren_chi(background_magnitude: float) -> float:
    """Return ``A / sqrt(1 + A²)`` for a normalized non-negative magnitude."""
    amplitude = _nonnegative("background_magnitude", background_magnitude)
    return amplitude / math.sqrt(1.0 + amplitude * amplitude)


def spectral_overlap(
    spectrum: tuple[SpectralBin, ...],
    window: ResonanceWindow | None,
) -> float:
    """Integrate a supplied PSD against a declared receptor response window."""
    if window is None:
        return 0.0
    return sum(
        bin_.power_density * bin_.bandwidth_hz * window.weight(bin_.frequency_hz)
        for bin_ in spectrum
    )


def evaluate_field_state(
    state: FieldState,
    receptor: ReceptorState,
    transfer: TransferMatrix = IDENTITY_TRANSFER,
) -> FieldStateResponse:
    """Resolve local Lindgren components for one organ/receptor.

    The selected vector is ``T(Aambient) + chi(|T(Abackground)|)T(Apersonal)``.
    The separately visible cross term is
    ``2 * T(Abackground) dot T(Apersonal)``.  In the scalar adapter both
    reduce to the existing legacy calculation as appropriate.
    """
    if not isinstance(state, FieldState):
        raise TypeError("state must be a FieldState")
    if not isinstance(receptor, ReceptorState):
        raise TypeError("receptor must be a ReceptorState")
    if not isinstance(transfer, TransferMatrix):
        raise TypeError("transfer must be a TransferMatrix")

    background = transfer.apply(state.background)
    ambient = transfer.apply(state.ambient)
    personal = transfer.apply(state.personal)

    background_magnitude = background.norm
    selection = lindgren_chi(background_magnitude)
    selected = ambient.plus(personal.scaled(selection))
    axis_projection = selected.dot(receptor.tissue_axis)

    personal_magnitude = personal.norm
    if background_magnitude == 0.0 or personal_magnitude == 0.0:
        cosine: float | None = None
    else:
        cosine = max(
            -1.0,
            min(1.0, background.dot(personal) / (background_magnitude * personal_magnitude)),
        )

    geometric_cross = 2.0 * background.dot(personal)
    window = receptor.frequency_window
    completeness = assess_field_state_completeness(state, transfer)
    return FieldStateResponse(
        field_state_version=FIELD_STATE_VERSION,
        organ=receptor.organ,
        transfer_id=transfer.transfer_id,
        normalization_id=state.normalization_id,
        background_magnitude=background_magnitude,
        chi=selection,
        selected_vector=selected,
        selected_vector_magnitude=selected.norm,
        tissue_axis_projection=axis_projection,
        background_personal_cosine=cosine,
        geometric_cross_term=geometric_cross,
        coherent_cross_term=geometric_cross * state.source_coupling.phase_weight,
        legacy_timing_proxy=ambient.norm + selection * personal_magnitude,
        ambient_envelope_overlap=spectral_overlap(state.ambient_envelope_psd, window),
        personal_envelope_overlap=spectral_overlap(state.personal_envelope_psd, window),
        mixed_envelope_overlap=spectral_overlap(state.mixed_envelope_psd, window),
        night_selected_projection=axis_projection * state.circadian.night_fraction,
        window_id=None if window is None else window.window_id,
        completeness=completeness,
    )


__all__ = [
    "FIELD_STATE_VERSION",
    "IDENTITY_TRANSFER",
    "R42_WINDOW",
    "CircadianState",
    "FieldState",
    "FieldStateCompleteness",
    "FieldStateResponse",
    "ReceptorState",
    "ResonanceWindow",
    "SourceCoupling",
    "SpectralBin",
    "TransferMatrix",
    "Vector3",
    "assess_field_state_completeness",
    "evaluate_field_state",
    "lindgren_chi",
    "spectral_overlap",
]
