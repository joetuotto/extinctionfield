"""Generate country parameter entries for expansion countries.

Uses World Bank data + heuristics to estimate all parameters needed by
countries.py for the 32 new countries. Output is Python source code that
can be appended to the existing dictionaries.
"""

from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

DATA_DIR = Path(__file__).parent
PROC_DIR = DATA_DIR / "processed"

# Expansion countries: ISO3 → BERM name
EXPANSION = {
    "TUR": "Turkey", "EGY": "Egypt", "IDN": "Indonesia",
    "THA": "Thailand", "VNM": "Vietnam", "POL": "Poland",
    "ROU": "Romania", "UKR": "Ukraine", "KAZ": "Kazakhstan",
    "UZB": "Uzbekistan", "KHM": "Cambodia", "MYS": "Malaysia",
    "DZA": "Algeria", "MAR": "Morocco", "GHA": "Ghana",
    "KEN": "Kenya", "MOZ": "Mozambique", "NPL": "Nepal",
    "LKA": "SriLanka", "COL": "Colombia", "PER": "Peru",
    "CHL": "Chile", "ARG": "Argentina", "TZA": "Tanzania",
    "COD": "DRCongo", "ZAF": "SouthAfrica", "SAU": "SaudiArabia",
    "ARE": "UAE", "SGP": "Singapore", "PHL": "Philippines",
    "ISR": "Israel", "GBR": "UK",
}

# Population density (people/km²), metro density, metro pop share
# Source: World Bank + Wikipedia for metro areas
POP_DENSITY = {
    "Turkey": 110, "Egypt": 103, "Indonesia": 151, "Thailand": 137,
    "Vietnam": 314, "Poland": 121, "Romania": 81, "Ukraine": 69,
    "Kazakhstan": 7, "Uzbekistan": 79, "Cambodia": 97, "Malaysia": 99,
    "Algeria": 18, "Morocco": 83, "Ghana": 137, "Kenya": 94,
    "Mozambique": 39, "Nepal": 203, "SriLanka": 341, "Colombia": 46,
    "Peru": 26, "Chile": 26, "Argentina": 17, "Tanzania": 67,
    "DRCongo": 40, "SouthAfrica": 49, "SaudiArabia": 16, "UAE": 118,
    "Singapore": 8358, "Philippines": 368, "Israel": 400, "UK": 281,
}

METRO_DENSITY = {
    "Turkey": 6500, "Egypt": 12000, "Indonesia": 15000, "Thailand": 5500,
    "Vietnam": 4000, "Poland": 3500, "Romania": 3000, "Ukraine": 3500,
    "Kazakhstan": 2500, "Uzbekistan": 6000, "Cambodia": 4000, "Malaysia": 7000,
    "Algeria": 4000, "Morocco": 5000, "Ghana": 10000, "Kenya": 7000,
    "Mozambique": 5000, "Nepal": 8000, "SriLanka": 3500, "Colombia": 7000,
    "Peru": 9000, "Chile": 5500, "Argentina": 14000, "Tanzania": 5000,
    "DRCongo": 18000, "SouthAfrica": 3500, "SaudiArabia": 4000, "UAE": 5000,
    "Singapore": 8000, "Philippines": 20000, "Israel": 7500, "UK": 5500,
}

METRO_POP_SHARE = {
    "Turkey": 0.20, "Egypt": 0.15, "Indonesia": 0.10, "Thailand": 0.15,
    "Vietnam": 0.10, "Poland": 0.15, "Romania": 0.12, "Ukraine": 0.12,
    "Kazakhstan": 0.15, "Uzbekistan": 0.10, "Cambodia": 0.12, "Malaysia": 0.25,
    "Algeria": 0.12, "Morocco": 0.15, "Ghana": 0.10, "Kenya": 0.08,
    "Mozambique": 0.06, "Nepal": 0.06, "SriLanka": 0.10, "Colombia": 0.15,
    "Peru": 0.30, "Chile": 0.35, "Argentina": 0.35, "Tanzania": 0.05,
    "DRCongo": 0.06, "SouthAfrica": 0.12, "SaudiArabia": 0.25, "UAE": 0.40,
    "Singapore": 1.00, "Philippines": 0.12, "Israel": 0.45, "UK": 0.15,
}

