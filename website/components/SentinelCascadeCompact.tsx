"use client";

import { BermIcon } from "@/components/BermIcon";
import type { BermIconName } from "@/components/BermIcon";
import { pickCopy } from "@/lib/i18n";

const TOP_SPECIES: { icon: BermIconName; name: Record<string, string>; lag: number; stat: string; r: number }[] = [
  { icon: "honeybee", name: { en: "Honeybee", fi: "Mehiläinen", ja: "ミツバチ", fr: "Abeille", ko: "꿀벌" }, lag: 2, stat: "20/23", r: 0.27 },
  { icon: "bird", name: { en: "Bird", fi: "Lintu", ja: "鳥類", fr: "Oiseau", ko: "조류" }, lag: 2.5, stat: "21/27", r: 0.18 },
  { icon: "toad", name: { en: "Frog", fi: "Sammakko", ja: "カエル", fr: "Grenouille", ko: "개구리" }, lag: 6, stat: "UK", r: 0.36 },
];

const COPY = {
  en: {
    heading: "Sentinel cascade: species declines precede humans",
    human: "Human",
    yearSuffix: "y",
    footnote: "12 species tracked across land, water, and transitional axes. EMF gradient: r = 0.909 across 7 species with quantifiable reproductive decline rates vs EMF exposure score.",
  },
  fi: {
    heading: "Sentinellikaskadi: lajien laskut edeltävät ihmistä",
    human: "Ihminen",
    yearSuffix: "v",
    footnote: "12 lajia seurannassa maa-, vesi- ja siirtymäakseleilla. EMF-gradientti: r = 0,909 seitsemässä lajissa, joilla on kvantifioitava lisääntymislaskuaste vs. EMF-altistusarvo.",
  },
  ja: {
    heading: "センチネルカスケード：種の減少はヒトに先行する",
    human: "ヒト",
    yearSuffix: "年",
    footnote: "陸上・水中・遷移軸にわたる12種を追跡。EMF勾配：定量可能な生殖低下率 vs EMF曝露スコアで7種にわたりr = 0.909。",
  },
  fr: {
    heading: "Cascade sentinelle : le déclin des espèces précède l'humain",
    human: "Humain",
    yearSuffix: "a",
    footnote: "12 espèces suivies sur les axes terrestre, aquatique et transitionnel. Gradient EMF : r = 0,909 sur 7 espèces avec taux de déclin reproductif quantifiable vs score d'exposition EMF.",
  },
  ko: {
    heading: "감시종 연쇄: 종의 감소가 인간보다 선행",
    human: "인간",
    yearSuffix: "년",
    footnote: "육상·수중·전환 축에 걸쳐 12종 추적. EMF 기울기: 정량 가능한 생식 감소율 vs EMF 노출 점수로 7종에 걸쳐 r = 0.909.",
  },
} as const;

export function SentinelCascadeCompact({ locale = "en" }: { locale?: string }) {
  const d = pickCopy(COPY, locale);
  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5">
      <p className="text-sm font-semibold mb-3">
        {d.heading}
      </p>

      <div className="space-y-2">
        {TOP_SPECIES.map((sp) => (
          <div key={sp.name.en} className="flex items-center gap-3">
            <BermIcon name={sp.icon} size={16} className="text-accent/60 shrink-0" />
            <span className="text-sm text-foreground-muted w-24 shrink-0">
              {pickCopy(sp.name, locale)}
            </span>
            <div className="flex-1 h-2 bg-background-secondary rounded-full relative">
              <div
                className="h-2 bg-accent/50 rounded-full"
                style={{ width: `${(sp.lag / 7) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono-num text-foreground-muted w-10 text-right shrink-0">
              +{sp.lag}{d.yearSuffix}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-3 pt-2 border-t border-card-border">
          <BermIcon name="human" size={16} className="text-status-confirmed shrink-0" />
          <span className="text-sm text-status-confirmed font-medium w-24 shrink-0">
            {d.human}
          </span>
          <div className="flex-1 h-2 bg-background-secondary rounded-full relative">
            <div className="h-2 bg-status-confirmed/50 rounded-full w-full" />
          </div>
          <span className="text-xs font-mono-num text-status-confirmed w-10 text-right shrink-0">
            TFR↓
          </span>
        </div>
      </div>

      <p className="text-xs text-foreground-muted mt-3">
        {d.footnote}
      </p>
    </div>
  );
}
