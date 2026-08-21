"""
Chronic disease cascade × four-channel EMF model.

DIAGNOSTIC_ONLY — does NOT affect TFR predictions.
Produces diagnostic data for the DiseaseCascadeTimeline visualisation.
"""

from dataclasses import dataclass


@dataclass
class ChannelExposure:
    """Four-channel exposure for a given country and year."""
    static_dc: float
    elf: float
    if_field: float
    rf: float

    @property
    def total(self) -> float:
        return self.static_dc + self.elf + self.if_field + self.rf

    def lindgren_weighted(self) -> float:
        w_static = 0.05
        w_elf = 0.30
        w_if = 0.35
        w_rf = 0.30
        return (w_static * self.static_dc +
                w_elf * self.elf +
                w_if * self.if_field +
                w_rf * self.rf)


def estimate_channel_exposure(country: str, year: int) -> ChannelExposure:
    """Estimate four-channel exposure for a country and year.

    These are placeholder estimates to be replaced by empirical
    ITU + GSMA + RF measurement data.
    """
    # ELF: grid growth (slow, near-universal by 2000)
    elf = min(1.0, 0.3 + 0.02 * max(0, year - 1950))

    # IF: critical channel — EU LED ban 2009 is the inflection point
    if year < 1990:
        if_field = 0.0
    elif year < 2009:
        if_field = 0.02 * (year - 1990)
    elif year < 2013:
        if_field = 0.38 + 0.15 * (year - 2009)
    else:
        if_field = min(2.0, 0.98 + 0.12 * (year - 2013))

    # COVID correction for IF
    if 2020 <= year <= 2021:
        if_field *= 0.3

    # RF: base stations + personal devices
    if year < 1991:
        rf = 0.01
    elif year < 2007:
        rf = 0.01 + 0.03 * (year - 1991)
    elif year < 2012:
        rf = 0.50 + 0.10 * (year - 2007)
    else:
        rf = min(3.0, 1.00 + 0.15 * (year - 2012))

    # COVID correction for RF
    if 2020 <= year <= 2021:
        rf *= 1.4

    # STATIC: synthetic textiles, slow growth
    static_dc = 0.1 + 0.005 * max(0, year - 1970)

    return ChannelExposure(
        static_dc=round(static_dc, 3),
        elf=round(elf, 3),
        if_field=round(if_field, 3),
        rf=round(rf, 3),
    )


@dataclass
class DiseaseCascadeResult:
    """Single disease cascade diagnostic result."""
    disease_id: str
    disease_name: str
    cascade_order: int
    modulome_level: int
    channel_primary: str
    predicted_onset_lag: float
    predicted_acceleration: float
    fda_validation: str
    covid_prediction: str


DISEASE_PARAMS = {
    "sleep": {
        "name": "Sleep disorders",
        "cascade_order": 1,
        "modulome_level": 5,
        "channel_primary": "rf",
        "channel_weight": {"static_dc": 0.0, "elf": 0.1, "if_field": 0.1, "rf": 0.8},
        "onset_lag": 0.5,
        "cumulative_alpha": 0.15,
        "fda_device": "TMS (rTMS)",
    },
    "depression": {
        "name": "Depression",
        "cascade_order": 2,
        "modulome_level": 4,
        "channel_primary": "rf",
        "channel_weight": {"static_dc": 0.0, "elf": 0.2, "if_field": 0.1, "rf": 0.7},
        "onset_lag": 2.0,
        "cumulative_alpha": 0.12,
        "fda_device": "TMS + tDCS",
    },
    "adhd_asd": {
        "name": "ADHD/ASD",
        "cascade_order": 3,
        "modulome_level": 6,
        "channel_primary": "rf",
        "channel_weight": {"static_dc": 0.0, "elf": 0.1, "if_field": 0.3, "rf": 0.6},
        "onset_lag": 5.0,
        "cumulative_alpha": 0.10,
        "fda_device": "VNS",
    },
    "metabolic": {
        "name": "Metabolic syndrome",
        "cascade_order": 4,
        "modulome_level": 2,
        "channel_primary": "elf",
        "channel_weight": {"static_dc": 0.1, "elf": 0.4, "if_field": 0.3, "rf": 0.2},
        "onset_lag": 6.0,
        "cumulative_alpha": 0.08,
        "fda_device": "PEMF",
    },
    "autoimmune": {
        "name": "Autoimmune diseases",
        "cascade_order": 5,
        "modulome_level": 3,
        "channel_primary": "rf",
        "channel_weight": {"static_dc": 0.0, "elf": 0.2, "if_field": 0.2, "rf": 0.6},
        "onset_lag": 8.0,
        "cumulative_alpha": 0.07,
        "fda_device": "VNS",
    },
    "fertility": {
        "name": "Infertility",
        "cascade_order": 6,
        "modulome_level": 6,
        "channel_primary": "if_field",
        "channel_weight": {"static_dc": 0.0, "elf": 0.1, "if_field": 0.5, "rf": 0.4},
        "onset_lag": 10.0,
        "cumulative_alpha": 0.06,
        "fda_device": "TTFields",
    },
    "cancer_young": {
        "name": "Early-onset cancer",
        "cascade_order": 7,
        "modulome_level": 7,
        "channel_primary": "if_field",
        "channel_weight": {"static_dc": 0.05, "elf": 0.15, "if_field": 0.45, "rf": 0.35},
        "onset_lag": 20.0,
        "cumulative_alpha": 0.03,
        "fda_device": "TTFields",
    },
}


def disease_cascade_diagnostic(country: str, year: int) -> list[DiseaseCascadeResult]:
    """Compute cascade diagnostics for all 7 diseases.

    DIAGNOSTIC_ONLY: does not affect TFR predictions.
    """
    results = []
    for disease_id, params in DISEASE_PARAMS.items():
        exposure = estimate_channel_exposure(country, year)

        disease_exposure = (
            params["channel_weight"]["static_dc"] * exposure.static_dc +
            params["channel_weight"]["elf"] * exposure.elf +
            params["channel_weight"]["if_field"] * exposure.if_field +
            params["channel_weight"]["rf"] * exposure.rf
        )

        cum_start = max(1950, int(year - params["onset_lag"]))
        cumulative = sum(
            estimate_channel_exposure(country, y).total
            for y in range(cum_start, year + 1)
        ) * params["cumulative_alpha"]

        predicted_rate = 1.0 + cumulative

        results.append(DiseaseCascadeResult(
            disease_id=disease_id,
            disease_name=params["name"],
            cascade_order=params["cascade_order"],
            modulome_level=params["modulome_level"],
            channel_primary=params["channel_primary"],
            predicted_onset_lag=params["onset_lag"],
            predicted_acceleration=round(predicted_rate, 3),
            fda_validation=params["fda_device"],
            covid_prediction=(
                "IF↓RF↑" if params["channel_primary"] == "if_field" else "RF↑"
            ),
        ))

    return sorted(results, key=lambda r: r.cascade_order)
