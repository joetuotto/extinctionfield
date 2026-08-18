"""Species biology, observed trends, and endpoint definitions.

Data sources:
  Dog:   Lea RG et al. 2016, Scientific Reports, N=1925 ejaculates
  Bull:  Hensel B et al. 2025/2026, Anim Reprod Sci, N=47,757
  Boar:  Hensel B et al. 2025/2026, Anim Reprod Sci, N=619,368
  Human: Levine H et al. 2017/2023, meta-analysis
  Bee:   COLOSS consortium data
"""

from __future__ import annotations

from dataclasses import dataclass, field


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


# ─── Dog endpoints (Lea et al. 2016) ─────────────────────────────

@dataclass(frozen=True)
class DogEndpoint:
    """Reproductive endpoint measured in domestic dog studies."""

    name: str
    unit: str
    lea_2016_trend: str
    human_parallel: str


DOG_ENDPOINTS: dict[str, DogEndpoint] = {
    "sperm_progressive_motility": DogEndpoint(
        name="Progressive motility",
        unit="%",
        lea_2016_trend="declining",
        human_parallel="Levine 2023: motility declining",
    ),
    "sperm_normal_morphology": DogEndpoint(
        name="Normal morphology",
        unit="%",
        lea_2016_trend="declining",
        human_parallel="Levine 2023: morphology declining",
    ),
    "sperm_concentration": DogEndpoint(
        name="Sperm concentration",
        unit="x10^6/mL",
        lea_2016_trend="variable (rose then plateaued)",
        human_parallel="Levine 2023: -62%",
    ),
    "dna_fragmentation_index": DogEndpoint(
        name="DNA fragmentation index",
        unit="%",
        lea_2016_trend="not measured in Lea",
        human_parallel="Houston 2016: increasing",
    ),
    "testosterone": DogEndpoint(
        name="Testosterone",
        unit="ng/mL",
        lea_2016_trend="not measured in Lea",
        human_parallel="Travison 2007: -1.2%/yr",
    ),
    "cryptorchidism_rate": DogEndpoint(
        name="Cryptorchidism prevalence",
        unit="%",
        lea_2016_trend="changed over time",
        human_parallel="increasing in several countries",
    ),
}


# ─── Livestock data (Hensel et al. 2025/2026) ────────────────────

@dataclass(frozen=True)
class LivestockData:
    """Observed semen trends in production animals."""

    species: str
    source: str
    n_ejaculates: int
    period: str
    trend_concentration: str
    trend_motility: str
    emf_exposure: str
    confounders: tuple[str, ...]


LIVESTOCK_DATA: dict[str, LivestockData] = {
    "bull": LivestockData(
        species="bull",
        source="Hensel B et al. 2025/2026, Anim Reprod Sci",
        n_ejaculates=47_757,
        period="1997-2019",
        trend_concentration="improved",
        trend_motility="improved",
        emf_exposure="low (rural, no household Wi-Fi/devices)",
        confounders=(
            "breeding selection (sperm quality = selection criterion)",
            "production environment improvements (temperature, nutrition)",
            "AI station management advances",
        ),
    ),
    "boar": LivestockData(
        species="boar",
        source="Hensel B et al. 2025/2026, Anim Reprod Sci",
        n_ejaculates=619_368,
        period="2005-2023",
        trend_concentration="improved",
        trend_motility="improved",
        emf_exposure="low (production facility, limited RF)",
        confounders=(
            "breeding selection (sperm quality = selection criterion)",
            "production environment improvements (temperature, nutrition)",
            "AI station management advances",
        ),
    ),
}


# ─── Exposure gradient ────────────────────────────────────────────

@dataclass(frozen=True)
class ExposureLevel:
    """Estimated EMF exposure level for a species/environment."""

    species: str
    environment: str
    estimated_rf_level: str
    rank: int
    sperm_trend: str
    trend_direction: int  # -1 declining, 0 stable, +1 improving


EXPOSURE_GRADIENT: list[ExposureLevel] = [
    ExposureLevel(
        species="bull",
        environment="rural/production facility",
        estimated_rf_level="low",
        rank=1,
        sperm_trend="improving (concentration + motility)",
        trend_direction=1,
    ),
    ExposureLevel(
        species="bee",
        environment="outdoor/ambient",
        estimated_rf_level="medium (base stations)",
        rank=2,
        sperm_trend="colony losses increasing",
        trend_direction=-1,
    ),
    ExposureLevel(
        species="dog",
        environment="home/indoor (Wi-Fi, BT, phones, IoT)",
        estimated_rf_level="high",
        rank=3,
        sperm_trend="motility + morphology declining (Lea 2016)",
        trend_direction=-1,
    ),
    ExposureLevel(
        species="human",
        environment="personal/on-body (phone 16h/day)",
        estimated_rf_level="highest",
        rank=4,
        sperm_trend="concentration -62%, motility declining (Levine 2023)",
        trend_direction=-1,
    ),
]