# Attenuation: outage_hours, mountain_frac
OUTAGE_HOURS = {
    "Turkey": 0.5, "Egypt": 1, "Indonesia": 2, "Thailand": 0.5,
    "Vietnam": 1, "Poland": 0, "Romania": 0.5, "Ukraine": 2,
    "Kazakhstan": 1, "Uzbekistan": 1, "Cambodia": 3, "Malaysia": 0.5,
    "Algeria": 2, "Morocco": 1, "Ghana": 3, "Kenya": 3,
    "Mozambique": 4, "Nepal": 4, "SriLanka": 1, "Colombia": 1,
    "Peru": 2, "Chile": 0.5, "Argentina": 0.5, "Tanzania": 4,
    "DRCongo": 6, "SouthAfrica": 1, "SaudiArabia": 0, "UAE": 0,
    "Singapore": 0, "Philippines": 2, "Israel": 0, "UK": 0,
}

MOUNTAIN_FRAC = {
    "Turkey": 0.60, "Egypt": 0.10, "Indonesia": 0.30, "Thailand": 0.25,
    "Vietnam": 0.50, "Poland": 0.10, "Romania": 0.30, "Ukraine": 0.05,
    "Kazakhstan": 0.15, "Uzbekistan": 0.30, "Cambodia": 0.05, "Malaysia": 0.20,
    "Algeria": 0.25, "Morocco": 0.40, "Ghana": 0.05, "Kenya": 0.30,
    "Mozambique": 0.15, "Nepal": 0.80, "SriLanka": 0.30, "Colombia": 0.60,
    "Peru": 0.70, "Chile": 0.80, "Argentina": 0.35, "Tanzania": 0.25,
    "DRCongo": 0.15, "SouthAfrica": 0.10, "SaudiArabia": 0.15, "UAE": 0.05,
    "Singapore": 0.00, "Philippines": 0.30, "Israel": 0.20, "UK": 0.05,
}

SANCTIONS_TECH = {
    "Turkey": 1.0, "Egypt": 0.90, "Indonesia": 1.0, "Thailand": 1.0,
    "Vietnam": 0.95, "Poland": 1.0, "Romania": 1.0, "Ukraine": 0.85,
    "Kazakhstan": 0.90, "Uzbekistan": 0.85, "Cambodia": 0.90, "Malaysia": 1.0,
    "Algeria": 0.85, "Morocco": 0.95, "Ghana": 0.90, "Kenya": 0.90,
    "Mozambique": 0.85, "Nepal": 0.85, "SriLanka": 0.90, "Colombia": 1.0,
    "Peru": 1.0, "Chile": 1.0, "Argentina": 0.95, "Tanzania": 0.85,
    "DRCongo": 0.70, "SouthAfrica": 1.0, "SaudiArabia": 1.0, "UAE": 1.0,
    "Singapore": 1.0, "Philippines": 1.0, "Israel": 1.0, "UK": 1.0,
}

# Network quality (0–1 scale, based on 4G/5G coverage and speed)
NETWORK_Q = {
    "Turkey": 0.72, "Egypt": 0.55, "Indonesia": 0.55, "Thailand": 0.70,
    "Vietnam": 0.60, "Poland": 0.80, "Romania": 0.78, "Ukraine": 0.60,
    "Kazakhstan": 0.60, "Uzbekistan": 0.50, "Cambodia": 0.40, "Malaysia": 0.75,
    "Algeria": 0.45, "Morocco": 0.55, "Ghana": 0.40, "Kenya": 0.50,
    "Mozambique": 0.25, "Nepal": 0.35, "SriLanka": 0.55, "Colombia": 0.60,
    "Peru": 0.50, "Chile": 0.72, "Argentina": 0.60, "Tanzania": 0.35,
    "DRCongo": 0.20, "SouthAfrica": 0.65, "SaudiArabia": 0.82, "UAE": 0.90,
    "Singapore": 0.95, "Philippines": 0.50, "Israel": 0.88, "UK": 0.85,
}

# Cultural pronatalism (TFR-independent cultural pressure toward children)
CULTURAL_PRON = {
    "Turkey": 0.8, "Egypt": 2.5, "Indonesia": 0.6, "Thailand": 0.0,
    "Vietnam": 0.0, "Poland": 0.3, "Romania": 0.2, "Ukraine": 0.0,
    "Kazakhstan": 0.5, "Uzbekistan": 1.5, "Cambodia": 0.3, "Malaysia": 0.5,
    "Algeria": 2.0, "Morocco": 1.5, "Ghana": 2.5, "Kenya": 2.0,
    "Mozambique": 3.0, "Nepal": 0.8, "SriLanka": 0.3, "Colombia": 0.2,
    "Peru": 0.3, "Chile": 0.0, "Argentina": 0.0, "Tanzania": 3.5,
    "DRCongo": 4.0, "SouthAfrica": 0.5, "SaudiArabia": 1.5, "UAE": 0.5,
    "Singapore": -0.3, "Philippines": 1.5, "Israel": 2.0, "UK": 0.0,
}

