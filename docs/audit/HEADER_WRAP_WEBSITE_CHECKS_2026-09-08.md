# Wrapped header: website checks, 2026-09-08

Worktree: `/Users/ottojuote/.berm-navigation-repair-20260908`. This check follows the earlier navigation repair and concerns the always-visible Home + seven primary groups, measured header height and dependent section/TOC offsets.

Latest completed verification, including the direct-fragment correction: **470/470 tests and the full production build pass; 542 prerendered routes have zero HTML-gate findings.** The earlier runs and the subsequent timing issue are retained below in order. Root performs the final production fresh-URL check separately.

| Check | Result | Log |
|---|---|---|
| Full `npm test` | PASS: 456 tests across 36 files; 12.11 s, started 10:07:24 (test-runner clock). | `/tmp/berm-header-webtests-20260908.log` |
| `npm run i18n:coverage -- --strict` | PASS: 89 COPY pages, 0 blank English keys. | `/tmp/berm-header-i18n-20260908.log` |
| Targeted TOC test | PASS: 15/15 tests. | `/tmp/berm-header-toc-test-20260908.log` |
| Targeted TOC/shared-hub ESLint | PASS: 0 errors, 0 warnings. | `/tmp/berm-header-toc-eslint-20260908.log` |
| Atlas detail regression tests after the final stacking change | PASS: 9/9 tests. | `/tmp/berm-header-atlas-test-20260908.log` |
| Navigation tests after the test-type correction | PASS: 24/24 tests. | `/tmp/berm-header-navigation-typefix-test-20260908.log` |
| Production build | PASS, exit 0: complete prebuild, production compilation and postbuild checks. | `/tmp/berm-header-build-final-20260908.log` |

The navigation agent separately reported 66/66 navigation unit/component tests and clean targeted ESLint. The full suite above includes those changes. The existing Vite future-configuration-loader notice remains visible; it is not a test failure.

The TOC height regression test checks the same measured `[data-site-header]` boundary at 64 → 144 → 64 pixels, with the one-rem reading gap. It verifies replacement and disconnection of the old IntersectionObserver, continued observation of the real local anchor, avoiding a redundant replacement for unchanged dimensions, window-resize fallback and complete cleanup. A separate case verifies the 64-pixel fallback when no header measurement is available. The previous semantic destination and active-location tests remain intact.

`ExplanationHub` now uses the shared header-height variable for its sticky top and available viewport height. Long desktop TOCs scroll within that available area. Root's other sticky offsets and the global anchor margin were retained. No model content, sources, claims or mathematical premises were changed by these presentation fixes.

DOM tests validate state, destinations and measurement wiring; real wrapping, dropdown geometry and the visible location of anchored headings are checked separately in the root's browser QA.

The first build stopped in prebuild TypeScript validation (exit 2): `Navigation.test.tsx` passed `exact: true` to `getByRole`, whose typed role options do not support that key. Removing that redundant option preserves exact matching of the string name; all 24 navigation component tests passed afterward. The failure log remains `/tmp/berm-header-build-20260908.log`. No typecheck or quality gate was bypassed.

The full 456-test run preceded the final single-class `AtlasDetail` stacking change (`z-50` → `z-40`). The targeted nine-test atlas run afterward verifies detail opening, navigation, closing, focus and language routes. The actual layering is browser evidence recorded by root (`detailZ: 40`, `menuInFront: true`), not a claim made by jsdom tests. Production compilation is run only after root stopped the development server.

## First production build before the fragment correction

`npm run build` completed successfully after the test-type correction:

- Reference index: 1,191 canonical records, 47 aliases, 772 used references; reference validation passed with 764 structured IDs and 522 publishable links.
- Registry: zero errors, 14 unchanged DKC candidate-gate warnings; 47 nodes, 96 edges, 15 UI groups, 99 claims, 186 evidence relations, 99 assessments and 5 routes. These candidate-gate warnings remain visible and are not treated as DKC scientific release authorization.
- Anchor index: 183 anchors in 16 source files.
- Prebuild TypeScript and `eslint --max-warnings=0` passed. The existing model/predictions page-size Babel notices remain visible.
- Production compilation: 8.9 s; Next TypeScript: 4.2 s; all 546 static-generation tasks completed in 4.9 s.
- Postbuild: 542 prerendered routes checked; zero raw reference tokens, empty text elements or empty links.

