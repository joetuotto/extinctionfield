import type { Metadata } from "next";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { pickCopy } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";
import Link from "next/link";
import {
  EVIDENCE_CARDS,
  EYE_PROFILES,
  NUTRITIONAL_MODULATORS,
  PREDICTIONS,
  EPISTEMIC_LEVELS,
} from "@/lib/eyeColorData";
import { CHAIN_EPISTEMIC_COLORS } from "@/lib/epistemicConstants";

const COPY = {
  en: {
    title: "Eye Color & Magnetoreception",
    subtitle: "How iris pigmentation, nutrition, and sex modulate CRY sensitivity",
    backLink: "← Back to Evidence",
    section1Title: "Your Eyes Are Antennas",
    section1: [
      "Every eye contains a hidden sensor. In the retinal ganglion cells — not the rods and cones you learned about in school, but a separate layer of cells closer to the surface — sits a protein called cryptochrome. This protein does something remarkable: it absorbs blue light and uses the energy to create pairs of electrons whose quantum spin states are sensitive to the Earth's magnetic field.",
      "In birds, this system is a compass. European robins use it to navigate thousands of kilometers. In 2011, researchers showed that the human version of cryptochrome (CRY2) can function as a magnetosensor when placed into fruit flies. In 2019, Chae and colleagues demonstrated that blindfolded humans lost their ability to orient toward geomagnetic cues, but only when blue light was removed — the diagnostic signature of the cryptochrome mechanism.",
      "What does this have to do with eye color? Everything.",
      "Blue eyes transmit roughly 100 times more light through the iris than brown eyes. This isn't about seeing better — in fact, blue-eyed people are more sensitive to glare. The extra light reaches those deep ganglion cells where cryptochrome lives. More blue photons means more cryptochrome activation, which means a stronger magnetic signal.",
      "But there's a subtlety that makes this story richer than \"blue eyes = better antenna.\" Cryptochrome's magnetic sensitivity doesn't depend on just any light. It has a two-stage operating cycle: blue light (under 500 nm) activates it, and green light (500-570 nm) maintains it in its magnetically sensitive state. Too much blue light actually pushes the protein past its sensitive state into an inactive form. This is where green eyes become interesting.",
      "Green eyes contain a natural bandpass filter — a yellow pigment called lipochrome that selectively reduces the shortest blue wavelengths while transmitting the 450-570 nm range where cryptochrome operates best. The result is not maximum sensitivity but optimal stability: the protein stays in its magnetically active state longer.",
      "And here is perhaps the most surprising part: this maps onto sex differences. Men are more likely to have blue eyes. Women are more likely to have green eyes. In the framework we're exploring, this isn't random — it reflects different biological priorities. Men's reproductive fitness in ancestral environments depended more on navigation (hunting). Women's depended more on circadian stability (hormonal cycles, pregnancy, ovulation timing). Blue eyes optimize for magnetic sensitivity. Green eyes optimize for circadian resilience.",
      "None of this has been proven as a unified theory. But each individual link is supported by published research, and the whole picture is testable. What follows is the evidence, piece by piece.",
    ],
    section2Title: "The Evidence Chain",
    section3Title: "The Synthesis",
    section3aTitle: "Three Eye Colors, Three Magnetoreceptive Profiles",
    section3bTitle: "Nutritional Modulation Layer",
    section3cTitle: "Sex-Specific CRY Optimization",
    section3cText: [
      "Men are more often blue-eyed. They are the sex that showed magnetoreception in behavioral tests. In BERM's framework, men's reproductive pathway (fMale) depends primarily on sperm quality — a function of pathway A (VGIC → ROS). But their magnetoreceptive advantage (blue eyes → maximum CRY sensitivity) served a different function: spatial navigation for hunting, which indirectly supported reproductive success.",
      "Women are more often green-eyed. They did not show magnetoreception in behavioral tests. In BERM's framework, women's reproductive pathway (fFemale) depends primarily on circadian stability — a function of pathway C (CRY → melatonin → GnRH → HPG). Green eyes optimize precisely for this: the lipochrome filter maintains CRY in its magnetically sensitive semiquinone state longer, producing more stable circadian oscillation.",
      "The X-chromosome mosaicism mechanism (Bressan 2024) provides the proximate genetic explanation. The sex-specific adaptive pressure provides the ultimate evolutionary explanation: natural selection preserved the mosaicism because intermediate eye colors in women were adaptively advantageous for circadian function, while extreme blue in men was advantageous for magnetic navigation.",
    ],
    fastingTitle: "The Fasting Paradox",
    fastingText: [
      "There is an apparent contradiction in the evidence. AMPK, the cell's nutrient sensor that activates during fasting, phosphorylates CRY1 and targets it for degradation (Lamia et al. 2009, Science). Yet the only study showing human magnetoreception used starved subjects (Chae 2019). If fasting destroys the very protein that senses magnetic fields, how can fasting enhance magnetoreception?",
      "The resolution lies in CRY quality versus quantity. Fasting does degrade old CRY molecules via the AMPK-Ser71-FBXL3 pathway. But fasting simultaneously increases the pool of oxidized flavoproteins via fatty acid beta-oxidation — meaning more FAD is available. When the cell synthesizes replacement CRY molecules, they are loaded with fresh FAD chromophore more efficiently. The net result: fewer CRY molecules, but each one is better equipped for magnetoreception.",
      "This also explains why chronic B2 deficiency is far more damaging than acute fasting. During a fast, the FAD pool is maintained or enhanced by metabolic shifts. During chronic B2 deficiency, the FAD pool itself is depleted — so even when new CRY is synthesized, it cannot be properly loaded with its essential chromophore. The protein exists but cannot function.",
      "The fasting paradox resolution is an L*-level hypothesis. The individual biochemical steps (AMPK phosphorylation of CRY, FAD requirement for CRY function, beta-oxidation during fasting) are each E-level established facts. The synthesis — that net CRY quality improves during fasting despite lower quantity — has not been directly tested.",
    ],
    bartolkeTitle: "2025 Update: Two CRY Systems",
    bartolkeText: [
      "In 2025, the QuantumBirds consortium (Bartölke et al., FASEB J) made a discovery that transforms the eye color hypothesis. Using C-terminal specific antibodies, they found full-length CRY1 protein exclusively in the outer segments of short-wavelength-sensitive 'blue' cone photoreceptors — not in ganglion cells, not in rods, not in other cone types. Only in blue cones.",
      "This means the human retina has not one but two cryptochrome systems. CRY1 sits in the phototransduction machinery of blue cones (C1: sensory), while CRY2 is in the ganglion cells that project to the brain's circadian clock (C2: circadian). They have different locations, different probable functions, and different relationships to eye color.",
      "The C1 system (CRY1 in blue cones) is the one most affected by iris pigmentation. Blue eyes transmit ~100x more light to these specific photoreceptors. The stacked membrane lamellae of cone outer segments provide the structural order that CRY needs for directional magnetoreception (confirmed by Majewska et al. 2025: CRY associates with lipid membranes in oriented fashion).",
      "The C2 system (CRY2 in ganglion cells) is the circadian system that controls melatonin production. It forms a physical complex with the ion channel TRPC1 (Yap et al. 2025), linking it directly to BERM's pathway A. This system is less directly affected by iris pigmentation but equally dependent on FAD/B2 status.",
    ],
    section4Title: "Testable Predictions",
    epistemicTitle: "Epistemic Status",
    epistemicText: "This page presents a testable hypothesis (L* level). Individual links in the evidence chain are experimentally confirmed (E level: FAD→CRY stability, FAD→magnetic sensitivity, CRY photocycle wavelength dependence). The overall synthesis — that eye color is an adaptation specifically for magnetoreceptive optimization — has not been directly tested. The predictions above are designed to narrow this uncertainty. This is not established science. It is a structured research proposal grounded in published findings.",
    profileHeaders: {
      transmission: "Iris transmission",
      cryActivation: "CRY activation",
      cryStability: "CRY stability",
      snr: "Signal-to-noise",
      circadian: "Circadian profile",
      magnetoreception: "Magnetoreception",
      sexPrevalence: "Sex prevalence",
      adaptiveContext: "Adaptive context",
      geographic: "Geographic distribution",
    },
    nutrientHeaders: {
      nutrient: "Nutrient",
      target: "Target in CRY chain",
      deficiency: "Deficiency effect",
      source: "Key source",
      level: "Level",
    },
    predictionHeaders: {
      discriminating: "Discriminating",
      observational: "Observational",
      test: "Test design",
    },
    levelLabel: "Evidence level",
    bermRelevance: "BERM relevance",
  },
  fi: {
    title: "Silmien väri ja magnetoreseptio",
    subtitle: "Miten iiriksen pigmentaatio, ravitsemus ja sukupuoli moduloivat CRY-herkkyyttä",
    backLink: "← Takaisin evidenssiin",
    section1Title: "Silmäsi ovat antenneja",
    section1: [
      "Jokaisessa silmässä on piilotettu sensori. Verkkokalvon gangliosoluissa — ei sauvoissa ja tapeissa joista koulussa opetettiin, vaan erillisessä solukerroksessa lähempänä pintaa — on proteiini nimeltä kryptokromi. Tämä proteiini tekee jotain merkittävää: se absorboi sinistä valoa ja käyttää energian luodakseen elektronipareja, joiden kvanttispintilat ovat herkkiä Maan magneettikentälle.",
      "Linnuissa tämä järjestelmä on kompassi. Punarinta käyttää sitä navigoidakseen tuhansia kilometrejä. Vuonna 2011 tutkijat osoittivat, että ihmisen kryptokromin versio (CRY2) voi toimia magnetosensorina kun se siirretään banaanikärpäsiin. Vuonna 2019 Chae kollegoineen osoitti, että silmät peitetyt ihmiset menettivät kykynsä orientoitua geomagneettisiin vihjeisiin, mutta vain kun sininen valo poistettiin — kryptokromimekanismin diagnostinen tunnusmerkki.",
      "Mitä tekemistä tällä on silmien värin kanssa? Kaikki.",
      "Siniset silmät päästävät läpi noin 100 kertaa enemmän valoa iiriksen läpi kuin ruskeat silmät. Kyse ei ole paremmasta näkemisestä — itse asiassa sinisilmäiset ovat herkempiä häikäisylle. Ylimääräinen valo saavuttaa ne syvät gangliosolut joissa kryptokromi sijaitsee. Enemmän sinisiä fotoneja tarkoittaa enemmän kryptokromin aktivaatiota, mikä tarkoittaa vahvempaa magneettista signaalia.",
      "Mutta on hienous joka tekee tästä tarinasta rikkaamman kuin \"siniset silmät = parempi antenni.\" Kryptokromin magneettinen herkkyys ei riipu mistä tahansa valosta. Sillä on kaksivaiheinen toimintasykli: sininen valo (alle 500 nm) aktivoi sen, ja vihreä valo (500-570 nm) ylläpitää sitä magneettisesti herkässä tilassa. Liian paljon sinistä valoa itse asiassa työntää proteiinin herkän tilansa ohi inaktiiviseen muotoon. Tässä vihreät silmät tulevat kiinnostaviksi.",
      "Vihreissä silmissä on luonnollinen kaistanpäästösuodatin — keltainen pigmentti nimeltä lipokromi, joka valikoidusti vähentää lyhyimpiä sinisiä aallonpituuksia päästäen läpi 450-570 nm alueen jossa kryptokromi toimii parhaiten. Tulos ei ole maksimaalinen herkkyys vaan optimaalinen stabiilisuus: proteiini pysyy magneettisesti aktiivisessa tilassaan pidempään.",
      "Ja ehkä yllättävin osa: tämä heijastuu sukupuolieroihin. Miehillä on todennäköisemmin siniset silmät. Naisilla on todennäköisemmin vihreät silmät. Tutkimaamme kehyksessä tämä ei ole satunnaista — se heijastaa erilaisia biologisia prioriteetteja. Miesten lisääntymiskelpoisuus esi-isien ympäristöissä riippui enemmän navigoinnista (metsästys). Naisten riippui enemmän sirkadiaanisesta stabiilisuudesta (hormonaaliset syklit, raskaus, ovulaation ajoitus). Siniset silmät optimoivat magneettista herkkyyttä. Vihreät silmät optimoivat sirkadiaanista resilienssiä.",
      "Mitään tästä ei ole todistettu yhtenäisenä teoriana. Mutta jokainen yksittäinen lenkki perustuu julkaistuun tutkimukseen, ja kokonaiskuva on testattavissa. Seuraavassa on evidenssi, pala palalta.",
    ],
    section2Title: "Evidenssiketju",
    section3Title: "Synteesi",
    section3aTitle: "Kolme silmänväriä, kolme magnetoreseptiivistä profiilia",
    section3bTitle: "Ravitsemuksellinen modulaatiokerros",
    section3cTitle: "Sukupuolispesifinen CRY-optimointi",
    section3cText: [
      "Miehillä on useammin siniset silmät. He ovat sukupuoli joka osoitti magnetoreseptiota käyttäytymiskokeissa. BERM:n kehyksessä miesten lisääntymispolku (fMale) riippuu ensisijaisesti siittiöiden laadusta — polku A:n (VGIC → ROS) funktio. Mutta heidän magnetoreseptiivinen etunsa (siniset silmät → maksimaalinen CRY-herkkyys) palveli eri tarkoitusta: avaruudellista navigointia metsästykseen, mikä epäsuorasti tuki lisääntymismenestystä.",
      "Naisilla on useammin vihreät silmät. He eivät osoittaneet magnetoreseptiota käyttäytymiskokeissa. BERM:n kehyksessä naisten lisääntymispolku (fFemale) riippuu ensisijaisesti sirkadiaanisesta stabiilisuudesta — polku C:n (CRY → melatoniini → GnRH → HPG) funktio. Vihreät silmät optimoivat juuri tätä: lipokromi-suodatin ylläpitää CRY:tä sen magneettisesti herkässä semikinoni-tilassa pidempään, tuottaen stabiilimman sirkadiaanisen oskillaation.",
      "X-kromosomimosaiikkimekanismi (Bressan 2024) tarjoaa proksimaalisen geneettisen selityksen. Sukupuolispesifinen adaptiivinen paine tarjoaa ultimaalisen evoluutiobiologisen selityksen: luonnonvalinta säilytti mosaiikin koska keskiväriset silmät naisilla olivat adaptiivisesti edullisia sirkadiaaniselle toiminnalle, kun taas äärimmäinen sininen miehillä oli edullinen magneettiselle navigoinnille.",
    ],
    fastingTitle: "Paastoparadoksi",
    fastingText: [
      "Evidenssissä on ilmeinen ristiriita. AMPK, solun ravintosensori joka aktivoituu paastossa, fosforyloi CRY1:n ja kohdistaa sen hajotettavaksi (Lamia ym. 2009, Science). Kuitenkin ainoa ihmisen magnetoreseptiota osoittanut tutkimus käytti nälkiintyneitä koehenkilöitä (Chae 2019). Jos paasto tuhoaa juuri sen proteiinin joka aistii magneettikenttiä, miten paasto voi tehostaa magnetoreseptiota?",
      "Ratkaisu piilee CRY:n laadussa verrattuna määrään. Paasto hajottaa vanhoja CRY-molekyylejä AMPK-Ser71-FBXL3-reitin kautta. Mutta paasto lisää samanaikaisesti hapettuneiden flavoproteiinien poolia rasvahappojen beta-oksidaation kautta — mikä tarkoittaa enemmän FAD:ia saatavilla. Kun solu syntetisoi korvaavia CRY-molekyylejä, ne ladataan tuoreella FAD-kromoforilla tehokkaammin. Nettotulos: vähemmän CRY-molekyylejä, mutta jokainen on paremmin varustettu magnetoreseptioon.",
      "Tämä selittää myös miksi krooninen B2-puutos on paljon vahingollisempi kuin akuutti paasto. Paaston aikana FAD-pooli ylläpidetään tai tehostetaan metabolisilla muutoksilla. Kroonisen B2-puutoksen aikana itse FAD-pooli on ehtynyt — joten vaikka uutta CRY:tä syntetisoitaisiin, sitä ei voida ladata kunnolla sen välttämättömällä kromoforilla. Proteiini on olemassa mutta ei voi toimia.",
      "Paastoparadoksin ratkaisu on L*-tason hypoteesi. Yksittäiset biokemialliset vaiheet (AMPK:n CRY-fosforylaatio, FAD:n vaatimus CRY:n toiminnalle, beta-oksidaatio paastossa) ovat kukin E-tason vahvistettuja faktoja. Synteesi — että CRY:n nettolaatu paranee paastossa matalammasta määrästä huolimatta — ei ole suoraan testattu.",
    ],
    bartolkeTitle: "2025-päivitys: Kaksi CRY-järjestelmää",
    bartolkeText: [
      "Vuonna 2025 QuantumBirds-konsortio (Bartölke ym., FASEB J) teki löydöksen joka muuttaa silmien väri -hypoteesia. C-terminaalispesifisillä vasta-aineilla he löysivät täyspitkän CRY1-proteiinin yksinomaan lyhytaaltoherkissä sinisten tappisolujen ulkosegmenteistä — ei gangliosoluista, ei sauvoista, ei muista tappityypeistä. Vain sinisistä tapeista.",
      "Tämä tarkoittaa, ettei ihmisen verkkokalvolla ole yhtä vaan kaksi kryptokromijärjestelmää. CRY1 sijaitsee sinisten tappisolujen fototransduktiokoneistossa (C1: sensorinen), kun taas CRY2 on gangliosoluissa jotka projisoivat aivojen sirkadiaaniseen kelloon (C2: sirkadiaaninen). Niillä on eri sijainnit, eri todennäköiset funktiot ja eri suhteet silmien väriin.",
      "C1-järjestelmä (CRY1 sinisissä tapeissa) on se, johon iiriksen pigmentaatio vaikuttaa eniten. Siniset silmät päästävät ~100-kertaisesti enemmän valoa nimenomaan näihin fotoreseptoreihin. Tappisolujen ulkosegmenttien pinotut kalvolamellit tarjoavat rakenteellisen järjestyksen jota CRY tarvitsee suuntakohtaiseen magnetoreseptioon (vahvistettu: Majewska ym. 2025: CRY assosioituu lipidikalvoihin orientoituneesti).",
      "C2-järjestelmä (CRY2 gangliosoluissa) on sirkadiaaninen järjestelmä joka ohjaa melatoniinituotantoa. Se muodostaa fysikaalisen kompleksin ionikanava TRPC1:n kanssa (Yap ym. 2025), yhdistäen sen suoraan BERM:n polku A:han. Tämä järjestelmä on vähemmän suoraan iiriksen pigmentaation vaikutuksen alainen mutta yhtä riippuvainen FAD/B2-tilasta.",
    ],
    section4Title: "Testattavat ennusteet",
    epistemicTitle: "Episteeminen tila",
    epistemicText: "Tämä sivu esittää testattavan hypoteesin (L*-taso). Evidenssiketjun yksittäiset lenkit ovat kokeellisesti vahvistettu (E-taso: FAD→CRY-stabiilisuus, FAD→magneettinen herkkyys, CRY:n fotosyklin aallonpituusriippuvuus). Kokonaissynteesi — että silmien väri on adaptaatio nimenomaan magnetoreseptiivistä optimointia varten — ei ole suoraan testattu. Edellä esitetyt ennusteet on suunniteltu kaventamaan tätä epävarmuutta. Tämä ei ole vakiintunutta tiedettä. Se on julkaistuihin löydöksiin perustuva jäsennetty tutkimusehdotus.",
    profileHeaders: {
      transmission: "Iiriksen transmissio",
      cryActivation: "CRY-aktivaatio",
      cryStability: "CRY-stabiilisuus",
      snr: "Signaali-kohinasuhde",
      circadian: "Sirkadiaaninen profiili",
      magnetoreception: "Magnetoreseptio",
      sexPrevalence: "Sukupuolijakauma",
      adaptiveContext: "Adaptiivinen konteksti",
      geographic: "Maantieteellinen jakauma",
    },
    nutrientHeaders: {
      nutrient: "Ravintoaine",
      target: "Kohde CRY-ketjussa",
      deficiency: "Puutosvaikutus",
      source: "Avainlähde",
      level: "Taso",
    },
    predictionHeaders: {
      discriminating: "Diskriminoiva",
      observational: "Havainnoiva",
      test: "Koeasetelma",
    },
    levelLabel: "Evidenssitaso",
    bermRelevance: "BERM-merkitys",
  },
  ja: {
    title: "眼の色と磁気受容",
    subtitle: "虹彩の色素沈着、栄養、性別がCRY感受性をどのように調節するか",
    backLink: "← エビデンスに戻る",
    section1Title: "あなたの目はアンテナである",
    section1: [
      "すべての目には隠されたセンサーがある。網膜神経節細胞――学校で学んだ桿体や錐体ではなく、表面に近い別の細胞層――にcryptochromeと呼ばれるタンパク質がある。このタンパク質は驚くべきことをする：青色光を吸収し、そのエネルギーを使って地球磁場に敏感な量子スピン状態を持つ電子対を生成する。",
      "鳥類では、このシステムはコンパスである。ヨーロッパコマドリはこれを使って数千キロメートルを移動する。2011年、研究者たちはヒト版cryptochrome（CRY2）がショウジョウバエに導入された際に磁気センサーとして機能できることを示した。2019年、Chaeらは目隠しをしたヒトが地磁気の手がかりに対する方向感覚を失うことを実証したが、それは青色光が除去された場合のみであった――cryptochromeメカニズムの診断的特徴である。",
      "これが眼の色と何の関係があるのか？すべてである。",
      "青い目は茶色い目より虹彩を通して約100倍多くの光を透過する。これはよく見えるということではない――実際、青い目の人はまぶしさに敏感である。余分な光はcryptochromeが存在する深部の神経節細胞に到達する。より多くの青色光子はより多くのcryptochrome活性化を意味し、より強い磁気信号を意味する。",
      "しかし「青い目＝より良いアンテナ」よりも話を豊かにする微妙さがある。Cryptochromeの磁気感受性はどんな光にも依存するわけではない。二段階の動作サイクルがある：青色光（500 nm未満）がそれを活性化し、緑色光（500-570 nm）が磁気的に敏感な状態を維持する。過度の青色光はタンパク質を敏感な状態を越えて不活性な形態に押しやる。ここで緑の目が興味深くなる。",
      "緑の目には天然のバンドパスフィルター――lipochromeと呼ばれる黄色い色素――が含まれており、cryptochromeが最も効率的に機能する450-570 nmの範囲を透過しながら最短の青色波長を選択的に減少させる。結果は最大感受性ではなく最適な安定性である：タンパク質がより長く磁気的に活性な状態にとどまる。",
      "そして、おそらく最も驚くべき部分がある：これは性差に対応する。男性は青い目を持つ可能性が高い。女性は緑の目を持つ可能性が高い。我々が探究しているフレームワークでは、これはランダムではない――異なる生物学的優先事項を反映している。祖先の環境における男性の繁殖適応度はナビゲーション（狩猟）により依存していた。女性のそれは概日リズムの安定性（ホルモン周期、妊娠、排卵のタイミング）により依存していた。青い目は磁気感受性を最適化する。緑の目は概日レジリエンスを最適化する。",
      "これらのいずれも統一理論として証明されていない。しかし個々のリンクはそれぞれ公表された研究に裏付けられており、全体像は検証可能である。以下がそのエビデンスである。",
    ],
    section2Title: "エビデンスの連鎖",
    section3Title: "統合",
    section3aTitle: "3つの眼の色、3つの磁気受容プロファイル",
    section3bTitle: "栄養調節レイヤー",
    section3cTitle: "性特異的CRY最適化",
    section3cText: [
      "男性はより頻繁に青い目を持つ。彼らは行動実験で磁気受容を示した性である。BERMのフレームワークでは、男性の生殖経路（fMale）は主に精子の質に依存する――経路A（VGIC → ROS）の機能である。しかし彼らの磁気受容上の利点（青い目 → 最大CRY感受性）は異なる機能を果たしていた：狩猟のための空間ナビゲーションであり、間接的に生殖の成功を支えていた。",
      "女性はより頻繁に緑の目を持つ。彼女たちは行動実験で磁気受容を示さなかった。BERMのフレームワークでは、女性の生殖経路（fFemale）は主に概日リズムの安定性に依存する――経路C（CRY → melatonin → GnRH → HPG）の機能である。緑の目はまさにこれを最適化する：lipochromeフィルターがCRYを磁気的に敏感なsemiquinone状態により長く維持し、より安定した概日振動を生み出す。",
      "X染色体モザイシズム機構（Bressan 2024）は近接的な遺伝的説明を提供する。性特異的な適応圧は究極的な進化的説明を提供する：自然選択がモザイシズムを保存したのは、女性における中間的な眼の色が概日機能にとって適応的に有利であり、一方男性における極端な青は磁気ナビゲーションにとって有利であったためである。",
    ],
    fastingTitle: "断食のパラドックス",
    fastingText: [
      "エビデンスに明らかな矛盾がある。AMPK（断食時に活性化する細胞の栄養センサー）はCRY1をリン酸化し分解の標的とする（Lamia et al. 2009, Science）。しかしヒトの磁気受容を示した唯一の研究は空腹の被験者を使用した（Chae 2019）。断食が磁場を感知するまさにそのタンパク質を破壊するなら、なぜ断食が磁気受容を強化できるのか？",
      "解決策はCRYの質と量の違いにある。断食はAMPK-Ser71-FBXL3経路を通じて古いCRY分子を分解する。しかし断食は同時に脂肪酸beta酸化を通じて酸化flavoproteinのプールを増加させる――つまりより多くのFADが利用可能になる。細胞が代替のCRY分子を合成するとき、それらはより効率的に新鮮なFAD chromophoreが装填される。正味の結果：より少ないCRY分子だが、各分子は磁気受容により良く装備されている。",
      "これはまた、慢性的なB2欠乏が急性の断食よりもはるかに有害である理由も説明する。断食中、FADプールは代謝シフトによって維持または強化される。慢性的なB2欠乏中は、FADプール自体が枯渇する――したがって新しいCRYが合成されても、その必須chromophoreを適切に装填できない。タンパク質は存在するが機能できない。",
      "断食パラドックスの解決はL*レベルの仮説である。個々の生化学的ステップ（AMPKによるCRYリン酸化、CRY機能に対するFADの必要性、断食中のbeta酸化）はそれぞれEレベルの確立された事実である。統合――断食中にCRYの質が量の低下にもかかわらず正味で改善する――は直接テストされていない。",
    ],
    bartolkeTitle: "2025年更新：2つのCRYシステム",
    bartolkeText: [
      "2025年、QuantumBirdsコンソーシアム（Bartölke et al., FASEB J）が眼の色仮説を変革する発見をした。C末端特異的抗体を用いて、彼らは全長CRY1タンパク質を短波長感受性の「青」錐体光受容体の外節セグメントのみに発見した――神経節細胞ではなく、桿体ではなく、他の錐体タイプでもなく。青色錐体のみに。",
      "これはヒト網膜に1つではなく2つのcryptochromeシステムがあることを意味する。CRY1は青色錐体の光伝達機構に位置し（C1：感覚系）、CRY2は脳の概日時計に投射する神経節細胞にある（C2：概日系）。それらは異なる場所、異なる推定機能、眼の色との異なる関係を持つ。",
      "C1システム（青色錐体のCRY1）は虹彩の色素沈着に最も影響を受ける。青い目はこれらの特定の光受容体に約100倍多くの光を透過する。錐体外節の積層された膜ラメラは、CRYが方向性磁気受容に必要とする構造秩序を提供する（Majewska et al. 2025により確認：CRYは配向された形で脂質膜と結合する）。",
      "C2システム（神経節細胞のCRY2）はmelatonin産生を制御する概日システムである。これはイオンチャネルTRPC1と物理的複合体を形成し（Yap et al. 2025）、BERMの経路Aに直接結びつく。このシステムは虹彩の色素沈着の影響をより間接的に受けるが、FAD/B2の状態に同等に依存している。",
    ],
    section4Title: "検証可能な予測",
    epistemicTitle: "認識論的状態",
    epistemicText: "このページは検証可能な仮説（L*レベル）を提示する。エビデンスの連鎖における個々のリンクは実験的に確認されている（Eレベル：FAD→CRY安定性、FAD→磁気感受性、CRY光サイクル波長依存性）。全体的な統合――眼の色が磁気受容最適化のための適応であること――は直接テストされていない。上記の予測はこの不確実性を狭めるために設計されている。これは確立された科学ではない。公表された知見に基づいた体系的な研究提案である。",
    profileHeaders: {
      transmission: "虹彩透過率",
      cryActivation: "CRY活性化",
      cryStability: "CRY安定性",
      snr: "信号対雑音比",
      circadian: "概日プロファイル",
      magnetoreception: "磁気受容",
      sexPrevalence: "性別分布",
      adaptiveContext: "適応的文脈",
      geographic: "地理的分布",
    },
    nutrientHeaders: {
      nutrient: "栄養素",
      target: "CRY連鎖における標的",
      deficiency: "欠乏の影響",
      source: "主要出典",
      level: "レベル",
    },
    predictionHeaders: {
      discriminating: "弁別的",
      observational: "観察的",
      test: "テスト設計",
    },
    levelLabel: "エビデンスレベル",
    bermRelevance: "BERMとの関連性",
  },
  fr: {
    title: "Couleur des yeux et magnétoréception",
    subtitle: "Comment la pigmentation de l'iris, la nutrition et le sexe modulent la sensibilité de CRY",
    backLink: "← Retour aux preuves",
    section1Title: "Vos yeux sont des antennes",
    section1: [
      "Chaque oeil contient un capteur caché. Dans les cellules ganglionnaires de la rétine — pas les bâtonnets et les cônes que vous avez appris à l'école, mais une couche distincte de cellules plus proche de la surface — se trouve une protéine appelée cryptochrome. Cette protéine fait quelque chose de remarquable : elle absorbe la lumière bleue et utilise l'énergie pour créer des paires d'électrons dont les états de spin quantique sont sensibles au champ magnétique terrestre.",
      "Chez les oiseaux, ce système est une boussole. Les rouges-gorges européens l'utilisent pour naviguer sur des milliers de kilomètres. En 2011, des chercheurs ont montré que la version humaine du cryptochrome (CRY2) peut fonctionner comme magnétosenseur lorsqu'elle est placée dans des mouches drosophiles. En 2019, Chae et collègues ont démontré que des humains aux yeux bandés perdaient leur capacité à s'orienter vers les indices géomagnétiques, mais seulement lorsque la lumière bleue était retirée — la signature diagnostique du mécanisme cryptochrome.",
      "Quel rapport avec la couleur des yeux ? Tout.",
      "Les yeux bleus transmettent environ 100 fois plus de lumière à travers l'iris que les yeux bruns. Il ne s'agit pas de mieux voir — en fait, les personnes aux yeux bleus sont plus sensibles à l'éblouissement. La lumière supplémentaire atteint ces cellules ganglionnaires profondes où réside le cryptochrome. Plus de photons bleus signifie plus d'activation du cryptochrome, ce qui signifie un signal magnétique plus fort.",
      "Mais il y a une subtilité qui rend cette histoire plus riche que « yeux bleus = meilleure antenne ». La sensibilité magnétique du cryptochrome ne dépend pas de n'importe quelle lumière. Il a un cycle opérationnel en deux étapes : la lumière bleue (moins de 500 nm) l'active, et la lumière verte (500-570 nm) le maintient dans son état magnétiquement sensible. Trop de lumière bleue pousse en fait la protéine au-delà de son état sensible vers une forme inactive. C'est là que les yeux verts deviennent intéressants.",
      "Les yeux verts contiennent un filtre passe-bande naturel — un pigment jaune appelé lipochrome qui réduit sélectivement les longueurs d'onde bleues les plus courtes tout en transmettant la plage de 450-570 nm où le cryptochrome fonctionne le mieux. Le résultat n'est pas une sensibilité maximale mais une stabilité optimale : la protéine reste dans son état magnétiquement actif plus longtemps.",
      "Et voici peut-être la partie la plus surprenante : cela correspond aux différences entre les sexes. Les hommes ont plus souvent les yeux bleus. Les femmes ont plus souvent les yeux verts. Dans le cadre que nous explorons, ce n'est pas aléatoire — cela reflète des priorités biologiques différentes. L'aptitude reproductive des hommes dans les environnements ancestraux dépendait davantage de la navigation (chasse). Celle des femmes dépendait davantage de la stabilité circadienne (cycles hormonaux, grossesse, timing de l'ovulation). Les yeux bleus optimisent la sensibilité magnétique. Les yeux verts optimisent la résilience circadienne.",
      "Rien de tout cela n'a été prouvé comme théorie unifiée. Mais chaque maillon individuel est soutenu par des recherches publiées, et l'ensemble du tableau est testable. Ce qui suit constitue les preuves, pièce par pièce.",
    ],
    section2Title: "La chaîne de preuves",
    section3Title: "La synthèse",
    section3aTitle: "Trois couleurs d'yeux, trois profils magnétoréceptifs",
    section3bTitle: "Couche de modulation nutritionnelle",
    section3cTitle: "Optimisation de CRY spécifique au sexe",
    section3cText: [
      "Les hommes ont plus souvent les yeux bleus. Ils sont le sexe qui a montré la magnétoréception dans les tests comportementaux. Dans le cadre BERM, la voie reproductive masculine (fMale) dépend principalement de la qualité du sperme — une fonction de la voie A (VGIC → ROS). Mais leur avantage magnétoréceptif (yeux bleus → sensibilité CRY maximale) servait une fonction différente : la navigation spatiale pour la chasse, qui soutenait indirectement le succès reproductif.",
      "Les femmes ont plus souvent les yeux verts. Elles n'ont pas montré de magnétoréception dans les tests comportementaux. Dans le cadre BERM, la voie reproductive féminine (fFemale) dépend principalement de la stabilité circadienne — une fonction de la voie C (CRY → melatonin → GnRH → HPG). Les yeux verts optimisent précisément cela : le filtre lipochrome maintient CRY dans son état semiquinone magnétiquement sensible plus longtemps, produisant une oscillation circadienne plus stable.",
      "Le mécanisme de mosaïcisme du chromosome X (Bressan 2024) fournit l'explication génétique proximale. La pression adaptative spécifique au sexe fournit l'explication évolutive ultime : la sélection naturelle a préservé le mosaïcisme parce que les couleurs d'yeux intermédiaires chez les femmes étaient adaptativement avantageuses pour la fonction circadienne, tandis que le bleu extrême chez les hommes était avantageux pour la navigation magnétique.",
    ],
    fastingTitle: "Le paradoxe du jeûne",
    fastingText: [
      "Il y a une contradiction apparente dans les preuves. AMPK, le capteur de nutriments cellulaire qui s'active pendant le jeûne, phosphoryle CRY1 et le cible pour la dégradation (Lamia et al. 2009, Science). Pourtant, la seule étude montrant la magnétoréception humaine a utilisé des sujets à jeun (Chae 2019). Si le jeûne détruit la protéine même qui détecte les champs magnétiques, comment le jeûne peut-il améliorer la magnétoréception ?",
      "La résolution réside dans la qualité versus la quantité de CRY. Le jeûne dégrade les anciennes molécules de CRY via la voie AMPK-Ser71-FBXL3. Mais le jeûne augmente simultanément le pool de flavoprotéines oxydées via la bêta-oxydation des acides gras — ce qui signifie que plus de FAD est disponible. Quand la cellule synthétise des molécules de CRY de remplacement, elles sont chargées plus efficacement avec un chromophore FAD frais. Le résultat net : moins de molécules de CRY, mais chacune est mieux équipée pour la magnétoréception.",
      "Cela explique aussi pourquoi la carence chronique en B2 est bien plus dommageable que le jeûne aigu. Pendant un jeûne, le pool de FAD est maintenu ou amélioré par des ajustements métaboliques. Pendant une carence chronique en B2, le pool de FAD lui-même est épuisé — donc même quand de nouvelles CRY sont synthétisées, elles ne peuvent pas être correctement chargées avec leur chromophore essentiel. La protéine existe mais ne peut pas fonctionner.",
      "La résolution du paradoxe du jeûne est une hypothèse de niveau L*. Les étapes biochimiques individuelles (phosphorylation de CRY par AMPK, nécessité de FAD pour la fonction de CRY, bêta-oxydation pendant le jeûne) sont chacune des faits établis de niveau E. La synthèse — que la qualité nette de CRY s'améliore pendant le jeûne malgré une quantité moindre — n'a pas été directement testée.",
    ],
    bartolkeTitle: "Mise à jour 2025 : Deux systèmes CRY",
    bartolkeText: [
      "En 2025, le consortium QuantumBirds (Bartölke et al., FASEB J) a fait une découverte qui transforme l'hypothèse de la couleur des yeux. En utilisant des anticorps spécifiques du C-terminal, ils ont trouvé la protéine CRY1 pleine longueur exclusivement dans les segments externes des photorécepteurs à cônes sensibles aux courtes longueurs d'onde « bleus » — pas dans les cellules ganglionnaires, pas dans les bâtonnets, pas dans les autres types de cônes. Uniquement dans les cônes bleus.",
      "Cela signifie que la rétine humaine possède non pas un mais deux systèmes cryptochrome. CRY1 se trouve dans la machinerie de phototransduction des cônes bleus (C1 : sensoriel), tandis que CRY2 est dans les cellules ganglionnaires qui projettent vers l'horloge circadienne du cerveau (C2 : circadien). Ils ont des localisations différentes, des fonctions probables différentes et des relations différentes avec la couleur des yeux.",
      "Le système C1 (CRY1 dans les cônes bleus) est celui le plus affecté par la pigmentation de l'iris. Les yeux bleus transmettent environ 100 fois plus de lumière à ces photorécepteurs spécifiques. Les lamelles membranaires empilées des segments externes des cônes fournissent l'ordre structural dont CRY a besoin pour la magnétoréception directionnelle (confirmé par Majewska et al. 2025 : CRY s'associe aux membranes lipidiques de manière orientée).",
      "Le système C2 (CRY2 dans les cellules ganglionnaires) est le système circadien qui contrôle la production de melatonin. Il forme un complexe physique avec le canal ionique TRPC1 (Yap et al. 2025), le reliant directement à la voie A de BERM. Ce système est moins directement affecté par la pigmentation de l'iris mais tout aussi dépendant du statut FAD/B2.",
    ],
    section4Title: "Prédictions testables",
    epistemicTitle: "Statut épistémique",
    epistemicText: "Cette page présente une hypothèse testable (niveau L*). Les maillons individuels de la chaîne de preuves sont expérimentalement confirmés (niveau E : FAD→stabilité de CRY, FAD→sensibilité magnétique, dépendance en longueur d'onde du photocycle de CRY). La synthèse globale — que la couleur des yeux est une adaptation spécifiquement pour l'optimisation magnétoréceptive — n'a pas été directement testée. Les prédictions ci-dessus sont conçues pour réduire cette incertitude. Ce n'est pas de la science établie. C'est une proposition de recherche structurée fondée sur des résultats publiés.",
    profileHeaders: {
      transmission: "Transmission de l'iris",
      cryActivation: "Activation de CRY",
      cryStability: "Stabilité de CRY",
      snr: "Rapport signal/bruit",
      circadian: "Profil circadien",
      magnetoreception: "Magnétoréception",
      sexPrevalence: "Prévalence par sexe",
      adaptiveContext: "Contexte adaptatif",
      geographic: "Distribution géographique",
    },
    nutrientHeaders: {
      nutrient: "Nutriment",
      target: "Cible dans la chaîne CRY",
      deficiency: "Effet de carence",
      source: "Source clé",
      level: "Niveau",
    },
    predictionHeaders: {
      discriminating: "Discriminant",
      observational: "Observationnel",
      test: "Protocole de test",
    },
    levelLabel: "Niveau de preuve",
    bermRelevance: "Pertinence BERM",
  },
  ko: {
    title: "눈 색깔과 자기수용",
    subtitle: "홍채 색소, 영양, 성별이 CRY 민감도를 어떻게 조절하는가",
    backLink: "← 증거로 돌아가기",
    section1Title: "당신의 눈은 안테나이다",
    section1: [
      "모든 눈에는 숨겨진 센서가 있다. 망막 신경절 세포에 — 학교에서 배운 간상체나 원추체가 아닌, 표면에 더 가까운 별도의 세포층에 — cryptochrome이라는 단백질이 있다. 이 단백질은 놀라운 일을 한다: 청색광을 흡수하고 그 에너지를 사용하여 지구 자기장에 민감한 양자 스핀 상태를 가진 전자 쌍을 생성한다.",
      "조류에서 이 시스템은 나침반이다. 유럽울새는 이것을 사용하여 수천 킬로미터를 이동한다. 2011년, 연구자들은 인간 버전의 cryptochrome(CRY2)이 초파리에 도입되었을 때 자기 센서로 기능할 수 있음을 보여주었다. 2019년, Chae 등은 눈을 가린 인간이 지자기 단서에 대한 방향 감각을 잃는 것을 입증했지만, 청색광이 제거되었을 때만 그러했다 — cryptochrome 메커니즘의 진단적 특징이다.",
      "이것이 눈 색깔과 무슨 관계가 있는가? 전부이다.",
      "파란 눈은 갈색 눈보다 홍채를 통해 약 100배 더 많은 빛을 투과한다. 이는 더 잘 보는 것이 아니다 — 사실 파란 눈을 가진 사람들은 눈부심에 더 민감하다. 추가적인 빛은 cryptochrome이 존재하는 깊은 신경절 세포에 도달한다. 더 많은 청색 광자는 더 많은 cryptochrome 활성화를 의미하며, 더 강한 자기 신호를 의미한다.",
      "그러나 '파란 눈 = 더 좋은 안테나'보다 이야기를 더 풍부하게 만드는 미묘함이 있다. Cryptochrome의 자기 민감도는 아무 빛에나 의존하지 않는다. 2단계 작동 주기가 있다: 청색광(500 nm 미만)이 활성화하고, 녹색광(500-570 nm)이 자기적으로 민감한 상태를 유지한다. 과도한 청색광은 실제로 단백질을 민감한 상태를 넘어 비활성 형태로 밀어낸다. 여기서 녹색 눈이 흥미로워진다.",
      "녹색 눈에는 천연 대역통과 필터 — lipochrome이라는 황색 색소 — 가 포함되어 있으며, cryptochrome이 가장 효율적으로 작동하는 450-570 nm 범위를 투과하면서 가장 짧은 청색 파장을 선택적으로 감소시킨다. 결과는 최대 민감도가 아닌 최적의 안정성이다: 단백질이 자기적으로 활성인 상태에 더 오래 머문다.",
      "그리고 아마도 가장 놀라운 부분이 있다: 이것은 성차에 대응한다. 남성은 파란 눈을 가질 가능성이 더 높다. 여성은 녹색 눈을 가질 가능성이 더 높다. 우리가 탐구하는 프레임워크에서 이것은 무작위가 아니다 — 서로 다른 생물학적 우선순위를 반영한다. 조상 환경에서 남성의 생식 적합도는 탐색(사냥)에 더 의존했다. 여성의 것은 일주기 안정성(호르몬 주기, 임신, 배란 시기)에 더 의존했다. 파란 눈은 자기 민감도를 최적화한다. 녹색 눈은 일주기 회복력을 최적화한다.",
      "이 중 어느 것도 통합 이론으로 증명되지 않았다. 그러나 각각의 개별 연결고리는 출판된 연구에 의해 뒷받침되며, 전체 그림은 검증 가능하다. 다음은 그 증거이다.",
    ],
    section2Title: "증거의 사슬",
    section3Title: "종합",
    section3aTitle: "세 가지 눈 색깔, 세 가지 자기수용 프로파일",
    section3bTitle: "영양 조절 레이어",
    section3cTitle: "성별 특이적 CRY 최적화",
    section3cText: [
      "남성은 더 자주 파란 눈을 가진다. 그들은 행동 실험에서 자기수용을 보인 성별이다. BERM 프레임워크에서 남성의 생식 경로(fMale)는 주로 정자의 질에 의존한다 — 경로 A(VGIC → ROS)의 기능이다. 그러나 그들의 자기수용적 이점(파란 눈 → 최대 CRY 민감도)은 다른 기능을 수행했다: 사냥을 위한 공간 탐색이며, 간접적으로 생식 성공을 지원했다.",
      "여성은 더 자주 녹색 눈을 가진다. 그들은 행동 실험에서 자기수용을 보이지 않았다. BERM 프레임워크에서 여성의 생식 경로(fFemale)는 주로 일주기 안정성에 의존한다 — 경로 C(CRY → melatonin → GnRH → HPG)의 기능이다. 녹색 눈은 정확히 이것을 최적화한다: lipochrome 필터가 CRY를 자기적으로 민감한 semiquinone 상태에 더 오래 유지하여, 더 안정적인 일주기 진동을 생성한다.",
      "X 염색체 모자이시즘 메커니즘(Bressan 2024)은 근접 유전적 설명을 제공한다. 성별 특이적 적응 압력은 궁극적 진화적 설명을 제공한다: 자연선택이 모자이시즘을 보존한 것은 여성에서의 중간 눈 색깔이 일주기 기능에 적응적으로 유리했고, 남성에서의 극단적 파란색은 자기 탐색에 유리했기 때문이다.",
    ],
    fastingTitle: "단식의 역설",
    fastingText: [
      "증거에 명백한 모순이 있다. AMPK(단식 시 활성화되는 세포의 영양 센서)는 CRY1을 인산화하여 분해 대상으로 지정한다(Lamia et al. 2009, Science). 그러나 인간 자기수용을 보여준 유일한 연구는 공복 상태의 피험자를 사용했다(Chae 2019). 단식이 자기장을 감지하는 바로 그 단백질을 파괴한다면, 어떻게 단식이 자기수용을 향상시킬 수 있는가?",
      "해답은 CRY의 질 대 양에 있다. 단식은 AMPK-Ser71-FBXL3 경로를 통해 오래된 CRY 분자를 분해한다. 그러나 단식은 동시에 지방산 beta 산화를 통해 산화된 flavoprotein 풀을 증가시킨다 — 즉 더 많은 FAD가 이용 가능해진다. 세포가 대체 CRY 분자를 합성할 때, 그것들은 신선한 FAD chromophore로 더 효율적으로 장착된다. 순 결과: 더 적은 CRY 분자이지만, 각각이 자기수용에 더 잘 장비되어 있다.",
      "이것은 또한 만성 B2 결핍이 급성 단식보다 훨씬 더 해로운 이유를 설명한다. 단식 중에 FAD 풀은 대사 전환에 의해 유지되거나 향상된다. 만성 B2 결핍 중에는 FAD 풀 자체가 고갈된다 — 따라서 새로운 CRY가 합성되어도 필수 chromophore를 적절히 장착할 수 없다. 단백질은 존재하지만 기능할 수 없다.",
      "단식 역설의 해결은 L* 수준의 가설이다. 개별 생화학적 단계들(AMPK에 의한 CRY 인산화, CRY 기능을 위한 FAD 필요성, 단식 중 beta 산화)은 각각 E 수준의 확립된 사실이다. 종합 — 단식 중 더 낮은 양에도 불구하고 CRY의 순 질이 개선된다는 것 — 은 직접 테스트되지 않았다.",
    ],
    bartolkeTitle: "2025 업데이트: 두 개의 CRY 시스템",
    bartolkeText: [
      "2025년, QuantumBirds 컨소시엄(Bartölke et al., FASEB J)이 눈 색깔 가설을 변혁하는 발견을 했다. C 말단 특이적 항체를 사용하여, 그들은 전체 길이 CRY1 단백질을 단파장 민감 '파란' 원추 광수용체의 외절 부분에서만 발견했다 — 신경절 세포에서가 아니라, 간상체에서가 아니라, 다른 원추 유형에서가 아니라. 오직 파란 원추에서만.",
      "이것은 인간 망막에 하나가 아닌 두 개의 cryptochrome 시스템이 있음을 의미한다. CRY1은 파란 원추의 광전달 기구에 위치하고(C1: 감각), CRY2는 뇌의 일주기 시계로 투사하는 신경절 세포에 있다(C2: 일주기). 그들은 다른 위치, 다른 추정 기능, 눈 색깔과의 다른 관계를 가진다.",
      "C1 시스템(파란 원추의 CRY1)은 홍채 색소에 가장 많이 영향을 받는다. 파란 눈은 이 특정 광수용체에 약 100배 더 많은 빛을 투과한다. 원추 외절의 적층된 막 라멜라는 CRY가 방향성 자기수용에 필요한 구조적 질서를 제공한다(Majewska et al. 2025에 의해 확인: CRY는 방향성 있게 지질 막과 결합한다).",
      "C2 시스템(신경절 세포의 CRY2)은 melatonin 생산을 제어하는 일주기 시스템이다. 이것은 이온 채널 TRPC1과 물리적 복합체를 형성하며(Yap et al. 2025), BERM의 경로 A에 직접 연결된다. 이 시스템은 홍채 색소에 의해 덜 직접적으로 영향을 받지만 FAD/B2 상태에 동등하게 의존한다.",
    ],
    section4Title: "검증 가능한 예측",
    epistemicTitle: "인식론적 상태",
    epistemicText: "이 페이지는 검증 가능한 가설(L* 수준)을 제시한다. 증거 사슬의 개별 연결고리는 실험적으로 확인되었다(E 수준: FAD→CRY 안정성, FAD→자기 민감도, CRY 광주기 파장 의존성). 전체적 종합 — 눈 색깔이 특히 자기수용 최적화를 위한 적응이라는 것 — 은 직접 테스트되지 않았다. 위의 예측은 이 불확실성을 좁히기 위해 설계되었다. 이것은 확립된 과학이 아니다. 출판된 연구 결과에 기반한 체계적 연구 제안이다.",
    profileHeaders: {
      transmission: "홍채 투과율",
      cryActivation: "CRY 활성화",
      cryStability: "CRY 안정성",
      snr: "신호 대 잡음비",
      circadian: "일주기 프로파일",
      magnetoreception: "자기수용",
      sexPrevalence: "성별 분포",
      adaptiveContext: "적응적 맥락",
      geographic: "지리적 분포",
    },
    nutrientHeaders: {
      nutrient: "영양소",
      target: "CRY 사슬의 표적",
      deficiency: "결핍 효과",
      source: "주요 출처",
      level: "수준",
    },
    predictionHeaders: {
      discriminating: "변별적",
      observational: "관찰적",
      test: "테스트 설계",
    },
    levelLabel: "증거 수준",
    bermRelevance: "BERM 관련성",
  },
} as const;

