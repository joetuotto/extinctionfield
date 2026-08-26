import { AlertTriangle } from "lucide-react";

export function CautionBox({
  children,
  locale = "en",
}: {
  children: React.ReactNode;
  locale?: string;
}) {
  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-5 mb-8">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-sm leading-relaxed text-foreground-muted">
          {children}
        </div>
      </div>
    </div>
  );
}
