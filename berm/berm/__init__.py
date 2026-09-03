"""BERM: Bio-Electromagnetic Reproductive Model Python package.

The 0.21.x number is an implementation-package release, not a BERM model
version.  The public prediction specification remains v17.  FieldState v2 is
an optional measurement/observation specification and is not a model alias,
causal root, or forecast-producing route.

The three-channel implementation remains diagnostic until calibrated.  The
v16/v17 scalar route is retained as an archived comparison for its locked
predictions.
"""
from berm.architecture import (
    CONDITIONAL_ASFR_ROUTE_ID,
    FIELDSTATE_SPEC_VERSION,
    PACKAGE_VERSION,
    PREDICTION_ROUTE_ID,
    PUBLIC_MODEL_VERSION,
    architecture_manifest,
)

__version__ = PACKAGE_VERSION

from berm.model import predict_country_year
from berm.tfr import predict_tfr
from berm.hindcast import hindcast_v17
from berm.v16 import (
    v16_predicted_tfr,
    v16_country_tfr,
    calibrate_v16,
    loocv_v16,
    v17_full_report,
)
from berm.model_fieldstate_asfr import (
    MODEL_VERSION as CONDITIONAL_ASFR_MODEL_VERSION,
    project_wpp_conditional_asfr,
    project_wpp_fieldstate_asfr,
)

# Backward-compatible export.  The value is the conditional ASFR route ID,
# never a BERM or FieldState specification version.
FIELDSTATE_ASFR_MODEL_VERSION = CONDITIONAL_ASFR_MODEL_VERSION
from berm.metadata import (
    MODEL_METADATA,
    REASONING_PROTOCOL_VERSION,
    model_metadata,
)
from berm.evidence_registry import (
    legacy_evidence_summary,
    load_fieldstate_evidence,
    load_legacy_evidence_migration,
)
from berm.evidence_constraints import (
    constraints_for_node,
    evidence_constraint_summary,
    legacy_evidence_placements,
    load_evidence_constraints,
)
from berm.validation.evidence_constrained_hindcast import (
    EVIDENCE_CONSTRAINED_HINDCAST_VERSION,
    default_evidence_constrained_hindcast_specification,
    evidence_constrained_hindcast_summary,
    evaluate_historical_signatures,
)
from berm.exposure.three_channel import (
    THREE_CHANNEL_VERSION,
    CHANNEL_WEIGHTS,
    three_channel_exposure,
    weighted_exposure,
    covid_paradox_resolution,
    compare_two_vs_three_channel,
)
from berm.evidence import (
    THERAPEUTIC_EMF_DEVICES,
    fda_frequency_map,
    icnirp_vs_fda_contradiction,
)
from berm.evidence.testing_protocol_v19 import (
    THREE_CHANNEL_TESTS,
    PARADOX_TESTS,
    all_tests as v19_all_tests,
    high_priority_tests as v19_high_priority_tests,
)
from berm.biology.cell_size_frequency_matrix import (
    BERM_TARGET_CELLS,
    TTFIELDS_CANCER_DATA,
    ttfields_extrapolation_summary,
)
from berm.biology.alpha_therapeutic_calibration import (
    ALPHA_FROM_THERAPEUTIC_DEVICES,
    compare_with_v17_alpha,
)
from berm.biology.vagus_nerve_earbuds import (
    vagus_earbud_analysis,
    hrv_prediction,
)
from berm.biology.mtor_aging import (
    mtor_effective,
    aging_rate_multiplier,
    senescence_accumulation,
    metformin_longevity_benefit,
    mtor_fertility_aging_interaction,
    intervention_comparison,
)

__all__ = [
    "predict_country_year",
    "predict_tfr",
    "hindcast_v17",
    "v16_predicted_tfr",
    "v16_country_tfr",
    "calibrate_v16",
    "loocv_v16",
    "v17_full_report",
    "CONDITIONAL_ASFR_MODEL_VERSION",
    "CONDITIONAL_ASFR_ROUTE_ID",
    "FIELDSTATE_SPEC_VERSION",
    "FIELDSTATE_ASFR_MODEL_VERSION",
    "PREDICTION_ROUTE_ID",
    "PUBLIC_MODEL_VERSION",
    "architecture_manifest",
    "MODEL_METADATA",
    "REASONING_PROTOCOL_VERSION",
    "model_metadata",
    "project_wpp_fieldstate_asfr",
    "project_wpp_conditional_asfr",
    "load_fieldstate_evidence",
    "load_legacy_evidence_migration",
    "legacy_evidence_summary",
    "constraints_for_node",
    "evidence_constraint_summary",
    "legacy_evidence_placements",
    "load_evidence_constraints",
    "EVIDENCE_CONSTRAINED_HINDCAST_VERSION",
    "default_evidence_constrained_hindcast_specification",
    "evidence_constrained_hindcast_summary",
    "evaluate_historical_signatures",
    "mtor_effective",
    "aging_rate_multiplier",
    "senescence_accumulation",
    "metformin_longevity_benefit",
    "mtor_fertility_aging_interaction",
    "intervention_comparison",
    # v19: three-channel model
    "THREE_CHANNEL_VERSION",
    "CHANNEL_WEIGHTS",
    "three_channel_exposure",
    "weighted_exposure",
    "covid_paradox_resolution",
    "compare_two_vs_three_channel",
    # v19: therapeutic device paradox
    "THERAPEUTIC_EMF_DEVICES",
    "fda_frequency_map",
    "icnirp_vs_fda_contradiction",
    # v19: testing protocol
    "THREE_CHANNEL_TESTS",
    "PARADOX_TESTS",
    "v19_all_tests",
    "v19_high_priority_tests",
    # v19: cell size x frequency
    "BERM_TARGET_CELLS",
    "TTFIELDS_CANCER_DATA",
    "ttfields_extrapolation_summary",
    # v19: alpha calibration
    "ALPHA_FROM_THERAPEUTIC_DEVICES",
    "compare_with_v17_alpha",
    # v19: vagus nerve analysis
    "vagus_earbud_analysis",
    "hrv_prediction",
]
