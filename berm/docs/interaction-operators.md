# Conditional interaction operators

`berm.interactions` implements the two missing dynamic aggregation structures
identified in the [7 September integration audit](../../docs/analysis/BERM_integraatioauditointi_2026-09-07/mallilaskenta.md).
It supplies no fitted social, species, field-effect or country coefficient and
does not change archived v16/v17 predictions.

## Derivation boundary

The relevant Lindgren 2025 premise is `g = eta + kappa A tensor A`. Substituting
`A = A_bio + a` gives
`delta_g = kappa (A_bio tensor a + a tensor A_bio + a tensor a)`.
This tensor expansion is an L1 algebraic consequence. The conditional formal
response operator is implemented in `physics/lindgren_response.py`, assuming
minimal matter-metric coupling and response theory. Its physical coupling
scale, gauge prescription, tissue-specific kernel and endpoint calibration
remain **OPEN L2**. The interaction operators below are imported, conditional L3/L4
aggregation hypotheses. Their algebra does not derive or validate that bridge.
FieldState records may inform upstream estimates or the ecological context;
the measurement record itself is not the biological cause.

## Public Python interface

All names below are exported from `berm.interactions`. Inputs and outputs are
frozen dataclasses; numerical sequences are normalised to tuples. No biological
coefficient has a default. `InteractionProvenance(context, parameter_ids,
evidence_ids, calibration_status="STRUCTURAL_ONLY", basis="HYPOTHESIS")`
records the source and scope of each input. Empty evidence IDs explicitly mean
no supporting study is declared. Coefficient records require parameter IDs.
An `ENDPOINT_CALIBRATED` input requires evidence IDs too; this remains a caller
declaration, not automatic validation. Composed outputs always remain
`STRUCTURAL_ONLY` and `SYNTHETIC_INFERENCE`, preserving the input IDs and bases.
Calibration of a composed endpoint requires a separate held-out evaluation.

### Social propagation

`SocialNetwork(node_ids, weights, beta, step_duration, time_unit, provenance)`
defines the directed matrix: `weights[i][j]` transmits node j to node i.
`SocialState(node_ids, deviations, step_index, outcome_unit, provenance)` stores
signed deviations in a named measured outcome. Node order must match exactly.

`advance_social_state(state, network, direct_input, input_provenance)` computes

`delta_b(t+1) = direct_input(t) + beta W delta_b(t)`.

The result separates direct and propagated contributions and retains the next
state. Coefficients apply to one declared time step; they are not continuous
rates. The caller supplies each time-varying biological input. The module does
not infer behaviour from hormone levels or diagnose political states.
`social_stability(network)` evaluates `rho(beta W) < 1`, including signed or
asymmetric networks. This is asymptotic stability of the declared linear model,
not evidence for a real-world threshold. A stable directed network can still
have transient amplification. Unstable finite steps are reportable and are not
silently clipped. Probabilities need a separately specified observation link.

`InstitutionParameters(retention_fraction, conversion_per_action,
action_weights, action_unit, stock_unit, step_duration, time_unit, provenance)`
and `advance_institution_stock(stock, actions, withdrawal, coefficients,
input_provenance)` calculate

`I_next = retention_fraction I + conversion_per_action sum(w_i actions_i) - withdrawal`.

Actions are nonnegative absolute amounts during the declared interval, not
signed deviations. Mapping a social deviation to action amounts requires a
separate baseline and endpoint mapping. The result distinguishes retained
stock, new contribution and withdrawal. Infeasible withdrawals raise an error.

The separate `civilization.epistapege.institutional_memory_update` operator
updates a normalised probability-like memory by
`I_next = retention I + (1-retention) P`. It is retained alongside the stock
model: a probability average and a stock measured in declared units are
different outcomes and cannot be substituted for each other.

### Ecological encounters

`EcologicalState(state_id, node_ids, abundance, functional_response,
environment, time, time_unit, abundance_unit, provenance)` retains abundance,
species response coordinates and environmental `(name, value, unit)` records.
The response coordinate definitions belong in the input provenance context.
It can store a measured field together with habitat covariates; there is no
technology label converted automatically into a dose or susceptibility.

`EncounterEdge(edge_id, source, target, baseline_rate, source_yield,
target_yield, modifier, provenance)` is directed. `modifier(state)` is a required
caller-supplied pure function returning a nonnegative finite factor. It may
depend on both species' functional states, the full network abundance and
measured environmental context. Its closure, units and all coefficients must
be identified in the edge provenance; no particular receptor-to-encounter law
is invented here. The callable is deliberately not a serialised fitted model.
Audits should retain its code or registered implementation beside parameter IDs.

`advance_ecological_state(state, edges, birth_rates, death_rates, dt,
next_state_id, rate_provenance)` evaluates all edges on the same snapshot:

`encounters_ij = dt baseline_rate_ij modifier_ij(state) n_i n_j`.

The baseline rate has units `1/(abundance_unit time_unit)`; encounter totals
use the abundance unit. Each total contributes the explicitly signed
`source_yield` and `target_yield` to the corresponding populations. Birth and
death rates are per capita per time unit. The result exposes intrinsic change,
interaction change and each edge's calculation. A host-dependent source cannot
recruit through this edge when host abundance is zero; its own death rate can
therefore make it decline. Either species may benefit, lose, or remain unchanged,
depending on supplied rates and yields. A callback using the full state can
represent changed compensation by remaining species.

This is one explicit Euler step, not a universally stable ecosystem solver.
A step producing negative abundance raises with an instruction to reduce the
step or revise the integrator/rates. Inputs are not silently clipped. Functional
responses and environmental measurements remain fixed within each step; the
caller must update them from the relevant biological/environment model before
the next changed-state step. These operators do not infer heritable adaptation
from ecological sorting or supply a genotype fitness model.

## Evidence scope and checks

The existing [population synthesis](../../docs/analysis/BERM_jatko_populaatio_2026-09-07.md)
records Ben Simon's sleep/helping study and its correction, Fowler–Christakis's
experimental cooperation propagation, and Brosi–Briggs's pollinator removal
study. They constrain their own lower-level endpoints. They are not EMF tests,
universal network multipliers, or direct calibration of institution stocks.
The [ecology review](berm-eco-bioelectromagnetic-selection-review.md) supplies the
conditional encounter structure and explicitly rejects universal parasite
benefit. None of those studies is installed here as a numerical coefficient.

Run `PYTHONPATH=berm python3 -m pytest berm/tests/test_interaction_operators.py`.
Tests use explicitly synthetic coefficients: directed impulse propagation,
analytic network equilibrium, spectral-radius boundaries, transient gain,
stock accumulation/decay, host absence, context/response changes, signed species
outcomes, simultaneous edge updates, provenance preservation and invalid-domain
rejection. Passing tests validates these numerical contracts, not the biological
or geometry-to-observable hypotheses.
