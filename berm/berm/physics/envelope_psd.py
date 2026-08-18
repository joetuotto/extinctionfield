"""Envelope PSD analysis: from SDR I/Q capture to R42 spectral metric.

Pipeline:
  1. Load SDR I/Q data (complex float32) or generate synthetic eDRX signal
  2. Compute instantaneous power P(t) = |x(t)|²
  3. Downsample to 1 Hz (anti-alias LP + decimate)
  4. Welch PSD (segment ≥ 600 s for mHz resolution)
  5. Integrate R42-weighted PSD → Ξ_R42
  6. Plot spectrum 1 mHz – 1 Hz with R42 window overlay

No SDR hardware required — works with synthetic test data.
"""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from scipy import signal as sig

from berm.physics.r42_envelope import (
    R42_CENTER_HZ,
    R42_LOW_HZ,
    R42_HIGH_HZ,
    r42_window,
)
from berm.physics.threegpp_convergence import EDRX_CYCLES_SECONDS


# ── Synthetic signal generation ──────────────────────────────────────


def generate_synthetic_edrx_signal(
    T_edrx: float = 40.96,
    ptw: float = 33.28,
    duration_s: float = 7200.0,
    fs_rf: float = 1000.0,
    carrier_hz: float = 100.0,
    snr_db: float = 20.0,
    seed: int | None = 42,
) -> tuple[np.ndarray, float]:
    """Generate a synthetic I/Q signal mimicking eDRX RF bursts.

    The signal models a UE that transmits RF bursts during each Paging
    Time Window (PTW) within the eDRX cycle, then sleeps.

    Parameters
    ----------
    T_edrx : eDRX cycle period in seconds (default: 40.96 s)
    ptw : Paging Time Window duration in seconds (default: 33.28 s)
    duration_s : total signal duration in seconds (default: 7200 = 2 h)
    fs_rf : sample rate in Hz (default: 1000 Hz — sufficient for envelope)
    carrier_hz : carrier frequency for I/Q modulation
    snr_db : signal-to-noise ratio in dB
    seed : RNG seed for reproducibility (None for random)

    Returns
    -------
    (iq_signal, fs_rf) : complex64 array and sample rate
    """
    rng = np.random.default_rng(seed)
    n_samples = int(duration_s * fs_rf)
    t = np.arange(n_samples) / fs_rf

    envelope = np.zeros(n_samples, dtype=np.float32)
    cycle_samples = int(T_edrx * fs_rf)
    ptw_samples = int(ptw * fs_rf)

    for start in range(0, n_samples, cycle_samples):
        end = min(start + ptw_samples, n_samples)
        envelope[start:end] = 1.0

    carrier = np.exp(2j * np.pi * carrier_hz * t).astype(np.complex64)
    iq_clean = envelope * carrier

    noise_power = 10 ** (-snr_db / 10)
    noise = math.sqrt(noise_power / 2) * (
        rng.standard_normal(n_samples) + 1j * rng.standard_normal(n_samples)
    )
    iq = (iq_clean + noise).astype(np.complex64)

    return iq, fs_rf


# ── I/Q file loading ─────────────────────────────────────────────────


def load_iq_file(
    path: str | Path,
    fs: float,
    dtype: np.dtype = np.complex64,
    max_samples: int | None = None,
) -> tuple[np.ndarray, float]:
    """Load raw I/Q data from a binary file.

    Standard SDR format: interleaved float32 (I, Q, I, Q, ...).

    Parameters
    ----------
    path : file path to raw I/Q binary
    fs : sample rate of the capture in Hz
    dtype : numpy dtype (default: complex64 = interleaved float32)
    max_samples : limit number of complex samples loaded (None = all)

    Returns
    -------
    (iq_data, fs) : complex array and sample rate
    """
    path = Path(path)
    data = np.fromfile(path, dtype=dtype)
    if max_samples is not None:
        data = data[:max_samples]
    return data, fs


# ── Envelope extraction + downsampling ───────────────────────────────


def envelope_power(iq: np.ndarray) -> np.ndarray:
    """Instantaneous power: P(t) = |x(t)|²."""
    return np.abs(iq) ** 2


def downsample_to_1hz(
    power: np.ndarray, fs_in: float, fs_out: float = 1.0
) -> tuple[np.ndarray, float]:
    """Anti-alias filter and decimate power envelope to fs_out Hz.

    Uses a Chebyshev Type I anti-alias filter followed by integer
    decimation. If fs_in is not an integer multiple of fs_out,
    resamples to the nearest integer ratio.
    """
    ratio = int(round(fs_in / fs_out))
    if ratio <= 1:
        return power, fs_in

    power_down = sig.decimate(power.astype(np.float64), ratio, ftype="iir", zero_phase=True)
    return power_down.astype(np.float32), fs_in / ratio


