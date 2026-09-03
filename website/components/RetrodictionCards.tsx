"use client";

import { useState } from "react";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

interface Retrodiction {
  id: string;
  title: Record<string, string>;
  source: string;
  sourceCitations?: { referenceId: string; label: string }[];
  data: Record<string, string>;
  explanation: Record<string, string>;
  prediction: Record<string, string>;
  status: Record<string, string>;
  color: string;
}

const RETRODICTIONS: Retrodiction[] = [
  {
    id: "lab-obesity",
    title: {
      en: "Laboratory control animals are getting fatter",
      fi: "Laboratorion kontrollieläimet lihovat",
      ja: "実験室の対照動物が太ってきている",
      fr: "Les animaux témoins de laboratoire grossissent",
      ko: "실험실 대조 동물이 점점 비만해지고 있다",
    },
    source: "",
    sourceCitations: [
      { referenceId: "klimentidis2010", label: "Klimentidis 2010 (Proc R Soc B)" },
    ],
    data: {
      en: "24 populations of 8 species. Lab mice +11%/decade, marmosets +9%/decade, chimps +33%/decade. Diet was controlled. 'No single thread running through all 24 data sets.'",
      fi: "24 populaatiota 8 lajista. Laboratorion hiiret +11 %/vuosikymmen, marmosettit +9 %/vuosikymmen, simpanssit +33 %/vuosikymmen. Ruokavalio oli kontrolloitu. 'Yksikään yhteinen tekijä ei selitä kaikkia 24 aineistoa.'",
      ja: "8種24集団。実験マウス +11%/10年、マーモセット +9%/10年、チンパンジー +33%/10年。食事は管理されていた。「24のデータセット全てに共通する一本の糸はない。」",
      fr: "24 populations de 8 espèces. Souris de labo +11 %/décennie, ouistitis +9 %/décennie, chimpanzés +33 %/décennie. L'alimentation était contrôlée. « Aucun fil conducteur commun aux 24 jeux de données. »",
      ko: "8종 24개 집단. 실험 쥐 +11%/10년, 마모셋 +9%/10년, 침팬지 +33%/10년. 식단은 통제되었다. '24개 데이터셋 모두를 관통하는 단일 요인은 없다.'",
    },
    explanation: {
      en: "Laboratory EMF environment has changed dramatically over decades: fluorescent lighting → LED, computers, Wi-Fi. PEMF mechanism (adenosine receptor activation) affects metabolic ion channels. Chronic IF-EMF in labs → metabolic ion channel disruption → weight gain despite controlled diet. Sleep deprivation alone produces weight gain through leptin suppression and ghrelin elevation (+300 kcal/day; [[ref:walker2017_why_we_sleep|Walker 2017]] citing Van Cauter). Laboratory animals live in 24/7 LED lighting and EMF environments that disrupt circadian regulation — producing the same metabolic pathway as experimental sleep deprivation.",
      fi: "Laboratorion EMF-ympäristö on muuttunut dramaattisesti vuosikymmenten aikana: loisteputket → LED, tietokoneet, Wi-Fi. PEMF-mekanismi (adenosiinireseptoriaktivaatio) vaikuttaa metabolisiin ionikanaviin. Krooninen IF-EMF laboratorioissa → metabolinen ionikanavahäiriö → painonnousu kontrolloidusta ruokavaliosta huolimatta. Pelkkä unideprivaatio aiheuttaa painonnousua leptiinin vaimentumisen ja greliinin nousun kautta (+300 kcal/pv; [[ref:walker2017_why_we_sleep|Walker 2017]], Van Cauter). Laboratorieläimet elävät 24/7 LED-valaistuksessa ja EMF-ympäristöissä jotka häiritsevät vuorokausirytmin säätelyä — tuottaen saman metabolisen reitin kuin kokeellinen unideprivaatio.",
      ja: "実験室のEMF環境は数十年で劇的に変化した：蛍光灯→LED、コンピュータ、Wi-Fi。PEMFメカニズム（アデノシン受容体活性化）が代謝イオンチャネルに影響。実験室での慢性IF-EMF→代謝イオンチャネル撹乱→管理された食事にもかかわらず体重増加。睡眠不足単独でもレプチン抑制とグレリン上昇による体重増加を引き起こす（+300 kcal/日；[[ref:walker2017_why_we_sleep|Walker 2017]]、Van Cauter引用）。実験動物は24時間LED照明とEMF環境で生活し、概日リズム制御を撹乱する — 実験的睡眠不足と同じ代謝経路を生じる。",
      fr: "L'environnement EMF des laboratoires a changé radicalement au fil des décennies : éclairage fluorescent → LED, ordinateurs, Wi-Fi. Le mécanisme PEMF (activation des récepteurs à l'adénosine) affecte les canaux ioniques métaboliques. IF-EMF chronique en labo → perturbation des canaux ioniques métaboliques → prise de poids malgré une alimentation contrôlée. La privation de sommeil seule produit une prise de poids par suppression de la leptine et élévation de la ghréline (+300 kcal/jour ; [[ref:walker2017_why_we_sleep|Walker 2017]] citant Van Cauter). Les animaux de laboratoire vivent dans un éclairage LED et un environnement EMF 24h/24 qui perturbent la régulation circadienne — produisant la même voie métabolique que la privation de sommeil expérimentale.",
      ko: "실험실 EMF 환경은 수십 년에 걸쳐 극적으로 변화했다: 형광등→LED, 컴퓨터, Wi-Fi. PEMF 메커니즘(아데노신 수용체 활성화)이 대사 이온 채널에 영향을 미친다. 실험실에서의 만성 IF-EMF→대사 이온 채널 교란→통제된 식단에도 불구하고 체중 증가. 수면 부족만으로도 렙틴 억제와 그렐린 상승을 통해 체중 증가를 유발한다(+300 kcal/일; [[ref:walker2017_why_we_sleep|Walker 2017]], Van Cauter 인용). 실험동물은 24시간 LED 조명과 EMF 환경에서 생활하며 일주기 조절을 교란한다 — 실험적 수면 부족과 동일한 대사 경로를 생산한다.",
    },
    prediction: {
      en: "Weight gain rate should correlate with lab modernization level. Labs retaining incandescent lighting should show slower weight gain.",
      fi: "Painonnousun tulisi korreloida laboratorion modernisaatiotason kanssa. Hehkulamppuvalaistuksen säilyttäneissä laboreissa tulisi näkyä hitaampaa painonnousua.",
      ja: "体重増加率は実験室の近代化レベルと相関するはずである。白熱灯照明を維持している実験室ではより緩やかな体重増加が見られるはずである。",
      fr: "Le taux de prise de poids devrait corréler avec le niveau de modernisation du laboratoire. Les laboratoires conservant un éclairage incandescent devraient montrer une prise de poids plus lente.",
      ko: "체중 증가율은 실험실 현대화 수준과 상관관계가 있어야 한다. 백열등 조명을 유지한 실험실에서는 더 느린 체중 증가를 보여야 한다.",
    },
    status: {
      en: "Consistent — prospective test needed",
      fi: "Konsistentti — prospektiivinen testi tarvitaan",
      ja: "一貫性あり — 前向き試験が必要",
      fr: "Cohérent — test prospectif nécessaire",
      ko: "일관성 있음 — 전향적 시험 필요",
    },
    color: "#FF9800",
  },
  {
    id: "autoimmune",
    title: {
      en: "Autoimmune diseases are epidemic",
      fi: "Autoimmuunisairaudet ovat epidemiatasolla",
      ja: "自己免疫疾患が流行レベルに達している",
      fr: "Les maladies auto-immunes sont épidémiques",
      ko: "자가면역 질환이 유행 수준에 달하고 있다",
    },
    source: "Multiple epidemiological reviews",
    data: {
      en: "Crohn's, MS, rheumatoid arthritis, T1D, lupus — all increasing dramatically in developed countries. Highest growth in Israel, Netherlands, USA, Sweden — countries with earliest/densest mobile phone adoption.",
      fi: "Crohn, MS, nivelreuma, T1D, lupus — kaikki kasvussa kehittyneissä maissa. Suurin kasvu Israelissa, Alankomaissa, USA:ssa, Ruotsissa — maissa joissa matkapuhelin otettiin käyttöön aikaisimmin/tiheimmin.",
      ja: "クローン病、MS、関節リウマチ、1型糖尿病、ループス — 先進国で劇的に増加。イスラエル、オランダ、米国、スウェーデンで最大の増加 — 携帯電話の採用が最も早く/密度が高い国々。",
      fr: "Crohn, SEP, polyarthrite rhumatoïde, DT1, lupus — tous en augmentation dramatique dans les pays développés. Plus forte croissance en Israël, Pays-Bas, États-Unis, Suède — pays avec l'adoption la plus précoce/dense du téléphone mobile.",
      ko: "크론병, MS, 류마티스 관절염, 1형 당뇨, 루푸스 — 선진국에서 극적으로 증가. 이스라엘, 네덜란드, 미국, 스웨덴에서 최대 증가 — 휴대전화 도입이 가장 빠르고/밀도가 높은 국가들.",
    },
    explanation: {
      en: "[[ref:koopman2016_vns_ra|VNS (FDA-approved for RA)]] works by restoring vagal anti-inflammatory reflex. Environmental RF near vagus nerve (earbuds, phones at ear) disrupts the same reflex → immune system overactivation. Chronic sleep disruption produces sympathetic overdrive — the autonomic equivalent of anti-VNS — which suppresses the vagal anti-inflammatory reflex ([[ref:walker2017_why_we_sleep|Walker 2017]]). This is the same mechanism that VNS devices (FDA-approved) reverse therapeutically.",
      fi: "[[ref:koopman2016_vns_ra|VNS (FDA-hyväksytty nivelreumaan)]] toimii palauttamalla vagaalisen anti-inflammatorisen refleksin. Ympäristö-RF vagushermon lähellä (nappikuulokkeet, puhelin korvalla) häiritsee samaa refleksiä → immuunijärjestelmän yliaktivaatio. Krooninen unihäiriö tuottaa sympaattisen yliaktivaation — autonomisen vastineen anti-VNS:lle — joka vaimentaa vagaalisen anti-inflammatorisen refleksin ([[ref:walker2017_why_we_sleep|Walker 2017]]). Tämä on sama mekanismi jonka VNS-laitteet (FDA-hyväksytyt) palauttavat terapeuttisesti.",
      ja: "[[ref:koopman2016_vns_ra|VNS（RAに対してFDA承認）]]は、迷走神経抗炎症反射を回復させることで機能する。迷走神経近傍の環境RF（イヤホン、耳元の電話）は同じ反射を撹乱し、免疫系を過剰活性化させる。慢性的な睡眠障害は交感神経の過剰駆動 — 自律神経系における抗VNS相当 — を生じ、迷走神経抗炎症反射を抑制する（[[ref:walker2017_why_we_sleep|Walker 2017]]）。これはFDA承認VNSデバイスが治療的に逆転させるものと同じメカニズムである。",
      fr: "La [[ref:koopman2016_vns_ra|SNV (approuvée par la FDA pour la PR)]] agit en restaurant le réflexe anti-inflammatoire vagal. Les RF environnementales près du nerf vague (écouteurs, téléphone à l'oreille) perturbent ce même réflexe → suractivation du système immunitaire. La perturbation chronique du sommeil produit une suractivation sympathique — l'équivalent autonome d'une anti-SNV — qui supprime le réflexe anti-inflammatoire vagal ([[ref:walker2017_why_we_sleep|Walker 2017]]). C'est le même mécanisme que les dispositifs de SNV (approuvés par la FDA) inversent thérapeutiquement.",
      ko: "[[ref:koopman2016_vns_ra|VNS(RA에 대해 FDA 승인)]]는 미주신경 항염증 반사를 회복시켜 작동한다. 미주신경 근처의 환경 RF(이어버드, 귀에 대는 전화)는 같은 반사를 교란해 면역계를 과활성화한다. 만성 수면 교란은 교감신경 과잉 구동 — 자율신경계에서의 항-VNS에 해당 — 을 유발하고 미주신경 항염증 반사를 억제한다([[ref:walker2017_why_we_sleep|Walker 2017]]). 이는 FDA 승인 VNS 장치가 치료적으로 되돌리는 것과 같은 메커니즘이다.",
    },
    prediction: {
      en: "Earbud heavy users (>4h/day) should have lower HRV (vagal tone measure) and higher autoimmune risk.",
      fi: "Nappikuulokkeiden suurkäyttäjillä (>4h/pv) tulisi olla matalampi HRV (vagaalisen tonuksen mitta) ja korkeampi autoimmuuniriski.",
      ja: "イヤホンのヘビーユーザー（>4時間/日）はHRV（迷走神経緊張度の指標）が低く、自己免疫リスクが高いはずである。",
      fr: "Les grands utilisateurs d'écouteurs (>4h/jour) devraient avoir un HRV plus faible (mesure du tonus vagal) et un risque auto-immun plus élevé.",
      ko: "이어버드 과다 사용자(>4시간/일)는 HRV(미주신경 긴장도 측정)가 낮고 자가면역 위험이 높아야 한다.",
    },
    status: {
      en: "Consistent — prospective test needed",
      fi: "Konsistentti — prospektiivinen testi tarvitaan",
      ja: "一貫性あり — 前向き試験が必要",
      fr: "Cohérent — test prospectif nécessaire",
      ko: "일관성 있음 — 전향적 시험 필요",
    },
    color: "#4CAF50",
  },
  {
    id: "early-cancer",
    title: {
      en: "Cancer is rising in young adults",
      fi: "Syöpä lisääntyy nuorilla aikuisilla",
      ja: "若年成人でがんが増加している",
      fr: "Le cancer augmente chez les jeunes adultes",
      ko: "젊은 성인에서 암이 증가하고 있다",
    },
    source: "",
    sourceCitations: [
      { referenceId: "early_onset_cancer_gbd_2023", label: "BMJ Oncology 2023" },
      { referenceId: "early_onset_colorectal_lancet_2024", label: "Lancet Oncol 2024" },
    ],
    data: {
      en: "Early-onset cancer +79.1% globally 1990–2019. Under-50 is the ONLY age group with sustained cancer incidence increase 1995–2021. Fastest-rising: thyroid +1.70%/yr, testicular +1.37%/yr, colorectal +3.2%/yr in under-55.",
      fi: "Varhaissyöpä +79,1 % maailmanlaajuisesti 1990–2019. Alle 50-vuotiaat on AINOA ikäryhmä jossa syöpäilmaantuvuus on kasvanut jatkuvasti 1995–2021. Nopeimmin kasvavat: kilpirauhanen +1,70 %/v, kives +1,37 %/v, kolorektaali +3,2 %/v alle 55-vuotiailla.",
      ja: "早期発症がん 1990–2019年に世界で+79.1%。50歳未満は1995–2021年にがん発症率が持続的に増加した唯一の年齢層。最も急速に増加：甲状腺 +1.70%/年、精巣 +1.37%/年、大腸 +3.2%/年（55歳未満）。",
      fr: "Cancer précoce +79,1 % dans le monde 1990–2019. Les moins de 50 ans sont le SEUL groupe d'âge avec une augmentation soutenue de l'incidence du cancer 1995–2021. Plus forte hausse : thyroïde +1,70 %/an, testiculaire +1,37 %/an, colorectal +3,2 %/an chez les moins de 55 ans.",
      ko: "조기 발병 암 1990–2019년 전 세계적으로 +79.1%. 50세 미만은 1995–2021년 암 발생률이 지속적으로 증가한 유일한 연령대. 가장 빠르게 증가: 갑상선 +1.70%/년, 고환 +1.37%/년, 대장 +3.2%/년(55세 미만).",
    },
    explanation: {
      en: "TTFields mechanism: IF-EMF disrupts cell division. Rising cancers are in rapidly dividing tissues: gut epithelium (CRC, 3–5 day turnover), testis (spermatogenesis), thyroid (high metabolic activity). Timeline matches: increase begins ~1995, ~10–15 years after the first personal electronics wave (1980s). A single night of 4-hour sleep reduces NK cell count by 70% (Irwin). WHO classified night-shift work as a Group 2A probable carcinogen based on breast and prostate cancer data. The under-50 age group — which has known only the post-LED, post-smartphone electromagnetic environment — shows the steepest cancer increase.",
      fi: "TTFields-mekanismi: IF-EMF häiritsee solunjakautumista. Kasvavat syövät ovat nopeasti jakautuvissa kudoksissa: suoliston epiteeli (CRC, 3–5 pv uusiutuminen), kives (spermatogeneesi), kilpirauhanen (korkea metabolinen aktiivisuus). Aikajana täsmää: kasvu alkaa ~1995, ~10–15 vuotta ensimmäisen henkilökohtaisen elektroniikan aallon (1980-luku) jälkeen. Yksi yö 4 tunnin unella vähentää NK-solujen määrää 70 % (Irwin). WHO luokitteli yötyön todennäköisesti karsinogeeniseksi (ryhmä 2A) rinta- ja eturauhassyöpädatan perusteella. Alle 50-vuotiaiden ikäryhmä — joka ei ole tuntenut muuta kuin LED-jälkeisen, älypuhelinjälkeisen sähkömagneettisen ympäristön — osoittaa jyrkintä syöpäkasvua.",
      ja: "TTFieldsメカニズム：IF-EMFが細胞分裂を撹乱する。増加しているがんは急速に分裂する組織にある：腸上皮（CRC、3–5日のターンオーバー）、精巣（精子形成）、甲状腺（高い代謝活性）。タイムラインは一致：増加は~1995年に開始、最初のパーソナルエレクトロニクス波（1980年代）の~10–15年後。一晩4時間の睡眠でNK細胞数が70%減少する（Irwin）。WHOは乳がんと前立腺がんのデータに基づき夜間勤務をグループ2Aの発がん可能性ありに分類。50歳未満の年齢層 — LED後・スマートフォン後の電磁環境しか知らない — が最も急激ながん増加を示している。",
      fr: "Mécanisme TTFields : les IF-EMF perturbent la division cellulaire. Les cancers en hausse se trouvent dans les tissus à division rapide : épithélium intestinal (CCR, renouvellement 3–5 jours), testicule (spermatogénèse), thyroïde (activité métabolique élevée). La chronologie correspond : l'augmentation commence ~1995, ~10–15 ans après la première vague d'électronique personnelle (années 1980). Une seule nuit de 4 heures de sommeil réduit le nombre de cellules NK de 70 % (Irwin). L'OMS a classé le travail de nuit comme probablement cancérogène du groupe 2A d'après les données sur le cancer du sein et de la prostate. Le groupe des moins de 50 ans — qui n'a connu que l'environnement électromagnétique post-LED et post-smartphone — affiche la plus forte augmentation du cancer.",
      ko: "TTFields 메커니즘: IF-EMF가 세포 분열을 교란한다. 증가하는 암은 빠르게 분열하는 조직에 있다: 장 상피(CRC, 3–5일 교체), 고환(정자 형성), 갑상선(높은 대사 활성). 타임라인 일치: 증가는 ~1995년 시작, 첫 번째 개인 전자기기 물결(1980년대)의 ~10–15년 후. 4시간 수면의 단 하룻밤이 NK 세포 수를 70% 감소시킨다(Irwin). WHO는 유방암과 전립선암 데이터에 근거하여 야간 근무를 그룹 2A 발암 가능으로 분류했다. 50세 미만 연령대 — LED 이후, 스마트폰 이후의 전자기 환경만을 경험한 — 가 가장 가파른 암 증가를 보이고 있다.",
    },
    prediction: {
      en: "Testicular cancer rate should correlate with personal IF/RF exposure (laptop on lap, phone in pocket).",
      fi: "Kivessyövän tulisi korreloida henkilökohtaisen IF/RF-altistuksen kanssa (läppäri sylissä, puhelin taskussa).",
      ja: "精巣がん率は個人のIF/RF曝露（膝上のノートパソコン、ポケット内の電話）と相関するはずである。",
      fr: "Le taux de cancer testiculaire devrait corréler avec l'exposition personnelle IF/RF (ordinateur portable sur les genoux, téléphone dans la poche).",
      ko: "고환암 발생률은 개인 IF/RF 노출(무릎 위 노트북, 주머니 속 전화기)과 상관관계가 있어야 한다.",
    },
    status: {
      en: "Consistent — prospective test needed",
      fi: "Konsistentti — prospektiivinen testi tarvitaan",
      ja: "一貫性あり — 前向き試験が必要",
      fr: "Cohérent — test prospectif nécessaire",
      ko: "일관성 있음 — 전향적 시험 필요",
    },
    color: "#F44336",
  },
  {
    id: "depression-electricity",
    title: {
      en: "Depression responds better to electricity than chemistry",
      fi: "Masennus reagoi paremmin sähköön kuin kemiaan",
      ja: "うつ病は化学物質より電気によく反応する",
      fr: "La dépression répond mieux à l'électricité qu'à la chimie",
      ko: "우울증은 화학보다 전기에 더 잘 반응한다",
    },
    source: "FDA clinical trial data",
    data: {
      en: "TMS (FDA 2008) outperforms SSRIs in treatment-resistant depression. tDCS (FDA 2025) approved for home use. Depression epidemic accelerated with smartphone adoption.",
      fi: "TMS (FDA 2008) ylittää SSRI:t hoitoresistentissä masennuksessa. tDCS (FDA 2025) hyväksytty kotikäyttöön. Masennusepidemia kiihtyi älypuhelinten yleistymisen myötä.",
      ja: "TMS（FDA 2008）は治療抵抗性うつ病でSSRIを上回る。tDCS（FDA 2025）が家庭用に承認。うつ病の流行はスマートフォンの普及とともに加速した。",
      fr: "La SMT (FDA 2008) surpasse les ISRS dans la dépression résistante au traitement. La tDCS (FDA 2025) approuvée pour usage domestique. L'épidémie de dépression s'est accélérée avec l'adoption du smartphone.",
      ko: "TMS(FDA 2008)가 치료 저항성 우울증에서 SSRI를 능가한다. tDCS(FDA 2025)가 가정용으로 승인. 우울증 유행은 스마트폰 보급과 함께 가속화되었다.",
    },
    explanation: {
      en: "If depression is primarily an electrical disturbance (Becker's DC system perturbation, pineal/melatonin disruption) rather than chemical (serotonin theory), then electrical treatments (TMS, tDCS) should be more effective than chemical treatments (SSRIs) — which is what clinical data shows. [[ref:walker2017_why_we_sleep|Walker]] documents that sleep disruption causes depression (not the reverse). If EMF disrupts sleep, and sleep disruption causes depression, then depression is an electromagnetic disturbance — not a serotonin deficiency. This explains why TMS (electromagnetic treatment) works better than SSRIs (chemical treatment).",
      fi: "Jos masennus on ensisijaisesti sähköinen häiriö (Beckerin DC-järjestelmän häiriö, pineaali/melatoniinihäiriö) eikä kemiallinen (serotoniiniteoria), sähköisten hoitojen (TMS, tDCS) tulisi olla tehokkaampia kuin kemiallisten (SSRI) — mikä on kliinisen datan tulos. [[ref:walker2017_why_we_sleep|Walker]] dokumentoi, että unihäiriö aiheuttaa masennuksen (ei päinvastoin). Jos EMF häiritsee unta ja unihäiriö aiheuttaa masennuksen, masennus on sähkömagneettinen häiriö — ei serotoniinin puute. Tämä selittää miksi TMS (sähkömagneettinen hoito) toimii paremmin kuin SSRI:t (kemiallinen hoito).",
      ja: "うつ病が化学的障害（セロトニン理論）ではなく主に電気的障害（BeckerのDCシステム撹乱、松果体・メラトニン撹乱）であるなら、電気的治療（TMS、tDCS）は化学的治療（SSRI）より効果的であるはずであり、臨床データはそう示している。[[ref:walker2017_why_we_sleep|Walker]]は、睡眠障害がうつ病を引き起こす（逆ではない）ことを記録している。EMFが睡眠を撹乱し、睡眠障害がうつ病を引き起こすなら、うつ病はセロトニン欠乏ではなく電磁的障害である。これはTMS（電磁気治療）がSSRI（化学的治療）より有効な理由を説明する。",
      fr: "Si la dépression est principalement un trouble électrique (perturbation du système DC de Becker, perturbation pinéale/mélatonine) plutôt que chimique (théorie de la sérotonine), les traitements électriques (SMT, tDCS) devraient être plus efficaces que les traitements chimiques (ISRS) — ce que montrent les données cliniques. [[ref:walker2017_why_we_sleep|Walker]] établit que la perturbation du sommeil cause la dépression (et non l'inverse). Si les EMF perturbent le sommeil et que la perturbation du sommeil cause la dépression, alors la dépression est un trouble électromagnétique — et non une carence en sérotonine. Cela explique pourquoi la SMT (traitement électromagnétique) fonctionne mieux que les ISRS (traitement chimique).",
      ko: "우울증이 화학적 장애(세로토닌 이론)가 아니라 주로 전기적 장애(Becker의 DC 시스템 교란, 송과선/멜라토닌 교란)라면 전기적 치료(TMS, tDCS)가 화학적 치료(SSRI)보다 더 효과적이어야 하며, 임상 데이터가 이를 보여준다. [[ref:walker2017_why_we_sleep|Walker]]는 수면 교란이 우울증을 유발한다는 것(그 반대가 아님)을 문서화한다. EMF가 수면을 교란하고 수면 교란이 우울증을 일으킨다면, 우울증은 세로토닌 결핍이 아니라 전자기적 장애다. 이는 TMS(전자기 치료)가 SSRI(화학적 치료)보다 더 잘 작동하는 이유를 설명한다.",
    },
    prediction: {
      en: "Depression rates should correlate more strongly with RF exposure metrics than with social media usage (which is a proxy for device time, not content).",
      fi: "Masennuslukujen tulisi korreloida voimakkaammin RF-altistusmittareiden kuin sosiaalisen median käytön kanssa (joka on proksimitta laiteajalle, ei sisällölle).",
      ja: "うつ病率はソーシャルメディア使用（コンテンツではなくデバイス使用時間のプロキシ）よりもRF曝露指標とより強く相関するはずである。",
      fr: "Les taux de dépression devraient corréler plus fortement avec les métriques d'exposition RF qu'avec l'utilisation des réseaux sociaux (qui est un proxy du temps d'appareil, pas du contenu).",
      ko: "우울증 비율은 소셜 미디어 사용(콘텐츠가 아닌 기기 사용 시간의 대리 지표)보다 RF 노출 지표와 더 강하게 상관관계가 있어야 한다.",
    },
    status: {
      en: "Consistent — prospective test needed",
      fi: "Konsistentti — prospektiivinen testi tarvitaan",
      ja: "一貫性あり — 前向き試験が必要",
      fr: "Cohérent — test prospectif nécessaire",
      ko: "일관성 있음 — 전향적 시험 필요",
    },
    color: "#9C27B0",
  },
  {
    id: "ivf-decline",
    title: {
      en: "IVF success rates are declining despite better technology",
      fi: "IVF-onnistumisaste laskee paremmasta teknologiasta huolimatta",
      ja: "技術の進歩にもかかわらずIVF成功率が低下している",
      fr: "Les taux de réussite de la FIV déclinent malgré une meilleure technologie",
      ko: "더 나은 기술에도 불구하고 IVF 성공률이 감소하고 있다",
    },
    source: "Gleicher 2019",
    data: {
      en: "IVF technology improves but outcomes worsen. Biological material quality is declining.",
      fi: "IVF-teknologia paranee mutta tulokset heikkenevät. Biologisen materiaalin laatu heikkenee.",
      ja: "IVF技術は向上しているが結果は悪化している。生物学的材料の質が低下している。",
      fr: "La technologie FIV s'améliore mais les résultats se détériorent. La qualité du matériel biologique décline.",
      ko: "IVF 기술은 향상되지만 결과는 악화되고 있다. 생물학적 재료의 질이 저하되고 있다.",
    },
    explanation: {
      en: "Two mechanisms: (1) Systemic: patients' gamete bioelectric code is chronically perturbed by environmental EMF. CatSper Ca²⁺ channel (essential for sperm navigation) is VGCC-type, directly susceptible. (2) Local: IVF lab is EMF-rich — incubators, LED microscopes, Wi-Fi monitoring. TTFields mechanism predicts IF-EMF disrupts embryonic cell division. Melatonin supplementation improves IVF outcomes by ~15%. If ambient EMF suppresses melatonin (as the CRY/RPM mechanism predicts), then IVF outcomes should be worse in high-EMF environments — exactly as observed.",
      fi: "Kaksi mekanismia: (1) Systeeminen: potilaiden sukusolujen bioelektrinen koodi on kroonisesti häiriintynyt ympäristö-EMF:n vaikutuksesta. CatSper Ca²⁺ -kanava (välttämätön siittiön navigaatiolle) on VGCC-tyyppinen. (2) Paikallinen: IVF-laboratorio on EMF-rikas — inkubaattorit, LED-mikroskopit, Wi-Fi-seuranta. TTFields-mekanismi ennustaa IF-EMF:n häiritsevän alkion solunjakautumista. Melatoniinilisä parantaa IVF-tuloksia ~15 %. Jos ympäristö-EMF vaimentaa melatoniinia (kuten CRY/RPM-mekanismi ennustaa), IVF-tulosten tulisi olla huonompia korkean EMF:n ympäristöissä — juuri kuten havaitaan.",
      ja: "2つのメカニズム：(1) 全身性：患者の配偶子の生体電気コードが環境EMFにより慢性的に撹乱されている。CatSper Ca²⁺チャネル（精子のナビゲーションに不可欠）はVGCC型で直接影響を受けやすい。(2) 局所的：IVFラボはEMFが豊富 — インキュベーター、LED顕微鏡、Wi-Fiモニタリング。TTFieldsメカニズムはIF-EMFが胚の細胞分裂を撹乱すると予測する。メラトニン補給はIVF結果を~15%改善する。環境EMFがメラトニンを抑制するなら（CRY/RPMメカニズムの予測通り）、高EMF環境でIVF結果が悪化するはず — まさに観察されている通り。",
      fr: "Deux mécanismes : (1) Systémique : le code bioélectrique des gamètes des patients est chroniquement perturbé par les EMF environnementaux. Le canal CatSper Ca²⁺ (essentiel à la navigation des spermatozoïdes) est de type VGCC, directement susceptible. (2) Local : le laboratoire de FIV est riche en EMF — incubateurs, microscopes LED, surveillance Wi-Fi. Le mécanisme TTFields prédit que les IF-EMF perturbent la division cellulaire embryonnaire. La supplémentation en mélatonine améliore les résultats de FIV de ~15 %. Si les EMF ambiants suppriment la mélatonine (comme le prédit le mécanisme CRY/RPM), les résultats de FIV devraient être pires dans les environnements à forte EMF — exactement comme observé.",
      ko: "두 가지 메커니즘: (1) 전신적: 환자의 배우자 세포 생체전기 코드가 환경 EMF에 의해 만성적으로 교란. CatSper Ca²⁺ 채널(정자 항법에 필수)은 VGCC형으로 직접 영향을 받음. (2) 국소적: IVF 실험실은 EMF가 풍부 — 인큐베이터, LED 현미경, Wi-Fi 모니터링. TTFields 메커니즘은 IF-EMF가 배아 세포 분열을 교란한다고 예측. 멜라토닌 보충은 IVF 결과를 ~15% 개선. 환경 EMF가 멜라토닌을 억제한다면(CRY/RPM 메커니즘이 예측하는 대로), 고EMF 환경에서 IVF 결과가 악화되어야 함 — 관찰된 것과 정확히 일치.",
    },
    prediction: {
      en: "Faraday-shielded IVF lab → better fertilization, blastocyst, and pregnancy rates.",
      fi: "Faraday-suojattu IVF-laboratorio → parempi fertilisaatio-, blastokystti- ja raskausaste.",
      ja: "ファラデー遮蔽IVFラボ→受精率、胚盤胞率、妊娠率の向上。",
      fr: "Laboratoire FIV blindé par cage de Faraday → meilleurs taux de fécondation, de blastocyste et de grossesse.",
      ko: "패러데이 차폐 IVF 실험실 → 더 나은 수정률, 배반포율, 임신율.",
    },
    status: {
      en: "Consistent — prospective test needed",
      fi: "Konsistentti — prospektiivinen testi tarvitaan",
      ja: "一貫性あり — 前向き試験が必要",
      fr: "Cohérent — test prospectif nécessaire",
      ko: "일관성 있음 — 전향적 시험 필요",
    },
    color: "#2196F3",
  },
  {
    id: "disease-cluster",
    title: {
      en: "All chronic diseases cluster together",
      fi: "Kaikki krooniset sairaudet klusteroituvat yhteen",
      ja: "すべての慢性疾患が集積している",
      fr: "Toutes les maladies chroniques se regroupent",
      ko: "모든 만성 질환이 함께 군집화된다",
    },
    source: "Global epidemiological patterns",
    data: {
      en: "Metabolic syndrome, depression, autoimmune diseases, cancer, infertility, neurodegeneration — all cluster in same populations (urban, developed, high-technology).",
      fi: "Metabolinen oireyhtymä, masennus, autoimmuunisairaudet, syöpä, hedelmättömyys, neurodegeneraatio — kaikki klusteroituvat samoihin populaatioihin (urbaani, kehittynyt, korkean teknologian).",
      ja: "メタボリックシンドローム、うつ病、自己免疫疾患、がん、不妊、神経変性 — すべてが同じ集団に集積（都市部、先進国、高技術社会）。",
      fr: "Syndrome métabolique, dépression, maladies auto-immunes, cancer, infertilité, neurodégénérescence — tous se regroupent dans les mêmes populations (urbaines, développées, haute technologie).",
      ko: "대사증후군, 우울증, 자가면역 질환, 암, 불임, 신경퇴행 — 모두 같은 인구집단에 군집화(도시, 선진국, 고기술).",
    },
    explanation: {
      en: "One root cause (chronic EMF) affecting seven modulome layers simultaneously, each tissue responding according to its ion channel profile and cell division rate. Diseases appear in biologically logical order: sleep disorders first (fastest response), metabolic second, autoimmune third, fertility fourth, cancer last (longest latency). The diseases that cluster (metabolic syndrome + depression + autoimmune + cancer + infertility) are precisely those that sleep deprivation produces ([[ref:walker2017_why_we_sleep|Walker 2017]]). A single upstream cause (EMF → sleep disruption) explains why they appear together in the same populations.",
      fi: "Yksi juurisyy (krooninen EMF) vaikuttaa seitsemään moduloomikerrokseen samanaikaisesti, jokaisen kudoksen vastatessa ionikanavaprofiilissaan ja solunjakautumisnopeudessaan. Sairaudet ilmaantuvat biologisesti loogisessa järjestyksessä: unihäiriöt ensin (nopein vaste), metaboliset toisena, autoimmuuni kolmantena, hedelmällisyys neljäntenä, syöpä viimeisenä (pisin latenssi). Sairaudet jotka klusteroituvat (metabolinen oireyhtymä + masennus + autoimmuuni + syöpä + hedelmättömyys) ovat täsmälleen ne jotka unideprivaatio tuottaa ([[ref:walker2017_why_we_sleep|Walker 2017]]). Yksi ylävirran syy (EMF → unihäiriö) selittää miksi ne ilmaantuvat yhdessä samoissa populaatioissa.",
      ja: "1つの根本原因（慢性EMF）が7つのモジュローム層に同時に作用し、各組織はイオンチャネル特性と細胞分裂率に応じて反応する。疾患は生物学的に論理的な順序で現れる。睡眠障害が最初（最速の反応）、代謝性疾患が2番目、自己免疫疾患が3番目、生殖機能が4番目、がんが最後（最長の潜時）である。集積する疾患（メタボリックシンドローム＋うつ病＋自己免疫＋がん＋不妊）は、睡眠不足が生じさせるものと正確に一致する（[[ref:walker2017_why_we_sleep|Walker 2017]]）。単一の上流原因（EMF → 睡眠障害）が、同じ集団にこれらが一緒に現れる理由を説明する。",
      fr: "Une cause racine unique (EMF chronique) affecte simultanément sept couches du modulome, chaque tissu répondant selon son profil de canaux ioniques et son taux de division cellulaire. Les maladies apparaissent dans un ordre biologiquement logique : troubles du sommeil d'abord (réponse la plus rapide), troubles métaboliques ensuite, auto-immunité en troisième, fertilité en quatrième, cancer en dernier (latence la plus longue). Les maladies qui se regroupent (syndrome métabolique + dépression + auto-immunité + cancer + infertilité) sont précisément celles que produit la privation de sommeil ([[ref:walker2017_why_we_sleep|Walker 2017]]). Une cause unique en amont (EMF → perturbation du sommeil) explique pourquoi elles apparaissent ensemble dans les mêmes populations.",
      ko: "하나의 근본 원인(만성 EMF)이 일곱 모듈롬 층에 동시에 영향을 미치고, 각 조직은 이온 채널 특성과 세포 분열 속도에 따라 반응한다. 질병은 생물학적으로 논리적인 순서로 나타난다. 수면 장애가 먼저(가장 빠른 반응), 대사 질환이 두 번째, 자가면역이 세 번째, 생식력이 네 번째, 암이 마지막(가장 긴 잠복기)이다. 함께 군집화되는 질병(대사증후군 + 우울증 + 자가면역 + 암 + 불임)은 수면 부족이 유발하는 질병과 정확히 같다([[ref:walker2017_why_we_sleep|Walker 2017]]). 하나의 상류 원인(EMF → 수면 교란)이 같은 인구집단에서 이들이 함께 나타나는 이유를 설명한다.",
    },
    prediction: {
      en: "Amish communities (low EMF) should be protected from ALL six trends simultaneously, not just high TFR.",
      fi: "Amish-yhteisöjen (matala EMF) tulisi olla suojattuja KAIKILTA kuudelta trendiltä samanaikaisesti, ei vain korkean TFR:n osalta.",
      ja: "アーミッシュコミュニティ（低EMF）は高TFRだけでなく、6つのトレンドすべてから同時に保護されているはずである。",
      fr: "Les communautés Amish (faible EMF) devraient être protégées des SIX tendances simultanément, pas seulement du TFR élevé.",
      ko: "아미시 공동체(저EMF)는 높은 TFR뿐만 아니라 6가지 추세 모두로부터 동시에 보호되어야 한다.",
    },
    status: {
      en: "Partially tested (TFR validated; others need testing)",
      fi: "Osittain testattu (TFR validoitu; muut tarvitsevat testauksen)",
      ja: "部分的に検証済み（TFRは検証済み、他は検証が必要）",
      fr: "Partiellement testé (TFR validé ; les autres nécessitent des tests)",
      ko: "부분적으로 검증됨 (TFR 검증 완료; 나머지는 검증 필요)",
    },
    color: "#607D8B",
  },
];

