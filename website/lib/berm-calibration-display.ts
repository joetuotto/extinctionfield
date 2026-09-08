import { parseBermEndpointDisplay } from "./berm-endpoint-display";

const HISTORY_KEYS = new Set(["ep_halfLife", "ep_annualWeight", "ep_historyWeight", "ep_initial", "ep_initialStock", "ep_baseF"]);

/** A calibration reference contains inputs and kernels, never a visible time crop or fitted gain. */
export function calibrationInputQuery(params: URLSearchParams): string {
  const result = new URLSearchParams();
  for (const [key, value] of params) {
    if ((key.startsWith("s_") && key !== "s_beta") || HISTORY_KEYS.has(key)) result.set(key, value);
  }
  result.sort();
  return result.toString();
}

export function parseBermCalibrationDisplay(params: URLSearchParams) {
  const referenceQuery = calibrationInputQuery(new URLSearchParams(params.get("ep_reference") ?? ""));
  const referenceParams = new URLSearchParams(referenceQuery);
  const year = (key: string, fallback: number | null) => {
    const raw=params.get(key); if(raw===null||raw.trim()==="")return fallback;
    const value=Number(raw);return Number.isInteger(value)&&value>=1950&&value<=2023?value:fallback;
  };
  return {
    referenceQuery, referenceParams, reference:parseBermEndpointDisplay(referenceParams),
    throughF:year("ep_throughF",2000)!, throughT:year("ep_throughT",null),
    showInputHistory:params.get("ep_inputs")!=="0",
  };
}
