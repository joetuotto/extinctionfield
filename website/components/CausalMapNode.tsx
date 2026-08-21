"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { EpistemicLevel } from "@/lib/causalMapData";
import { EPISTEMIC_COLORS } from "@/lib/causalMapData";

export interface CausalNodeData {
  label: string;
  sublabel?: string;
  color?: string;
  epistemicLevel: EpistemicLevel;
  level: number;
  [key: string]: unknown;
}

function CausalMapNode({ data, selected }: NodeProps) {
  const d = data as CausalNodeData;
  const borderColor = d.color || EPISTEMIC_COLORS[d.epistemicLevel] || "#6B7280";

  return (
    <div
      className={`
        relative px-3 py-2 rounded-lg border-2 bg-[var(--card-bg,#1a1a2e)]
        transition-shadow cursor-pointer min-w-[120px] max-w-[180px] text-center
        ${selected ? "shadow-lg shadow-accent/30 ring-2 ring-accent" : "hover:shadow-md"}
      `}
      style={{ borderColor }}
    >
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-foreground-muted/40 !border-0" />
      <div
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
        style={{ backgroundColor: EPISTEMIC_COLORS[d.epistemicLevel] }}
        title={d.epistemicLevel}
      >
        {d.epistemicLevel === "M|C" ? "M" : d.epistemicLevel}
      </div>
      <p className="text-xs font-semibold leading-tight text-foreground">{d.label}</p>
      {d.sublabel && (
        <p className="text-[10px] text-foreground-muted mt-0.5 leading-tight">{d.sublabel}</p>
      )}
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-foreground-muted/40 !border-0" />
    </div>
  );
}

export default memo(CausalMapNode);