# IVF share of births
IVF = {
    "Turkey": 0.03, "Egypt": 0.02, "Indonesia": 0.01, "Thailand": 0.02,
    "Vietnam": 0.02, "Poland": 0.03, "Romania": 0.02, "Ukraine": 0.02,
    "Kazakhstan": 0.01, "Uzbekistan": 0.005, "Cambodia": 0.005, "Malaysia": 0.02,
    "Algeria": 0.01, "Morocco": 0.01, "Ghana": 0.002, "Kenya": 0.002,
    "Mozambique": 0.001, "Nepal": 0.002, "SriLanka": 0.01, "Colombia": 0.02,
    "Peru": 0.01, "Chile": 0.03, "Argentina": 0.03, "Tanzania": 0.001,
    "DRCongo": 0.001, "SouthAfrica": 0.02, "SaudiArabia": 0.03, "UAE": 0.04,
    "Singapore": 0.05, "Philippines": 0.01, "Israel": 0.08, "UK": 0.04,
}

# Smartphone penetration 2024 and midpoint year
SMARTPHONE_PEN = {
    "Turkey": 0.78, "Egypt": 0.55, "Indonesia": 0.65, "Thailand": 0.75,
    "Vietnam": 0.70, "Poland": 0.85, "Romania": 0.80, "Ukraine": 0.70,
    "Kazakhstan": 0.70, "Uzbekistan": 0.55, "Cambodia": 0.50, "Malaysia": 0.82,
    "Algeria": 0.55, "Morocco": 0.65, "Ghana": 0.45, "Kenya": 0.50,
    "Mozambique": 0.20, "Nepal": 0.45, "SriLanka": 0.60, "Colombia": 0.70,
    "Peru": 0.65, "Chile": 0.82, "Argentina": 0.80, "Tanzania": 0.30,
    "DRCongo": 0.15, "SouthAfrica": 0.60, "SaudiArabia": 0.90, "UAE": 0.95,
    "Singapore": 0.95, "Philippines": 0.60, "Israel": 0.90, "UK": 0.92,
}

SMARTPHONE_MID = {
    "Turkey": 2015, "Egypt": 2018, "Indonesia": 2017, "Thailand": 2015,
    "Vietnam": 2017, "Poland": 2014, "Romania": 2015, "Ukraine": 2016,
    "Kazakhstan": 2016, "Uzbekistan": 2019, "Cambodia": 2019, "Malaysia": 2014,
    "Algeria": 2019, "Morocco": 2017, "Ghana": 2020, "Kenya": 2019,
    "Mozambique": 2022, "Nepal": 2020, "SriLanka": 2018, "Colombia": 2016,
    "Peru": 2017, "Chile": 2014, "Argentina": 2015, "Tanzania": 2021,
    "DRCongo": 2023, "SouthAfrica": 2017, "SaudiArabia": 2013, "UAE": 2012,
    "Singapore": 2012, "Philippines": 2017, "Israel": 2013, "UK": 2013,
}

# Earpod penetration 2024
EARPOD = {
    "Turkey": 0.12, "Egypt": 0.05, "Indonesia": 0.08, "Thailand": 0.10,
    "Vietnam": 0.08, "Poland": 0.18, "Romania": 0.15, "Ukraine": 0.10,
    "Kazakhstan": 0.08, "Uzbekistan": 0.05, "Cambodia": 0.03, "Malaysia": 0.15,
    "Algeria": 0.05, "Morocco": 0.06, "Ghana": 0.03, "Kenya": 0.04,
    "Mozambique": 0.01, "Nepal": 0.03, "SriLanka": 0.05, "Colombia": 0.10,
    "Peru": 0.08, "Chile": 0.15, "Argentina": 0.12, "Tanzania": 0.02,
    "DRCongo": 0.01, "SouthAfrica": 0.08, "SaudiArabia": 0.20, "UAE": 0.25,
    "Singapore": 0.30, "Philippines": 0.06, "Israel": 0.22, "UK": 0.28,
}

