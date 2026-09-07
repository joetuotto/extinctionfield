"""Regenerate the website contract from berm.architecture, without a second schema."""
from __future__ import annotations

import json
from pathlib import Path

from berm.architecture import architecture_manifest

OUTPUT = Path(__file__).resolve().parents[1] / "website/data/model-architecture.json"


def main() -> None:
    OUTPUT.write_text(json.dumps(architecture_manifest(), indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
