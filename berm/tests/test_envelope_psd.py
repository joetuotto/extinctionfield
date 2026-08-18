"""Tests for envelope PSD analysis pipeline."""

import math
import numpy as np
import pytest

from berm.physics.envelope_psd import (
    generate_synthetic_edrx_signal,
    envelope_power,
    downsample_to_1hz,
    compute_psd,
    xi_r42_from_psd,
    find_edrx_peaks,
    analyze_envelope,
    load_iq_file,
)
from berm.physics.r42_envelope import R42_LOW_HZ, R42_HIGH_HZ, R42_CENTER_HZ


class TestSyntheticSignal:
    def test_returns_complex64(self):
        iq, fs = generate_synthetic_edrx_signal(duration_s=100.0, fs_rf=100.0)
        assert iq.dtype == np.complex64

    def test_correct_length(self):
        iq, fs = generate_synthetic_edrx_signal(duration_s=200.0, fs_rf=100.0)
        assert len(iq) == 20000
        assert fs == 100.0

    def test_deterministic_with_seed(self):
        iq1, _ = generate_synthetic_edrx_signal(seed=123, duration_s=100.0, fs_rf=100.0)
        iq2, _ = generate_synthetic_edrx_signal(seed=123, duration_s=100.0, fs_rf=100.0)
        np.testing.assert_array_equal(iq1, iq2)

    def test_different_seeds_differ(self):
        iq1, _ = generate_synthetic_edrx_signal(seed=1, duration_s=100.0, fs_rf=100.0)
        iq2, _ = generate_synthetic_edrx_signal(seed=2, duration_s=100.0, fs_rf=100.0)
        assert not np.array_equal(iq1, iq2)

    def test_has_periodic_structure(self):
        T_edrx = 40.96
        iq, fs = generate_synthetic_edrx_signal(
            T_edrx=T_edrx, ptw=10.0, duration_s=500.0, fs_rf=100.0, snr_db=40.0,
        )
        power = np.abs(iq) ** 2
        power_1hz = power.reshape(-1, int(fs)).mean(axis=1)
        autocorr = np.correlate(power_1hz - power_1hz.mean(), power_1hz - power_1hz.mean(), mode="full")
        autocorr = autocorr[len(autocorr) // 2:]
        lag_samples = int(T_edrx)
        peak_region = autocorr[lag_samples - 2 : lag_samples + 3]
        assert np.max(peak_region) > autocorr[lag_samples // 2]


class TestEnvelopePower:
    def test_real_signal(self):
        x = np.array([1 + 0j, 2 + 0j, 3 + 0j], dtype=np.complex64)
        p = envelope_power(x)
        np.testing.assert_allclose(p, [1, 4, 9], atol=1e-5)

    def test_complex_signal(self):
        x = np.array([1 + 1j, 0 + 2j], dtype=np.complex64)
        p = envelope_power(x)
        np.testing.assert_allclose(p, [2, 4], atol=1e-5)

    def test_zero_signal(self):
        x = np.zeros(10, dtype=np.complex64)
        p = envelope_power(x)
        assert np.all(p == 0)


class TestDownsample:
    def test_basic_decimation(self):
        power = np.ones(1000, dtype=np.float32)
        down, fs_out = downsample_to_1hz(power, fs_in=100.0)
        assert len(down) == pytest.approx(10, abs=2)
        assert fs_out == pytest.approx(1.0, abs=0.01)

    def test_no_decimation_needed(self):
        power = np.ones(100, dtype=np.float32)
        down, fs_out = downsample_to_1hz(power, fs_in=1.0)
        assert len(down) == 100
        assert fs_out == 1.0


class TestComputePSD:
    def test_returns_freq_and_psd(self):
        data = np.random.randn(3600).astype(np.float32)
        freqs, psd = compute_psd(data, fs=1.0)
        assert len(freqs) == len(psd)
        assert freqs[0] == 0.0
        assert all(psd >= 0)

    def test_frequency_range(self):
        data = np.random.randn(7200).astype(np.float32)
        freqs, psd = compute_psd(data, fs=1.0)
        assert freqs[-1] <= 0.5
        df = freqs[1] - freqs[0]
        assert df < 0.001


class TestXiR42FromPSD:
    def test_flat_spectrum(self):
        freqs = np.linspace(0, 0.5, 10000)
        psd = np.ones_like(freqs)
        result = xi_r42_from_psd(freqs, psd)
        assert result["xi_r42"] > 0
        assert result["band_power"] > 0
        assert result["n_bins_in_r42"] > 0

    def test_peak_in_r42(self):
        freqs = np.linspace(0, 0.5, 10000)
        psd = np.ones_like(freqs) * 0.01
        r42_mask = (freqs >= R42_LOW_HZ) & (freqs <= R42_HIGH_HZ)
        psd[r42_mask] = 100.0
        result = xi_r42_from_psd(freqs, psd)
        assert result["xi_r42"] > 0.1
        assert result["peak_freq_hz"] is not None
        assert R42_LOW_HZ <= result["peak_freq_hz"] <= R42_HIGH_HZ

    def test_no_bins_in_r42(self):
        freqs = np.linspace(0.1, 0.5, 1000)
        psd = np.ones_like(freqs)
        result = xi_r42_from_psd(freqs, psd)
        assert result["xi_r42"] == 0.0
        assert result["n_bins_in_r42"] == 0


class TestFindEdrxPeaks:
    def test_finds_peaks_in_synthetic(self):
        iq, fs = generate_synthetic_edrx_signal(
            T_edrx=40.96, duration_s=3600.0, fs_rf=100.0, snr_db=30.0,
        )
        power = envelope_power(iq)
        power_1hz, fs_1hz = downsample_to_1hz(power, fs)
        freqs, psd = compute_psd(power_1hz, fs_1hz)
        peaks = find_edrx_peaks(freqs, psd)
        assert len(peaks) > 0

    def test_strongest_peak_near_edrx_fundamental(self):
        iq, fs = generate_synthetic_edrx_signal(
            T_edrx=40.96, duration_s=7200.0, fs_rf=1000.0, snr_db=20.0,
        )
        power = envelope_power(iq)
        power_1hz, fs_1hz = downsample_to_1hz(power, fs)
        freqs, psd = compute_psd(power_1hz, fs_1hz)
        peaks = find_edrx_peaks(freqs, psd)
        top = peaks[0]
        expected_f = 1000.0 / 40.96
        assert abs(top["freq_mhz"] - expected_f) < 1.0


class TestFullPipeline:
    def test_synthetic_default(self):
        result = analyze_envelope(plot=False)
        assert "xi_r42" in result
        assert "peaks" in result
        assert "edrx_40_96_comparison" in result
        assert result["duration_s"] > 0

    def test_edrx_detected(self):
        result = analyze_envelope(
            synthetic_kwargs={
                "T_edrx": 40.96, "ptw": 33.28,
                "duration_s": 7200.0, "fs_rf": 1000.0, "snr_db": 20.0,
            },
            plot=False,
        )
        assert result["edrx_40_96_comparison"]["detected"] is True

    def test_peak_in_r42_window(self):
        result = analyze_envelope(
            synthetic_kwargs={
                "T_edrx": 40.96, "ptw": 33.28,
                "duration_s": 7200.0, "fs_rf": 1000.0, "snr_db": 20.0,
            },
            plot=False,
        )
        peak_f = result["xi_r42"]["peak_freq_hz"]
        assert peak_f is not None
        assert R42_LOW_HZ <= peak_f <= R42_HIGH_HZ

    def test_xi_positive(self):
        result = analyze_envelope(plot=False)
        assert result["xi_r42"]["xi_r42"] > 0

    def test_custom_iq_input(self):
        iq, fs = generate_synthetic_edrx_signal(duration_s=1800.0, fs_rf=100.0)
        result = analyze_envelope(iq=iq, fs=fs, plot=False)
        assert result["n_samples_raw"] == len(iq)
        assert result["fs_raw"] == fs


class TestLoadIQFile:
    def test_load_file(self, tmp_path):
        iq = np.array([1 + 2j, 3 + 4j, 5 + 6j], dtype=np.complex64)
        path = tmp_path / "test.iq"
        iq.tofile(str(path))
        loaded, fs = load_iq_file(path, fs=1000.0)
        np.testing.assert_array_equal(loaded, iq)
        assert fs == 1000.0

    def test_max_samples(self, tmp_path):
        iq = np.ones(100, dtype=np.complex64)
        path = tmp_path / "test.iq"
        iq.tofile(str(path))
        loaded, fs = load_iq_file(path, fs=1000.0, max_samples=10)
        assert len(loaded) == 10
