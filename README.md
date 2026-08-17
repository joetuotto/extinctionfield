# Extinction Field

A falsifiable model linking electromagnetic field exposure to global fertility decline.

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

## Locked predictions

This model makes specific, locked predictions that cannot be changed after publication.
Each prediction is timestamped with a git SHA. If future observations fall outside the
confidence interval, the model is falsified — not the prediction adjusted.

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
