"use client";

import Link from "next/link";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";
import { SpeciesSilhouetteInset } from "@/components/SpeciesSilhouetteInset";


const COPY = {
  en: {
    title: "The Varroa Cascade: Why EMF Is a Force Multiplier",
    p1: "Colony Collapse Disorder is typically attributed to a combination of stressors: Varroa mites, viruses (DWV), pesticides, and nutritional stress. BERM-Eco adds a mechanism that amplifies ALL of these simultaneously: EMF weakens the honeybee's defenses while leaving its primary parasite structurally protected.",
    p2: "Electromagnetic fields reduce grooming behavior (50 Hz data, [[ref:wyszkowska_2025_bee_behavior|Wyszkowska et al. 2025]]), impair olfactory sensitivity (the primary mechanism for hygienic detection of Varroa-infested brood), trigger stress protein expression (hsp70, hsp90; [[ref:plos_one_2023_bee_900mhz|Migdał et al. 2023]]), reduce queen laying and brood viability ([[ref:odemer2019|Odemer et al. 2019]]), and disrupt magnetic navigation essential for foraging ([[ref:shepherd_2023_pollination|Shepherd et al. 2023, Science Advances]]).",
    p3: "Meanwhile, Varroa destructor is structurally protected: its sclerotin exoskeleton likely attenuates EMF penetration far more effectively than the bee's thin cuticle. Its 1.6 mm body is too small for resonant RF absorption. Its host-finding relies on chemical and electrostatic cues, not magnetic navigation. And its parasitic strategy — [[ref:varroa_chitinase_2020|salivary chitinase to keep wounds open]] — is biochemical, not electromagnetic.",
    beeLabel: "HONEYBEE — weakens",
    varroaLabel: "VARROA — protected",
    fieldStateLabel: "FieldState",
    beeEffects: [
      { icon: "✗", text: "Grooming ↓ ([[ref:wyszkowska_2025_bee_behavior|Wyszkowska et al. 2025]])" },
      { icon: "✗", text: "Olfaction ↓ ([[ref:shepherd_2023_pollination|Shepherd et al. 2023]])" },
      { icon: "✗", text: "Navigation ↓ ([[ref:shepherd_2023_pollination|Shepherd et al. 2023]])" },
      { icon: "✗", text: "Stress proteins ↑ ([[ref:plos_one_2023_bee_900mhz|Migdał et al. 2023]])" },
      { icon: "✗", text: "Queen laying ↓ ([[ref:odemer2019|Odemer et al. 2019]])" },
      { icon: "✗", text: "Immune resources → stress response" },
    ],
    varroaEffects: [
      { icon: "✓", text: "Sclerotin armour → EMF attenuation" },
      { icon: "✓", text: "1.6 mm → no GHz resonance" },
      { icon: "✓", text: "Chemical parasitic strategy → not EMF-sensitive" },
      { icon: "✓", text: "Electrostatic contact → may be enhanced" },
      { icon: "—", text: "Reproduction inside hive → shielded" },
    ],
    result: "Result: Each increment of ambient EMF tilts the balance further in Varroa's favor. The parasite is shielded; the host is not.",
    favreTitle: "The Faraday Experiment ([[ref:favre_johansson_2025|Favre & Johansson 2025]])",
    favreText: "Honeybee colonies placed in complete Faraday shielding (blocking all EMF including natural fields) collapsed — queens stopped laying fertilized eggs. But colonies in Faraday cages WITH artificial Schumann resonance (7.83 Hz) survived. Bees need Earth's natural electromagnetic environment but are harmed by artificial EMF layered on top of it.",
    favreFootnote: `[[ref:us_patent_12239107|US Patent 12,239,107]] states: “With EMF transmissions blocked, bees can better defend the colony against mites and hive beetles.”`,
    readMore: "Read the full story",
    epistemicNote: "The individual effects listed are from published studies [C/M]. The \"double cascade\" framework — that differential susceptibility acts as a force multiplier — is a BERM-Eco synthesis [H] that has not been tested as a unified hypothesis.",
  },
  ja: {
    title: "Varroaカスケード：なぜEMFは力の増幅器なのか",
    p1: "蜂群崩壊症候群は通常、ストレス要因の組み合わせに起因するとされる：Varroaダニ、ウイルス（DWV）、農薬、栄養ストレス。BERM-Ecoはこれらすべてを同時に増幅するメカニズムを追加する：EMFはミツバチの防御を弱体化させながら、その主要寄生虫を構造的に保護したまま残す。",
    p2: "電磁場はグルーミング行動を減少させ（50 Hzデータ、[[ref:wyszkowska_2025_bee_behavior|Wyszkowska et al. 2025]]）、嗅覚感度を低下させ（Varroa感染幼虫の衛生的検出の主要メカニズム）、ストレスタンパク質発現を誘発し（hsp70、hsp90；[[ref:plos_one_2023_bee_900mhz|Migdał et al. 2023]]）、女王蜂の産卵と幼虫の生存率を低下させ（[[ref:odemer2019|Odemer et al. 2019]]）、採餌に不可欠な磁気ナビゲーションを妨害する（[[ref:shepherd_2023_pollination|Shepherd et al. 2023, Science Advances]]）。",
    p3: "一方、Varroa destructorは構造的に保護されている：そのスクレロチン外骨格はミツバチの薄いクチクラよりもEMFの浸透をはるかに効果的に減衰させる。1.6mmの体はGHz帯共鳴吸収には小さすぎる。宿主発見は化学的・静電気的手がかりに依存し、磁気ナビゲーションではない。そして寄生戦略 — [[ref:varroa_chitinase_2020|唾液キチナーゼによる傷口の開放維持]] — は生化学的であり、電磁的ではない。",
    beeLabel: "ミツバチ — 弱体化",
    varroaLabel: "VARROA — 防護",
    fieldStateLabel: "FieldState",
    beeEffects: [
      { icon: "✗", text: "グルーミング ↓（[[ref:wyszkowska_2025_bee_behavior|Wyszkowska et al. 2025]]）" },
      { icon: "✗", text: "嗅覚 ↓（[[ref:shepherd_2023_pollination|Shepherd et al. 2023]]）" },
      { icon: "✗", text: "ナビゲーション ↓（[[ref:shepherd_2023_pollination|Shepherd et al. 2023]]）" },
      { icon: "✗", text: "ストレスタンパク質 ↑（[[ref:plos_one_2023_bee_900mhz|Migdał et al. 2023]]）" },
      { icon: "✗", text: "女王蜂の産卵 ↓（[[ref:odemer2019|Odemer et al. 2019]]）" },
      { icon: "✗", text: "免疫資源 → ストレス応答" },
    ],
    varroaEffects: [
      { icon: "✓", text: "スクレロチン装甲 → EMF減衰" },
      { icon: "✓", text: "1.6 mm → GHz共鳴なし" },
      { icon: "✓", text: "化学的寄生戦略 → EMF非感受性" },
      { icon: "✓", text: "静電気接触 → 強化の可能性" },
      { icon: "—", text: "巣内での繁殖 → 遮蔽" },
    ],
    result: "結果：周囲EMFの各増分がVarroaに有利なバランスをさらに傾ける。寄生虫は遮蔽されている。宿主はされていない。",
    favreTitle: "ファラデー実験（[[ref:favre_johansson_2025|Favre & Johansson 2025]]）",
    favreText: "完全なファラデー遮蔽（自然場を含むすべてのEMFを遮断）に置かれたミツバチ群は崩壊した — 女王蜂が受精卵の産卵を停止した。しかし人工シューマン共鳴（7.83 Hz）付きのファラデーケージ内の群は生存した。ミツバチは地球の自然な電磁環境を必要とするが、その上に重ねられた人工EMFに害される。",
    favreFootnote: `[[ref:us_patent_12239107|US Patent 12,239,107]]は述べている：「EMF送信が遮断されると、ミツバチはダニやスムシに対してコロニーをより良く防御できる。」`,
    readMore: "全文を読む",
    epistemicNote: "リストされた個々の効果は発表された研究 [C/M] からのものである。「二重カスケード」フレームワーク — 差異的感受性が力の増幅器として機能する — はBERM-Eco統合 [H] であり、統一仮説として検証されていない。",
  },
  fr: {
    title: "La cascade Varroa : pourquoi l'EMF est un multiplicateur de force",
    p1: "Le syndrome d'effondrement des colonies est généralement attribué à une combinaison de facteurs de stress : acariens Varroa, virus (DWV), pesticides et stress nutritionnel. BERM-Eco ajoute un mécanisme qui amplifie TOUS ces facteurs simultanément : l'EMF affaiblit les défenses de l'abeille tout en laissant son principal parasite structurellement protégé.",
    p2: "Les champs électromagnétiques réduisent le comportement de toilettage (données 50 Hz, [[ref:wyszkowska_2025_bee_behavior|Wyszkowska et al. 2025]]), altèrent la sensibilité olfactive (mécanisme principal de détection hygiénique du couvain infesté par Varroa), déclenchent l'expression de protéines de stress (hsp70, hsp90 ; [[ref:plos_one_2023_bee_900mhz|Migdał et al. 2023]]), réduisent la ponte de la reine et la viabilité du couvain ([[ref:odemer2019|Odemer et al. 2019]]) et perturbent la navigation magnétique essentielle au butinage ([[ref:shepherd_2023_pollination|Shepherd et al. 2023, Science Advances]]).",
    p3: "Pendant ce temps, Varroa destructor est structurellement protégé : son exosquelette en sclérotine atténue probablement la pénétration EMF bien plus efficacement que la fine cuticule de l'abeille. Son corps de 1,6 mm est trop petit pour l'absorption RF résonante. Sa recherche d'hôte repose sur des indices chimiques et électrostatiques, pas sur la navigation magnétique. Et sa stratégie parasitaire — [[ref:varroa_chitinase_2020|la chitinase salivaire pour maintenir les plaies ouvertes]] — est biochimique, pas électromagnétique.",
    beeLabel: "ABEILLE — affaiblie",
    varroaLabel: "VARROA — protégé",
    fieldStateLabel: "FieldState",
    beeEffects: [
      { icon: "✗", text: "Toilettage ↓ ([[ref:wyszkowska_2025_bee_behavior|Wyszkowska et al. 2025]])" },
      { icon: "✗", text: "Olfaction ↓ ([[ref:shepherd_2023_pollination|Shepherd et al. 2023]])" },
      { icon: "✗", text: "Navigation ↓ ([[ref:shepherd_2023_pollination|Shepherd et al. 2023]])" },
      { icon: "✗", text: "Protéines de stress ↑ ([[ref:plos_one_2023_bee_900mhz|Migdał et al. 2023]])" },
      { icon: "✗", text: "Ponte de la reine ↓ ([[ref:odemer2019|Odemer et al. 2019]])" },
      { icon: "✗", text: "Ressources immunitaires → réponse au stress" },
    ],
    varroaEffects: [
      { icon: "✓", text: "Armure en sclérotine → atténuation EMF" },
      { icon: "✓", text: "1,6 mm → pas de résonance GHz" },
      { icon: "✓", text: "Stratégie parasitaire chimique → non sensible aux EMF" },
      { icon: "✓", text: "Contact électrostatique → potentiellement renforcé" },
      { icon: "—", text: "Reproduction dans la ruche → protégé" },
    ],
    result: "Résultat : chaque incrément d'EMF ambiant fait pencher la balance davantage en faveur de Varroa. Le parasite est protégé ; l'hôte ne l'est pas.",
    favreTitle: "L'expérience de Faraday ([[ref:favre_johansson_2025|Favre & Johansson 2025]])",
    favreText: "Les colonies d'abeilles placées dans un blindage de Faraday complet (bloquant tous les EMF y compris les champs naturels) se sont effondrées — les reines ont cessé de pondre des œufs fécondés. Mais les colonies dans des cages de Faraday AVEC résonance de Schumann artificielle (7,83 Hz) ont survécu. Les abeilles ont besoin de l'environnement électromagnétique naturel de la Terre mais sont endommagées par les EMF artificiels superposés.",
    favreFootnote: `[[ref:us_patent_12239107|Le brevet US 12 239 107]] déclare : « Lorsque les transmissions EMF sont bloquées, les abeilles peuvent mieux défendre la colonie contre les acariens et les coléoptères de la ruche. »`,
    readMore: "Lire l'article complet",
    epistemicNote: "Les effets individuels listés proviennent d'études publiées [C/M]. Le cadre de la « double cascade » — selon lequel la susceptibilité différentielle agit comme multiplicateur de force — est une synthèse BERM-Eco [H] qui n'a pas été testée comme hypothèse unifiée.",
  },
  ko: {
    title: "Varroa 연쇄: 왜 EMF는 힘의 증폭기인가",
    p1: "군집붕괴현상은 일반적으로 스트레스 요인의 조합에 기인한다: Varroa 응애, 바이러스(DWV), 살충제, 영양 스트레스. BERM-Eco는 이 모든 것을 동시에 증폭하는 메커니즘을 추가한다: EMF는 꿀벌의 방어를 약화시키면서 주요 기생충은 구조적으로 보호된 상태로 남긴다.",
    p2: "전자기장은 그루밍 행동을 감소시키고(50 Hz 데이터, [[ref:wyszkowska_2025_bee_behavior|Wyszkowska et al. 2025]]), 후각 감도를 손상시키며(Varroa 감염 유충의 위생적 감지를 위한 주요 메커니즘), 스트레스 단백질 발현을 유발하고(hsp70, hsp90; [[ref:plos_one_2023_bee_900mhz|Migdał et al. 2023]]), 여왕벌의 산란과 유충 생존율을 감소시키며([[ref:odemer2019|Odemer et al. 2019]]), 채집에 필수적인 자기 항법을 교란한다([[ref:shepherd_2023_pollination|Shepherd et al. 2023, Science Advances]]).",
    p3: "반면 Varroa destructor는 구조적으로 보호된다: 경피질 외골격은 꿀벌의 얇은 표피보다 EMF 침투를 훨씬 효과적으로 감쇠시킨다. 1.6mm 체구는 GHz 공명 흡수에 너무 작다. 숙주 발견은 화학적, 정전기적 신호에 의존하며 자기 항법이 아니다. 그리고 기생 전략 — [[ref:varroa_chitinase_2020|상처를 열어두기 위한 타액 키티나아제]] — 은 생화학적이며 전자기적이 아니다.",
    beeLabel: "꿀벌 — 약화",
    varroaLabel: "VARROA — 방호",
    fieldStateLabel: "FieldState",
    beeEffects: [
      { icon: "✗", text: "그루밍 ↓ ([[ref:wyszkowska_2025_bee_behavior|Wyszkowska et al. 2025]])" },
      { icon: "✗", text: "후각 ↓ ([[ref:shepherd_2023_pollination|Shepherd et al. 2023]])" },
      { icon: "✗", text: "항법 ↓ ([[ref:shepherd_2023_pollination|Shepherd et al. 2023]])" },
      { icon: "✗", text: "스트레스 단백질 ↑ ([[ref:plos_one_2023_bee_900mhz|Migdał et al. 2023]])" },
      { icon: "✗", text: "여왕벌 산란 ↓ ([[ref:odemer2019|Odemer et al. 2019]])" },
      { icon: "✗", text: "면역 자원 → 스트레스 반응" },
    ],
    varroaEffects: [
      { icon: "✓", text: "경피질 장갑 → EMF 감쇠" },
      { icon: "✓", text: "1.6 mm → GHz 공명 없음" },
      { icon: "✓", text: "화학적 기생 전략 → EMF 비감수성" },
      { icon: "✓", text: "정전기 접촉 → 강화 가능" },
      { icon: "—", text: "벌통 내 번식 → 차폐" },
    ],
    result: "결과: 주변 EMF의 각 증가분이 Varroa에 유리하게 균형을 더 기울인다. 기생충은 차폐된다; 숙주는 아니다.",
    favreTitle: "패러데이 실험 ([[ref:favre_johansson_2025|Favre & Johansson 2025]])",
    favreText: "완전한 패러데이 차폐(자연장 포함 모든 EMF 차단)에 놓인 꿀벌 군집은 붕괴했다 — 여왕벌이 수정란 산란을 중단했다. 그러나 인공 슈만 공명(7.83 Hz)이 있는 패러데이 케이지 내 군집은 생존했다. 꿀벌은 지구의 자연 전자기 환경이 필요하지만 그 위에 겹쳐진 인공 EMF에 의해 피해를 입는다.",
    favreFootnote: `[[ref:us_patent_12239107|US Patent 12,239,107]]은 명시한다: "EMF 전송이 차단되면, 꿀벌은 응애와 벌통 딱정벌레에 대해 군집을 더 잘 방어할 수 있다."`,
    readMore: "전체 기사 읽기",
    epistemicNote: "나열된 개별 효과는 발표된 연구 [C/M]에서 가져온 것이다. '이중 연쇄' 프레임워크 — 차별적 감수성이 힘의 증폭기로 작용한다 — 는 통합 가설로 검증되지 않은 BERM-Eco 종합 [H]이다.",
  },
  fi: {
    title: "Varroa-kaskadi: Miksi EMF on voimankerroin",
    p1: "Colony Collapse Disorder liitetään tyypillisesti stressitekijöiden yhdistelmään: Varroa-punkit, virukset (DWV), torjunta-aineet ja ravinnollinen stressi. BERM-Eco lisää mekanismin joka vahvistaa KAIKKIA näitä samanaikaisesti: EMF heikentää mehiläisen puolustuksia jättäen sen pääloisen rakenteellisesti suojatuksi.",
    p2: "Sähkömagneettiset kentät vähentävät sukimiskäyttäytymistä (50 Hz data, [[ref:wyszkowska_2025_bee_behavior|Wyszkowska ym. 2025]]), heikentävät hajuherkkyyttä (ensisijainen mekanismi Varroa-tartunnan saaneen sikiön hygieeniseen havaitsemiseen), laukaisevat stressiproteiinien ilmentymisen (hsp70, hsp90; [[ref:plos_one_2023_bee_900mhz|Migdał ym. 2023]]), vähentävät kuningattaren munintaa ja sikiön elinkelpoisuutta ([[ref:odemer2019|Odemer ym. 2019]]) ja häiritsevät ravinnonhankintaan välttämätöntä magneettinavigointia ([[ref:shepherd_2023_pollination|Shepherd ym. 2023, Science Advances]]).",
    p3: "Samaan aikaan Varroa destructor on rakenteellisesti suojattu: sen sklerotiini-ulkokuori todennäköisesti vaimentaa EMF:n tunkeutumista paljon tehokkaammin kuin mehiläisen ohut kutiikkeli. Sen 1,6 mm keho on liian pieni resonantti-RF-absorptiolle. Sen isännänlöytökyky perustuu kemiallisiin ja sähköstaattisiin vihjeisiin, ei magneettinavigointiin. Ja sen loisstrategia — [[ref:varroa_chitinase_2020|sylkikitinaasi haavojen aukipitämiseksi]] — on biokemiallinen, ei sähkömagneettinen.",
    beeLabel: "MEHILÄINEN — heikkenee",
    varroaLabel: "VARROA — suojassa",
    fieldStateLabel: "FieldState",
    beeEffects: [
      { icon: "✗", text: "Sukiminen ↓ ([[ref:wyszkowska_2025_bee_behavior|Wyszkowska ym. 2025]])" },
      { icon: "✗", text: "Hajuaisti ↓ ([[ref:shepherd_2023_pollination|Shepherd ym. 2023]])" },
      { icon: "✗", text: "Navigointi ↓ ([[ref:shepherd_2023_pollination|Shepherd ym. 2023]])" },
      { icon: "✗", text: "Stressiproteiinit ↑ ([[ref:plos_one_2023_bee_900mhz|Migdał ym. 2023]])" },
      { icon: "✗", text: "Kuningattaren muninta ↓ ([[ref:odemer2019|Odemer ym. 2019]])" },
      { icon: "✗", text: "Immuuniresurssit → stressivaste" },
    ],
    varroaEffects: [
      { icon: "✓", text: "Sklerotiini-panssari → EMF-vaimennus" },
      { icon: "✓", text: "1,6 mm → ei GHz-resonanssia" },
      { icon: "✓", text: "Kemiallinen loisstrategia → ei EMF-herkkä" },
      { icon: "✓", text: "Sähköstaattinen kontakti → voi tehostua" },
      { icon: "—", text: "Lisääntyminen pesän sisällä → suojassa" },
    ],
    result: "Tulos: jokainen lisäys ambient-EMF:ssä kallistaa tasapainoa edelleen Varroan eduksi. Loinen on suojattu; isäntä ei ole.",
    favreTitle: "Faraday-koe ([[ref:favre_johansson_2025|Favre & Johansson 2025]])",
    favreText: "Faradayn häkkiin (kaikki EMF mukaan lukien luonnolliset kentät estetty) asetetut mehiläisyhdyskunnat romahtivat — kuningattaret lopettivat hedelmöitettyjen munien munimisen. Mutta yhdyskunnat Faradayn häkeissä JOISSA oli keinotekoinen Schumannin resonanssi (7,83 Hz) selvisivät. Mehiläiset tarvitsevat Maan luonnollista sähkömagneettista ympäristöä mutta niille on vahingollista keinotekoinen EMF joka on kerrostettu sen päälle.",
    favreFootnote: `[[ref:us_patent_12239107|US Patent 12 239 107]] toteaa: "Kun EMF-lähetykset estetään, mehiläiset pystyvät paremmin puolustamaan yhdyskuntaa punkkeja ja pesäkuoriaisia vastaan."`,
    readMore: "Lue koko tarina",
    epistemicNote: "Yksittäiset listatut vaikutukset ovat julkaistuista tutkimuksista [C/M]. \"Kaksinkertainen kaskadi\" -viitekehys — että differentiaalinen herkkyys toimii voimankertoimena — on BERM-Eco-synteesi [H], jota ei ole testattu yhtenäisenä hypoteesina.",
  },
} as const;