# ── Welch PSD ────────────────────────────────────────────────────────


def compute_psd(
    power_1hz: np.ndarray,
    fs: float = 1.0,
    min_segment_s: float = 600.0,
    overlap_frac: float = 0.5,
) -> tuple[np.ndarray, np.ndarray]:
    """Welch PSD of the power envelope.

    Parameters
    ----------
    power_1hz : power envelope at 1 Hz sample rate
    fs : sample rate (should be 1.0 Hz after downsampling)
    min_segment_s : minimum Welch segment length in seconds
        (600 s gives ~1.67 mHz frequency resolution)
    overlap_frac : fractional overlap between segments

    Returns
    -------
    (freqs, psd) : frequency array (Hz) and PSD array (V²/Hz)
    """
    n = len(power_1hz)
    nperseg = max(int(min_segment_s * fs), n)
    nperseg = min(nperseg, n)
    noverlap = int(nperseg * overlap_frac)

    freqs, psd = sig.welch(
        power_1hz,
        fs=fs,
        nperseg=nperseg,
        noverlap=noverlap,
        window="hann",
        scaling="density",
        detrend="constant",
    )

    return freqs, psd


# ── R42 integration ──────────────────────────────────────────────────


def xi_r42_from_psd(
    freqs: np.ndarray, psd: np.ndarray
) -> dict:
    """Integrate R42-weighted PSD to get Ξ_R42.

    Ξ_R42 = ∫ PSD(f) × W_R42(f) df

    Also returns the unweighted band power for comparison.
    """
    mask = (freqs >= R42_LOW_HZ) & (freqs <= R42_HIGH_HZ)
    if not np.any(mask):
        return {
            "xi_r42": 0.0,
            "band_power": 0.0,
            "peak_freq_hz": None,
            "peak_freq_mhz": None,
            "n_bins_in_r42": 0,
            "freq_resolution_mhz": float(freqs[1] - freqs[0]) * 1000 if len(freqs) > 1 else None,
        }

    f_r42 = freqs[mask]
    psd_r42 = psd[mask]
    df = freqs[1] - freqs[0] if len(freqs) > 1 else 1.0

    weights = np.array([r42_window(f) for f in f_r42])
    xi = float(np.sum(psd_r42 * weights) * df)
    band_power = float(np.sum(psd_r42) * df)

    peak_idx = np.argmax(psd_r42)
    peak_f = float(f_r42[peak_idx])

    return {
        "xi_r42": xi,
        "band_power": band_power,
        "peak_freq_hz": peak_f,
        "peak_freq_mhz": round(peak_f * 1000, 3),
        "n_bins_in_r42": int(np.sum(mask)),
        "freq_resolution_mhz": round(float(df) * 1000, 4),
    }


def find_edrx_peaks(
    freqs: np.ndarray,
    psd: np.ndarray,
    prominence_db: float = 3.0,
) -> list[dict]:
    """Find spectral peaks and match them to expected eDRX harmonics.

    Returns list of detected peaks with nearest eDRX match.
    """
    mask = (freqs >= 0.001) & (freqs <= 1.0)
    f_sub = freqs[mask]
    psd_sub = psd[mask]

    psd_db = 10 * np.log10(np.maximum(psd_sub, 1e-30))
    peak_indices, properties = sig.find_peaks(psd_db, prominence=prominence_db)

    edrx_fundamentals = {round(1.0 / T, 6): T for T in EDRX_CYCLES_SECONDS}

    peaks = []
    for i, idx in enumerate(peak_indices):
        f_peak = float(f_sub[idx])
        psd_peak = float(psd_sub[idx])

        best_match = None
        best_dev = float("inf")
        best_rank = (float("inf"), float("inf"))  # (harmonic, T_edrx)
        for f_edrx, T in edrx_fundamentals.items():
            for harmonic in range(1, 20):
                f_harm = f_edrx * harmonic
                dev = abs(f_peak - f_harm) / f_harm if f_harm > 0 else float("inf")
                rank = (harmonic, T)
                if dev < best_dev - 1e-4 or (dev < best_dev + 1e-4 and rank < best_rank):
                    best_dev = dev
                    best_rank = rank
                    best_match = {
                        "T_edrx": T,
                        "harmonic": harmonic,
                        "f_expected_hz": round(f_harm, 6),
                        "deviation_pct": round(dev * 100, 2),
                    }

        in_r42 = R42_LOW_HZ <= f_peak <= R42_HIGH_HZ

        peaks.append({
            "freq_hz": round(f_peak, 6),
            "freq_mhz": round(f_peak * 1000, 3),
            "psd_db": round(float(psd_db[idx]), 2),
            "prominence_db": round(float(properties["prominences"][i]), 2),
            "in_r42": in_r42,
            "edrx_match": best_match if best_dev < 0.05 else None,
        })

    peaks.sort(key=lambda p: -p["psd_db"])
    return peaks


