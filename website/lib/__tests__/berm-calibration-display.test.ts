import { describe, expect, it } from "vitest";
import { calibrationInputQuery, parseBermCalibrationDisplay } from "../berm-calibration-display";

describe("locked BERM calibration URL state", () => {
  it("freezes source and history assumptions but excludes the crop, outcomes, fit cutoff and gains", () => {
    const params = new URLSearchParams("country=FIN&from=1990&to=2010&year=2002&forecast=1&ep_mode=annual&ep_fit=data&ep_throughT=2002&ep_throughF=2000&ep_betaT=.8&ep_betaF=.7&s_beta=.6&s_amp_electric-grid=.5&s_mapping=linear&s_timing=late&s_edges=unknown&s_off=smart-metering&ep_halfLife=30&ep_initial=unknown&ep_initialStock=12&ep_annualWeight=.7&ep_historyWeight=.03&ep_baseF=1960");
    const query = calibrationInputQuery(params);
    const frozen = new URLSearchParams(query);
    expect(Object.fromEntries(frozen)).toEqual({
      "s_amp_electric-grid": ".5", s_mapping: "linear", s_timing: "late", s_edges: "unknown", s_off: "smart-metering",
      ep_halfLife: "30", ep_initial: "unknown", ep_initialStock: "12", ep_annualWeight: ".7", ep_historyWeight: ".03", ep_baseF: "1960",
    });
    expect([...frozen.keys()]).toEqual([...frozen.keys()].sort());
    expect(params.get("country")).toBe("FIN");
    expect(params.get("s_beta")).toBe(".6");
    expect(calibrationInputQuery(new URLSearchParams(query))).toBe(query);
  });

  it("preserves alternative source selection and explicit singleton permission in the reference", () => {
    const query = "s_driver_smart-metering=fi_hourly_meter_coverage&s_single_smart-metering=1&s_mobile=generations&s_shared=1&s_angle_electric-grid=35&s_lagYears=4&s_memoryYears=8";
    const frozen = new URLSearchParams(calibrationInputQuery(new URLSearchParams(query)));
    expect(frozen.get("s_driver_smart-metering")).toBe("fi_hourly_meter_coverage");
    expect(frozen.get("s_single_smart-metering")).toBe("1");
    expect(frozen.get("s_mobile")).toBe("generations");
    expect(frozen.get("s_memoryYears")).toBe("8");
  });

  it("uses the frozen reference rather than newly changed source/kernel values", () => {
    const reference = new URLSearchParams("s_amp_electric-grid=.5&ep_halfLife=30&ep_initial=unknown&ep_baseF=1960");
    const params = new URLSearchParams("s_amp_electric-grid=1&ep_halfLife=5&ep_initial=assumed&ep_baseF=1950&from=2000&to=2010");
    params.set("ep_reference", reference.toString());
    const selected = parseBermCalibrationDisplay(params);
    expect(selected.referenceParams.get("s_amp_electric-grid")).toBe(".5");
    expect(selected.reference.parameters.halfLifeYears).toBe(30);
    expect(selected.reference.parameters.initialStock).toBeNull();
    expect(selected.reference.fertilityBaselineYear).toBe(1960);
    params.set("from", "2010"); params.set("to", "2023");
    expect(parseBermCalibrationDisplay(params).referenceQuery).toBe(selected.referenceQuery);
  });

  it("uses bounded defaults and does not invent a generic testosterone training cutoff", () => {
    const selected = parseBermCalibrationDisplay(new URLSearchParams());
    expect(selected.referenceQuery).toBe("");
    expect(selected.reference.parameters.halfLifeYears).toBe(20);
    expect(selected.throughF).toBe(2000);
    expect(selected.throughT).toBeNull();
    expect(selected.showInputHistory).toBe(true);
    for (const invalid of ["", " ", "NaN", "Infinity", "1949", "2024", "2000.5"]) {
      const value = parseBermCalibrationDisplay(new URLSearchParams({ ep_throughF: invalid, ep_throughT: invalid }));
      expect(value.throughF).toBe(2000);
      expect(value.throughT).toBeNull();
    }
    const valid = parseBermCalibrationDisplay(new URLSearchParams("ep_throughF=1990&ep_throughT=2016&ep_inputs=0"));
    expect(valid.throughF).toBe(1990);
    expect(valid.throughT).toBe(2016);
    expect(valid.showInputHistory).toBe(false);
  });

  it("strips nested display or fit parameters from a supplied reference", () => {
    const params = new URLSearchParams();
    params.set("ep_reference", "ep_reference=recursive&country=USA&ep_betaT=9000&forecast=0&ep_throughF=2023&s_lagYears=3");
    expect(parseBermCalibrationDisplay(params).referenceQuery).toBe("s_lagYears=3");
  });
});
