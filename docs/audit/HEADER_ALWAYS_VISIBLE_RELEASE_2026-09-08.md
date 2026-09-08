# Always-visible primary navigation, 2026-09-08

## Request and scope

The user clarified that the problem was the primary headings disappearing into a hamburger menu, and that Home also needed to be plainly visible. The header must retain Home and all seven primary groups at every width and during scrolling.

This follow-up starts from published main `92f9307df8d5b4cc26d9ccfdeef234a72732e8be`. The separate repair worktree preserves the user's original working directory. Scientific content, model code, the route catalogue, sources and evidence registries are unchanged.

## Implementation

- One primary list contains Home plus Model, Physics, Biology, Behavior, Civilization, Evidence and About, using the existing localized labels and destinations.
- There is no hamburger or hidden duplicate mobile navigation. At desktop widths the list shares the brand row; narrower widths put the visible list below the brand and let it wrap.
- Each group opens its existing child links. Keyboard navigation, Escape, outside interaction, current-page markers and route-change cleanup are retained. Language and theme controls each appear once.
- The sticky header measures its border-box height before paint and observes later size changes. Anchor margins, sidebars and the atlas detail panel use that height.
- On narrow screens dropdowns span the available header width and have their own bounded scrolling area. The atlas detail panel sits below both the header and an open header dropdown.

## Actual browser checks

Tests used the in-app browser against the local implementation. Every listed layout exposed all eight primary entries, with no hamburger and no horizontal document overflow. The measurements are in `HEADER_ALWAYS_VISIBLE_BROWSER_2026-09-08.json`.

| Locale / width | Header height | Primary navigation layout |
|---|---:|---|
| Finnish, 320 px | 190 px | Three visible category rows |
| Finnish, 390 px | 150 px | Two visible category rows |
| Finnish, 768 / 897 / 1024 px | 110 px | One category row below the brand |
| Finnish, 1280 / 1440 px | 65 px | One shared desktop row |
| French, 390 px | 190 px | Three visible category rows |
| French, 1280 / 1536 px | 65 px | One shared desktop row |
| English / Japanese / Korean, 390 px | 150 px | Two visible category rows |

Additional interaction checks:

- Finnish 390 and 897 px: the complete primary list remains at viewport top after document scrolling.
- Finnish 390 px: the long Evidence dropdown fits between y=153 and y=831 in an 844 px viewport, has its own scrolling area, and exposes its last link by keyboard. Escape restores focus to Evidence and closes the dropdown.
- Finnish 1024 px: following the model's solar-biological anchor leaves the target at y=126.21 below the 110 px header. The model TOC starts at y=126 and ends at y=752 in a 768 px viewport.
- The explicit Home link opens `/fi`, displays the existing home page and receives `aria-current="page"`.
- The Model dropdown opens the atlas. At 897 px its detail panel begins at y=126 below the 110 px header. Browser hit testing confirmed the header dropdown is in front of that panel after lowering the detail panel to z-index 40.
- No browser console errors were observed in the local navigation checks.
- In the compiled production server at 1280×800, all seven dropdowns fit horizontally and vertically and received keyboard focus correctly. Their child-link counts were 2, 4, 9, 7, 8, 18 and 6 respectively; the existing navigation catalogue is unchanged.

The first production check of a fresh `/fi/model#solar-biological` load at 390×844 exposed an additional issue: native fragment scrolling used the pre-hydration 80 px fallback, while the measured header was 150 px. The target was at y=80.15 even though its updated computed margin was 166 px. Publication was paused for a narrowly scoped initial-fragment correction and a production retest. Ordinary clicked anchor navigation had already passed.

Automated tests and the production build are recorded separately in `HEADER_WRAP_WEBSITE_CHECKS_2026-09-08.md`.

## Final production-artifact verification

The initial-fragment correction passed in the rebuilt production server. A final two-pixel reduction of mobile category gaps also kept the active Behaviour label from needlessly moving About onto a third row at 390 pixels.

Final fresh-URL checks at 390×844: the model target appeared at y=166.15 and the behaviour target at y=165.80, both below a 150 px header with 166 px computed anchor margin. Both pages retained all eight visible primary entries on two category rows without horizontal overflow. The explicit Home link also returned to `/fi` and acquired its current-page marker. No browser console errors were observed.

The complete interaction revision passed 470 tests; the final spacing revision then passed another complete production build and the 542-route HTML check. Publication uses a normal fast-forward push to main, followed by public-domain verification. The public deployment's identity and checks are recorded separately after publication.
