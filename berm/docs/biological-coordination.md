# Biological coordination and waiting-time integration

This extension connects BERM's existing physical, reproductive and demographic
interfaces through explicitly supplied biological states. The canonical website
explanation is `/model/biological-coordination`, with related sections on the model,
nutrition, circadian, reproductive-arc, Dual Lock and civilization pages.

## Starting state and resulting integration

Before this extension, BERM already implemented the Lindgren tensor perturbation,
organ memory with reversible and persistent components, male and female
reproductive capacities, couple-level aggregation and conditional ASFR ratios.
The website also contained the field-structure and signal-calculation synthesis.
It did not yet have a common executable tissue-phase model or a heterogeneous
waiting-time calculation connected to those reproductive capacities.

The new modules add those intermediate states. They reuse the existing physical
and reproductive interfaces, so the same pathway remains traceable from named
input assumptions through reproductive capacity to an optional population ratio.
The archived v16/v17 calculations retain their existing numbers.

## Physical starting point

The premise is Lindgren's 2025 tensor ansatz:

```text
g = eta + kappa A ⊗ A
A = A_b + a
delta_g = kappa (A_b ⊗ a + a ⊗ A_b + a ⊗ a)
```

`berm.physics.lindgren_tensor` already implements the exact perturbation,
first-order cross term and explicit tensor contractions. A state-dependent
response kernel K(S) must still be specified to turn this geometric input into
a biological response. The new biological code accepts a supplied state; it
does not infer that kernel, an environmental effect size or an exposure-to-redox
coefficient. This keeps the physical premise, biological implementation candidates
and downstream empirical component evidence separately identifiable.

## Executable biological state

`berm.biology.coordination` exposes:

| API | Calculation and interpretation |
| --- | --- |
| `PhaseRelation`, `phase_coordination` | Weighted cosine of each observed tissue-pair phase difference relative to its preferred difference; physiological antiphase can score as fully coordinated. |
| `HormoneReceptivityState` | Full-cycle mean of the product of harmonic hormone signal and tissue receptivity: H0 S0 + hs cos(lag)/2. The relative timing factor compares the same waveforms in phase. |
| `RedoxFunctionalState` | Explicit Gaussian functional window with supplied optimum, width and units; a positive redox increment can help or harm depending on the initial state. This functional form is a modelling choice. |
| `recovery_retention`, `advance_chemical_memory` | Exponential recovery and a supplied signed increment at the end of the time interval; time is in seconds and the state has caller-defined units. |
| `steady_pulse_memory` | Post-pulse fixed point q / (1 − exp(−interval/tau)) for identical periodic increments and first-order recovery. |
| `conditional_gate_success` | Product of successive conditional stage probabilities; the chain rule does not require independent gates. |

`ReproductiveCoordinationState` records the parameter IDs and optional evidence
IDs behind the selected hormone and redox mappings. Attached to
`FemaleReproductiveState`, these replace the corresponding manual clock and
oocyte-redox factors. Supplying a second non-neutral manual factor for the same
gate raises an error. This prevents one mechanism from being counted twice.

`evolve_organ_memory_over_time` maps explicit recovery times onto the existing
reversible/persistent memory update. A `None` persistent recovery time declares
permanent retention. It requires named increment/recovery assumptions and carries
their provenance forward through successive steps.

These mappings are `STRUCTURAL_ONLY`, including when other components of a
reproductive state have been calibrated. A phase score alone is not a probability
or a universal damage measure.

## Couple distributions and the population interface

`berm.outcomes.reproductive_waiting` preserves individual probabilities when
mixing waiting-time curves. For each pair, the supplied reference probability per
eligible cycle is multiplied by that pair's conception capacity. The reference
probability must not already include the same capacity reduction.

With constant pair-specific probability p and n eligible cycles:

```text
P(first conception by n | p) = 1 − (1 − p)^n
P(no conception by n) = sum_i w_i (1 − p_i)^n
```

`summarize_waiting_cohort` returns cumulative first conception, survival,
the next-cycle probability among remaining couples, and restricted mean waiting.
It also returns a support-weighted first-conception measure under an explicit
reference-support assumption. This does not model re-entry after pregnancy loss,
gestation or calendar births.

`WaitingHorizonComparison` compares two supplied cohort distributions at a named
eligible-cycle horizon. `AgeSpecificConditionalInput.waiting_comparison` can use
that comparison as its biological ASFR ratio. This substitutes for the older
linear capacity ratio; it is not multiplied by it. Parameter IDs, starting parity,
the horizon and the additional mapping assumption appear in the result metadata.
Age progression, further births, gestation and calendar tempo require their own
models. This extension supplies no new country forecast.

## Evidence registry

The canonical causal registry adds `RECEPTOR_STATE_MEMORY`,
`CIRCADIAN_COORDINATION` and `HORMONE_TARGET_RESPONSE`. Their feed-forward edges
describe dependencies; internal biological feedback is represented in state and
time, keeping the displayed graph acyclic.

Ten new draft claims connect the biological-coordination route to curated sources
and scoped evidence relationships. The bibliography records primary article
metadata. Component findings and BERM synthesis are distinguished in the claim
assessments. Archer 2014 and its 2022 reanalysis are one dataset family; Kish 2026
is labelled as a preprint. The combined route has `independenceVerified: false`.

## Reproducible website examples

Run from the repository root:

```bash
python3 berm/export_biological_coordination.py
python3 berm/export_causal_graph.py
```

The first exporter writes identical `biological-coordination.json` files to
`website/data` and `website/public/data`. The interactive page selects these
precomputed scenarios instead of maintaining a second numerical implementation.
All examples declare illustrative, unfitted inputs:

- Harmonic hormone and receptivity means of 1 and amplitudes of 0.5 give average
  products 1.125, 1 and 0.875 at phase differences of 0, 6 and 12 hours.
- Equal pulses spaced by 0.1 or 3 recovery times approach post-pulse levels
  10.50833194 or 1.05239570. Curves use normalized time and sample the actual
  exponential between pulse jumps; their total durations differ.
- Uniform p = 0.2 and an equally weighted mixture p = 0.1/0.3 share the same
  initial mean. By 12 cycles their cumulative first-conception probabilities
  are 0.93128052 and 0.85186459 respectively.
- Five successive conditional gates of 0.9 have joint probability 0.59049.

These numbers illustrate consequences of declared model assumptions. They are
not effect sizes extracted from the cited studies.

## Verification

Model tests cover numerical integration, appropriate phase offsets, redox
direction, pulse fixed points, explicit recovery units and provenance, duplicate
gate protection, mixture survival and conditional probabilities, boundary cases,
and replacement of the ASFR biological term. The site-sync tests compare both
JSON mirrors with the Python exporter and integrate the displayed hormone curves
independently. Website checks cover the evidence registry, references, types,
lint, rendering and interaction.
