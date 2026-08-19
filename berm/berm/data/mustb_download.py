"""Immutable acquisition for the public EU Pollinator Hub MUST-B study.

MUST-B is a potential biological-covariate source for the bee work.  The
portal catalogue describes relational field-study tables from experimental
apiaries in Denmark and Portugal in 2019--2020.  A downloader must *not*
assume that the ZIP currently served by the portal contains every catalogue
part: a downstream availability audit records exactly which tables were
actually received before any data are normalized.

It has **no RF measurement**.  This module therefore produces a standalone
source snapshot only.  It must not be used to manufacture an RF exposure, a
CSLI result, or a causal join with the historical country-level COLOSS series.

The public landing page creates a short-lived signed URL for its complete ZIP
archive.  The acquisition resolves that URL afresh, stores the publisher's ZIP
bytes without rewriting them, and records the archive checksum in an immutable
release manifest.  A new acquisition uses a new release directory; no source
artefact is overwritten.

Example (from ``berm/``)::

    python -m berm.data.mustb_download acquire --release-id mustb_2026-08-19
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import html
import json
import re
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Callable
from urllib.parse import urljoin
from urllib.request import urlopen


__all__ = [
    "DATA_DIR",
    "RAW_DIR",
    "MANIFEST_DIR",
    "MUSTB_DATASET_UID",
    "MUSTB_SOURCE_ID",
    "MUSTB_LANDING_URL",
    "MUSTB_RAW_FILENAME",
    "MUSTB_PIPELINE_VERSION",
    "MustbDownloadError",
    "MustbRelease",
    "acquire_mustb_release",
    "load_mustb_release",
]


DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
RAW_DIR = DATA_DIR / "raw"
MANIFEST_DIR = RAW_DIR / "manifests"
MUSTB_DATASET_UID = "MUSTB76.0.0"
MUSTB_SOURCE_ID = "EUPH_MUSTB_2019_2020"
MUSTB_LANDING_URL = f"https://app.pollinatorhub.eu/dataset-discovery/{MUSTB_DATASET_UID}"
MUSTB_RAW_FILENAME = "must-b.zip"
MUSTB_PIPELINE_VERSION = "mustb_acquire@v1.1.0"
_RELEASE_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]*$")
_ARCHIVE_LINK_RE = re.compile(
    r"(?:href=)?[\"']?(?P<url>(?:https://app\.pollinatorhub\.eu)?/download/everything/76\?[^\"'<>\s]+)",
    re.IGNORECASE,
)


class MustbDownloadError(RuntimeError):
    """The public MUST-B landing page or archive was malformed or unavailable."""


@dataclass(frozen=True)
class MustbRelease:
    """One verified, held MUST-B immutable ZIP source bundle."""

    release_id: str
    path: Path
    manifest_path: Path | None
    retrieved_at: str
    members: tuple[str, ...]


def _today() -> str:
    return dt.date.today().isoformat()


def _canonical_bytes(value: object) -> bytes:
    return (
        json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
        + "\n"
    ).encode("utf-8")


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _default_fetch_text(url: str, timeout: float = 60.0) -> str:
    """Fetch the public landing page with a CA-backed requests fallback."""
    try:
        import requests
    except ImportError:  # pragma: no cover - base-package fallback
        with urlopen(url, timeout=timeout) as response:  # noqa: S310 - fixed HTTPS URL
            return response.read().decode("utf-8")
    response = requests.get(url, timeout=timeout)
    response.raise_for_status()
    return response.text


def _default_fetch_bytes(url: str, timeout: float = 300.0) -> bytes:
    """Fetch the publisher's complete ZIP without changing any source bytes."""
    try:
        import requests
    except ImportError:  # pragma: no cover - base-package fallback
        with urlopen(url, timeout=timeout) as response:  # noqa: S310 - fixed HTTPS URL
            return response.read()
    response = requests.get(url, timeout=timeout)
    response.raise_for_status()
    return response.content


def _archive_url_from_landing_html(landing_html: str) -> str:
    """Resolve the current public *entire dataset* archive URL from the page."""
    match = _ARCHIVE_LINK_RE.search(landing_html)
    if not match:
        raise MustbDownloadError(
            "MUST-B public landing page did not contain a complete-dataset download URL"
        )
    raw_url = html.unescape(match.group("url"))
    archive_url = urljoin(MUSTB_LANDING_URL, raw_url)
    if not archive_url.startswith("https://app.pollinatorhub.eu/download/everything/76?"):
        raise MustbDownloadError("MUST-B landing page returned an unexpected download URL")
    return archive_url


def _release_id(value: str) -> str:
    if not _RELEASE_RE.fullmatch(value):
        raise ValueError(
            "release_id must contain only letters, digits, '.', '_' or '-' "
            "and must not start with punctuation"
        )
    return value


