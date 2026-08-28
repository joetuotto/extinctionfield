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
    s2p3: "This dual-channel architecture makes β-cells uniquely dependent on VGCC function. Any perturbation of either channel type — whether pharmacological, genetic, or electromagnetic — directly impairs the insulin secretion pathway. The β-cell has one of the highest VGCC densities of any endocrine cell, making it inherently susceptible to electromagnetic interference.",

    s2SectionTitle: "Glucose-Dependent χ Mechanism",

    s3Title: "Meal-Dependent Vulnerability Window",
    s3Chain:
      "High glucose → K_ATP closes → membrane depolarizes → VGCCs primed → χ HIGH ↔ Fasting → K_ATP open → membrane hyperpolarized → VGCCs inactive → χ LOW",
    s3p1: "The β-cell presents a unique feature in the BERM framework: its EMF susceptibility (χ) is dynamically modulated by blood glucose concentration. The K_ATP channel acts as a molecular voltage gate — when blood glucose is low, K_ATP channels remain open, clamping the membrane at approximately −70mV. At this potential, VGCCs are firmly inactive and cannot be perturbed by external electromagnetic fields. The cell is effectively shielded.",
    s3p2: "When blood glucose rises postprandially, K_ATP channels close, the membrane depolarizes toward the VGCC activation window (−50 to −30mV), and the channels become primed — poised at the threshold where small voltage perturbations can trigger premature or excessive Ca²⁺ influx. This creates a meal-dependent vulnerability window: after eating (especially high-glycemic meals), β-cell χ is maximized. Fasting, conversely, hyperpolarizes the membrane and minimizes χ. This mechanism explains why fasting may be protective against EMF-induced metabolic disruption, and why high-glycemic diets synergize with EMF exposure.",

    s3SectionTitle: "T2D and PCOS Mechanism",

    s4Title: "T2D Mechanism Chain",
    s4Chain:
      "EMF → Cav1/Cav3 perturbation → Ca²⁺ dysregulation → insulin secretion impaired → compensatory β-cell hyperfunction → β-cell exhaustion → T2D",
    s4p1: "The acute EMF effect on β-cells is disruption of the precisely calibrated Ca²⁺ signal that governs insulin exocytosis. EMF-induced perturbation of Cav1 and Cav3 channels alters the timing, amplitude, and duration of Ca²⁺ transients. Sakurai 2008 demonstrated that ELF electromagnetic fields reduced insulin secretion by approximately 30% in exposed islet cells — a direct confirmation that EMF can impair the GSIS pathway.",
    s4p2: "The chronic pathway to type 2 diabetes follows: sustained insulin secretion impairment triggers compensatory β-cell hyperfunction — the remaining cells work harder to maintain glycemic control. This compensatory overwork accelerates β-cell exhaustion and apoptosis, progressively reducing insulin-secreting capacity. The result is the classic T2D trajectory: impaired glucose tolerance → insulin resistance → overt diabetes.",

    s5Title: "Population Evidence",
    s5Stats: [
      "Tsimane (Bolivia): T2D prevalence approximately 0% — lowest recorded EMF environment on Earth",
      "Kitava (Papua New Guinea): T2D effectively absent despite high-carbohydrate diet — near-zero EMF exposure",
      "Old Order Amish: T2D prevalence significantly below US average — limited technology adoption, lower EMF",
      "United States: T2D prevalence 11.6% (CDC 2023) — highest population-level EMF density",
    ],

    s6Title: "PCOS — 4-Organ Convergence",
    s6p1: "Polycystic ovary syndrome (PCOS) is reinterpreted by the BERM framework as a 4-organ convergence disease — a condition where EMF simultaneously affects four organs, each independently dependent on voltage-gated calcium channels. This multi-organ convergence produces the characteristic PCOS phenotype:",
    s6Organs: [
      "Pancreas β-cells (Cav1 + Cav3): EMF-induced insulin secretion impairment triggers compensatory hyperinsulinemia",
      "Ovarian theca cells: hyperinsulinemia drives excess androgen (testosterone) production",
      "Ovarian granulosa cells: aromatase activity disrupted, reducing estradiol conversion",
      "Pituitary gonadotrophs (Cav3): LH/FSH ratio elevated, disrupting ovulatory cycling",
    ],
    s6p2: "Each of these four organs independently uses VGCCs for its core endocrine function. EMF does not need to target PCOS specifically — it simultaneously perturbs all four VGCC-dependent systems, and the convergence of these four disruptions produces the PCOS phenotype. PCOS affects 5–20% of reproductive-age women globally, with prevalence rising in parallel with EMF environment densification.",

    s4SectionTitle: "Evidence and Predictions",

    s7Title: "EMF Evidence Summary",
    s7Stats: [
      "Sakurai 2008: ELF electromagnetic fields reduced insulin secretion by ~30% in hamster pancreatic islet cells",
      "β-cell VGCC density is among the highest of any endocrine cell type, making them inherently EMF-sensitive",
      "All studied low-EMF populations (Tsimane, Kitava, Amish) show near-zero T2D prevalence regardless of diet composition",
      "TheraBionic parallel: FDA-approved device uses amplitude-modulated EMF → Cav3.2 activation in hepatocellular carcinoma cells at SAR levels 100–1000× below typical phone exposure",
    ],

    s8Title: "BERM Predictions",
    s8Text:
      "The BERM framework generates three specific, testable predictions from the glucose-dependent χ mechanism:",
    s8Predictions: [
      {
        id: "PANC-1",
        text: "EMF exposure combined with high-glycemic diet produces synergistic T2D risk exceeding the additive prediction of either factor alone. The glucose-dependent χ mechanism predicts that EMF effects on insulin secretion are amplified during high-glucose states, creating a multiplicative interaction.",
        discriminating: true,
      },
      {
        id: "PANC-2",
        text: "Intermittent fasting or time-restricted feeding protects β-cells from EMF-induced insulin dysfunction. Fasting periods hyperpolarize the β-cell membrane via open K_ATP channels, reducing χ to near zero and creating temporal windows of EMF resilience.",
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
    level: "Evidenssitaso",
    channelVal: "Cav1 (L-tyyppi) + Cav3 (T-tyyppi)",
    geneVal: "CACNA1C / CACNA1D + CACNA1H",
    cellTypeVal: "Haiman β-solut",
    functionVal:
      "Glukoosistimuloitu insuliinisekretio VGCC → Ca²⁺ → vesikkeliekosytoosi",
    levelVal: "M|C",

    s2Title: "Glukoosistimuloitu insuliinisekretio",
    s2p1: "Haiman β-solut ovat Langerhansin saarekkeiden insuliinia tuottavia endokriinisia soluja. Ne käyttävät SEKÄ L-tyypin (Cav1.2, Cav1.3) ETTÄ T-tyypin (Cav3.2) jänniteohjattuja kalsiumkanavia glukoosistimuloidussa insuliinisekreetiossa (GSIS). Kanoninen GSIS-reitti etenee: glukoosi saapuu GLUT2:n kautta → glykolyysi nostaa ATP/ADP-suhdetta → K_ATP-kanavat sulkeutuvat → kalvo depolarisoituu → VGCC:t aktivoituvat → Ca²⁺-sisäänvirtaus → insuliinivesikkelien eksosytoosi.",
    s2p2: "T-tyypin kanavat (Cav3.2) aktivoituvat matalammalla kynnyksellä (~−50mV) kuin L-tyypin kanavat (Cav1.2, ~−30mV), luoden peräkkäisen aktivaatiokaskadin. T-tyypin kanavat laukeavat ensin alkuvaiheen depolarisaatiossa, virittäen kalvon ja tuottaen varhaisen tahdistindepolarisaation, joka tuo kalvon L-tyypin aktivaatiokynnykseen. L-tyypin kanavat tuottavat sitten suuremman, kestävämmän Ca²⁺-sisäänvirtauksen, joka ajaa insuliinieksosytoosin päävaiheen.",
    s2p3: "Tämä kaksoiskanavarkkitehtuuri tekee β-soluista ainutlaatuisen riippuvaisia VGCC-toiminnasta. Mikä tahansa häiriö kummassakin kanavatyypissä — farmakologinen, geneettinen tai sähkömagneettinen — heikentää suoraan insuliinisekreetioreititä. β-solun VGCC-tiheys on yksi korkeimmista kaikista endokriinisistä soluista, mikä tekee siitä luonnostaan altista sähkömagneettiselle häiriölle.",

    s2SectionTitle: "Glukoosiriippuvainen χ -mekanismi",

    s3Title: "Aterioista riippuva haavoittuvuusikkuna",
    s3Chain:
      "Korkea glukoosi → K_ATP sulkeutuu → kalvo depolarisoituu → VGCC:t viritetty → χ KORKEA ↔ Paasto → K_ATP auki → kalvo hyperpolarisoitu → VGCC:t inaktiivisia → χ MATALA",
    s3p1: "β-solu esittää ainutlaatuisen piirteen BERM-kehyksessä: sen EMF-herkkyys (χ) moduloituu dynaamisesti veren glukoosikonsentraation mukaan. K_ATP-kanava toimii molekulaarisena jänniteporttina — kun verensokeri on matala, K_ATP-kanavat pysyvät auki, lukiten kalvon noin −70mV:iin. Tässä potentiaalissa VGCC:t ovat lujasti inaktiivisia eikä ulkoinen sähkömagneettinen kenttä voi häiritä niitä. Solu on käytännössä suojattu.",
    s3p2: "Kun verensokeri nousee postprandiaalisesti, K_ATP-kanavat sulkeutuvat, kalvo depolarisoituu kohti VGCC-aktivaatioikkunaa (−50...−30mV) ja kanavat virittyvät — valmiina kynnyksellä, jossa pienet jännitehäiriöt voivat laukaista ennenaikaisen tai liiallisen Ca²⁺-sisäänvirtauksen. Tämä luo aterioista riippuvan haavoittuvuusikkunan: syömisen jälkeen (erityisesti korkean glykeemisen indeksin aterioiden) β-solun χ on maksimoitu. Paasto puolestaan hyperpolarisoi kalvon ja minimoi χ:n. Tämä mekanismi selittää, miksi paasto voi suojata EMF-indusoidulta metaboliselta häiriöltä ja miksi korkean glykeemisen indeksin ruokavaliot synergioivat EMF-altistuksen kanssa.",

    s3SectionTitle: "T2D- ja PCOS-mekanismi",

    s4Title: "T2D-mekanismiketju",
    s4Chain:
      "EMF → Cav1/Cav3-häiriö → Ca²⁺-dysregulaatio → insuliinisekretio heikkenee → kompensatorinen β-solun hyperfunktio → β-solun uupuminen → T2D",
    s4p1: "EMF:n akuutti vaikutus β-soluihin on insuliinieksosytoosia ohjaavan tarkasti kalibroidun Ca²⁺-signaalin häiriö. EMF-indusoitu Cav1- ja Cav3-kanavien häiriö muuttaa Ca²⁺-transienttien ajoitusta, amplitudia ja kestoa. Sakurai 2008 osoitti, että ELF-sähkömagneettiset kentät vähensivät insuliinisekreetiötä noin 30 % altistetuissa saarekesoluissa — suora vahvistus sille, että EMF voi heikentää GSIS-reittiä.",
    s4p2: "Krooninen reitti tyypin 2 diabetekseen etenee: jatkuva insuliinisekretion heikkeneminen laukaisee kompensatorisen β-solun hyperfunktion — jäljelle jäävät solut työskentelevät kovemmin ylläpitääkseen glykemista kontrollia. Tämä kompensatorinen ylityö kiihdyttää β-solun uupumista ja apoptoosia, vähentäen asteittain insuliinia erittävää kapasiteettia. Tuloksena on klassinen T2D-kehityskulku: heikentynyt glukoositoleranssi → insuliiniresistenssi → manifesti diabetes.",

    s5Title: "Populaatioevidenssi",
    s5Stats: [
      "Tsimane (Bolivia): T2D-prevalenssi noin 0 % — maapallon matalin mitattu EMF-ympäristö",
      "Kitava (Papua-Uusi-Guinea): T2D käytännössä puuttuu korkeahiilihydraattisesta ruokavaliosta huolimatta — lähes nolla-EMF-altistus",
      "Vanhan linjan amissit: T2D-prevalenssi merkittävästi alle USA:n keskiarvon — rajoitettu teknologian käyttöönotto, matalampi EMF",
      "Yhdysvallat: T2D-prevalenssi 11,6 % (CDC 2023) — korkein väestötason EMF-tiheys",
    ],

    s6Title: "PCOS — neljän elimen konvergenssi",
    s6p1: "BERM-kehys tulkitsee polykystisen munasarjaoireyhtymän (PCOS) neljän elimen konvergenssisairautena — tilana, jossa EMF vaikuttaa samanaikaisesti neljään elimeen, joista kukin on itsenäisesti riippuvainen jänniteohjattuista kalsiumkanavista. Tämä monieliminen konvergenssi tuottaa PCOS:lle tyypillisen fenotyypin:",
    s6Organs: [
      "Haiman β-solut (Cav1 + Cav3): EMF-indusoitu insuliinisekretion heikkeneminen laukaisee kompensatorisen hyperinsulinemian",
      "Munasarjan theca-solut: hyperinsulinemia ajaa liiallista androgeeni(testosteroni)tuotantoa",
      "Munasarjan granuloosasolut: aromataasiaktiivisuus häiriintyy, vähentäen estradiolikonversiota",
      "Aivolisakkeen gonadotrofit (Cav3): LH/FSH-suhde nousee, häiriten ovulatorista sykliä",
    ],
    s6p2: "Jokainen näistä neljästä elimestä käyttää itsenäisesti VGCC:itä endokriiniseen päätoimintoonsa. EMF:n ei tarvitse kohdistua PCOS:iin erityisesti — se häiritsee samanaikaisesti kaikkia neljää VGCC-riippuvaista järjestelmää, ja näiden neljän häiriön konvergenssi tuottaa PCOS-fenotyypin. PCOS koskee 5–20 % lisääntymisikäisistä naisista maailmanlaajuisesti, ja prevalenssi nousee rinnakkain EMF-ympäristön tiivistymisen kanssa.",

    s4SectionTitle: "Evidenssi ja ennusteet",

    s7Title: "EMF-evidenssin yhteenveto",
    s7Stats: [
      "Sakurai 2008: ELF-sähkömagneettiset kentät vähensivät insuliinisekreetiötä ~30 % hamsterin haiman saarekesoluissa",
      "β-solun VGCC-tiheys on yksi korkeimmista kaikista endokriinisistä solutyypeistä, mikä tekee niistä luonnostaan EMF-herkiä",
      "Kaikki tutkitut matalan EMF:n populaatiot (Tsimane, Kitava, amissit) osoittavat lähes nolla-T2D-prevalenssin ruokavalion koostumuksesta riippumatta",
      "TheraBionic-rinnakkaisuus: FDA-hyväksytty laite käyttää amplitudimoduloitua EMF:ää → Cav3.2-aktivaatio maksasolusyopäsoluissa SAR-tasoilla 100–1000× alle tyypillisen puhelimen altistuksen",
    ],

    s8Title: "BERM-ennusteet",
    s8Text:
      "BERM-kehys tuottaa kolme spesifistä, testattavaa ennustetta glukoosiriippuvaisesta χ-mekanismista:",
    s8Predictions: [
      {
        id: "PANC-1",
        text: "EMF-altistus yhdistettynä korkean glykeemisen indeksin ruokavalioon tuottaa synergistisen T2D-riskin, joka ylittää kummankaan tekijän yksinään aiheuttaman additiivisen ennusteen. Glukoosiriippuvainen χ-mekanismi ennustaa, että EMF:n vaikutukset insuliinisekreetioon vahvistuvat korkean glukoosin tilassa, luoden multiplikatiivisen vuorovaikutuksen.",
        discriminating: true,
      },
      {
        id: "PANC-2",
        text: "Jaksottainen paasto tai aikaikkunaruokailu suojaa β-soluja EMF-indusoidulta insuliinin toimintahäiriöltä. Paastojaksot hyperpolarisoivat β-solun kalvon avointen K_ATP-kanavien kautta, vähentäen χ:n lähelle nollaa ja luoden ajallisia EMF-resilienssit ikkunoita.",
        discriminating: true,
      },
      {
        id: "PANC-3",
        text: "Kansallinen T2D-ilmaantuvuus korreloi väestötason EMF-tiheyden kanssa ruokavalion koostumuksen, lihavuuden prevalenssin, geneettisen alttiuden ja fyysisen aktiivisuuden vakioinnin jälkeen. Jäännöskorrelaatio heijastaa T2D-etiologian VGCC-välitteistä komponenttia.",
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
    evidencePage: "Evidenssirekisteri",
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
    s2SectionTitle: "グルコース依存性χメカニズム",
    s3Title: "食事依存性脆弱性ウィンドウ",
    s3Chain: "高グルコース → K_ATP閉鎖 → 膜脱分極 → VGCCプライミング → χ高 ↔ 空腹 → K_ATP開放 → 膜過分極 → VGCC不活性 → χ低",
    s3p1: "β細胞はBERMフレームワークにおいて独自の特徴を示す：そのEMF感受性（χ）は血糖濃度によって動的に変調される。K_ATPチャネルは分子電圧ゲートとして機能する — 血糖が低い場合、K_ATPチャネルは開いたままで膜を約-70mVに固定する。この電位ではVGCCは確実に不活性であり、外部電磁場はそれらを摂動できない。細胞は実質的に遮蔽されている。",
    s3p2: "食後に血糖が上昇すると、K_ATPチャネルが閉じ、膜がVGCC活性化ウィンドウ（-50～-30mV）に向かって脱分極し、チャネルがプライミングされる — 小さな電圧摂動が早期または過剰なCa²⁺流入を誘発できる閾値に準備される。これは食事依存性の脆弱性ウィンドウを作り出す：食後（特に高GI食後）、β細胞のχは最大化される。空腹状態では逆に膜を過分極させχを最小化する。このメカニズムは、空腹がEMF誘発代謝撹乱に対して保護的である理由、および高GI食がEMF曝露と相乗作用する理由を説明する。",
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
    s8Text: "BERMフレームワークはグルコース依存性χメカニズムから3つの特定の検証可能な予測を生成する：",
    s8Predictions: [
      {
        id: "PANC-1",
        text: "EMF曝露と高GI食の組み合わせは、いずれかの要因単独の加算的予測を超える相乗的T2Dリスクを生成する。グルコース依存性χメカニズムはEMFのインスリン分泌への影響が高グルコース状態で増幅されることを予測し、乗算的相互作用を作り出す。",
        discriminating: true,
      },
      {
        id: "PANC-2",
        text: "間欠的断食または時間制限食がEMF誘発インスリン機能障害からβ細胞を保護する。断食期間は開放K_ATPチャネルを介してβ細胞膜を過分極させ、χをほぼゼロに低下させ、EMFレジリエンスの時間的ウィンドウを作り出す。",
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
    s2SectionTitle: "Mecanisme chi dependant du glucose",
    s3Title: "Fenetre de vulnerabilite dependante du repas",
    s3Chain: "Glucose eleve → K_ATP ferme → membrane depolarisee → VGCC amorces → chi ELEVE ↔ Jeune → K_ATP ouvert → membrane hyperpolarisee → VGCC inactifs → chi BAS",
    s3p1: "La cellule beta presente une caracteristique unique dans le cadre BERM : sa susceptibilite EMF (chi) est dynamiquement modulee par la concentration de glucose sanguin. Le canal K_ATP agit comme une porte de tension moleculaire — quand le glucose sanguin est bas, les canaux K_ATP restent ouverts, fixant la membrane a environ -70mV. A ce potentiel, les VGCC sont fermement inactifs et ne peuvent etre perturbes par les champs electromagnetiques externes. La cellule est effectivement blindee.",
    s3p2: "Quand le glucose sanguin augmente en postprandial, les canaux K_ATP se ferment, la membrane se depolarise vers la fenetre d'activation VGCC (-50 a -30mV), et les canaux deviennent amorces — prets au seuil ou de petites perturbations de tension peuvent declencher un influx de Ca²⁺ premature ou excessif. Cela cree une fenetre de vulnerabilite dependante du repas : apres manger (surtout les repas a indice glycemique eleve), le chi des cellules beta est maximise. Le jeune, inversement, hyperpolarise la membrane et minimise chi. Ce mecanisme explique pourquoi le jeune peut proteger contre la perturbation metabolique induite par les EMF, et pourquoi les regimes a indice glycemique eleve agissent en synergie avec l'exposition aux EMF.",
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
    s8Text: "Le cadre BERM genere trois predictions specifiques et testables a partir du mecanisme chi dependant du glucose :",
    s8Predictions: [
      {
        id: "PANC-1",
        text: "L'exposition EMF combinee a un regime a indice glycemique eleve produit un risque synergique de T2D depassant la prediction additive de chaque facteur seul. Le mecanisme chi dependant du glucose predit que les effets des EMF sur la secretion d'insuline sont amplifies pendant les etats de glucose eleve, creant une interaction multiplicative.",
        discriminating: true,
      },
      {
        id: "PANC-2",
        text: "Le jeune intermittent ou l'alimentation a temps restreint protege les cellules beta du dysfonctionnement insulinique induit par les EMF. Les periodes de jeune hyperpolarisent la membrane des cellules beta via les canaux K_ATP ouverts, reduisant chi a presque zero et creant des fenetres temporelles de resilience aux EMF.",
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
    s2SectionTitle: "포도당 의존적 χ 메커니즘",
    s3Title: "식사 의존적 취약성 창",
    s3Chain: "고혈당 → K_ATP 폐쇄 → 막 탈분극 → VGCC 프라이밍 → χ 높음 ↔ 공복 → K_ATP 개방 → 막 과분극 → VGCC 비활성 → χ 낮음",
    s3p1: "β세포는 BERM 프레임워크에서 독특한 특성을 보인다: EMF 감수성(χ)이 혈당 농도에 의해 동적으로 변조된다. K_ATP 채널은 분자 전압 게이트로 작용한다 — 혈당이 낮으면 K_ATP 채널이 열린 채로 유지되어 막을 약 -70mV에 고정한다. 이 전위에서 VGCC는 확실히 비활성 상태이며 외부 전자기장이 교란할 수 없다. 세포는 사실상 차폐되어 있다.",
    s3p2: "식후 혈당이 상승하면 K_ATP 채널이 닫히고, 막이 VGCC 활성화 창(-50~-30mV)으로 탈분극되며, 채널이 프라이밍된다 — 작은 전압 교란이 조기 또는 과도한 Ca²⁺ 유입을 유발할 수 있는 역치에 준비된다. 이는 식사 의존적 취약성 창을 만든다: 식후(특히 고GI 식사), β세포의 χ는 최대화된다. 공복은 반대로 막을 과분극시키고 χ를 최소화한다.",
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
    s8Text: "BERM 프레임워크는 포도당 의존적 χ 메커니즘에서 3가지 특정 검증 가능한 예측을 생성한다:",
    s8Predictions: [
      {
        id: "PANC-1",
        text: "EMF 노출과 고GI 식단의 조합이 각 요인 단독의 가산 예측을 초과하는 상승적 T2D 위험을 생성한다. 포도당 의존적 χ 메커니즘은 인슐린 분비에 대한 EMF 효과가 고혈당 상태에서 증폭되어 승수적 상호작용을 만든다고 예측한다.",
        discriminating: true,
      },
      {
        id: "PANC-2",
        text: "간헐적 단식 또는 시간 제한 식사가 EMF 유도 인슐린 기능 장애로부터 β세포를 보호한다. 단식 기간은 개방된 K_ATP 채널을 통해 β세포 막을 과분극시켜 χ를 거의 제로로 감소시키고 EMF 회복력의 시간적 창을 만든다.",
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
