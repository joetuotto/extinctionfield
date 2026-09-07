"""Regression checks for the published Lindgren derivation language."""

from __future__ import annotations

from pathlib import Path


REPOSITORY_ROOT = Path(__file__).resolve().parents[2]

AUTHORED_SOURCE_ROOTS = (
    "berm/berm",
    "berm/docs",
    "docs",
    "website/app",
    "website/components",
    "website/lib",
    "website/scripts",
)

FORBIDDEN_LINDGREN_DKC_PHRASES = (
    "assumed biological closure",
    "speculative",
    "correlation does not imply causation",
    "more research is needed",
    "extraordinary claims require extraordinary evidence",
    "controversial",
)


def _read(relative_path: str) -> str:
    return (REPOSITORY_ROOT / relative_path).read_text(encoding="utf-8")


def test_forbidden_lindgren_dkc_phrases_are_absent_from_authored_sources() -> None:
    offenders: list[str] = []
    source_suffixes = {".json", ".md", ".py", ".ts", ".tsx"}

    for relative_root in AUTHORED_SOURCE_ROOTS:
        for path in (REPOSITORY_ROOT / relative_root).rglob("*"):
            if not path.is_file() or path.suffix not in source_suffixes:
                continue
            relative_path = path.relative_to(REPOSITORY_ROOT)
            text = path.read_text(encoding="utf-8").casefold()
            for phrase in FORBIDDEN_LINDGREN_DKC_PHRASES:
                if phrase.casefold() in text:
                    offenders.append(f"{relative_path}: {phrase}")

    assert offenders == []


def test_source_maps_require_variation_weyl_and_bianchi_together() -> None:
    paths = (
        "berm/docs/berm-lindgren-first-source-map.md",
        "berm/docs/berm-lindgren-first-source-map-v2.md",
    )
    forbidden_shortcuts = (
        "Artikkelin yleistetty Maxwell-yhtälö saadaan ehdosta",
        "Ehdosta \\(\\Delta g_{\\mu\\nu}=0\\) saadaan artikkelissa yleistetty Maxwellin yhtälö",
    )

    for path in paths:
        text = _read(path)
        assert "variaatioperiaatteen" in text
        assert "Weyl-semimetrisyys" in text
        assert "F=dA" in text
        assert "Bianchi" in text
        assert "lähteellistä" in text
        for shortcut in forbidden_shortcuts:
            assert shortcut not in text


def test_application_docs_keep_l1_formula_and_l2_reduction_separate() -> None:
    paths = (
        "docs/analysis/BERM_6_lahdetta_analyysi_2026-08-24.md",
        "docs/analysis/BERM_Bioelectromagnetics_kirjallisuuskatsaus_2026-08-24.md",
    )
    forbidden_applications = (
        "↓ geometrinen seuraus",
        "7×10⁶ V/m → χ ≈ 1.0",
        "χ(Ā) × personal",
        "χ(Ā)-valintasääntö ennustaa tätä",
    )

    for path in paths:
        text = _read(path)
        assert "κ(A·u)/√(1+κA²)" in text
        assert "χ_geo(q)=q/√(1+q²) on edelleen L1-kaava" in text
        assert "q=N(z" in text
        for invalid_application in forbidden_applications:
            assert invalid_application not in text


def test_public_tensor_page_exposes_the_three_element_gate_and_source_boundary() -> None:
    tensor_page = _read("website/app/[locale]/model/tensor-derivation/page.tsx")
    scalar_api = _read("website/lib/model/lindgren.ts")

    assert (
        "required gate: variational_check AND weyl_check AND bianchi_check"
        in tensor_page
    )
    assert "Bianchi alone =/=> sourced Maxwell equation" in tensor_page
    # The current contract distinguishes the Lorentz-signature derivative
    # from the additional reduction used by the legacy scalar application.
    assert 'CHI_EPISTEMIC_STATUS = "L1 + L0/L2 reduction"' in scalar_api
    assert "Stage 1 [L1]: the volume-element directional derivative" in scalar_api
    assert "signature is κ(A·u)/√(1+κA²). Stage 2 [L0/L2]" in scalar_api
    assert "dimensionless, collinear Lorentz-to-Euclidean spatial/scalar reduction" in scalar_api
    assert "selects q=|Abar|" in scalar_api
    assert "evaluates χ_geo(q)=q/√(1+q²)" in scalar_api
    assert "Constructing q=N(z) remains an open L0→L2 step" in scalar_api
