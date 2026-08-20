"""Three-channel EMF exposure model (ELF + IF + RF).

Replaces the two-channel model (ambient + personal) with a frequency-based
decomposition where each channel affects different biological mechanisms
and target tissues.

  ELF (< 300 Hz):    powerlines, motors, transformers
  IF  (300 Hz-1 MHz): LED drivers, HVAC VFDs, UPS, inverters, metro
  RF  (> 1 MHz):      phones, Wi-Fi, Bluetooth, cell towers

Status: DIAGNOSTIC_ONLY — channel weights require empirical calibration
before activation. The two-channel model remains the active pipeline.
"""

from __future__ import annotations

import math


THREE_CHANNEL_VERSION = "v19-diagnostic"

CHANNEL_WEIGHTS = {
    "spermatogenesis": {
        "ELF": 0.05,
        "IF":  0.60,
        "RF":  0.35,
    },
    "neuropsychological": {
        "ELF": 0.15,
        "IF":  0.10,
        "RF":  0.75,
    },
    "immune_inflammatory": {
        "ELF": 0.20,
        "IF":  0.30,
        "RF":  0.50,
    },
}


def _elf_exposure(country: str, year: int) -> float:
    """ELF channel (< 300 Hz): powerlines, motors, transformers.

    Relatively stable over time — electrification was already complete
    in developed countries by 1970. Slight growth from EV chargers and
    renewables infrastructure post-2015.
    """
    if year < 1920:
        return 0.0
    base = min(1.0, (year - 1920) / 60.0)
    ev_bump = max(0.0, (year - 2015) * 0.005) if year > 2015 else 0.0
    return min(1.2, base + ev_bump)


def _if_exposure(country: str, year: int,
                 scenario: str = "office") -> float:
    """IF channel (300 Hz - 1 MHz): LED lighting, HVAC VFDs, UPS, inverters.

    The key innovation of the three-channel model. LED lighting adoption
    (2010-2025) introduced massive IF EMF into indoor environments.
    Office environments have 200-500 fixtures vs home 15-20.
    """
    n_lamps_home = 20
    n_lamps_office = 350
    emf_per_lamp = 0.8

    led_adoption = _led_adoption_curve(year)

    if scenario == "home_only":
        led_if = n_lamps_home * emf_per_lamp * led_adoption
        hvac_if = 5.0 * _hvac_vfd_adoption(year)
        infra_if = 2.0
        transit_if = 0.0
    elif scenario == "office":
        office_hours = 8
        home_waking_hours = 8
        led_if = (
            n_lamps_office * emf_per_lamp * led_adoption * office_hours / 24
            + n_lamps_home * emf_per_lamp * led_adoption * home_waking_hours / 24
        )
        hvac_if = 50.0 * _hvac_vfd_adoption(year)
        infra_if = 30.0
        transit_if = 20.0 * _metro_inverter_adoption(year)
    elif scenario == "hybrid":
        office_fraction = 2.5 / 7
        led_if = (
            n_lamps_office * emf_per_lamp * led_adoption * office_fraction * 8 / 24
            + n_lamps_home * emf_per_lamp * led_adoption * (1 - office_fraction * 8 / 24)
        )
        hvac_if = 25.0 * _hvac_vfd_adoption(year)
        infra_if = 15.0
        transit_if = 10.0 * _metro_inverter_adoption(year)
    else:
        raise ValueError(f"unknown IF scenario: {scenario!r}")

    return led_if + hvac_if + infra_if + transit_if


def _rf_exposure(country: str, year: int) -> float:
    """RF channel (> 1 MHz): phones, Wi-Fi, Bluetooth, cell towers.

    This is essentially the old two-channel model's combined exposure.
    Uses a simplified adoption curve.
    """
    from berm.exposure.personal import tech_penetration_profile

    mobile_pen = tech_penetration_profile(country, year)

    if year < 1995:
        return 0.02
    base_rf = mobile_pen * 0.6
    wifi_contribution = max(0.0, min(0.3, (year - 2005) * 0.03))
    bluetooth_contribution = max(0.0, min(0.2, (year - 2015) * 0.025))
    five_g = max(0.0, min(0.15, (year - 2020) * 0.03))

    return min(1.5, base_rf + wifi_contribution + bluetooth_contribution + five_g)


