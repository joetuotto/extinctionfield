"""BERM civilization-level model.

Extends the micro-level EMF-fertility model to macro-historical scales:
solar reconstruction, latitude-dependent susceptibility (chi), biological
carrying capacity (BioCap), migration gradients, and empire lifespan
analysis against the Suess cycle.
"""

from berm.civilization.solar_reconstruction import (
    GRAND_MINIMA,
    GrandMinimum,
    SCHWABE_PERIOD,
    GLEISSBERG_PERIOD,
    SUESS_PERIOD,
    is_grand_minimum,
    solar_activity,
    solar_activity_series,
)
from berm.civilization.chi_map import (
    ELECTRIFICATION_CHI_PEAK,
    ELECTRIFICATION_YEARS,
    chi_electrification,
    chi_latitude,
    chi_total,
)
from berm.civilization.biocap import (
    ALPHA,
    biocap,
    biocap_series,
    electrification_proxy,
    sigma,
    urbanization_proxy,
)
from berm.civilization.migration_gradient import (
    REGIONS,
    Region,
    biocap_gradient,
    gradient_matrix,
    migration_pressure,
)
from berm.civilization.historical_test import (
    EMPIRES,
    RENAISSANCES,
    Empire,
    Renaissance,
    empire_solar_overlap,
    renaissance_solar_correlation,
)
from berm.civilization.empire_lifespan import (
    EXTENDED_EMPIRES,
    empire_lifespan_distribution,
    empire_lifespans,
    lifespan_histogram_bins,
    suess_cycle_match,
)
from berm.civilization.cultural_energy import (
    BIOMARKER_WEIGHTS,
    compute_biocap,
    compute_cultural_energy,
)
from berm.civilization.biomarker_trajectories import (
    BiomarkerTrajectory,
    TRAJECTORIES,
    TREND_DATA,
    biomarker_values_at,
    get_trajectory,
)
from berm.civilization.unwin_validation import (
    PHASE_THRESHOLDS,
    Phase,
    classify_phase,
    detect_transitions,
)
from berm.civilization.sensitivity import (
    sensitivity_all,
    sensitivity_single,
)
from berm.civilization.phase_transitions import (
    identify_transitions,
    predict_next_transition,
)
from berm.civilization.political_biology import (
    BINDING_FOUNDATIONS,
    DIMENSION_FUNCTIONS,
    ENVIRONMENTS,
    IDEOLOGY_PROFILES,
    INDIVIDUALIZING_FOUNDATIONS,
    MORAL_FOUNDATION_FUNCTIONS,
    EMFEnvironment,
    classify_ideology,
    environment_biomarkers,
    environment_comparison,
    environment_profile,
    ideology_trajectory,
    moral_breadth,
    moral_foundations_profile,
    orientation_profile,
    urban_rural_gradient,
)
