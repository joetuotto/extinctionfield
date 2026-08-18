"""Housing type EMF factor diagnostic.

DIAGNOSTIC_ONLY — does not affect TFR predictions.

Models how building construction type affects indoor EMF exposure.
Different wall materials attenuate or reflect outdoor RF differently,
and building density affects ambient field strength through
multi-path effects.

Housing types and their indoor attenuation:
  - Wooden frame: low attenuation (0.85-0.95 of outdoor)
  - Brick/masonry: moderate attenuation (0.60-0.80)
  - Concrete/rebar: high attenuation (0.30-0.60)
  - Steel-frame high-rise: variable (0.20-0.50 for outdoor,
    but internal WiFi/device density high)

The net effect depends on the balance between:
  1. Outdoor signal attenuation (reduces base station exposure)
  2. Indoor source density (increases personal exposure)
  3. Reflection-enhanced hotspots (increases peak exposure)

Sources:
  ITU-R P.2040-3 (building entry loss),
  Ofcom 2017 (UK indoor measurements),
  Sagar 2018 (Singapore residential survey).
"""

import math


class HousingType:
    """Housing type EMF characteristics."""

    def __init__(
        self,
        name: str,
        outdoor_attenuation: float,
        indoor_source_density: float,
        reflection_factor: float,
    ):
        self.name = name
        self.outdoor_attenuation = outdoor_attenuation
        self.indoor_source_density = indoor_source_density
        self.reflection_factor = reflection_factor


HOUSING_TYPES = {
    "wooden_frame": HousingType("wooden_frame", 0.90, 1.0, 1.05),
    "brick": HousingType("brick", 0.70, 1.0, 1.15),
    "concrete": HousingType("concrete", 0.45, 1.1, 1.25),
    "steel_highrise": HousingType("steel_highrise", 0.35, 1.4, 1.40),
    "traditional": HousingType("traditional", 0.95, 0.5, 1.00),
}

COUNTRY_HOUSING_MIX = {
    "SouthKorea": {"steel_highrise": 0.60, "concrete": 0.25, "brick": 0.10, "wooden_frame": 0.05},
    "Japan": {"steel_highrise": 0.35, "concrete": 0.30, "wooden_frame": 0.30, "brick": 0.05},
    "Finland": {"wooden_frame": 0.50, "concrete": 0.30, "brick": 0.15, "steel_highrise": 0.05},
    "USA": {"wooden_frame": 0.60, "brick": 0.20, "concrete": 0.10, "steel_highrise": 0.10},
    "Nigeria": {"concrete": 0.30, "brick": 0.25, "traditional": 0.40, "steel_highrise": 0.05},
    "Niger": {"traditional": 0.75, "brick": 0.15, "concrete": 0.08, "steel_highrise": 0.02},
    "India": {"concrete": 0.30, "brick": 0.35, "traditional": 0.25, "steel_highrise": 0.10},
    "China": {"steel_highrise": 0.40, "concrete": 0.35, "brick": 0.15, "traditional": 0.10},
    "Germany": {"brick": 0.40, "concrete": 0.30, "wooden_frame": 0.15, "steel_highrise": 0.15},
    "Brazil": {"concrete": 0.40, "brick": 0.30, "wooden_frame": 0.15, "traditional": 0.10, "steel_highrise": 0.05},
}

DEFAULT_MIX = {"brick": 0.30, "concrete": 0.30, "wooden_frame": 0.25, "steel_highrise": 0.10, "traditional": 0.05}


def housing_emf_factor(country: str) -> dict:
    """Housing-type weighted EMF factor for a country.

    Returns a dict with the weighted outdoor attenuation,
    indoor source density multiplier, and net housing factor.
    """
    mix = COUNTRY_HOUSING_MIX.get(country, DEFAULT_MIX)

    weighted_atten = 0.0
    weighted_density = 0.0
    weighted_reflection = 0.0

    for htype, fraction in mix.items():
        ht = HOUSING_TYPES.get(htype)
        if ht is None:
            continue
        weighted_atten += ht.outdoor_attenuation * fraction
        weighted_density += ht.indoor_source_density * fraction
        weighted_reflection += ht.reflection_factor * fraction

    net_factor = weighted_atten * weighted_density * weighted_reflection

    return {
        "country": country,
        "outdoor_attenuation": round(weighted_atten, 4),
        "indoor_source_density": round(weighted_density, 4),
        "reflection_factor": round(weighted_reflection, 4),
        "net_housing_factor": round(net_factor, 4),
        "housing_mix": mix,
    }


def housing_comparison() -> list[dict]:
    """Compare housing EMF factors across all configured countries."""
    results = []
    for country in sorted(COUNTRY_HOUSING_MIX.keys()):
        r = housing_emf_factor(country)
        results.append({
            "country": country,
            "net_factor": r["net_housing_factor"],
            "outdoor_atten": r["outdoor_attenuation"],
            "indoor_density": r["indoor_source_density"],
        })
    results.sort(key=lambda x: x["net_factor"], reverse=True)
    return results
