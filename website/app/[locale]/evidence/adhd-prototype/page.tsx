import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "ADHD: The Second Prototype",
    subtitle: "ADHD unites three BERM mechanisms — dopamine deficit in PFC, myelination delay via Cav1.2, and E/I shift via KCC2 — into a neurodevelopmental phenotype. ASD and ADHD share 30-50% comorbidity because they represent different points on the same Q-factor spectrum.",
    backLink: "← Back to Evidence",
    cautionText: "This page proposes ADHD as a second BERM prototype. While PFC maturation delay, dopamine disruption, and myelination timing are established ADHD mechanisms, linking them to EMF exposure is a BERM hypothesis requiring direct testing.",

    mechTitle: "Three converging mechanisms",
    mechLead: "ADHD emerges when three BERM pathways converge on prefrontal cortex function: dopamine deficit, myelination delay, and E/I shift. Each mechanism is independently documented; their convergence on PFC explains the clinical phenotype.",
    mechanisms: [
      { id: "M1", name: "DA↓ in PFC (VK19: striatum -25%)", path: "EMF → Ca²⁺↑ → CaMKII disruption → DA synthesis↓ → PFC DA deficit → attention↓, inhibition↓", detail: "PFC requires OPTIMAL dopamine (Goldilocks principle): too low → ADHD; too high → psychosis. VK19 demonstrates striatal dopamine reduction of 25% under EMF exposure. DA synthesis requires CaMKII, which depends on precise Ca²⁺ signaling — EMF disrupts CaMKII → DA↓. The inverted-U dose-response of DA in PFC means even moderate depletion collapses executive function.", color: "green" },
      { id: "M2", name: "Myelination delay (VK20: Cav1.2→OPC)", path: "EMF → Cav1.2 disruption → OPC maturation↓ → PFC myelination delayed → PFC matures 5 YEARS later", detail: "PFC is the LAST brain region to myelinate, completing only in the mid-20s. Shaw 2007 (PNAS) showed ADHD cortex reaches peak thickness 5 years later than controls. VK20 identifies the mechanism: Cav1.2 channels regulate oligodendrocyte precursor cell (OPC) maturation. EMF-induced Cav1.2 disruption delays OPC differentiation → myelination delay → PFC is the most vulnerable region because it myelinates last.", color: "green" },
      { id: "M3", name: "E/I shift (VK6: KCC2↓ + VK4: α2δ-1↑)", path: "EMF → KCC2 maturation↓ + α2δ-1↑ → E/I↑ → impulse control↓", detail: "The same E/I imbalance mechanism as ASD but at a LOWER Q value: fewer seizures (epilepsy 5-10% vs. 38% in ASD), less sensory hypersensitivity, but impaired impulse control and sustained attention. KCC2 delay keeps GABA excitatory in PFC circuits responsible for behavioral inhibition. α2δ-1 upregulation adds excitatory drive.", color: "green" },
    ],

    spectrumTitle: "ASD-ADHD spectrum",
    spectrumLead: "ASD and ADHD are not separate disorders but different positions on the same E/I spectrum, modulated by Q-factor value and regional vulnerability.",
    spectrumPoints: [
      "ASD + ADHD comorbidity: 30-50% — far too high for coincidence, expected if both share the same mechanistic root",
      "Same mechanism (E/I↑), different Q values: ASD = high Q (epilepsy 38%), ADHD = moderate Q (epilepsy 5-10%)",
      "CACNA1C variants modulate position on spectrum: gain-of-function → ASD features; partial disruption → ADHD features",
      "Both respond to treatments targeting the same pathways: bumetanide (GABA polarity), atomoxetine (noradrenergic PFC rescue), behavioral therapies targeting executive function",
    ],

    prevTitle: "Prevalence increase explained",
    prevLead: "ADHD prevalence has risen sharply since the 1990s. BERM identifies a convergence of EMF-driven and EMF-adjacent factors that compound the dopamine deficit.",
    prevPoints: [
      { factor: "EMF → DA↓", detail: "Direct dopamine synthesis reduction via CaMKII disruption (VK19). Increasing ambient EMF exposure correlates with the prevalence timeline." },
      { factor: "Myelination delay", detail: "EMF → Cav1.2 → OPC maturation↓ → PFC development delayed. Earlier and more intense EMF exposure during development shifts the myelination curve." },
      { factor: "GABA switch delay", detail: "EMF → KCC2↓ → GABA stays excitatory longer in PFC circuits → impulse control fails to develop on schedule." },
      { factor: "LED screen time (compound)", detail: "Screen time is not just behavioral — LED screens emit intermediate-frequency EMF + blue light suppresses melatonin + low DA makes screens MORE rewarding (hyperbolic discounting). The EMF-driven DA deficit creates a vicious cycle: DA↓ → screens more rewarding → more screen time → more IF exposure → DA↓↓." },
    ],

    pharmaTitle: "Pharmacological validation",
    pharmaLead: "ADHD medications correct the exact disruptions that BERM predicts EMF produces. This is convergent validation: if the mechanism is wrong, the drugs should not work the way they do.",
    pharmaPoints: [
      "Methylphenidate/amphetamine: increase DA in PFC → symptoms improve. These drugs directly compensate for the VK19 dopamine deficit.",
      "Same Ca²⁺ cascade: DA synthesis requires CaMKII; EMF disrupts CaMKII → DA↓. Stimulants bypass the synthesis bottleneck by blocking reuptake/promoting release.",
      "Atomoxetine: norepinephrine reuptake inhibitor → also improves PFC function. PFC uses both DA and NE; atomoxetine rescues the catecholamine deficit via a parallel pathway.",
      "Guanfacine (α2A agonist): strengthens PFC network connectivity. Effective in ADHD because PFC networks are weakened by the same myelination delay VK20 identifies.",
    ],

    predictionText: "Prediction E-NEW-24 (EMF reduction during PFC-critical developmental window reduces ADHD symptom severity in genetically susceptible children) is directly testable in a prospective cohort design.",
    predictionLink: "See predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "ADHD: Toinen prototyyppi",
    subtitle: "ADHD yhdistää kolme BERM-mekanismia — dopamiinivajeen PFC:ssä, myelinaation viiveen Cav1.2:n kautta ja E/I-siirtymän KCC2:n kautta — neurokehitykselliseksi fenotyypiksi. ASD:n ja ADHD:n 30-50 %:n komorbiditeetti selittyy sillä, että ne edustavat eri pisteitä samalla Q-tekijäspektrillä.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Tämä sivu ehdottaa ADHD:tä toisena BERM-prototyyppinä. Vaikka PFC:n kypsymisviive, dopamiinihäiriö ja myelinaation ajoitus ovat vakiintuneita ADHD-mekanismeja, niiden yhdistäminen EMF-altistukseen on BERM-hypoteesi joka vaatii suoraa testausta.",

    mechTitle: "Kolme yhtyvää mekanismia",
    mechLead: "ADHD syntyy kun kolme BERM-reittiä yhtyvät prefrontaalisen aivokuoren toimintaan: dopamiinivaje, myelinaation viive ja E/I-siirtymä. Jokainen mekanismi on itsenäisesti dokumentoitu; niiden yhdentyminen PFC:hen selittää kliinisen fenotyypin.",
    mechanisms: [
      { id: "M1", name: "DA↓ PFC:ssä (VK19: striatumi -25 %)", path: "EMF → Ca²⁺↑ → CaMKII-häiriö → DA-synteesi↓ → PFC:n DA-vaje → tarkkaavaisuus↓, inhibitio↓", detail: "PFC vaatii OPTIMAALISEN dopamiinin (Kultakutri-periaate): liian vähän → ADHD; liian paljon → psykoosi. VK19 osoittaa striataalisen dopamiinin 25 %:n vähenemisen EMF-altistuksessa. DA-synteesi vaatii CaMKII:n, joka riippuu tarkasta Ca²⁺-signaloinnista — EMF häiritsee CaMKII:ta → DA↓. DA:n käänteis-U-annos-vaste PFC:ssä tarkoittaa, että jo kohtalainen vähennys romahduttaa toiminnanohjauksen.", color: "green" },
      { id: "M2", name: "Myelinaation viive (VK20: Cav1.2→OPC)", path: "EMF → Cav1.2-häiriö → OPC-kypsyminen↓ → PFC:n myelinaatio viivästyy → PFC kypsyy 5 VUOTTA myöhemmin", detail: "PFC on aivojen VIIMEINEN myelinoituva alue, valmistuen vasta 25-vuotiaana. Shaw 2007 (PNAS) osoitti ADHD-aivokuoren saavuttavan huippupaksuuden 5 vuotta kontrolleja myöhemmin. VK20 tunnistaa mekanismin: Cav1.2-kanavat säätelevät oligodendrosyyttien esiastesolujen (OPC) kypsymistä. EMF-aiheutettu Cav1.2-häiriö viivästyttää OPC-erilaistumista → myelinaation viive → PFC on haavoittuvin alue koska se myelinoituu viimeisenä.", color: "green" },
      { id: "M3", name: "E/I-siirtymä (VK6: KCC2↓ + VK4: α2δ-1↑)", path: "EMF → KCC2-kypsyminen↓ + α2δ-1↑ → E/I↑ → impulssikontrolli↓", detail: "Sama E/I-epätasapainomekanismi kuin ASD:ssä mutta MATALAMMALLA Q-arvolla: vähemmän kohtauksia (epilepsia 5-10 % vs. 38 % ASD:ssä), vähemmän sensorista yliherkkyyttä, mutta heikentynyt impulssikontrolli ja jatkuva tarkkaavaisuus. KCC2-viive pitää GABAn eksitatorisena PFC-piireissä jotka vastaavat käyttäytymisen inhibitiosta. α2δ-1-ylössäätely lisää eksitatorista ajuria.", color: "green" },
    ],

    spectrumTitle: "ASD-ADHD-spektri",
    spectrumLead: "ASD ja ADHD eivät ole erillisiä häiriöitä vaan eri sijainteja samalla E/I-spektrillä, joita Q-tekijän arvo ja alueellinen haavoittuvuus säätelevät.",
    spectrumPoints: [
      "ASD + ADHD komorbiditeetti: 30-50 % — aivan liian korkea sattumaksi, odotettavissa jos molemmat jakavat saman mekanistisen juurisyyn",
      "Sama mekanismi (E/I↑), eri Q-arvot: ASD = korkea Q (epilepsia 38 %), ADHD = kohtalainen Q (epilepsia 5-10 %)",
      "CACNA1C-variantit säätelevät sijaintia spektrillä: gain-of-function → ASD-piirteet; osittainen häiriö → ADHD-piirteet",
      "Molemmat vastaavat hoitoihin jotka kohdistuvat samoihin reitteihin: bumetanidi (GABA-polariteetti), atomoksetiini (noradrenerginen PFC-pelastus), käyttäytymisterapiat jotka kohdistuvat toiminnanohjaukseen",
    ],

    prevTitle: "Esiintyvyyden kasvu selitettynä",
    prevLead: "ADHD:n esiintyvyys on noussut jyrkästi 1990-luvulta lähtien. BERM tunnistaa EMF-peräisten ja EMF-liitännäisten tekijöiden yhdentymisen joka voimistaa dopamiinivajetta.",
    prevPoints: [
      { factor: "EMF → DA↓", detail: "Suora dopamiinisynteesin väheneminen CaMKII-häiriön kautta (VK19). Kasvava ympäristön EMF-altistus korreloi esiintyvyyden aikajanan kanssa." },
      { factor: "Myelinaation viive", detail: "EMF → Cav1.2 → OPC-kypsyminen↓ → PFC:n kehitys viivästyy. Aikaisempi ja intensiivisempi EMF-altistus kehityksen aikana siirtää myelinaatiokäyrää." },
      { factor: "GABA-vaihdon viive", detail: "EMF → KCC2↓ → GABA pysyy eksitatorisena pidempään PFC-piireissä → impulssikontrolli ei kehity aikataulussa." },
      { factor: "LED-ruutuaika (yhdiste)", detail: "Ruutuaika ei ole vain käyttäytymiskysymys — LED-näytöt emittoivat keskitaajuista EMF:ää + sininen valo tukahduttaa melatoniinia + matala DA tekee näytöistä PALKITSEVAMPIA (hyperbolinen diskonttaus). EMF-peräinen DA-vaje luo noidankehän: DA↓ → näytöt palkitsevampia → enemmän ruutuaikaa → enemmän IF-altistusta → DA↓↓." },
    ],

    pharmaTitle: "Farmakologinen todentaminen",
    pharmaLead: "ADHD-lääkkeet korjaavat täsmälleen ne häiriöt joita BERM ennustaa EMF:n tuottavan. Tämä on yhtenevä todentaminen: jos mekanismi on väärä, lääkkeiden ei pitäisi toimia niin kuin ne toimivat.",
    pharmaPoints: [
      "Metyylifenidaatti/amfetamiini: lisäävät DA:ta PFC:ssä → oireet paranevat. Nämä lääkkeet kompensoivat suoraan VK19:n dopamiinivajetta.",
      "Sama Ca²⁺-kaskadi: DA-synteesi vaatii CaMKII:n; EMF häiritsee CaMKII:ta → DA↓. Stimulantit ohittavat synteesipullonkaulan estämällä takaisinoton/edistämällä vapautumista.",
      "Atomoksetiini: noradrenaliinin takaisinoton estäjä → parantaa myös PFC:n toimintaa. PFC käyttää sekä DA:ta että NE:tä; atomoksetiini pelastaa katekoliamiinivajeen rinnakkaisen reitin kautta.",
      "Guanfasiini (α2A-agonisti): vahvistaa PFC-verkoston yhteyksiä. Tehokas ADHD:ssä koska PFC-verkostot ovat heikentyneet saman myelinaatioviiveen vuoksi jonka VK20 tunnistaa.",
    ],

    predictionText: "Ennuste E-NEW-24 (EMF-vähennys PFC:n kriittisen kehitysikkunan aikana vähentää ADHD-oireiden vakavuutta geneettisesti alttiilla lapsilla) on suoraan testattavissa prospektiivisella kohorttiasetelmalla.",
    predictionLink: "Ks. ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "ADHD：第二のプロトタイプ",
    subtitle: "ADHDは3つのBERMメカニズム — PFCにおけるドーパミン欠乏、Cav1.2を介した髄鞘化遅延、KCC2を介したE/Iシフト — を神経発達表現型に統合する。ASDとADHDの30-50%の併存率は、両者が同じQ因子スペクトル上の異なる位置を表すことで説明される。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページはADHDを第二のBERMプロトタイプとして提案する。PFCの成熟遅延、ドーパミン障害、髄鞘化のタイミングはADHDの確立されたメカニズムであるが、これらをEMF曝露と結びつけることは直接的な検証を要するBERM仮説である。",

    mechTitle: "3つの収束メカニズム",
    mechLead: "ADHDは3つのBERM経路が前頭前皮質機能に収束することで生じる：ドーパミン欠乏、髄鞘化遅延、E/Iシフト。各メカニズムは独立して文書化されており、PFCへの収束が臨床表現型を説明する。",
    mechanisms: [
      { id: "M1", name: "PFCにおけるDA↓（VK19：線条体 -25%）", path: "EMF → Ca²⁺↑ → CaMKII障害 → DA合成↓ → PFC DA欠乏 → 注意力↓、抑制↓", detail: "PFCは最適なドーパミンを必要とする（ゴルディロックス原理）：低すぎる → ADHD、高すぎる → 精神病。VK19はEMF曝露下で線条体ドーパミンの25%減少を示す。DA合成にはCaMKIIが必要であり、CaMKIIは正確なCa²⁺シグナリングに依存する — EMFがCaMKIIを障害 → DA↓。PFCにおけるDAの逆U字用量反応は、中程度の減少でも実行機能が崩壊することを意味する。", color: "green" },
      { id: "M2", name: "髄鞘化遅延（VK20：Cav1.2→OPC）", path: "EMF → Cav1.2障害 → OPC成熟↓ → PFC髄鞘化遅延 → PFCの成熟が5年遅延", detail: "PFCは脳で最後に髄鞘化する領域であり、20代半ばにようやく完了する。Shaw 2007（PNAS）はADHD皮質のピーク厚が対照群より5年遅れることを示した。VK20がそのメカニズムを特定：Cav1.2チャネルがオリゴデンドロサイト前駆細胞（OPC）の成熟を制御する。EMF誘発性のCav1.2障害がOPC分化を遅延 → 髄鞘化遅延 → PFCは最後に髄鞘化するため最も脆弱な領域となる。", color: "green" },
      { id: "M3", name: "E/Iシフト（VK6：KCC2↓ + VK4：α2δ-1↑）", path: "EMF → KCC2成熟↓ + α2δ-1↑ → E/I↑ → 衝動制御↓", detail: "ASDと同じE/I不均衡メカニズムだが、より低いQ値で：てんかんは少なく（5-10% vs. ASDの38%）、感覚過敏も少ないが、衝動制御と持続的注意が障害される。KCC2遅延により、行動抑制を担うPFC回路でGABAが興奮性のまま維持される。α2δ-1上方制御が興奮性駆動を追加する。", color: "green" },
    ],

    spectrumTitle: "ASD-ADHDスペクトル",
    spectrumLead: "ASDとADHDは別々の障害ではなく、Q因子値と領域脆弱性によって調節される同じE/Iスペクトル上の異なる位置である。",
    spectrumPoints: [
      "ASD + ADHD併存率：30-50% — 偶然としてはあまりにも高く、両者が同じ機構的根源を共有するならば予測される",
      "同じメカニズム（E/I↑）、異なるQ値：ASD = 高Q（てんかん38%）、ADHD = 中程度Q（てんかん5-10%）",
      "CACNA1C変異がスペクトル上の位置を調節：機能獲得型 → ASD特性、部分的障害 → ADHD特性",
      "両者は同じ経路を標的とする治療に反応：ブメタニド（GABA極性）、アトモキセチン（ノルアドレナリン性PFC救済）、実行機能を標的とする行動療法",
    ],

    prevTitle: "有病率増加の説明",
    prevLead: "ADHDの有病率は1990年代以降急激に上昇している。BERMはドーパミン欠乏を増幅するEMF駆動因子とEMF関連因子の収束を特定する。",
    prevPoints: [
      { factor: "EMF → DA↓", detail: "CaMKII障害（VK19）によるドーパミン合成の直接的減少。増加する環境EMF曝露が有病率のタイムラインと相関する。" },
      { factor: "髄鞘化遅延", detail: "EMF → Cav1.2 → OPC成熟↓ → PFC発達遅延。発達期のより早期でより強いEMF曝露が髄鞘化曲線をシフトさせる。" },
      { factor: "GABAスイッチ遅延", detail: "EMF → KCC2↓ → PFC回路でGABAがより長く興奮性に留まる → 衝動制御が予定通りに発達しない。" },
      { factor: "LEDスクリーン時間（複合）", detail: "スクリーン時間は単なる行動の問題ではない — LEDスクリーンは中間周波数EMFを放射 + ブルーライトがメラトニンを抑制 + 低DAがスクリーンをより報酬的にする（双曲割引）。EMF駆動のDA欠乏が悪循環を生む：DA↓ → スクリーンがより報酬的 → スクリーン時間増加 → IF曝露増加 → DA↓↓。" },
    ],

    pharmaTitle: "薬理学的検証",
    pharmaLead: "ADHD治療薬は、BERMがEMFにより生じると予測するまさにその障害を修正する。これは収束的検証である：メカニズムが間違っていれば、薬剤はこのように作用しないはずである。",
    pharmaPoints: [
      "メチルフェニデート/アンフェタミン：PFCのDAを増加 → 症状改善。これらの薬剤はVK19のドーパミン欠乏を直接補償する。",
      "同じCa²⁺カスケード：DA合成にはCaMKIIが必要、EMFがCaMKIIを障害 → DA↓。刺激薬は再取り込み阻害/放出促進により合成のボトルネックを迂回する。",
      "アトモキセチン：ノルエピネフリン再取り込み阻害薬 → PFC機能も改善。PFCはDAとNEの両方を使用する。アトモキセチンは並行経路を通じてカテコールアミン欠乏を救済する。",
      "グアンファシン（α2Aアゴニスト）：PFCネットワーク接続を強化。VK20が特定した同じ髄鞘化遅延によりPFCネットワークが弱体化しているため、ADHDで有効。",
    ],

    predictionText: "予測 E-NEW-24（PFC臨界発達窓期間中のEMF低減が、遺伝的に感受性の高い小児のADHD症状重症度を軽減する）は、前向きコホートデザインで直接検証可能である。",
    predictionLink: "予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "TDAH : Le Second Prototype",
    subtitle: "Le TDAH réunit trois mécanismes BERM — déficit dopaminergique dans le PFC, retard de myélinisation via Cav1.2 et déplacement E/I via KCC2 — en un phénotype neurodéveloppemental. Le TSA et le TDAH partagent 30-50 % de comorbidité car ils représentent différents points sur le même spectre du facteur Q.",
    backLink: "← Retour aux Preuves",
    cautionText: "Cette page propose le TDAH comme second prototype BERM. Bien que le retard de maturation du PFC, la perturbation dopaminergique et le timing de myélinisation soient des mécanismes établis du TDAH, les relier à l'exposition aux EMF est une hypothèse BERM nécessitant des tests directs.",

    mechTitle: "Trois mécanismes convergents",
    mechLead: "Le TDAH émerge lorsque trois voies BERM convergent sur la fonction du cortex préfrontal : déficit dopaminergique, retard de myélinisation et déplacement E/I. Chaque mécanisme est indépendamment documenté ; leur convergence sur le PFC explique le phénotype clinique.",
    mechanisms: [
      { id: "M1", name: "DA↓ dans le PFC (VK19 : striatum -25 %)", path: "EMF → Ca²⁺↑ → perturbation CaMKII → synthèse DA↓ → déficit DA du PFC → attention↓, inhibition↓", detail: "Le PFC nécessite un niveau OPTIMAL de dopamine (principe de Boucles d'or) : trop bas → TDAH ; trop élevé → psychose. VK19 démontre une réduction de 25 % de la dopamine striatale sous exposition EMF. La synthèse de DA nécessite CaMKII, qui dépend d'un signal Ca²⁺ précis — l'EMF perturbe CaMKII → DA↓. La courbe dose-réponse en U inversé de la DA dans le PFC signifie qu'une déplétion même modérée effondre la fonction exécutive.", color: "green" },
      { id: "M2", name: "Retard de myélinisation (VK20 : Cav1.2→OPC)", path: "EMF → perturbation Cav1.2 → maturation OPC↓ → myélinisation PFC retardée → le PFC mature 5 ANS plus tard", detail: "Le PFC est la DERNIÈRE région cérébrale à se myéliniser, ne se terminant qu'au milieu de la vingtaine. Shaw 2007 (PNAS) a montré que le cortex TDAH atteint son épaisseur maximale 5 ans plus tard que les témoins. VK20 identifie le mécanisme : les canaux Cav1.2 régulent la maturation des cellules précurseurs d'oligodendrocytes (OPC). La perturbation de Cav1.2 induite par l'EMF retarde la différenciation des OPC → retard de myélinisation → le PFC est la région la plus vulnérable car il se myélinise en dernier.", color: "green" },
      { id: "M3", name: "Déplacement E/I (VK6 : KCC2↓ + VK4 : α2δ-1↑)", path: "EMF → maturation KCC2↓ + α2δ-1↑ → E/I↑ → contrôle des impulsions↓", detail: "Le même mécanisme de déséquilibre E/I que dans le TSA mais à une valeur Q PLUS BASSE : moins de crises (épilepsie 5-10 % vs. 38 % dans le TSA), moins d'hypersensibilité sensorielle, mais contrôle des impulsions et attention soutenue altérés. Le retard de KCC2 maintient le GABA excitateur dans les circuits PFC responsables de l'inhibition comportementale. La surexpression d'α2δ-1 ajoute une impulsion excitatrice.", color: "green" },
    ],

    spectrumTitle: "Spectre TSA-TDAH",
    spectrumLead: "Le TSA et le TDAH ne sont pas des troubles distincts mais différentes positions sur le même spectre E/I, modulées par la valeur du facteur Q et la vulnérabilité régionale.",
    spectrumPoints: [
      "Comorbidité TSA + TDAH : 30-50 % — bien trop élevée pour une coïncidence, attendue si les deux partagent la même racine mécanistique",
      "Même mécanisme (E/I↑), différentes valeurs de Q : TSA = Q élevé (épilepsie 38 %), TDAH = Q modéré (épilepsie 5-10 %)",
      "Les variants de CACNA1C modulent la position sur le spectre : gain de fonction → caractéristiques TSA ; perturbation partielle → caractéristiques TDAH",
      "Les deux répondent aux traitements ciblant les mêmes voies : bumétanide (polarité GABA), atomoxétine (sauvetage noradrénergique du PFC), thérapies comportementales ciblant la fonction exécutive",
    ],

    prevTitle: "Augmentation de la prévalence expliquée",
    prevLead: "La prévalence du TDAH a fortement augmenté depuis les années 1990. BERM identifie une convergence de facteurs liés aux EMF et adjacents aux EMF qui amplifient le déficit dopaminergique.",
    prevPoints: [
      { factor: "EMF → DA↓", detail: "Réduction directe de la synthèse de dopamine par perturbation de CaMKII (VK19). L'exposition croissante aux EMF ambiants corrèle avec la chronologie de la prévalence." },
      { factor: "Retard de myélinisation", detail: "EMF → Cav1.2 → maturation OPC↓ → développement PFC retardé. Une exposition EMF plus précoce et plus intense pendant le développement décale la courbe de myélinisation." },
      { factor: "Retard du switch GABA", detail: "EMF → KCC2↓ → le GABA reste excitateur plus longtemps dans les circuits PFC → le contrôle des impulsions ne se développe pas dans les délais." },
      { factor: "Temps d'écran LED (composé)", detail: "Le temps d'écran n'est pas seulement comportemental — les écrans LED émettent des EMF de fréquence intermédiaire + la lumière bleue supprime la mélatonine + un DA bas rend les écrans PLUS gratifiants (actualisation hyperbolique). Le déficit DA induit par l'EMF crée un cercle vicieux : DA↓ → écrans plus gratifiants → plus de temps d'écran → plus d'exposition IF → DA↓↓." },
    ],

    pharmaTitle: "Validation pharmacologique",
    pharmaLead: "Les médicaments du TDAH corrigent exactement les perturbations que BERM prédit que l'EMF produit. C'est une validation convergente : si le mécanisme est erroné, les médicaments ne devraient pas fonctionner comme ils le font.",
    pharmaPoints: [
      "Méthylphénidate/amphétamine : augmentent la DA dans le PFC → les symptômes s'améliorent. Ces médicaments compensent directement le déficit dopaminergique de VK19.",
      "Même cascade Ca²⁺ : la synthèse de DA nécessite CaMKII ; l'EMF perturbe CaMKII → DA↓. Les stimulants contournent le goulot d'étranglement de la synthèse en bloquant la recapture/favorisant la libération.",
      "Atomoxétine : inhibiteur de la recapture de la noradrénaline → améliore aussi la fonction PFC. Le PFC utilise à la fois DA et NE ; l'atomoxétine sauve le déficit catécholaminergique par une voie parallèle.",
      "Guanfacine (agoniste α2A) : renforce la connectivité du réseau PFC. Efficace dans le TDAH car les réseaux PFC sont affaiblis par le même retard de myélinisation identifié par VK20.",
    ],

    predictionText: "La prédiction E-NEW-24 (la réduction de l'EMF pendant la fenêtre critique de développement du PFC réduit la sévérité des symptômes du TDAH chez les enfants génétiquement prédisposés) est directement testable dans un design de cohorte prospective.",
    predictionLink: "Voir les prédictions →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "ADHD: 두 번째 프로토타입",
    subtitle: "ADHD는 세 가지 BERM 메커니즘 — PFC의 도파민 결핍, Cav1.2를 통한 수초화 지연, KCC2를 통한 E/I 전환 — 을 하나의 신경발달 표현형으로 통합한다. ASD와 ADHD는 30-50%의 공존율을 공유하는데, 이는 둘 다 동일한 Q인자 스펙트럼의 다른 지점을 나타내기 때문이다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "이 페이지는 ADHD를 두 번째 BERM 프로토타입으로 제안한다. PFC 성숙 지연, 도파민 교란, 수초화 타이밍은 확립된 ADHD 메커니즘이지만, 이를 EMF 노출과 연결하는 것은 직접적인 검증이 필요한 BERM 가설이다.",

    mechTitle: "세 가지 수렴 메커니즘",
    mechLead: "ADHD는 세 가지 BERM 경로가 전두전피질 기능에 수렴할 때 발생한다: 도파민 결핍, 수초화 지연, E/I 전환. 각 메커니즘은 독립적으로 문서화되어 있으며, PFC에 대한 수렴이 임상 표현형을 설명한다.",
    mechanisms: [
      { id: "M1", name: "PFC의 DA↓ (VK19: 선조체 -25%)", path: "EMF → Ca²⁺↑ → CaMKII 교란 → DA 합성↓ → PFC DA 결핍 → 주의력↓, 억제↓", detail: "PFC는 최적의 도파민을 필요로 한다(골디락스 원리): 너무 낮으면 → ADHD, 너무 높으면 → 정신병. VK19는 EMF 노출 하에서 선조체 도파민이 25% 감소함을 보여준다. DA 합성에는 CaMKII가 필요하며, CaMKII는 정밀한 Ca²⁺ 신호에 의존한다 — EMF가 CaMKII를 교란 → DA↓. PFC에서 DA의 역U자 용량-반응은 중등도의 고갈로도 실행 기능이 붕괴됨을 의미한다.", color: "green" },
      { id: "M2", name: "수초화 지연 (VK20: Cav1.2→OPC)", path: "EMF → Cav1.2 교란 → OPC 성숙↓ → PFC 수초화 지연 → PFC가 5년 늦게 성숙", detail: "PFC는 뇌에서 가장 마지막으로 수초화되는 영역으로, 20대 중반에야 완성된다. Shaw 2007(PNAS)은 ADHD 피질이 대조군보다 5년 늦게 최대 두께에 도달함을 보여주었다. VK20이 메커니즘을 규명: Cav1.2 채널이 희소돌기아교세포 전구세포(OPC) 성숙을 조절한다. EMF에 의한 Cav1.2 교란이 OPC 분화를 지연 → 수초화 지연 → PFC는 가장 마지막에 수초화되므로 가장 취약한 영역이 된다.", color: "green" },
      { id: "M3", name: "E/I 전환 (VK6: KCC2↓ + VK4: α2δ-1↑)", path: "EMF → KCC2 성숙↓ + α2δ-1↑ → E/I↑ → 충동 조절↓", detail: "ASD와 동일한 E/I 불균형 메커니즘이지만 더 낮은 Q값에서: 발작이 적고(간질 5-10% vs. ASD 38%), 감각 과민이 적지만, 충동 조절과 지속적 주의력이 손상된다. KCC2 지연으로 행동 억제를 담당하는 PFC 회로에서 GABA가 흥분성으로 유지된다. α2δ-1 상향 조절이 흥분성 추진력을 추가한다.", color: "green" },
    ],

    spectrumTitle: "ASD-ADHD 스펙트럼",
    spectrumLead: "ASD와 ADHD는 별개의 장애가 아니라 Q인자 값과 영역 취약성에 의해 조절되는 동일한 E/I 스펙트럼의 다른 위치이다.",
    spectrumPoints: [
      "ASD + ADHD 공존율: 30-50% — 우연이라 하기엔 너무 높으며, 둘 다 동일한 기전적 근원을 공유한다면 예상되는 수치",
      "동일한 메커니즘(E/I↑), 다른 Q값: ASD = 높은 Q(간질 38%), ADHD = 중등도 Q(간질 5-10%)",
      "CACNA1C 변이가 스펙트럼상 위치를 조절: 기능 획득 → ASD 특성, 부분적 교란 → ADHD 특성",
      "둘 다 동일한 경로를 표적으로 하는 치료에 반응: 부메타나이드(GABA 극성), 아토목세틴(노르아드레날린성 PFC 구제), 실행 기능을 표적으로 하는 행동 치료",
    ],

    prevTitle: "유병률 증가 설명",
    prevLead: "ADHD 유병률은 1990년대 이후 급격히 증가했다. BERM은 도파민 결핍을 증폭시키는 EMF 유발 및 EMF 관련 요인의 수렴을 규명한다.",
    prevPoints: [
      { factor: "EMF → DA↓", detail: "CaMKII 교란(VK19)에 의한 직접적인 도파민 합성 감소. 증가하는 환경 EMF 노출이 유병률 타임라인과 상관한다." },
      { factor: "수초화 지연", detail: "EMF → Cav1.2 → OPC 성숙↓ → PFC 발달 지연. 발달 중 더 이른 시기의 더 강한 EMF 노출이 수초화 곡선을 이동시킨다." },
      { factor: "GABA 전환 지연", detail: "EMF → KCC2↓ → PFC 회로에서 GABA가 더 오래 흥분성으로 유지 → 충동 조절이 예정대로 발달하지 않는다." },
      { factor: "LED 스크린 시간(복합)", detail: "스크린 시간은 단순한 행동 문제가 아니다 — LED 스크린은 중간 주파수 EMF를 방출 + 블루라이트가 멜라토닌을 억제 + 낮은 DA가 스크린을 더 보상적으로 만듦(쌍곡선 할인). EMF 유발 DA 결핍이 악순환을 만든다: DA↓ → 스크린이 더 보상적 → 스크린 시간 증가 → IF 노출 증가 → DA↓↓." },
    ],

    pharmaTitle: "약리학적 검증",
    pharmaLead: "ADHD 약물은 BERM이 EMF가 생성한다고 예측하는 바로 그 교란을 교정한다. 이것은 수렴적 검증이다: 메커니즘이 틀리다면, 약물은 이런 방식으로 작용해서는 안 된다.",
    pharmaPoints: [
      "메틸페니데이트/암페타민: PFC의 DA를 증가 → 증상 개선. 이 약물들은 VK19의 도파민 결핍을 직접 보상한다.",
      "동일한 Ca²⁺ 캐스케이드: DA 합성에는 CaMKII가 필요, EMF가 CaMKII를 교란 → DA↓. 자극제는 재흡수 차단/방출 촉진으로 합성 병목을 우회한다.",
      "아토목세틴: 노르에피네프린 재흡수 억제제 → PFC 기능도 개선. PFC는 DA와 NE를 모두 사용하며, 아토목세틴은 병렬 경로를 통해 카테콜아민 결핍을 구제한다.",
      "구안파신(α2A 작용제): PFC 네트워크 연결성을 강화. VK20이 규명한 동일한 수초화 지연으로 PFC 네트워크가 약화되어 있어 ADHD에서 효과적이다.",
    ],

    predictionText: "예측 E-NEW-24(PFC 임계 발달 기간 중 EMF 감소가 유전적으로 취약한 아동의 ADHD 증상 심각도를 경감)는 전향적 코호트 설계로 직접 검증 가능하다.",
    predictionLink: "예측 보기 →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function AdhdPrototypePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  const mechColors: Record<string, string> = { green: "border-green-500/30 bg-green-500/5" };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={BrainCircuit} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox></div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.mechTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.mechLead}</p>
        <div className="space-y-4">
          {d.mechanisms.map((m) => (
            <div key={m.id} className={`rounded-xl border p-5 ${mechColors[m.color]}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono-num text-xs text-accent">{m.id}</span>
                <h3 className="font-semibold text-sm">{m.name}</h3>
              </div>
              <p className="text-xs font-mono text-foreground-muted mb-2">{m.path}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.spectrumTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.spectrumLead}</p>
        <div className="space-y-2">
          {d.spectrumPoints.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">{"→"}</span><p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.prevTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.prevLead}</p>
        <div className="space-y-3">
          {d.prevPoints.map((pp, i) => (
            <div key={i} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm font-semibold mb-1 font-mono">{pp.factor}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{pp.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.pharmaTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.pharmaLead}</p>
        <div className="space-y-2">
          {d.pharmaPoints.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-green-500 shrink-0">{"✓"}</span><p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
