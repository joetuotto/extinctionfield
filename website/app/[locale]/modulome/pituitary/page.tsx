import type { Metadata } from "next";
import Link from "next/link";
import { Brain } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "The Unprotected Master Gland",
    subtitle:
      "The pituitary is a circumventricular organ OUTSIDE the blood-brain barrier. It regulates ALL endocrine axes. T-type calcium channels in every cell type.",
    backLink: "← Back to Modulome",

    /* 01 Hero */
    s1Title: "Outside the Blood-Brain Barrier",
    s1p1:
      "The pituitary gland is the most EMF-sensitive endocrine organ in the human body. Unlike the brain, it is a circumventricular organ — it sits OUTSIDE the blood-brain barrier. Every molecule circulating in the blood has direct access to pituitary cells. There is no protective barrier to attenuate electromagnetic field effects. The barrier attenuation factor chi_barrier = 1.0 (no attenuation).",
    s1p2:
      "This single gland simultaneously regulates reproduction (FSH, LH), growth (GH), stress (ACTH), thyroid function (TSH), lactation (prolactin), and water balance (ADH). Disruption of pituitary function does not affect one system — it affects all of them at once. The pituitary is the convergence point where EMF exposure translates into multi-system endocrine disruption.",
    s1p3:
      "Every hormone-secreting cell type in the pituitary uses T-type (Cav3) voltage-gated calcium channels for stimulus-secretion coupling. These low-voltage-activated channels operate near resting membrane potential — precisely where Schwan-predicted EMF-induced voltage perturbations are largest.",

    /* 02 Channel Profile */
    s2Title: "Channel Profile",
    s2Channels: [
      {
        name: "Gonadotroph (Cav3)",
        function: "GnRH pulse decoding → FSH and LH secretion",
        mechanism: "T-type Ca2+ window current at bifurcation → GnRH frequency discriminator",
        hormone: "FSH, LH",
      },
      {
        name: "Lactotroph (Cav3)",
        function: "Spontaneous firing → tonic prolactin release",
        mechanism: "T-type channels sustain pacemaker activity; DA inhibition modulates",
        hormone: "Prolactin",
      },
      {
        name: "Corticotroph (Cav3)",
        function: "CRH-stimulated ACTH secretion",
        mechanism: "T-type Ca2+ entry → vesicle exocytosis → ACTH release",
        hormone: "ACTH",
      },
      {
        name: "Thyrotroph (Cav3)",
        function: "TRH-stimulated TSH secretion",
        mechanism: "T-type Ca2+ entry → TSH exocytosis",
        hormone: "TSH",
      },
    ],
    s2Note:
      "T-type (Cav3) channels are present in EVERY pituitary cell type. They are low-voltage-activated channels that operate near resting membrane potential — the regime where Schwan's delta-Vm is maximal. This makes the pituitary uniquely vulnerable: chi_channel is at maximum because the channels are at their voltage bifurcation point.",

    /* 03 Mechanism Chain */
    s3Title: "Mechanism Chain",
    s3Chain:
      "EMF → Schwan delta-Vm → Cav3 window current shift → Ca2+ ↑ → GnRH pulse decoding disruption → FSH/LH ratio distortion → follicle maturation / spermatogenesis disruption",
    s3p1:
      "The critical mechanism is GnRH pulse frequency decoding. The hypothalamus sends GnRH in discrete pulses: fast pulses (every 30 min) preferentially release LH, slow pulses (every 2–4 h) preferentially release FSH. The gonadotroph cell discriminates between these frequencies using Ca2+ dynamics mediated by T-type channels. EMF-induced perturbation of the Cav3 window current does not simply increase or decrease hormone output — it distorts the frequency decoder, causing an incorrect FSH/LH ratio.",
    s3p2:
      "The downstream consequences differ by sex. In women, FSH/LH ratio distortion disrupts the follicular-luteal transition, impairing ovulation. In men, it disrupts the Sertoli cell support for spermatogenesis. Both effects converge on reduced fertility without necessarily changing total gonadotropin levels — which is why standard endocrine panels may miss the effect.",

    /* 04 Evidence */
    s4Title: "Key Evidence",
    s4Studies: [
      {
        citation: "IJMS 2026",
        year: 2026, referenceId: "ijms2026-hpg",
        finding: "GnRH receptor expression increased at 2.45 GHz RF exposure. Pituitary responds to RF by upregulating its own GnRH sensitivity — a compensatory response indicating functional disruption.",
        level: "E",
      },
      {
        citation: "ELF 18-week study",
        year: 2024, referenceId: "pituitary_elf_18week_2024",
        finding: "FSH decreased in female rats after 18 weeks of ELF-EMF exposure. Effect was time-dependent and progressive, consistent with cumulative Cav3 disruption.",
        level: "E",
      },
      {
        citation: "Calcium-LH coupling",
        year: 2015, referenceId: "schlegel1987",
        finding: "LH release is driven mainly by Ca2+ increase in gonadotroph cells. T-type channels provide the primary Ca2+ entry pathway for GnRH-stimulated LH secretion.",
        level: "E",
      },
      {
        citation: "Schwan 1957/Pall 2013",
        year: 1957, referenceId: "schwan1957",
        finding: "Electromagnetic fields induce membrane voltage perturbation delta-Vm proportional to cell radius and field strength. Largest effect at resting potential — exactly where T-type channels operate.",
        level: "E",
      },
    ],

    /* 05 Lindgren Analysis */
    s5Title: "BERM candidate susceptibility analysis — conditional L2 operator, tissue calibration open",
    s5p1:
      "The pituitary represents the maximum EMF sensitivity configuration in the BERM framework:",
    s5Criteria: [
      "chi_barrier = 1.0 — outside BBB, no attenuation. Direct blood access.",
      "chi_channel = maximum — Cav3 at voltage bifurcation point. Low-voltage-activated channels at resting Vm.",
      "chi_convergence = maximum — single organ controls ALL endocrine axes simultaneously.",
      "chi_cumulative — progressive disruption demonstrated in 18-week ELF study. No recovery plateau.",
    ],
    s5p2:
      "The pituitary is the most EMF-sensitive endocrine organ because it combines: no barrier protection (circumventricular), maximum channel sensitivity (Cav3 at bifurcation), and maximum downstream impact (controls all axes). Any effect on this single organ propagates to reproduction, metabolism, stress response, growth, and lactation simultaneously.",

    /* 06 Predictions */
    s6Title: "Predictions",
    s6Predictions: [
      {
        id: "MOD-1",
        text: "A selective T-type calcium channel blocker (e.g., TTA-P2 or mibefradil) prevents EMF-induced FSH/LH ratio distortion in pituitary gonadotroph cells in vitro. If the EMF effect operates through Cav3 window current perturbation, blocking T-type channels specifically should abolish the FSH/LH decoding error without affecting L-type or other channel-dependent functions.",
        discriminating: true,
      },
    ],

    seeAlso: "See also",
    modulomeOverview: "Modulome overview",
    evidencePortal: "Evidence register",
    citationLabel: "Citation",
    yearLabel: "Year",
    findingLabel: "Finding",
    levelLabel: "Level",
    cellLabel: "Cell type",
    functionLabel: "Function",
    mechanismLabel: "Mechanism",
    hormoneLabel: "Hormone",
    discriminatingBadge: "Discriminating",
    allPredictions: "All predictions →",
  },
  fi: {
    title: "Suojaamaton päärauhanen",
    subtitle:
      "Aivolisäke on sirkumventrikulaarinen elin veri-aivoesteen ULKOPUOLELLA. Se säätelee KAIKKIA endokriinisiä akseleita. T-tyypin kalsiumkanavat jokaisessa solutyypissä.",
    backLink: "← Takaisin moduloomiin",

    s1Title: "Veri-aivoesteen ulkopuolella",
    s1p1:
      "Aivolisäke on ihmiskehon EMF-herkin endokriininen elin. Toisin kuin aivot, se on sirkumventrikulaarinen elin — se sijaitsee veri-aivoesteen ULKOPUOLELLA. Jokaisella veressa kiertävällä molekyylillä on suora pääsy aivolisäkkeen soluihin. Ei ole suojaavaa estettä vaimentamaan sähkömagneettisen kentän vaikutuksia. Esteen vaimennuskerroin chi_barrier = 1,0 (ei vaimennusta).",
    s1p2:
      "Tämä yksittäinen rauhanen säätelee samanaikaisesti lisääntymistä (FSH, LH), kasvua (GH), stressia (ACTH), kilpirauhasen toimintaa (TSH), laktaatiota (prolaktiini) ja vesitasapainoa (ADH). Aivolisakkeen toiminnan häiriö ei vaikuta yhteen järjestelmään — se vaikuttaa kaikkiin samanaikaisesti. Aivolisäke on yhdentymispiste, jossa EMF-altistus muuttuu monisysteemiseksi endokriiniseksi häiriöksi.",
    s1p3:
      "Jokainen hormoneja erittävä solutyyppi aivolisäkkeessä käyttää T-tyypin (Cav3) jänniteherkkiä kalsiumkanavia stimulus-sekreetio-kytkentään. Nämä matalan jännitekynnyksen kanavat toimivat lähellä lepopotentiaalia — juuri siellä missä Schwanin ennustamat EMF-indusoidut jännitehäiriöt ovat suurimpia.",

    s2Title: "Kanavaprofiili",
    s2Channels: [
      {
        name: "Gonadotrofi (Cav3)",
        function: "GnRH-pulssin dekoodaus → FSH:n ja LH:n eritys",
        mechanism: "T-tyypin Ca2+-ikkunavirta bifurkaatiossa → GnRH-taajuuserottelija",
        hormone: "FSH, LH",
      },
      {
        name: "Laktotrofi (Cav3)",
        function: "Spontaani syttyminen → toninen prolaktiinin vapautuminen",
        mechanism: "T-tyypin kanavat ylläpitävät tahdistinaktiivisuutta; DA-inhibitio moduloi",
        hormone: "Prolaktiini",
      },
      {
        name: "Kortikotrofi (Cav3)",
        function: "CRH-stimuloitu ACTH:n eritys",
        mechanism: "T-tyypin Ca2+-sisäänvirtaus → vesikulien eksosytoosi → ACTH-vapautuminen",
        hormone: "ACTH",
      },
      {
        name: "Tyreotrofi (Cav3)",
        function: "TRH-stimuloitu TSH:n eritys",
        mechanism: "T-tyypin Ca2+-sisäänvirtaus → TSH-eksosytoosi",
        hormone: "TSH",
      },
    ],
    s2Note:
      "T-tyypin (Cav3) kanavat ovat JOKAISESSA aivolisäkkeen solutyypissä. Ne ovat matalan jännitekynnyksen kanavia jotka toimivat lähellä lepopotentiaalia — alueella jossa Schwanin delta-Vm on suurin. Tämä tekee aivolisäkkeen ainutlaatuisesti haavoittuvaksi: chi_channel on maksimissaan koska kanavat ovat jännite-bifurkaatiopisteessaan.",

    s3Title: "Mekanismiketju",
    s3Chain:
      "EMF → Schwanin delta-Vm → Cav3-ikkunavirran siirtymää → Ca2+ ↑ → GnRH-pulssin dekoodauksen häiriö → FSH/LH-suhteen vääristyminen → follikkelikypsymisen / spermatogeneesin häiriö",
    s3p1:
      "Kriittinen mekanismi on GnRH-pulssitaajuuden dekoodaus. Hypotalamus lähettää GnRH:ta erillisinä pulsseina: nopeat pulssit (30 min välein) vapauttavat ensisijaisesti LH:ta, hitaat pulssit (2–4 h välein) ensisijaisesti FSH:ta. Gonadotrofisolu erottelee nämä taajuudet T-tyypin kanavien välittämän Ca2+-dynamiikan avulla. EMF-aiheutettu Cav3-ikkunavirran häiriö ei yksinkertaisesti lisää tai vähennä hormonivolyymia — se vääristää taajuusdekooderin, aiheuttaen väärän FSH/LH-suhteen.",
    s3p2:
      "Alavirran seuraukset eroavat sukupuolittain. Naisilla FSH/LH-suhteen vääristyminen häiritsee follikulaari-luteaali-siirtymää, heikentäen ovulaatiota. Miehillä se häiritsee Sertoli-solujen tukea spermatogeneesille. Molemmat vaikutukset yhtyvät hedelmällisyyden heikkenemiseen ilman että gonadotropiinitasot välttämättä muuttuvat — mikä on miksi standardit endokriiniset paneelit voivat ohittaa vaikutuksen.",

    s4Title: "Keskeinen näyttö",
    s4Studies: [
      {
        citation: "IJMS 2026",
        year: 2026, referenceId: "ijms2026-hpg",
        finding: "GnRH-reseptorin ekspressio kasvoi 2,45 GHz RF-altistuksessa. Aivolisäke reagoi RF:aan säätelemällä omaa GnRH-herkkyyttään — kompensatorinen vaste joka osoittaa toiminnallisen häiriön.",
        level: "E",
      },
      {
        citation: "ELF 18 viikon tutkimus",
        year: 2024, referenceId: "pituitary_elf_18week_2024",
        finding: "FSH laski naarasrotilla 18 viikon ELF-EMF-altistuksen jälkeen. Vaikutus oli aikariippuvainen ja etenevä, yhdenmukainen kumulatiivisen Cav3-häiriön kanssa.",
        level: "E",
      },
      {
        citation: "Kalsium-LH-kytkentä",
        year: 2015, referenceId: "schlegel1987",
        finding: "LH:n vapautumista ohjaa ensisijaisesti Ca2+-nousu gonadotrofisoluissa. T-tyypin kanavat tarjoavat ensisijaisen Ca2+-sisäänvirtausreitin GnRH-stimuloidulle LH-eritykselle.",
        level: "E",
      },
      {
        citation: "Schwan 1957/Pall 2013",
        year: 1957, referenceId: "schwan1957",
        finding: "Sähkömagneettiset kentät indusoivat kalvojännitehäiriön delta-Vm:n joka on verrannollinen solun säteeseen ja kenttävoimakkuuteen. Suurin vaikutus lepopotentiaalissa — juuri missä T-tyypin kanavat toimivat.",
        level: "E",
      },
    ],

    s5Title: "BERM:n herkkyyden ehdokasanalyysi — ehdollinen L2-operaattori, kudoskalibrointi avoin",
    s5p1:
      "Aivolisäke edustaa suurinta EMF-herkkyyskonfiguraatiota BERM-kehyksessä:",
    s5Criteria: [
      "chi_barrier = 1,0 — BBB:n ulkopuolella, ei vaimennusta. Suora veripääsy.",
      "chi_channel = maksimi — Cav3 jännite-bifurkaatiopisteessa. Matalan jännitekynnyksen kanavat lepo-Vm:ssa.",
      "chi_convergence = maksimi — yksittäinen elin säätelee KAIKKIA endokriinisiä akseleita samanaikaisesti.",
      "chi_cumulative — etenevä häiriö osoitettu 18 viikon ELF-tutkimuksessa. Ei toipumistasannetta.",
    ],
    s5p2:
      "Aivolisäke on EMF-herkin endokriininen elin koska se yhdistää: ei estesuojausta (sirkumventrikulaarinen), maksimaalisen kanavaherkkyyden (Cav3 bifurkaatiossa) ja maksimaalisen alavirran vaikutuksen (säätelee kaikkia akseleita). Mikä tahansa vaikutus tähän yhteen elimeen leviaa lisääntymiseen, aineenvaihduntaan, stressivasteeseen, kasvuun ja laktaatioon samanaikaisesti.",

    s6Title: "Ennusteet",
    s6Predictions: [
      {
        id: "MOD-1",
        text: "Selektiivinen T-tyypin kalsiumkanavan salpaaja (esim. TTA-P2 tai mibefradiili) estää EMF-indusoidun FSH/LH-suhteen vääristymisen aivolisäkkeen gonadotrofisoluissa in vitro. Jos EMF-vaikutus toimii Cav3-ikkunavirran häiriön kautta, T-tyypin kanavien tarkka salpaaminen tulisi kumota FSH/LH-dekoodausvirhe vaikuttamatta L-tyypin tai muiden kanavien riippuvaisiin toimintoihin.",
        discriminating: true,
      },
    ],

    seeAlso: "Katso myös",
    modulomeOverview: "Moduloomin yleiskatsaus",
    evidencePortal: "Näyttörekisteri",
    citationLabel: "Viite",
    yearLabel: "Vuosi",
    findingLabel: "Löydös",
    levelLabel: "Taso",
    cellLabel: "Solutyyppi",
    functionLabel: "Toiminto",
    mechanismLabel: "Mekanismi",
    hormoneLabel: "Hormoni",
    discriminatingBadge: "Erotteleva",
    allPredictions: "Kaikki ennusteet →",
  },
  ja: {
    title: "無防備な主要腺",
    subtitle:
      "下垂体は血液脳関門の外側にある脳室周囲器官である。全ての内分泌軸を調節する。全ての細胞型にT型カルシウムチャネル。",
    backLink: "← モジュロームに戻る",

    s1Title: "血液脳関門の外側",
    s1p1:
      "下垂体は人体で最もEMF感受性の高い内分泌器官である。脳と異なり、脳室周囲器官であり、血液脳関門の外側に位置する。血中を循環する全ての分子が下垂体細胞に直接アクセスできる。電磁場効果を減衰させる保護バリアは存在しない。バリア減衰係数 chi_barrier = 1.0 (減衰なし)。",
    s1p2:
      "この単一の腺が同時に生殖 (FSH, LH)、成長 (GH)、ストレス (ACTH)、甲状腺機能 (TSH)、泌乳 (プロラクチン)、水分バランス (ADH) を調節する。下垂体機能の障害は一つのシステムだけでなく、全てに同時に影響する。下垂体はEMF曝露が多系統内分泌障害に変換される収束点である。",
    s1p3:
      "下垂体の全てのホルモン分泌細胞型は刺激-分泌連関にT型 (Cav3) 電位依存性カルシウムチャネルを使用する。これらの低電位活性化チャネルは安静膜電位付近で作動する — SchWanが予測したEMF誘導電圧摂動が最大となるまさにその領域である。",

    s2Title: "チャネルプロファイル",
    s2Channels: [
      {
        name: "ゴナドトロフ (Cav3)",
        function: "GnRHパルスデコーディング → FSHおよびLH分泌",
        mechanism: "分岐点でのT型Ca2+ウィンドウ電流 → GnRH周波数弁別器",
        hormone: "FSH, LH",
      },
      {
        name: "ラクトトロフ (Cav3)",
        function: "自発発火 → 持続的プロラクチン放出",
        mechanism: "T型チャネルがペースメーカー活動を維持；DA阻害が調節",
        hormone: "Prolactin",
      },
      {
        name: "コルチコトロフ (Cav3)",
        function: "CRH刺激によるACTH分泌",
        mechanism: "T型Ca2+流入 → 小胞エキソサイトーシス → ACTH放出",
        hormone: "ACTH",
      },
      {
        name: "サイロトロフ (Cav3)",
        function: "TRH刺激によるTSH分泌",
        mechanism: "T型Ca2+流入 → TSHエキソサイトーシス",
        hormone: "TSH",
      },
    ],
    s2Note:
      "T型 (Cav3) チャネルは下垂体の全ての細胞型に存在する。安静膜電位付近で作動する低電位活性化チャネルであり、Schwanのdelta-Vmが最大となる領域である。これにより下垂体は独自の脆弱性を持つ：チャネルが電圧分岐点にあるため chi_channel は最大となる。",

    s3Title: "メカニズムチェーン",
    s3Chain:
      "EMF → Schwan delta-Vm → Cav3 window current shift → Ca2+ ↑ → GnRH pulse decoding disruption → FSH/LH ratio distortion → follicle maturation / spermatogenesis disruption",
    s3p1:
      "重要なメカニズムはGnRHパルス周波数デコーディングである。視床下部はGnRHを離散パルスで送る：速いパルス (30分毎) はLHを優先的に放出し、遅いパルス (2–4時間毎) はFSHを優先的に放出する。ゴナドトロフ細胞はT型チャネルが媒介するCa2+ダイナミクスを使用してこれらの周波数を弁別する。Cav3ウィンドウ電流のEMF誘導摂動はホルモン出力を単に増減させるのではなく — 周波数デコーダーを歪め、不正確なFSH/LH比を引き起こす。",
    s3p2:
      "下流の結果は性別によって異なる。女性ではFSH/LH比の歪みが卵胞-黄体移行を乱し、排卵を障害する。男性ではセルトリ細胞による精子形成の支持を乱す。両方の効果は総ゴナドトロピン量を必ずしも変えずに生殖能力の低下に収束する — 標準的な内分泌パネルが効果を見逃しうる理由である。",

    s4Title: "主要なエビデンス",
    s4Studies: [
      {
        citation: "IJMS 2026",
        year: 2026, referenceId: "ijms2026-hpg",
        finding: "2.45 GHz RF曝露でGnRH受容体発現が増加。下垂体は自身のGnRH感受性を上方制御することでRFに応答する — 機能障害を示す代償反応。",
        level: "E",
      },
      {
        citation: "ELF 18-week study",
        year: 2024, referenceId: "pituitary_elf_18week_2024",
        finding: "雌ラットで18週間のELF-EMF曝露後にFSHが低下。効果は時間依存的で進行性であり、累積的Cav3障害と一致。",
        level: "E",
      },
      {
        citation: "Calcium-LH coupling",
        year: 2015, referenceId: "schlegel1987",
        finding: "LH放出は主にゴナドトロフ細胞のCa2+増加によって駆動される。T型チャネルがGnRH刺激LH分泌の主要Ca2+流入経路を提供する。",
        level: "E",
      },
      {
        citation: "Schwan 1957/Pall 2013",
        year: 1957, referenceId: "schwan1957",
        finding: "電磁場は細胞半径と電場強度に比例した膜電圧摂動 delta-Vm を誘導する。安静電位で最大効果 — まさにT型チャネルが作動する領域。",
        level: "E",
      },
    ],

    s5Title: "BERM感受性候補解析 — 条件付きL2演算子、組織校正は未完了",
    s5p1:
      "下垂体はBERMフレームワークにおける最大EMF感受性構成を表す：",
    s5Criteria: [
      "chi_barrier = 1.0 — BBBの外側、減衰なし。直接的な血液アクセス。",
      "chi_channel = 最大 — 電圧分岐点のCav3。安静Vmでの低電位活性化チャネル。",
      "chi_convergence = 最大 — 単一器官が全ての内分泌軸を同時に制御。",
      "chi_cumulative — 18週間ELF研究で進行性障害が実証。回復プラトーなし。",
    ],
    s5p2:
      "下垂体が最もEMF感受性の高い内分泌器官である理由は、バリア保護なし (脳室周囲)、最大チャネル感受性 (分岐点のCav3)、最大下流影響 (全軸を制御) を組み合わせているためである。この単一器官への効果は生殖、代謝、ストレス応答、成長、泌乳に同時に波及する。",

    s6Title: "予測",
    s6Predictions: [
      {
        id: "MOD-1",
        text: "選択的T型カルシウムチャネル遮断薬 (例：TTA-P2またはミベフラジル) がin vitroで下垂体ゴナドトロフ細胞におけるEMF誘導FSH/LH比歪みを防止する。EMF効果がCav3ウィンドウ電流摂動を介して作用するなら、T型チャネルを特異的に遮断すればL型や他のチャネル依存機能に影響せずFSH/LHデコーディングエラーを消失させるはずである。",
        discriminating: true,
      },
    ],

    seeAlso: "関連項目",
    modulomeOverview: "モジュローム概要",
    evidencePortal: "エビデンス登録",
    citationLabel: "引用",
    yearLabel: "年",
    findingLabel: "知見",
    levelLabel: "レベル",
    cellLabel: "細胞型",
    functionLabel: "機能",
    mechanismLabel: "メカニズム",
    hormoneLabel: "ホルモン",
    discriminatingBadge: "弁別的",
    allPredictions: "全ての予測 →",
  },
  fr: {
    title: "La glande maitresse non protegee",
    subtitle:
      "L'hypophyse est un organe circumventriculaire EN DEHORS de la barriere hemato-encephalique. Elle regule TOUS les axes endocriniens. Canaux calciques de type T dans chaque type cellulaire.",
    backLink: "← Retour au Modulome",

    s1Title: "En dehors de la barriere hemato-encephalique",
    s1p1:
      "L'hypophyse est l'organe endocrinien le plus sensible aux EMF du corps humain. Contrairement au cerveau, c'est un organe circumventriculaire — elle se situe EN DEHORS de la barriere hemato-encephalique. Chaque molecule circulant dans le sang a un acces direct aux cellules hypophysaires. Il n'existe pas de barriere protectrice pour attenuer les effets des champs electromagnetiques. Le facteur d'attenuation de barriere chi_barrier = 1,0 (pas d'attenuation).",
    s1p2:
      "Cette glande unique regule simultanement la reproduction (FSH, LH), la croissance (GH), le stress (ACTH), la fonction thyroidienne (TSH), la lactation (prolactine) et l'equilibre hydrique (ADH). La perturbation de la fonction hypophysaire n'affecte pas un seul systeme — elle les affecte tous en meme temps. L'hypophyse est le point de convergence ou l'exposition aux EMF se traduit en perturbation endocrinienne multi-systemique.",
    s1p3:
      "Chaque type cellulaire secretant des hormones dans l'hypophyse utilise des canaux calciques voltage-dependants de type T (Cav3) pour le couplage stimulus-secretion. Ces canaux actives a basse tension operent pres du potentiel de membrane au repos — precisement la ou les perturbations de tension induites par les EMF predites par Schwan sont les plus importantes.",

    s2Title: "Profil des canaux",
    s2Channels: [
      {
        name: "Gonadotrophe (Cav3)",
        function: "Decodage des impulsions GnRH → secretion de FSH et LH",
        mechanism: "Courant de fenetre Ca2+ de type T a la bifurcation → discriminateur de frequence GnRH",
        hormone: "FSH, LH",
      },
      {
        name: "Lactotrophe (Cav3)",
        function: "Decharge spontanee → liberation tonique de prolactine",
        mechanism: "Les canaux de type T maintiennent l'activite pacemaker ; l'inhibition DA module",
        hormone: "Prolactine",
      },
      {
        name: "Corticotrophe (Cav3)",
        function: "Secretion d'ACTH stimulee par la CRH",
        mechanism: "Entree de Ca2+ de type T → exocytose vesiculaire → liberation d'ACTH",
        hormone: "ACTH",
      },
      {
        name: "Thyreotrophe (Cav3)",
        function: "Secretion de TSH stimulee par la TRH",
        mechanism: "Entree de Ca2+ de type T → exocytose de TSH",
        hormone: "TSH",
      },
    ],
    s2Note:
      "Les canaux de type T (Cav3) sont presents dans CHAQUE type cellulaire hypophysaire. Ce sont des canaux actives a basse tension qui operent pres du potentiel de membrane au repos — le regime ou le delta-Vm de Schwan est maximal. Cela rend l'hypophyse uniquement vulnerable : chi_channel est au maximum car les canaux sont a leur point de bifurcation de tension.",

    s3Title: "Chaine mecanistique",
    s3Chain:
      "EMF → Schwan delta-Vm → Cav3 window current shift → Ca2+ ↑ → GnRH pulse decoding disruption → FSH/LH ratio distortion → follicle maturation / spermatogenesis disruption",
    s3p1:
      "Le mecanisme critique est le decodage de la frequence des impulsions GnRH. L'hypothalamus envoie la GnRH en impulsions discretes : les impulsions rapides (toutes les 30 min) liberent preferentiellement la LH, les impulsions lentes (toutes les 2–4 h) liberent preferentiellement la FSH. La cellule gonadotrophe discrimine ces frequences en utilisant la dynamique du Ca2+ mediee par les canaux de type T. La perturbation induite par les EMF du courant de fenetre Cav3 n'augmente ni ne diminue simplement la production hormonale — elle deforme le decodeur de frequence, causant un rapport FSH/LH incorrect.",
    s3p2:
      "Les consequences en aval different selon le sexe. Chez la femme, la distorsion du rapport FSH/LH perturbe la transition folliculaire-luteale, compromettant l'ovulation. Chez l'homme, elle perturbe le soutien des cellules de Sertoli a la spermatogenese. Les deux effets convergent vers une reduction de la fertilite sans necessairement modifier les niveaux totaux de gonadotrophines — c'est pourquoi les bilans endocriniens standards peuvent manquer l'effet.",

    s4Title: "Preuves cles",
    s4Studies: [
      {
        citation: "IJMS 2026",
        year: 2026, referenceId: "ijms2026-hpg",
        finding: "Expression du recepteur GnRH augmentee lors d'une exposition RF a 2,45 GHz. L'hypophyse repond aux RF en regulant a la hausse sa propre sensibilite au GnRH — une reponse compensatoire indiquant une perturbation fonctionnelle.",
        level: "E",
      },
      {
        citation: "ELF 18-week study",
        year: 2024, referenceId: "pituitary_elf_18week_2024",
        finding: "La FSH a diminue chez les rates apres 18 semaines d'exposition ELF-EMF. L'effet etait temps-dependant et progressif, coherent avec une perturbation cumulative de Cav3.",
        level: "E",
      },
      {
        citation: "Calcium-LH coupling",
        year: 2015, referenceId: "schlegel1987",
        finding: "La liberation de LH est principalement entraainee par l'augmentation de Ca2+ dans les cellules gonadotrophes. Les canaux de type T fournissent la voie principale d'entree du Ca2+ pour la secretion de LH stimulee par la GnRH.",
        level: "E",
      },
      {
        citation: "Schwan 1957/Pall 2013",
        year: 1957, referenceId: "schwan1957",
        finding: "Les champs electromagnetiques induisent une perturbation de tension membranaire delta-Vm proportionnelle au rayon cellulaire et a l'intensite du champ. Effet maximal au potentiel de repos — exactement la ou operent les canaux de type T.",
        level: "E",
      },
    ],

    s5Title: "Analyse candidate de susceptibilité BERM — opérateur L2 conditionnel, calibration tissulaire ouverte",
    s5p1:
      "L'hypophyse represente la configuration de sensibilite EMF maximale dans le cadre BERM :",
    s5Criteria: [
      "chi_barrier = 1,0 — en dehors de la BHE, pas d'attenuation. Acces sanguin direct.",
      "chi_channel = maximum — Cav3 au point de bifurcation de tension. Canaux actives a basse tension au Vm de repos.",
      "chi_convergence = maximum — un seul organe controle TOUS les axes endocriniens simultanement.",
      "chi_cumulative — perturbation progressive demontree dans l'etude ELF de 18 semaines. Pas de plateau de recuperation.",
    ],
    s5p2:
      "L'hypophyse est l'organe endocrinien le plus sensible aux EMF car elle combine : pas de protection de barriere (circumventriculaire), sensibilite maximale des canaux (Cav3 a la bifurcation), et impact maximal en aval (controle tous les axes). Tout effet sur cet organe unique se propage a la reproduction, au metabolisme, a la reponse au stress, a la croissance et a la lactation simultanement.",

    s6Title: "Predictions",
    s6Predictions: [
      {
        id: "MOD-1",
        text: "Un bloqueur selectif des canaux calciques de type T (par ex. TTA-P2 ou mibefradil) previent la distorsion du rapport FSH/LH induite par les EMF dans les cellules gonadotrophes hypophysaires in vitro. Si l'effet EMF opere par perturbation du courant de fenetre Cav3, le blocage specifique des canaux de type T devrait abolir l'erreur de decodage FSH/LH sans affecter les fonctions dependantes des canaux de type L ou d'autres canaux.",
        discriminating: true,
      },
    ],

    seeAlso: "Voir aussi",
    modulomeOverview: "Apercu du Modulome",
    evidencePortal: "Registre des preuves",
    citationLabel: "Citation",
    yearLabel: "Annee",
    findingLabel: "Resultat",
    levelLabel: "Niveau",
    cellLabel: "Type cellulaire",
    functionLabel: "Fonction",
    mechanismLabel: "Mecanisme",
    hormoneLabel: "Hormone",
    discriminatingBadge: "Discriminant",
    allPredictions: "Toutes les predictions →",
  },
  ko: {
    title: "보호되지 않는 주요 선",
    subtitle:
      "뇌하수체는 혈액뇌장벽 외부의 뇌실주위기관이다. 모든 내분비 축을 조절한다. 모든 세포 유형에 T형 칼슘 채널.",
    backLink: "← 모듈롬으로 돌아가기",

    s1Title: "혈액뇌장벽 외부",
    s1p1:
      "뇌하수체는 인체에서 가장 EMF 감수성이 높은 내분비 기관이다. 뇌와 달리 뇌실주위기관으로 혈액뇌장벽 외부에 위치한다. 혈액 중 순환하는 모든 분자가 뇌하수체 세포에 직접 접근할 수 있다. 전자기장 효과를 감쇠시킬 보호 장벽이 없다. 장벽 감쇠 계수 chi_barrier = 1.0 (감쇠 없음).",
    s1p2:
      "이 단일 선이 생식 (FSH, LH), 성장 (GH), 스트레스 (ACTH), 갑상선 기능 (TSH), 수유 (프로락틴), 수분 균형 (ADH)을 동시에 조절한다. 뇌하수체 기능 장애는 하나의 시스템이 아닌 모든 시스템에 동시에 영향을 미친다. 뇌하수체는 EMF 노출이 다계통 내분비 교란으로 전환되는 수렴점이다.",
    s1p3:
      "뇌하수체의 모든 호르몬 분비 세포 유형은 자극-분비 연관에 T형 (Cav3) 전압 의존성 칼슘 채널을 사용한다. 이 저전압 활성화 채널은 안정막전위 근처에서 작동한다 — Schwan이 예측한 EMF 유도 전압 섭동이 가장 큰 바로 그 영역이다.",

    s2Title: "채널 프로파일",
    s2Channels: [
      {
        name: "성선자극세포 (Cav3)",
        function: "GnRH 펄스 디코딩 → FSH 및 LH 분비",
        mechanism: "분기점에서의 T형 Ca2+ 윈도우 전류 → GnRH 주파수 판별기",
        hormone: "FSH, LH",
      },
      {
        name: "유즙분비세포 (Cav3)",
        function: "자발적 발화 → 지속적 프로락틴 방출",
        mechanism: "T형 채널이 박동 조율 활동을 유지; DA 억제가 조절",
        hormone: "Prolactin",
      },
      {
        name: "부신피질자극세포 (Cav3)",
        function: "CRH 자극에 의한 ACTH 분비",
        mechanism: "T형 Ca2+ 유입 → 소포 엑소시토시스 → ACTH 방출",
        hormone: "ACTH",
      },
      {
        name: "갑상선자극세포 (Cav3)",
        function: "TRH 자극에 의한 TSH 분비",
        mechanism: "T형 Ca2+ 유입 → TSH 엑소시토시스",
        hormone: "TSH",
      },
    ],
    s2Note:
      "T형 (Cav3) 채널은 뇌하수체의 모든 세포 유형에 존재한다. 안정막전위 근처에서 작동하는 저전압 활성화 채널로, Schwan의 delta-Vm이 최대인 영역이다. 이것이 뇌하수체를 독특하게 취약하게 만든다: 채널이 전압 분기점에 있기 때문에 chi_channel이 최대이다.",

    s3Title: "메커니즘 체인",
    s3Chain:
      "EMF → Schwan delta-Vm → Cav3 window current shift → Ca2+ ↑ → GnRH pulse decoding disruption → FSH/LH ratio distortion → follicle maturation / spermatogenesis disruption",
    s3p1:
      "핵심 메커니즘은 GnRH 펄스 주파수 디코딩이다. 시상하부는 GnRH를 이산 펄스로 보낸다: 빠른 펄스 (30분마다)는 LH를 우선적으로 방출하고, 느린 펄스 (2–4시간마다)는 FSH를 우선적으로 방출한다. 성선자극세포는 T형 채널이 매개하는 Ca2+ 역학을 사용하여 이 주파수를 판별한다. Cav3 윈도우 전류의 EMF 유도 섭동은 호르몬 출력을 단순히 증가 또는 감소시키지 않는다 — 주파수 디코더를 왜곡하여 부정확한 FSH/LH 비율을 유발한다.",
    s3p2:
      "하류 결과는 성별에 따라 다르다. 여성에서는 FSH/LH 비율 왜곡이 난포-황체 전환을 교란하여 배란을 손상시킨다. 남성에서는 세르톨리 세포의 정자형성 지원을 교란한다. 두 효과 모두 총 성선자극호르몬 수준을 반드시 변경하지 않으면서 생식력 감소에 수렴한다 — 표준 내분비 패널이 효과를 놓칠 수 있는 이유이다.",

    s4Title: "핵심 증거",
    s4Studies: [
      {
        citation: "IJMS 2026",
        year: 2026, referenceId: "ijms2026-hpg",
        finding: "2.45 GHz RF 노출에서 GnRH 수용체 발현이 증가. 뇌하수체는 자체 GnRH 감수성을 상향 조절하여 RF에 반응 — 기능 장애를 나타내는 보상 반응.",
        level: "E",
      },
      {
        citation: "ELF 18-week study",
        year: 2024, referenceId: "pituitary_elf_18week_2024",
        finding: "18주간 ELF-EMF 노출 후 암컷 쥐에서 FSH가 감소. 효과는 시간 의존적이고 진행성이었으며, 누적적 Cav3 교란과 일치.",
        level: "E",
      },
      {
        citation: "Calcium-LH coupling",
        year: 2015, referenceId: "schlegel1987",
        finding: "LH 방출은 주로 성선자극세포에서의 Ca2+ 증가에 의해 구동된다. T형 채널이 GnRH 자극 LH 분비의 주요 Ca2+ 유입 경로를 제공한다.",
        level: "E",
      },
      {
        citation: "Schwan 1957/Pall 2013",
        year: 1957, referenceId: "schwan1957",
        finding: "전자기장은 세포 반경과 장 강도에 비례하는 막전압 섭동 delta-Vm을 유도한다. 안정 전위에서 최대 효과 — 정확히 T형 채널이 작동하는 곳.",
        level: "E",
      },
    ],

    s5Title: "BERM 감수성 후보 분석 — 조건부 L2 연산자, 조직 보정 미완료",
    s5p1:
      "뇌하수체는 BERM 프레임워크에서 최대 EMF 감수성 구성을 나타낸다:",
    s5Criteria: [
      "chi_barrier = 1.0 — BBB 외부, 감쇠 없음. 직접적 혈액 접근.",
      "chi_channel = 최대 — 전압 분기점의 Cav3. 안정 Vm에서의 저전압 활성화 채널.",
      "chi_convergence = 최대 — 단일 기관이 모든 내분비 축을 동시에 제어.",
      "chi_cumulative — 18주 ELF 연구에서 진행성 교란 입증. 회복 고원 없음.",
    ],
    s5p2:
      "뇌하수체가 가장 EMF 감수성이 높은 내분비 기관인 이유는 장벽 보호 없음 (뇌실주위), 최대 채널 감수성 (분기점의 Cav3), 최대 하류 영향 (모든 축 제어)을 결합하기 때문이다. 이 단일 기관에 대한 어떤 효과도 생식, 대사, 스트레스 반응, 성장, 수유에 동시에 파급된다.",

    s6Title: "예측",
    s6Predictions: [
      {
        id: "MOD-1",
        text: "선택적 T형 칼슘 채널 차단제 (예: TTA-P2 또는 미베프라딜)가 in vitro에서 뇌하수체 성선자극세포의 EMF 유도 FSH/LH 비율 왜곡을 방지한다. EMF 효과가 Cav3 윈도우 전류 섭동을 통해 작용한다면, T형 채널을 특이적으로 차단하면 L형 또는 다른 채널 의존 기능에 영향을 주지 않으면서 FSH/LH 디코딩 오류를 소멸시켜야 한다.",
        discriminating: true,
      },
    ],

    seeAlso: "참고 항목",
    modulomeOverview: "모듈롬 개요",
    evidencePortal: "증거 등록부",
    citationLabel: "인용",
    yearLabel: "연도",
    findingLabel: "발견",
    levelLabel: "수준",
    cellLabel: "세포 유형",
    functionLabel: "기능",
    mechanismLabel: "메커니즘",
    hormoneLabel: "호르몬",
    discriminatingBadge: "변별적",
    allPredictions: "모든 예측 →",
  },
};

