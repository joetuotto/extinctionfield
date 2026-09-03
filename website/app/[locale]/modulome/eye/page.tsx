import type { Metadata } from "next";
import Link from "next/link";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";
import { StudyCitation } from "@/components/StudyCitation";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Your Eyes Are Electromagnetic Sensors",
    subtitle:
      "CRY1 in blue cone outer segments, CRY2 in retinal ganglion cells, FAD chromophore — the eye as a dual magnetoreceptive organ",
    backLink: "← Back to Modulome",

    /* 01 Hero + Anatomy */
    s1Title: "Anatomy of Retinal Magnetoreception",
    s1p1:
      "The human retina contains two distinct cryptochrome systems. [[ref:bartolke2025|Bartolke et al. (2025, FASEB Journal)]] demonstrated that full-length CRY1 protein localizes exclusively to the outer segments of short-wavelength-sensitive blue cone photoreceptors in human, bonobo, and gorilla retinas. This placement far from nuclei suggests a non-circadian, phototransductive function. The stacked membrane lamellae of cone outer segments provide the structural order required for oriented radical pair magnetoreception.",
    s1p2:
      "CRY2 operates in retinal ganglion cells as part of the circadian light input pathway to the suprachiasmatic nucleus (SCN). [[ref:yap2025|Yap et al. (2025, Cells)]] showed that CRY2 physically interacts with TRPC1, forming a complex that co-translocates to the nucleus after pulsed electromagnetic field exposure. The FAD chromophore is required for both systems: without FAD, CRY proteins are unstable and magnetically insensitive.",
    s1p3:
      "This dual CRY architecture means the eye operates two parallel electromagnetic sensing channels: CRY1 in blue cones for directional magnetoreception, and CRY2 in ganglion cells for circadian-magnetic integration.",

    /* 02 Channel Profile */
    s2Title: "Channel Profile",
    s2Channels: [
      {
        name: "CRY1 (blue cone outer segments)",
        function: "Sensory magnetoreception",
        mechanism: "Radical pair mechanism (RPM) in stacked membrane lamellae",
        evidence: "Bartolke 2025 (FASEB J) — C-terminal antibody, human/bonobo/gorilla",
        referenceId: "bartolke2025",
      },
      {
        name: "CRY2 (retinal ganglion cells)",
        function: "Circadian-magnetic integration",
        mechanism: "Forms physical complex with TRPC1 ([[ref:yap2025|Yap 2025]]), co-translocates to nucleus",
        evidence: "Yap 2025 (Cells) — CRY2-TRPC1 interaction, FAD-dependent",
        referenceId: "yap2025",
      },
      {
        name: "FAD chromophore",
        function: "Radical pair substrate for both CRY systems",
        mechanism: "Blue light excites FAD → FADH• semiquinone → magnetically sensitive radical pair",
        evidence: "Hirano 2017 (Cell Reports) — B2 depletion → CRY degradation",
        referenceId: "hirano2017",
      },
    ],
    s2Convergence:
      "Dual-band convergence: optical blue light (∼450 nm) activates the CRY photocycle, while RF/ELF electromagnetic fields modulate the radical pair spin dynamics. Both channels converge on the same FAD-dependent radical pair intermediate.",

    /* 03 Mechanism Chain */
    s3Title: "Mechanism Chain",
    s3Chain:
      "Blue light → CRY → FAD• radical pair → RPM spin dynamics → circadian disruption → melatonin ↓ → HPG axis ↓",
    s3Iris:
      "Iris pigmentation modulates the entire chain at its entry point. Blue eyes transmit approximately 100× more blue light to the retina than brown eyes ([[ref:higuchi2007|Higuchi 2007]]: 89% vs 73% melatonin suppression under identical 1000 lux exposure). This is not a small effect — it is a nearly 2-fold difference in the gain of the entire downstream cascade.",
    s3Green:
      "Green eyes occupy a unique position: their lipochrome pigment acts as a bandpass filter transmitting the 450–570 nm CRY operational band while reducing UV and extreme blue that cause over-reduction of the semiquinone ([[ref:niessner2014|Niessner 2014]]). This may optimize CRY stability over CRY activation — favoring circadian robustness over raw magnetoreceptive sensitivity.",

    /* 04 Evidence */
    s4Title: "Key Evidence",
    s4Studies: [
      {
        citation: "Bartolke et al. (FASEB J)",
        year: 2025, referenceId: "bartolke2025",
        finding: "Full-length CRY1 in human blue cone outer segments. C-terminal antibody distinguishes full-length from truncated forms. QuantumBirds consortium.",
        level: "E",
      },
      {
        citation: "Chae et al. (PLOS ONE)",
        year: 2019, referenceId: "chae2019",
        finding: "Starved men (n=20) oriented toward geomagnetic food direction (P<0.001). Effect required blue light (<500 nm). Women (n=21) showed no significant orientation.",
        level: "M|C",
      },
      {
        citation: "Higuchi et al. (Am J Physiol)",
        year: 2007, referenceId: "higuchi2007",
        finding: "Light-eyed Caucasians: 89% melatonin suppression vs 73% for dark-eyed Asians under identical 1000 lux, 2h exposure. Iris pigmentation modulates non-visual pathway.",
        level: "M|C",
      },
      {
        citation: "Ritz et al. (Nature)",
        year: 2004, referenceId: "ritz2004",
        finding: "RF magnetic field (1.315 MHz, 470 nT) disrupted magnetic compass orientation in European robins. First evidence that biological magnetoreception uses radical pair mechanism.",
        level: "E",
      },
      {
        citation: "Yap et al. (Cells)",
        year: 2025, referenceId: "yap2025",
        finding: "CRY2-TRPC1 physical complex. FAD depletion (RFK silencing) abolished both PEMF responsiveness and magnetic directional selectivity. Dark growth had same effect.",
        level: "E",
      },
      {
        citation: "Niessner et al. (J Exp Biol)",
        year: 2014, referenceId: "niessner2014",
        finding: "CRY photocycle: oxidized absorbs UV/blue (≤500 nm), semiquinone additionally absorbs green (≤570 nm). Green light maintains but cannot initiate CRY activation.",
        level: "E",
      },
    ],

    /* 05 Lindgren Analysis */
    s5Title: "BERM candidate susceptibility analysis — L2 open",
    s5p1:
      "BERM proposes six candidate criteria for ocular EMF sensitivity and a χ_eye closure with three moderators. These are testable biological propositions beyond the open L2 bridge, not criteria derived by Lindgren:",
    s5Criteria: [
      "Iris pigmentation — modulates photon flux to CRY (blue ≈ 100×, green ≈ 30×, brown ≈ 1×)",
      "FAD/B2 nutritional status — determines CRY protein stability and radical pair formation capacity",
      "Ambient light spectrum — blue content determines CRY activation state; darkness = magnetically blind",
    ],
    s5p2:
      "χ_eye = f(iris_pigmentation, FAD_status, I_blue). A blue-eyed, B2-replete individual under blue-rich lighting has maximum χ_eye. A brown-eyed, B2-deficient individual in darkness has minimum χ_eye. This is why EMF-eye studies produce inconsistent results: they do not control for the three dominant modulators.",

    /* 06 Myopia */
    s6Title: "Myopia: Three-Channel Convergence",
    s6Lead:
      "Myopia prevalence has risen dramatically in technology-adopting populations. The BERM model identifies three independent EMF-mediated channels that converge on scleral elongation — the structural cause of myopia.",
    s6Channels: [
      {
        name: "Channel 1 — DA/VGCC",
        chain: "EMF → VGCC in dopaminergic amacrine cells → dopamine release disrupted → scleral elongation brake weakened",
        detail: "Dopamine is the primary signal that stops the eye from growing too long. Without sufficient DA signaling, the axial length increases → myopia.",
      },
      {
        name: "Channel 2 — CRY/Melatonin",
        chain: "EMF → CRY disruption → melatonin suppression → circadian ocular growth dysregulated",
        detail: "The eye has its own circadian growth rhythm — it grows during the day and shrinks at night. Melatonin is critical for this cycle. Disrupted melatonin → unregulated growth → elongation.",
      },
      {
        name: "Channel 3 — Smooth Muscle/Cav",
        chain: "Ciliary smooth muscle Cav channels → accommodation (focusing)",
        detail: "Chronic Cav perturbation → accommodative dysfunction → refractive error.",
      },
    ],
    s6Prevalence:
      "Myopia prevalence gradient: Rural Africa 1–11%, Latin America 1–14%, Europe 17–36%, USA ~50%, East Asia 80–95%. This tracks technology adoption, not genetics — East Asian children raised in less urbanized settings have lower myopia rates.",
    s6Covid:
      "COVID-19 lockdowns → increased screen time → 1.5–3× increase in childhood myopia progression (meta-analyses). This natural experiment confirms screen/near-work exposure as a proximal driver, consistent with the three-channel model.",
    s6CascadeRef:
      "Disease cascade #9 in the model page describes this three-channel convergence mechanism.",

    /* 07 Predictions */
    s7Title: "Predictions",
    s7Predictions: [
      {
        id: "EYE-1",
        text: "Blue-eyed men outperform green-eyed men in geomagnetic orientation tasks under identical blue light conditions (replicate [[ref:chae2019|Chae 2019]] with eye color grouping).",
        discriminating: true,
      },
      {
        id: "EYE-2",
        text: "Green-eyed women show more stable 24h melatonin profiles than blue-eyed women (lower CV in melatonin rhythm amplitude).",
        discriminating: true,
      },
      {
        id: "EYE-3",
        text: "B2 supplementation (25 mg/day) improves circadian resilience to nighttime EMF in subjects with high screen use and poor sleep quality.",
        discriminating: true,
      },
    ],

    discriminatingBadge: "Discriminating",
    allPredictions: "All predictions →",

    seeAlso: "See also",
    modulomeOverview: "Modulome overview",
    evidencePortal: "Evidence register",
    citationLabel: "Citation",
    yearLabel: "Year",
    findingLabel: "Finding",
    levelLabel: "Level",
    channelLabel: "Channel",
    functionLabel: "Function",
    mechanismLabel: "Mechanism",
    evidenceLabel: "Evidence",
  },
  fi: {
    title: "Silmäsi ovat sähkömagneettisia sensoreita",
    subtitle:
      "CRY1 sinisten tappisolujen ulkosegmenteissa, CRY2 verkkokalvon gangliosoluissa, FAD-kromofori — silmä kaksoismagneettireseptiivisenä elimenä",
    backLink: "← Takaisin moduloomiin",

    s1Title: "Verkkokalvon magnetoreseption anatomia",
    s1p1:
      "Ihmisen verkkokalvo sisältää kaksi erillistä kryptokromijärjestelmää. [[ref:bartolke2025|Bartolke ym. (2025, FASEB Journal)]] osoittivat, että täyspitkää CRY1-proteiinia esiintyy yksinomaan lyhytaaltoherkissä sinisten tappisolujen ulkosegmenteissa ihmisen, bonobon ja gorillan verkkokalvoilla. Tämä sijainti kaukana tumista viittaa ei-sirkadiaaniseen, fototransduktiiviseen toimintaan. Tappisolujen ulkosegmenttien pinotut kalvolamellit tarjoavat orientoituneelle radikaaliparin magnetoreseptiolle tarvittavan rakenteellisen järjestyksen.",
    s1p2:
      "CRY2 toimii verkkokalvon gangliosoluissa osana sirkadiaanista valosyötereittiä suprakiasmaattiseen tumakkeeseen (SCN). [[ref:yap2025|Yap ym. (2025, Cells)]] osoittivat, että CRY2 muodostaa fyysisen interaktion TRPC1:n kanssa, ja kompleksi siirtyy yhdessä tumaan pulssisähkömagneettisen kentän altistuksen jälkeen. FAD-kromofori vaaditaan molemmissa järjestelmissä: ilman FAD:ta CRY-proteiinit ovat epästabiileja ja magneettisesti epäherkkiä.",
    s1p3:
      "Tämä kaksoiskryptokromiarkkitehtuuri tarkoittaa, että silmä käyttää kahta rinnakkaista sähkömagneettista aistikanavaa: CRY1 sinisissä tapeissa suuntakohtaiseen magnetoreseptioon ja CRY2 gangliosoluissa sirkadiaaniseen magneettiseen integraatioon.",

    s2Title: "Kanavaprofiili",
    s2Channels: [
      {
        name: "CRY1 (sinisten tappisolujen ulkosegmentit)",
        function: "Sensorinen magnetoreseptio",
        mechanism: "Radikaaliparin mekanismi (RPM) pinotuissa kalvolamelleissa",
        evidence: "Bartolke 2025 (FASEB J) — C-terminaalivasta-aine, ihminen/bonobo/gorilla",
        referenceId: "bartolke2025",
      },
      {
        name: "CRY2 (verkkokalvon gangliosolut)",
        function: "Sirkadiaaninen magneettinen integraatio",
        mechanism: "Muodostaa fyysisen kompleksin TRPC1:n kanssa ([[ref:yap2025|Yap 2025]]), siirtyy tumaan",
        evidence: "Yap 2025 (Cells) — CRY2-TRPC1-interaktio, FAD-riippuvainen",
        referenceId: "yap2025",
      },
      {
        name: "FAD-kromofori",
        function: "Radikaaliparin substraatti molemmille CRY-järjestelmille",
        mechanism: "Sininen valo virittaa FAD:n → FADH•-semikinoni → magneettisesti herkka radikaalipari",
        evidence: "Hirano 2017 (Cell Reports) — B2-puutos → CRY-degradaatio",
        referenceId: "hirano2017",
      },
    ],
    s2Convergence:
      "Kaksikaistakohdennus: optinen sininen valo (∼450 nm) aktivoi CRY-fotosyklin, kun taas RF/ELF-sähkömagneettiset kentät säätelevät radikaaliparin spindynamiikkaa. Molemmat kanavat yhtyvät samaan FAD-riippuvaiseen radikaaliparin valitilaan.",

    s3Title: "Mekanismiketju",
    s3Chain:
      "Sininen valo → CRY → FAD•-radikaalipari → RPM-spindynamiikka → sirkadiaaninen häiriö → melatoniini ↓ → HPG-akseli ↓",
    s3Iris:
      "Iiriksen pigmentaatio säätelee koko ketjun syöttöpisteessä. Siniset silmat päästävät noin 100× enemmän sinista valoa verkkokalvolle kuin ruskeat silmat ([[ref:higuchi2007|Higuchi 2007]]: 89 % vs 73 % melatoniinivaimennus identtisessa 1000 luksin altistuksessa). Tämä ei ole pieni efekti — se on lähes kaksinkertainen ero koko alavirran kaskadin vahvistuksessa.",
    s3Green:
      "Vihreät silmät ovat ainutlaatuisessa asemassa: niiden lipokromipigmentti toimii kaistanpäästösuodattimena, joka päästää 450–570 nm CRY:n toimintakaistan samalla vähentäen UV:ta ja äärimmäistä sinista, joka aiheuttaa semikinoni yliredusointia ([[ref:niessner2014|Niessner 2014]]). Tämä voi optimoida CRY-stabiilisuuden CRY-aktivaation sijaan — suosien sirkadiaanista robustisuutta raa'an magnetoreseptiivisen herkkyyden sijaan.",

    s4Title: "Keskeinen näyttö",
    s4Studies: [
      {
        citation: "Bartolke ym. (FASEB J)",
        year: 2025, referenceId: "bartolke2025",
        finding: "Täyspitkää CRY1 ihmisen sinisten tappisolujen ulkosegmenteissa. C-terminaalivasta-aine erottaa täyspitkään katkaistusta. QuantumBirds-konsortio.",
        level: "E",
      },
      {
        citation: "Chae ym. (PLOS ONE)",
        year: 2019, referenceId: "chae2019",
        finding: "Nälkiintyneet miehet (n=20) orientoituivat kohti geomagneettista ruokasuuntaa (P<0,001). Vaikutus vaati sinista valoa (<500 nm). Naiset (n=21) eivät osoittaneet merkitsevaa orientaatiota.",
        level: "M|C",
      },
      {
        citation: "Higuchi ym. (Am J Physiol)",
        year: 2007, referenceId: "higuchi2007",
        finding: "Vaalesilmäiset kaukaasialaiset: 89 % melatoniinivaimennus vs 73 % tummasilmäisillä aasialaisilla identtisessa 1000 luksin 2h altistuksessa.",
        level: "M|C",
      },
      {
        citation: "Ritz ym. (Nature)",
        year: 2004, referenceId: "ritz2004",
        finding: "RF-magneettikenttä (1,315 MHz, 470 nT) häiritsi punarintojen magneettista kompassiorientaatiota. Ensimmäinen näyttö radikaaliparin mekanismista.",
        level: "E",
      },
      {
        citation: "Yap ym. (Cells)",
        year: 2025, referenceId: "yap2025",
        finding: "CRY2-TRPC1-fyysinen kompleksi. FAD-puutos (RFK-hiljennys) kumosi sekä PEMF-vasteen että magneettisen suuntaerottelun. Pimea tuotti saman vaikutuksen.",
        level: "E",
      },
      {
        citation: "Niessner ym. (J Exp Biol)",
        year: 2014, referenceId: "niessner2014",
        finding: "CRY-fotosykli: hapettunut absorboi UV/sinista (≤500 nm), semikinoni lisäksi vihreää (≤570 nm). Vihreä valo ylläpitää mutta ei voi käynnistää CRY-aktivaatiota.",
        level: "E",
      },
    ],

    s5Title: "BERM:n herkkyyden ehdokasanalyysi — L2 avoin",
    s5p1:
      "BERM ehdottaa kuutta silmän EMF-herkkyyden ehdokaskriteeriä ja kolmen moderaattorin χ_eye-sulkeumaa. Ne ovat avoimen L2-sillan jälkeisiä testattavia biologisia propositioita, eivät Lindgrenin johtamia kriteerejä:",
    s5Criteria: [
      "Iiriksen pigmentaatio — säätelee fotonivuota CRY:lle (sininen ≈ 100×, vihreä ≈ 30×, ruskea ≈ 1×)",
      "FAD/B2-ravitsemustila — määrää CRY-proteiinin stabiilisuuden ja radikaaliparin muodostuskyvyn",
      "Ympäristön valospektri — sininen sisältö määrää CRY:n aktivaatiotilan; pimeys = magneettisesti sokea",
    ],
    s5p2:
      "χ_eye = f(iiris_pigmentaatio, FAD_tila, I_sininen). Sinisilmainen, B2-rikas henkilö sinisessä valossa omaa maksimaalisen χ_eye:n. Ruskesilmäinen, B2-puutteinen henkilö pimeässä omaa minimaalisen χ_eye:n. Tämä selittää, miksi EMF-silmätutkimukset tuottavat ristiriitaisia tuloksia: ne eivät kontrolloi kolmea dominoivaa modulaattoria.",

    s6Title: "Likitaitteisuus: Kolmen kanavan yhdentyminen",
    s6Lead:
      "Likitaitteisuuden esiintyvyys on noussut dramaattisesti teknologiaa omaksuvissa väestöissä. BERM-malli tunnistaa kolme riippumatonta EMF-valitteista kanavaa, jotka yhtyvät skleraalisen elongaation — likitaitteisuuden rakenteellisen syyn — suuntaan.",
    s6Channels: [
      {
        name: "Kanava 1 — DA/VGCC",
        chain: "EMF → VGCC dopamiiniergisissa amakriinisoluissa → dopamiinin vapautuminen häiriytyy → skleraalisen elongaation jarru heikkenee",
        detail: "Dopamiini on ensisijainen signaali, joka estää silmää kasvamasta liian pitkäksi. Ilman riittavaa DA-signalointia aksiaalinen pituus kasvaa → likitaitteisuus.",
      },
      {
        name: "Kanava 2 — CRY/Melatoniini",
        chain: "EMF → CRY-häiriö → melatoniinivaimennus → silmän sirkadiaaninen kasvurytmi häiriytyy",
        detail: "Silmalla on oma sirkadiaaninen kasvurytminsä — se kasvaa päivällä ja kutistuu yöllä. Melatoniini on kriittinen talle syklille. Häiriöitynyt melatoniini → säätelemätön kasvu → elongaatio.",
      },
      {
        name: "Kanava 3 — Silea lihas/Cav",
        chain: "Siliaarisen silean lihaksen Cav-kanavat → akkommodaatio (tarkennus)",
        detail: "Krooninen Cav-häiriö → akkommodaatiodisfunktio → taittovirhe.",
      },
    ],
    s6Prevalence:
      "Likitaitteisuuden esiintyvyysgradientti: maaseutu-Afrikka 1–11 %, Latinalainen Amerikka 1–14 %, Eurooppa 17–36 %, USA ~50 %, Ita-Aasia 80–95 %. Tämä seuraa teknologian omaksumista, ei genetiikkaa — Ita-Aasiassa vähemmän kaupungistuneissa ympäristöissä kasvaneiden lasten likitaitteisuus on matalampi.",
    s6Covid:
      "COVID-19-sulkutoimet → lisääntynyt ruutuaika → 1,5–3-kertainen lisays lasten likitaitteisuuden etenemisessa (meta-analyysit). Tämä luonnollinen koe vahvistaa ruutu- ja lahityoaltistuksen proksimaalisena ajurina, yhteensopivasti kolmen kanavan mallin kanssa.",
    s6CascadeRef:
      "Mallisivun sairauskaskadi #9 kuvaa taman kolmen kanavan yhdentymismekanismin.",

    s7Title: "Ennusteet",
    s7Predictions: [
      {
        id: "EYE-1",
        text: "Sinisilmäiset miehet suoriutuvat vihreasilmaisia paremmin geomagneettisissa orientaatiotehtävissä identtisissa sinisen valon olosuhteissa (toista [[ref:chae2019|Chae 2019]] silmänvariryhmittelylla).",
        discriminating: true,
      },
      {
        id: "EYE-2",
        text: "Vihreasilmaisilla naisilla on vakaampi 24h melatoniiniprofiili kuin sinisilmäisillä (pienempi CV melatoniinirytmin amplitudissa).",
        discriminating: true,
      },
      {
        id: "EYE-3",
        text: "B2-lisa (25 mg/pv) parantaa sirkadiaanista resilienssia yölliselle EMF-altistukselle henkiloilla joilla on runsas ruutuaika ja huono unenlaatu.",
        discriminating: true,
      },
    ],

    discriminatingBadge: "Erotteleva",
    allPredictions: "Kaikki ennusteet →",

    seeAlso: "Katso myös",
    modulomeOverview: "Moduloomin yleiskatsaus",
    evidencePortal: "Näyttörekisteri",
    citationLabel: "Viite",
    yearLabel: "Vuosi",
    findingLabel: "Löydös",
    levelLabel: "Taso",
    channelLabel: "Kanava",
    functionLabel: "Toiminto",
    mechanismLabel: "Mekanismi",
    evidenceLabel: "Näyttö",
  },
  ja: {
    title: "あなたの眼は電磁センサーである",
    subtitle:
      "青錐体外節のCRY1、網膜神経節細胞のCRY2、FADクロモフォア——二重磁気受容器官としての眼",
    backLink: "← モジュロームに戻る",

    s1Title: "網膜磁気受容の解剖学",
    s1p1:
      "ヒトの網膜には2つの異なるクリプトクロムシステムが存在する。[[ref:bartolke2025|Bartolke et al.（2025, FASEB Journal）]]は、全長CRY1タンパク質がヒト、ボノボ、ゴリラの網膜において短波長感受性青錐体光受容体の外節にのみ局在することを実証した。核から離れたこの配置は非概日性の光変換機能を示唆する。錐体外節の積層膜ラメラは配向ラジカルペア磁気受容に必要な構造秩序を提供する。",
    s1p2:
      "CRY2は視交叉上核（SCN）への概日光入力経路の一部として網膜神経節細胞で機能する。[[ref:yap2025|Yap et al.（2025, Cells）]]はCRY2がTRPC1と物理的に相互作用し、パルス電磁場曝露後に複合体として核に共移行することを示した。FADクロモフォアは両システムに必要である：FADがなければCRYタンパク質は不安定で磁気的に不感受性となる。",
    s1p3:
      "この二重CRYアーキテクチャは、眼が2つの並行電磁感知チャネルを運用することを意味する：方向性磁気受容のための青錐体のCRY1と、概日-磁気統合のための神経節細胞のCRY2。",

    s2Title: "チャネルプロファイル",
    s2Channels: [
      {
        name: "CRY1（青錐体外節）",
        function: "感覚的磁気受容",
        mechanism: "積層膜ラメラにおけるラジカルペアメカニズム（RPM）",
        evidence: "Bartolke 2025 (FASEB J) — C末端抗体、ヒト/ボノボ/ゴリラ",
        referenceId: "bartolke2025",
      },
      {
        name: "CRY2（網膜神経節細胞）",
        function: "概日-磁気統合",
        mechanism: "TRPC1と物理的複合体を形成（[[ref:yap2025|Yap 2025]]）、核へ共移行",
        evidence: "Yap 2025 (Cells) — CRY2-TRPC1相互作用、FAD依存性",
        referenceId: "yap2025",
      },
      {
        name: "FADクロモフォア",
        function: "両CRYシステムのラジカルペア基質",
        mechanism: "青色光がFADを励起 → FADH•セミキノン → 磁気感受性ラジカルペア",
        evidence: "Hirano 2017 (Cell Reports) — B2枯渇 → CRY分解",
        referenceId: "hirano2017",
      },
    ],
    s2Convergence:
      "二帯域収束：光学的青色光（約450 nm）がCRY光周期を活性化し、RF/ELF電磁場がラジカルペアのスピンダイナミクスを変調する。両チャネルは同一のFAD依存ラジカルペア中間体に収束する。",

    s3Title: "メカニズム連鎖",
    s3Chain:
      "青色光 → CRY → FAD•ラジカルペア → RPMスピンダイナミクス → 概日リズム障害 → メラトニン↓ → HPG軸↓",
    s3Iris:
      "虹彩色素沈着は入力点でチェーン全体を変調する。青い目は茶色い目の約100倍の青色光を網膜に透過させる（[[ref:higuchi2007|Higuchi 2007]]：同一1000ルクス曝露下でメラトニン抑制89% vs 73%）。これは小さな効果ではない——下流カスケード全体のゲインにおけるほぼ2倍の差である。",
    s3Green:
      "緑の目は独自の位置を占める：リポクロム色素がバンドパスフィルターとして機能し、CRY動作帯域450〜570 nmを透過させつつ、セミキノンの過還元を引き起こすUVと極端な青を低減する（[[ref:niessner2014|Niessner 2014]]）。これはCRY活性化よりもCRY安定性を最適化する可能性がある——生の磁気受容感度よりも概日ロバスト性を優先する。",

    s4Title: "主要エビデンス",
    s4Studies: [
      {
        citation: "Bartolke et al. (FASEB J)",
        year: 2025, referenceId: "bartolke2025",
        finding: "ヒト青錐体外節の全長CRY1。C末端抗体が全長型と切断型を区別。QuantumBirdsコンソーシアム。",
        level: "E",
      },
      {
        citation: "Chae et al. (PLOS ONE)",
        year: 2019, referenceId: "chae2019",
        finding: "飢餓男性（n=20）が地磁気食料方向に配向（P<0.001）。効果は青色光（<500 nm）を要した。女性（n=21）は有意な配向を示さなかった。",
        level: "M|C",
      },
      {
        citation: "Higuchi et al. (Am J Physiol)",
        year: 2007, referenceId: "higuchi2007",
        finding: "明るい目の白人：メラトニン抑制89% vs 暗い目のアジア人73%、同一1000ルクス2時間曝露下。虹彩色素沈着が非視覚経路を変調。",
        level: "M|C",
      },
      {
        citation: "Ritz et al. (Nature)",
        year: 2004, referenceId: "ritz2004",
        finding: "RF磁場（1.315 MHz、470 nT）がヨーロッパコマドリの磁気コンパス配向を妨害。生物学的磁気受容がラジカルペアメカニズムを使用する最初のエビデンス。",
        level: "E",
      },
      {
        citation: "Yap et al. (Cells)",
        year: 2025, referenceId: "yap2025",
        finding: "CRY2-TRPC1物理的複合体。FAD枯渇（RFKサイレンシング）がPEMF応答性と磁気方向選択性の両方を消失させた。暗所成長も同効果。",
        level: "E",
      },
      {
        citation: "Niessner et al. (J Exp Biol)",
        year: 2014, referenceId: "niessner2014",
        finding: "CRY光周期：酸化型がUV/青を吸収（≤500 nm）、セミキノンが追加で緑を吸収（≤570 nm）。緑色光はCRY活性化を維持するが開始できない。",
        level: "E",
      },
    ],

    s5Title: "BERM感受性候補解析 — L2未解決",
    s5p1:
      "BERMは眼のEMF感受性について6つの候補基準と3つの修飾因子をもつχ_eye閉包を提案する。これは未解決L2橋より下流の検証命題であり、Lindgrenが導出した基準ではない：",
    s5Criteria: [
      "虹彩色素沈着 — CRYへの光子フラックスを変調（青≈100×、緑≈30×、茶≈1×）",
      "FAD/B2栄養状態 — CRYタンパク質の安定性とラジカルペア形成能力を決定",
      "環境光スペクトル — 青成分がCRY活性化状態を決定；暗所＝磁気的盲目",
    ],
    s5p2:
      "χ_eye = f(虹彩色素沈着, FAD状態, I_青)。青い目でB2充足の個人が青リッチな照明下で最大χ_eyeを持つ。茶色い目でB2欠乏の個人が暗所で最小χ_eyeを持つ。EMF-眼研究が一貫しない結果を出すのはこのためである：3つの支配的モジュレーターを制御していない。",

    s6Title: "近視：三チャネル収束",
    s6Lead:
      "近視有病率はテクノロジー導入集団で劇的に上昇した。BERMモデルは近視の構造的原因である強膜伸長に収束する3つの独立したEMF媒介チャネルを特定する。",
    s6Channels: [
      {
        name: "チャネル1 — DA/VGCC",
        chain: "EMF → ドーパミン作動性アマクリン細胞のVGCC → ドーパミン放出障害 → 強膜伸長ブレーキ弱化",
        detail: "ドーパミンは眼が長くなりすぎるのを止める主要シグナル。十分なDAシグナリングなしに眼軸長が増加 → 近視。",
      },
      {
        name: "チャネル2 — CRY/メラトニン",
        chain: "EMF → CRY障害 → メラトニン抑制 → 眼の概日成長調節異常",
        detail: "眼は独自の概日成長リズムを持つ——日中に成長し夜間に縮小する。メラトニンはこの周期に不可欠。メラトニン障害 → 制御不能な成長 → 伸長。",
      },
      {
        name: "チャネル3 — 平滑筋/Cav",
        chain: "毛様体平滑筋Cavチャネル → 調節（焦点合わせ）",
        detail: "慢性Cav擾乱 → 調節機能障害 → 屈折異常。",
      },
    ],
    s6Prevalence:
      "近視有病率勾配：アフリカ農村部1〜11%、ラテンアメリカ1〜14%、ヨーロッパ17〜36%、米国約50%、東アジア80〜95%。これは遺伝ではなくテクノロジー導入を追跡する——都市化が少ない環境で育った東アジアの子どもの近視率はより低い。",
    s6Covid:
      "COVID-19ロックダウン → スクリーン時間増加 → 小児近視進行の1.5〜3倍増加（メタ分析）。この自然実験はスクリーン/近業曝露を近位ドライバーとして確認し、三チャネルモデルと整合する。",
    s6CascadeRef:
      "モデルページの疾患カスケード#9がこの三チャネル収束メカニズムを記述する。",

    s7Title: "予測",
    s7Predictions: [
      {
        id: "EYE-1",
        text: "青い目の男性は同一青色光条件下で緑の目の男性よりも地磁気配向タスクで優れる（[[ref:chae2019|Chae 2019]]を眼色グループ分けで再現）。",
        discriminating: true,
      },
      {
        id: "EYE-2",
        text: "緑の目の女性は青い目の女性よりも安定した24時間メラトニンプロファイルを示す（メラトニンリズム振幅のCV低下）。",
        discriminating: true,
      },
      {
        id: "EYE-3",
        text: "B2サプリメント（25 mg/日）はスクリーン使用が多く睡眠の質が低い被験者における夜間EMFへの概日レジリエンスを改善する。",
        discriminating: true,
      },
    ],

    discriminatingBadge: "識別的",
    allPredictions: "すべての予測 →",

    seeAlso: "関連ページ",
    modulomeOverview: "モジュローム概要",
    evidencePortal: "エビデンスレジスター",
    citationLabel: "引用",
    yearLabel: "年",
    findingLabel: "知見",
    levelLabel: "レベル",
    channelLabel: "チャネル",
    functionLabel: "機能",
    mechanismLabel: "メカニズム",
    evidenceLabel: "エビデンス",
  },
  fr: {
    title: "Vos yeux sont des capteurs electromagnetiques",
    subtitle:
      "CRY1 dans les segments externes des cones bleus, CRY2 dans les cellules ganglionnaires retiniennes, chromophore FAD — l'oeil comme organe dual de magnetoreception",
    backLink: "← Retour au modulome",

    s1Title: "Anatomie de la magnetoreception retinienne",
    s1p1:
      "La retine humaine contient deux systemes cryptochrome distincts. [[ref:bartolke2025|Bartolke et al. (2025, FASEB Journal)]] ont demontre que la proteine CRY1 pleine longueur se localise exclusivement dans les segments externes des photorecepteurs a cones bleus sensibles aux courtes longueurs d'onde dans les retines humaines, de bonobos et de gorilles. Ce placement loin des noyaux suggere une fonction non circadienne, phototransductive. Les lamelles membranaires empilees des segments externes des cones fournissent l'ordre structurel requis pour la magnetoreception par paire de radicaux orientee.",
    s1p2:
      "CRY2 opere dans les cellules ganglionnaires retiniennes comme partie de la voie d'entree lumineuse circadienne vers le noyau suprachiasmatique (NSC). [[ref:yap2025|Yap et al. (2025, Cells)]] ont montre que CRY2 interagit physiquement avec TRPC1, formant un complexe qui co-transloque vers le noyau apres exposition a un champ electromagnetique pulse. Le chromophore FAD est requis pour les deux systemes : sans FAD, les proteines CRY sont instables et magnetiquement insensibles.",
    s1p3:
      "Cette architecture CRY duale signifie que l'oeil opere deux canaux de detection electromagnetique paralleles : CRY1 dans les cones bleus pour la magnetoreception directionnelle, et CRY2 dans les cellules ganglionnaires pour l'integration circadienne-magnetique.",

    s2Title: "Profil des canaux",
    s2Channels: [
      {
        name: "CRY1 (segments externes des cones bleus)",
        function: "Magnetoreception sensorielle",
        mechanism: "Mecanisme de paire de radicaux (RPM) dans les lamelles membranaires empilees",
        evidence: "Bartolke 2025 (FASEB J) — anticorps C-terminal, humain/bonobo/gorille",
        referenceId: "bartolke2025",
      },
      {
        name: "CRY2 (cellules ganglionnaires retiniennes)",
        function: "Integration circadienne-magnetique",
        mechanism: "Forme un complexe physique avec TRPC1 ([[ref:yap2025|Yap 2025]]), co-translocation nucleaire",
        evidence: "Yap 2025 (Cells) — interaction CRY2-TRPC1, dependant du FAD",
        referenceId: "yap2025",
      },
      {
        name: "Chromophore FAD",
        function: "Substrat de paire de radicaux pour les deux systemes CRY",
        mechanism: "Lumiere bleue excite le FAD → semiquinone FADH• → paire de radicaux magnetiquement sensible",
        evidence: "Hirano 2017 (Cell Reports) — depletion en B2 → degradation de CRY",
        referenceId: "hirano2017",
      },
    ],
    s2Convergence:
      "Convergence bi-bande : la lumiere bleue optique (environ 450 nm) active le photocycle CRY, tandis que les champs electromagnetiques RF/ELF modulent la dynamique de spin de la paire de radicaux. Les deux canaux convergent sur le meme intermediaire de paire de radicaux dependant du FAD.",

    s3Title: "Chaine mecanistique",
    s3Chain:
      "Lumiere bleue → CRY → paire de radicaux FAD• → dynamique de spin RPM → perturbation circadienne → melatonine ↓ → axe HPG ↓",
    s3Iris:
      "La pigmentation de l'iris module l'ensemble de la chaine a son point d'entree. Les yeux bleus transmettent environ 100× plus de lumiere bleue a la retine que les yeux marron ([[ref:higuchi2007|Higuchi 2007]] : 89 % vs 73 % de suppression de la melatonine sous exposition identique de 1000 lux). Ce n'est pas un petit effet — c'est une difference de pres de 2 fois dans le gain de toute la cascade en aval.",
    s3Green:
      "Les yeux verts occupent une position unique : leur pigment lipochrome agit comme un filtre passe-bande transmettant la bande operationnelle CRY de 450–570 nm tout en reduisant l'UV et le bleu extreme qui causent la surreduction de la semiquinone ([[ref:niessner2014|Niessner 2014]]). Cela pourrait optimiser la stabilite CRY plutot que l'activation CRY — favorisant la robustesse circadienne plutot que la sensibilite magnetoreceptive brute.",

    s4Title: "Preuves cles",
    s4Studies: [
      {
        citation: "Bartolke et al. (FASEB J)",
        year: 2025, referenceId: "bartolke2025",
        finding: "CRY1 pleine longueur dans les segments externes des cones bleus humains. L'anticorps C-terminal distingue les formes pleine longueur des tronquees. Consortium QuantumBirds.",
        level: "E",
      },
      {
        citation: "Chae et al. (PLOS ONE)",
        year: 2019, referenceId: "chae2019",
        finding: "Hommes affames (n=20) orientes vers la direction geomagnetique de la nourriture (P<0,001). L'effet necessitait une lumiere bleue (<500 nm). Les femmes (n=21) n'ont montre aucune orientation significative.",
        level: "M|C",
      },
      {
        citation: "Higuchi et al. (Am J Physiol)",
        year: 2007, referenceId: "higuchi2007",
        finding: "Caucasiens aux yeux clairs : 89 % de suppression de la melatonine vs 73 % pour les Asiatiques aux yeux fonces sous exposition identique de 1000 lux, 2h. La pigmentation de l'iris module la voie non visuelle.",
        level: "M|C",
      },
      {
        citation: "Ritz et al. (Nature)",
        year: 2004, referenceId: "ritz2004",
        finding: "Un champ magnetique RF (1,315 MHz, 470 nT) a perturbe l'orientation du compas magnetique chez les rouges-gorges europeens. Premiere preuve que la magnetoreception biologique utilise le mecanisme de paire de radicaux.",
        level: "E",
      },
      {
        citation: "Yap et al. (Cells)",
        year: 2025, referenceId: "yap2025",
        finding: "Complexe physique CRY2-TRPC1. La depletion en FAD (silençage de RFK) a aboli la reactivite aux PEMF et la selectivite directionnelle magnetique. La croissance dans l'obscurite a eu le meme effet.",
        level: "E",
      },
      {
        citation: "Niessner et al. (J Exp Biol)",
        year: 2014, referenceId: "niessner2014",
        finding: "Photocycle CRY : la forme oxydee absorbe UV/bleu (≤500 nm), la semiquinone absorbe en plus le vert (≤570 nm). La lumiere verte maintient mais ne peut initier l'activation CRY.",
        level: "E",
      },
    ],

    s5Title: "Analyse candidate de susceptibilité BERM — L2 ouvert",
    s5p1:
      "BERM propose six critères candidats de sensibilité oculaire aux CEM et une fermeture χ_eye à trois modérateurs. Ce sont des propositions testables en aval du pont L2 ouvert, non des critères dérivés par Lindgren :",
    s5Criteria: [
      "Pigmentation de l'iris — module le flux de photons vers CRY (bleu ≈ 100×, vert ≈ 30×, marron ≈ 1×)",
      "Statut nutritionnel FAD/B2 — determine la stabilite de la proteine CRY et la capacite de formation de paire de radicaux",
      "Spectre lumineux ambiant — le contenu bleu determine l'etat d'activation CRY ; obscurite = magnetiquement aveugle",
    ],
    s5p2:
      "χ_eye = f(pigmentation_iris, statut_FAD, I_bleu). Un individu aux yeux bleus, replete en B2, sous eclairage riche en bleu a le χ_eye maximal. Un individu aux yeux marron, carences en B2, dans l'obscurite a le χ_eye minimal. C'est pourquoi les etudes CEM-oeil produisent des resultats inconsistants : elles ne controlent pas les trois modulateurs dominants.",

    s6Title: "Myopie : convergence a trois canaux",
    s6Lead:
      "La prevalence de la myopie a augmente de facon spectaculaire dans les populations adoptant la technologie. Le modele BERM identifie trois canaux independants medies par les CEM qui convergent sur l'elongation sclerale — la cause structurelle de la myopie.",
    s6Channels: [
      {
        name: "Canal 1 — DA/VGCC",
        chain: "CEM → VGCC dans les cellules amacrines dopaminergiques → liberation de dopamine perturbee → frein a l'elongation sclerale affaibli",
        detail: "La dopamine est le signal primaire qui empeche l'oeil de devenir trop long. Sans signalisation DA suffisante, la longueur axiale augmente → myopie.",
      },
      {
        name: "Canal 2 — CRY/Melatonine",
        chain: "CEM → perturbation CRY → suppression de la melatonine → croissance oculaire circadienne dysregulee",
        detail: "L'oeil a son propre rythme de croissance circadien — il grandit le jour et retrecit la nuit. La melatonine est critique pour ce cycle. Melatonine perturbee → croissance non regulee → elongation.",
      },
      {
        name: "Canal 3 — Muscle lisse/Cav",
        chain: "Canaux Cav du muscle lisse ciliaire → accommodation (mise au point)",
        detail: "Perturbation chronique des Cav → dysfonction accommodative → erreur de refraction.",
      },
    ],
    s6Prevalence:
      "Gradient de prevalence de la myopie : Afrique rurale 1–11 %, Amerique latine 1–14 %, Europe 17–36 %, USA ~50 %, Asie de l'Est 80–95 %. Cela suit l'adoption technologique, pas la genetique — les enfants d'Asie de l'Est eleves dans des environnements moins urbanises ont des taux de myopie plus faibles.",
    s6Covid:
      "Confinements COVID-19 → augmentation du temps d'ecran → augmentation de 1,5–3× de la progression de la myopie infantile (meta-analyses). Cette experience naturelle confirme l'exposition aux ecrans/travail de pres comme facteur proximal, coherent avec le modele a trois canaux.",
    s6CascadeRef:
      "La cascade pathologique #9 dans la page du modele decrit ce mecanisme de convergence a trois canaux.",

    s7Title: "Predictions",
    s7Predictions: [
      {
        id: "EYE-1",
        text: "Les hommes aux yeux bleus surpassent les hommes aux yeux verts dans les taches d'orientation geomagnetique sous conditions de lumiere bleue identiques (reproduire [[ref:chae2019|Chae 2019]] avec regroupement par couleur des yeux).",
        discriminating: true,
      },
      {
        id: "EYE-2",
        text: "Les femmes aux yeux verts montrent des profils de melatonine 24h plus stables que les femmes aux yeux bleus (CV plus faible dans l'amplitude du rythme de la melatonine).",
        discriminating: true,
      },
      {
        id: "EYE-3",
        text: "La supplementation en B2 (25 mg/jour) ameliore la resilience circadienne aux CEM nocturnes chez les sujets a utilisation elevee d'ecran et mauvaise qualite de sommeil.",
        discriminating: true,
      },
    ],

    discriminatingBadge: "Discriminant",
    allPredictions: "Toutes les predictions →",

    seeAlso: "Voir aussi",
    modulomeOverview: "Apercu du modulome",
    evidencePortal: "Registre des preuves",
    citationLabel: "Citation",
    yearLabel: "Annee",
    findingLabel: "Resultat",
    levelLabel: "Niveau",
    channelLabel: "Canal",
    functionLabel: "Fonction",
    mechanismLabel: "Mecanisme",
    evidenceLabel: "Preuve",
  },
  ko: {
    title: "당신의 눈은 전자기 센서이다",
    subtitle:
      "청색 원추 외절의 CRY1, 망막 신경절 세포의 CRY2, FAD 색소단 — 이중 자기수용 기관으로서의 눈",
    backLink: "← 모듈롬으로 돌아가기",

    s1Title: "망막 자기수용의 해부학",
    s1p1:
      "인간 망막에는 두 가지 별개의 크립토크롬 시스템이 존재한다. [[ref:bartolke2025|Bartolke et al.(2025, FASEB Journal)]]은 전장 CRY1 단백질이 인간, 보노보, 고릴라 망막에서 단파장 감수성 청색 원추 광수용체의 외절에만 국한됨을 입증했다. 핵에서 먼 이 배치는 비일주기적, 광변환적 기능을 시사한다. 원추 외절의 적층 막 층판은 배향된 라디칼쌍 자기수용에 필요한 구조적 질서를 제공한다.",
    s1p2:
      "CRY2는 시교차상핵(SCN)으로의 일주기 광 입력 경로의 일부로서 망막 신경절 세포에서 기능한다. [[ref:yap2025|Yap et al.(2025, Cells)]]은 CRY2가 TRPC1과 물리적으로 상호작용하여 펄스 전자기장 노출 후 핵으로 공동 이동하는 복합체를 형성함을 보여주었다. FAD 색소단은 두 시스템 모두에 필요하다: FAD 없이 CRY 단백질은 불안정하고 자기적으로 불감하다.",
    s1p3:
      "이 이중 CRY 아키텍처는 눈이 두 개의 병렬 전자기 감지 채널을 운용함을 의미한다: 방향성 자기수용을 위한 청색 원추의 CRY1과 일주기-자기 통합을 위한 신경절 세포의 CRY2.",

    s2Title: "채널 프로파일",
    s2Channels: [
      {
        name: "CRY1 (청색 원추 외절)",
        function: "감각적 자기수용",
        mechanism: "적층 막 층판에서의 라디칼쌍 메커니즘(RPM)",
        evidence: "Bartolke 2025 (FASEB J) — C 말단 항체, 인간/보노보/고릴라",
        referenceId: "bartolke2025",
      },
      {
        name: "CRY2 (망막 신경절 세포)",
        function: "일주기-자기 통합",
        mechanism: "TRPC1과 물리적 복합체 형성([[ref:yap2025|Yap 2025]]), 핵으로 공동 이동",
        evidence: "Yap 2025 (Cells) — CRY2-TRPC1 상호작용, FAD 의존성",
        referenceId: "yap2025",
      },
      {
        name: "FAD 색소단",
        function: "두 CRY 시스템의 라디칼쌍 기질",
        mechanism: "청색광이 FAD 여기 → FADH• 세미퀴논 → 자기 감수성 라디칼쌍",
        evidence: "Hirano 2017 (Cell Reports) — B2 결핍 → CRY 분해",
        referenceId: "hirano2017",
      },
    ],
    s2Convergence:
      "이중 대역 수렴: 광학적 청색광(약 450 nm)이 CRY 광주기를 활성화하고, RF/ELF 전자기장이 라디칼쌍 스핀 역학을 조절한다. 두 채널 모두 동일한 FAD 의존 라디칼쌍 중간체에 수렴한다.",

    s3Title: "메커니즘 연쇄",
    s3Chain:
      "청색광 → CRY → FAD• 라디칼쌍 → RPM 스핀 역학 → 일주기 교란 → 멜라토닌 ↓ → HPG 축 ↓",
    s3Iris:
      "홍채 색소침착은 진입점에서 전체 연쇄를 조절한다. 파란 눈은 갈색 눈보다 약 100배 더 많은 청색광을 망막에 투과시킨다([[ref:higuchi2007|Higuchi 2007]]: 동일 1000 럭스 노출에서 멜라토닌 억제 89% vs 73%). 이것은 작은 효과가 아니다 — 전체 하류 캐스케이드의 이득에서 거의 2배의 차이이다.",
    s3Green:
      "녹색 눈은 독특한 위치를 차지한다: 리포크롬 색소가 대역통과 필터로 작용하여 CRY 동작 대역 450-570 nm을 투과시키면서 세미퀴논의 과환원을 유발하는 UV와 극단적 청색을 감소시킨다([[ref:niessner2014|Niessner 2014]]). 이는 CRY 활성화보다 CRY 안정성을 최적화할 수 있다 — 원시 자기수용 감도보다 일주기 견고성을 선호한다.",

    s4Title: "핵심 근거",
    s4Studies: [
      {
        citation: "Bartolke et al. (FASEB J)",
        year: 2025, referenceId: "bartolke2025",
        finding: "인간 청색 원추 외절의 전장 CRY1. C 말단 항체가 전장과 절단 형태를 구별. QuantumBirds 컨소시엄.",
        level: "E",
      },
      {
        citation: "Chae et al. (PLOS ONE)",
        year: 2019, referenceId: "chae2019",
        finding: "굶은 남성(n=20)이 지자기 식량 방향으로 배향(P<0.001). 효과는 청색광(<500 nm)을 필요로 함. 여성(n=21)은 유의한 배향을 보이지 않음.",
        level: "M|C",
      },
      {
        citation: "Higuchi et al. (Am J Physiol)",
        year: 2007, referenceId: "higuchi2007",
        finding: "밝은 눈의 백인: 멜라토닌 억제 89% vs 어두운 눈의 아시아인 73%, 동일 1000 럭스 2시간 노출. 홍채 색소침착이 비시각 경로를 조절.",
        level: "M|C",
      },
      {
        citation: "Ritz et al. (Nature)",
        year: 2004, referenceId: "ritz2004",
        finding: "RF 자기장(1.315 MHz, 470 nT)이 유럽울새의 자기 나침반 배향을 교란. 생물학적 자기수용이 라디칼쌍 메커니즘을 사용한다는 최초의 근거.",
        level: "E",
      },
      {
        citation: "Yap et al. (Cells)",
        year: 2025, referenceId: "yap2025",
        finding: "CRY2-TRPC1 물리적 복합체. FAD 결핍(RFK 침묵)이 PEMF 반응성과 자기 방향 선택성 모두를 소멸시킴. 암소 성장도 동일 효과.",
        level: "E",
      },
      {
        citation: "Niessner et al. (J Exp Biol)",
        year: 2014, referenceId: "niessner2014",
        finding: "CRY 광주기: 산화형이 UV/청색 흡수(≤500 nm), 세미퀴논이 추가로 녹색 흡수(≤570 nm). 녹색광은 CRY 활성화를 유지하지만 개시할 수 없음.",
        level: "E",
      },
    ],

    s5Title: "BERM 감수성 후보 분석 — L2 미해결",
    s5p1:
      "BERM은 안구 EMF 감수성에 대해 6개 후보 기준과 3개 조절인자를 가진 χ_eye 폐쇄를 제안한다. 이는 열린 L2 연결 이후의 검증 명제이지 Lindgren이 도출한 기준이 아니다:",
    s5Criteria: [
      "홍채 색소침착 — CRY로의 광자 플럭스 조절(청색 ≈ 100×, 녹색 ≈ 30×, 갈색 ≈ 1×)",
      "FAD/B2 영양 상태 — CRY 단백질 안정성과 라디칼쌍 형성 능력 결정",
      "주변광 스펙트럼 — 청색 함량이 CRY 활성화 상태 결정; 암소 = 자기적 맹목",
    ],
    s5p2:
      "χ_eye = f(홍채_색소침착, FAD_상태, I_청색). 파란 눈에 B2 충족인 개인이 청색 풍부한 조명에서 최대 χ_eye를 갖는다. 갈색 눈에 B2 결핍인 개인이 암소에서 최소 χ_eye를 갖는다. EMF-눈 연구가 일관되지 않은 결과를 내는 이유이다: 세 가지 지배적 조절인자를 통제하지 않는다.",

    s6Title: "근시: 3채널 수렴",
    s6Lead:
      "근시 유병률은 기술 도입 집단에서 극적으로 상승했다. BERM 모델은 근시의 구조적 원인인 공막 신장에 수렴하는 3개의 독립적 EMF 매개 채널을 식별한다.",
    s6Channels: [
      {
        name: "채널 1 — DA/VGCC",
        chain: "EMF → 도파민성 아마크린 세포의 VGCC → 도파민 방출 교란 → 공막 신장 제동 약화",
        detail: "도파민은 눈이 너무 길어지는 것을 막는 주요 신호이다. 충분한 DA 신호전달 없이 안축장이 증가 → 근시.",
      },
      {
        name: "채널 2 — CRY/멜라토닌",
        chain: "EMF → CRY 교란 → 멜라토닌 억제 → 안구 일주기 성장 조절이상",
        detail: "눈은 자체 일주기 성장 리듬을 갖는다 — 낮에 성장하고 밤에 수축한다. 멜라토닌은 이 주기에 필수적이다. 멜라토닌 교란 → 비조절 성장 → 신장.",
      },
      {
        name: "채널 3 — 평활근/Cav",
        chain: "모양체 평활근 Cav 채널 → 조절(초점 맞추기)",
        detail: "만성 Cav 교란 → 조절 기능장애 → 굴절 이상.",
      },
    ],
    s6Prevalence:
      "근시 유병률 구배: 아프리카 농촌 1~11%, 라틴 아메리카 1~14%, 유럽 17~36%, 미국 약 50%, 동아시아 80~95%. 이는 유전이 아닌 기술 도입을 추적한다 — 덜 도시화된 환경에서 자란 동아시아 어린이의 근시율이 더 낮다.",
    s6Covid:
      "COVID-19 봉쇄 → 스크린 시간 증가 → 소아 근시 진행 1.5~3배 증가(메타분석). 이 자연 실험은 스크린/근업 노출을 근위 동인으로 확인하며 3채널 모델과 일치한다.",
    s6CascadeRef:
      "모델 페이지의 질병 캐스케이드 #9가 이 3채널 수렴 메커니즘을 기술한다.",

    s7Title: "예측",
    s7Predictions: [
      {
        id: "EYE-1",
        text: "파란 눈 남성은 동일 청색광 조건에서 녹색 눈 남성보다 지자기 배향 과제에서 우수([[ref:chae2019|Chae 2019]]를 눈 색상 그룹으로 재현).",
        discriminating: true,
      },
      {
        id: "EYE-2",
        text: "녹색 눈 여성은 파란 눈 여성보다 더 안정적인 24시간 멜라토닌 프로파일을 보임(멜라토닌 리듬 진폭의 CV 감소).",
        discriminating: true,
      },
      {
        id: "EYE-3",
        text: "B2 보충(25 mg/일)은 스크린 사용이 많고 수면의 질이 낮은 피험자에서 야간 EMF에 대한 일주기 회복력을 개선.",
        discriminating: true,
      },
    ],

    discriminatingBadge: "식별적",
    allPredictions: "모든 예측 →",

    seeAlso: "관련 페이지",
    modulomeOverview: "모듈롬 개요",
    evidencePortal: "근거 레지스터",
    citationLabel: "인용",
    yearLabel: "연도",
    findingLabel: "결과",
    levelLabel: "수준",
    channelLabel: "채널",
    functionLabel: "기능",
    mechanismLabel: "메커니즘",
    evidenceLabel: "근거",
  },
};

