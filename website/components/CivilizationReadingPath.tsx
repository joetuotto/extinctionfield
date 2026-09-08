import Link from "next/link";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "How individual biology becomes collective dynamics",
    lead: "BERM carries the biological explanation forward through distributions, encounters and accumulated effects. Each stage passes a defined output to the next; institutions and infrastructure also feed back into the conditions experienced by individuals.",
    steps: [
      { title: "Individual states and actions", text: "Biological states shape the weights of reward, effort, risk and social approach. Across people, these responses form distributions of motivation and action; they need not be identical in every individual." },
      { title: "Couples and networks", text: "An initiative meets another person’s receptivity and timing. One person’s changed action becomes part of another’s environment, altering which encounters succeed and which patterns repeat." },
      { title: "Populations and communities", text: "The frequency of successful encounters, reproductive capacity and the timing of family formation combine into demographic outcomes. Cooperation and care similarly accumulate into community-level activity." },
      { title: "Institutions and governance", text: "Repeated decisions and interactions become recruitment, norms, resource allocation and rules. These stored patterns coordinate later behavior and change the opportunities individuals encounter." },
      { title: "Civilization through time", text: "Cohorts, accumulated knowledge, infrastructure and institutional capacity carry effects beyond a single biological episode. Technology and settlement then reshape the material and electromagnetic conditions entering the next cycle." },
    ],
    behavior: "Previous: biology, motivation and action", applications: "Six applications of the explanation", applicationsLead: "These essays examine overlapping parts of the chain. Start with the biological basis, then follow individuals, interaction, communities, governance and the longer historical trajectory.",
    essays: { pathopege: "Biological basis", pathopolites: "The individual and civic behavior", patokinesis: "Mate choice and social propagation", patopolis: "Communities and population change", patokratia: "Institutions and governance", patopoliteia: "Civilization and long-term history" },
  },
  fi: {
    title: "Miten yksilön biologiasta muodostuu yhteinen kehitys",
    lead: "BERM jatkaa biologista selitystä jakaumien, kohtaamisten ja kasautuvien vaikutusten kautta. Kukin vaihe välittää nimetyn tuloksen seuraavaan; instituutiot ja infrastruktuuri muuttavat puolestaan yksilöiden kohtaamia olosuhteita.",
    steps: [
      { title: "Yksilöiden tilat ja teot", text: "Biologiset tilat muokkaavat palkkion, vaivan, riskin ja sosiaalisen lähestymisen painoja. Yksilöiden vasteista muodostuu motivaation ja toiminnan jakaumia; jokaisen ihmisen ei tarvitse muuttua samalla tavalla." },
      { title: "Parit ja verkostot", text: "Aloite kohtaa toisen ihmisen vastaanottavuuden ja ajoituksen. Yhden ihmisen muuttunut toiminta tulee osaksi toisen ympäristöä ja vaikuttaa siihen, mitkä kohtaamiset onnistuvat ja mitkä toimintatavat toistuvat." },
      { title: "Väestö ja yhteisöt", text: "Onnistuneiden kohtaamisten yleisyys, lisääntymiskyky ja perheenmuodostuksen ajoitus yhdistyvät väestötuloksiksi. Yhteistyö ja hoiva kasautuvat vastaavasti yhteisötason toiminnaksi." },
      { title: "Instituutiot ja hallinto", text: "Toistuvat päätökset ja vuorovaikutukset muuttuvat rekrytoinniksi, normeiksi, resurssien jaoksi ja säännöiksi. Nämä varastoituneet toimintatavat ohjaavat myöhempää käyttäytymistä ja muuttavat yksilöiden mahdollisuuksia." },
      { title: "Sivilisaation ajallinen kehitys", text: "Sukupolvet, kertynyt tieto, infrastruktuuri ja instituutioiden toimintakyky kantavat vaikutuksia yksittäistä biologista jaksoa pidemmälle. Teknologia ja asutus muovaavat seuraavan kierroksen materiaalisia ja sähkömagneettisia olosuhteita." },
    ],
    behavior: "Edellinen taso: biologia, motivaatio ja toiminta", applications: "Kuusi selityksen sovellusta", applicationsLead: "Esseet tarkastelevat osin samoja ketjun vaiheita. Aloita biologisesta perustasta ja etene yksilöihin, vuorovaikutukseen, yhteisöihin, hallintoon ja pitkään historiaan.",
    essays: { pathopege: "Biologinen perusta", pathopolites: "Yksilö ja kansalaistoiminta", patokinesis: "Parinvalinta ja sosiaalinen leviäminen", patopolis: "Yhteisöt ja väestökehitys", patokratia: "Instituutiot ja hallinto", patopoliteia: "Sivilisaatio ja pitkä historia" },
  },
  ja: {
    title: "個人の生物学から集団の動態へ",
    lead: "BERMは、分布、出会い、蓄積する効果を通じて生物学的な説明を進めます。各段階の結果が次の段階への入力となり、制度とインフラも個人が経験する条件に作用します。",
    steps: [
      { title: "個人の状態と行動", text: "生物学的状態は、報酬、労力、リスク、社会的接近の重みに関わります。個人ごとの応答から動機と行動の分布が生じ、全員が同じように変化する必要はありません。" },
      { title: "カップルとネットワーク", text: "働きかけは、相手の受容性とタイミングに出会います。一人の行動の変化が他者の環境の一部となり、どの出会いが成功し、どの行動が繰り返されるかに影響します。" },
      { title: "人口と共同体", text: "成功する出会いの頻度、生殖能力、家族形成の時期が人口学的結果を生みます。協力とケアも同様に、共同体の活動として積み重なります。" },
      { title: "制度と統治", text: "繰り返される決定と相互作用は、採用、規範、資源配分、規則になります。蓄積した行動様式は後の行動を調整し、個人が直面する機会を変えます。" },
      { title: "文明の時間的変化", text: "世代、蓄積された知識、インフラ、制度の能力が、単一の生物学的エピソードを超えて効果を保ちます。技術と居住形態が次の周期の物質的・電磁的条件を形作ります。" },
    ],
    behavior: "前の水準：生物学、動機、行動", applications: "説明の六つの応用", applicationsLead: "各論考は、連鎖の重なり合う部分を扱います。生物学的基盤から、個人、相互作用、共同体、統治、長期的な歴史へ進みます。",
    essays: { pathopege: "生物学的基盤", pathopolites: "個人と市民の行動", patokinesis: "配偶者選択と社会的伝播", patopolis: "共同体と人口変化", patokratia: "制度と統治", patopoliteia: "文明と長期的な歴史" },
  },
  fr: {
    title: "De la biologie individuelle aux dynamiques collectives",
    lead: "BERM poursuit l’explication biologique à travers les distributions, les rencontres et les effets accumulés. Chaque étape transmet un résultat défini à la suivante ; les institutions et les infrastructures modifient en retour les conditions vécues par les individus.",
    steps: [
      { title: "États et actions individuels", text: "Les états biologiques modulent le poids de la récompense, de l’effort, du risque et de l’approche sociale. Les réponses individuelles forment des distributions de motivation et d’action, sans exiger un changement identique chez chacun." },
      { title: "Couples et réseaux", text: "Une initiative rencontre la réceptivité et le rythme d’une autre personne. L’action modifiée de l’un devient une partie de l’environnement de l’autre, influençant les rencontres qui réussissent et les conduites qui se répètent." },
      { title: "Populations et communautés", text: "La fréquence des rencontres réussies, la capacité reproductive et le calendrier de formation des familles produisent des résultats démographiques. Coopération et soin s’accumulent de même en activité collective." },
      { title: "Institutions et gouvernance", text: "Les décisions et interactions répétées deviennent recrutement, normes, allocation des ressources et règles. Ces pratiques accumulées coordonnent les comportements ultérieurs et modifient les possibilités offertes aux individus." },
      { title: "La civilisation dans le temps", text: "Les générations, les connaissances accumulées, les infrastructures et la capacité institutionnelle prolongent les effets au-delà d’un épisode biologique. Technologie et peuplement remodèlent les conditions matérielles et électromagnétiques du cycle suivant." },
    ],
    behavior: "Niveau précédent : biologie, motivation et action", applications: "Six applications de l’explication", applicationsLead: "Ces essais examinent des parties qui se recoupent. Partez de la base biologique, puis suivez les individus, l’interaction, les communautés, la gouvernance et la trajectoire historique.",
    essays: { pathopege: "Base biologique", pathopolites: "L’individu et le comportement civique", patokinesis: "Choix du partenaire et propagation sociale", patopolis: "Communautés et évolution démographique", patokratia: "Institutions et gouvernance", patopoliteia: "Civilisation et histoire longue" },
  },
  ko: {
    title: "개인의 생물학에서 집단 역학으로",
    lead: "BERM은 분포, 만남과 누적 효과를 통해 생물학적 설명을 이어갑니다. 각 단계는 정의된 결과를 다음 단계에 전달하며, 제도와 인프라는 개인이 경험하는 조건에 다시 영향을 줍니다.",
    steps: [
      { title: "개인의 상태와 행동", text: "생물학적 상태는 보상, 노력, 위험과 사회적 접근의 가중치를 바꿉니다. 개인별 반응이 동기와 행동의 분포를 형성하므로 모든 사람이 동일하게 변할 필요는 없습니다." },
      { title: "커플과 네트워크", text: "한 사람의 시도는 다른 사람의 수용성과 시점을 만납니다. 변화한 행동은 타인의 환경 일부가 되어 어떤 만남이 성공하고 어떤 행동이 반복되는지에 영향을 줍니다." },
      { title: "인구와 공동체", text: "성공적인 만남의 빈도, 생식 능력과 가족 형성 시점이 결합해 인구학적 결과를 만듭니다. 협력과 돌봄도 공동체 활동으로 축적됩니다." },
      { title: "제도와 통치", text: "반복되는 결정과 상호작용은 채용, 규범, 자원 배분과 규칙이 됩니다. 축적된 행동 방식은 이후 행동을 조정하고 개인에게 주어진 기회를 바꿉니다." },
      { title: "시간에 따른 문명 변화", text: "세대, 축적된 지식, 인프라와 제도의 역량은 단일 생물학적 사건보다 오래 효과를 유지합니다. 기술과 거주 형태는 다음 주기의 물질적·전자기적 조건을 형성합니다." },
    ],
    behavior: "이전 수준: 생물학, 동기와 행동", applications: "설명의 여섯 가지 응용", applicationsLead: "각 글은 사슬의 겹치는 부분을 다룹니다. 생물학적 기반에서 시작해 개인, 상호작용, 공동체, 통치와 장기 역사로 이어집니다.",
    essays: { pathopege: "생물학적 기반", pathopolites: "개인과 시민 행동", patokinesis: "배우자 선택과 사회적 전파", patopolis: "공동체와 인구 변화", patokratia: "제도와 통치", patopoliteia: "문명과 장기 역사" },
  },
};

export function getCivilizationReadingCopy(locale: string) {
  return pickCopy(COPY, locale);
}

export function CivilizationReadingPath({ locale }: { locale: string }) {
  const d = getCivilizationReadingCopy(locale);
  return (
    <section id="individual-to-civilization" className="mb-14 max-w-4xl">
      <h2 className="mb-3 text-2xl font-semibold">{d.title}</h2>
      <p className="mb-6 max-w-3xl text-base leading-relaxed text-foreground-muted">{d.lead}</p>
      <ol className="divide-y divide-card-border">
        {d.steps.map((step, index) => <li key={step.title} className="flex gap-4 py-5">
          <span className="pt-0.5 text-sm font-mono-num text-accent" aria-hidden="true">0{index + 1}</span>
          <div><h3 className="mb-2 text-base font-semibold">{step.title}</h3><p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">{step.text}</p></div>
        </li>)}
      </ol>
      <Link href={`/${locale}/behavior`} className="mt-4 inline-block text-sm text-accent hover:underline">← {d.behavior}</Link>
    </section>
  );
}