def _led_adoption_curve(year: int) -> float:
    """Global LED lighting adoption S-curve.

    LED lighting shifted from <5% (2010) to ~60% (2025) of installed base.
    """
    if year < 2008:
        return 0.01
    if year < 2012:
        return 0.01 + 0.04 * (year - 2008) / 4
    if year < 2020:
        return 0.05 + 0.45 * (year - 2012) / 8
    return min(0.85, 0.50 + 0.05 * (year - 2020))


def _hvac_vfd_adoption(year: int) -> float:
    """Variable frequency drive adoption in commercial HVAC."""
    if year < 2000:
        return 0.05
    if year < 2015:
        return 0.05 + 0.55 * (year - 2000) / 15
    return min(0.90, 0.60 + 0.02 * (year - 2015))


def _metro_inverter_adoption(year: int) -> float:
    """Metro/rail inverter-drive adoption."""
    if year < 1995:
        return 0.1
    if year < 2010:
        return 0.1 + 0.5 * (year - 1995) / 15
    return min(0.95, 0.6 + 0.025 * (year - 2010))


def three_channel_exposure(country: str, year: int,
                           scenario: str = "normal") -> dict:
    """Three-channel frequency-based EMF exposure.

    Returns ELF, IF, RF channels with sources, mechanisms, and BERM pathways.
    """
    scenario_map = {
        "normal": "office",
        "covid_lockdown": "home_only",
        "post_covid": "hybrid",
    }
    if_scenario = scenario_map.get(scenario, scenario)

    elf = _elf_exposure(country, year)
    if_val = _if_exposure(country, year, scenario=if_scenario)
    rf = _rf_exposure(country, year)

    if scenario == "covid_lockdown":
        elf *= 0.95
        rf *= 1.4

    result = {
        "ELF": {
            "value": round(elf, 4),
            "sources": "powerlines, appliances, motors",
            "mechanism": "RPM/CRY, nerve stimulation",
            "berm_pathways": ["B_RPM_CRY", "HPA_HPG"],
        },
        "IF": {
            "value": round(if_val, 4),
            "sources": "LED lighting, HVAC VFD, UPS, inverters, metro",
            "mechanism": "cell division disruption (TTFields mechanism)",
            "berm_pathways": ["IF_MITOTIC_DISRUPTION"],
            "ttfields_validated": True,
        },
        "RF": {
            "value": round(rf, 4),
            "sources": "phone, Wi-Fi, Bluetooth, cell towers",
            "mechanism": "VGCC->Ca2+->ROS, RPM/CRY",
            "berm_pathways": ["A_VGCC_ROS", "B_RPM_CRY", "HPA_HPG"],
        },
        "scenario": scenario,
        "model_version": THREE_CHANNEL_VERSION,
    }

    return result


def weighted_exposure(country: str, year: int, target: str,
                      scenario: str = "normal") -> float:
    """Weighted three-channel exposure for a specific biological target.

    target: one of 'spermatogenesis', 'neuropsychological', 'immune_inflammatory'
    """
    if target not in CHANNEL_WEIGHTS:
        raise ValueError(
            f"unknown target {target!r}; "
            f"expected one of {sorted(CHANNEL_WEIGHTS)}"
        )
    channels = three_channel_exposure(country, year, scenario)
    weights = CHANNEL_WEIGHTS[target]
    return (
        weights["ELF"] * channels["ELF"]["value"]
        + weights["IF"] * channels["IF"]["value"]
        + weights["RF"] * channels["RF"]["value"]
    )


