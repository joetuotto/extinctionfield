export const PATHWAY_ORDER = ["A", "A_mitotic", "B", "C", "D", "E", "F", "T", "RW", "BS", "PV", "S", "SE", "EHS", "H", "theory"] as const;

export const CHANNEL_GROUPS = {
  en: [
    { channel: "ELF", band: "f < 300 Hz", color: "border-blue-500/50", fda: "PEMF / TMS / VNS", pathways: ["B", "D"], desc: "CRY radical-pair (B) and HPA→HPG (D) via H(f) low-pass filter" },
    { channel: "IF", band: "300 Hz – 1 MHz", color: "border-orange-500/50", fda: "TTFields (Optune)", pathways: ["A_mitotic"], desc: "Intracellular via IFO-VGIC and DEP on mitotic spindle" },
    { channel: "RF", band: "> 1 MHz", color: "border-red-500/50", fda: "PRF / Diathermy", pathways: ["A", "B", "D"], desc: "VGCC/ROS (A), CRY radical-pair spin chemistry (B) and HPA→HPG (D)" },
  ],
  fi: [
    { channel: "ELF", band: "f < 300 Hz", color: "border-blue-500/50", fda: "PEMF / TMS / VNS", pathways: ["B", "D"], desc: "CRY-radikaalipari (B) ja HPA→HPG (D) H(f)-alipäästösuodattimen kautta" },
    { channel: "IF", band: "300 Hz – 1 MHz", color: "border-orange-500/50", fda: "TTFields (Optune)", pathways: ["A_mitotic"], desc: "Solunsisäinen IFO-VGIC:n ja DEP:n kautta mitoottiseen karaan" },
    { channel: "RF", band: "> 1 MHz", color: "border-red-500/50", fda: "PRF / Diatermia", pathways: ["A", "B", "D"], desc: "VGCC/ROS (A), CRY:n radikaaliparin spin-kemia (B) ja HPA→HPG (D)" },
  ],
} as const;
