import Link from "next/link";
import { pickCopy } from "@/lib/i18n";

const STEPS = ["model", "physics", "biology", "behavior", "civilization"] as const;
type ReadingStep = (typeof STEPS)[number];

const COPY = {
  en: { title: "Follow the explanation", labels: ["Model", "Physics", "Biology", "Behavior", "Civilization"] },
  fi: { title: "Seuraa selityksen etenemistä", labels: ["Malli", "Fysiikka", "Biologia", "Käyttäytyminen", "Sivilisaatio"] },
  ja: { title: "説明の流れをたどる", labels: ["モデル", "物理学", "生物学", "行動", "文明"] },
  fr: { title: "Suivre l’explication", labels: ["Modèle", "Physique", "Biologie", "Comportement", "Civilisation"] },
  ko: { title: "설명의 흐름", labels: ["모델", "물리학", "생물학", "행동", "문명"] },
};

export function ModelReadingPath({ locale, current }: { locale: string; current?: ReadingStep }) {
  const d = pickCopy(COPY, locale);
  return (
    <nav aria-label={d.title} className="my-8 border-y editorial-rule py-4">
      <p className="mb-3 text-xs font-semibold tracking-wide text-foreground-muted">{d.title}</p>
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        {STEPS.map((step, index) => (
          <li key={step} className="flex items-center gap-3">
            {index > 0 && <span aria-hidden="true" className="text-foreground-muted/60">→</span>}
            <Link href={`/${locale}/${step}`} aria-current={current === step ? "page" : undefined} className={current === step ? "font-semibold text-accent underline underline-offset-4" : "text-foreground-muted hover:text-accent hover:underline"}>
              {d.labels[index]}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
