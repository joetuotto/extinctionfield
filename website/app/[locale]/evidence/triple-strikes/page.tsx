import type { Metadata } from "next";
import Link from "next/link";
import { Target } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";

const COPY = {
  en: {
    title: "Triple Strikes: Convergent Destruction",
    subtitle: "Three distinct triple blows — testosterone, fertility, and cognition are each attacked via three independent routes simultaneously. This is not redundancy; it is convergent destruction through the same upstream mechanism.",
    backLink: "← Back to Evidence",
    cautionText: "This page documents three independent convergence points where the BERM mechanism simultaneously attacks the same target through three distinct pathways. Each route has been independently verified, but the combined effect has not been tested.",

    tTitle: "Testosterone triple strike",
    tLead: "Three independent pathways to testosterone decline — central, gonadal, and cross-axis — all originating from the same EMF → Ca²⁺ upstream mechanism.",
    tRoutes: [
      { route: "Central (VK13)", path: "EMF → hypothalamic vesicles↓ → GnRH pulse frequency↓ → LH↓ → T↓", evidence: "[[ref:kim2019|Kim 2019]]: 835 MHz, 12 weeks → synapsin I/II↓, synaptotagmin 1↓ in hypothalamus", status: "confirmed" },
      { route: "Gonadal (VK15)", path: "EMF → Leydig cell → StAR protein↓ → cholesterol transport blocked → T↓", evidence: "Multiple studies: RF → Leydig morphology changes, StAR↓, dose-dependent T↓", status: "confirmed" },
      { route: "Cross-axis (VK22)", path: "EMF → HPA → cortisol↑ → GnIH↑ → GnRH↓ → LH↓ → T↓", evidence: "RF9 restored T in cortisol-treated primates ([[ref:rf9_cortisol_2021|PMC7946976]]); GnIH silencing restored fertility", status: "confirmed" },
    ],
    tConclusion: "Each route alone produces modest T decline. Combined, they create the population-level testosterone crisis observed by Mazur (T↓ independent of weight change) and explain why no single lifestyle factor accounts for the decline.",

    fTitle: "Fertility triple strike",
    fLead: "Three independent pathways to fertility impairment — sperm function, hormone production, and central regulation — attacking simultaneously.",
    fRoutes: [
      { route: "Sperm (VK17)", path: "RF → candidate Ca²⁺ dysregulation → CatSper-timing endpoint → impaired fertilization", evidence: "Sperm effects and CatSper necessity are separate components; direct RF → human CatSper remains unestablished", status: "partial" },
      { route: "Gonadal (VK15)", path: "EMF → StAR↓ → testosterone↓ → spermatogenesis↓ + Sertoli cell support↓", evidence: "Dose-dependent T↓ confirmed across multiple studies", status: "confirmed" },
      { route: "Central (VK22)", path: "Cortisol↑ → GnIH↑ → GnRH↓ → LH/FSH↓ → gonadal function↓", evidence: "GnIH gene silencing RESTORED fertility in stressed animals", status: "confirmed" },
    ],
    fConclusion: "The fertility triple strike explains declining sperm counts (-50% since 1973), falling IVF success rates in high-EMF laboratories, and population-level TFR decline that correlates with EMF infrastructure (R²=0.851 across 54 countries).",

    cTitle: "Cognition triple strike",
    cLead: "Three independent pathways to cognitive decline — stress-mediated, neurotrophic, and inflammatory — converging on hippocampal function.",
    cRoutes: [
      { route: "Stress (VK14)", path: "EMF → HPA → cortisol↑ → hippocampal dendritic retraction + neurogenesis cessation", evidence: "Sapolsky 2009: chronic cortisol → hippocampal volume loss; cortisol→AD (Frontiers 2026)", status: "confirmed" },
      { route: "Neurotrophic (VK23)", path: "RF → BDNF↓ in hippocampus → dendritic spine loss + memory impairment", evidence: "RF 2650 MHz → BDNF↓ + GABA↓ ([[ref:bdnf_rf_2023|PMC10275548]]); 835 MHz postnatal → dendritic spine loss ([[ref:bdnf_rf_dev_2021|PMC8159076]])", status: "confirmed" },
      { route: "Inflammatory (VK24)", path: "EMF → melatonin↓ → Per2↓ → gut barrier↓ → LPS → neuroinflammation → hippocampal neurogenesis↓", evidence: "Per2 KO → gut barrier↓ → LPS → hippocampal neurogenesis↓ → depression ([[ref:gut_per2_2026|PMC12631932]])", status: "confirmed" },
    ],
    cConclusion: "The cognition triple strike explains rising rates of cognitive impairment, depression, and neurodegenerative disease that cannot be attributed to aging alone. All three routes converge on the hippocampus — the brain's memory center and HPA negative feedback center.",

    metaTitle: "Pattern recognition",
    metaLead: "The triple strike pattern is not coincidence — it is structural. The VGCC → Ca²⁺ mechanism is upstream of ALL three target systems. Because Ca²⁺ signaling controls hormone secretion, sperm function, AND neural plasticity, a single upstream disruption necessarily attacks all three simultaneously. This is the explanatory power of a unified mechanism.",

    predictionText: "The triple strike pattern predicts superadditive effects: blocking any ONE route should produce less than 33% protection, because the other two routes compensate. Only blocking the common upstream (VGCC/Ca²⁺) should provide full protection.",
    predictionLink: "See mechanistic predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Kolmoisisku: Yhdensuuntainen tuho",
    subtitle: "Kolme erillistä kolmoisiskua — testosteroni, hedelmällisyys ja kognitio ovat kukin hyökkäyksen kohteena kolmea itsenäistä reittiä pitkin samanaikaisesti. Tämä ei ole redundanssia; se on yhdensuuntaista tuhoa saman ylävirran mekanismin kautta.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Tämä sivu dokumentoi kolme itsenäistä yhdentymispistettä, joissa BERM-mekanismi hyökkää samanaikaisesti samaa kohdetta vastaan kolmea erillistä reittiä pitkin. Jokainen reitti on todennettu itsenäisesti, mutta yhdistettyä vaikutusta ei ole testattu.",

    tTitle: "Testosteronin kolmoisisku",
    tLead: "Kolme itsenäistä reittiä testosteronin laskuun — sentraalinen, gonadaalinen ja ristiakseli — kaikki lähtöisin samasta EMF → Ca²⁺ ylävirran mekanismista.",
    tRoutes: [
      { route: "Sentraalinen (VK13)", path: "EMF → hypotalamuksen vesikkelit↓ → GnRH-pulssitaajuus↓ → LH↓ → T↓", evidence: "[[ref:kim2019|Kim 2019]]: 835 MHz, 12 vk → synapsiini I/II↓, synaptotagmiini 1↓ hypotalamuksessa", status: "confirmed" },
      { route: "Gonadaalinen (VK15)", path: "EMF → Leydig-solu → StAR-proteiini↓ → kolesterolin kuljetus estetty → T↓", evidence: "Useita tutkimuksia: RF → Leydig-morfologiamuutokset, StAR↓, annosriippuvainen T↓", status: "confirmed" },
      { route: "Ristiakseli (VK22)", path: "EMF → HPA → kortisoli↑ → GnIH↑ → GnRH↓ → LH↓ → T↓", evidence: "RF9 palautti T:n kortisolikäsitellyissä kädellisissä ([[ref:rf9_cortisol_2021|PMC7946976]]); GnIH-hiljennys palautti hedelmällisyyden", status: "confirmed" },
    ],
    tConclusion: "Jokainen reitti yksin tuottaa maltillisen T-laskun. Yhdessä ne luovat väestötason testosteronikriisin, jonka Mazur havaitsi (T↓ painonmuutoksista riippumatta) ja selittävät miksi yksikään yksittäinen elämäntapatekijä ei selitä laskua.",

    fTitle: "Hedelmällisyyden kolmoisisku",
    fLead: "Kolme itsenäistä reittiä hedelmällisyyden heikkenemiseen — siittiöiden toiminta, hormonituotanto ja sentraalinen säätely — hyökkäävät samanaikaisesti.",
    fRoutes: [
      { route: "Siittiö (VK17)", path: "RF → ehdokas-Ca²⁺-säätelyhäiriö → CatSper-ajoituksen päätepiste → heikentynyt hedelmöitys", evidence: "Siittiövaikutukset ja CatSperin välttämättömyys ovat erillisiä komponentteja; suora RF → ihmisen CatSper on osoittamatta", status: "partial" },
      { route: "Gonadaalinen (VK15)", path: "EMF → StAR↓ → testosteroni↓ → spermatogeneesi↓ + Sertoli-solun tuki↓", evidence: "Annosriippuvainen T↓ vahvistettu useissa tutkimuksissa", status: "confirmed" },
      { route: "Sentraalinen (VK22)", path: "Kortisoli↑ → GnIH↑ → GnRH↓ → LH/FSH↓ → gonadaalinen toiminta↓", evidence: "GnIH-geenin hiljennys PALAUTTI hedelmällisyyden stressatuissa eläimissä", status: "confirmed" },
    ],
    fConclusion: "Hedelmällisyyden kolmoisisku selittää laskevat siittiömäärät (-50 % vuodesta 1973), laskevat IVF-onnistumisprosentit korkean EMF:n laboratorioissa ja väestötason TFR-laskun joka korreloi EMF-infrastruktuurin kanssa (R²=0,851 54 maassa).",

    cTitle: "Kognition kolmoisisku",
    cLead: "Kolme itsenäistä reittiä kognitiiviseen heikkenemiseen — stressivälitteinen, neurotrofinen ja inflammatorinen — yhtyvät hippokampuksen toimintaan.",
    cRoutes: [
      { route: "Stressi (VK14)", path: "EMF → HPA → kortisoli↑ → hippokampuksen dendriittien vetäytyminen + neurogeneesin loppuminen", evidence: "Sapolsky 2009: krooninen kortisoli → hippokampuksen volyymin menetys; kortisoli→AD (Frontiers 2026)", status: "confirmed" },
      { route: "Neurotrofinen (VK23)", path: "RF → BDNF↓ hippokampuksessa → dendriittien piikkien menetys + muistihäiriö", evidence: "RF 2650 MHz → BDNF↓ + GABA↓ ([[ref:bdnf_rf_2023|PMC10275548]]); 835 MHz postnataalinen → dendriittien piikkien menetys ([[ref:bdnf_rf_dev_2021|PMC8159076]])", status: "confirmed" },
      { route: "Inflammatorinen (VK24)", path: "EMF → melatoniini↓ → Per2↓ → suoliston este↓ → LPS → neurotulehdus → hippokampaalinen neurogeneesi↓", evidence: "Per2 KO → suoliston este↓ → LPS → hippokampaalinen neurogeneesi↓ → masennus ([[ref:gut_per2_2026|PMC12631932]])", status: "confirmed" },
    ],
    cConclusion: "Kognition kolmoisisku selittää kasvavat kognitiivisen heikkenemisen, masennuksen ja neurodegeneratiivisten sairauksien luvut, joita ei voi selittää pelkällä ikääntymisellä. Kaikki kolme reittiä yhtyvät hippokampukseen — aivojen muistikeskukseen ja HPA:n negatiiviseen palautekeskukseen.",

    metaTitle: "Rakenteen tunnistaminen",
    metaLead: "Kolmoisiskumalli ei ole sattumaa — se on rakenteellista. VGCC → Ca²⁺ -mekanismi on KAIKKIEN kolmen kohdejärjestelmän ylävirrassa. Koska Ca²⁺-signalointi kontrolloi hormoniseritystä, siittiötoimintaa JA hermosolujen plastisuutta, yksi ylävirran häiriö hyökkää väistämättä kaikkia kolmea vastaan samanaikaisesti. Tämä on yhtenäisen mekanismin selitysvoima.",

    predictionText: "Kolmoisiskumalli ennustaa superadditiivisia vaikutuksia: minkä tahansa YHDEN reitin estäminen tuottaa alle 33 % suojan, koska kaksi muuta reittiä kompensoivat. Vain yhteisen ylävirran (VGCC/Ca²⁺) estäminen tarjoaa täyden suojan.",
    predictionLink: "Ks. mekanistiset ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "三重打撃：収束的破壊",
    subtitle: "三つの異なる三重打撃 — テストステロン、生殖能力、認知機能はそれぞれ三つの独立した経路から同時に攻撃されている。これは冗長性ではない。同じ上流メカニズムによる収束的破壊である。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページは、BERMメカニズムが三つの異なる経路を通じて同じ標的を同時に攻撃する三つの独立した収束ポイントを文書化している。各経路は独立して検証されているが、複合効果は未検証である。",

    tTitle: "テストステロンの三重打撃",
    tLead: "テストステロン低下への三つの独立した経路 — 中枢性、性腺性、交差軸 — すべて同じ EMF → Ca²⁺ 上流メカニズムに起因する。",
    tRoutes: [
      { route: "中枢性 (VK13)", path: "EMF → hypothalamic vesicles↓ → GnRH pulse frequency↓ → LH↓ → T↓", evidence: "[[ref:kim2019|Kim 2019]]: 835 MHz, 12週間 → synapsin I/II↓, synaptotagmin 1↓（視床下部）", status: "confirmed" },
      { route: "性腺性 (VK15)", path: "EMF → Leydig cell → StAR protein↓ → cholesterol transport blocked → T↓", evidence: "複数の研究: RF → Leydig細胞形態変化, StAR↓, 用量依存的T↓", status: "confirmed" },
      { route: "交差軸 (VK22)", path: "EMF → HPA → cortisol↑ → GnIH↑ → GnRH↓ → LH↓ → T↓", evidence: "RF9がコルチゾール処理霊長類でTを回復 ([[ref:rf9_cortisol_2021|PMC7946976]]); GnIHサイレンシングが生殖能力を回復", status: "confirmed" },
    ],
    tConclusion: "各経路単独では穏やかなT低下を生じる。組み合わさると、Mazurが観察した集団レベルのテストステロン危機（体重変化とは独立したT↓）を生み出し、なぜ単一の生活習慣要因では低下を説明できないかを解明する。",

    fTitle: "生殖能力の三重打撃",
    fLead: "生殖能力障害への三つの独立した経路 — 精子機能、ホルモン産生、中枢調節 — が同時に攻撃する。",
    fRoutes: [
      { route: "精子 (VK17)", path: "RF → 候補Ca²⁺調節異常 → CatSperタイミング終点 → 受精障害", evidence: "精子影響とCatSper必須性は別の構成要素であり、RF → ヒトCatSperは未確立", status: "partial" },
      { route: "性腺性 (VK15)", path: "EMF → StAR↓ → testosterone↓ → spermatogenesis↓ + Sertoli cell support↓", evidence: "用量依存的T↓が複数の研究で確認", status: "confirmed" },
      { route: "中枢性 (VK22)", path: "Cortisol↑ → GnIH↑ → GnRH↓ → LH/FSH↓ → gonadal function↓", evidence: "GnIH遺伝子サイレンシングがストレス動物の生殖能力を回復", status: "confirmed" },
    ],
    fConclusion: "生殖能力の三重打撃は、精子数の減少（1973年以降-50%）、高EMF環境の研究室でのIVF成功率低下、そしてEMFインフラと相関する集団レベルのTFR低下（54カ国でR²=0.851）を説明する。",

    cTitle: "認知機能の三重打撃",
    cLead: "認知機能低下への三つの独立した経路 — ストレス媒介性、神経栄養性、炎症性 — が海馬機能に収束する。",
    cRoutes: [
      { route: "ストレス (VK14)", path: "EMF → HPA → cortisol↑ → hippocampal dendritic retraction + neurogenesis cessation", evidence: "Sapolsky 2009: 慢性コルチゾール → 海馬体積減少; cortisol→AD (Frontiers 2026)", status: "confirmed" },
      { route: "神経栄養性 (VK23)", path: "RF → BDNF↓ in hippocampus → dendritic spine loss + memory impairment", evidence: "RF 2650 MHz → BDNF↓ + GABA↓ ([[ref:bdnf_rf_2023|PMC10275548]]); 835 MHz postnatal → dendritic spine loss ([[ref:bdnf_rf_dev_2021|PMC8159076]])", status: "confirmed" },
      { route: "炎症性 (VK24)", path: "EMF → melatonin↓ → Per2↓ → gut barrier↓ → LPS → neuroinflammation → hippocampal neurogenesis↓", evidence: "Per2 KO → gut barrier↓ → LPS → hippocampal neurogenesis↓ → depression ([[ref:gut_per2_2026|PMC12631932]])", status: "confirmed" },
    ],
    cConclusion: "認知機能の三重打撃は、加齢だけでは説明できない認知障害、うつ病、神経変性疾患の増加率を説明する。三つの経路すべてが海馬 — 脳の記憶中枢でありHPA負のフィードバック中枢 — に収束する。",

    metaTitle: "パターン認識",
    metaLead: "三重打撃パターンは偶然ではない — 構造的なものである。VGCC → Ca²⁺ メカニズムは三つの標的システムすべての上流にある。Ca²⁺シグナリングがホルモン分泌、精子機能、そして神経可塑性を制御するため、単一の上流障害は必然的に三つすべてを同時に攻撃する。これが統一メカニズムの説明力である。",

    predictionText: "三重打撃パターンは超加法的効果を予測する：いずれか一つの経路を遮断しても33%未満の防護しか得られない。なぜなら残りの二つの経路が補償するからである。共通の上流（VGCC/Ca²⁺）の遮断のみが完全な防護を提供する。",
    predictionLink: "メカニズム予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "Triple frappe : Destruction convergente",
    subtitle: "Trois triples frappes distinctes — la testostérone, la fertilité et la cognition sont chacune attaquées par trois voies indépendantes simultanément. Ce n'est pas de la redondance ; c'est une destruction convergente par le même mécanisme en amont.",
    backLink: "← Retour aux preuves",
    cautionText: "Cette page documente trois points de convergence indépendants où le mécanisme BERM attaque simultanément la même cible par trois voies distinctes. Chaque voie a été vérifiée indépendamment, mais l'effet combiné n'a pas été testé.",

    tTitle: "Triple frappe sur la testostérone",
    tLead: "Trois voies indépendantes vers le déclin de la testostérone — centrale, gonadique et inter-axes — toutes provenant du même mécanisme en amont EMF → Ca²⁺.",
    tRoutes: [
      { route: "Centrale (VK13)", path: "EMF → hypothalamic vesicles↓ → GnRH pulse frequency↓ → LH↓ → T↓", evidence: "Kim 2019 : 835 MHz, 12 semaines → synapsin I/II↓, synaptotagmin 1↓ dans l'hypothalamus", status: "confirmed" },
      { route: "Gonadique (VK15)", path: "EMF → Leydig cell → StAR protein↓ → cholesterol transport blocked → T↓", evidence: "Études multiples : RF → changements morphologiques des cellules de Leydig, StAR↓, T↓ dose-dépendant", status: "confirmed" },
      { route: "Inter-axes (VK22)", path: "EMF → HPA → cortisol↑ → GnIH↑ → GnRH↓ → LH↓ → T↓", evidence: "RF9 a restauré T chez les primates traités au cortisol ([[ref:rf9_cortisol_2021|PMC7946976]]) ; le silençage de GnIH a restauré la fertilité", status: "confirmed" },
    ],
    tConclusion: "Chaque voie seule produit un déclin modeste de T. Combinées, elles créent la crise de testostérone au niveau populationnel observée par Mazur (T↓ indépendamment du changement de poids) et expliquent pourquoi aucun facteur de mode de vie unique ne rend compte du déclin.",

    fTitle: "Triple frappe sur la fertilité",
    fLead: "Trois voies indépendantes vers l'altération de la fertilité — fonction spermatique, production hormonale et régulation centrale — attaquant simultanément.",
    fRoutes: [
      { route: "Spermatozoïdes (VK17)", path: "RF → dysrégulation Ca²⁺ candidate → endpoint temporel CatSper → fécondation altérée", evidence: "Effets spermatiques et nécessité de CatSper sont des composantes distinctes; RF → CatSper humain reste non établi", status: "partial" },
      { route: "Gonadique (VK15)", path: "EMF → StAR↓ → testosterone↓ → spermatogenesis↓ + Sertoli cell support↓", evidence: "T↓ dose-dépendant confirmé dans de multiples études", status: "confirmed" },
      { route: "Centrale (VK22)", path: "Cortisol↑ → GnIH↑ → GnRH↓ → LH/FSH↓ → gonadal function↓", evidence: "Le silençage du gène GnIH a RESTAURÉ la fertilité chez les animaux stressés", status: "confirmed" },
    ],
    fConclusion: "La triple frappe sur la fertilité explique le déclin du nombre de spermatozoïdes (-50 % depuis 1973), la baisse des taux de réussite de FIV dans les laboratoires à haut EMF, et le déclin du TFR au niveau populationnel qui corrèle avec l'infrastructure EMF (R²=0,851 dans 54 pays).",

    cTitle: "Triple frappe sur la cognition",
    cLead: "Trois voies indépendantes vers le déclin cognitif — médiée par le stress, neurotrophique et inflammatoire — convergeant sur la fonction hippocampique.",
    cRoutes: [
      { route: "Stress (VK14)", path: "EMF → HPA → cortisol↑ → hippocampal dendritic retraction + neurogenesis cessation", evidence: "Sapolsky 2009 : cortisol chronique → perte de volume hippocampique ; cortisol→AD (Frontiers 2026)", status: "confirmed" },
      { route: "Neurotrophique (VK23)", path: "RF → BDNF↓ in hippocampus → dendritic spine loss + memory impairment", evidence: "RF 2650 MHz → BDNF↓ + GABA↓ ([[ref:bdnf_rf_2023|PMC10275548]]) ; 835 MHz postnatal → perte d'épines dendritiques ([[ref:bdnf_rf_dev_2021|PMC8159076]])", status: "confirmed" },
      { route: "Inflammatoire (VK24)", path: "EMF → melatonin↓ → Per2↓ → gut barrier↓ → LPS → neuroinflammation → hippocampal neurogenesis↓", evidence: "Per2 KO → barrière intestinale↓ → LPS → neurogenèse hippocampique↓ → dépression ([[ref:gut_per2_2026|PMC12631932]])", status: "confirmed" },
    ],
    cConclusion: "La triple frappe cognitive explique les taux croissants de déficience cognitive, de dépression et de maladies neurodégénératives qui ne peuvent être attribués au seul vieillissement. Les trois voies convergent sur l'hippocampe — le centre de mémoire du cerveau et le centre de rétroaction négative de l'axe HPA.",

    metaTitle: "Reconnaissance de motif",
    metaLead: "Le motif de triple frappe n'est pas une coïncidence — il est structurel. Le mécanisme VGCC → Ca²⁺ est en amont des TROIS systèmes cibles. Parce que la signalisation Ca²⁺ contrôle la sécrétion hormonale, la fonction spermatique ET la plasticité neuronale, une seule perturbation en amont attaque nécessairement les trois simultanément. C'est le pouvoir explicatif d'un mécanisme unifié.",

    predictionText: "Le motif de triple frappe prédit des effets superadditifs : bloquer UNE SEULE voie devrait produire moins de 33 % de protection, car les deux autres voies compensent. Seul le blocage de l'amont commun (VGCC/Ca²⁺) devrait fournir une protection complète.",
    predictionLink: "Voir les prédictions mécanistiques →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "삼중 타격: 수렴적 파괴",
    subtitle: "세 가지 별개의 삼중 타격 — 테스토스테론, 생식력, 인지 기능이 각각 세 가지 독립적 경로를 통해 동시에 공격받고 있다. 이것은 중복이 아니라 동일한 상류 메커니즘을 통한 수렴적 파괴이다.",
    backLink: "← 근거로 돌아가기",
    cautionText: "이 페이지는 BERM 메커니즘이 세 가지 별개의 경로를 통해 동일한 표적을 동시에 공격하는 세 가지 독립적 수렴 지점을 문서화한다. 각 경로는 독립적으로 검증되었으나, 복합 효과는 검증되지 않았다.",

    tTitle: "테스토스테론 삼중 타격",
    tLead: "테스토스테론 감소를 향한 세 가지 독립적 경로 — 중추성, 생식선성, 교차축 — 모두 동일한 EMF → Ca²⁺ 상류 메커니즘에서 기원한다.",
    tRoutes: [
      { route: "중추성 (VK13)", path: "EMF → hypothalamic vesicles↓ → GnRH pulse frequency↓ → LH↓ → T↓", evidence: "[[ref:kim2019|Kim 2019]]: 835 MHz, 12주 → synapsin I/II↓, synaptotagmin 1↓ (시상하부)", status: "confirmed" },
      { route: "생식선성 (VK15)", path: "EMF → Leydig cell → StAR protein↓ → cholesterol transport blocked → T↓", evidence: "다수의 연구: RF → Leydig 세포 형태 변화, StAR↓, 용량 의존적 T↓", status: "confirmed" },
      { route: "교차축 (VK22)", path: "EMF → HPA → cortisol↑ → GnIH↑ → GnRH↓ → LH↓ → T↓", evidence: "RF9가 코르티솔 처리 영장류에서 T를 회복 ([[ref:rf9_cortisol_2021|PMC7946976]]); GnIH 사일런싱이 생식력을 회복", status: "confirmed" },
    ],
    tConclusion: "각 경로 단독으로는 완만한 T 감소를 야기한다. 결합되면, Mazur가 관찰한 인구 수준의 테스토스테론 위기(체중 변화와 무관한 T↓)를 생성하며, 왜 단일 생활습관 요인으로 감소를 설명할 수 없는지를 해명한다.",

    fTitle: "생식력 삼중 타격",
    fLead: "생식력 장애를 향한 세 가지 독립적 경로 — 정자 기능, 호르몬 생산, 중추 조절 — 이 동시에 공격한다.",
    fRoutes: [
      { route: "정자 (VK17)", path: "RF → 후보 Ca²⁺ 조절 이상 → CatSper 타이밍 종점 → 수정 저하", evidence: "정자 효과와 CatSper 필요성은 별도 구성요소이며 RF → 인간 CatSper는 미확립", status: "partial" },
      { route: "생식선성 (VK15)", path: "EMF → StAR↓ → testosterone↓ → spermatogenesis↓ + Sertoli cell support↓", evidence: "용량 의존적 T↓가 다수의 연구에서 확인", status: "confirmed" },
      { route: "중추성 (VK22)", path: "Cortisol↑ → GnIH↑ → GnRH↓ → LH/FSH↓ → gonadal function↓", evidence: "GnIH 유전자 사일런싱이 스트레스 동물의 생식력을 회복", status: "confirmed" },
    ],
    fConclusion: "생식력 삼중 타격은 정자 수 감소(1973년 이후 -50%), 고 EMF 실험실에서의 IVF 성공률 하락, 그리고 EMF 인프라와 상관하는 인구 수준의 TFR 감소(54개국에서 R²=0.851)를 설명한다.",

    cTitle: "인지 기능 삼중 타격",
    cLead: "인지 기능 저하를 향한 세 가지 독립적 경로 — 스트레스 매개, 신경영양, 염증 — 이 해마 기능에 수렴한다.",
    cRoutes: [
      { route: "스트레스 (VK14)", path: "EMF → HPA → cortisol↑ → hippocampal dendritic retraction + neurogenesis cessation", evidence: "Sapolsky 2009: 만성 코르티솔 → 해마 체적 감소; cortisol→AD (Frontiers 2026)", status: "confirmed" },
      { route: "신경영양 (VK23)", path: "RF → BDNF↓ in hippocampus → dendritic spine loss + memory impairment", evidence: "RF 2650 MHz → BDNF↓ + GABA↓ ([[ref:bdnf_rf_2023|PMC10275548]]); 835 MHz postnatal → dendritic spine loss ([[ref:bdnf_rf_dev_2021|PMC8159076]])", status: "confirmed" },
      { route: "염증 (VK24)", path: "EMF → melatonin↓ → Per2↓ → gut barrier↓ → LPS → neuroinflammation → hippocampal neurogenesis↓", evidence: "Per2 KO → gut barrier↓ → LPS → hippocampal neurogenesis↓ → depression ([[ref:gut_per2_2026|PMC12631932]])", status: "confirmed" },
    ],
    cConclusion: "인지 기능 삼중 타격은 노화만으로는 설명할 수 없는 인지 장애, 우울증, 신경퇴행성 질환의 증가율을 설명한다. 세 가지 경로 모두 해마 — 뇌의 기억 중추이자 HPA 음성 피드백 중추 — 에 수렴한다.",

    metaTitle: "패턴 인식",
    metaLead: "삼중 타격 패턴은 우연이 아니라 구조적이다. VGCC → Ca²⁺ 메커니즘은 세 표적 시스템 모두의 상류에 있다. Ca²⁺ 신호전달이 호르몬 분비, 정자 기능, 그리고 신경 가소성을 제어하므로, 단일 상류 교란은 필연적으로 세 가지 모두를 동시에 공격한다. 이것이 통합 메커니즘의 설명력이다.",

    predictionText: "삼중 타격 패턴은 초가법적 효과를 예측한다: 어느 하나의 경로를 차단하더라도 33% 미만의 방어만 제공할 것이다. 나머지 두 경로가 보상하기 때문이다. 공통 상류(VGCC/Ca²⁺)의 차단만이 완전한 방어를 제공한다.",
    predictionLink: "메커니즘 예측 보기 →",
    predictionHref: "/predictions",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = COPY[locale as keyof typeof COPY] ?? COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function TripleStrikesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = (locale in COPY ? locale : "en") as keyof typeof COPY;
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  const confirmedLabels: Record<string, string> = { en: "✓ Confirmed", fi: "✓ Vahvistettu", ja: "✓ 確認済み", fr: "✓ Confirmé", ko: "✓ 확인됨" };
  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    confirmed: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400", label: confirmedLabels[activeLocale] ?? confirmedLabels.en },
  };

  // helper for a triple-strike section
  const renderStrike = (title: string, lead: string, routes: readonly { route: string; path: string; evidence: string; status: string }[], conclusion: string) => (
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{lead}</p>
      <div className="space-y-3">
        {routes.map((r, i) => {
          const sc = statusColors[r.status];
          return (
            <div key={i} className={`rounded-lg border border-card-border bg-card-bg p-4 ${sc?.bg ?? ""}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-sm font-semibold">{r.route}</p>
                {sc && (
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${sc.bg} ${sc.text}`}>
                    {sc.label}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1 font-mono text-xs">{r.path}</p>
              <p className="text-xs text-foreground-muted"><InlineReferenceText text={r.evidence} locale={activeLocale} /></p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
        <p className="text-sm leading-relaxed text-foreground-muted">{conclusion}</p>
      </div>
    </section>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Target} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8">
        <CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox>
      </div>

      {renderStrike(d.tTitle, d.tLead, d.tRoutes, d.tConclusion)}
      {renderStrike(d.fTitle, d.fLead, d.fRoutes, d.fConclusion)}
      {renderStrike(d.cTitle, d.cLead, d.cRoutes, d.cConclusion)}

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.metaTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.metaLead}</p>
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
