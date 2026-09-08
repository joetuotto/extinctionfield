import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { buildSignalStructureExample, SignalStructureIllustration } from "../SignalStructureIllustration";

afterEach(cleanup);

describe("RMS-preserving synthetic signal", () => {
  it("keeps numerical RMS at one at every allowed duty, using the actual plotted samples", () => {
    for (let duty = 10; duty <= 100; duty += 10) {
      const sample = buildSignalStructureExample(duty);
      // A complete two-period sum; omit the repeated final endpoint.
      const points = sample.points.slice(0, -1);
      for (const key of ["continuous", "pulsed"] as const) {
        const mean = points.reduce((sum, p) => sum + p[key], 0) / points.length;
        const rms = Math.sqrt(points.reduce((sum, p) => sum + p[key] ** 2, 0) / points.length);
        expect(mean).toBeCloseTo(0, 12);
        expect(rms).toBeCloseTo(1, 12);
      }
      expect(Math.max(...points.map(p => Math.abs(p.pulsed)))).toBeCloseTo(Math.sqrt(200 / duty), 12);
      expect(sample.cyclesPerPeriod * sample.duty).toBeCloseTo(Math.round(sample.cyclesPerPeriod * sample.duty), 12);
    }
  });

  it("has identical waveforms at 100 percent and a larger peak with silent intervals at lower duty", () => {
    const continuous = buildSignalStructureExample(100);
    for (const p of continuous.points) expect(p.pulsed).toBeCloseTo(p.continuous, 12);
    const pulse = buildSignalStructureExample(20);
    expect(pulse.peak).toBeGreaterThan(Math.SQRT2);
    expect(pulse.points.filter(p => p.time % 1 >= .2).every(p => p.pulsed === 0)).toBe(true);
    // Same carrier zero-crossings throughout the active window.
    for (const p of pulse.points.filter(p => p.time % 1 < .2)) {
      expect(p.pulsed / pulse.peak).toBeCloseTo(p.continuous / Math.SQRT2, 12);
    }
  });

  it("rejects arbitrary partial-cycle gates instead of claiming an exact RMS identity", () => {
    for (const duty of [0, 1, 25, 105, NaN, Infinity]) expect(() => buildSignalStructureExample(duty)).toThrow(RangeError);
  });

  it("updates peaks and the pulsed waveform without changing RMS or the continuous trace", () => {
    const { container } = render(<SignalStructureIllustration locale="fi" />);
    const unchanged = container.querySelector('[data-signal="continuous"] path')!.getAttribute("d");
    const before = container.querySelector('[data-signal="pulsed"] path')!.getAttribute("d");
    fireEvent.change(screen.getByRole("slider"), { target: { value: "10" } });
    expect(container.querySelectorAll("[data-signal-rms]")).toHaveLength(2);
    for (const rms of container.querySelectorAll("[data-signal-rms]")) expect(rms).toHaveTextContent(/^1$/);
    expect(container.querySelector('[data-signal="pulsed"] [data-signal-peak]')).toHaveTextContent("4,47");
    expect(container.querySelector('[data-signal="continuous"] path')).toHaveAttribute("d", unchanged);
    expect(container.querySelector('[data-signal="pulsed"] path')!.getAttribute("d")).not.toBe(before);
    expect(screen.getByText(/Kuva ei laske reseptorivastetta/)).toBeVisible();
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
  });

  it("uses English for untranslated locales and keeps essential labels in HTML", () => {
    const { container } = render(<SignalStructureIllustration locale="ja" />);
    expect(screen.getByRole("heading", { name: "Same RMS, different time structure" })).toBeVisible();
    expect(screen.getByRole("slider")).toHaveAccessibleName(/Active share/);
    expect(container.querySelectorAll("svg text")).toHaveLength(0);
    expect(screen.getByText(/does not calculate a receptor response/)).toBeVisible();
  });
});
