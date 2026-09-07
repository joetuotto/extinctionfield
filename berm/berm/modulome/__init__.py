"""Modulome: how a measurable cell state sets the field response.

The modulome extension keeps the Lindgren physical premise untouched and
sharpens the biological receiver: which state coordinates set the strength,
the direction and the time course of a response, and which measurements
separate the alternatives.

Modules
-------
``state``       receptor readiness, repair capacity and damage load as three
                separately measured quantities
``membrane``    receptor function located in transferable membrane machinery
``calcium``     calcium as a circulation between channel, cytosol, ER and
                mitochondria, with three separately predicted phases
``photostate``  flavin state and ordered light history, per cryptochrome
``polarity``    direction as its own endpoint: alive, motile, misdirected
``tissue``      the local environment, medium-borne messages, immune function
``window``      a response window that depends on the measured state
``feedback``    two coupled disturbances, their gain and their recovery
``cards``       the eight-field mechanism card every record uses

No module carries a default biological coefficient.  Every quantitative
mapping arrives with its parameter and evidence identifiers, and the
calibration status of a result is ``STRUCTURAL_ONLY`` until the whole chain
that produced it is endpoint calibrated.
"""

from berm.modulome._common import (
    ENDPOINT_CALIBRATED,
    MODULOME_VERSION,
    STRUCTURAL_ONLY,
)
from berm.modulome.calcium import (
    CalciumCompartments,
    CalciumKinetics,
    CalciumPhaseSummary,
    CalciumTrace,
    ILLUSTRATIVE_CALCIUM_KINETICS,
    simulate_calcium,
)
from berm.modulome.cards import (
    CARD_FIELDS,
    MECHANISM_CARDS,
    LocalisedText,
    MechanismCard,
    cards_for_layer,
    cards_manifest,
    get_mechanism_card,
    validate_mechanism_cards,
)
from berm.modulome.feedback import (
    POSITIVE_FEEDBACK_IS_NOT_IRREVERSIBILITY,
    CoupledFeedbackLoop,
    FeedbackStability,
    LoopEquilibrium,
    chronic_shift_series,
    irreversibility_requirements,
)
from berm.modulome.membrane import (
    MembraneMachinery,
    TransferMode,
    TransferResult,
    transfer_machinery,
)
from berm.modulome.photostate import (
    SUBTYPE_PARAMETERS,
    CryptochromeIdentity,
    CryptochromeParameters,
    FlavinRedoxState,
    FlavinState,
    LightHistory,
    PhotonEvent,
    SequentialPhotoresponse,
    light_history,
    require_subtype_parameters,
    sequential_two_photon_yield,
)
from berm.modulome.polarity import (
    NAKAJIMA_2015_SCREEN_FIELD_MV_PER_MM,
    DirectionalResponse,
    PolarityMachinery,
    PolarityState,
    galvanotaxis_response,
)
from berm.modulome.state import (
    ILLUSTRATIVE_STATE_KINETICS,
    STATE_MEASUREMENT_VOCABULARY,
    AttenuationAttribution,
    CellStateVector,
    StateKinetics,
    advance_cell_state,
    attribute_reduced_response,
    incremental_response,
    simulate_state_trajectory,
)
from berm.modulome.tissue import (
    BystanderResponse,
    ImmuneFunctionResponse,
    TissueEnvironment,
    bystander_transfer,
    immune_functional_response,
)
from berm.modulome.window import (
    LOCKED_COMPARISON_WINDOW,
    BiologicalDriver,
    StateDependentWindow,
    WindowComparison,
    compare_windows,
    state_dependent_response_power,
)

__all__ = [
    "AttenuationAttribution",
    "BiologicalDriver",
    "BystanderResponse",
    "CARD_FIELDS",
    "CalciumCompartments",
    "CalciumKinetics",
    "CalciumPhaseSummary",
    "CalciumTrace",
    "CellStateVector",
    "CoupledFeedbackLoop",
    "CryptochromeIdentity",
    "CryptochromeParameters",
    "DirectionalResponse",
    "ENDPOINT_CALIBRATED",
    "FeedbackStability",
    "FlavinRedoxState",
    "FlavinState",
    "ILLUSTRATIVE_CALCIUM_KINETICS",
    "ILLUSTRATIVE_STATE_KINETICS",
    "ImmuneFunctionResponse",
    "LOCKED_COMPARISON_WINDOW",
    "LightHistory",
    "LocalisedText",
    "LoopEquilibrium",
    "MECHANISM_CARDS",
    "MODULOME_VERSION",
    "MechanismCard",
    "MembraneMachinery",
    "NAKAJIMA_2015_SCREEN_FIELD_MV_PER_MM",
    "POSITIVE_FEEDBACK_IS_NOT_IRREVERSIBILITY",
    "PhotonEvent",
    "PolarityMachinery",
    "PolarityState",
    "SUBTYPE_PARAMETERS",
    "STATE_MEASUREMENT_VOCABULARY",
    "STRUCTURAL_ONLY",
    "SequentialPhotoresponse",
    "StateDependentWindow",
    "StateKinetics",
    "TissueEnvironment",
    "TransferMode",
    "TransferResult",
    "WindowComparison",
    "advance_cell_state",
    "attribute_reduced_response",
    "bystander_transfer",
    "cards_for_layer",
    "cards_manifest",
    "chronic_shift_series",
    "compare_windows",
    "galvanotaxis_response",
    "get_mechanism_card",
    "immune_functional_response",
    "incremental_response",
    "irreversibility_requirements",
    "light_history",
    "require_subtype_parameters",
    "sequential_two_photon_yield",
    "simulate_calcium",
    "simulate_state_trajectory",
    "state_dependent_response_power",
    "transfer_machinery",
    "validate_mechanism_cards",
]
