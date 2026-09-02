"""Site <-> model sync for the civilization pages.

The civilization pages under ``website/app/[locale]/civilization`` hold
hand-copied numeric literals computed by
``berm.civilization.political_biology``.  Nothing in the build pipeline ties
them together, so this module recomputes every displayed value from the model
and asserts that the formatted string is present in the page source at the
row / key where it belongs.  A mismatch fails with
``page:line  what: expected "X", found "Y"``.  The page is never edited here:
the failure is the report.

Conventions the pages follow (and the checks reproduce):
  * 3 decimals for index tables (pathopolites, EMF->political, IQ shredder),
    2 decimals for score tables (r/K, loyalty collapse, policy vulnerability,
    moral distress);
  * Amish->urban-office ratios ("6.5x") are computed from the displayed
    (rounded) values;
  * the Finnish copy uses a decimal comma in some tables — found values are
    normalised (``,`` -> ``.``) for non-English locale blocks only.

The second half checks that ``website/public/data/civilization_indices.json``
(written by ``berm/export_civilization.py``) is in sync with a fresh export
and with direct calls into the model.
"""

from __future__ import annotations

import importlib.util
import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import pytest

from berm import __version__
from berm.civilization.political_biology import (
    BINDING_FOUNDATIONS,
    ENVIRONMENTS,
    INDIVIDUALIZING_FOUNDATIONS,
    POLICY_DOMAINS,
    behavioral_sink_gradient,
    civilizational_transmission_gradient,
    environment_biomarkers,
    environment_profile,
    foundation_collapse_order,
    iq_shredder_gradient,
    loyalty_collapse_gradient,
    moral_breadth,
    moral_distress_index,
    moral_foundations_profile,
    pathopolites_gradient,
    policy_vulnerability_profile,
    rk_environment_gradient,
    signal_degradation_gradient,
    urban_rural_gradient,
)

ROOT = Path(__file__).resolve().parents[2]
BERM_DIR = ROOT / "berm"
CIV_DIR = ROOT / "website" / "app" / "[locale]" / "civilization"
JSON_PATH = ROOT / "website" / "public" / "data" / "civilization_indices.json"
EXPORT_SCRIPT = BERM_DIR / "export_civilization.py"

PATHOPOLITES = "pathopolites/page.tsx"
PATOKRATIA = "patokratia/page.tsx"
PATOPOLIS = "patopolis/page.tsx"
PATOKINESIS = "patokinesis/page.tsx"
PAGES = (PATHOPOLITES, PATOKRATIA, PATOPOLIS, PATOKINESIS)

YEAR = 2025
ENV_ORDER = ("amish", "rural", "suburban", "urban_residential", "urban_office")
TRAJECTORY_YEARS = (1950, 1990, 2010, 2025, 2050)
PATHOPOLITES_DIMENSIONS = (
    "victimhood_identity",
    "safety_seeking",
    "external_locus",
    "cognitive_fragility",
    "anomic_distress",
    "moral_compensation",
)

# Page display names for model identifiers.
RK_CLASS_DISPLAY = {"K-selected": "K-selected", "mixed": "Mixed", "r-selected": "r-selected"}


def ideology_display(name: str) -> str:
    return " ".join(word.capitalize() for word in name.split("_"))


def trajectory_ideology_display(name: str) -> str:
    # The trajectory table abbreviates this one label.
    if name == "authoritarian_conservatism":
        return "Auth. Conservatism"
    return ideology_display(name)


def collapse_display(env: str | None) -> str:
    return "Survives" if env is None else env.replace("_", " ").capitalize()


def active_foundations_display(active: list[str], total: int) -> str:
    if len(active) == total:
        return "All six"
    if len(active) == 1:
        return f"{active[0].capitalize()} only"
    return ", ".join(name.capitalize() for name in active)


# ── Formatting (must mirror export_civilization.py rounding) ──


def fmt(value: float, dp: int) -> str:
    return f"{round(value, dp):.{dp}f}"


def f3(value: float) -> str:
    return fmt(value, 3)


def f2(value: float) -> str:
    return fmt(value, 2)


def signed3(value: float) -> str:
    """3 decimals with an explicit sign, as the BIS net-immunity column prints it."""
    return f"{round(value, 3):+.3f}"