# WiFi penetration 2024 and midpoint
WIFI_PEN = {
    "Turkey": 0.80, "Egypt": 0.50, "Indonesia": 0.55, "Thailand": 0.70,
    "Vietnam": 0.60, "Poland": 0.88, "Romania": 0.85, "Ukraine": 0.65,
    "Kazakhstan": 0.65, "Uzbekistan": 0.45, "Cambodia": 0.30, "Malaysia": 0.85,
    "Algeria": 0.45, "Morocco": 0.55, "Ghana": 0.25, "Kenya": 0.30,
    "Mozambique": 0.10, "Nepal": 0.25, "SriLanka": 0.40, "Colombia": 0.60,
    "Peru": 0.55, "Chile": 0.80, "Argentina": 0.75, "Tanzania": 0.15,
    "DRCongo": 0.08, "SouthAfrica": 0.55, "SaudiArabia": 0.90, "UAE": 0.95,
    "Singapore": 0.98, "Philippines": 0.40, "Israel": 0.92, "UK": 0.95,
}

WIFI_MID = {
    "Turkey": 2014, "Egypt": 2017, "Indonesia": 2017, "Thailand": 2014,
    "Vietnam": 2017, "Poland": 2012, "Romania": 2013, "Ukraine": 2015,
    "Kazakhstan": 2015, "Uzbekistan": 2018, "Cambodia": 2020, "Malaysia": 2012,
    "Algeria": 2018, "Morocco": 2016, "Ghana": 2020, "Kenya": 2019,
    "Mozambique": 2022, "Nepal": 2020, "SriLanka": 2018, "Colombia": 2015,
    "Peru": 2016, "Chile": 2012, "Argentina": 2013, "Tanzania": 2021,
    "DRCongo": 2023, "SouthAfrica": 2016, "SaudiArabia": 2012, "UAE": 2010,
    "Singapore": 2008, "Philippines": 2018, "Israel": 2010, "UK": 2008,
}

# IoT devices per household 2024
IOT = {
    "Turkey": 8, "Egypt": 4, "Indonesia": 5, "Thailand": 8,
    "Vietnam": 5, "Poland": 12, "Romania": 10, "Ukraine": 5,
    "Kazakhstan": 6, "Uzbekistan": 3, "Cambodia": 2, "Malaysia": 12,
    "Algeria": 4, "Morocco": 5, "Ghana": 2, "Kenya": 3,
    "Mozambique": 1, "Nepal": 2, "SriLanka": 4, "Colombia": 6,
    "Peru": 5, "Chile": 10, "Argentina": 8, "Tanzania": 1,
    "DRCongo": 1, "SouthAfrica": 6, "SaudiArabia": 15, "UAE": 20,
    "Singapore": 22, "Philippines": 4, "Israel": 18, "UK": 18,
}

# Smartphone in bedroom fraction
BEDROOM = {
    "Turkey": 0.65, "Egypt": 0.55, "Indonesia": 0.60, "Thailand": 0.65,
    "Vietnam": 0.55, "Poland": 0.68, "Romania": 0.65, "Ukraine": 0.60,
    "Kazakhstan": 0.55, "Uzbekistan": 0.50, "Cambodia": 0.40, "Malaysia": 0.70,
    "Algeria": 0.50, "Morocco": 0.55, "Ghana": 0.40, "Kenya": 0.45,
    "Mozambique": 0.30, "Nepal": 0.40, "SriLanka": 0.50, "Colombia": 0.60,
    "Peru": 0.55, "Chile": 0.70, "Argentina": 0.65, "Tanzania": 0.35,
    "DRCongo": 0.25, "SouthAfrica": 0.55, "SaudiArabia": 0.75, "UAE": 0.80,
    "Singapore": 0.80, "Philippines": 0.55, "Israel": 0.75, "UK": 0.72,
}

