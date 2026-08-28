"use client";

import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const t = {
  en: {
    title: "Quadruple behavioral suppression",
    desc: "Fertility decline operates through four multiplicative hormonal channels. Each channel independently reduces reproductive probability by ~20%. Because the channels are multiplicative (not additive), the combined effect is much larger than any individual channel: 0.8⁴ = 0.41 — a 59% reduction in fertility-relevant behavior.",
    channel: "Channel",
    mechanism: "Mechanism",
    factor: "Factor",
    combined: "Combined effect",
    reduction: "reduction in fertility-relevant behavior",
    c1Name: "Testosterone → approach",
    c1Mech: "T decline reduces male approach behavior and mate-seeking ([[ref:puts2008|Puts 2008]])",
    c2Name: "Phenotype → attraction",
    c2Mech: "Population-level masculine phenotype weakening reduces female attraction activation ([[ref:thornhill1994|Thornhill 1994]])",
    c3Name: "Oxytocin → pair bonding",
    c3Mech: "OT and T decline within couples reduces sexual frequency and pair bond strength ([[ref:carter2021|Carter 2021]])",
    c4Name: "Sperm quality → fertilization",
    c4Mech: "Sperm quality decline reduces per-act fertilization probability ([[ref:levine2023_sperm|Levine 2023]])",
    dualHormone: "Dual-hormone compounding",
    dualHormoneDesc: "Testosterone's behavioral effects require low cortisol ([[ref:mehta2015|Mehta 2015]]). EMF chronically elevates cortisol AND lowers testosterone, creating double suppression within each channel.",
    policy: "Policy implication",
    policyDesc: "This explains why pronatalist economic policies consistently fail — they target conscious choice (\"can we afford a child?\"), but the suppression operates on unconscious hormonal motivation. South Korea spent $200B on pronatalist incentives (2006–2024); TFR fell from 1.13 to 0.72.",
  },
  fi: {
    title: "Nelinkertainen käyttäytymissuppressio",
    desc: "Hedelmällisyyden lasku toimii neljän multiplikatiivisen hormonaalisen kanavan kautta. Kukin kanava vähentää itsenäisesti lisääntymistodennäköisyyttä ~20 %. Koska kanavat ovat multiplikatiivisia (eivät additiivisia), yhdistetty vaikutus on paljon suurempi kuin mikään yksittäinen kanava: 0,8⁴ = 0,41 — 59 % vähennys lisääntymiskäyttäytymisessä.",
    channel: "Kanava",
    mechanism: "Mekanismi",
    factor: "Kerroin",
    combined: "Yhdistetty vaikutus",
    reduction: "vähennys lisääntymiskäyttäytymisessä",
    c1Name: "Testosteroni → lähestyminen",
    c1Mech: "T:n lasku vähentää miesten lähestymiskäyttäytymistä ja kumppanin etsintää ([[ref:puts2008|Puts 2008]])",
    c2Name: "Fenotyyppi → vetovoima",
    c2Mech: "Väestötason maskuliinisen fenotyypin heikkeneminen vähentää naisten vetovoimaaktivointia ([[ref:thornhill1994|Thornhill 1994]])",
    c3Name: "Oksitosiini → parisuhde",
    c3Mech: "OT:n ja T:n lasku pariskunnissa vähentää seksuaalista aktiivisuutta ja parisidettä ([[ref:carter2021|Carter 2021]])",
    c4Name: "Siittiöiden laatu → hedelmöitys",
    c4Mech: "Siittiöiden laadun heikkeneminen vähentää kertakohtaista hedelmöitystodennäköisyyttä ([[ref:levine2023_sperm|Levine 2023]])",
    dualHormone: "Kaksoishormonaalinen yhdistelmä",
    dualHormoneDesc: "Testosteronin käyttäytymisvaikutukset vaativat matalan kortisolin ([[ref:mehta2015|Mehta 2015]]). EMF nostaa kroonisesti kortisolia JA laskee testosteronia, luoden kaksinkertaisen suppression kunkin kanavan sisällä.",
    policy: "Poliittinen implikaatio",
    policyDesc: "Tämä selittää miksi pronatalistiset talouspolitiikat epäonnistuvat johdonmukaisesti — ne kohdistuvat tietoiseen valintaan (\"onko meillä varaa lapseen?\"), mutta suppressio toimii tiedostamattomalla hormonaalisella tasolla. Etelä-Korea käytti 200 miljardia dollaria syntyvyyskannusteisiin (2006–2024); TFR laski 1,13:sta 0,72:een.",
  },
  ja: {
    title: "四重行動抑制",
    desc: "生殖能力の低下は、4つの乗法的ホルモンチャネルを通じて作用します。各チャネルは独立して生殖確率を約20%低下させます。チャネルは乗法的(加法的ではない)であるため、複合効果は個々のチャネルよりもはるかに大きくなります：0.8⁴ = 0.41 -- 生殖関連行動の59%減少。",
    channel: "チャネル",
    mechanism: "メカニズム",
    factor: "係数",
    combined: "複合効果",
    reduction: "生殖関連行動の減少",
    c1Name: "テストステロン → 接近行動",
    c1Mech: "T低下が男性の接近行動と配偶者探索を減少させる ([[ref:puts2008|Puts 2008]])",
    c2Name: "表現型 → 魅力",
    c2Mech: "集団レベルの男性的表現型の弱体化が女性の魅力活性化を減少させる ([[ref:thornhill1994|Thornhill 1994]])",
    c3Name: "オキシトシン → 絆形成",
    c3Mech: "カップル内のOTとTの低下が性的頻度とペアボンドの強度を減少させる ([[ref:carter2021|Carter 2021]])",
    c4Name: "精子の質 → 受精",
    c4Mech: "精子の質の低下が1回あたりの受精確率を減少させる ([[ref:levine2023_sperm|Levine 2023]])",
    dualHormone: "二重ホルモン複合効果",
    dualHormoneDesc: "テストステロンの行動効果には低コルチゾールが必要 ([[ref:mehta2015|Mehta 2015]])。EMFは慢性的にコルチゾールを上昇させ、かつテストステロンを低下させ、各チャネル内で二重の抑制を生み出す。",
    policy: "政策的示唆",
    policyDesc: "これは出生促進的経済政策が一貫して失敗する理由を説明します -- 意識的選択(「子供を持つ余裕があるか?」)を対象としていますが、抑制は無意識のホルモン動機に作用します。韓国は出生促進奨励金に2000億ドルを費やしました(2006~2024年)。TFRは1.13から0.72に低下しました。",
  },
  fr: {
    title: "Quadruple suppression comportementale",
    desc: "Le declin de la fertilite opere a travers quatre canaux hormonaux multiplicatifs. Chaque canal reduit independamment la probabilite reproductive d'environ 20 %. Parce que les canaux sont multiplicatifs (non additifs), l'effet combine est bien plus important que tout canal individuel : 0,8⁴ = 0,41 -- une reduction de 59 % du comportement lie a la fertilite.",
    channel: "Canal",
    mechanism: "Mecanisme",
    factor: "Facteur",
    combined: "Effet combine",
    reduction: "reduction du comportement lie a la fertilite",
    c1Name: "Testosterone → approche",
    c1Mech: "La baisse de T reduit le comportement d'approche masculin et la recherche de partenaire ([[ref:puts2008|Puts 2008]])",
    c2Name: "Phenotype → attraction",
    c2Mech: "L'affaiblissement du phenotype masculin au niveau de la population reduit l'activation de l'attraction feminine ([[ref:thornhill1994|Thornhill 1994]])",
    c3Name: "Ocytocine → lien de couple",
    c3Mech: "La baisse de l'OT et de la T chez les couples reduit la frequence sexuelle et la force du lien ([[ref:carter2021|Carter 2021]])",
    c4Name: "Qualite du sperme → fecondation",
    c4Mech: "La baisse de la qualite du sperme reduit la probabilite de fecondation par acte ([[ref:levine2023_sperm|Levine 2023]])",
    dualHormone: "Effet combine double-hormone",
    dualHormoneDesc: "Les effets comportementaux de la testosterone necessitent un faible cortisol ([[ref:mehta2015|Mehta 2015]]). Les CEM elevent chroniquement le cortisol ET diminuent la testosterone, creant une double suppression dans chaque canal.",
    policy: "Implication politique",
    policyDesc: "Cela explique pourquoi les politiques economiques natalistes echouent systematiquement -- elles ciblent le choix conscient (\"peut-on se permettre un enfant ?\"), mais la suppression opere sur la motivation hormonale inconsciente. La Coree du Sud a depense 200 milliards de dollars en incitations natalistes (2006-2024) ; le TFR est passe de 1,13 a 0,72.",
  },
  ko: {
    title: "4중 행동 억제",
    desc: "출산율 저하는 4개의 승법적 호르몬 채널을 통해 작동합니다. 각 채널은 독립적으로 생식 확률을 약 20% 감소시킵니다. 채널이 승법적(가법적이 아님)이므로, 결합 효과는 개별 채널보다 훨씬 큽니다: 0.8⁴ = 0.41 -- 생식 관련 행동의 59% 감소.",
    channel: "채널",
    mechanism: "메커니즘",
    factor: "계수",
    combined: "결합 효과",
    reduction: "생식 관련 행동 감소",
    c1Name: "테스토스테론 → 접근 행동",
    c1Mech: "T 감소가 남성의 접근 행동과 배우자 탐색을 줄임 ([[ref:puts2008|Puts 2008]])",
    c2Name: "표현형 → 매력",
    c2Mech: "인구 수준의 남성 표현형 약화가 여성의 매력 활성화를 감소시킴 ([[ref:thornhill1994|Thornhill 1994]])",
    c3Name: "옥시토신 → 유대 형성",
    c3Mech: "커플 내 OT와 T의 감소가 성적 빈도와 유대 강도를 줄임 ([[ref:carter2021|Carter 2021]])",
    c4Name: "정자 품질 → 수정",
    c4Mech: "정자 품질 저하가 행위당 수정 확률을 줄임 ([[ref:levine2023_sperm|Levine 2023]])",
    dualHormone: "이중 호르몬 복합 효과",
    dualHormoneDesc: "테스토스테론의 행동 효과는 낮은 코르티솔을 필요로 합니다 ([[ref:mehta2015|Mehta 2015]]). EMF는 만성적으로 코르티솔을 상승시키고 테스토스테론을 낮추어, 각 채널 내에서 이중 억제를 만듭니다.",
    policy: "정책적 시사점",
    policyDesc: "이것은 출산 장려 경제 정책이 일관되게 실패하는 이유를 설명합니다 -- 의식적 선택(\"아이를 가질 여유가 있는가?\")을 대상으로 하지만, 억제는 무의식적 호르몬 동기에 작용합니다. 한국은 출산 장려 인센티브에 2000억 달러를 지출했습니다(2006~2024년); TFR은 1.13에서 0.72로 하락했습니다.",
  },
} as const;

