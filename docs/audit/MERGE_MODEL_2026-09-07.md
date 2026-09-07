# Model integration audit, 7 September 2026

The integration joins `f971a29` with the saved production working-tree snapshot
`0dc5188`. No choice was based on commit date or on a whole-file ours/theirs rule.
The live working tree was not changed. This report covers model code, its
architecture contract and the local data needed to reproduce the tests.

## Preserved calculation paths

The executable AST, excluding docstrings, is identical to the production
snapshot in `model.py`, `v16.py`, `tfr.py`, `stats/dkc.py`,
`physics/lindgren_tensor.py`, `outcomes/reproductive_waiting.py` and
`outcomes/fieldstate_asfr.py`. In particular the archived v17 arithmetic, the
DKC calculation and the conditional ASFR/waiting algebra were not rewritten.
The Finland 2030 v17 regression value remains `1.3209357069197134`.

The production `modulome/`, `model_modulome_asfr.py`, CLI route selection,
conditional export, reproductive calendar and `interactions/` implementations
are retained. `model_fieldstate_asfr.py` forwards the optional age-specific
waiting comparison. That comparison replaces the biological capacity ratio;
it does not multiply it again. Old JSON scenarios omit both new optional
adapters and retain the same outputs.

The incoming androgen mass-action/receptor model, retarded tensor response,
seven synthesis groups, Epistapege aggregation, formal derivation gate,
dimensionless geometric coordinate and DKC route remain available. The
normalised institutional memory average and the production action-driven stock
operator remain distinct because they have different units and meanings.
Incoming `SourceCoupling.coherence_time_seconds` is retained as source-field
coherence metadata. Its absence stays unknown under the stricter completeness
check; it is not inferred from a biochemical memory or relaxation time.

The production CatSper correction is retained: DOI
`10.1093/humrep/deab130.035` is an ESHRE abstract on 50 male Wistar-Albino rats,
2100 MHz in vivo for one hour/day over 28 days, with amlodipine 1 mg/kg. It does
not establish human in-vitro results, selective CatSper inhibition, completed
CatSper gene-expression results or a significant mating/live-birth effect.
Historical coefficients stay numerically unchanged and explicitly scoped.
The RPM hierarchy remains historical research priority, not a receptor selected
by the geometry.

## Explicit integration contracts

`theory.l2BridgeStatus` remains `conditional_formal_operator` for compatibility;
`l2BridgeStatusScope` now states `operator_form_only`. `bridgeComponents` records
separate claims: L1-derived metric perturbation; conditional formal response
given minimal matter-metric coupling and response expansion; open gauge and
physical scale; caller-supplied, uncalibrated tissue kernel; open composed human
endpoint calibration. A numerical response contraction neither establishes the
physical coupling nor calibrates a human endpoint. Downstream evidence retains
its own scope.

`berm/berm/architecture.py` is the source. `berm/export_architecture.py` produces
`website/data/model-architecture.json`; the TypeScript module exports that
contract, including `BRIDGE_COMPONENTS`. FieldState and diagnostic routes do not
publish locked forecasts; v17 is not FieldState-calibrated. The existing DKC
calibration-pipeline label, its limited scope and `NOT_IDENTIFIABLE_WITH_CURRENT_DATA`
qualification are retained together.

Two optional JSON inputs use the same modulome-to-ASFR execution path:

- `androgen` requires consistent concentration units, explicit pathway weights,
  provenance and parameter IDs. It computes free testosterone and receptor
  signals and sets the androgen organ gate once. Because total testosterone
  already represents supply, it rejects a simultaneous non-neutral
  `steroidogenic_support` or manual androgen factor. The male state field was
  appended to preserve the v1 positional constructor. Other organ factors still
  require caller-defined, non-overlapping causal interpretation; this adapter
  does not identify such factors empirically.
- `retarded_response` requires a tensor kernel and metric history for every
  cell step, explicit lag quadrature units, kernel provenance/parameter IDs,
  and a named response-to-driver transfer. It preserves signed contractions
  and applies the stated `baseline + gain * response` conversion. Either gain
  sign is allowed. A negative resulting cellular driver is rejected, never
  passed through absolute value or clipping. A manual driver and the spectral
  alternative cannot be supplied alongside this adapter.

Neither adapter supplies fitted human coefficients. Composed results retain
`STRUCTURAL_ONLY` and the physically open L2 boundary. The full usage contract
is in `berm/docs/conditional-modulome-route.md`.