There are no tracked changes after this build in `lib/referenceIndex.json`, `lib/referenceUsage.json`, `data/anchor-index.json` or `next-env.d.ts` relative to the current worktree HEAD. `git diff --check` also passed. This check did not start a production server, commit or publish; root owns the production smoke test and publication.

## Follow-up: direct fragment navigation before hydration

Root's fresh production URL test found an additional timing issue after the first successful header build: at a 390-pixel viewport, the header measured 150 pixels and the computed scroll margin was 166 pixels, but a direct hash destination remained at viewport top 80 pixels. The browser had performed native fragment scrolling before the measured header height became available. This does not appear in the DOM-only measurement tests or the static HTML check.

The navigation agent implemented a mount-only animation-frame adjustment for a hash target obscured by the measured header. It waits for DOM parsing when needed, decodes valid fragments and safely ignores invalid or absent ones, respects URL changes, and cancels on user input or unmount. It leaves an already visible target or a target the reader has passed alone. Resizing does not retrigger the initial fragment scroll. Root stopped production port 3004 before this rebuild; production direct-hash behaviour is checked again after the new build.

### Second final verification after the fragment correction

| Check | Result | Log |
|---|---|---|
| Full `npm test` | PASS: 470/470 tests in 36 files; 9.63 s, started 10:18:30 (test-runner clock). | `/tmp/berm-header-webtests-hashfix-20260908.log` |
| `npm run build` | PASS, exit 0: prebuild, production compilation and postbuild all passed. | `/tmp/berm-header-build-hashfix-20260908.log` |

The navigation agent's preceding targeted run passed 80/80 navigation tests, strict ESLint and a fresh non-incremental TypeScript check. The complete 470-test run above includes the 14 additional fragment-correction cases and all prior tests. No translation copy changed in this follow-up; the earlier strict language check remains applicable.

The second final build repeated every gate successfully: reference index 1,191 canonical records / 47 aliases / 772 used records; validated 764 structured IDs and 522 publishable links; registry zero errors with the same 14 DKC candidate-gate warnings; 183 anchors in 16 files; prebuild TypeScript and strict lint passed. Production compilation took 6.3 s, Next TypeScript 2.8 s, and all 546 static-generation tasks completed in 5.4 s. The final HTML gate again scanned 542 prerendered routes with zero raw reference tokens, empty text elements or empty links.

The anchor index has only its generated timestamp changed by the rerun; its anchor content is unchanged. Root will restore that timestamp to HEAD before committing as planned. `git diff --check` passed. No source change was made by this second verification run; root owns the final production hash test, commit and publication.

## Final spacing adjustment for release

Root's production fresh-fragment test passed after the correction: at viewport width 390, the model target appeared at 166.15 pixels below a 150-pixel header; the behaviour target appeared at 205.80 pixels below a 190-pixel header. The latter header gained a third category row because the active behaviour label's heavier weight crossed the wrapping boundary. All navigation labels remained visible.

Root then made one presentation-only adjustment: the primary list uses `gap-x-2.5 sm:gap-x-3`, reducing horizontal gaps from 12 to 10 pixels below 640 pixels to keep the active behaviour navigation on two rows at 390 pixels. No TypeScript, interaction logic, content or test changes accompanied this adjustment. The existing 470-test result applies to the preceding full logic change; the spacing-only revision requires a rebuilt production artifact and root's final 390-pixel behaviour/model visual check.

| Check | Result | Log |
|---|---|---|
| Final `npm run build` after the spacing adjustment | PASS, exit 0: all prebuild, production and postbuild gates. | `/tmp/berm-header-build-spacing-final-20260908.log` |

The final spacing build passed reference/registry validation, prebuild TypeScript and strict lint, production compilation (6.9 s), Next TypeScript (2.4 s), all 546 static-generation tasks (4.9 s), and the 542-route rendered-HTML gate with zero raw tokens, empty text elements or empty links. The scientific registry retains zero errors and its same 14 DKC candidate-gate warnings. No additional full unit-test rerun was performed for this two-pixel gap-only adjustment. Root owns the final production viewport check and publication.