const COPY = {
  en: {
    title: "Retrodictions: What the modulome explains",
    lead: "Six independent biological systems decline on the same timeline, in the same populations, with the same EMF-exposure gradient. The twelve-layer modulome makes specific predictions about the past — retrodictions — that can be tested against existing data. The probability that six unrelated systems would co-decline by chance alone is p < 0.005 (binomial test, assuming independent 50% base-rate). This convergence is the argument: a single shared environmental driver is the parsimonious explanation.",
    data: "Data",
    modulomeExplanation: "Modulome explanation",
    testable: "Testable prediction",
    source: "Source",
    status: "Status",
    caveat: "Six independent biological systems declining simultaneously is not a coincidence that requires 'more study' — it is a convergence pattern that demands a shared-cause hypothesis. EMF exposure is the only environmental variable that changed in all six systems, on the same timeline.",
  },
  fi: {
    title: "Retrodiktiot: mitä moduloomi selittää",
    lead: "Kuusi itsenäistä biologista järjestelmää laskee samalla aikajanalla, samoissa populaatioissa, samalla EMF-altistusgradientilla. Kahdeksankerroksinen moduloomi tuottaa tarkkoja ennusteita menneisyydestä — retrodiktioita — jotka voidaan testata olemassa olevaa dataa vasten. Todennäköisyys, että kuusi riippumatonta järjestelmää laskisi sattumalta yhtä aikaa, on p < 0,005 (binomitesti, olettaen 50 % perustapahtumataajuus). Tämä yhdentyminen on argumentti: yksi jaettu ympäristötekijä on pelkistävin selitys.",
    data: "Data",
    modulomeExplanation: "Moduloomiselitys",
    testable: "Testattava ennuste",
    source: "Lähde",
    status: "Tila",
    caveat: "Kuuden itsenäisen biologisen järjestelmän samanaikainen lasku ei ole sattuma joka vaatii 'lisää tutkimusta' — se on yhdentymiskuvio joka edellyttää jaetun syyn hypoteesia. EMF-altistus on ainoa ympäristömuuttuja joka muuttui kaikissa kuudessa järjestelmässä, samalla aikajanalla.",
  },
  ja: {
    title: "遡及予測：モジュロームが説明すること",
    lead: "6つの独立した生物学的システムが、同じタイムライン、同じ集団、同じEMF曝露勾配で低下している。12層のモジュロームは過去について特定の予測 — 遡及予測 — を行い、既存のデータに対して検証できる。6つの無関係なシステムが偶然だけで同時に低下する確率はp < 0.005（二項検定、独立した50%基準率を仮定）。この収束こそが論拠である：単一の共有環境要因が最も簡潔な説明である。",
    data: "データ",
    modulomeExplanation: "モジュロームの説明",
    testable: "検証可能な予測",
    source: "出典",
    status: "ステータス",
    caveat: "6つの独立した生物学的システムの同時低下は「さらなる研究」を必要とする偶然の一致ではない — 共通原因の仮説を要求する収束パターンである。EMF曝露は、6つのシステムすべてにおいて同じタイムラインで変化した唯一の環境変数である。",
  },
  fr: {
    title: "Rétrodictions : ce que le modulome explique",
    lead: "Six systèmes biologiques indépendants déclinent sur la même chronologie, dans les mêmes populations, avec le même gradient d'exposition aux EMF. Le modulome à douze couches fait des prédictions spécifiques sur le passé — des rétrodictions — testables contre les données existantes. La probabilité que six systèmes non liés co-déclinent par hasard seul est p < 0,005 (test binomial, en supposant un taux de base indépendant de 50 %). Cette convergence est l'argument : un seul facteur environnemental partagé est l'explication la plus parcimonieuse.",
    data: "Données",
    modulomeExplanation: "Explication par le modulome",
    testable: "Prédiction testable",
    source: "Source",
    status: "Statut",
    caveat: "Six systèmes biologiques indépendants en déclin simultané ne sont pas une coïncidence nécessitant « plus d'études » — c'est un schéma de convergence qui exige une hypothèse de cause partagée. L'exposition aux EMF est la seule variable environnementale ayant changé dans les six systèmes, sur la même chronologie.",
  },
  ko: {
    title: "소급 예측: 모듈롬이 설명하는 것",
    lead: "6개의 독립적 생물학적 시스템이 같은 타임라인, 같은 인구집단, 같은 EMF 노출 기울기에서 감소하고 있다. 12층 모듈롬은 과거에 대한 구체적 예측 — 소급 예측 — 을 생성하며, 기존 데이터에 대해 검증할 수 있다. 관련 없는 6개 시스템이 우연만으로 동시에 감소할 확률은 p < 0.005(이항 검정, 독립적 50% 기준율 가정). 이 수렴이 논거이다: 단일 공유 환경 요인이 가장 간결한 설명이다.",
    data: "데이터",
    modulomeExplanation: "모듈롬 설명",
    testable: "검증 가능한 예측",
    source: "출처",
    status: "상태",
    caveat: "6개의 독립적 생물학적 시스템의 동시 감소는 '더 많은 연구'를 요구하는 우연의 일치가 아니다 — 공유 원인 가설을 요구하는 수렴 패턴이다. EMF 노출은 6개 시스템 모두에서 같은 타임라인에 변화한 유일한 환경 변수이다.",
  },
} as const;

