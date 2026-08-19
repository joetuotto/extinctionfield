"""Parallel prediction routes: legacy and data-driven.

The legacy route is `berm.model.predict_country_year`, wrapped here unchanged so
both routes can be called through one interface and compared. The data-driven
route predicts ASFR from the ingested UN WPP 2024 base and sums it to TFR, which
is the target architecture:

    E_ambient, E_personal, E_night, E_developmental
        -> R_reproductive -> Phi_couple -> ASFR -> TFR

The data-driven route does not replace the legacy route and does not change its
output. It returns provenance, an explicit assumption inventory and a sensitivity
envelope alongside every number, so a reader can see what is measured, what is a
proxy and what is assumed.

    result = predict_data_driven(
        geography="FIN",
        year=2030,
        model_version="reserve-asfr-v1",
        exposure_scenario="observed_plus_projection",
    )

What the uncertainty interval is, and is not
--------------------------------------------
It is a one-at-a-time envelope: each registered parameter is set to each end of
its declared range while the others hold, and the interval spans the extremes.
It is **not** a confidence interval and carries no probability.

It also does not cover every parameter. Only module-level constants can be varied
without editing source. The exposure-response slope ``bio_capacity.b`` — the most
consequential number in the model — is a function-local literal at
``berm/v16.py:473`` and cannot be varied at all. That is reported in every result
rather than passed over: a parameter that cannot be varied cannot be falsified.
"""

from __future__ import annotations

import contextlib
import inspect
from typing import Iterator

import berm.v16 as v16
from berm.data import wpp
from berm.data.registry import load_parameter_registry, load_source_registry
from berm.model import predict_country_year as _legacy_predict
from berm.outcomes.asfr_data_driven import (
    DEFAULT_REFERENCE_YEAR,
    predict_asfr_data_driven,
    resolve_geography,
)

__all__ = [
    "MODEL_VERSION",
    "EXPOSURE_SCENARIOS",
    "PATCHABLE_PARAMETERS",
    "UNVARIABLE_PARAMETERS",
    "predict_country_year_legacy",
    "predict_country_year_data_driven",
    "predict_data_driven",
    "compare_routes",
    "diagnostic_mechanisms",
]

MODEL_VERSION = "reserve-asfr-v1"

#: Exposure scenarios this route understands. The historical part of the exposure
#: path is identical in both; only the label differs, because the exposure route
#: itself has not yet been migrated off the hardcoded diffusion curve (finding A-2).
EXPOSURE_SCENARIOS: tuple[str, ...] = ("observed_plus_projection",)

#: Registered parameters that are module-level in berm.v16 and can therefore be
#: varied without editing source. Keys are parameter_registry names.
PATCHABLE_PARAMETERS: dict[str, str] = {
    "gamma_cry": "GAMMA_CRY",
    "gamma_melatonin": "GAMMA_MELATONIN",
    "gamma_ovul_vgic": "GAMMA_OVUL_VGIC",
    "gamma_motility": "GAMMA_MOTILITY",
    "gamma_capacitation": "GAMMA_CAPACITATION",
    "gamma_navigation": "GAMMA_NAVIGATION",
    "alpha_eff": "ALPHA_EFF",
}

#: Registered parameters that change the prediction but are function-local
#: literals, so no sensitivity analysis can reach them without a code change.
UNVARIABLE_PARAMETERS: dict[str, str] = {
    "bio_capacity.a": "berm/v16.py:473",
    "bio_capacity.b": "berm/v16.py:473",
    "bio_capacity.threshold": "berm/v16.py:473",
    "floor.cry_effect": "berm/v16.py:438",
    "floor.melatonin": "berm/v16.py:444",
    "floor.ovulation_vgic": "berm/v16.py:452",
    "floor.sperm_ca2": "berm/v16.py:465",
}


def _parse_range(text: str) -> tuple[float, float] | None:
    if not text.startswith("["):
        return None
    try:
        lo, hi = text.strip("[]").split(",")
        return float(lo), float(hi)
    except ValueError:
        return None


