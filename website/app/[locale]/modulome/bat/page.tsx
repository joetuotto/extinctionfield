import type { Metadata } from "next";
import Link from "next/link";
import { Flame } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { StudyCitation } from "@/components/StudyCitation";

const COPY = {
  en: {
    title: "Brown Adipose Tissue",
    subtitle:
      "VGCC → Ca²⁺ → CaMKII: two independent thermogenic pathways disrupted",
    backLink: "← Back to Modulome",

    /* --- SECTION 1: BAT Channel Architecture --- */
    s1SectionTitle: "BAT Channel Architecture",

    /* 01 Channel Profile */
    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "VGCC (voltage-gated calcium channels)",
    geneVal: "CACNA1H (Cav3.2) — CaMKII downstream",
    cellTypeVal: "Brown adipocytes",
    functionVal:
      "Thermogenesis via UCP1 transcription + SERCA2b/RyR2 Ca²⁺ cycling",
    levelVal: "E",

    /* --- SECTION 2: Dual Thermogenic Mechanisms --- */
    s2SectionTitle: "Dual Thermogenic Mechanisms",

    /* 02 UCP1 Pathway */
    s2Title: "Pathway 1: CaMKII → UCP1 Transcription",
    s2Chain:
      "VGCC → Ca²⁺ → CaMKII → CREB phosphorylation → UCP1 transcription ↓ → proton leak ↓ → thermogenesis ↓",
    s2p1: "UCP1 (uncoupling protein 1) is the defining protein of brown adipose tissue. It sits in the inner mitochondrial membrane and dissipates the proton gradient as heat instead of ATP — the molecular basis of non-shivering thermogenesis. UCP1 expression is regulated by the CaMKII/CREB signaling axis: Ca²⁺ influx through VGCCs activates CaMKII, which phosphorylates CREB, which drives UCP1 gene transcription.",
    s2p2: "EMF-induced disruption of VGCC gating alters Ca²⁺ dynamics in brown adipocytes. The downstream effect is reduced CaMKII activation, impaired CREB phosphorylation, and decreased UCP1 transcription. With less UCP1, the mitochondrial proton leak is diminished, and the cell burns fewer calories as heat. The thermogenic capacity of BAT is degraded even when the tissue itself remains anatomically intact.",
    s2p3: "This pathway is dose- and time-dependent. [[ref:maalouf2023|Maalouf et al. (2023)]] demonstrated that 900 MHz exposure at SAR 0.1–0.4 W/kg reduced BAT thermogenesis and mitochondrial activity in a dose-response manner — precisely the pattern predicted by a VGCC-mediated mechanism.",

    /* 03 Ca²⁺ Cycling Pathway */
    s3Title: "Pathway 2: SERCA2b/RyR2 Ca²⁺ Futile Cycling",
    s3Chain:
      "SERCA2b pumps Ca²⁺ into ER → RyR2 releases Ca²⁺ back → cycle repeats → ATP hydrolyzed as heat",
    s3p1: "Independent of UCP1, brown adipocytes possess a second thermogenic mechanism: the SERCA2b/RyR2 calcium futile cycle. SERCA2b (sarco/endoplasmic reticulum Ca²⁺-ATPase 2b) pumps cytoplasmic Ca²⁺ into the endoplasmic reticulum, consuming ATP. The ryanodine receptor RyR2 then releases the Ca²⁺ back into the cytoplasm. This cycle repeats continuously, converting ATP energy into heat without any productive work — a thermogenic \"futile cycle.\"",
    s3p2: "This mechanism is entirely Ca²⁺-dependent and thus directly susceptible to VGCC perturbation. EMF-induced alterations in intracellular Ca²⁺ homeostasis disrupt both the SERCA2b pump rate and RyR2 release dynamics, degrading the futile cycle's thermogenic output. Because this pathway operates independently of UCP1, EMF exposure simultaneously impairs BOTH thermogenic mechanisms — a double hit on the cell's calorie-burning capacity.",

    /* --- SECTION 3: Evidence --- */
    s3SectionTitle: "Key Evidence",

    /* 04 Maalouf 2023 */
    s4Title: "Maalouf et al. 2023 (PMC10342026)",
    s4p1: "900 MHz RF-EMF exposure at SAR 0.1–0.4 W/kg reduced BAT thermogenesis and mitochondrial activity. The effect was dose- and time-dependent — higher SAR and longer exposure produced greater suppression. This study provides direct measurement of EMF-induced thermogenic impairment at exposure levels within the range of mobile phone use.",
    s4Badge: "E — direct measurement, dose-response",

    /* 05 French 5G Study 2025 */
    s5Title: "5G Differentiation Study 2025 (PMC11942954)",
    s5p1: "A French research group exposed preadipocytes to 5G frequencies (3.5 GHz) and measured expression of key brown adipocyte differentiation markers. Results:",
    s5Stats: [
      "PRDM16 expression: −49% — the master transcription factor for brown adipocyte identity",
      "C/EBPβ expression: −32% — essential for brown adipocyte differentiation program",
    ],
    s5p2: "PRDM16 is the defining transcription factor that determines whether a precursor cell becomes a brown adipocyte or a white adipocyte. A 49% reduction means that nearly half the potential brown fat cell differentiation is blocked. C/EBPβ cooperates with PRDM16 in the brown fat gene program. Together, these reductions indicate that 5G exposure substantially impairs the body's ability to generate new brown adipocytes — reducing not just the activity of existing BAT, but the tissue's capacity for renewal.",

    /* --- SECTION 4: CaMKII Convergence --- */
    s4SectionTitle: "CaMKII Convergence",

    /* 06 CaMKII Connection */
    s6Title: "The CaMKII Hub: Same Molecule, Multiple Organs",
    s6p1: "The CaMKII that mediates BAT thermogenesis is the same calcium/calmodulin-dependent protein kinase II that operates across the BERM modulome:",
    s6Points: [
      "In BAT: CaMKII → CREB → UCP1 transcription (thermogenesis)",
      "In testes: CaMKII shifts Cav3.2 activation threshold → StAR regulation (steroidogenesis)",
      "In brain: CaMKII → synaptic plasticity, memory consolidation",
      "In heart: CaMKII → arrhythmogenesis under Ca²⁺ overload",
    ],
    s6p2: "This convergence is not coincidental. CaMKII is a direct downstream effector of VGCC-mediated Ca²⁺ influx. Any perturbation of VGCCs — whether by EMF, pharmacological blockade, or genetic mutation — propagates through CaMKII to all its downstream targets simultaneously. The BAT thermogenesis pathway is one arm of a multi-organ cascade that also drives infertility, neurodegeneration, and cardiac dysfunction through the same upstream mechanism.",
    s6LinkText: "Full CaMKII convergence model",

    /* --- SECTION 5: Clinical Parallel & Epistemic Context --- */
    s5SectionTitle: "Clinical Context",

    /* 07 Cold Exposure */
    s7Title: "Clinical Parallel: Cold Exposure Therapy",
    s7p1: "Cold exposure therapy (cold plunges, cold showers, cryotherapy) activates BAT thermogenesis via the same Ca²⁺ signaling pathways that EMF disrupts. Cold stress triggers sympathetic activation → norepinephrine release → β3-adrenergic receptor → Ca²⁺ signaling cascade → CaMKII → UCP1 activation. The clinical efficacy of cold exposure for metabolic health, weight management, and insulin sensitivity improvement is well-documented.",
    s7p2: "This creates a mechanistic symmetry: cold exposure ACTIVATES the VGCC → Ca²⁺ → CaMKII → UCP1 pathway; EMF exposure DISRUPTS it. The same molecular machinery is the target of both interventions, operating in opposite directions. This parallel provides independent clinical validation that the pathway is real and metabolically significant — if cold can upregulate it, EMF can downregulate it.",

    /* 08 Epistemic Note */
    s8Title: "Epistemic Note",
    s8p1: "Obesity is a multifactorial condition. Diet, physical activity, genetics, gut microbiome, sleep, stress, and endocrine disruptors all contribute to energy balance. EMF-induced BAT impairment is ONE contributing factor within this complex landscape — not the sole cause.",
    s8p2: "The BERM framework does not claim that EMF causes obesity. It identifies a specific, measurable mechanism (VGCC → Ca²⁺ → CaMKII → UCP1/SERCA2b) by which EMF reduces thermogenic calorie burning. The magnitude (PRDM16 −49%, C/EBPβ −32%) indicates this is a non-trivial contribution to energy balance, but its relative weight alongside diet, exercise, and other factors remains to be quantified in population studies.",

    /* See also */
    seeAlso: "See also",
    modulomeOverview: "Modulome overview",
    testesPage: "Testes (CaMKII → StAR)",
    pancreasPage: "Pancreas (β-cell VGCC)",
    brainPage: "Brain (VGCC → Alzheimer's)",
    predictionsPage: "Predictions register",
  },
  fi: {
    title: "Ruskea rasvakudos",
    subtitle:
      "VGCC → Ca²⁺ → CaMKII: kaksi itsenäistä termogeneesireittiä häiriintynyt",
    backLink: "← Takaisin moduloomiin",

    /* --- OSIO 1: BAT-kanava-arkkitehtuuri --- */
    s1SectionTitle: "BAT-kanava-arkkitehtuuri",

    /* 01 Kanavaprofiili */
    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    channelVal: "VGCC (jänniteohjatut kalsiumkanavat)",
    geneVal: "CACNA1H (Cav3.2) — CaMKII alajuoksulla",
    cellTypeVal: "Ruskeat adiposyytit",
    functionVal:
      "Termogeneesi UCP1-transkription + SERCA2b/RyR2 Ca²⁺ -kierron kautta",
    levelVal: "E",

    /* --- OSIO 2: Kaksoistermogeneesimekanismit --- */
    s2SectionTitle: "Kaksoistermogeneesimekanismit",

    /* 02 UCP1-reitti */
    s2Title: "Reitti 1: CaMKII → UCP1-transkriptio",
    s2Chain:
      "VGCC → Ca²⁺ → CaMKII → CREB-fosforylaatio → UCP1-transkriptio ↓ → protonivuoto ↓ → termogeneesi ↓",
    s2p1: "UCP1 (irtikytkentäproteiini 1) on ruskean rasvakudoksen tunnusproteiini. Se sijaitsee mitokondrion sisäkalvolla ja haihduttaa protonierot lämpönä ATP:n sijaan — paleleemattoman termogeneesin molekulaarinen perusta. UCP1-ekspressiota säätelee CaMKII/CREB-signalointiakseli: Ca²⁺-sisäänvirtaus VGCC:iden kautta aktivoi CaMKII:n, joka fosforyloi CREB:n, joka ajaa UCP1-geenin transkriptiota.",
    s2p2: "EMF-indusoitu VGCC-avautumisen häiriö muuttaa Ca²⁺-dynamiikkaa ruskeissa adiposyyteissä. Alavirran vaikutus on CaMKII-aktivaation väheneminen, CREB-fosforylaation heikentyminen ja UCP1-transkription lasku. Vähemmällä UCP1:llä mitokondriaalinen protonivuoto pienenee, ja solu polttaa vähemmän kaloreita lämpönä. BAT:n termogeneettinen kapasiteetti heikkenee, vaikka kudos itsessään pysyisi anatomisesti ehjänä.",
    s2p3: "Tämä reitti on annos- ja aikariippuvainen. [[ref:maalouf2023|Maalouf ym. (2023)]] osoittivat, että 900 MHz:n altistus SAR-tasoilla 0,1–0,4 W/kg vähensi BAT-termogeneesiä ja mitokondriaalista aktiivisuutta annosvasteisesti — täsmälleen VGCC-välitteisen mekanismin ennustama kuvio.",

    /* 03 Ca²⁺ -kiertoreitti */
    s3Title: "Reitti 2: SERCA2b/RyR2 Ca²⁺ -turha kierto",
    s3Chain:
      "SERCA2b pumppaa Ca²⁺:n ER:iin → RyR2 vapauttaa Ca²⁺:n takaisin → kierto toistuu → ATP hydrolysoituu lämmöksi",
    s3p1: "UCP1:stä riippumatta ruskeat adiposyytit omaavat toisen termogeneettisen mekanismin: SERCA2b/RyR2-kalsiumin turhan kierron. SERCA2b (sarko/endoplasmakalvoston Ca²⁺-ATPaasi 2b) pumppaa sytoplasman Ca²⁺:n endoplasmakalvostoon kuluttaen ATP:tä. Ryanodiinireseptori RyR2 vapauttaa Ca²⁺:n takaisin sytoplasmaan. Kierto toistuu jatkuvasti, muuntaen ATP-energian lämmöksi ilman tuottavaa työtä — termogeneettinen \"turha kierto\".",
    s3p2: "Tämä mekanismi on täysin Ca²⁺-riippuvainen ja siten suoraan altis VGCC-häiriölle. EMF-indusoidut muutokset solunsisäisessä Ca²⁺-homeostaasissa häiritsevät sekä SERCA2b-pumpun nopeutta että RyR2:n vapautumisdynamiikkaa, heikentäen turhan kierron termogeneettistä tuottoa. Koska tämä reitti toimii UCP1:stä riippumatta, EMF-altistus heikentää samanaikaisesti MOLEMPIA termogeneesimekanismeja — kaksoisosuma solun kalorinpolttamiskapasiteettiin.",

    /* --- OSIO 3: Evidenssi --- */
    s3SectionTitle: "Keskeinen evidenssi",

    /* 04 Maalouf 2023 */
    s4Title: "Maalouf ym. 2023 (PMC10342026)",
    s4p1: "900 MHz:n RF-EMF-altistus SAR-tasoilla 0,1–0,4 W/kg vähensi BAT-termogeneesiä ja mitokondriaalista aktiivisuutta. Vaikutus oli annos- ja aikariippuvainen — korkeampi SAR ja pidempi altistus tuottivat suuremman suppression. Tutkimus tarjoaa suoran mittauksen EMF-indusoidusta termogeneettisestä heikentymisestä altistustasoilla, jotka ovat matkapuhelinkäytön alueella.",
    s4Badge: "E — suora mittaus, annosvaste",

    /* 05 Ranskalainen 5G-tutkimus 2025 */
    s5Title: "5G-differentiaatiotutkimus 2025 (PMC11942954)",
    s5p1: "Ranskalainen tutkimusryhmä altisti esiadipotypyyttejä 5G-taajuuksille (3,5 GHz) ja mittasi ruskean adiposyytin keskeisten differentiaatiomarkkereiden ekspression. Tulokset:",
    s5Stats: [
      "PRDM16-ekspressio: −49 % — ruskean adiposyytin identiteetin päätranskriptiotekijä",
      "C/EBPβ-ekspressio: −32 % — välttämätön ruskean adiposyytin differentiaatio-ohjelmalle",
    ],
    s5p2: "PRDM16 on se transkriptiotekijä, joka määrää kehittyykö esiastesolu ruskeaksi vai valkeaksi adiposyytiksi. 49 %:n lasku tarkoittaa, että lähes puolet potentiaalisesta ruskean rasvasolun differentiaatiosta estyy. C/EBPβ toimii yhteistyössä PRDM16:n kanssa ruskean rasvan geeniohjelmassa. Yhdessä nämä vähennykset osoittavat, että 5G-altistus heikentää merkittävästi kehon kykyä tuottaa uusia ruskeita adiposyyttejä — vähentäen paitsi olemassa olevan BAT:n aktiivisuutta, myös kudoksen uusiutumiskapasiteettia.",

    /* --- OSIO 4: CaMKII-konvergenssi --- */
    s4SectionTitle: "CaMKII-konvergenssi",

    /* 06 CaMKII-yhteys */
    s6Title: "CaMKII-solmukohta: sama molekyyli, useita elimiä",
    s6p1: "BAT-termogeneesiä välittävä CaMKII on sama kalsiumin/kalmoduliiniriippuvainen proteiinikinaasi II, joka toimii koko BERM-moduloomissa:",
    s6Points: [
      "BAT:ssa: CaMKII → CREB → UCP1-transkriptio (termogeneesi)",
      "Kiveksissä: CaMKII siirtää Cav3.2:n aktivaatiokynnystä → StAR-säätely (steroidogeneesi)",
      "Aivoissa: CaMKII → synaptinen plastisuus, muistin konsolidaatio",
      "Sydämessä: CaMKII → arytmogeneesi Ca²⁺-ylikuormituksessa",
    ],
    s6p2: "Tämä konvergenssi ei ole sattumaa. CaMKII on VGCC-välitteisen Ca²⁺-sisäänvirtauksen suora alajuoksun efektori. Mikä tahansa VGCC-häiriö — olipa se EMF:n, farmakologisen salpauksen tai geneettisen mutaation aiheuttama — etenee CaMKII:n kautta kaikkiin sen alajuoksun kohteisiin samanaikaisesti. BAT-termogeneesireitti on yksi haara monielimisessä kaskadissa, joka ajaa myös hedelmättömyyttä, neurodegeneraatiota ja sydämen toimintahäiriöitä saman ylävirtamekanismin kautta.",
    s6LinkText: "Täydellinen CaMKII-konvergenssimalli",

    /* --- OSIO 5: Kliininen konteksti --- */
    s5SectionTitle: "Kliininen konteksti",

    /* 07 Kylmäaltistus */
    s7Title: "Kliininen rinnakkaisuus: kylmäaltistusterapia",
    s7p1: "Kylmäaltistusterapia (avantouinti, kylmät suihkut, kryoterapia) aktivoi BAT-termogeneesin samojen Ca²⁺-signalointireittien kautta, jotka EMF häiritsee. Kylmästressi laukaisee sympaattisen aktivaation → noradrenaliinin vapautumisen → β3-adrenergisen reseptorin → Ca²⁺-signalointikaskadin → CaMKII → UCP1-aktivaation. Kylmäaltistuksen kliininen teho metaboliselle terveydelle, painonhallinnalle ja insuliiniherkkyyden parantamiselle on hyvin dokumentoitu.",
    s7p2: "Tämä luo mekanistisen symmetrian: kylmäaltistus AKTIVOI VGCC → Ca²⁺ → CaMKII → UCP1 -reitin; EMF-altistus HÄIRITSEE sitä. Sama molekulaarinen koneisto on molempien interventioiden kohde, mutta päinvastaisiin suuntiin. Tämä rinnakkaisuus tarjoaa riippumattoman kliinisen vahvistuksen sille, että reitti on todellinen ja metabolisesti merkittävä — jos kylmä voi ylössäädellä sen, EMF voi alassäädellä sen.",

    /* 08 Episteeminen huomautus */
    s8Title: "Episteeminen huomautus",
    s8p1: "Lihavuus on monitekijäinen tila. Ruokavalio, liikunta, genetiikka, suolistomikrobiomi, uni, stressi ja endokriiniset häiritsijät kaikki vaikuttavat energiatasapainoon. EMF-indusoitu BAT-heikentyminen on YKSI vaikuttava tekijä tässä monimutkaisessa maisemassa — ei ainoa syy.",
    s8p2: "BERM-kehys ei väitä, että EMF aiheuttaa lihavuuden. Se tunnistaa spesifisen, mitattavan mekanismin (VGCC → Ca²⁺ → CaMKII → UCP1/SERCA2b), jolla EMF vähentää termogeneettistä kalorinpolttoa. Suuruusluokka (PRDM16 −49 %, C/EBPβ −32 %) osoittaa, ettei kyseessä ole merkityksetön vaikutus energiatasapainoon, mutta sen suhteellinen paino ruokavalion, liikunnan ja muiden tekijöiden rinnalla on vielä kvantifioitava populaatiotutkimuksissa.",

    /* Katso myös */
    seeAlso: "Katso myös",
    modulomeOverview: "Moduloomin yleiskatsaus",
    testesPage: "Kivekset (CaMKII → StAR)",
    pancreasPage: "Haima (β-solun VGCC)",
    brainPage: "Aivot (VGCC → Alzheimer)",
    predictionsPage: "Ennusterekisteri",
  },
  ja: {
    title: "褐色脂肪組織",
    subtitle:
      "VGCC → Ca²⁺ → CaMKII: 2つの独立した熱産生経路が障害される",
    backLink: "← モジュロームに戻る",

    /* --- セクション1: BATチャネルアーキテクチャ --- */
    s1SectionTitle: "BATチャネルアーキテクチャ",

    /* 01 チャネルプロファイル */
    channelProfile: "チャネルプロファイル",
    channel: "チャネル",
    gene: "遺伝子",
    cellType: "細胞型",
    function: "機能",
    level: "エビデンスレベル",
    channelVal: "VGCC（電位依存性カルシウムチャネル）",
    geneVal: "CACNA1H (Cav3.2) — CaMKII下流",
    cellTypeVal: "褐色脂肪細胞",
    functionVal:
      "UCP1転写 + SERCA2b/RyR2 Ca²⁺循環による熱産生",
    levelVal: "E",

    /* --- セクション2: 二重熱産生メカニズム --- */
    s2SectionTitle: "二重熱産生メカニズム",

    /* 02 UCP1経路 */
    s2Title: "経路1: CaMKII → UCP1転写",
    s2Chain:
      "VGCC → Ca²⁺ → CaMKII → CREBリン酸化 → UCP1転写 ↓ → プロトン漏出 ↓ → 熱産生 ↓",
    s2p1: "UCP1（脱共役タンパク質1）は褐色脂肪組織を定義するタンパク質である。ミトコンドリア内膜に存在し、プロトン勾配をATPではなく熱として散逸させる — 非ふるえ熱産生の分子的基盤である。UCP1の発現はCaMKII/CREBシグナル伝達軸によって制御される：VGCCを介したCa²⁺流入がCaMKIIを活性化し、CaMKIIがCREBをリン酸化し、CREBがUCP1遺伝子の転写を駆動する。",
    s2p2: "EMFによるVGCCゲーティングの障害は褐色脂肪細胞のCa²⁺動態を変化させる。下流の効果はCaMKII活性化の低下、CREBリン酸化の障害、UCP1転写の減少である。UCP1が減少すると、ミトコンドリアのプロトン漏出が減少し、細胞は熱としてのカロリー燃焼が減少する。組織自体が解剖学的に無傷であっても、BATの熱産生能力は低下する。",
    s2p3: "この経路は用量および時間依存的である。[[ref:maalouf2023|Maalouf et al.（2023）]]は、SAR 0.1〜0.4 W/kgでの900 MHz曝露がBAT熱産生とミトコンドリア活性を用量反応的に減少させることを実証した。これはVGCC介在メカニズムが正確に予測するパターンである。",

    /* 03 Ca²⁺循環経路 */
    s3Title: "経路2: SERCA2b/RyR2 Ca²⁺無駄循環",
    s3Chain:
      "SERCA2bがCa²⁺をERに汲み上げ → RyR2がCa²⁺を放出 → 循環が繰り返される → ATPが熱として加水分解",
    s3p1: "UCP1とは独立に、褐色脂肪細胞は第二の熱産生メカニズムを持つ：SERCA2b/RyR2カルシウム無駄循環。SERCA2b（筋小胞体/小胞体Ca²⁺-ATPase 2b）は細胞質Ca²⁺をATPを消費して小胞体に汲み上げる。リアノジン受容体RyR2はCa²⁺を細胞質に戻す。この循環は持続的に繰り返され、ATP エネルギーを生産的な仕事なしに熱に変換する — 熱産生の「無駄循環」である。",
    s3p2: "このメカニズムは完全にCa²⁺依存性であり、したがってVGCC摂動の直接的な影響を受ける。EMFによる細胞内Ca²⁺恒常性の変化は、SERCA2bポンプ速度とRyR2放出動態の両方を乱し、無駄循環の熱産生出力を低下させる。この経路はUCP1とは独立に作動するため、EMF曝露は両方の熱産生メカニズムを同時に障害する — 細胞のカロリー燃焼能力への二重打撃である。",

    /* --- セクション3: エビデンス --- */
    s3SectionTitle: "主要エビデンス",

    /* 04 Maalouf 2023 */
    s4Title: "Maalouf et al. 2023 (PMC10342026)",
    s4p1: "SAR 0.1〜0.4 W/kgでの900 MHz RF-EMF曝露はBAT熱産生とミトコンドリア活性を減少させた。効果は用量および時間依存的であった — より高いSARとより長い曝露がより大きな抑制を生じた。この研究は携帯電話使用の範囲内の曝露レベルでのEMF誘発性熱産生障害の直接測定を提供する。",
    s4Badge: "E — 直接測定、用量反応",

    /* 05 フランス5G研究 2025 */
    s5Title: "5G分化研究 2025 (PMC11942954)",
    s5p1: "フランスの研究グループが前駆脂肪細胞を5G周波数（3.5 GHz）に曝露し、褐色脂肪細胞の主要な分化マーカーの発現を測定した。結果：",
    s5Stats: [
      "PRDM16発現：−49% — 褐色脂肪細胞アイデンティティのマスター転写因子",
      "C/EBPβ発現：−32% — 褐色脂肪細胞分化プログラムに必須",
    ],
    s5p2: "PRDM16は、前駆細胞が褐色脂肪細胞になるか白色脂肪細胞になるかを決定する転写因子である。49%の減少は、褐色脂肪細胞への潜在的な分化のほぼ半分が阻害されることを意味する。C/EBPβは褐色脂肪の遺伝子プログラムにおいてPRDM16と協働する。これらの減少は、5G曝露が新しい褐色脂肪細胞を作る身体の能力を大幅に損ない、既存BATの活動だけでなく組織の再生能力も低下させることを示す。",

    /* --- セクション4: CaMKII収束 --- */
    s4SectionTitle: "CaMKII収束",

    /* 06 CaMKII接続 */
    s6Title: "CaMKIIハブ：同一分子、複数の臓器",
    s6p1: "BAT熱産生を仲介するCaMKIIは、BERMモジュローム全体で作動する同一のカルシウム/カルモジュリン依存性プロテインキナーゼIIである：",
    s6Points: [
      "BATにおいて：CaMKII → CREB → UCP1転写（熱産生）",
      "精巣において：CaMKIIがCav3.2の活性化閾値を変化 → StAR調節（ステロイド産生）",
      "脳において：CaMKII → シナプス可塑性、記憶固定",
      "心臓において：CaMKII → Ca²⁺過負荷下での不整脈誘発",
    ],
    s6p2: "この収束は偶然ではない。CaMKIIはVGCC介在Ca²⁺流入の直接的な下流エフェクターである。EMF、薬理学的遮断、遺伝子変異のいずれによるVGCCの擾乱も、CaMKIIを通じてそのすべての下流標的へ同時に伝播する。BAT熱産生経路は、不妊、神経変性、心機能障害も同じ上流メカニズムを通じて駆動する多臓器カスケードの一枝である。",
    s6LinkText: "完全なCaMKII収束モデル",

    /* --- セクション5: 臨床的文脈 --- */
    s5SectionTitle: "臨床的文脈",

    /* 07 寒冷曝露 */
    s7Title: "臨床的パラレル：寒冷曝露療法",
    s7p1: "寒冷曝露療法（冷水浴、冷水シャワー、クライオセラピー）は、EMFが障害するのと同じCa²⁺シグナル伝達経路を介してBAT熱産生を活性化する。寒冷ストレスは交感神経活性化 → ノルエピネフリン放出 → β3-アドレナリン受容体 → Ca²⁺シグナル伝達カスケード → CaMKII → UCP1活性化を引き起こす。代謝健康、体重管理、インスリン感受性改善に対する寒冷曝露の臨床的有効性は十分に文書化されている。",
    s7p2: "これは機序的な対称性を生む。寒冷曝露はVGCC → Ca²⁺ → CaMKII → UCP1経路を活性化し、EMF曝露はそれを障害する。同じ分子機構が両介入の標的となり、反対方向に作用する。この対応は、経路が実在し代謝的に重要であることの独立した臨床的検証を与える。寒冷が上方制御できるなら、EMFは下方制御できる。",

    /* 08 認識論的注記 */
    s8Title: "認識論的注記",
    s8p1: "肥満は多因子性の状態である。食事、身体活動、遺伝、腸内細菌叢、睡眠、ストレス、内分泌攪乱物質のすべてがエネルギーバランスに寄与する。EMF誘発性BAT障害は、この複雑な環境における一つの寄与因子であり — 唯一の原因ではない。",
    s8p2: "BERMフレームワークはEMFが肥満を引き起こすとは主張しない。EMFが熱産生によるカロリー消費を減らす、特定かつ測定可能な機序（VGCC → Ca²⁺ → CaMKII → UCP1/SERCA2b）を特定する。その大きさ（PRDM16 −49%、C/EBPβ −32%）はエネルギーバランスへの寄与が無視できないことを示すが、食事、運動、その他の要因に対する相対的重みは集団研究で定量化する必要がある。",

    /* 関連項目 */
    seeAlso: "関連項目",
    modulomeOverview: "モジュローム概要",
    testesPage: "精巣 (CaMKII → StAR)",
    pancreasPage: "膵臓 (β細胞VGCC)",
    brainPage: "脳 (VGCC → アルツハイマー病)",
    predictionsPage: "予測レジスター",
  },
  fr: {
    title: "Tissu adipeux brun",
    subtitle:
      "VGCC → Ca²⁺ → CaMKII : deux voies thermogéniques indépendantes perturbées",
    backLink: "← Retour au Modulome",

    /* --- SECTION 1 : Architecture des canaux du TAB --- */
    s1SectionTitle: "Architecture des canaux du TAB",

    /* 01 Profil du canal */
    channelProfile: "Profil du canal",
    channel: "Canal",
    gene: "Gène",
    cellType: "Type cellulaire",
    function: "Fonction",
    level: "Niveau de preuve",
    channelVal: "VGCC (canaux calciques voltage-dépendants)",
    geneVal: "CACNA1H (Cav3.2) — CaMKII en aval",
    cellTypeVal: "Adipocytes bruns",
    functionVal:
      "Thermogenèse via transcription d'UCP1 + cycle Ca²⁺ SERCA2b/RyR2",
    levelVal: "E",

    /* --- SECTION 2 : Double mécanisme thermogénique --- */
    s2SectionTitle: "Double mécanisme thermogénique",

    /* 02 Voie UCP1 */
    s2Title: "Voie 1 : CaMKII → Transcription d'UCP1",
    s2Chain:
      "VGCC → Ca²⁺ → CaMKII → phosphorylation de CREB → transcription d'UCP1 ↓ → fuite de protons ↓ → thermogenèse ↓",
    s2p1: "UCP1 (protéine découplante 1) est la protéine caractéristique du tissu adipeux brun. Elle siège dans la membrane interne mitochondriale et dissipe le gradient de protons sous forme de chaleur au lieu d'ATP — la base moléculaire de la thermogenèse sans frisson. L'expression d'UCP1 est régulée par l'axe de signalisation CaMKII/CREB : l'influx de Ca²⁺ par les VGCC active CaMKII, qui phosphoryle CREB, qui conduit la transcription du gène UCP1.",
    s2p2: "La perturbation du gating des VGCC induite par les EMF altère la dynamique du Ca²⁺ dans les adipocytes bruns. L'effet en aval est une réduction de l'activation de CaMKII, une altération de la phosphorylation de CREB et une diminution de la transcription d'UCP1. Avec moins d'UCP1, la fuite de protons mitochondriale est diminuée, et la cellule brûle moins de calories sous forme de chaleur. La capacité thermogénique du TAB est dégradée même lorsque le tissu lui-même reste anatomiquement intact.",
    s2p3: "Cette voie est dose- et temps-dépendante. [[ref:maalouf2023|Maalouf et al. (2023)]] ont démontré qu'une exposition à 900 MHz à un DAS de 0,1–0,4 W/kg réduisait la thermogenèse du TAB et l'activité mitochondriale selon une relation dose-réponse — précisément le schéma prédit par un mécanisme médié par les VGCC.",

    /* 03 Voie du cycle Ca²⁺ */
    s3Title: "Voie 2 : Cycle futile Ca²⁺ SERCA2b/RyR2",
    s3Chain:
      "SERCA2b pompe le Ca²⁺ dans le RE → RyR2 libère le Ca²⁺ → le cycle se répète → ATP hydrolysé en chaleur",
    s3p1: "Indépendamment d'UCP1, les adipocytes bruns possèdent un second mécanisme thermogénique : le cycle futile calcique SERCA2b/RyR2. SERCA2b (Ca²⁺-ATPase 2b du réticulum sarco/endoplasmique) pompe le Ca²⁺ cytoplasmique dans le réticulum endoplasmique, consommant de l'ATP. Le récepteur de la ryanodine RyR2 libère ensuite le Ca²⁺ dans le cytoplasme. Ce cycle se répète continuellement, convertissant l'énergie de l'ATP en chaleur sans travail productif — un « cycle futile » thermogénique.",
    s3p2: "Ce mécanisme est entièrement dépendant du Ca²⁺ et donc directement susceptible à la perturbation des VGCC. Les altérations de l'homéostasie intracellulaire du Ca²⁺ induites par les EMF perturbent à la fois la vitesse de la pompe SERCA2b et la dynamique de libération de RyR2, dégradant la production thermogénique du cycle futile. Comme cette voie fonctionne indépendamment d'UCP1, l'exposition aux EMF altère simultanément LES DEUX mécanismes thermogéniques — un double coup porté à la capacité de combustion calorique de la cellule.",

    /* --- SECTION 3 : Preuves --- */
    s3SectionTitle: "Preuves clés",

    /* 04 Maalouf 2023 */
    s4Title: "Maalouf et al. 2023 (PMC10342026)",
    s4p1: "L'exposition aux RF-EMF à 900 MHz à un DAS de 0,1–0,4 W/kg a réduit la thermogenèse du TAB et l'activité mitochondriale. L'effet était dose- et temps-dépendant — un DAS plus élevé et une exposition plus longue produisaient une suppression plus importante. Cette étude fournit une mesure directe de l'altération thermogénique induite par les EMF à des niveaux d'exposition dans la plage d'utilisation du téléphone portable.",
    s4Badge: "E — mesure directe, dose-réponse",

    /* 05 Étude 5G française 2025 */
    s5Title: "Étude de différenciation 5G 2025 (PMC11942954)",
    s5p1: "Un groupe de recherche français a exposé des préadipocytes aux fréquences 5G (3,5 GHz) et mesuré l'expression des marqueurs clés de différenciation des adipocytes bruns. Résultats :",
    s5Stats: [
      "Expression de PRDM16 : −49 % — le facteur de transcription maître de l'identité des adipocytes bruns",
      "Expression de C/EBPβ : −32 % — essentiel pour le programme de différenciation des adipocytes bruns",
    ],
    s5p2: "PRDM16 est le facteur de transcription déterminant si une cellule précurseur devient un adipocyte brun ou blanc. Une réduction de 49 % signifie que près de la moitié de la différenciation potentielle en cellules graisseuses brunes est bloquée. C/EBPβ coopère avec PRDM16 dans le programme génique de la graisse brune. Ensemble, ces réductions indiquent que l'exposition à la 5G altère considérablement la capacité de l'organisme à produire de nouveaux adipocytes bruns — réduisant non seulement l'activité du TAB existant, mais aussi la capacité de renouvellement du tissu.",

    /* --- SECTION 4 : Convergence CaMKII --- */
    s4SectionTitle: "Convergence CaMKII",

    /* 06 Connexion CaMKII */
    s6Title: "Le hub CaMKII : même molécule, organes multiples",
    s6p1: "La CaMKII qui médie la thermogenèse du TAB est la même protéine kinase II calcium/calmoduline-dépendante qui opère dans l'ensemble du modulome BERM :",
    s6Points: [
      "Dans le TAB : CaMKII → CREB → transcription d'UCP1 (thermogenèse)",
      "Dans les testicules : CaMKII décale le seuil d'activation de Cav3.2 → régulation de StAR (stéroïdogenèse)",
      "Dans le cerveau : CaMKII → plasticité synaptique, consolidation de la mémoire",
      "Dans le cœur : CaMKII → arythmogenèse sous surcharge de Ca²⁺",
    ],
    s6p2: "Cette convergence n'est pas fortuite. CaMKII est un effecteur direct en aval de l'influx de Ca²⁺ médié par les VGCC. Toute perturbation des VGCC — par les EMF, un blocage pharmacologique ou une mutation génétique — se propage simultanément par CaMKII à toutes ses cibles en aval. La voie thermogénique du TAB est une branche d'une cascade multi-organes qui entraîne aussi l'infertilité, la neurodégénérescence et le dysfonctionnement cardiaque par le même mécanisme en amont.",
    s6LinkText: "Modèle complet de convergence CaMKII",

    /* --- SECTION 5 : Contexte clinique --- */
    s5SectionTitle: "Contexte clinique",

    /* 07 Exposition au froid */
    s7Title: "Parallèle clinique : thérapie par exposition au froid",
    s7p1: "La thérapie par exposition au froid (bains froids, douches froides, cryothérapie) active la thermogenèse du TAB via les mêmes voies de signalisation Ca²⁺ que les EMF perturbent. Le stress au froid déclenche l'activation sympathique → libération de noradrénaline → récepteur β3-adrénergique → cascade de signalisation Ca²⁺ → CaMKII → activation d'UCP1. L'efficacité clinique de l'exposition au froid pour la santé métabolique, la gestion du poids et l'amélioration de la sensibilité à l'insuline est bien documentée.",
    s7p2: "Cela crée une symétrie mécanistique : l'exposition au froid ACTIVE la voie VGCC → Ca²⁺ → CaMKII → UCP1 ; l'exposition aux EMF la PERTURBE. La même machinerie moléculaire est la cible des deux interventions, agissant en sens opposés. Ce parallèle apporte une validation clinique indépendante du fait que la voie est réelle et métaboliquement significative — si le froid peut la réguler à la hausse, les EMF peuvent la réguler à la baisse.",

    /* 08 Note épistémique */
    s8Title: "Note épistémique",
    s8p1: "L'obésité est une condition multifactorielle. L'alimentation, l'activité physique, la génétique, le microbiome intestinal, le sommeil, le stress et les perturbateurs endocriniens contribuent tous à l'équilibre énergétique. L'altération du TAB induite par les EMF est UN facteur contributif dans ce paysage complexe — pas la cause unique.",
    s8p2: "Le cadre BERM ne prétend pas que les EMF causent l'obésité. Il identifie un mécanisme précis et mesurable (VGCC → Ca²⁺ → CaMKII → UCP1/SERCA2b) par lequel les EMF réduisent la dépense calorique thermogénique. L'ampleur (PRDM16 −49 %, C/EBPβ −32 %) indique une contribution non négligeable à l'équilibre énergétique, mais son poids relatif par rapport à l'alimentation, à l'exercice et aux autres facteurs reste à quantifier dans des études de population.",

    /* Voir aussi */
    seeAlso: "Voir aussi",
    modulomeOverview: "Vue d'ensemble du Modulome",
    testesPage: "Testicules (CaMKII → StAR)",
    pancreasPage: "Pancréas (VGCC des cellules β)",
    brainPage: "Cerveau (VGCC → Alzheimer)",
    predictionsPage: "Registre des prédictions",
  },
  ko: {
    title: "갈색 지방 조직",
    subtitle:
      "VGCC → Ca²⁺ → CaMKII: 두 개의 독립적 열 발생 경로가 교란된다",
    backLink: "← 모듈롬으로 돌아가기",

    /* --- 섹션 1: BAT 채널 아키텍처 --- */
    s1SectionTitle: "BAT 채널 아키텍처",

    /* 01 채널 프로파일 */
    channelProfile: "채널 프로파일",
    channel: "채널",
    gene: "유전자",
    cellType: "세포 유형",
    function: "기능",
    level: "증거 수준",
    channelVal: "VGCC (전압 의존성 칼슘 채널)",
    geneVal: "CACNA1H (Cav3.2) — CaMKII 하류",
    cellTypeVal: "갈색 지방 세포",
    functionVal:
      "UCP1 전사 + SERCA2b/RyR2 Ca²⁺ 순환을 통한 열 발생",
    levelVal: "E",

    /* --- 섹션 2: 이중 열 발생 메커니즘 --- */
    s2SectionTitle: "이중 열 발생 메커니즘",

    /* 02 UCP1 경로 */
    s2Title: "경로 1: CaMKII → UCP1 전사",
    s2Chain:
      "VGCC → Ca²⁺ → CaMKII → CREB 인산화 → UCP1 전사 ↓ → 양성자 누출 ↓ → 열 발생 ↓",
    s2p1: "UCP1(탈공역 단백질 1)은 갈색 지방 조직을 정의하는 단백질이다. 미토콘드리아 내막에 위치하며 양성자 기울기를 ATP 대신 열로 소산시킨다 — 비떨림 열 발생의 분자적 기반이다. UCP1 발현은 CaMKII/CREB 신호 전달 축에 의해 조절된다: VGCC를 통한 Ca²⁺ 유입이 CaMKII를 활성화하고, CaMKII가 CREB를 인산화하며, CREB가 UCP1 유전자 전사를 구동한다.",
    s2p2: "EMF에 의한 VGCC 게이팅 장애는 갈색 지방 세포의 Ca²⁺ 역학을 변화시킨다. 하류 효과는 CaMKII 활성화 감소, CREB 인산화 장애, UCP1 전사 감소이다. UCP1이 감소하면 미토콘드리아 양성자 누출이 줄어들고, 세포는 열로 소비하는 칼로리가 감소한다. 조직 자체가 해부학적으로 온전하더라도 BAT의 열 발생 능력은 저하된다.",
    s2p3: "이 경로는 용량 및 시간 의존적이다. [[ref:maalouf2023|Maalouf et al. (2023)]]은 SAR 0.1~0.4 W/kg에서의 900 MHz 노출이 BAT 열 발생과 미토콘드리아 활성을 용량-반응적으로 감소시킴을 입증했다. 이는 VGCC 매개 메커니즘이 정확히 예측하는 패턴이다.",

    /* 03 Ca²⁺ 순환 경로 */
    s3Title: "경로 2: SERCA2b/RyR2 Ca²⁺ 무익 순환",
    s3Chain:
      "SERCA2b가 Ca²⁺를 ER로 펌핑 → RyR2가 Ca²⁺를 방출 → 순환 반복 → ATP가 열로 가수분해",
    s3p1: "UCP1과 독립적으로, 갈색 지방 세포는 두 번째 열 발생 메커니즘을 보유한다: SERCA2b/RyR2 칼슘 무익 순환. SERCA2b(근소포체/소포체 Ca²⁺-ATPase 2b)는 세포질 Ca²⁺를 ATP를 소비하며 소포체로 펌핑한다. 리아노딘 수용체 RyR2는 Ca²⁺를 세포질로 다시 방출한다. 이 순환은 지속적으로 반복되며, ATP 에너지를 생산적 작업 없이 열로 전환한다 — 열 발생 '무익 순환'이다.",
    s3p2: "이 메커니즘은 완전히 Ca²⁺ 의존적이며, 따라서 VGCC 교란에 직접 영향을 받는다. EMF 유발 세포 내 Ca²⁺ 항상성 변화는 SERCA2b 펌프 속도와 RyR2 방출 역학 모두를 교란시켜 무익 순환의 열 발생 출력을 저하시킨다. 이 경로는 UCP1과 독립적으로 작동하기 때문에, EMF 노출은 두 가지 열 발생 메커니즘을 동시에 손상시킨다 — 세포의 칼로리 연소 능력에 대한 이중 타격이다.",

    /* --- 섹션 3: 증거 --- */
    s3SectionTitle: "핵심 증거",

    /* 04 Maalouf 2023 */
    s4Title: "Maalouf et al. 2023 (PMC10342026)",
    s4p1: "SAR 0.1~0.4 W/kg에서의 900 MHz RF-EMF 노출은 BAT 열 발생과 미토콘드리아 활성을 감소시켰다. 효과는 용량 및 시간 의존적이었다 — 더 높은 SAR과 더 긴 노출이 더 큰 억제를 일으켰다. 이 연구는 휴대전화 사용 범위 내의 노출 수준에서 EMF 유발 열 발생 장애의 직접 측정을 제공한다.",
    s4Badge: "E — 직접 측정, 용량-반응",

    /* 05 프랑스 5G 연구 2025 */
    s5Title: "5G 분화 연구 2025 (PMC11942954)",
    s5p1: "프랑스 연구 그룹이 전구 지방 세포를 5G 주파수(3.5 GHz)에 노출하고 갈색 지방 세포의 주요 분화 마커 발현을 측정했다. 결과:",
    s5Stats: [
      "PRDM16 발현: −49% — 갈색 지방 세포 정체성의 마스터 전사 인자",
      "C/EBPβ 발현: −32% — 갈색 지방 세포 분화 프로그램에 필수적",
    ],
    s5p2: "PRDM16은 전구세포가 갈색 지방세포가 될지 백색 지방세포가 될지를 결정하는 전사인자이다. 49% 감소는 잠재적인 갈색 지방세포 분화의 거의 절반이 차단됨을 의미한다. C/EBPβ는 갈색 지방 유전자 프로그램에서 PRDM16과 협력한다. 이 두 감소는 5G 노출이 새로운 갈색 지방세포를 생성하는 신체 능력을 상당히 손상시켜 기존 BAT의 활성뿐 아니라 조직의 재생 능력까지 낮춘다는 것을 나타낸다.",

    /* --- 섹션 4: CaMKII 수렴 --- */
    s4SectionTitle: "CaMKII 수렴",

    /* 06 CaMKII 연결 */
    s6Title: "CaMKII 허브: 같은 분자, 여러 기관",
    s6p1: "BAT 열 발생을 매개하는 CaMKII는 BERM 모듈롬 전체에서 작동하는 동일한 칼슘/칼모듈린 의존성 단백질 키나아제 II이다:",
    s6Points: [
      "BAT에서: CaMKII → CREB → UCP1 전사 (열 발생)",
      "정소에서: CaMKII가 Cav3.2 활성화 역치를 변경 → StAR 조절 (스테로이드 생성)",
      "뇌에서: CaMKII → 시냅스 가소성, 기억 고정",
      "심장에서: CaMKII → Ca²⁺ 과부하 하 부정맥 유발",
    ],
    s6p2: "이 수렴은 우연이 아니다. CaMKII는 VGCC 매개 Ca²⁺ 유입의 직접적인 하류 이펙터이다. EMF, 약리학적 차단 또는 유전적 돌연변이에 의한 어떤 VGCC 교란도 CaMKII를 통해 모든 하류 표적으로 동시에 전파된다. BAT 열 발생 경로는 같은 상류 메커니즘을 통해 불임, 신경퇴행 및 심장 기능장애도 유발하는 다기관 연쇄반응의 한 갈래이다.",
    s6LinkText: "전체 CaMKII 수렴 모델",

    /* --- 섹션 5: 임상적 맥락 --- */
    s5SectionTitle: "임상적 맥락",

    /* 07 냉노출 */
    s7Title: "임상적 병행: 냉노출 요법",
    s7p1: "냉노출 요법(냉수 목욕, 냉수 샤워, 저온 요법)은 EMF가 교란하는 것과 동일한 Ca²⁺ 신호 전달 경로를 통해 BAT 열 발생을 활성화한다. 냉 스트레스는 교감신경 활성화 → 노르에피네프린 방출 → β3-아드레날린 수용체 → Ca²⁺ 신호 전달 연쇄 → CaMKII → UCP1 활성화를 촉발한다. 대사 건강, 체중 관리, 인슐린 감수성 개선에 대한 냉노출의 임상적 효능은 잘 문서화되어 있다.",
    s7p2: "이는 기전적 대칭을 만든다. 한랭 노출은 VGCC → Ca²⁺ → CaMKII → UCP1 경로를 활성화하고, EMF 노출은 이를 교란한다. 동일한 분자 기구가 두 개입의 표적이며 서로 반대 방향으로 작동한다. 이 병행 관계는 해당 경로가 실제로 존재하고 대사적으로 중요하다는 독립적인 임상 검증을 제공한다. 한랭이 상향 조절할 수 있다면 EMF는 하향 조절할 수 있다.",

    /* 08 인식론적 주석 */
    s8Title: "인식론적 주석",
    s8p1: "비만은 다인자성 상태이다. 식이, 신체 활동, 유전, 장내 미생물총, 수면, 스트레스, 내분비 교란 물질이 모두 에너지 균형에 기여한다. EMF 유발 BAT 손상은 이 복잡한 환경에서의 하나의 기여 요인이지 — 유일한 원인이 아니다.",
    s8p2: "BERM 프레임워크는 EMF가 비만을 유발한다고 주장하지 않는다. EMF가 열 발생성 칼로리 소비를 줄이는 구체적이고 측정 가능한 메커니즘(VGCC → Ca²⁺ → CaMKII → UCP1/SERCA2b)을 식별한다. 그 크기(PRDM16 −49%, C/EBPβ −32%)는 에너지 균형에 대한 기여가 무시할 수 없음을 나타내지만, 식이, 운동 및 기타 요인과 비교한 상대적 비중은 인구 연구에서 정량화해야 한다.",

    /* 참고 항목 */
    seeAlso: "참고 항목",
    modulomeOverview: "모듈롬 개요",
    testesPage: "정소 (CaMKII → StAR)",
    pancreasPage: "췌장 (β세포 VGCC)",
    brainPage: "뇌 (VGCC → 알츠하이머)",
    predictionsPage: "예측 레지스터",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} – Modulome – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function BATPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/modulome`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={Flame} title={d.title} subtitle={d.subtitle} />

      {/* ═══════════════════════════════════════════════
          SECTION 1 — BAT Channel Architecture
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s1SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 01 — Channel Profile */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">01</span>
          {d.channelProfile}
        </h3>
        <div className="bg-card rounded-lg border border-card-border p-5 space-y-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <span className="text-foreground-muted">{d.channel}</span>
            <span className="text-foreground font-medium">{d.channelVal}</span>
            <span className="text-foreground-muted">{d.gene}</span>
            <span className="text-foreground font-medium font-mono text-xs">
              {d.geneVal}
            </span>
            <span className="text-foreground-muted">{d.cellType}</span>
            <span className="text-foreground font-medium">{d.cellTypeVal}</span>
            <span className="text-foreground-muted">{d.function}</span>
            <span className="text-foreground font-medium">{d.functionVal}</span>
            <span className="text-foreground-muted">{d.level}</span>
            <span className="text-foreground font-medium">
              <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                {d.levelVal}
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — Dual Thermogenic Mechanisms
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 02 — UCP1 Pathway */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s2Chain}
          </p>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s2p1}
          </p>
          <p>{d.s2p2}</p>
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              <InlineReferenceText text={d.s2p3} locale={locale} />
            </p>
          </div>
        </div>
      </section>

      {/* 03 — Ca²⁺ Futile Cycling Pathway */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s3Chain}
          </p>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s3p1}
          </p>
          <div className="border-l-4 border-amber-500/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s3p2}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — Key Evidence
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 04 — Maalouf 2023 */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          <StudyCitation
            referenceId="maalouf2023"
            locale={locale}
            label={d.s4Title}
          />
          <span className="ml-2 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
            {d.s4Badge}
          </span>
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s4p1}
        </p>
      </section>

      {/* 05 — 5G Differentiation Study */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          <StudyCitation
            referenceId="5g_bat2025"
            locale={locale}
            label={d.s5Title}
          />
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-4">
          {d.s5p1}
        </p>

        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s5Stats.map((stat, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{stat}</span>
            </li>
          ))}
        </ul>

        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s5p2}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — CaMKII Convergence
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s4SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 06 — CaMKII Connection */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-4">
          {d.s6p1}
        </p>

        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s6Points.map((point, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5 mb-4">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s6p2}
          </p>
        </div>

        <Link
          href={`/${locale}/model#camkii-convergence`}
          className="text-xs text-accent hover:underline inline-block"
        >
          {d.s6LinkText} &rarr;
        </Link>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — Clinical Context
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s5SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 07 — Cold Exposure Parallel */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s7p1}
          </p>
          <div className="border-l-4 border-green-500 rounded-r-lg bg-card p-4">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s7p2}
            </p>
          </div>
        </div>
      </section>

      {/* 08 — Epistemic Note */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">08</span>
          {d.s8Title}
        </h3>

        <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-5">
          <p className="text-sm text-foreground-muted leading-relaxed mb-3">
            {d.s8p1}
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s8p2}
          </p>
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome`}
            className="text-sm text-accent hover:underline"
          >
            {d.modulomeOverview} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/testes`}
            className="text-sm text-accent hover:underline"
          >
            {d.testesPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/pancreas`}
            className="text-sm text-accent hover:underline"
          >
            {d.pancreasPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/brain`}
            className="text-sm text-accent hover:underline"
          >
            {d.brainPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/predictions`}
            className="text-sm text-accent hover:underline"
          >
            {d.predictionsPage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