# ── Plotting ─────────────────────────────────────────────────────────


def plot_envelope_psd(
    freqs: np.ndarray,
    psd: np.ndarray,
    xi_result: dict,
    peaks: list[dict] | None = None,
    title: str = "RF Envelope Power Spectral Density",
    save_path: str | Path | None = None,
    show: bool = True,
) -> None:
    """Plot PSD from 1 mHz to 1 Hz with R42 window overlay.

    Parameters
    ----------
    freqs, psd : from compute_psd
    xi_result : from xi_r42_from_psd
    peaks : from find_edrx_peaks (optional)
    title : plot title
    save_path : if given, save figure to this path
    show : whether to call plt.show()
    """
    import matplotlib.pyplot as plt

    mask = (freqs >= 0.001) & (freqs <= 1.0)
    f_plot = freqs[mask] * 1000  # convert to mHz
    psd_plot = 10 * np.log10(np.maximum(psd[mask], 1e-30))

    fig, ax = plt.subplots(figsize=(12, 6))

    ax.plot(f_plot, psd_plot, color="#2563EB", linewidth=0.8, label="Envelope PSD")

    r42_f = np.linspace(R42_LOW_HZ, R42_HIGH_HZ, 200) * 1000
    r42_w = np.array([r42_window(f / 1000) for f in r42_f])
    psd_range = psd_plot.max() - psd_plot.min()
    r42_scaled = psd_plot.min() + r42_w * psd_range * 0.3
    ax.fill_between(r42_f, psd_plot.min(), r42_scaled, alpha=0.2, color="#10B981", label="R42 window")
    ax.axvline(R42_CENTER_HZ * 1000, color="#10B981", linestyle="--", alpha=0.5, linewidth=0.8)

    if peaks:
        for p in peaks[:10]:
            f_mhz = p["freq_mhz"]
            if 1.0 <= f_mhz <= 1000.0:
                color = "#EF4444" if p["in_r42"] else "#F59E0B"
                marker = "v" if p["in_r42"] else "^"
                label_parts = [f'{f_mhz:.1f} mHz']
                if p["edrx_match"]:
                    m = p["edrx_match"]
                    label_parts.append(f'(eDRX {m["T_edrx"]}s h{m["harmonic"]})')
                ax.annotate(
                    " ".join(label_parts),
                    xy=(f_mhz, p["psd_db"]),
                    xytext=(0, 12),
                    textcoords="offset points",
                    fontsize=7,
                    color=color,
                    ha="center",
                    arrowprops=dict(arrowstyle="-", color=color, lw=0.5),
                )
                ax.plot(f_mhz, p["psd_db"], marker=marker, color=color, markersize=6, zorder=5)

    edrx_24_414 = 1000.0 / 40.96
    ax.axvline(edrx_24_414, color="#9CA3AF", linestyle=":", alpha=0.6, linewidth=0.8)
    ax.text(edrx_24_414 + 0.3, psd_plot.max() - psd_range * 0.05,
            f"eDRX 40.96s\n= {edrx_24_414:.1f} mHz", fontsize=7, color="#6B7280", va="top")

    xi_text = (
        f"Ξ_R42 = {xi_result['xi_r42']:.4e}\n"
        f"Band power = {xi_result['band_power']:.4e}\n"
        f"Δf = {xi_result.get('freq_resolution_mhz', '?')} mHz"
    )
    if xi_result.get("peak_freq_mhz"):
        xi_text += f"\nPeak in R42: {xi_result['peak_freq_mhz']} mHz"
    ax.text(0.98, 0.97, xi_text, transform=ax.transAxes, fontsize=8,
            va="top", ha="right", fontfamily="monospace",
            bbox=dict(boxstyle="round,pad=0.4", facecolor="white", edgecolor="#D1D5DB", alpha=0.9))

    ax.set_xlabel("Frequency (mHz)", fontsize=10)
    ax.set_ylabel("PSD (dB/Hz)", fontsize=10)
    ax.set_title(title, fontsize=12, fontweight="bold")
    ax.set_xscale("log")
    ax.set_xlim(1, 1000)
    ax.legend(loc="upper left", fontsize=8)
    ax.grid(True, alpha=0.3, which="both")

    fig.tight_layout()
    if save_path:
        fig.savefig(save_path, dpi=150, bbox_inches="tight")
    if show:
        plt.show()
    else:
        plt.close(fig)

    return fig