const EYE_COLOR_STYLES: Record<string, { border: string; bg: string; text: string }> = {
  blue: { border: "border-blue-400/40", bg: "bg-blue-500/5", text: "text-blue-400" },
  green: { border: "border-emerald-400/40", bg: "bg-emerald-500/5", text: "text-emerald-400" },
  brown: { border: "border-amber-600/40", bg: "bg-amber-600/5", text: "text-amber-600" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EyeColorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFi = locale === "fi";
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-4xl mx-auto overflow-x-clip px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Eye} title={d.title} subtitle={d.subtitle} />

      {/* Section 1: Your Eyes Are Antennas */}
      <section className="mb-16">
        <h2 className="editorial-section-heading mb-6">{d.section1Title}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl">
          {d.section1.map((paragraph, i) => (
            <p key={i} className={i === 2 ? "font-semibold text-accent" : ""}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Section 2: The Evidence Chain */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section2Title}</h2>
        <div className="space-y-6">
          {EVIDENCE_CARDS.map((card, i) => {
            const levelColor = CHAIN_EPISTEMIC_COLORS[card.level as keyof typeof CHAIN_EPISTEMIC_COLORS] ?? "#6B7280";
            const levelInfo = EPISTEMIC_LEVELS[card.level];
            return (
              <article
                key={card.id}
                className="rounded-lg border border-card-border bg-card-bg p-5"
              >
                <div className="mb-3 flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
                  <h3 className="min-w-0 text-lg font-semibold">
                    <span className="font-mono-num text-xs text-accent mr-2">{String(i + 1).padStart(2, "0")}</span>
                    {isFi ? card.title_fi : card.title_en}
                  </h3>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: `${levelColor}20`, color: levelColor, border: `1px solid ${levelColor}40` }}
                  >
                    {card.level} — {levelInfo ? (isFi ? levelInfo.label_fi : levelInfo.label_en) : card.level}
                  </span>
                </div>

                <p className="text-xs text-foreground-muted mb-1">
                  {card.referenceId ? (
                    <StudyCitation
                      referenceId={card.referenceId}
                      locale={locale}
                      label={`${card.authors} (${card.year}). ${card.journal}.`}
                    />
                  ) : (
                    <>
                      {card.authors} ({card.year}). <span className="italic">{card.journal}</span>.
                      {card.doi && <> DOI: {card.doi}</>}
                    </>
                  )}
                </p>

                <div className="mt-3 rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">{d.levelLabel}: {card.level}</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {isFi ? card.finding_fi : card.finding_en}
                  </p>
                </div>

                {(card.berm_relevance_en || card.berm_relevance_fi) && (
                  <div className="mt-3 rounded border border-accent/30 bg-background p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">{d.bermRelevance}</p>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {isFi ? card.berm_relevance_fi : card.berm_relevance_en}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 3: The Synthesis */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section3Title}</h2>

        {/* 3A: Three eye color profiles */}
        <h3 className="text-lg font-semibold mb-4">{d.section3aTitle}</h3>
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          {EYE_PROFILES.map((profile) => {
            const style = EYE_COLOR_STYLES[profile.color] ?? EYE_COLOR_STYLES.brown;
            return (
              <div key={profile.color} className={`rounded-lg border ${style.border} ${style.bg} p-4`}>
                <h4 className={`font-semibold mb-3 ${style.text}`}>
                  {isFi ? profile.label_fi : profile.label_en}
                </h4>
                <dl className="space-y-2 text-xs">
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.transmission}</dt><dd className="text-foreground">{profile.transmission}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.cryActivation}</dt><dd className="text-foreground">{profile.cry_activation}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.cryStability}</dt><dd className="text-foreground">{profile.cry_stability}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.snr}</dt><dd className="text-foreground">{profile.snr}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.circadian}</dt><dd className="text-foreground">{profile.circadian}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.magnetoreception}</dt><dd className="text-foreground">{profile.magnetoreception}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.sexPrevalence}</dt><dd className="text-foreground">{profile.sex_prevalence}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.adaptiveContext}</dt><dd className="text-foreground">{isFi ? profile.adaptive_context_fi : profile.adaptive_context_en}</dd></div>
                  <div><dt className="font-semibold text-foreground-muted">{d.profileHeaders.geographic}</dt><dd className="text-foreground">{profile.geographic}</dd></div>
                </dl>
              </div>
            );
          })}
        </div>

        {/* 3B: Nutritional modulation */}
        <h3 className="text-lg font-semibold mb-4">{d.section3bTitle}</h3>
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.nutrientHeaders.nutrient}</th>
                <th className="py-2 pr-3">{d.nutrientHeaders.target}</th>
                <th className="py-2 pr-3">{d.nutrientHeaders.deficiency}</th>
                <th className="py-2 pr-3 w-32">{d.nutrientHeaders.source}</th>
                <th className="py-2 w-12">{d.nutrientHeaders.level}</th>
              </tr>
            </thead>
            <tbody>
              {NUTRITIONAL_MODULATORS.map((mod) => {
                const levelColor = CHAIN_EPISTEMIC_COLORS[mod.level as keyof typeof CHAIN_EPISTEMIC_COLORS] ?? "#6B7280";
                return (
                  <tr key={mod.nutrient} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-medium text-foreground">{mod.nutrient}</td>
                    <td className="py-2 pr-3 text-foreground-muted">{mod.target}</td>
                    <td className="py-2 pr-3 text-foreground-muted">{isFi ? mod.deficiency_effect_fi : mod.deficiency_effect_en}</td>
                    <td className="py-2 pr-3 text-foreground-muted text-xs">
                      {mod.referenceIds?.length
                        ? mod.referenceIds.map((referenceId, index) => (
                            <span key={referenceId}>
                              {index > 0 ? ", " : null}
                              <StudyCitation referenceId={referenceId} locale={locale} />
                            </span>
                          ))
                        : mod.key_source}
                    </td>
                    <td className="py-2">
                      <span className="rounded-full px-1.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${levelColor}20`, color: levelColor }}>
                        {mod.level}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 3C: Sex-specific CRY optimization */}
        <h3 className="text-lg font-semibold mb-4">{d.section3cTitle}</h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-3xl mb-8">
          {d.section3cText.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Bartölke 2025: Two CRY Systems */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.bartolkeTitle}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl">
          {d.bartolkeText.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Fasting Paradox */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.fastingTitle}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl">
          {d.fastingText.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Section 4: Testable Predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section4Title}</h2>
        <div className="space-y-4">
          {PREDICTIONS.map((pred) => (
            <article key={pred.id} className="rounded-lg border border-card-border bg-card-bg p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-sm">
                  <span className="font-mono-num text-xs text-accent mr-2">{pred.id}</span>
                  {isFi ? pred.title_fi : pred.title_en}
                </h3>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  pred.discriminating
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                }`}>
                  {pred.discriminating ? d.predictionHeaders.discriminating : d.predictionHeaders.observational}
                </span>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                <span className="font-semibold text-foreground">{d.predictionHeaders.test}: </span>
                {isFi ? pred.test_fi : pred.test_en}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Epistemic note */}
      <div className="rounded-xl border border-status-partial/30 bg-status-partial/5 p-5">
        <h3 className="font-semibold mb-2">{d.epistemicTitle}</h3>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.epistemicText}</p>
      </div>
    </div>
  );
}