## Stash three-way review

Compared the changes `942aac4^1 -> 942aac4` against the final files without
applying or popping the stash:

| File | Stash contribution | Final decision |
|---|---|---|
| `berm/berm/civilization/political_biology.py` | Three Welling-to-Alogaily author corrections | All three already present; retained final additional constitutive ideology conditions and anomic-fragmentation state. |
| `berm/berm/diagnostics/lh_t_diagnostic.py` | Age/secular/body-composition gradient distinction and two-signature diagnostic | Final file already exactly equals the stash; no restoration needed. Its candidate attribution remains distinct from evidence of EMF causation. |
| `berm/tests/test_lh_t_diagnostic.py` | Gradient and falsification tests | Already exactly present; retained. |

This preserves each stash contribution without replacing later additive code.

## Reproducible data and the previous 27 failures

The old merge worktree's pytest `lastfailed` cache lists 27 failures. They cover
CSLI source loading (4), dual-kernel fitting (1), the evidence-constrained
hindcast (1), external exposure loading (2), LED/WPP falsification (7), the WPP
ASFR facade (1), cohort signature (1), IFCE benchmark (4), provenance presence
checks (2) and seminology benchmark (4). These were not all benchmark failures.

The manifests, schemas, registry and ingestion/normalisation code were already
versioned. Ignored local inputs are absent from a fresh worktree. Copied 69
such inputs (475,255,649 bytes) from the live data directory to the integration
worktree, verifying source and destination SHA-256 for every file. The complete
inventory is `berm/docs/merge-2026-09-07-data-manifest.json`. All raw files listed
by the versioned acquisition manifests now exist in the integration worktree.

Inputs include the exact acquired WPP release; World Bank, IFCE, seminology,
ANFR, FAnGR, MUST-B and veterinary releases; the smaller processed tables used
by tests; and the all-country panel. Raw releases are acquired evidence, not
regenerated model output. WPP processed ASFR/TFR can be rebuilt by
`python -m berm.data.wpp ingest`; the World Bank country/year tables by the
versioned `berm/data/parse_all.py` pipeline. Benchmark normalisers produce their
own derived tables from manifest-locked raw sources.

Excluded only three unnecessary large derived tables: ANFR probe panel, IFCE
normalised panel and FAnGR normalised panel. Their raw sources and summary
metadata are present. Fixture-built unit tests use their own temporary outputs;
no missing-source test was skipped or weakened. The copied input files remain
ignored; the checksum inventory is versioned.

## Validation

- Full Python suite, including both slow panel tests: **2,056 passed in
  159.97 seconds**. The earlier full run also passed (2,055 cases, before one
  additional provenance regression was added). No missing-data or benchmark
  tests were deselected. Thus the old 27 missing-input failures were exercised
  with the actual acquired inputs.
- Independent final review found two additional domain errors: an empty
  tensor axis could contract into a baseline-only response, and a sum of very
  large finite androgen weights could overflow. Both were fixed in their
  public numerical cores. Linear/retarded contraction rejects every empty
  tensor/lag axis; androgen weights are normalised by their maximum before
  summation, preserving the weighted mean across scales `1e-308` to `1e308`.
- After those two final fixes, **72 targeted tests passed in 2.23 seconds**:
  `test_conditional_input_adapters.py`, `test_androgen_capacity.py`,
  `test_lindgren_response.py`, `test_modulome_reproductive_route.py`, and
  `test_model_architecture_contract.py`. These include the new empty-shape and
  weight-overflow regressions, both transfer signs, units/provenance rejection,
  once-only androgen/waiting composition, positional compatibility, unchanged
  archived Finland result, unchanged default scenario exports, and exact
  Python/website architecture agreement. The full-suite count above predates
  these last two numerical guards; it is not presented as a rerun of the newly
  added cases.
- TypeScript architecture contract: **6 passed**. The schema exposes all five
  component statuses and preserves the FieldState/v17 route boundaries.
- Conditional scenario export `--check` passed. `git diff --check` passed.
  All 69 copied data-file hashes remained identical after the first full suite.
- Snapshot preservation inventory: all 41 production-changed/new `berm/`
  files remain. 34 are byte-for-byte identical to `0dc5188`; the seven changed
  files contain the union imports/architecture, the explicit adapters, a v16
  documentation merge and the integration documentation. Executable AST
  equality for the seven archived/core files above was separately checked.

No source changes were made in the live tree. No commit, push, stash application
or production deployment was performed by this model subtask.
