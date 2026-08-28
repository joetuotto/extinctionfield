import type { LockedPrediction } from "@/lib/types";
import { pickCopy } from "@/lib/i18n";

const STATUS_COPY: Record<
  LockedPrediction["status"],
  { label: { en: string; fi: string; ja: string; fr: string; ko: string }; className: string }
> = {
  pending: {
    label: { en: "Pending", fi: "Odottaa", ja: "未確認", fr: "En attente", ko: "보류" },
    className: "border-status-pending/40 bg-status-pending/10 text-status-pending",
  },
  confirmed: {
    label: { en: "Confirmed", fi: "Vahvistettu", ja: "確認済み", fr: "Confirmé", ko: "확인됨" },
    className: "border-status-confirmed/40 bg-status-confirmed/10 text-status-confirmed",
  },
  refuted: {
    label: { en: "Refuted", fi: "Kumottu", ja: "反証済み", fr: "Réfuté", ko: "반증됨" },
    className: "border-status-refuted/40 bg-status-refuted/10 text-status-refuted",
  },
  partial: {
    label: { en: "Partial", fi: "Osittainen", ja: "部分的", fr: "Partiel", ko: "부분적" },
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
      {pickCopy(s.label, locale)}
    </span>
  );
}
