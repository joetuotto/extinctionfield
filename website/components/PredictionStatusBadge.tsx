import type { LockedPrediction } from "@/lib/types";

const STATUS_COPY: Record<
  LockedPrediction["status"],
  { en: string; fi: string; className: string }
> = {
  pending: {
    en: "Pending",
    fi: "Odottaa",
    className: "border-status-pending/40 bg-status-pending/10 text-status-pending",
  },
  confirmed: {
    en: "Confirmed",
    fi: "Vahvistettu",
    className: "border-status-confirmed/40 bg-status-confirmed/10 text-status-confirmed",
  },
  refuted: {
    en: "Refuted",
    fi: "Kumottu",
    className: "border-status-refuted/40 bg-status-refuted/10 text-status-refuted",
  },
  partial: {
    en: "Partial",
    fi: "Osittainen",
    className: "border-status-partial/40 bg-status-partial/10 text-status-partial",
  },
};

export function PredictionStatusBadge({
  status,
  locale,
}: {
  status: LockedPrediction["status"];
  locale: string;
}) {
  const s = STATUS_COPY[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium ${s.className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {locale === "fi" ? s.fi : s.en}
    </span>
  );
}
