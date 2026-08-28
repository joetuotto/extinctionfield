import type { Metadata } from "next";
import Link from "next/link";
import { Ear } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Inner Ear",
    subtitle:
      "Cav1.3 calcium channels in cochlear hair cells: hearing loss, tinnitus, and Bluetooth EMF",
    backLink: "← Back to Modulome",

    /* --- SECTION 1: Cav1.3 and Inner Hair Cells --- */
    s1SectionTitle: "Cav1.3 and Inner Hair Cells",

    /* 01 Channel Profile */
    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "Cav1.3 (L-type)",
    geneVal: "CACNA1D",
    cellTypeVal: "Inner hair cells (IHCs)",
    functionVal: "Sound transduction — glutamate vesicle release at IHC synapse",
    levelVal: "M|C",

    /* 02 Sound Transduction Mechanism */
    s2Title: "Sound Transduction Mechanism",
    s2p1:
      "Inner hair cells (IHCs) are the primary sensory receptors of the cochlea. They use Cav1.3 (CACNA1D) L-type voltage-gated calcium channels to convert mechanical sound waves into electrical signals. When sound deflects the stereocilia, mechanotransduction channels open, depolarizing the IHC. This depolarization activates Cav1.3 channels at the basolateral membrane.",
    s2p2:
      "Ca²⁺ influx through Cav1.3 triggers glutamate vesicle release at the ribbon synapse between the IHC and spiral ganglion neurons. This is the primary site of sound-to-electrical signal conversion in the auditory pathway — without Cav1.3, hearing is impossible.",
    s2p3:
      "Cav1.3 channels have a unique biophysical property: they activate at relatively negative membrane potentials (~−50mV), significantly more negative than other L-type channels (Cav1.2 activates at ~−30mV). This low-voltage activation makes them exceptionally sensitive to small membrane voltage perturbations — including those induced by electromagnetic fields.",

    /* --- SECTION 2: IL-6 -> Cav1.3 Upregulation -> Hearing Loss --- */
    s2SectionTitle:
      "IL-6 → Cav1.3 Upregulation → Hearing Loss",

    /* 03 Inflammaging Mechanism */
    s3Title: "Inflammaging Mechanism",
    s3p1:
      "Aging Cell 2024 study: IL-6-dependent inflammaging upregulates Cav1.3 expression in inner hair cells. Chronic low-grade inflammation, a hallmark of aging (inflammaging), elevates circulating and local IL-6 levels. IL-6 signaling through JAK/STAT pathways increases CACNA1D transcription, resulting in higher Cav1.3 channel density on the IHC membrane.",
    s3p2:
      "Chronic Cav1.3 upregulation leads to excessive Ca²⁺ influx at the IHC ribbon synapse. The resulting calcium overload drives excitotoxic damage to spiral ganglion neurons — the same glutamate excitotoxicity mechanism seen in neurodegenerative disease. This mechanism explains why age-related hearing loss (presbycusis) accelerates in individuals with higher systemic inflammation.",

    /* 04 Tinnitus Pathway */
    s4Title: "Tinnitus Pathway",
    s4Text:
      "Chronic Ca²⁺ overload at the IHC synapse generates aberrant spontaneous neurotransmitter release. Spiral ganglion neurons receive glutamate signals in the absence of sound input, creating phantom auditory perception — tinnitus. The BERM framework identifies this as a specific instance of VGCC-mediated excitotoxicity: upregulated Cav1.3 → excessive Ca²⁺ → aberrant glutamate release → phantom sound perception.",

    /* 05 EMF-Inflammation Link */
    s5Title: "EMF-Inflammation-Hearing Cascade",
    s5Chain:
      "Chronic EMF exposure → low-grade inflammation → IL-6 ↑ → Cav1.3 ↑ → Ca²⁺ overload → accelerated hearing damage",
    s5Text:
      "The BERM framework connects EMF exposure to hearing loss through the inflammation pathway. Chronic EMF exposure induces low-grade systemic inflammation (documented across multiple studies). Elevated IL-6 upregulates Cav1.3 in IHCs (Aging Cell 2024). The resulting Ca²⁺ dysregulation accelerates both hearing loss and tinnitus onset. This pathway is synergistic with acoustic damage: EMF-induced Cav1.3 upregulation lowers the threshold for noise-induced hearing loss.",

    /* --- SECTION 3: Bluetooth/Earphone EMF Proximity --- */
    s3SectionTitle: "Bluetooth/Earphone EMF Proximity",

    /* 06 Proximity Physics */
    s6Title: "Proximity Physics",
    s6p1:
      "Bluetooth earphones emit RF electromagnetic fields directly adjacent to the cochlea, at a distance of approximately 2–5mm. The inverse-square law dictates that EMF power density is inversely proportional to the square of distance. At 3mm, the local field intensity at the cochlea from a Bluetooth earphone can exceed that from a mobile phone held at the ear (typically 10–20mm from the cochlea) — despite the earphone's significantly lower total radiated power.",
    s6p2:
      "This proximity effect is critical and often overlooked in EMF safety assessments, which focus on total radiated power (SAR) rather than local tissue-level field intensity at specific vulnerable structures.",

    /* 07 Epidemiological Context */
    s7Title: "Epidemiological Context",
    s7Stats: [
      "17.7% of young adults report bothersome tinnitus — a rising trend that parallels earphone adoption",
      "1 billion+ young people at risk of hearing loss from unsafe listening practices (WHO 2024)",
      "Average daily earphone use has increased from ~1h (2010) to ~4h (2024) in 18–25 year-olds",
      "Bluetooth earphone market penetration exceeded 80% in 15–35 age group by 2023",
    ],

    /* 08 BERM Prediction */
    s8Title: "BERM Prediction",
    s8Text:
      "The BERM framework predicts that EMF from Bluetooth earphones perturbs Cav1.3 channels in IHCs, causing Ca²⁺ dysregulation that is synergistic with acoustic damage. This generates a specific, testable prediction:",
    s8Prediction: {
      id: "HEAR-1",
      text: "Bluetooth earphone use duration correlates with subclinical hearing loss (measured by extended high-frequency audiometry or otoacoustic emissions) when controlling for volume level and noise exposure history. The effect is dose-dependent on hours of daily use and persists after adjusting for acoustic exposure.",
      discriminating: true,
    },

    /* References */
    references: "Key References",
    refs: [
      {
        id: "aging-cell-2024-cav13-hearing",
        citation: "Aging Cell 2024",
        referenceId: "aging-cell-2024-cav13-hearing",
        finding:
          "IL-6-dependent inflammaging upregulates Cav1.3 in inner hair cells, driving age-related hearing loss through excitotoxicity at the IHC–spiral ganglion neuron synapse.",
      },
      {
        id: "brain-2026-cav32-human-drg",
        citation: "Brain 2026",
        referenceId: "brain-2026-cav32-human-drg",
        finding:
          "Cav3.2 channel characterization in human DRG neurons — establishes voltage-gated calcium channel mechanisms in peripheral sensory neurons relevant to the cochlear pathway.",
      },
    ],

    /* Badges */
    discriminatingBadge: "Discriminating",
    allPredictions: "All predictions →",

    /* See also */
    seeAlso: "See also",
    brainModulome: "Brain modulome",
    predictionsPage: "Predictions — HEAR-1",
    evidencePage: "Evidence register",
  },
  fi: {
    title: "Sisäkorva",
    subtitle:
      "Cav1.3-kalsiumkanavat sisäkorvan karvasoluissa: kuulonmenetys, tinnitus ja Bluetooth-EMF",
    backLink: "← Takaisin moduloomiin",

    /* --- OSIO 1: Cav1.3 ja sisäiset karvasolut --- */
    s1SectionTitle: "Cav1.3 ja sisäiset karvasolut",

    /* 01 Kanavaprofiili */
    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    channelVal: "Cav1.3 (L-tyyppi)",
    geneVal: "CACNA1D",
    cellTypeVal: "Sisäiset karvasolut (IHC)",
    functionVal: "Äänitransduktio — glutamaattivesikkelien vapautus IHC-synapsissa",
    levelVal: "M|C",

    /* 02 Äänitransduktion mekanismi */
    s2Title: "Äänitransduktion mekanismi",
    s2p1:
      "Sisäiset karvasolut (IHC) ovat simpukan ensisijaiset sensoriset reseptorit. Ne käyttävät Cav1.3 (CACNA1D) L-tyypin jänniteohjattuja kalsiumkanavia muuntaakseen mekaaniset ääniaallot sähköisiksi signaaleiksi. Kun ääni taivuttaa stereosiliöitä, mekanotransduktiokanavat avautuvat ja depolarisoivat IHC:n. Tämä depolarisaatio aktivoi Cav1.3-kanavat basolateraalisessa kalvossa.",
    s2p2:
      "Ca²⁺-sisäänvirtaus Cav1.3:n kautta laukaisee glutamaattivesikkelien vapautuksen nauhasynapsissa IHC:n ja spiraaliganglioneuronien välillä. Tämä on kuulojohteen ensisijainen ääni–sähkösignaalin muunnoskohta — ilman Cav1.3:a kuuleminen on mahdotonta.",
    s2p3:
      "Cav1.3-kanavilla on ainutlaatuinen biofysikaalinen ominaisuus: ne aktivoituvat suhteellisen negatiivisissa kalvopotentiaaleissa (~−50mV), huomattavasti negatiivisemmassa kuin muut L-tyypin kanavat (Cav1.2 aktivoituu ~−30mV). Tämä matalan jännitteen aktivaatio tekee niistä poikkeuksellisen herkkiä pienille kalvojännitteen häiriöille — mukaan lukien sähkömagneettisten kenttien aiheuttamille.",

    /* --- OSIO 2: IL-6 -> Cav1.3 ylössäätely -> Kuulonmenetys --- */
    s2SectionTitle:
      "IL-6 → Cav1.3-ylössäätely → kuulonmenetys",

    /* 03 Inflammaging-mekanismi */
    s3Title: "Inflammaging-mekanismi",
    s3p1:
      "Aging Cell 2024 -tutkimus: IL-6-riippuvainen inflammaging ylössäätelee Cav1.3-ekspressiota sisäisissä karvasoluissa. Krooninen matala-asteinen tulehdus, ikääntymisen tunnusmerkki (inflammaging), nostaa kiertotien ja paikallisia IL-6-tasoja. IL-6-signalointi JAK/STAT-reittien kautta lisää CACNA1D-transkriptiota, mikä johtaa korkeampaan Cav1.3-kanavatiheyteen IHC-kalvolla.",
    s3p2:
      "Krooninen Cav1.3-ylössäätely johtaa liialliseen Ca²⁺-sisäänvirtaukseen IHC:n nauhasynapsissa. Tuloksena syntynyt kalsiumin ylikuormitus ajaa eksitotoksista vauriota spiraaliganglioneuroneille — sama glutamaattieksitotoksisuusmekanismi kuin neurodegeneratiivisissa sairauksissa. Tämä mekanismi selittää, miksi ikääntymiseen liittyvä kuulonmenetys (presbyakusis) kiihtyy henkilöillä, joilla on korkeampi systeeminen tulehdus.",

    /* 04 Tinnitusreitti */
    s4Title: "Tinnitusreitti",
    s4Text:
      "Krooninen Ca²⁺-ylikuormitus IHC-synapsissa tuottaa poikkeavaa spontaania välittäjäaineiden vapautusta. Spiraaliganglioneuronit vastaanottavat glutamaattisignaaleja ilman äänisyotettä, luoden haamukuulohavainnon — tinnituksen. BERM-kehys tunnistaa tämän VGCC-välitteisen eksitotoksisuuden erityistapaukena: ylössäädelty Cav1.3 → liiallinen Ca²⁺ → poikkeava glutamaattivapautus → haamuaanihavainto.",

    /* 05 EMF-tulehdusyhteys */
    s5Title: "EMF–tulehdus–kuulokaskadi",
    s5Chain:
      "Krooninen EMF-altistus → matala-asteinen tulehdus → IL-6 ↑ → Cav1.3 ↑ → Ca²⁺-ylikuormitus → kiihtynyt kuulovaurio",
    s5Text:
      "BERM-kehys yhdistää EMF-altistuksen kuulonmenetykseen tulehdusreitin kautta. Krooninen EMF-altistus indusoi matala-asteisen systeemisen tulehduksen (dokumentoitu useissa tutkimuksissa). Kohonnut IL-6 ylössäätelee Cav1.3:a IHC:issä (Aging Cell 2024). Tuloksena syntynyt Ca²⁺-dysregulaatio kiihdyttää sekä kuulonmenetystä että tinnituksen alkamista. Tämä reitti on synergistinen akustisen vaurion kanssa: EMF-indusoitu Cav1.3-ylössäätely laskee meluvauriokynnystä.",

    /* --- OSIO 3: Bluetooth/kuulokkeiden EMF-läheisyys --- */
    s3SectionTitle: "Bluetooth/kuulokkeiden EMF-läheisyys",

    /* 06 Läheisyysfysiikka */
    s6Title: "Läheisyysfysiikka",
    s6p1:
      "Bluetooth-kuulokkeet säteilevät RF-sähkömagneettisia kenttiä suoraan simpukan vieressä, noin 2–5mm etäisyydellä. Käänteisen neliölain mukaan EMF:n tehontiheys on kääntäen verrannollinen etäisyyden neliöön. 3mm etäisyydellä Bluetooth-kuulokkeen paikallinen kenttävoimakkuus simpukassa voi ylittää korvalla pidetyn matkapuhelimen kenttävoimakkuuden (tyypillisesti 10–20mm simpukasta) — huolimatta kuulokkeen huomattavasti pienemmastä kokonaissäteilytehosta.",
    s6p2:
      "Tämä läheisyysvaikutus on kriittinen ja usein jää huomiotta EMF-turvallisuusarvioinneissa, jotka keskittyvät kokonaissäteilytehoon (SAR) eivätkä paikalliseen kudostason kenttäintensiteettiin tietyissä haavoittuvissa rakenteissa.",

    /* 07 Epidemiologinen konteksti */
    s7Title: "Epidemiologinen konteksti",
    s7Stats: [
      "17,7 % nuorista aikuisista raportoi häiritsevää tinnitusta — nouseva trendi joka rinnastuu kuulokkeiden yleistymiseen",
      "Yli 1 miljardia nuorta kuulonmenetysriskissä turvattomien kuuntelukäytäntöjen vuoksi (WHO 2024)",
      "Keskimääräinen päivittäinen kuulokkeiden käyttö on kasvanut ~1h:sta (2010) ~4h:iin (2024) 18–25-vuotiailla",
      "Bluetooth-kuulokkeiden markkinapenetraatio ylitti 80 % 15–35-vuotiaiden ryhmässä vuoteen 2023 mennessä",
    ],

    /* 08 BERM-ennuste */
    s8Title: "BERM-ennuste",
    s8Text:
      "BERM-kehys ennustaa, että Bluetooth-kuulokkeiden EMF häiritsee IHC:iden Cav1.3-kanavia, aiheuttaen Ca²⁺-dysregulaatiota joka on synergistinen akustisen vaurion kanssa. Tämä tuottaa spesifisen, testattavan ennusteen:",
    s8Prediction: {
      id: "HEAR-1",
      text: "Bluetooth-kuulokkeiden käyttöaika korreloi subkliinisen kuulonmenetyksen kanssa (mitattuna laajennetulla korkeataajuusaudiometrialla tai otoakustisilla emissioilla) kun äänenvoimakkuustaso ja melualtistushistoria kontrolloidaan. Vaikutus on annosriippuvainen päivittäisistä käyttötunneista ja säilyy akustisen altistuksen vakioinnin jälkeen.",
      discriminating: true,
    },

    /* Viitteet */
    references: "Keskeiset viitteet",
    refs: [
      {
        id: "aging-cell-2024-cav13-hearing",
        citation: "Aging Cell 2024",
        referenceId: "aging-cell-2024-cav13-hearing",
        finding:
          "IL-6-riippuvainen inflammaging ylössäätelee Cav1.3:a sisäisissä karvasoluissa, ajaen ikääntymiseen liittyvää kuulonmenetystä eksitotoksisuuden kautta IHC–spiraaliganglioneuronien synapsissa.",
      },
      {
        id: "brain-2026-cav32-human-drg",
        citation: "Brain 2026",
        referenceId: "brain-2026-cav32-human-drg",
        finding:
          "Cav3.2-kanavan karakterisointi ihmisen DRG-neuroneissa — vahvistaa jänniteohjattujen kalsiumkanavien mekanismit perifeerisissä sensorisissa neuroneissa, jotka ovat relevantteja simpukan reitille.",
      },
    ],

    /* Merkit */
    discriminatingBadge: "Erotteleva",
    allPredictions: "Kaikki ennusteet →",

    /* Katso myös */
    seeAlso: "Katso myös",
    brainModulome: "Aivojen moduloomi",
    predictionsPage: "Ennusteet — HEAR-1",
    evidencePage: "Evidenssirekisteri",
  },
  ja: {
    title: "内耳",
    subtitle:
      "蝸牛有毛細胞のCav1.3カルシウムチャネル：難聴、耳鳴り、Bluetooth EMF",
    backLink: "← モジュロームに戻る",

    s1SectionTitle: "Cav1.3と内有毛細胞",

    channelProfile: "チャネルプロファイル",
    channel: "チャネル",
    gene: "遺伝子",
    cellType: "細胞種",
    function: "機能",
    level: "エビデンスレベル",
    channelVal: "Cav1.3（L型）",
    geneVal: "CACNA1D",
    cellTypeVal: "内有毛細胞（IHC）",
    functionVal: "音響変換——IHCシナプスでのグルタミン酸小胞放出",
    levelVal: "M|C",

    s2Title: "音響変換メカニズム",
    s2p1:
      "内有毛細胞（IHC）は蝸牛の主要な感覚受容体である。Cav1.3（CACNA1D）L型電位依存性カルシウムチャネルを用いて機械的音波を電気信号に変換する。音が不動毛を偏向させると、機械的変換チャネルが開口しIHCを脱分極させる。この脱分極が基底外側膜のCav1.3チャネルを活性化する。",
    s2p2:
      "Cav1.3を通じたCa²⁺流入はIHCとらせん神経節ニューロン間のリボンシナプスでグルタミン酸小胞の放出を引き起こす。これは聴覚経路における音-電気信号変換の主要部位であり——Cav1.3なくして聴覚は不可能である。",
    s2p3:
      "Cav1.3チャネルは独自の生物物理学的特性を持つ：比較的負の膜電位（約-50mV）で活性化し、他のL型チャネル（Cav1.2は約-30mVで活性化）よりも有意に負である。この低電圧活性化は、電磁場によるものを含む、小さな膜電圧変動に対して例外的に感受性が高い。",

    s2SectionTitle: "IL-6 → Cav1.3アップレギュレーション → 難聴",

    s3Title: "Inflammagingメカニズム",
    s3p1:
      "Aging Cell 2024研究：IL-6依存性inflammagingが内有毛細胞のCav1.3発現をアップレギュレートする。加齢の特徴である慢性低グレード炎症（inflammaging）が循環および局所IL-6レベルを上昇させる。JAK/STAT経路を介したIL-6シグナリングがCACNA1D転写を増加させ、IHC膜上のCav1.3チャネル密度を高める。",
    s3p2:
      "慢性Cav1.3アップレギュレーションはIHCリボンシナプスでの過剰なCa²⁺流入をもたらす。結果として生じるカルシウム過負荷がらせん神経節ニューロンへの興奮毒性損傷を引き起こす——神経変性疾患と同じグルタミン酸興奮毒性メカニズムである。このメカニズムは、全身性炎症が高い個人で加齢性難聴（老人性難聴）が加速する理由を説明する。",

    s4Title: "耳鳴り経路",
    s4Text:
      "IHCシナプスにおける慢性Ca²⁺過負荷は異常な自発的神経伝達物質放出を生じさせる。らせん神経節ニューロンは音声入力なしにグルタミン酸信号を受信し、幻聴知覚——耳鳴りを生み出す。BERMフレームワークはこれをVGCC媒介興奮毒性の特定事例として同定する：アップレギュレートされたCav1.3 → 過剰Ca²⁺ → 異常グルタミン酸放出 → 幻音知覚。",

    s5Title: "EMF-炎症-聴覚カスケード",
    s5Chain:
      "慢性EMF曝露 → 低グレード炎症 → IL-6 ↑ → Cav1.3 ↑ → Ca²⁺過負荷 → 聴覚損傷の加速",
    s5Text:
      "BERMフレームワークはEMF曝露を炎症経路を通じて難聴と結びつける。慢性EMF曝露は低グレードの全身性炎症を誘導する（複数の研究で実証済み）。上昇したIL-6はIHCのCav1.3をアップレギュレートする（Aging Cell 2024）。結果として生じるCa²⁺調節異常は難聴と耳鳴り発症の両方を加速する。この経路は音響損傷と相乗的である：EMF誘導Cav1.3アップレギュレーションは騒音性難聴の閾値を低下させる。",

    s3SectionTitle: "Bluetooth/イヤホンEMF近接性",

    s6Title: "近接物理学",
    s6p1:
      "Bluetoothイヤホンは蝸牛に直接隣接して、約2〜5mmの距離でRF電磁場を放射する。逆二乗の法則により、EMF電力密度は距離の二乗に反比例する。3mmでは、Bluetoothイヤホンからの蝸牛での局所電場強度は、耳に当てた携帯電話（通常蝸牛から10〜20mm）のそれを超える可能性がある——イヤホンの総放射電力が大幅に低いにもかかわらず。",
    s6p2:
      "この近接効果は重要であり、EMF安全性評価ではしばしば見落とされる。安全性評価は特定の脆弱構造における局所組織レベルの電場強度ではなく、総放射電力（SAR）に焦点を当てている。",

    s7Title: "疫学的背景",
    s7Stats: [
      "若年成人の17.7%が煩わしい耳鳴りを報告——イヤホン普及と並行する上昇傾向",
      "10億人以上の若者が安全でない聴取習慣による難聴リスクにさらされている（WHO 2024）",
      "18〜25歳の平均日常イヤホン使用時間は約1時間（2010年）から約4時間（2024年）に増加",
      "Bluetoothイヤホンの市場浸透率は2023年までに15〜35歳層で80%を超えた",
    ],

    s8Title: "BERM予測",
    s8Text:
      "BERMフレームワークは、BluetoothイヤホンからのEMFがIHCのCav1.3チャネルを撹乱し、音響損傷と相乗的なCa²⁺調節異常を引き起こすと予測する。これは具体的で検証可能な予測を生成する：",
    s8Prediction: {
      id: "HEAR-1",
      text: "Bluetoothイヤホン使用時間は、音量レベルと騒音曝露歴を制御した場合の潜在性難聴（拡張高周波聴力検査または耳音響放射で測定）と相関する。効果は日常使用時間に用量依存的であり、音響曝露調整後も持続する。",
      discriminating: true,
    },

    references: "主要参考文献",
    refs: [
      {
        id: "aging-cell-2024-cav13-hearing",
        citation: "Aging Cell 2024",
        referenceId: "aging-cell-2024-cav13-hearing",
        finding:
          "IL-6依存性inflammagingが内有毛細胞のCav1.3をアップレギュレートし、IHC-らせん神経節ニューロンシナプスでの興奮毒性を通じて加齢性難聴を駆動する。",
      },
      {
        id: "brain-2026-cav32-human-drg",
        citation: "Brain 2026",
        referenceId: "brain-2026-cav32-human-drg",
        finding:
          "ヒトDRGニューロンにおけるCav3.2チャネルの特性評価——蝸牛経路に関連する末梢感覚ニューロンにおける電位依存性カルシウムチャネルメカニズムを確立。",
      },
    ],

    discriminatingBadge: "識別的",
    allPredictions: "すべての予測 →",

    seeAlso: "関連ページ",
    brainModulome: "脳モジュローム",
    predictionsPage: "予測 — HEAR-1",
    evidencePage: "エビデンスレジスター",
  },
  fr: {
    title: "Oreille interne",
    subtitle:
      "Canaux calciques Cav1.3 dans les cellules ciliees cochleaires : perte auditive, acouphenes et CEM Bluetooth",
    backLink: "← Retour au modulome",

    s1SectionTitle: "Cav1.3 et cellules ciliees internes",

    channelProfile: "Profil du canal",
    channel: "Canal",
    gene: "Gene",
    cellType: "Type cellulaire",
    function: "Fonction",
    level: "Niveau de preuve",
    channelVal: "Cav1.3 (L-type)",
    geneVal: "CACNA1D",
    cellTypeVal: "Cellules ciliees internes (CCI)",
    functionVal: "Transduction sonore — liberation de vesicules de glutamate a la synapse CCI",
    levelVal: "M|C",

    s2Title: "Mecanisme de transduction sonore",
    s2p1:
      "Les cellules ciliees internes (CCI) sont les recepteurs sensoriels primaires de la cochlee. Elles utilisent les canaux calciques L-type Cav1.3 (CACNA1D) pour convertir les ondes sonores mecaniques en signaux electriques. Lorsque le son deflechit les stereocils, les canaux de mecanotransduction s'ouvrent, depolarisant la CCI. Cette depolarisation active les canaux Cav1.3 sur la membrane basolaterale.",
    s2p2:
      "L'influx de Ca²⁺ a travers Cav1.3 declenche la liberation de vesicules de glutamate a la synapse en ruban entre la CCI et les neurones du ganglion spiral. C'est le site primaire de conversion du signal sonore en signal electrique dans la voie auditive — sans Cav1.3, l'audition est impossible.",
    s2p3:
      "Les canaux Cav1.3 ont une propriete biophysique unique : ils s'activent a des potentiels de membrane relativement negatifs (~-50mV), significativement plus negatifs que les autres canaux L-type (Cav1.2 s'active a ~-30mV). Cette activation a basse tension les rend exceptionnellement sensibles aux petites perturbations de tension membranaire — y compris celles induites par les champs electromagnetiques.",

    s2SectionTitle: "IL-6 → Surexpression de Cav1.3 → Perte auditive",

    s3Title: "Mecanisme d'inflammaging",
    s3p1:
      "Etude Aging Cell 2024 : l'inflammaging dependant de l'IL-6 surexprime Cav1.3 dans les cellules ciliees internes. L'inflammation chronique de bas grade, marque du vieillissement (inflammaging), eleve les niveaux d'IL-6 circulants et locaux. La signalisation IL-6 via les voies JAK/STAT augmente la transcription de CACNA1D, entrainant une densite plus elevee de canaux Cav1.3 sur la membrane CCI.",
    s3p2:
      "La surexpression chronique de Cav1.3 entraine un influx excessif de Ca²⁺ a la synapse en ruban CCI. La surcharge calcique resultante provoque des dommages excitotoxiques aux neurones du ganglion spiral — le meme mecanisme d'excitotoxicite glutamatergique observe dans les maladies neurodegeneratives. Ce mecanisme explique pourquoi la perte auditive liee a l'age (presbyacousie) s'accelere chez les individus presentant une inflammation systemique plus elevee.",

    s4Title: "Voie des acouphenes",
    s4Text:
      "La surcharge chronique en Ca²⁺ a la synapse CCI genere une liberation aberrante spontanee de neurotransmetteurs. Les neurones du ganglion spiral recoivent des signaux glutamatergiques en l'absence d'entree sonore, creant une perception auditive fantome — les acouphenes. Le cadre BERM identifie cela comme une instance specifique d'excitotoxicite mediee par VGCC : Cav1.3 surexprime → Ca²⁺ excessif → liberation aberrante de glutamate → perception sonore fantome.",

    s5Title: "Cascade CEM-inflammation-audition",
    s5Chain:
      "Exposition chronique aux CEM → inflammation de bas grade → IL-6 ↑ → Cav1.3 ↑ → surcharge Ca²⁺ → dommage auditif accelere",
    s5Text:
      "Le cadre BERM relie l'exposition aux CEM a la perte auditive par la voie inflammatoire. L'exposition chronique aux CEM induit une inflammation systemique de bas grade (documentee dans de multiples etudes). L'IL-6 elevee surexprime Cav1.3 dans les CCI (Aging Cell 2024). La dysregulation du Ca²⁺ resultante accelere a la fois la perte auditive et l'apparition des acouphenes. Cette voie est synergique avec les dommages acoustiques : la surexpression de Cav1.3 induite par les CEM abaisse le seuil de perte auditive due au bruit.",

    s3SectionTitle: "Proximite CEM Bluetooth/ecouteurs",

    s6Title: "Physique de proximite",
    s6p1:
      "Les ecouteurs Bluetooth emettent des champs electromagnetiques RF directement adjacents a la cochlee, a une distance d'environ 2–5mm. La loi de l'inverse du carre dicte que la densite de puissance CEM est inversement proportionnelle au carre de la distance. A 3mm, l'intensite locale du champ a la cochlee provenant d'un ecouteur Bluetooth peut depasser celle d'un telephone portable tenu a l'oreille (typiquement 10–20mm de la cochlee) — malgre la puissance rayonnee totale significativement plus faible de l'ecouteur.",
    s6p2:
      "Cet effet de proximite est critique et souvent neglige dans les evaluations de securite CEM, qui se concentrent sur la puissance rayonnee totale (DAS) plutot que sur l'intensite du champ au niveau tissulaire local dans des structures vulnerables specifiques.",

    s7Title: "Contexte epidemiologique",
    s7Stats: [
      "17,7 % des jeunes adultes rapportent des acouphenes genants — une tendance a la hausse parallele a l'adoption des ecouteurs",
      "Plus d'1 milliard de jeunes a risque de perte auditive due a des pratiques d'ecoute non securitaires (OMS 2024)",
      "L'utilisation quotidienne moyenne des ecouteurs est passee de ~1h (2010) a ~4h (2024) chez les 18–25 ans",
      "La penetration du marche des ecouteurs Bluetooth a depasse 80 % dans le groupe des 15–35 ans d'ici 2023",
    ],

    s8Title: "Prediction BERM",
    s8Text:
      "Le cadre BERM predit que les CEM des ecouteurs Bluetooth perturbent les canaux Cav1.3 des CCI, causant une dysregulation du Ca²⁺ synergique avec les dommages acoustiques. Cela genere une prediction specifique et testable :",
    s8Prediction: {
      id: "HEAR-1",
      text: "La duree d'utilisation des ecouteurs Bluetooth est correlee a une perte auditive infraclinique (mesuree par audiometrie haute frequence etendue ou emissions otoacoustiques) en controlant le niveau de volume et l'historique d'exposition au bruit. L'effet est dose-dependant des heures d'utilisation quotidienne et persiste apres ajustement pour l'exposition acoustique.",
      discriminating: true,
    },

    references: "References cles",
    refs: [
      {
        id: "aging-cell-2024-cav13-hearing",
        citation: "Aging Cell 2024",
        referenceId: "aging-cell-2024-cav13-hearing",
        finding:
          "L'inflammaging dependant de l'IL-6 surexprime Cav1.3 dans les cellules ciliees internes, entrainant une perte auditive liee a l'age par excitotoxicite a la synapse CCI–neurone du ganglion spiral.",
      },
      {
        id: "brain-2026-cav32-human-drg",
        citation: "Brain 2026",
        referenceId: "brain-2026-cav32-human-drg",
        finding:
          "Caracterisation du canal Cav3.2 dans les neurones DRG humains — etablit les mecanismes des canaux calciques voltage-dependants dans les neurones sensoriels peripheriques pertinents pour la voie cochleaire.",
      },
    ],

    discriminatingBadge: "Discriminant",
    allPredictions: "Toutes les predictions →",

    seeAlso: "Voir aussi",
    brainModulome: "Modulome cerebral",
    predictionsPage: "Predictions — HEAR-1",
    evidencePage: "Registre des preuves",
  },
  ko: {
    title: "내이",
    subtitle:
      "와우 유모세포의 Cav1.3 칼슘 채널: 난청, 이명, Bluetooth EMF",
    backLink: "← 모듈롬으로 돌아가기",

    s1SectionTitle: "Cav1.3과 내유모세포",

    channelProfile: "채널 프로파일",
    channel: "채널",
    gene: "유전자",
    cellType: "세포 유형",
    function: "기능",
    level: "근거 수준",
    channelVal: "Cav1.3 (L형)",
    geneVal: "CACNA1D",
    cellTypeVal: "내유모세포 (IHC)",
    functionVal: "음향 변환 — IHC 시냅스에서 글루타메이트 소포 방출",
    levelVal: "M|C",

    s2Title: "음향 변환 메커니즘",
    s2p1:
      "내유모세포(IHC)는 와우의 주요 감각 수용체이다. Cav1.3(CACNA1D) L형 전압 의존 칼슘 채널을 사용하여 기계적 음파를 전기 신호로 변환한다. 소리가 부동섬모를 편향시키면 기계적 변환 채널이 열리고 IHC를 탈분극시킨다. 이 탈분극이 기저외측 막의 Cav1.3 채널을 활성화한다.",
    s2p2:
      "Cav1.3을 통한 Ca²⁺ 유입은 IHC와 나선 신경절 뉴런 사이의 리본 시냅스에서 글루타메이트 소포 방출을 유발한다. 이것은 청각 경로에서 음향-전기 신호 변환의 주요 부위이며 — Cav1.3 없이는 청각이 불가능하다.",
    s2p3:
      "Cav1.3 채널은 독특한 생물물리학적 특성을 가진다: 비교적 음의 막전위(약 -50mV)에서 활성화되며, 다른 L형 채널(Cav1.2는 약 -30mV에서 활성화)보다 현저히 더 음이다. 이 저전압 활성화는 전자기장에 의한 것을 포함하여 작은 막전압 교란에 대해 예외적으로 감수성이 높다.",

    s2SectionTitle: "IL-6 → Cav1.3 상향조절 → 난청",

    s3Title: "Inflammaging 메커니즘",
    s3p1:
      "Aging Cell 2024 연구: IL-6 의존성 inflammaging이 내유모세포의 Cav1.3 발현을 상향조절한다. 노화의 특징인 만성 저등급 염증(inflammaging)이 순환 및 국소 IL-6 수준을 상승시킨다. JAK/STAT 경로를 통한 IL-6 신호전달이 CACNA1D 전사를 증가시켜 IHC 막의 Cav1.3 채널 밀도를 높인다.",
    s3p2:
      "만성 Cav1.3 상향조절은 IHC 리본 시냅스에서 과도한 Ca²⁺ 유입을 초래한다. 결과적 칼슘 과부하는 나선 신경절 뉴런에 대한 흥분독성 손상을 유발한다 — 신경퇴행성 질환에서 보이는 것과 동일한 글루타메이트 흥분독성 메커니즘이다. 이 메커니즘은 전신 염증이 높은 개인에서 노화 관련 난청(노인성 난청)이 가속화되는 이유를 설명한다.",

    s4Title: "이명 경로",
    s4Text:
      "IHC 시냅스에서의 만성 Ca²⁺ 과부하는 비정상적 자발적 신경전달물질 방출을 생성한다. 나선 신경절 뉴런은 음향 입력 없이 글루타메이트 신호를 수신하여 환청각 — 이명을 만든다. BERM 프레임워크는 이것을 VGCC 매개 흥분독성의 특정 사례로 식별한다: 상향조절된 Cav1.3 → 과도한 Ca²⁺ → 비정상 글루타메이트 방출 → 환음 지각.",

    s5Title: "EMF-염증-청각 캐스케이드",
    s5Chain:
      "만성 EMF 노출 → 저등급 염증 → IL-6 ↑ → Cav1.3 ↑ → Ca²⁺ 과부하 → 청각 손상 가속",
    s5Text:
      "BERM 프레임워크는 EMF 노출을 염증 경로를 통해 난청과 연결한다. 만성 EMF 노출은 저등급 전신 염증을 유도한다(다수 연구에서 문서화). 상승된 IL-6는 IHC의 Cav1.3을 상향조절한다(Aging Cell 2024). 결과적 Ca²⁺ 조절이상은 난청과 이명 발병 모두를 가속화한다. 이 경로는 음향 손상과 상승적이다: EMF 유도 Cav1.3 상향조절이 소음성 난청의 역치를 낮춘다.",

    s3SectionTitle: "Bluetooth/이어폰 EMF 근접성",

    s6Title: "근접 물리학",
    s6p1:
      "Bluetooth 이어폰은 와우에 직접 인접하여 약 2~5mm 거리에서 RF 전자기장을 방출한다. 역제곱 법칙에 따라 EMF 전력 밀도는 거리의 제곱에 반비례한다. 3mm에서 Bluetooth 이어폰으로부터 와우에서의 국소 전장 강도는 귀에 대고 있는 휴대전화(일반적으로 와우에서 10~20mm)의 것을 초과할 수 있다 — 이어폰의 총 방사 전력이 현저히 낮음에도 불구하고.",
    s6p2:
      "이 근접 효과는 중요하며 EMF 안전성 평가에서 종종 간과된다. 안전성 평가는 특정 취약 구조에서의 국소 조직 수준 전장 강도가 아닌 총 방사 전력(SAR)에 초점을 맞추고 있다.",

    s7Title: "역학적 배경",
    s7Stats: [
      "젊은 성인의 17.7%가 성가신 이명을 보고 — 이어폰 보급과 병행하는 상승 추세",
      "10억 명 이상의 젊은이가 안전하지 않은 청취 관행으로 난청 위험에 처해 있음(WHO 2024)",
      "18~25세의 일일 평균 이어폰 사용 시간이 약 1시간(2010년)에서 약 4시간(2024년)으로 증가",
      "Bluetooth 이어폰 시장 침투율이 2023년까지 15~35세 그룹에서 80%를 초과",
    ],

    s8Title: "BERM 예측",
    s8Text:
      "BERM 프레임워크는 Bluetooth 이어폰의 EMF가 IHC의 Cav1.3 채널을 교란하여 음향 손상과 상승적인 Ca²⁺ 조절이상을 유발한다고 예측한다. 이는 구체적이고 검증 가능한 예측을 생성한다:",
    s8Prediction: {
      id: "HEAR-1",
      text: "Bluetooth 이어폰 사용 시간은 음량 수준과 소음 노출 이력을 통제했을 때 잠재성 난청(확장 고주파 청력 검사 또는 이음향 방사로 측정)과 상관한다. 효과는 일일 사용 시간에 용량 의존적이며 음향 노출 보정 후에도 지속된다.",
      discriminating: true,
    },

    references: "주요 참고문헌",
    refs: [
      {
        id: "aging-cell-2024-cav13-hearing",
        citation: "Aging Cell 2024",
        referenceId: "aging-cell-2024-cav13-hearing",
        finding:
          "IL-6 의존성 inflammaging이 내유모세포의 Cav1.3을 상향조절하여 IHC-나선 신경절 뉴런 시냅스에서 흥분독성을 통해 노화 관련 난청을 유발한다.",
      },
      {
        id: "brain-2026-cav32-human-drg",
        citation: "Brain 2026",
        referenceId: "brain-2026-cav32-human-drg",
        finding:
          "인간 DRG 뉴런에서 Cav3.2 채널 특성화 — 와우 경로와 관련된 말초 감각 뉴런에서 전압 의존 칼슘 채널 메커니즘을 확립.",
      },
    ],

    discriminatingBadge: "식별적",
    allPredictions: "모든 예측 →",

    seeAlso: "관련 페이지",
    brainModulome: "뇌 모듈롬",
    predictionsPage: "예측 — HEAR-1",
    evidencePage: "근거 레지스터",
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

export default async function EarPage({
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

      <PageHeader icon={Ear} title={d.title} subtitle={d.subtitle} />

      {/* ===============================================
          SECTION 1 -- Cav1.3 and Inner Hair Cells
          =============================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s1SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 01 -- Channel Profile */}
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

      {/* 02 -- Sound Transduction Mechanism */}
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

      {/* ===============================================
          SECTION 2 -- IL-6 -> Cav1.3 -> Hearing Loss
          =============================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 03 -- Inflammaging Mechanism */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s3p1}
          </p>
          <p>{d.s3p2}</p>
        </div>
      </section>

      {/* 04 -- Tinnitus Pathway */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>
        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s4Text}
          </p>
        </div>
      </section>

      {/* 05 -- EMF-Inflammation-Hearing Cascade */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s5Chain}
          </p>
        </div>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s5Text}
        </p>
      </section>

      {/* ===============================================
          SECTION 3 -- Bluetooth/Earphone EMF Proximity
          =============================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 06 -- Proximity Physics */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s6p1}
          </p>
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s6p2}
            </p>
          </div>
        </div>
      </section>

      {/* 07 -- Epidemiological Context */}
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

      {/* 08 -- BERM Prediction */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">08</span>
          {d.s8Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s8Text}
        </p>

        <div className="border-l-4 border-green-500 rounded-r-lg bg-card p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="font-mono-num text-xs font-bold text-accent">
              {d.s8Prediction.id}
            </span>
            {d.s8Prediction.discriminating && (
              <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                {d.discriminatingBadge}
              </span>
            )}
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s8Prediction.text}
          </p>
          <Link
            href={`/${locale}/predictions`}
            className="text-xs text-accent hover:underline mt-2 inline-block"
          >
            {d.allPredictions}
          </Link>
        </div>
      </section>

      {/* References */}
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

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
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
