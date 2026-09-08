# BERM model identity contract

- BERM is the sole explanatory, derivational and prediction model in this repository.
- FieldState is only an optional measurement, observation and estimation branch at BERM's input boundary. It is not a model alias, a causal root, a biological operator or a forecast producer.
- Unless a task explicitly says otherwise, derive mechanisms, closures and predictions from BERM. FieldState may supply a measured or estimated physical record only; never derive tissue response, hormones, ASFR, TFR or political outcomes from FieldState itself.
- Keep four categories explicit in code and copy: Lindgren-derived geometry, imported empirical biology, BERM-proposed conditional mechanisms and open calibration gaps.
- The conditional L2 response operator belongs to BERM. Its gauge prescription, physical scale, tissue kernels, sign, lag and human endpoint calibration remain open. `χ_geo` is a geometric coordinate, not tissue sensitivity.
- Preserve the architecture contract in `website/data/model-architecture.json` and the corresponding Python and website tests. Do not reintroduce `/model/fieldstate` as a canonical route; the canonical measurement route is `/measurement/fieldstate`.