# Cultural TFR params: (floor, amplitude, decay_rate)
CULTURAL_TFR = {
    "Turkey": (1.2, 5.0, 0.035), "Egypt": (1.8, 5.5, 0.02),
    "Indonesia": (1.3, 5.5, 0.03), "Thailand": (1.0, 5.0, 0.05),
    "Vietnam": (1.1, 5.5, 0.04), "Poland": (1.1, 3.5, 0.04),
    "Romania": (1.1, 3.5, 0.04), "Ukraine": (1.0, 3.5, 0.045),
    "Kazakhstan": (1.5, 5.0, 0.025), "Uzbekistan": (1.8, 5.5, 0.02),
    "Cambodia": (1.3, 5.5, 0.03), "Malaysia": (1.2, 5.0, 0.035),
    "Algeria": (1.5, 5.5, 0.025), "Morocco": (1.3, 5.5, 0.03),
    "Ghana": (1.8, 5.5, 0.018), "Kenya": (1.5, 5.5, 0.02),
    "Mozambique": (2.0, 5.5, 0.015), "Nepal": (1.2, 5.5, 0.035),
    "SriLanka": (1.2, 4.5, 0.035), "Colombia": (1.2, 5.0, 0.035),
    "Peru": (1.3, 5.0, 0.03), "Chile": (1.0, 4.5, 0.04),
    "Argentina": (1.1, 4.5, 0.035), "Tanzania": (2.0, 5.5, 0.015),
    "DRCongo": (2.5, 5.5, 0.012), "SouthAfrica": (1.2, 5.0, 0.03),
    "SaudiArabia": (1.3, 5.5, 0.025), "UAE": (1.0, 5.0, 0.04),
    "Singapore": (0.9, 4.0, 0.05), "Philippines": (1.5, 5.5, 0.025),
    "Israel": (2.0, 5.0, 0.015), "UK": (1.2, 3.5, 0.035),
}

# Data quality score (0-1)
DATA_Q = {
    "Turkey": 0.80, "Egypt": 0.70, "Indonesia": 0.70, "Thailand": 0.80,
    "Vietnam": 0.70, "Poland": 0.90, "Romania": 0.85, "Ukraine": 0.70,
    "Kazakhstan": 0.70, "Uzbekistan": 0.60, "Cambodia": 0.50, "Malaysia": 0.85,
    "Algeria": 0.60, "Morocco": 0.70, "Ghana": 0.55, "Kenya": 0.60,
    "Mozambique": 0.40, "Nepal": 0.55, "SriLanka": 0.75, "Colombia": 0.80,
    "Peru": 0.75, "Chile": 0.90, "Argentina": 0.80, "Tanzania": 0.45,
    "DRCongo": 0.30, "SouthAfrica": 0.80, "SaudiArabia": 0.75, "UAE": 0.85,
    "Singapore": 0.95, "Philippines": 0.65, "Israel": 0.95, "UK": 1.0,
}

# Occupational structure
OCCUPATIONAL = {
    "Turkey": {"agriculture": 0.16, "industry": 0.27, "services": 0.57, "remote_work": 0.10},
    "Egypt": {"agriculture": 0.25, "industry": 0.25, "services": 0.50, "remote_work": 0.03},
    "Indonesia": {"agriculture": 0.28, "industry": 0.22, "services": 0.50, "remote_work": 0.03},
    "Thailand": {"agriculture": 0.30, "industry": 0.23, "services": 0.47, "remote_work": 0.05},
    "Vietnam": {"agriculture": 0.28, "industry": 0.33, "services": 0.39, "remote_work": 0.03},
    "Poland": {"agriculture": 0.09, "industry": 0.32, "services": 0.59, "remote_work": 0.20},
    "Romania": {"agriculture": 0.22, "industry": 0.30, "services": 0.48, "remote_work": 0.10},
    "Ukraine": {"agriculture": 0.14, "industry": 0.25, "services": 0.61, "remote_work": 0.10},
    "Kazakhstan": {"agriculture": 0.15, "industry": 0.20, "services": 0.65, "remote_work": 0.05},
    "Uzbekistan": {"agriculture": 0.25, "industry": 0.22, "services": 0.53, "remote_work": 0.02},
    "Cambodia": {"agriculture": 0.32, "industry": 0.27, "services": 0.41, "remote_work": 0.01},
    "Malaysia": {"agriculture": 0.10, "industry": 0.27, "services": 0.63, "remote_work": 0.15},
    "Algeria": {"agriculture": 0.09, "industry": 0.30, "services": 0.61, "remote_work": 0.03},
    "Morocco": {"agriculture": 0.33, "industry": 0.22, "services": 0.45, "remote_work": 0.03},
    "Ghana": {"agriculture": 0.30, "industry": 0.22, "services": 0.48, "remote_work": 0.02},
    "Kenya": {"agriculture": 0.40, "industry": 0.18, "services": 0.42, "remote_work": 0.03},
    "Mozambique": {"agriculture": 0.70, "industry": 0.08, "services": 0.22, "remote_work": 0.01},
    "Nepal": {"agriculture": 0.60, "industry": 0.15, "services": 0.25, "remote_work": 0.01},
    "SriLanka": {"agriculture": 0.25, "industry": 0.28, "services": 0.47, "remote_work": 0.05},
    "Colombia": {"agriculture": 0.16, "industry": 0.20, "services": 0.64, "remote_work": 0.10},
    "Peru": {"agriculture": 0.25, "industry": 0.17, "services": 0.58, "remote_work": 0.05},
    "Chile": {"agriculture": 0.09, "industry": 0.23, "services": 0.68, "remote_work": 0.15},
    "Argentina": {"agriculture": 0.05, "industry": 0.21, "services": 0.74, "remote_work": 0.12},
    "Tanzania": {"agriculture": 0.65, "industry": 0.10, "services": 0.25, "remote_work": 0.01},
    "DRCongo": {"agriculture": 0.60, "industry": 0.15, "services": 0.25, "remote_work": 0.01},
    "SouthAfrica": {"agriculture": 0.05, "industry": 0.23, "services": 0.72, "remote_work": 0.10},
    "SaudiArabia": {"agriculture": 0.04, "industry": 0.25, "services": 0.71, "remote_work": 0.08},
    "UAE": {"agriculture": 0.01, "industry": 0.14, "services": 0.85, "remote_work": 0.15},
    "Singapore": {"agriculture": 0.01, "industry": 0.15, "services": 0.84, "remote_work": 0.30},
    "Philippines": {"agriculture": 0.22, "industry": 0.19, "services": 0.59, "remote_work": 0.05},
    "Israel": {"agriculture": 0.01, "industry": 0.17, "services": 0.82, "remote_work": 0.25},
    "UK": {"agriculture": 0.01, "industry": 0.18, "services": 0.81, "remote_work": 0.30},
}