def ratio_num(high: float, low: float, dp: int) -> str:
    """Ratio as the pages print it: from the displayed (rounded) values, 1 dp."""
    return f"{round(round(high, dp) / round(low, dp), 1):.1f}"


def normalise(found: str) -> str:
    return found.replace(",", ".")


# ── Check machinery ──


@dataclass(eq=False)
class Comparison:
    page: str
    line: int
    what: str
    expected: str
    found: str | None
    ok: bool

    def __str__(self) -> str:
        found = "<missing>" if self.found is None else f'"{self.found}"'
        return f'{self.page}:{self.line}  {self.what}: expected "{self.expected}", found {found}'


def _extract(line: str, key: str) -> str | None:
    """Value of ``key: "..."`` (or an unquoted ``key: 123`` / ``key: true``) on a row line."""
    match = re.search(rf'\b{re.escape(key)}: (?:"([^"]*)"|([^,}} ]+))', line)
    if not match:
        return None
    return match.group(1) if match.group(1) is not None else match.group(2)


@dataclass(eq=False)
class TableCheck:
    """A `{ key: "value", ... }` row table repeated once per locale block.

    ``row_pattern`` identifies one row line of the table in every locale;
    matching lines are grouped into consecutive blocks of ``n_rows``.
    ``columns`` are checked in every block, ``en_only_columns`` (translated
    labels) in the first block only.  ``None`` in an expected list skips
    that row for that column.
    """

    label: str
    page: str
    row_pattern: str
    n_rows: int
    columns: dict[str, list[str | None]]
    en_only_columns: dict[str, list[str | None]] = field(default_factory=dict)

    def run(self, source: str) -> list[Comparison]:
        rows = [
            (number, line)
            for number, line in enumerate(source.splitlines(), start=1)
            if re.search(self.row_pattern, line)
        ]
        if not rows or len(rows) % self.n_rows:
            return [Comparison(
                self.page, rows[0][0] if rows else 0,
                f"{self.label}: rows matching {self.row_pattern!r}",
                f"a multiple of {self.n_rows}", str(len(rows)), False,
            )]

        results: list[Comparison] = []
        blocks = [rows[i:i + self.n_rows] for i in range(0, len(rows), self.n_rows)]
        for index, block in enumerate(blocks):
            columns = dict(self.columns)
            if index == 0:
                columns.update(self.en_only_columns)
            for key, expected_values in columns.items():
                for (number, line), expected in zip(block, expected_values):
                    if expected is None:
                        continue
                    found = _extract(line, key)
                    comparable = found if index == 0 or found is None else normalise(found)
                    results.append(Comparison(
                        self.page, number, f"{self.label} [{key}]",
                        expected, found, comparable == expected,
                    ))
        return results


@dataclass(eq=False)
class ProseCheck:
    """A regex with one capture group per expected value, applied to the whole page."""

    label: str
    page: str
    pattern: str
    expected: tuple[str, ...]

    def run(self, source: str) -> list[Comparison]:
        matches = list(re.finditer(self.pattern, source))
        if not matches:
            return [Comparison(
                self.page, 0,
                f"{self.label}: pattern {self.pattern!r} not found "
                "(sentence reworded? update the pattern — the value is unverified)",
                " / ".join(self.expected), None, False,
            )]
        results: list[Comparison] = []
        for match in matches:
            line = source.count("\n", 0, match.start()) + 1
            for position, expected in enumerate(self.expected, start=1):
                found = match.group(position)
                results.append(Comparison(
                    self.page, line, f"{self.label} [value {position}]",
                    expected, found, normalise(found) == expected,
                ))
        return results


# ── The curated list: every literal, recomputed from the model ──