def _reset_calibration() -> None:
    """Force v16 to recalibrate and drop the ASFR reference cache."""
    from berm.outcomes.asfr_data_driven import _reference_bio_behav

    v16._v16_true_cultural_rates.clear()
    v16._v16_bio_behav_2024.clear()
    _reference_bio_behav.cache_clear()
    v16.calibrate_v16()


@contextlib.contextmanager
def _patched(attr: str, value: float) -> Iterator[None]:
    original = getattr(v16, attr)
    setattr(v16, attr, value)
    _reset_calibration()
    try:
        yield
    finally:
        setattr(v16, attr, original)
        _reset_calibration()


def diagnostic_mechanisms() -> tuple[str, ...]:
    """Names in berm.v16 whose docstring marks them DIAGNOSTIC_ONLY.

    Read from the source at call time rather than hardcoded, so the list cannot
    drift away from the code it describes.
    """
    out = []
    for name, obj in vars(v16).items():
        if name.startswith("_") or not inspect.isfunction(obj):
            continue
        if obj.__module__ != v16.__name__:
            continue
        doc = inspect.getdoc(obj) or ""
        if "DIAGNOSTIC_ONLY" in doc:
            out.append(name)
    return tuple(sorted(out))


def _assumption_inventory() -> dict:
    """Summarise, from the parameter registry, what the prediction rests on."""
    registry = load_parameter_registry()
    active = {
        name: rec for name, rec in registry.items()
        if "diagnostic" not in rec.active_model_version
    }
    by_grade: dict[str, list[str]] = {}
    for name, rec in active.items():
        by_grade.setdefault(rec.evidence_grade, []).append(name)
    n_assumed = len(by_grade.get("SCENARIO", [])) + len(by_grade.get("UNIDENTIFIED", []))
    return {
        "parameters_in_active_model": len(active),
        "by_evidence_grade": {k: sorted(v) for k, v in sorted(by_grade.items())},
        "assumed_share": n_assumed / len(active) if active else 0.0,
        "unvariable_parameters": dict(sorted(UNVARIABLE_PARAMETERS.items())),
        "note": (
            "SCENARIO and UNIDENTIFIED parameters are assumptions, not measurements. "
            "UNIDENTIFIED means the value is in the code with no recorded origin."
        ),
    }


def _input_provenance(iso3: str, berm_name: str, reference_year: int) -> dict:
    sources = load_source_registry()
    asfr_src = sources[wpp.SOURCE_ID_ASFR]
    return {
        "asfr_base": {
            "source_id": asfr_src.source_id,
            "citation": asfr_src.citation,
            "license": asfr_src.license,
            "retrieved_at": asfr_src.retrieved_at,
            "checksum_sha256": asfr_src.checksum_sha256,
            "measurement_type": "OBSERVED",
            "is_proxy": False,
            "reference_year": reference_year,
            "geography_id": iso3,
        },
        "exposure": {
            "source_id": "BERM_SCENARIO_V17",
            "measurement_type": "SCENARIO_PARAMETER",
            "is_proxy": True,
            "detail": (
                "Ambient and personal exposure still come from the hardcoded "
                "diffusion curve in berm/exposure/personal.py, not from the "
                "downloaded subscription series. See audit finding A-2."
            ),
            "geography_id": iso3,
        },
        "cultural_rate": {
            "source_id": "BERM_SCENARIO_V17",
            "measurement_type": "DERIVED",
            "is_proxy": False,
            "detail": (
                "Fitted per country against observed 2024 TFR by calibrate_v16, "
                "one free parameter per observation. See audit finding A-4."
            ),
            "berm_country": berm_name,
        },
    }


