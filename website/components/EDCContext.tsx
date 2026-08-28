"use client";

import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    heading: "Endocrine Disruption Research Context",
    body: "The effects described here parallel well-established findings in endocrine disrupting chemical (EDC) research. BPA, phthalates, PCBs, and paracetamol have been shown to disrupt prenatal hormone programming and brain sexual differentiation through similar Ca²⁺-dependent mechanisms. BERM proposes that EMF is an additional, non-chemical contributor to the same biological pathway. This does not replace or diminish the role of chemical EDCs or social/cultural factors.",
  },
  fi: {
    heading: "Endokriinisen häirinnän tutkimuskonteksti",
    body: "Tässä kuvatut vaikutukset ovat rinnakkaisia vakiintuneen endokriinisten häiriöaineiden (EDC) tutkimuskentän löydösten kanssa. BPA, ftalaatit, PCB:t ja parasetamoli ovat osoittaneet häiritsevänsä sikiöaikaista hormoniohjelmointia ja aivojen seksuaalista differentiointia samojen Ca²⁺-riippuvaisten mekanismien kautta. BERM ehdottaa, että EMF on lisä EI-KEMIALLINEN kontribuuttori samalle biologiselle reitille. Tämä ei korvaa tai vähennä kemiallisten EDC:iden tai sosiaalisten/kulttuuristen tekijöiden roolia.",
  },
  ja: {
    heading: "内分泌かく乱研究の文脈",
    body: "ここで述べた効果は、内分泌かく乱化学物質（EDC）研究における確立された知見と並行している。BPA、フタル酸エステル、PCB、パラセタモールは、同様のCa²⁺依存メカニズムを通じて胎児期のホルモンプログラミングと脳の性分化を妨害することが示されている。BERMは、EMFが同じ生物学的経路への追加の非化学的寄与因子であると提案する。これは化学的EDCや社会的・文化的要因の役割を置き換えたり縮小したりするものではない。",
  },
  fr: {
    heading: "Contexte de la recherche sur la perturbation endocrinienne",
    body: "Les effets décrits ici sont parallèles aux résultats bien établis de la recherche sur les perturbateurs endocriniens chimiques (PE). Le BPA, les phtalates, les PCB et le paracétamol perturbent la programmation hormonale prénatale et la différenciation sexuelle du cerveau par des mécanismes similaires dépendants du Ca²⁺. BERM propose que l’EMF est un contributeur supplémentaire, non chimique, à la même voie biologique. Cela ne remplace ni ne diminue le rôle des PE chimiques ou des facteurs sociaux/culturels.",
  },
  ko: {
    heading: "내분비 교란 연구 맥락",
    body: "여기에 기술된 효과는 내분비 교란 화학물질(EDC) 연구에서 잘 확립된 발견과 병행한다. BPA, 프탈레이트, PCB, 파라세타몬은 유사한 Ca²⁺ 의존 메커니즘을 통해 태아기 호르몬 프로그래밍과 뇌 성분화를 교란하는 것으로 나타났다. BERM은 EMF가 동일한 생물학적 경로에 대한 추가적인 비화학적 기여 인자라고 제안한다. 이는 화학적 EDC나 사회적·문화적 요인의 역할을 대체하거나 축소하지 않는다.",
  },
} as const;

interface EDCContextProps {
  locale: string;
}

export function EDCContext({ locale }: EDCContextProps) {
  const d = pickCopy(COPY, locale);

  return (
    <div className="rounded-lg border border-card-border bg-card-bg p-5 my-6 max-w-4xl">
      <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
        {d.heading}
      </p>
      <p className="text-sm text-foreground-muted leading-relaxed">
        {d.body}
      </p>
    </div>
  );
}
