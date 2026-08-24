export const PATHWAY_ORDER = ["A", "A_mitotic", "B", "C", "D", "E", "F", "T", "RW", "BS", "PV", "S", "SE", "EHS", "H", "theory"] as const;

export const CHANNEL_GROUPS = {
  en: [
    { channel: "ELF", band: "f < 1 kHz", color: "border-blue-500/50", fda: "PEMF / TMS / VNS", pathways: ["A", "D", "E", "F"], desc: "Membrane modulation via H(f) low-pass filter" },
    { channel: "IF", band: "1 kHz – 1 MHz", color: "border-orange-500/50", fda: "TTFields (Optune)", pathways: ["A_mitotic"], desc: "Intracellular via IFO-VGIC and DEP on mitotic spindle" },
    { channel: "RF", band: "> 1 MHz", color: "border-red-500/50", fda: "PRF / Diathermy", pathways: ["B"], desc: "Spin chemistry via CRY radical-pair mechanism" },
  ],
  fi: [
    { channel: "ELF", band: "f < 1 kHz", color: "border-blue-500/50", fda: "PEMF / TMS / VNS", pathways: ["A", "D", "E", "F"], desc: "Kalvomodulaatio H(f)-alipäästösuodattimen kautta" },
    { channel: "IF", band: "1 kHz – 1 MHz", color: "border-orange-500/50", fda: "TTFields (Optune)", pathways: ["A_mitotic"], desc: "Solunsisäinen IFO-VGIC:n ja DEP:n kautta mitoottiseen karaan" },
    { channel: "RF", band: "> 1 MHz", color: "border-red-500/50", fda: "PRF / Diatermia", pathways: ["B"], desc: "Spin-kemia CRY:n radikaaliparimekanismin kautta" },
  ],
} as const;
