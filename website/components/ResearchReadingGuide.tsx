import Link from "next/link";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    titles: { about: "How to read the model and its evidence", evidence: "From individual studies to the whole explanation", epistemology: "Reasoning and connections between studies" },
    leads: { about: "Follow the physical-to-civilizational explanation, then inspect how each transition is supported. These three questions keep the reading path and the role of a study clear.", evidence: "The convergence overview connects the studies through the quantities they measure and the transitions they support. This register retains the individual records and the extended catalogue for closer inspection.", epistemology: "This page explains the principles of inference and retains its research examples. The convergence overview brings the key connections together along the model’s explanatory chain; the About guide introduces the three reading questions." },
    axes: [
      { title: "Explanatory level", text: "Physics → biology → behavior → civilization locates the phenomenon in the model. It describes the order of explanation, not a ranking of certainty." },
      { title: "Origin of the conclusion", text: "Distinguish a stated premise, a consequence derived from it, a measured finding and a synthesis that connects several findings." },
      { title: "Role of the study", text: "Identify the measured link, study design and biological system. Then ask whether the result informs structure, direction, magnitude, timing or transfer to another setting." },
    ],
    convergence: "Evidence overview and convergence", epistemology: "Principles of inference", about: "Reading guide", design: "Study design", system: "Study system",
  },
  fi: {
    titles: { about: "Näin luet mallia ja näyttöä", evidence: "Yksittäisistä tutkimuksista kokonaiskuvaan", epistemology: "Päättely ja tutkimusten yhteydet" },
    leads: { about: "Seuraa selitystä fysiikasta sivilisaatioon ja tarkastele sitten kunkin siirtymän tutkimuspohjaa. Kolme kysymystä auttaa erottamaan lukupolun ja tutkimuksen tehtävän.", evidence: "Konvergenssikoonti yhdistää tutkimukset niiden mittaamien suureiden ja tukemien siirtymien kautta. Tämä rekisteri säilyttää yksittäiset tutkimustietueet ja laajennetun katalogin tarkempaa lukemista varten.", epistemology: "Tämä sivu kuvaa päättelyn periaatteita ja säilyttää niitä avaavat tutkimusesimerkit. Konvergenssikoonti kokoaa keskeiset yhteydet mallin selitysketjuun; Tietoa-osion lukemisohje esittelee kolme lukemista ohjaavaa kysymystä." },
    axes: [
      { title: "Selitystaso", text: "Fysiikka → biologia → käyttäytyminen → sivilisaatio paikantaa ilmiön mallissa. Järjestys kuvaa selityksen etenemistä, ei varmuusasteikkoa." },
      { title: "Päätelmän alkuperä", text: "Erota nimetty premissi, siitä johdettu seuraus, mitattu tutkimustulos ja useita tuloksia yhdistävä synteesi." },
      { title: "Tutkimuksen tukirooli", text: "Tunnista mitattu yhteys, tutkimusasetelma ja biologinen järjestelmä. Tarkastele sitten, kuvaako tulos rakennetta, suuntaa, suuruutta, ajoitusta vai soveltumista toiseen tilanteeseen." },
    ],
    convergence: "Näytön kokonaiskuva ja konvergenssi", epistemology: "Päättelyn periaatteet", about: "Lukemisohje", design: "Tutkimusasetelma", system: "Tutkimusjärjestelmä",
  },
  ja: {
    titles: { about: "モデルとエビデンスの読み方", evidence: "個々の研究から説明の全体像へ", epistemology: "推論と研究間のつながり" },
    leads: { about: "物理学から文明への説明をたどり、各段階を支える研究を確認します。次の三つの問いが、読む順序と研究の役割を明確にします。", evidence: "エビデンスの全体像では、研究が測定した量と支持する段階を通じて研究同士を結び付けます。このレジスターには、詳しく確認するための個別記録と拡張カタログを残しています。", epistemology: "このページでは推論の原則を説明し、研究例も引き続き掲載します。全体像のページでは主要なつながりをモデルの説明連鎖に沿ってまとめ、概要の読書ガイドでは三つの問いを紹介します。" },
    axes: [
      { title: "説明の水準", text: "物理学 → 生物学 → 行動 → 文明は、モデル内での現象の位置を示します。説明の順序であり、確実性の順位ではありません。" },
      { title: "結論の由来", text: "明示された前提、その前提からの導出、測定された知見、複数の知見を結ぶ統合的推論を区別します。" },
      { title: "研究が担う役割", text: "測定されたつながり、研究デザイン、生物学的対象を確認します。その結果が構造、方向、大きさ、時間関係、別の条件への適用のどれに関わるかを読み取ります。" },
    ],
    convergence: "エビデンスの全体像と収束", epistemology: "推論の原則", about: "読書ガイド", design: "研究デザイン", system: "研究対象",
  },
  fr: {
    titles: { about: "Lire le modèle et ses preuves", evidence: "Des études individuelles à l’explication d’ensemble", epistemology: "Raisonnement et liens entre études" },
    leads: { about: "Suivez l’explication de la physique à la civilisation, puis examinez les travaux soutenant chaque transition. Ces trois questions distinguent le parcours explicatif du rôle des études.", evidence: "La vue d’ensemble relie les études par les grandeurs mesurées et les transitions qu’elles soutiennent. Ce registre conserve les fiches individuelles et le catalogue étendu pour un examen détaillé.", epistemology: "Cette page présente les principes d’inférence et conserve ses exemples de recherche. La vue d’ensemble rassemble les liens essentiels le long de la chaîne explicative ; le guide de la rubrique À propos introduit les trois questions de lecture." },
    axes: [
      { title: "Niveau d’explication", text: "Physique → biologie → comportement → civilisation situe le phénomène dans le modèle. Cet ordre suit l’explication, sans classer les degrés de certitude." },
      { title: "Origine de la conclusion", text: "Distinguez une prémisse déclarée, une conséquence qui en est déduite, un résultat mesuré et une synthèse reliant plusieurs résultats." },
      { title: "Rôle de l’étude", text: "Repérez le lien mesuré, le plan d’étude et le système biologique. Demandez ensuite si le résultat renseigne la structure, le sens, l’ampleur, la temporalité ou le transfert vers un autre contexte." },
    ],
    convergence: "Vue d’ensemble des preuves et convergence", epistemology: "Principes d’inférence", about: "Guide de lecture", design: "Plan d’étude", system: "Système étudié",
  },
  ko: {
    titles: { about: "모델과 근거를 읽는 방법", evidence: "개별 연구에서 설명의 전체상으로", epistemology: "추론과 연구 간 연결" },
    leads: { about: "물리학에서 문명까지 설명을 따라간 뒤 각 전이를 뒷받침하는 연구를 살펴보세요. 다음 세 질문은 설명 순서와 연구의 역할을 구분합니다.", evidence: "근거의 전체상은 연구에서 측정한 양과 뒷받침하는 전이를 통해 연구들을 연결합니다. 이 등록부는 세부 확인을 위한 개별 기록과 확장 목록을 유지합니다.", epistemology: "이 페이지는 추론 원칙을 설명하고 연구 사례도 유지합니다. 전체상 페이지는 모델의 설명 사슬에 따라 핵심 연결을 모으며, 소개의 읽기 안내는 세 가지 질문을 제시합니다." },
    axes: [
      { title: "설명 수준", text: "물리학 → 생물학 → 행동 → 문명은 모델에서 현상의 위치를 나타냅니다. 이는 설명의 순서이며 확실성의 순위가 아닙니다." },
      { title: "결론의 출처", text: "명시된 전제, 전제에서 도출한 귀결, 측정된 결과, 여러 결과를 연결한 종합 추론을 구분합니다." },
      { title: "연구의 역할", text: "측정한 연결, 연구 설계와 생물학적 시스템을 확인합니다. 그 결과가 구조, 방향, 크기, 시간 관계 또는 다른 조건으로의 적용 중 무엇을 알려주는지 살펴봅니다." },
    ],
    convergence: "근거의 전체상과 수렴", epistemology: "추론의 원칙", about: "읽기 안내", design: "연구 설계", system: "연구 시스템",
  },
};

export function getResearchReadingCopy(locale: string) {
  return pickCopy(COPY, locale);
}

export function ResearchReadingGuide({ locale, context }: { locale: string; context: "about" | "evidence" | "epistemology" }) {
  const d = getResearchReadingCopy(locale);
  return (
    <section id="reading-guide" className="my-10 space-y-4 border-y editorial-rule py-6">
      <h2 className="text-lg font-semibold">{d.titles[context]}</h2>
      <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.leads[context]}</p>
      <dl className="grid gap-5 md:grid-cols-3">
        {d.axes.map((axis) => <div key={axis.title}>
          <dt className="mb-2 text-sm font-semibold">{axis.title}</dt>
          <dd className="text-sm leading-relaxed text-foreground-muted">{axis.text}</dd>
        </div>)}
      </dl>
      <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-sm">
        <Link href={`/${locale}/evidence/convergence`} className="font-semibold text-accent hover:underline">{d.convergence} →</Link>
        {context !== "epistemology" && <Link href={`/${locale}/epistemology`} className="text-accent hover:underline">{d.epistemology} →</Link>}
        {context !== "about" && <Link href={`/${locale}/about#reading-guide`} className="text-accent hover:underline">{d.about} →</Link>}
      </div>
    </section>
  );
}
