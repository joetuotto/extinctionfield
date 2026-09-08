import { SteroidogenesisIntegrationPanel } from "@/components/SteroidogenesisIntegrationPanel";
import type { Metadata } from "next";
import Link from "next/link";
import { Droplets } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Pancreas",
    subtitle:
      "Glucose-dependent EMF susceptibility via dual Cav1 + Cav3 channels in pancreatic beta-cells",
    backLink: "← Back to Modulome",

    s1SectionTitle: "β-Cell Calcium Channel Architecture",

    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "Cav1 (L-type) + Cav3 (T-type)",
    geneVal: "CACNA1C / CACNA1D + CACNA1H",
    cellTypeVal: "Pancreatic β-cells",
    functionVal:
      "Glucose-stimulated insulin secretion via VGCC → Ca²⁺ → vesicle exocytosis",
    levelVal: "M|C",

    s2Title: "Glucose-Stimulated Insulin Secretion",
    s2p1: "Pancreatic β-cells are the insulin-producing endocrine cells of the islets of Langerhans. They rely on BOTH L-type (Cav1.2, Cav1.3) and T-type (Cav3.2) voltage-gated calcium channels for glucose-stimulated insulin secretion (GSIS). The canonical GSIS pathway proceeds: glucose enters via GLUT2 → glycolysis raises the ATP/ADP ratio → K_ATP channels close → membrane depolarizes → VGCCs activate → Ca²⁺ influx → insulin vesicle exocytosis.",
    s2p2: "T-type channels (Cav3.2) activate at a lower threshold (~−50mV) than L-type channels (Cav1.2 at ~−30mV), creating a sequential activation cascade. T-type channels fire first during the initial depolarization phase, priming the membrane and generating the early pacemaker depolarization that brings the membrane to L-type activation threshold. The L-type channels then produce the larger, sustained Ca²⁺ influx that drives the main phase of insulin exocytosis.",
    s2p3: "Channel machinery determines how beta cells convert metabolic state into secretion. A perturbation can alter amplitude, timing or recovery without causing the same functional outcome in every setting. BERM therefore measures the resting potential, calcium stores and glucose state before testing a local field effect. Channel density alone is not an exposure-response coefficient.",

    s2SectionTitle: "Glucose-dependent χ_beta candidate response",

    s3Title: "Meal-Dependent Vulnerability Window",
    s3Chain:
      "High glucose → K_ATP closes → membrane depolarizes → VGCCs primed → χ_beta HIGH ↔ Fasting → K_ATP open → membrane hyperpolarized → VGCCs inactive → χ_beta LOW",
    s3p1: "BERM names the proposed glucose-dependent β-cell response χ_beta. It is an imported L3 biological candidate, distinct from the restricted L1 geometric coefficient χ_geo(x); no raw glucose or membrane voltage is inserted into χ_geo. The K_ATP/VGCC state supplies candidate biology downstream of the open L2 bridge.",
    s3p2: "When blood glucose rises postprandially, K_ATP channels close and the membrane approaches the VGCC activation window (−50 to −30mV). BERM hypothesizes that this raises χ_beta and creates a meal-dependent vulnerability window; fasting is hypothesized to lower χ_beta. These biological predictions require controlled exposure and endpoint tests and do not close the L0→L2 mapping.",

    s3SectionTitle: "T2D and PCOS Mechanism",

    s4Title: "T2D Mechanism Chain",
    s4Chain:
      "Receiving state + meal/tissue phase → hepatic glucose output ↔ blood glucose → K_ATP/VGCC/calcium timing → insulin secretion → tissue uptake and feedback",
    s4p1: "The acute EMF effect on β-cells is disruption of the precisely calibrated Ca²⁺ signal that governs insulin exocytosis. EMF-induced perturbation of Cav1 and Cav3 channels alters the timing, amplitude, and duration of Ca²⁺ transients. Sakurai 2008 demonstrated that ELF electromagnetic fields reduced insulin secretion by approximately 30% in exposed islet cells — a direct confirmation that EMF can impair the GSIS pathway.",
    s4p2: "The chronic branch separates demand from damage. Hepatic CRY–glucagon/cAMP regulation changes glucose production, while meal timing changes tissue phase. Insulin resistance and secretion dynamics then determine beta-cell demand; repair and cell turnover determine whether that demand becomes persistent injury. Measure production, secretion, sensitivity and function before assigning the same insulin value to a direct beta-cell lesion.",

    s5Title: "Population Evidence",
    s5Stats: [
  "Population comparisons should measure age, diet, activity, infection, treatment access and local fields on comparable scales.",
  "Technology adoption or a community label cannot supply a pancreatic dose.",
  "The target bridge is measured glucose production and secretion → couple/organ state where relevant → age-specific outcomes.",
  "Low disease prevalence in a population motivates comparison; it does not identify a single protective exposure."
],

    s6Title: "PCOS — 4-Organ Convergence",
    s6p1: "BERM treats PCOS as a coupled endocrine candidate: pancreatic demand, ovarian theca and granulosa function, pituitary pulses and hepatic metabolism interact. A measured field contribution enters through a declared receiving mechanism rather than being assumed for all organs.",
    s6Organs: [
      "Pancreas β-cells (Cav1 + Cav3): EMF-induced insulin secretion impairment triggers compensatory hyperinsulinemia",
      "Ovarian theca cells: hyperinsulinemia drives excess androgen (testosterone) production",
      "Ovarian granulosa cells: aromatase activity disrupted, reducing estradiol conversion",
      "Pituitary gonadotrophs (Cav3): LH/FSH ratio elevated, disrupting ovulatory cycling",
    ],
    s6p2: "The four listed cell systems share hormones and feedback, so they do not supply independent multiplicative effect sizes. Test insulin/androgen dynamics and ovulatory function together, controlling meal phase and starting state. Component calcium biology supports the causal connections; the complete field-to-PCOS route remains a calibrated-endpoint research task.",

    s4SectionTitle: "Evidence and Predictions",

    s7Title: "EMF Evidence Summary",
    s7Stats: [
      "Sakurai 2008: ELF electromagnetic fields reduced insulin secretion by ~30% in hamster pancreatic islet cells",
      "VGCC physiology identifies a receiving mechanism to test, not a universal field sensitivity",
      "Population contrasts require comparable local-field, metabolic and demographic measurements",
      "TheraBionic parallel: FDA-approved device uses amplitude-modulated EMF → Cav3.2 activation in hepatocellular carcinoma cells at SAR levels 100–1000× below typical phone exposure",
    ],

    s8Title: "BERM Predictions",
    s8Text:
      "The BERM framework generates three testable predictions from the imported L3 χ_beta response candidate:",
    s8Predictions: [
      {
        id: "PANC-1",
        text: "The χ_beta candidate predicts that EMF exposure combined with a high-glycemic diet produces a larger insulin-secretion effect than either factor alone. This is an uncalibrated L3 interaction hypothesis, not a result derived from χ_geo.",
        discriminating: true,
      },
      {
        id: "PANC-2",
        text: "The χ_beta candidate predicts that intermittent fasting or time-restricted feeding reduces β-cell vulnerability during controlled exposure. The magnitude and any protective endpoint remain to be measured; χ_beta is not χ_geo.",
        discriminating: true,
      },
      {
        id: "PANC-3",
        text: "National T2D incidence correlates with population-level EMF density after controlling for diet composition, obesity prevalence, genetic predisposition, and physical activity levels. The residual correlation reflects the VGCC-mediated component of T2D etiology.",
        discriminating: true,
      },
    ],

    references: "Key References",
    refs: [
      {
        id: "sakurai-2008-elf-insulin",
        citation: "Sakurai et al. 2008",
        referenceId: "sakurai2008",
        finding:
          "ELF electromagnetic field exposure reduced insulin secretion by approximately 30% in hamster pancreatic islet cells, demonstrating direct EMF impairment of the GSIS pathway via voltage-gated calcium channel perturbation.",
      },
      {
        id: "therabionic-cav32-parallel",
        citation: "TheraBionic / Cav3.2 Parallel",
        referenceId: "therabionic-ebioMedicine-2019",
        finding:
          "FDA-approved therapeutic device uses amplitude-modulated electromagnetic fields to activate Cav3.2 (T-type) channels in hepatocellular carcinoma cells at SAR levels 100–1000× below typical mobile phone exposure — confirming biological VGCC effects at sub-thermal intensities.",
      },
    ],

    seeAlso: "See also",
    pituitaryModulome: "Pituitary modulome",
    brainModulome: "Brain modulome",
    predictionsPage: "Predictions — PANC series",
    evidencePage: "Evidence register",
    discriminatingLabel: "Discriminating",
    allPredictionsLabel: "All predictions →",
  },
  fi: {
    title: "Haima",
    subtitle:
      "Glukoosiriippuvainen EMF-herkkyys Cav1 + Cav3 -kaksoiskanavarkkitehtuurin kautta beetasoluissa",
    backLink: "← Takaisin moduloomiin",

    s1SectionTitle: "β-Solun kalsiumkanava-arkkitehtuuri",

    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Näyttötaso",
    channelVal: "Cav1 (L-tyyppi) + Cav3 (T-tyyppi)",
    geneVal: "CACNA1C / CACNA1D + CACNA1H",
    cellTypeVal: "Haiman β-solut",
    functionVal:
      "Glukoosistimuloitu insuliinisekretio VGCC → Ca²⁺ → vesikkeliekosytoosi",
    levelVal: "M|C",

    s2Title: "Glukoosistimuloitu insuliinisekretio",
    s2p1: "Haiman β-solut ovat Langerhansin saarekkeiden insuliinia tuottavia endokriinisia soluja. Ne käyttävät SEKÄ L-tyypin (Cav1.2, Cav1.3) ETTÄ T-tyypin (Cav3.2) jänniteohjattuja kalsiumkanavia glukoosistimuloidussa insuliinisekreetiossa (GSIS). Kanoninen GSIS-reitti etenee: glukoosi saapuu GLUT2:n kautta → glykolyysi nostaa ATP/ADP-suhdetta → K_ATP-kanavat sulkeutuvat → kalvo depolarisoituu → VGCC:t aktivoituvat → Ca²⁺-sisäänvirtaus → insuliinivesikkelien eksosytoosi.",
    s2p2: "T-tyypin kanavat (Cav3.2) aktivoituvat matalammalla kynnyksellä (~−50mV) kuin L-tyypin kanavat (Cav1.2, ~−30mV), luoden peräkkäisen aktivaatiokaskadin. T-tyypin kanavat laukeavat ensin alkuvaiheen depolarisaatiossa, virittäen kalvon ja tuottaen varhaisen tahdistindepolarisaation, joka tuo kalvon L-tyypin aktivaatiokynnykseen. L-tyypin kanavat tuottavat sitten suuremman, kestävämmän Ca²⁺-sisäänvirtauksen, joka ajaa insuliinieksosytoosin päävaiheen.",
    s2p3: "Kanavakoneisto määrää, miten β-solut muuttavat aineenvaihduntatilan eritykseksi. Muutos voi vaikuttaa amplitudiin, ajoitukseen tai palautumiseen tuottamatta samaa toiminnallista tulosta kaikissa oloissa. BERM mittaa siksi lepopotentiaalin, kalsiumvarastot ja glukoositilan ennen paikallisen kenttävaikutuksen testiä. Kanavatiheys ei yksin ole altistus–vaste-kerroin.",

    s2SectionTitle: "Glukoosiriippuvainen χ_beta-vaste-ehdokas",

    s3Title: "Aterioista riippuva haavoittuvuusikkuna",
    s3Chain:
      "Korkea glukoosi → K_ATP sulkeutuu → kalvo depolarisoituu → VGCC:t viritetty → χ_beta KORKEA ↔ Paasto → K_ATP auki → kalvo hyperpolarisoitu → VGCC:t inaktiivisia → χ_beta MATALA",
    s3p1: "BERM nimeää ehdotetun glukoosiriippuvaisen β-soluvasteen χ_beta:ksi. Se on tuotu L3-biologiaehdokas ja eri suure kuin rajoitettu L1-geometriakerroin χ_geo(x); raakaa glukoosia tai kalvojännitettä ei syötetä χ_geoon. K_ATP/VGCC-tila on ehdokasbiologiaa avoimen L2-sillan jälkeen.",
    s3p2: "Kun verensokeri nousee aterian jälkeen, K_ATP-kanavat sulkeutuvat ja kalvo lähestyy VGCC-aktivaatioikkunaa (−50...−30mV). BERM hypotesoi tämän nostavan χ_beta-vastetta ja luovan ateriariippuvaisen haavoittuvuusikkunan; paaston hypotesoidaan laskevan χ_betaa. Ennusteet vaativat kontrolloidut altistus- ja päätepistetestit eivätkä sulje L0→L2-kuvausta.",

    s3SectionTitle: "T2D- ja PCOS-mekanismi",

    s4Title: "T2D-mekanismiketju",
    s4Chain:
      "Vastaanotintila + aterian/kudoksen vaihe → maksan glukoosintuotanto ↔ veren glukoosi → K_ATP/VGCC/kalsiumin ajoitus → insuliinieritys → kudosten glukoosinotto ja palaute",
    s4p1: "EMF:n akuutti vaikutus β-soluihin on insuliinieksosytoosia ohjaavan tarkasti kalibroidun Ca²⁺-signaalin häiriö. EMF-aiheutettu Cav1- ja Cav3-kanavien häiriö muuttaa Ca²⁺-transienttien ajoitusta, amplitudia ja kestoa. Sakurai 2008 osoitti, että ELF-sähkömagneettiset kentät vähensivät insuliinisekreetiötä noin 30 % altistetuissa saarekesoluissa — suora vahvistus sille, että EMF voi heikentää GSIS-reittiä.",
    s4p2: "Krooninen haara erottaa kysynnän vauriosta. Maksan CRY–glukagoni/cAMP-säätely muuttaa glukoosintuotantoa ja ateria-aika kudoksen vaihetta. Insuliiniresistenssi ja eritysdynamiikka määräävät sitten β-solun kysyntää; korjaus ja solujen uusiutuminen määräävät, muuttuuko kysyntä pysyväksi vaurioksi. Mittaa tuotanto, eritys, herkkyys ja toiminto ennen saman insuliiniarvon tulkitsemista suoraksi β-soluvaurioksi.",

    s5Title: "Populaationäyttö",
    s5Stats: [
  "Väestövertailussa tulee mitata ikä, ravinto, aktiivisuus, infektiot, hoitoon pääsy ja paikalliset kentät vertailukelpoisilla asteikoilla.",
  "Teknologian käyttöönotto tai yhteisön nimi ei anna haiman annosta.",
  "Tavoitesilta on mitattu glukoosintuotanto ja eritys → soveltuva pari-/elintila → ikäryhmittäiset päätepisteet.",
  "Väestön pieni sairausesiintyvyys motivoi vertailua; se ei tunnista yhtä suojaavaa altistetta."
],

    s6Title: "PCOS — neljän elimen yhdentyminen",
    s6p1: "BERM käsittelee PCOS:ää kytkettynä endokriinisenä ehdokkaana: haiman kysyntä, munasarjan teeka- ja granuloosatoiminta, aivolisäkkeen pulssit ja maksan aineenvaihdunta vaikuttavat toisiinsa. Mitatun kentän osuus tulee nimetyn vastaanottomekanismin kautta eikä oletuksena kaikille elimille.",
    s6Organs: [
      "Haiman β-solut (Cav1 + Cav3): EMF-aiheutettu insuliinisekretion heikkeneminen laukaisee kompensatorisen hyperinsulinemian",
      "Munasarjan theca-solut: hyperinsulinemia ajaa liiallista androgeeni(testosteroni)tuotantoa",
      "Munasarjan granuloosasolut: aromataasiaktiivisuus häiriintyy, vähentäen estradiolikonversiota",
      "Aivolisakkeen gonadotrofit (Cav3): LH/FSH-suhde nousee, häiriten ovulatorista sykliä",
    ],
    s6p2: "Neljä lueteltua solujärjestelmää jakavat hormoneja ja palautteita, joten ne eivät anna riippumattomia kertovia vaikutuskokoja. Testaa insuliini-/androgeenidynamiikkaa ja ovulaatiotoimintaa yhdessä ja vakioi ateriavaihe sekä lähtötila. Kalsiumbiologian osanäyttö tukee kausaaliyhteyksiä; koko kentästä PCOS:ään kulkeva reitti tarvitsee päätepistekalibroinnin.",

    s4SectionTitle: "Näyttö ja ennusteet",

    s7Title: "EMF-näytön yhteenveto",
    s7Stats: [
      "Sakurai 2008: ELF-sähkömagneettiset kentät vähensivät insuliinisekreetiötä ~30 % hamsterin haiman saarekesoluissa",
      "VGCC-fysiologia tunnistaa testattavan vastaanottomekanismin, ei yleistä kenttäherkkyyttä",
      "Väestökontrastit tarvitsevat vertailukelpoiset paikalliskentän, aineenvaihdunnan ja väestön mittaukset",
      "TheraBionic-rinnakkaisuus: FDA-hyväksytty laite käyttää amplitudimoduloitua EMF:ää → Cav3.2-aktivaatio maksasolusyopäsoluissa SAR-tasoilla 100–1000× alle tyypillisen puhelimen altistuksen",
    ],

    s8Title: "BERM-ennusteet",
    s8Text:
      "BERM-kehys tuottaa kolme testattavaa ennustetta tuodusta L3-χ_beta-vaste-ehdokkaasta:",
    s8Predictions: [
      {
        id: "PANC-1",
        text: "χ_beta-ehdokas ennustaa, että EMF-altistus ja korkean glykeemisen indeksin ruokavalio tuottavat suuremman insuliinineritysvaikutuksen kuin kumpikaan tekijä yksin. Tämä on kalibroimaton L3-vuorovaikutushypoteesi, ei χ_geosta johdettu tulos.",
        discriminating: true,
      },
      {
        id: "PANC-2",
        text: "χ_beta-ehdokas ennustaa, että jaksottainen paasto tai aikaikkunaruokailu vähentää β-solun haavoittuvuutta kontrolloidussa altistuksessa. Vaikutuksen koko ja suojaava päätepiste on mitattava; χ_beta ei ole χ_geo.",
        discriminating: true,
      },
      {
        id: "PANC-3",
        text: "Kansallinen T2D-ilmaantuvuus korreloi väestötason EMF-tiheyden kanssa ruokavalion koostumuksen, lihavuuden esiintyvyyden, geneettisen alttiuden ja fyysisen aktiivisuuden vakioinnin jälkeen. Jäännöskorrelaatio heijastaa T2D-etiologian VGCC-välitteistä komponenttia.",
        discriminating: true,
      },
    ],

    references: "Keskeiset viitteet",
    refs: [
      {
        id: "sakurai-2008-elf-insulin",
        citation: "Sakurai ym. 2008",
        referenceId: "sakurai2008",
        finding:
          "ELF-sähkömagneettinen kenttäaltistus vähensi insuliinisekreetiötä noin 30 % hamsterin haiman saarekesoluissa, osoittaen suoran EMF-välitteisen GSIS-reitin heikentymisen jänniteohjattujen kalsiumkanavien häiriön kautta.",
      },
      {
        id: "therabionic-cav32-parallel",
        citation: "TheraBionic / Cav3.2 -rinnakkaisuus",
        referenceId: "therabionic-ebioMedicine-2019",
        finding:
          "FDA-hyväksytty terapeuttinen laite käyttää amplitudimoduloituja sähkömagneettisia kenttiä aktivoidakseen Cav3.2 (T-tyyppi) -kanavia maksasolusyopäsoluissa SAR-tasoilla 100–1000× alle tyypillisen matkapuhelinaltistuksen — vahvistaen biologiset VGCC-vaikutukset subtermisillä intensiteeteillä.",
      },
    ],

    seeAlso: "Katso myös",
    pituitaryModulome: "Aivolisakkeen moduloomi",
    brainModulome: "Aivojen moduloomi",
    predictionsPage: "Ennusteet — PANC-sarja",
    evidencePage: "Näyttörekisteri",
    discriminatingLabel: "Erotteleva",
    allPredictionsLabel: "Kaikki ennusteet →",
  },
  ja: {
    title: "膵臓",
    subtitle:
      "膵臓ベータ細胞におけるCav1+Cav3デュアルチャネルを介したグルコース依存性EMF感受性",
    backLink: "← Modulomeに戻る",
    s1SectionTitle: "β細胞カルシウムチャネル構造",
    channelProfile: "チャネルプロファイル",
    channel: "チャネル",
    gene: "遺伝子",
    cellType: "細胞型",
    function: "機能",
    level: "エビデンスレベル",
    channelVal: "Cav1 (L型) + Cav3 (T型)",
    geneVal: "CACNA1C / CACNA1D + CACNA1H",
    cellTypeVal: "膵β細胞",
    functionVal: "VGCC → Ca²⁺ → 小胞エキソサイトーシスによるグルコース刺激インスリン分泌",
    levelVal: "M|C",
    s2Title: "グルコース刺激インスリン分泌",
    s2p1: "膵β細胞はランゲルハンス島のインスリン産生内分泌細胞である。グルコース刺激インスリン分泌（GSIS）にL型（Cav1.2, Cav1.3）とT型（Cav3.2）の両方の電位依存性カルシウムチャネルを使用する。標準的なGSIS経路は：グルコースがGLUT2を介して入る → 解糖がATP/ADP比を上昇 → K_ATPチャネル閉鎖 → 膜脱分極 → VGCC活性化 → Ca²⁺流入 → インスリン小胞エキソサイトーシス。",
    s2p2: "T型チャネル（Cav3.2）はL型チャネル（Cav1.2, ~-30mV）より低い閾値（~-50mV）で活性化し、順次活性化カスケードを形成する。T型チャネルは初期脱分極相で最初に発火し、膜をプライミングしてL型活性化閾値への早期ペースメーカー脱分極を生成する。L型チャネルはその後、インスリンエキソサイトーシスの主相を駆動するより大きく持続的なCa²⁺流入を生成する。",
    s2p3: "このデュアルチャネル構造により、β細胞はVGCC機能に独自に依存する。いずれかのチャネル型への摂動 — 薬理学的、遺伝的、または電磁的 — はインスリン分泌経路を直接損なう。β細胞のVGCC密度はすべての内分泌細胞の中で最も高い部類であり、電磁干渉に対して本質的に感受性が高い。",
    s2SectionTitle: "グルコース依存性χ_beta応答候補",
    s3Title: "食事依存性脆弱性ウィンドウ",
    s3Chain: "高グルコース → K_ATP閉鎖 → 膜脱分極 → VGCCプライミング → χ_beta高 ↔ 空腹 → K_ATP開放 → 膜過分極 → VGCC不活性 → χ_beta低",
    s3p1: "BERMは提案するグルコース依存β細胞応答をχ_betaと名付ける。これは導入L3生物学候補であり、制限されたL1幾何係数χ_geo(x)とは別物である。生のグルコース値や膜電位をχ_geoへ入力せず、K_ATP/VGCC状態は未解決L2橋の下流にある候補生物学として扱う。",
    s3p2: "食後に血糖が上昇するとK_ATPチャネルが閉じ、膜がVGCC活性化域（−50～−30mV）へ近づく。BERMはこれがχ_betaを高め、食事依存の脆弱性窓を作り、空腹がχ_betaを低めると仮定する。この生物学的予測には制御曝露とエンドポイント試験が必要で、L0→L2写像を閉じない。",
    s3SectionTitle: "T2DとPCOSメカニズム",
    s4Title: "T2Dメカニズムチェーン",
    s4Chain: "EMF → Cav1/Cav3撹乱 → Ca²⁺調節不全 → インスリン分泌障害 → 代償性β細胞機能亢進 → β細胞疲弊 → T2D",
    s4p1: "β細胞へのEMFの急性効果は、インスリンエキソサイトーシスを制御する精密に較正されたCa²⁺シグナルの撹乱である。EMF誘発Cav1およびCav3チャネル撹乱はCa²⁺トランジェントのタイミング、振幅、持続時間を変化させる。Sakurai 2008はELF電磁場が曝露膵島細胞のインスリン分泌を約30%減少させたことを示した — EMFがGSIS経路を損なうことの直接的確認である。",
    s4p2: "2型糖尿病への慢性経路は：持続的インスリン分泌障害が代償性β細胞機能亢進を誘発 — 残存細胞が血糖管理を維持するためにより強く働く。この代償的過労がβ細胞の疲弊とアポトーシスを加速し、インスリン分泌能を漸進的に低下させる。結果は古典的T2D軌跡：耐糖能障害 → インスリン抵抗性 → 明確な糖尿病。",
    s5Title: "集団エビデンス",
    s5Stats: [
      "Tsimane（ボリビア）：T2D有病率約0% — 地球上で最も低いEMF環境",
      "Kitava（パプアニューギニア）：高炭水化物食にもかかわらずT2Dは事実上存在しない — ほぼゼロのEMF曝露",
      "Old Order Amish：T2D有病率は米国平均を大幅に下回る — 限定的な技術採用、低EMF",
      "米国：T2D有病率11.6%（CDC 2023）— 最高の人口レベルEMF密度",
    ],
    s6Title: "PCOS — 4臓器収束",
    s6p1: "BERMフレームワークは多嚢胞性卵巣症候群（PCOS）を4臓器収束疾患として再解釈する — EMFが同時に4つの臓器に影響を与え、各臓器が独立して電位依存性カルシウムチャネルに依存する状態である。この多臓器収束が特徴的なPCOS表現型を生成する：",
    s6Organs: [
      "膵β細胞（Cav1+Cav3）：EMF誘発インスリン分泌障害が代償性高インスリン血症を誘発",
      "卵巣莢膜細胞：高インスリン血症が過剰アンドロゲン（テストステロン）産生を駆動",
      "卵巣顆粒膜細胞：アロマターゼ活性が撹乱されエストラジオール変換が減少",
      "下垂体ゴナドトロフ（Cav3）：LH/FSH比が上昇し排卵周期が撹乱",
    ],
    s6p2: "これら4つの臓器はそれぞれ独立してVGCCを核心的内分泌機能に使用する。EMFはPCOSを特異的に標的にする必要はない — 4つのVGCC依存系すべてを同時に撹乱し、これら4つの撹乱の収束がPCOS表現型を生成する。PCOSは生殖年齢女性の5-20%に影響し、EMF環境の密度増加と並行して有病率が上昇している。",
    s4SectionTitle: "エビデンスと予測",
    s7Title: "EMFエビデンス概要",
    s7Stats: [
      "Sakurai 2008：ELF電磁場がハムスター膵島細胞のインスリン分泌を約30%減少",
      "β細胞VGCC密度はすべての内分泌細胞型の中で最も高い部類であり、本質的にEMF感受性が高い",
      "すべての研究された低EMF集団（Tsimane、Kitava、Amish）は食事組成に関わらずほぼゼロのT2D有病率を示す",
      "TheraBionic並行：FDA承認デバイスが振幅変調EMF → 肝細胞癌細胞でのCav3.2活性化を典型的な電話曝露より100-1000倍低いSARレベルで使用",
    ],
    s8Title: "BERM予測",
    s8Text: "BERMフレームワークは導入L3 χ_beta応答候補から3つの検証可能な予測を生成する：",
    s8Predictions: [
      {
        id: "PANC-1",
        text: "χ_beta候補はEMF曝露と高GI食の組合せが単独要因より大きいインスリン分泌影響を生むと予測する。これは未較正L3相互作用仮説であり、χ_geoから導出された結果ではない。",
        discriminating: true,
      },
      {
        id: "PANC-2",
        text: "χ_beta候補は間欠的断食または時間制限食が制御曝露下のβ細胞脆弱性を下げると予測する。効果量と保護エンドポイントは測定が必要であり、χ_betaはχ_geoではない。",
        discriminating: true,
      },
      {
        id: "PANC-3",
        text: "国家T2D発生率は食事組成、肥満有病率、遺伝的素因、身体活動レベルを制御した後の人口レベルEMF密度と相関する。残差相関はT2D病因のVGCC媒介成分を反映する。",
        discriminating: true,
      },
    ],
    references: "主要参考文献",
    refs: [
      {
        id: "sakurai-2008-elf-insulin",
        citation: "Sakurai et al. 2008",
        referenceId: "sakurai2008",
        finding: "ELF電磁場曝露がハムスター膵島細胞のインスリン分泌を約30%減少させ、電位依存性カルシウムチャネル撹乱によるGSIS経路の直接的EMF障害を実証した。",
      },
      {
        id: "therabionic-cav32-parallel",
        citation: "TheraBionic / Cav3.2並行",
        referenceId: "therabionic-ebioMedicine-2019",
        finding: "FDA承認治療機器が振幅変調電磁場を使用して肝細胞癌細胞のCav3.2（T型）チャネルを活性化。SARレベルは典型的な携帯電話曝露の100-1000倍低い — サブサーマル強度での生物学的VGCC効果を確認。",
      },
    ],
    seeAlso: "関連項目",
    pituitaryModulome: "下垂体モジュローム",
    brainModulome: "脳モジュローム",
    predictionsPage: "予測 — PANCシリーズ",
    evidencePage: "エビデンスレジスター",
    discriminatingLabel: "弁別的",
    allPredictionsLabel: "すべての予測 →",
  },
  fr: {
    title: "Pancreas",
    subtitle:
      "Susceptibilite EMF dependante du glucose via les canaux doubles Cav1 + Cav3 dans les cellules beta pancreatiques",
    backLink: "← Retour au Modulome",
    s1SectionTitle: "Architecture des canaux calciques des cellules beta",
    channelProfile: "Profil du canal",
    channel: "Canal",
    gene: "Gene",
    cellType: "Type cellulaire",
    function: "Fonction",
    level: "Niveau de preuve",
    channelVal: "Cav1 (type L) + Cav3 (type T)",
    geneVal: "CACNA1C / CACNA1D + CACNA1H",
    cellTypeVal: "Cellules beta pancreatiques",
    functionVal: "Secretion d'insuline stimulee par le glucose via VGCC → Ca²⁺ → exocytose vesiculaire",
    levelVal: "M|C",
    s2Title: "Secretion d'insuline stimulee par le glucose",
    s2p1: "Les cellules beta pancreatiques sont les cellules endocrines productrices d'insuline des ilots de Langerhans. Elles reposent sur les canaux calciques voltage-dependants de type L (Cav1.2, Cav1.3) et de type T (Cav3.2) pour la secretion d'insuline stimulee par le glucose (GSIS). La voie canonique GSIS est : glucose entre via GLUT2 → la glycolyse augmente le ratio ATP/ADP → les canaux K_ATP se ferment → depolarisation membranaire → activation des VGCC → influx de Ca²⁺ → exocytose des vesicules d'insuline.",
    s2p2: "Les canaux de type T (Cav3.2) s'activent a un seuil plus bas (~-50mV) que les canaux de type L (Cav1.2, ~-30mV), creant une cascade d'activation sequentielle. Les canaux de type T tirent en premier pendant la phase initiale de depolarisation, amorcant la membrane et generant la depolarisation precoce du pacemaker qui amene la membrane au seuil d'activation du type L. Les canaux de type L produisent ensuite l'influx de Ca²⁺ plus important et soutenu qui conduit la phase principale de l'exocytose de l'insuline.",
    s2p3: "Cette architecture a double canal rend les cellules beta uniquement dependantes de la fonction VGCC. Toute perturbation de l'un ou l'autre type de canal — pharmacologique, genetique ou electromagnetique — compromet directement la voie de secretion de l'insuline. La densite VGCC des cellules beta est parmi les plus elevees de toutes les cellules endocrines, ce qui les rend inheremment susceptibles aux interferences electromagnetiques.",
    s2SectionTitle: "Réponse candidate χ_beta dépendante du glucose",
    s3Title: "Fenetre de vulnerabilite dependante du repas",
    s3Chain: "Glucose élevé → K_ATP fermé → membrane dépolarisée → VGCC amorcés → χ_beta ÉLEVÉ ↔ Jeûne → K_ATP ouvert → membrane hyperpolarisée → VGCC inactifs → χ_beta BAS",
    s3p1: "BERM nomme χ_beta la réponse proposée des cellules bêta dépendante du glucose. C'est un candidat biologique L3 importé, distinct du coefficient géométrique L1 restreint χ_geo(x) ; ni le glucose brut ni le potentiel membranaire ne sont injectés dans χ_geo. L'état K_ATP/VGCC est une biologie candidate en aval du pont L2 ouvert.",
    s3p2: "Après un repas, les canaux K_ATP se ferment et la membrane approche la fenêtre d'activation VGCC (−50 à −30 mV). BERM pose l'hypothèse que cela élève χ_beta et crée une fenêtre de vulnérabilité liée au repas, tandis que le jeûne abaisse χ_beta. Ces prédictions exigent des tests contrôlés d'exposition et d'endpoint et ne ferment pas l'application L0→L2.",
    s3SectionTitle: "Mecanisme T2D et SOPK",
    s4Title: "Chaine mecanistique T2D",
    s4Chain: "EMF → perturbation Cav1/Cav3 → dysregulation Ca²⁺ → secretion d'insuline alteree → hyperfonction beta compensatoire → epuisement des cellules beta → T2D",
    s4p1: "L'effet aigu des EMF sur les cellules beta est la perturbation du signal Ca²⁺ precisement calibre qui gouverne l'exocytose de l'insuline. La perturbation induite par les EMF des canaux Cav1 et Cav3 altere le timing, l'amplitude et la duree des transitoires calciques. Sakurai 2008 a demontre que les champs electromagnetiques ELF reduisaient la secretion d'insuline d'environ 30% dans les cellules des ilots exposes — une confirmation directe que les EMF peuvent alterer la voie GSIS.",
    s4p2: "La voie chronique vers le diabete de type 2 suit : l'alteration soutenue de la secretion d'insuline declenche une hyperfonction compensatoire des cellules beta — les cellules restantes travaillent plus dur pour maintenir le controle glycemique. Ce surmenage compensatoire accelere l'epuisement et l'apoptose des cellules beta, reduisant progressivement la capacite secretoire d'insuline. Le resultat est la trajectoire classique du T2D : intolerance au glucose → resistance a l'insuline → diabete manifeste.",
    s5Title: "Preuves populationnelles",
    s5Stats: [
      "Tsimane (Bolivie) : prevalence du T2D environ 0% — environnement EMF le plus bas mesure sur Terre",
      "Kitava (Papouasie-Nouvelle-Guinee) : T2D effectivement absent malgre un regime riche en glucides — exposition EMF quasi nulle",
      "Amish Old Order : prevalence T2D significativement inferieure a la moyenne americaine — adoption technologique limitee, EMF plus faible",
      "Etats-Unis : prevalence T2D 11,6% (CDC 2023) — densite EMF la plus elevee au niveau de la population",
    ],
    s6Title: "SOPK — Convergence de 4 organes",
    s6p1: "Le cadre BERM reinterprete le syndrome des ovaires polykystiques (SOPK) comme une maladie de convergence de 4 organes — une condition ou les EMF affectent simultanement quatre organes, chacun dependant independamment des canaux calciques voltage-dependants. Cette convergence multi-organes produit le phenotype caracteristique du SOPK :",
    s6Organs: [
      "Cellules beta pancreatiques (Cav1+Cav3) : l'alteration de la secretion d'insuline induite par les EMF declenche une hyperinsulinemie compensatoire",
      "Cellules de la theque ovarienne : l'hyperinsulinemie entraine une production excessive d'androgenes (testosterone)",
      "Cellules de la granulosa ovarienne : l'activite de l'aromatase est perturbee, reduisant la conversion en estradiol",
      "Gonadotrophes hypophysaires (Cav3) : le ratio LH/FSH est eleve, perturbant le cycle ovulatoire",
    ],
    s6p2: "Chacun de ces quatre organes utilise independamment les VGCC pour sa fonction endocrine principale. Les EMF n'ont pas besoin de cibler specifiquement le SOPK — ils perturbent simultanement les quatre systemes dependants des VGCC, et la convergence de ces quatre perturbations produit le phenotype SOPK. Le SOPK affecte 5 a 20% des femmes en age de procreer dans le monde, avec une prevalence qui augmente parallèlement a la densification de l'environnement EMF.",
    s4SectionTitle: "Preuves et predictions",
    s7Title: "Resume des preuves EMF",
    s7Stats: [
      "Sakurai 2008 : les champs electromagnetiques ELF ont reduit la secretion d'insuline d'environ 30% dans les cellules d'ilots pancreatiques de hamster",
      "La densite VGCC des cellules beta est parmi les plus elevees de tous les types de cellules endocrines, ce qui les rend inheremment sensibles aux EMF",
      "Toutes les populations a faible EMF etudiees (Tsimane, Kitava, Amish) montrent une prevalence de T2D quasi nulle independamment de la composition du regime alimentaire",
      "Parallele TheraBionic : un dispositif approuve par la FDA utilise des EMF modules en amplitude → activation de Cav3.2 dans les cellules de carcinome hepatocellulaire a des niveaux de SAR 100 a 1000 fois inferieurs a l'exposition typique d'un telephone",
    ],
    s8Title: "Predictions BERM",
    s8Text: "Le cadre BERM génère trois prédictions testables à partir du candidat L3 importé χ_beta :",
    s8Predictions: [
      {
        id: "PANC-1",
        text: "Le candidat χ_beta prédit que l'exposition EMF combinée à un régime à indice glycémique élevé produit un effet plus grand sur la sécrétion d'insuline que chaque facteur seul. C'est une hypothèse d'interaction L3 non calibrée, non un résultat dérivé de χ_geo.",
        discriminating: true,
      },
      {
        id: "PANC-2",
        text: "Le candidat χ_beta prédit que le jeûne intermittent ou l'alimentation à temps restreint réduit la vulnérabilité des cellules bêta sous exposition contrôlée. L'ampleur et l'endpoint protecteur restent à mesurer ; χ_beta n'est pas χ_geo.",
        discriminating: true,
      },
      {
        id: "PANC-3",
        text: "L'incidence nationale du T2D correle avec la densite EMF au niveau de la population apres controle de la composition du regime, de la prevalence de l'obesite, de la predisposition genetique et des niveaux d'activite physique. La correlation residuelle reflete la composante mediee par les VGCC de l'etiologie du T2D.",
        discriminating: true,
      },
    ],
    references: "References cles",
    refs: [
      {
        id: "sakurai-2008-elf-insulin",
        citation: "Sakurai et al. 2008",
        referenceId: "sakurai2008",
        finding: "L'exposition aux champs electromagnetiques ELF a reduit la secretion d'insuline d'environ 30% dans les cellules d'ilots pancreatiques de hamster, demontrant l'alteration directe de la voie GSIS par les EMF via la perturbation des canaux calciques voltage-dependants.",
      },
      {
        id: "therabionic-cav32-parallel",
        citation: "TheraBionic / Parallele Cav3.2",
        referenceId: "therabionic-ebioMedicine-2019",
        finding: "Un dispositif therapeutique approuve par la FDA utilise des champs electromagnetiques modules en amplitude pour activer les canaux Cav3.2 (type T) dans les cellules de carcinome hepatocellulaire a des niveaux de SAR 100 a 1000 fois inferieurs a l'exposition typique d'un telephone mobile — confirmant les effets biologiques VGCC a des intensites sous-thermiques.",
      },
    ],
    seeAlso: "Voir aussi",
    pituitaryModulome: "Modulome hypophysaire",
    brainModulome: "Modulome cerebral",
    predictionsPage: "Predictions — Serie PANC",
    evidencePage: "Registre des preuves",
    discriminatingLabel: "Discriminant",
    allPredictionsLabel: "Toutes les predictions →",
  },
  ko: {
    title: "췌장",
    subtitle:
      "췌장 베타 세포의 이중 Cav1 + Cav3 채널을 통한 포도당 의존적 EMF 감수성",
    backLink: "← Modulome으로 돌아가기",
    s1SectionTitle: "β세포 칼슘 채널 구조",
    channelProfile: "채널 프로필",
    channel: "채널",
    gene: "유전자",
    cellType: "세포 유형",
    function: "기능",
    level: "증거 수준",
    channelVal: "Cav1 (L형) + Cav3 (T형)",
    geneVal: "CACNA1C / CACNA1D + CACNA1H",
    cellTypeVal: "췌장 β세포",
    functionVal: "VGCC → Ca²⁺ → 소포 외분비를 통한 포도당 자극 인슐린 분비",
    levelVal: "M|C",
    s2Title: "포도당 자극 인슐린 분비",
    s2p1: "췌장 β세포는 랑게르한스섬의 인슐린 생산 내분비 세포이다. 포도당 자극 인슐린 분비(GSIS)에 L형(Cav1.2, Cav1.3)과 T형(Cav3.2) 전압 의존성 칼슘 채널을 모두 사용한다. 표준 GSIS 경로: 포도당이 GLUT2를 통해 유입 → 해당과정이 ATP/ADP 비율 상승 → K_ATP 채널 폐쇄 → 막 탈분극 → VGCC 활성화 → Ca²⁺ 유입 → 인슐린 소포 외분비.",
    s2p2: "T형 채널(Cav3.2)은 L형 채널(Cav1.2, ~-30mV)보다 낮은 역치(~-50mV)에서 활성화되어 순차적 활성화 캐스케이드를 형성한다. T형 채널은 초기 탈분극 상에서 먼저 발화하여 막을 프라이밍하고 L형 활성화 역치로 도달하게 하는 초기 페이스메이커 탈분극을 생성한다. L형 채널은 이후 인슐린 외분비의 주 단계를 구동하는 더 크고 지속적인 Ca²⁺ 유입을 생성한다.",
    s2p3: "이 이중 채널 구조는 β세포를 VGCC 기능에 고유하게 의존적으로 만든다. 어느 채널 유형에 대한 교란이든 — 약리학적, 유전적, 또는 전자기적 — 인슐린 분비 경로를 직접 손상시킨다. β세포의 VGCC 밀도는 모든 내분비 세포 중 가장 높은 부류로, 전자기 간섭에 본질적으로 감수성이 높다.",
    s2SectionTitle: "포도당 의존 χ_beta 반응 후보",
    s3Title: "식사 의존적 취약성 창",
    s3Chain: "고혈당 → K_ATP 폐쇄 → 막 탈분극 → VGCC 프라이밍 → χ_beta 높음 ↔ 공복 → K_ATP 개방 → 막 과분극 → VGCC 비활성 → χ_beta 낮음",
    s3p1: "BERM은 제안된 포도당 의존 β세포 반응을 χ_beta로 명명한다. 이는 제한된 L1 기하 계수 χ_geo(x)와 구별되는 도입 L3 생물학 후보이며 원시 포도당이나 막전위를 χ_geo에 넣지 않는다. K_ATP/VGCC 상태는 열린 L2 다리 하류의 후보 생물학이다.",
    s3p2: "식후 혈당이 상승하면 K_ATP 채널이 닫히고 막이 VGCC 활성화 창(−50~−30 mV)에 접근한다. BERM은 이것이 χ_beta를 높여 식사 의존 취약성 창을 만들고 공복이 χ_beta를 낮춘다고 가정한다. 이 생물학적 예측에는 통제 노출과 종점 검정이 필요하며 L0→L2 매핑을 닫지 않는다.",
    s3SectionTitle: "T2D 및 PCOS 메커니즘",
    s4Title: "T2D 메커니즘 사슬",
    s4Chain: "EMF → Cav1/Cav3 교란 → Ca²⁺ 조절 장애 → 인슐린 분비 장애 → 보상적 β세포 기능항진 → β세포 소진 → T2D",
    s4p1: "β세포에 대한 EMF의 급성 효과는 인슐린 외분비를 지배하는 정밀하게 교정된 Ca²⁺ 신호의 교란이다. EMF 유도 Cav1 및 Cav3 채널 교란은 Ca²⁺ 트랜지언트의 타이밍, 진폭 및 지속 시간을 변화시킨다. Sakurai 2008은 ELF 전자기장이 노출된 췌도 세포에서 인슐린 분비를 약 30% 감소시켰음을 증명했다 — EMF가 GSIS 경로를 손상시킬 수 있다는 직접적 확인이다.",
    s4p2: "2형 당뇨병으로의 만성 경로: 지속적 인슐린 분비 장애가 보상적 β세포 기능항진을 유발 — 남은 세포가 혈당 조절을 유지하기 위해 더 열심히 일한다. 이 보상적 과로가 β세포 소진과 세포사멸을 가속화하여 인슐린 분비 능력을 점진적으로 감소시킨다. 결과는 전형적 T2D 궤적: 내당능 장애 → 인슐린 저항성 → 명확한 당뇨병.",
    s5Title: "인구 증거",
    s5Stats: [
      "Tsimane(볼리비아): T2D 유병률 약 0% — 지구상에서 가장 낮은 EMF 환경",
      "Kitava(파푸아뉴기니): 고탄수화물 식단에도 불구하고 T2D 사실상 부재 — 거의 제로 EMF 노출",
      "Old Order Amish: T2D 유병률이 미국 평균보다 유의하게 낮음 — 제한된 기술 채택, 더 낮은 EMF",
      "미국: T2D 유병률 11.6% (CDC 2023) — 가장 높은 인구 수준 EMF 밀도",
    ],
    s6Title: "PCOS — 4장기 수렴",
    s6p1: "BERM 프레임워크는 다낭성 난소 증후군(PCOS)을 4장기 수렴 질환으로 재해석한다 — EMF가 동시에 4개 장기에 영향을 미치고, 각 장기가 독립적으로 전압 의존성 칼슘 채널에 의존하는 상태이다. 이 다장기 수렴이 특징적인 PCOS 표현형을 생성한다:",
    s6Organs: [
      "췌장 β세포(Cav1+Cav3): EMF 유도 인슐린 분비 장애가 보상적 고인슐린혈증 유발",
      "난소 막세포: 고인슐린혈증이 과도한 안드로겐(테스토스테론) 생산 구동",
      "난소 과립막 세포: 아로마타제 활성 교란, 에스트라디올 전환 감소",
      "뇌하수체 성선자극세포(Cav3): LH/FSH 비율 상승, 배란 주기 교란",
    ],
    s6p2: "이 4개 장기 각각은 독립적으로 VGCC를 핵심 내분비 기능에 사용한다. EMF는 PCOS를 특이적으로 표적할 필요가 없다 — 4개의 VGCC 의존 시스템 모두를 동시에 교란하며, 이 4개 교란의 수렴이 PCOS 표현형을 생성한다. PCOS는 전 세계 생식 연령 여성의 5-20%에 영향을 미치며, EMF 환경 밀도화와 병행하여 유병률이 증가하고 있다.",
    s4SectionTitle: "증거와 예측",
    s7Title: "EMF 증거 요약",
    s7Stats: [
      "Sakurai 2008: ELF 전자기장이 햄스터 췌도 세포에서 인슐린 분비를 ~30% 감소",
      "β세포 VGCC 밀도는 모든 내분비 세포 유형 중 가장 높은 부류로, 본질적으로 EMF 감수성이 높다",
      "연구된 모든 저 EMF 인구(Tsimane, Kitava, Amish)가 식이 조성과 무관하게 거의 제로 T2D 유병률을 보임",
      "TheraBionic 병행: FDA 승인 장치가 진폭 변조 EMF 사용 → 간세포 암종 세포에서 Cav3.2 활성화를 전형적 전화 노출보다 100-1000배 낮은 SAR 수준에서",
    ],
    s8Title: "BERM 예측",
    s8Text: "BERM 프레임워크는 도입 L3 χ_beta 반응 후보에서 세 가지 검정 가능한 예측을 만든다:",
    s8Predictions: [
      {
        id: "PANC-1",
        text: "χ_beta 후보는 EMF 노출과 고GI 식단의 조합이 각 요인 단독보다 더 큰 인슐린 분비 효과를 만든다고 예측한다. 이는 보정되지 않은 L3 상호작용 가설이지 χ_geo에서 도출된 결과가 아니다.",
        discriminating: true,
      },
      {
        id: "PANC-2",
        text: "χ_beta 후보는 간헐적 단식 또는 시간 제한 식사가 통제 노출에서 β세포 취약성을 낮춘다고 예측한다. 효과 크기와 보호 종점은 측정이 필요하며 χ_beta는 χ_geo가 아니다.",
        discriminating: true,
      },
      {
        id: "PANC-3",
        text: "국가 T2D 발생률이 식이 조성, 비만 유병률, 유전적 소인, 신체 활동 수준을 통제한 후 인구 수준 EMF 밀도와 상관관계를 보인다. 잔여 상관관계는 T2D 병인의 VGCC 매개 구성 요소를 반영한다.",
        discriminating: true,
      },
    ],
    references: "주요 참고문헌",
    refs: [
      {
        id: "sakurai-2008-elf-insulin",
        citation: "Sakurai et al. 2008",
        referenceId: "sakurai2008",
        finding: "ELF 전자기장 노출이 햄스터 췌도 세포에서 인슐린 분비를 약 30% 감소시켜 전압 의존성 칼슘 채널 교란을 통한 GSIS 경로의 직접적 EMF 손상을 증명했다.",
      },
      {
        id: "therabionic-cav32-parallel",
        citation: "TheraBionic / Cav3.2 병행",
        referenceId: "therabionic-ebioMedicine-2019",
        finding: "FDA 승인 치료 장치가 진폭 변조 전자기장을 사용하여 간세포 암종 세포에서 Cav3.2(T형) 채널을 활성화. SAR 수준은 전형적 휴대전화 노출의 100-1000배 이하 — 서브서멀 강도에서의 생물학적 VGCC 효과 확인.",
      },
    ],
    seeAlso: "관련 항목",
    pituitaryModulome: "뇌하수체 모듈로옴",
    brainModulome: "뇌 모듈로옴",
    predictionsPage: "예측 — PANC 시리즈",
    evidencePage: "증거 레지스터",
    discriminatingLabel: "변별적",
    allPredictionsLabel: "모든 예측 →",
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

export default async function PancreasPage({
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

      <PageHeader icon={Droplets} title={d.title} subtitle={d.subtitle} />

      <SteroidogenesisIntegrationPanel locale={locale} focus="interventions" />
      <p className="mt-4 text-sm"><Link className="text-accent hover:underline" href={`/${locale}/model/biological-coordination#conditional-scenarios`}>{locale === "fi" ? "Tutki ajoituksen, korjauksen ja toiminnallisten porttien yhteisiä skenaarioita →" : "Explore shared scenarios for timing, repair and functional gates →"}</Link></p>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s1SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

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
              <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                {d.levelVal}
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s2p1}
          </p>
          <p>{d.s2p2}</p>
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s2p3}
            </p>
          </div>
        </div>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

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
          <p>{d.s3p2}</p>
        </div>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s4Chain}
          </p>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s4p1}
          </p>
          <p>{d.s4p2}</p>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s5Stats.map((stat, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{stat}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-4">
          {d.s6p1}
        </p>

        <ol className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s6Organs.map((organ, i) => (
            <li key={i} className="pl-1 flex gap-3">
              <span className="font-mono-num text-xs text-accent shrink-0 mt-0.5">
                {i + 1}.
              </span>
              <span>{organ}</span>
            </li>
          ))}
        </ol>

        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s6p2}
          </p>
        </div>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s4SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s7Stats.map((stat, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{stat}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">08</span>
          {d.s8Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s8Text}
        </p>

        <div className="space-y-4">
          {d.s8Predictions.map((pred) => (
            <div
              key={pred.id}
              className="border-l-4 border-green-500 rounded-r-lg bg-card p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono-num text-xs font-bold text-accent">
                  {pred.id}
                </span>
                {pred.discriminating && (
                  <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                    {d.discriminatingLabel}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {pred.text}
              </p>
            </div>
          ))}
          <Link
            href={`/${locale}/predictions`}
            className="text-xs text-accent hover:underline mt-2 inline-block"
          >
            {d.allPredictionsLabel}
          </Link>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          {d.references}
        </h3>
        <div className="space-y-3">
          {d.refs.map((ref) => (
            <div
              key={ref.id}
              className="bg-card rounded-lg border border-card-border p-4"
            >
              <p className="text-xs font-semibold text-accent mb-1">
                <CitationLink referenceId={ref.referenceId} locale={locale} citation={ref.citation} />
              </p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {ref.finding}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome/pituitary`}
            className="text-sm text-accent hover:underline"
          >
            {d.pituitaryModulome} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/brain`}
            className="text-sm text-accent hover:underline"
          >
            {d.brainModulome} &rarr;
          </Link>
          <Link
            href={`/${locale}/predictions`}
            className="text-sm text-accent hover:underline"
          >
            {d.predictionsPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
