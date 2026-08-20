"""EMF exposure calculation chain."""
from berm.exposure.lindgren import chi, two_channel_exposure
from berm.exposure.personal import two_component_emf, tech_penetration_profile
from berm.exposure.ambient import bimodal_effective_emf, effective_emf_field
from berm.exposure.military_ambient import (
    military_ambient,
    broadcast_ambient,
    total_pre_telecom,
)
from berm.exposure.pulsed_radar_peak import (
    sidelobe_peak_field,
    sidelobe_rms_field,
    peak_rms_ratio,
    pathway_weighted_sigmoid,
    permanent_damage,
    nike_lopar_peak_field,
    nike_lopar_rms_field,
)
from berm.exposure.three_channel import (
    THREE_CHANNEL_VERSION,
    CHANNEL_WEIGHTS,
    three_channel_exposure,
    weighted_exposure,
    covid_paradox_resolution,
    compare_two_vs_three_channel,
)
