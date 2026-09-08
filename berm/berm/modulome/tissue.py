"""The local tissue environment as its own module.

Two observations put the environment between the receptor and the endpoint:

* medium from radiofrequency-exposed cells carried a protective effect to
  unexposed recipient cells [HAVAINTO: Zeni et al. 2021];
* a short pulsed-field exposure changed macrophage function through a
  TRPC1-STING-NF-kB route, and silencing or blocking TRPC1 removed the
  reported responses; co-cultures examined phagocytosis of cancer cells
  [HAVAINTO: Sukumar et al. 2026].

Together with the vesicle result in :mod:`berm.modulome.membrane` this makes
two different things transferable: the receptor machinery itself, and the
later biological message.  That is why an isolated cell and the same cell type
in tissue can respond differently.

One rule is enforced in the type system rather than in prose: a rise in an
inflammatory or calcium signal is not an outcome.  ``functional_endpoint`` is
required and must be non-empty, so a record cannot report "signal increased"
without naming the cell or tissue function that changed.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Mapping

from berm.modulome._common import (
    MODULOME_VERSION,
    STRUCTURAL_ONLY,
    check_calibration_status,
    finite,
    nonempty,
    nonnegative,
    normalise_ids,
    read_only_measurements,
    unit_interval,
)

__all__ = [
    "BystanderResponse",
    "ImmuneFunctionResponse",
    "TissueEnvironment",
    "bystander_transfer",
    "immune_functional_response",
]


@dataclass(frozen=True)
class TissueEnvironment:
    """Density, secreted mediators, recipient state and immune competence."""

    environment_id: str
    cell_density: float
    recipient_readiness: float = 1.0
    immune_competence: float = 1.0
    secreted_mediators: Mapping[str, float] = field(default_factory=dict)
    calibration_status: str = STRUCTURAL_ONLY
    evidence_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        object.__setattr__(
            self, "environment_id", nonempty("environment_id", self.environment_id)
        )
        object.__setattr__(self, "cell_density", nonnegative("cell_density", self.cell_density))
        for name in ("recipient_readiness", "immune_competence"):
            object.__setattr__(self, name, unit_interval(name, getattr(self, name)))
        object.__setattr__(
            self,
            "secreted_mediators",
            dict(read_only_measurements("secreted_mediators", self.secreted_mediators)),
        )
        check_calibration_status(self.calibration_status)
        object.__setattr__(self, "evidence_ids", normalise_ids(self.evidence_ids, "evidence_id"))

    @property
    def coupling(self) -> float:
        """Cell density sets how much of a secreted message a neighbour sees."""
        return self.cell_density / (1.0 + self.cell_density)


@dataclass(frozen=True)
class BystanderResponse:
    """Effect carried by conditioned medium to an unexposed recipient."""

    environment_id: str
    donor_response: float
    transferred_signal: float
    recipient_change: float
    direction: str
    functional_endpoint: str
    calibration_status: str
    modulome_version: str = MODULOME_VERSION


def bystander_transfer(
    environment: TissueEnvironment,
    *,
    donor_response: float,
    transfer_efficiency: float,
    recipient_gain: float,
    functional_endpoint: str,
) -> BystanderResponse:
    """Carry a donor response to a recipient through the shared medium.

    ``recipient_gain`` is signed: a negative value is a protective transfer, a
    positive value a damaging one.  The sign is a registered property of the
    endpoint, never inferred from the size of the signal.
    """
    if not isinstance(environment, TissueEnvironment):
        raise TypeError("environment must be a TissueEnvironment")
    endpoint = nonempty("functional_endpoint", functional_endpoint)
    response = nonnegative("donor_response", donor_response)
    efficiency = unit_interval("transfer_efficiency", transfer_efficiency)
    gain = finite("recipient_gain", recipient_gain)

    transferred = response * efficiency * environment.coupling
    change = transferred * gain * environment.recipient_readiness
    return BystanderResponse(
        environment_id=environment.environment_id,
        donor_response=response,
        transferred_signal=transferred,
        recipient_change=change,
        direction="protective" if change < 0.0 else "damaging" if change > 0.0 else "none",
        functional_endpoint=endpoint,
        calibration_status=environment.calibration_status,
    )


@dataclass(frozen=True)
class ImmuneFunctionResponse:
    """An immune-signalling change reported together with its function."""

    environment_id: str
    channel_id: str
    signalling_change: float
    functional_endpoint: str
    functional_change: float
    abolished_by_channel_block: bool
    calibration_status: str
    modulome_version: str = MODULOME_VERSION


def immune_functional_response(
    environment: TissueEnvironment,
    *,
    channel_id: str,
    channel_activity: float,
    signalling_gain: float,
    functional_gain: float,
    functional_endpoint: str,
    exposure: float,
) -> ImmuneFunctionResponse:
    """Signalling and function through one named channel.

    The channel gates both outputs, so setting ``channel_activity`` to zero
    reproduces the silencing or blocking arm: both the signalling change and
    the functional change go to zero together.
    """
    if not isinstance(environment, TissueEnvironment):
        raise TypeError("environment must be a TissueEnvironment")
    endpoint = nonempty("functional_endpoint", functional_endpoint)
    name = nonempty("channel_id", channel_id)
    activity = unit_interval("channel_activity", channel_activity)
    drive = nonnegative("exposure", exposure)

    signalling = finite("signalling_gain", signalling_gain) * activity * drive
    functional = (
        finite("functional_gain", functional_gain)
        * activity
        * drive
        * environment.immune_competence
    )
    return ImmuneFunctionResponse(
        environment_id=environment.environment_id,
        channel_id=name,
        signalling_change=signalling,
        functional_endpoint=endpoint,
        functional_change=functional,
        abolished_by_channel_block=activity == 0.0,
        calibration_status=environment.calibration_status,
    )