const LEVEL_BADGE: Record<string, string> = {
  E: "bg-green-500/10 text-green-600 dark:text-green-400",
  "M|C": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  C: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function EyePage({
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

      <PageHeader icon={Eye} title={d.title} subtitle={d.subtitle} />

      {/* 01 — Hero + Anatomy */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <article id="anatomy" className="scroll-mt-24">
          <h3 className="text-lg font-semibold mb-4">
            <span className="font-mono-num text-xs text-accent mr-2">01</span>
            {d.s1Title}
          </h3>
          <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
            <InlineReferenceText text={d.s1p1} locale={locale} />
          </p>
          <div className="space-y-3 text-sm text-foreground-muted leading-relaxed">
            <p><InlineReferenceText text={d.s1p2} locale={locale} /></p>
            <p>{d.s1p3}</p>
          </div>
        </article>
      </section>

      {/* 02 — Channel Profile */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>

        <div className="grid gap-6 md:grid-cols-3">
          {d.s2Channels.map((ch, i) => (
            <div
              key={i}
              className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5 space-y-3"
            >
              <h4 className="font-bold text-foreground text-sm leading-tight">
                {ch.name}
              </h4>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.functionLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {ch.function}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.mechanismLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  <InlineReferenceText text={ch.mechanism} locale={locale} />
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.evidenceLabel}
                </p>
                <div className="text-xs text-foreground-muted leading-relaxed italic">
                  <StudyCitation
                    referenceId={ch.referenceId}
                    locale={locale}
                    label={ch.evidence}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-foreground-muted leading-relaxed max-w-4xl border-l-2 border-accent/20 pl-3">
          {d.s2Convergence}
        </p>
      </section>

      {/* 03 — Mechanism Chain */}
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
            <InlineReferenceText text={d.s3Iris} locale={locale} />
          </p>
          <p><InlineReferenceText text={d.s3Green} locale={locale} /></p>
        </div>
      </section>

      {/* 04 — Evidence */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.citationLabel}</th>
                <th className="py-2 pr-3 w-16">{d.yearLabel}</th>
                <th className="py-2 pr-3">{d.findingLabel}</th>
                <th className="py-2 w-14">{d.levelLabel}</th>
              </tr>
            </thead>
            <tbody>
              {d.s4Studies.map((s) => (
                <tr
                  key={`${s.citation}-${s.year}`}
                  className="border-b border-card-border/40"
                >
                  <td className="py-2 pr-3 font-medium text-foreground">
                    <CitationLink referenceId={s.referenceId} locale={locale} citation={s.citation} year={s.year} />
                  </td>
                  <td className="py-2 pr-3 font-mono-num text-foreground-muted">
                    {s.year}
                  </td>
                  <td className="py-2 pr-3 text-foreground-muted">
                    {s.finding}
                  </td>
                  <td className="py-2">
                    <span
                      className={`text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${LEVEL_BADGE[s.level] ?? ""}`}
                    >
                      {s.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 05 — Lindgren Analysis */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-4xl">
          {d.s5p1}
        </p>

        <ol className="space-y-2 text-sm text-foreground-muted leading-relaxed max-w-4xl list-decimal list-inside mb-6">
          {d.s5Criteria.map((c, i) => (
            <li key={i} className="pl-1">
              <span className="font-medium text-foreground">
                {c.split(" — ")[0]}
              </span>
              {" — "}
              {c.split(" — ")[1]}
            </li>
          ))}
        </ol>

        <div className="bg-card rounded-lg border border-card-border p-5">
          <p className="font-mono text-xs text-foreground-muted leading-relaxed">
            {d.s5p2}
          </p>
        </div>
      </section>

      {/* 06 — Myopia */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <p className="editorial-rail mb-6 text-[0.95rem] leading-relaxed text-foreground">
          {d.s6Lead}
        </p>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          {d.s6Channels.map((ch, i) => (
            <div
              key={i}
              className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5 space-y-3"
            >
              <h4 className="font-bold text-foreground text-sm leading-tight">
                {ch.name}
              </h4>
              <div className="rounded border border-card-border p-3">
                <p className="font-mono text-xs text-accent leading-relaxed">
                  {ch.chain}
                </p>
              </div>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {ch.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s6Prevalence}
          </p>
          <p>{d.s6Covid}</p>
          <p className="border-l-2 border-accent/20 pl-3 italic">
            {d.s6CascadeRef}
          </p>
        </div>
      </section>

      {/* 07 — Predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>

        <div className="space-y-4">
          {d.s7Predictions.map((p) => (
            <div
              key={p.id}
              className="border-l-4 border-green-500 rounded-r-lg bg-card p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono-num text-xs font-bold text-accent">
                  {p.id}
                </span>
                {p.discriminating && (
                  <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                    {d.discriminatingBadge}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                <InlineReferenceText text={p.text} locale={locale} />
              </p>
              <Link
                href={`/${locale}/predictions`}
                className="text-xs text-accent hover:underline mt-2 inline-block"
              >
                {d.allPredictions}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6">
          <Link
            href={`/${locale}/modulome`}
            className="text-sm text-accent hover:underline"
          >
            {d.modulomeOverview} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePortal} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
