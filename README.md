# Extinction Field / BERM

BERM (Bio-Electromagnetic Reproductive Model) is the repository's explanatory,
derivational and prediction model.  It connects explicit physical propositions,
biological mechanisms and demographic intermediates to age-specific fertility
and total fertility rate (TFR).

The project keeps its historical v16/v17 calculations intact as archived
comparison routes.  FieldState v2 is a separate, optional measurement,
observation and estimation module.  It specifies how local electromagnetic
conditions may be recorded at BERM's input boundary; it is neither an alias for
BERM nor the causal root of the model.  The geometry-to-observable coupling
operator (the L2 bridge) remains open, so FieldState observations cannot be
silently converted into biological states or a TFR coefficient.

See [the historical FieldState–ASFR v2 integration guide](berm/docs/fieldstate-asfr-v2.md)
for the measurement interface, evidence boundaries and calibration plan.

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

The following are historical v17.1 scalar-proxy scenario outputs. They remain
available for transparent comparison. They are outputs of the
`berm-v17-scalar-proxy` route, not FieldState-calibrated forecasts.  FieldState
v2 publishes no forecasts; resolving the open L2 bridge would require matched
local measurements and biological endpoints before any downstream calibration.

| Country | Year | Metric | Central | 95% CI | Locked |
|---------|------|--------|---------|--------|--------|
| Finland | 2030 | TFR | 1.08 | [1.02, 1.24] | 2026-08-18 |
| South Korea | 2030 | TFR | 0.61 | [0.48, 0.72] | 2026-08-18 |
| USA | 2030 | TFR | 1.35 | [1.25, 1.65] | 2026-08-18 |
| Japan | 2030 | TFR | 1.01 | [0.88, 1.20] | 2026-08-18 |
| Brazil | 2030 | TFR | 1.44 | [1.40, 1.68] | 2026-08-18 |
| Global | 2040 | TFR | 1.78 | [1.55, 2.05] | 2026-08-18 |
| Global | 2050 | Sperm conc (% of 2020) | 62% | [48%, 75%] | 2026-08-18 |

## License

- Code: MIT
- Documentation: CC BY-4.0
- Data: see individual source licenses