def page_checks() -> list[TableCheck | ProseCheck]:
    checks: list[TableCheck | ProseCheck] = []
    emf = {env: ENVIRONMENTS[env].emf_factor for env in ENV_ORDER}

    # ---- pathopolites/page.tsx ----
    pg = {entry["environment"]: entry for entry in pathopolites_gradient(YEAR)}
    amish, office = pg["amish"], pg["urban_office"]
    checks.append(TableCheck(
        "pathopolites gradient table (GRADIENT_DATA)", PATHOPOLITES,
        r'^\s*\{ env: "[^"]+", emf: "[^"]+", index: "', 5,
        columns={
            "emf": [f"{emf[env]:.2f}×" for env in ENV_ORDER],
            "index": [f3(pg[env]["pathopolites_index"]) for env in ENV_ORDER],
            "victim": [f3(pg[env]["victimhood_identity"]) for env in ENV_ORDER],
            "safety": [f3(pg[env]["safety_seeking"]) for env in ENV_ORDER],
            "external": [f3(pg[env]["external_locus"]) for env in ENV_ORDER],
            "fragility": [f3(pg[env]["cognitive_fragility"]) for env in ENV_ORDER],
            "anomie": [f3(pg[env]["anomic_distress"]) for env in ENV_ORDER],
            "moral": [f3(pg[env]["moral_compensation"]) for env in ENV_ORDER],
        },
    ))
    for number, dim in enumerate(PATHOPOLITES_DIMENSIONS, start=1):
        checks.append(ProseCheck(
            f"pathopolites dim{number} card ({dim}) Amish", PATHOPOLITES,
            rf'dim{number}Amish: "([^"]+)"', (f3(amish[dim]),),
        ))
        checks.append(ProseCheck(
            f"pathopolites dim{number} card ({dim}) Urban", PATHOPOLITES,
            rf'dim{number}Urban: "([^"]+)"', (f3(office[dim]),),
        ))
        checks.append(ProseCheck(
            f"pathopolites dim{number} card ({dim}) ratio", PATHOPOLITES,
            rf'dim{number}Ratio: "([^"]+)"',
            (ratio_num(office[dim], amish[dim], 3) + "×",),
        ))
    composite = (
        f3(amish["pathopolites_index"]),
        f3(office["pathopolites_index"]),
        ratio_num(office["pathopolites_index"], amish["pathopolites_index"], 3),
    )
    checks.append(ProseCheck(
        "pathopolites sixDimLead composite index (EN)", PATHOPOLITES,
        r"reaches (\S+) in the Amish baseline and (\S+) in the urban office environment — a (\S+)× increase",
        composite,
    ))
    checks.append(ProseCheck(
        "pathopolites sixDimLead composite index (FI)", PATHOPOLITES,
        r"saavuttaa (\S+) amish-perustasolla ja (\S+) urbaanissa toimistoympäristössä — (\S+)-kertainen",
        composite,
    ))
    checks.append(ProseCheck(
        "pathopolites gradientLead composite ratio (EN)", PATHOPOLITES,
        r"composite pathopolites index shows a (\S+)× increase", (composite[2],),
    ))
    checks.append(ProseCheck(
        "pathopolites gradientLead composite ratio (FI)", PATHOPOLITES,
        r"pathopolites-indeksi osoittaa (\S+)-kertaisen kasvun", (composite[2],),
    ))
    checks.append(ProseCheck(
        "pathopolites dim5Desc anomic distress at urban office (EN)", PATHOPOLITES,
        r"\((\S+) at urban office\)", (f3(office["anomic_distress"]),),
    ))
    checks.append(ProseCheck(
        "pathopolites dim5Desc anomic distress at urban office (FI)", PATHOPOLITES,
        r"\((\S+) urbaanissa toimistossa\)", (f3(office["anomic_distress"]),),
    ))
    checks.append(ProseCheck(
        "pathopolites moralDistressLead urban office (EN)", PATHOPOLITES,
        r"At (\S+) in the urban office environment", (f3(office["moral_distress"]),),
    ))
    checks.append(ProseCheck(
        "pathopolites moralDistressLead urban office (FI)", PATHOPOLITES,
        r"Arvolla (\S+) urbaanissa toimistoympäristössä", (f3(office["moral_distress"]),),
    ))

    # ---- patokratia/page.tsx ----
    profiles = {env: environment_profile(env, YEAR) for env in ENV_ORDER}
    ideology = {env: profiles[env]["dominant_ideology"] for env in ENV_ORDER}
    patho = {env: f3(ideology[env]["pathologization"]) for env in ENV_ORDER}
    trajectory = {year: environment_profile("suburban", year) for year in TRAJECTORY_YEARS}
    traj_ideology = {year: trajectory[year]["dominant_ideology"] for year in TRAJECTORY_YEARS}

    checks.append(TableCheck(
        "patokratia EMF->political output table (sPoliticalEnvs)", PATOKRATIA,
        r'^\s*\{ env: "[^"]+", emf: "[^"]+", biocap: "', 5,
        columns={
            # The source escapes the multiplication sign as ×.
            "emf": [f"{emf[env]:.2f}\\u00d7" for env in ENV_ORDER],
            "biocap": [f3(profiles[env]["biocap"]) for env in ENV_ORDER],
            "patholog": [patho[env] for env in ENV_ORDER],
        },
        en_only_columns={
            "ideology": [ideology_display(ideology[env]["primary"]) for env in ENV_ORDER],
        },
    ))
    polarization = f3(urban_rural_gradient(YEAR)["polarization_index"])
    checks.append(ProseCheck(
        "patokratia polarization index (EN)", PATOKRATIA,
        r"Polarization index ([0-9.]+[0-9])", (polarization,),
    ))
    checks.append(ProseCheck(
        "patokratia polarization index (FI)", PATOKRATIA,
        r"Polarisaatioindeksi ([0-9,]+[0-9])", (polarization,),
    ))
    checks.append(TableCheck(
        "patokratia ideology list (sPoliticalIdeologies)", PATOKRATIA,
        r'^\s*\{ name: "[^"]+", patholog: "', 6,
        columns={
            "patholog": [
                patho["amish"],
                patho["suburban"],
                f"{patho['urban_residential']}\\u2013{patho['urban_office']}",
                f3(traj_ideology[2050]["pathologization"]),
                None,  # "high" — qualitative
                None,  # "variable" — qualitative
            ],
        },
        en_only_columns={
            "name": [
                ideology_display(ideology["amish"]["primary"]),
                ideology_display(ideology["suburban"]["primary"]),
                ideology_display(ideology["urban_office"]["primary"]),
                ideology_display(traj_ideology[2050]["primary"]),
                None,
                None,
            ],
        },
    ))
    checks.append(TableCheck(
        "patokratia suburban trajectory (sPoliticalTrajectory)", PATOKRATIA,
        r'^\s*\{ year: "\d{4}", ideology: "', 5,
        columns={
            "year": [str(year) for year in TRAJECTORY_YEARS],
            "biocap": [f3(trajectory[year]["biocap"]) for year in TRAJECTORY_YEARS],
            "patholog": [f3(traj_ideology[year]["pathologization"]) for year in TRAJECTORY_YEARS],
        },
        en_only_columns={
            "ideology": [
                trajectory_ideology_display(traj_ideology[year]["primary"])
                for year in TRAJECTORY_YEARS
            ],
        },
    ))

    rk = {entry["environment"]: entry for entry in rk_environment_gradient(YEAR)}
    checks.append(TableCheck(
        "patokratia r/K table (sRKEnvs)", PATOKRATIA,
        r'^\s*\{ env: "[^"]+", index: "[^"]+", cls: "', 5,
        columns={
            "index": [f2(rk[env]["rk_index"]) for env in ENV_ORDER],
            "comp": [f2(rk[env]["traits"]["competition"]) for env in ENV_ORDER],
            "mating": [f2(rk[env]["traits"]["mating_strategy"]) for env in ENV_ORDER],
            "parent": [f2(rk[env]["traits"]["parental_investment"]) for env in ENV_ORDER],
            "sexual": [f2(rk[env]["traits"]["sexual_timing"]) for env in ENV_ORDER],
            "loyalty": [f2(rk[env]["traits"]["group_loyalty"]) for env in ENV_ORDER],
        },
        en_only_columns={
            "cls": [RK_CLASS_DISPLAY[rk[env]["classification"]] for env in ENV_ORDER],
        },
    ))

    foundations = {env: moral_foundations_profile(environment_biomarkers(env, YEAR)) for env in ENV_ORDER}
    breadth = {env: moral_breadth(foundations[env]) for env in ENV_ORDER}
    distress = {env: moral_distress_index(foundations[env]) for env in ENV_ORDER}
    checks.append(TableCheck(
        "patokratia moral breadth table (sMoralEnvs)", PATOKRATIA,
        r'^\s*\{ env: "[^"]+", breadth: "', 5,
        columns={
            "breadth": [f"{breadth[env]['active_count']}/{breadth[env]['total']}" for env in ENV_ORDER],
            "binding": [f"{breadth[env]['binding_active']}/{len(BINDING_FOUNDATIONS)}" for env in ENV_ORDER],
            "indiv": [f"{breadth[env]['individualizing_active']}/{len(INDIVIDUALIZING_FOUNDATIONS)}" for env in ENV_ORDER],
        },
        en_only_columns={
            "active": [
                active_foundations_display(breadth[env]["active_foundations"], breadth[env]["total"])
                for env in ENV_ORDER
            ],
        },
    ))
    order = foundation_collapse_order(YEAR)
    checks.append(TableCheck(
        "patokratia collapse hierarchy (sCollapseOrder)", PATOKRATIA,
        r'^\s*\{ rank: \d+, foundation: "', 6,
        columns={
            "rank": [str(entry["rank"]) for entry in order],
            "binding": [str(entry["binding"]).lower() for entry in order],
        },
        en_only_columns={
            "foundation": [entry["foundation"].capitalize() for entry in order],
            "type": [entry["formula_type"].capitalize() for entry in order],
            "collapse": [collapse_display(entry["collapse_environment"]) for entry in order],
        },
    ))
    checks.append(TableCheck(
        "patokratia moral distress table (sDistressEnvs)", PATOKRATIA,
        r'^\s*\{ env: "[^"]+", distress: "', 5,
        columns={
            "distress": [f2(distress[env]["distress_index"]) for env in ENV_ORDER],
            "anomie": [f2(distress[env]["components"]["anomie"]) for env in ENV_ORDER],
            "meaning": [f2(distress[env]["components"]["meaning_deficit"]) for env in ENV_ORDER],
            "narrowing": [
                f"{breadth[env]['total'] - breadth[env]['active_count']}/{breadth[env]['total']}"
                for env in ENV_ORDER
            ],
        },
    ))

    lc = {entry["environment"]: entry for entry in loyalty_collapse_gradient(YEAR)}
    checks.append(TableCheck(
        "patokratia loyalty collapse table (sLCEnvs)", PATOKRATIA,
        r'^\s*\{ env: "[^"]+", loyalty: "', 5,
        columns={
            "loyalty": [f2(lc[env]["loyalty"]) for env in ENV_ORDER],
            "care": [f2(lc[env]["care"]) for env in ENV_ORDER],
            "boundary": [f2(lc[env]["boundary_dissolution"]) for env in ENV_ORDER],
            "cac": [f2(lc[env]["collective_action_capacity"]) for env in ENV_ORDER],
            "pu": [f2(lc[env]["pathological_universalism"]) for env in ENV_ORDER],
            "ratchet": [f2(lc[env]["ratchet_velocity"]) for env in ENV_ORDER],
        },
    ))
    checks.append(ProseCheck(
        "patokratia sLCRatchetDesc ratchet velocity range (EN)", PATOKRATIA,
        r"with EMF: ([0-9.]+) \(amish\) \\u2192 ([0-9.]+) \(urban office\)",
        (f2(lc["amish"]["ratchet_velocity"]), f2(lc["urban_office"]["ratchet_velocity"])),
    ))

    vulnerability = {env: policy_vulnerability_profile(environment_biomarkers(env, YEAR)) for env in ENV_ORDER}
    domains = list(POLICY_DOMAINS)
    checks.append(TableCheck(
        "patokratia policy vulnerability table (sLCPolicies)", PATOKRATIA,
        r'^\s*\{ policy: "[^"]+", driver: "', len(domains),
        columns={
            "vAmish": [f2(vulnerability["amish"][domain]["vulnerability"]) for domain in domains],
            "vUrban": [f2(vulnerability["urban_office"][domain]["vulnerability"]) for domain in domains],
        },
        en_only_columns={
            "policy": [POLICY_DOMAINS[domain]["label"] for domain in domains],
        },
    ))

    markers = {env: {k: round(v, 3) for k, v in environment_biomarkers(env, YEAR).items()} for env in ENV_ORDER}

    def decline_pct(marker: str) -> str:
        return str(round((1.0 - markers["urban_office"][marker] / markers["amish"][marker]) * 100.0))

    checks.append(ProseCheck(
        "patokratia sLCDesc T/OXT/BDNF decline across gradient (EN)", PATOKRATIA,
        r"direct VGCC, (\d+)% decline across the gradient\), followed by oxytocin "
        r"\(hypothalamic neurons, (\d+)%\), then BDNF \(cortical, (\d+)%\)",
        (decline_pct("T"), decline_pct("OXT"), decline_pct("BDNF")),
    ))

    # ---- patopolis/page.tsx ----
    shredder = {entry["environment"]: entry for entry in iq_shredder_gradient(YEAR)}
    checks.append(TableCheck(
        "patopolis IQ shredder table", PATOPOLIS,
        r'^\s*\{ env: "[^"]+", rs: "', 5,
        columns={
            "rs": [f3(shredder[env]["reproductive_suppression"]) for env in ENV_ORDER],
            "da": [f3(shredder[env]["dopaminergic_capture"]) for env in ENV_ORDER],
            "tp": [f3(shredder[env]["time_preference_shift"]) for env in ENV_ORDER],
            "gb": [f3(shredder[env]["genetic_burn_rate"]) for env in ENV_ORDER],
            "se": [f3(shredder[env]["shredder_efficiency"]) for env in ENV_ORDER],
            "bc": [f3(shredder[env]["biocap"]) for env in ENV_ORDER],
        },
    ))
    efficiency_ratio = str(round(
        round(shredder["urban_office"]["shredder_efficiency"], 3)
        / round(shredder["amish"]["shredder_efficiency"], 3)
    ))
    checks.append(ProseCheck(
        "patopolis sIQSTableDesc shredder efficiency ratio (EN)", PATOPOLIS,
        r"shows a (\d+)× increase across the gradient", (efficiency_ratio,),
    ))
    checks.append(ProseCheck(
        "patopolis sIQSTableDesc shredder efficiency ratio (FI)", PATOPOLIS,
        r"osoittaa (\d+)-kertaisen kasvun gradientin yli", (efficiency_ratio,),
    ))
    checks.append(ProseCheck(
        "patopolis sIQSBurnDesc BDNF decline across gradient (EN)", PATOPOLIS,
        r"BDNF decline \((\d+)% across the gradient\)", (decline_pct("BDNF"),),
    ))

    # ---- patokinesis/page.tsx ----
    signal = {entry["environment"]: entry for entry in signal_degradation_gradient(YEAR)}
    sink = {entry["environment"]: entry for entry in behavioral_sink_gradient(YEAR)}
    checks.append(TableCheck(
        "patokinesis signal & sink gradient table (s6gradientData)", PATOKINESIS,
        r'^\s*\{ signal: "[^"]+", pair: "', 5,
        columns={
            "signal": [f3(signal[env]["total_signal_strength"]) for env in ENV_ORDER],
            "pair": [f3(signal[env]["pair_signal_compound"]) for env in ENV_ORDER],
            "obesity": [f3(signal[env]["obesity_amplification"]) for env in ENV_ORDER],
            "predation": [f3(sink[env]["normative_predation"]) for env in ENV_ORDER],
            "capture": [f3(sink[env]["institutional_capture"]) for env in ENV_ORDER],
            "sink": [f3(sink[env]["behavioral_sink"]) for env in ENV_ORDER],
        },
    ))
    transmission = {
        entry["environment"]: entry for entry in civilizational_transmission_gradient(YEAR)
    }
    checks.append(TableCheck(
        "patokinesis BIS gradient table (s10gradientData)", PATOKINESIS,
        r'^\s*\{ env: "[^"]+", bis: "', 5,
        columns={
            "bis": [f3(transmission[env]["behavioral_immune"]) for env in ENV_ORDER],
            "destig": [f3(transmission[env]["destigmatization"]) for env in ENV_ORDER],
            "inv": [f3(transmission[env]["stigma_inversion"]) for env in ENV_ORDER],
            "net": [signed3(transmission[env]["net_immunity"]) for env in ENV_ORDER],
        },
    ))
    checks.append(TableCheck(
        "patokinesis transmission gradient table (s11gradientData)", PATOKINESIS,
        r'^\s*\{ env: "[^"]+", sabotage: "', 5,
        columns={
            "sabotage": [f3(transmission[env]["recovery_sabotage"]) for env in ENV_ORDER],
            "dependency": [f3(transmission[env]["dependency_transmission"]) for env in ENV_ORDER],
            "contagion": [f3(transmission[env]["social_contagion"]) for env in ENV_ORDER],
            "empathy": [f3(transmission[env]["empathy_weaponization"]) for env in ENV_ORDER],
            "infection": [f3(transmission[env]["active_infection_seeking"]) for env in ENV_ORDER],
            "composite": [f3(transmission[env]["transmission_composite"]) for env in ENV_ORDER],
        },
    ))
    composite_span = (
        f3(transmission["amish"]["transmission_composite"]),
        f3(transmission["urban_office"]["transmission_composite"]),
    )
    checks.append(ProseCheck(
        "patokinesis s11gradientKey composite span (EN)", PATOKINESIS,
        r"composite transmission index goes from (\S+) \(amish — near-complete resistance\) "
        r"to (\S+) \(urban office",
        composite_span,
    ))
    checks.append(ProseCheck(
        "patokinesis s11gradientKey composite span (FI)", PATOKINESIS,
        r"Komposiittitransmissioindeksi nousee (\S+):sta \(amish — lähes täydellinen resistenssi\) "
        r"(\S+):ään \(kaupunkitoimisto",
        composite_span,
    ))
    return checks