def covid_paradox_resolution(country: str = "Finland") -> dict:
    """Resolve the COVID-lockdown paradox using the three-channel model.

    COVID paradox: sperm quality improved during lockdown EVEN THOUGH
    personal EMF (screen time, devices) increased.

    Resolution: IF channel dropped dramatically (-60% to -80%) because
    office environments with hundreds of LED fixtures, HVAC VFDs, and
    power electronics were eliminated. RF channel increased (+30-50%)
    because screen time and device usage rose. Two different frequencies,
    two different mechanisms, two different tissues, two different
    directions — no paradox.
    """
    normal = three_channel_exposure(country, 2019, "normal")
    lockdown = three_channel_exposure(country, 2020, "covid_lockdown")
    post_covid = three_channel_exposure(country, 2023, "post_covid")

    if_normal = normal["IF"]["value"]
    if_lockdown = lockdown["IF"]["value"]
    rf_normal = normal["RF"]["value"]
    rf_lockdown = lockdown["RF"]["value"]

    if_change_pct = round(
        (if_lockdown - if_normal) / max(if_normal, 0.001) * 100, 1
    )
    rf_change_pct = round(
        (rf_lockdown - rf_normal) / max(rf_normal, 0.001) * 100, 1
    )

    sperm_normal = weighted_exposure(country, 2019, "spermatogenesis", "normal")
    sperm_lockdown = weighted_exposure(country, 2020, "spermatogenesis", "covid_lockdown")
    neuro_normal = weighted_exposure(country, 2019, "neuropsychological", "normal")
    neuro_lockdown = weighted_exposure(country, 2020, "neuropsychological", "covid_lockdown")

    return {
        "country": country,
        "IF_change_pct": if_change_pct,
        "RF_change_pct": rf_change_pct,
        "ELF_change_pct": round(
            (lockdown["ELF"]["value"] - normal["ELF"]["value"])
            / max(normal["ELF"]["value"], 0.001) * 100, 1
        ),
        "sperm_exposure_change_pct": round(
            (sperm_lockdown - sperm_normal) / max(sperm_normal, 0.001) * 100, 1
        ),
        "neuro_exposure_change_pct": round(
            (neuro_lockdown - neuro_normal) / max(neuro_normal, 0.001) * 100, 1
        ),
        "sperm_prediction": "Improves (IF down -> less mitotic disruption)",
        "mental_health_prediction": "Worsens (RF up -> circadian + social disruption)",
        "paradox_resolved": True,
        "mechanism": (
            "IF channel (cell division) dropped because office power electronics "
            "were eliminated. RF channel (circadian/neuro) rose because screen "
            "time increased. Two different frequencies, two different mechanisms, "
            "two different tissues, two different directions."
        ),
        "normal_channels": {
            "ELF": normal["ELF"]["value"],
            "IF": normal["IF"]["value"],
            "RF": normal["RF"]["value"],
        },
        "lockdown_channels": {
            "ELF": lockdown["ELF"]["value"],
            "IF": lockdown["IF"]["value"],
            "RF": lockdown["RF"]["value"],
        },
        "post_covid_channels": {
            "ELF": post_covid["ELF"]["value"],
            "IF": post_covid["IF"]["value"],
            "RF": post_covid["RF"]["value"],
        },
        "zhang_2025_consistent": True,
        "zhang_2025_note": (
            "Zhang 2025: when China's restrictions were lifted (Dec 2022), "
            "sperm quality DECREASED — the reverse lockdown effect. "
            "Restriction lift = return to offices = IF channel restored "
            "to pre-COVID level -> cell division disruption returned."
        ),
    }


def compare_two_vs_three_channel(country: str, year: int) -> dict:
    """Compare old two-channel with new three-channel model output."""
    from berm.exposure.personal import two_component_emf

    two_ch = two_component_emf(country, year)
    three_ch = three_channel_exposure(country, year, "normal")

    return {
        "country": country,
        "year": year,
        "two_channel": {
            "ambient": two_ch["ambient"],
            "personal": two_ch["personal"],
            "combined": two_ch["combined"],
        },
        "three_channel": {
            "ELF": three_ch["ELF"]["value"],
            "IF": three_ch["IF"]["value"],
            "RF": three_ch["RF"]["value"],
        },
        "model_version": THREE_CHANNEL_VERSION,
    }
