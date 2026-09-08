# Reproductive regulation: conditional profiles and realization

`berm.biology.reproductive_regulation` adds a structural BERM description of
parallel motivation/encounter, biological capacity and caregiving outputs.
It does not add a fitted suppression index or modify the archived TFR routes.
The same structure is exported under `reproductiveRegulation` in
`website/data/model-architecture.json`.

## Context and observations

A `ReproductiveRegulationProfile` names a biological state, social context,
learning history, species, sex, life stage and observation window. Its eight
comparison axes have different causal roles. `RegulationObservation` preserves
each measure and unit without normalizing them to a syndrome score. Missing
measurements remain absent. A context ID identifies the complete conditioning
record, not merely a study, species or hormone concentration.

The `endocrine_state` axis includes hormone, receptor and genomic-response
measurements, each with its own measure name and unit. The stress axis retains
both HPA measurements and threat-related outputs; it does not require cortisol
to rise in every reproductive suppression protocol. These distinctions preserve
all eight comparison axes already presented in the proxy masking chapter.

`CaregivingAllocation` records the amount for each recipient class in a common
unit. The total budget is not assumed fixed. A rise in care for one recipient
therefore does not imply displacement of care for another or a reduction in
fertility. Hormone target circuits supply the biological interface: PRL-sensitive
kisspeptin/LH reproductive-axis findings and PRL-receptive care-contact circuits
are imported component biology; their joint multi-output interpretation is a
BERM conditional synthesis. Context-specific directions and lags remain explicit.

Canonical claim anchors are `claim.reproduction.selective-regulation`,
`claim.reproduction.caregiving-allocation`,
`claim.behavior.behaviour-to-opportunity` and
`claim.reproduction.social-feedback`. The evidence registry owns the individual
papers, protocol measurements and study-family relationships; the Python module
does not duplicate their bibliography or upgrade the component studies to an
end-to-end field result.

## Conditional event composition

Let `I` indicate intention in the named window, `E` an encounter that exposes
the couple to conception, `C` conception and `B` live birth. Within one common
context `Z = (S, X, L, species, sex, life stage, window)`, the operation is:

```
P(B | Z) = sum_i P(I=i | Z)
                  P(E | I=i, Z)
                  P(C | E, I=i, Z)
                  P(B | C, E, I=i, Z)
```

The two strata are `intention` and `no_intention`. The latter preserves
unplanned conceptions and births even when the intention probability is zero.
Each branch has its own encounter, conception and delivery probabilities; there
is no independence assumption and no shared capacity value imposed across
strata. The opportunity term includes external resources, partner response and
access conditional on intention and context. It is not itself generated from a
hormone value. Intention is biologically conditioned, but its probability is
also caller supplied and must retain its measurement/provenance.

All supplied probabilities are finite and in [0, 1], and both branches must
match the profile's context ID and their distinct intention conditions. The
returned quantities are probabilities of at least one event in that window,
not annual birth rates, expected children or TFR. A calendar/cohort model needs
its own compatible counting and event-history assumptions before using them.

The numerical operation always returns `SYNTHETIC_INFERENCE` and
`STRUCTURAL_ONLY`, even when its supplied components carry calibrated
provenance. Component calibration does not calibrate a new composition. No
function calls `behavioral_factor_v21`, adds a hormone multiplier, or modifies
the existing capacity/ASFR route.

The existing `political_biology.reproductive_suppression_index` still reports
its four-channel diagnostic scenario. Its scalar value does not reconstruct
the new profile's independently recorded motivation, capacity and care. The
same applies to `reproductive_behavior_spectrum`, `effective_fertility_index`
and the `sacculina_hijacking_index` analogy: their numerical results are
preserved, while measured recipient allocation gives the new component
literature a more specific interface. Reusing a study at this interface does
not calibrate the older diagnostic coefficients.

## Canonical topology and feedback

The stable `DEMAND_OPPORTUNITY` ID now identifies reproductively exposed
encounters and attempts. Its two parents are the existing
`INDIVIDUAL_BEHAVIORAL_RESPONSE` and new `REPRODUCTIVE_OPPORTUNITY`. External
opportunities remain explicit context inputs. The existing
`COUPLE_FECUNDABILITY → ASFR` capacity branch remains alongside
`DEMAND_OPPORTUNITY → ASFR`.

`HORMONE_TARGET_RESPONSE` supplies both the individual behavioral and new
`CAREGIVING_ALLOCATION` branches. This is a structural interface, not an
assumption that every hormone or life stage produces the same response.

Care and contacts can affect the next time point's cues, learning and other
actors' responses through the existing social-network/institution operators.
They do not create a cycle in the canonical same-time graph. Epistapege's
observability branch still ends at `INSTITUTIONAL_MODEL_REUSE`; conception does
not require passage through narrative attribution or institutional reuse.

BERM remains the explanatory model. FieldState is an optional physical
measurement/estimation input; geometry-to-tissue identification and human
endpoint calibration remain open.
