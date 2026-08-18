"""BERM command-line interface.

Usage:
    berm predict <country> <year>
    berm predict <country> <start_year> <end_year>
    berm hindcast <country>
    berm countries
"""

from __future__ import annotations

import argparse
import sys

from berm.model import predict_country_year
from berm.data.countries import COUNTRY_PARAMS, HISTORICAL_TFR


def cmd_predict(args: argparse.Namespace) -> None:
    country = args.country
    if country not in COUNTRY_PARAMS:
        print(f"Unknown country: {country}")
        print(f"Available: {', '.join(sorted(COUNTRY_PARAMS.keys()))}")
        sys.exit(1)

    start = args.year
    end = args.end_year or start

    for year in range(start, end + 1):
        r = predict_country_year(country, year)
        print(f"{country} {year}:")
        print(f"  Predicted TFR:    {r['predicted_tfr']:.3f}")
        print(f"  Bio sigmoid TFR:  {r['bio_sigmoid_tfr']:.3f}")
        print(f"  Cultural comp:    {r['cultural_component']:+.1f}")
        print(f"  Ambient EMF:      {r['ambient_emf']:.4f}")
        print(f"  Personal EMF:     {r['personal_emf']:.4f}")
        print(f"  Combined EMF:     {r['combined_emf']:.4f}")
        print(f"  Personal frac:    {r['personal_fraction']:.1%}")
        print(f"  IVF share:        {r['ivf_share']:.1%}")
        print(f"  Biological TFR:   {r['biological_tfr']:.3f}")
        print(f"  Mobile pen:       {r['mobile_pen']:.3f}")
        print()


def cmd_hindcast(args: argparse.Namespace) -> None:
    from berm.hindcast import hindcast_v17

    country = args.country
    if country not in HISTORICAL_TFR:
        print(f"No historical data for: {country}")
        print(f"Available: {', '.join(sorted(HISTORICAL_TFR.keys()))}")
        sys.exit(1)

    h = hindcast_v17(country)
    print(f"{country} hindcast (n={h['n_years']})")
    print(f"  RMSE:      {h['rmse']:.3f}")
    print(f"  MAE:       {h['mae']:.3f}")
    print(f"  Max error: {h['max_error']:.3f}")
    print()
    print(f"  {'Year':>4s}  {'Pred':>6s}  {'Obs':>6s}  {'Error':>7s}")
    for yr in sorted(h["predicted"].keys()):
        print(
            f"  {yr:4d}  {h['predicted'][yr]:6.2f}  "
            f"{h['observed'][yr]:6.2f}  {h['errors'][yr]:+7.2f}"
        )


def cmd_v16(args: argparse.Namespace) -> None:
    from berm.v16 import calibrate_v16, v16_country_tfr, v16_predicted_tfr

    country = args.country
    calibrate_v16()

    start = args.year
    end = args.end_year or start

    for year in range(start, end + 1):
        r = v16_country_tfr(country, year)
        print(f"{country} {year} (v16):")
        print(f"  Predicted TFR:    {r['predicted_tfr']:.3f}")
        print(f"  Bio capacity:     {r['adjusted_bio_cap']:.4f}")
        print(f"  Behavioral V5:    {r['behavioral_v5']:.4f}")
        print(f"  Cultural rate:    {r['true_cultural_adjusted']:.4f}")
        print(f"  Ambient annual:   {r['ambient_annual']:.4f}")
        print(f"  Personal annual:  {r['personal_annual']:.4f}")
        print(f"  AdjCumExposure:   {r['adjusted_cumulative_exposure']:.2f}")
        print(f"  Male bioCap:      {r['male_bio_cap']:.4f}")
        print(f"  Female fertility: {r['female_fertility']:.4f}")
        print(f"  SpermCa2:         {r['sperm_ca2_fecundity']:.4f}")
        print(f"  CRY effect:       {r['cry_effect']:.4f}")
        print(f"  Melatonin:        {r['melatonin_suppression']:.4f}")
        print(f"  OvulVGIC:         {r['ovulation_vgic']:.4f}")
        print(f"  Epigenetic:       {r['epigenetic_factor']:.4f}")
        print(f"  Sex ratio:        {r['predicted_sex_ratio']:.4f}")
        print(f"  Dominant supp:    {r['dominant_suppression']}")
        print(f"  EMF lost:         {r['percent_lost_to_emf']:.1%}")
        print()


def cmd_countries(_args: argparse.Namespace) -> None:
    from berm.data.countries import get_country_params

    print(f"{'Country':>14s}  {'PopDens':>7s}  {'Urban':>5s}  {'MetroDens':>9s}  {'MetroShr':>8s}")
    for name in sorted(COUNTRY_PARAMS.keys()):
        cp = get_country_params(name)
        print(
            f"{name:>14s}  {cp.pop_density:7.1f}  {cp.urban_frac:5.2f}  "
            f"{cp.metro_density:9.0f}  {cp.metro_pop_share:8.2f}"
        )


def main() -> None:
    parser = argparse.ArgumentParser(
        prog="berm",
        description="BERM v17 — BioElectromagnetic Resonance Model",
    )
    sub = parser.add_subparsers(dest="command")

    p_pred = sub.add_parser("predict", help="Predict TFR for a country-year")
    p_pred.add_argument("country", help="Country name (e.g. Finland, SouthKorea)")
    p_pred.add_argument("year", type=int, help="Prediction year")
    p_pred.add_argument("end_year", type=int, nargs="?", help="End year for range")

    p_hind = sub.add_parser("hindcast", help="Run hindcast validation")
    p_hind.add_argument("country", help="Country name")

    p_v16 = sub.add_parser("v16", help="V16 extended model prediction")
    p_v16.add_argument("country", help="Country name")
    p_v16.add_argument("year", type=int, help="Prediction year")
    p_v16.add_argument("end_year", type=int, nargs="?", help="End year for range")

    sub.add_parser("countries", help="List available countries")

    args = parser.parse_args()

    if args.command == "predict":
        cmd_predict(args)
    elif args.command == "hindcast":
        cmd_hindcast(args)
    elif args.command == "v16":
        cmd_v16(args)
    elif args.command == "countries":
        cmd_countries(args)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
