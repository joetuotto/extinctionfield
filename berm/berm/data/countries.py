"""Country-specific parameters for the BERM v17 model.

All data from L-BERM Wolfram reference code v2026.08.18-v17-itu-integrated.
These are static lookup tables, not model logic.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class CountryParams:
    pop_density: float
    urban_frac: float
    metro_density: float
    metro_pop_share: float


@dataclass(frozen=True)
class AttenuationParams:
    outage_hours: float
    mountain_frac: float
    urban_frac: float
    sanctions_tech: float


@dataclass(frozen=True)
class TechDiffusion:
    start: int
    half: int
    year_3g: int
    year_4g: int
    year_5g: int


COUNTRY_PARAMS: dict[str, CountryParams] = {
    "SouthKorea": CountryParams(527.0, 0.82, 16000.0, 0.50),
    "Finland": CountryParams(18.0, 0.86, 3000.0, 0.30),
    "USA": CountryParams(36.0, 0.83, 4500.0, 0.30),
    "Japan": CountryParams(347.0, 0.92, 6200.0, 0.30),
    "Denmark": CountryParams(137.0, 0.88, 3500.0, 0.35),
    "Bangladesh": CountryParams(1265.0, 0.39, 36000.0, 0.15),
    "Nigeria": CountryParams(226.0, 0.54, 20000.0, 0.08),
    "Canada": CountryParams(4.3, 0.82, 4300.0, 0.35),
    "Australia": CountryParams(3.4, 0.86, 4000.0, 0.40),
    "Norway": CountryParams(15.0, 0.83, 1500.0, 0.25),
    "Spain": CountryParams(94.0, 0.81, 5400.0, 0.30),
    "Italy": CountryParams(206.0, 0.71, 2700.0, 0.20),
    "Germany": CountryParams(240.0, 0.78, 4100.0, 0.15),
    "France": CountryParams(119.0, 0.82, 21000.0, 0.18),
    "Sweden": CountryParams(25.0, 0.88, 4800.0, 0.24),
    "India": CountryParams(480.0, 0.36, 25000.0, 0.10),
    "Iran": CountryParams(52.0, 0.76, 12000.0, 0.25),
    "China": CountryParams(153.0, 0.65, 6000.0, 0.15),
    "Brazil": CountryParams(25.0, 0.88, 7400.0, 0.20),
    "Mexico": CountryParams(66.0, 0.81, 6000.0, 0.18),
    "Ethiopia": CountryParams(115.0, 0.23, 5500.0, 0.06),
    "Niger": CountryParams(19.0, 0.17, 9000.0, 0.05),
}

ATTENUATION_PARAMS: dict[str, AttenuationParams] = {
    "SouthKorea": AttenuationParams(0, 0.70, 0.82, 1.0),
    "Japan": AttenuationParams(0, 0.73, 0.92, 1.0),
    "Finland": AttenuationParams(0, 0.05, 0.86, 1.0),
    "Sweden": AttenuationParams(0, 0.20, 0.88, 1.0),
    "Norway": AttenuationParams(0, 0.70, 0.83, 1.0),
    "Germany": AttenuationParams(0, 0.15, 0.77, 1.0),
    "France": AttenuationParams(0, 0.25, 0.81, 1.0),
    "Spain": AttenuationParams(0, 0.35, 0.80, 1.0),
    "Italy": AttenuationParams(0, 0.40, 0.70, 1.0),
    "USA": AttenuationParams(0, 0.30, 0.83, 1.0),
    "Canada": AttenuationParams(0, 0.40, 0.82, 1.0),
    "Australia": AttenuationParams(0, 0.15, 0.86, 1.0),
    "Denmark": AttenuationParams(0, 0.05, 0.88, 1.0),
    "Russia": AttenuationParams(0.5, 0.25, 0.75, 0.90),
    "Iran": AttenuationParams(4, 0.55, 0.76, 0.80),
    "India": AttenuationParams(2, 0.30, 0.35, 0.90),
    "Bangladesh": AttenuationParams(2, 0.05, 0.39, 0.90),
    "Nigeria": AttenuationParams(6, 0.10, 0.53, 0.85),
    "Cuba": AttenuationParams(4, 0.25, 0.77, 0.70),
    "Myanmar": AttenuationParams(3, 0.50, 0.31, 0.75),
    "China": AttenuationParams(0, 0.33, 0.65, 0.95),
    "Brazil": AttenuationParams(0.5, 0.15, 0.88, 1.0),
    "Mexico": AttenuationParams(0.5, 0.25, 0.81, 1.0),
    "Ethiopia": AttenuationParams(4, 0.45, 0.23, 0.85),
    "Niger": AttenuationParams(5, 0.10, 0.17, 0.85),
}

NETWORK_QUALITY: dict[str, float] = {
    "SouthKorea": 0.95, "Japan": 0.93, "Finland": 0.90,
    "Sweden": 0.88, "Norway": 0.85, "Denmark": 0.90,
    "Germany": 0.82, "France": 0.80, "Spain": 0.78,
    "Italy": 0.75, "USA": 0.85, "Canada": 0.82,
    "Australia": 0.80, "Russia": 0.60,
    "China": 0.75, "Brazil": 0.55,
    "Iran": 0.50, "India": 0.60,
    "Bangladesh": 0.45, "Nigeria": 0.35,
    "Myanmar": 0.40, "Cuba": 0.30,
    "Mexico": 0.60, "Ethiopia": 0.25, "Niger": 0.20,
}

CULTURAL_PRONATALISM: dict[str, float] = {
    "Nigeria": 4.3, "Niger": 5.5, "Ethiopia": 3.1,
    "India": 1.2, "Iran": 1.14, "Bangladesh": 0.5,
    "Mexico": 0.4, "Brazil": 0.3, "China": -0.5,
    "SouthKorea": 0.0, "Japan": 0.0, "Finland": 0.0,
    "Denmark": 0.0, "USA": 0.0, "Canada": 0.0,
    "Australia": 0.0, "Norway": 0.0, "Sweden": 0.0,
    "Germany": 0.0, "France": 0.0, "Spain": 0.0,
    "Italy": 0.0,
}

IVF_SHARES: dict[str, float] = {
    "Denmark": 0.10, "SouthKorea": 0.08, "Japan": 0.07,
    "Australia": 0.05, "Finland": 0.04, "USA": 0.03,
    "Canada": 0.04, "Norway": 0.05, "Spain": 0.06,
    "Italy": 0.04, "Germany": 0.04, "France": 0.04,
    "Sweden": 0.05, "China": 0.02, "India": 0.005,
    "Iran": 0.01, "Brazil": 0.02, "Mexico": 0.01,
    "Bangladesh": 0.001, "Nigeria": 0.001,
    "Ethiopia": 0.001, "Niger": 0.001,
}

TECH_DIFFUSION: dict[str, TechDiffusion] = {
    "SouthKorea": TechDiffusion(1988, 1999, 2002, 2011, 2019),
    "Japan": TechDiffusion(1991, 2000, 2001, 2010, 2020),
    "Finland": TechDiffusion(1991, 1998, 2003, 2012, 2021),
    "Sweden": TechDiffusion(1991, 1998, 2003, 2012, 2020),
    "Norway": TechDiffusion(1991, 1999, 2003, 2012, 2020),
    "Denmark": TechDiffusion(1992, 1998, 2003, 2012, 2020),
    "Germany": TechDiffusion(1992, 2000, 2004, 2012, 2021),
    "France": TechDiffusion(1992, 2001, 2004, 2013, 2022),
    "Spain": TechDiffusion(1995, 2002, 2004, 2013, 2022),
    "Italy": TechDiffusion(1995, 2002, 2004, 2013, 2022),
    "USA": TechDiffusion(1993, 2000, 2003, 2010, 2019),
    "Canada": TechDiffusion(1993, 2001, 2004, 2012, 2020),
    "Australia": TechDiffusion(1993, 2001, 2003, 2012, 2020),
    "Russia": TechDiffusion(1995, 2005, 2008, 2014, 2022),
    "Iran": TechDiffusion(2000, 2010, 2012, 2017, 2026),
    "India": TechDiffusion(2000, 2010, 2010, 2016, 2023),
    "Bangladesh": TechDiffusion(2003, 2013, 2013, 2018, 2025),
    "Nigeria": TechDiffusion(2001, 2013, 2012, 2016, 2025),
    "Cuba": TechDiffusion(2008, 2020, 2019, 2022, 2028),
    "Myanmar": TechDiffusion(2014, 2017, 2016, 2018, 2025),
    "China": TechDiffusion(1997, 2006, 2009, 2014, 2019),
    "Brazil": TechDiffusion(1998, 2007, 2008, 2013, 2022),
    "Mexico": TechDiffusion(1999, 2007, 2008, 2014, 2022),
    "Ethiopia": TechDiffusion(2005, 2018, 2015, 2020, 2027),
    "Niger": TechDiffusion(2008, 2020, 2016, 2022, 2028),
}

HISTORICAL_TFR: dict[str, list[tuple[int, float]]] = {
    "SouthKorea": [
        (2000, 1.47), (2005, 1.08), (2010, 1.23), (2012, 1.30),
        (2015, 1.24), (2018, 0.98), (2020, 0.84),
        (2022, 0.78), (2023, 0.72),
    ],
    "Finland": [
        (2000, 1.73), (2005, 1.80), (2010, 1.87), (2012, 1.80),
        (2015, 1.65), (2018, 1.41), (2020, 1.37),
        (2022, 1.32), (2023, 1.26),
    ],
    "Japan": [
        (2000, 1.36), (2005, 1.26), (2010, 1.39), (2012, 1.41),
        (2015, 1.45), (2018, 1.42), (2020, 1.33),
        (2022, 1.26), (2023, 1.20),
    ],
    "USA": [
        (2000, 2.06), (2005, 2.05), (2010, 1.93), (2012, 1.88),
        (2015, 1.84), (2018, 1.73), (2020, 1.64),
        (2022, 1.67), (2023, 1.64),
    ],
    "Denmark": [
        (2000, 1.77), (2005, 1.80), (2010, 1.87), (2012, 1.73),
        (2015, 1.71), (2018, 1.73), (2020, 1.68),
        (2022, 1.55), (2023, 1.55),
    ],
}

COMMUNITY_DATA: list[dict[str, object]] = [
    {"name": "OldOrderAmish", "emf": 0.001, "tfr": 6.5},
    {"name": "Haredi", "emf": 0.05, "tfr": 6.4},
    {"name": "ModernMennonite", "emf": 0.3, "tfr": 2.8},
    {"name": "USGeneral", "emf": 0.5, "tfr": 1.66},
    {"name": "SouthKorea", "emf": 0.8, "tfr": 0.72},
]

COMMUNITY_FIT_PARAMS = {
    "a": 6.566, "b": 6.394,
    "log_threshold": -1.361, "k": 0.509,
    "r2": 0.9986, "rmse": 0.0889,
}

CALIBRATED_SIGMOID_V7 = {
    "a": 6.558, "b": 5.646,
    "log_threshold": -1.549, "k": 0.456,
    "r2": 0.9993, "rmse": 0.061,
}

SMARTPHONE_PEN_2024: dict[str, float] = {
    "SouthKorea": 0.97, "Japan": 0.85, "Finland": 0.90,
    "Sweden": 0.93, "Norway": 0.93, "Denmark": 0.93,
    "Germany": 0.88, "France": 0.85, "Spain": 0.85,
    "Italy": 0.80, "USA": 0.92, "Canada": 0.90,
    "Australia": 0.90, "Russia": 0.75, "China": 0.80,
    "Brazil": 0.70, "Mexico": 0.65, "Iran": 0.60,
    "India": 0.50, "Bangladesh": 0.40, "Nigeria": 0.35,
    "Myanmar": 0.30, "Cuba": 0.35, "Ethiopia": 0.20,
    "Niger": 0.12,
}

SMARTPHONE_MIDPOINT: dict[str, int] = {
    "SouthKorea": 2012, "Japan": 2013, "Finland": 2013,
    "Sweden": 2013, "Norway": 2013, "Denmark": 2013,
    "Germany": 2013, "France": 2014, "Spain": 2014,
    "Italy": 2014, "USA": 2012, "Canada": 2013,
    "Australia": 2013, "Russia": 2015, "China": 2014,
    "Brazil": 2015, "Mexico": 2016, "Iran": 2017,
    "India": 2017, "Bangladesh": 2019, "Nigeria": 2018,
    "Myanmar": 2018, "Cuba": 2021, "Ethiopia": 2020,
    "Niger": 2022,
}

EARPOD_PEN_2024: dict[str, float] = {
    "SouthKorea": 0.30, "Japan": 0.22, "Finland": 0.28,
    "Sweden": 0.30, "Norway": 0.28, "Denmark": 0.30,
    "Germany": 0.22, "France": 0.22, "Spain": 0.22,
    "Italy": 0.20, "USA": 0.31, "Canada": 0.28,
    "Australia": 0.28, "Russia": 0.15, "China": 0.25,
    "Brazil": 0.15, "Mexico": 0.12, "Iran": 0.10,
    "India": 0.08, "Bangladesh": 0.03, "Nigeria": 0.04,
    "Myanmar": 0.03, "Cuba": 0.05, "Ethiopia": 0.02,
    "Niger": 0.01,
}

WIFI_PEN_2024: dict[str, float] = {
    "SouthKorea": 0.95, "Japan": 0.93, "Finland": 0.95,
    "Sweden": 0.95, "Norway": 0.95, "Denmark": 0.95,
    "Germany": 0.93, "France": 0.92, "Spain": 0.90,
    "Italy": 0.88, "USA": 0.95, "Canada": 0.95,
    "Australia": 0.93, "Russia": 0.80, "China": 0.85,
    "Brazil": 0.75, "Mexico": 0.70, "Iran": 0.70,
    "India": 0.50, "Bangladesh": 0.30, "Nigeria": 0.20,
    "Myanmar": 0.20, "Cuba": 0.25, "Ethiopia": 0.15,
    "Niger": 0.08,
}

WIFI_MIDPOINT: dict[str, int] = {
    "SouthKorea": 2008, "Japan": 2009, "Finland": 2008,
    "Sweden": 2008, "Norway": 2008, "Denmark": 2008,
    "Germany": 2010, "France": 2010, "Spain": 2011,
    "Italy": 2011, "USA": 2007, "Canada": 2008,
    "Australia": 2009, "Russia": 2014, "China": 2013,
    "Brazil": 2015, "Mexico": 2015, "Iran": 2016,
    "India": 2018, "Bangladesh": 2020, "Nigeria": 2020,
    "Myanmar": 2020, "Cuba": 2021, "Ethiopia": 2021,
    "Niger": 2023,
}

IOT_DEVICES_2024: dict[str, int] = {
    "SouthKorea": 22, "Japan": 18, "Finland": 18,
    "Sweden": 20, "Norway": 20, "Denmark": 20,
    "Germany": 16, "France": 15, "Spain": 14,
    "Italy": 12, "USA": 25, "Canada": 20,
    "Australia": 18, "Russia": 8, "China": 15,
    "Brazil": 8, "Mexico": 6, "Iran": 5,
    "India": 4, "Bangladesh": 2, "Nigeria": 2,
    "Myanmar": 2, "Cuba": 2, "Ethiopia": 1,
    "Niger": 1,
}

SMARTPHONE_IN_BEDROOM: dict[str, float] = {
    "SouthKorea": 0.85, "Japan": 0.75, "Finland": 0.70,
    "Sweden": 0.72, "Norway": 0.68, "Denmark": 0.72,
    "Germany": 0.70, "France": 0.68, "Spain": 0.72,
    "Italy": 0.70, "USA": 0.80, "Canada": 0.75,
    "Australia": 0.75, "Russia": 0.60,
    "China": 0.70, "Brazil": 0.65,
    "Iran": 0.55, "India": 0.50,
    "Bangladesh": 0.40, "Nigeria": 0.40,
    "Myanmar": 0.35, "Cuba": 0.45,
    "Mexico": 0.60, "Ethiopia": 0.30, "Niger": 0.25,
}

NUTRITION_PROFILES: dict[str, dict[str, float]] = {
    "SouthKorea": {"antioxidant_index": 0.75, "diet_quality": 0.70},
    "Japan": {"antioxidant_index": 0.85, "diet_quality": 0.80},
    "Finland": {"antioxidant_index": 0.65, "diet_quality": 0.70},
    "USA": {"antioxidant_index": 0.50, "diet_quality": 0.55},
    "Denmark": {"antioxidant_index": 0.70, "diet_quality": 0.75},
    "Bangladesh": {"antioxidant_index": 0.35, "diet_quality": 0.40},
    "Nigeria": {"antioxidant_index": 0.40, "diet_quality": 0.45},
    "India": {"antioxidant_index": 0.45, "diet_quality": 0.50},
    "Norway": {"antioxidant_index": 0.75, "diet_quality": 0.80},
    "China": {"antioxidant_index": 0.60, "diet_quality": 0.60},
}

OCCUPATIONAL_STRUCTURE_2024: dict[str, dict[str, float]] = {
    "SouthKorea": {"agriculture": 0.05, "industry": 0.25, "services": 0.70, "remote_work": 0.15},
    "Japan": {"agriculture": 0.03, "industry": 0.24, "services": 0.73, "remote_work": 0.15},
    "Finland": {"agriculture": 0.03, "industry": 0.21, "services": 0.76, "remote_work": 0.35},
    "Sweden": {"agriculture": 0.02, "industry": 0.18, "services": 0.80, "remote_work": 0.35},
    "Norway": {"agriculture": 0.02, "industry": 0.19, "services": 0.79, "remote_work": 0.35},
    "Denmark": {"agriculture": 0.02, "industry": 0.19, "services": 0.79, "remote_work": 0.35},
    "Germany": {"agriculture": 0.01, "industry": 0.27, "services": 0.72, "remote_work": 0.25},
    "France": {"agriculture": 0.03, "industry": 0.20, "services": 0.77, "remote_work": 0.25},
    "Spain": {"agriculture": 0.04, "industry": 0.20, "services": 0.76, "remote_work": 0.20},
    "Italy": {"agriculture": 0.04, "industry": 0.26, "services": 0.70, "remote_work": 0.18},
    "USA": {"agriculture": 0.02, "industry": 0.18, "services": 0.80, "remote_work": 0.30},
    "Canada": {"agriculture": 0.02, "industry": 0.19, "services": 0.79, "remote_work": 0.30},
    "Australia": {"agriculture": 0.02, "industry": 0.21, "services": 0.77, "remote_work": 0.30},
    "Russia": {"agriculture": 0.06, "industry": 0.27, "services": 0.67, "remote_work": 0.10},
    "China": {"agriculture": 0.25, "industry": 0.28, "services": 0.47, "remote_work": 0.05},
    "Brazil": {"agriculture": 0.09, "industry": 0.20, "services": 0.71, "remote_work": 0.12},
    "Mexico": {"agriculture": 0.12, "industry": 0.26, "services": 0.62, "remote_work": 0.08},
    "Iran": {"agriculture": 0.18, "industry": 0.32, "services": 0.50, "remote_work": 0.05},
    "India": {"agriculture": 0.42, "industry": 0.26, "services": 0.32, "remote_work": 0.05},
    "Bangladesh": {"agriculture": 0.38, "industry": 0.21, "services": 0.41, "remote_work": 0.02},
    "Nigeria": {"agriculture": 0.35, "industry": 0.22, "services": 0.43, "remote_work": 0.02},
    "Ethiopia": {"agriculture": 0.65, "industry": 0.10, "services": 0.25, "remote_work": 0.01},
    "Niger": {"agriculture": 0.75, "industry": 0.05, "services": 0.20, "remote_work": 0.01},
    "Myanmar": {"agriculture": 0.48, "industry": 0.18, "services": 0.34, "remote_work": 0.01},
    "Cuba": {"agriculture": 0.18, "industry": 0.17, "services": 0.65, "remote_work": 0.02},
}

OCCUPATIONAL_EMF_WEIGHTS: dict[str, float] = {
    "agriculture": 0.15,
    "industry": 0.55,
    "office_services": 1.0,
    "remote_work": 1.4,
}

V12_ACTUAL_TFR_2024: dict[str, float] = {
    "SouthKorea": 0.72, "Japan": 1.20, "Finland": 1.32,
    "Sweden": 1.45, "Norway": 1.34, "Denmark": 1.55,
    "Germany": 1.35, "France": 1.68, "Spain": 1.16,
    "Italy": 1.24, "USA": 1.64, "Canada": 1.26,
    "Australia": 1.51, "Russia": 1.50, "China": 1.09,
    "Brazil": 1.65, "Mexico": 1.80, "Iran": 2.14,
    "India": 2.00, "Bangladesh": 1.95, "Nigeria": 5.20,
    "Myanmar": 2.10, "Ethiopia": 4.10, "Niger": 6.80,
    "Cuba": 1.45,
}

CULTURAL_TFR_PARAMS: dict[str, tuple[float, float, float]] = {
    "SouthKorea": (1.0, 5.5, 0.05),
    "Japan": (1.1, 4.5, 0.045),
    "Finland": (1.2, 3.5, 0.04),
    "Denmark": (1.2, 3.5, 0.04),
    "USA": (1.3, 4.0, 0.03),
    "Canada": (1.2, 3.8, 0.035),
    "Germany": (1.1, 3.5, 0.04),
    "France": (1.4, 3.5, 0.035),
    "Spain": (1.1, 4.0, 0.04),
    "Italy": (1.1, 4.0, 0.04),
    "Sweden": (1.3, 3.5, 0.035),
    "Norway": (1.3, 3.5, 0.035),
    "Australia": (1.3, 3.8, 0.035),
    "China": (1.0, 5.0, 0.05),
    "Brazil": (1.3, 4.0, 0.035),
    "Iran": (1.5, 5.0, 0.03),
    "India": (1.5, 5.0, 0.025),
    "Bangladesh": (1.4, 5.5, 0.03),
    "Nigeria": (2.0, 5.5, 0.015),
    "Ethiopia": (2.0, 5.5, 0.015),
    "Niger": (2.5, 5.5, 0.012),
    "Mexico": (1.3, 4.5, 0.03),
}

MIGRATION_DATA: dict[str, dict[str, float]] = {
    "Finland": {"imm_share": 0.20, "imm_tfr": 2.1},
    "Sweden": {"imm_share": 0.30, "imm_tfr": 2.0},
    "Germany": {"imm_share": 0.25, "imm_tfr": 2.2},
    "France": {"imm_share": 0.19, "imm_tfr": 2.3},
    "Spain": {"imm_share": 0.24, "imm_tfr": 1.9},
    "Italy": {"imm_share": 0.22, "imm_tfr": 2.0},
    "USA": {"imm_share": 0.23, "imm_tfr": 2.3},
    "Canada": {"imm_share": 0.28, "imm_tfr": 2.0},
    "Australia": {"imm_share": 0.30, "imm_tfr": 2.0},
    "Norway": {"imm_share": 0.22, "imm_tfr": 2.2},
    "Denmark": {"imm_share": 0.15, "imm_tfr": 2.0},
    "SouthKorea": {"imm_share": 0.05, "imm_tfr": 1.5},
    "Japan": {"imm_share": 0.03, "imm_tfr": 1.8},
    "Russia": {"imm_share": 0.08, "imm_tfr": 2.5},
    "Iran": {"imm_share": 0.03, "imm_tfr": 2.5},
}

DATA_QUALITY: dict[str, float] = {
    "Finland": 1.0, "Sweden": 1.0, "Norway": 1.0, "Denmark": 1.0,
    "Japan": 0.95, "SouthKorea": 0.95,
    "Germany": 0.90, "France": 0.90,
    "USA": 0.85, "Spain": 0.85, "Italy": 0.85,
    "Canada": 0.85, "Australia": 0.85,
    "Brazil": 0.75, "Mexico": 0.75,
    "Iran": 0.70, "India": 0.70,
    "China": 0.65, "Bangladesh": 0.65,
    "Russia": 0.60, "Cuba": 0.55,
    "Niger": 0.50, "Ethiopia": 0.40,
    "Nigeria": 0.35, "Myanmar": 0.30,
}


def get_country_params(country: str) -> CountryParams:
    return COUNTRY_PARAMS.get(country, CountryParams(50.0, 0.70, 3000.0, 0.25))


def get_attenuation_params(country: str) -> AttenuationParams:
    return ATTENUATION_PARAMS.get(country, AttenuationParams(0, 0.20, 0.70, 1.0))


def get_data_quality(country: str) -> float:
    return DATA_QUALITY.get(country, 0.60)
