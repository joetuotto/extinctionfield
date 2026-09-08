# BERM cognitive–narrative integration

**Status:** candidate model extension
**Date:** 2026-09-03
**Scope:** BERM civilization branch; no numerical change to v16/v17

## Model contract

BERM remains the explanatory, derivational and prediction model. FieldState is
an optional physical measurement module. It may provide measured exposure
features to a future test, but it does not derive endocrine, cognitive,
behavioural or civilizational mechanisms.

The extension addresses one defined identification problem: a reported cultural
or economic reason can be a sincere downstream consequence of a latent
biological state and can subsequently be entered into an aggregate model as an
independent upstream cause.

## Evidence composition

The proposed bridge is not attributed to any single source. It is composed from
four separately bounded premises.

1. **Limited causal access [E].** Brain-stimulation, split-brain and verbal-report
   research shows that coherent explanations can be produced without access to
   all causal antecedents. Relevant sources are Delgado (1969), Gazzaniga
   (2000, 2011) and Nisbett & Wilson (1977).
2. **Biological control of behavioural weighting [E/M].** Endocrine and neural
   systems alter motivation, effort, threat weighting, social behaviour and
   reproductive function. BERM already represents this family of pathways in
   its biological and behavioural layers.
3. **Survey measurement boundary [M].** A survey item directly measures a
   verbal report. Without a joint biological measurement and temporal design it
   cannot identify whether the report initiated the behaviour, followed it, or
   participates in a feedback loop with it.
4. **Model-selection pressure [E + L*].** Motivated-reasoning research supports
   the empirical possibility that directional goals alter belief access and
   evaluation. Zapffe's anchoring concept supplies a functional philosophical
   interpretation, not an empirical result about science.

The BERM conclusion is therefore a **composed, testable inference [L*]**:

```text
latent biological state
  -> behavioural weighting
  -> accessible causal narrative
  -> survey category
  -> aggregate explanatory variable
```

The claim is not that reported reasons are false. They are real reports and may
become causal inputs through later decisions and institutions. The claim is
that they are not automatically exogenous and cannot identify their own
upstream causal history.

## Epistapege

**Epistapege** is the BERM label for a proposed loss of causal observability.
It is located in the civilization branch:

```text
Pathopege -> Epistapege -> Pathorea -> Pathostasis -> Patopoliteia
```

The mechanism has four parts:

1. biological change alters the distribution of behaviour;
2. limited introspective access produces a coherent accessible explanation;
3. repeated surveys measure the explanation while the biological state remains
   absent;
4. policies and theories are selected against the downstream measurement, so a
   weak intervention response need not update the omitted causal graph.

Epistapege is an **open extension [L*]**, not an established historical stage.
It requires no coordinated action. Ordinary cognition, measurement selection
and institutional model reuse are sufficient to generate the proposed result.

## Three-level mapping

- **Level 1 — biological capacity:** gametes, endocrine effective capacity,
  organ function and couple fecundability.
- **Level 2 — biologically mediated behaviour:** libido, motivation, threat
  weighting, bonding, sleep and effort allocation.
- **Level 3 — cultural and institutional causation:** norms, policy, economic
  constraints, explicit preferences and institutions that retain effects after
  Level 1 and Level 2 are measured.

The extension identifies a Level 2 -> Level 3 measurement error. It does not
eliminate Level 3. Level 2 and Level 3 may form a feedback loop, so temporal
ordering and intervention are required.

## Discriminating tests

### INTERP-1 — biological state before reported reason

Collect longitudinal total and free testosterone, SHBG, cortisol timing,
circadian markers, behaviour, fertility intention and stated reasons. Estimate
whether biological state at time *t* predicts report and behaviour at *t+1*
after prior values and socioeconomic variables are controlled. Compare the
reverse temporal path and require held-out replication.

### INTERP-2 — policy response modification

Estimate age- and parity-specific fertility responses to pronatalist policy.
Register the policy × measured-exposure interaction before outcome access and
separate physical measurements from technology proxies. Include pre-trends,
housing, income, childcare, migration and policy intensity.

### INTERP-3 — shielded crossover mediation

Use randomized shielded and sham conditions with measured spectra and matched
light, sound, temperature, sleep opportunity and expectancy. Register an
ordered biological -> behavioural -> report mediation and explicit carry-over
and washout analyses.

### INTERP-4 — network-interruption natural experiment

Treat interruption as an instrument candidate only where the relevant physical
field actually changes. Measure fields before, during and after the event and
control the direct effects of information loss, work disruption, mobility,
stress, enforcement and power supply.

## Rejection conditions

The fertility application is weakened or rejected if:

- biological variables add no temporal or out-of-sample information beyond
  prior reports and socioeconomic variables;
- the reverse report -> biology path is consistently as strong or stronger;
- a valid upstream intervention changes neither the registered biological
  mediator nor the ordered behavioural/report pathway; and
- matched causal framings do not produce the predicted evidence-threshold
  asymmetry.

Disagreement with BERM is not evidence for Epistapege. Only the registered
measurements can support the extension.

## Implementation locations

- Canonical website derivation: `/civilization/epistapege`
- Legacy compatibility location: `/about/civilization` (not the navigation owner)
- Machine-readable model contract: `berm/civilization/epistapege.py`
- Causal nodes: `BIOBEHAVIORAL_WEIGHTING -> NARRATIVE_ATTRIBUTION -> EPISTAPEGE_OBSERVABILITY_LOSS -> INSTITUTIONAL_MODEL_REUSE`
- BERM model mapping: `/model#epistapege` and `/model#architecture`
- Candidate tests: `/predictions#interpreter-predictions`
- Evidence interpretation: `/evidence`
- Objection and rejection boundary: `/objections`
- Numeric documentation boundary: `berm/berm/v16.py`