def _data_coverage(iso3: str, year: int, reference_year: int) -> dict:
    ref = wpp.load_asfr(iso3, reference_year)
    target_published = wpp.load_asfr(iso3, year)
    benchmark = None
    if target_published is not None:
        lows = [lo for lo, _ in target_published["uncertainty"] if lo is not None]
        highs = [hi for _, hi in target_published["uncertainty"] if hi is not None]
        benchmark = {
            "wpp_medium_tfr": wpp.asfr_to_tfr(target_published),
            "wpp_series_status": target_published["series_status"],
            "wpp_95pi_tfr": (
                (5.0 * sum(lows) / 1000.0, 5.0 * sum(highs) / 1000.0)
                if len(lows) == len(wpp.AGE_GROUPS) else None
            ),
            "note": (
                "UN's own projection for the same geography-year, shown for "
                "comparison. It is not a BERM output and not a validation of one."
            ),
        }
    return {
        "asfr_reference_available": ref is not None,
        "asfr_reference_status": ref["series_status"] if ref else None,
        "age_groups_covered": len(wpp.AGE_GROUPS),
        "geographies_in_asfr_product": len(wpp.available_geographies()),
        "wpp_benchmark": benchmark,
    }


def _warnings(iso3: str, berm_name: str, year: int, asfr: dict) -> list[str]:
    out = list(asfr["warnings"])
    out.append(
        "Exposure inputs are SCENARIO_PARAMETER, not observations: the active "
        "exposure path uses a hardcoded diffusion curve that deviates from "
        "observed mobile subscriptions by a mean absolute 0.203 (max 0.626)."
    )
    out.append(
        "The cultural rate is fitted with one free parameter per country against "
        "observed 2024 TFR, so any in-sample 2024 agreement is circular."
    )
    out.append(
        "bio_capacity.b, the exposure-response slope, is a function-local literal "
        "and is excluded from the sensitivity envelope; it cannot be varied "
        "without editing berm/v16.py:473."
    )
    n_varied = len(PATCHABLE_PARAMETERS)
    n_active = _assumption_inventory()["parameters_in_active_model"]
    out.append(
        f"The uncertainty interval varies {n_varied} of {n_active} registered "
        f"active parameters, so it UNDERSTATES uncertainty. A narrow interval "
        f"here reflects limited coverage of the sensitivity analysis, not "
        f"precision of the prediction."
    )
    if year > 2050:
        out.append(
            f"Target year {year} is far beyond the calibration anchor (2024); "
            "the cultural-rate compensation term is clipped to [0.05, 2.50] and "
            "may be saturating."
        )
    if wpp.load_asfr(iso3, year) is None:
        out.append(
            f"WPP publishes no ASFR for {iso3} at {year}, so no external "
            "benchmark is available for this year."
        )
    return out


def parameter_sensitivity(
    geography: str,
    year: int,
    reference_year: int = DEFAULT_REFERENCE_YEAR,
) -> dict:
    """One-at-a-time envelope of predicted TFR over registered parameter ranges.

    Not a confidence interval. See the module docstring.
    """
    registry = load_parameter_registry()
    base = predict_asfr_data_driven(geography, year, reference_year)["predicted_tfr"]

    per_parameter = []
    lo_tfr = hi_tfr = base
    for param_name, attr in sorted(PATCHABLE_PARAMETERS.items()):
        rec = registry.get(param_name)
        rng = _parse_range(rec.prior_or_range) if rec else None
        if rng is None:
            continue
        results = []
        for bound in rng:
            with _patched(attr, bound):
                results.append(
                    predict_asfr_data_driven(geography, year, reference_year)["predicted_tfr"]
                )
        per_parameter.append({
            "parameter": param_name,
            "range": rng,
            "tfr_at_range": tuple(results),
            "swing": max(results) - min(results),
            "evidence_grade": rec.evidence_grade,
        })
        lo_tfr = min(lo_tfr, *results)
        hi_tfr = max(hi_tfr, *results)

    per_parameter.sort(key=lambda d: -d["swing"])
    return {
        "central": base,
        "interval": (lo_tfr, hi_tfr),
        "method": "one_at_a_time_envelope",
        "is_confidence_interval": False,
        "parameters_varied": [p["parameter"] for p in per_parameter],
        "parameters_not_variable": sorted(UNVARIABLE_PARAMETERS),
        "per_parameter": per_parameter,
    }


