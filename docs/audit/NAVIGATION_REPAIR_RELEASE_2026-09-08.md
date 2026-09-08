# BERM navigation repair, 8 September 2026

## Failure found

The 7 September navigation release (`dpl_59eQAmCE111ZrZC5QQXXQdV2czrH`) was followed by the main-branch pharmacology release (`dpl_GHMWCwMja7Js3E3YPsR4vVyCYeFV`, commit `eb1b0621ee65ca611eb6abb94f472c49af7f9092`). That later release preserved newer physics, Epistapege and pharmacology work but did not contain the navigation branch's changes. The public site therefore showed the older nine-group header and returned 404 for all four new hubs in all five locales. The earlier successful release check and this initial failure are both preserved in the audit files.

## Repair strategy and resulting content

The repair uses an isolated worktree based on the latest main, applying only the navigation delta through three-way comparisons. It does not replace the newer release with the older branch. The user's original dirty worktree is left intact.

- Restores Model → Physics → Biology → Behavior → Civilization → Evidence → About and the four explanatory hubs.
- Retains all 40 navigation targets in current main, including Epistapege and response conditions, and all 38 original targets.
- Retains all 954 changed content lines from main in the five affected pages, plus their reference, claim and DOM identifiers; the content merge audit details the checks.
- Merges 19 navigation references into main's 1172: 1191 total, preserving the 35 newer sources absent from the navigation branch.
- Retains main's 90 claims, 170 evidence relations, 90 assessments and four routes unchanged, adding nine claims, 16 relations, nine assessments and one route.
- Connects the nine new claims to existing atlas nodes with ten bindings; preserves all earlier node and edge bindings and avoids counting a shared claim as independent evidence.
- Keeps every tracked model source, Python test and research-data file unchanged. All 16 other public data files are byte-identical to main.
- Repairs 13 relocated model contents links, the legacy mathematics redirect and the home-page mathematics link. Section navigation now leaves headings visible below the sticky header.
- Repairs three additional atlas link families found in the full HTTP audit: Cav3 links to the existing sensitivity-hierarchy content via a real section ID, biological capacity links directly to its mathematics section, and the dose-response section uses the same stable ID in all five translated records. All associated text and formulas are retained.
- Extracts the shared mathematics component from the Next page module to satisfy route export constraints. All seven extracted content blocks, including copy, IDs and page wrapper/metadata, are byte-identical; the extraction audit records hashes.

## Verification records

- `NAVIGATION_REPAIR_MODEL_CHECKS_2026-09-08.md`: 2120 standard Python tests pass; all three data-export checks and eight CLI roundtrips pass.
- `NAVIGATION_REPAIR_MODEL_SLOW_CHECKS_2026-09-08.md`: both slow tests pass, completing all 2122 current Python tests in separate runs.
- `NAVIGATION_REPAIR_WEBSITE_CHECKS_2026-09-08.md`: full website tests, strict locale coverage, prebuild, build and rendered HTML checks.
- `NAVIGATION_REPAIR_BROWSER_CHECKS_2026-09-08.md`: interactive desktop/mobile, language, mathematics, pharmacology and atlas checks.
- `NAVIGATION_REPAIR_PRESERVATION_2026-09-08.json`: structured main-content preservation checks.
- `FUNCTIONAL_REGISTRY_MERGE_2026-09-08.json`: source and registry union checks.

The current registry validator reports 14 existing DKC candidate warnings and zero errors. These warnings predate this repair. Functional tests do not constitute empirical validation of the model's scientific hypotheses.

## Publication status

The first local production HTTP audit checked 1909 targets and identified the three atlas link families described above (13 broken localized anchors). Its attention-required report is preserved separately. Their fixes passed real-content checks in all five locales; the final full build and HTTP audit both passed. The website suite passed 446/446 tests; 542 rendered routes were clean. The final HTTP run passed all 1909 targets, 15174 internal links, 3272 anchors, 20 hubs, 1191 source identities and 17 data-file hashes with zero exceptions. Validated source is ready for publication. Publication path: commit the repaired source on top of current main and push without rewriting history, so subsequent main deployments contain the navigation changes. The final deployment and live checks will be recorded here after publication.
