import type { EpistemicLevel } from "@/lib/types";
import {
  CHAIN_EPISTEMIC_COLORS as EPISTEMIC_COLORS,
  CHAIN_EPISTEMIC_LABELS as EPISTEMIC_LABELS,
} from "@/lib/epistemicConstants";

export function EpistemicBadge({
  level,
  size = "sm",
}: {
  level: EpistemicLevel;
  size?: "sm" | "lg";
}) {
  const color = EPISTEMIC_COLORS[level];
  const label = EPISTEMIC_LABELS[level];
  const px = size === "lg" ? "px-3 py-1.5 text-xs" : "px-2 py-0.5 text-[10px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${px}`}
      style={{
        backgroundColor: `${color}18`,
        color: color,
        border: `1px solid ${color}40`,
      }}
      title={label}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {level}
    </span>
  );
}
