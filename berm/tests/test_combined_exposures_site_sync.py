"""The website publishes the implemented structure, including open parameters."""
import json
from pathlib import Path

from berm.biology import combined_exposures_structure


def test_public_and_application_structures_match_the_model():
    root = Path(__file__).resolve().parents[2]
    expected = combined_exposures_structure()
    for relative in ("website/data/combined-exposures.json", "website/public/data/combined-exposures.json"):
        assert json.loads((root / relative).read_text(encoding="utf-8")) == expected
    architecture = json.loads((root / "website/data/model-architecture.json").read_text(encoding="utf-8"))
    assert architecture["evidenceSynthesis"]["combinedExposures"]["structureVersion"] == expected["version"]
    claims = json.loads((root / "website/data/claims.json").read_text(encoding="utf-8"))
    claim_ids = {row["id"] for row in claims["claims"]}
    assert set(expected["claimIds"]) <= claim_ids
