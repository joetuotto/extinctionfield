# Extinction Field / BERM

BERM is a research model for testing whether a measured, local electromagnetic
FieldState can contribute—through explicit biological and demographic
intermediates—to age-specific fertility and total fertility rate (TFR).

The project keeps its historical v16/v17 calculations intact as archived
comparison routes. The canonical interpretation layer is
`fieldstate-asfr-v2`: Lindgren-style field physics → organ-specific biological
state → paired fecundability → ASFR → TFR. It does not convert national mobile
subscriptions into a physical dose or a TFR coefficient.

See [the FieldState–ASFR v2 integration guide](berm/docs/fieldstate-asfr-v2.md)
for the causal graph, evidence boundaries and calibration plan.

See [the BERM–Eco biosähkömagnetiikan ja evolutiivisen lajittumisen
research review](berm/docs/berm-eco-bioelectromagnetic-selection-review.md)
for the parallel ecological test framework: FieldState → species-specific
response → ecological interaction → possible heritable selection. This
framework is a cross-domain validation and research branch; it is not a TFR
coefficient.

## Structure

```
extinctionfield/
├── berm/          # Python package (model core)
├── website/       # Next.js site (extinctionfield.com)
├── docs/          # Documentation (Markdown)
└── data/          # Raw and processed data
```

## BERM Python package

```bash
cd berm
pip install -e ".[dev]"
pytest tests/ -v
```

## Website

```bash
cd website
npm install
npm run dev
```

## Archived v17 predictions

The following are historical v17 scalar-proxy scenario outputs. They remain
available for transparent comparison, but are not FieldState–ASFR-v2 forecasts:
the v2 route requires a matched local FieldState, biological endpoint,
partner/couple and ASFR panel before it can publish calibrated country forecasts.

| Country | Year | Metric | Central | 95% CI | Locked |
|---------|------|--------|---------|--------|--------|
| Finland | 2030 | TFR | 1.17 | [1.02, 1.24] | 2026-08-18 |
| South Korea | 2030 | TFR | 0.55 | [0.42, 0.68] | 2026-08-18 |
| USA | 2030 | TFR | 1.45 | [1.30, 1.58] | 2026-08-18 |
| Japan | 2030 | TFR | 1.05 | [0.88, 1.15] | 2026-08-18 |
| Brazil | 2030 | TFR | 1.55 | [1.40, 1.68] | 2026-08-18 |
| Global | 2040 | TFR | 1.78 | [1.55, 2.05] | 2026-08-18 |
| Global | 2050 | Sperm conc (% of 2020) | 62% | [48%, 75%] | 2026-08-18 |

## License

- Code: MIT
- Documentation: CC BY-4.0
- Data: see individual source licenses
