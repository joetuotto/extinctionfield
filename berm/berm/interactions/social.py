"""Caller-parameterised social propagation and institution stock updates.

These are local conditional L3/L4 aggregation hypotheses. They supply neither
an EMF-to-behaviour coefficient nor the open Lindgren L2 coupling operator.
"""

from dataclasses import dataclass
import numpy as np

from ._common import (
    InteractionProvenance, combine, finite, ids, parameters, positive, text, vector,
)


@dataclass(frozen=True)
class SocialNetwork:
    node_ids: tuple[str, ...]
    weights: tuple[tuple[float, ...], ...]
    beta: float
    step_duration: float
    time_unit: str
    provenance: InteractionProvenance

    def __post_init__(self):
        nodes = ids("node_ids", self.node_ids)
        if not nodes:
            raise ValueError("network must have nodes")
        object.__setattr__(self, "node_ids", nodes)
        rows = tuple(vector("weights row", row, len(nodes)) for row in self.weights)
        if len(rows) != len(nodes):
            raise ValueError("weights must be a square matrix")
        object.__setattr__(self, "weights", rows)
        object.__setattr__(self, "beta", finite("beta", self.beta))
        object.__setattr__(self, "step_duration", positive("step_duration", self.step_duration))
        object.__setattr__(self, "time_unit", text("time_unit", self.time_unit))
        parameters(self.provenance)


@dataclass(frozen=True)
class SocialState:
    node_ids: tuple[str, ...]
    deviations: tuple[float, ...]
    step_index: int
    outcome_unit: str
    provenance: InteractionProvenance

    def __post_init__(self):
        nodes = ids("node_ids", self.node_ids)
        object.__setattr__(self, "node_ids", nodes)
        object.__setattr__(self, "deviations", vector("deviations", self.deviations, len(nodes)))
        if isinstance(self.step_index, bool) or not isinstance(self.step_index, int) or self.step_index < 0:
            raise ValueError("step_index must be a non-negative integer")
        object.__setattr__(self, "outcome_unit", text("outcome_unit", self.outcome_unit))
        if not isinstance(self.provenance, InteractionProvenance):
            raise ValueError("InteractionProvenance is required")


@dataclass(frozen=True)
class SocialStability:
    spectral_radius: float
    asymptotically_stable: bool
    stability_margin: float


def social_stability(network: SocialNetwork) -> SocialStability:
    """Exact linear criterion rho(beta W) < 1; not a social tipping threshold."""
    matrix = network.beta * np.asarray(network.weights)
    if not np.isfinite(matrix).all():
        raise ValueError("beta W overflowed")
    radius = finite("spectral_radius", max(abs(np.linalg.eigvals(matrix))))
    return SocialStability(radius, radius < 1.0, 1.0 - radius)


@dataclass(frozen=True)
class SocialStep:
    state: SocialState
    direct_contribution: tuple[float, ...]
    propagated_contribution: tuple[float, ...]
    stability: SocialStability


def advance_social_state(
    state: SocialState,
    network: SocialNetwork,
    direct_input: tuple[float, ...],
    input_provenance: InteractionProvenance,
) -> SocialStep:
    """delta_b(t+1) = u(t) + beta W delta_b(t).

    W[i][j] transmits j to i. u and delta_b share the declared outcome unit.
    beta and W describe one declared time step, not continuous-time rates.
    Signed deviations are not probabilities; no clipping hides instability.
    """
    if state.node_ids != network.node_ids:
        raise ValueError("state and network node order must match")
    direct = vector("direct_input", direct_input, len(state.node_ids))
    propagated = vector(
        "propagated_contribution",
        network.beta * np.asarray(network.weights).dot(state.deviations),
        len(state.node_ids),
    )
    provenance = combine("social network one-step inference", state.provenance, network.provenance, input_provenance)
    next_state = SocialState(
        state.node_ids, tuple(a + b for a, b in zip(direct, propagated)),
        state.step_index + 1, state.outcome_unit, provenance,
    )
    return SocialStep(next_state, direct, propagated, social_stability(network))


@dataclass(frozen=True)
class InstitutionParameters:
    retention_fraction: float
    conversion_per_action: float
    action_weights: tuple[float, ...]
    action_unit: str
    stock_unit: str
    step_duration: float
    time_unit: str
    provenance: InteractionProvenance

    def __post_init__(self):
        retention = finite("retention_fraction", self.retention_fraction)
        if not 0 <= retention <= 1:
            raise ValueError("retention_fraction must be in [0, 1]")
        object.__setattr__(self, "retention_fraction", retention)
        object.__setattr__(self, "conversion_per_action", positive("conversion_per_action", self.conversion_per_action, zero=True))
        weights = tuple(self.action_weights)
        if not weights:
            raise ValueError("action_weights must not be empty")
        object.__setattr__(self, "action_weights", vector("action_weights", weights, len(weights), nonnegative=True))
        for name in ("action_unit", "stock_unit", "time_unit"):
            object.__setattr__(self, name, text(name, getattr(self, name)))
        object.__setattr__(self, "step_duration", positive("step_duration", self.step_duration))
        parameters(self.provenance)


@dataclass(frozen=True)
class InstitutionStep:
    next_stock: float
    retained_stock: float
    contribution: float
    withdrawal: float
    stock_unit: str
    provenance: InteractionProvenance


def advance_institution_stock(
    stock: float, actions: tuple[float, ...], withdrawal: float,
    coefficients: InstitutionParameters, input_provenance: InteractionProvenance,
) -> InstitutionStep:
    """I' = retention*I + conversion*sum(weights*actions) - withdrawal.

    Actions are absolute non-negative amounts during one step, not social
    deviations. The caller must supply a separate mapping from deviations.
    Infeasible depletion raises instead of silently creating/clipping stock.
    """
    stock = positive("stock", stock, zero=True)
    withdrawal = positive("withdrawal", withdrawal, zero=True)
    actions = vector("actions", actions, len(coefficients.action_weights), nonnegative=True)
    retained = finite("retained_stock", coefficients.retention_fraction * stock)
    contribution = finite("contribution", coefficients.conversion_per_action * sum(w * a for w, a in zip(coefficients.action_weights, actions)))
    next_stock = positive("next_stock", retained + contribution - withdrawal, zero=True)
    return InstitutionStep(next_stock, retained, contribution, withdrawal, coefficients.stock_unit,
                           combine("institution stock inference", coefficients.provenance, input_provenance))