CHECKS = page_checks()


@pytest.fixture(scope="module")
def pages() -> dict[str, str]:
    if not CIV_DIR.is_dir():
        pytest.fail(f"civilization pages not found at {CIV_DIR} — site literals cannot be verified")
    return {name: (CIV_DIR / name).read_text(encoding="utf-8") for name in PAGES}


@pytest.mark.parametrize("check", CHECKS, ids=[check.label for check in CHECKS])
def test_page_literal_matches_model(check: TableCheck | ProseCheck, pages: dict[str, str]) -> None:
    results = check.run(pages[check.page])
    failures = [result for result in results if not result.ok]
    if failures:
        pytest.fail(
            "Page literal(s) out of sync with berm.civilization.political_biology "
            "(regenerate with `PYTHONPATH=. python3 export_civilization.py` and update the page):\n  "
            + "\n  ".join(str(failure) for failure in failures)
        )


# ── website/public/data/civilization_indices.json ──


def _export_module() -> Any:
    spec = importlib.util.spec_from_file_location("export_civilization", EXPORT_SCRIPT)
    assert spec is not None and spec.loader is not None, EXPORT_SCRIPT
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def _load_committed() -> dict[str, Any]:
    assert JSON_PATH.exists(), (
        f"{JSON_PATH} missing — run `PYTHONPATH=. python3 export_civilization.py` from berm/"
    )
    return json.loads(JSON_PATH.read_text(encoding="utf-8"))


