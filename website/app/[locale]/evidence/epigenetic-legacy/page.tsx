import type { Metadata } from "next";
import Link from "next/link";
import { Dna } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Epigenetic Legacy: Transgenerational Inheritance",
    subtitle: "EMF alters three epigenetic mechanisms — DNA methylation, histone modification, and microRNA — which may transmit biological effects to unexposed offspring. The DDT transgenerational model provides the template; sperm methylation dose-dependence (VK27) provides the mechanism.",
    backLink: "← Back to Evidence",
    cautionText: "This page presents BERM's most speculative prediction. While EMF-induced epigenetic changes are experimentally demonstrated, and transgenerational inheritance via sperm epigenome is proven for other environmental exposures (DDT, stress), the specific claim that EMF effects persist to F3 generation has NOT been tested. This prediction (E-NEW-10) is designated as BERM's highest priority research proposal precisely because of its profound implications.",

    mechTitle: "Three epigenetic mechanisms",
    mechLead: "EMF disrupts all three known channels of epigenetic regulation. Each independently alters gene expression; together they create a comprehensive epigenetic signature.",
    mechanisms: [
      { id: "E1", name: "DNA methylation (DNMT1)", detail: "ELF-EMF alters DNMT1 expression in endometrium ([[ref:epigen_endo_2024|ScienceDirect 2024]]). In sperm cells: 50 Hz ELF produces DOSE-DEPENDENT bidirectional methylation changes — global methylation decreases at 1 mT but INCREASES at 3 mT ([[ref:gc2_methylation|PMC4538330]]). This dose-dependence makes the effect especially difficult to detect in population studies where exposure varies.", color: "amber" },
      { id: "E2", name: "Histone modification (HDAC)", detail: "ELF-EMF alters HDAC activity (VK27, [[ref:epigen_endo_2024|ScienceDirect 2024]]). Histone modifications control chromatin accessibility and gene expression. HDAC changes affect α2δ-1 expression (VK30 bridge) and developmental gene regulation. Histone retention in sperm is a known transgenerational vehicle.", color: "amber" },
      { id: "E3", name: "MicroRNA biogenesis (DICER1, DGCR8)", detail: "ELF-EMF alters DICER1 and DGCR8 expression — key enzymes in microRNA processing ([[ref:epigen_endo_2024|ScienceDirect 2024]]). MicroRNAs regulate post-transcriptional gene expression. Sperm-borne microRNAs are transmitted to the embryo and influence early development.", color: "amber" },
    ],

    ddtTitle: "The DDT analogy",
    ddtLead: "DDT provides the established template for transgenerational environmental inheritance.",
    ddtPoints: [
      "DDT exposure in F0 generation → sperm DNA methylation changes → obesity, testicular pathology, kidney disease in F3 (unexposed) generation",
      "Transmission vehicle: DNA methylation, piRNA, and histone retention in sperm ([[ref:ddt_transgener|PMC5827984]])",
      "F3 effects persist WITHOUT continued exposure — the epigenome carries the memory",
      "Other verified transgenerational exposures: stress (cortisol → sperm methylation), endocrine disruptors (BPA, phthalates), famine (Dutch Hunger Winter)",
    ],
    ddtConclusion: "EMF affects the SAME three epigenetic mechanisms through which DDT achieves transgenerational inheritance. The question is not WHETHER EMF can alter the sperm epigenome (it can — VK27), but whether those changes persist to F3.",

    doseTitle: "The dose-dependence problem",
    doseLead: "EMF epigenetic effects are bidirectional and dose-dependent — a critical complication.",
    doseBody: "At 1 mT: global methylation DECREASES. At 3 mT: global methylation INCREASES. This means population studies with mixed exposure levels may average the effect to zero, even when individual responses are significant. Future research must control for exposure intensity, not just duration. This dose-dependence may explain why EMF epigenetic effects have been difficult to detect in epidemiological studies.",

    networkTitle: "Network connections",
    networkPoints: [
      { bridge: "VK27 → VK30", detail: "HDAC modification → α2δ-1 expression regulation → chronic pain (epigenetic amplification of the pain mechanism)" },
      { bridge: "VK27 → VK6", detail: "Epigenetic changes → KCC2 maturation timing → GABA switch delay (developmental neurotoxicity pathway)" },
      { bridge: "VK27 → VK28", detail: "Methylation changes → telomerase regulation → aging acceleration (epigenetic-aging bridge)" },
      { bridge: "VK27 → VK26", detail: "Epigenetic changes → Dio2/Dio3 expression → thyroid hormone conversion (hidden hypothyroidism)" },
    ],

    implTitle: "Implications",
    implBody: "If EMF effects are transgenerational, the current generation's EMF exposure may affect grandchildren who are never themselves exposed. This transforms EMF from a personal health risk to an intergenerational environmental legacy — similar to DDT, lead, and other persistent environmental exposures that were only recognized as transgenerational after decades of accumulated evidence.",

    predictionText: "Prediction E-NEW-10 (transgenerational sperm methylation persists to F3) is BERM's highest priority research proposal. A multigenerational rodent study (18-24 months) could resolve this question definitively.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Epigeneettinen perintö: ylisukupolvinen periytyminen",
    subtitle: "EMF muuttaa kolmea epigeneettistä mekanismia — DNA-metylaatio, histonimodifikaatio ja mikroRNA — jotka voivat välittää biologisia vaikutuksia altistumattomille jälkeläisille. DDT:n ylisukupolvinen malli tarjoaa mallin; siittiöiden metylaation annosriippuvuus (VK27) tarjoaa mekanismin.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Tämä sivu esittää BERM:n spekulatiivisimman ennusteen. Vaikka EMF-indusoidut epigeneettiset muutokset on osoitettu kokeellisesti ja ylisukupolvinen periytyminen siittiöiden epigenomin kautta on todistettu muille ympäristöaltistuksille (DDT, stressi), tarkka väite että EMF-vaikutukset säilyvät F3-sukupolveen EI OLE testattu. Tämä ennuste (E-NEW-10) on nimetty BERM:n korkeimman prioriteetin tutkimusehdotukseksi juuri sen syvällisten seurausten vuoksi.",

    mechTitle: "Kolme epigeneettistä mekanismia",
    mechLead: "EMF häiritsee kaikkia kolmea tunnettua epigeneettisen säätelyn kanavaa. Jokainen muuttaa itsenäisesti geeniekspressiota; yhdessä ne luovat kattavan epigeneettisen allekirjoituksen.",
    mechanisms: [
      { id: "E1", name: "DNA-metylaatio (DNMT1)", detail: "ELF-EMF muuttaa DNMT1-ekspressiota kohdun limakalvossa ([[ref:epigen_endo_2024|ScienceDirect 2024]]). Siittiösoluissa: 50 Hz ELF tuottaa ANNOSRIIPPUVAISIA kaksisuuntaisia metylaatiomuutoksia — globaali metylaatio vähenee 1 mT:ssä mutta KASVAA 3 mT:ssä ([[ref:gc2_methylation|PMC4538330]]). Tämä annosriippuvuus tekee vaikutuksesta erityisen vaikean havaita väestötutkimuksissa joissa altistus vaihtelee.", color: "amber" },
      { id: "E2", name: "Histonimodifikaatio (HDAC)", detail: "ELF-EMF muuttaa HDAC-aktiivisuutta (VK27, [[ref:epigen_endo_2024|ScienceDirect 2024]]). Histonimodifikaatiot säätelevät kromatiinin saavutettavuutta ja geeniekspressiota. HDAC-muutokset vaikuttavat α2δ-1-ekspressioon (VK30-silta) ja kehityksellisten geenien säätelyyn. Histonien retentio siittiöissä on tunnettu ylisukupolvinen välittäjä.", color: "amber" },
      { id: "E3", name: "MikroRNA-biogeneesi (DICER1, DGCR8)", detail: "ELF-EMF muuttaa DICER1- ja DGCR8-ekspressiota — avainentsyymejä mikroRNA:n prosessoinnissa ([[ref:epigen_endo_2024|ScienceDirect 2024]]). MikroRNA:t säätelevät post-transkriptionaalista geeniekspressiota. Siittiöiden kantamat mikroRNA:t välittyvät alkioon ja vaikuttavat varhaiseen kehitykseen.", color: "amber" },
    ],

    ddtTitle: "DDT-analogia",
    ddtLead: "DDT tarjoaa vakiintuneen mallin transgenerationaaliselle ympäristöperiytymiselle.",
    ddtPoints: [
      "DDT-altistus F0-sukupolvessa → siittiöiden DNA-metylaatiomuutokset → lihavuus, kivestaudinkuva, munuaissairaus F3-sukupolvessa (altistumaton)",
      "Välityskanava: DNA-metylaatio, piRNA ja histonien retentio siittiöissä ([[ref:ddt_transgener|PMC5827984]])",
      "F3-vaikutukset säilyvät ILMAN jatkuvaa altistusta — epigenomi kantaa muistin",
      "Muita todennettuja ylisukupolvisia altistuksia: stressi (kortisoli → siittiöiden metylaatio), hormonihäiritsijät (BPA, ftalaatit), nälänhätä (Alankomaiden nälkätalvi)",
    ],
    ddtConclusion: "EMF vaikuttaa SAMOIHIN kolmeen epigeneettiseen mekanismiin joiden kautta DDT saavuttaa ylisukupolvisen periytymisen. Kysymys ei ole VOIKO EMF muuttaa siittiöiden epigenomia (voi — VK27), vaan säilyvätkö nuo muutokset F3:een asti.",

    doseTitle: "Annosriippuvuusongelma",
    doseLead: "EMF:n epigeneettiset vaikutukset ovat kaksisuuntaisia ja annosriippuvaisia — kriittinen komplikaatio.",
    doseBody: "1 mT:ssä: globaali metylaatio VÄHENEE. 3 mT:ssä: globaali metylaatio KASVAA. Tämä tarkoittaa, että väestötutkimukset joissa altistustasot vaihtelevat voivat keskiarvoistaa vaikutuksen nollaan, vaikka yksittäiset vasteet ovat merkittäviä. Tulevien tutkimusten on kontrolloitava altistuksen voimakkuutta, ei pelkästään kestoa. Tämä annosriippuvuus voi selittää miksi EMF:n epigeneettisiä vaikutuksia on ollut vaikea havaita epidemiologisissa tutkimuksissa.",

    networkTitle: "Verkostoyhteydet",
    networkPoints: [
      { bridge: "VK27 → VK30", detail: "HDAC-modifikaatio → α2δ-1-ekspression säätely → krooninen kipu (kipumekanismin epigeneettinen vahvistus)" },
      { bridge: "VK27 → VK6", detail: "Epigeneettiset muutokset → KCC2-kypsymisen ajoitus → GABA-vaihdon viive (kehityksellinen neurotoksisuusreitti)" },
      { bridge: "VK27 → VK28", detail: "Metylaatiomuutokset → telomeraasin säätely → ikääntymisen kiihtyminen (epigeneettinen-ikääntymissilta)" },
      { bridge: "VK27 → VK26", detail: "Epigeneettiset muutokset → Dio2/Dio3-ekspressio → kilpirauhashormonin muuntaminen (piilevä hypotyreoosi)" },
    ],

    implTitle: "Seuraukset",
    implBody: "Jos EMF-vaikutukset ovat ylisukupolvisia, nykyisen sukupolven EMF-altistus voi vaikuttaa lastenlapsiin jotka eivät itse koskaan altistu. Tämä muuttaa EMF:n henkilökohtaisesta terveysriskistä sukupolvien väliseksi ympäristöperinnöksi — samankaltaiseksi kuin DDT, lyijy ja muut pysyvät ympäristöaltistukset jotka tunnistettiin transgenerationaalisiksi vasta vuosikymmenten kertyneen näytön jälkeen.",

    predictionText: "Ennuste E-NEW-10 (ylisukupolvinen siittiöiden metylaatio säilyy F3:een) on BERM:n korkeimman prioriteetin tutkimusehdotus. Monisukupolvinen jyrsijätutkimus (18-24 kuukautta) voisi ratkaista tämän kysymyksen lopullisesti.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "エピジェネティックな遺産：世代間遺伝",
    subtitle: "EMFは3つのエピジェネティックメカニズム — DNAメチル化、ヒストン修飾、マイクロRNA — を変化させ、未曝露の子孫に生物学的影響を伝達する可能性がある。DDTの世代間モデルがテンプレートを提供し、精子メチル化の用量依存性（VK27）がメカニズムを提供する。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページはBERMの最も推測的な予測を提示する。EMF誘発性のエピジェネティック変化は実験的に実証されており、精子エピゲノムを介した世代間遺伝は他の環境曝露（DDT、ストレス）で証明されているが、EMFの影響がF3世代まで持続するという具体的な主張はテストされていない。この予測（E-NEW-10）は、その深遠な意味合いゆえにBERMの最優先研究提案に指定されている。",

    mechTitle: "3つのエピジェネティックメカニズム",
    mechLead: "EMFはエピジェネティック制御の既知の3つのチャネルすべてを攪乱する。それぞれが独立して遺伝子発現を変化させ、合わせて包括的なエピジェネティックシグネチャーを形成する。",
    mechanisms: [
      { id: "E1", name: "DNAメチル化 (DNMT1)", detail: "ELF-EMFは子宮内膜におけるDNMT1発現を変化させる（[[ref:epigen_endo_2024|ScienceDirect 2024]]）。精子細胞において：50 Hz ELFは用量依存的な双方向メチル化変化を生じさせる — 全体的メチル化は1 mTで減少するが3 mTでは増加する（[[ref:gc2_methylation|PMC4538330]]）。この用量依存性は、曝露が変動する集団研究において効果の検出を特に困難にする。", color: "amber" },
      { id: "E2", name: "ヒストン修飾 (HDAC)", detail: "ELF-EMFはHDAC活性を変化させる（VK27、[[ref:epigen_endo_2024|ScienceDirect 2024]]）。ヒストン修飾はクロマチンのアクセシビリティと遺伝子発現を制御する。HDAC変化はα2δ-1発現（VK30ブリッジ）と発達遺伝子制御に影響する。精子におけるヒストン保持は既知の世代間伝達媒体である。", color: "amber" },
      { id: "E3", name: "マイクロRNA生合成 (DICER1, DGCR8)", detail: "ELF-EMFはDICER1およびDGCR8の発現を変化させる — マイクロRNAプロセシングの主要酵素である（[[ref:epigen_endo_2024|ScienceDirect 2024]]）。マイクロRNAは転写後の遺伝子発現を制御する。精子由来のマイクロRNAは胚に伝達され、初期発達に影響する。", color: "amber" },
    ],

    ddtTitle: "DDTアナロジー",
    ddtLead: "DDTは世代間環境遺伝の確立されたテンプレートを提供する。",
    ddtPoints: [
      "F0世代のDDT曝露 → 精子DNAメチル化変化 → F3世代（未曝露）における肥満、精巣病理、腎疾患",
      "伝達媒体：精子のDNAメチル化、piRNA、ヒストン保持（[[ref:ddt_transgener|PMC5827984]]）",
      "F3への影響は継続的な曝露なしに持続する — エピゲノムが記憶を担う",
      "その他の検証された世代間曝露：ストレス（コルチゾール → 精子メチル化）、内分泌攪乱物質（BPA、フタル酸エステル）、飢饉（オランダ飢餓の冬）",
    ],
    ddtConclusion: "EMFはDDTが世代間遺伝を達成するのと同じ3つのエピジェネティックメカニズムに影響する。問題はEMFが精子エピゲノムを変化させられるかどうか（可能 — VK27）ではなく、それらの変化がF3まで持続するかどうかである。",

    doseTitle: "用量依存性の問題",
    doseLead: "EMFのエピジェネティック効果は双方向的かつ用量依存的 — 重大な複雑化要因。",
    doseBody: "1 mTで：全体的メチル化は減少する。3 mTで：全体的メチル化は増加する。これは、曝露レベルが混在する集団研究が、個々の応答が有意であっても効果を平均してゼロにする可能性があることを意味する。将来の研究は期間だけでなく曝露強度を制御する必要がある。この用量依存性は、EMFのエピジェネティック効果が疫学研究で検出困難であった理由を説明し得る。",

    networkTitle: "ネットワーク接続",
    networkPoints: [
      { bridge: "VK27 → VK30", detail: "HDAC修飾 → α2δ-1発現制御 → 慢性疼痛（疼痛メカニズムのエピジェネティック増幅）" },
      { bridge: "VK27 → VK6", detail: "エピジェネティック変化 → KCC2成熟タイミング → GABAスイッチ遅延（発達的神経毒性経路）" },
      { bridge: "VK27 → VK28", detail: "メチル化変化 → テロメラーゼ制御 → 老化加速（エピジェネティック-老化ブリッジ）" },
      { bridge: "VK27 → VK26", detail: "エピジェネティック変化 → Dio2/Dio3発現 → 甲状腺ホルモン変換（潜在性甲状腺機能低下症）" },
    ],

    implTitle: "含意",
    implBody: "EMFの影響が世代間にまたがる場合、現世代のEMF曝露は自身が曝露されることのない孫に影響を与える可能性がある。これはEMFを個人の健康リスクから世代間の環境遺産へと変える — DDT、鉛、その他の持続的環境曝露が数十年の蓄積された証拠の後にようやく世代間的であると認識されたのと同様である。",

    predictionText: "予測E-NEW-10（世代間精子メチル化がF3まで持続する）はBERMの最優先研究提案である。多世代げっ歯類研究（18〜24ヶ月）がこの問題を決定的に解決し得る。",
    predictionLink: "最終層の予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "Heritage epigenetique : transmission transgenerationnelle",
    subtitle: "Les EMF alterent trois mecanismes epigenetiques — methylation de l'ADN, modification des histones et microARN — qui pourraient transmettre des effets biologiques a une descendance non exposee. Le modele transgenerationnel du DDT fournit le cadre ; la dose-dependance de la methylation des spermatozoides (VK27) fournit le mecanisme.",
    backLink: "← Retour aux preuves",
    cautionText: "Cette page presente la prediction la plus speculative de BERM. Bien que les changements epigenetiques induits par les EMF soient demontres experimentalement, et que la transmission transgenerationnelle via l'epigenome spermatique soit prouvee pour d'autres expositions environnementales (DDT, stress), l'affirmation specifique que les effets des EMF persistent jusqu'a la generation F3 n'a PAS ete testee. Cette prediction (E-NEW-10) est designee comme la proposition de recherche prioritaire de BERM precisement en raison de ses implications profondes.",

    mechTitle: "Trois mecanismes epigenetiques",
    mechLead: "Les EMF perturbent les trois canaux connus de regulation epigenetique. Chacun modifie independamment l'expression genique ; ensemble, ils creent une signature epigenetique complete.",
    mechanisms: [
      { id: "E1", name: "Methylation de l'ADN (DNMT1)", detail: "L'ELF-EMF modifie l'expression de DNMT1 dans l'endometre ([[ref:epigen_endo_2024|ScienceDirect 2024]]). Dans les spermatozoides : l'ELF a 50 Hz produit des changements de methylation bidirectionnels DOSE-DEPENDANTS — la methylation globale diminue a 1 mT mais AUGMENTE a 3 mT ([[ref:gc2_methylation|PMC4538330]]). Cette dose-dependance rend l'effet particulierement difficile a detecter dans les etudes de population ou l'exposition varie.", color: "amber" },
      { id: "E2", name: "Modification des histones (HDAC)", detail: "L'ELF-EMF modifie l'activite HDAC (VK27, [[ref:epigen_endo_2024|ScienceDirect 2024]]). Les modifications des histones controlent l'accessibilite de la chromatine et l'expression genique. Les changements de HDAC affectent l'expression d'α2δ-1 (pont VK30) et la regulation des genes du developpement. La retention des histones dans les spermatozoides est un vehicule transgenerationnel reconnu.", color: "amber" },
      { id: "E3", name: "Biogenese des microARN (DICER1, DGCR8)", detail: "L'ELF-EMF modifie l'expression de DICER1 et DGCR8 — enzymes cles du traitement des microARN ([[ref:epigen_endo_2024|ScienceDirect 2024]]). Les microARN regulent l'expression genique post-transcriptionnelle. Les microARN portes par les spermatozoides sont transmis a l'embryon et influencent le developpement precoce.", color: "amber" },
    ],

    ddtTitle: "L'analogie avec le DDT",
    ddtLead: "Le DDT fournit le modele etabli pour la transmission environnementale transgenerationnelle.",
    ddtPoints: [
      "Exposition au DDT en generation F0 → modifications de la methylation de l'ADN spermatique → obesite, pathologie testiculaire, maladie renale en F3 (generation non exposee)",
      "Vehicule de transmission : methylation de l'ADN, piARN et retention des histones dans les spermatozoides ([[ref:ddt_transgener|PMC5827984]])",
      "Les effets sur F3 persistent SANS exposition continue — l'epigenome porte la memoire",
      "Autres expositions transgenerationnelles verifiees : stress (cortisol → methylation spermatique), perturbateurs endocriniens (BPA, phtalates), famine (Hiver de la faim aux Pays-Bas)",
    ],
    ddtConclusion: "Les EMF affectent les MEMES trois mecanismes epigenetiques par lesquels le DDT realise la transmission transgenerationnelle. La question n'est pas de savoir SI les EMF peuvent modifier l'epigenome spermatique (ils le peuvent — VK27), mais si ces modifications persistent jusqu'a F3.",

    doseTitle: "Le probleme de la dose-dependance",
    doseLead: "Les effets epigenetiques des EMF sont bidirectionnels et dose-dependants — une complication critique.",
    doseBody: "A 1 mT : la methylation globale DIMINUE. A 3 mT : la methylation globale AUGMENTE. Cela signifie que les etudes de population avec des niveaux d'exposition mixtes peuvent moyenner l'effet a zero, meme lorsque les reponses individuelles sont significatives. Les recherches futures doivent controler l'intensite de l'exposition, pas seulement la duree. Cette dose-dependance pourrait expliquer pourquoi les effets epigenetiques des EMF ont ete difficiles a detecter dans les etudes epidemiologiques.",

    networkTitle: "Connexions reseau",
    networkPoints: [
      { bridge: "VK27 → VK30", detail: "Modification HDAC → regulation de l'expression α2δ-1 → douleur chronique (amplification epigenetique du mecanisme de la douleur)" },
      { bridge: "VK27 → VK6", detail: "Changements epigenetiques → chronologie de maturation de KCC2 → retard du switch GABA (voie de neurotoxicite developpementale)" },
      { bridge: "VK27 → VK28", detail: "Changements de methylation → regulation de la telomerase → acceleration du vieillissement (pont epigenetique-vieillissement)" },
      { bridge: "VK27 → VK26", detail: "Changements epigenetiques → expression Dio2/Dio3 → conversion de l'hormone thyroidienne (hypothyroidie cachee)" },
    ],

    implTitle: "Implications",
    implBody: "Si les effets des EMF sont transgenerationnels, l'exposition EMF de la generation actuelle pourrait affecter les petits-enfants qui ne sont jamais eux-memes exposes. Cela transforme les EMF d'un risque sanitaire personnel en un heritage environnemental intergenerationnel — similaire au DDT, au plomb et a d'autres expositions environnementales persistantes qui n'ont ete reconnues comme transgenerationnelles qu'apres des decennies de preuves accumulees.",

    predictionText: "La prediction E-NEW-10 (la methylation transgenerationnelle des spermatozoides persiste jusqu'a F3) est la proposition de recherche prioritaire de BERM. Une etude multigenerationnelle chez les rongeurs (18-24 mois) pourrait resoudre cette question de maniere definitive.",
    predictionLink: "Voir les predictions de la couche finale →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "후성유전학적 유산: 세대간 유전",
    subtitle: "EMF는 세 가지 후성유전학적 메커니즘 — DNA 메틸화, 히스톤 변형, 마이크로RNA — 을 변화시켜 비노출 자손에게 생물학적 영향을 전달할 수 있다. DDT 세대간 모델이 틀을 제공하고, 정자 메틸화의 용량 의존성(VK27)이 메커니즘을 제공한다.",
    backLink: "← 근거로 돌아가기",
    cautionText: "이 페이지는 BERM의 가장 추측적인 예측을 제시한다. EMF 유도 후성유전학적 변화는 실험적으로 입증되었고, 정자 후성유전체를 통한 세대간 유전은 다른 환경 노출(DDT, 스트레스)에서 증명되었지만, EMF 영향이 F3 세대까지 지속된다는 구체적 주장은 테스트되지 않았다. 이 예측(E-NEW-10)은 그 심오한 함의 때문에 BERM의 최우선 연구 제안으로 지정되었다.",

    mechTitle: "세 가지 후성유전학적 메커니즘",
    mechLead: "EMF는 후성유전학적 조절의 알려진 세 가지 채널 모두를 교란한다. 각각은 독립적으로 유전자 발현을 변화시키며, 함께 포괄적인 후성유전학적 시그니처를 형성한다.",
    mechanisms: [
      { id: "E1", name: "DNA 메틸화 (DNMT1)", detail: "ELF-EMF는 자궁내막에서 DNMT1 발현을 변화시킨다([[ref:epigen_endo_2024|ScienceDirect 2024]]). 정자 세포에서: 50 Hz ELF는 용량 의존적 양방향 메틸화 변화를 생성한다 — 전반적 메틸화는 1 mT에서 감소하지만 3 mT에서 증가한다([[ref:gc2_methylation|PMC4538330]]). 이 용량 의존성은 노출이 다양한 인구 연구에서 효과 감지를 특히 어렵게 만든다.", color: "amber" },
      { id: "E2", name: "히스톤 변형 (HDAC)", detail: "ELF-EMF는 HDAC 활성을 변화시킨다(VK27, [[ref:epigen_endo_2024|ScienceDirect 2024]]). 히스톤 변형은 크로마틴 접근성과 유전자 발현을 제어한다. HDAC 변화는 α2δ-1 발현(VK30 브리지)과 발달 유전자 조절에 영향을 미친다. 정자에서의 히스톤 보유는 알려진 세대간 전달 수단이다.", color: "amber" },
      { id: "E3", name: "마이크로RNA 생합성 (DICER1, DGCR8)", detail: "ELF-EMF는 DICER1 및 DGCR8 발현을 변화시킨다 — 마이크로RNA 프로세싱의 핵심 효소이다([[ref:epigen_endo_2024|ScienceDirect 2024]]). 마이크로RNA는 전사 후 유전자 발현을 조절한다. 정자가 운반하는 마이크로RNA는 배아에 전달되어 초기 발달에 영향을 미친다.", color: "amber" },
    ],

    ddtTitle: "DDT 유사성",
    ddtLead: "DDT는 세대간 환경 유전의 확립된 템플릿을 제공한다.",
    ddtPoints: [
      "F0 세대 DDT 노출 → 정자 DNA 메틸화 변화 → F3(비노출) 세대에서 비만, 고환 병리, 신장 질환",
      "전달 수단: 정자의 DNA 메틸화, piRNA, 히스톤 보유([[ref:ddt_transgener|PMC5827984]])",
      "F3 효과는 지속적 노출 없이 유지된다 — 후성유전체가 기억을 담고 있다",
      "기타 검증된 세대간 노출: 스트레스(코르티솔 → 정자 메틸화), 내분비 교란물질(BPA, 프탈레이트), 기근(네덜란드 기근의 겨울)",
    ],
    ddtConclusion: "EMF는 DDT가 세대간 유전을 달성하는 것과 동일한 세 가지 후성유전학적 메커니즘에 영향을 미친다. 문제는 EMF가 정자 후성유전체를 변화시킬 수 있는지(가능 — VK27)가 아니라, 그 변화가 F3까지 지속되는지 여부이다.",

    doseTitle: "용량 의존성 문제",
    doseLead: "EMF 후성유전학적 효과는 양방향적이고 용량 의존적 — 핵심적 복잡화 요인.",
    doseBody: "1 mT에서: 전반적 메틸화가 감소한다. 3 mT에서: 전반적 메틸화가 증가한다. 이는 노출 수준이 혼합된 인구 연구가 개별 반응이 유의미하더라도 효과를 평균적으로 영으로 만들 수 있음을 의미한다. 향후 연구는 기간뿐만 아니라 노출 강도를 통제해야 한다. 이 용량 의존성은 EMF 후성유전학적 효과가 역학 연구에서 감지하기 어려웠던 이유를 설명할 수 있다.",

    networkTitle: "네트워크 연결",
    networkPoints: [
      { bridge: "VK27 → VK30", detail: "HDAC 변형 → α2δ-1 발현 조절 → 만성 통증(통증 메커니즘의 후성유전학적 증폭)" },
      { bridge: "VK27 → VK6", detail: "후성유전학적 변화 → KCC2 성숙 타이밍 → GABA 스위치 지연(발달적 신경독성 경로)" },
      { bridge: "VK27 → VK28", detail: "메틸화 변화 → 텔로머라제 조절 → 노화 가속(후성유전학-노화 브리지)" },
      { bridge: "VK27 → VK26", detail: "후성유전학적 변화 → Dio2/Dio3 발현 → 갑상선 호르몬 전환(잠재성 갑상선 기능 저하증)" },
    ],

    implTitle: "함의",
    implBody: "EMF 효과가 세대간에 걸친다면, 현 세대의 EMF 노출은 자신이 결코 노출되지 않는 손자녀에게 영향을 미칠 수 있다. 이는 EMF를 개인 건강 위험에서 세대간 환경 유산으로 변환시킨다 — DDT, 납, 그리고 수십 년간 축적된 증거 이후에야 세대간적으로 인식된 다른 지속적 환경 노출과 유사하게.",

    predictionText: "예측 E-NEW-10(세대간 정자 메틸화가 F3까지 지속됨)은 BERM의 최우선 연구 제안이다. 다세대 설치류 연구(18~24개월)가 이 문제를 결정적으로 해결할 수 있다.",
    predictionLink: "최종 층 예측 보기 →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EpigeneticLegacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  const mechColors: Record<string, string> = { amber: "border-amber-500/30 bg-amber-500/5" };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Dna} title={d.title} subtitle={d.subtitle} />
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
              <p className="text-sm text-foreground-muted leading-relaxed"><InlineReferenceText text={m.detail} locale={locale} /></p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.ddtTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.ddtLead}</p>
        <div className="space-y-2 mb-4">
          {d.ddtPoints.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">→</span><p><InlineReferenceText text={p} locale={locale} /></p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.ddtConclusion}</p>
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.doseTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-2 max-w-3xl">{d.doseLead}</p>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.doseBody}</p>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.networkTitle}</h2>
        <div className="space-y-3">
          {d.networkPoints.map((n, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold font-mono mb-1">{n.bridge}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{n.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.implTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.implBody}</p>
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