def predict_country_year_legacy(country: str, year: int) -> dict:
    """The active v17 route, unchanged. Present so both routes share an interface."""
    return _legacy_predict(country, year)


def predict_country_year_data_driven(
    geography: str,
    year: int,
    model_version: str = MODEL_VERSION,
    exposure_scenario: str = "observed_plus_projection",
    reference_year: int = DEFAULT_REFERENCE_YEAR,
    with_sensitivity: bool = True,
) -> dict:
    """Predict TFR as the sum of predicted ASFR, with full provenance.

    Returns the fields required of a data-driven route: the prediction, an
    uncertainty interval, input provenance, the assumption inventory, which
    mechanisms are active, which are excluded as diagnostic, data coverage and
    warnings.
    """
    if model_version != MODEL_VERSION:
        raise ValueError(
            f"unknown model_version {model_version!r}; this module implements "
            f"{MODEL_VERSION!r}"
        )
    if exposure_scenario not in EXPOSURE_SCENARIOS:
        raise ValueError(
            f"unknown exposure_scenario {exposure_scenario!r}; "
            f"available: {', '.join(EXPOSURE_SCENARIOS)}"
        )

    iso3, berm_name = resolve_geography(geography)
    asfr = predict_asfr_data_driven(geography, year, reference_year)

    sensitivity = (
        parameter_sensitivity(geography, year, reference_year)
        if with_sensitivity else None
    )

    return {
        "prediction": {
            "geography_id": iso3,
            "berm_country": berm_name,
            "year": year,
            "tfr": asfr["predicted_tfr"],
            "asfr": asfr["predicted_asfr"],
            "age_groups": wpp.AGE_GROUPS,
            "model_version": model_version,
            "exposure_scenario": exposure_scenario,
            "derivation": "TFR = 5 * sum(ASFR) / 1000 over the 15-49 groups",
        },
        "uncertainty_interval": sensitivity["interval"] if sensitivity else None,
        "uncertainty_detail": sensitivity,
        "input_provenance": _input_provenance(iso3, berm_name, reference_year),
        "assumptions": _assumption_inventory(),
        "active_mechanisms": (
            "two_channel_exposure", "cohort_vulnerability_weighting",
            "layer_retention", "biological_capacity", "behavioral_factor",
            "cultural_rate", "asfr_decomposition",
        ),
        "diagnostic_mechanisms_excluded": diagnostic_mechanisms(),
        "data_coverage": _data_coverage(iso3, year, reference_year),
        "warnings": _warnings(iso3, berm_name, year, asfr),
    }


#: Interface named in the integration plan.
predict_data_driven = predict_country_year_data_driven


def compare_routes(geography: str, year: int) -> dict:
    """Run both routes and report the difference. Differences are never absorbed."""
    iso3, berm_name = resolve_geography(geography)
    legacy = predict_country_year_legacy(berm_name, year)
    new = predict_country_year_data_driven(geography, year, with_sensitivity=False)

    lt = legacy["predicted_tfr"]
    nt = new["prediction"]["tfr"]
    return {
        "geography_id": iso3,
        "berm_country": berm_name,
        "year": year,
        "legacy_tfr": lt,
        "data_driven_tfr": nt,
        "absolute_difference": nt - lt,
        "relative_difference": (nt - lt) / nt if nt else None,
        "legacy_engine": "community sigmoid + additive cultural term + IVF correction",
        "data_driven_engine": "WPP ASFR base * cohort bio_behav ratio * cultural shift",
        "note": (
            "The two routes differ in engine as well as in data, so this "
            "difference is not attributable to the data source alone. Use "
            "outcomes.asfr_data_driven.compare_asfr_routes to isolate the "
            "data-source effect with the engine held fixed."
        ),
    }