const LEVEL_BADGE: Record<string, string> = {
  E: "bg-green-500/10 text-green-600 dark:text-green-400",
  "M|C": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
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

export default async function PituitaryPage({
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

      <PageHeader icon={Brain} title={d.title} subtitle={d.subtitle} />

      {/* 01 — Hero: Outside the BBB */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <article id="outside-bbb" className="scroll-mt-24">
          <h3 className="text-lg font-semibold mb-4">
            <span className="font-mono-num text-xs text-accent mr-2">01</span>
            {d.s1Title}
          </h3>
          <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
            {d.s1p1}
          </p>
          <div className="space-y-3 text-sm text-foreground-muted leading-relaxed">
            <p>{d.s1p2}</p>
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

        <div className="grid gap-6 md:grid-cols-2">
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
                  {ch.mechanism}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.hormoneLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed font-medium">
                  {ch.hormone}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-foreground-muted leading-relaxed max-w-4xl border-l-2 border-accent/20 pl-3">
          {d.s2Note}
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
            {d.s3p1}
          </p>
          <p>{d.s3p2}</p>
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

        <ul className="space-y-2 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s5Criteria.map((c, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>
                <span className="font-mono text-xs font-medium text-foreground">
                  {c.split(" — ")[0]}
                </span>
                {" — "}
                {c.split(" — ")[1]}
              </span>
            </li>
          ))}
        </ul>

        <div className="bg-card rounded-lg border border-card-border p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s5p2}
          </p>
        </div>
      </section>

      {/* 06 — Predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <div className="space-y-4">
          {d.s6Predictions.map((p) => (
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
                {p.text}
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
