"""Field sensitivity located in transferable membrane machinery.

Vesicles prepared from myoblasts responded to a pulsed field with a calcium
signal; vesicles prepared from TRPC1-silenced cells did not, and vesicles from
normal cells partly restored field-associated respiratory and growth responses
in TRPC1-silenced recipient cells [HAVAINTO: Kurth et al. 2020].

The property this adds to the modulome: **receptor function can be partly
transferable with the membrane structure**.  Producing the acute local
response did not require an entire intact source cell in that design.

The model consequence is that a channel count is not the receptor coordinate.
The coordinate is the membrane itself: composition, protein complexes and
their location.  ``MembraneMachinery.receptor_competence`` therefore requires
all three, and a preparation with the channel present but the complex absent
is not competent.

The distinction between a prepared vesicle and a natural transfer inside
tissue is carried in the type: ``TransferMode.PREPARED_VESICLE`` is the
observed design; ``TransferMode.NATIVE_TISSUE`` is a separate hypothesis and
is labelled as such in every result it produces.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum

from berm.modulome._common import (
    MODULOME_VERSION,
    STRUCTURAL_ONLY,
    check_calibration_status,
    nonempty,
    normalise_ids,
    unit_interval,
)

__all__ = [
    "MembraneMachinery",
    "TransferMode",
    "TransferResult",
    "transfer_machinery",
]


class TransferMode(Enum):
    """How the machinery reached the recipient."""

    #: Vesicles prepared from donor cells and applied to recipients.
    PREPARED_VESICLE = "PREPARED_VESICLE"
    #: The same movement occurring within tissue: a separate hypothesis.
    NATIVE_TISSUE = "NATIVE_TISSUE"


@dataclass(frozen=True)
class MembraneMachinery:
    """Membrane composition, complexes and localisation — the receptor unit."""

    machinery_id: str
    channel_density: float
    complex_integrity: float
    localisation_fidelity: float
    lipid_order: float
    channel_ids: tuple[str, ...] = ()
    calibration_status: str = STRUCTURAL_ONLY
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        object.__setattr__(self, "machinery_id", nonempty("machinery_id", self.machinery_id))
        for name in (
            "channel_density",
            "complex_integrity",
            "localisation_fidelity",
            "lipid_order",
        ):
            object.__setattr__(self, name, unit_interval(name, getattr(self, name)))
        object.__setattr__(self, "channel_ids", normalise_ids(self.channel_ids, "channel_id"))
        check_calibration_status(self.calibration_status)
        object.__setattr__(self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_id"))

    @property
    def receptor_competence(self) -> float:
        """Competence requires channel, complex and location together.

        The product form is the claim: a preparation retaining the channel but
        losing the complex or its location is not a competent receptor, which
        is why a channel count alone does not predict the response.
        """
        return (
            self.channel_density
            * self.complex_integrity
            * self.localisation_fidelity
            * self.lipid_order
        )

    def without_channel(self, channel_id: str) -> "MembraneMachinery":
        """Silencing arm: remove one named channel from the preparation."""
        name = nonempty("channel_id", channel_id)
        if name not in self.channel_ids:
            raise ValueError(f"{name!r} is not part of {self.machinery_id!r}")
        return MembraneMachinery(
            machinery_id=f"{self.machinery_id}.without-{name}",
            channel_density=0.0,
            complex_integrity=0.0,
            localisation_fidelity=self.localisation_fidelity,
            lipid_order=self.lipid_order,
            channel_ids=tuple(cid for cid in self.channel_ids if cid != name),
            calibration_status=self.calibration_status,
            evidence_ids=self.evidence_ids,
        )


@dataclass(frozen=True)
class TransferResult:
    """Recipient competence after a transfer, with the mode kept visible."""

    donor_id: str
    recipient_id: str
    mode: TransferMode
    donor_competence: float
    recipient_competence_before: float
    recipient_competence_after: float
    recovered_fraction: float
    is_observed_design: bool
    modulome_version: str = MODULOME_VERSION

    @property
    def restored(self) -> bool:
        return self.recipient_competence_after > self.recipient_competence_before


def transfer_machinery(
    donor: MembraneMachinery,
    recipient: MembraneMachinery,
    *,
    mode: TransferMode,
    delivered_fraction: float,
) -> TransferResult:
    """Deliver a fraction of donor machinery competence to a recipient.

    ``delivered_fraction`` is the registered delivery efficiency of the
    preparation.  Restoration is partial by construction: the recipient does
    not acquire the donor's full competence.
    """
    if not isinstance(donor, MembraneMachinery) or not isinstance(recipient, MembraneMachinery):
        raise TypeError("donor and recipient must be MembraneMachinery values")
    if not isinstance(mode, TransferMode):
        raise TypeError("mode must be a TransferMode")
    fraction = unit_interval("delivered_fraction", delivered_fraction)

    before = recipient.receptor_competence
    delivered = donor.receptor_competence * fraction
    after = min(1.0, before + delivered)
    gap = donor.receptor_competence - before
    recovered = 0.0 if gap <= 0.0 else min(1.0, (after - before) / gap)

    return TransferResult(
        donor_id=donor.machinery_id,
        recipient_id=recipient.machinery_id,
        mode=mode,
        donor_competence=donor.receptor_competence,
        recipient_competence_before=before,
        recipient_competence_after=after,
        recovered_fraction=recovered,
        is_observed_design=mode is TransferMode.PREPARED_VESICLE,
    )
