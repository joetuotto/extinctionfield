import { describe, expect, it } from "vitest";

import { PREDICTION_ROUTE_ID } from "@/lib/modelArchitecture";
import { LOCKED_PREDICTIONS } from "@/lib/predictions";

describe("locked prediction provenance", () => {
  it("labels every locked output with a real route and input kind", () => {
    for (const prediction of LOCKED_PREDICTIONS) {
      expect(prediction.routeId).not.toBe("");
      expect(prediction.inputKind).not.toBe("");
      expect(prediction.fieldStateCalibrated).toBe(false);
    }
  });

  it("keeps all v17 outputs on the manifest's scalar-proxy route", () => {
    const v17 = LOCKED_PREDICTIONS.filter((prediction) =>
      prediction.modelVersion.startsWith("v17"),
    );

    expect(v17.length).toBeGreaterThan(0);
    expect(new Set(v17.map((prediction) => prediction.routeId))).toEqual(
      new Set([PREDICTION_ROUTE_ID]),
    );
    expect(new Set(v17.map((prediction) => prediction.inputKind))).toEqual(
      new Set(["national_technology_timing_proxy"]),
    );
  });
});
