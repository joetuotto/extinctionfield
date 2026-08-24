"use client";

import { memo, useCallback } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { EVIDENCE_COLORS, type EpistemicLevel } from "@/lib/causalAtlasData";

export interface AtlasNodeData {
  label: string;
  sublabel?: string;
  epistemicLevel: EpistemicLevel;
  epistemicLabel: string;
  stageAccent: string;
  highlighted: boolean;
  dimmed: boolean;
  nodeId: string;
  onActivate?: (nodeId: string, element: HTMLElement) => void;
  [key: string]: unknown;
}

function AtlasNode({ data, selected }: NodeProps) {
  const d = data as AtlasNodeData;
  const epColor = EVIDENCE_COLORS[d.epistemicLevel] || "#6B7280";
  const accent = d.stageAccent || "#6B7280";

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      d.onActivate?.(d.nodeId, e.currentTarget);
    }
  }, [d]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    d.onActivate?.(d.nodeId, e.currentTarget);
  }, [d]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${d.label}${d.sublabel ? `, ${d.sublabel}` : ""}, ${d.epistemicLabel}`}
      aria-expanded={selected || undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        relative rounded-lg border bg-[#12122a] transition-all duration-200
        min-w-[140px] max-w-[170px] px-2.5 py-2 text-left cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a1a]
        ${d.dimmed ? "opacity-20 pointer-events-none" : ""}
        ${d.highlighted ? "ring-1 ring-blue-400/50 shadow-[0_0_12px_rgba(96,165,250,0.25)]" : ""}
        ${selected ? "ring-2 ring-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.35)]" : ""}
        ${!d.dimmed && !selected ? "hover:shadow-[0_0_10px_rgba(255,255,255,0.08)]" : ""}
      `}
      style={{ borderColor: d.dimmed ? "#ffffff10" : `${accent}50` }}
    >
      <Handle type="target" position={Position.Left} className="!w-0 !h-0 !min-w-0 !min-h-0 !border-0 !bg-transparent" tabIndex={-1} />

      <div
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center text-white shadow-sm"
        style={{ backgroundColor: epColor }}
        aria-hidden="true"
      >
        {d.epistemicLevel === "M|C" ? "M" : d.epistemicLevel}
      </div>

      <p className="text-[11px] font-semibold leading-tight text-gray-100 pr-3">{d.label}</p>
      {d.sublabel && (
        <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{d.sublabel}</p>
      )}

      <Handle type="source" position={Position.Right} className="!w-0 !h-0 !min-w-0 !min-h-0 !border-0 !bg-transparent" tabIndex={-1} />
    </div>
  );
}

export default memo(AtlasNode);
