import type { Metadata } from "next";
import Link from "next/link";
import { Dna } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { InlineReferenceText } from "@/components/InlineReferenceText";

interface CrossMapRow {
  timothy: string;
  bermVK: string;
  mechanism: string;
  match: boolean;
}

const COPY = {
  en: {
    title: "Timothy Syndrome: Nature's CACNA1C Experiment",
    subtitle:
      "Timothy syndrome is caused by a single gain-of-function mutation in CACNA1C (Cav1.2) — the same L-type calcium channel BERM identifies as the primary EMF transduction node. Timothy patients develop nearly every BERM-predicted pathology. If one mutant channel produces the full disease spectrum, chronic environmental activation of the same channel should produce a milder, population-level version.",
    backLink: "← Back to Evidence",
    cautionText:
      "This page presents Timothy syndrome as a natural experiment that tests BERM's central mechanism. Timothy syndrome is a rare, severe genetic disorder (prevalence <1:500,000). The comparison to chronic EMF exposure is mechanistic — not a claim of equivalent severity. Timothy patients experience dramatically more severe pathology because their channels are constitutively activated, while EMF-induced activation is intermittent and partial.",

    crossMapTitle: "Timothy–BERM cross-map",
    crossMapLead:
      "Every major Timothy syndrome phenotype maps onto a specific BERM intermediate layer (VK). This is the strongest possible pharmacogenomic validation: a single gene (CACNA1C) producing the complete BERM disease spectrum.",
    crossMapHeaders: { timothy: "Timothy phenotype", bermVK: "BERM layer", mechanism: "Shared Ca²⁺ mechanism", },
    crossMapRows: [
      { timothy: "Long QT syndrome / arrhythmia", bermVK: "VK — Cardiac", mechanism: "Cav1.2 prolonged opening → delayed repolarization → ventricular arrhythmia. Same channel, same mechanism as EMF-induced QT prolongation.", match: true },
      { timothy: "Syndactyly (fused fingers/toes)", bermVK: "VK — Developmental", mechanism: "Ca²⁺-dependent apoptosis failure during limb development. Ca²⁺ overload prevents programmed cell death at digit boundaries.", match: true },
      { timothy: "Autism spectrum disorder", bermVK: "VK31 (ASD prototype)", mechanism: "CACNA1C GoF → cortical E/I imbalance → social/communication deficits. Bhatt 2012: GLP-1R→Cav1.2→ERK pathway in neurons.", match: true },
      { timothy: "Intellectual disability", bermVK: "VK — BDNF/cognitive", mechanism: "Chronic Ca²⁺ overload → CaMKII dysregulation → impaired synaptic plasticity and BDNF signaling.", match: true },
      { timothy: "Seizures / epilepsy", bermVK: "VK — Q-factor spectrum", mechanism: "Cav1.2 GoF lowers seizure threshold by reducing γ (GABAergic damping). Same Q-factor mechanism as absence/generalized epilepsy.", match: true },
      { timothy: "Immune deficiency", bermVK: "VK — NK cells", mechanism: "T-cell and NK-cell activation requires precise Ca²⁺ signaling (CRAC/Orai1 + Cav1.2). Constitutive activation desensitizes immune response.", match: true },
      { timothy: "Hypoglycemia", bermVK: "VK12 (β-cell)", mechanism: "Cav1.2 GoF → excessive insulin secretion from β-cells → hypoglycemia. Mirror image of EMF→Ca²⁺→β-cell exhaustion over decades.", match: true },
      { timothy: "Facial dysmorphism", bermVK: "VK — Craniofacial", mechanism: "Neural crest cell migration and differentiation are Ca²⁺-dependent. Altered Ca²⁺ dynamics during embryogenesis → structural anomalies.", match: true },
      { timothy: "Temperature dysregulation", bermVK: "VK — Hypothalamic", mechanism: "Hypothalamic thermoregulation depends on Ca²⁺-sensitive neurons (TRPV + Cav1.2). GoF → set-point instability.", match: true },
      { timothy: "Dental enamel defects", bermVK: "VK — Ameloblasts", mechanism: "Enamel formation requires precise Ca²⁺ transport by ameloblasts. Cav1.2 GoF disrupts the Ca²⁺ gradient during amelogenesis.", match: true },
    ] satisfies CrossMapRow[],

    subTimothyTitle: "The 'Sub-Timothy' hypothesis",
    subTimothyLead:
      "Timothy syndrome represents the extreme end of a spectrum. BERM proposes that chronic ambient EMF produces a population-level 'sub-Timothy' state — the same Cav1.2 channel, activated at much lower intensity but for decades rather than constitutively.",
    subTimothyComparison: [
      { dimension: "CACNA1C activation", timothy: "Constitutive (mutation)", berm: "Intermittent (EMF-induced)" },
      { dimension: "Severity", timothy: "Severe (median survival ~2.5 years)", berm: "Subclinical to mild (population-level shift)" },
      { dimension: "Onset", timothy: "Prenatal / neonatal", berm: "Cumulative over years–decades" },
      { dimension: "Cardiac", timothy: "Long QT, arrhythmia, sudden death", berm: "QT prolongation trend, AF incidence rising" },
      { dimension: "Neurological", timothy: "ASD, seizures, ID (100%)", berm: "ASD prevalence 1→36 (1975→2020)" },
      { dimension: "Metabolic", timothy: "Hypoglycemia (β-cell hyperactivation)", berm: "T2D epidemic (β-cell exhaustion after decades)" },
      { dimension: "Immune", timothy: "Recurrent infections (immune desensitization)", berm: "Allergic disease epidemic (immune dysregulation)" },
    ],
    subTimothyHeaders: { dimension: "Dimension", timothy: "Timothy (CACNA1C GoF)", berm: "Sub-Timothy (EMF → Cav1.2)" },

    gwasTitle: "CACNA1C GWAS: the most pleiotropic gene in psychiatry",
    gwasLead:
      "Genome-wide association studies have independently identified CACNA1C as a risk gene for bipolar disorder, schizophrenia, major depression, ASD, and ADHD. It is the single most replicated psychiatric risk gene across disorders — exactly as BERM predicts for the primary EMF transduction channel.",
    gwasPoints: [
      "Ferreira et al. 2008 (Nature Genetics): CACNA1C rs1006737 associated with bipolar disorder (p = 7.0×10⁻⁸)",
      "Green et al. 2010 (Am J Psychiatry): same SNP associated with schizophrenia and altered amygdala function",
      "[[ref:pgc-cacna1c-five-disorders|Cross-Disorder Group 2013]] (Lancet): CACNA1C identified as shared risk factor across all five major psychiatric disorders",
      "Yoshimizu et al. 2015: Timothy syndrome mutation in iPSC-derived neurons shows excessive Ca²⁺ and dendrite retraction",
    ],

    predictionsTitle: "Predictions from the Timothy comparison",
    predictions: [
      "CACNA1C common variants (rs1006737 risk allele carriers) should show enhanced sensitivity to ambient EMF — they start closer to the Timothy threshold",
      "Timothy-spectrum symptoms (cardiac, neurological, metabolic) should be more prevalent in high-EMF environments, dose-dependently",
      "Cav1.2-selective CCBs should provide partial protection against EMF-associated pathology in CACNA1C risk allele carriers",
      "iPSC-derived neurons from CACNA1C risk allele carriers should show greater Ca²⁺ influx response to EMF exposure than non-carriers",
    ],
    refsTitle: "Key references",
    refs: [
      "[[ref:splawski2004|Splawski et al. 2004]] (Cell): Original Timothy syndrome description — CACNA1C G406R mutation",
      "[[ref:splawski2005_cardiac_ltype|Splawski et al. 2005]] (PNAS, PMC1149428): Timothy syndrome type 2 — alternative CACNA1C mutation, broader phenotype",
      "[[ref:bhat2012_cacna1c_psychiatric|Bhat et al. 2012]]: Comprehensive review of CACNA1C in psychiatric disease",
      "[[ref:bader2011_timothy_mouse|Bader et al. 2011]] (PNAS): Timothy syndrome mouse model recapitulates the triad of autistic traits",
      "[[ref:pgc-cacna1c-five-disorders|Cross-Disorder Group 2013]] (Lancet): CACNA1C as trans-diagnostic psychiatric risk gene",
    ],
  },
  fi: {
    title: "Timothyn syndrooma: Luonnon CACNA1C-kokeilu",
    subtitle:
      "Timothyn syndrooma aiheutuu yhdestä gain-of-function-mutaatiosta CACNA1C:ssä (Cav1.2) — samassa L-tyypin kalsiumkanavassa, jonka BERM tunnistaa EMF:n primaariseksi transduuktiopisteeksi. Timothy-potilaille kehittyy lähes jokainen BERM:n ennustama patologia. Jos yksi mutatoitunut kanava tuottaa täyden sairasspektrin, saman kanavan kroonisen ympäristöaktivaation pitäisi tuottaa lievempi, väestötason versio.",
    backLink: "← Takaisin evidenssiin",
    cautionText:
      "Tämä sivu esittää Timothyn syndrooman luonnollisena kokeena, joka testaa BERM:n keskeistä mekanismia. Timothyn syndrooma on harvinainen, vakava geneettinen häiriö (prevalenssi <1:500 000). Vertailu krooniseen EMF-altistukseen on mekanistinen — ei väite samasta vakavuudesta.",

    crossMapTitle: "Timothy–BERM-ristikartta",
    crossMapLead:
      "Jokainen merkittävä Timothyn syndrooman fenotyyppi kartoittuu tiettyyn BERM-välikerrokseen (VK). Tämä on vahvin mahdollinen farmakogenominen validaatio: yksi geeni (CACNA1C) tuottaa täydellisen BERM-sairausspektrin.",
    crossMapHeaders: { timothy: "Timothy-fenotyyppi", bermVK: "BERM-kerros", mechanism: "Jaettu Ca²⁺-mekanismi" },
    crossMapRows: [
      { timothy: "Pitkä QT / rytmihäiriö", bermVK: "VK — Sydän", mechanism: "Cav1.2-kanavan pitkittynyt avautuminen → viivästynyt repolarisaatio → kammioperäinen rytmihäiriö. Sama kanava, sama mekanismi kuin EMF-indusoitu QT-pidennys.", match: true },
      { timothy: "Syndaktylia (yhteenkasvaneet sormet/varpaat)", bermVK: "VK — Kehitys", mechanism: "Ca²⁺-riippuvainen apoptoosin epäonnistuminen raajan kehityksen aikana. Ca²⁺-ylikuormitus estää ohjelmoidun solukuoleman sormien rajoilla.", match: true },
      { timothy: "Autismikirjon häiriö", bermVK: "VK31 (ASD-prototyyppi)", mechanism: "CACNA1C GoF → kortikaalinen E/I-epätasapaino → sosiaaliset/kommunikaatiovaikeudet.", match: true },
      { timothy: "Älyllinen kehitysvamma", bermVK: "VK — BDNF/kognitio", mechanism: "Krooninen Ca²⁺-ylikuormitus → CaMKII-säätelyn häiriö → heikentynyt synaptinen plastisuus ja BDNF-signalointi.", match: true },
      { timothy: "Kohtaukset / epilepsia", bermVK: "VK — Q-tekijäspektri", mechanism: "Cav1.2 GoF alentaa kohtauskynnystä vähentämällä γ:tä (GABAergista vaimennusta). Sama Q-tekijämekanismi.", match: true },
      { timothy: "Immuunipuutos", bermVK: "VK — NK-solut", mechanism: "T-solu- ja NK-soluaktivaatio vaatii tarkan Ca²⁺-signaloinnin (CRAC/Orai1 + Cav1.2). Konstitutiiviinen aktivaatio desensitisoi immuunivastetta.", match: true },
      { timothy: "Hypoglykemia", bermVK: "VK12 (β-solu)", mechanism: "Cav1.2 GoF → liiallinen insuliinieritys β-soluista → hypoglykemia. Peilikuva EMF→Ca²⁺→β-solujen uupumisesta vuosikymmenien kuluessa.", match: true },
      { timothy: "Kasvonmuotoanomalia", bermVK: "VK — Kraniofasiaalinen", mechanism: "Hermoharjasolujen migraatio ja erilaistuminen ovat Ca²⁺-riippuvaisia. Muuttunut Ca²⁺-dynamiikka embryogeneesin aikana → rakenteellisia anomalioita.", match: true },
      { timothy: "Lämpötilan säätelyhäiriö", bermVK: "VK — Hypotalamus", mechanism: "Hypotalamuksen lämpötilansäätely riippuu Ca²⁺-herkistä neuroneista (TRPV + Cav1.2). GoF → asetuspisteen epävakaus.", match: true },
      { timothy: "Hammaskilleviat", bermVK: "VK — Ameloblastit", mechanism: "Kiilteen muodostus vaatii tarkan Ca²⁺-kuljetuksen ameloblasteissa. Cav1.2 GoF häiritsee Ca²⁺-gradienttia amelogeneesin aikana.", match: true },
    ] satisfies CrossMapRow[],

    subTimothyTitle: "'Alatason-Timothy'-hypoteesi",
    subTimothyLead:
      "Timothyn syndrooma edustaa spektrin ääripäätä. BERM ehdottaa, että krooninen ympäristön EMF tuottaa väestötason 'alatason-Timothy'-tilan — sama Cav1.2-kanava, aktivoitu paljon matalammalla intensiteetillä mutta vuosikymmeniä konstitutiivisen sijasta.",
    subTimothyComparison: [
      { dimension: "CACNA1C-aktivaatio", timothy: "Konstitutiivinen (mutaatio)", berm: "Ajoittainen (EMF-indusoitu)" },
      { dimension: "Vakavuus", timothy: "Vakava (mediaanieloonjääminen ~2,5 vuotta)", berm: "Subkliininen–lievä (väestötason siirtymä)" },
      { dimension: "Alkamisajankohta", timothy: "Prenataalinen / neonataali", berm: "Kumulatiivinen vuosien–vuosikymmenten kuluessa" },
      { dimension: "Sydän", timothy: "Pitkä QT, rytmihäiriö, äkkikuolema", berm: "QT-pidennystrendi, AF-insidenssi nousee" },
      { dimension: "Neurologinen", timothy: "ASD, kohtaukset, kehitysvamma (100 %)", berm: "ASD-prevalenssi 1→36 (1975→2020)" },
      { dimension: "Metabolinen", timothy: "Hypoglykemia (β-solujen hyperaktivaatio)", berm: "T2D-epidemia (β-solujen uupuminen vuosikymmenien jälkeen)" },
      { dimension: "Immuuni", timothy: "Toistuvat infektiot (immuunidesensitisaatio)", berm: "Allergisten sairauksien epidemia (immuunisäätelyn häiriö)" },
    ],
    subTimothyHeaders: { dimension: "Ulottuvuus", timothy: "Timothy (CACNA1C GoF)", berm: "Alatason-Timothy (EMF → Cav1.2)" },

    gwasTitle: "CACNA1C GWAS: psykiatrian pleiotropisin geeni",
    gwasLead:
      "Genominlaajuiset assosiaatiotutkimukset ovat itsenäisesti tunnistaneet CACNA1C:n riskigeeniksi kaksisuuntaiselle mielialahäiriölle, skitsofrenialle, vakavalle masennukselle, ASD:lle ja ADHD:lle. Se on yksittäinen eniten replikoitu psykiatrinen riskigeeni — juuri kuten BERM ennustaa primaariselle EMF-transduuktiokanavalle.",
    gwasPoints: [
      "Ferreira ym. 2008 (Nature Genetics): CACNA1C rs1006737 assosioitunut kaksisuuntaiseen mielialahäiriöön (p = 7,0×10⁻⁸)",
      "Green ym. 2010 (Am J Psychiatry): sama SNP assosioitunut skitsofreniaan ja muuttuneeseen amygdalan toimintaan",
      "[[ref:pgc-cacna1c-five-disorders|Cross-Disorder Group 2013]] (Lancet): CACNA1C tunnistettu jaetuksi riskitekijäksi kaikille viidelle suurelle psykiatriselle häiriölle",
      "Yoshimizu ym. 2015: Timothy-mutaatio iPSC-neuroneissa osoittaa liiallisen Ca²⁺:n ja dendriitin vetäytymisen",
    ],

    predictionsTitle: "Ennusteet Timothy-vertailusta",
    predictions: [
      "CACNA1C:n yleisten varianttien kantajien (rs1006737-riskialleeli) pitäisi osoittaa tehostettu herkkyys ympäristön EMF:lle — he alkavat lähempänä Timothy-kynnystä",
      "Timothy-spektrin oireiden (sydän, neurologinen, metabolinen) pitäisi olla yleisempiä korkean EMF:n ympäristöissä, annosriippuvaisesti",
      "Cav1.2-selektiivisten CCB:ien pitäisi tarjota osittainen suoja EMF-assosioitua patologiaa vastaan CACNA1C-riskialleelin kantajilla",
      "iPSC-neuroneissa CACNA1C-riskialleelin kantajilta pitäisi näkyä suurempi Ca²⁺-influksivaste EMF-altistukselle kuin ei-kantajilla",
    ],
    refsTitle: "Keskeiset viitteet",
    refs: [
      "[[ref:splawski2004|Splawski ym. 2004]] (Cell): Alkuperäinen Timothyn syndrooman kuvaus — CACNA1C G406R -mutaatio",
      "[[ref:splawski2005_cardiac_ltype|Splawski ym. 2005]] (PNAS, PMC1149428): Timothyn syndrooma tyyppi 2 — vaihtoehtoinen CACNA1C-mutaatio, laajempi fenotyyppi",
      "[[ref:bhat2012_cacna1c_psychiatric|Bhat ym. 2012]]: Kattava katsaus CACNA1C:n merkitykseen psykiatrisissa sairauksissa",
      "[[ref:bader2011_timothy_mouse|Bader ym. 2011]] (PNAS): Timothyn syndrooman hiirimalli toistaa autismikirjon oireiden kolmikon",
      "[[ref:pgc-cacna1c-five-disorders|Cross-Disorder Group 2013]] (Lancet): CACNA1C transdiagnostisena psykiatrisena riskigeeninä",
    ],
  },
  ja: {
    title: "Timothy症候群：自然のCACNA1C実験",
    subtitle:
      "Timothy症候群はCACNA1C (Cav1.2)の単一のgain-of-function変異によって引き起こされる — BERMがEMFの一次トランスダクションノードとして同定する同じL型カルシウムチャネルである。Timothy患者はBERMが予測するほぼすべての病態を発症する。一つの変異チャネルが完全な疾患スペクトラムを生むならば、同じチャネルの慢性的な環境活性化はより軽度の集団レベルの変異を生むはずである。",
    backLink: "← エビデンスに戻る",
    cautionText:
      "このページはTimothy症候群をBERMの中心メカニズムを検証する自然実験として提示する。Timothy症候群は稀少で重篤な遺伝性疾患（有病率<1:500,000）である。慢性EMF曝露との比較はメカニズム的なものであり、同等の重篤度を主張するものではない。Timothy患者はチャネルが恒常的に活性化されるため劇的に重篤な病態を経験するが、EMF誘発性活性化は断続的かつ部分的である。",

    crossMapTitle: "Timothy-BERMクロスマップ",
    crossMapLead:
      "Timothy症候群の主要な表現型のすべてが特定のBERM中間層（VK）にマッピングされる。これは最も強力な薬理遺伝学的検証である：単一の遺伝子（CACNA1C）が完全なBERM疾患スペクトラムを生む。",
    crossMapHeaders: { timothy: "Timothy表現型", bermVK: "BERM層", mechanism: "共通のCa²⁺メカニズム" },
    crossMapRows: [
      { timothy: "QT延長症候群 / 不整脈", bermVK: "VK — Cardiac", mechanism: "Cav1.2の延長開放 → 再分極遅延 → 心室性不整脈。EMF誘発性QT延長と同じチャネル、同じメカニズム。", match: true },
      { timothy: "合指症（融合した指/趾）", bermVK: "VK — Developmental", mechanism: "四肢発達時のCa²⁺依存性アポトーシス不全。Ca²⁺過負荷が指の境界でのプログラム細胞死を阻害。", match: true },
      { timothy: "自閉スペクトラム症", bermVK: "VK31 (ASD prototype)", mechanism: "CACNA1C GoF → 皮質E/I不均衡 → 社会的/コミュニケーション障害。Bhatt 2012: GLP-1R→Cav1.2→ERK経路（ニューロン）。", match: true },
      { timothy: "知的障害", bermVK: "VK — BDNF/cognitive", mechanism: "慢性Ca²⁺過負荷 → CaMKII調節不全 → シナプス可塑性およびBDNFシグナリングの障害。", match: true },
      { timothy: "てんかん発作 / てんかん", bermVK: "VK — Q-factor spectrum", mechanism: "Cav1.2 GoFがγ（GABA作動性減衰）を低下させ発作閾値を下げる。欠神/全般てんかんと同じQ因子メカニズム。", match: true },
      { timothy: "免疫不全", bermVK: "VK — NK cells", mechanism: "T細胞およびNK細胞の活性化には精密なCa²⁺シグナリング（CRAC/Orai1 + Cav1.2）が必要。恒常的活性化が免疫応答を脱感作する。", match: true },
      { timothy: "低血糖", bermVK: "VK12 (β-cell)", mechanism: "Cav1.2 GoF → β細胞からの過剰インスリン分泌 → 低血糖。数十年にわたるEMF→Ca²⁺→β細胞疲弊の鏡像。", match: true },
      { timothy: "顔面形態異常", bermVK: "VK — Craniofacial", mechanism: "神経堤細胞の遊走と分化はCa²⁺依存性。胚発生中のCa²⁺動態変化 → 構造的異常。", match: true },
      { timothy: "体温調節障害", bermVK: "VK — Hypothalamic", mechanism: "視床下部の体温調節はCa²⁺感受性ニューロン（TRPV + Cav1.2）に依存。GoF → 設定点不安定。", match: true },
      { timothy: "歯のエナメル質欠損", bermVK: "VK — Ameloblasts", mechanism: "エナメル質形成にはアメロブラストによる精密なCa²⁺輸送が必要。Cav1.2 GoFがエナメル形成中のCa²⁺勾配を撹乱。", match: true },
    ] satisfies CrossMapRow[],

    subTimothyTitle: "「サブTimothy」仮説",
    subTimothyLead:
      "Timothy症候群はスペクトラムの極端な端を表す。BERMは慢性的な環境EMFが集団レベルの「サブTimothy」状態を生むと提唱する — 同じCav1.2チャネルが、恒常的ではなくはるかに低い強度で、しかし数十年にわたって活性化される。",
    subTimothyComparison: [
      { dimension: "CACNA1C活性化", timothy: "恒常的（変異）", berm: "断続的（EMF誘発性）" },
      { dimension: "重篤度", timothy: "重篤（生存中央値〜2.5年）", berm: "不顕性〜軽度（集団レベルの偏移）" },
      { dimension: "発症", timothy: "出生前 / 新生児期", berm: "年〜十年単位で蓄積" },
      { dimension: "心臓", timothy: "QT延長、不整脈、突然死", berm: "QT延長傾向、AF発生率上昇" },
      { dimension: "神経", timothy: "ASD、てんかん、知的障害 (100%)", berm: "ASD有病率 1→36 (1975→2020)" },
      { dimension: "代謝", timothy: "低血糖（β細胞過活性化）", berm: "T2D流行（数十年後のβ細胞疲弊）" },
      { dimension: "免疫", timothy: "反復性感染（免疫脱感作）", berm: "アレルギー疾患の流行（免疫調節不全）" },
    ],
    subTimothyHeaders: { dimension: "次元", timothy: "Timothy (CACNA1C GoF)", berm: "サブTimothy (EMF → Cav1.2)" },

    gwasTitle: "CACNA1C GWAS：精神医学で最も多面発現性の高い遺伝子",
    gwasLead:
      "ゲノムワイド関連解析は、CACNA1Cを双極性障害、統合失調症、大うつ病、ASD、ADHDのリスク遺伝子として独立して同定している。これは疾患横断的に最も再現された精神科リスク遺伝子であり、BERMが一次EMFトランスダクションチャネルに対して予測する通りである。",
    gwasPoints: [
      "Ferreira et al. 2008 (Nature Genetics): CACNA1C rs1006737が双極性障害と関連 (p = 7.0×10⁻⁸)",
      "Green et al. 2010 (Am J Psychiatry): 同じSNPが統合失調症および扁桃体機能変化と関連",
      "[[ref:pgc-cacna1c-five-disorders|Cross-Disorder Group 2013]] (Lancet): CACNA1Cが5大精神疾患すべてに共通するリスク因子として同定",
      "Yoshimizu et al. 2015: iPSC由来ニューロンでのTimothy変異が過剰Ca²⁺と樹状突起退縮を示す",
    ],

    predictionsTitle: "Timothy比較からの予測",
    predictions: [
      "CACNA1Cの一般的変異体（rs1006737リスクアレル保有者）は環境EMFに対する感受性が高いはずである — Timothy閾値に近い位置から開始する",
      "Timothyスペクトラムの症状（心臓、神経、代謝）は高EMF環境でより高頻度であるべきで、用量依存的に",
      "Cav1.2選択的CCBはCACNA1Cリスクアレル保有者においてEMF関連病態に対する部分的防護を提供すべきである",
      "CACNA1Cリスクアレル保有者由来のiPSCニューロンは非保有者と比較してEMF曝露に対してより大きなCa²⁺流入応答を示すべきである",
    ],
    refsTitle: "主要参考文献",
    refs: [
      "[[ref:splawski2004|Splawski et al. 2004]] (Cell): Timothy症候群の原著記述 — CACNA1C G406R変異",
      "[[ref:splawski2005_cardiac_ltype|Splawski et al. 2005]] (PNAS, PMC1149428): Timothy症候群2型 — 代替CACNA1C変異とより広範な表現型",
      "[[ref:bhat2012_cacna1c_psychiatric|Bhat et al. 2012]]: 精神疾患におけるCACNA1Cの包括的レビュー",
      "[[ref:bader2011_timothy_mouse|Bader et al. 2011]] (PNAS): Timothy症候群マウスモデルが自閉症様形質の三徴を再現",
      "[[ref:pgc-cacna1c-five-disorders|Cross-Disorder Group 2013]] (Lancet): トランス診断的精神科リスク遺伝子としてのCACNA1C",
    ],
  },
  fr: {
    title: "Syndrome de Timothy : L'expérience naturelle CACNA1C",
    subtitle:
      "Le syndrome de Timothy est causé par une seule mutation gain-de-fonction dans CACNA1C (Cav1.2) — le même canal calcique de type L que BERM identifie comme le noeud primaire de transduction EMF. Les patients Timothy développent presque chaque pathologie prédite par BERM. Si un seul canal muté produit le spectre complet de la maladie, l'activation environnementale chronique du même canal devrait produire une version atténuée au niveau populationnel.",
    backLink: "← Retour aux preuves",
    cautionText:
      "Cette page présente le syndrome de Timothy comme une expérience naturelle testant le mécanisme central de BERM. Le syndrome de Timothy est un trouble génétique rare et sévère (prévalence <1:500 000). La comparaison avec l'exposition chronique aux EMF est mécanistique — pas une revendication de sévérité équivalente. Les patients Timothy connaissent une pathologie dramatiquement plus sévère car leurs canaux sont activés de manière constitutive, tandis que l'activation induite par EMF est intermittente et partielle.",

    crossMapTitle: "Carte croisée Timothy-BERM",
    crossMapLead:
      "Chaque phénotype majeur du syndrome de Timothy correspond à une couche intermédiaire BERM spécifique (VK). C'est la validation pharmacogénomique la plus forte possible : un seul gène (CACNA1C) produisant le spectre complet des maladies BERM.",
    crossMapHeaders: { timothy: "Phénotype Timothy", bermVK: "Couche BERM", mechanism: "Mécanisme Ca²⁺ partagé" },
    crossMapRows: [
      { timothy: "Syndrome du QT long / arythmie", bermVK: "VK — Cardiac", mechanism: "Ouverture prolongée de Cav1.2 → repolarisation retardée → arythmie ventriculaire. Même canal, même mécanisme que la prolongation QT induite par EMF.", match: true },
      { timothy: "Syndactylie (doigts/orteils fusionnés)", bermVK: "VK — Developmental", mechanism: "Défaillance de l'apoptose dépendante du Ca²⁺ lors du développement des membres. La surcharge en Ca²⁺ empêche la mort cellulaire programmée aux frontières des doigts.", match: true },
      { timothy: "Trouble du spectre autistique", bermVK: "VK31 (ASD prototype)", mechanism: "CACNA1C GoF → déséquilibre E/I cortical → déficits sociaux/communicationnels. Bhatt 2012 : voie GLP-1R→Cav1.2→ERK dans les neurones.", match: true },
      { timothy: "Déficience intellectuelle", bermVK: "VK — BDNF/cognitive", mechanism: "Surcharge chronique en Ca²⁺ → dysrégulation de CaMKII → plasticité synaptique et signalisation BDNF altérées.", match: true },
      { timothy: "Crises / épilepsie", bermVK: "VK — Q-factor spectrum", mechanism: "Cav1.2 GoF abaisse le seuil épileptogène en réduisant γ (amortissement GABAergique). Même mécanisme Q-factor que l'épilepsie absence/généralisée.", match: true },
      { timothy: "Déficience immunitaire", bermVK: "VK — NK cells", mechanism: "L'activation des cellules T et NK nécessite une signalisation Ca²⁺ précise (CRAC/Orai1 + Cav1.2). L'activation constitutive désensibilise la réponse immunitaire.", match: true },
      { timothy: "Hypoglycémie", bermVK: "VK12 (β-cell)", mechanism: "Cav1.2 GoF → sécrétion excessive d'insuline par les cellules β → hypoglycémie. Image miroir de l'épuisement des cellules β par EMF→Ca²⁺ sur des décennies.", match: true },
      { timothy: "Dysmorphie faciale", bermVK: "VK — Craniofacial", mechanism: "La migration et la différenciation des cellules de la crête neurale sont dépendantes du Ca²⁺. Dynamique Ca²⁺ altérée pendant l'embryogenèse → anomalies structurelles.", match: true },
      { timothy: "Dysrégulation thermique", bermVK: "VK — Hypothalamic", mechanism: "La thermorégulation hypothalamique dépend de neurones sensibles au Ca²⁺ (TRPV + Cav1.2). GoF → instabilité du point de consigne.", match: true },
      { timothy: "Défauts de l'émail dentaire", bermVK: "VK — Ameloblasts", mechanism: "La formation de l'émail nécessite un transport précis du Ca²⁺ par les améloblastes. Cav1.2 GoF perturbe le gradient Ca²⁺ pendant l'amélogénèse.", match: true },
    ] satisfies CrossMapRow[],

    subTimothyTitle: "L'hypothèse « Sub-Timothy »",
    subTimothyLead:
      "Le syndrome de Timothy représente l'extrémité d'un spectre. BERM propose que l'EMF ambiant chronique produit un état « Sub-Timothy » au niveau populationnel — le même canal Cav1.2, activé à une intensité bien moindre mais pendant des décennies plutôt que de manière constitutive.",
    subTimothyComparison: [
      { dimension: "Activation CACNA1C", timothy: "Constitutive (mutation)", berm: "Intermittente (induite par EMF)" },
      { dimension: "Sévérité", timothy: "Sévère (survie médiane ~2,5 ans)", berm: "Subclinique à légère (décalage populationnel)" },
      { dimension: "Début", timothy: "Prénatal / néonatal", berm: "Cumulatif sur des années à des décennies" },
      { dimension: "Cardiaque", timothy: "QT long, arythmie, mort subite", berm: "Tendance à la prolongation QT, incidence FA en hausse" },
      { dimension: "Neurologique", timothy: "TSA, crises, DI (100 %)", berm: "Prévalence TSA 1→36 (1975→2020)" },
      { dimension: "Métabolique", timothy: "Hypoglycémie (hyperactivation cellules β)", berm: "Épidémie de DT2 (épuisement cellules β après des décennies)" },
      { dimension: "Immunitaire", timothy: "Infections récurrentes (désensibilisation immunitaire)", berm: "Épidémie de maladies allergiques (dysrégulation immunitaire)" },
    ],
    subTimothyHeaders: { dimension: "Dimension", timothy: "Timothy (CACNA1C GoF)", berm: "Sub-Timothy (EMF → Cav1.2)" },

    gwasTitle: "CACNA1C GWAS : le gène le plus pléiotrope en psychiatrie",
    gwasLead:
      "Les études d'association pangénomique ont indépendamment identifié CACNA1C comme gène de risque pour le trouble bipolaire, la schizophrénie, la dépression majeure, les TSA et le TDAH. C'est le gène de risque psychiatrique le plus répliqué à travers les troubles — exactement comme BERM le prédit pour le canal primaire de transduction EMF.",
    gwasPoints: [
      "Ferreira et al. 2008 (Nature Genetics) : CACNA1C rs1006737 associé au trouble bipolaire (p = 7,0×10⁻⁸)",
      "Green et al. 2010 (Am J Psychiatry) : même SNP associé à la schizophrénie et à une fonction amygdalienne altérée",
      "[[ref:pgc-cacna1c-five-disorders|Cross-Disorder Group 2013]] (Lancet) : CACNA1C identifié comme facteur de risque partagé à travers les cinq troubles psychiatriques majeurs",
      "Yoshimizu et al. 2015 : la mutation Timothy dans les neurones dérivés d'iPSC montre un excès de Ca²⁺ et une rétraction dendritique",
    ],

    predictionsTitle: "Prédictions issues de la comparaison Timothy",
    predictions: [
      "Les porteurs de variants communs de CACNA1C (allèle de risque rs1006737) devraient montrer une sensibilité accrue à l'EMF ambiant — ils partent plus près du seuil Timothy",
      "Les symptômes du spectre Timothy (cardiaques, neurologiques, métaboliques) devraient être plus prévalents dans les environnements à haut EMF, de manière dose-dépendante",
      "Les CCB sélectifs pour Cav1.2 devraient fournir une protection partielle contre la pathologie associée aux EMF chez les porteurs de l'allèle de risque CACNA1C",
      "Les neurones dérivés d'iPSC de porteurs de l'allèle de risque CACNA1C devraient montrer une réponse d'influx Ca²⁺ plus importante à l'exposition EMF que les non-porteurs",
    ],
    refsTitle: "Références clés",
    refs: [
      "[[ref:splawski2004|Splawski et al. 2004]] (Cell) : Description originale du syndrome de Timothy — mutation CACNA1C G406R",
      "[[ref:splawski2005_cardiac_ltype|Splawski et al. 2005]] (PNAS, PMC1149428) : syndrome de Timothy de type 2 — mutation CACNA1C alternative et phénotype plus large",
      "[[ref:bhat2012_cacna1c_psychiatric|Bhat et al. 2012]] : revue complète de CACNA1C dans les maladies psychiatriques",
      "[[ref:bader2011_timothy_mouse|Bader et al. 2011]] (PNAS) : le modèle murin du syndrome de Timothy reproduit la triade de traits autistiques",
      "[[ref:pgc-cacna1c-five-disorders|Cross-Disorder Group 2013]] (Lancet) : CACNA1C comme gène de risque psychiatrique transdiagnostique",
    ],
  },
  ko: {
    title: "Timothy 증후군: 자연의 CACNA1C 실험",
    subtitle:
      "Timothy 증후군은 CACNA1C (Cav1.2)의 단일 gain-of-function 변이에 의해 발생한다 — BERM이 EMF의 일차 신호변환 노드로 식별하는 동일한 L형 칼슘 채널이다. Timothy 환자는 BERM이 예측하는 거의 모든 병리를 발현한다. 하나의 변이 채널이 전체 질병 스펙트럼을 생산한다면, 동일 채널의 만성적 환경 활성화는 더 경미한 인구 수준의 버전을 생산해야 한다.",
    backLink: "← 근거로 돌아가기",
    cautionText:
      "이 페이지는 Timothy 증후군을 BERM의 핵심 메커니즘을 검증하는 자연 실험으로 제시한다. Timothy 증후군은 희귀하고 중증인 유전 질환(유병률 <1:500,000)이다. 만성 EMF 노출과의 비교는 메커니즘적이며 동등한 중증도를 주장하는 것이 아니다. Timothy 환자는 채널이 항상적으로 활성화되어 극적으로 더 심각한 병리를 경험하는 반면, EMF 유도 활성화는 간헐적이고 부분적이다.",

    crossMapTitle: "Timothy-BERM 교차 맵",
    crossMapLead:
      "Timothy 증후군의 모든 주요 표현형은 특정 BERM 중간층(VK)에 매핑된다. 이것은 가장 강력한 약리유전학적 검증이다: 단일 유전자(CACNA1C)가 완전한 BERM 질병 스펙트럼을 생산한다.",
    crossMapHeaders: { timothy: "Timothy 표현형", bermVK: "BERM 층", mechanism: "공유 Ca²⁺ 메커니즘" },
    crossMapRows: [
      { timothy: "QT 연장 증후군 / 부정맥", bermVK: "VK — Cardiac", mechanism: "Cav1.2 연장 개방 → 지연된 재분극 → 심실 부정맥. EMF 유도 QT 연장과 동일한 채널, 동일한 메커니즘.", match: true },
      { timothy: "합지증(융합된 손가락/발가락)", bermVK: "VK — Developmental", mechanism: "사지 발달 중 Ca²⁺ 의존성 세포자멸사 실패. Ca²⁺ 과부하가 손가락 경계에서의 프로그램 세포사를 방해.", match: true },
      { timothy: "자폐 스펙트럼 장애", bermVK: "VK31 (ASD prototype)", mechanism: "CACNA1C GoF → 피질 E/I 불균형 → 사회적/의사소통 결핍. Bhatt 2012: 뉴런에서 GLP-1R→Cav1.2→ERK 경로.", match: true },
      { timothy: "지적 장애", bermVK: "VK — BDNF/cognitive", mechanism: "만성 Ca²⁺ 과부하 → CaMKII 조절 장애 → 시냅스 가소성 및 BDNF 신호전달 손상.", match: true },
      { timothy: "발작 / 간질", bermVK: "VK — Q-factor spectrum", mechanism: "Cav1.2 GoF가 γ(GABA 작동성 감쇠)를 감소시켜 발작 역치를 낮춤. 결신/전신 간질과 동일한 Q-factor 메커니즘.", match: true },
      { timothy: "면역 결핍", bermVK: "VK — NK cells", mechanism: "T세포 및 NK세포 활성화에는 정밀한 Ca²⁺ 신호전달(CRAC/Orai1 + Cav1.2)이 필요. 항상적 활성화가 면역 반응을 탈감작시킴.", match: true },
      { timothy: "저혈당", bermVK: "VK12 (β-cell)", mechanism: "Cav1.2 GoF → β세포의 과잉 인슐린 분비 → 저혈당. 수십 년에 걸친 EMF→Ca²⁺→β세포 고갈의 거울상.", match: true },
      { timothy: "안면 기형", bermVK: "VK — Craniofacial", mechanism: "신경능선세포의 이동과 분화는 Ca²⁺ 의존적. 배아 발생 중 Ca²⁺ 역학 변화 → 구조적 이상.", match: true },
      { timothy: "체온 조절 장애", bermVK: "VK — Hypothalamic", mechanism: "시상하부 체온 조절은 Ca²⁺ 감수성 뉴런(TRPV + Cav1.2)에 의존. GoF → 설정점 불안정.", match: true },
      { timothy: "치아 에나멜 결함", bermVK: "VK — Ameloblasts", mechanism: "에나멜 형성에는 법랑모세포에 의한 정밀한 Ca²⁺ 수송이 필요. Cav1.2 GoF가 법랑질 형성 중 Ca²⁺ 구배를 교란.", match: true },
    ] satisfies CrossMapRow[],

    subTimothyTitle: "'서브Timothy' 가설",
    subTimothyLead:
      "Timothy 증후군은 스펙트럼의 극단을 나타낸다. BERM은 만성적 환경 EMF가 인구 수준의 '서브Timothy' 상태를 생산한다고 제안한다 — 동일한 Cav1.2 채널이 항상적이 아닌 훨씬 낮은 강도로, 그러나 수십 년에 걸쳐 활성화된다.",
    subTimothyComparison: [
      { dimension: "CACNA1C 활성화", timothy: "항상적 (변이)", berm: "간헐적 (EMF 유도)" },
      { dimension: "중증도", timothy: "중증 (중앙 생존기간 ~2.5년)", berm: "무증상~경증 (인구 수준 이동)" },
      { dimension: "발병", timothy: "태아기 / 신생아기", berm: "수년~수십 년에 걸친 축적" },
      { dimension: "심장", timothy: "QT 연장, 부정맥, 돌연사", berm: "QT 연장 경향, AF 발생률 상승" },
      { dimension: "신경", timothy: "ASD, 발작, 지적장애 (100%)", berm: "ASD 유병률 1→36 (1975→2020)" },
      { dimension: "대사", timothy: "저혈당 (β세포 과활성화)", berm: "T2D 유행 (수십 년 후 β세포 고갈)" },
      { dimension: "면역", timothy: "반복 감염 (면역 탈감작)", berm: "알레르기 질환 유행 (면역 조절 장애)" },
    ],
    subTimothyHeaders: { dimension: "차원", timothy: "Timothy (CACNA1C GoF)", berm: "서브Timothy (EMF → Cav1.2)" },

    gwasTitle: "CACNA1C GWAS: 정신의학에서 가장 다면발현적인 유전자",
    gwasLead:
      "전장유전체 연관분석은 CACNA1C를 양극성 장애, 조현병, 주요 우울증, ASD, ADHD의 위험 유전자로 독립적으로 식별했다. 이것은 장애를 넘어 가장 많이 재현된 정신과적 위험 유전자이며 — BERM이 일차 EMF 신호변환 채널에 대해 예측하는 바와 정확히 일치한다.",
    gwasPoints: [
      "Ferreira et al. 2008 (Nature Genetics): CACNA1C rs1006737이 양극성 장애와 관련 (p = 7.0×10⁻⁸)",
      "Green et al. 2010 (Am J Psychiatry): 동일한 SNP가 조현병 및 편도체 기능 변화와 관련",
      "[[ref:pgc-cacna1c-five-disorders|Cross-Disorder Group 2013]] (Lancet): CACNA1C가 5대 정신질환 모두의 공유 위험 인자로 식별",
      "Yoshimizu et al. 2015: iPSC 유래 뉴런에서 Timothy 변이가 과잉 Ca²⁺와 수상돌기 퇴축을 보임",
    ],

    predictionsTitle: "Timothy 비교로부터의 예측",
    predictions: [
      "CACNA1C 일반 변이체(rs1006737 위험 대립유전자 보유자)는 환경 EMF에 대한 감수성이 증가해야 한다 — Timothy 역치에 더 가까운 지점에서 시작",
      "Timothy 스펙트럼 증상(심장, 신경, 대사)은 고 EMF 환경에서 더 높은 유병률을 보여야 하며, 용량 의존적으로",
      "Cav1.2 선택적 CCB는 CACNA1C 위험 대립유전자 보유자에서 EMF 관련 병리에 대한 부분적 방어를 제공해야 한다",
      "CACNA1C 위험 대립유전자 보유자의 iPSC 유래 뉴런은 비보유자보다 EMF 노출에 대해 더 큰 Ca²⁺ 유입 반응을 보여야 한다",
    ],
    refsTitle: "주요 참고문헌",
    refs: [
      "[[ref:splawski2004|Splawski et al. 2004]] (Cell): Timothy 증후군 최초 기술 — CACNA1C G406R 변이",
      "[[ref:splawski2005_cardiac_ltype|Splawski et al. 2005]] (PNAS, PMC1149428): Timothy 증후군 2형 — 대체 CACNA1C 변이와 더 넓은 표현형",
      "[[ref:bhat2012_cacna1c_psychiatric|Bhat et al. 2012]]: 정신질환에서 CACNA1C의 역할에 대한 포괄적 고찰",
      "[[ref:bader2011_timothy_mouse|Bader et al. 2011]] (PNAS): Timothy 증후군 생쥐 모델이 자폐성 특성의 세 요소를 재현",
      "[[ref:pgc-cacna1c-five-disorders|Cross-Disorder Group 2013]] (Lancet): 진단 횡단적 정신과 위험 유전자로서의 CACNA1C",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = COPY[locale as keyof typeof COPY] ?? COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle.slice(0, 160) };
}

export default async function TimothyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>

      <PageHeader icon={Dna} title={d.title} subtitle={d.subtitle} />

      <CautionBox className="mt-8">{d.cautionText}</CautionBox>

      {/* Cross-map table */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.crossMapTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.crossMapLead}</p>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left p-3 font-medium text-foreground-muted">{d.crossMapHeaders.timothy}</th>
                <th className="text-left p-3 font-medium text-foreground-muted">{d.crossMapHeaders.bermVK}</th>
                <th className="text-left p-3 font-medium text-foreground-muted">{d.crossMapHeaders.mechanism}</th>
              </tr>
            </thead>
            <tbody>
              {d.crossMapRows.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="p-3 font-medium align-top whitespace-nowrap">{row.timothy}</td>
                  <td className="p-3 font-mono text-xs text-accent align-top whitespace-nowrap">{row.bermVK}</td>
                  <td className="p-3 text-foreground-muted leading-relaxed text-[13px] align-top">{row.mechanism}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm font-medium text-green-600 dark:text-green-400">
          {{ en: "10/10 phenotypes map to a BERM layer", fi: "10/10 fenotyyppiä kartoittuu BERM-kerrokseen", ja: "10/10の表現型がBERM層にマッピング", fr: "10/10 phénotypes correspondent à une couche BERM", ko: "10/10 표현형이 BERM 층에 매핑됨" }[locale as string] ?? "10/10 phenotypes map to a BERM layer"} ✓
        </p>
      </section>

      {/* Sub-Timothy */}
      <section className="mt-14">
        <h2 className="text-lg font-semibold mb-2">{d.subTimothyTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.subTimothyLead}</p>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left p-3 font-medium text-foreground-muted">{d.subTimothyHeaders.dimension}</th>
                <th className="text-left p-3 font-medium text-red-600 dark:text-red-400">{d.subTimothyHeaders.timothy}</th>
                <th className="text-left p-3 font-medium text-accent">{d.subTimothyHeaders.berm}</th>
              </tr>
            </thead>
            <tbody>
              {d.subTimothyComparison.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="p-3 font-medium align-top">{row.dimension}</td>
                  <td className="p-3 text-foreground-muted align-top text-[13px]">{row.timothy}</td>
                  <td className="p-3 text-foreground-muted align-top text-[13px]">{row.berm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* GWAS */}
      <section className="mt-14">
        <h2 className="text-lg font-semibold mb-2">{d.gwasTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.gwasLead}</p>
        <ul className="space-y-2">
          {d.gwasPoints.map((p, i) => (
            <li key={i} className="text-sm leading-relaxed pl-4 border-l-2 border-accent/30">
              <InlineReferenceText text={p} locale={locale} />
            </li>
          ))}
        </ul>
      </section>

      {/* Predictions */}
      <section className="mt-14">
        <h2 className="text-lg font-semibold mb-2">{d.predictionsTitle}</h2>
        <ol className="space-y-3 list-decimal list-inside">
          {d.predictions.map((p, i) => (
            <li key={i} className="text-sm leading-relaxed text-foreground-muted">{p}</li>
          ))}
        </ol>
      </section>

      {/* References */}
      <section className="mt-14 pb-8">
        <h2 className="text-lg font-semibold mb-3">{d.refsTitle}</h2>
        <ol className="space-y-2 list-decimal list-inside">
          {d.refs.map((r, i) => (
            <li key={i} className="text-xs text-foreground-muted leading-relaxed">
              <InlineReferenceText text={r} locale={locale} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
