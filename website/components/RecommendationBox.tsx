import { ShieldCheck } from "lucide-react";

export function RecommendationBox({
  title,
  preamble,
  items,
}: {
  title: string;
  preamble: string;
  items: string[];
}) {
  return (
    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-3">
        <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-foreground-muted leading-relaxed mb-4 ml-8">
        {preamble}
      </p>
      <ul className="space-y-2 ml-8">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm leading-relaxed text-foreground-muted pl-3 border-l-2 border-emerald-500/30"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