interface Props {
  locale: string;
}

export function BehavioralSuppression({ locale }: Props) {
  const d = pickCopy(t, locale);

  const channels = [
    { name: d.c1Name, mech: d.c1Mech, factor: 0.80 },
    { name: d.c2Name, mech: d.c2Mech, factor: 0.80 },
    { name: d.c3Name, mech: d.c3Mech, factor: 0.80 },
    { name: d.c4Name, mech: d.c4Mech, factor: 0.80 },
  ];

  const combined = channels.reduce((acc, c) => acc * c.factor, 1.0);

  return (
    <section id="behavioral-suppression" className="mb-14">
      <h2 className="text-xl font-semibold mb-4">{d.title}</h2>
      <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">{d.desc}</p>

      {/* Multiplicative visualization */}
      <div className="flex items-center gap-2 mb-6 flex-wrap max-w-2xl">
        {channels.map((c, i) => (
          <div key={c.name} className="flex items-center gap-2">
            <div className="bg-card-bg border border-card-border rounded-lg px-3 py-2 text-center min-w-[60px]">
              <p className="text-lg font-mono-num font-bold">{c.factor}</p>
              <p className="text-[9px] text-foreground-muted leading-tight mt-0.5">{c.name.split(" → ")[0]}</p>
            </div>
            {i < channels.length - 1 && (
              <span className="text-foreground-muted font-bold">&times;</span>
            )}
          </div>
        ))}
        <span className="text-foreground-muted font-bold mx-1">=</span>
        <div className="bg-status-refuted/10 border border-status-refuted/30 rounded-lg px-3 py-2 text-center min-w-[70px]">
          <p className="text-xl font-mono-num font-bold text-status-refuted">{combined.toFixed(2)}</p>
          <p className="text-[9px] text-foreground-muted leading-tight mt-0.5">{d.combined}</p>
        </div>
      </div>

      {/* Channel details table */}
      <div className="overflow-x-auto mb-6">
        <table className="text-sm w-full max-w-3xl">
          <thead>
            <tr className="border-b border-border text-left text-foreground-muted">
              <th className="py-2 pr-4 font-medium">{d.channel}</th>
              <th className="py-2 pr-4 font-medium">{d.mechanism}</th>
              <th className="py-2 font-medium text-right">{d.factor}</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((c) => (
              <tr key={c.name} className="border-b border-card-border last:border-0">
                <td className="py-2.5 pr-4 font-medium whitespace-nowrap">{c.name}</td>
                <td className="py-2.5 pr-4 text-foreground-muted"><InlineReferenceText text={c.mech} locale={locale} /></td>
                <td className="py-2.5 text-right font-mono-num">{c.factor}</td>
              </tr>
            ))}
            <tr className="bg-status-refuted/5">
              <td className="py-2.5 pr-4 font-semibold">{d.combined}</td>
              <td className="py-2.5 pr-4 text-status-refuted font-medium">{locale === "fi" || locale === "fr" ? "59 %" : "59%"} {d.reduction}</td>
              <td className="py-2.5 text-right font-mono-num font-bold text-status-refuted">{combined.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Dual-hormone and policy implications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        <div className="p-4 rounded-lg border border-status-partial/30 bg-status-partial/5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-status-partial mb-2">{d.dualHormone}</h4>
          <p className="text-sm text-foreground-muted leading-relaxed"><InlineReferenceText text={d.dualHormoneDesc} locale={locale} /></p>
        </div>
        <div className="p-4 rounded-lg border border-accent/30 bg-accent/5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">{d.policy}</h4>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.policyDesc}</p>
        </div>
      </div>
    </section>
  );
}
