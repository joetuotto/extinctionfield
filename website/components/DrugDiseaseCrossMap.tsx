import Link from "next/link";
import { pickCopy } from "@/lib/i18n";
import { INTERVENTIONS, interventionHref, interventionText } from "@/lib/interventions";

const UI_COPY = {
  en: {
    title: "Interventions and what they test",
    subtitle: "Each link opens the shared experimental profile: measured result, protocol, sources and the next conditional test. These are mechanism comparisons, not a list of treatments for field exposure.",
    open: "Open experimental profile",
    fallback: "Profile descriptions are available in English and Finnish; English is shown here.",
  },
  fi: {
    title: "Interventiot ja niiden testikohteet",
    subtitle: "Jokainen linkki avaa yhteisen koeprofiilin: mitatun tuloksen, protokollan, lähteet ja seuraavan ehdollisen testin. Nämä ovat mekanismivertailuja, eivät kenttäaltistuksen hoitoluettelo.",
    open: "Avaa koeprofiili",
    fallback: "Profiilikuvaukset ovat saatavilla englanniksi ja suomeksi.",
  },
  ja: {
    title: "介入とその試験対象",
    subtitle: "各リンクは共通の実験プロファイルを開き、測定結果、条件、出典、次の条件付き試験を示す。機構の比較であり、電磁場曝露の治療一覧ではない。",
    open: "実験プロファイルを開く",
    fallback: "プロファイルの説明は英語・フィンランド語で提供され、ここでは英語を表示します。",
  },
  fr: {
    title: "Interventions et mécanismes testés",
    subtitle: "Chaque lien ouvre le profil expérimental commun : résultat mesuré, protocole, sources et prochain test conditionnel. Il s’agit de comparaisons mécanistiques, pas de traitements de l’exposition aux champs.",
    open: "Ouvrir le profil expérimental",
    fallback: "Les descriptions sont disponibles en anglais et en finnois ; l’anglais est affiché ici.",
  },
  ko: {
    title: "개입과 시험 대상",
    subtitle: "링크는 측정 결과, 프로토콜, 출처와 다음 조건부 시험을 담은 공통 실험 프로파일을 연다. 기전 비교이며 장 노출 치료 목록은 아니다.",
    open: "실험 프로파일 열기",
    fallback: "프로파일 설명은 영어와 핀란드어로 제공되며 여기에는 영어가 표시됩니다.",
  },
} as const;

export function DrugDiseaseCrossMap({ locale }: { locale: string }) {
  const copy = pickCopy(UI_COPY, locale);
  return (
    <section className="mt-10" aria-labelledby="drug-profile-links-title">
      <h3 id="drug-profile-links-title" className="text-lg font-semibold mb-1">{copy.title}</h3>
      <p className="text-sm text-foreground-muted mb-4 max-w-3xl">{copy.subtitle}</p>
      {locale !== "en" && locale !== "fi" && <p className="mb-4 text-xs text-foreground-muted">{copy.fallback}</p>}
      <ul className="grid gap-3 sm:grid-cols-2">
        {INTERVENTIONS.profiles.map((profile) => (
          <li key={profile.id} className="rounded-lg border border-card-border p-4">
            <Link className="inline-flex min-h-11 items-center text-sm font-medium text-accent hover:underline" href={interventionHref(locale, profile.id)} aria-label={`${copy.open}: ${interventionText(profile.title, locale)}`}>
              {interventionText(profile.title, locale)} →
            </Link>
            <p className="mt-2 text-xs leading-relaxed text-foreground-muted" lang={locale === "fi" ? "fi" : "en"}>{interventionText(profile.mechanism, locale)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