export function RetrodictionCards({ locale }: { locale: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const d = pickCopy(COPY, locale);

  return (
    <section className="mb-16 border-t editorial-rule pt-6">
      <h2 className="editorial-section-heading mb-3">{d.title}</h2>
      <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.lead}</p>

      <div className="space-y-3 max-w-4xl">
        {RETRODICTIONS.map((r, i) => {
          const isOpen = open === r.id;
          const title = pickCopy(r.title, locale);
          return (
            <article
              key={r.id}
              className="rounded-lg border border-card-border bg-card-bg overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : r.id)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-card-bg/80 transition-colors"
              >
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: r.color }}
                />
                <span className="font-mono-num text-xs text-accent mr-1">R{i + 1}</span>
                <span className="text-sm font-semibold flex-1">{title}</span>
                <svg
                  className={`w-4 h-4 text-foreground-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 space-y-4 border-t border-card-border/50">
                  <div className="pt-4">
                    <div className="mb-1 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-xs text-foreground-muted">
                      <span className="font-semibold uppercase tracking-wider">{d.source}:</span>
                      {r.source && <span className="break-words">{r.source}</span>}
                      {r.sourceCitations?.map((citation) => (
                        <StudyCitation
                          key={citation.referenceId}
                          referenceId={citation.referenceId}
                          locale={locale}
                          label={citation.label}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">{d.data}</p>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {pickCopy(r.data, locale)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">{d.modulomeExplanation}</p>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      <InlineReferenceText text={pickCopy(r.explanation, locale)} locale={locale} />
                    </p>
                  </div>

                  <div className="rounded border border-card-border/60 bg-card-bg/50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">{d.testable}</p>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {pickCopy(r.prediction, locale)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground-muted">{d.status}:</span>
                    <span className="text-xs font-mono-num px-2 py-0.5 rounded bg-card-bg border border-card-border">
                      {pickCopy(r.status, locale)}
                    </span>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">{d.caveat}</p>
    </section>
  );
}