# ── Full pipeline ────────────────────────────────────────────────────


def analyze_envelope(
    iq: np.ndarray | None = None,
    fs: float = 1000.0,
    iq_path: str | Path | None = None,
    synthetic_kwargs: dict | None = None,
    plot: bool = True,
    save_plot: str | Path | None = None,
) -> dict:
    """Run the full envelope PSD analysis pipeline.

    Provide one of:
    - iq + fs : pre-loaded I/Q data
    - iq_path + fs : path to raw I/Q file
    - synthetic_kwargs : dict of args for generate_synthetic_edrx_signal

    Returns dict with PSD results, Ξ_R42, detected peaks, and
    eDRX comparison.
    """
    if iq is not None:
        pass
    elif iq_path is not None:
        iq, fs = load_iq_file(iq_path, fs)
    elif synthetic_kwargs is not None:
        iq, fs = generate_synthetic_edrx_signal(**synthetic_kwargs)
    else:
        iq, fs = generate_synthetic_edrx_signal()

    duration_s = len(iq) / fs

    power = envelope_power(iq)
    power_1hz, fs_1hz = downsample_to_1hz(power, fs, fs_out=1.0)
    freqs, psd = compute_psd(power_1hz, fs=fs_1hz)
    xi_result = xi_r42_from_psd(freqs, psd)
    peaks = find_edrx_peaks(freqs, psd)

    edrx_expected_f = 1.0 / 40.96
    edrx_peak = None
    for p in peaks:
        if abs(p["freq_hz"] - edrx_expected_f) / edrx_expected_f < 0.02:
            edrx_peak = p
            break

    result = {
        "duration_s": round(duration_s, 1),
        "n_samples_raw": len(iq),
        "fs_raw": fs,
        "n_samples_1hz": len(power_1hz),
        "xi_r42": xi_result,
        "peaks": peaks,
        "edrx_40_96_comparison": {
            "expected_freq_mhz": round(edrx_expected_f * 1000, 3),
            "detected": edrx_peak is not None,
            "detected_peak": edrx_peak,
        },
    }

    if plot:
        plot_envelope_psd(
            freqs, psd, xi_result, peaks,
            title=f"RF Envelope PSD ({duration_s/3600:.1f}h capture)",
            save_path=save_plot,
            show=save_plot is None,
        )

    return result


# ── CLI entry point ──────────────────────────────────────────────────


def main():
    """Run synthetic eDRX analysis and print results."""
    import json

    print("Generating synthetic eDRX signal (T=40.96s, PTW=33.28s, 2h)...")
    result = analyze_envelope(
        synthetic_kwargs={
            "T_edrx": 40.96,
            "ptw": 33.28,
            "duration_s": 7200.0,
            "fs_rf": 1000.0,
            "snr_db": 20.0,
        },
        plot=True,
    )

    print("\n=== Ξ_R42 Results ===")
    print(json.dumps(result["xi_r42"], indent=2))

    print(f"\n=== eDRX 40.96s (24.414 mHz) Detection ===")
    cmp = result["edrx_40_96_comparison"]
    print(f"Expected: {cmp['expected_freq_mhz']} mHz")
    print(f"Detected: {cmp['detected']}")
    if cmp["detected_peak"]:
        p = cmp["detected_peak"]
        print(f"  Peak at: {p['freq_mhz']} mHz ({p['psd_db']:.1f} dB)")
        print(f"  Prominence: {p['prominence_db']:.1f} dB")
        print(f"  In R42: {p['in_r42']}")

    print(f"\n=== Top 5 Peaks ===")
    for p in result["peaks"][:5]:
        r42_flag = " [R42]" if p["in_r42"] else ""
        edrx_flag = ""
        if p["edrx_match"]:
            m = p["edrx_match"]
            edrx_flag = f" (eDRX {m['T_edrx']}s h{m['harmonic']}, Δ={m['deviation_pct']}%)"
        print(f"  {p['freq_mhz']:8.3f} mHz  {p['psd_db']:+.1f} dB  prom={p['prominence_db']:.1f} dB{r42_flag}{edrx_flag}")


if __name__ == "__main__":
    main()
