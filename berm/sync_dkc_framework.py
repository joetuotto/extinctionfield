#!/usr/bin/env python3
"""Synchronize the unreleased DKC registry mirrors from canonical Python data."""

from __future__ import annotations

import json
from pathlib import Path

from berm.dkc_registry import dkc_framework_registry


ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = (
    ROOT / "website" / "data" / "dkc-framework.json",
    ROOT / "website" / "public" / "data" / "dkc-framework.json",
)


def main() -> None:
    registry = dkc_framework_registry()
    payload = json.dumps(registry, ensure_ascii=False, indent=2) + "\n"
    for path in OUTPUTS:
        path.write_text(payload, encoding="utf-8")
        print(path.relative_to(ROOT))


if __name__ == "__main__":
    main()
