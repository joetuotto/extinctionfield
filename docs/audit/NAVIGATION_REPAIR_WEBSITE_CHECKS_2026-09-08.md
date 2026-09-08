# Navigation repair: website checks, 2026-09-08

Worktree: `/Users/ottojuote/.berm-navigation-repair-20260908`, branch `codex/restore-navigation-20260908`, based on `eb1b0621ee65ca611eb6abb94f472c49af7f9092`. Checks were run in `website/` after the navigation three-way merge and current-main preservation. The working tree was retained; nothing was reset, committed or published by this check. The current root and website `AGENTS.md` and installed Next 16.3.1 page convention were read.

## Final runs after the atlas-link repairs

| Check | Result | Log |
|---|---|---|
| `npm test` | PASS: 446 tests, 36 files; 9.05 s, started 08:22:56 (test-runner clock). | `/tmp/berm-navigation-repair-vitest-release-20260908.log` |
| `npm run i18n:coverage -- --strict` | PASS: 89 pages containing COPY blocks, 0 blank English keys. | `/tmp/berm-navigation-repair-i18n-release-20260908.log` |
| `npm run build`, including prebuild and postbuild | PASS, exit 0: all prebuild gates, production compilation and postbuild HTML checks. | `/tmp/berm-navigation-repair-build-release-20260908.log` |

The language check does not assert that every page is translated into all five languages. The four new explanatory hubs have full Finnish/English copy and supported English fallback with a translation notice for the other locales.

## Integration failures found and resolved

1. The first full test run returned 438 passed / 2 failed (440 tests): nine new claims lacked atlas bindings, and the independence test still expected four routes. `atlas-claim-bindings.json` now binds the nine distinct claims to the appropriate existing hormone, individual behaviour, narrative and encounter nodes. All 67 original node-binding lists remain intact as ordered prefixes, every original edge binding is unchanged, and 99/99 claims are covered. The synthesis claim is reused at two appropriate nodes as the same claim ID, not counted as two independent findings.
2. The independence test now checks all ten unordered comparisons between five routes: seven dependent, three unknown, zero independently verified. An additional assertion checks the three synthesis-route comparisons sharing the Lindgren 2025, L2 operator and cross-system-transfer premises; the coordination pair also shares Lamia 2011 and Kalafatakis 2018. The demographic comparison remains unknown because selected evidence and the independence audit are incomplete. The underlying scientific requirement was retained.
3. The first build stopped at a TypeScript error in the new TOC test: the mocked `IntersectionObserverEntry` lacked required fields. The navigation agent supplied the complete entry. The subsequent 441-test run passed.
4. A subsequent build exposed an existing invalid Next page export: `mathematics/page.tsx` exported reusable `MathematicsSections` and `mathSectionIds`. These now live in `components/MathematicsSections.tsx`; the original mathematics page, model page and model/math page import the shared component. Metadata, default wrapper, navigation wrapper, helper/data blocks, section renderer and section IDs were preserved byte for byte. The seven-block SHA256 audit is in [NAVIGATION_REPAIR_MATHEMATICS_EXTRACTION_2026-09-08.json](NAVIGATION_REPAIR_MATHEMATICS_EXTRACTION_2026-09-08.json). The exact multisets of 197 reference tokens, 7 direct claim IDs and 23 HTML IDs were retained. The existing Lindgren content test and registry boundary scanner were redirected to include the moved source, preserving their coverage. No generated Next route types were deleted or ignored.

5. Production HTTP review after the first successful build found three old atlas-link families. The navigation agent corrected Cav3 to `/model#vgcc-sensitivity` (the existing VGCC sensitivity hierarchy, now given its own stable ID and scroll offset), reproductive capacity to `/model/math#biocap`, and dose windows to `/about/objections#dose-response`. All five translated dose-window entries already existed; each now carries an explicit stable ID, replacing a render condition that recognized only Finnish and English question text. The authored questions, responses and boundaries are unchanged. The new `CausalMapDestinations` test renders all five locales and checks unique destination IDs, real headings and mechanism-specific content/references. Its five cases passed before the full release rerun.

The targeted atlas/independence run passed 20/20 tests before the final full runs. Root/navigation fixes for TOC route links, legacy routes and header scroll offsets were already present in the latest full runs.

## Non-failing diagnostics

The registry currently reports 14 existing DKC gate warnings and no registry errors: the DKC candidate has no V1–V10-authorized release artifact or passing evidence-search audit. These warnings concern that candidate's scientific publication gate and have not been relabelled as passing. The website build does not grant DKC scientific release authorization.

Vitest reports a forward-looking Vite configuration-loader notice about CommonJS/ESM configuration. ESLint/Babel notes that the existing model and predictions pages exceed 500 KB. Neither notice was hidden or converted into a passing scientific result.

## Generated artifacts and final build result

The final build passed every configured phase:

- Reference index: 1,191 canonical records, 47 aliases, 772 used records. Reference validation: 764 structured IDs and 522 publishable links, no failure.
- Registry: 47 nodes, 96 edges, 15 UI groups; 99 claims, 186 evidence relations, 99 assessments, 5 routes. Zero errors; the 14 DKC warnings above remain visible.
- Anchor index: 183 anchors across 16 files.
- Both prebuild and Next production TypeScript checks passed. `eslint --max-warnings=0` passed.
- Webpack compilation: 11.5 s. Next TypeScript: 4.4 s. All 546 static-generation tasks completed (4.6 s).
- Postbuild scanned 542 prerendered routes: 0 raw reference tokens, 0 empty text elements and 0 empty anchor links.

Build-generated changes relative to the hashes captured before this repair validation sequence are in [NAVIGATION_REPAIR_BUILD_ARTIFACTS_2026-09-08.json](NAVIGATION_REPAIR_BUILD_ARTIFACTS_2026-09-08.json). `lib/referenceUsage.json` changed to identify the extracted shared mathematics source; its route associations are generated through the existing import traversal. `data/anchor-index.json` changed for the atlas additions and moved mathematics claim source locations. `next-env.d.ts` changed from development type imports to standard production type imports and has no Git difference against current main. `lib/referenceIndex.json`, `data/causal-graph.json` and `data/model-architecture.json` were unchanged by these validation runs. The bibliography/claim registry merge had already occurred before the hash snapshot.

`git diff --check` passed after the source extraction and atlas/test changes. No source content or quality gate was suppressed to obtain the successful build.

Browser and production HTTP checks are performed by the root and a separate agent and are recorded in their own audit reports. This report covers local unit/integration tests, language coverage and production compilation/render gates.

The earlier complete verified run passed 441/441 tests, i18n-strict and all build/HTML gates. After the three atlas-link repairs, the final release run above passed 446/446 tests and repeated all remaining gates successfully. Earlier successful logs remain at `/tmp/berm-navigation-repair-{vitest,i18n,build}-verified-20260908.log`; initial failure logs are `/tmp/berm-navigation-repair-vitest-20260908.log`, `/tmp/berm-navigation-repair-build-20260908.log` and `/tmp/berm-navigation-repair-build-final-20260908.log`.