export function VarroaCascade({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <section className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
      <h2 className="editorial-section-heading mb-4">{d.title}</h2>

      <div className="flow-root mb-8 text-sm text-foreground-muted leading-relaxed">
        <SpeciesSilhouetteInset
          src="/icons/silhouettes/berm-varroa-mite-silhouette.png"
          variant="varroa"
        />
        <div className="space-y-4">
          <p>{d.p1}</p>
          <p><InlineReferenceText text={d.p2} locale={locale} /></p>
          <p><InlineReferenceText text={d.p3} locale={locale} /></p>
        </div>
      </div>

      {/* Dual-sided diagram */}
      <div className="rounded-xl border border-card-border bg-card-bg overflow-hidden mb-8">
        <div className="grid md:grid-cols-[1fr_auto_1fr]">
          {/* Bee side */}
          <div className="p-5">
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-status-refuted mb-4">
              {d.beeLabel}
            </p>
            <ul className="space-y-2.5">
              {d.beeEffects.map((e) => (
                <li key={e.text} className="flex items-start gap-2.5 text-sm">
                  <span className="text-status-refuted font-mono-num text-xs mt-0.5 shrink-0 w-4 text-center">
                    {e.icon}
                  </span>
                  <span className="text-foreground-muted leading-snug">
                    <InlineReferenceText text={e.text} locale={locale} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center FieldState bar */}
          <div className="hidden md:flex flex-col items-center justify-center px-4 border-x border-card-border">
            <div className="writing-mode-vertical text-xs uppercase tracking-[0.2em] font-semibold text-accent [writing-mode:vertical-lr] rotate-180">
              {d.fieldStateLabel}
            </div>
          </div>
          <div className="md:hidden border-t border-card-border py-2 text-center">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">
              {d.fieldStateLabel}
            </span>
          </div>

          {/* Varroa side */}
          <div className="p-5 md:border-l-0 border-t md:border-t-0 border-card-border">
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-status-confirmed mb-4">
              {d.varroaLabel}
            </p>
            <ul className="space-y-2.5">
              {d.varroaEffects.map((e) => (
                <li key={e.text} className="flex items-start gap-2.5 text-sm">
                  <span
                    className={`font-mono-num text-xs mt-0.5 shrink-0 w-4 text-center ${
                      e.icon === "✓"
                        ? "text-status-confirmed"
                        : "text-foreground-muted"
                    }`}
                  >
                    {e.icon}
                  </span>
                  <span className="text-foreground-muted leading-snug">{e.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Result bar */}
        <div className="border-t border-card-border bg-accent/5 px-5 py-4">
          <p className="text-sm font-medium text-foreground/80 leading-relaxed">{d.result}</p>
        </div>
      </div>

      <p className="text-xs text-foreground-muted/60 leading-relaxed italic mb-6">
        {d.epistemicNote}
      </p>

      {/* Favre & Johansson highlight box */}
      <div className="rounded-xl border-2 border-accent/30 bg-accent/5 p-6 mb-4">
        <h3 className="text-sm font-semibold text-accent mb-3">
          <InlineReferenceText text={d.favreTitle} locale={locale} />
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4">{d.favreText}</p>
        <p className="text-xs text-foreground-muted/70 leading-relaxed italic mb-4">
          <InlineReferenceText text={d.favreFootnote} locale={locale} />
        </p>
        <Link
          href={`${prefix}/articles/bees`}
          className="text-sm text-accent hover:underline"
        >
          {d.readMore} →
        </Link>
      </div>
    </section>
  );
}
