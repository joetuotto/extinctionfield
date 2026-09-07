# Causal atlas coverage and release audit — 2026-09-07

The atlas now uses one shared inventory with six focused views: physics and measurement; cells and response modifiers; organs and health; reproduction and demography; behaviour and society; ecology and evolution. The complete view remains available. Nodes share descriptions, source provenance and links across views. The mobile catalogue has the same coverage as the desktop graph.

## Sources reviewed and coverage

- All 76 original `causalMapData` nodes remain addressable.
- All 39 nodes and 83 typed edges from the Python causal registry are mapped through `MODEL_NODE_MAP`; the JSON model export is imported rather than independently copied.
- All 10 exported modulome mechanism cards, 12 response-modifying layers and 6 organ targets are included.
- The model audit identified 30 additional concepts beyond the semantic graph. The website audit identified 70 additional concepts. Semantic aliases merge overlapping concepts; the final shared inventory contains 233 nodes and 575 directed relations.
- Website coverage includes the model, measurement, biological coordination, modulome/organ pages, evidence subpages, reproduction, neurological development, nutrition/co-exposures, civilization and ecological/evolutionary branches. The machine-readable source inventory and node mappings are in `website/data/causal-atlas-extensions.json`.
- The 39 named VK channel entries and all 17 named feedback loops have searchable aliases on corresponding nodes. Each new node and edge records existing source paths.

## Interpretation

The 2025 Lindgren premise is separate from the singular 2021 formulation. For A = A_bio + a_ext, the tensor perturbation retains both cross terms and the external outer product, with κ normalization stated. The geometric domain and algebraic χ are separate from the open geometry-to-observable L2 operator.

Relation types distinguish conditional model links, response modifiers, ecological differentials, measurement/inference, open coupling propositions, conditional derivation, time-indexed feedback and observed associations. Downstream evidence does not establish the upstream geometry or L2 bridge. Structural and diagnostic scenarios remain uncalibrated as environmental predictions.

Specific corrections include the Kaiser series as observations rather than a biological mediator; EMDEX as magnetic-field measurement; no universal textile or infrastructure dose threshold; no assumed Varroa field immunity; subtype-specific cryptochrome interpretation; a coupled RyR/SERCA cycle; separate male/female/pregnancy gates; explicit demand, tempo and ART inputs; and the five-year-band TFR aggregation formula. The macrophage endpoint is separate from NK-cell function. Unsupported transfer from KCNJ15 directional experiments to sperm fertilization was not included.

## Functionality

- Complete graph and searchable catalogue at every screen size.
- Shared-node links between subatlases; incoming and outgoing relations in node details.
- Search includes Finnish/English labels, mechanisms, canonical model IDs, VK IDs and feedback aliases.
- Stage and evidence filters, empty-result handling and reset.
- Six guided routes use verified consecutive edges and do not inherit hidden search filters.
- URL parameters `atlas`, `node` and `view` support direct links. Invalid values recover safely.
- Keyboard activation, Escape and focus restoration; source links preserve the page locale. English/Finnish channel text falls back explicitly for other locales.
- Layout is generated from the selected inventory, capped at twelve rows per column; no manual coordinate allowlist can silently omit new nodes.

## Validation

Automated coverage tests check independent model/site inventories, node/edge integrity, all model edge directions/types, real source paths and page targets, guided adjacency, searchable aliases, complete subatlas coverage and non-overlapping coordinates. Component tests check mobile coverage, filters, deep links, edge navigation, focus, guided-state isolation and locale preservation.

The final website test suite passed all 287 tests (24 files). Model and site-contract validation passed 107 tests. Browser checks covered 1280, 768 and 390 px widths; search, empty results, guides, node navigation, deep links, automatic graph fitting and French/Japanese source links were checked. No browser errors or horizontal document overflow were observed. The production build passed reference validation, registry integrity, TypeScript, strict lint and optimized build. The rendered-HTML gate scanned 502 routes with zero raw reference tokens, empty content elements or empty anchors. French, Japanese and Korean deep-link/source navigation was also verified.

The existing DKC registry warnings concern unfulfilled scientific publication prerequisites. Their visible research gate remains intact; this atlas release does not authorize a calibrated DKC scientific release.

The final production-package browser check caught and fixed a React Flow interaction regression: disabling selection and dragging also disabled pointer events without a node click handler. The graph now supplies that handler, while the custom node stops event propagation to prevent duplicate activation. Mouse activation, URL selection, Escape and restored node focus were rechecked against the rebuilt production package. All 77 focused atlas tests passed after the correction; the production build and 502-route HTML gate passed again.

Deployment transport checks also exposed the existing global `*.csv` Vercel ignore rule. Public `website/public/data/*.csv` files are now explicitly included, preserving the global-data browser dataset and manifest downloads when deploying from source.

## Production release

Released on 2026-09-07 at 16:13 UTC / 19:13 Helsinki. Vercel deployment `dpl_5ikmz1Lzvq8jzWcj24YsvQ8sfsJg` is Ready and assigned to `www.extinctionfield.com` and `extinctionfield.com`.

- Public atlas: https://www.extinctionfield.com/fi/map
- Immutable deployment: https://extinctionfield-olgqrwz2o-otto-juotes-projects.vercel.app
- The frozen source package was deployed as a compressed archive after prebuilt transfers encountered connection failures and file-upload limits. The ordinary remote dependency installation and all production build gates passed; the remote rendered-HTML gate again checked 502 routes without findings.
- Live browser checks verified the reproduction deep link, six-subatlas selector, ecology switch, VK13 search, graph mouse activation, connection navigation, cleared filters and Escape. No console errors or warnings, or horizontal document overflow, were observed.
- All five atlas locale routes returned HTTP200. The linked evidence page also returned200. Both public CSV downloads returned200 and their SHA-256 hashes exactly matched the tested source package.