def _without_generated(payload: dict[str, Any]) -> dict[str, Any]:
    normalised = json.loads(json.dumps(payload))
    normalised["metadata"].pop("generated", None)
    return normalised


def _diff(a: Any, b: Any, path: str = "") -> list[str]:
    if isinstance(a, dict) and isinstance(b, dict):
        out: list[str] = []
        for key in sorted(set(a) | set(b)):
            if key not in a:
                out.append(f"{path}/{key}: missing in committed JSON")
            elif key not in b:
                out.append(f"{path}/{key}: missing in fresh export")
            else:
                out.extend(_diff(a[key], b[key], f"{path}/{key}"))
        return out
    if isinstance(a, list) and isinstance(b, list):
        if len(a) != len(b):
            return [f"{path}: committed has {len(a)} items, fresh export has {len(b)}"]
        return [line for i, (x, y) in enumerate(zip(a, b)) for line in _diff(x, y, f"{path}[{i}]")]
    if a != b:
        return [f"{path}: committed={a!r} fresh={b!r}"]
    return []


def test_export_json_metadata() -> None:
    payload = _load_committed()
    meta = payload["metadata"]
    assert meta["source"] == "berm.civilization.political_biology"
    assert meta["version"] == __version__, "civilization_indices.json was generated by another package version — re-run export"
    assert re.fullmatch(r"\d{4}-\d{2}-\d{2}", meta["generated"])
    assert meta["year"] == YEAR
    assert meta["environment_order"] == list(ENV_ORDER)
    required = {
        "environments", "pathopolites", "political", "rk_strategy",
        "moral_breadth", "moral_distress", "foundation_collapse_order",
        "loyalty_collapse", "policy_vulnerability", "iq_shredder", "biomarkers",
        "signal_degradation", "behavioral_sink", "transmission",
    }
    assert required <= set(payload), f"missing sections: {sorted(required - set(payload))}"


