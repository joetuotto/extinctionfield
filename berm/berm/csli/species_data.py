"""Species biology and source-aware endpoint readiness definitions.

Data sources:
  Dog:   Lea RG et al. 2016, Scientific Reports, N=1925 ejaculates
  Bull:  Hensel B et al. 2025/2026, Anim Reprod Sci, N=47,757
  Boar:  Hensel B et al. 2025/2026, Anim Reprod Sci, N=619,368
  Human: Levine H et al. 2017/2023, meta-analysis
  Bee:   COLOSS consortium data
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class SpeciesBiology:
    """Biological parameters for lag scaling law."""

    name: str
    generation_time_days: float
    spermatogenic_cycle_days: float | None
    expected_lag_years: float | None
    role: str = "sentinel"


SPECIES_BIOLOGY_V2: dict[str, SpeciesBiology] = {
    "bee": SpeciesBiology(
        name="Honey bee (Apis mellifera)",
        generation_time_days=42,
        spermatogenic_cycle_days=None,
        expected_lag_years=0.3,
        role="ecological_sentinel",
    ),
    "dog": SpeciesBiology(
        name="Domestic dog (Canis familiaris)",
        generation_time_days=365 * 2,
        spermatogenic_cycle_days=62,
        expected_lag_years=1.0,
        role="primary_sentinel",
    ),
    "bird": SpeciesBiology(
        name="Passerine birds",
        generation_time_days=365,
        spermatogenic_cycle_days=None,
        expected_lag_years=2.0,
        role="ecological_sentinel",
    ),
    "human_sperm": SpeciesBiology(
        name="Human (sperm biomarkers)",
        generation_time_days=365 * 15,
        spermatogenic_cycle_days=74,
        expected_lag_years=0.5,
        role="direct_outcome",
    ),
    "human_tfr": SpeciesBiology(
        name="Human (TFR/ASFR)",
        generation_time_days=365 * 28,
        spermatogenic_cycle_days=74,
        expected_lag_years=4.0,
        role="final_outcome",
    ),
    "bull": SpeciesBiology(
        name="Domestic bull (Bos taurus)",
        generation_time_days=365 * 2,
        spermatogenic_cycle_days=61,
        expected_lag_years=None,
        role="negative_control",
    ),
    "boar": SpeciesBiology(
        name="Domestic boar (Sus domesticus)",
        generation_time_days=365,
        spermatogenic_cycle_days=39,
        expected_lag_years=None,
        role="negative_control",
    ),
}


# ─── Dog endpoint readiness (Lea et al. 2016) ─────────────────────

@dataclass(frozen=True)
class DogEndpoint:
    """Source-aware endpoint context, not a direction-of-effect claim."""

    name: str
    unit: str
    source_status: str
    eligible_for_csli: bool
    requirements: tuple[str, ...]


DOG_ENDPOINT_REQUIREMENTS: tuple[str, ...] = (
    "Observed regional or multi-country dog panel with retained raw observations",
    "Matched observed human biomarker panel at the same geography and calendar resolution",
    "Matched RF dosimetry and kennel/environment covariates",
)


DOG_ENDPOINTS: dict[str, DogEndpoint] = {
    "sperm_progressive_motility": DogEndpoint(
        name="Progressive motility",
        unit="%",
        source_status="FIGURE_DIGITIZED_SINGLE_SITE",
        eligible_for_csli=False,
        requirements=DOG_ENDPOINT_REQUIREMENTS,
    ),
    "sperm_normal_morphology": DogEndpoint(
        name="Normal morphology",
        unit="%",
        source_status="FIGURE_DIGITIZED_SINGLE_SITE",
        eligible_for_csli=False,
        requirements=DOG_ENDPOINT_REQUIREMENTS,
    ),
    "sperm_concentration": DogEndpoint(
        name="Sperm concentration",
        unit="x10^6/mL",
        source_status="FIGURE_DIGITIZED_SINGLE_SITE",
        eligible_for_csli=False,
        requirements=DOG_ENDPOINT_REQUIREMENTS,
    ),
    "dna_fragmentation_index": DogEndpoint(
        name="DNA fragmentation index",
        unit="%",
        source_status="NOT_HELD_IN_LEA_SOURCE",
        eligible_for_csli=False,
        requirements=DOG_ENDPOINT_REQUIREMENTS,
    ),
    "testosterone": DogEndpoint(
        name="Testosterone",
        unit="ng/mL",
        source_status="NOT_HELD_IN_LEA_SOURCE",
        eligible_for_csli=False,
        requirements=DOG_ENDPOINT_REQUIREMENTS,
    ),
    "cryptorchidism_rate": DogEndpoint(
        name="Cryptorchidism prevalence",
        unit="%",
        source_status="FIGURE_DIGITIZED_SINGLE_SITE",
        eligible_for_csli=False,
        requirements=DOG_ENDPOINT_REQUIREMENTS,
    ),
}


# ─── Livestock data (Hensel et al. 2025/2026) ────────────────────

@dataclass(frozen=True)
class LivestockData:
    """Readiness context for a proposed livestock negative control.

    This is deliberately not an observed response series and carries no RF
    exposure estimate.  The held livestock JSON contains citation-level,
    qualitative summaries only; it cannot establish a low-exposure contrast.
    """

    species: str
    source: str
    data_status: str
    rf_exposure_status: str
    eligible_for_csli: bool
    requirements: tuple[str, ...]


LIVESTOCK_DATA: dict[str, LivestockData] = {
    "bull": LivestockData(
        species="bull",
        source="Held livestock citation summary (Wahl 2009; Karoui 2011; Hensel 2026)",
        data_status="NO_NUMERIC_REGION_YEAR_SERIES_HELD",
        rf_exposure_status="NOT_MEASURED",
        eligible_for_csli=False,
        requirements=(
            "Row-level semen observations with source provenance",
            "Matched RF dosimetry at the animal environment",
            "Breeding-selection, collection-protocol, and management covariates",
        ),
    ),
    "boar": LivestockData(
        species="boar",
        source="Held livestock citation summary (Wahl 2009; Karoui 2011; Hensel 2026)",
        data_status="NO_NUMERIC_REGION_YEAR_SERIES_HELD",
        rf_exposure_status="NOT_MEASURED",
        eligible_for_csli=False,
        requirements=(
            "Row-level semen observations with source provenance",
            "Matched RF dosimetry at the animal environment",
            "Breeding-selection, collection-protocol, and management covariates",
        ),
    ),
}


# ─── Exposure-gradient readiness ───────────────────────────────────

# Deliberately no species rank, RF level, or response direction appears here.
# Earlier versions encoded a presumed low→high exposure ordering and qualitative
# publication summaries as if they were observations.  The raw source files
# remain the authoritative record; this module exposes only what a future
# measured exposure-gradient analysis must provide.
EXPOSURE_GRADIENT_REQUIREMENTS: tuple[str, ...] = (
    "Matched numeric RF dosimetry for every compared species environment",
    "Comparable observed biological endpoints at the same geography and calendar resolution",
    "Endpoint-specific confounders, including breeding/collection protocols where applicable",
    "Pre-specified exposure-response model and direction before outcome analysis",
)