def _member_names_from_bytes(payload: bytes) -> tuple[str, ...]:
    try:
        from io import BytesIO

        with zipfile.ZipFile(BytesIO(payload)) as archive:
            names = tuple(info.filename for info in archive.infolist() if not info.is_dir())
    except zipfile.BadZipFile as exc:
        raise MustbDownloadError("MUST-B complete-dataset download is not a readable ZIP") from exc
    if not names:
        raise MustbDownloadError("MUST-B complete-dataset ZIP contains no files")
    return names


def acquire_mustb_release(
    *,
    release_id: str | None = None,
    raw_dir: Path = RAW_DIR,
    manifest_dir: Path = MANIFEST_DIR,
    retrieved_at: str | None = None,
    fetch_text: Callable[[str], str] | None = None,
    fetch_bytes: Callable[[str], bytes] | None = None,
) -> dict[str, object]:
    """Acquire one new immutable raw MUST-B archive and its compact manifest."""
    retrieved_at = retrieved_at or _today()
    release_id = _release_id(release_id or f"mustb_{retrieved_at}")
    release_dir = raw_dir / "pollinator_hub" / release_id
    manifest_path = manifest_dir / f"{release_id}.manifest.json"
    archive_path = release_dir / MUSTB_RAW_FILENAME
    if release_dir.exists() or manifest_path.exists():
        raise FileExistsError(
            f"release {release_id!r} already exists; choose a new release id instead of overwriting it"
        )

    landing_html = (fetch_text or _default_fetch_text)(MUSTB_LANDING_URL)
    archive_url = _archive_url_from_landing_html(landing_html)
    payload = (fetch_bytes or _default_fetch_bytes)(archive_url)
    if not isinstance(payload, bytes):
        raise MustbDownloadError("MUST-B archive fetcher did not return bytes")
    member_names = _member_names_from_bytes(payload)

    # Network and archive validation happen before creating a release directory,
    # so an interrupted download cannot resemble a valid partial source batch.
    release_dir.mkdir(parents=True, exist_ok=False)
    archive_path.write_bytes(payload)
    file_entry = {
        "source_id": MUSTB_SOURCE_ID,
        "path": str(archive_path.relative_to(raw_dir.parent)),
        "original_filename": MUSTB_RAW_FILENAME,
        "bytes": archive_path.stat().st_size,
        "sha256": _sha256(archive_path),
        "retrieved_at": retrieved_at,
        "note": (
            "Publisher ZIP downloaded through the current public complete-dataset "
            "link resolved from the stable EU Pollinator Hub landing page; archive "
            "bytes are retained unchanged. The downstream availability audit determines "
            "which portal-listed tables are actually present. It has no RF measurements "
            "and must not feed CSLI or a causal join."
        ),
    }
    manifest: dict[str, object] = {
        "manifest_id": release_id,
        "description": (
            "Immutable public EU Pollinator Hub MUST-B (2019-2020) raw archive; "
            "biological covariate layer only."
        ),
        "retrieved_at": retrieved_at,
        "retrieval_method": (
            "Resolved short-lived public complete-dataset URL from stable landing page "
            f"{MUSTB_LANDING_URL}; stored publisher ZIP bytes unchanged"
        ),
        "license": "CC BY 4.0",
        "transform_pipeline_version": MUSTB_PIPELINE_VERSION,
        "files": [file_entry],
        "archive_member_count": len(member_names),
        "archive_members": list(member_names),
    }
    manifest_dir.mkdir(parents=True, exist_ok=True)
    manifest_path.write_bytes(_canonical_bytes(manifest))
    return manifest


def load_mustb_release(path: Path) -> MustbRelease:
    """Open a held MUST-B archive without reformatting its source bytes."""
    try:
        with zipfile.ZipFile(path) as archive:
            members = tuple(info.filename for info in archive.infolist() if not info.is_dir())
    except zipfile.BadZipFile as exc:
        raise MustbDownloadError(f"{path} is not a readable MUST-B ZIP archive") from exc
    if not members:
        raise MustbDownloadError(f"{path} contains no source files")
    release_id = path.parent.name
    manifest_candidate = path.parents[2] / "manifests" / f"{release_id}.manifest.json"
    retrieved_at = ""
    if manifest_candidate.exists():
        with manifest_candidate.open(encoding="utf-8") as handle:
            manifest = json.load(handle)
        value = manifest.get("retrieved_at")
        if isinstance(value, str):
            retrieved_at = value
    return MustbRelease(
        release_id=release_id,
        path=path,
        manifest_path=manifest_candidate if manifest_candidate.exists() else None,
        retrieved_at=retrieved_at,
        members=members,
    )


def _main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    acquire = sub.add_parser("acquire", help="download an immutable public MUST-B release")
    acquire.add_argument("--release-id", default=None)
    acquire.add_argument("--retrieved-at", default=None)
    args = parser.parse_args(argv)
    if args.command == "acquire":
        manifest = acquire_mustb_release(
            release_id=args.release_id,
            retrieved_at=args.retrieved_at,
        )
        print(json.dumps(manifest, ensure_ascii=False, indent=2))
        return 0
    raise AssertionError(f"unhandled command {args.command!r}")


if __name__ == "__main__":  # pragma: no cover - CLI integration
    raise SystemExit(_main())
