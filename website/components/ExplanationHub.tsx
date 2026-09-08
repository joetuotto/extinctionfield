import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { TranslationNotice } from "@/components/TranslationNotice";
import { ModelReadingPath } from "@/components/ModelReadingPath";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const PATH_COPY = {
  en: { label: "One explanatory chain", stages: ["Model", "Physics", "Biology", "Behavior", "Civilization"], evidence: "See how the evidence connects", onPage: "On this page", from: "What enters this level", to: "What carries forward", studies: "Measured connections", implication: "What BERM draws from this", deeper: "Explore the connected explanations", next: "Continue the explanation" },
  fi: { label: "Yksi selitysketju", stages: ["Malli", "Fysiikka", "Biologia", "Käyttäytyminen", "Sivilisaatio"], evidence: "Katso miten tutkimusnäyttö yhdistyy", onPage: "Tällä sivulla", from: "Mitä tälle tasolle tulee", to: "Mitä seuraavalle tasolle siirtyy", studies: "Mitatut yhteydet", implication: "Mitä BERM tästä päättelee", deeper: "Syvenny yhdistyviin selityksiin", next: "Jatka selitysketjua" },
  ja: { label: "一つの説明の連鎖", stages: ["モデル", "物理学", "生物学", "行動", "文明"], evidence: "証拠のつながりを見る", onPage: "このページ", from: "この段階への入力", to: "次の段階への出力", studies: "測定された関係", implication: "BERMによる推論", deeper: "関連する説明", next: "説明を続ける" },
  fr: { label: "Une chaîne explicative", stages: ["Modèle", "Physique", "Biologie", "Comportement", "Civilisation"], evidence: "Voir les liens entre les preuves", onPage: "Sur cette page", from: "Ce qui entre à ce niveau", to: "Ce qui se transmet", studies: "Relations mesurées", implication: "Ce que BERM en déduit", deeper: "Explorer les explications liées", next: "Poursuivre l’explication" },
  ko: { label: "하나의 설명 사슬", stages: ["모델", "물리학", "생물학", "행동", "문명"], evidence: "연구 증거의 연결 보기", onPage: "이 페이지", from: "이 단계의 입력", to: "다음 단계의 출력", studies: "측정된 연결", implication: "BERM의 추론", deeper: "연결된 설명 살펴보기", next: "설명 계속하기" },
} as const;

export type ExplanationStage = "model" | "physics" | "biology" | "behavior" | "civilization" | "convergence";

export function ExplanationText({ children, locale }: { children: string; locale: string }) {
  return <p className="text-base leading-7 text-foreground-muted"><InlineReferenceText text={children} locale={locale} /></p>;
}

export function ExplanationHub({ locale, copy, title, subtitle, lead, icon, stage, incoming, outgoing, contents, links, next, children }: {
  locale: string;
  copy: Record<string, unknown>;
  title: string;
  subtitle: string;
  lead: string;
  icon: LucideIcon;
  stage: ExplanationStage;
  incoming: string;
  outgoing: string;
  contents: ReadonlyArray<{ id: string; title: string }>;
  links: ReadonlyArray<{ href: string; title: string; description: string }>;
  next: { href: string; title: string; description: string };
  children: ReactNode;
}) {
  const d = pickCopy(PATH_COPY, locale) as typeof PATH_COPY.en;
  return (
    <article>
      <TranslationNotice copy={copy} locale={locale} />
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <div className="mb-10 border-b editorial-rule pb-5">
          <ModelReadingPath locale={locale} current={stage === "convergence" ? undefined : stage} />
          {stage !== "convergence" && <Link href={`/${locale}/evidence/convergence`} className="mt-4 inline-flex items-center gap-2 text-xs text-accent hover:underline">{d.evidence}<ArrowRight size={12} aria-hidden="true" /></Link>}
        </div>
        <PageHeader icon={icon} title={title} subtitle={subtitle} />
        <p className="mb-9 max-w-4xl text-lg leading-8 sm:text-xl"><InlineReferenceText text={lead} locale={locale} /></p>
        <div className="mb-10 grid gap-px overflow-hidden rounded-lg border border-card-border bg-card-border sm:grid-cols-2">
          {[{ label: d.from, text: incoming }, { label: d.to, text: outgoing }].map((item) => <div key={item.label} className="bg-background p-5 sm:p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">{item.label}</p>
            <p className="text-sm leading-6">{item.text}</p>
          </div>)}
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-14">
          <nav aria-label={d.onPage} className="lg:sticky lg:top-[calc(var(--site-header-height,4rem)+1rem)] lg:max-h-[calc(100dvh-var(--site-header-height,4rem)-2rem)] lg:overflow-y-auto lg:overscroll-contain">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground-muted">{d.onPage}</p>
            <ol className="grid gap-1 border-l border-card-border text-sm sm:grid-cols-2 lg:grid-cols-1">
              {contents.map((item, i) => <li key={item.id}><a href={`#${item.id}`} className="block px-4 py-2 leading-5 text-foreground-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"><span className="mr-2 text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>{item.title}</a></li>)}
            </ol>
          </nav>
          <div className="min-w-0 space-y-12">{children}</div>
        </div>
        <section className="mt-16 border-t editorial-rule pt-8">
          <h2 className="editorial-section-heading mb-6">{d.deeper}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => <Link key={link.href} href={`/${locale}${link.href}`} className="group rounded-lg border border-card-border p-5 transition-colors hover:border-accent/60 hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent">
              <h3 className="mb-2 flex items-center justify-between gap-3 text-base font-semibold">{link.title}<ArrowRight size={15} className="shrink-0 text-accent transition-transform group-hover:translate-x-1" aria-hidden="true" /></h3>
              <p className="text-sm leading-6 text-foreground-muted">{link.description}</p>
            </Link>)}
          </div>
        </section>
        <Link href={`/${locale}${next.href}`} className="group mt-10 flex items-center justify-between gap-5 rounded-lg border border-accent/30 bg-accent/5 p-6 sm:p-8 focus-visible:outline-2 focus-visible:outline-accent">
          <div><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{d.next}</p><h2 className="mb-2 text-xl sm:text-2xl">{next.title}</h2><p className="max-w-3xl text-sm leading-6 text-foreground-muted">{next.description}</p></div>
          <ArrowRight className="shrink-0 text-accent transition-transform group-hover:translate-x-1" size={25} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function ExplanationSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="scroll-mt-28 space-y-5 border-t editorial-rule pt-7 first:border-t-0 first:pt-0"><h2 className="editorial-section-heading">{title}</h2>{children}</section>;
}

export function ResearchConnection({ locale, studies, implication, children }: { locale: string; studies: string; implication: string; children?: ReactNode }) {
  const d = pickCopy(PATH_COPY, locale) as typeof PATH_COPY.en;
  return <div className="space-y-5 rounded-lg border border-card-border bg-card/30 p-5 sm:p-6">
    <div><h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">{d.studies}</h3><ExplanationText locale={locale}>{studies}</ExplanationText></div>
    <div className="border-l-2 border-accent/60 pl-4"><h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{d.implication}</h3><p className="text-base leading-7"><InlineReferenceText text={implication} locale={locale} /></p>{children}</div>
  </div>;
}