def test_export_json_in_sync_with_fresh_export(tmp_path: Path) -> None:
    module = _export_module()
    fresh_path = module.write(module.build(YEAR), tmp_path / "civilization_indices.json")
    fresh = json.loads(fresh_path.read_text(encoding="utf-8"))
    committed = _load_committed()
    differences = _diff(_without_generated(committed), _without_generated(fresh))
    assert not differences, (
        "civilization_indices.json is stale — re-run `PYTHONPATH=. python3 export_civilization.py`:\n  "
        + "\n  ".join(differences[:25])
    )


def test_export_json_matches_direct_model_calls() -> None:
    """Independent of build(): the JSON must equal direct political_biology calls."""
    payload = _load_committed()

    rows = payload["pathopolites"]["rows"]
    assert [row["environment"] for row in rows] == list(ENV_ORDER)
    for entry, row in zip(pathopolites_gradient(YEAR), rows):
        assert row["pathopolites_index"] == round(entry["pathopolites_index"], 3)
        assert row["moral_distress"] == round(entry["moral_distress"], 3)
        for dim in PATHOPOLITES_DIMENSIONS:
            assert row[dim] == round(entry[dim], 3), (row["environment"], dim)

    gradient = urban_rural_gradient(YEAR)
    assert payload["political"]["polarization_index"] == round(gradient["polarization_index"], 3)
    for row in payload["political"]["rows"]:
        profile = environment_profile(row["environment"], YEAR)
        assert row["biocap"] == round(profile["biocap"], 3)
        assert row["ideology"] == profile["dominant_ideology"]["primary"]
        assert row["pathologization"] == round(profile["dominant_ideology"]["pathologization"], 3)

    for entry, row in zip(rk_environment_gradient(YEAR), payload["rk_strategy"]["rows"]):
        assert row["environment"] == entry["environment"]
        assert row["rk_index"] == round(entry["rk_index"], 2)
        assert row["classification"] == entry["classification"]
        for trait, value in entry["traits"].items():
            assert row[trait] == round(value, 2), (row["environment"], trait)

    for row in payload["moral_breadth"]["rows"]:
        breadth = moral_breadth(moral_foundations_profile(environment_biomarkers(row["environment"], YEAR)))
        assert row["active_count"] == breadth["active_count"]
        assert row["binding_active"] == breadth["binding_active"]
        assert row["individualizing_active"] == breadth["individualizing_active"]

    for entry, row in zip(loyalty_collapse_gradient(YEAR), payload["loyalty_collapse"]["rows"]):
        assert row["environment"] == entry["environment"]
        assert row["loyalty"] == round(entry["loyalty"], 2)
        assert row["collective_action_capacity"] == round(entry["collective_action_capacity"], 2)
        assert row["ratchet_velocity"] == round(entry["ratchet_velocity"], 2)

    for domain_row in payload["policy_vulnerability"]["domains"]:
        for env, value in domain_row["vulnerability"].items():
            direct = policy_vulnerability_profile(environment_biomarkers(env, YEAR))
            assert value == round(direct[domain_row["domain"]]["vulnerability"], 2), (env, domain_row["domain"])

    for entry, row in zip(iq_shredder_gradient(YEAR), payload["iq_shredder"]["rows"]):
        assert row["environment"] == entry["environment"]
        assert row["shredder_efficiency"] == round(entry["shredder_efficiency"], 3)
        assert row["reproductive_suppression"] == round(entry["reproductive_suppression"], 3)
        assert row["biocap"] == round(entry["biocap"], 3)

    # patokinesis gradients: every exported column, not just the displayed ones.
    for section, gradient in (
        ("signal_degradation", signal_degradation_gradient(YEAR)),
        ("behavioral_sink", behavioral_sink_gradient(YEAR)),
        ("transmission", civilizational_transmission_gradient(YEAR)),
    ):
        rows = payload[section]["rows"]
        assert [row["environment"] for row in rows] == list(ENV_ORDER), section
        assert payload[section]["precision"] == 3, section
        for entry, row in zip(gradient, rows):
            assert row["environment"] == entry["environment"], section
            assert row["emf_factor"] == ENVIRONMENTS[row["environment"]].emf_factor
            for column, value in row.items():
                if column in ("environment", "emf_factor"):
                    continue
                assert value == round(entry[column], 3), (section, row["environment"], column)
