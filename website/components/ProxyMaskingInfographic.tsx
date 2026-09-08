import Link from "next/link";
import { Activity, ArrowRight, FileText, Radio } from "lucide-react";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    kicker: "PROXY MASKING",
    title: "An effect can be visible while its cause stays hidden.",
    lead: "A change in appetite, hormones or behavior can explain an outcome while leaving open what changed the biological response in the first place.",
    steps: [
      { title: "Environment", body: "Fields, chemicals and sensory cues" },
      { title: "Biological response", body: "Receptor state, regulation and compensation" },
      { title: "What we observe", body: "Hormones, behavior and health" },
    ],
    caption: "When the explanation ends at the observed variable, the earlier chain remains unexplored. BERM examines how this can happen across organisms, experiments and population studies.",
    link: "Explore proxy masking",
  },
  fi: {
    kicker: "VAIKUTUKSEN PEITTYMINEN",
    title: "Seuraus voi näkyä, vaikka syy peittyy.",
    lead: "Ruokahalun, hormonien tai käyttäytymisen muutos voi selittää lopputulosta ja jättää avoimeksi, mikä alun perin muutti biologista vastetta.",
    steps: [
      { title: "Ympäristö", body: "Kentät, kemikaalit ja aistivihjeet" },
      { title: "Biologinen vaste", body: "Vastaanottajatila, säätely ja kompensaatio" },
      { title: "Havaittu seuraus", body: "Hormonit, käyttäytyminen ja terveys" },
    ],
    caption: "Kun selitys päättyy havaittuun muuttujaan, sitä edeltävä ketju jää avaamatta. BERM tarkastelee peittymistä eliöissä, kokeissa ja väestötutkimuksissa.",
    link: "Tutustu vaikutuksen peittymiseen",
  },
  ja: {
    kicker: "代理指標による隠蔽",
    title: "結果が見えても、原因は隠れることがある。",
    lead: "食欲、ホルモン、行動の変化は結果を説明できても、その生物学的応答を最初に変えた要因は未解明のままかもしれません。",
    steps: [
      { title: "環境", body: "電磁場、化学物質、感覚の手がかり" },
      { title: "生物学的応答", body: "受容状態、調節、補償" },
      { title: "観察される結果", body: "ホルモン、行動、健康" },
    ],
    caption: "説明が観察された変数で止まると、それ以前の連鎖は未解明のままです。BERMは、生物、実験、集団研究でこの隠蔽がどう生じるかを検討します。",
    link: "代理指標による隠蔽を詳しく見る",
  },
  fr: {
    kicker: "MASQUAGE PAR INDICATEURS",
    title: "Un effet peut être visible alors que sa cause reste cachée.",
    lead: "Une variation de l’appétit, des hormones ou du comportement peut expliquer un résultat sans révéler ce qui a initialement modifié la réponse biologique.",
    steps: [
      { title: "Environnement", body: "Champs, substances chimiques et signaux sensoriels" },
      { title: "Réponse biologique", body: "État des récepteurs, régulation et compensation" },
      { title: "Résultat observé", body: "Hormones, comportement et santé" },
    ],
    caption: "Lorsque l’explication s’arrête à la variable observée, la chaîne qui la précède reste à explorer. BERM examine ce masquage chez les organismes, dans les expériences et dans les études de population.",
    link: "Explorer le masquage par indicateurs",
  },
  ko: {
    kicker: "대리지표에 의한 은폐",
    title: "결과가 보여도 원인은 가려질 수 있습니다.",
    lead: "식욕, 호르몬 또는 행동의 변화는 결과를 설명할 수 있지만, 무엇이 처음 생물학적 반응을 바꿨는지는 여전히 밝혀지지 않을 수 있습니다.",
    steps: [
      { title: "환경", body: "전자기장, 화학물질 및 감각 단서" },
      { title: "생물학적 반응", body: "수용체 상태, 조절 및 보상" },
      { title: "관찰된 결과", body: "호르몬, 행동 및 건강" },
    ],
    caption: "설명이 관찰된 변수에서 끝나면 그 앞의 인과 과정은 밝혀지지 않습니다. BERM은 생물, 실험 및 인구 연구에서 이러한 은폐가 어떻게 발생하는지 살펴봅니다.",
    link: "대리지표에 의한 은폐 살펴보기",
  },
} as const;

const STEP_ICONS = [Radio, Activity, FileText] as const;

export default function ProxyMaskingInfographic({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);

  return (
    <section aria-labelledby="proxy-masking-title" className="my-12 border-y editorial-rule py-7 sm:py-9">
      <p className="editorial-kicker text-accent">{d.kicker}</p>
      <h2 id="proxy-masking-title" className="editorial-section-heading mt-3 max-w-3xl">{d.title}</h2>
      <p className="editorial-deck mt-4">{d.lead}</p>

      <figure className="mt-7">
        <ol className="grid gap-5 sm:grid-cols-3 sm:gap-8">
          {d.steps.map((step, index) => {
            const Icon = STEP_ICONS[index];
            return (
              <li key={step.title} className="relative border-t border-card-border pt-4">
                <div className="mb-3 flex items-center gap-3 text-accent">
                  <span className="font-mono-num text-xs">0{index + 1}</span>
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  {index < d.steps.length - 1 && (
                    <ArrowRight size={17} aria-hidden="true" className="ml-auto rotate-90 text-foreground-muted sm:absolute sm:-right-6 sm:top-5 sm:rotate-0" />
                  )}
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{step.body}</p>
              </li>
            );
          })}
        </ol>
        <figcaption className="editorial-rail mt-6 max-w-3xl text-sm leading-relaxed text-foreground-muted">
          {d.caption}
        </figcaption>
      </figure>

      <Link href={`/${locale}/model/proxy-masking`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent underline decoration-accent/35 underline-offset-4 hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
        {d.link}<ArrowRight size={16} aria-hidden="true" />
      </Link>
    </section>
  );
}
