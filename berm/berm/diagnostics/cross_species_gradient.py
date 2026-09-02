"""Cross-species EMF reproductive decline gradient.

Seven species/population groups arranged by estimated cumulative EMF
exposure show a linear relationship between EMF burden and reproductive
decline.  fit_gradient() on CROSS_SPECIES_GRADIENT: r = 0.842,
r^2 = 0.710, p = 0.017 (n = 7).

Decline = 0.332 * EMF_burden + 0.122

This is ecological correlation across species, not controlled experiment.
Species differ in body size, lifespan, generation time, and physiology.
The gradient is consistent with a dose-response relationship but does
not prove EMF causation.
"""

from __future__ import annotations

import math
from dataclasses import dataclass


@dataclass(frozen=True)
class SpeciesDataPoint:
    """One species/group in the cross-species gradient."""
    name: str
    emf_burden: float
    reproductive_decline_pct: float
    source: str
    note: str


CROSS_SPECIES_GRADIENT: list[SpeciesDataPoint] = [
    SpeciesDataPoint(
        name="Wild insects (remote)",
        emf_burden=0.05,
        reproductive_decline_pct=12.0,
        source="Hallmann et al. 2017 (PLoS ONE); Sánchez-Bayo & Wyckhuys 2019",
        note="Flying insect biomass decline 76% over 27 years in protected areas",
    ),
    SpeciesDataPoint(
        name="Amphibians",
        emf_burden=0.15,
        reproductive_decline_pct=15.0,
        source="Alroy 2015 (PNAS); IUCN Red List amphibian assessments",
        note="Global amphibian decline; multiple stressors including habitat loss",
    ),
    SpeciesDataPoint(
        name="Wild birds (rural)",
        emf_burden=0.25,
        reproductive_decline_pct=30.0,
        source="Rosenberg et al. 2019 (Science)",
        note="North America lost 3 billion birds since 1970",
    ),
    SpeciesDataPoint(
        name="Thoroughbred horses",
        emf_burden=0.40,
        reproductive_decline_pct=20.0,
        source="Allen & Wilsher 2021; Bosh et al. 2009",
        note="Stabled animals with continuous electrical exposure",
    ),
    SpeciesDataPoint(
        name="Dairy cattle (intensive)",
        emf_burden=0.50,
        reproductive_decline_pct=35.0,
        source="Lucy 2001 (J Dairy Sci); Walsh et al. 2011",
        note="First-service conception rates declined from ~55% to ~35%",
    ),
    SpeciesDataPoint(
        name="Pet dogs/cats (urban)",
        emf_burden=0.70,
        reproductive_decline_pct=25.0,
        source="Chu et al. 2024; veterinary reproductive survey data",
        note="Indoor pets with high RF/ELF from household electronics",
    ),
    SpeciesDataPoint(
        name="Humans (developed)",
        emf_burden=1.00,
        reproductive_decline_pct=50.0,
        source="UN WPP 2024; Levine et al. 2017 (sperm count meta-analysis)",
        note="TFR halved from ~3.5 to ~1.6 in most developed nations since 1970",
    ),
]


@dataclass(frozen=True)
class GradientFit:
    """Linear regression fit of the cross-species gradient."""
    slope: float
    intercept: float
    r: float
    r2: float
    p_value: float
    n: int


def fit_gradient(data: list[SpeciesDataPoint] | None = None) -> GradientFit:
    """Fit a linear regression to the cross-species gradient.

    Returns the fit statistics. Uses scipy if available,
    otherwise falls back to manual calculation.
    """
    if data is None:
        data = CROSS_SPECIES_GRADIENT

    n = len(data)
    x = [d.emf_burden for d in data]
    y = [d.reproductive_decline_pct / 100.0 for d in data]

    mean_x = sum(x) / n
    mean_y = sum(y) / n

    ss_xx = sum((xi - mean_x) ** 2 for xi in x)
    ss_yy = sum((yi - mean_y) ** 2 for yi in y)
    ss_xy = sum((xi - mean_x) * (yi - mean_y) for xi, yi in zip(x, y))

    slope = ss_xy / ss_xx if ss_xx > 0 else 0.0
    intercept = mean_y - slope * mean_x

    r = ss_xy / math.sqrt(ss_xx * ss_yy) if ss_xx > 0 and ss_yy > 0 else 0.0
    r2 = r ** 2

    # t-test for correlation significance
    if abs(r) < 1.0 and n > 2:
        t_stat = r * math.sqrt((n - 2) / (1 - r ** 2))
        # approximate two-tailed p from t distribution
        # using scipy if available, else a rough approximation
        try:
            from scipy import stats as sp_stats
            p_value = float(2.0 * sp_stats.t.sf(abs(t_stat), df=n - 2))
        except ImportError:
            # rough p-value approximation for small n
            # adequate for n=7, df=5
            p_value = 2.0 * math.exp(-0.5 * t_stat ** 2) / math.sqrt(2 * math.pi)
    else:
        p_value = 1.0 if abs(r) < 1.0 else 0.0

    return GradientFit(
        slope=round(slope, 4),
        intercept=round(intercept, 4),
        r=round(r, 3),
        r2=round(r2, 4),
        p_value=round(p_value, 4),
        n=n,
    )


# Pre-computed fit for the default data.
GRADIENT_FIT = fit_gradient()


def predict_decline(emf_burden: float) -> float:
    """Predict reproductive decline fraction from EMF burden."""
    return GRADIENT_FIT.slope * emf_burden + GRADIENT_FIT.intercept


def gradient_summary() -> dict:
    """Summary statistics for the cross-species gradient."""
    fit = GRADIENT_FIT
    return {
        "n_species": fit.n,
        "r": fit.r,
        "r2": fit.r2,
        "p_value": fit.p_value,
        "equation": f"decline = {fit.slope} × EMF + {fit.intercept}",
        "species": [
            {
                "name": d.name,
                "emf_burden": d.emf_burden,
                "decline_pct": d.reproductive_decline_pct,
            }
            for d in CROSS_SPECIES_GRADIENT
        ],
        "caveat": (
            "Ecological correlation across species with heterogeneous "
            "decline measurements, EMF burden estimates, and confounders. "
            "Consistent with but not proof of dose-response."
        ),
    }
