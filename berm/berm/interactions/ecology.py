"""State-dependent directed encounters and a conditional abundance update.

No species has built-in susceptibility or benefit. A host-dependent source can
lose recruitment when its target host disappears. The supplied modifier may
depend on responses, measured context and the rest of the network.
"""

from dataclasses import dataclass
from typing import Callable

from ._common import InteractionProvenance, combine, finite, ids, parameters, positive, text, vector


@dataclass(frozen=True)
class EcologicalState:
    state_id: str
    node_ids: tuple[str, ...]
    abundance: tuple[float, ...]
    functional_response: tuple[float, ...]
    environment: tuple[tuple[str, float, str], ...]
    time: float
    time_unit: str
    abundance_unit: str
    provenance: InteractionProvenance

    def __post_init__(self):
        object.__setattr__(self, "state_id", text("state_id", self.state_id))
        nodes = ids("node_ids", self.node_ids)
        if not nodes:
            raise ValueError("ecological state must have nodes")
        object.__setattr__(self, "node_ids", nodes)
        object.__setattr__(self, "abundance", vector("abundance", self.abundance, len(nodes), nonnegative=True))
        object.__setattr__(self, "functional_response", vector("functional_response", self.functional_response, len(nodes)))
        environment = tuple((text("environment name", key), finite(key, value), text("environment unit", unit)) for key, value, unit in self.environment)
        ids("environment names", (item[0] for item in environment))
        object.__setattr__(self, "environment", environment)
        object.__setattr__(self, "time", finite("time", self.time))
        for name in ("time_unit", "abundance_unit"):
            object.__setattr__(self, name, text(name, getattr(self, name)))
        if not isinstance(self.provenance, InteractionProvenance):
            raise ValueError("InteractionProvenance is required")


@dataclass(frozen=True)
class EncounterEdge:
    """One successful-encounter rule; all coefficients are caller supplied.

    rate = baseline_rate * modifier(state). baseline_rate has units
    1/(abundance_unit*time_unit). modifier returns a finite non-negative
    factor and can include encounter success and temporal overlap.
    source_yield and target_yield are signed abundance changes per successful
    encounter. modifier provenance must name its closure and parameters.
    """
    edge_id: str
    source: str
    target: str
    baseline_rate: float
    source_yield: float
    target_yield: float
    modifier: Callable[[EcologicalState], float]
    provenance: InteractionProvenance

    def __post_init__(self):
        for name in ("edge_id", "source", "target"):
            object.__setattr__(self, name, text(name, getattr(self, name)))
        if self.source == self.target:
            raise ValueError("use intrinsic rates for self-dynamics; encounter edges need two nodes")
        object.__setattr__(self, "baseline_rate", positive("baseline_rate", self.baseline_rate, zero=True))
        for name in ("source_yield", "target_yield"):
            object.__setattr__(self, name, finite(name, getattr(self, name)))
        if not callable(self.modifier):
            raise ValueError("modifier must be a caller-supplied state function")
        parameters(self.provenance)


@dataclass(frozen=True)
class EncounterResult:
    edge_id: str
    source: str
    target: str
    modifier: float
    successful_encounters: float
    source_change: float
    target_change: float


@dataclass(frozen=True)
class EcologicalStep:
    state: EcologicalState
    encounters: tuple[EncounterResult, ...]
    intrinsic_change: tuple[float, ...]
    interaction_change: tuple[float, ...]


def advance_ecological_state(
    state: EcologicalState,
    edges: tuple[EncounterEdge, ...],
    birth_rates: tuple[float, ...],
    death_rates: tuple[float, ...],
    dt: float,
    next_state_id: str,
    rate_provenance: InteractionProvenance,
) -> EcologicalStep:
    """Explicit Euler population step, conditional on this response snapshot.

    encounters_ij = dt*k0_ij*g_ij(state)*n_i*n_j. All edges read the same
    pre-step snapshot, making updates independent of edge order. Birth/death
    rates are per capita per state.time_unit. Physically infeasible negative
    abundances raise; use a shorter step or a different registered integrator.
    Responses/environment stay fixed during this step and must be updated by
    the caller's biological/environment model before a changed-state step.
    """
    dt = positive("dt", dt)
    next_state_id = text("next_state_id", next_state_id)
    if next_state_id == state.state_id:
        raise ValueError("next_state_id must identify a new state")
    parameters(rate_provenance)
    edges = tuple(edges)
    ids("edge IDs", (edge.edge_id for edge in edges))
    count = len(state.node_ids)
    births = vector("birth_rates", birth_rates, count, nonnegative=True)
    deaths = vector("death_rates", death_rates, count, nonnegative=True)
    indices = {node: i for i, node in enumerate(state.node_ids)}
    intrinsic = tuple(dt * (b - d) * n for b, d, n in zip(births, deaths, state.abundance))
    interactions = [0.0] * count
    encounters = []
    for edge in edges:
        if edge.source not in indices or edge.target not in indices:
            raise ValueError("every edge endpoint must occur in state.node_ids")
        i, j = indices[edge.source], indices[edge.target]
        modifier = positive("encounter modifier", edge.modifier(state), zero=True)
        events = finite("successful_encounters", dt * edge.baseline_rate * modifier * state.abundance[i] * state.abundance[j])
        source_change = finite("source_change", events * edge.source_yield)
        target_change = finite("target_change", events * edge.target_yield)
        interactions[i] += source_change
        interactions[j] += target_change
        encounters.append(EncounterResult(edge.edge_id, edge.source, edge.target, modifier, events, source_change, target_change))
    next_abundance = tuple(n + change + interaction for n, change, interaction in zip(state.abundance, intrinsic, interactions))
    if any(n < 0 for n in next_abundance):
        raise ValueError("negative next abundance: reduce dt or revise the declared rates")
    provenance = combine("conditional ecological encounter inference", state.provenance, rate_provenance, *(edge.provenance for edge in edges))
    next_state = EcologicalState(next_state_id, state.node_ids, next_abundance, state.functional_response,
                                state.environment, state.time + dt, state.time_unit, state.abundance_unit, provenance)
    return EcologicalStep(next_state, tuple(encounters), intrinsic, tuple(interactions))
