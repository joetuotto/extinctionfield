# BERM navigation repair — browser checks, 2026-09-08

## Tested source and scope

Repair worktree based on main `eb1b0621ee65ca611eb6abb94f472c49af7f9092`, integrating the 7 September navigation/content delta with the later physics, Epistapege and pharmacology release. Functional UI checks; no change to scientific assessment or model equations.

## Interactive development-build checks

In-app Chromium browser, localhost:3003, Finnish and English; 1440×1000 desktop and 390×844 narrow viewport.

- Seven main navigation groups present and ordered from model/physics to evidence/about.
- Evidence dropdown retains the newer response-conditions and pharmacology destinations.
- Narrow viewport navigation opens, exposes all seven groups, expands sections, and closes after navigation. No horizontal document overflow on the physics hub.
- Epistemology opens under About, retains the new Epistapege link and reading guide; language switch navigates to the same English page.
- Pharmacology explorer loads eight profiles. Changing profile updates the article; search for CoQ10 yields 1/8 and selecting it updates the profile.
- Opening calculation examples renders the endpoint table and chart. Changing evoked calcium to sodium current updates the synthetic four-arm values to 1 / 1.44 / 1 / 1.2907 and the interaction contrast to −0.14926.
- CoQ10 profile exposes three calculation hypotheses. Its atlas link opens the correct selected profile and node, with six visible channels, five connections and the named mechanism details. The return link preserves profile identity.
- Legacy `/fi/mathematics?check=repair#falsification` redirects to `/fi/model/math?check=repair#falsification`; the target is present and rendered, instead of being inside an unopened model-page section.
- Browser verification found anchor headings obscured by the 65px sticky header. A base scroll margin now positions fresh fragment navigation to Lindgren and falsification at ~80px; more specific page utilities retain priority.
- Model contents FieldState input link navigates to `/fi/measurement/fieldstate#fieldstate-input`; the real target is visible at ~80px below the header.
- Browser error log empty after the tested pharmacology, atlas, mathematics and FieldState interactions.

A slow development compilation produced one navigation-command timeout; the subsequent rendered page loaded successfully without a browser runtime error. Production-build checks are recorded separately after the build and deployment.

## Local production-build checks

Successful full build served by `next start` on localhost:3004.

- The cohort link lands at `/fi/model#dual-kernel`, target top ~80px; both the local DKC item and its cohort alias receive `aria-current="location"`.
- The physics-premise link opens `/fi/model/math#lindgren`, target top ~80px, with the extracted shared mathematics content rendered.
- Desktop Evidence menu: ArrowDown focuses its first link; Escape closes it and restores focus to its trigger.
- At 390×844, the mobile menu exposes all seven groups and current Evidence destinations. Opening pharmacology closes the menu.
- The pharmacology calculator loads in production at the narrow viewport; all selects fit the content width and the page has no horizontal document overflow.
- Changing its endpoint to sodium current renders the matching synthetic four-arm table; browser error log remains empty.

The old development tab showed a connection error after the intentional development-server shutdown. A fresh production test tab was used; this was not a production-site failure.

## Final link-fix build

The final build passed 446 website tests and all 542 rendered-page checks. Browser spot checks confirmed the real Japanese `/ja/about/objections#dose-response` content at ~80px below the header and Finnish `/fi/model#vgcc-sensitivity` at its existing Cav3/window-current description. No browser console errors were recorded. The final local HTTP audit covers all remaining localized equivalents and biological-capacity targets.