# Antidepressant DDD/1000/day
ANTIDEP = {
    "Turkey": 53, "Egypt": 5, "Indonesia": 3, "Thailand": 10,
    "Vietnam": 2, "Poland": 42, "Romania": 20, "Ukraine": 8,
    "Kazakhstan": 5, "Uzbekistan": 2, "Cambodia": 1, "Malaysia": 15,
    "Algeria": 5, "Morocco": 8, "Ghana": 1, "Kenya": 1,
    "Mozambique": 0.3, "Nepal": 1, "SriLanka": 5, "Colombia": 15,
    "Peru": 8, "Chile": 40, "Argentina": 30, "Tanzania": 0.5,
    "DRCongo": 0.2, "SouthAfrica": 20, "SaudiArabia": 15, "UAE": 20,
    "Singapore": 25, "Philippines": 3, "Israel": 42, "UK": 94,
}

# Depression baseline and treatment access
DEPRESSION = {
    "Turkey": {"baseline": 0.04, "treatment_access": 0.30},
    "Egypt": {"baseline": 0.04, "treatment_access": 0.10},
    "Indonesia": {"baseline": 0.04, "treatment_access": 0.08},
    "Thailand": {"baseline": 0.04, "treatment_access": 0.15},
    "Vietnam": {"baseline": 0.03, "treatment_access": 0.08},
    "Poland": {"baseline": 0.05, "treatment_access": 0.40},
    "Romania": {"baseline": 0.05, "treatment_access": 0.25},
    "Ukraine": {"baseline": 0.05, "treatment_access": 0.15},
    "Kazakhstan": {"baseline": 0.04, "treatment_access": 0.15},
    "Uzbekistan": {"baseline": 0.03, "treatment_access": 0.08},
    "Cambodia": {"baseline": 0.03, "treatment_access": 0.05},
    "Malaysia": {"baseline": 0.04, "treatment_access": 0.25},
    "Algeria": {"baseline": 0.04, "treatment_access": 0.12},
    "Morocco": {"baseline": 0.04, "treatment_access": 0.12},
    "Ghana": {"baseline": 0.03, "treatment_access": 0.05},
    "Kenya": {"baseline": 0.04, "treatment_access": 0.05},
    "Mozambique": {"baseline": 0.03, "treatment_access": 0.03},
    "Nepal": {"baseline": 0.04, "treatment_access": 0.05},
    "SriLanka": {"baseline": 0.04, "treatment_access": 0.15},
    "Colombia": {"baseline": 0.05, "treatment_access": 0.20},
    "Peru": {"baseline": 0.04, "treatment_access": 0.12},
    "Chile": {"baseline": 0.05, "treatment_access": 0.40},
    "Argentina": {"baseline": 0.05, "treatment_access": 0.30},
    "Tanzania": {"baseline": 0.03, "treatment_access": 0.03},
    "DRCongo": {"baseline": 0.03, "treatment_access": 0.02},
    "SouthAfrica": {"baseline": 0.05, "treatment_access": 0.15},
    "SaudiArabia": {"baseline": 0.04, "treatment_access": 0.25},
    "UAE": {"baseline": 0.04, "treatment_access": 0.35},
    "Singapore": {"baseline": 0.04, "treatment_access": 0.45},
    "Philippines": {"baseline": 0.04, "treatment_access": 0.05},
    "Israel": {"baseline": 0.05, "treatment_access": 0.45},
    "UK": {"baseline": 0.05, "treatment_access": 0.55},
}

