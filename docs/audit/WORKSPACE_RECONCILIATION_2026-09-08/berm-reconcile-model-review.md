# BERM model reconciliation review — 2026-09-08

Read-only review of `/Volumes/kovalevy 3/extinctionfield` original working contents against published commit `0840703960d8c044d4224c0fd6e1d963f5ac5a3a`, common base `7a938dd3b528a76008557632fdaf0dca72e13dea`.

## Result

All 41 original model WIP files are represented in the published model: 33 byte-identically, 8 as extended/corrected versions. Across all tracked and untracked model source, docs, data, tests and exporters, 54 files differ: 46 are published-only changes relative to the common base and 8 are divergent. No original-only model change was found. No original implementation function or class disappears in the published version. Three old test names were renamed/replaced to express the advanced architecture/version contracts.

The published model is the correct integration source for the model scope. This is a three-way content conclusion, not an assumption that a later timestamp is better. Every divergent hunk was inspected.

## Divergent-file resolutions

| Path | Resolution and retained value |
| --- | --- |
| `berm/berm/__init__.py` | Keep published. Preserves original exports, adds cross-pathway synthesis exports and updates package release description to 0.22.x. |
| `berm/berm/architecture.py` | Keep published. Retains original L1 geometric status and route structure; adds a componentwise conditional formal response operator with explicit open gauge/scale/tissue/endpoint identification, response state arguments, synthesis manifest and forward civilization aggregation. Corrects legacy proxy/diagnostic/measurement flags that previously said calibrated or locked-forecast-producing. Preserves public specification v17 separately from package 0.22.0. |
| `berm/berm/model_modulome_asfr.py` | Keep published. Every original pathway remains. Optional `retarded_response` adds a provenance-carrying tensor-history driver; optional `androgen` adds binding/receptor pathway capacity. Explicit guards prevent driver duplication, unit mismatch, string-as-ID errors and counting testosterone supply twice. Default/no-new-input route remains unchanged. |
| `berm/berm/modulome/cards.py` | Keep published. Adds validated `intervention_profile_ids` and links existing mechanism cards to the new intervention registry. Original card fields, texts, references and modules are retained. |
| `berm/berm/modulome/reproductive_bridge.py` | Keep published. Only docstring differs: formal conditional response now exists while physical scale and tissue-specific map stay unresolved. No executable loss. |
| `berm/berm/v16.py` | Keep published. Changes relative to original are documentation: Bektas uses GSM-modulated 3.5 GHz, not a 5G NR waveform; adds qualitative biological-state→behavior→report interpretation. Original coefficients, formulas and forecast calculations are unchanged. |
| `berm/docs/conditional-modulome-route.md` | Keep published. Original document is retained and augmented with explicit optional response/androgen input contracts, provenance, units and double-count prevention. |
| `berm/docs/interaction-operators.md` | Keep published. Updates the formal-response status and adds the distinction between the existing unit-bearing social stock model and the new normalized institutional-memory update; both survive. |

## Published advancements that must be imported together

- `physics/lindgren_response.py`: exact tensor perturbation, multichannel cross terms, explicit linear/retarded contractions, signed response history, state context and conditional envelope/beat geometry. Keep its tests and matching architecture/export metadata.
- `biology/androgen_capacity.py`, `modulome/conditional_inputs.py`, `reproductive_state.py`: mass-balance free hormone, binding pools, receptor occupancy and post-receptor gain; the appended androgen gate preserves the previous positional male-state constructor. Keep adapter tests, docs and route integration together.
- `modulome/intervention_protocol.py`, `intervention_examples.py`, `data/evidence/intervention_profiles_v1.json`: named signed ports, separate local-L/local-T/bulk/ER/mitochondrial pools, channel abundance/block/knockdown, calcium as amount with explicit volume, drug target action, repair and state trajectories. Preserve corresponding exporters/cards/tests/source IDs.
- `biology/cross_pathway_synthesis.py`: existing compositional evidence machinery and explicit source-family/relation references. Preserve package exports and website claims/relations when integrating.
- `civilization/epistapege.py`: forward individual-state mixture and institutional memory, alongside the already present social interaction stock model. Preserve both distinct operators and graph nodes.
- `biology/causal_registry.py` and exporters: adds explicit geometric input, androgen availability/use, and behavior→narrative→institution nodes. The apparently removed receptor-memory/coordination/hormone-response declarations are relocations, not deletions.
- `physics/field_state.py`: coherence duration metadata and completeness requirements, with updated tests. This remains measurement metadata and does not replace the BERM causal physical state.
- Supporting docs and compatibility adjustments: source-map/multiscale-closure/pharmacology/conditional route, scalar-proxy distinction, package version and route contracts.

## Already preserved original developments

The original untracked interactions package, calcium/state/feedback/membrane/photostate/polarity/tissue/window modules, calendar operator, mechanism exporters and their existing tests are byte-identical to published. Original tracked CRY/fertilization/CLI/metadata/main route changes also occur verbatim in published. These must not be treated as unrelated collisions or removed; after integration they become ordinary tracked contents of the shared advanced version.

## Method boundary

No source edits were made by this reviewer. No prior syndrome-audit scientific changes were silently included. The source-ID corrections, source-year splits and suggested future mechanism additions from that audit remain separate work. Existing published phrasing that the audit proposes to improve is preserved in this synchronization rather than rewritten opportunistically.

The per-file machine inventory is `/tmp/berm-reconcile-model-review.json`; the complete divergent patch is `/tmp/berm-reconcile-model-divergent.diff`.
