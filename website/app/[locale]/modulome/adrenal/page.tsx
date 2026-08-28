import type { Metadata } from "next";
import Link from "next/link";
import { Activity } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";

const COPY = {
  en: {
    title: "Adrenal",
    subtitle:
      "Cav3.2 in zona glomerulosa — aldosterone synthesis drives EMF-linked hypertension",
    backLink: "← Back to Modulome",

    s1SectionTitle: "Adrenal Cortex and Cav3.2",

    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "Cav3.2 (T-type)",
    geneVal: "CACNA1H",
    cellTypeVal: "Zona glomerulosa cell → Aldosterone",
    functionVal: "Aldosterone synthesis → sodium retention → blood pressure regulation",
    levelVal: "M|C",

    s2Title: "Aldosterone Synthesis Mechanism",
    s2p1:
      "The zona glomerulosa is the outermost layer of the adrenal cortex. Its cells produce aldosterone — the primary mineralocorticoid hormone that regulates sodium retention, potassium excretion, and ultimately blood pressure. Aldosterone synthesis in glomerulosa cells is critically dependent on Cav3.2 (CACNA1H) T-type voltage-gated calcium channels.",
    s2p2:
      "Cav3.2 channels in glomerulosa cells have a distinctive biophysical property: they operate at resting membrane potential through a phenomenon called window current. At the intersection of activation and inactivation voltage curves, a small but continuous Ca²⁺ influx occurs without any depolarizing stimulus. This means Cav3.2 channels are tonically active — and therefore continuously sensitive to EMF perturbation.",
    s2p3:
      "EMF → Cav3.2 perturbation → aldosterone dysregulation → sodium/potassium imbalance. Because the channel operates at resting potential, even small EMF-induced voltage shifts produce measurable changes in aldosterone output. The adrenal glands sit outside the blood-brain barrier, meaning they are directly exposed to circulating electromagnetic fields.",

    s2SectionTitle: "Hypertension Mechanism",

    s3Title: "Aldosterone–Blood Pressure Pathway",
    s3Chain:
      "EMF → Cav3.2 ↑ → Aldosterone ↑ → Na⁺ retention → H₂O retention → Blood volume ↑ → Blood pressure ↑",
    s3Text:
      "Chronic Cav3.2 perturbation leads to sustained aldosterone elevation. Elevated aldosterone drives sodium retention in the kidneys, which obligatorily draws water into the vasculature, expanding blood volume. Increased blood volume raises blood pressure. This is not a transient effect — chronic EMF exposure produces chronic aldosterone elevation, resulting in sustained hypertension that persists as long as the exposure continues.",

    s4Title: "Dual Hypertension Pathways",
    s4p1:
      "The BERM framework identifies two parallel, independent EMF → hypertension pathways. The cardiac pathway operates through Cav3.1 T-type channels in the SA node, where EMF perturbation alters heart rate and cardiac output. The adrenal pathway operates through Cav3.2 in the zona glomerulosa, where EMF perturbation elevates aldosterone and blood volume.",
    s4p2:
      "These are mechanistically independent: one controls cardiac rate (output), the other controls vascular volume (preload). Both converge on elevated blood pressure. This dual-pathway architecture means EMF-induced hypertension is more robust and harder to treat than single-mechanism hypertension — blocking one pathway leaves the other intact.",

    s3SectionTitle: "Cortisol and HPA Axis",

    s5Title: "Cortisol Dysregulation",
    s5p1:
      "The zona fasciculata, the middle layer of the adrenal cortex, produces cortisol — the primary glucocorticoid and stress hormone. Cortisol secretion is stimulated by ACTH from the pituitary, and voltage-gated calcium channels participate in ACTH-stimulated cortisol release. Chronic EMF exposure may dysregulate this process, contributing to chronic stress physiology.",
    s5p2:
      "Cortisol directly suppresses GnRH pulsatility at the hypothalamus, reducing LH and FSH secretion from the pituitary. This connects adrenal cortisol dysregulation to the BERM reproductive pathway: chronic EMF → cortisol elevation → GnRH suppression → reduced gonadotropin release → impaired fertility. Stress-related infertility is a well-documented clinical phenomenon — the BERM framework provides a specific EMF-mediated mechanism.",

    s4SectionTitle: "Evidence and Predictions",

    s6Title: "Epidemiological Context",
    s6Stats: [
      "Cav3.2 in zona glomerulosa cells is well-established in endocrinology literature as the primary calcium channel driving aldosterone synthesis",
      "Blood pressure elevation has been documented in EMF-exposed animals — cell phone EMF for 4-8 weeks significantly increased systolic blood pressure in all exposed rats",
      "Hypertension is rising globally, with increasing prevalence in younger populations where it was historically rare",
      "Aldosterone antagonists (spironolactone, eplerenone) are standard antihypertensive treatment — confirming the aldosterone-mediated mechanism is clinically recognized",
    ],

    s7Title: "BERM Predictions",
    s7Text:
      "The BERM framework generates two specific, testable predictions for the adrenal modulome:",
    s7Predictions: [
      {
        id: "ADRENAL-1",
        text: "EMF exposure at mobile phone frequencies elevates serum aldosterone in controlled human or animal studies, with the effect persisting for the duration of exposure and reversing upon cessation. The elevation is blocked by T-type calcium channel antagonists (e.g., mibefradil, TTA-P2).",
        discriminating: true,
      },
      {
        id: "ADRENAL-2",
        text: "Hypertension prevalence in young adults (18–35) correlates with national EMF density (cell tower density × average mobile phone use) after controlling for salt intake, obesity, physical activity, and genetic predisposition. The correlation is specific to volume-mediated (aldosterone-driven) hypertension rather than vascular resistance hypertension.",
        discriminating: true,
      },
    ],

    references: "Key References",
    refs: [
      {
        id: "glomerulosa-cav32-aldosterone",
        citation: "Journal of Molecular Endocrinology — Cav3.2 and Aldosterone",
        referenceId: "glomerulosa_cav32_aldosterone",
        finding:
          "T-type Cav3.2 calcium channels in zona glomerulosa cells provide window current at resting potential, driving tonic aldosterone synthesis. Channel blockade or knockout abolishes aldosterone production.",
      },
      {
        id: "mohamed-emf-blood-pressure",
        citation: "Mohamed et al. — EMF and Blood Pressure",
        referenceId: "mohamed-bp-emf",
        finding:
          "Cell phone EMF exposure for 4–8 weeks significantly increased systolic blood pressure in all exposed rats. Plasma renin activity increased dose-dependently, consistent with renin-angiotensin-aldosterone system activation.",
      },
    ],

    seeAlso: "See also",
    heartModulome: "Heart modulome",
    predictionsPage: "Predictions — ADRENAL-1/2",
    evidencePage: "Evidence register",
    discriminatingLabel: "Discriminating",
    allPredictionsLink: "All predictions →",
  },
  fi: {
    title: "Lisämunuainen",
    subtitle:
      "Cav3.2 zona glomerulosassa — aldosteronisynteesi ajaa EMF-yhdistettyä verenpainetautia",
    backLink: "← Takaisin moduloomiin",

    s1SectionTitle: "Lisämunuaiskuori ja Cav3.2",

    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    channelVal: "Cav3.2 (T-tyyppi)",
    geneVal: "CACNA1H",
    cellTypeVal: "Glomerulosasolu → Aldosteroni",
    functionVal: "Aldosteronisynteesi → natriumretentio → verenpaineen säätely",
    levelVal: "M|C",

    s2Title: "Aldosteronisynteesin mekanismi",
    s2p1:
      "Zona glomerulosa on lisämunuaiskuoren uloin kerros. Sen solut tuottavat aldosteronia — ensisijaista mineralokortikoidihormonia joka säätelee natriumretentiota, kaliumin eritystä ja viime kädessä verenpainetta. Aldosteronisynteesi glomerulosasoluissa on kriittisesti riippuvainen Cav3.2 (CACNA1H) T-tyypin jänniteohjatuista kalsiumkanavista.",
    s2p2:
      "Cav3.2-kanavilla glomerulosasoluissa on erottuva biofysikaalinen ominaisuus: ne toimivat lepokalvopotentiaalissa ilmiön nimeltä ikkunavirta kautta. Aktivaatio- ja inaktivaatiojännitekäyrien leikkauspisteessä tapahtuu pieni mutta jatkuva Ca²⁺-sisäänvirtaus ilman depolarisoivaa ärsykettä. Tämä tarkoittaa että Cav3.2-kanavat ovat tonisesti aktiivisia — ja siten jatkuvasti herkkiä EMF-häiriöille.",
    s2p3:
      "EMF → Cav3.2-häiriö → aldosteronin säätelyn häiriö → natrium/kalium-epätasapaino. Koska kanava toimii lepopotentiaalissa, pienetkin EMF:n aiheuttamat jännitemuutokset tuottavat mitattavia muutoksia aldosteronierityksessä. Lisämunuaiset sijaitsevat veri-aivoesteen ulkopuolella, mikä tarkoittaa niiden altistuvan suoraan kiertäville sähkömagneettisille kentille.",

    s2SectionTitle: "Verenpainemekanismi",

    s3Title: "Aldosteroni–verenpainereitti",
    s3Chain:
      "EMF → Cav3.2 ↑ → Aldosteroni ↑ → Na⁺-retentio → H₂O-retentio → Veritilavuus ↑ → Verenpaine ↑",
    s3Text:
      "Krooninen Cav3.2-häiriö johtaa jatkuvaan aldosteronin kohoamiseen. Kohonnut aldosteroni ajaa natriumretentiota munuaisissa, mikä väistämättä vetää vettä verisuonistoon laajentaen veritilavuutta. Kasvanut veritilavuus nostaa verenpainetta. Kyseessä ei ole ohimenevä vaikutus — krooninen EMF-altistus tuottaa kroonisen aldosteronikohoamisen, johtaen jatkuvaan verenpainetautiin niin kauan kuin altistus jatkuu.",

    s4Title: "Kaksi rinnakkaista verenpainereittiä",
    s4p1:
      "BERM-kehys tunnistaa kaksi rinnakkaista, toisistaan riippumatonta EMF → verenpainetautireittia. Sydänreitti toimii SA-solmukkeen Cav3.1-tyypin T-kanavien kautta, joissa EMF-häiriö muuttaa sykettä ja sydämen minuuttitilavuutta. Lisämunuaisreitti toimii zona glomerulosan Cav3.2:n kautta, jossa EMF-häiriö nostaa aldosteronia ja veritilavuutta.",
    s4p2:
      "Nämä ovat mekanistisesti riippumattomia: toinen kontrolloi sydämen sykettä (minuuttitilavuus), toinen verisuoniston tilavuutta (esikuorma). Molemmat konvergoituvat kohonneeseen verenpaineeseen. Tämä kaksoisreittiarkkitehtuuri tarkoittaa että EMF-indusoitu verenpainetauti on vahvempi ja vaikeammin hoidettava kuin yhden mekanismin verenpainetauti — yhden reitin estäminen jättää toisen ennalleen.",

    s3SectionTitle: "Kortisoli ja HPA-akseli",

    s5Title: "Kortisolin säätelyn häiriö",
    s5p1:
      "Zona fasciculata, lisämunuaiskuoren keskikerros, tuottaa kortisolia — ensisijaista glukokortikoidia ja stressihormonia. Kortisolin eritystä stimuloi aivolisäkkeen ACTH, ja jänniteohjatut kalsiumkanavat osallistuvat ACTH-stimuloituun kortisolivapautukseen. Krooninen EMF-altistus voi häiritä tätä prosessia, edistäen kroonista stressifysiologiaa.",
    s5p2:
      "Kortisoli suoraan vaimentaa GnRH-pulsatiliteettia hypotalamuksessa, vähentäen LH:n ja FSH:n eritystä aivolisäkkeestä. Tämä yhdistää lisämunuaisen kortisolin säätelyn häiriön BERM:n lisääntymisreittiin: krooninen EMF → kortisolin kohoaminen → GnRH:n vaimentuminen → gonadotropiinierityksen väheneminen → hedelmällisyyden heikkeneminen. Stressiin liittyvä hedelmättömyys on hyvin dokumentoitu kliininen ilmiö — BERM-kehys tarjoaa spesifisen EMF-välitteisen mekanismin.",

    s4SectionTitle: "Evidenssi ja ennusteet",

    s6Title: "Epidemiologinen konteksti",
    s6Stats: [
      "Cav3.2 zona glomerulosan soluissa on vakiintunut endokrinologian kirjallisuudessa ensisijaisena aldosteronisynteesiä ohjaavana kalsiumkanavana",
      "Verenpaineen kohoaminen on dokumentoitu EMF-altistuneilla eläimillä — matkapuhelimen EMF 4-8 viikkoa nosti merkittävästi systolista verenpainetta kaikilla altistuneilla rotilla",
      "Verenpainetauti yleistyy maailmanlaajuisesti, esiintyvyys kasvaa nuoremmissa ikäryhmissä joissa se oli historiallisesti harvinaista",
      "Aldosteroniantagonistit (spironolaktoni, eplerenoni) ovat vakioverenpainelääkitystä — vahvistaen aldosteronivälitteisen mekanismin kliinisen tunnustamisen",
    ],

    s7Title: "BERM-ennusteet",
    s7Text:
      "BERM-kehys tuottaa kaksi spesifistä, testattavaa ennustetta lisämunuaisen moduloomille:",
    s7Predictions: [
      {
        id: "ADRENAL-1",
        text: "EMF-altistus matkapuhelintaajuuksilla nostaa seerumin aldosteronia kontrolloiduissa ihmis- tai eläintutkimuksissa. Vaikutus säilyy altistuksen ajan ja palautuu lopettamisen jälkeen. Kohoamisen estää T-tyypin kalsiumkanava-antagonistit (esim. mibefradiili, TTA-P2).",
        discriminating: true,
      },
      {
        id: "ADRENAL-2",
        text: "Verenpainetaudin esiintyvyys nuorilla aikuisilla (18–35) korreloi kansallisen EMF-tiheyden kanssa (tukiasematiheys × keskimääräinen matkapuhelinkäyttö) suolan, lihavuuden, fyysisen aktiivisuuden ja geneettisen alttiuden kontrolloinnin jälkeen. Korrelaatio on spesifinen tilavuusvälitteiselle (aldosteroniajateiselle) verenpainetaudille eikä vaskulaarisen resistenssin verenpainetaudille.",
        discriminating: true,
      },
    ],

    references: "Keskeiset viitteet",
    refs: [
      {
        id: "glomerulosa-cav32-aldosterone",
        citation: "Journal of Molecular Endocrinology — Cav3.2 ja aldosteroni",
        referenceId: "glomerulosa_cav32_aldosterone",
        finding:
          "T-tyypin Cav3.2-kalsiumkanavat zona glomerulosan soluissa tarjoavat ikkunavirran lepopotentiaalissa, ajaen tonista aldosteronisynteesiä. Kanavan esto tai poistogeenisuus eliminoi aldosteronituotannon.",
      },
      {
        id: "mohamed-emf-blood-pressure",
        citation: "Mohamed ym. — EMF ja verenpaine",
        referenceId: "mohamed-bp-emf",
        finding:
          "Matkapuhelimen EMF-altistus 4–8 viikkoa nosti merkittävästi systolista verenpainetta kaikilla altistuneilla rotilla. Plasman reniiniaktiivisuus nousi annosriippuvaisesti, yhteensopivasti reniini-angiotensiini-aldosteronijärjestelmän aktivaation kanssa.",
      },
    ],

    seeAlso: "Katso myös",
    heartModulome: "Sydämen moduloomi",
    predictionsPage: "Ennusteet — ADRENAL-1/2",
    evidencePage: "Evidenssirekisteri",
    discriminatingLabel: "Erotteleva",
    allPredictionsLink: "Kaikki ennusteet →",
  },
  ja: {
    title: "副腎",
    subtitle:
      "球状帯のCav3.2 — アルドステロン合成がEMF関連高血圧を駆動する",
    backLink: "← モジュロームに戻る",

    s1SectionTitle: "副腎皮質とCav3.2",

    channelProfile: "チャネルプロファイル",
    channel: "チャネル",
    gene: "遺伝子",
    cellType: "細胞型",
    function: "機能",
    level: "エビデンスレベル",
    channelVal: "Cav3.2 (T型)",
    geneVal: "CACNA1H",
    cellTypeVal: "球状帯細胞 → アルドステロン",
    functionVal: "アルドステロン合成 → ナトリウム貯留 → 血圧調節",
    levelVal: "M|C",

    s2Title: "アルドステロン合成メカニズム",
    s2p1:
      "球状帯は副腎皮質の最外層である。その細胞はアルドステロン — ナトリウム貯留、カリウム排泄、そして最終的に血圧を調節する主要なミネラルコルチコイドホルモン — を産生する。球状帯細胞におけるアルドステロン合成は、Cav3.2（CACNA1H）T型電位依存性カルシウムチャネルに決定的に依存している。",
    s2p2:
      "球状帯細胞のCav3.2チャネルは独特の生物物理学的特性を持つ：ウィンドウ電流と呼ばれる現象を通じて静止膜電位で動作する。活性化と不活性化の電圧曲線の交差点で、脱分極刺激なしに小さいが持続的なCa²⁺流入が起こる。これはCav3.2チャネルが持続的に活性であること — したがってEMF摂動に継続的に感受性があることを意味する。",
    s2p3:
      "EMF → Cav3.2摂動 → アルドステロン調節障害 → ナトリウム/カリウム不均衡。チャネルが静止電位で動作するため、小さなEMF誘発性電圧変化でもアルドステロン出力に測定可能な変化をもたらす。副腎は血液脳関門の外側に位置し、循環する電磁場に直接曝露されることを意味する。",

    s2SectionTitle: "高血圧メカニズム",

    s3Title: "アルドステロン–血圧経路",
    s3Chain:
      "EMF → Cav3.2 ↑ → アルドステロン ↑ → Na⁺貯留 → H₂O貯留 → 血液量 ↑ → 血圧 ↑",
    s3Text:
      "慢性的なCav3.2摂動は持続的なアルドステロン上昇につながる。上昇したアルドステロンは腎臓でのナトリウム貯留を促進し、それは必然的に水分を血管系に引き込み、血液量を増加させる。血液量の増加は血圧を上昇させる。これは一過性の効果ではない — 慢性EMF曝露は慢性的なアルドステロン上昇を生み、曝露が続く限り持続する高血圧をもたらす。",

    s4Title: "二重高血圧経路",
    s4p1:
      "BERMフレームワークは、2つの並行する独立したEMF → 高血圧経路を特定している。心臓経路はSA結節のCav3.1 T型チャネルを介して作動し、EMF摂動が心拍数と心拍出量を変化させる。副腎経路は球状帯のCav3.2を介して作動し、EMF摂動がアルドステロンと血液量を上昇させる。",
    s4p2:
      "これらはメカニズム的に独立している：一方は心拍数（拍出量）を制御し、他方は血管容量（前負荷）を制御する。両方とも血圧上昇に収束する。この二重経路アーキテクチャは、EMF誘発性高血圧が単一メカニズムの高血圧よりも頑健で治療が困難であることを意味する — 一方の経路を遮断しても他方は無傷のまま残る。",

    s3SectionTitle: "コルチゾールとHPA軸",

    s5Title: "コルチゾール調節障害",
    s5p1:
      "副腎皮質の中間層である束状帯は、コルチゾール — 主要な糖質コルチコイドおよびストレスホルモン — を産生する。コルチゾール分泌は下垂体からのACTHによって刺激され、電位依存性カルシウムチャネルがACTH刺激によるコルチゾール放出に関与する。慢性EMF曝露はこのプロセスを調節障害し、慢性ストレス生理に寄与する可能性がある。",
    s5p2:
      "コルチゾールは視床下部でGnRHパルス性を直接抑制し、下垂体からのLHおよびFSH分泌を減少させる。これは副腎コルチゾール調節障害をBERMの生殖経路に接続する：慢性EMF → コルチゾール上昇 → GnRH抑制 → ゴナドトロピン放出減少 → 生殖能力低下。ストレス関連不妊は十分に文書化された臨床現象である — BERMフレームワークは特定のEMF媒介メカニズムを提供する。",

    s4SectionTitle: "エビデンスと予測",

    s6Title: "疫学的文脈",
    s6Stats: [
      "球状帯細胞におけるCav3.2は、アルドステロン合成を駆動する主要なカルシウムチャネルとして内分泌学文献で確立されている",
      "EMF曝露動物で血圧上昇が記録されている — 携帯電話EMFを4〜8週間照射したすべてのラットで収縮期血圧が有意に上昇した",
      "高血圧は世界的に増加しており、歴史的にまれだった若年集団での有病率が増加している",
      "アルドステロン拮抗薬（スピロノラクトン、エプレレノン）は標準的な降圧治療である — アルドステロン媒介メカニズムが臨床的に認識されていることを確認している",
    ],

    s7Title: "BERM予測",
    s7Text:
      "BERMフレームワークは、副腎モジュロームに対して2つの特定の検証可能な予測を生成する：",
    s7Predictions: [
      {
        id: "ADRENAL-1",
        text: "携帯電話周波数でのEMF曝露は、制御されたヒトまたは動物実験において血清アルドステロンを上昇させ、その効果は曝露期間中持続し、中止により回復する。この上昇はT型カルシウムチャネル拮抗薬（例：ミベフラジル、TTA-P2）によって遮断される。",
        discriminating: true,
      },
      {
        id: "ADRENAL-2",
        text: "若年成人（18〜35歳）の高血圧有病率は、塩分摂取、肥満、身体活動、遺伝的素因を制御した後、国家EMF密度（基地局密度×平均携帯電話使用量）と相関する。この相関は血管抵抗性高血圧ではなく、容量媒介型（アルドステロン駆動型）高血圧に特異的である。",
        discriminating: true,
      },
    ],

    references: "主要参考文献",
    refs: [
      {
        id: "glomerulosa-cav32-aldosterone",
        citation: "Journal of Molecular Endocrinology — Cav3.2とアルドステロン",
        referenceId: "glomerulosa_cav32_aldosterone",
        finding:
          "球状帯細胞のT型Cav3.2カルシウムチャネルは静止電位でウィンドウ電流を提供し、持続的なアルドステロン合成を駆動する。チャネルの遮断またはノックアウトはアルドステロン産生を消失させる。",
      },
      {
        id: "mohamed-emf-blood-pressure",
        citation: "Mohamed et al. — EMFと血圧",
        referenceId: "mohamed-bp-emf",
        finding:
          "4〜8週間の携帯電話EMF曝露は、すべての曝露ラットで収縮期血圧を有意に上昇させた。血漿レニン活性は用量依存的に増加し、レニン・アンジオテンシン・アルドステロン系の活性化と一致していた。",
      },
    ],

    seeAlso: "関連項目",
    heartModulome: "心臓モジュローム",
    predictionsPage: "予測 — ADRENAL-1/2",
    evidencePage: "エビデンスレジスター",
    discriminatingLabel: "識別的",
    allPredictionsLink: "すべての予測 →",
  },
  fr: {
    title: "Surrénale",
    subtitle:
      "Cav3.2 dans la zona glomerulosa — la synthèse d'aldostérone entraîne l'hypertension liée aux EMF",
    backLink: "← Retour au Modulome",

    s1SectionTitle: "Cortex surrénalien et Cav3.2",

    channelProfile: "Profil du canal",
    channel: "Canal",
    gene: "Gène",
    cellType: "Type cellulaire",
    function: "Fonction",
    level: "Niveau de preuve",
    channelVal: "Cav3.2 (type T)",
    geneVal: "CACNA1H",
    cellTypeVal: "Cellule de la zona glomerulosa → Aldostérone",
    functionVal: "Synthèse d'aldostérone → rétention sodique → régulation de la pression artérielle",
    levelVal: "M|C",

    s2Title: "Mécanisme de synthèse de l'aldostérone",
    s2p1:
      "La zona glomerulosa est la couche la plus externe du cortex surrénalien. Ses cellules produisent l'aldostérone — la principale hormone minéralocorticoïde qui régule la rétention sodique, l'excrétion du potassium et en fin de compte la pression artérielle. La synthèse d'aldostérone dans les cellules glomérulées dépend de manière critique des canaux calciques voltage-dépendants de type T Cav3.2 (CACNA1H).",
    s2p2:
      "Les canaux Cav3.2 dans les cellules glomérulées possèdent une propriété biophysique distinctive : ils fonctionnent au potentiel de membrane de repos grâce à un phénomène appelé courant de fenêtre. À l'intersection des courbes de tension d'activation et d'inactivation, un influx de Ca²⁺ faible mais continu se produit sans stimulus dépolarisant. Cela signifie que les canaux Cav3.2 sont toniquement actifs — et donc continuellement sensibles à la perturbation par les EMF.",
    s2p3:
      "EMF → perturbation de Cav3.2 → dysrégulation de l'aldostérone → déséquilibre sodium/potassium. Comme le canal fonctionne au potentiel de repos, même de petits décalages de tension induits par les EMF produisent des changements mesurables dans la production d'aldostérone. Les glandes surrénales se situent en dehors de la barrière hémato-encéphalique, ce qui signifie qu'elles sont directement exposées aux champs électromagnétiques circulants.",

    s2SectionTitle: "Mécanisme d'hypertension",

    s3Title: "Voie aldostérone–pression artérielle",
    s3Chain:
      "EMF → Cav3.2 ↑ → Aldostérone ↑ → Rétention de Na⁺ → Rétention de H₂O → Volume sanguin ↑ → Pression artérielle ↑",
    s3Text:
      "La perturbation chronique de Cav3.2 entraîne une élévation soutenue de l'aldostérone. L'aldostérone élevée favorise la rétention sodique dans les reins, ce qui attire obligatoirement l'eau dans la vasculature, augmentant le volume sanguin. L'augmentation du volume sanguin élève la pression artérielle. Ce n'est pas un effet transitoire — l'exposition chronique aux EMF produit une élévation chronique de l'aldostérone, entraînant une hypertension soutenue qui persiste tant que l'exposition se poursuit.",

    s4Title: "Doubles voies d'hypertension",
    s4p1:
      "Le cadre BERM identifie deux voies parallèles et indépendantes EMF → hypertension. La voie cardiaque opère via les canaux T de type Cav3.1 dans le nœud SA, où la perturbation par les EMF altère la fréquence cardiaque et le débit cardiaque. La voie surrénalienne opère via Cav3.2 dans la zona glomerulosa, où la perturbation par les EMF élève l'aldostérone et le volume sanguin.",
    s4p2:
      "Celles-ci sont mécanistiquement indépendantes : l'une contrôle la fréquence cardiaque (débit), l'autre contrôle le volume vasculaire (précharge). Les deux convergent vers une pression artérielle élevée. Cette architecture à double voie signifie que l'hypertension induite par les EMF est plus robuste et plus difficile à traiter que l'hypertension à mécanisme unique — bloquer une voie laisse l'autre intacte.",

    s3SectionTitle: "Cortisol et axe HPA",

    s5Title: "Dysrégulation du cortisol",
    s5p1:
      "La zona fasciculata, la couche médiane du cortex surrénalien, produit le cortisol — le principal glucocorticoïde et hormone du stress. La sécrétion de cortisol est stimulée par l'ACTH de l'hypophyse, et les canaux calciques voltage-dépendants participent à la libération de cortisol stimulée par l'ACTH. L'exposition chronique aux EMF peut dysréguler ce processus, contribuant à une physiologie de stress chronique.",
    s5p2:
      "Le cortisol supprime directement la pulsatilité de la GnRH à l'hypothalamus, réduisant la sécrétion de LH et FSH par l'hypophyse. Cela relie la dysrégulation du cortisol surrénalien à la voie reproductive de BERM : EMF chronique → élévation du cortisol → suppression de la GnRH → réduction de la libération des gonadotrophines → altération de la fertilité. L'infertilité liée au stress est un phénomène clinique bien documenté — le cadre BERM fournit un mécanisme spécifique médié par les EMF.",

    s4SectionTitle: "Preuves et prédictions",

    s6Title: "Contexte épidémiologique",
    s6Stats: [
      "Cav3.2 dans les cellules de la zona glomerulosa est bien établi dans la littérature endocrinologique comme le principal canal calcique pilotant la synthèse d'aldostérone",
      "L'élévation de la pression artérielle a été documentée chez des animaux exposés aux EMF — les EMF de téléphone portable pendant 4 à 8 semaines ont significativement augmenté la pression artérielle systolique chez tous les rats exposés",
      "L'hypertension augmente à l'échelle mondiale, avec une prévalence croissante dans les populations plus jeunes où elle était historiquement rare",
      "Les antagonistes de l'aldostérone (spironolactone, éplérénone) constituent un traitement antihypertenseur standard — confirmant que le mécanisme médié par l'aldostérone est cliniquement reconnu",
    ],

    s7Title: "Prédictions BERM",
    s7Text:
      "Le cadre BERM génère deux prédictions spécifiques et testables pour le modulome surrénalien :",
    s7Predictions: [
      {
        id: "ADRENAL-1",
        text: "L'exposition aux EMF aux fréquences de téléphonie mobile élève l'aldostérone sérique dans des études humaines ou animales contrôlées, l'effet persistant pendant la durée de l'exposition et s'inversant à l'arrêt. L'élévation est bloquée par les antagonistes des canaux calciques de type T (ex. mibéfradil, TTA-P2).",
        discriminating: true,
      },
      {
        id: "ADRENAL-2",
        text: "La prévalence de l'hypertension chez les jeunes adultes (18–35 ans) corrèle avec la densité nationale d'EMF (densité d'antennes × utilisation moyenne du téléphone portable) après contrôle de la consommation de sel, de l'obésité, de l'activité physique et de la prédisposition génétique. La corrélation est spécifique à l'hypertension à médiation volumique (pilotée par l'aldostérone) plutôt qu'à l'hypertension par résistance vasculaire.",
        discriminating: true,
      },
    ],

    references: "Références clés",
    refs: [
      {
        id: "glomerulosa-cav32-aldosterone",
        citation: "Journal of Molecular Endocrinology — Cav3.2 et aldostérone",
        referenceId: "glomerulosa_cav32_aldosterone",
        finding:
          "Les canaux calciques Cav3.2 de type T dans les cellules de la zona glomerulosa fournissent un courant de fenêtre au potentiel de repos, entraînant la synthèse tonique d'aldostérone. Le blocage ou le knockout du canal abolit la production d'aldostérone.",
      },
      {
        id: "mohamed-emf-blood-pressure",
        citation: "Mohamed et al. — EMF et pression artérielle",
        referenceId: "mohamed-bp-emf",
        finding:
          "L'exposition aux EMF de téléphone portable pendant 4 à 8 semaines a significativement augmenté la pression artérielle systolique chez tous les rats exposés. L'activité de la rénine plasmatique a augmenté de manière dose-dépendante, compatible avec l'activation du système rénine-angiotensine-aldostérone.",
      },
    ],

    seeAlso: "Voir aussi",
    heartModulome: "Modulome cardiaque",
    predictionsPage: "Prédictions — ADRENAL-1/2",
    evidencePage: "Registre des preuves",
    discriminatingLabel: "Discriminant",
    allPredictionsLink: "Toutes les prédictions →",
  },
  ko: {
    title: "부신",
    subtitle:
      "사구체대의 Cav3.2 — 알도스테론 합성이 EMF 관련 고혈압을 유발한다",
    backLink: "← 모듈롬으로 돌아가기",

    s1SectionTitle: "부신 피질과 Cav3.2",

    channelProfile: "채널 프로파일",
    channel: "채널",
    gene: "유전자",
    cellType: "세포 유형",
    function: "기능",
    level: "증거 수준",
    channelVal: "Cav3.2 (T형)",
    geneVal: "CACNA1H",
    cellTypeVal: "사구체대 세포 → 알도스테론",
    functionVal: "알도스테론 합성 → 나트륨 저류 → 혈압 조절",
    levelVal: "M|C",

    s2Title: "알도스테론 합성 메커니즘",
    s2p1:
      "사구체대는 부신 피질의 최외층이다. 그 세포들은 알도스테론 — 나트륨 저류, 칼륨 배설, 궁극적으로 혈압을 조절하는 주요 미네랄코르티코이드 호르몬 — 을 생산한다. 사구체대 세포에서의 알도스테론 합성은 Cav3.2 (CACNA1H) T형 전압 의존성 칼슘 채널에 결정적으로 의존한다.",
    s2p2:
      "사구체대 세포의 Cav3.2 채널은 독특한 생물물리학적 특성을 가진다: 윈도우 전류라는 현상을 통해 안정 막전위에서 작동한다. 활성화와 불활성화 전압 곡선의 교차점에서, 탈분극 자극 없이 작지만 지속적인 Ca²⁺ 유입이 발생한다. 이는 Cav3.2 채널이 지속적으로 활성 상태임을 — 따라서 EMF 교란에 지속적으로 민감함을 의미한다.",
    s2p3:
      "EMF → Cav3.2 교란 → 알도스테론 조절 장애 → 나트륨/칼륨 불균형. 채널이 안정 전위에서 작동하기 때문에, 작은 EMF 유발 전압 변화도 알도스테론 출력에 측정 가능한 변화를 일으킨다. 부신은 혈액-뇌 장벽 바깥에 위치하여, 순환하는 전자기장에 직접 노출된다.",

    s2SectionTitle: "고혈압 메커니즘",

    s3Title: "알도스테론–혈압 경로",
    s3Chain:
      "EMF → Cav3.2 ↑ → 알도스테론 ↑ → Na⁺ 저류 → H₂O 저류 → 혈액량 ↑ → 혈압 ↑",
    s3Text:
      "만성적인 Cav3.2 교란은 지속적인 알도스테론 상승으로 이어진다. 상승된 알도스테론은 신장에서 나트륨 저류를 촉진하고, 이는 필연적으로 수분을 혈관계로 끌어들여 혈액량을 증가시킨다. 혈액량 증가는 혈압을 상승시킨다. 이것은 일시적 효과가 아니다 — 만성 EMF 노출은 만성 알도스테론 상승을 일으키며, 노출이 계속되는 한 지속되는 고혈압을 초래한다.",

    s4Title: "이중 고혈압 경로",
    s4p1:
      "BERM 프레임워크는 두 개의 병렬적이고 독립적인 EMF → 고혈압 경로를 식별한다. 심장 경로는 SA 결절의 Cav3.1 T형 채널을 통해 작동하며, EMF 교란이 심박수와 심박출량을 변화시킨다. 부신 경로는 사구체대의 Cav3.2를 통해 작동하며, EMF 교란이 알도스테론과 혈액량을 상승시킨다.",
    s4p2:
      "이들은 메커니즘적으로 독립적이다: 하나는 심박수(출력)를 제어하고, 다른 하나는 혈관 용적(전부하)을 제어한다. 둘 다 혈압 상승으로 수렴한다. 이 이중 경로 아키텍처는 EMF 유발 고혈압이 단일 메커니즘 고혈압보다 더 견고하고 치료하기 어렵다는 것을 의미한다 — 하나의 경로를 차단해도 다른 경로는 그대로 남는다.",

    s3SectionTitle: "코르티솔과 HPA 축",

    s5Title: "코르티솔 조절 장애",
    s5p1:
      "부신 피질의 중간층인 속상대는 코르티솔 — 주요 당질코르티코이드이자 스트레스 호르몬 — 을 생산한다. 코르티솔 분비는 뇌하수체의 ACTH에 의해 자극되며, 전압 의존성 칼슘 채널이 ACTH 자극에 의한 코르티솔 방출에 관여한다. 만성 EMF 노출은 이 과정을 조절 장애하여 만성 스트레스 생리에 기여할 수 있다.",
    s5p2:
      "코르티솔은 시상하부에서 GnRH 박동성을 직접 억제하여, 뇌하수체에서의 LH 및 FSH 분비를 감소시킨다. 이것은 부신 코르티솔 조절 장애를 BERM 생식 경로에 연결한다: 만성 EMF → 코르티솔 상승 → GnRH 억제 → 생식선자극호르몬 방출 감소 → 생식능력 저하. 스트레스 관련 불임은 잘 문서화된 임상 현상이다 — BERM 프레임워크는 특정한 EMF 매개 메커니즘을 제공한다.",

    s4SectionTitle: "증거와 예측",

    s6Title: "역학적 맥락",
    s6Stats: [
      "사구체대 세포의 Cav3.2는 알도스테론 합성을 주도하는 주요 칼슘 채널로서 내분비학 문헌에서 잘 확립되어 있다",
      "EMF 노출 동물에서 혈압 상승이 기록되었다 — 4~8주간의 휴대전화 EMF가 모든 노출 쥐에서 수축기 혈압을 유의하게 증가시켰다",
      "고혈압은 전 세계적으로 증가하고 있으며, 역사적으로 드물었던 젊은 인구에서 유병률이 증가하고 있다",
      "알도스테론 길항제(스피로노락톤, 에플레레논)는 표준 항고혈압 치료제이다 — 알도스테론 매개 메커니즘이 임상적으로 인정됨을 확인한다",
    ],

    s7Title: "BERM 예측",
    s7Text:
      "BERM 프레임워크는 부신 모듈롬에 대해 두 가지 구체적이고 검증 가능한 예측을 생성한다:",
    s7Predictions: [
      {
        id: "ADRENAL-1",
        text: "휴대전화 주파수에서의 EMF 노출은 통제된 인체 또는 동물 연구에서 혈청 알도스테론을 상승시키며, 그 효과는 노출 기간 동안 지속되고 중단 시 회복된다. 이 상승은 T형 칼슘 채널 길항제(예: 미베프라딜, TTA-P2)에 의해 차단된다.",
        discriminating: true,
      },
      {
        id: "ADRENAL-2",
        text: "젊은 성인(18~35세)의 고혈압 유병률은 소금 섭취, 비만, 신체 활동, 유전적 소인을 통제한 후 국가 EMF 밀도(기지국 밀도 × 평균 휴대전화 사용량)와 상관관계를 보인다. 이 상관관계는 혈관 저항성 고혈압이 아닌 용적 매개(알도스테론 구동) 고혈압에 특이적이다.",
        discriminating: true,
      },
    ],

    references: "주요 참고문헌",
    refs: [
      {
        id: "glomerulosa-cav32-aldosterone",
        citation: "Journal of Molecular Endocrinology — Cav3.2와 알도스테론",
        referenceId: "glomerulosa_cav32_aldosterone",
        finding:
          "사구체대 세포의 T형 Cav3.2 칼슘 채널은 안정 전위에서 윈도우 전류를 제공하여, 지속적인 알도스테론 합성을 구동한다. 채널 차단 또는 녹아웃은 알도스테론 생산을 소멸시킨다.",
      },
      {
        id: "mohamed-emf-blood-pressure",
        citation: "Mohamed et al. — EMF와 혈압",
        referenceId: "mohamed-bp-emf",
        finding:
          "4~8주간의 휴대전화 EMF 노출은 모든 노출 쥐에서 수축기 혈압을 유의하게 증가시켰다. 혈장 레닌 활성은 용량 의존적으로 증가하였으며, 이는 레닌-안지오텐신-알도스테론계 활성화와 일치한다.",
      },
    ],

    seeAlso: "참고 항목",
    heartModulome: "심장 모듈롬",
    predictionsPage: "예측 — ADRENAL-1/2",
    evidencePage: "증거 레지스터",
    discriminatingLabel: "식별적",
    allPredictionsLink: "모든 예측 →",
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

export default async function AdrenalPage({
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

      <PageHeader icon={Activity} title={d.title} subtitle={d.subtitle} />

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

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s3Text}
        </p>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s4p1}
          </p>
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s4p2}
            </p>
          </div>
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
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s5p1}
          </p>
          <p>{d.s5p2}</p>
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
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s6Stats.map((stat, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{stat}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s7Text}
        </p>

        <div className="space-y-4">
          {d.s7Predictions.map((pred) => (
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
            {d.allPredictionsLink}
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
            href={`/${locale}/modulome/heart`}
            className="text-sm text-accent hover:underline"
          >
            {d.heartModulome} &rarr;
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
