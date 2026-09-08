# Conditional pharmacology protocol v1

The callable route is `berm.modulome.intervention_protocol.run_intervention_protocol`.
`run_factorial_protocol` runs sham, field, intervention, and field + intervention
with the same parameter records, geometry and response kernels. It returns
cellular observables and additive four-arm contrasts. It does not call ASFR/TFR,
change archived v17 arithmetic, fit a dose-response curve, or claim held-out
empirical validation.

The study registry is `data/evidence/intervention_profiles_v1.json`. Its study
claims motivate mechanism choices; they are not provenance for the synthetic
coefficient values in `intervention_examples.py`. Twelve examples cover eight
registry profiles, including separate fast/slow buffers and three alternative
CoQ action sites. `python export_interventions.py` produces identical website
and public JSON mirrors; `--check` verifies deterministic regeneration.

From the `berm/` directory, a minimal public API call is:

```python
from berm.modulome.intervention_examples import example_scenarios
from berm.modulome.intervention_protocol import run_factorial_protocol

protocol = example_scenarios()[0]["protocol"]  # complete synthetic MT2 input
result = run_factorial_protocol(protocol)
print(result["contrasts"])
```

For one arm, call `run_intervention_protocol(protocol, field_enabled=True,
intervention_enabled=False)`. Any exported `scenario["protocol"]` can be
replayed through the same public functions. Inputs are deep-copied and returned
as JSON-compatible results; no caller state is modified.

Change scope on 2026-09-07: the new protocol, illustrative input builder,
exporter, documentation, tests and two generated scenario mirrors are added.
Existing modulome v1, the conditional ASFR route, photostate implementation,
and archived v17 are not modified by this engine addition. Registry/card/UI
integration is maintained separately by the publishing task.

## Premise, operator and biological closure

The theoretical starting point is the stated nondegenerate 2025 premise

`g = eta + kappa A tensor A`, with `A = A0 + a`.

The existing `metric_perturbation` computes the exact consequence

`delta_g = kappa (A0 tensor a + a tensor A0 + a tensor a)`.

At each integration step the existing `contract_retarded_response` contracts
that perturbation history with each caller-supplied response kernel and lag
weights. History is newest first; the protocol explicitly declares zero
perturbation before its first phase. One lag is one `dt_s`. Negative kernel
components and signed responses are allowed. No absolute value or clipping
changes their sign. The examples use four-component synthetic potential
vectors, not measured electromagnetic doses.

Each named port maps `q = baseline + gain * signed_response`, with declared
response/output units, parameter IDs and provenance. Port names target channel
opening, channel synthesis, ER release, AA production, Na current or CRY
response. The resulting total opening must lie in [0,1]; total synthesis and
ER release rates must remain nonnegative. A signed reduction from a positive
baseline is accepted; an invalid total raises an error instead of being clipped.

This composition is a conditional formal operator under an explicit minimal
matter-metric coupling assumption. Its physical gauge prescription, scale,
kernel, tissue identity, sign and biological calibration remain open. The
biological dynamics are imported closure assumptions, not consequences of the
metric identity. Component pharmacology cannot validate these upstream claims.

## Input and time contracts

The complete JSON input is exported with every example. All kinetic values
carry a parameter ID, canonical dimensional unit, basis and evidence IDs.
`units` declares the base amount, volume, concentration, time, photon-dose and
channel-density conventions. Time is seconds. Rate units must match
`PARAMETER_UNITS`; conversion into the declared base units belongs before this
API. The numerical examples use synthetic amounts/volumes and label them as
such. Initial pools, volumes, phase controls and observation settings have
separate input-provenance IDs.

Phases contain duration, field vector, controls and independent cell/solution
light histories. Duration is an integer multiple of `dt_s`. Pretreatment
precedes measurement; baseline is recorded after pretreatment. Phase IDs are
unique. Cell light episodes have wavelengths, photon fluxes, durations and
preceding delays, and must fit inside the phase. Future photons cannot affect
earlier output. Contiguous identical episodes are coalesced before calling the
existing discrete photocycle so that splitting a light episode does not create
an additional photochemical step, including across phase boundaries.

Intervention controls apply to all phases unless named `phase_overrides`
replace them for selected phases. A phase can specify `drug_exchange` with
`retained_fraction` and `added_concentration`: this supports dosing and washout
without resetting cellular calcium, CRY abundance or accumulated damage.
Omitting an exchange means identity (retain 1, add 0). Cell-free solution
preillumination acts on active probe concentration before the cells are
exposed. Drug clearance is an explicit rate. Pharmacological action always
targets states or mediators, not an extra final-outcome multiplier.

Calcium states are **amounts**, with concentrations calculated as amount divided
by each compartment's volume. The independent L/T local pools, bulk cytosol,
ER and mitochondria exchange mass. Local and bulk bound buffers retain their
calcium. External channel influx and extrusion are the only net calcium
sources/sinks. Channel synthesis/degradation determines total population;
gating, pharmacological block and functional knockdown determine available
current. A knockdown is a functional-availability intervention, not a claim
that measured channel protein abundance must instantly become zero.