# Migration data (immigrant share, immigrant TFR)
MIGRATION = {
    "Turkey": {"imm_share": 0.05, "imm_tfr": 3.5},
    "Israel": {"imm_share": 0.25, "imm_tfr": 2.5},
    "UK": {"imm_share": 0.14, "imm_tfr": 2.2},
    "Singapore": {"imm_share": 0.40, "imm_tfr": 1.5},
    "UAE": {"imm_share": 0.88, "imm_tfr": 2.0},
    "SaudiArabia": {"imm_share": 0.38, "imm_tfr": 2.5},
    "Malaysia": {"imm_share": 0.10, "imm_tfr": 2.0},
    "Chile": {"imm_share": 0.08, "imm_tfr": 2.0},
    "Argentina": {"imm_share": 0.05, "imm_tfr": 2.2},
    "Colombia": {"imm_share": 0.06, "imm_tfr": 2.5},
    "SouthAfrica": {"imm_share": 0.07, "imm_tfr": 2.5},
    "Kazakhstan": {"imm_share": 0.20, "imm_tfr": 2.5},
    "Thailand": {"imm_share": 0.05, "imm_tfr": 2.0},
    "Poland": {"imm_share": 0.03, "imm_tfr": 2.0},
}


def generate() -> None:
    """Print expansion entries for all countries.py dictionaries."""
    urban = pd.read_csv(PROC_DIR / "urban_by_country_year.csv")

    with open(DATA_DIR / "berm" / "country_params.json") as f:
        tech_params = json.load(f)

    tfr = pd.read_csv(PROC_DIR / "tfr_by_country_year.csv")

    berm_to_iso3 = {v: k for k, v in EXPANSION.items()}

    countries = sorted(EXPANSION.values())

    # COUNTRY_PARAMS
    print("# --- COUNTRY_PARAMS expansion ---")
    for c in countries:
        iso3 = berm_to_iso3[c]
        u = urban[urban["country_iso3"] == iso3].sort_values("year")
        uf = round(u.iloc[-1]["urban_pct"] / 100, 2) if len(u) > 0 else 0.50
        pd_ = POP_DENSITY.get(c, 50)
        md = METRO_DENSITY.get(c, 3000)
        mp = METRO_POP_SHARE.get(c, 0.25)
        print(f'    "{c}": CountryParams({pd_}, {uf}, {md}, {mp}),')

    # ATTENUATION_PARAMS
    print("\n# --- ATTENUATION_PARAMS expansion ---")
    for c in countries:
        iso3 = berm_to_iso3[c]
        u = urban[urban["country_iso3"] == iso3].sort_values("year")
        uf = round(u.iloc[-1]["urban_pct"] / 100, 2) if len(u) > 0 else 0.50
        oh = OUTAGE_HOURS.get(c, 1)
        mf = MOUNTAIN_FRAC.get(c, 0.20)
        st = SANCTIONS_TECH.get(c, 1.0)
        print(f'    "{c}": AttenuationParams({oh}, {mf}, {uf}, {st}),')

    # NETWORK_QUALITY
    print("\n# --- NETWORK_QUALITY expansion ---")
    for c in countries:
        nq = NETWORK_Q.get(c, 0.50)
        print(f'    "{c}": {nq},')

    # CULTURAL_PRONATALISM
    print("\n# --- CULTURAL_PRONATALISM expansion ---")
    for c in countries:
        cp = CULTURAL_PRON.get(c, 0.0)
        print(f'    "{c}": {cp},')

    # IVF_SHARES
    print("\n# --- IVF_SHARES expansion ---")
    for c in countries:
        iv = IVF.get(c, 0.01)
        print(f'    "{c}": {iv},')

    # TECH_DIFFUSION
    print("\n# --- TECH_DIFFUSION expansion ---")
    for c in countries:
        tp = tech_params.get(c, {})
        s = tp.get("start", 2000)
        h = tp.get("half", 2008)
        y3 = tp.get("year_3g", 2005)
        y4 = tp.get("year_4g", 2012)
        y5 = tp.get("year_5g", 2022)
        print(f'    "{c}": TechDiffusion({s}, {h}, {y3}, {y4}, {y5}),')

    # V12_ACTUAL_TFR_2024
    print("\n# --- V12_ACTUAL_TFR_2024 expansion ---")
    for c in countries:
        iso3 = berm_to_iso3[c]
        rows = tfr[(tfr["country_iso3"] == iso3) & (tfr["year"] == 2024)]
        if len(rows) > 0:
            val = round(float(rows.iloc[0]["tfr"]), 2)
        else:
            rows = tfr[(tfr["country_iso3"] == iso3)].sort_values("year")
            val = round(float(rows.iloc[-1]["tfr"]), 2) if len(rows) > 0 else 2.00
        print(f'    "{c}": {val},')

    # CULTURAL_TFR_PARAMS
    print("\n# --- CULTURAL_TFR_PARAMS expansion ---")
    for c in countries:
        ct = CULTURAL_TFR.get(c, (1.2, 4.5, 0.03))
        print(f'    "{c}": ({ct[0]}, {ct[1]}, {ct[2]}),')

    # SMARTPHONE_PEN_2024
    print("\n# --- SMARTPHONE_PEN_2024 expansion ---")
    for c in countries:
        sp = SMARTPHONE_PEN.get(c, 0.50)
        print(f'    "{c}": {sp},')

    # SMARTPHONE_MIDPOINT
    print("\n# --- SMARTPHONE_MIDPOINT expansion ---")
    for c in countries:
        sm = SMARTPHONE_MID.get(c, 2016)
        print(f'    "{c}": {sm},')

    # EARPOD_PEN_2024
    print("\n# --- EARPOD_PEN_2024 expansion ---")
    for c in countries:
        ep = EARPOD.get(c, 0.05)
        print(f'    "{c}": {ep},')

    # WIFI_PEN_2024
    print("\n# --- WIFI_PEN_2024 expansion ---")
    for c in countries:
        wp = WIFI_PEN.get(c, 0.50)
        print(f'    "{c}": {wp},')

    # WIFI_MIDPOINT
    print("\n# --- WIFI_MIDPOINT expansion ---")
    for c in countries:
        wm = WIFI_MID.get(c, 2015)
        print(f'    "{c}": {wm},')

    # IOT_DEVICES_2024
    print("\n# --- IOT_DEVICES_2024 expansion ---")
    for c in countries:
        io = IOT.get(c, 5)
        print(f'    "{c}": {io},')

    # SMARTPHONE_IN_BEDROOM
    print("\n# --- SMARTPHONE_IN_BEDROOM expansion ---")
    for c in countries:
        br = BEDROOM.get(c, 0.50)
        print(f'    "{c}": {br},')

    # DATA_QUALITY
    print("\n# --- DATA_QUALITY expansion ---")
    for c in countries:
        dq = DATA_Q.get(c, 0.50)
        print(f'    "{c}": {dq},')

    # ANTIDEPRESSANT_DDD
    print("\n# --- ANTIDEPRESSANT_DDD expansion ---")
    for c in countries:
        ad = ANTIDEP.get(c, 5)
        print(f'    "{c}": {ad},')

    # DEPRESSION_PARAMS
    print("\n# --- DEPRESSION_PARAMS expansion ---")
    for c in countries:
        dp = DEPRESSION.get(c, {"baseline": 0.04, "treatment_access": 0.10})
        print(f'    "{c}": {{"baseline": {dp["baseline"]}, "treatment_access": {dp["treatment_access"]}}},')

    # OCCUPATIONAL_STRUCTURE_2024
    print("\n# --- OCCUPATIONAL_STRUCTURE_2024 expansion ---")
    for c in countries:
        oc = OCCUPATIONAL.get(c, {"agriculture": 0.20, "industry": 0.25, "services": 0.55, "remote_work": 0.05})
        print(f'    "{c}": {oc},')

    # MIGRATION_DATA (only for countries with significant immigration)
    print("\n# --- MIGRATION_DATA expansion ---")
    for c in countries:
        if c in MIGRATION:
            md = MIGRATION[c]
            print(f'    "{c}": {md},')


if __name__ == "__main__":
    generate()
