import type { Metadata } from "next";
import Link from "next/link";
import { Activity } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "The Allergy Epidemic",
    subtitle: "Mast cell degranulation is Ca²⁺-dependent: Ca²⁺ ionophores trigger degranulation WITHOUT IgE. EMF → VGCC → Ca²⁺ creates a quadruple sensitization cascade: (1) direct mast cell Ca²⁺ activation, (2) environmental estrogens sensitize mast cells, (3) cortisol → immune shift Th1→Th2, (4) gut barrier → LPS → systemic inflammation.",
    backLink: "← Back to Evidence",
    cautionText: "This page explores Ca²⁺-dependent mast cell degranulation as a mechanism for increasing allergy prevalence. While each individual mechanism is well-established, the combined cascade and its link to EMF exposure remains a BERM hypothesis.",

    calciumTitle: "The Ca²⁺ dependency",
    calciumLead: "Ca²⁺ is necessary AND sufficient for mast cell activation. This means ANY source of excess Ca²⁺ — including EMF→VGCC — can trigger allergic responses.",
    calciumSteps: [
      { step: "Ca²⁺ ionophores trigger degranulation WITHOUT IgE crosslinking", detail: "Calcium ionophores such as A23187 and ionomycin directly activate mast cells and trigger full degranulation and histamine release — completely bypassing the classical IgE/FcεRI pathway. This proves that Ca²⁺ influx alone is sufficient." },
      { step: "Ca²⁺ depletion blocks degranulation EVEN WITH IgE crosslinking", detail: "When extracellular Ca²⁺ is chelated or intracellular stores are depleted, mast cells fail to degranulate even when IgE/antigen crosslinking is complete. Ca²⁺ is not merely a cofactor — it is the obligate signal." },
      { step: "Ca²⁺ is necessary AND sufficient for mast cell activation", detail: "These two findings together establish that the Ca²⁺ signal sits at the convergence point of all mast cell activation pathways. Control Ca²⁺, control degranulation." },
      { step: "ANY source of excess Ca²⁺ — including EMF→VGCC — can trigger allergic responses", detail: "EMF activates voltage-gated calcium channels (VGCC), producing sustained intracellular Ca²⁺ elevation. Since Ca²⁺ alone is sufficient for mast cell degranulation, EMF→VGCC activation provides a direct, non-immunological trigger for allergic responses." },
    ],

    cascadeTitle: "Quadruple sensitization cascade",
    cascadeLead: "EMF does not act through a single pathway. Four converging mechanisms create a compounding sensitization cascade.",
    cascadeSteps: [
      { step: "Q1: Direct VGCC activation", detail: "EMF → Ca²⁺↑ in mast cells → lower degranulation threshold. Even sub-threshold allergen exposures that would normally be tolerated can now trigger full degranulation when baseline intracellular Ca²⁺ is already elevated by EMF→VGCC." },
      { step: "Q2: Environmental estrogens", detail: "Xenoestrogens and endocrine disruptors increase mast cell degranulation and IgE-mediated release ([[ref:env_estrogen_mast|PMC1797832]]). Estrogen receptors on mast cells amplify Ca²⁺-dependent signaling. EMF-disrupted estrogen metabolism (VK6) compounds the effect." },
      { step: "Q3: HPA/immune axis — Th1→Th2 shift", detail: "Cortisol dysregulation from EMF→HPA disruption (VK11) produces a Th1→Th2 immune shift. Th2 dominance increases IgE production and eosinophil activation — the classical allergic predisposition. Chronic cortisol elevation paradoxically promotes allergic sensitization." },
      { step: "Q4: Gut barrier → LPS → systemic inflammation", detail: "Per2↓ from EMF→circadian disruption → gut barrier integrity↓ → LPS translocation↑ → systemic inflammation primes mast cells for hyperreactivity (S14). Leaky gut delivers constant low-grade immune stimulation that lowers the activation threshold across all mast cell populations." },
    ],

    epiTitle: "Epidemiological pattern",
    epiLead: "The allergy epidemic’s temporal and geographic profile matches the EMF proliferation timeline.",
    epiPoints: [
      "Allergy prevalence increased dramatically over 30 years in developed countries — too fast for genetic change, too widespread for any single allergen.",
      "Coincides with EMF proliferation timeline: mobile networks, Wi-Fi, smart devices each correlating with successive waves of increasing prevalence.",
      "Urban > rural gradient: urban environments have both higher EMF exposure density and higher allergy prevalence. This gradient persists after controlling for pollution and hygiene.",
      "Seasonal variation correlates with vitamin D status (immunomodulatory) and seasonal EMF usage patterns (indoor exposure increases in winter months).",
    ],

    pharmaTitle: "Pharmacological validation",
    pharmaLead: "Existing allergy treatments inadvertently validate the Ca²⁺ mechanism.",
    pharmaPoints: [
      { drug: "Antihistamines", mechanism: "Block histamine receptors — treat SYMPTOMS downstream of degranulation, not the Ca²⁺-dependent cause. Patients remain sensitized.", note: "Symptom management only; does not address underlying mast cell hyperreactivity." },
      { drug: "Mast cell stabilizers (cromolyn sodium)", mechanism: "Work by reducing Ca²⁺ signaling in mast cells, preventing degranulation before it occurs. Effective precisely BECAUSE Ca²⁺ is the obligate activation signal.", note: "Mechanism of action directly validates the Ca²⁺ dependency of mast cell activation." },
      { drug: "Omalizumab (anti-IgE)", mechanism: "Blocks IgE binding to mast cells — but patients still respond to Ca²⁺ ionophores. This proves an IgE-INDEPENDENT activation pathway exists and remains active.", note: "Partial efficacy confirms that IgE is only one of multiple activation routes — Ca²⁺ influx bypasses the IgE blockade." },
    ],

    predictionText: "Prediction E-NEW-27: EMF-exposed mast cells show increased degranulation in response to sub-threshold allergen concentrations, mediated by VGCC-dependent Ca²⁺ elevation.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Allergiaepidemia",
    subtitle: "Syottösolujen degranulaatio on Ca²⁺-riippuvaista: Ca²⁺-ionoforit laukaisevat degranulaation ILMAN IgE:tä. EMF → VGCC → Ca²⁺ luo nelinkertaisen herkistymiskaskadin: (1) suora syottösolujen Ca²⁺-aktivaatio, (2) ympäristöestrogeenit herkistävät syottösoluja, (3) kortisoli → immuunisiirtymä Th1→Th2, (4) suoliston läpäiseväisyys → LPS → systeeminen tulehdus.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Tämä sivu tutkii Ca²⁺-riippuvaista syottösolujen degranulaatiota mekanismina allergioiden yleistymiselle. Jokainen yksittäinen mekanismi on hyvin vahvistettu, mutta yhdistetty kaskadi ja sen yhteys EMF-altistukseen on BERM-hypoteesi.",

    calciumTitle: "Ca²⁺-riippuvuus",
    calciumLead: "Ca²⁺ on välttämätön JA riittävä syottösolujen aktivaatiolle. Tämä tarkoittaa, että MIKÄ TAHANSA ylimääräisen Ca²⁺:n lähde — mukaan lukien EMF→VGCC — voi laukaista allergisia vasteita.",
    calciumSteps: [
      { step: "Ca²⁺-ionoforit laukaisevat degranulaation ILMAN IgE-ristisilloitusta", detail: "Kalsiumionoforit kuten A23187 ja ionomysiini aktivoivat suoraan syottösoluja ja laukaisevat täyden degranulaation ja histamiinin vapautumisen — ohittaen täysin klassisen IgE/FcεRI-reitin. Tämä todistaa, että Ca²⁺-sisäänvirtaus yksistään riittää." },
      { step: "Ca²⁺:n poisto estää degranulaation JOPA IgE-ristisilloituksella", detail: "Kun solunulkoinen Ca²⁺ kelatoidaan tai solusisäiset varastot tyhjennetään, syottösolut eivät degranuloidu vaikka IgE/antigeeni-ristisilloitus on täydellinen. Ca²⁺ ei ole pelkkä kofaktori — se on pakollinen signaali." },
      { step: "Ca²⁺ on välttämätön JA riittävä syottösolujen aktivaatiolle", detail: "Nämä kaksi löydöstä yhdessä osoittavat, että Ca²⁺-signaali sijaitsee kaikkien syottösolujen aktivaatioreittien yhdentymispisteessä. Hallitse Ca²⁺:ta, hallitse degranulaatiota." },
      { step: "MIKÄ TAHANSA ylimääräisen Ca²⁺:n lähde — mukaan lukien EMF→VGCC — voi laukaista allergisia vasteita", detail: "EMF aktivoi jänniteohjatuet kalsiumkanavat (VGCC), tuottaen pitkäkestoisen solusisäisen Ca²⁺-nousun. Koska Ca²⁺ yksistään riittää syottösolujen degranulaatioon, EMF→VGCC-aktivaatio tarjoaa suoran, ei-immunologisen laukaisijan allergisille vasteille." },
    ],

    cascadeTitle: "Nelinkertainen herkistymiskaskadi",
    cascadeLead: "EMF ei toimi yksittäisen reitin kautta. Neljä yhtäaikaisesti vaikuttavaa mekanismia luovat kumulatiivisen herkistymiskaskadin.",
    cascadeSteps: [
      { step: "Q1: Suora VGCC-aktivaatio", detail: "EMF → Ca²⁺↑ syottösoluissa → alentunut degranulaatiokynnys. Jopa kynnyksen alittavat allergeenialtistukset, jotka normaalisti siedettäisiin, voivat nyt laukaista täyden degranulaation kun solusisäinen Ca²⁺ on jo koholla EMF→VGCC:n vuoksi." },
      { step: "Q2: Ympäristöestrogeenit", detail: "Ksenoestrogeenit ja hormonaalisia häiriöitä aiheuttavat aineet lisäävät syottösolujen degranulaatiota ja IgE-välitteistä vapautumista ([[ref:env_estrogen_mast|PMC1797832]]). Syottösolujen estrogeenireseptorit vahvistavat Ca²⁺-riippuvaista signalointia. EMF:n häiritsemä estrogeenimetabolia (VK6) yhdistää vaikutuksen." },
      { step: "Q3: HPA/immuuniakseli — Th1→Th2-siirtymä", detail: "Kortisolin häiriö EMF→HPA-häiriöstä (VK11) tuottaa Th1→Th2-immuunisiirtymän. Th2-dominanssi lisää IgE-tuotantoa ja eosinofiilien aktivaatiota — klassinen allerginen alttius. Krooninen kortisolinousu paradoksaalisesti edistää allergista herkistymistä." },
      { step: "Q4: Suoliston läpäiseväisyys → LPS → systeeminen tulehdus", detail: "Per2↓ EMF→vuorokausirytmihäiriöstä → suoliston suojaestän eheys↓ → LPS-translokaatio↑ → systeeminen tulehdus herkistää syottösolut hyperreaktiivisuuteen (S14). Vuotava suoli toimittaa jatkuvan matala-asteisen immuuniaktivaation, joka alentaa aktivaatiokynnystä kaikissa syottösolupopulaatioissa." },
    ],

    epiTitle: "Epidemiologinen kaava",
    epiLead: "Allergiaepidemiaan ajallinen ja maantieteellinen profiili vastaa EMF:n yleistymisen aikajanaa.",
    epiPoints: [
      "Allergioiden esiintyvyys on kasvanut dramaattisesti 30 vuoden aikana kehittyneissä maissa — liian nopeasti geneettiselle muutokselle, liian laajalle yhdelle allergeenille.",
      "Yhteensattuma EMF:n yleistymisaikajanan kanssa: matkapuhelinverkot, Wi-Fi, älylaitteet kukin korreloivat peräkkäisten yleistymisaaltojen kanssa.",
      "Kaupunki > maaseutu -gradientti: kaupunkiympäristöissä on sekä korkeampi EMF-altistustiheys että korkeampi allergiaesiintyvyys. Gradientti säilyy ilmansaasteiden ja hygienian vakioinnin jälkeen.",
      "Kausivaihtelu korreloi D-vitamiinitason (immunomodulatorinen) ja kausittaisten EMF-käyttömallien kanssa (sisätilojen altistus kasvaa talvikuukausina).",
    ],

    pharmaTitle: "Farmakologinen todentaminen",
    pharmaLead: "Olemassa olevat allergialääkkeet tahattomasti todentavat Ca²⁺-mekanismin.",
    pharmaPoints: [
      { drug: "Antihistamiinit", mechanism: "Estävät histamiinireseptoreita — hoitavat OIREITA degranulaation jälkeen, eivät Ca²⁺-riippuvaista syytä. Potilaat pysyvät herkistyneinä.", note: "Pelkästään oireiden hallintaa; ei puutu taustalla olevaan syottösolujen hyperreaktiivisuuteen." },
      { drug: "Syottösolujen stabiloijat (kromoglikaatti)", mechanism: "Toimivat vähentämällä Ca²⁺-signalointia syottösoluissa, estäen degranulaation ennen sen tapahtumista. Tehokkaita juuri KOSKA Ca²⁺ on pakollinen aktivaatiosignaali.", note: "Vaikutusmekanismi validoi suoraan syottösolujen aktivaation Ca²⁺-riippuvuuden." },
      { drug: "Omalitsumabi (anti-IgE)", mechanism: "Estää IgE:n sitoutumisen syottösoluihin — mutta potilaat reagoivat edelleen Ca²⁺-ionoforeihin. Tämä todistaa IgE:stä RIIPPUMATTOMAN aktivaatioreitin olemassaolon.", note: "Osittainen teho vahvistaa, että IgE on vain yksi useista aktivaatioreiteistä — Ca²⁺-sisäänvirtaus ohittaa IgE-salpauksen." },
    ],

    predictionText: "Ennuste E-NEW-27: EMF-altistetuissa syottösoluissa havaitaan lisääntynyt degranulaatio vasteena kynnyksen alittaville allergeenikonsentraatioille, VGCC-riippuvaisen Ca²⁺-nousun välittämänä.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "アレルギー流行",
    subtitle: "マスト細胞の脱顆粒はCa²⁺依存性である：Ca²⁺イオノフォアはIgEなしで脱顆粒を誘発する。EMF → VGCC → Ca²⁺は四重感作カスケードを形成する：(1) マスト細胞の直接Ca²⁺活性化、(2) 環境エストロゲンによるマスト細胞の感作、(3) コルチゾール → 免疫シフトTh1→Th2、(4) 腸管バリア → LPS → 全身性炎症。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページはCa²⁺依存性マスト細胞脱顆粒をアレルギー有病率増加のメカニズムとして探究する。各個別メカニズムは十分に確立されているが、カスケード全体とEMF曝露との関連はBERM仮説のままである。",

    calciumTitle: "Ca²⁺依存性",
    calciumLead: "Ca²⁺はマスト細胞活性化に必要かつ十分である。これは、EMF→VGCCを含むあらゆる過剰Ca²⁺の供給源がアレルギー反応を誘発しうることを意味する。",
    calciumSteps: [
      { step: "Ca²⁺イオノフォアはIgE架橋なしで脱顆粒を誘発する", detail: "A23187やイオノマイシンなどのカルシウムイオノフォアはマスト細胞を直接活性化し、完全な脱顆粒とヒスタミン放出を誘発する — 古典的なIgE/FcεRI経路を完全に迂回する。これはCa²⁺流入のみで十分であることを証明する。" },
      { step: "Ca²⁺除去はIgE架橋があっても脱顆粒を阻止する", detail: "細胞外Ca²⁺がキレートされるか細胞内貯蔵が枯渇すると、IgE/抗原架橋が完了していてもマスト細胞は脱顆粒しない。Ca²⁺は単なる補因子ではなく、必須シグナルである。" },
      { step: "Ca²⁺はマスト細胞活性化に必要かつ十分である", detail: "これら2つの知見を合わせると、Ca²⁺シグナルがすべてのマスト細胞活性化経路の収束点に位置することが確立される。Ca²⁺を制御すれば、脱顆粒を制御できる。" },
      { step: "EMF→VGCCを含むあらゆる過剰Ca²⁺の供給源がアレルギー反応を誘発しうる", detail: "EMFは電位依存性カルシウムチャネル（VGCC）を活性化し、持続的な細胞内Ca²⁺上昇を生じる。Ca²⁺のみでマスト細胞脱顆粒に十分であるため、EMF→VGCC活性化はアレルギー反応の直接的な非免疫学的トリガーとなる。" },
    ],

    cascadeTitle: "四重感作カスケード",
    cascadeLead: "EMFは単一経路で作用するのではない。4つの収束メカニズムが複合感作カスケードを形成する。",
    cascadeSteps: [
      { step: "Q1：直接VGCC活性化", detail: "EMF → マスト細胞のCa²⁺↑ → 脱顆粒閾値低下。通常は許容されるであろう閾値以下のアレルゲン曝露でも、EMF→VGCCにより基礎細胞内Ca²⁺がすでに上昇している場合、完全な脱顆粒を誘発できる。" },
      { step: "Q2：環境エストロゲン", detail: "ゼノエストロゲンと内分泌撹乱物質はマスト細胞脱顆粒とIgE媒介放出を増加させる（[[ref:env_estrogen_mast|PMC1797832]]）。マスト細胞上のエストロゲン受容体がCa²⁺依存性シグナリングを増幅する。EMFによるエストロゲン代謝障害（VK6）が効果を複合する。" },
      { step: "Q3：HPA/免疫軸 — Th1→Th2シフト", detail: "EMF→HPA障害（VK11）によるコルチゾール調節障害がTh1→Th2免疫シフトを生じる。Th2優位はIgE産生と好酸球活性化を増加させる — 古典的なアレルギー素因。慢性的なコルチゾール上昇は逆説的にアレルギー感作を促進する。" },
      { step: "Q4：腸管バリア → LPS → 全身性炎症", detail: "EMF→概日リズム障害によるPer2↓ → 腸管バリア完全性↓ → LPSトランスロケーション↑ → 全身性炎症がマスト細胞を過反応性に準備する（S14）。リーキーガットは持続的な低グレード免疫刺激を提供し、すべてのマスト細胞集団の活性化閾値を低下させる。" },
    ],

    epiTitle: "疫学的パターン",
    epiLead: "アレルギー流行の時間的・地理的プロファイルはEMF普及のタイムラインと一致する。",
    epiPoints: [
      "先進国でアレルギー有病率が30年間で劇的に増加 — 遺伝的変化には速すぎ、単一アレルゲンにしては広範すぎる。",
      "EMF普及タイムラインと一致：モバイルネットワーク、Wi-Fi、スマートデバイスがそれぞれ有病率増加の連続的な波と相関する。",
      "都市 > 農村の勾配：都市環境はEMF曝露密度もアレルギー有病率も高い。この勾配は大気汚染と衛生を統制した後も持続する。",
      "季節変動はビタミンD状態（免疫調節性）と季節的なEMF使用パターン（冬季に屋内曝露が増加）と相関する。",
    ],

    pharmaTitle: "薬理学的検証",
    pharmaLead: "既存のアレルギー治療薬はCa²⁺メカニズムを意図せず検証している。",
    pharmaPoints: [
      { drug: "抗ヒスタミン薬", mechanism: "ヒスタミン受容体を遮断 — 脱顆粒の下流の症状を治療するが、Ca²⁺依存性の原因は治療しない。患者は感作されたままである。", note: "症状管理のみ。根底にあるマスト細胞の過反応性には対処しない。" },
      { drug: "マスト細胞安定化薬（クロモグリク酸ナトリウム）", mechanism: "マスト細胞のCa²⁺シグナリングを減少させ、脱顆粒を未然に防ぐ。Ca²⁺が必須の活性化シグナルであるからこそ有効である。", note: "作用機序がマスト細胞活性化のCa²⁺依存性を直接検証する。" },
      { drug: "オマリズマブ（抗IgE）", mechanism: "マスト細胞へのIgE結合を遮断 — しかし患者はCa²⁺イオノフォアに依然反応する。これはIgE非依存性の活性化経路が存在し活性であることを証明する。", note: "部分的有効性は、IgEが複数の活性化経路の一つに過ぎないことを確認する — Ca²⁺流入はIgE遮断を迂回する。" },
    ],

    predictionText: "予測 E-NEW-27：EMF曝露マスト細胞は、VGCC依存性Ca²⁺上昇を介して、閾値以下のアレルゲン濃度に対する脱顆粒増加を示す。",
    predictionLink: "最終層の予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "L'Épidémie d'Allergies",
    subtitle: "La dégranulation des mastocytes est Ca²⁺-dépendante : les ionophores Ca²⁺ déclenchent la dégranulation SANS IgE. EMF → VGCC → Ca²⁺ crée une cascade de sensibilisation quadruple : (1) activation directe Ca²⁺ des mastocytes, (2) les estrogènes environnementaux sensibilisent les mastocytes, (3) cortisol → déplacement immunitaire Th1→Th2, (4) barrière intestinale → LPS → inflammation systémique.",
    backLink: "← Retour aux Preuves",
    cautionText: "Cette page explore la dégranulation mastocytaire Ca²⁺-dépendante comme mécanisme d'augmentation de la prévalence allergique. Bien que chaque mécanisme individuel soit bien établi, la cascade combinée et son lien avec l'exposition aux EMF reste une hypothèse BERM.",

    calciumTitle: "La dépendance au Ca²⁺",
    calciumLead: "Le Ca²⁺ est nécessaire ET suffisant pour l'activation des mastocytes. Cela signifie que TOUTE source d'excès de Ca²⁺ — y compris EMF→VGCC — peut déclencher des réponses allergiques.",
    calciumSteps: [
      { step: "Les ionophores Ca²⁺ déclenchent la dégranulation SANS pontage IgE", detail: "Les ionophores calciques tels que A23187 et l'ionomycine activent directement les mastocytes et déclenchent une dégranulation complète et une libération d'histamine — contournant totalement la voie classique IgE/FcεRI. Cela prouve que l'influx de Ca²⁺ seul est suffisant." },
      { step: "La déplétion en Ca²⁺ bloque la dégranulation MÊME AVEC le pontage IgE", detail: "Lorsque le Ca²⁺ extracellulaire est chélaté ou que les réserves intracellulaires sont épuisées, les mastocytes ne dégranulent pas même lorsque le pontage IgE/antigène est complet. Le Ca²⁺ n'est pas un simple cofacteur — c'est le signal obligatoire." },
      { step: "Le Ca²⁺ est nécessaire ET suffisant pour l'activation des mastocytes", detail: "Ces deux découvertes établissent ensemble que le signal Ca²⁺ se situe au point de convergence de toutes les voies d'activation des mastocytes. Contrôlez le Ca²⁺, contrôlez la dégranulation." },
      { step: "TOUTE source d'excès de Ca²⁺ — y compris EMF→VGCC — peut déclencher des réponses allergiques", detail: "L'EMF active les canaux calciques voltage-dépendants (VGCC), produisant une élévation soutenue du Ca²⁺ intracellulaire. Puisque le Ca²⁺ seul suffit pour la dégranulation mastocytaire, l'activation EMF→VGCC fournit un déclencheur direct et non immunologique des réponses allergiques." },
    ],

    cascadeTitle: "Cascade de sensibilisation quadruple",
    cascadeLead: "L'EMF n'agit pas par une seule voie. Quatre mécanismes convergents créent une cascade de sensibilisation cumulative.",
    cascadeSteps: [
      { step: "Q1 : Activation directe des VGCC", detail: "EMF → Ca²⁺↑ dans les mastocytes → seuil de dégranulation abaissé. Même des expositions allergéniques sous-seuil qui seraient normalement tolérées peuvent désormais déclencher une dégranulation complète lorsque le Ca²⁺ intracellulaire basal est déjà élevé par EMF→VGCC." },
      { step: "Q2 : Estrogènes environnementaux", detail: "Les xénoestrogènes et les perturbateurs endocriniens augmentent la dégranulation mastocytaire et la libération médiée par les IgE ([[ref:env_estrogen_mast|PMC1797832]]). Les récepteurs aux estrogènes sur les mastocytes amplifient la signalisation Ca²⁺-dépendante. Le métabolisme des estrogènes perturbé par l'EMF (VK6) amplifie l'effet." },
      { step: "Q3 : Axe HPA/immunitaire — déplacement Th1→Th2", detail: "La dérégulation du cortisol due à la perturbation EMF→HPA (VK11) produit un déplacement immunitaire Th1→Th2. La dominance Th2 augmente la production d'IgE et l'activation des éosinophiles — la prédisposition allergique classique. L'élévation chronique du cortisol favorise paradoxalement la sensibilisation allergique." },
      { step: "Q4 : Barrière intestinale → LPS → inflammation systémique", detail: "Per2↓ due à la perturbation circadienne par l'EMF → intégrité de la barrière intestinale↓ → translocation LPS↑ → l'inflammation systémique prépare les mastocytes à l'hyperréactivité (S14). L'intestin perméable fournit une stimulation immunitaire constante de bas grade qui abaisse le seuil d'activation dans toutes les populations de mastocytes." },
    ],

    epiTitle: "Profil épidémiologique",
    epiLead: "Le profil temporel et géographique de l'épidémie d'allergies correspond à la chronologie de prolifération des EMF.",
    epiPoints: [
      "La prévalence allergique a augmenté de façon spectaculaire sur 30 ans dans les pays développés — trop rapide pour un changement génétique, trop répandue pour un seul allergène.",
      "Coïncide avec la chronologie de prolifération des EMF : réseaux mobiles, Wi-Fi, appareils intelligents corrélant chacun avec des vagues successives d'augmentation de la prévalence.",
      "Gradient urbain > rural : les environnements urbains présentent à la fois une densité d'exposition aux EMF plus élevée et une prévalence allergique plus élevée. Ce gradient persiste après contrôle de la pollution et de l'hygiène.",
      "La variation saisonnière corrèle avec le statut en vitamine D (immunomodulateur) et les profils saisonniers d'utilisation des EMF (l'exposition intérieure augmente pendant les mois d'hiver).",
    ],

    pharmaTitle: "Validation pharmacologique",
    pharmaLead: "Les traitements allergiques existants valident involontairement le mécanisme Ca²⁺.",
    pharmaPoints: [
      { drug: "Antihistaminiques", mechanism: "Bloquent les récepteurs à l'histamine — traitent les SYMPTÔMES en aval de la dégranulation, pas la cause Ca²⁺-dépendante. Les patients restent sensibilisés.", note: "Gestion symptomatique uniquement ; ne traite pas l'hyperréactivité mastocytaire sous-jacente." },
      { drug: "Stabilisateurs de mastocytes (cromoglycate de sodium)", mechanism: "Agissent en réduisant la signalisation Ca²⁺ dans les mastocytes, empêchant la dégranulation avant qu'elle ne survienne. Efficaces précisément PARCE QUE le Ca²⁺ est le signal d'activation obligatoire.", note: "Le mécanisme d'action valide directement la dépendance au Ca²⁺ de l'activation mastocytaire." },
      { drug: "Omalizumab (anti-IgE)", mechanism: "Bloque la liaison des IgE aux mastocytes — mais les patients répondent toujours aux ionophores Ca²⁺. Cela prouve qu'une voie d'activation INDÉPENDANTE des IgE existe et reste active.", note: "L'efficacité partielle confirme que les IgE ne sont qu'une des multiples voies d'activation — l'influx de Ca²⁺ contourne le blocage des IgE." },
    ],

    predictionText: "Prédiction E-NEW-27 : les mastocytes exposés aux EMF montrent une dégranulation accrue en réponse à des concentrations allergéniques sous-seuil, médiée par l'élévation Ca²⁺ dépendante des VGCC.",
    predictionLink: "Voir les prédictions de la couche finale →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "알레르기 유행",
    subtitle: "비만세포 탈과립은 Ca²⁺ 의존적이다: Ca²⁺ 이오노포어는 IgE 없이 탈과립을 유발한다. EMF → VGCC → Ca²⁺는 사중 감작 캐스케이드를 형성한다: (1) 비만세포의 직접적 Ca²⁺ 활성화, (2) 환경 에스트로겐의 비만세포 감작, (3) 코르티솔 → 면역 전환 Th1→Th2, (4) 장벽 → LPS → 전신 염증.",
    backLink: "← 증거로 돌아가기",
    cautionText: "이 페이지는 Ca²⁺ 의존성 비만세포 탈과립을 알레르기 유병률 증가의 메커니즘으로 탐구한다. 각 개별 메커니즘은 잘 확립되어 있으나, 결합된 캐스케이드와 EMF 노출과의 연관은 BERM 가설로 남아 있다.",

    calciumTitle: "Ca²⁺ 의존성",
    calciumLead: "Ca²⁺는 비만세포 활성화에 필요하고 충분하다. 이는 EMF→VGCC를 포함한 모든 과잉 Ca²⁺ 공급원이 알레르기 반응을 유발할 수 있음을 의미한다.",
    calciumSteps: [
      { step: "Ca²⁺ 이오노포어는 IgE 가교 없이 탈과립을 유발한다", detail: "A23187과 이오노마이신 같은 칼슘 이오노포어는 비만세포를 직접 활성화하여 완전한 탈과립과 히스타민 방출을 유발한다 — 고전적 IgE/FcεRI 경로를 완전히 우회한다. 이는 Ca²⁺ 유입만으로 충분함을 증명한다." },
      { step: "Ca²⁺ 제거는 IgE 가교가 있어도 탈과립을 차단한다", detail: "세포외 Ca²⁺가 킬레이트되거나 세포내 저장소가 고갈되면, IgE/항원 가교가 완료되어도 비만세포는 탈과립하지 않는다. Ca²⁺는 단순한 보조인자가 아니라 필수 신호이다." },
      { step: "Ca²⁺는 비만세포 활성화에 필요하고 충분하다", detail: "이 두 발견을 합치면 Ca²⁺ 신호가 모든 비만세포 활성화 경로의 수렴점에 위치함이 확립된다. Ca²⁺를 통제하면 탈과립을 통제한다." },
      { step: "EMF→VGCC를 포함한 모든 과잉 Ca²⁺ 공급원이 알레르기 반응을 유발할 수 있다", detail: "EMF는 전압 의존성 칼슘 채널(VGCC)을 활성화하여 지속적인 세포내 Ca²⁺ 상승을 생성한다. Ca²⁺만으로 비만세포 탈과립에 충분하므로, EMF→VGCC 활성화는 알레르기 반응의 직접적인 비면역학적 유발인자를 제공한다." },
    ],

    cascadeTitle: "사중 감작 캐스케이드",
    cascadeLead: "EMF는 단일 경로로 작용하지 않는다. 네 가지 수렴 메커니즘이 복합 감작 캐스케이드를 형성한다.",
    cascadeSteps: [
      { step: "Q1: 직접 VGCC 활성화", detail: "EMF → 비만세포의 Ca²⁺↑ → 탈과립 역치 저하. 정상적으로는 허용될 역치 이하의 알레르겐 노출도 EMF→VGCC에 의해 기저 세포내 Ca²⁺가 이미 상승해 있으면 완전한 탈과립을 유발할 수 있다." },
      { step: "Q2: 환경 에스트로겐", detail: "제노에스트로겐과 내분비 교란물질은 비만세포 탈과립과 IgE 매개 방출을 증가시킨다([[ref:env_estrogen_mast|PMC1797832]]). 비만세포의 에스트로겐 수용체가 Ca²⁺ 의존성 신호전달을 증폭한다. EMF에 의한 에스트로겐 대사 교란(VK6)이 효과를 복합한다." },
      { step: "Q3: HPA/면역축 — Th1→Th2 전환", detail: "EMF→HPA 교란(VK11)으로 인한 코르티솔 조절장애가 Th1→Th2 면역 전환을 생성한다. Th2 우세는 IgE 생산과 호산구 활성화를 증가시킨다 — 고전적 알레르기 소인. 만성적 코르티솔 상승은 역설적으로 알레르기 감작을 촉진한다." },
      { step: "Q4: 장벽 → LPS → 전신 염증", detail: "EMF→일주기 리듬 교란에 의한 Per2↓ → 장 장벽 완전성↓ → LPS 전위↑ → 전신 염증이 비만세포를 과반응성으로 준비시킨다(S14). 장누수는 지속적인 저등급 면역 자극을 전달하여 모든 비만세포 집단의 활성화 역치를 저하시킨다." },
    ],

    epiTitle: "역학적 패턴",
    epiLead: "알레르기 유행의 시간적·지리적 프로파일은 EMF 확산 타임라인과 일치한다.",
    epiPoints: [
      "선진국에서 알레르기 유병률이 30년간 극적으로 증가 — 유전적 변화로는 너무 빠르고, 단일 알레르겐으로는 너무 광범위하다.",
      "EMF 확산 타임라인과 일치: 모바일 네트워크, Wi-Fi, 스마트 기기가 각각 연속적인 유병률 증가 파동과 상관한다.",
      "도시 > 농촌 기울기: 도시 환경은 EMF 노출 밀도와 알레르기 유병률이 모두 높다. 이 기울기는 오염과 위생을 통제한 후에도 지속된다.",
      "계절 변동은 비타민 D 상태(면역조절)와 계절적 EMF 사용 패턴(겨울철 실내 노출 증가)과 상관한다.",
    ],

    pharmaTitle: "약리학적 검증",
    pharmaLead: "기존 알레르기 치료제는 의도치 않게 Ca²⁺ 메커니즘을 검증한다.",
    pharmaPoints: [
      { drug: "항히스타민제", mechanism: "히스타민 수용체를 차단 — 탈과립 하류의 증상을 치료하지, Ca²⁺ 의존적 원인은 치료하지 않는다. 환자는 감작된 채로 남는다.", note: "증상 관리만 해당. 근본적인 비만세포 과반응성은 해결하지 않는다." },
      { drug: "비만세포 안정화제(크로몰린 나트륨)", mechanism: "비만세포의 Ca²⁺ 신호전달을 감소시켜 탈과립을 발생 전에 예방한다. Ca²⁺가 필수 활성화 신호이기 때문에 정확히 효과적이다.", note: "작용 메커니즘이 비만세포 활성화의 Ca²⁺ 의존성을 직접 검증한다." },
      { drug: "오말리주맙(항IgE)", mechanism: "비만세포에 대한 IgE 결합을 차단 — 그러나 환자는 여전히 Ca²⁺ 이오노포어에 반응한다. 이는 IgE 비의존적 활성화 경로가 존재하며 활성임을 증명한다.", note: "부분적 유효성은 IgE가 여러 활성화 경로 중 하나에 불과함을 확인한다 — Ca²⁺ 유입은 IgE 차단을 우회한다." },
    ],

    predictionText: "예측 E-NEW-27: EMF에 노출된 비만세포는 VGCC 의존성 Ca²⁺ 상승을 매개로 역치 이하 알레르겐 농도에 대해 증가된 탈과립을 보인다.",
    predictionLink: "최종 층 예측 보기 →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function AllergyEpidemicPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Activity} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox></div>

      {/* Section 1: The Ca2+ dependency */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.calciumTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.calciumLead}</p>
        <div className="space-y-3">
          {d.calciumSteps.map((s, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{s.step}</p>
              <p className="text-sm text-foreground-muted leading-relaxed"><InlineReferenceText text={s.detail} locale={locale} /></p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Quadruple sensitization cascade */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.cascadeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.cascadeLead}</p>
        <div className="space-y-3">
          {d.cascadeSteps.map((s, i) => (
            <div key={i} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{s.step}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Epidemiological pattern */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.epiTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.epiLead}</p>
        <div className="space-y-1.5">
          {d.epiPoints.map((point, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">{"→"}</span><p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Pharmacological validation */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.pharmaTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.pharmaLead}</p>
        <div className="space-y-3">
          {d.pharmaPoints.map((p, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{p.drug}</p>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1">{p.mechanism}</p>
              <p className="text-xs text-foreground-muted italic">{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DerivedPrediction */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