Calcium/buffer transfers use explicit Euler steps; first-order mediator pools
use exact constant-input updates within each step. Impossible negative calcium
or bound-buffer amounts raise an error with a smaller-step instruction. Only
floating noise within 1e-12 of zero is removed. Step-size convergence tests
check the illustrated cases; this is not a stiffness-adaptive integrator.

## Executable biological distinctions

| Profile | State and intervention distinction | Observable and scope |
| --- | --- | --- |
| MT2 brake | Depolarization-gated, RyR-dependent store release; the actual evoked release flux drives a separately interruptible CaM brake | Resting calcium, evoked calcium and incremental Na current are distinct. MT2 alone leaves resting calcium unchanged in the example. Physiological melatonin dose transfer is open. |
| Local L / ERK | L-local and bulk buffers share capacity/affinity but have declared on/off kinetics. Local ERK has fast and slow states; the early bulk component has its own adaptation, recovery and loss. | Early observation sums local and bulk components; sustained observation projects the local slow state. These assay projections are explicit synthetic closures. Selway used GLP-1, not a field. |
| Channel selectivity | Independent CaV1.2 and CaV3.2 gates; target-specific block or knockdown. An optional T-local arrest state integrates signal duration and recovers. | Current, arrest and reciprocal growth activity are separate. Same bulk peak can give different growth activity through signal location/duration. Arrest gain is zero outside this profile by default. No proliferation-to-fertility mapping is installed. |
| AA / LTE4 | AA synthesis/conversion/clearance and LTE4 production/clearance precede T-channel inhibition | A positive AA-production port can cause a negative T-current change. Blocking synthesis and adding LTE4 make different predictions. L current remains independent. |
| Density / store history | Slow channel population dynamics are separate from opening probability. SERCA inhibition runs during pretreatment. | Store depletion, raised baseline, smaller incremental field response and detector saturation are distinct. An independent membrane route can remain. Time constants are illustrative, not fitted to 24–72-hour observations. |
| CRY / FAD | CRY synthesis/degradation, competing ligand occupancy and free-FAD occupancy are separate | The existing ordered photocycle includes FAD occupancy once; effective pool is CRY amount times its yield. Period and amplitude use separate projections. Endogenous cellular displacement and field effects remain conditional. |
| Drug photochemistry | Active probe concentration changes with solution illumination according to a declared spectrum; cell light is separately recorded | Solution prelight can alter channel block without changing cell CRY state. A photostable probe is represented by zero photodeactivation rate. |
| CoQ alternatives | One selected transduction, redox-production or repair hypothesis per run | Only mitochondrial stress produces damage. Redox and repair can protect while preserving early Ca; transduction can change early Ca. Protection does not locate the action site. |

The current CRY construction explicitly factorizes **present binding occupancy**
and the redox distribution induced by the ordered cell-light history. This is a
quasi-equilibrium closure for exchangeable ligands, not a kinetic measurement of
cellular FAD displacement. The imported photocycle treats episodes as ordered
steps, not a continuous within-episode photochemical ODE. Clock period is an
affine projection of CRY amount and reporter amplitude a reciprocal projection;
neither is a full circadian oscillator. These limitations are in the returned
`closures` as well as this document.

Damage has exactly one production term, from mitochondrial stress. Repair acts
as clearance of accumulated damage. CoQ's transduction alternative scales the
declared port input before biology; bridge output retains both the raw signed
port and the effective applied port plus the intervention factor. Redox and
repair alternatives leave this upstream port unchanged. No existing direct
driver-to-damage pathway is run alongside this new route.

## Results, interpretation and validation

Observables retain their units. Bulk detection threshold and saturation are
explicit measurement settings, separate from calcium states. Incremental
calcium is measured from each arm's actual baseline; matched four-arm contrasts
then use those same endpoint definitions and measurement times. Raw baselines
and absolute peaks remain available, so percentage changes from different
baselines are never silently mixed.

The exporter includes replay inputs, all parameter IDs, source links, full-rate
endpoint calculations, 62 or fewer biological trace points and three bridge
examples per arm. These are synthetic curves, not extracted study data. The
registry's missing empirical four-arm means remain missing. No coefficient was
estimated or validated against a held-out intervention in this release.

Tests cover exact geometry/operator execution, shared kernels across arms,
signed port reductions and invalid totals, retained retarded history, RyR/CaM
and channel-selective interventions, buffer kinetic differences and mass
conservation, pretreatment versus detector saturation, same-peak/different-local
growth, single CRY occupancy, nonanticipating/cell-free light, split-episode
invariance, drug washout, CoQ site alternatives, single damage production,
canonical units, finite results, input immutability, export provenance and
deterministic mirrors. Existing v17/default routes remain independent.
